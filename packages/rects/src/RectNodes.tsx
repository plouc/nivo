import { useCallback, RefObject, MutableRefObject } from 'react'
import { to } from '@react-spring/web'
import { PropertyAccessor, usePropertyAccessor } from '@nivo/core'
import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { useTheme, BorderRadius, normalizeBorderRadius } from '@nivo/theming'
import {
    NodeWithRectAndColor,
    RectTransitionMode,
    RectNodeComponent,
    NodeInteractionHandlers,
    RectNodeHandle,
} from './types'
import { useRectsTransition } from './useRectsTransition'
import { RectNodeWrapper } from './RectNodeWrapper'

export interface RectNodesProps<Node extends NodeWithRectAndColor>
    extends NodeInteractionHandlers<Node> {
    nodes: readonly Node[]
    uid: PropertyAccessor<Node, string>
    borderRadius?: BorderRadius
    borderColor: InheritedColorConfig<Node>
    borderWidth?: number
    isInteractive: boolean
    transitionMode?: RectTransitionMode
    animateOnMount?: boolean
    component: RectNodeComponent<Node>
    isFocusable?: boolean
    getTestId?: (node: Node) => string
    nodeRefs?: MutableRefObject<Record<string, RefObject<RectNodeHandle>>>
}

export const RectNodes = <Node extends NodeWithRectAndColor>({
    nodes,
    uid,
    component,
    borderRadius = 0,
    borderWidth = 0,
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
    transitionMode = 'flow-down',
    animateOnMount = false,
    getTestId,
    nodeRefs,
}: RectNodesProps<Node>) => {
    const getUid = usePropertyAccessor(uid)
    const theme = useTheme()
    const getBorderColor = useInheritedColor<Node>(borderColor, theme)

    const extractColors = useCallback(
        (node: Node) => ({
            color: node.color,
            borderColor: getBorderColor(node),
        }),
        [getBorderColor]
    )

    const transition = useRectsTransition<
        Node,
        {
            color: string
            borderColor: string
        }
    >(nodes, getUid, transitionMode, animateOnMount, {
        enter: extractColors,
        update: extractColors,
        leave: extractColors,
    })

    return (
        <>
            {transition((transitionProps, node) => (
                <RectNodeWrapper<Node>
                    ref={nodeRefs?.current[getUid(node)]}
                    key={node.id}
                    node={node}
                    style={{
                        ...transitionProps,
                        width: transitionProps.width.to(v => Math.max(v, 0)),
                        height: transitionProps.height.to(v => Math.max(v, 0)),
                        transform: to(
                            [transitionProps.x, transitionProps.y],
                            (x, y) => `translate(${x},${y})`
                        ),
                        opacity: transitionProps.progress,
                        borderRadius: normalizeBorderRadius(borderRadius),
                        borderWidth,
                    }}
                    isInteractive={isInteractive}
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    onContextMenu={onContextMenu}
                    onWheel={onWheel}
                    testId={getTestId?.(node)}
                    nodeComponent={component}
                />
            ))}
        </>
    )
}
