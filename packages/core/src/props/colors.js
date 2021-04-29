import PropTypes from 'prop-types'
import { quantizeColorScalesKeys } from '../lib/colors'

export const quantizeColorScalePropType = PropTypes.oneOfType([
    PropTypes.oneOf(quantizeColorScalesKeys),
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.string),
])
