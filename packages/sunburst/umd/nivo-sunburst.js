(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('recompose/compose'), require('recompose/withPropsOnChange'), require('recompose/pure'), require('@nivo/core'), require('lodash/sortBy'), require('lodash/cloneDeep'), require('recompose/defaultProps'), require('recompose/withProps'), require('d3-hierarchy'), require('d3-shape')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'recompose/compose', 'recompose/withPropsOnChange', 'recompose/pure', '@nivo/core', 'lodash/sortBy', 'lodash/cloneDeep', 'recompose/defaultProps', 'recompose/withProps', 'd3-hierarchy', 'd3-shape'], factory) :
    (factory((global.nivo = global.nivo || {}),global.React,global.PropTypes,global.RecomposeCompose,global.RecomposeWithPropsOnChange,global.RecomposePure,global.nivo,global['lodash/sortBy'],global['lodash/cloneDeep'],global.RecomposeDefaultProps,global.RecomposeWithProps,global.d3,global.d3));
}(this, (function (exports,React,PropTypes,compose,withPropsOnChange,pure,core,sortBy,cloneDeep,defaultProps,withProps,d3Hierarchy,d3Shape) { 'use strict';

    React = React && React.hasOwnProperty('default') ? React['default'] : React;
    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
    compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
    withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
    pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
    sortBy = sortBy && sortBy.hasOwnProperty('default') ? sortBy['default'] : sortBy;
    cloneDeep = cloneDeep && cloneDeep.hasOwnProperty('default') ? cloneDeep['default'] : cloneDeep;
    defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
    withProps = withProps && withProps.hasOwnProperty('default') ? withProps['default'] : withProps;

    var SunburstArc = function SunburstArc(_ref) {
        var node = _ref.node,
            path = _ref.path,
            borderWidth = _ref.borderWidth,
            borderColor = _ref.borderColor,
            showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip;
        return React.createElement('path', {
            d: path,
            fill: node.data.color,
            stroke: borderColor,
            strokeWidth: borderWidth,
            onMouseEnter: showTooltip,
            onMouseMove: showTooltip,
            onMouseLeave: hideTooltip
        });
    };

    SunburstArc.propTypes = {
        node: PropTypes.shape({}).isRequired,
        arcGenerator: PropTypes.func.isRequired,
        path: PropTypes.string.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired
    };

    var enhance = compose(withPropsOnChange(['node', 'arcGenerator'], function (_ref2) {
        var node = _ref2.node,
            arcGenerator = _ref2.arcGenerator;
        return {
            path: arcGenerator(node)
        };
    }), withPropsOnChange(['node', 'showTooltip', 'theme'], function (_ref3) {
        var node = _ref3.node,
            _showTooltip = _ref3.showTooltip,
            theme = _ref3.theme;
        return {
            showTooltip: function showTooltip(e) {
                _showTooltip(React.createElement(core.BasicTooltip, {
                    id: node.data.id,
                    enableChip: true,
                    color: node.data.color,
                    value: node.data.percentage.toFixed(2) + '%',
                    theme: theme
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
            theme = _ref.theme,
            isInteractive = _ref.isInteractive;

        return React.createElement(
            core.Container,
            { isInteractive: isInteractive, theme: theme },
            function (_ref2) {
                var showTooltip = _ref2.showTooltip,
                    hideTooltip = _ref2.hideTooltip;
                return React.createElement(
                    core.SvgWrapper,
                    { width: outerWidth, height: outerHeight, margin: margin, theme: theme },
                    React.createElement(
                        'g',
                        { transform: 'translate(' + centerX + ', ' + centerY + ')' },
                        nodes.filter(function (node) {
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
                                theme: theme
                            });
                        })
                    )
                );
            }
        );
    };

    Sunburst.propTypes = {
        data: PropTypes.object.isRequired,
        identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        getIdentity: PropTypes.func.isRequired, // computed
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        getValue: PropTypes.func.isRequired, // computed
        nodes: PropTypes.array.isRequired, // computed

        partition: PropTypes.func.isRequired, // computed

        cornerRadius: PropTypes.number.isRequired,
        arcGenerator: PropTypes.func.isRequired, // computed

        radius: PropTypes.number.isRequired, // computed
        centerX: PropTypes.number.isRequired, // computed
        centerY: PropTypes.number.isRequired, // computed

        // border
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,

        childColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

        // interactivity
        isInteractive: PropTypes.bool
    };

    var SunburstDefaultProps = {
        identity: 'id',
        value: 'value',

        cornerRadius: 0,

        // border
        borderWidth: 1,
        borderColor: 'white',

        childColor: 'inherit',

        // interactivity
        isInteractive: true
    };

    var enhance$1 = compose(defaultProps(SunburstDefaultProps), core.withTheme(), core.withDimensions(), core.withColors(), withProps(function (_ref3) {
        var width = _ref3.width,
            height = _ref3.height;

        var radius = Math.min(width, height) / 2;

        var partition = d3Hierarchy.partition().size([2 * Math.PI, radius * radius]);

        return { radius: radius, partition: partition, centerX: width / 2, centerY: height / 2 };
    }), withPropsOnChange(['cornerRadius'], function (_ref4) {
        var cornerRadius = _ref4.cornerRadius;
        return {
            arcGenerator: d3Shape.arc().startAngle(function (d) {
                return d.x0;
            }).endAngle(function (d) {
                return d.x1;
            }).innerRadius(function (d) {
                return Math.sqrt(d.y0);
            }).outerRadius(function (d) {
                return Math.sqrt(d.y1);
            }).cornerRadius(cornerRadius)
        };
    }), withPropsOnChange(['identity'], function (_ref5) {
        var identity = _ref5.identity;
        return {
            getIdentity: core.getAccessorFor(identity)
        };
    }), withPropsOnChange(['value'], function (_ref6) {
        var value = _ref6.value;
        return {
            getValue: core.getAccessorFor(value)
        };
    }), withPropsOnChange(['data', 'getValue'], function (_ref7) {
        var data = _ref7.data,
            getValue = _ref7.getValue;
        return {
            data: d3Hierarchy.hierarchy(data).sum(getValue)
        };
    }), withPropsOnChange(['childColor'], function (_ref8) {
        var childColor = _ref8.childColor;
        return {
            getChildColor: core.getInheritedColorGenerator(childColor)
        };
    }), withPropsOnChange(['data', 'partition', 'getIdentity', 'getChildColor'], function (_ref9) {
        var data = _ref9.data,
            partition = _ref9.partition,
            getIdentity = _ref9.getIdentity,
            getColor = _ref9.getColor,
            getChildColor = _ref9.getChildColor;

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

            if (node.depth === 1) {
                node.data.color = getColor(node.data);
            } else if (node.depth > 1) {
                node.data.color = getChildColor(node.parent.data);
            }
        });

        return { nodes: nodes };
    }), pure);

    var enhancedSunburst = enhance$1(Sunburst);
    enhancedSunburst.displayName = 'Sunburst';

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

    var ResponsiveSunburst = function ResponsiveSunburst(props) {
        return React.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React.createElement(enhancedSunburst, _extends({ width: width, height: height }, props));
            }
        );
    };

    exports.Sunburst = enhancedSunburst;
    exports.ResponsiveSunburst = ResponsiveSunburst;
    exports.SunburstDefaultProps = SunburstDefaultProps;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
