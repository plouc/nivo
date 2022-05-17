import { mount, ReactWrapper } from 'enzyme'
// @ts-ignore
import { Marimekko } from '../src/Marimekko'

const commonProps = {
    width: 500,
    height: 300,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: [
        {
            statement: 'A',
            participation: 20,
            agree: 70,
            disagree: 30,
        },
        {
            statement: 'B',
            participation: 80,
            agree: 10,
            disagree: 90,
        },
    ],
    id: 'statement',
    value: 'participation',
    dimensions: [
        {
            id: 'disagree',
            value: 'disagree',
        },
        {
            id: 'agree',
            value: 'agree',
        },
    ],
    animate: false,
}

it('should render a basic chart', () => {
    const wrapper = mount(<Marimekko {...commonProps} />)
    // the basic chart has two categories and two values each -> 4 bars
    const bars = wrapper.find('Bar')
    expect(bars).toHaveLength(4)
})

describe('layout', () => {
    const getSizes = (bars: ReactWrapper) => {
        return [0, 1, 2, 3].map(i => {
            const props = bars.at(i).find('rect').props()
            const width = Number(props.width)
            const height = Number(props.height)
            return { width, height, area: width * height }
        })
    }

    it('vertical layout', () => {
        const wrapper = mount(<Marimekko {...commonProps} />)
        // in vertical layout, first two rectangles should be in a column, i.e. equal width
        const sizes = getSizes(wrapper.find('Bar'))
        expect(sizes[0].width).toBe(sizes[1].width)
        expect(sizes[2].width).toBe(sizes[3].width) // width of next two rectangles
        expect(sizes[2].width).toBeGreaterThan(sizes[0].width)
        // the first two bars should have the same width, also the next two bars
        // the areas of the bars should be proportional to:
        // (A*disagree)=(20*30)=600,  (A*agree)=(20*70)=1400,
        // (B*disagree)=(80*90)=7200, (B*agree)=(80*10)=800
        expect(sizes[0].area).toBeLessThan(sizes[1].area)
        expect(sizes[0].area).toBeLessThan(sizes[2].area)
        expect(sizes[0].area).toBeLessThan(sizes[3].area)
        expect(sizes[1].area).toBeLessThan(sizes[2].area)
        expect(sizes[1].area).toBeGreaterThan(sizes[3].area)
        expect(sizes[2].area).toBeGreaterThan(sizes[3].area)
    })

    it('horizontal layout', () => {
        const wrapper = mount(<Marimekko {...commonProps} layout={'horizontal'} />)
        // in horizontal layout, first two rectangles should be in a row, i.e. equal height
        const sizes = getSizes(wrapper.find('Bar'))
        expect(sizes[0].height).toBe(sizes[1].height)
        expect(sizes[2].height).toBe(sizes[3].height)
        expect(sizes[2].height).toBeGreaterThan(sizes[0].height)
    })
})
