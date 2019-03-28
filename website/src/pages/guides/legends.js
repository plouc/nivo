/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { themeContext } from '@nivo/core'
import { useTheme } from '../../theming/context'
import Layout from '../../components/Layout'
import SEO from '../../components/seo'
import PageContent from '../../components/PageContent'
import LegendPosition from '../../components/guides/legends/LegendPosition'
import LegendDirection from '../../components/guides/legends/LegendDirection'
import LegendItemDirection from '../../components/guides/legends/LegendItemDirection'
import SymbolShape from '../../components/guides/legends/SymbolShape'
import { DescriptionBlock } from '../../components/styled'

const Legends = () => {
    const theme = useTheme()

    return (
        <Layout>
            <themeContext.Provider value={theme.nivo}>
                <SEO title="Legends Guide" />
                <PageContent>
                    <div className="guide__header">
                        <h1>Legends</h1>
                    </div>
                </PageContent>
                <DescriptionBlock>
                    <p>Let's see how to add legends to your charts.</p>
                    <p>
                        Legend components are available via the <code>@nivo/legends</code> package,
                        however it's added as a dependency for most chart packages supporting them,
                        in most cases you won't have to add it as a direct dependency.
                    </p>
                    <LegendPosition />
                    <LegendDirection />
                    <LegendItemDirection />
                    <SymbolShape />
                </DescriptionBlock>
            </themeContext.Provider>
        </Layout>
    )
}

export default Legends
