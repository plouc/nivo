/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { generateLibTree } from '@nivo/generators'
import range from 'lodash/range'
import random from 'lodash/random'

export const generateLightDataSet = () => ({ root: generateLibTree() })

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
