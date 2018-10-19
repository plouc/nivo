import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CollapsibleCard from './CollapsibleCard'
import ComponentPropsList from './ComponentPropsList'
import { filterPropertiesByScope } from '../lib/componentProperties'

export default class ComponentPropsDoc extends Component {
    static propTypes = {
        component: PropTypes.string.isRequired,
        properties: PropTypes.array.isRequired,
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        const { component, properties } = this.props

        const filteredProperties = filterPropertiesByScope(
            properties.filter(property => property.excludeFromDoc !== true),
            component,
            true
        )

        return (
            <CollapsibleCard title={`${component} properties`} expandedByDefault={true}>
                <ComponentPropsList properties={filteredProperties} />
            </CollapsibleCard>
        )
    }
}
