import { ResponsiveProps } from '@nivo/core'
import { Bar, ResponsiveBar, BarDatum, BarSvgProps } from '@nivo/bar'
import { testChartResponsiveness } from '../../helpers/responsive'

const defaultData: BarDatum[] = [
    { id: 'one', value: 10 },
    { id: 'two', value: 20 },
    { id: 'three', value: 30 },
]

const defaultResponsiveProps: ResponsiveProps<BarSvgProps<BarDatum>> = {
    data: defaultData,
    animate: false,
    role: 'chart',
}

const defaultProps: BarSvgProps<BarDatum> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 300,
}

describe('Bar', () => {
    it('should render a bar chart', () => {
        cy.mount(<Bar {...defaultProps} />, { strict: true })
    })

    testChartResponsiveness(defaults => (
        <ResponsiveBar
            {...defaultResponsiveProps}
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
        />
    ))
})
