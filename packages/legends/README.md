<a href="https://nivo.rocks"><img alt="nivo" src="https://raw.githubusercontent.com/plouc/nivo/master/nivo.png" width="216" height="68"/></a>

# `@nivo/legends`

[![version](https://img.shields.io/npm/v/@nivo/legends?style=for-the-badge)](https://www.npmjs.com/package/@nivo/legends)
[![downloads](https://img.shields.io/npm/dm/@nivo/legends?style=for-the-badge)](https://www.npmjs.com/package/@nivo/legends)

## Code Changes

-   moved the local coordinate system for legend symbols so that (x,y)=(0,0) refers to the center of the symbol (as opposed to the top-left corner). This helps with consistency with custom node/dot functions used to draw items in line and scatterplot charts.
-   rename type `Datum` to `LegendDatum`. This type describes information about one legend item. The new name is more descriptive, which will make it possible to use it to re-use it in another package. In particular, it can replace `BarLegendData` in the bar package.
-   introduced a new legend symbol InvertedTriangle
-   added support for inherited color definitions for borders for legend symbols
-   moved code rendering canvas legends to a separate folder to mirror structure for svg code

## Other packages

-   `@nivo/colors` - added types `AnyContinuousColorScale` and `AnyColorScale`.
-   `@nivo/bar` - replaced type `LegendData` specific to bar package by type `LegendDatum` from legends package
