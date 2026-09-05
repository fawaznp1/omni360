import { Link } from 'react-router-dom';
import { serviceRepository } from '@/services/serviceRepository';
import type { Category } from '@/types';
import Icon from '@/components/shared/Icon/Icon';
import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const count = serviceRepository.getServiceCountByCategory(category.id);

    return (
        <Link to={`/category/${category.id}`} className={styles.card}>
            <div className={styles.iconWrap} style={{ '--cat-color': category.color } as React.CSSProperties}>
                <span className={styles.icon}><Icon name={category.icon} size={24} /></span>
            </div>
            <h3 className={styles.name}>{category.name}</h3>
            <p className={styles.desc}>{category.description}</p>
            <div className={styles.footer}>
                <span className={styles.count}>{count} service{count !== 1 ? 's' : ''}</span>
                <span className={styles.arrow}>→</span>
            </div>
        </Link>
    );
}
