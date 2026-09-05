import { useParams, Link } from 'react-router-dom';
import ServiceCard from '@/components/services/ServiceCard/ServiceCard';
import { serviceRepository } from '@/services/serviceRepository';
import Icon from '@/components/shared/Icon/Icon';
import styles from './CategoryPage.module.scss';

export default function CategoryPage() {
    const { categoryId } = useParams<{ categoryId: string }>();
    const category = categoryId ? serviceRepository.getCategoryById(categoryId) : undefined;
    const services = categoryId ? serviceRepository.getByCategory(categoryId) : [];

    if (!category) {
        return (
            <div className={styles.notFound}>
                <div className="container">
                    <h1>Category Not Found</h1>
                    <p>This category doesn't exist.</p>
                    <Link to="/services" className={styles.backBtn}>Browse All Services</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className="container">
                <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                    <Link to="/services">Services</Link>
                    <span>/</span>
                    <span className={styles.current}>{category.name}</span>
                </nav>

                <header className={styles.header}>
                    <span className={styles.icon}><Icon name={category.icon} size={24} /></span>
                    <h1 className={styles.title}>{category.name}</h1>
                    <p className={styles.desc}>{category.description}</p>
                    <p className={styles.count}>{services.length} service{services.length !== 1 ? 's' : ''} available</p>
                </header>

                {/* Subcategories */}
                {category.subcategories.length > 0 && (
                    <div className={styles.subcategories}>
                        {category.subcategories.map(sub => {
                            const subServices = serviceRepository.getBySubcategory(sub.id);
                            return (
                                <span key={sub.id} className={styles.subBadge}>
                                    {sub.name} ({subServices.length})
                                </span>
                            );
                        })}
                    </div>
                )}

                {services.length > 0 ? (
                    <div className={styles.grid}>
                        {services.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <p>No services available in this category yet.</p>
                        <Link to="/services">Browse all services</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
