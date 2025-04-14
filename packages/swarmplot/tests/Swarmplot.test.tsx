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

        it('should support onDoubleClick handler', () => {
            const onDoubleClick = jest.fn()
            const wrapper = mount(
                <SwarmPlot
                    width={400}
                    height={400}
                    groupBy="group"
                    groups={groups}
                    data={sampleData}
                    onDoubleClick={onDoubleClick}
                />
            )

            wrapper.find('circle').at(0).simulate('dblclick')

            expect(onDoubleClick).toHaveBeenCalledTimes(1)
            const [datum] = onDoubleClick.mock.calls[0]
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

        it('should support onMouseDown handler', () => {
            const onMouseDown = jest.fn()
            const wrapper = mount(
                <SwarmPlot
                    width={400}
                    height={400}
                    groupBy="group"
                    groups={groups}
                    data={sampleData}
                    onMouseDown={onMouseDown}
                />
            )

            wrapper.find('circle').at(0).simulate('mousedown')

            expect(onMouseDown).toHaveBeenCalledTimes(1)
            const [datum] = onMouseDown.mock.calls[0]
            expect(datum.id).toEqual('A')
        })

        it('should support onMouseUp handler', () => {
            const onMouseUp = jest.fn()
            const wrapper = mount(
                <SwarmPlot
                    width={400}
                    height={400}
                    groupBy="group"
                    groups={groups}
                    data={sampleData}
                    onMouseUp={onMouseUp}
                />
            )

            wrapper.find('circle').at(0).simulate('mouseup')

            expect(onMouseUp).toHaveBeenCalledTimes(1)
            const [datum] = onMouseUp.mock.calls[0]
            expect(datum.id).toEqual('A')
        })

        it('should allow to completely disable interactivity', () => {
            const onClick = jest.fn()
            const onDoubleClick = jest.fn()
            const onMouseEnter = jest.fn()
            const onMouseMove = jest.fn()
            const onMouseLeave = jest.fn()
            const onMouseDown = jest.fn()
            const onMouseUp = jest.fn()

            const wrapper = mount(
                <SwarmPlot
                    width={400}
                    height={400}
                    groupBy="group"
                    groups={groups}
                    data={sampleData}
                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    isInteractive={false}
                />
            )

            wrapper.find('circle').at(0).simulate('click')
            wrapper.find('circle').at(0).simulate('dblclick')
            wrapper.find('circle').at(0).simulate('mouseenter')
            wrapper.find('circle').at(0).simulate('mousemove')
            wrapper.find('circle').at(0).simulate('mouseleave')
            wrapper.find('circle').at(0).simulate('mousedown')
            wrapper.find('circle').at(0).simulate('mouseup')

            expect(onClick).not.toHaveBeenCalled()
            expect(onDoubleClick).not.toHaveBeenCalled()
            expect(onMouseEnter).not.toHaveBeenCalled()
            expect(onMouseMove).not.toHaveBeenCalled()
            expect(onMouseLeave).not.toHaveBeenCalled()
            expect(onMouseDown).not.toHaveBeenCalled()
            expect(onMouseUp).not.toHaveBeenCalled()
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
