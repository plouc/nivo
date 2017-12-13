/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { computeLinearScale } from './compute'

export default class LinearScale extends PureComponent {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        data: PropTypes.array,
        property: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        scales: PropTypes.object, // private, from <Scales>
        min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
        max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
        range: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            .isRequired,
        stacked: PropTypes.bool.isRequired,
        stackBy: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }

    static defaultProps = {
        min: 'auto',
        max: 'auto',
        stacked: false,
    }

    static compute = computeLinearScale

    render() {
        return null
    }
}
