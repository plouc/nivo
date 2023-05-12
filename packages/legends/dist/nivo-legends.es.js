import React, { PureComponent, useState, useCallback, useMemo } from 'react';
import isFunction from 'lodash/isFunction';
import { useTheme } from '@bitbloom/nivo-core';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import isPlainObject from 'lodash/isPlainObject';

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

var DIRECTION_ROW = 'row';
var DIRECTION_COLUMN = 'column';
var ANCHOR_TOP = 'top';
var ANCHOR_TOP_RIGHT = 'top-right';
var ANCHOR_RIGHT = 'right';
var ANCHOR_BOTTOM_RIGHT = 'bottom-right';
var ANCHOR_BOTTOM = 'bottom';
var ANCHOR_BOTTOM_LEFT = 'bottom-left';
var ANCHOR_LEFT = 'left';
var ANCHOR_TOP_LEFT = 'top-left';
var ANCHOR_CENTER = 'center';
var DIRECTION_LEFT_TO_RIGHT = 'left-to-right';
var DIRECTION_RIGHT_TO_LEFT = 'right-to-left';
var DIRECTION_TOP_TO_BOTTOM = 'top-to-bottom';
var DIRECTION_BOTTOM_TO_TOP = 'bottom-to-top';

var legendEffectPropType = PropTypes.shape({
  on: PropTypes.oneOfType([PropTypes.oneOf(['hover'])]).isRequired,
  style: PropTypes.shape({
    itemTextColor: PropTypes.string,
    itemBackground: PropTypes.string,
    itemOpacity: PropTypes.number,
    symbolSize: PropTypes.number,
    symbolBorderWidth: PropTypes.number,
    symbolBorderColor: PropTypes.string
  }).isRequired
});
var symbolPropTypes = {
  symbolShape: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  symbolSize: PropTypes.number,
  symbolSpacing: PropTypes.number,
  symbolBorderWidth: PropTypes.number,
  symbolBorderColor: PropTypes.string
};
var interactivityPropTypes = {
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};
var datumPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
  fill: PropTypes.string
});
var LegendPropShape = _objectSpread2(_objectSpread2(_objectSpread2({
  data: PropTypes.arrayOf(datumPropType),
  anchor: PropTypes.oneOf([ANCHOR_TOP, ANCHOR_TOP_RIGHT, ANCHOR_RIGHT, ANCHOR_BOTTOM_RIGHT, ANCHOR_BOTTOM, ANCHOR_BOTTOM_LEFT, ANCHOR_LEFT, ANCHOR_TOP_LEFT, ANCHOR_CENTER]).isRequired,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  direction: PropTypes.oneOf([DIRECTION_ROW, DIRECTION_COLUMN]).isRequired,
  itemsSpacing: PropTypes.number,
  itemWidth: PropTypes.number.isRequired,
  itemHeight: PropTypes.number.isRequired,
  itemDirection: PropTypes.oneOf([DIRECTION_LEFT_TO_RIGHT, DIRECTION_RIGHT_TO_LEFT, DIRECTION_TOP_TO_BOTTOM, DIRECTION_BOTTOM_TO_TOP]),
  itemTextColor: PropTypes.string,
  itemBackground: PropTypes.string,
  itemOpacity: PropTypes.number
}, symbolPropTypes), interactivityPropTypes), {}, {
  effects: PropTypes.arrayOf(legendEffectPropType)
});

var zeroPadding = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var computeDimensions = function computeDimensions(_ref) {
  var direction = _ref.direction,
      itemsSpacing = _ref.itemsSpacing,
      _padding = _ref.padding,
      itemCount = _ref.itemCount,
      itemWidth = _ref.itemWidth,
      itemHeight = _ref.itemHeight;
  var padding;
  if (isNumber(_padding)) {
    padding = {
      top: _padding,
      right: _padding,
      bottom: _padding,
      left: _padding
    };
  } else if (isPlainObject(_padding)) {
    padding = _objectSpread2(_objectSpread2({}, zeroPadding), _padding);
  } else {
    throw new TypeError("Invalid property padding, must be one of: number, object");
  }
  var horizontalPadding = padding.left + padding.right;
  var verticalPadding = padding.top + padding.bottom;
  var width = itemWidth + horizontalPadding;
  var height = itemHeight + verticalPadding;
  var spacing = (itemCount - 1) * itemsSpacing;
  if (direction === DIRECTION_ROW) {
    width = itemWidth * itemCount + spacing + horizontalPadding;
  } else if (direction === DIRECTION_COLUMN) {
    height = itemHeight * itemCount + spacing + verticalPadding;
  }
  return {
    width: width,
    height: height,
    padding: padding
  };
};
var computePositionFromAnchor = function computePositionFromAnchor(_ref2) {
  var anchor = _ref2.anchor,
      translateX = _ref2.translateX,
      translateY = _ref2.translateY,
      containerWidth = _ref2.containerWidth,
      containerHeight = _ref2.containerHeight,
      width = _ref2.width,
      height = _ref2.height;
  var x = translateX;
  var y = translateY;
  switch (anchor) {
    case ANCHOR_TOP:
      x += (containerWidth - width) / 2;
      break;
    case ANCHOR_TOP_RIGHT:
      x += containerWidth - width;
      break;
    case ANCHOR_RIGHT:
      x += containerWidth - width;
      y += (containerHeight - height) / 2;
      break;
    case ANCHOR_BOTTOM_RIGHT:
      x += containerWidth - width;
      y += containerHeight - height;
      break;
    case ANCHOR_BOTTOM:
      x += (containerWidth - width) / 2;
      y += containerHeight - height;
      break;
    case ANCHOR_BOTTOM_LEFT:
      y += containerHeight - height;
      break;
    case ANCHOR_LEFT:
      y += (containerHeight - height) / 2;
      break;
    case ANCHOR_CENTER:
      x += (containerWidth - width) / 2;
      y += (containerHeight - height) / 2;
      break;
  }
  return {
    x: x,
    y: y
  };
};
var computeItemLayout = function computeItemLayout(_ref3) {
  var direction = _ref3.direction,
      justify = _ref3.justify,
      symbolSize = _ref3.symbolSize,
      symbolSpacing = _ref3.symbolSpacing,
      width = _ref3.width,
      height = _ref3.height;
  var symbolX;
  var symbolY;
  var labelX;
  var labelY;
  var labelAnchor;
  var labelAlignment;
  switch (direction) {
    case DIRECTION_LEFT_TO_RIGHT:
      symbolX = 0;
      symbolY = (height - symbolSize) / 2;
      labelY = height / 2;
      labelAlignment = 'central';
      if (justify === true) {
        labelX = width;
        labelAnchor = 'end';
      } else {
        labelX = symbolSize + symbolSpacing;
        labelAnchor = 'start';
      }
      break;
    case DIRECTION_RIGHT_TO_LEFT:
      symbolX = width - symbolSize;
      symbolY = (height - symbolSize) / 2;
      labelY = height / 2;
      labelAlignment = 'central';
      if (justify === true) {
        labelX = 0;
        labelAnchor = 'start';
      } else {
        labelX = width - symbolSize - symbolSpacing;
        labelAnchor = 'end';
      }
      break;
    case DIRECTION_TOP_TO_BOTTOM:
      symbolX = (width - symbolSize) / 2;
      symbolY = 0;
      labelX = width / 2;
      labelAnchor = 'middle';
      if (justify === true) {
        labelY = height;
        labelAlignment = 'alphabetic';
      } else {
        labelY = symbolSize + symbolSpacing;
        labelAlignment = 'text-before-edge';
      }
      break;
    case DIRECTION_BOTTOM_TO_TOP:
      symbolX = (width - symbolSize) / 2;
      symbolY = height - symbolSize;
      labelX = width / 2;
      labelAnchor = 'middle';
      if (justify === true) {
        labelY = 0;
        labelAlignment = 'text-before-edge';
      } else {
        labelY = height - symbolSize - symbolSpacing;
        labelAlignment = 'alphabetic';
      }
      break;
  }
  return {
    symbolX: symbolX,
    symbolY: symbolY,
    labelX: labelX,
    labelY: labelY,
    labelAnchor: labelAnchor,
    labelAlignment: labelAlignment
  };
};

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

var symbolPropTypes$1 = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired
};
var symbolDefaultProps = {
  borderWidth: 0,
  borderColor: 'transparent'
};

var SymbolCircle = function (_PureComponent) {
  _inherits(SymbolCircle, _PureComponent);
  var _super = _createSuper(SymbolCircle);
  function SymbolCircle() {
    _classCallCheck(this, SymbolCircle);
    return _super.apply(this, arguments);
  }
  _createClass(SymbolCircle, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          size = _this$props.size,
          fill = _this$props.fill,
          borderWidth = _this$props.borderWidth,
          borderColor = _this$props.borderColor;
      return React.createElement("circle", {
        r: size / 2,
        cx: x + size / 2,
        cy: y + size / 2,
        fill: fill,
        strokeWidth: borderWidth,
        stroke: borderColor,
        style: {
          pointerEvents: 'none'
        }
      });
    }
  }]);
  return SymbolCircle;
}(PureComponent);
SymbolCircle.defaultProps = _objectSpread2({}, symbolDefaultProps);

var SymbolDiamond = function (_PureComponent) {
  _inherits(SymbolDiamond, _PureComponent);
  var _super = _createSuper(SymbolDiamond);
  function SymbolDiamond() {
    _classCallCheck(this, SymbolDiamond);
    return _super.apply(this, arguments);
  }
  _createClass(SymbolDiamond, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          size = _this$props.size,
          fill = _this$props.fill,
          borderWidth = _this$props.borderWidth,
          borderColor = _this$props.borderColor;
      return React.createElement("g", {
        transform: "translate(".concat(x, ",").concat(y, ")")
      }, React.createElement("path", {
        d: "\n                    M".concat(size / 2, " 0\n                    L").concat(size * 0.8, " ").concat(size / 2, "\n                    L").concat(size / 2, " ").concat(size, "\n                    L").concat(size * 0.2, " ").concat(size / 2, "\n                    L").concat(size / 2, " 0\n                "),
        fill: fill,
        strokeWidth: borderWidth,
        stroke: borderColor,
        style: {
          pointerEvents: 'none'
        }
      }));
    }
  }]);
  return SymbolDiamond;
}(PureComponent);
SymbolDiamond.defaultProps = _objectSpread2({}, symbolDefaultProps);

var SymbolSquare = function (_PureComponent) {
  _inherits(SymbolSquare, _PureComponent);
  var _super = _createSuper(SymbolSquare);
  function SymbolSquare() {
    _classCallCheck(this, SymbolSquare);
    return _super.apply(this, arguments);
  }
  _createClass(SymbolSquare, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          size = _this$props.size,
          fill = _this$props.fill,
          borderWidth = _this$props.borderWidth,
          borderColor = _this$props.borderColor;
      return React.createElement("rect", {
        x: x,
        y: y,
        fill: fill,
        strokeWidth: borderWidth,
        stroke: borderColor,
        width: size,
        height: size,
        style: {
          pointerEvents: 'none'
        }
      });
    }
  }]);
  return SymbolSquare;
}(PureComponent);
SymbolSquare.defaultProps = _objectSpread2({}, symbolDefaultProps);

var SymbolTriangle = function (_PureComponent) {
  _inherits(SymbolTriangle, _PureComponent);
  var _super = _createSuper(SymbolTriangle);
  function SymbolTriangle() {
    _classCallCheck(this, SymbolTriangle);
    return _super.apply(this, arguments);
  }
  _createClass(SymbolTriangle, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          size = _this$props.size,
          fill = _this$props.fill,
          borderWidth = _this$props.borderWidth,
          borderColor = _this$props.borderColor;
      return React.createElement("g", {
        transform: "translate(".concat(x, ",").concat(y, ")")
      }, React.createElement("path", {
        d: "\n                M".concat(size / 2, " 0\n                L").concat(size, " ").concat(size, "\n                L0 ").concat(size, "\n                L").concat(size / 2, " 0\n            "),
        fill: fill,
        strokeWidth: borderWidth,
        stroke: borderColor,
        style: {
          pointerEvents: 'none'
        }
      }));
    }
  }]);
  return SymbolTriangle;
}(PureComponent);
SymbolTriangle.defaultProps = _objectSpread2({}, symbolDefaultProps);

var symbolByShape = {
  circle: SymbolCircle,
  diamond: SymbolDiamond,
  square: SymbolSquare,
  triangle: SymbolTriangle
};
var LegendSvgItem = function LegendSvgItem(_ref) {
  var x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height,
      data = _ref.data,
      direction = _ref.direction,
      justify = _ref.justify,
      textColor = _ref.textColor,
      background = _ref.background,
      opacity = _ref.opacity,
      symbolShape = _ref.symbolShape,
      symbolSize = _ref.symbolSize,
      symbolSpacing = _ref.symbolSpacing,
      symbolBorderWidth = _ref.symbolBorderWidth,
      symbolBorderColor = _ref.symbolBorderColor,
      onClick = _ref.onClick,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      effects = _ref.effects;
  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      style = _useState2[0],
      setStyle = _useState2[1];
  var theme = useTheme();
  var handleClick = useCallback(function (event) {
    return onClick && onClick(data, event);
  }, [onClick, data]);
  var handleMouseEnter = useCallback(function (event) {
    if (effects.length > 0) {
      var applyEffects = effects.filter(function (_ref2) {
        var on = _ref2.on;
        return on === 'hover';
      });
      var _style = applyEffects.reduce(function (acc, effect) {
        return _objectSpread2(_objectSpread2({}, acc), effect.style);
      }, {});
      setStyle(_style);
    }
    if (onMouseEnter === undefined) return;
    onMouseEnter(data, event);
  }, [onMouseEnter, data, effects]);
  var handleMouseLeave = useCallback(function () {
    if (effects.length > 0) {
      var applyEffects = effects.filter(function (_ref3) {
        var on = _ref3.on;
        return on !== 'hover';
      });
      var _style2 = applyEffects.reduce(function (acc, effect) {
        return _objectSpread2(_objectSpread2({}, acc), effect.style);
      }, {});
      setStyle(_style2);
    }
    if (onMouseLeave === undefined) return;
    onMouseLeave(data, event);
  }, [onMouseLeave, data, effects]);
  var _computeItemLayout = computeItemLayout({
    direction: direction,
    justify: justify,
    symbolSize: style.symbolSize || symbolSize,
    symbolSpacing: symbolSpacing,
    width: width,
    height: height
  }),
      symbolX = _computeItemLayout.symbolX,
      symbolY = _computeItemLayout.symbolY,
      labelX = _computeItemLayout.labelX,
      labelY = _computeItemLayout.labelY,
      labelAnchor = _computeItemLayout.labelAnchor,
      labelAlignment = _computeItemLayout.labelAlignment;
  var isInteractive = [onClick, onMouseEnter, onMouseLeave].some(function (handler) {
    return handler !== undefined;
  });
  var Symbol;
  if (isFunction(symbolShape)) {
    Symbol = symbolShape;
  } else {
    Symbol = symbolByShape[symbolShape];
  }
  return React.createElement("g", {
    transform: "translate(".concat(x, ",").concat(y, ")"),
    style: {
      opacity: style.itemOpacity !== undefined ? style.itemOpacity : opacity
    }
  }, React.createElement("rect", {
    width: width,
    height: height,
    fill: style.itemBackground || background,
    style: {
      cursor: isInteractive ? 'pointer' : 'auto'
    },
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }), React.createElement(Symbol, {
    id: data.id,
    x: symbolX,
    y: symbolY,
    size: style.symbolSize || symbolSize,
    fill: data.fill || data.color,
    borderWidth: style.symbolBorderWidth !== undefined ? style.symbolBorderWidth : symbolBorderWidth,
    borderColor: style.symbolBorderColor || symbolBorderColor
  }), React.createElement("text", {
    textAnchor: labelAnchor,
    style: _objectSpread2(_objectSpread2({}, theme.legends.text), {}, {
      fill: style.itemTextColor || theme.legends.text.fill || textColor,
      dominantBaseline: labelAlignment,
      pointerEvents: 'none',
      userSelect: 'none'
    }),
    x: labelX,
    y: labelY
  }, data.label));
};
LegendSvgItem.displayName = 'LegendSvgItem';
LegendSvgItem.defaultProps = {
  direction: 'left-to-right',
  justify: false,
  textColor: 'black',
  background: 'transparent',
  opacity: 1,
  symbolShape: 'square',
  symbolSize: 16,
  symbolSpacing: 8,
  symbolBorderWidth: 0,
  symbolBorderColor: 'transparent',
  effects: []
};

var LegendSvg = function LegendSvg(_ref) {
  var data = _ref.data,
      x = _ref.x,
      y = _ref.y,
      direction = _ref.direction,
      _padding = _ref.padding,
      justify = _ref.justify,
      effects = _ref.effects,
      itemWidth = _ref.itemWidth,
      itemHeight = _ref.itemHeight,
      itemDirection = _ref.itemDirection,
      itemsSpacing = _ref.itemsSpacing,
      itemTextColor = _ref.itemTextColor,
      itemBackground = _ref.itemBackground,
      itemOpacity = _ref.itemOpacity,
      symbolShape = _ref.symbolShape,
      symbolSize = _ref.symbolSize,
      symbolSpacing = _ref.symbolSpacing,
      symbolBorderWidth = _ref.symbolBorderWidth,
      symbolBorderColor = _ref.symbolBorderColor,
      onClick = _ref.onClick,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave;
  var _computeDimensions = computeDimensions({
    itemCount: data.length,
    itemWidth: itemWidth,
    itemHeight: itemHeight,
    itemsSpacing: itemsSpacing,
    direction: direction,
    padding: _padding
  }),
      padding = _computeDimensions.padding;
  var xStep = 0;
  var yStep = 0;
  if (direction === 'row') {
    xStep = itemWidth + itemsSpacing;
  } else if (direction === 'column') {
    yStep = itemHeight + itemsSpacing;
  }
  return React.createElement("g", {
    transform: "translate(".concat(x, ",").concat(y, ")")
  }, data.map(function (data, i) {
    return React.createElement(LegendSvgItem, {
      key: i,
      data: data,
      x: i * xStep + padding.left,
      y: i * yStep + padding.top,
      width: itemWidth,
      height: itemHeight,
      direction: itemDirection,
      justify: justify,
      effects: effects,
      textColor: itemTextColor,
      background: itemBackground,
      opacity: itemOpacity,
      symbolShape: symbolShape,
      symbolSize: symbolSize,
      symbolSpacing: symbolSpacing,
      symbolBorderWidth: symbolBorderWidth,
      symbolBorderColor: symbolBorderColor,
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    });
  }));
};
LegendSvg.defaultProps = {
  padding: 0,
  justify: false,
  itemsSpacing: 0,
  itemDirection: 'left-to-right',
  itemTextColor: 'black',
  itemBackground: 'transparent',
  itemOpacity: 1
};

var BoxLegendSvg = function BoxLegendSvg(_ref) {
  var data = _ref.data,
      containerWidth = _ref.containerWidth,
      containerHeight = _ref.containerHeight,
      translateX = _ref.translateX,
      translateY = _ref.translateY,
      anchor = _ref.anchor,
      direction = _ref.direction,
      padding = _ref.padding,
      justify = _ref.justify,
      itemsSpacing = _ref.itemsSpacing,
      itemWidth = _ref.itemWidth,
      itemHeight = _ref.itemHeight,
      itemDirection = _ref.itemDirection,
      itemTextColor = _ref.itemTextColor,
      itemBackground = _ref.itemBackground,
      itemOpacity = _ref.itemOpacity,
      symbolShape = _ref.symbolShape,
      symbolSize = _ref.symbolSize,
      symbolSpacing = _ref.symbolSpacing,
      symbolBorderWidth = _ref.symbolBorderWidth,
      symbolBorderColor = _ref.symbolBorderColor,
      onClick = _ref.onClick,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      effects = _ref.effects;
  var _computeDimensions = computeDimensions({
    itemCount: data.length,
    itemsSpacing: itemsSpacing,
    itemWidth: itemWidth,
    itemHeight: itemHeight,
    direction: direction,
    padding: padding
  }),
      width = _computeDimensions.width,
      height = _computeDimensions.height;
  var _computePositionFromA = computePositionFromAnchor({
    anchor: anchor,
    translateX: translateX,
    translateY: translateY,
    containerWidth: containerWidth,
    containerHeight: containerHeight,
    width: width,
    height: height
  }),
      x = _computePositionFromA.x,
      y = _computePositionFromA.y;
  return React.createElement(LegendSvg, {
    data: data,
    x: x,
    y: y,
    direction: direction,
    padding: padding,
    justify: justify,
    effects: effects,
    itemsSpacing: itemsSpacing,
    itemWidth: itemWidth,
    itemHeight: itemHeight,
    itemDirection: itemDirection,
    itemTextColor: itemTextColor,
    itemBackground: itemBackground,
    itemOpacity: itemOpacity,
    symbolShape: symbolShape,
    symbolSize: symbolSize,
    symbolSpacing: symbolSpacing,
    symbolBorderWidth: symbolBorderWidth,
    symbolBorderColor: symbolBorderColor,
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  });
};
BoxLegendSvg.defaultProps = {
  translateX: 0,
  translateY: 0,
  itemsSpacing: LegendSvg.defaultProps.itemsSpacing,
  padding: LegendSvg.defaultProps.padding
};

var textPropsMapping = {
  align: {
    start: 'left',
    middle: 'center',
    end: 'right'
  },
  baseline: {
    hanging: 'top',
    middle: 'middle',
    central: 'middle',
    baseline: 'bottom'
  }
};
var renderLegendToCanvas = function renderLegendToCanvas(ctx, _ref) {
  var data = _ref.data,
      containerWidth = _ref.containerWidth,
      containerHeight = _ref.containerHeight,
      _ref$translateX = _ref.translateX,
      translateX = _ref$translateX === void 0 ? BoxLegendSvg.defaultProps.translateX : _ref$translateX,
      _ref$translateY = _ref.translateY,
      translateY = _ref$translateY === void 0 ? BoxLegendSvg.defaultProps.translateY : _ref$translateY,
      anchor = _ref.anchor,
      direction = _ref.direction,
      _ref$padding = _ref.padding,
      _padding = _ref$padding === void 0 ? LegendSvg.defaultProps.padding : _ref$padding,
      _ref$justify = _ref.justify,
      justify = _ref$justify === void 0 ? LegendSvgItem.defaultProps.justify : _ref$justify,
      _ref$itemsSpacing = _ref.itemsSpacing,
      itemsSpacing = _ref$itemsSpacing === void 0 ? LegendSvg.defaultProps.itemsSpacing : _ref$itemsSpacing,
      itemWidth = _ref.itemWidth,
      itemHeight = _ref.itemHeight,
      _ref$itemDirection = _ref.itemDirection,
      itemDirection = _ref$itemDirection === void 0 ? LegendSvgItem.defaultProps.direction : _ref$itemDirection,
      _ref$itemTextColor = _ref.itemTextColor,
      itemTextColor = _ref$itemTextColor === void 0 ? LegendSvg.defaultProps.textColor : _ref$itemTextColor,
      _ref$symbolSize = _ref.symbolSize,
      symbolSize = _ref$symbolSize === void 0 ? LegendSvgItem.defaultProps.symbolSize : _ref$symbolSize,
      _ref$symbolSpacing = _ref.symbolSpacing,
      symbolSpacing = _ref$symbolSpacing === void 0 ? LegendSvgItem.defaultProps.symbolSpacing : _ref$symbolSpacing,
      theme = _ref.theme;
  var _computeDimensions = computeDimensions({
    itemCount: data.length,
    itemWidth: itemWidth,
    itemHeight: itemHeight,
    itemsSpacing: itemsSpacing,
    direction: direction,
    padding: _padding
  }),
      width = _computeDimensions.width,
      height = _computeDimensions.height,
      padding = _computeDimensions.padding;
  var _computePositionFromA = computePositionFromAnchor({
    anchor: anchor,
    translateX: translateX,
    translateY: translateY,
    containerWidth: containerWidth,
    containerHeight: containerHeight,
    width: width,
    height: height
  }),
      x = _computePositionFromA.x,
      y = _computePositionFromA.y;
  var xStep = 0;
  var yStep = 0;
  if (direction === DIRECTION_ROW) {
    xStep = itemWidth + itemsSpacing;
  } else if (direction === DIRECTION_COLUMN) {
    yStep = itemHeight + itemsSpacing;
  }
  ctx.save();
  ctx.translate(x, y);
  ctx.font = "".concat(theme.legends.text.fontSize, "px ").concat(theme.legends.text.fontFamily || 'sans-serif');
  data.forEach(function (d, i) {
    var itemX = i * xStep + padding.left;
    var itemY = i * yStep + padding.top;
    var _computeItemLayout = computeItemLayout({
      direction: itemDirection,
      justify: justify,
      symbolSize: symbolSize,
      symbolSpacing: symbolSpacing,
      width: itemWidth,
      height: itemHeight
    }),
        symbolX = _computeItemLayout.symbolX,
        symbolY = _computeItemLayout.symbolY,
        labelX = _computeItemLayout.labelX,
        labelY = _computeItemLayout.labelY,
        labelAnchor = _computeItemLayout.labelAnchor,
        labelAlignment = _computeItemLayout.labelAlignment;
    ctx.fillStyle = d.color;
    ctx.fillRect(itemX + symbolX, itemY + symbolY, symbolSize, symbolSize);
    ctx.textAlign = textPropsMapping.align[labelAnchor];
    ctx.textBaseline = textPropsMapping.baseline[labelAlignment];
    ctx.fillStyle = itemTextColor || theme.legends.text.fill;
    ctx.fillText(d.label, itemX + labelX, itemY + labelY);
  });
  ctx.restore();
};

var useQuantizeColorScaleLegendData = function useQuantizeColorScaleLegendData(_ref) {
  var scale = _ref.scale,
      overriddenDomain = _ref.domain,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === void 0 ? false : _ref$reverse,
      _ref$valueFormat = _ref.valueFormat,
      valueFormat = _ref$valueFormat === void 0 ? function (v) {
    return v;
  } : _ref$valueFormat,
      _ref$separator = _ref.separator,
      separator = _ref$separator === void 0 ? ' - ' : _ref$separator;
  return useMemo(function () {
    var domain = overriddenDomain || scale.range();
    var items = domain.map(function (domainValue, index) {
      var _scale$invertExtent = scale.invertExtent(domainValue),
          _scale$invertExtent2 = _slicedToArray(_scale$invertExtent, 2),
          start = _scale$invertExtent2[0],
          end = _scale$invertExtent2[1];
      return {
        id: domainValue,
        index: index,
        extent: [start, end],
        label: "".concat(valueFormat(start)).concat(separator).concat(valueFormat(end)),
        value: scale(start),
        color: domainValue
      };
    });
    if (reverse === true) items.reverse();
    return items;
  }, [overriddenDomain, scale, reverse]);
};

export { ANCHOR_BOTTOM, ANCHOR_BOTTOM_LEFT, ANCHOR_BOTTOM_RIGHT, ANCHOR_CENTER, ANCHOR_LEFT, ANCHOR_RIGHT, ANCHOR_TOP, ANCHOR_TOP_LEFT, ANCHOR_TOP_RIGHT, BoxLegendSvg, DIRECTION_BOTTOM_TO_TOP, DIRECTION_COLUMN, DIRECTION_LEFT_TO_RIGHT, DIRECTION_RIGHT_TO_LEFT, DIRECTION_ROW, DIRECTION_TOP_TO_BOTTOM, LegendPropShape, LegendSvg, LegendSvgItem, datumPropType, interactivityPropTypes, legendEffectPropType, renderLegendToCanvas, symbolPropTypes, useQuantizeColorScaleLegendData };
//# sourceMappingURL=nivo-legends.es.js.map
