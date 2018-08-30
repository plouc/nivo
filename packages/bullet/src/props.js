/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { defsPropTypes, noop } from '@nivo/core'
import { LegendPropShape } from '@nivo/legends'

const commonPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            ranges: PropTypes.arrayOf(PropTypes.number).isRequired,
            measures: PropTypes.arrayOf(PropTypes.number).isRequired,
            markers: PropTypes.arrayOf(PropTypes.number),
        })
    ).isRequired,
    spacing: PropTypes.number.isRequired,
    measureSize: PropTypes.number.isRequired,
    markerSize: PropTypes.number.isRequired,
    reverse: PropTypes.bool.isRequired,
}

export const BulletPropTypes = {
    ...commonPropTypes,
}

const commonDefaultProps = {
    isInteractive: true,
    onClick: noop,
    spacing: 30,
    measureSize: 0.4,
    markerSize: 0.6,
    reverse: false,
}

export const BulletDefaultProps = {
    ...commonDefaultProps,
}
