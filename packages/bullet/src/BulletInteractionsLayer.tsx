import { BulletNode, BulletTooltipComponent, Bullet } from './types'

interface BulletInteractionsLayerProps {
    nodes: readonly BulletNode[]
    tooltip: BulletTooltipComponent
}

export const BulletInteractionsLayer = ({
    nodes,
    tooltip,
    // onMouseEnter,
    // onMouseMove,
    // onMouseLeave,
    // onClick,
    // onDoubleClick,
    // onFocus,
    // onBlur,
    // onKeyDown,
    // onWheel,
    // onContextMenu,
}: BulletInteractionsLayerProps) => {
    return (
        <>
            {nodes.map(node => (
                <BulletCaptureRect
                    key={node.id}
                    node={node}
                    // onMouseEnter={event => handleMouseEnter(node, event)}
                    // onMouseMove={event => handleMouseMove(node, event)}
                    // onMouseLeave={event => handleMouseLeave(node, event)}
                    // onClick={event => handleClick(node, event)}
                    // onDoubleClick={event => handleDoubleClick(node, event)}
                    // onFocus={event => handleFocus(node, event)}
                    // onBlur={event => handleBlur(node, event)}
                    // onKeyDown={event => handleKeyDown(node, event)}
                    // onWheel={event => handleWheel(node, event)}
                    // onContextMenu={event => handleContextMenu(node, event)}
                />
            ))}
        </>
    )
}

const BulletCaptureRect = ({
    node,
}: {
    node: BulletNode
    onMouseEnter: (event: MouseEvent) => void
}) => {
    return (
        <rect
            x={node.rect.x}
            y={node.rect.y}
            width={node.rect.width}
            height={node.rect.height}
            fill="red"
            opacity={0.3}
        />
    )
}
