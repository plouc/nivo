/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const VoronoiPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        })
    ).isRequired,

    xDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
    yDomain: PropTypes.arrayOf(PropTypes.number).isRequired,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf(['links', 'cells', 'points', 'bounds']),
            PropTypes.func,
        ])
    ).isRequired,

    enableLinks: PropTypes.bool.isRequired,
    linkLineWidth: PropTypes.number.isRequired,
    linkLineColor: PropTypes.string.isRequired,

    enableCells: PropTypes.bool.isRequired,
    cellLineWidth: PropTypes.number.isRequired,
    cellLineColor: PropTypes.string.isRequired,

    enablePoints: PropTypes.bool.isRequired,
    pointSize: PropTypes.number.isRequired,
    pointColor: PropTypes.string.isRequired,

    delaunay: PropTypes.object.isRequired,
    voronoi: PropTypes.object.isRequired,
}

export const VoronoiDefaultProps = {
    xDomain: [0, 1],
    yDomain: [0, 1],

    layers: ['links', 'cells', 'points', 'bounds'],

    enableLinks: false,
    linkLineWidth: 1,
    linkLineColor: '#bbb',

    enableCells: true,
    cellLineWidth: 2,
    cellLineColor: '#000',

    enablePoints: true,
    pointSize: 4,
    pointColor: '#666',
}
