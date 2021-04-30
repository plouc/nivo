(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@bitbloom/nivo-core'), require('@bitbloom/nivo-axes'), require('@bitbloom/nivo-legends'), require('react-spring'), require('@bitbloom/nivo-tooltip'), require('prop-types'), require('@bitbloom/nivo-colors'), require('d3-shape'), require('d3-scale')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', '@bitbloom/nivo-core', '@bitbloom/nivo-axes', '@bitbloom/nivo-legends', 'react-spring', '@bitbloom/nivo-tooltip', 'prop-types', '@bitbloom/nivo-colors', 'd3-shape', 'd3-scale'], factory) :
    (global = global || self, factory(global.nivo = global.nivo || {}, global.React, global.nivo, global.nivo, global.nivo, global['react-spring'], global.nivo, global.PropTypes, global.nivo, global.d3, global.d3));
}(this, (function (exports, React, nivoCore, nivoAxes, nivoLegends, reactSpring, nivoTooltip, PropTypes, nivoColors, d3Shape, d3Scale) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;
    PropTypes = PropTypes && Object.prototype.hasOwnProperty.call(PropTypes, 'default') ? PropTypes['default'] : PropTypes;

    var StreamLayer = function StreamLayer(_ref) {
      var layer = _ref.layer,
          fillOpacity = _ref.fillOpacity,
          borderWidth = _ref.borderWidth,
          getBorderColor = _ref.getBorderColor,
          getTooltipLabel = _ref.getTooltipLabel,
          isInteractive = _ref.isInteractive;
      var _useTooltip = nivoTooltip.useTooltip(),
          showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
          hideTooltip = _useTooltip.hideTooltip;
      var handleMouseHover = React.useCallback(function (event) {
        showTooltipFromEvent( React__default.createElement(nivoTooltip.BasicTooltip, {
          id: getTooltipLabel(layer),
          enableChip: true,
          color: layer.color
        }), event, 'left');
      }, [showTooltipFromEvent, getTooltipLabel, layer]);
      var _useMotionConfig = nivoCore.useMotionConfig(),
          animate = _useMotionConfig.animate,
          springConfig = _useMotionConfig.config;
      var animatedProps = reactSpring.useSpring({
        path: layer.path,
        color: layer.color,
        config: springConfig,
        immediate: !animate
      });
      return React__default.createElement(reactSpring.animated.path, {
        d: animatedProps.path,
        fill: layer.fill ? layer.fill : animatedProps.color,
        fillOpacity: fillOpacity,
        stroke: getBorderColor(layer),
        strokeWidth: borderWidth,
        onMouseMove: isInteractive ? handleMouseHover : undefined,
        onMouseEnter: isInteractive ? handleMouseHover : undefined,
        onMouseLeave: isInteractive ? hideTooltip : undefined
      });
    };
    var StreamLayer$1 = React.memo(StreamLayer);

    var StreamLayers = function StreamLayers(_ref) {
      var layers = _ref.layers,
          fillOpacity = _ref.fillOpacity,
          borderWidth = _ref.borderWidth,
          getBorderColor = _ref.getBorderColor,
          getTooltipLabel = _ref.getTooltipLabel,
          isInteractive = _ref.isInteractive;
      return React__default.createElement("g", null, layers.map(function (layer, i) {
        return React__default.createElement(StreamLayer$1, {
          key: i,
          layer: layer,
          getBorderColor: getBorderColor,
          borderWidth: borderWidth,
          fillOpacity: fillOpacity,
          getTooltipLabel: getTooltipLabel,
          isInteractive: isInteractive
        });
      }));
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

    var getDotY = function getDotY(datum, position) {
      var y = datum.y2;
      if (position === 'center') {
        y = datum.y1 + (datum.y2 - datum.y1) / 2;
      } else if (position === 'start') {
        y = datum.y1;
      }
      return y;
    };
    var StreamDots = function StreamDots(_ref) {
      var id = _ref.id,
          color = _ref.color,
          data = _ref.data,
          dotComponent = _ref.dotComponent,
          position = _ref.position,
          getSize = _ref.getSize,
          getColor = _ref.getColor,
          getBorderWidth = _ref.getBorderWidth,
          getBorderColor = _ref.getBorderColor;
      return data.map(function (d, i) {
        var datum = _objectSpread2(_objectSpread2({}, d), {}, {
          key: id,
          color: color
        });
        return React__default.createElement(dotComponent, {
          key: i,
          datum: datum,
          x: datum.x,
          y: getDotY(datum, position),
          size: getSize(datum),
          color: getColor(datum),
          borderWidth: getBorderWidth(datum),
          borderColor: getBorderColor(datum)
        });
      });
    };
    var StreamDots$1 = React.memo(StreamDots);

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

    var StreamSlicesItem = function StreamSlicesItem(_ref) {
      var slice = _ref.slice,
          height = _ref.height,
          getTooltipLabel = _ref.getTooltipLabel,
          getTooltipValue = _ref.getTooltipValue;
      var _useState = React.useState(false),
          _useState2 = _slicedToArray(_useState, 2),
          isHover = _useState2[0],
          setIsHover = _useState2[1];
      var _useTooltip = nivoTooltip.useTooltip(),
          showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
          hideTooltip = _useTooltip.hideTooltip;
      var rows = React.useMemo(function () {
        return slice.stack.map(function (p) {
          return [React__default.createElement(nivoTooltip.Chip, {
            key: p.id,
            color: p.color
          }), getTooltipLabel(p), getTooltipValue(p.value)];
        });
      }, [slice, getTooltipLabel, getTooltipValue]);
      var handleMouseHover = React.useCallback(function (event) {
        setIsHover(true);
        showTooltipFromEvent( React__default.createElement(nivoTooltip.TableTooltip, {
          rows: rows
        }), event, 'left');
      }, [setIsHover, showTooltipFromEvent, rows]);
      var handleMouseLeave = React.useCallback(function () {
        setIsHover(false);
        hideTooltip();
      }, [setIsHover, hideTooltip]);
      return React__default.createElement("g", {
        transform: "translate(".concat(slice.x, ", 0)")
      }, isHover && React__default.createElement("line", {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: height,
        stroke: "#000",
        strokeOpacity: 0.35,
        strokeWidth: 1
      }), React__default.createElement("rect", {
        x: -20,
        width: 40,
        height: height,
        fill: "#000",
        fillOpacity: 0,
        onMouseEnter: handleMouseHover,
        onMouseMove: handleMouseHover,
        onMouseLeave: handleMouseLeave
      }));
    };
    var StreamSlicesItem$1 = React.memo(StreamSlicesItem);

    var StreamSlices = function StreamSlices(_ref) {
      var slices = _ref.slices,
          height = _ref.height,
          getTooltipLabel = _ref.getTooltipLabel,
          getTooltipValue = _ref.getTooltipValue;
      return React__default.createElement("g", null, slices.map(function (slice) {
        return React__default.createElement(StreamSlicesItem$1, {
          key: slice.index,
          slice: slice,
          height: height,
          getTooltipLabel: getTooltipLabel,
          getTooltipValue: getTooltipValue
        });
      }));
    };
    var StreamSlices$1 = React.memo(StreamSlices);

    var StreamDotsItem = function StreamDotsItem(_ref) {
      var x = _ref.x,
          y = _ref.y,
          size = _ref.size,
          color = _ref.color,
          borderWidth = _ref.borderWidth,
          borderColor = _ref.borderColor;
      var _useMotionConfig = nivoCore.useMotionConfig(),
          animate = _useMotionConfig.animate,
          springConfig = _useMotionConfig.config;
      var animatedProps = reactSpring.useSpring({
        x: x,
        y: y,
        radius: size * 0.5,
        color: color,
        config: springConfig,
        immediate: !animate
      });
      return React__default.createElement(reactSpring.animated.circle, {
        cx: animatedProps.x,
        cy: animatedProps.y,
        r: animatedProps.radius,
        fill: animatedProps.color,
        strokeWidth: borderWidth,
        stroke: borderColor
      });
    };
    var StreamDotsItem$1 = React.memo(StreamDotsItem);

    var StreamPropTypes = {
      data: PropTypes.arrayOf(PropTypes.object).isRequired,
      keys: PropTypes.array.isRequired,
      order: nivoCore.stackOrderPropType.isRequired,
      offsetType: nivoCore.stackOffsetPropType.isRequired,
      curve: nivoCore.areaCurvePropType.isRequired,
      axisTop: PropTypes.object,
      axisRight: PropTypes.object,
      axisBottom: PropTypes.object,
      axisLeft: PropTypes.object,
      enableGridX: PropTypes.bool.isRequired,
      enableGridY: PropTypes.bool.isRequired,
      colors: nivoColors.ordinalColorsPropType.isRequired,
      fillOpacity: PropTypes.number.isRequired,
      defs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
      })).isRequired,
      fill: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        match: PropTypes.oneOfType([PropTypes.oneOf(['*']), PropTypes.object, PropTypes.func]).isRequired
      })).isRequired,
      borderWidth: PropTypes.number.isRequired,
      borderColor: nivoColors.inheritedColorPropType.isRequired,
      enableDots: PropTypes.bool.isRequired,
      dotComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
      dotPosition: PropTypes.oneOf(['start', 'center', 'end']).isRequired,
      dotSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
      dotColor: nivoColors.inheritedColorPropType.isRequired,
      dotBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
      dotBorderColor: nivoColors.inheritedColorPropType.isRequired,
      isInteractive: PropTypes.bool,
      tooltipLabel: PropTypes.func,
      tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      enableStackTooltip: PropTypes.bool.isRequired,
      legends: PropTypes.arrayOf(PropTypes.shape(nivoLegends.LegendPropShape)).isRequired,
      role: PropTypes.string.isRequired
    };
    var StreamDefaultProps = {
      order: 'none',
      offsetType: 'wiggle',
      curve: 'catmullRom',
      axisBottom: {},
      enableGridX: true,
      enableGridY: false,
      borderWidth: 0,
      borderColor: {
        from: 'color',
        modifiers: [['darker', 1]]
      },
      colors: {
        scheme: 'nivo'
      },
      fillOpacity: 1,
      defs: [],
      fill: [],
      enableDots: false,
      dotPosition: 'center',
      dotComponent: StreamDotsItem$1,
      dotSize: 6,
      dotColor: {
        from: 'color'
      },
      dotBorderWidth: 0,
      dotBorderColor: {
        from: 'color'
      },
      isInteractive: true,
      enableStackTooltip: true,
      legends: [],
      role: 'img',
      animate: true,
      motionConfig: 'gentle'
    };

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

    var stackMin = function stackMin(layers) {
      return Math.min.apply(Math, _toConsumableArray(layers.reduce(function (acc, layer) {
        return [].concat(_toConsumableArray(acc), _toConsumableArray(layer.map(function (d) {
          return d[0];
        })));
      }, [])));
    };
    var stackMax = function stackMax(layers) {
      return Math.max.apply(Math, _toConsumableArray(layers.reduce(function (acc, layer) {
        return [].concat(_toConsumableArray(acc), _toConsumableArray(layer.map(function (d) {
          return d[1];
        })));
      }, [])));
    };
    var useStream = function useStream(_ref) {
      var width = _ref.width,
          height = _ref.height,
          data = _ref.data,
          keys = _ref.keys,
          offsetType = _ref.offsetType,
          order = _ref.order,
          curve = _ref.curve,
          colors = _ref.colors,
          borderColor = _ref.borderColor,
          dotSize = _ref.dotSize,
          dotColor = _ref.dotColor,
          dotBorderWidth = _ref.dotBorderWidth,
          dotBorderColor = _ref.dotBorderColor,
          tooltipLabel = _ref.tooltipLabel,
          tooltipFormat = _ref.tooltipFormat;
      var areaGenerator = React.useMemo(function () {
        return d3Shape.area().x(function (_ref2) {
          var x = _ref2.x;
          return x;
        }).y0(function (_ref3) {
          var y1 = _ref3.y1;
          return y1;
        }).y1(function (_ref4) {
          var y2 = _ref4.y2;
          return y2;
        }).curve(nivoCore.curveFromProp(curve));
      }, [curve]);
      var stack = React.useMemo(function () {
        return d3Shape.stack().keys(keys).offset(nivoCore.stackOffsetFromProp(offsetType)).order(nivoCore.stackOrderFromProp(order));
      }, [keys, offsetType, order]);
      var _useMemo = React.useMemo(function () {
        var layers = stack(data);
        layers.forEach(function (layer) {
          layer.forEach(function (point) {
            point.value = point.data[layer.key];
          });
        });
        var minValue = stackMin(layers);
        var maxValue = stackMax(layers);
        return [layers, d3Scale.scalePoint().domain(Array.from({
          length: data.length
        }, function (_, i) {
          return i;
        })).range([0, width]), d3Scale.scaleLinear().domain([minValue, maxValue]).range([height, 0])];
      }, [stack, data, width, height]),
          _useMemo2 = _slicedToArray(_useMemo, 3),
          layers = _useMemo2[0],
          xScale = _useMemo2[1],
          yScale = _useMemo2[2];
      var theme = nivoCore.useTheme();
      var getColor = nivoColors.useOrdinalColorScale(colors, 'index');
      var getBorderColor = nivoColors.useInheritedColor(borderColor, theme);
      var getDotSize = React.useMemo(function () {
        return typeof dotSize === 'function' ? dotSize : function () {
          return dotSize;
        };
      }, [dotSize]);
      var getDotColor = nivoColors.useInheritedColor(dotColor, theme);
      var getDotBorderWidth = React.useMemo(function () {
        return typeof dotBorderWidth === 'function' ? dotBorderWidth : function () {
          return dotBorderWidth;
        };
      }, [dotBorderWidth]);
      var getDotBorderColor = nivoColors.useInheritedColor(dotBorderColor, theme);
      var enhancedLayers = React.useMemo(function () {
        return layers.map(function (points, layerIndex) {
          var layer = points.map(function (point, i) {
            return {
              index: i,
              x: xScale(i),
              value: point.value,
              y1: yScale(point[0]),
              y2: yScale(point[1])
            };
          });
          return {
            id: keys[layerIndex],
            layer: layer,
            path: areaGenerator(layer),
            color: getColor({
              index: layerIndex
            })
          };
        });
      }, [layers, keys, areaGenerator, getColor]);
      var slices = React.useMemo(function () {
        return Array.from({
          length: data.length
        }, function (_, i) {
          var sliceStack = enhancedLayers.map(function (layer) {
            return _objectSpread2({
              id: layer.id,
              color: layer.color
            }, layer.layer[i]);
          }).sort(function (a, b) {
            return a.y2 - b.y2;
          });
          return {
            index: i,
            x: enhancedLayers[0].layer[i].x,
            stack: sliceStack
          };
        });
      }, [data.length, enhancedLayers]);
      var getTooltipLabel = React.useMemo(function () {
        if (typeof tooltipLabel === 'function') return tooltipLabel;
        return function (d) {
          return d.id;
        };
      }, [tooltipLabel]);
      var getTooltipValue = nivoCore.useValueFormatter(tooltipFormat);
      return {
        xScale: xScale,
        yScale: yScale,
        layers: enhancedLayers,
        slices: slices,
        getBorderColor: getBorderColor,
        getDotSize: getDotSize,
        getDotColor: getDotColor,
        getDotBorderWidth: getDotBorderWidth,
        getDotBorderColor: getDotBorderColor,
        getTooltipLabel: getTooltipLabel,
        getTooltipValue: getTooltipValue
      };
    };

    var Stream = function Stream(_ref) {
      var data = _ref.data,
          keys = _ref.keys,
          offsetType = _ref.offsetType,
          order = _ref.order,
          curve = _ref.curve,
          width = _ref.width,
          height = _ref.height,
          partialMargin = _ref.margin,
          axisTop = _ref.axisTop,
          axisRight = _ref.axisRight,
          axisBottom = _ref.axisBottom,
          axisLeft = _ref.axisLeft,
          enableGridX = _ref.enableGridX,
          enableGridY = _ref.enableGridY,
          colors = _ref.colors,
          fillOpacity = _ref.fillOpacity,
          borderWidth = _ref.borderWidth,
          borderColor = _ref.borderColor,
          defs = _ref.defs,
          fill = _ref.fill,
          enableDots = _ref.enableDots,
          dotPosition = _ref.dotPosition,
          dotComponent = _ref.dotComponent,
          dotSize = _ref.dotSize,
          dotColor = _ref.dotColor,
          dotBorderWidth = _ref.dotBorderWidth,
          dotBorderColor = _ref.dotBorderColor,
          isInteractive = _ref.isInteractive,
          tooltipLabel = _ref.tooltipLabel,
          tooltipFormat = _ref.tooltipFormat,
          enableStackTooltip = _ref.enableStackTooltip,
          legends = _ref.legends,
          role = _ref.role;
      var _useDimensions = nivoCore.useDimensions(width, height, partialMargin),
          margin = _useDimensions.margin,
          innerWidth = _useDimensions.innerWidth,
          innerHeight = _useDimensions.innerHeight,
          outerWidth = _useDimensions.outerWidth,
          outerHeight = _useDimensions.outerHeight;
      var _useStream = useStream({
        width: innerWidth,
        height: innerHeight,
        data: data,
        keys: keys,
        offsetType: offsetType,
        order: order,
        curve: curve,
        colors: colors,
        borderColor: borderColor,
        dotSize: dotSize,
        dotColor: dotColor,
        dotBorderWidth: dotBorderWidth,
        dotBorderColor: dotBorderColor,
        tooltipLabel: tooltipLabel,
        tooltipFormat: tooltipFormat
      }),
          xScale = _useStream.xScale,
          yScale = _useStream.yScale,
          layers = _useStream.layers,
          slices = _useStream.slices,
          getBorderColor = _useStream.getBorderColor,
          getDotSize = _useStream.getDotSize,
          getDotColor = _useStream.getDotColor,
          getDotBorderWidth = _useStream.getDotBorderWidth,
          getDotBorderColor = _useStream.getDotBorderColor,
          getTooltipLabel = _useStream.getTooltipLabel,
          getTooltipValue = _useStream.getTooltipValue;
      var boundDefs = nivoCore.bindDefs(defs, layers, fill);
      return React__default.createElement(nivoCore.SvgWrapper, {
        width: outerWidth,
        height: outerHeight,
        margin: margin,
        defs: boundDefs,
        role: role
      }, React__default.createElement(nivoAxes.Grid, {
        width: innerWidth,
        height: innerHeight,
        xScale: enableGridX ? xScale : null,
        yScale: enableGridY ? yScale : null
      }), React__default.createElement(StreamLayers, {
        layers: layers,
        fillOpacity: fillOpacity,
        borderWidth: borderWidth,
        getBorderColor: getBorderColor,
        getTooltipLabel: getTooltipLabel,
        isInteractive: isInteractive
      }), React__default.createElement(nivoAxes.Axes, {
        xScale: xScale,
        yScale: yScale,
        width: innerWidth,
        height: innerHeight,
        top: axisTop,
        right: axisRight,
        bottom: axisBottom,
        left: axisLeft
      }), enableDots && layers.map(function (layer) {
        return React__default.createElement(StreamDots$1, {
          key: layer.id,
          id: layer.id,
          color: layer.color,
          data: layer.layer,
          dotComponent: dotComponent,
          position: dotPosition,
          getSize: getDotSize,
          getColor: getDotColor,
          getBorderWidth: getDotBorderWidth,
          getBorderColor: getDotBorderColor
        });
      }), isInteractive && enableStackTooltip && React__default.createElement(StreamSlices$1, {
        slices: slices,
        height: innerHeight,
        getTooltipValue: getTooltipValue,
        getTooltipLabel: getTooltipLabel
      }), legends.map(function (legend, i) {
        var legendData = layers.map(function (l) {
          return {
            id: l.id,
            label: l.id,
            color: l.color,
            fill: l.fill
          };
        }).reverse();
        return React__default.createElement(nivoLegends.BoxLegendSvg, Object.assign({
          key: i
        }, legend, {
          containerWidth: innerWidth,
          containerHeight: innerHeight,
          data: legendData
        }));
      }));
    };
    var WrappedStream = nivoCore.withContainer(Stream);
    WrappedStream.defaultProps = StreamDefaultProps;

    var ResponsiveStream = function ResponsiveStream(props) {
      return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return React__default.createElement(WrappedStream, Object.assign({
          width: width,
          height: height
        }, props));
      });
    };

    exports.ResponsiveStream = ResponsiveStream;
    exports.Stream = WrappedStream;
    exports.StreamDefaultProps = StreamDefaultProps;
    exports.StreamPropTypes = StreamPropTypes;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=nivo-stream.umd.js.map
