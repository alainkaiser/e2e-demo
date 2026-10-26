import { Popover as BasePopover } from '@base-ui/react/popover'
import { cn } from '~/lib/cn'

export const Popover = BasePopover.Root
/** Opens on click or tap. Pass the button to render: `<PopoverTrigger render={<Button />}>…</PopoverTrigger>`. */
export const PopoverTrigger = BasePopover.Trigger

export function PopoverContent({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        className="z-50"
        sideOffset={8}
        collisionPadding={16}
      >
        <BasePopover.Popup
          className={cn(
            'flex max-h-(--available-height) w-80 max-w-(--available-width) origin-(--transform-origin) flex-col gap-3 overflow-y-auto rounded-2xl bg-background p-5 text-foreground shadow-xl outline-none ring-1 ring-black/10 transition-[scale,opacity] duration-150 data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0',
            className,
          )}
        >
          <BasePopover.Title className="font-semibold text-base">
            {title}
          </BasePopover.Title>
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}
