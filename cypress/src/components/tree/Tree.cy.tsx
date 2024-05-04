import { Tree, TreeSvgProps } from '@nivo/tree'
import { before } from 'lodash'

interface Datum {
    id: string
    children?: Datum[]
}

const sampleData: Datum = {
    id: 'A',
    children: [
        { id: '0' },
        {
            id: '1',
            children: [{ id: 'A' }, { id: 'B' }],
        },
        { id: '2' },
    ],
}

const defaultProps: Pick<
    TreeSvgProps<Datum>,
    | 'data'
    | 'width'
    | 'height'
    | 'margin'
    | 'nodeSize'
    | 'activeNodeSize'
    | 'inactiveNodeSize'
    | 'linkThickness'
    | 'activeLinkThickness'
    | 'inactiveLinkThickness'
    | 'animate'
> = {
    data: sampleData,
    width: 640,
    height: 640,
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    nodeSize: 12,
    activeNodeSize: 24,
    inactiveNodeSize: 8,
    linkThickness: 2,
    activeLinkThickness: 12,
    inactiveLinkThickness: 1,
    animate: false,
}

describe('<Tree />', () => {
    beforeEach(() => {
        cy.viewport(
            defaultProps.margin.left + defaultProps.width + defaultProps.margin.right,
            defaultProps.margin.top + defaultProps.height + defaultProps.margin.bottom
        )
    })

    it('should render a tree graph', () => {
        cy.mount(<Tree<Datum> {...defaultProps} />)

        cy.get('[data-testid="node.A"]').should('exist')
        cy.get('[data-testid="node.A.0"]').should('exist')
        cy.get('[data-testid="node.A.1"]').should('exist')
        cy.get('[data-testid="node.A.1.A"]').should('exist')
        cy.get('[data-testid="node.A.1.B"]').should('exist')
        cy.get('[data-testid="node.A.2"]').should('exist')
    })

    it('should highlight ancestor nodes and links', () => {
        cy.mount(
            <Tree<Datum>
                {...defaultProps}
                useMesh={false}
                highlightAncestorNodes={true}
                highlightAncestorLinks={true}
            />
        )

        const expectations = [
            { uid: 'node.A', nodes: ['node.A'], links: [] },
            { uid: 'node.A.0', nodes: ['node.A', 'node.A.0'], links: ['link.A:A.0'] },
            { uid: 'node.A.1', nodes: ['node.A', 'node.A.1'], links: ['link.A:A.1'] },
            {
                uid: 'node.A.1.A',
                nodes: ['node.A', 'node.A.1', 'node.A.1.A'],
                links: ['link.A:A.1', 'link.A.1:A.1.A'],
            },
            {
                uid: 'node.A.1.B',
                nodes: ['node.A', 'node.A.1', 'node.A.1.B'],
                links: ['link.A:A.1', 'link.A.1:A.1.B'],
            },
            { uid: 'node.A.2', nodes: ['node.A', 'node.A.2'], links: ['link.A:A.2'] },
        ]

        for (const expectation of expectations) {
            cy.get(`[data-testid="${expectation.uid}"]`).trigger('mouseover')
            cy.wait(100)

            cy.get('[data-testid^="node."]').each($node => {
                cy.wrap($node)
                    .invoke('attr', 'data-testid')
                    .then(testId => {
                        const size = expectation.nodes.includes(testId!)
                            ? defaultProps.activeNodeSize
                            : defaultProps.inactiveNodeSize
                        cy.wrap($node)
                            .invoke('attr', 'r')
                            .should('equal', `${size / 2}`)
                    })
            })

            cy.get('[data-testid^="link."]').each($link => {
                cy.wrap($link)
                    .invoke('attr', 'data-testid')
                    .then(testId => {
                        const thickness = expectation.links.includes(testId!)
                            ? defaultProps.activeLinkThickness
                            : defaultProps.inactiveLinkThickness
                        cy.wrap($link)
                            .invoke('attr', 'stroke-width')
                            .should('equal', `${thickness}`)
                    })
            })
        }
    })

    it('should highlight descendant nodes and links', () => {
        cy.mount(
            <Tree<Datum>
                {...defaultProps}
                useMesh={false}
                highlightAncestorNodes={false}
                highlightAncestorLinks={false}
                highlightDescendantNodes={true}
                highlightDescendantLinks={true}
            />
        )

        const expectations = [
            {
                uid: 'node.A',
                nodes: ['node.A', 'node.A.0', 'node.A.1', 'node.A.1.A', 'node.A.1.B', 'node.A.2'],
                links: [],
            },
            { uid: 'node.A.0', nodes: ['node.A.0'], links: [] },
            { uid: 'node.A.1', nodes: ['node.A.1', 'node.A.1.A', 'node.A.1.B'], links: [] },
            { uid: 'node.A.1.A', nodes: ['node.A.1.A'], links: [] },
            { uid: 'node.A.1.B', nodes: ['node.A.1.B'], links: [] },
            { uid: 'node.A.2', nodes: ['node.A.2'], links: [] },
        ]

        for (const expectation of expectations) {
            cy.get(`[data-testid="${expectation.uid}"]`).trigger('mouseover')
            cy.wait(100)

            cy.get('[data-testid^="node."]').each($node => {
                cy.wrap($node)
                    .invoke('attr', 'data-testid')
                    .then(testId => {
                        const size = expectation.nodes.includes(testId!)
                            ? defaultProps.activeNodeSize
                            : defaultProps.inactiveNodeSize
                        cy.wrap($node)
                            .invoke('attr', 'r')
                            .should('equal', `${size / 2}`)
                    })
            })
        }
    })
})
