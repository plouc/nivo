/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { generateSwarmPlotData, randomizeSwarmPlotData } from '@nivo/generators'

const allGroups = ['group A', 'group B', 'group C', 'group D', 'group E', 'group F', 'group G']

export const generateLightDataSet = previousData => {
    if (previousData !== undefined) return randomizeSwarmPlotData(previousData)

    return generateSwarmPlotData(allGroups.slice(0, 3), { min: 50, max: 80 })
}

export const generateHeavyDataSet = previousData => {
    if (previousData !== undefined) return randomizeSwarmPlotData(previousData)

    return generateSwarmPlotData(allGroups, { min: 60, max: 100 })
}
