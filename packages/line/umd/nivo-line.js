(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('recompose/pure'), require('@nivo/core'), require('lodash/isFunction'), require('d3-format'), require('recompose/compose'), require('recompose/withState'), require('recompose/withHandlers'), require('recompose/withPropsOnChange'), require('react-motion'), require('@nivo/scales'), require('@nivo/legends'), require('d3-shape'), require('recompose/defaultProps')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'recompose/pure', '@nivo/core', 'lodash/isFunction', 'd3-format', 'recompose/compose', 'recompose/withState', 'recompose/withHandlers', 'recompose/withPropsOnChange', 'react-motion', '@nivo/scales', '@nivo/legends', 'd3-shape', 'recompose/defaultProps'], factory) :
  (factory((global.nivo = global.nivo || {}),global.React,global.PropTypes,global.RecomposePure,global.nivo,global['lodash/isFunction'],global.d3,global.RecomposeCompose,global.RecomposeWithState,global.RecomposeWithHandlers,global.RecomposeWithPropsOnChange,global.ReactMotion,global.nivo,global.nivo,global.d3,global.RecomposeDefaultProps));
}(this, (function (exports,React,PropTypes,pure,core,isFunction,d3Format,compose,withState,withHandlers,withPropsOnChange,reactMotion,scales,legends,d3Shape,defaultProps) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
  isFunction = isFunction && isFunction.hasOwnProperty('default') ? isFunction['default'] : isFunction;
  compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
  withState = withState && withState.hasOwnProperty('default') ? withState['default'] : withState;
  withHandlers = withHandlers && withHandlers.hasOwnProperty('default') ? withHandlers['default'] : withHandlers;
  withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
  defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;

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

  var LineAreas = function LineAreas(_ref) {
      var areaGenerator = _ref.areaGenerator,
          areaOpacity = _ref.areaOpacity,
          lines = _ref.lines,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping;

      if (animate !== true) {
          return React.createElement(
              'g',
              null,
              lines.slice(0).reverse().map(function (_ref2) {
                  var id = _ref2.id,
                      data = _ref2.data,
                      areaColor = _ref2.color;
                  return React.createElement('path', {
                      key: id,
                      d: areaGenerator(data.map(function (d) {
                          return d.position;
                      })),
                      fill: areaColor,
                      fillOpacity: areaOpacity,
                      strokeWidth: 0
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
          lines.slice(0).reverse().map(function (_ref3) {
              var id = _ref3.id,
                  data = _ref3.data,
                  areaColor = _ref3.color;
              return React.createElement(
                  core.SmartMotion,
                  {
                      key: id,
                      style: function style(spring) {
                          return {
                              d: spring(areaGenerator(data.map(function (d) {
                                  return d.position;
                              })), springConfig),
                              fill: spring(areaColor, springConfig)
                          };
                      }
                  },
                  function (style) {
                      return React.createElement('path', {
                          key: id,
                          d: style.d,
                          fill: areaColor,
                          fillOpacity: areaOpacity,
                          strokeWidth: 0
                      });
                  }
              );
          })
      );
  };

  LineAreas.propTypes = _extends({
      areaOpacity: PropTypes.number.isRequired
  }, core.motionPropTypes);

  var LineAreas$1 = pure(LineAreas);

  var LineLine = function LineLine(_ref) {
      var lineGenerator = _ref.lineGenerator,
          id = _ref.id,
          points = _ref.points,
          color = _ref.color,
          thickness = _ref.thickness,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping;

      if (animate !== true) {
          return React.createElement('path', {
              key: id,
              d: lineGenerator(points),
              fill: 'none',
              strokeWidth: thickness,
              stroke: color
          });
      }

      var springConfig = {
          stiffness: motionStiffness,
          damping: motionDamping
      };

      return React.createElement(
          core.SmartMotion,
          {
              key: id,
              style: function style(spring) {
                  return {
                      d: spring(lineGenerator(points), springConfig),
                      stroke: spring(color, springConfig)
                  };
              }
          },
          function (style) {
              return React.createElement('path', {
                  key: id,
                  d: style.d,
                  fill: 'none',
                  strokeWidth: thickness,
                  stroke: style.stroke
              });
          }
      );
  };

  LineLine.propTypes = _extends({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      points: PropTypes.arrayOf(PropTypes.shape({
          x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          y: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })),
      lineGenerator: PropTypes.func.isRequired,
      color: PropTypes.string.isRequired,
      thickness: PropTypes.number.isRequired
  }, core.motionPropTypes);

  var Line = pure(LineLine);

  var LineLines = function LineLines(_ref) {
      var lines = _ref.lines,
          lineGenerator = _ref.lineGenerator,
          lineWidth = _ref.lineWidth,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping;
      return React.createElement(
          'g',
          null,
          lines.map(function (_ref2) {
              var id = _ref2.id,
                  data = _ref2.data,
                  color = _ref2.color;

              return React.createElement(Line, {
                  key: id,
                  id: id,
                  points: data.map(function (d) {
                      return d.position;
                  }),
                  lineGenerator: lineGenerator,
                  color: color,
                  thickness: lineWidth,
                  animate: animate,
                  motionStiffness: motionStiffness,
                  motionDamping: motionDamping
              });
          })
      );
  };

  LineLines.propTypes = _extends({
      lines: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          color: PropTypes.string.isRequired,
          data: PropTypes.arrayOf(PropTypes.shape({
              data: PropTypes.shape({
                  x: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
                  y: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
              }).isRequired,
              position: PropTypes.shape({
                  x: PropTypes.number,
                  y: PropTypes.number
              }).isRequired
          })).isRequired
      })).isRequired,
      lineWidth: PropTypes.number.isRequired,
      lineGenerator: PropTypes.func.isRequired
  }, core.motionPropTypes);

  var LineLines$1 = pure(LineLines);

  var Chip = function Chip(_ref) {
      var color = _ref.color;
      return React.createElement('span', { style: { display: 'block', width: '12px', height: '12px', background: color } });
  };

  Chip.propTypes = {
      color: PropTypes.string.isRequired
  };

  var LineSlicesItem = function LineSlicesItem(_ref2) {
      var slice = _ref2.slice,
          height = _ref2.height,
          showTooltip = _ref2.showTooltip,
          hideTooltip = _ref2.hideTooltip,
          isHover = _ref2.isHover;
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
              fill: '#F00',
              fillOpacity: 0,
              onMouseEnter: showTooltip,
              onMouseMove: showTooltip,
              onMouseLeave: hideTooltip
          })
      );
  };

  LineSlicesItem.propTypes = {
      slice: PropTypes.object.isRequired,
      height: PropTypes.number.isRequired,
      showTooltip: PropTypes.func.isRequired,
      hideTooltip: PropTypes.func.isRequired,
      isHover: PropTypes.bool.isRequired,
      theme: PropTypes.object.isRequired,
      tooltip: PropTypes.func,
      tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  };

  var enhance = compose(withState('isHover', 'setIsHover', false), withPropsOnChange(['slice', 'theme', 'tooltip', 'tooltipFormat'], function (_ref3) {
      var slice = _ref3.slice,
          theme = _ref3.theme,
          tooltip = _ref3.tooltip,
          tooltipFormat = _ref3.tooltipFormat;

      var format = !tooltipFormat || isFunction(tooltipFormat) ? tooltipFormat : d3Format.format(tooltipFormat);
      var hasValues = slice.data.some(function (d) {
          return d.position.x !== null && d.position.y !== null;
      });

      return {
          tooltipElement: hasValues ? React.createElement(core.TableTooltip, {
              theme: theme,
              rows: slice.data.filter(function (d) {
                  return d.position.x !== null && d.position.y !== null;
              }).map(function (d) {
                  return [React.createElement(Chip, { key: d.id, color: d.serie.color }), d.serie.id, format ? format(d.data.y) : d.data.y];
              }),
              format: format,
              renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _extends({}, slice)) : null
          }) : null
      };
  }), withHandlers({
      showTooltip: function showTooltip(_ref4) {
          var _showTooltip = _ref4.showTooltip,
              setIsHover = _ref4.setIsHover,
              tooltipElement = _ref4.tooltipElement;
          return function (e) {
              setIsHover(true);
              _showTooltip(tooltipElement, e);
          };
      },
      hideTooltip: function hideTooltip(_ref5) {
          var _hideTooltip = _ref5.hideTooltip,
              setIsHover = _ref5.setIsHover;
          return function () {
              setIsHover(false);
              _hideTooltip();
          };
      }
  }), pure);

  var LineSlicesItem$1 = enhance(LineSlicesItem);

  var LineSlices = function LineSlices(_ref) {
      var slices = _ref.slices,
          height = _ref.height,
          showTooltip = _ref.showTooltip,
          hideTooltip = _ref.hideTooltip,
          theme = _ref.theme,
          tooltip = _ref.tooltip,
          tooltipFormat = _ref.tooltipFormat;
      return React.createElement(
          'g',
          null,
          slices.map(function (slice) {
              return React.createElement(LineSlicesItem$1, {
                  key: slice.id,
                  slice: slice,
                  height: height,
                  showTooltip: showTooltip,
                  hideTooltip: hideTooltip,
                  theme: theme,
                  tooltipFormat: tooltipFormat,
                  tooltip: tooltip
              });
          })
      );
  };

  LineSlices.propTypes = {
      slices: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
          x: PropTypes.number.isRequired,
          data: PropTypes.arrayOf(PropTypes.shape({
              data: PropTypes.shape({
                  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
                  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
              }),
              position: PropTypes.shape({
                  x: PropTypes.number,
                  y: PropTypes.number
              }).isRequired,
              serie: PropTypes.shape({
                  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                  color: PropTypes.string.isRequired
              }).isRequired
          })).isRequired
      })).isRequired,
      height: PropTypes.number.isRequired,
      showTooltip: PropTypes.func.isRequired,
      hideTooltip: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      tooltip: PropTypes.func,
      tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  };

  var LineSlices$1 = pure(LineSlices);

  var LineDots = function LineDots(_ref) {
      var lines = _ref.lines,
          symbol = _ref.symbol,
          size = _ref.size,
          color = _ref.color,
          borderWidth = _ref.borderWidth,
          borderColor = _ref.borderColor,
          enableLabel = _ref.enableLabel,
          label = _ref.label,
          labelFormat = _ref.labelFormat,
          labelYOffset = _ref.labelYOffset,
          theme = _ref.theme,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping;

      var getLabel = core.getLabelGenerator(label, labelFormat);

      var points = lines.reduce(function (acc, line) {
          var id = line.id,
              data = line.data;


          return [].concat(acc, data.filter(function (datum) {
              return datum.position.x !== null && datum.position.y !== null;
          }).map(function (datum) {
              return {
                  key: id + '.' + datum.data.x,
                  x: datum.position.x,
                  y: datum.position.y,
                  fill: color(line),
                  stroke: borderColor(line),
                  label: enableLabel ? getLabel(datum.data) : null
              };
          }));
      }, []);

      if (animate !== true) {
          return React.createElement(
              'g',
              null,
              points.map(function (point) {
                  return React.createElement(core.DotsItem, {
                      key: point.key,
                      x: point.x,
                      y: point.y,
                      symbol: symbol,
                      size: size,
                      color: point.fill,
                      borderWidth: borderWidth,
                      borderColor: point.stroke,
                      label: point.label,
                      labelYOffset: labelYOffset,
                      theme: theme
                  });
              })
          );
      }
      var springConfig = {
          motionDamping: motionDamping,
          motionStiffness: motionStiffness
      };

      return React.createElement(
          reactMotion.TransitionMotion,
          {
              styles: points.map(function (point) {
                  return {
                      key: point.key,
                      data: point,
                      style: {
                          x: reactMotion.spring(point.x, springConfig),
                          y: reactMotion.spring(point.y, springConfig),
                          size: reactMotion.spring(size, springConfig)
                      }
                  };
              })
          },
          function (interpolatedStyles) {
              return React.createElement(
                  'g',
                  null,
                  interpolatedStyles.map(function (_ref2) {
                      var key = _ref2.key,
                          style = _ref2.style,
                          point = _ref2.data;
                      return React.createElement(core.DotsItem, _extends({
                          key: key
                      }, style, {
                          symbol: symbol,
                          color: point.fill,
                          borderWidth: borderWidth,
                          borderColor: point.stroke,
                          label: point.label,
                          labelYOffset: labelYOffset,
                          theme: theme
                      }));
                  })
              );
          }
      );
  };

  LineDots.propTypes = _extends({
      lines: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired
      })),

      symbol: PropTypes.func,
      size: PropTypes.number.isRequired,
      color: PropTypes.func.isRequired,
      borderWidth: PropTypes.number.isRequired,
      borderColor: PropTypes.func.isRequired,

      enableLabel: PropTypes.bool.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      labelYOffset: PropTypes.number,

      theme: PropTypes.shape({
          dots: core.dotsThemePropType.isRequired
      }).isRequired

  }, core.motionPropTypes);

  LineDots.defaultProps = {
      // labels
      enableLabel: false,
      label: 'y'
  };

  var LinePropTypes = {
      data: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          data: PropTypes.arrayOf(PropTypes.shape({
              x: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
              y: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
          })).isRequired
      })).isRequired,

      xScale: scales.scalePropType.isRequired,
      yScale: scales.scalePropType.isRequired,

      computedData: PropTypes.object.isRequired,

      curve: core.lineCurvePropType.isRequired,
      areaGenerator: PropTypes.func.isRequired,
      lineGenerator: PropTypes.func.isRequired,

      // axes & grid
      axisTop: PropTypes.object,
      axisRight: PropTypes.object,
      axisBottom: PropTypes.object,
      axisLeft: PropTypes.object,
      enableGridX: PropTypes.bool.isRequired,
      enableGridY: PropTypes.bool.isRequired,
      gridXValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      gridYValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),

      // dots
      enableDots: PropTypes.bool.isRequired,
      dotSymbol: PropTypes.func,
      dotSize: PropTypes.number.isRequired,
      dotColor: PropTypes.any.isRequired,
      dotBorderWidth: PropTypes.number.isRequired,
      dotBorderColor: PropTypes.any.isRequired,
      enableDotLabel: PropTypes.bool.isRequired,

      // markers
      markers: PropTypes.arrayOf(PropTypes.shape({
          axis: PropTypes.oneOf(['x', 'y']).isRequired,
          value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
          style: PropTypes.object
      })),

      // styling
      getColor: PropTypes.func.isRequired,
      enableArea: PropTypes.bool.isRequired,
      areaOpacity: PropTypes.number.isRequired,
      areaBaselineValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      lineWidth: PropTypes.number.isRequired,
      defs: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired
      })).isRequired,

      // interactivity
      isInteractive: PropTypes.bool.isRequired,
      enableStackTooltip: PropTypes.bool.isRequired,
      tooltip: PropTypes.func,
      tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

      legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired
  };

  var LineDefaultProps = {
      stacked: false,
      curve: 'linear',

      xScale: {
          type: 'point'
      },
      yScale: {
          type: 'linear',
          min: 0,
          max: 'auto'
      },

      // axes & grid
      axisBottom: {},
      axisLeft: {},
      enableGridX: true,
      enableGridY: true,

      // dots
      enableDots: true,
      dotSize: 6,
      dotColor: 'inherit',
      dotBorderWidth: 0,
      dotBorderColor: 'inherit',
      enableDotLabel: false,

      // styling
      colors: 'nivo',
      colorBy: 'id',
      enableArea: false,
      areaBaselineValue: 0,
      areaOpacity: 0.2,
      lineWidth: 2,
      defs: [],

      // interactivity
      isInteractive: true,
      enableStackTooltip: true,

      legends: []
  };

  var Line$1 = function Line(_ref) {
      var computedData = _ref.computedData,
          lineGenerator = _ref.lineGenerator,
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
          gridXValues = _ref.gridXValues,
          gridYValues = _ref.gridYValues,
          lineWidth = _ref.lineWidth,
          enableArea = _ref.enableArea,
          areaOpacity = _ref.areaOpacity,
          enableDots = _ref.enableDots,
          dotSymbol = _ref.dotSymbol,
          dotSize = _ref.dotSize,
          dotColor = _ref.dotColor,
          dotBorderWidth = _ref.dotBorderWidth,
          dotBorderColor = _ref.dotBorderColor,
          enableDotLabel = _ref.enableDotLabel,
          dotLabel = _ref.dotLabel,
          dotLabelFormat = _ref.dotLabelFormat,
          dotLabelYOffset = _ref.dotLabelYOffset,
          markers = _ref.markers,
          theme = _ref.theme,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping,
          isInteractive = _ref.isInteractive,
          tooltipFormat = _ref.tooltipFormat,
          tooltip = _ref.tooltip,
          enableStackTooltip = _ref.enableStackTooltip,
          legends$$1 = _ref.legends;

      var motionProps = {
          animate: animate,
          motionDamping: motionDamping,
          motionStiffness: motionStiffness
      };

      return React.createElement(
          core.Container,
          { isInteractive: isInteractive, theme: theme },
          function (_ref2) {
              var showTooltip = _ref2.showTooltip,
                  hideTooltip = _ref2.hideTooltip;
              return React.createElement(
                  core.SvgWrapper,
                  { width: outerWidth, height: outerHeight, margin: margin, theme: theme },
                  React.createElement(core.Grid, _extends({
                      theme: theme,
                      width: width,
                      height: height,
                      xScale: enableGridX ? computedData.xScale : null,
                      yScale: enableGridY ? computedData.yScale : null,
                      xValues: gridXValues,
                      yValues: gridYValues
                  }, motionProps)),
                  React.createElement(core.CartesianMarkers, {
                      markers: markers,
                      width: width,
                      height: height,
                      xScale: computedData.xScale,
                      yScale: computedData.yScale,
                      theme: theme
                  }),
                  React.createElement(core.Axes, _extends({
                      xScale: computedData.xScale,
                      yScale: computedData.yScale,
                      width: width,
                      height: height,
                      theme: theme,
                      top: axisTop,
                      right: axisRight,
                      bottom: axisBottom,
                      left: axisLeft
                  }, motionProps)),
                  enableArea && React.createElement(LineAreas$1, _extends({
                      areaGenerator: areaGenerator,
                      areaOpacity: areaOpacity,
                      lines: computedData.series
                  }, motionProps)),
                  React.createElement(LineLines$1, _extends({
                      lines: computedData.series,
                      lineGenerator: lineGenerator,
                      lineWidth: lineWidth
                  }, motionProps)),
                  isInteractive && enableStackTooltip && React.createElement(LineSlices$1, {
                      slices: computedData.slices,
                      height: height,
                      showTooltip: showTooltip,
                      hideTooltip: hideTooltip,
                      theme: theme,
                      tooltipFormat: tooltipFormat,
                      tooltip: tooltip
                  }),
                  enableDots && React.createElement(LineDots, _extends({
                      lines: computedData.series,
                      symbol: dotSymbol,
                      size: dotSize,
                      color: core.getInheritedColorGenerator(dotColor),
                      borderWidth: dotBorderWidth,
                      borderColor: core.getInheritedColorGenerator(dotBorderColor),
                      enableLabel: enableDotLabel,
                      label: dotLabel,
                      labelFormat: dotLabelFormat,
                      labelYOffset: dotLabelYOffset,
                      theme: theme
                  }, motionProps)),
                  legends$$1.map(function (legend, i) {
                      var legendData = computedData.series.map(function (line) {
                          return {
                              id: line.id,
                              label: line.id,
                              color: line.color
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

  Line$1.propTypes = LinePropTypes;

  var enhance$1 = compose(defaultProps(LineDefaultProps), core.withTheme(), core.withColors(), core.withDimensions(), core.withMotion(), withPropsOnChange(['curve'], function (_ref3) {
      var curve = _ref3.curve;
      return {
          lineGenerator: d3Shape.line().defined(function (d) {
              return d.x !== null && d.y !== null;
          }).x(function (d) {
              return d.x;
          }).y(function (d) {
              return d.y;
          }).curve(core.curveFromProp(curve))
      };
  }), withPropsOnChange(['data', 'xScale', 'yScale', 'width', 'height'], function (_ref4) {
      var data = _ref4.data,
          xScale = _ref4.xScale,
          yScale = _ref4.yScale,
          width = _ref4.width,
          height = _ref4.height;
      return {
          computedData: scales.computeXYScalesForSeries(data, xScale, yScale, width, height)
      };
  }), withPropsOnChange(['getColor', 'computedData'], function (_ref5) {
      var getColor = _ref5.getColor,
          _computedData = _ref5.computedData;

      var computedData = _extends({}, _computedData, {
          series: _computedData.series.map(function (serie) {
              return _extends({}, serie, {
                  color: getColor(serie)
              });
          })
      });

      computedData.slices = scales.computeYSlices(computedData);

      return { computedData: computedData };
  }), withPropsOnChange(['curve', 'computedData', 'areaBaselineValue'], function (_ref6) {
      var curve = _ref6.curve,
          computedData = _ref6.computedData,
          areaBaselineValue = _ref6.areaBaselineValue;
      return {
          areaGenerator: d3Shape.area().defined(function (d) {
              return d.x !== null && d.y !== null;
          }).x(function (d) {
              return d.x;
          }).y1(function (d) {
              return d.y;
          }).curve(core.curveFromProp(curve)).y0(computedData.yScale(areaBaselineValue))
      };
  }), pure);

  var enhancedLine = enhance$1(Line$1);
  enhancedLine.displayName = 'Line';

  var ResponsiveLine = function ResponsiveLine(props) {
      return React.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React.createElement(enhancedLine, _extends({ width: width, height: height }, props));
          }
      );
  };

  exports.Line = enhancedLine;
  exports.ResponsiveLine = ResponsiveLine;
  exports.LinePropTypes = LinePropTypes;
  exports.LineDefaultProps = LineDefaultProps;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
