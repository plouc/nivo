export const HIERARCHICAL_NODE_TYPE_ROOT         = 'root';
export const HIERARCHICAL_NODE_TYPE_INTERMEDIATE = 'intermediate';
export const HIERARCHICAL_NODE_TYPE_LEAF         = 'leaf';


export const getHierarchicalNodeType = node => {
    if (node.depth === 0) {
        return HIERARCHICAL_NODE_TYPE_ROOT;
    } else if (!node.children || node.children.length === 0) {
        return HIERARCHICAL_NODE_TYPE_LEAF;
    }

    return HIERARCHICAL_NODE_TYPE_INTERMEDIATE;
};
