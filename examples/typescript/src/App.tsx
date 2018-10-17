import * as React from 'react'
import Line from './components/Line'
import './App.css'

export default class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">nivo typescript example</h1>
                </header>
                <Line />
            </div>
        )
    }
}
