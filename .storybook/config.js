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

const req = require.context('../packages', true, /\.stories\.js$/)

function loadStories() {
    req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
