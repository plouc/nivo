import { memo } from 'react'
import { SlicesItem } from './SlicesItem'
import { LineSeries, SliceData, CommonLineProps, LineSvgProps } from './types'

export const NonMemoizedSlices = <Series extends LineSeries>({
    slices,
    axis,
    debug,
    tooltip,
    current,
    setCurrent,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
}: {
    slices: readonly SliceData<Series>[]
    axis: Exclude<LineSvgProps<Series>['enableSlices'], undefined | false>
    debug: boolean
    tooltip: CommonLineProps<Series>['sliceTooltip']
    current: SliceData<Series> | null
    setCurrent: (slice: SliceData<Series> | null) => void
    onMouseEnter?: CommonLineProps<Series>['onMouseEnter']
    onMouseMove?: CommonLineProps<Series>['onMouseMove']
    onMouseLeave?: CommonLineProps<Series>['onMouseLeave']
    onMouseDown?: CommonLineProps<Series>['onMouseDown']
    onMouseUp?: CommonLineProps<Series>['onMouseUp']
    onClick?: CommonLineProps<Series>['onClick']
    onDoubleClick?: CommonLineProps<Series>['onDoubleClick']
    onTouchStart?: CommonLineProps<Series>['onTouchStart']
    onTouchMove?: CommonLineProps<Series>['onTouchMove']
    onTouchEnd?: CommonLineProps<Series>['onTouchEnd']
}) => {
    return (
        <>
            {slices.map(slice => (
                <SlicesItem<Series>
                    key={slice.id}
                    slice={slice}
                    slices={slices}
                    axis={axis}
                    debug={debug}
                    tooltip={tooltip}
                    setCurrent={setCurrent}
                    isCurrent={current !== null && current.id === slice.id}
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                />
            ))}
        </>
    )
}

export const Slices = memo(NonMemoizedSlices) as typeof NonMemoizedSlices
