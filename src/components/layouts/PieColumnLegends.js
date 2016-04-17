import React, { Component, PropTypes } from 'react';
import invariant                       from 'invariant';
import d3                              from 'd3';
import _                               from 'lodash';
import Nivo                            from '../../Nivo';
import { midAngle, findNeighbor }      from '../../ArcUtils';
import { getColorStyleObject }         from '../../ColorUtils';


class PieColumnLegends extends Component {
    static createLegendsFromReactElement(element) {
        const { props } = element;

        const lineColorStyle = getColorStyleObject(props.lineColor, 'stroke');
        const textColorStyle = getColorStyleObject(props.textColor, 'fill');

        // Receive context from Parent Pie component
        return ({ element, arc, identity, pie, previousData, newData, radius }) => {

            const labelFn = props.labelFn || identity;

            const outerArc = d3.svg.arc()
                .innerRadius(radius + props.radiusOffset)
                .outerRadius(radius + props.radiusOffset)
            ;

            let lines = element.selectAll('.line').data(newData, identity);
            lines.enter()
                .append('polyline')
                .attr('fill', 'none')
                .attr('class', 'line')
                .style('opacity', 0)
                .each(function (d, i) {
                    this._current = findNeighbor(i, identity, previousData, newData) || _.assign({}, d, { endAngle: d.startAngle });
                })
            ;
            lines
                .transition()
                .duration(props.transitionDuration)
                .ease(props.transitionEasing)
                .style(lineColorStyle)
                .style('opacity', 1)
                .attrTween('points', function (d) {
                    const interpolate = d3.interpolate({
                        startAngle: this._current.startAngle,
                        endAngle:   this._current.endAngle
                    }, d);

                    return t => {
                        const angles = interpolate(t);

                        const p0 = arc.centroid(angles);
                        const p1 = outerArc.centroid(angles);
                        const p2 = [0, p1[1]];

                        p2[0] = (radius + props.horizontalOffset) * (midAngle(angles) < Math.PI ? 1 : -1);

                        return [p0, p1, p2];
                    };
                })
            ;
            lines.exit()
                .remove()
            ;

            let labels = element.selectAll('.column-label').data(newData, identity);
            labels.enter()
                .append('text')
                .attr('class', 'column-label')
                .style('opacity', 0)
                .each(function (d, i) {
                    this._current = findNeighbor(i, identity, previousData, newData) || _.assign({}, d, { endAngle: d.startAngle });
                })
            ;
            labels
                .text(labelFn)
                .transition()
                .duration(props.transitionDuration)
                .ease(props.transitionEasing)
                .style(textColorStyle)
                .style('opacity', 1)
                .attrTween('transform', function (d) {
                    const interpolate = d3.interpolate({
                        startAngle: this._current.startAngle,
                        endAngle:   this._current.endAngle
                    }, d);

                    const el = d3.select(this);

                    return t => {
                        const angles = interpolate(t);

                        el.attr('text-anchor', midAngle(angles) < Math.PI ? 'start' : 'end');

                        const centroid = outerArc.centroid(angles);
                        const position = [0, centroid[1]];

                        position[0] = (radius + props.horizontalOffset + props.textOffset) * (midAngle(angles) < Math.PI ? 1 : -1);

                        return `translate(${position[0]}, ${position[1]})`;
                    };
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

const { number, string, func, any } = PropTypes;

PieColumnLegends.propTypes = {
    labelFn:            func,
    radiusOffset:       number.isRequired,
    horizontalOffset:   number.isRequired,
    textOffset:         number.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired,
    lineColor:          any.isRequired,
    textColor:          any.isRequired
};

PieColumnLegends.defaultProps = {
    radiusOffset:       16,
    horizontalOffset:   30,
    textOffset:         10,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing,
    lineColor:          'none',
    textColor:          'none'
};


export default PieColumnLegends;
