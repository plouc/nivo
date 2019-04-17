/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { ordinalColorsPropType, inheritedColorPropType } from '@nivo/colors'
import { LegendPropShape } from '@nivo/legends'
import { closedCurvePropType, motionPropTypes, blendModePropType } from '@nivo/core'

export const RadarPropTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]).isRequired,
    maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,

    curve: closedCurvePropType.isRequired,

    borderWidth: PropTypes.number.isRequired,
    borderColor: inheritedColorPropType.isRequired,

    gridLevels: PropTypes.number,
    gridShape: PropTypes.oneOf(['circular', 'linear']),
    gridLabel: PropTypes.func,
    gridLabelOffset: PropTypes.number,

    enableDots: PropTypes.bool.isRequired,
    dotSymbol: PropTypes.func,
    dotSize: PropTypes.number,
    dotColor: inheritedColorPropType,
    dotBorderWidth: PropTypes.number,
    dotBorderColor: inheritedColorPropType,
    enableDotLabel: PropTypes.bool,
    dotLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    dotLabelFormat: PropTypes.string,
    dotLabelYOffset: PropTypes.number,

    colors: ordinalColorsPropType.isRequired,
    fillOpacity: PropTypes.number.isRequired,
    blendMode: blendModePropType.isRequired,

    isInteractive: PropTypes.bool.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,

    ...motionPropTypes,
}

export const RadarDefaultProps = {
    maxValue: 'auto',

    curve: 'linearClosed',

    borderWidth: 2,
    borderColor: { from: 'color' },

    gridLevels: 5,
    gridShape: 'circular',
    gridLabelOffset: 16,

    enableDots: true,

    colors: { scheme: 'nivo' },
    fillOpacity: 0.25,
    blendMode: 'normal',

    isInteractive: true,

    legends: [],

    animate: true,
    motionDamping: 13,
    motionStiffness: 90,
}
