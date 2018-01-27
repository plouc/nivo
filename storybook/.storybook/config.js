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
    require('../stories/bar/bar.stories')
    require('../stories/chord/chord.stories')
    require('../stories/circle-packing/bubble.stories')
    require('../stories/heatmap/heatmap.stories')
    require('../stories/line/line.stories')
    require('../stories/pie/pie.stories')
    require('../stories/radar/radar.stories')
    require('../stories/sankey/sankey.stories')
    require('../stories/scatterplot/scatterplot.stories')
    require('../stories/stream/stream.stories')
    require('../stories/sunburst/sunburst.stories')
}

configure(loadStories, module)
