import styled from 'styled-components'
import { animated } from '@react-spring/web'
import { IcicleHtml, IcicleNodeComponent, IcicleOrientation, useIcicleContext } from '@nivo/icicle'
import { bonsaiData, BonsaiNode, withLogDisplay, invertLogDisplay } from './bonsais'
import shimpakuImg from '../assets/imgs/shimpaku.png'

const Label = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 26px;
    background: rgb(218, 218, 202);
    color: #121b02;
    font-size: 12px;
    font-weight: 600;
    border-radius: 13px;
    max-width: 100%;
    pointer-events: none;
    user-select: none;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.35);
    transition: border-radius 0.4s ease-in-out;
`

const LabelText = styled.span`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

const RootNodeWrapper = styled(animated.div)<{
    orientation: IcicleOrientation
}>`
    position: absolute;
    overflow: hidden;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    flex-direction: ${({ orientation }) =>
        orientation === 'top' || orientation === 'bottom' ? 'row' : 'column'};
    justify-content: flex-start;
    align-items: center;
    color: #dadaca;

    & > div:first-child {
        flex: 1;
        height: ${({ orientation }) =>
            orientation === 'top' || orientation === 'bottom' ? '100%' : 'auto'};
        display: flex;
        flex-direction: column;
        justify-content: ${({ orientation }) =>
            orientation === 'top' || orientation === 'bottom' ? 'flex-end' : 'flex-start'};
        align-items: flex-start;
        padding: 16px;
        line-height: 20px;
        text-align: left;
    }
`

const RootNodeIllustration = styled.div`
    width: 300px;
    height: 300px;
    background-image: url(${shimpakuImg});
    background-size: cover;
    background-repeat: no-repeat;
`

const Title = styled.h1`
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: 500;
`

const Description = styled.div`
    margin: 6px 0 0;
    padding: 0;
    font-size: 14px;
    font-weight: 400;
    opacity: 0.6;

    a {
        color: inherit;
        cursor: pointer;
        font-weight: 600;
    }
`

const NodeWrapper = styled(animated.div)<{
    img?: string
}>`
    position: absolute;
    padding: 0 9px;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-repeat: repeat;
    background-size: 120px 120px;
    background-position: center center;
    transform-origin: center center;

    ${({ img }) => {
        if (!img) return null

        return `background-image: url(${img});`
    }}
`

const TooltipWrapper = styled.div`
    padding: 9px 12px;
    font-size: 12px;
    color: #dadaca;
    border-radius: 2px;
    box-shadow: 0 0 0 1px #dadaca;
`

const CustomNodeComponent: IcicleNodeComponent<BonsaiNode> = ({
    node,
    style,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}) => {
    const { orientation } = useIcicleContext()
    const isRoot = node.hierarchy.depth === 0

    if (isRoot) {
        return (
            <RootNodeWrapper
                orientation={orientation!}
                style={{
                    top: style.y,
                    left: style.x,
                    width: style.width,
                    height: style.height,
                    backgroundColor: node.color,
                }}
                onClick={onClick}
            >
                <div>
                    <Title>Tree species commonly used for bonsai cultivation</Title>
                    <Description>
                        Sized by number of cultivars (fake data).
                        <br />
                        You can find the source code for this chart{' '}
                        <a href="https://github.com/plouc/nivo/blob/master/storybook/stories/icicle/BonsaisIcicle.tsx">
                            here
                        </a>
                        .
                    </Description>
                </div>
                <RootNodeIllustration />
            </RootNodeWrapper>
        )
    }

    return (
        <NodeWrapper
            style={{
                top: style.y,
                left: style.x,
                width: style.width,
                height: style.height,
                backgroundColor: node.color,
            }}
            img={node.data.img}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            {node.rect.width >= 80 && node.rect.height >= 36 && (
                <Label>
                    <LabelText>{node.data.taxon}</LabelText>
                </Label>
            )}
        </NodeWrapper>
    )
}

export const BonsaiIcicle = ({ orientation }: { orientation: IcicleOrientation | undefined }) => {
    return (
        <IcicleHtml<BonsaiNode>
            width={800}
            height={600}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            theme={{
                background: '#dadaca',
            }}
            orientation={orientation}
            data={withLogDisplay(bonsaiData)}
            identity="taxon"
            value="displayValue"
            valueFormat={v => `${invertLogDisplay(v)}`}
            gapX={2}
            gapY={2}
            nodeComponent={CustomNodeComponent}
            colors={['#172b12', '#061715', '#172b12', '#373e1a', '#1c2904']}
            zoomMode="global"
            enableLabels={false}
            role="application"
            tooltip={node => (
                <TooltipWrapper style={{ backgroundColor: node.color }}>
                    <strong>{node.id}</strong>:<br />~
                    <strong>{node.data.aggCultivarCount || node.data.cultivarCount}</strong>{' '}
                    cultivars
                </TooltipWrapper>
            )}
        />
    )
}
