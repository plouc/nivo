/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { random, range, shuffle } from 'lodash'

interface Datum {
    id: string
    group: string
    price: number
    volume: number
    categories?: number[]
}

interface SwarmData {
    groups: string[]
    data: Datum[]
}

const randomPrice = () => random(0, 500)
const randomVolume = () => random(4, 20)
const randomCategory = () => random(3, 17)

export const generateSwarmPlotData = (
    groups: string[],
    { min = 60, max = 100, categoryCount = 0 }
): SwarmData => ({
    groups,
    data: groups.reduce<Datum[]>(
        (acc, group, groupIndex) => [
            ...acc,
            ...range(random(min, max))
                .map(() => randomPrice())
                .map((price, index) => ({
                    id: `${groupIndex}.${index}`,
                    group,
                    price,
                    volume: randomVolume(),
                    categories:
                        categoryCount > 0 ? range(categoryCount).map(randomCategory) : undefined,
                })),
        ],
        []
    ),
})

export const randomizeSwarmPlotData = (previousData: SwarmData): SwarmData => ({
    groups: previousData.groups,
    data: previousData.data.map(d => ({
        ...d,
        group: shuffle(previousData.groups)[0],
        price: randomPrice(),
        volume: randomVolume(),
        categories: d.categories ? range(3).map(randomCategory) : undefined,
    })),
})
