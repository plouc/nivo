import React, { Component, PropTypes } from 'react';
import invariant                       from 'invariant';
import Nivo                            from '../../Nivo';
import { getColorStyleObject }         from '../../ColorUtils';


class BubbleLegends extends Component {
    static createBubbleLegendsFromReactElement(element) {
        const { props } = element;

        const { textColor, labelAccessor, skipRadius } = props;

        const textColorStyle = getColorStyleObject(textColor, 'fill');

        return ({ element, data, width, height, transitionDuration, transitionEasing }) => {

            if (skipRadius > 0) {
                data = data.filter(d => d.r >= skipRadius);
            }

            const legends = element.selectAll('.bubble_legend').data(data);

            legends.enter().append('text')
                .attr('class', 'bubble_legend')
                .style('text-anchor', 'middle')
                .style(textColorStyle)
                .style('opacity', 0)
                .text(labelAccessor)
                .attr('transform', d => `translate(${d.x},${d.y})`)
            ;

            legends
                .text(labelAccessor)
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .style(textColorStyle)
                .style('opacity', 1)
                .attr('transform', d => `translate(${d.x},${d.y})`)
            ;

            legends.exit()
                .remove()
            ;
        };
    }

    render() {
        invariant(
            false,
            '<BubbleLegends> element is for Bubble configuration only and should not be rendered'
        );
    }
}

const { number, func, any } = PropTypes;

BubbleLegends.propTypes = {
    labelAccessor: func.isRequired,
    textColor:     any.isRequired,
    skipRadius:    number.isRequired
};

BubbleLegends.defaultProps = {
    labelAccessor: d => d.name,
    textColor:     'none',
    skipRadius:    0
};


export default BubbleLegends;
