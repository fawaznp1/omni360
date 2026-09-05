import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
    name: string;
}

export default function Icon({ name, ...props }: IconProps) {
    // Dynamically retrieve the icon component based on the string name
    const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;

    return <IconComponent {...props} />;
}
