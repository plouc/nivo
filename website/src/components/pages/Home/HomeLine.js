/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { redColorRange } from '../../../colors'
import range from 'lodash/range'
import random from 'lodash/random'
import { ResponsiveWrapper } from '@nivo/core'
import {
    generateDayCounts,
    generateLibTree,
    generateDrinkStats,
    generateProgrammingLanguageStats,
    generateCountriesData,
    generateWinesTastes,
} from '@nivo/generators'
import {} from '@nivo/line'

const colors = redColorRange

const homeTheme = {
    axis: {
        fontSize: '9px',
        textColor: '#c6432d',
        tickColor: '#c6432d',
    },
    grid: {
        stroke: '#c6432d',
        strokeWidth: 1,
        strokeDasharray: '1,3',
    },
}

const commonAxes = {
    axisLeft: {
        tickSize: 4,
        tickPadding: 2,
    },
    axisBottom: {
        tickSize: 4,
        tickPadding: 2,
    },
}

const HomeLine = () => (
    <Link className="home_item" to="/line">
        <ResponsiveWrapper>
            {({ width, height }) => null}
            {/*
        <ResponsiveLine
            margin={{ top: 10, bottom: 15, left: 24, right: 10 }}
            data={generateDrinkStats(12)}
            stacked={true}
            curve="monotoneX"
            theme={homeTheme}
            colors={colors}
            animate={false}
            isInteractive={false}
            {...commonAxes}
            dotSize={7}
            dotBorderWidth={1}
            dotBorderColor="#e25d47"
        />
        */}
        </ResponsiveWrapper>
        <span className="home_item_label">
            <span>Line</span>
        </span>
    </Link>
)

export default HomeLine
