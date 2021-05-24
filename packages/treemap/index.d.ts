/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { Dimensions, Box, Theme, PropertyAccessor } from '@nivo/core'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'

declare module '@nivo/treemap' {
    export type TreeMapTile = 'binary' | 'squarify' | 'slice' | 'dice' | 'sliceDice' | 'resquarify'

    export interface TreeMapNodeDatum {
        id: string
        path: string
        pathComponents: string[]
        data: any
        x: number
        y: number
        width: number
        height: number
        value: number
        formattedValue: number | string
        treeDepth: number
        treeHeight: number
        isParent: boolean
        isLeaf: boolean
        label: string | number
        parentLabel: string | number
        color: string
        opacity: number
        borderColor: string
        labelTextColor: string
        labelRotation: number
        parentLabelTextColor: string
        parentLabelX: number
        parentLabelY: number
        parentLabelRotation: number
    }

    export type NodeEventHandler = (
        node: TreeMapNodeDatum,
        event: React.MouseEvent<HTMLElement>
    ) => void

    export interface TreeMapProps {
        data: any
        identity?: string
        value?: string
        valueFormat?: string
        margin?: Box
        tile?: TreeMapTile
        leavesOnly?: boolean
        innerPadding?: number
        outerPadding?: number
        theme?: Theme
        colors?: OrdinalColorScaleConfig
        colorBy?: string
        nodeOpacity?: number
        borderWidth?: number
        borderColor?: InheritedColorConfig<
            Omit<TreeMapNodeDatum, 'borderColor' | 'labelTextColor' | 'parentLabelTextColor'>
        >
        enableLabel?: boolean
        label?: PropertyAccessor<TreeMapNodeDatum, string>
        labelSkipSize?: number
        orientLabel?: boolean
        labelTextColor?: InheritedColorConfig<
            Omit<TreeMapNodeDatum, 'labelTextColor' | 'parentLabelTextColor'>
        >
        enableParentLabel?: boolean
        parentLabel?: string
        parentLabelSize?: number
        parentLabelPosition?: 'top' | 'right' | 'bottom' | 'left'
        parentLabelPadding?: number
        parentLabelTextColor?: InheritedColorConfig<Omit<TreeMapNodeDatum, 'parentLabelTextColor'>>
        isInteractive?: boolean
        animate?: boolean
    }

    export interface TreeMapSvgAndHtmlProps extends TreeMapProps {
        onMouseEnter?: NodeEventHandler
        onMouseMove?: NodeEventHandler
        onMouseLeave?: NodeEventHandler
        onClick?: NodeEventHandler
    }

    export interface TreeMapSvgProps extends TreeMapSvgAndHtmlProps {
        role?: string
    }

    export class TreeMap extends React.Component<TreeMapSvgProps & Dimensions> {}
    export class ResponsiveTreeMap extends React.Component<TreeMapSvgProps> {}

    export class TreeMapHtml extends React.Component<TreeMapSvgAndHtmlProps & Dimensions> {}
    export class ResponsiveTreeMapHtml extends React.Component<TreeMapSvgAndHtmlProps> {}

    export type CanvasNodeEventHandler = (
        node: TreeMapNodeDatum,
        event: React.MouseEvent<HTMLCanvasElement>
    ) => void

    export interface TreeMapCanvasProps extends TreeMapProps {
        onMouseMove?: CanvasNodeEventHandler
        onClick?: CanvasNodeEventHandler
        pixelRatio?: number
    }

    export class TreeMapCanvas extends React.Component<TreeMapCanvasProps & Dimensions> {}
    export class ResponsiveTreeMapCanvas extends React.Component<TreeMapCanvasProps> {}
}
