(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('@nivo/core'), require('d3-hierarchy'), require('recompose/compose'), require('recompose/defaultProps'), require('recompose/withPropsOnChange'), require('recompose/withStateHandlers'), require('recompose/pure'), require('react-motion'), require('lodash/pick')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', '@nivo/core', 'd3-hierarchy', 'recompose/compose', 'recompose/defaultProps', 'recompose/withPropsOnChange', 'recompose/withStateHandlers', 'recompose/pure', 'react-motion', 'lodash/pick'], factory) :
  (factory((global.nivo = global.nivo || {}),global.React,global.PropTypes,global.nivo,global.d3,global.RecomposeCompose,global.RecomposeDefaultProps,global.RecomposeWithPropsOnChange,global.RecomposeWithStateHandlers,global.RecomposePure,global.ReactMotion,global['lodash/pick']));
}(this, (function (exports,React,PropTypes,core,d3Hierarchy,compose,defaultProps,withPropsOnChange,withStateHandlers,pure,reactMotion,pick) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
  defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
  withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
  withStateHandlers = withStateHandlers && withStateHandlers.hasOwnProperty('default') ? withStateHandlers['default'] : withStateHandlers;
  pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
  pick = pick && pick.hasOwnProperty('default') ? pick['default'] : pick;

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

  var computeNodePath = function computeNodePath(node, getIdentity) {
      return node.ancestors().map(function (ancestor) {
          return getIdentity(ancestor.data);
      }).join('.');
  };

  var computeNodes = function computeNodes(_ref) {
      var root = _ref.root,
          pack = _ref.pack,
          leavesOnly = _ref.leavesOnly,
          getIdentity = _ref.getIdentity,
          getColor = _ref.getColor;

      // assign a unique id depending on node path to each node
      root.each(function (node) {
          node.id = getIdentity(node.data);
          node.path = computeNodePath(node, getIdentity);
      });

      pack(root);

      var nodes = leavesOnly ? root.leaves() : root.descendants();
      nodes = nodes.map(function (node) {
          node.color = getColor(_extends({}, node.data, { depth: node.depth }));
          node.label = false;

          return node;
      });

      return nodes;
  };

  var computeZoom = function computeZoom(nodes, currentNodePath, width, height) {
      var currentNode = nodes.find(function (_ref2) {
          var path = _ref2.path;
          return path === currentNodePath;
      });

      if (!currentNode) return nodes;

      var ratio = Math.min(width, height) / (currentNode.r * 2);
      var offsetX = width / 2 - currentNode.x * ratio;
      var offsetY = height / 2 - currentNode.y * ratio;

      return nodes.map(function (node) {
          return _extends({}, node, {
              r: node.r * ratio,
              x: node.x * ratio + offsetX,
              y: node.y * ratio + offsetY
          });
      });
  };

  var BubbleNode = function BubbleNode(_ref) {
      var node = _ref.node,
          style = _ref.style,
          handlers = _ref.handlers,
          theme = _ref.theme;

      if (style.r <= 0) return null;

      return React__default.createElement(
          'g',
          { transform: 'translate(' + style.x + ',' + style.y + ')' },
          React__default.createElement('circle', _extends({
              r: style.r
          }, handlers, {
              fill: style.fill ? style.fill : style.color,
              stroke: style.borderColor,
              strokeWidth: style.borderWidth
          })),
          node.label !== false && React__default.createElement(
              'text',
              {
                  textAnchor: 'middle',
                  alignmentBaseline: 'central',
                  style: _extends({}, theme.labels.text, {
                      fill: style.labelTextColor,
                      pointerEvents: 'none'
                  })
              },
              node.label
          )
      );
  };

  BubbleNode.propTypes = {
      node: PropTypes.object.isRequired,
      style: PropTypes.shape({
          r: PropTypes.number.isRequired,
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired,
          fill: PropTypes.string,
          borderWidth: PropTypes.number.isRequired,
          borderColor: PropTypes.string.isRequired,
          labelTextColor: PropTypes.string.isRequired
      }).isRequired,
      handlers: PropTypes.object.isRequired,
      theme: core.themePropType.isRequired
  };

  var BubbleHtmlNode = function BubbleHtmlNode(_ref) {
      var node = _ref.node,
          style = _ref.style,
          handlers = _ref.handlers;

      if (style.r <= 0) return null;

      return React__default.createElement(
          'div',
          _extends({
              id: (node.data && node.data.id ? node.data.id : // replace special characters with "-"
              node.id).replace(/[^\w]/gi, '-'),
              style: {
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: style.color,
                  color: style.labelTextColor,
                  borderWidth: style.borderWidth,
                  borderColor: style.borderColor,
                  top: style.y - style.r,
                  left: style.x - style.r,
                  width: style.r * 2,
                  height: style.r * 2,
                  borderStyle: 'solid',
                  borderRadius: style.r
              }
          }, handlers),
          node.label !== false && node.label
      );
  };

  BubbleHtmlNode.propTypes = {
      node: PropTypes.object.isRequired,
      style: PropTypes.shape({
          r: PropTypes.number.isRequired,
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired,
          fill: PropTypes.string,
          borderWidth: PropTypes.number.isRequired,
          borderColor: PropTypes.string.isRequired,
          labelTextColor: PropTypes.string.isRequired
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
      padding: PropTypes.number.isRequired,

      // border
      borderWidth: PropTypes.number.isRequired,
      borderColor: PropTypes.any.isRequired,

      // labels
      enableLabel: PropTypes.bool.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      labelFormat: PropTypes.string,
      labelTextColor: PropTypes.any.isRequired,
      labelSkipRadius: PropTypes.number.isRequired,

      // interactivity
      isInteractive: PropTypes.bool.isRequired,
      onClick: PropTypes.func.isRequired,
      isZoomable: PropTypes.bool.isRequired,
      tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      tooltip: PropTypes.func
  };

  var BubblePropTypes = _extends({}, commonPropTypes, {
      nodeComponent: PropTypes.func.isRequired
  }, core.defsPropTypes);

  var BubbleHtmlPropTypes = _extends({}, commonPropTypes, {
      nodeComponent: PropTypes.func.isRequired
  });

  var BubbleCanvasPropTypes = _extends({}, commonPropTypes, {
      pixelRatio: PropTypes.number.isRequired

      /*—————————————————————————————————————————————————————————————————————————————
      
        Default props
      
      —————————————————————————————————————————————————————————————————————————————*/

  });var commonDefaultProps = {
      identity: 'id',

      leavesOnly: false,
      padding: 1,

      // border
      borderWidth: 0,
      borderColor: 'inherit',

      // labels
      enableLabel: true,
      label: 'id',
      labelTextColor: 'inherit:darker(1)',
      labelSkipRadius: 8,

      // interactivity
      isInteractive: true,
      onClick: core.noop,
      isZoomable: true
  };

  var BubbleDefaultProps = _extends({}, commonDefaultProps, {
      nodeComponent: BubbleNode,
      defs: [],
      fill: []
  });

  var BubbleHtmlDefaultProps = _extends({}, commonDefaultProps, {
      nodeComponent: BubbleHtmlNode
  });

  var BubbleCanvasDefaultProps = _extends({}, commonDefaultProps, {
      pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
  });

  var props = /*#__PURE__*/Object.freeze({
    BubblePropTypes: BubblePropTypes,
    BubbleHtmlPropTypes: BubbleHtmlPropTypes,
    BubbleCanvasPropTypes: BubbleCanvasPropTypes,
    BubbleDefaultProps: BubbleDefaultProps,
    BubbleHtmlDefaultProps: BubbleHtmlDefaultProps,
    BubbleCanvasDefaultProps: BubbleCanvasDefaultProps
  });

  var commonEnhancers = [core.withHierarchy(), core.withDimensions(), core.withTheme(), core.withColors({ defaultColorBy: 'depth' }), withPropsOnChange(['width', 'height', 'padding'], function (_ref) {
      var width = _ref.width,
          height = _ref.height,
          padding = _ref.padding;
      return {
          pack: d3Hierarchy.pack().size([width, height]).padding(padding)
      };
  }), withPropsOnChange(['identity'], function (_ref2) {
      var identity = _ref2.identity;
      return {
          getIdentity: core.getAccessorFor(identity)
      };
  }),

  // border
  withPropsOnChange(['borderColor'], function (_ref3) {
      var borderColor = _ref3.borderColor;
      return {
          getBorderColor: core.getInheritedColorGenerator(borderColor)
      };
  }),

  // labels
  withPropsOnChange(['label', 'labelFormat'], function (_ref4) {
      var label = _ref4.label,
          labelFormat = _ref4.labelFormat;
      return {
          getLabel: core.getLabelGenerator(label, labelFormat)
      };
  }), withPropsOnChange(['labelTextColor'], function (_ref5) {
      var labelTextColor = _ref5.labelTextColor;
      return {
          getLabelTextColor: core.getInheritedColorGenerator(labelTextColor)
      };
  }),

  // zoom
  withStateHandlers(function (_ref6) {
      var _ref6$currentNodePath = _ref6.currentNodePath,
          currentNodePath = _ref6$currentNodePath === undefined ? null : _ref6$currentNodePath;
      return {
          currentNodePath: currentNodePath
      };
  }, {
      zoomToNode: function zoomToNode(_ref7) {
          var currentNodePath = _ref7.currentNodePath;
          return function (path) {
              if (path === currentNodePath) return { currentNodePath: null };
              return { currentNodePath: path };
          };
      }
  }), withPropsOnChange(['root', 'pack', 'leavesOnly', 'getIdentity', 'getColor'], function (_ref8) {
      var root = _ref8.root,
          pack = _ref8.pack,
          leavesOnly = _ref8.leavesOnly,
          getIdentity = _ref8.getIdentity,
          getColor = _ref8.getColor;

      var nodes = computeNodes({ root: root, pack: pack, leavesOnly: leavesOnly, getIdentity: getIdentity, getColor: getColor });

      return { nodes: nodes };
  }), withPropsOnChange(['enableLabel', 'nodes', 'getLabel', 'labelSkipRadius'], function (_ref9) {
      var enableLabel = _ref9.enableLabel,
          nodes = _ref9.nodes,
          getLabel = _ref9.getLabel,
          labelSkipRadius = _ref9.labelSkipRadius;

      if (!enableLabel) return;
      var nodesWithLabel = nodes.map(function (node) {
          if (node.height !== 0 || labelSkipRadius > 0 && node.r < labelSkipRadius) return node;
          return _extends({}, node, { label: getLabel(node) });
      });

      return { nodes: nodesWithLabel };
  }), withPropsOnChange(['nodes', 'isZoomable', 'currentNodePath'], function (_ref10) {
      var nodes = _ref10.nodes,
          isZoomable = _ref10.isZoomable,
          currentNodePath = _ref10.currentNodePath,
          width = _ref10.width,
          height = _ref10.height;

      if (currentNodePath && isZoomable) {
          return {
              nodes: computeZoom(nodes, currentNodePath, width, height)
          };
      }
  })];

  var svgEnhancers = [withPropsOnChange(['nodes', 'defs', 'fill'], function (_ref11) {
      var nodes = _ref11.nodes,
          defs = _ref11.defs,
          fill = _ref11.fill;

      return {
          defs: core.bindDefs(defs, nodes, fill, { targetKey: 'fill' })
      };
  })];

  var enhance = (function (Component) {
      var implPropTypes = props[Component.displayName + 'PropTypes'];
      var implDefaultProps = props[Component.displayName + 'DefaultProps'];

      Component.propTypes = implPropTypes;

      switch (Component.displayName) {
          case 'Bubble':
              return compose.apply(undefined, [defaultProps(implDefaultProps)].concat(commonEnhancers, svgEnhancers, [core.withMotion(), pure]))(Component);

          case 'BubbleHtml':
              return compose.apply(undefined, [defaultProps(implDefaultProps)].concat(commonEnhancers, [core.withMotion(), pure]))(Component);

          case 'BubbleCanvas':
              return compose.apply(undefined, [defaultProps(implDefaultProps)].concat(commonEnhancers, [pure]))(Component);
      }

      return Component;
  });

  var nodeWillEnter = function nodeWillEnter(_ref) {
      var data = _ref.data;
      return _extends({
          scale: 0,
          r: 0,
          x: data.x,
          y: data.y
      }, core.colorMotionSpring(data.color));
  };

  var nodeWillLeave = function nodeWillLeave(springConfig) {
      return function (_ref2) {
          var data = _ref2.data;
          return _extends({
              scale: reactMotion.spring(0, springConfig),
              r: reactMotion.spring(0, springConfig),
              x: reactMotion.spring(data.x, springConfig),
              y: reactMotion.spring(data.y, springConfig)
          }, core.colorMotionSpring(data.color, springConfig));
      };
  };

  var getNodeHandlers = function getNodeHandlers(node, _ref) {
      var isInteractive = _ref.isInteractive,
          onClick = _ref.onClick,
          showTooltip = _ref.showTooltip,
          hideTooltip = _ref.hideTooltip,
          isZoomable = _ref.isZoomable,
          zoomToNode = _ref.zoomToNode,
          theme = _ref.theme,
          tooltipFormat = _ref.tooltipFormat,
          tooltip = _ref.tooltip;

      if (!isInteractive) return {};

      var handleTooltip = function handleTooltip(e) {
          showTooltip(React__default.createElement(core.BasicTooltip, {
              id: node.id,
              value: node.value,
              enableChip: true,
              color: node.color,
              theme: theme,
              format: tooltipFormat,
              renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _extends({ node: node }, node)) : null
          }), e);
      };

      var clickHandler = onClick;
      if (isZoomable) {
          clickHandler = function clickHandler(event) {
              onClick(node, event);
              zoomToNode(node.path);
          };
      }

      return {
          onMouseEnter: handleTooltip,
          onMouseMove: handleTooltip,
          onMouseLeave: hideTooltip,
          onClick: clickHandler
      };
  };

  /* eslint-disable react/prop-types */

  var Bubble = function Bubble(_ref) {
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
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping,
          isInteractive = _ref.isInteractive,
          onClick = _ref.onClick,
          tooltipFormat = _ref.tooltipFormat,
          tooltip = _ref.tooltip,
          isZoomable = _ref.isZoomable,
          zoomToNode = _ref.zoomToNode;

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
              isZoomable: isZoomable,
              zoomToNode: zoomToNode,
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
                              style: _extends({}, pick(node, ['scale', 'r', 'x', 'y', 'color']), {
                                  fill: node.fill,
                                  borderWidth: borderWidth,
                                  borderColor: getBorderColor(node),
                                  labelTextColor: getLabelTextColor(node)
                              }),
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
                                      scale: reactMotion.spring(1, springConfig),
                                      r: reactMotion.spring(node.r, springConfig),
                                      x: reactMotion.spring(node.x, springConfig),
                                      y: reactMotion.spring(node.y, springConfig),
                                      opacity: reactMotion.spring(1, springConfig)
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
                                          labelTextColor: getLabelTextColor(style)
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

  Bubble.displayName = 'Bubble';

  var enhancedBubble = enhance(Bubble);
  enhancedBubble.displayName = 'Bubble';

  var ResponsiveBubble = function ResponsiveBubble(props) {
      return React__default.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React__default.createElement(enhancedBubble, _extends({ width: width, height: height }, props));
          }
      );
  };

  /* eslint-disable react/prop-types */

  var BubbleHtml = function BubbleHtml(_ref) {
      var nodes = _ref.nodes,
          nodeComponent = _ref.nodeComponent,
          margin = _ref.margin,
          outerWidth = _ref.outerWidth,
          outerHeight = _ref.outerHeight,
          theme = _ref.theme,
          borderWidth = _ref.borderWidth,
          getBorderColor = _ref.getBorderColor,
          getLabelTextColor = _ref.getLabelTextColor,
          animate = _ref.animate,
          motionStiffness = _ref.motionStiffness,
          motionDamping = _ref.motionDamping,
          isInteractive = _ref.isInteractive,
          onClick = _ref.onClick,
          isZoomable = _ref.isZoomable,
          zoomToNode = _ref.zoomToNode,
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
              isZoomable: isZoomable,
              zoomToNode: zoomToNode,
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
                              style: _extends({}, pick(node, ['scale', 'r', 'x', 'y', 'color']), {
                                  borderWidth: borderWidth,
                                  borderColor: getBorderColor(node),
                                  labelTextColor: getLabelTextColor(node)
                              }),
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
                                      scale: reactMotion.spring(1, springConfig),
                                      r: reactMotion.spring(node.r, springConfig),
                                      x: reactMotion.spring(node.x, springConfig),
                                      y: reactMotion.spring(node.y, springConfig),
                                      opacity: reactMotion.spring(1, springConfig)
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
                                          borderWidth: borderWidth,
                                          borderColor: getBorderColor(style),
                                          labelTextColor: getLabelTextColor(style)
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

  BubbleHtml.displayName = 'BubbleHtml';

  var enhancedBubbleHtml = enhance(BubbleHtml);
  enhancedBubbleHtml.displayName = 'BubbleHtml';

  var ResponsiveBubbleHtml = function ResponsiveBubbleHtml(props) {
      return React__default.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React__default.createElement(enhancedBubbleHtml, _extends({ width: width, height: height }, props));
          }
      );
  };

  /* eslint-disable react/prop-types */

  var BubbleCanvas = function (_Component) {
      inherits(BubbleCanvas, _Component);

      function BubbleCanvas() {
          classCallCheck(this, BubbleCanvas);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      BubbleCanvas.prototype.componentDidMount = function componentDidMount() {
          this.ctx = this.surface.getContext('2d');
          this.draw(this.props);
      };

      BubbleCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
          this.ctx = this.surface.getContext('2d');
          this.draw(this.props);
      };

      BubbleCanvas.prototype.draw = function draw(props) {
          var _this2 = this;

          var nodes = props.nodes,
              pixelRatio = props.pixelRatio,
              margin = props.margin,
              outerWidth = props.outerWidth,
              outerHeight = props.outerHeight,
              theme = props.theme,
              borderWidth = props.borderWidth,
              getBorderColor = props.getBorderColor,
              enableLabel = props.enableLabel,
              getLabel = props.getLabel,
              labelSkipRadius = props.labelSkipRadius,
              getLabelTextColor = props.getLabelTextColor;


          this.surface.width = outerWidth * pixelRatio;
          this.surface.height = outerHeight * pixelRatio;

          this.ctx.scale(pixelRatio, pixelRatio);
          this.ctx.fillStyle = theme.background;
          this.ctx.fillRect(0, 0, outerWidth, outerHeight);
          this.ctx.translate(margin.left, margin.top);

          /*
          Could be used to compute metaballs,
          grouping nodes by depth + common parent
          using marching squares, but it really is a bonus feature…
           const maxDepth = _.maxBy(nodes, 'depth').depth
          const nodesByDepth = _.range(maxDepth + 1).map(depth =>
              _.values(
                  _.groupBy(nodes.filter(({ depth: nodeDepth }) => nodeDepth === depth), 'parent.id')
              )
          )
          nodesByDepth.forEach(layer => {
              layer.forEach(node => {
                  console.log(node)
              })
          })
          */

          nodes.forEach(function (node) {
              _this2.ctx.save();

              if (borderWidth > 0) {
                  _this2.ctx.strokeStyle = getBorderColor(node);
                  _this2.ctx.lineWidth = borderWidth;
              }

              _this2.ctx.beginPath();
              _this2.ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI);
              _this2.ctx.fillStyle = node.color;
              _this2.ctx.fill();

              if (borderWidth > 0) {
                  _this2.ctx.stroke();
              }
          });

          if (enableLabel) {
              this.ctx.textAlign = 'center';
              this.ctx.textBaseline = 'middle';
              this.ctx.font = theme.labels.text.fontSize + 'px sans-serif';

              // draw labels on top
              nodes.filter(function (_ref) {
                  var r = _ref.r;
                  return r > labelSkipRadius;
              }).forEach(function (node) {
                  var label = getLabel(node);
                  var labelTextColor = getLabelTextColor(node);

                  _this2.ctx.fillStyle = labelTextColor;
                  _this2.ctx.fillText(label, node.x, node.y);
              });
          }
      };

      BubbleCanvas.prototype.render = function render() {
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

      return BubbleCanvas;
  }(React.Component);

  BubbleCanvas.displayName = 'BubbleCanvas';

  var enhancedBubbleCanvas = enhance(BubbleCanvas);
  enhancedBubbleCanvas.displayName = 'BubbleCanvas';

  var ResponsiveBubbleCanvas = function ResponsiveBubbleCanvas(props) {
      return React__default.createElement(
          core.ResponsiveWrapper,
          null,
          function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return React__default.createElement(enhancedBubbleCanvas, _extends({ width: width, height: height }, props));
          }
      );
  };

  exports.Bubble = enhancedBubble;
  exports.ResponsiveBubble = ResponsiveBubble;
  exports.BubbleHtml = enhancedBubbleHtml;
  exports.ResponsiveBubbleHtml = ResponsiveBubbleHtml;
  exports.BubbleCanvas = enhancedBubbleCanvas;
  exports.ResponsiveBubbleCanvas = ResponsiveBubbleCanvas;
  exports.BubblePropTypes = BubblePropTypes;
  exports.BubbleHtmlPropTypes = BubbleHtmlPropTypes;
  exports.BubbleCanvasPropTypes = BubbleCanvasPropTypes;
  exports.BubbleDefaultProps = BubbleDefaultProps;
  exports.BubbleHtmlDefaultProps = BubbleHtmlDefaultProps;
  exports.BubbleCanvasDefaultProps = BubbleCanvasDefaultProps;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
