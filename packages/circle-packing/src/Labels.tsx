import React from 'react'
import { useTransition } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { CirclePackingCommonProps, ComputedDatum, LabelComponent, ComputedLabel } from './types'
import { useCirclePackingLabels } from './hooks'
import { interpolateRadius } from './Circles'

interface CirclesProps<RawDatum> {
    nodes: ComputedDatum<RawDatum>[]
    label: CirclePackingCommonProps<RawDatum>['label']
    filter?: CirclePackingCommonProps<RawDatum>['labelsFilter']
    skipRadius: CirclePackingCommonProps<RawDatum>['labelsSkipRadius']
    textColor: CirclePackingCommonProps<RawDatum>['labelsTextColor']
    component: LabelComponent<RawDatum>
}

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

    const enter = (label: ComputedLabel<RawDatum>) => ({
        x: label.node.x,
        y: label.node.y,
        radius: label.node.radius,
        textColor: label.textColor,
        opacity: 0,
    })

    const update = (label: ComputedLabel<RawDatum>) => ({
        x: label.node.x,
        y: label.node.y,
        radius: label.node.radius,
        textColor: label.textColor,
        opacity: 1,
    })

    const leave = (label: ComputedLabel<RawDatum>) => ({
        x: label.node.x,
        y: label.node.y,
        radius: label.node.radius,
        textColor: label.textColor,
        opacity: 0,
    })

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
        key: label => label.node.id,
        initial: update,
        from: enter,
        enter: update,
        update,
        leave,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((transitionProps, label) => {
                return React.createElement(component, {
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
