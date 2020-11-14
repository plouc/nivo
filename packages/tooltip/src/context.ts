import { createContext, MouseEvent } from 'react'
import { TooltipAnchor } from './types'

export interface TooltipActionsContextData {
    showTooltipAt: (
        content: JSX.Element,
        position: [number, number],
        anchor?: TooltipAnchor
    ) => void
    showTooltipFromEvent: (content: JSX.Element, event: MouseEvent) => void
    hideTooltip: () => void
}

const defaultActions: TooltipActionsContextData = {
    showTooltipAt: () => {},
    showTooltipFromEvent: () => {},
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
