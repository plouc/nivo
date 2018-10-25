import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

// .components__grid__item
const Container = styled(Link)`
    margin-bottom: 20px;
    text-decoration: none;
    border-radius: 2px;
    padding: 12px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.cardBackground};
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    width: 32%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:focus,
    &:hover {
        color: ${({ theme }) => theme.colors.accent};
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        border-color: ${({ theme }) => theme.colors.accent};
        outline: 0;
    }
`

const Header = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`

const Icon = styled.span`
    margin-right: 15px;
    display: block;
    width: 52px;
    height: 52px;
`

const Name = styled.span`
    font-size: 15px;
    font-weight: 600;
`

const Tags = styled.div`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textLight};
    line-height: 1em;
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;
`

const TagsItem = styled.span`
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 6px;
    border-left: 1px solid ${({ theme }) => theme.colors.accent};
    padding-left: 7px;

    &:first-child {
        padding-left: 0;
        border-left: none;
    }
`

export default class ExplorerGridItem extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.name !== this.props.name
    }

    render() {
        const { package: pkg, id, name, tags } = this.props

        let path = `/${pkg}`
        if (id !== 'base') {
            path = `${path}/${id}`
        }

        return (
            <Container to={path}>
                <Icon className={`chart-icon-${pkg}-red`} />
                <Header>
                    <Name>{name}</Name>
                    {tags.length > 0 && (
                        <Tags>
                            {tags.map(tag => (
                                <TagsItem key={tag}>{tag}</TagsItem>
                            ))}
                        </Tags>
                    )}
                </Header>
            </Container>
        )
    }
}
