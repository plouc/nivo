const recursiveFlattener = (stack, name, node) => {
    if (node.children) {
        node.children.forEach(child => {
            recursiveFlattener(stack, node.name, child);
        });
    } else {
        stack.push({
            packageName: name,
            className:   node.name,
            value:       node.loc
        });
    }
};

export const flatten = root => {
    const nodes = [];

    recursiveFlattener(nodes, null, root);

    return { children: nodes };
};
