import { pick } from 'lodash'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ChartProps, chartsMapping, ChartType } from './mappings'

const staticProps = {
    animate: false,
    isInteractive: false,
    renderWrapper: false,
    theme: {},
}

export const renderChart = <T extends ChartType>(
    {
        type,
        props,
    }: {
        type: T
        props: ChartProps<T>
    },
    override: Partial<ChartProps<T>>
) => {
    const chart = chartsMapping[type]
    const component = chart.component
    const mergedProps = {
        ...staticProps,
        ...chart.defaults,
        ...props,
        ...pick(override, chart.runtimeProps || []),
    }
    const rendered = renderToStaticMarkup(
        // @ts-ignore
        createElement(component, mergedProps)
    )

    return `<?xml version="1.0" ?>${rendered}`
}
