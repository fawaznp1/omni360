const fs = require('fs');

function patchFile(file, replacer) {
    let content = fs.readFileSync(file, 'utf8');
    content = replacer(content);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Patched ${file}`);
}

// 1. variables.scss
patchFile('src/styles/_variables.scss', (content) => {
    // Colors
    content = content.replace(/\$light-surface: [^;]+;/g, '$light-surface: #ffffff;');
    content = content.replace(/\$light-surface-hover: [^;]+;/g, '$light-surface-hover: #f8fafc;');
    content = content.replace(/\$light-surface-glass: [^;]+;/g, '$light-surface-glass: #ffffff;');
    content = content.replace(/\$light-border: [^;]+;/g, '$light-border: #e2e8f0;');
    content = content.replace(/\$light-border-hover: [^;]+;/g, '$light-border-hover: #cbd5e1;');

    // Radius (remove pill styles)
    content = content.replace(/\$radius-lg: 20px;/g, '$radius-lg: 8px;');
    content = content.replace(/\$radius-xl: 30px;/g, '$radius-xl: 12px;');
    content = content.replace(/\$radius-2xl: 28px;/g, '$radius-2xl: 16px;');

    // Shadows
    content = content.replace(/\$shadow-sm: [^;]+;/g, '$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);');
    content = content.replace(/\$shadow-md: [^;]+;/g, '$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);');
    content = content.replace(/\$shadow-lg: [^;]+;/g, '$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);');
    content = content.replace(/\$shadow-xl: [^;]+;/g, '$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);');
    content = content.replace(/\$shadow-glow: [^;]+;/g, '$shadow-glow: none;');
    content = content.replace(/\$shadow-glow-lg: [^;]+;/g, '$shadow-glow-lg: none;');

    // Glass (disable)
    content = content.replace(/\$glass-blur: [^;]+;/g, '$glass-blur: 0px;');
    return content;
});

// 2. mixins.scss
patchFile('src/styles/_mixins.scss', (content) => {
    // Replace glass with corporate
    const glassRegex = /@mixin glass\([\s\S]*?@mixin glass-card {[\s\S]*?}/g;
    const corporateMixin = `@mixin corporate-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: $radius-lg;
    box-shadow: $shadow-sm;
    transition: all $transition-base;

    &:hover {
        border-color: var(--border-hover);
        box-shadow: $shadow-md;
        transform: translateY(-2px);
    }
}`;
    // Since glass is used everywhere, we can just redefine glass-card to mean corporate-card so we don't break existing components immediately
    content = content.replace(glassRegex, `@mixin glass-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: $radius-lg;
    box-shadow: $shadow-sm;
    transition: all $transition-base;

    &:hover {
        border-color: var(--border-hover);
        box-shadow: $shadow-md;
        transform: translateY(-2px);
    }
}
@mixin glass-panel { @include glass-card; }`);

    // Remove accent-glow logic
    content = content.replace(/box-shadow: 0 0 20px \$color-accent-glow, 0 0 60px rgba\(108, 92, 231, 0\.08\);/g, 'box-shadow: $shadow-md;');

    return content;
});

// 3. globals.scss
patchFile('src/styles/globals.scss', (content) => {
    // Dark mode vars
    content = content.replace(/--bg-primary: #\{\$color-bg-primary\};/g, '--bg-primary: #111827;');
    content = content.replace(/--bg-secondary: #\{\$color-bg-secondary\};/g, '--bg-secondary: #1f2937;');
    content = content.replace(/--bg-tertiary: #\{\$color-bg-tertiary\};/g, '--bg-tertiary: #374151;');
    content = content.replace(/--bg-elevated: #\{\$color-bg-elevated\};/g, '--bg-elevated: #1f2937;');
    content = content.replace(/--surface: #\{\$color-surface\};/g, '--surface: #1f2937;');
    content = content.replace(/--surface-hover: #\{\$color-surface-hover\};/g, '--surface-hover: #374151;');
    content = content.replace(/--surface-glass: #\{\$color-surface-glass\};/g, '--surface-glass: #1f2937;');

    content = content.replace(/--border: #\{\$color-border\};/g, '--border: #374151;');
    content = content.replace(/--border-hover: #\{\$color-border-hover\};/g, '--border-hover: #4b5563;');

    content = content.replace(/--text-primary: #\{\$color-text-primary\};/g, '--text-primary: #f9fafb;');
    content = content.replace(/--text-secondary: #\{\$color-text-secondary\};/g, '--text-secondary: #d1d5db;');

    // Typography reset
    content = content.replace(/color: transparent;/g, '');
    content = content.replace(/background-clip: text;/g, '');
    content = content.replace(/-webkit-background-clip: text;/g, '');
    // Replace bg-glow
    content = content.replace(/\.bg-glow \{[\s\S]*?\}/g, '.bg-glow { display: none; }');
    return content;
});

// 4. animations.scss
patchFile('src/styles/_animations.scss', (content) => {
    // Remove pulse and glow specifics
    content = content.replace(/box-shadow: 0 0 0 0 rgba\(37, 99, 235, 0\.4\);/g, '/* Removed pulse shadow */');
    content = content.replace(/box-shadow: 0 0 0 20px rgba\(37, 99, 235, 0\);/g, '/* Removed pulse shadow */');
    return content;
});
