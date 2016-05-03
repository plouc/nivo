import expect, { spyOn }      from 'expect';
import React, { Component }   from 'react';
import { render }             from 'react-dom';
import { Chart, RadialStack } from '../src/';


describe('<RadialStack>', function () {
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
        [{ x: 0, y: 10 }, { x: 1, y: 20 }, { x: 2, y: 30 }, { x: 3, y: 2 }, { x: 4, y: 80 }, { x: 5, y: 30 }],
        [{ x: 0, y: 10 }, { x: 1, y: 20 }, { x: 2, y: 30 }, { x: 3, y: 2 }, { x: 4, y: 20 }, { x: 5, y: 30 }],
        [{ x: 0, y: 10 }, { x: 1, y: 20 }, { x: 2, y: 30 }, { x: 3, y: 2 }, { x: 4, y: 40 }, { x: 5, y: 30 }]
    ];

    ['zero', 'wiggle', 'silhouette', 'expand'].forEach(offsetMode => {
        it(`should support "${offsetMode}" offset mode`, done => {
            render((
                <RadialStack
                    layers={data}
                    width={400} height={400}
                    offset={offsetMode}
                    colors="nivo"
                    transitionDuration={0}
                />
            ), node, () => {
                setTimeout(() => {
                    const areas = node.getElementsByClassName('nivo_radial-stack_area');
                    expect(areas).toNotBe(null);
                    expect(areas.length).toBe(data.length);

                    done();
                }, 400);
            });
        });
    });
});
