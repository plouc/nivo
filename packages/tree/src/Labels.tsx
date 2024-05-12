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
    NodesMap,
} from './types'
import { useLabels } from './labelsHooks'
import { getFirstRemainingAncestorOrSelf } from './hooks'

interface LabelsProps<Datum> {
    nodes: readonly ComputedNode<Datum>[]
    nodeById: NodesMap<Datum>
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
    opacity: 1,
})

const leaveTransition =
    <Datum,>(nodeByUid: NodesMap<Datum>) =>
    (label: ComputedLabel<Datum>): LabelAnimatedProps => {
        const ancestor = getFirstRemainingAncestorOrSelf(label.node, nodeByUid)

        return {
            x: ancestor.x,
            y: ancestor.y,
            rotation: label.rotation,
            opacity: 0,
        }
    }

export const Labels = <Datum,>({
    nodes,
    nodeById,
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
        leave: leaveTransition(nodeById),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <g
            style={{
                pointerEvents: 'none',
            }}
        >
            {transition((animatedProps, label) => {
                return createElement(labelComponent, {
                    label,
                    animatedProps,
                })
            })}
        </g>
    )
}
