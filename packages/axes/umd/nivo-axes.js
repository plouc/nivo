(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash/isNumber'), require('lodash/isArray'), require('@nivo/core'), require('react'), require('prop-types'), require('lodash/isFunction'), require('d3-format'), require('d3-time-format'), require('recompose/compose'), require('recompose/withPropsOnChange'), require('recompose/pure'), require('recompose/setDisplayName'), require('react-motion')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash/isNumber', 'lodash/isArray', '@nivo/core', 'react', 'prop-types', 'lodash/isFunction', 'd3-format', 'd3-time-format', 'recompose/compose', 'recompose/withPropsOnChange', 'recompose/pure', 'recompose/setDisplayName', 'react-motion'], factory) :
  (factory((global.nivo = global.nivo || {}),global['lodash/isNumber'],global['lodash/isArray'],global.nivo,global.React,global.PropTypes,global['lodash/isFunction'],global.d3,global.d3,global.RecomposeCompose,global.RecomposeWithPropsOnChange,global.RecomposePure,global.RecomposeSetDisplayName,global.ReactMotion));
}(this, (function (exports,isNumber,isArray,core,React,PropTypes,isFunction,d3Format,d3TimeFormat,compose,withPropsOnChange,pure,setDisplayName,reactMotion) { 'use strict';

  isNumber = isNumber && isNumber.hasOwnProperty('default') ? isNumber['default'] : isNumber;
  isArray = isArray && isArray.hasOwnProperty('default') ? isArray['default'] : isArray;
  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  isFunction = isFunction && isFunction.hasOwnProperty('default') ? isFunction['default'] : isFunction;
  compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
  withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
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

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

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

  var getScaleTicks = function getScaleTicks(scale, tickCount) {
      if (scale.ticks) return scale.ticks(tickCount);
      return scale.domain();
  };

  var computeCartesianTicks = function computeCartesianTicks(_ref) {
      var axis = _ref.axis,
          scale = _ref.scale,
          ticksPosition = _ref.ticksPosition,
          _tickValues = _ref.tickValues,
          tickSize = _ref.tickSize,
          tickPadding = _ref.tickPadding,
          tickRotation = _ref.tickRotation,
          _ref$engine = _ref.engine,
          engine = _ref$engine === undefined ? 'svg' : _ref$engine;

      var tickValues = isArray(_tickValues) ? _tickValues : undefined;
      var tickCount = isNumber(_tickValues) ? _tickValues : undefined;

      var values = tickValues || getScaleTicks(scale, tickCount);

      var textProps = core.textPropsByEngine[engine];

      var position = scale.bandwidth ? centerScale(scale) : scale;
      var line = { lineX: 0, lineY: 0 };
      var text = { textX: 0, textY: 0 };

      var translate = void 0;
      var textAlign = textProps.align.center;
      var textBaseline = textProps.baseline.center;

      if (axis === 'x') {
          translate = function translate(d) {
              return { x: position(d), y: 0 };
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
              return { x: 0, y: position(d) };
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
          return _extends({
              key: value,
              value: value
          }, translate(value), line, text);
      });

      return {
          ticks: ticks,
          textAlign: textAlign,
          textBaseline: textBaseline
      };
  };

  var AxisTick = function (_PureComponent) {
      inherits(AxisTick, _PureComponent);

      function AxisTick() {
          classCallCheck(this, AxisTick);
          return possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
      }

      AxisTick.prototype.render = function render() {
          var _props = this.props,
              _value = _props.value,
              x = _props.x,
              y = _props.y,
              opacity = _props.opacity,
              rotate = _props.rotate,
              format = _props.format,
              lineX = _props.lineX,
              lineY = _props.lineY,
              _onClick = _props.onClick,
              textX = _props.textX,
              textY = _props.textY,
              textBaseline = _props.textBaseline,
              textAnchor = _props.textAnchor,
              theme = _props.theme;


          var value = _value;
          if (format !== undefined) {
              value = format(value);
          }

          var gStyle = { opacity: opacity };
          if (_onClick) {
              gStyle['cursor'] = 'pointer';
          }

          return React__default.createElement(
              'g',
              _extends({
                  transform: 'translate(' + x + ',' + y + ')'
              }, _onClick ? { onClick: function onClick(e) {
                      return _onClick(e, value);
                  } } : {}, {
                  style: gStyle
              }),
              React__default.createElement('line', { x1: 0, x2: lineX, y1: 0, y2: lineY, style: theme.axis.ticks.line }),
              React__default.createElement(
                  'text',
                  {
                      alignmentBaseline: textBaseline,
                      textAnchor: textAnchor,
                      transform: 'translate(' + textX + ',' + textY + ') rotate(' + rotate + ')',
                      style: theme.axis.ticks.text
                  },
                  value
              )
          );
      };

      return AxisTick;
  }(React.PureComponent);

  AxisTick.propTypes = {
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      format: PropTypes.func,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      lineX: PropTypes.number.isRequired,
      lineY: PropTypes.number.isRequired,
      textX: PropTypes.number.isRequired,
      textY: PropTypes.number.isRequired,
      textBaseline: PropTypes.string.isRequired,
      textAnchor: PropTypes.string.isRequired,
      opacity: PropTypes.number.isRequired,
      rotate: PropTypes.number.isRequired,
      onClick: PropTypes.func,
      theme: PropTypes.shape({
          axis: core.axisThemePropType.isRequired
      }).isRequired
  };
  AxisTick.defaultProps = {
      opacity: 1,
      rotate: 0
  };

  var willEnter = function willEnter() {
      return {
          rotate: 0,
          opacity: 0,
          x: 0,
          y: 0
      };
  };

  var willLeave = function willLeave(springConfig) {
      return function (_ref) {
          var _ref$style = _ref.style,
              x = _ref$style.x,
              y = _ref$style.y,
              rotate = _ref$style.rotate;
          return {
              rotate: rotate,
              opacity: reactMotion.spring(0, springConfig),
              x: reactMotion.spring(x.val, springConfig),
              y: reactMotion.spring(y.val, springConfig)
          };
      };
  };

  var defaultTickRenderer = function defaultTickRenderer(props) {
      return React__default.createElement(AxisTick, props);
  };

  var Axis = function (_Component) {
      inherits(Axis, _Component);

      function Axis() {
          classCallCheck(this, Axis);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      Axis.prototype.render = function render() {
          var _props = this.props,
              axis = _props.axis,
              scale = _props.scale,
              x = _props.x,
              y = _props.y,
              length = _props.length,
              ticksPosition = _props.ticksPosition,
              tickValues = _props.tickValues,
              tickSize = _props.tickSize,
              tickPadding = _props.tickPadding,
              tickRotation = _props.tickRotation,
              tickValueFormat = _props.tickValueFormat,
              renderTick = _props.renderTick,
              legend = _props.legend,
              legendPosition = _props.legendPosition,
              legendOffset = _props.legendOffset,
              theme = _props.theme,
              animate = _props.animate,
              motionStiffness = _props.motionStiffness,
              motionDamping = _props.motionDamping,
              onClick = _props.onClick;

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
              var textAnchor = void 0;

              if (axis === 'y') {
                  legendRotation = -90;
                  legendX = legendOffset;
                  if (legendPosition === 'start') {
                      textAnchor = 'start';
                      legendY = length;
                  } else if (legendPosition === 'center') {
                      textAnchor = 'middle';
                      legendY = length / 2;
                  } else if (legendPosition === 'end') {
                      textAnchor = 'end';
                  }
              } else {
                  legendY = legendOffset;
                  if (legendPosition === 'start') {
                      textAnchor = 'start';
                  } else if (legendPosition === 'center') {
                      textAnchor = 'middle';
                      legendX = length / 2;
                  } else if (legendPosition === 'end') {
                      textAnchor = 'end';
                      legendX = length;
                  }
              }

              legendNode = React__default.createElement(
                  'text',
                  {
                      transform: 'translate(' + legendX + ', ' + legendY + ') rotate(' + legendRotation + ')',
                      textAnchor: textAnchor,
                      style: theme.axis.legend.text
                  },
                  legend
              );
          }

          if (animate !== true) {
              return React__default.createElement(
                  'g',
                  { transform: 'translate(' + x + ',' + y + ')' },
                  ticks.map(function (tick) {
                      return renderTick(_extends({
                          format: tickValueFormat,
                          rotate: tickRotation,
                          textBaseline: textBaseline,
                          textAnchor: textAlign,
                          theme: theme
                      }, tick, onClick ? { onClick: onClick } : {}));
                  }),
                  React__default.createElement('line', {
                      style: theme.axis.domain.line,
                      x1: 0,
                      x2: axis === 'x' ? length : 0,
                      y1: 0,
                      y2: axis === 'x' ? 0 : length
                  }),
                  legendNode
              );
          }

          var springConfig = {
              stiffness: motionStiffness,
              damping: motionDamping
          };

          return React__default.createElement(
              reactMotion.Motion,
              { style: { x: reactMotion.spring(x, springConfig), y: reactMotion.spring(y, springConfig) } },
              function (xy) {
                  return React__default.createElement(
                      'g',
                      { transform: 'translate(' + xy.x + ',' + xy.y + ')' },
                      React__default.createElement(
                          reactMotion.TransitionMotion,
                          {
                              willEnter: willEnter,
                              willLeave: willLeave(springConfig),
                              styles: ticks.map(function (tick) {
                                  return {
                                      key: '' + tick.key,
                                      data: tick,
                                      style: {
                                          opacity: reactMotion.spring(1, springConfig),
                                          x: reactMotion.spring(tick.x, springConfig),
                                          y: reactMotion.spring(tick.y, springConfig),
                                          rotate: reactMotion.spring(tickRotation, springConfig)
                                      }
                                  };
                              })
                          },
                          function (interpolatedStyles) {
                              return React__default.createElement(
                                  React.Fragment,
                                  null,
                                  interpolatedStyles.map(function (_ref2) {
                                      var style = _ref2.style,
                                          tick = _ref2.data;
                                      return renderTick(_extends({
                                          format: tickValueFormat,
                                          textBaseline: textBaseline,
                                          textAnchor: textAlign,
                                          theme: theme
                                      }, tick, style, onClick ? { onClick: onClick } : {}));
                                  })
                              );
                          }
                      ),
                      React__default.createElement(
                          reactMotion.Motion,
                          {
                              style: {
                                  x2: reactMotion.spring(axis === 'x' ? length : 0, springConfig),
                                  y2: reactMotion.spring(axis === 'x' ? 0 : length, springConfig)
                              }
                          },
                          function (values) {
                              return React__default.createElement('line', _extends({ style: theme.axis.domain.line, x1: 0, y1: 0 }, values));
                          }
                      ),
                      legendNode
                  );
              }
          );
      };

      return Axis;
  }(React.Component);

  Axis.propTypes = _extends({
      axis: PropTypes.oneOf(['x', 'y']).isRequired,
      scale: PropTypes.func.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      length: PropTypes.number.isRequired,
      ticksPosition: PropTypes.oneOf(['before', 'after']).isRequired,
      tickValues: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]))]),
      tickSize: PropTypes.number.isRequired,
      tickPadding: PropTypes.number.isRequired,
      tickRotation: PropTypes.number.isRequired,
      tickFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      renderTick: PropTypes.func.isRequired,
      legend: PropTypes.node,
      legendPosition: PropTypes.oneOf(['start', 'middle', 'end']).isRequired,
      legendOffset: PropTypes.number.isRequired,
      theme: PropTypes.shape({
          axis: core.axisThemePropType.isRequired
      }).isRequired
  }, core.motionPropTypes);
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


  var enhance = compose(core.withMotion(), withPropsOnChange(['format', 'scale'], function (_ref3) {
      var format = _ref3.format,
          scale = _ref3.scale;

      if (!format || isFunction(format)) {
          return { format: format };
      } else if (scale.type === 'time') {
          var f = d3TimeFormat.timeFormat(format);
          return { format: function format(d) {
                  return f(new Date(d));
              } };
      } else {
          return { format: d3Format.format(format) };
      }
  }), pure);

  var Axis$1 = setDisplayName('Axis')(enhance(Axis));

  var degreesToRadians = function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  };

  var renderAxisToCanvas = function renderAxisToCanvas(ctx, _ref) {
      var axis = _ref.axis,
          scale = _ref.scale,
          _ref$x = _ref.x,
          x = _ref$x === undefined ? 0 : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === undefined ? 0 : _ref$y,
          length = _ref.length,
          ticksPosition = _ref.ticksPosition,
          tickValues = _ref.tickValues,
          _ref$tickSize = _ref.tickSize,
          tickSize = _ref$tickSize === undefined ? 5 : _ref$tickSize,
          _ref$tickPadding = _ref.tickPadding,
          tickPadding = _ref$tickPadding === undefined ? 5 : _ref$tickPadding,
          _ref$tickRotation = _ref.tickRotation,
          tickRotation = _ref$tickRotation === undefined ? 0 : _ref$tickRotation,
          tickValueFormat = _ref.tickValueFormat,
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
      ctx.font = theme.axis.ticks.text.fontSize + 'px sans-serif';

      ctx.lineWidth = theme.axis.domain.line.strokeWidth;
      ctx.lineCap = 'square';
      ctx.strokeStyle = theme.axis.domain.line.stroke;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(axis === 'x' ? length : 0, axis === 'x' ? 0 : length);
      ctx.stroke();

      ticks.forEach(function (tick) {
          ctx.lineWidth = theme.axis.ticks.line.strokeWidth;
          ctx.lineCap = 'square';
          ctx.strokeStyle = theme.axis.ticks.line.stroke;
          ctx.beginPath();
          ctx.moveTo(tick.x, tick.y);
          ctx.lineTo(tick.x + tick.lineX, tick.y + tick.lineY);
          ctx.stroke();

          var value = tickValueFormat !== undefined ? tickValueFormat(tick.value) : tick.value;

          ctx.save();
          ctx.translate(tick.x + tick.textX, tick.y + tick.textY);
          ctx.rotate(degreesToRadians(tickRotation));
          ctx.fillStyle = theme.axis.ticks.text.fill;
          ctx.fillText(value, 0, 0);
          ctx.restore();
      });

      ctx.restore();
  };

  exports.Axis = Axis$1;
  exports.renderAxisToCanvas = renderAxisToCanvas;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
