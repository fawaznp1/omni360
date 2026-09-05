import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '@/components/shared/SearchBar/SearchBar';
import Icon from '@/components/shared/Icon/Icon';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './Header.module.scss';

const NAV_LINKS = [
    { path: '/services', label: 'Services' },
    { path: '/services', label: 'Categories', hash: '#categories' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
];

export default function Header({ onToggleAI }: { onToggleAI: () => void }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setShowSearch(false);
    }, [location]);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.inner}>
                <Link to="/" className={styles.logo} aria-label="Omni360 Home">
                    <span className={styles.logoIcon}>◉</span>
                    <span className={styles.logoText}>Omni<span className={styles.logoAccent}>360</span></span>
                </Link>

                <nav className={`${styles.nav} ${mobileMenuOpen ? styles.open : ''}`} aria-label="Main navigation">
                    {NAV_LINKS.map(link => (
                        <Link
                            key={link.label}
                            to={link.path}
                            className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button className={styles.navLink} onClick={onToggleAI}>
                        <span className={styles.aiDot} /> 360 AI
                    </button>
                </nav>

                <div className={styles.actions}>
                    {showSearch && (
                        <div className={styles.headerSearch}>
                            <SearchBar variant="header" />
                        </div>
                    )}
                    <button
                        className={styles.iconBtn}
                        onClick={() => setShowSearch(!showSearch)}
                        aria-label="Toggle search"
                    >
                        <Icon name="Search" size={20} />
                    </button>
                    <button
                        className={styles.iconBtn}
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme.mode === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme.mode === 'dark' ? <Icon name="Moon" size={20} /> : <Icon name="Sun" size={20} />}
                    </button>
                    <Link to="/contact" className={styles.ctaBtn}>Get Started</Link>
                    <button
                        className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div className={styles.mobileOverlay} onClick={() => setMobileMenuOpen(false)}>
                    <nav className={styles.mobileNav} onClick={e => e.stopPropagation()}>
                        {NAV_LINKS.map(link => (
                            <Link key={link.label} to={link.path} className={styles.mobileLink}>
                                {link.label}
                            </Link>
                        ))}
                        <button className={styles.mobileLink} onClick={onToggleAI}>
                            <span className={styles.aiDot} /> 360 AI Assistant
                        </button>
                        <Link to="/contact" className={styles.mobileCta}>Get Started</Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
