import { create, ReactTestInstance } from 'react-test-renderer'
import { Globals } from '@react-spring/web'
import { Tree, TreeSvgProps, Layout, LabelsPosition } from '../src'
import { Node } from '../src/Node'
import { Label } from '../src/Label'

interface Datum {
    id: string
    children?: Datum[]
}

const sampleData: Datum = {
    id: '0',
    children: [
        { id: 'A' },
        {
            id: 'B',
            children: [{ id: '0' }],
        },
        { id: 'C' },
    ],
}

const baseProps: TreeSvgProps<Datum> = {
    width: 300,
    height: 300,
    data: sampleData,
    nodeSize: 10,
    labelOffset: 10,
    useMesh: false,
    animate: false,
}

describe('Tree', () => {
    beforeAll(() => {
        Globals.assign({ skipAnimation: true })
    })

    afterAll(() => {
        Globals.assign({ skipAnimation: false })
    })

    it('should render a tree graph', () => {
        const root = create(<Tree<Datum> {...baseProps} />).root

        const nodes = root.findAllByType(Node)
        expect(nodes).toHaveLength(5)

        expect(nodes[0].props.node.uid).toEqual('0')
        expect(nodes[1].props.node.uid).toEqual('0.A')
        expect(nodes[2].props.node.uid).toEqual('0.B')
        expect(nodes[3].props.node.uid).toEqual('0.C')
        expect(nodes[4].props.node.uid).toEqual('0.B.0')
    })

    describe('labels', () => {
        it('should skip labels if disabled', () => {
            const root = create(<Tree<Datum> {...baseProps} enableLabel={false} />).root

            expect(root.findAllByType(Label)).toHaveLength(0)
        })

        it('should skip labels if the layer is not configured', () => {
            const root = create(<Tree<Datum> {...baseProps} layers={['links', 'nodes']} />).root

            expect(root.findAllByType(Label)).toHaveLength(0)
        })

        // Positioning tests involve quite some logic to ease checking the various
        // combination we can have, depending on `layout`, `labelsPosition` and `orienLabel`,
        // we should normally avoid having too much logic in tests, as it's more fragile
        // and harder to debug, but it would really be too redundant otherwise.
        describe('positioning', () => {
            type LabelPositionSpec = [x: number, y: number, rotation: number]

            // nodeSize: 10
            // labelOffset: 10
            // So the total offset should be 15, half the node size + label offset.
            // Also note that the center of the graph is 150, as the width and height are 300.
            const labelsPositionTestCases: {
                layout: Layout
                labelsPosition: LabelsPosition
                orientLabel: boolean
                expected: [
                    root: LabelPositionSpec,
                    intermediate: LabelPositionSpec,
                    leaf: LabelPositionSpec,
                ]
            }[] = [
                {
                    layout: 'top-to-bottom',
                    labelsPosition: 'outward',
                    orientLabel: false,
                    expected: [
                        [150, -15, 0],
                        [150, 150 - 15, 0],
                        [150, 300 + 15, 0],
                    ],
                },
                {
                    layout: 'top-to-bottom',
                    labelsPosition: 'outward',
                    orientLabel: true,
                    expected: [
                        [150, -15, -90],
                        [150, 150 - 15, -90],
                        [150, 300 + 15, -90],
                    ],
                },
                {
                    layout: 'top-to-bottom',
                    labelsPosition: 'inward',
                    orientLabel: false,
                    expected: [
                        [150, 15, 0],
                        [150, 150 + 15, 0],
                        [150, 300 - 15, 0],
                    ],
                },
                {
                    layout: 'top-to-bottom',
                    labelsPosition: 'inward',
                    orientLabel: true,
                    expected: [
                        [150, 15, -90],
                        [150, 150 + 15, -90],
                        [150, 300 - 15, -90],
                    ],
                },
                {
                    layout: 'top-to-bottom',
                    labelsPosition: 'layout',
                    orientLabel: false,
                    expected: [
                        [150, 15, 0],
                        [150, 150 + 15, 0],
                        [150, 300 + 15, 0],
                    ],
                },
                {
                    layout: 'top-to-bottom',
                    labelsPosition: 'layout',
                    orientLabel: true,
                    expected: [
                        [150, 15, -90],
                        [150, 150 + 15, -90],
                        [150, 300 + 15, -90],
                    ],
                },
                {
                    layout: 'top-to-bottom',
                    labelsPosition: 'layout-opposite',
                    orientLabel: false,
                    expected: [
                        [150, -15, 0],
                        [150, 150 - 15, 0],
                        [150, 300 - 15, 0],
                    ],
                },
                {
                    layout: 'top-to-bottom',
                    labelsPosition: 'layout-opposite',
                    orientLabel: true,
                    expected: [
                        [150, -15, -90],
                        [150, 150 - 15, -90],
                        [150, 300 - 15, -90],
                    ],
                },
                {
                    layout: 'right-to-left',
                    labelsPosition: 'outward',
                    orientLabel: true,
                    expected: [
                        [300 + 15, 150, 0],
                        [150 + 15, 150, 0],
                        [-15, 150, 0],
                    ],
                },
                {
                    layout: 'right-to-left',
                    labelsPosition: 'inward',
                    orientLabel: true,
                    expected: [
                        [300 - 15, 150, 0],
                        [150 - 15, 150, 0],
                        [15, 150, 0],
                    ],
                },
                {
                    layout: 'right-to-left',
                    labelsPosition: 'layout',
                    orientLabel: true,
                    expected: [
                        [300 - 15, 150, 0],
                        [150 - 15, 150, 0],
                        [-15, 150, 0],
                    ],
                },
                {
                    layout: 'right-to-left',
                    labelsPosition: 'layout-opposite',
                    orientLabel: true,
                    expected: [
                        [300 + 15, 150, 0],
                        [150 + 15, 150, 0],
                        [15, 150, 0],
                    ],
                },
                {
                    layout: 'bottom-to-top',
                    labelsPosition: 'outward',
                    orientLabel: false,
                    expected: [
                        [150, 300 + 15, 0],
                        [150, 150 + 15, 0],
                        [150, -15, 0],
                    ],
                },
                {
                    layout: 'bottom-to-top',
                    labelsPosition: 'outward',
                    orientLabel: true,
                    expected: [
                        [150, 300 + 15, -90],
                        [150, 150 + 15, -90],
                        [150, -15, -90],
                    ],
                },
                {
                    layout: 'bottom-to-top',
                    labelsPosition: 'inward',
                    orientLabel: false,
                    expected: [
                        [150, 300 - 15, 0],
                        [150, 150 - 15, 0],
                        [150, 15, 0],
                    ],
                },
                {
                    layout: 'bottom-to-top',
                    labelsPosition: 'inward',
                    orientLabel: true,
                    expected: [
                        [150, 300 - 15, -90],
                        [150, 150 - 15, -90],
                        [150, 15, -90],
                    ],
                },
                {
                    layout: 'bottom-to-top',
                    labelsPosition: 'layout',
                    orientLabel: false,
                    expected: [
                        [150, 300 - 15, 0],
                        [150, 150 - 15, 0],
                        [150, -15, 0],
                    ],
                },
                {
                    layout: 'bottom-to-top',
                    labelsPosition: 'layout',
                    orientLabel: true,
                    expected: [
                        [150, 300 - 15, -90],
                        [150, 150 - 15, -90],
                        [150, -15, -90],
                    ],
                },
                {
                    layout: 'bottom-to-top',
                    labelsPosition: 'layout-opposite',
                    orientLabel: false,
                    expected: [
                        [150, 300 + 15, 0],
                        [150, 150 + 15, 0],
                        [150, 15, 0],
                    ],
                },
                {
                    layout: 'bottom-to-top',
                    labelsPosition: 'layout-opposite',
                    orientLabel: true,
                    expected: [
                        [150, 300 + 15, -90],
                        [150, 150 + 15, -90],
                        [150, 15, -90],
                    ],
                },
                {
                    layout: 'left-to-right',
                    labelsPosition: 'outward',
                    orientLabel: true,
                    expected: [
                        [-15, 150, 0],
                        [150 - 15, 150, 0],
                        [300 + 15, 150, 0],
                    ],
                },
                {
                    layout: 'left-to-right',
                    labelsPosition: 'inward',
                    orientLabel: true,
                    expected: [
                        [15, 150, 0],
                        [150 + 15, 150, 0],
                        [300 - 15, 150, 0],
                    ],
                },
                {
                    layout: 'left-to-right',
                    labelsPosition: 'layout',
                    orientLabel: true,
                    expected: [
                        [15, 150, 0],
                        [150 + 15, 150, 0],
                        [300 + 15, 150, 0],
                    ],
                },
                {
                    layout: 'left-to-right',
                    labelsPosition: 'layout-opposite',
                    orientLabel: true,
                    expected: [
                        [-15, 150, 0],
                        [150 - 15, 150, 0],
                        [300 - 15, 150, 0],
                    ],
                },
            ]

            const extractLabelPosition = (label: ReactTestInstance) => {
                // <g/> element defining the label translation.
                // We have to go 2 level down because of react-spring.
                const topGroup = (label.children[0] as ReactTestInstance)
                    .children[0] as ReactTestInstance
                expect(topGroup).toBeDefined()
                const translationTransform: string = topGroup.props.transform

                const translationRegExp = /^translate\((?<x>[-0-9.]+),(?<y>[-0-9.]+)\)$/
                const translationMatch = translationRegExp.exec(translationTransform)!
                expect(translationMatch).not.toBeNull()
                const x = Number(translationMatch.groups!.x)
                const y = Number(translationMatch.groups!.y)

                // <g/> element defining the label rotation.
                // We have to go 2 level down because of react-spring.
                const nestedGroup = (topGroup.children[0] as ReactTestInstance)
                    .children[0] as ReactTestInstance
                expect(nestedGroup).toBeDefined()
                const rotationTransform: string = nestedGroup.props.transform

                const rotationRegExp = /^rotate\((?<r>[-0-9.]+)\)$/
                const rotationMatch = rotationRegExp.exec(rotationTransform)!
                expect(rotationMatch).not.toBeNull()
                const rotation = Number(rotationMatch.groups!.r)

                return { x, y, rotation }
            }

            labelsPositionTestCases.forEach(testCase => {
                const description = [
                    `layout: ${testCase.layout}`,
                    `labelsPosition: ${testCase.labelsPosition}`,
                    `orientLabel: ${testCase.orientLabel ? 'true' : 'false'}`,
                ].join(', ')

                it(description, () => {
                    const root = create(
                        <Tree<Datum>
                            {...baseProps}
                            layout={testCase.layout}
                            labelsPosition={testCase.labelsPosition}
                            orientLabel={testCase.orientLabel}
                        />
                    ).root

                    // We're going to test 3 nodes, a root node, an intermediate one, and a leaf,
                    // it should be enough to assess that things are working as expected.
                    // Also note that nodes are in the middle, so that it's easier
                    // to check their position.
                    const labels = root.findAllByType(Label)

                    const [
                        [rootX, rootY, rootRotation],
                        [intermediateX, intermediateY, intermediateRotation],
                        [leafX, leafY, leafRotation],
                    ] = testCase.expected

                    const rootLabel = labels.find(label => label.props.label.id === '0')!
                    expect(rootLabel).toBeDefined()

                    const rootPosition = extractLabelPosition(rootLabel)
                    expect(rootPosition.x).toEqual(rootX)
                    expect(rootPosition.y).toEqual(rootY)
                    expect(rootPosition.rotation).toEqual(rootRotation)

                    const intermediateLabel = labels.find(label => label.props.label.id === '0.B')!
                    expect(intermediateLabel).toBeDefined()

                    const intermediatePosition = extractLabelPosition(intermediateLabel)
                    expect(intermediatePosition.x).toEqual(intermediateX)
                    expect(intermediatePosition.y).toEqual(intermediateY)
                    expect(intermediatePosition.rotation).toEqual(intermediateRotation)

                    const leafLabel = labels.find(label => label.props.label.id === '0.B.0')!
                    expect(leafLabel).toBeDefined()

                    const leafPosition = extractLabelPosition(leafLabel)
                    expect(leafPosition.x).toEqual(leafX)
                    expect(leafPosition.y).toEqual(leafY)
                    expect(leafPosition.rotation).toEqual(leafRotation)
                })
            })
        })
    })
})
