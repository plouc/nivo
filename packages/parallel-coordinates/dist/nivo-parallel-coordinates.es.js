import React, { useMemo, memo, useCallback, useRef, useEffect } from 'react';
import { lineCurvePropType, curveFromProp, useMotionConfig, withContainer, useDimensions, SvgWrapper, ResponsiveWrapper, useTheme } from '@bitbloom/nivo-core';
import { Axis, renderAxisToCanvas } from '@bitbloom/nivo-axes';
import PropTypes from 'prop-types';
import { ordinalColorsPropType, useOrdinalColorScale } from '@bitbloom/nivo-colors';
import { line } from 'd3-shape';
import { scalePoint, scaleLinear } from 'd3-scale';
import { useSpring, animated } from 'react-spring';
import { TableTooltip, useTooltip } from '@bitbloom/nivo-tooltip';

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

var commonVariablePropTypes = {
  key: PropTypes.string.isRequired,
  ticksPosition: PropTypes.oneOf(['before', 'after']),
  tickSize: PropTypes.number,
  tickPadding: PropTypes.number,
  tickRotation: PropTypes.number,
  format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  legend: PropTypes.node,
  legendPosition: PropTypes.oneOf(['start', 'middle', 'end']),
  legendOffset: PropTypes.number
};
var commonPropTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  variables: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape(_objectSpread2(_objectSpread2({}, commonVariablePropTypes), {}, {
    key: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['point']).isRequired,
    padding: PropTypes.number,
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    tickValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  })), PropTypes.shape(_objectSpread2(_objectSpread2({}, commonVariablePropTypes), {}, {
    type: PropTypes.oneOf(['linear']).isRequired,
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    tickValues: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)])
  }))])).isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  curve: lineCurvePropType.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  lineOpacity: PropTypes.number.isRequired,
  axesPlan: PropTypes.oneOf(['foreground', 'background']).isRequired,
  axesTicksPosition: PropTypes.oneOf(['before', 'after']).isRequired,
  colors: ordinalColorsPropType.isRequired
};
var svgPropTypes = _objectSpread2(_objectSpread2({}, commonPropTypes), {}, {
  role: PropTypes.string.isRequired
});
var commonDefaultProps = {
  layout: 'horizontal',
  curve: 'linear',
  colors: {
    scheme: 'yellow_orange_red'
  },
  strokeWidth: 2,
  lineOpacity: 0.35,
  axesPlan: 'foreground',
  axesTicksPosition: 'after',
  animate: true,
  motionConfig: 'gentle'
};
var svgDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  role: 'img'
});

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

var computeParallelCoordinatesLayout = function computeParallelCoordinatesLayout(_ref) {
  var width = _ref.width,
      height = _ref.height,
      data = _ref.data,
      variables = _ref.variables,
      layout = _ref.layout;
  var variablesScale = scalePoint().range(layout === 'horizontal' ? [0, width] : [height, 0]).domain(variables.map(function (_ref2) {
    var key = _ref2.key;
    return key;
  }));
  var range = layout === 'horizontal' ? [height, 0] : [0, width];
  var variablesWithScale = variables.map(function (variable) {
    var allValues = new Set();
    data.forEach(function (d) {
      return allValues.add(d[variable.key]);
    });
    var scale;
    if (variable.type === 'linear') {
      var min = variable.min !== undefined && variable.min !== 'auto' ? variable.min : Math.min.apply(Math, _toConsumableArray(Array.from(allValues)));
      var max = variable.max !== undefined && variable.max !== 'auto' ? variable.max : Math.max.apply(Math, _toConsumableArray(Array.from(allValues)));
      scale = scaleLinear().rangeRound(range).domain([min, max]);
    }
    if (variable.type === 'point') {
      scale = scalePoint().range(range).domain(variable.values || allValues);
      if (variable.padding !== undefined) {
        scale.padding(variable.padding);
      }
    }
    return _objectSpread2(_objectSpread2({}, variable), {}, {
      scale: scale,
      values: Array.from(allValues)
    });
  });
  var dataWithPoints = data.map(function (datum, index) {
    var points = variablesWithScale.map(function (variable) {
      return {
        x: layout === 'horizontal' ? variablesScale(variable.key) : variable.scale(datum[variable.key]),
        y: layout === 'horizontal' ? variable.scale(datum[variable.key]) : variablesScale(variable.key)
      };
    });
    return _objectSpread2(_objectSpread2({
      index: index
    }, datum), {}, {
      points: points
    });
  });
  return {
    variablesScale: variablesScale,
    variablesWithScale: variablesWithScale,
    dataWithPoints: dataWithPoints
  };
};
var useParallelCoordinates = function useParallelCoordinates(_ref3) {
  var width = _ref3.width,
      height = _ref3.height,
      data = _ref3.data,
      variables = _ref3.variables,
      layout = _ref3.layout,
      colors = _ref3.colors,
      curve = _ref3.curve;
  var getLineColor = useOrdinalColorScale(colors, 'index');
  var lineGenerator = useMemo(function () {
    return line().x(function (d) {
      return d.x;
    }).y(function (d) {
      return d.y;
    }).curve(curveFromProp(curve));
  }, [curve]);
  var _useMemo = useMemo(function () {
    return computeParallelCoordinatesLayout({
      width: width,
      height: height,
      data: data,
      variables: variables,
      layout: layout
    });
  }, [width, height, data, variables, layout]),
      variablesScale = _useMemo.variablesScale,
      variablesWithScale = _useMemo.variablesWithScale,
      dataWithPoints = _useMemo.dataWithPoints;
  return {
    variablesScale: variablesScale,
    variablesWithScale: variablesWithScale,
    dataWithPoints: dataWithPoints,
    getLineColor: getLineColor,
    lineGenerator: lineGenerator
  };
};

var ParallelCoordinatesLineTooltip = function ParallelCoordinatesLineTooltip(_ref) {
  var data = _ref.data,
      variables = _ref.variables;
  return React.createElement(TableTooltip, {
    rows: variables.map(function (variable) {
      return [variable.key, React.createElement("strong", null, data[variable.key])
      ];
    })
  });
};
var ParallelCoordinatesLineTooltip$1 = memo(ParallelCoordinatesLineTooltip);

var ParallelCoordinatesLine = function ParallelCoordinatesLine(_ref) {
  var data = _ref.data,
      variables = _ref.variables,
      lineGenerator = _ref.lineGenerator,
      points = _ref.points,
      strokeWidth = _ref.strokeWidth,
      color = _ref.color,
      opacity = _ref.opacity;
  var _useTooltip = useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleMouseHover = useCallback(function (event) {
    showTooltipFromEvent( React.createElement(ParallelCoordinatesLineTooltip$1, {
      data: data,
      variables: variables
    }), event);
  }, [data, variables]);
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var animatedProps = useSpring({
    path: lineGenerator(points),
    color: color,
    opacity: opacity,
    config: springConfig,
    immediate: !animate
  });
  return React.createElement(animated.path, {
    d: animatedProps.path,
    stroke: animatedProps.color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    opacity: animatedProps.opacity,
    fill: "none",
    onMouseEnter: handleMouseHover,
    onMouseMove: handleMouseHover,
    onMouseLeave: hideTooltip
  });
};
var ParallelCoordinatesLine$1 = memo(ParallelCoordinatesLine);

var ParallelCoordinates = function ParallelCoordinates(_ref) {
  var data = _ref.data,
      variables = _ref.variables,
      layout = _ref.layout,
      width = _ref.width,
      height = _ref.height,
      partialMargin = _ref.margin,
      axesPlan = _ref.axesPlan,
      axesTicksPosition = _ref.axesTicksPosition,
      strokeWidth = _ref.strokeWidth,
      lineOpacity = _ref.lineOpacity,
      curve = _ref.curve,
      colors = _ref.colors,
      role = _ref.role;
  var _useDimensions = useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useParallelCoordinat = useParallelCoordinates({
    width: innerWidth,
    height: innerHeight,
    data: data,
    variables: variables,
    layout: layout,
    colors: colors,
    curve: curve
  }),
      variablesScale = _useParallelCoordinat.variablesScale,
      variablesWithScale = _useParallelCoordinat.variablesWithScale,
      dataWithPoints = _useParallelCoordinat.dataWithPoints,
      lineGenerator = _useParallelCoordinat.lineGenerator,
      getLineColor = _useParallelCoordinat.getLineColor;
  var axes = variablesWithScale.map(function (variable) {
    return React.createElement(Axis, {
      key: variable.key,
      axis: layout === 'horizontal' ? 'y' : 'x',
      length: layout === 'horizontal' ? innerHeight : innerWidth,
      x: layout === 'horizontal' ? variablesScale(variable.key) : 0,
      y: layout === 'horizontal' ? 0 : variablesScale(variable.key),
      scale: variable.scale,
      ticksPosition: variable.ticksPosition || axesTicksPosition,
      tickValues: variable.tickValues,
      tickSize: variable.tickSize,
      tickPadding: variable.tickPadding,
      tickRotation: variable.tickRotation,
      format: variable.tickFormat,
      legend: variable.legend,
      legendPosition: variable.legendPosition,
      legendOffset: variable.legendOffset
    });
  });
  return React.createElement(SvgWrapper, {
    width: outerWidth,
    height: outerHeight,
    margin: margin,
    role: role
  }, axesPlan === 'background' && axes, dataWithPoints.map(function (datum) {
    return React.createElement(ParallelCoordinatesLine$1, {
      key: datum.index,
      data: datum,
      variables: variables,
      lineGenerator: lineGenerator,
      points: datum.points,
      strokeWidth: strokeWidth,
      opacity: lineOpacity,
      color: getLineColor(datum)
    });
  }), axesPlan === 'foreground' && axes);
};
var WrappedParallelCoordinates = withContainer(ParallelCoordinates);
WrappedParallelCoordinates.defaultProps = svgDefaultProps;

var ResponsiveParallelCoordinates = function ResponsiveParallelCoordinates(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(WrappedParallelCoordinates, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

var ParallelCoordinatesCanvas = function ParallelCoordinatesCanvas(_ref) {
  var data = _ref.data,
      layout = _ref.layout,
      variables = _ref.variables,
      width = _ref.width,
      height = _ref.height,
      partialMargin = _ref.margin,
      curve = _ref.curve,
      colors = _ref.colors,
      lineOpacity = _ref.lineOpacity,
      strokeWidth = _ref.strokeWidth,
      axesTicksPosition = _ref.axesTicksPosition,
      pixelRatio = _ref.pixelRatio;
  var canvasEl = useRef(null);
  var _useDimensions = useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useParallelCoordinat = useParallelCoordinates({
    width: innerWidth,
    height: innerHeight,
    data: data,
    variables: variables,
    layout: layout,
    colors: colors,
    curve: curve
  }),
      variablesScale = _useParallelCoordinat.variablesScale,
      variablesWithScale = _useParallelCoordinat.variablesWithScale,
      dataWithPoints = _useParallelCoordinat.dataWithPoints,
      lineGenerator = _useParallelCoordinat.lineGenerator,
      getLineColor = _useParallelCoordinat.getLineColor;
  var theme = useTheme();
  useEffect(function () {
    canvasEl.current.width = outerWidth * pixelRatio;
    canvasEl.current.height = outerHeight * pixelRatio;
    var ctx = canvasEl.current.getContext('2d');
    ctx.scale(pixelRatio, pixelRatio);
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, outerWidth, outerHeight);
    ctx.translate(margin.left, margin.top);
    lineGenerator.context(ctx);
    dataWithPoints.forEach(function (datum) {
      ctx.save();
      ctx.globalAlpha = lineOpacity;
      ctx.beginPath();
      lineGenerator(datum.points);
      ctx.strokeStyle = getLineColor(datum);
      ctx.lineWidth = strokeWidth;
      ctx.stroke();
      ctx.restore();
    });
    variablesWithScale.map(function (variable) {
      renderAxisToCanvas(ctx, {
        axis: layout === 'horizontal' ? 'y' : 'x',
        scale: variable.scale,
        x: layout === 'horizontal' ? variablesScale(variable.key) : 0,
        y: layout === 'horizontal' ? 0 : variablesScale(variable.key),
        length: layout === 'horizontal' ? innerHeight : innerWidth,
        ticksPosition: axesTicksPosition,
        theme: theme
      });
    });
  }, [canvasEl, outerWidth, outerHeight, innerWidth, innerHeight, margin, lineGenerator, getLineColor, lineOpacity, strokeWidth, dataWithPoints, variablesWithScale, layout, axesTicksPosition, theme, pixelRatio]);
  return React.createElement("canvas", {
    ref: canvasEl,
    width: outerWidth * pixelRatio,
    height: outerHeight * pixelRatio,
    style: {
      width: outerWidth,
      height: outerHeight
    }
  });
};
var WrappedParallelCoordinatesCanvas = withContainer(ParallelCoordinatesCanvas);
WrappedParallelCoordinatesCanvas.defaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
});

var ResponsiveParallelCoordinatesCanvas = function ResponsiveParallelCoordinatesCanvas(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(WrappedParallelCoordinatesCanvas, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

export { WrappedParallelCoordinates as ParallelCoordinates, WrappedParallelCoordinatesCanvas as ParallelCoordinatesCanvas, ResponsiveParallelCoordinates, ResponsiveParallelCoordinatesCanvas, commonDefaultProps, commonPropTypes, svgDefaultProps, svgPropTypes };
//# sourceMappingURL=nivo-parallel-coordinates.es.js.map
