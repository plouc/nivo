/*
 * This file is part of the nivo library.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import { PropTypes }     from 'react'
import Nivo              from '../../../Nivo'
import { margin }        from '../../../PropTypes'
import { tilingMethods } from '../../../lib/charts/treemap/TreeMapD3'


const { object, number, string, bool, func, any, oneOf, oneOfType } = PropTypes


/**
 * TreeMap components propTypes.
 *
 * @type {object}
 */
export const treeMapPropTypes = {
    width:              number.isRequired, // for non responsive components
    height:             number.isRequired, // for non responsive components
    margin,
    root:               object.isRequired, // data
    leavesOnly:         bool.isRequired,
    value:              oneOfType([string, func]).isRequired,
    identity:           oneOfType([string, func]).isRequired,
    tile:               oneOf(Object.keys(tilingMethods)),

    // labels
    enableLabels:       bool.isRequired,
    orientLabels:       bool.isRequired,
    label:              oneOfType([string, func]).isRequired,
    labelSkipSize:      number.isRequired,

    innerPadding:       number.isRequired,
    outerPadding:       number.isRequired,
    colors:             any.isRequired,

    borderWidth:        number.isRequired,
    borderColor:        any.isRequired,
    // transitions
    animate:            bool.isRequired,
    motionStiffness:    number.isRequired, // react-motion
    motionDamping:      number.isRequired, // react-motion
    transitionDuration: number.isRequired, // d3 transitions
    transitionEasing:   string.isRequired, // d3 transitions

    children:           func.isRequired,   // for placeholders
}


/**
 * TreeMap components defaultProps.
 *
 * @type {object}
 */
export const treeMapDefaultProps = {
    leavesOnly:         false,
    tile:               'squarify',
    value:              'value',
    identity:           'name',

    // labels
    enableLabels:       true,
    orientLabels:       true,
    label:              'id',
    labelSkipSize:      0,
    labelTextColor:     'inherit:darker(1)',

    margin:             Nivo.defaults.margin,
    innerPadding:       0,
    outerPadding:       0,

    borderWidth:        0,
    borderColor:        'inherit',
    // transitions
    animate:            true,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing,
    motionStiffness:    120,
    motionDamping:      10,

    colors:             Nivo.defaults.colorRange,
}
