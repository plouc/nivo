import React from 'react'
import capitalize from 'lodash/capitalize.js'
import { FaQuestionCircle } from 'react-icons/fa'
import dedent from 'dedent-js'
import { CollapsibleTextExplanation } from '../CollapsibleTextExplanation'
import { Markdown } from '../../Markdown'
import { ScaleType } from '@nivo/scales'

export const ScaleUseCase = ({ type, children }: { type: ScaleType; children: string }) => {
    return (
        <CollapsibleTextExplanation
            title={`${capitalize(type)} scale use case`}
            icon={<FaQuestionCircle />}
        >
            <Markdown source={dedent(children)} />
        </CollapsibleTextExplanation>
    )
}
