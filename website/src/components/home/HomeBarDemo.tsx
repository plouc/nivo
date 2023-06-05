import React from 'react'
import { Bar } from '@bitbloom/nivo-bar'
import { generateCountriesData } from '@bitbloom/nivo-generators'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

export const HomeBarDemo = ({ isHorizontal = false }: { isHorizontal: boolean }) => {
    const { colors, nivoTheme } = useHomeTheme()
    const data = isHorizontal
        ? generateCountriesData(['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut'], {
              size: 9,
          })
        : generateCountriesData(['hot dogs', 'burgers', 'sandwich'], {
              size: 11,
          })

    const keys = isHorizontal
        ? ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']
        : ['hot dogs', 'burgers', 'sandwich']

    return (
        <div id={`bar-${isHorizontal ? 'horizontal' : 'vertical'}`}>
            <Bar
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={data}
                indexBy="country"
                keys={keys}
                layout={isHorizontal ? 'horizontal' : 'vertical'}
                groupMode={isHorizontal ? 'stacked' : 'grouped'}
                padding={0.1}
                colors={colors}
                borderWidth={1}
                borderColor={colors[3]}
                theme={nivoTheme}
                enableGridX
                enableGridY
                enableLabel={false}
                animate={false}
                isInteractive={false}
                axisLeft={null}
                axisBottom={null}
            />
        </div>
    )
}
