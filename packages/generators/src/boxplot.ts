// configuration for a set of data points
// strings are descriptors for the set
// numbers are used for synthetic data generation)
type BoxPlotConfig = {
    group: string
    subgroup?: string
    mu: number
    sd: number
    n: number
}

// create a random number from a distribution that has a mean and some spread
// (uses Math.atanh instead of normal distribution - only meant for test cases)
const randomValue = (mu = 0, sigma = 1) => {
    const z = (Math.random() - 0.5) * 2
    return Math.atanh(z) * sigma + mu
}

export const generateBoxPlotData = (config: BoxPlotConfig[]) => {
    return config
        .map(x => {
            const values = Array(x.n)
                .fill(0)
                .map(() => randomValue(x.mu, x.sd))
            return values.map(v => {
                return { ...x, value: v }
            })
        })
        .flat()
}
