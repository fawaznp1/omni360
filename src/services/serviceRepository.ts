import { categories } from '@/data/categories';
import { services } from '@/data/services';
import type { Category, SearchResult, Service } from '@/types';
import { searchServices } from '@/utils/searchEngine';

/**
 * Service Repository — Data access abstraction layer
 * Replace this with API calls when connecting to a backend
 */
export const serviceRepository = {
    getAll(): Service[] {
        return services;
    },

    getById(id: string): Service | undefined {
        return services.find(s => s.id === id);
    },

    getBySlug(slug: string): Service | undefined {
        return services.find(s => s.slug === slug);
    },

    getByCategory(categoryId: string): Service[] {
        return services.filter(s => s.categoryId === categoryId && s.status !== 'inactive');
    },

    getBySubcategory(subcategoryId: string): Service[] {
        return services.filter(s => s.subcategoryId === subcategoryId && s.status !== 'inactive');
    },

    getFeatured(): Service[] {
        return services.filter(s => s.featured && s.status !== 'inactive');
    },

    getPopular(): Service[] {
        return services.filter(s => s.popular && s.status !== 'inactive');
    },

    getRelated(serviceId: string): Service[] {
        const service = this.getById(serviceId);
        if (!service?.relatedServices) return [];
        return service.relatedServices
            .map(id => this.getById(id))
            .filter((s): s is Service => s !== undefined);
    },

    search(query: string): SearchResult[] {
        return searchServices(query, services);
    },

    getAllCategories(): Category[] {
        return categories;
    },

    getCategoryById(id: string): Category | undefined {
        return categories.find(c => c.id === id);
    },

    getPopularCategories(): Category[] {
        return categories.filter(c => c.popular);
    },

    getServiceCountByCategory(categoryId: string): number {
        return services.filter(s => s.categoryId === categoryId && s.status !== 'inactive').length;
    },
};
