/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { defaultTheme, ThemeContext } from '@nivo/core'
import {
    LegendSvgItem as BaseLegendSvgItem,
    SymbolCircle,
    SymbolDiamond,
    SymbolSquare,
    SymbolTriangle,
} from '../../src'

const commonProps = {
    x: 0,
    y: 0,
    width: 200,
    height: 36,
    data: {
        id: 'testing',
        label: 'testing',
        color: 'red',
    },
}

const directions = ['left-to-right', 'right-to-left', 'top-to-bottom', 'bottom-to-top']

const withTheme = WrappedComponent => {
    return class ThemedLegendSvgItem extends Component {
        render() {
            return (
                <ThemeContext.Provider value={defaultTheme}>
                    <WrappedComponent {...this.props} />
                </ThemeContext.Provider>
            )
        }
    }
}

const LegendSvgItem = withTheme(BaseLegendSvgItem)

directions.forEach(direction => {
    it(`should support ${direction} direction`, () => {
        const component = renderer.create(<LegendSvgItem {...commonProps} direction={direction} />)

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

    it(`should support ${direction} direction justified`, () => {
        const component = renderer.create(
            <LegendSvgItem {...commonProps} direction={direction} justify={true} />
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})

describe('symbolShape', () => {
    it('should support circle shape', () => {
        const wrapper = mount(
            <svg>
                <LegendSvgItem {...commonProps} symbolShape="circle" />
            </svg>
        )

        expect(wrapper.find(SymbolCircle)).toHaveLength(1)
    })

    it('should support diamond shape', () => {
        const wrapper = mount(
            <svg>
                <LegendSvgItem {...commonProps} symbolShape="diamond" />
            </svg>
        )

        expect(wrapper.find(SymbolDiamond)).toHaveLength(1)
    })

    it('should support square shape', () => {
        const wrapper = mount(
            <svg>
                <LegendSvgItem {...commonProps} symbolShape="square" />
            </svg>
        )

        expect(wrapper.find(SymbolSquare)).toHaveLength(1)
    })

    it('should support triangle shape', () => {
        const wrapper = mount(
            <svg>
                <LegendSvgItem {...commonProps} symbolShape="triangle" />
            </svg>
        )

        expect(wrapper.find(SymbolTriangle)).toHaveLength(1)
    })

    it('should support custom shape', () => {
        const CustomShape = () => <g />
        const wrapper = mount(
            <svg>
                <LegendSvgItem {...commonProps} symbolShape={CustomShape} />
            </svg>
        )

        expect(wrapper.find(CustomShape)).toHaveLength(1)
    })
})
