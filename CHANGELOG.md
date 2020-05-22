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
  *  init @nivo/bump package ([5501852d](https://github.com/plouc/nivo/commit/5501852db649210e6c76edb804b5fdcc00ee7b01))

#### Bug Fixes

* **radar**  fix Radar cached tooltip ([a8626bec](https://github.com/plouc/nivo/commit/a8626becc9ce87229d0d16dfd02da428deee5acd))



<a name="v0.57.2"></a>
## v0.57.2 (2019-12-31)


#### Bug Fixes

* **choropleth**  add missing domain prop (#540) ([6bf655fb](https://github.com/plouc/nivo/commit/6bf655fba86de10ee40492d7cf062562627b64ee))
* **website**  fix storybook url config ([5c866ce7](https://github.com/plouc/nivo/commit/5c866ce7f1e2c41d6bd303debe4ef631c07c0957))



<a name="v0.57.1"></a>
## v0.57.1 (2019-12-31)


#### Bug Fixes

* **scales**  fix time scale instantiation ([c9abfaef](https://github.com/plouc/nivo/commit/c9abfaefa241c1b7bdba7a227894424682fb4894))



<a name="v0.57.0"></a>
## v0.57.0 (2019-12-31)


#### Bug Fixes

* **svg**  fix text vertical alignment ([d59fb722](https://github.com/plouc/nivo/commit/d59fb722ad8cc618f257cbb90faf067ccc58c9f4))
* **website**  fix InheritedColorControl ([862fa0bd](https://github.com/plouc/nivo/commit/862fa0bd4ea0b7a8f1abf17c87f922f76d540392))

#### Features

* **line**
  *  finalize first version of LineCanvas ([bd008153](https://github.com/plouc/nivo/commit/bd008153c80295d0f0c719c30b318b940d2559dc))
  *  fix slices spacing & add support for y axis ([d56881b8](https://github.com/plouc/nivo/commit/d56881b82f5fa480830f3dcb4d22645337f9008d))
  *  add canvas implementation ([d47d5cb1](https://github.com/plouc/nivo/commit/d47d5cb1f164cf930c70d71a305af2c701643871))
* **network**
  *  add TypeScript definitions ([f2d4ec39](https://github.com/plouc/nivo/commit/f2d4ec39eb950799161565749615715dd17c5966))
  *  add separated node and link components ([a54ac593](https://github.com/plouc/nivo/commit/a54ac593cf59f412780d0ae3967d71610b26bd0c))
  *  init network package ([2ea85816](https://github.com/plouc/nivo/commit/2ea85816dad1653d1258158d03b24ff3081b5262))



<a name="v0.56.2"></a>
## v0.56.2 (2019-12-31)


#### Features

* **colors**  allow plain color for ordinal scale ([b8d3abb4](https://github.com/plouc/nivo/commit/b8d3abb4bd86398193b988cc30dd98feaf365be4))
* **core**  allow string format spec in BasicTooltip ([8b382dc3](https://github.com/plouc/nivo/commit/8b382dc3d4c7eb6b75ee0b843a2b58a9c8627862))



<a name="v0.56.1"></a>
## v0.56.1 (2019-12-31)


#### Features

* **chord**  improve @nivo/chord package ([51a58c11](https://github.com/plouc/nivo/commit/51a58c114b22961dcca6dfe9e52494c8336e0f22))



<a name="v0.56.0"></a>
## v0.56.0 (2019-12-31)


#### Features

* **annotations**  init @nivo/annotations package ([e0dc149d](https://github.com/plouc/nivo/commit/e0dc149dc14e34c18d9816dfb769875b255123be))
* **axes**
  *  move all grid & axes stuff from core ([0b564147](https://github.com/plouc/nivo/commit/0b564147c47a08b21e9ebb34d6165a56966059ae))
  *  add support for legends to canvas implementation ([5dcebd63](https://github.com/plouc/nivo/commit/5dcebd63459a5917d82e60bacf39c7bfaff29e3a))
* **bar**  use @nivo/colors for inherited colors ([c7cf5ce0](https://github.com/plouc/nivo/commit/c7cf5ce03f4b8ebe18554bff965159aba94a06eb))
* **chord**  use @nivo/colors for inherited colors ([f16f8244](https://github.com/plouc/nivo/commit/f16f8244c6b9a6445ecbb2c3db17dca0817f8b52))
* **circle-packing**  use @nivo/colors for inherited colors ([53ffed92](https://github.com/plouc/nivo/commit/53ffed924dd90d7bf0c10e7362e03d041e15f426))
* **colors**
  *  use @nivo/colors for inherited colors for all packages ([e8955560](https://github.com/plouc/nivo/commit/e89555601c2f1a35009fa660e208ab2ff3bc9537))
  *  add colorIdentity support to bar & bubble ([32e61b16](https://github.com/plouc/nivo/commit/32e61b16db29926314b541125205de06bf0f26aa))
  *  init @nivo/colors package ([62644b0a](https://github.com/plouc/nivo/commit/62644b0a8375e2e308fc8d48a4742d6a6873df93))
* **examples**  upgrade examples dependencies ([e07f58f3](https://github.com/plouc/nivo/commit/e07f58f3d9e8f325762c09936eb27cdace94fe77))
* **geo**
  *  update choropleth screenshots ([c2f64eac](https://github.com/plouc/nivo/commit/c2f64eac104205e888626adfc6e852743515f096))
  *  add legend support to choropleth components ([bb7a0a2e](https://github.com/plouc/nivo/commit/bb7a0a2ef65c0e9a0f6b47d33281f7fcd6499cfc))
* **line**  use @nivo/colors for inherited colors ([1347fd82](https://github.com/plouc/nivo/commit/1347fd825d4ac82517ec8e7ad2ea9a04c4f23d52))
* **pie**  use @nivo/colors for inherited colors ([a217ab8f](https://github.com/plouc/nivo/commit/a217ab8f81fe84dadc807dc9e075aa09573a8511))
* **radar**
  *  add blend-mode support ([e46b10c9](https://github.com/plouc/nivo/commit/e46b10c9e0fab13ab644b1f7f5dbbf1dc55247a4))
  *  improve @nivo/radar package ([96e60be0](https://github.com/plouc/nivo/commit/96e60be0d2ed4bcfcd168b9df878d33b13cb5d5d))
  *  use @nivo/colors for inherited colors ([4686b2bf](https://github.com/plouc/nivo/commit/4686b2bfa763410c55a9c67c1768dbf975a7d995))
* **sunburst**  use @nivo/colors for inherited colors ([9cb6b2af](https://github.com/plouc/nivo/commit/9cb6b2afca6839322925f0c4a1e3eacfdf4d696a))
* **swarmplot**
  *  add support for border color ([de3e8b3a](https://github.com/plouc/nivo/commit/de3e8b3a081a9b18ee81c07934632e9b08000e66))
  *  add ability to use custom tooltip ([83f965ad](https://github.com/plouc/nivo/commit/83f965ad4d6b7007d3224202924acdddd5a0d4c5))
  *  add support for voronoi overlay) ([4b0bcb96](https://github.com/plouc/nivo/commit/4b0bcb960004942b2af6647d249ac10b86cd3101))
  *  init @nivo/swarmplot package ([eb593954](https://github.com/plouc/nivo/commit/eb5939540d0bb73ac0af4034049253e03bcb1b7f))
* **theming**  add ability to theme crosshairs ([f03848f6](https://github.com/plouc/nivo/commit/f03848f6ff08d5cc73638b6cc16a7c3fde7e9eda))
* **treemap**  use @nivo/colors for inherited colors ([4b5e65b6](https://github.com/plouc/nivo/commit/4b5e65b682e1b3d19115279427193aa9db100af2))
* **website**
  *  update colors guide ([99e66e10](https://github.com/plouc/nivo/commit/99e66e109349e0840427ca31e2dd1073bbbbfc26))
  *  add inherited color control ([4a2e0c29](https://github.com/plouc/nivo/commit/4a2e0c29f7fd68cc87b0d804e7b525f3024aa933))
  *  add swarmplot icon ([aa074697](https://github.com/plouc/nivo/commit/aa07469706a4124fb89ecf9e0e101e387801df96))
  *  improve website ([7ed59e94](https://github.com/plouc/nivo/commit/7ed59e94d6248e761dfcd2ba167b28fab9699ddb))

#### Bug Fixes

* **api**  fix api mappings ([80b281cc](https://github.com/plouc/nivo/commit/80b281cc6a8580101499f8da747beab4412e904d))
* **legends**  fix legends unit tests ([41dd564f](https://github.com/plouc/nivo/commit/41dd564fcc740e99fa4a1a58ba707b22a877a7b8))
* **sankey**  fix broken custom node sorting (#498) ([319e7e07](https://github.com/plouc/nivo/commit/319e7e072ac283f8abbece696458a49ccafeaf77))
* **scatterplot**  fix scatterplot voronoi overlay ([3bdc783e](https://github.com/plouc/nivo/commit/3bdc783e215362bd039a13eb22bd4918ca38e4a9))
* **treemap**  add missing default colorBy ([ba91da53](https://github.com/plouc/nivo/commit/ba91da53d7e843681db0440203a9d14ae94a8f2f))



<a name="v0.55.0"></a>
## v0.55.0 (2019-12-31)


#### Bug Fixes

* **geo**  fix custom layers ([069e4e61](https://github.com/plouc/nivo/commit/069e4e61a048c6f672a3928c2a7d648397f688a2))

#### Features

* **calendar**  add ability to align calendar in its container ([87cc6451](https://github.com/plouc/nivo/commit/87cc6451461c4fae477747a6e6aaade10585d0c8))
* **core**  remove enclosing div from container if non interactive ([149ed0f8](https://github.com/plouc/nivo/commit/149ed0f86e08ff14d2ae6b6b2e8af5c81fcddf2a))
* **examples**  add Bar live update example ([26dc32a8](https://github.com/plouc/nivo/commit/26dc32a8c423044542373b97e99f8a17c8590fa8))
* **geo**
  *  add TypeScript definitions ([d818a665](https://github.com/plouc/nivo/commit/d818a66555a91c7bdf5e80f71ea0dc559707d997))
  *  add abillity to customize label & format value ([ef499799](https://github.com/plouc/nivo/commit/ef49979962609091ef404839524e2fb278bf839b))
  *  migrate to react hooks ([9c5f1879](https://github.com/plouc/nivo/commit/9c5f18798e958abd8902be721a86a852ea2b4d1e))
  *  add support for projection translation/rotation ([a78b293a](https://github.com/plouc/nivo/commit/a78b293ad9e81b70920d83b8a5478f059cfd9fc1))
  *  add charts' icons ([54c00402](https://github.com/plouc/nivo/commit/54c00402bd40fb0148eabeb88c23a3a8c7e8490b))
  *  init geo package ([119b9e98](https://github.com/plouc/nivo/commit/119b9e985026deb72ce69441e3edfc17a6e6db4f))
* **publish**  add cleanup rollup plugin ([0c707e61](https://github.com/plouc/nivo/commit/0c707e61c3447eaec8e80121e3c02317d9bdf445))
* **voronoi**
  *  add TypeScript definitions ([b98f65ae](https://github.com/plouc/nivo/commit/b98f65ae9cd84c1290da16a89a6cdd5ba3c2a045))
  *  add support for layers ([c16ae70d](https://github.com/plouc/nivo/commit/c16ae70d455ccdae2fe28e4df9141f98ddcbc97b))
* **website**
  *  udpate geo icons ([8426ef5b](https://github.com/plouc/nivo/commit/8426ef5b78f4111d04cfeb73729d7ad69722e7f9))
  *  add package to tag list ([12415ac7](https://github.com/plouc/nivo/commit/12415ac7633e59b5af8059cebfc5a5f51843c944))
  *  init guide about theming ([61459b9e](https://github.com/plouc/nivo/commit/61459b9ecba4ed14714216c774b9e8ec253d344c))



<a name="v0.54.0"></a>
## v0.54.0 (2019-12-31)


#### Features

* **calendar**
  *  add ability to add arbitrary data ([6a46b723](https://github.com/plouc/nivo/commit/6a46b723703ad4204fb484933da8878cd64489c4))
  *  add CalendarCanvas component ([96f8ac29](https://github.com/plouc/nivo/commit/96f8ac2945bcfd80d773ea23895fc7f6bf672786))
  *  add ability to define year legends position ([bf8797ae](https://github.com/plouc/nivo/commit/bf8797ae2c3e779228be2adab4a9770a7685e6cf))
  *  add ability to define month legends position ([9bc70928](https://github.com/plouc/nivo/commit/9bc70928f7c472666e2b8e023b50773765ba6fab))
  *  avoid unnecessary layout computing ([5aa0ff5d](https://github.com/plouc/nivo/commit/5aa0ff5d1664f5ea4d7507275ca6f7b05ef2f404))
  *  add support for min/max value ([e0a46f5a](https://github.com/plouc/nivo/commit/e0a46f5a7fa58727e75d81715d67db4be3bdaa92))
* **sankey**
  *  adjust labels for vertical layout ([e12cdf15](https://github.com/plouc/nivo/commit/e12cdf15d326c2989b277d90b63ff7af478e9d08))
  *  add support for vertical sankey ([e299590e](https://github.com/plouc/nivo/commit/e299590e729db12a892b1fe8401ccf046f8e11b8))
  *  use more neutral properties for layout support ([e0a56eb6](https://github.com/plouc/nivo/commit/e0a56eb6920e291cb86dc9071568f22aea3a8b64))
  *  move computing out of the rendering component ([a0c29fe4](https://github.com/plouc/nivo/commit/a0c29fe4fb57d36e2769902ccaacce5a8ceecdb6))
  *  improve support for nodes sorting ([f63450fa](https://github.com/plouc/nivo/commit/f63450fa95c05ea5d8c31b44081e4ca91129b4de))
  *  add ability to sort nodes (#401) ([fed5fc4b](https://github.com/plouc/nivo/commit/fed5fc4b81b7b97118e22d8c186f37ed6af23995))
* **website**
  *  change sankey default layout ([a5352e41](https://github.com/plouc/nivo/commit/a5352e41c195ea34b3b5856403ef68370db58438))
  *  use hooks for calendar pages ([fec85fa0](https://github.com/plouc/nivo/commit/fec85fa0bb095145e9ac1382f256b63571e65dc0))
  *  add doc for bar label + fix stories links ([223c5e57](https://github.com/plouc/nivo/commit/223c5e577651dafe8a7a12c912266f3835f8b253))
  *  upgrade nivo packages ([775ea0b4](https://github.com/plouc/nivo/commit/775ea0b4ca9293d5b991c263d9856f5546517e9c))

#### Bug Fixes

* **website**  fix broken legends guide ([cc3cb0b1](https://github.com/plouc/nivo/commit/cc3cb0b15171a0d1fa7851420841adc74c2cc8d4))



<a name="v0.53.1"></a>
## v0.53.1 (2019-12-31)


#### Features

* **api**  fix api publication ([1ec197b5](https://github.com/plouc/nivo/commit/1ec197b58535d04a052ee7df28c818cd725e4607))
* **bar**
  *  adjust legend data according to layout/mode/reverse ([0c0a6a18](https://github.com/plouc/nivo/commit/0c0a6a185f73e757d742a0d8ba41bc89fe5fc6f9))
  *  add ability to use borders with BarCanvas ([4568516e](https://github.com/plouc/nivo/commit/4568516ec4fb4d26bd71dac977a45ae9c4af4af9))
* **website**
  *  upgrade react ([62f066b8](https://github.com/plouc/nivo/commit/62f066b885c15da7500e43f08b69055a33f0474b))
  *  upgrade nivo packages ([991f0781](https://github.com/plouc/nivo/commit/991f07811925f556945e4d59f990fe161e393312))



<a name="v0.53.0"></a>
## v0.53.0 (2019-12-31)


#### Bug Fixes

* **jest**  fix jest babel config ([da5edb0d](https://github.com/plouc/nivo/commit/da5edb0d3986d791507fdcc7e5e873f7bc941467))
* **tests**  upgrade enzyme ([d69be1fc](https://github.com/plouc/nivo/commit/d69be1fc674abdad08c646463a5917d21a84bbb5))
* **typescript**  fix TableTooltip and LineComputedSerieDatum-type (#428) ([fd35f78e](https://github.com/plouc/nivo/commit/fd35f78e93198d459b0ac14afdde09625f156e96))
* **website**  fix wrong title on the guides/axes page (#441) ([91eacdbe](https://github.com/plouc/nivo/commit/91eacdbe6e19ecf2ba454f8d7c0a07a35e4a5f25))

#### Features

* **build**  upgrade rollup & add esm build ([f6d64802](https://github.com/plouc/nivo/commit/f6d64802236337140289baaa96c3a3ace0acdfaa))
* **line**  add support for gridXValues and gridYValues (#391) ([fd49e83d](https://github.com/plouc/nivo/commit/fd49e83df001d358187bae513eac8d9fc69957d4))
* **sankey**  decouple node coloring and link coloring (#404) ([c793ffd1](https://github.com/plouc/nivo/commit/c793ffd1bddd89745d3219fd8132c16ebf53807f))
* **storybook**  upgrade storybook ([670d22df](https://github.com/plouc/nivo/commit/670d22df060bc56533044a7ae4e9e2aebc5d02ca))
* **sunburst**  allow independent child colors (#463) ([2525ad11](https://github.com/plouc/nivo/commit/2525ad11fa6bbec6d03e2b814df4e526c5a8ea67))
* **theming**  improve theming ([95dd0603](https://github.com/plouc/nivo/commit/95dd0603f29b7b0109dce7c03e2af27dc0f7779b))
* **website**  upgrade nivo packages ([33d5508c](https://github.com/plouc/nivo/commit/33d5508c679601af59e58c65292de59cf48575fd))



<a name="v0.52.1"></a>
## v0.52.1 (2019-12-31)


#### Features

* **canvas**  add support for custom font family (#430) ([11f039e0](https://github.com/plouc/nivo/commit/11f039e0d8c2eb5a5b69b58006aa9aebcae2c787))
* **scatterplot**  set pointer as 'normal' not crosshair (#402) ([29848b87](https://github.com/plouc/nivo/commit/29848b878429814cc9a2c7348172a9eb4f80d46a))
* **website**
  *  remove responsive components from explorer ([27524f18](https://github.com/plouc/nivo/commit/27524f184ff338438291facac1b7ce2e762c8d21))
  *  generate chart icons from code ([209177af](https://github.com/plouc/nivo/commit/209177afea51515c70ccdf842cf10a0c8a3b6578))
  *  upgrade nivo packages ([d1bb0571](https://github.com/plouc/nivo/commit/d1bb0571f553ffca1c2e2f8dcf17871e1f6c288d))

#### Bug Fixes

* **bar**  Allow BarItem label property to accept React.Element ([48c8e410](https://github.com/plouc/nivo/commit/48c8e410ba8acc5b05add184bad2542c026a21f8))
* **lodash**  use scoped imports ([dea6a75f](https://github.com/plouc/nivo/commit/dea6a75f921e4e6e9c62a7ebb987c32fafbe04f8))
* **typescript**  Allow axis to be AxisProps or `null` ([5d45796f](https://github.com/plouc/nivo/commit/5d45796f5a9ed8c4e7c55e979a5681e2edc10948))



<a name="v0.52.0"></a>
## v0.52.0 (2019-12-31)


#### Features

* **api**  move api to main nivo repo ([50245962](https://github.com/plouc/nivo/commit/5024596209bb0befb6f623d44d97f5663d881f4d))
* **scales**  add support for log scale (#378) ([971925f8](https://github.com/plouc/nivo/commit/971925f89fe67f02dc3ab5e2be601bf4666d273b))
* **website**
  *  disable service worker ([b40d620e](https://github.com/plouc/nivo/commit/b40d620e067d94a740cb63d2c36422c1dbe4d9bb))
  *  upgrade nivo packages ([fbc78c00](https://github.com/plouc/nivo/commit/fbc78c00364e9f1b6152c38d6d739ac3a3ef01f2))

#### Bug Fixes

* **bar**  fix missing legend in Bar chart  #362 ([aa12d9d2](https://github.com/plouc/nivo/commit/aa12d9d23e43344b05c4ea103177afbe2285b6ee))
* **scatterplot**  fix wrong legend item color in ScatterPlotCanvas (#372) ([155fdfae](https://github.com/plouc/nivo/commit/155fdfaefed512fd4b32d2e91f46055800ba1f1a))
* **website**  use https instead of http ([07b1bade](https://github.com/plouc/nivo/commit/07b1bade670a7a7d7219f5a0aaf7849c21f23d7c))



<a name="v0.51.6"></a>
## v0.51.6 (2019-12-31)


#### Features

* **bar**  add enableGridX/enableGridY/legends support to BarCanvas (#354) ([f872aaa1](https://github.com/plouc/nivo/commit/f872aaa11d51c76f2556807ca60fc43cf3bc2847))
* **line**  add support for layers to Line component ([35911df3](https://github.com/plouc/nivo/commit/35911df3bebc2d4fc824e5d4e9fe38915ce5b6de))



<a name="v0.51.5"></a>
## v0.51.5 (2019-12-31)


#### Features

* **bar**  add ability to customize tooltip label ([16ae9d5c](https://github.com/plouc/nivo/commit/16ae9d5c455bad7349598d95aa746d018c2454b6))



<a name="v0.51.4"></a>
## v0.51.4 (2019-12-31)


#### Features

* **tooltips**  improve bar & stream tooltips ([698585fc](https://github.com/plouc/nivo/commit/698585fcf9c6fcb4d2bc93fc9c384e7bd7221793))



<a name="v0.51.3"></a>
## v0.51.3 (2019-12-31)


#### Features

* **scatterplot**  add support for layers to ScatterPlot component ([f3a5a842](https://github.com/plouc/nivo/commit/f3a5a84259d0103193a766d610a517e7527c63e3))



<a name="v0.51.2"></a>
## v0.51.2 (2019-12-31)


#### Features

* **chord**  add support for font style for ChordCanvas ([c4f29c51](https://github.com/plouc/nivo/commit/c4f29c51408b9be6ad513d0eaf9e303ac12a19eb))



<a name="v0.51.1"></a>
## v0.51.1 (2019-12-31)


#### Features

* **bar**  add support for layers to Bar component ([8a817ec9](https://github.com/plouc/nivo/commit/8a817ec9b632740457546aca65fb3f09c8f9ffa3))
* **website**
  *  upgrade react-scripts ([db922af5](https://github.com/plouc/nivo/commit/db922af5a723f4b2b04c11f5ce61c04dce9e5938))
  *  upgrade nivo packages ([fd850795](https://github.com/plouc/nivo/commit/fd850795df6efdc78b0a8a6c429f54d96a094763))



<a name="v0.51.0"></a>
## v0.51.0 (2019-12-31)


#### Features

* **bubble**  trigger onClick when isZoomable is false (#322) ([787341ac](https://github.com/plouc/nivo/commit/787341acb2e540233e2a4b94799edcf7275c5b24))
* **chord**  add support for ribbon blendmode ([2b0cfec6](https://github.com/plouc/nivo/commit/2b0cfec62751d5bb1a17dce0b76234d86d89e295))
* **deps**  upgrade deps ([be6e96e4](https://github.com/plouc/nivo/commit/be6e96e414349df5a000de31725ad791a6b3f831))
* **heatmap**  use @nivo/axes package for axes ([36cd9c7b](https://github.com/plouc/nivo/commit/36cd9c7b265f708b4a0a64a0244b2748d6ee58e4))
* **line**
  *  add support for mix-blend-mode on areas ([c434148f](https://github.com/plouc/nivo/commit/c434148f50302bffba4d3dbdb042426ea6c968fd))
  *  add typescript definitions ([cfa6a59c](https://github.com/plouc/nivo/commit/cfa6a59c87ccfd41c6069837ff72150e8440daf5))
* **scatterplot**
  *  add ability to use a mesh to capture interactions ([ff9399fa](https://github.com/plouc/nivo/commit/ff9399fa1d0a88a8ad696f74257b82f07d6a50a2))
  *  add scatterplot typescript definitions ([22c930d0](https://github.com/plouc/nivo/commit/22c930d0f26718a026ce06ceaa1735548efa7677))
  *  improve scatterplot ([4ae6591d](https://github.com/plouc/nivo/commit/4ae6591d47b85edc210c50d99cdf2280611ca479))
* **website**  upgrade nivo packages ([ddb22915](https://github.com/plouc/nivo/commit/ddb22915c5718c94e2e37b20ddfc2aee639c9563))

#### Bug Fixes

* **chord**  skip rendering for zero/negative radius ([647a496a](https://github.com/plouc/nivo/commit/647a496a250f1d558fff18ec193d2554043d1eb0))
* **heatmap**  fix support for enableLabels property ([a866586a](https://github.com/plouc/nivo/commit/a866586abd33522558d3f552b90bc4daf655386b))



<a name="v0.50.0"></a>
## v0.50.0 (2019-12-31)


#### Bug Fixes

* **website**  remove extra space in heatmap package name ([93077734](https://github.com/plouc/nivo/commit/93077734b6faed1beed595bff13fd8a0b16e85f2))

#### Features

* **axes**  add `tickIndex` to Axis’ renderTick method (#305) ([93b85c0b](https://github.com/plouc/nivo/commit/93b85c0b55953dfcbc639164543e83ed788fd842))
* **interactions**  add support for mouseenter/leave on bar, pie & scatterplot svg (#280) ([76c8722b](https://github.com/plouc/nivo/commit/76c8722bb90d947b1933bb00344a0bb606605159))
* **scatterplot-markers**  add markers to scatterplot SVG (#287) ([d7192461](https://github.com/plouc/nivo/commit/d71924612f3c5a141defd06e5eab0d2487791403))
* **stream**  add support for dots ([4860ef53](https://github.com/plouc/nivo/commit/4860ef5307af2a63662e3062cf2beef2e9286b42))



<a name="v0.49.1"></a>
## v0.49.1 (2019-12-31)


#### Features

* **bar**  use @nivo/axes instead of @nivo/core for SVG axes ([3b22c6fb](https://github.com/plouc/nivo/commit/3b22c6fbfe553ee74e82481d7d7d443fe924a339))
* **examples**  upgrade retro example deps ([203f7198](https://github.com/plouc/nivo/commit/203f719840a0f0287542567e2ca4bec8de08a5a5))
* **website**  upgrade nivo packages ([531e492b](https://github.com/plouc/nivo/commit/531e492bea9b9d46a9633a2381dabbfe49584530))



<a name="v0.49.0"></a>
## v0.49.0 (2019-12-31)


#### Features

* **parallel-coordinates**
  *  add support for individual axis options ([b8a39070](https://github.com/plouc/nivo/commit/b8a39070024450377314d21b27f11ceaaf623c17))
  *  init package ([5a4db6ca](https://github.com/plouc/nivo/commit/5a4db6cad3c00601ad6161adb54cf8a4c5891ff3))
* **theming**  improve theming ([0040bb38](https://github.com/plouc/nivo/commit/0040bb38e0f5efe339ab7e96ea4c7025984bcdfe))
* **umd**  git ignore umd builds ([58f03a59](https://github.com/plouc/nivo/commit/58f03a59a365a574fdac214d1470d670829ee268))
* **website**  upgrade nivo packages ([47a5f8a7](https://github.com/plouc/nivo/commit/47a5f8a7e8611841ca1176d47670e1b6c5c6a993))



<a name="v0.48.1"></a>
## v0.48.1 (2019-12-31)


#### Features

* **bullet**  interpolate colors ([96ad5f64](https://github.com/plouc/nivo/commit/96ad5f64e8ff948885d789e16765eebf4f5677f4))

#### Bug Fixes

* **build**  add missing externals in rollup config ([e23182f2](https://github.com/plouc/nivo/commit/e23182f2de917835bd7cda267a57484b93c77290))
* **bullet**  remove deprecated property titleWidth ([0c8e8bbb](https://github.com/plouc/nivo/commit/0c8e8bbb734e804c50e3bc235685c91d967c7c7d))



<a name="v0.48.0"></a>
## v0.48.0 (2019-12-31)


#### Features

* **bullet**
  *  improve @nivo/bullet package ([9154c51f](https://github.com/plouc/nivo/commit/9154c51f6ec327891fa062d35042f2b1a7a0dd05))
  *  init @nivo/bullet package ([dc7b37f5](https://github.com/plouc/nivo/commit/dc7b37f5509923c55a3db1e89f451aeb459ec012))
* **theming**  improve theming ([c7e7a9fe](https://github.com/plouc/nivo/commit/c7e7a9fe77eaf65abc1e450e1d2ce7d1b98acda9))
* **website**  upgrade nivo packages ([1c5fd5db](https://github.com/plouc/nivo/commit/1c5fd5dbb9e99912d1df871450112c1ad678beda))



<a name="v0.47.1"></a>
## v0.47.1 (2019-12-31)


#### Features

* **axes**  improve tickValues support ([58aeaab0](https://github.com/plouc/nivo/commit/58aeaab08eb14fa1bd52f8cd045e7e01fae4306a))
* **website**  upgrade nivo packages ([a88e50fd](https://github.com/plouc/nivo/commit/a88e50fd21c4b4a4ff769a1b80a9e66262b7b196))



<a name="v0.47.0"></a>
## v0.47.0 (2019-12-31)


#### Features

* **components**  fix components display name ([84aa832d](https://github.com/plouc/nivo/commit/84aa832da4d26c55e7920e3e3ad740437f124eea))
* **line**
  *  fix line slices for time scales ([82e03d3a](https://github.com/plouc/nivo/commit/82e03d3a593b34a26ca2c2ebc1b6a97eb98ab5f7))
  *  compute slices from scales package ([31c06c0f](https://github.com/plouc/nivo/commit/31c06c0fdf1a1d45d4f0a0419d7a3b994f3f263e))
  *  add story about negative values highlight ([b425e35f](https://github.com/plouc/nivo/commit/b425e35f6ff5061023b77b1d8d41b1e118b18d75))
  *  init linear & time scale support ([3bce793a](https://github.com/plouc/nivo/commit/3bce793adc04c4cf49978517057bd47ea5359f4c))
* **scales**
  *  improve time scale support ([614038e4](https://github.com/plouc/nivo/commit/614038e494bf935ffe601f0571a91e2ca4008e7b))
  *  init scales package ([4324706d](https://github.com/plouc/nivo/commit/4324706d07db77fdad25db23ab7e77eb54ae1f40))
* **storybook**  improve components stories ([d29d21f4](https://github.com/plouc/nivo/commit/d29d21f483ae8761ba3abcf6cc0314b5012cb553))
* **stream**  add info about stories ([4f98124c](https://github.com/plouc/nivo/commit/4f98124c5fca3fad59f7292366a4628925e387f8))
* **website**
  *  change line demo data generation method ([124028de](https://github.com/plouc/nivo/commit/124028dec51dd8477ce158929ed617d7a49d72cf))
  *  upgrade nivo packages ([4aeed5d8](https://github.com/plouc/nivo/commit/4aeed5d87159164df0f045a125131f29bc2e2e5a))

#### Bug Fixes

* **colors**  fix colors due to d3 packages upgrade ([a17d93bc](https://github.com/plouc/nivo/commit/a17d93bc859d2f202f4c2960e9c3fbee4590e581))



<a name="v0.46.0"></a>
## v0.46.0 (2019-12-31)


#### Features

* **line**  add ability to specify grid X/Y values ([b44c8543](https://github.com/plouc/nivo/commit/b44c85437e8ccd204a266e830427f0527c5b77b5))
* **radar**  add ability to customize label ([03b3640b](https://github.com/plouc/nivo/commit/03b3640b6aee3158e88d66868be099f16ba6e8f3))
* **waffle**  add ability to toggle datum by id ([7f411dae](https://github.com/plouc/nivo/commit/7f411dae9d481c6118a95ff06d113ec045309480))
* **website**
  *  add component to list storybook stories ([6b9ce02e](https://github.com/plouc/nivo/commit/6b9ce02ec79a0b8a524323300e3a14250df4cddb))
  *  add Line legends control ([91bac9ed](https://github.com/plouc/nivo/commit/91bac9ed70d27a01f5274cbfae3281ec9166fffd))
  *  upgrade nivo packages ([c0f12986](https://github.com/plouc/nivo/commit/c0f12986afef25b5ed3fd4c20de66fceec028b45))



<a name="v0.45.0"></a>
## v0.45.0 (2019-12-31)


#### Bug Fixes

* **website**  fix legends guide ([6828c33f](https://github.com/plouc/nivo/commit/6828c33f733c39026914e7d18c2fe0b8493b3157))

#### Features

* **core**
  *  fix prop wraning when using markup for axis legend ([4152c090](https://github.com/plouc/nivo/commit/4152c0906849aa53ef4fa311aa2a66a16402e9d8))
  *  add support for string or number keys on bar/line and pie ([953c572e](https://github.com/plouc/nivo/commit/953c572eb2ea8986b5599545bb23387202819356))
* **deps**  upgrade deps ([3f4b4294](https://github.com/plouc/nivo/commit/3f4b4294cb3ad84a351cb4f50c4b60b39ffd88cc))
* **legends**
  *  add support for both color and fill ([4cb33e25](https://github.com/plouc/nivo/commit/4cb33e25b12084932cd749b3e74f6f8789adbe80))
  *  add documentation for custom symbol shape ([7adc8381](https://github.com/plouc/nivo/commit/7adc8381728f53e4a392d5a8e1574cc469c769ba))
  *  add test for custom symbol shape support ([50b2d39c](https://github.com/plouc/nivo/commit/50b2d39c5bd7933f88e6fa296460c7afc311b7de))
  *  add support for custom symbol shape ([7419c912](https://github.com/plouc/nivo/commit/7419c912da7b936b1cc8eeb4d8188f11e752125e))
  *  add support for basic interactivity ([527b1fa7](https://github.com/plouc/nivo/commit/527b1fa738e267d05932e2914b52747ebda8d7fc))
* **waffle**
  *  add legend support for WaffleCanvas ([a60b34e6](https://github.com/plouc/nivo/commit/a60b34e663a87d01d664627e414f2fda4fbe6712))
  *  add legend support for Waffle ([6a5db0dd](https://github.com/plouc/nivo/commit/6a5db0dd574050749d0944ac5ac0ebf451d51d5b))
* **website**
  *  add ability to manage array of props ([8f44ab94](https://github.com/plouc/nivo/commit/8f44ab94bc198e10cdeebf2c6480ceb669a548b8))
  *  upgrade nivo packages ([4d819df6](https://github.com/plouc/nivo/commit/4d819df62f3a63b8b6665701a2f06e80e99719b1))



<a name="v0.44.0"></a>
## v0.44.0 (2019-12-31)


#### Features

* **core**
  *  remove packages directory prefix ([262a8ee9](https://github.com/plouc/nivo/commit/262a8ee96bb870fe388e64d1453248aed94bf445))
  *  use yarn workspaces ([36999cc2](https://github.com/plouc/nivo/commit/36999cc216eb9d3e33f73111424e63d23143c17d))
* **line**  add support for custom tooltip ([39fad124](https://github.com/plouc/nivo/commit/39fad12421f3b06be830da13d2efdbfccfff2e96))
* **scatterplot**  remove unused min/max x/y ([efbda0fb](https://github.com/plouc/nivo/commit/efbda0fb54cf6b7a6c42537a6ec813975805571b))
* **website**  add option to showcase custom scatterplot tooltip ([68b72a44](https://github.com/plouc/nivo/commit/68b72a448217963f0a7d287674be45aabef3257b))

#### Bug Fixes

* **Makefile**  disable command priting for packages-build recipe ([1046ee2c](https://github.com/plouc/nivo/commit/1046ee2c723cd3f9d89c546f0785c72f6098f530))
* **calendar**  fix crash when no data is empty ([5ac42141](https://github.com/plouc/nivo/commit/5ac42141d2495aa1b4afc22e6e2ada3e7b7e9a51))
* **eslint**  fix eslint for all packages ([27bf8d0c](https://github.com/plouc/nivo/commit/27bf8d0cec55f7caf7bb18fc5f5eeeb9c4e7875e))
* **heatmap**  better handling of NaN values ([02ef5577](https://github.com/plouc/nivo/commit/02ef55773bb3df971b5fefc876281eb72ccaae91))



<a name="v0.43.0"></a>
## v0.43.0 (2019-12-31)


#### Features

* **calendar**
  *  add ability to define custom tooltip ([7a076bf3](https://github.com/plouc/nivo/commit/7a076bf370801bfb003be54f5bdfcf395cd959de))
  *  add stories ([d3b8951e](https://github.com/plouc/nivo/commit/d3b8951e964c5a6ad6bcc18a8161294591b5e67d))
  *  add ability to customize year/month legend ([a43c7082](https://github.com/plouc/nivo/commit/a43c7082ff9b921e9a4537db82dc1519f62012c7))
  *  add TypeScript definitions ([98106ab1](https://github.com/plouc/nivo/commit/98106ab1a2e7c5862b1a7977ff2ff92accd64933))



<a name="v0.42.1"></a>
## v0.42.1 (2019-12-31)


#### Features

* **bar**  add ability to define grid values ([afd1ee30](https://github.com/plouc/nivo/commit/afd1ee30cc1e58a6d1dc15f75d9a1da62e8266f4))
* **pie**  adjust website & docs ([8f22f893](https://github.com/plouc/nivo/commit/8f22f893ac230090b188e896a06fdf632b157a2c))

#### Bug Fixes

* **bar**  fix BarItem label prop type ([682cbed0](https://github.com/plouc/nivo/commit/682cbed01babb4773568eb590463c22dfd0b5762))
* **line**  fix LineSlices id prop type ([6f229b90](https://github.com/plouc/nivo/commit/6f229b90879c9c042c07e387b5999afdaa727442))



<a name="v0.42.0"></a>
## v0.42.0 (2019-12-31)


#### Features

* **pie**
  *  improve pie components ([eb14f0cb](https://github.com/plouc/nivo/commit/eb14f0cb165b72ed1e2e19c2c03ce68cc4e4d8de))
  *  cleanup website PieCanvas demo ([31ef9e53](https://github.com/plouc/nivo/commit/31ef9e5371b508181d9dbf2a28d104f540973b2d))
  *  init support for start/end angle + PieCanvas ([52f6a9e1](https://github.com/plouc/nivo/commit/52f6a9e140937d8407cfe0af2c98749a514a5fad))
* **website**  upgrade nivo packages ([d6eefa30](https://github.com/plouc/nivo/commit/d6eefa300d5ddaddc1e8ba0c13097670bf5269d4))



<a name="v0.41.0"></a>
## v0.41.0 (2019-12-31)


#### Features

* **sankey**
  *  add TypeScript definitions ([c2a9d38b](https://github.com/plouc/nivo/commit/c2a9d38b20ee1ce30b0c2a8e0d9fb30d0f8b3534))
  *  add gradient & blend mode support for links ([27d56050](https://github.com/plouc/nivo/commit/27d56050a0ad98d2504275900daccdf25627598e))
* **website**  upgrade nivo packages ([cf62e33d](https://github.com/plouc/nivo/commit/cf62e33d70943ade584b807cad3385fd16872fbd))



<a name="v0.40.0"></a>
## v0.40.0 (2019-12-31)


#### Bug Fixes

* **pie**  fix code formatting ([1f9cf69e](https://github.com/plouc/nivo/commit/1f9cf69e823d085345c6cb5d36b8233e18698f9d))
* **waffle**  remove self import from TypeScript def ([867a545a](https://github.com/plouc/nivo/commit/867a545aba2ffb6110e226c2490572011049c895))

#### Features

* **bar**  include TypeScript definition in package ([0d221c74](https://github.com/plouc/nivo/commit/0d221c747d34ba6031b3dae6e4a9d0c20821b9ca))
* **heatmap**  include TypeScript definition in package ([868620eb](https://github.com/plouc/nivo/commit/868620eb2642aff5abbdac2dabb826a6b0f199dc))
* **pie**
  *  add support for custom tooltip ([d3734428](https://github.com/plouc/nivo/commit/d3734428cee364f4eb67af5c0f4c572b9973dc31))
  *  include TypeScript definition in package ([04fc931e](https://github.com/plouc/nivo/commit/04fc931e032710fe245e4327eb525af15cde3c74))
* **radar**  add ability to define max value ([880d7299](https://github.com/plouc/nivo/commit/880d7299c85ee7a151105773b4cd2d7566649f9f))
* **website**  upgrade nivo packages ([8dadeead](https://github.com/plouc/nivo/commit/8dadeeadca3e29b4ab86226602afdc64609477f6))



<a name="v0.39.0"></a>
## v0.39.0 (2019-12-31)


#### Features

* **waffle**  add waffle package (#202) ([aceafc48](https://github.com/plouc/nivo/commit/aceafc489465f82be140b997cf950875baafc55d))



<a name="v0.38.0"></a>
## v0.38.0 (2019-12-31)


#### Features

* **heatmap**  init TypeScript definitions (#198) ([6c5432db](https://github.com/plouc/nivo/commit/6c5432db7b1420bad94f6d7afe2931a67f6c7e0e))
* **pie**  add TypeScript Definitions for Pie component ([0def4c31](https://github.com/plouc/nivo/commit/0def4c3141c869e309366730c26c28070ec143e6))
* **tooltips**  add support for custom tooltips for bubble charts and treemaps (#200) ([092f3e0c](https://github.com/plouc/nivo/commit/092f3e0c5253d2ca66ce53b028c918953c08f97d))
* **website**
  *  fix treemap source code for treemap components ([b97c07b8](https://github.com/plouc/nivo/commit/b97c07b8c53e66f64265662e832dedc4446df067))
  *  restore scrol position when pathname changes ([49b7ffca](https://github.com/plouc/nivo/commit/49b7ffcae859b57b2a7fac1d041755972ec242cb))
  *  use BrowserRouter instead of HashRouter ([a360e444](https://github.com/plouc/nivo/commit/a360e444f63944914456e6aab9f8c2819a2ec238))
  *  upgrade nivo packages ([69deaa17](https://github.com/plouc/nivo/commit/69deaa17a9634e9a31f7fcbf36dcafa2cbfa1a08))



<a name="v0.37.0"></a>
## v0.37.0 (2019-12-31)


#### Features

* **heatmap**  add support for onClick event ([52d077c7](https://github.com/plouc/nivo/commit/52d077c718f3ca039737de13a19920625e9effde))
* **website**  upgrade nivo packages ([5f416e9a](https://github.com/plouc/nivo/commit/5f416e9ac0a20e44ad9bf63c0fdbc6d285706966))



<a name="v0.36.0"></a>
## v0.36.0 (2019-12-31)


#### Features

* **bar**  improve custom tooltip support ([5816555e](https://github.com/plouc/nivo/commit/5816555e73021d91d8af32a4b972c2738f58c1c6))
* **tooltips**  add support for configurable tooltips for bar charts and heat maps (#159) ([82473c10](https://github.com/plouc/nivo/commit/82473c10553e976b6e9d14c9e51d4093a3af510c))
* **website**  upgrade nivo packages ([8d8374a3](https://github.com/plouc/nivo/commit/8d8374a3dcd5d532c50831bbf193e06251996a2f))



<a name="v0.35.2"></a>
## v0.35.2 (2019-12-31)


#### Bug Fixes

* **lodash**  add missing deps & use scoped imports ([f04660f2](https://github.com/plouc/nivo/commit/f04660f2ff1cd965b0a9d2609782e0409cb486d5))

#### Features

* **website**  upgrade nivo packages ([66a7208c](https://github.com/plouc/nivo/commit/66a7208c577b74e30ba01fb986e1b4bdb7a5bdb5))



<a name="v0.35.1"></a>
## v0.35.1 (2019-12-31)


#### Bug Fixes

* **generators**  use modules ([9cec118c](https://github.com/plouc/nivo/commit/9cec118c0024af202a9fe24e94715916e1088069))



<a name="v0.35.0"></a>
## v0.35.0 (2019-12-31)


#### Bug Fixes

* **deps**  do not ignore yarn.lock ([1a60cfb8](https://github.com/plouc/nivo/commit/1a60cfb84ccc17ee933866e3c573d03546e6c066))
* **scripts**  fix make targets documentation ([48d87ec2](https://github.com/plouc/nivo/commit/48d87ec2a62b2e5bcd61110c132b8863776ceebb))
* **security**  Upgrade transitive hoek dep ([50d6fd52](https://github.com/plouc/nivo/commit/50d6fd521150098093c2d633efed8116fa63a0c2))
* **storybook**  fix storybook packages import ([d3abafdc](https://github.com/plouc/nivo/commit/d3abafdcaf612df8602c961e63e2c1d7a22fb94b))
* **website**  fix website Stream example code (#188) ([129572e6](https://github.com/plouc/nivo/commit/129572e621b7e6b246b61a0a7cccdb484bd5d31f))

#### Features

* **ci**  update travis config ([25e4cdca](https://github.com/plouc/nivo/commit/25e4cdca8cfb92d584512af03c728828b52b5b30))
* **deps**  use yarn with lerna & add missing yarn.lock files ([42675e47](https://github.com/plouc/nivo/commit/42675e47042d4bacf2edb3860f66a5a1971079e3))
* **legends**  add default text color + canvas support for text color ([20a30ab8](https://github.com/plouc/nivo/commit/20a30ab8a795d359b6e6b1eeb0a2194780c4cb20))
* **lint**  centralize lint command & config ([e8e38da4](https://github.com/plouc/nivo/commit/e8e38da4a0f20e0a9f07606ab36853fdab4d44ed))
* **packages**  use rollup for packages build ([f24cb08d](https://github.com/plouc/nivo/commit/f24cb08d8a8eb2feecb858fb41875ac99b782db0))
* **pie**  add support for onClick event ([b171044e](https://github.com/plouc/nivo/commit/b171044e25e25297e0f3714b5121dd24c21d86f8))
* **react**  nivo now require react >= 16.2.0 < 17.0.0 ([f64d3ef6](https://github.com/plouc/nivo/commit/f64d3ef6026438e4af29f436b27c46f00f9feae7))
* **stack**  make line areas stack in front of each other visibly #152 ([8ec91a66](https://github.com/plouc/nivo/commit/8ec91a66e3c3140c9176b52384a4603582545930))
* **tests**  centralize test command & dependencies ([eda819ca](https://github.com/plouc/nivo/commit/eda819ca03f3abfae50a5f21a9f7a8af5dcb562c))
* **website**  improve chart tabs ([2c2265f5](https://github.com/plouc/nivo/commit/2c2265f5671b82997515ea26c978b575e86dd3e7))



<a name="v0.34.0-1"></a>
## v0.34.0-1 (2019-12-31)


#### Bug Fixes

* **chord**  fix broken imports ([252efc0f](https://github.com/plouc/nivo/commit/252efc0f0a6694af0191b951bca3a7f93c0aef7a))
* **eslint**  fix eslint for some packages ([22b6bf6e](https://github.com/plouc/nivo/commit/22b6bf6e195f231c0bc4ca9c68f494909c40d5c7))
* **line**  avoid re-rerendering LineDots ([a6f51379](https://github.com/plouc/nivo/commit/a6f513793d1ba84bacc006ac3fc82932065f543f))

#### Features

* **chord**
  *  update @nivo/chord directory layout ([a143d80f](https://github.com/plouc/nivo/commit/a143d80fbbbfe689872a0bfa51a8a1a54316b9ae))
  *  init tests for @nivo/chord package ([a0622609](https://github.com/plouc/nivo/commit/a0622609eda265d355a23c0dbdc42036a6c41bc6))
* **composition**  init more granular approach to components ([da5c6fbf](https://github.com/plouc/nivo/commit/da5c6fbfe34db4bb5c22724a0926acffd5477608))
* **legends**  init SizeLegendSvg ([22c186ad](https://github.com/plouc/nivo/commit/22c186ad5cf305bb1e7eb9ca1034af1a52f4741f))
* **line**
  *  fix dot label color ([330720ce](https://github.com/plouc/nivo/commit/330720ceaffce246cb77f3a5cb08ff307d9e9c31))
  *  init tests & eslint for @nivo/line package ([5bf09098](https://github.com/plouc/nivo/commit/5bf0909843705aed65e49220ab076dfaaac312b0))
  *  add support for empty values + custom x scale + stacking ([4690cbc4](https://github.com/plouc/nivo/commit/4690cbc400565e35c5af463655d153d613991dc5))
  *  remove unused component ([bfec8288](https://github.com/plouc/nivo/commit/bfec82884f4a24b66ab682b32073287f998ddd9b))
  *  add LineChartCanvas component ([be930613](https://github.com/plouc/nivo/commit/be9306135d85569d9ad95da00e5266718bff9efe))
  *  rework stories ([05ea88f7](https://github.com/plouc/nivo/commit/05ea88f716ea86206258dab86f530321a747d84c))
  *  add LineChartSvg component ([42f1cfe3](https://github.com/plouc/nivo/commit/42f1cfe35027879cfeb8f62fcd09a765f6afaab6))
  *  restore ability to animate line & line area ([d517c521](https://github.com/plouc/nivo/commit/d517c521a5f652b026fe6b9a8380ad9440a12abf))
* **sankey**  init tests & eslint for @nivo/sankey package ([b4428b1e](https://github.com/plouc/nivo/commit/b4428b1ec99e702565ce98fba1d1e50139b962de))
* **scales**  add support for time scale ([28e8ebff](https://github.com/plouc/nivo/commit/28e8ebffe8fa9bdbd8d33c2143e61c9733655a1e))
* **scatterplot**
  *  add tests and stories ([bbc03444](https://github.com/plouc/nivo/commit/bbc03444a1ecc69a49273c695bb37b53473fc6af))
  *  add support for tooltips on ScatterPlotCanvas ([42a17314](https://github.com/plouc/nivo/commit/42a17314fe299f14a0e2eee3a84e492da1d9099b))
  *  add scatterplot package ([52fab5f9](https://github.com/plouc/nivo/commit/52fab5f98dcda403df46dc2565b8f7bfd4863472))
* **screenshots**  update packages screenshots ([a39731c3](https://github.com/plouc/nivo/commit/a39731c3ffdd59d36668603f033176d7f99b7b45))
* **website**
  *  make chart demo layout consistent across chart types ([f3166062](https://github.com/plouc/nivo/commit/f31660625fa72fb827a8ecf662e6c9f89334ddc9))
  *  improve chart tabs ([c32c5729](https://github.com/plouc/nivo/commit/c32c5729e3402b20983c020dfb8d51d569be916c))
  *  add illustration to @nivo/line low level components doc ([5ddaede9](https://github.com/plouc/nivo/commit/5ddaede9a86723a94b3767ff2e3f67eb79d01117))
  *  add @nivo/line low level components doc ([cf8a5caa](https://github.com/plouc/nivo/commit/cf8a5caaa589027dc01b6486ffed8220cf0acbab))
  *  upgrade @nivo packages ([71e1c4b0](https://github.com/plouc/nivo/commit/71e1c4b039feb6ef7cc9e4378a30f3a5018d6781))



<a name="v0.33.0-8"></a>
## v0.33.0-8 (2019-12-31)


#### Features

* **scatterplot**  add support for tooltips on ScatterPlotCanvas ([fc01970b](https://github.com/plouc/nivo/commit/fc01970bbfc0a8b811489f6df776f60956b140e8))



<a name="v0.33.0-7"></a>
## v0.33.0-7 (2019-12-31)




<a name="v0.33.0-6"></a>
## v0.33.0-6 (2019-12-31)


#### Bug Fixes

* **chord**  fix broken imports ([1021624a](https://github.com/plouc/nivo/commit/1021624ae72d52f6b4336e1ef7fe9053ab9aca98))



<a name="v0.33.0-5"></a>
## v0.33.0-5 (2019-12-31)


#### Features

* **api**  remove empty api package ([dd47b293](https://github.com/plouc/nivo/commit/dd47b293edcb07a6ed23cd0a26e29c4352ecfb3d))
* **bar**  add support for legends on Bar component ([6f22a4ab](https://github.com/plouc/nivo/commit/6f22a4ab3fe02a210d686153ea7f587d302102ff))
* **calendar**  add support for legends on Calendar component ([6ef9dc20](https://github.com/plouc/nivo/commit/6ef9dc20a0462e3279a50ab130bbe2902a6a85e5))
* **chord**  add support for legends on Chord component ([39212ef4](https://github.com/plouc/nivo/commit/39212ef4b5516cae43b4a5a3fd7ce40d15482e1a))
* **commands**  sort Makefile help ([4f7a872c](https://github.com/plouc/nivo/commit/4f7a872cb54c835235e0804482b516a24461e290))
* **dev**  add commands to list/rm currently linked packages for website ([df1d3085](https://github.com/plouc/nivo/commit/df1d3085e7214786948e0f9edcfaaf05327ef566))
* **examples**
  *  ensure examples build successfully on CI ([2ad46b7a](https://github.com/plouc/nivo/commit/2ad46b7af65fdcb7a3bb63d76327e3742e846776))
  * fix retro example dependencies ([2c84d014](https://github.com/plouc/nivo/commit/2c84d014c0ad88d1574f8ec5552cd837316a4371))
* **legends**  init legends package ([4063428b](https://github.com/plouc/nivo/commit/4063428baa626dd2e0810b830ca4cf6e5cde3b5a))
* **line**  add support for legends on Line component ([b7cc2449](https://github.com/plouc/nivo/commit/b7cc2449dc068e53e1449e7c04f09af7ebe8c624))
* **linting**  add eslint on several packages ([38ba981d](https://github.com/plouc/nivo/commit/38ba981d5c2a1411367ca326c7b449a9685135ea))
* **pie**  add support for legends on Pie component ([8c3004be](https://github.com/plouc/nivo/commit/8c3004bea9ca8e9315f4ce8c8c37e697a20db7a2))
* **publish**  add packages build prior to publish ([c6f9810b](https://github.com/plouc/nivo/commit/c6f9810b69c776ad0f193eb3ac28e64b7fe05422))
* **radar**  add support for legends on Radar component ([8d53e13b](https://github.com/plouc/nivo/commit/8d53e13bb5b5f54b6fbfecbc453f7c5245337a03))
* **sankey**  add support for legends on Sankey component ([0082fb98](https://github.com/plouc/nivo/commit/0082fb98a6e310ee15ebafb8f220133c8466e7f3))
* **scatterplot**  add scatterplot package ([ff7610c6](https://github.com/plouc/nivo/commit/ff7610c6c66531cb1f61b4766d1d109ffea6d083))
* **stream**  add support for legends on Stream component ([79395355](https://github.com/plouc/nivo/commit/79395355ec117fb1dc10b567ea4373be11507126))
* **website**
  *  upgrade @nivo packages ([2da761d8](https://github.com/plouc/nivo/commit/2da761d871348d1edfcadd46d91d214b77092fbb))
  *  upgrade @nivo packages ([4b60e426](https://github.com/plouc/nivo/commit/4b60e4262ec5188ec7dbf4c0b4565c10dfd25b20))
  *  upgrade @nivo packages ([429bd5f0](https://github.com/plouc/nivo/commit/429bd5f00dbb45301af606acecf24cde664b98da))



<a name="v0.33.0-4"></a>
## v0.33.0-4 (2019-12-31)


#### Features

* **bar**  add support for legends on Bar component ([09b0a2a9](https://github.com/plouc/nivo/commit/09b0a2a979f81349c3211b4c28459a725e77fb63))
* **calendar**  add support for legends on Calendar component ([3a547223](https://github.com/plouc/nivo/commit/3a54722393975dda50a2ac31f29461931e0fccff))
* **chord**  add support for legends on Chord component ([daeb4d4c](https://github.com/plouc/nivo/commit/daeb4d4c601263e5212caae963116717f99dada5))
* **dev**  add commands to list/rm currently linked packages for website ([3c5f0fdb](https://github.com/plouc/nivo/commit/3c5f0fdb00510d4e2b76708a42dce7c148e21210))
* **legends**  init legends package ([56c5f99c](https://github.com/plouc/nivo/commit/56c5f99c0f50ae0c586a9b13e835e0333c88008e))
* **line**  add support for legends on Line component ([b6a45955](https://github.com/plouc/nivo/commit/b6a45955d67abfc296994f99a2f5a56998766ffe))
* **pie**  add support for legends on Pie component ([d22faa6e](https://github.com/plouc/nivo/commit/d22faa6eaa63e9b4f1a50b0d0ac2b78d21317506))
* **publish**  add packages build prior to publish ([9a10a459](https://github.com/plouc/nivo/commit/9a10a4597fff0d90f5fa1a5dcfb3a5698b073368))
* **radar**  add support for legends on Radar component ([415ac596](https://github.com/plouc/nivo/commit/415ac59682a1435685a32c444d2f53ba7edd8be5))
* **sankey**  add support for legends on Sankey component ([feccf224](https://github.com/plouc/nivo/commit/feccf22489bd1c92c48e398a93fc7e5df98dc38b))
* **stream**  add support for legends on Stream component ([b0421f5c](https://github.com/plouc/nivo/commit/b0421f5cff68fa093d80251f4f71887899a328e5))
* **website**
  *  upgrade @nivo packages ([005e21af](https://github.com/plouc/nivo/commit/005e21afec69f8ab5db20e2d026f2c334dddfbad))
  *  upgrade @nivo packages ([2a0f2d03](https://github.com/plouc/nivo/commit/2a0f2d0312bfa43fbd66b71ca2aa19cfea8caaec))



<a name="v0.33.0-3"></a>
## v0.33.0-3 (2019-12-31)


#### Features

* **chord**  add support for legends on Chord component ([9708b531](https://github.com/plouc/nivo/commit/9708b531202dfcced675130809b871d652e083d0))
* **sankey**  add support for legends on Sankey component ([3cfe7ec1](https://github.com/plouc/nivo/commit/3cfe7ec1f223387b5b1eb5ea638d06d85d86bbb9))



<a name="v0.33.0-2"></a>
## v0.33.0-2 (2019-12-31)


#### Features

* **pie**  add support for legends on Pie component ([7092fbeb](https://github.com/plouc/nivo/commit/7092fbebc1e297d3e8015adbf79a8f2e11d9b7c1))



<a name="v0.33.0-1"></a>
## v0.33.0-1 (2019-12-31)


#### Features

* **dev**  add commands to list/rm currently linked packages for website ([c359a21b](https://github.com/plouc/nivo/commit/c359a21b473691c7ff2db84736fd027122a8400c))
* **publish**  add packages build prior to publish ([e37eb388](https://github.com/plouc/nivo/commit/e37eb3888172131e19052a20a8334bb92e0b114e))
* **stream**  add support for legends on Stream component ([66c475ae](https://github.com/plouc/nivo/commit/66c475aea009521700d6924837e556fa060ecefa))
* **website**  upgrade @nivo packages ([65694f8d](https://github.com/plouc/nivo/commit/65694f8dc4c6fae93b0ac644deefe504098f4cb4))



<a name="v0.33.0-0"></a>
## v0.33.0-0 (2019-12-31)


#### Features

* **calendar**  add support for legends on Calendar component ([2ff2aeb3](https://github.com/plouc/nivo/commit/2ff2aeb37665f7152486ab1e1b53e2a1dae91121))
* **legends**  init legends package ([c27aae45](https://github.com/plouc/nivo/commit/c27aae45e81cdf9011c6f8ddb39ee40cdd0a2faa))
* **line**  add support for legends on Line component ([d53614f8](https://github.com/plouc/nivo/commit/d53614f80fa9220e2cdb873485524de1090d2672))
* **radar**  add support for legends on Radar component ([eec6ac5c](https://github.com/plouc/nivo/commit/eec6ac5c8bfa9f28819ce74f08365d02bf2e1e4e))



<a name="v0.33.0"></a>
## v0.33.0 (2019-12-31)


#### Bug Fixes

* **babel-preset**  add missing ignored script ([17ac44e1](https://github.com/plouc/nivo/commit/17ac44e1815c4f19d707595cf4bf59dda810abdd))
* **chord**  fix broken imports ([252efc0f](https://github.com/plouc/nivo/commit/252efc0f0a6694af0191b951bca3a7f93c0aef7a))
* **readme**  fix misleading installation instructions ([0a5120f7](https://github.com/plouc/nivo/commit/0a5120f7665b13e51fcba335574fc1701cce2ff9))
* **split**
  *  add missing deps ([e0763870](https://github.com/plouc/nivo/commit/e07638707ed55a230cfdf722362e1b06c562095f))
  *  add missing deps ([c5461363](https://github.com/plouc/nivo/commit/c5461363a6a0350919b67d3e3800d477e3428107))
  *  add missing dep react-motion ([cefabeb9](https://github.com/plouc/nivo/commit/cefabeb9d451ae2f70e7126f9f0dc81d8e7a9a8d))

#### Features

* **api**  remove empty api package ([dd47b293](https://github.com/plouc/nivo/commit/dd47b293edcb07a6ed23cd0a26e29c4352ecfb3d))
* **bar**  add support for legends on Bar component ([6f22a4ab](https://github.com/plouc/nivo/commit/6f22a4ab3fe02a210d686153ea7f587d302102ff))
* **calendar**  add support for legends on Calendar component ([6ef9dc20](https://github.com/plouc/nivo/commit/6ef9dc20a0462e3279a50ab130bbe2902a6a85e5))
* **chord**
  *  add support for legends on Chord component ([39212ef4](https://github.com/plouc/nivo/commit/39212ef4b5516cae43b4a5a3fd7ce40d15482e1a))
  *  add source code for chord stories ([489f36fc](https://github.com/plouc/nivo/commit/489f36fc534c464a9ce234d5eb7c0183d1e5441e))
* **code style**  add prettier formatting ([9a550eb8](https://github.com/plouc/nivo/commit/9a550eb85d1db2611ada36239d8d85082317f12c))
* **commands**  sort Makefile help ([4f7a872c](https://github.com/plouc/nivo/commit/4f7a872cb54c835235e0804482b516a24461e290))
* **d3**  use caret range instead of fixed version for d3 deps ([9598511c](https://github.com/plouc/nivo/commit/9598511c8f185cfe7778c6bbde2c8b686f18006a))
* **demo**
  *  add command to deploy demo website + storybook ([e2f5c581](https://github.com/plouc/nivo/commit/e2f5c5817765a2e6b35dce070f89b84110ef7a28))
  *  remove unused deps ([eaff4d8b](https://github.com/plouc/nivo/commit/eaff4d8bf183dcd3c5f9251cab3723e17765f42c))
* **dev**  add commands to list/rm currently linked packages for website ([df1d3085](https://github.com/plouc/nivo/commit/df1d3085e7214786948e0f9edcfaaf05327ef566))
* **examples**
  *  ensure examples build successfully on CI ([2ad46b7a](https://github.com/plouc/nivo/commit/2ad46b7af65fdcb7a3bb63d76327e3742e846776))
  * fix retro example dependencies ([2c84d014](https://github.com/plouc/nivo/commit/2c84d014c0ad88d1574f8ec5552cd837316a4371))
* **generators**  use @nivo/generators instead of nivo-generators ([e65976d8](https://github.com/plouc/nivo/commit/e65976d83c714da8e16b92ca6b76ff15f47b42f4))
* **legends**  init legends package ([4063428b](https://github.com/plouc/nivo/commit/4063428baa626dd2e0810b830ca4cf6e5cde3b5a))
* **lerna**  exclude demo & examples from lerna ([aa255ebf](https://github.com/plouc/nivo/commit/aa255ebf94cfbdf7d997ad48e6edbaaaf54657f3))
* **line**  add support for legends on Line component ([b7cc2449](https://github.com/plouc/nivo/commit/b7cc2449dc068e53e1449e7c04f09af7ebe8c624))
* **linting**  add eslint on several packages ([38ba981d](https://github.com/plouc/nivo/commit/38ba981d5c2a1411367ca326c7b449a9685135ea))
* **packages**  add command to deploy all packages ([7467315c](https://github.com/plouc/nivo/commit/7467315c5e191d0876e0938ae9c6b8b95846d118))
* **pie**  add support for legends on Pie component ([8c3004be](https://github.com/plouc/nivo/commit/8c3004bea9ca8e9315f4ce8c8c37e697a20db7a2))
* **publish**  add packages build prior to publish ([c6f9810b](https://github.com/plouc/nivo/commit/c6f9810b69c776ad0f193eb3ac28e64b7fe05422))
* **radar**  add support for legends on Radar component ([8d53e13b](https://github.com/plouc/nivo/commit/8d53e13bb5b5f54b6fbfecbc453f7c5245337a03))
* **sankey**  add support for legends on Sankey component ([0082fb98](https://github.com/plouc/nivo/commit/0082fb98a6e310ee15ebafb8f220133c8466e7f3))
* **scatterplot**
  *  add tests and stories ([bbc03444](https://github.com/plouc/nivo/commit/bbc03444a1ecc69a49273c695bb37b53473fc6af))
  *  add support for tooltips on ScatterPlotCanvas ([42a17314](https://github.com/plouc/nivo/commit/42a17314fe299f14a0e2eee3a84e492da1d9099b))
  *  add scatterplot package ([52fab5f9](https://github.com/plouc/nivo/commit/52fab5f98dcda403df46dc2565b8f7bfd4863472))
* **split**  init multi packages ([158a349d](https://github.com/plouc/nivo/commit/158a349d2ba8e9e017486e32fc89baa4e5c0c0a3))
* **stream**  add support for legends on Stream component ([79395355](https://github.com/plouc/nivo/commit/79395355ec117fb1dc10b567ea4373be11507126))
* **tests**  restored existing tests ([e4cf806f](https://github.com/plouc/nivo/commit/e4cf806fc42977cd717b419b13aba36cb24aae0f))
* **website**
  *  upgrade @nivo packages ([2da761d8](https://github.com/plouc/nivo/commit/2da761d871348d1edfcadd46d91d214b77092fbb))
  *  upgrade @nivo packages ([4b60e426](https://github.com/plouc/nivo/commit/4b60e4262ec5188ec7dbf4c0b4565c10dfd25b20))
  *  upgrade @nivo packages ([429bd5f0](https://github.com/plouc/nivo/commit/429bd5f00dbb45301af606acecf24cde664b98da))
  *  upgrade website @nivo packages ([81adc8d0](https://github.com/plouc/nivo/commit/81adc8d057d5f770c5228ddf1450c4d77ac3e7bd))
  *  upgrade @nivo packages ([697e8aa5](https://github.com/plouc/nivo/commit/697e8aa59355b43d566cddd5f6a4314f30c06a71))
  *  rename demo to website ([dadc8f58](https://github.com/plouc/nivo/commit/dadc8f584f2514ae4f25a8d3b93051998805d586))



<a name="v0.32.0-9"></a>
## v0.32.0-9 (2019-12-31)


#### Bug Fixes

* **split**  add missing deps ([0c222f70](https://github.com/plouc/nivo/commit/0c222f702e44bbb9c6c8f1764d035aeba795e70e))



<a name="v0.32.0-8"></a>
## v0.32.0-8 (2019-12-31)


#### Features

* **d3**  use caret range instead of fixed version for d3 deps ([fa47e01e](https://github.com/plouc/nivo/commit/fa47e01ee50225376ef813a79c3f23a240a2885d))



<a name="v0.32.0-7"></a>
## v0.32.0-7 (2019-12-31)


#### Bug Fixes

* **split**  add missing deps ([dd9676bd](https://github.com/plouc/nivo/commit/dd9676bdb910f497980c08f982d1207340f685ac))



<a name="v0.32.0-5"></a>
## v0.32.0-5 (2019-12-31)


#### Bug Fixes

* **split**  add missing dep react-motion ([74e0bf54](https://github.com/plouc/nivo/commit/74e0bf543e4b6b973997304920a64d19906864bd))



<a name="v0.32.0-4"></a>
## v0.32.0-4 (2019-12-31)




<a name="v0.32.0-3"></a>
## v0.32.0-3 (2019-12-31)




<a name="v0.32.0-2"></a>
## v0.32.0-2 (2019-12-31)




<a name="v0.32.0-12"></a>
## v0.32.0-12 (2019-12-31)


#### Features

* **generators**  use @nivo/generators instead of nivo-generators ([a055d0e5](https://github.com/plouc/nivo/commit/a055d0e56d6acc46cfc73a88feb28ae386e0aeaa))



<a name="v0.32.0-11"></a>
## v0.32.0-11 (2019-12-31)


#### Features

* **code style**  add prettier formatting ([2f9a29b2](https://github.com/plouc/nivo/commit/2f9a29b2ea58ac4fc34bf795f28b589dbded69e5))
* **packages**  add command to deploy all packages ([36e87edb](https://github.com/plouc/nivo/commit/36e87edb581c80cb58c7fb9cdc1e706c41c943a4))
* **tests**  restored existing tests ([dc2b08bc](https://github.com/plouc/nivo/commit/dc2b08bc37f458d57f5f063e857ac68f2692647d))



<a name="v0.32.0-10"></a>
## v0.32.0-10 (2019-12-31)


#### Features

* **d3**  use caret range instead of fixed version for d3 deps ([fa47e01e](https://github.com/plouc/nivo/commit/fa47e01ee50225376ef813a79c3f23a240a2885d))
* **demo**
  *  add command to deploy demo website + storybook ([968e645f](https://github.com/plouc/nivo/commit/968e645f496fe8593fbc5477c0d2da1cb34ea562))
  *  remove unused deps ([770f521a](https://github.com/plouc/nivo/commit/770f521a8e5bfefe73605646051b1c26185307a8))
* **lerna**  exclude demo & examples from lerna ([5c815ccc](https://github.com/plouc/nivo/commit/5c815ccc38ece06424627eb4758cf843486fc39d))
* **website**  rename demo to website ([14a375c1](https://github.com/plouc/nivo/commit/14a375c1da0d2f4c6ff774b5a936dd610bcc2fcd))

#### Bug Fixes

* **split**
  *  add missing deps ([0c222f70](https://github.com/plouc/nivo/commit/0c222f702e44bbb9c6c8f1764d035aeba795e70e))
  *  add missing deps ([dd9676bd](https://github.com/plouc/nivo/commit/dd9676bdb910f497980c08f982d1207340f685ac))
  *  add missing dep react-motion ([74e0bf54](https://github.com/plouc/nivo/commit/74e0bf543e4b6b973997304920a64d19906864bd))



<a name="v0.32.0-1"></a>
## v0.32.0-1 (2019-12-31)


#### Bug Fixes

* **babel-preset**  add missing ignored script ([7fbc5951](https://github.com/plouc/nivo/commit/7fbc5951c1896164a01a5e2222dd3fb599f126e5))

#### Features

* **split**  init multi packages ([2e78776d](https://github.com/plouc/nivo/commit/2e78776db811c8710dfa957d769e3841b548e973))



<a name="v0.32.0"></a>
## v0.32.0 (2019-12-31)


#### Features

* **code style**  add prettier formatting ([9a550eb8](https://github.com/plouc/nivo/commit/9a550eb85d1db2611ada36239d8d85082317f12c))
* **d3**  use caret range instead of fixed version for d3 deps ([9598511c](https://github.com/plouc/nivo/commit/9598511c8f185cfe7778c6bbde2c8b686f18006a))
* **demo**
  *  add command to deploy demo website + storybook ([e2f5c581](https://github.com/plouc/nivo/commit/e2f5c5817765a2e6b35dce070f89b84110ef7a28))
  *  remove unused deps ([eaff4d8b](https://github.com/plouc/nivo/commit/eaff4d8bf183dcd3c5f9251cab3723e17765f42c))
* **generators**  use @nivo/generators instead of nivo-generators ([e65976d8](https://github.com/plouc/nivo/commit/e65976d83c714da8e16b92ca6b76ff15f47b42f4))
* **lerna**  exclude demo & examples from lerna ([aa255ebf](https://github.com/plouc/nivo/commit/aa255ebf94cfbdf7d997ad48e6edbaaaf54657f3))
* **packages**  add command to deploy all packages ([7467315c](https://github.com/plouc/nivo/commit/7467315c5e191d0876e0938ae9c6b8b95846d118))
* **split**  init multi packages ([158a349d](https://github.com/plouc/nivo/commit/158a349d2ba8e9e017486e32fc89baa4e5c0c0a3))
* **tests**  restored existing tests ([e4cf806f](https://github.com/plouc/nivo/commit/e4cf806fc42977cd717b419b13aba36cb24aae0f))
* **website**
  *  upgrade @nivo packages ([697e8aa5](https://github.com/plouc/nivo/commit/697e8aa59355b43d566cddd5f6a4314f30c06a71))
  *  rename demo to website ([dadc8f58](https://github.com/plouc/nivo/commit/dadc8f584f2514ae4f25a8d3b93051998805d586))

#### Bug Fixes

* **babel-preset**  add missing ignored script ([17ac44e1](https://github.com/plouc/nivo/commit/17ac44e1815c4f19d707595cf4bf59dda810abdd))
* **split**
  *  add missing deps ([e0763870](https://github.com/plouc/nivo/commit/e07638707ed55a230cfdf722362e1b06c562095f))
  *  add missing deps ([c5461363](https://github.com/plouc/nivo/commit/c5461363a6a0350919b67d3e3800d477e3428107))
  *  add missing dep react-motion ([cefabeb9](https://github.com/plouc/nivo/commit/cefabeb9d451ae2f70e7126f9f0dc81d8e7a9a8d))



<a name="v0.31.0"></a>
## v0.31.0 (2019-12-31)


#### Features

* **calendar**
  *  add support for tooltip ([149e664e](https://github.com/plouc/nivo/commit/149e664ee8b2360353c1861637c6046624b7e186))
  *  remove support for motion and align code with other charts ([b9b47f75](https://github.com/plouc/nivo/commit/b9b47f757ff30e8b8f54c7368d891a40c99e2a3b))



<a name="v0.30.1"></a>
## v0.30.1 (2019-12-31)


#### Features

* **line**
  *  fix wrong prop type ([df4ac4ea](https://github.com/plouc/nivo/commit/df4ac4ea4df3732469fc7fbe67d2eb6ee67585e0))
  *  new prop enableArea was added to Line chart (#82) ([6958db18](https://github.com/plouc/nivo/commit/6958db184f009fc8df339d1cab08b09af17eab29))
  *  part of a line with missing data was hidden (#81) ([60e47746](https://github.com/plouc/nivo/commit/60e47746cf4aaafb0773b46ee1a79990aa0b9950))
* **tooltip**  prop to format values in tooltip was added (#69) ([0dfafff5](https://github.com/plouc/nivo/commit/0dfafff544ceadc4253ab3a05170709a3724152c))
* **voronoi**  improve voronoi (#93) ([e1ae81a8](https://github.com/plouc/nivo/commit/e1ae81a800110683ce6de95debbbc7eddded3a8f))



<a name="v0.30.0"></a>
## v0.30.0 (2019-12-31)


#### Bug Fixes

* **bar**  getLabel is defined twice (#76) ([4cfd3a11](https://github.com/plouc/nivo/commit/4cfd3a1121d8e7de1948a68eca805f20e94aa891))

#### Features

* **axes**  add onClick handler to axis ticks (#60) ([0c9efe4b](https://github.com/plouc/nivo/commit/0c9efe4bfac40bad090eb7fe74bb19164acd2859))
* **interactivity**  add onClick support for Sankey (#75) ([a547917c](https://github.com/plouc/nivo/commit/a547917c721018b23d7a853368535cec9950cbfc))
* **pie**  add ability to use default dataset order (#79) ([f4a261d3](https://github.com/plouc/nivo/commit/f4a261d34d8d41cce5688bc52cc5753f96322c19))
* **react**  update required react version ([4b4865fc](https://github.com/plouc/nivo/commit/4b4865fcfd00eb29e43f8e61b8fa74c6485dd861))
* **sankey**
  *  Support complete configuration of the tooltips (#78) ([f3aecf6c](https://github.com/plouc/nivo/commit/f3aecf6c91a078af8f748613aaa1e79c820b5526))
  *  Support configurable labels (#77) ([5ac962b1](https://github.com/plouc/nivo/commit/5ac962b1eb60982a99726b1b2909bb233281999c))



<a name="v0.29.4"></a>
## v0.29.4 (2019-12-31)




<a name="v0.29.3"></a>
## v0.29.3 (2019-12-31)


#### Features

* **axis**  add support for custom tick values/count (#58) ([bd789728](https://github.com/plouc/nivo/commit/bd789728c78279d8eb5a467503e34a505cb04c54))



<a name="v0.29.2"></a>
## v0.29.2 (2019-12-31)




<a name="v0.29.1"></a>
## v0.29.1 (2019-12-31)


#### Features

* **tooltip**  improve positioning ([288657c7](https://github.com/plouc/nivo/commit/288657c7303af675077937f276ced26c38fe3003))
* **treemap**  add TreeMapCanvas component ([e12a1268](https://github.com/plouc/nivo/commit/e12a1268e955442d6ba04f4e3921488c6830debc))



<a name="v0.29.0"></a>
## v0.29.0 (2019-12-31)


#### Features

* **bubble**  improve bubble components ([0779f335](https://github.com/plouc/nivo/commit/0779f335b235d3537256ee07ec301bc6a34405ea))
* **treemap**  remove placeholders and improve svg & html flavors ([ff3734da](https://github.com/plouc/nivo/commit/ff3734da80e3396ec9cc00f477e13bfce83f1863))



<a name="v0.28.1"></a>
## v0.28.1 (2019-12-31)


#### Bug Fixes

* **window**  use global.window instead of window for node env ([bf1e6202](https://github.com/plouc/nivo/commit/bf1e6202d7c80310dccf2f8958cb7f8b02ab1c30))



<a name="v0.28.0"></a>
## v0.28.0 (2019-12-31)


#### Features

* **bar**  add support for border on Bar component ([7f5ac7ce](https://github.com/plouc/nivo/commit/7f5ac7ceb1880954443470767d01582f8bbbc025))
* **bubble**  add canvas support for bubble chart ([8db9a136](https://github.com/plouc/nivo/commit/8db9a1366fc53a8d0eb9dbd53bec5573e2c04ac0))
* **chord**  add ability to customize chord borders color ([bee8de33](https://github.com/plouc/nivo/commit/bee8de334ca5f7762b0922a69bceaee1c90f843a))
* **defs**  init support for svg gradients/patterns ([cd4c1663](https://github.com/plouc/nivo/commit/cd4c16635f94924a0ff82772ce91d083df94b4f2))
* **line**  add ability to customize line width ([8cb88477](https://github.com/plouc/nivo/commit/8cb88477b20af6fd00168099cb043f9cf05ce438))
* **stream**  add border suppport ([5eabc451](https://github.com/plouc/nivo/commit/5eabc451e9e8e5bd16058812f6d3a515d74b2b6b))



<a name="v0.27.0"></a>
## v0.27.0 (2019-12-31)


#### Features

* **bar**
  *  improve bar components: ([640debc7](https://github.com/plouc/nivo/commit/640debc76de229261d9d9845c10aac18877578be))
  *  add label format support for Bar (#45) ([c5a63c95](https://github.com/plouc/nivo/commit/c5a63c9517d4d0cfafd07df19800f9373e8db479))



<a name="v0.26.3"></a>
## v0.26.3 (2019-12-31)




<a name="v0.26.2"></a>
## v0.26.2 (2019-12-31)


#### Bug Fixes

* **bubble**  fix bubble props export ([37067061](https://github.com/plouc/nivo/commit/37067061cf1d4353da4fed3dd60dabb61a449cf7))



<a name="v0.26.1"></a>
## v0.26.1 (2019-12-31)


#### Features

* **interactivity**  add onClick support for Bar & Bubble ([a73af167](https://github.com/plouc/nivo/commit/a73af1679debb0211b73c1af814f28ccfb1a4ba7))



<a name="v0.26.0"></a>
## v0.26.0 (2019-12-31)


#### Bug Fixes

* **tooltip**  fix tooltip offset with scroll ([c320c23f](https://github.com/plouc/nivo/commit/c320c23f330e15607479d22224143811bfd3936b))

#### Features

* **axis**  improve axis formatting support ([69269a60](https://github.com/plouc/nivo/commit/69269a6072314cb04cb300cd55602af8ccabaf3e))
* **bar**  add ability to define bar chart min/max value ([d9b9bdae](https://github.com/plouc/nivo/commit/d9b9bdaeff03cd16092bad47b34a0e570ce10c76))
* **bubble**  fix bubble color transition ([675c6689](https://github.com/plouc/nivo/commit/675c66897f51b8b450a4d2b9f29c3985604bd38b))
* **sankey**  improve sankey interactivity ([27a5ff54](https://github.com/plouc/nivo/commit/27a5ff54ff5c223afec2fb225b7105f7065ece1c))



<a name="v0.25.0"></a>
## v0.25.0 (2019-12-31)


#### Features

* **chord**  add labels, stories and cavans variant for Chord component ([281021bb](https://github.com/plouc/nivo/commit/281021bb671b8f7e7dc3e40ea8acd9bb84127d69))



<a name="v0.24.0"></a>
## v0.24.0 (2019-12-31)


#### Features

* **axes**  use same code for svg & canvas ticks ([c8c693a3](https://github.com/plouc/nivo/commit/c8c693a36ec415762d3150ab2f8f80e0dadda269))
* **chord**  improve Chord component ([16af1340](https://github.com/plouc/nivo/commit/16af1340e85b2f21c62df9e605dd6e5bec4433ea))
* **heatmap**  add tooltip support for HeatMap ([28077c58](https://github.com/plouc/nivo/commit/28077c58706d97a4b0700a7d71cd4fb66d35f43f))



<a name="v0.23.4"></a>
## v0.23.4 (2019-12-31)


#### Features

* **axes**  use same code for svg & canvas ticks ([c0de4732](https://github.com/plouc/nivo/commit/c0de4732115b0cba433ce24f937df11117e92264))
* **heatmap**
  *  add tooltip support for HeatMap ([422d4c2a](https://github.com/plouc/nivo/commit/422d4c2a0b1a071e9de54435fbb014ba9e7d1bb6))
  *  add hover behavior on HeatMapCanvas ([37974a91](https://github.com/plouc/nivo/commit/37974a91a280293ec7216687caafa14c815f49a4))



<a name="v0.23.3"></a>
## v0.23.3 (2019-12-31)


#### Bug Fixes

* **canvas**  fix resizing when using canvas based components ([0d41f563](https://github.com/plouc/nivo/commit/0d41f563783d9ef0428808ff2439dd9e90042aee))



<a name="v0.23.2"></a>
## v0.23.2 (2019-12-31)


#### Features

* **canvas**  add support for HiDPI screens ([26ebb9b7](https://github.com/plouc/nivo/commit/26ebb9b7271b6348d76ea64fd8cd4cabb29a9805))



<a name="v0.23.1"></a>
## v0.23.1 (2019-12-31)


#### Features

* **bar**  add tooltip support for BarCanvas ([946bb066](https://github.com/plouc/nivo/commit/946bb0661dad4bec32ddaa9d097f249bfb8a1bf6))
* **heatmap**  add tooltip support for HeatMapCanvas ([db579a16](https://github.com/plouc/nivo/commit/db579a16cd8c380b368bfa1fd3674eb5eb9c8109))



<a name="v0.23.0"></a>
## v0.23.0 (2019-12-31)


#### Bug Fixes

* **stream**  fix stream stacked tooltip ([05fbcc9f](https://github.com/plouc/nivo/commit/05fbcc9fadf6d540f6788de5cb98072b92cdd103))

#### Features

* **canvas**  add canvas support for bar & heatmap ([94ad4d97](https://github.com/plouc/nivo/commit/94ad4d97229716a5ca6e189cd1a31b778385c977))



<a name="v0.22.1"></a>
## v0.22.1 (2019-12-31)




<a name="v0.22.0"></a>
## v0.22.0 (2019-12-31)


#### Features

* **heatmap**  add HeatMap component ([425afdaa](https://github.com/plouc/nivo/commit/425afdaaa9e4c443316a551c690c208cc6385be7))



<a name="v0.21.0"></a>
## v0.21.0 (2019-12-31)




<a name="v0.20.0"></a>
## v0.20.0 (2019-12-31)


#### Features

* **dots**  add ability to define custom dot symbol ([da49e15f](https://github.com/plouc/nivo/commit/da49e15fb0c9706fdbbe8baff82148906451f614))
* **generators**  update nivo-generators ([ada44cf7](https://github.com/plouc/nivo/commit/ada44cf79cc7edcdf35a8a97aef8d1d92b1564b9))
* **line**  add ability to define min/max Y value ([2bd2554f](https://github.com/plouc/nivo/commit/2bd2554f2f8faeccc6f4a8ea04112e0489eeecae))
* **markers**  add support for markers on Line & Bar charts ([e36a7a2b](https://github.com/plouc/nivo/commit/e36a7a2bd2616bc4e4c2a4a927dfb14299ee9d4c))
* **sankey**
  *  improve Sankey diagram ([aa5c8471](https://github.com/plouc/nivo/commit/aa5c84711d9653e6b1f24ea6346f2833344cf958))
  *  add support for label on Sankey diagram ([b90de33a](https://github.com/plouc/nivo/commit/b90de33ad818f86a0ed1a6af24bed831c221834c))
  *  add sankey diagram component ([f358d2f9](https://github.com/plouc/nivo/commit/f358d2f9709555833fd9ca550b5c0a2f30c63f3b))
* **theming**  fix tooltip theming ([9385dd67](https://github.com/plouc/nivo/commit/9385dd67ed8ec1d55ef12a84328b831be701edc2))



<a name="v0.19.0"></a>
## v0.19.0 (2019-12-31)


#### Bug Fixes

* **treemap**  fix missing default props ([887cfcde](https://github.com/plouc/nivo/commit/887cfcde2fc9ecbeac24fa559203a6c2fe3dc40c))



<a name="v0.18.0"></a>
## v0.18.0 (2019-12-31)


#### Features

* **bubble**
  *  fix bubble tooltip id value ([615b90e9](https://github.com/plouc/nivo/commit/615b90e97759f7a1828ab35bb22f902e6ca5809e))
  *  add Bubble stories ([aba5c985](https://github.com/plouc/nivo/commit/aba5c985613a346ee3bae7a8b34c1a7f2e2ae95e))
  *  add zooming ability to Bubble components ([a231c07b](https://github.com/plouc/nivo/commit/a231c07be1791e07b190811cf34e66483cd66730))
* **hierarchy**  add withHierarchy() HOC ([99c2f789](https://github.com/plouc/nivo/commit/99c2f789b18450b58e05104c503708c33c7f6fc5))
* **labels**  use alignmentBaseline instead of approximative dy ([10aa40fe](https://github.com/plouc/nivo/commit/10aa40fed76897e685bec28ea7947b6920a9cc1a))
* **radar**  add support for tooltip on Radar component ([acd9a4f9](https://github.com/plouc/nivo/commit/acd9a4f9efdaf8ae801f1b70ea469745cdd3ecdb))
* **treemap**  add support for tooltip on TreeMap components ([755783d8](https://github.com/plouc/nivo/commit/755783d880e73e5b74a0045fc2a467e97e2d72f8))



<a name="v0.17.0"></a>
## v0.17.0 (2019-12-31)




<a name="v0.16.0"></a>
## v0.16.0 (2019-12-31)


#### Features

* **radar**  simplify radar data format ([d56a9441](https://github.com/plouc/nivo/commit/d56a94416f53d2f1a86d80ae771866dd629557cb))
* **storybook**  update Bar storybook ([b5c39f70](https://github.com/plouc/nivo/commit/b5c39f70e657cef909ccedd20cd0986a22d1c82a))



<a name="v0.15.0"></a>
## v0.15.0 (2019-12-31)


#### Features

* **tooltip**  add support for tooltip theming ([72f2f751](https://github.com/plouc/nivo/commit/72f2f751318323f2431641c970680db5d9c8f251))



<a name="v0.14.0"></a>
## v0.14.0 (2019-12-31)


#### Features

* **bar**  add support for horizontal layout & change data format ([29a4b350](https://github.com/plouc/nivo/commit/29a4b350341c3745691509bc4f81c9eac74d36ee))



<a name="v0.13.0"></a>
## v0.13.0 (2019-12-31)


#### Features

* **axes**  add ability to rotate axes tick label ([3921c2f1](https://github.com/plouc/nivo/commit/3921c2f17a7d7da159dde7c9fb25492e12dedd48))



<a name="v0.12.0"></a>
## v0.12.0 (2019-12-31)


#### Bug Fixes

* **Makefile**  disable command priting for packages-build recipe ([1046ee2c](https://github.com/plouc/nivo/commit/1046ee2c723cd3f9d89c546f0785c72f6098f530))
* **api**  fix api mappings ([80b281cc](https://github.com/plouc/nivo/commit/80b281cc6a8580101499f8da747beab4412e904d))
* **axes**
  *  treat renderTick as a React component ([4bd566c8](https://github.com/plouc/nivo/commit/4bd566c8485725260f39b1e06f3424a7416f20ab))
  *  respect useUTC option on x/y scale property (#574) ([b4ca5ecc](https://github.com/plouc/nivo/commit/b4ca5ecc576226ba345e77bd918e04eb1ab98b23))
* **babel-preset**  add missing ignored script ([17ac44e1](https://github.com/plouc/nivo/commit/17ac44e1815c4f19d707595cf4bf59dda810abdd))
* **bar**
  *  add ability to use number for grid lines (#669) ([3d48b94d](https://github.com/plouc/nivo/commit/3d48b94d5e8e66665691129578fab4c55fa61d49))
  *  add missing borderColor type to nivo/bar (#704) ([050f0a98](https://github.com/plouc/nivo/commit/050f0a98239ced802fd8d9582da49f6f9c588809))
  *  add missing `renderTick` type to Bar's definition (#697) ([61fc2078](https://github.com/plouc/nivo/commit/61fc20786b92eb1c96ba1c543f43aa91c57591c7))
  *  allow null for axes ([8a22b666](https://github.com/plouc/nivo/commit/8a22b666e24ddeafabf6085daa55d946df2c38f7))
  *  remove unnecessary ColorProps ([865e9a61](https://github.com/plouc/nivo/commit/865e9a61a15d9ec8f45b182e30374194e33cd1ca))
  *  Allow BarItem label property to accept React.Element ([48c8e410](https://github.com/plouc/nivo/commit/48c8e410ba8acc5b05add184bad2542c026a21f8))
  *  fix missing legend in Bar chart  #362 ([aa12d9d2](https://github.com/plouc/nivo/commit/aa12d9d23e43344b05c4ea103177afbe2285b6ee))
  *  fix BarItem label prop type ([682cbed0](https://github.com/plouc/nivo/commit/682cbed01babb4773568eb590463c22dfd0b5762))
  *  getLabel is defined twice (#76) ([4cfd3a11](https://github.com/plouc/nivo/commit/4cfd3a1121d8e7de1948a68eca805f20e94aa891))
* **bubble**
  *  fix bubble props export ([37067061](https://github.com/plouc/nivo/commit/37067061cf1d4353da4fed3dd60dabb61a449cf7))
  *  add missing tooltip when using static bubble chart ([9faae318](https://github.com/plouc/nivo/commit/9faae318d23b6d74e65ecdac2d3a6812fd009102))
* **build**  add missing externals in rollup config ([e23182f2](https://github.com/plouc/nivo/commit/e23182f2de917835bd7cda267a57484b93c77290))
* **bullet**  remove deprecated property titleWidth ([0c8e8bbb](https://github.com/plouc/nivo/commit/0c8e8bbb734e804c50e3bc235685c91d967c7c7d))
* **bump**  fix points keys & motion and code formatting ([d92a9655](https://github.com/plouc/nivo/commit/d92a9655028a34eda89465e04288022126fd2148))
* **calendar**
  *  add missing exports for canvas calendar (#700) ([3f9bc623](https://github.com/plouc/nivo/commit/3f9bc62358ebf1bbab4f62a38306c59b9de122ab))
  *  fix crash when no data is empty ([5ac42141](https://github.com/plouc/nivo/commit/5ac42141d2495aa1b4afc22e6e2ada3e7b7e9a51))
  *  fix regression on calendar ([b687ec84](https://github.com/plouc/nivo/commit/b687ec8483905da27989da4a91df3c7c78a61eec))
* **canvas**  fix resizing when using canvas based components ([0d41f563](https://github.com/plouc/nivo/commit/0d41f563783d9ef0428808ff2439dd9e90042aee))
* **chord**
  *  skip rendering for zero/negative radius ([647a496a](https://github.com/plouc/nivo/commit/647a496a250f1d558fff18ec193d2554043d1eb0))
  *  fix broken imports ([252efc0f](https://github.com/plouc/nivo/commit/252efc0f0a6694af0191b951bca3a7f93c0aef7a))
* **choropleth**
  *  add missing domain prop to typings (#634) ([fa3c220a](https://github.com/plouc/nivo/commit/fa3c220a3ff519154d74ad2bcad5eb8b5c0a033f))
  *  add missing domain prop (#540) ([6bf655fb](https://github.com/plouc/nivo/commit/6bf655fba86de10ee40492d7cf062562627b64ee))
* **color**  fix ColorUtils unit test ([bd9e03d3](https://github.com/plouc/nivo/commit/bd9e03d3cf6fa287e1f089259eb64f7846ac327e))
* **colors**  fix colors due to d3 packages upgrade ([a17d93bc](https://github.com/plouc/nivo/commit/a17d93bc859d2f202f4c2960e9c3fbee4590e581))
* **deps**  do not ignore yarn.lock ([1a60cfb8](https://github.com/plouc/nivo/commit/1a60cfb84ccc17ee933866e3c573d03546e6c066))
* **eslint**  fix eslint for all packages ([27bf8d0c](https://github.com/plouc/nivo/commit/27bf8d0cec55f7caf7bb18fc5f5eeeb9c4e7875e))
* **generators**  use modules ([9cec118c](https://github.com/plouc/nivo/commit/9cec118c0024af202a9fe24e94715916e1088069))
* **geo**
  *  add missing dependency for legend data memoization ([887c57e7](https://github.com/plouc/nivo/commit/887c57e7b91ff7052fa657290e2b29889f87362a))
  *  fix custom layers ([069e4e61](https://github.com/plouc/nivo/commit/069e4e61a048c6f672a3928c2a7d648397f688a2))
* **heatmap**
  *  fix support for enableLabels property ([a866586a](https://github.com/plouc/nivo/commit/a866586abd33522558d3f552b90bc4daf655386b))
  *  better handling of NaN values ([02ef5577](https://github.com/plouc/nivo/commit/02ef55773bb3df971b5fefc876281eb72ccaae91))
* **ignores**  fix git ignore misconfiguration ([41e278a7](https://github.com/plouc/nivo/commit/41e278a7d3de59231339ec9eaff7a31e9f41f293))
* **jest**  fix jest babel config ([da5edb0d](https://github.com/plouc/nivo/commit/da5edb0d3986d791507fdcc7e5e873f7bc941467))
* **legends**
  *  make sure to pass the theme object when using canvas legends ([ae621162](https://github.com/plouc/nivo/commit/ae6211629fd5ed56f98bceb83e9355a74b962dc7))
  *  honor theme font settings for labels ([e4a65fc4](https://github.com/plouc/nivo/commit/e4a65fc4199465bfe1a0920d30c0c7bc2aa72711))
  *  fix vertical alignment of canvas labels ([559e3c78](https://github.com/plouc/nivo/commit/559e3c78ff1298584f8e410b9c5cf8a47f7cce76))
  *  fix legends unit tests ([41dd564f](https://github.com/plouc/nivo/commit/41dd564fcc740e99fa4a1a58ba707b22a877a7b8))
* **line**
  *  update PropType for Line markers when using dates for the X axis (#653) ([2c9bfc2d](https://github.com/plouc/nivo/commit/2c9bfc2dee8bc8485378dfc4fb180da5734c7aec))
  *  add missing pointSymbol prop to typings ([c249df83](https://github.com/plouc/nivo/commit/c249df83b2ff46d0b3c2f92b292f381cf52cea0b))
  *  add missing tooltip prop to typings (#568) ([0a90609b](https://github.com/plouc/nivo/commit/0a90609bd4c7f9fb29cd95b4879a857736dbb680))
  *  fix LineSlices id prop type ([6f229b90](https://github.com/plouc/nivo/commit/6f229b90879c9c042c07e387b5999afdaa727442))
  *  fix default curve property ([4835a02a](https://github.com/plouc/nivo/commit/4835a02aa428d568691dd6a9e07c12b8145e78fb))
  *  fix line chart color when animation disabled ([41e9e25f](https://github.com/plouc/nivo/commit/41e9e25f20600bf4bc44247bbe22df0d7be63019))
* **lodash**
  *  use scoped imports ([dea6a75f](https://github.com/plouc/nivo/commit/dea6a75f921e4e6e9c62a7ebb987c32fafbe04f8))
  *  add missing deps & use scoped imports ([f04660f2](https://github.com/plouc/nivo/commit/f04660f2ff1cd965b0a9d2609782e0409cb486d5))
* **pie**  fix code formatting ([1f9cf69e](https://github.com/plouc/nivo/commit/1f9cf69e823d085345c6cb5d36b8233e18698f9d))
* **prop-types**  fix missing prop types on various packages ([8d0fe0d9](https://github.com/plouc/nivo/commit/8d0fe0d91cfdc7efb1428b341afa087a3fdb411a))
* **publish**
  *  add missing npm-normalize-package-bin package ([91acdf21](https://github.com/plouc/nivo/commit/91acdf218de91659928fcbb13f31463d50501d67))
  *  fix lerna arg ([97fcb868](https://github.com/plouc/nivo/commit/97fcb86849a8d90bc056cda184c22b37d2680a40))
* **radar**  fix Radar cached tooltip ([a8626bec](https://github.com/plouc/nivo/commit/a8626becc9ce87229d0d16dfd02da428deee5acd))
* **react-dom**  use react-dom instead of react for DOM retrieval ([c0940876](https://github.com/plouc/nivo/commit/c0940876d14d97d62b38f2a6612c628e6ff382ca))
* **readme**
  *  fix misleading installation instructions ([0a5120f7](https://github.com/plouc/nivo/commit/0a5120f7665b13e51fcba335574fc1701cce2ff9))
  *  fix readme badges links ([21a90289](https://github.com/plouc/nivo/commit/21a902899074e0e3ca8e296bdf88e09533e4bc39))
  *  fix broken license link in readme ([a27a2117](https://github.com/plouc/nivo/commit/a27a21170e37ef0c1b4d286801ff11cdff2a17fd))
* **rename**  Remove trailing layout component ([860c8e77](https://github.com/plouc/nivo/commit/860c8e77a1be5fcda746cb6f90e924da9e7dc6ab))
* **sankey**
  *  fix issue with gradient links and spaces in IDs (#676) ([52feccbf](https://github.com/plouc/nivo/commit/52feccbfdf9c65d01238edffe83efa75eb6e248a))
  *  improve Sankey types ([9d5c7285](https://github.com/plouc/nivo/commit/9d5c7285748f44ce8c146d41643d21ed2b55f957))
  *  change custom align story to use correct align property ([6d300ab6](https://github.com/plouc/nivo/commit/6d300ab6b08d98046331dc754d90751aea46683f))
  *  fix broken custom node sorting (#498) ([319e7e07](https://github.com/plouc/nivo/commit/319e7e072ac283f8abbece696458a49ccafeaf77))
* **scales**
  *  add `useUTC` to types (#690) ([d7c1da53](https://github.com/plouc/nivo/commit/d7c1da530aead9a97f889edb20f6ecb27a4cd6db))
  *  fix time scale instantiation ([c9abfaef](https://github.com/plouc/nivo/commit/c9abfaefa241c1b7bdba7a227894424682fb4894))
* **scatterplot**
  *  fix scatterplot unit tests ([c6b01ff1](https://github.com/plouc/nivo/commit/c6b01ff1a608f8bee0b1c77b8db0f264cb88dbf5))
  *  fix unit tests ([3ea40c02](https://github.com/plouc/nivo/commit/3ea40c02edcfc9bec9dcd794cefd96edc128de3c))
  *  fix scatterplot voronoi overlay ([3bdc783e](https://github.com/plouc/nivo/commit/3bdc783e215362bd039a13eb22bd4918ca38e4a9))
  *  fix wrong legend item color in ScatterPlotCanvas (#372) ([155fdfae](https://github.com/plouc/nivo/commit/155fdfaefed512fd4b32d2e91f46055800ba1f1a))
* **scripts**  fix make targets documentation ([48d87ec2](https://github.com/plouc/nivo/commit/48d87ec2a62b2e5bcd61110c132b8863776ceebb))
* **security**  Upgrade transitive hoek dep ([50d6fd52](https://github.com/plouc/nivo/commit/50d6fd521150098093c2d633efed8116fa63a0c2))
* **split**
  *  add missing deps ([e0763870](https://github.com/plouc/nivo/commit/e07638707ed55a230cfdf722362e1b06c562095f))
  *  add missing deps ([c5461363](https://github.com/plouc/nivo/commit/c5461363a6a0350919b67d3e3800d477e3428107))
  *  add missing dep react-motion ([cefabeb9](https://github.com/plouc/nivo/commit/cefabeb9d451ae2f70e7126f9f0dc81d8e7a9a8d))
* **stack**  fix broken Stack tests ([6ef978c4](https://github.com/plouc/nivo/commit/6ef978c45596d54c44011f3e91eba86cd41b7e80))
* **storybook**
  *  fix typo in line's story (#680) ([680a6ed3](https://github.com/plouc/nivo/commit/680a6ed357843d8a1c5b527d90a6f76f45e67621))
  *  fix storybook packages import ([d3abafdc](https://github.com/plouc/nivo/commit/d3abafdcaf612df8602c961e63e2c1d7a22fb94b))
* **stream**
  *  fix bugs in typings (#593) ([9b157510](https://github.com/plouc/nivo/commit/9b157510d7bacca846d984bc166ff486938b60c8))
  *  fix stream stacked tooltip ([05fbcc9f](https://github.com/plouc/nivo/commit/05fbcc9fadf6d540f6788de5cb98072b92cdd103))
* **svg**
  *  fix text vertical alignment ([d59fb722](https://github.com/plouc/nivo/commit/d59fb722ad8cc618f257cbb90faf067ccc58c9f4))
  *  fix svg for server side rendering ([ae77d432](https://github.com/plouc/nivo/commit/ae77d432d8079d910b9de54e433613dc55eab9fc))
* **tests**
  *  upgrade enzyme ([d69be1fc](https://github.com/plouc/nivo/commit/d69be1fc674abdad08c646463a5917d21a84bbb5))
  *  add missing webpack package ([9be90ace](https://github.com/plouc/nivo/commit/9be90acec37ca1bfec3a0d37a1a4deb6bb3dbec7))
* **tooltip**
  *  update tooltip TypeScript types. (#657) ([305a536f](https://github.com/plouc/nivo/commit/305a536f4cff6401da179598d9bc688822528b16))
  *  fix tooltip offset with scroll ([c320c23f](https://github.com/plouc/nivo/commit/c320c23f330e15607479d22224143811bfd3936b))
* **travis**  use specific browser on travis for browser testing ([45d318ce](https://github.com/plouc/nivo/commit/45d318ce9b6ac8415d1d16034dcec55670ded162))
* **treemap**
  *  add missing default colorBy ([ba91da53](https://github.com/plouc/nivo/commit/ba91da53d7e843681db0440203a9d14ae94a8f2f))
  *  fix missing default props ([887cfcde](https://github.com/plouc/nivo/commit/887cfcde2fc9ecbeac24fa559203a6c2fe3dc40c))
* **typescript**
  *  fix TableTooltip and LineComputedSerieDatum-type (#428) ([fd35f78e](https://github.com/plouc/nivo/commit/fd35f78e93198d459b0ac14afdde09625f156e96))
  *  Allow axis to be AxisProps or `null` ([5d45796f](https://github.com/plouc/nivo/commit/5d45796f5a9ed8c4e7c55e979a5681e2edc10948))
* **unit-tests**  fix broken unit tests ([321ef10d](https://github.com/plouc/nivo/commit/321ef10dfdae2b7d26b7c31b708c0684c55d0e5a))
* **voronoi**  upgrade d3-delaunay to fix single/collinear points (#640) ([b93c96a5](https://github.com/plouc/nivo/commit/b93c96a58d4614d020142648630ab7cdffc84094))
* **waffle**  remove self import from TypeScript def ([867a545a](https://github.com/plouc/nivo/commit/867a545aba2ffb6110e226c2490572011049c895))
* **website**
  *  fix responsive problems with component's tab (#722) ([ccbb4de0](https://github.com/plouc/nivo/commit/ccbb4de0211f0a166903750aac17ab5e74dade75))
  *  correct typo on line page ([0ed7eb8a](https://github.com/plouc/nivo/commit/0ed7eb8a77266f80569f8f67dd9e2f142606b631))
  *  fix storybook url config ([5c866ce7](https://github.com/plouc/nivo/commit/5c866ce7f1e2c41d6bd303debe4ef631c07c0957))
  *  fix InheritedColorControl ([862fa0bd](https://github.com/plouc/nivo/commit/862fa0bd4ea0b7a8f1abf17c87f922f76d540392))
  *  fix broken legends guide ([cc3cb0b1](https://github.com/plouc/nivo/commit/cc3cb0b15171a0d1fa7851420841adc74c2cc8d4))
  *  fix wrong title on the guides/axes page (#441) ([91eacdbe](https://github.com/plouc/nivo/commit/91eacdbe6e19ecf2ba454f8d7c0a07a35e4a5f25))
  *  use https instead of http ([07b1bade](https://github.com/plouc/nivo/commit/07b1bade670a7a7d7219f5a0aaf7849c21f23d7c))
  *  remove extra space in heatmap package name ([93077734](https://github.com/plouc/nivo/commit/93077734b6faed1beed595bff13fd8a0b16e85f2))
  *  fix legends guide ([6828c33f](https://github.com/plouc/nivo/commit/6828c33f733c39026914e7d18c2fe0b8493b3157))
  *  fix website Stream example code (#188) ([129572e6](https://github.com/plouc/nivo/commit/129572e621b7e6b246b61a0a7cccdb484bd5d31f))
* **window**  use global.window instead of window for node env ([bf1e6202](https://github.com/plouc/nivo/commit/bf1e6202d7c80310dccf2f8958cb7f8b02ab1c30))

#### Features

* **annotations**  init @nivo/annotations package ([e0dc149d](https://github.com/plouc/nivo/commit/e0dc149dc14e34c18d9816dfb769875b255123be))
* **api**
  *  fix api publication ([1ec197b5](https://github.com/plouc/nivo/commit/1ec197b58535d04a052ee7df28c818cd725e4607))
  *  move api to main nivo repo ([50245962](https://github.com/plouc/nivo/commit/5024596209bb0befb6f623d44d97f5663d881f4d))
  *  remove empty api package ([dd47b293](https://github.com/plouc/nivo/commit/dd47b293edcb07a6ed23cd0a26e29c4352ecfb3d))
* **axes**
  *  move all grid & axes stuff from core ([0b564147](https://github.com/plouc/nivo/commit/0b564147c47a08b21e9ebb34d6165a56966059ae))
  *  add support for legends to canvas implementation ([5dcebd63](https://github.com/plouc/nivo/commit/5dcebd63459a5917d82e60bacf39c7bfaff29e3a))
  *  add `tickIndex` to Axis’ renderTick method (#305) ([93b85c0b](https://github.com/plouc/nivo/commit/93b85c0b55953dfcbc639164543e83ed788fd842))
  *  improve tickValues support ([58aeaab0](https://github.com/plouc/nivo/commit/58aeaab08eb14fa1bd52f8cd045e7e01fae4306a))
  *  add onClick handler to axis ticks (#60) ([0c9efe4b](https://github.com/plouc/nivo/commit/0c9efe4bfac40bad090eb7fe74bb19164acd2859))
  *  use same code for svg & canvas ticks ([c8c693a3](https://github.com/plouc/nivo/commit/c8c693a36ec415762d3150ab2f8f80e0dadda269))
  *  add ability to rotate axes tick label ([3921c2f1](https://github.com/plouc/nivo/commit/3921c2f17a7d7da159dde7c9fb25492e12dedd48))
  *  remove stale axes components & add proper props validation ([7fc0e4de](https://github.com/plouc/nivo/commit/7fc0e4def97ce16e39069eeadce120619d74c643))
  *  add ability to disable axes transitions ([bc1be6c7](https://github.com/plouc/nivo/commit/bc1be6c7e86dbf4a0a149e1c540032cd49990b96))
  *  add more options to AxisY component ([98ac2f18](https://github.com/plouc/nivo/commit/98ac2f1890108e9d4b85f5dc1e5aa47da7382085))
  *  add AxisX component ([91399e6b](https://github.com/plouc/nivo/commit/91399e6bea18da6517789a0d76e0c0f3601b58bb))
* **axis**
  *  add support for custom tick values/count (#58) ([bd789728](https://github.com/plouc/nivo/commit/bd789728c78279d8eb5a467503e34a505cb04c54))
  *  improve axis formatting support ([69269a60](https://github.com/plouc/nivo/commit/69269a6072314cb04cb300cd55602af8ccabaf3e))
* **bar**
  *  use @nivo/colors for inherited colors ([c7cf5ce0](https://github.com/plouc/nivo/commit/c7cf5ce03f4b8ebe18554bff965159aba94a06eb))
  *  adjust legend data according to layout/mode/reverse ([0c0a6a18](https://github.com/plouc/nivo/commit/0c0a6a185f73e757d742a0d8ba41bc89fe5fc6f9))
  *  add ability to use borders with BarCanvas ([4568516e](https://github.com/plouc/nivo/commit/4568516ec4fb4d26bd71dac977a45ae9c4af4af9))
  *  add enableGridX/enableGridY/legends support to BarCanvas (#354) ([f872aaa1](https://github.com/plouc/nivo/commit/f872aaa11d51c76f2556807ca60fc43cf3bc2847))
  *  add ability to customize tooltip label ([16ae9d5c](https://github.com/plouc/nivo/commit/16ae9d5c455bad7349598d95aa746d018c2454b6))
  *  add support for layers to Bar component ([8a817ec9](https://github.com/plouc/nivo/commit/8a817ec9b632740457546aca65fb3f09c8f9ffa3))
  *  use @nivo/axes instead of @nivo/core for SVG axes ([3b22c6fb](https://github.com/plouc/nivo/commit/3b22c6fbfe553ee74e82481d7d7d443fe924a339))
  *  add ability to define grid values ([afd1ee30](https://github.com/plouc/nivo/commit/afd1ee30cc1e58a6d1dc15f75d9a1da62e8266f4))
  *  include TypeScript definition in package ([0d221c74](https://github.com/plouc/nivo/commit/0d221c747d34ba6031b3dae6e4a9d0c20821b9ca))
  *  improve custom tooltip support ([5816555e](https://github.com/plouc/nivo/commit/5816555e73021d91d8af32a4b972c2738f58c1c6))
  *  add support for legends on Bar component ([6f22a4ab](https://github.com/plouc/nivo/commit/6f22a4ab3fe02a210d686153ea7f587d302102ff))
  *  add support for border on Bar component ([7f5ac7ce](https://github.com/plouc/nivo/commit/7f5ac7ceb1880954443470767d01582f8bbbc025))
  *  improve bar components: ([640debc7](https://github.com/plouc/nivo/commit/640debc76de229261d9d9845c10aac18877578be))
  *  add label format support for Bar (#45) ([c5a63c95](https://github.com/plouc/nivo/commit/c5a63c9517d4d0cfafd07df19800f9373e8db479))
  *  add ability to define bar chart min/max value ([d9b9bdae](https://github.com/plouc/nivo/commit/d9b9bdaeff03cd16092bad47b34a0e570ce10c76))
  *  add tooltip support for BarCanvas ([946bb066](https://github.com/plouc/nivo/commit/946bb0661dad4bec32ddaa9d097f249bfb8a1bf6))
  *  add support for horizontal layout & change data format ([29a4b350](https://github.com/plouc/nivo/commit/29a4b350341c3745691509bc4f81c9eac74d36ee))
  *  add ability to customize bar labels colors ([0f63c077](https://github.com/plouc/nivo/commit/0f63c077e343a50ef0f10f25827b238366c9df5d))
  *  add support for animation on Bar component ([a099654c](https://github.com/plouc/nivo/commit/a099654c291f7660a659415a644dbfffb6e3b380))
  *  update bar chart ([05565ca8](https://github.com/plouc/nivo/commit/05565ca8e1ec5a009c81c78ebd624f751b8d1372))
* **bubble**
  *  trigger onClick when isZoomable is false (#322) ([787341ac](https://github.com/plouc/nivo/commit/787341acb2e540233e2a4b94799edcf7275c5b24))
  *  improve bubble components ([0779f335](https://github.com/plouc/nivo/commit/0779f335b235d3537256ee07ec301bc6a34405ea))
  *  add canvas support for bubble chart ([8db9a136](https://github.com/plouc/nivo/commit/8db9a1366fc53a8d0eb9dbd53bec5573e2c04ac0))
  *  fix bubble color transition ([675c6689](https://github.com/plouc/nivo/commit/675c66897f51b8b450a4d2b9f29c3985604bd38b))
  *  fix bubble tooltip id value ([615b90e9](https://github.com/plouc/nivo/commit/615b90e97759f7a1828ab35bb22f902e6ca5809e))
  *  add Bubble stories ([aba5c985](https://github.com/plouc/nivo/commit/aba5c985613a346ee3bae7a8b34c1a7f2e2ae95e))
  *  add zooming ability to Bubble components ([a231c07b](https://github.com/plouc/nivo/commit/a231c07be1791e07b190811cf34e66483cd66730))
  *  add onBubbleClick property to BubbleD3 component ([3b615080](https://github.com/plouc/nivo/commit/3b615080c7ae1192c572b6b3b207307c0640379b))
  *  add ability to center Bubble components text ([fecbc22e](https://github.com/plouc/nivo/commit/fecbc22e16255191f828bb286fc357ca7cc54eb3))
  *  rename 'root' property to 'data' ([49bffcd5](https://github.com/plouc/nivo/commit/49bffcd50a929e6cffcba7973786215e08b21809))
  *  add border support for Bubble components ([6e2f25e0](https://github.com/plouc/nivo/commit/6e2f25e0722f817993eefe8e3398daa2e1a07f22))
  *  improve Bubble components ([d0ea00b5](https://github.com/plouc/nivo/commit/d0ea00b5b0347a0e3c52b5f8b0d2289f5c25aa2b))
  *  move Bubble legends in a dedicated component ([08a7259c](https://github.com/plouc/nivo/commit/08a7259c7b56962058428158e7b379ef3e04d1b4))
  *  move Bubble legends in a dedicated component ([c54116d5](https://github.com/plouc/nivo/commit/c54116d51736860799a838c6ec9feebfa291b700))
  *  init Bubble component ([0a8a3865](https://github.com/plouc/nivo/commit/0a8a3865bb0000181f9e6e7b19dce8ea4de2cd5f))
* **build**  upgrade rollup & add esm build ([f6d64802](https://github.com/plouc/nivo/commit/f6d64802236337140289baaa96c3a3ace0acdfaa))
* **bullet**
  *  interpolate colors ([96ad5f64](https://github.com/plouc/nivo/commit/96ad5f64e8ff948885d789e16765eebf4f5677f4))
  *  improve @nivo/bullet package ([9154c51f](https://github.com/plouc/nivo/commit/9154c51f6ec327891fa062d35042f2b1a7a0dd05))
  *  init @nivo/bullet package ([dc7b37f5](https://github.com/plouc/nivo/commit/dc7b37f5509923c55a3db1e89f451aeb459ec012))
* **bump**
  *  add support for function for start/end labels ([80c3e92b](https://github.com/plouc/nivo/commit/80c3e92b322fc94d5d85ba79e6d3cc74b3210f1e))
  *  skip serie labels for missing data ([04a13a72](https://github.com/plouc/nivo/commit/04a13a728c5185a6166ba9995bb1aa07736c297e))
  *  add support for missing data to Bump component ([7275fa89](https://github.com/plouc/nivo/commit/7275fa89b8638d18e930d660cef1bbf864335959))
  *  add active/inactive state to points ([ee906f41](https://github.com/plouc/nivo/commit/ee906f41b31653d0533473e45cb8170ddc58800b))
  *  pass original datum to each point ([b4c739d2](https://github.com/plouc/nivo/commit/b4c739d2ca8f9b7c31928276c35f1b161a0e1686))
  *  add ability to use custom point component ([b29fed2a](https://github.com/plouc/nivo/commit/b29fed2a7d388a65a8e2d3fc134cb6ccb77a51e0))
  *  add support for transitions on Bump component ([9fa5019b](https://github.com/plouc/nivo/commit/9fa5019b6c427a82425a481554c3d08527d43169))
  *  add support for animation for AreaLabels ([3efe3fd8](https://github.com/plouc/nivo/commit/3efe3fd822b9b4062093081d374a500f5fe0c031))
  *  add TypeScript definitions for Bump ([eed820ad](https://github.com/plouc/nivo/commit/eed820ad8674244d564a1a08cb3cdf1e48a44708))
  *  add TypeScript definitions for AreaBump ([e70c4cd5](https://github.com/plouc/nivo/commit/e70c4cd5103e689f254a1504481a359c0978cd1d))
  *  add screenshots ([edf72cae](https://github.com/plouc/nivo/commit/edf72caedd0e582a1eda166cfb3bae834e63f429))
  *  add support for area transition for AreaBump ([4553d555](https://github.com/plouc/nivo/commit/4553d5551a154fe35916e8860cf781ba4b90cf41))
  *  add AreaBump component ([9b69845e](https://github.com/plouc/nivo/commit/9b69845e9242ce09d89aca8798645339438b19e1))
  *  init @nivo/bump package ([5501852d](https://github.com/plouc/nivo/commit/5501852db649210e6c76edb804b5fdcc00ee7b01))
* **calendar**
  *  add support for custom color scale (#703) ([484d3080](https://github.com/plouc/nivo/commit/484d30804fbba793b536625f4737ecbd261a07ca))
  *  add ability to align calendar in its container ([87cc6451](https://github.com/plouc/nivo/commit/87cc6451461c4fae477747a6e6aaade10585d0c8))
  *  add ability to add arbitrary data ([6a46b723](https://github.com/plouc/nivo/commit/6a46b723703ad4204fb484933da8878cd64489c4))
  *  add CalendarCanvas component ([96f8ac29](https://github.com/plouc/nivo/commit/96f8ac2945bcfd80d773ea23895fc7f6bf672786))
  *  add ability to define year legends position ([bf8797ae](https://github.com/plouc/nivo/commit/bf8797ae2c3e779228be2adab4a9770a7685e6cf))
  *  add ability to define month legends position ([9bc70928](https://github.com/plouc/nivo/commit/9bc70928f7c472666e2b8e023b50773765ba6fab))
  *  avoid unnecessary layout computing ([5aa0ff5d](https://github.com/plouc/nivo/commit/5aa0ff5d1664f5ea4d7507275ca6f7b05ef2f404))
  *  add support for min/max value ([e0a46f5a](https://github.com/plouc/nivo/commit/e0a46f5a7fa58727e75d81715d67db4be3bdaa92))
  *  add ability to define custom tooltip ([7a076bf3](https://github.com/plouc/nivo/commit/7a076bf370801bfb003be54f5bdfcf395cd959de))
  *  add stories ([d3b8951e](https://github.com/plouc/nivo/commit/d3b8951e964c5a6ad6bcc18a8161294591b5e67d))
  *  add ability to customize year/month legend ([a43c7082](https://github.com/plouc/nivo/commit/a43c7082ff9b921e9a4537db82dc1519f62012c7))
  *  add TypeScript definitions ([98106ab1](https://github.com/plouc/nivo/commit/98106ab1a2e7c5862b1a7977ff2ff92accd64933))
  *  add support for legends on Calendar component ([6ef9dc20](https://github.com/plouc/nivo/commit/6ef9dc20a0462e3279a50ab130bbe2902a6a85e5))
  *  add support for tooltip ([149e664e](https://github.com/plouc/nivo/commit/149e664ee8b2360353c1861637c6046624b7e186))
  *  remove support for motion and align code with other charts ([b9b47f75](https://github.com/plouc/nivo/commit/b9b47f757ff30e8b8f54c7368d891a40c99e2a3b))
  *  add onDayClick property to Calendar components ([ca947080](https://github.com/plouc/nivo/commit/ca947080b3ca8a886dcac22324c9b992e82b43b5))
  *  add ability to customize empty day color ([644cc8e3](https://github.com/plouc/nivo/commit/644cc8e333dc9fe51c4fce9dd6a9ddccbd9cd797))
  *  fix Calendar related tests ([4f358136](https://github.com/plouc/nivo/commit/4f3581362bb5746e1ddf403dcf7ba775359932d2))
  *  add ability to colorize calendar components days ([69d03562](https://github.com/plouc/nivo/commit/69d0356282b0613b4fda92dc6baa13627a1a18b7))
  *  add ability to toggle motion on Calendar component ([d8062ed0](https://github.com/plouc/nivo/commit/d8062ed0c499f19a54ede093ea74a6c9c2a95cbe))
  *  add test for Calendar component ([31eb7203](https://github.com/plouc/nivo/commit/31eb7203fab5829886520e9d8ec3d5a706519a6b))
  *  port CalendarD3 features to Calendar ([e11737db](https://github.com/plouc/nivo/commit/e11737db71676297b436a5000e37bb758e51c391))
  *  update CalendarD3 test ([4058b9f9](https://github.com/plouc/nivo/commit/4058b9f95d0fdb643cd7e8f5c6e414621d43d7f7))
  *  add legends offset properties to CalendarD3 component ([cd94e38c](https://github.com/plouc/nivo/commit/cd94e38c4569d4bf9994ded5e04522a3192f08f3))
  *  add month legend to CalendarD3 component ([49a71306](https://github.com/plouc/nivo/commit/49a71306f190805db51b271ca23ce84257ca2e70))
  *  add test for CalendarD3 component ([d9720021](https://github.com/plouc/nivo/commit/d9720021b152a680732be65b8758c15a89629136))
  *  add year legends to Calendar component ([1ef5b5e6](https://github.com/plouc/nivo/commit/1ef5b5e6e500801a9722fc89b334e5a5c51d6632))
  *  proper spacing between Calendar years ([96f9cf23](https://github.com/plouc/nivo/commit/96f9cf23ce7556814ec4f2f391b8c4a8d1070cf1))
  *  fix Calendar month path position ([88d2e81c](https://github.com/plouc/nivo/commit/88d2e81c08b76e15c0c07277ef3adc3ba6476c3e))
  *  add CalendarCanvas to readme ([d451f365](https://github.com/plouc/nivo/commit/d451f365aa363fa8564b29128d8e8a071c722120))
  *  add experimental CalendarCanvas component ([28e6e233](https://github.com/plouc/nivo/commit/28e6e233ca2c5cdf5abe5f7744f50d38ac226c14))
  *  init support for multiple years ([1bbb2b07](https://github.com/plouc/nivo/commit/1bbb2b07c44c06636a70fc0d6eddc986560a80fc))
  *  add pure React based Calendar component ([a0473e42](https://github.com/plouc/nivo/commit/a0473e42adf535e05bc9e36cea108bc1dae42469))
  *  add support for day spacing ([2acc80b1](https://github.com/plouc/nivo/commit/2acc80b18022bc20c22acee3d7b3821a10fa4681))
  *  add support for adaptive cell size on Calendar component ([9e4e8bb2](https://github.com/plouc/nivo/commit/9e4e8bb2c440a76e9edb3406b82c14169595015f))
  *  add ability to switch direction on Calendar component ([5160b435](https://github.com/plouc/nivo/commit/5160b435e1ab9f3f9d475186619a794b0714b83d))
  *  add transition staggering for days ([53cef593](https://github.com/plouc/nivo/commit/53cef593c2d836979a7a7d6e6127568399c3796f))
  *  init Calendar component ([163a4902](https://github.com/plouc/nivo/commit/163a4902945026760baae9068963bffd1641c30a))
* **canvas**
  *  add support for custom font family (#430) ([11f039e0](https://github.com/plouc/nivo/commit/11f039e0d8c2eb5a5b69b58006aa9aebcae2c787))
  *  add support for HiDPI screens ([26ebb9b7](https://github.com/plouc/nivo/commit/26ebb9b7271b6348d76ea64fd8cd4cabb29a9805))
  *  add canvas support for bar & heatmap ([94ad4d97](https://github.com/plouc/nivo/commit/94ad4d97229716a5ca6e189cd1a31b778385c977))
* **chord**
  *  improve @nivo/chord package ([51a58c11](https://github.com/plouc/nivo/commit/51a58c114b22961dcca6dfe9e52494c8336e0f22))
  *  use @nivo/colors for inherited colors ([f16f8244](https://github.com/plouc/nivo/commit/f16f8244c6b9a6445ecbb2c3db17dca0817f8b52))
  *  add support for font style for ChordCanvas ([c4f29c51](https://github.com/plouc/nivo/commit/c4f29c51408b9be6ad513d0eaf9e303ac12a19eb))
  *  add support for ribbon blendmode ([2b0cfec6](https://github.com/plouc/nivo/commit/2b0cfec62751d5bb1a17dce0b76234d86d89e295))
  *  add support for legends on Chord component ([39212ef4](https://github.com/plouc/nivo/commit/39212ef4b5516cae43b4a5a3fd7ce40d15482e1a))
  *  add source code for chord stories ([489f36fc](https://github.com/plouc/nivo/commit/489f36fc534c464a9ce234d5eb7c0183d1e5441e))
  *  add ability to customize chord borders color ([bee8de33](https://github.com/plouc/nivo/commit/bee8de334ca5f7762b0922a69bceaee1c90f843a))
  *  add labels, stories and cavans variant for Chord component ([281021bb](https://github.com/plouc/nivo/commit/281021bb671b8f7e7dc3e40ea8acd9bb84127d69))
  *  improve Chord component ([16af1340](https://github.com/plouc/nivo/commit/16af1340e85b2f21c62df9e605dd6e5bec4433ea))
  *  add Chord component ([427cf8aa](https://github.com/plouc/nivo/commit/427cf8aa1e20bb7256664a418967ca894919f7bd))
* **ci**  update travis config ([25e4cdca](https://github.com/plouc/nivo/commit/25e4cdca8cfb92d584512af03c728828b52b5b30))
* **circle-packing**  use @nivo/colors for inherited colors ([53ffed92](https://github.com/plouc/nivo/commit/53ffed924dd90d7bf0c10e7362e03d041e15f426))
* **code style**  add prettier formatting ([9a550eb8](https://github.com/plouc/nivo/commit/9a550eb85d1db2611ada36239d8d85082317f12c))
* **colors**
  *  allow plain color for ordinal scale ([b8d3abb4](https://github.com/plouc/nivo/commit/b8d3abb4bd86398193b988cc30dd98feaf365be4))
  *  use @nivo/colors for inherited colors for all packages ([e8955560](https://github.com/plouc/nivo/commit/e89555601c2f1a35009fa660e208ab2ff3bc9537))
  *  add colorIdentity support to bar & bubble ([32e61b16](https://github.com/plouc/nivo/commit/32e61b16db29926314b541125205de06bf0f26aa))
  *  init @nivo/colors package ([62644b0a](https://github.com/plouc/nivo/commit/62644b0a8375e2e308fc8d48a4742d6a6873df93))
  *  improve withColors HOC ([9e6af9b4](https://github.com/plouc/nivo/commit/9e6af9b46b40af525a5ce6192b869d17df233979))
  *  use nivo default colors id instead of value ([2a5b0757](https://github.com/plouc/nivo/commit/2a5b0757513cd3d385ee205322e28ca56851465a))
  *  improve colors generator ([8e723f13](https://github.com/plouc/nivo/commit/8e723f13adac35336d910093e08f4d5e00870268))
  *  default to given value for getColorGenerator() ([39542527](https://github.com/plouc/nivo/commit/3954252781b046629af01c038b4eef2d5b3d7dca))
  *  add defautl nivo categorical colors ([b8b8992f](https://github.com/plouc/nivo/commit/b8b8992f771ed6e7ccbe0385d1565237281d94da))
  *  add defautl nivo categorical colors ([4c5f7082](https://github.com/plouc/nivo/commit/4c5f7082f430360527b9974288030881962e7e4c))
  *  add colors config for Pie/Stack/TreeMap components ([584ff47c](https://github.com/plouc/nivo/commit/584ff47cf604215b9138d57eb7efc6e180e88e3d))
  *  add utility to generate color range from config ([657d8cc3](https://github.com/plouc/nivo/commit/657d8cc3aaeead3149fc95effc85c9f0940a2d91))
  *  improve colors config ([330356a6](https://github.com/plouc/nivo/commit/330356a6997da73b4adb210761b72486fb7f7664))
  *  add smart declarative color management ([c4fb5330](https://github.com/plouc/nivo/commit/c4fb533088769208b0ff89e030d7e3496c6de4e7))
* **commands**  sort Makefile help ([4f7a872c](https://github.com/plouc/nivo/commit/4f7a872cb54c835235e0804482b516a24461e290))
* **components**  fix components display name ([84aa832d](https://github.com/plouc/nivo/commit/84aa832da4d26c55e7920e3e3ad740437f124eea))
* **container**  add ability to disable interactivity ([73a33f92](https://github.com/plouc/nivo/commit/73a33f92f66f0ea9488843ec13924458f3dac7ca))
* **core**
  *  allow string format spec in BasicTooltip ([8b382dc3](https://github.com/plouc/nivo/commit/8b382dc3d4c7eb6b75ee0b843a2b58a9c8627862))
  *  remove enclosing div from container if non interactive ([149ed0f8](https://github.com/plouc/nivo/commit/149ed0f86e08ff14d2ae6b6b2e8af5c81fcddf2a))
  *  fix prop wraning when using markup for axis legend ([4152c090](https://github.com/plouc/nivo/commit/4152c0906849aa53ef4fa311aa2a66a16402e9d8))
  *  add support for string or number keys on bar/line and pie ([953c572e](https://github.com/plouc/nivo/commit/953c572eb2ea8986b5599545bb23387202819356))
  *  remove packages directory prefix ([262a8ee9](https://github.com/plouc/nivo/commit/262a8ee96bb870fe388e64d1453248aed94bf445))
  *  use yarn workspaces ([36999cc2](https://github.com/plouc/nivo/commit/36999cc216eb9d3e33f73111424e63d23143c17d))
* **d3**  use caret range instead of fixed version for d3 deps ([9598511c](https://github.com/plouc/nivo/commit/9598511c8f185cfe7778c6bbde2c8b686f18006a))
* **defs**  init support for svg gradients/patterns ([cd4c1663](https://github.com/plouc/nivo/commit/cd4c16635f94924a0ff82772ce91d083df94b4f2))
* **demo**
  *  add command to deploy demo website + storybook ([e2f5c581](https://github.com/plouc/nivo/commit/e2f5c5817765a2e6b35dce070f89b84110ef7a28))
  *  remove unused deps ([eaff4d8b](https://github.com/plouc/nivo/commit/eaff4d8bf183dcd3c5f9251cab3723e17765f42c))
* **deps**
  *  upgrade deps ([be6e96e4](https://github.com/plouc/nivo/commit/be6e96e414349df5a000de31725ad791a6b3f831))
  *  upgrade deps ([3f4b4294](https://github.com/plouc/nivo/commit/3f4b4294cb3ad84a351cb4f50c4b60b39ffd88cc))
  *  use yarn with lerna & add missing yarn.lock files ([42675e47](https://github.com/plouc/nivo/commit/42675e47042d4bacf2edb3860f66a5a1971079e3))
* **dev**  add commands to list/rm currently linked packages for website ([df1d3085](https://github.com/plouc/nivo/commit/df1d3085e7214786948e0f9edcfaaf05327ef566))
* **dots**  add ability to define custom dot symbol ([da49e15f](https://github.com/plouc/nivo/commit/da49e15fb0c9706fdbbe8baff82148906451f614))
* **examples**
  *  upgrade examples dependencies ([e07f58f3](https://github.com/plouc/nivo/commit/e07f58f3d9e8f325762c09936eb27cdace94fe77))
  *  add Bar live update example ([26dc32a8](https://github.com/plouc/nivo/commit/26dc32a8c423044542373b97e99f8a17c8590fa8))
  *  upgrade retro example deps ([203f7198](https://github.com/plouc/nivo/commit/203f719840a0f0287542567e2ca4bec8de08a5a5))
  *  ensure examples build successfully on CI ([2ad46b7a](https://github.com/plouc/nivo/commit/2ad46b7af65fdcb7a3bb63d76327e3742e846776))
  * fix retro example dependencies ([2c84d014](https://github.com/plouc/nivo/commit/2c84d014c0ad88d1574f8ec5552cd837316a4371))
* **generators**
  *  use @nivo/generators instead of nivo-generators ([e65976d8](https://github.com/plouc/nivo/commit/e65976d83c714da8e16b92ca6b76ff15f47b42f4))
  *  update nivo-generators ([ada44cf7](https://github.com/plouc/nivo/commit/ada44cf79cc7edcdf35a8a97aef8d1d92b1564b9))
* **geo**
  *  update choropleth screenshots ([c2f64eac](https://github.com/plouc/nivo/commit/c2f64eac104205e888626adfc6e852743515f096))
  *  add legend support to choropleth components ([bb7a0a2e](https://github.com/plouc/nivo/commit/bb7a0a2ef65c0e9a0f6b47d33281f7fcd6499cfc))
  *  add TypeScript definitions ([d818a665](https://github.com/plouc/nivo/commit/d818a66555a91c7bdf5e80f71ea0dc559707d997))
  *  add abillity to customize label & format value ([ef499799](https://github.com/plouc/nivo/commit/ef49979962609091ef404839524e2fb278bf839b))
  *  migrate to react hooks ([9c5f1879](https://github.com/plouc/nivo/commit/9c5f18798e958abd8902be721a86a852ea2b4d1e))
  *  add support for projection translation/rotation ([a78b293a](https://github.com/plouc/nivo/commit/a78b293ad9e81b70920d83b8a5478f059cfd9fc1))
  *  add charts' icons ([54c00402](https://github.com/plouc/nivo/commit/54c00402bd40fb0148eabeb88c23a3a8c7e8490b))
  *  init geo package ([119b9e98](https://github.com/plouc/nivo/commit/119b9e985026deb72ce69441e3edfc17a6e6db4f))
* **heatmap**
  *  use @nivo/axes package for axes ([36cd9c7b](https://github.com/plouc/nivo/commit/36cd9c7b265f708b4a0a64a0244b2748d6ee58e4))
  *  include TypeScript definition in package ([868620eb](https://github.com/plouc/nivo/commit/868620eb2642aff5abbdac2dabb826a6b0f199dc))
  *  init TypeScript definitions (#198) ([6c5432db](https://github.com/plouc/nivo/commit/6c5432db7b1420bad94f6d7afe2931a67f6c7e0e))
  *  add support for onClick event ([52d077c7](https://github.com/plouc/nivo/commit/52d077c718f3ca039737de13a19920625e9effde))
  *  add tooltip support for HeatMap ([28077c58](https://github.com/plouc/nivo/commit/28077c58706d97a4b0700a7d71cd4fb66d35f43f))
  *  add hover behavior on HeatMapCanvas ([37974a91](https://github.com/plouc/nivo/commit/37974a91a280293ec7216687caafa14c815f49a4))
  *  add tooltip support for HeatMapCanvas ([db579a16](https://github.com/plouc/nivo/commit/db579a16cd8c380b368bfa1fd3674eb5eb9c8109))
  *  add HeatMap component ([425afdaa](https://github.com/plouc/nivo/commit/425afdaaa9e4c443316a551c690c208cc6385be7))
* **hierarchy**  add withHierarchy() HOC ([99c2f789](https://github.com/plouc/nivo/commit/99c2f789b18450b58e05104c503708c33c7f6fc5))
* **interactions**  add support for mouseenter/leave on bar, pie & scatterplot svg (#280) ([76c8722b](https://github.com/plouc/nivo/commit/76c8722bb90d947b1933bb00344a0bb606605159))
* **interactivity**
  *  add onClick support for Sankey (#75) ([a547917c](https://github.com/plouc/nivo/commit/a547917c721018b23d7a853368535cec9950cbfc))
  *  add onClick support for Bar & Bubble ([a73af167](https://github.com/plouc/nivo/commit/a73af1679debb0211b73c1af814f28ccfb1a4ba7))
  *  add isInteractive property on multiple components ([16b7f4df](https://github.com/plouc/nivo/commit/16b7f4dfffe56b8936104c411b2e3e62c5b47e11))
* **labels**  use alignmentBaseline instead of approximative dy ([10aa40fe](https://github.com/plouc/nivo/commit/10aa40fed76897e685bec28ea7947b6920a9cc1a))
* **legends**
  *  pass id property to symbolShape (#687) ([289e9049](https://github.com/plouc/nivo/commit/289e9049f7dad19147ef002fcd3ca2a22c1fd9f2))
  *  add support for both color and fill ([4cb33e25](https://github.com/plouc/nivo/commit/4cb33e25b12084932cd749b3e74f6f8789adbe80))
  *  add documentation for custom symbol shape ([7adc8381](https://github.com/plouc/nivo/commit/7adc8381728f53e4a392d5a8e1574cc469c769ba))
  *  add test for custom symbol shape support ([50b2d39c](https://github.com/plouc/nivo/commit/50b2d39c5bd7933f88e6fa296460c7afc311b7de))
  *  add support for custom symbol shape ([7419c912](https://github.com/plouc/nivo/commit/7419c912da7b936b1cc8eeb4d8188f11e752125e))
  *  add support for basic interactivity ([527b1fa7](https://github.com/plouc/nivo/commit/527b1fa738e267d05932e2914b52747ebda8d7fc))
  *  add default text color + canvas support for text color ([20a30ab8](https://github.com/plouc/nivo/commit/20a30ab8a795d359b6e6b1eeb0a2194780c4cb20))
  *  init legends package ([4063428b](https://github.com/plouc/nivo/commit/4063428baa626dd2e0810b830ca4cf6e5cde3b5a))
* **lerna**  exclude demo & examples from lerna ([aa255ebf](https://github.com/plouc/nivo/commit/aa255ebf94cfbdf7d997ad48e6edbaaaf54657f3))
* **line**
  *  add option to format x/y values in tooltip (#731) ([f92abbed](https://github.com/plouc/nivo/commit/f92abbed0192a92f5bf98e559cbd29ad87f654fb))
  *  update TypeScript definitions ([c034393a](https://github.com/plouc/nivo/commit/c034393ac00baffe770b1cfda7fb7e58e3d3776e))
  *  add missing types (#605) ([f8562008](https://github.com/plouc/nivo/commit/f856200873324f08a8b317a1223834f0167063e4))
  *  finalize first version of LineCanvas ([bd008153](https://github.com/plouc/nivo/commit/bd008153c80295d0f0c719c30b318b940d2559dc))
  *  fix slices spacing & add support for y axis ([d56881b8](https://github.com/plouc/nivo/commit/d56881b82f5fa480830f3dcb4d22645337f9008d))
  *  add canvas implementation ([d47d5cb1](https://github.com/plouc/nivo/commit/d47d5cb1f164cf930c70d71a305af2c701643871))
  *  use @nivo/colors for inherited colors ([1347fd82](https://github.com/plouc/nivo/commit/1347fd825d4ac82517ec8e7ad2ea9a04c4f23d52))
  *  add support for gridXValues and gridYValues (#391) ([fd49e83d](https://github.com/plouc/nivo/commit/fd49e83df001d358187bae513eac8d9fc69957d4))
  *  add support for layers to Line component ([35911df3](https://github.com/plouc/nivo/commit/35911df3bebc2d4fc824e5d4e9fe38915ce5b6de))
  *  add support for mix-blend-mode on areas ([c434148f](https://github.com/plouc/nivo/commit/c434148f50302bffba4d3dbdb042426ea6c968fd))
  *  add typescript definitions ([cfa6a59c](https://github.com/plouc/nivo/commit/cfa6a59c87ccfd41c6069837ff72150e8440daf5))
  *  fix line slices for time scales ([82e03d3a](https://github.com/plouc/nivo/commit/82e03d3a593b34a26ca2c2ebc1b6a97eb98ab5f7))
  *  compute slices from scales package ([31c06c0f](https://github.com/plouc/nivo/commit/31c06c0fdf1a1d45d4f0a0419d7a3b994f3f263e))
  *  add story about negative values highlight ([b425e35f](https://github.com/plouc/nivo/commit/b425e35f6ff5061023b77b1d8d41b1e118b18d75))
  *  init linear & time scale support ([3bce793a](https://github.com/plouc/nivo/commit/3bce793adc04c4cf49978517057bd47ea5359f4c))
  *  add ability to specify grid X/Y values ([b44c8543](https://github.com/plouc/nivo/commit/b44c85437e8ccd204a266e830427f0527c5b77b5))
  *  add support for custom tooltip ([39fad124](https://github.com/plouc/nivo/commit/39fad12421f3b06be830da13d2efdbfccfff2e96))
  *  add support for legends on Line component ([b7cc2449](https://github.com/plouc/nivo/commit/b7cc2449dc068e53e1449e7c04f09af7ebe8c624))
  *  fix wrong prop type ([df4ac4ea](https://github.com/plouc/nivo/commit/df4ac4ea4df3732469fc7fbe67d2eb6ee67585e0))
  *  new prop enableArea was added to Line chart (#82) ([6958db18](https://github.com/plouc/nivo/commit/6958db184f009fc8df339d1cab08b09af17eab29))
  *  part of a line with missing data was hidden (#81) ([60e47746](https://github.com/plouc/nivo/commit/60e47746cf4aaafb0773b46ee1a79990aa0b9950))
  *  add ability to customize line width ([8cb88477](https://github.com/plouc/nivo/commit/8cb88477b20af6fd00168099cb043f9cf05ce438))
  *  add ability to define min/max Y value ([2bd2554f](https://github.com/plouc/nivo/commit/2bd2554f2f8faeccc6f4a8ea04112e0489eeecae))
  *  restrict allowed curve interpolators ([7c332acd](https://github.com/plouc/nivo/commit/7c332acdb4a6c536e62a0d063eaa7377d50c0819))
  *  avoid re-rendering tooltip on mouse move for line chart ([1b0d5052](https://github.com/plouc/nivo/commit/1b0d50525d709413517a2575cb76e9956368abb1))
  *  add ability to disable stack tooltip on line chart ([732d1704](https://github.com/plouc/nivo/commit/732d1704a0267ebe8fe08fece847ee6a87711a72))
  *  add support for tooltip on line component ([ccdb2e67](https://github.com/plouc/nivo/commit/ccdb2e6779e11520c5ec668540398638664df4d7))
  *  add ability to animate line chart lines ([1918772f](https://github.com/plouc/nivo/commit/1918772f1764ca9d819ecbbc3e917dce978fe977))
  *  improve Line component ([63ee809f](https://github.com/plouc/nivo/commit/63ee809fdb4bd822a1c73ec342a6bbc41d7e2423))
* **lint**  centralize lint command & config ([e8e38da4](https://github.com/plouc/nivo/commit/e8e38da4a0f20e0a9f07606ab36853fdab4d44ed))
* **linting**  add eslint on several packages ([38ba981d](https://github.com/plouc/nivo/commit/38ba981d5c2a1411367ca326c7b449a9685135ea))
* **markers**
  *  add support for markers on Line & Bar charts ([e36a7a2b](https://github.com/plouc/nivo/commit/e36a7a2bd2616bc4e4c2a4a927dfb14299ee9d4c))
  *  improve radar & line charts markers ([18c43473](https://github.com/plouc/nivo/commit/18c43473bb28764c4515dc12a9a8bf24f55e5b41))
* **network**
  *  add TypeScript definitions ([f2d4ec39](https://github.com/plouc/nivo/commit/f2d4ec39eb950799161565749615715dd17c5966))
  *  add separated node and link components ([a54ac593](https://github.com/plouc/nivo/commit/a54ac593cf59f412780d0ae3967d71610b26bd0c))
  *  init network package ([2ea85816](https://github.com/plouc/nivo/commit/2ea85816dad1653d1258158d03b24ff3081b5262))
* **packages**
  *  use rollup for packages build ([f24cb08d](https://github.com/plouc/nivo/commit/f24cb08d8a8eb2feecb858fb41875ac99b782db0))
  *  add command to deploy all packages ([7467315c](https://github.com/plouc/nivo/commit/7467315c5e191d0876e0938ae9c6b8b95846d118))
* **parallel-coordinates**
  *  add support for individual axis options ([b8a39070](https://github.com/plouc/nivo/commit/b8a39070024450377314d21b27f11ceaaf623c17))
  *  init package ([5a4db6ca](https://github.com/plouc/nivo/commit/5a4db6cad3c00601ad6161adb54cf8a4c5891ff3))
* **pie**
  *  use @nivo/colors for inherited colors ([a217ab8f](https://github.com/plouc/nivo/commit/a217ab8f81fe84dadc807dc9e075aa09573a8511))
  *  adjust website & docs ([8f22f893](https://github.com/plouc/nivo/commit/8f22f893ac230090b188e896a06fdf632b157a2c))
  *  improve pie components ([eb14f0cb](https://github.com/plouc/nivo/commit/eb14f0cb165b72ed1e2e19c2c03ce68cc4e4d8de))
  *  cleanup website PieCanvas demo ([31ef9e53](https://github.com/plouc/nivo/commit/31ef9e5371b508181d9dbf2a28d104f540973b2d))
  *  init support for start/end angle + PieCanvas ([52f6a9e1](https://github.com/plouc/nivo/commit/52f6a9e140937d8407cfe0af2c98749a514a5fad))
  *  add support for custom tooltip ([d3734428](https://github.com/plouc/nivo/commit/d3734428cee364f4eb67af5c0f4c572b9973dc31))
  *  include TypeScript definition in package ([04fc931e](https://github.com/plouc/nivo/commit/04fc931e032710fe245e4327eb525af15cde3c74))
  *  add TypeScript Definitions for Pie component ([0def4c31](https://github.com/plouc/nivo/commit/0def4c3141c869e309366730c26c28070ec143e6))
  *  add support for onClick event ([b171044e](https://github.com/plouc/nivo/commit/b171044e25e25297e0f3714b5121dd24c21d86f8))
  *  add support for legends on Pie component ([8c3004be](https://github.com/plouc/nivo/commit/8c3004bea9ca8e9315f4ce8c8c37e697a20db7a2))
  *  add ability to use default dataset order (#79) ([f4a261d3](https://github.com/plouc/nivo/commit/f4a261d34d8d41cce5688bc52cc5753f96322c19))
  *  add pie stories ([a123c899](https://github.com/plouc/nivo/commit/a123c899edb772fc2a49998f1f134925d6882c75))
  *  ad ability to skip label if slice angle is lower than given value ([c0aecaa2](https://github.com/plouc/nivo/commit/c0aecaa2bc141ee2d18e850b66c7888a9069cfdd))
  *  restore Pie chart ([7eb85964](https://github.com/plouc/nivo/commit/7eb8596408e9cc0d40ffddc8c0b3fc35119e4b1d))
  *  update Pie component css classes ([d1042d8f](https://github.com/plouc/nivo/commit/d1042d8fc3f9ff6e6981d7ae6842bcb74defe230))
  *  animate pi column legends ([1580b16c](https://github.com/plouc/nivo/commit/1580b16c17e8946ad10b96d298854c199fc1a3a5))
* **publish**
  *  add cleanup rollup plugin ([0c707e61](https://github.com/plouc/nivo/commit/0c707e61c3447eaec8e80121e3c02317d9bdf445))
  *  add packages build prior to publish ([c6f9810b](https://github.com/plouc/nivo/commit/c6f9810b69c776ad0f193eb3ac28e64b7fe05422))
* **radar**
  *  pass key to tooltip format function (#587) ([cca8a9e9](https://github.com/plouc/nivo/commit/cca8a9e98b2cf3a475b81fa8fe786a9082a941a2))
  *  add blend-mode support ([e46b10c9](https://github.com/plouc/nivo/commit/e46b10c9e0fab13ab644b1f7f5dbbf1dc55247a4))
  *  improve @nivo/radar package ([96e60be0](https://github.com/plouc/nivo/commit/96e60be0d2ed4bcfcd168b9df878d33b13cb5d5d))
  *  use @nivo/colors for inherited colors ([4686b2bf](https://github.com/plouc/nivo/commit/4686b2bfa763410c55a9c67c1768dbf975a7d995))
  *  add ability to customize label ([03b3640b](https://github.com/plouc/nivo/commit/03b3640b6aee3158e88d66868be099f16ba6e8f3))
  *  add ability to define max value ([880d7299](https://github.com/plouc/nivo/commit/880d7299c85ee7a151105773b4cd2d7566649f9f))
  *  add support for legends on Radar component ([8d53e13b](https://github.com/plouc/nivo/commit/8d53e13bb5b5f54b6fbfecbc453f7c5245337a03))
  *  add support for tooltip on Radar component ([acd9a4f9](https://github.com/plouc/nivo/commit/acd9a4f9efdaf8ae801f1b70ea469745cdd3ecdb))
  *  simplify radar data format ([d56a9441](https://github.com/plouc/nivo/commit/d56a94416f53d2f1a86d80ae771866dd629557cb))
  *  add radar chart ([b0739b96](https://github.com/plouc/nivo/commit/b0739b96bb978bf6145a7752ff9d1da77e4918a9))
* **react**
  *  nivo now require react >= 16.2.0 < 17.0.0 ([f64d3ef6](https://github.com/plouc/nivo/commit/f64d3ef6026438e4af29f436b27c46f00f9feae7))
  *  update required react version ([4b4865fc](https://github.com/plouc/nivo/commit/4b4865fcfd00eb29e43f8e61b8fa74c6485dd861))
* **readial-stack**  add RadialStack component ([3fbebe52](https://github.com/plouc/nivo/commit/3fbebe5228b4edd8071f630250ed44e33d88299a))
* **sankey**
  *  add support for layers to Sankey ([842ae0df](https://github.com/plouc/nivo/commit/842ae0df00c239dac526d148645841027bd60552))
  *  adjust labels for vertical layout ([e12cdf15](https://github.com/plouc/nivo/commit/e12cdf15d326c2989b277d90b63ff7af478e9d08))
  *  add support for vertical sankey ([e299590e](https://github.com/plouc/nivo/commit/e299590e729db12a892b1fe8401ccf046f8e11b8))
  *  use more neutral properties for layout support ([e0a56eb6](https://github.com/plouc/nivo/commit/e0a56eb6920e291cb86dc9071568f22aea3a8b64))
  *  move computing out of the rendering component ([a0c29fe4](https://github.com/plouc/nivo/commit/a0c29fe4fb57d36e2769902ccaacce5a8ceecdb6))
  *  improve support for nodes sorting ([f63450fa](https://github.com/plouc/nivo/commit/f63450fa95c05ea5d8c31b44081e4ca91129b4de))
  *  add ability to sort nodes (#401) ([fed5fc4b](https://github.com/plouc/nivo/commit/fed5fc4b81b7b97118e22d8c186f37ed6af23995))
  *  decouple node coloring and link coloring (#404) ([c793ffd1](https://github.com/plouc/nivo/commit/c793ffd1bddd89745d3219fd8132c16ebf53807f))
  *  add TypeScript definitions ([c2a9d38b](https://github.com/plouc/nivo/commit/c2a9d38b20ee1ce30b0c2a8e0d9fb30d0f8b3534))
  *  add gradient & blend mode support for links ([27d56050](https://github.com/plouc/nivo/commit/27d56050a0ad98d2504275900daccdf25627598e))
  *  add support for legends on Sankey component ([0082fb98](https://github.com/plouc/nivo/commit/0082fb98a6e310ee15ebafb8f220133c8466e7f3))
  *  Support complete configuration of the tooltips (#78) ([f3aecf6c](https://github.com/plouc/nivo/commit/f3aecf6c91a078af8f748613aaa1e79c820b5526))
  *  Support configurable labels (#77) ([5ac962b1](https://github.com/plouc/nivo/commit/5ac962b1eb60982a99726b1b2909bb233281999c))
  *  improve sankey interactivity ([27a5ff54](https://github.com/plouc/nivo/commit/27a5ff54ff5c223afec2fb225b7105f7065ece1c))
  *  improve Sankey diagram ([aa5c8471](https://github.com/plouc/nivo/commit/aa5c84711d9653e6b1f24ea6346f2833344cf958))
  *  add support for label on Sankey diagram ([b90de33a](https://github.com/plouc/nivo/commit/b90de33ad818f86a0ed1a6af24bed831c221834c))
  *  add sankey diagram component ([f358d2f9](https://github.com/plouc/nivo/commit/f358d2f9709555833fd9ca550b5c0a2f30c63f3b))
* **scales**
  *  add ability to reverse linear scale ([2f4ddc47](https://github.com/plouc/nivo/commit/2f4ddc478939acf4fee3fa37ff59a80f44a4b61b))
  *  add support for log scale (#378) ([971925f8](https://github.com/plouc/nivo/commit/971925f89fe67f02dc3ab5e2be601bf4666d273b))
  *  improve time scale support ([614038e4](https://github.com/plouc/nivo/commit/614038e494bf935ffe601f0571a91e2ca4008e7b))
  *  init scales package ([4324706d](https://github.com/plouc/nivo/commit/4324706d07db77fdad25db23ab7e77eb54ae1f40))
  *  improve XYScales component ([f69dc5ac](https://github.com/plouc/nivo/commit/f69dc5acaa213c38297b9d5581a5408c21c06b0c))
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
  *  set pointer as 'normal' not crosshair (#402) ([29848b87](https://github.com/plouc/nivo/commit/29848b878429814cc9a2c7348172a9eb4f80d46a))
  *  add support for layers to ScatterPlot component ([f3a5a842](https://github.com/plouc/nivo/commit/f3a5a84259d0103193a766d610a517e7527c63e3))
  *  add ability to use a mesh to capture interactions ([ff9399fa](https://github.com/plouc/nivo/commit/ff9399fa1d0a88a8ad696f74257b82f07d6a50a2))
  *  add scatterplot typescript definitions ([22c930d0](https://github.com/plouc/nivo/commit/22c930d0f26718a026ce06ceaa1735548efa7677))
  *  improve scatterplot ([4ae6591d](https://github.com/plouc/nivo/commit/4ae6591d47b85edc210c50d99cdf2280611ca479))
  *  remove unused min/max x/y ([efbda0fb](https://github.com/plouc/nivo/commit/efbda0fb54cf6b7a6c42537a6ec813975805571b))
  *  add tests and stories ([bbc03444](https://github.com/plouc/nivo/commit/bbc03444a1ecc69a49273c695bb37b53473fc6af))
  *  add support for tooltips on ScatterPlotCanvas ([42a17314](https://github.com/plouc/nivo/commit/42a17314fe299f14a0e2eee3a84e492da1d9099b))
  *  add scatterplot package ([52fab5f9](https://github.com/plouc/nivo/commit/52fab5f98dcda403df46dc2565b8f7bfd4863472))
* **scatterplot-markers**  add markers to scatterplot SVG (#287) ([d7192461](https://github.com/plouc/nivo/commit/d71924612f3c5a141defd06e5eab0d2487791403))
* **shapes**  add ability to define custom data accessors ([17a555d3](https://github.com/plouc/nivo/commit/17a555d373555d00bb37b35607f495b543126353))
* **split**  init multi packages ([158a349d](https://github.com/plouc/nivo/commit/158a349d2ba8e9e017486e32fc89baa4e5c0c0a3))
* **stack**
  *  make line areas stack in front of each other visibly #152 ([8ec91a66](https://github.com/plouc/nivo/commit/8ec91a66e3c3140c9176b52384a4603582545930))
  *  rename StackDots to StackSlicer ([69256abb](https://github.com/plouc/nivo/commit/69256abbecc9a1216dde9c19a3fe9e2a4c4539f9))
  *  add lines to StackDots ([475b78bc](https://github.com/plouc/nivo/commit/475b78bc69de1717321e277153af1eb2e85dd84c))
  *  add StackDots component ([fa879a05](https://github.com/plouc/nivo/commit/fa879a05e6cd206371e75e3652642e6750262b9c))
  *  add ability to configure Stack offset ([50d2fdbc](https://github.com/plouc/nivo/commit/50d2fdbc659af9287efd599bbb1061359cf4e826))
  *  add Stack component for d3.layout.stack ([7122dca5](https://github.com/plouc/nivo/commit/7122dca5b2aa44664c684646839cf5e1dc616f3f))
* **stack-filters**
  *  fix areas z-index + seamless areas transitions ([f797073f](https://github.com/plouc/nivo/commit/f797073f64c1974623b009c7b2d92829834ce2df))
  *  init stack layers filtering ([4d21f331](https://github.com/plouc/nivo/commit/4d21f33142d7bd92e36deb28b8dc069d1778df99))
* **stack-slicer**  split dot and line related properties ([fad06c7a](https://github.com/plouc/nivo/commit/fad06c7a7a301820d7d320d794acdefa74585e36))
* **storybook**
  *  upgrade storybook ([670d22df](https://github.com/plouc/nivo/commit/670d22df060bc56533044a7ae4e9e2aebc5d02ca))
  *  improve components stories ([d29d21f4](https://github.com/plouc/nivo/commit/d29d21f483ae8761ba3abcf6cc0314b5012cb553))
  *  update Bar storybook ([b5c39f70](https://github.com/plouc/nivo/commit/b5c39f70e657cef909ccedd20cd0986a22d1c82a))
  *  add ability to publish storybook to gh-pages ([b5bfda27](https://github.com/plouc/nivo/commit/b5bfda275b323d46d4504f897874ce60d496157b))
  *  init storybook ([e056aa09](https://github.com/plouc/nivo/commit/e056aa09f7a11636855c01e1ab416d35991a6d8b))
* **stream**
  *  add TypeScript definitions ([87c762cc](https://github.com/plouc/nivo/commit/87c762cc2a73eb31f54dc034523c40039ae98214))
  *  add support for dots ([4860ef53](https://github.com/plouc/nivo/commit/4860ef5307af2a63662e3062cf2beef2e9286b42))
  *  add info about stories ([4f98124c](https://github.com/plouc/nivo/commit/4f98124c5fca3fad59f7292366a4628925e387f8))
  *  add support for legends on Stream component ([79395355](https://github.com/plouc/nivo/commit/79395355ec117fb1dc10b567ea4373be11507126))
  *  add border suppport ([5eabc451](https://github.com/plouc/nivo/commit/5eabc451e9e8e5bd16058812f6d3a515d74b2b6b))
  *  add stack tooltip on stream chart ([2e67e448](https://github.com/plouc/nivo/commit/2e67e448563727a2144a92aab4278817210f4b9f))
  *  add stories on stream chart ([751d4428](https://github.com/plouc/nivo/commit/751d44286e5d58cd5dae3e799ccc7086eb65df38))
  *  add support for tooltip on stream chart ([c3a997be](https://github.com/plouc/nivo/commit/c3a997be2fd0fa2bdd5c166586377c65247a498d))
  *  init stream chart ([060142e6](https://github.com/plouc/nivo/commit/060142e6c67a2f4c16fcc6e6e8030c2ddf724c4d))
* **sunburst**
  *  use @nivo/colors for inherited colors ([9cb6b2af](https://github.com/plouc/nivo/commit/9cb6b2afca6839322925f0c4a1e3eacfdf4d696a))
  *  allow independent child colors (#463) ([2525ad11](https://github.com/plouc/nivo/commit/2525ad11fa6bbec6d03e2b814df4e526c5a8ea67))
  *  add Sunburst component ([a8c872a9](https://github.com/plouc/nivo/commit/a8c872a91e694721bb8a391483f9f0d9e4a15eff))
* **swarmplot**
  *  add support for border color ([de3e8b3a](https://github.com/plouc/nivo/commit/de3e8b3a081a9b18ee81c07934632e9b08000e66))
  *  add ability to use custom tooltip ([83f965ad](https://github.com/plouc/nivo/commit/83f965ad4d6b7007d3224202924acdddd5a0d4c5))
  *  add support for voronoi overlay) ([4b0bcb96](https://github.com/plouc/nivo/commit/4b0bcb960004942b2af6647d249ac10b86cd3101))
  *  init @nivo/swarmplot package ([eb593954](https://github.com/plouc/nivo/commit/eb5939540d0bb73ac0af4034049253e03bcb1b7f))
* **tests**
  *  centralize test command & dependencies ([eda819ca](https://github.com/plouc/nivo/commit/eda819ca03f3abfae50a5f21a9f7a8af5dcb562c))
  *  restored existing tests ([e4cf806f](https://github.com/plouc/nivo/commit/e4cf806fc42977cd717b419b13aba36cb24aae0f))
* **theming**
  *  add ability to theme crosshairs ([f03848f6](https://github.com/plouc/nivo/commit/f03848f6ff08d5cc73638b6cc16a7c3fde7e9eda))
  *  improve theming ([95dd0603](https://github.com/plouc/nivo/commit/95dd0603f29b7b0109dce7c03e2af27dc0f7779b))
  *  improve theming ([0040bb38](https://github.com/plouc/nivo/commit/0040bb38e0f5efe339ab7e96ea4c7025984bcdfe))
  *  improve theming ([c7e7a9fe](https://github.com/plouc/nivo/commit/c7e7a9fe77eaf65abc1e450e1d2ce7d1b98acda9))
  *  fix tooltip theming ([9385dd67](https://github.com/plouc/nivo/commit/9385dd67ed8ec1d55ef12a84328b831be701edc2))
* **tooltip**
  *  add simple fix to keep the tooltip inbounds (#631) ([395fc5e7](https://github.com/plouc/nivo/commit/395fc5e7611971fd6a2d413b3e1b5b03e096c3e5))
  *  move Chip style to theme (#589) ([343e38c5](https://github.com/plouc/nivo/commit/343e38c5eb663ee0029a95c21c7dc5d93472ab35))
  *  prop to format values in tooltip was added (#69) ([0dfafff5](https://github.com/plouc/nivo/commit/0dfafff544ceadc4253ab3a05170709a3724152c))
  *  improve positioning ([288657c7](https://github.com/plouc/nivo/commit/288657c7303af675077937f276ced26c38fe3003))
  *  add support for tooltip theming ([72f2f751](https://github.com/plouc/nivo/commit/72f2f751318323f2431641c970680db5d9c8f251))
  *  improve tooltip with global component ([631265d2](https://github.com/plouc/nivo/commit/631265d26ff6384c3fe8846fee2643897111a081))
  *  add support for tooltip on pie & bar charts ([abbd801d](https://github.com/plouc/nivo/commit/abbd801d68ed0fb66b7338769113e73e14814ee7))
* **tooltips**
  *  improve bar & stream tooltips ([698585fc](https://github.com/plouc/nivo/commit/698585fcf9c6fcb4d2bc93fc9c384e7bd7221793))
  *  add support for custom tooltips for bubble charts and treemaps (#200) ([092f3e0c](https://github.com/plouc/nivo/commit/092f3e0c5253d2ca66ce53b028c918953c08f97d))
  *  add support for configurable tooltips for bar charts and heat maps (#159) ([82473c10](https://github.com/plouc/nivo/commit/82473c10553e976b6e9d14c9e51d4093a3af510c))
* **treemap**
  *  use @nivo/colors for inherited colors ([4b5e65b6](https://github.com/plouc/nivo/commit/4b5e65b682e1b3d19115279427193aa9db100af2))
  *  add TreeMapCanvas component ([e12a1268](https://github.com/plouc/nivo/commit/e12a1268e955442d6ba04f4e3921488c6830debc))
  *  remove placeholders and improve svg & html flavors ([ff3734da](https://github.com/plouc/nivo/commit/ff3734da80e3396ec9cc00f477e13bfce83f1863))
  *  add support for tooltip on TreeMap components ([755783d8](https://github.com/plouc/nivo/commit/755783d880e73e5b74a0045fc2a467e97e2d72f8))
  *  get rid of data nesting when using animated treemap ([507dcb64](https://github.com/plouc/nivo/commit/507dcb646a1211af60a94aaf97db33749c0beef1))
  *  add SVG based TreeMap ([de08c6b6](https://github.com/plouc/nivo/commit/de08c6b6e192801d8633e503e4dc478a004bc628))
  *  fix TreeMapD3 nodes exit ([9e02da4e](https://github.com/plouc/nivo/commit/9e02da4ec7553efc9a329cdc08e646469dbdf062))
  *  add TreeMap component ([d88e328f](https://github.com/plouc/nivo/commit/d88e328fedff7b42220208f3d16cb9ea1d40cea4))
* **umd**  git ignore umd builds ([58f03a59](https://github.com/plouc/nivo/commit/58f03a59a365a574fdac214d1470d670829ee268))
* **voronoi**
  *  add TypeScript definitions ([b98f65ae](https://github.com/plouc/nivo/commit/b98f65ae9cd84c1290da16a89a6cdd5ba3c2a045))
  *  add support for layers ([c16ae70d](https://github.com/plouc/nivo/commit/c16ae70d455ccdae2fe28e4df9141f98ddcbc97b))
  *  improve voronoi (#93) ([e1ae81a8](https://github.com/plouc/nivo/commit/e1ae81a800110683ce6de95debbbc7eddded3a8f))
* **waffle**
  *  add ability to toggle datum by id ([7f411dae](https://github.com/plouc/nivo/commit/7f411dae9d481c6118a95ff06d113ec045309480))
  *  add legend support for WaffleCanvas ([a60b34e6](https://github.com/plouc/nivo/commit/a60b34e663a87d01d664627e414f2fda4fbe6712))
  *  add legend support for Waffle ([6a5db0dd](https://github.com/plouc/nivo/commit/6a5db0dd574050749d0944ac5ac0ebf451d51d5b))
  *  add waffle package (#202) ([aceafc48](https://github.com/plouc/nivo/commit/aceafc489465f82be140b997cf950875baafc55d))
* **website**
  *  add sponsoring link ([871c7efb](https://github.com/plouc/nivo/commit/871c7efbb9ae32b60a284afad91801024ce561f8))
  *  update colors guide ([99e66e10](https://github.com/plouc/nivo/commit/99e66e109349e0840427ca31e2dd1073bbbbfc26))
  *  add inherited color control ([4a2e0c29](https://github.com/plouc/nivo/commit/4a2e0c29f7fd68cc87b0d804e7b525f3024aa933))
  *  add swarmplot icon ([aa074697](https://github.com/plouc/nivo/commit/aa07469706a4124fb89ecf9e0e101e387801df96))
  *  improve website ([7ed59e94](https://github.com/plouc/nivo/commit/7ed59e94d6248e761dfcd2ba167b28fab9699ddb))
  *  udpate geo icons ([8426ef5b](https://github.com/plouc/nivo/commit/8426ef5b78f4111d04cfeb73729d7ad69722e7f9))
  *  add package to tag list ([12415ac7](https://github.com/plouc/nivo/commit/12415ac7633e59b5af8059cebfc5a5f51843c944))
  *  init guide about theming ([61459b9e](https://github.com/plouc/nivo/commit/61459b9ecba4ed14714216c774b9e8ec253d344c))
  *  change sankey default layout ([a5352e41](https://github.com/plouc/nivo/commit/a5352e41c195ea34b3b5856403ef68370db58438))
  *  use hooks for calendar pages ([fec85fa0](https://github.com/plouc/nivo/commit/fec85fa0bb095145e9ac1382f256b63571e65dc0))
  *  add doc for bar label + fix stories links ([223c5e57](https://github.com/plouc/nivo/commit/223c5e577651dafe8a7a12c912266f3835f8b253))
  *  upgrade nivo packages ([775ea0b4](https://github.com/plouc/nivo/commit/775ea0b4ca9293d5b991c263d9856f5546517e9c))
  *  upgrade react ([62f066b8](https://github.com/plouc/nivo/commit/62f066b885c15da7500e43f08b69055a33f0474b))
  *  upgrade nivo packages ([991f0781](https://github.com/plouc/nivo/commit/991f07811925f556945e4d59f990fe161e393312))
  *  upgrade nivo packages ([33d5508c](https://github.com/plouc/nivo/commit/33d5508c679601af59e58c65292de59cf48575fd))
  *  remove responsive components from explorer ([27524f18](https://github.com/plouc/nivo/commit/27524f184ff338438291facac1b7ce2e762c8d21))
  *  generate chart icons from code ([209177af](https://github.com/plouc/nivo/commit/209177afea51515c70ccdf842cf10a0c8a3b6578))
  *  upgrade nivo packages ([d1bb0571](https://github.com/plouc/nivo/commit/d1bb0571f553ffca1c2e2f8dcf17871e1f6c288d))
  *  disable service worker ([b40d620e](https://github.com/plouc/nivo/commit/b40d620e067d94a740cb63d2c36422c1dbe4d9bb))
  *  upgrade nivo packages ([fbc78c00](https://github.com/plouc/nivo/commit/fbc78c00364e9f1b6152c38d6d739ac3a3ef01f2))
  *  upgrade react-scripts ([db922af5](https://github.com/plouc/nivo/commit/db922af5a723f4b2b04c11f5ce61c04dce9e5938))
  *  upgrade nivo packages ([fd850795](https://github.com/plouc/nivo/commit/fd850795df6efdc78b0a8a6c429f54d96a094763))
  *  upgrade nivo packages ([ddb22915](https://github.com/plouc/nivo/commit/ddb22915c5718c94e2e37b20ddfc2aee639c9563))
  *  upgrade nivo packages ([531e492b](https://github.com/plouc/nivo/commit/531e492bea9b9d46a9633a2381dabbfe49584530))
  *  upgrade nivo packages ([47a5f8a7](https://github.com/plouc/nivo/commit/47a5f8a7e8611841ca1176d47670e1b6c5c6a993))
  *  upgrade nivo packages ([1c5fd5db](https://github.com/plouc/nivo/commit/1c5fd5dbb9e99912d1df871450112c1ad678beda))
  *  upgrade nivo packages ([a88e50fd](https://github.com/plouc/nivo/commit/a88e50fd21c4b4a4ff769a1b80a9e66262b7b196))
  *  change line demo data generation method ([124028de](https://github.com/plouc/nivo/commit/124028dec51dd8477ce158929ed617d7a49d72cf))
  *  upgrade nivo packages ([4aeed5d8](https://github.com/plouc/nivo/commit/4aeed5d87159164df0f045a125131f29bc2e2e5a))
  *  add component to list storybook stories ([6b9ce02e](https://github.com/plouc/nivo/commit/6b9ce02ec79a0b8a524323300e3a14250df4cddb))
  *  add Line legends control ([91bac9ed](https://github.com/plouc/nivo/commit/91bac9ed70d27a01f5274cbfae3281ec9166fffd))
  *  upgrade nivo packages ([c0f12986](https://github.com/plouc/nivo/commit/c0f12986afef25b5ed3fd4c20de66fceec028b45))
  *  add ability to manage array of props ([8f44ab94](https://github.com/plouc/nivo/commit/8f44ab94bc198e10cdeebf2c6480ceb669a548b8))
  *  upgrade nivo packages ([4d819df6](https://github.com/plouc/nivo/commit/4d819df62f3a63b8b6665701a2f06e80e99719b1))
  *  add option to showcase custom scatterplot tooltip ([68b72a44](https://github.com/plouc/nivo/commit/68b72a448217963f0a7d287674be45aabef3257b))
  *  upgrade nivo packages ([d6eefa30](https://github.com/plouc/nivo/commit/d6eefa300d5ddaddc1e8ba0c13097670bf5269d4))
  *  upgrade nivo packages ([cf62e33d](https://github.com/plouc/nivo/commit/cf62e33d70943ade584b807cad3385fd16872fbd))
  *  upgrade nivo packages ([8dadeead](https://github.com/plouc/nivo/commit/8dadeeadca3e29b4ab86226602afdc64609477f6))
  *  fix treemap source code for treemap components ([b97c07b8](https://github.com/plouc/nivo/commit/b97c07b8c53e66f64265662e832dedc4446df067))
  *  restore scrol position when pathname changes ([49b7ffca](https://github.com/plouc/nivo/commit/49b7ffcae859b57b2a7fac1d041755972ec242cb))
  *  use BrowserRouter instead of HashRouter ([a360e444](https://github.com/plouc/nivo/commit/a360e444f63944914456e6aab9f8c2819a2ec238))
  *  upgrade nivo packages ([69deaa17](https://github.com/plouc/nivo/commit/69deaa17a9634e9a31f7fcbf36dcafa2cbfa1a08))
  *  upgrade nivo packages ([5f416e9a](https://github.com/plouc/nivo/commit/5f416e9ac0a20e44ad9bf63c0fdbc6d285706966))
  *  upgrade nivo packages ([8d8374a3](https://github.com/plouc/nivo/commit/8d8374a3dcd5d532c50831bbf193e06251996a2f))
  *  upgrade nivo packages ([66a7208c](https://github.com/plouc/nivo/commit/66a7208c577b74e30ba01fb986e1b4bdb7a5bdb5))
  *  improve chart tabs ([2c2265f5](https://github.com/plouc/nivo/commit/2c2265f5671b82997515ea26c978b575e86dd3e7))
  *  upgrade @nivo packages ([71e1c4b0](https://github.com/plouc/nivo/commit/71e1c4b039feb6ef7cc9e4378a30f3a5018d6781))
  *  upgrade @nivo packages ([2da761d8](https://github.com/plouc/nivo/commit/2da761d871348d1edfcadd46d91d214b77092fbb))
  *  upgrade @nivo packages ([4b60e426](https://github.com/plouc/nivo/commit/4b60e4262ec5188ec7dbf4c0b4565c10dfd25b20))
  *  upgrade @nivo packages ([429bd5f0](https://github.com/plouc/nivo/commit/429bd5f00dbb45301af606acecf24cde664b98da))
  *  upgrade website @nivo packages ([81adc8d0](https://github.com/plouc/nivo/commit/81adc8d057d5f770c5228ddf1450c4d77ac3e7bd))
  *  upgrade @nivo packages ([697e8aa5](https://github.com/plouc/nivo/commit/697e8aa59355b43d566cddd5f6a4314f30c06a71))
  *  rename demo to website ([dadc8f58](https://github.com/plouc/nivo/commit/dadc8f584f2514ae4f25a8d3b93051998805d586))



