import React from 'react'
import choroplethLightNeutralImg from '../../assets/icons/choropleth-light-neutral.png'
import choroplethLightColoredImg from '../../assets/icons/choropleth-light-colored.png'
import choroplethDarkNeutralImg from '../../assets/icons/choropleth-dark-neutral.png'
import choroplethDarkColoredImg from '../../assets/icons/choropleth-dark-colored.png'
import { Icon, colors, IconImg } from './styled'
import { MapIcon } from './MapIcon'
import { IconType } from './types'

const ChoroplethIconItem = ({ type }: { type: IconType }) => (
    <Icon id={`choropleth-${type}`} type={type}>
        <MapIcon
            stroke={colors[type].colors[4]}
            fill={colors[type].colors[0]}
            colors={[
                colors[type].colors[2],
                colors[type].colors[1],
                colors[type].colors[0],
                colors[type].colors[3],
                colors[type].colors[0],
                colors[type].colors[2],
                colors[type].colors[1],
                colors[type].colors[1],
                colors[type].colors[3],
                colors[type].colors[0],
                colors[type].colors[2],
                colors[type].colors[1],
                colors[type].colors[3],
            ]}
        />
    </Icon>
)

export const ChoroplethIcon = () => (
    <>
        <ChoroplethIconItem type="lightNeutral" />
        <IconImg url={choroplethLightNeutralImg} />
        <ChoroplethIconItem type="lightColored" />
        <IconImg url={choroplethLightColoredImg} />
        <ChoroplethIconItem type="darkNeutral" />
        <IconImg url={choroplethDarkNeutralImg} />
        <ChoroplethIconItem type="darkColored" />
        <IconImg url={choroplethDarkColoredImg} />
    </>
)
