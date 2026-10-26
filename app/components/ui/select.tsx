import { Select as BaseSelect } from '@base-ui/react/select'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '~/lib/cn'

export type SelectItem = { label: string; value: string }

type SelectProps = Omit<
  BaseSelect.Root.Props<string>,
  'items' | 'multiple' | 'children'
> & {
  label: string
  items: SelectItem[]
  placeholder?: string
  className?: string
}

/** A labelled single choice from a list, for example a service or a time slot. */
export function Select({
  label,
  items,
  placeholder = 'Choose one',
  className,
  ...props
}: SelectProps) {
  return (
    <BaseSelect.Root items={items} {...props}>
      <div className={cn('flex flex-col gap-1.5', className)}>
        <BaseSelect.Label className="font-medium text-sm">
          {label}
        </BaseSelect.Label>
        <BaseSelect.Trigger className="flex h-10 w-full items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 text-base data-popup-open:bg-muted sm:text-sm">
          <BaseSelect.Value
            className="truncate data-placeholder:text-muted-foreground"
            placeholder={placeholder}
          />
          <BaseSelect.Icon>
            <ChevronsUpDown
              aria-hidden
              className="size-4 text-muted-foreground"
            />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </div>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="z-50 outline-none" sideOffset={4}>
          <BaseSelect.Popup className="min-w-(--anchor-width) origin-(--transform-origin) rounded-lg border border-border bg-background py-1 shadow-lg transition-[scale,opacity] duration-100 data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0">
            <BaseSelect.List className="max-h-(--available-height) overflow-y-auto">
              {items.map((item) => (
                <BaseSelect.Item
                  key={item.value}
                  value={item.value}
                  className="grid cursor-default select-none grid-cols-[1rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm outline-none data-highlighted:bg-muted"
                >
                  <BaseSelect.ItemIndicator className="col-start-1">
                    <Check aria-hidden className="size-4" />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText className="col-start-2">
                    {item.label}
                  </BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}
