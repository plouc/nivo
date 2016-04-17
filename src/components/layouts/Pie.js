import React, { Component, PropTypes }    from 'react';
import _                                  from 'lodash';
import d3                                 from 'd3';
import Nivo                               from '../../Nivo';
import { degreesToRadians, findNeighbor } from '../../ArcUtils';


class Pie extends Component {
    renderD3(nextProps) {
        const {
            data,
            width, height,
            sort,
            keyProp, valueProp,
            startAngle, endAngle, padAngle,
            innerRadius,
            transitionDuration, transitionEasing,
        } = nextProps;

        const identity = d => d.data[keyProp];

        const element   = d3.select(React.findDOMNode(this));
        const container = element.select('.chart__layout__pie__slices');

        element.attr('transform', `translate(${width / 2}, ${height / 2})`);

        const pie = d3.layout.pie()
            .sort(sort)
            .value(d => d[valueProp])
            .startAngle(degreesToRadians(startAngle))
            .endAngle(degreesToRadians(endAngle))
            .padAngle(degreesToRadians(padAngle))
        ;

        const radius = Math.min(width / 2, height / 2);
        const arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius * innerRadius)
        ;

        element.select('.chart__layout__pie__outline').attr('d', arc({
            startAngle: degreesToRadians(startAngle),
            endAngle:   degreesToRadians(endAngle)
        }));

        const color = d3.scale.category20();
        /*
        const color = d3.scale.linear()
            .domain([0, data.length / 2, data.length])
            .range(['#ba1300', '#c6482e', '#ff9068'])
        ;
        */

        let slices = container.selectAll('.chart__layout__pie__slice');
        const previousData = slices.data();
        const newData      = pie(data.map((d, i) => {
            if (!d.color) {
                d.color = color(i);
            }

            return d;
        }));

        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function (t) {
                return arc(i(t));
            };
        }

        slices = slices.data(newData, identity);
        slices.enter().append('path')
            .attr('class', 'chart__layout__pie__slice')
            .style('fill', d => d.data.color)
            .each(function (d, i) {
                this._current = findNeighbor(i, identity, previousData, newData) || _.assign({}, d, { endAngle: d.startAngle });
            })
        ;
        slices.exit()
            .datum((d, i) => {
                return findNeighbor(i, identity, newData, previousData) || d;
            })
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attrTween('d', arcTween)
            .remove()
        ;
        slices
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attrTween('d', arcTween)
            .style('fill', d => d.data.color)
        ;

        const pieContext = {
            element,
            pie,
            arc, radius,
            identity,
            previousData, newData
        };

        this.legends.forEach(legend => {
            legend(pieContext);
        });
    }

    shouldComponentUpdate(nextProps) {
        this.renderD3(nextProps);

        return false;
    }

    componentDidMount() {
        this.renderD3(this.props);
    }

    componentWillMount() {
        const { children } = this.props;

        const legends = [];

        React.Children.forEach(children, element => {
            if (React.isValidElement(element)) {
                if (element.type.createLegendsFromReactElement) {
                    legends.push(element.type.createLegendsFromReactElement(element));
                }
            }
        });

        this.legends = legends;
    }

    render() {
        return (
            <g>
                <path className="chart__layout__pie__outline" />
                <g className="chart__layout__pie__slices" />
            </g>
        );
    }
}

const { array, number, string, func } = PropTypes;

Pie.propTypes = {
    width:              number.isRequired,
    height:             number.isRequired,
    sort:               func,
    data:               array.isRequired,
    keyProp:            string.isRequired,
    valueProp:          string.isRequired,
    startAngle:         number.isRequired,
    endAngle:           number.isRequired,
    padAngle:           number.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired,
    innerRadius:        number.isRequired
};

Pie.defaultProps = {
    sort:               null,
    keyProp:            'label',
    valueProp:          'value',
    startAngle:         0,
    endAngle:           360,
    padAngle:           0,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing,
    innerRadius:        0
};


export default Pie;
