import PropTypes from 'prop-types'

export const bandScalePropTypes = {
    type: PropTypes.oneOf(['band']).isRequired,
    round: PropTypes.bool,
}
