import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import {
    CommonProps,
    ComputedLabel,
    ComputedNode,
    LabelAnimatedProps,
    LabelComponent,
    LabelsPosition,
    Layout,
} from './types'
import { useLabels } from './labelsHooks'

interface LabelsProps<Datum> {
    nodes: readonly ComputedNode<Datum>[]
    label: Exclude<CommonProps<Datum>['label'], undefined>
    layout: Layout
    labelsPosition: LabelsPosition
    orientLabel: boolean
    labelOffset: number
    labelComponent: LabelComponent<Datum>
}

const regularTransition = <Datum,>(label: ComputedLabel<Datum>): LabelAnimatedProps => ({
    x: label.x,
    y: label.y,
    rotation: label.rotation,
})
const leaveTransition = <Datum,>(label: ComputedLabel<Datum>): LabelAnimatedProps => ({
    x: label.x,
    y: label.y,
    rotation: label.rotation,
})

export const Labels = <Datum,>({
    nodes,
    label,
    layout,
    labelsPosition,
    orientLabel,
    labelOffset,
    labelComponent,
}: LabelsProps<Datum>) => {
    const labels = useLabels({ nodes, label, layout, labelsPosition, orientLabel, labelOffset })

    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<ComputedLabel<Datum>, LabelAnimatedProps>(labels, {
        keys: label => label.id,
        from: regularTransition,
        enter: regularTransition,
        update: regularTransition,
        leave: leaveTransition,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <g
            style={{
                pointerEvents: 'none',
            }}
        >
            {transition((animatedProps, label) =>
                createElement(labelComponent, {
                    label,
                    animatedProps,
                })
            )}
        </g>
    )
}
