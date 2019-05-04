/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import SEO from '../seo'
import Layout from '../Layout'
import { useTheme } from '../../theming/context'
import generateCode from '../../lib/generateChartCode'
import ComponentPage from './ComponentPage'
import ComponentHeader from './ComponentHeader'
import ComponentFlavorSelector from './ComponentFlavorSelector'
import ComponentDescription from './ComponentDescription'
import ComponentTabs from './ComponentTabs'
import ActionsLogger, { useActionsLogger } from './ActionsLogger'
import ComponentSettings from './ComponentSettings'
import Stories from './Stories'

const ComponentTemplate = ({
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
}) => {
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

    const tags = useMemo(() => [meta.package, ...meta.tags], meta)

    const flavorKeys = useMemo(() => flavors.map(flavor => flavor.flavor), [flavors])

    return (
        <Layout>
            <ComponentPage>
                <SEO title={name} keywords={tags} />
                <ComponentHeader chartClass={name} tags={tags} />
                <ComponentFlavorSelector flavors={flavors} current={currentFlavor} />
                <ComponentDescription description={meta.description} />
                <ComponentTabs
                    chartClass={icon}
                    code={code}
                    data={hasData ? getTabData(data) : undefined}
                    dataKey={dataKey}
                    nodeCount={getDataSize !== undefined ? getDataSize(data) : undefined}
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

ComponentTemplate.propTypes = {
    name: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        package: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        description: PropTypes.string.isRequired,
        stories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                link: PropTypes.string.isRequired,
            })
        ),
    }).isRequired,
    icon: PropTypes.string.isRequired,
    flavors: PropTypes.arrayOf(
        PropTypes.shape({
            flavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
            path: PropTypes.string.isRequired,
        })
    ).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    properties: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            properties: PropTypes.array.isRequired,
        })
    ).isRequired,
    initialProperties: PropTypes.object.isRequired,
    defaultProperties: PropTypes.object,
    propertiesMapper: PropTypes.func,
    codePropertiesMapper: PropTypes.func,
    hasData: PropTypes.bool,
    generateData: PropTypes.func,
    dataKey: PropTypes.string,
    getDataSize: PropTypes.func,
    getTabData: PropTypes.func,
    children: PropTypes.func.isRequired,
}

export default ComponentTemplate
