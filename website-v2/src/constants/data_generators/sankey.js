import random from 'lodash/random'
import { generateSankeyData } from '@nivo/generators'

const sankeyData = generateSankeyData({ nodeCount: 13, maxIterations: 2 })

export const sankey = () => ({
    data: Object.assign({}, sankeyData, {
        links: sankeyData.links.map(link =>
            Object.assign({}, link, {
                value: random(5, 200),
            })
        ),
    }),
})
