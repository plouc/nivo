import { ResponsiveCalendar, ResponsiveCalendarCanvas } from '@nivo/calendar'
import { generateDayCounts } from '@nivo/generators'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const from = new Date(2019, 0, 1)
const to = new Date(2019, 11, 31)

const props = {
  margin: { top: 50, right: 10, bottom: 10, left: 50 },
  from: from.toISOString(),
  to: to.toISOString(),
} as const

export function Calendar() {
  const [key, isCanvas] = useChart()
  const [data] = useMemo(() => [generateDayCounts(from, to), key], [key])

  if (isCanvas) {
    return <ResponsiveCalendarCanvas data={data} {...props} />
  }

  return <ResponsiveCalendar data={data} {...props} />
}
