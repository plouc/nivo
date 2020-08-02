/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import dedent from 'dedent-js'
import { Card, DescriptionBlock } from '../../styled'
import Markdown from '../../Markdown'
import Highlight from '../../Highlight'

const ColorsColor = () => (
    <DescriptionBlock>
        <h2>Single color property</h2>
        <Markdown
            source={dedent(`
                The main \`colors\` property defines the main colors to use
                for your charts for main elements, for example the bars of a
                [Bar](self:/bar) chart or the rectangles of a [TreeMap](self:/treemap).

                For other elements such as borders, links (for [Pie](self:/pie) radial
                labels for example), dots… you'll often have a dedicated color
                property such as \`borderColor\` or \`linkColor\`.

                Those are peripheral elements and sometimes to have a coherent
                style you might want to use a color derived from the main element
                they're bound to (rect —> border), or from the main theme.

                So those properties support several strategies:
            `)}
        />
        <h3>Inheriting from parent element color</h3>
        <Markdown
            source={dedent(`
                The following example will use the \`nivo\` color scheme
                to determine main element's color and then use this color
                for the border of those elements.
            `)}
        />
        <Highlight
            code={dedent(`
                <Chart
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color' }}
                />
            `)}
            language="jsx"
        />
        <Markdown
            source={dedent(`
                However it's not that useful as increasing the elements
                size would visually give the same result.
                That's where **modifiers** come into play, you can inherit
                from the main color but apply modifiers to dissociate it
                from the main element while keeping consistency.

                The folowing code will inherit use the color from parent
                element and darken it by an amount of \`.6\` and change its
                opacity to \`.5\`:
            `)}
        />
        <Highlight
            code={dedent(`
                <Chart
                    colors={{ scheme: 'nivo' }}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            ['darker', .6],
                            ['opacity', .5]
                        ]
                    }}
                />
            `)}
            language="jsx"
        />
        <Markdown
            source={dedent(`
                Available modifiers are \`darker\`, \`brighter\` and \`opacity\`.
            `)}
        />
        <h3>Using a color from current theme</h3>
        <Markdown
            source={dedent(`
                If you want to use a fixed color but want it to match current
                theme, you can use the following config:
            `)}
        />
        <Highlight
            code={dedent(`
                <Chart
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ theme: 'background' }}
                />
            `)}
            language="jsx"
        />
        <Markdown
            source={dedent(`
                Now all borders will use the \`background\` property
                from current theme.
            `)}
        />
        <h3>Using a static custom color</h3>
        <Markdown
            source={dedent(`
                Using a custom color is pretty straightforward:
            `)}
        />
        <Highlight
            code={dedent(`
                <Chart
                    colors={{ scheme: 'nivo' }}
                    borderColor="#000000"
                />
            `)}
            language="jsx"
        />
    </DescriptionBlock>
)

export default ColorsColor
