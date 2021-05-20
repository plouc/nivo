import {
  ResponsiveWaffle,
  ResponsiveWaffleCanvas,
  ResponsiveWaffleHtml,
} from '@nivo/waffle'
import { random } from '../utils'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const props = {
  columns: 14,
  fillDirection: 'bottom' as 'bottom',
  margin: { top: 10, right: 10, bottom: 10, left: 120 },
  padding: 1,
  rows: 18,
  total: 100,
}

export function Waffle() {
  const [key, flavor] = useChart()
  const [data] = useMemo(
    () => [
      [
        ['A', '#468df3'],
        ['B', '#ba72ff'],
        ['C', '#a1cfff'],
      ].map(([id, color]) => ({
        id,
        label: id,
        value: random(1, 33),
        color,
      })),
      key,
    ],
    [key]
  )

  switch (flavor) {
    case 'canvas':
      return <ResponsiveWaffleCanvas data={data} {...props} />
    case 'html':
      return <ResponsiveWaffleHtml data={data} {...props} />
    case 'svg':
      return <ResponsiveWaffle data={data} {...props} />
  }
}
