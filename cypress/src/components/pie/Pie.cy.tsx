import { ResponsiveProps } from '@nivo/core'
import { Pie, ResponsivePie, PieSvgProps } from '@nivo/pie'
import { testChartResponsiveness } from '../../helpers/responsive'
import { Datum, defaultData } from './shared'

const defaultResponsiveProps: ResponsiveProps<PieSvgProps<Datum>> = {
    data: defaultData,
    margin: {
        top: 60,
        right: 60,
        bottom: 60,
        left: 60,
    },
    innerRadius: 0.6,
    animate: false,
    role: 'chart',
}

const defaultProps: PieSvgProps<Datum> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 500,
}

describe('Pie', () => {
    it('should render a pie chart', () => {
        cy.mount(<Pie<Datum> {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsivePie<Datum>
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
