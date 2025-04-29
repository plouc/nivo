import { create, act, ReactTestInstance } from 'react-test-renderer'
import { Bump, BumpSvgProps, isComputedBumpSerie } from '../src'
import { Line } from '../src/bump/Line'

interface Datum {
    x: number
    y: number
}

const sampleData: BumpSvgProps<Datum, Record<string, unknown>>['data'] = [
    {
        id: 'A',
        data: [
            {
                x: 2000,
                y: 9,
            },
            {
                x: 2001,
                y: 9,
            },
            {
                x: 2002,
                y: 2,
            },
            {
                x: 2003,
                y: 4,
            },
        ],
    },
    {
        id: 'B',
        data: [
            {
                x: 2000,
                y: 8,
            },
            {
                x: 2001,
                y: 3,
            },
            {
                x: 2002,
                y: 1,
            },
            {
                x: 2003,
                y: 7,
            },
        ],
    },
    {
        id: 'C',
        data: [
            {
                x: 2000,
                y: 12,
            },
            {
                x: 2001,
                y: 4,
            },
            {
                x: 2002,
                y: 5,
            },
            {
                x: 2003,
                y: 6,
            },
        ],
    },
]

const baseProps: BumpSvgProps<Datum> = {
    width: 800,
    height: 600,
    data: sampleData,
    animate: false,
}

it('should render a basic bump chart', () => {
    const root = create(<Bump<Datum> {...baseProps} />).root

    const lines = root.findAllByType(Line)
    expect(lines).toHaveLength(3)

    expect(lines[0].props.serie.id).toEqual('A')
    expect(lines[1].props.serie.id).toEqual('B')
    expect(lines[2].props.serie.id).toEqual('C')
})

const seriesLine = (seriesId: string) => (node: ReactTestInstance) => {
    if (node.type !== 'path') return false
    if (!('data-testid' in node.props)) return false
    return (node.props['data-testid'] as string) === `line.${seriesId}`
}

const seriesCircles = (seriesId: string) => (node: ReactTestInstance) => {
    if (node.type !== 'circle') return false
    if (!('data-testid' in node.props)) return false
    return (node.props['data-testid'] as string).startsWith(`point.${seriesId}.`)
}

describe('style', () => {
    it('custom colors array', () => {
        const colors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)']
        const root = create(<Bump<Datum> {...baseProps} colors={colors} />).root

        expect(root.find(seriesLine('A')).props.stroke).toEqual(colors[0])
        const lineACircles = root.findAll(seriesCircles('A'))
        expect(lineACircles.every(circle => circle.props.fill === colors[0])).toBeTruthy()

        expect(root.find(seriesLine('B')).props.stroke).toEqual(colors[1])
        const lineBCircles = root.findAll(seriesCircles('B'))
        expect(lineBCircles.every(circle => circle.props.fill === colors[1])).toBeTruthy()

        expect(root.find(seriesLine('C')).props.stroke).toEqual(colors[2])
        const lineCCircles = root.findAll(seriesCircles('C'))
        expect(lineCCircles.every(circle => circle.props.fill === colors[2])).toBeTruthy()
    })

    it('colors from data', () => {
        const colors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)']
        const root = create(
            <Bump<Datum, { color: string }>
                {...baseProps as BumpSvgProps<Datum, { color: string }>}
                data={sampleData.map((serie, i) => ({
                    ...serie,
                    color: colors[i],
                }))}
                colors={serie => serie.color}
            />
        ).root

        expect(root.find(seriesLine('A')).props.stroke).toEqual(colors[0])
        const lineACircles = root.findAll(seriesCircles('A'))
        expect(lineACircles.every(circle => circle.props.fill === colors[0])).toBeTruthy()

        expect(root.find(seriesLine('B')).props.stroke).toEqual(colors[1])
        const lineBCircles = root.findAll(seriesCircles('B'))
        expect(lineBCircles.every(circle => circle.props.fill === colors[1])).toBeTruthy()

        expect(root.find(seriesLine('C')).props.stroke).toEqual(colors[2])
        const lineCCircles = root.findAll(seriesCircles('C'))
        expect(lineCCircles.every(circle => circle.props.fill === colors[2])).toBeTruthy()
    })
})

describe('labels', () => {
    it('default end labels', () => {
        const root = create(<Bump<Datum> {...baseProps} />).root

        const labelA = root.findByProps({ 'data-testid': 'label.end.A' })
        expect(labelA.props.children).toEqual('A')
        expect(labelA.props.textAnchor).toEqual('start')

        const labelB = root.findByProps({ 'data-testid': 'label.end.B' })
        expect(labelB.props.children).toEqual('B')
        expect(labelB.props.textAnchor).toEqual('start')

        const labelC = root.findByProps({ 'data-testid': 'label.end.C' })
        expect(labelC.props.children).toEqual('C')
        expect(labelC.props.textAnchor).toEqual('start')
    })

    it('customize end labels', () => {
        const root = create(
            <Bump<Datum> {...baseProps} endLabel={serie => `Serie ${serie.id}`} />
        ).root

        expect(root.findByProps({ 'data-testid': 'label.end.A' }).props.children).toEqual('Serie A')
        expect(root.findByProps({ 'data-testid': 'label.end.B' }).props.children).toEqual('Serie B')
        expect(root.findByProps({ 'data-testid': 'label.end.C' }).props.children).toEqual('Serie C')
    })

    it('end labels from data', () => {
        const root = create(
            <Bump<Datum, { label: string }>
                {...baseProps as BumpSvgProps<Datum, { label: string }>}
                data={sampleData.map(serie => ({
                    ...serie,
                    label: `Serie ${serie.id} label`,
                }))}
                endLabel={serie => serie.label}
            />
        ).root

        expect(root.findByProps({ 'data-testid': 'label.end.A' }).props.children).toEqual(
            'Serie A label'
        )
        expect(root.findByProps({ 'data-testid': 'label.end.B' }).props.children).toEqual(
            'Serie B label'
        )
        expect(root.findByProps({ 'data-testid': 'label.end.C' }).props.children).toEqual(
            'Serie C label'
        )
    })

    it('start labels', () => {
        const root = create(<Bump<Datum> {...baseProps} startLabel />).root

        const labelA = root.findByProps({ 'data-testid': 'label.start.A' })
        expect(labelA.props.children).toEqual('A')
        expect(labelA.props.textAnchor).toEqual('end')

        const labelB = root.findByProps({ 'data-testid': 'label.start.B' })
        expect(labelB.props.children).toEqual('B')
        expect(labelB.props.textAnchor).toEqual('end')

        const labelC = root.findByProps({ 'data-testid': 'label.start.C' })
        expect(labelC.props.children).toEqual('C')
        expect(labelC.props.textAnchor).toEqual('end')
    })

    it('customize start labels', () => {
        const root = create(
            <Bump<Datum> {...baseProps} startLabel={serie => `Serie ${serie.id}`} />
        ).root

        expect(root.findByProps({ 'data-testid': 'label.start.A' }).props.children).toEqual(
            'Serie A'
        )
        expect(root.findByProps({ 'data-testid': 'label.start.B' }).props.children).toEqual(
            'Serie B'
        )
        expect(root.findByProps({ 'data-testid': 'label.start.C' }).props.children).toEqual(
            'Serie C'
        )
    })

    it('start labels from data', () => {
        const root = create(
            <Bump<Datum, { label: string }>
                {...baseProps as BumpSvgProps<Datum, { label: string }>}
                data={sampleData.map(serie => ({
                    ...serie,
                    label: `Serie ${serie.id} label`,
                }))}
                startLabel={serie => serie.label}
            />
        ).root

        expect(root.findByProps({ 'data-testid': 'label.start.A' }).props.children).toEqual(
            'Serie A label'
        )
        expect(root.findByProps({ 'data-testid': 'label.start.B' }).props.children).toEqual(
            'Serie B label'
        )
        expect(root.findByProps({ 'data-testid': 'label.start.C' }).props.children).toEqual(
            'Serie C label'
        )
    })
})

describe('interactivity', () => {
    describe('lines', () => {
        it('onMouseEnter', () => {
            const mouseEnterHandler = jest.fn()
            const root = create(
                <Bump<Datum> {...baseProps} onMouseEnter={mouseEnterHandler} />
            ).root

            const onMouseEnter = root.findByProps({ 'data-testid': 'line.B.interactive' }).props
                .onMouseEnter
            expect(onMouseEnter).toBeDefined()
            // Skipped due to `getBoundingClientRect`.
            // onMouseEnter()

            // expect(mouseEnterHandler).toHaveBeenCalledTimes(1)
            // const [series] = mouseEnterHandler.mock.calls[0]
            // expect(isComputedBumpSerie(series)).toBeTruthy()
            // expect(series.id).toEqual('B')
        })

        it('onMouseMove', () => {
            const mouseMoveHandler = jest.fn()
            const root = create(<Bump<Datum> {...baseProps} onMouseMove={mouseMoveHandler} />).root

            const onMouseMove = root.findByProps({ 'data-testid': 'line.C.interactive' }).props
                .onMouseMove
            expect(onMouseMove).toBeDefined()
            // Skipped due to `getBoundingClientRect`.
            // onMouseMove()

            // expect(mouseMoveHandler).toHaveBeenCalledTimes(1)
            // const [series] = mouseMoveHandler.mock.calls[0]
            // expect(isComputedBumpSerie(series)).toBeTruthy()
            // expect(series.id).toEqual('C')
        })

        it('onMouseLeave', async () => {
            const mouseLeaveHandler = jest.fn()
            const root = create(
                <Bump<Datum> {...baseProps} onMouseLeave={mouseLeaveHandler} />
            ).root

            const onMouseLeave = root.findByProps({ 'data-testid': 'line.A.interactive' }).props
                .onMouseLeave
            expect(onMouseLeave).toBeDefined()
            await act(() => onMouseLeave())

            expect(mouseLeaveHandler).toHaveBeenCalledTimes(1)
            const [series] = mouseLeaveHandler.mock.calls[0]
            expect(isComputedBumpSerie(series)).toBeTruthy()
            expect(series.id).toEqual('A')
        })

        it('onMouseDown', async () => {
            const mouseDownHandler = jest.fn()
            const root = create(<Bump<Datum> {...baseProps} onMouseDown={mouseDownHandler} />).root

            const onMouseDown = root.findByProps({ 'data-testid': 'line.B.interactive' }).props
                .onMouseDown
            expect(onMouseDown).toBeDefined()
            await act(() => onMouseDown())

            expect(mouseDownHandler).toHaveBeenCalledTimes(1)
            const [series] = mouseDownHandler.mock.calls[0]
            expect(isComputedBumpSerie(series)).toBeTruthy()
            expect(series.id).toEqual('B')
        })

        it('onMouseUp', async () => {
            const mouseUpHandler = jest.fn()
            const root = create(<Bump<Datum> {...baseProps} onMouseUp={mouseUpHandler} />).root

            const onMouseUp = root.findByProps({ 'data-testid': 'line.B.interactive' }).props
                .onMouseUp
            expect(onMouseUp).toBeDefined()
            await act(() => onMouseUp())

            expect(mouseUpHandler).toHaveBeenCalledTimes(1)
            const [series] = mouseUpHandler.mock.calls[0]
            expect(isComputedBumpSerie(series)).toBeTruthy()
            expect(series.id).toEqual('B')
        })

        it('onClick', async () => {
            const clickHandler = jest.fn()
            const root = create(<Bump<Datum> {...baseProps} onClick={clickHandler} />).root

            const onClick = root.findByProps({ 'data-testid': 'line.B.interactive' }).props.onClick
            expect(onClick).toBeDefined()
            await act(() => onClick())

            expect(clickHandler).toHaveBeenCalledTimes(1)
            const [series] = clickHandler.mock.calls[0]
            expect(isComputedBumpSerie(series)).toBeTruthy()
            expect(series.id).toEqual('B')
        })

        it('onDoubleClick', async () => {
            const doubleClickHandler = jest.fn()
            const root = create(
                <Bump<Datum> {...baseProps} onDoubleClick={doubleClickHandler} />
            ).root

            const onDoubleClick = root.findByProps({ 'data-testid': 'line.B.interactive' }).props
                .onDoubleClick
            expect(onDoubleClick).toBeDefined()
            await act(() => onDoubleClick())

            expect(doubleClickHandler).toHaveBeenCalledTimes(1)
            const [series] = doubleClickHandler.mock.calls[0]
            expect(isComputedBumpSerie(series)).toBeTruthy()
            expect(series.id).toEqual('B')
        })

        it('non-interactive', () => {
            const root = create(<Bump<Datum> {...baseProps} isInteractive={false} />).root

            expect(root.findAllByProps({ 'data-testid': 'line.B.interactive' })).toHaveLength(0)
        })
    })

    describe('points', () => {
        // Point event handlers cannot be tested as we need a DOM environment.
        it('lines should not be interactive anymore when using a mesh', () => {
            const root = create(<Bump<Datum> {...baseProps} useMesh={true} />).root

            expect(root.findAllByProps({ 'data-testid': 'line.B.interactive' })).toHaveLength(0)
        })
    })
})
