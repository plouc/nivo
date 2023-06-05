import { BulletRectsItemProps } from './types'
import { animated, to } from '@react-spring/web'

export const BulletRectsItem = ({
    animatedProps: { x, y, width, height, color },
    borderColor,
    borderWidth,
    data,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}: BulletRectsItemProps) => {
    return (
        <animated.rect
            x={x}
            y={y}
            width={to(width, value => Math.max(value, 0))}
            height={to(height, value => Math.max(value, 0))}
            fill={color}
            strokeWidth={borderWidth}
            stroke={borderColor}
            onMouseMove={event => onMouseMove(data, event)}
            onMouseEnter={event => onMouseEnter(data, event)}
            onMouseLeave={event => onMouseLeave(data, event)}
            onClick={event => onClick(data, event)}
        />
    )
}
