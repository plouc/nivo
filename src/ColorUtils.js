import d3 from 'd3';


export const getColorGenerator = instruction => {
    if (instruction === 'none') {
        return 'none';
    }

    if (instruction === 'inherit') {
        return d => d.data.color;
    }

    const inheritMatches = instruction.match(/inherit:(darker|brighter)\(([0-9.]+)\)/);
    if (inheritMatches) {
        const method = inheritMatches[1];
        const amount = inheritMatches[2];

        return d => d3.rgb(d.data.color)[method](parseFloat(amount));
    }

    throw new Error('Unable to determine color generator');
};


export const getColorStyleObject = (instruction, property) => {
    const style = {};

    const color = getColorGenerator(instruction);
    if (color !== 'none') {
        style[property] = color;
    }

    return style;
};