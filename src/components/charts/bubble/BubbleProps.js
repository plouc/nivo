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

export const bubblePropTypes = {
    // data
    // `root` managed by `withHierarchy()` HOC
    identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

    // dimensions managed by `withDimensions()` HOC

    leavesOnly: PropTypes.bool.isRequired,
    padding: PropTypes.number.isRequired,

    // theming
    // theme managed by `withTheme()` HOC
    // colors managed by `withColors()` HOC

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
    transitionDuration: PropTypes.number.isRequired, // d3 transitions
    transitionEasing: PropTypes.string.isRequired, // d3 transitions

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
}

export const bubbleDefaultProps = {
    // data
    identity: 'id',

    leavesOnly: false,
    padding: 1,

    // placeholders
    namespace: 'html',

    // border
    borderWidth: 0,
    borderColor: 'inherit',

    // labels
    enableLabel: true,
    label: 'id',
    labelTextColor: 'inherit:darker(1)',
    labelSkipRadius: 0,

    // transitions
    transitionDuration: Nivo.defaults.transitionDuration, // d3 transitions
    transitionEasing: Nivo.defaults.transitionEasing, // d3 transitions

    // interactivity
    isInteractive: true,
}
