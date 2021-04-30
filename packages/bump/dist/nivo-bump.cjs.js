'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var nivoCore = require('@bitbloom/nivo-core');
var nivoAxes = require('@bitbloom/nivo-axes');
var d3Shape = require('d3-shape');
var nivoColors = require('@bitbloom/nivo-colors');
var nivoTooltip = require('@bitbloom/nivo-tooltip');
var d3Scale = require('d3-scale');
var PropTypes = _interopDefault(require('prop-types'));
var reactSpring = require('react-spring');

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

var computeSeries = function computeSeries(_ref) {
  var width = _ref.width,
      height = _ref.height,
      data = _ref.data,
      xPadding = _ref.xPadding,
      xOuterPadding = _ref.xOuterPadding,
      yOuterPadding = _ref.yOuterPadding;
  var xValues = new Set();
  data.forEach(function (serie) {
    serie.data.forEach(function (datum) {
      if (!xValues.has(datum.x)) {
        xValues.add(datum.x);
      }
    });
  });
  xValues = Array.from(xValues);
  var xScale = d3Scale.scalePoint().domain(xValues).range([0, width]).padding(xOuterPadding);
  var yScale = d3Scale.scalePoint().domain(data.map(function (serie, i) {
    return i + 1;
  })).range([0, height]).padding(yOuterPadding);
  var linePointPadding = xScale.step() * Math.min(xPadding * 0.5, 0.5);
  var series = data.map(function (rawSerie) {
    var serie = _objectSpread2(_objectSpread2({}, rawSerie), {}, {
      points: [],
      linePoints: []
    });
    rawSerie.data.forEach(function (datum, i) {
      var x = null;
      var y = null;
      if (datum.y !== null && datum.y !== undefined) {
        x = xScale(datum.x);
        y = yScale(datum.y);
      }
      var point = {
        id: "".concat(rawSerie.id, ".").concat(i),
        serie: rawSerie,
        data: datum,
        x: x,
        y: y
      };
      serie.points.push(point);
      if (x !== null) {
        if (i === 0) {
          serie.linePoints.push([0, point.y]);
        } else {
          serie.linePoints.push([point.x - linePointPadding, point.y]);
        }
      }
      serie.linePoints.push([point.x, point.y]);
      if (x !== null) {
        if (i === rawSerie.data.length - 1 && x) {
          serie.linePoints.push([width, point.y]);
        } else {
          serie.linePoints.push([point.x + linePointPadding, point.y]);
        }
      }
      serie.points = serie.points.filter(function (point) {
        return point.x !== null;
      });
    });
    return serie;
  });
  return {
    series: series,
    xScale: xScale,
    yScale: yScale
  };
};

var useLineGenerator = function useLineGenerator(interpolation) {
  return React.useMemo(function () {
    return d3Shape.line().curve(interpolation === 'smooth' ? d3Shape.curveBasis : d3Shape.curveLinear).defined(function (d) {
      return d[0] !== null && d[1] !== null;
    });
  }, [interpolation]);
};
var useSerieDerivedProp = function useSerieDerivedProp(instruction) {
  return React.useMemo(function () {
    if (typeof instruction === 'function') return instruction;
    return function () {
      return instruction;
    };
  }, [instruction]);
};
var useSerieStyle = function useSerieStyle(_ref) {
  var lineWidth = _ref.lineWidth,
      activeLineWidth = _ref.activeLineWidth,
      inactiveLineWidth = _ref.inactiveLineWidth,
      opacity = _ref.opacity,
      activeOpacity = _ref.activeOpacity,
      inactiveOpacity = _ref.inactiveOpacity,
      isInteractive = _ref.isInteractive,
      currentSerie = _ref.currentSerie;
  var getLineWidth = useSerieDerivedProp(lineWidth);
  var getActiveLineWidth = useSerieDerivedProp(activeLineWidth);
  var getInactiveLineWidth = useSerieDerivedProp(inactiveLineWidth);
  var getOpacity = useSerieDerivedProp(opacity);
  var getActiveOpacity = useSerieDerivedProp(activeOpacity);
  var getInactiveOpacity = useSerieDerivedProp(inactiveOpacity);
  var getNormalStyle = React.useMemo(function () {
    return function (serie) {
      return {
        lineWidth: getLineWidth(serie),
        opacity: getOpacity(serie)
      };
    };
  }, [getLineWidth, getOpacity]);
  var getActiveStyle = React.useMemo(function () {
    return function (serie) {
      return {
        lineWidth: getActiveLineWidth(serie),
        opacity: getActiveOpacity(serie)
      };
    };
  }, [getActiveLineWidth, getActiveOpacity]);
  var getInactiveStyle = React.useMemo(function () {
    return function (serie) {
      return {
        lineWidth: getInactiveLineWidth(serie),
        opacity: getInactiveOpacity(serie)
      };
    };
  }, [getInactiveLineWidth, getInactiveOpacity]);
  return React.useMemo(function () {
    if (!isInteractive) return getNormalStyle;
    return function (serie) {
      if (currentSerie === null) return getNormalStyle(serie);
      if (serie.id === currentSerie) return getActiveStyle(serie);
      return getInactiveStyle(serie);
    };
  }, [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, currentSerie]);
};
var usePointStyle = function usePointStyle(_ref2) {
  var pointSize = _ref2.pointSize,
      activePointSize = _ref2.activePointSize,
      inactivePointSize = _ref2.inactivePointSize,
      pointBorderWidth = _ref2.pointBorderWidth,
      activePointBorderWidth = _ref2.activePointBorderWidth,
      inactivePointBorderWidth = _ref2.inactivePointBorderWidth,
      isInteractive = _ref2.isInteractive,
      currentSerie = _ref2.currentSerie;
  var getSize = useSerieDerivedProp(pointSize);
  var getActiveSize = useSerieDerivedProp(activePointSize);
  var getInactiveSize = useSerieDerivedProp(inactivePointSize);
  var getBorderWidth = useSerieDerivedProp(pointBorderWidth);
  var getActiveBorderWidth = useSerieDerivedProp(activePointBorderWidth);
  var getInactiveBorderWidth = useSerieDerivedProp(inactivePointBorderWidth);
  var getNormalStyle = React.useMemo(function () {
    return function (point) {
      return {
        size: getSize(point),
        borderWidth: getBorderWidth(point)
      };
    };
  }, [getSize, getBorderWidth]);
  var getActiveStyle = React.useMemo(function () {
    return function (point) {
      return {
        size: getActiveSize(point),
        borderWidth: getActiveBorderWidth(point)
      };
    };
  }, [getActiveSize, getActiveBorderWidth]);
  var getInactiveStyle = React.useMemo(function () {
    return function (point) {
      return {
        size: getInactiveSize(point),
        borderWidth: getInactiveBorderWidth(point)
      };
    };
  }, [getInactiveSize, getInactiveBorderWidth]);
  return React.useMemo(function () {
    if (!isInteractive) return getNormalStyle;
    return function (point) {
      if (currentSerie === null) return getNormalStyle(point);
      if (point.serieId === currentSerie) return getActiveStyle(point);
      return getInactiveStyle(point);
    };
  }, [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, currentSerie]);
};
var useBump = function useBump(_ref3) {
  var width = _ref3.width,
      height = _ref3.height,
      data = _ref3.data,
      interpolation = _ref3.interpolation,
      xPadding = _ref3.xPadding,
      xOuterPadding = _ref3.xOuterPadding,
      yOuterPadding = _ref3.yOuterPadding,
      lineWidth = _ref3.lineWidth,
      activeLineWidth = _ref3.activeLineWidth,
      inactiveLineWidth = _ref3.inactiveLineWidth,
      colors = _ref3.colors,
      opacity = _ref3.opacity,
      activeOpacity = _ref3.activeOpacity,
      inactiveOpacity = _ref3.inactiveOpacity,
      pointSize = _ref3.pointSize,
      activePointSize = _ref3.activePointSize,
      inactivePointSize = _ref3.inactivePointSize,
      pointColor = _ref3.pointColor,
      pointBorderWidth = _ref3.pointBorderWidth,
      activePointBorderWidth = _ref3.activePointBorderWidth,
      inactivePointBorderWidth = _ref3.inactivePointBorderWidth,
      pointBorderColor = _ref3.pointBorderColor,
      isInteractive = _ref3.isInteractive,
      currentSerie = _ref3.currentSerie;
  var _useMemo = React.useMemo(function () {
    return computeSeries({
      width: width,
      height: height,
      data: data,
      xPadding: xPadding,
      xOuterPadding: xOuterPadding,
      yOuterPadding: yOuterPadding
    });
  }, [width, height, data, xPadding, xOuterPadding, yOuterPadding]),
      rawSeries = _useMemo.series,
      xScale = _useMemo.xScale,
      yScale = _useMemo.yScale;
  var lineGenerator = useLineGenerator(interpolation);
  var getColor = nivoColors.useOrdinalColorScale(colors, 'id');
  var getSerieStyle = useSerieStyle({
    lineWidth: lineWidth,
    activeLineWidth: activeLineWidth,
    inactiveLineWidth: inactiveLineWidth,
    opacity: opacity,
    activeOpacity: activeOpacity,
    inactiveOpacity: inactiveOpacity,
    isInteractive: isInteractive,
    currentSerie: currentSerie
  });
  var series = React.useMemo(function () {
    return rawSeries.map(function (serie) {
      serie.color = getColor(serie);
      serie.style = getSerieStyle(serie);
      return serie;
    });
  }, [rawSeries, getColor, getSerieStyle]);
  var theme = nivoCore.useTheme();
  var getPointColor = nivoColors.useInheritedColor(pointColor, theme);
  var getPointBorderColor = nivoColors.useInheritedColor(pointBorderColor, theme);
  var getPointStyle = usePointStyle({
    pointSize: pointSize,
    activePointSize: activePointSize,
    inactivePointSize: inactivePointSize,
    pointBorderWidth: pointBorderWidth,
    activePointBorderWidth: activePointBorderWidth,
    inactivePointBorderWidth: inactivePointBorderWidth,
    isInteractive: isInteractive,
    currentSerie: currentSerie
  });
  var points = React.useMemo(function () {
    var pts = [];
    series.forEach(function (serie) {
      serie.points.forEach(function (rawPoint) {
        var point = _objectSpread2(_objectSpread2({}, rawPoint), {}, {
          serie: serie,
          serieId: serie.id,
          isActive: currentSerie === serie.id,
          isInactive: currentSerie !== null && currentSerie !== serie.id
        });
        point.color = getPointColor(point);
        point.borderColor = getPointBorderColor(point);
        point.style = getPointStyle(_objectSpread2(_objectSpread2({}, point), {}, {
          serie: serie
        }));
        pts.push(point);
      });
    });
    return pts;
  }, [series, getPointColor, getPointBorderColor, getPointStyle, currentSerie]);
  return {
    xScale: xScale,
    yScale: yScale,
    series: series,
    points: points,
    lineGenerator: lineGenerator
  };
};
var useSerieHandlers = function useSerieHandlers(_ref4) {
  var serie = _ref4.serie,
      isInteractive = _ref4.isInteractive,
      onMouseEnter = _ref4.onMouseEnter,
      onMouseMove = _ref4.onMouseMove,
      onMouseLeave = _ref4.onMouseLeave,
      onClick = _ref4.onClick,
      setCurrent = _ref4.setCurrent,
      tooltip = _ref4.tooltip;
  var _useTooltip = nivoTooltip.useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleMouseEnter = React.useCallback(function (event) {
    showTooltipFromEvent(React__default.createElement(tooltip, {
      serie: serie
    }), event);
    setCurrent(serie.id);
    onMouseEnter && onMouseEnter(serie, event);
  }, [serie, onMouseEnter, showTooltipFromEvent, setCurrent]);
  var handleMouseMove = React.useCallback(function (event) {
    showTooltipFromEvent(React__default.createElement(tooltip, {
      serie: serie
    }), event);
    onMouseMove && onMouseMove(serie, event);
  }, [serie, onMouseMove, showTooltipFromEvent]);
  var handleMouseLeave = React.useCallback(function (event) {
    hideTooltip();
    setCurrent(null);
    onMouseLeave && onMouseLeave(serie, event);
  }, [serie, onMouseLeave, hideTooltip, setCurrent]);
  var handleClick = React.useCallback(function (event) {
    onClick && onClick(serie, event);
  }, [serie, onClick]);
  var handlers = React.useMemo(function () {
    return {
      onMouseEnter: isInteractive ? handleMouseEnter : undefined,
      onMouseMove: isInteractive ? handleMouseMove : undefined,
      onMouseLeave: isInteractive ? handleMouseLeave : undefined,
      onClick: isInteractive ? handleClick : undefined
    };
  }, [isInteractive, handleMouseEnter, handleMouseMove, handleMouseLeave, handleClick]);
  return handlers;
};
var useSeriesLabels = function useSeriesLabels(_ref5) {
  var series = _ref5.series,
      position = _ref5.position,
      padding = _ref5.padding,
      color = _ref5.color,
      getLabel = _ref5.getLabel;
  var theme = nivoCore.useTheme();
  var getColor = nivoColors.useInheritedColor(color, theme);
  return React.useMemo(function () {
    var textAnchor;
    var signedPadding;
    if (position === 'start') {
      textAnchor = 'end';
      signedPadding = padding * -1;
    } else {
      textAnchor = 'start';
      signedPadding = padding;
    }
    var labels = [];
    series.forEach(function (serie) {
      var label = serie.id;
      if (typeof getLabel === 'function') {
        label = getLabel(serie);
      }
      var point = position === 'start' ? serie.linePoints[0] : serie.linePoints[serie.linePoints.length - 1];
      if (point[0] === null || point[1] === null) {
        return;
      }
      labels.push({
        id: serie.id,
        label: label,
        x: point[0] + signedPadding,
        y: point[1],
        color: getColor(serie),
        opacity: serie.style.opacity,
        serie: serie,
        textAnchor: textAnchor
      });
    });
    return labels;
  }, [series, position, padding, getColor]);
};

var LineTooltip = function LineTooltip(_ref) {
  var serie = _ref.serie;
  return React__default.createElement(nivoTooltip.BasicTooltip, {
    id: serie.id,
    enableChip: true,
    color: serie.color
  });
};
var LineTooltip$1 = React.memo(LineTooltip);

var pointStyle = {
  pointerEvents: 'none'
};
var Point = function Point(_ref) {
  var x = _ref.x,
      y = _ref.y,
      size = _ref.size,
      color = _ref.color,
      borderColor = _ref.borderColor,
      borderWidth = _ref.borderWidth;
  var _useMotionConfig = nivoCore.useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var animatedProps = reactSpring.useSpring({
    x: x,
    y: y,
    radius: size / 2,
    color: color,
    borderWidth: borderWidth,
    config: springConfig,
    immediate: !animate
  });
  return React__default.createElement(reactSpring.animated.circle, {
    cx: animatedProps.x,
    cy: animatedProps.y,
    r: animatedProps.radius.interpolate(function (v) {
      return Math.max(v, 0);
    }),
    fill: animatedProps.color,
    strokeWidth: animatedProps.borderWidth,
    stroke: borderColor,
    style: pointStyle
  });
};
var Point$1 = React.memo(Point);

var commonPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })).isRequired
  })).isRequired,
  layers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['grid', 'axes', 'labels', 'lines', 'points']), PropTypes.func])).isRequired,
  interpolation: PropTypes.oneOf(['linear', 'smooth']).isRequired,
  xPadding: PropTypes.number.isRequired,
  xOuterPadding: PropTypes.number.isRequired,
  yOuterPadding: PropTypes.number.isRequired,
  colors: nivoColors.ordinalColorsPropType.isRequired,
  lineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  activeLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  inactiveLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  opacity: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  activeOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  inactiveOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  startLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func]).isRequired,
  startLabelPadding: PropTypes.number.isRequired,
  startLabelTextColor: nivoColors.inheritedColorPropType.isRequired,
  endLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func]).isRequired,
  endLabelPadding: PropTypes.number.isRequired,
  endLabelTextColor: nivoColors.inheritedColorPropType.isRequired,
  pointComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pointSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  activePointSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  inactivePointSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  pointColor: nivoColors.inheritedColorPropType.isRequired,
  pointBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  activePointBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  inactivePointBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  pointBorderColor: nivoColors.inheritedColorPropType.isRequired,
  enableGridX: PropTypes.bool.isRequired,
  enableGridY: PropTypes.bool.isRequired,
  axisTop: nivoAxes.axisPropType,
  axisRight: nivoAxes.axisPropType,
  axisBottom: nivoAxes.axisPropType,
  axisLeft: nivoAxes.axisPropType,
  isInteractive: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
};
var BumpPropTypes = _objectSpread2(_objectSpread2(_objectSpread2({}, commonPropTypes), nivoCore.motionPropTypes), {}, {
  role: PropTypes.string.isRequired
});
var commonDefaultProps = {
  layers: ['grid', 'axes', 'labels', 'lines', 'points'],
  interpolation: 'smooth',
  xPadding: 0.6,
  xOuterPadding: 0.5,
  yOuterPadding: 0.5,
  colors: {
    scheme: 'nivo'
  },
  lineWidth: 2,
  activeLineWidth: 4,
  inactiveLineWidth: 1,
  opacity: 1,
  activeOpacity: 1,
  inactiveOpacity: 0.3,
  startLabel: false,
  startLabelPadding: 16,
  startLabelTextColor: {
    from: 'color'
  },
  endLabel: 'id',
  endLabelPadding: 16,
  endLabelTextColor: {
    from: 'color'
  },
  pointSize: 6,
  activePointSize: 8,
  inactivePointSize: 4,
  pointColor: {
    from: 'serie.color'
  },
  pointBorderWidth: 0,
  activePointBorderWidth: 0,
  inactivePointBorderWidth: 0,
  pointBorderColor: {
    from: 'serie.color',
    modifiers: [['darker', 1.4]]
  },
  enableGridX: true,
  enableGridY: true,
  axisTop: {},
  axisBottom: {},
  axisLeft: {},
  isInteractive: true,
  tooltip: LineTooltip$1
};
var BumpDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  pointComponent: Point$1,
  animate: true,
  motionConfig: 'gentle',
  role: 'img'
});

var Line = function Line(_ref) {
  var serie = _ref.serie,
      lineGenerator = _ref.lineGenerator,
      yStep = _ref.yStep,
      isInteractive = _ref.isInteractive,
      onMouseEnter = _ref.onMouseEnter,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick,
      setCurrentSerie = _ref.setCurrentSerie,
      tooltip = _ref.tooltip;
  var handlers = useSerieHandlers({
    serie: serie,
    isInteractive: isInteractive,
    onMouseEnter: onMouseEnter,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    onClick: onClick,
    setCurrent: setCurrentSerie,
    tooltip: tooltip
  });
  var _useMotionConfig = nivoCore.useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var linePath = lineGenerator(serie.linePoints);
  var animatedProps = reactSpring.useSpring({
    path: linePath,
    color: serie.color,
    opacity: serie.style.opacity,
    lineWidth: serie.style.lineWidth,
    config: springConfig,
    immediate: !animate
  });
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(reactSpring.animated.path, {
    fill: "none",
    d: animatedProps.path,
    stroke: animatedProps.color,
    strokeWidth: animatedProps.lineWidth,
    strokeLinecap: "round",
    strokeOpacity: animatedProps.opacity,
    style: {
      pointerEvents: 'none'
    }
  }), isInteractive && React__default.createElement("path", {
    fill: "none",
    stroke: "red",
    strokeOpacity: 0,
    strokeWidth: yStep,
    d: linePath,
    strokeLinecap: "butt",
    onMouseEnter: handlers.onMouseEnter,
    onMouseMove: handlers.onMouseMove,
    onMouseLeave: handlers.onMouseLeave,
    onClick: handlers.onClick
  }));
};
var Line$1 = React.memo(Line);

var LinesLabels = function LinesLabels(_ref) {
  var series = _ref.series,
      getLabel = _ref.getLabel,
      position = _ref.position,
      padding = _ref.padding,
      color = _ref.color;
  var theme = nivoCore.useTheme();
  var _useMotionConfig = nivoCore.useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var labels = useSeriesLabels({
    series: series,
    getLabel: getLabel,
    position: position,
    padding: padding,
    color: color
  });
  var springs = reactSpring.useSprings(labels.length, labels.map(function (label) {
    return {
      x: label.x,
      y: label.y,
      opacity: label.opacity,
      config: springConfig,
      immediate: !animate
    };
  }));
  return springs.map(function (animatedProps, index) {
    var label = labels[index];
    return React__default.createElement(reactSpring.animated.text, {
      key: label.id,
      x: animatedProps.x,
      y: animatedProps.y,
      textAnchor: label.textAnchor,
      dominantBaseline: "central",
      opacity: animatedProps.opacity,
      style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
        fill: label.color
      })
    }, label.label);
  });
};
var LinesLabels$1 = React.memo(LinesLabels);

var Points = function Points(_ref) {
  var pointComponent = _ref.pointComponent,
      points = _ref.points;
  return points.map(function (point) {
    return React__default.createElement(pointComponent, {
      key: point.id,
      data: point.data,
      x: point.x,
      y: point.y,
      isActive: point.isActive,
      isInactive: point.isInactive,
      size: point.style.size,
      color: point.color,
      borderColor: point.borderColor,
      borderWidth: point.style.borderWidth
    });
  });
};
var Points$1 = React.memo(Points);

var Bump = function Bump(props) {
  var data = props.data,
      width = props.width,
      height = props.height,
      partialMargin = props.margin,
      layers = props.layers,
      interpolation = props.interpolation,
      xPadding = props.xPadding,
      xOuterPadding = props.xOuterPadding,
      yOuterPadding = props.yOuterPadding,
      colors = props.colors,
      lineWidth = props.lineWidth,
      activeLineWidth = props.activeLineWidth,
      inactiveLineWidth = props.inactiveLineWidth,
      opacity = props.opacity,
      activeOpacity = props.activeOpacity,
      inactiveOpacity = props.inactiveOpacity,
      startLabel = props.startLabel,
      startLabelPadding = props.startLabelPadding,
      startLabelTextColor = props.startLabelTextColor,
      endLabel = props.endLabel,
      endLabelPadding = props.endLabelPadding,
      endLabelTextColor = props.endLabelTextColor,
      pointComponent = props.pointComponent,
      pointSize = props.pointSize,
      activePointSize = props.activePointSize,
      inactivePointSize = props.inactivePointSize,
      pointColor = props.pointColor,
      pointBorderWidth = props.pointBorderWidth,
      activePointBorderWidth = props.activePointBorderWidth,
      inactivePointBorderWidth = props.inactivePointBorderWidth,
      pointBorderColor = props.pointBorderColor,
      axisTop = props.axisTop,
      axisRight = props.axisRight,
      axisBottom = props.axisBottom,
      axisLeft = props.axisLeft,
      enableGridX = props.enableGridX,
      enableGridY = props.enableGridY,
      isInteractive = props.isInteractive,
      onMouseEnter = props.onMouseEnter,
      onMouseMove = props.onMouseMove,
      onMouseLeave = props.onMouseLeave,
      onClick = props.onClick,
      tooltip = props.tooltip,
      role = props.role;
  var _useDimensions = nivoCore.useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentSerie = _useState2[0],
      setCurrentSerie = _useState2[1];
  var _useBump = useBump({
    width: innerWidth,
    height: innerHeight,
    data: data,
    interpolation: interpolation,
    xPadding: xPadding,
    xOuterPadding: xOuterPadding,
    yOuterPadding: yOuterPadding,
    lineWidth: lineWidth,
    activeLineWidth: activeLineWidth,
    inactiveLineWidth: inactiveLineWidth,
    colors: colors,
    opacity: opacity,
    activeOpacity: activeOpacity,
    inactiveOpacity: inactiveOpacity,
    pointSize: pointSize,
    activePointSize: activePointSize,
    inactivePointSize: inactivePointSize,
    pointColor: pointColor,
    pointBorderWidth: pointBorderWidth,
    activePointBorderWidth: activePointBorderWidth,
    inactivePointBorderWidth: inactivePointBorderWidth,
    pointBorderColor: pointBorderColor,
    startLabel: startLabel,
    endLabel: endLabel,
    isInteractive: isInteractive,
    currentSerie: currentSerie
  }),
      series = _useBump.series,
      points = _useBump.points,
      xScale = _useBump.xScale,
      yScale = _useBump.yScale,
      lineGenerator = _useBump.lineGenerator;
  var layerById = {
    grid: React__default.createElement(nivoAxes.Grid, {
      key: "grid",
      width: innerWidth,
      height: innerHeight,
      xScale: enableGridX ? xScale : null,
      yScale: enableGridY ? yScale : null
    }),
    axes: React__default.createElement(nivoAxes.Axes, {
      key: "axes",
      xScale: xScale,
      yScale: yScale,
      width: innerWidth,
      height: innerHeight,
      top: axisTop,
      right: axisRight,
      bottom: axisBottom,
      left: axisLeft
    }),
    labels: [],
    lines: React__default.createElement(React.Fragment, {
      key: "lines"
    }, series.map(function (serie) {
      return React__default.createElement(Line$1, {
        key: serie.id,
        serie: serie,
        currentSerie: currentSerie,
        setCurrentSerie: setCurrentSerie,
        lineGenerator: lineGenerator,
        yStep: yScale.step(),
        margin: margin,
        isInteractive: isInteractive,
        onMouseEnter: onMouseEnter,
        onMouseMove: onMouseMove,
        onMouseLeave: onMouseLeave,
        onClick: onClick,
        tooltip: tooltip
      });
    })),
    points: React__default.createElement(Points$1, {
      key: "points",
      pointComponent: pointComponent,
      points: points
    })
  };
  if (startLabel !== false) {
    layerById.labels.push( React__default.createElement(LinesLabels$1, {
      key: "start",
      series: series,
      getLabel: startLabel,
      position: "start",
      padding: startLabelPadding,
      color: startLabelTextColor
    }));
  }
  if (endLabel !== false) {
    layerById.labels.push( React__default.createElement(LinesLabels$1, {
      key: "end",
      series: series,
      getLabel: endLabel,
      position: "end",
      padding: endLabelPadding,
      color: endLabelTextColor
    }));
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
      }, layer({
        innerWidth: innerWidth,
        innerHeight: innerHeight,
        xScale: xScale,
        yScale: yScale
      }));
    }
    return layerById[layer];
  }));
};
Bump.defaultProps = BumpDefaultProps;
var Bump$1 = React.memo(nivoCore.withContainer(Bump));

var ResponsiveBump = function ResponsiveBump(props) {
  return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(Bump$1, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

var AreaTooltip = function AreaTooltip(_ref) {
  var serie = _ref.serie;
  return React__default.createElement(nivoTooltip.BasicTooltip, {
    id: serie.id,
    enableChip: true,
    color: serie.color
  });
};
var AreaTooltip$1 = React.memo(AreaTooltip);

var commonPropTypes$1 = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      y: PropTypes.number.isRequired
    })).isRequired
  })).isRequired,
  align: PropTypes.oneOf(['start', 'middle', 'end']).isRequired,
  layers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['grid', 'axes', 'labels', 'areas']), PropTypes.func])).isRequired,
  interpolation: PropTypes.oneOf(['linear', 'smooth']).isRequired,
  spacing: PropTypes.number.isRequired,
  xPadding: PropTypes.number.isRequired,
  colors: nivoColors.ordinalColorsPropType.isRequired,
  blendMode: nivoCore.blendModePropType.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  activeFillOpacity: PropTypes.number.isRequired,
  inactiveFillOpacity: PropTypes.number.isRequired,
  defs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })).isRequired,
  fill: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    match: PropTypes.oneOfType([PropTypes.oneOf(['*']), PropTypes.object, PropTypes.func]).isRequired
  })).isRequired,
  borderWidth: PropTypes.number.isRequired,
  activeBorderWidth: PropTypes.number.isRequired,
  inactiveBorderWidth: PropTypes.number.isRequired,
  borderColor: nivoColors.inheritedColorPropType.isRequired,
  borderOpacity: PropTypes.number.isRequired,
  activeBorderOpacity: PropTypes.number.isRequired,
  inactiveBorderOpacity: PropTypes.number.isRequired,
  startLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func]).isRequired,
  startLabelPadding: PropTypes.number.isRequired,
  startLabelTextColor: nivoColors.inheritedColorPropType.isRequired,
  endLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func]).isRequired,
  endLabelPadding: PropTypes.number.isRequired,
  endLabelTextColor: nivoColors.inheritedColorPropType.isRequired,
  enableGridX: PropTypes.bool.isRequired,
  axisTop: nivoAxes.axisPropType,
  axisBottom: nivoAxes.axisPropType,
  isInteractive: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
};
var AreaBumpPropTypes = _objectSpread2(_objectSpread2(_objectSpread2({}, commonPropTypes$1), nivoCore.motionPropTypes), {}, {
  role: PropTypes.string.isRequired
});
var commonDefaultProps$1 = {
  align: 'middle',
  layers: ['grid', 'axes', 'labels', 'areas'],
  interpolation: 'smooth',
  spacing: 0,
  xPadding: 0.6,
  colors: {
    scheme: 'nivo'
  },
  blendMode: 'normal',
  fillOpacity: 0.8,
  activeFillOpacity: 1,
  inactiveFillOpacity: 0.15,
  defs: [],
  fill: [],
  borderWidth: 1,
  activeBorderWidth: 1,
  inactiveBorderWidth: 0,
  borderColor: {
    from: 'color',
    modifiers: [['darker', 0.4]]
  },
  borderOpacity: 1,
  activeBorderOpacity: 1,
  inactiveBorderOpacity: 0,
  startLabel: false,
  startLabelPadding: 12,
  startLabelTextColor: {
    from: 'color',
    modifiers: [['darker', 1]]
  },
  endLabel: 'id',
  endLabelPadding: 12,
  endLabelTextColor: {
    from: 'color',
    modifiers: [['darker', 1]]
  },
  enableGridX: true,
  axisTop: {},
  axisBottom: {},
  isInteractive: true,
  tooltip: AreaTooltip$1
};
var AreaBumpDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps$1), {}, {
  animate: true,
  motionConfig: 'gentle',
  role: 'img'
});

var computeSeries$1 = function computeSeries(_ref) {
  var data = _ref.data,
      width = _ref.width,
      height = _ref.height,
      align = _ref.align,
      spacing = _ref.spacing,
      xPadding = _ref.xPadding;
  var slices = new Map();
  var maxSum = null;
  var maxValues = null;
  data.forEach(function (serie) {
    serie.data.forEach(function (datum) {
      if (!slices.has(datum.x)) {
        slices.set(datum.x, {
          id: datum.x,
          total: 0,
          values: new Map()
        });
      }
      var slice = slices.get(datum.x);
      var total = slice.total + datum.y;
      slice.total = total;
      slice.values.set(serie.id, {
        serieId: serie.id,
        value: datum.y
      });
      if (total === null || total > maxSum) {
        maxSum = total;
        maxValues = slice.values.size;
      }
    });
  });
  var xScale = d3Scale.scalePoint().domain(Array.from(slices.keys())).range([0, width]);
  var heightScale = d3Scale.scaleLinear().domain([0, maxSum]).range([0, height - maxValues * spacing]);
  slices.forEach(function (slice, x) {
    slice.x = xScale(x);
    var sliceHeight = heightScale(slice.total) + slice.values.size * spacing;
    var offset = 0;
    if (align === 'middle') {
      offset = (height - sliceHeight) / 2;
    } else if (align === 'end') {
      offset = height - sliceHeight;
    }
    Array.from(slice.values.values()).sort(function (a, b) {
      return b.value - a.value;
    }).forEach(function (value, position, all) {
      var previousValues = all.filter(function (i, pos) {
        return pos < position;
      });
      var beforeValue = previousValues.reduce(function (t, v) {
        return t + v.value;
      }, 0);
      var sliceValue = slice.values.get(value.serieId);
      sliceValue.position = position;
      sliceValue.height = heightScale(value.value);
      sliceValue.beforeHeight = heightScale(beforeValue) + offset + spacing * (previousValues.length + 0.5);
    });
  });
  var areaPointPadding = xScale.step() * Math.min(xPadding * 0.5, 0.5);
  var series = data.map(function (serie) {
    var serieCopy = _objectSpread2({}, serie);
    serieCopy.points = [];
    serieCopy.areaPoints = [];
    serie.data.forEach(function (datum, i) {
      var slice = slices.get(datum.x);
      var position = slice.values.get(serie.id);
      var x = slice.x;
      var beforeHeight = position.beforeHeight,
          height = position.height;
      var y = beforeHeight + height / 2;
      var y0 = beforeHeight;
      var y1 = beforeHeight + height;
      serieCopy.points.push({
        x: x,
        y: y,
        height: height,
        data: _objectSpread2({}, datum)
      });
      if (i > 0) {
        serieCopy.areaPoints.push({
          x: x - areaPointPadding,
          y0: y0,
          y1: y1
        });
      }
      serieCopy.areaPoints.push({
        x: x,
        y0: y0,
        y1: y1
      });
      if (i < serie.data.length - 1) {
        serieCopy.areaPoints.push({
          x: x + areaPointPadding,
          y0: y0,
          y1: y1
        });
      }
    });
    return serieCopy;
  });
  return {
    xScale: xScale,
    heightScale: heightScale,
    series: series
  };
};

var useAreaBumpSeries = function useAreaBumpSeries(_ref) {
  var data = _ref.data,
      width = _ref.width,
      height = _ref.height,
      align = _ref.align,
      spacing = _ref.spacing,
      xPadding = _ref.xPadding;
  return React.useMemo(function () {
    return computeSeries$1({
      data: data,
      width: width,
      height: height,
      align: align,
      spacing: spacing,
      xPadding: xPadding
    });
  }, [data, width, height, align, spacing, xPadding]);
};
var useAreaGenerator = function useAreaGenerator(interpolation) {
  return React.useMemo(function () {
    return d3Shape.area().x(function (d) {
      return d.x;
    }).y0(function (d) {
      return d.y0;
    }).y1(function (d) {
      return d.y1;
    }).curve(interpolation === 'smooth' ? d3Shape.curveBasis : d3Shape.curveLinear);
  }, [interpolation]);
};
var useSerieDerivedProp$1 = function useSerieDerivedProp(instruction) {
  return React.useMemo(function () {
    if (typeof instruction === 'function') return instruction;
    return function () {
      return instruction;
    };
  }, [instruction]);
};
var useSerieStyle$1 = function useSerieStyle(_ref2) {
  var fillOpacity = _ref2.fillOpacity,
      activeFillOpacity = _ref2.activeFillOpacity,
      inactiveFillOpacity = _ref2.inactiveFillOpacity,
      borderWidth = _ref2.borderWidth,
      activeBorderWidth = _ref2.activeBorderWidth,
      inactiveBorderWidth = _ref2.inactiveBorderWidth,
      borderColor = _ref2.borderColor,
      borderOpacity = _ref2.borderOpacity,
      activeBorderOpacity = _ref2.activeBorderOpacity,
      inactiveBorderOpacity = _ref2.inactiveBorderOpacity,
      isInteractive = _ref2.isInteractive,
      current = _ref2.current;
  var getFillOpacity = useSerieDerivedProp$1(fillOpacity);
  var getActiveFillOpacity = useSerieDerivedProp$1(activeFillOpacity);
  var getInactiveFillOpacity = useSerieDerivedProp$1(inactiveFillOpacity);
  var getBorderWidth = useSerieDerivedProp$1(borderWidth);
  var getActiveBorderWidth = useSerieDerivedProp$1(activeBorderWidth);
  var getInactiveBorderWidth = useSerieDerivedProp$1(inactiveBorderWidth);
  var theme = nivoCore.useTheme();
  var getBorderColor = nivoColors.useInheritedColor(borderColor, theme);
  var getBorderOpacity = useSerieDerivedProp$1(borderOpacity);
  var getActiveBorderOpacity = useSerieDerivedProp$1(activeBorderOpacity);
  var getInactiveBorderOpacity = useSerieDerivedProp$1(inactiveBorderOpacity);
  var getNormalStyle = React.useMemo(function () {
    return function (serie) {
      return {
        fillOpacity: getFillOpacity(serie),
        borderWidth: getBorderWidth(serie),
        borderColor: getBorderColor(serie),
        borderOpacity: getBorderOpacity(serie)
      };
    };
  }, [getFillOpacity, getBorderWidth, getBorderColor, getBorderOpacity]);
  var getActiveStyle = React.useMemo(function () {
    return function (serie) {
      return {
        fillOpacity: getActiveFillOpacity(serie),
        borderWidth: getActiveBorderWidth(serie),
        borderColor: getBorderColor(serie),
        borderOpacity: getActiveBorderOpacity(serie)
      };
    };
  }, [getActiveFillOpacity, getActiveBorderWidth, getBorderColor, getActiveBorderOpacity]);
  var getInactiveStyle = React.useMemo(function () {
    return function (serie) {
      return {
        fillOpacity: getInactiveFillOpacity(serie),
        borderWidth: getInactiveBorderWidth(serie),
        borderColor: getBorderColor(serie),
        borderOpacity: getInactiveBorderOpacity(serie)
      };
    };
  }, [getInactiveFillOpacity, getInactiveBorderWidth, getBorderColor, getInactiveBorderOpacity]);
  return React.useMemo(function () {
    if (!isInteractive) return getNormalStyle;
    return function (serie) {
      if (current === null) return getNormalStyle(serie);
      if (serie.id === current) return getActiveStyle(serie);
      return getInactiveStyle(serie);
    };
  }, [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, current]);
};
var useAreaBump = function useAreaBump(_ref3) {
  var data = _ref3.data,
      width = _ref3.width,
      height = _ref3.height,
      align = _ref3.align,
      spacing = _ref3.spacing,
      xPadding = _ref3.xPadding,
      interpolation = _ref3.interpolation,
      colors = _ref3.colors,
      fillOpacity = _ref3.fillOpacity,
      activeFillOpacity = _ref3.activeFillOpacity,
      inactiveFillOpacity = _ref3.inactiveFillOpacity,
      borderWidth = _ref3.borderWidth,
      activeBorderWidth = _ref3.activeBorderWidth,
      inactiveBorderWidth = _ref3.inactiveBorderWidth,
      borderColor = _ref3.borderColor,
      borderOpacity = _ref3.borderOpacity,
      activeBorderOpacity = _ref3.activeBorderOpacity,
      inactiveBorderOpacity = _ref3.inactiveBorderOpacity,
      isInteractive = _ref3.isInteractive,
      current = _ref3.current;
  var _useAreaBumpSeries = useAreaBumpSeries({
    data: data,
    width: width,
    height: height,
    align: align,
    spacing: spacing,
    xPadding: xPadding
  }),
      rawSeries = _useAreaBumpSeries.series,
      xScale = _useAreaBumpSeries.xScale,
      heightScale = _useAreaBumpSeries.heightScale;
  var areaGenerator = useAreaGenerator(interpolation);
  var getColor = nivoColors.useOrdinalColorScale(colors, 'id');
  var getSerieStyle = useSerieStyle$1({
    fillOpacity: fillOpacity,
    activeFillOpacity: activeFillOpacity,
    inactiveFillOpacity: inactiveFillOpacity,
    borderWidth: borderWidth,
    activeBorderWidth: activeBorderWidth,
    inactiveBorderWidth: inactiveBorderWidth,
    borderColor: borderColor,
    borderOpacity: borderOpacity,
    activeBorderOpacity: activeBorderOpacity,
    inactiveBorderOpacity: inactiveBorderOpacity,
    isInteractive: isInteractive,
    current: current
  });
  var series = React.useMemo(function () {
    return rawSeries.map(function (serie) {
      serie.color = getColor(serie);
      serie.style = getSerieStyle(serie);
      return serie;
    });
  }, [rawSeries, getColor, getSerieStyle]);
  return {
    series: series,
    xScale: xScale,
    heightScale: heightScale,
    areaGenerator: areaGenerator
  };
};
var useSerieHandlers$1 = function useSerieHandlers(_ref4) {
  var serie = _ref4.serie,
      isInteractive = _ref4.isInteractive,
      onMouseEnter = _ref4.onMouseEnter,
      onMouseMove = _ref4.onMouseMove,
      onMouseLeave = _ref4.onMouseLeave,
      onClick = _ref4.onClick,
      setCurrent = _ref4.setCurrent,
      tooltip = _ref4.tooltip;
  var _useTooltip = nivoTooltip.useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleMouseEnter = React.useCallback(function (event) {
    showTooltipFromEvent(React__default.createElement(tooltip, {
      serie: serie
    }), event);
    setCurrent(serie.id);
    onMouseEnter && onMouseEnter(serie, event);
  }, [serie, onMouseEnter, showTooltipFromEvent, setCurrent]);
  var handleMouseMove = React.useCallback(function (event) {
    showTooltipFromEvent(React__default.createElement(tooltip, {
      serie: serie
    }), event);
    onMouseMove && onMouseMove(serie, event);
  }, [serie, onMouseMove, showTooltipFromEvent]);
  var handleMouseLeave = React.useCallback(function (event) {
    hideTooltip();
    setCurrent(null);
    onMouseLeave && onMouseLeave(serie, event);
  }, [serie, onMouseLeave, hideTooltip, setCurrent]);
  var handleClick = React.useCallback(function (event) {
    onClick && onClick(serie, event);
  }, [serie, onClick]);
  var handlers = React.useMemo(function () {
    return {
      onMouseEnter: isInteractive ? handleMouseEnter : undefined,
      onMouseMove: isInteractive ? handleMouseMove : undefined,
      onMouseLeave: isInteractive ? handleMouseLeave : undefined,
      onClick: isInteractive ? handleClick : undefined
    };
  }, [isInteractive, handleMouseEnter, handleMouseMove, handleMouseLeave, handleClick]);
  return handlers;
};
var useSeriesLabels$1 = function useSeriesLabels(_ref5) {
  var series = _ref5.series,
      position = _ref5.position,
      padding = _ref5.padding,
      color = _ref5.color;
  var theme = nivoCore.useTheme();
  var getColor = nivoColors.useInheritedColor(color, theme);
  return React.useMemo(function () {
    var textAnchor;
    var signedPadding;
    if (position === 'start') {
      textAnchor = 'end';
      signedPadding = padding * -1;
    } else {
      textAnchor = 'start';
      signedPadding = padding;
    }
    return series.map(function (serie) {
      var point = position === 'start' ? serie.points[0] : serie.points[serie.points.length - 1];
      return {
        id: serie.id,
        x: point.x + signedPadding,
        y: point.y,
        color: getColor(serie),
        opacity: serie.style.fillOpacity,
        serie: serie,
        textAnchor: textAnchor
      };
    });
  }, [series, position, padding, getColor]);
};

var Area = function Area(_ref) {
  var serie = _ref.serie,
      areaGenerator = _ref.areaGenerator,
      blendMode = _ref.blendMode,
      isInteractive = _ref.isInteractive,
      onMouseEnter = _ref.onMouseEnter,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick,
      setCurrentSerie = _ref.setCurrentSerie,
      tooltip = _ref.tooltip;
  var handlers = useSerieHandlers$1({
    serie: serie,
    isInteractive: isInteractive,
    onMouseEnter: onMouseEnter,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    onClick: onClick,
    setCurrent: setCurrentSerie,
    tooltip: tooltip
  });
  var _useMotionConfig = nivoCore.useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var animatedProps = reactSpring.useSpring({
    path: areaGenerator(serie.areaPoints),
    color: serie.color,
    fillOpacity: serie.style.fillOpacity,
    stroke: serie.style.borderColor,
    strokeOpacity: serie.style.borderOpacity,
    config: springConfig,
    immediate: !animate
  });
  return React__default.createElement(reactSpring.animated.path, {
    d: animatedProps.path,
    fill: serie.fill ? serie.fill : animatedProps.color,
    fillOpacity: animatedProps.fillOpacity,
    stroke: animatedProps.stroke,
    strokeWidth: serie.style.borderWidth,
    strokeOpacity: animatedProps.strokeOpacity,
    style: {
      mixBlendMode: blendMode
    },
    onMouseEnter: handlers.onMouseEnter,
    onMouseMove: handlers.onMouseMove,
    onMouseLeave: handlers.onMouseLeave,
    onClick: handlers.onClick
  });
};
var Area$1 = React.memo(Area);

var AreasLabels = function AreasLabels(_ref) {
  var series = _ref.series,
      position = _ref.position,
      padding = _ref.padding,
      color = _ref.color;
  var theme = nivoCore.useTheme();
  var _useMotionConfig = nivoCore.useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var labels = useSeriesLabels$1({
    series: series,
    position: position,
    padding: padding,
    color: color
  });
  var springs = reactSpring.useSprings(labels.length, labels.map(function (label) {
    return {
      x: label.x,
      y: label.y,
      opacity: label.opacity,
      config: springConfig,
      immediate: !animate
    };
  }));
  return springs.map(function (animatedProps, index) {
    var label = labels[index];
    return React__default.createElement(reactSpring.animated.text, {
      key: label.id,
      x: animatedProps.x,
      y: animatedProps.y,
      textAnchor: label.textAnchor,
      dominantBaseline: "central",
      opacity: animatedProps.opacity,
      style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
        fill: label.color
      })
    }, label.id);
  });
};
var AreasLabels$1 = React.memo(AreasLabels);

var AreaBump = function AreaBump(props) {
  var data = props.data,
      align = props.align,
      width = props.width,
      height = props.height,
      partialMargin = props.margin,
      layers = props.layers,
      interpolation = props.interpolation,
      spacing = props.spacing,
      xPadding = props.xPadding,
      colors = props.colors,
      blendMode = props.blendMode,
      fillOpacity = props.fillOpacity,
      activeFillOpacity = props.activeFillOpacity,
      inactiveFillOpacity = props.inactiveFillOpacity,
      defs = props.defs,
      fill = props.fill,
      borderWidth = props.borderWidth,
      activeBorderWidth = props.activeBorderWidth,
      inactiveBorderWidth = props.inactiveBorderWidth,
      borderColor = props.borderColor,
      borderOpacity = props.borderOpacity,
      activeBorderOpacity = props.activeBorderOpacity,
      inactiveBorderOpacity = props.inactiveBorderOpacity,
      startLabel = props.startLabel,
      startLabelPadding = props.startLabelPadding,
      startLabelTextColor = props.startLabelTextColor,
      endLabel = props.endLabel,
      endLabelPadding = props.endLabelPadding,
      endLabelTextColor = props.endLabelTextColor,
      enableGridX = props.enableGridX,
      axisTop = props.axisTop,
      axisBottom = props.axisBottom,
      isInteractive = props.isInteractive,
      onMouseEnter = props.onMouseEnter,
      onMouseMove = props.onMouseMove,
      onMouseLeave = props.onMouseLeave,
      onClick = props.onClick,
      tooltip = props.tooltip,
      role = props.role;
  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentSerie = _useState2[0],
      setCurrentSerie = _useState2[1];
  var _useDimensions = nivoCore.useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useAreaBump = useAreaBump({
    data: data,
    width: innerWidth,
    height: innerHeight,
    align: align,
    spacing: spacing,
    xPadding: xPadding,
    interpolation: interpolation,
    colors: colors,
    fillOpacity: fillOpacity,
    activeFillOpacity: activeFillOpacity,
    inactiveFillOpacity: inactiveFillOpacity,
    borderWidth: borderWidth,
    activeBorderWidth: activeBorderWidth,
    inactiveBorderWidth: inactiveBorderWidth,
    borderColor: borderColor,
    borderOpacity: borderOpacity,
    activeBorderOpacity: activeBorderOpacity,
    inactiveBorderOpacity: inactiveBorderOpacity,
    isInteractive: isInteractive,
    current: currentSerie
  }),
      series = _useAreaBump.series,
      xScale = _useAreaBump.xScale,
      areaGenerator = _useAreaBump.areaGenerator;
  var boundDefs = React.useMemo(function () {
    return nivoCore.bindDefs(defs, series, fill, {
      targetKey: 'fill'
    });
  }, [defs, series, fill]);
  var layerById = {
    grid: enableGridX && React__default.createElement(nivoAxes.Grid, {
      key: "grid",
      width: innerWidth,
      height: innerHeight,
      xScale: xScale
    }),
    axes: React__default.createElement(nivoAxes.Axes, {
      key: "axes",
      xScale: xScale,
      width: innerWidth,
      height: innerHeight,
      top: axisTop,
      bottom: axisBottom
    }),
    labels: [],
    areas: React__default.createElement(React.Fragment, {
      key: "areas"
    }, series.map(function (serie) {
      return React__default.createElement(Area$1, {
        key: serie.id,
        areaGenerator: areaGenerator,
        serie: serie,
        blendMode: blendMode,
        isInteractive: isInteractive,
        setCurrentSerie: setCurrentSerie,
        onMouseEnter: onMouseEnter,
        onMouseMove: onMouseMove,
        onMouseLeave: onMouseLeave,
        onClick: onClick,
        tooltip: tooltip
      });
    }))
  };
  if (startLabel !== false) {
    layerById.labels.push( React__default.createElement(AreasLabels$1, {
      key: "start",
      series: series,
      position: "start",
      padding: startLabelPadding,
      color: startLabelTextColor
    }));
  }
  if (endLabel !== false) {
    layerById.labels.push( React__default.createElement(AreasLabels$1, {
      key: "end",
      series: series,
      position: "end",
      padding: endLabelPadding,
      color: endLabelTextColor
    }));
  }
  return React__default.createElement(nivoCore.SvgWrapper, {
    defs: boundDefs,
    width: outerWidth,
    height: outerHeight,
    margin: margin,
    role: role
  }, layers.map(function (layer, i) {
    if (typeof layer === 'function') {
      return React__default.createElement(React.Fragment, {
        key: i
      }, layer(_objectSpread2(_objectSpread2({}, props), {}, {
        innerWidth: innerWidth,
        innerHeight: innerHeight,
        outerWidth: outerWidth,
        outerHeight: outerHeight,
        series: series,
        xScale: xScale,
        areaGenerator: areaGenerator
      })));
    }
    return layerById[layer];
  }));
};
AreaBump.defaultProps = AreaBumpDefaultProps;
var AreaBump$1 = React.memo(nivoCore.withContainer(AreaBump));

var ResponsiveAreaBump = function ResponsiveAreaBump(props) {
  return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(AreaBump$1, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

exports.AreaBump = AreaBump$1;
exports.AreaBumpDefaultProps = AreaBumpDefaultProps;
exports.AreaBumpPropTypes = AreaBumpPropTypes;
exports.Bump = Bump$1;
exports.BumpDefaultProps = BumpDefaultProps;
exports.BumpPropTypes = BumpPropTypes;
exports.ResponsiveAreaBump = ResponsiveAreaBump;
exports.ResponsiveBump = ResponsiveBump;
//# sourceMappingURL=nivo-bump.cjs.js.map
