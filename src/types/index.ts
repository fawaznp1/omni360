export interface Service {
    id: string;
    slug: string;
    name: string;
    shortDescription: string;
    description: string;
    categoryId: string;
    subcategoryId?: string;
    keywords: string[];
    tags: string[];
    icon: string;
    image?: string;
    popular?: boolean;
    featured?: boolean;
    status?: 'active' | 'coming-soon' | 'inactive';
    serviceType?: string;
    deliverables?: string[];
    process?: ProcessStep[];
    faq?: FAQ[];
    relatedServices?: string[];
    pricing?: PricingInfo;
    estimatedDuration?: string;
}

export interface ProcessStep {
    step: number;
    title: string;
    description: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface PricingInfo {
    startingFrom?: string;
    type: 'fixed' | 'hourly' | 'project' | 'custom';
    note?: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    subcategories: Subcategory[];
    serviceCount?: number;
    popular?: boolean;
}

export interface Subcategory {
    id: string;
    name: string;
    description?: string;
    parentCategoryId: string;
}

export interface ServiceBundle {
    id: string;
    name: string;
    description: string;
    tagline: string;
    serviceIds: string[];
    icon: string;
    popular?: boolean;
    savings?: string;
}

export interface SearchResult {
    service: Service;
    score: number;
    matchedFields: string[];
}

export interface AIMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    serviceRecommendations?: string[];
}

export interface ThemeMode {
    mode: 'dark' | 'light';
}
