import d3                        from 'd3';
import { nivoCategoricalColors } from './ColorUtils';

const defaults = {
    transitionDuration: 600,
    transitionEasing:   'cubic-out',
    colorRange:         d3.scale.category20b(),
    margin:             {
        top:    0,
        right:  0,
        bottom: 0,
        left:   0
    }
};


export default {
    defaults,
    colors: {
        nivoCategoricalColors
    }
};
