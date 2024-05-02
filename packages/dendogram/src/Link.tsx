import { ComputedLink } from './types'

interface LinkProps<Datum extends object> {
    link: ComputedLink<Datum>
}

export const Link = <Datum extends object>({ link }: LinkProps<Datum>) => {
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
