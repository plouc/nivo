/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure } from '@storybook/react'
import { setDefaults } from '@storybook/addon-info'
import './style.css'

setDefaults({
    header: false,
    inline: true,
    propTables: false,
    maxPropObjectKeys: 10000,
    maxPropArrayLength: 10000,
    maxPropStringLength: 10000
})

function loadStories() {
    require('../packages/nivo-bar/stories/bar.stories')
    require('../packages/nivo-bar/stories/barCanvas.stories')
    require('../packages/nivo-chord/stories/chord.stories')
    require('../packages/nivo-circle-packing/stories/bubble.stories')
    require('../packages/nivo-circle-packing/stories/bubbleHtml.stories')
    require('../packages/nivo-heatmap/stories/heatmap.stories')
    require('../packages/nivo-line/stories/line.stories')
    require('../packages/nivo-pie/stories/pie.stories')
    require('../packages/nivo-radar/stories/radar.stories')
    require('../packages/nivo-sankey/stories/sankey.stories')
    require('../packages/nivo-scatterplot/stories/scatterplot.stories')
    require('../packages/nivo-stream/stories/stream.stories')
    require('../packages/nivo-sunburst/stories/sunburst.stories')
    require('../packages/nivo-treemap/stories/treemap.stories')
    require('../packages/nivo-treemap/stories/treemapHtml.stories')
    require('../packages/nivo-waffle/stories/waffle.stories')
    require('../packages/nivo-waffle/stories/waffle-html.stories')
    require('../packages/nivo-waffle/stories/waffle-canvas.stories')
}

configure(loadStories, module)
