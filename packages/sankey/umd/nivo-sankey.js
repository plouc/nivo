(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('recompose/compose'), require('recompose/withPropsOnChange'), require('recompose/withHandlers'), require('recompose/pure'), require('@nivo/core'), require('react-motion'), require('d3-sankey'), require('@nivo/legends'), require('recompose/defaultProps'), require('recompose/withState'), require('lodash/cloneDeep'), require('lodash/uniq')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'recompose/compose', 'recompose/withPropsOnChange', 'recompose/withHandlers', 'recompose/pure', '@nivo/core', 'react-motion', 'd3-sankey', '@nivo/legends', 'recompose/defaultProps', 'recompose/withState', 'lodash/cloneDeep', 'lodash/uniq'], factory) :
    (factory((global.nivo = global.nivo || {}),global.React,global.PropTypes,global.RecomposeCompose,global.RecomposeWithPropsOnChange,global.RecomposeWithHandlers,global.RecomposePure,global.nivo,global.ReactMotion,global.d3,global.nivo,global.RecomposeDefaultProps,global.RecomposeWithState,global['lodash/cloneDeep'],global['lodash/uniq']));
}(this, (function (exports,React,PropTypes,compose,withPropsOnChange,withHandlers,pure,core,reactMotion,d3Sankey,legends,defaultProps,withState,cloneDeep,uniq) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;
    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
    compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
    withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
    withHandlers = withHandlers && withHandlers.hasOwnProperty('default') ? withHandlers['default'] : withHandlers;
    pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
    defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
    withState = withState && withState.hasOwnProperty('default') ? withState['default'] : withState;
    cloneDeep = cloneDeep && cloneDeep.hasOwnProperty('default') ? cloneDeep['default'] : cloneDeep;
    uniq = uniq && uniq.hasOwnProperty('default') ? uniq['default'] : uniq;

    var SankeyNodesItem = function SankeyNodesItem(_ref) {
        var x = _ref.x,
            y = _ref.y,
            width = _ref.width,
            height = _ref.height,
            color = _ref.color,
            opacity = _ref.opacity,
            borderWidth = _ref.borderWidth,
            borderColor = _ref.borderColor,
            handleMouseEnter = _ref.handleMouseEnter,
            handleMouseMove = _ref.handleMouseMove,
            handleMouseLeave = _ref.handleMouseLeave,
            onClick = _ref.onClick;
        return React__default.createElement('rect', {
            x: x,
            y: y,
            width: width,
            height: height,
            fill: color,
            fillOpacity: opacity,
            strokeWidth: borderWidth,
            stroke: borderColor,
            strokeOpacity: opacity,
            onMouseEnter: handleMouseEnter,
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            onClick: onClick
        });
    };

    SankeyNodesItem.propTypes = {
        node: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            color: PropTypes.string.isRequired
        }),

        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,

        color: PropTypes.string.isRequired,
        opacity: PropTypes.number.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,

        // interactivity
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
        setCurrent: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        handleMouseEnter: PropTypes.func.isRequired,
        handleMouseMove: PropTypes.func.isRequired,
        handleMouseLeave: PropTypes.func.isRequired,

        tooltip: PropTypes.element.isRequired,
        theme: PropTypes.object.isRequired
    };

    var enhance = compose(withPropsOnChange(['node', 'theme', 'tooltip'], function (_ref2) {
        var node = _ref2.node,
            theme = _ref2.theme,
            tooltip = _ref2.tooltip;

        if (tooltip) {
            return {
                tooltip: React__default.createElement(core.BasicTooltip, { id: tooltip(node), enableChip: false, theme: theme })
            };
        }
        return {
            tooltip: React__default.createElement(core.BasicTooltip, { id: node.label, enableChip: true, color: node.color, theme: theme })
        };
    }), withPropsOnChange(['onClick', 'node'], function (_ref3) {
        var _onClick = _ref3.onClick,
            node = _ref3.node;
        return {
            onClick: function onClick(event) {
                return _onClick(node, event);
            }
        };
    }), withHandlers({
        handleMouseEnter: function handleMouseEnter(_ref4) {
            var showTooltip = _ref4.showTooltip,
                setCurrent = _ref4.setCurrent,
                node = _ref4.node,
                tooltip = _ref4.tooltip;
            return function (e) {
                setCurrent(node);
                showTooltip(tooltip, e);
            };
        },
        handleMouseMove: function handleMouseMove(_ref5) {
            var showTooltip = _ref5.showTooltip,
                tooltip = _ref5.tooltip;
            return function (e) {
                showTooltip(tooltip, e);
            };
        },
        handleMouseLeave: function handleMouseLeave(_ref6) {
            var hideTooltip = _ref6.hideTooltip,
                setCurrent = _ref6.setCurrent;
            return function () {
                setCurrent(null);
                hideTooltip();
            };
        }
    }), pure);

    var SankeyNodesItem$1 = enhance(SankeyNodesItem);

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

    var SankeyNodes = function SankeyNodes(_ref) {
        var nodes = _ref.nodes,
            nodeOpacity = _ref.nodeOpacity,
            nodeHoverOpacity = _ref.nodeHoverOpacity,
            nodeHoverOthersOpacity = _ref.nodeHoverOthersOpacity,
            nodeBorderWidth = _ref.nodeBorderWidth,
            getNodeBorderColor = _ref.getNodeBorderColor,
            animate = _ref.animate,
            motionDamping = _ref.motionDamping,
            motionStiffness = _ref.motionStiffness,
            showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip,
            setCurrentNode = _ref.setCurrentNode,
            currentNode = _ref.currentNode,
            currentLink = _ref.currentLink,
            isCurrentNode = _ref.isCurrentNode,
            onClick = _ref.onClick,
            tooltip = _ref.tooltip,
            theme = _ref.theme;

        var getOpacity = function getOpacity(node) {
            if (!currentNode && !currentLink) return nodeOpacity;
            if (isCurrentNode(node)) return nodeHoverOpacity;
            return nodeHoverOthersOpacity;
        };

        if (!animate) {
            return React__default.createElement(
                React.Fragment,
                null,
                nodes.map(function (node) {
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
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                        setCurrent: setCurrentNode,
                        onClick: onClick,
                        tooltip: tooltip,
                        theme: theme
                    });
                })
            );
        }

        var springProps = {
            damping: motionDamping,
            stiffness: motionStiffness
        };

        return React__default.createElement(
            reactMotion.TransitionMotion,
            {
                styles: nodes.map(function (node) {
                    return {
                        key: node.id,
                        data: node,
                        style: _extends({
                            x: reactMotion.spring(node.x, springProps),
                            y: reactMotion.spring(node.y, springProps),
                            width: reactMotion.spring(node.width, springProps),
                            height: reactMotion.spring(node.height, springProps),
                            opacity: reactMotion.spring(getOpacity(node), springProps)
                        }, core.colorMotionSpring(node.color, springProps))
                    };
                })
            },
            function (interpolatedStyles) {
                return React__default.createElement(
                    React.Fragment,
                    null,
                    interpolatedStyles.map(function (_ref2) {
                        var key = _ref2.key,
                            style = _ref2.style,
                            node = _ref2.data;

                        var color = core.getInterpolatedColor(style);

                        return React__default.createElement(SankeyNodesItem$1, {
                            key: key,
                            node: node,
                            x: style.x,
                            y: style.y,
                            width: Math.max(style.width, 0),
                            height: Math.max(style.height, 0),
                            color: color,
                            opacity: style.opacity,
                            borderWidth: nodeBorderWidth,
                            borderColor: getNodeBorderColor(_extends({}, node, { color: color })),
                            showTooltip: showTooltip,
                            hideTooltip: hideTooltip,
                            setCurrent: setCurrentNode,
                            onClick: onClick,
                            tooltip: tooltip,
                            theme: theme
                        });
                    })
                );
            }
        );
    };

    SankeyNodes.propTypes = _extends({
        nodes: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired
        })).isRequired,

        nodePaddingX: PropTypes.number.isRequired,
        nodeOpacity: PropTypes.number.isRequired,
        nodeHoverOpacity: PropTypes.number.isRequired,
        nodeHoverOthersOpacity: PropTypes.number.isRequired,
        nodeBorderWidth: PropTypes.number.isRequired,
        getNodeBorderColor: PropTypes.func.isRequired,

        theme: PropTypes.object.isRequired,
        tooltip: PropTypes.func

    }, core.motionPropTypes, {

        // interactivity
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
        setCurrentNode: PropTypes.func.isRequired,
        currentNode: PropTypes.object,
        currentLink: PropTypes.object,
        isCurrentNode: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired
    });

    var SankeyNodes$1 = pure(SankeyNodes);

    var sankeyAlignmentPropMapping = {
        center: d3Sankey.sankeyCenter,
        justify: d3Sankey.sankeyJustify,
        left: d3Sankey.sankeyLeft,
        right: d3Sankey.sankeyRight
    };

    var sankeyAlignmentPropKeys = Object.keys(sankeyAlignmentPropMapping);

    var sankeyAlignmentPropType = PropTypes.oneOf(sankeyAlignmentPropKeys);

    var sankeyAlignmentFromProp = function sankeyAlignmentFromProp(prop) {
        return sankeyAlignmentPropMapping[prop];
    };

    var blendModePropType = PropTypes.oneOf(['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity']);

    var SankeyPropTypes = {
        data: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
            })).isRequired,
            links: PropTypes.arrayOf(PropTypes.shape({
                source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                target: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
            })).isRequired
        }).isRequired,

        align: sankeyAlignmentPropType.isRequired,

        // nodes
        nodeOpacity: PropTypes.number.isRequired,
        nodeHoverOpacity: PropTypes.number.isRequired,
        nodeHoverOthersOpacity: PropTypes.number.isRequired,
        nodeWidth: PropTypes.number.isRequired,
        nodePaddingX: PropTypes.number.isRequired,
        nodePaddingY: PropTypes.number.isRequired,
        nodeBorderWidth: PropTypes.number.isRequired,
        nodeBorderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

        // links
        linkOpacity: PropTypes.number.isRequired,
        linkHoverOpacity: PropTypes.number.isRequired,
        linkHoverOthersOpacity: PropTypes.number.isRequired,
        linkContract: PropTypes.number.isRequired,
        linkBlendMode: blendModePropType.isRequired,
        enableLinkGradient: PropTypes.bool.isRequired,

        // labels
        enableLabels: PropTypes.bool.isRequired,
        labelPosition: PropTypes.oneOf(['inside', 'outside']).isRequired,
        labelPadding: PropTypes.number.isRequired,
        labelOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
        labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        getLabelTextColor: PropTypes.func.isRequired, // computed
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        getLabel: PropTypes.func.isRequired, // computed

        // tooltip
        nodeTooltip: PropTypes.func,
        linkTooltip: PropTypes.func,

        // interactivity
        isInteractive: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

        legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired
    };

    var SankeyDefaultProps = {
        align: 'center',

        // nodes
        nodeOpacity: 0.75,
        nodeHoverOpacity: 1,
        nodeHoverOthersOpacity: 0.15,
        nodeWidth: 12,
        nodePaddingX: 0,
        nodePaddingY: 12,
        nodeBorderWidth: 1,
        nodeBorderColor: 'inherit:darker(0.5)',

        // links
        linkOpacity: 0.25,
        linkHoverOpacity: 0.6,
        linkHoverOthersOpacity: 0.15,
        linkContract: 0,
        linkBlendMode: 'multiply',
        enableLinkGradient: false,

        // labels
        enableLabels: true,
        label: 'id',
        labelPosition: 'inside',
        labelPadding: 9,
        labelOrientation: 'horizontal',
        labelTextColor: 'inherit:darker(0.8)',

        // interactivity
        isInteractive: true,
        onClick: core.noop,

        legends: []
    };

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
        return React__default.createElement(
            'span',
            { style: tooltipStyles.container },
            React__default.createElement(core.Chip, { color: link.source.color, style: tooltipStyles.sourceChip }),
            React__default.createElement(
                'strong',
                null,
                link.source.label
            ),
            ' > ',
            React__default.createElement(
                'strong',
                null,
                link.target.label
            ),
            React__default.createElement(core.Chip, { color: link.target.color, style: tooltipStyles.targetChip }),
            React__default.createElement(
                'strong',
                null,
                format ? format(link.value) : link.value
            )
        );
    };

    TooltipContent.propTypes = {
        link: PropTypes.shape({
            source: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
            }).isRequired,
            target: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
            }).isRequired,
            color: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        }).isRequired,
        format: PropTypes.func
    };

    var SankeyLinksItem = function SankeyLinksItem(_ref2) {
        var path = _ref2.path,
            width = _ref2.width,
            color = _ref2.color,
            opacity = _ref2.opacity,
            contract = _ref2.contract,
            blendMode = _ref2.blendMode,
            enableGradient = _ref2.enableGradient,
            handleMouseEnter = _ref2.handleMouseEnter,
            handleMouseMove = _ref2.handleMouseMove,
            handleMouseLeave = _ref2.handleMouseLeave,
            onClick = _ref2.onClick,
            link = _ref2.link;
        return React__default.createElement(
            React.Fragment,
            null,
            enableGradient && React__default.createElement(
                'linearGradient',
                {
                    id: link.source.id + '.' + link.target.id,
                    gradientUnits: 'userSpaceOnUse',
                    x1: link.source.x,
                    x2: link.target.x
                },
                React__default.createElement('stop', { offset: '0%', stopColor: link.source.color }),
                React__default.createElement('stop', { offset: '100%', stopColor: link.target.color })
            ),
            React__default.createElement('path', {
                fill: 'none',
                d: path,
                strokeWidth: Math.max(1, width - contract * 2),
                stroke: enableGradient ? 'url(#' + link.source.id + '.' + link.target.id + ')' : color,
                strokeOpacity: opacity,
                onMouseEnter: handleMouseEnter,
                onMouseMove: handleMouseMove,
                onMouseLeave: handleMouseLeave,
                onClick: onClick,
                style: { mixBlendMode: blendMode }
            })
        );
    };

    SankeyLinksItem.propTypes = {
        link: PropTypes.shape({
            source: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                color: PropTypes.string.isRequired
            }).isRequired,
            target: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                color: PropTypes.string.isRequired
            }).isRequired,
            color: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        }).isRequired,

        path: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        opacity: PropTypes.number.isRequired,
        contract: PropTypes.number.isRequired,
        blendMode: blendModePropType.isRequired,
        enableGradient: PropTypes.bool.isRequired,

        theme: PropTypes.object.isRequired,

        // interactivity
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
        setCurrent: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        handleMouseEnter: PropTypes.func.isRequired,
        handleMouseMove: PropTypes.func.isRequired,
        handleMouseLeave: PropTypes.func.isRequired
    };

    var enhance$1 = compose(withPropsOnChange(['link', 'theme', 'tooltip', 'tooltipFormat'], function (_ref3) {
        var link = _ref3.link,
            theme = _ref3.theme,
            tooltip = _ref3.tooltip,
            tooltipFormat = _ref3.tooltipFormat;

        if (tooltip) {
            return {
                tooltip: React__default.createElement(core.BasicTooltip, { id: tooltip(link), enableChip: false, theme: theme })
            };
        }
        return {
            tooltip: React__default.createElement(core.BasicTooltip, {
                id: React__default.createElement(TooltipContent, { format: tooltipFormat, link: link }),
                theme: theme
            })
        };
    }), withPropsOnChange(['onClick', 'link'], function (_ref4) {
        var _onClick = _ref4.onClick,
            link = _ref4.link;
        return {
            onClick: function onClick(event) {
                return _onClick(link, event);
            }
        };
    }), withHandlers({
        handleMouseEnter: function handleMouseEnter(_ref5) {
            var showTooltip = _ref5.showTooltip,
                setCurrent = _ref5.setCurrent,
                link = _ref5.link,
                tooltip = _ref5.tooltip;
            return function (e) {
                setCurrent(link);
                showTooltip(tooltip, e);
            };
        },
        handleMouseMove: function handleMouseMove(_ref6) {
            var showTooltip = _ref6.showTooltip,
                tooltip = _ref6.tooltip;
            return function (e) {
                showTooltip(tooltip, e);
            };
        },
        handleMouseLeave: function handleMouseLeave(_ref7) {
            var hideTooltip = _ref7.hideTooltip,
                setCurrent = _ref7.setCurrent;
            return function () {
                setCurrent(null);
                hideTooltip();
            };
        }
    }), pure);

    var SankeyLinksItem$1 = enhance$1(SankeyLinksItem);

    var getLinkPath = d3Sankey.sankeyLinkHorizontal();

    var SankeyLinks = function SankeyLinks(_ref) {
        var links = _ref.links,
            linkOpacity = _ref.linkOpacity,
            linkHoverOpacity = _ref.linkHoverOpacity,
            linkHoverOthersOpacity = _ref.linkHoverOthersOpacity,
            linkContract = _ref.linkContract,
            linkBlendMode = _ref.linkBlendMode,
            enableLinkGradient = _ref.enableLinkGradient,
            animate = _ref.animate,
            motionDamping = _ref.motionDamping,
            motionStiffness = _ref.motionStiffness,
            showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip,
            setCurrentLink = _ref.setCurrentLink,
            currentNode = _ref.currentNode,
            currentLink = _ref.currentLink,
            isCurrentLink = _ref.isCurrentLink,
            onClick = _ref.onClick,
            tooltipFormat = _ref.tooltipFormat,
            tooltip = _ref.tooltip,
            theme = _ref.theme;

        var getOpacity = function getOpacity(link) {
            if (!currentNode && !currentLink) return linkOpacity;
            if (isCurrentLink(link)) return linkHoverOpacity;
            return linkHoverOthersOpacity;
        };

        if (animate !== true) {
            return React__default.createElement(
                'g',
                null,
                links.map(function (link) {
                    return React__default.createElement(SankeyLinksItem$1, {
                        key: link.source.id + '.' + link.target.id,
                        link: link,
                        path: getLinkPath(link),
                        width: Math.max(1, link.width - linkContract * 2),
                        color: link.color,
                        opacity: getOpacity(link),
                        contract: linkContract,
                        blendMode: linkBlendMode,
                        enableGradient: enableLinkGradient,
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                        setCurrent: setCurrentLink,
                        onClick: onClick,
                        tooltip: tooltip,
                        theme: theme,
                        tooltipFormat: tooltipFormat
                    });
                })
            );
        }

        var springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping
        };

        return React__default.createElement(
            React.Fragment,
            null,
            links.map(function (link) {
                return React__default.createElement(
                    core.SmartMotion,
                    {
                        key: link.source.id + '.' + link.target.id,
                        style: function style(spring) {
                            return {
                                path: spring(getLinkPath(link), springConfig),
                                width: spring(Math.max(1, link.width - linkContract * 2), springConfig),
                                color: spring(link.color, springConfig),
                                opacity: spring(getOpacity(link), springConfig),
                                contract: spring(linkContract, springConfig)
                            };
                        }
                    },
                    function (style) {
                        return React__default.createElement(SankeyLinksItem$1, _extends({
                            link: link
                        }, style, {
                            blendMode: linkBlendMode,
                            enableGradient: enableLinkGradient,
                            showTooltip: showTooltip,
                            hideTooltip: hideTooltip,
                            setCurrent: setCurrentLink,
                            onClick: onClick,
                            tooltip: tooltip,
                            theme: theme,
                            tooltipFormat: tooltipFormat
                        }));
                    }
                );
            })
        );
    };

    SankeyLinks.propTypes = _extends({
        links: PropTypes.arrayOf(PropTypes.shape({
            source: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
            }).isRequired,
            target: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
            }).isRequired,
            width: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired
        })).isRequired,

        // links
        linkOpacity: PropTypes.number.isRequired,
        linkHoverOpacity: PropTypes.number.isRequired,
        linkHoverOthersOpacity: PropTypes.number.isRequired,
        linkContract: PropTypes.number.isRequired,
        linkBlendMode: blendModePropType.isRequired,
        enableLinkGradient: PropTypes.bool.isRequired,

        theme: PropTypes.object.isRequired,
        tooltip: PropTypes.func

    }, core.motionPropTypes, {

        // interactivity
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
        setCurrentLink: PropTypes.func.isRequired,
        currentLink: PropTypes.object,
        isCurrentLink: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired
    });

    var SankeyLinks$1 = pure(SankeyLinks);

    var SankeyLabels = function SankeyLabels(_ref) {
        var nodes = _ref.nodes,
            width = _ref.width,
            labelPosition = _ref.labelPosition,
            labelPadding = _ref.labelPadding,
            labelOrientation = _ref.labelOrientation,
            getLabelTextColor = _ref.getLabelTextColor,
            theme = _ref.theme,
            animate = _ref.animate,
            motionDamping = _ref.motionDamping,
            motionStiffness = _ref.motionStiffness;

        var labelRotation = labelOrientation === 'vertical' ? -90 : 0;
        var labels = nodes.map(function (node) {
            var x = void 0;
            var textAnchor = void 0;
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

            return {
                id: node.id,
                label: node.label,
                x: x,
                y: node.y + node.height / 2,
                textAnchor: textAnchor,
                color: getLabelTextColor(node)
            };
        });

        if (!animate) {
            return React__default.createElement(
                'g',
                null,
                labels.map(function (label) {
                    return React__default.createElement(
                        'text',
                        {
                            key: label.id,
                            alignmentBaseline: 'central',
                            textAnchor: label.textAnchor,
                            transform: 'translate(' + label.x + ', ' + label.y + ') rotate(' + labelRotation + ')',
                            style: _extends({}, theme.labels.text, {
                                fill: label.color
                            })
                        },
                        label.label
                    );
                })
            );
        }

        var springProps = {
            damping: motionDamping,
            stiffness: motionStiffness
        };

        return React__default.createElement(
            reactMotion.TransitionMotion,
            {
                styles: labels.map(function (label) {
                    return {
                        key: label.id,
                        data: label,
                        style: _extends({
                            x: reactMotion.spring(label.x, springProps),
                            y: reactMotion.spring(label.y, springProps),
                            rotation: reactMotion.spring(labelRotation, springProps)
                        }, core.colorMotionSpring(label.color, springProps))
                    };
                })
            },
            function (interpolatedStyles) {
                return React__default.createElement(
                    React.Fragment,
                    null,
                    interpolatedStyles.map(function (_ref2) {
                        var key = _ref2.key,
                            style = _ref2.style,
                            data = _ref2.data;

                        var color = core.getInterpolatedColor(style);

                        return React__default.createElement(
                            'text',
                            {
                                key: key,
                                transform: 'translate(' + style.x + ', ' + style.y + ') rotate(' + style.rotation + ')',
                                alignmentBaseline: 'central',
                                textAnchor: data.textAnchor,
                                style: _extends({}, theme.labels.text, {
                                    fill: color,
                                    pointerEvents: 'none'
                                })
                            },
                            data.label
                        );
                    })
                );
            }
        );
    };

    SankeyLabels.propTypes = _extends({
        nodes: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            x1: PropTypes.number.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired
        })).isRequired,

        width: PropTypes.number.isRequired,

        labelPosition: PropTypes.oneOf(['inside', 'outside']).isRequired,
        labelPadding: PropTypes.number.isRequired,
        labelOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
        getLabelTextColor: PropTypes.func.isRequired,

        theme: PropTypes.object.isRequired

    }, core.motionPropTypes);

    var SankeyLabels$1 = pure(SankeyLabels);

    var enhance$2 = (function (Component) {
        return compose(defaultProps(SankeyDefaultProps), withState('currentNode', 'setCurrentNode', null), withState('currentLink', 'setCurrentLink', null), core.withColors(), core.withColors({
            colorByKey: 'linkColorBy',
            destKey: 'getLinkColor',
            defaultColorBy: 'source.id'
        }), core.withTheme(), core.withDimensions(), core.withMotion(), withPropsOnChange(['nodeBorderColor'], function (_ref) {
            var nodeBorderColor = _ref.nodeBorderColor;
            return {
                getNodeBorderColor: core.getInheritedColorGenerator(nodeBorderColor)
            };
        }), withPropsOnChange(['labelTextColor'], function (_ref2) {
            var labelTextColor = _ref2.labelTextColor;
            return {
                getLabelTextColor: core.getInheritedColorGenerator(labelTextColor)
            };
        }), withPropsOnChange(['label', 'labelFormat'], function (_ref3) {
            var label = _ref3.label,
                labelFormat = _ref3.labelFormat;
            return {
                getLabel: core.getLabelGenerator(label, labelFormat)
            };
        }), pure)(Component);
    });

    var getId = function getId(d) {
        return d.id;
    };

    var Sankey = function Sankey(_ref) {
        var _data = _ref.data,
            align = _ref.align,
            margin = _ref.margin,
            width = _ref.width,
            height = _ref.height,
            outerWidth = _ref.outerWidth,
            outerHeight = _ref.outerHeight,
            nodeOpacity = _ref.nodeOpacity,
            nodeHoverOpacity = _ref.nodeHoverOpacity,
            nodeHoverOthersOpacity = _ref.nodeHoverOthersOpacity,
            nodeWidth = _ref.nodeWidth,
            nodePaddingX = _ref.nodePaddingX,
            nodePaddingY = _ref.nodePaddingY,
            nodeBorderWidth = _ref.nodeBorderWidth,
            getNodeBorderColor = _ref.getNodeBorderColor,
            setCurrentNode = _ref.setCurrentNode,
            currentNode = _ref.currentNode,
            linkOpacity = _ref.linkOpacity,
            linkHoverOpacity = _ref.linkHoverOpacity,
            linkHoverOthersOpacity = _ref.linkHoverOthersOpacity,
            linkContract = _ref.linkContract,
            linkBlendMode = _ref.linkBlendMode,
            enableLinkGradient = _ref.enableLinkGradient,
            getLinkColor = _ref.getLinkColor,
            setCurrentLink = _ref.setCurrentLink,
            currentLink = _ref.currentLink,
            enableLabels = _ref.enableLabels,
            getLabel = _ref.getLabel,
            labelPosition = _ref.labelPosition,
            labelPadding = _ref.labelPadding,
            labelOrientation = _ref.labelOrientation,
            getLabelTextColor = _ref.getLabelTextColor,
            theme = _ref.theme,
            getColor = _ref.getColor,
            nodeTooltip = _ref.nodeTooltip,
            linkTooltip = _ref.linkTooltip,
            animate = _ref.animate,
            motionDamping = _ref.motionDamping,
            motionStiffness = _ref.motionStiffness,
            isInteractive = _ref.isInteractive,
            onClick = _ref.onClick,
            tooltipFormat = _ref.tooltipFormat,
            legends$$1 = _ref.legends;

        var sankey = d3Sankey.sankey().nodeAlign(sankeyAlignmentFromProp(align)).nodeWidth(nodeWidth).nodePadding(nodePaddingY).size([width, height]).nodeId(getId);

        // deep clone is required as the sankey diagram mutates data
        var data = cloneDeep(_data);
        sankey(data);

        data.nodes.forEach(function (node) {
            node.color = getColor(node);
            node.label = getLabel(node);
            node.x = node.x0 + nodePaddingX;
            node.y = node.y0;
            node.width = Math.max(node.x1 - node.x0 - nodePaddingX * 2, 0);
            node.height = Math.max(node.y1 - node.y0, 0);
        });

        data.links.forEach(function (link) {
            link.color = getLinkColor(link);
        });

        var legendData = data.nodes.map(function (node) {
            return {
                id: node.id,
                label: node.label,
                color: node.color
            };
        });

        var motionProps = {
            animate: animate,
            motionDamping: motionDamping,
            motionStiffness: motionStiffness
        };

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
            data.links.filter(function (_ref4) {
                var source = _ref4.source,
                    target = _ref4.target;
                return source.id === currentNode.id || target.id === currentNode.id;
            }).forEach(function (_ref5) {
                var source = _ref5.source,
                    target = _ref5.target;

                currentNodeIds.push(source.id);
                currentNodeIds.push(target.id);
            });

            currentNodeIds = uniq(currentNodeIds);
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

        return React__default.createElement(
            core.Container,
            { isInteractive: isInteractive, theme: theme },
            function (_ref8) {
                var showTooltip = _ref8.showTooltip,
                    hideTooltip = _ref8.hideTooltip;
                return React__default.createElement(
                    core.SvgWrapper,
                    { width: outerWidth, height: outerHeight, margin: margin, theme: theme },
                    React__default.createElement(SankeyLinks$1, _extends({
                        links: data.links,
                        linkContract: linkContract,
                        linkOpacity: linkOpacity,
                        linkHoverOpacity: linkHoverOpacity,
                        linkHoverOthersOpacity: linkHoverOthersOpacity,
                        linkBlendMode: linkBlendMode,
                        enableLinkGradient: enableLinkGradient,
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                        setCurrentLink: setCurrentLink,
                        currentNode: currentNode,
                        currentLink: currentLink,
                        isCurrentLink: isCurrentLink,
                        onClick: onClick,
                        tooltip: linkTooltip,
                        theme: theme,
                        tooltipFormat: tooltipFormat
                    }, motionProps)),
                    React__default.createElement(SankeyNodes$1, _extends({
                        nodes: data.nodes,
                        nodePaddingX: nodePaddingX,
                        nodeOpacity: nodeOpacity,
                        nodeHoverOpacity: nodeHoverOpacity,
                        nodeHoverOthersOpacity: nodeHoverOthersOpacity,
                        nodeBorderWidth: nodeBorderWidth,
                        getNodeBorderColor: getNodeBorderColor,
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                        setCurrentNode: setCurrentNode,
                        currentNode: currentNode,
                        currentLink: currentLink,
                        isCurrentNode: isCurrentNode,
                        onClick: onClick,
                        tooltip: nodeTooltip,
                        theme: theme,
                        tooltipFormat: tooltipFormat
                    }, motionProps)),
                    enableLabels && React__default.createElement(SankeyLabels$1, _extends({
                        nodes: data.nodes,
                        width: width,
                        labelPosition: labelPosition,
                        labelPadding: labelPadding,
                        labelOrientation: labelOrientation,
                        getLabelTextColor: getLabelTextColor,
                        theme: theme
                    }, motionProps)),
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

    Sankey.propTypes = SankeyPropTypes;

    var enhancedSankey = enhance$2(Sankey);
    enhancedSankey.displayName = 'Sankey';

    var ResponsiveSankey = function ResponsiveSankey(props) {
        return React__default.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React__default.createElement(enhancedSankey, _extends({ width: width, height: height }, props));
            }
        );
    };

    exports.Sankey = enhancedSankey;
    exports.ResponsiveSankey = ResponsiveSankey;
    exports.sankeyAlignmentPropMapping = sankeyAlignmentPropMapping;
    exports.sankeyAlignmentPropKeys = sankeyAlignmentPropKeys;
    exports.sankeyAlignmentPropType = sankeyAlignmentPropType;
    exports.sankeyAlignmentFromProp = sankeyAlignmentFromProp;
    exports.blendModePropType = blendModePropType;
    exports.SankeyPropTypes = SankeyPropTypes;
    exports.SankeyDefaultProps = SankeyDefaultProps;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
