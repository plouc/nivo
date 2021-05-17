import { ResponsiveAreaBump } from '@nivo/bump'
import { useMemo } from 'react'
import { useChart } from '../hooks'

const flatten = <T extends unknown>(array: T[]) => ([] as T[]).concat(...array)
const random = (min: number, max: number) => Math.random() * (max - min) + min
const range = (start: number, end: number) =>
  Array.from(' '.repeat(end - start), (_, index) => start + index)
const shuffle = <T extends unknown>(values: T[]) =>
  values
    .map((value) => [Math.random(), value] as const)
    .sort(([left], [right]) => left - right)
    .map(([, value]) => value)

const generateData = () => {
  const years = range(2000, 2005)
  const ranks = range(1, 7)

  const series = ranks.map((rank) => ({
    id: `Serie ${rank}`,
    data: years.map((year) => ({
      x: year,
      y: random(1, 6),
    })),
  }))

  return series
}

const props = {
  colors: { scheme: 'spectral' },
  margin: { top: 40, right: 100, bottom: 40, left: 100 },
  spacing: 8,
} as const

export function AreaBump() {
  const [key] = useChart()
  const [data] = useMemo(() => [generateData(), key], [key])

  return <ResponsiveAreaBump data={data} {...props} />
}
