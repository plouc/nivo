import { create } from 'react-test-renderer'
import { ThemeProvider } from '@nivo/theming'
import { LegendSvgItem } from '../../src'
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
    <ThemeProvider theme={{}}>
        <LegendSvgItem {...props} />
    </ThemeProvider>
)

directions.forEach(direction => {
    it(`should support ${direction} direction`, () => {
        const component = create(<LegendSvgItemWithTheme {...commonProps} direction={direction} />)

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

    it(`should support ${direction} direction justified`, () => {
        const component = create(
            <LegendSvgItemWithTheme {...commonProps} direction={direction} justify={true} />
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})

describe('symbolShape', () => {
    it('should support circle shape', () => {
        const wrapper = create(
            <svg>
                <LegendSvgItemWithTheme {...commonProps} symbolShape="circle" />
            </svg>
        ).root

        expect(wrapper.findAllByType(shapes.SymbolCircle)).toHaveLength(1)
    })

    it('should support diamond shape', () => {
        const wrapper = create(
            <svg>
                <LegendSvgItemWithTheme {...commonProps} symbolShape="diamond" />
            </svg>
        ).root

        expect(wrapper.findAllByType(shapes.SymbolDiamond)).toHaveLength(1)
    })

    it('should support square shape', () => {
        const wrapper = create(
            <svg>
                <LegendSvgItemWithTheme {...commonProps} symbolShape="square" />
            </svg>
        ).root

        expect(wrapper.findAllByType(shapes.SymbolSquare)).toHaveLength(1)
    })

    it('should support triangle shape', () => {
        const wrapper = create(
            <svg>
                <LegendSvgItemWithTheme {...commonProps} symbolShape="triangle" />
            </svg>
        ).root

        expect(wrapper.findAllByType(shapes.SymbolTriangle)).toHaveLength(1)
    })

    it('should support custom shape', () => {
        const CustomShape = () => <g />
        const wrapper = create(
            <svg>
                <LegendSvgItemWithTheme {...commonProps} symbolShape={CustomShape} />
            </svg>
        ).root

        expect(wrapper.findAllByType(CustomShape)).toHaveLength(1)
    })
})
