import { useMemo } from 'react'
import { useMotionConfig } from '@nivo/core'
import { TransitionFn, useTransition } from '@react-spring/web'
import { Rect, NodeWithRect, RectTransitionMode } from './types'

export interface RectTransitionModeConfig {
    enter: (rect: Rect) => Rect
    update: (rect: Rect) => Rect
    leave: (rect: Rect) => Rect
}

const transitionDefault = (rect: Rect) => rect

export const rectTransitionModeById: Record<RectTransitionMode, RectTransitionModeConfig> = {
    'reveal-up': {
        enter: (rect: Rect) => ({
            ...rect,
            y: rect.y + rect.height,
            height: 0,
        }),
        update: transitionDefault,
        leave: (rect: Rect) => ({
            ...rect,
            height: 0,
        }),
    },
    'reveal-right': {
        enter: (rect: Rect) => ({
            ...rect,
            width: 0,
        }),
        update: transitionDefault,
        leave: (rect: Rect) => ({
            ...rect,
            x: rect.x + rect.width,
            width: 0,
        }),
    },
    'reveal-down': {
        enter: (rect: Rect) => ({
            ...rect,
            height: 0,
        }),
        update: transitionDefault,
        leave: (rect: Rect) => ({
            ...rect,
            y: rect.y + rect.height,
            height: 0,
        }),
    },
    'reveal-left': {
        enter: (rect: Rect) => ({
            ...rect,
            x: rect.x + rect.width,
            width: 0,
        }),
        update: transitionDefault,
        leave: (rect: Rect) => ({
            ...rect,
            width: 0,
        }),
    },
    center: {
        enter: (rect: Rect) => ({
            ...rect,
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
            width: 0,
            height: 0,
        }),
        update: transitionDefault,
        leave: (rect: Rect) => ({
            ...rect,
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
            width: 0,
            height: 0,
        }),
    },
    'flow-down': {
        enter: (rect: Rect) => ({
            ...rect,
            y: rect.y - rect.height,
        }),
        update: transitionDefault,
        leave: (rect: Rect) => ({
            ...rect,
            y: rect.y + rect.height,
        }),
    },
    'flow-right': {
        enter: (rect: Rect) => ({
            ...rect,
            x: rect.x - rect.width,
        }),
        update: transitionDefault,
        leave: (rect: Rect) => ({
            ...rect,
            x: rect.x + rect.width,
        }),
    },
    'flow-up': {
        enter: (rect: Rect) => ({
            ...rect,
            y: rect.y + rect.height,
        }),
        update: transitionDefault,
        leave: (rect: Rect) => ({
            ...rect,
            y: rect.y - rect.height,
        }),
    },
    'flow-left': {
        enter: (rect: Rect) => ({
            ...rect,
            x: rect.x + rect.width,
        }),
        update: transitionDefault,
        leave: (rect: Rect) => ({
            ...rect,
            x: rect.x - rect.width,
        }),
    },
}

// TransitionExtra is used to add extra animated properties to the rectangles,
// for example, you could use it to animate the color of the rect
export interface RectTransitionExtra<
    Node extends NodeWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
> {
    enter: (node: Node) => ExtraProps
    update: (node: Node) => ExtraProps
    leave: (node: Node) => ExtraProps
}

export type RectTransitionProps<ExtraProps extends Record<string, any> = Record<string, never>> =
    Rect & {
        progress: number
    } & ExtraProps

export const useRectTransitionMode = <
    Node extends NodeWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
>(
    mode: RectTransitionMode,
    extraTransition?: RectTransitionExtra<Node, ExtraProps>
) =>
    useMemo(() => {
        const transitionMode = rectTransitionModeById[mode]

        return {
            enter: (node: Node) =>
                ({
                    progress: 0,
                    ...transitionMode.enter(node.rect),
                    ...(extraTransition ? extraTransition.enter(node) : {}),
                }) as RectTransitionProps<ExtraProps>,
            update: (node: Node) =>
                ({
                    progress: 1,
                    ...transitionMode.update(node.rect),
                    ...(extraTransition ? extraTransition.update(node) : {}),
                }) as RectTransitionProps<ExtraProps>,
            leave: (node: Node) =>
                ({
                    progress: 0,
                    ...transitionMode.leave(node.rect),
                    ...(extraTransition ? extraTransition.leave(node) : {}),
                }) as RectTransitionProps<ExtraProps>,
        }
    }, [mode, extraTransition])

/**
 * This hook can be used to animate a group of rectangles.
 */
export const useRectsTransition = <
    Node extends NodeWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
>(
    nodes: readonly Node[],
    getUid: (node: Node) => string,
    mode: RectTransitionMode = 'flow-down',
    animateOnMount = false,
    extra?: RectTransitionExtra<Node, ExtraProps>
) => {
    const { animate, config: springConfig } = useMotionConfig()

    const phases = useRectTransitionMode<Node, ExtraProps>(mode, extra)

    return useTransition<Node, RectTransitionProps<ExtraProps>>(nodes, {
        keys: getUid,
        initial: animate && animateOnMount ? phases.enter : null,
        from: phases.enter,
        enter: phases.update,
        update: phases.update,
        leave: phases.leave,
        config: springConfig,
        immediate: !animate,
    }) as unknown as TransitionFn<Node, RectTransitionProps<ExtraProps>>
}
