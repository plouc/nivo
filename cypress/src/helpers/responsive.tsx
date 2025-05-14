import { ReactNode } from 'react'

export const testChartResponsiveness = (
    render: (defaults?: [number, number]) => ReactNode,
    {
        isHtml = false,
    }: {
        isHtml?: boolean
    } = {}
) => {
    describe('Responsiveness', () => {
        it('should adapt to the container size', () => {
            cy.viewport(600, 400)

            cy.mount(
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        height: '100%',
                        overflow: 'hidden',
                        padding: 0,
                    }}
                >
                    {render()}
                </div>
            )

            let root = cy.findByRole('chart').should('exist')
            if (!isHtml) {
                root.should('have.attr', 'width', 600).and('have.attr', 'height', 400)
            } else {
                root.should('have.css', 'width', `${600}px`).and('have.css', 'height', `${400}px`)
            }

            cy.viewport(500, 300)

            root = cy.findByRole('chart').should('exist')
            if (!isHtml) {
                root.should('have.attr', 'width', 500).and('have.attr', 'height', 300)
            } else {
                root.should('have.css', 'width', `${500}px`).and('have.css', 'height', `${300}px`)
            }
        })

        it('should support CSS grids', () => {
            cy.mount(
                <div
                    style={{
                        width: 616,
                        height: 300,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        columnGap: '16px',
                    }}
                >
                    {/*
                    The wrapper is necessary, probably for the same reason as for flexbox.
                    https://github.com/bvaughn/react-virtualized-auto-sizer?tab=readme-ov-file#can-i-use-this-component-with-flexbox
                    */}
                    <div>{render()}</div>
                    <div style={{ width: 100, height: 300, backgroundColor: '#aaaaaa' }} />
                </div>
            )

            const root = cy.findByRole('chart').should('exist')
            if (!isHtml) {
                root.should('have.attr', 'width', 300).and('have.attr', 'height', 300)
            } else {
                root.should('have.css', 'width', `${300}px`).and('have.css', 'height', `${300}px`)
            }
        })

        it('should support flexbox', () => {
            cy.mount(
                <div
                    style={{
                        display: 'flex',
                        width: '600px',
                    }}
                >
                    {/*
                    https://github.com/bvaughn/react-virtualized-auto-sizer?tab=readme-ov-file#can-i-use-this-component-with-flexbox
                    */}
                    <div style={{ flex: '1 1 auto' }}>{render()}</div>
                    <div style={{ width: 100, height: 300, backgroundColor: '#aaaaaa' }} />
                </div>
            )

            const root = cy.findByRole('chart').should('exist')
            if (!isHtml) {
                root.should('have.attr', 'width', 500).and('have.attr', 'height', 300)
            } else {
                root.should('have.css', 'width', `${500}px`).and('have.css', 'height', `${300}px`)
            }
        })

        it('should support default dimensions', () => {
            // We cannot really test the dimensions of the chart here,
            // because the dimensions are immediately adjusted.
            cy.mount(<div>{render([200, 200])}</div>)
        })
    })
}
