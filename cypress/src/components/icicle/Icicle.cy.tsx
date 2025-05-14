import { linearGradientDef, patternDotsDef, BoxAnchor, ResponsiveProps } from '@nivo/core'
import { colorSchemes } from '@nivo/colors'
import {
    Icicle,
    ResponsiveIcicle,
    IcicleSvgProps,
    DefaultIcicleDatum,
    IcicleCommonCustomLayerProps,
} from '@nivo/icicle'
import { useTheme } from '@nivo/theming'
import { Text } from '@nivo/text'
import get from 'lodash/get.js'
import { testChartResponsiveness } from '../../helpers/responsive'

const hexToRgba = (hex: string, alpha = 1): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const getNode = <N,>(root: N, path: string): N => get(root, path)

const defaultData: DefaultIcicleDatum = {
    id: 'root',
    children: [
        {
            id: 'A',
            children: [
                {
                    id: '0',
                    value: 25,
                },
                {
                    id: '1',
                    value: 25,
                },
            ],
        },
        {
            id: 'B',
            value: 50,
        },
    ],
}

const deeperData = {
    id: 'root',
    children: [
        {
            id: 'A',
            children: [
                {
                    id: '0',
                    children: [
                        {
                            id: 'X',
                            value: 10,
                        },
                        {
                            id: 'Y',
                            value: 15,
                        },
                    ],
                },
                {
                    id: '1',
                    value: 25,
                },
            ],
        },
        {
            id: 'B',
            value: 50,
        },
    ],
}

interface DatumWithColor extends DefaultIcicleDatum {
    color: string
    children?: DatumWithColor[]
}

const dataWithColor: DatumWithColor = {
    id: defaultData.id,
    color: '#73292b',
    children: [
        {
            id: defaultData.children![0].id,
            color: '#80393b',
            children: [
                {
                    id: defaultData.children![0].children![0].id,
                    value: defaultData.children![0].children![0].value,
                    color: '#9d7f2f',
                },
                {
                    id: defaultData.children![0].children![1].id,
                    value: defaultData.children![0].children![1].value,
                    color: '#9d7f2f',
                },
            ],
        },
        {
            id: defaultData.children![1].id,
            value: defaultData.children![1].value,
            color: '#be6513',
        },
    ],
}

interface CustomDatum {
    name: string
    size?: number
    children?: CustomDatum[]
}

const customData: CustomDatum = {
    name: 'root',
    children: [
        {
            name: 'A',
            children: [
                {
                    name: '0',
                    size: 25,
                },
                {
                    name: '1',
                    size: 25,
                },
            ],
        },
        {
            name: 'B',
            size: 50,
        },
    ],
}

const responsiveDefaultProps: ResponsiveProps<IcicleSvgProps<DefaultIcicleDatum>> = {
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },
    gapX: 2,
    gapY: 2,
    enableZooming: false,
    animate: false,
    theme: {
        text: {
            fontFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
        },
    },
    data: defaultData,
}

const defaultProps: IcicleSvgProps<DefaultIcicleDatum> = {
    ...responsiveDefaultProps,
    width: 400,
    height: 400,
}

// Remove the gaps and margins to get nice round values,
// As the chart is 400x400, we'll have a max depth of 4,
// so that we can use multiple of 100 for most assertions.
const propsForLayoutTesting: IcicleSvgProps<DefaultIcicleDatum> = {
    ...defaultProps,
    margin: {},
    gapX: 0,
    gapY: 0,
    data: deeperData,
    colors: { scheme: 'tableau10' },
    inheritColorFromParent: false,
    enableLabels: true,
}

interface ExpectedNode {
    // Used to select the nodes/labels by test id.
    path: string
    // If provided, test the node's transform and dimensions.
    rect?: {
        x: number
        y: number
        width?: number
        height?: number
    }
    color?: string
    // For patterns and gradients
    fill?: string
    // If provided, test that the provided value is contained
    // in the tooltip.
    // This also determines if we try to hover the node or not.
    tooltip?: string
    // If provided, test that the provided value is contained
    // in the label text element.
    label?: string
    labelLayout?: {
        position?: [number, number]
        rotation?: number
        align?: string
        baseline?: string
    }
    aria?: {
        role?: string
        level?: number
        label?: string
        labelledBy?: string
        describedBy?: string
        hidden?: boolean
    }
}

const testNode = (expectedNode: ExpectedNode) => {
    const node = cy.findByTestId(`icicle.rect.${expectedNode.path}`).should('exist')

    if (expectedNode.rect) {
        node.should(
            'have.attr',
            'transform',
            `translate(${expectedNode.rect.x},${expectedNode.rect.y})`
        )

        if (expectedNode.rect.width !== undefined) {
            node.should('have.attr', 'width', expectedNode.rect.width)
        }
        if (expectedNode.rect.height !== undefined) {
            node.should('have.attr', 'height', expectedNode.rect.height)
        }
    }

    if (expectedNode.color) {
        node.should('have.attr', 'fill', hexToRgba(expectedNode.color))
    } else if (expectedNode.fill) {
        node.should('have.attr', 'fill', expectedNode.fill)
    }

    if (expectedNode.tooltip) {
        node.trigger('mouseover')
        cy.findByRole('tooltip').should('exist').and('contain', expectedNode.tooltip)

        node.trigger('mouseout')
        cy.findByRole('tooltip').should('not.exist')
    }

    if (expectedNode.label || expectedNode.labelLayout) {
        const label = cy.findByTestId(`icicle.label.${expectedNode.path}`).should('exist')

        if (expectedNode.label) {
            label.should('contain', expectedNode.label)
        }

        if (expectedNode.labelLayout) {
            if (expectedNode.labelLayout.align) {
                label.should('have.attr', 'text-anchor', expectedNode.labelLayout.align)
            }
            if (expectedNode.labelLayout.baseline) {
                label.should('have.attr', 'dominant-baseline', expectedNode.labelLayout.baseline)
            }

            if (expectedNode.labelLayout.position) {
                const labelRotation = expectedNode.labelLayout.rotation ?? 0
                const expectedLabelTransform = `translate(${expectedNode.labelLayout.position[0]},${expectedNode.labelLayout.position[1]}) rotate(${labelRotation})`

                label.should('have.attr', 'transform', expectedLabelTransform)
            }
        }
    }

    if (expectedNode.aria) {
        if (expectedNode.aria.role) {
            node.should('have.attr', 'role', expectedNode.aria.role)
        }
        if (expectedNode.aria.level) {
            node.should('have.attr', 'aria-level', expectedNode.aria.level)
        }
        if (expectedNode.aria.label) {
            node.should('have.attr', 'aria-label', expectedNode.aria.label)
        }
        if (expectedNode.aria.labelledBy) {
            node.should('have.attr', 'aria-labelledby', expectedNode.aria.labelledBy)
        }
        if (expectedNode.aria.describedBy) {
            node.should('have.attr', 'aria-describedby', expectedNode.aria.describedBy)
        }
        if (expectedNode.aria.hidden !== undefined) {
            node.should('have.attr', 'aria-hidden', `${expectedNode.aria.hidden}`)
        }
    }
}

const testNodes = (expectedNodes: ExpectedNode[]) => {
    for (const expectedNode of expectedNodes) {
        testNode(expectedNode)
    }
}

describe('Icicle', () => {
    beforeEach(() => {
        cy.viewport(420, 420)
    })

    it('should render an icicle chart', () => {
        cy.mount(<Icicle<DefaultIcicleDatum> {...defaultProps} />)

        testNodes([
            {
                path: 'root',
            },
            {
                path: 'root.A',
            },
            {
                path: 'root.A.0',
            },
            {
                path: 'root.A.1',
            },
            {
                path: 'root.B',
            },
        ])
    })

    describe('identity & value', () => {
        it('should support custom id and value accessor defined as a path', () => {
            cy.mount(
                <Icicle<CustomDatum>
                    {...(defaultProps as unknown as IcicleSvgProps<CustomDatum>)}
                    identity="name"
                    value="size"
                    data={customData}
                />
            )

            testNodes([
                {
                    path: 'root',
                },
                {
                    path: 'root.A',
                },
                {
                    path: 'root.A.0',
                },
                {
                    path: 'root.A.1',
                },
                {
                    path: 'root.B',
                },
            ])
        })

        it('should support custom id and value accessor defined as a function', () => {
            cy.mount(
                <Icicle<CustomDatum>
                    {...(defaultProps as unknown as IcicleSvgProps<CustomDatum>)}
                    identity={d => d.name}
                    value={d => d.size ?? 0}
                    data={customData}
                />
            )

            testNodes([
                {
                    path: 'root',
                },
                {
                    path: 'root.A',
                },
                {
                    path: 'root.A.0',
                },
                {
                    path: 'root.A.1',
                },
                {
                    path: 'root.B',
                },
            ])
        })
    })

    describe('layout', () => {
        it('should have bottom orientation by default', () => {
            cy.mount(<Icicle<DefaultIcicleDatum> {...propsForLayoutTesting} />)

            testNodes([
                {
                    path: 'root',
                    rect: {
                        x: 0,
                        y: 0,
                        width: 400,
                        height: 100,
                    },
                },
                {
                    path: 'root.A',
                    rect: {
                        x: 0,
                        y: 100,
                        width: 200,
                        height: 100,
                    },
                },
                {
                    path: 'root.B',
                    rect: {
                        x: 200,
                        y: 100,
                        width: 200,
                        height: 100,
                    },
                },
                {
                    path: 'root.A.0',
                    rect: {
                        x: 0,
                        y: 200,
                        width: 100,
                        height: 100,
                    },
                },
                {
                    path: 'root.A.0.X',
                    rect: {
                        x: 0,
                        y: 300,
                        width: 40,
                        height: 100,
                    },
                },
            ])
        })

        it('should support top orientation', () => {
            cy.mount(<Icicle<DefaultIcicleDatum> {...propsForLayoutTesting} orientation="top" />)

            testNodes([
                {
                    path: 'root',
                    rect: {
                        x: 0,
                        y: 300,
                        width: 400,
                        height: 100,
                    },
                },
                {
                    path: 'root.A',
                    rect: {
                        x: 0,
                        y: 200,
                        width: 200,
                        height: 100,
                    },
                },
                {
                    path: 'root.B',
                    rect: {
                        x: 200,
                        y: 200,
                        width: 200,
                        height: 100,
                    },
                },
                {
                    path: 'root.A.0',
                    rect: {
                        x: 0,
                        y: 100,
                        width: 100,
                        height: 100,
                    },
                },
                {
                    path: 'root.A.0.X',
                    rect: {
                        x: 0,
                        y: 0,
                        width: 40,
                        height: 100,
                    },
                },
            ])
        })

        it('should support right orientation', () => {
            cy.mount(<Icicle<DefaultIcicleDatum> {...propsForLayoutTesting} orientation="right" />)

            testNodes([
                {
                    path: 'root',
                    rect: {
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 400,
                    },
                },
                {
                    path: 'root.A',
                    rect: {
                        x: 100,
                        y: 0,
                        width: 100,
                        height: 200,
                    },
                },
                {
                    path: 'root.B',
                    rect: {
                        x: 100,
                        y: 200,
                        width: 100,
                        height: 200,
                    },
                },
                {
                    path: 'root.A.0',
                    rect: {
                        x: 200,
                        y: 0,
                        width: 100,
                        height: 100,
                    },
                },
                {
                    path: 'root.A.0.X',
                    rect: {
                        x: 300,
                        y: 0,
                        width: 100,
                        height: 40,
                    },
                },
            ])
        })

        it('should support left orientation', () => {
            cy.mount(<Icicle<DefaultIcicleDatum> {...propsForLayoutTesting} orientation="left" />)

            testNodes([
                {
                    path: 'root',
                    rect: {
                        x: 300,
                        y: 0,
                        width: 100,
                        height: 400,
                    },
                },
                {
                    path: 'root.A',
                    rect: {
                        x: 200,
                        y: 0,
                        width: 100,
                        height: 200,
                    },
                },
                {
                    path: 'root.B',
                    rect: {
                        x: 200,
                        y: 200,
                        width: 100,
                        height: 200,
                    },
                },
                {
                    path: 'root.A.0',
                    rect: {
                        x: 100,
                        y: 0,
                        width: 100,
                        height: 100,
                    },
                },
                {
                    path: 'root.A.0.X',
                    rect: {
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 40,
                    },
                },
            ])
        })
    })

    describe('colors', () => {
        it('should support color schemes', () => {
            cy.mount(<Icicle<DefaultIcicleDatum> {...defaultProps} colors={{ scheme: 'accent' }} />)

            testNodes([
                {
                    path: 'root',
                    color: colorSchemes.accent[0],
                },
                {
                    path: 'root.A',
                    color: colorSchemes.accent[1],
                },
                {
                    path: 'root.A.0',
                    color: colorSchemes.accent[1],
                },
                {
                    path: 'root.A.1',
                    color: colorSchemes.accent[1],
                },
                {
                    path: 'root.B',
                    color: colorSchemes.accent[2],
                },
            ])
        })

        it('should support picking colors from the data using a path', () => {
            cy.mount(
                <Icicle<DatumWithColor>
                    {...(defaultProps as IcicleSvgProps<DatumWithColor>)}
                    data={dataWithColor}
                    inheritColorFromParent={false}
                    colors={{ datum: 'data.color' }}
                />
            )

            testNodes([
                {
                    path: 'root',
                    color: dataWithColor.color,
                },
                {
                    path: 'root.A',
                    color: getNode(dataWithColor, 'children.0').color,
                },
                {
                    path: 'root.A.0',
                    color: getNode(dataWithColor, 'children.0.children.0').color,
                },
                {
                    path: 'root.A.1',
                    color: getNode(dataWithColor, 'children.0.children.1').color,
                },
                {
                    path: 'root.B',
                    color: getNode(dataWithColor, 'children.1').color,
                },
            ])
        })

        it('should support picking colors from the data using a function', () => {
            cy.mount(
                <Icicle<DatumWithColor>
                    {...(defaultProps as IcicleSvgProps<DatumWithColor>)}
                    data={dataWithColor}
                    colors={d => d.data.color}
                />
            )

            testNodes([
                {
                    path: 'root',
                    color: dataWithColor.color,
                },
                {
                    path: 'root.A',
                    color: getNode(dataWithColor, 'children.0').color,
                },
                {
                    path: 'root.A.0',
                    color: getNode(dataWithColor, 'children.0').color,
                },
                {
                    path: 'root.A.1',
                    color: getNode(dataWithColor, 'children.0').color,
                },
                {
                    path: 'root.B',
                    color: getNode(dataWithColor, 'children.1').color,
                },
            ])
        })

        it('should support picking colors according to depth', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum>
                    {...defaultProps}
                    colorBy="depth"
                    inheritColorFromParent={false}
                />
            )

            testNodes([
                {
                    path: 'root',
                    color: colorSchemes.nivo[0],
                },
                {
                    path: 'root.A',
                    color: colorSchemes.nivo[1],
                },
                {
                    path: 'root.A.0',
                    color: colorSchemes.nivo[2],
                },
                {
                    path: 'root.A.1',
                    color: colorSchemes.nivo[2],
                },
                {
                    path: 'root.B',
                    color: colorSchemes.nivo[1],
                },
            ])
        })
    })

    describe('patterns & gradients', () => {
        it('should support patterns', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum>
                    {...defaultProps}
                    gapX={4}
                    gapY={4}
                    borderRadius={2}
                    borderWidth={2}
                    borderColor={{ from: 'color' }}
                    defs={[
                        patternDotsDef('pattern', {
                            background: 'inherit',
                            color: '#ffffff',
                            size: 8,
                            padding: 2,
                            stagger: true,
                        }),
                    ]}
                    fill={[
                        { match: { id: 'root' }, id: 'pattern' },
                        { match: { id: '1' }, id: 'pattern' },
                    ]}
                />
            )

            testNodes([
                {
                    path: 'root',
                    fill: `url(#pattern.bg.${colorSchemes.nivo[0]})`,
                },
                {
                    path: 'root.A',
                    color: colorSchemes.nivo[1],
                },
                {
                    path: 'root.A.0',
                    color: colorSchemes.nivo[1],
                },
                {
                    path: 'root.A.1',
                    fill: `url(#pattern.bg.${colorSchemes.nivo[1]})`,
                },
                {
                    path: 'root.B',
                    color: colorSchemes.nivo[2],
                },
            ])
        })

        it('should support gradients', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum>
                    {...defaultProps}
                    gapX={4}
                    gapY={4}
                    borderRadius={2}
                    borderWidth={2}
                    borderColor={{ from: 'color' }}
                    defs={[
                        linearGradientDef('gradient', [
                            { offset: 0, color: 'inherit', opacity: 0.65 },
                            { offset: 100, color: 'inherit' },
                        ]),
                    ]}
                    fill={[
                        { match: { id: 'root' }, id: 'gradient' },
                        { match: { id: '1' }, id: 'gradient' },
                    ]}
                />
            )

            testNodes([
                {
                    path: 'root',
                    fill: `url(#gradient.0.${colorSchemes.nivo[0]}.1.${colorSchemes.nivo[0]})`,
                },
                {
                    path: 'root.A',
                    color: colorSchemes.nivo[1],
                },
                {
                    path: 'root.A.0',
                    color: colorSchemes.nivo[1],
                },
                {
                    path: 'root.A.1',
                    fill: `url(#gradient.0.${colorSchemes.nivo[1]}.1.${colorSchemes.nivo[1]})`,
                },
                {
                    path: 'root.B',
                    color: colorSchemes.nivo[2],
                },
            ])
        })
    })

    describe('labels', () => {
        it('should support labels', () => {
            cy.mount(<Icicle<DefaultIcicleDatum> {...defaultProps} enableLabels />)

            testNodes([
                {
                    path: 'root',
                    label: 'root',
                },
                {
                    path: 'root.A',
                    label: 'A',
                },
                {
                    path: 'root.A.0',
                    label: '0',
                },
                {
                    path: 'root.A.1',
                    label: '1',
                },
                {
                    path: 'root.B',
                    label: 'B',
                },
            ])
        })

        it('should show no labels when disabled', () => {
            cy.mount(<Icicle<DefaultIcicleDatum> {...defaultProps} enableLabels={false} />)

            cy.findByTestId('icicle.label.root').should('not.exist')
        })

        it('should support defining labels as a property', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum> {...defaultProps} enableLabels label="hierarchy.path" />
            )

            testNodes([
                {
                    path: 'root',
                    label: 'root',
                },
                {
                    path: 'root.A',
                    label: 'root.A',
                },
                {
                    path: 'root.A.0',
                    label: 'root.A.0',
                },
                {
                    path: 'root.A.1',
                    label: 'root.A.1',
                },
                {
                    path: 'root.B',
                    label: 'root.B',
                },
            ])
        })

        it('should support using the formatted value', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum>
                    {...defaultProps}
                    enableLabels
                    valueFormat=" >-$.2f"
                    label="formattedValue"
                />
            )

            testNodes([
                {
                    path: 'root',
                    label: '$100.00',
                },
                {
                    path: 'root.A',
                    label: '$50.00',
                },
                {
                    path: 'root.A.0',
                    label: '$25.00',
                },
                {
                    path: 'root.A.1',
                    label: '$25.00',
                },
                {
                    path: 'root.B',
                    tooltip: 'B: $50.00',
                },
            ])
        })

        it('should support using a function to define the label', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum>
                    {...defaultProps}
                    enableLabels
                    label={d => `func:${d.id}`}
                />
            )

            testNodes([
                {
                    path: 'root',
                    label: 'func:root',
                },
                {
                    path: 'root.A',
                    label: 'func:A',
                },
                {
                    path: 'root.A.0',
                    label: 'func:0',
                },
                {
                    path: 'root.A.1',
                    label: 'func:1',
                },
                {
                    path: 'root.B',
                    label: 'func:B',
                },
            ])
        })

        describe('positioning & rotation', () => {
            const boxAnchorUseCases: {
                boxAnchor: BoxAnchor
                expectedNodes: ExpectedNode[]
            }[] = [
                {
                    boxAnchor: 'top-left',
                    expectedNodes: [
                        {
                            path: 'root',
                            rect: {
                                x: 0,
                                y: 0,
                                width: 400,
                                height: 100,
                            },
                            label: 'root',
                            labelLayout: {
                                position: [10, 10],
                                align: 'start',
                                baseline: 'text-before-edge',
                            },
                        },
                        {
                            path: 'root.B',
                            rect: {
                                x: 200,
                                y: 100,
                                width: 200,
                                height: 100,
                            },
                            label: 'B',
                            labelLayout: {
                                position: [210, 110],
                                align: 'start',
                                baseline: 'text-before-edge',
                            },
                        },
                    ],
                },
                {
                    boxAnchor: 'top',
                    expectedNodes: [
                        {
                            path: 'root',
                            rect: {
                                x: 0,
                                y: 0,
                                width: 400,
                                height: 100,
                            },
                            label: 'root',
                            labelLayout: {
                                position: [200, 10],
                                align: 'middle',
                                baseline: 'text-before-edge',
                            },
                        },
                        {
                            path: 'root.B',
                            rect: {
                                x: 200,
                                y: 100,
                                width: 200,
                                height: 100,
                            },
                            label: 'B',
                            labelLayout: {
                                position: [300, 110],
                                align: 'middle',
                                baseline: 'text-before-edge',
                            },
                        },
                    ],
                },
                {
                    boxAnchor: 'top-right',
                    expectedNodes: [
                        {
                            path: 'root',
                            rect: {
                                x: 0,
                                y: 0,
                                width: 400,
                                height: 100,
                            },
                            label: 'root',
                            labelLayout: {
                                position: [390, 10],
                                align: 'end',
                                baseline: 'text-before-edge',
                            },
                        },
                        {
                            path: 'root.B',
                            rect: {
                                x: 200,
                                y: 100,
                                width: 200,
                                height: 100,
                            },
                            label: 'B',
                            labelLayout: {
                                position: [390, 110],
                                align: 'end',
                                baseline: 'text-before-edge',
                            },
                        },
                    ],
                },
                {
                    boxAnchor: 'right',
                    expectedNodes: [
                        {
                            path: 'root',
                            rect: {
                                x: 0,
                                y: 0,
                                width: 400,
                                height: 100,
                            },
                            label: 'root',
                            labelLayout: {
                                position: [390, 50],
                                align: 'end',
                                baseline: 'middle',
                            },
                        },
                        {
                            path: 'root.B',
                            rect: {
                                x: 200,
                                y: 100,
                                width: 200,
                                height: 100,
                            },
                            label: 'B',
                            labelLayout: {
                                position: [390, 150],
                                align: 'end',
                                baseline: 'middle',
                            },
                        },
                    ],
                },
                {
                    boxAnchor: 'bottom-right',
                    expectedNodes: [
                        {
                            path: 'root',
                            rect: {
                                x: 0,
                                y: 0,
                                width: 400,
                                height: 100,
                            },
                            label: 'root',
                            labelLayout: {
                                position: [390, 90],
                                align: 'end',
                                baseline: 'text-after-edge',
                            },
                        },
                        {
                            path: 'root.B',
                            rect: {
                                x: 200,
                                y: 100,
                                width: 200,
                                height: 100,
                            },
                            label: 'B',
                            labelLayout: {
                                position: [390, 190],
                                align: 'end',
                                baseline: 'text-after-edge',
                            },
                        },
                    ],
                },
                {
                    boxAnchor: 'bottom',
                    expectedNodes: [
                        {
                            path: 'root',
                            rect: {
                                x: 0,
                                y: 0,
                                width: 400,
                                height: 100,
                            },
                            label: 'root',
                            labelLayout: {
                                position: [200, 90],
                                align: 'middle',
                                baseline: 'text-after-edge',
                            },
                        },
                        {
                            path: 'root.B',
                            rect: {
                                x: 200,
                                y: 100,
                                width: 200,
                                height: 100,
                            },
                            label: 'B',
                            labelLayout: {
                                position: [300, 190],
                                align: 'middle',
                                baseline: 'text-after-edge',
                            },
                        },
                    ],
                },
                {
                    boxAnchor: 'bottom-left',
                    expectedNodes: [
                        {
                            path: 'root',
                            rect: {
                                x: 0,
                                y: 0,
                                width: 400,
                                height: 100,
                            },
                            label: 'root',
                            labelLayout: {
                                position: [10, 90],
                                align: 'start',
                                baseline: 'text-after-edge',
                            },
                        },
                        {
                            path: 'root.B',
                            rect: {
                                x: 200,
                                y: 100,
                                width: 200,
                                height: 100,
                            },
                            label: 'B',
                            labelLayout: {
                                position: [210, 190],
                                align: 'start',
                                baseline: 'text-after-edge',
                            },
                        },
                    ],
                },
                {
                    boxAnchor: 'left',
                    expectedNodes: [
                        {
                            path: 'root',
                            rect: {
                                x: 0,
                                y: 0,
                                width: 400,
                                height: 100,
                            },
                            label: 'root',
                            labelLayout: {
                                position: [10, 50],
                                align: 'start',
                                baseline: 'middle',
                            },
                        },
                        {
                            path: 'root.B',
                            rect: {
                                x: 200,
                                y: 100,
                                width: 200,
                                height: 100,
                            },
                            label: 'B',
                            labelLayout: {
                                position: [210, 150],
                                align: 'start',
                                baseline: 'middle',
                            },
                        },
                    ],
                },
            ]

            for (const useCase of boxAnchorUseCases) {
                it(`should support ${useCase.boxAnchor} boxAnchor`, () => {
                    cy.mount(
                        <Icicle<DefaultIcicleDatum>
                            {...propsForLayoutTesting}
                            enableLabels
                            labelPaddingX={10}
                            labelPaddingY={10}
                            labelBoxAnchor={useCase.boxAnchor}
                        />
                    )

                    testNodes(useCase.expectedNodes)
                })
            }

            it(`should support rotation`, () => {
                cy.mount(
                    <Icicle<DefaultIcicleDatum>
                        {...propsForLayoutTesting}
                        enableLabels
                        labelBoxAnchor="center"
                        labelRotation={270}
                    />
                )

                testNodes([
                    {
                        path: 'root',
                        labelLayout: { rotation: 270 },
                    },
                    {
                        path: 'root.A',
                        labelLayout: { rotation: 270 },
                    },
                    {
                        path: 'root.A.0',
                        labelLayout: { rotation: 270 },
                    },
                    {
                        path: 'root.A.0.X',
                        labelLayout: { rotation: 270 },
                    },
                    {
                        path: 'root.A.0.Y',
                        labelLayout: { rotation: 270 },
                    },
                    {
                        path: 'root.A.1',
                        labelLayout: { rotation: 270 },
                    },
                    {
                        path: 'root.B',
                        labelLayout: { rotation: 270 },
                    },
                ])
            })
        })
    })

    describe('interactivity', () => {
        it('should support onClick', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum> {...defaultProps} onClick={cy.stub().as('handler')} />
            )

            cy.findByTestId('icicle.rect.root').click()
            cy.get('@handler').should(
                'have.been.calledWithMatch',
                Cypress.sinon.match({ id: 'root' })
            )
        })

        it('should support onMouseEnter', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum>
                    {...defaultProps}
                    onMouseEnter={cy.stub().as('handler')}
                />
            )

            cy.findByTestId('icicle.rect.root.A').trigger('mouseover')
            cy.get('@handler').should('have.been.calledWithMatch', Cypress.sinon.match({ id: 'A' }))
        })

        it('should support onMouseLeave', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum>
                    {...defaultProps}
                    onMouseLeave={cy.stub().as('handler')}
                />
            )

            cy.findByTestId('icicle.rect.root.B').trigger('mouseout')
            cy.get('@handler').should('have.been.calledWithMatch', Cypress.sinon.match({ id: 'B' }))
        })

        it('should support onMouseMove', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum>
                    {...defaultProps}
                    onMouseMove={cy.stub().as('handler')}
                />
            )

            cy.findByTestId('icicle.rect.root.A.0').trigger('mousemove')
            cy.get('@handler').should('have.been.calledWithMatch', Cypress.sinon.match({ id: '0' }))
        })

        it('should support onWheel', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum> {...defaultProps} onWheel={cy.stub().as('handler')} />
            )

            cy.findByTestId('icicle.rect.root.A.1').trigger('wheel')
            cy.get('@handler').should('have.been.calledWithMatch', Cypress.sinon.match({ id: '1' }))
        })

        it('should support onContextMenu', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum>
                    {...defaultProps}
                    onContextMenu={cy.stub().as('handler')}
                />
            )

            cy.findByTestId('icicle.rect.root').trigger('contextmenu')
            cy.get('@handler').should(
                'have.been.calledWithMatch',
                Cypress.sinon.match({ id: 'root' })
            )
        })

        it('should support disabling interactivity', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum>
                    {...defaultProps}
                    isInteractive={false}
                    onClick={cy.stub().as('onClick')}
                    onMouseEnter={cy.stub().as('onMouseEnter')}
                    onMouseLeave={cy.stub().as('onMouseLeave')}
                    onMouseMove={cy.stub().as('onMouseMove')}
                    onWheel={cy.stub().as('onWheel')}
                    onContextMenu={cy.stub().as('onContextMenu')}
                />
            )

            const node = cy.findByTestId('icicle.rect.root')
            node.click()
                .trigger('mouseover')
                .trigger('mouseout')
                .trigger('mousemove')
                .trigger('wheel')
                .trigger('contextmenu')

            cy.get('@onClick').should('not.have.been.called')
            cy.get('@onMouseEnter').should('not.have.been.called')
            cy.get('@onMouseLeave').should('not.have.been.called')
            cy.get('@onMouseMove').should('not.have.been.called')
            cy.get('@onWheel').should('not.have.been.called')
            cy.get('@onContextMenu').should('not.have.been.called')
        })
    })

    describe('tooltip', () => {
        it('should support tooltips', () => {
            cy.mount(<Icicle<DefaultIcicleDatum> {...defaultProps} />)

            testNodes([
                {
                    path: 'root',
                    tooltip: 'root: 100',
                },
                {
                    path: 'root.A',
                    tooltip: 'A: 50',
                },
                {
                    path: 'root.A.0',
                    tooltip: '0: 25',
                },
                {
                    path: 'root.A.1',
                    tooltip: '1: 25',
                },
                {
                    path: 'root.B',
                    tooltip: 'B: 50',
                },
            ])
        })

        it('should use the formatted value', () => {
            cy.mount(<Icicle<DefaultIcicleDatum> {...defaultProps} valueFormat=" >-$.2f" />)

            testNodes([
                {
                    path: 'root',
                    tooltip: 'root: $100.00',
                },
                {
                    path: 'root.A',
                    tooltip: 'A: $50.00',
                },
                {
                    path: 'root.A.0',
                    tooltip: '0: $25.00',
                },
                {
                    path: 'root.A.1',
                    tooltip: '1: $25.00',
                },
                {
                    path: 'root.B',
                    tooltip: 'B: $50.00',
                },
            ])
        })

        it('should support custom tooltip', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum>
                    {...defaultProps}
                    valueFormat=" >-$.2f"
                    tooltip={d => (
                        <div role="tooltip" style={{ background: 'white', padding: 10 }}>
                            <span>Custom tooltip</span>
                            <br />
                            <strong>{d.id}</strong>: {d.formattedValue}
                        </div>
                    )}
                />
            )

            testNodes([
                {
                    path: 'root',
                    tooltip: 'root: $100.00',
                },
                {
                    path: 'root.A',
                    tooltip: 'A: $50.00',
                },
                {
                    path: 'root.A.0',
                    tooltip: '0: $25.00',
                },
                {
                    path: 'root.A.1',
                    tooltip: '1: $25.00',
                },
                {
                    path: 'root.B',
                    tooltip: 'B: $50.00',
                },
            ])
        })
    })

    describe('zooming', () => {
        describe('lateral', () => {
            it('should support bottom orientation', () => {
                cy.mount(<Icicle<DefaultIcicleDatum> {...propsForLayoutTesting} enableZooming />)

                const nonZoomedNode: ExpectedNode = {
                    path: 'root.A.1',
                    rect: {
                        x: 100,
                        y: 200,
                        width: 100,
                        height: 100,
                    },
                }

                testNode(nonZoomedNode)

                cy.findByTestId('icicle.rect.root.A.1').click()
                testNodes([
                    {
                        path: 'root',
                        rect: {
                            x: -400,
                            y: 0,
                            width: 1600,
                            height: 100,
                        },
                    },
                    {
                        path: 'root.A',
                        rect: {
                            x: -400,
                            y: 100,
                            width: 800,
                            height: 100,
                        },
                    },
                    {
                        path: 'root.A.1',
                        rect: {
                            x: 0,
                            y: 200,
                            width: 400,
                            height: 100,
                        },
                    },
                ])

                cy.findByTestId('icicle.rect.root.A.1').click()
                testNode(nonZoomedNode)
            })

            it('should support top orientation', () => {
                cy.mount(
                    <Icicle<DefaultIcicleDatum>
                        {...propsForLayoutTesting}
                        enableZooming
                        orientation="top"
                    />
                )

                const nonZoomedNode: ExpectedNode = {
                    path: 'root.A.1',
                    rect: {
                        x: 100,
                        y: 100,
                        width: 100,
                        height: 100,
                    },
                }

                testNode(nonZoomedNode)

                cy.findByTestId('icicle.rect.root.A.1').click()
                testNodes([
                    {
                        path: 'root',
                        rect: {
                            x: -400,
                            y: 300,
                            width: 1600,
                            height: 100,
                        },
                    },
                    {
                        path: 'root.A',
                        rect: {
                            x: -400,
                            y: 200,
                            width: 800,
                            height: 100,
                        },
                    },
                    {
                        path: 'root.A.1',
                        rect: {
                            x: 0,
                            y: 100,
                            width: 400,
                            height: 100,
                        },
                    },
                ])

                cy.findByTestId('icicle.rect.root.A.1').click()
                testNode(nonZoomedNode)
            })

            it('should support right orientation', () => {
                cy.mount(
                    <Icicle<DefaultIcicleDatum>
                        {...propsForLayoutTesting}
                        enableZooming
                        orientation="right"
                    />
                )

                const nonZoomedNode: ExpectedNode = {
                    path: 'root.A.1',
                    rect: {
                        x: 200,
                        y: 100,
                        width: 100,
                        height: 100,
                    },
                }

                testNode(nonZoomedNode)

                cy.findByTestId('icicle.rect.root.A.1').click()
                testNodes([
                    {
                        path: 'root',
                        rect: {
                            x: 0,
                            y: -400,
                            width: 100,
                            height: 1600,
                        },
                    },
                    {
                        path: 'root.A',
                        rect: {
                            x: 100,
                            y: -400,
                            width: 100,
                            height: 800,
                        },
                    },
                    {
                        path: 'root.A.1',
                        rect: {
                            x: 200,
                            y: 0,
                            width: 100,
                            height: 400,
                        },
                    },
                ])

                cy.findByTestId('icicle.rect.root.A.1').click()
                testNode(nonZoomedNode)
            })

            it('should support left orientation', () => {
                cy.mount(
                    <Icicle<DefaultIcicleDatum>
                        {...propsForLayoutTesting}
                        enableZooming
                        orientation="left"
                    />
                )

                const nonZoomedNode: ExpectedNode = {
                    path: 'root.A.1',
                    rect: {
                        x: 100,
                        y: 100,
                        width: 100,
                        height: 100,
                    },
                }

                testNode(nonZoomedNode)

                cy.findByTestId('icicle.rect.root.A.1').click()
                testNodes([
                    {
                        path: 'root',
                        rect: {
                            x: 300,
                            y: -400,
                            width: 100,
                            height: 1600,
                        },
                    },
                    {
                        path: 'root.A',
                        rect: {
                            x: 200,
                            y: -400,
                            width: 100,
                            height: 800,
                        },
                    },
                    {
                        path: 'root.A.1',
                        rect: {
                            x: 100,
                            y: 0,
                            width: 100,
                            height: 400,
                        },
                    },
                ])

                cy.findByTestId('icicle.rect.root.A.1').click()
                testNode(nonZoomedNode)
            })
        })

        describe('global', () => {
            it('should support bottom orientation', () => {
                cy.mount(
                    <Icicle<DefaultIcicleDatum>
                        {...propsForLayoutTesting}
                        enableZooming
                        zoomMode="global"
                    />
                )

                const nonZoomedNodes: ExpectedNode[] = [
                    {
                        path: 'root.A.0',
                        rect: {
                            x: 0,
                            y: 200,
                            width: 100,
                            height: 100,
                        },
                    },
                    {
                        path: 'root.A.0.X',
                        rect: {
                            x: 0,
                            y: 300,
                            width: 40,
                            height: 100,
                        },
                    },
                    {
                        path: 'root.A.0.Y',
                        rect: {
                            x: 40,
                            y: 300,
                            width: 60,
                            height: 100,
                        },
                    },
                ]

                testNodes(nonZoomedNodes)

                cy.findByTestId('icicle.rect.root.A.0').click()
                testNodes([
                    {
                        path: 'root',
                        rect: {
                            x: 0,
                            y: -400,
                            width: 1600,
                            height: 200,
                        },
                    },
                    {
                        path: 'root.A',
                        rect: {
                            x: 0,
                            y: -200,
                            width: 800,
                            height: 200,
                        },
                    },
                    {
                        path: 'root.A.0',
                        rect: {
                            x: 0,
                            y: 0,
                            width: 400,
                            height: 200,
                        },
                    },
                    {
                        path: 'root.A.0.X',
                        rect: {
                            x: 0,
                            y: 200,
                            width: 160,
                            height: 200,
                        },
                    },
                    {
                        path: 'root.A.0.Y',
                        rect: {
                            x: 160,
                            y: 200,
                            width: 240,
                            height: 200,
                        },
                    },
                ])

                cy.findByTestId('icicle.rect.root.A.0').click()
                testNodes(nonZoomedNodes)
            })

            it('should support top orientation', () => {
                cy.mount(
                    <Icicle<DefaultIcicleDatum>
                        {...propsForLayoutTesting}
                        enableZooming
                        zoomMode="global"
                        orientation="top"
                    />
                )

                const nonZoomedNodes: ExpectedNode[] = [
                    {
                        path: 'root.A.0',
                        rect: {
                            x: 0,
                            y: 100,
                            width: 100,
                            height: 100,
                        },
                    },
                    {
                        path: 'root.A.0.X',
                        rect: {
                            x: 0,
                            y: 0,
                            width: 40,
                            height: 100,
                        },
                    },
                    {
                        path: 'root.A.0.Y',
                        rect: {
                            x: 40,
                            y: 0,
                            width: 60,
                            height: 100,
                        },
                    },
                ]

                testNodes(nonZoomedNodes)

                cy.findByTestId('icicle.rect.root.A.0').click()
                testNodes([
                    {
                        path: 'root',
                        rect: {
                            x: 0,
                            y: 600,
                            width: 1600,
                            height: 200,
                        },
                    },
                    {
                        path: 'root.A',
                        rect: {
                            x: 0,
                            y: 400,
                            width: 800,
                            height: 200,
                        },
                    },
                    {
                        path: 'root.A.0',
                        rect: {
                            x: 0,
                            y: 200,
                            width: 400,
                            height: 200,
                        },
                    },
                    {
                        path: 'root.A.0.X',
                        rect: {
                            x: 0,
                            y: 0,
                            width: 160,
                            height: 200,
                        },
                    },
                    {
                        path: 'root.A.0.Y',
                        rect: {
                            x: 160,
                            y: 0,
                            width: 240,
                            height: 200,
                        },
                    },
                ])

                cy.findByTestId('icicle.rect.root.A.0').click()
                testNodes(nonZoomedNodes)
            })

            it('should support right orientation', () => {
                cy.mount(
                    <Icicle<DefaultIcicleDatum>
                        {...propsForLayoutTesting}
                        enableZooming
                        zoomMode="global"
                        orientation="right"
                    />
                )

                const nonZoomedNodes: ExpectedNode[] = [
                    {
                        path: 'root.A.0',
                        rect: {
                            x: 200,
                            y: 0,
                            width: 100,
                            height: 100,
                        },
                    },
                    {
                        path: 'root.A.0.X',
                        rect: {
                            x: 300,
                            y: 0,
                            width: 100,
                            height: 40,
                        },
                    },
                    {
                        path: 'root.A.0.Y',
                        rect: {
                            x: 300,
                            y: 40,
                            width: 100,
                            height: 60,
                        },
                    },
                ]

                testNodes(nonZoomedNodes)

                cy.findByTestId('icicle.rect.root.A.0').click()
                testNodes([
                    {
                        path: 'root',
                        rect: {
                            x: -400,
                            y: 0,
                            width: 200,
                            height: 1600,
                        },
                    },
                    {
                        path: 'root.A',
                        rect: {
                            x: -200,
                            y: 0,
                            width: 200,
                            height: 800,
                        },
                    },
                    {
                        path: 'root.A.0',
                        rect: {
                            x: 0,
                            y: 0,
                            width: 200,
                            height: 400,
                        },
                    },
                    {
                        path: 'root.A.0.X',
                        rect: {
                            x: 200,
                            y: 0,
                            width: 200,
                            height: 160,
                        },
                    },
                    {
                        path: 'root.A.0.Y',
                        rect: {
                            x: 200,
                            y: 160,
                            width: 200,
                            height: 240,
                        },
                    },
                ])

                cy.findByTestId('icicle.rect.root.A.0').click()
                testNodes(nonZoomedNodes)
            })

            it('should support left orientation', () => {
                cy.mount(
                    <Icicle<DefaultIcicleDatum>
                        {...propsForLayoutTesting}
                        enableZooming
                        zoomMode="global"
                        orientation="left"
                    />
                )

                const nonZoomedNodes: ExpectedNode[] = [
                    {
                        path: 'root.A.0',
                        rect: {
                            x: 100,
                            y: 0,
                            width: 100,
                            height: 100,
                        },
                    },
                    {
                        path: 'root.A.0.X',
                        rect: {
                            x: 0,
                            y: 0,
                            width: 100,
                            height: 40,
                        },
                    },
                    {
                        path: 'root.A.0.Y',
                        rect: {
                            x: 0,
                            y: 40,
                            width: 100,
                            height: 60,
                        },
                    },
                ]

                testNodes(nonZoomedNodes)

                cy.findByTestId('icicle.rect.root.A.0').click()
                testNodes([
                    {
                        path: 'root',
                        rect: {
                            x: 600,
                            y: 0,
                            width: 200,
                            height: 1600,
                        },
                    },
                    {
                        path: 'root.A',
                        rect: {
                            x: 400,
                            y: 0,
                            width: 200,
                            height: 800,
                        },
                    },
                    {
                        path: 'root.A.0',
                        rect: {
                            x: 200,
                            y: 0,
                            width: 200,
                            height: 400,
                        },
                    },
                    {
                        path: 'root.A.0.X',
                        rect: {
                            x: 0,
                            y: 0,
                            width: 200,
                            height: 160,
                        },
                    },
                    {
                        path: 'root.A.0.Y',
                        rect: {
                            x: 0,
                            y: 160,
                            width: 200,
                            height: 240,
                        },
                    },
                ])

                cy.findByTestId('icicle.rect.root.A.0').click()
                testNodes(nonZoomedNodes)
            })
        })
    })

    describe('a11y', () => {
        describe('aria attributes', () => {
            it('should set default aria attributes', () => {
                cy.mount(<Icicle<DefaultIcicleDatum> {...defaultProps} />)

                cy.findByRole('tree').should('exist')
                cy.findAllByRole('treeitem').should('have.length', 5)

                testNodes([
                    {
                        path: 'root',
                        aria: {
                            role: 'treeitem',
                            level: 1,
                        },
                    },
                    {
                        path: 'root.A',
                        aria: {
                            role: 'treeitem',
                            level: 2,
                        },
                    },
                    {
                        path: 'root.A.0',
                        aria: {
                            role: 'treeitem',
                            level: 3,
                        },
                    },
                    {
                        path: 'root.A.1',
                        aria: {
                            role: 'treeitem',
                            level: 3,
                        },
                    },
                    {
                        path: 'root.B',
                        aria: {
                            role: 'treeitem',
                            level: 2,
                        },
                    },
                ])
            })

            it('should allow customizing/extending aria attributes', () => {
                cy.mount(
                    <Icicle<DefaultIcicleDatum>
                        {...defaultProps}
                        nodeAriaLabel={node => `${node.id}: ${node.formattedValue}`}
                        nodeAriaLabelledBy={node => `${node.id}-label`}
                        nodeAriaDescribedBy={node => `${node.id}-description`}
                        nodeAriaHidden={node => node.hierarchy.depth === 0}
                    />
                )

                cy.findByRole('tree').should('exist')
                // root is hidden.
                cy.findAllByRole('treeitem').should('have.length', 4)

                testNodes([
                    {
                        path: 'root',
                        aria: {
                            role: 'treeitem',
                            level: 1,
                            label: 'root: 100',
                            labelledBy: 'root-label',
                            describedBy: 'root-description',
                            hidden: true,
                        },
                    },
                    {
                        path: 'root.A',
                        aria: {
                            role: 'treeitem',
                            level: 2,
                            label: 'A: 50',
                            labelledBy: 'A-label',
                            describedBy: 'A-description',
                            hidden: false,
                        },
                    },
                    {
                        path: 'root.A.0',
                        aria: {
                            role: 'treeitem',
                            level: 3,
                            label: '0: 25',
                            labelledBy: '0-label',
                            describedBy: '0-description',
                            hidden: false,
                        },
                    },
                    {
                        path: 'root.A.1',
                        aria: {
                            role: 'treeitem',
                            level: 3,
                            label: '1: 25',
                            labelledBy: '1-label',
                            describedBy: '1-description',
                            hidden: false,
                        },
                    },
                    {
                        path: 'root.B',
                        aria: {
                            role: 'treeitem',
                            level: 2,
                            label: 'B: 50',
                            labelledBy: 'B-label',
                            describedBy: 'B-description',
                            hidden: false,
                        },
                    },
                ])
            })
        })

        describe('keyboard navigation', () => {
            it('should allow keyboard navigation via TAB', () => {
                cy.mount(<Icicle<DefaultIcicleDatum> {...defaultProps} isFocusable />)

                cy.findByRole('tree').focus()

                cy.press('Tab')
                cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root')

                cy.press('Tab')
                cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                cy.press('Tab')
                cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.B')

                cy.press('Tab')
                cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A.0')

                cy.press('Tab')
                cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A.1')
            })

            describe('should support navigation via ARROW keys', () => {
                it('bottom orientation', () => {
                    cy.mount(<Icicle<DefaultIcicleDatum> {...defaultProps} isFocusable />)

                    cy.findByRole('tree').focus()

                    cy.press('Tab')
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root')

                    cy.focused().trigger('keydown', { key: 'ArrowDown' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                    cy.focused().trigger('keydown', { key: 'ArrowDown' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A.0')

                    cy.focused().trigger('keydown', { key: 'ArrowRight' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A.1')

                    cy.focused().trigger('keydown', { key: 'ArrowUp' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                    cy.focused().trigger('keydown', { key: 'ArrowRight' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.B')

                    cy.focused().trigger('keydown', { key: 'ArrowLeft' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                    cy.focused().trigger('keydown', { key: 'ArrowUp' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root')
                })

                it('right orientation', () => {
                    cy.mount(
                        <Icicle<DefaultIcicleDatum>
                            {...defaultProps}
                            isFocusable
                            orientation="right"
                        />
                    )

                    cy.findByRole('tree').focus()

                    cy.press('Tab')
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root')

                    cy.focused().trigger('keydown', { key: 'ArrowRight' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                    cy.focused().trigger('keydown', { key: 'ArrowRight' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A.0')

                    cy.focused().trigger('keydown', { key: 'ArrowDown' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A.1')

                    cy.focused().trigger('keydown', { key: 'ArrowLeft' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                    cy.focused().trigger('keydown', { key: 'ArrowDown' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.B')

                    cy.focused().trigger('keydown', { key: 'ArrowUp' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                    cy.focused().trigger('keydown', { key: 'ArrowLeft' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root')
                })

                it('top orientation', () => {
                    cy.mount(
                        <Icicle<DefaultIcicleDatum>
                            {...defaultProps}
                            isFocusable
                            orientation="top"
                        />
                    )

                    cy.findByRole('tree').focus()

                    cy.press('Tab')
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root')

                    cy.focused().trigger('keydown', { key: 'ArrowUp' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                    cy.focused().trigger('keydown', { key: 'ArrowUp' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A.0')

                    cy.focused().trigger('keydown', { key: 'ArrowRight' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A.1')

                    cy.focused().trigger('keydown', { key: 'ArrowDown' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                    cy.focused().trigger('keydown', { key: 'ArrowRight' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.B')

                    cy.focused().trigger('keydown', { key: 'ArrowLeft' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                    cy.focused().trigger('keydown', { key: 'ArrowDown' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root')
                })

                it('left orientation', () => {
                    cy.mount(
                        <Icicle<DefaultIcicleDatum>
                            {...defaultProps}
                            isFocusable
                            orientation="left"
                        />
                    )

                    cy.findByRole('tree').focus()

                    cy.press('Tab')
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root')

                    cy.focused().trigger('keydown', { key: 'ArrowLeft' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                    cy.focused().trigger('keydown', { key: 'ArrowLeft' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A.0')

                    cy.focused().trigger('keydown', { key: 'ArrowDown' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A.1')

                    cy.focused().trigger('keydown', { key: 'ArrowRight' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                    cy.focused().trigger('keydown', { key: 'ArrowDown' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.B')

                    cy.focused().trigger('keydown', { key: 'ArrowUp' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                    cy.focused().trigger('keydown', { key: 'ArrowRight' })
                    cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root')
                })
            })

            it('should zoom in/out via ENTER/ESCAPE or SPACE', () => {
                cy.mount(
                    <Icicle<DefaultIcicleDatum>
                        {...propsForLayoutTesting}
                        isFocusable
                        enableZooming
                        zoomMode="global"
                    />
                )

                cy.findByRole('tree').focus()

                cy.press('Tab')
                cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root')

                cy.focused().trigger('keydown', { key: 'ArrowDown' })
                cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                cy.focused().trigger('keydown', { key: ' ' })
                testNode({
                    path: 'root.A',
                    rect: {
                        x: 0,
                        y: 0,
                        width: 400,
                    },
                })

                cy.focused().trigger('keydown', { key: ' ' })
                testNode({
                    path: 'root.A',
                    rect: {
                        x: 0,
                        y: 100,
                        width: 200,
                        height: 100,
                    },
                })

                cy.focused().trigger('keydown', { key: 'ArrowRight' })
                cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.B')

                cy.focused().trigger('keydown', { key: 'Enter' })
                testNode({
                    path: 'root.B',
                    rect: {
                        x: 0,
                        y: 0,
                        width: 400,
                        height: 400,
                    },
                })

                cy.focused().trigger('keydown', { key: 'Escape' })
                testNode({
                    path: 'root.B',
                    rect: {
                        x: 200,
                        y: 100,
                        width: 200,
                        height: 100,
                    },
                })
            })

            it('should zoom hidden nodes when focused', () => {
                cy.mount(
                    <Icicle<DefaultIcicleDatum>
                        {...propsForLayoutTesting}
                        isFocusable
                        enableZooming
                        zoomMode="global"
                    />
                )

                cy.findByRole('tree').focus()

                cy.press('Tab')
                cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root')

                cy.focused().trigger('keydown', { key: 'ArrowDown' })
                cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.A')

                cy.focused().trigger('keydown', { key: 'Enter' })
                testNode({
                    path: 'root.A',
                    rect: {
                        x: 0,
                        y: 0,
                        width: 400,
                    },
                })

                cy.focused().trigger('keydown', { key: 'ArrowRight' })
                cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root.B')
                testNode({
                    path: 'root.B',
                    rect: {
                        x: 0,
                        y: 0,
                        width: 400,
                        height: 400,
                    },
                })

                cy.focused().trigger('keydown', { key: 'ArrowUp' })
                cy.focused().should('have.attr', 'data-testid', 'icicle.rect.root')
                testNode({
                    path: 'root',
                    rect: {
                        x: 0,
                        y: 0,
                        width: 400,
                        height: 100,
                    },
                })
            })
        })
    })

    describe('layers', () => {
        it('should support disabling a layer', () => {
            cy.mount(<Icicle {...defaultProps} layers={['labels']} enableLabels />)

            cy.findByTestId('icicle.rect.root').should('not.exist')
            cy.findByTestId('icicle.label.root').should('exist')
        })

        it('should support custom layers', () => {
            const CustomLayer = ({ nodes }: IcicleCommonCustomLayerProps<DefaultIcicleDatum>) => {
                const theme = useTheme()

                return (
                    <>
                        {nodes.map(node => (
                            <g
                                key={node.id}
                                transform={`translate(${node.rect.x + node.rect.width / 2}, ${node.rect.y + node.rect.height / 2})`}
                                data-testid={`custom_layer_node.${node.hierarchy.path}`}
                            >
                                <circle r={22} fill="white" />
                                <Text
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    style={{
                                        ...theme.labels.text,
                                        fill: node.color,
                                        fontSize: 16,
                                        fontWeight: 600,
                                    }}
                                >
                                    {node.id}
                                </Text>
                            </g>
                        ))}
                    </>
                )
            }

            cy.mount(<Icicle {...defaultProps} layers={['rects', CustomLayer]} enableLabels />)

            cy.findByTestId('custom_layer_node.root').should('exist')
            cy.findByTestId('custom_layer_node.root.A').should('exist')
            cy.findByTestId('custom_layer_node.root.A.0').should('exist')
            cy.findByTestId('custom_layer_node.root.A.1').should('exist')
            cy.findByTestId('custom_layer_node.root.B').should('exist')
        })
    })

    testChartResponsiveness(defaults => (
        <ResponsiveIcicle
            {...responsiveDefaultProps}
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            role="chart"
        />
    ))
})
