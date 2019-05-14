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
import AreaTooltip from './AreaTooltip'

const AreasLabels = ({ series, position, margin, padding, color, setCurrentSerie }) => {
    const theme = useTheme()
    const getColor = useInheritedColor(color, theme)

    const labels = useMemo(() => {
        if (position === 'start') {
            return series.map(serie => {
                const point = serie.points[0]

                return {
                    id: serie.id,
                    x: point.x - padding,
                    y: point.y,
                    width: margin.left,
                    height: point.height,
                    color: getColor(serie),
                    serie,
                }
            })
        } else {
            return series.map(serie => {
                const point = serie.points[serie.points.length - 1]

                return {
                    id: serie.id,
                    x: point.x + padding,
                    y: point.y,
                    width: margin.right,
                    height: point.height,
                    color: getColor(serie),
                    serie,
                }
            })
        }
    }, [series, position, padding, margin, getColor])

    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const onMouseEnter = useCallback(
        (serie, event) => {
            showTooltipFromEvent(<AreaTooltip serie={serie} />, event)
            setCurrentSerie(serie.id)
        },
        [showTooltipFromEvent, setCurrentSerie]
    )
    const onMouseMove = useCallback(
        (serie, event) => {
            showTooltipFromEvent(<AreaTooltip serie={serie} />, event)
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
                    opacity={label.serie.style.fillOpacity}
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

AreasLabels.propTypes = {
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
    position: PropTypes.oneOf(['start', 'end']).isRequired,
    padding: PropTypes.number.isRequired,
    margin: PropTypes.shape({
        top: PropTypes.number.isRequired,
        right: PropTypes.number.isRequired,
        bottom: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
    }).isRequired,
    setCurrentSerie: PropTypes.func.isRequired,
}

export default memo(AreasLabels)
