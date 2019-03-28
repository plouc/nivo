/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateChordData } from '@nivo/generators'
import { ResponsiveChordCanvas } from '@nivo/chord'
import { HomeItem, HomeItemLabel } from './styled'

const HomeChord = ({ colors }) => {
    return (
        <HomeItem to="/chord">
            <ResponsiveChordCanvas
                colors={colors}
                padAngle={0.04}
                innerRadiusRatio={0.9}
                {...generateChordData({ size: 7 })}
                enableLabel={false}
                isInteractive={false}
                animate={false}
                arcBorderWidth={0}
                ribbonBorderWidth={0}
            />
            <HomeItemLabel>
                <span>Chord documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default HomeChord
