import { createElement, FunctionComponent } from 'react'
import { to } from '@react-spring/web'
import { PropertyAccessor, usePropertyAccessor } from '@nivo/core'
import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { useTheme } from '@nivo/theming'
import { RectMouseHandler, RectShape, RectShapeProps, RectWheelHandler } from './RectShape'
import { DatumWithRectAndColor } from './types'
import { RectTransitionMode } from './rectTransitionMode'
import { useRectsTransition } from './useRectsTransition'

export type RectComponent<Datum extends DatumWithRectAndColor> = FunctionComponent<
    RectShapeProps<Datum>
>

export interface RectsLayerProps<Datum extends DatumWithRectAndColor> {
    data: Datum[]
    uid: PropertyAccessor<Datum, string>
    borderRadius: number
    borderColor: InheritedColorConfig<Datum>
    borderWidth: number
    onClick?: RectMouseHandler<Datum>
    onMouseEnter?: RectMouseHandler<Datum>
    onMouseLeave?: RectMouseHandler<Datum>
    onMouseMove?: RectMouseHandler<Datum>
    onWheel?: RectWheelHandler<Datum>
    onContextMenu?: RectMouseHandler<Datum>
    transitionMode?: RectTransitionMode
    component?: RectComponent<Datum>
    getRectTestId?: (datum: Datum) => string
}

export const RectsLayer = <Datum extends DatumWithRectAndColor>({
    data,
    uid,
    borderRadius,
    borderWidth,
    borderColor,
    onMouseMove,
    onMouseLeave,
    onMouseEnter,
    onClick,
    onWheel,
    onContextMenu,
    transitionMode = 'flow-down',
    component = RectShape,
    getRectTestId,
}: RectsLayerProps<Datum>) => {
    const theme = useTheme()
    const getBorderColor = useInheritedColor<Datum>(borderColor, theme)
    const getUid = usePropertyAccessor(uid)

    const { transition } = useRectsTransition<
        Datum,
        {
            color: string
            borderColor: string
        }
    >(data, getUid, transitionMode, {
        enter: datum => ({
            color: datum.color,
            borderColor: getBorderColor(datum),
        }),
        update: datum => ({
            color: datum.color,
            borderColor: getBorderColor(datum),
        }),
        leave: datum => ({
            color: datum.color,
            borderColor: getBorderColor(datum),
        }),
    })

    const Rect: RectComponent<Datum> = component

    return (
        <g>
            {transition((transitionProps, datum) => {
                return createElement(Rect, {
                    key: datum.id,
                    datum,
                    style: {
                        ...transitionProps,
                        transform: to(
                            [transitionProps.x, transitionProps.y],
                            (x, y) => `translate(${x},${y})`
                        ),
                        borderRadius,
                        borderWidth,
                    },
                    onClick,
                    onMouseEnter,
                    onMouseMove,
                    onMouseLeave,
                    onWheel,
                    onContextMenu,
                    getTestId: getRectTestId,
                })
            })}
        </g>
    )
}
