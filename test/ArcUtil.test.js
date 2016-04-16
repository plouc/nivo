import test    from 'ava';
import {
    midAngle
} from '../src/ArcUtils';


test('midAngle() should compute center of given angles', t => {
    t.is(midAngle({ startAngle: 0, endAngle: 90 }), 45);
});
