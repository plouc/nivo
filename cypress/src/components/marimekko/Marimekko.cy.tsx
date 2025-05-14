import { ResponsiveProps } from '@nivo/core'
import { Marimekko, ResponsiveMarimekko, SvgProps } from '@nivo/marimekko'
import { testChartResponsiveness } from '../../helpers/responsive'

interface Datum {
    statement: string
    participation: number
    agree: number
    neutral: number
    disagree: number
}

const defaultData: Datum[] = [
    {
        statement: "it's good",
        participation: 6,
        agree: 28,
        neutral: 3,
        disagree: 11,
    },
    {
        statement: "it's sweet",
        participation: 14,
        agree: 2,
        neutral: 6,
        disagree: 21,
    },
    {
        statement: "it's spicy",
        participation: 19,
        agree: 28,
        neutral: 19,
        disagree: 11,
    },
]

const defaultResponsiveProps: ResponsiveProps<SvgProps<Datum>> = {
    data: defaultData,
    id: 'statement',
    value: 'participation',
    dimensions: [
        {
            id: 'agree',
            value: 'agree',
        },
        {
            id: 'neutral',
            value: 'neutral',
        },
        {
            id: 'disagree',
            value: 'disagree',
        },
    ],
    margin: {
        top: 36,
        right: 50,
        bottom: 36,
        left: 50,
    },
    axisLeft: {},
    axisRight: {},
    axisBottom: {},
    animate: false,
    role: 'chart',
}

const defaultProps: SvgProps<Datum> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 500,
}

describe('Marimekko', () => {
    it('should render a marimekko chart', () => {
        cy.mount(<Marimekko<Datum> {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveMarimekko<Datum>
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
