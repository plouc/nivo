import PropTypes from 'prop-types'

export const inheritedColorPropType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
        theme: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
        from: PropTypes.string.isRequired,
        modifiers: PropTypes.arrayOf(PropTypes.array),
    }),
])
