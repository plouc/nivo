import {
    useState,
    useContext,
    useCallback,
    MutableRefObject,
    MouseEvent,
    TouchEvent,
    useMemo,
} from 'react'
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
        (content: JSX.Element, event: MouseEvent | TouchEvent, anchor: TooltipAnchor = 'top') => {
            const bounds = container.current.getBoundingClientRect()
            const offsetWidth = container.current.offsetWidth
            // In a normal situation mouse enter / mouse leave events
            // capture the position ok. But when the chart is inside a scaled
            // element with a CSS transform like: `transform: scale(2);`
            // tooltip are not positioned ok.
            // Comparing original width `offsetWidth` agains scaled
            // width give us the scaling factor to calculate
            // ok mouse position
            const scaling = offsetWidth === bounds.width ? 1 : offsetWidth / bounds.width
            const { clientX, clientY } = 'touches' in event ? event.touches[0] : event
            const x = (clientX - bounds.left) * scaling
            const y = (clientY - bounds.top) * scaling

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
