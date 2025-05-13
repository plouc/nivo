import { Margin } from '@nivo/core'
import { PolarBar, PolarBarSvgProps, PolarBarDatum } from '@nivo/polar-bar'

interface Datum extends PolarBarDatum {
    id: string
    x: number
    y: number
}

const sampleData: Datum[] = [
    { id: 'A', x: 5, y: 5 },
    { id: 'B', x: 3, y: 7 },
    { id: 'C', x: 0, y: 10 },
    { id: 'D', x: 10, y: 0 },
]

const arcIds = [
    'arc.A.x',
    'arc.A.y',
    'arc.B.x',
    'arc.B.y',
    'arc.C.x',
    'arc.C.y',
    'arc.D.x',
    'arc.D.y',
]

const defaultProps: Required<
    Pick<
        PolarBarSvgProps<Datum>,
        | 'data'
        | 'keys'
        | 'width'
        | 'height'
        | 'borderWidth'
        | 'borderColor'
        | 'cornerRadius'
        | 'animate'
    >
> & {
    margin: Margin
} = {
    data: sampleData,
    keys: ['x', 'y'],
    width: 540,
    height: 540,
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    borderWidth: 1,
    borderColor: '#ffffff',
    cornerRadius: 5,
    animate: false,
}

describe('PolarBar', () => {
    beforeEach(() => {
        cy.viewport(defaultProps.width, defaultProps.height)
    })

    it('should render a polar bar chart graph', () => {
        cy.mount(<PolarBar<Datum> {...defaultProps} />)

        arcIds.forEach(arcId => {
            cy.get(`[data-testid="${arcId}"]`).should('exist')
        })
    })

    it('should show a tooltip when hovering the arcs', () => {
        cy.mount(<PolarBar<Datum> {...defaultProps} />)

        sampleData.forEach(datum => {
            ;['x', 'y'].forEach(index => {
                const arc = cy.get(`[data-testid="arc.${datum.id}.${index}"]`)
                arc.should('exist')

                // If the arc has a zero value, skip.
                if (datum[index] === 0) return

                arc.trigger('mouseover')
                const tooltip = cy.get('svg + div')
                tooltip.should('exist')
                tooltip.should('contain', `${datum.id} - ${index}: ${datum[index]}`)
                tooltip.get('div > span:first-child').should('exist')

                arc.trigger('mouseout')
                cy.get('svg + div').should('not.exist')
            })
        })
    })
})
