import { generatePointsSerie } from '@nivo/generators'

const keys = ['group A', 'group B', 'group C', 'group D', 'group E']

const generateData = (xStep, yRand) =>
    keys.map(key => ({
        id: key,
        data: generatePointsSerie({
            x0: 0,
            x1: 100,
            xStep,
            y0: 0,
            y1: 120,
            yRand,
            easing: 'random',
        }).map((p, i) => ({
            id: i,
            ...p,
            y: p.y < 0 ? 0 : p.y,
        })),
    }))

export const generateLightDataSet = () => generateData(2, 30)

export const generateHeavyDataSet = () => generateData(0.1, 70)
