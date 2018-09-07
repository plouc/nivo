(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('@nivo/core'), require('d3-hierarchy'), require('lodash/cloneDeep'), require('recompose/compose'), require('recompose/defaultProps'), require('recompose/withPropsOnChange'), require('recompose/pure'), require('react-motion')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', '@nivo/core', 'd3-hierarchy', 'lodash/cloneDeep', 'recompose/compose', 'recompose/defaultProps', 'recompose/withPropsOnChange', 'recompose/pure', 'react-motion'], factory) :
  (factory((global.nivo = global.nivo || {}),global.React,global.PropTypes,global.nivo,global.d3,global['lodash/cloneDeep'],global.RecomposeCompose,global.RecomposeDefaultProps,global.RecomposeWithPropsOnChange,global.RecomposePure,global.ReactMotion));
}(this, (function (exports,React,PropTypes,core,d3Hierarchy,cloneDeep,compose,defaultProps,withPropsOnChange,pure,reactMotion) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  cloneDeep = cloneDeep && cloneDeep.hasOwnProperty('default') ? cloneDeep['default'] : cloneDeep;
  compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
  defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
  withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
  pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;

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

  var TreeMapNode = function TreeMapNode(_ref) {
      var style = _ref.style,
          node = _ref.node,
          handlers = _ref.handlers,
          theme = _ref.theme;

      if (style.width <= 0 || style.height <= 0) return null;

      var rotate = node.label && style.orientLabel && style.height > style.width;

      return React__default.createElement(
          'g',
          { transform: 'translate(' + style.x + ',' + style.y + ')' },
          React__default.createElement('rect', _extends({
              width: style.width,
              height: style.height,
              fill: style.fill ? style.fill : style.color,
              strokeWidth: style.borderWidth,
              stroke: style.borderColor
          }, handlers)),
          node.label && React__default.createElement(
              'text',
              {
                  textAnchor: 'middle',
                  alignmentBaseline: 'central',
                  style: _extends({}, theme.labels.text, {
                      fill: style.labelTextColor,
                      pointerEvents: 'none'
                  }),
                  transform: 'translate(' + style.width / 2 + ',' + style.height / 2 + ') rotate(' + (rotate ? -90 : 0) + ')'
              },
              node.label
          )
      );
  };

  TreeMapNode.propTypes = {
      node: PropTypes.object.isRequired,
      style: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired,
          borderWidth: PropTypes.number.isRequired,
          borderColor: PropTypes.string.isRequired,
          labelTextColor: PropTypes.string.isRequired,
          orientLabel: PropTypes.bool.isRequired
      }).isRequired,
      handlers: PropTypes.object.isRequired,
      theme: core.themePropType.isRequired
  };

  var TreeMapHtmlNode = function TreeMapHtmlNode(_ref) {
      var node = _ref.node,
          style = _ref.style,
          handlers = _ref.handlers;

      if (style.width <= 0 || style.height <= 0) return null;

      var rotate = node.label && style.orientLabel && style.height > style.width;

      return React__default.createElement(
          'div',
          _extends({
              id: (node.data && node.data.id ? node.data.id : // replace special characters with "-"
              node.id).replace(/[^\w]/gi, '-'),
              style: {
                  boxSizing: 'border-box',
                  position: 'absolute',
                  top: style.y,
                  left: style.x,
                  width: style.width,
                  height: style.height,
                  background: style.color,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: style.borderWidth,
                  borderStyle: 'solid',
                  borderColor: style.borderColor
              }
          }, handlers),
          node.label !== false && React__default.createElement(
              'span',
              {
                  style: {
                      color: style.labelTextColor,
                      transform: 'rotate(' + (rotate ? '-90' : '0') + 'deg)',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      MsUserSelect: 'none',
                      userSelect: 'none'
                  }
              },
              node.label
          )
      );
  };

  TreeMapHtmlNode.propTypes = {
      node: PropTypes.object.isRequired,
      style: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired,
          borderWidth: PropTypes.number.isRequired,
          borderColor: PropTypes.string.isRequired,
          labelTextColor: PropTypes.string.isRequired,
          orientLabel: PropTypes.bool.isRequired
      }).isRequired,
      handlers: PropTypes.object.isRequired
  };

  /*—————————————————————————————————————————————————————————————————————————————

    Prop types

  —————————————————————————————————————————————————————————————————————————————*/

  var commonPropTypes = {
      // data
      // `root` managed by `withHierarchy()` HOC
      identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

      // dimensions managed by `withDimensions()` HOC

      // styling
      // theme managed by `withTheme()` HOC
      // colors managed by `withColors()` HOC

      leavesOnly: PropTypes.bool.isRequired,
      tile: core.treeMapTilePropType.isRequired,
      innerPadding: PropTypes.number.isRequired,
      outerPadding: PropTypes.number.isRequired,

      // labels
      enableLabel: PropTypes.bool.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      labelFormat: PropTypes.string,
      labelSkipSize: PropTypes.number.isRequired,
      orientLabel: PropTypes.bool.isRequired,

      // border
      borderWidth: PropTypes.number.isRequired,
      borderColor: PropTypes.any.isRequired,

      // interactivity
      isInteractive: PropTypes.bool.isRequired,
      onClick: PropTypes.func.isRequired,
      tooltip: PropTypes.func
  };

  var TreeMapPropTypes = _extends({}, commonPropTypes, {
      nodeComponent: PropTypes.func.isRequired
  }, core.defsPropTypes);

  var TreeMapHtmlPropTypes = _extends({}, commonPropTypes, {
      nodeComponent: PropTypes.func.isRequired
  });

  var TreeMapCanvasPropTypes = _extends({}, commonPropTypes, {
      pixelRatio: PropTypes.number.isRequired

      /*—————————————————————————————————————————————————————————————————————————————
      
        Default props
      
      —————————————————————————————————————————————————————————————————————————————*/

  });var commonDefaultProps = {
      // data
      identity: 'id',

      tile: 'squarify',
      leavesOnly: false,

      // labels
      enableLabel: true,
      label: 'id',
      labelSkipSize: 0,
      labelTextColor: 'inherit:darker(1)',
      orientLabel: true,

      innerPadding: 0,
      outerPadding: 0,

      borderWidth: 0,
      borderColor: 'inherit',

      // interactivity
      isInteractive: true,
      onClick: core.noop
  };

  var TreeMapDefaultProps = _extends({}, commonDefaultProps, {
      nodeComponent: TreeMapNode,
      defs: [],
      fill: []
  });

  var TreeMapHtmlDefaultProps = _extends({}, commonDefaultProps, {
      nodeComponent: TreeMapHtmlNode
  });

  var TreeMapCanvasDefaultProps = _extends({}, commonDefaultProps, {
      pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
  });

  var props = /*#__PURE__*/Object.freeze({
    TreeMapPropTypes: TreeMapPropTypes,
    TreeMapHtmlPropTypes: TreeMapHtmlPropTypes,
    TreeMapCanvasPropTypes: TreeMapCanvasPropTypes,
    TreeMapDefaultProps: TreeMapDefaultProps,
    TreeMapHtmlDefaultProps: TreeMapHtmlDefaultProps,
    TreeMapCanvasDefaultProps: TreeMapCanvasDefaultProps
  });

  var computeNodePath = function computeNodePath(node, getIdentity) {
      return node.ancestors().map(function (ancestor) {
          return getIdentity(ancestor.data);
      }).join('.');
  };

  var commonEnhancers = [core.withHierarchy(), core.withDimensions(), core.withColors({ defaultColorBy: 'depth' }), core.withTheme(), core.withMotion(), withPropsOnChange(['identity'], function (_ref) {
      var identity = _ref.identity;
      return {
          getIdentity: core.getAccessorFor(identity)
      };
  }), withPropsOnChange(['borderColor'], function (_ref2) {
      var borderColor = _ref2.borderColor;
      return {
          getBorderColor: core.getInheritedColorGenerator(borderColor)
      };
  }), withPropsOnChange(['label', 'labelFormat'], function (_ref3) {
      var label = _ref3.label,
          labelFormat = _ref3.labelFormat;
      return {
          getLabel: core.getLabelGenerator(label, labelFormat)
      };
  }), withPropsOnChange(['labelTextColor'], function (_ref4) {
      var labelTextColor = _ref4.labelTextColor;
      return {
          getLabelTextColor: core.getInheritedColorGenerator(labelTextColor)
      };
  }), withPropsOnChange(['width', 'height', 'tile', 'innerPadding', 'outerPadding'], function (_ref5) {
      var width = _ref5.width,
          height = _ref5.height,
          tile = _ref5.tile,
          innerPadding = _ref5.innerPadding,
          outerPadding = _ref5.outerPadding;
      return {
          treemap: d3Hierarchy.treemap().size([width, height]).tile(core.treeMapTileFromProp(tile)).round(true).paddingInner(innerPadding).paddingOuter(outerPadding)
      };
  }), withPropsOnChange(['root', 'treemap', 'leavesOnly', 'getIdentity', 'getColor'], function (_ref6) {
      var _root = _ref6.root,
          treemap = _ref6.treemap,
          leavesOnly = _ref6.leavesOnly,
          getIdentity = _ref6.getIdentity,
          getColor = _ref6.getColor;

      var root = cloneDeep(_root);

      treemap(root);

      var nodes = leavesOnly ? root.leaves() : root.descendants();
      nodes = nodes.map(function (d) {
          d.path = computeNodePath(d, getIdentity);

          d.nodeHeight = d.height;

          d.x = d.x0;
          d.y = d.y0;
          d.width = d.x1 - d.x0;
          d.height = d.y1 - d.y0;
          d.data.color = d.color = getColor(_extends({}, d.data, { depth: d.depth }));

          d.data.id = d.id = getIdentity(d.data);
          d.data.value = d.value;

          return d;
      });

      return { nodes: nodes };
  }), withPropsOnChange(['enableLabel', 'nodes', 'getLabel', 'labelSkipSize'], function (_ref7) {
      var enableLabel = _ref7.enableLabel,
          nodes = _ref7.nodes,
          getLabel = _ref7.getLabel,
          labelSkipSize = _ref7.labelSkipSize;

      if (!enableLabel) return;

      var nodesWithLabel = nodes.map(function (node) {
          if (node.nodeHeight > 0 || labelSkipSize !== 0 && Math.min(node.width, node.height) <= labelSkipSize) return node;
          return _extends({}, node, { label: getLabel(node.data) });
      });

      return { nodes: nodesWithLabel };
  })];

  var svgEnhancers = [withPropsOnChange(['nodes', 'defs', 'fill'], function (_ref8) {
      var nodes = _ref8.nodes,
          defs = _ref8.defs,
          fill = _ref8.fill;

      return {
          defs: core.bindDefs(defs, nodes, fill, { targetKey: 'fill' })
      };
  })];

  var enhance = (function (Component) {
      var implDefaultProps = props[Component.displayName + 'DefaultProps'];

      switch (Component.displayName) {
          case 'TreeMap':
              return compose.apply(undefined, [defaultProps(implDefaultProps)].concat(commonEnhancers, svgEnhancers, [core.withMotion(), pure]))(Component);

          case 'TreeMapHtml':
              return compose.apply(undefined, [defaultProps(implDefaultProps)].concat(commonEnhancers, [core.withMotion(), pure]))(Component);

          case 'TreeMapCanvas':
              return compose.apply(undefined, [defaultProps(implDefaultProps)].concat(commonEnhancers, [pure]))(Component);
      }

      return Component;
  });

  var nodeWillEnter = function nodeWillEnter(_ref) {
      var node = _ref.data;
      return _extends({
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height
      }, core.colorMotionSpring(node.color));
  };

  var nodeWillLeave = function nodeWillLeave(springConfig) {
      return function (_ref2) {
          var node = _ref2.data;
          return _extends({
              x: reactMotion.spring(node.x + node.width / 2, springConfig),
              y: reactMotion.spring(node.y + node.height / 2, springConfig),
              width: reactMotion.spring(0, springConfig),
              height: reactMotion.spring(0, springConfig)
          }, core.colorMotionSpring(node.color, springConfig));
      };
  };

  var TreeMapNodeTooltip = function TreeMapNodeTooltip(_ref) {
      var node = _ref.node,
          theme = _ref.theme,
          tooltip = _ref.tooltip;
      return React__default.createElement(core.BasicTooltip, {
          id: node.id,
          value: node.value,
          enableChip: true,
          color: node.color,
          theme: theme,
          renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _extends({ node: node }, node)) : null
      });
  };

  TreeMapNodeTooltip.propTypes = {
      node: PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          value: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired
      }).isRequired,
      theme: PropTypes.object.isRequired,
      tooltip: PropTypes.func
  };

  var TreeMapNodeTooltip$1 = pure(TreeMapNodeTooltip);

  var getNodeHandlers = function getNodeHandlers(node, _ref) {
      var isInteractive = _ref.isInteractive,
          _onClick = _ref.onClick,
          showTooltip = _ref.showTooltip,
          hideTooltip = _ref.hideTooltip,
          theme = _ref.theme,
          tooltip = _ref.tooltip;

      if (!isInteractive) return {};

      var handleTooltip = function handleTooltip(e) {
          showTooltip(React__default.createElement(TreeMapNodeTooltip$1, { node: node, theme: theme, tooltip: tooltip }), e);
      };

      return {
          onMouseEnter: handleTooltip,
          onMouseMove: handleTooltip,
          onMouseLeave: hideTooltip,
          onClick: function onClick(event) {
              return _onClick(node, event);
          }
      };
  };

  var TreeMap = function TreeMap(_ref) {
      var nodes = _ref.nodes,
          nodeComponent = _ref.nodeComponent,
          margin = _ref.margin,
          outerWidth = _ref.outerWidth,
          outerHeight = _ref.outerHeight,
          theme = _ref.theme,
          borderWidth = _ref.borderWidth,
          getBorderColor = _ref.getBorderColor,
          defs = _ref.defs,
          getLabelTextColor = _ref.getLabelTextColor,
          orientLabel = _ref.orientLabel,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping,
          isInteractive = _ref.isInteractive,
          onClick = _ref.onClick,
          tooltipFormat = _ref.tooltipFormat,
          tooltip = _ref.tooltip;

      var springConfig = {
          stiffness: motionStiffness,
          damping: motionDamping
      };

      var getHandlers = function getHandlers(node, showTooltip, hideTooltip) {
          return getNodeHandlers(node, {
              isInteractive: isInteractive,
              onClick: onClick,
              showTooltip: showTooltip,
              hideTooltip: hideTooltip,
              theme: theme,
              tooltipFormat: tooltipFormat,
              tooltip: tooltip
          });
      };

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
                      defs: defs,
                      theme: theme
                  },
                  !animate && React__default.createElement(
                      'g',
                      null,
                      nodes.map(function (node) {
                          return React__default.createElement(nodeComponent, {
                              key: node.path,
                              node: node,
                              style: {
                                  fill: node.fill,
                                  x: node.x0,
                                  y: node.y0,
                                  width: node.width,
                                  height: node.height,
                                  color: node.color,
                                  borderWidth: borderWidth,
                                  borderColor: getBorderColor(node),
                                  labelTextColor: getLabelTextColor(node),
                                  orientLabel: orientLabel
                              },
                              handlers: getHandlers(node, showTooltip, hideTooltip),
                              theme: theme
                          });
                      })
                  ),
                  animate && React__default.createElement(
                      reactMotion.TransitionMotion,
                      {
                          willEnter: nodeWillEnter,
                          willLeave: nodeWillLeave(springConfig),
                          styles: nodes.map(function (node) {
                              return {
                                  key: node.path,
                                  data: node,
                                  style: _extends({
                                      x: reactMotion.spring(node.x, springConfig),
                                      y: reactMotion.spring(node.y, springConfig),
                                      width: reactMotion.spring(node.width, springConfig),
                                      height: reactMotion.spring(node.height, springConfig)
                                  }, core.colorMotionSpring(node.color, springConfig))
                              };
                          })
                      },
                      function (interpolatedStyles) {
                          return React__default.createElement(
                              'g',
                              null,
                              interpolatedStyles.map(function (_ref3) {
                                  var style = _ref3.style,
                                      node = _ref3.data;

                                  style.color = core.getInterpolatedColor(style);

                                  return React__default.createElement(nodeComponent, {
                                      key: node.path,
                                      node: node,
                                      style: _extends({}, style, {
                                          fill: node.fill,
                                          borderWidth: borderWidth,
                                          borderColor: getBorderColor(style),
                                          labelTextColor: getLabelTextColor(style),
                                          orientLabel: orientLabel
                                      }),
                                      handlers: getHandlers(node, showTooltip, hideTooltip),
                                      theme: theme
                                  });
                              })
                          );
                      }
                  )
              );
          }
      );
  };

  TreeMap.propTypes = TreeMapPropTypes;
  TreeMap.displayName = 'TreeMap';

  var enhancedTreeMap = enhance(TreeMap);
  enhancedTreeMap.displayName = 'TreeMap';

  var ResponsiveTreeMap = function ResponsiveTreeMap(props) {
      return React__default.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React__default.createElement(enhancedTreeMap, _extends({ width: width, height: height }, props));
          }
      );
  };

  var TreeMapHtml = function TreeMapHtml(_ref) {
      var nodes = _ref.nodes,
          nodeComponent = _ref.nodeComponent,
          margin = _ref.margin,
          outerWidth = _ref.outerWidth,
          outerHeight = _ref.outerHeight,
          theme = _ref.theme,
          borderWidth = _ref.borderWidth,
          getBorderColor = _ref.getBorderColor,
          getLabelTextColor = _ref.getLabelTextColor,
          orientLabel = _ref.orientLabel,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping,
          isInteractive = _ref.isInteractive,
          onClick = _ref.onClick,
          tooltipFormat = _ref.tooltipFormat,
          tooltip = _ref.tooltip;

      var springConfig = {
          stiffness: motionStiffness,
          damping: motionDamping
      };

      var getHandlers = function getHandlers(node, showTooltip, hideTooltip) {
          return getNodeHandlers(node, {
              isInteractive: isInteractive,
              onClick: onClick,
              showTooltip: showTooltip,
              hideTooltip: hideTooltip,
              theme: theme,
              tooltipFormat: tooltipFormat,
              tooltip: tooltip
          });
      };

      return React__default.createElement(
          core.Container,
          { theme: theme },
          function (_ref2) {
              var showTooltip = _ref2.showTooltip,
                  hideTooltip = _ref2.hideTooltip;
              return React__default.createElement(
                  'div',
                  {
                      style: {
                          position: 'relative',
                          width: outerWidth,
                          height: outerHeight
                      }
                  },
                  !animate && React__default.createElement(
                      'div',
                      { style: { position: 'absolute', top: margin.top, left: margin.left } },
                      nodes.map(function (node) {
                          return React__default.createElement(nodeComponent, {
                              key: node.path,
                              node: node,
                              style: {
                                  x: node.x,
                                  y: node.y,
                                  width: node.width,
                                  height: node.height,
                                  color: node.color,
                                  borderWidth: borderWidth,
                                  borderColor: getBorderColor(node),
                                  labelTextColor: getLabelTextColor(node),
                                  orientLabel: orientLabel
                              },
                              handlers: getHandlers(node, showTooltip, hideTooltip)
                          });
                      })
                  ),
                  animate && React__default.createElement(
                      reactMotion.TransitionMotion,
                      {
                          willEnter: nodeWillEnter,
                          willLeave: nodeWillLeave(springConfig),
                          styles: nodes.map(function (node) {
                              return {
                                  key: node.path,
                                  data: node,
                                  style: _extends({
                                      x: reactMotion.spring(node.x, springConfig),
                                      y: reactMotion.spring(node.y, springConfig),
                                      width: reactMotion.spring(node.width, springConfig),
                                      height: reactMotion.spring(node.height, springConfig)
                                  }, core.colorMotionSpring(node.color, springConfig))
                              };
                          })
                      },
                      function (interpolatedStyles) {
                          return React__default.createElement(
                              'div',
                              {
                                  style: {
                                      position: 'absolute',
                                      top: margin.top,
                                      left: margin.left
                                  }
                              },
                              interpolatedStyles.map(function (_ref3) {
                                  var style = _ref3.style,
                                      node = _ref3.data;

                                  style.color = core.getInterpolatedColor(style);

                                  return React__default.createElement(nodeComponent, {
                                      key: node.path,
                                      node: node,
                                      style: _extends({}, style, {
                                          fill: node.fill,
                                          borderWidth: borderWidth,
                                          borderColor: getBorderColor(style),
                                          labelTextColor: getLabelTextColor(style),
                                          orientLabel: orientLabel
                                      }),
                                      handlers: getHandlers(node, showTooltip, hideTooltip)
                                  });
                              })
                          );
                      }
                  )
              );
          }
      );
  };

  TreeMapHtml.propTypes = TreeMapHtmlPropTypes;
  TreeMapHtml.displayName = 'TreeMapHtml';

  var enhancedTreeMapHtml = enhance(TreeMapHtml);
  enhancedTreeMapHtml.displayName = 'TreeMapHtml';

  var ResponsiveTreeMapHtml = function ResponsiveTreeMapHtml(props) {
      return React__default.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React__default.createElement(enhancedTreeMapHtml, _extends({ width: width, height: height }, props));
          }
      );
  };

  var findNodeUnderCursor = function findNodeUnderCursor(nodes, margin, x, y) {
      return nodes.find(function (node) {
          return core.isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y);
      });
  };

  var TreeMapCanvas = function (_Component) {
      inherits(TreeMapCanvas, _Component);

      function TreeMapCanvas() {
          var _temp, _this, _ret;

          classCallCheck(this, TreeMapCanvas);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleMouseHover = function (showTooltip, hideTooltip) {
              return function (event) {
                  var _this$props = _this.props,
                      isInteractive = _this$props.isInteractive,
                      nodes = _this$props.nodes,
                      margin = _this$props.margin,
                      theme = _this$props.theme;


                  if (!isInteractive) return;

                  var _getRelativeCursor = core.getRelativeCursor(_this.surface, event),
                      x = _getRelativeCursor[0],
                      y = _getRelativeCursor[1];

                  var node = findNodeUnderCursor(nodes, margin, x, y);

                  if (node !== undefined) {
                      showTooltip(React__default.createElement(TreeMapNodeTooltip$1, { node: node, theme: theme }), event);
                  } else {
                      hideTooltip();
                  }
              };
          }, _this.handleMouseLeave = function (hideTooltip) {
              return function () {
                  hideTooltip();
              };
          }, _this.handleClick = function (event) {
              var _this$props2 = _this.props,
                  isInteractive = _this$props2.isInteractive,
                  nodes = _this$props2.nodes,
                  margin = _this$props2.margin,
                  onClick = _this$props2.onClick;


              if (!isInteractive) return;

              var _getRelativeCursor2 = core.getRelativeCursor(_this.surface, event),
                  x = _getRelativeCursor2[0],
                  y = _getRelativeCursor2[1];

              var node = findNodeUnderCursor(nodes, margin, x, y);
              if (node !== undefined) onClick(node, event);
          }, _temp), possibleConstructorReturn(_this, _ret);
      }

      TreeMapCanvas.prototype.componentDidMount = function componentDidMount() {
          this.ctx = this.surface.getContext('2d');
          this.draw(this.props);
      };

      TreeMapCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
          this.ctx = this.surface.getContext('2d');
          this.draw(this.props);
      };

      TreeMapCanvas.prototype.draw = function draw(props) {
          var _this2 = this;

          var nodes = props.nodes,
              pixelRatio = props.pixelRatio,
              margin = props.margin,
              outerWidth = props.outerWidth,
              outerHeight = props.outerHeight,
              borderWidth = props.borderWidth,
              getBorderColor = props.getBorderColor,
              enableLabel = props.enableLabel,
              getLabelTextColor = props.getLabelTextColor,
              orientLabel = props.orientLabel,
              theme = props.theme;


          this.surface.width = outerWidth * pixelRatio;
          this.surface.height = outerHeight * pixelRatio;

          this.ctx.scale(pixelRatio, pixelRatio);

          this.ctx.fillStyle = theme.background;
          this.ctx.fillRect(0, 0, outerWidth, outerHeight);
          this.ctx.translate(margin.left, margin.top);

          nodes.forEach(function (node) {
              _this2.ctx.fillStyle = node.color;
              _this2.ctx.fillRect(node.x, node.y, node.width, node.height);

              if (borderWidth > 0) {
                  _this2.ctx.strokeStyle = getBorderColor(node);
                  _this2.ctx.lineWidth = borderWidth;
                  _this2.ctx.strokeRect(node.x, node.y, node.width, node.height);
              }
          });

          if (enableLabel) {
              this.ctx.textAlign = 'center';
              this.ctx.textBaseline = 'middle';
              this.ctx.font = theme.labels.text.fontSize + 'px sans-serif';

              // draw labels on top
              nodes.filter(function (_ref) {
                  var label = _ref.label;
                  return label !== undefined;
              }).forEach(function (node) {
                  var labelTextColor = getLabelTextColor(node);

                  var rotate = orientLabel && node.height > node.width;

                  _this2.ctx.save();
                  _this2.ctx.translate(node.x + node.width / 2, node.y + node.height / 2);
                  _this2.ctx.rotate(core.degreesToRadians(rotate ? -90 : 0));

                  _this2.ctx.fillStyle = labelTextColor;
                  _this2.ctx.fillText(node.label, 0, 0);

                  _this2.ctx.restore();
              });
          }
      };

      TreeMapCanvas.prototype.render = function render() {
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
              function (_ref2) {
                  var showTooltip = _ref2.showTooltip,
                      hideTooltip = _ref2.hideTooltip;
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

      return TreeMapCanvas;
  }(React.Component);

  TreeMapCanvas.propTypes = TreeMapCanvasPropTypes;
  TreeMapCanvas.displayName = 'TreeMapCanvas';

  var enhancedTreeMapCanvas = enhance(TreeMapCanvas);
  enhancedTreeMapCanvas.displayName = 'TreeMapCanvas';

  var ResponsiveTreeMapCanvas = function ResponsiveTreeMapCanvas(props) {
      return React__default.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React__default.createElement(enhancedTreeMapCanvas, _extends({ width: width, height: height }, props));
          }
      );
  };

  exports.TreeMap = enhancedTreeMap;
  exports.ResponsiveTreeMap = ResponsiveTreeMap;
  exports.TreeMapHtml = enhancedTreeMapHtml;
  exports.ResponsiveTreeMapHtml = ResponsiveTreeMapHtml;
  exports.TreeMapCanvas = enhancedTreeMapCanvas;
  exports.ResponsiveTreeMapCanvas = ResponsiveTreeMapCanvas;
  exports.TreeMapPropTypes = TreeMapPropTypes;
  exports.TreeMapHtmlPropTypes = TreeMapHtmlPropTypes;
  exports.TreeMapCanvasPropTypes = TreeMapCanvasPropTypes;
  exports.TreeMapDefaultProps = TreeMapDefaultProps;
  exports.TreeMapHtmlDefaultProps = TreeMapHtmlDefaultProps;
  exports.TreeMapCanvasDefaultProps = TreeMapCanvasDefaultProps;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
