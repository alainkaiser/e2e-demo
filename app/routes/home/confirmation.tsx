import { Button } from '~/components/ui/button'
import { money } from '~/lib/money'

type ConfirmationProps = {
  number: string
  lines: string[]
  total: number
  onAgain: () => void
}

export function Confirmation({
  number,
  lines,
  total,
  onAgain,
}: ConfirmationProps) {
  return (
    <section className="mx-auto flex max-w-md flex-col gap-4 rounded-xl border border-border p-6">
      <h2 className="font-semibold text-2xl">Order confirmed</h2>
      <p>
        Order number <strong>#{number}</strong>
      </p>
      <ul aria-label="Ordered items" className="flex flex-col gap-1">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p>Total paid {money(total)}</p>
      <Button type="button" variant="secondary" onClick={onAgain}>
        Order again
      </Button>
    </section>
  )
}
