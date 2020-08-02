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
import { ResponsiveTreeMapCanvas } from '@nivo/treemap'
import { HomeItem, HomeItemLabel } from './styled'

const HomeTreeMap = ({ colors, nivoTheme }) => {
    return (
        <HomeItem to="/treemap">
            <ResponsiveTreeMapCanvas
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                data={generateLibTree()}
                identity="name"
                value="loc"
                valueFormat=".02s"
                colors={colors}
                leavesOnly={true}
                borderWidth={0}
                innerPadding={1}
                animate={false}
                isInteractive={false}
                enableLabel={true}
                labelTextColor={colors[1]}
                borderColor="none"
                theme={nivoTheme}
            />
            <HomeItemLabel>
                <span>TreeMap documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default HomeTreeMap
