(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prop-types'), require('lodash/isNumber'), require('lodash/isPlainObject'), require('react'), require('lodash')) :
  typeof define === 'function' && define.amd ? define(['exports', 'prop-types', 'lodash/isNumber', 'lodash/isPlainObject', 'react', 'lodash'], factory) :
  (factory((global.nivo = global.nivo || {}),global.PropTypes,global['lodash/isNumber'],global['lodash/isPlainObject'],global.React,global.lodash));
}(this, (function (exports,PropTypes,isNumber,isPlainObject,React,lodash) { 'use strict';

  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  isNumber = isNumber && isNumber.hasOwnProperty('default') ? isNumber['default'] : isNumber;
  isPlainObject = isPlainObject && isPlainObject.hasOwnProperty('default') ? isPlainObject['default'] : isPlainObject;
  var React__default = 'default' in React ? React['default'] : React;

  var DIRECTION_ROW = 'row';
  var DIRECTION_COLUMN = 'column';

  var ANCHOR_TOP = 'top';
  var ANCHOR_TOP_RIGHT = 'top-right';
  var ANCHOR_RIGHT = 'right';
  var ANCHOR_BOTTOM_RIGHT = 'bottom-right';
  var ANCHOR_BOTTOM = 'bottom';
  var ANCHOR_BOTTOM_LEFT = 'bottom-left';
  var ANCHOR_LEFT = 'left';
  var ANCHOR_TOP_LEFT = 'top-left';
  var ANCHOR_CENTER = 'center';

  var DIRECTION_LEFT_TO_RIGHT = 'left-to-right';
  var DIRECTION_RIGHT_TO_LEFT = 'right-to-left';
  var DIRECTION_TOP_TO_BOTTOM = 'top-to-bottom';
  var DIRECTION_BOTTOM_TO_TOP = 'bottom-to-top';

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

  /**
   * This can be used to add effect on legends on interaction.
   */
  var legendEffectPropType = PropTypes.shape({
      on: PropTypes.oneOfType([PropTypes.oneOf(['hover'])]).isRequired,
      style: PropTypes.shape({
          itemTextColor: PropTypes.string,
          itemBackground: PropTypes.string,
          itemOpacity: PropTypes.number,
          symbolSize: PropTypes.number,
          symbolBorderWidth: PropTypes.number,
          symbolBorderColor: PropTypes.string
      }).isRequired
  });

  var symbolPropTypes = {
      symbolShape: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      symbolSize: PropTypes.number,
      symbolSpacing: PropTypes.number,
      symbolBorderWidth: PropTypes.number,
      symbolBorderColor: PropTypes.string
  };

  var interactivityPropTypes = {
      onClick: PropTypes.func,
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func
  };

  var datumPropType = PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      color: PropTypes.string.isRequired,
      fill: PropTypes.string
  });

  /**
   * The prop type is exported as a simple object instead of `PropTypes.shape`
   * to be able to add extra properties.
   *
   * @example
   * ```javascript
   * import { LegendPropShape } from '@nivo/legends'
   *
   * const customLegendPropType = PropTypes.shape({
   *     ...LegendPropShape,
   *     extra: PropTypes.any.isRequired,
   * })
   * ```
   */
  var LegendPropShape = _extends({
      data: PropTypes.arrayOf(datumPropType),

      // position & layout
      anchor: PropTypes.oneOf([ANCHOR_TOP, ANCHOR_TOP_RIGHT, ANCHOR_RIGHT, ANCHOR_BOTTOM_RIGHT, ANCHOR_BOTTOM, ANCHOR_BOTTOM_LEFT, ANCHOR_LEFT, ANCHOR_TOP_LEFT, ANCHOR_CENTER]).isRequired,
      translateX: PropTypes.number,
      translateY: PropTypes.number,
      direction: PropTypes.oneOf([DIRECTION_ROW, DIRECTION_COLUMN]).isRequired,

      // item
      itemsSpacing: PropTypes.number,
      itemWidth: PropTypes.number.isRequired,
      itemHeight: PropTypes.number.isRequired,
      itemDirection: PropTypes.oneOf([DIRECTION_LEFT_TO_RIGHT, DIRECTION_RIGHT_TO_LEFT, DIRECTION_TOP_TO_BOTTOM, DIRECTION_BOTTOM_TO_TOP]),
      itemTextColor: PropTypes.string,
      itemBackground: PropTypes.string,
      itemOpacity: PropTypes.number

  }, symbolPropTypes, interactivityPropTypes, {

      effects: PropTypes.arrayOf(legendEffectPropType)
  });

  var zeroPadding = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
  };

  var computeDimensions = function computeDimensions(_ref) {
      var itemCount = _ref.itemCount,
          itemWidth = _ref.itemWidth,
          itemHeight = _ref.itemHeight,
          direction = _ref.direction,
          itemsSpacing = _ref.itemsSpacing,
          _padding = _ref.padding;

      var padding = void 0;
      if (isNumber(_padding)) {
          padding = {
              top: _padding,
              right: _padding,
              bottom: _padding,
              left: _padding
          };
      } else if (isPlainObject(_padding)) {
          padding = _extends({}, zeroPadding, _padding);
      } else {
          throw new TypeError('Invalid property padding, must be one of: number, object');
      }

      var horizontalPadding = padding.left + padding.right;
      var verticalPadding = padding.top + padding.bottom;
      var width = itemWidth + horizontalPadding;
      var height = itemHeight + verticalPadding;
      var spacing = (itemCount - 1) * itemsSpacing;
      if (direction === DIRECTION_ROW) {
          width = itemWidth * itemCount + spacing + horizontalPadding;
      } else if (direction === DIRECTION_COLUMN) {
          height = itemHeight * itemCount + spacing + verticalPadding;
      }

      return { width: width, height: height, padding: padding };
  };

  var computePositionFromAnchor = function computePositionFromAnchor(_ref2) {
      var anchor = _ref2.anchor,
          translateX = _ref2.translateX,
          translateY = _ref2.translateY,
          containerWidth = _ref2.containerWidth,
          containerHeight = _ref2.containerHeight,
          width = _ref2.width,
          height = _ref2.height;

      var x = translateX;
      var y = translateY;

      switch (anchor) {
          case ANCHOR_TOP:
              x += (containerWidth - width) / 2;
              break;

          case ANCHOR_TOP_RIGHT:
              x += containerWidth - width;
              break;

          case ANCHOR_RIGHT:
              x += containerWidth - width;
              y += (containerHeight - height) / 2;
              break;

          case ANCHOR_BOTTOM_RIGHT:
              x += containerWidth - width;
              y += containerHeight - height;
              break;

          case ANCHOR_BOTTOM:
              x += (containerWidth - width) / 2;
              y += containerHeight - height;
              break;

          case ANCHOR_BOTTOM_LEFT:
              y += containerHeight - height;
              break;

          case ANCHOR_LEFT:
              y += (containerHeight - height) / 2;
              break;

          case ANCHOR_CENTER:
              x += (containerWidth - width) / 2;
              y += (containerHeight - height) / 2;
              break;
      }

      return { x: x, y: y };
  };

  var computeItemLayout = function computeItemLayout(_ref3) {
      var direction = _ref3.direction,
          justify = _ref3.justify,
          symbolSize = _ref3.symbolSize,
          symbolSpacing = _ref3.symbolSpacing,
          width = _ref3.width,
          height = _ref3.height;

      var symbolX = void 0;
      var symbolY = void 0;

      var labelX = void 0;
      var labelY = void 0;
      var labelAnchor = void 0;
      var labelAlignment = void 0;

      switch (direction) {
          case DIRECTION_LEFT_TO_RIGHT:
              symbolX = 0;
              symbolY = (height - symbolSize) / 2;

              labelY = height / 2;
              labelAlignment = 'middle';
              if (justify === true) {
                  labelX = width;
                  labelAnchor = 'end';
              } else {
                  labelX = symbolSize + symbolSpacing;
                  labelAnchor = 'start';
              }
              break;

          case DIRECTION_RIGHT_TO_LEFT:
              symbolX = width - symbolSize;
              symbolY = (height - symbolSize) / 2;

              labelY = height / 2;
              labelAlignment = 'middle';
              if (justify === true) {
                  labelX = 0;
                  labelAnchor = 'start';
              } else {
                  labelX = width - symbolSize - symbolSpacing;
                  labelAnchor = 'end';
              }
              break;

          case DIRECTION_TOP_TO_BOTTOM:
              symbolX = (width - symbolSize) / 2;
              symbolY = 0;

              labelX = width / 2;

              labelAnchor = 'middle';
              if (justify === true) {
                  labelY = height;
                  labelAlignment = 'baseline';
              } else {
                  labelY = symbolSize + symbolSpacing;
                  labelAlignment = 'hanging';
              }
              break;

          case DIRECTION_BOTTOM_TO_TOP:
              symbolX = (width - symbolSize) / 2;
              symbolY = height - symbolSize;

              labelX = width / 2;
              labelAnchor = 'middle';
              if (justify === true) {
                  labelY = 0;
                  labelAlignment = 'hanging';
              } else {
                  labelY = height - symbolSize - symbolSpacing;
                  labelAlignment = 'baseline';
              }
              break;
      }

      return {
          symbolX: symbolX,
          symbolY: symbolY,

          labelX: labelX,
          labelY: labelY,
          labelAnchor: labelAnchor,
          labelAlignment: labelAlignment
      };
  };

  var symbolPropTypes$1 = {
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      fill: PropTypes.string.isRequired,
      borderWidth: PropTypes.number.isRequired,
      borderColor: PropTypes.string.isRequired
  };

  var symbolDefaultProps = {
      borderWidth: 0,
      borderColor: 'transparent'
  };

  var SymbolCircle = function (_PureComponent) {
      inherits(SymbolCircle, _PureComponent);

      function SymbolCircle() {
          classCallCheck(this, SymbolCircle);
          return possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
      }

      SymbolCircle.prototype.render = function render() {
          var _props = this.props,
              x = _props.x,
              y = _props.y,
              size = _props.size,
              fill = _props.fill,
              borderWidth = _props.borderWidth,
              borderColor = _props.borderColor;


          return React__default.createElement('circle', {
              r: size / 2,
              cx: x + size / 2,
              cy: y + size / 2,
              fill: fill,
              strokeWidth: borderWidth,
              stroke: borderColor,
              style: {
                  pointerEvents: 'none'
              }
          });
      };

      return SymbolCircle;
  }(React.PureComponent);

  SymbolCircle.propTypes = _extends({}, symbolPropTypes$1);
  SymbolCircle.defaultProps = _extends({}, symbolDefaultProps);

  var SymbolDiamond = function (_PureComponent) {
      inherits(SymbolDiamond, _PureComponent);

      function SymbolDiamond() {
          classCallCheck(this, SymbolDiamond);
          return possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
      }

      SymbolDiamond.prototype.render = function render() {
          var _props = this.props,
              x = _props.x,
              y = _props.y,
              size = _props.size,
              fill = _props.fill,
              borderWidth = _props.borderWidth,
              borderColor = _props.borderColor;


          return React__default.createElement(
              'g',
              { transform: 'translate(' + x + ',' + y + ')' },
              React__default.createElement('path', {
                  d: '\n                    M' + size / 2 + ' 0\n                    L' + size * 0.8 + ' ' + size / 2 + '\n                    L' + size / 2 + ' ' + size + '\n                    L' + size * 0.2 + ' ' + size / 2 + '\n                    L' + size / 2 + ' 0\n                ',
                  fill: fill,
                  strokeWidth: borderWidth,
                  stroke: borderColor,
                  style: {
                      pointerEvents: 'none'
                  }
              })
          );
      };

      return SymbolDiamond;
  }(React.PureComponent);

  SymbolDiamond.propTypes = _extends({}, symbolPropTypes$1);
  SymbolDiamond.defaultProps = _extends({}, symbolDefaultProps);

  var SymbolSquare = function (_PureComponent) {
      inherits(SymbolSquare, _PureComponent);

      function SymbolSquare() {
          classCallCheck(this, SymbolSquare);
          return possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
      }

      SymbolSquare.prototype.render = function render() {
          var _props = this.props,
              x = _props.x,
              y = _props.y,
              size = _props.size,
              fill = _props.fill,
              borderWidth = _props.borderWidth,
              borderColor = _props.borderColor;


          return React__default.createElement('rect', {
              x: x,
              y: y,
              fill: fill,
              strokeWidth: borderWidth,
              stroke: borderColor,
              width: size,
              height: size,
              style: {
                  pointerEvents: 'none'
              }
          });
      };

      return SymbolSquare;
  }(React.PureComponent);

  SymbolSquare.propTypes = _extends({}, symbolPropTypes$1);
  SymbolSquare.defaultProps = _extends({}, symbolDefaultProps);

  var SymbolTriangle = function (_PureComponent) {
      inherits(SymbolTriangle, _PureComponent);

      function SymbolTriangle() {
          classCallCheck(this, SymbolTriangle);
          return possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
      }

      SymbolTriangle.prototype.render = function render() {
          var _props = this.props,
              x = _props.x,
              y = _props.y,
              size = _props.size,
              fill = _props.fill,
              borderWidth = _props.borderWidth,
              borderColor = _props.borderColor;


          return React__default.createElement(
              'g',
              { transform: 'translate(' + x + ',' + y + ')' },
              React__default.createElement('path', {
                  d: '\n                M' + size / 2 + ' 0\n                L' + size + ' ' + size + '\n                L0 ' + size + '\n                L' + size / 2 + ' 0\n            ',
                  fill: fill,
                  strokeWidth: borderWidth,
                  stroke: borderColor,
                  style: {
                      pointerEvents: 'none'
                  }
              })
          );
      };

      return SymbolTriangle;
  }(React.PureComponent);

  SymbolTriangle.propTypes = _extends({}, symbolPropTypes$1);
  SymbolTriangle.defaultProps = _extends({}, symbolDefaultProps);

  var symbolByShape = {
      circle: SymbolCircle,
      diamond: SymbolDiamond,
      square: SymbolSquare,
      triangle: SymbolTriangle
  };

  var LegendSvgItem = function (_Component) {
      inherits(LegendSvgItem, _Component);

      function LegendSvgItem() {
          var _temp, _this, _ret;

          classCallCheck(this, LegendSvgItem);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
              style: {}
          }, _this.handleClick = function (event) {
              var _this$props = _this.props,
                  onClick = _this$props.onClick,
                  data = _this$props.data;


              if (onClick === undefined) return;
              onClick(data, event);
          }, _this.handleMouseEnter = function (event) {
              var _this$props2 = _this.props,
                  onMouseEnter = _this$props2.onMouseEnter,
                  data = _this$props2.data,
                  effects = _this$props2.effects;


              if (effects.length > 0) {
                  var applyEffects = effects.filter(function (_ref) {
                      var on = _ref.on;
                      return on === 'hover';
                  });
                  var style = applyEffects.reduce(function (acc, effect) {
                      return _extends({}, acc, effect.style);
                  }, {});
                  _this.setState({ style: style });
              }

              if (onMouseEnter === undefined) return;
              onMouseEnter(data, event);
          }, _this.handleMouseLeave = function () {
              var _this$props3 = _this.props,
                  onMouseLeave = _this$props3.onMouseLeave,
                  data = _this$props3.data,
                  effects = _this$props3.effects;


              if (effects.length > 0) {
                  var applyEffects = effects.filter(function (_ref2) {
                      var on = _ref2.on;
                      return on !== 'hover';
                  });
                  var style = applyEffects.reduce(function (acc, effect) {
                      return _extends({}, acc, effect.style);
                  }, {});
                  _this.setState({ style: style });
              }

              if (onMouseLeave === undefined) return;
              onMouseLeave(data, event);
          }, _temp), possibleConstructorReturn(_this, _ret);
      }

      LegendSvgItem.prototype.render = function render() {
          var _props = this.props,
              x = _props.x,
              y = _props.y,
              width = _props.width,
              height = _props.height,
              data = _props.data,
              direction = _props.direction,
              justify = _props.justify,
              textColor = _props.textColor,
              background = _props.background,
              opacity = _props.opacity,
              symbolShape = _props.symbolShape,
              symbolSize = _props.symbolSize,
              symbolSpacing = _props.symbolSpacing,
              symbolBorderWidth = _props.symbolBorderWidth,
              symbolBorderColor = _props.symbolBorderColor,
              onClick = _props.onClick,
              onMouseEnter = _props.onMouseEnter,
              onMouseLeave = _props.onMouseLeave,
              theme = _props.theme;
          var style = this.state.style;

          var _computeItemLayout = computeItemLayout({
              direction: direction,
              justify: justify,
              symbolSize: style.symbolSize || symbolSize,
              symbolSpacing: symbolSpacing,
              width: width,
              height: height
          }),
              symbolX = _computeItemLayout.symbolX,
              symbolY = _computeItemLayout.symbolY,
              labelX = _computeItemLayout.labelX,
              labelY = _computeItemLayout.labelY,
              labelAnchor = _computeItemLayout.labelAnchor,
              labelAlignment = _computeItemLayout.labelAlignment;

          var isInteractive = [onClick, onMouseEnter, onMouseLeave].some(function (handler) {
              return handler !== undefined;
          });

          var Symbol = void 0;
          if (lodash.isFunction(symbolShape)) {
              Symbol = symbolShape;
          } else {
              Symbol = symbolByShape[symbolShape];
          }

          return React__default.createElement(
              'g',
              {
                  transform: 'translate(' + x + ',' + y + ')',
                  style: {
                      opacity: style.itemOpacity !== undefined ? style.itemOpacity : opacity
                  }
              },
              React__default.createElement('rect', {
                  width: width,
                  height: height,
                  fill: style.itemBackground || background,
                  style: {
                      cursor: isInteractive ? 'pointer' : 'auto'
                  },
                  onClick: this.handleClick,
                  onMouseEnter: this.handleMouseEnter,
                  onMouseLeave: this.handleMouseLeave
              }),
              React__default.createElement(Symbol, {
                  x: symbolX,
                  y: symbolY,
                  size: style.symbolSize || symbolSize,
                  fill: data.fill || data.color,
                  borderWidth: style.symbolBorderWidth !== undefined ? style.symbolBorderWidth : symbolBorderWidth,
                  borderColor: style.symbolBorderColor || symbolBorderColor
              }),
              React__default.createElement(
                  'text',
                  {
                      textAnchor: labelAnchor,
                      style: _extends({}, theme.legends.text, {
                          fill: style.itemTextColor || textColor,
                          alignmentBaseline: labelAlignment,
                          pointerEvents: 'none',
                          userSelect: 'none'
                      }),
                      x: labelX,
                      y: labelY
                  },
                  data.label
              )
          );
      };

      return LegendSvgItem;
  }(React.Component);

  LegendSvgItem.propTypes = _extends({
      data: datumPropType.isRequired,

      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,

      textColor: PropTypes.string,
      background: PropTypes.string,
      opacity: PropTypes.number,

      direction: PropTypes.oneOf([DIRECTION_LEFT_TO_RIGHT, DIRECTION_RIGHT_TO_LEFT, DIRECTION_TOP_TO_BOTTOM, DIRECTION_BOTTOM_TO_TOP]).isRequired,
      justify: PropTypes.bool.isRequired

  }, symbolPropTypes, interactivityPropTypes);
  LegendSvgItem.defaultProps = {
      direction: DIRECTION_LEFT_TO_RIGHT,
      justify: false,

      textColor: 'black',
      background: 'transparent',
      opacity: 1,

      // symbol
      symbolShape: 'square',
      symbolSize: 16,
      symbolSpacing: 8,
      symbolBorderWidth: 0,
      symbolBorderColor: 'transparent',

      effects: []
  };

  var LegendSvg = function LegendSvg(_ref) {
      var data = _ref.data,
          x = _ref.x,
          y = _ref.y,
          direction = _ref.direction,
          _padding = _ref.padding,
          justify = _ref.justify,
          effects = _ref.effects,
          itemWidth = _ref.itemWidth,
          itemHeight = _ref.itemHeight,
          itemDirection = _ref.itemDirection,
          itemsSpacing = _ref.itemsSpacing,
          itemTextColor = _ref.itemTextColor,
          itemBackground = _ref.itemBackground,
          itemOpacity = _ref.itemOpacity,
          symbolShape = _ref.symbolShape,
          symbolSize = _ref.symbolSize,
          symbolSpacing = _ref.symbolSpacing,
          symbolBorderWidth = _ref.symbolBorderWidth,
          symbolBorderColor = _ref.symbolBorderColor,
          onClick = _ref.onClick,
          onMouseEnter = _ref.onMouseEnter,
          onMouseLeave = _ref.onMouseLeave,
          theme = _ref.theme;

      // eslint-disable-next-line no-unused-vars
      var _computeDimensions = computeDimensions({
          itemCount: data.length,
          itemWidth: itemWidth,
          itemHeight: itemHeight,
          itemsSpacing: itemsSpacing,
          direction: direction,
          padding: _padding
      }),
          padding = _computeDimensions.padding;

      var xStep = 0;
      var yStep = 0;
      if (direction === DIRECTION_ROW) {
          xStep = itemWidth + itemsSpacing;
      } else if (direction === DIRECTION_COLUMN) {
          yStep = itemHeight + itemsSpacing;
      }

      return React__default.createElement(
          'g',
          { transform: 'translate(' + x + ',' + y + ')' },
          data.map(function (data, i) {
              return React__default.createElement(LegendSvgItem, {
                  key: i,
                  data: data,
                  x: i * xStep + padding.left,
                  y: i * yStep + padding.top,
                  width: itemWidth,
                  height: itemHeight,
                  direction: itemDirection,
                  justify: justify,
                  effects: effects,
                  textColor: itemTextColor,
                  background: itemBackground,
                  opacity: itemOpacity,
                  symbolShape: symbolShape,
                  symbolSize: symbolSize,
                  symbolSpacing: symbolSpacing,
                  symbolBorderWidth: symbolBorderWidth,
                  symbolBorderColor: symbolBorderColor,
                  onClick: onClick,
                  onMouseEnter: onMouseEnter,
                  onMouseLeave: onMouseLeave,
                  theme: theme
              });
          })
      );
  };

  LegendSvg.propTypes = _extends({
      data: PropTypes.arrayOf(datumPropType).isRequired,

      // position/layout
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      direction: PropTypes.oneOf([DIRECTION_COLUMN, DIRECTION_ROW]).isRequired,
      padding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
          top: PropTypes.number,
          right: PropTypes.number,
          bottom: PropTypes.number,
          left: PropTypes.number
      })]).isRequired,
      justify: PropTypes.bool.isRequired,

      // items
      itemsSpacing: PropTypes.number.isRequired,
      itemWidth: PropTypes.number.isRequired,
      itemHeight: PropTypes.number.isRequired,
      itemDirection: PropTypes.oneOf([DIRECTION_LEFT_TO_RIGHT, DIRECTION_RIGHT_TO_LEFT, DIRECTION_TOP_TO_BOTTOM, DIRECTION_BOTTOM_TO_TOP]).isRequired,
      itemTextColor: PropTypes.string.isRequired,
      itemBackground: PropTypes.string.isRequired,
      itemOpacity: PropTypes.number.isRequired

  }, symbolPropTypes, interactivityPropTypes);

  LegendSvg.defaultProps = {
      // position/layout
      padding: 0,
      justify: false,

      // items
      itemsSpacing: 0,
      itemDirection: DIRECTION_LEFT_TO_RIGHT,
      itemTextColor: 'black',
      itemBackground: 'transparent',
      itemOpacity: 1
  };

  var BoxLegendSvg = function BoxLegendSvg(_ref) {
      var data = _ref.data,
          containerWidth = _ref.containerWidth,
          containerHeight = _ref.containerHeight,
          translateX = _ref.translateX,
          translateY = _ref.translateY,
          anchor = _ref.anchor,
          direction = _ref.direction,
          padding = _ref.padding,
          justify = _ref.justify,
          itemsSpacing = _ref.itemsSpacing,
          itemWidth = _ref.itemWidth,
          itemHeight = _ref.itemHeight,
          itemDirection = _ref.itemDirection,
          itemTextColor = _ref.itemTextColor,
          itemBackground = _ref.itemBackground,
          itemOpacity = _ref.itemOpacity,
          symbolShape = _ref.symbolShape,
          symbolSize = _ref.symbolSize,
          symbolSpacing = _ref.symbolSpacing,
          symbolBorderWidth = _ref.symbolBorderWidth,
          symbolBorderColor = _ref.symbolBorderColor,
          onClick = _ref.onClick,
          onMouseEnter = _ref.onMouseEnter,
          onMouseLeave = _ref.onMouseLeave,
          effects = _ref.effects,
          theme = _ref.theme;

      var _computeDimensions = computeDimensions({
          itemCount: data.length,
          itemsSpacing: itemsSpacing,
          itemWidth: itemWidth,
          itemHeight: itemHeight,
          direction: direction,
          padding: padding
      }),
          width = _computeDimensions.width,
          height = _computeDimensions.height;

      var _computePositionFromA = computePositionFromAnchor({
          anchor: anchor,
          translateX: translateX,
          translateY: translateY,
          containerWidth: containerWidth,
          containerHeight: containerHeight,
          width: width,
          height: height
      }),
          x = _computePositionFromA.x,
          y = _computePositionFromA.y;

      return React__default.createElement(LegendSvg, {
          data: data,
          x: x,
          y: y,
          direction: direction,
          padding: padding,
          justify: justify,
          effects: effects,
          itemsSpacing: itemsSpacing,
          itemWidth: itemWidth,
          itemHeight: itemHeight,
          itemDirection: itemDirection,
          itemTextColor: itemTextColor,
          itemBackground: itemBackground,
          itemOpacity: itemOpacity,
          symbolShape: symbolShape,
          symbolSize: symbolSize,
          symbolSpacing: symbolSpacing,
          symbolBorderWidth: symbolBorderWidth,
          symbolBorderColor: symbolBorderColor,
          onClick: onClick,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
          theme: theme
      });
  };

  BoxLegendSvg.propTypes = _extends({
      data: PropTypes.arrayOf(datumPropType).isRequired,
      containerWidth: PropTypes.number.isRequired,
      containerHeight: PropTypes.number.isRequired,
      translateX: PropTypes.number.isRequired,
      translateY: PropTypes.number.isRequired,
      anchor: PropTypes.oneOf([ANCHOR_TOP, ANCHOR_TOP_RIGHT, ANCHOR_RIGHT, ANCHOR_BOTTOM_RIGHT, ANCHOR_BOTTOM, ANCHOR_BOTTOM_LEFT, ANCHOR_LEFT, ANCHOR_TOP_LEFT, ANCHOR_CENTER]).isRequired,
      direction: PropTypes.oneOf([DIRECTION_ROW, DIRECTION_COLUMN]).isRequired,
      padding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
          top: PropTypes.number,
          right: PropTypes.number,
          bottom: PropTypes.number,
          left: PropTypes.number
      })]).isRequired,
      justify: PropTypes.bool,

      itemWidth: PropTypes.number.isRequired,
      itemHeight: PropTypes.number.isRequired,
      itemDirection: PropTypes.oneOf([DIRECTION_LEFT_TO_RIGHT, DIRECTION_RIGHT_TO_LEFT, DIRECTION_TOP_TO_BOTTOM, DIRECTION_BOTTOM_TO_TOP]),
      itemsSpacing: PropTypes.number.isRequired,
      itemTextColor: PropTypes.string,
      itemBackground: PropTypes.string,
      itemOpacity: PropTypes.number

  }, symbolPropTypes, interactivityPropTypes);

  BoxLegendSvg.defaultProps = {
      translateX: 0,
      translateY: 0,
      itemsSpacing: LegendSvg.defaultProps.itemsSpacing,
      padding: LegendSvg.defaultProps.padding
  };

  var textPropsMapping = {
      align: {
          start: 'left',
          middle: 'center',
          end: 'right'
      },
      baseline: {
          hanging: 'top',
          middle: 'middle',
          baseline: 'bottom'
      }
  };

  var renderLegendToCanvas = function renderLegendToCanvas(ctx, _ref) {
      var data = _ref.data,
          containerWidth = _ref.containerWidth,
          containerHeight = _ref.containerHeight,
          _ref$translateX = _ref.translateX,
          translateX = _ref$translateX === undefined ? BoxLegendSvg.defaultProps.translateX : _ref$translateX,
          _ref$translateY = _ref.translateY,
          translateY = _ref$translateY === undefined ? BoxLegendSvg.defaultProps.translateY : _ref$translateY,
          anchor = _ref.anchor,
          direction = _ref.direction,
          _ref$padding = _ref.padding,
          _padding = _ref$padding === undefined ? LegendSvg.defaultProps.padding : _ref$padding,
          _ref$justify = _ref.justify,
          justify = _ref$justify === undefined ? LegendSvgItem.defaultProps.justify : _ref$justify,
          _ref$itemsSpacing = _ref.itemsSpacing,
          itemsSpacing = _ref$itemsSpacing === undefined ? LegendSvg.defaultProps.itemsSpacing : _ref$itemsSpacing,
          itemWidth = _ref.itemWidth,
          itemHeight = _ref.itemHeight,
          _ref$itemDirection = _ref.itemDirection,
          itemDirection = _ref$itemDirection === undefined ? LegendSvgItem.defaultProps.direction : _ref$itemDirection,
          _ref$itemTextColor = _ref.itemTextColor,
          itemTextColor = _ref$itemTextColor === undefined ? LegendSvg.defaultProps.textColor : _ref$itemTextColor,
          _ref$symbolSize = _ref.symbolSize,
          symbolSize = _ref$symbolSize === undefined ? LegendSvgItem.defaultProps.symbolSize : _ref$symbolSize,
          _ref$symbolSpacing = _ref.symbolSpacing,
          symbolSpacing = _ref$symbolSpacing === undefined ? LegendSvgItem.defaultProps.symbolSpacing : _ref$symbolSpacing;

      var _computeDimensions = computeDimensions({
          itemCount: data.length,
          itemWidth: itemWidth,
          itemHeight: itemHeight,
          itemsSpacing: itemsSpacing,
          direction: direction,
          padding: _padding
      }),
          width = _computeDimensions.width,
          height = _computeDimensions.height,
          padding = _computeDimensions.padding;

      var _computePositionFromA = computePositionFromAnchor({
          anchor: anchor,
          translateX: translateX,
          translateY: translateY,
          containerWidth: containerWidth,
          containerHeight: containerHeight,
          width: width,
          height: height
      }),
          x = _computePositionFromA.x,
          y = _computePositionFromA.y;

      var xStep = 0;
      var yStep = 0;
      if (direction === DIRECTION_ROW) {
          xStep = itemWidth + itemsSpacing;
      } else if (direction === DIRECTION_COLUMN) {
          yStep = itemHeight + itemsSpacing;
      }

      ctx.save();
      ctx.translate(x, y);

      data.forEach(function (d, i) {
          var itemX = i * xStep + padding.left;
          var itemY = i * yStep + padding.top;

          var _computeItemLayout = computeItemLayout({
              direction: itemDirection,
              justify: justify,
              symbolSize: symbolSize,
              symbolSpacing: symbolSpacing,
              width: itemWidth,
              height: itemHeight
          }),
              symbolX = _computeItemLayout.symbolX,
              symbolY = _computeItemLayout.symbolY,
              labelX = _computeItemLayout.labelX,
              labelY = _computeItemLayout.labelY,
              labelAnchor = _computeItemLayout.labelAnchor,
              labelAlignment = _computeItemLayout.labelAlignment;

          ctx.fillStyle = d.color;
          ctx.fillRect(itemX + symbolX, itemY + symbolY, symbolSize, symbolSize);

          ctx.textAlign = textPropsMapping.align[labelAnchor];
          ctx.textBaseline = textPropsMapping.baseline[labelAlignment];
          ctx.fillStyle = itemTextColor;
          ctx.fillText(d.label, itemX + labelX, itemY + labelY);
      });

      ctx.restore();
  };

  exports.BoxLegendSvg = BoxLegendSvg;
  exports.LegendSvg = LegendSvg;
  exports.LegendSvgItem = LegendSvgItem;
  exports.renderLegendToCanvas = renderLegendToCanvas;
  exports.DIRECTION_ROW = DIRECTION_ROW;
  exports.DIRECTION_COLUMN = DIRECTION_COLUMN;
  exports.ANCHOR_TOP = ANCHOR_TOP;
  exports.ANCHOR_TOP_RIGHT = ANCHOR_TOP_RIGHT;
  exports.ANCHOR_RIGHT = ANCHOR_RIGHT;
  exports.ANCHOR_BOTTOM_RIGHT = ANCHOR_BOTTOM_RIGHT;
  exports.ANCHOR_BOTTOM = ANCHOR_BOTTOM;
  exports.ANCHOR_BOTTOM_LEFT = ANCHOR_BOTTOM_LEFT;
  exports.ANCHOR_LEFT = ANCHOR_LEFT;
  exports.ANCHOR_TOP_LEFT = ANCHOR_TOP_LEFT;
  exports.ANCHOR_CENTER = ANCHOR_CENTER;
  exports.DIRECTION_LEFT_TO_RIGHT = DIRECTION_LEFT_TO_RIGHT;
  exports.DIRECTION_RIGHT_TO_LEFT = DIRECTION_RIGHT_TO_LEFT;
  exports.DIRECTION_TOP_TO_BOTTOM = DIRECTION_TOP_TO_BOTTOM;
  exports.DIRECTION_BOTTOM_TO_TOP = DIRECTION_BOTTOM_TO_TOP;
  exports.legendEffectPropType = legendEffectPropType;
  exports.symbolPropTypes = symbolPropTypes;
  exports.interactivityPropTypes = interactivityPropTypes;
  exports.datumPropType = datumPropType;
  exports.LegendPropShape = LegendPropShape;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
