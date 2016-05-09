import expect, { spyOn }    from 'expect';
import React, { Component } from 'react';
import { render }           from 'react-dom';
import { Chart, Stack }     from '../src/';


describe('<Stack>', function () {
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
        [{ x: 10, y: 10 }, { x: 20, y: 20 }, { x: 20, y: 30 }],
        [{ x: 10, y: 10 }, { x: 20, y: 20 }, { x: 20, y: 30 }],
        [{ x: 10, y: 10 }, { x: 20, y: 20 }, { x: 20, y: 30 }]
    ];

    ['zero', 'wiggle', 'silhouette', 'expand'].forEach(offsetMode => {
        it(`should support "${offsetMode}" offset mode`, done => {
            render((
                <div style={{ width: 200, height: 200 }}>
                    <Chart>
                        <Stack
                            data={data}
                            offset={offsetMode}
                            colors="nivo"
                            transitionDuration={0}
                        />
                    </Chart>
                </div>
            ), node, () => {
                setTimeout(() => {
                    const areas = node.getElementsByClassName('nivo_stack_area');
                    expect(areas).toNotBe(null);
                    expect(areas.length).toBe(data.length);

                    done();
                }, 400);
            });
        });
    });
});
