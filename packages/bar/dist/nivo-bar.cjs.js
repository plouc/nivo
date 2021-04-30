'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactMotion = require('react-motion');
var nivoCore = require('@bitbloom/nivo-core');
var nivoAxes = require('@bitbloom/nivo-axes');
var nivoLegends = require('@bitbloom/nivo-legends');
var min = _interopDefault(require('lodash/min'));
var max = _interopDefault(require('lodash/max'));
var range = _interopDefault(require('lodash/range'));
var d3Scale = require('d3-scale');
var flattenDepth = _interopDefault(require('lodash/flattenDepth'));
var d3Shape = require('d3-shape');
var lodash = require('lodash');
var setDisplayName = _interopDefault(require('recompose/setDisplayName'));
var recompose = require('recompose');
var defaultProps = _interopDefault(require('recompose/defaultProps'));
var withPropsOnChange = _interopDefault(require('recompose/withPropsOnChange'));
var pure = _interopDefault(require('recompose/pure'));
var nivoColors = require('@bitbloom/nivo-colors');
var PropTypes = _interopDefault(require('prop-types'));
var compose = _interopDefault(require('recompose/compose'));
var nivoTooltip = require('@bitbloom/nivo-tooltip');
var nivoAnnotations = require('@bitbloom/nivo-annotations');
var uniqBy = _interopDefault(require('lodash/uniqBy'));

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

var getIndexedScale = function getIndexedScale(data, getIndex, range, padding) {
  return d3Scale.scaleBand().rangeRound(range).domain(data.map(getIndex)).padding(padding);
};

var getGroupedScale = function getGroupedScale(data, keys, _minValue, _maxValue, range) {
  var allValues = data.reduce(function (acc, entry) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(keys.map(function (k) {
      return entry[k];
    })));
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
  return d3Scale.scaleLinear().rangeRound(range).domain([minValue, maxValue]);
};
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
      padding = _ref$padding === void 0 ? 0 : _ref$padding,
      _ref$innerPadding = _ref.innerPadding,
      innerPadding = _ref$innerPadding === void 0 ? 0 : _ref$innerPadding;
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
            key: "".concat(key, ".").concat(barData.indexValue),
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
  return {
    xScale: xScale,
    yScale: yScale,
    bars: bars
  };
};
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
      padding = _ref2$padding === void 0 ? 0 : _ref2$padding,
      _ref2$innerPadding = _ref2.innerPadding,
      innerPadding = _ref2$innerPadding === void 0 ? 0 : _ref2$innerPadding;
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
            key: "".concat(key, ".").concat(barData.indexValue),
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
  return {
    xScale: xScale,
    yScale: yScale,
    bars: bars
  };
};
var generateGroupedBars = function generateGroupedBars(options) {
  return options.layout === 'vertical' ? generateVerticalGroupedBars(options) : generateHorizontalGroupedBars(options);
};

var getStackedScale = function getStackedScale(data, _minValue, _maxValue, range) {
  var allValues = flattenDepth(data, 2);
  var minValue = _minValue;
  if (minValue === 'auto') {
    minValue = min(allValues);
  }
  var maxValue = _maxValue;
  if (maxValue === 'auto') {
    maxValue = max(allValues);
  }
  return d3Scale.scaleLinear().rangeRound(range).domain([minValue, maxValue]);
};
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
      padding = _ref$padding === void 0 ? 0 : _ref$padding,
      _ref$innerPadding = _ref.innerPadding,
      innerPadding = _ref$innerPadding === void 0 ? 0 : _ref$innerPadding;
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
            key: "".concat(stackedDataItem.key, ".").concat(index),
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
  return {
    xScale: xScale,
    yScale: yScale,
    bars: bars
  };
};
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
      padding = _ref2$padding === void 0 ? 0 : _ref2$padding,
      _ref2$innerPadding = _ref2.innerPadding,
      innerPadding = _ref2$innerPadding === void 0 ? 0 : _ref2$innerPadding;
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
            key: "".concat(stackedDataItem.key, ".").concat(index),
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
  return {
    xScale: xScale,
    yScale: yScale,
    bars: bars
  };
};
var generateStackedBars = function generateStackedBars(options) {
  return options.layout === 'vertical' ? generateVerticalStackedBars(options) : generateHorizontalStackedBars(options);
};

var getLegendDataForKeys = function getLegendDataForKeys(bars, layout, direction, groupMode, reverse) {
  var data = lodash.uniqBy(bars.map(function (bar) {
    return {
      id: bar.data.id,
      label: bar.data.id,
      color: bar.color,
      fill: bar.data.fill
    };
  }), function (_ref) {
    var id = _ref.id;
    return id;
  });
  if (layout === 'vertical' && groupMode === 'stacked' && direction === 'column' && reverse !== true || layout === 'horizontal' && groupMode === 'stacked' && reverse === true) {
    data.reverse();
  }
  return data;
};
var getLegendDataForIndexes = function getLegendDataForIndexes(bars) {
  return lodash.uniqBy(bars.map(function (bar) {
    return {
      id: bar.data.indexValue,
      label: bar.data.indexValue,
      color: bar.color,
      fill: bar.data.fill
    };
  }), function (_ref2) {
    var id = _ref2.id;
    return id;
  });
};
var getLegendData = function getLegendData(_ref3) {
  var from = _ref3.from,
      bars = _ref3.bars,
      layout = _ref3.layout,
      direction = _ref3.direction,
      groupMode = _ref3.groupMode,
      reverse = _ref3.reverse;
  if (from === 'indexes') {
    return getLegendDataForIndexes(bars);
  }
  return getLegendDataForKeys(bars, layout, direction, groupMode, reverse);
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var getIndexedScale$1 = function getIndexedScale(data, getIndex, range, padding) {
  return d3Scale.scaleBand().rangeRound(range).domain(data.map(getIndex)).padding(padding);
};
var generateWaterfallData = function generateWaterfallData(data, keys) {
  var accumulativeVal = 0;
  var _keys = _slicedToArray(keys, 1),
      key = _keys[0];
  var waterfallData = data.map(function (d) {
    var result;
    if (d.columnType === "total") {
      accumulativeVal = d[key];
      result = [0, accumulativeVal];
    } else result = [accumulativeVal, accumulativeVal += d[key]];
    result.data = d;
    return result;
  });
  waterfallData.key = key;
  return waterfallData;
};
var getWaterfallScale = function getWaterfallScale(data, _minValue, _maxValue, range) {
  var allValues = flattenDepth(data, 2);
  var minValue = _minValue;
  if (minValue === 'auto') {
    minValue = min(allValues);
  }
  var maxValue = _maxValue;
  if (maxValue === 'auto') {
    maxValue = max(allValues);
  }
  return d3Scale.scaleLinear().rangeRound(range).domain([minValue, maxValue]);
};
var generateVerticalWaterfallBars = function generateVerticalWaterfallBars(_ref) {
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
      padding = _ref$padding === void 0 ? 0 : _ref$padding;
  var key = keys[0];
  var waterfallData = generateWaterfallData(data, keys);
  var xScale = getIndexedScale$1(data, getIndex, [0, width], padding);
  var yRange = reverse ? [0, height] : [height, 0];
  var yScale = getWaterfallScale(waterfallData, minValue, maxValue, yRange);
  var bars = [];
  var barWidth = xScale.bandwidth();
  var getY = function getY(d) {
    return yScale(max(d));
  };
  var getHeight = function getHeight(d, y) {
    return yScale(min(d)) - y;
  };
  if (reverse) {
    getY = function getY(d) {
      return yScale(min(d));
    };
    getHeight = function getHeight(d, y) {
      return yScale(max(d)) - y;
    };
  }
  range(xScale.domain().length).forEach(function (index) {
    var x = xScale(getIndex(data[index]));
    var y = getY(waterfallData[index]);
    var barHeight = getHeight(waterfallData[index], y);
    if (barWidth > 0) {
      var barData = {
        id: key,
        value: data[index][key],
        index: index,
        indexValue: getIndex(data[index]),
        data: data[index]
      };
      if (data[index + 1]) {
        barData.line = {
          x1: x + barWidth,
          x2: (data[index + 1][key] === 0 ? barWidth : 0) + xScale(getIndex(data[index + 1])),
          y1: data[index][key] > 0 ? y : y + barHeight,
          y2: data[index + 1].columnType === 'relative' ? data[index][key] > 0 ? y : y + barHeight : getY(waterfallData[index + 1])
        };
      }
      bars.push({
        key: "".concat(key, ".").concat(barData.indexValue),
        data: barData,
        x: x,
        y: y,
        width: barWidth,
        height: barHeight,
        color: getColor(barData)
      });
    }
  });
  return {
    xScale: xScale,
    yScale: yScale,
    bars: bars
  };
};
var generateHorizontalWaterfallBars = function generateHorizontalWaterfallBars(_ref2) {
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
      padding = _ref2$padding === void 0 ? 0 : _ref2$padding;
  var key = keys[0];
  var waterfallData = generateWaterfallData(data, keys);
  var xRange = reverse ? [width, 0] : [0, width];
  var xScale = getWaterfallScale(waterfallData, minValue, maxValue, xRange);
  var yScale = getIndexedScale$1(data, getIndex, [height, 0], padding);
  var bars = [];
  var barHeight = yScale.bandwidth();
  var getX = function getX(d) {
    return xScale(min(d));
  };
  var getWidth = function getWidth(d, x) {
    return xScale(max(d)) - x;
  };
  if (reverse) {
    getX = function getX(d) {
      return xScale(max(d));
    };
    getWidth = function getWidth(d, x) {
      return xScale(min(d)) - x;
    };
  }
  range(yScale.domain().length).forEach(function (index) {
    var y = yScale(getIndex(data[index]));
    var x = getX(waterfallData[index]);
    var barWidth = getWidth(waterfallData[index], x);
    if (barHeight > 0) {
      var barData = {
        id: key,
        value: data[index][key],
        index: index,
        indexValue: getIndex(data[index]),
        data: data[index]
      };
      if (data[index + 1]) {
        barData.line = {
          x1: data[index][key] >= 0 ? x + barWidth : x,
          x2: data[index + 1].columnType === 'relative' ? data[index][key] >= 0 ? x + barWidth : x : getX(waterfallData[index + 1]) + getWidth(waterfallData[index + 1], getX(waterfallData[index + 1])),
          y1: y,
          y2: (data[index + 1][key] === 0 ? 0 : barHeight) + yScale(getIndex(data[index + 1]))
        };
      }
      bars.push({
        key: "".concat(key, ".").concat(barData.indexValue),
        data: barData,
        x: x,
        y: y,
        width: barWidth,
        height: barHeight,
        color: getColor(barData)
      });
    }
  });
  return {
    xScale: xScale,
    yScale: yScale,
    bars: bars
  };
};
var generateWaterfallBars = function generateWaterfallBars(options) {
  return options.layout === 'vertical' ? generateVerticalWaterfallBars(options) : generateHorizontalWaterfallBars(options);
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
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      tooltip = _ref.tooltip,
      theme = _ref.theme;
  var handleTooltip = function handleTooltip(e) {
    return showTooltip(tooltip, e);
  };
  var handleMouseEnter = function handleMouseEnter(e) {
    onMouseEnter(data, e);
    showTooltip(tooltip, e);
  };
  var handleMouseLeave = function handleMouseLeave(e) {
    onMouseLeave(data, e);
    hideTooltip(e);
  };
  return React__default.createElement("g", {
    transform: "translate(".concat(x, ", ").concat(y, ")")
  }, React__default.createElement("rect", {
    width: width,
    height: height,
    rx: borderRadius,
    ry: borderRadius,
    fill: data.fill ? data.fill : color,
    strokeWidth: borderWidth,
    stroke: borderColor,
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleTooltip,
    onMouseLeave: handleMouseLeave,
    onClick: onClick
  }), shouldRenderLabel && React__default.createElement("text", {
    x: width / 2,
    y: height / 2,
    textAnchor: "middle",
    dominantBaseline: "central",
    style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
      pointerEvents: 'none',
      fill: labelColor
    })
  }, label));
};
var enhance = compose(withPropsOnChange(['data', 'color', 'onClick'], function (_ref2) {
  var data = _ref2.data,
      color = _ref2.color,
      _onClick = _ref2.onClick;
  return {
    onClick: function onClick(event) {
      return _onClick(_objectSpread2({
        color: color
      }, data), event);
    }
  };
}), withPropsOnChange(['data', 'color', 'theme', 'tooltip', 'getTooltipLabel', 'tooltipFormat'], function (_ref3) {
  var data = _ref3.data,
      color = _ref3.color,
      theme = _ref3.theme,
      tooltip = _ref3.tooltip,
      getTooltipLabel = _ref3.getTooltipLabel,
      tooltipFormat = _ref3.tooltipFormat;
  return {
    tooltip: React__default.createElement(nivoTooltip.BasicTooltip, {
      id: getTooltipLabel(data),
      value: data.value,
      enableChip: true,
      color: color,
      theme: theme,
      format: tooltipFormat,
      renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _objectSpread2({
        color: color,
        theme: theme
      }, data)) : null
    })
  };
}), pure);
var BarItem$1 = enhance(BarItem);

var BarPropTypes = _objectSpread2(_objectSpread2({
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  getIndex: PropTypes.func.isRequired,
  keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  layers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['grid', 'axes', 'bars', 'markers', 'legends', 'annotations']), PropTypes.func])).isRequired,
  groupMode: PropTypes.oneOf(['stacked', 'grouped']).isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  reverse: PropTypes.bool.isRequired,
  minValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
  maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
  padding: PropTypes.number.isRequired,
  innerPadding: PropTypes.number.isRequired,
  axisTop: nivoAxes.axisPropType,
  axisRight: nivoAxes.axisPropType,
  axisBottom: nivoAxes.axisPropType,
  axisLeft: nivoAxes.axisPropType,
  enableGridX: PropTypes.bool.isRequired,
  enableGridY: PropTypes.bool.isRequired,
  gridXValues: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))]),
  gridYValues: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))]),
  barComponent: PropTypes.func.isRequired,
  enableLabel: PropTypes.bool.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  getLabel: PropTypes.func.isRequired,
  labelSkipWidth: PropTypes.number.isRequired,
  labelSkipHeight: PropTypes.number.isRequired,
  labelTextColor: nivoColors.inheritedColorPropType.isRequired,
  getLabelTextColor: PropTypes.func.isRequired,
  labelLinkColor: nivoColors.inheritedColorPropType.isRequired,
  getLabelLinkColor: PropTypes.func.isRequired,
  colors: nivoColors.ordinalColorsPropType.isRequired,
  colorBy: nivoColors.colorPropertyAccessorPropType.isRequired,
  borderRadius: PropTypes.number.isRequired,
  getColor: PropTypes.func.isRequired
}, nivoCore.defsPropTypes), {}, {
  borderWidth: PropTypes.number.isRequired,
  borderColor: nivoColors.inheritedColorPropType.isRequired,
  getBorderColor: PropTypes.func.isRequired,
  overflow: PropTypes.bool,
  isInteractive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  tooltipLabel: PropTypes.func,
  getTooltipLabel: PropTypes.func.isRequired,
  tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  tooltip: PropTypes.func,
  legends: PropTypes.arrayOf(PropTypes.shape(_objectSpread2({
    dataFrom: PropTypes.oneOf(['indexes', 'keys']).isRequired
  }, nivoLegends.LegendPropShape))).isRequired,
  pixelRatio: PropTypes.number.isRequired
});
var BarSvgPropTypes = _objectSpread2(_objectSpread2({}, BarPropTypes), {}, {
  role: PropTypes.string.isRequired
});
var BarDefaultProps = {
  indexBy: 'id',
  keys: ['value'],
  layers: ['grid', 'axes', 'bars', 'markers', 'legends', 'annotations'],
  groupMode: 'stacked',
  layout: 'vertical',
  reverse: false,
  minValue: 'auto',
  maxValue: 'auto',
  padding: 0.1,
  innerPadding: 0,
  axisBottom: {},
  axisLeft: {},
  enableGridX: false,
  enableGridY: true,
  barComponent: BarItem$1,
  enableLabel: true,
  label: 'value',
  labelSkipWidth: 0,
  labelSkipHeight: 0,
  labelLinkColor: 'theme',
  labelTextColor: 'theme',
  colors: {
    scheme: 'nivo'
  },
  colorBy: 'id',
  defs: [],
  fill: [],
  borderRadius: 0,
  borderWidth: 0,
  borderColor: {
    from: 'color'
  },
  isInteractive: true,
  onClick: nivoCore.noop,
  onMouseEnter: nivoCore.noop,
  onMouseLeave: nivoCore.noop,
  legends: [],
  annotations: [],
  pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
};
var BarSvgDefaultProps = _objectSpread2(_objectSpread2({}, BarDefaultProps), {}, {
  role: 'img'
});

var enhance$1 = (function (Component) {
  return recompose.compose(defaultProps(BarDefaultProps), nivoCore.withTheme(), nivoCore.withDimensions(), nivoCore.withMotion(), withPropsOnChange(['colors', 'colorBy'], function (_ref) {
    var colors = _ref.colors,
        colorBy = _ref.colorBy;
    return {
      getColor: nivoColors.getOrdinalColorScale(colors, colorBy)
    };
  }), withPropsOnChange(['indexBy'], function (_ref2) {
    var indexBy = _ref2.indexBy;
    return {
      getIndex: nivoCore.getAccessorFor(indexBy)
    };
  }), withPropsOnChange(['labelTextColor', 'theme'], function (_ref3) {
    var labelTextColor = _ref3.labelTextColor,
        theme = _ref3.theme;
    return {
      getLabelTextColor: nivoColors.getInheritedColorGenerator(labelTextColor, theme)
    };
  }), withPropsOnChange(['labelLinkColor', 'theme'], function (_ref4) {
    var labelLinkColor = _ref4.labelLinkColor,
        theme = _ref4.theme;
    return {
      getLabelLinkColor: nivoColors.getInheritedColorGenerator(labelLinkColor, theme)
    };
  }), withPropsOnChange(['label', 'labelFormat'], function (_ref5) {
    var label = _ref5.label,
        labelFormat = _ref5.labelFormat;
    return {
      getLabel: nivoCore.getLabelGenerator(label, labelFormat)
    };
  }), withPropsOnChange(['borderColor', 'theme'], function (_ref6) {
    var borderColor = _ref6.borderColor,
        theme = _ref6.theme;
    return {
      getBorderColor: nivoColors.getInheritedColorGenerator(borderColor, theme)
    };
  }), withPropsOnChange(['tooltipLabel'], function (_ref7) {
    var tooltipLabel = _ref7.tooltipLabel;
    var getTooltipLabel = function getTooltipLabel(d) {
      return "".concat(d.id, " - ").concat(d.indexValue);
    };
    if (typeof tooltipLabel === 'function') {
      getTooltipLabel = tooltipLabel;
    }
    return {
      getTooltipLabel: getTooltipLabel
    };
  }), pure)(Component);
});

var BarAnnotations = function BarAnnotations(_ref) {
  var bars = _ref.bars,
      annotations = _ref.annotations,
      animate = _ref.animate,
      motionStiffness = _ref.motionStiffness,
      motionDamping = _ref.motionDamping;
  var boundAnnotations = nivoAnnotations.useAnnotations({
    items: bars,
    annotations: annotations,
    getPosition: function getPosition(bar) {
      return {
        x: bar.x + bar.width / 2,
        y: bar.y + bar.height / 2
      };
    },
    getDimensions: function getDimensions(bar, offset) {
      var width = bar.width + offset * 2;
      var height = bar.height + offset * 2;
      return {
        width: width,
        height: height,
        size: Math.max(width, height)
      };
    }
  });
  return boundAnnotations.map(function (annotation, i) {
    return React__default.createElement(nivoAnnotations.Annotation, Object.assign({
      key: i
    }, annotation, {
      containerWidth: innerWidth,
      containerHeight: innerHeight,
      animate: animate,
      motionStiffness: motionStiffness,
      motionDamping: motionDamping
    }));
  });
};

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
var Bar = function Bar(props) {
  var data = props.data,
      getIndex = props.getIndex,
      keys = props.keys,
      groupMode = props.groupMode,
      layout = props.layout,
      reverse = props.reverse,
      minValue = props.minValue,
      maxValue = props.maxValue,
      margin = props.margin,
      width = props.width,
      height = props.height,
      outerWidth = props.outerWidth,
      outerHeight = props.outerHeight,
      padding = props.padding,
      innerPadding = props.innerPadding,
      axisTop = props.axisTop,
      axisRight = props.axisRight,
      axisBottom = props.axisBottom,
      axisLeft = props.axisLeft,
      enableGridX = props.enableGridX,
      enableGridY = props.enableGridY,
      gridXValues = props.gridXValues,
      gridYValues = props.gridYValues,
      layers = props.layers,
      barComponent = props.barComponent,
      enableLabel = props.enableLabel,
      getLabel = props.getLabel,
      labelSkipWidth = props.labelSkipWidth,
      labelSkipHeight = props.labelSkipHeight,
      getLabelTextColor = props.getLabelTextColor,
      markers = props.markers,
      theme = props.theme,
      getColor = props.getColor,
      defs = props.defs,
      fill = props.fill,
      borderRadius = props.borderRadius,
      borderWidth = props.borderWidth,
      getBorderColor = props.getBorderColor,
      annotations = props.annotations,
      isInteractive = props.isInteractive,
      getTooltipLabel = props.getTooltipLabel,
      tooltipFormat = props.tooltipFormat,
      tooltip = props.tooltip,
      onClick = props.onClick,
      onMouseEnter = props.onMouseEnter,
      onMouseLeave = props.onMouseLeave,
      legends = props.legends,
      animate = props.animate,
      motionStiffness = props.motionStiffness,
      motionDamping = props.motionDamping,
      role = props.role;
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
  var shouldRenderLabel = function shouldRenderLabel(_ref5) {
    var width = _ref5.width,
        height = _ref5.height;
    if (!enableLabel) return false;
    if (labelSkipWidth > 0 && width < labelSkipWidth) return false;
    if (labelSkipHeight > 0 && height < labelSkipHeight) return false;
    return true;
  };
  var boundDefs = nivoCore.bindDefs(defs, result.bars, fill, {
    dataKey: 'data',
    targetKey: 'data.fill'
  });
  return React__default.createElement(nivoCore.Container, {
    isInteractive: isInteractive,
    theme: theme,
    animate: animate,
    motionStiffness: motionStiffness,
    motionDamping: motionDamping
  }, function (_ref6) {
    var showTooltip = _ref6.showTooltip,
        hideTooltip = _ref6.hideTooltip;
    var commonProps = {
      borderRadius: borderRadius,
      borderWidth: borderWidth,
      enableLabel: enableLabel,
      labelSkipWidth: labelSkipWidth,
      labelSkipHeight: labelSkipHeight,
      showTooltip: showTooltip,
      hideTooltip: hideTooltip,
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      theme: theme,
      getTooltipLabel: getTooltipLabel,
      tooltipFormat: tooltipFormat,
      tooltip: tooltip
    };
    var bars;
    if (animate === true) {
      bars = React__default.createElement(reactMotion.TransitionMotion, {
        key: "bars",
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
      }, function (interpolatedStyles) {
        return React__default.createElement("g", null, interpolatedStyles.map(function (_ref7) {
          var key = _ref7.key,
              style = _ref7.style,
              bar = _ref7.data;
          var baseProps = _objectSpread2(_objectSpread2({}, bar), style);
          return React__default.createElement(barComponent, _objectSpread2(_objectSpread2(_objectSpread2({
            key: key
          }, baseProps), commonProps), {}, {
            shouldRenderLabel: shouldRenderLabel(baseProps),
            width: Math.max(style.width, 0),
            height: Math.max(style.height, 0),
            label: getLabel(bar.data),
            labelColor: getLabelTextColor(baseProps, theme),
            borderColor: getBorderColor(baseProps),
            theme: theme
          }));
        }));
      });
    } else {
      bars = result.bars.map(function (d) {
        return React__default.createElement(barComponent, _objectSpread2(_objectSpread2(_objectSpread2({
          key: d.key
        }, d), commonProps), {}, {
          label: getLabel(d.data),
          shouldRenderLabel: shouldRenderLabel(d),
          labelColor: getLabelTextColor(d, theme),
          borderColor: getBorderColor(d),
          theme: theme
        }));
      });
    }
    var layerById = {
      grid: React__default.createElement(nivoAxes.Grid, {
        key: "grid",
        width: width,
        height: height,
        xScale: enableGridX ? result.xScale : null,
        yScale: enableGridY ? result.yScale : null,
        xValues: gridXValues,
        yValues: gridYValues
      }),
      axes: React__default.createElement(nivoAxes.Axes, {
        key: "axes",
        xScale: result.xScale,
        yScale: result.yScale,
        width: width,
        height: height,
        top: axisTop,
        right: axisRight,
        bottom: axisBottom,
        left: axisLeft
      }),
      bars: bars,
      markers: React__default.createElement(nivoCore.CartesianMarkers, {
        key: "markers",
        markers: markers,
        width: width,
        height: height,
        xScale: result.xScale,
        yScale: result.yScale,
        theme: theme
      }),
      legends: legends.map(function (legend, i) {
        var legendData = getLegendData({
          from: legend.dataFrom,
          bars: result.bars,
          layout: layout,
          direction: legend.direction,
          groupMode: groupMode,
          reverse: reverse
        });
        if (legendData === undefined) return null;
        return React__default.createElement(nivoLegends.BoxLegendSvg, Object.assign({
          key: i
        }, legend, {
          containerWidth: width,
          containerHeight: height,
          data: legendData,
          theme: theme
        }));
      }),
      annotations: React__default.createElement(BarAnnotations, Object.assign({
        key: "annotations",
        innerWidth: width,
        innerHeight: height,
        bars: result.bars,
        annotations: annotations
      }, motionProps))
    };
    return React__default.createElement(nivoCore.SvgWrapper, {
      width: outerWidth,
      height: outerHeight,
      margin: margin,
      defs: boundDefs,
      theme: theme,
      role: role
    }, layers.map(function (layer, i) {
      if (typeof layer === 'function') {
        return React__default.createElement(React.Fragment, {
          key: i
        }, layer(_objectSpread2(_objectSpread2(_objectSpread2({}, props), result), {}, {
          showTooltip: showTooltip,
          hideTooltip: hideTooltip
        })));
      }
      return layerById[layer];
    }));
  });
};
Bar.defaultProps = BarSvgDefaultProps;
var Bar$1 = setDisplayName('Bar')(enhance$1(Bar));

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

var findNodeUnderCursor = function findNodeUnderCursor(nodes, margin, x, y) {
  return nodes.find(function (node) {
    return nivoCore.isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y);
  });
};
var BarCanvas = function (_Component) {
  _inherits(BarCanvas, _Component);
  var _super = _createSuper(BarCanvas);
  function BarCanvas() {
    var _this;
    _classCallCheck(this, BarCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.handleMouseHover = function (showTooltip, hideTooltip) {
      return function (event) {
        if (!_this.bars) return;
        var _this$props = _this.props,
            margin = _this$props.margin,
            theme = _this$props.theme,
            tooltip = _this$props.tooltip,
            getTooltipLabel = _this$props.getTooltipLabel,
            tooltipFormat = _this$props.tooltipFormat;
        var _getRelativeCursor = nivoCore.getRelativeCursor(_this.surface, event),
            _getRelativeCursor2 = _slicedToArray(_getRelativeCursor, 2),
            x = _getRelativeCursor2[0],
            y = _getRelativeCursor2[1];
        var bar = findNodeUnderCursor(_this.bars, margin, x, y);
        if (bar !== undefined) {
          showTooltip( React__default.createElement(nivoTooltip.BasicTooltip, {
            id: getTooltipLabel(bar.data),
            value: bar.data.value,
            enableChip: true,
            color: bar.color,
            theme: theme,
            format: tooltipFormat,
            renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _objectSpread2({
              color: bar.color
            }, bar.data)) : null
          }), event);
        } else {
          hideTooltip();
        }
      };
    };
    _this.handleMouseLeave = function (hideTooltip) {
      return function () {
        hideTooltip();
      };
    };
    _this.handleClick = function (event) {
      if (!_this.bars) return;
      var _this$props2 = _this.props,
          margin = _this$props2.margin,
          onClick = _this$props2.onClick;
      var _getRelativeCursor3 = nivoCore.getRelativeCursor(_this.surface, event),
          _getRelativeCursor4 = _slicedToArray(_getRelativeCursor3, 2),
          x = _getRelativeCursor4[0],
          y = _getRelativeCursor4[1];
      var node = findNodeUnderCursor(_this.bars, margin, x, y);
      if (node !== undefined) onClick(node.data, event);
    };
    return _this;
  }
  _createClass(BarCanvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ctx = this.surface.getContext('2d');
      this.draw(this.props);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(props) {
      if (this.props.outerWidth !== props.outerWidth || this.props.outerHeight !== props.outerHeight || this.props.isInteractive !== props.isInteractive || this.props.theme !== props.theme) {
        return true;
      } else {
        this.draw(props);
        return false;
      }
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
          overflow = props.overflow,
          theme = props.theme,
          getColor = props.getColor,
          borderWidth = props.borderWidth,
          getBorderColor = props.getBorderColor,
          legends = props.legends,
          enableGridX = props.enableGridX,
          gridXValues = props.gridXValues,
          enableGridY = props.enableGridY,
          gridYValues = props.gridYValues;
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
      var result = groupMode === 'grouped' ? generateGroupedBars(options) : groupMode === 'waterfall' ? generateWaterfallBars(options) : generateStackedBars(options);
      this.bars = result.bars;
      this.ctx.fillStyle = theme.background;
      this.ctx.fillRect(0, 0, outerWidth, outerHeight);
      this.ctx.translate(margin.left, margin.top);
      if (theme.grid.line.strokeWidth > 0) {
        this.ctx.lineWidth = theme.grid.line.strokeWidth;
        this.ctx.strokeStyle = theme.grid.line.stroke;
        enableGridX && nivoAxes.renderGridLinesToCanvas(this.ctx, {
          width: width,
          height: height,
          scale: result.xScale,
          axis: 'x',
          values: gridXValues
        });
        enableGridY && nivoAxes.renderGridLinesToCanvas(this.ctx, {
          width: width,
          height: height,
          scale: result.yScale,
          axis: 'y',
          values: gridYValues
        });
      }
      this.ctx.strokeStyle = '#dddddd';
      var legendDataForKeys = uniqBy(result.bars.map(function (bar) {
        return {
          id: bar.data.id,
          label: bar.data.id,
          color: bar.color,
          fill: bar.data.fill
        };
      }).reverse(), function (_ref) {
        var id = _ref.id;
        return id;
      });
      var legendDataForIndexes = uniqBy(result.bars.map(function (bar) {
        return {
          id: bar.data.indexValue,
          label: bar.data.indexValue,
          color: bar.color,
          fill: bar.data.fill
        };
      }), function (_ref2) {
        var id = _ref2.id;
        return id;
      });
      legends.forEach(function (legend) {
        var legendData;
        if (legend.dataFrom === 'keys') {
          legendData = legendDataForKeys;
        } else if (legend.dataFrom === 'indexes') {
          legendData = legendDataForIndexes;
        }
        if (legendData === undefined) return null;
        nivoLegends.renderLegendToCanvas(_this2.ctx, _objectSpread2(_objectSpread2({}, legend), {}, {
          data: legendData,
          containerWidth: width,
          containerHeight: height,
          itemTextColor: '#999',
          symbolSize: 16,
          theme: theme
        }));
      });
      nivoAxes.renderAxesToCanvas(this.ctx, {
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
      if (!overflow) nivoCore.clip({
        ctx: this.ctx,
        margin: margin,
        width: outerWidth,
        height: outerHeight
      });
      result.bars.forEach(function (bar, index) {
        var x = bar.x,
            y = bar.y,
            color = bar.color,
            width = bar.width,
            height = bar.height;
        _this2.ctx.fillStyle = color;
        if (borderWidth > 0) {
          _this2.ctx.strokeStyle = getBorderColor(bar);
          _this2.ctx.lineWidth = borderWidth;
        }
        _this2.ctx.beginPath();
        _this2.ctx.rect(x, y, width, height);
        _this2.ctx.fill();
        if (bar.data.line && index < result.bars.length - 1) {
          var _bar$data$line = bar.data.line,
              x1 = _bar$data$line.x1,
              x2 = _bar$data$line.x2,
              y1 = _bar$data$line.y1,
              y2 = _bar$data$line.y2;
          _this2.ctx.beginPath();
          _this2.ctx.moveTo(x1, y1);
          _this2.ctx.lineTo(x2, y2);
          _this2.ctx.lineWidth = 1;
          _this2.ctx.stroke();
        }
        if (borderWidth > 0) {
          _this2.ctx.stroke();
        }
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
      }, function (_ref3) {
        var showTooltip = _ref3.showTooltip,
            hideTooltip = _ref3.hideTooltip;
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
  return BarCanvas;
}(React.Component);
var BarCanvas$1 = setDisplayName('BarCanvas')(enhance$1(BarCanvas));

var ResponsiveBar = function ResponsiveBar(props) {
  return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(Bar$1, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

var ResponsiveBarCanvas = function ResponsiveBarCanvas(props) {
  return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(BarCanvas$1, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

exports.Bar = Bar$1;
exports.BarCanvas = BarCanvas$1;
exports.BarDefaultProps = BarDefaultProps;
exports.BarPropTypes = BarPropTypes;
exports.BarSvgDefaultProps = BarSvgDefaultProps;
exports.BarSvgPropTypes = BarSvgPropTypes;
exports.ResponsiveBar = ResponsiveBar;
exports.ResponsiveBarCanvas = ResponsiveBarCanvas;
//# sourceMappingURL=nivo-bar.cjs.js.map
