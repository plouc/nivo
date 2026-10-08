import { ResponsiveProps } from '@nivo/core'
import { TreeMapCanvas, ResponsiveTreeMapCanvas, TreeMapCanvasProps } from '@nivo/treemap'
import { testChartResponsiveness } from '../../helpers/responsive'
import { Datum, defaultData } from './shared'

const defaultResponsiveProps: ResponsiveProps<TreeMapCanvasProps<Datum>> = {
    data: defaultData,
    margin: {
        top: 3,
        right: 3,
        bottom: 3,
        left: 40,
    },
    animate: false,
    role: 'chart',
}

const defaultProps: TreeMapCanvasProps<Datum> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 300,
}

describe('TreeMapCanvas', () => {
    it('should render a treemap chart', () => {
        cy.mount(<TreeMapCanvas {...defaultProps} />)
    })

    const interactionProps: TreeMapCanvasProps<Datum> = {
        ...defaultProps,
        width: 300,
        height: 180,
        margin: { top: 20, right: 10, bottom: 10, left: 40 },
        data: {
            id: 'root',
            children: [
                {
                    id: 'parent',
                    children: [
                        { id: 'left', value: 1 },
                        { id: 'right', value: 1 },
                    ],
                },
            ],
        },
        value: 'value',
        tile: 'dice',
        outerPadding: 10,
        tooltip: ({ node }) => <div data-testid="node-tooltip">{node.id}</div>,
    }

    for (const pixelRatio of [1, 2]) {
        it(`should target the topmost node at pixel ratio ${pixelRatio}`, () => {
            cy.mount(
                <TreeMapCanvas
                    {...interactionProps}
                    pixelRatio={pixelRatio}
                    onMouseMove={cy.stub().as('onMouseMove')}
                    onClick={cy.stub().as('onClick')}
                />
            )

            // Children cover their ancestors; padding still belongs to the visible ancestor.
            for (const [id, x, y] of [
                ['left', 70, 80],
                ['right', 220, 80],
                ['parent', 55, 35],
                ['root', 45, 25],
            ] as const) {
                cy.get('canvas').trigger('mousemove', x, y)
                cy.get('@onMouseMove').its('lastCall.args.0.id').should('equal', id)
                cy.findByTestId('node-tooltip').should('have.text', id)
                cy.get('canvas').click(x, y)
                cy.get('@onClick').its('lastCall.args.0.id').should('equal', id)
            }

            cy.get('canvas').trigger('mousemove', 5, 5).click(5, 5)
            cy.findByTestId('node-tooltip').should('not.exist')
            cy.get('@onClick').should('have.callCount', 4)
        })
    }

    it('should only target leaves when leavesOnly is enabled', () => {
        cy.mount(
            <TreeMapCanvas {...interactionProps} leavesOnly onClick={cy.stub().as('onClick')} />
        )

        cy.get('canvas').trigger('mousemove', 70, 80).click(70, 80)
        cy.findByTestId('node-tooltip').should('have.text', 'left')
        cy.get('@onClick').its('lastCall.args.0.id').should('equal', 'left')

        cy.get('canvas').trigger('mousemove', 55, 35).click(55, 35)
        cy.findByTestId('node-tooltip').should('not.exist')
        cy.get('@onClick').should('have.been.calledOnce')
    })

    it('should not handle interactions when isInteractive is disabled', () => {
        cy.mount(
            <TreeMapCanvas
                {...interactionProps}
                isInteractive={false}
                onMouseMove={cy.stub().as('onMouseMove')}
                onClick={cy.stub().as('onClick')}
            />
        )

        cy.get('canvas').trigger('mousemove', 70, 80).click(70, 80)
        cy.findByTestId('node-tooltip').should('not.exist')
        cy.get('@onMouseMove').should('not.have.been.called')
        cy.get('@onClick').should('not.have.been.called')
    })

    testChartResponsiveness(defaults => (
        <ResponsiveTreeMapCanvas
            pixelRatio={1}
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
