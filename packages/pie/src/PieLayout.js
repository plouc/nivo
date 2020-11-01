/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { computeArcBoundingBox } from '@nivo/core'
import { usePieArcs, usePieArcGenerator } from './hooks'

export const PieLayoutDefaultProps = {
    fit: true,
    sortByValue: false,
    innerRadius: 0,
    startAngle: 0,
    endAngle: 360,
    padAngle: 0,
    cornerRadius: 0,
}

export default function PieLayout(props) {
    const {
        startAngle,
        endAngle,
        width,
        height,
        innerRadius: _innerRadius,
        debug,
        children: render,
        fit,
        cornerRadius,
        sortByValue,
        padAngle,
        data,
    } = props

    const dataWithArc = usePieArcs({
        data,
        startAngle,
        endAngle,
        padAngle,
        sortByValue,
    })

    const computedProps = React.useMemo(() => {
        let radius = Math.min(width, height) / 2
        let innerRadius = radius * Math.min(_innerRadius, 1)

        let centerX = width / 2
        let centerY = height / 2

        let boundingBox
        if (fit === true) {
            const { points, ...box } = computeArcBoundingBox(
                centerX,
                centerY,
                radius,
                startAngle - 90,
                endAngle - 90
            )
            const ratio = Math.min(width / box.width, height / box.height)

            const adjustedBox = {
                width: box.width * ratio,
                height: box.height * ratio,
            }
            adjustedBox.x = (width - adjustedBox.width) / 2
            adjustedBox.y = (height - adjustedBox.height) / 2

            centerX = ((centerX - box.x) / box.width) * box.width * ratio + adjustedBox.x
            centerY = ((centerY - box.y) / box.height) * box.height * ratio + adjustedBox.y

            boundingBox = { box, ratio, points }

            radius = radius * ratio
            innerRadius = innerRadius * ratio
        }

        return {
            centerX,
            centerY,
            radius,
            innerRadius,
            debug: boundingBox,
        }
    }, [width, height, _innerRadius, startAngle, endAngle, fit, cornerRadius])

    const arcGenerator = usePieArcGenerator({
        radius: computedProps.radius,
        innerRadius: computedProps.innerRadius,
        cornerRadius,
    })

    return render({
        arcs: dataWithArc,
        width,
        height,
        debug,
        arcGenerator,
        ...computedProps,
    })
}

PieLayout.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fit: PropTypes.bool.isRequired,
    sortByValue: PropTypes.bool.isRequired,
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    padAngle: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired, // re-computed
    cornerRadius: PropTypes.number.isRequired,
    debug: PropTypes.shape({
        points: PropTypes.array.isRequired,
        box: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
        }).isRequired,
        ratio: PropTypes.number.isRequired,
    }), // computed
    children: PropTypes.func.isRequired,
}

PieLayout.defaultProps = PieLayoutDefaultProps
