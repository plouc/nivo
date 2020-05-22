/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useState, useContext, useCallback } from 'react'
import { tooltipContext } from './context'

export const useTooltipHandlers = container => {
    const [state, setState] = useState({
        isVisible: false,
        content: null,
        position: {},
    })

    const showTooltipAt = useCallback((content, [x, y], anchor) => {
        setState({
            isVisible: true,
            position: [x, y],
            anchor,
            content,
        })
    }, [])

    const showTooltipFromEvent = useCallback(
        (content, event, anchor) => {
            const bounds = container.current.getBoundingClientRect()
            const x = event.clientX - bounds.left
            const y = event.clientY - bounds.top

            if (anchor === 'left' || anchor === 'right') {
                if (x < bounds.width / 2) anchor = 'right'
                else anchor = 'left'
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
    })

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

export const useTooltip = () => useContext(tooltipContext)
