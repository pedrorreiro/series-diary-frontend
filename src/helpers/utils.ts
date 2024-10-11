export function formatIsoDate(date: string) {
  const isoDate = date.split('T')[0]
  const [year, month, day] = isoDate.split('-')

  return `${day}/${month}/${year}`
}
