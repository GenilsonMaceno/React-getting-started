const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export const money = (value: number) => brl.format(value)

export const discount = (price: number, oldPrice?: number) =>
  oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0

export const soldLabel = (sold: number) =>
  sold >= 1000 ? `+${Math.floor(sold / 1000)} mil vendidos` : `+${sold} vendidos`

export const FREE_SHIPPING_MIN = 199
export const SHIPPING_COST = 19.9
