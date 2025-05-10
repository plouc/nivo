import { FunctionComponent } from 'react'
import { SpringValue } from '@react-spring/web'
import { PropertyAccessor, BoxAnchor } from '@nivo/core'
import { InheritedColorConfig } from '@nivo/colors'
import { TextAlign, TextBaseline } from '@nivo/theming'
import { NodeWithRect, AnchorWithRect, NodeWithRectAndColor } from '../types'

export interface RectLabelProps<Node extends NodeWithRectAndColor> extends RectComputedLabel<Node> {
    style: {
        x: SpringValue<number>
        y: SpringValue<number>
        rotation: SpringValue<number>
        progress: SpringValue<number>
        align: TextAlign
        baseline: TextBaseline
    }
    testId?: string
}

export type RectLabelComponent<Node extends NodeWithRectAndColor> = FunctionComponent<
    RectLabelProps<Node>
>

export interface RectLabelsProps<Node extends NodeWithRectAndColor> {
    uid: PropertyAccessor<Omit<Node, 'rect'>, string>
    label: PropertyAccessor<Omit<Node, 'rect'>, string>
    labelBoxAnchor: BoxAnchor
    labelPaddingX: number
    labelPaddingY: number
    labelAlign: TextAlign | 'auto'
    labelBaseline: TextBaseline | 'auto'
    labelRotation: number
    labelSkipWidth: number
    labelSkipHeight: number
    labelTextColor: InheritedColorConfig<Omit<Node, 'rect'>>
    labelComponent: RectLabelComponent<Node>
}

export interface RectComputedLabel<Node extends NodeWithRect> extends AnchorWithRect {
    node: Omit<Node, 'rect'>
    label: string
    color: string
    rotation: number
}
