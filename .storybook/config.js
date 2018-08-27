/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure, setAddon } from '@storybook/react'
import infoAddon, { setDefaults } from '@storybook/addon-info'
import './style.css'

setDefaults({
    header: true,
    inline: true,
    propTables: false,
    maxPropObjectKeys: 10000,
    maxPropArrayLength: 10000,
    maxPropStringLength: 10000,
    styles: {
        infoBody: {
            border: 'none',
            borderRadius: 0,
            padding: '0 30px 20px',
            marginTop: '0',
            marginBottom: '0',
            boxShadow: 'none',
        },
        header: {
            h1: {
                fontSize: '28px',
            },
            h2: {
                fontSize: '16px',
            },
        },
        source: {
            h1: {
                fontSize: '22px',
            },
        },
        /*
        header: {
    h1: {
      margin: 0,
      padding: 0,
      fontSize: '35px',
    },
    h2: {
      margin: '0 0 10px 0',
      padding: 0,
      fontWeight: 400,
      fontSize: '22px',
    },
    body: {
      borderBottom: '1px solid #eee',
      paddingTop: 10,
      marginBottom: 10,
    },
  },
         */
    },
})
setAddon(infoAddon)

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
