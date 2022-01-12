import React, { useMemo } from 'react'
import random from 'lodash/random'
import { Marimekko } from '@nivo/marimekko'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

const getRandomValue = () => random(0, 32)

const generateData = () =>
    [`it's good`, `it's sweet`, `it's spicy`, 'worth eating', 'worth buying'].map(statement => ({
        statement,
        participation: getRandomValue(),
        stronglyAgree: getRandomValue(),
        agree: getRandomValue(),
        disagree: getRandomValue(),
        stronglyDisagree: getRandomValue(),
    }))

export const HomeMarimekkoDemo = () => {
    const data = useMemo(() => generateData(), [])
    const { colors, nivoTheme } = useHomeTheme()

    return (
        <div id="marimekko">
            <Marimekko
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={data}
                id="statement"
                value="participation"
                dimensions={[
                    {
                        id: 'disagree strongly',
                        value: 'stronglyDisagree',
                    },
                    {
                        id: 'disagree',
                        value: 'disagree',
                    },
                    {
                        id: 'agree',
                        value: 'agree',
                    },
                    {
                        id: 'agree strongly',
                        value: 'stronglyAgree',
                    },
                ]}
                colors={colors}
                defs={[
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'rgba(0, 0, 0, 0)',
                        color: 'inherit',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                fill={[
                    {
                        match: {
                            id: 'agree strongly',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'disagree strongly',
                        },
                        id: 'lines',
                    },
                ]}
                borderWidth={1}
                borderColor={colors[3]}
                innerPadding={6}
                offset="expand"
                enableGridX={false}
                enableGridY={false}
                isInteractive={false}
                animate={false}
                theme={nivoTheme}
            />
        </div>
    )
}
