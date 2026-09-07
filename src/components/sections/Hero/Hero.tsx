import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/shared/SearchBar/SearchBar';
import styles from './Hero.module.scss';

const QUICK_SEARCHES = [
    'Web Development',
    'E-Commerce',
    'Design',
    'SEO',
    'AI Automation',
];

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section className={styles.hero}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <p className={styles.eyebrow}>
                        The complete digital service platform
                    </p>

                    <h1 className={styles.title}>
                        Everything you need, online.
                    </h1>

                    <p className={styles.subtitle}>
                        One place for websites, software, e-commerce, design, marketing, automation, research, business support, and more.
                    </p>

                    <div className={styles.searchWrapper}>
                        <SearchBar variant="hero" />
                    </div>

                    <div className={styles.popularRow}>
                        <span className={styles.popularLabel}>Popular:</span>
                        <div className={styles.tagList}>
                            {QUICK_SEARCHES.map((term, index) => (
                                <span key={term} className={styles.tagWrap}>
                                    <button
                                        className={styles.tagLink}
                                        onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                                    >
                                        {term}
                                    </button>
                                    {index < QUICK_SEARCHES.length - 1 && (
                                        <span className={styles.tagDivider}>&middot;</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}