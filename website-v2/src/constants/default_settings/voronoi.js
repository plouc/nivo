import { Voronoi } from '@nivo/voronoi'
import theme from '../../styles/nivoTheme'

export const voronoi = {
    ...Voronoi.defaultProps,
    margin: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
    },
    enablePolygons: true,
    enableSites: true,
    enableLinks: false,
    borderWidth: 2,
    borderColor: '#000000',
    linkWidth: 1,
    linkColor: '#bbbbbb',
    siteSize: 4,
    siteColor: '#c6432d',
    theme,
}
