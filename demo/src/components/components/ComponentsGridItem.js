import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ComponentsGridItem extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.name !== this.props.name
    }

    render() {
        const { path, name, className, tags } = this.props

        return (
            <Link to={path} className="components__grid__item">
                <span className={`components__grid__item__icon sprite-icons-${className}-red`} />
                <div className="components__grid__item__header">
                    <span className="components__grid__item__name">{name}</span>
                    {tags.length > 0 && (
                        <div className="components__grid__item__tags">
                            {tags.map(tag => (
                                <span key={tag} className="components__grid__item__tags__item">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </Link>
        )
    }
}
