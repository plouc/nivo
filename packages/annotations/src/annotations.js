/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import {
    AnnotationLabel,
    AnnotationCallout,
    AnnotationCalloutCircle,
    AnnotationCalloutCurve,
    AnnotationCalloutElbow,
    AnnotationCalloutRect,
    AnnotationXYThreshold,
    AnnotationBadge,
    AnnotationBracket,
    AnnotationCalloutCustom,
} from 'react-annotation'
import { AnnotationPropTypes } from './props'

const annotationComponents = {
    label: AnnotationLabel,
    callout: AnnotationCallout,
    calloutCircle: AnnotationCalloutCircle,
    calloutCurve: AnnotationCalloutCurve,
    calloutElbow: AnnotationCalloutElbow,
    calloutRect: AnnotationCalloutRect,
    xyThreshold: AnnotationXYThreshold,
    badge: AnnotationBadge,
    bracket: AnnotationBracket,
    calloutCustom: AnnotationCalloutCustom,
}

const Annotation = ({
    type,
    xScale,
    yScale,

    // to scale
    x: _x,
    y: _y,
    subject: _subject,

    // pass-through
    ...rest
}) => {
    const AnnotationType = annotationComponents[type]

    /* params we have to scale:
     *  x
     *  y
     *  subject x1, x2, y1, y2, height, width
     */

    const x = xScale(_x)
    const y = yScale(_y)

    let subject = {}
    if (_subject) {
        subject = Object.assign({}, _subject)
        if ('x1' in subject) subject.x1 = xScale(subject.x1)
        if ('x2' in subject) subject.x2 = xScale(subject.x2)
        if ('y1' in subject) subject.y1 = yScale(subject.y1)
        if ('y2' in subject) subject.y2 = yScale(subject.y2)
        if ('width' in subject) subject.width = xScale(subject.width)
        if ('height' in subject) subject.height = yScale(subject.height)
    }

    return <AnnotationType {...rest} x={x} y={y} subject={subject} />
}

Annotation.propTypes = AnnotationPropTypes

export default Annotation
