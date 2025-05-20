import React, { createElement, FunctionComponent, useCallback, useState } from 'react'
import capitalize from 'lodash/capitalize.js'
import dedent from 'dedent-js'
import { FaQuestionCircle } from 'react-icons/fa'
import { HiOutlineCursorClick } from 'react-icons/hi'
import { ScaleType } from '@nivo/scales'
import { Markdown } from '../../Markdown'
import { DescriptionBlock } from '../../styled'
import { CollapsibleTextExplanation } from '../CollapsibleTextExplanation'
import { ScaleConfigAttr } from './types'
import { ScaleDemoToggle } from './demo'
import { ScaleConfig } from './ScaleConfig'

interface ScaleGuideProps {
    type: ScaleType
    description: string
    useCase: string
    config: ScaleConfigAttr[]
    demo?: FunctionComponent<{
        onClose: () => void
    }>
}

export const ScaleGuide = ({ type, description, useCase, config, demo }: ScaleGuideProps) => {
    const [isDemoOpen, setIsDemoOpen] = useState(false)

    const toggleDemo = useCallback(() => {
        setIsDemoOpen(prev => !prev)
    }, [setIsDemoOpen])

    const onDemoClose = useCallback(() => {
        setIsDemoOpen(false)
    }, [setIsDemoOpen])

    const capitalizedType = capitalize(type)

    return (
        <>
            <DescriptionBlock>
                <h2 id={`${type}-scale`}>
                    <a href={`#${type}-scale`}>{capitalizedType} scale</a>
                </h2>
                <Markdown source={dedent(description)} />
                <CollapsibleTextExplanation
                    title={`${capitalizedType} scale use case`}
                    icon={<FaQuestionCircle />}
                >
                    <Markdown source={dedent(useCase)} />
                </CollapsibleTextExplanation>
                <ScaleConfig type={type} config={config} />
            </DescriptionBlock>
            {demo !== undefined && (
                <>
                    {!isDemoOpen && (
                        <ScaleDemoToggle onClick={toggleDemo}>
                            <HiOutlineCursorClick />
                            <span>{capitalizedType} scale interactive demo</span>
                        </ScaleDemoToggle>
                    )}
                    {isDemoOpen && createElement(demo, { onClose: onDemoClose })}
                </>
            )}
        </>
    )
}
