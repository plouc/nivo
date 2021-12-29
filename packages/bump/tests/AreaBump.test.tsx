import { mount } from 'enzyme'
// @ts-ignore
import { AreaBump, AreaBumpSvgProps } from '../src'

interface Datum {
    x: number
    y: number
}

const sampleData: AreaBumpSvgProps<Datum, Record<string, unknown>>['data'] = [
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

const baseProps: AreaBumpSvgProps<Datum, Record<string, unknown>> = {
    width: 800,
    height: 600,
    data: sampleData,
    animate: false,
}

it('should render a basic area bump chart', () => {
    const wrapper = mount(<AreaBump<Datum> {...baseProps} />)

    const areaA = wrapper.find(`path[data-testid='area.A']`)
    expect(areaA.exists()).toBeTruthy()

    const areaB = wrapper.find(`path[data-testid='area.B']`)
    expect(areaB.exists()).toBeTruthy()

    const areaC = wrapper.find(`path[data-testid='area.C']`)
    expect(areaC.exists()).toBeTruthy()
})

describe('style', () => {
    it('custom colors array', () => {
        const colors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)']
        const wrapper = mount(<AreaBump<Datum> {...baseProps} colors={colors} />)

        expect(wrapper.find(`path[data-testid='area.A']`).prop('fill')).toEqual(colors[0])
        expect(wrapper.find(`path[data-testid='area.B']`).prop('fill')).toEqual(colors[1])
        expect(wrapper.find(`path[data-testid='area.C']`).prop('fill')).toEqual(colors[2])
    })

    it('colors from data', () => {
        const colors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)']
        const wrapper = mount(
            <AreaBump<Datum, { color: string }>
                {...baseProps}
                data={sampleData.map((serie, i) => ({
                    ...serie,
                    color: colors[i],
                }))}
                colors={serie => serie.color}
            />
        )

        expect(wrapper.find(`path[data-testid='area.A']`).prop('fill')).toEqual(colors[0])
        expect(wrapper.find(`path[data-testid='area.B']`).prop('fill')).toEqual(colors[1])
        expect(wrapper.find(`path[data-testid='area.C']`).prop('fill')).toEqual(colors[2])
    })
})

describe('labels', () => {
    it('default end labels', () => {
        const wrapper = mount(<AreaBump<Datum> {...baseProps} />)

        const endLabelA = wrapper.find(`text[data-testid='label.end.A']`)
        expect(endLabelA.exists()).toBeTruthy()
        expect(endLabelA.text()).toEqual('A')
        expect(endLabelA.prop('textAnchor')).toEqual('start')

        const endLabelB = wrapper.find(`text[data-testid='label.end.B']`)
        expect(endLabelB.exists()).toBeTruthy()
        expect(endLabelB.text()).toEqual('B')
        expect(endLabelB.prop('textAnchor')).toEqual('start')

        const endLabelC = wrapper.find(`text[data-testid='label.end.C']`)
        expect(endLabelC.exists()).toBeTruthy()
        expect(endLabelC.text()).toEqual('C')
        expect(endLabelC.prop('textAnchor')).toEqual('start')
    })

    it('customize end labels', () => {
        const wrapper = mount(
            <AreaBump<Datum> {...baseProps} endLabel={serie => `Serie ${serie.id}`} />
        )

        expect(wrapper.find(`text[data-testid='label.end.A']`).text()).toEqual('Serie A')
        expect(wrapper.find(`text[data-testid='label.end.B']`).text()).toEqual('Serie B')
        expect(wrapper.find(`text[data-testid='label.end.C']`).text()).toEqual('Serie C')
    })

    it('label from data', () => {
        const wrapper = mount(
            <AreaBump<Datum, { label: string }>
                {...baseProps}
                data={sampleData.map(serie => ({
                    ...serie,
                    label: `Serie ${serie.id} label`,
                }))}
                endLabel={serie => serie.label}
            />
        )

        expect(wrapper.find(`text[data-testid='label.end.A']`).text()).toEqual('Serie A label')
        expect(wrapper.find(`text[data-testid='label.end.B']`).text()).toEqual('Serie B label')
        expect(wrapper.find(`text[data-testid='label.end.C']`).text()).toEqual('Serie C label')
    })

    it('start labels', () => {
        const wrapper = mount(<AreaBump<Datum> {...baseProps} startLabel />)

        const startLabelA = wrapper.find(`text[data-testid='label.start.A']`)
        expect(startLabelA.exists()).toBeTruthy()
        expect(startLabelA.text()).toEqual('A')
        expect(startLabelA.prop('textAnchor')).toEqual('end')

        const startLabelB = wrapper.find(`text[data-testid='label.start.B']`)
        expect(startLabelB.exists()).toBeTruthy()
        expect(startLabelB.text()).toEqual('B')
        expect(startLabelB.prop('textAnchor')).toEqual('end')

        const startLabelC = wrapper.find(`text[data-testid='label.start.C']`)
        expect(startLabelC.exists()).toBeTruthy()
        expect(startLabelC.text()).toEqual('C')
        expect(startLabelC.prop('textAnchor')).toEqual('end')
    })
})
