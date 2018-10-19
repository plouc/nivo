import { generateLibTree } from '@nivo/generators'
import range from 'lodash/range'
import random from 'lodash/random'

export const treemap = () => ({ root: generateLibTree() })

export const treemapCanvas = () => {
    const children = range(600).map(i => ({
        id: `node.${i}`,
        value: random(10, 100000),
    }))

    return {
        root: {
            id: 'root',
            children,
        },
    }
}
