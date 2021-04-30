'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var d3Scale = require('d3-scale');
var setDisplayName = _interopDefault(require('recompose/setDisplayName'));
var nivoCore = require('@bitbloom/nivo-core');
var PropTypes = _interopDefault(require('prop-types'));
var isString = _interopDefault(require('lodash/isString'));
var reactMotion = require('react-motion');
var partial = _interopDefault(require('lodash/partial'));
var compose = _interopDefault(require('recompose/compose'));
var defaultProps = _interopDefault(require('recompose/defaultProps'));
var withPropsOnChange = _interopDefault(require('recompose/withPropsOnChange'));
var pure = _interopDefault(require('recompose/pure'));
var nivoAxes = require('@bitbloom/nivo-axes');
var nivoTooltip = require('@bitbloom/nivo-tooltip');
var last = _interopDefault(require('lodash/last'));
var nivoColors = require('@bitbloom/nivo-colors');

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

var stackValues = function stackValues(values, colorScale) {
  var useAverage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var normalized = _toConsumableArray(values).filter(function (v) {
    return v !== 0;
  }).sort(function (a, b) {
    return a - b;
  });
  return normalized.reduce(function (acc, v1, index) {
    var v0 = last(acc) !== undefined ? last(acc).v1 : 0;
    var sequentialValue = useAverage === true ? v0 + (v1 - v0) / 2 : v1;
    return [].concat(_toConsumableArray(acc), [{
      index: index,
      v0: v0,
      v1: v1,
      color: colorScale(colorScale.type === 'sequential' ? sequentialValue : index)
    }]);
  }, []);
};
var getComputeRect = function getComputeRect(_ref) {
  var layout = _ref.layout,
      reverse = _ref.reverse,
      scale = _ref.scale,
      height = _ref.height;
  if (layout === 'horizontal') {
    if (reverse === true) {
      return function (d) {
        var x = scale(d.v1);
        var w = scale(d.v0) - x;
        return {
          x: x,
          y: 0,
          width: w,
          height: height
        };
      };
    }
    return function (d) {
      var x = scale(d.v0);
      var w = scale(d.v1) - x;
      return {
        x: x,
        y: 0,
        width: w,
        height: height
      };
    };
  }
  if (reverse === true) {
    return function (d) {
      var y = scale(d.v0);
      var h = scale(d.v1) - y;
      return {
        x: 0,
        y: y,
        width: height,
        height: h
      };
    };
  }
  return function (d) {
    var y = scale(d.v1);
    var h = scale(d.v0) - y;
    return {
      x: 0,
      y: y,
      width: height,
      height: h
    };
  };
};
var computeRects = function computeRects(_ref2) {
  var data = _ref2.data,
      layout = _ref2.layout,
      reverse = _ref2.reverse,
      scale = _ref2.scale,
      height = _ref2.height;
  var computeRect = getComputeRect({
    layout: layout,
    reverse: reverse,
    scale: scale,
    height: height
  });
  return data.map(function (d) {
    return _objectSpread2({
      data: d
    }, computeRect(d));
  });
};

var getPositionGenerator = function getPositionGenerator(_ref) {
  var layout = _ref.layout,
      reverse = _ref.reverse,
      scale = _ref.scale,
      height = _ref.height,
      markerSize = _ref.markerSize;
  if (layout === 'horizontal') {
    return function (marker) {
      var x = scale(marker.value);
      var y = height / 2;
      var rotation = reverse === true ? 180 : 0;
      return {
        x: x,
        y: y,
        size: markerSize,
        rotation: rotation
      };
    };
  }
  return function (marker) {
    var x = height / 2;
    var y = scale(marker.value);
    var rotation = reverse === true ? 270 : 90;
    return {
      x: x,
      y: y,
      size: markerSize,
      rotation: rotation
    };
  };
};
var BulletMarkers = function (_Component) {
  _inherits(BulletMarkers, _Component);
  var _super = _createSuper(BulletMarkers);
  function BulletMarkers() {
    var _this;
    _classCallCheck(this, BulletMarkers);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.handleMouseEnter = function (data, event) {
      _this.props.onMouseEnter(data, event);
    };
    _this.handleMouseLeave = function (data, event) {
      _this.props.onMouseLeave(data, event);
    };
    _this.handleClick = function (data, event) {
      _this.props.onClick(data, event);
    };
    return _this;
  }
  _createClass(BulletMarkers, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
          scale = _this$props.scale,
          layout = _this$props.layout,
          reverse = _this$props.reverse,
          markers = _this$props.markers,
          height = _this$props.height,
          markerSize = _this$props.markerSize,
          component = _this$props.component,
          animate = _this$props.animate,
          motionStiffness = _this$props.motionStiffness,
          motionDamping = _this$props.motionDamping;
      var getPosition = getPositionGenerator({
        layout: layout,
        reverse: reverse,
        scale: scale,
        height: height,
        markerSize: markerSize
      });
      if (animate !== true) {
        return React__default.createElement(React.Fragment, null, markers.map(function (marker) {
          return React__default.createElement(component, _objectSpread2(_objectSpread2(_objectSpread2({
            key: marker.index
          }, marker), getPosition(marker)), {}, {
            data: marker,
            onMouseEnter: partial(_this2.handleMouseEnter, marker),
            onMouseMove: partial(_this2.handleMouseEnter, marker),
            onMouseLeave: partial(_this2.handleMouseLeave, marker),
            onClick: partial(_this2.handleClick, marker)
          }));
        }));
      }
      var springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness
      };
      return React__default.createElement(reactMotion.TransitionMotion, {
        styles: markers.map(function (marker, i) {
          var position = getPosition(marker);
          return {
            key: "".concat(i),
            data: marker,
            style: _objectSpread2({
              x: reactMotion.spring(position.x, springConfig),
              y: reactMotion.spring(position.y, springConfig),
              size: reactMotion.spring(position.size, springConfig),
              rotation: reactMotion.spring(position.rotation, springConfig)
            }, nivoColors.interpolateColor(marker.color, springConfig))
          };
        })
      }, function (interpolatedStyles) {
        return React__default.createElement(React.Fragment, null, interpolatedStyles.map(function (_ref2) {
          var key = _ref2.key,
              style = _ref2.style,
              marker = _ref2.data;
          var color = nivoColors.getInterpolatedColor(style);
          return React__default.createElement(component, _objectSpread2(_objectSpread2(_objectSpread2({
            key: key
          }, marker), style), {}, {
            color: color,
            data: marker,
            onMouseEnter: partial(_this2.handleMouseEnter, marker),
            onMouseMove: partial(_this2.handleMouseEnter, marker),
            onMouseLeave: partial(_this2.handleMouseLeave, marker),
            onClick: partial(_this2.handleClick, marker)
          }));
        }));
      });
    }
  }]);
  return BulletMarkers;
}(React.Component);

var BulletRects = function (_Component) {
  _inherits(BulletRects, _Component);
  var _super = _createSuper(BulletRects);
  function BulletRects() {
    var _this;
    _classCallCheck(this, BulletRects);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.handleMouseEnter = function (data, event) {
      _this.props.onMouseEnter(data, event);
    };
    _this.handleMouseLeave = function (data, event) {
      _this.props.onMouseLeave(data, event);
    };
    _this.handleClick = function (data, event) {
      _this.props.onClick(data, event);
    };
    return _this;
  }
  _createClass(BulletRects, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
          rects = _this$props.rects,
          layout = _this$props.layout,
          y = _this$props.y,
          component = _this$props.component,
          animate = _this$props.animate,
          motionStiffness = _this$props.motionStiffness,
          motionDamping = _this$props.motionDamping;
      var transform = "translate(".concat(layout === 'horizontal' ? 0 : y, ",").concat(layout === 'horizontal' ? y : 0, ")");
      if (animate !== true) {
        return React__default.createElement("g", {
          transform: transform
        }, rects.map(function (rect) {
          return React__default.createElement(component, _objectSpread2(_objectSpread2({
            key: rect.data.index,
            index: rect.data.index,
            color: rect.data.color
          }, rect), {}, {
            onMouseEnter: partial(_this2.handleMouseEnter, rect.data),
            onMouseMove: partial(_this2.handleMouseEnter, rect.data),
            onMouseLeave: partial(_this2.handleMouseLeave, rect.data),
            onClick: partial(_this2.handleClick, rect.data)
          }));
        }));
      }
      var springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness
      };
      return React__default.createElement("g", {
        transform: transform
      }, React__default.createElement(reactMotion.TransitionMotion, {
        styles: rects.map(function (rect) {
          return {
            key: "".concat(rect.data.index),
            data: rect.data,
            style: _objectSpread2({
              x: reactMotion.spring(rect.x, springConfig),
              y: reactMotion.spring(rect.y, springConfig),
              width: reactMotion.spring(rect.width, springConfig),
              height: reactMotion.spring(rect.height, springConfig)
            }, nivoColors.interpolateColor(rect.data.color, springConfig))
          };
        })
      }, function (interpolatedStyles) {
        return React__default.createElement(React.Fragment, null, interpolatedStyles.map(function (_ref) {
          var key = _ref.key,
              style = _ref.style,
              data = _ref.data;
          var color = nivoColors.getInterpolatedColor(style);
          return React__default.createElement(component, {
            key: key,
            index: Number(key),
            data: data,
            x: style.x,
            y: style.y,
            width: Math.max(style.width, 0),
            height: Math.max(style.height, 0),
            color: color,
            onMouseEnter: partial(_this2.handleMouseEnter, data),
            onMouseMove: partial(_this2.handleMouseEnter, data),
            onMouseLeave: partial(_this2.handleMouseLeave, data),
            onClick: partial(_this2.handleClick, data)
          });
        }));
      }));
    }
  }]);
  return BulletRects;
}(React.Component);
var EnhancedBulletRects = compose(withPropsOnChange(['data', 'layout', 'reverse', 'scale', 'height'], function (_ref2) {
  var data = _ref2.data,
      layout = _ref2.layout,
      reverse = _ref2.reverse,
      scale = _ref2.scale,
      height = _ref2.height;
  return {
    rects: computeRects({
      data: data,
      layout: layout,
      reverse: reverse,
      scale: scale,
      height: height
    })
  };
}), pure)(BulletRects);
EnhancedBulletRects.displayName = 'BulletRects';

var BulletRectsItem = function (_PureComponent) {
  _inherits(BulletRectsItem, _PureComponent);
  var _super = _createSuper(BulletRectsItem);
  function BulletRectsItem() {
    _classCallCheck(this, BulletRectsItem);
    return _super.apply(this, arguments);
  }
  _createClass(BulletRectsItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          width = _this$props.width,
          height = _this$props.height,
          color = _this$props.color,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseMove = _this$props.onMouseMove,
          onMouseLeave = _this$props.onMouseLeave,
          onClick = _this$props.onClick;
      return React__default.createElement("rect", {
        x: x,
        y: y,
        width: width,
        height: height,
        fill: color,
        onMouseMove: onMouseMove,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        onClick: onClick
      });
    }
  }]);
  return BulletRectsItem;
}(React.PureComponent);

var BulletMarkersItem = function (_PureComponent) {
  _inherits(BulletMarkersItem, _PureComponent);
  var _super = _createSuper(BulletMarkersItem);
  function BulletMarkersItem() {
    _classCallCheck(this, BulletMarkersItem);
    return _super.apply(this, arguments);
  }
  _createClass(BulletMarkersItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          size = _this$props.size,
          rotation = _this$props.rotation,
          color = _this$props.color,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseMove = _this$props.onMouseMove,
          onMouseLeave = _this$props.onMouseLeave,
          onClick = _this$props.onClick;
      return React__default.createElement("line", {
        transform: "rotate(".concat(rotation, ", ").concat(x, ", ").concat(y, ")"),
        x1: x,
        x2: x,
        y1: y - size / 2,
        y2: y + size / 2,
        fill: "none",
        stroke: color,
        strokeWidth: "5",
        onMouseMove: onMouseMove,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        onClick: onClick
      });
    }
  }]);
  return BulletMarkersItem;
}(React.PureComponent);

var BulletItem = function (_Component) {
  _inherits(BulletItem, _Component);
  var _super = _createSuper(BulletItem);
  function BulletItem() {
    var _this;
    _classCallCheck(this, BulletItem);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.handleRangeTooltip = function (showTooltip, range, event) {
      var theme = _this.props.theme;
      showTooltip( React__default.createElement(nivoTooltip.BasicTooltip, {
        id: React__default.createElement("span", null, React__default.createElement("strong", null, range.v0), " to ", React__default.createElement("strong", null, range.v1)),
        enableChip: true,
        color: range.color,
        theme: theme
      }), event);
    };
    _this.handleMeasureTooltip = function (showTooltip, measure, event) {
      var theme = _this.props.theme;
      showTooltip( React__default.createElement(nivoTooltip.BasicTooltip, {
        id: React__default.createElement("strong", null, measure.v1),
        enableChip: true,
        color: measure.color,
        theme: theme
      }), event);
    };
    _this.handleMarkerTooltip = function (showTooltip, marker, event) {
      var theme = _this.props.theme;
      showTooltip( React__default.createElement(nivoTooltip.BasicTooltip, {
        id: React__default.createElement("strong", null, marker.value),
        enableChip: true,
        color: marker.color,
        theme: theme
      }), event);
    };
    _this.handleRangeClick = function (range, event) {
      var _this$props = _this.props,
          id = _this$props.id,
          onRangeClick = _this$props.onRangeClick;
      onRangeClick(_objectSpread2({
        id: id
      }, range), event);
    };
    _this.handleMeasureClick = function (measure, event) {
      var _this$props2 = _this.props,
          id = _this$props2.id,
          onMeasureClick = _this$props2.onMeasureClick;
      onMeasureClick(_objectSpread2({
        id: id
      }, measure), event);
    };
    _this.handleMarkerClick = function (marker, event) {
      var _this$props3 = _this.props,
          id = _this$props3.id,
          onMarkerClick = _this$props3.onMarkerClick;
      onMarkerClick(_objectSpread2({
        id: id
      }, marker), event);
    };
    return _this;
  }
  _createClass(BulletItem, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props4 = this.props,
          id = _this$props4.id,
          scale = _this$props4.scale,
          layout = _this$props4.layout,
          reverse = _this$props4.reverse,
          axisPosition = _this$props4.axisPosition,
          x = _this$props4.x,
          y = _this$props4.y,
          width = _this$props4.width,
          height = _this$props4.height,
          _title = _this$props4.title,
          titlePosition = _this$props4.titlePosition,
          titleAlign = _this$props4.titleAlign,
          titleOffsetX = _this$props4.titleOffsetX,
          titleOffsetY = _this$props4.titleOffsetY,
          titleRotation = _this$props4.titleRotation,
          computedRanges = _this$props4.computedRanges,
          rangeComponent = _this$props4.rangeComponent,
          computedMeasures = _this$props4.computedMeasures,
          measureComponent = _this$props4.measureComponent,
          measureHeight = _this$props4.measureHeight,
          computedMarkers = _this$props4.computedMarkers,
          markerComponent = _this$props4.markerComponent,
          markerHeight = _this$props4.markerHeight,
          theme = _this$props4.theme,
          showTooltip = _this$props4.showTooltip,
          hideTooltip = _this$props4.hideTooltip,
          animate = _this$props4.animate,
          motionStiffness = _this$props4.motionStiffness,
          motionDamping = _this$props4.motionDamping;
      var motionProps = {
        animate: animate,
        motionStiffness: motionStiffness,
        motionDamping: motionDamping
      };
      var rangeNodes = React__default.createElement(EnhancedBulletRects, Object.assign({
        data: computedRanges,
        scale: scale,
        layout: layout,
        reverse: reverse,
        x: 0,
        y: 0,
        width: width,
        height: height,
        component: rangeComponent,
        onMouseEnter: partial(this.handleRangeTooltip, showTooltip),
        onMouseLeave: hideTooltip,
        onClick: this.handleRangeClick
      }, motionProps));
      var markerNodes = React__default.createElement(BulletMarkers, Object.assign({
        markers: computedMarkers,
        scale: scale,
        layout: layout,
        reverse: reverse,
        height: height,
        markerSize: markerHeight,
        component: markerComponent,
        onMouseEnter: partial(this.handleMarkerTooltip, showTooltip),
        onMouseLeave: hideTooltip,
        onClick: this.handleMarkerClick
      }, motionProps));
      var axisX = 0;
      var axisY = 0;
      if (layout === 'horizontal' && axisPosition === 'after') {
        axisY = height;
      } else if (layout === 'vertical' && axisPosition === 'after') {
        axisX = height;
      }
      var axis = React__default.createElement("g", {
        transform: "translate(".concat(axisX, ",").concat(axisY, ")")
      }, React__default.createElement(nivoAxes.Axis, {
        axis: layout === 'horizontal' ? 'x' : 'y',
        length: layout === 'horizontal' ? width : height,
        scale: scale,
        ticksPosition: axisPosition
      }));
      var title = _title || id;
      var titleX;
      var titleY;
      if (layout === 'horizontal') {
        titleX = titlePosition === 'before' ? titleOffsetX : width + titleOffsetX;
        titleY = height / 2 + titleOffsetY;
      } else {
        titleX = height / 2 + titleOffsetX;
        titleY = titlePosition === 'before' ? titleOffsetY : width + titleOffsetY;
      }
      var titleNode = React__default.createElement("g", {
        transform: "translate(".concat(titleX, ",").concat(titleY, ") rotate(").concat(titleRotation, ")")
      }, isString(title) ? React__default.createElement("text", {
        style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
          dominantBaseline: 'central',
          textAnchor: titleAlign
        })
      }, title) : title);
      if (animate !== true) {
        return React__default.createElement("g", {
          transform: "translate(".concat(x, ",").concat(y, ")")
        }, rangeNodes, React__default.createElement(EnhancedBulletRects, Object.assign({
          data: computedMeasures,
          scale: scale,
          layout: layout,
          reverse: reverse,
          x: 0,
          y: (height - measureHeight) / 2,
          width: width,
          height: measureHeight,
          component: measureComponent,
          onMouseEnter: partial(this.handleMeasureTooltip, showTooltip),
          onMouseLeave: hideTooltip,
          onClick: this.handleMeasureClick
        }, motionProps)), axis, markerNodes, titleNode);
      }
      var springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness
      };
      return React__default.createElement(reactMotion.Motion, {
        style: {
          x: reactMotion.spring(x, springConfig),
          y: reactMotion.spring(y, springConfig),
          measuresY: reactMotion.spring((height - measureHeight) / 2, springConfig)
        }
      }, function (values) {
        return React__default.createElement("g", {
          transform: "translate(".concat(values.x, ",").concat(values.y, ")")
        }, rangeNodes, React__default.createElement(EnhancedBulletRects, Object.assign({
          data: computedMeasures,
          scale: scale,
          layout: layout,
          reverse: reverse,
          x: 0,
          y: values.measuresY,
          width: width,
          height: measureHeight,
          component: measureComponent,
          onMouseEnter: partial(_this2.handleMeasureTooltip, showTooltip),
          onMouseLeave: hideTooltip,
          onClick: _this2.handleMeasureClick
        }, motionProps)), axis, markerNodes, titleNode);
      });
    }
  }]);
  return BulletItem;
}(React.Component);
var EnhancedBulletItem = compose(defaultProps({
  layout: 'horizontal',
  reverse: false,
  axisPosition: 'after',
  titlePosition: 'before',
  titleAlign: 'middle',
  titleRotation: 0,
  titleOffsetX: 0,
  titleOffsetY: 0,
  rangeComponent: BulletRectsItem,
  rangeColors: 'seq:cool',
  onRangeClick: nivoCore.noop,
  measureComponent: BulletRectsItem,
  measureColors: 'seq:red_purple',
  onMeasureClick: nivoCore.noop,
  markers: [],
  markerComponent: BulletMarkersItem,
  markerColors: 'seq:red_purple',
  onMarkerClick: nivoCore.noop,
  showTooltip: nivoCore.noop,
  hideTooltip: nivoCore.noop
}), nivoCore.withMotion(), withPropsOnChange(['rangeColors', 'scale'], function (_ref) {
  var rangeColors = _ref.rangeColors,
      scale = _ref.scale;
  return {
    rangeColorScale: nivoCore.getColorScale(rangeColors, scale, true)
  };
}), withPropsOnChange(['ranges', 'rangeColorScale'], function (_ref2) {
  var ranges = _ref2.ranges,
      rangeColorScale = _ref2.rangeColorScale;
  return {
    computedRanges: stackValues(ranges, rangeColorScale)
  };
}), withPropsOnChange(['measureColors', 'scale'], function (_ref3) {
  var measureColors = _ref3.measureColors,
      scale = _ref3.scale;
  return {
    measureColorScale: nivoCore.getColorScale(measureColors, scale)
  };
}), withPropsOnChange(['measures', 'measureColorScale'], function (_ref4) {
  var measures = _ref4.measures,
      measureColorScale = _ref4.measureColorScale;
  return {
    computedMeasures: stackValues(measures, measureColorScale)
  };
}), withPropsOnChange(['markerColors', 'scale'], function (_ref5) {
  var markerColors = _ref5.markerColors,
      scale = _ref5.scale;
  return {
    markerColorScale: nivoCore.getColorScale(markerColors, scale)
  };
}), withPropsOnChange(['markers', 'markerColorScale'], function (_ref6) {
  var markers = _ref6.markers,
      markerColorScale = _ref6.markerColorScale;
  return {
    computedMarkers: markers.map(function (marker, index) {
      return {
        value: marker,
        index: index,
        color: markerColorScale(markerColorScale.type === 'sequential' ? marker : index)
      };
    })
  };
}), pure)(BulletItem);
EnhancedBulletItem.displayName = 'BulletItem';

var commonPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.node,
    ranges: PropTypes.arrayOf(PropTypes.number).isRequired,
    measures: PropTypes.arrayOf(PropTypes.number).isRequired,
    markers: PropTypes.arrayOf(PropTypes.number)
  })).isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  reverse: PropTypes.bool.isRequired,
  spacing: PropTypes.number.isRequired,
  titlePosition: PropTypes.oneOf(['before', 'after']).isRequired,
  titleAlign: PropTypes.oneOf(['start', 'middle', 'end']).isRequired,
  titleOffsetX: PropTypes.number.isRequired,
  titleOffsetY: PropTypes.number.isRequired,
  titleRotation: PropTypes.number.isRequired,
  rangeColors: PropTypes.any.isRequired,
  rangeBorderWidth: PropTypes.number.isRequired,
  rangeBorderColor: PropTypes.any.isRequired,
  onRangeClick: PropTypes.func,
  measureColors: PropTypes.any.isRequired,
  measureSize: PropTypes.number.isRequired,
  measureBorderWidth: PropTypes.number.isRequired,
  measureBorderColor: PropTypes.any.isRequired,
  onMeasureClick: PropTypes.func,
  markerColors: PropTypes.any.isRequired,
  markerSize: PropTypes.number.isRequired,
  onMarkerClick: PropTypes.func,
  axisPosition: PropTypes.oneOf(['before', 'after']).isRequired,
  theme: nivoCore.themePropType.isRequired,
  overrides: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    reverse: PropTypes.bool,
    rangeColors: PropTypes.any,
    rangeBorderWidth: PropTypes.number,
    rangeBorderColor: PropTypes.any,
    measureColors: PropTypes.any,
    measureBorderWidth: PropTypes.number,
    measureBorderColor: PropTypes.any,
    axis: PropTypes.shape({
      position: PropTypes.oneOf(['before', 'after']),
      min: PropTypes.number,
      max: PropTypes.number
    })
  })).isRequired
};
var BulletPropTypes = _objectSpread2(_objectSpread2({}, commonPropTypes), {}, {
  role: PropTypes.string.isRequired
});
var commonDefaultProps = {
  layout: EnhancedBulletItem.defaultProps.layout,
  reverse: EnhancedBulletItem.defaultProps.reverse,
  spacing: 30,
  titlePosition: EnhancedBulletItem.defaultProps.titlePosition,
  titleAlign: EnhancedBulletItem.defaultProps.titleAlign,
  titleOffsetX: EnhancedBulletItem.defaultProps.titleOffsetX,
  titleOffsetY: EnhancedBulletItem.defaultProps.titleOffsetY,
  titleRotation: EnhancedBulletItem.defaultProps.titleRotation,
  rangeBorderWidth: 0,
  rangeBorderColor: {
    from: 'color'
  },
  measureSize: 0.4,
  measureBorderWidth: 0,
  measureBorderColor: {
    from: 'color'
  },
  markerSize: 0.6,
  markerColors: EnhancedBulletItem.defaultProps.markerColors,
  axisPosition: EnhancedBulletItem.defaultProps.axisPosition,
  rangeColors: EnhancedBulletItem.defaultProps.rangeColors,
  measureColors: EnhancedBulletItem.defaultProps.measureColors,
  isInteractive: true,
  onClick: nivoCore.noop,
  overrides: []
};
var BulletDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  role: 'img'
});

var props = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BulletPropTypes: BulletPropTypes,
  BulletDefaultProps: BulletDefaultProps
});

var commonEnhancers = [nivoCore.withDimensions(), nivoCore.withTheme()];
var enhance = (function (Component) {
  var implDefaultProps = props["".concat(Component.displayName, "DefaultProps")];
  switch (Component.displayName) {
    case 'Bullet':
      return compose.apply(void 0, [defaultProps(implDefaultProps)].concat(commonEnhancers, [nivoCore.withMotion(), pure]))(Component);
  }
  return Component;
});

var Bullet = function (_Component) {
  _inherits(Bullet, _Component);
  var _super = _createSuper(Bullet);
  function Bullet() {
    _classCallCheck(this, Bullet);
    return _super.apply(this, arguments);
  }
  _createClass(Bullet, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          layout = _this$props.layout,
          spacing = _this$props.spacing,
          measureSize = _this$props.measureSize,
          markerSize = _this$props.markerSize,
          reverse = _this$props.reverse,
          axisPosition = _this$props.axisPosition,
          margin = _this$props.margin,
          width = _this$props.width,
          height = _this$props.height,
          outerWidth = _this$props.outerWidth,
          outerHeight = _this$props.outerHeight,
          titlePosition = _this$props.titlePosition,
          titleAlign = _this$props.titleAlign,
          titleOffsetX = _this$props.titleOffsetX,
          titleOffsetY = _this$props.titleOffsetY,
          titleRotation = _this$props.titleRotation,
          rangeComponent = _this$props.rangeComponent,
          rangeColors = _this$props.rangeColors,
          measureComponent = _this$props.measureComponent,
          measureColors = _this$props.measureColors,
          markerComponent = _this$props.markerComponent,
          markerColors = _this$props.markerColors,
          theme = _this$props.theme,
          animate = _this$props.animate,
          motionStiffness = _this$props.motionStiffness,
          motionDamping = _this$props.motionDamping,
          isInteractive = _this$props.isInteractive,
          onRangeClick = _this$props.onRangeClick,
          onMeasureClick = _this$props.onMeasureClick,
          onMarkerClick = _this$props.onMarkerClick,
          role = _this$props.role;
      var itemHeight;
      if (layout === 'horizontal') {
        itemHeight = (height - spacing * (data.length - 1)) / data.length;
      } else {
        itemHeight = (width - spacing * (data.length - 1)) / data.length;
      }
      var measureHeight = itemHeight * measureSize;
      var markerHeight = itemHeight * markerSize;
      var enhancedData = data.map(function (d) {
        var all = [].concat(_toConsumableArray(d.ranges), _toConsumableArray(d.measures), _toConsumableArray(d.markers));
        var max = Math.max.apply(Math, _toConsumableArray(all));
        var min = Math.min.apply(Math, _toConsumableArray(all).concat([0]));
        var scale = d3Scale.scaleLinear().domain([min, max]);
        if (layout === 'horizontal') {
          scale.range(reverse === true ? [width, 0] : [0, width]);
        } else {
          scale.range(reverse === true ? [0, height] : [height, 0]);
        }
        return _objectSpread2(_objectSpread2({}, d), {}, {
          scale: scale
        });
      });
      return React__default.createElement(nivoCore.Container, {
        isInteractive: isInteractive,
        theme: theme,
        animate: animate,
        motionStiffness: motionStiffness,
        motionDamping: motionDamping
      }, function (_ref) {
        var showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip;
        return React__default.createElement(nivoCore.SvgWrapper, {
          width: outerWidth,
          height: outerHeight,
          margin: margin,
          theme: theme,
          role: role
        }, enhancedData.map(function (d, i) {
          return React__default.createElement(EnhancedBulletItem, Object.assign({
            key: d.id
          }, d, {
            layout: layout,
            reverse: reverse,
            x: layout === 'vertical' ? itemHeight * i + spacing * i : 0,
            y: layout === 'horizontal' ? itemHeight * i + spacing * i : 0,
            width: width,
            height: itemHeight,
            titlePosition: titlePosition,
            titleAlign: titleAlign,
            titleOffsetX: titleOffsetX,
            titleOffsetY: titleOffsetY,
            titleRotation: titleRotation,
            measureHeight: measureHeight,
            markerHeight: markerHeight,
            rangeComponent: rangeComponent,
            rangeColors: rangeColors,
            measureComponent: measureComponent,
            measureColors: measureColors,
            markerComponent: markerComponent,
            markerColors: markerColors,
            theme: theme,
            axisPosition: axisPosition,
            animate: animate,
            motionStiffness: motionStiffness,
            motionDamping: motionDamping,
            showTooltip: showTooltip,
            hideTooltip: hideTooltip,
            onRangeClick: onRangeClick,
            onMeasureClick: onMeasureClick,
            onMarkerClick: onMarkerClick
          }));
        }));
      });
    }
  }]);
  return Bullet;
}(React.Component);
Bullet.displayName = 'Bullet';
var Bullet$1 = setDisplayName(Bullet.displayName)(enhance(Bullet));

var ResponsiveBullet = function ResponsiveBullet(props) {
  return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(Bullet$1, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

exports.Bullet = Bullet$1;
exports.BulletDefaultProps = BulletDefaultProps;
exports.BulletItem = EnhancedBulletItem;
exports.BulletPropTypes = BulletPropTypes;
exports.ResponsiveBullet = ResponsiveBullet;
//# sourceMappingURL=nivo-bullet.cjs.js.map
