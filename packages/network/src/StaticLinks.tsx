import { memo } from 'react'
import PropTypes from 'prop-types'
import Link from './Link'

const StaticLinks = ({ links, linkThickness, linkColor }) => {
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

StaticLinks.propTypes = {
    links: PropTypes.array.isRequired,
    linkThickness: PropTypes.func.isRequired,
    linkColor: PropTypes.func.isRequired,
}

export default memo(StaticLinks)
