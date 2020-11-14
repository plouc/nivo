import * as React from 'react'
import { Theme } from '@nivo/core'

declare module '@nivo/tooltip' {
    export interface BasicTooltipProps {
        id: React.ReactNode
        value?: string | number
        enableChip?: boolean
        color: string
        format?: (value: number | string) => number | string
        renderContent?: () => React.ReactNode
    }

    export class BasicTooltip extends React.Component<BasicTooltipProps> {}

    export interface ChipProps {
        color: string
        size?: number
        style?: Partial<React.CSSProperties>
    }

    export class Chip extends React.Component<ChipProps> {}

    export interface TableTooltipProps {
        title?: React.ReactNode
        rows: React.ReactNode[][]
        renderContent?: () => React.ReactNode
    }

    export class TableTooltip extends React.Component<TableTooltipProps> {}

    export type CrosshairType =
        | 'x'
        | 'y'
        | 'top-left'
        | 'top'
        | 'top-right'
        | 'right'
        | 'bottom-right'
        | 'bottom'
        | 'bottom-left'
        | 'left'
        | 'cross'

    export type TooltipAnchor = 'top' | 'right' | 'bottom' | 'left' | 'center'

    export function useTooltip(): {
        showTooltipAt: (
            content: JSX.Element,
            position: [number, number],
            anchor?: TooltipAnchor
        ) => void
        showTooltipFromEvent: <Event>(content: JSX.Element, event: Event) => void
        hideTooltip: () => void
    }
}
