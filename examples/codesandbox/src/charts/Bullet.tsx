import { ResponsiveBullet } from '@nivo/bullet'
import { generateBulletData } from '@nivo/generators'
import { useChart } from '../hooks'

const props = {
    margin: { top: 40, right: 30, bottom: 50, left: 110 },
    titleOffsetX: -30,
    spacing: 80,
} as const

const generateData = () => [
    generateBulletData('volume', 200, { measureCount: 2 }),
    generateBulletData('cost', 10000, { markerCount: 2 }),
    generateBulletData('revenue', 2, { float: true }),
]

export function Bullet() {
    const [data] = useChart(generateData)

    return <ResponsiveBullet data={data} {...props} />
}
