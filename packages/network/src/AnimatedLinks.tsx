import { memo } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { useMotionConfig } from '@nivo/core'
import Link from './Link'

const willEnter = ({ style, data }) => {
    const sourceX = data.previousSource ? data.previousSource.x : style.sourceX.val
    const sourceY = data.previousSource ? data.previousSource.y : style.sourceY.val

    return {
        sourceX,
        sourceY,
        targetX: sourceX,
        targetY: sourceY,
    }
}

interface AnimatedLinksProps {
    // links: PropTypes.array.isRequired,
    // linkThickness: PropTypes.func.isRequired,
    // linkColor: PropTypes.func.isRequired,
}

const AnimatedLinks = ({ links, linkThickness, linkColor }: AnimatedLinksProps) => {
    const { springConfig } = useMotionConfig()

    return (
        <TransitionMotion
            willEnter={willEnter}
            styles={links.map(link => ({
                key: link.id,
                data: link,
                style: {
                    sourceX: spring(link.source.x, springConfig),
                    sourceY: spring(link.source.y, springConfig),
                    targetX: spring(link.target.x, springConfig),
                    targetY: spring(link.target.y, springConfig),
                },
            }))}
        >
            {interpolatedStyles => (
                <>
                    {interpolatedStyles.map(({ key, style, data: link }) => {
                        return (
                            <Link
                                key={key}
                                link={link}
                                color={linkColor(link)}
                                thickness={linkThickness(link)}
                                sourceX={style.sourceX}
                                sourceY={style.sourceY}
                                targetX={style.targetX}
                                targetY={style.targetY}
                            />
                        )
                    })}
                </>
            )}
        </TransitionMotion>
    )
}

export default memo(AnimatedLinks)
