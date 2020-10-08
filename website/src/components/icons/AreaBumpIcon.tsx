import React, { useMemo } from 'react'
import { Theme } from '@bitbloom/nivo-core'
import { AreaBump, AreaBumpSvgProps, AreaBumpSerieExtraProps } from '@bitbloom/nivo-bump'
import areaBumpLightNeutralImg from '../../assets/icons/area-bump-light-neutral.png'
import areaBumpLightColoredImg from '../../assets/icons/area-bump-light-colored.png'
import areaBumpDarkNeutralImg from '../../assets/icons/area-bump-dark-neutral.png'
import areaBumpDarkColoredImg from '../../assets/icons/area-bump-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

const chartProps: AreaBumpSvgProps<{ x: number; y: number }, AreaBumpSerieExtraProps> = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    data: [
        {
            id: 'A',
            data: [
                {
                    x: -1,
                    y: 2,
                },
                {
                    x: 0,
                    y: 2,
                },
                {
                    x: 1,
                    y: 3,
                },
                {
                    x: 2,
                    y: 3,
                },
                {
                    x: 3,
                    y: 3,
                },
            ],
        },
        {
            id: 'B',
            data: [
                {
                    x: -1,
                    y: 1,
                },
                {
                    x: 0,
                    y: 1,
                },
                {
                    x: 1,
                    y: 1,
                },
                {
                    x: 2,
                    y: 2,
                },
                {
                    x: 3,
                    y: 2,
                },
            ],
        },
        {
            id: 'C',
            data: [
                {
                    x: -1,
                    y: 2,
                },
                {
                    x: 0,
                    y: 2,
                },
                {
                    x: 1,
                    y: 2,
                },
                {
                    x: 2,
                    y: 1,
                },
                {
                    x: 3,
                    y: 1,
                },
            ],
        },
    ],
    margin: {
        top: 8,
        right: 5,
        bottom: 8,
        left: 5,
    },
    align: 'end',
    spacing: 4,
    borderWidth: 0,
    endLabel: false,
    axisTop: null,
    axisBottom: null,
    enableGridX: false,
    isInteractive: false,
}

const AreaBumpIconItem = ({ type }: { type: IconType }) => {
    const theme: Theme = useMemo(
        () => ({
            axis: {
                domain: {
                    line: {
                        stroke: colors[type].colors[3],
                        strokeWidth: 3,
                        strokeLinecap: 'square',
                    },
                },
            },
            grid: {
                line: {
                    strokeWidth: 2,
                    strokeOpacity: 0.5,
                    stroke: colors[type].colors[1],
                },
            },
        }),
        []
    )

    return (
        <Icon id={`area-bump-${type}`} type={type}>
            <AreaBump {...chartProps} colors={colors[type].colors} theme={theme} />
        </Icon>
    )
}

export const AreaBumpIcon = () => (
    <>
        <AreaBumpIconItem type="lightNeutral" />
        <IconImg url={areaBumpLightNeutralImg} />
        <AreaBumpIconItem type="lightColored" />
        <IconImg url={areaBumpLightColoredImg} />
        <AreaBumpIconItem type="darkNeutral" />
        <IconImg url={areaBumpDarkNeutralImg} />
        <AreaBumpIconItem type="darkColored" />
        <IconImg url={areaBumpDarkColoredImg} />
    </>
)
