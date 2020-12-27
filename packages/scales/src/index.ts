import PropTypes from 'prop-types'
import { linearScalePropTypes } from './linearScale'
import { logScalePropTypes } from './logScale'
import { symLogScalePropTypes } from './symlogScale'
import { pointScalePropTypes } from './pointScale'
import { timeScalePropTypes } from './timeScale'
import { bandScalePropTypes } from './bandScale'

export * from './compute'
export * from './linearScale'
export * from './logScale'
export * from './symlogScale'
export * from './pointScale'
export * from './timeScale'
export * from './timeHelpers'
export * from './bandScale'

export const scalePropType = PropTypes.oneOfType([
    PropTypes.shape(linearScalePropTypes),
    PropTypes.shape(pointScalePropTypes),
    PropTypes.shape(timeScalePropTypes),
    PropTypes.shape(logScalePropTypes),
    PropTypes.shape(symLogScalePropTypes),
    PropTypes.shape(bandScalePropTypes),
])
