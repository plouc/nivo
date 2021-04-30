import React, { memo, useMemo } from 'react';
import { animated, useSpring, useTransition } from 'react-spring';
import { textPropsByEngine, useTheme, useMotionConfig } from '@bitbloom/nivo-core';
import { timeMillisecond, utcMillisecond, timeSecond, utcSecond, timeMinute, utcMinute, timeHour, utcHour, timeDay, utcDay, timeWeek, utcWeek, timeSunday, utcSunday, timeMonday, utcMonday, timeTuesday, utcTuesday, timeWednesday, utcWednesday, timeThursday, utcThursday, timeFriday, utcFriday, timeSaturday, utcSaturday, timeMonth, utcMonth, timeYear, utcYear } from 'd3-time';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';
import PropTypes from 'prop-types';

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

var centerScale = function centerScale(scale) {
  var bandwidth = scale.bandwidth();
  if (bandwidth === 0) return scale;
  var offset = bandwidth / 2;
  if (scale.round()) {
    offset = Math.round(offset);
  }
  return function (d) {
    return scale(d) + offset;
  };
};
var timeByType = {
  millisecond: [timeMillisecond, utcMillisecond],
  second: [timeSecond, utcSecond],
  minute: [timeMinute, utcMinute],
  hour: [timeHour, utcHour],
  day: [timeDay, utcDay],
  week: [timeWeek, utcWeek],
  sunday: [timeSunday, utcSunday],
  monday: [timeMonday, utcMonday],
  tuesday: [timeTuesday, utcTuesday],
  wednesday: [timeWednesday, utcWednesday],
  thursday: [timeThursday, utcThursday],
  friday: [timeFriday, utcFriday],
  saturday: [timeSaturday, utcSaturday],
  month: [timeMonth, utcMonth],
  year: [timeYear, utcYear]
};
var timeTypes = Object.keys(timeByType);
var timeIntervalRegexp = new RegExp("^every\\s*(\\d+)?\\s*(".concat(timeTypes.join('|'), ")s?$"), 'i');
var isInteger = function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};
var getScaleTicks = function getScaleTicks(scale, spec) {
  if (Array.isArray(spec)) {
    return spec;
  }
  if (scale.ticks) {
    if (spec === undefined) {
      return scale.ticks();
    }
    if (isInteger(spec)) {
      return scale.ticks(spec);
    }
    if (typeof spec === 'string') {
      var matches = spec.match(timeIntervalRegexp);
      if (matches) {
        var timeType = timeByType[matches[2]][scale.useUTC ? 1 : 0];
        if (matches[1] === undefined) {
          return scale.ticks(timeType);
        }
        return scale.ticks(timeType.every(Number(matches[1])));
      }
      throw new Error("Invalid tickValues: ".concat(spec));
    }
  }
  return scale.domain();
};
var computeCartesianTicks = function computeCartesianTicks(_ref) {
  var axis = _ref.axis,
      scale = _ref.scale,
      ticksPosition = _ref.ticksPosition,
      tickValues = _ref.tickValues,
      tickSize = _ref.tickSize,
      tickPadding = _ref.tickPadding,
      tickRotation = _ref.tickRotation,
      _ref$engine = _ref.engine,
      engine = _ref$engine === void 0 ? 'svg' : _ref$engine;
  var values = getScaleTicks(scale, tickValues);
  var textProps = textPropsByEngine[engine];
  var position = scale.bandwidth ? centerScale(scale) : scale;
  var line = {
    lineX: 0,
    lineY: 0
  };
  var text = {
    textX: 0,
    textY: 0
  };
  var translate;
  var textAlign = textProps.align.center;
  var textBaseline = textProps.baseline.center;
  if (axis === 'x') {
    translate = function translate(d) {
      return {
        x: position(d),
        y: 0
      };
    };
    line.lineY = tickSize * (ticksPosition === 'after' ? 1 : -1);
    text.textY = (tickSize + tickPadding) * (ticksPosition === 'after' ? 1 : -1);
    if (ticksPosition === 'after') {
      textBaseline = textProps.baseline.top;
    } else {
      textBaseline = textProps.baseline.bottom;
    }
    if (tickRotation === 0) {
      textAlign = textProps.align.center;
    } else if (ticksPosition === 'after' && tickRotation < 0 || ticksPosition === 'before' && tickRotation > 0) {
      textAlign = textProps.align.right;
      textBaseline = textProps.baseline.center;
    } else if (ticksPosition === 'after' && tickRotation > 0 || ticksPosition === 'before' && tickRotation < 0) {
      textAlign = textProps.align.left;
      textBaseline = textProps.baseline.center;
    }
  } else {
    translate = function translate(d) {
      return {
        x: 0,
        y: position(d)
      };
    };
    line.lineX = tickSize * (ticksPosition === 'after' ? 1 : -1);
    text.textX = (tickSize + tickPadding) * (ticksPosition === 'after' ? 1 : -1);
    if (ticksPosition === 'after') {
      textAlign = textProps.align.left;
    } else {
      textAlign = textProps.align.right;
    }
  }
  var ticks = values.map(function (value) {
    return _objectSpread2(_objectSpread2(_objectSpread2({
      key: value,
      value: value
    }, translate(value)), line), text);
  });
  return {
    ticks: ticks,
    textAlign: textAlign,
    textBaseline: textBaseline
  };
};
var getFormatter = function getFormatter(format$1, scale) {
  if (!format$1 || typeof format$1 === 'function') return format$1;
  if (scale.type === 'time') {
    var f = timeFormat(format$1);
    return function (d) {
      return f(new Date(d));
    };
  }
  return format(format$1);
};
var computeGridLines = function computeGridLines(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      scale = _ref2.scale,
      axis = _ref2.axis,
      _values = _ref2.values;
  var lineValues = Array.isArray(_values) ? _values : undefined;
  var lineCount = isInteger(_values) ? _values : undefined;
  var values = lineValues || getScaleTicks(scale, lineCount);
  var position = scale.bandwidth ? centerScale(scale) : scale;
  var lines;
  if (axis === 'x') {
    lines = values.map(function (v) {
      return {
        key: "".concat(v),
        x1: position(v),
        x2: position(v),
        y1: 0,
        y2: height
      };
    });
  } else if (axis === 'y') {
    lines = values.map(function (v) {
      return {
        key: "".concat(v),
        x1: 0,
        x2: width,
        y1: position(v),
        y2: position(v)
      };
    });
  }
  return lines;
};

var axisPropTypes = {
  ticksPosition: PropTypes.oneOf(['before', 'after']),
  tickValues: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])), PropTypes.string]),
  tickSize: PropTypes.number,
  tickPadding: PropTypes.number,
  tickRotation: PropTypes.number,
  format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  renderTick: PropTypes.func,
  legend: PropTypes.node,
  legendPosition: PropTypes.oneOf(['start', 'middle', 'end']),
  legendOffset: PropTypes.number,
  ariaHidden: PropTypes.bool
};
var axisPropType = PropTypes.shape(axisPropTypes);

var AxisTick = function AxisTick(_ref) {
  var _value = _ref.value,
      format = _ref.format,
      lineX = _ref.lineX,
      lineY = _ref.lineY,
      _onClick = _ref.onClick,
      textBaseline = _ref.textBaseline,
      textAnchor = _ref.textAnchor,
      animatedProps = _ref.animatedProps;
  var theme = useTheme();
  var value = _value;
  if (format !== undefined) {
    value = format(value);
  }
  var gStyle = {
    opacity: animatedProps.opacity
  };
  if (_onClick) {
    gStyle['cursor'] = 'pointer';
  }
  return React.createElement(animated.g, Object.assign({
    transform: animatedProps.transform
  }, _onClick ? {
    onClick: function onClick(e) {
      return _onClick(e, value);
    }
  } : {}, {
    style: gStyle
  }), React.createElement("line", {
    x1: 0,
    x2: lineX,
    y1: 0,
    y2: lineY,
    style: theme.axis.ticks.line
  }), React.createElement(animated.text, {
    dominantBaseline: textBaseline,
    textAnchor: textAnchor,
    transform: animatedProps.textTransform,
    style: theme.axis.ticks.text
  }, value));
};
AxisTick.defaultProps = {
  opacity: 1,
  rotate: 0
};
var AxisTick$1 = memo(AxisTick);

var defaultTickRenderer = function defaultTickRenderer(props) {
  return React.createElement(AxisTick$1, props);
};
var Axis = function Axis(_ref) {
  var axis = _ref.axis,
      scale = _ref.scale,
      x = _ref.x,
      y = _ref.y,
      length = _ref.length,
      ticksPosition = _ref.ticksPosition,
      tickValues = _ref.tickValues,
      tickSize = _ref.tickSize,
      tickPadding = _ref.tickPadding,
      tickRotation = _ref.tickRotation,
      format = _ref.format,
      renderTick = _ref.renderTick,
      legend = _ref.legend,
      legendPosition = _ref.legendPosition,
      legendOffset = _ref.legendOffset,
      onClick = _ref.onClick,
      ariaHidden = _ref.ariaHidden;
  var theme = useTheme();
  var formatValue = useMemo(function () {
    return getFormatter(format, scale);
  }, [format, scale]);
  var _computeCartesianTick = computeCartesianTicks({
    axis: axis,
    scale: scale,
    ticksPosition: ticksPosition,
    tickValues: tickValues,
    tickSize: tickSize,
    tickPadding: tickPadding,
    tickRotation: tickRotation
  }),
      ticks = _computeCartesianTick.ticks,
      textAlign = _computeCartesianTick.textAlign,
      textBaseline = _computeCartesianTick.textBaseline;
  var legendNode = null;
  if (legend !== undefined) {
    var legendX = 0;
    var legendY = 0;
    var legendRotation = 0;
    var textAnchor;
    if (axis === 'y') {
      legendRotation = -90;
      legendX = legendOffset;
      if (legendPosition === 'start') {
        textAnchor = 'start';
        legendY = length;
      } else if (legendPosition === 'middle') {
        textAnchor = 'middle';
        legendY = length / 2;
      } else if (legendPosition === 'end') {
        textAnchor = 'end';
      }
    } else {
      legendY = legendOffset;
      if (legendPosition === 'start') {
        textAnchor = 'start';
      } else if (legendPosition === 'middle') {
        textAnchor = 'middle';
        legendX = length / 2;
      } else if (legendPosition === 'end') {
        textAnchor = 'end';
        legendX = length;
      }
    }
    legendNode = React.createElement("text", {
      transform: "translate(".concat(legendX, ", ").concat(legendY, ") rotate(").concat(legendRotation, ")"),
      textAnchor: textAnchor,
      style: _objectSpread2({
        dominantBaseline: 'central'
      }, theme.axis.legend.text)
    }, legend);
  }
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var animatedProps = useSpring({
    transform: "translate(".concat(x, ",").concat(y, ")"),
    lineX2: axis === 'x' ? length : 0,
    lineY2: axis === 'x' ? 0 : length,
    config: springConfig,
    immediate: !animate
  });
  var transitions = useTransition(ticks, function (tick) {
    return tick.key;
  }, {
    initial: function initial(tick) {
      return {
        opacity: 1,
        transform: "translate(".concat(tick.x, ",").concat(tick.y, ")"),
        textTransform: "translate(".concat(tick.textX, ",").concat(tick.textY, ") rotate(").concat(tickRotation, ")")
      };
    },
    from: function from(tick) {
      return {
        opacity: 0,
        transform: "translate(".concat(tick.x, ",").concat(tick.y, ")"),
        textTransform: "translate(".concat(tick.textX, ",").concat(tick.textY, ") rotate(").concat(tickRotation, ")")
      };
    },
    enter: function enter(tick) {
      return {
        opacity: 1,
        transform: "translate(".concat(tick.x, ",").concat(tick.y, ")"),
        textTransform: "translate(".concat(tick.textX, ",").concat(tick.textY, ") rotate(").concat(tickRotation, ")")
      };
    },
    update: function update(tick) {
      return {
        opacity: 1,
        transform: "translate(".concat(tick.x, ",").concat(tick.y, ")"),
        textTransform: "translate(".concat(tick.textX, ",").concat(tick.textY, ") rotate(").concat(tickRotation, ")")
      };
    },
    leave: {
      opacity: 0
    },
    config: springConfig,
    immediate: !animate
  });
  return React.createElement(animated.g, {
    transform: animatedProps.transform,
    "aria-hidden": ariaHidden
  }, transitions.map(function (_ref2, tickIndex) {
    var tick = _ref2.item,
        transitionProps = _ref2.props,
        key = _ref2.key;
    return React.createElement(renderTick, _objectSpread2(_objectSpread2(_objectSpread2({
      tickIndex: tickIndex,
      format: formatValue,
      rotate: tickRotation,
      textBaseline: textBaseline,
      textAnchor: textAlign,
      animatedProps: transitionProps
    }, tick), onClick ? {
      onClick: onClick
    } : {}), {}, {
      key: key
    }));
  }), React.createElement(animated.line, {
    style: theme.axis.domain.line,
    x1: 0,
    x2: animatedProps.lineX2,
    y1: 0,
    y2: animatedProps.lineY2
  }), legendNode);
};
Axis.defaultProps = {
  x: 0,
  y: 0,
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  renderTick: defaultTickRenderer,
  legendPosition: 'end',
  legendOffset: 0
};
var Axis$1 = memo(Axis);

var positions = ['top', 'right', 'bottom', 'left'];
var Axes = function Axes(_ref) {
  var xScale = _ref.xScale,
      yScale = _ref.yScale,
      width = _ref.width,
      height = _ref.height,
      top = _ref.top,
      right = _ref.right,
      bottom = _ref.bottom,
      left = _ref.left;
  var axes = {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
  return positions.map(function (position) {
    var axis = axes[position];
    if (!axis) return null;
    var isXAxis = position === 'top' || position === 'bottom';
    var ticksPosition = position === 'top' || position === 'left' ? 'before' : 'after';
    return React.createElement(Axis$1, Object.assign({
      key: position
    }, axis, {
      axis: isXAxis ? 'x' : 'y',
      x: position === 'right' ? width : 0,
      y: position === 'bottom' ? height : 0,
      scale: isXAxis ? xScale : yScale,
      length: isXAxis ? width : height,
      ticksPosition: ticksPosition
    }));
  });
};
var Axes$1 = memo(Axes);

var GridLine = function GridLine(_ref) {
  var animatedProps = _ref.animatedProps;
  var theme = useTheme();
  return React.createElement(animated.line, Object.assign({}, animatedProps, theme.grid.line));
};
GridLine.defaultProps = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0
};
var GridLine$1 = memo(GridLine);

var GridLines = function GridLines(_ref) {
  var lines = _ref.lines;
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var transitions = useTransition(lines, function (line) {
    return line.key;
  }, {
    initial: function initial(line) {
      return {
        opacity: 1,
        x1: line.x1,
        x2: line.x2,
        y1: line.y1,
        y2: line.y2
      };
    },
    from: function from(line) {
      return {
        opacity: 0,
        x1: line.x1,
        x2: line.x2,
        y1: line.y1,
        y2: line.y2
      };
    },
    enter: function enter(line) {
      return {
        opacity: 1,
        x1: line.x1,
        x2: line.x2,
        y1: line.y1,
        y2: line.y2
      };
    },
    update: function update(line) {
      return {
        opacity: 1,
        x1: line.x1,
        x2: line.x2,
        y1: line.y1,
        y2: line.y2
      };
    },
    leave: {
      opacity: 0
    },
    config: springConfig,
    immediate: !animate
  });
  return React.createElement("g", null, transitions.map(function (_ref2) {
    var line = _ref2.item,
        animatedProps = _ref2.props,
        key = _ref2.key;
    return React.createElement(GridLine$1, Object.assign({}, line, {
      key: key,
      animatedProps: animatedProps
    }));
  }));
};
var GridLines$1 = memo(GridLines);

var Grid = function Grid(_ref) {
  var width = _ref.width,
      height = _ref.height,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      xValues = _ref.xValues,
      yValues = _ref.yValues;
  var xLines = useMemo(function () {
    if (!xScale) return false;
    return computeGridLines({
      width: width,
      height: height,
      scale: xScale,
      axis: 'x',
      values: xValues
    });
  }, [xScale, xValues]);
  var yLines = yScale ? computeGridLines({
    width: width,
    height: height,
    scale: yScale,
    axis: 'y',
    values: yValues
  }) : false;
  return React.createElement(React.Fragment, null, xLines && React.createElement(GridLines$1, {
    type: "x",
    lines: xLines
  }), yLines && React.createElement(GridLines$1, {
    type: "y",
    lines: yLines
  }));
};
var Grid$1 = memo(Grid);

var degreesToRadians = function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
};

var renderAxisToCanvas = function renderAxisToCanvas(ctx, _ref) {
  var axis = _ref.axis,
      scale = _ref.scale,
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 0 : _ref$y,
      length = _ref.length,
      ticksPosition = _ref.ticksPosition,
      tickValues = _ref.tickValues,
      _ref$tickSize = _ref.tickSize,
      tickSize = _ref$tickSize === void 0 ? 5 : _ref$tickSize,
      _ref$tickPadding = _ref.tickPadding,
      tickPadding = _ref$tickPadding === void 0 ? 5 : _ref$tickPadding,
      _ref$tickRotation = _ref.tickRotation,
      tickRotation = _ref$tickRotation === void 0 ? 0 : _ref$tickRotation,
      format = _ref.format,
      legend = _ref.legend,
      _ref$legendPosition = _ref.legendPosition,
      legendPosition = _ref$legendPosition === void 0 ? 'end' : _ref$legendPosition,
      _ref$legendOffset = _ref.legendOffset,
      legendOffset = _ref$legendOffset === void 0 ? 0 : _ref$legendOffset,
      theme = _ref.theme;
  var _computeCartesianTick = computeCartesianTicks({
    axis: axis,
    scale: scale,
    ticksPosition: ticksPosition,
    tickValues: tickValues,
    tickSize: tickSize,
    tickPadding: tickPadding,
    tickRotation: tickRotation,
    engine: 'canvas'
  }),
      ticks = _computeCartesianTick.ticks,
      textAlign = _computeCartesianTick.textAlign,
      textBaseline = _computeCartesianTick.textBaseline;
  ctx.save();
  ctx.translate(x, y);
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = "".concat(theme.axis.ticks.text.fontSize, "px ").concat(theme.axis.ticks.text.fontFamily);
  if (theme.axis.domain.line.strokeWidth > 0) {
    ctx.lineWidth = theme.axis.domain.line.strokeWidth;
    ctx.lineCap = 'square';
    ctx.strokeStyle = theme.axis.domain.line.stroke;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(axis === 'x' ? length : 0, axis === 'x' ? 0 : length);
    ctx.stroke();
  }
  ticks.forEach(function (tick) {
    if (theme.axis.ticks.line.strokeWidth > 0) {
      ctx.lineWidth = theme.axis.ticks.line.strokeWidth;
      ctx.lineCap = 'square';
      ctx.strokeStyle = theme.axis.ticks.line.stroke;
      ctx.beginPath();
      ctx.moveTo(tick.x, tick.y);
      ctx.lineTo(tick.x + tick.lineX, tick.y + tick.lineY);
      ctx.stroke();
    }
    var value = format !== undefined ? format(tick.value) : tick.value;
    ctx.save();
    ctx.translate(tick.x + tick.textX, tick.y + tick.textY);
    ctx.rotate(degreesToRadians(tickRotation));
    ctx.fillStyle = theme.axis.ticks.text.fill;
    ctx.fillText(value, 0, 0);
    ctx.restore();
  });
  if (legend !== undefined) {
    var legendX = 0;
    var legendY = 0;
    var legendRotation = 0;
    var _textAlign;
    if (axis === 'y') {
      legendRotation = -90;
      legendX = legendOffset;
      if (legendPosition === 'start') {
        _textAlign = 'start';
        legendY = length;
      } else if (legendPosition === 'middle') {
        _textAlign = 'center';
        legendY = length / 2;
      } else if (legendPosition === 'end') {
        _textAlign = 'end';
      }
    } else {
      legendY = legendOffset;
      if (legendPosition === 'start') {
        _textAlign = 'start';
      } else if (legendPosition === 'middle') {
        _textAlign = 'center';
        legendX = length / 2;
      } else if (legendPosition === 'end') {
        _textAlign = 'end';
        legendX = length;
      }
    }
    ctx.translate(legendX, legendY);
    ctx.rotate(degreesToRadians(legendRotation));
    ctx.font = "".concat(theme.axis.legend.text.fontWeight ? "".concat(theme.axis.legend.text.fontWeight, " ") : '').concat(theme.axis.legend.text.fontSize, "px ").concat(theme.axis.legend.text.fontFamily);
    ctx.fillStyle = theme.axis.legend.text.fill;
    ctx.textAlign = _textAlign;
    ctx.textBaseline = 'middle';
    ctx.fillText(legend, 0, 0);
  }
  ctx.restore();
};
var positions$1 = ['top', 'right', 'bottom', 'left'];
var renderAxesToCanvas = function renderAxesToCanvas(ctx, _ref2) {
  var xScale = _ref2.xScale,
      yScale = _ref2.yScale,
      width = _ref2.width,
      height = _ref2.height,
      top = _ref2.top,
      right = _ref2.right,
      bottom = _ref2.bottom,
      left = _ref2.left,
      theme = _ref2.theme;
  var axes = {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
  positions$1.forEach(function (position) {
    var axis = axes[position];
    if (!axis) return null;
    var isXAxis = position === 'top' || position === 'bottom';
    var ticksPosition = position === 'top' || position === 'left' ? 'before' : 'after';
    var scale = isXAxis ? xScale : yScale;
    var format = getFormatter(axis.format, scale);
    renderAxisToCanvas(ctx, _objectSpread2(_objectSpread2({}, axis), {}, {
      axis: isXAxis ? 'x' : 'y',
      x: position === 'right' ? width : 0,
      y: position === 'bottom' ? height : 0,
      scale: scale,
      format: format,
      length: isXAxis ? width : height,
      ticksPosition: ticksPosition,
      theme: theme
    }));
  });
};
var renderGridLinesToCanvas = function renderGridLinesToCanvas(ctx, _ref3) {
  var width = _ref3.width,
      height = _ref3.height,
      scale = _ref3.scale,
      axis = _ref3.axis,
      values = _ref3.values;
  var lines = computeGridLines({
    width: width,
    height: height,
    scale: scale,
    axis: axis,
    values: values
  });
  lines.forEach(function (line) {
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
  });
};

export { Axes$1 as Axes, Axis$1 as Axis, Grid$1 as Grid, axisPropType, axisPropTypes, renderAxesToCanvas, renderAxisToCanvas, renderGridLinesToCanvas };
//# sourceMappingURL=nivo-axes.es.js.map
