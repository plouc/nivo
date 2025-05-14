import { ResponsiveProps } from '@nivo/core'
import { Sankey, ResponsiveSankey, SankeySvgProps, DefaultNode, DefaultLink } from '@nivo/sankey'
import { testChartResponsiveness } from '../../helpers/responsive'

const defaultData = {
    nodes: [
        {
            id: 'John',
        },
        {
            id: 'Raoul',
        },
        {
            id: 'Jane',
        },
        {
            id: 'Marcel',
        },
        {
            id: 'Ibrahim',
        },
        {
            id: 'Junko',
        },
    ],
    links: [
        {
            source: 'Marcel',
            target: 'Raoul',
            value: 104,
        },
        {
            source: 'Marcel',
            target: 'Junko',
            value: 134,
        },
        {
            source: 'Marcel',
            target: 'Ibrahim',
            value: 119,
        },
        {
            source: 'Marcel',
            target: 'Jane',
            value: 172,
        },
        {
            source: 'John',
            target: 'Raoul',
            value: 117,
        },
        {
            source: 'John',
            target: 'Junko',
            value: 184,
        },
        {
            source: 'John',
            target: 'Marcel',
            value: 12,
        },
        {
            source: 'Junko',
            target: 'Jane',
            value: 8,
        },
        {
            source: 'Raoul',
            target: 'Jane',
            value: 142,
        },
        {
            source: 'Raoul',
            target: 'Junko',
            value: 133,
        },
    ],
}

const defaultResponsiveProps: ResponsiveProps<SankeySvgProps<DefaultNode, DefaultLink>> = {
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

const defaultProps: SankeySvgProps<DefaultNode, DefaultLink> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 500,
}

describe('Sankey', () => {
    it('should render a sankey chart', () => {
        cy.mount(<Sankey {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveSankey
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
