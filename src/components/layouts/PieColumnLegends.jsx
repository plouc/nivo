import React, { Component, PropTypes } from 'react';
import invariant                       from 'invariant';
import d3                              from 'd3';
import { midAngle }                    from '../../ArcUtils';


class PieColumnLegends extends Component {
    static createLegendsFromReactElement(element) {
        const { props } = element;

        return ({ element, arc, keyProp, pie, data, radius }) => {

            const labelFn = props.labelFn || (d => d.data[keyProp]);

            const outerArc = d3.svg.arc()
                .innerRadius(radius + props.radiusOffset)
                .outerRadius(radius + props.radiusOffset)
            ;

            let lines = element.selectAll('.line').data(data, d => d.data[keyProp]);
            lines.enter()
                .append('polyline')
                .attr('stroke', '#fff')
                .attr('fill', 'none')
                .attr('class', 'line')
            ;
            lines
                .attr('points', d => {
                    const p0 = arc.centroid(d);
                    const p1 = outerArc.centroid(d);
                    const p2 = [0, p1[1]];

                    p2[0] = (radius + props.horizontalOffset) * (midAngle(d) < Math.PI ? 1 : -1);

                    return [p0, p1, p2];
                })
            ;
            lines.exit()
                .remove()
            ;

            let labels = element.selectAll('.column-label').data(data, d => d.data[keyProp]);
            labels.enter()
                .append('text')
                .attr('fill', '#fff')
                .attr('class', 'column-label')
            ;
            labels
                .text(labelFn)
                .attr('text-anchor', d => {
                    return midAngle(d) < Math.PI ? 'start' : 'end';
                })
                .attr('transform', d => {
                    const centroid = outerArc.centroid(d);
                    const position = [0, centroid[1]];

                    position[0] = (radius + props.horizontalOffset + props.textOffset) * (midAngle(d) < Math.PI ? 1 : -1);

                    return `translate(${position[0]}, ${position[1]})`;
                })
            ;
            labels.exit()
                .remove()
            ;
        };
    }

    render() {
        invariant(
            false,
            '<PieColumnLegends> element is for Pie configuration only and should not be rendered'
        );
    }
}

const { number, func } = PropTypes;

PieColumnLegends.propTypes = {
    labelFn:          func,
    radiusOffset:     number.isRequired,
    horizontalOffset: number.isRequired,
    textOffset:       number.isRequired
};

PieColumnLegends.defaultProps = {
    radiusOffset:     16,
    horizontalOffset: 30,
    textOffset:       10
};


export default PieColumnLegends;
