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


export const lineInterpolation = PropTypes.oneOf([
    'linear',          // piecewise linear segments, as in a polyline.
    'linear-closed',   // close the linear segments to form a polygon.
    'step',            // alternate between horizontal and vertical segments, as in a step function.
    'step-before',     // alternate between vertical and horizontal segments, as in a step function.
    'step-after',      // alternate between horizontal and vertical segments, as in a step function.
    'basis',           // a B-spline, with control point duplication on the ends.
    'basis-open',      // an open B-spline; may not intersect the start or end.
    'basis-closed',    // a closed B-spline, as in a loop.
    'bundle',          // equivalent to basis, except the tension parameter is used to straighten the spline.
    'cardinal',        // a Cardinal spline, with control point duplication on the ends.
    'cardinal-open',   // an open Cardinal spline; may not intersect the start or end, but will intersect other control points.
    'cardinal-closed', // a closed Cardinal spline, as in a loop.
    'monotone'         // cubic interpolation that preserves monotonicity in y.
]);


export const margin = PropTypes.shape({
    top:    PropTypes.number,
    right:  PropTypes.number,
    bottom: PropTypes.number,
    left:   PropTypes.number
}).isRequired;
