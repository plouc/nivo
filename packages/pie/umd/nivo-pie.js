(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('d3-shape'), require('recompose/setDisplayName'), require('recompose/compose'), require('recompose/pure'), require('recompose/defaultProps'), require('recompose/withPropsOnChange'), require('@nivo/core'), require('@nivo/legends')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'd3-shape', 'recompose/setDisplayName', 'recompose/compose', 'recompose/pure', 'recompose/defaultProps', 'recompose/withPropsOnChange', '@nivo/core', '@nivo/legends'], factory) :
  (factory((global.nivo = global.nivo || {}),global.React,global.PropTypes,global.d3,global.RecomposeSetDisplayName,global.RecomposeCompose,global.RecomposePure,global.RecomposeDefaultProps,global.RecomposeWithPropsOnChange,global.nivo,global.nivo));
}(this, (function (exports,React,PropTypes,d3Shape,setDisplayName,compose,pure,defaultProps,withPropsOnChange,core,legends) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  setDisplayName = setDisplayName && setDisplayName.hasOwnProperty('default') ? setDisplayName['default'] : setDisplayName;
  compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
  pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
  defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
  withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;

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

  var PieLayout = function (_Component) {
      inherits(PieLayout, _Component);

      function PieLayout() {
          classCallCheck(this, PieLayout);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      PieLayout.prototype.render = function render() {
          var _props = this.props,
              arcs = _props.arcs,
              arcGenerator = _props.arcGenerator,
              startAngle = _props.startAngle,
              endAngle = _props.endAngle,
              width = _props.width,
              height = _props.height,
              centerX = _props.centerX,
              centerY = _props.centerY,
              radius = _props.radius,
              innerRadius = _props.innerRadius,
              debug = _props.debug,
              render = _props.children;


          return render({
              arcs: arcs,
              arcGenerator: arcGenerator,
              startAngle: startAngle,
              endAngle: endAngle,
              width: width,
              height: height,
              centerX: centerX,
              centerY: centerY,
              radius: radius,
              innerRadius: innerRadius,
              debug: debug
          });
      };

      return PieLayout;
  }(React.Component);

  PieLayout.propTypes = {
      data: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired,
          value: PropTypes.number.isRequired
      })).isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      fit: PropTypes.bool.isRequired,
      sortByValue: PropTypes.bool.isRequired,
      startAngle: PropTypes.number.isRequired,
      endAngle: PropTypes.number.isRequired,
      padAngle: PropTypes.number.isRequired,
      arcs: PropTypes.array.isRequired, // computed
      arcGenerator: PropTypes.func.isRequired, // computed
      centerX: PropTypes.number.isRequired, // computed
      centerY: PropTypes.number.isRequired, // computed
      radius: PropTypes.number.isRequired, // computed
      innerRadius: PropTypes.number.isRequired, // re-computed
      cornerRadius: PropTypes.number.isRequired,
      debug: PropTypes.shape({
          points: PropTypes.array.isRequired,
          box: PropTypes.shape({
              x: PropTypes.number.isRequired,
              y: PropTypes.number.isRequired,
              width: PropTypes.number.isRequired,
              height: PropTypes.number.isRequired
          }).isRequired,
          ratio: PropTypes.number.isRequired
      }), // computed
      children: PropTypes.func.isRequired
  };


  var PieLayoutDefaultProps = {
      fit: true,
      sortByValue: false,
      innerRadius: 0,
      startAngle: 0,
      endAngle: 360,
      padAngle: 0,
      cornerRadius: 0
  };

  var enhance = function enhance(Component) {
      return compose(defaultProps(PieLayoutDefaultProps), core.withColors(), withPropsOnChange(['width', 'height', 'innerRadius', 'startAngle', 'endAngle', 'fit', 'cornerRadius'], function (_ref) {
          var width = _ref.width,
              height = _ref.height,
              _innerRadius = _ref.innerRadius,
              startAngle = _ref.startAngle,
              endAngle = _ref.endAngle,
              fit = _ref.fit,
              cornerRadius = _ref.cornerRadius;

          var radius = Math.min(width, height) / 2;
          var innerRadius = radius * Math.min(_innerRadius, 1);

          var centerX = width / 2;
          var centerY = height / 2;

          var boundingBox = void 0;
          if (fit === true) {
              var _computeArcBoundingBo = core.computeArcBoundingBox(centerX, centerY, radius, startAngle - 90, endAngle - 90),
                  points = _computeArcBoundingBo.points,
                  box = objectWithoutProperties(_computeArcBoundingBo, ['points']);

              var ratio = Math.min(width / box.width, height / box.height);

              var adjustedBox = {
                  width: box.width * ratio,
                  height: box.height * ratio
              };
              adjustedBox.x = (width - adjustedBox.width) / 2;
              adjustedBox.y = (height - adjustedBox.height) / 2;

              centerX = (centerX - box.x) / box.width * box.width * ratio + adjustedBox.x;
              centerY = (centerY - box.y) / box.height * box.height * ratio + adjustedBox.y;

              boundingBox = { box: box, ratio: ratio, points: points };

              radius = radius * ratio;
              innerRadius = innerRadius * ratio;
          }

          var arcGenerator = d3Shape.arc().outerRadius(radius).innerRadius(innerRadius).cornerRadius(cornerRadius);

          return {
              centerX: centerX,
              centerY: centerY,
              radius: radius,
              innerRadius: innerRadius,
              arcGenerator: arcGenerator,
              debug: boundingBox
          };
      }), withPropsOnChange(['sortByValue', 'padAngle', 'startAngle', 'endAngle'], function (_ref2) {
          var sortByValue = _ref2.sortByValue,
              padAngle = _ref2.padAngle,
              startAngle = _ref2.startAngle,
              endAngle = _ref2.endAngle;

          var pie = d3Shape.pie().value(function (d) {
              return d.value;
          }).padAngle(core.degreesToRadians(padAngle)).startAngle(core.degreesToRadians(startAngle)).endAngle(core.degreesToRadians(endAngle));

          if (sortByValue !== true) pie.sortValues(null);

          return { pie: pie };
      }), withPropsOnChange(['pie', 'data'], function (_ref3) {
          var pie = _ref3.pie,
              data = _ref3.data;
          return {
              arcs: pie(data).map(function (arc) {
                  var angle = Math.abs(arc.endAngle - arc.startAngle);

                  return _extends({}, arc, {
                      angle: angle,
                      angleDeg: core.radiansToDegrees(angle)
                  });
              })
          };
      }), withPropsOnChange(['arcs', 'getColor'], function (_ref4) {
          var arcs = _ref4.arcs,
              getColor = _ref4.getColor;
          return {
              arcs: arcs.map(function (arc) {
                  return _extends({}, arc, {
                      color: getColor(arc.data)
                  });
              })
          };
      }), pure)(Component);
  };
  var PieLayout$1 = setDisplayName('PieLayout')(enhance(PieLayout));

  var arcPropType = PropTypes.shape({
      startAngle: PropTypes.number.isRequired,
      endAngle: PropTypes.number.isRequired,
      angle: PropTypes.number.isRequired,
      angleDeg: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      data: PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          value: PropTypes.number.isRequired
      }).isRequired
  });

  var PiePropTypes = {
      data: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          value: PropTypes.number.isRequired
      })).isRequired,

      // layout
      startAngle: PropTypes.number.isRequired,
      endAngle: PropTypes.number.isRequired,
      fit: PropTypes.bool.isRequired,
      padAngle: PropTypes.number.isRequired,
      sortByValue: PropTypes.bool.isRequired,
      innerRadius: PropTypes.number.isRequired,
      cornerRadius: PropTypes.number.isRequired,

      // border
      borderWidth: PropTypes.number.isRequired,
      borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

      // radial labels
      enableRadialLabels: PropTypes.bool.isRequired,
      radialLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      radialLabelsSkipAngle: PropTypes.number,
      radialLabelsTextXOffset: PropTypes.number,
      radialLabelsTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      radialLabelsLinkOffset: PropTypes.number,
      radialLabelsLinkDiagonalLength: PropTypes.number,
      radialLabelsLinkHorizontalLength: PropTypes.number,
      radialLabelsLinkStrokeWidth: PropTypes.number,
      radialLabelsLinkColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

      // slices labels
      enableSlicesLabels: PropTypes.bool.isRequired,
      sliceLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      slicesLabelsSkipAngle: PropTypes.number,
      slicesLabelsTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

      // styling
      defs: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired
      })).isRequired,
      fill: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          match: PropTypes.oneOfType([PropTypes.oneOf(['*']), PropTypes.object, PropTypes.func]).isRequired
      })).isRequired,
      //boundDefs: PropTypes.array.isRequired, // computed

      // interactivity
      isInteractive: PropTypes.bool,
      onClick: PropTypes.func.isRequired,

      // tooltip
      lockTooltip: PropTypes.bool.isRequired,
      tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      tooltip: PropTypes.func,

      // legends
      legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired
      /*
      legendData: PropTypes.arrayOf(
          PropTypes.shape({
              label: PropTypes.string.isRequired,
              fill: PropTypes.string.isRequired,
          })
      ).isRequired,
      */
  };

  var PieDefaultProps = {
      sortByValue: false,
      innerRadius: 0,
      padAngle: 0,
      cornerRadius: 0,

      // layout
      startAngle: 0,
      endAngle: core.radiansToDegrees(Math.PI * 2),
      fit: true,

      // border
      borderWidth: 0,
      borderColor: 'inherit:darker(1)',

      // radial labels
      enableRadialLabels: true,
      radialLabel: 'id',
      radialLabelsTextColor: 'theme',
      radialLabelsLinkColor: 'theme',

      // slices labels
      enableSlicesLabels: true,
      sliceLabel: 'value',
      slicesLabelsTextColor: 'theme',

      // styling
      defs: [],
      fill: [],

      // interactivity
      isInteractive: true,
      onClick: core.noop,

      // tooltip
      lockTooltip: true,

      // legends
      legends: []
  };

  var PieSlice = function PieSlice(_ref) {
      var data = _ref.data,
          path = _ref.path,
          color = _ref.color,
          fill = _ref.fill,
          borderWidth = _ref.borderWidth,
          borderColor = _ref.borderColor,
          showTooltip = _ref.showTooltip,
          hideTooltip = _ref.hideTooltip,
          onClick = _ref.onClick,
          tooltipFormat = _ref.tooltipFormat,
          tooltip = _ref.tooltip,
          theme = _ref.theme;

      var handleTooltip = function handleTooltip(e) {
          return showTooltip(React__default.createElement(core.BasicTooltip, {
              id: data.label,
              value: data.value,
              enableChip: true,
              color: color,
              theme: theme,
              format: tooltipFormat,
              renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _extends({ color: color }, data)) : null
          }), e);
      };

      return React__default.createElement('path', {
          key: data.id,
          d: path,
          fill: fill,
          strokeWidth: borderWidth,
          stroke: borderColor,
          onMouseEnter: handleTooltip,
          onMouseMove: handleTooltip,
          onMouseLeave: hideTooltip,
          onClick: onClick
      });
  };

  PieSlice.propTypes = {
      data: PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          value: PropTypes.number.isRequired
      }).isRequired,

      path: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      fill: PropTypes.string.isRequired,
      borderWidth: PropTypes.number.isRequired,
      borderColor: PropTypes.string.isRequired,

      tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      tooltip: PropTypes.func,
      showTooltip: PropTypes.func.isRequired,
      hideTooltip: PropTypes.func.isRequired,
      onClick: PropTypes.func,

      theme: PropTypes.shape({
          tooltip: PropTypes.shape({}).isRequired
      }).isRequired
  };

  var enhance$1 = compose(withPropsOnChange(['data', 'onClick'], function (_ref2) {
      var data = _ref2.data,
          _onClick = _ref2.onClick;
      return {
          onClick: function onClick(event) {
              return _onClick(data, event);
          }
      };
  }), pure);

  var PieSlice$1 = enhance$1(PieSlice);

  var computeRadialLabels = function computeRadialLabels(arcs, _ref) {
      var getLabel = _ref.getLabel,
          radius = _ref.radius,
          skipAngle = _ref.skipAngle,
          linkOffset = _ref.linkOffset,
          linkDiagonalLength = _ref.linkDiagonalLength,
          linkHorizontalLength = _ref.linkHorizontalLength,
          textXOffset = _ref.textXOffset;
      return arcs.filter(function (arc) {
          return skipAngle === 0 || arc.angleDeg > skipAngle;
      }).map(function (arc) {
          var angle = core.absoluteAngleRadians(core.midAngle(arc) - Math.PI / 2);
          var positionA = core.positionFromAngle(angle, radius + linkOffset);
          var positionB = core.positionFromAngle(angle, radius + linkOffset + linkDiagonalLength);

          var positionC = void 0;
          var labelPosition = void 0;
          var textAlign = void 0;

          if (core.absoluteAngleDegrees(core.radiansToDegrees(angle)) < 90 || core.absoluteAngleDegrees(core.radiansToDegrees(angle)) >= 270) {
              positionC = { x: positionB.x + linkHorizontalLength, y: positionB.y };
              labelPosition = {
                  x: positionB.x + linkHorizontalLength + textXOffset,
                  y: positionB.y
              };
              textAlign = 'left';
          } else {
              positionC = { x: positionB.x - linkHorizontalLength, y: positionB.y };
              labelPosition = {
                  x: positionB.x - linkHorizontalLength - textXOffset,
                  y: positionB.y
              };
              textAlign = 'right';
          }

          return {
              arc: arc,
              text: getLabel(arc.data),
              position: labelPosition,
              align: textAlign,
              line: [positionA, positionB, positionC]
          };
      });
  };

  var lineGenerator = d3Shape.line().x(function (d) {
      return d.x;
  }).y(function (d) {
      return d.y;
  });

  var PieRadialLabels = function (_Component) {
      inherits(PieRadialLabels, _Component);

      function PieRadialLabels() {
          classCallCheck(this, PieRadialLabels);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      PieRadialLabels.prototype.render = function render() {
          var _props = this.props,
              arcs = _props.arcs,
              label = _props.label,
              radius = _props.radius,
              skipAngle = _props.skipAngle,
              linkOffset = _props.linkOffset,
              linkDiagonalLength = _props.linkDiagonalLength,
              linkHorizontalLength = _props.linkHorizontalLength,
              linkStrokeWidth = _props.linkStrokeWidth,
              textXOffset = _props.textXOffset,
              textColor = _props.textColor,
              linkColor = _props.linkColor,
              theme = _props.theme;


          var labels = computeRadialLabels(arcs, {
              getLabel: label,
              radius: radius,
              skipAngle: skipAngle,
              linkOffset: linkOffset,
              linkDiagonalLength: linkDiagonalLength,
              linkHorizontalLength: linkHorizontalLength,
              textXOffset: textXOffset
          });

          return labels.map(function (label) {
              return React__default.createElement(
                  React.Fragment,
                  { key: label.arc.data.id },
                  React__default.createElement('path', {
                      d: lineGenerator(label.line),
                      fill: 'none',
                      style: { fill: 'none', stroke: linkColor(label.arc, theme) },
                      strokeWidth: linkStrokeWidth
                  }),
                  React__default.createElement(
                      'g',
                      { transform: 'translate(' + label.position.x + ', ' + label.position.y + ')' },
                      React__default.createElement(
                          'text',
                          {
                              textAnchor: core.textPropsByEngine.svg.align[label.align],
                              dy: '0.3em',
                              style: _extends({}, theme.labels.text, {
                                  fill: textColor(label.arc.data, theme)
                              })
                          },
                          label.text
                      )
                  )
              );
          });
      };

      return PieRadialLabels;
  }(React.Component);

  PieRadialLabels.propTypes = {
      arcs: PropTypes.arrayOf(arcPropType).isRequired,
      label: PropTypes.func.isRequired,
      skipAngle: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      linkOffset: PropTypes.number.isRequired,
      linkDiagonalLength: PropTypes.number.isRequired,
      linkHorizontalLength: PropTypes.number.isRequired,
      linkStrokeWidth: PropTypes.number.isRequired,
      textXOffset: PropTypes.number.isRequired,
      textColor: PropTypes.func.isRequired,
      linkColor: PropTypes.func.isRequired,
      theme: PropTypes.shape({
          axis: core.axisThemePropType.isRequired,
          labels: core.labelsThemePropType.isRequired
      }).isRequired
  };
  PieRadialLabels.defaultProps = {
      skipAngle: 0,
      linkOffset: 0,
      linkDiagonalLength: 16,
      linkHorizontalLength: 24,
      linkStrokeWidth: 1,
      textXOffset: 6
  };

  var sliceStyle = {
      pointerEvents: 'none'
  };

  var PieSlicesLabels = function (_Component) {
      inherits(PieSlicesLabels, _Component);

      function PieSlicesLabels() {
          classCallCheck(this, PieSlicesLabels);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      PieSlicesLabels.prototype.render = function render() {
          var _props = this.props,
              arcs = _props.arcs,
              label = _props.label,
              radius = _props.radius,
              skipAngle = _props.skipAngle,
              innerRadius = _props.innerRadius,
              textColor = _props.textColor,
              theme = _props.theme;


          var centerRadius = innerRadius + (radius - innerRadius) / 2;

          return React__default.createElement(
              React.Fragment,
              null,
              arcs.filter(function (arc) {
                  return skipAngle === 0 || arc.angleDeg > skipAngle;
              }).map(function (arc) {
                  var angle = core.midAngle(arc) - Math.PI / 2;
                  var position = core.positionFromAngle(angle, centerRadius);

                  return React__default.createElement(
                      'g',
                      {
                          key: arc.data.id,
                          transform: 'translate(' + position.x + ', ' + position.y + ')',
                          style: sliceStyle
                      },
                      React__default.createElement(
                          'text',
                          {
                              textAnchor: 'middle',
                              style: _extends({}, theme.labels.text, {
                                  fill: textColor(arc.data, theme)
                              })
                          },
                          label(arc.data)
                      )
                  );
              })
          );
      };

      return PieSlicesLabels;
  }(React.Component);

  PieSlicesLabels.propTypes = {
      arcs: PropTypes.arrayOf(arcPropType).isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      skipAngle: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      innerRadius: PropTypes.number.isRequired,
      textColor: PropTypes.func.isRequired,
      theme: PropTypes.shape({
          labels: core.labelsThemePropType.isRequired
      }).isRequired
  };
  PieSlicesLabels.defaultProps = {
      skipAngle: 0
  };

  var PieLegends = function (_Component) {
      inherits(PieLegends, _Component);

      function PieLegends() {
          classCallCheck(this, PieLegends);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      PieLegends.prototype.render = function render() {
          var _props = this.props,
              width = _props.width,
              height = _props.height,
              legends$$1 = _props.legends,
              data = _props.data,
              theme = _props.theme;


          return legends$$1.map(function (legend, i) {
              return React__default.createElement(legends.BoxLegendSvg, _extends({
                  key: i
              }, legend, {
                  containerWidth: width,
                  containerHeight: height,
                  data: data,
                  theme: theme
              }));
          });
      };

      return PieLegends;
  }(React.Component);

  PieLegends.propTypes = {
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      arcs: PropTypes.arrayOf(arcPropType).isRequired,
      data: PropTypes.arrayOf(PropTypes.object).isRequired,
      legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired,
      theme: core.themePropType.isRequired
  };


  var enhance$2 = function enhance(Component) {
      return compose(withPropsOnChange(['arcs'], function (_ref) {
          var arcs = _ref.arcs;
          return {
              data: arcs.map(function (arc) {
                  return {
                      id: arc.data.id,
                      label: arc.data.id,
                      color: arc.color,
                      fill: arc.fill
                  };
              })
          };
      }), pure)(Component);
  };

  var PieLegends$1 = setDisplayName('PieLegends')(enhance$2(PieLegends));

  var Pie = function (_Component) {
      inherits(Pie, _Component);

      function Pie() {
          classCallCheck(this, Pie);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      Pie.prototype.render = function render() {
          var _props = this.props,
              data = _props.data,
              sortByValue = _props.sortByValue,
              startAngle = _props.startAngle,
              endAngle = _props.endAngle,
              padAngle = _props.padAngle,
              fit = _props.fit,
              innerRadius = _props.innerRadius,
              cornerRadius = _props.cornerRadius,
              margin = _props.margin,
              width = _props.width,
              height = _props.height,
              outerWidth = _props.outerWidth,
              outerHeight = _props.outerHeight,
              colors = _props.colors,
              colorBy = _props.colorBy,
              borderWidth = _props.borderWidth,
              _borderColor = _props.borderColor,
              enableRadialLabels = _props.enableRadialLabels,
              getRadialLabel = _props.getRadialLabel,
              radialLabelsSkipAngle = _props.radialLabelsSkipAngle,
              radialLabelsLinkOffset = _props.radialLabelsLinkOffset,
              radialLabelsLinkDiagonalLength = _props.radialLabelsLinkDiagonalLength,
              radialLabelsLinkHorizontalLength = _props.radialLabelsLinkHorizontalLength,
              radialLabelsLinkStrokeWidth = _props.radialLabelsLinkStrokeWidth,
              radialLabelsTextXOffset = _props.radialLabelsTextXOffset,
              radialLabelsTextColor = _props.radialLabelsTextColor,
              radialLabelsLinkColor = _props.radialLabelsLinkColor,
              enableSlicesLabels = _props.enableSlicesLabels,
              getSliceLabel = _props.getSliceLabel,
              slicesLabelsSkipAngle = _props.slicesLabelsSkipAngle,
              slicesLabelsTextColor = _props.slicesLabelsTextColor,
              theme = _props.theme,
              defs = _props.defs,
              fill = _props.fill,
              isInteractive = _props.isInteractive,
              onClick = _props.onClick,
              tooltipFormat = _props.tooltipFormat,
              tooltip = _props.tooltip,
              legends$$1 = _props.legends;


          var borderColor = core.getInheritedColorGenerator(_borderColor);

          return React__default.createElement(
              PieLayout$1,
              {
                  width: width,
                  height: height,
                  data: data,
                  sortByValue: sortByValue,
                  startAngle: startAngle,
                  endAngle: endAngle,
                  fit: fit,
                  padAngle: padAngle,
                  innerRadius: innerRadius,
                  cornerRadius: cornerRadius,
                  colors: colors,
                  colorBy: colorBy
              },
              function (_ref) {
                  var centerX = _ref.centerX,
                      centerY = _ref.centerY,
                      radius = _ref.radius,
                      innerRadius = _ref.innerRadius,
                      arcs = _ref.arcs,
                      arcGenerator = _ref.arcGenerator;

                  var boundDefs = core.bindDefs(defs, arcs, fill, {
                      dataKey: 'data'
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
                                  defs: boundDefs,
                                  theme: theme
                              },
                              React__default.createElement(
                                  'g',
                                  { transform: 'translate(' + centerX + ',' + centerY + ')' },
                                  arcs.map(function (arc) {
                                      return React__default.createElement(PieSlice$1, {
                                          key: arc.data.id,
                                          data: arc.data,
                                          path: arcGenerator(arc),
                                          color: arc.color,
                                          fill: arc.fill ? arc.fill : arc.color,
                                          borderWidth: borderWidth,
                                          borderColor: borderColor(arc),
                                          showTooltip: showTooltip,
                                          hideTooltip: hideTooltip,
                                          tooltipFormat: tooltipFormat,
                                          tooltip: tooltip,
                                          onClick: onClick,
                                          theme: theme
                                      });
                                  }),
                                  enableRadialLabels && React__default.createElement(PieRadialLabels, {
                                      arcs: arcs,
                                      radius: radius,
                                      label: getRadialLabel,
                                      skipAngle: radialLabelsSkipAngle,
                                      linkOffset: radialLabelsLinkOffset,
                                      linkDiagonalLength: radialLabelsLinkDiagonalLength,
                                      linkHorizontalLength: radialLabelsLinkHorizontalLength,
                                      linkStrokeWidth: radialLabelsLinkStrokeWidth,
                                      textXOffset: radialLabelsTextXOffset,
                                      textColor: core.getInheritedColorGenerator(radialLabelsTextColor, 'labels.text.fill'),
                                      linkColor: core.getInheritedColorGenerator(radialLabelsLinkColor, 'axis.ticks.line.stroke'),
                                      theme: theme
                                  }),
                                  enableSlicesLabels && React__default.createElement(PieSlicesLabels, {
                                      arcs: arcs,
                                      radius: radius,
                                      innerRadius: innerRadius,
                                      theme: theme,
                                      label: getSliceLabel,
                                      skipAngle: slicesLabelsSkipAngle,
                                      textColor: core.getInheritedColorGenerator(slicesLabelsTextColor, 'labels.text.fill')
                                  })
                              ),
                              React__default.createElement(PieLegends$1, {
                                  width: width,
                                  height: height,
                                  arcs: arcs,
                                  legends: legends$$1,
                                  theme: theme
                              })
                          );
                      }
                  );
              }
          );
      };

      return Pie;
  }(React.Component);

  Pie.propTypes = PiePropTypes;


  var enhance$3 = function enhance$$1(Component) {
      return compose(defaultProps(PieDefaultProps), core.withTheme(), core.withDimensions(), withPropsOnChange(['radialLabel'], function (_ref3) {
          var radialLabel = _ref3.radialLabel;
          return {
              getRadialLabel: core.getLabelGenerator(radialLabel)
          };
      }), withPropsOnChange(['sliceLabel'], function (_ref4) {
          var sliceLabel = _ref4.sliceLabel;
          return {
              getSliceLabel: core.getLabelGenerator(sliceLabel)
          };
      }), pure)(Component);
  };

  var Pie$1 = setDisplayName('Pie')(enhance$3(Pie));

  var ResponsivePie = function ResponsivePie(props) {
      return React__default.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React__default.createElement(Pie$1, _extends({ width: width, height: height }, props));
          }
      );
  };

  var enhance$4 = (function (Component) {
      return compose(defaultProps(PieDefaultProps), core.withTheme(), core.withDimensions(), pure)(Component);
  });

  var drawSliceLabels = function drawSliceLabels(ctx, arcs, _ref) {
      var arcGenerator = _ref.arcGenerator,
          getLabel = _ref.getLabel,
          skipAngle = _ref.skipAngle,
          getTextColor = _ref.getTextColor,
          theme = _ref.theme;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = theme.labels.text.fontSize + 'px sans-serif';

      arcs.filter(function (arc) {
          return skipAngle === 0 || arc.angleDeg > skipAngle;
      }).forEach(function (arc) {
          var _arcGenerator$centroi = arcGenerator.centroid(arc),
              centroidX = _arcGenerator$centroi[0],
              centroidY = _arcGenerator$centroi[1];

          var sliceLabel = getLabel(arc.data);
          var textColor = getTextColor(arc, theme);

          ctx.save();
          ctx.translate(centroidX, centroidY);
          ctx.fillStyle = textColor;
          ctx.fillText(sliceLabel, 0, 0);
          ctx.restore();
      });
  };

  var drawRadialLabels = function drawRadialLabels(ctx, arcs, _ref2) {
      var radius = _ref2.radius,
          getLabel = _ref2.getLabel,
          skipAngle = _ref2.skipAngle,
          linkOffset = _ref2.linkOffset,
          linkDiagonalLength = _ref2.linkDiagonalLength,
          linkHorizontalLength = _ref2.linkHorizontalLength,
          linkStrokeWidth = _ref2.linkStrokeWidth,
          textXOffset = _ref2.textXOffset,
          getTextColor = _ref2.getTextColor,
          getLinkColor = _ref2.getLinkColor,
          theme = _ref2.theme;

      var radialLabels = computeRadialLabels(arcs, {
          getLabel: getLabel,
          radius: radius,
          skipAngle: skipAngle,
          linkOffset: linkOffset,
          linkDiagonalLength: linkDiagonalLength,
          linkHorizontalLength: linkHorizontalLength,
          textXOffset: textXOffset
      });

      ctx.textBaseline = 'middle';
      ctx.font = theme.labels.text.fontSize + 'px sans-serif';

      radialLabels.forEach(function (label) {
          var dataWithColor = _extends({}, label.arc.data, {
              color: label.arc.color
          });

          ctx.save();
          ctx.translate(label.position.x, label.position.y);
          ctx.fillStyle = getTextColor(dataWithColor, theme);
          ctx.textAlign = core.textPropsByEngine.canvas.align[label.align];
          ctx.fillText(label.text, 0, 0);
          ctx.restore();

          ctx.beginPath();
          ctx.strokeStyle = getLinkColor(dataWithColor, theme);
          ctx.lineWidth = linkStrokeWidth;
          label.line.forEach(function (point, index) {
              if (index === 0) ctx.moveTo(point.x, point.y);else ctx.lineTo(point.x, point.y);
          });
          if (linkStrokeWidth > 0) ctx.stroke();
      });
  };

  var PieTooltip = function PieTooltip(_ref) {
      var data = _ref.data,
          color = _ref.color,
          tooltipFormat = _ref.tooltipFormat,
          tooltip = _ref.tooltip,
          theme = _ref.theme;

      return React__default.createElement(core.BasicTooltip, {
          id: data.label,
          value: data.value,
          enableChip: true,
          color: color,
          theme: theme,
          format: tooltipFormat,
          renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _extends({ color: color }, data)) : null
      });
  };

  PieTooltip.propTypes = {
      data: PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          value: PropTypes.number.isRequired
      }).isRequired,
      color: PropTypes.string.isRequired,
      tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      tooltip: PropTypes.func,
      theme: PropTypes.shape({
          tooltip: PropTypes.shape({}).isRequired
      }).isRequired
  };

  var PieTooltip$1 = pure(PieTooltip);

  var PieCanvasRenderer = function (_Component) {
      inherits(PieCanvasRenderer, _Component);

      function PieCanvasRenderer() {
          var _temp, _this, _ret;

          classCallCheck(this, PieCanvasRenderer);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getArcFromMouse = function (event) {
              var _getRelativeCursor = core.getRelativeCursor(_this.surface, event),
                  x = _getRelativeCursor[0],
                  y = _getRelativeCursor[1];

              var _this$props = _this.props,
                  centerX = _this$props.centerX,
                  centerY = _this$props.centerY,
                  margin = _this$props.margin,
                  radius = _this$props.radius,
                  innerRadius = _this$props.innerRadius,
                  arcs = _this$props.arcs;


              return core.getHoveredArc(margin.left + centerX, margin.top + centerY, radius, innerRadius, arcs, x, y);
          }, _this.handleMouseHover = function (showTooltip, hideTooltip) {
              return function (event) {
                  if (_this.props.isInteractive !== true) return;

                  var arc = _this.getArcFromMouse(event);
                  if (arc) {
                      showTooltip(React__default.createElement(PieTooltip$1, { data: arc.data, color: arc.color, theme: _this.props.theme }), event);
                  } else {
                      hideTooltip();
                  }
              };
          }, _this.handleMouseLeave = function (hideTooltip) {
              return function () {
                  if (_this.props.isInteractive !== true) return;

                  hideTooltip();
              };
          }, _this.handleClick = function (event) {
              var arc = _this.getArcFromMouse(event);
              if (arc) _this.props.onClick(arc.data, event);
          }, _temp), possibleConstructorReturn(_this, _ret);
      }

      PieCanvasRenderer.prototype.componentDidMount = function componentDidMount() {
          this.ctx = this.surface.getContext('2d');
          this.draw(this.props);
      };

      PieCanvasRenderer.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
          // only update if the DOM needs to be updated
          if (this.props.outerWidth !== props.outerWidth || this.props.outerHeight !== props.outerHeight || this.props.isInteractive !== props.isInteractive || this.props.theme !== props.theme) {
              return true;
          }

          this.draw(props);
          return false;
      };

      PieCanvasRenderer.prototype.componentDidUpdate = function componentDidUpdate() {
          this.ctx = this.surface.getContext('2d');
          this.draw(this.props);
      };

      PieCanvasRenderer.prototype.draw = function draw(props) {
          var _this2 = this;

          var arcs = props.arcs,
              arcGenerator = props.arcGenerator,
              width = props.width,
              height = props.height,
              centerX = props.centerX,
              centerY = props.centerY,
              radius = props.radius,
              outerWidth = props.outerWidth,
              outerHeight = props.outerHeight,
              pixelRatio = props.pixelRatio,
              margin = props.margin,
              borderWidth = props.borderWidth,
              borderColor = props.borderColor,
              enableSlicesLabels = props.enableSlicesLabels,
              enableRadialLabels = props.enableRadialLabels,
              legends$$1 = props.legends,
              theme = props.theme;


          this.surface.width = outerWidth * pixelRatio;
          this.surface.height = outerHeight * pixelRatio;

          this.ctx.scale(pixelRatio, pixelRatio);
          this.ctx.fillStyle = theme.background;
          this.ctx.fillRect(0, 0, outerWidth, outerHeight);
          this.ctx.save();
          this.ctx.translate(margin.left, margin.top);

          arcGenerator.context(this.ctx);

          this.ctx.save();
          this.ctx.translate(centerX, centerY);

          var getBorderColor = core.getInheritedColorGenerator(borderColor);

          arcs.forEach(function (arc) {
              _this2.ctx.beginPath();
              _this2.ctx.fillStyle = arc.color;
              _this2.ctx.strokeStyle = getBorderColor(_extends({}, arc.data, { color: arc.color }));
              _this2.ctx.lineWidth = borderWidth;
              arcGenerator(arc);
              _this2.ctx.fill();
              if (borderWidth > 0) _this2.ctx.stroke();
          });

          if (enableSlicesLabels === true) {
              var sliceLabel = props.sliceLabel,
                  slicesLabelsSkipAngle = props.slicesLabelsSkipAngle,
                  slicesLabelsTextColor = props.slicesLabelsTextColor;


              drawSliceLabels(this.ctx, arcs, {
                  arcGenerator: arcGenerator,
                  skipAngle: slicesLabelsSkipAngle,
                  getLabel: core.getLabelGenerator(sliceLabel),
                  getTextColor: core.getInheritedColorGenerator(slicesLabelsTextColor, 'labels.text.fill'),
                  theme: theme
              });
          }

          if (enableRadialLabels === true) {
              var radialLabel = props.radialLabel,
                  radialLabelsSkipAngle = props.radialLabelsSkipAngle,
                  radialLabelsLinkOffset = props.radialLabelsLinkOffset,
                  radialLabelsLinkStrokeWidth = props.radialLabelsLinkStrokeWidth,
                  radialLabelsLinkDiagonalLength = props.radialLabelsLinkDiagonalLength,
                  radialLabelsLinkHorizontalLength = props.radialLabelsLinkHorizontalLength,
                  radialLabelsTextXOffset = props.radialLabelsTextXOffset,
                  radialLabelsTextColor = props.radialLabelsTextColor,
                  radialLabelsLinkColor = props.radialLabelsLinkColor;


              drawRadialLabels(this.ctx, arcs, {
                  radius: radius,
                  getLabel: core.getLabelGenerator(radialLabel),
                  skipAngle: radialLabelsSkipAngle,
                  linkOffset: radialLabelsLinkOffset,
                  linkDiagonalLength: radialLabelsLinkDiagonalLength,
                  linkHorizontalLength: radialLabelsLinkHorizontalLength,
                  linkStrokeWidth: radialLabelsLinkStrokeWidth,
                  textXOffset: radialLabelsTextXOffset,
                  getTextColor: core.getInheritedColorGenerator(radialLabelsTextColor, 'labels.text.fill'),
                  getLinkColor: core.getInheritedColorGenerator(radialLabelsLinkColor, 'axis.ticks.line.stroke'),
                  theme: theme
              });
          }

          this.ctx.restore();

          legends$$1.forEach(function (legend) {
              legends.renderLegendToCanvas(_this2.ctx, _extends({}, legend, {
                  data: arcs.map(function (arc) {
                      return {
                          id: arc.data.id,
                          label: arc.data.id,
                          color: arc.color
                      };
                  }),
                  containerWidth: width,
                  containerHeight: height
              }));
          });
      };

      PieCanvasRenderer.prototype.render = function render() {
          var _this3 = this;

          var _props = this.props,
              outerWidth = _props.outerWidth,
              outerHeight = _props.outerHeight,
              pixelRatio = _props.pixelRatio,
              isInteractive = _props.isInteractive,
              theme = _props.theme;


          return React__default.createElement(
              core.Container,
              { isInteractive: isInteractive, theme: theme },
              function (_ref) {
                  var showTooltip = _ref.showTooltip,
                      hideTooltip = _ref.hideTooltip;
                  return React__default.createElement('canvas', {
                      ref: function ref(surface) {
                          _this3.surface = surface;
                      },
                      width: outerWidth * pixelRatio,
                      height: outerHeight * pixelRatio,
                      style: {
                          width: outerWidth,
                          height: outerHeight
                      },
                      onMouseEnter: _this3.handleMouseHover(showTooltip, hideTooltip),
                      onMouseMove: _this3.handleMouseHover(showTooltip, hideTooltip),
                      onMouseLeave: _this3.handleMouseLeave(hideTooltip),
                      onClick: _this3.handleClick
                  });
              }
          );
      };

      return PieCanvasRenderer;
  }(React.Component);

  PieCanvasRenderer.propTypes = {
      arcs: PropTypes.arrayOf(arcPropType).isRequired,
      arcGenerator: PropTypes.func.isRequired,

      // resolution
      pixelRatio: PropTypes.number.isRequired,

      // dimensions/layout
      outerWidth: PropTypes.number.isRequired,
      outerHeight: PropTypes.number.isRequired,
      centerX: PropTypes.number.isRequired,
      centerY: PropTypes.number.isRequired,
      margin: PropTypes.object.isRequired,
      radius: PropTypes.number.isRequired,
      innerRadius: PropTypes.number.isRequired,

      // interactivity
      isInteractive: PropTypes.bool.isRequired,
      onClick: PropTypes.func.isRequired,

      // theming
      theme: PropTypes.object.isRequired
  };

  var PieCanvas = function (_Component) {
      inherits(PieCanvas, _Component);

      function PieCanvas() {
          classCallCheck(this, PieCanvas);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      PieCanvas.prototype.render = function render() {
          var _props = this.props,
              data = _props.data,
              sortByValue = _props.sortByValue,
              startAngle = _props.startAngle,
              endAngle = _props.endAngle,
              fit = _props.fit,
              padAngle = _props.padAngle,
              innerRadius = _props.innerRadius,
              cornerRadius = _props.cornerRadius,
              width = _props.width,
              height = _props.height,
              colors = _props.colors,
              colorBy = _props.colorBy,
              topProps = objectWithoutProperties(_props, ['data', 'sortByValue', 'startAngle', 'endAngle', 'fit', 'padAngle', 'innerRadius', 'cornerRadius', 'width', 'height', 'colors', 'colorBy']);


          return React__default.createElement(
              PieLayout$1,
              {
                  width: width,
                  height: height,
                  data: data,
                  sortByValue: sortByValue,
                  startAngle: startAngle,
                  endAngle: endAngle,
                  fit: fit,
                  padAngle: padAngle,
                  innerRadius: innerRadius,
                  cornerRadius: cornerRadius,
                  colors: colors,
                  colorBy: colorBy
              },
              function (props) {
                  return React__default.createElement(PieCanvasRenderer, _extends({}, topProps, props));
              }
          );
      };

      return PieCanvas;
  }(React.Component);

  PieCanvas.propTypes = PiePropTypes;


  var PieCanvas$1 = setDisplayName('PieCanvas')(enhance$4(PieCanvas));

  var ResponsivePieCanvas = function ResponsivePieCanvas(props) {
      return React__default.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React__default.createElement(PieCanvas$1, _extends({ width: width, height: height }, props));
          }
      );
  };

  exports.PieLayout = PieLayout$1;
  exports.Pie = Pie$1;
  exports.ResponsivePie = ResponsivePie;
  exports.PieCanvas = PieCanvas$1;
  exports.ResponsivePieCanvas = ResponsivePieCanvas;
  exports.arcPropType = arcPropType;
  exports.PiePropTypes = PiePropTypes;
  exports.PieDefaultProps = PieDefaultProps;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
