/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { spring } from 'react-motion'
import { colorMotionSpring } from '@nivo/core'

export const nodeWillEnter = ({ data: node }) => ({
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height,
    ...colorMotionSpring(node.color),
})

export const nodeWillLeave = springConfig => ({ data: node }) => ({
    x: spring(node.x + node.width / 2, springConfig),
    y: spring(node.y + node.height / 2, springConfig),
    width: spring(0, springConfig),
    height: spring(0, springConfig),
    ...colorMotionSpring(node.color, springConfig),
})
