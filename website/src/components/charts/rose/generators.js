const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
]

const dimensions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']

export const generateLightDataSet = () => {
    const keys = dimensions.slice(0, 4)
    const data = months.map(month => {
        return keys.reduce(
            (acc, key) => {
                return {
                    ...acc,
                    [key]: Math.random() * 100,
                }
            },
            { month }
        )
    })

    return { indexBy: 'month', data, keys }
}

export const generateHeavyDataSet = () => {
    const keys = [...dimensions]
    const yearMonths = ['2000', '2001', '2002'].reduce((acc, year) => {
        return [...acc, ...months.map(month => `${year}/${month}`)]
    }, [])
    const data = yearMonths.map(month => {
        return keys.reduce(
            (acc, key) => {
                return {
                    ...acc,
                    [key]: Math.random() * 100,
                }
            },
            { month }
        )
    })

    return { indexBy: 'month', data, keys }
}
