/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import { motionPropTypes } from '../../../props'
import { getInheritedColorGenerator } from '../../../lib/colorUtils'
import { positionFromAngle } from '../../../lib/arcUtils'
import { getLabelGenerator } from '../../../lib/propertiesConverters'
import MarkersItem from '../../markers/MarkersItem'

export default class RadarMarkers extends Component {
    static propTypes = {
        facets: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            .isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                color: PropTypes.string.isRequired,
                data: PropTypes.arrayOf(PropTypes.number).isRequired,
            })
        ),
        radiusScale: PropTypes.func.isRequired,
        angleStep: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

        // labels
        enableLabel: PropTypes.bool.isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        labelFormat: PropTypes.string,
        labelYOffset: PropTypes.number,

        // theming
        theme: PropTypes.shape({
            markers: PropTypes.shape({
                textColor: PropTypes.string.isRequired,
                fontSize: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,

        ...motionPropTypes,
    }

    static defaultProps = {
        size: 6,
        color: 'inherit',
        borderWidth: 0,
        borderColor: 'inherit',

        // labels
        enableLabel: false,
        label: 'value',
    }

    render() {
        const {
            facets,
            data,
            radiusScale,
            angleStep,
            size,
            color,
            borderWidth,
            borderColor,

            // labels
            enableLabel,
            label,
            labelFormat,
            labelYOffset,

            // theming
            theme,

            // motion
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const fillColor = getInheritedColorGenerator(color)
        const strokeColor = getInheritedColorGenerator(borderColor)
        const getLabel = getLabelGenerator(label, labelFormat)

        const points = data.reduce((acc, serie) => {
            const { id, data: serieData } = serie

            return [
                ...acc,
                ...serieData.map((d, i) => {
                    const pointData = { value: d, serie, facet: facets[i] }

                    return {
                        key: `${id}.${i}`,
                        fill: fillColor(serie),
                        stroke: strokeColor(serie),
                        ...positionFromAngle(angleStep * i - Math.PI / 2, radiusScale(d)),
                        ...pointData,
                        label: enableLabel ? getLabel(pointData) : null,
                    }
                }),
            ]
        }, [])

        if (animate !== true) {
            return (
                <g>
                    {points.map(point =>
                        <MarkersItem
                            key={point.key}
                            x={point.x}
                            y={point.y}
                            size={size}
                            color={point.fill}
                            borderWidth={borderWidth}
                            borderColor={point.stroke}
                            label={point.label}
                            labelYOffset={labelYOffset}
                            theme={theme}
                        />
                    )}
                </g>
            )
        }

        const springConfig = {
            motionDamping,
            motionStiffness,
        }

        return (
            <TransitionMotion
                styles={points.map(point => ({
                    key: point.key,
                    data: point,
                    style: {
                        x: spring(point.x, springConfig),
                        y: spring(point.y, springConfig),
                        size: spring(size, springConfig),
                    },
                }))}
            >
                {interpolatedStyles =>
                    <g>
                        {interpolatedStyles.map(({ key, style, data: point }) =>
                            <MarkersItem
                                key={key}
                                {...style}
                                color={point.fill}
                                borderWidth={borderWidth}
                                borderColor={point.stroke}
                                label={point.label}
                                labelYOffset={labelYOffset}
                                theme={theme}
                            />
                        )}
                    </g>}
            </TransitionMotion>
        )
    }
}
