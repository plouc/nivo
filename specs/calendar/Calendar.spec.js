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
import { Calendar }         from '../../src/';


describe('<Calendar />', function () {
    this.timeout(10000);

    let node;
    beforeEach(() => {
        node = document.createElement('div');
        document.body.appendChild(node);
    });

    afterEach(() => {
        document.body.removeChild(node);
    });

    it('should render all years days', done => {
        render((
            <Calendar
                width={700} height={400}
                margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                from={new Date(2013, 3, 1)} to={new Date(2014, 7, 12)}
                data={[]}
                colorScale={{
                    type:   'linear',
                    domain: [0, 200, 400],
                    range:  ['#fff', '#ff8c80', '#7f0e05']
                }}
            />
        ), node, () => {
            setTimeout(() => {
                const days = node.getElementsByClassName('nivo_calendar_day');
                expect(days).toNotBe(null);
                expect(days.length).toBe(365 * 2);

                done();
            }, 400);
        })
    });

    it('should render all years months', done => {
        render((
            <Calendar
                width={700} height={400}
                margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                from={new Date(2013, 3, 1)} to={new Date(2014, 7, 12)}
                data={[]}
                colorScale={{
                    type:   'linear',
                    domain: [0, 200, 400],
                    range:  ['#fff', '#ff8c80', '#7f0e05']
                }}
            />
        ), node, () => {
            setTimeout(() => {
                const months = node.getElementsByClassName('nivo_calendar_month');
                expect(months).toNotBe(null);
                expect(months.length).toBe(12 * 2);

                const monthLegends = node.getElementsByClassName('nivo_calendar_month_legend');
                expect(monthLegends).toNotBe(null);
                expect(monthLegends.length).toBe(12 * 2);

                done();
            }, 400);
        })
    });

    it('should render a label for each year', done => {
        render((
            <Calendar
                width={700} height={400}
                margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                from={new Date(2013, 3, 1)} to={new Date(2014, 7, 12)}
                data={[]}
                colorScale={{
                    type:   'linear',
                    domain: [0, 200, 400],
                    range:  ['#fff', '#ff8c80', '#7f0e05']
                }}
            />
        ), node, () => {
            setTimeout(() => {
                const legends = node.getElementsByClassName('nivo_calendar_year_legend');
                expect(legends).toNotBe(null);
                expect(legends.length).toBe(2);

                done();
            }, 400);
        })
    });

    it('should support vertical layout', done => {
        render((
            <Calendar
                width={400} height={700}
                margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                from={new Date(2013, 3, 1)} to={new Date(2014, 7, 12)}
                data={[]}
                direction="vertical"
                colorScale={{
                    type:   'linear',
                    domain: [0, 200, 400],
                    range:  ['#fff', '#ff8c80', '#7f0e05']
                }}
            />
        ), node, () => {
            setTimeout(() => {
                const days = node.getElementsByClassName('nivo_calendar_day');
                expect(days).toNotBe(null);
                expect(days.length).toBe(365 * 2);

                done();
            }, 400);
        })
    });
});
