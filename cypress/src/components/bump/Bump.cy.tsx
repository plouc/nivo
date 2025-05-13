import { ResponsiveProps } from '@nivo/core'
import { Bump, ResponsiveBump, BumpSvgPropsWithSeriesMouseHandlers } from '@nivo/bump'
import { testChartResponsiveness } from '../../helpers/responsive'

interface Datum {
    x: number
    y: number
}

const defaultData = [
    {
        id: 'A',
        data: [
            {
                x: 2000,
                y: 9,
            },
            {
                x: 2001,
                y: 9,
            },
            {
                x: 2002,
                y: 2,
            },
            {
                x: 2003,
                y: 4,
            },
        ],
    },
    {
        id: 'B',
        data: [
            {
                x: 2000,
                y: 8,
            },
            {
                x: 2001,
                y: 3,
            },
            {
                x: 2002,
                y: 1,
            },
            {
                x: 2003,
                y: 7,
            },
        ],
    },
    {
        id: 'C',
        data: [
            {
                x: 2000,
                y: 12,
            },
            {
                x: 2001,
                y: 4,
            },
            {
                x: 2002,
                y: 5,
            },
            {
                x: 2003,
                y: 6,
            },
        ],
    },
]

const defaultResponsiveProps: ResponsiveProps<BumpSvgPropsWithSeriesMouseHandlers<Datum, {}>> = {
    data: defaultData,
    margin: {
        top: 24,
        right: 40,
        bottom: 24,
        left: 40,
    },
    animate: false,
    role: 'chart',
}

const defaultProps: BumpSvgPropsWithSeriesMouseHandlers<Datum, {}> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 300,
}

describe('Bump', () => {
    it('should render a bump chart', () => {
        cy.mount(<Bump {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveBump
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
