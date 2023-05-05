import { create } from 'react-test-renderer'
import { LegendSvg, LegendSvgItem, LegendProps } from '@nivo/legends'
// @ts-ignore
import { Waffle, FillDirection } from '../src'
import { WaffleCell } from '../src/WaffleCell'
import { WaffleArea } from '../src/WaffleArea'

describe('<Waffle />', () => {
    it('should render a basic waffle chart in SVG', () => {
        const component = create(
            <Waffle
                width={400}
                height={400}
                rows={10}
                columns={10}
                total={100}
                data={[{ id: 'one', label: 'one', value: 10 }]}
            />
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

    const fillModes: FillDirection[] = ['top', 'right', 'bottom', 'left']
    for (const fillMode of fillModes) {
        it(`should support ${fillMode} fill mode`, () => {
            const component = create(
                <Waffle
                    width={400}
                    height={400}
                    rows={10}
                    columns={10}
                    total={100}
                    data={[{ id: 'one', label: 'one', value: 10 }]}
                    fillDirection={fillMode}
                />
            )

            const tree = component.toJSON()
            expect(tree).toMatchSnapshot()
        })
    }

    describe('legends', () => {
        it('should support legends', () => {
            const data = [
                { id: 'one', label: 'one', value: 10 },
                { id: 'two', label: 'two', value: 20 },
                { id: 'three', label: 'three', value: 30 },
            ]
            const legends: LegendProps[] = [
                {
                    anchor: 'top-left',
                    direction: 'column',
                    itemWidth: 100,
                    itemHeight: 20,
                },
            ]
            const component = create(
                <Waffle
                    width={400}
                    height={400}
                    rows={10}
                    columns={10}
                    total={100}
                    data={data}
                    legends={legends}
                    fillDirection="top"
                />
            ).root

            const legend = component.findByType(LegendSvg)

            const legendItems = legend.findAllByType(LegendSvgItem)
            expect(legendItems).toHaveLength(3)

            expect(legendItems[0].props.data.id).toEqual('three')
            expect(legendItems[1].props.data.id).toEqual('two')
            expect(legendItems[2].props.data.id).toEqual('one')
        })

        it('should adjust the legends order according to fillDirection', () => {
            const data = [
                { id: 'one', label: 'one', value: 10 },
                { id: 'two', label: 'two', value: 20 },
                { id: 'three', label: 'three', value: 30 },
            ]
            const legends: LegendProps[] = [
                {
                    anchor: 'top-left',
                    direction: 'column',
                    itemWidth: 100,
                    itemHeight: 20,
                },
            ]
            const component = create(
                <Waffle
                    width={400}
                    height={400}
                    rows={10}
                    columns={10}
                    total={100}
                    data={data}
                    legends={legends}
                    fillDirection="bottom"
                />
            ).root

            const legend = component.findByType(LegendSvg)

            const legendItems = legend.findAllByType(LegendSvgItem)
            expect(legendItems).toHaveLength(3)

            expect(legendItems[0].props.data.id).toEqual('one')
            expect(legendItems[1].props.data.id).toEqual('two')
            expect(legendItems[2].props.data.id).toEqual('three')
        })
    })

    it('should allow to hide specific ids', () => {
        const data = [
            { id: 'one', label: 'one', value: 10 },
            { id: 'two', label: 'two', value: 20 },
        ]
        const component = create(
            <Waffle
                width={400}
                height={400}
                rows={10}
                columns={10}
                total={100}
                colors={['red', 'green']}
                data={data}
                hiddenIds={['one']}
            />
        ).root

        const oneCells = component.findAll(node => {
            return (
                node.type === WaffleCell &&
                node.props.cell.data &&
                node.props.cell.data.id === 'one'
            )
        })
        expect(oneCells).toHaveLength(0)

        const twoCells = component.findAll(node => {
            return (
                node.type === WaffleCell &&
                node.props.cell.data &&
                node.props.cell.data.id === 'two'
            )
        })
        expect(twoCells.length).toBeGreaterThan(0)

        const areas = component.findAllByType(WaffleArea)
        expect(areas).toHaveLength(1)
    })
})
