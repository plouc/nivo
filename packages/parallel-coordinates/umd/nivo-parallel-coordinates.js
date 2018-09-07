(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prop-types'), require('@nivo/core'), require('recompose/withPropsOnChange'), require('d3-shape'), require('d3-scale'), require('react'), require('react-motion'), require('recompose/compose'), require('recompose/defaultProps'), require('recompose/pure'), require('recompose/setDisplayName'), require('@nivo/axes')) :
  typeof define === 'function' && define.amd ? define(['exports', 'prop-types', '@nivo/core', 'recompose/withPropsOnChange', 'd3-shape', 'd3-scale', 'react', 'react-motion', 'recompose/compose', 'recompose/defaultProps', 'recompose/pure', 'recompose/setDisplayName', '@nivo/axes'], factory) :
  (factory((global.nivo = global.nivo || {}),global.PropTypes,global.nivo,global.RecomposeWithPropsOnChange,global.d3,global.d3,global.React,global.ReactMotion,global.RecomposeCompose,global.RecomposeDefaultProps,global.RecomposePure,global.RecomposeSetDisplayName,global.nivo));
}(this, (function (exports,PropTypes,core,withPropsOnChange,d3Shape,d3Scale,React,reactMotion,compose,defaultProps,pure,setDisplayName,axes) { 'use strict';

  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
  var React__default = 'default' in React ? React['default'] : React;
  compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
  defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
  pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
  setDisplayName = setDisplayName && setDisplayName.hasOwnProperty('default') ? setDisplayName['default'] : setDisplayName;

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

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var commonVariablePropTypes = {
      key: PropTypes.string.isRequired,
      enableDensity: PropTypes.bool,
      densityType: PropTypes.oneOf(['circles', 'poly'])
  };

  var commonPropTypes = {
      data: PropTypes.arrayOf(PropTypes.object).isRequired,
      variables: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape(_extends({}, commonVariablePropTypes, {
          key: PropTypes.string.isRequired,
          type: PropTypes.oneOf(['point']).isRequired,
          values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
      })), PropTypes.shape(_extends({}, commonVariablePropTypes, {
          type: PropTypes.oneOf(['linear']).isRequired,
          min: PropTypes.number,
          max: PropTypes.number
      }))])).isRequired,
      layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
      curve: core.lineCurvePropType.isRequired,
      lineGenerator: PropTypes.func.isRequired,
      strokeWidth: PropTypes.number.isRequired,
      lineOpacity: PropTypes.number.isRequired,
      axesPlan: PropTypes.oneOf(['foreground', 'background']).isRequired,
      axesTicksPosition: PropTypes.oneOf(['before', 'after']).isRequired,
      theme: core.themePropType.isRequired
  };

  var commonDefaultProps = {
      layout: 'horizontal',
      curve: 'linear',
      colors: 'yellow_orange_red',
      colorBy: 'index',
      strokeWidth: 2,
      lineOpacity: 0.35,
      axesPlan: 'foreground',
      axesTicksPosition: 'after'
  };

  var commonEnhancers = [core.withDimensions(), core.withColors({
      defaultColors: commonDefaultProps.colors,
      defaultColorBy: commonDefaultProps.colorBy,
      destKey: 'getLineColor'
  }), core.withTheme(), withPropsOnChange(['curve'], function (_ref) {
      var curve = _ref.curve;
      return {
          lineGenerator: d3Shape.line().x(function (d) {
              return d.x;
          }).y(function (d) {
              return d.y;
          }).curve(core.curveFromProp(curve))
      };
  })];

  var computeParallelCoordinatesVariableKernels = function computeParallelCoordinatesVariableKernels(variable, data) {
      if (variable.type === 'point') {
          var kernels = data.reduce(function (acc, datum) {
              var value = datum[variable.key];
              var kernel = acc.find(function (k) {
                  return k.id === value;
              });
              if (kernel === undefined) {
                  kernel = { id: value, count: 0 };
                  acc.push(kernel);
              }
              kernel.count++;

              return acc;
          }, []);
          kernels = variable.scale.domain().map(function (d) {
              return kernels.find(function (k) {
                  return k.id === d;
              });
          });

          var scale = d3Scale.scaleLinear().rangeRound([0, 60]).domain([0, Math.max.apply(Math, kernels.map(function (k) {
              return k.count;
          }))]);

          return kernels.map(function (k) {
              return {
                  id: k.id,
                  position: variable.scale(k.id),
                  size: scale(k.count)
              };
          });
      }
  };

  var computeParallelCoordinatesLayout = function computeParallelCoordinatesLayout(_ref) {
      var width = _ref.width,
          height = _ref.height,
          data = _ref.data,
          variables = _ref.variables,
          layout = _ref.layout;

      var variablesScale = d3Scale.scalePoint().range(layout === 'horizontal' ? [0, width] : [height, 0]).domain(variables.map(function (_ref2) {
          var key = _ref2.key;
          return key;
      }));

      var range = layout === 'horizontal' ? [height, 0] : [0, width];
      var variablesWithScale = variables.map(function (variable) {
          var allValues = new Set();
          data.forEach(function (d) {
              return allValues.add(d[variable.key]);
          });

          var scale = void 0;
          if (variable.type === 'linear') {
              scale = d3Scale.scaleLinear().rangeRound(range).domain([Math.min.apply(Math, Array.from(allValues)), Math.max.apply(Math, Array.from(allValues))]);
          }

          if (variable.type === 'point') {
              scale = d3Scale.scalePoint().range(range).domain(variable.values || allValues);
          }

          var enhancedVariable = _extends({}, variable, {
              scale: scale,
              values: Array.from(allValues)
          });

          if (variable.enableDensity === true) {
              enhancedVariable.densityBins = computeParallelCoordinatesVariableKernels(enhancedVariable, data);
          }

          return enhancedVariable;
      });

      var dataWithPoints = data.map(function (datum, index) {
          var points = variablesWithScale.map(function (variable) {
              return {
                  x: layout === 'horizontal' ? variablesScale(variable.key) : variable.scale(datum[variable.key]),
                  y: layout === 'horizontal' ? variable.scale(datum[variable.key]) : variablesScale(variable.key)
              };
          });

          return _extends({ index: index }, datum, { points: points });
      });

      return {
          variablesScale: variablesScale,
          variablesWithScale: variablesWithScale,
          dataWithPoints: dataWithPoints
      };
  };

  var ParallelCoordinatesLayout = function (_PureComponent) {
      inherits(ParallelCoordinatesLayout, _PureComponent);

      function ParallelCoordinatesLayout() {
          classCallCheck(this, ParallelCoordinatesLayout);
          return possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
      }

      ParallelCoordinatesLayout.prototype.render = function render() {
          var _props = this.props,
              width = _props.width,
              height = _props.height,
              data = _props.data,
              variables = _props.variables,
              layout = _props.layout,
              children = _props.children;


          return children(computeParallelCoordinatesLayout({
              width: width,
              height: height,
              data: data,
              variables: variables,
              layout: layout
          }));
      };

      return ParallelCoordinatesLayout;
  }(React.PureComponent);

  ParallelCoordinatesLayout.propTypes = {
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])).isRequired,
      variables: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
          key: PropTypes.string.isRequired,
          type: PropTypes.oneOf(['point']).isRequired,
          values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
      }), PropTypes.shape({
          key: PropTypes.string.isRequired,
          type: PropTypes.oneOf(['linear']).isRequired,
          min: PropTypes.number,
          max: PropTypes.number
      })])).isRequired,
      layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
      children: PropTypes.func.isRequired
  };

  var ParallelCoordinatesLineTooltip = function (_PureComponent) {
      inherits(ParallelCoordinatesLineTooltip, _PureComponent);

      function ParallelCoordinatesLineTooltip() {
          classCallCheck(this, ParallelCoordinatesLineTooltip);
          return possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
      }

      ParallelCoordinatesLineTooltip.prototype.render = function render() {
          var _props = this.props,
              data = _props.data,
              variables = _props.variables,
              theme = _props.theme;


          return React__default.createElement(core.TableTooltip, {
              theme: theme,
              rows: variables.map(function (variable) {
                  return [variable.key, React__default.createElement(
                      'strong',
                      null,
                      data[variable.key]
                  )];
              } // eslint-disable-line react/jsx-key
              )
          });
      };

      return ParallelCoordinatesLineTooltip;
  }(React.PureComponent);

  ParallelCoordinatesLineTooltip.propTypes = {
      data: PropTypes.object.isRequired,
      variables: PropTypes.arrayOf(PropTypes.shape({
          key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      })).isRequired,
      theme: core.themePropType.isRequired
  };

  var ParallelCoordinatesLine = function (_PureComponent) {
      inherits(ParallelCoordinatesLine, _PureComponent);

      function ParallelCoordinatesLine() {
          var _temp, _this, _ret;

          classCallCheck(this, ParallelCoordinatesLine);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleActiveMouse = function (event) {
              var _this$props = _this.props,
                  showTooltip = _this$props.showTooltip,
                  data = _this$props.data,
                  variables = _this$props.variables,
                  theme = _this$props.theme;

              showTooltip(React__default.createElement(ParallelCoordinatesLineTooltip, { data: data, variables: variables, theme: theme }), event);
          }, _this.handleMouseLeave = function () {
              _this.props.hideTooltip();
          }, _temp), possibleConstructorReturn(_this, _ret);
      }

      ParallelCoordinatesLine.prototype.render = function render() {
          var _this2 = this;

          var _props = this.props,
              lineGenerator = _props.lineGenerator,
              points = _props.points,
              strokeWidth = _props.strokeWidth,
              color = _props.color,
              opacity = _props.opacity,
              animate = _props.animate,
              motionStiffness = _props.motionStiffness,
              motionDamping = _props.motionDamping;


          var pathDefinition = lineGenerator(points);

          if (animate !== true) {
              return React__default.createElement('path', {
                  d: pathDefinition,
                  stroke: color,
                  strokeWidth: strokeWidth,
                  strokeLinecap: 'round',
                  opacity: opacity,
                  fill: 'none',
                  onMouseEnter: this.handleActiveMouse,
                  onMouseMove: this.handleActiveMouse,
                  onMouseLeave: this.handleMouseLeave
              });
          }

          var springConfig = {
              stiffness: motionStiffness,
              damping: motionDamping
          };

          return React__default.createElement(
              core.SmartMotion,
              {
                  style: function style(spring) {
                      return {
                          d: spring(pathDefinition, springConfig),
                          opacity: spring(opacity, springConfig)
                      };
                  }
              },
              function (style) {
                  return React__default.createElement('path', {
                      d: style.d,
                      stroke: color,
                      strokeWidth: strokeWidth,
                      strokeLinecap: 'round',
                      opacity: style.opacity,
                      fill: 'none',
                      onMouseEnter: _this2.handleActiveMouse,
                      onMouseMove: _this2.handleActiveMouse,
                      onMouseLeave: _this2.handleMouseLeave
                  });
              }
          );
      };

      return ParallelCoordinatesLine;
  }(React.PureComponent);

  ParallelCoordinatesLine.propTypes = _extends({
      data: PropTypes.object.isRequired,
      variables: PropTypes.arrayOf(PropTypes.shape({
          key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      })).isRequired,
      lineGenerator: PropTypes.func.isRequired,
      points: PropTypes.arrayOf(PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
      })).isRequired,
      strokeWidth: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      opacity: PropTypes.number.isRequired,
      showTooltip: PropTypes.func.isRequired,
      hideTooltip: PropTypes.func.isRequired,
      theme: core.themePropType.isRequired
  }, core.motionPropTypes);

  var ParallelCoordinatesAxisDensityCircles = function (_PureComponent) {
      inherits(ParallelCoordinatesAxisDensityCircles, _PureComponent);

      function ParallelCoordinatesAxisDensityCircles() {
          classCallCheck(this, ParallelCoordinatesAxisDensityCircles);
          return possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
      }

      ParallelCoordinatesAxisDensityCircles.prototype.render = function render() {
          var _props = this.props,
              axis = _props.axis,
              variable = _props.variable,
              variablesScale = _props.variablesScale,
              animate = _props.animate,
              motionStiffness = _props.motionStiffness,
              motionDamping = _props.motionDamping;


          var otherPosition = variablesScale(variable.key);

          if (animate !== true) {
              return React__default.createElement(
                  'g',
                  null,
                  variable.densityBins.map(function (bin) {
                      return React__default.createElement('circle', {
                          key: bin.id,
                          r: bin.size / 2,
                          cx: axis === 'y' ? otherPosition : bin.position,
                          cy: axis === 'y' ? bin.position : otherPosition,
                          fill: 'rgba(255,0,0,.1)'
                      });
                  })
              );
          }

          var springConfig = {
              stiffness: motionStiffness,
              damping: motionDamping
          };

          return React__default.createElement(
              reactMotion.TransitionMotion,
              {
                  styles: variable.densityBins.map(function (bin) {
                      return {
                          key: '' + bin.id,
                          data: bin,
                          style: {
                              r: reactMotion.spring(bin.size / 2, springConfig),
                              cx: reactMotion.spring(axis === 'y' ? otherPosition : bin.position, springConfig),
                              cy: reactMotion.spring(axis === 'y' ? bin.position : otherPosition, springConfig)
                          }
                      };
                  })
              },
              function (interpolatedStyles) {
                  return React__default.createElement(
                      React.Fragment,
                      null,
                      interpolatedStyles.map(function (_ref) {
                          var style = _ref.style,
                              bin = _ref.data;
                          return React__default.createElement('circle', _extends({
                              key: bin.id
                          }, style, {
                              r: Math.max(style.r, 0),
                              fill: 'rgba(255,0,0,.1)'
                          }));
                      })
                  );
              }
          );
      };

      return ParallelCoordinatesAxisDensityCircles;
  }(React.PureComponent);

  ParallelCoordinatesAxisDensityCircles.propTypes = _extends({
      axis: PropTypes.oneOf(['x', 'y']).isRequired,
      variable: PropTypes.shape({
          key: PropTypes.string.isRequired,
          densityBins: PropTypes.arrayOf(PropTypes.shape({
              id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
              size: PropTypes.number.isRequired
          })).isRequired
      }).isRequired,
      variablesScale: PropTypes.func.isRequired
  }, core.motionPropTypes);

  var lineGenerator = d3Shape.line().x(function (d) {
      return d.x;
  }).y(function (d) {
      return d.y;
  }).curve(core.curveFromProp('catmullRomClosed'));

  var ParallelCoordinatesAxisDensityPoly = function (_PureComponent) {
      inherits(ParallelCoordinatesAxisDensityPoly, _PureComponent);

      function ParallelCoordinatesAxisDensityPoly() {
          classCallCheck(this, ParallelCoordinatesAxisDensityPoly);
          return possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
      }

      ParallelCoordinatesAxisDensityPoly.prototype.render = function render() {
          var _props = this.props,
              axis = _props.axis,
              variable = _props.variable,
              variablesScale = _props.variablesScale,
              animate = _props.animate,
              motionStiffness = _props.motionStiffness,
              motionDamping = _props.motionDamping;


          var otherPosition = variablesScale(variable.key);

          var axisValue = function axisValue(x, y) {
              return axis === 'x' ? x : y;
          };

          var lastIndex = variable.densityBins.length - 1;
          var points = variable.densityBins.reduce(function (acc, bin, index) {
              if (index === 0) {
                  acc.push({
                      x: axisValue(bin.position - bin.size * 0.5, otherPosition),
                      y: axisValue(otherPosition, bin.position + bin.size * 0.5)
                  });
              }
              acc.push({
                  x: axisValue(bin.position, otherPosition + bin.size * 0.5),
                  y: axisValue(otherPosition + bin.size * 0.5, bin.position)
              });
              if (index === lastIndex) {
                  acc.push({
                      x: axisValue(bin.position + bin.size * 0.5, otherPosition),
                      y: axisValue(otherPosition, bin.position - bin.size * 0.5)
                  });
              }

              return acc;
          }, []);

          var reversed = [].concat(variable.densityBins).reverse();
          reversed.forEach(function (bin) {
              points.push({
                  x: axisValue(bin.position, otherPosition - bin.size * 0.5),
                  y: axisValue(otherPosition - bin.size * 0.5, bin.position)
              });
          });

          if (animate !== true) {
              return React__default.createElement('path', {
                  d: lineGenerator(points),
                  fill: 'rgba(0,0,0,.06)',
                  stroke: 'rgba(0,0,0,.3)',
                  strokeWidth: 1
              });
          }

          var springConfig = {
              stiffness: motionStiffness,
              damping: motionDamping
          };

          return React__default.createElement(
              core.SmartMotion,
              {
                  style: function style(spring) {
                      return {
                          d: spring(lineGenerator(points), springConfig)
                      };
                  }
              },
              function (style) {
                  return React__default.createElement('path', {
                      d: style.d,
                      fill: 'rgba(0,0,0,.06)',
                      stroke: 'rgba(0,0,0,.3)',
                      strokeWidth: 1
                  });
              }
          );
      };

      return ParallelCoordinatesAxisDensityPoly;
  }(React.PureComponent);

  ParallelCoordinatesAxisDensityPoly.propTypes = _extends({
      axis: PropTypes.oneOf(['x', 'y']).isRequired,
      variable: PropTypes.shape({
          key: PropTypes.string.isRequired,
          densityBins: PropTypes.arrayOf(PropTypes.shape({
              id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
              size: PropTypes.number.isRequired
          })).isRequired
      }).isRequired,
      variablesScale: PropTypes.func.isRequired
  }, core.motionPropTypes);

  var ParallelCoordinatesAxisDensity = function (_PureComponent) {
      inherits(ParallelCoordinatesAxisDensity, _PureComponent);

      function ParallelCoordinatesAxisDensity() {
          classCallCheck(this, ParallelCoordinatesAxisDensity);
          return possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
      }

      ParallelCoordinatesAxisDensity.prototype.render = function render() {
          var _props = this.props,
              type = _props.type,
              forwardProps = objectWithoutProperties(_props, ['type']);


          return React__default.createElement(
              React.Fragment,
              null,
              React__default.createElement(ParallelCoordinatesAxisDensityCircles, forwardProps),
              React__default.createElement(ParallelCoordinatesAxisDensityPoly, forwardProps)
          );

          if (type === 'poly') {
              return React__default.createElement(ParallelCoordinatesAxisDensityPoly, forwardProps);
          }

          return React__default.createElement(ParallelCoordinatesAxisDensityCircles, forwardProps);
      };

      return ParallelCoordinatesAxisDensity;
  }(React.PureComponent);

  ParallelCoordinatesAxisDensity.propTypes = _extends({
      type: PropTypes.oneOf(['circles', 'poly']).isRequired,
      axis: PropTypes.oneOf(['x', 'y']).isRequired,
      variable: PropTypes.shape({
          key: PropTypes.string.isRequired,
          densityBins: PropTypes.arrayOf(PropTypes.shape({
              id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
              size: PropTypes.number.isRequired
          })).isRequired
      }).isRequired,
      variablesScale: PropTypes.func.isRequired
  }, core.motionPropTypes);
  ParallelCoordinatesAxisDensity.defaultProps = {
      type: 'circles'
  };

  var ParallelCoordinates = function (_Component) {
      inherits(ParallelCoordinates, _Component);

      function ParallelCoordinates() {
          classCallCheck(this, ParallelCoordinates);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      ParallelCoordinates.prototype.render = function render() {
          var _props = this.props,
              data = _props.data,
              variables = _props.variables,
              layout = _props.layout,
              margin = _props.margin,
              width = _props.width,
              height = _props.height,
              outerWidth = _props.outerWidth,
              outerHeight = _props.outerHeight,
              axesPlan = _props.axesPlan,
              axesTicksPosition = _props.axesTicksPosition,
              lineGenerator = _props.lineGenerator,
              strokeWidth = _props.strokeWidth,
              lineOpacity = _props.lineOpacity,
              getLineColor = _props.getLineColor,
              theme = _props.theme,
              animate = _props.animate,
              motionStiffness = _props.motionStiffness,
              motionDamping = _props.motionDamping,
              isInteractive = _props.isInteractive;


          var motionProps = {
              animate: animate,
              motionStiffness: motionStiffness,
              motionDamping: motionDamping
          };

          return React__default.createElement(
              ParallelCoordinatesLayout,
              {
                  width: width,
                  height: height,
                  data: data,
                  variables: variables,
                  layout: layout
              },
              function (_ref) {
                  var variablesScale = _ref.variablesScale,
                      variablesWithScale = _ref.variablesWithScale,
                      dataWithPoints = _ref.dataWithPoints;

                  var axes$$1 = variablesWithScale.map(function (variable) {
                      return React__default.createElement(axes.Axis, _extends({
                          key: variable.key,
                          axis: layout === 'horizontal' ? 'y' : 'x',
                          length: layout === 'horizontal' ? height : width,
                          x: layout === 'horizontal' ? variablesScale(variable.key) : 0,
                          y: layout === 'horizontal' ? 0 : variablesScale(variable.key),
                          scale: variable.scale,
                          ticksPosition: axesTicksPosition,
                          theme: theme
                      }, motionProps));
                  });

                  var densities = variablesWithScale.filter(function (v) {
                      return v.enableDensity === true;
                  }).map(function (variable) {
                      return React__default.createElement(ParallelCoordinatesAxisDensity, _extends({
                          key: variable.key,
                          type: variable.densityType,
                          axis: layout === 'horizontal' ? 'y' : 'x',
                          variable: variable,
                          variablesScale: variablesScale
                      }, motionProps));
                  });

                  return React__default.createElement(
                      core.Container,
                      { isInteractive: isInteractive, theme: theme },
                      function (_ref2) {
                          var showTooltip = _ref2.showTooltip,
                              hideTooltip = _ref2.hideTooltip;
                          return React__default.createElement(
                              core.SvgWrapper,
                              {
                                  width: outerWidth,
                                  height: outerHeight,
                                  margin: margin,
                                  theme: theme
                              },
                              densities,
                              axesPlan === 'background' && axes$$1,
                              dataWithPoints.map(function (datum) {
                                  return React__default.createElement(ParallelCoordinatesLine, _extends({
                                      key: datum.index,
                                      data: datum,
                                      variables: variables,
                                      lineGenerator: lineGenerator,
                                      points: datum.points,
                                      strokeWidth: strokeWidth,
                                      opacity: lineOpacity,
                                      color: getLineColor(datum),
                                      theme: theme,
                                      showTooltip: showTooltip,
                                      hideTooltip: hideTooltip
                                  }, motionProps));
                              }),
                              axesPlan === 'foreground' && axes$$1
                          );
                      }
                  );
              }
          );
      };

      return ParallelCoordinates;
  }(React.Component);

  ParallelCoordinates.propTypes = commonPropTypes;
  var enhance = compose.apply(undefined, [defaultProps(commonDefaultProps)].concat(commonEnhancers, [core.withMotion(), pure]));

  var ParallelCoordinates$1 = setDisplayName('ParallelCoordinates')(enhance(ParallelCoordinates));

  var ResponsiveParallelCoordinates = function ResponsiveParallelCoordinates(props) {
      return React__default.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React__default.createElement(ParallelCoordinates$1, _extends({ width: width, height: height }, props));
          }
      );
  };

  var ParallelCoordinatesCanvas = function (_Component) {
      inherits(ParallelCoordinatesCanvas, _Component);

      function ParallelCoordinatesCanvas() {
          classCallCheck(this, ParallelCoordinatesCanvas);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      ParallelCoordinatesCanvas.prototype.componentDidMount = function componentDidMount() {
          this.ctx = this.surface.getContext('2d');
          this.draw(this.props);
      };

      ParallelCoordinatesCanvas.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
          if (this.props.outerWidth !== props.outerWidth || this.props.outerHeight !== props.outerHeight || this.props.isInteractive !== props.isInteractive || this.props.theme !== props.theme) {
              return true;
          } else {
              this.draw(props);
              return false;
          }
      };

      ParallelCoordinatesCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
          this.ctx = this.surface.getContext('2d');
          this.draw(this.props);
      };

      ParallelCoordinatesCanvas.prototype.draw = function draw(props) {
          var _this2 = this;

          var layout = props.layout,
              dataWithPoints = props.dataWithPoints,
              variablesWithScale = props.variablesWithScale,
              variablesScale = props.variablesScale,
              width = props.width,
              height = props.height,
              outerWidth = props.outerWidth,
              outerHeight = props.outerHeight,
              pixelRatio = props.pixelRatio,
              getLineColor = props.getLineColor,
              margin = props.margin,
              lineOpacity = props.lineOpacity,
              strokeWidth = props.strokeWidth,
              lineGenerator = props.lineGenerator,
              axesTicksPosition = props.axesTicksPosition,
              theme = props.theme;


          this.surface.width = outerWidth * pixelRatio;
          this.surface.height = outerHeight * pixelRatio;

          this.ctx.scale(pixelRatio, pixelRatio);
          this.ctx.fillStyle = theme.background;
          this.ctx.fillRect(0, 0, outerWidth, outerHeight);
          this.ctx.translate(margin.left, margin.top);

          lineGenerator.context(this.ctx);
          dataWithPoints.forEach(function (datum) {
              _this2.ctx.save();
              _this2.ctx.globalAlpha = lineOpacity;

              _this2.ctx.beginPath();
              lineGenerator(datum.points);
              _this2.ctx.strokeStyle = getLineColor(datum);
              _this2.ctx.lineWidth = strokeWidth;
              _this2.ctx.stroke();

              _this2.ctx.restore();
          });

          variablesWithScale.map(function (variable) {
              axes.renderAxisToCanvas(_this2.ctx, {
                  axis: layout === 'horizontal' ? 'y' : 'x',
                  scale: variable.scale,
                  x: layout === 'horizontal' ? variablesScale(variable.key) : 0,
                  y: layout === 'horizontal' ? 0 : variablesScale(variable.key),
                  length: layout === 'horizontal' ? height : width,
                  ticksPosition: axesTicksPosition,
                  theme: theme
              });
          });
      };

      ParallelCoordinatesCanvas.prototype.render = function render() {
          var _this3 = this;

          var _props = this.props,
              pixelRatio = _props.pixelRatio,
              outerWidth = _props.outerWidth,
              outerHeight = _props.outerHeight,
              theme = _props.theme,
              isInteractive = _props.isInteractive;


          return React__default.createElement(
              core.Container,
              { isInteractive: isInteractive, theme: theme },
              function () {
                  return React__default.createElement('canvas', {
                      ref: function ref(surface) {
                          _this3.surface = surface;
                      },
                      width: outerWidth * pixelRatio,
                      height: outerHeight * pixelRatio,
                      style: {
                          width: outerWidth,
                          height: outerHeight
                      }
                  });
              }
          );
      };

      return ParallelCoordinatesCanvas;
  }(React.Component);

  ParallelCoordinatesCanvas.propTypes = _extends({}, commonPropTypes, {
      pixelRatio: PropTypes.number.isRequired
  });
  var enhance$1 = compose.apply(undefined, [defaultProps(_extends({}, commonDefaultProps, {
      pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
  }))].concat(commonEnhancers, [withPropsOnChange(['width', 'height', 'data', 'variables', 'layout'], function (_ref) {
      var width = _ref.width,
          height = _ref.height,
          data = _ref.data,
          variables = _ref.variables,
          layout = _ref.layout;
      return computeParallelCoordinatesLayout({
          width: width,
          height: height,
          data: data,
          variables: variables,
          layout: layout
      });
  }), pure]));

  var ParallelCoordinatesCanvas$1 = setDisplayName('ParallelCoordinatesCanvas')(enhance$1(ParallelCoordinatesCanvas));

  var ResponsiveParallelCoordinatesCanvas = function ResponsiveParallelCoordinatesCanvas(props) {
      return React__default.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React__default.createElement(ParallelCoordinatesCanvas$1, _extends({ width: width, height: height }, props));
          }
      );
  };

  exports.ParallelCoordinates = ParallelCoordinates$1;
  exports.ResponsiveParallelCoordinates = ResponsiveParallelCoordinates;
  exports.ParallelCoordinatesCanvas = ParallelCoordinatesCanvas$1;
  exports.ResponsiveParallelCoordinatesCanvas = ResponsiveParallelCoordinatesCanvas;
  exports.commonPropTypes = commonPropTypes;
  exports.commonDefaultProps = commonDefaultProps;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
