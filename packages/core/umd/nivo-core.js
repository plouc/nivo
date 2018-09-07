(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('react-measure'), require('recompose/pure'), require('react-motion'), require('d3-interpolate'), require('lodash/isFunction'), require('d3-format'), require('recompose/compose'), require('recompose/withPropsOnChange'), require('lodash/memoize'), require('lodash/get'), require('d3-color'), require('lodash/last'), require('lodash/isArray'), require('d3-scale'), require('d3-scale-chromatic'), require('lodash/isString'), require('recompose/setPropTypes'), require('recompose/defaultProps'), require('lodash/without'), require('d3-shape'), require('d3-hierarchy'), require('recompose/withProps'), require('lodash/isEqual'), require('lodash/partialRight'), require('lodash/merge'), require('lodash/isNumber'), require('d3-time-format'), require('recompose/shouldUpdate'), require('lodash/isPlainObject'), require('lodash/pick'), require('lodash/set')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'react-measure', 'recompose/pure', 'react-motion', 'd3-interpolate', 'lodash/isFunction', 'd3-format', 'recompose/compose', 'recompose/withPropsOnChange', 'lodash/memoize', 'lodash/get', 'd3-color', 'lodash/last', 'lodash/isArray', 'd3-scale', 'd3-scale-chromatic', 'lodash/isString', 'recompose/setPropTypes', 'recompose/defaultProps', 'lodash/without', 'd3-shape', 'd3-hierarchy', 'recompose/withProps', 'lodash/isEqual', 'lodash/partialRight', 'lodash/merge', 'lodash/isNumber', 'd3-time-format', 'recompose/shouldUpdate', 'lodash/isPlainObject', 'lodash/pick', 'lodash/set'], factory) :
  (factory((global.nivo = global.nivo || {}),global.React,global.PropTypes,global['react-measure'],global.RecomposePure,global.ReactMotion,global.d3,global['lodash/isFunction'],global.d3,global.RecomposeCompose,global.RecomposeWithPropsOnChange,global['lodash/memoize'],global['lodash/get'],global.d3,global['lodash/last'],global['lodash/isArray'],global.d3,global.d3,global['lodash/isString'],global.RecomposeSetPropTypes,global.RecomposeDefaultProps,global['lodash/without'],global.d3,global.d3,global.RecomposeWithProps,global['lodash/isEqual'],global['lodash/partialRight'],global['lodash/merge'],global['lodash/isNumber'],global.d3,global.RecomposeShouldUpdate,global['lodash/isPlainObject'],global['lodash/pick'],global['lodash/set']));
}(this, (function (exports,React,PropTypes,Measure,pure,reactMotion,d3Interpolate,isFunction,d3Format,compose,withPropsOnChange,memoize,get,d3Color,last,isArray,d3Scale,d3ScaleChromatic,isString,setPropTypes,defaultProps,without,d3Shape,d3Hierarchy,withProps,isEqual,partialRight,merge,isNumber,d3TimeFormat,shouldUpdate,isPlainObject,pick,set) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  Measure = Measure && Measure.hasOwnProperty('default') ? Measure['default'] : Measure;
  pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
  isFunction = isFunction && isFunction.hasOwnProperty('default') ? isFunction['default'] : isFunction;
  compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
  withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
  memoize = memoize && memoize.hasOwnProperty('default') ? memoize['default'] : memoize;
  get = get && get.hasOwnProperty('default') ? get['default'] : get;
  last = last && last.hasOwnProperty('default') ? last['default'] : last;
  isArray = isArray && isArray.hasOwnProperty('default') ? isArray['default'] : isArray;
  isString = isString && isString.hasOwnProperty('default') ? isString['default'] : isString;
  setPropTypes = setPropTypes && setPropTypes.hasOwnProperty('default') ? setPropTypes['default'] : setPropTypes;
  defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
  without = without && without.hasOwnProperty('default') ? without['default'] : without;
  withProps = withProps && withProps.hasOwnProperty('default') ? withProps['default'] : withProps;
  isEqual = isEqual && isEqual.hasOwnProperty('default') ? isEqual['default'] : isEqual;
  partialRight = partialRight && partialRight.hasOwnProperty('default') ? partialRight['default'] : partialRight;
  merge = merge && merge.hasOwnProperty('default') ? merge['default'] : merge;
  isNumber = isNumber && isNumber.hasOwnProperty('default') ? isNumber['default'] : isNumber;
  shouldUpdate = shouldUpdate && shouldUpdate.hasOwnProperty('default') ? shouldUpdate['default'] : shouldUpdate;
  isPlainObject = isPlainObject && isPlainObject.hasOwnProperty('default') ? isPlainObject['default'] : isPlainObject;
  pick = pick && pick.hasOwnProperty('default') ? pick['default'] : pick;
  set = set && set.hasOwnProperty('default') ? set['default'] : set;

  var noop = (function () {});

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

  var containerStyle = {
      position: 'relative'
  };

  var tooltipStyle = {
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: 10
  };

  var noopHandlers = {
      showTooltip: noop,
      hideTooltip: noop
  };

  var Container = function (_Component) {
      inherits(Container, _Component);

      function Container() {
          var _temp, _this, _ret;

          classCallCheck(this, Container);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
              isTooltipVisible: false,
              tooltipContent: null,
              position: {}
          }, _this.showTooltip = function (content, event) {
              var clientX = event.clientX,
                  clientY = event.clientY;

              var bounds = _this.container.getBoundingClientRect();

              var x = clientX - bounds.left;
              var y = clientY - bounds.top;

              var position = {};

              if (x < bounds.width / 2) position.left = x + 20;else position.right = bounds.width - x + 20;

              if (y < bounds.height / 2) position.top = y - 12;else position.bottom = bounds.height - y - 12;

              _this.setState({
                  isTooltipVisible: true,
                  tooltipContent: content,
                  position: position
              });
          }, _this.hideTooltip = function () {
              _this.setState({ isTooltipVisible: false, tooltipContent: null });
          }, _temp), possibleConstructorReturn(_this, _ret);
      }

      Container.prototype.render = function render() {
          var _this2 = this;

          var _props = this.props,
              children = _props.children,
              isInteractive = _props.isInteractive,
              theme = _props.theme;
          var _state = this.state,
              isTooltipVisible = _state.isTooltipVisible,
              tooltipContent = _state.tooltipContent,
              position = _state.position;


          if (!isInteractive) return children(noopHandlers);

          return React__default.createElement(
              'div',
              {
                  style: containerStyle,
                  ref: function ref(container) {
                      _this2.container = container;
                  }
              },
              children({
                  showTooltip: this.showTooltip,
                  hideTooltip: this.hideTooltip
              }),
              isTooltipVisible && React__default.createElement(
                  'div',
                  {
                      style: _extends({}, tooltipStyle, position, theme.tooltip)
                  },
                  tooltipContent
              )
          );
      };

      return Container;
  }(React.Component);

  Container.propTypes = {
      children: PropTypes.func.isRequired,
      isInteractive: PropTypes.bool.isRequired,
      theme: PropTypes.object.isRequired
  };
  Container.defaultProps = {
      isInteractive: true
  };

  var ResponsiveWrapper = function (_Component) {
      inherits(ResponsiveWrapper, _Component);

      function ResponsiveWrapper() {
          var _temp, _this, _ret;

          classCallCheck(this, ResponsiveWrapper);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
              dimensions: {
                  width: -1,
                  height: -1
              }
          }, _temp), possibleConstructorReturn(_this, _ret);
      }

      ResponsiveWrapper.prototype.render = function render() {
          var _this2 = this;

          var _state$dimensions = this.state.dimensions,
              width = _state$dimensions.width,
              height = _state$dimensions.height;


          var shouldRender = width > 0 && height > 0;

          return React__default.createElement(
              Measure,
              {
                  bounds: true,
                  onResize: function onResize(contentRect) {
                      _this2.setState({ dimensions: contentRect.bounds });
                  }
              },
              function (_ref) {
                  var measureRef = _ref.measureRef;
                  return React__default.createElement(
                      'div',
                      { ref: measureRef, style: { width: '100%', height: '100%' } },
                      shouldRender && _this2.props.children({ width: width, height: height })
                  );
              }
          );
      };

      return ResponsiveWrapper;
  }(React.Component);

  ResponsiveWrapper.propTypes = {
      children: PropTypes.func.isRequired
  };

  var LinearGradient = function LinearGradient(_ref) {
      var id = _ref.id,
          colors = _ref.colors;
      return React__default.createElement(
          'linearGradient',
          { id: id, x1: 0, x2: 0, y1: 0, y2: 1 },
          colors.map(function (_ref2) {
              var offset = _ref2.offset,
                  color = _ref2.color,
                  opacity = _ref2.opacity;
              return React__default.createElement('stop', {
                  key: offset,
                  offset: offset + '%',
                  stopColor: color,
                  stopOpacity: opacity !== undefined ? opacity : 1
              });
          })
      );
  };

  LinearGradient.propTypes = {
      id: PropTypes.string.isRequired,
      colors: PropTypes.arrayOf(PropTypes.shape({
          offset: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired
      })).isRequired
  };

  var linearGradientDef = function linearGradientDef(id, colors) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _extends({
          id: id,
          type: 'linearGradient',
          colors: colors
      }, options);
  };

  var gradientTypes = {
      linearGradient: LinearGradient
  };

  var PatternDots = pure(function (_ref) {
      var id = _ref.id,
          background = _ref.background,
          color = _ref.color,
          size = _ref.size,
          padding = _ref.padding,
          stagger = _ref.stagger;

      var fullSize = size + padding;
      var radius = size / 2;
      var halfPadding = padding / 2;
      if (stagger === true) {
          fullSize = size * 2 + padding * 2;
      }

      return React__default.createElement(
          'pattern',
          { id: id, width: fullSize, height: fullSize, patternUnits: 'userSpaceOnUse' },
          React__default.createElement('rect', { width: fullSize, height: fullSize, fill: background }),
          React__default.createElement('circle', { cx: halfPadding + radius, cy: halfPadding + radius, r: radius, fill: color }),
          stagger && React__default.createElement('circle', {
              cx: padding * 1.5 + size + radius,
              cy: padding * 1.5 + size + radius,
              r: radius,
              fill: color
          })
      );
  });

  PatternDots.propTypes = {
      id: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      padding: PropTypes.number.isRequired,
      stagger: PropTypes.bool.isRequired
  };

  PatternDots.defaultProps = {
      color: '#000000',
      background: '#ffffff',
      size: 4,
      padding: 4,
      stagger: false
  };

  var patternDotsDef = function patternDotsDef(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _extends({
          id: id,
          type: 'patternDots'
      }, options);
  };

  var TWO_PI = Math.PI * 2;

  var degreesToRadians = function degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
  };

  var radiansToDegrees = function radiansToDegrees(radians) {
      return 180 * radians / Math.PI;
  };

  var midAngle = function midAngle(arc) {
      return arc.startAngle + (arc.endAngle - arc.startAngle) / 2;
  };

  var positionFromAngle = function positionFromAngle(angle, distance) {
      return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance
      };
  };

  /**
   * Normalize given angle (degrees) in the 0~360 range.
   *
   * @param {number} angle
   *
   * @return {number}
   */
  var absoluteAngleDegrees = function absoluteAngleDegrees(angle) {
      var absAngle = angle % 360;
      if (absAngle < 0) {
          absAngle += 360;
      }

      return absAngle;
  };

  var absoluteAngleRadians = function absoluteAngleRadians(angle) {
      return angle - TWO_PI * Math.floor((angle + Math.PI) / TWO_PI);
  };

  /**
   * Computes the bounding box for a circle arc.
   *
   * Assumptions:
   *   - Anywhere the arc intersects an axis will be a max or a min.
   *   - If the arc doesn't intersect an axis, then the center
   *     will be one corner of the bounding rectangle,
   *     and this is the only case when it will be.
   *   - The only other possible extreme points of the sector to consider
   *     are the endpoints of the radii.
   *
   * This script was built within the help of this answer on stackoverflow:
   *   https://stackoverflow.com/questions/1336663/2d-bounding-box-of-a-sector
   *
   * @param {number}  ox                   - circle x origin
   * @param {number}  oy                   - circle y origin
   * @param {number}  radius               - circle radius
   * @param {number}  startAngle           - arc start angle
   * @param {number}  endAngle             - arc end angle
   * @param {boolean} [includeCenter=true] - if true, include the center
   *
   * @return {{ points: *[][], x: number, y: number, width: number, height: number }}
   */
  var computeArcBoundingBox = function computeArcBoundingBox(ox, oy, radius, startAngle, endAngle) {
      var includeCenter = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

      var points = [];

      var p0 = positionFromAngle(degreesToRadians(startAngle), radius);
      points.push([p0.x, p0.y]);

      var p1 = positionFromAngle(degreesToRadians(endAngle), radius);
      points.push([p1.x, p1.y]);

      for (var angle = Math.round(Math.min(startAngle, endAngle)); angle <= Math.round(Math.max(startAngle, endAngle)); angle++) {
          if (angle % 90 === 0) {
              var p = positionFromAngle(degreesToRadians(angle), radius);
              points.push([p.x, p.y]);
          }
      }

      points = points.map(function (_ref) {
          var x = _ref[0],
              y = _ref[1];
          return [ox + x, oy + y];
      });
      if (includeCenter === true) points.push([ox, oy]);

      var xs = points.map(function (_ref2) {
          var x = _ref2[0];
          return x;
      });
      var ys = points.map(function (_ref3) {
          var y = _ref3[1];
          return y;
      });

      var x0 = Math.min.apply(Math, xs);
      var x1 = Math.max.apply(Math, xs);

      var y0 = Math.min.apply(Math, ys);
      var y1 = Math.max.apply(Math, ys);

      return {
          points: points,
          x: x0,
          y: y0,
          width: x1 - x0,
          height: y1 - y0
      };
  };

  var textPropsByEngine = {
      svg: {
          align: {
              left: 'start',
              center: 'middle',
              right: 'end'
          },
          baseline: {
              top: 'before-edge',
              center: 'central',
              bottom: 'after-edge'
          }
      },
      canvas: {
          align: {
              left: 'left',
              center: 'center',
              right: 'right'
          },
          baseline: {
              top: 'top',
              center: 'middle',
              bottom: 'bottom'
          }
      }
  };

  /**
   * @param {number} radius
   * @param {number} angle          angle (radians)
   * @param {number} [rotation=0]   label rotation (degrees)
   * @param {string} [engine='svg'] one of: 'svg', 'canvas'
   * @return {{ x: number, y: number, rotate: number, align: string, baseline: string }}
   */
  var getPolarLabelProps = function getPolarLabelProps(radius, angle, rotation) {
      var engine = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'svg';

      var textProps = textPropsByEngine[engine];

      var _positionFromAngle = positionFromAngle(angle - Math.PI / 2, radius),
          x = _positionFromAngle.x,
          y = _positionFromAngle.y;

      var rotate = radiansToDegrees(angle);
      var align = textProps.align.center;
      var baseline = textProps.baseline.bottom;

      if (rotation > 0) {
          align = textProps.align.right;
          baseline = textProps.baseline.center;
      } else if (rotation < 0) {
          align = textProps.align.left;
          baseline = textProps.baseline.center;
      }

      // reverse labels after 180°
      if (rotation !== 0 && rotate > 180) {
          rotate -= 180;
          align = align === textProps.align.right ? textProps.align.left : textProps.align.right;
      }

      rotate += rotation;

      return { x: x, y: y, rotate: rotate, align: align, baseline: baseline };
  };

  var PatternLines = pure(function (_ref) {
      var id = _ref.id,
          _spacing = _ref.spacing,
          _rotation = _ref.rotation,
          background = _ref.background,
          color = _ref.color,
          lineWidth = _ref.lineWidth;

      var rotation = Math.round(_rotation) % 360;
      var spacing = Math.abs(_spacing);

      if (rotation > 180) rotation = rotation - 360;else if (rotation > 90) rotation = rotation - 180;else if (rotation < -180) rotation = rotation + 360;else if (rotation < -90) rotation = rotation + 180;

      var width = spacing;
      var height = spacing;
      var path = void 0;

      if (rotation === 0) {
          path = '\n                M 0 0 L ' + width + ' 0\n                M 0 ' + height + ' L ' + width + ' ' + height + '\n            ';
      } else if (rotation === 90) {
          path = '\n                M 0 0 L 0 ' + height + '\n                M ' + width + ' 0 L ' + width + ' ' + height + '\n            ';
      } else {
          width = Math.abs(spacing / Math.sin(degreesToRadians(rotation)));
          height = spacing / Math.sin(degreesToRadians(90 - rotation));

          if (rotation > 0) {
              path = '\n                    M 0 ' + -height + ' L ' + width * 2 + ' ' + height + '\n                    M ' + -width + ' ' + -height + ' L ' + width + ' ' + height + '\n                    M ' + -width + ' 0 L ' + width + ' ' + height * 2 + '\n                ';
          } else {
              path = '\n                    M ' + -width + ' ' + height + ' L ' + width + ' ' + -height + '\n                    M ' + -width + ' ' + height * 2 + ' L ' + width * 2 + ' ' + -height + '\n                    M 0 ' + height * 2 + ' L ' + width * 2 + ' 0\n                ';
          }
      }

      return React__default.createElement(
          'pattern',
          { id: id, width: width, height: height, patternUnits: 'userSpaceOnUse' },
          React__default.createElement('rect', {
              width: width,
              height: height,
              fill: background,
              stroke: 'rgba(255, 0, 0, 0.1)',
              strokeWidth: 0
          }),
          React__default.createElement('path', { d: path, strokeWidth: lineWidth, stroke: color, strokeLinecap: 'square' })
      );
  });

  PatternLines.propTypes = {
      id: PropTypes.string.isRequired,
      spacing: PropTypes.number.isRequired,
      rotation: PropTypes.number.isRequired,
      background: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      lineWidth: PropTypes.number.isRequired
  };

  PatternLines.defaultProps = {
      spacing: 5,
      rotation: 0,
      color: '#000000',
      background: '#ffffff',
      lineWidth: 2
  };

  var patternLinesDef = function patternLinesDef(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _extends({
          id: id,
          type: 'patternLines'
      }, options);
  };

  var PatternSquares = pure(function (_ref) {
      var id = _ref.id,
          background = _ref.background,
          color = _ref.color,
          size = _ref.size,
          padding = _ref.padding,
          stagger = _ref.stagger;

      var fullSize = size + padding;
      var halfPadding = padding / 2;
      if (stagger === true) {
          fullSize = size * 2 + padding * 2;
      }

      return React__default.createElement(
          'pattern',
          { id: id, width: fullSize, height: fullSize, patternUnits: 'userSpaceOnUse' },
          React__default.createElement('rect', { width: fullSize, height: fullSize, fill: background }),
          React__default.createElement('rect', { x: halfPadding, y: halfPadding, width: size, height: size, fill: color }),
          stagger && React__default.createElement('rect', {
              x: padding * 1.5 + size,
              y: padding * 1.5 + size,
              width: size,
              height: size,
              fill: color
          })
      );
  });

  PatternSquares.propTypes = {
      id: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      padding: PropTypes.number.isRequired,
      stagger: PropTypes.bool.isRequired
  };

  PatternSquares.defaultProps = {
      color: '#000000',
      background: '#ffffff',
      size: 4,
      padding: 4,
      stagger: false
  };

  var patternSquaresDef = function patternSquaresDef(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _extends({
          id: id,
          type: 'patternSquares'
      }, options);
  };

  var patternTypes = {
      patternDots: PatternDots,
      patternLines: PatternLines,
      patternSquares: PatternSquares
  };

  var defsMapping = _extends({}, gradientTypes, patternTypes);

  var Defs = pure(function (_ref) {
      var definitions = _ref.defs;

      if (!definitions || definitions.length < 1) return null;

      return React__default.createElement(
          'defs',
          null,
          definitions.map(function (_ref2) {
              var type = _ref2.type,
                  def = objectWithoutProperties(_ref2, ['type']);

              if (defsMapping[type]) return React__default.createElement(defsMapping[type], _extends({ key: def.id }, def));

              return null;
          })
      );
  });
  Defs.propTypes = {
      defs: PropTypes.arrayOf(PropTypes.shape({
          type: PropTypes.oneOf(Object.keys(defsMapping)).isRequired,
          id: PropTypes.string.isRequired
      }))
  };

  var axisThemePropType = PropTypes.shape({
      domain: PropTypes.shape({
          line: PropTypes.shape({
              stroke: PropTypes.string.isRequired,
              strokeWidth: PropTypes.number.isRequired,
              strokeDasharray: PropTypes.string
          }).isRequired
      }).isRequired,
      ticks: PropTypes.shape({
          line: PropTypes.shape({
              stroke: PropTypes.string.isRequired,
              strokeWidth: PropTypes.number.isRequired,
              strokeDasharray: PropTypes.string
          }).isRequired,
          text: PropTypes.shape({
              fill: PropTypes.string.isRequired,
              fontSize: PropTypes.number.isRequired
          }).isRequired
      }).isRequired,
      legend: PropTypes.shape({
          text: PropTypes.shape({
              fill: PropTypes.string.isRequired,
              fontSize: PropTypes.number.isRequired
          }).isRequired
      }).isRequired
  });

  var gridThemePropType = PropTypes.shape({
      line: PropTypes.shape({
          stroke: PropTypes.string.isRequired,
          strokeWidth: PropTypes.number.isRequired,
          strokeDasharray: PropTypes.string
      }).isRequired
  });

  var legendsThemePropType = PropTypes.shape({
      text: PropTypes.shape({
          fill: PropTypes.string.isRequired,
          fontSize: PropTypes.number.isRequired
      }).isRequired
  });

  var labelsThemePropType = PropTypes.shape({
      text: PropTypes.shape({
          fill: PropTypes.string.isRequired,
          fontSize: PropTypes.number.isRequired
      }).isRequired
  });

  var dotsThemePropType = PropTypes.shape({
      text: PropTypes.shape({
          fill: PropTypes.string.isRequired,
          fontSize: PropTypes.number.isRequired
      }).isRequired
  });

  var themePropType = PropTypes.shape({
      background: PropTypes.string.isRequired,
      axis: axisThemePropType.isRequired,
      grid: gridThemePropType.isRequired,
      legends: legendsThemePropType.isRequired,
      labels: labelsThemePropType.isRequired,
      dots: dotsThemePropType.isRequired
  });

  var defaultTextColor = '#333333';
  var defaultFontSize = 11;

  var defaultTheme = {
      background: 'transparent',
      axis: {
          domain: {
              line: {
                  stroke: 'transparent',
                  strokeWidth: 1
              }
          },
          ticks: {
              line: {
                  stroke: '#777',
                  strokeWidth: 1
              },
              text: {
                  fill: defaultTextColor,
                  fontSize: defaultFontSize
              }
          },
          legend: {
              text: {
                  fill: defaultTextColor,
                  fontSize: defaultFontSize
              }
          }
      },
      grid: {
          line: {
              stroke: '#ddd',
              strokeWidth: 1
          }
      },
      legends: {
          text: {
              fill: defaultTextColor,
              fontSize: defaultFontSize
          }
      },
      labels: {
          text: {
              fill: defaultTextColor,
              fontSize: defaultFontSize
          }
      },
      markers: {
          lineColor: '#000',
          lineStrokeWidth: 1,
          textColor: defaultTextColor,
          fontSize: defaultFontSize
      },
      dots: {
          text: {
              fill: defaultTextColor,
              fontSize: defaultFontSize
          }
      },
      tooltip: {
          container: {
              background: 'white',
              color: 'inherit',
              fontSize: 'inherit',
              borderRadius: '2px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
              padding: '5px 9px'
          },
          basic: {
              whiteSpace: 'pre',
              display: 'flex',
              alignItems: 'center'
          },
          table: {},
          tableCell: {
              padding: '3px 5px'
          }
      }
  };

  var SvgWrapper = function SvgWrapper(_ref) {
      var width = _ref.width,
          height = _ref.height,
          margin = _ref.margin,
          defs = _ref.defs,
          children = _ref.children,
          theme = _ref.theme;
      return React__default.createElement(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', role: 'img', width: width, height: height },
          React__default.createElement(Defs, { defs: defs }),
          React__default.createElement('rect', { width: width, height: height, fill: theme.background }),
          React__default.createElement(
              'g',
              { transform: 'translate(' + margin.left + ',' + margin.top + ')' },
              children
          )
      );
  };

  SvgWrapper.propTypes = {
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      margin: PropTypes.shape({
          top: PropTypes.number.isRequired,
          left: PropTypes.number.isRequired
      }).isRequired,
      defs: PropTypes.array,
      children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
      theme: themePropType.isRequired
  };

  // credit to Tanner Linsey from this issue on react motion repository:

  var enhancedSpring = function enhancedSpring(value, config) {
      if (typeof value !== 'number') {
          return {
              value: value,
              config: config,
              interpolator: config && config.interpolator ? config.interpolator : d3Interpolate.interpolate
          };
      }
      return reactMotion.spring(value, config);
  };

  var SmartMotion = function (_PureComponent) {
      inherits(SmartMotion, _PureComponent);

      function SmartMotion() {
          var _temp, _this, _ret;

          classCallCheck(this, SmartMotion);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.oldValues = {}, _this.newInters = {}, _this.currentStepValues = {}, _this.stepValues = {}, _this.stepInterpolators = {}, _temp), possibleConstructorReturn(_this, _ret);
      }

      SmartMotion.prototype.render = function render() {
          var _this2 = this;

          var _props = this.props,
              style = _props.style,
              children = _props.children,
              rest = objectWithoutProperties(_props, ['style', 'children']);


          var resolvedStyle = style(enhancedSpring);

          for (var key in resolvedStyle) {
              if (
              // If key is a non-numeric interpolation
              resolvedStyle[key] && resolvedStyle[key].interpolator) {
                  // Make sure the steps start at 0
                  this.currentStepValues[key] = this.currentStepValues[key] || 0;
                  if (
                  // And the value has changed
                  typeof this.newInters[key] === 'undefined' || resolvedStyle[key].value !== this.newInters[key].value) {
                      // Save the new value
                      this.newInters[key] = resolvedStyle[key];

                      // Increment the stepInterValue for this key by 1
                      this.stepValues[key] = this.currentStepValues[key] + 1;

                      // Set up the new interpolator
                      this.stepInterpolators[key] = this.newInters[key].interpolator(this.oldValues[key], this.newInters[key].value);
                  }
                  // Return the spring with the destination stepValue and spring config
                  resolvedStyle[key] = reactMotion.spring(this.stepValues[key], this.newInters[key].config);
                  // console.log(resolvedStyle[key])
              }
          }

          return React__default.createElement(
              reactMotion.Motion,
              _extends({}, rest, { style: resolvedStyle }),
              function (values) {
                  var newValues = {};
                  for (var _key2 in values) {
                      if (_this2.stepValues[_key2]) {
                          // Save the currentStepValue
                          _this2.currentStepValues[_key2] = values[_key2];
                          // Figure the percentage
                          var percentage = _this2.currentStepValues[_key2] - _this2.stepValues[_key2] + 1;
                          // Save the current value and replace the value in the interpolated object
                          _this2.oldValues[_key2] = newValues[_key2] = _this2.stepInterpolators[_key2](percentage);
                      }
                  }
                  return children(_extends({}, values, newValues));
              }
          );
      };

      return SmartMotion;
  }(React.PureComponent);

  SmartMotion.propTypes = {
      children: PropTypes.func.isRequired,
      style: PropTypes.func.isRequired
  };

  var DotsItemSymbol = function DotsItemSymbol(_ref) {
      var size = _ref.size,
          color = _ref.color,
          borderWidth = _ref.borderWidth,
          borderColor = _ref.borderColor;
      return React__default.createElement('circle', {
          r: size / 2,
          fill: color,
          stroke: borderColor,
          strokeWidth: borderWidth,
          style: { pointerEvents: 'none' }
      });
  };

  DotsItemSymbol.propTypes = {
      size: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      borderWidth: PropTypes.number.isRequired,
      borderColor: PropTypes.string.isRequired
  };

  var DotsItemSymbol$1 = pure(DotsItemSymbol);

  var DotsItem = function DotsItem(_ref) {
      var x = _ref.x,
          y = _ref.y,
          symbol = _ref.symbol,
          size = _ref.size,
          color = _ref.color,
          borderWidth = _ref.borderWidth,
          borderColor = _ref.borderColor,
          label = _ref.label,
          labelTextAnchor = _ref.labelTextAnchor,
          labelYOffset = _ref.labelYOffset,
          theme = _ref.theme;
      return React__default.createElement(
          'g',
          { transform: 'translate(' + x + ', ' + y + ')', style: { pointerEvents: 'none' } },
          React__default.createElement(symbol, {
              size: size,
              color: color,
              borderWidth: borderWidth,
              borderColor: borderColor
          }),
          label && React__default.createElement(
              'text',
              { textAnchor: labelTextAnchor, y: labelYOffset, style: theme.dots.text },
              label
          )
      );
  };

  DotsItem.propTypes = {
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,

      size: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      borderWidth: PropTypes.number.isRequired,
      borderColor: PropTypes.string.isRequired,

      symbol: PropTypes.func.isRequired,

      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      labelTextAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
      labelYOffset: PropTypes.number.isRequired,

      theme: PropTypes.shape({
          dots: dotsThemePropType.isRequired
      }).isRequired
  };

  var DotsItemDefaultProps = {
      symbol: DotsItemSymbol$1,

      // label
      labelTextAnchor: 'middle',
      labelYOffset: -12
  };

  DotsItem.defaultProps = DotsItemDefaultProps;

  var DotsItem$1 = pure(DotsItem);

  var Chip = function Chip(_ref) {
      var size = _ref.size,
          color = _ref.color,
          style = _ref.style;
      return React__default.createElement('span', { style: _extends({ display: 'block', width: size, height: size, background: color }, style) });
  };

  Chip.propTypes = {
      size: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      style: PropTypes.object.isRequired
  };

  Chip.defaultProps = {
      size: 12,
      style: {}
  };

  var Chip$1 = pure(Chip);

  var chipStyle = { marginRight: 7 };

  var BasicTooltip = function BasicTooltip(props) {
      var id = props.id,
          _value = props.value,
          format = props.format,
          enableChip = props.enableChip,
          color = props.color,
          theme = props.theme,
          renderContent = props.renderContent;


      var content = void 0;
      if (typeof renderContent === 'function') {
          content = renderContent();
      } else {
          var value = _value;
          if (format !== undefined && value !== undefined) {
              value = format(value);
          }
          content = React__default.createElement(
              'div',
              { style: theme.tooltip.basic },
              enableChip && React__default.createElement(Chip$1, { color: color, style: chipStyle }),
              value !== undefined ? React__default.createElement(
                  'span',
                  null,
                  id,
                  ': ',
                  React__default.createElement(
                      'strong',
                      null,
                      isNaN(value) ? String(value) : value
                  )
              ) : id
          );
      }

      return React__default.createElement(
          'div',
          { style: theme.tooltip.container },
          content
      );
  };

  BasicTooltip.propTypes = {
      id: PropTypes.node.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      enableChip: PropTypes.bool.isRequired,
      color: PropTypes.string,
      format: PropTypes.func,
      renderContent: PropTypes.func,

      theme: PropTypes.shape({
          tooltip: PropTypes.shape({
              container: PropTypes.object.isRequired,
              basic: PropTypes.object.isRequired
          }).isRequired
      }).isRequired
  };

  BasicTooltip.defaultProps = {
      enableChip: false
  };

  var enhance = compose(withPropsOnChange(['format'], function (_ref) {
      var format = _ref.format;

      if (!format || isFunction(format)) return { format: format };
      return { format: d3Format.format(format) };
  }), pure);

  var BasicTooltip$1 = enhance(BasicTooltip);

  var tableStyle = {
      width: '100%',
      borderCollapse: 'collapse'
  };

  var TableTooltip = function TableTooltip(_ref) {
      var title = _ref.title,
          rows = _ref.rows,
          theme = _ref.theme,
          renderContent = _ref.renderContent;

      if (!rows.length) return null;

      var content = void 0;
      if (typeof renderContent === 'function') {
          content = renderContent();
      } else {
          content = React__default.createElement(
              'div',
              null,
              title && title,
              React__default.createElement(
                  'table',
                  { style: _extends({}, tableStyle, theme.tooltip.table) },
                  React__default.createElement(
                      'tbody',
                      null,
                      rows.map(function (row, i) {
                          return React__default.createElement(
                              'tr',
                              { key: i },
                              row.map(function (column, j) {
                                  return React__default.createElement(
                                      'td',
                                      { key: j, style: theme.tooltip.tableCell },
                                      column
                                  );
                              })
                          );
                      })
                  )
              )
          );
      }
      return React__default.createElement(
          'div',
          { style: theme.tooltip.container },
          content
      );
  };

  TableTooltip.propTypes = {
      title: PropTypes.node,
      rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
      theme: PropTypes.shape({
          tooltip: PropTypes.shape({
              container: PropTypes.object.isRequired,
              table: PropTypes.object.isRequired,
              tableCell: PropTypes.object.isRequired
          }).isRequired
      }).isRequired,
      renderContent: PropTypes.func
  };

  TableTooltip.defaultProps = {};

  var TableTooltip$1 = pure(TableTooltip);

  /**
   * Memoize both color generator & color generator result.
   */
  var memoizedColorModifier = memoize(function (method, _amount) {
      var amount = parseFloat(_amount);

      return memoize(function (d) {
          return d3Color.rgb(d.color)[method](amount) // eslint-disable-line no-unexpected-multiline
          .toString();
      }, function (d) {
          return d.color;
      });
  }, function (method, amount) {
      return method + '.' + amount;
  });

  var noneGenerator = function noneGenerator() {
      return 'none';
  };
  var inheritGenerator = function inheritGenerator(d) {
      return d.color;
  };

  /**
   * @param {string|Function} instruction
   * @param {string}          [themeKey]
   * @return {Function}
   */
  var getInheritedColorGenerator = function getInheritedColorGenerator(instruction, themeKey) {
      if (instruction === 'none') return noneGenerator;

      if (isFunction(instruction)) return instruction;

      if (instruction === 'theme') {
          if (!themeKey) {
              throw new Error('Cannot use \'theme\' directive without providing \'themeKey\'');
          }

          return function (d, theme) {
              return get(theme, themeKey);
          };
      }

      if (instruction === 'inherit') return inheritGenerator;

      var inheritMatches = instruction.match(/inherit:(darker|brighter)\(([0-9.]+)\)/);
      if (inheritMatches) {
          var method = inheritMatches[1];
          var amount = inheritMatches[2];

          return memoizedColorModifier(method, amount);
      }

      return function () {
          return instruction;
      };
  };

  /**
   * Decompose a color for use with react-motion.
   *
   * @param {string} _color
   * @param {Object} [_config]
   * @return {Object}
   */
  var colorMotionSpring = function colorMotionSpring(_color, _config) {
      var color = d3Color.rgb(_color);

      if (!_config) return {
          colorR: color.r,
          colorG: color.g,
          colorB: color.b
      };

      var config = Object.assign({}, _config, { precision: 1 });

      return {
          colorR: reactMotion.spring(color.r, config),
          colorG: reactMotion.spring(color.g, config),
          colorB: reactMotion.spring(color.b, config)
      };
  };

  /**
   * Re-assemble interpolated color components for easy use.
   *
   * @param {number} colorR
   * @param {number} colorG
   * @param {number} colorB
   * @return {string}
   */
  var getInterpolatedColor = function getInterpolatedColor(_ref) {
      var colorR = _ref.colorR,
          colorG = _ref.colorG,
          colorB = _ref.colorB;
      return 'rgb(' + Math.round(Math.max(colorR, 0)) + ',' + Math.round(Math.max(colorG, 0)) + ',' + Math.round(Math.max(colorB, 0)) + ')';
  };

  var quantizeColorScales = {
      nivo: ['#d76445', '#f47560', '#e8c1a0', '#97e3d5', '#61cdbb', '#00b0a7'],

      // Diverging
      BrBG: last(d3ScaleChromatic.schemeBrBG),
      PRGn: last(d3ScaleChromatic.schemePRGn),
      PiYG: last(d3ScaleChromatic.schemePiYG),
      PuOr: last(d3ScaleChromatic.schemePuOr),
      RdBu: last(d3ScaleChromatic.schemeRdBu),
      RdGy: last(d3ScaleChromatic.schemeRdGy),
      RdYlBu: last(d3ScaleChromatic.schemeRdYlBu),
      RdYlGn: last(d3ScaleChromatic.schemeRdYlGn),
      spectral: last(d3ScaleChromatic.schemeSpectral),

      // Sequential (Single Hue)
      blues: last(d3ScaleChromatic.schemeBlues),
      greens: last(d3ScaleChromatic.schemeGreens),
      greys: last(d3ScaleChromatic.schemeGreys),
      oranges: last(d3ScaleChromatic.schemeOranges),
      purples: last(d3ScaleChromatic.schemePurples),
      reds: last(d3ScaleChromatic.schemeReds),

      // Sequential (Multi-Hue)
      BuGn: last(d3ScaleChromatic.schemeBuGn),
      BuPu: last(d3ScaleChromatic.schemeBuPu),
      GnBu: last(d3ScaleChromatic.schemeGnBu),
      OrRd: last(d3ScaleChromatic.schemeOrRd),
      PuBuGn: last(d3ScaleChromatic.schemePuBuGn),
      PuBu: last(d3ScaleChromatic.schemePuBu),
      PuRd: last(d3ScaleChromatic.schemePuRd),
      RdPu: last(d3ScaleChromatic.schemeRdPu),
      YlGnBu: last(d3ScaleChromatic.schemeYlGnBu),
      YlGn: last(d3ScaleChromatic.schemeYlGn),
      YlOrBr: last(d3ScaleChromatic.schemeYlOrBr),
      YlOrRd: last(d3ScaleChromatic.schemeYlOrRd)
  };

  var quantizeColorScalesKeys = Object.keys(quantizeColorScales);

  var guessQuantizeColorScale = function guessQuantizeColorScale(colors) {
      // colors is already a valid scale
      if (isFunction(colors)) {
          if (!isFunction(colors.domain)) {
              throw new Error('Provided colors should be a valid quantize scale providing a \'domain()\' function');
          }

          return colors;
      }

      if (quantizeColorScales[colors]) {
          // use predefined d3 quantize color scale
          return d3Scale.scaleQuantize().range(quantizeColorScales[colors]);
      }

      // user defined colors
      if (isArray(colors)) return d3Scale.scaleQuantize().range(colors);

      throw new Error('Unable to guess quantize color scale from \'' + colors + '\',\nmust be a function or one of:\n\'' + quantizeColorScalesKeys.join('\', \'') + '\'');
  };

  // used for ordinal color scales
  var colorSchemes = {
      nivo: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5'],
      // categorical
      category10: d3ScaleChromatic.schemeCategory10,
      accent: d3ScaleChromatic.schemeAccent,
      dark2: d3ScaleChromatic.schemeDark2,
      paired: d3ScaleChromatic.schemePaired,
      pastel1: d3ScaleChromatic.schemePastel1,
      pastel2: d3ScaleChromatic.schemePastel2,
      set1: d3ScaleChromatic.schemeSet1,
      set2: d3ScaleChromatic.schemeSet2,
      set3: d3ScaleChromatic.schemeSet3,
      // diverging
      brown_blueGreen: last(d3ScaleChromatic.schemeBrBG),
      purpleRed_green: last(d3ScaleChromatic.schemePRGn),
      pink_yellowGreen: last(d3ScaleChromatic.schemePiYG),
      purple_orange: last(d3ScaleChromatic.schemePuOr),
      red_blue: last(d3ScaleChromatic.schemeRdBu),
      red_grey: last(d3ScaleChromatic.schemeRdGy),
      red_yellow_blue: last(d3ScaleChromatic.schemeRdYlBu),
      red_yellow_green: last(d3ScaleChromatic.schemeRdYlGn),
      spectral: last(d3ScaleChromatic.schemeSpectral),
      // sequential single hue
      blues: last(d3ScaleChromatic.schemeBlues),
      greens: last(d3ScaleChromatic.schemeGreens),
      greys: last(d3ScaleChromatic.schemeGreys),
      oranges: last(d3ScaleChromatic.schemeOranges),
      purples: last(d3ScaleChromatic.schemePurples),
      reds: last(d3ScaleChromatic.schemeReds),
      // sequential multi hue
      blue_green: last(d3ScaleChromatic.schemeBuGn),
      blue_purple: last(d3ScaleChromatic.schemeBuPu),
      green_blue: last(d3ScaleChromatic.schemeGnBu),
      orange_red: last(d3ScaleChromatic.schemeOrRd),
      purple_blue_green: last(d3ScaleChromatic.schemePuBuGn),
      purple_blue: last(d3ScaleChromatic.schemePuBu),
      purple_red: last(d3ScaleChromatic.schemePuRd),
      red_purple: last(d3ScaleChromatic.schemeRdPu),
      yellow_green_blue: last(d3ScaleChromatic.schemeYlGnBu),
      yellow_green: last(d3ScaleChromatic.schemeYlGn),
      yellow_orange_brown: last(d3ScaleChromatic.schemeYlOrBr),
      yellow_orange_red: last(d3ScaleChromatic.schemeYlOrRd)
  };

  var colorSchemeIds = ['nivo',
  // categorical
  'category10', 'accent', 'dark2', 'paired', 'pastel1', 'pastel2', 'set1', 'set2', 'set3',
  // diverging
  'brown_blueGreen', 'purpleRed_green', 'pink_yellowGreen', 'purple_orange', 'red_blue', 'red_grey', 'red_yellow_blue', 'red_yellow_green', 'spectral',
  // sequential single hue
  'blues', 'greens', 'greys', 'oranges', 'purples', 'reds',
  // sequential multi hue
  'blue_green', 'blue_purple', 'green_blue', 'orange_red', 'purple_blue_green', 'purple_blue', 'purple_red', 'red_purple', 'yellow_green_blue', 'yellow_green', 'yellow_orange_brown', 'yellow_orange_red'];

  // used for sequential color scales
  var colorInterpolators = {
      // diverging
      brown_blueGreen: d3ScaleChromatic.interpolateBrBG,
      purpleRed_green: d3ScaleChromatic.interpolatePRGn,
      pink_yellowGreen: d3ScaleChromatic.interpolatePiYG,
      purple_orange: d3ScaleChromatic.interpolatePuOr,
      red_blue: d3ScaleChromatic.interpolateRdBu,
      red_grey: d3ScaleChromatic.interpolateRdGy,
      red_yellow_blue: d3ScaleChromatic.interpolateRdYlBu,
      red_yellow_green: d3ScaleChromatic.interpolateRdYlGn,
      spectral: d3ScaleChromatic.interpolateSpectral,
      // sequential single hue
      blues: d3ScaleChromatic.interpolateBlues,
      greens: d3ScaleChromatic.interpolateGreens,
      greys: d3ScaleChromatic.interpolateGreys,
      oranges: d3ScaleChromatic.interpolateOranges,
      purples: d3ScaleChromatic.interpolatePurples,
      reds: d3ScaleChromatic.interpolateReds,
      // sequential multi hue
      viridis: d3ScaleChromatic.interpolateViridis,
      inferno: d3ScaleChromatic.interpolateInferno,
      magma: d3ScaleChromatic.interpolateMagma,
      plasma: d3ScaleChromatic.interpolatePlasma,
      warm: d3ScaleChromatic.interpolateWarm,
      cool: d3ScaleChromatic.interpolateCool,
      cubehelixDefault: d3ScaleChromatic.interpolateCubehelixDefault,
      blue_green: d3ScaleChromatic.interpolateBuGn,
      blue_purple: d3ScaleChromatic.interpolateBuPu,
      green_blue: d3ScaleChromatic.interpolateGnBu,
      orange_red: d3ScaleChromatic.interpolateOrRd,
      purple_blue_green: d3ScaleChromatic.interpolatePuBuGn,
      purple_blue: d3ScaleChromatic.interpolatePuBu,
      purple_red: d3ScaleChromatic.interpolatePuRd,
      red_purple: d3ScaleChromatic.interpolateRdPu,
      yellow_green_blue: d3ScaleChromatic.interpolateYlGnBu,
      yellow_green: d3ScaleChromatic.interpolateYlGn,
      yellow_orange_brown: d3ScaleChromatic.interpolateYlOrBr,
      yellow_orange_red: d3ScaleChromatic.interpolateYlOrRd,
      // cyclical
      rainbow: d3ScaleChromatic.interpolateRainbow,
      sinebow: d3ScaleChromatic.interpolateSinebow
  };

  var colorInterpolatorIds = [
  // diverging
  'brown_blueGreen', 'purpleRed_green', 'pink_yellowGreen', 'purple_orange', 'red_blue', 'red_grey', 'red_yellow_blue', 'red_yellow_green', 'spectral',
  // sequential single hue
  'blues', 'greens', 'greys', 'oranges', 'purples', 'reds',
  // sequential multi hue
  'viridis', 'inferno', 'magma', 'plasma', 'warm', 'cool', 'cubehelixDefault', 'blue_green', 'blue_purple', 'green_blue', 'orange_red', 'purple_blue_green', 'purple_blue', 'purple_red', 'red_purple', 'yellow_green_blue', 'yellow_green', 'yellow_orange_brown', 'yellow_orange_red',
  // cyclical
  'rainbow', 'sinebow'];

  var ordinalColorScales = {
      category10: d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10),
      accent: d3Scale.scaleOrdinal(d3ScaleChromatic.schemeAccent),
      dark2: d3Scale.scaleOrdinal(d3ScaleChromatic.schemeDark2),
      paired: d3Scale.scaleOrdinal(d3ScaleChromatic.schemePaired),
      pastel1: d3Scale.scaleOrdinal(d3ScaleChromatic.schemePastel1),
      pastel2: d3Scale.scaleOrdinal(d3ScaleChromatic.schemePastel2),
      set1: d3Scale.scaleOrdinal(d3ScaleChromatic.schemeSet1),
      set2: d3Scale.scaleOrdinal(d3ScaleChromatic.schemeSet2),
      set3: d3Scale.scaleOrdinal(d3ScaleChromatic.schemeSet3)
  };

  var nivoCategoricalColors = function nivoCategoricalColors() {
      return d3Scale.scaleOrdinal(['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5']);
  };

  var dataColor = function dataColor(d) {
      return d.color || d.data.color;
  };

  var getColorRange = function getColorRange(instruction) {
      if (instruction === 'data') return dataColor;

      if (instruction === 'nivo') return nivoCategoricalColors();

      if (isFunction(instruction)) return instruction;

      if (ordinalColorScales[instruction]) return ordinalColorScales[instruction];

      if (isArray(instruction)) return d3Scale.scaleOrdinal(instruction);

      return function () {
          return instruction;
      };
  };

  var getColorScale = function getColorScale(colors, dataScale) {
      if (isString(colors)) {
          var scheme = colorSchemes[colors];
          if (scheme !== undefined) {
              var scale = d3Scale.scaleOrdinal(scheme);
              scale.type = 'ordinal';

              return scale;
          }

          if (dataScale !== undefined && colors.indexOf('seq:') === 0) {
              var interpolator = colorInterpolators[colors.slice(4)];
              if (interpolator !== undefined) {
                  var _scale = d3Scale.scaleSequential(interpolator).domain(dataScale.domain());
                  _scale.type = 'sequential';

                  return _scale;
              }
          }
      }

      if (isArray(colors)) {
          var _scale2 = d3Scale.scaleOrdinal(colors);
          _scale2.type = 'ordinal';

          return _scale2;
      }

      // just use provided value,
      // all elements will have identical color
      return function () {
          return colors;
      };
  };

  var getColorsGenerator = function getColorsGenerator(colors, colorBy) {
      // skip range, color should be bound to data
      if (isFunction(colorBy)) return colorBy;

      var scale = void 0;
      var getColorId = function getColorId(d) {
          return get(d, colorBy);
      };

      if (isString(colors) && colorSchemes[colors] !== undefined) {
          scale = d3Scale.scaleOrdinal(colorSchemes[colors]);
          scale.type = 'ordinal';
      } else if (isArray(colors)) {
          // user defined color range
          scale = d3Scale.scaleOrdinal(colors);
          scale.type = 'ordinal';
      } else {
          // just use provided value,
          // all elements will have identical color
          return function () {
              return colors;
          };
      }

      var colorGenerator = function colorGenerator(d) {
          return scale(getColorId(d));
      };
      colorGenerator.type = scale.type;

      return colorGenerator;
  };

  /**
   * This HOC watch colors related props change
   * and returns the corresponding color generator function.
   * Using it prevent from having a new ref each time
   * we pass through the component, useful for shallow comparison.
   */
  var withColors = (function () {
      var _defaultProps, _setPropTypes;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$colorsKey = _ref.colorsKey,
          colorsKey = _ref$colorsKey === undefined ? 'colors' : _ref$colorsKey,
          _ref$colorByKey = _ref.colorByKey,
          colorByKey = _ref$colorByKey === undefined ? 'colorBy' : _ref$colorByKey,
          _ref$destKey = _ref.destKey,
          destKey = _ref$destKey === undefined ? 'getColor' : _ref$destKey,
          _ref$defaultColors = _ref.defaultColors,
          defaultColors = _ref$defaultColors === undefined ? 'nivo' : _ref$defaultColors,
          _ref$defaultColorBy = _ref.defaultColorBy,
          defaultColorBy = _ref$defaultColorBy === undefined ? 'id' : _ref$defaultColorBy;

      return compose(defaultProps((_defaultProps = {}, _defaultProps[colorsKey] = defaultColors, _defaultProps[colorByKey] = defaultColorBy, _defaultProps)), setPropTypes((_setPropTypes = {}, _setPropTypes[colorsKey] = PropTypes.any.isRequired, _setPropTypes[colorByKey] = PropTypes.oneOfType([PropTypes.string, PropTypes.func]), _setPropTypes)), withPropsOnChange([colorsKey, colorByKey], function (props) {
          var _ref2;

          return _ref2 = {}, _ref2[destKey] = getColorsGenerator(props[colorsKey], props[colorByKey]), _ref2;
      }));
  });

  var quantizeColorScalePropType = PropTypes.oneOfType([PropTypes.oneOf(quantizeColorScalesKeys), PropTypes.func, PropTypes.arrayOf(PropTypes.string)]);

  var curvePropMapping = {
      basis: d3Shape.curveBasis,
      basisClosed: d3Shape.curveBasisClosed,
      basisOpen: d3Shape.curveBasisOpen,
      bundle: d3Shape.curveBundle,
      cardinal: d3Shape.curveCardinal,
      cardinalClosed: d3Shape.curveCardinalClosed,
      cardinalOpen: d3Shape.curveCardinalOpen,
      catmullRom: d3Shape.curveCatmullRom,
      catmullRomClosed: d3Shape.curveCatmullRomClosed,
      catmullRomOpen: d3Shape.curveCatmullRomOpen,
      linear: d3Shape.curveLinear,
      linearClosed: d3Shape.curveLinearClosed,
      monotoneX: d3Shape.curveMonotoneX,
      monotoneY: d3Shape.curveMonotoneY,
      natural: d3Shape.curveNatural,
      step: d3Shape.curveStep,
      stepAfter: d3Shape.curveStepAfter,
      stepBefore: d3Shape.curveStepBefore
  };

  var curvePropKeys = Object.keys(curvePropMapping);

  var curvePropType = PropTypes.oneOf(curvePropKeys);

  var closedCurvePropKeys = curvePropKeys.filter(function (c) {
      return c.endsWith('Closed');
  });

  var closedCurvePropType = PropTypes.oneOf(closedCurvePropKeys);

  // Safe curves to be used with d3 area shape generator
  var areaCurvePropKeys = without(curvePropKeys, 'bundle', 'basisClosed', 'basisOpen', 'cardinalClosed', 'cardinalOpen', 'catmullRomClosed', 'catmullRomOpen', 'linearClosed');

  var areaCurvePropType = PropTypes.oneOf(areaCurvePropKeys);

  // Safe curves to be used with d3 line shape generator
  var lineCurvePropKeys = without(curvePropKeys, 'bundle', 'basisClosed', 'basisOpen', 'cardinalClosed', 'cardinalOpen', 'catmullRomClosed', 'catmullRomOpen', 'linearClosed');

  var lineCurvePropType = PropTypes.oneOf(lineCurvePropKeys);

  /**
   * Returns curve interpolator from given identifier.
   *
   * @param {string} id - Curve interpolator identifier
   * @return {Function}
   */
  var curveFromProp = function curveFromProp(id) {
      var curveInterpolator = curvePropMapping[id];
      if (!curveInterpolator) {
          throw new TypeError('\'' + id + '\', is not a valid curve interpolator identifier.');
      }

      return curvePropMapping[id];
  };

  var defsPropTypes = {
      defs: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired
      })).isRequired,
      fill: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired,
          match: PropTypes.oneOfType([PropTypes.oneOf(['*']), PropTypes.object, PropTypes.func]).isRequired
      })).isRequired
  };

  var stackOrderPropMapping = {
      ascending: d3Shape.stackOrderAscending,
      descending: d3Shape.stackOrderDescending,
      insideOut: d3Shape.stackOrderInsideOut,
      none: d3Shape.stackOrderNone,
      reverse: d3Shape.stackOrderReverse
  };

  var stackOrderPropKeys = Object.keys(stackOrderPropMapping);

  var stackOrderPropType = PropTypes.oneOf(stackOrderPropKeys);

  var stackOrderFromProp = function stackOrderFromProp(prop) {
      return stackOrderPropMapping[prop];
  };

  var stackOffsetPropMapping = {
      expand: d3Shape.stackOffsetExpand,
      diverging: d3Shape.stackOffsetDiverging,
      none: d3Shape.stackOffsetNone,
      silhouette: d3Shape.stackOffsetSilhouette,
      wiggle: d3Shape.stackOffsetWiggle
  };

  var stackOffsetPropKeys = Object.keys(stackOffsetPropMapping);

  var stackOffsetPropType = PropTypes.oneOf(stackOffsetPropKeys);

  var stackOffsetFromProp = function stackOffsetFromProp(prop) {
      return stackOffsetPropMapping[prop];
  };

  var treeMapTilePropMapping = {
      binary: d3Hierarchy.treemapBinary,
      dice: d3Hierarchy.treemapDice,
      slice: d3Hierarchy.treemapSlice,
      sliceDice: d3Hierarchy.treemapSliceDice,
      squarify: d3Hierarchy.treemapSquarify,
      resquarify: d3Hierarchy.treemapResquarify
  };

  var treeMapTilePropKeys = Object.keys(treeMapTilePropMapping);

  var treeMapTilePropType = PropTypes.oneOf(treeMapTilePropKeys);

  var treeMapTileFromProp = function treeMapTileFromProp(prop) {
      return treeMapTilePropMapping[prop];
  };

  var scalePropType = PropTypes.shape({
      type: PropTypes.string.isRequired,
      domain: PropTypes.array.isRequired,
      range: PropTypes.array.isRequired
  });

  var marginPropType = PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
  }).isRequired;

  var motionPropTypes = {
      animate: PropTypes.bool.isRequired,
      motionStiffness: PropTypes.number.isRequired,
      motionDamping: PropTypes.number.isRequired
  };

  /**
   * This HOC transform d3 curve interpolation identifier
   * to its corresponding interpolator.
   */
  var withCurve = (function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$srcKey = _ref.srcKey,
          srcKey = _ref$srcKey === undefined ? 'curve' : _ref$srcKey,
          _ref$destKey = _ref.destKey,
          destKey = _ref$destKey === undefined ? 'curveInterpolator' : _ref$destKey;

      return withProps(function (props) {
          var _ref2;

          return _ref2 = {}, _ref2[destKey] = curveFromProp(props[srcKey]), _ref2;
      });
  });

  // motion
  var defaultAnimate = true;
  var defaultMotionStiffness = 90;
  var defaultMotionDamping = 13;

  // colors
  var defaultCategoricalColors = nivoCategoricalColors;
  var defaultColorRange = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeSet3);

  // margin
  var defaultMargin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
  };

  /**
   * This HOC watch width, height & margin props change
   * and returns new width/height plus outer dimensions.
   * Using it prevent from having a new ref each time
   * we pass through the component, useful for shallow comparison.
   * It also add required propTypes & set default margin.
   */
  var withDimensions = (function () {
      return compose(defaultProps({
          margin: defaultMargin
      }), setPropTypes({
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
          margin: marginPropType
      }), withPropsOnChange(function (props, nextProps) {
          return props.width !== nextProps.width || props.height !== nextProps.height || !isEqual(props.margin, nextProps.margin);
      }, function (props) {
          var margin = Object.assign({}, defaultMargin, props.margin);

          return {
              margin: margin,
              width: props.width - margin.left - margin.right,
              height: props.height - margin.top - margin.bottom,
              outerWidth: props.width,
              outerHeight: props.height
          };
      }));
  });

  var getLabelGenerator = function getLabelGenerator(_label, labelFormat) {
      var getRawLabel = isFunction(_label) ? _label : function (d) {
          return get(d, _label);
      };
      var formatter = void 0;
      if (labelFormat) {
          formatter = isFunction(labelFormat) ? labelFormat : d3Format.format(labelFormat);
      }

      if (formatter) return function (d) {
          return formatter(getRawLabel(d));
      };
      return getRawLabel;
  };

  var getAccessorFor = function getAccessorFor(directive) {
      return isFunction(directive) ? directive : function (d) {
          return d[directive];
      };
  };

  var getAccessorOrValue = function getAccessorOrValue(value) {
      return isFunction(value) ? value : function () {
          return value;
      };
  };

  /**
   * This HOC watch hierarchical data props change
   * and returns the corresponding summed hierarchy.
   * Using it prevent from having a new ref each time
   * we pass through the component, useful for shallow comparison.
   */
  var withHierarchy = (function () {
      var _defaultProps, _setPropTypes;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$srcKey = _ref.srcKey,
          srcKey = _ref$srcKey === undefined ? 'root' : _ref$srcKey,
          _ref$destKey = _ref.destKey,
          destKey = _ref$destKey === undefined ? 'root' : _ref$destKey,
          _ref$valueKey = _ref.valueKey,
          valueKey = _ref$valueKey === undefined ? 'value' : _ref$valueKey,
          _ref$valueDefault = _ref.valueDefault,
          valueDefault = _ref$valueDefault === undefined ? 'value' : _ref$valueDefault;

      return compose(defaultProps((_defaultProps = {}, _defaultProps[valueKey] = valueDefault, _defaultProps)), setPropTypes((_setPropTypes = {}, _setPropTypes[srcKey] = PropTypes.object.isRequired, _setPropTypes[valueKey] = PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired, _setPropTypes)), withPropsOnChange([srcKey, valueKey], function (props) {
          var _ref2;

          return _ref2 = {}, _ref2[destKey] = d3Hierarchy.hierarchy(props[srcKey]).sum(getAccessorFor(props[valueKey])), _ref2;
      }));
  });

  var withMotion = (function () {
      return compose(setPropTypes(motionPropTypes), defaultProps({
          animate: defaultAnimate,
          motionDamping: defaultMotionDamping,
          motionStiffness: defaultMotionStiffness
      }), withPropsOnChange(['motionDamping', 'motionStiffness'], function (_ref) {
          var motionDamping = _ref.motionDamping,
              motionStiffness = _ref.motionStiffness;
          return {
              boundSpring: partialRight(reactMotion.spring, {
                  damping: motionDamping,
                  stiffness: motionStiffness
              })
          };
      }));
  });

  /**
   * This HOC watch theme prop change
   * and returns it deeply merged with default theme.
   * Using it prevent from having a new ref each time
   * we pass through the component, useful for shallow comparison.
   */
  var withTheme = (function () {
      var _setPropTypes;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$srcKey = _ref.srcKey,
          srcKey = _ref$srcKey === undefined ? 'theme' : _ref$srcKey,
          _ref$destKey = _ref.destKey,
          destKey = _ref$destKey === undefined ? 'theme' : _ref$destKey;

      return compose(setPropTypes((_setPropTypes = {}, _setPropTypes[srcKey] = PropTypes.object, _setPropTypes)), withPropsOnChange([srcKey], function (props) {
          var _ref2;

          return _ref2 = {}, _ref2[destKey] = merge({}, defaultTheme, props[srcKey]), _ref2;
      }));
  });

  var horizontalPositions = ['top', 'bottom'];
  var verticalPositions = ['left', 'right'];

  /**
   * @param {Object} scale
   *
   * @return {Object} centered scale
   */
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

  /**
   * @param {Object} scale
   * @param {number} [tickCount]
   *
   * @return {Array.<number|string>}
   */
  var getScaleValues = function getScaleValues(scale, tickCount) {
      if (scale.ticks) return scale.ticks(tickCount);
      return scale.domain();
  };

  /**
   * @typedef {Object} AxisTick
   * @param {number} x
   * @param {number} y
   * @param {number} lineX
   * @param {number} lineY
   * @param {number} textX
   * @param {number} textY
   */

  /**
   * @param {number}                       width
   * @param {number}                       height
   * @param {string}                       _position
   * @param {Object}                       scale
   * @param {number|Array.<string|number>} [_tickValues]
   * @param {number}                       [tickSize=5]
   * @param {number}                       [tickPadding=5]
   * @param {number}                       [tickRotation=0]
   * @parem {string}                       [engine='svg']
   *
   * @return {{ x: number, y: number, ticks: Array.<AxisTick>, textAlign: string, textBaseline: string }}
   */
  var computeAxisTicks = function computeAxisTicks(_ref) {
      var width = _ref.width,
          height = _ref.height,
          _position = _ref.position,
          scale = _ref.scale,
          _tickValues = _ref.tickValues,
          _ref$tickSize = _ref.tickSize,
          tickSize = _ref$tickSize === undefined ? 5 : _ref$tickSize,
          _ref$tickPadding = _ref.tickPadding,
          tickPadding = _ref$tickPadding === undefined ? 5 : _ref$tickPadding,
          _ref$tickRotation = _ref.tickRotation,
          tickRotation = _ref$tickRotation === undefined ? 0 : _ref$tickRotation,
          _ref$engine = _ref.engine,
          engine = _ref$engine === undefined ? 'svg' : _ref$engine;

      var tickValues = isArray(_tickValues) ? _tickValues : undefined;
      var tickCount = isNumber(_tickValues) ? _tickValues : undefined;

      var values = tickValues || getScaleValues(scale, tickCount);

      var textProps = textPropsByEngine[engine];

      var orient = _position;
      var position = scale.bandwidth ? centerScale(scale) : scale;
      var line = { lineX: 0, lineY: 0 };
      var text = { textX: 0, textY: 0 };

      var x = 0;
      var y = 0;
      var translate = void 0;
      var textAlign = textProps.align.center;
      var textBaseline = textProps.baseline.center;

      if (horizontalPositions.includes(orient)) {
          translate = function translate(d) {
              return { x: position(d), y: 0 };
          };

          line.lineY = tickSize * (orient === 'bottom' ? 1 : -1);
          text.textY = (tickSize + tickPadding) * (orient === 'bottom' ? 1 : -1);

          if (orient === 'bottom') {
              y = height;
              textBaseline = textProps.baseline.top;
          } else {
              textBaseline = textProps.baseline.bottom;
          }

          if (tickRotation === 0) {
              textAlign = textProps.align.center;
          } else if (orient === 'bottom' && tickRotation < 0 || orient === 'top' && tickRotation > 0) {
              textAlign = textProps.align.right;
              textBaseline = textProps.baseline.center;
          } else if (orient === 'bottom' && tickRotation > 0 || orient === 'top' && tickRotation < 0) {
              textAlign = textProps.align.left;
              textBaseline = textProps.baseline.center;
          }
      } else if (verticalPositions.includes(orient)) {
          translate = function translate(d) {
              return { x: 0, y: position(d) };
          };

          line.lineX = tickSize * (orient === 'right' ? 1 : -1);
          text.textX = (tickSize + tickPadding) * (orient === 'right' ? 1 : -1);

          if (orient === 'right') {
              x = width;
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
          x: x,
          y: y,
          ticks: ticks,
          textAlign: textAlign,
          textBaseline: textBaseline
      };
  };

  /**
   * @param {number} width
   * @param {number} height
   * @param {Object} scale
   * @param {string} axis
   *
   * @return {Array.<Object>}
   */
  var computeGridLines = function computeGridLines(_ref2) {
      var width = _ref2.width,
          height = _ref2.height,
          scale = _ref2.scale,
          axis = _ref2.axis,
          _ref2$values = _ref2.values,
          values = _ref2$values === undefined ? getScaleValues(scale) : _ref2$values;

      var position = scale.bandwidth ? centerScale(scale) : scale;

      var lines = void 0;
      if (axis === 'x') {
          lines = values.map(function (v) {
              return {
                  key: '' + v,
                  x1: position(v),
                  x2: position(v),
                  y1: 0,
                  y2: height
              };
          });
      } else if (axis === 'y') {
          lines = values.map(function (v) {
              return {
                  key: '' + v,
                  x1: 0,
                  x2: width,
                  y1: position(v),
                  y2: position(v)
              };
          });
      }

      return lines;
  };

  var AxisTick = function (_Component) {
      inherits(AxisTick, _Component);

      function AxisTick() {
          classCallCheck(this, AxisTick);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
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
  }(React.Component);

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
          axis: axisThemePropType.isRequired
      }).isRequired
  };
  AxisTick.defaultProps = {
      opacity: 1,
      rotate: 0
  };

  var axisPositions = ['top', 'right', 'bottom', 'left'];
  var legendPositions = ['start', 'center', 'end'];

  var axisPropType = PropTypes.shape({
      orient: PropTypes.oneOf(axisPositions),

      tickValues: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]))]),
      tickSize: PropTypes.number,
      tickPadding: PropTypes.number,
      tickRotation: PropTypes.number,
      format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

      legend: PropTypes.node,
      legendPosition: PropTypes.oneOf(legendPositions),
      legendOffset: PropTypes.number
  });

  var willEnter = function willEnter() {
      return {
          opacity: 0,
          x: 0,
          y: 0
      };
  };

  var willLeave = function willLeave(springConfig) {
      return function (_ref) {
          var _ref$style = _ref.style,
              x = _ref$style.x,
              y = _ref$style.y;
          return {
              opacity: reactMotion.spring(0, springConfig),
              x: reactMotion.spring(x.val, springConfig),
              y: reactMotion.spring(y.val, springConfig)
          };
      };
  };

  var Axis = function Axis(_ref2) {
      var scale = _ref2.scale,
          width = _ref2.width,
          height = _ref2.height,
          _position = _ref2.position,
          tickValues = _ref2.tickValues,
          tickSize = _ref2.tickSize,
          tickPadding = _ref2.tickPadding,
          tickRotation = _ref2.tickRotation,
          format = _ref2.format,
          _legend = _ref2.legend,
          legendPosition = _ref2.legendPosition,
          legendOffset = _ref2.legendOffset,
          theme = _ref2.theme,
          animate = _ref2.animate,
          motionStiffness = _ref2.motionStiffness,
          motionDamping = _ref2.motionDamping,
          onClick = _ref2.onClick;

      var _computeAxisTicks = computeAxisTicks({
          width: width,
          height: height,
          scale: scale,
          position: _position,
          tickValues: tickValues,
          tickSize: tickSize,
          tickPadding: tickPadding,
          tickRotation: tickRotation
      }),
          x = _computeAxisTicks.x,
          y = _computeAxisTicks.y,
          ticks = _computeAxisTicks.ticks,
          textAlign = _computeAxisTicks.textAlign,
          textBaseline = _computeAxisTicks.textBaseline;

      var isHorizontal = ['top', 'bottom'].includes(_position);
      var isVertical = !isHorizontal;

      var legend = null;
      if (_legend !== undefined) {
          var legendX = 0;
          var legendY = 0;
          var legendRotation = 0;
          var textAnchor = void 0;

          if (isVertical) {
              legendRotation = -90;
              legendX = legendOffset;
              if (legendPosition === 'start') {
                  textAnchor = 'start';
                  legendY = height;
              } else if (legendPosition === 'center') {
                  textAnchor = 'middle';
                  legendY = height / 2;
              } else if (legendPosition === 'end') {
                  textAnchor = 'end';
              }
          } else {
              legendY = legendOffset;
              if (legendPosition === 'start') {
                  textAnchor = 'start';
              } else if (legendPosition === 'center') {
                  textAnchor = 'middle';
                  legendX = width / 2;
              } else if (legendPosition === 'end') {
                  textAnchor = 'end';
                  legendX = width;
              }
          }

          legend = React__default.createElement(
              'text',
              {
                  transform: 'translate(' + legendX + ', ' + legendY + ') rotate(' + legendRotation + ')',
                  textAnchor: textAnchor,
                  style: theme.axis.legend.text
              },
              _legend
          );
      }

      var tickElements = void 0;
      if (!animate) {
          tickElements = React__default.createElement(
              'g',
              null,
              ticks.map(function (tick) {
                  return React__default.createElement(AxisTick, _extends({
                      key: tick.key,
                      value: tick.key,
                      format: format,
                      lineX: tick.lineX,
                      lineY: tick.lineY,
                      rotate: tickRotation,
                      textX: tick.textX,
                      textY: tick.textY,
                      textBaseline: textBaseline,
                      textAnchor: textAlign,
                      theme: theme,
                      x: tick.x,
                      y: tick.y
                  }, onClick ? { onClick: onClick } : {}));
              })
          );
      } else {
          var springConfig = {
              stiffness: motionStiffness,
              damping: motionDamping
          };

          tickElements = React__default.createElement(
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
                              y: reactMotion.spring(tick.y, springConfig)
                          }
                      };
                  })
              },
              function (interpolatedStyles) {
                  return React__default.createElement(
                      'g',
                      null,
                      interpolatedStyles.map(function (_ref3) {
                          var key = _ref3.key,
                              style = _ref3.style,
                              tick = _ref3.data;
                          return React__default.createElement(AxisTick, _extends({
                              key: key,
                              value: key,
                              format: format,
                              lineX: tick.lineX,
                              lineY: tick.lineY,
                              rotate: tickRotation,
                              textX: tick.textX,
                              textY: tick.textY,
                              textBaseline: textBaseline,
                              textAnchor: textAlign,
                              theme: theme
                          }, onClick ? { onClick: onClick } : {}, style));
                      })
                  );
              }
          );
      }

      return React__default.createElement(
          'g',
          { transform: 'translate(' + x + ',' + y + ')' },
          legend,
          tickElements,
          React__default.createElement('line', {
              style: theme.axis.domain.line,
              x1: 0,
              x2: isHorizontal ? width : 0,
              y1: 0,
              y2: isHorizontal ? 0 : height
          })
      );
  };

  Axis.propTypes = _extends({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      position: PropTypes.oneOf(axisPositions).isRequired,
      scale: PropTypes.func.isRequired,

      tickValues: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]))]),
      tickSize: PropTypes.number.isRequired,
      tickPadding: PropTypes.number.isRequired,
      tickRotation: PropTypes.number.isRequired,
      format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

      legend: PropTypes.node,
      legendPosition: PropTypes.oneOf(legendPositions).isRequired,
      legendOffset: PropTypes.number.isRequired,

      theme: PropTypes.shape({
          axis: axisThemePropType.isRequired
      }).isRequired,

      onClick: PropTypes.func

  }, motionPropTypes);

  Axis.defaultProps = {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,

      legendPosition: 'end',
      legendOffset: 0
  };

  var enhance$1 = compose(withMotion(), withPropsOnChange(['format', 'scale'], function (_ref4) {
      var format = _ref4.format,
          scale = _ref4.scale;

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

  var Axis$1 = enhance$1(Axis);

  var horizontalPositions$1 = ['top', 'bottom'];
  var verticalPositions$1 = ['left', 'right'];
  var positions = [].concat(horizontalPositions$1, verticalPositions$1);

  var Axes = function Axes(_ref) {
      var xScale = _ref.xScale,
          yScale = _ref.yScale,
          width = _ref.width,
          height = _ref.height,
          top = _ref.top,
          right = _ref.right,
          bottom = _ref.bottom,
          left = _ref.left,
          theme = _ref.theme,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping;

      var axes = { top: top, right: right, bottom: bottom, left: left };

      return React__default.createElement(
          'g',
          null,
          positions.map(function (position) {
              var axis = axes[position];

              if (!axis) return null;

              var scale = horizontalPositions$1.includes(position) ? xScale : yScale;

              return React__default.createElement(Axis$1, _extends({
                  theme: theme
              }, axis, {
                  key: position,
                  width: width,
                  height: height,
                  position: position,
                  scale: scale,
                  animate: animate,
                  motionDamping: motionDamping,
                  motionStiffness: motionStiffness
              }));
          })
      );
  };

  Axes.propTypes = _extends({
      xScale: PropTypes.func.isRequired,
      yScale: PropTypes.func.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,

      top: axisPropType,
      right: axisPropType,
      bottom: axisPropType,
      left: axisPropType,

      theme: PropTypes.shape({
          axis: axisThemePropType.isRequired
      }).isRequired

  }, motionPropTypes);

  var Axes$1 = shouldUpdate(function (props, nextProps) {
      return props.xScale !== nextProps.xScale || props.yScale !== nextProps.yScale || props.width !== nextProps.width || props.height !== nextProps.height || props.theme !== nextProps.theme || props.animate !== nextProps.animate || props.motionDamping !== nextProps.motionDamping || props.motionStiffness !== nextProps.motionStiffness || !isEqual(props.top, nextProps.top) || !isEqual(props.right, nextProps.right) || !isEqual(props.bottom, nextProps.bottom) || !isEqual(props.left, nextProps.left);
  })(Axes);

  var GridLine = function GridLine(props) {
      return React__default.createElement('line', props);
  };

  GridLine.propTypes = {
      x1: PropTypes.number.isRequired,
      x2: PropTypes.number.isRequired,
      y1: PropTypes.number.isRequired,
      y2: PropTypes.number.isRequired
  };

  GridLine.defaultProps = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0
  };

  var GridLines = function (_Component) {
      inherits(GridLines, _Component);

      function GridLines(props) {
          classCallCheck(this, GridLines);

          var _this = possibleConstructorReturn(this, _Component.call(this, props));

          _this.willEnter = _this.willEnter.bind(_this);
          _this.willLeave = _this.willLeave.bind(_this);
          return _this;
      }

      GridLines.prototype.willEnter = function willEnter(_ref) {
          var style = _ref.style;
          var type = this.props.type;


          return {
              opacity: 0,
              x1: type === 'x' ? 0 : style.x1.val,
              x2: type === 'x' ? 0 : style.x2.val,
              y1: type === 'y' ? 0 : style.y1.val,
              y2: type === 'y' ? 0 : style.y2.val
          };
      };

      GridLines.prototype.willLeave = function willLeave(_ref2) {
          var style = _ref2.style;
          var _props = this.props,
              motionStiffness = _props.motionStiffness,
              motionDamping = _props.motionDamping;

          var springConfig = {
              stiffness: motionStiffness,
              damping: motionDamping
          };

          return {
              opacity: reactMotion.spring(0, springConfig),
              x1: reactMotion.spring(style.x1.val, springConfig),
              x2: reactMotion.spring(style.x2.val, springConfig),
              y1: reactMotion.spring(style.y1.val, springConfig),
              y2: reactMotion.spring(style.y2.val, springConfig)
          };
      };

      GridLines.prototype.render = function render() {
          var _props2 = this.props,
              lines = _props2.lines,
              animate = _props2.animate,
              motionStiffness = _props2.motionStiffness,
              motionDamping = _props2.motionDamping,
              theme = _props2.theme;


          if (!animate) {
              return React__default.createElement(
                  'g',
                  null,
                  lines.map(function (line) {
                      return React__default.createElement(GridLine, _extends({ key: line.key }, line, theme.grid.line));
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
                  willEnter: this.willEnter,
                  willLeave: this.willLeave,
                  styles: lines.map(function (line) {
                      return {
                          key: line.key,
                          style: {
                              opacity: reactMotion.spring(1, springConfig),
                              x1: reactMotion.spring(line.x1 || 0, springConfig),
                              x2: reactMotion.spring(line.x2 || 0, springConfig),
                              y1: reactMotion.spring(line.y1 || 0, springConfig),
                              y2: reactMotion.spring(line.y2 || 0, springConfig)
                          }
                      };
                  })
              },
              function (interpolatedStyles) {
                  return React__default.createElement(
                      'g',
                      null,
                      interpolatedStyles.map(function (interpolatedStyle) {
                          var key = interpolatedStyle.key,
                              style = interpolatedStyle.style;


                          return React__default.createElement(GridLine, _extends({ key: key }, theme.grid.line, style));
                      })
                  );
              }
          );
      };

      return GridLines;
  }(React.Component);

  GridLines.propTypes = {
      type: PropTypes.oneOf(['x', 'y']).isRequired,
      lines: PropTypes.arrayOf(PropTypes.shape({
          key: PropTypes.string.isRequired,
          x1: PropTypes.number,
          x2: PropTypes.number,
          y1: PropTypes.number,
          y2: PropTypes.number
      })).isRequired,
      theme: PropTypes.object.isRequired,
      // motion
      animate: PropTypes.bool.isRequired,
      motionStiffness: PropTypes.number.isRequired,
      motionDamping: PropTypes.number.isRequired
  };

  var Grid = function Grid(_ref) {
      var width = _ref.width,
          height = _ref.height,
          xScale = _ref.xScale,
          yScale = _ref.yScale,
          xValues = _ref.xValues,
          yValues = _ref.yValues,
          theme = _ref.theme,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping;

      var xLines = xScale ? computeGridLines({
          width: width,
          height: height,
          scale: xScale,
          axis: 'x',
          values: xValues
      }) : false;

      var yLines = yScale ? computeGridLines({
          width: width,
          height: height,
          scale: yScale,
          axis: 'y',
          values: yValues
      }) : false;

      return React__default.createElement(
          'g',
          null,
          xLines && React__default.createElement(GridLines, {
              type: 'x',
              lines: xLines,
              theme: theme,
              animate: animate,
              motionStiffness: motionStiffness,
              motionDamping: motionDamping
          }),
          yLines && React__default.createElement(GridLines, {
              type: 'y',
              lines: yLines,
              theme: theme,
              animate: animate,
              motionStiffness: motionStiffness,
              motionDamping: motionDamping
          })
      );
  };

  Grid.propTypes = _extends({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,

      xScale: PropTypes.func,
      yScale: PropTypes.func,
      xValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      yValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),

      theme: PropTypes.object.isRequired

  }, motionPropTypes);

  Grid.defaultProps = {
      // motion
      animate: true,
      motionStiffness: defaultMotionStiffness,
      motionDamping: defaultMotionDamping
  };

  var Grid$1 = pure(Grid);

  /**
   *
   * @param {string} axis
   * @param {number} width
   * @param {number} height
   * @param {string} position
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {string} orientation
   * @return {{ x: number, y: number, textAnchor: string }}
   */
  var computeLabel = function computeLabel(_ref) {
      var axis = _ref.axis,
          width = _ref.width,
          height = _ref.height,
          position = _ref.position,
          offsetX = _ref.offsetX,
          offsetY = _ref.offsetY,
          orientation = _ref.orientation;

      var x = 0;
      var y = 0;
      var rotation = orientation === 'vertical' ? -90 : 0;
      var textAnchor = 'start';

      if (axis === 'x') {
          switch (position) {
              case 'top-left':
                  x = -offsetX;
                  y = offsetY;
                  textAnchor = 'end';
                  break;
              case 'top':
                  y = -offsetY;
                  if (orientation === 'horizontal') {
                      textAnchor = 'middle';
                  } else {
                      textAnchor = 'start';
                  }
                  break;
              case 'top-right':
                  x = offsetX;
                  y = offsetY;
                  if (orientation === 'horizontal') {
                      textAnchor = 'start';
                  } else {
                      textAnchor = 'end';
                  }
                  break;
              case 'right':
                  x = offsetX;
                  y = height / 2;
                  if (orientation === 'horizontal') {
                      textAnchor = 'start';
                  } else {
                      textAnchor = 'middle';
                  }
                  break;
              case 'bottom-right':
                  x = offsetX;
                  y = height - offsetY;
                  textAnchor = 'start';
                  break;
              case 'bottom':
                  y = height + offsetY;
                  if (orientation === 'horizontal') {
                      textAnchor = 'middle';
                  } else {
                      textAnchor = 'end';
                  }
                  break;
              case 'bottom-left':
                  y = height - offsetY;
                  x = -offsetX;
                  if (orientation === 'horizontal') {
                      textAnchor = 'end';
                  } else {
                      textAnchor = 'start';
                  }
                  break;
              case 'left':
                  x = -offsetX;
                  y = height / 2;
                  if (orientation === 'horizontal') {
                      textAnchor = 'end';
                  } else {
                      textAnchor = 'middle';
                  }
                  break;
          }
      } else {
          switch (position) {
              case 'top-left':
                  x = offsetX;
                  y = -offsetY;
                  textAnchor = 'start';
                  break;
              case 'top':
                  x = width / 2;
                  y = -offsetY;
                  if (orientation === 'horizontal') {
                      textAnchor = 'middle';
                  } else {
                      textAnchor = 'start';
                  }
                  break;
              case 'top-right':
                  x = width - offsetX;
                  y = -offsetY;
                  if (orientation === 'horizontal') {
                      textAnchor = 'end';
                  } else {
                      textAnchor = 'start';
                  }
                  break;
              case 'right':
                  x = width + offsetX;
                  if (orientation === 'horizontal') {
                      textAnchor = 'start';
                  } else {
                      textAnchor = 'middle';
                  }
                  break;
              case 'bottom-right':
                  x = width - offsetX;
                  y = offsetY;
                  textAnchor = 'end';
                  break;
              case 'bottom':
                  x = width / 2;
                  y = offsetY;
                  if (orientation === 'horizontal') {
                      textAnchor = 'middle';
                  } else {
                      textAnchor = 'end';
                  }
                  break;
              case 'bottom-left':
                  x = offsetX;
                  y = offsetY;
                  if (orientation === 'horizontal') {
                      textAnchor = 'start';
                  } else {
                      textAnchor = 'end';
                  }
                  break;
              case 'left':
                  x = -offsetX;
                  if (orientation === 'horizontal') {
                      textAnchor = 'end';
                  } else {
                      textAnchor = 'middle';
                  }
                  break;
          }
      }

      return { x: x, y: y, rotation: rotation, textAnchor: textAnchor };
  };

  var CartesianMarkersItem = function CartesianMarkersItem(_ref2) {
      var width = _ref2.width,
          height = _ref2.height,
          axis = _ref2.axis,
          scale = _ref2.scale,
          value = _ref2.value,
          theme = _ref2.theme,
          lineStyle = _ref2.lineStyle,
          textStyle = _ref2.textStyle,
          legend = _ref2.legend,
          legendPosition = _ref2.legendPosition,
          legendOffsetX = _ref2.legendOffsetX,
          legendOffsetY = _ref2.legendOffsetY,
          legendOrientation = _ref2.legendOrientation;

      var x = 0;
      var x2 = 0;
      var y = 0;
      var y2 = 0;

      if (axis === 'y') {
          y = scale(value);
          x2 = width;
      } else {
          x = scale(value);
          y2 = height;
      }

      var legendNode = null;
      if (legend) {
          var legendProps = computeLabel({
              axis: axis,
              width: width,
              height: height,
              position: legendPosition,
              offsetX: legendOffsetX,
              offsetY: legendOffsetY,
              orientation: legendOrientation
          });
          legendNode = React__default.createElement(
              'text',
              {
                  transform: 'translate(' + legendProps.x + ', ' + legendProps.y + ') rotate(' + legendProps.rotation + ')',
                  textAnchor: legendProps.textAnchor,
                  alignmentBaseline: 'central',
                  style: textStyle
              },
              legend
          );
      }

      return React__default.createElement(
          'g',
          { transform: 'translate(' + x + ', ' + y + ')' },
          React__default.createElement('line', {
              x1: 0,
              x2: x2,
              y1: 0,
              y2: y2,
              stroke: theme.markers.lineColor,
              strokeWidth: theme.markers.lineStrokeWidth,
              style: lineStyle
          }),
          legendNode
      );
  };

  CartesianMarkersItem.propTypes = {
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,

      axis: PropTypes.oneOf(['x', 'y']).isRequired,
      scale: PropTypes.func.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      lineStyle: PropTypes.object,
      textStyle: PropTypes.object,

      legend: PropTypes.string,
      legendPosition: PropTypes.oneOf(['top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left']),
      legendOffsetX: PropTypes.number.isRequired,
      legendOffsetY: PropTypes.number.isRequired,
      legendOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,

      theme: PropTypes.shape({
          markers: PropTypes.shape({
              textColor: PropTypes.string.isRequired,
              fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
          }).isRequired
      }).isRequired
  };

  CartesianMarkersItem.defaultProps = {
      legendPosition: 'top-right',
      legendOffsetX: 14,
      legendOffsetY: 14,
      legendOrientation: 'horizontal'
  };

  var CartesianMarkersItem$1 = pure(CartesianMarkersItem);

  var CartesianMarkers = function CartesianMarkers(_ref) {
      var markers = _ref.markers,
          width = _ref.width,
          height = _ref.height,
          xScale = _ref.xScale,
          yScale = _ref.yScale,
          theme = _ref.theme;

      if (!markers || markers.length === 0) return null;

      return React__default.createElement(
          'g',
          null,
          markers.map(function (marker, i) {
              return React__default.createElement(CartesianMarkersItem$1, _extends({
                  key: i
              }, marker, {
                  width: width,
                  height: height,
                  scale: marker.axis === 'y' ? yScale : xScale,
                  theme: theme
              }));
          })
      );
  };

  CartesianMarkers.propTypes = {
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,

      xScale: PropTypes.func.isRequired,
      yScale: PropTypes.func.isRequired,

      theme: PropTypes.shape({
          markers: PropTypes.shape({
              lineColor: PropTypes.string.isRequired,
              lineStrokeWidth: PropTypes.number.isRequired,
              textColor: PropTypes.string.isRequired,
              fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
          }).isRequired
      }).isRequired,

      markers: PropTypes.arrayOf(PropTypes.shape({
          axis: PropTypes.oneOf(['x', 'y']).isRequired,
          value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
          style: PropTypes.object
      }))
  };

  var CartesianMarkers$1 = pure(CartesianMarkers);

  /**
   * Computes distance between two points.
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {number}
   */
  var getDistance = function getDistance(x1, y1, x2, y2) {
      var deltaX = x2 - x1;
      var deltaY = y2 - y1;

      deltaX *= deltaX;
      deltaY *= deltaY;

      return Math.sqrt(deltaX + deltaY);
  };

  /**
   * Computes angle (radians) between two points.
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {number}
   */
  var getAngle = function getAngle(x1, y1, x2, y2) {
      var angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI / 2;

      return angle > 0 ? angle : Math.PI * 2 + angle;
  };

  /**
   * Check if cursor is in given rectangle.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} cursorX
   * @param {number} cursorY
   * @return {boolean}
   */
  var isCursorInRect = function isCursorInRect(x, y, width, height, cursorX, cursorY) {
      return x <= cursorX && cursorX <= x + width && y <= cursorY && cursorY <= y + height;
  };

  /**
   * Check if cursor is in given ring.
   *
   * @param {number} centerX
   * @param {number} centerY
   * @param {number} radius
   * @param {number} innerRadius
   * @param {number} cursorX
   * @param {number} cursorY
   * @return {boolean}
   */
  var isCursorInRing = function isCursorInRing(centerX, centerY, radius, innerRadius, cursorX, cursorY) {
      var distance = getDistance(cursorX, cursorY, centerX, centerY);

      return distance < radius && distance > innerRadius;
  };

  /**
   * Search for an arc being under cursor.
   *
   * @param {number}         centerX
   * @param {number}         centerY
   * @param {number}         radius
   * @param {number}         innerRadius
   * @param {Array.<Object>} arcs
   * @param {number}         cursorX
   * @param {number}         cursorY
   * @return {*}
   */
  var getHoveredArc = function getHoveredArc(centerX, centerY, radius, innerRadius, arcs, cursorX, cursorY) {
      if (!isCursorInRing(centerX, centerY, radius, innerRadius, cursorX, cursorY)) return null;

      var cursorAngle = getAngle(cursorX, cursorY, centerX, centerY);

      return arcs.find(function (_ref) {
          var startAngle = _ref.startAngle,
              endAngle = _ref.endAngle;
          return cursorAngle >= startAngle && cursorAngle < endAngle;
      });
  };

  var getRelativeCursor = function getRelativeCursor(el, event) {
      var clientX = event.clientX,
          clientY = event.clientY;

      var bounds = el.getBoundingClientRect();

      return [clientX - bounds.left, clientY - bounds.top];
  };

  var horizontalPositions$2 = ['top', 'bottom'];
  var positions$1 = ['top', 'right', 'bottom', 'left'];

  var renderAxisToCanvas = function renderAxisToCanvas(ctx, _ref) {
      var width = _ref.width,
          height = _ref.height,
          position = _ref.position,
          scale = _ref.scale,
          _ref$tickSize = _ref.tickSize,
          tickSize = _ref$tickSize === undefined ? 5 : _ref$tickSize,
          _ref$tickPadding = _ref.tickPadding,
          tickPadding = _ref$tickPadding === undefined ? 5 : _ref$tickPadding,
          _ref$tickRotation = _ref.tickRotation,
          tickRotation = _ref$tickRotation === undefined ? 0 : _ref$tickRotation,
          format = _ref.format,
          theme = _ref.theme;

      var _computeAxisTicks = computeAxisTicks({
          width: width,
          height: height,
          position: position,
          scale: scale,
          tickSize: tickSize,
          tickPadding: tickPadding,
          tickRotation: tickRotation,
          engine: 'canvas'
      }),
          x = _computeAxisTicks.x,
          y = _computeAxisTicks.y,
          ticks = _computeAxisTicks.ticks,
          textAlign = _computeAxisTicks.textAlign,
          textBaseline = _computeAxisTicks.textBaseline;

      ctx.save();
      ctx.translate(x, y);
      ctx.textAlign = textAlign;
      ctx.textBaseline = textBaseline;
      ctx.font = theme.axis.ticks.text.fontSize + 'px sans-serif';

      ticks.forEach(function (tick) {
          ctx.lineWidth = theme.axis.ticks.line.strokeWidth;
          ctx.strokeStyle = theme.axis.ticks.line.stroke;
          ctx.beginPath();
          ctx.moveTo(tick.x, tick.y);
          ctx.lineTo(tick.x + tick.lineX, tick.y + tick.lineY);
          ctx.stroke();

          var value = format !== undefined ? format(tick.value) : tick.value;

          ctx.save();
          ctx.translate(tick.x + tick.textX, tick.y + tick.textY);
          ctx.rotate(degreesToRadians(tickRotation));
          ctx.fillStyle = theme.axis.ticks.text.fill;
          ctx.fillText(value, 0, 0);
          ctx.restore();
      });

      ctx.restore();
  };

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

      var axes = { top: top, right: right, bottom: bottom, left: left };

      positions$1.map(function (position) {
          if (!axes[position]) return null;

          var axis = axes[position];
          var scale = horizontalPositions$2.includes(position) ? xScale : yScale;

          renderAxisToCanvas(ctx, _extends({}, axis, {
              width: width,
              height: height,
              position: position,
              scale: scale,
              theme: theme
          }));
      });
  };

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number}                   width
   * @param {number}                   height
   * @param {number}                   scale
   * @param {('x'|'y')}                axis
   */
  var renderGridLinesToCanvas = function renderGridLinesToCanvas(ctx, _ref3) {
      var width = _ref3.width,
          height = _ref3.height,
          scale = _ref3.scale,
          axis = _ref3.axis;

      var lines = computeGridLines({ width: width, height: height, scale: scale, axis: axis });

      lines.forEach(function (line) {
          ctx.beginPath();
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
          ctx.stroke();
      });
  };

  var gradientKeys = Object.keys(gradientTypes);
  var patternKeys = Object.keys(patternTypes);

  /**
   * Check a node matches given def predicate.
   *
   * @param {string|Function|Object} predicate
   * @param {Object}                 node
   * @param {string}                 [dataKey] - Optional path to access node data
   * @returns {boolean}
   */
  var isMatchingDef = function isMatchingDef(predicate, node, dataKey) {
      if (predicate === '*') {
          return true;
      } else if (isFunction(predicate)) {
          return predicate(node);
      } else if (isPlainObject(predicate)) {
          var data = dataKey ? get(node, dataKey) : node;
          return isEqual(pick(data, Object.keys(predicate)), predicate);
      }

      return false;
  };

  /**
   * Compute SVG defs.
   *
   * @param {Array.<Object>} defs               - Base SVG defs configs
   * @param {Array.<Object>} nodes              - Data nodes to apply defs on
   * @param {Array.<Object>} rules              - Rules used to conditionally apply defs on data nodes
   * @param {string}         [dataKey]          - Path to node data, used for rule object query based predicate
   * @param {string}         [colorKey='color'] - Node color path, required when inheritance is involved
   * @param {string}         [targetKey='fill'] - Node target property to apply def ID on
   * @returns {Array}
   */
  var bindDefs = function bindDefs(defs, nodes, rules) {
      var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
          dataKey = _ref.dataKey,
          _ref$colorKey = _ref.colorKey,
          colorKey = _ref$colorKey === undefined ? 'color' : _ref$colorKey,
          _ref$targetKey = _ref.targetKey,
          targetKey = _ref$targetKey === undefined ? 'fill' : _ref$targetKey;

      var boundDefs = [];

      // will hold generated variation ids,
      // to avoid generating multiple identical defs
      var generatedIds = {};

      if (defs.length && nodes.length) {
          // first, add base defs
          boundDefs = [].concat(defs);

          nodes.forEach(function (node) {
              var _loop = function _loop(i) {
                  var _rules$i = rules[i],
                      id = _rules$i.id,
                      match = _rules$i.match;

                  if (isMatchingDef(match, node, dataKey)) {
                      var def = defs.find(function (_ref2) {
                          var defId = _ref2.id;
                          return defId === id;
                      });
                      if (def) {
                          if (patternKeys.includes(def.type)) {
                              if (def.background === 'inherit' || def.color === 'inherit') {
                                  var nodeColor = get(node, colorKey);
                                  var background = def.background;
                                  var color = def.color;

                                  var inheritedId = id;
                                  if (def.background === 'inherit') {
                                      inheritedId = inheritedId + '.bg.' + nodeColor;
                                      background = nodeColor;
                                  }
                                  if (def.color === 'inherit') {
                                      inheritedId = inheritedId + '.fg.' + nodeColor;
                                      color = nodeColor;
                                  }

                                  set(node, targetKey, 'url(#' + inheritedId + ')');
                                  if (!generatedIds[inheritedId]) {
                                      boundDefs.push(_extends({}, def, {
                                          id: inheritedId,
                                          background: background,
                                          color: color
                                      }));
                                      generatedIds[inheritedId] = 1;
                                  }
                              } else {
                                  // do not generate new def as there's no inheritance involved
                                  set(node, targetKey, 'url(#' + id + ')');
                              }
                          } else if (gradientKeys.includes(def.type)) {
                              var allColors = def.colors.map(function (_ref3) {
                                  var color = _ref3.color;
                                  return color;
                              });

                              if (allColors.includes('inherit')) {
                                  var _nodeColor = get(node, colorKey);

                                  var _inheritedId = id;
                                  var inheritedDef = _extends({}, def, {
                                      colors: def.colors.map(function (colorStop, i) {
                                          if (colorStop.color !== 'inherit') return colorStop;

                                          _inheritedId = _inheritedId + '.' + i + '.' + _nodeColor;

                                          return _extends({}, colorStop, {
                                              color: colorStop.color === 'inherit' ? _nodeColor : colorStop.color
                                          });
                                      })
                                  });
                                  inheritedDef.id = _inheritedId;

                                  set(node, targetKey, 'url(#' + _inheritedId + ')');
                                  if (!generatedIds[_inheritedId]) {
                                      boundDefs.push(inheritedDef);
                                      generatedIds[_inheritedId] = 1;
                                  }
                              } else {
                                  // do not generate new def as there's no inheritance involved
                                  set(node, targetKey, 'url(#' + id + ')');
                              }
                          }
                      }

                      // break loop on first match
                      return 'break';
                  }
              };

              for (var i = 0; i < rules.length; i++) {
                  var _ret = _loop(i);

                  if (_ret === 'break') break;
              }
          });
      }

      return boundDefs;
  };

  exports.Container = Container;
  exports.ResponsiveWrapper = ResponsiveWrapper;
  exports.SvgWrapper = SvgWrapper;
  exports.SmartMotion = SmartMotion;
  exports.noop = noop;
  exports.DotsItem = DotsItem$1;
  exports.DotsItemDefaultProps = DotsItemDefaultProps;
  exports.gradientTypes = gradientTypes;
  exports.LinearGradient = LinearGradient;
  exports.linearGradientDef = linearGradientDef;
  exports.patternTypes = patternTypes;
  exports.PatternDots = PatternDots;
  exports.patternDotsDef = patternDotsDef;
  exports.PatternLines = PatternLines;
  exports.patternLinesDef = patternLinesDef;
  exports.PatternSquares = PatternSquares;
  exports.patternSquaresDef = patternSquaresDef;
  exports.defsMapping = defsMapping;
  exports.Defs = Defs;
  exports.BasicTooltip = BasicTooltip$1;
  exports.Chip = Chip$1;
  exports.TableTooltip = TableTooltip$1;
  exports.Axis = Axis$1;
  exports.Axes = Axes$1;
  exports.Grid = Grid$1;
  exports.CartesianMarkers = CartesianMarkers$1;
  exports.CartesianMarkersItem = CartesianMarkersItem$1;
  exports.withColors = withColors;
  exports.withCurve = withCurve;
  exports.withDimensions = withDimensions;
  exports.withHierarchy = withHierarchy;
  exports.withMotion = withMotion;
  exports.withTheme = withTheme;
  exports.getLabelGenerator = getLabelGenerator;
  exports.getAccessorFor = getAccessorFor;
  exports.getAccessorOrValue = getAccessorOrValue;
  exports.scalePropType = scalePropType;
  exports.marginPropType = marginPropType;
  exports.motionPropTypes = motionPropTypes;
  exports.quantizeColorScalePropType = quantizeColorScalePropType;
  exports.curvePropMapping = curvePropMapping;
  exports.curvePropKeys = curvePropKeys;
  exports.curvePropType = curvePropType;
  exports.closedCurvePropKeys = closedCurvePropKeys;
  exports.closedCurvePropType = closedCurvePropType;
  exports.areaCurvePropKeys = areaCurvePropKeys;
  exports.areaCurvePropType = areaCurvePropType;
  exports.lineCurvePropKeys = lineCurvePropKeys;
  exports.lineCurvePropType = lineCurvePropType;
  exports.curveFromProp = curveFromProp;
  exports.defsPropTypes = defsPropTypes;
  exports.stackOrderPropMapping = stackOrderPropMapping;
  exports.stackOrderPropKeys = stackOrderPropKeys;
  exports.stackOrderPropType = stackOrderPropType;
  exports.stackOrderFromProp = stackOrderFromProp;
  exports.stackOffsetPropMapping = stackOffsetPropMapping;
  exports.stackOffsetPropKeys = stackOffsetPropKeys;
  exports.stackOffsetPropType = stackOffsetPropType;
  exports.stackOffsetFromProp = stackOffsetFromProp;
  exports.treeMapTilePropMapping = treeMapTilePropMapping;
  exports.treeMapTilePropKeys = treeMapTilePropKeys;
  exports.treeMapTilePropType = treeMapTilePropType;
  exports.treeMapTileFromProp = treeMapTileFromProp;
  exports.colorSchemes = colorSchemes;
  exports.colorSchemeIds = colorSchemeIds;
  exports.colorInterpolators = colorInterpolators;
  exports.colorInterpolatorIds = colorInterpolatorIds;
  exports.nivoCategoricalColors = nivoCategoricalColors;
  exports.getColorRange = getColorRange;
  exports.getColorScale = getColorScale;
  exports.getColorsGenerator = getColorsGenerator;
  exports.getInheritedColorGenerator = getInheritedColorGenerator;
  exports.colorMotionSpring = colorMotionSpring;
  exports.getInterpolatedColor = getInterpolatedColor;
  exports.quantizeColorScales = quantizeColorScales;
  exports.quantizeColorScalesKeys = quantizeColorScalesKeys;
  exports.guessQuantizeColorScale = guessQuantizeColorScale;
  exports.TWO_PI = TWO_PI;
  exports.degreesToRadians = degreesToRadians;
  exports.radiansToDegrees = radiansToDegrees;
  exports.midAngle = midAngle;
  exports.positionFromAngle = positionFromAngle;
  exports.absoluteAngleDegrees = absoluteAngleDegrees;
  exports.absoluteAngleRadians = absoluteAngleRadians;
  exports.computeArcBoundingBox = computeArcBoundingBox;
  exports.getPolarLabelProps = getPolarLabelProps;
  exports.getRelativeCursor = getRelativeCursor;
  exports.getDistance = getDistance;
  exports.getAngle = getAngle;
  exports.isCursorInRect = isCursorInRect;
  exports.isCursorInRing = isCursorInRing;
  exports.getHoveredArc = getHoveredArc;
  exports.renderAxisToCanvas = renderAxisToCanvas;
  exports.renderAxesToCanvas = renderAxesToCanvas;
  exports.renderGridLinesToCanvas = renderGridLinesToCanvas;
  exports.isMatchingDef = isMatchingDef;
  exports.bindDefs = bindDefs;
  exports.textPropsByEngine = textPropsByEngine;
  exports.axisThemePropType = axisThemePropType;
  exports.gridThemePropType = gridThemePropType;
  exports.legendsThemePropType = legendsThemePropType;
  exports.labelsThemePropType = labelsThemePropType;
  exports.dotsThemePropType = dotsThemePropType;
  exports.themePropType = themePropType;
  exports.defaultTheme = defaultTheme;
  exports.defaultAnimate = defaultAnimate;
  exports.defaultMotionStiffness = defaultMotionStiffness;
  exports.defaultMotionDamping = defaultMotionDamping;
  exports.defaultCategoricalColors = defaultCategoricalColors;
  exports.defaultColorRange = defaultColorRange;
  exports.defaultMargin = defaultMargin;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
