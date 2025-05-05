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
    Datum extends AnchorWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
> {
    enter: (datum: Datum) => ExtraProps
    update: (datum: Datum) => ExtraProps
    leave: (datum: Datum) => ExtraProps
}

export type RectAnchorTransitionProps<
    ExtraProps extends Record<string, any> = Record<string, never>,
> = Anchor & {
    progress: number
} & ExtraProps

export const useRectAnchorTransitionMode = <
    Datum extends AnchorWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
>(
    mode: RectTransitionMode,
    extraTransition?: ReactAnchorTransitionExtra<Datum, ExtraProps>
) =>
    useMemo(() => {
        const transitionMode = rectAnchorTransitionModeById[mode]

        return {
            enter: (datum: Datum) =>
                ({
                    progress: 0,
                    ...transitionMode.enter(datum),
                    ...(extraTransition ? extraTransition.enter(datum) : {}),
                }) as RectAnchorTransitionProps<ExtraProps>,
            update: (datum: Datum) =>
                ({
                    progress: 1,
                    ...transitionMode.update(datum),
                    ...(extraTransition ? extraTransition.update(datum) : {}),
                }) as RectAnchorTransitionProps<ExtraProps>,
            leave: (datum: Datum) =>
                ({
                    progress: 0,
                    ...transitionMode.leave(datum),
                    ...(extraTransition ? extraTransition.leave(datum) : {}),
                }) as RectAnchorTransitionProps<ExtraProps>,
        }
    }, [mode, extraTransition])

const getId = (anchor: AnchorWithRect) => anchor.id

export const useRectAnchorsTransition = <
    Datum extends AnchorWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
>(
    data: Datum[],
    mode: RectTransitionMode = 'flow-down',
    extra?: ReactAnchorTransitionExtra<Datum, ExtraProps>
) => {
    const { animate, config: springConfig } = useMotionConfig()

    const phases = useRectAnchorTransitionMode<Datum, ExtraProps>(mode, extra)

    return useTransition<Datum, RectAnchorTransitionProps<ExtraProps>>(data, {
        keys: getId,
        initial: phases.update,
        from: phases.enter,
        enter: phases.update,
        update: phases.update,
        leave: phases.leave,
        config: springConfig,
        immediate: !animate,
    }) as unknown as TransitionFn<Datum, RectAnchorTransitionProps<ExtraProps>>
}
