import test                  from 'ava';
import d3                    from 'd3';
import { getColorGenerator } from '../src/ColorUtils';


test(`getColorGenerator() should return 'none' if 'none' provided`, t => {
    t.is(getColorGenerator('none'), 'none');
});

test(`getColorGenerator() should return a function to use 'data.color' if 'inherit' provided`, t => {
    const colorGenerator = getColorGenerator('inherit');
    const color          = '#FF0000';

    t.is(typeof colorGenerator, 'function');
    t.is(colorGenerator({ data: { color }}), color);
});

test(`getColorGenerator() should return a function to use darker 'data.color' if 'inherit:darker(*)' provided`, t => {
    const colorGenerator = getColorGenerator('inherit:darker(1)');
    const color          = '#FF0000';

    t.is(typeof colorGenerator, 'function');
    t.deepEqual(colorGenerator({ data: { color }}), d3.rgb(color).darker(1));
});

test(`getColorGenerator() 'inherit:darker(*)' should support floats`, t => {
    const colorGenerator = getColorGenerator('inherit:darker(.3)');
    const color          = '#FF0000';

    t.is(typeof colorGenerator, 'function');
    t.deepEqual(colorGenerator({ data: { color }}), d3.rgb(color).darker(.3));
});

test(`getColorGenerator() should return a function to use brighter 'data.color' if 'inherit:brighter(*)' provided`, t => {
    const colorGenerator = getColorGenerator('inherit:brighter(1)');
    const color          = '#FF0000';

    t.is(typeof colorGenerator, 'function');
    t.deepEqual(colorGenerator({ data: { color }}), d3.rgb(color).brighter(1));
});

test(`getColorGenerator() 'inherit:brighter(*)' should support floats`, t => {
    const colorGenerator = getColorGenerator('inherit:brighter(.3)');
    const color          = '#FF0000';

    t.is(typeof colorGenerator, 'function');
    t.deepEqual(colorGenerator({ data: { color }}), d3.rgb(color).brighter(.3));
});

test(`getColorGenerator() should throw on invalid directive`, t => {
    t.throws(() => {
        getColorGenerator('invalid');
    }, 'Unable to determine color generator');
});