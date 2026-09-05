import { useCallback, useRef, useState, useEffect } from 'react';
import { services } from '@/data/services';
import { aiService } from '@/services/aiService';
import type { AIMessage } from '@/types';
import styles from './AIConsole.module.scss';

const SUGGESTED_PROMPTS = [
    'I need a website for my business',
    'Help me start selling online',
    'I want to automate my workflow',
    'Create a brand identity for my startup',
    'I need help with marketing',
    'Build me a mobile app',
];

let messageIdCounter = 0;

export default function AIConsole({ onClose }: { onClose: () => void }) {
    const [messages, setMessages] = useState<AIMessage[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: 'Hello! I\'m **360 AI**, your digital services assistant.\n\nTell me what you\'re looking to accomplish, and I\'ll help you find the right services. You can ask me anything — from building a website to automating your business.',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isTyping) return;

        const userMessage: AIMessage = {
            id: `msg-${++messageIdCounter}`,
            role: 'user',
            content: text.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await aiService.sendMessage(text.trim(), messages, services);
            const aiMsg: AIMessage = {
                id: `msg-${++messageIdCounter}`,
                role: 'assistant',
                content: response,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch {
            const errorMsg: AIMessage = {
                id: `msg-${++messageIdCounter}`,
                role: 'assistant',
                content: 'I apologize, I\'m having trouble processing that right now. Please try again in a moment.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    }, [isTyping, messages]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const clearChat = () => {
        setMessages([{
            id: 'welcome-reset',
            role: 'assistant',
            content: 'Chat cleared. How can I help you today?',
            timestamp: new Date(),
        }]);
    };

    const formatMessage = (content: string) => {
        // Simple markdown-like formatting
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/✓/g, '<span class="check">✓</span>')
            .replace(/\n/g, '<br/>');
    };

    return (
        <div className={styles.console}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <div className={styles.aiIndicator}>
                        <span className={styles.aiDot} />
                        <span className={styles.aiLabel}>360 AI</span>
                    </div>
                    <span className={styles.aiSub}>Your digital assistant</span>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.headerBtn} onClick={clearChat} aria-label="Clear chat" title="Clear chat">
                        ↺
                    </button>
                    <button className={styles.headerBtn} onClick={onClose} aria-label="Close AI console">
                        ✕
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
                {messages.map(msg => (
                    <div key={msg.id} className={`${styles.message} ${styles[msg.role]}`}>
                        {msg.role === 'assistant' && <span className={styles.msgAvatar}>◉</span>}
                        <div
                            className={styles.msgContent}
                            dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                        />
                    </div>
                ))}

                {isTyping && (
                    <div className={`${styles.message} ${styles.assistant}`}>
                        <span className={styles.msgAvatar}>◉</span>
                        <div className={styles.typing}>
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
                <div className={styles.suggestions}>
                    {SUGGESTED_PROMPTS.map(prompt => (
                        <button
                            key={prompt}
                            className={styles.suggestionBtn}
                            onClick={() => sendMessage(prompt)}
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className={styles.inputArea}>
                <textarea
                    ref={inputRef}
                    className={styles.input}
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    aria-label="Message input"
                />
                <button
                    className={styles.sendBtn}
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isTyping}
                    aria-label="Send message"
                >
                    ➤
                </button>
            </div>
        </div>
    );
}
