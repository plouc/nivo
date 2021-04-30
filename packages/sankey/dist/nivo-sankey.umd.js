(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('lodash'), require('@bitbloom/nivo-core'), require('@bitbloom/nivo-legends'), require('prop-types'), require('d3-sankey'), require('@bitbloom/nivo-colors'), require('react-spring'), require('@bitbloom/nivo-tooltip'), require('d3-shape')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'lodash', '@bitbloom/nivo-core', '@bitbloom/nivo-legends', 'prop-types', 'd3-sankey', '@bitbloom/nivo-colors', 'react-spring', '@bitbloom/nivo-tooltip', 'd3-shape'], factory) :
  (global = global || self, factory(global.nivo = global.nivo || {}, global.React, global.lodash, global.nivo, global.nivo, global.PropTypes, global.d3, global.nivo, global['react-spring'], global.nivo, global.d3));
}(this, (function (exports, React, lodash, nivoCore, nivoLegends, PropTypes, d3Sankey, nivoColors, reactSpring, nivoTooltip, d3Shape) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && Object.prototype.hasOwnProperty.call(PropTypes, 'default') ? PropTypes['default'] : PropTypes;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }

  var sankeyAlignmentPropMapping = {
    center: d3Sankey.sankeyCenter,
    justify: d3Sankey.sankeyJustify,
    start: d3Sankey.sankeyLeft,
    end: d3Sankey.sankeyRight
  };
  var sankeyAlignmentPropKeys = Object.keys(sankeyAlignmentPropMapping);
  var sankeyAlignmentPropType = PropTypes.oneOf(sankeyAlignmentPropKeys);
  var sankeyAlignmentFromProp = function sankeyAlignmentFromProp(prop) {
    return sankeyAlignmentPropMapping[prop];
  };
  var SankeyPropTypes = _objectSpread2({
    data: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      })).isRequired,
      links: PropTypes.arrayOf(PropTypes.shape({
        source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        target: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      })).isRequired
    }).isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    align: sankeyAlignmentPropType.isRequired,
    sort: PropTypes.oneOfType([PropTypes.oneOf(['auto', 'input', 'ascending', 'descending']), PropTypes.func]).isRequired,
    colors: nivoColors.ordinalColorsPropType.isRequired,
    nodeOpacity: PropTypes.number.isRequired,
    nodeHoverOpacity: PropTypes.number.isRequired,
    nodeHoverOthersOpacity: PropTypes.number.isRequired,
    nodeThickness: PropTypes.number.isRequired,
    nodeSpacing: PropTypes.number.isRequired,
    nodeInnerPadding: PropTypes.number.isRequired,
    nodeBorderWidth: PropTypes.number.isRequired,
    nodeBorderColor: nivoColors.inheritedColorPropType,
    linkOpacity: PropTypes.number.isRequired,
    linkHoverOpacity: PropTypes.number.isRequired,
    linkHoverOthersOpacity: PropTypes.number.isRequired,
    linkContract: PropTypes.number.isRequired,
    linkBlendMode: nivoCore.blendModePropType.isRequired,
    enableLinkGradient: PropTypes.bool.isRequired,
    enableLabels: PropTypes.bool.isRequired,
    labelPosition: PropTypes.oneOf(['inside', 'outside']).isRequired,
    labelPadding: PropTypes.number.isRequired,
    labelOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    labelTextColor: nivoColors.inheritedColorPropType,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    nodeTooltip: PropTypes.func,
    linkTooltip: PropTypes.func,
    isInteractive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    legends: PropTypes.arrayOf(PropTypes.shape(nivoLegends.LegendPropShape)).isRequired,
    layers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['links', 'nodes', 'labels', 'legends']), PropTypes.func])).isRequired,
    role: PropTypes.string.isRequired
  }, nivoCore.motionPropTypes);
  var SankeyDefaultProps = {
    layout: 'horizontal',
    align: 'center',
    sort: 'auto',
    colors: {
      scheme: 'nivo'
    },
    nodeOpacity: 0.75,
    nodeHoverOpacity: 1,
    nodeHoverOthersOpacity: 0.15,
    nodeThickness: 12,
    nodeSpacing: 12,
    nodeInnerPadding: 0,
    nodeBorderWidth: 1,
    nodeBorderColor: {
      from: 'color',
      modifiers: [['darker', 0.5]]
    },
    linkOpacity: 0.25,
    linkHoverOpacity: 0.6,
    linkHoverOthersOpacity: 0.15,
    linkContract: 0,
    linkBlendMode: 'multiply',
    enableLinkGradient: false,
    enableLabels: true,
    label: 'id',
    labelPosition: 'inside',
    labelPadding: 9,
    labelOrientation: 'horizontal',
    labelTextColor: {
      from: 'color',
      modifiers: [['darker', 0.8]]
    },
    isInteractive: true,
    onClick: nivoCore.noop,
    legends: [],
    layers: ['links', 'nodes', 'labels', 'legends'],
    role: 'img',
    animate: true,
    motionConfig: 'gentle'
  };

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var getId = function getId(d) {
    return d.id;
  };
  var computeNodeAndLinks = function computeNodeAndLinks(_ref) {
    var _data = _ref.data,
        layout = _ref.layout,
        alignFunction = _ref.alignFunction,
        sortFunction = _ref.sortFunction,
        linkSortMode = _ref.linkSortMode,
        nodeThickness = _ref.nodeThickness,
        nodeSpacing = _ref.nodeSpacing,
        nodeInnerPadding = _ref.nodeInnerPadding,
        width = _ref.width,
        height = _ref.height,
        getColor = _ref.getColor,
        getLinkColor = _ref.getLinkColor,
        getLabel = _ref.getLabel;
    var sankey = d3Sankey.sankey().nodeAlign(alignFunction).nodeSort(sortFunction).linkSort(linkSortMode).nodeWidth(nodeThickness).nodePadding(nodeSpacing).size(layout === 'horizontal' ? [width, height] : [height, width]).nodeId(getId);
    var data = lodash.cloneDeep(_data);
    sankey(data);
    data.nodes.forEach(function (node) {
      node.color = getColor(node);
      node.label = getLabel(node);
      if (layout === 'horizontal') {
        node.x = node.x0 + nodeInnerPadding;
        node.y = node.y0;
        node.width = Math.max(node.x1 - node.x0 - nodeInnerPadding * 2, 0);
        node.height = Math.max(node.y1 - node.y0, 0);
      } else {
        node.x = node.y0;
        node.y = node.x0 + nodeInnerPadding;
        node.width = Math.max(node.y1 - node.y0, 0);
        node.height = Math.max(node.x1 - node.x0 - nodeInnerPadding * 2, 0);
        var oldX0 = node.x0;
        var oldX1 = node.x1;
        node.x0 = node.y0;
        node.x1 = node.y1;
        node.y0 = oldX0;
        node.y1 = oldX1;
      }
    });
    data.links.forEach(function (link) {
      link.color = getLinkColor(link);
      link.pos0 = link.y0;
      link.pos1 = link.y1;
      link.thickness = link.width;
      delete link.y0;
      delete link.y1;
      delete link.width;
    });
    return data;
  };
  var useSankey = function useSankey(_ref2) {
    var data = _ref2.data,
        layout = _ref2.layout,
        width = _ref2.width,
        height = _ref2.height,
        sort = _ref2.sort,
        align = _ref2.align,
        colors = _ref2.colors,
        nodeThickness = _ref2.nodeThickness,
        nodeSpacing = _ref2.nodeSpacing,
        nodeInnerPadding = _ref2.nodeInnerPadding,
        nodeBorderColor = _ref2.nodeBorderColor,
        label = _ref2.label,
        labelFormat = _ref2.labelFormat,
        labelTextColor = _ref2.labelTextColor;
    var _useState = React.useState(null),
        _useState2 = _slicedToArray(_useState, 2),
        currentNode = _useState2[0],
        setCurrentNode = _useState2[1];
    var _useState3 = React.useState(null),
        _useState4 = _slicedToArray(_useState3, 2),
        currentLink = _useState4[0],
        setCurrentLink = _useState4[1];
    var sortFunction = React.useMemo(function () {
      if (sort === 'auto') return undefined;
      if (sort === 'input') return null;
      if (sort === 'ascending') return function (a, b) {
        return a.value - b.value;
      };
      if (sort === 'descending') return function (a, b) {
        return b.value - a.value;
      };
      return sort;
    }, [sort]);
    var linkSortMode = sort === 'input' ? null : undefined;
    var alignFunction = React.useMemo(function () {
      return sankeyAlignmentFromProp(align);
    }, [align]);
    var theme = nivoCore.useTheme();
    var getColor = nivoColors.useOrdinalColorScale(colors, 'id');
    var getNodeBorderColor = nivoColors.useInheritedColor(nodeBorderColor, theme);
    var getLinkColor = nivoColors.useOrdinalColorScale(colors, 'source.id');
    var getLabel = React.useMemo(function () {
      return nivoCore.getLabelGenerator(label, labelFormat);
    }, [label, labelFormat]);
    var getLabelTextColor = nivoColors.useInheritedColor(labelTextColor, theme);
    var _useMemo = React.useMemo(function () {
      return computeNodeAndLinks({
        data: data,
        layout: layout,
        alignFunction: alignFunction,
        sortFunction: sortFunction,
        linkSortMode: linkSortMode,
        nodeThickness: nodeThickness,
        nodeSpacing: nodeSpacing,
        nodeInnerPadding: nodeInnerPadding,
        width: width,
        height: height,
        getColor: getColor,
        getLinkColor: getLinkColor,
        getLabel: getLabel
      });
    }, [data, layout, alignFunction, sortFunction, linkSortMode, nodeThickness, nodeSpacing, nodeInnerPadding, width, height, getColor, getLinkColor, getLabel]),
        nodes = _useMemo.nodes,
        links = _useMemo.links;
    var legendData = React.useMemo(function () {
      return nodes.map(function (node) {
        return {
          id: node.id,
          label: node.label,
          color: node.color
        };
      });
    }, [nodes]);
    return {
      nodes: nodes,
      links: links,
      legendData: legendData,
      getNodeBorderColor: getNodeBorderColor,
      currentNode: currentNode,
      setCurrentNode: setCurrentNode,
      currentLink: currentLink,
      setCurrentLink: setCurrentLink,
      getLabelTextColor: getLabelTextColor
    };
  };

  var SankeyNodesItem = function SankeyNodesItem(_ref) {
    var node = _ref.node,
        x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        color = _ref.color,
        opacity = _ref.opacity,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        setCurrent = _ref.setCurrent,
        isInteractive = _ref.isInteractive,
        onClick = _ref.onClick,
        tooltip = _ref.tooltip;
    var _useMotionConfig = nivoCore.useMotionConfig(),
        animate = _useMotionConfig.animate,
        springConfig = _useMotionConfig.config;
    var animatedProps = reactSpring.useSpring({
      x: x,
      y: y,
      width: width,
      height: height,
      opacity: opacity,
      color: color,
      config: springConfig,
      immediate: !animate
    });
    var _useTooltip = nivoTooltip.useTooltip(),
        showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
        hideTooltip = _useTooltip.hideTooltip;
    var tooltipContent = React.useMemo(function () {
      if (tooltip) {
        return React__default.createElement(nivoTooltip.BasicTooltip, {
          id: tooltip(node),
          enableChip: false
        });
      }
      return React__default.createElement(nivoTooltip.BasicTooltip, {
        id: node.label,
        enableChip: true,
        color: node.color
      });
    }, [tooltip, node]);
    var handleMouseEnter = React.useCallback(function (event) {
      setCurrent(node);
      showTooltipFromEvent(tooltipContent, event, 'left');
    }, [setCurrent, node, showTooltipFromEvent, tooltipContent]);
    var handleMouseMove = React.useCallback(function (event) {
      showTooltipFromEvent(tooltipContent, event, 'left');
    }, [showTooltipFromEvent, tooltipContent]);
    var handleMouseLeave = React.useCallback(function () {
      setCurrent(null);
      hideTooltip();
    }, [setCurrent, hideTooltip]);
    var handleClick = React.useCallback(function (event) {
      onClick(node, event);
    }, [onClick, node]);
    return React__default.createElement(reactSpring.animated.rect, {
      x: animatedProps.x,
      y: animatedProps.y,
      width: animatedProps.width.interpolate(function (v) {
        return Math.max(v, 0);
      }),
      height: animatedProps.height.interpolate(function (v) {
        return Math.max(v, 0);
      }),
      fill: animatedProps.color,
      fillOpacity: animatedProps.opacity,
      strokeWidth: borderWidth,
      stroke: borderColor,
      strokeOpacity: opacity,
      onMouseEnter: isInteractive ? handleMouseEnter : undefined,
      onMouseMove: isInteractive ? handleMouseMove : undefined,
      onMouseLeave: isInteractive ? handleMouseLeave : undefined,
      onClick: isInteractive ? handleClick : undefined
    });
  };
  var SankeyNodesItem$1 = React.memo(SankeyNodesItem);

  var SankeyNodes = function SankeyNodes(_ref) {
    var nodes = _ref.nodes,
        nodeOpacity = _ref.nodeOpacity,
        nodeHoverOpacity = _ref.nodeHoverOpacity,
        nodeHoverOthersOpacity = _ref.nodeHoverOthersOpacity,
        nodeBorderWidth = _ref.nodeBorderWidth,
        getNodeBorderColor = _ref.getNodeBorderColor,
        setCurrentNode = _ref.setCurrentNode,
        currentNode = _ref.currentNode,
        currentLink = _ref.currentLink,
        isCurrentNode = _ref.isCurrentNode,
        isInteractive = _ref.isInteractive,
        onClick = _ref.onClick,
        tooltip = _ref.tooltip;
    var getOpacity = function getOpacity(node) {
      if (!currentNode && !currentLink) return nodeOpacity;
      if (isCurrentNode(node)) return nodeHoverOpacity;
      return nodeHoverOthersOpacity;
    };
    return nodes.map(function (node) {
      return React__default.createElement(SankeyNodesItem$1, {
        key: node.id,
        node: node,
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height,
        color: node.color,
        opacity: getOpacity(node),
        borderWidth: nodeBorderWidth,
        borderColor: getNodeBorderColor(node),
        setCurrent: setCurrentNode,
        isInteractive: isInteractive,
        onClick: onClick,
        tooltip: tooltip
      });
    });
  };
  var SankeyNodes$1 = React.memo(SankeyNodes);

  var SankeyLinkGradient = React.memo(function (_ref) {
    var id = _ref.id,
        layout = _ref.layout,
        startColor = _ref.startColor,
        endColor = _ref.endColor;
    var gradientProps = {};
    if (layout === 'horizontal') {
      gradientProps.x1 = '0%';
      gradientProps.x2 = '100%';
      gradientProps.y1 = '0%';
      gradientProps.y2 = '0%';
    } else {
      gradientProps.x1 = '0%';
      gradientProps.x2 = '0%';
      gradientProps.y1 = '0%';
      gradientProps.y2 = '100%';
    }
    return React__default.createElement("linearGradient", Object.assign({
      id: id,
      spreadMethod: "pad"
    }, gradientProps), React__default.createElement("stop", {
      offset: "0%",
      stopColor: startColor
    }), React__default.createElement("stop", {
      offset: "100%",
      stopColor: endColor
    }));
  });
  SankeyLinkGradient.displayName = 'SankeyLinkGradient';

  var tooltipStyles = {
    container: {
      display: 'flex',
      alignItems: 'center'
    },
    sourceChip: {
      marginRight: 7
    },
    targetChip: {
      marginLeft: 7,
      marginRight: 7
    }
  };
  var TooltipContent = function TooltipContent(_ref) {
    var link = _ref.link,
        format = _ref.format;
    return React__default.createElement("span", {
      style: tooltipStyles.container
    }, React__default.createElement(nivoTooltip.Chip, {
      color: link.source.color,
      style: tooltipStyles.sourceChip
    }), React__default.createElement("strong", null, link.source.label), ' > ', React__default.createElement("strong", null, link.target.label), React__default.createElement(nivoTooltip.Chip, {
      color: link.target.color,
      style: tooltipStyles.targetChip
    }), React__default.createElement("strong", null, format ? format(link.value) : link.value));
  };
  var SankeyLinksItem = function SankeyLinksItem(_ref2) {
    var link = _ref2.link,
        layout = _ref2.layout,
        path = _ref2.path,
        color = _ref2.color,
        opacity = _ref2.opacity,
        blendMode = _ref2.blendMode,
        enableGradient = _ref2.enableGradient,
        setCurrent = _ref2.setCurrent,
        tooltip = _ref2.tooltip,
        tooltipFormat = _ref2.tooltipFormat,
        isInteractive = _ref2.isInteractive,
        onClick = _ref2.onClick;
    var linkId = "".concat(link.source.id, ".").concat(link.target.id);
    var _useMotionConfig = nivoCore.useMotionConfig(),
        animate = _useMotionConfig.animate,
        springConfig = _useMotionConfig.config;
    var animatedProps = reactSpring.useSpring({
      path: path,
      color: color,
      opacity: opacity,
      config: springConfig,
      immediate: !animate
    });
    var _useTooltip = nivoTooltip.useTooltip(),
        showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
        hideTooltip = _useTooltip.hideTooltip;
    var tooltipContent = React.useMemo(function () {
      if (tooltip) {
        return React__default.createElement(nivoTooltip.BasicTooltip, {
          id: tooltip(link),
          enableChip: false
        });
      }
      return React__default.createElement(nivoTooltip.BasicTooltip, {
        id: React__default.createElement(TooltipContent, {
          format: tooltipFormat,
          link: link
        })
      });
    }, [tooltip, tooltipFormat, link]);
    var handleMouseEnter = React.useCallback(function (event) {
      setCurrent(link);
      showTooltipFromEvent(tooltipContent, event, 'left');
    }, [setCurrent, link, showTooltipFromEvent, tooltipContent]);
    var handleMouseMove = React.useCallback(function (event) {
      showTooltipFromEvent(tooltipContent, event, 'left');
    }, [showTooltipFromEvent, tooltipContent]);
    var handleMouseLeave = React.useCallback(function () {
      setCurrent(null);
      hideTooltip();
    }, [setCurrent, hideTooltip]);
    var handleClick = React.useCallback(function (event) {
      onClick(link, event);
    }, [onClick, link]);
    return React__default.createElement(React__default.Fragment, null, enableGradient && React__default.createElement(SankeyLinkGradient, {
      id: linkId,
      layout: layout,
      startColor: link.startColor || link.source.color,
      endColor: link.endColor || link.target.color
    }), React__default.createElement(reactSpring.animated.path, {
      fill: enableGradient ? "url(#".concat(encodeURI(linkId), ")") : animatedProps.color,
      d: animatedProps.path,
      fillOpacity: animatedProps.opacity,
      onMouseEnter: isInteractive ? handleMouseEnter : undefined,
      onMouseMove: isInteractive ? handleMouseMove : undefined,
      onMouseLeave: isInteractive ? handleMouseLeave : undefined,
      onClick: isInteractive ? handleClick : undefined,
      style: {
        mixBlendMode: blendMode
      }
    }));
  };
  var SankeyLinksItem$1 = React.memo(SankeyLinksItem);

  var sankeyLinkHorizontal = function sankeyLinkHorizontal() {
    var lineGenerator = d3Shape.line().curve(d3Shape.curveMonotoneX);
    return function (n, contract) {
      var thickness = Math.max(1, n.thickness - contract * 2);
      var halfThickness = thickness / 2;
      var linkLength = n.target.x0 - n.source.x1;
      var padLength = linkLength * 0.12;
      var dots = [[n.source.x1, n.pos0 - halfThickness], [n.source.x1 + padLength, n.pos0 - halfThickness], [n.target.x0 - padLength, n.pos1 - halfThickness], [n.target.x0, n.pos1 - halfThickness], [n.target.x0, n.pos1 + halfThickness], [n.target.x0 - padLength, n.pos1 + halfThickness], [n.source.x1 + padLength, n.pos0 + halfThickness], [n.source.x1, n.pos0 + halfThickness], [n.source.x1, n.pos0 - halfThickness]];
      return lineGenerator(dots) + 'Z';
    };
  };
  var sankeyLinkVertical = function sankeyLinkVertical() {
    var lineGenerator = d3Shape.line().curve(d3Shape.curveMonotoneY);
    return function (n, contract) {
      var thickness = Math.max(1, n.thickness - contract * 2);
      var halfThickness = thickness / 2;
      var linkLength = n.target.y0 - n.source.y1;
      var padLength = linkLength * 0.12;
      var dots = [[n.pos0 + halfThickness, n.source.y1], [n.pos0 + halfThickness, n.source.y1 + padLength], [n.pos1 + halfThickness, n.target.y0 - padLength], [n.pos1 + halfThickness, n.target.y0], [n.pos1 - halfThickness, n.target.y0], [n.pos1 - halfThickness, n.target.y0 - padLength], [n.pos0 - halfThickness, n.source.y1 + padLength], [n.pos0 - halfThickness, n.source.y1], [n.pos0 + halfThickness, n.source.y1]];
      return lineGenerator(dots) + 'Z';
    };
  };

  var SankeyLinks = function SankeyLinks(_ref) {
    var links = _ref.links,
        layout = _ref.layout,
        linkOpacity = _ref.linkOpacity,
        linkHoverOpacity = _ref.linkHoverOpacity,
        linkHoverOthersOpacity = _ref.linkHoverOthersOpacity,
        linkContract = _ref.linkContract,
        linkBlendMode = _ref.linkBlendMode,
        enableLinkGradient = _ref.enableLinkGradient,
        setCurrentLink = _ref.setCurrentLink,
        currentNode = _ref.currentNode,
        currentLink = _ref.currentLink,
        isCurrentLink = _ref.isCurrentLink,
        isInteractive = _ref.isInteractive,
        onClick = _ref.onClick,
        tooltipFormat = _ref.tooltipFormat,
        tooltip = _ref.tooltip;
    var getOpacity = function getOpacity(link) {
      if (!currentNode && !currentLink) return linkOpacity;
      if (isCurrentLink(link)) return linkHoverOpacity;
      return linkHoverOthersOpacity;
    };
    var getLinkPath = layout === 'horizontal' ? sankeyLinkHorizontal() : sankeyLinkVertical();
    return links.map(function (link) {
      return React__default.createElement(SankeyLinksItem$1, {
        key: "".concat(link.source.id, ".").concat(link.target.id),
        link: link,
        layout: layout,
        path: getLinkPath(link, linkContract),
        color: link.color,
        opacity: getOpacity(link),
        blendMode: linkBlendMode,
        enableGradient: enableLinkGradient,
        setCurrent: setCurrentLink,
        isInteractive: isInteractive,
        onClick: onClick,
        tooltip: tooltip,
        tooltipFormat: tooltipFormat
      });
    });
  };
  var SankeyLinks$1 = React.memo(SankeyLinks);

  var SankeyLabels = function SankeyLabels(_ref) {
    var nodes = _ref.nodes,
        layout = _ref.layout,
        width = _ref.width,
        height = _ref.height,
        labelPosition = _ref.labelPosition,
        labelPadding = _ref.labelPadding,
        labelOrientation = _ref.labelOrientation,
        getLabelTextColor = _ref.getLabelTextColor;
    var theme = nivoCore.useTheme();
    var labelRotation = labelOrientation === 'vertical' ? -90 : 0;
    var labels = nodes.map(function (node) {
      var x;
      var y;
      var textAnchor;
      if (layout === 'horizontal') {
        y = node.y + node.height / 2;
        if (node.x < width / 2) {
          if (labelPosition === 'inside') {
            x = node.x1 + labelPadding;
            textAnchor = labelOrientation === 'vertical' ? 'middle' : 'start';
          } else {
            x = node.x - labelPadding;
            textAnchor = labelOrientation === 'vertical' ? 'middle' : 'end';
          }
        } else {
          if (labelPosition === 'inside') {
            x = node.x - labelPadding;
            textAnchor = labelOrientation === 'vertical' ? 'middle' : 'end';
          } else {
            x = node.x1 + labelPadding;
            textAnchor = labelOrientation === 'vertical' ? 'middle' : 'start';
          }
        }
      } else if (layout === 'vertical') {
        x = node.x + node.width / 2;
        if (node.y < height / 2) {
          if (labelPosition === 'inside') {
            y = node.y1 + labelPadding;
            textAnchor = labelOrientation === 'vertical' ? 'end' : 'middle';
          } else {
            y = node.y - labelPadding;
            textAnchor = labelOrientation === 'vertical' ? 'start' : 'middle';
          }
        } else {
          if (labelPosition === 'inside') {
            y = node.y - labelPadding;
            textAnchor = labelOrientation === 'vertical' ? 'start' : 'middle';
          } else {
            y = node.y1 + labelPadding;
            textAnchor = labelOrientation === 'vertical' ? 'end' : 'middle';
          }
        }
      }
      return {
        id: node.id,
        label: node.label,
        x: x,
        y: y,
        textAnchor: textAnchor,
        color: getLabelTextColor(node)
      };
    });
    var _useMotionConfig = nivoCore.useMotionConfig(),
        animate = _useMotionConfig.animate,
        springConfig = _useMotionConfig.config;
    var springs = reactSpring.useSprings(labels.length, labels.map(function (label) {
      return {
        transform: "translate(".concat(label.x, ", ").concat(label.y, ") rotate(").concat(labelRotation, ")"),
        color: label.color,
        config: springConfig,
        immediate: !animate
      };
    }));
    return springs.map(function (animatedProps, index) {
      var label = labels[index];
      return React__default.createElement(reactSpring.animated.text, {
        key: label.id,
        dominantBaseline: "central",
        textAnchor: label.textAnchor,
        transform: animatedProps.transform,
        style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
          fill: animatedProps.color,
          pointerEvents: 'none'
        })
      }, label.label);
    });
  };
  var SankeyLabels$1 = React.memo(SankeyLabels);

  var Sankey = function Sankey(_ref) {
    var data = _ref.data,
        layout = _ref.layout,
        sort = _ref.sort,
        align = _ref.align,
        width = _ref.width,
        height = _ref.height,
        partialMargin = _ref.margin,
        colors = _ref.colors,
        nodeThickness = _ref.nodeThickness,
        nodeSpacing = _ref.nodeSpacing,
        nodeInnerPadding = _ref.nodeInnerPadding,
        nodeBorderColor = _ref.nodeBorderColor,
        nodeOpacity = _ref.nodeOpacity,
        nodeHoverOpacity = _ref.nodeHoverOpacity,
        nodeHoverOthersOpacity = _ref.nodeHoverOthersOpacity,
        nodeBorderWidth = _ref.nodeBorderWidth,
        linkOpacity = _ref.linkOpacity,
        linkHoverOpacity = _ref.linkHoverOpacity,
        linkHoverOthersOpacity = _ref.linkHoverOthersOpacity,
        linkContract = _ref.linkContract,
        linkBlendMode = _ref.linkBlendMode,
        enableLinkGradient = _ref.enableLinkGradient,
        enableLabels = _ref.enableLabels,
        labelPosition = _ref.labelPosition,
        labelPadding = _ref.labelPadding,
        labelOrientation = _ref.labelOrientation,
        label = _ref.label,
        labelFormat = _ref.labelFormat,
        labelTextColor = _ref.labelTextColor,
        nodeTooltip = _ref.nodeTooltip,
        linkTooltip = _ref.linkTooltip,
        isInteractive = _ref.isInteractive,
        onClick = _ref.onClick,
        tooltipFormat = _ref.tooltipFormat,
        legends = _ref.legends,
        layers = _ref.layers,
        role = _ref.role;
    var _useDimensions = nivoCore.useDimensions(width, height, partialMargin),
        margin = _useDimensions.margin,
        innerWidth = _useDimensions.innerWidth,
        innerHeight = _useDimensions.innerHeight,
        outerWidth = _useDimensions.outerWidth,
        outerHeight = _useDimensions.outerHeight;
    var _useSankey = useSankey({
      data: data,
      layout: layout,
      width: innerWidth,
      height: innerHeight,
      sort: sort,
      align: align,
      colors: colors,
      nodeThickness: nodeThickness,
      nodeSpacing: nodeSpacing,
      nodeInnerPadding: nodeInnerPadding,
      nodeBorderColor: nodeBorderColor,
      label: label,
      labelFormat: labelFormat,
      labelTextColor: labelTextColor
    }),
        nodes = _useSankey.nodes,
        links = _useSankey.links,
        legendData = _useSankey.legendData,
        getNodeBorderColor = _useSankey.getNodeBorderColor,
        currentNode = _useSankey.currentNode,
        setCurrentNode = _useSankey.setCurrentNode,
        currentLink = _useSankey.currentLink,
        setCurrentLink = _useSankey.setCurrentLink,
        getLabelTextColor = _useSankey.getLabelTextColor;
    var isCurrentNode = function isCurrentNode() {
      return false;
    };
    var isCurrentLink = function isCurrentLink() {
      return false;
    };
    if (currentLink) {
      isCurrentNode = function isCurrentNode(_ref2) {
        var id = _ref2.id;
        return id === currentLink.source.id || id === currentLink.target.id;
      };
      isCurrentLink = function isCurrentLink(_ref3) {
        var source = _ref3.source,
            target = _ref3.target;
        return source.id === currentLink.source.id && target.id === currentLink.target.id;
      };
    }
    if (currentNode) {
      var currentNodeIds = [currentNode.id];
      links.filter(function (_ref4) {
        var source = _ref4.source,
            target = _ref4.target;
        return source.id === currentNode.id || target.id === currentNode.id;
      }).forEach(function (_ref5) {
        var source = _ref5.source,
            target = _ref5.target;
        currentNodeIds.push(source.id);
        currentNodeIds.push(target.id);
      });
      currentNodeIds = lodash.uniq(currentNodeIds);
      isCurrentNode = function isCurrentNode(_ref6) {
        var id = _ref6.id;
        return currentNodeIds.includes(id);
      };
      isCurrentLink = function isCurrentLink(_ref7) {
        var source = _ref7.source,
            target = _ref7.target;
        return source.id === currentNode.id || target.id === currentNode.id;
      };
    }
    var layerProps = {
      links: links,
      nodes: nodes,
      margin: margin,
      width: width,
      height: height,
      outerWidth: outerWidth,
      outerHeight: outerHeight
    };
    var layerById = {
      links: React__default.createElement(SankeyLinks$1, {
        key: "links",
        links: links,
        layout: layout,
        linkContract: linkContract,
        linkOpacity: linkOpacity,
        linkHoverOpacity: linkHoverOpacity,
        linkHoverOthersOpacity: linkHoverOthersOpacity,
        linkBlendMode: linkBlendMode,
        enableLinkGradient: enableLinkGradient,
        setCurrentLink: setCurrentLink,
        currentNode: currentNode,
        currentLink: currentLink,
        isCurrentLink: isCurrentLink,
        isInteractive: isInteractive,
        onClick: onClick,
        tooltip: linkTooltip,
        tooltipFormat: tooltipFormat
      }),
      nodes: React__default.createElement(SankeyNodes$1, {
        key: "nodes",
        nodes: nodes,
        nodeOpacity: nodeOpacity,
        nodeHoverOpacity: nodeHoverOpacity,
        nodeHoverOthersOpacity: nodeHoverOthersOpacity,
        nodeBorderWidth: nodeBorderWidth,
        getNodeBorderColor: getNodeBorderColor,
        setCurrentNode: setCurrentNode,
        currentNode: currentNode,
        currentLink: currentLink,
        isCurrentNode: isCurrentNode,
        isInteractive: isInteractive,
        onClick: onClick,
        tooltip: nodeTooltip,
        tooltipFormat: tooltipFormat
      }),
      labels: null,
      legends: legends.map(function (legend, i) {
        return React__default.createElement(nivoLegends.BoxLegendSvg, Object.assign({
          key: "legend".concat(i)
        }, legend, {
          containerWidth: innerWidth,
          containerHeight: innerHeight,
          data: legendData
        }));
      })
    };
    if (enableLabels) {
      layerById.labels = React__default.createElement(SankeyLabels$1, {
        key: "labels",
        nodes: nodes,
        layout: layout,
        width: innerWidth,
        height: innerHeight,
        labelPosition: labelPosition,
        labelPadding: labelPadding,
        labelOrientation: labelOrientation,
        getLabelTextColor: getLabelTextColor
      });
    }
    return React__default.createElement(nivoCore.SvgWrapper, {
      width: outerWidth,
      height: outerHeight,
      margin: margin,
      role: role
    }, layers.map(function (layer, i) {
      if (typeof layer === 'function') {
        return React__default.createElement(React.Fragment, {
          key: i
        }, layer(layerProps));
      }
      return layerById[layer];
    }));
  };
  var WrappedSankey = nivoCore.withContainer(Sankey);
  WrappedSankey.defaultProps = SankeyDefaultProps;

  var ResponsiveSankey = function ResponsiveSankey(props) {
    return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
      var width = _ref.width,
          height = _ref.height;
      return React__default.createElement(WrappedSankey, Object.assign({
        width: width,
        height: height
      }, props));
    });
  };

  exports.ResponsiveSankey = ResponsiveSankey;
  exports.Sankey = WrappedSankey;
  exports.SankeyDefaultProps = SankeyDefaultProps;
  exports.SankeyPropTypes = SankeyPropTypes;
  exports.sankeyAlignmentFromProp = sankeyAlignmentFromProp;
  exports.sankeyAlignmentPropKeys = sankeyAlignmentPropKeys;
  exports.sankeyAlignmentPropMapping = sankeyAlignmentPropMapping;
  exports.sankeyAlignmentPropType = sankeyAlignmentPropType;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=nivo-sankey.umd.js.map
