(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prop-types'), require('@nivo/legends'), require('recompose/compose'), require('recompose/defaultProps'), require('recompose/withState'), require('recompose/withPropsOnChange'), require('recompose/pure'), require('d3-shape'), require('d3-chord'), require('@nivo/core'), require('react'), require('lodash/isFunction'), require('lodash/mapValues'), require('react-motion'), require('d3-format'), require('recompose/setDisplayName'), require('lodash/partial')) :
    typeof define === 'function' && define.amd ? define(['exports', 'prop-types', '@nivo/legends', 'recompose/compose', 'recompose/defaultProps', 'recompose/withState', 'recompose/withPropsOnChange', 'recompose/pure', 'd3-shape', 'd3-chord', '@nivo/core', 'react', 'lodash/isFunction', 'lodash/mapValues', 'react-motion', 'd3-format', 'recompose/setDisplayName', 'lodash/partial'], factory) :
    (factory((global.nivo = global.nivo || {}),global.PropTypes,global.nivo,global.RecomposeCompose,global.RecomposeDefaultProps,global.RecomposeWithState,global.RecomposeWithPropsOnChange,global.RecomposePure,global.d3,global.d3,global.nivo,global.React,global['lodash/isFunction'],global['lodash/mapValues'],global.ReactMotion,global.d3,global.RecomposeSetDisplayName,global['lodash/partial']));
}(this, (function (exports,PropTypes,legends,compose,defaultProps,withState,withPropsOnChange,pure,d3Shape,d3Chord,core,React,isFunction,mapValues,reactMotion,d3Format,setDisplayName,partial) { 'use strict';

    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
    compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
    defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
    withState = withState && withState.hasOwnProperty('default') ? withState['default'] : withState;
    withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
    pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
    var React__default = 'default' in React ? React['default'] : React;
    isFunction = isFunction && isFunction.hasOwnProperty('default') ? isFunction['default'] : isFunction;
    mapValues = mapValues && mapValues.hasOwnProperty('default') ? mapValues['default'] : mapValues;
    setDisplayName = setDisplayName && setDisplayName.hasOwnProperty('default') ? setDisplayName['default'] : setDisplayName;
    partial = partial && partial.hasOwnProperty('default') ? partial['default'] : partial;

    var ChordPropTypes = {
        matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
        keys: PropTypes.arrayOf(PropTypes.string).isRequired,

        padAngle: PropTypes.number.isRequired,
        innerRadiusRatio: PropTypes.number.isRequired,
        innerRadiusOffset: PropTypes.number.isRequired,

        // arcs
        arcOpacity: PropTypes.number.isRequired,
        arcBorderWidth: PropTypes.number.isRequired,
        arcBorderColor: PropTypes.any.isRequired,
        getArcBorderColor: PropTypes.func.isRequired,

        // ribbons
        ribbonOpacity: PropTypes.number.isRequired,
        ribbonBorderWidth: PropTypes.number.isRequired,
        ribbonBorderColor: PropTypes.any.isRequired,
        getRibbonBorderColor: PropTypes.func.isRequired,

        // labels
        enableLabel: PropTypes.bool.isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        getLabel: PropTypes.func.isRequired, // computed
        labelOffset: PropTypes.number.isRequired,
        labelRotation: PropTypes.number.isRequired,
        labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        getLabelTextColor: PropTypes.func.isRequired, // computed

        // colors
        colors: PropTypes.any.isRequired,

        // interactivity
        isInteractive: PropTypes.bool.isRequired,
        arcHoverOpacity: PropTypes.number.isRequired,
        arcHoverOthersOpacity: PropTypes.number.isRequired,
        ribbonHoverOpacity: PropTypes.number.isRequired,
        ribbonHoverOthersOpacity: PropTypes.number.isRequired,
        tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

        // canvas specific
        pixelRatio: PropTypes.number.isRequired,

        legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired
    };

    var ChordDefaultProps = {
        padAngle: 0,
        innerRadiusRatio: 0.9,
        innerRadiusOffset: 0,

        // arcs
        arcOpacity: 1,
        arcBorderWidth: 1,
        arcBorderColor: 'inherit:darker(0.4)',

        // ribbons
        ribbonOpacity: 0.5,
        ribbonBorderWidth: 1,
        ribbonBorderColor: 'inherit:darker(0.4)',

        // labels
        enableLabel: true,
        label: 'id',
        labelOffset: 12,
        labelRotation: 0,
        labelTextColor: 'inherit:darker(1)',

        // colors
        colors: 'nivo',

        // interactivity
        isInteractive: true,
        arcHoverOpacity: 1,
        arcHoverOthersOpacity: 0.15,
        ribbonHoverOpacity: 0.85,
        ribbonHoverOthersOpacity: 0.15,

        // canvas specific
        pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,

        legends: []
    };

    var enhance = (function (Component) {
        return compose(defaultProps(ChordDefaultProps), withState('currentArc', 'setCurrentArc', null), withState('currentRibbon', 'setCurrentRibbon', null), core.withMotion(), core.withTheme(), core.withDimensions(), withPropsOnChange(['label'], function (_ref) {
            var label = _ref.label;
            return {
                getLabel: core.getLabelGenerator(label)
            };
        }), withPropsOnChange(['padAngle'], function (_ref2) {
            var padAngle = _ref2.padAngle;
            return {
                chord: d3Chord.chord().padAngle(padAngle)
            };
        }), withPropsOnChange(['labelTextColor'], function (_ref3) {
            var labelTextColor = _ref3.labelTextColor;
            return {
                getLabelTextColor: core.getInheritedColorGenerator(labelTextColor, 'labels.textColor')
            };
        }), withPropsOnChange(['colors', 'keys'], function (_ref4) {
            var colors = _ref4.colors,
                keys = _ref4.keys;

            var color = core.getColorRange(colors);

            return {
                colorById: keys.reduce(function (acc, key) {
                    acc[key] = color(key);
                    return acc;
                }, {})
            };
        }), withPropsOnChange(['width', 'height', 'innerRadiusRatio', 'innerRadiusOffset'], function (_ref5) {
            var width = _ref5.width,
                height = _ref5.height,
                innerRadiusRatio = _ref5.innerRadiusRatio,
                innerRadiusOffset = _ref5.innerRadiusOffset;

            var radius = Math.min(width, height) / 2;
            var innerRadius = radius * innerRadiusRatio;
            var ribbonRadius = radius * (innerRadiusRatio - innerRadiusOffset);

            var arcGenerator = d3Shape.arc().outerRadius(radius).innerRadius(innerRadius);
            var ribbonGenerator = d3Chord.ribbon().radius(ribbonRadius);

            return { radius: radius, innerRadius: innerRadius, arcGenerator: arcGenerator, ribbonGenerator: ribbonGenerator };
        }), withPropsOnChange(['arcOpacity', 'ribbonOpacity'], function (_ref6) {
            var arcOpacity = _ref6.arcOpacity,
                ribbonOpacity = _ref6.ribbonOpacity;
            return {
                getArcOpacity: function getArcOpacity() {
                    return arcOpacity;
                },
                getRibbonOpacity: function getRibbonOpacity() {
                    return ribbonOpacity;
                }
            };
        }), withPropsOnChange(['isInteractive', 'currentArc', 'arcHoverOpacity', 'arcHoverOthersOpacity', 'currentRibbon', 'ribbonHoverOpacity', 'ribbonHoverOthersOpacity'], function (_ref7) {
            var isInteractive = _ref7.isInteractive,
                currentArc = _ref7.currentArc,
                arcHoverOpacity = _ref7.arcHoverOpacity,
                arcHoverOthersOpacity = _ref7.arcHoverOthersOpacity,
                currentRibbon = _ref7.currentRibbon,
                ribbonHoverOpacity = _ref7.ribbonHoverOpacity,
                ribbonHoverOthersOpacity = _ref7.ribbonHoverOthersOpacity;

            if (!isInteractive || !currentArc && !currentRibbon) return null;

            var getArcOpacity = void 0;
            var getRibbonOpacity = void 0;
            if (isInteractive) {
                if (currentArc) {
                    getArcOpacity = function getArcOpacity(arc) {
                        if (arc.id === currentArc.id) return arcHoverOpacity;
                        return arcHoverOthersOpacity;
                    };
                    getRibbonOpacity = function getRibbonOpacity(ribbon) {
                        if (ribbon.source.id === currentArc.id || ribbon.target.id === currentArc.id) return ribbonHoverOpacity;
                        return ribbonHoverOthersOpacity;
                    };
                } else if (currentRibbon) {
                    getArcOpacity = function getArcOpacity(arc) {
                        if (arc.id === currentRibbon.source.id || arc.id === currentRibbon.target.id) return arcHoverOpacity;
                        return arcHoverOthersOpacity;
                    };
                    getRibbonOpacity = function getRibbonOpacity(ribbon) {
                        if (ribbon.source.id === currentRibbon.source.id && ribbon.target.id === currentRibbon.target.id) return ribbonHoverOpacity;
                        return ribbonHoverOthersOpacity;
                    };
                }
            }

            return { getArcOpacity: getArcOpacity, getRibbonOpacity: getRibbonOpacity };
        }), withPropsOnChange(['chord', 'colorById', 'matrix', 'keys'], function (_ref8) {
            var chord = _ref8.chord,
                colorById = _ref8.colorById,
                matrix = _ref8.matrix,
                keys = _ref8.keys;

            var ribbons = chord(matrix);
            ribbons.forEach(function (ribbon) {
                ribbon.source.id = keys[ribbon.source.index];
                ribbon.source.color = colorById[ribbon.source.id];
                ribbon.target.id = keys[ribbon.target.index];
                ribbon.target.color = colorById[ribbon.target.id];
                var ribbonKeys = [ribbon.source.id, ribbon.target.id];
                ribbonKeys.sort();
                ribbon.key = ribbonKeys.sort().join('.');
            });

            var arcs = ribbons.groups.map(function (arc) {
                arc.key = arc.id = keys[arc.index];
                arc.color = colorById[arc.id];
                return arc;
            });

            return { ribbons: ribbons, arcs: arcs };
        }), withPropsOnChange(['arcBorderColor'], function (_ref9) {
            var arcBorderColor = _ref9.arcBorderColor;
            return {
                getArcBorderColor: core.getInheritedColorGenerator(arcBorderColor)
            };
        }), withPropsOnChange(['ribbonBorderColor'], function (_ref10) {
            var ribbonBorderColor = _ref10.ribbonBorderColor;
            return {
                getRibbonBorderColor: core.getInheritedColorGenerator(ribbonBorderColor)
            };
        }), pure)(Component);
    });

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
     * Used to get ribbon angles, instead of using source and target arcs,
     * we sort arcs by value to have smooth transitions, otherwise,
     * if source|target arc value becomes greater than the other,
     * the ribbon will be reversed.
     *
     * @param {Object}  source
     * @param {Object}  target
     * @param {boolean} useMiddleAngle
     * @param {Object}  [springConfig]
     * @return {Object}
     */
    var getRibbonAngles = function getRibbonAngles(_ref, useMiddleAngle, springConfig) {
        var source = _ref.source,
            target = _ref.target;

        var firstArc = void 0;
        var secondArc = void 0;
        if (source.startAngle < target.startAngle) {
            firstArc = source;
            secondArc = target;
        } else {
            firstArc = target;
            secondArc = source;
        }

        var angles = void 0;
        if (useMiddleAngle === true) {
            var firstMiddleAngle = core.midAngle(firstArc);
            var secondMiddleAngle = core.midAngle(secondArc);

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
            return reactMotion.spring(angle, springConfig);
        });
    };

    var ribbonWillEnter = function ribbonWillEnter(_ref2) {
        var ribbon = _ref2.data;
        return _extends({}, getRibbonAngles(ribbon, true), {
            opacity: 0
        }, core.colorMotionSpring(ribbon.source.color));
    };

    var ribbonWillLeave = function ribbonWillLeave(springConfig) {
        return function (_ref3) {
            var ribbon = _ref3.data;
            return _extends({}, getRibbonAngles(ribbon, true, springConfig), {
                opacity: 0
            }, core.colorMotionSpring(ribbon.source.color, springConfig));
        };
    };

    var ChordRibbons = function ChordRibbons(_ref4) {
        var ribbons = _ref4.ribbons,
            shapeGenerator = _ref4.shapeGenerator,
            borderWidth = _ref4.borderWidth,
            getBorderColor = _ref4.getBorderColor,
            getOpacity = _ref4.getOpacity,
            theme = _ref4.theme,
            tooltipFormat = _ref4.tooltipFormat,
            setCurrent = _ref4.setCurrent,
            showTooltip = _ref4.showTooltip,
            hideTooltip = _ref4.hideTooltip,
            animate = _ref4.animate,
            motionDamping = _ref4.motionDamping,
            motionStiffness = _ref4.motionStiffness;

        var commonProps = function commonProps(ribbon) {
            var ribbonTooltip = React__default.createElement(core.TableTooltip, {
                theme: theme,
                rows: [[React__default.createElement(core.Chip, { key: 'chip', color: ribbon.source.color }), React__default.createElement(
                    'strong',
                    { key: 'id' },
                    ribbon.source.id
                ), tooltipFormat ? tooltipFormat(ribbon.source.value) : ribbon.source.value], [React__default.createElement(core.Chip, { key: 'chip', color: ribbon.target.color }), React__default.createElement(
                    'strong',
                    { key: 'id' },
                    ribbon.target.id
                ), tooltipFormat ? tooltipFormat(ribbon.target.value) : ribbon.target.value]]
            });

            return {
                strokeWidth: borderWidth,
                onMouseEnter: function onMouseEnter(e) {
                    setCurrent(ribbon);
                    showTooltip(ribbonTooltip, e);
                },
                onMouseMove: function onMouseMove(e) {
                    showTooltip(ribbonTooltip, e);
                },
                onMouseLeave: function onMouseLeave() {
                    setCurrent(null);
                    hideTooltip();
                }
            };
        };

        if (animate !== true) {
            return React__default.createElement(
                'g',
                null,
                ribbons.map(function (ribbon) {
                    var opacity = getOpacity(ribbon);

                    return React__default.createElement('path', _extends({
                        key: ribbon.key,
                        d: shapeGenerator(ribbon),
                        fill: ribbon.source.color,
                        fillOpacity: opacity,
                        stroke: getBorderColor(_extends({}, ribbon, { color: ribbon.source.color })),
                        strokeOpacity: opacity
                    }, commonProps(ribbon)));
                })
            );
        }

        var springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness,
            precision: 0.001
        };

        return React__default.createElement(
            reactMotion.TransitionMotion,
            {
                willEnter: ribbonWillEnter,
                willLeave: ribbonWillLeave(springConfig),
                styles: ribbons.map(function (ribbon) {
                    return {
                        key: ribbon.key,
                        data: ribbon,
                        style: _extends({}, getRibbonAngles(ribbon, false, springConfig), {
                            opacity: reactMotion.spring(getOpacity(ribbon), springConfig)
                        }, core.colorMotionSpring(ribbon.source.color, springConfig))
                    };
                })
            },
            function (interpolatedStyles) {
                return React__default.createElement(
                    'g',
                    null,
                    interpolatedStyles.map(function (_ref5) {
                        var key = _ref5.key,
                            style = _ref5.style,
                            ribbon = _ref5.data;

                        var color = core.getInterpolatedColor(style);

                        return React__default.createElement('path', _extends({
                            key: key,
                            d: shapeGenerator({
                                source: {
                                    startAngle: style.sourceStartAngle,
                                    endAngle: Math.max(style.sourceEndAngle, style.sourceStartAngle)
                                },
                                target: {
                                    startAngle: style.targetStartAngle,
                                    endAngle: Math.max(style.targetEndAngle, style.targetStartAngle)
                                }
                            }),
                            fill: color,
                            fillOpacity: style.opacity,
                            stroke: getBorderColor(_extends({}, ribbon, { color: color })),
                            strokeOpacity: style.opacity
                        }, commonProps(ribbon)));
                    })
                );
            }
        );
    };

    ChordRibbons.propTypes = _extends({
        ribbons: PropTypes.array.isRequired,
        shapeGenerator: PropTypes.func.isRequired,
        borderWidth: PropTypes.number.isRequired,
        getBorderColor: PropTypes.func.isRequired,
        getOpacity: PropTypes.func.isRequired,
        setCurrent: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired,
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
        tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    }, core.motionPropTypes);

    var enhance$1 = compose(withPropsOnChange(['tooltipFormat'], function (_ref6) {
        var tooltipFormat = _ref6.tooltipFormat;

        if (!tooltipFormat || isFunction(tooltipFormat)) return { tooltipFormat: tooltipFormat };
        return { tooltipFormat: d3Format.format(tooltipFormat) };
    }), pure);

    var ChordRibbons$1 = enhance$1(ChordRibbons);

    var ChordArcTooltip = function ChordArcTooltip(_ref) {
        var arc = _ref.arc,
            theme = _ref.theme,
            format = _ref.format;
        return React__default.createElement(core.BasicTooltip, {
            id: arc.id,
            value: arc.value,
            color: arc.color,
            enableChip: true,
            theme: theme,
            format: format
        });
    };

    ChordArcTooltip.propTypes = {
        arc: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        format: PropTypes.func
    };

    var ChordArcTooltip$1 = pure(ChordArcTooltip);

    var ChordArcs = function ChordArcs(_ref) {
        var arcs = _ref.arcs,
            borderWidth = _ref.borderWidth,
            getBorderColor = _ref.getBorderColor,
            getOpacity = _ref.getOpacity,
            shapeGenerator = _ref.shapeGenerator,
            theme = _ref.theme,
            tooltipFormat = _ref.tooltipFormat,
            setCurrent = _ref.setCurrent,
            showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip,
            animate = _ref.animate,
            motionDamping = _ref.motionDamping,
            motionStiffness = _ref.motionStiffness;

        var commonProps = function commonProps(arc) {
            var arcTooltip = React__default.createElement(ChordArcTooltip$1, { arc: arc, theme: theme, format: tooltipFormat });

            return {
                strokeWidth: borderWidth,
                onMouseEnter: function onMouseEnter(e) {
                    setCurrent(arc);
                    showTooltip(arcTooltip, e);
                },
                onMouseMove: function onMouseMove(e) {
                    showTooltip(arcTooltip, e);
                },
                onMouseLeave: function onMouseLeave() {
                    setCurrent(null);
                    hideTooltip();
                }
            };
        };

        if (animate !== true) {
            return React__default.createElement(
                'g',
                null,
                arcs.map(function (arc) {
                    var opacity = getOpacity(arc);

                    return React__default.createElement('path', _extends({
                        key: arc.key,
                        d: shapeGenerator(arc),
                        fill: arc.color,
                        fillOpacity: opacity,
                        stroke: getBorderColor(arc),
                        strokeOpacity: opacity
                    }, commonProps(arc)));
                })
            );
        }

        var springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness,
            precision: 0.001
        };

        return React__default.createElement(
            reactMotion.TransitionMotion,
            {
                styles: arcs.map(function (arc) {
                    return {
                        key: arc.key,
                        data: arc,
                        style: _extends({
                            startAngle: reactMotion.spring(arc.startAngle, springConfig),
                            endAngle: reactMotion.spring(arc.endAngle, springConfig),
                            opacity: reactMotion.spring(getOpacity(arc), springConfig)
                        }, core.colorMotionSpring(arc.color, springConfig))
                    };
                })
            },
            function (interpolatedStyles) {
                return React__default.createElement(
                    'g',
                    null,
                    interpolatedStyles.map(function (_ref2) {
                        var key = _ref2.key,
                            style = _ref2.style,
                            arc = _ref2.data;

                        var color = core.getInterpolatedColor(style);

                        return React__default.createElement('path', _extends({
                            key: key,
                            d: shapeGenerator({
                                startAngle: style.startAngle,
                                endAngle: style.endAngle
                            }),
                            fill: color,
                            fillOpacity: style.opacity,
                            stroke: getBorderColor(_extends({}, arc, { color: color })),
                            strokeOpacity: style.opacity
                        }, commonProps(arc)));
                    })
                );
            }
        );
    };

    ChordArcs.propTypes = _extends({
        arcs: PropTypes.array.isRequired,
        shapeGenerator: PropTypes.func.isRequired,
        borderWidth: PropTypes.number.isRequired,
        getBorderColor: PropTypes.func.isRequired,
        getOpacity: PropTypes.func.isRequired,
        setCurrent: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired,
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
        tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    }, core.motionPropTypes);

    var ChordArcs$1 = pure(ChordArcs);

    var ChordLabels = function ChordLabels(_ref) {
        var arcs = _ref.arcs,
            radius = _ref.radius,
            rotation = _ref.rotation,
            getLabel = _ref.getLabel,
            getColor = _ref.getColor,
            theme = _ref.theme,
            animate = _ref.animate,
            motionDamping = _ref.motionDamping,
            motionStiffness = _ref.motionStiffness;

        if (animate !== true) {
            return React__default.createElement(
                'g',
                null,
                arcs.map(function (arc) {
                    var color = getColor(arc, theme);
                    var angle = core.midAngle(arc);
                    var textProps = core.getPolarLabelProps(radius, angle, rotation);

                    return React__default.createElement(
                        'text',
                        {
                            key: arc.key,
                            transform: 'translate(' + textProps.x + ', ' + textProps.y + ') rotate(' + textProps.rotate + ')',
                            style: _extends({}, theme.labels.text, {
                                pointerEvents: 'none',
                                fill: color
                            }),
                            textAnchor: textProps.align,
                            alignmentBaseline: textProps.baseline
                        },
                        getLabel(arc)
                    );
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
                styles: arcs.map(function (arc) {
                    var angle = core.midAngle(arc);

                    return {
                        key: arc.key,
                        data: arc,
                        style: {
                            angle: reactMotion.spring(angle, springConfig)
                        }
                    };
                })
            },
            function (interpolatedStyles) {
                return React__default.createElement(
                    'g',
                    null,
                    interpolatedStyles.map(function (_ref2) {
                        var key = _ref2.key,
                            style = _ref2.style,
                            arc = _ref2.data;

                        var color = getColor(arc, theme);
                        var textProps = core.getPolarLabelProps(radius, style.angle, rotation);

                        return React__default.createElement(
                            'text',
                            {
                                key: key,
                                transform: 'translate(' + textProps.x + ', ' + textProps.y + ') rotate(' + textProps.rotate + ')',
                                style: _extends({}, theme.labels.text, {
                                    pointerEvents: 'none',
                                    fill: color
                                }),
                                textAnchor: textProps.align,
                                alignmentBaseline: textProps.baseline
                            },
                            getLabel(arc)
                        );
                    })
                );
            }
        );
    };

    ChordLabels.propTypes = _extends({
        arcs: PropTypes.array.isRequired,
        radius: PropTypes.number.isRequired,
        rotation: PropTypes.number.isRequired,
        getLabel: PropTypes.func.isRequired,
        getColor: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired
    }, core.motionPropTypes);

    var Chord = function Chord(_ref) {
        var margin = _ref.margin,
            width = _ref.width,
            height = _ref.height,
            outerWidth = _ref.outerWidth,
            outerHeight = _ref.outerHeight,
            arcBorderWidth = _ref.arcBorderWidth,
            getArcBorderColor = _ref.getArcBorderColor,
            ribbonBorderWidth = _ref.ribbonBorderWidth,
            getRibbonBorderColor = _ref.getRibbonBorderColor,
            enableLabel = _ref.enableLabel,
            getLabel = _ref.getLabel,
            labelOffset = _ref.labelOffset,
            labelRotation = _ref.labelRotation,
            getLabelTextColor = _ref.getLabelTextColor,
            arcGenerator = _ref.arcGenerator,
            ribbonGenerator = _ref.ribbonGenerator,
            theme = _ref.theme,
            isInteractive = _ref.isInteractive,
            tooltipFormat = _ref.tooltipFormat,
            animate = _ref.animate,
            motionDamping = _ref.motionDamping,
            motionStiffness = _ref.motionStiffness,
            ribbons = _ref.ribbons,
            arcs = _ref.arcs,
            radius = _ref.radius,
            setCurrentArc = _ref.setCurrentArc,
            setCurrentRibbon = _ref.setCurrentRibbon,
            getArcOpacity = _ref.getArcOpacity,
            getRibbonOpacity = _ref.getRibbonOpacity,
            legends$$1 = _ref.legends;

        var centerX = width / 2;
        var centerY = height / 2;

        var motionProps = {
            animate: animate,
            motionDamping: motionDamping,
            motionStiffness: motionStiffness
        };

        var legendData = arcs.map(function (arc) {
            return {
                id: arc.id,
                label: arc.id,
                color: arc.color
            };
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
                        theme: theme
                    },
                    React__default.createElement(
                        'g',
                        { transform: 'translate(' + centerX + ', ' + centerY + ')' },
                        React__default.createElement(ChordRibbons$1, _extends({
                            ribbons: ribbons,
                            shapeGenerator: ribbonGenerator,
                            borderWidth: ribbonBorderWidth,
                            getBorderColor: getRibbonBorderColor,
                            getOpacity: getRibbonOpacity,
                            setCurrent: setCurrentRibbon,
                            theme: theme,
                            tooltipFormat: tooltipFormat,
                            showTooltip: showTooltip,
                            hideTooltip: hideTooltip
                        }, motionProps)),
                        React__default.createElement(ChordArcs$1, _extends({
                            arcs: arcs,
                            shapeGenerator: arcGenerator,
                            borderWidth: arcBorderWidth,
                            getBorderColor: getArcBorderColor,
                            getOpacity: getArcOpacity,
                            setCurrent: setCurrentArc,
                            theme: theme,
                            tooltipFormat: tooltipFormat,
                            showTooltip: showTooltip,
                            hideTooltip: hideTooltip
                        }, motionProps)),
                        enableLabel && React__default.createElement(ChordLabels, _extends({
                            arcs: arcs,
                            radius: radius + labelOffset,
                            rotation: labelRotation,
                            getLabel: getLabel,
                            getColor: getLabelTextColor,
                            theme: theme
                        }, motionProps))
                    ),
                    legends$$1.map(function (legend, i) {
                        return React__default.createElement(legends.BoxLegendSvg, _extends({
                            key: i
                        }, legend, {
                            containerWidth: width,
                            containerHeight: height,
                            data: legendData,
                            theme: theme
                        }));
                    })
                );
            }
        );
    };

    Chord.propTypes = ChordPropTypes;

    var Chord$1 = setDisplayName('Chord')(enhance(Chord));

    var ChordCanvas = function (_Component) {
        inherits(ChordCanvas, _Component);

        function ChordCanvas() {
            var _temp, _this, _ret;

            classCallCheck(this, ChordCanvas);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleMouseHover = function (showTooltip, hideTooltip, event) {
                if (_this.props.isInteractive !== true) return;

                var _getRelativeCursor = core.getRelativeCursor(_this.surface, event),
                    x = _getRelativeCursor[0],
                    y = _getRelativeCursor[1];

                var _this$props = _this.props,
                    width = _this$props.width,
                    height = _this$props.height,
                    margin = _this$props.margin,
                    radius = _this$props.radius,
                    innerRadius = _this$props.innerRadius,
                    arcs = _this$props.arcs,
                    setCurrentArc = _this$props.setCurrentArc,
                    theme = _this$props.theme;


                var centerX = width / 2 + margin.left;
                var centerY = height / 2 + margin.top;

                var arc = core.getHoveredArc(centerX, centerY, radius, innerRadius, arcs, x, y);
                if (arc) {
                    setCurrentArc(arc);
                    showTooltip(React__default.createElement(ChordArcTooltip$1, { arc: arc, theme: theme }), event);
                } else {
                    setCurrentArc(null);
                    hideTooltip();
                }
            }, _this.handleMouseLeave = function (hideTooltip) {
                if (_this.props.isInteractive !== true) return;

                _this.props.setCurrentArc(null);
                hideTooltip();
            }, _temp), possibleConstructorReturn(_this, _ret);
        }

        ChordCanvas.prototype.componentDidMount = function componentDidMount() {
            this.ctx = this.surface.getContext('2d');
            this.draw(this.props);
        };

        ChordCanvas.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
            if (this.props.outerWidth !== props.outerWidth || this.props.outerHeight !== props.outerHeight || this.props.isInteractive !== props.isInteractive || this.props.theme !== props.theme) {
                return true;
            } else {
                this.draw(props);
                return false;
            }
        };

        ChordCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
            this.ctx = this.surface.getContext('2d');
            this.draw(this.props);
        };

        ChordCanvas.prototype.draw = function draw(props) {
            var _this2 = this;

            var pixelRatio = props.pixelRatio,
                width = props.width,
                height = props.height,
                margin = props.margin,
                outerWidth = props.outerWidth,
                outerHeight = props.outerHeight,
                enableLabel = props.enableLabel,
                getLabel = props.getLabel,
                labelOffset = props.labelOffset,
                labelRotation = props.labelRotation,
                getLabelTextColor = props.getLabelTextColor,
                arcGenerator = props.arcGenerator,
                ribbonGenerator = props.ribbonGenerator,
                theme = props.theme,
                ribbons = props.ribbons,
                arcs = props.arcs,
                radius = props.radius,
                getArcOpacity = props.getArcOpacity,
                getRibbonOpacity = props.getRibbonOpacity;


            this.surface.width = outerWidth * pixelRatio;
            this.surface.height = outerHeight * pixelRatio;

            this.ctx.scale(pixelRatio, pixelRatio);

            var centerX = width / 2 + margin.left;
            var centerY = height / 2 + margin.top;

            this.ctx.fillStyle = theme.background;
            this.ctx.fillRect(0, 0, outerWidth, outerHeight);
            this.ctx.translate(centerX, centerY);

            this.ctx.font = theme.labels.text.fontSize + 'px sans-serif';

            ribbonGenerator.context(this.ctx);
            ribbons.forEach(function (ribbon) {
                _this2.ctx.save();
                _this2.ctx.globalAlpha = getRibbonOpacity(ribbon);

                _this2.ctx.beginPath();
                ribbonGenerator(ribbon);
                _this2.ctx.fillStyle = ribbon.source.color;
                _this2.ctx.fill();

                _this2.ctx.restore();
            });

            arcGenerator.context(this.ctx);
            arcs.forEach(function (arc) {
                _this2.ctx.save();
                _this2.ctx.globalAlpha = getArcOpacity(arc);

                _this2.ctx.beginPath();
                arcGenerator(arc);
                _this2.ctx.fillStyle = arc.color;
                _this2.ctx.fill();

                _this2.ctx.restore();

                if (enableLabel) {
                    var labelTextColor = getLabelTextColor(arc, theme);
                    var angle = core.midAngle(arc);
                    var _props = core.getPolarLabelProps(radius + labelOffset, angle, labelRotation);

                    _this2.ctx.save();
                    _this2.ctx.translate(_props.x, _props.y);
                    _this2.ctx.rotate(core.degreesToRadians(_props.rotate));

                    _this2.ctx.textAlign = _props.align;
                    _this2.ctx.textBaseline = _props.baseline;
                    _this2.ctx.fillStyle = labelTextColor;
                    _this2.ctx.fillText(getLabel(arc), 0, 0);

                    _this2.ctx.restore();
                }
            });
        };

        ChordCanvas.prototype.render = function render() {
            var _this3 = this;

            var _props2 = this.props,
                outerWidth = _props2.outerWidth,
                outerHeight = _props2.outerHeight,
                pixelRatio = _props2.pixelRatio,
                isInteractive = _props2.isInteractive,
                theme = _props2.theme;


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
                        onMouseEnter: partial(_this3.handleMouseHover, showTooltip, hideTooltip),
                        onMouseMove: partial(_this3.handleMouseHover, showTooltip, hideTooltip),
                        onMouseLeave: partial(_this3.handleMouseLeave, hideTooltip)
                    });
                }
            );
        };

        return ChordCanvas;
    }(React.Component);

    ChordCanvas.propTypes = ChordPropTypes;

    var ChordCanvas$1 = enhance(ChordCanvas);

    var ResponsiveChord = function ResponsiveChord(props) {
        return React__default.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React__default.createElement(Chord$1, _extends({ width: width, height: height }, props));
            }
        );
    };

    var ResponsiveChordCanvas = function ResponsiveChordCanvas(props) {
        return React__default.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React__default.createElement(ChordCanvas$1, _extends({ width: width, height: height }, props));
            }
        );
    };

    exports.Chord = Chord$1;
    exports.ChordCanvas = ChordCanvas$1;
    exports.ResponsiveChord = ResponsiveChord;
    exports.ResponsiveChordCanvas = ResponsiveChordCanvas;
    exports.ChordPropTypes = ChordPropTypes;
    exports.ChordDefaultProps = ChordDefaultProps;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
