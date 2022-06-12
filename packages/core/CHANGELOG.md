
## Changelog

### `index.ts` (in progress)

- migrated to typescript.
- adjusted exports to reflect changes in subdirectories. 

### `components` (complete)

- migrated all files to typescript.
- created several files with names `types.ts` with type definitions.
- created several files with names `props.ts` with default settings.
- removed `LegacyContainer`. This was used only by `@nivo/waffle` and the dependency will be removed when that package migrates to typescript.

### `defaults`(complete)

- migrated all files to typescript. 
- removed objects `defaultCategoricalColors` and `defaultColorRange` from `defaults/index.ts`. All color-related objects are provided by `@nivo/colors`.

### `hocs` (to do)

### `lib`(complete)

- migrated all files to typescript.
- removed entire `lib/colors` subdirectory. Generation of color scales is now available in `@nivo/colors`. The only package making of a function from the core package is `@nivo/bullet`.
- removed `absoluteAngleDegrees` and `absoluteAngleRadians` from `lib/polar/utils`. `absoluteAngleDegrees` can be replaced by `normalizeAngle`. `absoluteAngleRadians` was not used.
- removed file `noop.js` that exported a trivial noop function.


### `motion` (complete)

- migrated all files to typescript.
- created file `motion/types.ts` with type definitions.
- created file `motion/props.ts` with default settings.

### `props` (in progress)

- migrated all files to typescript.
- removed `colors.js`. All color-related tools are provided by `@nivo/colors`.
- removed `defs.js`. The content is now provided by typescript definitions defined adjacent to the relevant components (in the `components` subdirectory).
- created file `margin.ts` based on content previously in `index.js`. 
- created file `blend.ts` based on content previously in `index.js`.

(Note that unlike in other directories where functions, types, and props (default values) are organized in separate files, the content in `props` is organized by topic. For example, the file `curve.ts` contains both functions and types relevant to generating curves.)

### `theming` (to do)

- migrated all files to typescript
- created file `types.ts` with type definitions.
- removed file `propTypes.js`



### Misc

- getColorScale() - Before removing lib/colors, did some work on content of lib/colors. In particular, for sequential color scheme, it is no longer necessary to prefix the 'colors' string with "seq:". As far as I can tell, the only affected component in @nivo/bullet.
