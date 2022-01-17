import { ResponsiveVoronoi, VoronoiDomain } from '@nivo/voronoi'
import { range } from '../utils'
import { useChart } from '../hooks'

const xDomain: VoronoiDomain = [0, 100]
const yDomain: VoronoiDomain = [0, 100]

const props = {
    enableCells: true,
    enableLinks: true,
    enablePoints: true,

    cellLineColor: '#c6432d',
    cellLineWidth: 2,

    linkLineColor: '#cccccc',
    linkLineWidth: 1,

    pointColor: '#c6432d',
    pointSize: 6,

    xDomain,
    yDomain,
}

const generateData = () =>
    range(0, 100).map(id => ({
        id,
        x: Math.random() * xDomain[1],
        y: Math.random() * yDomain[1],
    }))

export function Voronoi() {
    const [data] = useChart(generateData)

    return <ResponsiveVoronoi data={data} {...props} />
}
