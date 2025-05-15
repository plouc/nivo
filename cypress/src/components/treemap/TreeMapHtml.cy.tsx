import { ResponsiveProps } from '@nivo/core'
import { TreeMapHtml, ResponsiveTreeMapHtml, TreeMapHtmlProps } from '@nivo/treemap'
import { testChartResponsiveness } from '../../helpers/responsive'
import { Datum, defaultData } from './shared'

const defaultResponsiveProps: ResponsiveProps<TreeMapHtmlProps<Datum>> = {
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

const defaultProps: TreeMapHtmlProps<Datum> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 300,
}

describe('TreeMapHtml', () => {
    it('should render a treemap chart', () => {
        cy.mount(<TreeMapHtml {...defaultProps} />)
    })

    testChartResponsiveness(
        defaults => (
            <ResponsiveTreeMapHtml
                defaultWidth={defaults?.[0]}
                defaultHeight={defaults?.[1]}
                {...defaultResponsiveProps}
            />
        ),
        { isHtml: true }
    )
})
