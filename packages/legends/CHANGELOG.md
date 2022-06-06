# Changelog

## `@nivo/legends`

- moved the local coordinate system for legend symbols so that (x,y)=(0,0) refers to the center of the symbol (as opposed to the top-left corner). This helps with consistency with custom node/dot functions used to draw items in line and scatterplot charts.
- renamed type `Datum` to `LegendDatum`. This type describes information about one legend item. The new name is more descriptive, which will make it possible to use it to re-use it in another package. In particular, it can replace `BarLegendData` in the bar package.
- introduced a new legend symbol InvertedTriangle
- added support for inherited color definitions for borders for legend symbols
- moved code rendering canvas legends to a separate folder to mirror structure for svg code
- added support for a title line for each legend
- removed `LegendSvg` and incorporated its content into `BoxLegendSvg`.
- renamed `LegendSvgItem` to `BoxLegendSvgItem` because those items are only relevant to Box legends (i.e. not ContinuousColors legends)
- trimmed the number of exported elements from the 'svg' and 'canvas' directories
- renamed `renderLegendToCanvas` to `renderBoxLegendToCanvas`. This is for consistency with `renderContinuousColorLegendToCanvas` which includes the legend type in the name of the render function.
- distinguished between `BoxLegendSpec` (used by users to ask for legends with certain features) and `BoxLegendProps` (props for the rendering function). These two have different optional statuses (e.g. for data) and types for interactivity elements like `toggleSerie`. (The use of toggleSerie as a user-facing setting and as a function for internal book-keeping is legacy) 
- renamed symbols to include suffixes `Svg` or `Canvas`
- added support for inherited color for borders for canvas symbols  
- merged `AnchoredContinuousColorLegendSvg` and `ContinuousColorLegendSvg`. This removes one files and removes some redundant code that computed width/height of the continuous scale.


## `@nivo/colors`
 
- added types `AnyContinuousColorScale` and `AnyColorScale`.
- added `@ts-ignore` before a calculation of ticks; there seem to be an inconsistency between the ts definitions and the actual functionality of objects produced by d3-scale.


## `@nivo/bar`

- replaced type `LegendData` specific to bar package by type `LegendDatum` from legends package
- simplified the legend spec to remove the custom `dataFrom` property. It seemed redundant with existing `colorBy` and was therefore unnecessary. Removing this property means that the bar package can use `BoxLegendSpec` straight from the legends package.


## `@nivo/line`

- added support for custom point function through prop `pointSymbol`


## misc other packages

- adjusted legend render functions 
- adjusted legend types to match new naming
- adjusted unit tests when needed 
