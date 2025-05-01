import range from 'lodash/range.js'
import random from 'lodash/random.js'

const names = [
    'Raoul',
    'Josiane',
    'Marcel',
    'René',
    'Paul',
    'Jacques',
    'Jane',
    'André',
    'Guillaume',
    'Lyu',
    'Maki',
    'Junko',
    'Emi',
    'Kae',
    'Tomoko',
    'Camille',
    'Jared',
    'Ibrahim',
    'Mohamed',
    'Claude',
    'Jean',
    'Leonard',
    'David',
]

export const generateLightDataSet = () => ({
    data: range(9).map(() =>
        names.slice(0, 6).reduce((layer, key) => {
            layer[key] = random(10, 200)
            return layer
        }, {})
    ),
    keys: names.slice(0, 6),
})

export const generateHeavyDataSet = () => ({
    data: range(360).map(() =>
        names.reduce((layer, key) => {
            layer[key] = random(10, 200)
            return layer
        }, {})
    ),
    keys: names,
})
