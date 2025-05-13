import { ResponsiveProps } from '@nivo/core'
import { ChordCanvas, ResponsiveChordCanvas, ChordCanvasProps } from '@nivo/chord'
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

const defaultResponsiveProps: ResponsiveProps<ChordCanvasProps> = {
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

const defaultProps: ChordCanvasProps = {
    ...defaultResponsiveProps,
    width: 500,
    height: 500,
}

describe('ChordCanvas', () => {
    it('should render a chord chart', () => {
        cy.mount(<ChordCanvas {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveChordCanvas
            pixelRatio={1}
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
