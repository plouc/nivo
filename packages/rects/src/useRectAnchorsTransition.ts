import { useMemo } from 'react'
import { useMotionConfig } from '@nivo/core'
import { TransitionFn, useTransition } from '@react-spring/web'
import { RectTransitionMode, Anchor, AnchorWithRect } from './types'

export interface RectAnchorTransitionModeConfig {
    enter: (anchor: AnchorWithRect) => Anchor
    update: (anchor: AnchorWithRect) => Anchor
    leave: (anchor: AnchorWithRect) => Anchor
}

const transitionDefault = (anchor: AnchorWithRect): Anchor => ({
    x: anchor.x,
    y: anchor.y,
})

export const rectAnchorTransitionModeById: Record<
    RectTransitionMode,
    RectAnchorTransitionModeConfig
> = {
    'reveal-up': {
        enter: (anchor: AnchorWithRect) => ({
            x: anchor.x,
            y: anchor.rect.y + anchor.rect.height,
        }),
        update: transitionDefault,
        leave: (anchor: AnchorWithRect) => ({
            x: anchor.x,
            y: anchor.rect.y,
        }),
    },
    'reveal-right': {
        enter: (anchor: AnchorWithRect) => ({
            x: anchor.rect.x,
            y: anchor.y,
        }),
        update: transitionDefault,
        leave: (anchor: AnchorWithRect) => ({
            x: anchor.rect.x + anchor.rect.width,
            y: anchor.y,
        }),
    },
    'reveal-down': {
        enter: (anchor: AnchorWithRect) => ({
            x: anchor.x,
            y: anchor.rect.y,
        }),
        update: transitionDefault,
        leave: (anchor: AnchorWithRect) => ({
            x: anchor.x,
            y: anchor.rect.y + anchor.rect.height,
        }),
    },
    'reveal-left': {
        enter: (anchor: AnchorWithRect) => ({
            x: anchor.rect.x + anchor.rect.width,
            y: anchor.y,
        }),
        update: transitionDefault,
        leave: (anchor: AnchorWithRect) => ({
            x: anchor.rect.x,
            y: anchor.y,
        }),
    },
    center: {
        enter: transitionDefault,
        update: transitionDefault,
        leave: transitionDefault,
    },
    'flow-down': {
        enter: (anchor: AnchorWithRect) => ({
            x: anchor.x,
            y: anchor.y - anchor.rect.height,
        }),
        update: transitionDefault,
        leave: (anchor: AnchorWithRect) => ({
            x: anchor.x,
            y: anchor.y + anchor.rect.height,
        }),
    },
    'flow-right': {
        enter: (anchor: AnchorWithRect) => ({
            x: anchor.x - anchor.rect.width,
            y: anchor.y,
        }),
        update: transitionDefault,
        leave: (anchor: AnchorWithRect) => ({
            x: anchor.x + anchor.rect.width,
            y: anchor.y,
        }),
    },
    'flow-up': {
        enter: (anchor: AnchorWithRect) => ({
            x: anchor.x,
            y: anchor.y + anchor.rect.height,
        }),
        update: transitionDefault,
        leave: (anchor: AnchorWithRect) => ({
            x: anchor.x,
            y: anchor.y - anchor.rect.height,
        }),
    },
    'flow-left': {
        enter: (anchor: AnchorWithRect) => ({
            x: anchor.x + anchor.rect.width,
            y: anchor.y,
        }),
        update: transitionDefault,
        leave: (anchor: AnchorWithRect) => ({
            x: anchor.x - anchor.rect.width,
            y: anchor.y,
        }),
    },
}

// TransitionExtra is used to add extra animated properties to the anchors,
// for example, you could use it to animate a color.
export interface ReactAnchorTransitionExtra<
    Node extends AnchorWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
> {
    enter: (node: Node) => ExtraProps
    update: (node: Node) => ExtraProps
    leave: (node: Node) => ExtraProps
}

export type RectAnchorTransitionProps<
    ExtraProps extends Record<string, any> = Record<string, never>,
> = Anchor & {
    progress: number
} & ExtraProps

export const useRectAnchorTransitionMode = <
    Node extends AnchorWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
>(
    mode: RectTransitionMode,
    extraTransition?: ReactAnchorTransitionExtra<Node, ExtraProps>
) =>
    useMemo(() => {
        const transitionMode = rectAnchorTransitionModeById[mode]

        return {
            enter: (node: Node) =>
                ({
                    progress: 0,
                    ...transitionMode.enter(node),
                    ...(extraTransition ? extraTransition.enter(node) : {}),
                }) as RectAnchorTransitionProps<ExtraProps>,
            update: (node: Node) =>
                ({
                    progress: 1,
                    ...transitionMode.update(node),
                    ...(extraTransition ? extraTransition.update(node) : {}),
                }) as RectAnchorTransitionProps<ExtraProps>,
            leave: (node: Node) =>
                ({
                    progress: 0,
                    ...transitionMode.leave(node),
                    ...(extraTransition ? extraTransition.leave(node) : {}),
                }) as RectAnchorTransitionProps<ExtraProps>,
        }
    }, [mode, extraTransition])

const getId = (anchor: AnchorWithRect) => anchor.id

export const useRectAnchorsTransition = <
    Node extends AnchorWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
>(
    nodes: Node[],
    mode: RectTransitionMode = 'flow-down',
    extra?: ReactAnchorTransitionExtra<Node, ExtraProps>
) => {
    const { animate, config: springConfig } = useMotionConfig()

    const phases = useRectAnchorTransitionMode<Node, ExtraProps>(mode, extra)

    return useTransition<Node, RectAnchorTransitionProps<ExtraProps>>(nodes, {
        keys: getId,
        initial: phases.update,
        from: phases.enter,
        enter: phases.update,
        update: phases.update,
        leave: phases.leave,
        config: springConfig,
        immediate: !animate,
    }) as unknown as TransitionFn<Node, RectAnchorTransitionProps<ExtraProps>>
}
