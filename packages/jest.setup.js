const { TextEncoder, TextDecoder } = require('util')

Object.assign(global, { TextDecoder, TextEncoder })

global.ResizeObserver = require('resize-observer-polyfill')

const { configure } = require('enzyme')
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')

configure({ adapter: new Adapter() })
