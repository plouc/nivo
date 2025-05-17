'use client'
import {useState, useCallback, ReactElement, useRef, Ref} from "react";
import { toPng } from 'html-to-image'
import { Flavor, ChartMeta, ChartFlavor}  from "@/types/charts";
import {ChartHeader} from "./ChartHeader";
import {ChartFlavorSelector} from "./ChartFlavorSelector";
import {ChartTabs} from "./ChartTabs";
import { ChartStories } from './ChartStories'

import { ChoicesControl} from "@/app/_ui/controls/generics/ChoicesControl";

interface ChartTemplateProps<
    UnmappedProps extends Record<string, unknown>,
    MappedProps extends Record<string, unknown>,
    Data,
    R extends SVGSVGElement | HTMLCanvasElement | HTMLDivElement,
    ChartProps extends Record<string, unknown> = Record<string, unknown>,
> {
    component: string
    meta: ChartMeta
    icon: string
    flavors: ChartFlavor[]
    currentFlavor: Flavor
    // properties: {
    //     name: string
    //     properties: ChartProperty[]
    // }[]
    // initial props of the demo, unmapped
    unmappedProps: UnmappedProps
    // default props as defined in the package component
    defaultProps?: Partial<ChartProps>
    propsMapper?: (unmappedProps: UnmappedProps, data: Data) => MappedProps
    codePropsMapper?: (props: MappedProps, data: Data) => Record<string, unknown>
    generateData: (previousData?: Data | null) => Data
    enableDiceRoll?: boolean
    enableChartDownload?: boolean
    dataKey?: string
    getDataSize?: (data: Data) => number
    getTabData?: (data: Data) => Data
    children: (renderProps: {
        data: Data
        props: MappedProps
        // theme: NivoTheme,
        // logAction: ActionLoggerLogFn,
        chartRef: Ref<R>
    }) => ReactElement
    // image?: IGatsbyImageData
    // location?: PageProps['location']
}

export const ChartTemplate = <
    UnmappedProps extends Record<string, unknown>,
    MappedProps extends Record<string, unknown>,
    Data,
    R extends SVGSVGElement | HTMLCanvasElement | HTMLDivElement,
    ChartProps extends Record<string, unknown> = Record<string, unknown>,
>({
    component,
    icon,
    meta,
    flavors,
    currentFlavor,
    unmappedProps,
    propsMapper,
    generateData,
    enableDiceRoll,
    enableChartDownload,
    children,
}: ChartTemplateProps<UnmappedProps, MappedProps, Data, R, ChartProps>) => {
    const [data, setData] = useState<Data>(() => generateData())

    const diceRoll = useCallback(() => {
        setData(currentData => generateData(currentData))
    }, [setData, generateData])

    let mappedProps: MappedProps
    if (propsMapper !== undefined) {
        mappedProps = propsMapper(unmappedProps, data)
    } else {
        mappedProps = unmappedProps as unknown as MappedProps
    }

    const chartRef = useRef<R>(null)
    const handleDownload = useCallback(() => {
        if (chartRef.current === null) return

        toPng(chartRef.current as HTMLElement, { cacheBust: true }).then(dataUrl => {
            const link = document.createElement('a')
            link.download = `nivo${component}.png`
            link.href = dataUrl
            link.click()
        })
    }, [chartRef, component])

    const hasStories = meta.stories !== undefined && meta.stories.length > 0

    return (
        <div>
            <ChartHeader component={component} tags={[meta.package, ...meta.tags]} />
            <ChartFlavorSelector flavors={flavors} current={currentFlavor} />
            <ChartTabs<Data>
                chartIcon={icon}
                data={data}
                code={`<${component} data={data} />`}
                diceRoll={
                    enableDiceRoll ? (data !== undefined ? diceRoll : undefined) : undefined
                }
                download={enableChartDownload ? handleDownload : undefined}
            >
                {children({ data, props: mappedProps, chartRef })}
            </ChartTabs>
            <div>
                <ChoicesControl<'red' | 'blue' | 'green'>
                    id="colors"
                    property={{
                        name: 'colors',
                        description: 'Choose a color',
                        key: 'colors',
                        required: false,
                        type: {
                            svg: 'stringSvg',
                            canvas: 'stringCanvas',
                        },
                        group: 'Style',
                    }}
                    config={{
                        type: 'choices',
                        choices: ['red', 'blue', 'green'],
                    }}
                    flavors={['svg', 'canvas', 'api']}
                    currentFlavor={currentFlavor}
                    value="blue"
                    onChange={() => {
                        console.log('onChange')
                    }}
                />
                <ChoicesControl<'top' | 'right' | 'bottom' | 'left'>
                    id="orientation"
                    property={{
                        name: 'orientation',
                        description: 'Choose an orientation',
                        key: 'orientation',
                        required: false,
                        type: {
                            svg: 'stringSvg',
                            canvas: 'stringCanvas',
                        },
                        group: 'Style',
                    }}
                    config={{
                        type: 'choices',
                        choices: ['top', 'right', 'bottom', 'left'],
                    }}
                    flavors={['svg', 'canvas', 'api']}
                    currentFlavor={currentFlavor}
                    value="right"
                    onChange={(v) => {
                        console.log('onChange', {v})
                    }}
                />
            </div>
            {hasStories && <ChartStories stories={meta.stories} />}
        </div>
    )
}

/*
export const ComponentTemplate = <
    UnmappedProps extends Record<string, any>,
    MappedProps extends Record<string, any>,
    Data,
    ComponentProps extends object = any,
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
    enableDiceRoll = true,
    enableChartDownload = false,
    dataKey = 'data',
    getDataSize,
    getTabData = data => data,
    image,
    location,
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

    let codeProperties: Record<string, any> = mappedProperties
    if (codePropertiesMapper !== undefined) {
        codeProperties = codePropertiesMapper(mappedProperties, data)
    }

    const code = generateChartCode(name, codeProperties, {
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

    const chartRef = createRef<Element>()

    const handleDownload = useCallback(() => {
        if (chartRef.current === null) return

        toPng(chartRef.current as HTMLElement, { cacheBust: true }).then(dataUrl => {
            const link = document.createElement('a')
            link.download = `nivo${name}.png`
            link.href = dataUrl
            link.click()
        })
    }, [chartRef, name])

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
                    diceRoll={
                        enableDiceRoll ? (data !== undefined ? diceRoll : undefined) : undefined
                    }
                    download={enableChartDownload ? handleDownload : undefined}
                >
                    {children(mappedProperties, data, theme.nivo, logAction, chartRef)}
                </ComponentTabs>
                <ActionsLogger actions={actions} isFullWidth={!hasStories} />
                <ComponentSettings
                    settings={settings}
                    onChange={setSettings}
                    groups={properties}
                    flavors={flavorKeys}
                    currentFlavor={currentFlavor}
                    location={location}
                />
                {hasStories && <Stories stories={meta.stories} />}
            </ComponentPage>
        </Layout>
    )
}

 */