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
    ANCHOR_BOTTOM,
    ANCHOR_BOTTOM_LEFT,
    ANCHOR_BOTTOM_RIGHT,
    ANCHOR_CENTER,
    ANCHOR_LEFT,
    ANCHOR_RIGHT,
    ANCHOR_TOP,
    ANCHOR_TOP_LEFT,
    ANCHOR_TOP_RIGHT,
    DIRECTION_BOTTOM_TO_TOP,
    DIRECTION_COLUMN,
    DIRECTION_LEFT_TO_RIGHT,
    DIRECTION_RIGHT_TO_LEFT,
    DIRECTION_ROW,
    DIRECTION_TOP_TO_BOTTOM,
} from './constants'

/**
 * This can be used to add effect on legends on interaction.
 */
export const legendEffectPropType = PropTypes.shape({
    on: PropTypes.oneOfType([PropTypes.oneOf(['hover'])]).isRequired,
    style: PropTypes.shape({
        itemTextColor: PropTypes.string,
        itemBackground: PropTypes.string,
        itemOpacity: PropTypes.number,
        symbolSize: PropTypes.number,
        symbolBorderWidth: PropTypes.number,
        symbolBorderColor: PropTypes.string,
    }).isRequired,
})

export const symbolPropTypes = {
    symbolShape: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    symbolSize: PropTypes.number,
    symbolSpacing: PropTypes.number,
    symbolBorderWidth: PropTypes.number,
    symbolBorderColor: PropTypes.string,
}

export const interactivityPropTypes = {
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
}

export const datumPropType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string.isRequired,
    fill: PropTypes.string,
})

/**
 * The prop type is exported as a simple object instead of `PropTypes.shape`
 * to be able to add extra properties.
 *
 * @example
 * ```javascript
 * import { LegendPropShape } from '@nivo/legends'
 *
 * const customLegendPropType = PropTypes.shape({
 *     ...LegendPropShape,
 *     extra: PropTypes.any.isRequired,
 * })
 * ```
 */
export const LegendPropShape = {
    data: PropTypes.arrayOf(datumPropType),

    // position & layout
    anchor: PropTypes.oneOf([
        ANCHOR_TOP,
        ANCHOR_TOP_RIGHT,
        ANCHOR_RIGHT,
        ANCHOR_BOTTOM_RIGHT,
        ANCHOR_BOTTOM,
        ANCHOR_BOTTOM_LEFT,
        ANCHOR_LEFT,
        ANCHOR_TOP_LEFT,
        ANCHOR_CENTER,
    ]).isRequired,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    direction: PropTypes.oneOf([DIRECTION_ROW, DIRECTION_COLUMN]).isRequired,

    // item
    itemsSpacing: PropTypes.number,
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemDirection: PropTypes.oneOf([
        DIRECTION_LEFT_TO_RIGHT,
        DIRECTION_RIGHT_TO_LEFT,
        DIRECTION_TOP_TO_BOTTOM,
        DIRECTION_BOTTOM_TO_TOP,
    ]),
    itemTextColor: PropTypes.string,
    itemBackground: PropTypes.string,
    itemOpacity: PropTypes.number,

    ...symbolPropTypes,
    ...interactivityPropTypes,

    effects: PropTypes.arrayOf(legendEffectPropType),
}
