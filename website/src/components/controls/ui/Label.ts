import styled from 'styled-components'

export const Label = styled.label`
    display: block;
    white-space: nowrap;
    padding-top: 3px;
    margin: 0;
    font-weight: 500;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.colors.text};
`
