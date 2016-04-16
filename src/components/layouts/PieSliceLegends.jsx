import React, { Component, PropTypes } from 'react';
import invariant                       from 'invariant';
import d3                              from 'd3';
import { midAngle, radiansToDegrees }  from '../../ArcUtils';


class PieSliceLegends extends Component {
    static createLegendsFromReactElement(element) {
        const { props } = element;

        return ({ element, keyProp, arc, data }) => {
            let legends = element.selectAll('.slice-legend').data(data, d => d.data[keyProp]);

            const labelFn = props.labelFn || (d => d.data[keyProp]);

            legends.enter()
                .append('g')
                .attr('class', 'slice-legend')
                .attr('transform', d => {
                    const centroid = arc.centroid(d);

                    return `translate(${centroid[0]}, ${centroid[1]})`;
                })
                .each(function (d) {
                    d3.select(this)
                        .append('circle')
                        .attr('fill', d3.rgb(d.data.color).darker(1).toString())
                        .attr('r', props.radius)
                    ;

                    d3.select(this)
                        .append('text')
                        .attr('fill', d => d.data.color)
                        .attr('text-anchor', 'middle')
                    ;
                })
            ;

            legends
                .attr('transform', d => {
                    const centroid = arc.centroid(d);
                    let transform  = `translate(${centroid[0]}, ${centroid[1]})`;

                    if (props.orient) {
                        const angle = midAngle(d);
                        transform = `${transform} rotate(${radiansToDegrees(angle)}, 0, 0)`;
                    }

                    return transform;
                })
                .each(function (d) {
                    d3.select(this).select('circle')
                        .attr('fill', d3.rgb(d.data.color).darker(1).toString())
                    ;

                    d3.select(this).select('text')
                        .attr('fill', d => d.data.color)
                        .text(labelFn(d))
                    ;
                })
            ;

            legends.exit()
                .remove()
            ;
        };
    }

    render() {
        invariant(
            false,
            '<PieSliceLegends> element is for Pie configuration only and should not be rendered'
        );
    }
}

const { number, bool, func } = PropTypes;

PieSliceLegends.propTypes = {
    labelFn: func,
    radius:  number.isRequired,
    orient:  bool.isRequired
};

PieSliceLegends.defaultProps = {
    radius: 12,
    orient: true
};


export default PieSliceLegends;
