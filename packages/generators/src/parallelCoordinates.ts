import random from 'lodash/random'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'

type Options = Partial<{
    size: number
    keys: Array<{
        key: string
        random?: [number, number]
        shuffle?: string[]
    }>
}>

export const generateParallelCoordinatesData = ({
    size = 26,
    keys = [
        { key: 'temp', random: [-10, 40] },
        { key: 'cost', random: [200, 400000] },
        { key: 'color', shuffle: ['red', 'yellow', 'green'] },
        { key: 'target', shuffle: ['A', 'B', 'C', 'D', 'E'] },
        { key: 'volume', random: [0.2, 7.6] },
    ],
}: Options = {}) => {
    const datumGenerator = () =>
        keys.reduce((acc, key) => {
            let value
            if (key.random !== undefined) {
                value = random(...key.random)
            } else if (key.shuffle !== undefined) {
                value = shuffle(key.shuffle)[0]
            }

            return { ...acc, [key.key]: value }
        }, {})

    return range(size).map(datumGenerator)
}
