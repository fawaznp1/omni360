import type { AIMessage, Service } from '@/types';

// AI Provider configuration — easy to swap
const AI_CONFIG = {
    provider: import.meta.env.VITE_AI_PROVIDER || 'gemini',
    apiEndpoint: import.meta.env.VITE_AI_API_ENDPOINT || '/api/ai',
};

/**
 * Build a system prompt with service context
 */
function buildSystemPrompt(services: Service[]): string {
    const serviceList = services
        .filter(s => s.status !== 'inactive')
        .map(s => `- ${s.name} (${s.categoryId}): ${s.shortDescription}`)
        .join('\n');

    return `You are 360 AI, the intelligent assistant for Omni360 — a platform that provides 1000+ digital services.

Your role:
- Help users discover the right services for their needs
- Understand vague requests and recommend specific services
- Suggest service combinations and bundles
- Explain what services include
- Ask clarifying questions when needed

Available services:
${serviceList}

Guidelines:
- Be friendly, professional, and concise
- Only recommend services that exist in the catalog
- For complex needs, suggest multiple related services
- If you're not sure what the user needs, ask helpful follow-up questions
- Do not make guarantees about timeframes, pricing, or outcomes
- For financial services, clarify that we provide tools and research, not personalized financial advice`;
}

/**
 * AI Service — Abstraction layer for AI provider communication
 * Currently configured for Google Gemini API via backend proxy
 */
export const aiService = {
    /**
     * Send a message to the AI and get a response
     * In production, this should call your backend API, not the AI API directly
     */
    async sendMessage(
        userMessage: string,
        conversationHistory: AIMessage[],
        availableServices: Service[]
    ): Promise<string> {
        try {
            const response = await fetch(AI_CONFIG.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: conversationHistory.map(m => ({
                        role: m.role,
                        content: m.content,
                    })),
                    systemPrompt: buildSystemPrompt(availableServices),
                    provider: AI_CONFIG.provider,
                }),
            });

            if (!response.ok) {
                throw new Error(`AI service error: ${response.status}`);
            }

            const data = await response.json();
            return data.response || data.message || 'I apologize, I couldn\'t process that request.';
        } catch (error) {
            console.error('AI service error:', error);
            // Fallback — provide a helpful response without the API
            return generateFallbackResponse(userMessage, availableServices);
        }
    },

    getConfig() {
        return { ...AI_CONFIG };
    },
};

/**
 * Fallback response generator when AI API is unavailable
 * Uses keyword matching to provide relevant service suggestions
 */
function generateFallbackResponse(message: string, services: Service[]): string {
    const lower = message.toLowerCase();

    // Simple keyword matching for common intents
    const matchedServices = services.filter(s => {
        const searchText = [
            s.name, s.shortDescription, ...s.keywords, ...s.tags, s.categoryId
        ].join(' ').toLowerCase();

        const words = lower.split(/\s+/);
        return words.some(word => word.length > 2 && searchText.includes(word));
    }).slice(0, 5);

    if (matchedServices.length > 0) {
        const serviceList = matchedServices
            .map(s => ` **${s.name}** — ${s.shortDescription}`)
            .join('\n');

        return `Based on your request, here are some services that might help:\n\n${serviceList}\n\nWould you like to know more about any of these? I can explain what's included and help you get started.`;
    }

    return `I'd love to help you find the right service! Could you tell me a bit more about what you're looking to accomplish? For example:\n\n• What's your project or goal?\n• What industry are you in?\n• Do you have a timeline in mind?\n\nThis will help me recommend the best services for your needs.`;
}
