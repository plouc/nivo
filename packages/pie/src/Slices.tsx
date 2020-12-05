import React from 'react'
import { animated } from 'react-spring'
import { ArcGenerator, useArcsTransition } from '@nivo/arcs'
import { ComputedDatum } from './types'

/*
    <g key="slices" transform={`translate(${centerX},${centerY})`}>
        {dataWithArc.map(datumWithArc => (
            <PieSlice<RawDatum>
                key={datumWithArc.id}
                datum={datumWithArc}
                arcGenerator={arcGenerator}
                borderWidth={borderWidth}
                borderColor={borderColor(datumWithArc)}
                tooltip={tooltip}
                isInteractive={isInteractive}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                setActiveId={setActiveId}
            />
        ))}
    </g>
)
*/

interface SlicesProps<RawDatum> {
    center: [number, number]
    data: ComputedDatum<RawDatum>[]
    arcGenerator: ArcGenerator
}

export const Slices = <RawDatum,>({ center, data, arcGenerator }: SlicesProps<RawDatum>) => {
    const { transition, interpolate } = useArcsTransition<ComputedDatum<RawDatum>>(data)

    return (
        <g transform={`translate(${center[0]},${center[1]})`}>
            {transition((transitionProps, datum) => {
                console.log(transitionProps, datum)
                return (
                    <animated.path
                        key={datum.id}
                        fill={datum.color}
                        d={interpolate(
                            transitionProps.startAngle,
                            transitionProps.endAngle,
                            transitionProps.innerRadius,
                            transitionProps.outerRadius,
                            arcGenerator
                        )}
                    />
                )
            })}
        </g>
    )
}
