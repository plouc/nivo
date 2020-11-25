import PropTypes from 'prop-types'

export const axisPropTypes = {
    ticksPosition: PropTypes.oneOf(['before', 'after']),
    tickValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
        ),
        PropTypes.string,
    ]),
    tickSize: PropTypes.number,
    tickPadding: PropTypes.number,
    tickRotation: PropTypes.number,
    format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    renderTick: PropTypes.func,
    legend: PropTypes.node,
    legendPosition: PropTypes.oneOf(['start', 'middle', 'end']),
    legendOffset: PropTypes.number,
    ariaHidden: PropTypes.bool,
}

export const axisPropType = PropTypes.shape(axisPropTypes)
