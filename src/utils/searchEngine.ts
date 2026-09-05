import type { SearchResult, Service } from '@/types';

/**
 * Normalize a string for searching: lowercase, trim, remove extra spaces
 */
function normalize(str: string): string {
    return str.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Calculate similarity between two strings using token overlap
 */
function tokenSimilarity(a: string, b: string): number {
    const tokensA = new Set(normalize(a).split(' '));
    const tokensB = new Set(normalize(b).split(' '));
    let overlap = 0;
    for (const token of tokensA) {
        if (tokensB.has(token)) overlap++;
    }
    return overlap / Math.max(tokensA.size, 1);
}

/**
 * Check if a string loosely contains a query (supports multi-word partial matching)
 */
function fuzzyMatch(text: string, query: string): boolean {
    const normalizedText = normalize(text);
    const normalizedQuery = normalize(query);

    // Direct substring match
    if (normalizedText.includes(normalizedQuery)) return true;

    // Token-based: every query word must appear somewhere in the text
    const queryTokens = normalizedQuery.split(' ');
    const allTokensFound = queryTokens.every(token =>
        normalizedText.includes(token)
    );
    if (allTokensFound) return true;

    return false;
}

/**
 * Score a service against a search query
 * Returns a relevance score (higher = more relevant)
 */
function scoreService(service: Service, query: string): { score: number; matchedFields: string[] } {
    const normalizedQuery = normalize(query);
    let score = 0;
    const matchedFields: string[] = [];

    // Exact name match (highest priority)
    if (normalize(service.name).includes(normalizedQuery)) {
        score += 100;
        matchedFields.push('name');
    } else if (fuzzyMatch(service.name, normalizedQuery)) {
        score += 70;
        matchedFields.push('name');
    }

    // Short description match
    if (fuzzyMatch(service.shortDescription, normalizedQuery)) {
        score += 40;
        matchedFields.push('shortDescription');
    }

    // Description match
    if (fuzzyMatch(service.description, normalizedQuery)) {
        score += 25;
        matchedFields.push('description');
    }

    // Keyword matches (very important - designed for natural language search)
    for (const keyword of service.keywords) {
        if (normalize(keyword).includes(normalizedQuery) || normalizedQuery.includes(normalize(keyword))) {
            score += 60;
            matchedFields.push('keywords');
            break;
        }
        if (fuzzyMatch(keyword, normalizedQuery)) {
            score += 40;
            matchedFields.push('keywords');
            break;
        }
        // Partial keyword match
        if (tokenSimilarity(keyword, normalizedQuery) > 0.5) {
            score += 25;
            matchedFields.push('keywords');
            break;
        }
    }

    // Tag matches
    for (const tag of service.tags) {
        if (fuzzyMatch(tag, normalizedQuery)) {
            score += 30;
            matchedFields.push('tags');
            break;
        }
    }

    // Category match
    if (fuzzyMatch(service.categoryId.replace(/-/g, ' '), normalizedQuery)) {
        score += 20;
        matchedFields.push('category');
    }

    // Subcategory match
    if (service.subcategoryId && fuzzyMatch(service.subcategoryId.replace(/-/g, ' '), normalizedQuery)) {
        score += 20;
        matchedFields.push('subcategory');
    }

    // Boost popular/featured services slightly
    if (service.popular) score += 5;
    if (service.featured) score += 3;

    return { score, matchedFields: [...new Set(matchedFields)] };
}

/**
 * Search services by query string
 * Returns ranked results with relevance scores
 */
export function searchServices(query: string, services: Service[], limit = 20): SearchResult[] {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];

    for (const service of services) {
        if (service.status === 'inactive') continue;

        const { score, matchedFields } = scoreService(service, query);
        if (score > 0) {
            results.push({ service, score, matchedFields });
        }
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    return results.slice(0, limit);
}

/**
 * Get search suggestions based on partial query
 */
export function getSearchSuggestions(query: string, services: Service[], limit = 6): string[] {
    if (!query.trim() || query.length < 2) return [];

    const normalizedQuery = normalize(query);
    const suggestions = new Set<string>();

    for (const service of services) {
        // Suggest service names
        if (normalize(service.name).includes(normalizedQuery)) {
            suggestions.add(service.name);
        }
        // Suggest matching keywords
        for (const keyword of service.keywords) {
            if (normalize(keyword).includes(normalizedQuery)) {
                suggestions.add(keyword);
            }
        }
        if (suggestions.size >= limit) break;
    }

    return [...suggestions].slice(0, limit);
}
