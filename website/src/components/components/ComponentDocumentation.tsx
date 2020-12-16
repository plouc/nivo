import React from 'react'
import styled from 'styled-components'
import Markdown from '../Markdown'

interface Property {
    key: string
    name: string
    group: string
    required: boolean
    type: string
    help: string
    description: string
}

interface PropertyGroup {
    name: string
    properties: Property[]
}

interface ComponentDocumentationProps {
    groups: PropertyGroup[]
}

const PropContainer = styled.div`
    border-bottom: 1px solid #eeeeee;
    background: ${({ theme }) => theme.colors.cardBackground};
    font-size: 14px;
    padding: 12px 20px;
`

const Md = styled.div`
    font-size: 14px;
    
    pre,
    code {
        padding: 0;
        margin: 0;
    }
`

const PropertyDoc = ({ property }: { property: Property }) => {
    return (
        <PropContainer>
            <div><strong>{property.key}</strong></div>
            <Md>
                <Markdown source={property.description || property.help}/>
            </Md>
        </PropContainer>
    )
}

const PropGroup = ({ group }: { group: PropertyGroup }) => {
    return (
        <>
            {/*<h3>{group.name}</h3>*/}
            {group.properties.map(property => (
                <PropertyDoc property={property}/>
            ))}
        </>
    )
}

export const ComponentDocumentation = ({ groups }: ComponentDocumentationProps) => {
    console.log(groups)

    return (
        <div>
            {groups.map(group => (
                <PropGroup key={group.name} group={group}/>
            ))}
        </div>
    )
}