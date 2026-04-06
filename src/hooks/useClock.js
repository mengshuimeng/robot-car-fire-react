import { useEffect, useState } from 'react'
import { formatDateTimeWithWeekday } from '../utils/formatters'

export function useClock() {
  const [clock, setClock] = useState(() => formatDateTimeWithWeekday(new Date()))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(formatDateTimeWithWeekday(new Date()))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return clock
}
