/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { line } from 'd3-shape'
import { textPropsByEngine, useTheme } from '@nivo/core'
import { datumWithArcPropType, PiePropTypes } from './props'
import { usePieRadialLabels } from './hooks'

const lineGenerator = line()
    .x(d => d.x)
    .y(d => d.y)

const PieRadialLabels = ({
    dataWithArc,
    label,
    radius,
    skipAngle,
    linkOffset,
    linkDiagonalLength,
    linkHorizontalLength,
    linkStrokeWidth,
    textXOffset,
    textColor,
    linkColor,
}) => {
    const theme = useTheme()

    const radialLabels = usePieRadialLabels({
        enable: true,
        dataWithArc,
        label,
        textXOffset,
        textColor,
        radius,
        skipAngle,
        linkOffset,
        linkDiagonalLength,
        linkHorizontalLength,
        linkColor,
    })

    return radialLabels.map(label => (
        <Fragment key={label.datum.id}>
            <path
                d={lineGenerator(label.line)}
                fill="none"
                style={{ fill: 'none', stroke: label.linkColor }}
                strokeWidth={linkStrokeWidth}
            />
            <g transform={`translate(${label.position.x}, ${label.position.y})`}>
                <text
                    textAnchor={textPropsByEngine.svg.align[label.align]}
                    dominantBaseline="central"
                    style={{
                        ...theme.labels.text,
                        fill: label.textColor,
                    }}
                >
                    {label.text}
                </text>
            </g>
        </Fragment>
    ))
}

PieRadialLabels.propTypes = {
    dataWithArc: PropTypes.arrayOf(datumWithArcPropType).isRequired,
    label: PiePropTypes.radialLabel,
    skipAngle: PiePropTypes.radialLabelsSkipAngle,
    radius: PropTypes.number.isRequired,
    linkOffset: PiePropTypes.radialLabelsLinkOffset,
    linkDiagonalLength: PiePropTypes.radialLabelsLinkDiagonalLength,
    linkHorizontalLength: PiePropTypes.radialLabelsLinkHorizontalLength,
    linkStrokeWidth: PiePropTypes.radialLabelsLinkStrokeWidth,
    textXOffset: PiePropTypes.radialLabelsTextXOffset,
    textColor: PiePropTypes.radialLabelsTextColor,
    linkColor: PiePropTypes.radialLabelsLinkColor,
}

export default PieRadialLabels
