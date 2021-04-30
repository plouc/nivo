import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import isPlainObject from 'lodash/isPlainObject';
import filter from 'lodash/filter';
import omit from 'lodash/omit';
import { absoluteAngleDegrees, radiansToDegrees, positionFromAngle, degreesToRadians, useTheme, useMotionConfig } from '@bitbloom/nivo-core';
import { useSpring, animated } from 'react-spring';

var annotationSpecPropType = PropTypes.shape({
  match: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  type: PropTypes.oneOf(['circle', 'rect', 'dot']).isRequired,
  noteX: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    abs: PropTypes.number.isRequired
  })]).isRequired,
  noteY: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    abs: PropTypes.number.isRequired
  })]).isRequired,
  noteWidth: PropTypes.number,
  noteTextOffset: PropTypes.number,
  note: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  offset: PropTypes.number
});
var defaultProps = {
  noteWidth: 120,
  noteTextOffset: 8,
  animate: true,
  motionStiffness: 90,
  motionDamping: 13
};

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

var defaultPositionAccessor = function defaultPositionAccessor(item) {
  return {
    x: item.x,
    y: item.y
  };
};
var bindAnnotations = function bindAnnotations(_ref) {
  var items = _ref.items,
      annotations = _ref.annotations,
      _ref$getPosition = _ref.getPosition,
      getPosition = _ref$getPosition === void 0 ? defaultPositionAccessor : _ref$getPosition,
      getDimensions = _ref.getDimensions;
  return annotations.reduce(function (acc, annotation) {
    filter(items, annotation.match).forEach(function (item) {
      var position = getPosition(item);
      var dimensions = getDimensions(item, annotation.offset || 0);
      acc.push(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, omit(annotation, ['match', 'offset'])), position), dimensions), {}, {
        datum: item,
        size: annotation.size || dimensions.size
      }));
    });
    return acc;
  }, []);
};
var getLinkAngle = function getLinkAngle(sourceX, sourceY, targetX, targetY) {
  var angle = Math.atan2(targetY - sourceY, targetX - sourceX);
  return absoluteAngleDegrees(radiansToDegrees(angle));
};
var computeAnnotation = function computeAnnotation(_ref2) {
  var type = _ref2.type,
      x = _ref2.x,
      y = _ref2.y,
      size = _ref2.size,
      width = _ref2.width,
      height = _ref2.height,
      noteX = _ref2.noteX,
      noteY = _ref2.noteY,
      _ref2$noteWidth = _ref2.noteWidth,
      noteWidth = _ref2$noteWidth === void 0 ? defaultProps.noteWidth : _ref2$noteWidth,
      _ref2$noteTextOffset = _ref2.noteTextOffset,
      noteTextOffset = _ref2$noteTextOffset === void 0 ? defaultProps.noteTextOffset : _ref2$noteTextOffset;
  var computedNoteX;
  var computedNoteY;
  if (isPlainObject(noteX)) {
    if (noteX.abs !== undefined) {
      computedNoteX = noteX.abs;
    }
  } else {
    computedNoteX = x + noteX;
  }
  if (isPlainObject(noteY)) {
    if (noteY.abs !== undefined) {
      computedNoteY = noteY.abs;
    }
  } else {
    computedNoteY = y + noteY;
  }
  var computedX = x;
  var computedY = y;
  var angle = getLinkAngle(x, y, computedNoteX, computedNoteY);
  if (type === 'circle') {
    var position = positionFromAngle(degreesToRadians(angle), size / 2);
    computedX += position.x;
    computedY += position.y;
  }
  if (type === 'rect') {
    var eighth = Math.round((angle + 90) / 45) % 8;
    if (eighth === 0) {
      computedY -= height / 2;
    }
    if (eighth === 1) {
      computedX += width / 2;
      computedY -= height / 2;
    }
    if (eighth === 2) {
      computedX += width / 2;
    }
    if (eighth === 3) {
      computedX += width / 2;
      computedY += height / 2;
    }
    if (eighth === 4) {
      computedY += height / 2;
    }
    if (eighth === 5) {
      computedX -= width / 2;
      computedY += height / 2;
    }
    if (eighth === 6) {
      computedX -= width / 2;
    }
    if (eighth === 7) {
      computedX -= width / 2;
      computedY -= height / 2;
    }
  }
  var textX = computedNoteX;
  var textY = computedNoteY - noteTextOffset;
  var noteLineX = computedNoteX;
  var noteLineY = computedNoteY;
  if ((angle + 90) % 360 > 180) {
    textX -= noteWidth;
    noteLineX -= noteWidth;
  } else {
    noteLineX += noteWidth;
  }
  return {
    points: [[computedX, computedY], [computedNoteX, computedNoteY], [noteLineX, noteLineY]],
    text: [textX, textY],
    angle: angle + 90
  };
};

var useAnnotations = function useAnnotations(_ref) {
  var items = _ref.items,
      annotations = _ref.annotations,
      getPosition = _ref.getPosition,
      getDimensions = _ref.getDimensions;
  return useMemo(function () {
    return bindAnnotations({
      items: items,
      annotations: annotations,
      getPosition: getPosition,
      getDimensions: getDimensions
    });
  }, [items, annotations, getPosition, getDimensions]);
};
var useComputedAnnotations = function useComputedAnnotations(_ref2) {
  var annotations = _ref2.annotations,
      containerWidth = _ref2.containerWidth,
      containerHeight = _ref2.containerHeight;
  return useMemo(function () {
    return annotations.map(function (annotation) {
      return _objectSpread2(_objectSpread2({}, annotation), {}, {
        computed: computeAnnotation(_objectSpread2({
          containerWidth: containerWidth,
          containerHeight: containerHeight
        }, annotation))
      });
    });
  }, [annotations, containerWidth, containerHeight]);
};
var useComputedAnnotation = function useComputedAnnotation(_ref3) {
  var type = _ref3.type,
      containerWidth = _ref3.containerWidth,
      containerHeight = _ref3.containerHeight,
      x = _ref3.x,
      y = _ref3.y,
      size = _ref3.size,
      width = _ref3.width,
      height = _ref3.height,
      noteX = _ref3.noteX,
      noteY = _ref3.noteY,
      noteWidth = _ref3.noteWidth,
      noteTextOffset = _ref3.noteTextOffset;
  return useMemo(function () {
    return computeAnnotation({
      type: type,
      containerWidth: containerWidth,
      containerHeight: containerHeight,
      x: x,
      y: y,
      size: size,
      width: width,
      height: height,
      noteX: noteX,
      noteY: noteY,
      noteWidth: noteWidth,
      noteTextOffset: noteTextOffset
    });
  }, [type, containerWidth, containerHeight, x, y, size, width, height, noteX, noteY, noteWidth, noteTextOffset]);
};

var AnnotationNote = memo(function (_ref) {
  var datum = _ref.datum,
      x = _ref.x,
      y = _ref.y,
      note = _ref.note;
  var theme = useTheme();
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfiig = _useMotionConfig.config;
  var animatedProps = useSpring({
    x: x,
    y: y,
    config: springConfiig,
    immediate: !animate
  });
  if (typeof note === 'function') {
    return note({
      x: x,
      y: y,
      datum: datum
    });
  }
  return React.createElement(React.Fragment, null, theme.annotations.text.outlineWidth > 0 && React.createElement(animated.text, {
    x: animatedProps.x,
    y: animatedProps.y,
    style: _objectSpread2(_objectSpread2({}, theme.annotations.text), {}, {
      strokeLinejoin: 'round',
      strokeWidth: theme.annotations.text.outlineWidth * 2,
      stroke: theme.annotations.text.outlineColor
    })
  }, note), React.createElement(animated.text, {
    x: animatedProps.x,
    y: animatedProps.y,
    style: omit(theme.annotations.text, ['outlineWidth', 'outlineColor'])
  }, note));
});
AnnotationNote.displayName = 'AnnotationNote';
AnnotationNote.defaultProps = {};

var AnnotationLink = memo(function (_ref) {
  var points = _ref.points,
      isOutline = _ref.isOutline;
  var theme = useTheme();
  var path = "M".concat(points[0][0], ",").concat(points[0][1]);
  points.slice(1).forEach(function (point) {
    path = "".concat(path, " L").concat(point[0], ",").concat(point[1]);
  });
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var animatedProps = useSpring({
    path: path,
    config: springConfig,
    immediate: !animate
  });
  if (isOutline && theme.annotations.link.outlineWidth <= 0) {
    return null;
  }
  var style = _objectSpread2({}, theme.annotations.link);
  if (isOutline) {
    style.strokeLinecap = 'square';
    style.strokeWidth = theme.annotations.link.strokeWidth + theme.annotations.link.outlineWidth * 2;
    style.stroke = theme.annotations.link.outlineColor;
  }
  return React.createElement(animated.path, {
    fill: "none",
    d: animatedProps.path,
    style: style
  });
});
AnnotationLink.displayName = 'AnnotationLink';
AnnotationLink.defaultProps = {
  isOutline: false
};

var CircleAnnotationOutline = memo(function (_ref) {
  var x = _ref.x,
      y = _ref.y,
      size = _ref.size;
  var theme = useTheme();
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var animatedProps = useSpring({
    x: x,
    y: y,
    radius: size / 2,
    config: springConfig,
    immediate: !animate
  });
  return React.createElement(React.Fragment, null, theme.annotations.outline.outlineWidth > 0 && React.createElement(animated.circle, {
    cx: animatedProps.x,
    cy: animatedProps.y,
    r: animatedProps.radius,
    style: _objectSpread2(_objectSpread2({}, theme.annotations.outline), {}, {
      fill: 'none',
      strokeWidth: theme.annotations.outline.strokeWidth + theme.annotations.outline.outlineWidth * 2,
      stroke: theme.annotations.outline.outlineColor
    })
  }), React.createElement(animated.circle, {
    cx: animatedProps.x,
    cy: animatedProps.y,
    r: animatedProps.radius,
    style: theme.annotations.outline
  }));
});
CircleAnnotationOutline.displayName = 'CircleAnnotationOutline';

var DotAnnotationOutline = memo(function (_ref) {
  var x = _ref.x,
      y = _ref.y,
      size = _ref.size;
  var theme = useTheme();
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var animatedProps = useSpring({
    x: x,
    y: y,
    radius: size / 2,
    config: springConfig,
    immediate: !animate
  });
  return React.createElement(React.Fragment, null, theme.annotations.outline.outlineWidth > 0 && React.createElement(animated.circle, {
    cx: animatedProps.x,
    cy: animatedProps.y,
    r: animatedProps.radius,
    style: _objectSpread2(_objectSpread2({}, theme.annotations.outline), {}, {
      fill: 'none',
      strokeWidth: theme.annotations.outline.outlineWidth * 2,
      stroke: theme.annotations.outline.outlineColor
    })
  }), React.createElement(animated.circle, {
    cx: animatedProps.x,
    cy: animatedProps.y,
    r: animatedProps.radius,
    style: theme.annotations.symbol
  }));
});
DotAnnotationOutline.displayName = 'DotAnnotationOutline';
DotAnnotationOutline.defaultProps = {
  size: 4
};

var RectAnnotationOutline = memo(function (_ref) {
  var x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height;
  var theme = useTheme();
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var animatedProps = useSpring({
    x: x - width / 2,
    y: y - height / 2,
    width: width,
    height: height,
    config: springConfig,
    immediate: !animate
  });
  return React.createElement(React.Fragment, null, theme.annotations.outline.outlineWidth > 0 && React.createElement(animated.rect, {
    x: animatedProps.x,
    y: animatedProps.y,
    width: animatedProps.width,
    height: animatedProps.height,
    style: _objectSpread2(_objectSpread2({}, theme.annotations.outline), {}, {
      fill: 'none',
      strokeWidth: theme.annotations.outline.strokeWidth + theme.annotations.outline.outlineWidth * 2,
      stroke: theme.annotations.outline.outlineColor
    })
  }), React.createElement(animated.rect, {
    x: animatedProps.x,
    y: animatedProps.y,
    width: animatedProps.width,
    height: animatedProps.height,
    style: theme.annotations.outline
  }));
});
RectAnnotationOutline.displayName = 'RectAnnotationOutline';

var Annotation = memo(function (_ref) {
  var datum = _ref.datum,
      type = _ref.type,
      containerWidth = _ref.containerWidth,
      containerHeight = _ref.containerHeight,
      x = _ref.x,
      y = _ref.y,
      size = _ref.size,
      width = _ref.width,
      height = _ref.height,
      noteX = _ref.noteX,
      noteY = _ref.noteY,
      noteWidth = _ref.noteWidth,
      noteTextOffset = _ref.noteTextOffset,
      note = _ref.note;
  var computed = useComputedAnnotation({
    type: type,
    containerWidth: containerWidth,
    containerHeight: containerHeight,
    x: x,
    y: y,
    size: size,
    width: width,
    height: height,
    noteX: noteX,
    noteY: noteY,
    noteWidth: noteWidth,
    noteTextOffset: noteTextOffset
  });
  return React.createElement(React.Fragment, null, React.createElement(AnnotationLink, {
    points: computed.points,
    isOutline: true
  }), type === 'circle' && React.createElement(CircleAnnotationOutline, {
    x: x,
    y: y,
    size: size
  }), type === 'dot' && React.createElement(DotAnnotationOutline, {
    x: x,
    y: y,
    size: size
  }), type === 'rect' && React.createElement(RectAnnotationOutline, {
    x: x,
    y: y,
    width: width,
    height: height
  }), React.createElement(AnnotationLink, {
    points: computed.points
  }), React.createElement(AnnotationNote, {
    datum: datum,
    x: computed.text[0],
    y: computed.text[1],
    note: note
  }));
});
Annotation.displayName = 'Annotation';
Annotation.defaultProps = {
  noteWidth: defaultProps.noteWidth,
  noteTextOffset: defaultProps.noteTextOffset
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

var drawPoints = function drawPoints(ctx, points) {
  points.forEach(function (_ref, index) {
    var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
};
var renderAnnotationsToCanvas = function renderAnnotationsToCanvas(ctx, _ref3) {
  var annotations = _ref3.annotations,
      theme = _ref3.theme;
  if (annotations.length === 0) return;
  ctx.save();
  annotations.forEach(function (annotation) {
    if (theme.annotations.link.outlineWidth > 0) {
      ctx.lineCap = 'square';
      ctx.strokeStyle = theme.annotations.link.outlineColor;
      ctx.lineWidth = theme.annotations.link.strokeWidth + theme.annotations.link.outlineWidth * 2;
      ctx.beginPath();
      drawPoints(ctx, annotation.computed.points);
      ctx.stroke();
      ctx.lineCap = 'butt';
    }
    if (annotation.type === 'circle' && theme.annotations.outline.outlineWidth > 0) {
      ctx.strokeStyle = theme.annotations.outline.outlineColor;
      ctx.lineWidth = theme.annotations.outline.strokeWidth + theme.annotations.outline.outlineWidth * 2;
      ctx.beginPath();
      ctx.arc(annotation.x, annotation.y, annotation.size / 2, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if (annotation.type === 'dot' && theme.annotations.symbol.outlineWidth > 0) {
      ctx.strokeStyle = theme.annotations.symbol.outlineColor;
      ctx.lineWidth = theme.annotations.symbol.outlineWidth * 2;
      ctx.beginPath();
      ctx.arc(annotation.x, annotation.y, annotation.size / 2, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if (annotation.type === 'rect' && theme.annotations.outline.outlineWidth > 0) {
      ctx.strokeStyle = theme.annotations.outline.outlineColor;
      ctx.lineWidth = theme.annotations.outline.strokeWidth + theme.annotations.outline.outlineWidth * 2;
      ctx.beginPath();
      ctx.rect(annotation.x - annotation.width / 2, annotation.y - annotation.height / 2, annotation.width, annotation.height);
      ctx.stroke();
    }
    ctx.strokeStyle = theme.annotations.link.stroke;
    ctx.lineWidth = theme.annotations.link.strokeWidth;
    ctx.beginPath();
    drawPoints(ctx, annotation.computed.points);
    ctx.stroke();
    if (annotation.type === 'circle') {
      ctx.strokeStyle = theme.annotations.outline.stroke;
      ctx.lineWidth = theme.annotations.outline.strokeWidth;
      ctx.beginPath();
      ctx.arc(annotation.x, annotation.y, annotation.size / 2, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if (annotation.type === 'dot') {
      ctx.fillStyle = theme.annotations.symbol.fill;
      ctx.beginPath();
      ctx.arc(annotation.x, annotation.y, annotation.size / 2, 0, 2 * Math.PI);
      ctx.fill();
    }
    if (annotation.type === 'rect') {
      ctx.strokeStyle = theme.annotations.outline.stroke;
      ctx.lineWidth = theme.annotations.outline.strokeWidth;
      ctx.beginPath();
      ctx.rect(annotation.x - annotation.width / 2, annotation.y - annotation.height / 2, annotation.width, annotation.height);
      ctx.stroke();
    }
    if (typeof annotation.note === 'function') {
      annotation.note(ctx, {
        datum: annotation.datum,
        x: annotation.computed.text[0],
        y: annotation.computed.text[1],
        theme: theme
      });
    } else {
      ctx.font = "".concat(theme.annotations.text.fontSize, "px ").concat(theme.annotations.text.fontFamily);
      ctx.fillStyle = theme.annotations.text.fill;
      ctx.strokeStyle = theme.annotations.text.outlineColor;
      ctx.lineWidth = theme.annotations.text.outlineWidth * 2;
      if (theme.annotations.text.outlineWidth > 0) {
        ctx.lineJoin = 'round';
        ctx.strokeText(annotation.note, annotation.computed.text[0], annotation.computed.text[1]);
        ctx.lineJoin = 'miter';
      }
      ctx.fillText(annotation.note, annotation.computed.text[0], annotation.computed.text[1]);
    }
  });
  ctx.restore();
};

export { Annotation, annotationSpecPropType, bindAnnotations, computeAnnotation, defaultProps, getLinkAngle, renderAnnotationsToCanvas, useAnnotations, useComputedAnnotation, useComputedAnnotations };
//# sourceMappingURL=nivo-annotations.es.js.map
