import React from 'react'
import { withTheme } from 'styled-components'
import { linearGradientDef } from '@nivo/core'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveStream } from '@nivo/stream'
import { ResponsiveTreeMap } from '@nivo/treemap'
import { generateCountriesData } from '@nivo/generators'
import Banner from '../../Banner'
import GuideIllustrations from '../GuideIllustrations'
import GuideIllustrationsItem from '../GuideIllustrationsItem'
import GuideIllustrationsLegend from '../GuideIllustrationsLegend'

const GradientsIllustrations = ({ theme }) => (
    <Banner>
        <GuideIllustrations>
            <GuideIllustrationsItem>
                <ResponsiveStream
                    margin={{ top: -2, right: -2, bottom: -2, left: -2 }}
                    data={generateCountriesData(['a', 'b', 'c'], { size: 9 })}
                    indexBy="country"
                    keys={['a', 'b', 'c']}
                    offsetType="expand"
                    axisLeft={null}
                    axisBottom={null}
                    enableGridX={false}
                    defs={[
                        linearGradientDef('example1A', [
                            { offset: 0, color: '#faed94' },
                            { offset: 30, color: '#faf047' },
                            { offset: 100, color: '#e4b400' },
                        ]),
                        linearGradientDef('example1B', [
                            { offset: 0, color: '#a8f9eb' },
                            { offset: 30, color: '#97e3d5' },
                            { offset: 100, color: '#458a7d' },
                        ]),
                        linearGradientDef('example1C', [
                            { offset: 0, color: '#f9804e' },
                            { offset: 30, color: '#f96a3d' },
                            { offset: 100, color: '#a84f35' },
                        ]),
                    ]}
                    fill={[
                        { match: { id: 'a' }, id: 'example1A' },
                        { match: { id: 'b' }, id: 'example1B' },
                        { match: { id: 'c' }, id: 'example1C' },
                    ]}
                    isInteractive={false}
                    animate={false}
                    theme={theme.nivo}
                />
            </GuideIllustrationsItem>
            <GuideIllustrationsItem>
                <ResponsiveBar
                    margin={{ top: 15, right: 10, bottom: -2, left: 10 }}
                    data={generateCountriesData(['a'], { size: 7 })}
                    indexBy="country"
                    keys={['a']}
                    padding={0.2}
                    axisLeft={null}
                    axisBottom={null}
                    enableGridY={false}
                    enableLabel={false}
                    colorBy="index"
                    defs={[
                        linearGradientDef('example2', [
                            { offset: 0, color: 'inherit' },
                            { offset: 40, color: 'inherit' },
                            { offset: 100, color: 'inherit', opacity: 0.3 },
                        ]),
                    ]}
                    fill={[{ match: '*', id: 'example2' }]}
                    borderWidth={1}
                    borderColor="inherit:darker(0.2)"
                    isInteractive={false}
                    animate={false}
                    theme={theme.nivo}
                />
            </GuideIllustrationsItem>
            <GuideIllustrationsItem>
                <ResponsiveTreeMap
                    margin={{ top: -2, right: -2, bottom: -2, left: -2 }}
                    root={{
                        country: 'root',
                        children: generateCountriesData(['value'], { size: 9 }),
                    }}
                    identity="country"
                    value="value"
                    leavesOnly={true}
                    colorBy="country"
                    borderWidth={2}
                    borderColor="#333"
                    isInteractive={false}
                    animate={false}
                    enableLabel={false}
                    defs={[
                        linearGradientDef('example2', [
                            { offset: 0, color: 'inherit' },
                            { offset: 40, color: 'inherit' },
                            { offset: 100, color: 'inherit', opacity: 0.3 },
                        ]),
                    ]}
                    fill={[{ match: '*', id: 'example2' }]}
                    theme={theme.nivo}
                />
            </GuideIllustrationsItem>
            <GuideIllustrationsLegend>
                gradients applied to various nivo components.
            </GuideIllustrationsLegend>
        </GuideIllustrations>
    </Banner>
)

export default withTheme(GradientsIllustrations)
