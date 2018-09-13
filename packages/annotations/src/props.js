/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const AnnotationPropTypes = {
    type: PropTypes.oneOf([
        'label',
        'callout',
        'calloutCircle',
        'calloutCurve',
        'calloutElbow',
        'calloutRect',
        'xyThreshold',
        'badge',
        'bracket',
        'calloutCustom',
    ]).isRequired,
    xScale: PropTypes.func.isRequired, // ought to be a d3 scale fn
    yScale: PropTypes.func.isRequired, // ought to be a d3 scale fn

    // to scale
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    subject: PropTypes.object,

    // other
    dx: PropTypes.number,
    dy: PropTypes.number,
    color: PropTypes.string,
    note: PropTypes.shape({
        label: PropTypes.string.isRequired,
    }).isRequired,
}

export const AnnotationPropShape = {
    type: PropTypes.oneOf([
        'label',
        'callout',
        'calloutCircle',
        'calloutCurve',
        'calloutElbow',
        'calloutRect',
        'xyThreshold',
        'badge',
        'bracket',
        'calloutCustom',
    ]).isRequired,

    // to scale
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    subject: PropTypes.object,

    // other
    dx: PropTypes.number,
    dy: PropTypes.number,
    color: PropTypes.string,
    note: PropTypes.shape({
        label: PropTypes.string.isRequired,
    }).isRequired,
}
