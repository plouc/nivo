/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export const degreesToRadians = degrees => degrees * Math.PI / 180

export const radiansToDegrees = radians => 180 * radians / Math.PI

export const midAngle = arc => arc.startAngle + (arc.endAngle - arc.startAngle) / 2

export const positionFromAngle = (angle, distance) => ({
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
})
