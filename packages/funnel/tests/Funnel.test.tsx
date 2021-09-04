import { mount } from 'enzyme'
// @ts-ignore
import { Funnel, FunnelPart } from '../src'

const sampleData = [
    {
        id: 'step_sent',
        value: 300,
        label: 'Sent',
    },
    {
        id: 'step_viewed',
        value: 200,
        label: 'Viewed',
    },
    {
        id: 'step_clicked',
        value: 100,
        label: 'Clicked',
    },
]

const baseProps = {
    // keeping multiple of 3 for easier assertions to match
    // the length of `sampleData`
    width: 300,
    height: 600,
    data: sampleData,
}

it('basic funnel', () => {
    const wrapper = mount(<Funnel {...baseProps} />)

    const parts = wrapper.find('Part')
    expect(parts.length).toBe(sampleData.length)

    const part0 = parts.at(0)
    expect(part0.prop<FunnelPart>('part').data).toBe(sampleData[0])
    expect(part0.prop<FunnelPart>('part').color).toBe('#e8c1a0')
    expect(part0.prop<FunnelPart>('part').x0).toBe(0)
    expect(part0.prop<FunnelPart>('part').x1).toBe(300)
    expect(part0.prop<FunnelPart>('part').width).toBe(300)
    expect(part0.prop<FunnelPart>('part').y0).toBe(0)
    expect(part0.prop<FunnelPart>('part').y1).toBe(200)
    expect(part0.prop<FunnelPart>('part').height).toBe(200)

    const part1 = parts.at(1)
    expect(part1.prop<FunnelPart>('part').data).toBe(sampleData[1])
    expect(part1.prop<FunnelPart>('part').color).toBe('#f47560')
    expect(part1.prop<FunnelPart>('part').x0).toBe(50)
    expect(part1.prop<FunnelPart>('part').x1).toBe(250)
    expect(part1.prop<FunnelPart>('part').width).toBe(200)
    expect(part1.prop<FunnelPart>('part').y0).toBe(200)
    expect(part1.prop<FunnelPart>('part').y1).toBe(400)
    expect(part1.prop<FunnelPart>('part').height).toBe(200)

    const part2 = parts.at(2)
    expect(part2.prop<FunnelPart>('part').data).toBe(sampleData[2])
    expect(part2.prop<FunnelPart>('part').color).toBe('#f1e15b')
    expect(part2.prop<FunnelPart>('part').x0).toBe(100)
    expect(part2.prop<FunnelPart>('part').x1).toBe(200)
    expect(part2.prop<FunnelPart>('part').width).toBe(100)
    expect(part2.prop<FunnelPart>('part').y0).toBe(400)
    expect(part2.prop<FunnelPart>('part').y1).toBe(600)
    expect(part2.prop<FunnelPart>('part').height).toBe(200)
})

describe('layout', () => {
    it('horizontal layout', () => {
        const wrapper = mount(<Funnel {...baseProps} direction="horizontal" />)

        const parts = wrapper.find('Part')

        const part0 = parts.at(0)
        expect(part0.prop<FunnelPart>('part').x0).toBe(0)
        expect(part0.prop<FunnelPart>('part').x1).toBe(100)
        expect(part0.prop<FunnelPart>('part').width).toBe(100)
        expect(part0.prop<FunnelPart>('part').y0).toBe(0)
        expect(part0.prop<FunnelPart>('part').y1).toBe(600)
        expect(part0.prop<FunnelPart>('part').height).toBe(600)

        const part1 = parts.at(1)
        expect(part1.prop<FunnelPart>('part').x0).toBe(100)
        expect(part1.prop<FunnelPart>('part').x1).toBe(200)
        expect(part1.prop<FunnelPart>('part').width).toBe(100)
        expect(part1.prop<FunnelPart>('part').y0).toBe(100)
        expect(part1.prop<FunnelPart>('part').y1).toBe(500)
        expect(part1.prop<FunnelPart>('part').height).toBe(400)

        const part2 = parts.at(2)
        expect(part2.prop<FunnelPart>('part').x0).toBe(200)
        expect(part2.prop<FunnelPart>('part').x1).toBe(300)
        expect(part2.prop<FunnelPart>('part').width).toBe(100)
        expect(part2.prop<FunnelPart>('part').y0).toBe(200)
        expect(part2.prop<FunnelPart>('part').y1).toBe(400)
        expect(part2.prop<FunnelPart>('part').height).toBe(200)
    })

    it('spacing out parts', () => {
        const wrapper = mount(<Funnel {...baseProps} spacing={3} />)

        const parts = wrapper.find('Part')

        const part0 = parts.at(0)
        expect(part0.prop<FunnelPart>('part').y0).toBe(0)
        expect(part0.prop<FunnelPart>('part').y1).toBe(198)
        expect(part0.prop<FunnelPart>('part').height).toBe(198)

        const part1 = parts.at(1)
        expect(part1.prop<FunnelPart>('part').y0).toBe(201)
        expect(part1.prop<FunnelPart>('part').y1).toBe(399)
        expect(part1.prop<FunnelPart>('part').height).toBe(198)

        const part2 = parts.at(2)
        expect(part2.prop<FunnelPart>('part').y0).toBe(402)
        expect(part2.prop<FunnelPart>('part').y1).toBe(600)
        expect(part2.prop<FunnelPart>('part').height).toBe(198)
    })
})

describe('data', () => {
    it('format value with d3 format', () => {
        const wrapper = mount(<Funnel {...baseProps} valueFormat=">-.2f" />)

        const parts = wrapper.find('Part')
        expect(parts.at(0).prop<FunnelPart>('part').formattedValue).toBe('300.00')
        expect(parts.at(1).prop<FunnelPart>('part').formattedValue).toBe('200.00')
        expect(parts.at(2).prop<FunnelPart>('part').formattedValue).toBe('100.00')
    })

    it('format value with custom function', () => {
        const wrapper = mount(<Funnel {...baseProps} valueFormat={v => `${v}%`} />)

        const parts = wrapper.find('Part')
        expect(parts.at(0).prop<FunnelPart>('part').formattedValue).toBe('300%')
        expect(parts.at(1).prop<FunnelPart>('part').formattedValue).toBe('200%')
        expect(parts.at(2).prop<FunnelPart>('part').formattedValue).toBe('100%')
    })
})

describe('style', () => {
    it('custom colors array', () => {
        const colors = ['#ff0000', '#00ff00', '#0000ff']
        const wrapper = mount(<Funnel {...baseProps} colors={colors} />)

        const parts = wrapper.find('Part')
        expect(parts.at(0).prop<FunnelPart>('part').color).toBe(colors[0])
        expect(parts.at(1).prop<FunnelPart>('part').color).toBe(colors[1])
        expect(parts.at(2).prop<FunnelPart>('part').color).toBe(colors[2])
    })

    it('custom colors function', () => {
        const colorMapping = {
            [sampleData[0].id]: '#ff0000',
            [sampleData[1].id]: '#00ff00',
            [sampleData[2].id]: '#0000ff',
        }
        const wrapper = mount(<Funnel {...baseProps} colors={d => colorMapping[d.id]} />)

        const parts = wrapper.find('Part')
        expect(parts.at(0).prop<FunnelPart>('part').color).toBe(colorMapping[sampleData[0].id])
        expect(parts.at(1).prop<FunnelPart>('part').color).toBe(colorMapping[sampleData[1].id])
        expect(parts.at(2).prop<FunnelPart>('part').color).toBe(colorMapping[sampleData[2].id])
    })

    it('colors from data', () => {
        const data = [
            {
                ...sampleData[0],
                color: '#ff0000',
            },
            {
                ...sampleData[1],
                color: '#00ff00',
            },
            {
                ...sampleData[2],
                color: '#0000ff',
            },
        ]
        const wrapper = mount(<Funnel {...baseProps} data={data} colors={{ datum: 'color' }} />)

        const parts = wrapper.find('Part')
        expect(parts.at(0).prop<FunnelPart>('part').color).toBe(data[0].color)
        expect(parts.at(1).prop<FunnelPart>('part').color).toBe(data[1].color)
        expect(parts.at(2).prop<FunnelPart>('part').color).toBe(data[2].color)
    })
})

describe('separators', () => {
    it('before and after', () => {
        const wrapper = mount(
            <Funnel
                {...baseProps}
                enableBeforeSeparators
                beforeSeparatorOffset={10}
                beforeSeparatorLength={80}
                enableAfterSeparators
                afterSeparatorOffset={10}
                afterSeparatorLength={80}
            />
        )

        const parts = wrapper.find('Part')

        const part0 = parts.at(0)
        expect(part0.prop<FunnelPart>('part').x0).toBe(90)
        expect(part0.prop<FunnelPart>('part').x1).toBe(210)
        expect(part0.prop<FunnelPart>('part').width).toBe(120)

        const part1 = parts.at(1)
        expect(part1.prop<FunnelPart>('part').x0).toBe(110)
        expect(part1.prop<FunnelPart>('part').x1).toBe(190)
        expect(part1.prop<FunnelPart>('part').width).toBe(80)

        const part2 = parts.at(2)
        expect(part2.prop<FunnelPart>('part').x0).toBe(130)
        expect(part2.prop<FunnelPart>('part').x1).toBe(170)
        expect(part2.prop<FunnelPart>('part').width).toBe(40)

        const separators = wrapper.find('Separator')
        expect(separators.length).toBe(8)

        const expectedLines = [
            // before
            { x1: 0, x2: 80, y1: 0, y2: 0 },
            { x1: 0, x2: 100, y1: 200, y2: 200 },
            { x1: 0, x2: 120, y1: 400, y2: 400 },
            { x1: 0, x2: 120, y1: 600, y2: 600 },
            // after
            { x1: 220, x2: 300, y1: 0, y2: 0 },
            { x1: 200, x2: 300, y1: 200, y2: 200 },
            { x1: 180, x2: 300, y1: 400, y2: 400 },
            { x1: 180, x2: 300, y1: 600, y2: 600 },
        ]

        expectedLines.forEach((line, index) => {
            const separatorLine = separators.at(index).find('line')

            expect(separatorLine.prop('x1')).toBe(line.x1)
            expect(separatorLine.prop('x2')).toBe(line.x2)
            expect(separatorLine.prop('y1')).toBe(line.y1)
            expect(separatorLine.prop('y2')).toBe(line.y2)
        })
    })
})

describe('accessibility', () => {
    it('forward root aria properties to the SVG element', () => {
        const wrapper = mount(
            <Funnel
                {...baseProps}
                ariaLabel="AriaLabel"
                ariaLabelledBy="AriaLabelledBy"
                ariaDescribedBy="AriaDescribedBy"
            />
        )

        const svg = wrapper.find('svg')

        expect(svg.prop('aria-label')).toBe('AriaLabel')
        expect(svg.prop('aria-labelledby')).toBe('AriaLabelledBy')
        expect(svg.prop('aria-describedby')).toBe('AriaDescribedBy')
    })
})
