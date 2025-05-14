import { ResponsiveProps } from '@nivo/core'
import { Stream, ResponsiveStream, StreamSvgProps } from '@nivo/stream'
import { testChartResponsiveness } from '../../helpers/responsive'

type Datum = {
    A: number
    B: number
    C: number
}

const defaultData = [
    { A: 10, B: 20, C: 30 },
    { A: 20, B: 10, C: 30 },
    { A: 30, B: 10, C: 20 },
]

const defaultResponsiveProps: ResponsiveProps<StreamSvgProps<Datum>> = {
    data: defaultData,
    keys: ['A', 'B', 'C'],
    margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
    },
    animate: false,
    role: 'chart',
}

const defaultProps: StreamSvgProps<Datum> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 300,
}

describe('Stream', () => {
    it('should render a stream chart', () => {
        cy.mount(<Stream {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveStream
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
