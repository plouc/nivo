/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import Label from './Label'
import TextInput from './TextInput'
import { Help } from './styled'

const Range = styled.input`
    max-width: 160px;
`

const Value = styled.div`
    margin-bottom: 5px;
    padding-left: 89px;
    display: grid;
    grid-column-gap: 9px;
    grid-template-columns: 60px auto;

    & > *:first-child {
        text-align: right;
        font-weight: 500;
    }
`

const Row = styled.div`
    display: grid;
    grid-template-columns: 80px 60px auto;
    grid-column-gap: 9px;
    max-width: 240px;
    margin-bottom: 5px;
`

const NumberArrayControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    options: { unit, items },
    value,
    onChange,
}) => {
    const handleChange = useCallback(
        index => event => {
            const updatedArray = [...value]
            updatedArray[index] = Number(event.target.value)
            onChange(updatedArray)
        },
        [onChange, value]
    )

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader {...property} />
            <Value>
                <span>value</span>
                <code>
                    [
                    {value.map((v, i) => {
                        return (
                            <Fragment key={i}>
                                {i > 0 && <span>, </span>}
                                <code className="code-number">{v}</code>
                            </Fragment>
                        )
                    })}
                    ]
                </code>
            </Value>
            {items.map(({ label, min, max, step }, i) => {
                const itemId = `${id}-${i}`

                return (
                    <Row key={itemId}>
                        <Label htmlFor={itemId}>{label}</Label>
                        <TextInput
                            id={itemId}
                            value={value[i]}
                            isNumber={true}
                            unit={unit}
                            onChange={handleChange(i)}
                        />
                        <Range
                            type="range"
                            value={value[i]}
                            onChange={handleChange(i)}
                            min={min}
                            max={max}
                            step={step || 1}
                        />
                    </Row>
                )
            })}
            <Help>{property.help}</Help>
        </Control>
    )
}

NumberArrayControl.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    options: PropTypes.shape({
        unit: PropTypes.string,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.node.isRequired,
                min: PropTypes.number.isRequired,
                max: PropTypes.number.isRequired,
                step: PropTypes.number,
            })
        ).isRequired,
    }).isRequired,
    value: PropTypes.arrayOf(PropTypes.number).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default NumberArrayControl
