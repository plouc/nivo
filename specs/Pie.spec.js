import expect, { spyOn }    from 'expect';
import React, { Component } from 'react';
import { render }           from 'react-dom';
import { Chart, Pie }       from '../src/';


describe('<Pie>', function () {
    this.timeout(10000);

    let node;
    beforeEach(() => {
        node = document.createElement('div');
        document.body.appendChild(node);
    });

    afterEach(() => {
        document.body.removeChild(node);
    });

    const data = [
        { label: 'a', value: 2 },
        { label: 'b', value: 2 },
        { label: 'c', value: 2 }
    ];

    it('should render a slice for each datum', done => {
        render((
            <div style={{ width: 200, height: 200 }}>
                <Chart>
                    <Pie
                        width={400} height={400}
                        data={data}
                        colors="nivo"
                        transitionDuration={0}
                    />
                </Chart>
            </div>
        ), node, () => {
            setTimeout(() => {
                const slices = node.getElementsByClassName('nivo_pie_slice');
                expect(slices).toNotBe(null);
                expect(slices.length).toBe(data.length);

                done();
            }, 400);
        })
    });

    it(`should support donut mode by using 'innerRadius' property`, done => {
        render((
            <div style={{ width: 200, height: 200 }}>
                <Chart>
                    <Pie
                        width={400} height={400}
                        data={data}
                        colors="nivo"
                        innerRadius={0.9}
                        transitionDuration={0}
                    />
                </Chart>
            </div>
        ), node, () => {
            setTimeout(() => {
                const slices = node.getElementsByClassName('nivo_pie_slice');
                expect(slices).toNotBe(null);
                expect(slices.length).toBe(data.length);

                console.log(slices.length);

                done();
            }, 400);
        })
    });
});
