import { Button } from '~/components/ui/button'
import { ADD_LABEL, MENU } from '~/data/menu'
import { money } from '~/lib/money'

type MenuListProps = {
  onAdd: (id: string) => void
}

export function MenuList({ onAdd }: MenuListProps) {
  return (
    <section aria-labelledby="menu-heading">
      <h2 id="menu-heading" className="font-semibold text-xl">
        Menu
      </h2>
      <ul className="mt-2">
        {MENU.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-3 border-border border-b py-4 last:border-b-0 sm:flex-row sm:items-center"
          >
            <span className="font-medium">{item.name}</span>
            <span className="text-muted-foreground sm:ml-auto">
              {money(item.price)}
            </span>
            <Button
              type="button"
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => onAdd(item.id)}
            >
              {ADD_LABEL}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  )
}
