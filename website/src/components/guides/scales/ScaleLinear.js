/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'
import { useTheme } from '../../../theming/context'
import CodeBlock from '../../CodeBlock'
import { Title2, Title4 } from '../../titles'
import { DescriptionBlock } from '../../styled'

const treesApplesData = [
    {
        id: 'treesApples',
        data: [
            { x: 1, y: 60 },
            { x: 2, y: 110 },
            { x: 3, y: 150 },
            { x: 4, y: 170 },
            { x: 5, y: 180 },
        ],
    },
]

const SnippetsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 20px;
    background: white;
    padding: 0 32px 20px;
`

const ScaleLinear = () => {
    const theme = useTheme()

    return (
        <>
            <DescriptionBlock>
                <Title2 id="linear-scale">Linear scales</Title2>
                <p>
                    Linear scales can be used to map an input domain to a continuous output range.
                </p>
                <p>
                    For example the following (imaginary) line chart shows a number of trees and the
                    relation to the number of apples they give.
                </p>
            </DescriptionBlock>
            <SnippetsContainer>
                <div>
                    <Title4>data property</Title4>
                    <p>
                        As we can see, both axes data is linear, <code>x</code> contains the number
                        of trees, while <code>y</code> contains the number of apples.
                    </p>
                    <CodeBlock>
                        {`[{
    id: 'treesApples',
    data: [
        { x: 1, y: 60  },
        { x: 2, y: 110 },
        { x: 3, y: 150 },
        { x: 4, y: 170 },
        { x: 5, y: 180 }
    ]
}]`}
                    </CodeBlock>
                </div>
                <div>
                    <Title4>xScale property</Title4>
                    <p>
                        We need to set the <code>xScale</code> scale type to <code>linear</code>, we
                        set both <code>min</code> and <code>max</code> values to <code>'auto'</code>
                        , meaning nivo will automatically use the min/max <code>x</code> values to
                        define the min/max values of the domain, in this case: <code>1~5</code>.
                    </p>
                    <CodeBlock>
                        {`{
    type: 'linear',
    min: 'auto',
    max: 'auto'
}`}
                    </CodeBlock>
                </div>
                <div>
                    <Title4>yScale property</Title4>
                    <p>
                        We're also setting the <code>yScale</code> scale type to <code>linear</code>
                        , but instead of letting nivo automatically pick min/max values, we're
                        setting explicit <code>min</code> and <code>max</code> values (
                        <code>0~200</code>). If we were using <code>'auto'</code> like for{' '}
                        <code>xScale</code>, we'll get a domain ranging from <code>60</code> to{' '}
                        <code>180</code>.
                    </p>
                    <CodeBlock>
                        {`{
    type: 'linear',
    min: 0,
    max: 200
}`}
                    </CodeBlock>
                </div>
                <div style={{ height: 320 }}>
                    <ResponsiveLine
                        theme={theme.nivo}
                        margin={{ top: 10, right: 10, bottom: 30, left: 30 }}
                        colors={['#e25d47']}
                        data={treesApplesData}
                        xScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                        }}
                        yScale={{
                            type: 'linear',
                            min: 0,
                            max: 200,
                        }}
                    />
                </div>
            </SnippetsContainer>
        </>
    )
}

export default ScaleLinear
