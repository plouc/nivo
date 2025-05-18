import React from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import {
    // @ts-ignore
    MotionConfigProvider,
} from '@nivo/core'
import { ThemeProvider } from '@nivo/theming'
import { Axis } from '@nivo/axes'
import { FullWidthBanner, DescriptionBlock } from '../../styled'
import { CollapsibleTextExplanation } from '../CollapsibleTextExplanation'
import { linearXScale, linearYScale } from '../axes/scales'
import { useAxisTheme } from '../axes/theme'

const axisPositions = ['start', 'middle', 'end'] as const

export const ScaleBand = () => {
    const theme = useAxisTheme()

    return (
        <>
            <DescriptionBlock>
                <h2 id="band-scale">
                    <a href="#band-scale">Band scale</a>
                </h2>
                <p>
                    A band scale is an ordinal scale that maps a set of discrete input values (your
                    categories) to a continuous numeric output range by dividing that range into
                    uniform “bands.” It’s perfect for bar charts or any time you need evenly-spaced
                    slots for each category.
                </p>
                <CollapsibleTextExplanation title="Example" icon={<FaQuestionCircle />}>
                    <p>
                        Imagine you want to draw five bars for 5 tree species, in a 500 px-wide
                        chart:
                    </p>
                    <ul>
                        <li>
                            Domain: <code>["Pine","Maple","Juniper","Azalea","Wisteria"]</code>
                        </li>
                        <li>
                            Range: <code>[0 px … 500 px]</code>
                        </li>
                        <li>
                            Band width: <code>500 px ÷ 5 = 100 px</code> (assuming no padding)
                        </li>
                    </ul>
                    <p>The scale would map:</p>
                    <ul>
                        <li>"Pine" → 0 px</li>
                        <li>"Maple" → 100 px</li>
                        <li>"Juniper"→ 200 px</li>
                        <li>"Azalea" → 300 px</li>
                        <li>"Wisteria"→ 400 px</li>
                    </ul>
                    <p>
                        And it would have a bandwidth of 100 px, meaning that each bar would be 100
                        px wide. So you’d position each bar at x = scale(species) and size it width
                        = 100px, giving you five perfectly evenly-spaced bars.
                    </p>
                </CollapsibleTextExplanation>
                <p>
                    The way to define a linear scale for a nivo chart is to use a configuration
                    object with the following properties:
                </p>
                <p>
                    Nivo doesn't expose all of D3's <code>scaleLinear</code> API, but it does
                    provide a few useful properties to customize the scale:
                </p>
            </DescriptionBlock>
            <FullWidthBanner>
                <ThemeProvider theme={theme}>
                    <MotionConfigProvider animate={false}>
                        <div
                            className="guide__illustrations"
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <svg role="img" width={380} height={180}>
                                {axisPositions.map((position, i) => (
                                    <g key={position} transform={`translate(50,${i * 70 + 40})`}>
                                        <Axis
                                            axis="x"
                                            scale={linearXScale}
                                            length={280}
                                            legend={position}
                                            legendPosition={position}
                                            legendOffset={-32}
                                            ticksPosition="before"
                                        />
                                    </g>
                                ))}
                            </svg>
                            <svg role="img" width={260} height={260}>
                                {axisPositions.map((position, i) => (
                                    <g key={position} transform={`translate(${i * 90 + 50},50)`}>
                                        <Axis
                                            axis="y"
                                            scale={linearYScale}
                                            length={160}
                                            legend={position}
                                            legendPosition={position}
                                            legendOffset={-32}
                                            ticksPosition="before"
                                        />
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </MotionConfigProvider>
                </ThemeProvider>
            </FullWidthBanner>
        </>
    )
}
