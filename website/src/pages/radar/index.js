/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateWinesTastes } from '@nivo/generators'
import { ResponsiveRadar } from '@nivo/radar'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/radar/meta.yml'
import mapper from '../../data/components/radar/mapper'
import { groupsByScope } from '../../data/components/radar/props'

const initialProperties = {
    indexBy: 'taste',
    maxValue: 'auto',

    margin: {
        top: 70,
        right: 80,
        bottom: 40,
        left: 80,
    },

    curve: 'linearClosed',

    borderWidth: 2,
    borderColor: { type: 'inherit' },

    gridLevels: 5,
    gridShape: 'circular',
    gridLabelOffset: 36,

    enableDots: true,
    dotSize: 8,
    dotColor: { type: 'inherit' },
    dotBorderWidth: 0,
    dotBorderColor: { type: 'custom', color: '#ffffff' },
    enableDotLabel: true,
    dotLabel: 'value',
    dotLabelYOffset: -12,

    colors: 'nivo',
    colorBy: 'key',
    fillOpacity: 0.1,

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,

    legends: [
        {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                    },
                },
            ],
        },
    ],
}

const Radar = () => {
    return (
        <ComponentTemplate
            name="Radar"
            meta={meta.Radar}
            icon="radar"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groupsByScope.Radar}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
            })}
            generateData={generateWinesTastes}
            getTabData={data => data.data}
        >
            {(properties, data, theme) => {
                return (
                    <ResponsiveRadar
                        data={data.data}
                        keys={data.keys}
                        {...properties}
                        theme={theme}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

/*
const Radar = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateWinesTastes())
    const diceRoll = useCallback(() => setData(generateWinesTastes()), [setData])

    const mappedSettings = mapper(settings)

    const code = generateCode(
        'ResponsiveRadar',
        {
            keys: data.keys,
            ...mappedSettings,
        },
        { pkg: '@nivo/radar' }
    )

    return (
        <ComponentPage>
            <SEO title="Radar" keywords={meta.Radar.tags} />
            <ComponentHeader chartClass="Radar" tags={meta.Radar.tags} />
            <ComponentFlavorSelector flavors={meta.flavors} current="svg" />
            <ComponentDescription description={meta.Radar.description} />
            <ComponentTabs chartClass="radar" code={code} data={data.data} diceRoll={diceRoll}>
                <ResponsiveRadar
                    data={data.data}
                    keys={data.keys}
                    {...mappedSettings}
                    theme={theme.nivo}
                />
            </ComponentTabs>
            <ComponentSettings
                component="Radar"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Radar}
            />
            <Stories isFullWidth={true} stories={meta.Radar.stories} />
        </ComponentPage>
    )
}
*/

export default Radar
