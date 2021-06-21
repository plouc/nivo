import { ResponsiveMarimekko } from '@nivo/marimekko'
import { random } from '../utils'
import { useChart } from '../hooks'

const props = {
    axisLeft: {},
    axisBottom: {},
    dimensions: [
        {
            id: 'disagree strongly',
            value: 'stronglyDisagree',
        },
        {
            id: 'disagree',
            value: 'disagree',
        },
        {
            id: 'agree',
            value: 'agree',
        },
        {
            id: 'agree strongly',
            value: 'stronglyAgree',
        },
    ],
    id: 'statement',
    margin: { top: 40, right: 80, bottom: 40, left: 80 },
    value: 'participation',
}

const generateData = () =>
    [`it's good`, `it's sweet`, `it's spicy`, 'worth eating', 'worth buying'].map(statement => ({
        statement,
        participation: random(0, 32),
        stronglyAgree: random(0, 32),
        agree: random(0, 32),
        disagree: random(0, 32),
        stronglyDisagree: random(0, 32),
    }))

export function Marimekko() {
    const [data] = useChart(generateData)

    return <ResponsiveMarimekko data={data} {...props} />
}
