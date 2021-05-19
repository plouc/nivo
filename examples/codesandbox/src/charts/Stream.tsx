import { ResponsiveStream } from '@nivo/stream'
import { random, range } from '../utils'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const keys = ['Raoul', 'Josiane', 'Marcel', 'René', 'Paul', 'Jacques']

const props = {
  keys,
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
}

export function Stream() {
  const [key] = useChart()
  const [data] = useMemo(
    () => [
      range(0, 16).map(() =>
        keys.reduce<Record<string, number>>(
          (layer, key) => ({ ...layer, [key]: random(10, 200) }),
          {}
        )
      ),
      key,
    ],
    [key]
  )

  return <ResponsiveStream data={data} {...props} />
}
