import { createElement } from 'react'
import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { useTheme } from '@nivo/theming'
import { RectMouseHandler, RectShape, RectShapeProps, RectWheelHandler } from './RectShape'
import { DatumWithRectAndColor } from './types'
import { RectTransitionMode } from './rectTransitionMode'
import { useRectsTransition } from './useRectsTransition'

export type RectComponent<Datum extends DatumWithRectAndColor> = (
    props: RectShapeProps<Datum>
) => JSX.Element

export interface RectsLayerProps<Datum extends DatumWithRectAndColor> {
    data: Datum[]
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
}

export const RectsLayer = <Datum extends DatumWithRectAndColor>({
    data,
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
}: RectsLayerProps<Datum>) => {
    const theme = useTheme()
    const getBorderColor = useInheritedColor<Datum>(borderColor, theme)

    const { transition } = useRectsTransition<
        Datum,
        {
            color: string
            borderColor: string
        }
    >(data, transitionMode, {
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
                        borderWidth,
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
