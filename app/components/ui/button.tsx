import { Button as BaseButton } from '@base-ui/react/button'
import { cn } from '~/lib/cn'

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'border border-border bg-background hover:bg-muted',
  ghost: 'hover:bg-muted',
  destructive: 'bg-destructive text-white hover:bg-destructive/90',
}

const sizes = {
  md: 'h-10 px-4 text-sm',
  sm: 'h-8 px-3 text-sm',
  icon: 'size-10',
}

type ButtonProps = Omit<BaseButton.Props, 'className'> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center gap-2 rounded-lg font-medium data-disabled:pointer-events-none data-disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
