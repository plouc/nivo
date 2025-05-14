import { ResponsiveProps } from '@nivo/core'
import {
    CirclePackingHtml,
    ResponsiveCirclePackingHtml,
    CirclePackingHtmlProps,
} from '@nivo/circle-packing'
import { testChartResponsiveness } from '../../helpers/responsive'
import { Datum, defaultData } from './shared'

const defaultResponsiveProps: ResponsiveProps<CirclePackingHtmlProps<Datum>> = {
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

const defaultProps: CirclePackingHtmlProps<Datum> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 500,
}

describe('CirclePackingHtml', () => {
    it('should render a circle-packing chart', () => {
        cy.mount(<CirclePackingHtml {...defaultProps} />)
    })

    testChartResponsiveness(
        defaults => (
            <ResponsiveCirclePackingHtml
                defaultWidth={defaults?.[0]}
                defaultHeight={defaults?.[1]}
                {...defaultResponsiveProps}
            />
        ),
        { isHtml: true }
    )
})
