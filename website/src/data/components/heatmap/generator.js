/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
    'chipirones',
    'gazpacho',
    'soba',
    'bavette',
    'steak',
    'pizza',
    'spaghetti',
    'ravioli',
    'salad',
    'pad thai',
    'bun',
    'waffle',
    'crepe',
    'churros',
    'paella',
    'empanadas',
    'bruschetta',
    'onion soup',
    'cassoulet',
    'bouillabaisse',
    'unagi',
    'tempura',
    'tonkatsu',
    'shabu-shabu',
    'twinkies',
    'jerky',
    'fajitas',
    'jambalaya',
    'meatloaf',
    `mac n' cheese`,
    'baked beans',
    'popcorn',
    'buffalo wings',
    'BBQ ribs',
    'apple pie',
    'nachos',
    'risotto',
    'tiramisu',
]

export const generateLightDataSet = () => ({
    data: generateCountriesData(dishes.slice(0, 11), { size: 9, min: 0, max: 100 }),
    keys: dishes.slice(0, 11),
})

export const generateHeavyDataSet = () => ({
    data: generateCountriesData(dishes, { size: 22, min: 0, max: 100 }),
    keys: dishes,
})
