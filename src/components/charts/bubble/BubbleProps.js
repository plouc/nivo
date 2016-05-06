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


const { object, number, string, any } = PropTypes;


/**
 * Bubble components common propTypes.
 *
 * @type {object}
 */
export const bubblePropTypes = {
    margin,
    root:               object.isRequired, // data
    identityProperty:   string,
    value:              string.isRequired,
    padding:            number.isRequired,
    colors:             any.isRequired,
};


/**
 * Bubble components common defaultProps.
 *
 * @type {object}
 */
export const bubbleDefaultProps = {
    margin:           Nivo.defaults.margin,
    identityProperty: 'name',
    value:            'value',
    padding:          1,
    colors:           Nivo.defaults.colorRange,
};
