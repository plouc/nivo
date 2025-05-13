import { Line } from '@nivo/line'

describe('Line', () => {
    beforeEach(() => {
        cy.viewport(600, 500)
    })

    it('should support focusable points', () => {
        cy.mount(
            <Line
                width={600}
                height={500}
                margin={{ top: 100, right: 50, bottom: 50, left: 50 }}
                yScale={{ type: 'linear', stacked: true }}
                data={[
                    {
                        id: 'A',
                        data: [
                            { x: 'V', y: 30 },
                            { x: 'W', y: 0 },
                            { x: 'X', y: 30 },
                            { x: 'Y', y: 10 },
                            { x: 'Z', y: 20 },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            { x: 'V', y: 0 },
                            { x: 'W', y: 30 },
                            { x: 'X', y: 10 },
                            { x: 'Y', y: 30 },
                            { x: 'Z', y: 20 },
                        ],
                    },
                ]}
                animate={false}
                isFocusable={true}
            />
        )

        cy.get('[data-testid="line.point.A.0"]').should('exist')
        cy.get('[data-testid="line.point.A.1"]').should('exist')
        cy.get('[data-testid="line.point.A.2"]').should('exist')
        cy.get('[data-testid="line.point.A.3"]').should('exist')
        cy.get('[data-testid="line.point.A.4"]').should('exist')

        cy.get('[data-testid="line.point.B.0"]').should('exist')
        cy.get('[data-testid="line.point.B.1"]').should('exist')
        cy.get('[data-testid="line.point.B.2"]').should('exist')
        cy.get('[data-testid="line.point.B.3"]').should('exist')
        cy.get('[data-testid="line.point.B.4"]').should('exist')

        cy.get('[data-testid="line.point.A.0"]').focus()
        cy.get('svg + div').should('exist').should('contain', `x: V, y: 30`)
        cy.get('[data-testid="line.point.A.0"]').blur()
        cy.get('svg + div').should('not.exist')

        cy.get('[data-testid="line.point.A.2"]').focus()
        cy.get('svg + div').should('exist').should('contain', `x: X, y: 30`)
        cy.get('[data-testid="line.point.A.2"]').blur()
        cy.get('svg + div').should('not.exist')

        cy.get('[data-testid="line.point.B.2"]').focus()
        cy.get('svg + div').should('exist').should('contain', `x: X, y: 10`)
        cy.get('[data-testid="line.point.B.2"]').blur()
        cy.get('svg + div').should('not.exist')
    })
})
