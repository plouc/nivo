/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CollapsibleCard from '../CollapsibleCard'
import ChartControls from './ChartControls'

export default class ChartControlGroups extends Component {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        groups: PropTypes.array.isRequired,
        group: PropTypes.string,
        ns: PropTypes.string.isRequired,
        scope: PropTypes.string,
    }

    constructor(props) {
        super(props)

        this.state = {
            openedGroup: props.group || 'Base',
        }
    }

    handleGroupToggle = groupName => {
        this.setState({ openedGroup: groupName })
    }

    render() {
        const { ns, groups: _groups, scope, settings, onChange } = this.props
        const { openedGroup } = this.state

        const groups = _groups.filter(group => {
            return !group.scopes || group.scopes.includes(scope)
        })

        return (
            <CollapsibleCard title="Settings" expandedByDefault={true}>
                <div className="tabs__menu">
                    {groups.map(group => {
                        return (
                            <div
                                key={group.name}
                                className={classNames('no-select tabs__menu__item', {
                                    '_is-active': openedGroup === group.name,
                                })}
                                onClick={() => {
                                    this.handleGroupToggle(group.name)
                                }}
                            >
                                {group.name}
                            </div>
                        )
                    })}
                </div>
                {groups
                    .filter(group => openedGroup === group.name)
                    .map(group => (
                        <ChartControls
                            key={group.name}
                            ns={ns}
                            name={group.name}
                            controls={group.controls}
                            settings={settings}
                            onChange={onChange}
                        />
                    ))}
            </CollapsibleCard>
        )
    }
}
