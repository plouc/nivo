/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import countries from './world_countries'

export const generateChoroplethData = () =>
    countries.features.map(feature => ({
        id: feature.id,
        value: Math.round(Math.random() * 1000000),
    }))
