import { cva } from 'class-variance-authority';

export const buttonVariant = {
  default: 'border border-white hover:bg-white/30',
  purple: 'bg-primary shadow-sm shadow-primary/60',
  connexion: 'bg-background border border-accent text-accent hover:text-foreground hover:bg-background/60',
  green: 'bg-accent border-accent hover:bg-accent/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
  link: 'text-primary underline-offset-4 hover:underline',
  active: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline:
    'border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
  destructive: 'bg-destructive text-secondary-foreground hover:bg-secondary/80',
};

export const iconVariants = {
  default: 'bg-muted ring-border text-muted-foreground',
  purple: 'bg-primary/10 ring-primary/30 text-primary hover:bg-primary/20',
  green: 'bg-emerald-500/10 ring-emerald-500/30 text-emerald-500 hover:bg-accent/20',
  blue: 'bg-blue-500/10 ring-blue-500/30 text-blue-500',
  gold: 'bg-amber-400/10 ring-amber-400/30 text-amber-400 hover:bg-amber-500/20',
};

export const cartVariants = {
  default: 'bg-card/20 border-primary/20',
  purple: 'border-primary/50 bg-primary/5 hover:border-primary',
  green: 'border-emerald-500/50 bg-emerald-500/5 hover:border-emerald-500',
  blue: 'border-blue-500/50 bg-blue-500/5 hover:border-blue-500',
  gold: 'border-amber-400/50 bg-amber-400/5 hover:border-amber-400',
  time_green: 'bg-black/30 border-accent/20 hover:bg-accent/20',
  time_purple: 'ring-primary/30 text-primary hover:bg-primary/20 bg-black/30 border-primary/20',
  dashboard: "rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:p-6",
};

export const CardTitleVariants = {
  default: 'text-3xl md:text-4xl text-foreground mb-2',
  videoSection: 'text-2xl md:text-10 text-foreground mb-[7px]',
};

export const CardSubTitleVariant = {
  default: 'text-base text-muted-foreground',
  videoSection: 'text-6 text-muted-foreground',
};

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
