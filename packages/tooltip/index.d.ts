/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
        theme: Pick<Theme, 'tooltip'>
    }

    export class BasicTooltip extends React.Component<BasicTooltipProps> {}

    export interface TableTooltipProps {
        title?: React.ReactNode
        rows: React.ReactNode[][]
        theme: Pick<Theme, 'tooltip'>
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
}
