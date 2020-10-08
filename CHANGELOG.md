<a name="v0.81.0"></a>
## v0.81.0 (2023-04-26)




<a name="v0.80.0"></a>
## v0.80.0 (2022-09-09)




<a name="v0.79.1"></a>
## v0.79.1 (2022-01-13)




<a name="v0.79.0"></a>
## v0.79.0 (2022-01-13)




<a name="v0.78.0"></a>
## v0.78.0 (2022-01-03)




<a name="v0.77.0"></a>
## v0.77.0 (2022-01-01)




<a name="v0.76.0"></a>
## v0.76.0 (2021-12-29)




<a name="v0.75.0"></a>
## v0.75.0 (2021-12-17)




<a name="v0.74.1"></a>
## v0.74.1 (2021-12-13)




<a name="v0.74.0"></a>
## v0.74.0 (2021-10-10)




<a name="v0.73.1"></a>
## v0.73.1 (2021-07-14)




<a name="v0.73.0"></a>
## v0.73.0 (2021-07-14)




<a name="v0.72.0"></a>
## v0.72.0 (2021-06-29)




<a name="v0.71.0"></a>
## v0.71.0 (2021-06-22)




<a name="v0.70.1"></a>
## v0.70.1 (2021-05-27)




<a name="v0.70.0"></a>
## v0.70.0 (2021-05-24)




<a name="v0.69.1"></a>
## v0.69.1 (2021-05-03)




<a name="v0.69.0"></a>
## v0.69.0 (2021-04-30)




<a name="v0.68.0"></a>
## v0.68.0 (2021-04-23)




<a name="v0.67.0"></a>
## v0.67.0 (2020-12-10)




<a name="v0.66.0"></a>
## v0.66.0 (2020-11-27)




<a name="v0.65.1"></a>
## v0.65.1 (2020-11-17)




<a name="v0.65.0"></a>
## v0.65.0 (2020-11-17)




<a name="v0.64.0"></a>
## v0.64.0 (2020-11-06)




<a name="v0.63.1"></a>
## v0.63.1 (2020-10-22)




<a name="v0.63.0"></a>
## v0.63.0 (2020-10-19)




<a name="v0.62.0"></a>
## v0.62.0 (2020-05-31)




<a name="v0.61.2"></a>
## v0.61.2 (2019-12-31)


#### Features

* **sankey**  add support for layers to Sankey ([842ae0df](https://github.com/plouc/nivo/commit/842ae0df00c239dac526d148645841027bd60552))



<a name="v0.61.1"></a>
## v0.61.1 (2019-12-31)


#### Bug Fixes

* **geo**  add missing dependency for legend data memoization ([887c57e7](https://github.com/plouc/nivo/commit/887c57e7b91ff7052fa657290e2b29889f87362a))
* **legends**
  *  make sure to pass the theme object when using canvas legends ([ae621162](https://github.com/plouc/nivo/commit/ae6211629fd5ed56f98bceb83e9355a74b962dc7))
  *  honor theme font settings for labels ([e4a65fc4](https://github.com/plouc/nivo/commit/e4a65fc4199465bfe1a0920d30c0c7bc2aa72711))
  *  fix vertical alignment of canvas labels ([559e3c78](https://github.com/plouc/nivo/commit/559e3c78ff1298584f8e410b9c5cf8a47f7cce76))



<a name="v0.61.0"></a>
## v0.61.0 (2019-12-31)


#### Features

* **bump**  add support for function for start/end labels ([80c3e92b](https://github.com/plouc/nivo/commit/80c3e92b322fc94d5d85ba79e6d3cc74b3210f1e))

#### Bug Fixes

* **bump**  fix points keys & motion and code formatting ([d92a9655](https://github.com/plouc/nivo/commit/d92a9655028a34eda89465e04288022126fd2148))
* **prop-types**  fix missing prop types on various packages ([8d0fe0d9](https://github.com/plouc/nivo/commit/8d0fe0d91cfdc7efb1428b341afa087a3fdb411a))
* **publish**
  *  add missing npm-normalize-package-bin package ([91acdf21](https://github.com/plouc/nivo/commit/91acdf218de91659928fcbb13f31463d50501d67))
  *  fix lerna arg ([97fcb868](https://github.com/plouc/nivo/commit/97fcb86849a8d90bc056cda184c22b37d2680a40))
* **scatterplot**  fix scatterplot unit tests ([c6b01ff1](https://github.com/plouc/nivo/commit/c6b01ff1a608f8bee0b1c77b8db0f264cb88dbf5))



<a name="v0.60.1"></a>
## v0.60.1 (2019-12-31)


#### Features

* **bump**
  *  skip serie labels for missing data ([04a13a72](https://github.com/plouc/nivo/commit/04a13a728c5185a6166ba9995bb1aa07736c297e))
  *  add support for missing data to Bump component ([7275fa89](https://github.com/plouc/nivo/commit/7275fa89b8638d18e930d660cef1bbf864335959))
  *  add active/inactive state to points ([ee906f41](https://github.com/plouc/nivo/commit/ee906f41b31653d0533473e45cb8170ddc58800b))
  *  pass original datum to each point ([b4c739d2](https://github.com/plouc/nivo/commit/b4c739d2ca8f9b7c31928276c35f1b161a0e1686))
  *  add ability to use custom point component ([b29fed2a](https://github.com/plouc/nivo/commit/b29fed2a7d388a65a8e2d3fc134cb6ccb77a51e0))
* **line**  add option to format x/y values in tooltip (#731) ([f92abbed](https://github.com/plouc/nivo/commit/f92abbed0192a92f5bf98e559cbd29ad87f654fb))

#### Bug Fixes

* **bar**  add ability to use number for grid lines (#669) ([3d48b94d](https://github.com/plouc/nivo/commit/3d48b94d5e8e66665691129578fab4c55fa61d49))



<a name="v0.60.0"></a>
## v0.60.0 (2019-12-31)


#### Bug Fixes

* **bar**
  *  add missing borderColor type to nivo/bar (#704) ([050f0a98](https://github.com/plouc/nivo/commit/050f0a98239ced802fd8d9582da49f6f9c588809))
  *  add missing `renderTick` type to Bar's definition (#697) ([61fc2078](https://github.com/plouc/nivo/commit/61fc20786b92eb1c96ba1c543f43aa91c57591c7))
* **calendar**  add missing exports for canvas calendar (#700) ([3f9bc623](https://github.com/plouc/nivo/commit/3f9bc62358ebf1bbab4f62a38306c59b9de122ab))
* **line**
  *  update PropType for Line markers when using dates for the X axis (#653) ([2c9bfc2d](https://github.com/plouc/nivo/commit/2c9bfc2dee8bc8485378dfc4fb180da5734c7aec))
  *  add missing pointSymbol prop to typings ([c249df83](https://github.com/plouc/nivo/commit/c249df83b2ff46d0b3c2f92b292f381cf52cea0b))
* **sankey**  fix issue with gradient links and spaces in IDs (#676) ([52feccbf](https://github.com/plouc/nivo/commit/52feccbfdf9c65d01238edffe83efa75eb6e248a))
* **scales**  add `useUTC` to types (#690) ([d7c1da53](https://github.com/plouc/nivo/commit/d7c1da530aead9a97f889edb20f6ecb27a4cd6db))
* **storybook**  fix typo in line's story (#680) ([680a6ed3](https://github.com/plouc/nivo/commit/680a6ed357843d8a1c5b527d90a6f76f45e67621))
* **tooltip**  update tooltip TypeScript types. (#657) ([305a536f](https://github.com/plouc/nivo/commit/305a536f4cff6401da179598d9bc688822528b16))
* **website**  fix responsive problems with component's tab (#722) ([ccbb4de0](https://github.com/plouc/nivo/commit/ccbb4de0211f0a166903750aac17ab5e74dade75))

#### Features

* **calendar**  add support for custom color scale (#703) ([484d3080](https://github.com/plouc/nivo/commit/484d30804fbba793b536625f4737ecbd261a07ca))
* **legends**  pass id property to symbolShape (#687) ([289e9049](https://github.com/plouc/nivo/commit/289e9049f7dad19147ef002fcd3ca2a22c1fd9f2))
* **line**  update TypeScript definitions ([c034393a](https://github.com/plouc/nivo/commit/c034393ac00baffe770b1cfda7fb7e58e3d3776e))
* **tooltip**  add simple fix to keep the tooltip inbounds (#631) ([395fc5e7](https://github.com/plouc/nivo/commit/395fc5e7611971fd6a2d413b3e1b5b03e096c3e5))



<a name="v0.59.3"></a>
## v0.59.3 (2019-12-31)


#### Features

* **scales**  add ability to reverse linear scale ([2f4ddc47](https://github.com/plouc/nivo/commit/2f4ddc478939acf4fee3fa37ff59a80f44a4b61b))

#### Bug Fixes

* **voronoi**  upgrade d3-delaunay to fix single/collinear points (#640) ([b93c96a5](https://github.com/plouc/nivo/commit/b93c96a58d4614d020142648630ab7cdffc84094))



<a name="v0.59.2"></a>
## v0.59.2 (2019-12-31)


#### Bug Fixes

* **axes**  treat renderTick as a React component ([4bd566c8](https://github.com/plouc/nivo/commit/4bd566c8485725260f39b1e06f3424a7416f20ab))
* **choropleth**  add missing domain prop to typings (#634) ([fa3c220a](https://github.com/plouc/nivo/commit/fa3c220a3ff519154d74ad2bcad5eb8b5c0a033f))
* **line**  add missing tooltip prop to typings (#568) ([0a90609b](https://github.com/plouc/nivo/commit/0a90609bd4c7f9fb29cd95b4879a857736dbb680))

#### Features

* **website**  add sponsoring link ([871c7efb](https://github.com/plouc/nivo/commit/871c7efbb9ae32b60a284afad91801024ce561f8))



<a name="v0.59.1"></a>
## v0.59.1 (2019-12-31)


#### Features

* **line**  add missing types (#605) ([f8562008](https://github.com/plouc/nivo/commit/f856200873324f08a8b317a1223834f0167063e4))
* **radar**  pass key to tooltip format function (#587) ([cca8a9e9](https://github.com/plouc/nivo/commit/cca8a9e98b2cf3a475b81fa8fe786a9082a941a2))
* **tooltip**  move Chip style to theme (#589) ([343e38c5](https://github.com/plouc/nivo/commit/343e38c5eb663ee0029a95c21c7dc5d93472ab35))

#### Bug Fixes

* **axes**  respect useUTC option on x/y scale property (#574) ([b4ca5ecc](https://github.com/plouc/nivo/commit/b4ca5ecc576226ba345e77bd918e04eb1ab98b23))
* **bar**
  *  allow null for axes ([8a22b666](https://github.com/plouc/nivo/commit/8a22b666e24ddeafabf6085daa55d946df2c38f7))
  *  remove unnecessary ColorProps ([865e9a61](https://github.com/plouc/nivo/commit/865e9a61a15d9ec8f45b182e30374194e33cd1ca))
* **stream**  fix bugs in typings (#593) ([9b157510](https://github.com/plouc/nivo/commit/9b157510d7bacca846d984bc166ff486938b60c8))



<a name="v0.59.0"></a>
## v0.59.0 (2019-12-31)


#### Bug Fixes

* **sankey**
  *  improve Sankey types ([9d5c7285](https://github.com/plouc/nivo/commit/9d5c7285748f44ce8c146d41643d21ed2b55f957))
  *  change custom align story to use correct align property ([6d300ab6](https://github.com/plouc/nivo/commit/6d300ab6b08d98046331dc754d90751aea46683f))
* **scatterplot**  fix unit tests ([3ea40c02](https://github.com/plouc/nivo/commit/3ea40c02edcfc9bec9dcd794cefd96edc128de3c))
* **website**  correct typo on line page ([0ed7eb8a](https://github.com/plouc/nivo/commit/0ed7eb8a77266f80569f8f67dd9e2f142606b631))

#### Features

* **scatterplot**
  *  update stories ([d55b5fce](https://github.com/plouc/nivo/commit/d55b5fce569e33d359b700ebc9be0f690c6334c2))
  *  improve ScatterPlotCanvas ([40d9d2de](https://github.com/plouc/nivo/commit/40d9d2decee9f7c762d057e0f95fdc13dcc94cf3))
  *  improve Mesh support for SVG implementation ([91f66dc4](https://github.com/plouc/nivo/commit/91f66dc4582e16b9f3ecc3e172c34618f9e9509b))
  *  fix TypeScript definitions ([ac012bad](https://github.com/plouc/nivo/commit/ac012bad6be657c1bb40625e9bd32400c154be95))
  *  adapt ScatterPlot stories ([81bf6fd5](https://github.com/plouc/nivo/commit/81bf6fd54457dc74bccf2bdcd67b353604969743))
  *  add ability to format x/y values ([7a80184b](https://github.com/plouc/nivo/commit/7a80184b68237d45780e8fac13b9028f55286938))
  *  rename symbolSize to nodeSize ([501ee0ff](https://github.com/plouc/nivo/commit/501ee0ffc4add6373d35d81fb291d20774bdd7ad))
  *  add support for mix-blend-mode ([4b667dab](https://github.com/plouc/nivo/commit/4b667dab1b5c8e4715059f6f27c0a8a012b7c9d3))
  *  migrate package to new architecture ([4397dab6](https://github.com/plouc/nivo/commit/4397dab67850d13d74890fbb0dbf3d2e89c114fb))
* **stream**  add TypeScript definitions ([87c762cc](https://github.com/plouc/nivo/commit/87c762cc2a73eb31f54dc034523c40039ae98214))



<a name="v0.58.0"></a>
## v0.58.0 (2019-12-31)


#### Features

* **bump**
  *  add support for transitions on Bump component ([9fa5019b](https://github.com/plouc/nivo/commit/9fa5019b6c427a82425a481554c3d08527d43169))
  *  add support for animation for AreaLabels ([3efe3fd8](https://github.com/plouc/nivo/commit/3efe3fd822b9b4062093081d374a500f5fe0c031))
  *  add TypeScript definitions for Bump ([eed820ad](https://github.com/plouc/nivo/commit/eed820ad8674244d564a1a08cb3cdf1e48a44708))
  *  add TypeScript definitions for AreaBump ([e70c4cd5](https://github.com/plouc/nivo/commit/e70c4cd5103e689f254a1504481a359c0978cd1d))
  *  add screenshots ([edf72cae](https://github.com/plouc/nivo/commit/edf72caedd0e582a1eda166cfb3bae834e63f429))
  *  add support for area transition for AreaBump ([4553d555](https://github.com/plouc/nivo/commit/4553d5551a154fe35916e8860cf781ba4b90cf41))
  *  add AreaBump component ([9b69845e](https://github.com/plouc/nivo/commit/9b69845e9242ce09d89aca8798645339438b19e1))
  *  init @bitbloom/nivo-/bump package ([5501852d](https://github.com/plouc/nivo/commit/5501852db649210e6c76edb804b5fdcc00ee7b01))

#### Bug Fixes

* **radar**  fix Radar cached tooltip ([a8626bec](https://github.com/plouc/nivo/commit/a8626becc9ce87229d0d16dfd02da428deee5acd))



<a name="v0.57.2"></a>
## v0.57.2 (2019-12-31)




<a name="v0.57.1"></a>
## v0.57.1 (2019-05-10)




<a name="v0.57.0"></a>
## v0.57.0 (2019-05-09)




<a name="v0.56.2"></a>
## v0.56.2 (2019-04-24)




<a name="v0.56.1"></a>
## v0.56.1 (2019-04-24)




<a name="v0.56.0"></a>
## v0.56.0 (2019-04-17)




<a name="v0.55.0"></a>
## v0.55.0 (2019-03-27)




<a name="v0.54.0"></a>
## v0.54.0 (2019-03-24)




<a name="v0.53.1"></a>
## v0.53.1 (2019-03-22)




<a name="v0.53.0"></a>
## v0.53.0 (2019-03-21)




<a name="v0.52.1"></a>
## v0.52.1 (2019-01-24)




<a name="v0.52.0"></a>
## v0.52.0 (2018-12-10)




<a name="v0.51.6"></a>
## v0.51.6 (2018-11-29)




<a name="v0.51.5"></a>
## v0.51.5 (2018-11-18)




<a name="v0.51.4"></a>
## v0.51.4 (2018-11-18)




<a name="v0.51.3"></a>
## v0.51.3 (2018-11-17)




<a name="v0.51.2"></a>
## v0.51.2 (2018-11-14)




<a name="v0.51.1"></a>
## v0.51.1 (2018-11-14)




<a name="v0.51.0"></a>
## v0.51.0 (2018-11-02)




<a name="v0.50.0"></a>
## v0.50.0 (2018-10-17)




<a name="v0.49.1"></a>
## v0.49.1 (2018-09-08)




<a name="v0.49.0"></a>
## v0.49.0 (2018-09-08)




<a name="v0.48.1"></a>
## v0.48.1 (2018-09-04)




<a name="v0.48.0"></a>
## v0.48.0 (2018-09-04)




<a name="v0.47.1"></a>
## v0.47.1 (2018-08-30)




<a name="v0.47.0"></a>
## v0.47.0 (2018-08-30)




<a name="v0.46.0"></a>
## v0.46.0 (2018-08-26)




<a name="v0.45.0"></a>
## v0.45.0 (2018-08-26)




<a name="v0.44.0"></a>
## v0.44.0 (2018-08-24)




<a name="v0.43.0"></a>
## v0.43.0 (2018-06-05)




<a name="v0.42.1"></a>
## v0.42.1 (2018-06-05)




<a name="v0.42.0"></a>
## v0.42.0 (2018-06-05)




<a name="v0.41.0"></a>
## v0.41.0 (2018-05-30)




<a name="v0.40.0"></a>
## v0.40.0 (2018-05-30)




<a name="v0.39.0"></a>
## v0.39.0 (2018-05-30)




<a name="v0.38.0"></a>
## v0.38.0 (2018-05-29)




<a name="v0.37.0"></a>
## v0.37.0 (2018-05-19)




<a name="v0.36.0"></a>
## v0.36.0 (2018-05-19)




<a name="v0.35.2"></a>
## v0.35.2 (2018-05-19)




<a name="v0.35.1"></a>
## v0.35.1 (2018-05-19)




<a name="v0.35.0"></a>
## v0.35.0 (2018-05-19)




<a name="v0.34.0-1"></a>
## v0.34.0-1 (2017-12-18)




<a name="v0.33.0"></a>
## v0.33.0 (2017-12-09)




<a name="v0.33.0-8"></a>
## v0.33.0-8 (2017-12-09)




<a name="v0.33.0-7"></a>
## v0.33.0-7 (2017-12-09)




<a name="v0.33.0-6"></a>
## v0.33.0-6 (2017-12-09)




<a name="v0.33.0-5"></a>
## v0.33.0-5 (2017-12-09)




<a name="v0.33.0-4"></a>
## v0.33.0-4 (2017-12-08)




<a name="v0.33.0-3"></a>
## v0.33.0-3 (2017-12-07)




<a name="v0.33.0-2"></a>
## v0.33.0-2 (2017-12-07)




<a name="v0.33.0-1"></a>
## v0.33.0-1 (2017-12-07)




<a name="v0.33.0-0"></a>
## v0.33.0-0 (2017-12-07)




<a name="v0.32.0"></a>
## v0.32.0 (2017-12-06)




<a name="v0.32.0-12"></a>
## v0.32.0-12 (2017-12-06)




<a name="v0.32.0-11"></a>
## v0.32.0-11 (2017-12-06)




<a name="v0.32.0-10"></a>
## v0.32.0-10 (2017-12-06)




<a name="v0.32.0-9"></a>
## v0.32.0-9 (2017-12-06)




<a name="v0.32.0-8"></a>
## v0.32.0-8 (2017-12-06)




<a name="v0.32.0-7"></a>
## v0.32.0-7 (2017-12-06)




<a name="v0.32.0-5"></a>
## v0.32.0-5 (2017-12-06)




<a name="v0.32.0-4"></a>
## v0.32.0-4 (2017-12-06)




<a name="v0.32.0-3"></a>
## v0.32.0-3 (2017-12-05)




<a name="v0.32.0-2"></a>
## v0.32.0-2 (2017-12-05)




<a name="v0.32.0-1"></a>
## v0.32.0-1 (2017-12-05)




