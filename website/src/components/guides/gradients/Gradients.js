import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import GradientsIllustrations from './GradientsIllustrations'
import GradientsExample from './GradientsExample'

export default class Gradients extends Component {
    render() {
        return (
            <div className="inner-content">
                <Helmet title="Gradients" />
                <div className="page_content">
                    <div className="guide__header">
                        <h1 className="page_header">Gradients</h1>
                    </div>
                </div>
                <div className="guide__description text-content">
                    <p>
                        While gradients rarely add meaning to your data, it's an easy way to enhance
                        the look of your charts.
                    </p>
                    <h2>Using gradients in nivo</h2>
                    <p>
                        Defining gradients in nivo is a <strong>2 steps process</strong>, first
                        you'll have to declare available definitions (the same goes for{' '}
                        <Link to="/guides/patterns">patterns</Link>) using dedicated helpers or
                        providing plain objects.
                        <br />
                        Then you must define the rules to apply those definitions using the{' '}
                        <code className="code">fill</code> property.
                    </p>
                </div>
                <GradientsIllustrations />
                <div className="guide__description text-content">
                    <p>
                        <strong>Separating gradient definitions from application</strong> allows us
                        to reuse those in various places, like fills and borders, and while
                        maintaining a direct mapping for a bar chart with 5 items can be simple
                        enough, when you're dealing with a complex heatmap with tens of nodes it can
                        quickly become cumbersome. Doing so also provides the ability to{' '}
                        <strong>use a gradient depending on chart element value</strong>. Last but
                        not least, <strong>gradient colors can be inherited</strong> from current
                        node ones.
                    </p>
                    <h2>Example</h2>
                    <GradientsExample />
                    <h2>Known limitations</h2>
                    <p>
                        Please be aware that gradient usage has some limitations, it's{' '}
                        <strong>not supported for canvas</strong> chart implementations for now, and
                        tooltips involving colored chips will use plain element color.
                    </p>
                </div>
            </div>
        )
    }
}
