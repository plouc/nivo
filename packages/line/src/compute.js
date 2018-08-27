/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export const generateLines = (xy, getColor) => {
    if (xy.y.scale.stacked === true) {
        return xy.y.stacked.series.map(serie => ({
            ...serie,
            color: getColor(serie),
            data: serie.data.map(datum => ({
                x: datum.x !== null ? xy.x.scale(datum.x) : null,
                y: datum.y !== null ? xy.y.scale(datum.y) : null,
                data: datum,
            })),
        }))
    }

    return xy.series.map(serie => ({
        ...serie,
        color: getColor(serie),
        data: serie.data.map(datum => ({
            x: datum.x !== null ? xy.x.scale(datum.x) : null,
            y: datum.y !== null ? xy.y.scale(datum.y) : null,
            data: datum,
        })),
    }))
}
