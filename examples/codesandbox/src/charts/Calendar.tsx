import { ResponsiveCalendar, ResponsiveCalendarCanvas } from '@bitbloom/nivo-calendar'
import { generateDayCounts } from '@bitbloom/nivo-generators'
import { useChart } from '../hooks'

const from = new Date(2019, 0, 1)
const to = new Date(2019, 11, 31)

const props = {
  margin: { top: 50, right: 10, bottom: 10, left: 50 },
  from: from.toISOString(),
  to: to.toISOString(),
} as const

export function Calendar() {
  const [data, flavor] = useChart(() => generateDayCounts(from, to))

  if (flavor === 'canvas') {
    return <ResponsiveCalendarCanvas data={data} {...props} />
  }

  return <ResponsiveCalendar data={data} {...props} />
}
