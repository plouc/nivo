import PropTypes from 'prop-types'

export const defsPropTypes = {
    defs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    fill: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            match: PropTypes.oneOfType([PropTypes.oneOf(['*']), PropTypes.object, PropTypes.func])
                .isRequired,
        })
    ).isRequired,
}
