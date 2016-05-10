/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import d3                                           from 'd3';
import { degreesToRadians, midAngle, findNeighbor } from '../../../ArcUtils';
import { getColorRange }                            from '../../../ColorUtils';


const PieD3Svg = svg => {

    // DOM elements
    const element    = d3.select(svg);
    const wrapper    = element.select('.nivo_pie_wrapper');
    const outline    = wrapper.append('path').attr('class', 'nivo_pie_outline');
    const slices     = wrapper.append('g').attr('class', 'nivo_pie_slices');

    // d3 generators
    const pie        = d3.layout.pie();
    const arc        = d3.svg.arc();

    // used to store previous state for smart transitions
    let previousData = [];

    // an array to store decorator functions
    let decorators   = [];

    return {
        draw(props) {
            const {
                data,
                margin,
                sort,
                keyProp, valueProp,
                startAngle, endAngle,
                padAngle, cornerRadius,
                colors,
                innerRadius,
                transitionDuration, transitionEasing
            } = props;

            const identity = d => d.data[keyProp];
            const color    = getColorRange(colors);

            // Resize root DOM element and position wrapper
            element.attr({
                width:  props.width,
                height: props.height,
            });

            const width  = props.width  - margin.left - margin.right;
            const height = props.height - margin.top  - margin.bottom;

            wrapper.attr('transform', `translate(${props.width / 2}, ${props.height / 2})`);

            // Pie layout settings update
            pie
                .sort(sort)
                .value(d => d[valueProp])
                .startAngle(degreesToRadians(startAngle))
                .endAngle(degreesToRadians(endAngle))
                .padAngle(degreesToRadians(padAngle))
            ;

            let radius = Math.min(width / 2, height / 2);

            // Arc generator settings update
            arc
                .outerRadius(radius)
                .innerRadius(radius * innerRadius)
                .cornerRadius(cornerRadius)
            ;

            outline.attr('d', arc({
                startAngle: degreesToRadians(startAngle),
                endAngle:   degreesToRadians(endAngle)
            }));

            let slice = slices.selectAll('.nivo_pie_slice');

            const newData = pie(data.map((d, i) => {
                if (!d.color) {
                    d.color = color(d[keyProp]);
                }

                return d;
            }));
            
            function arcTween(a) {
                const i = d3.interpolate(this._current, a);
                this._current = i(0);

                return t => arc(i(t));
            }

            slice = slice.data(newData, identity);

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // ENTER: creates new elements
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            console.log('———{ ENTER }———————————————————————————————');
            slice.enter().append('path')
                .attr('class', 'nivo_pie_slice')
                .style('fill', d => d.data.color)
                .each(function (d, i) {
                    const angle = midAngle(d);

                    console.log(`"${identity(d)}" enter`);

                    // for seamless enter transitions,
                    // we search for nearest slice to transition from
                    const neighbor = findNeighbor(i, identity, previousData, newData);
                    if (neighbor) {
                        console.info(`found neighbor for entering "${identity(d)}"`);
                        this._current = neighbor;
                    } else {
                        console.error(`no neighbor found for entering "${identity(d)}"`);
                        // if no neighbor found, we start from 0
                        this._current = _.assign({}, d, {
                            startAngle: 0,
                            endAngle:   0,
                        });

                        this._current = d;
                    }
                })
            ;

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // EXIT: removes stale elements
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            console.log('———{ EXIT }———————————————————————————————');
            slice.exit()
                .attr('class', 'nivo_exit')
                .datum((d, i) => {
                    console.log(`"${identity(d)}" exit`);

                    // for seamless exit transitions,
                    // we search for nearest slice to transition from
                    const neighbor = findNeighbor(i, identity, newData, previousData);
                    
                    if (neighbor) {
                        console.info(`found neighbor for exiting "${identity(d)}"`);
                        return neighbor;
                    }

                    console.error(`no neighbor found for exiting "${identity(d)}"`);
                    // if no neighbor found, we exit from current slice
                    return d;
                })
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attrTween('d', arcTween)
                .remove()
            ;

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // UPDATE: updates existing elements
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            slice
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .style('fill', d => d.data.color)
                .attrTween('d', arcTween)
            ;


            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // Decorate
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            const pieContext = {
                element, wrapper,
                pie, arc, radius,
                identity, previousData, newData,
                transitionDuration, transitionEasing
            };

            decorators.forEach(legend => {
                legend(pieContext);
            });

            previousData = newData;
        },

        decorate(newDecorators = []) {
            decorators = newDecorators;
        }
    };
};


export default PieD3Svg;
