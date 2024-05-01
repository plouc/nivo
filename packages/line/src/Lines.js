import { memo } from 'react'
import LinesItem from './LinesItem'

const Lines = ({ lines, lineGenerator, lineWidth }) => {
    return lines
        .slice(0)
        .reverse()
        .map(({ id, data, color }) => (
            <LinesItem
                key={id}
                id={id}
                points={data.map(d => d.position)}
                lineGenerator={lineGenerator}
                color={color}
                thickness={lineWidth}
            />
        ))
}

export default memo(Lines)
