import shuffle from 'lodash/shuffle'
import { generateBulletData as generateBulletDataSerie } from '@nivo/generators'

export default () => ({
    data: [
        generateBulletDataSerie('temp.', shuffle([100, 120, 140])[0]),
        generateBulletDataSerie('power', 2, { float: true, measureCount: 2 }),
        generateBulletDataSerie('volume', shuffle([40, 60, 80])[0], { rangeCount: 8 }),
        generateBulletDataSerie('cost', 500000, { measureCount: 2 }),
        generateBulletDataSerie('revenue', shuffle([9, 11, 13])[0], { markerCount: 2 }),
    ],
})
