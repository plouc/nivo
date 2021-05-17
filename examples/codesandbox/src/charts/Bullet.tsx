import { ResponsiveBullet } from '@nivo/bullet'
import { generateBulletData } from '@nivo/generators'
import { useMemo } from 'react'
import { useChart } from '../hooks'

const props = {
  margin: { top: 40, right: 30, bottom: 50, left: 110 },
  titleOffsetX: -30,
  spacing: 80,
} as const

export function Bullet() {
  const [key] = useChart()
  const [data] = useMemo(
    () => [
      [
        generateBulletData('volume', 200, { measureCount: 2 }),
        generateBulletData('cost', 10000, { markerCount: 2 }),
        generateBulletData('revenue', 2, { float: true }),
      ],
      key,
    ],
    [key]
  )

  return <ResponsiveBullet data={data} {...props} />
}
