import styles from './Badge.module.scss';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'accent' | 'success' | 'warning';
    size?: 'sm' | 'md';
}

export default function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
    return (
        <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
            {children}
        </span>
    );
}
