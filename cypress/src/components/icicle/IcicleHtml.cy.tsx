import { BoxAnchor } from '@nivo/core'
import { colorSchemes } from '@nivo/colors'
import {
    IcicleHtml,
    IcicleHtmlProps,
    DefaultIcicleDatum,
    IcicleCommonCustomLayerProps,
} from '@nivo/icicle'
import { useTheme } from '@nivo/theming'
import { Text } from '@nivo/text'
import get from 'lodash/get.js'

const hexToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgb(${r}, ${g}, ${b})`
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

const defaultProps: IcicleHtmlProps<DefaultIcicleDatum> = {
    width: 400,
    height: 400,
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

// Remove the gaps and margins to get nice round values,
// As the chart is 400x400, we'll have a max depth of 4,
// so that we can use multiple of 100 for most assertions.
const propsForLayoutTesting: IcicleHtmlProps<DefaultIcicleDatum> = {
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
        width: number
        height: number
    }
    color?: string
    // If provided, test that the provided value is contained
    // in the tooltip.
    // This also determines if we try to hover the node or not.
    tooltip?: string
    // If provided, test that the provided value is contained
    // in the label text element.
    label?: string
    labelLayout?: {
        position?: [number, number]
    }
}

const testNode = (expectedNode: ExpectedNode) => {
    const node = cy.findByTestId(`icicle.rect.${expectedNode.path}`).should('exist')

    if (expectedNode.rect) {
        node.should('have.css', 'top', `${expectedNode.rect.y}px`)
            .and('have.css', 'left', `${expectedNode.rect.x}px`)
            .and('have.css', 'width', `${expectedNode.rect.width}px`)
            .and('have.css', 'height', `${expectedNode.rect.height}px`)
    }

    if (expectedNode.color) {
        node.should('have.css', 'background-color', hexToRgb(expectedNode.color))
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
            if (expectedNode.labelLayout.position) {
                label
                    .should('have.css', 'top', `${expectedNode.labelLayout.position[1]}px`)
                    .and('have.css', 'left', `${expectedNode.labelLayout.position[0]}px`)
            }
        }
    }
}

const testNodes = (expectedNodes: ExpectedNode[]) => {
    for (const expectedNode of expectedNodes) {
        testNode(expectedNode)
    }
}

describe('<Icicle />', () => {
    beforeEach(() => {
        cy.viewport(420, 420)
    })

    it('should render an icicle chart', () => {
        cy.mount(<IcicleHtml<DefaultIcicleDatum> {...defaultProps} />)

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
                <IcicleHtml<CustomDatum>
                    {...(defaultProps as unknown as IcicleHtmlProps<CustomDatum>)}
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
                <IcicleHtml<CustomDatum>
                    {...(defaultProps as unknown as IcicleHtmlProps<CustomDatum>)}
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
            cy.mount(<IcicleHtml<DefaultIcicleDatum> {...propsForLayoutTesting} />)

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
            cy.mount(
                <IcicleHtml<DefaultIcicleDatum> {...propsForLayoutTesting} orientation="top" />
            )

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
            cy.mount(
                <IcicleHtml<DefaultIcicleDatum> {...propsForLayoutTesting} orientation="right" />
            )

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
            cy.mount(
                <IcicleHtml<DefaultIcicleDatum> {...propsForLayoutTesting} orientation="left" />
            )

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
            cy.mount(
                <IcicleHtml<DefaultIcicleDatum> {...defaultProps} colors={{ scheme: 'accent' }} />
            )

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
                <IcicleHtml<DatumWithColor>
                    {...(defaultProps as IcicleHtmlProps<DatumWithColor>)}
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
                <IcicleHtml<DatumWithColor>
                    {...(defaultProps as IcicleHtmlProps<DatumWithColor>)}
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
                <IcicleHtml<DefaultIcicleDatum>
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

    describe('labels', () => {
        it('should support labels', () => {
            cy.mount(<IcicleHtml<DefaultIcicleDatum> {...defaultProps} enableLabels />)

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
            cy.mount(<IcicleHtml<DefaultIcicleDatum> {...defaultProps} enableLabels={false} />)

            cy.findByTestId('icicle.label.root').should('not.exist')
        })

        it('should support defining labels as a property', () => {
            cy.mount(<IcicleHtml<DefaultIcicleDatum> {...defaultProps} enableLabels label="path" />)

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
                <IcicleHtml<DefaultIcicleDatum>
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
                <IcicleHtml<DefaultIcicleDatum>
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

        describe('positioning', () => {
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
                            },
                        },
                    ],
                },
            ]

            for (const useCase of boxAnchorUseCases) {
                it(`should support ${useCase.boxAnchor} boxAnchor`, () => {
                    cy.mount(
                        <IcicleHtml<DefaultIcicleDatum>
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
        })
    })

    describe('interactivity', () => {
        it('should support onClick', () => {
            cy.mount(
                <IcicleHtml<DefaultIcicleDatum>
                    {...defaultProps}
                    onClick={cy.stub().as('handler')}
                />
            )

            cy.findByTestId('icicle.rect.root').click()
            cy.get('@handler').should(
                'have.been.calledWithMatch',
                Cypress.sinon.match({ id: 'root' })
            )
        })

        it('should support onMouseEnter', () => {
            cy.mount(
                <IcicleHtml<DefaultIcicleDatum>
                    {...defaultProps}
                    onMouseEnter={cy.stub().as('handler')}
                />
            )

            cy.findByTestId('icicle.rect.root.A').trigger('mouseover')
            cy.get('@handler').should('have.been.calledWithMatch', Cypress.sinon.match({ id: 'A' }))
        })

        it('should support onMouseLeave', () => {
            cy.mount(
                <IcicleHtml<DefaultIcicleDatum>
                    {...defaultProps}
                    onMouseLeave={cy.stub().as('handler')}
                />
            )

            cy.findByTestId('icicle.rect.root.B').trigger('mouseout')
            cy.get('@handler').should('have.been.calledWithMatch', Cypress.sinon.match({ id: 'B' }))
        })

        it('should support onMouseMove', () => {
            cy.mount(
                <IcicleHtml<DefaultIcicleDatum>
                    {...defaultProps}
                    onMouseMove={cy.stub().as('handler')}
                />
            )

            cy.findByTestId('icicle.rect.root.A.0').trigger('mousemove')
            cy.get('@handler').should('have.been.calledWithMatch', Cypress.sinon.match({ id: '0' }))
        })

        it('should support onWheel', () => {
            cy.mount(
                <IcicleHtml<DefaultIcicleDatum>
                    {...defaultProps}
                    onWheel={cy.stub().as('handler')}
                />
            )

            cy.findByTestId('icicle.rect.root.A.1').trigger('wheel')
            cy.get('@handler').should('have.been.calledWithMatch', Cypress.sinon.match({ id: '1' }))
        })

        it('should support onContextMenu', () => {
            cy.mount(
                <IcicleHtml<DefaultIcicleDatum>
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
                <IcicleHtml<DefaultIcicleDatum>
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
            cy.mount(<IcicleHtml<DefaultIcicleDatum> {...defaultProps} />)

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
            cy.mount(<IcicleHtml<DefaultIcicleDatum> {...defaultProps} valueFormat=" >-$.2f" />)

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
                <IcicleHtml<DefaultIcicleDatum>
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
                cy.mount(
                    <IcicleHtml<DefaultIcicleDatum> {...propsForLayoutTesting} enableZooming />
                )

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
                    <IcicleHtml<DefaultIcicleDatum>
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
                    <IcicleHtml<DefaultIcicleDatum>
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
                    <IcicleHtml<DefaultIcicleDatum>
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
                    <IcicleHtml<DefaultIcicleDatum>
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
                    <IcicleHtml<DefaultIcicleDatum>
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
                    <IcicleHtml<DefaultIcicleDatum>
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
                    <IcicleHtml<DefaultIcicleDatum>
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

    describe('layers', () => {
        it('should support disabling a layer', () => {
            cy.mount(<IcicleHtml {...defaultProps} layers={['labels']} enableLabels />)

            cy.findByTestId('icicle.rect.root').should('not.exist')
            cy.findByTestId('icicle.label.root').should('exist')
        })

        it('should support custom layers', () => {
            const CustomLayer = ({ nodes }: IcicleCommonCustomLayerProps<DefaultIcicleDatum>) => {
                const theme = useTheme()

                return (
                    <>
                        {nodes.map(node => (
                            <div
                                key={node.id}
                                style={{
                                    position: 'absolute',
                                    top: node.rect.y,
                                    left: node.rect.x,
                                    width: node.rect.width,
                                    height: node.rect.height,
                                    backgroundColor: node.color,
                                }}
                                data-testid={`custom_layer_node.${node.path}`}
                            />
                        ))}
                    </>
                )
            }

            cy.mount(<IcicleHtml {...defaultProps} layers={['rects', CustomLayer]} enableLabels />)

            cy.findByTestId('custom_layer_node.root').should('exist')
            cy.findByTestId('custom_layer_node.root.A').should('exist')
            cy.findByTestId('custom_layer_node.root.A.0').should('exist')
            cy.findByTestId('custom_layer_node.root.A.1').should('exist')
            cy.findByTestId('custom_layer_node.root.B').should('exist')
        })
    })
})
