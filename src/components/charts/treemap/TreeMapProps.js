/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import { PropTypes } from 'react';
import Nivo          from '../../../Nivo';
import { margin }    from '../../../PropTypes';


const { object, number, string, bool, func, any, oneOf } = PropTypes;


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
    valueAccessor:      func.isRequired,
    labelFn:            func.isRequired,
    identityProperty:   string,
    mode:               oneOf(['squarify', 'slice', 'dice', 'slice-dice']),
    orientLabels:       bool.isRequired,
    padding:            number.isRequired,
    skipVMin:           number.isRequired,
    enableFisheye:      bool.isRequired,
    colors:             any.isRequired,
    borderColor:        any.isRequired,
    stiffness:          number.isRequired, // react-motion
    damping:            number.isRequired, // react-motion
    transitionDuration: number.isRequired, // d3 transitions
    transitionEasing:   string.isRequired, // d3 transitions
    children:           func.isRequired,   // for placeholders
};


/**
 * TreeMap components defaultProps.
 *
 * @type {object}
 */
export const treeMapDefaultProps = {
    margin:             Nivo.defaults.margin,
    valueAccessor:      d => d.size,
    identityProperty:   'name',
    labelFn:            d => d.name,
    mode:               'squarify',
    orientLabels:       true,
    padding:            0,
    skipVMin:           0,
    enableFisheye:      false,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing,
    stiffness:          120,
    damping:            10,
    colors:             Nivo.defaults.colorRange,
    borderColor:        'none',
};
