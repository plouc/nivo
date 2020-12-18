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
