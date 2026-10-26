import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import { cn } from '~/lib/cn'

export const Dialog = BaseDialog.Root
/** Pass the button to render: `<DialogTrigger render={<Button />}>Open</DialogTrigger>`. */
export const DialogTrigger = BaseDialog.Trigger
export const DialogClose = BaseDialog.Close

export function DialogContent({
  title,
  description,
  className,
  children,
}: {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 bg-black/40 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <BaseDialog.Popup
        className={cn(
          'fixed top-1/2 left-1/2 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-2xl bg-background p-6 shadow-xl transition-[scale,opacity] duration-150 data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <BaseDialog.Title className="font-semibold text-lg">
              {title}
            </BaseDialog.Title>
            {description && (
              <BaseDialog.Description className="text-muted-foreground text-sm">
                {description}
              </BaseDialog.Description>
            )}
          </div>
          <BaseDialog.Close
            aria-label="Close"
            className="-m-2 rounded-lg p-2 text-muted-foreground hover:bg-muted"
          >
            <X aria-hidden className="size-5" />
          </BaseDialog.Close>
        </div>
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}
