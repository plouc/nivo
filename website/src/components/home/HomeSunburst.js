/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateLibTree } from '@nivo/generators'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { HomeItem, HomeItemLabel } from './styled'

const HomeSunburst = ({ colors }) => {
    return (
        <HomeItem to="/sunburst">
            <ResponsiveSunburst
                data={generateLibTree()}
                identity="name"
                value="loc"
                animate={false}
                isInteractive={false}
                colors={colors}
                borderColor={colors[1]}
            />
            <HomeItemLabel>
                <span>Sunburst documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default HomeSunburst
