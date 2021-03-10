import React from 'react'
import { mount } from 'enzyme'
import { Network } from '../src/index'

const nodes = [
    {
        id: '0',
        key: '0',
        radius: 12,
        depth: 0,
        color: 'rgb(244, 117, 96)',
    },
    {
        id: '1',
        key: '1',
        radius: 8,
        depth: 1,
        color: 'rgb(97, 205, 187)',
    },
]
const links = [
    {
        source: '0',
        target: '1',
    },
]

describe('Network', () => {
    describe('node', () => {
        it('should render default nodes', () => {
            const wrapper = mount(
                <Network
                    width={400}
                    height={400}
                    nodes={nodes}
                    links={links}
                    animate={false}
                    nodeColor={function (e) {
                        return e.color
                    }}
                />
            )
            const nodeElements = wrapper.find('Node')
            expect(nodeElements).toHaveLength(nodes.length)
        })

        it('should render custom nodes', () => {
            const wrapper = mount(
                <Network
                    width={400}
                    height={400}
                    nodes={nodes}
                    links={links}
                    animate={false}
                    nodeColor={function (e) {
                        return e.color
                    }}
                    nodeComponent={function (e) {
                        return <text />
                    }}
                />
            )
            const nodeElements = wrapper.find('text')
            expect(nodeElements).toHaveLength(nodes.length)
        })
    })
})
