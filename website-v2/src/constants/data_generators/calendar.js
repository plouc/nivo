import { generateDayCounts } from '@nivo/generators'

const from = new Date(2015, 3, 1)
const to = new Date(2016, 7, 12)

export const calendar = () => ({
    data: generateDayCounts(from, to),
})
