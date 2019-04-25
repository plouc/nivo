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
import styled from 'styled-components'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import TextInput from './TextInput'
import { Help } from './styled'

const Grid = styled.div`
    display: grid;
    grid-template-columns: 50px 60px 50px 60px auto;
    grid-column-gap: 9px;
    grid-row-gap: 5px;
    margin-bottom: 5px;
`

const Label = styled.label`
    text-align: right;
`

const BoxCell = styled.div`
    grid-column-start: 5;
    grid-row-start: 1;
    grid-row-end: 3;
    padding: 5px 0;
`

const Box = styled.div`
    width: 100%;
    height: 100%;
    max-width: 80px;
    margin-left: 12px;
    border: 2px solid ${({ theme }) => theme.colors.border};
    ${({ side, theme }) => {
        if (side === null) return ''

        return `
            border-${side}-color: ${theme.colors.accent};
            border-${side}-width: 3px;
        `
    }}
`

export default class MarginControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        property: PropTypes.object.isRequired,
        flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
        currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
        value: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }).isRequired,
        onChange: PropTypes.func.isRequired,
    }

    state = {
        side: null,
    }

    handleChange = side => e => {
        const { onChange, value } = this.props
        onChange({
            ...value,
            [side]: Number(e.target.value),
        })
    }

    handleFocus = side => () => {
        this.setState({ side })
    }

    handleBlur = () => {
        this.setState({ side: null })
    }

    render() {
        const { id, property, flavors, currentFlavor, value } = this.props
        const { side } = this.state

        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader {...property} />
                <Grid>
                    <Label htmlFor={`${id}-top`}>top</Label>
                    <TextInput
                        id={`${id}-top`}
                        value={value.top}
                        unit="px"
                        isNumber={true}
                        onChange={this.handleChange('top')}
                        onFocus={this.handleFocus('top')}
                        onBlur={this.handleBlur}
                    />
                    <Label htmlFor={`${id}-right`}>right</Label>
                    <TextInput
                        id={`${id}-right`}
                        value={value.right}
                        unit="px"
                        isNumber={true}
                        onChange={this.handleChange('right')}
                        onFocus={this.handleFocus('right')}
                        onBlur={this.handleBlur}
                    />
                    <BoxCell>
                        <Box side={side} />
                    </BoxCell>
                    <Label htmlFor={`${id}-bottom`}>bottom</Label>
                    <TextInput
                        id={`${id}-bottom`}
                        value={value.bottom}
                        unit="px"
                        isNumber={true}
                        onChange={this.handleChange('bottom')}
                        onFocus={this.handleFocus('bottom')}
                        onBlur={this.handleBlur}
                    />
                    <Label htmlFor={`${id}-left`}>left</Label>
                    <TextInput
                        id={`${id}-left`}
                        value={value.left}
                        unit="px"
                        isNumber={true}
                        onChange={this.handleChange('left')}
                        onFocus={this.handleFocus('left')}
                        onBlur={this.handleBlur}
                    />
                </Grid>
                <Help>{property.help}</Help>
            </Control>
        )
    }
}
