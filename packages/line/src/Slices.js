import { memo } from 'react'
import SlicesItem from './SlicesItem'

const Slices = ({
    slices,
    axis,
    debug,
    height,
    tooltip,
    current,
    setCurrent,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
}) => {
    return slices.map(slice => (
        <SlicesItem
            key={slice.id}
            slice={slice}
            slices={slices}
            axis={axis}
            debug={debug}
            height={height}
            tooltip={tooltip}
            setCurrent={setCurrent}
            isCurrent={current !== null && current.id === slice.id}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        />
    ))
}

export default memo(Slices)
