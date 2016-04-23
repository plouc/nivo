import React from 'react';


const decoratorsFromReactChildren = (children, type) => {
    const decorators = [];

    React.Children.forEach(children, element => {
        if (React.isValidElement(element)) {
            if (element.type[type]) {
                decorators.push(element.type[type](element));
            }
        }
    });

    return decorators;
};


export default decoratorsFromReactChildren;
