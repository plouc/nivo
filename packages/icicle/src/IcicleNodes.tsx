import {
    createElement,
    useCallback,
    MouseEvent,
    FocusEvent,
    KeyboardEvent,
    MutableRefObject,
} from 'react'
import { useTooltip } from '@nivo/tooltip'
import { RectNodeComponent, RectNodes, NodeRefMap } from '@nivo/rects'
import { IcicleSvgPropsWithDefaults, IcicleNode, IcicleInteractionHandlers } from './types'

export interface IcicleNodesProps<Datum> extends IcicleInteractionHandlers<Datum> {
    nodeRefs: MutableRefObject<NodeRefMap>
    nodes: IcicleNode<Datum>[]
    component: RectNodeComponent<IcicleNode<Datum>>
    borderRadius: IcicleSvgPropsWithDefaults<Datum>['borderRadius']
    borderWidth: IcicleSvgPropsWithDefaults<Datum>['borderWidth']
    borderColor: IcicleSvgPropsWithDefaults<Datum>['borderColor']
    isInteractive: IcicleSvgPropsWithDefaults<Datum>['isInteractive']
    enableZooming: IcicleSvgPropsWithDefaults<Datum>['enableZooming']
    zoom: (path: string | null) => void
    tooltip: IcicleSvgPropsWithDefaults<Datum>['tooltip']
    isFocusable: IcicleSvgPropsWithDefaults<Datum>['isFocusable']
    nav: {
        moveUp: (path: string) => void
        movePrev: (path: string) => void
        moveNext: (path: string) => void
        moveDown: (path: string) => void
    }
    animateOnMount: IcicleSvgPropsWithDefaults<Datum>['animateOnMount']
    transitionMode: IcicleSvgPropsWithDefaults<Datum>['rectsTransitionMode']
}

export const IcicleNodes = <Datum,>({
    nodeRefs,
    nodes,
    component,
    borderRadius,
    borderWidth,
    borderColor,
    isInteractive,
    enableZooming,
    zoom,
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
    isFocusable,
    nav,
    animateOnMount,
    transitionMode,
}: IcicleNodesProps<Datum>) => {
    const { showTooltipFromEvent, showTooltipAt, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (node: IcicleNode<Datum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, node), event)
            onMouseEnter?.(node, event)
        },
        [showTooltipFromEvent, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (node: IcicleNode<Datum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, node), event)
            onMouseMove?.(node, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (node: IcicleNode<Datum>, event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(node, event)
        },
        [hideTooltip, onMouseLeave]
    )

    const handleClick = useCallback(
        (node: IcicleNode<Datum>, event: MouseEvent) => {
            onClick?.(node, event)
            if (enableZooming) zoom(node.hierarchy.path)
        },
        [onClick, enableZooming, zoom]
    )

    const handleFocus = useCallback(
        (node: IcicleNode<Datum>, event: FocusEvent) => {
            if (node.isVisible) {
                showTooltipAt(createElement(tooltip, node), [
                    node.rect.x + node.rect.width / 2,
                    node.rect.y,
                ])
            } else {
                zoom(node.hierarchy.path)
            }

            onFocus?.(node, event)
        },
        [zoom, showTooltipAt, tooltip, onFocus]
    )

    const handleBlur = useCallback(
        (node: IcicleNode<Datum>, event: FocusEvent) => {
            hideTooltip()
            onBlur?.(node, event)
        },
        [hideTooltip, onBlur]
    )

    const handleKeyDown = useCallback(
        (node: IcicleNode<Datum>, event: KeyboardEvent) => {
            onKeyDown?.(node, event)

            if (event.key === 'ArrowUp') {
                nav.moveUp(node.hierarchy.path)
                event.preventDefault()
            }
            if (event.key === 'ArrowLeft') {
                nav.movePrev(node.hierarchy.path)
                event.preventDefault()
            }
            if (event.key === 'ArrowRight') {
                nav.moveNext(node.hierarchy.path)
                event.preventDefault()
            }
            if (event.key === 'ArrowDown') {
                nav.moveDown(node.hierarchy.path)
                event.preventDefault()
            }

            if (enableZooming && (event.key === 'Enter' || event.key === ' ')) {
                zoom(node.hierarchy.path)
                event.preventDefault()
            }

            if (enableZooming && event.key === 'Escape') {
                zoom(null)
                event.preventDefault()
            }
        },
        [nav, enableZooming, zoom, onKeyDown]
    )

    const getTestId = useCallback(
        (node: IcicleNode<Datum>) => `icicle.rect.${node.hierarchy.path}`,
        []
    )

    return (
        <RectNodes<IcicleNode<Datum>>
            nodeRefs={nodeRefs}
            nodes={nodes}
            component={component}
            uid="hierarchy.path"
            borderRadius={borderRadius}
            borderWidth={borderWidth}
            borderColor={borderColor}
            isInteractive={isInteractive}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onDoubleClick={onDoubleClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onContextMenu={onContextMenu}
            onWheel={onWheel}
            isFocusable={isFocusable}
            animateOnMount={animateOnMount}
            transitionMode={transitionMode}
            getTestId={getTestId}
        />
    )
}
