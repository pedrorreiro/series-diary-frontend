import { useDateTime } from "@/value-objects/date-time";

export function formatIsoDate(date: string) {
  return useDateTime().format(new Date(date), 'dd/MM/yyyy')
}
