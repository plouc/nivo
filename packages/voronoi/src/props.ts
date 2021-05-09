import { VoronoiDomain, VoronoiLayer } from './types'

export const defaultVoronoiProps = {
    xDomain: [0, 1] as VoronoiDomain,
    yDomain: [0, 1] as VoronoiDomain,
    layers: ['links', 'cells', 'points', 'bounds'] as VoronoiLayer[],
    enableLinks: false,
    linkLineWidth: 1,
    linkLineColor: '#bbbbbb',
    enableCells: true,
    cellLineWidth: 2,
    cellLineColor: '#000000',
    enablePoints: true,
    pointSize: 4,
    pointColor: '#666666',
    role: 'img',
}
