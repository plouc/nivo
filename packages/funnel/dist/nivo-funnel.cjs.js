'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var nivoCore = require('@bitbloom/nivo-core');
var PropTypes = _interopDefault(require('prop-types'));
var nivoColors = require('@bitbloom/nivo-colors');
var nivoAnnotations = require('@bitbloom/nivo-annotations');
var d3Shape = require('d3-shape');
var d3Scale = require('d3-scale');
var nivoTooltip = require('@bitbloom/nivo-tooltip');
var reactSpring = require('react-spring');

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

var FunnelPropTypes = _objectSpread2({
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string
  })).isRequired,
  layers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['separators', 'parts', 'labels', 'annotations']), PropTypes.func])).isRequired,
  direction: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  interpolation: PropTypes.oneOf(['linear', 'smooth']).isRequired,
  spacing: PropTypes.number.isRequired,
  shapeBlending: PropTypes.number.isRequired,
  colors: nivoColors.ordinalColorsPropType.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: nivoColors.inheritedColorPropType.isRequired,
  borderOpacity: PropTypes.number.isRequired,
  enableLabel: PropTypes.bool.isRequired,
  labelColor: nivoColors.inheritedColorPropType.isRequired,
  enableBeforeSeparators: PropTypes.bool.isRequired,
  beforeSeparatorLength: PropTypes.number.isRequired,
  beforeSeparatorOffset: PropTypes.number.isRequired,
  enableAfterSeparators: PropTypes.bool.isRequired,
  afterSeparatorLength: PropTypes.number.isRequired,
  afterSeparatorOffset: PropTypes.number.isRequired,
  annotations: PropTypes.arrayOf(nivoAnnotations.annotationSpecPropType).isRequired,
  isInteractive: PropTypes.bool.isRequired,
  currentPartSizeExtension: PropTypes.number.isRequired,
  currentBorderWidth: PropTypes.number,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  role: PropTypes.string.isRequired
}, nivoCore.motionPropTypes);
var FunnelDefaultProps = {
  layers: ['separators', 'parts', 'labels', 'annotations'],
  direction: 'vertical',
  interpolation: 'smooth',
  spacing: 0,
  shapeBlending: 0.66,
  colors: {
    scheme: 'nivo'
  },
  fillOpacity: 1,
  borderWidth: 6,
  borderColor: {
    from: 'color'
  },
  borderOpacity: 0.66,
  enableLabel: true,
  labelColor: {
    theme: 'background'
  },
  enableBeforeSeparators: true,
  beforeSeparatorLength: 0,
  beforeSeparatorOffset: 0,
  enableAfterSeparators: true,
  afterSeparatorLength: 0,
  afterSeparatorOffset: 0,
  annotations: [],
  isInteractive: true,
  currentPartSizeExtension: 0,
  role: 'img',
  animate: nivoCore.MotionConfigProvider.defaultProps.animate,
  motionConfig: nivoCore.MotionConfigProvider.defaultProps.config
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

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var PartTooltip = React.memo(function (_ref) {
  var part = _ref.part;
  return React__default.createElement(nivoTooltip.BasicTooltip, {
    id: part.data.label,
    value: part.formattedValue,
    color: part.color,
    enableChip: true
  });
});
PartTooltip.displayName = 'ChordArcTooltip';

var computeShapeGenerators = function computeShapeGenerators(interpolation, direction) {
  var areaGenerator = d3Shape.area().curve(interpolation === 'smooth' ? d3Shape.curveBasis : d3Shape.curveLinear);
  if (direction === 'vertical') {
    areaGenerator.x0(function (d) {
      return d.x0;
    }).x1(function (d) {
      return d.x1;
    }).y(function (d) {
      return d.y;
    });
  } else if (direction === 'horizontal') {
    areaGenerator.y0(function (d) {
      return d.y0;
    }).y1(function (d) {
      return d.y1;
    }).x(function (d) {
      return d.x;
    });
  }
  return [areaGenerator,
  d3Shape.line().defined(function (d) {
    return d !== null;
  }).x(function (d) {
    return d.x;
  }).y(function (d) {
    return d.y;
  }).curve(interpolation === 'smooth' ? d3Shape.curveBasis : d3Shape.curveLinear)];
};
var computeScales = function computeScales(_ref) {
  var data = _ref.data,
      direction = _ref.direction,
      width = _ref.width,
      height = _ref.height,
      spacing = _ref.spacing;
  var bandScaleSize;
  var linearScaleSize;
  if (direction === 'vertical') {
    bandScaleSize = height;
    linearScaleSize = width;
  } else if (direction === 'horizontal') {
    bandScaleSize = width;
    linearScaleSize = height;
  }
  var bandwidth = (bandScaleSize - spacing * (data.length - 1)) / data.length;
  var bandScale = function bandScale(index) {
    return spacing * index + bandwidth * index;
  };
  bandScale.bandwidth = bandwidth;
  var allValues = data.map(function (d) {
    return d.value;
  });
  var linearScale = d3Scale.scaleLinear().domain([0, Math.max.apply(Math, _toConsumableArray(allValues))]).range([0, linearScaleSize]);
  return [bandScale, linearScale];
};
var computeSeparators = function computeSeparators(_ref2) {
  var parts = _ref2.parts,
      direction = _ref2.direction,
      width = _ref2.width,
      height = _ref2.height,
      spacing = _ref2.spacing,
      enableBeforeSeparators = _ref2.enableBeforeSeparators,
      beforeSeparatorOffset = _ref2.beforeSeparatorOffset,
      enableAfterSeparators = _ref2.enableAfterSeparators,
      afterSeparatorOffset = _ref2.afterSeparatorOffset;
  var beforeSeparators = [];
  var afterSeparators = [];
  var lastPart = parts[parts.length - 1];
  if (direction === 'vertical') {
    parts.forEach(function (part) {
      var y = part.y0 - spacing / 2;
      if (enableBeforeSeparators === true) {
        beforeSeparators.push({
          partId: part.data.id,
          x0: 0,
          x1: part.x0 - beforeSeparatorOffset,
          y0: y,
          y1: y
        });
      }
      if (enableAfterSeparators === true) {
        afterSeparators.push({
          partId: part.data.id,
          x0: part.x1 + afterSeparatorOffset,
          x1: width,
          y0: y,
          y1: y
        });
      }
    });
    var y = lastPart.y1;
    if (enableBeforeSeparators === true) {
      beforeSeparators.push(_objectSpread2(_objectSpread2({}, beforeSeparators[beforeSeparators.length - 1]), {}, {
        partId: 'none',
        y0: y,
        y1: y
      }));
    }
    if (enableAfterSeparators === true) {
      afterSeparators.push(_objectSpread2(_objectSpread2({}, afterSeparators[afterSeparators.length - 1]), {}, {
        partId: 'none',
        y0: y,
        y1: y
      }));
    }
  } else if (direction === 'horizontal') {
    parts.forEach(function (part) {
      var x = part.x0 - spacing / 2;
      beforeSeparators.push({
        partId: part.data.id,
        x0: x,
        x1: x,
        y0: 0,
        y1: part.y0 - beforeSeparatorOffset
      });
      afterSeparators.push({
        partId: part.data.id,
        x0: x,
        x1: x,
        y0: part.y1 + afterSeparatorOffset,
        y1: height
      });
    });
    var x = lastPart.x1;
    beforeSeparators.push(_objectSpread2(_objectSpread2({}, beforeSeparators[beforeSeparators.length - 1]), {}, {
      partId: 'none',
      x0: x,
      x1: x
    }));
    afterSeparators.push(_objectSpread2(_objectSpread2({}, afterSeparators[afterSeparators.length - 1]), {}, {
      partId: 'none',
      x0: x,
      x1: x
    }));
  }
  return [beforeSeparators, afterSeparators];
};
var computePartsHandlers = function computePartsHandlers(_ref3) {
  var parts = _ref3.parts,
      setCurrentPartId = _ref3.setCurrentPartId,
      isInteractive = _ref3.isInteractive,
      onMouseEnter = _ref3.onMouseEnter,
      onMouseLeave = _ref3.onMouseLeave,
      onMouseMove = _ref3.onMouseMove,
      onClick = _ref3.onClick,
      showTooltipFromEvent = _ref3.showTooltipFromEvent,
      hideTooltip = _ref3.hideTooltip;
  if (!isInteractive) return parts;
  return parts.map(function (part) {
    var boundOnMouseEnter = function boundOnMouseEnter(event) {
      setCurrentPartId(part.data.id);
      showTooltipFromEvent(React__default.createElement(PartTooltip, {
        part: part
      }), event);
      onMouseEnter !== undefined && onMouseEnter(part, event);
    };
    var boundOnMouseLeave = function boundOnMouseLeave(event) {
      setCurrentPartId(null);
      hideTooltip();
      onMouseLeave !== undefined && onMouseLeave(part, event);
    };
    var boundOnMouseMove = function boundOnMouseMove(event) {
      showTooltipFromEvent(React__default.createElement(PartTooltip, {
        part: part
      }), event);
      onMouseMove !== undefined && onMouseMove(part, event);
    };
    var boundOnClick = onClick !== undefined ? function (event) {
      onClick(part, event);
    } : undefined;
    return _objectSpread2(_objectSpread2({}, part), {}, {
      onMouseEnter: boundOnMouseEnter,
      onMouseLeave: boundOnMouseLeave,
      onMouseMove: boundOnMouseMove,
      onClick: boundOnClick
    });
  });
};
var useFunnel = function useFunnel(_ref4) {
  var data = _ref4.data,
      width = _ref4.width,
      height = _ref4.height,
      direction = _ref4.direction,
      _ref4$interpolation = _ref4.interpolation,
      interpolation = _ref4$interpolation === void 0 ? FunnelDefaultProps.interpolation : _ref4$interpolation,
      _ref4$spacing = _ref4.spacing,
      spacing = _ref4$spacing === void 0 ? FunnelDefaultProps.spacing : _ref4$spacing,
      _ref4$shapeBlending = _ref4.shapeBlending,
      rawShapeBlending = _ref4$shapeBlending === void 0 ? FunnelDefaultProps.shapeBlending : _ref4$shapeBlending,
      valueFormat = _ref4.valueFormat,
      _ref4$colors = _ref4.colors,
      colors = _ref4$colors === void 0 ? FunnelDefaultProps.colors : _ref4$colors,
      _ref4$fillOpacity = _ref4.fillOpacity,
      fillOpacity = _ref4$fillOpacity === void 0 ? FunnelDefaultProps.fillOpacity : _ref4$fillOpacity,
      _ref4$borderWidth = _ref4.borderWidth,
      borderWidth = _ref4$borderWidth === void 0 ? FunnelDefaultProps.borderWidth : _ref4$borderWidth,
      _ref4$borderColor = _ref4.borderColor,
      borderColor = _ref4$borderColor === void 0 ? FunnelDefaultProps.borderColor : _ref4$borderColor,
      _ref4$borderOpacity = _ref4.borderOpacity,
      borderOpacity = _ref4$borderOpacity === void 0 ? FunnelDefaultProps.borderOpacity : _ref4$borderOpacity,
      _ref4$labelColor = _ref4.labelColor,
      labelColor = _ref4$labelColor === void 0 ? FunnelDefaultProps.labelColor : _ref4$labelColor,
      _ref4$enableBeforeSep = _ref4.enableBeforeSeparators,
      enableBeforeSeparators = _ref4$enableBeforeSep === void 0 ? FunnelDefaultProps.enableBeforeSeparators : _ref4$enableBeforeSep,
      _ref4$beforeSeparator = _ref4.beforeSeparatorLength,
      beforeSeparatorLength = _ref4$beforeSeparator === void 0 ? FunnelDefaultProps.beforeSeparatorLength : _ref4$beforeSeparator,
      _ref4$beforeSeparator2 = _ref4.beforeSeparatorOffset,
      beforeSeparatorOffset = _ref4$beforeSeparator2 === void 0 ? FunnelDefaultProps.beforeSeparatorOffset : _ref4$beforeSeparator2,
      _ref4$enableAfterSepa = _ref4.enableAfterSeparators,
      enableAfterSeparators = _ref4$enableAfterSepa === void 0 ? FunnelDefaultProps.enableAfterSeparators : _ref4$enableAfterSepa,
      _ref4$afterSeparatorL = _ref4.afterSeparatorLength,
      afterSeparatorLength = _ref4$afterSeparatorL === void 0 ? FunnelDefaultProps.afterSeparatorLength : _ref4$afterSeparatorL,
      _ref4$afterSeparatorO = _ref4.afterSeparatorOffset,
      afterSeparatorOffset = _ref4$afterSeparatorO === void 0 ? FunnelDefaultProps.afterSeparatorOffset : _ref4$afterSeparatorO,
      _ref4$isInteractive = _ref4.isInteractive,
      isInteractive = _ref4$isInteractive === void 0 ? FunnelDefaultProps.isInteractive : _ref4$isInteractive,
      _ref4$currentPartSize = _ref4.currentPartSizeExtension,
      currentPartSizeExtension = _ref4$currentPartSize === void 0 ? FunnelDefaultProps.currentPartSizeExtension : _ref4$currentPartSize,
      currentBorderWidth = _ref4.currentBorderWidth,
      onMouseEnter = _ref4.onMouseEnter,
      onMouseMove = _ref4.onMouseMove,
      onMouseLeave = _ref4.onMouseLeave,
      onClick = _ref4.onClick;
  var theme = nivoCore.useTheme();
  var getColor = nivoColors.useOrdinalColorScale(colors, 'id');
  var getBorderColor = nivoColors.useInheritedColor(borderColor, theme);
  var getLabelColor = nivoColors.useInheritedColor(labelColor, theme);
  var formatValue = nivoCore.useValueFormatter(valueFormat);
  var _useMemo = React.useMemo(function () {
    return computeShapeGenerators(interpolation, direction);
  }, [interpolation, direction]),
      _useMemo2 = _slicedToArray(_useMemo, 2),
      areaGenerator = _useMemo2[0],
      borderGenerator = _useMemo2[1];
  var innerWidth;
  var innerHeight;
  var paddingBefore = enableBeforeSeparators ? beforeSeparatorLength + beforeSeparatorOffset : 0;
  var paddingAfter = enableAfterSeparators ? afterSeparatorLength + afterSeparatorOffset : 0;
  if (direction === 'vertical') {
    innerWidth = width - paddingBefore - paddingAfter;
    innerHeight = height;
  } else if (direction === 'horizontal') {
    innerWidth = width;
    innerHeight = height - paddingBefore - paddingAfter;
  }
  var _useMemo3 = React.useMemo(function () {
    return computeScales({
      data: data,
      direction: direction,
      width: innerWidth,
      height: innerHeight,
      spacing: spacing
    });
  }, [data, direction, innerWidth, innerHeight, spacing]),
      _useMemo4 = _slicedToArray(_useMemo3, 2),
      bandScale = _useMemo4[0],
      linearScale = _useMemo4[1];
  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentPartId = _useState2[0],
      setCurrentPartId = _useState2[1];
  var parts = React.useMemo(function () {
    var enhancedParts = data.map(function (datum, index) {
      var isCurrent = datum.id === currentPartId;
      var partWidth;
      var partHeight;
      var y0, x0;
      if (direction === 'vertical') {
        partWidth = linearScale(datum.value);
        partHeight = bandScale.bandwidth;
        x0 = paddingBefore + (innerWidth - partWidth) * 0.5;
        y0 = bandScale(index);
      } else if (direction === 'horizontal') {
        partWidth = bandScale.bandwidth;
        partHeight = linearScale(datum.value);
        x0 = bandScale(index);
        y0 = paddingBefore + (innerHeight - partHeight) * 0.5;
      }
      var x1 = x0 + partWidth;
      var x = x0 + partWidth * 0.5;
      var y1 = y0 + partHeight;
      var y = y0 + partHeight * 0.5;
      var part = {
        data: datum,
        width: partWidth,
        height: partHeight,
        color: getColor(datum),
        fillOpacity: fillOpacity,
        borderWidth: isCurrent && currentBorderWidth !== undefined ? currentBorderWidth : borderWidth,
        borderOpacity: borderOpacity,
        formattedValue: formatValue(datum.value),
        isCurrent: isCurrent,
        x: x,
        x0: x0,
        x1: x1,
        y: y,
        y0: y0,
        y1: y1
      };
      part.borderColor = getBorderColor(part);
      part.labelColor = getLabelColor(part);
      return part;
    });
    var shapeBlending = rawShapeBlending / 2;
    enhancedParts.forEach(function (part, index) {
      part.points = [];
      part.borderPoints = [];
      var nextPart = enhancedParts[index + 1];
      if (direction === 'vertical') {
        part.points.push({
          x: part.x0,
          y: part.y0
        });
        part.points.push({
          x: part.x1,
          y: part.y0
        });
        if (nextPart) {
          part.points.push({
            x: nextPart.x1,
            y: part.y1
          });
          part.points.push({
            x: nextPart.x0,
            y: part.y1
          });
        } else {
          part.points.push({
            x: part.points[1].x,
            y: part.y1
          });
          part.points.push({
            x: part.points[0].x,
            y: part.y1
          });
        }
        if (part.isCurrent === true) {
          part.points[0].x -= currentPartSizeExtension;
          part.points[1].x += currentPartSizeExtension;
          part.points[2].x += currentPartSizeExtension;
          part.points[3].x -= currentPartSizeExtension;
        }
        part.areaPoints = [{
          x0: part.points[0].x,
          x1: part.points[1].x,
          y: part.y0
        }];
        part.areaPoints.push(_objectSpread2(_objectSpread2({}, part.areaPoints[0]), {}, {
          y: part.y0 + part.height * shapeBlending
        }));
        var lastAreaPoint = {
          x0: part.points[3].x,
          x1: part.points[2].x,
          y: part.y1
        };
        part.areaPoints.push(_objectSpread2(_objectSpread2({}, lastAreaPoint), {}, {
          y: part.y1 - part.height * shapeBlending
        }));
        part.areaPoints.push(lastAreaPoint);
        [0, 1, 2, 3].map(function (index) {
          part.borderPoints.push({
            x: part.areaPoints[index].x0,
            y: part.areaPoints[index].y
          });
        });
        part.borderPoints.push(null);
        [3, 2, 1, 0].map(function (index) {
          part.borderPoints.push({
            x: part.areaPoints[index].x1,
            y: part.areaPoints[index].y
          });
        });
      } else if (direction === 'horizontal') {
        part.points.push({
          x: part.x0,
          y: part.y0
        });
        if (nextPart) {
          part.points.push({
            x: part.x1,
            y: nextPart.y0
          });
          part.points.push({
            x: part.x1,
            y: nextPart.y1
          });
        } else {
          part.points.push({
            x: part.x1,
            y: part.y0
          });
          part.points.push({
            x: part.x1,
            y: part.y1
          });
        }
        part.points.push({
          x: part.x0,
          y: part.y1
        });
        if (part.isCurrent === true) {
          part.points[0].y -= currentPartSizeExtension;
          part.points[1].y -= currentPartSizeExtension;
          part.points[2].y += currentPartSizeExtension;
          part.points[3].y += currentPartSizeExtension;
        }
        part.areaPoints = [{
          y0: part.points[0].y,
          y1: part.points[3].y,
          x: part.x0
        }];
        part.areaPoints.push(_objectSpread2(_objectSpread2({}, part.areaPoints[0]), {}, {
          x: part.x0 + part.width * shapeBlending
        }));
        var _lastAreaPoint = {
          y0: part.points[1].y,
          y1: part.points[2].y,
          x: part.x1
        };
        part.areaPoints.push(_objectSpread2(_objectSpread2({}, _lastAreaPoint), {}, {
          x: part.x1 - part.width * shapeBlending
        }));
        part.areaPoints.push(_lastAreaPoint);
        [0, 1, 2, 3].map(function (index) {
          part.borderPoints.push({
            x: part.areaPoints[index].x,
            y: part.areaPoints[index].y0
          });
        });
        part.borderPoints.push(null);
        [3, 2, 1, 0].map(function (index) {
          part.borderPoints.push({
            x: part.areaPoints[index].x,
            y: part.areaPoints[index].y1
          });
        });
      }
    });
    return enhancedParts;
  }, [data, direction, linearScale, bandScale, innerWidth, innerHeight, paddingBefore, paddingAfter, rawShapeBlending, getColor, formatValue, getBorderColor, getLabelColor, currentPartId]);
  var _useTooltip = nivoTooltip.useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var partsWithHandlers = React.useMemo(function () {
    return computePartsHandlers({
      parts: parts,
      setCurrentPartId: setCurrentPartId,
      isInteractive: isInteractive,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onMouseMove: onMouseMove,
      onClick: onClick,
      showTooltipFromEvent: showTooltipFromEvent,
      hideTooltip: hideTooltip
    });
  }, [parts, setCurrentPartId, isInteractive, onMouseEnter, onMouseLeave, onMouseMove, onClick, showTooltipFromEvent, hideTooltip]);
  var _useMemo5 = React.useMemo(function () {
    return computeSeparators({
      parts: parts,
      direction: direction,
      width: width,
      height: height,
      spacing: spacing,
      enableBeforeSeparators: enableBeforeSeparators,
      beforeSeparatorOffset: beforeSeparatorOffset,
      enableAfterSeparators: enableAfterSeparators,
      afterSeparatorOffset: afterSeparatorOffset
    });
  }, [parts, direction, width, height, spacing, enableBeforeSeparators, beforeSeparatorOffset, enableAfterSeparators, afterSeparatorOffset]),
      _useMemo6 = _slicedToArray(_useMemo5, 2),
      beforeSeparators = _useMemo6[0],
      afterSeparators = _useMemo6[1];
  var customLayerProps = React.useMemo(function () {
    return {
      width: width,
      height: height,
      parts: partsWithHandlers,
      areaGenerator: areaGenerator,
      borderGenerator: borderGenerator,
      beforeSeparators: beforeSeparators,
      afterSeparators: afterSeparators,
      setCurrentPartId: setCurrentPartId
    };
  }, [width, height, partsWithHandlers, areaGenerator, borderGenerator, beforeSeparators, afterSeparators, setCurrentPartId]);
  return {
    parts: partsWithHandlers,
    areaGenerator: areaGenerator,
    borderGenerator: borderGenerator,
    beforeSeparators: beforeSeparators,
    afterSeparators: afterSeparators,
    setCurrentPartId: setCurrentPartId,
    currentPartId: currentPartId,
    customLayerProps: customLayerProps
  };
};
var useFunnelAnnotations = function useFunnelAnnotations(parts, annotations) {
  if (annotations.length === 0) return [];
  return nivoAnnotations.useAnnotations({
    items: parts,
    annotations: annotations,
    getDimensions: function getDimensions(part, offset) {
      var width = part.width + offset * 2;
      var height = part.height + offset * 2;
      return {
        size: Math.max(width, height),
        width: width,
        height: height
      };
    }
  });
};

var Part = function Part(_ref) {
  var part = _ref.part,
      areaGenerator = _ref.areaGenerator,
      borderGenerator = _ref.borderGenerator;
  var _useMotionConfig = nivoCore.useMotionConfig(),
      animate = _useMotionConfig.animate,
      motionConfig = _useMotionConfig.config;
  var animatedProps = reactSpring.useSpring({
    areaPath: areaGenerator(part.areaPoints),
    areaColor: part.color,
    borderPath: borderGenerator(part.borderPoints),
    borderWidth: part.borderWidth,
    borderColor: part.borderColor,
    config: motionConfig,
    immediate: !animate
  });
  return React__default.createElement(React__default.Fragment, null, part.borderWidth > 0 && React__default.createElement(reactSpring.animated.path, {
    d: animatedProps.borderPath,
    stroke: animatedProps.borderColor,
    strokeWidth: animatedProps.borderWidth,
    strokeOpacity: part.borderOpacity,
    fill: "none"
  }), React__default.createElement(reactSpring.animated.path, {
    d: animatedProps.areaPath,
    fill: animatedProps.areaColor,
    fillOpacity: part.fillOpacity,
    onMouseEnter: part.onMouseEnter,
    onMouseLeave: part.onMouseLeave,
    onMouseMove: part.onMouseMove,
    onClick: part.onClick
  }));
};

var Parts = function Parts(_ref) {
  var parts = _ref.parts,
      areaGenerator = _ref.areaGenerator,
      borderGenerator = _ref.borderGenerator;
  return parts.map(function (part) {
    return React__default.createElement(Part, {
      key: part.data.id,
      part: part,
      areaGenerator: areaGenerator,
      borderGenerator: borderGenerator
    });
  });
};

var PartLabel = function PartLabel(_ref) {
  var part = _ref.part;
  var theme = nivoCore.useTheme();
  var _useMotionConfig = nivoCore.useMotionConfig(),
      animate = _useMotionConfig.animate,
      motionConfig = _useMotionConfig.config;
  var animatedProps = reactSpring.useSpring({
    transform: "translate(".concat(part.x, ", ").concat(part.y, ")"),
    color: part.labelColor,
    config: motionConfig,
    immediate: !animate
  });
  return React__default.createElement(reactSpring.animated.g, {
    transform: animatedProps.transform
  }, React__default.createElement(reactSpring.animated.text, {
    textAnchor: "middle",
    dominantBaseline: "central",
    style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
      fill: animatedProps.color,
      pointerEvents: 'none'
    })
  }, part.formattedValue));
};

var PartLabels = function PartLabels(_ref) {
  var parts = _ref.parts;
  return parts.map(function (part) {
    return React__default.createElement(PartLabel, {
      key: part.data.id,
      part: part
    });
  });
};

var Separator = function Separator(_ref) {
  var separator = _ref.separator;
  var theme = nivoCore.useTheme();
  var _useMotionConfig = nivoCore.useMotionConfig(),
      animate = _useMotionConfig.animate,
      motionConfig = _useMotionConfig.config;
  var animatedProps = reactSpring.useSpring({
    x1: separator.x0,
    x2: separator.x1,
    y1: separator.y0,
    y2: separator.y1,
    config: motionConfig,
    immediate: !animate
  });
  return React__default.createElement(reactSpring.animated.line, Object.assign({
    x1: animatedProps.x1,
    x2: animatedProps.x2,
    y1: animatedProps.y1,
    y2: animatedProps.y2,
    fill: "none"
  }, theme.grid.line));
};

var Separators = function Separators(_ref) {
  var beforeSeparators = _ref.beforeSeparators,
      afterSeparators = _ref.afterSeparators;
  return React__default.createElement(React__default.Fragment, null, beforeSeparators.map(function (separator) {
    return React__default.createElement(Separator, {
      key: separator.partId,
      separator: separator
    });
  }), afterSeparators.map(function (separator) {
    return React__default.createElement(Separator, {
      key: separator.partId,
      separator: separator
    });
  }));
};

var FunnelAnnotations = function FunnelAnnotations(_ref) {
  var parts = _ref.parts,
      annotations = _ref.annotations,
      width = _ref.width,
      height = _ref.height;
  var boundAnnotations = useFunnelAnnotations(parts, annotations);
  return boundAnnotations.map(function (annotation, i) {
    return React__default.createElement(nivoAnnotations.Annotation, Object.assign({
      key: i
    }, annotation, {
      containerWidth: width,
      containerHeight: height
    }));
  });
};

var Funnel = function Funnel(props) {
  var data = props.data,
      width = props.width,
      height = props.height,
      partialMargin = props.margin,
      direction = props.direction,
      interpolation = props.interpolation,
      spacing = props.spacing,
      shapeBlending = props.shapeBlending,
      valueFormat = props.valueFormat,
      colors = props.colors,
      fillOpacity = props.fillOpacity,
      borderWidth = props.borderWidth,
      borderColor = props.borderColor,
      borderOpacity = props.borderOpacity,
      enableLabel = props.enableLabel,
      labelColor = props.labelColor,
      enableBeforeSeparators = props.enableBeforeSeparators,
      beforeSeparatorLength = props.beforeSeparatorLength,
      beforeSeparatorOffset = props.beforeSeparatorOffset,
      enableAfterSeparators = props.enableAfterSeparators,
      afterSeparatorLength = props.afterSeparatorLength,
      afterSeparatorOffset = props.afterSeparatorOffset,
      layers = props.layers,
      annotations = props.annotations,
      isInteractive = props.isInteractive,
      currentPartSizeExtension = props.currentPartSizeExtension,
      currentBorderWidth = props.currentBorderWidth,
      onMouseEnter = props.onMouseEnter,
      onMouseMove = props.onMouseMove,
      onMouseLeave = props.onMouseLeave,
      onClick = props.onClick,
      role = props.role;
  var _useDimensions = nivoCore.useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useFunnel = useFunnel({
    data: data,
    width: innerWidth,
    height: innerHeight,
    direction: direction,
    interpolation: interpolation,
    spacing: spacing,
    shapeBlending: shapeBlending,
    valueFormat: valueFormat,
    colors: colors,
    fillOpacity: fillOpacity,
    borderWidth: borderWidth,
    borderColor: borderColor,
    borderOpacity: borderOpacity,
    labelColor: labelColor,
    enableBeforeSeparators: enableBeforeSeparators,
    beforeSeparatorLength: beforeSeparatorLength,
    beforeSeparatorOffset: beforeSeparatorOffset,
    enableAfterSeparators: enableAfterSeparators,
    afterSeparatorLength: afterSeparatorLength,
    afterSeparatorOffset: afterSeparatorOffset,
    isInteractive: isInteractive,
    currentPartSizeExtension: currentPartSizeExtension,
    currentBorderWidth: currentBorderWidth,
    onMouseEnter: onMouseEnter,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    onClick: onClick
  }),
      areaGenerator = _useFunnel.areaGenerator,
      borderGenerator = _useFunnel.borderGenerator,
      parts = _useFunnel.parts,
      beforeSeparators = _useFunnel.beforeSeparators,
      afterSeparators = _useFunnel.afterSeparators,
      customLayerProps = _useFunnel.customLayerProps;
  var layerById = {
    separators: React__default.createElement(Separators, {
      key: "separators",
      beforeSeparators: beforeSeparators,
      afterSeparators: afterSeparators
    }),
    parts: React__default.createElement(Parts, {
      key: "parts",
      parts: parts,
      areaGenerator: areaGenerator,
      borderGenerator: borderGenerator,
      enableLabel: enableLabel
    }),
    annotations: React__default.createElement(FunnelAnnotations, {
      key: "annotations",
      parts: parts,
      annotations: annotations,
      widh: innerWidth,
      height: innerHeight
    }),
    labels: null
  };
  if (enableLabel === true) {
    layerById.labels = React__default.createElement(PartLabels, {
      key: "labels",
      parts: parts
    });
  }
  return React__default.createElement(nivoCore.SvgWrapper, {
    width: outerWidth,
    height: outerHeight,
    margin: margin,
    role: role
  }, layers.map(function (layer, i) {
    if (typeof layer === 'function') {
      return React__default.createElement(React.Fragment, {
        key: i
      }, layer(customLayerProps));
    }
    return layerById[layer];
  }));
};
var WrappedFunnel = nivoCore.withContainer(Funnel);
WrappedFunnel.defaultProps = FunnelDefaultProps;

var ResponsiveFunnel = function ResponsiveFunnel(props) {
  return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(WrappedFunnel, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

exports.Funnel = WrappedFunnel;
exports.FunnelDefaultProps = FunnelDefaultProps;
exports.FunnelPropTypes = FunnelPropTypes;
exports.ResponsiveFunnel = ResponsiveFunnel;
exports.computePartsHandlers = computePartsHandlers;
exports.computeScales = computeScales;
exports.computeSeparators = computeSeparators;
exports.computeShapeGenerators = computeShapeGenerators;
exports.useFunnel = useFunnel;
exports.useFunnelAnnotations = useFunnelAnnotations;
//# sourceMappingURL=nivo-funnel.cjs.js.map
