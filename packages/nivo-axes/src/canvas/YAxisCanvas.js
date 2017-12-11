/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { renderAxisToCanvas } from './render'

const YAxisCanvas = ({
    ctx,
    width,
    height,
    position,
    scale,
    tickSize,
    tickPadding,
    tickRotation,
    format,
}) => {
    renderAxisToCanvas(ctx, {
        width,
        height,
        position,
        scale,
        tickSize,
        tickPadding,
        tickRotation,
        format,
    })

    return null
}

YAxisCanvas.propTypes = {
    ctx: PropTypes.object.isRequired,

    // generic
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    position: PropTypes.oneOf(['left', 'right']).isRequired,
    scale: PropTypes.func.isRequired,

    // ticks
    tickValues: PropTypes.array,
    tickCount: PropTypes.number,
    tickSize: PropTypes.number.isRequired,
    tickPadding: PropTypes.number.isRequired,
    tickRotation: PropTypes.number.isRequired,
    format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

YAxisCanvas.defaultProps = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
}

export default YAxisCanvas
