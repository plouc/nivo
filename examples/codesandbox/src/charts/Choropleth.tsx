import { ResponsiveChoropleth, ResponsiveChoroplethCanvas } from '@nivo/geo'
import { countries } from '../data'
import { useChart } from '../hooks'

const props = {
    borderWidth: 0.5,
    colors: 'nivo',
    domain: [0, 1000000],
    features: countries.features,
}

const generateData = () =>
    countries.features
        .filter(feature => !['BRA', 'AUS', 'SWE', 'GRL', 'COD'].includes(feature.id))
        .map(feature => ({
            id: feature.id,
            value: Math.round(Math.random() * 1000000),
        }))

export function Choropleth() {
    const [data, flavor] = useChart(generateData)

    if (flavor === 'canvas') {
        return <ResponsiveChoroplethCanvas data={data} {...props} />
    }

    return <ResponsiveChoropleth data={data} {...props} />
}
