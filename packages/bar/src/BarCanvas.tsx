// @ts-nocheck
import { BarCanvasProps, BarDatum, TooltipHandlers } from './types'
import { forwardRef, Component, ForwardedRef } from 'react'
import uniqBy from 'lodash/uniqBy'
// @ts-ignore LegacyContainer
import { getRelativeCursor, isCursorInRect, LegacyContainer } from '@nivo/core'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { renderLegendToCanvas } from '@nivo/legends'
import { BasicTooltip } from '@nivo/tooltip'
import { generateGroupedBars, generateStackedBars } from './compute'
// import { canvasDefaultProps } from './props'

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/ban-types
    function forwardRef<T, P = {}>(
        render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
    ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}

type InnerBarCanvasProps<RawDatum extends BarDatum> = BarCanvasProps<RawDatum> & {
    canvasRef: ForwardedRef<HTMLCanvasElement>
}

const findNodeUnderCursor = (nodes, margin, x, y) =>
    nodes.find(node =>
        isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y)
    )

class InnerBarCanvas<RawDatum extends BarDatum> extends Component<InnerBarCanvasProps<RawDatum>> {
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

    draw(props) {
        const {
            data,
            keys,
            getIndex,
            minValue,
            maxValue,

            valueScale,
            indexScale,

            width,
            height,
            outerWidth,
            outerHeight,
            pixelRatio,
            margin,

            layout,
            reverse,
            groupMode,
            padding,
            innerPadding,

            axisTop,
            axisRight,
            axisBottom,
            axisLeft,

            theme,
            getColor,
            borderWidth,
            getBorderColor,

            legends,

            enableGridX,
            gridXValues,
            enableGridY,
            gridYValues,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        const options = {
            layout,
            reverse,
            data,
            getIndex,
            keys,
            minValue,
            maxValue,
            width,
            height,
            getColor,
            padding,
            innerPadding,
            valueScale,
            indexScale,
            hiddenIds: [],
        }

        const result =
            groupMode === 'grouped' ? generateGroupedBars(options) : generateStackedBars(options)

        this.bars = result.bars

        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        if (theme.grid.line.strokeWidth > 0) {
            this.ctx.lineWidth = theme.grid.line.strokeWidth
            this.ctx.strokeStyle = theme.grid.line.stroke

            enableGridX &&
                renderGridLinesToCanvas(this.ctx, {
                    width,
                    height,
                    scale: result.xScale,
                    axis: 'x',
                    values: gridXValues,
                })

            enableGridY &&
                renderGridLinesToCanvas(this.ctx, {
                    width,
                    height,
                    scale: result.yScale,
                    axis: 'y',
                    values: gridYValues,
                })
        }

        this.ctx.strokeStyle = '#dddddd'

        const legendDataForKeys = uniqBy(
            result.bars
                .map(bar => ({
                    id: bar.data.id,
                    label: bar.data.id,
                    color: bar.color,
                    fill: bar.data.fill,
                }))
                .reverse(),
            ({ id }) => id
        )
        const legendDataForIndexes = uniqBy(
            result.bars.map(bar => ({
                id: bar.data.indexValue,
                label: bar.data.indexValue,
                color: bar.color,
                fill: bar.data.fill,
            })),
            ({ id }) => id
        )

        legends.forEach(legend => {
            let legendData
            if (legend.dataFrom === 'keys') {
                legendData = legendDataForKeys
            } else if (legend.dataFrom === 'indexes') {
                legendData = legendDataForIndexes
            }

            if (legendData === undefined) return null
            renderLegendToCanvas(this.ctx, {
                ...legend,
                data: legendData,
                containerWidth: width,
                containerHeight: height,
                itemTextColor: '#999',
                symbolSize: 16,
                theme,
            })
        })

        renderAxesToCanvas(this.ctx, {
            xScale: result.xScale,
            yScale: result.yScale,
            width,
            height,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft,
            theme,
        })

        result.bars.forEach(bar => {
            const { x, y, color, width, height } = bar

            this.ctx.fillStyle = color
            if (borderWidth > 0) {
                this.ctx.strokeStyle = getBorderColor(bar)
                this.ctx.lineWidth = borderWidth
            }

            this.ctx.beginPath()
            this.ctx.rect(x, y, width, height)
            this.ctx.fill()

            if (borderWidth > 0) {
                this.ctx.stroke()
            }
        })
    }

    handleMouseHover = (showTooltip, hideTooltip) => event => {
        if (!this.bars) return

        const { margin, theme, tooltip, getTooltipLabel, tooltipFormat } = this.props
        const [x, y] = getRelativeCursor(this.surface, event)

        const bar = findNodeUnderCursor(this.bars, margin, x, y)

        if (bar !== undefined) {
            showTooltip(
                <BasicTooltip
                    id={getTooltipLabel(bar.data)}
                    value={bar.data.value}
                    enableChip={true}
                    color={bar.color}
                    theme={theme}
                    format={tooltipFormat}
                    renderContent={
                        typeof tooltip === 'function'
                            ? tooltip.bind(null, { color: bar.color, ...bar.data })
                            : null
                    }
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

    handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!this.bars) return

        const { margin, onClick } = this.props
        const [x, y] = getRelativeCursor(this.surface, event)

        const node = findNodeUnderCursor(this.bars, margin, x, y)
        if (node !== undefined) onClick(node.data, event)
    }

    render() {
        const {
            width: outerWidth,
            height: outerHeight,
            pixelRatio,
            isInteractive,
            renderWrapper,
            theme,
            canvasRef,
        } = this.props

        return (
            <LegacyContainer {...{ isInteractive, renderWrapper, theme }} animate={false}>
                {({ showTooltip, hideTooltip }: TooltipHandlers) => (
                    <canvas
                        ref={surface => {
                            this.surface = surface
                            if (canvasRef) canvasRef.current = surface
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
            </LegacyContainer>
        )
    }
}

export const BarCanvas = forwardRef(
    <RawDatum extends BarDatum>(
        props: BarCanvasProps<RawDatum>,
        ref: ForwardedRef<HTMLCanvasElement>
    ) => <InnerBarCanvas {...props} canvasRef={ref} />
)
