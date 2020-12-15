import PropTypes from 'prop-types'

export const marginPropType = PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
}).isRequired

export const blendModes = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
]

export const blendModePropType = PropTypes.oneOf(blendModes)

export * from './colors'
export * from './curve'
export * from './defs'
export * from './stack'
export * from './treeMap'
