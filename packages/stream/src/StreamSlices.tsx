import { StreamSliceData } from './types'
import { StreamSlicesItem } from './StreamSlicesItem'

interface StreamSlicesProps {
    slices: StreamSliceData[]
    height: number
}

export const StreamSlices = ({ slices, height }: StreamSlicesProps) => (
    <g>
        {slices.map(slice => (
            <StreamSlicesItem key={slice.index} slice={slice} height={height} />
        ))}
    </g>
)
