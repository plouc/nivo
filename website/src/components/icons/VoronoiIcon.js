/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Voronoi } from '@nivo/voronoi'
import voronoiLightNeutralImg from '../../assets/icons/voronoi-light-neutral.png'
import voronoiLightColoredImg from '../../assets/icons/voronoi-light-colored.png'
import voronoiDarkNeutralImg from '../../assets/icons/voronoi-dark-neutral.png'
import voronoiDarkColoredImg from '../../assets/icons/voronoi-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

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
    isInteractive: false,
    animate: false,
}

const VoronoiIconItem = ({ type }) => (
    <Icon id={`voronoi-${type}`} type={type}>
        <Voronoi
            {...chartProps}
            cellLineColor={colors[type].colors[4]}
            pointColor={colors[type].colors[2]}
            layers={[
                props => (
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

const VoronoiIcon = () => (
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

export default VoronoiIcon
