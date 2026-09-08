import { useParams, Link } from 'react-router-dom';
import ServiceCard from '@/components/services/ServiceCard/ServiceCard';
import Badge from '@/components/shared/Badge/Badge';
import { serviceRepository } from '@/services/serviceRepository';
import Icon from '@/components/shared/Icon/Icon';
import styles from './ServiceDetailPage.module.scss';

export default function ServiceDetailPage() {
    const { serviceId } = useParams<{ serviceId: string }>();
    const service = serviceId ? serviceRepository.getBySlug(serviceId) : undefined;

    if (!service) {
        return (
            <div className={styles.notFound}>
                <div className="container">
                    <span className={styles.nfIcon}></span>
                    <h1>Service Not Found</h1>
                    <p>This service isn't currently available or doesn't exist.</p>
                    <Link to="/services" className={styles.backBtn}>Browse Services</Link>
                </div>
            </div>
        );
    }

    const relatedServices = serviceRepository.getRelated(service.id);
    const category = serviceRepository.getCategoryById(service.categoryId);

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Breadcrumb */}
                <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                    <Link to="/services">Services</Link>
                    <span>/</span>
                    {category && <><Link to={`/category/${category.id}`}>{category.name}</Link><span>/</span></>}
                    <span className={styles.current}>{service.name}</span>
                </nav>

                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <span className={styles.icon}><Icon name={service.icon} size={32} /></span>
                        <div>
                            <h1 className={styles.title}>{service.name}</h1>
                            <div className={styles.meta}>
                                {service.popular && <Badge variant="accent">Popular</Badge>}
                                {service.tags.slice(0, 4).map(tag => (
                                    <Badge key={tag}>{tag}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Link to={`/contact?service=${service.slug}`} className={styles.ctaBtn}>Get Started</Link>
                </header>

                {/* Content Grid */}
                <div className={styles.grid}>
                    <div className={styles.main}>
                        {/* Description */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Overview</h2>
                            <p className={styles.desc}>{service.description}</p>
                        </section>

                        {/* Deliverables */}
                        {service.deliverables && service.deliverables.length > 0 && (
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>What We Deliver</h2>
                                <ul className={styles.deliverables}>
                                    {service.deliverables.map(item => (
                                        <li key={item} className={styles.deliverable}>
                                            <span className={styles.check}></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Process */}
                        {service.process && service.process.length > 0 && (
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Our Process</h2>
                                <div className={styles.process}>
                                    {service.process.map(step => (
                                        <div key={step.step} className={styles.processStep}>
                                            <span className={styles.processNum}>{String(step.step).padStart(2, '0')}</span>
                                            <div>
                                                <h3 className={styles.processTitle}>{step.title}</h3>
                                                <p className={styles.processDesc}>{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* FAQ */}
                        {service.faq && service.faq.length > 0 && (
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>FAQ</h2>
                                <div className={styles.faqList}>
                                    {service.faq.map(item => (
                                        <details key={item.question} className={styles.faqItem}>
                                            <summary className={styles.faqQ}>{item.question}</summary>
                                            <p className={styles.faqA}>{item.answer}</p>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.priceCard}>
                            <h3 className={styles.priceTitle}>Pricing</h3>
                            <p className={styles.priceNote}>Price provided after requirement analysis</p>
                            {service.estimatedDuration && (
                                <div className={styles.duration}>
                                    <span className={styles.durationLabel}>Est. Timeline</span>
                                    <span className={styles.durationValue}>{service.estimatedDuration}</span>
                                </div>
                            )}
                            <Link to="/contact" className={styles.sidebarCta}>Get Started</Link>
                            <Link to="/ai" className={styles.sidebarAi}>
                                <span className={styles.aiDot} /> Ask AI about this service
                            </Link>
                        </div>
                    </aside>
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                    <section className={styles.related}>
                        <h2 className="section-title">Related Services</h2>
                        <div className={styles.relatedGrid}>
                            {relatedServices.map(s => (
                                <ServiceCard key={s.id} service={s} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
