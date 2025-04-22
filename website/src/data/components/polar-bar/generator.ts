import { generateMonthlyData } from '@nivo/generators'

const keys = ['Rent', 'Groceries', 'Transport', 'Savings', 'Misc']

export const generateLightDataSet = () => ({
    data: generateMonthlyData(keys, { withColors: false, short: true }),
    keys,
})
