import { ChartProperty, Flavor } from '../../types'

export const isInteractive = ({
    flavors,
    defaultValue,
    help,
}: {
    flavors: Flavor[]
    defaultValue: boolean
    help?: string
}): ChartProperty => ({
    key: 'isInteractive',
    group: 'Interactivity',
    type: 'boolean',
    help: help ?? 'Enable/disable interactivity.',
    required: false,
    defaultValue,
    flavors,
    control: { type: 'switch' },
})

const INTERACTION_HANDLERS_EVENT_TYPES: Record<string, string> = {
    onMouseEnter: 'MouseEvent',
    onMouseMove: 'MouseEvent',
    onMouseLeave: 'MouseEvent',
    onClick: 'MouseEvent',
    onDoubleClick: 'MouseEvent',
    onFocus: 'FocusEvent',
    onBlur: 'FocusEvent',
    onKeyDown: 'KeyboardEvent',
    onWheel: 'WheelEvent',
    onContextMenu: 'MouseEvent',
    onTouchStart: 'TouchEvent',
    onTouchMove: 'TouchEvent',
    onTouchEnd: 'TouchEvent',
}

type InteractionHandlerType = keyof typeof INTERACTION_HANDLERS_EVENT_TYPES

export interface InteractionHandlerConfig {
    type: InteractionHandlerType
    key?: string
    flavors?: Flavor[]
    help?: string
    description?: string
}

export const interactionHandlers = (
    handlers: InteractionHandlerConfig[],
    nodeType: string,
    flavors?: Flavor[],
    nodeName = 'node',
    group = 'Interactivity'
): ChartProperty[] =>
    handlers.map(handler => {
        return {
            key: handler.key ?? handler.type,
            group,
            type: `(${nodeName}: ${nodeType}, e: ${INTERACTION_HANDLERS_EVENT_TYPES[handler.type]}) => void`,
            help: handler.help ?? `${handler.type} handler.`,
            description: handler.description,
            required: false,
            defaultValue: undefined,
            flavors,
        } as ChartProperty
    })
