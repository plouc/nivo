/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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

export type StackOrder = keyof typeof stackOrderPropMapping

export const stackOrderPropKeys = Object.keys(stackOrderPropMapping)

export const stackOrderPropType = PropTypes.oneOf(stackOrderPropKeys)

export const stackOrderFromProp = (prop: StackOrder) => stackOrderPropMapping[prop]

export const stackOffsetPropMapping = {
    expand: stackOffsetExpand,
    diverging: stackOffsetDiverging,
    none: stackOffsetNone,
    silhouette: stackOffsetSilhouette,
    wiggle: stackOffsetWiggle,
}

export type StackOffset = keyof typeof stackOffsetPropMapping

export const stackOffsetPropKeys = Object.keys(stackOffsetPropMapping)

export const stackOffsetPropType = PropTypes.oneOf(stackOffsetPropKeys)

export const stackOffsetFromProp = (prop: StackOffset) => stackOffsetPropMapping[prop]
