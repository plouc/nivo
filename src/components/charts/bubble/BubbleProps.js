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


const { object, number, string, any, func, oneOf } = PropTypes;


/**
 * Bubble components propTypes.
 *
 * @type {object}
 */
export const bubblePropTypes = {
    width:              number.isRequired,
    height:             number.isRequired,
    margin,
    data:               object.isRequired,
    identityProperty:   string,
    value:              string.isRequired,
    padding:            number.isRequired,
    colors:             any.isRequired,
    // placeholders
    namespace:          oneOf(['html', 'svg']),
    children:           func.isRequired,
    // border
    borderWidth:        number.isRequired,
    borderColor:        any.isRequired,
    // labels
    label:              string.isRequired,
    labelFormat:        string,
    labelTextColor:     any.isRequired,
    labelTextDY:        number.isRequired,
    labelSkipRadius:    number.isRequired,
    // transitions
    motionStiffness:    number.isRequired, // react-motion
    motionDamping:      number.isRequired, // react-motion
    transitionDuration: number.isRequired, // d3 transitions
    transitionEasing:   string.isRequired, // d3 transitions
};


/**
 * Bubble components defaultProps.
 *
 * @type {object}
 */
export const bubbleDefaultProps = {
    margin:             Nivo.defaults.margin,
    identityProperty:   'name',
    value:              'value',
    padding:            1,
    colors:             Nivo.defaults.colorRange,
    // placeholders
    namespace:          'html',
    // border
    borderWidth:        0,
    borderColor:        'inherit',
    // labels
    label:              'name',
    labelTextColor:     'inherit:darker(1)',
    labelTextDY:        5,
    labelSkipRadius:    0,
    // transitions
    motionStiffness:    Nivo.defaults.motionStiffness,    // react-motion
    motionDamping:      Nivo.defaults.motionDamping,      // react-motion
    transitionDuration: Nivo.defaults.transitionDuration, // d3 transitions
    transitionEasing:   Nivo.defaults.transitionEasing,   // d3 transitions
};
