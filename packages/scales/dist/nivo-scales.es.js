import PropTypes from 'prop-types';
import { scaleLinear, scaleLog, scaleSymlog, scalePoint, scaleUtc, scaleTime } from 'd3-scale';
import { utcParse, timeParse } from 'd3-time-format';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import last from 'lodash/last';
import isDate from 'lodash/isDate';

var linearScale = function linearScale(_ref, xy, width, height) {
  var axis = _ref.axis,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 'auto' : _ref$max,
      _ref$stacked = _ref.stacked,
      stacked = _ref$stacked === void 0 ? false : _ref$stacked,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === void 0 ? false : _ref$reverse;
  var values = xy[axis];
  var size = axis === 'x' ? width : height;
  var minValue = min;
  if (min === 'auto') {
    minValue = stacked === true ? values.minStacked : values.min;
  }
  var maxValue = max;
  if (max === 'auto') {
    maxValue = stacked === true ? values.maxStacked : values.max;
  }
  var scale = scaleLinear().rangeRound(axis === 'x' ? [0, size] : [size, 0]);
  if (reverse === true) scale.domain([maxValue, minValue]);else scale.domain([minValue, maxValue]);
  scale.type = 'linear';
  scale.stacked = stacked;
  return scale;
};
var linearScalePropTypes = {
  type: PropTypes.oneOf(['linear']).isRequired,
  min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  stacked: PropTypes.bool,
  reverse: PropTypes.bool
};

var logScale = function logScale(_ref, xy, width, height) {
  var axis = _ref.axis,
      _ref$base = _ref.base,
      base = _ref$base === void 0 ? 10 : _ref$base,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 'auto' : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 'auto' : _ref$max;
  var values = xy[axis];
  var size = axis === 'x' ? width : height;
  var hasZero = values.all.some(function (v) {
    return v === 0;
  });
  var sign;
  var hasMixedSign = false;
  values.all.forEach(function (v) {
    if (hasMixedSign === true) return;
    if (sign === undefined) {
      sign = Math.sign(v);
    } else if (Math.sign(v) !== sign) {
      hasMixedSign = true;
    }
  });
  if (hasZero || hasMixedSign) {
    throw new Error(["a log scale domain must be strictly-positive or strictly-negative,", "and must not include or cross zero."].join('\n'));
  }
  var minValue = min;
  if (min === 'auto') {
    minValue = values.min;
  }
  var maxValue = max;
  if (max === 'auto') {
    maxValue = values.max;
  }
  var scale = scaleLog().domain([minValue, maxValue]).rangeRound(axis === 'x' ? [0, size] : [size, 0]).base(base).nice();
  scale.type = 'log';
  return scale;
};
var logScalePropTypes = {
  type: PropTypes.oneOf(['log']).isRequired,
  base: PropTypes.number,
  min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number])
};

var symlogScale = function symlogScale(_ref, xy, width, height) {
  var axis = _ref.axis,
      _ref$constant = _ref.constant,
      constant = _ref$constant === void 0 ? 1 : _ref$constant,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 'auto' : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 'auto' : _ref$max;
  var values = xy[axis];
  var size = axis === 'x' ? width : height;
  var minValue = min;
  if (min === 'auto') {
    minValue = values.min;
  }
  var maxValue = max;
  if (max === 'auto') {
    maxValue = values.max;
  }
  var scale = scaleSymlog().domain([minValue, maxValue]).constant(constant).rangeRound(axis === 'x' ? [0, size] : [size, 0]).nice();
  scale.type = 'symlog';
  return scale;
};
var symLogScalePropTypes = {
  type: PropTypes.oneOf(['symlog']).isRequired,
  constant: PropTypes.number,
  min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number])
};

var pointScale = function pointScale(_ref, xy, width, height) {
  var axis = _ref.axis;
  var values = xy[axis];
  var size = axis === 'x' ? width : height;
  var scale = scalePoint().range([0, size]).domain(values.all);
  scale.type = 'point';
  return scale;
};
var pointScalePropTypes = {
  type: PropTypes.oneOf(['point']).isRequired
};

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

var _precisionCutOffsByTy;
var TIME_PRECISION_MILLISECOND = 'millisecond';
var TIME_PRECISION_SECOND = 'second';
var TIME_PRECISION_MINUTE = 'minute';
var TIME_PRECISION_HOUR = 'hour';
var TIME_PRECISION_DAY = 'day';
var TIME_PRECISION_MONTH = 'month';
var TIME_PRECISION_YEAR = 'year';
var timePrecisions = [TIME_PRECISION_MILLISECOND, TIME_PRECISION_SECOND, TIME_PRECISION_MINUTE, TIME_PRECISION_HOUR, TIME_PRECISION_DAY, TIME_PRECISION_MONTH, TIME_PRECISION_YEAR];
var precisionCutOffs = [function (date) {
  return date.setMilliseconds(0);
}, function (date) {
  return date.setSeconds(0);
}, function (date) {
  return date.setMinutes(0);
}, function (date) {
  return date.setHours(0);
}, function (date) {
  return date.setDate(1);
}, function (date) {
  return date.setMonth(0);
}];
var precisionCutOffsByType = (_precisionCutOffsByTy = {}, _defineProperty(_precisionCutOffsByTy, TIME_PRECISION_MILLISECOND, []), _defineProperty(_precisionCutOffsByTy, TIME_PRECISION_SECOND, precisionCutOffs.slice(0, 1)), _defineProperty(_precisionCutOffsByTy, TIME_PRECISION_MINUTE, precisionCutOffs.slice(0, 2)), _defineProperty(_precisionCutOffsByTy, TIME_PRECISION_HOUR, precisionCutOffs.slice(0, 3)), _defineProperty(_precisionCutOffsByTy, TIME_PRECISION_DAY, precisionCutOffs.slice(0, 4)), _defineProperty(_precisionCutOffsByTy, TIME_PRECISION_MONTH, precisionCutOffs.slice(0, 5)), _defineProperty(_precisionCutOffsByTy, TIME_PRECISION_YEAR, precisionCutOffs.slice(0, 6)), _precisionCutOffsByTy);
var createPrecisionMethod = function createPrecisionMethod(precision) {
  return function (date) {
    precisionCutOffsByType[precision].forEach(function (cutOff) {
      cutOff(date);
    });
    return date;
  };
};
var createDateNormalizer = function createDateNormalizer(_ref) {
  var _ref$format = _ref.format,
      format = _ref$format === void 0 ? 'native' : _ref$format,
      _ref$precision = _ref.precision,
      precision = _ref$precision === void 0 ? 'millisecond' : _ref$precision,
      _ref$useUTC = _ref.useUTC,
      useUTC = _ref$useUTC === void 0 ? true : _ref$useUTC;
  var precisionFn = createPrecisionMethod(precision);
  if (format === 'native') return function (v) {
    return precisionFn(v);
  };
  var parseTime = useUTC ? utcParse(format) : timeParse(format);
  return function (v) {
    return precisionFn(parseTime(v));
  };
};

var timeScale = function timeScale(_ref, xy, width, height) {
  var axis = _ref.axis,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? 'native' : _ref$format,
      _ref$precision = _ref.precision,
      precision = _ref$precision === void 0 ? TIME_PRECISION_MILLISECOND : _ref$precision,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 'auto' : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 'auto' : _ref$max,
      _ref$useUTC = _ref.useUTC,
      useUTC = _ref$useUTC === void 0 ? true : _ref$useUTC;
  var values = xy[axis];
  var size = axis === 'x' ? width : height;
  var normalize = createDateNormalizer({
    format: format,
    precision: precision,
    useUTC: useUTC
  });
  var minValue = min;
  if (min === 'auto') {
    minValue = values.min;
  } else if (format !== 'native') {
    minValue = normalize(min);
  }
  var maxValue = max;
  if (max === 'auto') {
    maxValue = values.max;
  } else if (format !== 'native') {
    maxValue = normalize(max);
  }
  var scale = useUTC ? scaleUtc() : scaleTime();
  scale.domain([minValue, maxValue]).range([0, size]);
  scale.type = 'time';
  scale.useUTC = useUTC;
  return scale;
};
var timeScalePropTypes = {
  type: PropTypes.oneOf(['time']).isRequired,
  format: PropTypes.string,
  precision: PropTypes.oneOf(timePrecisions)
};

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

var getOtherAxis = function getOtherAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
};
var compareValues = function compareValues(a, b) {
  return a === b;
};
var compareDateValues = function compareDateValues(a, b) {
  return a.getTime() === b.getTime();
};
var computeXYScalesForSeries = function computeXYScalesForSeries(_series, xScaleSpec, yScaleSpec, width, height) {
  var series = _series.map(function (serie) {
    return _objectSpread2(_objectSpread2({}, serie), {}, {
      data: serie.data.map(function (d) {
        return {
          data: _objectSpread2({}, d)
        };
      })
    });
  });
  var xy = generateSeriesXY(series, xScaleSpec, yScaleSpec);
  if (xScaleSpec.stacked === true) {
    stackX(yScaleSpec.type, xy, series);
  }
  if (yScaleSpec.stacked === true) {
    stackY(xScaleSpec.type, xy, series);
  }
  var xScale = computeScale(_objectSpread2(_objectSpread2({}, xScaleSpec), {}, {
    axis: 'x'
  }), xy, width, height);
  var yScale = computeScale(_objectSpread2(_objectSpread2({}, yScaleSpec), {}, {
    axis: 'y'
  }), xy, width, height);
  series.forEach(function (serie) {
    serie.data.forEach(function (d) {
      d.position = {
        x: xScale.stacked === true ? d.data.xStacked === null ? null : xScale(d.data.xStacked) : d.data.x === null ? null : xScale(d.data.x),
        y: yScale.stacked === true ? d.data.yStacked === null ? null : yScale(d.data.yStacked) : d.data.y === null ? null : yScale(d.data.y)
      };
    });
  });
  return _objectSpread2(_objectSpread2({}, xy), {}, {
    series: series,
    xScale: xScale,
    yScale: yScale
  });
};
var computeScale = function computeScale(spec, xy, width, height) {
  if (spec.type === 'linear') return linearScale(spec, xy, width, height);else if (spec.type === 'point') return pointScale(spec, xy, width, height);else if (spec.type === 'time') return timeScale(spec, xy, width, height);else if (spec.type === 'log') return logScale(spec, xy, width, height);else if (spec.type === 'symlog') return symlogScale(spec, xy, width, height);
};
var generateSeriesXY = function generateSeriesXY(series, xScaleSpec, yScaleSpec) {
  return {
    x: generateSeriesAxis(series, 'x', xScaleSpec),
    y: generateSeriesAxis(series, 'y', yScaleSpec)
  };
};
var generateSeriesAxis = function generateSeriesAxis(series, axis, scaleSpec) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$getValue = _ref.getValue,
      getValue = _ref$getValue === void 0 ? function (d) {
    return d.data[axis];
  } : _ref$getValue,
      _ref$setValue = _ref.setValue,
      setValue = _ref$setValue === void 0 ? function (d, v) {
    d.data[axis] = v;
  } : _ref$setValue;
  if (scaleSpec.type === 'linear') {
    series.forEach(function (serie) {
      serie.data.forEach(function (d) {
        setValue(d, getValue(d) === null ? null : parseFloat(getValue(d)));
      });
    });
  } else if (scaleSpec.type === 'time' && scaleSpec.format !== 'native') {
    var parseTime = createDateNormalizer(scaleSpec);
    series.forEach(function (serie) {
      serie.data.forEach(function (d) {
        setValue(d, getValue(d) === null ? null : parseTime(getValue(d)));
      });
    });
  }
  var all = [];
  series.forEach(function (serie) {
    serie.data.forEach(function (d) {
      all.push(getValue(d));
    });
  });
  var min, max;
  if (scaleSpec.type === 'linear') {
    all = uniq(all);
    all = sortBy(all, function (v) {
      return v;
    });
    min = Math.min.apply(Math, _toConsumableArray(all));
    max = Math.max.apply(Math, _toConsumableArray(all));
  } else if (scaleSpec.type === 'time') {
    all = uniqBy(all, function (v) {
      return v.getTime();
    });
    all = all.slice(0).sort(function (a, b) {
      return b - a;
    }).reverse();
    min = all[0];
    max = last(all);
  } else {
    all = uniq(all);
    min = all[0];
    max = last(all);
  }
  return {
    all: all,
    min: min,
    max: max
  };
};
var stackAxis = function stackAxis(axis, otherType, xy, series) {
  var otherAxis = getOtherAxis(axis);
  var all = [];
  xy[otherAxis].all.forEach(function (v) {
    var compare = isDate(v) ? compareDateValues : compareValues;
    var stack = [];
    series.forEach(function (serie) {
      var datum = serie.data.find(function (d) {
        return compare(d.data[otherAxis], v);
      });
      var value = null;
      var stackValue = null;
      if (datum !== undefined) {
        value = datum.data[axis];
        if (value !== null) {
          var head = last(stack);
          if (head === undefined) {
            stackValue = value;
          } else if (head !== null) {
            stackValue = head + value;
          }
        }
        datum.data["".concat(axis, "Stacked")] = stackValue;
      }
      stack.push(stackValue);
      all.push(stackValue);
    });
  });
  all = all.filter(function (v) {
    return v !== null;
  });
  xy[axis].minStacked = Math.min.apply(Math, _toConsumableArray(all));
  xy[axis].maxStacked = Math.max.apply(Math, _toConsumableArray(all));
};
var stackX = function stackX(xy, otherType, series) {
  return stackAxis('x', xy, otherType, series);
};
var stackY = function stackY(xy, otherType, series) {
  return stackAxis('y', xy, otherType, series);
};
var computeAxisSlices = function computeAxisSlices(axis, data) {
  var otherAxis = getOtherAxis(axis);
  return data[otherAxis].all.map(function (v) {
    var _slice;
    var slice = (_slice = {
      id: v
    }, _defineProperty(_slice, otherAxis, data["".concat(otherAxis, "Scale")](v)), _defineProperty(_slice, "data", []), _slice);
    var compare = isDate(v) ? compareDateValues : compareValues;
    data.series.forEach(function (serie) {
      var datum = serie.data.find(function (d) {
        return compare(d.data[otherAxis], v);
      });
      if (datum !== undefined) {
        slice.data.push(_objectSpread2(_objectSpread2({}, datum), {}, {
          serie: serie
        }));
      }
    });
    slice.data.reverse();
    return slice;
  });
};
var computeXSlices = function computeXSlices(data) {
  return computeAxisSlices('x', data);
};
var computeYSlices = function computeYSlices(data) {
  return computeAxisSlices('y', data);
};

var scalePropType = PropTypes.oneOfType([PropTypes.shape(linearScalePropTypes), PropTypes.shape(pointScalePropTypes), PropTypes.shape(timeScalePropTypes), PropTypes.shape(logScalePropTypes), PropTypes.shape(symLogScalePropTypes)]);

export { TIME_PRECISION_DAY, TIME_PRECISION_HOUR, TIME_PRECISION_MILLISECOND, TIME_PRECISION_MINUTE, TIME_PRECISION_MONTH, TIME_PRECISION_SECOND, TIME_PRECISION_YEAR, compareDateValues, compareValues, computeAxisSlices, computeScale, computeXSlices, computeXYScalesForSeries, computeYSlices, createDateNormalizer, createPrecisionMethod, generateSeriesAxis, generateSeriesXY, getOtherAxis, linearScale, linearScalePropTypes, logScale, logScalePropTypes, pointScale, pointScalePropTypes, precisionCutOffs, precisionCutOffsByType, scalePropType, stackAxis, stackX, stackY, timePrecisions, timeScale, timeScalePropTypes };
//# sourceMappingURL=nivo-scales.es.js.map
