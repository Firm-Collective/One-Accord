import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:focus:ring-gray-300',
  {
    variants: {
      variant: {
        default:
          'bg-[#ED9385] text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  userType: string;
}

const capitalizeFirstLetter = (string: string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Badge: React.FC<BadgeProps> = ({
  className,
  userType,
  ...props
}) => {
  return (
    <div className={cn(badgeVariants({ variant: 'default' }), className)} {...props}>
      {capitalizeFirstLetter(userType)}
    </div>
  );
}

export { Badge, badgeVariants };
