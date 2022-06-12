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
export type StackOrder = keyof typeof stackOrderPropMapping

export const stackOrderFromProp = (prop: StackOrder) => stackOrderPropMapping[prop]

export const stackOffsetPropMapping = {
    expand: stackOffsetExpand,
    diverging: stackOffsetDiverging,
    none: stackOffsetNone,
    silhouette: stackOffsetSilhouette,
    wiggle: stackOffsetWiggle,
}

export const stackOffsetPropKeys = Object.keys(stackOffsetPropMapping)
export type StackOffset = keyof typeof stackOffsetPropMapping

export const stackOffsetFromProp = (prop: StackOffset) => stackOffsetPropMapping[prop]
