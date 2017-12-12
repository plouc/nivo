/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { computeLinearScaleX } from './compute'

export default class LinearScaleX extends PureComponent {
    static propTypes = {
        data: PropTypes.array,
        scales: PropTypes.object, // private, from <Scales>
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
        max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
        width: PropTypes.number.isRequired,
    }

    static defaultProps = {
        min: 'auto',
        max: 'auto',
    }

    static compute = computeLinearScaleX

    render() {
        return null
    }
}
