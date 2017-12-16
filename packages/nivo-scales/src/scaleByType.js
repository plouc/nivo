/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { computeLinearScale } from './linearScale'
import { computePointScale } from './pointScale'
import { computeTimeScale } from './timeScale'

export const scaleByType = {
    linear: computeLinearScale,
    point: computePointScale,
    time: computeTimeScale,
}

export const scalesFromConfig = scaleConfigs => {
    const computedScales = {}
    scaleConfigs.forEach(scaleConfig => {
        computedScales[scaleConfig.id] = scaleByType[scaleConfig.type](scaleConfig)
    })

    return computedScales
}
