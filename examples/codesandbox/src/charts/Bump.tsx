import { ResponsiveAreaBump, ResponsiveBump } from '@nivo/bump'
import { random, range, shuffle } from '../utils'
import { useChart } from '../hooks'

const generateData = () => {
    const years = range(2000, 2005)
    const minmax = [1, 7] as const
    const ranks = range(...minmax)
    const start = shuffle(ranks)
    const end = shuffle(ranks)

    const series = ranks.map((rank, index) => ({
        id: `Serie ${rank}`,
        data: years.map(year => ({
            x: year,
            y: year === 2004 ? end[index] : year === 2000 ? start[index] : random(...minmax),
        })),
    }))

    return series
}

const props = {
    margin: { top: 40, right: 100, bottom: 40, left: 100 },
    spacing: 8,
} as const

export function AreaBump() {
    const [data] = useChart(generateData)

    return <ResponsiveAreaBump data={data} {...props} />
}

export function Bump() {
    const [data] = useChart(generateData)

    return <ResponsiveBump data={data} {...props} />
}
