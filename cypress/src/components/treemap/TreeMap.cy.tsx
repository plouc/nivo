import { ResponsiveProps } from '@nivo/core'
import { TreeMap, ResponsiveTreeMap, TreeMapSvgProps } from '@nivo/treemap'
import { testChartResponsiveness } from '../../helpers/responsive'
import { Datum, defaultData } from './shared'

const defaultResponsiveProps: ResponsiveProps<TreeMapSvgProps<Datum>> = {
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

const defaultProps: TreeMapSvgProps<Datum> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 300,
}

describe('TreeMap', () => {
    it('should render a treemap chart', () => {
        cy.mount(<TreeMap {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveTreeMap
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
