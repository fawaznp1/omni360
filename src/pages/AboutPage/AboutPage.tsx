import { Link } from 'react-router-dom';
import styles from './AboutPage.module.scss';
import Icon from '@/components/shared/Icon/Icon';

const VALUES = [
    { icon: 'Zap', title: 'Speed', desc: 'We deliver results fast, without compromising quality.' },
    { icon: 'Gem', title: 'Quality', desc: 'Every project meets the highest professional standards.' },
    { icon: 'Lock', title: 'Trust', desc: 'Transparent processes, honest communication, always.' },
    { icon: 'Puzzle', title: 'Scalability', desc: 'Solutions that grow with your business.' },
    { icon: 'Handshake', title: 'Partnership', desc: 'We work with you, not just for you.' },
    { icon: 'Globe', title: 'Accessibility', desc: 'Premium services available to everyone, everywhere.' },
];

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <div className="container">
                <header className={styles.header}>
                    <span className={styles.badge}>About Omni360</span>
                    <h1 className={styles.title}>
                        One platform.{' '}
                        <span className={styles.accent}>Every digital service.</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Omni360 is a comprehensive digital services platform designed to help businesses,
                        professionals, creators, and individuals get any digital work done — from a single destination.
                    </p>
                </header>

                <section className={styles.mission}>
                    <div className={styles.missionCard}>
                        <h2>Our Mission</h2>
                        <p>
                            We believe that accessing professional digital services shouldn't be complex.
                            Whether you're a startup founder, a student, a small business, or an enterprise —
                            you should be able to explain what you need and get it done. No jargon. No friction.
                            Just results.
                        </p>
                    </div>
                </section>

                <section className={styles.values} id="how-it-works">
                    <h2 className="section-title">What We Stand For</h2>
                    <div className={styles.valueGrid}>
                        {VALUES.map(v => (
                            <div key={v.title} className={styles.valueCard}>
                                <span className={styles.valueIcon}><Icon name={v.icon} size={24} /></span>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.cta}>
                    <div className={styles.ctaCard}>
                        <h2>Ready to work together?</h2>
                        <p>Tell us what you need and let's make it happen.</p>
                        <div className={styles.ctaActions}>
                            <Link to="/services" className={styles.ctaPrimary}>Explore Services</Link>
                            <Link to="/contact" className={styles.ctaSecondary}>Contact Us</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
