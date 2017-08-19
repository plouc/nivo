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
import { tilingMethods } from '../../../lib/charts/treemap/TreeMapD3'

/**
 * TreeMap components propTypes.
 *
 * @type {object}
 */
export const treeMapPropTypes = {
    // data
    // `root` managed by `withHierarchy()` HOC
    identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

    // dimensions managed by `withDimensions()` HOC

    leavesOnly: PropTypes.bool.isRequired,
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
    // theme managed by `withTheme()` HOC
    // colors managed by `withColors()` HOC

    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.any.isRequired,

    // transitions
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
    // data
    identity: 'id',

    tile: 'squarify',
    leavesOnly: false,

    // labels
    enableLabels: true,
    orientLabels: true,
    label: 'id',
    labelSkipSize: 0,
    labelTextColor: 'inherit:darker(1)',

    innerPadding: 0,
    outerPadding: 0,

    borderWidth: 0,
    borderColor: 'inherit',

    // motion
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing: Nivo.defaults.transitionEasing,
}
