import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
// @ts-ignore
import { ThemeProvider } from '@nivo/core'
import { BoxLegendSvgItem } from '../../src'
import * as shapes from '../../src/svg/symbols'

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

const LegendSvgItemWithTheme = props => (
    <ThemeProvider>
        <BoxLegendSvgItem {...props} />
    </ThemeProvider>
)

directions.forEach(direction => {
    it(`should support ${direction} direction`, () => {
        const component = renderer.create(
            <LegendSvgItemWithTheme {...commonProps} direction={direction} />
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

    it(`should support ${direction} direction justified`, () => {
        const component = renderer.create(
            <LegendSvgItemWithTheme {...commonProps} direction={direction} justify={true} />
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})

describe('symbolShape', () => {
    it('should support circle shape', () => {
        const wrapper = mount(
            <svg>
                <LegendSvgItemWithTheme {...commonProps} symbolShape="circle" />
            </svg>
        )

        expect(wrapper.find(shapes.SymbolCircleSvg)).toHaveLength(1)
    })

    it('should support diamond shape', () => {
        const wrapper = mount(
            <svg>
                <LegendSvgItemWithTheme {...commonProps} symbolShape="diamond" />
            </svg>
        )

        expect(wrapper.find(shapes.SymbolDiamondSvg)).toHaveLength(1)
    })

    it('should support square shape', () => {
        const wrapper = mount(
            <svg>
                <LegendSvgItemWithTheme {...commonProps} symbolShape="square" />
            </svg>
        )

        expect(wrapper.find(shapes.SymbolSquareSvg)).toHaveLength(1)
    })

    it('should support triangle shape', () => {
        const wrapper = mount(
            <svg>
                <LegendSvgItemWithTheme {...commonProps} symbolShape="triangle" />
            </svg>
        )

        expect(wrapper.find(shapes.SymbolTriangleSvg)).toHaveLength(1)
    })

    it('should support custom shape', () => {
        const CustomShape = () => <g />
        const wrapper = mount(
            <svg>
                <LegendSvgItemWithTheme {...commonProps} symbolShape={CustomShape} />
            </svg>
        )

        expect(wrapper.find(CustomShape)).toHaveLength(1)
    })
})
