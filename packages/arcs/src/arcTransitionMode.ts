import { Arc, DatumWithArc } from './types'
import { useMemo } from 'react'

export interface ArcTransitionModeConfig {
    enter: (arc: Arc) => Arc
    update: (arc: Arc) => Arc
    leave: (arc: Arc) => Arc
}

export const arcTransitionModes = [
    'startAngle',
    'middleAngle',
    'endAngle',
    'innerRadius',
    'centerRadius',
    'outerRadius',
    'pushIn',
    'pushOut',
] as const
export type ArcTransitionMode = typeof arcTransitionModes[number]

export const arcTransitionModeById: Record<ArcTransitionMode, ArcTransitionModeConfig> = {
    startAngle: {
        enter: (arc: Arc) => ({
            ...arc,
            endAngle: arc.startAngle,
        }),
        update: (arc: Arc) => arc,
        leave: (arc: Arc) => ({
            ...arc,
            startAngle: arc.endAngle,
        }),
    },
    middleAngle: {
        enter: (arc: Arc) => {
            const middleAngle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2

            return {
                ...arc,
                startAngle: middleAngle,
                endAngle: middleAngle,
            }
        },
        update: (arc: Arc) => arc,
        leave: (arc: Arc) => {
            const middleAngle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2

            return {
                ...arc,
                startAngle: middleAngle,
                endAngle: middleAngle,
            }
        },
    },
    endAngle: {
        enter: (arc: Arc) => ({
            ...arc,
            startAngle: arc.endAngle,
        }),
        update: (arc: Arc) => arc,
        leave: (arc: Arc) => ({
            ...arc,
            endAngle: arc.startAngle,
        }),
    },
    innerRadius: {
        enter: (arc: Arc) => ({
            ...arc,
            outerRadius: arc.innerRadius,
        }),
        update: (arc: Arc) => arc,
        leave: (arc: Arc) => ({
            ...arc,
            innerRadius: arc.outerRadius,
        }),
    },
    centerRadius: {
        enter: (arc: Arc) => {
            const centerRadius = arc.innerRadius + (arc.outerRadius - arc.innerRadius) / 2

            return {
                ...arc,
                innerRadius: centerRadius,
                outerRadius: centerRadius,
            }
        },
        update: (arc: Arc) => arc,
        leave: (arc: Arc) => {
            const centerRadius = arc.innerRadius + (arc.outerRadius - arc.innerRadius) / 2

            return {
                ...arc,
                innerRadius: centerRadius,
                outerRadius: centerRadius,
            }
        },
    },
    outerRadius: {
        enter: (arc: Arc) => ({
            ...arc,
            innerRadius: arc.outerRadius,
        }),
        update: (arc: Arc) => arc,
        leave: (arc: Arc) => ({
            ...arc,
            outerRadius: arc.innerRadius,
        }),
    },
    pushIn: {
        enter: (arc: Arc) => ({
            ...arc,
            innerRadius: arc.innerRadius - arc.outerRadius + arc.innerRadius,
            outerRadius: arc.innerRadius,
        }),
        update: (arc: Arc) => arc,
        leave: (arc: Arc) => ({
            ...arc,
            innerRadius: arc.outerRadius,
            outerRadius: arc.outerRadius + arc.outerRadius - arc.innerRadius,
        }),
    },
    pushOut: {
        enter: (arc: Arc) => ({
            ...arc,
            innerRadius: arc.outerRadius,
            outerRadius: arc.outerRadius + arc.outerRadius - arc.innerRadius,
        }),
        update: (arc: Arc) => arc,
        leave: (arc: Arc) => ({
            ...arc,
            innerRadius: arc.innerRadius - arc.outerRadius + arc.innerRadius,
            outerRadius: arc.innerRadius,
        }),
    },
}

export interface TransitionExtra<Datum extends DatumWithArc, ExtraProps> {
    enter: (datum: Datum) => ExtraProps
    update: (datum: Datum) => ExtraProps
    leave: (datum: Datum) => ExtraProps
}

export const useArcTransitionMode = <Datum extends DatumWithArc, ExtraProps>(
    mode: ArcTransitionMode,
    extraTransition?: TransitionExtra<Datum, ExtraProps>
) =>
    useMemo(() => {
        const transitionMode = arcTransitionModeById[mode]

        return {
            enter: (datum: Datum) => ({
                progress: 0,
                ...transitionMode.enter(datum.arc),
                ...(extraTransition ? extraTransition.enter(datum) : {}),
            }),
            update: (datum: Datum) => ({
                progress: 1,
                ...transitionMode.update(datum.arc),
                ...(extraTransition ? extraTransition.update(datum) : {}),
            }),
            leave: (datum: Datum) => ({
                progress: 0,
                ...transitionMode.leave(datum.arc),
                ...(extraTransition ? extraTransition.leave(datum) : {}),
            }),
        }
    }, [mode, extraTransition])
