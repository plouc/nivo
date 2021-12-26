import { scaleLinear, scalePoint, scaleTime } from 'd3-scale'
import { castLinearScale } from '@nivo/scales'

export const linearXScale = castLinearScale(scaleLinear().range([0, 280]).domain([0, 80]))

export const linearYScale = castLinearScale(scaleLinear().range([160, 0]).domain([0, 35]))

export const pointXScale = scalePoint()
    .range([0, 280])
    .domain(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])
pointXScale.type = 'point'

export const timeXScale = scaleTime()
    .range([0, 280])
    .domain([new Date(2019, 0, 1, 0, 0, 0, 0), new Date(2020, 0, 1, 0, 0, 0, 0)])
timeXScale.type = 'time'

export const timeXScaleHours = scaleTime()
    .range([0, 280])
    .domain([
        new Date(Date.UTC(2020, 0, 1, 9, 0, 0, 0)),
        new Date(Date.UTC(2020, 0, 1, 10, 0, 0, 0)),
    ])
timeXScaleHours.type = 'time'
