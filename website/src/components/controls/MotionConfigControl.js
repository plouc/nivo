/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback, useState } from 'react'
import { config as springConfig } from 'react-spring'
import { isString } from 'lodash'
import styled from 'styled-components'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import Radio from './Radio'
import Select from './Select'
import Switch from './Switch'
import { Help } from './styled'

const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 9px;
`

const CustomControls = styled.div`
    display: grid;
    grid-template-columns: 50px 25px auto 50px 25px auto;
    align-items: center;
    column-gap: 9px;
    row-gap: 9px;
    margin-bottom: 9px;
`

const presetOptions = Object.keys(springConfig).map(presetId => ({
    value: presetId,
    label: presetId,
}))

const defaultConfig = {
    mass: 1,
    tension: 170,
    friction: 26,
    clamp: false,
    precision: 0.01,
    velocity: 0,
}

const MotionConfigControl = memo(({ id, property, flavors, currentFlavor, value, onChange }) => {
    const type = isString(value) ? 'preset' : 'custom'
    const [preset, setPreset] = useState(type === 'preset' ? value : 'default')
    const [customConfig, setCustomConfig] = useState(type === 'custom' ? value : defaultConfig)

    const handleTypeChange = useCallback(
        event => {
            const newType = event.target.value
            if (newType === 'preset') {
                onChange(preset)
            } else {
                onChange(customConfig)
            }
        },
        [onChange]
    )

    const handlePresetChange = useCallback(
        option => {
            setPreset(option.value)
            onChange(option.value)
        },
        [onChange]
    )

    const handleMassChange = event => {
        const mass = Number(event.target.value)
        const newCustomConfig = {
            ...customConfig,
            mass,
        }
        setCustomConfig(newCustomConfig)
        onChange(newCustomConfig)
    }

    const handleTensionChange = event => {
        const tension = Number(event.target.value)
        const newCustomConfig = {
            ...customConfig,
            tension,
        }
        setCustomConfig(newCustomConfig)
        onChange(newCustomConfig)
    }

    const handleFrictionChange = event => {
        const friction = Number(event.target.value)
        const newCustomConfig = {
            ...customConfig,
            friction,
        }
        setCustomConfig(newCustomConfig)
        onChange(newCustomConfig)
    }

    const handleClampChange = clamp => {
        const newCustomConfig = {
            ...customConfig,
            clamp,
        }
        setCustomConfig(newCustomConfig)
        onChange(newCustomConfig)
    }

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader id={id} {...property} />
            <Row>
                <Radio
                    options={[
                        { value: 'preset', label: 'preset' },
                        { value: 'custom', label: 'custom' },
                    ]}
                    value={type}
                    onChange={handleTypeChange}
                />
                {type === 'preset' && (
                    <Select
                        options={presetOptions}
                        value={presetOptions.find(option => option.value === value)}
                        onChange={handlePresetChange}
                    />
                )}
                {type === 'custom' && (
                    <CustomControls>
                        <label>mass</label>
                        <code className="code-number">{value.mass}</code>
                        <input
                            type="range"
                            value={value.mass}
                            onChange={handleMassChange}
                            min={1}
                            max={500}
                        />

                        <label>tension</label>
                        <code className="code-number">{value.tension}</code>
                        <input
                            type="range"
                            value={value.tension}
                            onChange={handleTensionChange}
                            min={1}
                            max={500}
                        />

                        <label>friction</label>
                        <code className="code-number">{value.friction}</code>
                        <input
                            type="range"
                            value={value.friction}
                            onChange={handleFrictionChange}
                            min={1}
                            max={500}
                        />

                        <Switch
                            value={value.clamp}
                            id={`${id}clamp`}
                            onChange={handleClampChange}
                        />
                        <span />
                        <label htmlFor={`${id}clamp.switch`}>clamp</label>
                    </CustomControls>
                )}
            </Row>
            <Help>{property.help}</Help>
        </Control>
    )
})

export default MotionConfigControl
