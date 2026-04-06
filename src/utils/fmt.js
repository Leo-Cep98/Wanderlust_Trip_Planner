export function fmt(n, currency = 'USD') {
  return new Intl.NumberFormat('es-CO', {
    maximumFractionDigits: 0,
  }).format(n)
}
