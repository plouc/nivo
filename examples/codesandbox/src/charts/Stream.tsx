import { ResponsiveStream } from '@nivo/stream'
import { random, range } from '../utils'
import { useChart } from '../hooks'

const keys = ['Raoul', 'Josiane', 'Marcel', 'René', 'Paul', 'Jacques']

const props = {
    keys,
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
}

const generateData = () =>
    range(0, 16).map(() =>
        keys.reduce<Record<string, number>>(
            (layer, key) => ({ ...layer, [key]: random(10, 200) }),
            {}
        )
    )

export function Stream() {
    const [data] = useChart(generateData)

    return <ResponsiveStream data={data} {...props} />
}
