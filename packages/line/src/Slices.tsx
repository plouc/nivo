import { memo } from 'react'
import { LineCommonProps, LineDatum, SliceDatum } from './types'
import { SlicesItem } from './SlicesItem'

const NonMemoizedSlices = <Datum extends LineDatum>({
    slices,
    axis,
    debug,
    tooltip,
    current,
    setCurrent,
}: {
    slices: SliceDatum<Datum>[]
    axis: Exclude<LineCommonProps<Datum>['enableSlices'], false>
    debug: boolean
    tooltip: LineCommonProps<Datum>['sliceTooltip']
    current: SliceDatum<Datum> | null
    setCurrent: (slice: SliceDatum<Datum> | null) => void
}) => (
    <>
        {slices.map(slice => (
            <SlicesItem<Datum>
                key={slice.id}
                slice={slice}
                axis={axis}
                debug={debug}
                tooltip={tooltip}
                setCurrent={setCurrent}
                isCurrent={current !== null && current.id === slice.id}
            />
        ))}
    </>
)

export const Slices = memo(NonMemoizedSlices) as typeof NonMemoizedSlices
