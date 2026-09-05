import type { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit';
    icon?: ReactNode;
    fullWidth?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    className = '',
    type = 'button',
    icon,
    fullWidth = false,
}: ButtonProps) {
    return (
        <button
            className={`${styles.btn} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.full : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {children}
        </button>
    );
}
