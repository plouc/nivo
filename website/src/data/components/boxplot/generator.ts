import { generateBoxPlotData } from '@nivo/generators'

export const generateLightDataSet = () =>
    generateBoxPlotData([
        { group: 'Alpha', subgroup: 'A', mu: 5, sd: 1, n: 20 },
        { group: 'Alpha', subgroup: 'B', mu: 6, sd: 1, n: 20 },
        { group: 'Beta', subgroup: 'A', mu: 8, sd: 1.4, n: 20 },
        { group: 'Beta', subgroup: 'B', mu: 7.5, sd: 1.4, n: 20 },
        { group: 'Gamma', subgroup: 'A', mu: 5, sd: 1, n: 20 },
        { group: 'Gamma', subgroup: 'B', mu: 7.2, sd: 1.8, n: 20 },
        { group: 'Delta', subgroup: 'A', mu: 5, sd: 1, n: 20 },
        { group: 'Delta', subgroup: 'B', mu: 6, sd: 1, n: 20 },
        { group: 'Epsilon', subgroup: 'A', mu: 5, sd: 1.4, n: 20 },
        { group: 'Epsilon', subgroup: 'B', mu: 6, sd: 3, n: 20 },
    ])
