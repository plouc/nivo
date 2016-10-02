/*
 * This file is part of the nivo project.
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


const PieD3Svg = domRoot => {

    // DOM elements
    const element    = d3.select(domRoot);
    const outline    = element.append('path').attr('class', 'nivo_pie_outline');
    const slices     = element.append('g').attr('class', 'nivo_pie_slices');

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
                width, height,
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

            element.attr('transform', `translate(${width / 2}, ${height / 2})`);

            pie
                .sort(sort)
                .value(d => d[valueProp])
                .startAngle(degreesToRadians(startAngle))
                .endAngle(degreesToRadians(endAngle))
                .padAngle(degreesToRadians(padAngle))
            ;

            let radius = Math.min(width / 2, height / 2);

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
                    d.color = color(i);
                }

                return d;
            }));

            //console.log(_.cloneDeep(newData));

            function arcTween(a) {
                const i = d3.interpolate(this._current, a);
                this._current = i(0);

                return t => arc(i(t));
            }

            slice = slice.data(newData, identity);

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // ENTER: creates new elements
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            slice.enter().append('path')
                .attr('class', 'nivo_pie_slice')
                .style('fill', d => d.data.color)
                .each(function (d, i) {
                    const angle = midAngle(d);

                    this._current = findNeighbor(i, identity, previousData, newData) || _.assign({}, d, {
                        startAngle: 0,
                        endAngle:   0
                    });
                })
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
            // EXIT: removes stale elements
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            slice.exit()
                .attr('class', 'nivo_exit')
                .datum((d, i) => {
                    return findNeighbor(i, identity, newData, previousData) || d;
                })
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attrTween('d', arcTween)
                .remove()
            ;

            const pieContext = {
                element,
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
