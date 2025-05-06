import { PropsWithChildren } from 'react'
import { animated } from '@react-spring/web'
import { DatumWithRectAndColor, RectNodeProps } from './types'

export const RectNodeHtml = <Datum extends DatumWithRectAndColor>({
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onWheel,
    onContextMenu,
    testId,
    children,
}: PropsWithChildren<RectNodeProps<Datum>>) => {
    const { x, y, color, transform, progress, ...extraStyle } = style

    return (
        <animated.div
            style={{
                position: 'absolute',
                borderStyle: 'solid',
                boxSizing: 'border-box',
                left: x,
                top: y,
                backgroundColor: style.color,
                ...extraStyle,
            }}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onWheel={onWheel}
            onContextMenu={onContextMenu}
            data-testid={testId}
        >
            {children}
        </animated.div>
    )
}
