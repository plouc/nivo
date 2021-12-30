import { settingsMapper } from '../../../lib/settings'

export const dynamicNodeSizeValue = 'dynamic: (node: InputNode) => node.radius * 2'
export const dynamicActiveNodeSizeValue = 'dynamic: (node: InputNode) => node.radius * 3'
export const dynamicLinkThicknessValue =
    'dynamic: (link: ComputedLink) => (2 - link.source.data.depth) * 2'

export default settingsMapper({
    nodeSize: (value: number | typeof dynamicNodeSizeValue) => {
        if (value === dynamicNodeSizeValue) {
            return (node: any) => node.radius * 2
        }

        return value
    },
    activeNodeSize: (value: number | typeof dynamicActiveNodeSizeValue) => {
        if (value === dynamicActiveNodeSizeValue) {
            return (node: any) => node.radius * 3
        }

        return value
    },
    linkThickness: (value: number | typeof dynamicLinkThicknessValue) => {
        if (value === dynamicLinkThicknessValue) {
            return (link: any) => (2 - link.source.data.depth) * 2
        }

        return value
    },
})
