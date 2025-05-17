import { generateCountriesData } from '@nivo/generators'

const dishes = [
    'hot dog',
    'burger',
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
    'yakitori',
    'takoyaki',
    'tacos',
    'miso soup',
    'tortilla',
    'tapas',
]

export const generateLightDataSet = () => ({
    data: generateCountriesData(dishes.slice(0, 6), { size: 7, max: 200, withColors: false }),
    keys: dishes.slice(0, 6),
})

export const generateHeavyDataSet = () => ({
    data: generateCountriesData(dishes, { size: 21, max: 200, withColors: false }),
    keys: dishes,
})
