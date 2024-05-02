import { LinkComponentProps } from './types'

export const Link = <Datum extends object>({ link }: LinkComponentProps<Datum>) => {
    // console.log(link)

    return (
        <line
            x1={link.source.x}
            y1={link.source.y}
            x2={link.target.x}
            y2={link.target.y}
            stroke="red"
        />
    )
}
