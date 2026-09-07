import { useState } from 'react';
import Hero from '@/components/sections/Hero/Hero';
import CategoryCard from '@/components/services/CategoryCard/CategoryCard';
import ServiceCard from '@/components/services/ServiceCard/ServiceCard';
import { bundles } from '@/data/bundles';
import { serviceRepository } from '@/services/serviceRepository';
import { Link } from 'react-router-dom';
import Icon from '@/components/shared/Icon/Icon';
import styles from './HomePage.module.scss';

const HOW_IT_WORKS = [
    { step: '01', title: 'Tell Us What You Need', desc: 'Search, browse, or ask our AI assistant.' },
    { step: '02', title: 'We Match You', desc: 'Get matched with the right services and team.' },
    { step: '03', title: 'Get It Done', desc: 'We deliver professional results, on time.' },
];

export default function HomePage() {
    const popularCategories = serviceRepository.getPopularCategories();
    const featuredServices = serviceRepository.getFeatured();
    const popularServices = serviceRepository.getPopular().slice(0, 8);

    // Pagination state for Featured Services
    const [visibleFeatured, setVisibleFeatured] = useState(8);

    return (
        <div className={styles.home}>
            <Hero />

            {/* How it Works (Moved to top based on user request) */}
            <section className={`section ${styles.howSection}`}>
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">Getting started is simple.</p>
                    <div className={styles.howGrid}>
                        {HOW_IT_WORKS.map(item => (
                            <div key={item.step} className={styles.howCard}>
                                <span className={styles.howStep}>{item.step}</span>
                                <h3 className={styles.howTitle}>{item.title}</h3>
                                <p className={styles.howDesc}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className={`section ${styles.categoriesSection}`}>
                <div className="container">
                    <h2 className="section-title">Explore Categories</h2>
                    <p className="section-subtitle">Browse our service categories — from development and design to marketing and AI.</p>
                    <div className={styles.categoryGrid}>
                        {popularCategories.map(cat => (
                            <CategoryCard key={cat.id} category={cat} />
                        ))}
                    </div>
                    <div className={styles.viewAll}>
                        <Link to="/services" className={styles.viewAllLink}>View all categories →</Link>
                    </div>
                </div>
            </section>

            {/* Featured Services (Paginated) */}
            <section className={`section ${styles.featuredSection}`}>
                <div className="container">
                    <h2 className="section-title">Featured Services</h2>
                    <p className="section-subtitle">Our most popular services trusted by businesses and professionals.</p>
                    <div className={styles.serviceGrid}>
                        {featuredServices.slice(0, visibleFeatured).map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                    {visibleFeatured < featuredServices.length && (
                        <div className={styles.viewAll}>
                            <button
                                onClick={() => setVisibleFeatured(prev => prev + 8)}
                                className={styles.ctaSecondary}
                            >
                                Show More
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Service Bundles */}
            <section className={`section ${styles.bundlesSection}`}>
                <div className="container">
                    <h2 className="section-title">Service Bundles</h2>
                    <p className="section-subtitle">Curated packages designed for common goals — save time and money.</p>
                    <div className={styles.bundleGrid}>
                        {bundles.filter(b => b.popular).map(bundle => (
                            <div key={bundle.id} className={styles.bundleCard}>
                                <span className={styles.bundleIcon}><Icon name={bundle.icon} size={24} /></span>
                                <h3 className={styles.bundleName}>{bundle.name}</h3>
                                <p className={styles.bundleDesc}>{bundle.description}</p>
                                <span className={styles.bundleTag}>{bundle.tagline}</span>
                                {bundle.savings && <span className={styles.bundleSaving}>{bundle.savings}</span>}
                                <Link to="/contact" className={styles.bundleCta}>Learn More</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Services Grid */}
            <section className={`section ${styles.popularSection}`}>
                <div className="container">
                    <h2 className="section-title">Popular Services</h2>
                    <p className="section-subtitle">Trending services across all categories.</p>
                    <div className={styles.serviceGrid}>
                        {popularServices.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={`section ${styles.ctaSection}`}>
                <div className="container">
                    <div className={styles.ctaCard}>
                        <h2 className={styles.ctaTitle}>Ready to get started?</h2>
                        <p className={styles.ctaDesc}>Tell us what you need, and we'll handle the rest.</p>
                        <div className={styles.ctaActions}>
                            <Link to="/services" className={styles.ctaPrimary}>Explore Services</Link>
                            <Link to="/contact" className={styles.ctaSecondary}>Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
