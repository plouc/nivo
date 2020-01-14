/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useState, useContext, useCallback, ReactNode } from 'react'
import { TooltipContext } from './context'

export const useTooltipHandlers = (container: any) => {
    const [state, setState] = useState<{
        isVisible: boolean
        content: ReactNode
        anchor?: 'left' | 'right'
        position?: [number, number]
    }>({
        isVisible: false,
        content: null,
    })

    const showTooltipAt = useCallback(
        (content: ReactNode, [x, y]: [number, number], anchor?: 'left' | 'right') => {
            setState({
                isVisible: true,
                position: [x, y],
                anchor,
                content,
            })
        },
        []
    )

    const showTooltipFromEvent = useCallback(
        (content: ReactNode, event: MouseEvent, anchor?: 'left' | 'right') => {
            const bounds = container.current.getBoundingClientRect()
            const x = event.clientX - bounds.left
            const y = event.clientY - bounds.top

            if (anchor === 'left' || anchor === 'right') {
                anchor = x < bounds.width / 2 ? 'right' : 'left'
            }

            setState({
                isVisible: true,
                position: [x, y],
                anchor,
                content,
            })
        },
        [container]
    )

    const hideTooltip = useCallback(() => {
        setState({ isVisible: false, content: null })
    }, [setState])

    return {
        showTooltipAt,
        showTooltipFromEvent,
        hideTooltip,
        isTooltipVisible: state.isVisible,
        tooltipPosition: state.position,
        tooltipAnchor: state.anchor,
        tooltipContent: state.content,
    }
}

export const useTooltip = () => useContext(TooltipContext)
