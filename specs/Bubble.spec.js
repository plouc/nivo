import expect, { spyOn }    from 'expect';
import React, { Component } from 'react';
import { render }           from 'react-dom';
import { BubbleD3 }         from '../src/';


describe('<BubbleD3>', function () {
    this.timeout(10000);

    let node;
    beforeEach(() => {
        node = document.createElement('div');
        document.body.appendChild(node);
    });

    afterEach(() => {
        document.body.removeChild(node);
    });

    const root = { name: 'nivo', children: [
        { name: 'charts', children: [
            { name: 'Pie',    loc: 74467 },
            { name: 'Stack',  loc: 74467 },
            { name: 'Tree',   loc: 74467 },
            { name: 'Bubble', loc: 74467 }
        ]},
        { name: 'utils', children: [
            { name: 'Colors',    loc: 74467 },
            { name: 'Arcs',      loc: 74467 },
            { name: 'Data',      loc: 74467 },
            { name: 'Animation', loc: 74467 }
        ]}
    ]};

    it('should render a circle for each leaf', done => {
        render((
            <div style={{ width: 400, height: 400 }}>
                <BubbleD3
                    width={400} height={400}
                    root={root}
                    valueProperty="loc"
                    colors="nivo"
                    transitionDuration={0}
                />
            </div>
        ), node, () => {
            setTimeout(() => {
                const circles = node.getElementsByClassName('nivo_bubble_node');
                expect(circles).toNotBe(null);
                expect(circles.length).toBe(8);

                done();
            }, 4000);
        })
    });
});
