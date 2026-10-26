import type { FormEvent } from 'react'
import { Button } from '~/components/ui/button'
import { money } from '~/lib/money'

export type OrderLine = {
  id: string
  name: string
  qty: number
  amount: number
}

type OrderPanelProps = {
  lines: OrderLine[]
  total: number
  promo: { code: string; rate: number } | null
  promoError: boolean
  canPlace: boolean
  onChange: (id: string, delta: number) => void
  onApply: (code: string) => void
  onPlace: () => void
}

export function OrderPanel({
  lines,
  total,
  promo,
  promoError,
  canPlace,
  onChange,
  onApply,
  onPlace,
}: OrderPanelProps) {
  function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const code = String(new FormData(event.currentTarget).get('code') ?? '')
    onApply(code)
  }

  return (
    <section
      aria-labelledby="order-heading"
      className="rounded-xl border border-border bg-muted p-4 sm:p-5"
    >
      <h2 id="order-heading" className="font-semibold text-xl">
        Your order
      </h2>

      {lines.length === 0 ? (
        <p className="mt-4 text-muted-foreground">Your order is empty.</p>
      ) : (
        <ul aria-label="Order items" className="mt-2">
          {lines.map((line) => (
            <li
              key={line.id}
              className="flex items-center gap-2 border-border border-b py-3 last:border-b-0"
            >
              <span className="min-w-0 flex-1 font-medium">{line.name}</span>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label={`Remove one ${line.name}`}
                onClick={() => onChange(line.id, -1)}
              >
                −
              </Button>
              <output
                className="w-8 text-center"
                aria-label={`${line.name} quantity`}
              >
                {line.qty}
              </output>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label={`Add one ${line.name}`}
                onClick={() => onChange(line.id, 1)}
              >
                +
              </Button>
              <span className="w-20 text-right text-muted-foreground">
                {money(line.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <form className="mt-4 flex items-end gap-2" onSubmit={apply}>
        <label className="flex min-w-0 flex-1 flex-col gap-1.5 font-medium text-sm">
          Promo code
          <input
            name="code"
            autoComplete="off"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-base focus-visible:outline-2 focus-visible:outline-accent sm:text-sm"
          />
        </label>
        <Button type="submit" variant="secondary">
          Apply
        </Button>
      </form>

      {promo && (
        <p
          className="mt-3 text-sm text-success"
          role="status"
          aria-label="Discount"
        >
          {promo.code} · −{promo.rate * 100}%
        </p>
      )}
      {promoError && (
        <p className="mt-3 text-destructive text-sm" role="alert">
          Unknown promo code.
        </p>
      )}

      <div className="mt-4 flex items-baseline justify-between">
        <span className="font-medium">Total</span>
        <output className="font-semibold text-lg" aria-label="Total">
          {money(total)}
        </output>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm">
        <input type="checkbox" className="size-4 accent-accent" />
        Recieve a receipt by email
      </label>

      <Button
        type="button"
        className="mt-4 w-full"
        disabled={!canPlace}
        onClick={onPlace}
      >
        Place order
      </Button>
    </section>
  )
}
