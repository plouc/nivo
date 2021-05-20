import { ResponsiveVoronoi, VoronoiDomain } from '@nivo/voronoi'
import { range } from '../utils'
import { useChart } from '../hooks'
import { useMemo } from 'react'

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

export function Voronoi() {
  const [key] = useChart()
  const [data] = useMemo(
    () => [
      range(0, 100).map((id) => ({
        id,
        x: Math.random() * xDomain[1],
        y: Math.random() * yDomain[1],
      })),
      key,
    ],
    [key]
  )

  return <ResponsiveVoronoi data={data} {...props} />
}
