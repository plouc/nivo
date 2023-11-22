import { memo } from 'react'
import PropTypes from 'prop-types'
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

Lines.propTypes = {
    lines: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            color: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    data: PropTypes.shape({
                        x: PropTypes.oneOfType([
                            PropTypes.string,
                            PropTypes.number,
                            PropTypes.instanceOf(Date),
                        ]),
                        y: PropTypes.oneOfType([
                            PropTypes.string,
                            PropTypes.number,
                            PropTypes.instanceOf(Date),
                        ]),
                    }).isRequired,
                    position: PropTypes.shape({
                        x: PropTypes.number,
                        y: PropTypes.number,
                    }).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    lineWidth: PropTypes.number.isRequired,
    lineGenerator: PropTypes.func.isRequired,
}

export default memo(Lines)
