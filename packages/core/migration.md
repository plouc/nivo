# migration of the `@nivo/core` to typescript and upgrade to React 18

## Broad overview

- migrated entire `@nivo/core` package to typescript
- moved non-typescript packages from `packages` to `non-typescript`.
  - `@nivo/recompose` is no longer needed and can be removed
  - `@nivo/line` and `@nivo/waffle` can be re-instated once they are migrated to typescript
  - `@nivo/express` and `@nivo/static` - these should be re-instated at some point
- updated dependencies to React 18.1  
- upgraded storybook to 6.5.9 to gain React 18 support
- adjusted all packages to use the new `@nivo/core` and pass build/lint errors introduced during the upgrades


## Changes in `packages/core/src`

### `index.ts` 

- migrated to typescript.
- adjusted exports to reflect changes in subdirectories. 

### `components` 

- migrated all files to typescript.
- created several files with names `types.ts` with type definitions.
- created several files with names `props.ts` with default settings.
- removed `LegacyContainer`. This was used only by `@nivo/waffle` and the dependency will be removed when that package migrates to typescript.

### `defaults`

- removed entire directory. Content only defined default values for a limited set of objects. Default colors are provided by `@nivo/colors`. Default margins were moved to `props/margin.ts`. Default motion setttings were moved to `motion/props.ts`. 

### `hocs` 

- removed. Content was responsible for interacting with `@nivo/recompose`.

### `hooks` 

- removed the directory. Some content was moved to other locations in `src`. This means that content is now more organized by topic (e.g. with all theme-related files in the theming subdirectory).
- created a `hooks.ts` with miscellaneous hooks.

### `lib`

- migrated all files to typescript.
- removed entire `lib/colors` subdirectory. Generation of color scales is now available in `@nivo/colors`. The only package making of a function from the core package is `@nivo/bullet`.
- removed `absoluteAngleDegrees` and `absoluteAngleRadians` from `lib/polar/utils`. `absoluteAngleDegrees` can be replaced by `normalizeAngle`. `absoluteAngleRadians` was not used.
- removed file `noop.js` that exported a trivial noop function.

### `motion`

- migrated all files to typescript.
- created file `motion/types.ts` with type definitions.
- created file `motion/props.ts` with default settings.

### `props`

- migrated all files to typescript.
- removed `colors.js`. All color-related tools are provided by `@nivo/colors`.
- removed `defs.js`. The content is now provided by typescript definitions defined adjacent to the relevant components (in the `components` subdirectory).
- created file `margin.ts` based on content previously in `index.js`. 
- created file `blend.ts` based on content previously in `index.js`.

(Note that unlike in other directories where functions, types, and props (default values) are organized in separate files, the content in `props` is organized by topic. For example, the file `curve.ts` contains both functions and types relevant to generating curves.)

### `theming` (complete)

- migrated all files to typescript
- created file `types.ts` with type definitions.
- removed file `propTypes.js`


## Changes in `packages/core`

### `package.json`

- added keywords
- added location for typings files
- removed previously used typings from `files`
- removed dependency on `@nivo/recompose`
- removed dependency on `prop-types`
- added a dev dependency on `@types/d3-interpolate`

## Changes in `packages`

### `@nivo/recompase`

- moved out of the `packages` directory into `non-typescript`

### Non-typescript packages

- moved `@nivo/line` out of `packages` into `non-typescript`. It should be re-instated when they migrate to typescript.
- move `@nivo/waffle` out of `packages` into `non-typescript`. (same reasoning as above)

### `@nivo/bullet`

- moved some color-related functions from `@nivo/core` to `@nivo/bullet`. These should be eliminated in favor of utilites from @nivo/colors.

### Other packages

- changed default motion props on all packages. Previously, the `motionConfig` prop was simply set as a string, but now this needs to be an id from a collection of presets. In practice, this involves changing `motionConfig: 'default'` to `motionConfig: 'default' as const`.
- changed default `blendMode` in some packages. For the same reason as for motionConfig, the `blendMode` prop should be defined as an id from a collection of allowed options.
- changed some interfaces to types across various packages. This is because `bindDef` requires to act on `Record<string, unknown>` objects. This seems to work when the typings are defining using `type` but not `interface`.
