/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { TransitionMotion, spring } from 'react-motion'
import MiniNavLink from './MiniNavLink'
import { getSectionItems } from '../../SiteMap'

const miniNavItems = getSectionItems('Components').map((item, i) => {
    item.index = i
    item.absIndex = i
    let children = []
    if (item.children) {
        children = item.children.map((child, childIndex) => {
            return Object.assign({}, child, {
                path: `${item.path}${child.path}`,
                index: childIndex + 1,
                parentIndex: item.index,
                absIndex: item.index + childIndex + 1,
            })
        })
    }

    return Object.assign({}, item, {
        children,
    })
})

class MiniNav extends Component {
    constructor(props) {
        super(props)

        this.closeChildren = this.closeChildren.bind(this)
        this.openChildren = this.openChildren.bind(this)

        this.state = { children: true }
    }

    closeChildren() {
        this.setState({ children: false })
    }

    openChildren() {
        this.setState({ children: true })
    }

    componentWillReceiveProps(nextProps) {
        let oldParentPath = '/'
        if (this.props.location) {
            oldParentPath += this.props.location.pathname
        }

        let newParentPath = '/'
        if (nextProps.location) {
            newParentPath += nextProps.location.pathname
        }

        if (oldParentPath !== newParentPath) {
            this.setState({ children: true })
        }
    }

    willEnter(item) {
        const index =
            item.data.parentIndex !== undefined ? item.data.parentIndex : item.data.index + 1

        return {
            top: (index + 1) * 56,
            scale: 0.6,
            opacity: 0.1,
            zIndex: 10,
        }
    }

    willLeave(item) {
        const index = item.data.parentIndex !== undefined ? item.data.parentIndex : item.data.index

        return {
            top: spring((index + 1) * 56, { stiffness: 300, damping: 40 }),
            scale: spring(0.6, { stiffness: 300, damping: 40 }),
            opacity: spring(0, { stiffness: 300, damping: 40 }),
            zIndex: 0,
        }
    }

    render() {
        const { location } = this.props

        let currentParent = null
        let hasChildren = false
        let childrenItems = []

        if (location) {
            const parent = miniNavItems.find(({ path }) => location.pathname.startsWith(path))
            if (parent && parent.children) {
                hasChildren = true
                currentParent = parent
            }
        }

        let parentItems = miniNavItems.map(item => {
            const itemProps = Object.assign({}, item)
            if (item === currentParent) {
                itemProps.onClick = this.openChildren
            }

            return itemProps
        })

        if (hasChildren) {
            childrenItems = [
                {
                    label: 'back',
                    index: 0,
                },
            ].concat(currentParent.children)
        }

        let currentItems
        if (hasChildren) {
            if (this.state.children) {
                currentItems = childrenItems
            } else {
                currentItems = parentItems
            }
        } else {
            currentItems = parentItems
        }

        return (
            <aside className="mini-nav">
                <Link className="mini-nav_item mini-nav_item-nivo" to="/">
                    <span className="mini-nav_icon sprite-icons-nivo-logo" />
                </Link>
                <TransitionMotion
                    willEnter={this.willEnter}
                    willLeave={this.willLeave}
                    styles={currentItems.map(item => {
                        return {
                            key: item.label,
                            data: item,
                            style: {
                                top: spring((item.index + 1) * 56, {
                                    stiffness: 120,
                                    damping: 11,
                                }),
                                scale: spring(1, {
                                    stiffness: 120,
                                    damping: 11,
                                }),
                                opacity: spring(1),
                                zIndex: 10,
                            },
                        }
                    })}
                >
                    {interpolatedStyles => (
                        <div>
                            {interpolatedStyles.map(item => {
                                const style = {
                                    opacity: item.style.opacity,
                                    transform: `translate3d(0,${item.style.top}px,0) scale(${
                                        item.style.scale
                                    })`,
                                    zIndex: item.style.zIndex,
                                }

                                if (item.data.path) {
                                    return (
                                        <MiniNavLink key={item.key} style={style} {...item.data} />
                                    )
                                }

                                return (
                                    <span
                                        key="back"
                                        onClick={this.closeChildren}
                                        className="mini-nav_item"
                                        style={style}
                                    >
                                        <span className="mini-nav_icon sprite-icons-nav-back-red" />
                                    </span>
                                )
                            })}
                        </div>
                    )}
                </TransitionMotion>
            </aside>
        )
    }
}

export default MiniNav
