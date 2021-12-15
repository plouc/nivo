'use strict'
const { generateCountriesData } = require('@nivo/generators')

const keys = [
    'hot dogs',
    'burgers',
    'sandwich',
    'kebab',
    'fries',
    'donut',
    'junk',
    'sushi',
    'ramen',
    'curry',
    'udon',
    'bagel',
]

module.exports = {
    type: 'heatmap',
    props: {
        width: 900,
        height: 600,
        data: generateCountriesData(keys, { size: 9, min: 0, max: 100 }),
        keys,
        indexBy: 'country',
        forceSquare: true,
        cellShape: 'circle',
        cellBorderWidth: 2,
        cellBorderColor: 'inherit:darker(0.4)',
        padding: 4,
        sizeVariation: 0.5,
        enableGridY: true,
        labelTextColor: 'inherit:darker(2.4)',
        colors: 'PuOr',
    },
}
