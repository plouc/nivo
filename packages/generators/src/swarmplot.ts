import range from 'lodash/range'
import random from 'lodash/random'
import shuffle from 'lodash/shuffle'

type SwarmPlotDatum = {
    id: string
    categories?: number[]
    group: string
    price: number
    volume: number
}

const randomPrice = () => random(0, 500)
const randomVolume = () => random(4, 20)
const randomCategory = () => random(3, 17)

export const generateSwarmPlotData = (
    groups: string[],
    { min = 60, max = 100, categoryCount = 0 }
) => ({
    groups,
    data: groups.reduce<SwarmPlotDatum[]>(
        (acc, group, groupIndex) => [
            ...acc,
            ...range(random(min, max))
                .map(() => randomPrice())
                .map((price, index) => {
                    const datum: SwarmPlotDatum = {
                        id: `${groupIndex}.${index}`,
                        group,
                        price,
                        volume: randomVolume(),
                    }

                    if (categoryCount > 0) {
                        datum.categories = range(categoryCount).map(randomCategory)
                    }

                    return datum
                }),
        ],
        []
    ),
})

export const randomizeSwarmPlotData = (previousData: ReturnType<typeof generateSwarmPlotData>) => ({
    groups: previousData.groups,
    data: previousData.data.map(d => {
        const datum = {
            ...d,
            group: shuffle(previousData.groups)[0],
            price: randomPrice(),
            volume: randomVolume(),
        }

        if (d.categories !== undefined) {
            datum.categories = range(3).map(randomCategory)
        }

        return datum
    }),
})
