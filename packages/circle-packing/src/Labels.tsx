import { createElement, useMemo } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { CirclePackingCommonProps, ComputedDatum, LabelComponent, ComputedLabel } from './types'
import { useCirclePackingLabels } from './hooks'
import { interpolateRadius } from './Circles'

interface CirclesProps<RawDatum> {
    nodes: ComputedDatum<RawDatum>[]
    label: CirclePackingCommonProps<RawDatum>['label']
    filter?: CirclePackingCommonProps<RawDatum>['labelsFilter']
    skipRadius: CirclePackingCommonProps<RawDatum>['labelsSkipRadius']
    textColor: CirclePackingCommonProps<RawDatum>['labelTextColor']
    component: LabelComponent<RawDatum>
}

const getTransitionPhases = <RawDatum,>() => ({
    enter: (label: ComputedLabel<RawDatum>) => ({
        x: label.node.x,
        y: label.node.y,
        radius: label.node.radius,
        textColor: label.textColor,
        opacity: 0,
    }),
    update: (label: ComputedLabel<RawDatum>) => ({
        x: label.node.x,
        y: label.node.y,
        radius: label.node.radius,
        textColor: label.textColor,
        opacity: 1,
    }),
    leave: (label: ComputedLabel<RawDatum>) => ({
        x: label.node.x,
        y: label.node.y,
        radius: label.node.radius,
        textColor: label.textColor,
        opacity: 0,
    }),
})

export const Labels = <RawDatum,>({
    nodes,
    label,
    filter,
    skipRadius,
    textColor,
    component,
}: CirclesProps<RawDatum>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const labels = useCirclePackingLabels({
        nodes,
        label,
        filter,
        skipRadius,
        textColor,
    })

    const transitionPhases = useMemo(() => getTransitionPhases<RawDatum>(), [])

    const transition = useTransition<
        ComputedLabel<RawDatum>,
        {
            x: number
            y: number
            radius: number
            textColor: string
            opacity: number
        }
    >(labels, {
        keys: label => label.node.id,
        initial: transitionPhases.update,
        from: transitionPhases.enter,
        enter: transitionPhases.update,
        update: transitionPhases.update,
        leave: transitionPhases.leave,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((transitionProps, label) => {
                return createElement(component, {
                    key: label.node.id,
                    label: label.label,
                    style: {
                        ...transitionProps,
                        radius: interpolateRadius(transitionProps.radius),
                    },
                    node: label.node,
                })
            })}
        </>
    )
}
