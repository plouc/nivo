import React, { useState, useCallback, useMemo } from 'react'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { useTheme } from 'styled-components'
import { Theme as NivoTheme } from '@bitbloom/nivo-core'
import { startCase } from 'lodash'
import { Seo } from '../Seo'
import Layout from '../Layout'
import { generateChartCode } from '../../lib/generateChartCode'
import { ComponentPage } from './ComponentPage'
import { ComponentHeader } from './ComponentHeader'
import { ComponentFlavorSelector } from './ComponentFlavorSelector'
import { ComponentDescription } from './ComponentDescription'
import { ComponentTabs } from './ComponentTabs'
import { ActionsLogger, useActionsLogger, ActionLoggerLogFn } from './ActionsLogger'
import { ComponentSettings } from './ComponentSettings'
import { Stories } from './Stories'
import { ChartMeta, ChartProperty, Flavor } from '../../types'

interface ComponentTemplateProps<
    UnmappedProps extends object,
    MappedProps extends object,
    Data,
    ComponentProps extends object
> {
    name: string
    meta: ChartMeta
    icon: string
    flavors: {
        flavor: Flavor
        path: string
    }[]
    currentFlavor: Flavor
    properties: {
        name: string
        properties: ChartProperty[]
    }[]
    // initial props of the demo, unmapped
    initialProperties: UnmappedProps
    // default props as defined in the package component
    defaultProperties?: Partial<ComponentProps>
    propertiesMapper?: (props: UnmappedProps, data: Data) => MappedProps
    codePropertiesMapper?: (props: MappedProps, data: Data) => MappedProps
    generateData: (previousData?: Data | null) => Data
    dataKey?: string
    getDataSize?: (data: Data) => number
    getTabData?: (data: Data) => Data
    children: (
        properties: MappedProps,
        data: Data,
        theme: NivoTheme,
        logAction: ActionLoggerLogFn
    ) => JSX.Element
    image?: IGatsbyImageData
}

export const ComponentTemplate = <
    UnmappedProps extends object = any,
    MappedProps extends object = any,
    Data = any,
    ComponentProps extends object = any
>({
    name,
    meta,
    icon,
    flavors,
    currentFlavor,
    properties,
    initialProperties,
    defaultProperties = {},
    propertiesMapper,
    codePropertiesMapper,
    generateData,
    dataKey = 'data',
    getDataSize,
    getTabData = data => data,
    image,
    children,
}: ComponentTemplateProps<UnmappedProps, MappedProps, Data, ComponentProps>) => {
    const theme = useTheme()

    const [settings, setSettings] = useState<UnmappedProps>(initialProperties)

    const [data, setData] = useState<Data>(() => generateData())

    const diceRoll = useCallback(() => {
        setData(currentData => generateData(currentData))
    }, [setData, generateData])

    const [actions, logAction] = useActionsLogger()

    let mappedProperties: MappedProps
    if (propertiesMapper !== undefined) {
        mappedProperties = propertiesMapper(settings, data)
    } else {
        mappedProperties = settings as unknown as MappedProps
    }

    let codeProperties = mappedProperties
    if (codePropertiesMapper !== undefined) {
        codeProperties = codePropertiesMapper(mappedProperties, data)
    }

    const code = generateChartCode(`Responsive${name}`, codeProperties, {
        pkg: meta.package,
        defaults: defaultProperties,
        dataKey: data !== undefined ? dataKey : undefined,
    })

    const hasStories = meta.stories !== undefined && meta.stories.length > 0

    const title = `${startCase(name)} chart`
    const description = `${meta.package} package ${startCase(name)} chart.`
    const tags = useMemo(() => [meta.package, ...meta.tags], [meta])

    const flavorKeys = useMemo(() => flavors.map(flavor => flavor.flavor), [flavors])

    const tabData = useMemo(() => getTabData(data), [data])

    return (
        <Layout>
            <ComponentPage>
                <Seo title={title} description={description} image={image} keywords={tags} />
                <ComponentHeader chartClass={name} tags={tags} />
                <ComponentFlavorSelector flavors={flavors} current={currentFlavor} />
                <ComponentDescription description={meta.description} />
                <ComponentTabs<Data>
                    chartClass={icon}
                    code={code}
                    data={tabData}
                    dataKey={dataKey}
                    nodeCount={getDataSize !== undefined ? getDataSize(data) : undefined}
                    diceRoll={data !== undefined ? diceRoll : undefined}
                >
                    {children(mappedProperties, data, theme.nivo, logAction)}
                </ComponentTabs>
                <ActionsLogger actions={actions} isFullWidth={!hasStories} />
                <ComponentSettings
                    settings={settings}
                    onChange={setSettings}
                    groups={properties}
                    flavors={flavorKeys}
                    currentFlavor={currentFlavor}
                />
                {hasStories && <Stories stories={meta.stories} />}
            </ComponentPage>
        </Layout>
    )
}
