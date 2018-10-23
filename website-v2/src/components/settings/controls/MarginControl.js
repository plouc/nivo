import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MarginControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }).isRequired,
        onChange: PropTypes.func.isRequired,
        help: PropTypes.string.isRequired,
    }

    state = {
        side: null,
    }

    handleChange = side => e => {
        const { onChange, value } = this.props
        onChange({
            ...value,
            [side]: Number(e.target.value),
        })
    }

    handleFocus = side => () => {
        this.setState({ side })
    }

    handleBlur = () => {
        this.setState({ side: null })
    }

    render() {
        const { label, value } = this.props
        const { side } = this.state

        return (
            <div className="Control">
                <label className="control_label">{label}</label>
                <div className="MarginControl">
                    <span />
                    <input
                        type="text"
                        value={value.top}
                        onChange={this.handleChange('top')}
                        onFocus={this.handleFocus('top')}
                        onBlur={this.handleBlur}
                    />
                    <span />
                    <input
                        type="text"
                        value={value.left}
                        onChange={this.handleChange('left')}
                        onFocus={this.handleFocus('left')}
                        onBlur={this.handleBlur}
                    />
                    <span className={`MarginControl_Box${side !== null ? ` _${side}` : ''}`} />
                    <input
                        type="text"
                        value={value.right}
                        onChange={this.handleChange('right')}
                        onFocus={this.handleFocus('right')}
                        onBlur={this.handleBlur}
                    />
                    <span />
                    <input
                        type="text"
                        value={value.bottom}
                        onChange={this.handleChange('bottom')}
                        onFocus={this.handleFocus('bottom')}
                        onBlur={this.handleBlur}
                    />
                    <span />
                </div>
            </div>
        )
    }
}
