import { mount } from 'enzyme'
// @ts-ignore
import { Chord } from '../src'

const sampleData = {
    data: [
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0],
    ],
    keys: ['A', 'B', 'C', 'D'],
}

const baseProps = {
    ...sampleData,
    width: 600,
    height: 600,
    animate: false,
}

it('basic chord diagram', () => {
    const wrapper = mount(<Chord {...baseProps} />)

    sampleData.keys.forEach(key => {
        const arc = wrapper.find(`path[data-testid='arc.${key}']`)
        expect(arc.exists()).toBeTruthy()
    })

    expect(wrapper.find(`path[data-testid^='ribbon.']`)).toHaveLength(4)
})

describe('labels', () => {
    it('enabled by default', () => {
        const wrapper = mount(<Chord {...baseProps} />)

        sampleData.keys.forEach(key => {
            const label = wrapper.find(`text[data-testid='label.${key}']`)
            expect(label.exists()).toBeTruthy()
            expect(label.text()).toEqual(key)
        })
    })

    it('disabled', () => {
        const wrapper = mount(<Chord {...baseProps} enableLabel={false} />)

        sampleData.keys.forEach(key => {
            const label = wrapper.find(`text[data-testid='label.${key}']`)
            expect(label.exists()).toBeFalsy()
        })
    })

    it('customize label', () => {
        const wrapper = mount(<Chord {...baseProps} label={arc => `custom: ${arc.id}`} />)

        sampleData.keys.forEach(key => {
            const label = wrapper.find(`text[data-testid='label.${key}']`)
            expect(label.exists()).toBeTruthy()
            expect(label.text()).toEqual(`custom: ${key}`)
        })
    })

    it('static text color', () => {
        const color = 'rgba(255, 0, 0, 1)'
        const wrapper = mount(<Chord {...baseProps} labelTextColor={color} />)

        sampleData.keys.forEach(key => {
            const label = wrapper.find(`text[data-testid='label.${key}']`)
            expect(label.exists()).toBeTruthy()
            expect(label.prop('style').fill).toEqual(color)
        })
    })

    it('text color from arcs', () => {
        const colors = [
            'rgba(255, 0, 0, 1)',
            'rgba(0, 255, 0, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(255, 0, 255, 1)',
        ]
        const wrapper = mount(
            <Chord
                {...baseProps}
                colors={colors}
                labelTextColor={{
                    from: 'color',
                }}
            />
        )

        sampleData.keys.forEach((key, index) => {
            const label = wrapper.find(`text[data-testid='label.${key}']`)
            expect(label.exists()).toBeTruthy()
            expect(label.prop('style').fill).toEqual(colors[index])
        })
    })
})

describe('interactivity', () => {
    describe('arcs', () => {
        it('onMouseEnter', () => {
            const onMouseEnter = jest.fn()
            const wrapper = mount(<Chord {...baseProps} onArcMouseEnter={onMouseEnter} />)

            sampleData.keys.forEach(key => {
                wrapper.find(`path[data-testid='arc.${key}']`).simulate('mouseenter')

                expect(onMouseEnter).toHaveBeenCalledTimes(1)
                const [datum] = onMouseEnter.mock.calls[0]
                expect(datum.id).toEqual(key)

                onMouseEnter.mockClear()
            })
        })

        it('onMouseMove', () => {
            const onMouseMove = jest.fn()
            const wrapper = mount(<Chord {...baseProps} onArcMouseMove={onMouseMove} />)

            sampleData.keys.forEach(key => {
                wrapper.find(`path[data-testid='arc.${key}']`).simulate('mousemove')

                expect(onMouseMove).toHaveBeenCalledTimes(1)
                const [datum] = onMouseMove.mock.calls[0]
                expect(datum.id).toEqual(key)

                onMouseMove.mockClear()
            })
        })

        it('onMouseLeave', () => {
            const onMouseLeave = jest.fn()
            const wrapper = mount(<Chord {...baseProps} onArcMouseLeave={onMouseLeave} />)

            sampleData.keys.forEach(key => {
                wrapper.find(`path[data-testid='arc.${key}']`).simulate('mouseleave')

                expect(onMouseLeave).toHaveBeenCalledTimes(1)
                const [datum] = onMouseLeave.mock.calls[0]
                expect(datum.id).toEqual(key)

                onMouseLeave.mockClear()
            })
        })

        it('onClick', () => {
            const onClick = jest.fn()
            const wrapper = mount(<Chord {...baseProps} onArcClick={onClick} />)

            sampleData.keys.forEach(key => {
                wrapper.find(`path[data-testid='arc.${key}']`).simulate('click')

                expect(onClick).toHaveBeenCalledTimes(1)
                const [datum] = onClick.mock.calls[0]
                expect(datum.id).toEqual(key)

                onClick.mockClear()
            })
        })
    })

    describe('ribbons', () => {
        it('onMouseEnter', () => {
            const onMouseEnter = jest.fn()
            const wrapper = mount(<Chord {...baseProps} onRibbonMouseEnter={onMouseEnter} />)

            wrapper.find(`path[data-testid^='ribbon.']`).forEach(ribbon => {
                ribbon.simulate('mouseenter')

                expect(onMouseEnter).toHaveBeenCalledTimes(1)
                const [datum] = onMouseEnter.mock.calls[0]
                expect(datum.id).toEqual(ribbon.prop('data-testid').slice(7))

                onMouseEnter.mockClear()
            })
        })

        it('onMouseMove', () => {
            const onMouseMove = jest.fn()
            const wrapper = mount(<Chord {...baseProps} onRibbonMouseMove={onMouseMove} />)

            wrapper.find(`path[data-testid^='ribbon.']`).forEach(ribbon => {
                ribbon.simulate('mousemove')

                expect(onMouseMove).toHaveBeenCalledTimes(1)
                const [datum] = onMouseMove.mock.calls[0]
                expect(datum.id).toEqual(ribbon.prop('data-testid').slice(7))

                onMouseMove.mockClear()
            })
        })

        it('onMouseLeave', () => {
            const onMouseLeave = jest.fn()
            const wrapper = mount(<Chord {...baseProps} onRibbonMouseLeave={onMouseLeave} />)

            wrapper.find(`path[data-testid^='ribbon.']`).forEach(ribbon => {
                ribbon.simulate('mouseleave')

                expect(onMouseLeave).toHaveBeenCalledTimes(1)
                const [datum] = onMouseLeave.mock.calls[0]
                expect(datum.id).toEqual(ribbon.prop('data-testid').slice(7))

                onMouseLeave.mockClear()
            })
        })

        it('onClick', () => {
            const onClick = jest.fn()
            const wrapper = mount(<Chord {...baseProps} onRibbonClick={onClick} />)

            wrapper.find(`path[data-testid^='ribbon.']`).forEach(ribbon => {
                ribbon.simulate('click')

                expect(onClick).toHaveBeenCalledTimes(1)
                const [datum] = onClick.mock.calls[0]
                expect(datum.id).toEqual(ribbon.prop('data-testid').slice(7))

                onClick.mockClear()
            })
        })
    })
})
