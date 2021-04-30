import React, { memo, useMemo, useState, Fragment, useRef, useEffect, useCallback } from 'react';
import { useTheme, blendModePropType, motionPropTypes, getLabelGenerator, useValueFormatter, useMotionConfig, midAngle, getPolarLabelProps, withContainer, useDimensions, SvgWrapper, degreesToRadians, getHoveredArc, getRelativeCursor, ResponsiveWrapper } from '@bitbloom/nivo-core';
import { inheritedColorPropType, ordinalColorsPropType, useOrdinalColorScale, interpolateColor, getInterpolatedColor, useInheritedColor } from '@bitbloom/nivo-colors';
import { LegendPropShape, BoxLegendSvg, renderLegendToCanvas } from '@bitbloom/nivo-legends';
import PropTypes from 'prop-types';
import { BasicTooltip, TableTooltip, Chip, useTooltip } from '@bitbloom/nivo-tooltip';
import { arc } from 'd3-shape';
import { chord, ribbon } from 'd3-chord';
import mapValues from 'lodash/mapValues';
import { TransitionMotion, spring } from 'react-motion';

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

var ChordArcTooltip = memo(function (_ref) {
  var arc = _ref.arc;
  return React.createElement(BasicTooltip, {
    id: arc.label,
    value: arc.formattedValue,
    color: arc.color,
    enableChip: true
  });
});
ChordArcTooltip.displayName = 'ChordArcTooltip';

var ChordRibbonTooltip = memo(function (_ref) {
  var ribbon = _ref.ribbon;
  var theme = useTheme();
  return React.createElement(TableTooltip, {
    theme: theme,
    rows: [[React.createElement(Chip, {
      key: "chip",
      color: ribbon.source.color
    }), React.createElement("strong", {
      key: "id"
    }, ribbon.source.label), ribbon.source.formattedValue], [React.createElement(Chip, {
      key: "chip",
      color: ribbon.target.color
    }), React.createElement("strong", {
      key: "id"
    }, ribbon.target.label), ribbon.target.formattedValue]]
  });
});
ChordRibbonTooltip.displayName = 'ChordRibbonTooltip';

var commonPropTypes = {
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  valueFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  padAngle: PropTypes.number.isRequired,
  innerRadiusRatio: PropTypes.number.isRequired,
  innerRadiusOffset: PropTypes.number.isRequired,
  layers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['ribbons', 'arcs', 'labels', 'legends']), PropTypes.func])).isRequired,
  arcOpacity: PropTypes.number.isRequired,
  arcHoverOpacity: PropTypes.number.isRequired,
  arcHoverOthersOpacity: PropTypes.number.isRequired,
  arcBorderWidth: PropTypes.number.isRequired,
  arcBorderColor: inheritedColorPropType.isRequired,
  onArcMouseEnter: PropTypes.func,
  onArcMouseMove: PropTypes.func,
  onArcMouseLeave: PropTypes.func,
  onArcClick: PropTypes.func,
  arcTooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  ribbonOpacity: PropTypes.number.isRequired,
  ribbonHoverOpacity: PropTypes.number.isRequired,
  ribbonHoverOthersOpacity: PropTypes.number.isRequired,
  ribbonBorderWidth: PropTypes.number.isRequired,
  ribbonBorderColor: inheritedColorPropType.isRequired,
  ribbonBlendMode: blendModePropType.isRequired,
  onRibbonMouseEnter: PropTypes.func,
  onRibbonMouseMove: PropTypes.func,
  onRibbonMouseLeave: PropTypes.func,
  onRibbonClick: PropTypes.func,
  ribbonTooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  enableLabel: PropTypes.bool.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  labelOffset: PropTypes.number.isRequired,
  labelRotation: PropTypes.number.isRequired,
  labelTextColor: inheritedColorPropType.isRequired,
  colors: ordinalColorsPropType.isRequired,
  isInteractive: PropTypes.bool.isRequired,
  legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired
};
var ChordPropTypes = _objectSpread2(_objectSpread2(_objectSpread2({}, commonPropTypes), motionPropTypes), {}, {
  role: PropTypes.string.isRequired
});
var ChordCanvasPropTypes = _objectSpread2({
  pixelRatio: PropTypes.number.isRequired
}, commonPropTypes);
var commonDefaultProps = {
  padAngle: 0,
  innerRadiusRatio: 0.9,
  innerRadiusOffset: 0,
  layers: ['ribbons', 'arcs', 'labels', 'legends'],
  arcOpacity: 1,
  arcHoverOpacity: 1,
  arcHoverOthersOpacity: 0.15,
  arcBorderWidth: 1,
  arcBorderColor: {
    from: 'color',
    modifiers: [['darker', 0.4]]
  },
  arcTooltip: ChordArcTooltip,
  ribbonOpacity: 0.5,
  ribbonHoverOpacity: 0.85,
  ribbonHoverOthersOpacity: 0.15,
  ribbonBorderWidth: 1,
  ribbonBorderColor: {
    from: 'color',
    modifiers: [['darker', 0.4]]
  },
  ribbonBlendMode: 'normal',
  ribbonTooltip: ChordRibbonTooltip,
  enableLabel: true,
  label: 'id',
  labelOffset: 12,
  labelRotation: 0,
  labelTextColor: {
    from: 'color',
    modifiers: [['darker', 1]]
  },
  colors: {
    scheme: 'nivo'
  },
  legends: [],
  isInteractive: true
};
var ChordDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
  animate: true,
  motionStiffness: 90,
  motionDamping: 15,
  role: 'img'
});
var ChordCanvasDefaultProps = _objectSpread2(_objectSpread2({}, commonDefaultProps), {}, {
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

var computeChordLayout = function computeChordLayout(_ref) {
  var padAngle = _ref.padAngle;
  return chord().padAngle(padAngle);
};
var computeChordGenerators = function computeChordGenerators(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      innerRadiusRatio = _ref2.innerRadiusRatio,
      innerRadiusOffset = _ref2.innerRadiusOffset;
  var center = [width / 2, height / 2];
  var radius = Math.min(width, height) / 2;
  var innerRadius = radius * innerRadiusRatio;
  var ribbonRadius = radius * (innerRadiusRatio - innerRadiusOffset);
  var arcGenerator = arc().outerRadius(radius).innerRadius(innerRadius);
  var ribbonGenerator = ribbon().radius(ribbonRadius);
  return {
    center: center,
    radius: radius,
    innerRadius: innerRadius,
    arcGenerator: arcGenerator,
    ribbonGenerator: ribbonGenerator
  };
};
var computeChordArcsAndRibbons = function computeChordArcsAndRibbons(_ref3) {
  var chord = _ref3.chord,
      getColor = _ref3.getColor,
      keys = _ref3.keys,
      matrix = _ref3.matrix,
      getLabel = _ref3.getLabel,
      formatValue = _ref3.formatValue;
  var ribbons = chord(matrix);
  var arcs = ribbons.groups.map(function (arc) {
    arc.id = keys[arc.index];
    arc.color = getColor(arc);
    arc.formattedValue = formatValue(arc.value);
    arc.label = getLabel(arc);
    return arc;
  });
  ribbons.forEach(function (ribbon) {
    ribbon.source.id = keys[ribbon.source.index];
    ribbon.source.color = getColor(ribbon.source);
    ribbon.source.formattedValue = formatValue(ribbon.source.value);
    ribbon.source.label = getLabel(ribbon.source);
    ribbon.target.id = keys[ribbon.target.index];
    ribbon.target.color = getColor(ribbon.target);
    ribbon.target.formattedValue = formatValue(ribbon.target.value);
    ribbon.target.label = getLabel(ribbon.target);
    ribbon.id = [ribbon.source.id, ribbon.target.id].sort().join('.');
  });
  return {
    arcs: arcs,
    ribbons: ribbons
  };
};

var useChordLayout = function useChordLayout(_ref) {
  var padAngle = _ref.padAngle;
  return useMemo(function () {
    return computeChordLayout({
      padAngle: padAngle
    });
  }, [padAngle]);
};
var useChordGenerators = function useChordGenerators(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      innerRadiusRatio = _ref2.innerRadiusRatio,
      innerRadiusOffset = _ref2.innerRadiusOffset;
  return useMemo(function () {
    return computeChordGenerators({
      width: width,
      height: height,
      innerRadiusRatio: innerRadiusRatio,
      innerRadiusOffset: innerRadiusOffset
    });
  }, [width, height, innerRadiusRatio, innerRadiusOffset]);
};
var useChordArcsAndRibbons = function useChordArcsAndRibbons(_ref3) {
  var chord = _ref3.chord,
      getColor = _ref3.getColor,
      keys = _ref3.keys,
      matrix = _ref3.matrix,
      getLabel = _ref3.getLabel,
      formatValue = _ref3.formatValue;
  return useMemo(function () {
    return computeChordArcsAndRibbons({
      chord: chord,
      getColor: getColor,
      keys: keys,
      matrix: matrix,
      getLabel: getLabel,
      formatValue: formatValue
    });
  }, [chord, getColor, keys, matrix, getLabel, formatValue]);
};
var useChord = function useChord(_ref4) {
  var keys = _ref4.keys,
      matrix = _ref4.matrix,
      label = _ref4.label,
      valueFormat = _ref4.valueFormat,
      width = _ref4.width,
      height = _ref4.height,
      innerRadiusRatio = _ref4.innerRadiusRatio,
      innerRadiusOffset = _ref4.innerRadiusOffset,
      padAngle = _ref4.padAngle,
      colors = _ref4.colors;
  var chord = useChordLayout({
    padAngle: padAngle
  });
  var _useChordGenerators = useChordGenerators({
    width: width,
    height: height,
    innerRadiusRatio: innerRadiusRatio,
    innerRadiusOffset: innerRadiusOffset
  }),
      center = _useChordGenerators.center,
      radius = _useChordGenerators.radius,
      innerRadius = _useChordGenerators.innerRadius,
      arcGenerator = _useChordGenerators.arcGenerator,
      ribbonGenerator = _useChordGenerators.ribbonGenerator;
  var getLabel = useMemo(function () {
    return getLabelGenerator(label);
  }, [label]);
  var formatValue = useValueFormatter(valueFormat);
  var getColor = useOrdinalColorScale(colors, 'id');
  var _useChordArcsAndRibbo = useChordArcsAndRibbons({
    chord: chord,
    getColor: getColor,
    keys: keys,
    matrix: matrix,
    getLabel: getLabel,
    formatValue: formatValue
  }),
      arcs = _useChordArcsAndRibbo.arcs,
      ribbons = _useChordArcsAndRibbo.ribbons;
  return {
    center: center,
    chord: chord,
    radius: radius,
    innerRadius: innerRadius,
    arcGenerator: arcGenerator,
    ribbonGenerator: ribbonGenerator,
    getColor: getColor,
    arcs: arcs,
    ribbons: ribbons
  };
};
var useChordSelection = function useChordSelection(_ref5) {
  var arcs = _ref5.arcs,
      arcOpacity = _ref5.arcOpacity,
      arcHoverOpacity = _ref5.arcHoverOpacity,
      arcHoverOthersOpacity = _ref5.arcHoverOthersOpacity,
      ribbons = _ref5.ribbons,
      ribbonOpacity = _ref5.ribbonOpacity,
      ribbonHoverOpacity = _ref5.ribbonHoverOpacity,
      ribbonHoverOthersOpacity = _ref5.ribbonHoverOthersOpacity;
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentArc = _useState2[0],
      setCurrentArc = _useState2[1];
  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      currentRibbon = _useState4[0],
      setCurrentRibbon = _useState4[1];
  var selection = useMemo(function () {
    var selectedArcIds = [];
    var selectedRibbonIds = [];
    if (currentArc) {
      selectedArcIds.push(currentArc.id);
      ribbons.filter(function (ribbon) {
        return ribbon.source.id === currentArc.id || ribbon.target.id === currentArc.id;
      }).forEach(function (ribbon) {
        selectedRibbonIds.push(ribbon.id);
      });
    }
    if (currentRibbon) {
      selectedArcIds.push(currentRibbon.source.id);
      selectedArcIds.push(currentRibbon.target.id);
      selectedRibbonIds.push(currentRibbon.id);
    }
    return {
      selectedArcIds: selectedArcIds,
      selectedRibbonIds: selectedRibbonIds
    };
  }, [currentArc, currentRibbon, arcs, ribbons]);
  var hasSelection = selection.selectedArcIds.length > 1 || selection.selectedRibbonIds.length > 0;
  var getArcOpacity = useMemo(function () {
    return function (arc) {
      if (!hasSelection) return arcOpacity;
      return selection.selectedArcIds.includes(arc.id) ? arcHoverOpacity : arcHoverOthersOpacity;
    };
  }, [selection.selectedArcIds, arcOpacity, arcHoverOpacity, arcHoverOthersOpacity]);
  var getRibbonOpacity = useMemo(function () {
    return function (ribbon) {
      if (!hasSelection) return ribbonOpacity;
      return selection.selectedRibbonIds.includes(ribbon.id) ? ribbonHoverOpacity : ribbonHoverOthersOpacity;
    };
  }, [selection.selectedRibbonIds, ribbonOpacity, ribbonHoverOpacity, ribbonHoverOthersOpacity]);
  return _objectSpread2(_objectSpread2({
    currentArc: currentArc,
    setCurrentArc: setCurrentArc,
    currentRibbon: currentRibbon,
    setCurrentRibbon: setCurrentRibbon,
    hasSelection: hasSelection
  }, selection), {}, {
    getArcOpacity: getArcOpacity,
    getRibbonOpacity: getRibbonOpacity
  });
};
var useChordLayerContext = function useChordLayerContext(_ref6) {
  var center = _ref6.center,
      radius = _ref6.radius,
      arcs = _ref6.arcs,
      arcGenerator = _ref6.arcGenerator,
      ribbons = _ref6.ribbons,
      ribbonGenerator = _ref6.ribbonGenerator;
  return useMemo(function () {
    return {
      center: center,
      radius: radius,
      arcs: arcs,
      arcGenerator: arcGenerator,
      ribbons: ribbons,
      ribbonGenerator: ribbonGenerator
    };
  }, [center, radius, arcs, arcGenerator, ribbons, ribbonGenerator]);
};

var ChordRibbon = memo(function (_ref) {
  var ribbon = _ref.ribbon,
      ribbonGenerator = _ref.ribbonGenerator,
      sourceStartAngle = _ref.sourceStartAngle,
      sourceEndAngle = _ref.sourceEndAngle,
      targetStartAngle = _ref.targetStartAngle,
      targetEndAngle = _ref.targetEndAngle,
      color = _ref.color,
      opacity = _ref.opacity,
      borderWidth = _ref.borderWidth,
      getBorderColor = _ref.getBorderColor,
      blendMode = _ref.blendMode,
      isInteractive = _ref.isInteractive,
      setCurrent = _ref.setCurrent,
      onMouseEnter = _ref.onMouseEnter,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick,
      tooltip = _ref.tooltip;
  var _useTooltip = useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleMouseEnter = useMemo(function () {
    if (!isInteractive) return undefined;
    return function (event) {
      setCurrent(ribbon);
      showTooltipFromEvent(React.createElement(tooltip, {
        ribbon: ribbon
      }), event);
      onMouseEnter && onMouseEnter(ribbon, event);
    };
  }, [isInteractive, showTooltipFromEvent, tooltip, ribbon, onMouseEnter]);
  var handleMouseMove = useMemo(function () {
    if (!isInteractive) return undefined;
    return function (event) {
      showTooltipFromEvent(React.createElement(tooltip, {
        ribbon: ribbon
      }), event);
      onMouseMove && onMouseMove(ribbon, event);
    };
  }, [isInteractive, showTooltipFromEvent, tooltip, ribbon, onMouseMove]);
  var handleMouseLeave = useMemo(function () {
    if (!isInteractive) return undefined;
    return function (event) {
      setCurrent(null);
      hideTooltip();
      onMouseLeave && onMouseLeave(ribbon, event);
    };
  }, [isInteractive, hideTooltip, ribbon, onMouseLeave]);
  var handleClick = useMemo(function () {
    if (!isInteractive || !onClick) return undefined;
    return function (event) {
      return onClick(ribbon, event);
    };
  }, [isInteractive, ribbon, onClick]);
  return React.createElement("path", {
    d: ribbonGenerator({
      source: {
        startAngle: sourceStartAngle,
        endAngle: sourceEndAngle
      },
      target: {
        startAngle: targetStartAngle,
        endAngle: targetEndAngle
      }
    }),
    fill: color,
    fillOpacity: opacity,
    strokeWidth: borderWidth,
    stroke: getBorderColor(_objectSpread2(_objectSpread2({}, ribbon), {}, {
      color: color
    })),
    strokeOpacity: opacity,
    style: {
      mixBlendMode: blendMode
    },
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick
  });
});
ChordRibbon.displayName = 'ChordRibbon';

var getRibbonAngles = function getRibbonAngles(_ref, useMiddleAngle, springConfig) {
  var source = _ref.source,
      target = _ref.target;
  var firstArc;
  var secondArc;
  if (source.startAngle < target.startAngle) {
    firstArc = source;
    secondArc = target;
  } else {
    firstArc = target;
    secondArc = source;
  }
  var angles;
  if (useMiddleAngle === true) {
    var firstMiddleAngle = midAngle(firstArc);
    var secondMiddleAngle = midAngle(secondArc);
    angles = {
      sourceStartAngle: firstMiddleAngle,
      sourceEndAngle: firstMiddleAngle,
      targetStartAngle: secondMiddleAngle,
      targetEndAngle: secondMiddleAngle
    };
  } else {
    angles = {
      sourceStartAngle: firstArc.startAngle,
      sourceEndAngle: firstArc.endAngle,
      targetStartAngle: secondArc.startAngle,
      targetEndAngle: secondArc.endAngle
    };
  }
  if (!springConfig) return angles;
  return mapValues(angles, function (angle) {
    return spring(angle, springConfig);
  });
};
var ribbonWillEnter = function ribbonWillEnter(_ref2) {
  var ribbon = _ref2.data;
  return _objectSpread2(_objectSpread2({}, getRibbonAngles(ribbon, true)), {}, {
    opacity: 0
  }, interpolateColor(ribbon.source.color));
};
var ribbonWillLeave = function ribbonWillLeave(springConfig) {
  return function (_ref3) {
    var ribbon = _ref3.data;
    return _objectSpread2(_objectSpread2({}, getRibbonAngles(ribbon, true, springConfig)), {}, {
      opacity: 0
    }, interpolateColor(ribbon.source.color, springConfig));
  };
};
var ChordRibbons = memo(function (_ref4) {
  var ribbons = _ref4.ribbons,
      ribbonGenerator = _ref4.ribbonGenerator,
      borderWidth = _ref4.borderWidth,
      getBorderColor = _ref4.getBorderColor,
      getOpacity = _ref4.getOpacity,
      blendMode = _ref4.blendMode,
      isInteractive = _ref4.isInteractive,
      setCurrent = _ref4.setCurrent,
      onMouseEnter = _ref4.onMouseEnter,
      onMouseMove = _ref4.onMouseMove,
      onMouseLeave = _ref4.onMouseLeave,
      onClick = _ref4.onClick,
      tooltip = _ref4.tooltip;
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      _springConfig = _useMotionConfig.springConfig;
  if (animate !== true) {
    return React.createElement("g", null, ribbons.map(function (ribbon) {
      return React.createElement(ChordRibbon, {
        key: ribbon.id,
        ribbon: ribbon,
        ribbonGenerator: ribbonGenerator,
        sourceStartAngle: ribbon.source.startAngle,
        sourceEndAngle: ribbon.source.endAngle,
        targetStartAngle: ribbon.target.startAngle,
        targetEndAngle: ribbon.target.endAngle,
        color: ribbon.source.color,
        blendMode: blendMode,
        opacity: getOpacity(ribbon),
        borderWidth: borderWidth,
        getBorderColor: getBorderColor,
        isInteractive: isInteractive,
        setCurrent: setCurrent,
        onMouseEnter: onMouseEnter,
        onMouseMove: onMouseMove,
        onMouseLeave: onMouseLeave,
        onClick: onClick,
        tooltip: tooltip
      });
    }));
  }
  var springConfig = _objectSpread2(_objectSpread2({}, _springConfig), {}, {
    precision: 0.001
  });
  return React.createElement(TransitionMotion, {
    willEnter: ribbonWillEnter,
    willLeave: ribbonWillLeave(springConfig),
    styles: ribbons.map(function (ribbon) {
      return {
        key: ribbon.id,
        data: ribbon,
        style: _objectSpread2(_objectSpread2({}, getRibbonAngles(ribbon, false, springConfig)), {}, {
          opacity: spring(getOpacity(ribbon), springConfig)
        }, interpolateColor(ribbon.source.color, springConfig))
      };
    })
  }, function (interpolatedStyles) {
    return React.createElement(React.Fragment, null, interpolatedStyles.map(function (_ref5) {
      var key = _ref5.key,
          style = _ref5.style,
          ribbon = _ref5.data;
      var color = getInterpolatedColor(style);
      return React.createElement(ChordRibbon, {
        key: key,
        ribbon: ribbon,
        ribbonGenerator: ribbonGenerator,
        sourceStartAngle: style.sourceStartAngle,
        sourceEndAngle: Math.max(style.sourceEndAngle, style.sourceStartAngle),
        targetStartAngle: style.targetStartAngle,
        targetEndAngle: Math.max(style.targetEndAngle, style.targetStartAngle),
        color: color,
        blendMode: blendMode,
        opacity: style.opacity,
        borderWidth: borderWidth,
        getBorderColor: getBorderColor,
        isInteractive: isInteractive,
        setCurrent: setCurrent,
        onMouseEnter: onMouseEnter,
        onMouseMove: onMouseMove,
        onMouseLeave: onMouseLeave,
        onClick: onClick,
        tooltip: tooltip
      });
    }));
  });
});
ChordRibbons.displayName = 'ChordRibbons';

var ChordArc = memo(function (_ref) {
  var arc = _ref.arc,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle,
      borderWidth = _ref.borderWidth,
      getBorderColor = _ref.getBorderColor,
      opacity = _ref.opacity,
      arcGenerator = _ref.arcGenerator,
      setCurrent = _ref.setCurrent,
      isInteractive = _ref.isInteractive,
      onMouseEnter = _ref.onMouseEnter,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick,
      tooltip = _ref.tooltip;
  var _useTooltip = useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleMouseEnter = useMemo(function () {
    if (!isInteractive) return undefined;
    return function (event) {
      setCurrent(arc);
      showTooltipFromEvent(React.createElement(tooltip, {
        arc: arc
      }), event);
      onMouseEnter && onMouseEnter(arc, event);
    };
  }, [isInteractive, showTooltipFromEvent, tooltip, arc, onMouseEnter]);
  var handleMouseMove = useMemo(function () {
    if (!isInteractive) return undefined;
    return function (event) {
      showTooltipFromEvent(React.createElement(tooltip, {
        arc: arc
      }), event);
      onMouseMove && onMouseMove(arc, event);
    };
  }, [isInteractive, showTooltipFromEvent, tooltip, arc, onMouseMove]);
  var handleMouseLeave = useMemo(function () {
    if (!isInteractive) return undefined;
    return function (event) {
      setCurrent(null);
      hideTooltip();
      onMouseLeave && onMouseLeave(arc, event);
    };
  }, [isInteractive, hideTooltip, arc, onMouseLeave]);
  var handleClick = useMemo(function () {
    if (!isInteractive || !onClick) return undefined;
    return function (event) {
      return onClick(arc, event);
    };
  }, [isInteractive, arc, onClick]);
  return React.createElement("path", {
    d: arcGenerator({
      startAngle: startAngle,
      endAngle: endAngle
    }),
    fill: arc.color,
    fillOpacity: opacity,
    strokeWidth: borderWidth,
    stroke: getBorderColor(arc),
    strokeOpacity: opacity,
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick
  });
});
ChordArc.displayName = 'ChordArc';

var ChordArcs = memo(function (_ref) {
  var arcs = _ref.arcs,
      borderWidth = _ref.borderWidth,
      getBorderColor = _ref.getBorderColor,
      getOpacity = _ref.getOpacity,
      arcGenerator = _ref.arcGenerator,
      setCurrent = _ref.setCurrent,
      isInteractive = _ref.isInteractive,
      onMouseEnter = _ref.onMouseEnter,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick,
      tooltip = _ref.tooltip;
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      _springConfig = _useMotionConfig.springConfig;
  if (animate !== true) {
    return arcs.map(function (arc) {
      return React.createElement(ChordArc, {
        key: arc.id,
        arc: arc,
        arcGenerator: arcGenerator,
        startAngle: arc.startAngle,
        endAngle: arc.endAngle,
        color: arc.color,
        opacity: getOpacity(arc),
        borderWidth: borderWidth,
        getBorderColor: getBorderColor,
        getOpacity: getOpacity,
        isInteractive: isInteractive,
        setCurrent: setCurrent,
        onMouseEnter: onMouseEnter,
        onMouseMove: onMouseMove,
        onMouseLeave: onMouseLeave,
        onClick: onClick,
        tooltip: tooltip
      });
    });
  }
  var springConfig = _objectSpread2(_objectSpread2({}, _springConfig), {}, {
    precision: 0.001
  });
  return React.createElement(TransitionMotion, {
    styles: arcs.map(function (arc) {
      return {
        key: arc.id,
        data: arc,
        style: _objectSpread2({
          startAngle: spring(arc.startAngle, springConfig),
          endAngle: spring(arc.endAngle, springConfig),
          opacity: spring(getOpacity(arc), springConfig)
        }, interpolateColor(arc.color, springConfig))
      };
    })
  }, function (interpolatedStyles) {
    return React.createElement(React.Fragment, null, interpolatedStyles.map(function (_ref2) {
      var key = _ref2.key,
          style = _ref2.style,
          arc = _ref2.data;
      var color = getInterpolatedColor(style);
      return React.createElement(ChordArc, {
        key: key,
        arc: arc,
        arcGenerator: arcGenerator,
        startAngle: style.startAngle,
        endAngle: style.endAngle,
        color: color,
        opacity: style.opacity,
        borderWidth: borderWidth,
        getBorderColor: getBorderColor,
        getOpacity: getOpacity,
        isInteractive: isInteractive,
        setCurrent: setCurrent,
        onMouseEnter: onMouseEnter,
        onMouseMove: onMouseMove,
        onMouseLeave: onMouseLeave,
        onClick: onClick,
        tooltip: tooltip
      });
    }));
  });
});
ChordArcs.displayName = 'ChordArcs';

var ChordLabels = function ChordLabels(_ref) {
  var arcs = _ref.arcs,
      radius = _ref.radius,
      rotation = _ref.rotation,
      getColor = _ref.getColor;
  var theme = useTheme();
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.springConfig;
  if (animate !== true) {
    return React.createElement(React.Fragment, null, arcs.map(function (arc) {
      var color = getColor(arc, theme);
      var angle = midAngle(arc);
      var textProps = getPolarLabelProps(radius, angle, rotation);
      return React.createElement("text", {
        key: arc.id,
        transform: "translate(".concat(textProps.x, ", ").concat(textProps.y, ") rotate(").concat(textProps.rotate, ")"),
        style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
          pointerEvents: 'none',
          fill: color
        }),
        textAnchor: textProps.align,
        dominantBaseline: textProps.baseline
      }, arc.label);
    }));
  }
  return React.createElement(TransitionMotion, {
    styles: arcs.map(function (arc) {
      var angle = midAngle(arc);
      return {
        key: arc.id,
        data: arc,
        style: {
          angle: spring(angle, springConfig)
        }
      };
    })
  }, function (interpolatedStyles) {
    return React.createElement(React.Fragment, null, interpolatedStyles.map(function (_ref2) {
      var key = _ref2.key,
          style = _ref2.style,
          arc = _ref2.data;
      var color = getColor(arc, theme);
      var textProps = getPolarLabelProps(radius, style.angle, rotation);
      return React.createElement("text", {
        key: key,
        transform: "translate(".concat(textProps.x, ", ").concat(textProps.y, ") rotate(").concat(textProps.rotate, ")"),
        style: _objectSpread2(_objectSpread2({}, theme.labels.text), {}, {
          pointerEvents: 'none',
          fill: color
        }),
        textAnchor: textProps.align,
        dominantBaseline: textProps.baseline
      }, arc.label);
    }));
  });
};

var Chord = function Chord(_ref) {
  var partialMargin = _ref.margin,
      width = _ref.width,
      height = _ref.height,
      keys = _ref.keys,
      matrix = _ref.matrix,
      label = _ref.label,
      valueFormat = _ref.valueFormat,
      innerRadiusRatio = _ref.innerRadiusRatio,
      innerRadiusOffset = _ref.innerRadiusOffset,
      padAngle = _ref.padAngle,
      layers = _ref.layers,
      colors = _ref.colors,
      arcBorderWidth = _ref.arcBorderWidth,
      arcBorderColor = _ref.arcBorderColor,
      arcOpacity = _ref.arcOpacity,
      arcHoverOpacity = _ref.arcHoverOpacity,
      arcHoverOthersOpacity = _ref.arcHoverOthersOpacity,
      arcTooltip = _ref.arcTooltip,
      ribbonBorderWidth = _ref.ribbonBorderWidth,
      ribbonBorderColor = _ref.ribbonBorderColor,
      ribbonBlendMode = _ref.ribbonBlendMode,
      ribbonOpacity = _ref.ribbonOpacity,
      ribbonHoverOpacity = _ref.ribbonHoverOpacity,
      ribbonHoverOthersOpacity = _ref.ribbonHoverOthersOpacity,
      ribbonTooltip = _ref.ribbonTooltip,
      enableLabel = _ref.enableLabel,
      labelOffset = _ref.labelOffset,
      labelRotation = _ref.labelRotation,
      labelTextColor = _ref.labelTextColor,
      isInteractive = _ref.isInteractive,
      onArcMouseEnter = _ref.onArcMouseEnter,
      onArcMouseMove = _ref.onArcMouseMove,
      onArcMouseLeave = _ref.onArcMouseLeave,
      onArcClick = _ref.onArcClick,
      onRibbonMouseEnter = _ref.onRibbonMouseEnter,
      onRibbonMouseMove = _ref.onRibbonMouseMove,
      onRibbonMouseLeave = _ref.onRibbonMouseLeave,
      onRibbonClick = _ref.onRibbonClick,
      legends = _ref.legends,
      role = _ref.role;
  var _useDimensions = useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useChord = useChord({
    keys: keys,
    matrix: matrix,
    label: label,
    valueFormat: valueFormat,
    width: innerWidth,
    height: innerHeight,
    innerRadiusRatio: innerRadiusRatio,
    innerRadiusOffset: innerRadiusOffset,
    padAngle: padAngle,
    colors: colors
  }),
      center = _useChord.center,
      radius = _useChord.radius,
      arcGenerator = _useChord.arcGenerator,
      ribbonGenerator = _useChord.ribbonGenerator,
      arcs = _useChord.arcs,
      ribbons = _useChord.ribbons;
  var _useChordSelection = useChordSelection({
    arcs: arcs,
    arcOpacity: arcOpacity,
    arcHoverOpacity: arcHoverOpacity,
    arcHoverOthersOpacity: arcHoverOthersOpacity,
    ribbons: ribbons,
    ribbonOpacity: ribbonOpacity,
    ribbonHoverOpacity: ribbonHoverOpacity,
    ribbonHoverOthersOpacity: ribbonHoverOthersOpacity
  }),
      setCurrentArc = _useChordSelection.setCurrentArc,
      setCurrentRibbon = _useChordSelection.setCurrentRibbon,
      getArcOpacity = _useChordSelection.getArcOpacity,
      getRibbonOpacity = _useChordSelection.getRibbonOpacity;
  var theme = useTheme();
  var getLabelTextColor = useInheritedColor(labelTextColor, theme);
  var getArcBorderColor = useInheritedColor(arcBorderColor, theme);
  var getRibbonBorderColor = useInheritedColor(ribbonBorderColor, theme);
  var layerContext = useChordLayerContext({
    center: center,
    radius: radius,
    arcs: arcs,
    arcGenerator: arcGenerator,
    ribbons: ribbons,
    ribbonGenerator: ribbonGenerator
  });
  if (radius <= 0) return null;
  var legendData = arcs.map(function (arc) {
    return {
      id: arc.id,
      label: arc.label,
      color: arc.color
    };
  });
  var layerById = {
    ribbons: React.createElement("g", {
      key: "ribbons",
      transform: "translate(".concat(center[0], ", ").concat(center[1], ")")
    }, React.createElement(ChordRibbons, {
      ribbons: ribbons,
      ribbonGenerator: ribbonGenerator,
      borderWidth: ribbonBorderWidth,
      getBorderColor: getRibbonBorderColor,
      getOpacity: getRibbonOpacity,
      blendMode: ribbonBlendMode,
      setCurrent: setCurrentRibbon,
      isInteractive: isInteractive,
      onMouseEnter: onRibbonMouseEnter,
      onMouseMove: onRibbonMouseMove,
      onMouseLeave: onRibbonMouseLeave,
      onClick: onRibbonClick,
      tooltip: ribbonTooltip
    })),
    arcs: React.createElement("g", {
      key: "arcs",
      transform: "translate(".concat(center[0], ", ").concat(center[1], ")")
    }, React.createElement(ChordArcs, {
      arcs: arcs,
      arcGenerator: arcGenerator,
      borderWidth: arcBorderWidth,
      getBorderColor: getArcBorderColor,
      getOpacity: getArcOpacity,
      setCurrent: setCurrentArc,
      isInteractive: isInteractive,
      onMouseEnter: onArcMouseEnter,
      onMouseMove: onArcMouseMove,
      onMouseLeave: onArcMouseLeave,
      onClick: onArcClick,
      tooltip: arcTooltip
    })),
    labels: null,
    legends: React.createElement(Fragment, {
      key: "legends"
    }, legends.map(function (legend, i) {
      return React.createElement(BoxLegendSvg, Object.assign({
        key: i
      }, legend, {
        containerWidth: innerWidth,
        containerHeight: innerHeight,
        data: legendData,
        theme: theme
      }));
    }))
  };
  if (enableLabel === true) {
    layerById.labels = React.createElement("g", {
      key: "labels",
      transform: "translate(".concat(center[0], ", ").concat(center[1], ")")
    }, React.createElement(ChordLabels, {
      arcs: arcs,
      radius: radius + labelOffset,
      rotation: labelRotation,
      getColor: getLabelTextColor
    }));
  }
  return React.createElement(SvgWrapper, {
    width: outerWidth,
    height: outerHeight,
    margin: margin,
    theme: theme,
    role: role
  }, layers.map(function (layer, i) {
    if (layerById[layer] !== undefined) {
      return layerById[layer];
    }
    if (typeof layer === 'function') {
      return React.createElement(Fragment, {
        key: i
      }, layer(layerContext));
    }
    return null;
  }));
};
Chord.defaultProps = ChordDefaultProps;
var Chord$1 = withContainer(Chord);

var getArcFromMouseEvent = function getArcFromMouseEvent(_ref) {
  var event = _ref.event,
      canvasEl = _ref.canvasEl,
      center = _ref.center,
      margin = _ref.margin,
      radius = _ref.radius,
      innerRadius = _ref.innerRadius,
      arcs = _ref.arcs;
  var _getRelativeCursor = getRelativeCursor(canvasEl, event),
      _getRelativeCursor2 = _slicedToArray(_getRelativeCursor, 2),
      x = _getRelativeCursor2[0],
      y = _getRelativeCursor2[1];
  var centerX = margin.left + center[0];
  var centerY = margin.top + center[1];
  return getHoveredArc(centerX, centerY, radius, innerRadius, arcs, x, y);
};
var ChordCanvas = memo(function (_ref2) {
  var pixelRatio = _ref2.pixelRatio,
      partialMargin = _ref2.margin,
      width = _ref2.width,
      height = _ref2.height,
      keys = _ref2.keys,
      matrix = _ref2.matrix,
      label = _ref2.label,
      valueFormat = _ref2.valueFormat,
      innerRadiusRatio = _ref2.innerRadiusRatio,
      innerRadiusOffset = _ref2.innerRadiusOffset,
      padAngle = _ref2.padAngle,
      layers = _ref2.layers,
      colors = _ref2.colors,
      arcBorderWidth = _ref2.arcBorderWidth,
      arcBorderColor = _ref2.arcBorderColor,
      arcOpacity = _ref2.arcOpacity,
      arcHoverOpacity = _ref2.arcHoverOpacity,
      arcHoverOthersOpacity = _ref2.arcHoverOthersOpacity,
      arcTooltip = _ref2.arcTooltip,
      ribbonBorderWidth = _ref2.ribbonBorderWidth,
      ribbonBorderColor = _ref2.ribbonBorderColor,
      ribbonOpacity = _ref2.ribbonOpacity,
      ribbonHoverOpacity = _ref2.ribbonHoverOpacity,
      ribbonHoverOthersOpacity = _ref2.ribbonHoverOthersOpacity,
      enableLabel = _ref2.enableLabel,
      labelOffset = _ref2.labelOffset,
      labelRotation = _ref2.labelRotation,
      labelTextColor = _ref2.labelTextColor,
      isInteractive = _ref2.isInteractive,
      onArcMouseEnter = _ref2.onArcMouseEnter,
      onArcMouseMove = _ref2.onArcMouseMove,
      onArcMouseLeave = _ref2.onArcMouseLeave,
      onArcClick = _ref2.onArcClick,
      legends = _ref2.legends;
  var canvasEl = useRef(null);
  var _useDimensions = useDimensions(width, height, partialMargin),
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight,
      margin = _useDimensions.margin;
  var _useChord = useChord({
    keys: keys,
    matrix: matrix,
    label: label,
    valueFormat: valueFormat,
    width: innerWidth,
    height: innerHeight,
    innerRadiusRatio: innerRadiusRatio,
    innerRadiusOffset: innerRadiusOffset,
    padAngle: padAngle,
    colors: colors
  }),
      center = _useChord.center,
      radius = _useChord.radius,
      innerRadius = _useChord.innerRadius,
      arcGenerator = _useChord.arcGenerator,
      ribbonGenerator = _useChord.ribbonGenerator,
      arcs = _useChord.arcs,
      ribbons = _useChord.ribbons;
  var _useChordSelection = useChordSelection({
    arcs: arcs,
    arcOpacity: arcOpacity,
    arcHoverOpacity: arcHoverOpacity,
    arcHoverOthersOpacity: arcHoverOthersOpacity,
    ribbons: ribbons,
    ribbonOpacity: ribbonOpacity,
    ribbonHoverOpacity: ribbonHoverOpacity,
    ribbonHoverOthersOpacity: ribbonHoverOthersOpacity
  }),
      currentArc = _useChordSelection.currentArc,
      setCurrentArc = _useChordSelection.setCurrentArc,
      getArcOpacity = _useChordSelection.getArcOpacity,
      getRibbonOpacity = _useChordSelection.getRibbonOpacity;
  var theme = useTheme();
  var getLabelTextColor = useInheritedColor(labelTextColor, theme);
  var getArcBorderColor = useInheritedColor(arcBorderColor, theme);
  var getRibbonBorderColor = useInheritedColor(ribbonBorderColor, theme);
  var layerContext = useChordLayerContext({
    center: center,
    radius: radius,
    arcs: arcs,
    arcGenerator: arcGenerator,
    ribbons: ribbons,
    ribbonGenerator: ribbonGenerator
  });
  useEffect(function () {
    canvasEl.current.width = outerWidth * pixelRatio;
    canvasEl.current.height = outerHeight * pixelRatio;
    var ctx = canvasEl.current.getContext('2d');
    ctx.scale(pixelRatio, pixelRatio);
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, outerWidth, outerHeight);
    if (radius <= 0) return;
    layers.forEach(function (layer) {
      if (layer === 'ribbons') {
        ctx.save();
        ctx.translate(margin.left + center[0], margin.top + center[1]);
        ribbonGenerator.context(ctx);
        ribbons.forEach(function (ribbon) {
          ctx.save();
          ctx.globalAlpha = getRibbonOpacity(ribbon);
          ctx.fillStyle = ribbon.source.color;
          ctx.beginPath();
          ribbonGenerator(ribbon);
          ctx.fill();
          if (ribbonBorderWidth > 0) {
            ctx.strokeStyle = getRibbonBorderColor(_objectSpread2(_objectSpread2({}, ribbon), {}, {
              color: ribbon.source.color
            }));
            ctx.lineWidth = ribbonBorderWidth;
            ctx.stroke();
          }
          ctx.restore();
        });
        ctx.restore();
      }
      if (layer === 'arcs') {
        ctx.save();
        ctx.translate(margin.left + center[0], margin.top + center[1]);
        arcGenerator.context(ctx);
        arcs.forEach(function (arc) {
          ctx.save();
          ctx.globalAlpha = getArcOpacity(arc);
          ctx.fillStyle = arc.color;
          ctx.beginPath();
          arcGenerator(arc);
          ctx.fill();
          if (arcBorderWidth > 0) {
            ctx.strokeStyle = getArcBorderColor(arc);
            ctx.lineWidth = arcBorderWidth;
            ctx.stroke();
          }
          ctx.restore();
        });
        ctx.restore();
      }
      if (layer === 'labels' && enableLabel === true) {
        ctx.save();
        ctx.translate(margin.left + center[0], margin.top + center[1]);
        ctx.font = "".concat(theme.labels.text.fontSize, "px ").concat(theme.labels.text.fontFamily || 'sans-serif');
        arcs.forEach(function (arc) {
          var angle = midAngle(arc);
          var props = getPolarLabelProps(radius + labelOffset, angle, labelRotation);
          ctx.save();
          ctx.translate(props.x, props.y);
          ctx.rotate(degreesToRadians(props.rotate));
          ctx.textAlign = props.align;
          ctx.textBaseline = props.baseline;
          ctx.fillStyle = getLabelTextColor(arc, theme);
          ctx.fillText(arc.label, 0, 0);
          ctx.restore();
        });
        ctx.restore();
      }
      if (layer === 'legends') {
        ctx.save();
        ctx.translate(margin.left, margin.top);
        var legendData = arcs.map(function (arc) {
          return {
            id: arc.id,
            label: arc.label,
            color: arc.color
          };
        });
        legends.forEach(function (legend) {
          renderLegendToCanvas(ctx, _objectSpread2(_objectSpread2({}, legend), {}, {
            data: legendData,
            containerWidth: innerWidth,
            containerHeight: innerHeight,
            theme: theme
          }));
        });
        ctx.restore();
      }
      if (typeof layer === 'function') {
        layer(ctx, layerContext);
      }
    });
  }, [canvasEl, innerWidth, innerHeight, outerWidth, outerHeight, margin, pixelRatio, theme, layers, arcs, arcGenerator, getArcOpacity, arcBorderWidth, getArcBorderColor, ribbons, ribbonGenerator, getRibbonOpacity, ribbonBorderWidth, getRibbonBorderColor, enableLabel, labelOffset, labelRotation, getLabelTextColor, legends, layerContext]);
  var _useTooltip = useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleMouseHover = useCallback(function (event) {
    var arc = getArcFromMouseEvent({
      event: event,
      canvasEl: canvasEl.current,
      center: center,
      margin: margin,
      radius: radius,
      innerRadius: innerRadius,
      arcs: arcs
    });
    if (arc) {
      setCurrentArc(arc);
      showTooltipFromEvent(React.createElement(arcTooltip, {
        arc: arc
      }), event);
      !currentArc && onArcMouseEnter && onArcMouseEnter(arc, event);
      onArcMouseMove && onArcMouseMove(arc, event);
      currentArc && currentArc.id !== arc.id && onArcMouseLeave && onArcMouseLeave(arc, event);
    } else {
      setCurrentArc(null);
      hideTooltip();
      currentArc && onArcMouseLeave && onArcMouseLeave(currentArc, event);
    }
  }, [canvasEl, center, margin, radius, innerRadius, arcs, setCurrentArc, showTooltipFromEvent, hideTooltip, onArcMouseEnter, onArcMouseMove, onArcMouseLeave]);
  var handleMouseLeave = useCallback(function () {
    setCurrentArc(null);
    hideTooltip();
  }, [setCurrentArc, hideTooltip]);
  var handleClick = useCallback(function (event) {
    if (!onArcClick) return;
    var arc = getArcFromMouseEvent({
      event: event,
      canvasEl: canvasEl.current,
      center: center,
      margin: margin,
      radius: radius,
      innerRadius: innerRadius,
      arcs: arcs
    });
    arc && onArcClick(arc, event);
  }, [canvasEl, center, margin, radius, innerRadius, arcs, onArcClick]);
  return React.createElement("canvas", {
    ref: canvasEl,
    width: outerWidth * pixelRatio,
    height: outerHeight * pixelRatio,
    style: {
      width: outerWidth,
      height: outerHeight,
      cursor: isInteractive ? 'auto' : 'normal'
    },
    onMouseEnter: isInteractive ? handleMouseHover : undefined,
    onMouseMove: isInteractive ? handleMouseHover : undefined,
    onMouseLeave: isInteractive ? handleMouseLeave : undefined,
    onClick: isInteractive ? handleClick : undefined
  });
});
ChordCanvas.defaultProps = ChordCanvasDefaultProps;
var ChordCanvas$1 = withContainer(ChordCanvas);

var ResponsiveChord = function ResponsiveChord(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(Chord$1, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

var ResponsiveChordCanvas = function ResponsiveChordCanvas(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(ChordCanvas$1, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

export { Chord$1 as Chord, ChordCanvas$1 as ChordCanvas, ChordCanvasDefaultProps, ChordCanvasPropTypes, ChordDefaultProps, ChordPropTypes, ResponsiveChord, ResponsiveChordCanvas, computeChordArcsAndRibbons, computeChordGenerators, computeChordLayout, useChord, useChordArcsAndRibbons, useChordGenerators, useChordLayerContext, useChordLayout, useChordSelection };
//# sourceMappingURL=nivo-chord.es.js.map
