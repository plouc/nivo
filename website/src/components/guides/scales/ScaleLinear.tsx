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

export const ScaleLinear = () => {
    const theme = useAxisTheme()

    return (
        <>
            <DescriptionBlock>
                <h2 id="linear-scale">
                    <a href="#linear-scale">Linear scale</a>
                </h2>
                <p>
                    A linear scale is the most basic quantitative (continuous) scale in D3. It
                    defines a piecewise‐linear mapping from a numeric input domain to a numeric
                    output range.
                </p>
                <CollapsibleTextExplanation title="Example" icon={<FaQuestionCircle />}>
                    <p>
                        Imagine you’re drawing a bar chart of tree heights that range from 0 cm up
                        to 200 cm, and you want those bars to be between 0 px and 400 px tall. A
                        linear scale will map:
                    </p>
                    <ul>
                        <li>0 cm → 0 px</li>
                        <li>50 cm → 100 px</li>
                        <li>100 cm → 200 px</li>
                        <li>150 cm → 300 px</li>
                        <li>200 cm → 400 px</li>
                    </ul>
                    <p>
                        so that every additional centimetre of real height adds exactly 2 pixels to
                        the bar’s height. That proportional, “straight-line” mapping between your
                        data domain (0–200 cm) and your visual range (0–400 px) is exactly what a
                        linear scale provides.
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
