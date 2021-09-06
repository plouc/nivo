import React from 'react'
import { generateWinesTastes } from '@nivo/generators'
import { Seo } from '../../components/Seo'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/radar/props'
import mapper from '../../data/components/radar/mapper'
import meta from '../../data/components/radar/meta.yml'

const { data, keys } = generateWinesTastes()

const RadarApi = () => {
    return (
        <>
            <Seo title="Radar HTTP API" keywords={[...meta.Radar.tags, 'HTTP API']} />
            <ApiClient
                componentName="Radar"
                chartClass="radar"
                apiPath="/charts/radar"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 600,
                    height: 600,
                    data: JSON.stringify(data, null, '  '),
                    keys,
                    indexBy: 'taste',
                    maxValue: 'auto',
                    valueFormat: { format: '>-.2f', enabled: true },

                    margin: {
                        top: 70,
                        right: 80,
                        bottom: 40,
                        left: 80,
                    },

                    colors: { scheme: 'nivo' },
                    curve: 'catmullRomClosed',

                    borderWidth: 2,
                    borderColor: { from: 'color' },

                    gridLevels: 5,
                    gridShape: 'circular',
                    gridLabelOffset: 36,

                    enableDots: true,
                    dotSize: 8,
                    dotColor: { from: 'color' },
                    dotBorderWidth: 0,
                    dotBorderColor: { theme: 'background' },
                    enableDotLabel: true,
                    dotLabel: 'value',
                    dotLabelYOffset: -12,

                    fillOpacity: 0.1,
                }}
            />
        </>
    )
}

export default RadarApi
