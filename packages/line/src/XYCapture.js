/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback, useRef, useMemo } from 'react'
import { getRelativeCursor } from '@nivo/core'

const getInvertFunction = scale => {
    if (scale.invert !== undefined) {
        return v => [v, scale.invert(v)]
    }

    const [start, end] = scale.range()
    const domain = scale.domain()

    return position => {
        let i = 0
        const width = (scale.step() * (end - start)) / Math.abs(end - start)
        if (width > 0) {
            while (position > start + width * (i + 1)) {
                i += 1
            }
        } else {
            while (position < start + width * (i + 1)) {
                i += 1
            }
        }

        return [scale(domain[i]), domain[i]]
    }
}

const useXYCapture = ({ el, points, width, height, xScale, yScale, tolerance = 6 }) => {
    const [position, setPosition] = useState(null)
    const [xValue, setXValue] = useState(null)
    const [yValue, setYValue] = useState(null)

    const invertX = useMemo(() => getInvertFunction(xScale), [xScale])
    const invertY = useMemo(() => getInvertFunction(yScale), [yScale])

    const onMouseHover = useCallback(
        event => {
            const [x, y] = getRelativeCursor(el, event)
            setPosition([x, y])
            setXValue(invertX(x))
            setYValue(invertY(y))
        },
        [el, setPosition, invertX, invertY]
    )

    const onMouseLeave = useCallback(() => setPosition(null), [setPosition])

    return {
        position,
        setPosition,
        onMouseHover,
        onMouseLeave,
        xValue,
        yValue,
    }
}

const XYCapture = ({ points, width, height, xScale, yScale }) => {
    const el = useRef()
    const { position, onMouseHover, onMouseLeave, xValue, yValue } = useXYCapture({
        el: el.current,
        points,
        width,
        height,
        xScale,
        yScale,
    })

    const xPoints = useMemo(() => {
        if (xValue === null) return []
        return points.filter(p => p.x >= xValue[0] - 3 && p.x <= xValue[0] + 3)
    }, [points, xValue])
    const yPoints = useMemo(() => {
        if (yValue === null) return []
        return points.filter(p => p.y >= yValue[0] - 3 && p.y <= yValue[0] + 3)
    }, [points, yValue])

    return (
        <>
            {position !== null && (
                <>
                    <g transform={`translate(${position[0]},0)`}>
                        <line strokeWidth={1} stroke="black" strokeOpacity={0.3} y2={height} />
                    </g>
                    <g transform={`translate(0,${position[1]})`}>
                        <line strokeWidth={1} stroke="black" strokeOpacity={0.3} x2={width} />
                    </g>
                </>
            )}
            {xValue !== null && (
                <g transform={`translate(${xValue[0]},0)`}>
                    <line strokeWidth={1} stroke="black" y2={height} />
                    <rect fill="#ddd" x={-40} y={-30} width={80} height={30} />
                    <text
                        y={-15}
                        textAnchor="middle"
                        alignmentBaseline="central"
                        style={{ fontSize: 11 }}
                    >
                        {xValue[1]}
                    </text>
                    <rect fill="#ddd" x={-40} y={height} width={80} height={30} />
                    <text
                        y={height + 15}
                        textAnchor="middle"
                        alignmentBaseline="central"
                        style={{ fontSize: 11 }}
                    >
                        {xValue[1]}
                    </text>
                </g>
            )}
            {yValue !== null && (
                <g transform={`translate(0,${yValue[0]})`}>
                    <line strokeWidth={1} stroke="black" x2={width} />
                    <rect fill="#ddd" x={-80} y={-15} width={80} height={30} />
                    <text
                        x={-40}
                        style={{ fontSize: 11 }}
                        textAnchor="middle"
                        alignmentBaseline="central"
                    >
                        {Math.round(yValue[1])}
                    </text>
                    <rect fill="#ddd" x={width} y={-15} width={80} height={30} />
                    <text
                        x={width + 40}
                        style={{ fontSize: 11 }}
                        textAnchor="middle"
                        alignmentBaseline="central"
                    >
                        {Math.round(yValue[1])}
                    </text>
                </g>
            )}
            {xPoints.map(p => {
                return <circle key={p.id} cx={p.x} cy={p.y} r={3} />
            })}
            {yPoints.map(p => {
                return <circle key={p.id} cx={p.x} cy={p.y} r={3} />
            })}
            <rect
                ref={el}
                width={width}
                height={height}
                fill="rgba(0,0,0,0)"
                onMouseEnter={onMouseHover}
                onMouseMove={onMouseHover}
                onMouseLeave={onMouseLeave}
            />
        </>
    )
}

export default XYCapture

/*

class ScatterPlotCanvas extends Component {
    state = {}

    componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    shouldComponentUpdate(props) {
        if (
            this.props.outerWidth !== props.outerWidth ||
            this.props.outerHeight !== props.outerHeight ||
            this.props.isInteractive !== props.isInteractive ||
            this.props.theme !== props.theme
        ) {
            return true
        } else {
            this.draw(props)
            return false
        }
    }

    componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    handleMouseEnter = () => {}

    getPointForMouseEvent = event => {
        const {
            points,
            margin,
            width,
            height,
            useMesh,
            delaunay,
            onMouseMove,
            onMouseLeave,
        } = this.props
        const [x, y] = getRelativeCursor(this.surface, event)

        let pointIndex
        let point
        if (useMesh === true) {
            if (isCursorInRect(margin.left, margin.top, width, height, x, y)) {
                pointIndex = delaunay.find(x - margin.left, y - margin.top)
                point = points[pointIndex]
            } else {
                pointIndex = null
                point = null
            }
        } else {
            point = findNodeUnderCursor(points, margin, x, y)
        }

        if (point && onMouseMove !== undefined) {
            onMouseMove(point, event)
        } else if (!point && this.state.point && onMouseLeave !== undefined) {
            onMouseLeave(this.state.point, event)
        }

        this.setState({ pointIndex, point })

        return point
    }

    handleMouseHover = (showTooltip, hideTooltip) => event => {
        const point = this.getPointForMouseEvent(event)
        if (point) {
            const { theme, tooltipFormat, tooltip, getColor } = this.props
            showTooltip(
                <ScatterPlotTooltip
                    point={point}
                    color={getColor(point.data)}
                    format={tooltipFormat}
                    tooltip={tooltip}
                    theme={theme}
                />,
                event
            )
        } else {
            hideTooltip()
        }
    }

    handleMouseLeave = hideTooltip => () => {
        hideTooltip()
    }

    handleClick = event => {
        const point = this.getPointForMouseEvent(event)
        if (point !== undefined && point !== null) {
            this.props.onClick(point.data, event)
        }
    }

    draw(props) {
        const {
            data,

            computedData,
            points,

            width,
            height,
            outerWidth,
            outerHeight,
            pixelRatio,
            margin,

            axisTop,
            axisRight,
            axisBottom,
            axisLeft,

            enableGridX,
            enableGridY,

            useMesh,
            debugMesh,
            voronoi,

            theme,
            getSymbolSize,
            getColor,

            legends,
        } = props

        const { xScale, yScale } = computedData

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        this.ctx.strokeStyle = '#dddddd'
        enableGridX &&
            renderGridLinesToCanvas(this.ctx, {
                width,
                height,
                scale: xScale,
                axis: 'x',
            })
        enableGridY &&
            renderGridLinesToCanvas(this.ctx, {
                width,
                height,
                scale: yScale,
                axis: 'y',
            })

        this.ctx.strokeStyle = '#000000'
        renderAxesToCanvas(this.ctx, {
            xScale,
            yScale,
            width,
            height,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft,
            theme,
        })

        points.forEach(point => {
            this.ctx.beginPath()
            this.ctx.arc(point.x, point.y, getSymbolSize(point.data) / 2, 0, 2 * Math.PI)
            this.ctx.fillStyle = getColor(point.data)
            this.ctx.fill()
        })

        if (useMesh === true && debugMesh === true) {
            const { pointIndex } = this.state
            renderVoronoiToCanvas(this.ctx, voronoi)
            if (pointIndex !== null) {
                renderVoronoiCellToCanvas(this.ctx, voronoi, pointIndex)
            }
        }

        const legendData = data.map(serie => ({
            id: serie.id,
            label: serie.id,
            color: getColor({ serie }),
        }))

        legends.forEach(legend => {
            renderLegendToCanvas(this.ctx, {
                ...legend,
                data: legendData,
                containerWidth: width,
                containerHeight: height,
                theme,
            })
        })
    }

    render() {
        const { outerWidth, outerHeight, pixelRatio, isInteractive, theme } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => (
                    <canvas
                        ref={surface => {
                            this.surface = surface
                        }}
                        width={outerWidth * pixelRatio}
                        height={outerHeight * pixelRatio}
                        style={{
                            width: outerWidth,
                            height: outerHeight,
                        }}
                        onMouseEnter={this.handleMouseHover(showTooltip, hideTooltip)}
                        onMouseMove={this.handleMouseHover(showTooltip, hideTooltip)}
                        onMouseLeave={this.handleMouseLeave(hideTooltip)}
                        onClick={this.handleClick}
                    />
                )}
            </Container>
        )
    }
}

ScatterPlotCanvas.propTypes = ScatterPlotPropTypes

export default enhanceCanvas(ScatterPlotCanvas)
*/
