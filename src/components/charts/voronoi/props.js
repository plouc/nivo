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
    enablePolygons: PropTypes.bool.isRequired,
    enableSites: PropTypes.bool.isRequired,
    enableLinks: PropTypes.bool.isRequired,
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    linkWidth: PropTypes.number.isRequired,
    linkColor: PropTypes.string.isRequired,
    siteSize: PropTypes.number.isRequired,
    siteColor: PropTypes.string.isRequired,
}

export const VoronoiDefaultProps = {
    enablePolygons: true,
    enableSites: false,
    enableLinks: false,
    x: 0,
    y: 1,
    borderWidth: 2,
    borderColor: '#000',
    linkWidth: 1,
    linkColor: '#bbb',
    siteSize: 4,
    siteColor: '#666',
}
