import { create } from 'react-test-renderer'
import { Globals } from '@react-spring/web'
import { colorSchemes } from '@nivo/colors'
import { ArcShape } from '@nivo/arcs'
import { PolarBar, PolarBarSvgProps, PolarBarDatum } from '../src'

interface Datum extends PolarBarDatum {
    id: string
    x: number
    y: number
}

const baseProps: PolarBarSvgProps<Datum> = {
    width: 600,
    height: 600,
    startAngle: 0,
    endAngle: 270,
    data: [
        { id: 'A', x: 5, y: 5 },
        { id: 'B', x: 0, y: 10 },
    ],
    keys: ['x', 'y'],
    animate: false,
}

describe('PolarBar', () => {
    beforeAll(() => {
        Globals.assign({ skipAnimation: true })
    })

    afterAll(() => {
        Globals.assign({ skipAnimation: false })
    })

    it('should render a polar bar chart', () => {
        const root = create(<PolarBar<Datum> {...baseProps} />).root

        const arcs = root.findAllByType(ArcShape)
        expect(arcs).toHaveLength(4)

        expect(arcs[0].props.datum.index).toEqual('A')
        expect(arcs[0].props.datum.key).toEqual('x')

        expect(arcs[1].props.datum.index).toEqual('B')
        expect(arcs[1].props.datum.key).toEqual('x')

        expect(arcs[2].props.datum.index).toEqual('A')
        expect(arcs[2].props.datum.key).toEqual('y')

        expect(arcs[3].props.datum.index).toEqual('B')
        expect(arcs[3].props.datum.key).toEqual('y')
    })

    describe('colors', () => {
        it('color scheme', () => {
            const root = create(
                <PolarBar<Datum> {...baseProps} colors={{ scheme: 'category10' }} />
            ).root

            const arcs = root.findAllByType(ArcShape)
            expect(arcs).toHaveLength(4)

            expect(arcs[0].props.datum.color).toEqual(colorSchemes.category10[0])
            expect(arcs[1].props.datum.color).toEqual(colorSchemes.category10[0])

            expect(arcs[2].props.datum.color).toEqual(colorSchemes.category10[1])
            expect(arcs[3].props.datum.color).toEqual(colorSchemes.category10[1])
        })

        it('colors array', () => {
            const customColors = ['#000000', '#FFFFFF']

            const root = create(<PolarBar<Datum> {...baseProps} colors={customColors} />).root

            const arcs = root.findAllByType(ArcShape)
            expect(arcs).toHaveLength(4)

            expect(arcs[0].props.datum.color).toEqual(customColors[0])
            expect(arcs[1].props.datum.color).toEqual(customColors[0])

            expect(arcs[2].props.datum.color).toEqual(customColors[1])
            expect(arcs[3].props.datum.color).toEqual(customColors[1])
        })

        it('color function', () => {
            const root = create(
                <PolarBar<Datum>
                    {...baseProps}
                    // Rather than using the key, we define the color based on the index.
                    colors={arc => {
                        if (arc.index === 'A') return '#FF0000'
                        return '#00FF00'
                    }}
                />
            ).root

            const arcs = root.findAllByType(ArcShape)
            expect(arcs).toHaveLength(4)

            expect(arcs[0].props.datum.color).toEqual('#FF0000')
            expect(arcs[1].props.datum.color).toEqual('#00FF00')

            expect(arcs[2].props.datum.color).toEqual('#FF0000')
            expect(arcs[3].props.datum.color).toEqual('#00FF00')
        })
    })

    describe('accessibility', () => {
        it('aria properties', () => {
            const root = create(
                <PolarBar<Datum>
                    {...baseProps}
                    ariaLabel="AriaLabel"
                    ariaLabelledBy="AriaLabelledBy"
                    ariaDescribedBy="AriaDescribedBy"
                />
            ).root

            const svg = root.findByType('svg')
            expect(svg.props['aria-label']).toBe('AriaLabel')
            expect(svg.props['aria-labelledby']).toBe('AriaLabelledBy')
            expect(svg.props['aria-describedby']).toBe('AriaDescribedBy')
        })
    })
})
