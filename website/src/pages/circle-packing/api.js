import React from 'react'
import { generateLibTree } from '@nivo/generators'
import { Seo } from '../../components/Seo'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/circle-packing/props'
import mapper from '../../data/components/circle-packing/mapper'
import meta from '../../data/components/circle-packing/meta.yml'

const root = generateLibTree()

const CirclePackingApi = () => {
    return (
        <>
            <Seo
                title="CirclePacking HTTP API"
                keywords={[...meta.CirclePacking.tags, 'HTTP API']}
            />
            <ApiClient
                componentName="CirclePacking"
                chartClass="circle-packing"
                apiPath="/charts/circle-packing"
                flavors={meta.flavors}
                dataProperty="root"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 600,
                    height: 600,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    },
                    root: JSON.stringify(root, null, '  '),
                    identity: 'name',
                    value: 'loc',
                    valueFormat: { format: '', enabled: false },
                    colors: { scheme: 'nivo' },
                    colorBy: 'depth',
                    inheritColorFromParent: false,
                    childColor: {
                        from: 'color',
                        modifiers: [['darker', 0.3]],
                    },
                    padding: 1,
                    enableLabels: true,
                    leavesOnly: false,
                    label: 'id',
                    labelsSkipRadius: 8,
                    labelTextColor: {
                        from: 'color',
                        modifiers: [['darker', 0.8]],
                    },
                    labelTextDY: 4,
                    borderWidth: 0,
                    borderColor: {
                        from: 'color',
                        modifiers: [['darker', 0.3]],
                    },
                }}
            />
        </>
    )
}

export default CirclePackingApi
