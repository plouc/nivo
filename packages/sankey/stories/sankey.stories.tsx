import { Meta } from '@storybook/react'
import { generateSankeyData, randColor } from '@nivo/generators'
import { SankeyNodeMinimal } from 'd3-sankey'
// @ts-ignore
import { Sankey } from '../src'
import { PropsWithChildren } from 'react'

export default {
    component: Sankey,
    title: 'Sankey',
} as Meta

const sankeyData = generateSankeyData({ nodeCount: 11, maxIterations: 2 })
const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 0, right: 80, bottom: 0, left: 80 },
    data: sankeyData,
    colors: { scheme: 'category10' as const },
}

export const Defaut = () => <Sankey {...commonProperties} />

export const CustomAlign = () => <Sankey {...commonProperties} align="end" />

export const OutsideLabels = () => <Sankey {...commonProperties} labelPosition="outside" />

export const VerticalLabels = () => (
    <Sankey {...commonProperties} labelOrientation="vertical" labelPadding={20} />
)

export const ContractingLinks = () => <Sankey {...commonProperties} linkContract={10} />

export const ClickHandler = () => (
    <Sankey {...commonProperties} onClick={(data, event) => console.log({ data, event })} />
)

export const CustomLabel = () => <Sankey {...commonProperties} label={node => `${node.id} 😁`} />

export const FormattedValues = () => (
    <Sankey
        {...commonProperties}
        valueFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
)

const CustomTooltipContainer = ({ children }: PropsWithChildren<any>) => (
    <div
        style={{
            padding: 9,
            background: '#eeeeee',
            borderRadius: '2px',
            border: '1px solid #aaaaaa',
        }}
    >
        {children}
    </div>
)

export const CustomTooltips = () => (
    <Sankey
        {...commonProperties}
        nodeTooltip={({ node }) => (
            <CustomTooltipContainer>
                Custom tooltip for node:
                <br />
                <strong>{node.label}</strong>
            </CustomTooltipContainer>
        )}
        linkTooltip={({ link }) => (
            <CustomTooltipContainer>
                Custom tooltip for link:
                <br />
                <strong>{link.source.label}</strong> to <strong>{link.target.label}</strong>
            </CustomTooltipContainer>
        )}
    />
)

const dataWithRandLinkColors = (data: typeof sankeyData) => ({
    nodes: data.nodes.map(node => ({
        ...node,
        nodeColor: 'blue',
    })),
    links: data.links.map(link => ({
        ...link,
        startColor: randColor(),
        endColor: randColor(),
    })),
})

export const CustomNodeAndLinkColors = () => (
    <Sankey
        {...commonProperties}
        data={dataWithRandLinkColors(sankeyData)}
        enableLinkGradient={true}
        colors={node => node.nodeColor}
    />
)

const minNodeValueOnTop = (
    nodeA: SankeyNodeMinimal<any, any>,
    nodeB: SankeyNodeMinimal<any, any>
) => {
    if (nodeA.value! < nodeB.value!) return -1
    if (nodeA.value! > nodeB.value!) return 1
    return 0
}

// min node value on top
export const WithReverseSortOrdering = () => (
    <Sankey {...commonProperties} sort={minNodeValueOnTop} />
)

export const SortLinksByInput = () => (
    <Sankey
        {...commonProperties}
        data={{
            nodes: [
                { id: 'foo_left', nodeColor: '#ff0000' },
                { id: 'bar_left', nodeColor: '#0000ff' },
                { id: 'baz_left', nodeColor: '#00ff00' },
                { id: 'foo_right', nodeColor: '#ff0000' },
                { id: 'bar_right', nodeColor: '#0000ff' },
                { id: 'baz_right', nodeColor: '#00ff00' },
            ],
            links: [
                { source: 'foo_left', target: 'bar_right', value: 5 },
                { source: 'foo_left', target: 'baz_right', value: 5 },
                { source: 'bar_left', target: 'foo_right', value: 5 },
                { source: 'bar_left', target: 'bar_right', value: 5 },
                { source: 'bar_left', target: 'baz_right', value: 5 },
                { source: 'baz_left', target: 'bar_right', value: 5 },
            ],
        }}
        colors={node => node.nodeColor}
        sort="input"
        enableLinkGradient
    />
)
