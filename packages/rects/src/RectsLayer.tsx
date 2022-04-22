import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { useTheme } from '@nivo/core'
import { createElement } from 'react'
import { RectMouseHandler, RectShape, RectShapeProps, RectWheelHandler } from './RectShape'
import { DatumWithRectAndColor } from './types'
import { useRectsTransition } from './useRectsTransition'

export type RectComponent<TDatum extends DatumWithRectAndColor> = (
    props: RectShapeProps<TDatum>
) => JSX.Element

export interface RectsLayerProps<TDatum extends DatumWithRectAndColor> {
    borderColor: InheritedColorConfig<TDatum>
    borderWidth: number
    component?: RectComponent<TDatum>
    data: TDatum[]
    onClick?: RectMouseHandler<TDatum>
    onMouseEnter?: RectMouseHandler<TDatum>
    onMouseLeave?: RectMouseHandler<TDatum>
    onMouseMove?: RectMouseHandler<TDatum>
    onWheel?: RectWheelHandler<TDatum>
    onContextMenu?: RectMouseHandler<TDatum>
}

export const RectsLayer = <TDatum extends DatumWithRectAndColor>({
    onMouseMove,
    onMouseLeave,
    onMouseEnter,
    onClick,
    onWheel,
    onContextMenu,
    borderWidth,
    data,
    borderColor,
    component = RectShape,
}: RectsLayerProps<TDatum>) => {
    const theme = useTheme()
    const getBorderColor = useInheritedColor<TDatum>(borderColor, theme)

    const { transition, interpolate } = useRectsTransition<
        TDatum,
        {
            borderColor: string
            color: string
            opacity: number
        }
    >(data, {
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

    const Rect: RectComponent<TDatum> = component

    return (
        <g>
            {transition((transitionProps, datum) => {
                return createElement(Rect, {
                    key: datum.id,
                    datum,
                    style: {
                        ...transitionProps,
                        borderWidth,
                        transform: interpolate(
                            transitionProps.transformX,
                            transitionProps.transformY
                        ),
                        width: datum.rect.width,
                        height: datum.rect.height,
                    },
                    onClick,
                    onMouseEnter,
                    onMouseMove,
                    onMouseLeave,
                    onWheel,
                    onContextMenu,
                })
            })}
        </g>
    )
}
