/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import { motionPropTypes } from '@nivo/core'

export default class ParallelCoordinatesAxisDensityCircles extends PureComponent {
    static propTypes = {
        axis: PropTypes.oneOf(['x', 'y']).isRequired,
        variable: PropTypes.shape({
            key: PropTypes.string.isRequired,
            densityBins: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                    size: PropTypes.number.isRequired,
                })
            ).isRequired,
        }).isRequired,
        variablesScale: PropTypes.func.isRequired,
        ...motionPropTypes,
    }

    circleWillEnter = ({ style }) => {
        return {
            r: 0,
            cx: style.cx.val || style.cx,
            cy: style.cy.val || style.cy,
        }
    }

    circleWillLeave = ({ style }) => {
        const { motionStiffness: stiffness, motionDamping: damping } = this.props
        const springConfig = { stiffness, damping }

        return {
            r: spring(0, springConfig),
            cx: style.cx && style.cx.val ? style.cx.val : style.cx || 0,
            cy: style.cy && style.cy.val ? style.cy.val : style.cy || 0,
        }
    }

    render() {
        const {
            axis,
            variable,
            variablesScale,
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const otherPosition = variablesScale(variable.key)

        if (animate !== true) {
            return (
                <g>
                    {variable.densityBins.map(bin => (
                        <circle
                            key={bin.id}
                            r={bin.size / 2}
                            cx={axis === 'y' ? otherPosition : bin.position}
                            cy={axis === 'y' ? bin.position : otherPosition}
                            fill="rgba(255,0,0,.1)"
                        />
                    ))}
                </g>
            )
        }

        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        return (
            <TransitionMotion
                willEnter={this.circleWillEnter}
                willLeave={this.circleWillLeave}
                styles={variable.densityBins.map(bin => ({
                    key: `${bin.id}`,
                    data: bin,
                    style: {
                        r: spring(bin.size / 2, springConfig),
                        cx: spring(axis === 'y' ? otherPosition : bin.position, springConfig),
                        cy: spring(axis === 'y' ? bin.position : otherPosition, springConfig),
                    },
                }))}
            >
                {interpolatedStyles => (
                    <Fragment>
                        {interpolatedStyles.map(({ style, data: bin }) => (
                            <circle
                                key={bin.id}
                                {...style}
                                r={Math.max(style.r, 0)}
                                fill="rgba(255,0,0,.1)"
                            />
                        ))}
                    </Fragment>
                )}
            </TransitionMotion>
        )
    }
}
