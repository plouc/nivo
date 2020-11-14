import PropTypes from 'prop-types'

export const crosshairTypes = [
    'x',
    'y',
    'top-left',
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
    'cross',
]

export const crosshairPropTypes = {
    type: PropTypes.oneOf(crosshairTypes),
}
