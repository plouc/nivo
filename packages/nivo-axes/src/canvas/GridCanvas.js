/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { renderGridLinesToCanvas } from './render'

const GridCanvas = ({ ctx, width, height, xScale, yScale }) => {
    renderGridLinesToCanvas(ctx, {
        width,
        height,
        scale: xScale,
        axis: 'x',
    })

    renderGridLinesToCanvas(ctx, {
        width,
        height,
        scale: yScale,
        axis: 'y',
    })

    return null
}

export default GridCanvas
