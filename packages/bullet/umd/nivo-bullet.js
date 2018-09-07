(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash/last'), require('react'), require('prop-types'), require('react-motion'), require('@nivo/core'), require('lodash/partial'), require('recompose/compose'), require('recompose/withPropsOnChange'), require('recompose/pure'), require('lodash/isString'), require('recompose/defaultProps'), require('d3-scale'), require('recompose/setDisplayName')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash/last', 'react', 'prop-types', 'react-motion', '@nivo/core', 'lodash/partial', 'recompose/compose', 'recompose/withPropsOnChange', 'recompose/pure', 'lodash/isString', 'recompose/defaultProps', 'd3-scale', 'recompose/setDisplayName'], factory) :
  (factory((global.nivo = global.nivo || {}),global['lodash/last'],global.React,global.PropTypes,global.ReactMotion,global.nivo,global['lodash/partial'],global.RecomposeCompose,global.RecomposeWithPropsOnChange,global.RecomposePure,global['lodash/isString'],global.RecomposeDefaultProps,global.d3,global.RecomposeSetDisplayName));
}(this, (function (exports,last,React,PropTypes,reactMotion,core,partial,compose,withPropsOnChange,pure,isString,defaultProps,d3Scale,setDisplayName) { 'use strict';

  last = last && last.hasOwnProperty('default') ? last['default'] : last;
  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  partial = partial && partial.hasOwnProperty('default') ? partial['default'] : partial;
  compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
  withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
  pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
  isString = isString && isString.hasOwnProperty('default') ? isString['default'] : isString;
  defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
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

  var stackValues = function stackValues(values, colorScale) {
      var useAverage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var normalized = [].concat(values).filter(function (v) {
          return v !== 0;
      }).sort(function (a, b) {
          return a - b;
      });

      return normalized.reduce(function (acc, v1, index) {
          var v0 = last(acc) !== undefined ? last(acc).v1 : 0;
          var sequentialValue = useAverage === true ? v0 + (v1 - v0) / 2 : v1;

          return [].concat(acc, [{
              index: index,
              v0: v0,
              v1: v1,
              color: colorScale(colorScale.type === 'sequential' ? sequentialValue : index)
          }]);
      }, []);
  };

  var getComputeRect = function getComputeRect(_ref) {
      var layout = _ref.layout,
          reverse = _ref.reverse,
          scale = _ref.scale,
          height = _ref.height;

      if (layout === 'horizontal') {
          if (reverse === true) {
              return function (d) {
                  var x = scale(d.v1);
                  var w = scale(d.v0) - x;

                  return { x: x, y: 0, width: w, height: height };
              };
          }

          return function (d) {
              var x = scale(d.v0);
              var w = scale(d.v1) - x;

              return { x: x, y: 0, width: w, height: height };
          };
      }

      if (reverse === true) {
          return function (d) {
              var y = scale(d.v0);
              var h = scale(d.v1) - y;

              return { x: 0, y: y, width: height, height: h };
          };
      }

      return function (d) {
          var y = scale(d.v1);
          var h = scale(d.v0) - y;

          return { x: 0, y: y, width: height, height: h };
      };
  };

  var computeRects = function computeRects(_ref2) {
      var data = _ref2.data,
          layout = _ref2.layout,
          reverse = _ref2.reverse,
          scale = _ref2.scale,
          height = _ref2.height;

      var computeRect = getComputeRect({
          layout: layout,
          reverse: reverse,
          scale: scale,
          height: height
      });

      return data.map(function (d) {
          return _extends({
              data: d
          }, computeRect(d));
      });
  };

  var getPositionGenerator = function getPositionGenerator(_ref) {
      var layout = _ref.layout,
          reverse = _ref.reverse,
          scale = _ref.scale,
          height = _ref.height,
          markerSize = _ref.markerSize;

      if (layout === 'horizontal') {
          return function (marker) {
              var x = scale(marker.value);
              var y = height / 2;
              var rotation = reverse === true ? 180 : 0;

              return { x: x, y: y, size: markerSize, rotation: rotation };
          };
      }

      return function (marker) {
          var x = height / 2;
          var y = scale(marker.value);
          var rotation = reverse === true ? 270 : 90;

          return { x: x, y: y, size: markerSize, rotation: rotation };
      };
  };

  var BulletMarkers = function (_Component) {
      inherits(BulletMarkers, _Component);

      function BulletMarkers() {
          var _temp, _this, _ret;

          classCallCheck(this, BulletMarkers);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleMouseEnter = function (data, event) {
              _this.props.onMouseEnter(data, event);
          }, _this.handleMouseLeave = function (data, event) {
              _this.props.onMouseLeave(data, event);
          }, _this.handleClick = function (data, event) {
              _this.props.onClick(data, event);
          }, _temp), possibleConstructorReturn(_this, _ret);
      }

      BulletMarkers.prototype.render = function render() {
          var _this2 = this;

          var _props = this.props,
              scale = _props.scale,
              layout = _props.layout,
              reverse = _props.reverse,
              markers = _props.markers,
              height = _props.height,
              markerSize = _props.markerSize,
              component = _props.component,
              animate = _props.animate,
              motionStiffness = _props.motionStiffness,
              motionDamping = _props.motionDamping;


          var getPosition = getPositionGenerator({ layout: layout, reverse: reverse, scale: scale, height: height, markerSize: markerSize });

          if (animate !== true) {
              return React__default.createElement(
                  React.Fragment,
                  null,
                  markers.map(function (marker) {
                      return React__default.createElement(component, _extends({
                          key: marker.index
                      }, marker, getPosition(marker), {
                          data: marker,
                          onMouseEnter: partial(_this2.handleMouseEnter, marker),
                          onMouseMove: partial(_this2.handleMouseEnter, marker),
                          onMouseLeave: partial(_this2.handleMouseLeave, marker),
                          onClick: partial(_this2.handleClick, marker)
                      }));
                  })
              );
          }

          var springConfig = {
              damping: motionDamping,
              stiffness: motionStiffness
          };

          return React__default.createElement(
              reactMotion.TransitionMotion,
              {
                  styles: markers.map(function (marker, i) {
                      var position = getPosition(marker);

                      return {
                          key: '' + i,
                          data: marker,
                          style: _extends({
                              x: reactMotion.spring(position.x, springConfig),
                              y: reactMotion.spring(position.y, springConfig),
                              size: reactMotion.spring(position.size, springConfig),
                              rotation: reactMotion.spring(position.rotation, springConfig)
                          }, core.colorMotionSpring(marker.color, springConfig))
                      };
                  })
              },
              function (interpolatedStyles) {
                  return React__default.createElement(
                      React.Fragment,
                      null,
                      interpolatedStyles.map(function (_ref2) {
                          var key = _ref2.key,
                              style = _ref2.style,
                              marker = _ref2.data;

                          var color = core.getInterpolatedColor(style);

                          return React__default.createElement(component, _extends({
                              key: key
                          }, marker, style, {
                              color: color,
                              data: marker,
                              onMouseEnter: partial(_this2.handleMouseEnter, marker),
                              onMouseMove: partial(_this2.handleMouseEnter, marker),
                              onMouseLeave: partial(_this2.handleMouseLeave, marker),
                              onClick: partial(_this2.handleClick, marker)
                          }));
                      })
                  );
              }
          );
      };

      return BulletMarkers;
  }(React.Component);

  BulletMarkers.propTypes = _extends({
      scale: PropTypes.func.isRequired,
      layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
      reverse: PropTypes.bool.isRequired,
      markers: PropTypes.arrayOf(PropTypes.shape({
          value: PropTypes.number.isRequired,
          index: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired
      })).isRequired,
      height: PropTypes.number.isRequired,
      markerSize: PropTypes.number.isRequired,
      component: PropTypes.func.isRequired,
      onMouseEnter: PropTypes.func.isRequired,
      onMouseLeave: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired
  }, core.motionPropTypes);

  var BulletRects = function (_Component) {
      inherits(BulletRects, _Component);

      function BulletRects() {
          var _temp, _this, _ret;

          classCallCheck(this, BulletRects);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleMouseEnter = function (data, event) {
              _this.props.onMouseEnter(data, event);
          }, _this.handleMouseLeave = function (data, event) {
              _this.props.onMouseLeave(data, event);
          }, _this.handleClick = function (data, event) {
              _this.props.onClick(data, event);
          }, _temp), possibleConstructorReturn(_this, _ret);
      }

      BulletRects.prototype.render = function render() {
          var _this2 = this;

          var _props = this.props,
              rects = _props.rects,
              layout = _props.layout,
              y = _props.y,
              component = _props.component,
              animate = _props.animate,
              motionStiffness = _props.motionStiffness,
              motionDamping = _props.motionDamping;


          var transform = 'translate(' + (layout === 'horizontal' ? 0 : y) + ',' + (layout === 'horizontal' ? y : 0) + ')';

          if (animate !== true) {
              return React__default.createElement(
                  'g',
                  { transform: transform },
                  rects.map(function (rect) {
                      return React__default.createElement(component, _extends({
                          key: rect.data.index,
                          index: rect.data.index,
                          color: rect.data.color
                      }, rect, {
                          onMouseEnter: partial(_this2.handleMouseEnter, rect.data),
                          onMouseMove: partial(_this2.handleMouseEnter, rect.data),
                          onMouseLeave: partial(_this2.handleMouseLeave, rect.data),
                          onClick: partial(_this2.handleClick, rect.data)
                      }));
                  })
              );
          }

          var springConfig = {
              damping: motionDamping,
              stiffness: motionStiffness
          };

          return React__default.createElement(
              'g',
              { transform: transform },
              React__default.createElement(
                  reactMotion.TransitionMotion,
                  {
                      styles: rects.map(function (rect) {
                          return {
                              key: '' + rect.data.index,
                              data: rect.data,
                              style: _extends({
                                  x: reactMotion.spring(rect.x, springConfig),
                                  y: reactMotion.spring(rect.y, springConfig),
                                  width: reactMotion.spring(rect.width, springConfig),
                                  height: reactMotion.spring(rect.height, springConfig)
                              }, core.colorMotionSpring(rect.data.color, springConfig))
                          };
                      })
                  },
                  function (interpolatedStyles) {
                      return React__default.createElement(
                          React.Fragment,
                          null,
                          interpolatedStyles.map(function (_ref) {
                              var key = _ref.key,
                                  style = _ref.style,
                                  data = _ref.data;

                              var color = core.getInterpolatedColor(style);

                              return React__default.createElement(component, {
                                  key: key,
                                  index: Number(key),
                                  data: data,
                                  x: style.x,
                                  y: style.y,
                                  width: Math.max(style.width, 0),
                                  height: Math.max(style.height, 0),
                                  color: color,
                                  onMouseEnter: partial(_this2.handleMouseEnter, data),
                                  onMouseMove: partial(_this2.handleMouseEnter, data),
                                  onMouseLeave: partial(_this2.handleMouseLeave, data),
                                  onClick: partial(_this2.handleClick, data)
                              });
                          })
                      );
                  }
              )
          );
      };

      return BulletRects;
  }(React.Component);

  BulletRects.propTypes = _extends({
      scale: PropTypes.func.isRequired,
      data: PropTypes.arrayOf(PropTypes.shape({
          v0: PropTypes.number.isRequired,
          v1: PropTypes.number.isRequired
      })).isRequired,
      layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
      reverse: PropTypes.bool.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      rects: PropTypes.arrayOf(PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
          data: PropTypes.shape({
              index: PropTypes.number.isRequired,
              v0: PropTypes.number.isRequired,
              v1: PropTypes.number.isRequired,
              color: PropTypes.string.isRequired
          }).isRequired
      })).isRequired,
      component: PropTypes.func.isRequired,
      onMouseEnter: PropTypes.func.isRequired,
      onMouseLeave: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired
  }, core.motionPropTypes);


  var EnhancedBulletRects = compose(withPropsOnChange(['data', 'layout', 'reverse', 'scale', 'height'], function (_ref2) {
      var data = _ref2.data,
          layout = _ref2.layout,
          reverse = _ref2.reverse,
          scale = _ref2.scale,
          height = _ref2.height;
      return {
          rects: computeRects({
              data: data,
              layout: layout,
              reverse: reverse,
              scale: scale,
              height: height
          })
      };
  }), pure)(BulletRects);

  EnhancedBulletRects.displayName = 'BulletRects';

  var BulletRectsItem = function (_PureComponent) {
      inherits(BulletRectsItem, _PureComponent);

      function BulletRectsItem() {
          classCallCheck(this, BulletRectsItem);
          return possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
      }

      BulletRectsItem.prototype.render = function render() {
          var _props = this.props,
              x = _props.x,
              y = _props.y,
              width = _props.width,
              height = _props.height,
              color = _props.color,
              onMouseEnter = _props.onMouseEnter,
              onMouseMove = _props.onMouseMove,
              onMouseLeave = _props.onMouseLeave,
              onClick = _props.onClick;


          return React__default.createElement('rect', {
              x: x,
              y: y,
              width: width,
              height: height,
              fill: color,
              onMouseMove: onMouseMove,
              onMouseEnter: onMouseEnter,
              onMouseLeave: onMouseLeave,
              onClick: onClick
          });
      };

      return BulletRectsItem;
  }(React.PureComponent);

  BulletRectsItem.propTypes = {
      index: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      data: PropTypes.shape({
          v0: PropTypes.number.isRequired,
          v1: PropTypes.number.isRequired
      }).isRequired,
      onMouseEnter: PropTypes.func.isRequired,
      onMouseMove: PropTypes.func.isRequired,
      onMouseLeave: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired
  };

  var BulletMarkersItem = function (_PureComponent) {
      inherits(BulletMarkersItem, _PureComponent);

      function BulletMarkersItem() {
          classCallCheck(this, BulletMarkersItem);
          return possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
      }

      BulletMarkersItem.prototype.render = function render() {
          var _props = this.props,
              x = _props.x,
              y = _props.y,
              size = _props.size,
              rotation = _props.rotation,
              color = _props.color,
              onMouseEnter = _props.onMouseEnter,
              onMouseMove = _props.onMouseMove,
              onMouseLeave = _props.onMouseLeave,
              onClick = _props.onClick;


          return React__default.createElement('line', {
              transform: 'rotate(' + rotation + ', ' + x + ', ' + y + ')',
              x1: x,
              x2: x,
              y1: y - size / 2,
              y2: y + size / 2,
              fill: 'none',
              stroke: color,
              strokeWidth: '5',
              onMouseMove: onMouseMove,
              onMouseEnter: onMouseEnter,
              onMouseLeave: onMouseLeave,
              onClick: onClick
          });
      };

      return BulletMarkersItem;
  }(React.PureComponent);

  BulletMarkersItem.propTypes = {
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      rotation: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      data: PropTypes.shape({
          index: PropTypes.number.isRequired,
          value: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired
      }).isRequired,
      onMouseEnter: PropTypes.func.isRequired,
      onMouseMove: PropTypes.func.isRequired,
      onMouseLeave: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired
  };

  var BulletItem = function (_Component) {
      inherits(BulletItem, _Component);

      function BulletItem() {
          var _temp, _this, _ret;

          classCallCheck(this, BulletItem);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRangeTooltip = function (showTooltip, range, event) {
              var theme = _this.props.theme;

              showTooltip(React__default.createElement(core.BasicTooltip, {
                  id: React__default.createElement(
                      'span',
                      null,
                      React__default.createElement(
                          'strong',
                          null,
                          range.v0
                      ),
                      ' to ',
                      React__default.createElement(
                          'strong',
                          null,
                          range.v1
                      )
                  ),
                  enableChip: true,
                  color: range.color,
                  theme: theme
                  //format={format}
                  //renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { ...node }) : null}
              }), event);
          }, _this.handleMeasureTooltip = function (showTooltip, measure, event) {
              var theme = _this.props.theme;

              showTooltip(React__default.createElement(core.BasicTooltip, {
                  id: React__default.createElement(
                      'strong',
                      null,
                      measure.v1
                  ),
                  enableChip: true,
                  color: measure.color,
                  theme: theme
                  //format={format}
                  //renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { ...node }) : null}
              }), event);
          }, _this.handleMarkerTooltip = function (showTooltip, marker, event) {
              var theme = _this.props.theme;

              showTooltip(React__default.createElement(core.BasicTooltip, {
                  id: React__default.createElement(
                      'strong',
                      null,
                      marker.value
                  ),
                  enableChip: true,
                  color: marker.color,
                  theme: theme
                  //format={format}
                  //renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { ...node }) : null}
              }), event);
          }, _this.handleRangeClick = function (range, event) {
              var _this$props = _this.props,
                  id = _this$props.id,
                  onRangeClick = _this$props.onRangeClick;

              onRangeClick(_extends({ id: id }, range), event);
          }, _this.handleMeasureClick = function (measure, event) {
              var _this$props2 = _this.props,
                  id = _this$props2.id,
                  onMeasureClick = _this$props2.onMeasureClick;

              onMeasureClick(_extends({ id: id }, measure), event);
          }, _this.handleMarkerClick = function (marker, event) {
              var _this$props3 = _this.props,
                  id = _this$props3.id,
                  onMarkerClick = _this$props3.onMarkerClick;

              onMarkerClick(_extends({ id: id }, marker), event);
          }, _temp), possibleConstructorReturn(_this, _ret);
      }

      BulletItem.prototype.render = function render() {
          var _this2 = this;

          var _props = this.props,
              id = _props.id,
              scale = _props.scale,
              layout = _props.layout,
              reverse = _props.reverse,
              _axisPosition = _props.axisPosition,
              x = _props.x,
              y = _props.y,
              width = _props.width,
              height = _props.height,
              _title = _props.title,
              titlePosition = _props.titlePosition,
              titleAlign = _props.titleAlign,
              titleOffsetX = _props.titleOffsetX,
              titleOffsetY = _props.titleOffsetY,
              titleRotation = _props.titleRotation,
              computedRanges = _props.computedRanges,
              rangeComponent = _props.rangeComponent,
              computedMeasures = _props.computedMeasures,
              measureComponent = _props.measureComponent,
              measureHeight = _props.measureHeight,
              computedMarkers = _props.computedMarkers,
              markerComponent = _props.markerComponent,
              markerHeight = _props.markerHeight,
              theme = _props.theme,
              showTooltip = _props.showTooltip,
              hideTooltip = _props.hideTooltip,
              animate = _props.animate,
              motionStiffness = _props.motionStiffness,
              motionDamping = _props.motionDamping;


          var motionProps = {
              animate: animate,
              motionStiffness: motionStiffness,
              motionDamping: motionDamping
          };

          var axisPosition = void 0;
          if (layout === 'horizontal') {
              axisPosition = _axisPosition === 'before' ? 'top' : 'bottom';
          } else {
              axisPosition = _axisPosition === 'before' ? 'left' : 'right';
          }

          var rangeNodes = React__default.createElement(EnhancedBulletRects, _extends({
              data: computedRanges,
              scale: scale,
              layout: layout,
              reverse: reverse,
              x: 0,
              y: 0,
              width: width,
              height: height,
              component: rangeComponent,
              onMouseEnter: partial(this.handleRangeTooltip, showTooltip),
              onMouseLeave: hideTooltip,
              onClick: this.handleRangeClick
          }, motionProps));

          var markerNodes = React__default.createElement(BulletMarkers, _extends({
              markers: computedMarkers,
              scale: scale,
              layout: layout,
              reverse: reverse,
              height: height,
              markerSize: markerHeight,
              component: markerComponent,
              onMouseEnter: partial(this.handleMarkerTooltip, showTooltip),
              onMouseLeave: hideTooltip,
              onClick: this.handleMarkerClick
          }, motionProps));

          var axis = React__default.createElement(core.Axis, _extends({
              width: layout === 'horizontal' ? width : height,
              height: layout === 'horizontal' ? height : width,
              scale: scale,
              position: axisPosition,
              theme: theme
          }, motionProps));

          var title = _title || id;
          var titleX = void 0;
          var titleY = void 0;
          if (layout === 'horizontal') {
              titleX = titlePosition === 'before' ? titleOffsetX : width + titleOffsetX;
              titleY = height / 2 + titleOffsetY;
          } else {
              titleX = height / 2 + titleOffsetX;
              titleY = titlePosition === 'before' ? titleOffsetY : width + titleOffsetY;
          }

          var titleNode = React__default.createElement(
              'g',
              { transform: 'translate(' + titleX + ',' + titleY + ') rotate(' + titleRotation + ')' },
              isString(title) ? React__default.createElement(
                  'text',
                  {
                      style: _extends({}, theme.labels.text, {
                          alignmentBaseline: 'central',
                          textAnchor: titleAlign
                      })
                  },
                  title
              ) : title
          );

          if (animate !== true) {
              return React__default.createElement(
                  'g',
                  { transform: 'translate(' + x + ',' + y + ')' },
                  rangeNodes,
                  React__default.createElement(EnhancedBulletRects, _extends({
                      data: computedMeasures,
                      scale: scale,
                      layout: layout,
                      reverse: reverse,
                      x: 0,
                      y: (height - measureHeight) / 2,
                      width: width,
                      height: measureHeight,
                      component: measureComponent,
                      onMouseEnter: partial(this.handleMeasureTooltip, showTooltip),
                      onMouseLeave: hideTooltip,
                      onClick: this.handleMeasureClick
                  }, motionProps)),
                  axis,
                  markerNodes,
                  titleNode
              );
          }

          var springConfig = {
              damping: motionDamping,
              stiffness: motionStiffness
          };

          return React__default.createElement(
              reactMotion.Motion,
              {
                  style: {
                      x: reactMotion.spring(x, springConfig),
                      y: reactMotion.spring(y, springConfig),
                      measuresY: reactMotion.spring((height - measureHeight) / 2, springConfig)
                  }
              },
              function (values) {
                  return React__default.createElement(
                      'g',
                      { transform: 'translate(' + values.x + ',' + values.y + ')' },
                      rangeNodes,
                      React__default.createElement(EnhancedBulletRects, _extends({
                          data: computedMeasures,
                          scale: scale,
                          layout: layout,
                          reverse: reverse,
                          x: 0,
                          y: values.measuresY,
                          width: width,
                          height: measureHeight,
                          component: measureComponent,
                          onMouseEnter: partial(_this2.handleMeasureTooltip, showTooltip),
                          onMouseLeave: hideTooltip,
                          onClick: _this2.handleMeasureClick
                      }, motionProps)),
                      axis,
                      markerNodes,
                      titleNode
                  );
              }
          );
      };

      return BulletItem;
  }(React.Component);

  BulletItem.propTypes = {
      id: PropTypes.string.isRequired,
      scale: PropTypes.func.isRequired,
      ranges: PropTypes.arrayOf(PropTypes.number).isRequired,
      computedRanges: PropTypes.arrayOf(PropTypes.shape({
          index: PropTypes.number.isRequired,
          v0: PropTypes.number.isRequired,
          v1: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired
      })).isRequired,
      measures: PropTypes.arrayOf(PropTypes.number).isRequired,
      computedMeasures: PropTypes.arrayOf(PropTypes.shape({
          index: PropTypes.number.isRequired,
          v0: PropTypes.number.isRequired,
          v1: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired
      })).isRequired,
      markers: PropTypes.arrayOf(PropTypes.number).isRequired,
      computedMarkers: PropTypes.arrayOf(PropTypes.shape({
          value: PropTypes.number.isRequired,
          index: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired
      })).isRequired,
      layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
      reverse: PropTypes.bool.isRequired,
      axisPosition: PropTypes.oneOf(['before', 'after']).isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,

      title: PropTypes.node,
      titlePosition: PropTypes.oneOf(['before', 'after']).isRequired,
      titleAlign: PropTypes.oneOf(['start', 'middle', 'end']).isRequired,
      titleOffsetX: PropTypes.number.isRequired,
      titleOffsetY: PropTypes.number.isRequired,
      titleRotation: PropTypes.number.isRequired,

      rangeComponent: PropTypes.func.isRequired,
      rangeColors: PropTypes.any.isRequired,
      rangeColorScale: PropTypes.func.isRequired,
      onRangeClick: PropTypes.func.isRequired,

      measureHeight: PropTypes.number.isRequired,
      measureComponent: PropTypes.func.isRequired,
      measureColors: PropTypes.any.isRequired,
      measureColorScale: PropTypes.func.isRequired,
      onMeasureClick: PropTypes.func.isRequired,

      markerHeight: PropTypes.number.isRequired,
      markerComponent: PropTypes.func.isRequired,
      markerColors: PropTypes.any.isRequired,
      markerColorScale: PropTypes.func.isRequired,
      onMarkerClick: PropTypes.func.isRequired,

      theme: core.themePropType.isRequired,
      showTooltip: PropTypes.func.isRequired,
      hideTooltip: PropTypes.func.isRequired
  };


  var EnhancedBulletItem = compose(defaultProps({
      layout: 'horizontal',
      reverse: false,
      axisPosition: 'after',
      titlePosition: 'before',
      titleAlign: 'middle',
      titleRotation: 0,
      titleOffsetX: 0,
      titleOffsetY: 0,
      rangeComponent: BulletRectsItem,
      rangeColors: 'seq:cool',
      onRangeClick: core.noop,
      measureComponent: BulletRectsItem,
      measureColors: 'seq:red_purple',
      onMeasureClick: core.noop,
      markers: [],
      markerComponent: BulletMarkersItem,
      markerColors: 'seq:red_purple',
      onMarkerClick: core.noop,
      showTooltip: core.noop,
      hideTooltip: core.noop
  }), core.withMotion(), withPropsOnChange(['rangeColors', 'scale'], function (_ref) {
      var rangeColors = _ref.rangeColors,
          scale = _ref.scale;
      return {
          rangeColorScale: core.getColorScale(rangeColors, scale, true)
      };
  }), withPropsOnChange(['ranges', 'rangeColorScale'], function (_ref2) {
      var ranges = _ref2.ranges,
          rangeColorScale = _ref2.rangeColorScale;
      return {
          computedRanges: stackValues(ranges, rangeColorScale)
      };
  }), withPropsOnChange(['measureColors', 'scale'], function (_ref3) {
      var measureColors = _ref3.measureColors,
          scale = _ref3.scale;
      return {
          measureColorScale: core.getColorScale(measureColors, scale)
      };
  }), withPropsOnChange(['measures', 'measureColorScale'], function (_ref4) {
      var measures = _ref4.measures,
          measureColorScale = _ref4.measureColorScale;
      return {
          computedMeasures: stackValues(measures, measureColorScale)
      };
  }), withPropsOnChange(['markerColors', 'scale'], function (_ref5) {
      var markerColors = _ref5.markerColors,
          scale = _ref5.scale;
      return {
          markerColorScale: core.getColorScale(markerColors, scale)
      };
  }), withPropsOnChange(['markers', 'markerColorScale'], function (_ref6) {
      var markers = _ref6.markers,
          markerColorScale = _ref6.markerColorScale;
      return {
          computedMarkers: markers.map(function (marker, index) {
              return {
                  value: marker,
                  index: index,
                  color: markerColorScale(markerColorScale.type === 'sequential' ? marker : index)
              };
          })
      };
  }), pure)(BulletItem);

  EnhancedBulletItem.displayName = 'BulletItem';

  var commonPropTypes = {
      data: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.node,
          ranges: PropTypes.arrayOf(PropTypes.number).isRequired,
          measures: PropTypes.arrayOf(PropTypes.number).isRequired,
          markers: PropTypes.arrayOf(PropTypes.number)
      })).isRequired,
      layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
      reverse: PropTypes.bool.isRequired,
      spacing: PropTypes.number.isRequired,

      titlePosition: PropTypes.oneOf(['before', 'after']).isRequired,
      titleAlign: PropTypes.oneOf(['start', 'middle', 'end']).isRequired,
      titleOffsetX: PropTypes.number.isRequired,
      titleOffsetY: PropTypes.number.isRequired,
      titleRotation: PropTypes.number.isRequired,

      rangeColors: PropTypes.any.isRequired,
      rangeBorderWidth: PropTypes.number.isRequired,
      rangeBorderColor: PropTypes.any.isRequired,
      onRangeClick: PropTypes.func,

      measureColors: PropTypes.any.isRequired,
      measureSize: PropTypes.number.isRequired,
      measureBorderWidth: PropTypes.number.isRequired,
      measureBorderColor: PropTypes.any.isRequired,
      onMeasureClick: PropTypes.func,

      markerColors: PropTypes.any.isRequired,
      markerSize: PropTypes.number.isRequired,
      onMarkerClick: PropTypes.func,

      axisPosition: PropTypes.oneOf(['before', 'after']).isRequired,

      theme: core.themePropType.isRequired,

      overrides: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired,
          reverse: PropTypes.bool,
          rangeColors: PropTypes.any,
          rangeBorderWidth: PropTypes.number,
          rangeBorderColor: PropTypes.any,
          measureColors: PropTypes.any,
          measureBorderWidth: PropTypes.number,
          measureBorderColor: PropTypes.any,
          axis: PropTypes.shape({
              position: PropTypes.oneOf(['before', 'after']),
              min: PropTypes.number,
              max: PropTypes.number
          })
      })).isRequired
  };

  var BulletPropTypes = _extends({}, commonPropTypes);

  var commonDefaultProps = {
      layout: EnhancedBulletItem.defaultProps.layout,
      reverse: EnhancedBulletItem.defaultProps.reverse,
      spacing: 30,
      titlePosition: EnhancedBulletItem.defaultProps.titlePosition,
      titleAlign: EnhancedBulletItem.defaultProps.titleAlign,
      titleOffsetX: EnhancedBulletItem.defaultProps.titleOffsetX,
      titleOffsetY: EnhancedBulletItem.defaultProps.titleOffsetY,
      titleRotation: EnhancedBulletItem.defaultProps.titleRotation,
      rangeBorderWidth: 0,
      rangeBorderColor: 'inherit',
      measureSize: 0.4,
      measureBorderWidth: 0,
      measureBorderColor: 'inherit',
      markerSize: 0.6,
      markerColors: EnhancedBulletItem.defaultProps.markerColors,
      axisPosition: EnhancedBulletItem.defaultProps.axisPosition,
      rangeColors: EnhancedBulletItem.defaultProps.rangeColors,
      measureColors: EnhancedBulletItem.defaultProps.measureColors,
      isInteractive: true,
      onClick: core.noop,
      overrides: []
  };

  var BulletDefaultProps = _extends({}, commonDefaultProps);

  var props = /*#__PURE__*/Object.freeze({
    BulletPropTypes: BulletPropTypes,
    BulletDefaultProps: BulletDefaultProps
  });

  var commonEnhancers = [core.withDimensions(), core.withTheme()];

  var enhance = (function (Component) {
      var implDefaultProps = props[Component.displayName + 'DefaultProps'];

      switch (Component.displayName) {
          case 'Bullet':
              return compose.apply(undefined, [defaultProps(implDefaultProps)].concat(commonEnhancers, [core.withMotion(), pure]))(Component);
      }

      return Component;
  });

  var Bullet = function (_Component) {
      inherits(Bullet, _Component);

      function Bullet() {
          classCallCheck(this, Bullet);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      Bullet.prototype.render = function render() {
          var _props = this.props,
              data = _props.data,
              layout = _props.layout,
              spacing = _props.spacing,
              measureSize = _props.measureSize,
              markerSize = _props.markerSize,
              reverse = _props.reverse,
              axisPosition = _props.axisPosition,
              margin = _props.margin,
              width = _props.width,
              height = _props.height,
              outerWidth = _props.outerWidth,
              outerHeight = _props.outerHeight,
              titlePosition = _props.titlePosition,
              titleAlign = _props.titleAlign,
              titleOffsetX = _props.titleOffsetX,
              titleOffsetY = _props.titleOffsetY,
              titleRotation = _props.titleRotation,
              rangeComponent = _props.rangeComponent,
              rangeColors = _props.rangeColors,
              measureComponent = _props.measureComponent,
              measureColors = _props.measureColors,
              markerComponent = _props.markerComponent,
              markerColors = _props.markerColors,
              theme = _props.theme,
              animate = _props.animate,
              motionStiffness = _props.motionStiffness,
              motionDamping = _props.motionDamping,
              isInteractive = _props.isInteractive,
              onRangeClick = _props.onRangeClick,
              onMeasureClick = _props.onMeasureClick,
              onMarkerClick = _props.onMarkerClick;


          var itemHeight = void 0;
          if (layout === 'horizontal') {
              itemHeight = (height - spacing * (data.length - 1)) / data.length;
          } else {
              itemHeight = (width - spacing * (data.length - 1)) / data.length;
          }
          var measureHeight = itemHeight * measureSize;
          var markerHeight = itemHeight * markerSize;

          var enhancedData = data.map(function (d) {
              var all = [].concat(d.ranges, d.measures, d.markers);

              var max = Math.max.apply(Math, all);

              var scale = d3Scale.scaleLinear().domain([0, max]);

              if (layout === 'horizontal') {
                  scale.range(reverse === true ? [width, 0] : [0, width]);
              } else {
                  scale.range(reverse === true ? [0, height] : [height, 0]);
              }

              return _extends({}, d, {
                  scale: scale
              });
          });

          var motionProps = {
              animate: animate,
              motionDamping: motionDamping,
              motionStiffness: motionStiffness
          };

          return React__default.createElement(
              core.Container,
              { isInteractive: isInteractive, theme: theme },
              function (_ref) {
                  var showTooltip = _ref.showTooltip,
                      hideTooltip = _ref.hideTooltip;
                  return React__default.createElement(
                      core.SvgWrapper,
                      {
                          width: outerWidth,
                          height: outerHeight,
                          margin: margin,
                          theme: theme
                      },
                      enhancedData.map(function (d, i) {
                          return React__default.createElement(EnhancedBulletItem, _extends({
                              key: d.id
                          }, d, {
                              layout: layout,
                              reverse: reverse,
                              x: layout === 'vertical' ? itemHeight * i + spacing * i : 0,
                              y: layout === 'horizontal' ? itemHeight * i + spacing * i : 0,
                              width: width,
                              height: itemHeight,
                              titlePosition: titlePosition,
                              titleAlign: titleAlign,
                              titleOffsetX: titleOffsetX,
                              titleOffsetY: titleOffsetY,
                              titleRotation: titleRotation,
                              measureHeight: measureHeight,
                              markerHeight: markerHeight,
                              rangeComponent: rangeComponent,
                              rangeColors: rangeColors,
                              measureComponent: measureComponent,
                              measureColors: measureColors,
                              markerComponent: markerComponent,
                              markerColors: markerColors,
                              theme: theme,
                              axisPosition: axisPosition
                          }, motionProps, {
                              showTooltip: showTooltip,
                              hideTooltip: hideTooltip,
                              onRangeClick: onRangeClick,
                              onMeasureClick: onMeasureClick,
                              onMarkerClick: onMarkerClick
                          }));
                      })
                  );
              }
          );
      };

      return Bullet;
  }(React.Component);

  Bullet.propTypes = BulletPropTypes;
  Bullet.displayName = 'Bullet';

  var Bullet$1 = setDisplayName(Bullet.displayName)(enhance(Bullet));

  var ResponsiveBullet = function ResponsiveBullet(props) {
      return React__default.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React__default.createElement(Bullet$1, _extends({ width: width, height: height }, props));
          }
      );
  };

  exports.Bullet = Bullet$1;
  exports.BulletItem = EnhancedBulletItem;
  exports.ResponsiveBullet = ResponsiveBullet;
  exports.BulletPropTypes = BulletPropTypes;
  exports.BulletDefaultProps = BulletDefaultProps;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
