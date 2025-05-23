import { createElement, forwardRef, Fragment, ReactNode, Ref } from 'react'
import { Container, SvgWrapper, useDimensions } from '@nivo/core'
import { RectNodes, RectLabels, RectLabelSvg } from '@nivo/rects'
import { BulletLayerId, BulletSvgProps, BulletNodeValue } from './types'
import { svgDefaultProps } from './defaults'
import { useBullet } from './hooks'
import { BulletAxesLayer } from './BulletAxesLayer'
import { BulletValuesLayer } from './BulletValuesLayer'
import { BulletTargetsLayer } from './BulletTargetsLayer'
import { BulletInteractionsLayer } from './BulletInteractionsLayer'

export const Bullet = forwardRef((props: BulletSvgProps, forwardedRef: Ref<SVGSVGElement>) => {
    const {
        margin: partialMargin,
        width,
        height,
        data,
        scale,
        baseline,
        valueFormat,
        layout,
        spacing,
        valueComponent,
        valueSize,
        valuePadding,
        valueColor,
        valueBorderRadius,
        valueBorderWidth,
        valueBorderColor,
        targetSize,
        targetThickness,
        // targetBorderRadius,
        rangeComponent,
        rangeSize,
        // rangeColors,
        rangeBorderRadius,
        rangeBorderWidth,
        rangeBorderColor,
        axisBefore,
        axisAfter,
        enableTitles,
        titleAnchor,
        titleAlign,
        titleBaseline,
        titlePaddingX,
        titlePaddingY,
        titleOffsetX,
        titleOffsetY,
        titleRotation,
        titleColor,
        enableValueLabels,
        valueLabelAnchor,
        valueLabelIsOutside,
        valueLabelAlign,
        valueLabelBaseline,
        valueLabelPaddingX,
        valueLabelPaddingY,
        valueLabelOffsetX,
        valueLabelOffsetY,
        valueLabelRotation,
        // valueLabelColor,
        overrides,
        theme,
        layers,
        animate,
        motionConfig,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        onDoubleClick,
        onFocus,
        onBlur,
        onKeyDown,
        onWheel,
        onContextMenu,
        tooltip,
        role,
    } = { ...svgDefaultProps, ...props }

    const { margin, innerWidth, innerHeight } = useDimensions(width, height, partialMargin)

    const { nodes, valueNodes, targetNodes, rangeNodes } = useBullet({
        data,
        scale,
        baseline,
        valueFormat,
        layout,
        width: innerWidth,
        height: innerHeight,
        spacing,
        valueSize,
        valuePadding,
        valueColor,
        targetSize,
        targetThickness,
        rangeSize,
        overrides,
    })

    const layerById: Record<BulletLayerId, ReactNode> = {
        axes: null,
        ranges: null,
        values: null,
        targets: null,
        titles: null,
        valueLabels: null,
        interactions: null,
    }

    if (layers.includes('axes')) {
        layerById.axes = (
            <BulletAxesLayer
                key="axes"
                nodes={nodes}
                layout={layout}
                valuePadding={valuePadding}
                axisBefore={axisBefore}
                axisAfter={axisAfter}
                overrides={overrides}
            />
        )
    }

    if (layers.includes('ranges')) {
        layerById.ranges = (
            <RectNodes
                key="ranges"
                nodes={rangeNodes}
                uid="id"
                borderRadius={rangeBorderRadius}
                borderColor={rangeBorderColor}
                borderWidth={rangeBorderWidth}
                isInteractive={isInteractive}
                component={rangeComponent}
            />
        )
    }

    if (layers.includes('values')) {
        layerById.values = (
            <BulletValuesLayer
                key="values"
                nodes={valueNodes}
                component={valueComponent}
                borderRadius={valueBorderRadius}
                borderColor={valueBorderColor}
                borderWidth={valueBorderWidth}
                isInteractive={isInteractive}
                tooltip={tooltip}
            />
        )
    }

    if (layers.includes('targets')) {
        layerById.targets = <BulletTargetsLayer key="targets" targets={targetNodes} />
    }

    if (enableTitles && layers.includes('titles')) {
        layerById.titles = (
            <RectLabels
                key="titles"
                nodes={nodes}
                uid="id"
                label="id"
                boxAnchor={titleAnchor}
                isOutside={true}
                align={titleAlign}
                baseline={titleBaseline}
                paddingX={titlePaddingX}
                paddingY={titlePaddingY}
                offsetX={titleOffsetX}
                offsetY={titleOffsetY}
                rotation={titleRotation}
                textColor={titleColor}
                component={RectLabelSvg}
            />
        )
    }

    if (enableValueLabels && layers.includes('valueLabels')) {
        layerById.valueLabels = (
            <RectLabels
                key="valueLabels"
                nodes={valueNodes}
                uid="id"
                label="formattedValue"
                boxAnchor={valueLabelAnchor}
                isOutside={valueLabelIsOutside}
                align={valueLabelAlign}
                baseline={valueLabelBaseline}
                paddingX={valueLabelPaddingX}
                paddingY={valueLabelPaddingY}
                offsetX={valueLabelOffsetX}
                offsetY={valueLabelOffsetY}
                rotation={valueLabelRotation}
                textColor={{ from: 'color', modifiers: [['darker', 3]] }}
                component={RectLabelSvg}
            />
        )
    }

    if (layers.includes('interactions')) {
        layerById.interactions = <BulletInteractionsLayer key="interactions" nodes={nodes} tooltip={tooltip}/>
    }

    return (
        <Container
            isInteractive={isInteractive}
            theme={theme}
            animate={animate}
            motionConfig={motionConfig}
        >
            <SvgWrapper
                width={width}
                height={height}
                margin={margin}
                role={role}
                ref={forwardedRef}
            >
                {layers.map((layer, i) => {
                    if (typeof layer === 'function') {
                        return <Fragment key={i}>{createElement(layer, {})}</Fragment>
                    }

                    return layerById?.[layer] ?? null
                })}
                {nodes.map(node => {
                    return (
                        <rect
                            key={node.id}
                            fill="none"
                            stroke="red"
                            strokeWidth={1}
                            x={node.rect.x}
                            y={node.rect.y}
                            width={node.rect.width}
                            height={node.rect.height}
                            opacity={0}
                        />
                    )
                })}
            </SvgWrapper>
        </Container>
    )
})
