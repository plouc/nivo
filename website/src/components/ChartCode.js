import React, { Component } from 'react'
import CollapsibleCard from './CollapsibleCard'

export default class ChartCode extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.code === this.props.code) {
            return false
        }

        return true
    }

    render() {
        const { code } = this.props

        return (
            <CollapsibleCard title="Code" expandedByDefault={true}>
                <div className="code-snippet">
                    <pre>{code}</pre>
                </div>
            </CollapsibleCard>
        )
    }
}
