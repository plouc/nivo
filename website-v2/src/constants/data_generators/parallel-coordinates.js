import { generateParallelCoordinatesData } from '@nivo/generators'

export const parallelCoordinates = () => ({
    data: generateParallelCoordinatesData({ size: 32 })
})

export const parallelCoordinatesCanvas = () => ({
    data: generateParallelCoordinatesData({ size: 320 })
})
