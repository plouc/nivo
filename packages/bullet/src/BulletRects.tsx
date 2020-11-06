import React, { Component, Fragment } from 'react'
import partial from 'lodash/partial'
import { TransitionMotion, spring } from 'react-motion'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
// @ts-ignore
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'
import { computeRects } from './compute'
import { BulletRectsProps, ComputedRangeDatum } from './types'

type MouseEventWithDatum = (
    datum: ComputedRangeDatum,
    event: React.MouseEvent<SVGRectElement, MouseEvent>
) => void

type EventHandlers = Record<'onMouseEnter' | 'onMouseLeave' | 'onClick', MouseEventWithDatum>

class BulletRects extends Component<BulletRectsProps & EventHandlers> {
    handleMouseEnter: MouseEventWithDatum = (data, event) => {
        this.props.onMouseEnter(data, event)
    }

    handleMouseLeave: MouseEventWithDatum = (data, event) => {
        this.props.onMouseLeave(data, event)
    }

    handleClick: MouseEventWithDatum = (data, event) => {
        this.props.onClick(data, event)
    }

    render() {
        const { rects, layout, y, component, animate, motionStiffness, motionDamping } = this.props

        const transform = `translate(${layout === 'horizontal' ? 0 : y},${
            layout === 'horizontal' ? y : 0
        })`

        if (animate !== true) {
            return (
                <g transform={transform}>
                    {rects.map(rect =>
                        React.createElement(component, {
                            key: rect.data.index,
                            index: rect.data.index,
                            color: rect.data.color,
                            ...rect,
                            onMouseEnter: partial(this.handleMouseEnter, rect.data),
                            onMouseMove: partial(this.handleMouseEnter, rect.data),
                            onMouseLeave: partial(this.handleMouseLeave, rect.data),
                            onClick: partial(this.handleClick, rect.data),
                        })
                    )}
                </g>
            )
        }

        const springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness,
        }

        return (
            <g transform={transform}>
                <TransitionMotion
                    styles={rects.map(rect => ({
                        key: `${rect.data.index}`,
                        data: rect.data,
                        style: {
                            x: spring(rect.x, springConfig),
                            y: spring(rect.y, springConfig),
                            width: spring(rect.width, springConfig),
                            height: spring(rect.height, springConfig),
                            ...interpolateColor(rect.data.color, springConfig),
                        },
                    }))}
                >
                    {interpolatedStyles => (
                        <Fragment>
                            {interpolatedStyles.map(({ key, style, data }) => {
                                const color = getInterpolatedColor(style)

                                return React.createElement(component, {
                                    key,
                                    index: Number(key),
                                    data,
                                    x: style.x,
                                    y: style.y,
                                    width: Math.max(style.width, 0),
                                    height: Math.max(style.height, 0),
                                    color,
                                    onMouseEnter: partial(this.handleMouseEnter, data),
                                    onMouseMove: partial(this.handleMouseEnter, data),
                                    onMouseLeave: partial(this.handleMouseLeave, data),
                                    onClick: partial(this.handleClick, data),
                                })
                            })}
                        </Fragment>
                    )}
                </TransitionMotion>
            </g>
        )
    }
}

const EnhancedBulletRects = compose(
    withPropsOnChange(
        ['data', 'layout', 'reverse', 'scale', 'height'],
        ({
            data,
            layout,
            reverse,
            scale,
            height,
        }: Pick<BulletRectsProps, 'data' | 'layout' | 'reverse' | 'scale' | 'height'>) => ({
            rects: computeRects({
                data,
                layout,
                reverse,
                scale,
                height,
            }),
        })
    ),
    pure
)(BulletRects as any) as React.ComponentClass<Omit<BulletRectsProps, 'rects'> & EventHandlers>

EnhancedBulletRects.displayName = 'BulletRects'

export default EnhancedBulletRects
