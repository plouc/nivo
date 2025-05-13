import { ResponsiveProps } from '@nivo/core'
import { Chord, ResponsiveChord, ChordSvgProps } from '@nivo/chord'
import { testChartResponsiveness } from '../../helpers/responsive'

const defaultData = {
    data: [
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0],
    ],
    keys: ['A', 'B', 'C', 'D'],
}

const defaultResponsiveProps: ResponsiveProps<ChordSvgProps> = {
    ...defaultData,
    margin: {
        top: 32,
        right: 32,
        bottom: 32,
        left: 32,
    },
    animate: false,
    role: 'chart',
}

const defaultProps: ChordSvgProps = {
    ...defaultResponsiveProps,
    width: 500,
    height: 500,
}

describe('Chord', () => {
    it('should render a chord chart', () => {
        cy.mount(<Chord {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveChord
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
