/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { getSectionItems } from '../../SiteMap'

const componentsItems = getSectionItems('Components')
const guidesItems = getSectionItems('Guides')

class Nav extends Component {
    render() {
        const { onNavClose } = this.props

        return (
            <div>
                <div className="overlay" onClick={onNavClose} />
                <aside className="sidebar">
                    <h3>Components</h3>
                    {componentsItems.map(item => {
                        const links = [
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={onNavClose}
                                className="sidebar_link"
                                activeClassName="active"
                            >
                                <span className="sidebar-icon_wrapper">
                                    <span
                                        className={`sidebar-icon sprite-icons-${
                                            item.className
                                        }-grey`}
                                    />
                                </span>
                                <span>{item.label}</span>
                            </NavLink>,
                        ]

                        if (item.children) {
                            item.children.forEach(child => {
                                links.push(
                                    <NavLink
                                        key={`${item.path}${child.path}`}
                                        to={`${item.path}${child.path}`}
                                        onClick={onNavClose}
                                        className="sidebar_link sidebar_link-sub"
                                        activeClassName="active"
                                    >
                                        <span className="sidebar-icon_wrapper-sub">
                                            <span
                                                className={`sidebar-icon-sub sprite-icons-${
                                                    child.className
                                                }-grey`}
                                            />
                                        </span>
                                        <span>{child.label}</span>
                                    </NavLink>
                                )
                            })
                        }

                        return links
                    })}
                    <h3>Guides</h3>
                    {guidesItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onNavClose}
                            className="sidebar_link"
                            activeClassName="active"
                        >
                            <span className="sidebar-icon_wrapper">
                                <span
                                    className={`sidebar-icon sprite-icons-${item.className}-grey`}
                                />
                            </span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </aside>
            </div>
        )
    }
}

export default Nav
