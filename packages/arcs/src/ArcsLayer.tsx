import { createElement, AriaAttributes } from 'react'
import { useTheme } from '@nivo/theming'
import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { DatumWithArcAndColor, ArcGenerator } from './types'
import { useArcsTransition } from './useArcsTransition'
import { ArcTransitionMode } from './arcTransitionMode'
import { ArcMouseHandler, ArcShape, ArcShapeProps } from './ArcShape'

export type ArcComponent<Datum extends DatumWithArcAndColor> = (
    props: ArcShapeProps<Datum>
) => JSX.Element

interface ArcsLayerProps<Datum extends DatumWithArcAndColor> {
    center: [number, number]
    data: Datum[]
    arcGenerator: ArcGenerator
    borderWidth: number
    borderColor: InheritedColorConfig<Datum>
    ariaLabel?: (datum: Datum) => AriaAttributes['aria-label']
    ariaLabelledBy?: (datum: Datum) => AriaAttributes['aria-labelledby']
    ariaDescribedBy?: (datum: Datum) => AriaAttributes['aria-describedby']
    ariaHidden?: (datum: Datum) => AriaAttributes['aria-hidden']
    ariaDisabled?: (datum: Datum) => AriaAttributes['aria-disabled']
    onClick?: ArcMouseHandler<Datum>
    onMouseEnter?: ArcMouseHandler<Datum>
    onMouseMove?: ArcMouseHandler<Datum>
    onMouseLeave?: ArcMouseHandler<Datum>
    transitionMode: ArcTransitionMode
    component?: ArcComponent<Datum>
}

export const ArcsLayer = <Datum extends DatumWithArcAndColor>({
    center,
    data,
    arcGenerator,
    borderWidth,
    borderColor,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaHidden,
    ariaDisabled,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    transitionMode,
    component = ArcShape,
}: ArcsLayerProps<Datum>) => {
    const theme = useTheme()
    const getBorderColor = useInheritedColor<Datum>(borderColor, theme)

    const { transition, interpolate } = useArcsTransition<
        Datum,
        {
            opacity: number
            color: string
            borderColor: string
        }
    >(data, transitionMode, {
        enter: datum => ({
            opacity: 0,
            color: datum.color,
            borderColor: getBorderColor(datum),
        }),
        update: datum => ({
            opacity: 1,
            color: datum.color,
            borderColor: getBorderColor(datum),
        }),
        leave: datum => ({
            opacity: 0,
            color: datum.color,
            borderColor: getBorderColor(datum),
        }),
    })

    const Arc: ArcComponent<Datum> = component

    return (
        <g transform={`translate(${center[0]},${center[1]})`}>
            {transition((transitionProps, datum) => {
                return createElement(Arc, {
                    key: datum.id,
                    datum,
                    style: {
                        ...transitionProps,
                        borderWidth,
                        path: interpolate(
                            transitionProps.startAngle,
                            transitionProps.endAngle,
                            transitionProps.innerRadius,
                            transitionProps.outerRadius,
                            arcGenerator
                        ),
                    },
                    ariaLabel: ariaLabel ? ariaLabel(datum) : undefined,
                    ariaLabelledBy: ariaLabelledBy ? ariaLabelledBy(datum) : undefined,
                    ariaDescribedBy: ariaDescribedBy ? ariaDescribedBy(datum) : undefined,
                    ariaHidden: ariaHidden ? ariaHidden(datum) : undefined,
                    ariaDisabled: ariaDisabled ? ariaDisabled(datum) : undefined,
                    onClick,
                    onMouseEnter,
                    onMouseMove,
                    onMouseLeave,
                })
            })}
        </g>
    )
}
