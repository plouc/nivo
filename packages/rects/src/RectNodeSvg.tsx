import { animated } from '@react-spring/web'
import { DatumWithRectAndColor, RectNodeProps } from './types'

export const RectNodeSvg = <Datum extends DatumWithRectAndColor>({
    datum,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onWheel,
    onContextMenu,
    testId,
}: RectNodeProps<Datum>) => (
    <animated.rect
        width={style.width}
        height={style.height}
        transform={style.transform}
        rx={style.borderRadius}
        ry={style.borderRadius}
        opacity={style.opacity}
        fill={datum.fill || style.color}
        stroke={style.borderColor}
        strokeWidth={style.borderWidth}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onWheel={onWheel}
        onContextMenu={onContextMenu}
        data-testid={testId}
    />
)
