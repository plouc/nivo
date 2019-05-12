/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment, memo, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import LineTooltip from './LineTooltip'

const LineLabels = ({
    series,
    yScale,
    position,
    margin,
    padding,
    color,
    setCurrentSerie,
    getOpacity,
}) => {
    const theme = useTheme()
    const getColor = useInheritedColor(color, theme)

    const labels = useMemo(() => {
        if (position === 'start') {
            return series.map(serie => {
                const point = serie.linePoints[0]

                return {
                    id: serie.id,
                    x: point[0] - padding,
                    y: point[1],
                    width: margin.left,
                    height: yScale.step(),
                    color: getColor(serie),
                    serie,
                }
            })
        } else {
            return series.map(serie => {
                const point = serie.linePoints[serie.linePoints.length - 1]

                return {
                    id: serie.id,
                    x: point[0] + padding,
                    y: point[1],
                    width: margin.right,
                    height: yScale.step(),
                    color: getColor(serie),
                    serie,
                }
            })
        }
    }, [series, position, getColor])

    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const onMouseEnter = useCallback(
        (serie, event) => {
            showTooltipFromEvent(<LineTooltip serie={serie} />, event)
            setCurrentSerie(serie.id)
        },
        [showTooltipFromEvent, setCurrentSerie]
    )
    const onMouseMove = useCallback(
        (serie, event) => {
            showTooltipFromEvent(<LineTooltip serie={serie} />, event)
        },
        [showTooltipFromEvent]
    )
    const onMouseLeave = useCallback(() => {
        hideTooltip()
        setCurrentSerie(null)
    }, [hideTooltip, setCurrentSerie])

    return labels.map(label => {
        return (
            <Fragment key={label.id}>
                <text
                    x={label.x}
                    y={label.y}
                    textAnchor={position === 'start' ? 'end' : 'start'}
                    dominantBaseline="central"
                    opacity={getOpacity(label.serie)}
                    style={{
                        ...theme.labels.text,
                        fill: label.color,
                    }}
                >
                    {label.id}
                </text>
                <rect
                    x={position === 'start' ? label.x - label.width + padding : label.x - padding}
                    y={label.y - label.height / 2}
                    width={label.width}
                    height={label.height}
                    fill="red"
                    fillOpacity={0}
                    onMouseEnter={event => onMouseEnter(label.serie, event)}
                    onMouseMove={event => onMouseMove(label.serie, event)}
                    onMouseLeave={onMouseLeave}
                />
            </Fragment>
        )
    })
}

LineLabels.propTypes = {
    series: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    yScale: PropTypes.func.isRequired,
    position: PropTypes.oneOf(['start', 'end']).isRequired,
    padding: PropTypes.number.isRequired,
    margin: PropTypes.shape({
        top: PropTypes.number.isRequired,
        right: PropTypes.number.isRequired,
        bottom: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
    }).isRequired,
    currentSerie: PropTypes.string,
    setCurrentSerie: PropTypes.func.isRequired,
}

export default memo(LineLabels)
