/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const serieIds = ['syrah', 'chardonay', 'carmenere']
const indices = ['fruity', 'bitter', 'heavy', 'strong', 'sunny']

export const generateLightDataSet = () => {
    return serieIds.map(id => ({
        id,
        data: indices.map(x => ({
            x,
            y: Math.round(Math.random() * 30),
        })),
    }))
}
