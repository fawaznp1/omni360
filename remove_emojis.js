import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToProcess = [
    'src/data/categories.ts',
    'src/data/services.ts',
    'src/data/bundles.ts'
];

const emojiToIconName = {
    '🛒': 'ShoppingCart',
    '💻': 'Monitor',
    '🚀': 'Rocket',
    '📊': 'BarChart',
    '🎨': 'Palette',
    '⚙️': 'Settings',
    '🔒': 'Lock',
    '📱': 'Smartphone',
    '☁️': 'Cloud',
    '🔍': 'Search',
    '📈': 'TrendingUp',
    '🛍️': 'ShoppingBag',
    '✨': 'Sparkles',
    '⚡': 'Zap',
    '🛠️': 'Wrench',
    '📝': 'FileText',
    '🎓': 'GraduationCap',
    '💼': 'Briefcase',
    '📣': 'Megaphone',
    '🎬': 'Clapperboard',
    '🎵': 'Music',
    '🎮': 'Gamepad2',
    '🧠': 'Brain',
    '🛡️': 'Shield'
};

filesToProcess.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace all emojis with their corresponding icon names
    for (const [emoji, iconName] of Object.entries(emojiToIconName)) {
        content = content.split(`'${emoji}'`).join(`'${iconName}'`);
    }

    // Find any remaining emojis (if I missed some) and replace them with a default
    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    content = content.replace(emojiRegex, (match, p1, offset, string) => {
        // If it's inside quotes as an icon
        if (string[offset - 1] === "'" && string[offset + match.length] === "'") {
            return 'CheckCircle';
        }
        return ''; // strip emojis elsewhere
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed ${file}`);
});
