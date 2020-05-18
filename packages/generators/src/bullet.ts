/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { random, range } from 'lodash'

type Options = Partial<{
    title: string
    subtitle: string
    rangeCount: number
    measureCount: number
    markerCount: number
    float: boolean
}>

export const generateBulletData = (
    id: string,
    max: number,
    {
        title,
        subtitle,
        rangeCount = 5,
        measureCount = 1,
        markerCount = 1,
        float = false,
    }: Options = {}
) => {
    const ranges = range(rangeCount - 1).reduce(
        acc => {
            const remaining = max - acc[0]
            return [random(remaining, float), ...acc]
        },
        [max]
    )

    const measures = range(measureCount).reduce<number[]>(acc => {
        if (acc.length === 0) {
            return [random(max, float)]
        }
        return [random(acc[0], float), ...acc]
    }, [])

    const markers = range(markerCount).map(() => max * 0.6 + random(max * 0.4))

    return {
        id,
        title,
        subtitle,
        ranges,
        measures,
        markers,
    }
}
