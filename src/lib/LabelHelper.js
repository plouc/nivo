/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import _  from 'lodash';
import d3 from 'd3';


export const getLabelGenerator = (label, labelFormat) => {
    if (_.isFunction(label)) {
        return label;
    }

    let format;
    if (labelFormat) {
        format = d3.format(labelFormat);
    }

    return data => {
        let labelOutput = '';
        if (_.isString(label)) {
            labelOutput = data[label];
        }

        if (format) {
            labelOutput = format(labelOutput);
        }

        return labelOutput;
    };
};
