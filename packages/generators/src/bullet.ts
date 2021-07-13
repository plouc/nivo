import range from 'lodash/range'
import random from 'lodash/random'

type Options = Partial<{
    float: boolean
    markerCount: number
    measureCount: number
    rangeCount: number
    subtitle: string
    title: string
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
        if (acc.length === 0) return [random(max, float)]
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
