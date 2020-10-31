/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useRef, useState, useCallback, ReactNode, CSSProperties } from 'react'
// import { TooltipContext } from '@nivo/tooltip'
import noop from '../lib/noop'
import { Theme, ThemeContext } from '../theming'
import { MotionConfigProvider } from '../motion'

const containerStyle: CSSProperties = {
    position: 'relative',
}

const tooltipStyle: CSSProperties = {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10,
}

type Children = (props: { showTooltip: any; hideTooltip: any }) => ReactNode

export interface ContainerProps {
    children: Children
    theme: Theme
    isInteractive?: boolean
    animate: boolean
    motionStiffness?: number
    motionDamping?: number
}

export const Container = ({
    children,
    theme,
    isInteractive = true,
    animate,
    motionStiffness,
    motionDamping,
}: ContainerProps) => {
    const containerEl = useRef<HTMLDivElement>(null)
    const [state, setState] = useState<{
        isTooltipVisible: boolean
        tooltipContent: ReactNode
        position?: {
            top?: number
            right?: number
            bottom?: number
            left?: number
        }
    }>({
        isTooltipVisible: false,
        tooltipContent: null,
    })
    const showTooltip = useCallback(
        (content: ReactNode, event) => {
            if (containerEl.current === null) {
                return
            }

            const bounds = containerEl.current.getBoundingClientRect()

            const { clientX, clientY } = event

            const x = clientX - bounds.left
            const y = clientY - bounds.top

            const newPosition: {
                top?: number
                right?: number
                bottom?: number
                left?: number
            } = {}

            if (x < bounds.width / 2) {
                newPosition.left = x + 20
            } else {
                newPosition.right = bounds.width - x + 20
            }

            if (y < bounds.height / 2) {
                newPosition.top = y - 12
            } else {
                newPosition.bottom = bounds.height - y - 12
            }

            setState({
                isTooltipVisible: true,
                tooltipContent: content,
                position: newPosition,
            })
        },
        [containerEl]
    )
    const hideTooltip = useCallback(() => {
        setState({ isTooltipVisible: false, tooltipContent: null })
    }, [setState])
    const { isTooltipVisible, tooltipContent, position } = state

    let content
    if (isInteractive === true) {
        content = (
            <div style={containerStyle} ref={containerEl}>
                {children({
                    showTooltip: isInteractive ? showTooltip : noop,
                    hideTooltip: isInteractive ? hideTooltip : noop,
                })}
                {isTooltipVisible && (
                    <div
                        style={{
                            ...tooltipStyle,
                            ...position,
                            ...theme.tooltip.container,
                        }}
                    >
                        {tooltipContent}
                    </div>
                )}
            </div>
        )
    } else {
        content = children({
            showTooltip: isInteractive ? showTooltip : noop,
            hideTooltip: isInteractive ? hideTooltip : noop,
        })
    }

    return (
        <ThemeContext.Provider value={theme}>
            <MotionConfigProvider
                animate={animate}
                stiffness={motionStiffness}
                damping={motionDamping}
            >
                {/* <TooltipContext.Provider value={[showTooltip, hideTooltip]}> */}
                {content}
                {/* </TooltipContext.Provider> */}
            </MotionConfigProvider>
        </ThemeContext.Provider>
    )
}
