import React from 'react'
import { BoxLegendSvg } from '@nivo/legends'
import { CompletePieSvgProps, ComputedDatum } from './types'

interface PieLegendsProps<R> {
    width: number
    height: number
    legends: CompletePieSvgProps<R>['legends']
    dataWithArc: ComputedDatum<R>[]
}

// prettier-ignore
const PieLegends = <R, >({ width, height, legends, dataWithArc }: PieLegendsProps<R>) => {
    return (
        <>
            {legends.map((legend, i) => (
                <BoxLegendSvg
                    key={i}
                    {...legend}
                    containerWidth={width}
                    containerHeight={height}
                    data={dataWithArc}
                />
            ))}
        </>
    )
}

export default PieLegends
