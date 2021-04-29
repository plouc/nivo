import { useState, useContext, useCallback, MutableRefObject, MouseEvent, useMemo } from 'react'
import {
    TooltipActionsContext,
    TooltipActionsContextData,
    TooltipStateContext,
    TooltipStateContextData,
    hiddenTooltipState,
} from './context'
import { TooltipAnchor } from './types'

export const useTooltipHandlers = (container: MutableRefObject<HTMLDivElement>) => {
    const [state, setState] = useState<TooltipStateContextData>(hiddenTooltipState)

    const showTooltipAt: TooltipActionsContextData['showTooltipAt'] = useCallback(
        (content: JSX.Element, [x, y]: [number, number], anchor: TooltipAnchor = 'top') => {
            setState({
                isVisible: true,
                position: [x, y],
                anchor,
                content,
            })
        },
        [setState]
    )

    const showTooltipFromEvent: TooltipActionsContextData['showTooltipFromEvent'] = useCallback(
        (content: JSX.Element, event: MouseEvent, anchor: TooltipAnchor = 'top') => {
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
        [container, setState]
    )

    const hideTooltip = useCallback(() => {
        setState(hiddenTooltipState)
    }, [setState])

    const actions: TooltipActionsContextData = useMemo(() => {
        return {
            showTooltipAt,
            showTooltipFromEvent,
            hideTooltip,
        }
    }, [showTooltipAt, showTooltipFromEvent, hideTooltip])

    return {
        actions,
        state,
    }
}

export const useTooltip = () => {
    const context = useContext(TooltipActionsContext)
    if (context === undefined) {
        throw new Error('useTooltip must be used within a TooltipProvider')
    }

    return context
}

export const useTooltipState = () => {
    const context = useContext(TooltipStateContext)
    if (context === undefined) {
        throw new Error('useTooltipState must be used within a TooltipProvider')
    }

    return context
}
