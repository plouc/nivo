import { mount } from 'enzyme'
import { SwarmPlot } from '../src'

const sampleData = [
    {
        id: 'A',
        group: 'group A',
        price: 293,
        volume: 5,
    },
    {
        id: 'B',
        group: 'group B',
        price: 300,
        volume: 6,
    },
    {
        id: 'C',
        group: 'group C',
        price: 500,
        volume: 6,
    },
]

const groups = ['group A', 'group B', 'group C']

describe('SwarmPlot', () => {
    describe('interactivity', () => {
        it('should support onClick handler', () => {
            const onClick = jest.fn()
            const wrapper = mount(
                <SwarmPlot
                    width={400}
                    height={400}
                    groupBy="group"
                    groups={groups}
                    data={sampleData}
                    onClick={onClick}
                />
            )

            wrapper.find('circle').at(0).simulate('click')

            expect(onClick).toHaveBeenCalledTimes(1)
            const [datum] = onClick.mock.calls[0]
            expect(datum.id).toEqual('A')
        })

        it('should support onMouseEnter handler', () => {
            const onMouseEnter = jest.fn()
            const wrapper = mount(
                <SwarmPlot
                    width={400}
                    height={400}
                    groupBy="group"
                    groups={groups}
                    data={sampleData}
                    onMouseEnter={onMouseEnter}
                />
            )

            wrapper.find('circle').at(1).simulate('mouseenter')

            expect(onMouseEnter).toHaveBeenCalledTimes(1)
            const [datum] = onMouseEnter.mock.calls[0]
            expect(datum.id).toEqual('B')
        })

        it('should support onMouseMove handler', () => {
            const onMouseMove = jest.fn()
            const wrapper = mount(
                <SwarmPlot
                    width={400}
                    height={400}
                    groupBy="group"
                    groups={groups}
                    data={sampleData}
                    onMouseMove={onMouseMove}
                />
            )

            wrapper.find('circle').at(2).simulate('mousemove')

            expect(onMouseMove).toHaveBeenCalledTimes(1)
            const [datum] = onMouseMove.mock.calls[0]
            expect(datum.id).toEqual('C')
        })

        it('should support onMouseLeave handler', () => {
            const onMouseLeave = jest.fn()
            const wrapper = mount(
                <SwarmPlot
                    width={400}
                    height={400}
                    groupBy="group"
                    groups={groups}
                    data={sampleData}
                    onMouseLeave={onMouseLeave}
                />
            )

            wrapper.find('circle').at(0).simulate('mouseleave')

            expect(onMouseLeave).toHaveBeenCalledTimes(1)
            const [datum] = onMouseLeave.mock.calls[0]
            expect(datum.id).toEqual('A')
        })

        it('should allow to completely disable interactivity', () => {
            const onClick = jest.fn()
            const onMouseEnter = jest.fn()
            const onMouseMove = jest.fn()
            const onMouseLeave = jest.fn()

            const wrapper = mount(
                <SwarmPlot
                    width={400}
                    height={400}
                    groupBy="group"
                    groups={groups}
                    data={sampleData}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    isInteractive={false}
                />
            )

            wrapper.find('circle').at(0).simulate('click')
            wrapper.find('circle').at(0).simulate('mouseenter')
            wrapper.find('circle').at(0).simulate('mousemove')
            wrapper.find('circle').at(0).simulate('mouseleave')

            expect(onClick).not.toHaveBeenCalled()
            expect(onMouseEnter).not.toHaveBeenCalled()
            expect(onMouseMove).not.toHaveBeenCalled()
            expect(onMouseLeave).not.toHaveBeenCalled()
        })

        it('should support the borderWidth property', () => {
            const wrapper = mount(
                <SwarmPlot
                    width={400}
                    height={400}
                    groupBy="group"
                    groups={groups}
                    data={sampleData}
                    borderWidth={4}
                />
            )

            expect(wrapper.find('circle').at(0).getDOMNode().getAttribute('stroke-width')).toEqual(
                '4'
            )
        })
    })
})
