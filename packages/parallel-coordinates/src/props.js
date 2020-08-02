/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { lineCurvePropType } from '@nivo/core'
import { ordinalColorsPropType } from '@nivo/colors'

const commonVariablePropTypes = {
    key: PropTypes.string.isRequired,
    ticksPosition: PropTypes.oneOf(['before', 'after']),
    tickSize: PropTypes.number,
    tickPadding: PropTypes.number,
    tickRotation: PropTypes.number,
    format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    legend: PropTypes.node,
    legendPosition: PropTypes.oneOf(['start', 'middle', 'end']),
    legendOffset: PropTypes.number,
}

export const commonPropTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    variables: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                ...commonVariablePropTypes,
                key: PropTypes.string.isRequired,
                type: PropTypes.oneOf(['point']).isRequired,
                padding: PropTypes.number,
                values: PropTypes.arrayOf(
                    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                ),
                tickValues: PropTypes.arrayOf(
                    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                ),
            }),
            PropTypes.shape({
                ...commonVariablePropTypes,
                type: PropTypes.oneOf(['linear']).isRequired,
                min: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
                max: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
                tickValues: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.arrayOf(PropTypes.number),
                ]),
            }),
        ])
    ).isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    curve: lineCurvePropType.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    lineOpacity: PropTypes.number.isRequired,
    axesPlan: PropTypes.oneOf(['foreground', 'background']).isRequired,
    axesTicksPosition: PropTypes.oneOf(['before', 'after']).isRequired,
    colors: ordinalColorsPropType.isRequired,
}

export const commonDefaultProps = {
    layout: 'horizontal',
    curve: 'linear',
    colors: { scheme: 'yellow_orange_red' },
    strokeWidth: 2,
    lineOpacity: 0.35,
    axesPlan: 'foreground',
    axesTicksPosition: 'after',
    animate: true,
    motionConfig: 'gentle',
}
