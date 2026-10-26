const chf = new Intl.NumberFormat('en-CH', {
  style: 'currency',
  currency: 'CHF',
})
const date = new Intl.DateTimeFormat('en-CH', { dateStyle: 'long' })
const time = new Intl.DateTimeFormat('en-CH', { timeStyle: 'short' })

/** 1290.5 → "CHF 1'290.50" */
export const formatChf = (amount: number) => chf.format(amount)

/** → "16 October 2026" */
export const formatDate = (value: Date) => date.format(value)

/** → "14:30" */
export const formatTime = (value: Date) => time.format(value)
