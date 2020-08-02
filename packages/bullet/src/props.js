/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { themePropType, noop } from '@nivo/core'
import BulletItem from './BulletItem'

const commonPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.node,
            ranges: PropTypes.arrayOf(PropTypes.number).isRequired,
            measures: PropTypes.arrayOf(PropTypes.number).isRequired,
            markers: PropTypes.arrayOf(PropTypes.number),
        })
    ).isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    reverse: PropTypes.bool.isRequired,
    spacing: PropTypes.number.isRequired,

    titlePosition: PropTypes.oneOf(['before', 'after']).isRequired,
    titleAlign: PropTypes.oneOf(['start', 'middle', 'end']).isRequired,
    titleOffsetX: PropTypes.number.isRequired,
    titleOffsetY: PropTypes.number.isRequired,
    titleRotation: PropTypes.number.isRequired,

    rangeColors: PropTypes.any.isRequired,
    rangeBorderWidth: PropTypes.number.isRequired,
    rangeBorderColor: PropTypes.any.isRequired,
    onRangeClick: PropTypes.func,

    measureColors: PropTypes.any.isRequired,
    measureSize: PropTypes.number.isRequired,
    measureBorderWidth: PropTypes.number.isRequired,
    measureBorderColor: PropTypes.any.isRequired,
    onMeasureClick: PropTypes.func,

    markerColors: PropTypes.any.isRequired,
    markerSize: PropTypes.number.isRequired,
    onMarkerClick: PropTypes.func,

    axisPosition: PropTypes.oneOf(['before', 'after']).isRequired,

    theme: themePropType.isRequired,

    overrides: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            reverse: PropTypes.bool,
            rangeColors: PropTypes.any,
            rangeBorderWidth: PropTypes.number,
            rangeBorderColor: PropTypes.any,
            measureColors: PropTypes.any,
            measureBorderWidth: PropTypes.number,
            measureBorderColor: PropTypes.any,
            axis: PropTypes.shape({
                position: PropTypes.oneOf(['before', 'after']),
                min: PropTypes.number,
                max: PropTypes.number,
            }),
        })
    ).isRequired,
}

export const BulletPropTypes = {
    ...commonPropTypes,
}

const commonDefaultProps = {
    layout: BulletItem.defaultProps.layout,
    reverse: BulletItem.defaultProps.reverse,
    spacing: 30,
    titlePosition: BulletItem.defaultProps.titlePosition,
    titleAlign: BulletItem.defaultProps.titleAlign,
    titleOffsetX: BulletItem.defaultProps.titleOffsetX,
    titleOffsetY: BulletItem.defaultProps.titleOffsetY,
    titleRotation: BulletItem.defaultProps.titleRotation,
    rangeBorderWidth: 0,
    rangeBorderColor: { from: 'color' },
    measureSize: 0.4,
    measureBorderWidth: 0,
    measureBorderColor: { from: 'color' },
    markerSize: 0.6,
    markerColors: BulletItem.defaultProps.markerColors,
    axisPosition: BulletItem.defaultProps.axisPosition,
    rangeColors: BulletItem.defaultProps.rangeColors,
    measureColors: BulletItem.defaultProps.measureColors,
    isInteractive: true,
    onClick: noop,
    overrides: [],
}

export const BulletDefaultProps = {
    ...commonDefaultProps,
}
