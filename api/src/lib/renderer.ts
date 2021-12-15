import { pick } from 'lodash'
import React, { FunctionComponent } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ChartProps, chartsMapping, ChartType } from '../mapping'

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
    override
) => {
    const chart = chartsMapping[type]
    const component = chart.component as FunctionComponent<ChartProps<T>>
    const mergedProps = {
        ...staticProps,
        ...chart.defaults,
        ...props,
        ...pick(override, chart.runtimeProps || []),
    }
    const rendered = renderToStaticMarkup(
        React.createElement<ChartProps<T>>(component, mergedProps)
    )

    return `<?xml version="1.0" ?>${rendered}`
}
