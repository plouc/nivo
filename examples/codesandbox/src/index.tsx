import './global.css'
import { css } from 'otion'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

const rootElement = document.getElementById('root')

rootElement!.className = css({ height: '100vh' })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
)
