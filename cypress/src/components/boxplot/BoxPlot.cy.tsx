import { ResponsiveProps } from '@nivo/core'
import { BoxPlot, ResponsiveBoxPlot, BoxPlotSvgProps } from '@nivo/boxplot'
import { testChartResponsiveness } from '../../helpers/responsive'

// dataset with two groups
const dataGroups = [
    { group: 'Alpha', value: 1 },
    { group: 'Alpha', value: 5 },
    { group: 'Beta', value: 2 },
    { group: 'Beta', value: 10 },
]

type SingleGroupDatum = (typeof dataGroups)[number]

// dataset with two groups and two subgroups
const dataSubGroups = [
    { group: 'Alpha', type: 'A', value: 10 },
    { group: 'Alpha', type: 'A', value: 10.5 },
    { group: 'Alpha', type: 'B', value: 11 },
    { group: 'Alpha', type: 'B', value: 11.5 },
]

const defaultResponsiveProps: ResponsiveProps<BoxPlotSvgProps<any>> = {
    data: dataGroups,
    animate: false,
    role: 'chart',
}

const defaultProps: BoxPlotSvgProps<any> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 300,
}

describe('BoxPlot', () => {
    it('should render a boxplot chart', () => {
        cy.mount(<BoxPlot<SingleGroupDatum> {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveBoxPlot<SingleGroupDatum>
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
