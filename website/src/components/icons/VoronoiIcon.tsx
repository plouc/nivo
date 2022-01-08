import React from 'react'
import { Voronoi, VoronoiSvgProps } from '@nivo/voronoi'
import voronoiLightNeutralImg from '../../assets/icons/voronoi-light-neutral.png'
import voronoiLightColoredImg from '../../assets/icons/voronoi-light-colored.png'
import voronoiDarkNeutralImg from '../../assets/icons/voronoi-dark-neutral.png'
import voronoiDarkColoredImg from '../../assets/icons/voronoi-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },
    xDomain: [0, 100],
    yDomain: [0, 100],
    data: [
        { id: '0', x: 15, y: 15 },
        { id: '1', x: 20, y: 40 },
        { id: '2', x: 30, y: 70 },
        { id: '3', x: 80, y: 20 },
        { id: '4', x: 50, y: 50 },
        { id: '5', x: 40, y: 20 },
    ],
    cellLineWidth: 3,
    pointSize: 10,
} as VoronoiSvgProps

const VoronoiIconItem = ({ type }: { type: IconType }) => (
    <Icon id={`voronoi-${type}`} type={type}>
        <Voronoi
            {...chartProps}
            cellLineColor={colors[type].colors[4]}
            pointColor={colors[type].colors[2]}
            layers={[
                (props: any) => (
                    <rect width={props.width} height={props.width} fill={colors[type].colors[0]} />
                ),
                'links',
                'cells',
                'points',
                'bounds',
            ]}
        />
    </Icon>
)

export const VoronoiIcon = () => (
    <>
        <VoronoiIconItem type="lightNeutral" />
        <IconImg url={voronoiLightNeutralImg} />
        <VoronoiIconItem type="lightColored" />
        <IconImg url={voronoiLightColoredImg} />
        <VoronoiIconItem type="darkNeutral" />
        <IconImg url={voronoiDarkNeutralImg} />
        <VoronoiIconItem type="darkColored" />
        <IconImg url={voronoiDarkColoredImg} />
    </>
)
