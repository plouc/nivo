/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as PropTypes from 'prop-types'
import { Anchor, Direction } from './definitions'

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
        Anchor.Top,
        Anchor.TopRight,
        Anchor.Right,
        Anchor.BottomRight,
        Anchor.Bottom,
        Anchor.BottomLeft,
        Anchor.Left,
        Anchor.TopLeft,
        Anchor.Center,
    ]).isRequired,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    direction: PropTypes.oneOf([Direction.Row, Direction.Column]).isRequired,

    // item
    itemsSpacing: PropTypes.number,
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemDirection: PropTypes.oneOf([
        Direction.LeftToRight,
        Direction.RightToLeft,
        Direction.TopToBottom,
        Direction.BottomToTop,
    ]),
    itemTextColor: PropTypes.string,
    itemBackground: PropTypes.string,
    itemOpacity: PropTypes.number,

    ...symbolPropTypes,
    ...interactivityPropTypes,

    effects: PropTypes.arrayOf(legendEffectPropType),
}
