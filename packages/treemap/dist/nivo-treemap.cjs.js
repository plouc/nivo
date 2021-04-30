'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var nivoCore = require('@bitbloom/nivo-core');
var PropTypes = _interopDefault(require('prop-types'));
var nivoColors = require('@bitbloom/nivo-colors');
var reactSpring = require('react-spring');
var get = _interopDefault(require('lodash/get'));
var omit = _interopDefault(require('lodash/omit'));
var cloneDeep = _interopDefault(require('lodash/cloneDeep'));
var startCase = _interopDefault(require('lodash/startCase'));
var d3Hierarchy = require('d3-hierarchy');
var nivoTooltip = require('@bitbloom/nivo-tooltip');

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

var TreeMapNode = function TreeMapNode(_ref) {
  var node = _ref.node,
      animatedProps = _ref.animatedProps,
      borderWidth = _ref.borderWidth,
      enableLabel = _ref.enableLabel,
      enableParentLabel = _ref.enableParentLabel,
      labelSkipSize = _ref.labelSkipSize;
  var theme = nivoCore.useTheme();
  var showLabel = enableLabel && node.isLeaf && (labelSkipSize === 0 || Math.min(node.width, node.height) > labelSkipSize);
  var showParentLabel = enableParentLabel && node.isParent;
  return React__default.createElement(reactSpring.animated.g, {
    transform: animatedProps.transform
  }, React__default.createElement(reactSpring.animated.rect, {
    width: animatedProps.width.interpolate(function (v) {
      return Math.max(v, 0);
    }),
    height: animatedProps.height.interpolate(function (v) {
      return Math.max(v, 0);
    }),
    fill: node.fill ? node.fill : animatedProps.color,
    strokeWidth: borderWidth,
    stroke: node.borderColor,
    fillOpacity: node.opacity,
    onMouseEnter: node.onMouseEnter,
    onMouseMove: node.onMouseMove,
    onMouseLeave: node.onMouseLeave,
    onClick: node.onClick
  }), showLabel && React__default.createElement(reactSpring.animated.text, {
    textAnchor: "middle",
    dominantBaseline: "central",
    style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
      fill: node.labelTextColor,
      pointerEvents: 'none'
    }),
    fillOpacity: animatedProps.labelOpacity,
    transform: animatedProps.labelTransform
  }, node.label), showParentLabel && React__default.createElement(reactSpring.animated.text, {
    dominantBaseline: "central",
    style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
      fill: node.parentLabelTextColor,
      pointerEvents: 'none'
    }),
    fillOpacity: animatedProps.parentLabelOpacity,
    transform: animatedProps.parentLabelTransform
  }, node.parentLabel));
};
var TreeMapNode$1 = React.memo(TreeMapNode);

var TreeMapHtmlNode = function TreeMapHtmlNode(_ref) {
  var node = _ref.node,
      animatedProps = _ref.animatedProps,
      borderWidth = _ref.borderWidth,
      enableLabel = _ref.enableLabel,
      enableParentLabel = _ref.enableParentLabel,
      labelSkipSize = _ref.labelSkipSize;
  var theme = nivoCore.useTheme();
  var showLabel = enableLabel && node.isLeaf && (labelSkipSize === 0 || Math.min(node.width, node.height) > labelSkipSize);
  var showParentLabel = enableParentLabel && node.isParent;
  return React__default.createElement(reactSpring.animated.div, {
    id: node.path.replace(/[^\w]/gi, '-'),
    style: {
      boxSizing: 'border-box',
      position: 'absolute',
      top: 0,
      left: 0,
      transform: animatedProps.htmlTransform,
      width: animatedProps.width,
      height: animatedProps.height,
      borderWidth: borderWidth,
      borderStyle: 'solid',
      borderColor: node.borderColor,
      overflow: 'hidden'
    }
  }, React__default.createElement(reactSpring.animated.div, {
    style: {
      boxSizing: 'border-box',
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: node.opacity,
      width: animatedProps.width,
      height: animatedProps.height,
      background: animatedProps.color
    },
    onMouseEnter: node.onMouseEnter,
    onMouseMove: node.onMouseMove,
    onMouseLeave: node.onMouseLeave,
    onClick: node.onClick
  }), showLabel && React__default.createElement(reactSpring.animated.span, {
    style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
      position: 'absolute',
      display: 'flex',
      top: -5,
      left: -5,
      width: 10,
      height: 10,
      justifyContent: 'center',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      color: node.labelTextColor,
      transformOrigin: 'center center',
      transform: animatedProps.labelHtmlTransform,
      opacity: animatedProps.labelOpacity,
      pointerEvents: 'none'
    })
  }, node.label), showParentLabel && React__default.createElement(reactSpring.animated.span, {
    style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      width: 10,
      height: 10,
      color: node.parentLabelTextColor,
      transformOrigin: 'top left',
      transform: animatedProps.parentLabelHtmlTransform,
      opacity: animatedProps.parentLabelOpacity,
      pointerEvents: 'none'
    })
  }, node.parentLabel));
};
var TreeMapHtmlNode$1 = React.memo(TreeMapHtmlNode);

var commonPropTypes = {
  identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  valueFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  colors: nivoColors.ordinalColorsPropType.isRequired,
  colorBy: nivoColors.colorPropertyAccessorPropType.isRequired,
  nodeOpacity: PropTypes.number.isRequired,
  leavesOnly: PropTypes.bool.isRequired,
  tile: nivoCore.treeMapTilePropType.isRequired,
  innerPadding: PropTypes.number.isRequired,
  outerPadding: PropTypes.number.isRequired,
  enableLabel: PropTypes.bool.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  labelFormat: PropTypes.string,
  labelSkipSize: PropTypes.number.isRequired,
  labelTextColor: nivoColors.inheritedColorPropType.isRequired,
  orientLabel: PropTypes.bool.isRequired,
  enableParentLabel: PropTypes.bool.isRequired,
  parentLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  parentLabelSize: PropTypes.number.isRequired,
  parentLabelPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  parentLabelPadding: PropTypes.number.isRequired,
  parentLabelTextColor: nivoColors.inheritedColorPropType.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: nivoColors.inheritedColorPropType.isRequired,
  isInteractive: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  tooltip: PropTypes.func
};
var TreeMapPropTypes = _objectSpread2(_objectSpread2({}, commonPropTypes), {}, {
  nodeComponent: PropTypes.elementType.isRequired,
  role: PropTypes.string.isRequired
}, nivoCore.defsPropTypes);
var TreeMapHtmlPropTypes = _objectSpread2(_objectSpread2({}, commonPropTypes), {}, {
  nodeComponent: PropTypes.elementType.isRequired
});
var TreeMapCanvasPropTypes = _objectSpread2(_objectSpread2({}, commonPropTypes), {}, {
  pixelRatio: PropTypes.number.isRequired
});
var commonDefaultProps = {
  identity: 'id',
  value: 'value',
  tile: 'squarify',
  leavesOnly: false,
  innerPadding: 0,
  outerPadding: 0,
  colors: {
    scheme: 'nivo'
  },
  colorBy: 'pathComponents.1',
  nodeOpacity: 0.33,
  enableLabel: true,
  label: 'formattedValue',
  labelSkipSize: 0,
  labelTextColor: {
    from: 'color',
    modifiers: [['darker', 1]]
  },
  orientLabel: true,
  enableParentLabel: true,
  parentLabel: 'id',
  parentLabelSize: 20,
  parentLabelPosition: 'top',
  parentLabelPadding: 6,
  parentLabelTextColor: {
    from: 'color',
    modifiers: [['darker', 1]]
  },
  borderWidth: 1,
  borderColor: {
    from: 'color',
    modifiers: [['darker', 1]]
  },
  isInteractive: true,
  animate: true,
  motionConfig: 'gentle'
};
var TreeMapDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  nodeComponent: TreeMapNode$1,
  role: 'img',
  defs: [],
  fill: []
});
var TreeMapHtmlDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  nodeComponent: TreeMapHtmlNode$1
});
var TreeMapCanvasDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
});

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

var TreeMapNodeTooltip = function TreeMapNodeTooltip(_ref) {
  var node = _ref.node,
      tooltip = _ref.tooltip;
  return React__default.createElement(nivoTooltip.BasicTooltip, {
    id: node.id,
    value: node.formattedValue,
    enableChip: true,
    color: node.color,
    renderContent: typeof tooltip === 'function' ? tooltip.bind(null, {
      node: node
    }) : null
  });
};
var TreeMapNodeTooltip$1 = React.memo(TreeMapNodeTooltip);

var useTreeMapLayout = function useTreeMapLayout(_ref) {
  var width = _ref.width,
      height = _ref.height,
      tile = _ref.tile,
      innerPadding = _ref.innerPadding,
      outerPadding = _ref.outerPadding,
      enableParentLabel = _ref.enableParentLabel,
      parentLabelSize = _ref.parentLabelSize,
      parentLabelPosition = _ref.parentLabelPosition,
      leavesOnly = _ref.leavesOnly;
  return React.useMemo(function () {
    var treemap = d3Hierarchy.treemap().size([width, height]).tile(nivoCore.treeMapTileFromProp(tile)).round(true).paddingInner(innerPadding).paddingOuter(outerPadding);
    if (enableParentLabel && !leavesOnly) {
      var parentLabelPadding = parentLabelSize + outerPadding * 2;
      treemap["padding".concat(startCase(parentLabelPosition))](parentLabelPadding);
    }
    return treemap;
  }, [width, height, tile, innerPadding, outerPadding, enableParentLabel, parentLabelSize, parentLabelPosition, leavesOnly]);
};
var useHierarchy = function useHierarchy(_ref2) {
  var root = _ref2.root,
      getValue = _ref2.getValue;
  return React.useMemo(function () {
    return d3Hierarchy.hierarchy(root).sum(getValue);
  }, [root, getValue]);
};
var useAccessor = function useAccessor(accessor) {
  return React.useMemo(function () {
    if (typeof accessor === 'function') return accessor;
    return function (d) {
      return get(d, accessor);
    };
  }, [accessor]);
};
var computeNodeIdAndPath = function computeNodeIdAndPath(node, getIdentity) {
  var path = node.ancestors().map(function (ancestor) {
    return getIdentity(ancestor.data);
  }).reverse();
  return [path.join('.'), path];
};
var useTreeMap = function useTreeMap(_ref3) {
  var data = _ref3.data,
      _ref3$identity = _ref3.identity,
      identity = _ref3$identity === void 0 ? TreeMapDefaultProps.identity : _ref3$identity,
      _ref3$value = _ref3.value,
      value = _ref3$value === void 0 ? TreeMapDefaultProps.value : _ref3$value,
      valueFormat = _ref3.valueFormat,
      _ref3$leavesOnly = _ref3.leavesOnly,
      leavesOnly = _ref3$leavesOnly === void 0 ? TreeMapDefaultProps.leavesOnly : _ref3$leavesOnly,
      width = _ref3.width,
      height = _ref3.height,
      _ref3$tile = _ref3.tile,
      tile = _ref3$tile === void 0 ? TreeMapDefaultProps.tile : _ref3$tile,
      _ref3$innerPadding = _ref3.innerPadding,
      innerPadding = _ref3$innerPadding === void 0 ? TreeMapDefaultProps.innerPadding : _ref3$innerPadding,
      _ref3$outerPadding = _ref3.outerPadding,
      outerPadding = _ref3$outerPadding === void 0 ? TreeMapDefaultProps.outerPadding : _ref3$outerPadding,
      _ref3$label = _ref3.label,
      label = _ref3$label === void 0 ? TreeMapDefaultProps.label : _ref3$label,
      _ref3$orientLabel = _ref3.orientLabel,
      orientLabel = _ref3$orientLabel === void 0 ? TreeMapDefaultProps.orientLabel : _ref3$orientLabel,
      _ref3$enableParentLab = _ref3.enableParentLabel,
      enableParentLabel = _ref3$enableParentLab === void 0 ? TreeMapDefaultProps.enableParentLabel : _ref3$enableParentLab,
      _ref3$parentLabel = _ref3.parentLabel,
      parentLabel = _ref3$parentLabel === void 0 ? TreeMapDefaultProps.parentLabel : _ref3$parentLabel,
      _ref3$parentLabelSize = _ref3.parentLabelSize,
      parentLabelSize = _ref3$parentLabelSize === void 0 ? TreeMapDefaultProps.parentLabelSize : _ref3$parentLabelSize,
      _ref3$parentLabelPosi = _ref3.parentLabelPosition,
      parentLabelPosition = _ref3$parentLabelPosi === void 0 ? TreeMapDefaultProps.parentLabelPosition : _ref3$parentLabelPosi,
      _ref3$parentLabelPadd = _ref3.parentLabelPadding,
      parentLabelPadding = _ref3$parentLabelPadd === void 0 ? TreeMapDefaultProps.parentLabelPadding : _ref3$parentLabelPadd,
      _ref3$colors = _ref3.colors,
      colors = _ref3$colors === void 0 ? TreeMapDefaultProps.colors : _ref3$colors,
      _ref3$colorBy = _ref3.colorBy,
      colorBy = _ref3$colorBy === void 0 ? TreeMapDefaultProps.colorBy : _ref3$colorBy,
      _ref3$nodeOpacity = _ref3.nodeOpacity,
      nodeOpacity = _ref3$nodeOpacity === void 0 ? TreeMapDefaultProps.nodeOpacity : _ref3$nodeOpacity,
      _ref3$borderColor = _ref3.borderColor,
      borderColor = _ref3$borderColor === void 0 ? TreeMapDefaultProps.borderColor : _ref3$borderColor,
      _ref3$labelTextColor = _ref3.labelTextColor,
      labelTextColor = _ref3$labelTextColor === void 0 ? TreeMapDefaultProps.labelTextColor : _ref3$labelTextColor,
      _ref3$parentLabelText = _ref3.parentLabelTextColor,
      parentLabelTextColor = _ref3$parentLabelText === void 0 ? TreeMapDefaultProps.parentLabelTextColor : _ref3$parentLabelText;
  var getIdentity = useAccessor(identity);
  var getValue = useAccessor(value);
  var formatValue = nivoCore.useValueFormatter(valueFormat);
  var getLabel = useAccessor(label);
  var getParentLabel = useAccessor(parentLabel);
  var layout = useTreeMapLayout({
    width: width,
    height: height,
    tile: tile,
    innerPadding: innerPadding,
    outerPadding: outerPadding,
    enableParentLabel: enableParentLabel,
    parentLabelSize: parentLabelSize,
    parentLabelPosition: parentLabelPosition,
    leavesOnly: leavesOnly
  });
  var hierarchy = useHierarchy({
    root: data,
    getValue: getValue
  });
  var rawNodes = React.useMemo(function () {
    var root = cloneDeep(hierarchy);
    layout(root);
    return leavesOnly ? root.leaves() : root.descendants();
  }, [hierarchy, layout, leavesOnly]);
  var nodes = React.useMemo(function () {
    return rawNodes.map(function (rawNode) {
      var _computeNodeIdAndPath = computeNodeIdAndPath(rawNode, getIdentity),
          _computeNodeIdAndPath2 = _slicedToArray(_computeNodeIdAndPath, 2),
          path = _computeNodeIdAndPath2[0],
          pathComponents = _computeNodeIdAndPath2[1];
      var node = {
        id: getIdentity(rawNode.data),
        path: path,
        pathComponents: pathComponents,
        data: omit(rawNode.data, 'children'),
        x: rawNode.x0,
        y: rawNode.y0,
        width: rawNode.x1 - rawNode.x0,
        height: rawNode.y1 - rawNode.y0,
        value: rawNode.value,
        formattedValue: formatValue(rawNode.value),
        treeDepth: rawNode.depth,
        treeHeight: rawNode.height,
        isParent: rawNode.height > 0,
        isLeaf: rawNode.height === 0
      };
      node.label = getLabel(node);
      node.parentLabel = getParentLabel(node);
      node.parentLabelRotation = 0;
      if (parentLabelPosition === 'top') {
        node.parentLabelX = outerPadding + parentLabelPadding;
        node.parentLabelY = outerPadding + parentLabelSize / 2;
      }
      if (parentLabelPosition === 'right') {
        node.parentLabelX = node.width - outerPadding - parentLabelSize / 2;
        node.parentLabelY = node.height - outerPadding - parentLabelPadding;
        node.parentLabelRotation = -90;
      }
      if (parentLabelPosition === 'bottom') {
        node.parentLabelX = outerPadding + parentLabelPadding;
        node.parentLabelY = node.height - outerPadding - parentLabelSize / 2;
      }
      if (parentLabelPosition === 'left') {
        node.parentLabelX = outerPadding + parentLabelSize / 2;
        node.parentLabelY = node.height - outerPadding - parentLabelPadding;
        node.parentLabelRotation = -90;
      }
      return node;
    });
  }, [rawNodes, leavesOnly, getIdentity, formatValue, getLabel, getParentLabel, parentLabelSize, parentLabelPosition, parentLabelPadding, outerPadding]);
  var theme = nivoCore.useTheme();
  var getColor = nivoColors.useOrdinalColorScale(colors, colorBy);
  var getBorderColor = nivoColors.useInheritedColor(borderColor, theme);
  var getLabelTextColor = nivoColors.useInheritedColor(labelTextColor, theme);
  var getParentLabelTextColor = nivoColors.useInheritedColor(parentLabelTextColor, theme);
  var enhancedNodes = React.useMemo(function () {
    return nodes.map(function (node) {
      node.opacity = nodeOpacity;
      node.labelRotation = orientLabel && node.height > node.width ? -90 : 0;
      node.color = getColor(node);
      node.borderColor = getBorderColor(node);
      node.labelTextColor = getLabelTextColor(node);
      node.parentLabelTextColor = getParentLabelTextColor(node);
      return node;
    });
  }, [nodes, getColor, nodeOpacity, getBorderColor, getLabelTextColor, getParentLabelTextColor, orientLabel]);
  return {
    hierarchy: hierarchy,
    nodes: enhancedNodes,
    layout: layout
  };
};
var useInteractiveTreeMapNodes = function useInteractiveTreeMapNodes(nodes, _ref4) {
  var isInteractive = _ref4.isInteractive,
      onMouseEnter = _ref4.onMouseEnter,
      onMouseMove = _ref4.onMouseMove,
      onMouseLeave = _ref4.onMouseLeave,
      onClick = _ref4.onClick,
      tooltip = _ref4.tooltip;
  var _useTooltip = nivoTooltip.useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var showTooltip = React.useCallback(function (node, event) {
    showTooltipFromEvent( React__default.createElement(TreeMapNodeTooltip$1, {
      node: node,
      tooltip: tooltip
    }), event, 'left');
  }, [showTooltipFromEvent, tooltip]);
  var handleMouseEnter = React.useCallback(function (node, event) {
    showTooltip(node, event);
    onMouseEnter && onMouseEnter(node, event);
  }, [onMouseEnter, showTooltip]);
  var handleMouseMove = React.useCallback(function (node, event) {
    showTooltip(node, event);
    onMouseMove && onMouseMove(node, event);
  }, [onMouseMove, showTooltip]);
  var handleMouseLeave = React.useCallback(function (node, event) {
    hideTooltip();
    onMouseLeave && onMouseLeave(node, event);
  }, [onMouseLeave, hideTooltip]);
  var handleClick = React.useCallback(function (node, event) {
    onClick && onClick(node, event);
  }, [onClick]);
  return React.useMemo(function () {
    return nodes.map(function (node) {
      if (!isInteractive) return node;
      return _objectSpread2(_objectSpread2({}, node), {}, {
        onMouseEnter: function onMouseEnter(event) {
          return handleMouseEnter(node, event);
        },
        onMouseMove: function onMouseMove(event) {
          return handleMouseMove(node, event);
        },
        onMouseLeave: function onMouseLeave(event) {
          return handleMouseLeave(node, event);
        },
        onClick: function onClick(event) {
          return handleClick(node, event);
        }
      });
    });
  }, [nodes, handleMouseEnter, handleMouseMove, handleMouseLeave, handleClick]);
};

var getAnimatedNodeProps = function getAnimatedNodeProps(node) {
  return {
    transform: "translate(".concat(node.x, ",").concat(node.y, ")"),
    htmlTransform: "translate(".concat(node.x, "px,").concat(node.y, "px)"),
    labelOpacity: 1,
    labelTransform: "translate(".concat(node.width / 2, ",").concat(node.height / 2, ") rotate(").concat(node.labelRotation, ")"),
    labelHtmlTransform: "translate(".concat(node.width / 2, "px,").concat(node.height / 2, "px) rotate(").concat(node.labelRotation, "deg)"),
    parentLabelOpacity: 1,
    parentLabelTransform: "translate(".concat(node.parentLabelX, ",").concat(node.parentLabelY, ") rotate(").concat(node.parentLabelRotation, ")"),
    parentLabelHtmlTransform: "translate(".concat(node.parentLabelX - (node.parentLabelRotation === 0 ? 0 : 5), "px,").concat(node.parentLabelY - (node.parentLabelRotation === 0 ? 5 : 0), "px) rotate(").concat(node.parentLabelRotation, "deg)"),
    width: node.width,
    height: node.height,
    color: node.color
  };
};
var getEndingAnimatedNodeProps = function getEndingAnimatedNodeProps(node) {
  var x = node.x + node.width / 2;
  var y = node.y + node.height / 2;
  return {
    transform: "translate(".concat(x, ",").concat(y, ")"),
    transformPixels: "translate(".concat(x, "px,").concat(y, "px)"),
    labelOpacity: 0,
    labelTransform: "translate(0,0) rotate(".concat(node.labelRotation, ")"),
    parentLabelOpacity: 0,
    parentLabelTransform: "translate(0,0) rotate(".concat(node.parentLabelRotation, ")"),
    parentLabelHtmlTransform: "translate(0px,0px) rotate(".concat(node.parentLabelRotation, "deg)"),
    width: 0,
    height: 0,
    color: node.color
  };
};
var TreeMapNodes = function TreeMapNodes(_ref) {
  var nodes = _ref.nodes,
      nodeComponent = _ref.nodeComponent,
      borderWidth = _ref.borderWidth,
      enableLabel = _ref.enableLabel,
      labelSkipSize = _ref.labelSkipSize,
      enableParentLabel = _ref.enableParentLabel,
      isInteractive = _ref.isInteractive,
      onMouseEnter = _ref.onMouseEnter,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick,
      tooltip = _ref.tooltip;
  var interactiveNodes = useInteractiveTreeMapNodes(nodes, {
    isInteractive: isInteractive,
    onMouseEnter: onMouseEnter,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    onClick: onClick,
    tooltip: tooltip
  });
  var _useMotionConfig = nivoCore.useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var transitions = reactSpring.useTransition(interactiveNodes, function (node) {
    return node.path;
  }, {
    initial: function initial(node) {
      return getAnimatedNodeProps(node);
    },
    from: function from(node) {
      return getEndingAnimatedNodeProps(node);
    },
    enter: function enter(node) {
      return getAnimatedNodeProps(node);
    },
    update: function update(node) {
      return getAnimatedNodeProps(node);
    },
    leave: function leave(node) {
      return getEndingAnimatedNodeProps(node);
    },
    config: springConfig,
    immediate: !animate
  });
  return transitions.map(function (_ref2) {
    var node = _ref2.item,
        animatedProps = _ref2.props,
        key = _ref2.key;
    return React__default.createElement(nodeComponent, {
      key: key,
      node: node,
      animatedProps: animatedProps,
      borderWidth: borderWidth,
      enableLabel: enableLabel,
      labelSkipSize: labelSkipSize,
      enableParentLabel: enableParentLabel
    });
  });
};
var TreeMapNodes$1 = React.memo(TreeMapNodes);

var TreeMap = function TreeMap(_ref) {
  var data = _ref.data,
      identity = _ref.identity,
      value = _ref.value,
      tile = _ref.tile,
      nodeComponent = _ref.nodeComponent,
      valueFormat = _ref.valueFormat,
      innerPadding = _ref.innerPadding,
      outerPadding = _ref.outerPadding,
      leavesOnly = _ref.leavesOnly,
      width = _ref.width,
      height = _ref.height,
      partialMargin = _ref.margin,
      colors = _ref.colors,
      colorBy = _ref.colorBy,
      nodeOpacity = _ref.nodeOpacity,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      defs = _ref.defs,
      fill = _ref.fill,
      enableLabel = _ref.enableLabel,
      label = _ref.label,
      labelTextColor = _ref.labelTextColor,
      orientLabel = _ref.orientLabel,
      labelSkipSize = _ref.labelSkipSize,
      enableParentLabel = _ref.enableParentLabel,
      parentLabel = _ref.parentLabel,
      parentLabelSize = _ref.parentLabelSize,
      parentLabelPosition = _ref.parentLabelPosition,
      parentLabelPadding = _ref.parentLabelPadding,
      parentLabelTextColor = _ref.parentLabelTextColor,
      isInteractive = _ref.isInteractive,
      onMouseEnter = _ref.onMouseEnter,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick,
      tooltip = _ref.tooltip,
      role = _ref.role;
  var _useDimensions = nivoCore.useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useTreeMap = useTreeMap({
    data: data,
    identity: identity,
    value: value,
    valueFormat: valueFormat,
    leavesOnly: leavesOnly,
    width: innerWidth,
    height: innerHeight,
    tile: tile,
    innerPadding: innerPadding,
    outerPadding: outerPadding,
    colors: colors,
    colorBy: colorBy,
    nodeOpacity: nodeOpacity,
    borderColor: borderColor,
    label: label,
    labelTextColor: labelTextColor,
    orientLabel: orientLabel,
    enableParentLabel: enableParentLabel,
    parentLabel: parentLabel,
    parentLabelSize: parentLabelSize,
    parentLabelPosition: parentLabelPosition,
    parentLabelPadding: parentLabelPadding,
    parentLabelTextColor: parentLabelTextColor
  }),
      nodes = _useTreeMap.nodes;
  var boundDefs = nivoCore.bindDefs(defs, nodes, fill);
  return React__default.createElement(nivoCore.SvgWrapper, {
    width: outerWidth,
    height: outerHeight,
    margin: margin,
    defs: boundDefs,
    role: role
  }, React__default.createElement(TreeMapNodes$1, {
    nodes: nodes,
    nodeComponent: nodeComponent,
    borderWidth: borderWidth,
    enableLabel: enableLabel,
    labelSkipSize: labelSkipSize,
    enableParentLabel: enableParentLabel,
    isInteractive: isInteractive,
    onMouseEnter: onMouseEnter,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    onClick: onClick,
    tooltip: tooltip
  }));
};
var WrappedTreeMap = nivoCore.withContainer(TreeMap);
WrappedTreeMap.defaultProps = TreeMapDefaultProps;

var ResponsiveTreeMap = function ResponsiveTreeMap(props) {
  return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(WrappedTreeMap, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

var TreeMapHtml = function TreeMapHtml(_ref) {
  var data = _ref.data,
      identity = _ref.identity,
      value = _ref.value,
      tile = _ref.tile,
      nodeComponent = _ref.nodeComponent,
      valueFormat = _ref.valueFormat,
      innerPadding = _ref.innerPadding,
      outerPadding = _ref.outerPadding,
      leavesOnly = _ref.leavesOnly,
      width = _ref.width,
      height = _ref.height,
      partialMargin = _ref.margin,
      colors = _ref.colors,
      colorBy = _ref.colorBy,
      nodeOpacity = _ref.nodeOpacity,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      enableLabel = _ref.enableLabel,
      label = _ref.label,
      labelTextColor = _ref.labelTextColor,
      orientLabel = _ref.orientLabel,
      labelSkipSize = _ref.labelSkipSize,
      enableParentLabel = _ref.enableParentLabel,
      parentLabel = _ref.parentLabel,
      parentLabelSize = _ref.parentLabelSize,
      parentLabelPosition = _ref.parentLabelPosition,
      parentLabelPadding = _ref.parentLabelPadding,
      parentLabelTextColor = _ref.parentLabelTextColor,
      isInteractive = _ref.isInteractive,
      onMouseEnter = _ref.onMouseEnter,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick,
      tooltip = _ref.tooltip;
  var _useDimensions = nivoCore.useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useTreeMap = useTreeMap({
    data: data,
    identity: identity,
    value: value,
    valueFormat: valueFormat,
    leavesOnly: leavesOnly,
    width: innerWidth,
    height: innerHeight,
    tile: tile,
    innerPadding: innerPadding,
    outerPadding: outerPadding,
    colors: colors,
    colorBy: colorBy,
    nodeOpacity: nodeOpacity,
    borderColor: borderColor,
    label: label,
    labelTextColor: labelTextColor,
    orientLabel: orientLabel,
    enableParentLabel: enableParentLabel,
    parentLabel: parentLabel,
    parentLabelSize: parentLabelSize,
    parentLabelPosition: parentLabelPosition,
    parentLabelPadding: parentLabelPadding,
    parentLabelTextColor: parentLabelTextColor
  }),
      nodes = _useTreeMap.nodes;
  return React__default.createElement("div", {
    style: {
      position: 'relative',
      width: outerWidth,
      height: outerHeight
    }
  }, React__default.createElement("div", {
    style: {
      position: 'absolute',
      top: margin.top,
      left: margin.left
    }
  }, React__default.createElement(TreeMapNodes$1, {
    nodes: nodes,
    nodeComponent: nodeComponent,
    borderWidth: borderWidth,
    enableLabel: enableLabel,
    labelSkipSize: labelSkipSize,
    enableParentLabel: enableParentLabel,
    isInteractive: isInteractive,
    onMouseEnter: onMouseEnter,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    onClick: onClick,
    tooltip: tooltip
  })));
};
var WrappedTreeMapHtml = nivoCore.withContainer(TreeMapHtml);
WrappedTreeMapHtml.defaultProps = TreeMapHtmlDefaultProps;

var ResponsiveTreeMapHtml = function ResponsiveTreeMapHtml(props) {
  return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(WrappedTreeMapHtml, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

var findNodeUnderCursor = function findNodeUnderCursor(nodes, margin, x, y) {
  return nodes.find(function (node) {
    return nivoCore.isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y);
  });
};
var TreeMapCanvas = function TreeMapCanvas(_ref) {
  var data = _ref.data,
      identity = _ref.identity,
      value = _ref.value,
      tile = _ref.tile,
      valueFormat = _ref.valueFormat,
      innerPadding = _ref.innerPadding,
      outerPadding = _ref.outerPadding,
      leavesOnly = _ref.leavesOnly,
      width = _ref.width,
      height = _ref.height,
      partialMargin = _ref.margin,
      colors = _ref.colors,
      colorBy = _ref.colorBy,
      nodeOpacity = _ref.nodeOpacity,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      enableLabel = _ref.enableLabel,
      label = _ref.label,
      labelTextColor = _ref.labelTextColor,
      orientLabel = _ref.orientLabel,
      labelSkipSize = _ref.labelSkipSize,
      isInteractive = _ref.isInteractive,
      onMouseMove = _ref.onMouseMove,
      onClick = _ref.onClick,
      tooltip = _ref.tooltip,
      pixelRatio = _ref.pixelRatio;
  var canvasEl = React.useRef(null);
  var _useDimensions = nivoCore.useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useTreeMap = useTreeMap({
    data: data,
    identity: identity,
    value: value,
    valueFormat: valueFormat,
    leavesOnly: leavesOnly,
    width: innerWidth,
    height: innerHeight,
    tile: tile,
    innerPadding: innerPadding,
    outerPadding: outerPadding,
    colors: colors,
    colorBy: colorBy,
    nodeOpacity: nodeOpacity,
    borderColor: borderColor,
    label: label,
    labelTextColor: labelTextColor,
    orientLabel: orientLabel,
    enableParentLabel: false
  }),
      nodes = _useTreeMap.nodes;
  var theme = nivoCore.useTheme();
  React.useEffect(function () {
    canvasEl.current.width = outerWidth * pixelRatio;
    canvasEl.current.height = outerHeight * pixelRatio;
    var ctx = canvasEl.current.getContext('2d');
    ctx.scale(pixelRatio, pixelRatio);
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, outerWidth, outerHeight);
    ctx.translate(margin.left, margin.top);
    nodes.forEach(function (node) {
      ctx.fillStyle = node.color;
      ctx.fillRect(node.x, node.y, node.width, node.height);
      if (borderWidth > 0) {
        ctx.strokeStyle = node.borderColor;
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(node.x, node.y, node.width, node.height);
      }
    });
    if (enableLabel) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = "".concat(theme.labels.text.fontSize, "px ").concat(theme.labels.text.fontFamily);
      nodes.forEach(function (node) {
        var showLabel = node.isLeaf && (labelSkipSize === 0 || Math.min(node.width, node.height) > labelSkipSize);
        if (!showLabel) return;
        var rotate = orientLabel && node.height > node.width;
        ctx.save();
        ctx.translate(node.x + node.width / 2, node.y + node.height / 2);
        ctx.rotate(nivoCore.degreesToRadians(rotate ? -90 : 0));
        ctx.fillStyle = node.labelTextColor;
        ctx.fillText(node.label, 0, 0);
        ctx.restore();
      });
    }
  }, [canvasEl, nodes, outerWidth, outerHeight, innerWidth, innerHeight, margin, borderWidth, enableLabel, orientLabel, labelSkipSize, theme, pixelRatio]);
  var _useTooltip = nivoTooltip.useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleMouseHover = React.useCallback(function (event) {
    var _getRelativeCursor = nivoCore.getRelativeCursor(canvasEl.current, event),
        _getRelativeCursor2 = _slicedToArray(_getRelativeCursor, 2),
        x = _getRelativeCursor2[0],
        y = _getRelativeCursor2[1];
    var node = findNodeUnderCursor(nodes, margin, x, y);
    if (node !== undefined) {
      showTooltipFromEvent( React__default.createElement(TreeMapNodeTooltip$1, {
        node: node,
        tooltip: tooltip
      }), event, 'left');
      onMouseMove && onMouseMove(node, event);
    } else {
      hideTooltip();
    }
  }, [canvasEl, nodes, margin, showTooltipFromEvent, hideTooltip, tooltip, onMouseMove]);
  var handleMouseLeave = React.useCallback(function () {
    hideTooltip();
  }, [hideTooltip]);
  var handleClick = React.useCallback(function (event) {
    var _getRelativeCursor3 = nivoCore.getRelativeCursor(canvasEl.current, event),
        _getRelativeCursor4 = _slicedToArray(_getRelativeCursor3, 2),
        x = _getRelativeCursor4[0],
        y = _getRelativeCursor4[1];
    var node = findNodeUnderCursor(nodes, margin, x, y);
    if (node === undefined) return;
    onClick && onClick(node, event);
  }, [canvasEl, nodes, margin, onClick]);
  return React__default.createElement("canvas", {
    ref: canvasEl,
    width: outerWidth * pixelRatio,
    height: outerHeight * pixelRatio,
    style: {
      width: outerWidth,
      height: outerHeight
    },
    onMouseEnter: isInteractive ? handleMouseHover : undefined,
    onMouseMove: isInteractive ? handleMouseHover : undefined,
    onMouseLeave: isInteractive ? handleMouseLeave : undefined,
    onClick: isInteractive ? handleClick : undefined
  });
};
var WrappedTreeMapCanvas = nivoCore.withContainer(TreeMapCanvas);
WrappedTreeMapCanvas.defaultProps = TreeMapCanvasDefaultProps;

var ResponsiveTreeMapCanvas = function ResponsiveTreeMapCanvas(props) {
  return React__default.createElement(nivoCore.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(WrappedTreeMapCanvas, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

exports.ResponsiveTreeMap = ResponsiveTreeMap;
exports.ResponsiveTreeMapCanvas = ResponsiveTreeMapCanvas;
exports.ResponsiveTreeMapHtml = ResponsiveTreeMapHtml;
exports.TreeMap = WrappedTreeMap;
exports.TreeMapCanvas = WrappedTreeMapCanvas;
exports.TreeMapCanvasDefaultProps = TreeMapCanvasDefaultProps;
exports.TreeMapCanvasPropTypes = TreeMapCanvasPropTypes;
exports.TreeMapDefaultProps = TreeMapDefaultProps;
exports.TreeMapHtml = WrappedTreeMapHtml;
exports.TreeMapHtmlDefaultProps = TreeMapHtmlDefaultProps;
exports.TreeMapHtmlPropTypes = TreeMapHtmlPropTypes;
exports.TreeMapPropTypes = TreeMapPropTypes;
//# sourceMappingURL=nivo-treemap.cjs.js.map
