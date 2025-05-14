import { ResponsiveProps } from '@nivo/core'
import {
    HeatMapCanvas,
    ResponsiveHeatMapCanvas,
    HeatMapCanvasProps,
    DefaultHeatMapDatum,
} from '@nivo/heatmap'
import { testChartResponsiveness } from '../../helpers/responsive'
import { defaultData } from './shared'

const defaultResponsiveProps: ResponsiveProps<HeatMapCanvasProps<DefaultHeatMapDatum, {}>> = {
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

const defaultProps: HeatMapCanvasProps<DefaultHeatMapDatum, {}> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 500,
}

describe('HeatMapCanvas', () => {
    it('should render an heatmap chart', () => {
        cy.mount(<HeatMapCanvas {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveHeatMapCanvas
            pixelRatio={1}
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
