import React, { Fragment } from 'react'
import { random } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Marimekko, Layout } from '../src'

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

const commonProps = {
    width: 900,
    height: 500,
    margin: {
        top: 40,
        right: 80,
        bottom: 40,
        left: 80,
    },
    id: 'statement',
    value: 'participation',
    layout: 'vertical' as Layout,
    axisLeft: {},
    axisBottom: {},
    dimensions: [
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
    ],
}

const stories = storiesOf('Marimekko', module)

stories.addDecorator(withKnobs)

stories.add('default', () => <Marimekko {...commonProps} data={generateData()} />)

stories.add('using arrays for data', () => {
    type RawDatum = [string, number, number, number, number]

    const data: RawDatum[] = [
        ['A', 42, 9, 3, 31],
        ['B', 21, 13, 21, 9],
        ['C', 34, 7, 12, 32],
    ]

    return (
        <Marimekko<RawDatum>
            {...commonProps}
            data={data}
            id={0}
            value={1}
            dimensions={[
                {
                    id: 'cool stuff',
                    value: 2,
                },
                {
                    id: 'not cool stuff',
                    value: 3,
                },
                {
                    id: 'YABAI!',
                    value: 4,
                },
            ]}
        />
    )
})

stories.add('diverging', () => {
    const data = generateData()
    data.forEach(datum => {
        datum.disagree *= -1
        datum.stronglyDisagree *= -1
    })

    return (
        <Marimekko
            {...commonProps}
            data={data}
            layout="horizontal"
            offset="diverging"
            axisBottom={{
                format: (v: number) => Math.abs(v),
            }}
        />
    )
})

const ShadowsLayer = ({ data }) => (
    <>
        {data.map(datum => (
            <Fragment key={datum.id}>
                <rect
                    x={datum.x - 6}
                    y={datum.y + 9}
                    width={datum.width}
                    height={datum.height}
                    opacity={0.15}
                />
                <rect
                    x={datum.x}
                    y={datum.y}
                    width={datum.width}
                    height={datum.height}
                    stroke="#ffffff"
                    strokeWidth={4}
                />
            </Fragment>
        ))}
    </>
)

const StatementsLayer = ({ data }) => (
    <>
        {data.map(datum => {
            return (
                <g key={datum.id} transform={`translate(370, ${datum.y - 9})`}>
                    <text textAnchor="middle" style={{ fontWeight: '600', fontSize: 14 }}>
                        {datum.id}
                    </text>
                </g>
            )
        })}
    </>
)

stories.add('custom layers', () => {
    return (
        <Marimekko
            {...commonProps}
            height={700}
            data={generateData()}
            innerPadding={32}
            enableGridY={false}
            layout="horizontal"
            offset="silouhette"
            layers={['grid', 'axes', ShadowsLayer, 'bars', StatementsLayer]}
            axisLeft={undefined}
            axisBottom={undefined}
        />
    )
})
