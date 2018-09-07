(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prop-types'), require('@nivo/legends'), require('d3-scale'), require('lodash/minBy'), require('lodash/maxBy'), require('recompose/compose'), require('recompose/defaultProps'), require('recompose/withPropsOnChange'), require('recompose/pure'), require('@nivo/core'), require('react'), require('react-motion'), require('recompose/setDisplayName')) :
    typeof define === 'function' && define.amd ? define(['exports', 'prop-types', '@nivo/legends', 'd3-scale', 'lodash/minBy', 'lodash/maxBy', 'recompose/compose', 'recompose/defaultProps', 'recompose/withPropsOnChange', 'recompose/pure', '@nivo/core', 'react', 'react-motion', 'recompose/setDisplayName'], factory) :
    (factory((global.nivo = global.nivo || {}),global.PropTypes,global.nivo,global.d3,global['lodash/minBy'],global['lodash/maxBy'],global.RecomposeCompose,global.RecomposeDefaultProps,global.RecomposeWithPropsOnChange,global.RecomposePure,global.nivo,global.React,global.ReactMotion,global.RecomposeSetDisplayName));
}(this, (function (exports,PropTypes,legends,d3Scale,minBy,maxBy,compose,defaultProps,withPropsOnChange,pure,core,React,reactMotion,setDisplayName) { 'use strict';

    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
    minBy = minBy && minBy.hasOwnProperty('default') ? minBy['default'] : minBy;
    maxBy = maxBy && maxBy.hasOwnProperty('default') ? maxBy['default'] : maxBy;
    compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
    defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
    withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
    pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
    var React__default = 'default' in React ? React['default'] : React;
    setDisplayName = setDisplayName && setDisplayName.hasOwnProperty('default') ? setDisplayName['default'] : setDisplayName;

    var ScatterPlotPropTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired
            })).isRequired
        })).isRequired,

        scales: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            domain: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])])).isRequired
        })).isRequired,

        xScale: PropTypes.func.isRequired, // computed
        yScale: PropTypes.func.isRequired, // computed

        // axes & grid
        axisTop: PropTypes.object,
        axisRight: PropTypes.object,
        axisBottom: PropTypes.object,
        axisLeft: PropTypes.object,
        enableGridX: PropTypes.bool.isRequired,
        enableGridY: PropTypes.bool.isRequired,

        // symbols
        symbolSize: PropTypes.oneOfType([PropTypes.func, PropTypes.number]).isRequired,
        symbolShape: PropTypes.oneOfType([PropTypes.oneOf(['circle', 'square'])]).isRequired,

        // styling
        getColor: PropTypes.func.isRequired,

        // interactivity
        isInteractive: PropTypes.bool.isRequired,
        tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

        legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired,

        // canvas specific
        pixelRatio: PropTypes.number.isRequired
    };

    var ScatterPlotDefaultProps = {
        scales: [{ id: 'x', axis: 'x', domain: [0, 'auto'] }, { id: 'y', axis: 'y', domain: [0, 'auto'] }],

        // axes & grid
        axisBottom: {},
        axisLeft: {},
        enableGridX: true,
        enableGridY: true,

        // symbols
        symbolSize: 6,
        symbolShape: 'circle',

        // styling
        colors: 'nivo',
        colorBy: 'id',

        // interactivity
        isInteractive: true,
        enableStackTooltip: true,

        legends: [],

        // canvas specific
        pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
    };

    var computeScales = function computeScales(_ref) {
        var data = _ref.data,
            width = _ref.width,
            height = _ref.height,
            _scales = _ref.scales;

        var scales = _scales.map(function (scaleConfig) {
            var id = scaleConfig.id,
                axis = scaleConfig.axis,
                _scaleConfig$domain = scaleConfig.domain,
                min = _scaleConfig$domain[0],
                max = _scaleConfig$domain[1];


            var minValue = min;
            var maxValue = max;

            data.forEach(function (serie) {
                if (min === 'auto') {
                    if (minValue === 'auto') minValue = minBy(serie.data, axis)[axis];else minValue = Math.min(minBy(serie.data, axis)[axis], minValue);
                }
                if (max === 'auto') {
                    if (maxValue === 'auto') maxValue = maxBy(serie.data, axis)[axis];else maxValue = Math.max(maxBy(serie.data, axis)[axis], maxValue);
                }
            });

            var scale = d3Scale.scaleLinear().domain([minValue, maxValue]);

            // add `id` property to able to target this scale later
            scale.id = id;

            if (axis === 'x') scale.range([0, width]);else scale.range([height, 0]);

            return scale;
        });

        return {
            xScale: scales.find(function (s) {
                return s.id === 'x';
            }),
            yScale: scales.find(function (s) {
                return s.id === 'y';
            })
        };
    };

    var enhance = (function (Component) {
        return compose(defaultProps(ScatterPlotDefaultProps), core.withTheme(), core.withColors(), core.withDimensions(), core.withMotion(), withPropsOnChange(['symbolSize'], function (_ref2) {
            var symbolSize = _ref2.symbolSize;
            return {
                getSymbolSize: core.getAccessorOrValue(symbolSize)
            };
        }), withPropsOnChange(['data', 'width', 'height', 'scales'], computeScales), pure)(Component);
    });

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

    var ScatterPlotItem = function ScatterPlotItem(_ref) {
        var data = _ref.data,
            x = _ref.x,
            y = _ref.y,
            size = _ref.size,
            color = _ref.color,
            showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip,
            onClick = _ref.onClick,
            tooltip = _ref.tooltip;

        var handleTooltip = function handleTooltip(e) {
            return showTooltip(tooltip, e);
        };

        return React__default.createElement('circle', {
            cx: x,
            cy: y,
            r: size / 2,
            fill: color,
            onMouseEnter: handleTooltip,
            onMouseMove: handleTooltip,
            onMouseLeave: hideTooltip,
            onClick: onClick
        });
    };

    ScatterPlotItem.propTypes = {
        data: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            serie: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
        }).isRequired,

        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,

        tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
        onClick: PropTypes.func,
        tooltip: PropTypes.element.isRequired,

        theme: PropTypes.shape({
            tooltip: PropTypes.shape({}).isRequired
        }).isRequired
    };

    var enhance$1 = compose(withPropsOnChange(['data', 'onClick'], function (_ref2) {
        var data = _ref2.data,
            _onClick = _ref2.onClick;
        return {
            onClick: function onClick(event) {
                return _onClick(data, event);
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
                id: data.serie,
                value: 'x: ' + data.x + ', y: ' + data.y,
                enableChip: true,
                color: color,
                theme: theme,
                format: tooltipFormat,
                renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _extends({ color: color }, data)) : null
            })
        };
    }), pure);

    var ScatterPlotItem$1 = enhance$1(ScatterPlotItem);

    var ScatterPlot = function ScatterPlot(_ref) {
        var data = _ref.data,
            xScale = _ref.xScale,
            yScale = _ref.yScale,
            margin = _ref.margin,
            width = _ref.width,
            height = _ref.height,
            outerWidth = _ref.outerWidth,
            outerHeight = _ref.outerHeight,
            axisTop = _ref.axisTop,
            axisRight = _ref.axisRight,
            axisBottom = _ref.axisBottom,
            axisLeft = _ref.axisLeft,
            enableGridX = _ref.enableGridX,
            enableGridY = _ref.enableGridY,
            theme = _ref.theme,
            getColor = _ref.getColor,
            getSymbolSize = _ref.getSymbolSize,
            animate = _ref.animate,
            motionStiffness = _ref.motionStiffness,
            motionDamping = _ref.motionDamping,
            isInteractive = _ref.isInteractive,
            tooltipFormat = _ref.tooltipFormat,
            tooltip = _ref.tooltip,
            onClick = _ref.onClick,
            legends$$1 = _ref.legends;

        var motionProps = {
            animate: animate,
            motionDamping: motionDamping,
            motionStiffness: motionStiffness
        };

        var springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness
        };

        var legendData = data.map(function (serie) {
            return {
                id: serie.id,
                label: serie.id,
                color: getColor(serie)
            };
        });

        var symbols = data.reduce(function (agg, serie) {
            return [].concat(agg, serie.data.map(function (d) {
                return {
                    id: serie.id + '.' + d.id,
                    x: xScale(d.x),
                    y: yScale(d.y),
                    color: getColor(serie),
                    data: _extends({}, d, { serie: serie.id })
                };
            }));
        }, []);

        return React__default.createElement(
            core.Container,
            { isInteractive: isInteractive, theme: theme },
            function (_ref2) {
                var showTooltip = _ref2.showTooltip,
                    hideTooltip = _ref2.hideTooltip;
                return React__default.createElement(
                    core.SvgWrapper,
                    { width: outerWidth, height: outerHeight, margin: margin, theme: theme },
                    React__default.createElement(core.Grid, _extends({
                        theme: theme,
                        width: width,
                        height: height,
                        xScale: enableGridX ? xScale : null,
                        yScale: enableGridY ? yScale : null
                    }, motionProps)),
                    React__default.createElement(core.Axes, _extends({
                        xScale: xScale,
                        yScale: yScale,
                        width: width,
                        height: height,
                        theme: theme,
                        top: axisTop,
                        right: axisRight,
                        bottom: axisBottom,
                        left: axisLeft
                    }, motionProps)),
                    !animate && symbols.map(function (symbol) {
                        return React__default.createElement(ScatterPlotItem$1, {
                            key: symbol.id,
                            x: symbol.x,
                            y: symbol.y,
                            size: getSymbolSize(symbol.data),
                            color: symbol.color,
                            data: symbol.data,
                            showTooltip: showTooltip,
                            hideTooltip: hideTooltip,
                            tooltipFormat: tooltipFormat,
                            tooltip: tooltip,
                            onClick: onClick,
                            theme: theme
                        });
                    }),
                    animate === true && React__default.createElement(
                        reactMotion.TransitionMotion,
                        {
                            styles: symbols.map(function (symbol) {
                                return {
                                    key: symbol.id,
                                    data: symbol,
                                    style: {
                                        x: reactMotion.spring(symbol.x, springConfig),
                                        y: reactMotion.spring(symbol.y, springConfig)
                                    }
                                };
                            })
                        },
                        function (interpolatedStyles) {
                            return React__default.createElement(
                                'g',
                                null,
                                interpolatedStyles.map(function (_ref3) {
                                    var key = _ref3.key,
                                        style = _ref3.style,
                                        symbol = _ref3.data;
                                    return React__default.createElement(ScatterPlotItem$1, {
                                        key: key,
                                        x: style.x,
                                        y: style.y,
                                        size: getSymbolSize(symbol.data),
                                        color: symbol.color,
                                        data: symbol.data,
                                        showTooltip: showTooltip,
                                        hideTooltip: hideTooltip,
                                        tooltipFormat: tooltipFormat,
                                        tooltip: tooltip,
                                        onClick: onClick,
                                        theme: theme
                                    });
                                })
                            );
                        }
                    ),
                    legends$$1.map(function (legend, i) {
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

    ScatterPlot.propTypes = ScatterPlotPropTypes;

    var ScatterPlot$1 = setDisplayName('ScatterPlot')(enhance(ScatterPlot));

    var ResponsiveScatterPlot = function ResponsiveScatterPlot(props) {
        return React__default.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React__default.createElement(ScatterPlot$1, _extends({ width: width, height: height }, props));
            }
        );
    };

    var findNodeUnderCursor = function findNodeUnderCursor(nodes, margin, x, y) {
        return nodes.find(function (node) {
            return core.isCursorInRect(node.x + margin.left - node.size / 2, node.y + margin.top - node.size / 2, node.size, node.size, x, y);
        });
    };

    var ScatterPlotCanvas = function (_Component) {
        inherits(ScatterPlotCanvas, _Component);

        function ScatterPlotCanvas() {
            var _temp, _this, _ret;

            classCallCheck(this, ScatterPlotCanvas);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleMouseHover = function (showTooltip, hideTooltip) {
                return function (event) {
                    if (!_this.items) return;

                    var _this$props = _this.props,
                        margin = _this$props.margin,
                        theme = _this$props.theme;

                    var _getRelativeCursor = core.getRelativeCursor(_this.surface, event),
                        x = _getRelativeCursor[0],
                        y = _getRelativeCursor[1];

                    var item = findNodeUnderCursor(_this.items, margin, x, y);
                    if (item !== undefined) {
                        showTooltip(React__default.createElement(core.BasicTooltip, {
                            id: item.data.serie,
                            value: 'x: ' + item.data.x + ', y: ' + item.data.y,
                            enableChip: true,
                            color: item.color,
                            theme: theme
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
                if (!_this.items) return;

                var _this$props2 = _this.props,
                    margin = _this$props2.margin,
                    onClick = _this$props2.onClick;

                var _getRelativeCursor2 = core.getRelativeCursor(_this.surface, event),
                    x = _getRelativeCursor2[0],
                    y = _getRelativeCursor2[1];

                var item = findNodeUnderCursor(_this.items, margin, x, y);
                if (item !== undefined) onClick(item.data, event);
            }, _temp), possibleConstructorReturn(_this, _ret);
        }

        ScatterPlotCanvas.prototype.componentDidMount = function componentDidMount() {
            this.ctx = this.surface.getContext('2d');
            this.draw(this.props);
        };

        ScatterPlotCanvas.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
            if (this.props.outerWidth !== props.outerWidth || this.props.outerHeight !== props.outerHeight || this.props.isInteractive !== props.isInteractive || this.props.theme !== props.theme) {
                return true;
            } else {
                this.draw(props);
                return false;
            }
        };

        ScatterPlotCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
            this.ctx = this.surface.getContext('2d');
            this.draw(this.props);
        };

        ScatterPlotCanvas.prototype.draw = function draw(props) {
            var _this2 = this;

            var data = props.data,
                xScale = props.xScale,
                yScale = props.yScale,
                width = props.width,
                height = props.height,
                outerWidth = props.outerWidth,
                outerHeight = props.outerHeight,
                pixelRatio = props.pixelRatio,
                margin = props.margin,
                axisTop = props.axisTop,
                axisRight = props.axisRight,
                axisBottom = props.axisBottom,
                axisLeft = props.axisLeft,
                enableGridX = props.enableGridX,
                enableGridY = props.enableGridY,
                symbolSize = props.symbolSize,
                theme = props.theme,
                getColor = props.getColor,
                legends$$1 = props.legends;


            this.surface.width = outerWidth * pixelRatio;
            this.surface.height = outerHeight * pixelRatio;

            this.ctx.scale(pixelRatio, pixelRatio);

            this.ctx.fillStyle = theme.background;
            this.ctx.fillRect(0, 0, outerWidth, outerHeight);
            this.ctx.translate(margin.left, margin.top);

            this.ctx.strokeStyle = '#dddddd';
            enableGridX && core.renderGridLinesToCanvas(this.ctx, {
                width: width,
                height: height,
                scale: xScale,
                axis: 'x'
            });
            enableGridY && core.renderGridLinesToCanvas(this.ctx, {
                width: width,
                height: height,
                scale: yScale,
                axis: 'y'
            });

            this.ctx.strokeStyle = '#000000';
            core.renderAxesToCanvas(this.ctx, {
                xScale: xScale,
                yScale: yScale,
                width: width,
                height: height,
                top: axisTop,
                right: axisRight,
                bottom: axisBottom,
                left: axisLeft,
                theme: theme
            });

            var items = data.reduce(function (agg, serie) {
                return [].concat(agg, serie.data.map(function (d) {
                    return {
                        x: xScale(d.x),
                        y: yScale(d.y),
                        size: symbolSize,
                        color: getColor(serie),
                        data: _extends({}, d, { serie: serie.id })
                    };
                }));
            }, []);

            items.forEach(function (d) {
                _this2.ctx.fillStyle = d.color;
                _this2.ctx.fillRect(d.x - symbolSize / 2, d.y - symbolSize / 2, symbolSize, symbolSize);
            });

            this.items = items;

            var legendData = data.map(function (serie) {
                return {
                    id: serie.id,
                    label: serie.id,
                    color: getColor(serie)
                };
            });

            legends$$1.forEach(function (legend) {
                legends.renderLegendToCanvas(_this2.ctx, _extends({}, legend, {
                    data: legendData,
                    containerWidth: width,
                    containerHeight: height
                }));
            });
        };

        ScatterPlotCanvas.prototype.render = function render() {
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
                function (_ref) {
                    var showTooltip = _ref.showTooltip,
                        hideTooltip = _ref.hideTooltip;
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

        return ScatterPlotCanvas;
    }(React.Component);

    ScatterPlotCanvas.propTypes = ScatterPlotPropTypes;

    var ScatterPlotCanvas$1 = enhance(ScatterPlotCanvas);

    var ResponsiveScatterPlotCanvas = function ResponsiveScatterPlotCanvas(props) {
        return React__default.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React__default.createElement(ScatterPlotCanvas$1, _extends({ width: width, height: height }, props));
            }
        );
    };

    exports.ScatterPlot = ScatterPlot$1;
    exports.ResponsiveScatterPlot = ResponsiveScatterPlot;
    exports.ScatterPlotCanvas = ScatterPlotCanvas$1;
    exports.ResponsiveScatterPlotCanvas = ResponsiveScatterPlotCanvas;
    exports.ScatterPlotPropTypes = ScatterPlotPropTypes;
    exports.ScatterPlotDefaultProps = ScatterPlotDefaultProps;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
