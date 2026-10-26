import { Field as BaseField } from '@base-ui/react/field'
import { Form as BaseForm } from '@base-ui/react/form'
import { Input as BaseInput } from '@base-ui/react/input'
import { cn } from '~/lib/cn'

type WithClassName<Props> = Omit<Props, 'className'> & { className?: string }

/** Shows each field's error when submitted; `errors` takes messages keyed by field name. */
export function Form({ className, ...props }: WithClassName<BaseForm.Props>) {
  return (
    <BaseForm className={cn('flex flex-col gap-4', className)} {...props} />
  )
}

export function Field({
  className,
  ...props
}: WithClassName<BaseField.Root.Props>) {
  return (
    <BaseField.Root
      className={cn('flex flex-col gap-1.5', className)}
      {...props}
    />
  )
}

export function FieldLabel({
  className,
  ...props
}: WithClassName<BaseField.Label.Props>) {
  return (
    <BaseField.Label
      className={cn('font-medium text-sm', className)}
      {...props}
    />
  )
}

export function FieldDescription({
  className,
  ...props
}: WithClassName<BaseField.Description.Props>) {
  return (
    <BaseField.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

/** Shows when the browser's validation fails, or always with `match={true}` for errors from a form library. */
export function FieldError({
  className,
  ...props
}: WithClassName<BaseField.Error.Props>) {
  return (
    <BaseField.Error
      className={cn('text-destructive text-sm', className)}
      {...props}
    />
  )
}

export function Input({ className, ...props }: WithClassName<BaseInput.Props>) {
  return (
    <BaseInput
      className={cn(
        'h-10 w-full rounded-lg border border-border bg-background px-3 text-base placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-accent data-invalid:border-destructive sm:text-sm',
        className,
      )}
      {...props}
    />
  )
}
