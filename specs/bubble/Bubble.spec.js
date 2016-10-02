/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import expect, { spyOn }    from 'expect';
import React, { Component } from 'react';
import { render }           from 'react-dom';
import { Bubble }           from '../../src/';
import bubbleData           from './bubbleData';


describe('<Bubble />', function () {
    this.timeout(10000);

    let node;
    beforeEach(() => {
        node = document.createElement('div');
        document.body.appendChild(node);
    });

    afterEach(() => {
        document.body.removeChild(node);
    });

    it('should render a circle for each leaf', done => {
        render((
            <Bubble
                width={400} height={400}
                data={bubbleData}
                value="loc"
                colors="nivo"
                transitionDuration={0}
            />
        ), node, () => {
            setTimeout(() => {
                const circles = node.getElementsByClassName('nivo_bubble_node');
                expect(circles).toNotBe(null);
                expect(circles.length).toBe(11);

                done();
            }, 400);
        })
    });
});
