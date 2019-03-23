/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { line, curveMonotoneX, curveMonotoneY } from 'd3-shape'

export const sankeyLinkHorizontal = () => {
    const lineGenerator = line().curve(curveMonotoneX)

    return (n, contract) => {
        const thickness = Math.max(1, n.thickness - contract * 2)
        const halfThickness = thickness / 2
        const linkLength = n.target.x0 - n.source.x1
        const padLength = linkLength * 0.12

        const dots = [
            [n.source.x1, n.pos0 - halfThickness],
            [n.source.x1 + padLength, n.pos0 - halfThickness],
            [n.target.x0 - padLength, n.pos1 - halfThickness],
            [n.target.x0, n.pos1 - halfThickness],
            [n.target.x0, n.pos1 + halfThickness],
            [n.target.x0 - padLength, n.pos1 + halfThickness],
            [n.source.x1 + padLength, n.pos0 + halfThickness],
            [n.source.x1, n.pos0 + halfThickness],
            [n.source.x1, n.pos0 - halfThickness],
        ]

        return lineGenerator(dots) + 'Z'
    }
}

export const sankeyLinkVertical = () => {
    const lineGenerator = line().curve(curveMonotoneY)

    return (n, contract) => {
        const thickness = Math.max(1, n.thickness - contract * 2)
        const halfThickness = thickness / 2
        const linkLength = n.target.y0 - n.source.y1
        const padLength = linkLength * 0.12

        const dots = [
            [n.pos0 + halfThickness, n.source.y1],
            [n.pos0 + halfThickness, n.source.y1 + padLength],
            [n.pos1 + halfThickness, n.target.y0 - padLength],
            [n.pos1 + halfThickness, n.target.y0],
            [n.pos1 - halfThickness, n.target.y0],
            [n.pos1 - halfThickness, n.target.y0 - padLength],
            [n.pos0 - halfThickness, n.source.y1 + padLength],
            [n.pos0 - halfThickness, n.source.y1],
            [n.pos0 + halfThickness, n.source.y1],
        ]

        return lineGenerator(dots) + 'Z'
    }
}
