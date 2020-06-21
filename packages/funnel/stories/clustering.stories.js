/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useEffect, useState, Fragment } from 'react'
import styled from 'styled-components'
import { startCase, sum, random } from 'lodash'
import { randomNormal } from 'd3-random'
import { storiesOf } from '@storybook/react'
import { ResponsiveWaffle } from '../../waffle/src'
import { ResponsiveBar } from '../../bar/src'
import { ResponsiveFunnel } from '../src'

const stories = storiesOf('Funnel/sub-clustering', module)

const steps = ['sent', 'viewed', 'clicked', 'add_to_card', 'purchased']
const baseValue = 100000
const stepColors = ['#1ca5b2', '#5eb8cb', '#8ec1d7', '#79a3cd', '#5981da']
const ages = ['18-', '18-20', '20-30', '30-40', '40-50', '50-65', '65-80', '80+']
const genderColors = ['#5981da', '#8ec1d7']

const randomClusters = (total, numberOfClusters) => {
    const randomNumbers = Array.from({ length: numberOfClusters }, Math.random)
    const randomTotal = sum(randomNumbers)
    const randomRatios = randomNumbers.map(n => n / randomTotal)

    let remaining = total
    return randomRatios.map((ratio, index) => {
        // make sure the sum of all values equals total
        if (index === numberOfClusters - 1) return remaining

        const value = Math.round(ratio * total)
        remaining = remaining - value

        return value
    })
}

const randomNormalClusters = (
    total,
    numberOfClusters,
    { mean = 0.5, deviation = 0.2, _samples = 100 } = {}
) => {
    const samples = Math.max(numberOfClusters, _samples)
    const randNormal = randomNormal(mean, deviation)

    const step = 1 / numberOfClusters
    const steps = Array.from({ length: numberOfClusters }, (_, index) => step * (index + 1))
    const weights = Array.from({ length: numberOfClusters }).fill(0)
    Array.from({ length: samples }).forEach(() => {
        const n = randNormal()
        const stepIndex = steps.indexOf(steps.filter(s => n <= s)[0])
        weights[stepIndex]++
    })

    let remaining = total
    return weights.map((weight, index) => {
        if (index === numberOfClusters - 1) return remaining

        const value = Math.round((total * weight) / samples)
        remaining = remaining - value

        return value
    })
}

const generateData = () => {
    let lastValue = baseValue

    return steps.map(step => {
        lastValue = Math.round(lastValue * random(0.6, 0.95))

        const genderClusters = randomClusters(lastValue, 2)
        const ageClusters = randomNormalClusters(lastValue, ages.length, { mean: random(0.2, 0.8) })

        return {
            id: `step_${step}`,
            value: lastValue,
            label: startCase(step),
            byGender: [
                { id: 'male', value: genderClusters[0], label: 'Male' },
                { id: 'female', value: genderClusters[1], label: 'Female' },
            ],
            byAge: ageClusters.map((value, index) => ({
                id: ages[index],
                value,
            })),
        }
    })
}

const Container = styled.div`
    max-width: 900px;
    background-color: #222;
    padding: 24px 32px;
`

const Years = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 12px;
`

const YearButton = styled.div`
    cursor: pointer;
    background-color: ${props => (props.isCurrent ? '#1ca5b2' : '#000000')};
    height: 36px;
    display: flex;
    align-items: center;
    padding: 0 32px;
    border-radius: 18px;
    font-weight: 600;
    color: ${props => (props.isCurrent ? 'white' : '#555555')};

    &:hover {
        box-shadow: 0 0 0 2px #1ca5b2 inset;
        color: ${props => (props.isCurrent ? 'white' : '#1ca5b2')};
    }
`

const Header = styled.h2`
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    color: #999999;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 80px auto 100px 200px;
    grid-template-rows: 32px 40px 80px 80px 80px 80px 80px 40px;
    grid-column-gap: 12px;
    grid-row-gap: 1px;
    grid-template-areas:
        '0       1      gender  age'
        '0       funnel 2       age0'
        'bullet0 funnel gender0 age0'
        'bullet1 funnel gender1 age1'
        'bullet2 funnel gender2 age2'
        'bullet3 funnel gender3 age3'
        'bullet4 funnel gender4 age4'
        '3       funnel 4       age4';
`

const BulletWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Bullet = styled.div`
    width: 42px;
    height: 42px;
    border-radius: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    box-shadow: 0 0 0 5px black;
`

const funnelTheme = {
    labels: {
        text: {
            fontSize: 15,
            fontFamily: `'Consolas', monospace`,
        },
    },
    grid: {
        line: {
            stroke: '#444444',
        },
    },
}

const barTheme = {
    axis: {
        ticks: {
            line: {
                stroke: '#444444',
            },
            text: {
                fill: '#999999',
            },
        },
    },
    grid: {
        line: {
            stroke: '#444444',
        },
    },
}

const baseYear = 2010
const dataByYear = Array.from({ length: 6 }).map((_, index) => {
    return {
        year: baseYear + index,
        data: generateData(),
    }
})

const Sample = () => {
    const [yearIndex, setYearIndex] = useState(0)
    const currentYear = dataByYear[yearIndex]

    useEffect(() => {
        const timer = setTimeout(() => {
            setYearIndex(yearIndex < dataByYear.length - 1 ? yearIndex + 1 : 0)
        }, 2000)
        return () => clearTimeout(timer)
    }, [yearIndex, setYearIndex])

    return (
        <>
            <div
                style={{
                    margin: '0 0 16px 24px',
                    fontWeight: 400,
                    color: '#555',
                    lineHeight: '18px',
                }}
            >
                By combining a funnel chart with other chart types as small multiples, you can show
                arbitrary clustering across each step.
                <br />
                Here we&apos;re using the <code>Waffle</code> component from the{' '}
                <code>@nivo/waffle</code> package to show clustering by gender, and the{' '}
                <code>Bar</code> component from <code>@nivo/bar</code> to show the repartition by
                age.
                <br />
                In order to align the charts with the funnel, we&apos;re using a CSS grid.
            </div>
            <Container>
                <Years>
                    {dataByYear.map((year, index) => (
                        <YearButton
                            key={year.year}
                            isCurrent={index === yearIndex}
                            onClick={() => {
                                setYearIndex(index)
                            }}
                        >
                            {year.year}
                        </YearButton>
                    ))}
                </Years>
                <Grid>
                    <Header style={{ gridArea: 'gender' }}>gender</Header>
                    <Header style={{ gridArea: 'age' }}>age</Header>
                    <div style={{ gridArea: 'funnel' }}>
                        <ResponsiveFunnel
                            margin={{ top: 40, bottom: 40 }}
                            data={currentYear.data}
                            spacing={1}
                            enableBeforeSeparators={false}
                            beforeSeparatorOffset={20}
                            afterSeparatorOffset={20}
                            afterSeparatorLength={120}
                            theme={funnelTheme}
                            colors={stepColors}
                            borderWidth={20}
                            valueFormat=">-.4s"
                            labelColor="#000000"
                        />
                    </div>
                    {currentYear.data.map((datum, index) => {
                        const isFirst = index === 0
                        const isLast = index === currentYear.data.length - 1

                        let barAxisTop = null
                        if (isFirst) {
                            barAxisTop = {
                                tickSize: 10,
                                tickPadding: 12,
                                tickRotation: -90,
                            }
                        }

                        let barAxisBottom = null
                        if (isLast) {
                            barAxisBottom = {
                                tickSize: 0,
                                tickPadding: 12,
                                tickRotation: -90,
                            }
                        }

                        return (
                            <Fragment key={datum.id}>
                                <BulletWrapper style={{ gridArea: `bullet${index}` }}>
                                    <Bullet style={{ backgroundColor: stepColors[index] }}>
                                        {index + 1}
                                    </Bullet>
                                </BulletWrapper>
                                <div style={{ gridArea: `gender${index}` }}>
                                    <ResponsiveWaffle
                                        margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
                                        data={datum.byGender}
                                        colors={genderColors}
                                        total={datum.value}
                                        columns={5}
                                        rows={5}
                                        isInteractive={false}
                                        motionStiffness={110}
                                        motionDamping={8}
                                    />
                                </div>
                                <div style={{ gridArea: `age${index}` }}>
                                    <ResponsiveBar
                                        margin={{ top: isFirst ? 50 : 10, bottom: isLast ? 40 : 0 }}
                                        data={datum.byAge}
                                        theme={barTheme}
                                        colors={[stepColors[index]]}
                                        enableGridY={false}
                                        enableGridX={true}
                                        enableLabel={false}
                                        padding={0.3}
                                        axisTop={barAxisTop}
                                        axisBottom={barAxisBottom}
                                        axisLeft={null}
                                        isInteractive={false}
                                        motionStiffness={110}
                                        motionDamping={8}
                                    />
                                </div>
                            </Fragment>
                        )
                    })}
                </Grid>
            </Container>
        </>
    )
}

stories.add('demo', () => <Sample />)
