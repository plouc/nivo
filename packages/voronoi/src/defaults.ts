import { Margin, defaultMargin as coreDefaultMargin } from '@nivo/core'
import { TooltipAnchor, TooltipPosition } from '@nivo/tooltip'

export const defaultNodePositionAccessor = (node: {
    x: number
    y: number
}): [x: number, y: number] => [node.x, node.y]

export const defaultMargin: Margin = coreDefaultMargin

export const defaultTooltipPosition: TooltipPosition = 'cursor'
export const defaultTooltipAnchor: TooltipAnchor = 'top'
