import { settingsMapper } from '../../../lib/settings'

export const dynamicNodeSizeValue = 'dynamic: (node: InputNode) => node.size'
export const dynamicActiveNodeSizeValue = 'dynamic: (node: InputNode) => node.size * 1.5'
export const dynamicLinkThicknessValue =
    'dynamic: (link: ComputedLink) => (2 - link.source.data.depth) * 2'

export default settingsMapper({
    nodeSize: (value: number | typeof dynamicNodeSizeValue) => {
        if (value === dynamicNodeSizeValue) {
            return (node: any) => node.size
        }

        return value
    },
    activeNodeSize: (value: number | typeof dynamicActiveNodeSizeValue) => {
        if (value === dynamicActiveNodeSizeValue) {
            return (node: any) => node.size * 1.5
        }

        return value
    },
    linkThickness: (value: number | typeof dynamicLinkThicknessValue) => {
        if (value === dynamicLinkThicknessValue) {
            return (link: any) => 2 + link.target.data.height * 2
        }

        return value
    },
})
