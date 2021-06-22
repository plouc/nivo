import './styles.css'

import { Button } from './Button'
import { ResponsiveBar, ResponsiveBarCanvas } from '@nivo/bar'
import { generateCountriesData } from '@nivo/generators'
import { inc } from './utils'
import { useState } from 'react'

type Flavor = 'svg' | 'canvas'

type ChartProps = {
    flavor: Flavor
    iteration: number
}

console.clear()

const keys = ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']
const props = {
    indexBy: 'country',
    keys,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    padding: 0.2,
    labelTextColor: 'inherit:ligher(1.4)',
    labelSkipWidth: 16,
    labelSkipHeight: 16,
} as const

function Chart({ flavor }: ChartProps) {
    const data = generateCountriesData(keys, { size: 7 })

    if (flavor === 'canvas') {
        return <ResponsiveBarCanvas data={data} {...props} />
    }

    return <ResponsiveBar data={data} {...props} />
}

export default function App() {
    const [flavor, setFlavor] = useState<Flavor>('svg')
    const [iteration, setIteration] = useState(inc)

    return (
        <div className="App">
            <h1>Nivo Bar Template</h1>
            <h2>Fork this template!</h2>
            <Button onClick={() => setIteration(inc)}>Generate Data</Button>
            <Button onClick={() => setFlavor(value => (value !== 'canvas' ? 'canvas' : 'svg'))}>
                Use {flavor === 'svg' ? 'Canvas' : 'SVG'}
            </Button>
            <div className="Chart">
                <Chart {...{ flavor, iteration }} />
            </div>
        </div>
    )
}
