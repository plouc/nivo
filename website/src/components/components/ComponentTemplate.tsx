import React, { useState, useCallback, useMemo } from 'react'
import { Theme as NivoTheme } from '@nivo/core'
import SEO from '../seo'
import Layout from '../Layout'
import { useTheme } from '../../theming/context'
import generateCode from '../../lib/generateChartCode'
import { ComponentPage } from './ComponentPage'
import { ComponentHeader } from './ComponentHeader'
import ComponentFlavorSelector from './ComponentFlavorSelector'
import { ComponentDescription } from './ComponentDescription'
import { ComponentTabs } from './ComponentTabs'
import { ActionsLogger, useActionsLogger } from './ActionsLogger'
import ComponentSettings from './ComponentSettings'
import { Stories } from './Stories'
import { ChartMeta, Flavor } from '../../types'

interface ComponentTemplateProps<P extends object, D> {
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
        properties: any[]
    }[]
    // initial props of the demo
    initialProperties: Partial<P>
    // default props as defined in the package component
    defaultProperties?: Partial<P>
    propertiesMapper?: Function
    codePropertiesMapper?: Function
    hasData?: boolean
    generateData?: (previousData?: D | null) => D | undefined
    dataKey?: string
    getDataSize?: (data: D) => number
    getTabData?: (data: D) => D
    children: (properties: any, data: any, theme: NivoTheme, logAction: any) => JSX.Element
}

export const ComponentTemplate = <P extends object = any, D = any>({
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
    hasData = true,
    generateData = () => undefined,
    dataKey,
    getDataSize,
    getTabData = data => data,
    children,
}: ComponentTemplateProps<P, D>) => {
    const theme = useTheme()

    const [settings, setSettings] = useState(initialProperties)

    const initialData = useMemo(() => (hasData ? generateData() : null), [])
    const [data, setData] = useState(initialData)
    const diceRoll = useCallback(() => {
        setData(currentData => generateData(currentData))
    }, [setData])

    const [actions, logAction] = useActionsLogger()

    let mappedProperties = settings
    if (propertiesMapper !== undefined) {
        mappedProperties = propertiesMapper(settings, data)
    }

    let codeProperties = mappedProperties
    if (codePropertiesMapper !== undefined) {
        codeProperties = codePropertiesMapper(mappedProperties, data)
    }

    const code = generateCode(`Responsive${name}`, codeProperties, {
        pkg: meta.package,
        defaults: defaultProperties,
        dataKey: hasData ? dataKey : null,
    })

    const hasStories = meta.stories !== undefined && meta.stories.length > 0

    const tags = useMemo(() => [meta.package, ...meta.tags], [meta])

    const flavorKeys = useMemo(() => flavors.map(flavor => flavor.flavor), [flavors])

    return (
        <Layout>
            <ComponentPage>
                <SEO title={name} keywords={tags} />
                <ComponentHeader chartClass={name} tags={tags} />
                <ComponentFlavorSelector flavors={flavors} current={currentFlavor} />
                <ComponentDescription description={meta.description} />
                <ComponentTabs<D>
                    chartClass={icon}
                    code={code}
                    data={hasData ? getTabData(data!) : undefined}
                    dataKey={dataKey}
                    nodeCount={
                        hasData && getDataSize !== undefined ? getDataSize(data!) : undefined
                    }
                    diceRoll={hasData ? diceRoll : undefined}
                >
                    {children(mappedProperties, data, theme.nivo, logAction)}
                </ComponentTabs>
                <ActionsLogger actions={actions} isFullWidth={!hasStories} />
                <ComponentSettings
                    component={name}
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
