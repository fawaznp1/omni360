import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    'src/components/services/CategoryCard/CategoryCard.tsx',
    'src/components/services/ServiceCard/ServiceCard.tsx',
    'src/pages/HomePage/HomePage.tsx',
    'src/pages/ServiceDetailPage/ServiceDetailPage.tsx',
    'src/pages/ServicesPage/ServicesPage.tsx',
    'src/pages/CategoryPage/CategoryPage.tsx'
];

files.forEach(f => {
    const p = path.join(__dirname, f);
    let content = fs.readFileSync(p, 'utf8');
    if (!content.includes('@/components/shared/Icon/Icon')) {
        content = content.replace(/(import styles from [^\n]+;)/, "import Icon from '@/components/shared/Icon/Icon';\n$1");

        // Convert any remaining {something.icon}
        content = content.replace(/\{([a-zA-Z0-9_]+)\.icon\}/g, '<Icon name={$1.icon} size={24} />');

        fs.writeFileSync(p, content, 'utf8');
        console.log('Fixed ', f);
    }
});
