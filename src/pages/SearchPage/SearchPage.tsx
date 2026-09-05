import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ServiceCard from '@/components/services/ServiceCard/ServiceCard';
import SearchBar from '@/components/shared/SearchBar/SearchBar';
import { serviceRepository } from '@/services/serviceRepository';
import type { SearchResult } from '@/types';
import styles from './SearchPage.module.scss';

const THINKING_STEPS = [
    'Understanding your request...',
    'Analyzing service catalog...',
    'Finding the best matches...',
    'Ranking results by relevance...',
];

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [thinkingStep, setThinkingStep] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sortBy, setSortBy] = useState<'relevance' | 'name'>('relevance');

    const performSearch = useCallback((q: string) => {
        if (!q.trim()) {
            setResults([]);
            setShowResults(true);
            return;
        }

        setIsThinking(true);
        setShowResults(false);
        setThinkingStep(0);

        // Simulate thinking steps for UX
        const stepDuration = 400;
        THINKING_STEPS.forEach((_, i) => {
            setTimeout(() => setThinkingStep(i), i * stepDuration);
        });

        setTimeout(() => {
            const searchResults = serviceRepository.search(q);
            setResults(searchResults);
            setIsThinking(false);
            setShowResults(true);
        }, THINKING_STEPS.length * stepDuration + 200);
    }, []);

    useEffect(() => {
        if (query) performSearch(query);
        else setShowResults(true);
    }, [query, performSearch]);

    const handleSearch = (q: string) => {
        setSearchParams({ q });
    };

    const filteredResults = useMemo(() => {
        let filtered = results;
        if (selectedCategory) {
            filtered = filtered.filter(r => r.service.categoryId === selectedCategory);
        }
        if (sortBy === 'name') {
            filtered = [...filtered].sort((a, b) => a.service.name.localeCompare(b.service.name));
        }
        return filtered;
    }, [results, selectedCategory, sortBy]);

    const categories = useMemo(() => {
        const cats = new Set(results.map(r => r.service.categoryId));
        return Array.from(cats);
    }, [results]);

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.searchHeader}>
                    <h1 className={styles.title}>Search Services</h1>
                    <SearchBar variant="hero" onSearch={handleSearch} />
                </div>

                {/* Thinking Animation */}
                {isThinking && (
                    <div className={styles.thinking}>
                        <div className={styles.thinkingConsole}>
                            {THINKING_STEPS.map((step, i) => (
                                <div
                                    key={step}
                                    className={`${styles.thinkingStep} ${i <= thinkingStep ? styles.active : ''}`}
                                >
                                    <span className={styles.thinkingDot}>
                                        {i < thinkingStep ? '✓' : i === thinkingStep ? (
                                            <span className={styles.pulse} />
                                        ) : '○'}
                                    </span>
                                    <span className={styles.thinkingText}>{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Results */}
                {showResults && (
                    <div className={styles.results}>
                        {query && (
                            <div className={styles.resultsMeta}>
                                <p className={styles.resultsCount}>
                                    {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for "<strong>{query}</strong>"
                                </p>

                                {/* Filters */}
                                {results.length > 0 && (
                                    <div className={styles.filters}>
                                        <select
                                            value={selectedCategory}
                                            onChange={e => setSelectedCategory(e.target.value)}
                                            className={styles.filterSelect}
                                            aria-label="Filter by category"
                                        >
                                            <option value="">All Categories</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>
                                                    {cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={sortBy}
                                            onChange={e => setSortBy(e.target.value as 'relevance' | 'name')}
                                            className={styles.filterSelect}
                                            aria-label="Sort by"
                                        >
                                            <option value="relevance">Sort by Relevance</option>
                                            <option value="name">Sort by Name</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        )}

                        {filteredResults.length > 0 ? (
                            <div className={styles.grid}>
                                {filteredResults.map(result => (
                                    <ServiceCard
                                        key={result.service.id}
                                        service={result.service}
                                        matchedFields={result.matchedFields}
                                    />
                                ))}
                            </div>
                        ) : query ? (
                            <div className={styles.empty}>
                                <span className={styles.emptyIcon}>🔍</span>
                                <h3 className={styles.emptyTitle}>No services matched that search</h3>
                                <p className={styles.emptyDesc}>Try different keywords or ask our AI assistant.</p>
                                <Link to="/ai" className={styles.emptyBtn}>
                                    <span className={styles.aiDot} /> Ask 360 AI
                                </Link>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}
