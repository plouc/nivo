import { ResponsiveChord, ResponsiveChordCanvas } from '@nivo/chord'
import { generateChordData } from '@nivo/generators'
import { useChart } from '../hooks'

const props = {
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    xPadding: 0.2,
} as const

export function Chord() {
    const [data, flavor] = useChart(() => generateChordData({ size: 7 }))

    if (flavor === 'canvas') {
        return <ResponsiveChordCanvas {...props} data={data.matrix} keys={data.keys} />
    }

    return <ResponsiveChord {...props} data={data.matrix} keys={data.keys} />
}
