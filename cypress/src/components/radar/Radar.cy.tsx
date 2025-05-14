import { ResponsiveProps } from '@nivo/core'
import { Radar, ResponsiveRadar, RadarSvgProps } from '@nivo/radar'
import { testChartResponsiveness } from '../../helpers/responsive'

type Datum = {
    A: number
    B: number
    category: string
}

const defaultData = [
    { A: 10, B: 20, category: 'first' },
    { A: 20, B: 30, category: 'second' },
    { A: 30, B: 10, category: 'third' },
]

const defaultResponsiveProps: ResponsiveProps<RadarSvgProps<Datum>> = {
    data: defaultData,
    keys: ['A', 'B'],
    indexBy: 'category',
    margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
    },
    animate: false,
    role: 'chart',
}

const defaultProps: RadarSvgProps<Datum> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 300,
}

describe('Radar', () => {
    it('should render a radar chart', () => {
        cy.mount(<Radar {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveRadar
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
