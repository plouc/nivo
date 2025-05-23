import { createElement, useCallback, MouseEvent, FocusEvent } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { RectNodeComponent, RectNodes } from '@nivo/rects'
import { BulletNodeValue, BulletCommonProps } from './types'

const getTestId = (node: BulletNodeValue) => `bullet.value.rect.${node.id}`

export interface BulletValuesLayerProps {
    nodes: readonly BulletNodeValue[]
    component: RectNodeComponent<BulletNodeValue>
    borderRadius: BulletCommonProps['valueBorderRadius']
    borderWidth: BulletCommonProps['valueBorderWidth']
    borderColor: BulletCommonProps['valueBorderColor']
    isInteractive: BulletCommonProps['isInteractive']
    onMouseEnter: any
    onMouseMove: any
    onMouseLeave: any
    onClick: any
    onDoubleClick: any
    onFocus: any
    onBlur: any
    onKeyDown: any
    onWheel: any
    onContextMenu: any
    tooltip: BulletCommonProps['valueTooltip']
}

export const BulletValuesLayer = ({
    nodes,
    component,
    borderRadius,
    borderWidth,
    borderColor,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    onDoubleClick,
    onFocus,
    onBlur,
    onKeyDown,
    onWheel,
    onContextMenu,
    tooltip,
}: BulletValuesLayerProps) => {
    const { showTooltipFromEvent, showTooltipAt, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (node: BulletNodeValue, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { node }), event)
            onMouseEnter?.(node, event)
        },
        [showTooltipFromEvent, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (node: BulletNodeValue, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { node }), event)
            onMouseMove?.(node, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (node: BulletNodeValue, event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(node, event)
        },
        [hideTooltip, onMouseLeave]
    )

    const handleFocus = useCallback(
        (node: BulletNodeValue, event: FocusEvent) => {
            showTooltipAt(createElement(tooltip, { node }), [
                node.rect.x + node.rect.width / 2,
                node.rect.y,
            ])

            onFocus?.(node, event)
        },
        [showTooltipAt, tooltip, onFocus]
    )

    const handleBlur = useCallback(
        (node: BulletNodeValue, event: FocusEvent) => {
            hideTooltip()
            onBlur?.(node, event)
        },
        [hideTooltip, onBlur]
    )

    return (
        <RectNodes<BulletNodeValue>
            nodes={nodes}
            component={component}
            uid="id"
            borderRadius={borderRadius}
            borderWidth={borderWidth}
            borderColor={borderColor}
            isInteractive={isInteractive}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            onContextMenu={onContextMenu}
            onWheel={onWheel}
            getTestId={getTestId}
        />
    )
}
