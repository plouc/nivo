import { AnimatedProps } from '@react-spring/web'
import { ValueFormat } from '@nivo/core'
import { FunctionComponent } from 'react'

export type RadialAxisTickAnimatedProps = {
    y: number
    textX: number
    rotation: number
    length: number
    opacity: number
}

export interface RadialAxisTickProps {
    label: string
    y: number
    rotation: number
    textX: number
    length: number
    textAnchor: 'start' | 'end'
    animated: AnimatedProps<RadialAxisTickAnimatedProps>
}
export type RadialAxisTickComponent = FunctionComponent<RadialAxisTickProps>

export interface RadialAxisConfig {
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    format?: ValueFormat<string | number | Date>
    tickComponent?: RadialAxisTickComponent
    ariaHidden?: boolean
}
