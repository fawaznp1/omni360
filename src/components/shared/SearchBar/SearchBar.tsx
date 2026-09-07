import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceRepository } from '@/services/serviceRepository';
import { getSearchSuggestions } from '@/utils/searchEngine';
import styles from './SearchBar.module.scss';
import Icon from '../Icon/Icon';

interface SearchBarProps {
    variant?: 'hero' | 'header';
    placeholder?: string;
    onSearch?: (query: string) => void;
}

export default function SearchBar({
    variant = 'hero',
    placeholder = 'What do you need help with?',
    onSearch,
}: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const updateSuggestions = useCallback((value: string) => {
        if (value.length >= 2) {
            const allServices = serviceRepository.getAll();
            const results = getSearchSuggestions(value, allServices);
            setSuggestions(results);
            setShowSuggestions(results.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
        setSelectedIndex(-1);
    }, []);

    const handleSubmit = useCallback((searchQuery?: string) => {
        const q = (searchQuery || query).trim();
        if (!q) return;
        setShowSuggestions(false);
        if (onSearch) {
            onSearch(q);
        } else {
            navigate(`/search?q=${encodeURIComponent(q)}`);
        }
    }, [query, navigate, onSearch]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                setQuery(suggestions[selectedIndex]);
                handleSubmit(suggestions[selectedIndex]);
            } else {
                handleSubmit();
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`${styles.wrapper} ${styles[variant]}`} ref={wrapperRef}>
            <div className={styles.inputWrapper}>
                <span className={styles.searchIcon}></span>
                <input
                    ref={inputRef}
                    type="text"
                    className={styles.input}
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        updateSuggestions(e.target.value);
                    }}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    aria-label="Search services"
                    aria-autocomplete="list"
                    aria-expanded={showSuggestions}
                />
                <button
                    className={styles.searchBtn}
                    onClick={() => handleSubmit()}
                    aria-label="Search"
                >
                    Search
                </button>
            </div>

            {showSuggestions && (
                <ul className={styles.suggestions} role="listbox">
                    {suggestions.map((suggestion, i) => (
                        <li
                            key={suggestion}
                            className={`${styles.suggestion} ${i === selectedIndex ? styles.selected : ''}`}
                            role="option"
                            aria-selected={i === selectedIndex}
                            onClick={() => {
                                setQuery(suggestion);
                                handleSubmit(suggestion);
                            }}
                            onMouseEnter={() => setSelectedIndex(i)}
                        >
                            <span className={styles.suggestionIcon}></span>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
