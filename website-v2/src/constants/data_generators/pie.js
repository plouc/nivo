import { generateProgrammingLanguageStats } from '@nivo/generators'

export const pie = () => ({
    data: generateProgrammingLanguageStats(true, 5).map(d => ({
        id: d.label,
        ...d,
    }))
})

export const pieCanvas = () => ({
    data: generateProgrammingLanguageStats(true, 18).map(d => ({
        id: d.label,
        ...d,
    }))
})
