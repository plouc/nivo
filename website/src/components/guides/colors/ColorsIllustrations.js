import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveStream } from '@nivo/stream'
import { ResponsiveTreeMap } from '@nivo/treemap'
import { generateCountriesData } from '@nivo/generators'

const ColorsIllustrations = () => (
    <div className="banner">
        <div className="guide__illustrations">
            <div className="guide__illustrations__item">
                <ResponsiveStream
                    margin={{ top: -2, right: -2, bottom: -2, left: -2 }}
                    data={generateCountriesData(['a', 'b', 'c', 'd', 'e'], { size: 9 })}
                    indexBy="country"
                    keys={['a', 'b', 'c', 'd', 'e']}
                    offsetType="expand"
                    axisLeft={null}
                    axisBottom={null}
                    enableGridX={false}
                    colors="nivo"
                    borderWidth={0}
                    borderColor="#333"
                    isInteractive={false}
                    animate={false}
                />
            </div>
            <div className="guide__illustrations__item">
                <ResponsiveBar
                    margin={{ top: 15, right: 10, bottom: -2, left: 10 }}
                    data={generateCountriesData(['a'], { size: 9 })}
                    indexBy="country"
                    keys={['a']}
                    padding={0.2}
                    axisLeft={null}
                    axisBottom={null}
                    enableGridY={false}
                    enableLabel={false}
                    colors="paired"
                    colorBy="index"
                    borderWidth={0}
                    borderColor="#333"
                    isInteractive={false}
                    animate={false}
                />
            </div>
            <div className="guide__illustrations__item">
                <ResponsiveTreeMap
                    margin={{ top: -2, right: -2, bottom: -2, left: -2 }}
                    root={{
                        country: 'root',
                        children: generateCountriesData(['value'], { size: 18 }),
                    }}
                    colors="spectral"
                    identity="country"
                    value="value"
                    leavesOnly={true}
                    colorBy="country"
                    borderWidth={0}
                    borderColor="#333"
                    isInteractive={false}
                    animate={false}
                    enableLabel={false}
                />
            </div>
            <div className="guide__illustrations__legend">
                various color ranges applied to nivo components.
            </div>
        </div>
    </div>
)

export default ColorsIllustrations
