import { createElement } from 'react'
import { mount } from 'enzyme'
import { BoxLegendSvg } from '@nivo/legends'
import Choropleth from '../src/Choropleth'

const features = [
    {
        type: 'Feature',
        id: 'A',
        properties: {},
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [0, 0],
                    [0, 10],
                    [10, 10],
                    [10, 0],
                    [0, 0],
                ],
            ],
        },
    },
]
const data = [{ id: 'A', value: 50 }]
const legends = [
    {
        anchor: 'bottom-left',
        direction: 'column',
        translateX: 20,
        translateY: -60,
        itemsSpacing: 0,
        itemWidth: 94,
        itemHeight: 18,
        itemDirection: 'left-to-right',
        symbolSize: 18,
    },
]

describe('Choropleth legends', () => {
    // Regression guard for #2801: the `legends` layer returned a bare
    // `legends.map(...)` array (unlike the `features`/`graticule` layers which
    // return keyed elements), triggering a React "unique key" warning under
    // React 19. It is now wrapped in a keyed `<Fragment>`.
    it('renders legends without a React "key" warning (#2801)', () => {
        const originalError = console.error
        const calls = []
        console.error = (...args) => {
            calls.push(args)
        }

        const wrapper = mount(
            createElement(Choropleth, {
                width: 600,
                height: 400,
                features,
                data,
                domain: [0, 100],
                legends,
            })
        )
        console.error = originalError

        // the legend is still rendered after wrapping the layer in a Fragment
        expect(wrapper.find(BoxLegendSvg).length).toBe(1)

        const keyWarning = calls.find(args => /unique "?key"?/i.test(String(args[0])))
        expect(keyWarning).toBeUndefined()
    })
})
