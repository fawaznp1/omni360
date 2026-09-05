import type { Category } from '@/types';

export const categories: Category[] = [
    {
        id: 'web-development', name: 'Web Development',
        description: 'Custom websites, web apps, and digital experiences built with modern technologies.',
        icon: 'CheckCircle', color: '#6c5ce7', popular: true,
        subcategories: [
            { id: 'business-websites', name: 'Business Websites', parentCategoryId: 'web-development' },
            { id: 'web-applications', name: 'Web Applications', parentCategoryId: 'web-development' },
            { id: 'landing-pages', name: 'Landing Pages', parentCategoryId: 'web-development' },
            { id: 'portfolio-websites', name: 'Portfolio Websites', parentCategoryId: 'web-development' },
            { id: 'wordpress', name: 'WordPress', parentCategoryId: 'web-development' },
        ],
    },
    {
        id: 'ecommerce', name: 'E-Commerce',
        description: 'Online stores, product catalogs, payment systems, and everything to sell online.',
        icon: 'ShoppingCart', color: '#00d2ff', popular: true,
        subcategories: [
            { id: 'shopify', name: 'Shopify', parentCategoryId: 'ecommerce' },
            { id: 'woocommerce', name: 'WooCommerce', parentCategoryId: 'ecommerce' },
            { id: 'custom-ecommerce', name: 'Custom E-Commerce', parentCategoryId: 'ecommerce' },
            { id: 'marketplace', name: 'Marketplace Development', parentCategoryId: 'ecommerce' },
        ],
    },
    {
        id: 'software-development', name: 'Software Development',
        description: 'Custom software solutions, SaaS platforms, and enterprise applications.',
        icon: 'Settings', color: '#a29bfe',
        subcategories: [
            { id: 'saas', name: 'SaaS Development', parentCategoryId: 'software-development' },
            { id: 'crm', name: 'CRM Development', parentCategoryId: 'software-development' },
            { id: 'erp', name: 'ERP Systems', parentCategoryId: 'software-development' },
            { id: 'api-development', name: 'API Development', parentCategoryId: 'software-development' },
        ],
    },
    {
        id: 'mobile-development', name: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        icon: 'Smartphone', color: '#fd79a8', popular: true,
        subcategories: [
            { id: 'ios', name: 'iOS Development', parentCategoryId: 'mobile-development' },
            { id: 'android', name: 'Android Development', parentCategoryId: 'mobile-development' },
            { id: 'cross-platform', name: 'Cross-Platform', parentCategoryId: 'mobile-development' },
        ],
    },
    {
        id: 'uiux-design', name: 'UI/UX Design',
        description: 'User interface design, user experience research, and interactive prototypes.',
        icon: 'Palette', color: '#e17055', popular: true,
        subcategories: [
            { id: 'ui-design', name: 'UI Design', parentCategoryId: 'uiux-design' },
            { id: 'ux-research', name: 'UX Research', parentCategoryId: 'uiux-design' },
            { id: 'prototyping', name: 'Prototyping', parentCategoryId: 'uiux-design' },
        ],
    },
    {
        id: 'graphic-design', name: 'Graphic Design',
        description: 'Visual design, illustrations, infographics, and print materials.',
        icon: '️', color: '#fdcb6e',
        subcategories: [
            { id: 'illustrations', name: 'Illustrations', parentCategoryId: 'graphic-design' },
            { id: 'infographics', name: 'Infographics', parentCategoryId: 'graphic-design' },
            { id: 'print-design', name: 'Print Design', parentCategoryId: 'graphic-design' },
        ],
    },
    {
        id: 'branding', name: 'Branding & Identity',
        description: 'Brand strategy, logo design, visual identity, and brand guidelines.',
        icon: 'CheckCircle', color: '#e056a0', popular: true,
        subcategories: [
            { id: 'logo-design', name: 'Logo Design', parentCategoryId: 'branding' },
            { id: 'brand-strategy', name: 'Brand Strategy', parentCategoryId: 'branding' },
            { id: 'brand-guidelines', name: 'Brand Guidelines', parentCategoryId: 'branding' },
        ],
    },
    {
        id: 'digital-marketing', name: 'Digital Marketing',
        description: 'Online advertising, email campaigns, PPC, and growth strategies.',
        icon: 'TrendingUp', color: '#00b894', popular: true,
        subcategories: [
            { id: 'ppc', name: 'PPC Advertising', parentCategoryId: 'digital-marketing' },
            { id: 'email-marketing', name: 'Email Marketing', parentCategoryId: 'digital-marketing' },
            { id: 'marketing-strategy', name: 'Marketing Strategy', parentCategoryId: 'digital-marketing' },
        ],
    },
    {
        id: 'seo', name: 'SEO',
        description: 'Search engine optimization, keyword research, and organic growth.',
        icon: 'Search', color: '#00cec9', popular: true,
        subcategories: [
            { id: 'on-page-seo', name: 'On-Page SEO', parentCategoryId: 'seo' },
            { id: 'technical-seo', name: 'Technical SEO', parentCategoryId: 'seo' },
            { id: 'local-seo', name: 'Local SEO', parentCategoryId: 'seo' },
        ],
    },
    {
        id: 'social-media', name: 'Social Media',
        description: 'Social media management, content creation, and community engagement.',
        icon: 'Megaphone', color: '#e84393',
        subcategories: [
            { id: 'social-management', name: 'Social Media Management', parentCategoryId: 'social-media' },
            { id: 'social-content', name: 'Content Creation', parentCategoryId: 'social-media' },
            { id: 'social-advertising', name: 'Social Advertising', parentCategoryId: 'social-media' },
        ],
    },
    {
        id: 'content-creation', name: 'Content & Copywriting',
        description: 'Blog posts, articles, website copy, ad copy, and content strategy.',
        icon: 'FileText', color: '#74b9ff',
        subcategories: [
            { id: 'copywriting', name: 'Copywriting', parentCategoryId: 'content-creation' },
            { id: 'blog-writing', name: 'Blog Writing', parentCategoryId: 'content-creation' },
            { id: 'technical-writing', name: 'Technical Writing', parentCategoryId: 'content-creation' },
        ],
    },
    {
        id: 'video-production', name: 'Video & Animation',
        description: 'Video production, editing, motion graphics, and animated content.',
        icon: 'Clapperboard', color: '#ff7675',
        subcategories: [
            { id: 'video-editing', name: 'Video Editing', parentCategoryId: 'video-production' },
            { id: 'animation', name: 'Animation', parentCategoryId: 'video-production' },
            { id: 'motion-graphics', name: 'Motion Graphics', parentCategoryId: 'video-production' },
        ],
    },
    {
        id: 'ai-services', name: 'AI & Automation',
        description: 'AI integration, chatbots, workflow automation, and intelligent systems.',
        icon: 'CheckCircle', color: '#6c5ce7', popular: true,
        subcategories: [
            { id: 'ai-integration', name: 'AI Integration', parentCategoryId: 'ai-services' },
            { id: 'chatbots', name: 'Chatbot Development', parentCategoryId: 'ai-services' },
            { id: 'workflow-automation', name: 'Workflow Automation', parentCategoryId: 'ai-services' },
        ],
    },
    {
        id: 'cloud-devops', name: 'Cloud & DevOps',
        description: 'Cloud infrastructure, CI/CD, deployment, and system administration.',
        icon: 'Cloud', color: '#0984e3',
        subcategories: [
            { id: 'cloud-setup', name: 'Cloud Setup', parentCategoryId: 'cloud-devops' },
            { id: 'ci-cd', name: 'CI/CD Pipelines', parentCategoryId: 'cloud-devops' },
            { id: 'containerization', name: 'Containerization', parentCategoryId: 'cloud-devops' },
        ],
    },
    {
        id: 'cybersecurity', name: 'Cybersecurity',
        description: 'Security audits, penetration testing, compliance, and data protection.',
        icon: 'Lock', color: '#d63031',
        subcategories: [
            { id: 'security-audits', name: 'Security Audits', parentCategoryId: 'cybersecurity' },
            { id: 'penetration-testing', name: 'Penetration Testing', parentCategoryId: 'cybersecurity' },
        ],
    },
    {
        id: 'data-analytics', name: 'Data & Analytics',
        description: 'Data analysis, visualization, business intelligence, and reporting.',
        icon: 'BarChart', color: '#00b894',
        subcategories: [
            { id: 'data-analysis', name: 'Data Analysis', parentCategoryId: 'data-analytics' },
            { id: 'data-visualization', name: 'Data Visualization', parentCategoryId: 'data-analytics' },
            { id: 'business-intelligence', name: 'Business Intelligence', parentCategoryId: 'data-analytics' },
        ],
    },
    {
        id: 'research', name: 'Research & Insights',
        description: 'Market research, competitor analysis, industry reports, and strategic insights.',
        icon: 'CheckCircle', color: '#636e72',
        subcategories: [
            { id: 'market-research', name: 'Market Research', parentCategoryId: 'research' },
            { id: 'competitor-analysis', name: 'Competitor Analysis', parentCategoryId: 'research' },
            { id: 'academic-research', name: 'Academic Research', parentCategoryId: 'research' },
        ],
    },
    {
        id: 'finance-trading', name: 'Finance & Trading Research',
        description: 'Financial analysis tools, trading dashboards, portfolio analytics, and market research.',
        icon: 'CheckCircle', color: '#27ae60',
        subcategories: [
            { id: 'financial-analysis', name: 'Financial Analysis', parentCategoryId: 'finance-trading' },
            { id: 'trading-tools', name: 'Trading Research Tools', parentCategoryId: 'finance-trading' },
            { id: 'portfolio-analytics', name: 'Portfolio Analytics', parentCategoryId: 'finance-trading' },
        ],
    },
    {
        id: 'business-services', name: 'Business Services',
        description: 'Business planning, consulting, startup support, and strategic services.',
        icon: 'Briefcase', color: '#2d3436',
        subcategories: [
            { id: 'business-planning', name: 'Business Planning', parentCategoryId: 'business-services' },
            { id: 'consulting', name: 'Consulting', parentCategoryId: 'business-services' },
            { id: 'startup-support', name: 'Startup Support', parentCategoryId: 'business-services' },
        ],
    },
    {
        id: 'admin-support', name: 'Admin & Virtual Assistance',
        description: 'Virtual assistants, data entry, document services, and administrative support.',
        icon: 'CheckCircle', color: '#b2bec3',
        subcategories: [
            { id: 'virtual-assistance', name: 'Virtual Assistance', parentCategoryId: 'admin-support' },
            { id: 'data-entry', name: 'Data Entry', parentCategoryId: 'admin-support' },
            { id: 'document-services', name: 'Document Services', parentCategoryId: 'admin-support' },
        ],
    },
    {
        id: 'writing-translation', name: 'Writing & Translation',
        description: 'Translation, transcription, proofreading, editing, and localization.',
        icon: 'CheckCircle', color: '#00cec9',
        subcategories: [
            { id: 'translation', name: 'Translation', parentCategoryId: 'writing-translation' },
            { id: 'transcription', name: 'Transcription', parentCategoryId: 'writing-translation' },
            { id: 'proofreading', name: 'Proofreading & Editing', parentCategoryId: 'writing-translation' },
        ],
    },
    {
        id: 'career-services', name: 'Career & Professional',
        description: 'Resume writing, LinkedIn optimization, career coaching, and recruitment support.',
        icon: 'CheckCircle', color: '#fdcb6e',
        subcategories: [
            { id: 'resume-cv', name: 'Resume & CV', parentCategoryId: 'career-services' },
            { id: 'linkedin', name: 'LinkedIn Services', parentCategoryId: 'career-services' },
            { id: 'personal-branding', name: 'Personal Branding', parentCategoryId: 'career-services' },
        ],
    },
    {
        id: 'education', name: 'Education & E-Learning',
        description: 'Online courses, e-learning platforms, educational content, and training.',
        icon: 'GraduationCap', color: '#0984e3',
        subcategories: [
            { id: 'course-creation', name: 'Course Creation', parentCategoryId: 'education' },
            { id: 'elearning-platforms', name: 'E-Learning Platforms', parentCategoryId: 'education' },
            { id: 'training-materials', name: 'Training Materials', parentCategoryId: 'education' },
        ],
    },
    {
        id: 'nocode-lowcode', name: 'No-Code & Low-Code',
        description: 'Build powerful applications without traditional coding using modern platforms.',
        icon: 'CheckCircle', color: '#a29bfe',
        subcategories: [
            { id: 'webflow', name: 'Webflow', parentCategoryId: 'nocode-lowcode' },
            { id: 'bubble', name: 'Bubble', parentCategoryId: 'nocode-lowcode' },
            { id: 'zapier', name: 'Zapier Automation', parentCategoryId: 'nocode-lowcode' },
        ],
    },
];
