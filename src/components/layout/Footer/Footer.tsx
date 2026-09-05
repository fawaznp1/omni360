import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const FOOTER_LINKS = {
    Services: [
        { label: 'Web Development', path: '/category/web-development' },
        { label: 'E-Commerce', path: '/category/ecommerce' },
        { label: 'Mobile Apps', path: '/category/mobile-development' },
        { label: 'UI/UX Design', path: '/category/uiux-design' },
        { label: 'AI & Automation', path: '/category/ai-services' },
        { label: 'All Services', path: '/services' },
    ],
    Company: [
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'How It Works', path: '/about#how-it-works' },
    ],
    Resources: [
        { label: 'AI Assistant', path: '/ai' },
        { label: 'Service Bundles', path: '/services#bundles' },
        { label: 'Categories', path: '/services#categories' },
    ],
};

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <Link to="/" className={styles.logo}>
                        <span className={styles.logoIcon}>◉</span>
                        <span>Omni<span className={styles.accent}>360</span></span>
                    </Link>
                    <p className={styles.tagline}>
                        Whatever you need online, we make it happen.
                    </p>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Omni360. All rights reserved.
                    </p>
                </div>

                {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                    <div key={title} className={styles.column}>
                        <h4 className={styles.columnTitle}>{title}</h4>
                        <ul className={styles.linkList}>
                            {links.map(link => (
                                <li key={link.label}>
                                    <Link to={link.path} className={styles.link}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className={styles.bottom}>
                <p>Built for businesses, creators, and professionals worldwide.</p>
            </div>
        </footer>
    );
}
