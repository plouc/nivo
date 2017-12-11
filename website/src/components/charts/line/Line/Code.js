import React from 'react'
import dedent from 'dedent-js'

export default () => {
    return dedent(`
    import React, { Fragment } from 'react'
    import { 
        Scales, LinearScaleX, LinearScaleY,
        AxisX, AxisY,
        Lines, Line,
        LineAreas, LineArea,
    } from '@nivo/line'
    
    <Scales scales={[
        <LinearScaleX id="x" data={[dataA, dataC]} width={500}/>,
        <LinearScaleY id="yA" data={[dataA]} axis="y" height={300}/>,
        <LinearScaleY id="yC" data={[dataC]} axis="y" height={300}/>
    ]}>
        {scales => (
            <Fragment>
                <Grid
                    width={500}
                    height={300}
                    xScale={scales.x}
                    yScale={scales.yA}
                    theme={defaultTheme}
                />
                <AxisX width={500} height={260} scale={scales.x} position="bottom" theme={defaultTheme}/>
                <AxisY width={460} height={260} scale={scales.yA} position="right" theme={defaultTheme}/>
                <LineAreas>
                    {generator => (
                        <Fragment>
                            <LineArea
                                generator={generator}
                                data={dataA.data}
                                xScale={scales.x}
                                yScale={scales.yA}
                                height={300}
                            />
                            <LineArea
                                generator={generator}
                                data={dataC.data}
                                xScale={scales.x}
                                yScale={scales.yC}
                                height={300}
                            />
                        </Fragment>
                    )}
                </LineAreas>
                <Lines>
                    {generator => (
                        <Fragment>
                            <Line
                                generator={generator}
                                data={dataA.data}
                                xScale={scales.x}
                                yScale={scales.yA}
                            />
                            <Line
                                generator={generator}
                                data={dataC.data}
                                xScale={scales.x}
                                yScale={scales.yC}
                            />
                        </Fragment>
                    )}
                </Lines>
            </Fragment>
        )}
    </Scales>
    `)
}
