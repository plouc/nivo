import { create, act } from 'react-test-renderer'
import { Globals } from '@react-spring/web'
import { NonMemoizedAxis } from '@nivo/axes'
// @ts-ignore
import { Line } from '../src/Line'
// @ts-ignore
import { LinesItem } from '../src/LinesItem'
// @ts-ignore
import { SlicesItem } from '../src/SlicesItem'

describe('Line', () => {
    beforeAll(() => {
        Globals.assign({ skipAnimation: true })
    })

    afterAll(() => {
        Globals.assign({ skipAnimation: false })
    })

    const singleLineSampleData = [
        {
            id: 'A',
            color: '#FF0000',
            data: [
                { x: 0, y: 3 },
                { x: 1, y: 7 },
                { x: 2, y: 11 },
                { x: 3, y: 9 },
                { x: 4, y: 8 },
            ],
        },
    ]

    const multipleLinesSampleData = [
        ...singleLineSampleData,
        {
            id: 'B',
            color: '#00FF00',
            data: [
                { x: 0, y: 1 },
                { x: 1, y: 3 },
                { x: 2, y: 5 },
                { x: 3, y: 7 },
                { x: 4, y: 11 },
            ],
        },
        {
            id: 'C',
            color: '#0000FF',
            data: [
                { x: 0, y: 5 },
                { x: 1, y: 2 },
                { x: 2, y: 4 },
                { x: 3, y: 9 },
                { x: 4, y: 3 },
            ],
        },
    ]

    // These defaults focus on the lines, so we disable most extra features,
    // which can be overriden depending on the test case.
    const defaultProps = {
        axisLeft: null,
        axisBottom: null,
        isInteractive: false,
        animate: false,
        enableGridX: false,
        enableGridY: false,
        enableSlices: false as const,
        enablePoints: false,
    }

    describe('data', () => {
        it('should support a single line', () => {
            const component = create(
                <Line width={500} height={300} data={singleLineSampleData} animate={false} />
            )

            let tree = component.toJSON()
            expect(tree).toMatchSnapshot()
        })

        it('should support multiple lines', () => {
            const component = create(
                <Line width={500} height={300} data={multipleLinesSampleData} animate={false} />
            )

            let tree = component.toJSON()
            expect(tree).toMatchSnapshot()
        })
    })

    it('should have left and bottom axis by default', () => {
        const data = [
            {
                id: 'A',
                data: [
                    { x: 0, y: 3 },
                    { x: 1, y: 7 },
                    { x: 2, y: 11 },
                    { x: 3, y: 9 },
                    { x: 4, y: 8 },
                ],
            },
        ]
        const instance = create(<Line width={500} height={300} data={data} animate={false} />).root

        const axes = instance.findAllByType(NonMemoizedAxis)
        expect(axes).toHaveLength(2)
        expect(axes[0].props.axis).toBe('x')
        expect(axes[1].props.axis).toBe('y')
    })

    describe('curve interpolation', () => {
        const curveInterpolations = [
            'basis',
            'cardinal',
            'catmullRom',
            'linear',
            'monotoneX',
            'monotoneY',
            'natural',
            'step',
            'stepAfter',
            'stepBefore',
        ] as const

        for (const curveInterpolation of curveInterpolations) {
            it(`should support ${curveInterpolation} curve interpolation`, () => {
                const component = create(
                    <Line
                        {...defaultProps}
                        width={500}
                        height={300}
                        data={multipleLinesSampleData}
                        curve={curveInterpolation}
                    />
                )

                // Computing the exact path depending on the curve interpolation
                // might be a bit fragile, that's why we rely on snapshots here.
                const tree = component.toJSON()
                expect(tree).toMatchSnapshot()
            })
        }
    })

    describe('colors', () => {
        describe('lines', () => {
            it('should use colors from the default color scheme', () => {
                const instance = create(
                    <Line
                        {...defaultProps}
                        width={500}
                        height={300}
                        data={multipleLinesSampleData}
                    />
                ).root

                const lines = instance.findAllByType(LinesItem)
                const lineColors = lines.map(line => line.props.color as string)
                expect(lineColors).toEqual(['#f1e15b', '#f47560', '#e8c1a0'])
            })

            it('should use colors statically defined as an array', () => {
                const staticColors = ['#F0000F', '#0F00F0', '#00FF00']
                const instance = create(
                    <Line
                        {...defaultProps}
                        width={500}
                        height={300}
                        data={multipleLinesSampleData}
                        colors={staticColors}
                    />
                ).root

                const lines = instance.findAllByType(LinesItem)
                const lineColors = lines.map(line => line.props.color as string)
                expect(lineColors).toEqual([...staticColors].reverse())
            })

            it('should allow to use colors from data using a path', () => {
                const instance = create(
                    <Line
                        {...defaultProps}
                        width={500}
                        height={300}
                        data={multipleLinesSampleData}
                        colors={{ datum: 'color' }}
                    />
                ).root

                const lines = instance.findAllByType(LinesItem)
                const lineColors = lines.map(line => line.props.color as string)
                expect(lineColors).toEqual([...multipleLinesSampleData.map(d => d.color)].reverse())
            })

            it('should allow to use colors from data using a function', () => {
                const instance = create(
                    <Line
                        {...defaultProps}
                        width={500}
                        height={300}
                        data={multipleLinesSampleData}
                        colors={d => d.color}
                    />
                ).root

                const lines = instance.findAllByType(LinesItem)
                const lineColors = lines.map(line => line.props.color as string)
                expect(lineColors).toEqual([...multipleLinesSampleData.map(d => d.color)].reverse())
            })
        })

        describe('areas', () => {
            xit('should use colors derived from the corresponding line', () => {})
        })
    })

    describe('interactivity', () => {
        const data = [
            {
                id: 'A',
                data: [
                    { x: 0, y: 3 },
                    { x: 1, y: 7 },
                    { x: 2, y: 11 },
                    { x: 3, y: 9 },
                    { x: 4, y: 8 },
                ],
            },
        ]
        const baseProps = {
            width: 500,
            height: 300,
            data: data,
            animate: false,
            enableSlices: 'x' as const,
        }

        describe('slices', () => {
            it('should have a slice for each x value when x slices are enabled', () => {
                const instance = create(
                    <Line
                        width={400}
                        height={300}
                        data={singleLineSampleData}
                        enableSlices="x"
                        animate={false}
                    />
                ).root

                const slices = instance.findAllByType(SlicesItem)
                expect(slices).toHaveLength(singleLineSampleData[0].data.length)

                singleLineSampleData[0].data.forEach((_, index) => {
                    const slice = slices[index]
                    expect(slices[index].props.slice.id).toBe(index * 100)

                    const rect = slice.findByType('rect')
                    expect(rect.props.height).toBe(300)
                    expect(rect.props.fillOpacity).toBe(0)
                    expect(rect.props.strokeWidth).toBe(0)
                })
            })

            xit('should call onMouseEnter', async () => {
                const onMouseEnter = jest.fn()
                const instance = create(<Line {...baseProps} onMouseEnter={onMouseEnter} />).root

                const slices = instance.findAllByType(SlicesItem)
                expect(slices).toHaveLength(data[0].data.length)

                await act(() => {
                    slices[0].findByType('rect').props.onMouseEnter()
                })

                expect(onMouseEnter).toHaveBeenCalledTimes(1)
            })

            xit('should call onMouseMove', async () => {
                const onMouseMove = jest.fn()
                const instance = create(<Line {...baseProps} onMouseMove={onMouseMove} />).root

                const slices = instance.findAllByType(SlicesItem)
                expect(slices).toHaveLength(data[0].data.length)

                await act(() => {
                    slices[0].findByType('rect').props.onMouseMove()
                })

                expect(onMouseMove).toHaveBeenCalledTimes(1)
            })

            it('should call onMouseLeave', async () => {
                const onMouseLeave = jest.fn()
                const instance = create(<Line {...baseProps} onMouseLeave={onMouseLeave} />).root

                const slices = instance.findAllByType(SlicesItem)
                expect(slices).toHaveLength(data[0].data.length)

                await act(() => {
                    slices[0].findByType('rect').props.onMouseLeave()
                })

                expect(onMouseLeave).toHaveBeenCalledTimes(1)
            })

            it('should call onClick', async () => {
                const onClick = jest.fn()
                const instance = create(<Line {...baseProps} onClick={onClick} />).root

                const slices = instance.findAllByType(SlicesItem)
                expect(slices).toHaveLength(data[0].data.length)

                await act(() => {
                    slices[0].findByType('rect').props.onClick()
                })

                expect(onClick).toHaveBeenCalledTimes(1)
            })
        })
    })
})
