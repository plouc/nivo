import React, { Component } from 'react'
import PropTypes from 'prop-types'

class InnerRadiusControl extends Component {
    constructor(props) {
        super(props)

        this.handleInnerRadiusUpdate = this.handleInnerRadiusUpdate.bind(this)
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    handleInnerRadiusUpdate(e) {
        const { onChange } = this.props
        const innerRadius = e.target.value === '0' ? 0 : parseFloat(e.target.value)
        onChange(innerRadius)
    }

    render() {
        const { value, help } = this.props

        return (
            <div className="control control-inner-radius">
                <label>
                    innerRadius: <code className="code code-number">{value}</code>
                </label>
                <div className="control-help">{help}</div>
                <input
                    type="range"
                    min="0"
                    max="0.9"
                    step="0.1"
                    value={value}
                    onChange={this.handleInnerRadiusUpdate}
                />
            </div>
        )
    }
}

const { number, node } = PropTypes

InnerRadiusControl.propTypes = {
    value: number.isRequired,
    help: node.isRequired,
}

InnerRadiusControl.defaultProps = {
    help: 'Chart inner radius.',
}

export default InnerRadiusControl
