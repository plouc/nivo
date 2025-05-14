import { ResponsiveProps } from '@nivo/core'
import {
    CirclePackingCanvas,
    ResponsiveCirclePackingCanvas,
    CirclePackingCanvasProps,
} from '@nivo/circle-packing'
import { testChartResponsiveness } from '../../helpers/responsive'
import { Datum, defaultData } from './shared'

const defaultResponsiveProps: ResponsiveProps<CirclePackingCanvasProps<Datum>> = {
    data: defaultData,
    margin: {
        top: 3,
        right: 3,
        bottom: 3,
        left: 3,
    },
    animate: false,
    role: 'chart',
}

const defaultProps: CirclePackingCanvasProps<Datum> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 500,
}

describe('CirclePackingCanvas', () => {
    it('should render a circle-packing chart', () => {
        cy.mount(<CirclePackingCanvas {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveCirclePackingCanvas
            pixelRatio={1}
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
