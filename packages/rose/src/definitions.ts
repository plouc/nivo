/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { Theme, MotionProps } from '@nivo/core'

export interface Arc {
    id: string
    value: number
    startAngle: number
    midAngle: number
    endAngle: number
    innerRadius: number
    outerRadius: number
    color: string
}

export interface InterpolatedArc {
    startAngle: number
    midAngle: number
    endAngle: number
    innerRadius: number
    outerRadius: number
}

type indexByFn<Datum> = (d: Datum) => string | number

export enum RoseLayerId {
    Arcs = 'arcs',
    ArcLabels = 'arcLabels',
}

export type RoseLayer = (props: any) => React.ReactNode

export interface RoseOuterProps<Datum> extends Partial<MotionProps> {
    width: number
    height: number
    margin: {
        top?: number
        right?: number
        bottom?: number
        left?: number
    }

    data: Datum[]
    indexBy: string | indexByFn<Datum>
    keys: Array<string | number>

    layers: Array<RoseLayerId | RoseLayer>

    innerRadius: number

    cornerRadius: number
    borderWidth: number

    enableArcLabel: boolean
    // renderArcLabel: PropTypes.func.isRequired
    rotateArcLabel: boolean

    isInteractive: boolean

    theme: Theme
}

export interface ArcGenerator {
    (arc: Arc): string
    centroid: (arc: Arc) => number[]
}

export interface RoseInnerProps {
    outerWidth: number
    outerHeight: number
    centerX: number
    centerY: number

    arcs: Arc[]
    arcGenerator: ArcGenerator
    radius: number
    radiusScale: (val: number) => number
    angleStep: number
    angleScale: (val: number) => number
}

export interface RoseProps<Datum> extends RoseOuterProps<Datum>, RoseInnerProps {
    margin: {
        top: number
        right: number
        bottom: number
        left: number
    }
    // onMouseEnter: PropTypes.func.isRequired,
    // onMouseMove: PropTypes.func.isRequired,
    // onMouseLeave: PropTypes.func.isRequired,
    // onClick: PropTypes.func.isRequired,

    /*
    maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,

    renderArc: PropTypes.func.isRequired,

    getColor: PropTypes.func.isRequired,

    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,

    pixelRatio: PropTypes.number.isRequired,
    */
}
