/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { Theme, CssMixBlendMode, Box } from '@nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

declare module '@nivo/sankey' {
    export class Sankey extends React.Component<Data & SankeyProps & Dimensions> {}
    export class ResponsiveSankey extends React.Component<Data & SankeyProps> {}

    export interface SankeyDataNode {
        id: string | number
    }

    export interface SankeyDataLink {
        source: string | number
        target: string | number
    }

    export interface Data {
        data: {
            nodes: SankeyDataNode[]
            links: SankeyDataLink[]
        }
    }

    export interface SankeyLinkProps {
        source: {
            id?: string | number
            label: string | number
        }
        target: {
            id?: string | number
            label: string | number
        }
        thickness: number
        color: string
        value: number
    }

    export interface SankeyNodeProps {
        id: string | number
        x: number
        y: number
        width: number
        height: number
        label: string
        color: string
    }

    export interface SankeyLinkDatum {
        color: string
        index: number
        pos0: number
        pos1: number
        source: SankeyNodeDatum
        target: SankeyNodeDatum
        thickness: number
        value: number
    }

    export interface SankeyNodeDatum {
        color: string
        depth: number
        height: number
        id: string
        index: number
        label: string
        layer: number
        sourceLinks: SankeyLinkDatum[]
        targetLinks: SankeyLinkDatum[]
        value: number
        width: number
        x: number
        x0: number
        x1: number
        y: number
        y0: number
        y1: number
    }

    export type SankeyMouseHandler = (
        data: SankeyNodeDatum | SankeyLinkDatum,
        event: React.MouseEvent
    ) => void

    export type SankeySortFunction = (nodeA: SankeyDataNode, nodeB: SankeyDataNode) => number

    export type TooltipRenderer<T> = (data: T) => React.ReactNode

    export type TooltipFormat = (value: number) => React.ReactNode

    export type AccessorFunc = (datum: SankeyNodeDatum) => string

    export type LabelFormatter = (label: string | number) => string | number

    export type SankeyProps = Partial<{
        align: 'center' | 'justify' | 'start' | 'end'
        sort: 'auto' | 'input' | 'ascending' | 'descending' | SankeySortFunction

        margin: Box

        nodeOpacity: number
        nodeHoverOpacity: number
        nodeHoverOthersOpacity: number
        nodeThickness: number
        nodeSpacing: number
        nodeInnerPadding: number
        nodeBorderWidth: number
        nodeBorderColor: InheritedColorProp<SankeyNodeDatum>

        linkOpacity: number
        linkHoverOpacity: number
        linkHoverOthersOpacity: number
        linkContract: number
        linkBlendMode: CssMixBlendMode
        enableLinkGradient: boolean

        enableLabels: boolean
        label: string | AccessorFunc
        labelPosition: 'inside' | 'outside'
        labelPadding: number
        labelOrientation: 'horizontal' | 'vertical'
        labelTextColor: InheritedColorProp<SankeyNodeDatum>
        labelFormat: string | LabelFormatter

        isInteractive: boolean
        onClick: SankeyMouseHandler
        tooltipFormat: TooltipFormat
        nodeTooltip: TooltipRenderer<SankeyNodeProps>
        linkTooltip: TooltipRenderer<SankeyLinkProps>

        colors: OrdinalColorsInstruction
        theme: Theme

        legends: LegendProps[]
    }>

    interface Dimensions {
        height: number
        width: number
    }
}
