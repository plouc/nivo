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
import { line } from 'd3-shape'
import { textPropsByEngine, useTheme } from '@nivo/core'
import { datumWithArcPropType, PiePropTypes } from './props'

const lineGenerator = line()
    .x(d => d.x)
    .y(d => d.y)

export const RadialLabel = ({ label, linkStrokeWidth }) => {
    const theme = useTheme()

    return (
        <>
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
        </>
    )
}

RadialLabel.propTypes = {
    label: PropTypes.shape({
        line: PropTypes.arrayOf(
            PropTypes.shape({
                x: PropTypes.number,
                y: PropTypes.number,
            })
        ).isRequired,
        position: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        }).isRequired,
        textColor: PropTypes.string.isRequired,
        linkColor: PropTypes.string.isRequired,
        align: PropTypes.string.isRequired,
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        datum: datumWithArcPropType.isRequired,
    }).isRequired,
    linkStrokeWidth: PiePropTypes.radialLabelsLinkStrokeWidth,
}
