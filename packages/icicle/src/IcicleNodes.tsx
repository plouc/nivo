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
import { IcicleSvgPropsWithDefaults, IcicleNode, EventHandlers } from './types'

export interface IcicleNodesProps<Datum> {
    nodeRefs: MutableRefObject<NodeRefMap>
    nodes: IcicleNode<Datum>[]
    component: RectNodeComponent<IcicleNode<Datum>>
    borderRadius: IcicleSvgPropsWithDefaults<Datum>['borderRadius']
    borderWidth: IcicleSvgPropsWithDefaults<Datum>['borderWidth']
    borderColor: IcicleSvgPropsWithDefaults<Datum>['borderColor']
    isInteractive: IcicleSvgPropsWithDefaults<Datum>['isInteractive']
    enableZooming: IcicleSvgPropsWithDefaults<Datum>['enableZooming']
    zoom: (path: string | null) => void
    onMouseEnter?: EventHandlers<Datum>['onMouseEnter']
    onMouseMove?: EventHandlers<Datum>['onMouseMove']
    onMouseLeave?: EventHandlers<Datum>['onMouseLeave']
    onClick?: EventHandlers<Datum>['onClick']
    onFocus?: EventHandlers<Datum>['onFocus']
    onBlur?: EventHandlers<Datum>['onBlur']
    onKeyDown?: EventHandlers<Datum>['onKeyDown']
    onWheel?: EventHandlers<Datum>['onWheel']
    onContextMenu?: EventHandlers<Datum>['onContextMenu']
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
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
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

    const handleClick = useCallback(
        (datum: IcicleNode<Datum>, event: MouseEvent) => {
            onClick?.(datum, event)
            if (enableZooming) zoom(datum.hierarchy.path)
        },
        [onClick, enableZooming, zoom]
    )

    const handleMouseEnter = useCallback(
        (datum: IcicleNode<Datum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, datum), event)
            onMouseEnter?.(datum, event)
        },
        [showTooltipFromEvent, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (datum: IcicleNode<Datum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, datum), event)
            onMouseMove?.(datum, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (datum: IcicleNode<Datum>, event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(datum, event)
        },
        [hideTooltip, onMouseLeave]
    )

    const handleFocus = useCallback(
        (datum: IcicleNode<Datum>, event: FocusEvent) => {
            if (!datum.isVisible) zoom(datum.hierarchy.path)

            showTooltipAt(createElement(tooltip, datum), [
                datum.rect.x + datum.rect.width / 2,
                datum.rect.y,
            ])
            onFocus?.(datum, event)
        },
        [zoom, showTooltipAt, tooltip, onFocus]
    )

    const handleBlur = useCallback(
        (datum: IcicleNode<Datum>, event: FocusEvent) => {
            hideTooltip()
            onBlur?.(datum, event)
        },
        [hideTooltip, onBlur]
    )

    const handleKeyDown = useCallback(
        (datum: IcicleNode<Datum>, event: KeyboardEvent) => {
            onKeyDown?.(datum, event)

            if (event.key === 'ArrowUp') {
                nav.moveUp(datum.hierarchy.path)
                event.preventDefault()
            }
            if (event.key === 'ArrowLeft') {
                nav.movePrev(datum.hierarchy.path)
                event.preventDefault()
            }
            if (event.key === 'ArrowRight') {
                nav.moveNext(datum.hierarchy.path)
                event.preventDefault()
            }
            if (event.key === 'ArrowDown') {
                nav.moveDown(datum.hierarchy.path)
                event.preventDefault()
            }

            if (enableZooming && (event.key === 'Enter' || event.key === ' ')) {
                zoom(datum.hierarchy.path)
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
        (datum: IcicleNode<Datum>) => `icicle.rect.${datum.hierarchy.path}`,
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
