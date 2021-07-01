import React from 'react'
import { mount } from 'enzyme'
import { sampleData, SampleDatum } from './fixtures'
import { CirclePacking, CirclePackingHtml } from '../src'

const testCases = [
    {
        Chart: CirclePacking,
        circle: 'CircleSvg',
        label: 'LabelSvg',
    },
    {
        Chart: CirclePackingHtml,
        circle: 'CircleHtml',
        label: 'LabelHtml',
    },
]

testCases.forEach(testCase => {
    describe(testCase.Chart, () => {
        describe('circles', () => {
            it('should render as much circles as items', () => {
                const wrapper = mount(
                    <testCase.Chart<SampleDatum> width={600} height={600} data={sampleData} />
                )

                expect(wrapper.find(testCase.circle).length).toBe(11)
            })

            it(`should only render leaf nodes if 'leavesOnly' is 'true'`, () => {
                const wrapper = mount(
                    <testCase.Chart<SampleDatum>
                        width={600}
                        height={600}
                        data={sampleData}
                        leavesOnly={true}
                    />
                )

                expect(wrapper.find(testCase.circle).length).toBe(7)
            })

            it('should support a custom circle component', () => {
                const CustomCircle = () => <span />
                const wrapper = mount(
                    <testCase.Chart<SampleDatum>
                        width={600}
                        height={600}
                        data={sampleData}
                        circleComponent={CustomCircle}
                    />
                )

                expect(wrapper.find(CustomCircle).length).toBe(11)
            })
        })

        describe('labels', () => {
            it(`should render as much labels as nodes if 'enableLabels' is 'true'`, () => {
                const wrapper = mount(
                    <testCase.Chart<SampleDatum>
                        width={600}
                        height={600}
                        data={sampleData}
                        enableLabels={true}
                    />
                )

                expect(wrapper.find(testCase.label).length).toBe(11)
            })

            it(`should render no label if 'enableLabels' is 'false'`, () => {
                const wrapper = mount(
                    <testCase.Chart<SampleDatum>
                        width={600}
                        height={600}
                        data={sampleData}
                        enableLabels={false}
                    />
                )

                expect(wrapper.find(testCase.label).length).toBe(0)
            })

            it(`should allow to skip labels using 'labelsSkipRadius' if radius is lower than given value`, () => {
                const wrapper = mount(
                    <testCase.Chart<SampleDatum>
                        width={600}
                        height={600}
                        data={sampleData}
                        enableLabels={true}
                        labelsSkipRadius={24}
                    />
                )

                expect(wrapper.find(testCase.label).length).toBe(10)
            })

            it(`should allow to filter labels using a custom filter function`, () => {
                const wrapper = mount(
                    <testCase.Chart<SampleDatum>
                        width={600}
                        height={600}
                        data={sampleData}
                        enableLabels={true}
                        labelsFilter={label => label.node.depth === 1}
                    />
                )

                expect(wrapper.find(testCase.label).length).toBe(3)
            })

            it('should support a custom label component', () => {
                const CustomLabel = () => <span />
                const wrapper = mount(
                    <testCase.Chart<SampleDatum>
                        width={600}
                        height={600}
                        data={sampleData}
                        enableLabels={true}
                        labelComponent={CustomLabel}
                    />
                )

                expect(wrapper.find(CustomLabel).length).toBe(11)
            })
        })
    })
})
