(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prop-types'), require('recompose/compose'), require('recompose/defaultProps'), require('recompose/pure'), require('@nivo/core'), require('react'), require('d3-voronoi')) :
    typeof define === 'function' && define.amd ? define(['exports', 'prop-types', 'recompose/compose', 'recompose/defaultProps', 'recompose/pure', '@nivo/core', 'react', 'd3-voronoi'], factory) :
    (factory((global.nivo = global.nivo || {}),global.PropTypes,global.RecomposeCompose,global.RecomposeDefaultProps,global.RecomposePure,global.nivo,global.React,global.d3));
}(this, (function (exports,PropTypes,compose,defaultProps,pure,core,React,d3Voronoi) { 'use strict';

    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
    compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
    defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
    pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
    React = React && React.hasOwnProperty('default') ? React['default'] : React;

    var VoronoiPropTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        })).isRequired,
        enablePolygons: PropTypes.bool.isRequired,
        enableSites: PropTypes.bool.isRequired,
        enableLinks: PropTypes.bool.isRequired,
        x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        linkWidth: PropTypes.number.isRequired,
        linkColor: PropTypes.string.isRequired,
        siteSize: PropTypes.number.isRequired,
        siteColor: PropTypes.string.isRequired
    };

    var VoronoiDefaultProps = {
        enablePolygons: true,
        enableSites: false,
        enableLinks: false,
        x: 0,
        y: 1,
        borderWidth: 2,
        borderColor: '#000',
        linkWidth: 1,
        linkColor: '#bbb',
        siteSize: 4,
        siteColor: '#666'
    };

    var enhance = (function (Component) {
        return compose(defaultProps(VoronoiDefaultProps), core.withTheme(), core.withDimensions(), pure)(Component);
    });

    var Voronoi = function Voronoi(_ref) {
        var data = _ref.data,
            margin = _ref.margin,
            width = _ref.width,
            height = _ref.height,
            outerWidth = _ref.outerWidth,
            outerHeight = _ref.outerHeight,
            enableSites = _ref.enableSites,
            enableLinks = _ref.enableLinks,
            enablePolygons = _ref.enablePolygons,
            theme = _ref.theme,
            borderWidth = _ref.borderWidth,
            borderColor = _ref.borderColor,
            linkWidth = _ref.linkWidth,
            linkColor = _ref.linkColor,
            siteSize = _ref.siteSize,
            siteColor = _ref.siteColor;

        var voronoi = d3Voronoi.voronoi().x(function (d) {
            return d.x;
        }).y(function (d) {
            return d.y;
        }).extent([[0, 0], [width, height]]);

        var polygons = voronoi.polygons(data);
        var links = voronoi.links(data);

        return React.createElement(
            core.Container,
            { isInteractive: false, theme: theme },
            function () {
                return (/*{ showTooltip, hideTooltip }*/React.createElement(
                        core.SvgWrapper,
                        { width: outerWidth, height: outerHeight, margin: margin, theme: theme },
                        enableLinks && links.map(function (l) {
                            return React.createElement('line', {
                                key: l.source.id + '.' + l.target.id,
                                fill: 'none',
                                stroke: linkColor,
                                strokeWidth: linkWidth,
                                x1: l.source.x,
                                y1: l.source.y,
                                x2: l.target.x,
                                y2: l.target.y
                            });
                        }),
                        enablePolygons && polygons.map(function (p) {
                            return React.createElement('path', {
                                key: p.data.id,
                                fill: 'none',
                                stroke: borderColor,
                                strokeWidth: borderWidth,
                                d: 'M' + p.join('L') + 'Z'
                            });
                        }),
                        enableSites && data.map(function (d) {
                            return React.createElement('circle', {
                                key: d.id,
                                r: siteSize / 2,
                                cx: d.x,
                                cy: d.y,
                                fill: siteColor,
                                stroke: 'none'
                            });
                        })
                    )
                );
            }
        );
    };

    Voronoi.propTypes = VoronoiPropTypes;

    var Voronoi$1 = enhance(Voronoi);

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

    var ResponsiveVoronoi = function ResponsiveVoronoi(props) {
        return React.createElement(
            core.ResponsiveWrapper,
            null,
            function (_ref) {
                var width = _ref.width,
                    height = _ref.height;
                return React.createElement(Voronoi$1, _extends({ width: width, height: height }, props));
            }
        );
    };

    exports.Voronoi = Voronoi$1;
    exports.ResponsiveVoronoi = ResponsiveVoronoi;
    exports.VoronoiPropTypes = VoronoiPropTypes;
    exports.VoronoiDefaultProps = VoronoiDefaultProps;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
