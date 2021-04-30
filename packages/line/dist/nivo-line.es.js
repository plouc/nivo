import React, { memo, useMemo, useCallback, useState, Fragment, useRef, useEffect } from 'react';
import { lineCurvePropType, blendModePropType, motionPropTypes, defsPropTypes, curveFromProp, useValueFormatter, useTheme, useMotionConfig, getLabelGenerator, DotsItem, withContainer, useDimensions, CartesianMarkers, bindDefs, SvgWrapper, ResponsiveWrapper, clip, getRelativeCursor, isCursorInRect } from '@bitbloom/nivo-core';
import { ordinalColorsPropType, useOrdinalColorScale, useInheritedColor } from '@bitbloom/nivo-colors';
import { axisPropType, Grid, Axes, renderGridLinesToCanvas, renderAxesToCanvas } from '@bitbloom/nivo-axes';
import { LegendPropShape, BoxLegendSvg, renderLegendToCanvas } from '@bitbloom/nivo-legends';
import { BasicTooltip, TableTooltip, crosshairPropTypes, useTooltip, Crosshair } from '@bitbloom/nivo-tooltip';
import { line, area } from 'd3-shape';
import { scalePropType, computeXYScalesForSeries } from '@bitbloom/nivo-scales';
import PropTypes from 'prop-types';
import { useSprings, animated, useSpring } from 'react-spring';
import { Mesh as Mesh$2, useVoronoiMesh, renderVoronoiToCanvas, renderVoronoiCellToCanvas } from '@bitbloom/nivo-voronoi';

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

var LinePointTooltip = function LinePointTooltip(_ref) {
  var point = _ref.point;
  return React.createElement(BasicTooltip, {
    id: React.createElement("span", null, "x: ", React.createElement("strong", null, point.data.xFormatted), ", y:", ' ', React.createElement("strong", null, point.data.yFormatted)),
    enableChip: true,
    color: point.serieColor
  });
};
var PointTooltip = memo(LinePointTooltip);

var Chip = function Chip(_ref) {
  var color = _ref.color;
  return React.createElement("span", {
    style: {
      display: 'block',
      width: '12px',
      height: '12px',
      background: color
    }
  });
};
var SliceTooltip = function SliceTooltip(_ref2) {
  var slice = _ref2.slice,
      axis = _ref2.axis;
  var otherAxis = axis === 'x' ? 'y' : 'x';
  return React.createElement(TableTooltip, {
    rows: slice.points.map(function (point) {
      return [React.createElement(Chip, {
        key: "chip",
        color: point.serieColor
      }), point.serieId, React.createElement("strong", {
        key: "value"
      }, point.data["".concat(otherAxis, "Formatted")])];
    })
  });
};
var SliceTooltip$1 = memo(SliceTooltip);

var commonPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
    })).isRequired
  })).isRequired,
  xScale: scalePropType.isRequired,
  xFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  yScale: scalePropType.isRequired,
  yFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  layers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'slices', 'points', 'mesh', 'legends']), PropTypes.func])).isRequired,
  curve: lineCurvePropType.isRequired,
  axisTop: axisPropType,
  axisRight: axisPropType,
  axisBottom: axisPropType,
  axisLeft: axisPropType,
  enableGridX: PropTypes.bool.isRequired,
  enableGridY: PropTypes.bool.isRequired,
  gridXValues: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]))]),
  gridYValues: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]))]),
  enablePoints: PropTypes.bool.isRequired,
  pointSymbol: PropTypes.func,
  pointSize: PropTypes.number.isRequired,
  pointColor: PropTypes.any.isRequired,
  pointBorderWidth: PropTypes.number.isRequired,
  pointBorderColor: PropTypes.any.isRequired,
  enablePointLabel: PropTypes.bool.isRequired,
  pointLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  markers: PropTypes.arrayOf(PropTypes.shape({
    axis: PropTypes.oneOf(['x', 'y']).isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    style: PropTypes.object
  })),
  colors: ordinalColorsPropType.isRequired,
  enableArea: PropTypes.bool.isRequired,
  areaOpacity: PropTypes.number.isRequired,
  areaBlendMode: blendModePropType.isRequired,
  areaBaselineValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  lineWidth: PropTypes.number.isRequired,
  legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
  isInteractive: PropTypes.bool.isRequired,
  debugMesh: PropTypes.bool.isRequired,
  overflow: PropTypes.bool.isRequired,
  tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  enableSlices: PropTypes.oneOf(['x', 'y', false]).isRequired,
  debugSlices: PropTypes.bool.isRequired,
  sliceTooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  enableCrosshair: PropTypes.bool.isRequired,
  crosshairType: crosshairPropTypes.type.isRequired
};
var LinePropTypes = _objectSpread2(_objectSpread2(_objectSpread2({}, commonPropTypes), {}, {
  enablePointLabel: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  useMesh: PropTypes.bool.isRequired
}, motionPropTypes), defsPropTypes);
var LineCanvasPropTypes = _objectSpread2({
  pixelRatio: PropTypes.number.isRequired
}, commonPropTypes);
var commonDefaultProps = {
  curve: 'linear',
  xScale: {
    type: 'point'
  },
  yScale: {
    type: 'linear',
    min: 0,
    max: 'auto'
  },
  layers: ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends'],
  axisBottom: {},
  axisLeft: {},
  enableGridX: true,
  enableGridY: true,
  enablePoints: true,
  pointSize: 6,
  pointColor: {
    from: 'color'
  },
  pointBorderWidth: 0,
  pointBorderColor: {
    theme: 'background'
  },
  enablePointLabel: false,
  pointLabel: 'yFormatted',
  colors: {
    scheme: 'nivo'
  },
  enableArea: false,
  areaBaselineValue: 0,
  areaOpacity: 0.2,
  areaBlendMode: 'normal',
  lineWidth: 2,
  legends: [],
  isInteractive: true,
  tooltip: PointTooltip,
  enableSlices: false,
  debugSlices: false,
  sliceTooltip: SliceTooltip$1,
  debugMesh: false,
  enableCrosshair: true,
  crosshairType: 'bottom-left'
};
var LineDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  enablePointLabel: false,
  useMesh: false,
  animate: true,
  motionConfig: 'gentle',
  defs: [],
  fill: [],
  role: 'img'
});
var LineCanvasDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
});

var useLineGenerator = function useLineGenerator(_ref) {
  var curve = _ref.curve;
  return useMemo(function () {
    return line().defined(function (d) {
      return d.x !== null && d.y !== null;
    }).x(function (d) {
      return d.x;
    }).y(function (d) {
      return d.y;
    }).curve(curveFromProp(curve));
  }, [curve]);
};
var useAreaGenerator = function useAreaGenerator(_ref2) {
  var curve = _ref2.curve,
      yScale = _ref2.yScale,
      areaBaselineValue = _ref2.areaBaselineValue;
  return useMemo(function () {
    return area().defined(function (d) {
      return d.x !== null && d.y !== null;
    }).x(function (d) {
      return d.x;
    }).y1(function (d) {
      return d.y;
    }).curve(curveFromProp(curve)).y0(yScale(areaBaselineValue));
  }, [curve, yScale, areaBaselineValue]);
};
var usePoints = function usePoints(_ref3) {
  var series = _ref3.series,
      getPointColor = _ref3.getPointColor,
      getPointBorderColor = _ref3.getPointBorderColor,
      formatX = _ref3.formatX,
      formatY = _ref3.formatY;
  return useMemo(function () {
    return series.reduce(function (acc, serie) {
      return [].concat(_toConsumableArray(acc), _toConsumableArray(serie.data.filter(function (datum) {
        return datum.position.x !== null && datum.position.y !== null;
      }).map(function (datum, i) {
        var point = {
          id: "".concat(serie.id, ".").concat(i),
          index: acc.length + i,
          serieId: serie.id,
          serieColor: serie.color,
          x: datum.position.x,
          y: datum.position.y
        };
        point.color = getPointColor(serie);
        point.borderColor = getPointBorderColor(point);
        point.data = _objectSpread2(_objectSpread2({}, datum.data), {}, {
          xFormatted: formatX(datum.data.x),
          yFormatted: formatY(datum.data.y)
        });
        return point;
      })));
    }, []);
  }, [series, getPointColor, getPointBorderColor, formatX, formatY]);
};
var useSlices = function useSlices(_ref4) {
  var enableSlices = _ref4.enableSlices,
      points = _ref4.points,
      width = _ref4.width,
      height = _ref4.height;
  return useMemo(function () {
    if (enableSlices === false) return [];
    if (enableSlices === 'x') {
      var map = new Map();
      points.forEach(function (point) {
        if (point.data.x === null || point.data.y === null) return;
        if (!map.has(point.x)) map.set(point.x, [point]);else map.get(point.x).push(point);
      });
      return Array.from(map.entries()).sort(function (a, b) {
        return a[0] - b[0];
      }).map(function (_ref5, i, slices) {
        var _ref6 = _slicedToArray(_ref5, 2),
            x = _ref6[0],
            slicePoints = _ref6[1];
        var prevSlice = slices[i - 1];
        var nextSlice = slices[i + 1];
        var x0;
        if (!prevSlice) x0 = x;else x0 = x - (x - prevSlice[0]) / 2;
        var sliceWidth;
        if (!nextSlice) sliceWidth = width - x0;else sliceWidth = x - x0 + (nextSlice[0] - x) / 2;
        return {
          id: x,
          x0: x0,
          x: x,
          y0: 0,
          y: 0,
          width: sliceWidth,
          height: height,
          points: slicePoints.reverse()
        };
      });
    } else if (enableSlices === 'y') {
      var _map = new Map();
      points.forEach(function (point) {
        if (point.data.x === null || point.data.y === null) return;
        if (!_map.has(point.y)) _map.set(point.y, [point]);else _map.get(point.y).push(point);
      });
      return Array.from(_map.entries()).sort(function (a, b) {
        return a[0] - b[0];
      }).map(function (_ref7, i, slices) {
        var _ref8 = _slicedToArray(_ref7, 2),
            y = _ref8[0],
            slicePoints = _ref8[1];
        var prevSlice = slices[i - 1];
        var nextSlice = slices[i + 1];
        var y0;
        if (!prevSlice) y0 = y;else y0 = y - (y - prevSlice[0]) / 2;
        var sliceHeight;
        if (!nextSlice) sliceHeight = height - y0;else sliceHeight = y - y0 + (nextSlice[0] - y) / 2;
        return {
          id: y,
          x0: 0,
          x: 0,
          y0: y0,
          y: y,
          width: width,
          height: sliceHeight,
          points: slicePoints.reverse()
        };
      });
    }
  }, [enableSlices, points]);
};
var useLine = function useLine(_ref9) {
  var data = _ref9.data,
      _ref9$xScale = _ref9.xScale,
      xScaleSpec = _ref9$xScale === void 0 ? LineDefaultProps.xScale : _ref9$xScale,
      xFormat = _ref9.xFormat,
      _ref9$yScale = _ref9.yScale,
      yScaleSpec = _ref9$yScale === void 0 ? LineDefaultProps.yScale : _ref9$yScale,
      yFormat = _ref9.yFormat,
      width = _ref9.width,
      height = _ref9.height,
      _ref9$colors = _ref9.colors,
      colors = _ref9$colors === void 0 ? LineDefaultProps.colors : _ref9$colors,
      _ref9$curve = _ref9.curve,
      curve = _ref9$curve === void 0 ? LineDefaultProps.curve : _ref9$curve,
      _ref9$areaBaselineVal = _ref9.areaBaselineValue,
      areaBaselineValue = _ref9$areaBaselineVal === void 0 ? LineDefaultProps.areaBaselineValue : _ref9$areaBaselineVal,
      _ref9$pointColor = _ref9.pointColor,
      pointColor = _ref9$pointColor === void 0 ? LineDefaultProps.pointColor : _ref9$pointColor,
      _ref9$pointBorderColo = _ref9.pointBorderColor,
      pointBorderColor = _ref9$pointBorderColo === void 0 ? LineDefaultProps.pointBorderColor : _ref9$pointBorderColo,
      _ref9$enableSlices = _ref9.enableSlices,
      enableSlices = _ref9$enableSlices === void 0 ? LineDefaultProps.enableSlicesTooltip : _ref9$enableSlices;
  var formatX = useValueFormatter(xFormat);
  var formatY = useValueFormatter(yFormat);
  var getColor = useOrdinalColorScale(colors, 'id');
  var theme = useTheme();
  var getPointColor = useInheritedColor(pointColor, theme);
  var getPointBorderColor = useInheritedColor(pointBorderColor, theme);
  var _useMemo = useMemo(function () {
    return computeXYScalesForSeries(data, xScaleSpec, yScaleSpec, width, height);
  }, [data, xScaleSpec, yScaleSpec, width, height]),
      xScale = _useMemo.xScale,
      yScale = _useMemo.yScale,
      rawSeries = _useMemo.series;
  var series = useMemo(function () {
    return rawSeries.map(function (serie) {
      return _objectSpread2(_objectSpread2({}, serie), {}, {
        color: getColor(serie)
      });
    });
  }, [rawSeries, getColor]);
  var points = usePoints({
    series: series,
    getPointColor: getPointColor,
    getPointBorderColor: getPointBorderColor,
    formatX: formatX,
    formatY: formatY
  });
  var slices = useSlices({
    enableSlices: enableSlices,
    points: points,
    width: width,
    height: height
  });
  var lineGenerator = useLineGenerator({
    curve: curve
  });
  var areaGenerator = useAreaGenerator({
    curve: curve,
    yScale: yScale,
    areaBaselineValue: areaBaselineValue
  });
  return {
    lineGenerator: lineGenerator,
    areaGenerator: areaGenerator,
    getColor: getColor,
    series: series,
    xScale: xScale,
    yScale: yScale,
    slices: slices,
    points: points
  };
};

var Areas = function Areas(_ref) {
  var areaGenerator = _ref.areaGenerator,
      areaOpacity = _ref.areaOpacity,
      areaBlendMode = _ref.areaBlendMode,
      lines = _ref.lines;
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var computedLines = lines.slice(0).reverse();
  var springs = useSprings(computedLines.length, computedLines.map(function (line) {
    return {
      path: areaGenerator(line.data.map(function (d) {
        return d.position;
      })),
      color: line.color,
      config: springConfig,
      immediate: !animate
    };
  }));
  return React.createElement("g", null, springs.map(function (animatedProps, index) {
    var line = computedLines[index];
    return React.createElement(animated.path, {
      key: line.id,
      d: animatedProps.path,
      fill: line.fill ? line.fill : animatedProps.color,
      fillOpacity: areaOpacity,
      strokeWidth: 0,
      style: {
        mixBlendMode: areaBlendMode
      }
    });
  }));
};
var Areas$1 = memo(Areas);

var LinesItem = function LinesItem(_ref) {
  var lineGenerator = _ref.lineGenerator,
      points = _ref.points,
      color = _ref.color,
      thickness = _ref.thickness;
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var animatedProps = useSpring({
    path: lineGenerator(points),
    config: springConfig,
    immediate: !animate
  });
  return React.createElement(animated.path, {
    d: animatedProps.path,
    fill: "none",
    strokeWidth: thickness,
    stroke: color
  });
};
var LinesItem$1 = memo(LinesItem);

var Lines = function Lines(_ref) {
  var lines = _ref.lines,
      lineGenerator = _ref.lineGenerator,
      lineWidth = _ref.lineWidth;
  return lines.reverse().map(function (_ref2) {
    var id = _ref2.id,
        data = _ref2.data,
        color = _ref2.color;
    return React.createElement(LinesItem$1, {
      key: id,
      id: id,
      points: data.map(function (d) {
        return d.position;
      }),
      lineGenerator: lineGenerator,
      color: color,
      thickness: lineWidth
    });
  });
};
var Lines$1 = memo(Lines);

var SlicesItem = function SlicesItem(_ref) {
  var slice = _ref.slice,
      axis = _ref.axis,
      debug = _ref.debug,
      tooltip = _ref.tooltip,
      isCurrent = _ref.isCurrent,
      setCurrent = _ref.setCurrent;
  var _useTooltip = useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleMouseEnter = useCallback(function (event) {
    showTooltipFromEvent(React.createElement(tooltip, {
      slice: slice,
      axis: axis
    }), event, 'right');
    setCurrent(slice);
  }, [showTooltipFromEvent, tooltip, slice]);
  var handleMouseMove = useCallback(function (event) {
    showTooltipFromEvent(React.createElement(tooltip, {
      slice: slice,
      axis: axis
    }), event, 'right');
  }, [showTooltipFromEvent, tooltip, slice]);
  var handleMouseLeave = useCallback(function () {
    hideTooltip();
    setCurrent(null);
  }, [hideTooltip]);
  return React.createElement("rect", {
    x: slice.x0,
    y: slice.y0,
    width: slice.width,
    height: slice.height,
    stroke: "red",
    strokeWidth: debug ? 1 : 0,
    strokeOpacity: 0.75,
    fill: "red",
    fillOpacity: isCurrent && debug ? 0.35 : 0,
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  });
};
var SlicesItem$1 = memo(SlicesItem);

var Slices = function Slices(_ref) {
  var slices = _ref.slices,
      axis = _ref.axis,
      debug = _ref.debug,
      height = _ref.height,
      tooltip = _ref.tooltip,
      current = _ref.current,
      setCurrent = _ref.setCurrent;
  return slices.map(function (slice) {
    return React.createElement(SlicesItem$1, {
      key: slice.id,
      slice: slice,
      axis: axis,
      debug: debug,
      height: height,
      tooltip: tooltip,
      setCurrent: setCurrent,
      isCurrent: current !== null && current.id === slice.id
    });
  });
};
var Slices$1 = memo(Slices);

var Points = function Points(_ref) {
  var points = _ref.points,
      symbol = _ref.symbol,
      size = _ref.size,
      borderWidth = _ref.borderWidth,
      enableLabel = _ref.enableLabel,
      label = _ref.label,
      labelYOffset = _ref.labelYOffset;
  var theme = useTheme();
  var getLabel = getLabelGenerator(label);
  var mappedPoints = points.reverse().map(function (point) {
    var mappedPoint = {
      id: point.id,
      x: point.x,
      y: point.y,
      datum: point.data,
      fill: point.color,
      stroke: point.borderColor,
      label: enableLabel ? getLabel(point.data) : null
    };
    return mappedPoint;
  });
  return React.createElement("g", null, mappedPoints.map(function (point) {
    return React.createElement(DotsItem, {
      key: point.id,
      x: point.x,
      y: point.y,
      datum: point.datum,
      symbol: symbol,
      size: size,
      color: point.fill,
      borderWidth: borderWidth,
      borderColor: point.stroke,
      label: point.label,
      labelYOffset: labelYOffset,
      theme: theme
    });
  }));
};
var Points$1 = memo(Points);

var Mesh = function Mesh(_ref) {
  var points = _ref.points,
      width = _ref.width,
      height = _ref.height,
      margin = _ref.margin,
      setCurrent = _ref.setCurrent,
      onMouseEnter = _ref.onMouseEnter,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick,
      tooltip = _ref.tooltip,
      debug = _ref.debug;
  var _useTooltip = useTooltip(),
      showTooltipAt = _useTooltip.showTooltipAt,
      hideTooltip = _useTooltip.hideTooltip;
  var handleMouseEnter = useCallback(function (point, event) {
    showTooltipAt(React.createElement(tooltip, {
      point: point
    }), [point.x + margin.left, point.y + margin.top], 'top');
    setCurrent(point);
    onMouseEnter && onMouseEnter(point, event);
  }, [setCurrent, showTooltipAt, tooltip, onMouseEnter, margin]);
  var handleMouseMove = useCallback(function (point, event) {
    showTooltipAt(React.createElement(tooltip, {
      point: point
    }), [point.x + margin.left, point.y + margin.top], 'top');
    setCurrent(point);
    onMouseMove && onMouseMove(point, event);
  }, [setCurrent, showTooltipAt, tooltip, onMouseMove]);
  var handleMouseLeave = useCallback(function (point, event) {
    hideTooltip();
    setCurrent(null);
    onMouseLeave && onMouseLeave(point, event);
  }, [hideTooltip, setCurrent, onMouseLeave]);
  var handleClick = useCallback(function (point, event) {
    onClick && onClick(point, event);
  }, [onClick]);
  return React.createElement(Mesh$2, {
    nodes: points,
    width: width,
    height: height,
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    debug: debug
  });
};
var Mesh$1 = memo(Mesh);

var Line = function Line(props) {
  var data = props.data,
      xScaleSpec = props.xScale,
      xFormat = props.xFormat,
      yScaleSpec = props.yScale,
      yFormat = props.yFormat,
      layers = props.layers,
      curve = props.curve,
      areaBaselineValue = props.areaBaselineValue,
      colors = props.colors,
      partialMargin = props.margin,
      width = props.width,
      height = props.height,
      axisTop = props.axisTop,
      axisRight = props.axisRight,
      axisBottom = props.axisBottom,
      axisLeft = props.axisLeft,
      enableGridX = props.enableGridX,
      enableGridY = props.enableGridY,
      gridXValues = props.gridXValues,
      gridYValues = props.gridYValues,
      lineWidth = props.lineWidth,
      enableArea = props.enableArea,
      areaOpacity = props.areaOpacity,
      areaBlendMode = props.areaBlendMode,
      enablePoints = props.enablePoints,
      pointSymbol = props.pointSymbol,
      pointSize = props.pointSize,
      pointColor = props.pointColor,
      pointBorderWidth = props.pointBorderWidth,
      pointBorderColor = props.pointBorderColor,
      enablePointLabel = props.enablePointLabel,
      pointLabel = props.pointLabel,
      pointLabelYOffset = props.pointLabelYOffset,
      defs = props.defs,
      fill = props.fill,
      markers = props.markers,
      legends = props.legends,
      isInteractive = props.isInteractive,
      useMesh = props.useMesh,
      debugMesh = props.debugMesh,
      onMouseEnter = props.onMouseEnter,
      onMouseMove = props.onMouseMove,
      onMouseLeave = props.onMouseLeave,
      onClick = props.onClick,
      tooltip = props.tooltip,
      enableSlices = props.enableSlices,
      debugSlices = props.debugSlices,
      sliceTooltip = props.sliceTooltip,
      enableCrosshair = props.enableCrosshair,
      crosshairType = props.crosshairType,
      role = props.role;
  var _useDimensions = useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useLine = useLine({
    data: data,
    xScale: xScaleSpec,
    xFormat: xFormat,
    yScale: yScaleSpec,
    yFormat: yFormat,
    width: innerWidth,
    height: innerHeight,
    colors: colors,
    curve: curve,
    areaBaselineValue: areaBaselineValue,
    pointColor: pointColor,
    pointBorderColor: pointBorderColor,
    enableSlices: enableSlices
  }),
      lineGenerator = _useLine.lineGenerator,
      areaGenerator = _useLine.areaGenerator,
      series = _useLine.series,
      xScale = _useLine.xScale,
      yScale = _useLine.yScale,
      slices = _useLine.slices,
      points = _useLine.points;
  var theme = useTheme();
  var getPointColor = useInheritedColor(pointColor, theme);
  var getPointBorderColor = useInheritedColor(pointBorderColor, theme);
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentPoint = _useState2[0],
      setCurrentPoint = _useState2[1];
  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      currentSlice = _useState4[0],
      setCurrentSlice = _useState4[1];
  var legendData = useMemo(function () {
    return series.map(function (line) {
      return {
        id: line.id,
        label: line.id,
        color: line.color
      };
    }).reverse();
  }, [series]);
  var layerById = {
    grid: React.createElement(Grid, {
      key: "grid",
      theme: theme,
      width: innerWidth,
      height: innerHeight,
      xScale: enableGridX ? xScale : null,
      yScale: enableGridY ? yScale : null,
      xValues: gridXValues,
      yValues: gridYValues
    }),
    markers: React.createElement(CartesianMarkers, {
      key: "markers",
      markers: markers,
      width: innerWidth,
      height: innerHeight,
      xScale: xScale,
      yScale: yScale,
      theme: theme
    }),
    axes: React.createElement(Axes, {
      key: "axes",
      xScale: xScale,
      yScale: yScale,
      width: innerWidth,
      height: innerHeight,
      theme: theme,
      top: axisTop,
      right: axisRight,
      bottom: axisBottom,
      left: axisLeft
    }),
    areas: null,
    lines: React.createElement(Lines$1, {
      key: "lines",
      lines: series,
      lineGenerator: lineGenerator,
      lineWidth: lineWidth
    }),
    slices: null,
    points: null,
    crosshair: null,
    mesh: null,
    legends: legends.map(function (legend, i) {
      return React.createElement(BoxLegendSvg, Object.assign({
        key: "legend.".concat(i)
      }, legend, {
        containerWidth: innerWidth,
        containerHeight: innerHeight,
        data: legend.data || legendData,
        theme: theme
      }));
    })
  };
  var boundDefs = bindDefs(defs, series, fill);
  if (enableArea) {
    layerById.areas = React.createElement(Areas$1, {
      key: "areas",
      areaGenerator: areaGenerator,
      areaOpacity: areaOpacity,
      areaBlendMode: areaBlendMode,
      lines: series
    });
  }
  if (isInteractive && enableSlices !== false) {
    layerById.slices = React.createElement(Slices$1, {
      key: "slices",
      slices: slices,
      axis: enableSlices,
      debug: debugSlices,
      height: innerHeight,
      tooltip: sliceTooltip,
      current: currentSlice,
      setCurrent: setCurrentSlice
    });
  }
  if (enablePoints) {
    layerById.points = React.createElement(Points$1, {
      key: "points",
      points: points,
      symbol: pointSymbol,
      size: pointSize,
      color: getPointColor,
      borderWidth: pointBorderWidth,
      borderColor: getPointBorderColor,
      enableLabel: enablePointLabel,
      label: pointLabel,
      labelYOffset: pointLabelYOffset
    });
  }
  if (isInteractive && enableCrosshair) {
    if (currentPoint !== null) {
      layerById.crosshair = React.createElement(Crosshair, {
        key: "crosshair",
        width: innerWidth,
        height: innerHeight,
        x: currentPoint.x,
        y: currentPoint.y,
        type: crosshairType
      });
    }
    if (currentSlice !== null) {
      layerById.crosshair = React.createElement(Crosshair, {
        key: "crosshair",
        width: innerWidth,
        height: innerHeight,
        x: currentSlice.x,
        y: currentSlice.y,
        type: enableSlices
      });
    }
  }
  if (isInteractive && useMesh && enableSlices === false) {
    layerById.mesh = React.createElement(Mesh$1, {
      key: "mesh",
      points: points,
      width: innerWidth,
      height: innerHeight,
      margin: margin,
      current: currentPoint,
      setCurrent: setCurrentPoint,
      onMouseEnter: onMouseEnter,
      onMouseMove: onMouseMove,
      onMouseLeave: onMouseLeave,
      onClick: onClick,
      tooltip: tooltip,
      debug: debugMesh
    });
  }
  return React.createElement(SvgWrapper, {
    defs: boundDefs,
    width: outerWidth,
    height: outerHeight,
    margin: margin,
    role: role
  }, layers.map(function (layer, i) {
    if (typeof layer === 'function') {
      return React.createElement(Fragment, {
        key: i
      }, layer(_objectSpread2(_objectSpread2({}, props), {}, {
        innerWidth: innerWidth,
        innerHeight: innerHeight,
        series: series,
        slices: slices,
        points: points,
        xScale: xScale,
        yScale: yScale,
        lineGenerator: lineGenerator,
        areaGenerator: areaGenerator,
        currentPoint: currentPoint,
        setCurrentPoint: setCurrentPoint,
        currentSlice: currentSlice,
        setCurrentSlice: setCurrentSlice
      })));
    }
    return layerById[layer];
  }));
};
Line.defaultProps = LineDefaultProps;
var Line$1 = withContainer(Line);

var ResponsiveLine = function ResponsiveLine(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(Line$1, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

var LineCanvas = function LineCanvas(_ref) {
  var width = _ref.width,
      height = _ref.height,
      partialMargin = _ref.margin,
      pixelRatio = _ref.pixelRatio,
      data = _ref.data,
      xScaleSpec = _ref.xScale,
      xFormat = _ref.xFormat,
      yScaleSpec = _ref.yScale,
      yFormat = _ref.yFormat,
      curve = _ref.curve,
      layers = _ref.layers,
      colors = _ref.colors,
      lineWidth = _ref.lineWidth,
      enableArea = _ref.enableArea,
      areaBaselineValue = _ref.areaBaselineValue,
      areaOpacity = _ref.areaOpacity,
      enablePoints = _ref.enablePoints,
      pointSize = _ref.pointSize,
      pointColor = _ref.pointColor,
      pointBorderWidth = _ref.pointBorderWidth,
      pointBorderColor = _ref.pointBorderColor,
      enableGridX = _ref.enableGridX,
      gridXValues = _ref.gridXValues,
      enableGridY = _ref.enableGridY,
      gridYValues = _ref.gridYValues,
      axisTop = _ref.axisTop,
      axisRight = _ref.axisRight,
      axisBottom = _ref.axisBottom,
      axisLeft = _ref.axisLeft,
      legends = _ref.legends,
      overflow = _ref.overflow,
      isInteractive = _ref.isInteractive,
      debugMesh = _ref.debugMesh,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick,
      tooltip = _ref.tooltip;
  var canvasEl = useRef(null);
  var _useDimensions = useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var theme = useTheme();
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentPoint = _useState2[0],
      setCurrentPoint = _useState2[1];
  var _useLine = useLine({
    data: data,
    xScale: xScaleSpec,
    xFormat: xFormat,
    yScale: yScaleSpec,
    yFormat: yFormat,
    width: innerWidth,
    height: innerHeight,
    colors: colors,
    curve: curve,
    areaBaselineValue: areaBaselineValue,
    pointColor: pointColor,
    pointBorderColor: pointBorderColor
  }),
      lineGenerator = _useLine.lineGenerator,
      areaGenerator = _useLine.areaGenerator,
      series = _useLine.series,
      xScale = _useLine.xScale,
      yScale = _useLine.yScale,
      points = _useLine.points;
  var _useVoronoiMesh = useVoronoiMesh({
    points: points,
    width: innerWidth,
    height: innerHeight,
    debug: debugMesh
  }),
      delaunay = _useVoronoiMesh.delaunay,
      voronoi = _useVoronoiMesh.voronoi;
  useEffect(function () {
    canvasEl.current.width = outerWidth * pixelRatio;
    canvasEl.current.height = outerHeight * pixelRatio;
    var ctx = canvasEl.current.getContext('2d');
    ctx.scale(pixelRatio, pixelRatio);
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, outerWidth, outerHeight);
    ctx.translate(margin.left, margin.top);
    layers.forEach(function (layer) {
      if (typeof layer === 'function') {
        layer({
          ctx: ctx,
          innerWidth: innerWidth,
          innerHeight: innerHeight,
          series: series,
          points: points,
          xScale: xScale,
          yScale: yScale,
          lineWidth: lineWidth,
          lineGenerator: lineGenerator,
          areaGenerator: areaGenerator,
          currentPoint: currentPoint,
          setCurrentPoint: setCurrentPoint
        });
      }
      if (layer === 'grid' && theme.grid.line.strokeWidth > 0) {
        ctx.lineWidth = theme.grid.line.strokeWidth;
        ctx.strokeStyle = theme.grid.line.stroke;
        enableGridX && renderGridLinesToCanvas(ctx, {
          width: innerWidth,
          height: innerHeight,
          scale: xScale,
          axis: 'x',
          values: gridXValues
        });
        enableGridY && renderGridLinesToCanvas(ctx, {
          width: innerWidth,
          height: innerHeight,
          scale: yScale,
          axis: 'y',
          values: gridYValues
        });
      }
      if (layer === 'axes') {
        renderAxesToCanvas(ctx, {
          xScale: xScale,
          yScale: yScale,
          width: innerWidth,
          height: innerHeight,
          top: axisTop,
          right: axisRight,
          bottom: axisBottom,
          left: axisLeft,
          theme: theme
        });
      }
      if (layer === 'mesh' && debugMesh === true) {
        renderVoronoiToCanvas(ctx, voronoi);
        if (currentPoint) {
          renderVoronoiCellToCanvas(ctx, voronoi, currentPoint.index);
        }
      }
      if (layer === 'legends') {
        var legendData = series.map(function (serie) {
          return {
            id: serie.id,
            label: serie.id,
            color: serie.color
          };
        }).reverse();
        legends.forEach(function (legend) {
          renderLegendToCanvas(ctx, _objectSpread2(_objectSpread2({}, legend), {}, {
            data: legend.data || legendData,
            containerWidth: innerWidth,
            containerHeight: innerHeight,
            theme: theme
          }));
        });
      }
      if (layer === 'areas' && enableArea === true) {
        ctx.save();
        ctx.globalAlpha = areaOpacity;
        if (!overflow) clip({
          ctx: ctx,
          margin: margin,
          width: outerWidth,
          height: outerHeight
        });
        areaGenerator.context(ctx);
        series.forEach(function (serie) {
          ctx.fillStyle = serie.color;
          ctx.beginPath();
          areaGenerator(serie.data.map(function (d) {
            return d.position;
          }));
          ctx.fill();
        });
        ctx.restore();
      }
      if (layer === 'lines') {
        if (!overflow) clip({
          ctx: ctx,
          margin: margin,
          width: outerWidth,
          height: outerHeight
        });
        lineGenerator.context(ctx);
        series.forEach(function (serie) {
          ctx.strokeStyle = serie.color;
          ctx.lineWidth = lineWidth;
          ctx.beginPath();
          lineGenerator(serie.data.map(function (d) {
            return d.position;
          }));
          ctx.stroke();
        });
      }
      if (layer === 'points' && enablePoints === true && pointSize > 0) {
        if (!overflow) clip({
          ctx: ctx,
          margin: margin,
          width: outerWidth,
          height: outerHeight
        });
        points.forEach(function (point) {
          ctx.fillStyle = point.color;
          ctx.beginPath();
          ctx.arc(point.x, point.y, pointSize / 2, 0, 2 * Math.PI);
          ctx.fill();
          if (pointBorderWidth > 0) {
            ctx.strokeStyle = point.borderColor;
            ctx.lineWidth = pointBorderWidth;
            ctx.stroke();
          }
        });
      }
    });
  }, [canvasEl, outerWidth, outerHeight, layers, theme, lineGenerator, series, xScale, yScale, enableGridX, gridXValues, enableGridY, gridYValues, axisTop, axisRight, axisBottom, axisLeft, legends, points, enablePoints, pointSize, currentPoint]);
  var getPointFromMouseEvent = useCallback(function (event) {
    var _getRelativeCursor = getRelativeCursor(canvasEl.current, event),
        _getRelativeCursor2 = _slicedToArray(_getRelativeCursor, 2),
        x = _getRelativeCursor2[0],
        y = _getRelativeCursor2[1];
    if (!isCursorInRect(margin.left, margin.top, innerWidth, innerHeight, x, y)) return null;
    var pointIndex = delaunay.find(x - margin.left, y - margin.top);
    return points[pointIndex];
  }, [canvasEl, margin, innerWidth, innerHeight, delaunay]);
  var _useTooltip = useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleMouseHover = useCallback(function (event) {
    var point = getPointFromMouseEvent(event);
    setCurrentPoint(point);
    if (point) {
      showTooltipFromEvent(React.createElement(tooltip, {
        point: point
      }), event);
    } else {
      hideTooltip();
    }
  }, [getPointFromMouseEvent, setCurrentPoint, showTooltipFromEvent, hideTooltip, tooltip]);
  var handleMouseLeave = useCallback(function (event) {
    hideTooltip();
    setCurrentPoint(null);
    currentPoint && onMouseLeave && onMouseLeave(currentPoint, event);
  }, [hideTooltip, setCurrentPoint, onMouseLeave]);
  var handleClick = useCallback(function (event) {
    if (onClick) {
      var point = getPointFromMouseEvent(event);
      point && onClick(point, event);
    }
  }, [getPointFromMouseEvent, onClick]);
  return React.createElement("canvas", {
    ref: canvasEl,
    width: outerWidth * pixelRatio,
    height: outerHeight * pixelRatio,
    style: {
      width: outerWidth,
      height: outerHeight,
      cursor: isInteractive ? 'auto' : 'normal'
    },
    onMouseEnter: isInteractive ? handleMouseHover : undefined,
    onMouseMove: isInteractive ? handleMouseHover : undefined,
    onMouseLeave: isInteractive ? handleMouseLeave : undefined,
    onClick: isInteractive ? handleClick : undefined
  });
};
LineCanvas.defaultProps = LineCanvasDefaultProps;
var LineCanvas$1 = withContainer(LineCanvas);

var ResponsiveLineCanvas = function ResponsiveLineCanvas(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(LineCanvas$1, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

export { Line$1 as Line, LineCanvas$1 as LineCanvas, LineCanvasDefaultProps, LineCanvasPropTypes, LineDefaultProps, LinePropTypes, ResponsiveLine, ResponsiveLineCanvas, useAreaGenerator, useLine, useLineGenerator, useSlices };
//# sourceMappingURL=nivo-line.es.js.map
