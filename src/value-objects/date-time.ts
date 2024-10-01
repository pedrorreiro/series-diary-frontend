import * as dateFns from 'date-fns'

type ComparisonUnit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'quarter' | 'month' | 'year'

export function useDateTime() {
  function format(date: Date, format: string) {
    return dateFns.format(date, format)
  }

  function parseIsoDate(date: string) {
    return dateFns.parseISO(date)
  }

  function isDate(value: any) {
    return dateFns.isDate(value)
  }

  function isBefore(date: Date, dateToCompare: Date) {
    return dateFns.isBefore(date, dateToCompare)
  }

  function isAfter(date: Date, dateToCompare: Date) {
    return dateFns.isAfter(date, dateToCompare)
  }

  function isEqual(date: Date, dateToCompare: Date) {
    return dateFns.isEqual(date, dateToCompare)
  }

  function isSame(unit: ComparisonUnit, date: Date, dateToCompare: Date) {
    const unitComparison: Record<ComparisonUnit, Function> = {
      second: dateFns.isSameSecond,
      minute: dateFns.isSameMinute,
      hour: dateFns.isSameHour,
      day: dateFns.isSameDay,
      week: dateFns.isSameWeek,
      quarter: dateFns.isSameQuarter,
      month: dateFns.isSameMonth,
      year: dateFns.isSameYear
    }

    return unitComparison[unit](date, dateToCompare)
  }

  function addDays(date: Date, days: number) {
    return dateFns.addDays(date, days)
  }

  function addMonths(date: Date, months: number) {
    return dateFns.addMonths(date, months)
  }

  function addYears(date: Date, years: number) {
    return dateFns.addYears(date, years)
  }

  function subDays(date: Date, days: number) {
    return dateFns.subDays(date, days)
  }

  function subMonths(date: Date, months: number) {
    return dateFns.subMonths(date, months)
  }

  function subYears(date: Date, years: number) {
    return dateFns.subYears(date, years)
  }

  return {
    parseIsoDate,
    format,
    isDate,
    isBefore,
    isAfter,
    isEqual,
    isSame,
    addDays,
    addMonths,
    addYears,
    subDays,
    subMonths,
    subYears
  }
}
