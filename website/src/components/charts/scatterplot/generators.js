import range from 'lodash/range'
import random from 'lodash/random'

const keys = ['group A', 'group B', 'group C', 'group D', 'group E']
const ageRange = [0, 100]
const weightRange = [0, 120]

const generateData = size =>
    keys.map(key => ({
        id: key,
        data: range(size).map(i => ({
            x: random(ageRange[0], ageRange[1]),
            y: random(weightRange[0], weightRange[1]),
        })),
    }))

export const generateLightDataSet = () => generateData(50)

export const generateHeavyDataSet = () => generateData(800)
