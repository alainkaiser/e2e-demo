/** "CHF 9.60", with a normal space. The e2e checks compare this exact string. */
export const money = (amount: number) => `CHF ${amount.toFixed(2)}`
