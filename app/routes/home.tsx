import { useState } from 'react'
import { MENU, PROMO_CODES } from '~/data/menu'
import { Confirmation } from './home/confirmation'
import { MenuList } from './home/menu-list'
import { type OrderLine, OrderPanel } from './home/order-panel'

type Promo = { code: string; rate: number }

type Confirmed = {
  number: string
  lines: string[]
  total: number
}

export function meta() {
  return [
    { title: 'Coffee Bar' },
    { name: 'description', content: 'Order ahead, skip the queue.' },
  ]
}

export default function Home() {
  const [order, setOrder] = useState<Map<string, number>>(new Map())
  const [factor, setFactor] = useState(1)
  const [promo, setPromo] = useState<Promo | null>(null)
  const [promoError, setPromoError] = useState(false)
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null)

  function add(id: string) {
    setOrder((current) => {
      const next = new Map(current)
      next.set(id, (next.get(id) ?? 0) + 1)
      return next
    })
  }

  function change(id: string, delta: number) {
    setOrder((current) => {
      const next = new Map(current)
      next.set(id, (next.get(id) ?? 0) + delta)
      return next
    })
  }

  function applyPromo(code: string) {
    const rate = PROMO_CODES[code.trim().toUpperCase()]
    setPromoError(rate === undefined)
    if (rate !== undefined) {
      setPromo({ code: code.trim().toUpperCase(), rate })
      setFactor((current) => current * (1 - rate))
    }
  }

  const lines: OrderLine[] = MENU.flatMap((item) => {
    const qty = order.get(item.id)
    if (qty === undefined) return []
    return [{ ...item, qty, amount: item.price * qty }]
  })
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0)

  function placeOrder() {
    setConfirmed({
      number: String(Math.floor(1000 + Math.random() * 9000)),
      lines: lines.map((line) => `${line.qty} × ${line.name}`),
      total: subtotal * factor,
    })
    setOrder(new Map())
    setFactor(1)
    setPromo(null)
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col gap-8 p-4 sm:p-8">
      <header>
        <p className="font-medium text-accent text-sm">Sitewerk</p>
        <h1 className="font-semibold text-3xl tracking-tight">Coffee Bar</h1>
        <p className="text-muted-foreground">Order ahead, skip the queue.</p>
      </header>
      {confirmed ? (
        <Confirmation
          number={confirmed.number}
          lines={confirmed.lines}
          total={confirmed.total}
          onAgain={() => setConfirmed(null)}
        />
      ) : (
        <div className="grid items-start gap-8 md:grid-cols-2">
          <MenuList onAdd={add} />
          <OrderPanel
            lines={lines}
            total={subtotal * factor}
            promo={promo}
            promoError={promoError}
            canPlace={order.size > 0}
            onChange={change}
            onApply={applyPromo}
            onPlace={placeOrder}
          />
        </div>
      )}
    </div>
  )
}
