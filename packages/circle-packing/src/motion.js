/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { spring } from 'react-motion'
import { interpolateColor } from '@nivo/colors'

export const nodeWillEnter = ({ data }) => ({
    scale: 0,
    r: 0,
    x: data.x,
    y: data.y,
    ...interpolateColor(data.color),
})

export const nodeWillLeave = springConfig => ({ data }) => ({
    scale: spring(0, springConfig),
    r: spring(0, springConfig),
    x: spring(data.x, springConfig),
    y: spring(data.y, springConfig),
    ...interpolateColor(data.color, springConfig),
})
