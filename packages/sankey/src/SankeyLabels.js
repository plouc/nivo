/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useSprings, animated } from 'react-spring'
import { useTheme, useMotionConfig } from '@nivo/core'

const SankeyLabels = ({
    nodes,
    layout,
    width,
    height,
    labelPosition,
    labelPadding,
    labelOrientation,
    getLabelTextColor,
}) => {
    const theme = useTheme()

    const labelRotation = labelOrientation === 'vertical' ? -90 : 0
    const labels = nodes.map(node => {
        let x
        let y
        let textAnchor
        if (layout === 'horizontal') {
            y = node.y + node.height / 2
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
        } else if (layout === 'vertical') {
            x = node.x + node.width / 2
            if (node.y < height / 2) {
                if (labelPosition === 'inside') {
                    y = node.y1 + labelPadding
                    textAnchor = labelOrientation === 'vertical' ? 'end' : 'middle'
                } else {
                    y = node.y - labelPadding
                    textAnchor = labelOrientation === 'vertical' ? 'start' : 'middle'
                }
            } else {
                if (labelPosition === 'inside') {
                    y = node.y - labelPadding
                    textAnchor = labelOrientation === 'vertical' ? 'start' : 'middle'
                } else {
                    y = node.y1 + labelPadding
                    textAnchor = labelOrientation === 'vertical' ? 'end' : 'middle'
                }
            }
        }

        return {
            id: node.id,
            label: node.label,
            x,
            y,
            textAnchor,
            color: getLabelTextColor(node),
        }
    })

    const { animate, config: springConfig } = useMotionConfig()
    const springs = useSprings(
        labels.length,
        labels.map(label => ({
            transform: `translate(${label.x}, ${label.y}) rotate(${labelRotation})`,
            color: label.color,
            config: springConfig,
            immediate: !animate,
        }))
    )

    return springs.map((animatedProps, index) => {
        const label = labels[index]

        return (
            <animated.text
                key={label.id}
                dominantBaseline="central"
                textAnchor={label.textAnchor}
                transform={animatedProps.transform}
                style={{
                    ...theme.labels.text,
                    fill: animatedProps.color,
                    pointerEvents: 'none',
                }}
            >
                {label.label}
            </animated.text>
        )
    })
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
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    labelPosition: PropTypes.oneOf(['inside', 'outside']).isRequired,
    labelPadding: PropTypes.number.isRequired,
    labelOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    getLabelTextColor: PropTypes.func.isRequired,
}

export default memo(SankeyLabels)
