/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { motionPropTypes } from '@nivo/core'
import { inheritedColorPropType } from '@nivo/colors'

const commonPropTypes = {
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            source: PropTypes.string.isRequired,
            target: PropTypes.string.isRequired,
        })
    ).isRequired,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.oneOf(['links', 'nodes']), PropTypes.func])
    ).isRequired,

    linkDistance: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.number])
        .isRequired,
    repulsivity: PropTypes.number.isRequired,
    distanceMin: PropTypes.number.isRequired,
    distanceMax: PropTypes.number.isRequired,
    iterations: PropTypes.number.isRequired,

    nodeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    nodeBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    nodeBorderColor: inheritedColorPropType.isRequired,

    linkThickness: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    linkColor: inheritedColorPropType.isRequired,

    isInteractive: PropTypes.bool.isRequired,
}

export const NetworkPropTypes = {
    ...commonPropTypes,
    ...motionPropTypes,
}

export const NetworkCanvasPropTypes = {
    pixelRatio: PropTypes.number.isRequired,
    ...commonPropTypes,
}

const commonDefaultProps = {
    layers: ['links', 'nodes'],

    linkDistance: 30,
    repulsivity: 10,
    distanceMin: 1,
    distanceMax: Infinity,
    iterations: 90,

    nodeBorderWidth: 0,
    nodeBorderColor: { from: 'color' },

    linkThickness: 1,
    linkColor: { from: 'source.color' },

    isInteractive: true,
}

export const NetworkDefaultProps = {
    ...commonDefaultProps,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
}

export const NetworkCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
