import React from 'react'
import '../App.css'
import Background from './Background'
import Bar from './charts/Bar'
import Bubble from './charts/Bubble'
import Chord from './charts/Chord'
import HeatMap from './charts/HeatMap'
import Pie from './charts/Pie'
import Stream from './charts/Stream'
import TreeMap from './charts/TreeMap'
import Info from './Info'

const App = () => (
    <div>
        <Background />
        <div className="App">
            <Bar />
            <Bubble />
            <div />
            <Chord />
            <HeatMap />
            <Pie />
            <TreeMap />
            <Stream />
            <Info />
        </div>
    </div>
)

export default App
