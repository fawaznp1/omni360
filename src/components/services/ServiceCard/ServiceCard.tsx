import { Link } from 'react-router-dom';
import Badge from '@/components/shared/Badge/Badge';
import type { Service } from '@/types';
import Icon from '@/components/shared/Icon/Icon';
import styles from './ServiceCard.module.scss';

interface ServiceCardProps {
    service: Service;
    matchedFields?: string[];
}

export default function ServiceCard({ service, matchedFields }: ServiceCardProps) {
    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <span className={styles.icon}><Icon name={service.icon} size={20} /></span>
                <div className={styles.badges}>
                    {service.popular && <Badge variant="accent" size="sm">Popular</Badge>}
                    {service.status === 'coming-soon' && <Badge variant="warning" size="sm">Coming Soon</Badge>}
                </div>
            </div>

            <h3 className={styles.name}>{service.name}</h3>
            <p className={styles.desc}>{service.shortDescription}</p>

            <div className={styles.tags}>
                {service.tags.slice(0, 3).map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                ))}
            </div>

            {matchedFields && matchedFields.length > 0 && (
                <div className={styles.matchInfo}>
                    Matched: {matchedFields.join(', ')}
                </div>
            )}

            <div className={styles.footer}>
                <div className={styles.actions}>
                    <Link to={`/services/${service.slug}`} className={styles.exploreBtn}>
                        Explore
                    </Link>
                    <Link to="/contact" className={styles.startBtn}>
                        Get Started
                    </Link>
                </div>
            </div>
        </article>
    );
}
