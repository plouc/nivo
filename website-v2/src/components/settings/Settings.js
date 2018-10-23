import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ControlsGroup from './ControlsGroup'

export default class Settings extends Component {
    static propTypes = {
        component: PropTypes.string.isRequired,
        settings: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        groups: PropTypes.array.isRequired,
        group: PropTypes.string,
    }

    render() {
        const { component, settings, onChange, groups } = this.props

        return (
            <div className="Settings">
                {groups.map(group => {
                    return (
                        <div key={group.name} className="Settings_Group">
                            <div className="Settings_Group_Title">{group.name}</div>
                            <ControlsGroup
                                component={component}
                                name={group.name}
                                controls={group.controls}
                                settings={settings}
                                onChange={onChange}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}
