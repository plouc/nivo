import { createRef, useMemo, useRef } from 'react'
import { RectNodeHandle, NodeRefMap } from './types'

/**
 * Create and Syncs nodeRefs.
 */
export const useNodeRefs = (nodeIds: readonly string[]) => {
    const nodeRefs = useRef<NodeRefMap>({})

    useMemo(() => {
        for (const nodeId of nodeIds) {
            if (!nodeRefs.current[nodeId]) {
                nodeRefs.current[nodeId] = createRef<RectNodeHandle>()
            }
        }

        // Clean up refs no longer in use
        const currentIds = new Set(nodeIds)
        for (const nodeId in nodeRefs.current) {
            if (!currentIds.has(nodeId)) {
                delete nodeRefs.current[nodeId]
            }
        }
    }, [nodeIds])

    return nodeRefs
}
