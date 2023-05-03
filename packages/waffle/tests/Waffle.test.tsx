import { create } from 'react-test-renderer'
import { mount } from 'enzyme'
import { LegendSvg, LegendSvgItem } from '@nivo/legends'
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

    xit('should support legends', () => {
        const data = [
            { id: 'one', label: 'one', value: 10 },
            { id: 'two', label: 'two', value: 20 },
            { id: 'tree', label: 'tree', value: 30 },
        ]
        const legends = [
            {
                anchor: 'top-left',
                direction: 'column',
                itemWidth: 100,
                itemHeight: 20,
            },
        ]
        const wrapper = mount(
            <Waffle
                width={400}
                height={400}
                rows={10}
                columns={10}
                total={100}
                colors={['red', 'green', 'blue']}
                data={data}
                legends={legends}
            />
        )

        expect(wrapper.find(LegendSvg)).toHaveLength(1)

        const legendItems = wrapper.find(LegendSvgItem)
        expect(legendItems).toHaveLength(3)
        expect(legendItems.at(0).prop('data')).toEqual({
            id: 'one',
            label: 'one',
            color: 'red',
        })
        expect(legendItems.at(1).prop('data')).toEqual({
            id: 'two',
            label: 'two',
            color: 'green',
        })
        expect(legendItems.at(2).prop('data')).toEqual({
            id: 'tree',
            label: 'tree',
            color: 'blue',
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
