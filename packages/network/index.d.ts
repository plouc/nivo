/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { Dimensions, Box, Theme, MotionProps } from '@nivo/core'
import { InheritedColorProp } from '@nivo/colors'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

declare module '@nivo/network' {
    export interface InputNode {
        id: string
        [key: string]: any
    }

    export interface ComputedNode {
        id: string
        x: string
        y: string
        radius: string
        color: string
        [key: string]: any
    }

    export interface InputLink {
        source: string
        target: string
        [key: string]: any
    }

    export interface ComputedLink {
        id: string
        source: ComputedNode
        target: ComputedNode
        [key: string]: any
    }

    export type LayerType = 'links' | 'nodes'
    export interface CustomLayerProps extends Omit<NetworkProps, 'nodes' | 'links'> {
        nodes: ComputedNode[]
        links: ComputedLink[]
    }
    export type CustomLayer = (props: CustomLayerProps) => React.ReactNode
    export type Layer = LayerType | CustomLayer

    type NodeAccessor<N, T> = (node: N) => T
    type LinkAccessor<L, T> = (link: L) => T

    export interface NetworkProps {
        nodes: InputNode[]
        links: InputLink[]

        margin?: Box

        linkDistance?: number | LinkAccessor<InputLink, number>
        repulsivity?: number
        distanceMin?: number
        distanceMax?: number
        iterations?: number

        layers?: Layer[]

        nodeColor: string | NodeAccessor<ComputedNode, string>
        nodeBorderWidth?: number
        nodeBorderColor?: InheritedColorProp<ComputedNode>

        linkThickness?: number | LinkAccessor<ComputedLink, number>
        linkColor?: InheritedColorProp<ComputedLink>

        theme?: Theme

        isInteractive?: boolean
    }

    export interface NetworkSvgProps extends NetworkProps, MotionProps {}

    export class Network extends React.Component<NetworkSvgProps & Dimensions> {}
    export class ResponsiveNetwork extends React.Component<NetworkSvgProps> {}

    export interface NetworkCanvasProps extends NetworkProps {
        pixelRatio?: number
    }

    export class NetworkCanvas extends React.Component<NetworkCanvasProps & Dimensions> {}
    export class ResponsiveNetworkCanvas extends React.Component<NetworkCanvasProps> {}
}
