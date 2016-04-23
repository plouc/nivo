import expect, { spyOn }    from 'expect';
import React, { Component } from 'react';
import { render }           from 'react-dom';
import { Tree }             from '../src/';


describe('<Tree>', function () {
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

    it('should render a path for each link', done => {
        render((
            <div style={{ width: 200, height: 200 }}>
                <Tree
                    root={root}
                    direction="horizontal"
                    colors="nivo"
                    transitionDuration={0}
                />
            </div>
        ), node, () => {
            setTimeout(() => {
                const links = node.getElementsByClassName('nivo_tree_link');
                expect(links).toNotBe(null);
                expect(links.length).toBe(10);

                done();
            }, 4000);
        })
    });

    it(`should support 'horizontal-reverse' direction `, done => {
        render((
            <div style={{ width: 200, height: 200 }}>
                <Tree
                    root={root}
                    direction="horizontal-reverse"
                    colors="nivo"
                    transitionDuration={0}
                />
            </div>
        ), node, () => {
            setTimeout(() => {
                const links = node.getElementsByClassName('nivo_tree_link');
                expect(links).toNotBe(null);
                expect(links.length).toBe(10);

                done();
            }, 4000);
        })
    });

    it(`should support 'vertical' direction `, done => {
        render((
            <div style={{ width: 200, height: 200 }}>
                <Tree
                    root={root}
                    direction="vertical"
                    colors="nivo"
                    transitionDuration={0}
                />
            </div>
        ), node, () => {
            setTimeout(() => {
                const links = node.getElementsByClassName('nivo_tree_link');
                expect(links).toNotBe(null);
                expect(links.length).toBe(10);

                done();
            }, 4000);
        })
    });

    it(`should support 'vertical-reverse' direction `, done => {
        render((
            <div style={{ width: 200, height: 200 }}>
                <Tree
                    root={root}
                    direction="vertical-reverse"
                    colors="nivo"
                    transitionDuration={0}
                />
            </div>
        ), node, () => {
            setTimeout(() => {
                const links = node.getElementsByClassName('nivo_tree_link');
                expect(links).toNotBe(null);
                expect(links.length).toBe(10);

                done();
            }, 4000);
        })
    });
});
