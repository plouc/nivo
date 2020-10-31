/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, {
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
    PropsWithChildren,
    CSSProperties,
    ReactNode,
} from 'react'
import { TooltipWrapper } from './components'

export type TooltipContextValue = {
    showTooltipAt: (content: ReactNode, [x, y]: [number, number], anchor?: 'left' | 'right') => void
    showTooltipFromEvent: (content: ReactNode, event: MouseEvent, anchor?: 'left' | 'right') => void
    hideTooltip: () => void
}

export interface TooltipProviderProps {
    renderWrapper?: boolean
}

interface TooltipVisibleState {
    isVisible: true
    content: ReactNode
    position: [number, number]
    anchor?: 'left' | 'right'
}

interface TooltipHiddenState {
    isVisible: false
    content: null
}

type TooltipState = TooltipVisibleState | TooltipHiddenState

const containerStyle: CSSProperties = {
    position: 'relative',
}

const TooltipContext = createContext<TooltipContextValue | undefined>(undefined)

export const useTooltip = () => {
    const context = useContext(TooltipContext)

    if (!context) {
        throw new Error('useTooltip must be used in a TooltipProvider')
    }

    return context
}

export const TooltipProvider = ({
    children,
    renderWrapper = true,
}: PropsWithChildren<TooltipProviderProps>) => {
    const container = useRef<HTMLDivElement>(null)
    const [state, setState] = useState<TooltipState>({
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
        [setState]
    )

    const showTooltipFromEvent = useCallback(
        (content: ReactNode, event: MouseEvent, anchor?: 'left' | 'right') => {
            const bounds = container.current?.getBoundingClientRect() ?? {
                left: 0,
                top: 0,
                width: 0,
            }
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
        [container, setState]
    )

    const hideTooltip = useCallback(() => {
        setState({ isVisible: false, content: null })
    }, [setState])

    return (
        <TooltipContext.Provider value={{ showTooltipAt, showTooltipFromEvent, hideTooltip }}>
            {/* we should not render the div element if using the HTTP API */}
            {renderWrapper === true && (
                <div style={containerStyle} ref={container}>
                    {children}
                    {state.isVisible && (
                        <TooltipWrapper position={state.position} anchor={state.anchor}>
                            {state.content}
                        </TooltipWrapper>
                    )}
                </div>
            )}
            {renderWrapper !== true && children}
        </TooltipContext.Provider>
    )
}
