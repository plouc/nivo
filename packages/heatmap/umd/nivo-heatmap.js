(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prop-types'), require('@nivo/core'), require('lodash/min'), require('lodash/max'), require('lodash/isEqual'), require('recompose/compose'), require('recompose/defaultProps'), require('recompose/withPropsOnChange'), require('recompose/withState'), require('recompose/pure'), require('d3-scale'), require('react'), require('lodash/partial'), require('react-motion'), require('recompose/setDisplayName')) :
    typeof define === 'function' && define.amd ? define(['exports', 'prop-types', '@nivo/core', 'lodash/min', 'lodash/max', 'lodash/isEqual', 'recompose/compose', 'recompose/defaultProps', 'recompose/withPropsOnChange', 'recompose/withState', 'recompose/pure', 'd3-scale', 'react', 'lodash/partial', 'react-motion', 'recompose/setDisplayName'], factory) :
    (factory((global.nivo = global.nivo || {}),global.PropTypes,global.nivo,global['lodash/min'],global['lodash/max'],global['lodash/isEqual'],global.RecomposeCompose,global.RecomposeDefaultProps,global.RecomposeWithPropsOnChange,global.RecomposeWithState,global.RecomposePure,global.d3,global.React,global['lodash/partial'],global.ReactMotion,global.RecomposeSetDisplayName));
}(this, (function (exports,PropTypes,core,min,max,isEqual,compose,defaultProps,withPropsOnChange,withState,pure,d3Scale,React,partial,reactMotion,setDisplayName) { 'use strict';

    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
    min = min && min.hasOwnProperty('default') ? min['default'] : min;
    max = max && max.hasOwnProperty('default') ? max['default'] : max;
    isEqual = isEqual && isEqual.hasOwnProperty('default') ? isEqual['default'] : isEqual;
    compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
    defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
    withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
    withState = withState && withState.hasOwnProperty('default') ? withState['default'] : withState;
    pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
    var React__default = 'default' in React ? React['default'] : React;
    partial = partial && partial.hasOwnProperty('default') ? partial['default'] : partial;
    setDisplayName = setDisplayName && setDisplayName.hasOwnProperty('default') ? setDisplayName['default'] : setDisplayName;

    var HeatMapPropTypes = {
        // data
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        getIndex: PropTypes.func.isRequired, // computed
        keys: PropTypes.arrayOf(PropTypes.string).isRequired,

        minValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
        maxValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,

        forceSquare: PropTypes.bool.isRequired,
        sizeVariation: PropTypes.number.isRequired,
        padding: PropTypes.number.isRequired,

        // cells
        cellShape: PropTypes.oneOfType([PropTypes.oneOf(['rect', 'circle']), PropTypes.func]).isRequired,
        cellOpacity: PropTypes.number.isRequired,
        cellBorderWidth: PropTypes.number.isRequired,
        cellBorderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        getCellBorderColor: PropTypes.func.isRequired, // computed

        // axes & grid
        axisTop: PropTypes.object,
        axisRight: PropTypes.object,
        axisBottom: PropTypes.object,
        axisLeft: PropTypes.object,
        enableGridX: PropTypes.bool.isRequired,
        enableGridY: PropTypes.bool.isRequired,

        // labels
        enableLabels: PropTypes.bool.isRequired,
        labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        getLabelTextColor: PropTypes.func.isRequired, // computed

        // theming
        colors: core.quantizeColorScalePropType.isRequired,
        colorScale: PropTypes.func.isRequired, // computed
        nanColor: PropTypes.string,

        // interactivity
        isInteractive: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        hoverTarget: PropTypes.oneOf(['cell', 'row', 'column', 'rowColumn']).isRequired,
        cellHoverOpacity: PropTypes.number.isRequired,
        cellHoverOthersOpacity: PropTypes.number.isRequired,
        tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        tooltip: PropTypes.func,

        // canvas specific
        pixelRatio: PropTypes.number.isRequired
    };

    var HeatMapDefaultProps = {
        indexBy: 'id',

        minValue: 'auto',
        maxValue: 'auto',

        forceSquare: false,
        sizeVariation: 0,
        padding: 0,

        // cells
        cellShape: 'rect',
        cellOpacity: 0.85,
        cellBorderWidth: 0,
        cellBorderColor: 'inherit',

        // axes & grid
        axisTop: {},
        axisLeft: {},
        enableGridX: false,
        enableGridY: false,

        // labels
        enableLabels: true,
        labelTextColor: 'inherit:darker(1.4)',

        // theming
        colors: 'nivo',
        nanColor: '#000000',

        // interactivity
        isInteractive: true,
        onClick: core.noop,
        hoverTarget: 'rowColumn',
        cellHoverOpacity: 1,
        cellHoverOthersOpacity: 0.35,

        // canvas specific
        pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
    };

    var isHoverTargetByType = {
        cell: function cell(node, current) {
            return node.xKey === current.xKey && node.yKey === current.yKey;
        },
        row: function row(node, current) {
            return node.yKey === current.yKey;
        },
        column: function column(node, current) {
            return node.xKey === current.xKey;
        },
        rowColumn: function rowColumn(node, current) {
            return node.xKey === current.xKey || node.yKey === current.yKey;
        }
    };

    var computeNodes = (function (_ref) {
        var data = _ref.data,
            keys = _ref.keys,
            getIndex = _ref.getIndex,
            xScale = _ref.xScale,
            yScale = _ref.yScale,
            sizeScale = _ref.sizeScale,
            cellOpacity = _ref.cellOpacity,
            cellWidth = _ref.cellWidth,
            cellHeight = _ref.cellHeight,
            colorScale = _ref.colorScale,
            nanColor = _ref.nanColor,
            getLabelTextColor = _ref.getLabelTextColor,
            currentNode = _ref.currentNode,
            hoverTarget = _ref.hoverTarget,
            cellHoverOpacity = _ref.cellHoverOpacity,
            cellHoverOthersOpacity = _ref.cellHoverOthersOpacity;

        var isHoverTarget = isHoverTargetByType[hoverTarget];

        return data.reduce(function (acc, d) {
            keys.forEach(function (key) {
                var width = sizeScale ? Math.min(sizeScale(d[key]) * cellWidth, cellWidth) : cellWidth;
                var height = sizeScale ? Math.min(sizeScale(d[key]) * cellHeight, cellHeight) : cellHeight;

                var node = {
                    key: key + "." + getIndex(d),
                    xKey: key,
                    yKey: getIndex(d),
                    x: xScale(key),
                    y: yScale(getIndex(d)),
                    width: width,
                    height: height,
                    value: d[key],
                    color: isNaN(d[key]) ? nanColor : colorScale(d[key])
                };

                var opacity = cellOpacity;
                if (currentNode) {
                    opacity = isHoverTarget(node, currentNode) ? cellHoverOpacity : cellHoverOthersOpacity;
                }

                acc.push(Object.assign(node, {
                    labelTextColor: getLabelTextColor(node),
                    opacity: opacity
                }));
            });

            return acc;
        }, []);
    });

    var computeX = function computeX(column, cellWidth, padding) {
        return column * cellWidth + cellWidth * 0.5 + padding * column + padding;
    };
    var computeY = function computeY(row, cellHeight, padding) {
        return row * cellHeight + cellHeight * 0.5 + padding * row + padding;
    };

    var enhance = (function (Component) {
        return compose(defaultProps(HeatMapDefaultProps), withState('currentNode', 'setCurrentNode', null), core.withTheme(), core.withDimensions(), core.withMotion(), withPropsOnChange(['colors'], function (_ref) {
            var colors = _ref.colors;
            return {
                colorScale: core.guessQuantizeColorScale(colors)
            };
        }), withPropsOnChange(['indexBy'], function (_ref2) {
            var indexBy = _ref2.indexBy;
            return {
                getIndex: core.getAccessorFor(indexBy)
            };
        }), withPropsOnChange(['data', 'keys', 'width', 'height', 'padding', 'forceSquare'], function (_ref3) {
            var data = _ref3.data,
                keys = _ref3.keys,
                width = _ref3.width,
                height = _ref3.height,
                padding = _ref3.padding,
                forceSquare = _ref3.forceSquare;

            var columns = keys.length;
            var rows = data.length;

            var cellWidth = Math.max((width - padding * (columns + 1)) / columns, 0);
            var cellHeight = Math.max((height - padding * (rows + 1)) / rows, 0);

            var offsetX = 0;
            var offsetY = 0;
            if (forceSquare === true) {
                var cellSize = Math.min(cellWidth, cellHeight);
                cellWidth = cellSize;
                cellHeight = cellSize;

                offsetX = (width - ((cellWidth + padding) * columns + padding)) / 2;
                offsetY = (height - ((cellHeight + padding) * rows + padding)) / 2;
            }

            return {
                cellWidth: cellWidth,
                cellHeight: cellHeight,
                offsetX: offsetX,
                offsetY: offsetY
            };
        }), withPropsOnChange(['data', 'getIndex'], function (_ref4) {
            var data = _ref4.data,
                getIndex = _ref4.getIndex;
            return {
                indices: data.map(getIndex)
            };
        }), withPropsOnChange(function (prev, next) {
            return prev.keys !== next.keys || prev.cellWidth !== next.cellWidth || prev.cellHeight !== next.cellHeight || prev.padding !== next.padding || !isEqual(prev.indices, next.indices);
        }, function (_ref5) {
            var indices = _ref5.indices,
                keys = _ref5.keys,
                cellWidth = _ref5.cellWidth,
                cellHeight = _ref5.cellHeight,
                padding = _ref5.padding;
            return {
                xScale: d3Scale.scaleOrdinal(keys.map(function (key, i) {
                    return computeX(i, cellWidth, padding);
                })).domain(keys),
                yScale: d3Scale.scaleOrdinal(indices.map(function (d, i) {
                    return computeY(i, cellHeight, padding);
                })).domain(indices)
            };
        }), withPropsOnChange(['data', 'keys', 'minValue', 'maxValue'], function (_ref6) {
            var data = _ref6.data,
                keys = _ref6.keys,
                _minValue = _ref6.minValue,
                _maxValue = _ref6.maxValue;

            var minValue = _minValue;
            var maxValue = _maxValue;
            if (minValue === 'auto' || maxValue === 'auto') {
                var allValues = data.reduce(function (acc, row) {
                    return acc.concat(keys.map(function (key) {
                        return row[key];
                    }));
                }, []);

                if (minValue === 'auto') minValue = min(allValues);
                if (maxValue === 'auto') maxValue = max(allValues);
            }

            return {
                minValue: Math.min(minValue, maxValue),
                maxValue: Math.max(maxValue, minValue)
            };
        }), withPropsOnChange(['colorScale', 'minValue', 'maxValue'], function (_ref7) {
            var colorScale = _ref7.colorScale,
                minValue = _ref7.minValue,
                maxValue = _ref7.maxValue;
            return {
                colorScale: colorScale.domain([minValue, maxValue])
            };
        }), withPropsOnChange(['sizeVariation', 'minValue', 'maxValue'], function (_ref8) {
            var sizeVariation = _ref8.sizeVariation,
                minValue = _ref8.minValue,
                maxValue = _ref8.maxValue;

            var sizeScale = void 0;
            if (sizeVariation > 0) {
                sizeScale = d3Scale.scaleLinear().range([1 - sizeVariation, 1]).domain([minValue, maxValue]);
            }

            return { sizeScale: sizeScale };
        }), withPropsOnChange(['cellBorderColor'], function (_ref9) {
            var cellBorderColor = _ref9.cellBorderColor;
            return {
                getCellBorderColor: core.getInheritedColorGenerator(cellBorderColor)
            };
        }), withPropsOnChange(['labelTextColor'], function (_ref10) {
            var labelTextColor = _ref10.labelTextColor;
            return {
                getLabelTextColor: core.getInheritedColorGenerator(labelTextColor)
            };
        }), pure)(Component);
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

    var style = { cursor: 'pointer' };

    var HeatMapCellRect = function HeatMapCellRect(_ref) {
        var data = _ref.data,
            value = _ref.value,
            x = _ref.x,
            y = _ref.y,
            width = _ref.width,
            height = _ref.height,
            color = _ref.color,
            opacity = _ref.opacity,
            borderWidth = _ref.borderWidth,
            borderColor = _ref.borderColor,
            textColor = _ref.textColor,
            onHover = _ref.onHover,
            onLeave = _ref.onLeave,
            _onClick = _ref.onClick,
            theme = _ref.theme;
        return React__default.createElement(
            'g',
            {
                transform: 'translate(' + x + ', ' + y + ')',
                onMouseEnter: onHover,
                onMouseMove: onHover,
                onMouseLeave: onLeave,
                onClick: function onClick(e) {
                    _onClick(data, e);
                },
                style: style
            },
            React__default.createElement('rect', {
                x: width * -0.5,
                y: height * -0.5,
                width: width,
                height: height,
                fill: color,
                fillOpacity: opacity,
                strokeWidth: borderWidth,
                stroke: borderColor,
                strokeOpacity: opacity
            }),
            React__default.createElement(
                'text',
                {
                    alignmentBaseline: 'central',
                    textAnchor: 'middle',
                    style: _extends({}, theme.labels.text, {
                        fill: textColor
                    }),
                    fillOpacity: opacity
                },
                value
            )
        );
    };

    HeatMapCellRect.propTypes = {
        data: PropTypes.object.isRequired,
        value: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        opacity: PropTypes.number.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        textColor: PropTypes.string.isRequired,
        onHover: PropTypes.func.isRequired,
        onLeave: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        theme: core.themePropType.isRequired
    };

    var HeatMapCellRect$1 = pure(HeatMapCellRect);

    var style$1 = { cursor: 'pointer' };

    var HeatMapCellCircle = function HeatMapCellCircle(_ref) {
        var data = _ref.data,
            value = _ref.value,
            x = _ref.x,
            y = _ref.y,
            width = _ref.width,
            height = _ref.height,
            color = _ref.color,
            opacity = _ref.opacity,
            borderWidth = _ref.borderWidth,
            borderColor = _ref.borderColor,
            textColor = _ref.textColor,
            onHover = _ref.onHover,
            onLeave = _ref.onLeave,
            _onClick = _ref.onClick,
            theme = _ref.theme;
        return React__default.createElement(
            'g',
            {
                transform: 'translate(' + x + ', ' + y + ')',
                style: style$1,
                onMouseEnter: onHover,
                onMouseMove: onHover,
                onMouseLeave: onLeave,
                onClick: function onClick(e) {
                    _onClick(data, e);
                }
            },
            React__default.createElement('circle', {
                r: Math.min(width, height) / 2,
                fill: color,
                fillOpacity: opacity,
                strokeWidth: borderWidth,
                stroke: borderColor,
                strokeOpacity: opacity
            }),
            React__default.createElement(
                'text',
                {
                    alignmentBaseline: 'central',
                    textAnchor: 'middle',
                    style: _extends({}, theme.labels, {
                        fill: textColor
                    }),
                    fillOpacity: opacity
                },
                value
            )
        );
    };

    HeatMapCellCircle.propTypes = {
        data: PropTypes.object.isRequired,
        value: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        opacity: PropTypes.number.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        textColor: PropTypes.string.isRequired,
        onHover: PropTypes.func.isRequired,
        onLeave: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        theme: core.themePropType.isRequired
    };

    var HeatMapCellCircle$1 = pure(HeatMapCellCircle);

    var HeatMapCellTooltip = function HeatMapCellTooltip(_ref) {
        var node = _ref.node,
            theme = _ref.theme,
            format = _ref.format,
            tooltip = _ref.tooltip;
        return React__default.createElement(core.BasicTooltip, {
            id: node.yKey + ' - ' + node.xKey,
            value: node.value,
            enableChip: true,
            color: node.color,
            theme: theme,
            format: format,
            renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _extends({}, node)) : null
        });
    };

    HeatMapCellTooltip.propTypes = {
        node: PropTypes.shape({
            xKey: PropTypes.string.isRequired,
            yKey: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired
        }).isRequired,
        format: PropTypes.func,
        tooltip: PropTypes.func,
        theme: PropTypes.shape({
            tooltip: PropTypes.shape({
                container: PropTypes.object.isRequired,
                basic: PropTypes.object.isRequired
            }).isRequired
        }).isRequired
    };

    var HeatMapCellTooltip$1 = pure(HeatMapCellTooltip);

    var HeatMap = function (_Component) {
        inherits(HeatMap, _Component);

        function HeatMap() {
            var _temp, _this, _ret;

            classCallCheck(this, HeatMap);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleNodeHover = function (showTooltip, node, event) {
                var _this$props = _this.props,
                    setCurrentNode = _this$props.setCurrentNode,
                    theme = _this$props.theme,
                    tooltipFormat = _this$props.tooltipFormat,
                    tooltip = _this$props.tooltip;

                setCurrentNode(node);
                showTooltip(React__default.createElement(HeatMapCellTooltip$1, {
                    node: node,
                    theme: theme,
                    format: tooltipFormat,
                    tooltip: tooltip
                }), event);
            }, _this.handleNodeLeave = function (hideTooltip) {
                _this.props.setCurrentNode(null);
                hideTooltip();
            }, _temp), possibleConstructorReturn(_this, _ret);
        }

        HeatMap.prototype.render = function render() {
            var _this2 = this;

            var _props = this.props,
                xScale = _props.xScale,
                yScale = _props.yScale,
                offsetX = _props.offsetX,
                offsetY = _props.offsetY,
                margin = _props.margin,
                width = _props.width,
                height = _props.height,
                outerWidth = _props.outerWidth,
                outerHeight = _props.outerHeight,
                cellShape = _props.cellShape,
                cellBorderWidth = _props.cellBorderWidth,
                getCellBorderColor = _props.getCellBorderColor,
                axisTop = _props.axisTop,
                axisRight = _props.axisRight,
                axisBottom = _props.axisBottom,
                axisLeft = _props.axisLeft,
                enableGridX = _props.enableGridX,
                enableGridY = _props.enableGridY,
                getLabelTextColor = _props.getLabelTextColor,
                theme = _props.theme,
                animate = _props.animate,
                motionStiffness = _props.motionStiffness,
                motionDamping = _props.motionDamping,
                boundSpring = _props.boundSpring,
                isInteractive = _props.isInteractive,
                onClick = _props.onClick;


            var Cell = void 0;
            if (cellShape === 'rect') {
                Cell = HeatMapCellRect$1;
            } else if (cellShape === 'circle') {
                Cell = HeatMapCellCircle$1;
            } else {
                Cell = cellShape;
            }

            var nodes = computeNodes(this.props);

            var motionProps = {
                animate: animate,
                motionDamping: motionDamping,
                motionStiffness: motionStiffness
            };

            return React__default.createElement(
                core.Container,
                { isInteractive: isInteractive, theme: theme },
                function (_ref) {
                    var showTooltip = _ref.showTooltip,
                        hideTooltip = _ref.hideTooltip;

                    var onHover = partial(_this2.handleNodeHover, showTooltip);
                    var onLeave = partial(_this2.handleNodeLeave, hideTooltip);

                    return React__default.createElement(
                        core.SvgWrapper,
                        {
                            width: outerWidth,
                            height: outerHeight,
                            margin: Object.assign({}, margin, {
                                top: margin.top + offsetY,
                                left: margin.left + offsetX
                            }),
                            theme: theme
                        },
                        React__default.createElement(core.Grid, _extends({
                            theme: theme,
                            width: width - offsetX * 2,
                            height: height - offsetY * 2,
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
                        !animate && nodes.map(function (node) {
                            return React__default.createElement(Cell, {
                                key: node.key,
                                data: node,
                                value: node.value,
                                x: node.x,
                                y: node.y,
                                width: node.width,
                                height: node.height,
                                color: node.color,
                                opacity: node.opacity,
                                borderWidth: cellBorderWidth,
                                borderColor: getCellBorderColor(node),
                                textColor: getLabelTextColor(node),
                                onHover: partial(onHover, node),
                                onLeave: onLeave,
                                onClick: onClick,
                                theme: theme
                            });
                        }),
                        animate === true && React__default.createElement(
                            reactMotion.TransitionMotion,
                            {
                                styles: nodes.map(function (node) {
                                    return {
                                        key: node.key,
                                        data: node,
                                        style: _extends({
                                            x: boundSpring(node.x),
                                            y: boundSpring(node.y),
                                            width: boundSpring(node.width),
                                            height: boundSpring(node.height),
                                            opacity: boundSpring(node.opacity)
                                        }, core.colorMotionSpring(node.color, {
                                            damping: motionDamping,
                                            stiffness: motionStiffness
                                        }))
                                    };
                                })
                            },
                            function (interpolatedStyles) {
                                return React__default.createElement(
                                    'g',
                                    null,
                                    interpolatedStyles.map(function (_ref2) {
                                        var key = _ref2.key,
                                            style = _ref2.style,
                                            node = _ref2.data;

                                        var color = core.getInterpolatedColor(style);

                                        return React__default.createElement(Cell, {
                                            key: key,
                                            data: node,
                                            value: node.value,
                                            x: style.x,
                                            y: style.y,
                                            width: Math.max(style.width, 0),
                                            height: Math.max(style.height, 0),
                                            color: color,
                                            opacity: style.opacity,
                                            borderWidth: cellBorderWidth,
                                            borderColor: getCellBorderColor(_extends({}, node, {
                                                color: color
                                            })),
                                            textColor: getLabelTextColor(_extends({}, node, {
                                                color: color
                                            })),
                                            onHover: partial(onHover, node),
                                            onLeave: onLeave,
                                            onClick: onClick,
                                            theme: theme
                                        });
                                    })
                                );
                            }
                        )
                    );
                }
            );
        };

        return HeatMap;
    }(React.Component);

    HeatMap.propTypes = HeatMapPropTypes;


    var HeatMap$1 = setDisplayName('HeatMap')(enhance(HeatMap));

    /**
     * Render heatmap rect cell.
     *
     * @param {Object} ctx
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string) color
     * @param {number} opacity
     * @param {string} labelTextColor
     * @param {number} value
     */
    var renderRect = function renderRect(ctx, _ref) {
        var x = _ref.x,
            y = _ref.y,
            width = _ref.width,
            height = _ref.height,
            color = _ref.color,
            opacity = _ref.opacity,
            labelTextColor = _ref.labelTextColor,
            value = _ref.value;

        ctx.save();
        ctx.globalAlpha = opacity;

        ctx.fillStyle = color;
        ctx.fillRect(x - width / 2, y - height / 2, width, height);

        ctx.fillStyle = labelTextColor;
        ctx.fillText(value, x, y);

        ctx.restore();
    };

    /**
     * Render heatmap circle cell.
     *
     * @param {Object} ctx
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string) color
     * @param {number} opacity
     * @param {string} labelTextColor
     * @param {number} value
     */
    var renderCircle = function renderCircle(ctx, _ref2) {
        var x = _ref2.x,
            y = _ref2.y,
            width = _ref2.width,
            height = _ref2.height,
            color = _ref2.color,
            opacity = _ref2.opacity,
            labelTextColor = _ref2.labelTextColor,
            value = _ref2.value;

        ctx.save();
        ctx.globalAlpha = opacity;

        var radius = Math.min(width, height) / 2;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = labelTextColor;
        ctx.fillText(value, x, y);

        ctx.restore();
    };

    var HeatMapCanvas = function (_Component) {
        inherits(HeatMapCanvas, _Component);

        function HeatMapCanvas() {
            var _temp, _this, _ret;

            classCallCheck(this, HeatMapCanvas);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleMouseHover = function (showTooltip, hideTooltip, event) {
                if (!_this.nodes) return;

                var _getRelativeCursor = core.getRelativeCursor(_this.surface, event),
                    x = _getRelativeCursor[0],
                    y = _getRelativeCursor[1];

                var _this$props = _this.props,
                    margin = _this$props.margin,
                    offsetX = _this$props.offsetX,
                    offsetY = _this$props.offsetY,
                    theme = _this$props.theme,
                    setCurrentNode = _this$props.setCurrentNode,
                    tooltip = _this$props.tooltip;

                var node = _this.nodes.find(function (node) {
                    return core.isCursorInRect(node.x + margin.left + offsetX - node.width / 2, node.y + margin.top + offsetY - node.height / 2, node.width, node.height, x, y);
                });

                if (node !== undefined) {
                    setCurrentNode(node);
                    showTooltip(React__default.createElement(HeatMapCellTooltip$1, { node: node, theme: theme, tooltip: tooltip }), event);
                } else {
                    setCurrentNode(null);
                    hideTooltip();
                }
            }, _this.handleMouseLeave = function (hideTooltip) {
                _this.props.setCurrentNode(null);
                hideTooltip();
            }, _this.handleClick = function (event) {
                if (!_this.props.currentNode) return;

                _this.props.onClick(_this.props.currentNode, event);
            }, _temp), possibleConstructorReturn(_this, _ret);
        }

        HeatMapCanvas.prototype.componentDidMount = function componentDidMount() {
            this.ctx = this.surface.getContext('2d');
            this.draw(this.props);
        };

        HeatMapCanvas.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
            if (this.props.outerWidth !== props.outerWidth || this.props.outerHeight !== props.outerHeight || this.props.isInteractive !== props.isInteractive || this.props.theme !== props.theme) {
                return true;
            } else {
                this.draw(props);
                return false;
            }
        };

        HeatMapCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
            this.ctx = this.surface.getContext('2d');
            this.draw(this.props);
        };

        HeatMapCanvas.prototype.draw = function draw(props) {
            var width = props.width,
                height = props.height,
                outerWidth = props.outerWidth,
                outerHeight = props.outerHeight,
                pixelRatio = props.pixelRatio,
                margin = props.margin,
                offsetX = props.offsetX,
                offsetY = props.offsetY,
                xScale = props.xScale,
                yScale = props.yScale,
                cellShape = props.cellShape,
                theme = props.theme;


            this.surface.width = outerWidth * pixelRatio;
            this.surface.height = outerHeight * pixelRatio;

            this.ctx.scale(pixelRatio, pixelRatio);

            var renderNode = void 0;
            if (cellShape === 'rect') {
                renderNode = partial(renderRect, this.ctx);
            } else {
                renderNode = partial(renderCircle, this.ctx);
            }

            var nodes = computeNodes(props);

            this.ctx.fillStyle = theme.background;
            this.ctx.fillRect(0, 0, outerWidth, outerHeight);
            this.ctx.translate(margin.left + offsetX, margin.top + offsetY);

            core.renderAxesToCanvas(this.ctx, {
                xScale: xScale,
                yScale: yScale,
                width: width - offsetX * 2,
                height: height - offsetY * 2,
                top: props.axisTop,
                right: props.axisRight,
                bottom: props.axisBottom,
                left: props.axisLeft,
                theme: theme
            });

            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            nodes.forEach(renderNode);

            this.nodes = nodes;
        };

        HeatMapCanvas.prototype.render = function render() {
            var _this2 = this;

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
                            _this2.surface = surface;
                        },
                        width: outerWidth * pixelRatio,
                        height: outerHeight * pixelRatio,
                        style: {
                            width: outerWidth,
                            height: outerHeight
                        },
                        onMouseEnter: partial(_this2.handleMouseHover, showTooltip, hideTooltip),
                        onMouseMove: partial(_this2.handleMouseHover, showTooltip, hideTooltip),
                        onMouseLeave: partial(_this2.handleMouseLeave, hideTooltip),
                        onClick: _this2.handleClick
                    });
                }
            );
        };

        return HeatMapCanvas;
    }(React.Component);

    HeatMapCanvas.propTypes = HeatMapPropTypes;

    var HeatMapCanvas$1 = enhance(HeatMapCanvas);

    var ResponsiveHeatMap = function ResponsiveHeatMap(props) {
        return React__default.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React__default.createElement(HeatMap$1, _extends({ width: width, height: height }, props));
            }
        );
    };

    var ResponsiveHeatMapCanvas = function ResponsiveHeatMapCanvas(props) {
        return React__default.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React__default.createElement(HeatMapCanvas$1, _extends({ width: width, height: height }, props));
            }
        );
    };

    exports.HeatMap = HeatMap$1;
    exports.HeatMapCanvas = HeatMapCanvas$1;
    exports.ResponsiveHeatMap = ResponsiveHeatMap;
    exports.ResponsiveHeatMapCanvas = ResponsiveHeatMapCanvas;
    exports.HeatMapPropTypes = HeatMapPropTypes;
    exports.HeatMapDefaultProps = HeatMapDefaultProps;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
