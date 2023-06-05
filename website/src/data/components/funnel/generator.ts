import { random, startCase } from 'lodash'

export const generateLightDataSet = () => {
    const ids = ['sent', 'viewed', 'clicked', 'add_to_card', 'purchased']

    let lastValue = 100000

    return ids.map(id => {
        lastValue = Math.round(lastValue * random(0.6, 0.95))

        return {
            id: `step_${id}`,
            value: lastValue,
            label: startCase(id),
        }
    })
}
