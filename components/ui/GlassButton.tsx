import { Button } from '@/components/ui/button';
import { ButtonHTMLAttributes } from 'react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    disabled?: boolean;
}

export default function GlassButton({ children, onClick, disabled, className = '', ...props }: GlassButtonProps) {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            className={`cursor-pointer backdrop-blur-md bg-white/10 border border-white/30 text-white uppercase tracking-widest font-medium hover:bg-white/20 hover:border-white/50 transition-all ${className}`}
            {...props}
        >
            {children}
        </Button>
    );
}
