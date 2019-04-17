/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { Theme, CssMixBlendMode } from '@nivo/core'
import { OrdinalColorsInstruction } from '@nivo/colors'
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

    export type SankeySortFunction = (nodeA: SankeyDataNode, nodeB: SankeyDataNode) => number

    export type SankeyProps = Partial<{
        align: 'center' | 'justify' | 'start' | 'end'
        sort: 'auto' | 'input' | 'ascending' | 'descending' | SankeySortFunction

        nodeOpacity: number
        nodeHoverOpacity: number
        nodeHoverOthersOpacity: number
        nodeThickness: number
        nodeSpacing: number
        nodeInnerPadding: number
        nodeBorderWidth: number
        nodeBorderColor: any

        linkOpacity: number
        linkHoverOpacity: number
        linkHoverOthersOpacity: number
        linkContract: number
        linkBlendMode: CssMixBlendMode
        enableLinkGradient: boolean

        enableLabels: boolean
        label: any
        labelPosition: 'inside' | 'outside'
        labelPadding: number
        labelOrientation: 'horizontal' | 'vertical'
        labelTextColor: any
        labelFormat: any

        isInteractive: boolean
        onClick: any
        tooltipFormat: any
        nodeTooltip: any
        linkTooltip: any

        colors: OrdinalColorsInstruction
        theme: Theme

        legends: LegendProps[]
    }>

    interface Dimensions {
        height: number
        width: number
    }
}
