import { animated } from '@react-spring/web'
import { WaffleGridCellProps } from './types'

export const WaffleGridCell = ({ style }: WaffleGridCellProps) => {
    return (
        <animated.circle
            cx={style.x}
            cy={style.y}
            r={style.radius}
            fill={style.color}
            opacity={style.opacity}
        />
    )
}
