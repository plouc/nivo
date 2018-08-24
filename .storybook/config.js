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
    require('../packages/bar/stories/bar.stories')
    require('../packages/bar/stories/barCanvas.stories')
    require('../packages/calendar/stories/calendar.stories')
    require('../packages/chord/stories/chord.stories')
    require('../packages/circle-packing/stories/bubble.stories')
    require('../packages/circle-packing/stories/bubbleHtml.stories')
    require('../packages/heatmap/stories/heatmap.stories')
    require('../packages/line/stories/line.stories')
    require('../packages/pie/stories/pie.stories')
    require('../packages/radar/stories/radar.stories')
    require('../packages/sankey/stories/sankey.stories')
    require('../packages/scatterplot/stories/scatterplot.stories')
    require('../packages/stream/stories/stream.stories')
    require('../packages/sunburst/stories/sunburst.stories')
    require('../packages/treemap/stories/treemap.stories')
    require('../packages/treemap/stories/treemapHtml.stories')
    require('../packages/waffle/stories/waffle.stories')
    require('../packages/waffle/stories/waffle-html.stories')
    require('../packages/waffle/stories/waffle-canvas.stories')
}

configure(loadStories, module)
