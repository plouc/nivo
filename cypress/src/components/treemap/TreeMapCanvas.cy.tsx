import { ResponsiveProps } from '@nivo/core'
import { TreeMapCanvas, ResponsiveTreeMapCanvas, TreeMapCanvasProps } from '@nivo/treemap'
import { testChartResponsiveness } from '../../helpers/responsive'
import { Datum, defaultData } from './shared'

const defaultResponsiveProps: ResponsiveProps<TreeMapCanvasProps<Datum>> = {
    data: defaultData,
    margin: {
        top: 3,
        right: 3,
        bottom: 3,
        left: 40,
    },
    animate: false,
    role: 'chart',
}

const defaultProps: TreeMapCanvasProps<Datum> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 300,
}

describe('TreeMapCanvas', () => {
    it('should render a treemap chart', () => {
        cy.mount(<TreeMapCanvas {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveTreeMapCanvas
            pixelRatio={1}
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
