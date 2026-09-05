import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/shared/SearchBar/SearchBar';
import styles from './Hero.module.scss';

const QUICK_SEARCHES = [
    'Build a website',
    'Start an online store',
    'Create a logo',
    'Automate my workflow',
    'Improve my SEO',
    'Build a mobile app',
    'Analyze my business',
];

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section className={styles.hero}>
            <div className={styles.bg}>
                <div className={styles.gradient1} />
                <div className={styles.gradient2} />
                <div className={styles.grid} />
            </div>

            <div className={styles.content}>
                <span className={styles.badge}>✦ 1000+ Digital Services</span>
                <h1 className={styles.title}>
                    Whatever you need online.{' '}
                    <span className={styles.accent}>We make it happen.</span>
                </h1>
                <p className={styles.subtitle}>
                    From websites and e-commerce to design, marketing, automation, research,
                    business support, and everything in between — discover the digital service
                    you need in one place.
                </p>

                <div className={styles.searchWrapper}>
                    <SearchBar variant="hero" />
                </div>

                <div className={styles.quickSearches}>
                    {QUICK_SEARCHES.map(term => (
                        <button
                            key={term}
                            className={styles.quickBtn}
                            onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                        >
                            {term}
                        </button>
                    ))}
                </div>

                <div className={styles.aiInvite}>
                    <span className={styles.aiDot} />
                    <span>Not sure what you need? </span>
                    <button className={styles.aiLink} onClick={() => navigate('/ai')}>
                        Ask 360 AI →
                    </button>
                </div>
            </div>
        </section>
    );
}
