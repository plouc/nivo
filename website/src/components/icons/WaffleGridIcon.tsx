import React from 'react'
import { WaffleGrid, WaffleGridSvgProps } from '@nivo/waffle-grid'
import imgLightNeutralImg from '../../assets/icons/waffle-grid-light-neutral.png'
import imgLightColoredImg from '../../assets/icons/waffle-grid-light-colored.png'
import imgDarkNeutralImg from '../../assets/icons/waffle-grid-dark-neutral.png'
import imgDarkColoredImg from '../../assets/icons/waffle-grid-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

const data: WaffleGridSvgProps['data'] = [
    [8, 5],
    [4, 3],
]

const WaffleGridIconItem = ({ type }: { type: IconType }) => (
    <Icon id={`waffle-grid-${type}`} type={type}>
        <WaffleGrid
            data={data}
            xRange={['A', 'B']}
            yRange={['A', 'B']}
            cellValue={1}
            height={ICON_SIZE}
            width={ICON_SIZE}
            blankCellColor={colors[type].colors[0]}
            valueCellColor={colors[type].colors[3]}
            isInteractive={false}
            animate={false}
        />
    </Icon>
)

export const WaffleGridIcon = () => (
    <>
        <WaffleGridIconItem type="lightNeutral" />
        <IconImg url={imgLightNeutralImg} />
        <WaffleGridIconItem type="lightColored" />
        <IconImg url={imgLightColoredImg} />
        <WaffleGridIconItem type="darkNeutral" />
        <IconImg url={imgDarkNeutralImg} />
        <WaffleGridIconItem type="darkColored" />
        <IconImg url={imgDarkColoredImg} />
    </>
)
