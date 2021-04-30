'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var partial = _interopDefault(require('lodash.partial'));
var reactMotion = require('react-motion');
var setDisplayName = _interopDefault(require('recompose/setDisplayName'));
var nivoCore = require('@bitbloom/nivo-core');
var nivoLegends = require('@bitbloom/nivo-legends');
var PropTypes = _interopDefault(require('prop-types'));
var nivoColors = require('@bitbloom/nivo-colors');
var pure = _interopDefault(require('recompose/pure'));
var compose = _interopDefault(require('recompose/compose'));
var defaultProps = _interopDefault(require('recompose/defaultProps'));
var withPropsOnChange = _interopDefault(require('recompose/withPropsOnChange'));
var withState = _interopDefault(require('recompose/withState'));
var range = _interopDefault(require('lodash.range'));
var nivoTooltip = require('@bitbloom/nivo-tooltip');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;
    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

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
  return React__default.createElement("rect", {
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
      _onClick({
        position: position,
        color: color,
        x: x,
        y: y,
        data: data
      }, event);
    }
  });
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
  return React__default.createElement("div", {
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
      borderWidth: "".concat(borderWidth, "px"),
      borderColor: borderColor
    },
    onMouseEnter: onHover,
    onMouseMove: onHover,
    onMouseLeave: onLeave,
    onClick: function onClick(event) {
      _onClick({
        position: position,
        color: color,
        x: x,
        y: y,
        data: data
      }, event);
    }
  });
};
WaffleCellHtml.defaultProps = {
  data: {}
};
WaffleCellHtml.displayName = 'WaffleCellHtml';
var WaffleCellHtml$1 = pure(WaffleCellHtml);

var commonPropTypes = {
  total: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    value: PropTypes.number.isRequired
  })).isRequired,
  hiddenIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  fillDirection: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  padding: PropTypes.number.isRequired,
  colors: nivoColors.ordinalColorsPropType.isRequired,
  emptyColor: PropTypes.string.isRequired,
  emptyOpacity: PropTypes.number.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: nivoColors.inheritedColorPropType.isRequired,
  getBorderColor: PropTypes.func.isRequired,
  isInteractive: PropTypes.bool,
  tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  tooltip: PropTypes.func,
  cellSize: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired,
  origin: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};
var WafflePropTypes = _objectSpread2(_objectSpread2(_objectSpread2({}, commonPropTypes), {}, {
  cellComponent: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired
}, nivoCore.defsPropTypes), {}, {
  legends: PropTypes.arrayOf(PropTypes.shape(nivoLegends.LegendPropShape)).isRequired
});
var WaffleHtmlPropTypes = _objectSpread2(_objectSpread2({}, commonPropTypes), {}, {
  cellComponent: PropTypes.func.isRequired
});
var WaffleCanvasPropTypes = _objectSpread2(_objectSpread2({}, commonPropTypes), {}, {
  pixelRatio: PropTypes.number.isRequired,
  legends: PropTypes.arrayOf(PropTypes.shape(nivoLegends.LegendPropShape)).isRequired
});
var commonDefaultProps = {
  hiddenIds: [],
  fillDirection: 'bottom',
  padding: 1,
  colors: {
    scheme: 'nivo'
  },
  emptyColor: '#cccccc',
  emptyOpacity: 1,
  borderWidth: 0,
  borderColor: {
    from: 'color',
    modifiers: [['darker', 1]]
  },
  defs: [],
  fill: [],
  isInteractive: true,
  onClick: nivoCore.noop
};
var WaffleDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  cellComponent: WaffleCell$1,
  role: 'img',
  defs: [],
  fill: [],
  legends: []
});
var WaffleHtmlDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  cellComponent: WaffleCellHtml$1
});
var WaffleCanvasDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  legends: [],
  pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
});

var props = /*#__PURE__*/Object.freeze({
  __proto__: null,
  WafflePropTypes: WafflePropTypes,
  WaffleHtmlPropTypes: WaffleHtmlPropTypes,
  WaffleCanvasPropTypes: WaffleCanvasPropTypes,
  WaffleDefaultProps: WaffleDefaultProps,
  WaffleHtmlDefaultProps: WaffleHtmlDefaultProps,
  WaffleCanvasDefaultProps: WaffleCanvasDefaultProps
});

var computeCellSize = function computeCellSize(width, height, rows, columns, padding) {
  var sizeX = (width - (columns - 1) * padding) / columns;
  var sizeY = (height - (rows - 1) * padding) / rows;
  return Math.min(sizeX, sizeY);
};
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
      throw new Error("Invalid fill direction provided: ".concat(fillDirection));
  }
  var origin = {
    x: (width - (cellSize * columns + padding * (columns - 1))) / 2,
    y: (height - (cellSize * rows + padding * (rows - 1))) / 2
  };
  return {
    cells: cells,
    cellSize: cellSize,
    origin: origin
  };
};
var applyDataToGrid = function applyDataToGrid(_cells, data) {
  var cells = _cells.map(function (cell) {
    return _objectSpread2({}, cell);
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

var commonEnhancers = [nivoCore.withDimensions(), nivoCore.withTheme(), nivoCore.withMotion(), withPropsOnChange(['colors'], function (_ref) {
  var colors = _ref.colors;
  return {
    getColor: nivoColors.getOrdinalColorScale(colors, 'id')
  };
}), withPropsOnChange(['borderColor', 'theme'], function (_ref2) {
  var borderColor = _ref2.borderColor,
      theme = _ref2.theme;
  return {
    getBorderColor: nivoColors.getInheritedColorGenerator(borderColor, theme)
  };
}), withState('currentCell', 'setCurrentCell', null), withPropsOnChange(['rows', 'columns', 'total'], function (_ref3) {
  var rows = _ref3.rows,
      columns = _ref3.columns,
      total = _ref3.total;
  return {
    unit: total / (rows * columns)
  };
}), withPropsOnChange(['width', 'height', 'rows', 'columns', 'fillDirection', 'padding'], function (_ref4) {
  var width = _ref4.width,
      height = _ref4.height,
      rows = _ref4.rows,
      columns = _ref4.columns,
      fillDirection = _ref4.fillDirection,
      padding = _ref4.padding;
  return computeGrid(width, height, rows, columns, fillDirection, padding);
}), withPropsOnChange(['data', 'unit', 'getColor', 'hiddenIds'], function (_ref5) {
  var data = _ref5.data,
      unit = _ref5.unit,
      getColor = _ref5.getColor,
      hiddenIds = _ref5.hiddenIds;
  var currentPosition = 0;
  return {
    computedData: data.map(function (datum, groupIndex) {
      if (!hiddenIds.includes(datum.id)) {
        var enhancedDatum = _objectSpread2(_objectSpread2({}, datum), {}, {
          groupIndex: groupIndex,
          startAt: currentPosition,
          endAt: currentPosition + Math.round(datum.value / unit),
          color: getColor(datum)
        });
        currentPosition = enhancedDatum.endAt;
        return enhancedDatum;
      }
      return _objectSpread2(_objectSpread2({}, datum), {}, {
        groupIndex: groupIndex,
        startAt: currentPosition,
        endAt: currentPosition,
        color: getColor(datum)
      });
    })
  };
}), withPropsOnChange(['computedData'], function (_ref6) {
  var computedData = _ref6.computedData;
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
  var implDefaultProps = props["".concat(Component.displayName, "DefaultProps")];
  switch (Component.displayName) {
    case 'Waffle':
      return compose.apply(void 0, [defaultProps(implDefaultProps)].concat(commonEnhancers, [nivoCore.withMotion(), withPropsOnChange(['computedData', 'defs', 'fill'], function (_ref7) {
        var computedData = _ref7.computedData,
            defs = _ref7.defs,
            fill = _ref7.fill;
        return {
          defs: nivoCore.bindDefs(defs, computedData, fill, {
            targetKey: 'fill'
          })
        };
      }), pure]))(Component);
    case 'WaffleHtml':
      return compose.apply(void 0, [defaultProps(implDefaultProps)].concat(commonEnhancers, [nivoCore.withMotion(), pure]))(Component);
    case 'WaffleCanvas':
      return compose.apply(void 0, [defaultProps(implDefaultProps)].concat(commonEnhancers, [pure]))(Component);
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
  return React__default.createElement(nivoTooltip.BasicTooltip, {
    id: data.label,
    value: data.value,
    enableChip: true,
    color: color,
    theme: theme,
    format: tooltipFormat,
    renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _objectSpread2({
      position: position,
      row: row,
      column: column,
      color: color
    }, data)) : null
  });
};
WaffleCellTooltip.displayName = 'WaffleCellTooltip';

var Waffle = function (_Component) {
  _inherits(Waffle, _Component);
  var _super = _createSuper(Waffle);
  function Waffle() {
    var _this;
    _classCallCheck(this, Waffle);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.handleCellHover = function (showTooltip, cell, event) {
      var _this$props = _this.props,
          setCurrentCell = _this$props.setCurrentCell,
          theme = _this$props.theme,
          tooltipFormat = _this$props.tooltipFormat,
          tooltip = _this$props.tooltip;
      setCurrentCell(cell);
      if (!cell.data) return;
      showTooltip( React__default.createElement(WaffleCellTooltip, {
        position: cell.position,
        row: cell.row,
        column: cell.column,
        color: cell.color,
        data: cell.data,
        theme: theme,
        tooltipFormat: tooltipFormat,
        tooltip: tooltip
      }), event);
    };
    _this.handleCellLeave = function (hideTooltip) {
      _this.props.setCurrentCell(null);
      hideTooltip();
    };
    return _this;
  }
  _createClass(Waffle, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
          hiddenIds = _this$props2.hiddenIds,
          margin = _this$props2.margin,
          width = _this$props2.width,
          height = _this$props2.height,
          outerWidth = _this$props2.outerWidth,
          outerHeight = _this$props2.outerHeight,
          cellComponent = _this$props2.cellComponent,
          emptyColor = _this$props2.emptyColor,
          emptyOpacity = _this$props2.emptyOpacity,
          borderWidth = _this$props2.borderWidth,
          getBorderColor = _this$props2.getBorderColor,
          theme = _this$props2.theme,
          defs = _this$props2.defs,
          animate = _this$props2.animate,
          motionStiffness = _this$props2.motionStiffness,
          motionDamping = _this$props2.motionDamping,
          isInteractive = _this$props2.isInteractive,
          onClick = _this$props2.onClick,
          cells = _this$props2.cells,
          cellSize = _this$props2.cellSize,
          origin = _this$props2.origin,
          computedData = _this$props2.computedData,
          legendData = _this$props2.legendData,
          legends = _this$props2.legends,
          role = _this$props2.role;
      cells.forEach(function (cell) {
        cell.color = emptyColor;
      });
      return React__default.createElement(nivoCore.Container, {
        isInteractive: isInteractive,
        theme: theme,
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness
      }, function (_ref) {
        var showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip;
        var onHover = partial(_this2.handleCellHover, showTooltip);
        var onLeave = partial(_this2.handleCellLeave, hideTooltip);
        var cellsRender;
        if (animate === true) {
          var springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping
          };
          cellsRender = React__default.createElement(reactMotion.TransitionMotion, {
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
          }, function (interpolatedStyles) {
            var computedCells = applyDataToGrid(cells, interpolatedStyles.map(function (s) {
              return _objectSpread2(_objectSpread2({}, s.data), {}, {
                startAt: Math.round(s.style.startAt),
                endAt: Math.round(s.style.endAt)
              });
            }));
            return React__default.createElement(React.Fragment, null, computedCells.map(function (cell) {
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
            }));
          });
        } else {
          var computedCells = applyDataToGrid(cells, computedData);
          cellsRender = React__default.createElement(React.Fragment, null, computedCells.map(function (cell) {
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
          }));
        }
        return React__default.createElement(nivoCore.SvgWrapper, {
          width: outerWidth,
          height: outerHeight,
          margin: margin,
          defs: defs,
          theme: theme,
          role: role
        }, React__default.createElement("g", {
          transform: "translate(".concat(origin.x, ", ").concat(origin.y, ")")
        }, cellsRender), legends.map(function (legend, i) {
          return React__default.createElement(nivoLegends.BoxLegendSvg, Object.assign({
            key: i
          }, legend, {
            containerWidth: width,
            containerHeight: height,
            data: legendData,
            theme: theme
          }));
        }));
      });
    }
  }]);
  return Waffle;
}(React.Component);
Waffle.displayName = 'Waffle';
var Waffle$1 = setDisplayName(Waffle.displayName)(enhance(Waffle));

var ResponsiveWaffle = function ResponsiveWaffle(props) {
  return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(Waffle$1, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

var WaffleHtml = function (_Component) {
  _inherits(WaffleHtml, _Component);
  var _super = _createSuper(WaffleHtml);
  function WaffleHtml() {
    var _this;
    _classCallCheck(this, WaffleHtml);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.handleCellHover = function (showTooltip, cell, event) {
      var _this$props = _this.props,
          setCurrentCell = _this$props.setCurrentCell,
          theme = _this$props.theme,
          tooltipFormat = _this$props.tooltipFormat,
          tooltip = _this$props.tooltip;
      setCurrentCell(cell);
      if (!cell.data) return;
      showTooltip( React__default.createElement(WaffleCellTooltip, {
        position: cell.position,
        row: cell.row,
        column: cell.column,
        color: cell.color,
        data: cell.data,
        theme: theme,
        tooltipFormat: tooltipFormat,
        tooltip: tooltip
      }), event);
    };
    _this.handleCellLeave = function (hideTooltip) {
      _this.props.setCurrentCell(null);
      hideTooltip();
    };
    return _this;
  }
  _createClass(WaffleHtml, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
          margin = _this$props2.margin,
          outerWidth = _this$props2.outerWidth,
          outerHeight = _this$props2.outerHeight,
          cellComponent = _this$props2.cellComponent,
          emptyColor = _this$props2.emptyColor,
          emptyOpacity = _this$props2.emptyOpacity,
          borderWidth = _this$props2.borderWidth,
          getBorderColor = _this$props2.getBorderColor,
          theme = _this$props2.theme,
          animate = _this$props2.animate,
          motionStiffness = _this$props2.motionStiffness,
          motionDamping = _this$props2.motionDamping,
          isInteractive = _this$props2.isInteractive,
          onClick = _this$props2.onClick,
          cells = _this$props2.cells,
          cellSize = _this$props2.cellSize,
          origin = _this$props2.origin,
          computedData = _this$props2.computedData;
      cells.forEach(function (cell) {
        cell.color = emptyColor;
      });
      return React__default.createElement(nivoCore.Container, {
        isInteractive: isInteractive,
        theme: theme,
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness
      }, function (_ref) {
        var showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip;
        var onHover = partial(_this2.handleCellHover, showTooltip);
        var onLeave = partial(_this2.handleCellLeave, hideTooltip);
        var cellsRender;
        if (animate === true) {
          var springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping
          };
          cellsRender = React__default.createElement(reactMotion.TransitionMotion, {
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
          }, function (interpolatedStyles) {
            var computedCells = applyDataToGrid(cells, interpolatedStyles.map(function (s) {
              return _objectSpread2(_objectSpread2({}, s.data), {}, {
                startAt: Math.round(s.style.startAt),
                endAt: Math.round(s.style.endAt)
              });
            }));
            return React__default.createElement(React.Fragment, null, computedCells.map(function (cell) {
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
            }));
          });
        } else {
          var computedCells = applyDataToGrid(cells, computedData);
          cellsRender = React__default.createElement(React.Fragment, null, computedCells.map(function (cell) {
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
          }));
        }
        return React__default.createElement("div", {
          style: {
            position: 'relative',
            width: outerWidth,
            height: outerHeight
          }
        }, React__default.createElement("div", {
          style: {
            position: 'absolute',
            top: margin.top + origin.y,
            left: margin.left + origin.x
          }
        }, cellsRender));
      });
    }
  }]);
  return WaffleHtml;
}(React.Component);
WaffleHtml.displayName = 'WaffleHtml';
var WaffleHtml$1 = setDisplayName(WaffleHtml.displayName)(enhance(WaffleHtml));

var ResponsiveWaffleHtml = function ResponsiveWaffleHtml(props) {
  return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(WaffleHtml$1, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var findCellUnderCursor = function findCellUnderCursor(cells, cellSize, origin, margin, x, y) {
  return cells.find(function (cell) {
    return nivoCore.isCursorInRect(cell.x + origin.x + margin.left, cell.y + origin.y + margin.top, cellSize, cellSize, x, y);
  });
};
var WaffleCanvas = function (_Component) {
  _inherits(WaffleCanvas, _Component);
  var _super = _createSuper(WaffleCanvas);
  function WaffleCanvas() {
    var _this;
    _classCallCheck(this, WaffleCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.handleMouseHover = function (showTooltip, hideTooltip) {
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
        var _getRelativeCursor = nivoCore.getRelativeCursor(_this.surface, event),
            _getRelativeCursor2 = _slicedToArray(_getRelativeCursor, 2),
            x = _getRelativeCursor2[0],
            y = _getRelativeCursor2[1];
        var cell = findCellUnderCursor(cells, cellSize, origin, margin, x, y);
        if (cell !== undefined && cell.data) {
          showTooltip( React__default.createElement(WaffleCellTooltip, {
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
    };
    _this.handleMouseLeave = function (hideTooltip) {
      return function () {
        if (_this.props.isInteractive !== true) return;
        hideTooltip();
      };
    };
    _this.handleClick = function (event) {
      var _this$props2 = _this.props,
          isInteractive = _this$props2.isInteractive,
          margin = _this$props2.margin,
          onClick = _this$props2.onClick,
          cells = _this$props2.cells,
          cellSize = _this$props2.cellSize,
          origin = _this$props2.origin;
      if (!isInteractive || !cells) return;
      var _getRelativeCursor3 = nivoCore.getRelativeCursor(_this.surface, event),
          _getRelativeCursor4 = _slicedToArray(_getRelativeCursor3, 2),
          x = _getRelativeCursor4[0],
          y = _getRelativeCursor4[1];
      var cell = findCellUnderCursor(cells, cellSize, origin, margin, x, y);
      if (cell !== undefined) onClick(cell, event);
    };
    return _this;
  }
  _createClass(WaffleCanvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ctx = this.surface.getContext('2d');
      this.draw(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.ctx = this.surface.getContext('2d');
      this.draw(this.props);
    }
  }, {
    key: "draw",
    value: function draw(props) {
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
          legends = props.legends,
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
      legends.forEach(function (legend) {
        nivoLegends.renderLegendToCanvas(_this2.ctx, _objectSpread2(_objectSpread2({}, legend), {}, {
          data: legendData,
          containerWidth: width,
          containerHeight: height,
          theme: theme
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props3 = this.props,
          outerWidth = _this$props3.outerWidth,
          outerHeight = _this$props3.outerHeight,
          pixelRatio = _this$props3.pixelRatio,
          isInteractive = _this$props3.isInteractive,
          theme = _this$props3.theme;
      return React__default.createElement(nivoCore.Container, {
        isInteractive: isInteractive,
        theme: theme,
        animate: false
      }, function (_ref) {
        var showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip;
        return React__default.createElement("canvas", {
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
      });
    }
  }]);
  return WaffleCanvas;
}(React.Component);
WaffleCanvas.displayName = 'WaffleCanvas';
var WaffleCanvas$1 = setDisplayName(WaffleCanvas.displayName)(enhance(WaffleCanvas));

var ResponsiveWaffleCanvas = function ResponsiveWaffleCanvas(props) {
  return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(WaffleCanvas$1, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

exports.ResponsiveWaffle = ResponsiveWaffle;
exports.ResponsiveWaffleCanvas = ResponsiveWaffleCanvas;
exports.ResponsiveWaffleHtml = ResponsiveWaffleHtml;
exports.Waffle = Waffle$1;
exports.WaffleCanvas = WaffleCanvas$1;
exports.WaffleCanvasDefaultProps = WaffleCanvasDefaultProps;
exports.WaffleCanvasPropTypes = WaffleCanvasPropTypes;
exports.WaffleDefaultProps = WaffleDefaultProps;
exports.WaffleHtml = WaffleHtml$1;
exports.WaffleHtmlDefaultProps = WaffleHtmlDefaultProps;
exports.WaffleHtmlPropTypes = WaffleHtmlPropTypes;
exports.WafflePropTypes = WafflePropTypes;
//# sourceMappingURL=nivo-waffle.cjs.js.map
