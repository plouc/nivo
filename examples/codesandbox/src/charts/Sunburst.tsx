import { ResponsiveSunburst } from '@nivo/sunburst'
import { generateLibTree } from '@nivo/generators'
import { useChart } from '../hooks'

const props = {
    id: 'name',
    value: 'loc',
}

export function Sunburst() {
    const [data] = useChart(generateLibTree)

    return <ResponsiveSunburst data={data} {...props} />
}
