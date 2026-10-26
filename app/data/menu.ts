export type Drink = {
  id: string
  name: string
  price: number
}

export const MENU: Drink[] = [
  { id: 'espresso', name: 'Espresso', price: 3.5 },
  { id: 'cappuccino', name: 'Cappuccino', price: 4.8 },
  { id: 'flat-white', name: 'Flat White', price: 5.2 },
  { id: 'chai-latte', name: 'Chai Latte', price: 5.0 },
]

export const PROMO_CODES: Record<string, number> = { SITEWERK: 0.1 }

// The live demo renames this one label.
export const ADD_LABEL = 'Add to order'
