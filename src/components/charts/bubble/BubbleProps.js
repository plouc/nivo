/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import Nivo from '../../../Nivo'
import { marginPropType, motionPropTypes } from '../../../props'

/**
 * Bubble components propTypes.
 *
 * @type {object}
 */
export const bubblePropTypes = {
    root: PropTypes.object.isRequired,

    // dimensions
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: marginPropType,

    leavesOnly: PropTypes.bool.isRequired,
    onBubbleClick: PropTypes.func.isRequired,
    identity: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    padding: PropTypes.number.isRequired,

    // theming
    colors: PropTypes.any.isRequired,
    colorBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

    // placeholders
    namespace: PropTypes.oneOf(['html', 'svg']),
    children: PropTypes.func.isRequired,

    // border
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.any.isRequired,

    // labels
    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.string,
    labelTextColor: PropTypes.any.isRequired,
    labelTextDY: PropTypes.number.isRequired,
    labelSkipRadius: PropTypes.number.isRequired,

    // transitions
    ...motionPropTypes,
    transitionDuration: PropTypes.number.isRequired, // d3 transitions
    transitionEasing: PropTypes.string.isRequired, // d3 transitions
}

/**
 * Bubble components defaultProps.
 *
 * @type {object}
 */
export const bubbleDefaultProps = {
    // dimensions
    margin: Nivo.defaults.margin,

    leavesOnly: false,
    onBubbleClick: () => {},
    identity: 'id',
    value: 'value',
    padding: 1,

    // theming
    colors: Nivo.defaults.colorRange,
    colorBy: 'depth',

    // placeholders
    namespace: 'html',

    // border
    borderWidth: 0,
    borderColor: 'inherit',

    // labels
    enableLabel: true,
    label: 'id',
    labelTextColor: 'inherit:darker(1)',
    labelTextDY: 5,
    labelSkipRadius: 0,

    // transitions
    animate: true,
    motionStiffness: Nivo.defaults.motionStiffness, // react-motion
    motionDamping: Nivo.defaults.motionDamping, // react-motion
    transitionDuration: Nivo.defaults.transitionDuration, // d3 transitions
    transitionEasing: Nivo.defaults.transitionEasing, // d3 transitions
}
