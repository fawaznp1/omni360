import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '@/components/shared/Icon/Icon';
import styles from './ContactPage.module.scss';

export default function ContactPage() {
    const [searchParams] = useSearchParams();
    const serviceParam = searchParams.get('service') || '';

    const [formData, setFormData] = useState({
        name: '', email: '', company: '', service: serviceParam, message: '',
    });

    useEffect(() => {
        if (serviceParam) {
            setFormData(prev => ({ ...prev, service: serviceParam }));
        }
    }, [serviceParam]);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would submit to a backend API
        console.log('Contact form submitted:', formData);
        setSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    if (submitted) {
        return (
            <div className={styles.page}>
                <div className="container">
                    <div className={styles.success}>
                        <span className={styles.successIcon}><Icon name="CheckCircle" size={48} /></span>
                        <h2>Thank you!</h2>
                        <p>We've received your message and will get back to you shortly.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>Get in Touch</h1>
                    <p className={styles.subtitle}>
                        Tell us about your project or ask us anything. We'll respond within 24 hours.
                    </p>
                </header>

                <div className={styles.grid}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor="name">Your Name</label>
                                <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="email">Email Address</label>
                                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor="company">Company <span className={styles.optional}>(optional)</span></label>
                                <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} placeholder="Your company" />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="service">Service of Interest</label>
                                <select id="service" name="service" value={formData.service} onChange={handleChange}>
                                    <option value="">Select a service...</option>
                                    <option value="web-development">Web Development</option>
                                    <option value="ecommerce">E-Commerce</option>
                                    <option value="mobile-app">Mobile App</option>
                                    <option value="design">Design & Branding</option>
                                    <option value="marketing">Digital Marketing</option>
                                    <option value="ai-automation">AI & Automation</option>
                                    <option value="other">Other</option>
                                    {serviceParam && !['web-development', 'ecommerce', 'mobile-app', 'design', 'marketing', 'ai-automation', 'other'].includes(serviceParam) && (
                                        <option value={serviceParam}>{serviceParam.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="message">Your Message</label>
                            <textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows={6} />
                        </div>
                        <button type="submit" className={styles.submitBtn}>Send Message</button>
                    </form>

                    <div className={styles.info}>
                        <div className={styles.infoCard}>
                            <h3><Icon name="Mail" size={20} /> Email Us</h3>
                            <p>hello@omni360.com</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3><Icon name="Bot" size={20} /> AI Assistant</h3>
                            <p>Need help figuring out what service you need? Our AI assistant can help you discover the right services.</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3><Icon name="Zap" size={20} /> Quick Response</h3>
                            <p>We typically respond within 24 hours on business days.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
