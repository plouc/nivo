import React from 'react'
import { Interpolation } from 'react-spring'
import { useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { ArcGenerator, useArcsTransition } from '@nivo/arcs'
import { ComputedDatum, CompletePieSvgProps } from './types'
import { Slice } from './Slice'

interface SlicesProps<RawDatum> {
    center: [number, number]
    data: ComputedDatum<RawDatum>[]
    arcGenerator: ArcGenerator
    borderWidth: CompletePieSvgProps<RawDatum>['borderWidth']
    borderColor: CompletePieSvgProps<RawDatum>['borderColor']
    isInteractive: CompletePieSvgProps<RawDatum>['isInteractive']
    onClick?: CompletePieSvgProps<RawDatum>['onClick']
    onMouseEnter?: CompletePieSvgProps<RawDatum>['onMouseEnter']
    onMouseMove?: CompletePieSvgProps<RawDatum>['onMouseMove']
    onMouseLeave?: CompletePieSvgProps<RawDatum>['onMouseLeave']
    setActiveId: (id: null | string | number) => void
    tooltip: CompletePieSvgProps<RawDatum>['tooltip']
    transitionMode: CompletePieSvgProps<RawDatum>['transitionMode']
}

export const Slices = <RawDatum,>({
    center,
    data,
    arcGenerator,
    borderWidth,
    borderColor,
    isInteractive,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    setActiveId,
    tooltip,
    transitionMode,
}: SlicesProps<RawDatum>) => {
    const theme = useTheme()
    const getBorderColor = useInheritedColor<ComputedDatum<RawDatum>>(borderColor, theme)
    const { transition, interpolate } = useArcsTransition<
        ComputedDatum<RawDatum>,
        {
            color: string
        }
    >(data, transitionMode, {
        enter: datum => ({ color: datum.color }),
        update: datum => ({ color: datum.color }),
        leave: datum => ({ color: datum.color }),
    })

    return (
        <g transform={`translate(${center[0]},${center[1]})`}>
            {transition((transitionProps, datum) => {
                return (
                    <Slice<RawDatum>
                        key={datum.id}
                        datum={datum}
                        path={
                            interpolate(
                                transitionProps.startAngle,
                                transitionProps.endAngle,
                                transitionProps.innerRadius,
                                transitionProps.outerRadius,
                                arcGenerator
                            ) as Interpolation<string>
                        }
                        color={transitionProps.color}
                        opacity={transitionProps.progress}
                        borderWidth={borderWidth}
                        borderColor={getBorderColor(datum)}
                        isInteractive={isInteractive}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                        setActiveId={setActiveId}
                        tooltip={tooltip}
                    />
                )
            })}
        </g>
    )
}
