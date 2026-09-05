import { useState, useMemo } from 'react';
import CategoryCard from '@/components/services/CategoryCard/CategoryCard';
import ServiceCard from '@/components/services/ServiceCard/ServiceCard';
import SearchBar from '@/components/shared/SearchBar/SearchBar';
import { serviceRepository } from '@/services/serviceRepository';
import { bundles } from '@/data/bundles';
import { Link } from 'react-router-dom';
import Icon from '@/components/shared/Icon/Icon';
import styles from './ServicesPage.module.scss';

export default function ServicesPage() {
    const [viewMode, setViewMode] = useState<'categories' | 'services'>('categories');
    const allCategories = serviceRepository.getAllCategories();
    const allServices = serviceRepository.getAll();
    const [filterCategory, setFilterCategory] = useState('');

    const displayedServices = useMemo(() => {
        if (!filterCategory) return allServices;
        return allServices.filter(s => s.categoryId === filterCategory);
    }, [allServices, filterCategory]);

    return (
        <div className={styles.page}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>All Services</h1>
                    <p className={styles.subtitle}>Browse our complete catalog of digital services.</p>
                    <SearchBar variant="hero" />
                </header>

                {/* View Toggle */}
                <div className={styles.controls}>
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${viewMode === 'categories' ? styles.active : ''}`}
                            onClick={() => setViewMode('categories')}
                        >
                            Categories
                        </button>
                        <button
                            className={`${styles.tab} ${viewMode === 'services' ? styles.active : ''}`}
                            onClick={() => setViewMode('services')}
                        >
                            All Services ({allServices.length})
                        </button>
                    </div>

                    {viewMode === 'services' && (
                        <select
                            value={filterCategory}
                            onChange={e => setFilterCategory(e.target.value)}
                            className={styles.filter}
                            aria-label="Filter by category"
                        >
                            <option value="">All Categories</option>
                            {allCategories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Categories View */}
                {viewMode === 'categories' && (
                    <div className={styles.categoryGrid} id="categories">
                        {allCategories.map(cat => (
                            <CategoryCard key={cat.id} category={cat} />
                        ))}
                    </div>
                )}

                {/* Services View */}
                {viewMode === 'services' && (
                    <div className={styles.serviceGrid}>
                        {displayedServices.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                )}

                {/* Bundles */}
                <section className={styles.bundlesSection} id="bundles">
                    <h2 className="section-title">Service Bundles</h2>
                    <p className="section-subtitle">Curated packages for common goals.</p>
                    <div className={styles.bundleGrid}>
                        {bundles.map(bundle => (
                            <div key={bundle.id} className={styles.bundleCard}>
                                <span className={styles.bundleIcon}><Icon name={bundle.icon} size={24} /></span>
                                <h3 className={styles.bundleName}>{bundle.name}</h3>
                                <p className={styles.bundleDesc}>{bundle.description}</p>
                                {bundle.savings && <span className={styles.bundleSaving}>{bundle.savings}</span>}
                                <Link to="/contact" className={styles.bundleCta}>Learn More</Link>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
