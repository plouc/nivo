import { createContext, MouseEvent, TouchEvent } from 'react'
import { TooltipAnchor } from './types'

export interface TooltipActionsContextData {
    showTooltipAt: (
        content: JSX.Element,
        position: [number, number],
        anchor?: TooltipAnchor
    ) => void
    showTooltipFromEvent: (
        content: JSX.Element,
        event: MouseEvent | TouchEvent,
        anchor?: TooltipAnchor
    ) => void
    hideTooltip: () => void
}

const defaultActions: TooltipActionsContextData = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    showTooltipAt: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    showTooltipFromEvent: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    hideTooltip: () => {},
}

export const TooltipActionsContext = createContext<TooltipActionsContextData>(defaultActions)

export interface TooltipStateContextDataVisible {
    isVisible: true
    position: [number, number]
    content: JSX.Element
    anchor: TooltipAnchor
}

export interface TooltipStateContextDataHidden {
    isVisible: false
    position: [null, null]
    content: null
    anchor: null
}

export type TooltipStateContextData = TooltipStateContextDataVisible | TooltipStateContextDataHidden

export const hiddenTooltipState: TooltipStateContextDataHidden = {
    isVisible: false,
    position: [null, null],
    content: null,
    anchor: null,
}

export const TooltipStateContext = createContext<TooltipStateContextData>(hiddenTooltipState)
