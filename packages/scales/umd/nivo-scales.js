(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-scale'), require('prop-types'), require('d3-time-format'), require('lodash/uniq'), require('lodash/uniqBy'), require('lodash/sortBy'), require('lodash/last'), require('lodash/isDate')) :
    typeof define === 'function' && define.amd ? define(['exports', 'd3-scale', 'prop-types', 'd3-time-format', 'lodash/uniq', 'lodash/uniqBy', 'lodash/sortBy', 'lodash/last', 'lodash/isDate'], factory) :
    (factory((global.nivo = global.nivo || {}),global.d3,global.PropTypes,global.d3,global['lodash/uniq'],global['lodash/uniqBy'],global['lodash/sortBy'],global['lodash/last'],global['lodash/isDate']));
}(this, (function (exports,d3Scale,PropTypes,d3TimeFormat,uniq,uniqBy,sortBy,last,isDate) { 'use strict';

    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
    uniq = uniq && uniq.hasOwnProperty('default') ? uniq['default'] : uniq;
    uniqBy = uniqBy && uniqBy.hasOwnProperty('default') ? uniqBy['default'] : uniqBy;
    sortBy = sortBy && sortBy.hasOwnProperty('default') ? sortBy['default'] : sortBy;
    last = last && last.hasOwnProperty('default') ? last['default'] : last;
    isDate = isDate && isDate.hasOwnProperty('default') ? isDate['default'] : isDate;

    var linearScale = function linearScale(_ref, xy, width, height) {
        var axis = _ref.axis,
            _ref$min = _ref.min,
            min = _ref$min === undefined ? 0 : _ref$min,
            _ref$max = _ref.max,
            max = _ref$max === undefined ? 'auto' : _ref$max,
            _ref$stacked = _ref.stacked,
            stacked = _ref$stacked === undefined ? false : _ref$stacked;

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

        var scale = d3Scale.scaleLinear().rangeRound(axis === 'x' ? [0, size] : [size, 0]).domain([minValue, maxValue]);

        scale.type = 'linear';
        scale.stacked = stacked;

        return scale;
    };

    var linearScalePropTypes = {
        type: PropTypes.oneOf(['linear']).isRequired,
        min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
        max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
        stacked: PropTypes.bool
    };

    var pointScale = function pointScale(_ref, xy, width, height) {
        var axis = _ref.axis;

        var values = xy[axis];
        var size = axis === 'x' ? width : height;

        var scale = d3Scale.scalePoint().range([0, size]).domain(values.all);

        scale.type = 'point';

        return scale;
    };

    var pointScalePropTypes = {
        type: PropTypes.oneOf(['point']).isRequired
    };

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

    var precisionCutOffsByType = (_precisionCutOffsByTy = {}, _precisionCutOffsByTy[TIME_PRECISION_MILLISECOND] = [], _precisionCutOffsByTy[TIME_PRECISION_SECOND] = precisionCutOffs.slice(0, 1), _precisionCutOffsByTy[TIME_PRECISION_MINUTE] = precisionCutOffs.slice(0, 2), _precisionCutOffsByTy[TIME_PRECISION_HOUR] = precisionCutOffs.slice(0, 3), _precisionCutOffsByTy[TIME_PRECISION_DAY] = precisionCutOffs.slice(0, 4), _precisionCutOffsByTy[TIME_PRECISION_MONTH] = precisionCutOffs.slice(0, 5), _precisionCutOffsByTy[TIME_PRECISION_YEAR] = precisionCutOffs.slice(0, 6), _precisionCutOffsByTy);

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
            format = _ref$format === undefined ? 'native' : _ref$format,
            _ref$precision = _ref.precision,
            precision = _ref$precision === undefined ? 'millisecond' : _ref$precision;

        var precisionFn = createPrecisionMethod(precision);
        if (format === 'native') return function (v) {
            return precisionFn(v);
        };

        var parseTime = d3TimeFormat.timeParse(format);
        return function (v) {
            return precisionFn(parseTime(v));
        };
    };

    var timeScale = function timeScale(_ref, xy, width, height) {
        var axis = _ref.axis,
            _ref$format = _ref.format,
            format = _ref$format === undefined ? 'native' : _ref$format,
            _ref$precision = _ref.precision,
            precision = _ref$precision === undefined ? TIME_PRECISION_MILLISECOND : _ref$precision,
            _ref$min = _ref.min,
            min = _ref$min === undefined ? 'auto' : _ref$min,
            _ref$max = _ref.max,
            max = _ref$max === undefined ? 'auto' : _ref$max;

        var values = xy[axis];
        var size = axis === 'x' ? width : height;

        var normalize = createDateNormalizer({ format: format, precision: precision });

        var minValue = min;
        if (min === 'auto') {
            minValue = values.min;
        } else if (format !== 'native') {
            minValue = normalize(values.min);
        }

        var maxValue = max;
        if (max === 'auto') {
            maxValue = values.max;
        } else if (format !== 'native') {
            maxValue = normalize(values.max);
        }

        var scale = d3Scale.scaleTime().domain([minValue, maxValue]).range([0, size]);

        scale.type = 'time';

        return scale;
    };

    var timeScalePropTypes = {
        type: PropTypes.oneOf(['time']).isRequired,
        format: PropTypes.string,
        precision: PropTypes.oneOf(timePrecisions)
    };

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

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
            return _extends({}, serie, {
                data: serie.data.map(function (d) {
                    return { data: _extends({}, d) };
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

        var xScale = computeScale(_extends({}, xScaleSpec, { axis: 'x' }), xy, width, height);
        var yScale = computeScale(_extends({}, yScaleSpec, { axis: 'y' }), xy, width, height);

        series.forEach(function (serie) {
            serie.data.forEach(function (d) {
                d.position = {
                    x: xScale.stacked === true ? d.data.xStacked === null ? null : xScale(d.data.xStacked) : d.data.x === null ? null : xScale(d.data.x),
                    y: yScale.stacked === true ? d.data.yStacked === null ? null : yScale(d.data.yStacked) : d.data.y === null ? null : yScale(d.data.y)
                };
            });
        });

        return _extends({}, xy, {
            series: series,
            xScale: xScale,
            yScale: yScale
        });
    };

    var computeScale = function computeScale(spec, xy, width, height) {
        if (spec.type === 'linear') return linearScale(spec, xy, width, height);else if (spec.type === 'point') return pointScale(spec, xy, width, height);else if (spec.type === 'time') return timeScale(spec, xy, width, height);
    };

    var generateSeriesXY = function generateSeriesXY(series, xScaleSpec, yScaleSpec) {
        return {
            x: generateSeriesAxis(series, 'x', xScaleSpec),
            y: generateSeriesAxis(series, 'y', yScaleSpec)
        };
    };

    /**
     * Normalize data according to scale type, (time => Date, linear => Number)
     * compute sorted unique values and min/max.
     */
    var generateSeriesAxis = function generateSeriesAxis(series, axis, scaleSpec) {
        if (scaleSpec.type === 'linear') {
            series.forEach(function (serie) {
                serie.data.forEach(function (d) {
                    d.data[axis] = d.data[axis] === null ? null : parseFloat(d.data[axis]);
                });
            });
        } else if (scaleSpec.type === 'time' && scaleSpec.format !== 'native') {
            var parseTime = createDateNormalizer(scaleSpec);
            series.forEach(function (serie) {
                serie.data.forEach(function (d) {
                    d.data[axis] = d.data[axis] === null ? null : parseTime(d.data[axis]);
                });
            });
        }

        var all = [];
        series.forEach(function (serie) {
            serie.data.forEach(function (d) {
                all.push(d.data[axis]);
            });
        });

        var min = void 0,
            max = void 0;
        if (scaleSpec.type === 'linear') {
            all = uniq(all);
            all = sortBy(all, function (v) {
                return v;
            });
            min = Math.min.apply(Math, all);
            max = Math.max.apply(Math, all);
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

        return { all: all, min: min, max: max };
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
                    datum.data[axis + 'Stacked'] = stackValue;
                }
                stack.push(stackValue);
                all.push(stackValue);
            });
        });
        all = all.filter(function (v) {
            return v !== null;
        });

        xy[axis].minStacked = Math.min.apply(Math, all);
        xy[axis].maxStacked = Math.max.apply(Math, all);
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
            }, _slice[otherAxis] = data[otherAxis + 'Scale'](v), _slice.data = [], _slice);
            var compare = isDate(v) ? compareDateValues : compareValues;
            data.series.forEach(function (serie) {
                var datum = serie.data.find(function (d) {
                    return compare(d.data[otherAxis], v);
                });
                if (datum !== undefined) {
                    slice.data.push(_extends({}, datum, {
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

    var scalePropType = PropTypes.oneOfType([PropTypes.shape(linearScalePropTypes), PropTypes.shape(pointScalePropTypes), PropTypes.shape(timeScalePropTypes)]);

    exports.scalePropType = scalePropType;
    exports.getOtherAxis = getOtherAxis;
    exports.compareValues = compareValues;
    exports.compareDateValues = compareDateValues;
    exports.computeXYScalesForSeries = computeXYScalesForSeries;
    exports.computeScale = computeScale;
    exports.generateSeriesXY = generateSeriesXY;
    exports.generateSeriesAxis = generateSeriesAxis;
    exports.stackAxis = stackAxis;
    exports.stackX = stackX;
    exports.stackY = stackY;
    exports.computeAxisSlices = computeAxisSlices;
    exports.computeXSlices = computeXSlices;
    exports.computeYSlices = computeYSlices;
    exports.linearScale = linearScale;
    exports.linearScalePropTypes = linearScalePropTypes;
    exports.pointScale = pointScale;
    exports.pointScalePropTypes = pointScalePropTypes;
    exports.timeScale = timeScale;
    exports.timeScalePropTypes = timeScalePropTypes;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
