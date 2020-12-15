import PropTypes from 'prop-types'
import {
    treemapBinary,
    treemapDice,
    treemapSlice,
    treemapSliceDice,
    treemapSquarify,
    treemapResquarify,
} from 'd3-hierarchy'

export const treeMapTilePropMapping = {
    binary: treemapBinary,
    dice: treemapDice,
    slice: treemapSlice,
    sliceDice: treemapSliceDice,
    squarify: treemapSquarify,
    resquarify: treemapResquarify,
}

export const treeMapTilePropKeys = Object.keys(treeMapTilePropMapping)

export const treeMapTilePropType = PropTypes.oneOf(treeMapTilePropKeys)

export const treeMapTileFromProp = prop => treeMapTilePropMapping[prop]
