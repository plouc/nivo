import { useState, useEffect, ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Container, SvgWrapper } from '@nivo/core'
import { RectNodes, RectNodeSvg, NodeWithRectAndColor, RectLabels, RectLabelSvg } from '@nivo/rects'

interface ExtraArgs {
    motionConfig: string
}

const meta: Meta<ComponentProps<typeof RectNodes> & ExtraArgs> = {
    title: 'RectNodes',
    component: RectNodes,
    tags: ['autodocs'],
    argTypes: {
        transitionMode: {
            control: 'select',
            options: [
                'reveal-up',
                'reveal-right',
                'reveal-down',
                'reveal-left',
                'center',
                'flow-up',
                'flow-right',
                'flow-down',
                'flow-left',
            ],
        },
        motionConfig: {
            control: 'select',
            options: ['default', 'gentle', 'wobbly', 'stiff', 'slow', 'molasses'],
        },
    },
    args: {
        transitionMode: 'flow-up',
        motionConfig: 'gentle',
    },
}

export default meta
type Story = StoryObj<Meta<ComponentProps<typeof RectNodes> & ExtraArgs>>

const baseData: Record<'A' | 'B' | 'C' | 'D', Omit<NodeWithRectAndColor, 'rect'>> = {
    A: {
        id: 'A',
        color: '#b68e26',
    },
    B: {
        id: 'B',
        color: '#be6513',
    },
    C: {
        id: 'C',
        color: '#5f7a2f',
    },
    D: {
        id: 'D',
        color: '#80393b',
    },
}

const sampleData: NodeWithRectAndColor[][] = [
    [
        {
            ...baseData.A,
            rect: {
                x: 0,
                y: 0,
                width: 100,
                height: 100,
            },
        },
        {
            ...baseData.B,
            rect: {
                x: 100,
                y: 0,
                width: 300,
                height: 100,
            },
        },
        {
            ...baseData.C,
            rect: {
                x: 0,
                y: 100,
                width: 200,
                height: 300,
            },
        },
        {
            ...baseData.D,
            rect: {
                x: 200,
                y: 100,
                width: 200,
                height: 300,
            },
        },
    ],
    [
        {
            ...baseData.A,
            rect: {
                x: 0,
                y: 0,
                width: 400,
                height: 200,
            },
        },
        {
            ...baseData.D,
            rect: {
                x: 0,
                y: 200,
                width: 400,
                height: 200,
            },
        },
    ],
    [
        {
            ...baseData.A,
            rect: {
                x: 0,
                y: 0,
                width: 250,
                height: 150,
            },
        },
        {
            ...baseData.B,
            rect: {
                x: 250,
                y: 0,
                width: 150,
                height: 150,
            },
        },
        {
            ...baseData.C,
            rect: {
                x: 0,
                y: 150,
                width: 100,
                height: 250,
            },
        },
        {
            ...baseData.D,
            rect: {
                x: 100,
                y: 150,
                width: 300,
                height: 250,
            },
        },
    ],
    [
        {
            ...baseData.D,
            rect: {
                x: 0,
                y: 0,
                width: 400,
                height: 400,
            },
        },
    ],
    [
        {
            ...baseData.A,
            rect: {
                x: 0,
                y: 0,
                width: 100,
                height: 400,
            },
        },
        {
            ...baseData.B,
            rect: {
                x: 100,
                y: 0,
                width: 300,
                height: 100,
            },
        },
        {
            ...baseData.C,
            rect: {
                x: 100,
                y: 100,
                width: 300,
                height: 50,
            },
        },
        {
            ...baseData.D,
            rect: {
                x: 100,
                y: 150,
                width: 300,
                height: 250,
            },
        },
    ],
    [
        {
            ...baseData.A,
            rect: {
                x: 0,
                y: 0,
                width: 50,
                height: 400,
            },
        },
        {
            ...baseData.B,
            rect: {
                x: 50,
                y: 0,
                width: 300,
                height: 150,
            },
        },
        {
            ...baseData.C,
            rect: {
                x: 50,
                y: 150,
                width: 200,
                height: 100,
            },
        },
        {
            ...baseData.D,
            rect: {
                x: 50,
                y: 250,
                width: 100,
                height: 50,
            },
        },
    ],
    [],
]

export const TransitionModeShowcase: Story = {
    render: args => {
        const [current, setCurrent] = useState(0)

        useEffect(() => {
            const timer = setTimeout(() => {
                setCurrent((current + 1) % sampleData.length)
            }, 1600)

            return () => clearTimeout(timer)
        }, [current, setCurrent])

        return (
            <Container
                theme={{
                    background: '#dddddd',
                    text: {
                        fontSize: 20,
                        fontWeight: 600,
                    },
                }}
                motionConfig={args.motionConfig}
            >
                <SvgWrapper
                    width={500}
                    height={500}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                    <g transform="translate(50, 50)">
                        <RectNodes
                            uid="id"
                            nodes={sampleData[current]}
                            component={RectNodeSvg}
                            borderRadius={0}
                            borderColor="#000000"
                            borderWidth={0}
                            isInteractive={false}
                            transitionMode={args.transitionMode}
                        />
                        <RectLabels
                            uid="id"
                            nodes={sampleData[current]}
                            component={RectLabelSvg}
                            label="id"
                            boxAnchor="center"
                            textColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
                            transitionMode={args.transitionMode}
                        />
                    </g>
                </SvgWrapper>
            </Container>
        )
    },
}
