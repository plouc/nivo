(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-scale'), require('lodash/min'), require('lodash/max'), require('lodash/range'), require('lodash/flattenDepth'), require('d3-shape'), require('react'), require('prop-types'), require('recompose/compose'), require('recompose/withPropsOnChange'), require('recompose/pure'), require('@nivo/core'), require('@nivo/legends'), require('recompose/defaultProps'), require('react-motion'), require('recompose/setDisplayName')) :
    typeof define === 'function' && define.amd ? define(['exports', 'd3-scale', 'lodash/min', 'lodash/max', 'lodash/range', 'lodash/flattenDepth', 'd3-shape', 'react', 'prop-types', 'recompose/compose', 'recompose/withPropsOnChange', 'recompose/pure', '@nivo/core', '@nivo/legends', 'recompose/defaultProps', 'react-motion', 'recompose/setDisplayName'], factory) :
    (factory((global.nivo = global.nivo || {}),global.d3,global['lodash/min'],global['lodash/max'],global['lodash/range'],global['lodash/flattenDepth'],global.d3,global.React,global.PropTypes,global.RecomposeCompose,global.RecomposeWithPropsOnChange,global.RecomposePure,global.nivo,global.nivo,global.RecomposeDefaultProps,global.ReactMotion,global.RecomposeSetDisplayName));
}(this, (function (exports,d3Scale,min,max,range,flattenDepth,d3Shape,React,PropTypes,compose,withPropsOnChange,pure,core,legends,defaultProps,reactMotion,setDisplayName) { 'use strict';

    min = min && min.hasOwnProperty('default') ? min['default'] : min;
    max = max && max.hasOwnProperty('default') ? max['default'] : max;
    range = range && range.hasOwnProperty('default') ? range['default'] : range;
    flattenDepth = flattenDepth && flattenDepth.hasOwnProperty('default') ? flattenDepth['default'] : flattenDepth;
    var React__default = 'default' in React ? React['default'] : React;
    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
    compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
    withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
    pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
    defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
    setDisplayName = setDisplayName && setDisplayName.hasOwnProperty('default') ? setDisplayName['default'] : setDisplayName;

    /**
     * Generates indexed scale.
     *
     * @param {Array.<Object>} data
     * @param {Function}       getIndex
     * @param {Array.<number>} range
     * @param {number}         padding
     * @returns {Function}
     */
    var getIndexedScale = function getIndexedScale(data, getIndex, range$$1, padding) {
      return d3Scale.scaleBand().rangeRound(range$$1).domain(data.map(getIndex)).padding(padding);
    };

    /**
     * Generates scale for grouped bar chart.
     *
     * @param {Array.<Object>} data
     * @param {Array.<string>} keys
     * @param {number}         _minValue
     * @param {number|string}  _maxValue
     * @param {Array.<number>} range
     * @returns {Function}
     */
    var getGroupedScale = function getGroupedScale(data, keys, _minValue, _maxValue, range$$1) {
        var allValues = data.reduce(function (acc, entry) {
            return [].concat(acc, keys.map(function (k) {
                return entry[k];
            }));
        }, []);

        var maxValue = _maxValue;
        if (maxValue === 'auto') {
            maxValue = max(allValues);
        }

        var minValue = _minValue;
        if (minValue === 'auto') {
            minValue = min(allValues);
            if (minValue > 0) minValue = 0;
        }

        return d3Scale.scaleLinear().rangeRound(range$$1).domain([minValue, maxValue]);
    };

    /**
     * Generates x/y scales & bars for vertical grouped bar chart.
     *
     * @param {Array.<Object>} data
     * @param {Function}       getIndex
     * @param {Array.<string>} keys
     * @param {number}         minValue
     * @param {number}         maxValue
     * @param {boolean}        reverse
     * @param {number}         width
     * @param {number}         height
     * @param {Function}       getColor
     * @param {number}         [padding=0]
     * @param {number}         [innerPadding=0]
     * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
     */
    var generateVerticalGroupedBars = function generateVerticalGroupedBars(_ref) {
        var data = _ref.data,
            getIndex = _ref.getIndex,
            keys = _ref.keys,
            minValue = _ref.minValue,
            maxValue = _ref.maxValue,
            reverse = _ref.reverse,
            width = _ref.width,
            height = _ref.height,
            getColor = _ref.getColor,
            _ref$padding = _ref.padding,
            padding = _ref$padding === undefined ? 0 : _ref$padding,
            _ref$innerPadding = _ref.innerPadding,
            innerPadding = _ref$innerPadding === undefined ? 0 : _ref$innerPadding;

        var xScale = getIndexedScale(data, getIndex, [0, width], padding);
        var yRange = reverse ? [0, height] : [height, 0];
        var yScale = getGroupedScale(data, keys, minValue, maxValue, yRange);

        var barWidth = (xScale.bandwidth() - innerPadding * (keys.length - 1)) / keys.length;
        var yRef = yScale(0);

        var getY = function getY(d) {
            return d > 0 ? yScale(d) : yRef;
        };
        var getHeight = function getHeight(d, y) {
            return d > 0 ? yRef - y : yScale(d) - yRef;
        };
        if (reverse) {
            getY = function getY(d) {
                return d < 0 ? yScale(d) : yRef;
            };
            getHeight = function getHeight(d, y) {
                return d < 0 ? yRef - y : yScale(d) - yRef;
            };
        }

        var bars = [];
        if (barWidth > 0) {
            keys.forEach(function (key, i) {
                range(xScale.domain().length).forEach(function (index) {
                    var x = xScale(getIndex(data[index])) + barWidth * i + innerPadding * i;
                    var y = getY(data[index][key]);
                    var barHeight = getHeight(data[index][key], y);

                    if (barWidth > 0 && barHeight > 0) {
                        var barData = {
                            id: key,
                            value: data[index][key],
                            index: index,
                            indexValue: getIndex(data[index]),
                            data: data[index]
                        };

                        bars.push({
                            key: key + '.' + barData.indexValue,
                            data: barData,
                            x: x,
                            y: y,
                            width: barWidth,
                            height: barHeight,
                            color: getColor(barData)
                        });
                    }
                });
            });
        }

        return { xScale: xScale, yScale: yScale, bars: bars };
    };

    /**
     * Generates x/y scales & bars for horizontal grouped bar chart.
     *
     * @param {Array.<Object>} data
     * @param {Function}       getIndex
     * @param {Array.<string>} keys
     * @param {number}         minValue
     * @param {number}         maxValue
     * @param {boolean}        reverse
     * @param {number}         width
     * @param {number}         height
     * @param {Function}       getColor
     * @param {number}         [padding=0]
     * @param {number}         [innerPadding=0]
     * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
     */
    var generateHorizontalGroupedBars = function generateHorizontalGroupedBars(_ref2) {
        var data = _ref2.data,
            getIndex = _ref2.getIndex,
            keys = _ref2.keys,
            minValue = _ref2.minValue,
            maxValue = _ref2.maxValue,
            reverse = _ref2.reverse,
            width = _ref2.width,
            height = _ref2.height,
            getColor = _ref2.getColor,
            _ref2$padding = _ref2.padding,
            padding = _ref2$padding === undefined ? 0 : _ref2$padding,
            _ref2$innerPadding = _ref2.innerPadding,
            innerPadding = _ref2$innerPadding === undefined ? 0 : _ref2$innerPadding;

        var xRange = reverse ? [width, 0] : [0, width];
        var xScale = getGroupedScale(data, keys, minValue, maxValue, xRange);
        var yScale = getIndexedScale(data, getIndex, [height, 0], padding);

        var barHeight = (yScale.bandwidth() - innerPadding * (keys.length - 1)) / keys.length;
        var xRef = xScale(0);

        var getX = function getX(d) {
            return d > 0 ? xRef : xScale(d);
        };
        var getWidth = function getWidth(d, x) {
            return d > 0 ? xScale(d) - xRef : xRef - x;
        };
        if (reverse) {
            getX = function getX(d) {
                return d < 0 ? xRef : xScale(d);
            };
            getWidth = function getWidth(d, x) {
                return d < 0 ? xScale(d) - xRef : xRef - x;
            };
        }

        var bars = [];
        if (barHeight > 0) {
            keys.forEach(function (key, i) {
                range(yScale.domain().length).forEach(function (index) {
                    var x = getX(data[index][key]);
                    var y = yScale(getIndex(data[index])) + barHeight * i + innerPadding * i;
                    var barWidth = getWidth(data[index][key], x);

                    if (barWidth > 0) {
                        var barData = {
                            id: key,
                            value: data[index][key],
                            index: index,
                            indexValue: getIndex(data[index]),
                            data: data[index]
                        };

                        bars.push({
                            key: key + '.' + barData.indexValue,
                            data: barData,
                            x: x,
                            y: y,
                            width: barWidth,
                            height: barHeight,
                            color: getColor(barData)
                        });
                    }
                });
            });
        }

        return { xScale: xScale, yScale: yScale, bars: bars };
    };

    /**
     * Generates x/y scales & bars for grouped bar chart.
     *
     * @param {Object} options
     * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
     */
    var generateGroupedBars = function generateGroupedBars(options) {
        return options.layout === 'vertical' ? generateVerticalGroupedBars(options) : generateHorizontalGroupedBars(options);
    };

    /**
     * Generates scale for stacked bar chart.
     *
     * @param {Array.<Object>} data
     * @param {number|string}  _minValue
     * @param {number|string}  _maxValue
     * @param {Array.<number>} range
     * @returns {Function}
     */
    var getStackedScale = function getStackedScale(data, _minValue, _maxValue, range$$1) {
        var allValues = flattenDepth(data, 2);

        var minValue = _minValue;
        if (minValue === 'auto') {
            minValue = min(allValues);
        }

        var maxValue = _maxValue;
        if (maxValue === 'auto') {
            maxValue = max(allValues);
        }

        return d3Scale.scaleLinear().rangeRound(range$$1).domain([minValue, maxValue]);
    };

    /**
     * Generates x/y scales & bars for vertical stacked bar chart.
     *
     * @param {Array.<Object>} data
     * @param {Function}       getIndex
     * @param {Array.<string>} keys
     * @param {number}         minValue
     * @param {number}         maxValue
     * @param {boolean}        reverse
     * @param {number}         width
     * @param {number}         height
     * @param {Function}       getColor
     * @param {number}         [padding=0]
     * @param {number}         [innerPadding=0]
     * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
     */
    var generateVerticalStackedBars = function generateVerticalStackedBars(_ref) {
        var data = _ref.data,
            getIndex = _ref.getIndex,
            keys = _ref.keys,
            minValue = _ref.minValue,
            maxValue = _ref.maxValue,
            reverse = _ref.reverse,
            width = _ref.width,
            height = _ref.height,
            getColor = _ref.getColor,
            _ref$padding = _ref.padding,
            padding = _ref$padding === undefined ? 0 : _ref$padding,
            _ref$innerPadding = _ref.innerPadding,
            innerPadding = _ref$innerPadding === undefined ? 0 : _ref$innerPadding;

        var stackedData = d3Shape.stack().keys(keys).offset(d3Shape.stackOffsetDiverging)(data);

        var xScale = getIndexedScale(data, getIndex, [0, width], padding);
        var yRange = reverse ? [0, height] : [height, 0];
        var yScale = getStackedScale(stackedData, minValue, maxValue, yRange);

        var bars = [];
        var barWidth = xScale.bandwidth();

        var getY = function getY(d) {
            return yScale(d[1]);
        };
        var getHeight = function getHeight(d, y) {
            return yScale(d[0]) - y;
        };
        if (reverse) {
            getY = function getY(d) {
                return yScale(d[0]);
            };
            getHeight = function getHeight(d, y) {
                return yScale(d[1]) - y;
            };
        }

        if (barWidth > 0) {
            stackedData.forEach(function (stackedDataItem) {
                xScale.domain().forEach(function (index, i) {
                    var d = stackedDataItem[i];
                    var x = xScale(getIndex(d.data));

                    var y = getY(d);
                    var barHeight = getHeight(d, y);
                    if (innerPadding > 0) {
                        y += innerPadding * 0.5;
                        barHeight -= innerPadding;
                    }

                    if (barHeight > 0) {
                        var barData = {
                            id: stackedDataItem.key,
                            value: d.data[stackedDataItem.key],
                            index: i,
                            indexValue: index,
                            data: d.data
                        };

                        bars.push({
                            key: stackedDataItem.key + '.' + index,
                            data: barData,
                            x: x,
                            y: y,
                            width: barWidth,
                            height: barHeight,
                            color: getColor(barData)
                        });
                    }
                });
            });
        }

        return { xScale: xScale, yScale: yScale, bars: bars };
    };

    /**
     * Generates x/y scales & bars for horizontal stacked bar chart.
     *
     * @param {Array.<Object>} data
     * @param {Function}       getIndex
     * @param {Array.<string>} keys
     * @param {number}         minValue
     * @param {number}         maxValue
     * @param {boolean}        reverse
     * @param {number}         width
     * @param {number}         height
     * @param {Function}       getColor
     * @param {number}         [padding=0]
     * @param {number}         [innerPadding=0]
     * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
     */
    var generateHorizontalStackedBars = function generateHorizontalStackedBars(_ref2) {
        var data = _ref2.data,
            getIndex = _ref2.getIndex,
            keys = _ref2.keys,
            minValue = _ref2.minValue,
            maxValue = _ref2.maxValue,
            reverse = _ref2.reverse,
            width = _ref2.width,
            height = _ref2.height,
            getColor = _ref2.getColor,
            _ref2$padding = _ref2.padding,
            padding = _ref2$padding === undefined ? 0 : _ref2$padding,
            _ref2$innerPadding = _ref2.innerPadding,
            innerPadding = _ref2$innerPadding === undefined ? 0 : _ref2$innerPadding;

        var stackedData = d3Shape.stack().keys(keys).offset(d3Shape.stackOffsetDiverging)(data);

        var xRange = reverse ? [width, 0] : [0, width];
        var xScale = getStackedScale(stackedData, minValue, maxValue, xRange);
        var yScale = getIndexedScale(data, getIndex, [height, 0], padding);

        var bars = [];
        var barHeight = yScale.bandwidth();

        var getX = function getX(d) {
            return xScale(d[0]);
        };
        var getWidth = function getWidth(d, x) {
            return xScale(d[1]) - x;
        };
        if (reverse) {
            getX = function getX(d) {
                return xScale(d[1]);
            };
            getWidth = function getWidth(d, y) {
                return xScale(d[0]) - y;
            };
        }

        if (barHeight > 0) {
            stackedData.forEach(function (stackedDataItem) {
                yScale.domain().forEach(function (index, i) {
                    var d = stackedDataItem[i];
                    var y = yScale(getIndex(d.data));

                    var barData = {
                        id: stackedDataItem.key,
                        value: d.data[stackedDataItem.key],
                        index: i,
                        indexValue: index,
                        data: d.data
                    };

                    var x = getX(d);
                    var barWidth = getWidth(d, x);
                    if (innerPadding > 0) {
                        x += innerPadding * 0.5;
                        barWidth -= innerPadding;
                    }

                    if (barWidth > 0) {
                        bars.push({
                            key: stackedDataItem.key + '.' + index,
                            data: barData,
                            x: x,
                            y: y,
                            width: barWidth,
                            height: barHeight,
                            color: getColor(barData)
                        });
                    }
                });
            });
        }

        return { xScale: xScale, yScale: yScale, bars: bars };
    };

    /**
     * Generates x/y scales & bars for stacked bar chart.
     *
     * @param {Object} options
     * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
     */
    var generateStackedBars = function generateStackedBars(options) {
        return options.layout === 'vertical' ? generateVerticalStackedBars(options) : generateHorizontalStackedBars(options);
    };

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    var BarItem = function BarItem(_ref) {
        var data = _ref.data,
            x = _ref.x,
            y = _ref.y,
            width = _ref.width,
            height = _ref.height,
            borderRadius = _ref.borderRadius,
            color = _ref.color,
            borderWidth = _ref.borderWidth,
            borderColor = _ref.borderColor,
            label = _ref.label,
            shouldRenderLabel = _ref.shouldRenderLabel,
            labelColor = _ref.labelColor,
            showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip,
            onClick = _ref.onClick,
            tooltip = _ref.tooltip,
            theme = _ref.theme;

        var handleTooltip = function handleTooltip(e) {
            return showTooltip(tooltip, e);
        };

        return React__default.createElement(
            'g',
            { transform: 'translate(' + x + ', ' + y + ')' },
            React__default.createElement('rect', {
                width: width,
                height: height,
                rx: borderRadius,
                ry: borderRadius,
                fill: data.fill ? data.fill : color,
                strokeWidth: borderWidth,
                stroke: borderColor,
                onMouseEnter: handleTooltip,
                onMouseMove: handleTooltip,
                onMouseLeave: hideTooltip,
                onClick: onClick
            }),
            shouldRenderLabel && React__default.createElement(
                'text',
                {
                    x: width / 2,
                    y: height / 2,
                    textAnchor: 'middle',
                    alignmentBaseline: 'central',
                    style: _extends({}, theme.labels.text, {
                        pointerEvents: 'none',
                        fill: labelColor
                    })
                },
                label
            )
        );
    };

    BarItem.propTypes = {
        data: PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
            indexValue: PropTypes.string.isRequired
        }).isRequired,

        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        borderRadius: PropTypes.number.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,

        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        shouldRenderLabel: PropTypes.bool.isRequired,
        labelColor: PropTypes.string.isRequired,

        tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
        onClick: PropTypes.func,
        tooltip: PropTypes.element.isRequired,

        theme: PropTypes.shape({
            tooltip: PropTypes.shape({}).isRequired
        }).isRequired
    };

    var enhance = compose(withPropsOnChange(['data', 'color', 'onClick'], function (_ref2) {
        var data = _ref2.data,
            color = _ref2.color,
            _onClick = _ref2.onClick;
        return {
            onClick: function onClick(event) {
                return _onClick(_extends({ color: color }, data), event);
            }
        };
    }), withPropsOnChange(['data', 'color', 'theme', 'tooltip', 'tooltipFormat'], function (_ref3) {
        var data = _ref3.data,
            color = _ref3.color,
            theme = _ref3.theme,
            tooltip = _ref3.tooltip,
            tooltipFormat = _ref3.tooltipFormat;
        return {
            tooltip: React__default.createElement(core.BasicTooltip, {
                id: data.id + ' - ' + data.indexValue,
                value: data.value,
                enableChip: true,
                color: color,
                theme: theme,
                format: tooltipFormat,
                renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _extends({ color: color }, data)) : null
            })
        };
    }), pure);

    var BarItem$1 = enhance(BarItem);

    var BarPropTypes = _extends({
        // data
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        getIndex: PropTypes.func.isRequired, // computed
        keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,

        groupMode: PropTypes.oneOf(['stacked', 'grouped']).isRequired,
        layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
        reverse: PropTypes.bool.isRequired,

        minValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
        maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
        padding: PropTypes.number.isRequired,
        innerPadding: PropTypes.number.isRequired,

        // axes & grid
        axisTop: PropTypes.object,
        axisRight: PropTypes.object,
        axisBottom: PropTypes.object,
        axisLeft: PropTypes.object,
        enableGridX: PropTypes.bool.isRequired,
        enableGridY: PropTypes.bool.isRequired,
        gridXValues: PropTypes.arrayOf(PropTypes.number),
        gridYValues: PropTypes.arrayOf(PropTypes.number),

        // customization
        barComponent: PropTypes.func.isRequired,

        // labels
        enableLabel: PropTypes.bool.isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        getLabel: PropTypes.func.isRequired, // computed
        labelSkipWidth: PropTypes.number.isRequired,
        labelSkipHeight: PropTypes.number.isRequired,
        labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        getLabelTextColor: PropTypes.func.isRequired, // computed
        labelLinkColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        getLabelLinkColor: PropTypes.func.isRequired, // computed

        // styling
        borderRadius: PropTypes.number.isRequired,
        getColor: PropTypes.func.isRequired }, core.defsPropTypes, {
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.any.isRequired,
        getBorderColor: PropTypes.func.isRequired,

        // interactivity
        isInteractive: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        tooltip: PropTypes.func,

        legends: PropTypes.arrayOf(PropTypes.shape(_extends({
            dataFrom: PropTypes.oneOf(['indexes', 'keys']).isRequired
        }, legends.LegendPropShape))).isRequired,

        // canvas specific
        pixelRatio: PropTypes.number.isRequired
    });

    var BarDefaultProps = {
        indexBy: 'id',
        keys: ['value'],

        groupMode: 'stacked',
        layout: 'vertical',
        reverse: false,

        minValue: 'auto',
        maxValue: 'auto',
        padding: 0.1,
        innerPadding: 0,

        // axes & grid
        axisBottom: {},
        axisLeft: {},
        enableGridX: false,
        enableGridY: true,

        // customization
        barComponent: BarItem$1,

        // labels
        enableLabel: true,
        label: 'value',
        labelSkipWidth: 0,
        labelSkipHeight: 0,
        labelLinkColor: 'theme',
        labelTextColor: 'theme',

        defs: [],
        fill: [],
        borderRadius: 0,
        borderWidth: 0,
        borderColor: 'inherit',

        // interactivity
        isInteractive: true,
        onClick: core.noop,

        legends: [],

        // canvas specific
        pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
    };

    var enhance$1 = (function (Component) {
        return compose(defaultProps(BarDefaultProps), core.withTheme(), core.withColors(), core.withDimensions(), core.withMotion(), withPropsOnChange(['indexBy'], function (_ref) {
            var indexBy = _ref.indexBy;
            return {
                getIndex: core.getAccessorFor(indexBy)
            };
        }), withPropsOnChange(['labelTextColor'], function (_ref2) {
            var labelTextColor = _ref2.labelTextColor;
            return {
                getLabelTextColor: core.getInheritedColorGenerator(labelTextColor, 'axis.ticks.text.fill')
            };
        }), withPropsOnChange(['labelLinkColor'], function (_ref3) {
            var labelLinkColor = _ref3.labelLinkColor;
            return {
                getLabelLinkColor: core.getInheritedColorGenerator(labelLinkColor, 'axis.ticks.line.stroke')
            };
        }), withPropsOnChange(['label', 'labelFormat'], function (_ref4) {
            var label = _ref4.label,
                labelFormat = _ref4.labelFormat;
            return {
                getLabel: core.getLabelGenerator(label, labelFormat)
            };
        }), withPropsOnChange(['borderColor'], function (_ref5) {
            var borderColor = _ref5.borderColor;
            return {
                getBorderColor: core.getInheritedColorGenerator(borderColor)
            };
        }), pure)(Component);
    });

    var barWillEnterHorizontal = function barWillEnterHorizontal(_ref) {
        var style = _ref.style;
        return {
            x: style.x.val,
            y: style.y.val,
            width: 0,
            height: style.height.val
        };
    };

    var barWillEnterVertical = function barWillEnterVertical(_ref2) {
        var style = _ref2.style;
        return {
            x: style.x.val,
            y: style.y.val + style.height.val,
            width: style.width.val,
            height: 0
        };
    };

    var barWillLeaveHorizontal = function barWillLeaveHorizontal(springConfig) {
        return function (_ref3) {
            var style = _ref3.style;
            return {
                x: style.x,
                y: style.y,
                width: reactMotion.spring(0, springConfig),
                height: style.height
            };
        };
    };

    var barWillLeaveVertical = function barWillLeaveVertical(springConfig) {
        return function (_ref4) {
            var style = _ref4.style;
            return {
                x: style.x,
                y: reactMotion.spring(style.y.val + style.height.val, springConfig),
                width: style.width,
                height: reactMotion.spring(0, springConfig)
            };
        };
    };

    var Bar = function Bar(_ref5) {
        var data = _ref5.data,
            getIndex = _ref5.getIndex,
            keys = _ref5.keys,
            groupMode = _ref5.groupMode,
            layout = _ref5.layout,
            reverse = _ref5.reverse,
            minValue = _ref5.minValue,
            maxValue = _ref5.maxValue,
            margin = _ref5.margin,
            width = _ref5.width,
            height = _ref5.height,
            outerWidth = _ref5.outerWidth,
            outerHeight = _ref5.outerHeight,
            padding = _ref5.padding,
            innerPadding = _ref5.innerPadding,
            axisTop = _ref5.axisTop,
            axisRight = _ref5.axisRight,
            axisBottom = _ref5.axisBottom,
            axisLeft = _ref5.axisLeft,
            enableGridX = _ref5.enableGridX,
            enableGridY = _ref5.enableGridY,
            gridXValues = _ref5.gridXValues,
            gridYValues = _ref5.gridYValues,
            barComponent = _ref5.barComponent,
            enableLabel = _ref5.enableLabel,
            getLabel = _ref5.getLabel,
            labelSkipWidth = _ref5.labelSkipWidth,
            labelSkipHeight = _ref5.labelSkipHeight,
            getLabelTextColor = _ref5.getLabelTextColor,
            markers = _ref5.markers,
            theme = _ref5.theme,
            getColor = _ref5.getColor,
            defs = _ref5.defs,
            fill = _ref5.fill,
            borderRadius = _ref5.borderRadius,
            borderWidth = _ref5.borderWidth,
            getBorderColor = _ref5.getBorderColor,
            animate = _ref5.animate,
            motionStiffness = _ref5.motionStiffness,
            motionDamping = _ref5.motionDamping,
            isInteractive = _ref5.isInteractive,
            tooltipFormat = _ref5.tooltipFormat,
            tooltip = _ref5.tooltip,
            onClick = _ref5.onClick,
            legends$$1 = _ref5.legends;

        var options = {
            layout: layout,
            reverse: reverse,
            data: data,
            getIndex: getIndex,
            keys: keys,
            minValue: minValue,
            maxValue: maxValue,
            width: width,
            height: height,
            getColor: getColor,
            padding: padding,
            innerPadding: innerPadding
        };
        var result = groupMode === 'grouped' ? generateGroupedBars(options) : generateStackedBars(options);

        var motionProps = {
            animate: animate,
            motionDamping: motionDamping,
            motionStiffness: motionStiffness
        };

        var springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness
        };

        var willEnter = layout === 'vertical' ? barWillEnterVertical : barWillEnterHorizontal;
        var willLeave = layout === 'vertical' ? barWillLeaveVertical(springConfig) : barWillLeaveHorizontal(springConfig);

        var shouldRenderLabel = function shouldRenderLabel(_ref6) {
            var width = _ref6.width,
                height = _ref6.height;

            if (!enableLabel) return false;
            if (labelSkipWidth > 0 && width < labelSkipWidth) return false;
            if (labelSkipHeight > 0 && height < labelSkipHeight) return false;
            return true;
        };

        var boundDefs = core.bindDefs(defs, result.bars, fill, {
            dataKey: 'data',
            targetKey: 'data.fill'
        });

        var legendDataForKeys = result.bars.filter(function (bar) {
            return bar.data.index === 0;
        }).map(function (bar) {
            return {
                id: bar.data.id,
                label: bar.data.id,
                color: bar.color,
                fill: bar.data.fill
            };
        }).reverse();

        var legendDataForIndexes = result.bars.filter(function (bar) {
            return bar.data.id === keys[0];
        }).map(function (bar) {
            return {
                id: bar.data.indexValue,
                label: bar.data.indexValue,
                color: bar.color,
                fill: bar.data.fill
            };
        });

        return React__default.createElement(
            core.Container,
            { isInteractive: isInteractive, theme: theme },
            function (_ref7) {
                var showTooltip = _ref7.showTooltip,
                    hideTooltip = _ref7.hideTooltip;

                var commonProps = {
                    borderRadius: borderRadius,
                    borderWidth: borderWidth,
                    enableLabel: enableLabel,
                    labelSkipWidth: labelSkipWidth,
                    labelSkipHeight: labelSkipHeight,
                    showTooltip: showTooltip,
                    hideTooltip: hideTooltip,
                    onClick: onClick,
                    theme: theme,
                    tooltipFormat: tooltipFormat,
                    tooltip: tooltip
                };

                var bars = void 0;
                if (animate === true) {
                    bars = React__default.createElement(
                        reactMotion.TransitionMotion,
                        {
                            willEnter: willEnter,
                            willLeave: willLeave,
                            styles: result.bars.map(function (bar) {
                                return {
                                    key: bar.key,
                                    data: bar,
                                    style: {
                                        x: reactMotion.spring(bar.x, springConfig),
                                        y: reactMotion.spring(bar.y, springConfig),
                                        width: reactMotion.spring(bar.width, springConfig),
                                        height: reactMotion.spring(bar.height, springConfig)
                                    }
                                };
                            })
                        },
                        function (interpolatedStyles) {
                            return React__default.createElement(
                                'g',
                                null,
                                interpolatedStyles.map(function (_ref8) {
                                    var key = _ref8.key,
                                        style = _ref8.style,
                                        bar = _ref8.data;

                                    var baseProps = _extends({}, bar, style);

                                    return React__default.createElement(barComponent, _extends({
                                        key: key
                                    }, baseProps, commonProps, {
                                        shouldRenderLabel: shouldRenderLabel(baseProps),
                                        width: Math.max(style.width, 0),
                                        height: Math.max(style.height, 0),
                                        label: getLabel(bar.data),
                                        labelColor: getLabelTextColor(baseProps, theme),
                                        borderColor: getBorderColor(baseProps),
                                        theme: theme
                                    }));
                                })
                            );
                        }
                    );
                } else {
                    bars = result.bars.map(function (d) {
                        return React__default.createElement(barComponent, _extends({
                            key: d.key
                        }, d, commonProps, {
                            label: getLabel(d.data),
                            shouldRenderLabel: shouldRenderLabel(d),
                            labelColor: getLabelTextColor(d, theme),
                            borderColor: getBorderColor(d),
                            theme: theme
                        }));
                    });
                }

                return React__default.createElement(
                    core.SvgWrapper,
                    {
                        width: outerWidth,
                        height: outerHeight,
                        margin: margin,
                        defs: boundDefs,
                        theme: theme
                    },
                    React__default.createElement(core.Grid, _extends({
                        theme: theme,
                        width: width,
                        height: height,
                        xScale: enableGridX ? result.xScale : null,
                        yScale: enableGridY ? result.yScale : null,
                        xValues: gridXValues,
                        yValues: gridYValues
                    }, motionProps)),
                    React__default.createElement(core.Axes, _extends({
                        xScale: result.xScale,
                        yScale: result.yScale,
                        width: width,
                        height: height,
                        theme: theme,
                        top: axisTop,
                        right: axisRight,
                        bottom: axisBottom,
                        left: axisLeft
                    }, motionProps)),
                    bars,
                    React__default.createElement(core.CartesianMarkers, {
                        markers: markers,
                        width: width,
                        height: height,
                        xScale: result.xScale,
                        yScale: result.yScale,
                        theme: theme
                    }),
                    legends$$1.map(function (legend, i) {
                        var legendData = void 0;
                        if (legend.dataFrom === 'keys') {
                            legendData = legendDataForKeys;
                        } else if (legend.dataFrom === 'indexes') {
                            legendData = legendDataForIndexes;
                        }

                        if (legendData === undefined) return null;

                        return React__default.createElement(legends.BoxLegendSvg, _extends({
                            key: i
                        }, legend, {
                            containerWidth: width,
                            containerHeight: height,
                            data: legendData,
                            theme: theme
                        }));
                    })
                );
            }
        );
    };

    Bar.propTypes = BarPropTypes;

    var Bar$1 = setDisplayName('Bar')(enhance$1(Bar));

    var findNodeUnderCursor = function findNodeUnderCursor(nodes, margin, x, y) {
        return nodes.find(function (node) {
            return core.isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y);
        });
    };

    var BarCanvas = function (_Component) {
        inherits(BarCanvas, _Component);

        function BarCanvas() {
            var _temp, _this, _ret;

            classCallCheck(this, BarCanvas);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleMouseHover = function (showTooltip, hideTooltip) {
                return function (event) {
                    if (!_this.bars) return;

                    var _this$props = _this.props,
                        margin = _this$props.margin,
                        theme = _this$props.theme,
                        tooltip = _this$props.tooltip;

                    var _getRelativeCursor = core.getRelativeCursor(_this.surface, event),
                        x = _getRelativeCursor[0],
                        y = _getRelativeCursor[1];

                    var bar = findNodeUnderCursor(_this.bars, margin, x, y);

                    if (bar !== undefined) {
                        showTooltip(React__default.createElement(core.BasicTooltip, {
                            id: bar.data.id + ' - ' + bar.data.indexValue,
                            value: bar.data.value,
                            enableChip: true,
                            color: bar.color,
                            theme: theme,
                            renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _extends({ color: bar.color }, bar.data)) : null
                        }), event);
                    } else {
                        hideTooltip();
                    }
                };
            }, _this.handleMouseLeave = function (hideTooltip) {
                return function () {
                    hideTooltip();
                };
            }, _this.handleClick = function (event) {
                if (!_this.bars) return;

                var _this$props2 = _this.props,
                    margin = _this$props2.margin,
                    onClick = _this$props2.onClick;

                var _getRelativeCursor2 = core.getRelativeCursor(_this.surface, event),
                    x = _getRelativeCursor2[0],
                    y = _getRelativeCursor2[1];

                var node = findNodeUnderCursor(_this.bars, margin, x, y);
                if (node !== undefined) onClick(node.data, event);
            }, _temp), possibleConstructorReturn(_this, _ret);
        }

        BarCanvas.prototype.componentDidMount = function componentDidMount() {
            this.ctx = this.surface.getContext('2d');
            this.draw(this.props);
        };

        BarCanvas.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
            if (this.props.outerWidth !== props.outerWidth || this.props.outerHeight !== props.outerHeight || this.props.isInteractive !== props.isInteractive || this.props.theme !== props.theme) {
                return true;
            } else {
                this.draw(props);
                return false;
            }
        };

        BarCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
            this.ctx = this.surface.getContext('2d');
            this.draw(this.props);
        };

        BarCanvas.prototype.draw = function draw(props) {
            var _this2 = this;

            var data = props.data,
                keys = props.keys,
                getIndex = props.getIndex,
                minValue = props.minValue,
                maxValue = props.maxValue,
                width = props.width,
                height = props.height,
                outerWidth = props.outerWidth,
                outerHeight = props.outerHeight,
                pixelRatio = props.pixelRatio,
                margin = props.margin,
                layout = props.layout,
                reverse = props.reverse,
                groupMode = props.groupMode,
                padding = props.padding,
                innerPadding = props.innerPadding,
                axisTop = props.axisTop,
                axisRight = props.axisRight,
                axisBottom = props.axisBottom,
                axisLeft = props.axisLeft,
                theme = props.theme,
                getColor = props.getColor;


            this.surface.width = outerWidth * pixelRatio;
            this.surface.height = outerHeight * pixelRatio;

            this.ctx.scale(pixelRatio, pixelRatio);

            var options = {
                layout: layout,
                reverse: reverse,
                data: data,
                getIndex: getIndex,
                keys: keys,
                minValue: minValue,
                maxValue: maxValue,
                width: width,
                height: height,
                getColor: getColor,
                padding: padding,
                innerPadding: innerPadding
            };

            var result = groupMode === 'grouped' ? generateGroupedBars(options) : generateStackedBars(options);

            this.bars = result.bars;

            this.ctx.fillStyle = theme.background;
            this.ctx.fillRect(0, 0, outerWidth, outerHeight);
            this.ctx.translate(margin.left, margin.top);

            core.renderAxesToCanvas(this.ctx, {
                xScale: result.xScale,
                yScale: result.yScale,
                width: width,
                height: height,
                top: axisTop,
                right: axisRight,
                bottom: axisBottom,
                left: axisLeft,
                theme: theme
            });

            result.bars.forEach(function (_ref) {
                var x = _ref.x,
                    y = _ref.y,
                    color = _ref.color,
                    width = _ref.width,
                    height = _ref.height;

                _this2.ctx.fillStyle = color;
                _this2.ctx.fillRect(x, y, width, height);
            });
        };

        BarCanvas.prototype.render = function render() {
            var _this3 = this;

            var _props = this.props,
                outerWidth = _props.outerWidth,
                outerHeight = _props.outerHeight,
                pixelRatio = _props.pixelRatio,
                isInteractive = _props.isInteractive,
                theme = _props.theme;


            return React__default.createElement(
                core.Container,
                { isInteractive: isInteractive, theme: theme },
                function (_ref2) {
                    var showTooltip = _ref2.showTooltip,
                        hideTooltip = _ref2.hideTooltip;
                    return React__default.createElement('canvas', {
                        ref: function ref(surface) {
                            _this3.surface = surface;
                        },
                        width: outerWidth * pixelRatio,
                        height: outerHeight * pixelRatio,
                        style: {
                            width: outerWidth,
                            height: outerHeight
                        },
                        onMouseEnter: _this3.handleMouseHover(showTooltip, hideTooltip),
                        onMouseMove: _this3.handleMouseHover(showTooltip, hideTooltip),
                        onMouseLeave: _this3.handleMouseLeave(hideTooltip),
                        onClick: _this3.handleClick
                    });
                }
            );
        };

        return BarCanvas;
    }(React.Component);

    BarCanvas.propTypes = BarPropTypes;

    var BarCanvas$1 = setDisplayName('BarCanvas')(enhance$1(BarCanvas));

    var ResponsiveBar = function ResponsiveBar(props) {
        return React__default.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React__default.createElement(Bar$1, _extends({ width: width, height: height }, props));
            }
        );
    };

    var ResponsiveBarCanvas = function ResponsiveBarCanvas(props) {
        return React__default.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React__default.createElement(BarCanvas$1, _extends({ width: width, height: height }, props));
            }
        );
    };

    exports.Bar = Bar$1;
    exports.BarCanvas = BarCanvas$1;
    exports.ResponsiveBar = ResponsiveBar;
    exports.ResponsiveBarCanvas = ResponsiveBarCanvas;
    exports.BarPropTypes = BarPropTypes;
    exports.BarDefaultProps = BarDefaultProps;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
