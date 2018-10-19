import React, { Component } from 'react'
// import Helmet from 'react-helmet'
import GlobalLayout from '../../layouts/GlobalLayout'
import LegendPosition from '../../components/guides/legends/LegendPosition'
import LegendDirection from '../../components/guides/legends/LegendDirection'
import LegendItemDirection from '../../components/guides/legends/LegendItemDirection'
import SymbolShape from '../../components/guides/legends/SymbolShape'

export default class Legends extends Component {
    render() {
        return (
            <GlobalLayout>
                <div className="inner-content">
                    {/* <Helmet title="Legends" /> */}
                    <div className="page_content">
                        <div className="guide__header">
                            <h1 className="page_header">Legends</h1>
                        </div>
                    </div>
                    <div className="guide__description text-content">
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
                    </div>
                </div>
            </GlobalLayout>
        )
    }
}
