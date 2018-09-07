(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('recompose/pure'), require('@nivo/core'), require('@nivo/legends'), require('lodash/range'), require('recompose/compose'), require('recompose/defaultProps'), require('recompose/withPropsOnChange'), require('recompose/withState'), require('lodash/partial'), require('react-motion'), require('recompose/setDisplayName')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'recompose/pure', '@nivo/core', '@nivo/legends', 'lodash/range', 'recompose/compose', 'recompose/defaultProps', 'recompose/withPropsOnChange', 'recompose/withState', 'lodash/partial', 'react-motion', 'recompose/setDisplayName'], factory) :
    (factory((global.nivo = global.nivo || {}),global.React,global.PropTypes,global.RecomposePure,global.nivo,global.nivo,global['lodash/range'],global.RecomposeCompose,global.RecomposeDefaultProps,global.RecomposeWithPropsOnChange,global.RecomposeWithState,global['lodash/partial'],global.ReactMotion,global.RecomposeSetDisplayName));
}(this, (function (exports,React,PropTypes,pure,core,legends,range,compose,defaultProps,withPropsOnChange,withState,partial,reactMotion,setDisplayName) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;
    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
    pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
    range = range && range.hasOwnProperty('default') ? range['default'] : range;
    compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
    defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
    withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
    withState = withState && withState.hasOwnProperty('default') ? withState['default'] : withState;
    partial = partial && partial.hasOwnProperty('default') ? partial['default'] : partial;
    setDisplayName = setDisplayName && setDisplayName.hasOwnProperty('default') ? setDisplayName['default'] : setDisplayName;

    var WaffleCell = function WaffleCell(_ref) {
        var position = _ref.position,
            size = _ref.size,
            x = _ref.x,
            y = _ref.y,
            color = _ref.color,
            fill = _ref.fill,
            opacity = _ref.opacity,
            borderWidth = _ref.borderWidth,
            borderColor = _ref.borderColor,
            data = _ref.data,
            onHover = _ref.onHover,
            onLeave = _ref.onLeave,
            _onClick = _ref.onClick;
        return React__default.createElement('rect', {
            width: size,
            height: size,
            x: x,
            y: y,
            fill: fill || color,
            strokeWidth: borderWidth,
            stroke: borderColor,
            opacity: opacity,
            onMouseEnter: onHover,
            onMouseMove: onHover,
            onMouseLeave: onLeave,
            onClick: function onClick(event) {
                _onClick({ position: position, color: color, x: x, y: y, data: data }, event);
            }
        });
    };

    WaffleCell.propTypes = {
        position: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        fill: PropTypes.string,
        opacity: PropTypes.number.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        onHover: PropTypes.func.isRequired,
        onLeave: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired
    };
    WaffleCell.defaultProps = {
        data: {}
    };
    WaffleCell.displayName = 'WaffleCell';

    var WaffleCell$1 = pure(WaffleCell);

    var WaffleCellHtml = function WaffleCellHtml(_ref) {
        var position = _ref.position,
            size = _ref.size,
            x = _ref.x,
            y = _ref.y,
            color = _ref.color,
            opacity = _ref.opacity,
            borderWidth = _ref.borderWidth,
            borderColor = _ref.borderColor,
            data = _ref.data,
            onHover = _ref.onHover,
            onLeave = _ref.onLeave,
            _onClick = _ref.onClick;

        return React__default.createElement('div', {
            style: {
                position: 'absolute',
                top: y,
                left: x,
                width: size,
                height: size,
                background: color,
                opacity: opacity,
                boxSizing: 'content-box',
                borderStyle: 'solid',
                borderWidth: borderWidth + 'px',
                borderColor: borderColor
            },
            onMouseEnter: onHover,
            onMouseMove: onHover,
            onMouseLeave: onLeave,
            onClick: function onClick(event) {
                _onClick({ position: position, color: color, x: x, y: y, data: data }, event);
            }
        });
    };

    WaffleCellHtml.propTypes = {
        position: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        opacity: PropTypes.number.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        onHover: PropTypes.func.isRequired,
        onLeave: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired
    };
    WaffleCellHtml.defaultProps = {
        data: {}
    };
    WaffleCellHtml.displayName = 'WaffleCellHtml';

    var WaffleCellHtml$1 = pure(WaffleCellHtml);

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

    var commonPropTypes = {
        // data
        total: PropTypes.number.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            value: PropTypes.number.isRequired
        })).isRequired,
        hiddenIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,

        // layout
        rows: PropTypes.number.isRequired,
        columns: PropTypes.number.isRequired,
        fillDirection: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
        padding: PropTypes.number.isRequired,

        // styling
        emptyColor: PropTypes.string.isRequired,
        emptyOpacity: PropTypes.number.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.any.isRequired,
        getBorderColor: PropTypes.func.isRequired, // computed

        // interactivity
        isInteractive: PropTypes.bool,
        tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        tooltip: PropTypes.func,

        // computed
        cellSize: PropTypes.number.isRequired,
        cells: PropTypes.array.isRequired,
        origin: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        }).isRequired
    };

    var WafflePropTypes = _extends({}, commonPropTypes, {
        cellComponent: PropTypes.func.isRequired
    }, core.defsPropTypes, {
        legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired
    });

    var WaffleHtmlPropTypes = _extends({}, commonPropTypes, {
        cellComponent: PropTypes.func.isRequired
    });

    var WaffleCanvasPropTypes = _extends({}, commonPropTypes, {
        pixelRatio: PropTypes.number.isRequired,
        legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired
    });

    var commonDefaultProps = {
        hiddenIds: [],

        // layout
        fillDirection: 'bottom',
        padding: 1,

        // styling
        emptyColor: '#cccccc',
        emptyOpacity: 1,
        borderWidth: 0,
        borderColor: 'inherit:darker(1)',
        colors: 'nivo',
        defs: [],
        fill: [],

        // interactivity
        isInteractive: true,
        onClick: core.noop
    };

    var WaffleDefaultProps = _extends({}, commonDefaultProps, {
        cellComponent: WaffleCell$1,
        defs: [],
        fill: [],
        legends: []
    });

    var WaffleHtmlDefaultProps = _extends({}, commonDefaultProps, {
        cellComponent: WaffleCellHtml$1
    });

    var WaffleCanvasDefaultProps = _extends({}, commonDefaultProps, {
        legends: [],
        pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
    });

    var props = /*#__PURE__*/Object.freeze({
        WafflePropTypes: WafflePropTypes,
        WaffleHtmlPropTypes: WaffleHtmlPropTypes,
        WaffleCanvasPropTypes: WaffleCanvasPropTypes,
        WaffleDefaultProps: WaffleDefaultProps,
        WaffleHtmlDefaultProps: WaffleHtmlDefaultProps,
        WaffleCanvasDefaultProps: WaffleCanvasDefaultProps
    });

    /**
     * Computes optimal cell size according to dimensions/layout/padding.
     *
     * @param {number} width
     * @param {number} height
     * @param {number} rows
     * @param {number} columns
     * @param {number} padding
     *
     * @return {number}
     */
    var computeCellSize = function computeCellSize(width, height, rows, columns, padding) {
        var sizeX = (width - (columns - 1) * padding) / columns;
        var sizeY = (height - (rows - 1) * padding) / rows;

        return Math.min(sizeX, sizeY);
    };

    /**
     * Computes empty cells according to dimensions/layout/padding.
     *
     * @param {number}                        width
     * @param {number}                        height
     * @param {number}                        rows
     * @param {number}                        columns
     * @param {'top'|'right'|'bottom'|'left'} fillDirection
     * @param {number}                        padding
     *
     * @return {{ cells: Array, cellSize: number, origin: { x: number, y: number } } }
     */
    var computeGrid = function computeGrid(width, height, rows, columns, fillDirection, padding) {
        var cellSize = computeCellSize(width, height, rows, columns, padding);

        var cells = [];
        switch (fillDirection) {
            case 'top':
                range(rows).forEach(function (row) {
                    range(columns).forEach(function (column) {
                        cells.push({
                            position: row * columns + column,
                            row: row,
                            column: column,
                            x: column * (cellSize + padding),
                            y: row * (cellSize + padding)
                        });
                    });
                });
                break;

            case 'bottom':
                range(rows - 1, -1).forEach(function (row) {
                    range(columns).forEach(function (column) {
                        cells.push({
                            position: row * columns + column,
                            row: row,
                            column: column,
                            x: column * (cellSize + padding),
                            y: row * (cellSize + padding)
                        });
                    });
                });
                break;

            case 'left':
                range(columns).forEach(function (column) {
                    range(rows).forEach(function (row) {
                        cells.push({
                            position: row * columns + column,
                            row: row,
                            column: column,
                            x: column * (cellSize + padding),
                            y: row * (cellSize + padding)
                        });
                    });
                });
                break;

            case 'right':
                range(columns - 1, -1).forEach(function (column) {
                    range(rows - 1, -1).forEach(function (row) {
                        cells.push({
                            position: row * columns + column,
                            row: row,
                            column: column,
                            x: column * (cellSize + padding),
                            y: row * (cellSize + padding)
                        });
                    });
                });
                break;

            default:
                throw new Error('Invalid fill direction provided: ' + fillDirection);
        }

        var origin = {
            x: (width - (cellSize * columns + padding * (columns - 1))) / 2,
            y: (height - (cellSize * rows + padding * (rows - 1))) / 2
        };

        return { cells: cells, cellSize: cellSize, origin: origin };
    };

    var applyDataToGrid = function applyDataToGrid(_cells, data) {
        var cells = _cells.map(function (cell) {
            return _extends({}, cell);
        });

        data.forEach(function (datum) {
            range(datum.startAt, datum.endAt).forEach(function (position) {
                var cell = cells[position];
                if (cell !== undefined) {
                    cell.data = datum;
                    cell.groupIndex = datum.groupIndex;
                    cell.color = datum.color;
                }
            });
        });

        return cells;
    };

    var commonEnhancers = [core.withDimensions(), core.withColors({ defaultColorBy: 'id' }), core.withTheme(), core.withMotion(), withPropsOnChange(['borderColor'], function (_ref) {
        var borderColor = _ref.borderColor;
        return {
            getBorderColor: core.getInheritedColorGenerator(borderColor)
        };
    }), withState('currentCell', 'setCurrentCell', null), withPropsOnChange(['rows', 'columns', 'total'], function (_ref2) {
        var rows = _ref2.rows,
            columns = _ref2.columns,
            total = _ref2.total;
        return {
            unit: total / (rows * columns)
        };
    }), withPropsOnChange(['width', 'height', 'rows', 'columns', 'fillDirection', 'padding'], function (_ref3) {
        var width = _ref3.width,
            height = _ref3.height,
            rows = _ref3.rows,
            columns = _ref3.columns,
            fillDirection = _ref3.fillDirection,
            padding = _ref3.padding;

        return computeGrid(width, height, rows, columns, fillDirection, padding);
    }), withPropsOnChange(['data', 'unit', 'getColor', 'hiddenIds'], function (_ref4) {
        var data = _ref4.data,
            unit = _ref4.unit,
            getColor = _ref4.getColor,
            hiddenIds = _ref4.hiddenIds;

        var currentPosition = 0;

        return {
            computedData: data.map(function (datum, groupIndex) {
                if (!hiddenIds.includes(datum.id)) {
                    var enhancedDatum = _extends({}, datum, {
                        groupIndex: groupIndex,
                        startAt: currentPosition,
                        endAt: currentPosition + Math.round(datum.value / unit),
                        color: getColor(datum)
                    });

                    currentPosition = enhancedDatum.endAt;

                    return enhancedDatum;
                }

                return _extends({}, datum, {
                    groupIndex: groupIndex,
                    startAt: currentPosition,
                    endAt: currentPosition,
                    color: getColor(datum)
                });
            })
        };
    }), withPropsOnChange(['computedData'], function (_ref5) {
        var computedData = _ref5.computedData;
        return {
            legendData: computedData.map(function (datum) {
                return {
                    id: datum.id,
                    label: datum.id,
                    color: datum.color,
                    fill: datum.fill
                };
            })
        };
    })];

    var enhance = (function (Component) {
        var implDefaultProps = props[Component.displayName + 'DefaultProps'];

        switch (Component.displayName) {
            case 'Waffle':
                return compose.apply(undefined, [defaultProps(implDefaultProps)].concat(commonEnhancers, [core.withMotion(), withPropsOnChange(['computedData', 'defs', 'fill'], function (_ref6) {
                    var computedData = _ref6.computedData,
                        defs = _ref6.defs,
                        fill = _ref6.fill;
                    return {
                        defs: core.bindDefs(defs, computedData, fill, { targetKey: 'fill' })
                    };
                }), pure]))(Component);

            case 'WaffleHtml':
                return compose.apply(undefined, [defaultProps(implDefaultProps)].concat(commonEnhancers, [core.withMotion(), pure]))(Component);

            case 'WaffleCanvas':
                return compose.apply(undefined, [defaultProps(implDefaultProps)].concat(commonEnhancers, [pure]))(Component);
        }

        return Component;
    });

    var WaffleCellTooltip = function WaffleCellTooltip(_ref) {
        var position = _ref.position,
            row = _ref.row,
            column = _ref.column,
            color = _ref.color,
            data = _ref.data,
            theme = _ref.theme,
            tooltipFormat = _ref.tooltipFormat,
            tooltip = _ref.tooltip;
        return React__default.createElement(core.BasicTooltip, {
            id: data.label,
            value: data.value,
            enableChip: true,
            color: color,
            theme: theme,
            format: tooltipFormat,
            renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _extends({
                position: position,
                row: row,
                column: column,
                color: color
            }, data)) : null
        });
    };

    WaffleCellTooltip.displayName = 'WaffleCellTooltip';
    WaffleCellTooltip.propTypes = {
        position: PropTypes.number.isRequired,
        row: PropTypes.number.isRequired,
        column: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        tooltip: PropTypes.func
    };

    var Waffle = function (_Component) {
        inherits(Waffle, _Component);

        function Waffle() {
            var _temp, _this, _ret;

            classCallCheck(this, Waffle);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleCellHover = function (showTooltip, cell, event) {
                var _this$props = _this.props,
                    setCurrentCell = _this$props.setCurrentCell,
                    theme = _this$props.theme,
                    tooltipFormat = _this$props.tooltipFormat,
                    tooltip = _this$props.tooltip;


                setCurrentCell(cell);

                if (!cell.data) return;

                showTooltip(React__default.createElement(WaffleCellTooltip, {
                    position: cell.position,
                    row: cell.row,
                    column: cell.column,
                    color: cell.color,
                    data: cell.data,
                    theme: theme,
                    tooltipFormat: tooltipFormat,
                    tooltip: tooltip
                }), event);
            }, _this.handleCellLeave = function (hideTooltip) {
                _this.props.setCurrentCell(null);
                hideTooltip();
            }, _temp), possibleConstructorReturn(_this, _ret);
        }

        Waffle.prototype.render = function render() {
            var _this2 = this;

            var _props = this.props,
                hiddenIds = _props.hiddenIds,
                margin = _props.margin,
                width = _props.width,
                height = _props.height,
                outerWidth = _props.outerWidth,
                outerHeight = _props.outerHeight,
                cellComponent = _props.cellComponent,
                emptyColor = _props.emptyColor,
                emptyOpacity = _props.emptyOpacity,
                borderWidth = _props.borderWidth,
                getBorderColor = _props.getBorderColor,
                theme = _props.theme,
                defs = _props.defs,
                animate = _props.animate,
                motionStiffness = _props.motionStiffness,
                motionDamping = _props.motionDamping,
                isInteractive = _props.isInteractive,
                onClick = _props.onClick,
                cells = _props.cells,
                cellSize = _props.cellSize,
                origin = _props.origin,
                computedData = _props.computedData,
                legendData = _props.legendData,
                legends$$1 = _props.legends;


            cells.forEach(function (cell) {
                cell.color = emptyColor;
            });

            return React__default.createElement(
                core.Container,
                { isInteractive: isInteractive, theme: theme },
                function (_ref) {
                    var showTooltip = _ref.showTooltip,
                        hideTooltip = _ref.hideTooltip;

                    var onHover = partial(_this2.handleCellHover, showTooltip);
                    var onLeave = partial(_this2.handleCellLeave, hideTooltip);

                    var cellsRender = void 0;
                    if (animate === true) {
                        var springConfig = {
                            stiffness: motionStiffness,
                            damping: motionDamping
                        };

                        cellsRender = React__default.createElement(
                            reactMotion.TransitionMotion,
                            {
                                styles: computedData.map(function (datum) {
                                    return {
                                        key: datum.id,
                                        data: datum,
                                        style: {
                                            startAt: reactMotion.spring(datum.startAt, springConfig),
                                            endAt: reactMotion.spring(datum.endAt, springConfig)
                                        }
                                    };
                                })
                            },
                            function (interpolatedStyles) {
                                var computedCells = applyDataToGrid(cells, interpolatedStyles.map(function (s) {
                                    return _extends({}, s.data, {
                                        startAt: Math.round(s.style.startAt),
                                        endAt: Math.round(s.style.endAt)
                                    });
                                }), hiddenIds);

                                return React__default.createElement(
                                    React.Fragment,
                                    null,
                                    computedCells.map(function (cell) {
                                        return React__default.createElement(cellComponent, {
                                            key: cell.position,
                                            position: cell.position,
                                            size: cellSize,
                                            x: cell.x,
                                            y: cell.y,
                                            color: cell.color,
                                            fill: cell.data && cell.data.fill,
                                            opacity: cell.data ? 1 : emptyOpacity,
                                            borderWidth: borderWidth,
                                            borderColor: getBorderColor(cell),
                                            data: cell.data,
                                            onHover: partial(onHover, cell),
                                            onLeave: onLeave,
                                            onClick: onClick
                                        });
                                    })
                                );
                            }
                        );
                    } else {
                        var computedCells = applyDataToGrid(cells, computedData, hiddenIds);

                        cellsRender = React__default.createElement(
                            React.Fragment,
                            null,
                            computedCells.map(function (cell) {
                                return React__default.createElement(cellComponent, {
                                    key: cell.position,
                                    position: cell.position,
                                    size: cellSize,
                                    x: cell.x,
                                    y: cell.y,
                                    color: cell.color,
                                    fill: cell.data && cell.data.fill,
                                    opacity: cell.data ? 1 : emptyOpacity,
                                    borderWidth: borderWidth,
                                    borderColor: getBorderColor(cell),
                                    data: cell.data,
                                    onHover: partial(onHover, cell),
                                    onLeave: onLeave,
                                    onClick: onClick
                                });
                            })
                        );
                    }

                    return React__default.createElement(
                        core.SvgWrapper,
                        {
                            width: outerWidth,
                            height: outerHeight,
                            margin: margin,
                            defs: defs,
                            theme: theme
                        },
                        React__default.createElement(
                            'g',
                            { transform: 'translate(' + origin.x + ', ' + origin.y + ')' },
                            cellsRender
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

        return Waffle;
    }(React.Component);

    Waffle.propTypes = WafflePropTypes;
    Waffle.displayName = 'Waffle';

    var Waffle$1 = setDisplayName(Waffle.displayName)(enhance(Waffle));

    var ResponsiveWaffle = function ResponsiveWaffle(props) {
        return React__default.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React__default.createElement(Waffle$1, _extends({ width: width, height: height }, props));
            }
        );
    };

    var WaffleHtml = function (_Component) {
        inherits(WaffleHtml, _Component);

        function WaffleHtml() {
            var _temp, _this, _ret;

            classCallCheck(this, WaffleHtml);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleCellHover = function (showTooltip, cell, event) {
                var _this$props = _this.props,
                    setCurrentCell = _this$props.setCurrentCell,
                    theme = _this$props.theme,
                    tooltipFormat = _this$props.tooltipFormat,
                    tooltip = _this$props.tooltip;


                setCurrentCell(cell);

                if (!cell.data) return;

                showTooltip(React__default.createElement(WaffleCellTooltip, {
                    position: cell.position,
                    row: cell.row,
                    column: cell.column,
                    color: cell.color,
                    data: cell.data,
                    theme: theme,
                    tooltipFormat: tooltipFormat,
                    tooltip: tooltip
                }), event);
            }, _this.handleCellLeave = function (hideTooltip) {
                _this.props.setCurrentCell(null);
                hideTooltip();
            }, _temp), possibleConstructorReturn(_this, _ret);
        }

        WaffleHtml.prototype.render = function render() {
            var _this2 = this;

            var _props = this.props,
                margin = _props.margin,
                outerWidth = _props.outerWidth,
                outerHeight = _props.outerHeight,
                cellComponent = _props.cellComponent,
                emptyColor = _props.emptyColor,
                emptyOpacity = _props.emptyOpacity,
                borderWidth = _props.borderWidth,
                getBorderColor = _props.getBorderColor,
                theme = _props.theme,
                animate = _props.animate,
                motionStiffness = _props.motionStiffness,
                motionDamping = _props.motionDamping,
                isInteractive = _props.isInteractive,
                onClick = _props.onClick,
                cells = _props.cells,
                cellSize = _props.cellSize,
                origin = _props.origin,
                computedData = _props.computedData;


            cells.forEach(function (cell) {
                cell.color = emptyColor;
            });

            return React__default.createElement(
                core.Container,
                { isInteractive: isInteractive, theme: theme },
                function (_ref) {
                    var showTooltip = _ref.showTooltip,
                        hideTooltip = _ref.hideTooltip;

                    var onHover = partial(_this2.handleCellHover, showTooltip);
                    var onLeave = partial(_this2.handleCellLeave, hideTooltip);

                    var cellsRender = void 0;
                    if (animate === true) {
                        var springConfig = {
                            stiffness: motionStiffness,
                            damping: motionDamping
                        };

                        cellsRender = React__default.createElement(
                            reactMotion.TransitionMotion,
                            {
                                styles: computedData.map(function (datum) {
                                    return {
                                        key: datum.id,
                                        data: datum,
                                        style: {
                                            startAt: reactMotion.spring(datum.startAt, springConfig),
                                            endAt: reactMotion.spring(datum.endAt, springConfig)
                                        }
                                    };
                                })
                            },
                            function (interpolatedStyles) {
                                var computedCells = applyDataToGrid(cells, interpolatedStyles.map(function (s) {
                                    return _extends({}, s.data, {
                                        startAt: Math.round(s.style.startAt),
                                        endAt: Math.round(s.style.endAt)
                                    });
                                }));

                                return React__default.createElement(
                                    React.Fragment,
                                    null,
                                    computedCells.map(function (cell) {
                                        return React__default.createElement(cellComponent, {
                                            key: cell.position,
                                            position: cell.position,
                                            size: cellSize,
                                            x: cell.x,
                                            y: cell.y,
                                            color: cell.color,
                                            fill: cell.data && cell.data.fill,
                                            opacity: cell.data ? 1 : emptyOpacity,
                                            borderWidth: borderWidth,
                                            borderColor: getBorderColor(cell),
                                            data: cell.data,
                                            onHover: partial(onHover, cell),
                                            onLeave: onLeave,
                                            onClick: onClick
                                        });
                                    })
                                );
                            }
                        );
                    } else {
                        var computedCells = applyDataToGrid(cells, computedData);

                        cellsRender = React__default.createElement(
                            React.Fragment,
                            null,
                            computedCells.map(function (cell) {
                                return React__default.createElement(cellComponent, {
                                    key: cell.position,
                                    position: cell.position,
                                    size: cellSize,
                                    x: cell.x,
                                    y: cell.y,
                                    color: cell.color,
                                    fill: cell.data && cell.data.fill,
                                    opacity: cell.data ? 1 : emptyOpacity,
                                    borderWidth: borderWidth,
                                    borderColor: getBorderColor(cell),
                                    data: cell.data,
                                    onHover: partial(onHover, cell),
                                    onLeave: onLeave,
                                    onClick: onClick
                                });
                            })
                        );
                    }

                    return React__default.createElement(
                        'div',
                        {
                            style: {
                                position: 'relative',
                                width: outerWidth,
                                height: outerHeight
                            }
                        },
                        React__default.createElement(
                            'div',
                            {
                                style: {
                                    position: 'absolute',
                                    top: margin.top + origin.y,
                                    left: margin.left + origin.x
                                }
                            },
                            cellsRender
                        )
                    );
                }
            );
        };

        return WaffleHtml;
    }(React.Component);

    WaffleHtml.propTypes = WaffleHtmlPropTypes;


    WaffleHtml.displayName = 'WaffleHtml';

    var WaffleHtml$1 = setDisplayName(WaffleHtml.displayName)(enhance(WaffleHtml));

    var ResponsiveWaffleHtml = function ResponsiveWaffleHtml(props) {
        return React__default.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React__default.createElement(WaffleHtml$1, _extends({ width: width, height: height }, props));
            }
        );
    };

    var findCellUnderCursor = function findCellUnderCursor(cells, cellSize, origin, margin, x, y) {
        return cells.find(function (cell) {
            return core.isCursorInRect(cell.x + origin.x + margin.left, cell.y + origin.y + margin.top, cellSize, cellSize, x, y);
        });
    };

    var WaffleCanvas = function (_Component) {
        inherits(WaffleCanvas, _Component);

        function WaffleCanvas() {
            var _temp, _this, _ret;

            classCallCheck(this, WaffleCanvas);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleMouseHover = function (showTooltip, hideTooltip) {
                return function (event) {
                    var _this$props = _this.props,
                        isInteractive = _this$props.isInteractive,
                        margin = _this$props.margin,
                        theme = _this$props.theme,
                        cells = _this$props.cells,
                        cellSize = _this$props.cellSize,
                        origin = _this$props.origin,
                        tooltipFormat = _this$props.tooltipFormat,
                        tooltip = _this$props.tooltip;


                    if (!isInteractive || !cells) return;

                    var _getRelativeCursor = core.getRelativeCursor(_this.surface, event),
                        x = _getRelativeCursor[0],
                        y = _getRelativeCursor[1];

                    var cell = findCellUnderCursor(cells, cellSize, origin, margin, x, y);

                    if (cell !== undefined && cell.data) {
                        showTooltip(React__default.createElement(WaffleCellTooltip, {
                            position: cell.position,
                            row: cell.row,
                            column: cell.column,
                            color: cell.color,
                            data: cell.data,
                            theme: theme,
                            tooltipFormat: tooltipFormat,
                            tooltip: tooltip
                        }), event);
                    } else {
                        hideTooltip();
                    }
                };
            }, _this.handleMouseLeave = function (hideTooltip) {
                return function () {
                    if (_this.props.isInteractive !== true) return;

                    hideTooltip();
                };
            }, _this.handleClick = function (event) {
                var _this$props2 = _this.props,
                    isInteractive = _this$props2.isInteractive,
                    margin = _this$props2.margin,
                    onClick = _this$props2.onClick,
                    cells = _this$props2.cells,
                    cellSize = _this$props2.cellSize,
                    origin = _this$props2.origin;


                if (!isInteractive || !cells) return;

                var _getRelativeCursor2 = core.getRelativeCursor(_this.surface, event),
                    x = _getRelativeCursor2[0],
                    y = _getRelativeCursor2[1];

                var cell = findCellUnderCursor(cells, cellSize, origin, margin, x, y);
                if (cell !== undefined) onClick(cell, event);
            }, _temp), possibleConstructorReturn(_this, _ret);
        }

        WaffleCanvas.prototype.componentDidMount = function componentDidMount() {
            this.ctx = this.surface.getContext('2d');
            this.draw(this.props);
        };

        WaffleCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
            this.ctx = this.surface.getContext('2d');
            this.draw(this.props);
        };

        WaffleCanvas.prototype.draw = function draw(props) {
            var _this2 = this;

            var pixelRatio = props.pixelRatio,
                margin = props.margin,
                width = props.width,
                height = props.height,
                outerWidth = props.outerWidth,
                outerHeight = props.outerHeight,
                getColor = props.getColor,
                emptyColor = props.emptyColor,
                emptyOpacity = props.emptyOpacity,
                borderWidth = props.borderWidth,
                getBorderColor = props.getBorderColor,
                cells = props.cells,
                cellSize = props.cellSize,
                origin = props.origin,
                computedData = props.computedData,
                legendData = props.legendData,
                legends$$1 = props.legends,
                theme = props.theme;


            this.surface.width = outerWidth * pixelRatio;
            this.surface.height = outerHeight * pixelRatio;

            this.ctx.scale(pixelRatio, pixelRatio);
            this.ctx.fillStyle = theme.background;
            this.ctx.fillRect(0, 0, outerWidth, outerHeight);
            this.ctx.translate(margin.left, margin.top);

            cells.forEach(function (cell) {
                cell.color = emptyColor;
            });

            computedData.forEach(function (datum) {
                range(datum.startAt, datum.endAt).forEach(function (position) {
                    var cell = cells[position];
                    if (cell !== undefined) {
                        cell.data = datum;
                        cell.groupIndex = datum.groupIndex;
                        cell.color = getColor(datum);
                    }
                });
            });

            cells.forEach(function (cell) {
                _this2.ctx.save();
                _this2.ctx.globalAlpha = cell.data ? 1 : emptyOpacity;

                _this2.ctx.fillStyle = cell.color;
                _this2.ctx.fillRect(cell.x + origin.x, cell.y + origin.y, cellSize, cellSize);

                if (borderWidth > 0) {
                    _this2.ctx.strokeStyle = getBorderColor(cell);
                    _this2.ctx.lineWidth = borderWidth;
                    _this2.ctx.strokeRect(cell.x + origin.x, cell.y + origin.y, cellSize, cellSize);
                }

                _this2.ctx.restore();
            });

            legends$$1.forEach(function (legend) {
                legends.renderLegendToCanvas(_this2.ctx, _extends({}, legend, {
                    data: legendData,
                    containerWidth: width,
                    containerHeight: height
                }));
            });
        };

        WaffleCanvas.prototype.render = function render() {
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

        return WaffleCanvas;
    }(React.Component);

    WaffleCanvas.propTypes = WaffleCanvasPropTypes;


    WaffleCanvas.displayName = 'WaffleCanvas';

    var WaffleCanvas$1 = setDisplayName(WaffleCanvas.displayName)(enhance(WaffleCanvas));

    var ResponsiveWaffleCanvas = function ResponsiveWaffleCanvas(props) {
        return React__default.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React__default.createElement(WaffleCanvas$1, _extends({ width: width, height: height }, props));
            }
        );
    };

    exports.Waffle = Waffle$1;
    exports.ResponsiveWaffle = ResponsiveWaffle;
    exports.WaffleHtml = WaffleHtml$1;
    exports.ResponsiveWaffleHtml = ResponsiveWaffleHtml;
    exports.WaffleCanvas = WaffleCanvas$1;
    exports.ResponsiveWaffleCanvas = ResponsiveWaffleCanvas;
    exports.WafflePropTypes = WafflePropTypes;
    exports.WaffleHtmlPropTypes = WaffleHtmlPropTypes;
    exports.WaffleCanvasPropTypes = WaffleCanvasPropTypes;
    exports.WaffleDefaultProps = WaffleDefaultProps;
    exports.WaffleHtmlDefaultProps = WaffleHtmlDefaultProps;
    exports.WaffleCanvasDefaultProps = WaffleCanvasDefaultProps;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
