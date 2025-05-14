import { ResponsiveProps } from '@nivo/core'
import { PieCanvas, ResponsivePieCanvas, PieCanvasProps } from '@nivo/pie'
import { testChartResponsiveness } from '../../helpers/responsive'
import { Datum, defaultData } from './shared'

const defaultResponsiveProps: ResponsiveProps<PieCanvasProps<Datum>> = {
    data: defaultData,
    margin: {
        top: 60,
        right: 60,
        bottom: 60,
        left: 60,
    },
    innerRadius: 0.6,
    role: 'chart',
}

const defaultProps: PieCanvasProps<Datum> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 500,
}

describe('PieCanvas', () => {
    it('should render a pie chart', () => {
        cy.mount(<PieCanvas<Datum> {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsivePieCanvas<Datum>
            pixelRatio={1}
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
