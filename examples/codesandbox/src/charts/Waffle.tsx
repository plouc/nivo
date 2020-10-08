import {
  ResponsiveWaffle,
  ResponsiveWaffleCanvas,
  ResponsiveWaffleHtml,
} from '@bitbloom/nivo-waffle'
import { random } from '../utils'
import { useChart } from '../hooks'

const props = {
  columns: 14,
  fillDirection: 'bottom' as 'bottom',
  margin: { top: 10, right: 10, bottom: 10, left: 10 },
  padding: 1,
  rows: 18,
  total: 100,
}

const generateData = () =>
  [
    ['A', '#468df3'],
    ['B', '#ba72ff'],
    ['C', '#a1cfff'],
  ].map(([id, color]) => ({
    id,
    label: id,
    value: random(1, 33),
    color,
  }))

export function Waffle() {
  const [data, flavor] = useChart(generateData)

  switch (flavor) {
    case 'canvas':
      return <ResponsiveWaffleCanvas data={data} {...props} />
    case 'html':
      return <ResponsiveWaffleHtml data={data} {...props} />
    case 'svg':
      return <ResponsiveWaffle data={data} {...props} />
  }
}
