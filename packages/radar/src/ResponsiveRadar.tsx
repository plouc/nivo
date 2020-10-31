/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { BaseRadarDatum } from './hooks'
import Radar, { RadarProps } from './Radar'

export interface ResponsiveRadarProps<Datum extends BaseRadarDatum>
    extends Omit<RadarProps<Datum>, 'width' | 'height'> {}

export function ResponsiveRadar<Datum extends BaseRadarDatum>(props: ResponsiveRadarProps<Datum>) {
    return (
        <ResponsiveWrapper>
            {({ width, height }) => <Radar width={width} height={height} {...props} />}
        </ResponsiveWrapper>
    )
}
