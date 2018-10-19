/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleLinear, scalePoint, scaleTime } from 'd3-scale'

export const linearXScale = scaleLinear()
    .range([0, 280])
    .domain([0, 80])
linearXScale.type = 'linear'

export const linearYScale = scaleLinear()
    .range([160, 0])
    .domain([0, 35])
linearYScale.type = 'linear'

export const pointXScale = scalePoint()
    .range([0, 280])
    .domain(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])
pointXScale.type = 'point'

const timeScaleStart = new Date(2019, 0, 1, 0, 0, 0, 0)
const timeScaleEnd = new Date(2020, 0, 1, 0, 0, 0, 0)

export const timeXScale = scaleTime()
    .range([0, 280])
    .domain([timeScaleStart, timeScaleEnd])
timeXScale.type = 'time'
