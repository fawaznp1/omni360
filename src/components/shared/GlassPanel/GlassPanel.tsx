import type { ReactNode } from 'react';
import styles from './GlassPanel.module.scss';

interface GlassPanelProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    as?: 'div' | 'section' | 'article' | 'aside';
    onClick?: () => void;
}

export default function GlassPanel({
    children,
    className = '',
    hover = false,
    glow = false,
    padding = 'md',
    as: Tag = 'div',
    onClick,
}: GlassPanelProps) {
    return (
        <Tag
            className={`${styles.glass} ${styles[`pad-${padding}`]} ${hover ? styles.hover : ''} ${glow ? styles.glow : ''} ${className}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
        >
            {children}
        </Tag>
    );
}
