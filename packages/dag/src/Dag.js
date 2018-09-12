/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import setDisplayName from 'recompose/setDisplayName'
import { TransitionMotion, spring } from 'react-motion'
import { line, curveLinear, curveCatmullRom } from 'd3-shape'
import {
    dratify,
    dierarchy,
    sugiyama,
    layeringLongestPath,
    layeringSimplex,
    layeringCoffmanGraham,
    layeringTopological,
    decrossOpt,
    decrossTwoLayer,
    coordSpread,
    coordVert,
    coordMinCurve,
    coordGreedy,
    coordTopological,
} from 'd3-dag'
import { withMotion, Container, SvgWrapper } from '@nivo/core'
import { Axis } from '@nivo/axes'
import { commonPropTypes, commonDefaultProps } from './props'
import { commonEnhancers } from './enhance'

const layeringById = {
    longestPath: layeringLongestPath,
    simplex: layeringSimplex,
    coffmanGraham: layeringCoffmanGraham,
    topological: layeringTopological,
}

const decrossById = {
    optimal: decrossOpt,
    twoLayers: decrossTwoLayer,
}

const coordById = {
    spread: coordSpread,
    vertical: coordVert,
    minCurve: coordMinCurve,
    greedy: coordGreedy,
    topological: coordTopological,
}

const grafo = [
    {
        id: '0',
        parentIds: ['8'],
    },
    {
        id: '1',
        parentIds: [],
    },
    {
        id: '2',
        parentIds: [],
    },
    {
        id: '3',
        parentIds: ['11'],
    },
    {
        id: '4',
        parentIds: ['12'],
    },
    {
        id: '5',
        parentIds: ['18'],
    },
    {
        id: '6',
        parentIds: ['9', '15', '17'],
    },
    {
        id: '7',
        parentIds: ['3', '17', '20', '21'],
    },
    {
        id: '8',
        parentIds: [],
    },
    {
        id: '9',
        parentIds: ['4'],
    },
    {
        id: '10',
        parentIds: ['16', '21'],
    },
    {
        id: '11',
        parentIds: ['2'],
    },
    {
        id: '12',
        parentIds: ['21'],
    },
    {
        id: '13',
        parentIds: ['4', '12'],
    },
    {
        id: '14',
        parentIds: ['1', '8'],
    },
    {
        id: '15',
        parentIds: [],
    },
    {
        id: '16',
        parentIds: ['0'],
    },
    {
        id: '17',
        parentIds: ['19'],
    },
    {
        id: '18',
        parentIds: ['9'],
    },
    {
        id: '19',
        parentIds: [],
    },
    {
        id: '20',
        parentIds: ['13'],
    },
    {
        id: '21',
        parentIds: [],
    },
]

const lineGenerator = line()
    .curve(curveLinear)
    .x(d => d.x)
    .y(d => d.y)

export class Dag extends Component {
    static propTypes = {
        ...commonPropTypes,
    }

    render() {
        const {
            layering,
            coord,
            margin,
            width,
            height,
            outerWidth,
            outerHeight,
            theme,
            animate,
            motionStiffness,
            motionDamping,
            isInteractive,
        } = this.props

        const motionProps = {
            animate,
            motionStiffness,
            motionDamping,
        }

        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        const dag = dratify()(grafo)
        sugiyama()
            .size([width, height])
            .layering(layeringById[layering]())
            .coord(coordById[coord]())(dag)

        const nodes = dag.descendants()
        const links = dag.links()

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => (
                    <SvgWrapper
                        width={outerWidth}
                        height={outerHeight}
                        margin={margin}
                        theme={theme}
                    >
                        {links.map(link => {
                            let points = [
                                {
                                    x: link.source.x,
                                    y: link.source.y,
                                },
                            ]
                            if (link.data.points) {
                                points = points.concat(link.data.points)
                            }
                            points.push({
                                x: link.target.x,
                                y: link.target.y,
                            })

                            return (
                                <path
                                    key={`${link.source.id}.${link.target.id}`}
                                    d={lineGenerator(points)}
                                    fill="none"
                                    stroke="rgba(0, 0, 0, .35)"
                                    strokeWidth={2}
                                />
                            )
                        })}
                        <TransitionMotion
                            styles={nodes.map(node => ({
                                key: node.id,
                                data: node,
                                style: {
                                    x: spring(node.x, springConfig),
                                    y: spring(node.y, springConfig),
                                },
                            }))}
                        >
                            {styles => (
                                <Fragment>
                                    {styles.map(({ key, style, data }) => (
                                        <circle
                                            key={key}
                                            cx={style.x}
                                            cy={style.y}
                                            r={10}
                                            fill="black"
                                        />
                                    ))}
                                </Fragment>
                            )}
                        </TransitionMotion>
                    </SvgWrapper>
                )}
            </Container>
        )
    }
}

const enhance = compose(
    defaultProps(commonDefaultProps),
    ...commonEnhancers,
    withMotion(),
    pure
)

export default setDisplayName('Dag')(enhance(Dag))
