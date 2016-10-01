import expect, { spyOn }    from 'expect';
import React, { Component } from 'react';
import { render }           from 'react-dom';
import { TreeMapD3 }        from '../src/';


describe('<TreeMapD3>', function () {
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

    it('should render a treemap', done => {
        render((
            <TreeMapD3
                root={root}
                width={500} height={300}
                valueAccessor={d => d.loc}
                colors="nivo"
                transitionDuration={0}
            />
        ), node, () => {
            setTimeout(() => {
                const nodes = node.getElementsByClassName('nivo_treemap_node');
                expect(nodes).toNotBe(null);
                expect(nodes.length).toBe(11);

                done();
            }, 400);
        })
    });

    ['squarify', 'slice', 'dice', 'slice-dice'].forEach(mode => {
        it(`should support "${mode}" mode`, done => {
            render((
                <TreeMapD3
                    root={root}
                    width={500} height={300}
                    mode={mode}
                    valueAccessor={d => d.loc}
                    colors="nivo"
                    transitionDuration={0}
                />
            ), node, () => {
                setTimeout(() => {
                    const nodes = node.getElementsByClassName('nivo_treemap_node');
                    expect(nodes).toNotBe(null);
                    expect(nodes.length).toBe(11);

                    done();
                }, 400);
            });
        });
    });
});
