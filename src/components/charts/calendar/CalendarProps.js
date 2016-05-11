/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import { PropTypes }     from 'react';
import Nivo              from '../../../Nivo';
import { margin, scale } from '../../../PropTypes';
import {
    DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL
} from '../../../constants/directions';


const { number, string, bool, shape, oneOf, oneOfType, instanceOf, arrayOf } = PropTypes;


/**
 * Calendar components propTypes.
 *
 * @type {object}
 */
export const calendarPropTypes = {
    width:                number.isRequired,
    height:               number.isRequired,
    margin,
    from:                 oneOfType([string, instanceOf(Date)]).isRequired,
    to:                   oneOfType([string, instanceOf(Date)]).isRequired,
    data:                 arrayOf(shape({
        day:   string.isRequired,
        value: number.isRequired,
    })).isRequired,
    direction:            oneOf([DIRECTION_HORIZONTAL, DIRECTION_VERTICAL]),
    colorScale:           scale.isRequired,
    // years
    yearSpacing:          number.isRequired,
    yearLegendOffset:     number.isRequired,
    // days
    daySpacing:           number.isRequired,
    dayBorderWidth:       number.isRequired,
    dayBorderColor:       string.isRequired,
    // months
    monthBorderWidth:     number.isRequired,
    monthBorderColor:     string.isRequired,
    monthLegendOffset:    number.isRequired,
    // transitions
    motion:               bool.isRequired,
    motionStiffness:      number.isRequired, // react-motion
    motionDamping:        number.isRequired, // react-motion
    transitionDuration:   number.isRequired, // d3 transitions
    transitionEasing:     string.isRequired, // d3 transitions
    transitionStaggering: number.isRequired, // d3 transitions
};


/**
 * Calendar components defaultProps.
 *
 * @type {object}
 */
export const calendarDefaultProps = {
    margin:               Nivo.defaults.margin,
    direction:            DIRECTION_HORIZONTAL,
    // years
    yearSpacing:          30,
    yearLegendOffset:     10,
    // days
    daySpacing:           0,
    dayBorderWidth:       1,
    dayBorderColor:       '#000',
    // months
    monthBorderWidth:     2,
    monthBorderColor:     '#000',
    monthLegendOffset:    6,
    // transitions
    motion:               false,
    motionStiffness:      Nivo.defaults.motionStiffness,    // react-motion
    motionDamping:        Nivo.defaults.motionDamping,      // react-motion
    transitionDuration:   Nivo.defaults.transitionDuration, // d3 transitions
    transitionEasing:     Nivo.defaults.transitionEasing,   // d3 transitions
    transitionStaggering: 5,                                // d3 transitions
};
