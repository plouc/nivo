import React from 'react';
import sortBy from 'lodash/sortBy';
import cloneDeep from 'lodash/cloneDeep';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import withProps from 'recompose/withProps';
import pure from 'recompose/pure';
import { partition, hierarchy } from 'd3-hierarchy';
import { arc } from 'd3-shape';
import { withTheme, withDimensions, getAccessorFor, Container, SvgWrapper, ResponsiveWrapper } from '@bitbloom/nivo-core';
import { getOrdinalColorScale, getInheritedColorGenerator } from '@bitbloom/nivo-colors';
import { BasicTooltip } from '@bitbloom/nivo-tooltip';

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

var SunburstArc = function SunburstArc(_ref) {
  var node = _ref.node,
      path = _ref.path,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      showTooltip = _ref.showTooltip,
      hideTooltip = _ref.hideTooltip;
  return React.createElement("path", {
    d: path,
    fill: node.data.color,
    stroke: borderColor,
    strokeWidth: borderWidth,
    onMouseEnter: showTooltip,
    onMouseMove: showTooltip,
    onMouseLeave: hideTooltip
  });
};
var enhance = compose(withPropsOnChange(['node', 'arcGenerator'], function (_ref2) {
  var node = _ref2.node,
      arcGenerator = _ref2.arcGenerator;
  return {
    path: arcGenerator(node)
  };
}), withPropsOnChange(['node', 'showTooltip', 'tooltip', 'tooltipFormat', 'theme'], function (_ref3) {
  var node = _ref3.node,
      _showTooltip = _ref3.showTooltip,
      tooltip = _ref3.tooltip,
      tooltipFormat = _ref3.tooltipFormat,
      theme = _ref3.theme;
  return {
    showTooltip: function showTooltip(e) {
      _showTooltip( React.createElement(BasicTooltip, {
        id: node.data.id,
        enableChip: true,
        color: node.data.color,
        value: "".concat(node.data.percentage.toFixed(2), "%"),
        theme: theme,
        format: tooltipFormat,
        renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _objectSpread2({
          node: node
        }, node)) : null
      }), e);
    }
  };
}), pure);
var SunburstArc$1 = enhance(SunburstArc);

var getAncestor = function getAncestor(node) {
  if (node.depth === 1) return node;
  if (node.parent) return getAncestor(node.parent);
  return node;
};
var Sunburst = function Sunburst(_ref) {
  var nodes = _ref.nodes,
      margin = _ref.margin,
      centerX = _ref.centerX,
      centerY = _ref.centerY,
      outerWidth = _ref.outerWidth,
      outerHeight = _ref.outerHeight,
      arcGenerator = _ref.arcGenerator,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      tooltipFormat = _ref.tooltipFormat,
      tooltip = _ref.tooltip,
      theme = _ref.theme,
      role = _ref.role,
      isInteractive = _ref.isInteractive;
  return React.createElement(Container, {
    isInteractive: isInteractive,
    theme: theme,
    animate: false
  }, function (_ref2) {
    var showTooltip = _ref2.showTooltip,
        hideTooltip = _ref2.hideTooltip;
    return React.createElement(SvgWrapper, {
      width: outerWidth,
      height: outerHeight,
      margin: margin,
      theme: theme,
      role: role
    }, React.createElement("g", {
      transform: "translate(".concat(centerX, ", ").concat(centerY, ")")
    }, nodes.filter(function (node) {
      return node.depth > 0;
    }).map(function (node, i) {
      return React.createElement(SunburstArc$1, {
        key: i,
        node: node,
        arcGenerator: arcGenerator,
        borderWidth: borderWidth,
        borderColor: borderColor,
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        tooltipFormat: tooltipFormat,
        tooltip: tooltip,
        theme: theme
      });
    })));
  });
};
var SunburstDefaultProps = {
  identity: 'id',
  value: 'value',
  cornerRadius: 0,
  colors: {
    scheme: 'nivo'
  },
  borderWidth: 1,
  borderColor: 'white',
  childColor: {
    from: 'color'
  },
  role: 'img',
  isInteractive: true
};
var enhance$1 = compose(defaultProps(SunburstDefaultProps), withTheme(), withDimensions(), withPropsOnChange(['colors'], function (_ref3) {
  var colors = _ref3.colors;
  return {
    getColor: getOrdinalColorScale(colors, 'id')
  };
}), withProps(function (_ref4) {
  var width = _ref4.width,
      height = _ref4.height;
  var radius = Math.min(width, height) / 2;
  var partition$1 = partition().size([2 * Math.PI, radius * radius]);
  return {
    radius: radius,
    partition: partition$1,
    centerX: width / 2,
    centerY: height / 2
  };
}), withPropsOnChange(['cornerRadius'], function (_ref5) {
  var cornerRadius = _ref5.cornerRadius;
  return {
    arcGenerator: arc().startAngle(function (d) {
      return d.x0;
    }).endAngle(function (d) {
      return d.x1;
    }).innerRadius(function (d) {
      return Math.sqrt(d.y0);
    }).outerRadius(function (d) {
      return Math.sqrt(d.y1);
    }).cornerRadius(cornerRadius)
  };
}), withPropsOnChange(['identity'], function (_ref6) {
  var identity = _ref6.identity;
  return {
    getIdentity: getAccessorFor(identity)
  };
}), withPropsOnChange(['value'], function (_ref7) {
  var value = _ref7.value;
  return {
    getValue: getAccessorFor(value)
  };
}), withPropsOnChange(['data', 'getValue'], function (_ref8) {
  var data = _ref8.data,
      getValue = _ref8.getValue;
  return {
    data: hierarchy(data).sum(getValue)
  };
}), withPropsOnChange(['childColor', 'theme'], function (_ref9) {
  var childColor = _ref9.childColor,
      theme = _ref9.theme;
  return {
    getChildColor: getInheritedColorGenerator(childColor, theme)
  };
}), withPropsOnChange(['data', 'partition', 'getIdentity', 'getChildColor'], function (_ref10) {
  var data = _ref10.data,
      partition = _ref10.partition,
      getIdentity = _ref10.getIdentity,
      getColor = _ref10.getColor,
      childColor = _ref10.childColor,
      getChildColor = _ref10.getChildColor;
  var total = data.value;
  var nodes = sortBy(partition(cloneDeep(data)).descendants(), 'depth');
  nodes.forEach(function (node) {
    var ancestor = getAncestor(node).data;
    delete node.children;
    delete node.data.children;
    Object.assign(node.data, {
      id: getIdentity(node.data),
      value: node.value,
      percentage: 100 * node.value / total,
      depth: node.depth,
      ancestor: ancestor
    });
    if (node.depth === 1 || childColor === 'noinherit') {
      node.data.color = getColor(node.data);
    } else if (node.depth > 1) {
      node.data.color = getChildColor(node.parent.data);
    }
  });
  return {
    nodes: nodes
  };
}), pure);
var enhancedSunburst = enhance$1(Sunburst);
enhancedSunburst.displayName = 'Sunburst';

var ResponsiveSunburst = function ResponsiveSunburst(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(enhancedSunburst, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

export { ResponsiveSunburst, enhancedSunburst as Sunburst, SunburstDefaultProps };
//# sourceMappingURL=nivo-sunburst.es.js.map
