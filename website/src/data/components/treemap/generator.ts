import { generateLibTree } from '@nivo/generators'
import range from 'lodash/range.js'
import random from 'lodash/random.js'

export const generateLightDataSet = () =>
    generateLibTree(undefined, undefined, undefined, { withColors: false })

const HEAVY_NODE_COUNT = 600

export const generateHeavyDataSet = () => {
    const children = range(HEAVY_NODE_COUNT).map(i => ({
        id: `node.${i}`,
        value: random(10, 100000),
    }))

    return {
        root: {
            id: 'root',
            children,
        },
        nodeCount: HEAVY_NODE_COUNT,
    }
}
