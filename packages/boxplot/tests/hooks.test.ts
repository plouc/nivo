import { getBoxPlotItemTransform } from '../src/hooks'
import { ComputedBoxPlotSummary } from '../src/types'

// Minimal computed summary exposing only the fields the transform depends on.
const makeBox = (layout: 'vertical' | 'horizontal'): ComputedBoxPlotSummary =>
    ({
        layout,
        x: 100,
        y: 40,
        width: 30,
        height: 20,
        coordinates: { index: 100, values: [0, 25, 50, 75, 100] },
    }) as unknown as ComputedBoxPlotSummary

describe('getBoxPlotItemTransform', () => {
    // Regression test for #2561: switching layout left boxes stuck in their
    // previous orientation. The animated `transform` must have a consistent
    // structure across layouts, otherwise react-spring cannot interpolate
    // between `translate(...)` and `translate(...) rotate(...)` on a layout
    // change and the box keeps its stale transform.
    it('emits a translate + rotate transform for both layouts so the spring can interpolate (#2561)', () => {
        const vertical = getBoxPlotItemTransform(makeBox('vertical'))
        const horizontal = getBoxPlotItemTransform(makeBox('horizontal'))

        expect(vertical).toMatch(/^translate\([^)]*\) rotate\(0\)$/)
        expect(horizontal).toMatch(/^translate\([^)]*\) rotate\(-90\)$/)
    })
})
