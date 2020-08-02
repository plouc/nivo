import * as React from 'react'
import { Dimensions, Box, ColorProps, MotionProps } from '@nivo/core'

declare module '@nivo/sunburst' {
    export interface SunburstDataNode {
        // optional because it works without a color
        // however it does throw a warning if no value is set and the value is requested
        color?: string
        // optional because it could have a different name given by the 'identity' property
        id?: string
    }

    export interface SunburstDataParentNode extends SunburstDataNode {
        children: SunburstDataNode[]
    }

    export interface SunburstDataLeafNode extends SunburstDataNode {
        // optional because it could have a different name given by the 'value' property
        value?: number
    }

    export interface SunburstData {
        data: SunburstDataParentNode
    }

    export type SunburstProps = SunburstData &
        Partial<{
            identity: string | ((node: SunburstDataNode) => string)
            value: string | ((node: SunburstDataNode) => string)
            childColor: string | ((node: SunburstDataNode) => string)

            borderWidth: number
            borderColor: string
            cornerRadius: number
            margin: Box

            isInteractive: boolean
        }> &
        ColorProps<SunburstDataNode> &
        MotionProps

    export class Sunburst extends React.Component<Dimensions & SunburstProps> {}
    export class ResponsiveSunburst extends React.Component<SunburstProps> {}
}
