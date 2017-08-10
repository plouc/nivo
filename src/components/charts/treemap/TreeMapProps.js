/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import PropTypes from 'prop-types'
import Nivo from '../../../Nivo'
import { marginPropType, motionPropTypes } from '../../../props'
import { tilingMethods } from '../../../lib/charts/treemap/TreeMapD3'

/**
 * TreeMap components propTypes.
 *
 * @type {object}
 */
export const treeMapPropTypes = {
    root: PropTypes.object.isRequired, // data

    // dimensions
    width: PropTypes.number.isRequired, // for non responsive components
    height: PropTypes.number.isRequired, // for non responsive components
    margin: marginPropType,

    leavesOnly: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    tile: PropTypes.oneOf(Object.keys(tilingMethods)),

    innerPadding: PropTypes.number.isRequired,
    outerPadding: PropTypes.number.isRequired,

    // labels
    enableLabels: PropTypes.bool.isRequired,
    orientLabels: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.string,
    labelSkipSize: PropTypes.number.isRequired,

    // theming
    colors: PropTypes.any.isRequired,
    colorBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.any.isRequired,

    // transitions
    ...motionPropTypes,
    transitionDuration: PropTypes.number.isRequired, // d3 transitions
    transitionEasing: PropTypes.string.isRequired, // d3 transitions

    // placeholders
    namespace: PropTypes.oneOf(['html', 'svg']).isRequired,
    children: PropTypes.func.isRequired,
}

/**
 * TreeMap components defaultProps.
 *
 * @type {object}
 */
export const treeMapDefaultProps = {
    leavesOnly: false,
    tile: 'squarify',
    value: 'value',
    identity: 'name',

    // labels
    enableLabels: true,
    orientLabels: true,
    label: 'id',
    labelSkipSize: 0,
    labelTextColor: 'inherit:darker(1)',

    margin: Nivo.defaults.margin,
    innerPadding: 0,
    outerPadding: 0,

    borderWidth: 0,
    borderColor: 'inherit',

    // motion
    animate: true,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing: Nivo.defaults.transitionEasing,
    motionStiffness: 120,
    motionDamping: 10,

    colors: 'nivo',
    colorBy: 'depth',
}
