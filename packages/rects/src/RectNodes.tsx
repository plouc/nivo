import { useCallback } from 'react'
import { to } from '@react-spring/web'
import { PropertyAccessor, usePropertyAccessor } from '@nivo/core'
import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { useTheme } from '@nivo/theming'
import {
    DatumWithRectAndColor,
    RectTransitionMode,
    RectNodeComponent,
    RectMouseHandler,
    RectWheelHandler,
} from './types'
import { useRectsTransition } from './useRectsTransition'
import { RectNodeWrapper } from './RectNodeWrapper'

export interface RectNodesProps<Datum extends DatumWithRectAndColor> {
    data: readonly Datum[]
    uid: PropertyAccessor<Datum, string>
    borderRadius: number
    borderColor: InheritedColorConfig<Datum>
    borderWidth: number
    isInteractive: boolean
    onMouseEnter?: RectMouseHandler<Datum>
    onMouseMove?: RectMouseHandler<Datum>
    onMouseLeave?: RectMouseHandler<Datum>
    onClick?: RectMouseHandler<Datum>
    onContextMenu?: RectMouseHandler<Datum>
    onWheel?: RectWheelHandler<Datum>
    transitionMode?: RectTransitionMode
    animateOnMount?: boolean
    component: RectNodeComponent<Datum>
    getTestId?: (datum: Datum) => string
}

export const RectNodes = <Datum extends DatumWithRectAndColor>({
    data,
    uid,
    component,
    borderRadius,
    borderWidth,
    borderColor,
    isInteractive,
    onMouseMove,
    onMouseLeave,
    onMouseEnter,
    onClick,
    onWheel,
    onContextMenu,
    transitionMode = 'flow-down',
    animateOnMount = false,
    getTestId,
}: RectNodesProps<Datum>) => {
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
    >(data, getUid, transitionMode, animateOnMount, {
        enter: extractColors,
        update: extractColors,
        leave: extractColors,
    })

    return (
        <>
            {transition((transitionProps, datum) => (
                <RectNodeWrapper<Datum>
                    key={datum.id}
                    datum={datum}
                    style={{
                        ...transitionProps,
                        width: transitionProps.width.to(v => Math.max(v, 0)),
                        height: transitionProps.height.to(v => Math.max(v, 0)),
                        transform: to(
                            [transitionProps.x, transitionProps.y],
                            (x, y) => `translate(${x},${y})`
                        ),
                        opacity: transitionProps.progress,
                        borderRadius,
                        borderWidth,
                    }}
                    isInteractive={isInteractive}
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onClick={onClick}
                    onContextMenu={onContextMenu}
                    onWheel={onWheel}
                    testId={getTestId?.(datum)}
                    nodeComponent={component}
                />
            ))}
        </>
    )
}
