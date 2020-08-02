/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { line } from 'd3-shape'
import { textPropsByEngine, axisThemePropType, labelsThemePropType } from '@nivo/core'
import { arcPropType } from './props'
import { computeRadialLabels } from './compute'

const lineGenerator = line()
    .x(d => d.x)
    .y(d => d.y)

export default class PieRadialLabels extends Component {
    static propTypes = {
        arcs: PropTypes.arrayOf(arcPropType).isRequired,
        label: PropTypes.func.isRequired,
        skipAngle: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
        linkOffset: PropTypes.number.isRequired,
        linkDiagonalLength: PropTypes.number.isRequired,
        linkHorizontalLength: PropTypes.number.isRequired,
        linkStrokeWidth: PropTypes.number.isRequired,
        textXOffset: PropTypes.number.isRequired,
        textColor: PropTypes.func.isRequired,
        linkColor: PropTypes.func.isRequired,
        theme: PropTypes.shape({
            axis: axisThemePropType.isRequired,
            labels: labelsThemePropType.isRequired,
        }).isRequired,
    }

    static defaultProps = {
        skipAngle: 0,
        linkOffset: 0,
        linkDiagonalLength: 16,
        linkHorizontalLength: 24,
        linkStrokeWidth: 1,
        textXOffset: 6,
    }

    render() {
        const {
            arcs,
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
            theme,
        } = this.props

        const labels = computeRadialLabels(arcs, {
            getLabel: label,
            radius,
            skipAngle,
            linkOffset,
            linkDiagonalLength,
            linkHorizontalLength,
            textXOffset,
        })

        return labels.map(label => (
            <Fragment key={label.arc.data.id}>
                <path
                    d={lineGenerator(label.line)}
                    fill="none"
                    style={{ fill: 'none', stroke: linkColor(label.arc, theme) }}
                    strokeWidth={linkStrokeWidth}
                />
                <g transform={`translate(${label.position.x}, ${label.position.y})`}>
                    <text
                        textAnchor={textPropsByEngine.svg.align[label.align]}
                        dominantBaseline="central"
                        style={{
                            ...theme.labels.text,
                            fill: textColor(label.arc.data, theme),
                        }}
                    >
                        {label.text}
                    </text>
                </g>
            </Fragment>
        ))
    }
}
