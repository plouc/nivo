import { Container, SvgWrapper, useDimensions } from '@nivo/core'
import { Axis } from '@nivo/axes'
import { svgDefaultProps } from '../defaults'
import { useParallelCoordinates } from '../hooks'
import { ParallelCoordinatesProps, BaseDatum } from '../types'
import { ParallelCoordinatesLine } from './ParallelCoordinatesLine'

type InnerParallelCoordinatesProps<D extends BaseDatum> = Omit<
    ParallelCoordinatesProps<D>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerParallelCoordinates = <D extends BaseDatum>({
    data,
    variables,
    width,
    height,
    margin: partialMargin,
    layout = svgDefaultProps.layout,
    curve = svgDefaultProps.curve,
    axesTicksPosition,
    lineWidth = svgDefaultProps.lineWidth,
    lineOpacity = svgDefaultProps.lineOpacity,
    colors = svgDefaultProps.colors,
    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerParallelCoordinatesProps<D>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { variablesScale, variablesWithScale, computedData, lineGenerator } =
        useParallelCoordinates<D>({
            width: innerWidth,
            height: innerHeight,
            data,
            variables,
            layout,
            colors,
            curve,
        })

    console.log({
        variablesScale,
        variablesWithScale,
        computedData,
    })

    const axes = (
        <>
            {variablesWithScale.map(variable => (
                <Axis
                    key={variable.id}
                    axis={layout === 'horizontal' ? 'y' : 'x'}
                    length={layout === 'horizontal' ? innerHeight : innerWidth}
                    x={layout === 'horizontal' ? variablesScale(variable.id) : 0}
                    y={layout === 'horizontal' ? 0 : variablesScale(variable.id)}
                    scale={variable.scale}
                    ticksPosition={variable.ticksPosition || axesTicksPosition}
                    tickValues={variable.tickValues}
                    tickSize={variable.tickSize}
                    tickPadding={variable.tickPadding}
                    tickRotation={variable.tickRotation}
                    format={variable.tickFormat}
                    legend={variable.label || variable.id}
                    legendPosition={variable.legendPosition}
                    legendOffset={variable.legendOffset}
                />
            ))}
        </>
    )

    const lines = (
        <>
            {computedData.map(datum => (
                <ParallelCoordinatesLine<D>
                    key={datum.id}
                    data={datum}
                    variables={variables}
                    lineGenerator={lineGenerator}
                    lineWidth={lineWidth}
                    opacity={lineOpacity}
                />
            ))}
        </>
    )

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            role={role}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedBy={ariaDescribedBy}
        >
            {axes}
            {lines}
        </SvgWrapper>
    )
}

export const ParallelCoordinates = <D extends BaseDatum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: ParallelCoordinatesProps<D>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerParallelCoordinates<D> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
