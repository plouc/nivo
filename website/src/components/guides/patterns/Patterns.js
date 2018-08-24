import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import PatternsIllustrations from './PatternsIllustrations'
import PatternsExample from './PatternsExample'
import PatternsDots from './PatternsDots'
import PatternsLines from './PatternsLines'
import PatternsSquares from './PatternsSquares'

const Patterns = () => (
    <div className="inner-content">
        <Helmet title="Patterns" />
        <div className="page_content">
            <div className="guide__header">
                <h1 className="page_header">Patterns</h1>
            </div>
        </div>
        <div className="guide__description text-content">
            <h2>Purpose</h2>
            <p>
                Using patterns can be useful to <strong>group similar items</strong>, for example
                imagine you want to build a pie chart displaying various foods, you can use a color
                scale to assign a unique color to each one, then you can group
                vegetables/fruits/meats/… using a similar pattern for each group (while keeping
                color variation).
            </p>
            <h2>Using patterns in nivo</h2>
            <p>
                Defining patterns in nivo is a <strong>2 steps process</strong>, first you'll have
                to declare available definitions (the same goes for{' '}
                <Link to="/guides/gradients">gradients</Link>) using dedicated helpers or providing
                plain objects.
                <br />
                Then you must define the rules to apply those definitions using the{' '}
                <code className="code">fill</code> property.
            </p>
        </div>
        <PatternsIllustrations />
        <div className="guide__description text-content">
            <p>
                <strong>Separating pattern definitions from application</strong> allows us to reuse
                those in various places, like fills and borders, and while maintaining a direct
                mapping for a bar chart with 5 items can be simple enough, when you're dealing with
                a complex heatmap with tens of nodes it can quickly become cumbersome. Doing so also
                provides the ability to{' '}
                <strong>use a pattern depending on chart element value</strong>. Last but not least,{' '}
                <strong>patterns colors can be inherited</strong> from current node ones.
            </p>
            <h2>Example</h2>
            <PatternsExample />
            <h2>Available patterns</h2>
            <PatternsDots />
            <PatternsLines />
            <PatternsSquares />
            <h2>Known limitations</h2>
            <p>
                Please be aware that pattern usage has some limitations, it's{' '}
                <strong>not supported for canvas</strong> chart implementations for now, and
                tooltips involving colored chips will use plain element color.
            </p>
        </div>
    </div>
)

export default Patterns
