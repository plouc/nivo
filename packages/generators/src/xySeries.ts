interface XYRangeStaticValues {
    values: string[] | number[]
}

interface XYRandomNumericValues {
    length: number
    min: number
    max: number
    round?: boolean
}

type XYRangeValues = XYRangeStaticValues | XYRandomNumericValues

const getValueGenerator = (config: XYRangeValues) => {
    let generator: (index: number) => string | number

    if ('values' in config) {
        generator = (index: number) => config.values[index]
    } else {
        generator = () => {
            let value = config.min + Math.random() * (config.max - config.min)
            if (config.round) {
                value = Math.round(value)
            }

            return value
        }
    }

    return generator
}

export const generateXYSeries = ({
    serieIds,
    x,
    y,
}: {
    serieIds: string[]
    x: XYRangeValues
    y: XYRangeValues
}) => {
    const xLength = 'length' in x ? x.length : x.values.length

    const getX = getValueGenerator(x)
    const getY = getValueGenerator(y)

    return serieIds.map(serieId => {
        return {
            id: serieId,
            data: Array.from({ length: xLength }).map((_, index) => {
                return {
                    x: getX(index),
                    y: getY(index),
                }
            }),
        }
    })
}
