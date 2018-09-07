/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SmartMotion, motionPropTypes, themePropType } from '@nivo/core'
import ParallelCoordinatesLineTooltip from './ParallelCoordinatesLineTooltip'

export default class ParallelCoordinatesLine extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        variables: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            })
        ).isRequired,
        lineGenerator: PropTypes.func.isRequired,
        points: PropTypes.arrayOf(
            PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
            })
        ).isRequired,
        strokeWidth: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        opacity: PropTypes.number.isRequired,
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
        theme: themePropType.isRequired,
        ...motionPropTypes,
    }

    handleActiveMouse = event => {
        const { showTooltip, data, variables, theme } = this.props
        showTooltip(
            <ParallelCoordinatesLineTooltip data={data} variables={variables} theme={theme} />,
            event
        )
    }

    handleMouseLeave = () => {
        this.props.hideTooltip()
    }

    render() {
        const {
            lineGenerator,
            points,
            strokeWidth,
            color,
            opacity,
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const pathDefinition = lineGenerator(points)

        if (animate !== true) {
            return (
                <path
                    d={pathDefinition}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    opacity={opacity}
                    fill="none"
                    onMouseEnter={this.handleActiveMouse}
                    onMouseMove={this.handleActiveMouse}
                    onMouseLeave={this.handleMouseLeave}
                />
            )
        }

        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        return (
            <SmartMotion
                style={spring => ({
                    d: spring(pathDefinition, springConfig),
                    opacity: spring(opacity, springConfig),
                })}
            >
                {style => (
                    <path
                        d={style.d}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        opacity={style.opacity}
                        fill="none"
                        onMouseEnter={this.handleActiveMouse}
                        onMouseMove={this.handleActiveMouse}
                        onMouseLeave={this.handleMouseLeave}
                    />
                )}
            </SmartMotion>
        )
    }
}
