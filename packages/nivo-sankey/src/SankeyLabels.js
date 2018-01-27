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
import pure from 'recompose/pure'
import { TransitionMotion, spring } from 'react-motion'
import { colorMotionSpring, getInterpolatedColor, motionPropTypes } from '@nivo/core'

const SankeyLabels = ({
    nodes,

    width,

    labelPosition,
    labelPadding,
    labelOrientation,
    getLabelTextColor,

    theme,

    // motion
    animate,
    motionDamping,
    motionStiffness,
}) => {
    const labelRotation = labelOrientation === 'vertical' ? -90 : 0
    const labels = nodes.map(node => {
        let x
        let textAnchor
        if (node.x < width / 2) {
            if (labelPosition === 'inside') {
                x = node.x1 + labelPadding
                textAnchor = labelOrientation === 'vertical' ? 'middle' : 'start'
            } else {
                x = node.x - labelPadding
                textAnchor = labelOrientation === 'vertical' ? 'middle' : 'end'
            }
        } else {
            if (labelPosition === 'inside') {
                x = node.x - labelPadding
                textAnchor = labelOrientation === 'vertical' ? 'middle' : 'end'
            } else {
                x = node.x1 + labelPadding
                textAnchor = labelOrientation === 'vertical' ? 'middle' : 'start'
            }
        }

        return {
            id: node.id,
            label: node.label,
            x,
            y: node.y + node.height / 2,
            textAnchor,
            color: getLabelTextColor(node),
        }
    })

    if (!animate) {
        return (
            <g>
                {labels.map(label => {
                    return (
                        <text
                            key={label.id}
                            alignmentBaseline="central"
                            textAnchor={label.textAnchor}
                            transform={`translate(${label.x}, ${label.y}) rotate(${labelRotation})`}
                            style={{ ...theme.sankey.label, fill: label.color }}
                        >
                            {label.label}
                        </text>
                    )
                })}
            </g>
        )
    }

    const springProps = {
        damping: motionDamping,
        stiffness: motionStiffness,
    }

    return (
        <TransitionMotion
            styles={labels.map(label => {
                return {
                    key: label.id,
                    data: label,
                    style: {
                        x: spring(label.x, springProps),
                        y: spring(label.y, springProps),
                        rotation: spring(labelRotation, springProps),
                        ...colorMotionSpring(label.color, springProps),
                    },
                }
            })}
        >
            {interpolatedStyles => (
                <g>
                    {interpolatedStyles.map(({ key, style, data }) => {
                        const color = getInterpolatedColor(style)

                        return (
                            <text
                                key={key}
                                transform={`translate(${style.x}, ${style.y}) rotate(${
                                    style.rotation
                                })`}
                                alignmentBaseline="central"
                                textAnchor={data.textAnchor}
                                style={{
                                    ...theme.sankey.label,
                                    fill: color,
                                    pointerEvents: 'none',
                                }}
                            >
                                {data.label}
                            </text>
                        )
                    })}
                </g>
            )}
        </TransitionMotion>
    )
}

SankeyLabels.propTypes = {
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            x1: PropTypes.number.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
        })
    ).isRequired,

    width: PropTypes.number.isRequired,

    labelPosition: PropTypes.oneOf(['inside', 'outside']).isRequired,
    labelPadding: PropTypes.number.isRequired,
    labelOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    getLabelTextColor: PropTypes.func.isRequired,

    theme: PropTypes.shape({
        sankey: PropTypes.shape({
            label: PropTypes.object.isRequired,
        }).isRequired,
    }).isRequired,

    ...motionPropTypes,
}

export default pure(SankeyLabels)
