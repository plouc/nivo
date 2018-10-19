import React, { Component } from 'react'
import '../styles/index.scss'
import Header from '../components/Header'


export default class GlobalLayout extends Component {
    render() {
        const { children } = this.props

        return (
            <div>
                <Header/>
                <div className="content">
                    {children}
                </div>
            </div>
        )
    }
}