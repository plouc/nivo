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

    const root = { id: 'nivo', children: [
        { id: 'charts', children: [
            { id: 'Pie',    loc: 74467 },
            { id: 'Stack',  loc: 74467 },
            { id: 'Tree',   loc: 74467 },
            { id: 'Bubble', loc: 74467 }
        ]},
        { id: 'utils', children: [
            { id: 'Colors',    loc: 74467 },
            { id: 'Arcs',      loc: 74467 },
            { id: 'Data',      loc: 74467 },
            { id: 'Animation', loc: 74467 }
        ]}
    ]};

    it('should render a path for each link', done => {
        render((
            <div style={{ width: 500, height: 300 }}>
                <Tree
                    root={root}
                    direction="horizontal"
                    colors="nivo"
                    identity={d => `${d.parent ? d.parent.id : 'root'}.${d.id}`}
                    transitionDuration={0}
                />
            </div>
        ), node, () => {
            setTimeout(() => {
                const links = node.getElementsByClassName('nivo_tree_link');
                expect(links).toNotBe(null);
                expect(links.length).toBe(10);

                done();
            }, 400);
        })
    });

    it(`should support 'horizontal-reverse' direction `, done => {
        render((
            <div style={{ width: 500, height: 300 }}>
                <Tree
                    root={root}
                    direction="horizontal-reverse"
                    colors="nivo"
                    identity={d => `${d.parent ? d.parent.id : 'root'}.${d.id}`}
                    transitionDuration={0}
                />
            </div>
        ), node, () => {
            setTimeout(() => {
                const links = node.getElementsByClassName('nivo_tree_link');
                expect(links).toNotBe(null);
                expect(links.length).toBe(10);

                done();
            }, 400);
        })
    });

    it(`should support 'vertical' direction `, done => {
        render((
            <div style={{ width: 500, height: 300 }}>
                <Tree
                    root={root}
                    direction="vertical"
                    colors="nivo"
                    identity={d => `${d.parent ? d.parent.id : 'root'}.${d.id}`}
                    transitionDuration={0}
                />
            </div>
        ), node, () => {
            setTimeout(() => {
                const links = node.getElementsByClassName('nivo_tree_link');
                expect(links).toNotBe(null);
                expect(links.length).toBe(10);

                done();
            }, 400);
        })
    });

    it(`should support 'vertical-reverse' direction `, done => {
        render((
            <div style={{ width: 500, height: 300 }}>
                <Tree
                    root={root}
                    direction="vertical-reverse"
                    colors="nivo"
                    identity={d => `${d.parent ? d.parent.id : 'root'}.${d.id}`}
                    transitionDuration={0}
                />
            </div>
        ), node, () => {
            setTimeout(() => {
                const links = node.getElementsByClassName('nivo_tree_link');
                expect(links).toNotBe(null);
                expect(links.length).toBe(10);

                done();
            }, 400);
        })
    });
});
