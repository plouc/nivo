import React, { Component, PropTypes } from 'react';
import invariant                       from 'invariant';
import d3                              from 'd3';
import { midAngle, radiansToDegrees }  from '../../ArcUtils';


class PieRadialLegends extends Component {
    static createLegendsFromReactElement(element) {
        const { props } = element;

        return ({ element, arc, keyProp, pie, data, radius }) => {

            const labelFn = props.labelFn || (d => d.data[keyProp]);

            const outerArc = d3.svg.arc()
                .innerRadius(radius + props.radiusOffset)
                .outerRadius(radius + props.radiusOffset)
            ;

            let labels = element.selectAll('.radial-label').data(data, d => d.data[keyProp]);
            labels.enter()
                .append('text')
                .attr('fill', '#fff')
                .attr('class', 'radial-label')
            ;
            labels
                .text(labelFn)
                .attr('text-anchor', d => {
                    return midAngle(d) < Math.PI ? 'start' : 'end';
                })
                .attr('transform', d => {
                    const centroid = outerArc.centroid(d);
                    const angle    = midAngle(d);

                    const angleOffset = angle < Math.PI ? -90 : 90;

                    return `translate(${centroid[0]}, ${centroid[1]}) rotate(${radiansToDegrees(angle) + angleOffset}, 0, 0)`;
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
            '<PieRadialLegends> element is for Pie configuration only and should not be rendered'
        );
    }
}

const { number, func } = PropTypes;

PieRadialLegends.propTypes = {
    labelFn:      func,
    radiusOffset: number.isRequired
};

PieRadialLegends.defaultProps = {
    radiusOffset: 16
};


export default PieRadialLegends;
