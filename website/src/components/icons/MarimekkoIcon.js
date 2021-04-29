import React from 'react'
import { Marimekko } from '@nivo/marimekko'
import marimekkoLightNeutralImg from '../../assets/icons/marimekko-light-neutral.png'
import marimekkoLightColoredImg from '../../assets/icons/marimekko-light-colored.png'
import marimekkoDarkNeutralImg from '../../assets/icons/marimekko-dark-neutral.png'
import marimekkoDarkColoredImg from '../../assets/icons/marimekko-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    id: 'id',
    value: 'value',
    innerPadding: 4,
    margin: {
        top: 12,
        bottom: 16,
    },
    enableGridX: false,
    enableGridY: false,
    offset: 'expand',
    data: [
        { id: '0', value: 2, A: 1, B: 2, C: 3 },
        { id: '1', value: 1, A: 2, B: 2, C: 2 },
        { id: '2', value: 3, A: 3, B: 2, C: 1 },
    ],
    dimensions: [
        { id: 'A', value: 'A' },
        { id: 'B', value: 'B' },
        { id: 'C', value: 'C' },
    ],
    isInteractive: false,
    animate: false,
}

const MarimekkoIconItem = ({ type }) => (
    <Icon id={`marimekko-${type}`} type={type}>
        <Marimekko
            {...chartProps}
            colors={[colors[type].colors[1], colors[type].colors[2], colors[type].colors[4]]}
        />
    </Icon>
)

const BarIcon = () => (
    <>
        <MarimekkoIconItem type="lightNeutral" />
        <IconImg url={marimekkoLightNeutralImg} />
        <MarimekkoIconItem type="lightColored" />
        <IconImg url={marimekkoLightColoredImg} />
        <MarimekkoIconItem type="darkNeutral" />
        <IconImg url={marimekkoDarkNeutralImg} />
        <MarimekkoIconItem type="darkColored" />
        <IconImg url={marimekkoDarkColoredImg} />
    </>
)

export default BarIcon
