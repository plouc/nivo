import { LineDatum, SliceDatum, SliceTooltipComponent } from './types'
import { SlicesItem } from './SlicesItem'
import { MouseEvent } from 'react'

interface SlicesProps<Datum extends LineDatum> {
    slices: readonly SliceDatum<Datum>[]
    axis: 'x' | 'y'
    debug: boolean
    height: number
    tooltip: SliceTooltipComponent<Datum>
    current: SliceDatum<Datum> | null
    setCurrent: (slice: SliceDatum<Datum> | null) => void
    onMouseEnter?: (slice: SliceDatum<Datum>, event: MouseEvent) => void
    onMouseMove?: (slice: SliceDatum<Datum>, event: MouseEvent) => void
    onMouseLeave?: (slice: SliceDatum<Datum>, event: MouseEvent) => void
    onClick?: (slice: SliceDatum<Datum>, event: MouseEvent) => void
}

export const Slices = <Datum extends LineDatum>({
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
}: SlicesProps<Datum>) => {
    return (
        <>
            {slices.map(slice => (
                <SlicesItem<Datum>
                    key={slice.id}
                    slice={slice}
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
                />
            ))}
        </>
    )
}
