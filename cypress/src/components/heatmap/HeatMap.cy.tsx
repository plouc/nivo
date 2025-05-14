import { ResponsiveProps } from '@nivo/core'
import { HeatMap, ResponsiveHeatMap, HeatMapSvgProps, DefaultHeatMapDatum } from '@nivo/heatmap'
import { testChartResponsiveness } from '../../helpers/responsive'
import { defaultData } from './shared'

const defaultResponsiveProps: ResponsiveProps<HeatMapSvgProps<DefaultHeatMapDatum, {}>> = {
    data: defaultData,
    margin: {
        top: 3,
        right: 3,
        bottom: 3,
        left: 3,
    },
    colors: { type: 'quantize', scheme: 'greens' },
    animate: false,
    role: 'chart',
}

const defaultProps: HeatMapSvgProps<DefaultHeatMapDatum, {}> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 500,
}

describe('HeatMap', () => {
    it('should render an heatmap chart', () => {
        cy.mount(<HeatMap {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveHeatMap
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
