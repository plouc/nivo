import React from 'react'
import { BoxLegendSvg } from '@nivo/legends'
import { CompletePieSvgProps, ComputedDatum } from './types'

interface PieLegendsProps<RawDatum> {
    width: number
    height: number
    legends: CompletePieSvgProps<RawDatum>['legends']
    dataWithArc: ComputedDatum<RawDatum>[]
}

const PieLegends = <RawDatum,>({
    width,
    height,
    legends,
    dataWithArc,
}: PieLegendsProps<RawDatum>) => {
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
