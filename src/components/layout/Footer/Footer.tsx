import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import styles from './Footer.module.scss';

const FOOTER_DATA = [
    {
        title: 'Company',
        links: [
            { label: 'About', path: '/about' },
            { label: 'How It Works', path: '/about#how-it-works' },
            { label: 'Contact', path: '/contact' },
            { label: 'Careers', path: '/careers' },
            { label: 'Blog', path: '/blog' },
        ],
    },
    {
        title: 'Services',
        links: [
            { label: 'Web Development', path: '/category/web-development' },
            { label: 'E-Commerce', path: '/category/ecommerce' },
            { label: 'Design', path: '/category/design' },
            { label: 'Digital Marketing', path: '/category/marketing' },
            { label: 'AI & Automation', path: '/category/ai-automation' },
            { label: 'Business Services', path: '/category/business' },
            { label: 'View All Services', path: '/services' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Help Center', path: '/help' },
            { label: 'FAQs', path: '/faq' },
            { label: 'Service Guide', path: '/guide' },
            { label: 'Privacy', path: '/privacy' },
            { label: 'Terms', path: '/terms' },
            { label: 'Sitemap', path: '/sitemap' },
        ],
    },
];

export default function Footer() {
    const navigate = useNavigate();
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (title: string) => {
        setOpenSection(openSection === title ? null : title);
    };

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    {FOOTER_DATA.map((section) => (
                        <div key={section.title} className={styles.column}>
                            <button
                                className={styles.accordionHeader}
                                onClick={() => toggleSection(section.title)}
                                aria-expanded={openSection === section.title}
                            >
                                {section.title}
                                <span className={styles.chevron}>
                                    {openSection === section.title ? (
                                        <ChevronUp size={16} />
                                    ) : (
                                        <ChevronDown size={16} />
                                    )}
                                </span>
                            </button>

                            <h4 className={styles.desktopTitle}>{section.title}</h4>

                            <ul className={`${styles.linkList} ${openSection === section.title ? styles.open : ''}`}>
                                {section.links.map(link => (
                                    <li key={link.label}>
                                        <Link to={link.path} className={styles.link}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className={styles.ctaColumn}>
                        <h4 className={styles.desktopTitle}>Get Started</h4>
                        <p className={styles.ctaText}>
                            Tell us what you need and we'll help you find the right solution.
                        </p>
                        <button className={styles.ctaBtn} onClick={() => navigate('/contact')}>
                            Have something in mind? <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <div className={styles.brandRow}>
                        <div className={styles.brandInfo}>
                            <Link to="/" className={styles.logo}>
                                Omni<span>360</span>
                            </Link>
                            <p className={styles.tagline}>
                                The complete digital service platform.
                            </p>
                        </div>

                        <div className={styles.socials}>
                            <a href="#" aria-label="Twitter" className={styles.socialLink}>Twitter</a>
                            <a href="#" aria-label="LinkedIn" className={styles.socialLink}>LinkedIn</a>
                            <a href="#" aria-label="GitHub" className={styles.socialLink}>GitHub</a>
                        </div>
                    </div>

                    <div className={styles.legalRow}>
                        <p className={styles.copyright}>
                            © {new Date().getFullYear()} Omni360 Inc. All rights reserved.
                        </p>
                        <div className={styles.legalLinks}>
                            <Link to="/privacy">Privacy Policy</Link>
                            <Link to="/terms">Terms of Service</Link>
                            <button className={styles.cookieBtn}>Cookie Preferences</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
