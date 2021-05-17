import { ResponsiveAreaBump, ResponsiveBump } from '@nivo/bump'
import { random, range, shuffle } from '../utils'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const generateData = () => {
  const years = range(2000, 2005)
  const minmax = [1, 7] as const
  const ranks = range(...minmax)
  const start = shuffle(ranks)
  const end = shuffle(ranks)

  const series = ranks.map((rank, index) => ({
    id: `Serie ${rank}`,
    data: years.map((year) => ({
      x: year,
      y:
        year === 2004
          ? end[index]
          : year === 2000
          ? start[index]
          : random(...minmax),
    })),
  }))

  return series
}

const props = {
  margin: { top: 40, right: 100, bottom: 40, left: 100 },
  spacing: 8,
} as const

export function AreaBump() {
  const [key] = useChart()
  const [data] = useMemo(() => [generateData(), key], [key])

  return <ResponsiveAreaBump data={data} {...props} />
}

export function Bump() {
  const [key] = useChart()
  const [data] = useMemo(() => [generateData(), key], [key])

  return <ResponsiveBump data={data} {...props} />
}
