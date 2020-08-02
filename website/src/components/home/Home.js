/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { useTheme } from '../../theming/context'
import { Container, HomeBaseline, HomeLogo } from './styled'
import HomeChord from './HomeChord'
import HomeLine from './HomeLine'
import HomeBubble from './HomeBubble'
import HomeBar from './HomeBar'
import HomeStream from './HomeStream'
import HomePie from './HomePie'
import HomeCalendar from './HomeCalendar'
import HomeRadar from './HomeRadar'
import HomeVoronoi from './HomeVoronoi'
import HomeTreeMap from './HomeTreeMap'
import HomeSunburst from './HomeSunburst'
import HomeSankey from './HomeSankey'
import HomeSwarmPlot from './HomeSwarmPlot'
import logoImg from '../../assets/nivo-logo.png'

const Home = () => {
    const theme = useTheme()

    const colors = theme.colors.coloredRange.slice(1)
    const reversedColors = [...colors].reverse()

    const nivoTheme = {
        axis: {
            ticks: {
                line: {
                    stroke: theme.colors.coloredRange[4],
                },
                text: {
                    fill: theme.colors.coloredRange[4],
                    fontSize: 9,
                },
            },
        },
        grid: {
            line: {
                stroke: theme.colors.coloredRange[4],
                strokeWidth: 1,
                strokeDasharray: '1,3',
            },
        },
        labels: {
            text: {
                fill: theme.colors.coloredRange[4],
            },
        },
    }

    return (
        <Container>
            <HomeChord
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
            />
            <HomeLine
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
            />
            <HomeBubble
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
            />
            <HomeBar
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
                isHorizontal={false}
            />
            <HomeBar
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
                isHorizontal={true}
            />
            <HomeLogo
                to="/components"
                style={{
                    backgroundImage: `url(${logoImg})`,
                }}
            />
            <HomeBaseline>
                nivo provides a rich set of dataviz components, built on top of the awesome d3 and
                Reactjs libraries.
            </HomeBaseline>
            <HomeStream
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
            />
            <HomePie
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
            />
            <HomeCalendar
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
            />
            <HomeRadar
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
            />
            <HomeVoronoi
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
            />
            <HomeTreeMap
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
            />
            <HomeSunburst
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
            />
            <HomeSankey
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
            />
            <HomeSwarmPlot
                colors={colors}
                reversedColors={reversedColors}
                theme={theme}
                nivoTheme={nivoTheme}
            />
        </Container>
    )
}

export default Home
