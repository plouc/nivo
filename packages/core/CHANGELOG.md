

- removed all of `lib/colors/` - generation of color scales is now available in @nivo/colors. The only package making use of getColorScale is @nivo/bullet.

- removed `props/colors.js` - all color-related tools are provided by @nivo/colors.

- removed `defaultCategoricalColors` and `defaultColorRange` from `defaults/index`

- removed `absoluteAngleDegrees` and `absoluteAngleRadians` from `lib/polar/utils`. For `absoluteAngleDegrees`, use `normalizeAngle` instead. `absoluteAngleRadians` was not used by any of the packages.

- removed `props.defs.js` - types for defs are now defined in the `components` subdir

- 




- getColorScale() - Before removing lib/colors, did some work on content of lib/colors. In particular, for sequential color scheme, it is no longer necessary to prefix the 'colors' string with "seq:". As far as I can tell, the only affected component in @nivo/bullet.
