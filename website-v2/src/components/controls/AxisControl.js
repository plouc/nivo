import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ObjectControl from './ObjectControl'

export default class AxisControl extends Component {
    static propTypes = {
        component: PropTypes.string.isRequired,
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

    render() {
        const { component, id, label, value, help, onChange, settings } = this.props

        const props = [
            {
                name: 'enable',
                help: 'Enable/disable axis',
                type: 'switch',
            },
            {
                name: 'tickSize',
                help: 'Axis tick size.',
                type: 'range',
                unit: 'px',
                min: 0,
                max: 20,
            },
            {
                name: 'tickPadding',
                help: 'Axis tick padding.',
                type: 'range',
                unit: 'px',
                min: 0,
                max: 20,
            },
            {
                name: 'tickRotation',
                help: 'Axis tick rotation.',
                type: 'range',
                unit: '°',
                min: -90,
                max: 90,
            },
            {
                name: 'legend',
                help: 'Axis legend.',
                type: 'text',
            },
            {
                name: 'legendPosition',
                help: 'Axis legend position.',
                type: 'radio',
                choices: [
                    {
                        label: 'start',
                        value: 'start',
                        icon: 'start',
                    },
                    {
                        label: 'middle',
                        value: 'middle',
                        icon: 'middle',
                    },
                    {
                        label: 'end',
                        value: 'end',
                        icon: 'end',
                    },
                ],
            },
            {
                name: 'legendOffset',
                help: 'Axis legend offset from axis.',
                type: 'range',
                unit: 'px',
                min: -60,
                max: 60,
            },
        ]

        return (
            <ObjectControl
                key={id}
                component={component}
                label={label}
                props={props}
                value={value}
                onChange={onChange}
                help={help}
            />
        )
    }
}
