/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo, useState, PropsWithChildren, CSSProperties } from 'react'
import Measure from 'react-measure'
import { Motion, spring } from 'react-motion'
import { useTheme, useMotionConfig } from '@nivo/core'

const TOOLTIP_OFFSET = 14

const tooltipStyle: CSSProperties = {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
}

interface TooltipWrapperProps {
    position: [number, number]
    anchor?: 'top' | 'right' | 'bottom' | 'left' | 'center'
}

export const TooltipWrapper = memo(
    ({ position, anchor = 'top', children }: PropsWithChildren<TooltipWrapperProps>) => {
        const [dimensions, setDimensions] = useState<[number, number] | null>(null)
        const theme = useTheme()
        const { animate, springConfig } = useMotionConfig()

        let x = Math.round(position[0])
        let y = Math.round(position[1])
        if (Array.isArray(dimensions)) {
            if (anchor === 'top') {
                x -= dimensions[0] / 2
                y -= dimensions[1] + TOOLTIP_OFFSET
            } else if (anchor === 'right') {
                x += TOOLTIP_OFFSET
                y -= dimensions[1] / 2
            } else if (anchor === 'bottom') {
                x -= dimensions[0] / 2
                y += TOOLTIP_OFFSET
            } else if (anchor === 'left') {
                x -= dimensions[0] + TOOLTIP_OFFSET
                y -= dimensions[1] / 2
            } else if (anchor === 'center') {
                x -= dimensions[0] / 2
                y -= dimensions[1] / 2
            }
        }

        const style: CSSProperties = useMemo(
            () => ({
                ...tooltipStyle,
                ...theme.tooltip,
                transform: `translate(${x}px, ${y}px)`,
                opacity: dimensions === null ? 0 : 1,
            }),
            [x, y, dimensions, theme.tooltip]
        )

        // if we don't have dimensions yet, we use
        // the non animated version with a 0 opacity
        // to avoid a flash effect and weird initial transition
        if (animate !== true || dimensions === null) {
            return (
                <Measure
                    client={false}
                    offset={false}
                    bounds={true}
                    margin={false}
                    onResize={({ bounds }) => {
                        setDimensions([bounds!.width, bounds!.height])
                    }}
                >
                    {({ measureRef }) => (
                        <div ref={measureRef} style={style}>
                            {children}
                        </div>
                    )}
                </Measure>
            )
        }

        return (
            <Motion
                style={{
                    x: spring(x, springConfig),
                    y: spring(y, springConfig),
                }}
            >
                {animatedPosition => (
                    <Measure
                        client={false}
                        offset={false}
                        bounds={true}
                        margin={false}
                        onResize={({ bounds }) => {
                            setDimensions([bounds!.width, bounds!.height])
                        }}
                    >
                        {({ measureRef }) => (
                            <div
                                ref={measureRef}
                                style={{
                                    ...tooltipStyle,
                                    ...theme.tooltip,
                                    transform: `translate3d(${animatedPosition.x}px, ${animatedPosition.y}px, 0)`,
                                }}
                            >
                                {children}
                            </div>
                        )}
                    </Measure>
                )}
            </Motion>
        )
    }
)
