/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import GridLines from './GridLines'
import { computeGridLines } from '../compute'

const Grid = ({ width, height, xScale, yScale, xValues, yValues }) => {
    const xLines = useMemo(() => {
        if (!xScale) return false

        return computeGridLines({
            width,
            height,
            scale: xScale,
            axis: 'x',
            values: xValues,
        })
    }, [xScale, xValues])

    const yLines = yScale
        ? computeGridLines({
              width,
              height,
              scale: yScale,
              axis: 'y',
              values: yValues,
          })
        : false

    return (
        <>
            {xLines && <GridLines type="x" lines={xLines} />}
            {yLines && <GridLines type="y" lines={yLines} />}
        </>
    )
}

Grid.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    xScale: PropTypes.func,
    yScale: PropTypes.func,
    xValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
        ),
    ]),
    yValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
        ),
    ]),
}

export default memo(Grid)
