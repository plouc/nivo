/**
 * Index data by day, so that binding data to day cells doesn't require
 * scanning the whole dataset for each day.
 * First match wins, consistent with `Array.prototype.find`.
 */
export const indexDataByDay = <D extends { day: string }>(data: readonly D[]) => {
    const dataByDay = new Map<string, D>()
    data.forEach(datum => {
        if (!dataByDay.has(datum.day)) dataByDay.set(datum.day, datum)
    })

    return dataByDay
}
