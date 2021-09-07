import { memo } from 'react'
import Link from './Link'

interface StaticLinksProps {
    // links: PropTypes.array.isRequired,
    // linkThickness: PropTypes.func.isRequired,
    // linkColor: PropTypes.func.isRequired,
}

const StaticLinks = ({ links, linkThickness, linkColor }: StaticLinksProps) => {
    return links.map(link => {
        return (
            <Link
                key={link.id}
                link={link}
                color={linkColor(link)}
                thickness={linkThickness(link)}
                sourceX={link.source.x}
                sourceY={link.source.y}
                targetX={link.target.x}
                targetY={link.target.y}
            />
        )
    })
}

export default memo(StaticLinks)
