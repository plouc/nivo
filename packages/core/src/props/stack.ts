import PropTypes from 'prop-types'
import {
    // order
    stackOrderAscending,
    stackOrderDescending,
    stackOrderInsideOut,
    stackOrderNone,
    stackOrderReverse,
    // offset
    stackOffsetExpand,
    stackOffsetDiverging,
    stackOffsetNone,
    stackOffsetSilhouette,
    stackOffsetWiggle,
} from 'd3-shape'

export const stackOrderPropMapping = {
    ascending: stackOrderAscending,
    descending: stackOrderDescending,
    insideOut: stackOrderInsideOut,
    none: stackOrderNone,
    reverse: stackOrderReverse,
}

export const stackOrderPropKeys = Object.keys(stackOrderPropMapping)

export const stackOrderPropType = PropTypes.oneOf(stackOrderPropKeys)

export const stackOrderFromProp = prop => stackOrderPropMapping[prop]

export const stackOffsetPropMapping = {
    expand: stackOffsetExpand,
    diverging: stackOffsetDiverging,
    none: stackOffsetNone,
    silhouette: stackOffsetSilhouette,
    wiggle: stackOffsetWiggle,
}

export const stackOffsetPropKeys = Object.keys(stackOffsetPropMapping)

export const stackOffsetPropType = PropTypes.oneOf(stackOffsetPropKeys)

export const stackOffsetFromProp = prop => stackOffsetPropMapping[prop]
