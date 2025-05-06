import { useMemo } from 'react'
import { useMotionConfig } from '@nivo/core'
import { TransitionFn, useTransition } from '@react-spring/web'
import { Rect, DatumWithRect, RectTransitionMode } from './types'

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
    Datum extends DatumWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
> {
    enter: (datum: Datum) => ExtraProps
    update: (datum: Datum) => ExtraProps
    leave: (datum: Datum) => ExtraProps
}

export type RectTransitionProps<ExtraProps extends Record<string, any> = Record<string, never>> =
    Rect & {
        progress: number
    } & ExtraProps

export const useRectTransitionMode = <
    Datum extends DatumWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
>(
    mode: RectTransitionMode,
    extraTransition?: RectTransitionExtra<Datum, ExtraProps>
) =>
    useMemo(() => {
        const transitionMode = rectTransitionModeById[mode]

        return {
            enter: (datum: Datum) =>
                ({
                    progress: 0,
                    ...transitionMode.enter(datum.rect),
                    ...(extraTransition ? extraTransition.enter(datum) : {}),
                }) as RectTransitionProps<ExtraProps>,
            update: (datum: Datum) =>
                ({
                    progress: 1,
                    ...transitionMode.update(datum.rect),
                    ...(extraTransition ? extraTransition.update(datum) : {}),
                }) as RectTransitionProps<ExtraProps>,
            leave: (datum: Datum) =>
                ({
                    progress: 0,
                    ...transitionMode.leave(datum.rect),
                    ...(extraTransition ? extraTransition.leave(datum) : {}),
                }) as RectTransitionProps<ExtraProps>,
        }
    }, [mode, extraTransition])

/**
 * This hook can be used to animate a group of rectangles.
 */
export const useRectsTransition = <
    Datum extends DatumWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
>(
    data: readonly Datum[],
    getUid: (datum: Datum) => string,
    mode: RectTransitionMode = 'flow-down',
    animateOnMount: boolean = false,
    extra?: RectTransitionExtra<Datum, ExtraProps>
) => {
    const { animate, config: springConfig } = useMotionConfig()

    const phases = useRectTransitionMode<Datum, ExtraProps>(mode, extra)

    return useTransition<Datum, RectTransitionProps<ExtraProps>>(data, {
        keys: getUid,
        initial: animate && animateOnMount ? phases.enter : null,
        from: phases.enter,
        enter: phases.update,
        update: phases.update,
        leave: phases.leave,
        config: springConfig,
        immediate: !animate,
    }) as unknown as TransitionFn<Datum, RectTransitionProps<ExtraProps>>
}
