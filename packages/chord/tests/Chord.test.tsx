import { mount } from 'enzyme'
import { Globals } from '@react-spring/web'
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

beforeAll(() => {
    Globals.assign({ skipAnimation: true })
})

afterAll(() => {
    Globals.assign({ skipAnimation: false })
})

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

describe('active/inactive', () => {
    it('arcs', () => {
        const wrapper = mount(
            <Chord
                {...baseProps}
                arcOpacity={0.5}
                ribbonOpacity={0.5}
                activeArcOpacity={1}
                activeRibbonOpacity={1}
                inactiveArcOpacity={0}
                inactiveRibbonOpacity={0}
            />
        )

        sampleData.keys.forEach(activeKey => {
            const activeArc = wrapper.find(`[data-testid='arc.${activeKey}']`).first()
            expect(activeArc.prop('opacity').get()).toEqual(0.5)

            activeArc.children().first().simulate('mouseenter')
            expect(activeArc.prop('opacity').get()).toEqual(1)

            // all other arcs should be inactive
            sampleData.keys
                .filter(key => key !== activeKey)
                .forEach(inactiveKey => {
                    const inactiveArc = wrapper.find(`[data-testid='arc.${inactiveKey}']`).first()

                    expect(inactiveArc.prop('opacity').get()).toEqual(0)
                })

            // all ribbons having the current arc as a source or target should be active
            wrapper
                .find(`[data-testid^='ribbon.']`)
                .filterWhere(ribbon => !ribbon.is('path'))
                .forEach(ribbon => {
                    const ribbonId = ribbon.prop('data-testid').slice(7)
                    if (ribbonId.includes(activeKey)) {
                        expect(ribbon.prop('opacity').get()).toEqual(1)
                    } else {
                        expect(ribbon.prop('opacity').get()).toEqual(0)
                    }
                })

            activeArc.children().first().simulate('mouseleave')
        })
    })

    it('ribbons', () => {
        const wrapper = mount(
            <Chord
                {...baseProps}
                arcOpacity={0.5}
                ribbonOpacity={0.5}
                activeArcOpacity={1}
                activeRibbonOpacity={1}
                inactiveArcOpacity={0}
                inactiveRibbonOpacity={0}
            />
        )

        wrapper
            .find(`[data-testid^='ribbon.']`)
            .filterWhere(ribbon => !ribbon.is('path'))
            .forEach(ribbon => {
                const ribbonId = ribbon.prop('data-testid').slice(7)
                expect(ribbon.prop('opacity').get()).toEqual(0.5)

                ribbon.children().first().simulate('mouseenter')
                expect(ribbon.prop('opacity').get()).toEqual(1)

                // other ribbons should be inactive
                wrapper
                    .find(`[data-testid^='ribbon.']`)
                    .filterWhere(ribbon => !ribbon.is('path'))
                    .filterWhere(ribbon => !ribbon.is(`[data-testid^='ribbon.${ribbonId}']`))
                    .forEach(inactiveRibbon => {
                        expect(inactiveRibbon.prop('opacity').get()).toEqual(0)
                    })

                const relatedArcIds = ribbonId.split('.')
                sampleData.keys.forEach(key => {
                    const arc = wrapper.find(`[data-testid='arc.${key}']`).first()
                    if (relatedArcIds.includes(key)) {
                        expect(arc.prop('opacity').get()).toEqual(1)
                    } else {
                        expect(arc.prop('opacity').get()).toEqual(0)
                    }
                })

                ribbon.children().first().simulate('mouseleave')
            })
    })
})
