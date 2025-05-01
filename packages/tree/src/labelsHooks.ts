import { useMemo } from 'react'
import { usePropertyAccessor } from '@nivo/core'
import {
    CommonProps,
    Layout,
    ComputedNode,
    ComputedLabel,
    LabelsPosition,
    LabelTextAnchor,
    LabelBaseline,
} from './types'

interface LabelPositionResult {
    x: number
    y: number
    rotation: number
    textAnchor: LabelTextAnchor
    baseline: LabelBaseline
}

type GetLabelPosition<Datum> = (node: ComputedNode<Datum>) => LabelPositionResult

interface LabelPositionFactoryProps {
    orient: boolean
    offset: number
}

const horizontalLabelBefore = (x: number, y: number, offset: number): LabelPositionResult => ({
    x: x - offset,
    y: y,
    rotation: 0,
    textAnchor: 'end',
    baseline: 'middle',
})

const horizontalLabelAfter = (x: number, y: number, offset: number): LabelPositionResult => ({
    x: x + offset,
    y: y,
    rotation: 0,
    textAnchor: 'start',
    baseline: 'middle',
})

const verticalLabelBefore = (x: number, y: number, offset: number): LabelPositionResult => ({
    x: x,
    y: y - offset,
    rotation: 0,
    textAnchor: 'middle',
    baseline: 'auto',
})

const verticalLabelBeforeOriented = (
    x: number,
    y: number,
    offset: number
): LabelPositionResult => ({
    x: x,
    y: y - offset,
    rotation: -90,
    textAnchor: 'start',
    baseline: 'middle',
})

const verticalLabelAfter = (x: number, y: number, offset: number): LabelPositionResult => ({
    x: x,
    y: y + offset,
    rotation: 0,
    textAnchor: 'middle',
    baseline: 'hanging',
})

const verticalLabelAfterOriented = (x: number, y: number, offset: number): LabelPositionResult => ({
    x: x,
    y: y + offset,
    rotation: -90,
    textAnchor: 'end',
    baseline: 'middle',
})

const verticalLeavesBeforeOthersAfter =
    <Datum>({ orient, offset }: LabelPositionFactoryProps): GetLabelPosition<Datum> =>
    (node: ComputedNode<Datum>) => {
        const spacing = node.size / 2 + offset
        if (node.isLeaf) {
            if (orient) return verticalLabelBeforeOriented(node.x, node.y, spacing)
            else return verticalLabelBefore(node.x, node.y, spacing)
        } else {
            if (orient) return verticalLabelAfterOriented(node.x, node.y, spacing)
            else return verticalLabelAfter(node.x, node.y, spacing)
        }
    }

const verticalLeavesAfterOthersBefore =
    <Datum>({ orient, offset }: LabelPositionFactoryProps): GetLabelPosition<Datum> =>
    (node: ComputedNode<Datum>) => {
        const spacing = node.size / 2 + offset
        if (node.isLeaf) {
            if (orient) return verticalLabelAfterOriented(node.x, node.y, spacing)
            else return verticalLabelAfter(node.x, node.y, spacing)
        } else {
            if (orient) return verticalLabelBeforeOriented(node.x, node.y, spacing)
            else return verticalLabelBefore(node.x, node.y, spacing)
        }
    }

const verticalAllBefore =
    <Datum>({ orient, offset }: LabelPositionFactoryProps): GetLabelPosition<Datum> =>
    (node: ComputedNode<Datum>) => {
        const spacing = node.size / 2 + offset
        if (orient) return verticalLabelBeforeOriented(node.x, node.y, spacing)
        else return verticalLabelBefore(node.x, node.y, spacing)
    }

const verticalAllAfter =
    <Datum>({ orient, offset }: LabelPositionFactoryProps): GetLabelPosition<Datum> =>
    (node: ComputedNode<Datum>) => {
        const spacing = node.size / 2 + offset
        if (orient) return verticalLabelAfterOriented(node.x, node.y, spacing)
        else return verticalLabelAfter(node.x, node.y, spacing)
    }

const horizontalLeavesBeforeOthersAfter =
    <Datum>({ offset }: LabelPositionFactoryProps): GetLabelPosition<Datum> =>
    (node: ComputedNode<Datum>) => {
        const spacing = node.size / 2 + offset
        if (node.isLeaf) return horizontalLabelBefore(node.x, node.y, spacing)
        else return horizontalLabelAfter(node.x, node.y, spacing)
    }

const horizontalLeavesAfterOthersBefore =
    <Datum>({ offset }: LabelPositionFactoryProps): GetLabelPosition<Datum> =>
    (node: ComputedNode<Datum>) => {
        const spacing = node.size / 2 + offset
        if (node.isLeaf) return horizontalLabelAfter(node.x, node.y, spacing)
        return horizontalLabelBefore(node.x, node.y, spacing)
    }

const horizontalAllBefore =
    <Datum>({ offset }: LabelPositionFactoryProps): GetLabelPosition<Datum> =>
    (node: ComputedNode<Datum>) => {
        return horizontalLabelBefore(node.x, node.y, node.size / 2 + offset)
    }

const horizontalAllAfter =
    <Datum>({ offset }: LabelPositionFactoryProps): GetLabelPosition<Datum> =>
    (node: ComputedNode<Datum>) => {
        return horizontalLabelAfter(node.x, node.y, node.size / 2 + offset)
    }

const useGetLabelPosition = <Datum>({
    layout,
    labelsPosition,
    orientLabel,
    labelOffset,
}: {
    layout: Layout
    labelsPosition: LabelsPosition
    orientLabel: boolean
    labelOffset: number
}) =>
    useMemo(() => {
        const options: LabelPositionFactoryProps = {
            orient: orientLabel,
            offset: labelOffset,
        }

        if (layout === 'top-to-bottom') {
            if (labelsPosition === 'outward') {
                return verticalLeavesAfterOthersBefore<Datum>(options)
            } else if (labelsPosition === 'inward') {
                return verticalLeavesBeforeOthersAfter<Datum>(options)
            } else if (labelsPosition === 'layout') {
                return verticalAllAfter<Datum>(options)
            } else if (labelsPosition === 'layout-opposite') {
                return verticalAllBefore<Datum>(options)
            }
        }

        if (layout === 'bottom-to-top') {
            if (labelsPosition === 'outward') {
                return verticalLeavesBeforeOthersAfter<Datum>(options)
            } else if (labelsPosition === 'inward') {
                return verticalLeavesAfterOthersBefore<Datum>(options)
            } else if (labelsPosition === 'layout') {
                return verticalAllBefore<Datum>(options)
            } else if (labelsPosition === 'layout-opposite') {
                return verticalAllAfter<Datum>(options)
            }
        }

        if (layout === 'right-to-left') {
            if (labelsPosition === 'outward') {
                return horizontalLeavesBeforeOthersAfter<Datum>(options)
            } else if (labelsPosition === 'inward') {
                return horizontalLeavesAfterOthersBefore<Datum>(options)
            } else if (labelsPosition === 'layout') {
                return horizontalAllBefore<Datum>(options)
            } else if (labelsPosition === 'layout-opposite') {
                return horizontalAllAfter<Datum>(options)
            }
        }

        if (layout === 'left-to-right') {
            if (labelsPosition === 'outward') {
                return horizontalLeavesAfterOthersBefore<Datum>(options)
            } else if (labelsPosition === 'inward') {
                return horizontalLeavesBeforeOthersAfter<Datum>(options)
            } else if (labelsPosition === 'layout') {
                return horizontalAllAfter<Datum>(options)
            } else if (labelsPosition === 'layout-opposite') {
                return horizontalAllBefore<Datum>(options)
            }
        }
    }, [layout, labelsPosition, orientLabel, labelOffset])

export const useLabels = <Datum>({
    nodes,
    label,
    layout,
    labelsPosition,
    orientLabel,
    labelOffset,
}: {
    nodes: readonly ComputedNode<Datum>[]
    label: Exclude<CommonProps<Datum>['label'], undefined>
    layout: Layout
    labelsPosition: LabelsPosition
    orientLabel: boolean
    labelOffset: number
}) => {
    const getLabel = usePropertyAccessor(label)
    const getPosition = useGetLabelPosition<Datum>({
        layout,
        labelsPosition,
        orientLabel,
        labelOffset,
    })

    if (getPosition === undefined) {
        throw new Error('Unable to determine the logic to compute labels position')
    }

    return useMemo(
        () =>
            nodes.map(
                node =>
                    ({
                        id: node.uid,
                        node: node,
                        label: getLabel(node),
                        ...getPosition(node),
                    }) as ComputedLabel<Datum>
            ),
        [nodes, getLabel, getPosition]
    )
}
