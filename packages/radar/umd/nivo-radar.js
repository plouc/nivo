(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('recompose/compose'), require('recompose/withPropsOnChange'), require('recompose/pure'), require('prop-types'), require('@nivo/core'), require('d3-shape'), require('react-motion'), require('lodash/range'), require('lodash/isFunction'), require('lodash/sortBy'), require('d3-format'), require('recompose/withState'), require('recompose/withHandlers'), require('lodash/max'), require('recompose/defaultProps'), require('d3-scale'), require('@nivo/legends')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'recompose/compose', 'recompose/withPropsOnChange', 'recompose/pure', 'prop-types', '@nivo/core', 'd3-shape', 'react-motion', 'lodash/range', 'lodash/isFunction', 'lodash/sortBy', 'd3-format', 'recompose/withState', 'recompose/withHandlers', 'lodash/max', 'recompose/defaultProps', 'd3-scale', '@nivo/legends'], factory) :
  (factory((global.nivo = global.nivo || {}),global.React,global.RecomposeCompose,global.RecomposeWithPropsOnChange,global.RecomposePure,global.PropTypes,global.nivo,global.d3,global.ReactMotion,global['lodash/range'],global['lodash/isFunction'],global['lodash/sortBy'],global.d3,global.RecomposeWithState,global.RecomposeWithHandlers,global['lodash/max'],global.RecomposeDefaultProps,global.d3,global.nivo));
}(this, (function (exports,React,compose,withPropsOnChange,pure,PropTypes,core,d3Shape,reactMotion,range,isFunction,sortBy,d3Format,withState,withHandlers,max,defaultProps,d3Scale,legends) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
  withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
  pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  range = range && range.hasOwnProperty('default') ? range['default'] : range;
  isFunction = isFunction && isFunction.hasOwnProperty('default') ? isFunction['default'] : isFunction;
  sortBy = sortBy && sortBy.hasOwnProperty('default') ? sortBy['default'] : sortBy;
  withState = withState && withState.hasOwnProperty('default') ? withState['default'] : withState;
  withHandlers = withHandlers && withHandlers.hasOwnProperty('default') ? withHandlers['default'] : withHandlers;
  max = max && max.hasOwnProperty('default') ? max['default'] : max;
  defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var RadarShapes = function RadarShapes(_ref) {
      var data = _ref.data,
          keys = _ref.keys,
          colorByKey = _ref.colorByKey,
          lineGenerator = _ref.lineGenerator,
          borderWidth = _ref.borderWidth,
          borderColor = _ref.borderColor,
          fillOpacity = _ref.fillOpacity,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping;

      if (animate !== true) {
          return React__default.createElement(
              'g',
              null,
              keys.map(function (key) {
                  return React__default.createElement('path', {
                      key: key,
                      d: lineGenerator(data.map(function (d) {
                          return d[key];
                      })),
                      fill: colorByKey[key],
                      fillOpacity: fillOpacity,
                      stroke: borderColor({ key: key, color: colorByKey[key] }),
                      strokeWidth: borderWidth
                  });
              })
          );
      }

      var springConfig = {
          stiffness: motionStiffness,
          damping: motionDamping
      };

      return React__default.createElement(
          'g',
          null,
          keys.map(function (key) {
              return React__default.createElement(
                  core.SmartMotion,
                  {
                      key: key,
                      style: function style(spring) {
                          return {
                              d: spring(lineGenerator(data.map(function (d) {
                                  return d[key];
                              })), springConfig),
                              fill: spring(colorByKey[key], springConfig),
                              stroke: spring(borderColor({ key: key, color: colorByKey[key] }), springConfig)
                          };
                      }
                  },
                  function (style) {
                      return React__default.createElement('path', _extends({ fillOpacity: fillOpacity, strokeWidth: borderWidth }, style));
                  }
              );
          })
      );
  };

  RadarShapes.propTypes = _extends({
      // data
      data: PropTypes.arrayOf(PropTypes.object).isRequired,
      keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
      colorByKey: PropTypes.object.isRequired,

      radiusScale: PropTypes.func.isRequired,
      angleStep: PropTypes.number.isRequired,

      curveInterpolator: PropTypes.func.isRequired,
      lineGenerator: PropTypes.func.isRequired,

      // border
      borderWidth: PropTypes.number.isRequired,
      borderColor: PropTypes.func.isRequired,

      // theming
      fillOpacity: PropTypes.number.isRequired

  }, core.motionPropTypes);

  var enhance = compose(withPropsOnChange(['borderColor'], function (props) {
      return {
          borderColor: core.getInheritedColorGenerator(props.borderColor)
      };
  }), withPropsOnChange(['radiusScale', 'angleStep', 'curveInterpolator'], function (_ref2) {
      var radiusScale = _ref2.radiusScale,
          angleStep = _ref2.angleStep,
          curveInterpolator = _ref2.curveInterpolator;
      return {
          lineGenerator: d3Shape.lineRadial().radius(function (d) {
              return radiusScale(d);
          }).angle(function (d, i) {
              return i * angleStep;
          }).curve(curveInterpolator)
      };
  }), pure);

  var RadarShapes$1 = enhance(RadarShapes);

  var textAnchorFromAngle = function textAnchorFromAngle(_angle) {
      var angle = core.radiansToDegrees(_angle) + 90;
      if (angle <= 10 || angle >= 350 || angle >= 170 && angle <= 190) return 'middle';
      if (angle > 180) return 'end';
      return 'start';
  };

  var renderLabel = function renderLabel(label, theme, labelComponent) {
      var labelNode = void 0;
      if (labelComponent === undefined) {
          labelNode = React__default.createElement(
              'text',
              { style: theme.axis.ticks.text, dy: '0.5em', textAnchor: label.anchor },
              label.id
          );
      } else {
          labelNode = React__default.createElement(labelComponent, label);
      }

      return React__default.createElement(
          'g',
          { key: label.id, transform: 'translate(' + label.x + ', ' + label.y + ')' },
          labelNode
      );
  };

  var RadarGridLabels = function RadarGridLabels(_ref) {
      var radius = _ref.radius,
          angles = _ref.angles,
          indices = _ref.indices,
          labelComponent = _ref.label,
          labelOffset = _ref.labelOffset,
          theme = _ref.theme,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping;

      var springConfig = {
          motionDamping: motionDamping,
          motionStiffness: motionStiffness
      };

      var labels = indices.map(function (index, i) {
          var position = core.positionFromAngle(angles[i], radius + labelOffset);
          var textAnchor = textAnchorFromAngle(angles[i]);

          return _extends({
              id: index,
              angle: core.radiansToDegrees(angles[i]),
              anchor: textAnchor
          }, position);
      });

      if (animate !== true) {
          return React__default.createElement(
              'g',
              null,
              labels.map(function (label) {
                  return renderLabel(label, theme, labelComponent);
              })
          );
      }

      return React__default.createElement(
          reactMotion.TransitionMotion,
          {
              styles: labels.map(function (label) {
                  return {
                      key: label.id,
                      data: label,
                      style: {
                          x: reactMotion.spring(label.x, springConfig),
                          y: reactMotion.spring(label.y, springConfig)
                      }
                  };
              })
          },
          function (interpolatedStyles) {
              return React__default.createElement(
                  'g',
                  null,
                  interpolatedStyles.map(function (_ref2) {
                      var data = _ref2.data;
                      return renderLabel(data, theme, labelComponent);
                  })
              );
          }
      );
  };

  RadarGridLabels.propTypes = _extends({
      radius: PropTypes.number.isRequired,
      angles: PropTypes.arrayOf(PropTypes.number).isRequired,
      indices: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
      label: PropTypes.func,
      labelOffset: PropTypes.number.isRequired,
      theme: PropTypes.object.isRequired
  }, core.motionPropTypes);

  var RadialGridLabels = pure(RadarGridLabels);

  var levelWillEnter = function levelWillEnter() {
      return { r: 0 };
  };

  var RadarGridLevels = function RadarGridLevels(_ref) {
      var shape = _ref.shape,
          radii = _ref.radii,
          angleStep = _ref.angleStep,
          dataLength = _ref.dataLength,
          theme = _ref.theme,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping;

      var springConfig = {
          motionDamping: motionDamping,
          motionStiffness: motionStiffness
      };

      var levelsTransitionProps = {
          willEnter: levelWillEnter,
          willLeave: function willLeave() {
              return { r: reactMotion.spring(0, springConfig) };
          },
          styles: radii.map(function (r, i) {
              return {
                  key: 'level.' + i,
                  style: {
                      r: reactMotion.spring(r, springConfig)
                  }
              };
          })
      };

      if (shape === 'circular') {
          if (animate !== true) {
              return React__default.createElement(
                  'g',
                  null,
                  radii.map(function (r, i) {
                      return React__default.createElement('circle', _extends({ key: 'level.' + i, fill: 'none', r: r }, theme.grid.line));
                  })
              );
          }

          return React__default.createElement(
              reactMotion.TransitionMotion,
              levelsTransitionProps,
              function (interpolatedStyles) {
                  return React__default.createElement(
                      'g',
                      null,
                      interpolatedStyles.map(function (_ref2) {
                          var key = _ref2.key,
                              style = _ref2.style;
                          return React__default.createElement('circle', _extends({ key: key, fill: 'none', r: style.r }, theme.grid.line));
                      })
                  );
              }
          );
      }

      var radarLineGenerator = d3Shape.lineRadial().angle(function (i) {
          return i * angleStep;
      }).curve(d3Shape.curveLinearClosed);

      var points = range(dataLength);

      if (animate !== true) {
          return React__default.createElement(
              'g',
              null,
              radii.map(function (radius, i) {
                  return React__default.createElement('path', _extends({
                      key: 'level.' + i,
                      fill: 'none',
                      d: radarLineGenerator.radius(radius)(points)
                  }, theme.grid));
              })
          );
      }

      return React__default.createElement(
          reactMotion.TransitionMotion,
          levelsTransitionProps,
          function (interpolatedStyles) {
              return React__default.createElement(
                  'g',
                  null,
                  interpolatedStyles.map(function (_ref3) {
                      var key = _ref3.key,
                          style = _ref3.style;
                      return React__default.createElement('path', _extends({
                          key: key,
                          fill: 'none',
                          d: radarLineGenerator.radius(style.r)(points)
                      }, theme.grid));
                  })
              );
          }
      );
  };

  RadarGridLevels.propTypes = _extends({
      shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
      radii: PropTypes.arrayOf(PropTypes.number).isRequired,
      angleStep: PropTypes.number.isRequired,
      dataLength: PropTypes.number.isRequired,

      theme: PropTypes.object.isRequired

  }, core.motionPropTypes);

  var RadarGridLevels$1 = pure(RadarGridLevels);

  var RadarGrid = function RadarGrid(_ref) {
      var indices = _ref.indices,
          shape = _ref.shape,
          radius = _ref.radius,
          radii = _ref.radii,
          angles = _ref.angles,
          angleStep = _ref.angleStep,
          label = _ref.label,
          labelOffset = _ref.labelOffset,
          theme = _ref.theme,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping;

      var motionProps = {
          animate: animate,
          motionDamping: motionDamping,
          motionStiffness: motionStiffness
      };

      return React__default.createElement(
          'g',
          null,
          angles.map(function (angle, i) {
              var position = core.positionFromAngle(angle, radius);
              return React__default.createElement('line', _extends({
                  key: 'axis.' + i,
                  x1: 0,
                  y1: 0,
                  x2: position.x,
                  y2: position.y
              }, theme.grid));
          }),
          React__default.createElement(RadarGridLevels$1, _extends({
              shape: shape,
              radii: radii,
              angleStep: angleStep,
              dataLength: indices.length,
              theme: theme
          }, motionProps)),
          React__default.createElement(RadialGridLabels, _extends({
              radius: radius,
              angles: angles,
              indices: indices,
              labelOffset: labelOffset,
              theme: theme,
              label: label
          }, motionProps))
      );
  };

  RadarGrid.propTypes = _extends({
      indices: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
      shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
      radius: PropTypes.number.isRequired,
      angleStep: PropTypes.number.isRequired,
      label: PropTypes.func,
      labelOffset: PropTypes.number.isRequired,
      theme: PropTypes.object.isRequired
  }, core.motionPropTypes);

  var enhance$1 = compose(withPropsOnChange(['indices', 'levels', 'radius', 'angleStep'], function (props) {
      return {
          radii: range(props.levels).map(function (i) {
              return props.radius / props.levels * (i + 1);
          }).reverse(),
          angles: range(props.indices.length).map(function (i) {
              return i * props.angleStep - Math.PI / 2;
          })
      };
  }), pure);

  var RadarGrid$1 = enhance$1(RadarGrid);

  var RadarTooltipItem = function RadarTooltipItem(_ref) {
      var path = _ref.path,
          tipX = _ref.tipX,
          tipY = _ref.tipY,
          showTooltip = _ref.showTooltip,
          hideTooltip = _ref.hideTooltip,
          isHover = _ref.isHover;
      return React__default.createElement(
          'g',
          null,
          React__default.createElement('line', { x1: 0, y1: 0, x2: tipX, y2: tipY, stroke: '#000', strokeOpacity: isHover ? 0.35 : 0 }),
          React__default.createElement('path', {
              d: path,
              fill: '#F00',
              fillOpacity: 0,
              onMouseEnter: showTooltip,
              onMouseMove: showTooltip,
              onMouseLeave: hideTooltip
          })
      );
  };

  RadarTooltipItem.propTypes = {
      datum: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
      keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
      index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      colorByKey: PropTypes.object.isRequired,

      startAngle: PropTypes.number.isRequired,
      endAngle: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      tipX: PropTypes.number.isRequired, // computed
      tipY: PropTypes.number.isRequired, // computed

      arcGenerator: PropTypes.func.isRequired, // computed
      path: PropTypes.string.isRequired, // computed

      theme: PropTypes.object.isRequired,

      showTooltip: PropTypes.func.isRequired, // re-computed
      hideTooltip: PropTypes.func.isRequired, // re-computed

      isHover: PropTypes.bool.isRequired // computed
  };

  var enhance$2 = compose(withState('isHover', 'setIsHover', false), withPropsOnChange(['datum', 'keys', 'index', 'colorByKey', 'theme', 'tooltipFormat'], function (_ref2) {
      var datum = _ref2.datum,
          keys = _ref2.keys,
          index = _ref2.index,
          colorByKey = _ref2.colorByKey,
          theme = _ref2.theme,
          tooltipFormat = _ref2.tooltipFormat;

      var format = !tooltipFormat || isFunction(tooltipFormat) ? tooltipFormat : d3Format.format(tooltipFormat);

      return {
          tooltip: React__default.createElement(core.TableTooltip, {
              title: React__default.createElement(
                  'strong',
                  null,
                  index
              ),
              rows: sortBy(keys.map(function (key) {
                  return [React__default.createElement(core.Chip, { key: key, color: colorByKey[key] }), key, format ? format(datum[key]) : datum[key]];
              }), '2').reverse(),
              theme: theme
          })
      };
  }), withPropsOnChange(['startAngle', 'endAngle', 'radius', 'arcGenerator'], function (_ref3) {
      var startAngle = _ref3.startAngle,
          endAngle = _ref3.endAngle,
          radius = _ref3.radius,
          arcGenerator = _ref3.arcGenerator;

      var position = core.positionFromAngle(startAngle + (endAngle - startAngle) * 0.5 - Math.PI / 2, radius);

      return {
          path: arcGenerator({ startAngle: startAngle, endAngle: endAngle }),
          tipX: position.x,
          tipY: position.y
      };
  }), withHandlers({
      showTooltip: function showTooltip(_ref4) {
          var _showTooltip = _ref4.showTooltip,
              setIsHover = _ref4.setIsHover,
              tooltip = _ref4.tooltip;
          return function (e) {
              setIsHover(true);
              _showTooltip(tooltip, e);
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

  var RadarTooltipItem$1 = enhance$2(RadarTooltipItem);

  var RadarTooltip = function RadarTooltip(_ref) {
      var data = _ref.data,
          keys = _ref.keys,
          getIndex = _ref.getIndex,
          colorByKey = _ref.colorByKey,
          radius = _ref.radius,
          angleStep = _ref.angleStep,
          theme = _ref.theme,
          tooltipFormat = _ref.tooltipFormat,
          showTooltip = _ref.showTooltip,
          hideTooltip = _ref.hideTooltip;

      var arc = d3Shape.arc().outerRadius(radius).innerRadius(0);

      var halfAngleStep = angleStep * 0.5;
      var rootStartAngle = -halfAngleStep;

      return React__default.createElement(
          'g',
          null,
          data.map(function (d) {
              var index = getIndex(d);
              var startAngle = rootStartAngle;
              var endAngle = startAngle + angleStep;

              rootStartAngle += angleStep;

              return React__default.createElement(RadarTooltipItem$1, {
                  key: index,
                  datum: d,
                  keys: keys,
                  index: index,
                  colorByKey: colorByKey,
                  startAngle: startAngle,
                  endAngle: endAngle,
                  radius: radius,
                  arcGenerator: arc,
                  theme: theme,
                  tooltipFormat: tooltipFormat,
                  showTooltip: showTooltip,
                  hideTooltip: hideTooltip
              });
          })
      );
  };

  RadarTooltip.propTypes = {
      data: PropTypes.array.isRequired,
      keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
      getIndex: PropTypes.func.isRequired,
      colorByKey: PropTypes.object.isRequired,

      radius: PropTypes.number.isRequired,
      angleStep: PropTypes.number.isRequired,

      theme: PropTypes.object.isRequired,

      showTooltip: PropTypes.func.isRequired,
      hideTooltip: PropTypes.func.isRequired,
      tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  };

  var RadarTooltip$1 = pure(RadarTooltip);

  var RadarDots = function (_Component) {
      inherits(RadarDots, _Component);

      function RadarDots() {
          classCallCheck(this, RadarDots);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      RadarDots.prototype.render = function render() {
          var _props = this.props,
              data = _props.data,
              keys = _props.keys,
              getIndex = _props.getIndex,
              colorByKey = _props.colorByKey,
              radiusScale = _props.radiusScale,
              angleStep = _props.angleStep,
              symbol = _props.symbol,
              size = _props.size,
              color = _props.color,
              borderWidth = _props.borderWidth,
              borderColor = _props.borderColor,
              enableLabel = _props.enableLabel,
              label = _props.label,
              labelFormat = _props.labelFormat,
              labelYOffset = _props.labelYOffset,
              theme = _props.theme,
              animate = _props.animate,
              motionStiffness = _props.motionStiffness,
              motionDamping = _props.motionDamping;


          var fillColor = core.getInheritedColorGenerator(color);
          var strokeColor = core.getInheritedColorGenerator(borderColor);
          var getLabel = core.getLabelGenerator(label, labelFormat);

          var points = data.reduce(function (acc, datum, i) {
              var index = getIndex(datum);
              keys.forEach(function (key) {
                  var pointData = {
                      index: index,
                      key: key,
                      value: datum[key],
                      color: colorByKey[key]
                  };
                  acc.push({
                      key: key + '.' + index,
                      label: enableLabel ? getLabel(pointData) : null,
                      style: _extends({
                          fill: fillColor(pointData),
                          stroke: strokeColor(pointData)
                      }, core.positionFromAngle(angleStep * i - Math.PI / 2, radiusScale(datum[key]))),
                      data: pointData
                  });
              });

              return acc;
          }, []);

          if (animate !== true) {
              return React__default.createElement(
                  'g',
                  null,
                  points.map(function (point) {
                      return React__default.createElement(core.DotsItem, {
                          key: point.key,
                          x: point.style.x,
                          y: point.style.y,
                          symbol: symbol,
                          size: size,
                          color: point.style.fill,
                          borderWidth: borderWidth,
                          borderColor: point.style.stroke,
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

          return React__default.createElement(
              reactMotion.TransitionMotion,
              {
                  styles: points.map(function (point) {
                      return {
                          key: point.key,
                          data: point,
                          style: {
                              x: reactMotion.spring(point.style.x, springConfig),
                              y: reactMotion.spring(point.style.y, springConfig),
                              size: reactMotion.spring(size, springConfig)
                          }
                      };
                  })
              },
              function (interpolatedStyles) {
                  return React__default.createElement(
                      'g',
                      null,
                      interpolatedStyles.map(function (_ref) {
                          var key = _ref.key,
                              style = _ref.style,
                              point = _ref.data;
                          return React__default.createElement(core.DotsItem, _extends({
                              key: key
                          }, style, {
                              symbol: symbol,
                              color: point.style.fill,
                              borderWidth: borderWidth,
                              borderColor: point.style.stroke,
                              label: point.label,
                              labelYOffset: labelYOffset,
                              theme: theme
                          }));
                      })
                  );
              }
          );
      };

      return RadarDots;
  }(React.Component);

  RadarDots.propTypes = _extends({
      data: PropTypes.arrayOf(PropTypes.object).isRequired,
      keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
      getIndex: PropTypes.func.isRequired,

      colorByKey: PropTypes.object.isRequired,

      radiusScale: PropTypes.func.isRequired,
      angleStep: PropTypes.number.isRequired,

      symbol: PropTypes.func,
      size: PropTypes.number.isRequired,
      color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      borderWidth: PropTypes.number.isRequired,
      borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

      enableLabel: PropTypes.bool.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      labelFormat: PropTypes.string,
      labelYOffset: PropTypes.number,

      theme: PropTypes.shape({
          dots: core.dotsThemePropType.isRequired
      }).isRequired

  }, core.motionPropTypes);
  RadarDots.defaultProps = {
      size: 6,
      color: 'inherit',
      borderWidth: 0,
      borderColor: 'inherit',
      enableLabel: false,
      label: 'value'
  };

  var Radar = function Radar(_ref) {
      var data = _ref.data,
          keys = _ref.keys,
          getIndex = _ref.getIndex,
          indices = _ref.indices,
          curveInterpolator = _ref.curveInterpolator,
          radius = _ref.radius,
          radiusScale = _ref.radiusScale,
          angleStep = _ref.angleStep,
          centerX = _ref.centerX,
          centerY = _ref.centerY,
          margin = _ref.margin,
          width = _ref.width,
          height = _ref.height,
          outerWidth = _ref.outerWidth,
          outerHeight = _ref.outerHeight,
          borderWidth = _ref.borderWidth,
          borderColor = _ref.borderColor,
          gridLevels = _ref.gridLevels,
          gridShape = _ref.gridShape,
          gridLabel = _ref.gridLabel,
          gridLabelOffset = _ref.gridLabelOffset,
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
          theme = _ref.theme,
          fillOpacity = _ref.fillOpacity,
          colorByKey = _ref.colorByKey,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping,
          isInteractive = _ref.isInteractive,
          tooltipFormat = _ref.tooltipFormat,
          legends$$1 = _ref.legends;

      var motionProps = {
          animate: animate,
          motionDamping: motionDamping,
          motionStiffness: motionStiffness
      };

      var legendData = keys.map(function (key) {
          return {
              id: key,
              label: key,
              color: colorByKey[key]
          };
      });

      return React__default.createElement(
          core.Container,
          { isInteractive: isInteractive, theme: theme },
          function (_ref2) {
              var showTooltip = _ref2.showTooltip,
                  hideTooltip = _ref2.hideTooltip;
              return React__default.createElement(
                  core.SvgWrapper,
                  { width: outerWidth, height: outerHeight, margin: margin, theme: theme },
                  React__default.createElement(
                      'g',
                      { transform: 'translate(' + centerX + ', ' + centerY + ')' },
                      React__default.createElement(RadarGrid$1, _extends({
                          levels: gridLevels,
                          shape: gridShape,
                          radius: radius,
                          angleStep: angleStep,
                          theme: theme,
                          indices: indices,
                          label: gridLabel,
                          labelOffset: gridLabelOffset
                      }, motionProps)),
                      React__default.createElement(RadarShapes$1, _extends({
                          data: data,
                          keys: keys,
                          colorByKey: colorByKey,
                          radiusScale: radiusScale,
                          angleStep: angleStep,
                          curveInterpolator: curveInterpolator,
                          borderWidth: borderWidth,
                          borderColor: borderColor,
                          fillOpacity: fillOpacity
                      }, motionProps)),
                      isInteractive && React__default.createElement(RadarTooltip$1, {
                          data: data,
                          keys: keys,
                          getIndex: getIndex,
                          colorByKey: colorByKey,
                          radius: radius,
                          angleStep: angleStep,
                          theme: theme,
                          tooltipFormat: tooltipFormat,
                          showTooltip: showTooltip,
                          hideTooltip: hideTooltip
                      }),
                      enableDots && React__default.createElement(RadarDots, _extends({
                          data: data,
                          keys: keys,
                          getIndex: getIndex,
                          radiusScale: radiusScale,
                          angleStep: angleStep,
                          symbol: dotSymbol,
                          size: dotSize,
                          colorByKey: colorByKey,
                          color: dotColor,
                          borderWidth: dotBorderWidth,
                          borderColor: dotBorderColor,
                          enableLabel: enableDotLabel,
                          label: dotLabel,
                          labelFormat: dotLabelFormat,
                          labelYOffset: dotLabelYOffset,
                          theme: theme
                      }, motionProps))
                  ),
                  legends$$1.map(function (legend, i) {
                      return React__default.createElement(legends.BoxLegendSvg, _extends({
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

  Radar.propTypes = {
      // data
      data: PropTypes.arrayOf(PropTypes.object).isRequired,
      keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
      indexBy: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]).isRequired,
      maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
      getIndex: PropTypes.func.isRequired, // computed
      indices: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired, // computed

      centerX: PropTypes.number.isRequired, // computed
      centerY: PropTypes.number.isRequired, // computed

      radius: PropTypes.number.isRequired, // computed
      radiusScale: PropTypes.func.isRequired, // computed
      angleStep: PropTypes.number.isRequired, // computed

      curve: core.closedCurvePropType.isRequired,
      curveInterpolator: PropTypes.func.isRequired, // computed

      // border
      borderWidth: PropTypes.number.isRequired,
      borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

      // grid
      gridLevels: PropTypes.number,
      gridShape: PropTypes.oneOf(['circular', 'linear']),
      gridLabel: PropTypes.func,
      gridLabelOffset: PropTypes.number,

      // dots
      enableDots: PropTypes.bool.isRequired,
      dotSymbol: PropTypes.func,
      dotSize: PropTypes.number,
      dotColor: PropTypes.any,
      dotBorderWidth: PropTypes.number,
      dotBorderColor: PropTypes.any,
      enableDotLabel: PropTypes.bool,
      dotLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      dotLabelFormat: PropTypes.string,
      dotLabelYOffset: PropTypes.number,

      // theming
      getColor: PropTypes.func.isRequired, // computed
      colorByKey: PropTypes.object.isRequired, // computed
      fillOpacity: PropTypes.number.isRequired,

      // interactivity
      isInteractive: PropTypes.bool.isRequired,
      tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

      legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired
  };

  var RadarDefaultProps = {
      maxValue: 'auto',

      curve: 'linearClosed',

      // border
      borderWidth: 2,
      borderColor: 'inherit',

      // grid
      gridLevels: 5,
      gridShape: 'circular',
      gridLabelOffset: 16,

      // dots
      enableDots: true,

      // theming
      fillOpacity: 0.15,

      // interactivity
      isInteractive: true,

      legends: []
  };

  var enhance$3 = compose(defaultProps(RadarDefaultProps), core.withTheme(), core.withColors({
      defaultColorBy: 'key'
  }), core.withCurve(), core.withDimensions(), core.withMotion(), withPropsOnChange(['indexBy'], function (_ref3) {
      var indexBy = _ref3.indexBy;
      return {
          getIndex: core.getAccessorFor(indexBy)
      };
  }), withPropsOnChange(['data', 'getIndex'], function (_ref4) {
      var data = _ref4.data,
          getIndex = _ref4.getIndex;
      return {
          indices: data.map(getIndex)
      };
  }), withPropsOnChange(['keys', 'getColor'], function (_ref5) {
      var keys = _ref5.keys,
          getColor = _ref5.getColor;
      return {
          colorByKey: keys.reduce(function (mapping, key, index) {
              mapping[key] = getColor({ key: key, index: index });
              return mapping;
          }, {})
      };
  }), withPropsOnChange(['keys', 'indexBy', 'data', 'maxValue', 'width', 'height'], function (_ref6) {
      var data = _ref6.data,
          keys = _ref6.keys,
          _maxValue = _ref6.maxValue,
          width = _ref6.width,
          height = _ref6.height;

      var maxValue = _maxValue !== 'auto' ? _maxValue : max(data.reduce(function (acc, d) {
          return [].concat(acc, keys.map(function (key) {
              return d[key];
          }));
      }, []));

      var radius = Math.min(width, height) / 2;
      var radiusScale = d3Scale.scaleLinear().range([0, radius]).domain([0, maxValue]);

      return {
          data: data,
          radius: radius,
          radiusScale: radiusScale,
          centerX: width / 2,
          centerY: height / 2,
          angleStep: Math.PI * 2 / data.length
      };
  }), pure);

  var enhancedRadar = enhance$3(Radar);
  enhancedRadar.displayName = 'Radar';

  var ResponsiveRadar = function ResponsiveRadar(props) {
      return React__default.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React__default.createElement(enhancedRadar, _extends({ width: width, height: height }, props));
          }
      );
  };

  exports.Radar = enhancedRadar;
  exports.ResponsiveRadar = ResponsiveRadar;
  exports.RadarDots = RadarDots;
  exports.RadarDefaultProps = RadarDefaultProps;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
