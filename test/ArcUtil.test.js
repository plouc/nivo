/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import test    from 'ava';
import {
    midAngle
} from '../src/ArcUtils';


test('midAngle() should compute center of given angles', t => {
    t.is(midAngle({ startAngle: 0, endAngle: 90 }), 45);
});
