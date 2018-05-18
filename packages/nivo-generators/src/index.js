import range from 'lodash.range'
import random from 'lodash.random'
import shuffle from 'lodash.shuffle'
import { timeDays } from 'd3-time'
import { timeFormat } from 'd3-time-format'
import * as color from './color'
import * as sets from './sets'

export { sets }
export const randColor = color.randColor

export const generateProgrammingLanguageStats = (shouldShuffle = true, limit = -1) => {
    let langs = sets.programmingLanguages
    if (shouldShuffle) {
        langs = shuffle(langs)
    }
    if (limit < 1) {
        limit = 1 + Math.round(Math.random() * (sets.programmingLanguages.length - 1))
    }

    return langs.slice(0, limit).map(language => ({
        label: language,
        value: Math.round(Math.random() * 600),
        color: randColor(),
    }))
}

export const uniqRand = generator => {
    const used = []

    return (...args) => {
        let value
        do {
            value = generator(...args)
        } while (used.includes(value))

        used.push(value)

        return value
    }
}

export const randCountryCode = () => shuffle(sets.countryCodes)[0]

export const generateDrinkStats = (size = 16) => {
    const rand = () => random(0, 60)
    const types = ['whisky', 'rhum', 'gin', 'vodka', 'cognac']
    const country = uniqRand(randCountryCode)

    const data = types.map(id => ({
        id,
        color: randColor(),
        data: [],
    }))

    range(size).forEach(() => {
        const x = country()
        types.forEach(id => {
            data.find(d => d.id === id).data.push({
                color: randColor(),
                x,
                y: rand(),
            })
        })
    })

    return data
}

export const generateSerie = (length = 20) => {
    const data = []
    const max = 100 + Math.random() * (Math.random() * 600)

    for (let i = 0; i < length; i++) {
        data.push(Math.round(Math.random() * max))
    }

    return data
}

export const generateStackData = (size = 3) => {
    const length = 16
    return range(size).map(() => generateSerie(length).map((v, i) => ({ x: i, y: v })))
}

export const generateCountriesPopulation = size => {
    const countryCode = uniqRand(randCountryCode())

    return range(size).map(() => ({
        country: countryCode(),
        population: 200 + Math.round(Math.random() * Math.random() * 1000000),
    }))
}

export const generateDayCounts = (from, to, maxSize = 0.9) => {
    const days = timeDays(from, to)

    const size =
        Math.round(days.length * (maxSize * 0.4)) +
        Math.round(Math.random() * (days.length * (maxSize * 0.6)))

    const dayFormat = timeFormat('%Y-%m-%d')

    return shuffle(days)
        .slice(0, size)
        .map(day => {
            return {
                day: dayFormat(day),
                value: Math.round(Math.random() * 400),
            }
        })
}

export const generateCountriesData = (
    keys,
    { size = 12, min = 0, max = 200, withColors = true } = {}
) =>
    sets.countryCodes.slice(0, size).map(country => {
        const d = {
            country,
        }
        keys.forEach(key => {
            d[key] = random(min, max)
            if (withColors === true) {
                d[`${key}Color`] = randColor()
            }
        })

        return d
    })

const libTreeItems = [
    [
        'viz',
        [
            ['stack', [['chart'], ['xAxis'], ['yAxis'], ['layers']]],
            [
                'pie',
                [
                    ['chart', [['pie', [['outline'], ['slices'], ['bbox']]], ['donut'], ['gauge']]],
                    ['legends'],
                ],
            ],
        ],
    ],
    ['colors', [['rgb'], ['hsl']]],
    [
        'utils',
        [['randomize'], ['resetClock'], ['noop'], ['tick'], ['forceGC'], ['stackTrace'], ['dbg']],
    ],
    ['generators', [['address'], ['city'], ['animal'], ['movie'], ['user']]],
    [
        'set',
        [
            ['clone'],
            ['intersect'],
            ['merge'],
            ['reverse'],
            ['toArray'],
            ['toObject'],
            ['fromCSV'],
            ['slice'],
            ['append'],
            ['prepend'],
            ['shuffle'],
            ['pick'],
            ['plouc'],
        ],
    ],
    [
        'text',
        [
            ['trim'],
            ['slugify'],
            ['snakeCase'],
            ['camelCase'],
            ['repeat'],
            ['padLeft'],
            ['padRight'],
            ['sanitize'],
            ['ploucify'],
        ],
    ],
    [
        'misc',
        [
            ['whatever', [['hey'], ['WTF'], ['lol'], ['IMHO']]],
            ['other'],
            [
                'crap',
                [
                    ['crapA'],
                    ['crapB', [['crapB1'], ['crapB2'], ['crapB3'], ['crapB4']]],
                    [
                        'crapC',
                        [
                            ['crapC1'],
                            ['crapC2'],
                            ['crapC3'],
                            ['crapC4'],
                            ['crapC5'],
                            ['crapC6'],
                            ['crapC7'],
                            ['crapC8'],
                            ['crapC9'],
                        ],
                    ],
                ],
            ],
        ],
    ],
]

export const generateLibTree = (name = 'nivo', limit, children = libTreeItems) => {
    limit = limit || children.length
    if (limit > children.length) {
        limit = children.length
    }

    const tree = {
        name,
        color: randColor(),
    }
    if (children && children.length > 0) {
        tree.children = range(limit).map((o, i) => {
            const leaf = children[i]

            // full path `${name}.${leaf[0]}`
            return generateLibTree(leaf[0], null, leaf[1] || [])
        })
    } else {
        tree.loc = Math.round(Math.random() * 200000)
    }

    return tree
}

const wines = ['chardonay', 'carmenere', 'syrah']
const wineTastes = ['fruity', 'bitter', 'heavy', 'strong', 'sunny']
export const generateWinesTastes = ({ randMin = 20, randMax = 120 } = {}) => {
    const data = wineTastes.map(taste => {
        const d = { taste }
        wines.forEach(wine => {
            d[wine] = random(randMin, randMax)
        })

        return d
    })

    return { data, keys: wines }
}

export { default as generateSankeyData } from './sankey'
export { default as generateChordData } from './chord'
