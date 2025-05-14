import { ResponsiveProps } from '@nivo/core'
import { RadialBar, ResponsiveRadialBar, RadialBarSvgProps } from '@nivo/radial-bar'
import { testChartResponsiveness } from '../../helpers/responsive'

const defaultData = [
    {
        id: 'Combini',
        data: [
            { x: 'Fruits', y: 10 },
            { x: 'Vegetables', y: 10 },
            { x: 'Meat', y: 10 },
        ],
    },
    {
        id: 'Online',
        data: [
            { x: 'Fruits', y: 20 },
            { x: 'Vegetables', y: 20 },
            { x: 'Meat', y: 20 },
        ],
    },
    {
        id: 'Supermarket',
        data: [
            { x: 'Fruits', y: 30 },
            { x: 'Vegetables', y: 30 },
            { x: 'Meat', y: 30 },
        ],
    },
]

const responsiveDefaultProps: ResponsiveProps<RadialBarSvgProps> = {
    data: defaultData,
    margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
    },
    role: 'chart',
    animate: false,
}

const defaultProps: RadialBarSvgProps = {
    ...responsiveDefaultProps,
    width: 400,
    height: 400,
}

describe('RadialBar', () => {
    beforeEach(() => {
        cy.viewport(defaultProps.width, defaultProps.height)
    })

    it('should render a radial bar chart', () => {
        cy.mount(<RadialBar {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveRadialBar
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...responsiveDefaultProps}
        />
    ))
})
