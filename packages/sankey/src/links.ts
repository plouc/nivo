import { line, curveMonotoneX, curveMonotoneY } from 'd3-shape'
import { DefaultLink, DefaultNode, SankeyLinkDatum } from './types'

export const sankeyLinkHorizontal = <N extends DefaultNode, L extends DefaultLink>() => {
    const lineGenerator = line().curve(curveMonotoneX)

    return (link: SankeyLinkDatum<N, L>, contract: number) => {
        const thickness = Math.max(1, link.thickness - contract * 2)
        const halfThickness = thickness / 2
        const linkLength = link.target.x0 - link.source.x1
        const padLength = linkLength * 0.12

        const dots: [number, number][] = [
            [link.source.x1, link.pos0 - halfThickness],
            [link.source.x1 + padLength, link.pos0 - halfThickness],
            [link.target.x0 - padLength, link.pos1 - halfThickness],
            [link.target.x0, link.pos1 - halfThickness],
            [link.target.x0, link.pos1 + halfThickness],
            [link.target.x0 - padLength, link.pos1 + halfThickness],
            [link.source.x1 + padLength, link.pos0 + halfThickness],
            [link.source.x1, link.pos0 + halfThickness],
            [link.source.x1, link.pos0 - halfThickness],
        ]

        return lineGenerator(dots) + 'Z'
    }
}

export const sankeyLinkVertical = <N extends DefaultNode, L extends DefaultLink>() => {
    const lineGenerator = line().curve(curveMonotoneY)

    return (link: SankeyLinkDatum<N, L>, contract: number) => {
        const thickness = Math.max(1, link.thickness - contract * 2)
        const halfThickness = thickness / 2
        const linkLength = link.target.y0 - link.source.y1
        const padLength = linkLength * 0.12

        const dots: [number, number][] = [
            [link.pos0 + halfThickness, link.source.y1],
            [link.pos0 + halfThickness, link.source.y1 + padLength],
            [link.pos1 + halfThickness, link.target.y0 - padLength],
            [link.pos1 + halfThickness, link.target.y0],
            [link.pos1 - halfThickness, link.target.y0],
            [link.pos1 - halfThickness, link.target.y0 - padLength],
            [link.pos0 - halfThickness, link.source.y1 + padLength],
            [link.pos0 - halfThickness, link.source.y1],
            [link.pos0 + halfThickness, link.source.y1],
        ]

        return lineGenerator(dots) + 'Z'
    }
}
