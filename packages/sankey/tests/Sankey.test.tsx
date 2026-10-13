import { create } from 'react-test-renderer'
import { Sankey } from '../src'
import { SankeyNodesItem } from '../src/SankeyNodesItem'
import { SankeyLinksItem } from '../src/SankeyLinksItem'

const sampleData = {
    nodes: [{ id: 'John' }, { id: 'Jane' }, { id: 'Albert' }],
    links: [
        { source: 'John', target: 'Jane', value: 10 },
        { source: 'Jane', target: 'Albert', value: 5 },
    ],
}

describe('Sankey', () => {
    it('should render a basic sankey chart', () => {
        const instance = create(
            <Sankey width={400} height={400} data={sampleData} animate={false} />
        ).root
        const svg = instance.findByType('svg')
        expect(svg).toBeDefined()
    })

    describe('accessibility', () => {
        it('should forward root aria properties to SVG', () => {
            const instance = create(
                <Sankey
                    width={400}
                    height={400}
                    data={sampleData}
                    animate={false}
                    ariaLabel="SankeyAriaLabel"
                    ariaLabelledBy="SankeyAriaLabelledBy"
                    ariaDescribedBy="SankeyAriaDescribedBy"
                />
            ).root

            const svg = instance.findByType('svg')
            expect(svg.props['aria-label']).toBe('SankeyAriaLabel')
            expect(svg.props['aria-labelledby']).toBe('SankeyAriaLabelledBy')
            expect(svg.props['aria-describedby']).toBe('SankeyAriaDescribedBy')
        })

        it('should add aria attributes to nodes', () => {
            const instance = create(
                <Sankey
                    width={400}
                    height={400}
                    data={sampleData}
                    animate={false}
                    nodeAriaLabel={node => `Node ${node.id}`}
                    nodeAriaLabelledBy={node => `label-${node.id}`}
                    nodeAriaDescribedBy={node => `desc-${node.id}`}
                    nodeAriaHidden={node => node.id === 'Jane'}
                    nodeAriaDisabled={node => node.id === 'Jane'}
                />
            ).root

            const nodes = instance.findAllByType(SankeyNodesItem)
            expect(nodes).toHaveLength(3)

            const rects = nodes.map(n => n.findByType('rect'))
            expect(rects[0].props['aria-label']).toBe('Node John')
            expect(rects[0].props['aria-labelledby']).toBe('label-John')
            expect(rects[0].props['aria-describedby']).toBe('desc-John')
            expect(rects[0].props['aria-hidden']).toBe(false)
            expect(rects[0].props['aria-disabled']).toBe(false)

            expect(rects[1].props['aria-label']).toBe('Node Jane')
            expect(rects[1].props['aria-labelledby']).toBe('label-Jane')
            expect(rects[1].props['aria-describedby']).toBe('desc-Jane')
            expect(rects[1].props['aria-hidden']).toBe(true)
            expect(rects[1].props['aria-disabled']).toBe(true)
        })

        it('should add aria attributes to links', () => {
            const instance = create(
                <Sankey
                    width={400}
                    height={400}
                    data={sampleData}
                    animate={false}
                    linkAriaLabel={link => `Link ${link.source.id}->${link.target.id}`}
                    linkAriaLabelledBy={link => `label-${link.source.id}-${link.target.id}`}
                    linkAriaDescribedBy={link => `desc-${link.source.id}-${link.target.id}`}
                    linkAriaHidden={link => link.source.id === 'Jane'}
                    linkAriaDisabled={link => link.source.id === 'Jane'}
                />
            ).root

            const links = instance.findAllByType(SankeyLinksItem)
            expect(links).toHaveLength(2)

            const paths = links.map(l => l.findByType('path'))
            expect(paths[0].props['aria-label']).toBe('Link John->Jane')
            expect(paths[0].props['aria-labelledby']).toBe('label-John-Jane')
            expect(paths[0].props['aria-describedby']).toBe('desc-John-Jane')
            expect(paths[0].props['aria-hidden']).toBe(false)
            expect(paths[0].props['aria-disabled']).toBe(false)

            expect(paths[1].props['aria-label']).toBe('Link Jane->Albert')
            expect(paths[1].props['aria-labelledby']).toBe('label-Jane-Albert')
            expect(paths[1].props['aria-describedby']).toBe('desc-Jane-Albert')
            expect(paths[1].props['aria-hidden']).toBe(true)
            expect(paths[1].props['aria-disabled']).toBe(true)
        })
    })
})
