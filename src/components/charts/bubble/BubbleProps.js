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


const { object, number, string, bool, func, any } = PropTypes;


/**
 * Bubble components propTypes.
 *
 * @type {object}
 */
export const bubblePropTypes = {
    containerWidth:     number.isRequired, // populated by Dimensions HOC
    containerHeight:    number.isRequired, // populated by Dimensions HOC
    margin,
    root:               object.isRequired, // data
    identityProperty:   string,
    valueProperty:      string.isRequired,
    padding:            number.isRequired,
    enableFisheye:      bool.isRequired,
    colors:             any.isRequired,
    stiffness:          number.isRequired, // react-motion
    damping:            number.isRequired, // react-motion
    transitionDuration: number.isRequired, // d3 transitions
    transitionEasing:   string.isRequired, // d3 transitions
    children:           func.isRequired    // for placeholders
};


/**
 * Bubble components defaultProps.
 *
 * @type {object}
 */
export const bubbleDefaultProps = {
    margin:             Nivo.defaults.margin,
    identityProperty:   'name',
    valueProperty:      'value',
    padding:            1,
    enableFisheye:      false,
    colors:             Nivo.defaults.colorRange,
    stiffness:          120,
    damping:            10,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing
};
