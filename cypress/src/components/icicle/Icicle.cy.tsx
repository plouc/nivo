import { linearGradientDef, patternDotsDef } from '@nivo/core'
import { colorSchemes } from '@nivo/colors'
import { Icicle, IcicleSvgProps, DefaultIcicleDatum } from '@nivo/icicle'
import get from 'lodash/get.js'

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

const defaultProps: IcicleSvgProps<DefaultIcicleDatum> = {
    width: 400,
    height: 400,
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },
    padding: 2,
    enableZooming: false,
    animate: false,
    data: defaultData,
}

interface ExpectedNode {
    path: string
    id: string
    value: number
    color: string
}

const testNode = (expectedNode: ExpectedNode) => {
    const node = cy.findByTestId(`icicle.rect.${expectedNode.path}`).should('exist')
    node.should('have.attr', 'fill', expectedNode.color)

    node.trigger('mouseover')
    let tooltip = cy.findByRole('tooltip').should('exist')
    tooltip.should('contain', `${expectedNode.id}: ${expectedNode.value}`)

    node.trigger('mouseout')
    cy.findByRole('tooltip').should('not.exist')
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
        cy.mount(<Icicle<DefaultIcicleDatum> {...defaultProps} />)

        testNodes([
            {
                path: 'root',
                id: 'root',
                value: 100,
                color: colorSchemes.nivo[0],
            },
            {
                path: 'root.A',
                id: 'A',
                value: 50,
                color: colorSchemes.nivo[1],
            },
            {
                path: 'root.A.0',
                id: '0',
                value: 25,
                color: colorSchemes.nivo[1],
            },
            {
                path: 'root.A.1',
                id: '1',
                value: 25,
                color: colorSchemes.nivo[1],
            },
            {
                path: 'root.B',
                id: 'B',
                value: 50,
                color: colorSchemes.nivo[2],
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
                    id: 'root',
                    path: 'root',
                    value: 100,
                    color: colorSchemes.nivo[0],
                },
                {
                    id: 'A',
                    path: 'root.A',
                    value: 50,
                    color: colorSchemes.nivo[1],
                },
                {
                    id: '0',
                    path: 'root.A.0',
                    value: 25,
                    color: colorSchemes.nivo[1],
                },
                {
                    id: '1',
                    path: 'root.A.1',
                    value: 25,
                    color: colorSchemes.nivo[1],
                },
                {
                    id: 'B',
                    path: 'root.B',
                    value: 50,
                    color: colorSchemes.nivo[2],
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
                    id: 'root',
                    path: 'root',
                    value: 100,
                    color: colorSchemes.nivo[0],
                },
                {
                    id: 'A',
                    path: 'root.A',
                    value: 50,
                    color: colorSchemes.nivo[1],
                },
                {
                    id: '0',
                    path: 'root.A.0',
                    value: 25,
                    color: colorSchemes.nivo[1],
                },
                {
                    id: '1',
                    path: 'root.A.1',
                    value: 25,
                    color: colorSchemes.nivo[1],
                },
                {
                    id: 'B',
                    path: 'root.B',
                    value: 50,
                    color: colorSchemes.nivo[2],
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
                    id: 'root',
                    value: 100,
                    color: colorSchemes.accent[0],
                },
                {
                    path: 'root.A',
                    id: 'A',
                    value: 50,
                    color: colorSchemes.accent[1],
                },
                {
                    path: 'root.A.0',
                    id: '0',
                    value: 25,
                    color: colorSchemes.accent[1],
                },
                {
                    path: 'root.A.1',
                    id: '1',
                    value: 25,
                    color: colorSchemes.accent[1],
                },
                {
                    path: 'root.B',
                    id: 'B',
                    value: 50,
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
                    id: 'root',
                    value: 100,
                    color: dataWithColor.color,
                },
                {
                    path: 'root.A',
                    id: 'A',
                    value: 50,
                    color: getNode(dataWithColor, 'children.0').color,
                },
                {
                    path: 'root.A.0',
                    id: '0',
                    value: 25,
                    color: getNode(dataWithColor, 'children.0.children.0').color,
                },
                {
                    path: 'root.A.1',
                    id: '1',
                    value: 25,
                    color: getNode(dataWithColor, 'children.0.children.1').color,
                },
                {
                    path: 'root.B',
                    id: 'B',
                    value: 50,
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
                    id: 'root',
                    value: 100,
                    color: dataWithColor.color,
                },
                {
                    path: 'root.A',
                    id: 'A',
                    value: 50,
                    color: getNode(dataWithColor, 'children.0').color,
                },
                {
                    path: 'root.A.0',
                    id: '0',
                    value: 25,
                    color: getNode(dataWithColor, 'children.0').color,
                },
                {
                    path: 'root.A.1',
                    id: '1',
                    value: 25,
                    color: getNode(dataWithColor, 'children.0').color,
                },
                {
                    path: 'root.B',
                    id: 'B',
                    value: 50,
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
                    id: 'root',
                    value: 100,
                    color: colorSchemes.nivo[0],
                },
                {
                    path: 'root.A',
                    id: 'A',
                    value: 50,
                    color: colorSchemes.nivo[1],
                },
                {
                    path: 'root.A.0',
                    id: '0',
                    value: 25,
                    color: colorSchemes.nivo[2],
                },
                {
                    path: 'root.A.1',
                    id: '1',
                    value: 25,
                    color: colorSchemes.nivo[2],
                },
                {
                    path: 'root.B',
                    id: 'B',
                    value: 50,
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
                    padding={4}
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
                        { match: { path: 'root' }, id: 'pattern' },
                        { match: { path: 'root.A.1' }, id: 'pattern' },
                    ]}
                />
            )

            testNodes([
                {
                    path: 'root',
                    id: 'root',
                    value: 100,
                    color: `url(#pattern.bg.${colorSchemes.nivo[0]})`,
                },
                {
                    path: 'root.A',
                    id: 'A',
                    value: 50,
                    color: colorSchemes.nivo[1],
                },
                {
                    path: 'root.A.0',
                    id: '0',
                    value: 25,
                    color: colorSchemes.nivo[1],
                },
                {
                    path: 'root.A.1',
                    id: '1',
                    value: 25,
                    color: `url(#pattern.bg.${colorSchemes.nivo[1]})`,
                },
                {
                    path: 'root.B',
                    id: 'B',
                    value: 50,
                    color: colorSchemes.nivo[2],
                },
            ])
        })

        it('should support gradients', () => {
            cy.mount(
                <Icicle<DefaultIcicleDatum>
                    {...defaultProps}
                    padding={4}
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
                        { match: { path: 'root' }, id: 'gradient' },
                        { match: { path: 'root.A.1' }, id: 'gradient' },
                    ]}
                />
            )

            testNodes([
                {
                    path: 'root',
                    id: 'root',
                    value: 100,
                    color: `url(#gradient.0.${colorSchemes.nivo[0]}.1.${colorSchemes.nivo[0]})`,
                },
                {
                    path: 'root.A',
                    id: 'A',
                    value: 50,
                    color: colorSchemes.nivo[1],
                },
                {
                    path: 'root.A.0',
                    id: '0',
                    value: 25,
                    color: colorSchemes.nivo[1],
                },
                {
                    path: 'root.A.1',
                    id: '1',
                    value: 25,
                    color: `url(#gradient.0.${colorSchemes.nivo[1]}.1.${colorSchemes.nivo[1]})`,
                },
                {
                    path: 'root.B',
                    id: 'B',
                    value: 50,
                    color: colorSchemes.nivo[2],
                },
            ])
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

    /*
    describe('slice labels', () => {
        it('should be disabled by default', () => {
            const wrapper = mount(<Icicles width={400} height={400} data={sampleData} />)
            expect(wrapper.find(RectLabelsLayer).exists()).toBeFalsy()
        })

        it('should render labels when enabled', () => {
            const wrapper = mount(
                <Icicles width={400} height={400} data={sampleData} enableRectLabels />
            )

            const labels = wrapper.find(RectLabel)
            expect(labels).toHaveLength(6)

            expect(labels.at(0).text()).toEqual('100.00%')
            expect(labels.at(1).text()).toEqual('84.62%')
            expect(labels.at(2).text()).toEqual('15.38%')
            expect(labels.at(3).text()).toEqual('46.15%')
            expect(labels.at(4).text()).toEqual('38.46%')
            expect(labels.at(5).text()).toEqual('46.15%')
        })

        it('should use formattedValue', () => {
            const wrapper = mount(
                <Icicles
                    width={400}
                    height={400}
                    data={sampleData}
                    enableRectLabels
                    valueFormat=" >-$.2f"
                />
            )

            const labels = wrapper.find(RectLabel)
            expect(labels).toHaveLength(6)

            expect(labels.at(1).prop('datum').formattedValue).toEqual('$110.00')
            expect(labels.at(1).find('text').text()).toEqual('$110.00')

            expect(labels.at(2).prop('datum').formattedValue).toEqual('$20.00')
            expect(labels.at(2).find('text').text()).toEqual('$20.00')

            expect(labels.at(3).prop('datum').formattedValue).toEqual('$60.00')
            expect(labels.at(3).find('text').text()).toEqual('$60.00')

            expect(labels.at(4).prop('datum').formattedValue).toEqual('$50.00')
            expect(labels.at(4).find('text').text()).toEqual('$50.00')

            expect(labels.at(5).prop('datum').formattedValue).toEqual('$60.00')
            expect(labels.at(5).find('text').text()).toEqual('$60.00')
        })

        it('should allow to change the label accessor using a path', () => {
            const wrapper = mount(
                <Icicles
                    width={400}
                    height={400}
                    data={sampleData}
                    enableRectLabels
                    rectLabel="id"
                />
            )

            const labels = wrapper.find(RectLabel)
            expect(labels).toHaveLength(6)

            expect(labels.at(0).text()).toEqual('root')
            expect(labels.at(1).text()).toEqual('A')
            expect(labels.at(2).text()).toEqual('B')
            expect(labels.at(3).text()).toEqual('A-1')
            expect(labels.at(4).text()).toEqual('A-2')
            expect(labels.at(5).text()).toEqual('A-1-I')
        })

        it('should allow to change the label accessor using a function', () => {
            const wrapper = mount(
                <Icicles
                    width={400}
                    height={400}
                    data={sampleData}
                    enableRectLabels
                    rectLabel={datum => `${datum.id} - ${datum.value}`}
                />
            )

            const labels = wrapper.find(RectLabel)
            expect(labels).toHaveLength(6)

            expect(labels.at(1).find('text').text()).toEqual('A - 110')
            expect(labels.at(2).find('text').text()).toEqual('B - 20')
        })
    })

    describe('tooltip', () => {
        it('should render a tooltip when hovering a slice', () => {
            const wrapper = mount(<Icicles width={400} height={400} data={sampleData} />)

            expect(wrapper.find('IciclesTooltip').exists()).toBeFalsy()

            wrapper.find(RectShape).at(2).simulate('mouseenter')

            const tooltip = wrapper.find('IciclesTooltip')
            expect(tooltip.exists()).toBeTruthy()
            expect(tooltip.text()).toEqual('B: 15.38%')
        })

        it('should allow to override the default tooltip', () => {
            const CustomTooltip = ({ id }) => <span>{id}</span>
            const wrapper = mount(
                <Icicles width={400} height={400} data={sampleData} tooltip={CustomTooltip} />
            )

            wrapper.find(RectShape).at(2).simulate('mouseenter')

            const tooltip = wrapper.find(CustomTooltip)
            expect(tooltip.exists()).toBeTruthy()
            expect(tooltip.text()).toEqual('B')
        })
    })

    describe('layers', () => {
        it('should support disabling a layer', () => {
            const wrapper = mount(<Icicles width={400} height={400} data={sampleData} />)
            expect(wrapper.find(RectShape)).toHaveLength(6) // root included

            wrapper.setProps({ layers: ['rectLabels'] })
            expect(wrapper.find(RectShape)).toHaveLength(0)
        })

        it('should support adding a custom layer', () => {
            const CustomLayer = () => null

            const wrapper = mount(
                <Icicles
                    width={400}
                    height={400}
                    data={sampleData}
                    layers={['rects', 'rectLabels', CustomLayer]}
                />
            )

            const customLayer = wrapper.find(CustomLayer)

            // root included
            expect(customLayer.prop('nodes')).toHaveLength(6)
        })
    })
    */
})
