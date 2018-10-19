import { generateLibTree } from '@nivo/generators'

export const sunburst = () => ({
    data: generateLibTree(),
})
