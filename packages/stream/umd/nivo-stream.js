(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('@nivo/core'), require('lodash/isFunction'), require('d3-format'), require('recompose/compose'), require('recompose/pure'), require('recompose/withState'), require('recompose/withHandlers'), require('recompose/withPropsOnChange'), require('@nivo/legends'), require('lodash/min'), require('lodash/max'), require('lodash/range'), require('d3-shape'), require('d3-scale'), require('recompose/defaultProps'), require('lodash/sortBy')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', '@nivo/core', 'lodash/isFunction', 'd3-format', 'recompose/compose', 'recompose/pure', 'recompose/withState', 'recompose/withHandlers', 'recompose/withPropsOnChange', '@nivo/legends', 'lodash/min', 'lodash/max', 'lodash/range', 'd3-shape', 'd3-scale', 'recompose/defaultProps', 'lodash/sortBy'], factory) :
  (factory((global.nivo = global.nivo || {}),global.React,global.PropTypes,global.nivo,global['lodash/isFunction'],global.d3,global.RecomposeCompose,global.RecomposePure,global.RecomposeWithState,global.RecomposeWithHandlers,global.RecomposeWithPropsOnChange,global.nivo,global['lodash/min'],global['lodash/max'],global['lodash/range'],global.d3,global.d3,global.RecomposeDefaultProps,global['lodash/sortBy']));
}(this, (function (exports,React,PropTypes,core,isFunction,d3Format,compose,pure,withState,withHandlers,withPropsOnChange,legends,min,max,range,d3Shape,d3Scale,defaultProps,sortBy) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  isFunction = isFunction && isFunction.hasOwnProperty('default') ? isFunction['default'] : isFunction;
  compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
  pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
  withState = withState && withState.hasOwnProperty('default') ? withState['default'] : withState;
  withHandlers = withHandlers && withHandlers.hasOwnProperty('default') ? withHandlers['default'] : withHandlers;
  withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
  min = min && min.hasOwnProperty('default') ? min['default'] : min;
  max = max && max.hasOwnProperty('default') ? max['default'] : max;
  range = range && range.hasOwnProperty('default') ? range['default'] : range;
  defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
  sortBy = sortBy && sortBy.hasOwnProperty('default') ? sortBy['default'] : sortBy;

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

  var StreamLayers = function StreamLayers(_ref) {
      var layers = _ref.layers,
          fillOpacity = _ref.fillOpacity,
          borderWidth = _ref.borderWidth,
          getBorderColor = _ref.getBorderColor,
          theme = _ref.theme,
          showTooltip = _ref.showTooltip,
          hideTooltip = _ref.hideTooltip,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping;

      if (animate !== true) {
          return React.createElement(
              'g',
              null,
              layers.map(function (layer, i) {
                  var id = layer.id,
                      path = layer.path,
                      color = layer.color;


                  var handleTooltip = function handleTooltip(e) {
                      return showTooltip(React.createElement(core.BasicTooltip, { id: id, enableChip: true, color: color, theme: theme }), e);
                  };

                  return React.createElement('path', {
                      key: i,
                      onMouseMove: handleTooltip,
                      onMouseEnter: handleTooltip,
                      onMouseLeave: hideTooltip,
                      d: path,
                      fill: layer.fill ? layer.fill : layer.color,
                      fillOpacity: fillOpacity,
                      stroke: getBorderColor(layer),
                      strokeWidth: borderWidth
                  });
              })
          );
      }

      var springConfig = {
          stiffness: motionStiffness,
          damping: motionDamping
      };

      return React.createElement(
          'g',
          null,
          layers.map(function (layer, i) {
              var id = layer.id,
                  path = layer.path,
                  color = layer.color;


              var handleTooltip = function handleTooltip(e) {
                  return showTooltip(React.createElement(core.BasicTooltip, { id: id, enableChip: true, color: color, theme: theme }), e);
              };

              return React.createElement(
                  core.SmartMotion,
                  {
                      key: i,
                      style: function style(spring) {
                          return {
                              d: spring(path, springConfig),
                              fill: spring(color, springConfig),
                              fillOpacity: spring(fillOpacity, springConfig)
                          };
                      }
                  },
                  function (style) {
                      return React.createElement('path', _extends({
                          onMouseMove: handleTooltip,
                          onMouseEnter: handleTooltip,
                          onMouseLeave: hideTooltip
                      }, style, {
                          fill: layer.fill ? layer.fill : style.fill,
                          stroke: getBorderColor(layer),
                          strokeWidth: borderWidth
                      }));
                  }
              );
          })
      );
  };

  StreamLayers.propTypes = _extends({
      fillOpacity: PropTypes.number.isRequired,
      borderWidth: PropTypes.number.isRequired,
      getBorderColor: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired

  }, core.motionPropTypes);

  var StreamSlicesItem = function StreamSlicesItem(_ref) {
      var slice = _ref.slice,
          height = _ref.height,
          showTooltip = _ref.showTooltip,
          hideTooltip = _ref.hideTooltip,
          isHover = _ref.isHover;
      return React.createElement(
          'g',
          { transform: 'translate(' + slice.x + ', 0)' },
          isHover && React.createElement('line', {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: height,
              stroke: '#000',
              strokeOpacity: 0.35,
              strokeWidth: 1
          }),
          React.createElement('rect', {
              x: -20,
              width: 40,
              height: height,
              fill: '#000',
              fillOpacity: 0,
              onMouseEnter: showTooltip,
              onMouseMove: showTooltip,
              onMouseLeave: hideTooltip
          })
      );
  };

  StreamSlicesItem.propTypes = {
      slice: PropTypes.object.isRequired,
      height: PropTypes.number.isRequired,
      showTooltip: PropTypes.func.isRequired,
      hideTooltip: PropTypes.func.isRequired,
      isHover: PropTypes.bool.isRequired,
      theme: PropTypes.object.isRequired
  };

  var enhance = compose(withState('isHover', 'setIsHover', false), withPropsOnChange(['slice', 'theme', 'tooltipFormat'], function (_ref2) {
      var slice = _ref2.slice,
          theme = _ref2.theme,
          tooltipFormat = _ref2.tooltipFormat;

      var format = !tooltipFormat || isFunction(tooltipFormat) ? tooltipFormat : d3Format.format(tooltipFormat);

      return {
          tooltip: React.createElement(core.TableTooltip, {
              theme: theme,
              rows: slice.stack.map(function (p) {
                  return [React.createElement(core.Chip, { key: p.id, color: p.color }), p.id, format ? format(p.value) : p.value];
              })
          })
      };
  }), withHandlers({
      showTooltip: function showTooltip(_ref3) {
          var _showTooltip = _ref3.showTooltip,
              setIsHover = _ref3.setIsHover,
              tooltip = _ref3.tooltip;
          return function (e) {
              setIsHover(true);
              _showTooltip(tooltip, e);
          };
      },
      hideTooltip: function hideTooltip(_ref4) {
          var _hideTooltip = _ref4.hideTooltip,
              setIsHover = _ref4.setIsHover;
          return function () {
              setIsHover(false);
              _hideTooltip();
          };
      }
  }), pure);

  var StreamSlicesItem$1 = enhance(StreamSlicesItem);

  var StreamSlices = function StreamSlices(_ref) {
      var slices = _ref.slices,
          height = _ref.height,
          showTooltip = _ref.showTooltip,
          hideTooltip = _ref.hideTooltip,
          theme = _ref.theme,
          tooltipFormat = _ref.tooltipFormat;
      return React.createElement(
          'g',
          null,
          slices.map(function (slice) {
              return React.createElement(StreamSlicesItem$1, {
                  key: slice.index,
                  slice: slice,
                  height: height,
                  showTooltip: showTooltip,
                  hideTooltip: hideTooltip,
                  theme: theme,
                  tooltipFormat: tooltipFormat
              });
          })
      );
  };

  StreamSlices.propTypes = {
      slices: PropTypes.arrayOf(PropTypes.shape({
          index: PropTypes.number.isRequired,
          x: PropTypes.number.isRequired,
          stack: PropTypes.arrayOf(PropTypes.shape({
              id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
              value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
              color: PropTypes.string.isRequired
          })).isRequired
      })).isRequired,
      height: PropTypes.number.isRequired,
      showTooltip: PropTypes.func.isRequired,
      hideTooltip: PropTypes.func.isRequired,
      tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      theme: PropTypes.object.isRequired
  };

  var StreamSlices$1 = pure(StreamSlices);

  var StreamPropTypes = {
      // data
      data: PropTypes.arrayOf(PropTypes.object).isRequired,
      keys: PropTypes.array.isRequired,

      stack: PropTypes.func.isRequired,
      xScale: PropTypes.func.isRequired,
      yScale: PropTypes.func.isRequired,

      order: core.stackOrderPropType.isRequired,
      offsetType: core.stackOffsetPropType.isRequired,
      curve: core.areaCurvePropType.isRequired,
      areaGenerator: PropTypes.func.isRequired,

      // axes & grid
      axisTop: PropTypes.object,
      axisRight: PropTypes.object,
      axisBottom: PropTypes.object,
      axisLeft: PropTypes.object,
      enableGridX: PropTypes.bool.isRequired,
      enableGridY: PropTypes.bool.isRequired,

      // styling
      colors: PropTypes.any.isRequired,
      fillOpacity: PropTypes.number.isRequired,
      getColor: PropTypes.func.isRequired, // computed
      defs: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired
      })).isRequired,
      fill: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          match: PropTypes.oneOfType([PropTypes.oneOf(['*']), PropTypes.object, PropTypes.func]).isRequired
      })).isRequired,
      borderWidth: PropTypes.number.isRequired,
      borderColor: PropTypes.any.isRequired,
      getBorderColor: PropTypes.func.isRequired, // computed

      // interactivity
      isInteractive: PropTypes.bool,
      enableStackTooltip: PropTypes.bool.isRequired,
      tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

      legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired
  };

  var StreamDefaultProps = {
      order: 'none',
      offsetType: 'wiggle',
      curve: 'catmullRom',

      // axes & grid
      axisBottom: {},
      enableGridX: true,
      enableGridY: false,

      borderWidth: 0,
      borderColor: 'inherit:darker(1)',

      // styling
      colors: 'nivo',
      fillOpacity: 1,
      defs: [],
      fill: [],

      // interactivity
      isInteractive: true,

      // stack tooltip
      enableStackTooltip: true,

      legends: []
  };

  var stackMin = function stackMin(layers) {
      return min(layers.reduce(function (acc, layer) {
          return [].concat(acc, layer.map(function (d) {
              return d[0];
          }));
      }, []));
  };
  var stackMax = function stackMax(layers) {
      return max(layers.reduce(function (acc, layer) {
          return [].concat(acc, layer.map(function (d) {
              return d[1];
          }));
      }, []));
  };

  var enhance$1 = (function (Component) {
      return compose(defaultProps(StreamDefaultProps), core.withTheme(), core.withCurve(), core.withDimensions(), core.withMotion(), withPropsOnChange(['curveInterpolator'], function (_ref) {
          var curveInterpolator = _ref.curveInterpolator;
          return {
              areaGenerator: d3Shape.area().x(function (_ref2) {
                  var x = _ref2.x;
                  return x;
              }).y0(function (_ref3) {
                  var y1 = _ref3.y1;
                  return y1;
              }).y1(function (_ref4) {
                  var y2 = _ref4.y2;
                  return y2;
              }).curve(curveInterpolator)
          };
      }), withPropsOnChange(['colors'], function (_ref5) {
          var colors = _ref5.colors;
          return {
              getColor: core.getColorRange(colors)
          };
      }), withPropsOnChange(['borderColor'], function (_ref6) {
          var borderColor = _ref6.borderColor;
          return {
              getBorderColor: core.getInheritedColorGenerator(borderColor)
          };
      }), withPropsOnChange(['keys', 'offsetType', 'order'], function (_ref7) {
          var keys = _ref7.keys,
              offsetType = _ref7.offsetType,
              order = _ref7.order;
          return {
              stack: d3Shape.stack().keys(keys).offset(core.stackOffsetFromProp(offsetType)).order(core.stackOrderFromProp(order))
          };
      }), withPropsOnChange(['stack', 'data', 'width', 'height'], function (_ref8) {
          var stack = _ref8.stack,
              data = _ref8.data,
              width = _ref8.width,
              height = _ref8.height;

          var layers = stack(data);
          layers.forEach(function (layer) {
              layer.forEach(function (point) {
                  point.value = point.data[layer.key];
              });
          });

          var minValue = stackMin(layers);
          var maxValue = stackMax(layers);

          return {
              layers: layers,
              xScale: d3Scale.scalePoint().domain(range(data.length)).range([0, width]),
              yScale: d3Scale.scaleLinear().domain([minValue, maxValue]).range([height, 0])
          };
      }), pure)(Component);
  });

  var Stream = function Stream(_ref) {
      var data = _ref.data,
          keys = _ref.keys,
          xScale = _ref.xScale,
          yScale = _ref.yScale,
          layers = _ref.layers,
          areaGenerator = _ref.areaGenerator,
          margin = _ref.margin,
          width = _ref.width,
          height = _ref.height,
          outerWidth = _ref.outerWidth,
          outerHeight = _ref.outerHeight,
          axisTop = _ref.axisTop,
          axisRight = _ref.axisRight,
          axisBottom = _ref.axisBottom,
          axisLeft = _ref.axisLeft,
          enableGridX = _ref.enableGridX,
          enableGridY = _ref.enableGridY,
          theme = _ref.theme,
          getColor = _ref.getColor,
          fillOpacity = _ref.fillOpacity,
          borderWidth = _ref.borderWidth,
          getBorderColor = _ref.getBorderColor,
          defs = _ref.defs,
          fill = _ref.fill,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping,
          isInteractive = _ref.isInteractive,
          tooltipFormat = _ref.tooltipFormat,
          enableStackTooltip = _ref.enableStackTooltip,
          legends$$1 = _ref.legends;

      var enhancedLayers = layers.map(function (points, i) {
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
              id: keys[i],
              layer: layer,
              path: areaGenerator(layer),
              color: getColor(i)
          };
      });

      var slices = range(data.length).map(function (i) {
          return {
              index: i,
              x: enhancedLayers[0].layer[i].x,
              stack: sortBy(enhancedLayers.map(function (layer) {
                  return _extends({
                      id: layer.id,
                      color: layer.color
                  }, layer.layer[i]);
              }), 'y2')
          };
      });

      var motionProps = {
          animate: animate,
          motionDamping: motionDamping,
          motionStiffness: motionStiffness
      };

      var boundDefs = core.bindDefs(defs, enhancedLayers, fill);

      return React.createElement(
          core.Container,
          { isInteractive: isInteractive, theme: theme },
          function (_ref2) {
              var showTooltip = _ref2.showTooltip,
                  hideTooltip = _ref2.hideTooltip;
              return React.createElement(
                  core.SvgWrapper,
                  {
                      width: outerWidth,
                      height: outerHeight,
                      margin: margin,
                      defs: boundDefs,
                      theme: theme
                  },
                  React.createElement(core.Grid, _extends({
                      theme: theme,
                      width: width,
                      height: height,
                      xScale: enableGridX ? xScale : null,
                      yScale: enableGridY ? yScale : null
                  }, motionProps)),
                  React.createElement(StreamLayers, _extends({
                      layers: enhancedLayers,
                      fillOpacity: fillOpacity,
                      borderWidth: borderWidth,
                      getBorderColor: getBorderColor,
                      showTooltip: showTooltip,
                      hideTooltip: hideTooltip,
                      theme: theme
                  }, motionProps)),
                  React.createElement(core.Axes, _extends({
                      xScale: xScale,
                      yScale: yScale,
                      width: width,
                      height: height,
                      theme: theme,
                      top: axisTop,
                      right: axisRight,
                      bottom: axisBottom,
                      left: axisLeft
                  }, motionProps)),
                  isInteractive && enableStackTooltip && React.createElement(StreamSlices$1, {
                      slices: slices,
                      height: height,
                      showTooltip: showTooltip,
                      hideTooltip: hideTooltip,
                      theme: theme,
                      tooltipFormat: tooltipFormat
                  }),
                  legends$$1.map(function (legend, i) {
                      var legendData = enhancedLayers.map(function (l) {
                          return {
                              id: l.id,
                              label: l.id,
                              color: l.color,
                              fill: l.fill
                          };
                      }).reverse();

                      return React.createElement(legends.BoxLegendSvg, _extends({
                          key: i
                      }, legend, {
                          containerWidth: width,
                          containerHeight: height,
                          data: legendData,
                          theme: theme
                      }));
                  })
              );
          }
      );
  };

  Stream.propTypes = StreamPropTypes;

  var enhancedStream = enhance$1(Stream);
  enhancedStream.displayName = 'Stream';

  var ResponsiveStream = function ResponsiveStream(props) {
      return React.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React.createElement(enhancedStream, _extends({ width: width, height: height }, props));
          }
      );
  };

  exports.Stream = enhancedStream;
  exports.ResponsiveStream = ResponsiveStream;
  exports.StreamPropTypes = StreamPropTypes;
  exports.StreamDefaultProps = StreamDefaultProps;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
