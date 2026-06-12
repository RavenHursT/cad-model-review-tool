import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../lib/utils';

type ButtonVariant = 'default' | 'outline' | 'destructive';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-zinc-900 text-white hover:bg-zinc-800',
  outline: 'border border-zinc-300 bg-white hover:bg-zinc-50',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
