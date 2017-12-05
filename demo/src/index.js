/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import './styles/index.css'
import './polyfills'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import Nav from './components/nav/Nav'
import MiniNav from './components/nav/MiniNav'
import Home from './components/pages/Home'
import Header from './components/Header'
//import MobileNav from './components/nav/mobile/MobileNav'
import { getRoutes } from './SiteMap'
import registerServiceWorker from './registerServiceWorker'

class App extends Component {
    constructor(props) {
        super(props)

        this.handleNavToggle = this.handleNavToggle.bind(this)
        this.handleNavClose = this.handleNavClose.bind(this)

        this.state = { nav: false }
    }

    handleNavToggle(state) {
        this.setState({ nav: state })
    }

    handleNavClose() {
        this.setState({ nav: false })
    }

    render() {
        const { location } = this.props
        const { nav } = this.state

        return (
            <div>
                <Helmet titleTemplate="%s | nivo" />
                <Header onNavToggle={this.handleNavToggle} />
                <MiniNav location={location} />
                {/*<MobileNav />*/}
                {nav && <Nav onNavClose={this.handleNavClose} />}
                <div className="content">
                    <Switch>{getRoutes()}</Switch>
                </div>
            </div>
        )
    }
}

render(
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="*" component={App} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('root')
)

registerServiceWorker()
