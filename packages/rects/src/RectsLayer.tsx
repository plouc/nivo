import { createElement, FunctionComponent, useCallback } from 'react'
import { to } from '@react-spring/web'
import { PropertyAccessor, usePropertyAccessor } from '@nivo/core'
import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { useTheme } from '@nivo/theming'
import { RectMouseHandler, RectShape, RectShapeProps, RectWheelHandler } from './RectShape'
import { DatumWithRectAndColor, RectTransitionMode } from './types'
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
    getTestId?: (datum: Datum) => string
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
    getTestId,
}: RectsLayerProps<Datum>) => {
    const theme = useTheme()
    const getBorderColor = useInheritedColor<Datum>(borderColor, theme)
    const getUid = usePropertyAccessor(uid)

    const extractColors = useCallback(
        (datum: Datum) => ({
            color: datum.color,
            borderColor: getBorderColor(datum),
        }),
        [getBorderColor]
    )

    const transition = useRectsTransition<
        Datum,
        {
            color: string
            borderColor: string
        }
    >(data, getUid, transitionMode, {
        enter: extractColors,
        update: extractColors,
        leave: extractColors,
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
                    testId: getTestId?.(datum),
                })
            })}
        </g>
    )
}
