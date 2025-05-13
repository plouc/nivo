import { BarCanvas, ResponsiveBarCanvas } from '@nivo/bar'
import { testChartResponsiveness } from '../../helpers/responsive'

describe('BarCanvas', () => {
    it('should render a bar chart', () => {
        cy.mount(
            <BarCanvas
                width={500}
                height={300}
                data={[
                    { id: 'one', value: 10 },
                    { id: 'two', value: 20 },
                    { id: 'three', value: 30 },
                ]}
            />
        )
    })

    testChartResponsiveness(defaults => (
        <ResponsiveBarCanvas
            data={[
                { id: 'one', value: 10 },
                { id: 'two', value: 20 },
                { id: 'three', value: 30 },
            ]}
            role="chart"
            pixelRatio={1}
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
        />
    ))
})
