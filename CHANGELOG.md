<a name="v0.69.1"></a>
## v0.69.1 (2021-05-03)




<a name="v0.69.1"></a>
## v0.69.1 (2021-05-03)


#### Features

* **BarCanvas:**
  *  allow to use ref to access the underlying canvas ([fb91ca4e](fb91ca4e))
  *  add a ref to access the canvas ([ce5b67a1](ce5b67a1))
* **arcs:**
  *  fix typo in useArcLinkLabelsTransition comment ([62766378](62766378))
  *  improve label accessor in ArcLinkLabelsProps ([3aa12a3b](3aa12a3b))
  *  finalize arc link labels ([89c52e60](89c52e60))
  *  move canvas helpers to scoped directories ([f0d9d19c](f0d9d19c))
  *  improve labels handling ([c1bfd514](c1bfd514))
  *  add the ability to pass custom arc label/arc link label components ([8fb574c9](8fb574c9))
  *  provide generic arc labels/arc link labels layer ([547b6352](547b6352))
  *  normalize arc labels props ([08b75bff](08b75bff))
  *  fix arc border width ([f2223d77](f2223d77))
  *  move arc hover detection from core to arcs package ([30be4925](30be4925))
  *  add configurable transition modes ([e76747d7](e76747d7))
  *  introduce @nivo/arcs package ([afc6b8cc](afc6b8cc))
* **axes:**
  *  init migration to typescript ([73f98032](73f98032))
  *  adjustments for react-spring@next ([46dbb5a4](46dbb5a4))
* **bar:**
  *  typescript - uses string unions to define BarLayerType (#1322) ([a1e08f57](a1e08f57))
  *  add the ability to round index scale (#1282) ([1ab12579](1ab12579))
  *  add BarItem component to the exposed package API (#1261) ([df211c03](df211c03))
  *  add ability to set scale config via `valueScale` prop (#1183) ([bea61cd9](bea61cd9))
* **build:**
  *  add test watch commands to makefile ([e706d48e](e706d48e))
  *  prevent types removal when building a package ([f0c6ca8f](f0c6ca8f))
  *  generate package types during build if tsconfig exists ([e50cc92a](e50cc92a))
  *  remove types generation from package build target ([95bec3c2](95bec3c2))
  *  include types generation in build make target ([39da664b](39da664b))
  *  update build tools ([d481cfe5](d481cfe5))
  *  add build config for optional typescript support ([6990e3f7](6990e3f7))
  *  add size and bundle stats rollup plugins ([c629c81f](c629c81f))
* **bullet:**
  *  adjustments for react-spring@next ([c567ae18](c567ae18))
  *  convert stories to typescript ([b2894a91](b2894a91))
  *  switch from react-motion to react-spring ([04f07093](04f07093))
  *  convert to functional components ([3f63fd99](3f63fd99))
  *  remove recompose dependency ([ff7f1bc8](ff7f1bc8))
  *  init package migration to typescript ([d07378a3](d07378a3))
* **chord:**  use arc hover detection from @nivo/arcs ([3eece0ad](3eece0ad))
* **ci:**
  *  fix example sandbox formatting ([7f698ade](7f698ade))
  *  rename example sandbox ([1df58b6d](1df58b6d))
  *  add example sandbox with all nivo packages pre-installed ([9007093f](9007093f))
  *  update sandboxes for codesandbox-ci ([3932a099](3932a099))
  *  enable codesandbox-ci ([98257ff5](98257ff5))
* **circle-packing:**
  *  update default childColor ([ca07b9e6](ca07b9e6))
  *  restore patterns and gradients support for the SVG implementation ([08ee5155](08ee5155))
  *  add a dedicated prop to enable parent color inheritance ([b864de9f](b864de9f))
  *  update website descriptions ([b91c0570](b91c0570))
  *  update stories ([9b7a3046](9b7a3046))
  *  restore border support ([2911b61c](2911b61c))
  *  restore pixelRatio property for canvas implementation ([56491038](56491038))
  *  add colorBy property to control which property should be used to assign a color ([10914684](10914684))
  *  add mouse handlers support to canvas implementation ([82cb7c55](82cb7c55))
  *  add zoom support ([d8c7a883](d8c7a883))
  *  expose hooks to be able to build fully custom charts ([03433b02](03433b02))
  *  add support for custom circle component to SVG and HTML implementations ([6f8a4caf](6f8a4caf))
  *  memoize labels transition phases ([d9170572](d9170572))
  *  add support for mouse handlers to SVG and HTML implementations ([138eafb5](138eafb5))
  *  restore labels ([4fb658dc](4fb658dc))
  *  restore leavesOnly support ([07135815](07135815))
  *  migrate canvas implementation to new architecture ([478da0ee](478da0ee))
  *  rename Bubble to CirclePacking ([43bb075c](43bb075c))
  *  init hooks ([6fb27f70](6fb27f70))
  *  remove licence headers ([1f5290a7](1f5290a7))
  *  enable TS support ([e75f1c89](e75f1c89))
* **colors:**
  *  update package typings according to TypeScript migration ([e98d8e07](e98d8e07))
  *  migrate ordinalColorScale to TypeScript ([7bb42c68](7bb42c68))
  *  migrate prop types to TypeScript ([6bf1f7d4](6bf1f7d4))
  *  rename InheritedColorProp to InheritedColor in all package typings ([29a73083](29a73083))
  *  migrate inheritedColor to TypeScript ([436117da](436117da))
  *  migrate motion to TypeScript ([e1785918](e1785918))
  *  add typings for color schemes and interpolators ([1093da12](1093da12))
  *  init TypeScript migration ([2383b4d5](2383b4d5))
* **core:**
  *  improve property accessor utilities ([90958bdc](90958bdc))
  *  remove ts-ignore directive from useValueFormatter imports ([640393ba](640393ba))
  *  improve value formatter typings ([5b158797](5b158797))
  *  remove license headers from hook modules ([09e3f839](09e3f839))
  *  remove license headers from lib modules ([e4eb8f72](e4eb8f72))
  *  remove license headers from props utilities ([b05913d1](b05913d1))
  *  move arc bounding box unit tests to the arcs package ([6c30f05a](6c30f05a))
  *  add proper type for useTheme hook ([66d2f4f0](66d2f4f0))
  *  add missing spring config to Container ([25aa18fb](25aa18fb))
* **d3-scale:**  upgrade d3-scale package ([c976d663](c976d663))
* **deps:**  replace `recompose` with inlined version (#1494) ([09b02069](09b02069))
* **example:**  update retro example ([54c7af5c](54c7af5c))
* **fmt:**  add missing tsx extension when checking formatting ([bd08b37e](bd08b37e))
* **generators:**  migrate package to typescript (#1492) ([46d2ae0c](46d2ae0c))
* **infrastructure:**  add stale bot config ([87a56e41](87a56e41))
* **legends:**  remove recompose from dependencies ([29e7531c](29e7531c))
* **line:**
  *  use theme values for line slice tooltip (#1471) ([0f67123f](0f67123f))
  *  forward ref to the canvas element ([4be9c8ab](4be9c8ab))
* **linting:**  add lint --fix option and create new make option (#1484) ([dd74cbb3](dd74cbb3))
* **marimekko:**
  *  fix doc typos and add missing custom layer props to the doc ([ae4c329c](ae4c329c))
  *  update README preview ([ca4a0d66](ca4a0d66))
  *  add support for legends ([f39f12a7](f39f12a7))
  *  add story about custom layers ([8560b6ad](8560b6ad))
  *  add support for value formatter ([c5429db2](c5429db2))
  *  add icons and preview for README ([71b06a84](71b06a84))
  *  add bar groups position and dimensions to layers context ([8ba4c018](8ba4c018))
  *  add support for patterns and gradients ([d75a3952](d75a3952))
  *  fix vertical layout and diverging offset ([604b523f](604b523f))
  *  add support for axes and grid ([8e4cd0d6](8e4cd0d6))
  *  add support for custom tooltip ([ed74e9f1](ed74e9f1))
  *  expose thickness and dimensions scale ([914f1857](914f1857))
  *  add the ability to configure the stack offset ([a8437cca](a8437cca))
  *  add stories ([6b6aa949](6b6aa949))
  *  pass default props to InnerMarimekko ([bb85398f](bb85398f))
  *  improve motion configuration ([7df05809](7df05809))
  *  add support for mouse handlers ([4f244ea3](4f244ea3))
  *  improve documentation about data props ([3178ce81](3178ce81))
  *  compute bars from top level component and pass them to custom layers ([146a04b2](146a04b2))
  *  use react-spring@next and add animation support to bars ([001b6719](001b6719))
  *  add to website and improve bars ([5f18b057](5f18b057))
  *  init package ([35556143](35556143))
* **parallel-coordinates:**  adjustments for react-spring@next ([df7d665c](df7d665c))
* **pie:**
  *  remove lodash ([fe4f6342](fe4f6342))
  *  add story to showcase custom arc label component ([37cb3d15](37cb3d15))
  *  adjust stories according to refactoring ([4ca47ac6](4ca47ac6))
  *  rename slices to arcs ([39f06445](39f06445))
  *  fix typings for arc mouse handlers ([4d3d303f](4d3d303f))
  *  use generic ArcsLayer from the arcs package ([b14ffcd3](b14ffcd3))
  *  compute radial lables in arcs package ([15625766](15625766))
  *  use mostly the arc package for PieCanvas ([46af372a](46af372a))
  *  use @nivo/arcs to compute PieCanvas slice labels ([ce6bb875](ce6bb875))
  *  use Container instead of withContainer HOC ([0fb7756b](0fb7756b))
  *  fix angle padding ([3baba4c6](3baba4c6))
  *  add radius offsets support for active arcs ([cfc0cb63](cfc0cb63))
  *  improve transitions and fix slice labels ([9365ae27](9365ae27))
  *  restore feature parity for slices ([5dbbe0cd](5dbbe0cd))
  *  add transitions for arcs ([ccb1656d](ccb1656d))
  *  use nullish operator to extract datum label ([525fb5a8](525fb5a8))
  *  properly handle possible presence of label on raw datum ([840a6cbc](840a6cbc))
  *  rename generics raw datum type to RawDatum instead of R ([f71cd5b5](f71cd5b5))
  *  use optional chaining and nullish coalescing ([a770ed51](a770ed51))
  *  get default pixel ratio from window if available ([ff242a95](ff242a95))
  *  remove unnecessary ts ignore ([e9898aef](e9898aef))
  *  finalize TypeScript migration ([60c80a90](60c80a90))
  *  remove definitions file to types ([e84d3a9b](e84d3a9b))
  *  init pie package migration to typescript ([9fd5cee1](9fd5cee1))
  *  add tests to check various layouts ([0335b6d2](0335b6d2))
  *  add tests for legends ([ba4fb4de](ba4fb4de))
  *  improve TypeScript definitions ([d0a104e5](d0a104e5))
  *  change tooltip override management to disable default wrapper ([0f3eaed4](0f3eaed4))
  *  add tests for radial labels ([8cd3180a](8cd3180a))
  *  adapt swarmplot example using usePie hook ([d02e1e90](d02e1e90))
  *  add missing props to API example ([615e3502](615e3502))
  *  add tests for interactivity ([3f4f17e6](3f4f17e6))
  *  add story to showcase custom layers ([17b129d2](17b129d2))
  *  add story to showcase the ability to use colors defined in dataset ([92f19c28](92f19c28))
  *  add support for extra interactivity handlers ([ebaf86e6](ebaf86e6))
  *  use same tooltip for both svg and canvas implementations ([baa8af89](baa8af89))
  *  improve PieSlice component ([b2c2bf1f](b2c2bf1f))
  *  memoize radial labels computation ([dbab51b2](dbab51b2))
  *  honor isInteractive for svg implementation ([2a8cded4](2a8cded4))
  *  use same computation for radial labels for both SVG and canvas implementations ([1c3f704d](1c3f704d))
  *  add tests for slice labels ([fd5b0470](fd5b0470))
  *  use same computation for slice labels for both SVG and canvas implementations ([c22be686](c22be686))
  *  add support for sliceLabelsRadiusOffset ([d913f50c](d913f50c))
  *  homogeneize sliceLabels properties ([19444c72](19444c72))
  *  improve internal props naming ([ed176a92](ed176a92))
  *  document the interface of props passed to custom layers ([055e4775](055e4775))
  *  document layers property ([b5ed2d4b](b5ed2d4b))
  *  add support for layers to Pie component ([a8f64685](a8f64685))
  *  add tests for colors ([f0cefd2e](f0cefd2e))
  *  add tests regarding data handling ([4abe3f35](4abe3f35))
  *  move @nivo/core to peerDependencies ([2aef261f](2aef261f))
  *  restore border for PieCanvas ([eab1311c](eab1311c))
  *  fix PieCanvas ([789d52a0](789d52a0))
  *  use theme hook instead of prop for PieRadialLabels ([7e415396](7e415396))
  *  use hooks instead of props to handle tooltip ([97974824](97974824))
  *  use hooks instead of component to compute layout ([6e298727](6e298727))
  *  pass datum to pie legend data ([5292831f](5292831f))
  *  remove unused react-motion dependency ([3c7d65ce](3c7d65ce))
* **scales:**
  *  add nice argument to linear and time scales (#1473) ([644faf46](644faf46))
  *  add option to clamp linear scales (#1342) ([b5584de6](b5584de6))
  *  exclude null and undefined values in log scale validation (#1099) ([c87eba7d](c87eba7d))
* **sunburst:**
  *  improve drill down demo ([b058f7b7](b058f7b7))
  *  improve color management ([c94aff4c](c94aff4c))
  *  explain non-null assertions and remove linter warnings for those ([378c52d9](378c52d9))
  *  improve props documentation ([d6386d9b](d6386d9b))
  *  simplify types ([a6b5b926](a6b5b926))
  *  also apply defaults to main hook ([beee8941](beee8941))
  *  remove unused types ([836823ec](836823ec))
  *  fix typo ([e059e80d](e059e80d))
  *  use arcs package ([bf225e7a](bf225e7a))
  *  add layers support ([3a6537b0](3a6537b0))
  *  add tests ([66edc5a4](66edc5a4))
  *  add valueFormat prop and move event handlers to hook ([c4273501](c4273501))
  *  add parent to node data ([c586676b](c586676b))
  *  add animation support ([9b4630a9](9b4630a9))
  *  add pattern and gradient support ([1fecdffe](1fecdffe))
  *  remove recompose ([3c0586b3](3c0586b3))
  *  init package migration to typescript ([0542c6ce](0542c6ce))
  *  add mouse events and some labels (#880) ([1b3dd8f0](1b3dd8f0))
* **testing:**  add enzyme types ([d66d4e92](d66d4e92))
* **tooltip:**
  *  add a display name to memoized components to ease testing ([218e237f](218e237f))
  *  migrate TableTooltip component to TypeScript ([0a54e62f](0a54e62f))
  *  migrate Crosshair component to TypeScript ([1416e8cf](1416e8cf))
  *  ensure we only render the tooltip when the charts are interactive ([6623000f](6623000f))
  *  remove usage of tooltip prop types from other packages ([8addc8d4](8addc8d4))
  *  adapt BasicTooltip for new typings ([cb87d9a4](cb87d9a4))
  *  remove prop types ([b187c618](b187c618))
  *  init TypeScript migration ([3413142d](3413142d))
* **treemap:**  adjustments for react-spring@next ([e5611c30](e5611c30))
* **voronoi:**
  *  fix storybook ([97b7fc85](97b7fc85))
  *  migrate package to TypeScript and remove recompose ([9796f3f0](9796f3f0))
  *  remove license headers ([f69c7992](f69c7992))
  *  init TypeScript setup ([74621c0f](74621c0f))
* **website:**  update references ([5b2deb56](5b2deb56))

#### Bug Fixes

* **BarCanvas:**  stories demonstrating the canvas ref ([96cff43e](96cff43e))
* **annotations:**  switch to useAnimatedPath hook ([6c8b767e](6c8b767e))
* **arcs:**  fix packages version due to new release ([c1ddb3d0](c1ddb3d0))
* **area-bump:**  Return a new serie reference when color or styles change ([844c311f](844c311f), closes [#1301](1301))
* **axes:**
  *  update some types ([b5d5f0f3](b5d5f0f3))
  *  create alias for axis value ([f11d0347](f11d0347))
  *  improve package types ([f7fcc751](f7fcc751))
  *  remove undefined cursor style prop from AxisTick ([eb969df8](eb969df8))
  *  ensure document exists in the environment (#1489) ([a2e0d891](a2e0d891))
  *  rtl issue with x-axis (#1349) ([95f3b343](95f3b343))
* **axis:**  time series rendering (#1408) ([d80dafd6](d80dafd6))
* **bar:**
  *  types don't allow bar component as any svg element (#1469) ([20697e57](20697e57))
  *  improve grouped bar performance (#1404) ([f37d066e](f37d066e))
  *  fix stacked bars when key is missing (#1291) ([484235ff](484235ff))
  *  add new prop valueScale to BarCanvas (#1274) ([d66acd6a](d66acd6a))
  *  fix lint errors ([640c883b](640c883b))
  *  prevent missing values causing bad scales (#1257) ([b9687754](b9687754))
  *  include bars with zero height/width ([32f48235](32f48235))
  *  Fix BarItemProps types (#1163) ([7f19561a](7f19561a))
* **build:**  include latest changelog when publishing ([e9360be8](e9360be8))
* **bullet:**
  *  remove some ts-ignore comments ([b4372cf1](b4372cf1))
  *  make dimensions required props ([8451c279](8451c279))
  *  fix linting errors round 3 ([a5eac4a9](a5eac4a9))
  *  fix linting errors round 2 ([c446b46c](c446b46c))
  *  fix linting errors ([3df88ed5](3df88ed5))
  *  fix website paths ([8dd28feb](8dd28feb))
  *  fix tslint errors ([b6f67018](b6f67018))
* **bump:**
  *  Return a new serie reference when color or styles change ([07c8ba10](07c8ba10))
  *  add missing @nivo/axes module to dependencies ([d79d0a18](d79d0a18))
  *  switch to useAnimatedPath hook ([5ddb2ec2](5ddb2ec2))
  *  update input datum types for undefined/null (#1096) ([259e037f](259e037f))
* **changelog:**  update clog to allow setting a tag date (#1278) ([e984d72b](e984d72b))
* **ci:**  switch to GitHub actions (#1175) ([0affed68](0affed68))
* **circle-packing:**
  *  add support for controlled zoomed ID ([faf00aa8](faf00aa8))
  *  fix HTML implementation overflow ([f83f2f1c](f83f2f1c))
* **core:**
  *  fix invalid core types (#1386) ([296f5d1c](296f5d1c))
  *  add missing marker typings (#1440) ([ff2cc31d](ff2cc31d))
  *  fix type definition of PatternSquaresDef (#1355) ([bf27d55d](bf27d55d))
  *  add missing properties back to theme type (#1292) ([681e0c28](681e0c28))
  *  add useDimensions hook to types ([4ce35386](4ce35386))
  *  Add missing Theme types to match default theme object (#1135) ([861000fc](861000fc))
  *  add Defs types and export for typescript (#1146) ([99b520e9](99b520e9))
* **core / swarmplot:**  Improve core and swarmplot typedefs (#1151) ([e370ea87](e370ea87))
* **deps:**
  *  remove recompose ([53b9c1cc](53b9c1cc))
  *  upgrade react-spring to v9.1.2 (#1480) ([1d94b5f1](1d94b5f1))
  *  fix @nivo peer dependency versions ([505a7c08](505a7c08))
* **doc:**  fix grammar errors in docs/comments ([b5bbeda7](b5bbeda7))
* **funnel:**
  *  fix dependencies on other nivo packages (#1486) ([a1a12411](a1a12411))
  *  fix lint errors ([e66b51c5](e66b51c5))
  *  switch to useAnimatedPath hook ([d4578414](d4578414))
* **generators:**  change duplicate keys in tree data ([149d1a64](149d1a64))
* **geo:**  fix lint errors ([bc398839](bc398839))
* **legends:**
  *  Add missing symbolBorderWidth to typings (#1431) ([a00ef4a1](a00ef4a1))
  *  fix lint errors ([275b2b55](275b2b55))
* **line:**
  *  add a stories for the responsive canvas component ([0fe9c9d3](0fe9c9d3))
  *  add a story showcasing the usage of the ref in canvas ([190acd7e](190acd7e))
  *  animate paths properly ([6d2cd274](6d2cd274))
* **motion:**  replace deprecated  method with the new  helper ([57b27d8d](57b27d8d))
* **packages:**  allow react 17 in peer dependencies ([a4f370b4](a4f370b4))
* **parallel-coordinates:**  switch to useAnimatedPath hook ([d755a11d](d755a11d))
* **pie:**
  *  fix pie stories ([4c8cde1e](4c8cde1e))
  *  fix existing tests due to usage of @nivo/arcs ([6d5fb272](6d5fb272))
  *  fix skip angle for slice labels ([70c1ef24](70c1ef24))
  *  fix types related to d3-shape ([624d5859](624d5859))
  *  fix typings issues due to better d3 types ([ad9cc2c6](ad9cc2c6))
  *  make dimensions required props ([d502a409](d502a409))
  *  fix incomplete type for valueFormat ([0793553e](0793553e))
  *  fix path to typings ([243613d3](243613d3))
* **radar:**
  *  typing for custom functions (#1089) ([20a5c124](20a5c124))
  *  fix issue with points being outside circular grid (#1189) ([beb3ac84](beb3ac84))
  *  switch to useAnimatedPath hook ([e7991283](e7991283))
* **sankey:**
  *  switch to useAnimatedPath hook ([a5cdf26f](a5cdf26f))
  *  Fix issue with gradient and parentheses in IDs (#1152) ([56f0e449](56f0e449))
* **scatterplot:**
  *  Support DerivedNodeProp for nodeSize prop (#1134) ([42adacd9](42adacd9))
  *  adjust type/proptype of `data[].id` prop (#1147) ([52c1bc15](52c1bc15))
* **storybook:**
  *  move bar/race chart story to main bar stories (#1258) ([e9c5932d](e9c5932d))
  *  always pull latest version of generators package (#1176) ([9e230cef](9e230cef))
* **stream:**  switch to useAnimatedPath hook ([d983b19c](d983b19c))
* **sunburst:**
  *  fix logic with radius and centerX/Y ([ee593828](ee593828))
  *  get build passing again ([77fcc219](77fcc219))
  *  fix with child color modifier story ([96ac069f](96ac069f))
  *  apply my own fixes from pr review ([cbb9e37a](cbb9e37a))
* **theme:**  remove default fill for legends.text theme (#1181) ([2216f129](2216f129))
* **tooltip:**
  *  Add anchor param to showTooltipFromEvent type (#1420) ([1c2569e4](1c2569e4))
  *  fix typings due to core adjustments ([87e5edb2](87e5edb2))
  *  export useTooltip hook in types ([7eb1b30b](7eb1b30b))
  *  Show tooltip on first tap for touch devices (#1185) ([f712cfaa](f712cfaa))
* **voronoi:**
  *  length undefined in production (#1441) ([80a9c376](80a9c376))
  *  fix typo in export class name (#1436) ([245b0cd4](245b0cd4))
* **website:**
  *  fix typo in pie props (#1380) ([ce7c755b](ce7c755b))
  *  update sunburst to not crash on hover ([952ad507](952ad507))
  *  patch react-spring due to known issue with Gatsby ([c35b4e96](c35b4e96))
  *  changes to get deployment to work ([09f46839](09f46839))
  *  fix crash caused by calendar tooltip (#1214) ([7eb69175](7eb69175))



<a name="v0.62.5"></a>
## v0.62.5 (2020-12-23)




<a name="v0.62.4"></a>
## v0.62.4 (2020-12-01)




<a name="v0.62.3"></a>
## v0.62.3 (2020-10-21)




<a name="v0.62.2"></a>
## v0.62.2 (2020-10-19)




<a name="v0.62.1"></a>
## v0.62.1 (2020-10-13)


#### Features

* **a11y:**
  *  add ability to set `role` prop on all charts (#1128) ([7d52c072](7d52c072))
  *  add changes to allow for improved accessibility on charts (#1054) ([464185c8](464185c8))
* **annotations:**  replace react-motion by react-spring ([7acc5721](7acc5721))
* **axes:**  replace react-motion by react-spring ([50c135d6](50c135d6))
* **build:**
  *  remove custom nivo babel preset ([2083f8bd](2083f8bd))
  *  use react app babel preset ([18a8dd14](18a8dd14))
  *  change .esm suffix to .es ([aecf5b08](aecf5b08))
  *  generate source maps for packages ([39a83fd4](39a83fd4))
* **bullet:**  support ranges that support < 0 ([5dc5ce69](5dc5ce69))
* **bump:**
  *  remove lodash dependency ([6f6aff3c](6f6aff3c))
  *  replace react-motion by react-spring for Bump ([edf2daf6](edf2daf6))
  *  replace react-motion by react-spring for AreaBump ([90c3232c](90c3232c))
* **calendar:**
  *  remove recompose and convert to hooks (#1040) ([daebd61f](daebd61f))
  *  add monthSpacing prop (#964) ([8f55046e](8f55046e))
* **ci:**  update Node.js version on CI to run v12 ([3888a729](3888a729))
* **core:**
  *  replace react-measure with custom hook ([3e337cda](3e337cda))
  *  remove SmartMotion component in favor of react-spring built-in support for various interpolators ([15177207](15177207))
* **funnel:**
  *  add funnel documentation screenshots ([ed1e58a9](ed1e58a9))
  *  disable stories ([4f6dc92a](4f6dc92a))
  *  add TypeScript definitions ([2748dc10](2748dc10))
  *  add support for tooltip ([6ce539cb](6ce539cb))
  *  add the ability to disable animations ([7055d3d9](7055d3d9))
  *  improve animation management ([99359f57](99359f57))
  *  add support for custom event handlers ([bbdbc373](bbdbc373))
  *  add support for annotations to Funnel component ([9fca13ce](9fca13ce))
  *  add support for current part ([a69780fd](a69780fd))
  *  update funnel icon ([826c08f6](826c08f6))
  *  add support for animation to Funnel component ([e487a764](e487a764))
  *  add widget to be ease creation of d3 value formatters ([5f0bf7dc](5f0bf7dc))
  *  init @nivo/funnel package ([e2d1ce88](e2d1ce88))
* **generators:**  add network data generation (#1082) ([46bf12c3](46bf12c3))
* **heatmap:**
  *  improve useHeatMap hook ([62b2e597](62b2e597))
  *  move cells computation to main hook ([80701b1f](80701b1f))
  *  use hooks instead of recompose for HeatMapCanvas ([f823ea61](f823ea61))
  *  use hooks instead of recompose and migrate to react-spring ([6d6528aa](6d6528aa))
* **infrastucture:**  upgrade rollup, babel, typescript and prettier ([b08e7917](b08e7917))
* **line:**
  *  add custom layer support to LineCanvas (#987) ([1e5fd14d](1e5fd14d))
  *  replace react-motion by react-spring ([ca452490](ca452490))
* **network:**  add support for tooltips (#1080) ([4d8e822e](4d8e822e))
* **parallel-coordinates:**  use hooks instead of recompose and migrate to react-spring ([0760d942](0760d942))
* **radar:**
  *  remove lodash dependency ([6e5c7f9f](6e5c7f9f))
  *  replace react-motion by react-spring ([9e9c4984](9e9c4984))
* **sankey:**
  *  restore previous tooltip positioning ([7666935b](7666935b))
  *  use hooks instead of recompose and migrate to react-spring ([b08c691d](b08c691d))
* **scales:**  Add support for symlog scale (#1097) ([954bef75](954bef75))
* **stream:**
  *  restore previous tooltip positioning ([611a72bd](611a72bd))
  *  use hooks instead of recompose and migrate to react-spring ([0c8dd3bc](0c8dd3bc))
* **sunburst:**
  *  add support for custom tooltip #1024 ([9a5b1e42](9a5b1e42))
  *  Add typescript definition (#995) ([a32603ce](a32603ce))
* **swarmplot:**  add time scale support (#1121) ([9a19da66](9a19da66))
* **tooltip:**
  *  improve TooltipWrapper component for animation ([d969d836](d969d836))
  *  restore animation and use new measure hook ([691125c1](691125c1))
  *  replace react-motion by react-spring ([a5850bc5](a5850bc5))
* **treemap:**
  *  restore pattern and gradient support for TreeMap component ([5e4ea120](5e4ea120))
  *  add stories to demo pages ([4b3241cd](4b3241cd))
  *  update treemap documentation screenshots ([43e625fa](43e625fa))
  *  update stories ([f90f979d](f90f979d))
  *  add support for parent labels ([c705f3e7](c705f3e7))
  *  add TypeScript definitions ([f1d9a3b9](f1d9a3b9))
  *  use hooks instead of recompose and migrate to react-spring ([5ff360ef](5ff360ef))
* **website:**
  *  add theme property documentation to all components ([f967380e](f967380e))
  *  add theming guide ([975503ab](975503ab))
  *  add ability to configure x/y formats from UI ([022ddf8d](022ddf8d))
  *  update heatmap motion config control for react-spring ([25ba5662](25ba5662))
  *  add the ability to control react-spring config ([457ebfa4](457ebfa4))

#### Bug Fixes

* **bump:**  Add types for defs to AreaBumpSvgProps (#997) ([da9ea7f8](da9ea7f8))
* **calendar:**  Add 'monthLegendPosition' definition (#1007) ([f58298ef](f58298ef))
* **dependencies:**  remove forced package resolutions ([5be120a1](5be120a1))
* **install:**  force resolution of fsevents package ([fbcafd14](fbcafd14))
* **legends:**  Respect theme fill color (#941) ([fa847f6a](fa847f6a))
* **line:**  change points ordering on stacked lines (#1060) ([c10edbf0](c10edbf0))
* **pie:**  tooltip props typing (#1088) ([54215e7e](54215e7e))
* **radar:**
  *  Add return type of GridLabelCustomFunction (#1045) ([f87be93a](f87be93a))
  *  add theme prop to types (#1029) ([74001a66](74001a66))
  *  fix eslint errors ([d96fb311](d96fb311))
* **scatterplot:**
  *  onMouseLeave not firing when mesh is used (#1064) ([fb4aef0c](fb4aef0c))
  *  fix canvas missing annotations layer (#1043) ([d2ceffc7](d2ceffc7))
* **treemap:**  fix treemap package nivo dependencies ([dbcd2167](dbcd2167))
* **website:**
  *  fix missing prop for Calendar API demo ([b8c7c995](b8c7c995))
  *  fix TreeMap usage on homepage ([09d3bc9f](09d3bc9f))
  *  fix TreeMap in colors guide ([24327df4](24327df4))



<a name="v0.62.0"></a>
## v0.62.0 (2020-05-31)


#### Features

* **bar:**  pass showTooltip and hideTooltip functions to custom layers ([f1bff166](f1bff166))
* **bump:**  add support for defs/fill properties to AreaBump (#926) ([c5d5d86f](c5d5d86f))
* **line:**
  *  pass the state to a custom layer (#656) ([07d2c3f2](07d2c3f2))
  *  add gradient support to line areas (#844) ([b84ec05a](b84ec05a))
  *  Updated @nivo/line typescript definition to add all curve options (#197, #944) ([7b3c503b](7b3c503b))
* **scatterplot:**  Add support for annotations on scatterplots (#882) ([ffc759ea](ffc759ea))
* **website:**
  *  add a references page to the website (#725) ([bdd45de5](bdd45de5))
  *  add link to d3-format documentation for line & scatterplot value formatters ([98a4f439](98a4f439))

#### Bug Fixes

* **axes:**  add typedef exports for all components ([354ef248](354ef248))
* **bar:**
  *  add missing grid value types (#855) ([033cf9ee](033cf9ee))
  *  fix linting error in types ([cbba0f2a](cbba0f2a))
  *  fix legend order in bar (#842) ([ced84ee0](ced84ee0))
* **core:**  add missing crosshair definitions to theme (#915) ([211d76d8](211d76d8))
* **heatmap:**  add missing type for tooltip property ([f4d4ea62](f4d4ea62))
* **line:**
  *  typings fix for custom layer props (#887) ([a293a648](a293a648))
  *  fix typescript definition for areaBaselineValue prop. (#961) ([9b1ed9cd](9b1ed9cd))
  *  add types for pointLabel function ([b5464bba](b5464bba))
  *  fix onMouseLeave firing ([f2816f44](f2816f44))
  *  add missing layer 'crosshair' to TypeScript definition (#917) ([81d8fa0b](81d8fa0b))
* **pie:**  address some issues with data label prop (#967) ([d4714b6c](d4714b6c))
* **sankey:**  add missing motion typedefs and proptypes ([bc5489c9](bc5489c9))
* **scales:**  fix timeScale min/max values and typings (#743) ([bcb45167](bcb45167))
* **scatter plot:**  add gridValues to ScatterPlot (#853) ([cf0fd6bd](cf0fd6bd))
* **scatterplot:**
  *  fix serieId typing (#886) ([ef1ee4c5](ef1ee4c5))
  *  remove TypeScript redefinition of Scale (#935) ([35b1681e](35b1681e))
  *  fix no implicit any error on CustomTooltip (#857) ([7ad8ba75](7ad8ba75))
* **storybook:**  add useUTC:false to line timeScale ([f3ba3f98](f3ba3f98))
* **types:**  improve typings for onMouseLeave/Enter in Bar/Pie (#939) ([422ef569](422ef569))
* **website:**
  *  fix xScale.type option for line chart ([ad77a5f5](ad77a5f5))
  *  fix spelling mistake (#805) ([468a5538](468a5538))
  *  Add closed bracket in gradients example code (#889) ([15bc0ee7](15bc0ee7))



<a name="v0.61.2"></a>
## v0.61.2 (2019-12-31)


#### Features

* **sankey:**  add support for layers to Sankey ([842ae0df](842ae0df))



<a name="v0.61.1"></a>
## v0.61.1 (2019-12-21)


#### Bug Fixes

* **geo:**  add missing dependency for legend data memoization ([887c57e7](887c57e7))
* **legends:**
  *  make sure to pass the theme object when using canvas legends ([ae621162](ae621162))
  *  honor theme font settings for labels ([e4a65fc4](e4a65fc4))
  *  fix vertical alignment of canvas labels ([559e3c78](559e3c78))



<a name="v0.61.0"></a>
## v0.61.0 (2019-12-19)


#### Features

* **bump:**  add support for function for start/end labels ([80c3e92b](80c3e92b))

#### Bug Fixes

* **bump:**  fix points keys & motion and code formatting ([d92a9655](d92a9655))
* **prop-types:**  fix missing prop types on various packages ([8d0fe0d9](8d0fe0d9))
* **publish:**
  *  add missing npm-normalize-package-bin package ([91acdf21](91acdf21))
  *  fix lerna arg ([97fcb868](97fcb868))
* **scatterplot:**  fix scatterplot unit tests ([c6b01ff1](c6b01ff1))



<a name="v0.60.1"></a>
## v0.60.1 (2019-12-13)


#### Features

* **bump:**
  *  skip serie labels for missing data ([04a13a72](04a13a72))
  *  add support for missing data to Bump component ([7275fa89](7275fa89))
  *  add active/inactive state to points ([ee906f41](ee906f41))
  *  pass original datum to each point ([b4c739d2](b4c739d2))
  *  add ability to use custom point component ([b29fed2a](b29fed2a))
* **line:**  add option to format x/y values in tooltip (#731) ([f92abbed](f92abbed))

#### Bug Fixes

* **bar:**  add ability to use number for grid lines (#669) ([3d48b94d](3d48b94d))



<a name="v0.60.0"></a>
## v0.60.0 (2019-12-13)


#### Features

* **calendar:**  add support for custom color scale (#703) ([484d3080](484d3080))
* **legends:**  pass id property to symbolShape (#687) ([289e9049](289e9049))
* **line:**  update TypeScript definitions ([c034393a](c034393a))
* **tooltip:**  add simple fix to keep the tooltip inbounds (#631) ([395fc5e7](395fc5e7))

#### Bug Fixes

* **bar:**
  *  add missing borderColor type to nivo/bar (#704) ([050f0a98](050f0a98))
  *  add missing `renderTick` type to Bar's definition (#697) ([61fc2078](61fc2078))
* **calendar:**  add missing exports for canvas calendar (#700) ([3f9bc623](3f9bc623))
* **line:**
  *  update PropType for Line markers when using dates for the X axis (#653) ([2c9bfc2d](2c9bfc2d))
  *  add missing pointSymbol prop to typings ([c249df83](c249df83))
* **sankey:**  fix issue with gradient links and spaces in IDs (#676) ([52feccbf](52feccbf))
* **scales:**  add `useUTC` to types (#690) ([d7c1da53](d7c1da53))
* **storybook:**  fix typo in line's story (#680) ([680a6ed3](680a6ed3))
* **tooltip:**  update tooltip TypeScript types. (#657) ([305a536f](305a536f))
* **website:**  fix responsive problems with component's tab (#722) ([ccbb4de0](ccbb4de0))



<a name="v0.59.3"></a>
## v0.59.3 (2019-07-13)


#### Features

* **scales:**  add ability to reverse linear scale ([2f4ddc47](2f4ddc47))

#### Bug Fixes

* **voronoi:**  upgrade d3-delaunay to fix single/collinear points (#640) ([b93c96a5](b93c96a5))



<a name="v0.59.2"></a>
## v0.59.2 (2019-07-12)


#### Features

* **website:**  add sponsoring link ([871c7efb](871c7efb))

#### Bug Fixes

* **axes:**  treat renderTick as a React component ([4bd566c8](4bd566c8))
* **choropleth:**  add missing domain prop to typings (#634) ([fa3c220a](fa3c220a))
* **line:**  add missing tooltip prop to typings (#568) ([0a90609b](0a90609b))



<a name="v0.59.1"></a>
## v0.59.1 (2019-06-29)


#### Features

* **line:**  add missing types (#605) ([f8562008](f8562008))
* **radar:**  pass key to tooltip format function (#587) ([cca8a9e9](cca8a9e9))
* **tooltip:**  move Chip style to theme (#589) ([343e38c5](343e38c5))

#### Bug Fixes

* **axes:**  respect useUTC option on x/y scale property (#574) ([b4ca5ecc](b4ca5ecc))
* **bar:**
  *  allow null for axes ([8a22b666](8a22b666))
  *  remove unnecessary ColorProps ([865e9a61](865e9a61))
* **stream:**  fix bugs in typings (#593) ([9b157510](9b157510))



<a name="v0.59.0"></a>
## v0.59.0 (2019-06-09)


#### Features

* **scatterplot:**
  *  update stories ([d55b5fce](d55b5fce))
  *  improve ScatterPlotCanvas ([40d9d2de](40d9d2de))
  *  improve Mesh support for SVG implementation ([91f66dc4](91f66dc4))
  *  fix TypeScript definitions ([ac012bad](ac012bad))
  *  adapt ScatterPlot stories ([81bf6fd5](81bf6fd5))
  *  add ability to format x/y values ([7a80184b](7a80184b))
  *  rename symbolSize to nodeSize ([501ee0ff](501ee0ff))
  *  add support for mix-blend-mode ([4b667dab](4b667dab))
  *  migrate package to new architecture ([4397dab6](4397dab6))
* **stream:**  add TypeScript definitions ([87c762cc](87c762cc))

#### Bug Fixes

* **sankey:**
  *  improve Sankey types ([9d5c7285](9d5c7285))
  *  change custom align story to use correct align property ([6d300ab6](6d300ab6))
* **scatterplot:**  fix unit tests ([3ea40c02](3ea40c02))
* **website:**  correct typo on line page ([0ed7eb8a](0ed7eb8a))



<a name="v0.58.0"></a>
## v0.58.0 (2019-05-16)


#### Features

* **bump:**
  *  add support for transitions on Bump component ([9fa5019b](9fa5019b))
  *  add support for animation for AreaLabels ([3efe3fd8](3efe3fd8))
  *  add TypeScript definitions for Bump ([eed820ad](eed820ad))
  *  add TypeScript definitions for AreaBump ([e70c4cd5](e70c4cd5))
  *  add screenshots ([edf72cae](edf72cae))
  *  add support for area transition for AreaBump ([4553d555](4553d555))
  *  add AreaBump component ([9b69845e](9b69845e))
  *  init @nivo/bump package ([5501852d](5501852d))

#### Bug Fixes

* **radar:**  fix Radar cached tooltip ([a8626bec](a8626bec))



<a name="v0.57.2"></a>
## v0.57.2 (2019-05-10)


#### Bug Fixes

* **choropleth:**  add missing domain prop (#540) ([6bf655fb](6bf655fb))
* **website:**  fix storybook url config ([5c866ce7](5c866ce7))



<a name="v0.57.1"></a>
## v0.57.1 (2019-05-10)


#### Bug Fixes

* **scales:**  fix time scale instantiation ([c9abfaef](c9abfaef))



<a name="v0.57.0"></a>
## v0.57.0 (2019-05-09)


#### Features

* **line:**
  *  finalize first version of LineCanvas ([bd008153](bd008153))
  *  fix slices spacing & add support for y axis ([d56881b8](d56881b8))
  *  add canvas implementation ([d47d5cb1](d47d5cb1))
* **network:**
  *  add TypeScript definitions ([f2d4ec39](f2d4ec39))
  *  add separated node and link components ([a54ac593](a54ac593))
  *  init network package ([2ea85816](2ea85816))

#### Bug Fixes

* **svg:**  fix text vertical alignment ([d59fb722](d59fb722))
* **website:**  fix InheritedColorControl ([862fa0bd](862fa0bd))



<a name="v0.56.2"></a>
## v0.56.2 (2019-04-24)


#### Features

* **colors:**  allow plain color for ordinal scale ([b8d3abb4](b8d3abb4))
* **core:**  allow string format spec in BasicTooltip ([8b382dc3](8b382dc3))



<a name="v0.56.1"></a>
## v0.56.1 (2019-04-24)


#### Features

* **chord:**  improve @nivo/chord package ([51a58c11](51a58c11))



<a name="v0.56.0"></a>
## v0.56.0 (2019-04-17)


#### Features

* **annotations:**  init @nivo/annotations package ([e0dc149d](e0dc149d))
* **axes:**
  *  move all grid & axes stuff from core ([0b564147](0b564147))
  *  add support for legends to canvas implementation ([5dcebd63](5dcebd63))
* **bar:**  use @nivo/colors for inherited colors ([c7cf5ce0](c7cf5ce0))
* **chord:**  use @nivo/colors for inherited colors ([f16f8244](f16f8244))
* **circle-packing:**  use @nivo/colors for inherited colors ([53ffed92](53ffed92))
* **colors:**
  *  use @nivo/colors for inherited colors for all packages ([e8955560](e8955560))
  *  add colorIdentity support to bar & bubble ([32e61b16](32e61b16))
  *  init @nivo/colors package ([62644b0a](62644b0a))
* **examples:**  upgrade examples dependencies ([e07f58f3](e07f58f3))
* **geo:**
  *  update choropleth screenshots ([c2f64eac](c2f64eac))
  *  add legend support to choropleth components ([bb7a0a2e](bb7a0a2e))
* **line:**  use @nivo/colors for inherited colors ([1347fd82](1347fd82))
* **pie:**  use @nivo/colors for inherited colors ([a217ab8f](a217ab8f))
* **radar:**
  *  add blend-mode support ([e46b10c9](e46b10c9))
  *  improve @nivo/radar package ([96e60be0](96e60be0))
  *  use @nivo/colors for inherited colors ([4686b2bf](4686b2bf))
* **sunburst:**  use @nivo/colors for inherited colors ([9cb6b2af](9cb6b2af))
* **swarmplot:**
  *  add support for border color ([de3e8b3a](de3e8b3a))
  *  add ability to use custom tooltip ([83f965ad](83f965ad))
  *  add support for voronoi overlay) ([4b0bcb96](4b0bcb96))
  *  init @nivo/swarmplot package ([eb593954](eb593954))
* **theming:**  add ability to theme crosshairs ([f03848f6](f03848f6))
* **treemap:**  use @nivo/colors for inherited colors ([4b5e65b6](4b5e65b6))
* **website:**
  *  update colors guide ([99e66e10](99e66e10))
  *  add inherited color control ([4a2e0c29](4a2e0c29))
  *  add swarmplot icon ([aa074697](aa074697))
  *  improve website ([7ed59e94](7ed59e94))

#### Bug Fixes

* **api:**  fix api mappings ([80b281cc](80b281cc))
* **legends:**  fix legends unit tests ([41dd564f](41dd564f))
* **sankey:**  fix broken custom node sorting (#498) ([319e7e07](319e7e07))
* **scatterplot:**  fix scatterplot voronoi overlay ([3bdc783e](3bdc783e))
* **treemap:**  add missing default colorBy ([ba91da53](ba91da53))



<a name="v0.55.0"></a>
## v0.55.0 (2019-03-27)


#### Features

* **calendar:**  add ability to align calendar in its container ([87cc6451](87cc6451))
* **core:**  remove enclosing div from container if non interactive ([149ed0f8](149ed0f8))
* **examples:**  add Bar live update example ([26dc32a8](26dc32a8))
* **geo:**
  *  add TypeScript definitions ([d818a665](d818a665))
  *  add abillity to customize label & format value ([ef499799](ef499799))
  *  migrate to react hooks ([9c5f1879](9c5f1879))
  *  add support for projection translation/rotation ([a78b293a](a78b293a))
  *  add charts' icons ([54c00402](54c00402))
  *  init geo package ([119b9e98](119b9e98))
* **publish:**  add cleanup rollup plugin ([0c707e61](0c707e61))
* **voronoi:**
  *  add TypeScript definitions ([b98f65ae](b98f65ae))
  *  add support for layers ([c16ae70d](c16ae70d))
* **website:**
  *  udpate geo icons ([8426ef5b](8426ef5b))
  *  add package to tag list ([12415ac7](12415ac7))
  *  init guide about theming ([61459b9e](61459b9e))

#### Bug Fixes

* **geo:**  fix custom layers ([069e4e61](069e4e61))



<a name="v0.54.0"></a>
## v0.54.0 (2019-03-24)


#### Features

* **calendar:**
  *  add ability to add arbitrary data ([6a46b723](6a46b723))
  *  add CalendarCanvas component ([96f8ac29](96f8ac29))
  *  add ability to define year legends position ([bf8797ae](bf8797ae))
  *  add ability to define month legends position ([9bc70928](9bc70928))
  *  avoid unnecessary layout computing ([5aa0ff5d](5aa0ff5d))
  *  add support for min/max value ([e0a46f5a](e0a46f5a))
* **sankey:**
  *  adjust labels for vertical layout ([e12cdf15](e12cdf15))
  *  add support for vertical sankey ([e299590e](e299590e))
  *  use more neutral properties for layout support ([e0a56eb6](e0a56eb6))
  *  move computing out of the rendering component ([a0c29fe4](a0c29fe4))
  *  improve support for nodes sorting ([f63450fa](f63450fa))
  *  add ability to sort nodes (#401) ([fed5fc4b](fed5fc4b))
* **website:**
  *  change sankey default layout ([a5352e41](a5352e41))
  *  use hooks for calendar pages ([fec85fa0](fec85fa0))
  *  add doc for bar label + fix stories links ([223c5e57](223c5e57))
  *  upgrade nivo packages ([775ea0b4](775ea0b4))

#### Bug Fixes

* **website:**  fix broken legends guide ([cc3cb0b1](cc3cb0b1))



<a name="v0.53.1"></a>
## v0.53.1 (2019-03-22)


#### Features

* **api:**  fix api publication ([1ec197b5](1ec197b5))
* **bar:**
  *  adjust legend data according to layout/mode/reverse ([0c0a6a18](0c0a6a18))
  *  add ability to use borders with BarCanvas ([4568516e](4568516e))
* **website:**
  *  upgrade react ([62f066b8](62f066b8))
  *  upgrade nivo packages ([991f0781](991f0781))



<a name="v0.53.0"></a>
## v0.53.0 (2019-03-21)


#### Features

* **build:**  upgrade rollup & add esm build ([f6d64802](f6d64802))
* **line:**  add support for gridXValues and gridYValues (#391) ([fd49e83d](fd49e83d))
* **sankey:**  decouple node coloring and link coloring (#404) ([c793ffd1](c793ffd1))
* **storybook:**  upgrade storybook ([670d22df](670d22df))
* **sunburst:**  allow independent child colors (#463) ([2525ad11](2525ad11))
* **theming:**  improve theming ([95dd0603](95dd0603))
* **website:**  upgrade nivo packages ([33d5508c](33d5508c))

#### Bug Fixes

* **jest:**  fix jest babel config ([da5edb0d](da5edb0d))
* **tests:**  upgrade enzyme ([d69be1fc](d69be1fc))
* **typescript:**  fix TableTooltip and LineComputedSerieDatum-type (#428) ([fd35f78e](fd35f78e))
* **website:**  fix wrong title on the guides/axes page (#441) ([91eacdbe](91eacdbe))



<a name="v0.52.1"></a>
## v0.52.1 (2019-01-24)


#### Features

* **canvas:**  add support for custom font family (#430) ([11f039e0](11f039e0))
* **scatterplot:**  set pointer as 'normal' not crosshair (#402) ([29848b87](29848b87))
* **website:**
  *  remove responsive components from explorer ([27524f18](27524f18))
  *  generate chart icons from code ([209177af](209177af))
  *  upgrade nivo packages ([d1bb0571](d1bb0571))

#### Bug Fixes

* **bar:**  Allow BarItem label property to accept React.Element ([48c8e410](48c8e410))
* **lodash:**  use scoped imports ([dea6a75f](dea6a75f))
* **typescript:**  Allow axis to be AxisProps or `null` ([5d45796f](5d45796f))



<a name="v0.52.0"></a>
## v0.52.0 (2018-12-10)


#### Features

* **api:**  move api to main nivo repo ([50245962](50245962))
* **scales:**  add support for log scale (#378) ([971925f8](971925f8))
* **website:**
  *  disable service worker ([b40d620e](b40d620e))
  *  upgrade nivo packages ([fbc78c00](fbc78c00))

#### Bug Fixes

* **bar:**  fix missing legend in Bar chart  #362 ([aa12d9d2](aa12d9d2))
* **scatterplot:**  fix wrong legend item color in ScatterPlotCanvas (#372) ([155fdfae](155fdfae))
* **website:**  use https instead of http ([07b1bade](07b1bade))



<a name="v0.51.6"></a>
## v0.51.6 (2018-11-29)


#### Features

* **bar:**  add enableGridX/enableGridY/legends support to BarCanvas (#354) ([f872aaa1](f872aaa1))
* **line:**  add support for layers to Line component ([35911df3](35911df3))



<a name="v0.51.5"></a>
## v0.51.5 (2018-11-18)


#### Features

* **bar:**  add ability to customize tooltip label ([16ae9d5c](16ae9d5c))



<a name="v0.51.4"></a>
## v0.51.4 (2018-11-18)


#### Features

* **tooltips:**  improve bar & stream tooltips ([698585fc](698585fc))



<a name="v0.51.3"></a>
## v0.51.3 (2018-11-17)


#### Features

* **scatterplot:**  add support for layers to ScatterPlot component ([f3a5a842](f3a5a842))



<a name="v0.51.2"></a>
## v0.51.2 (2018-11-14)


#### Features

* **chord:**  add support for font style for ChordCanvas ([c4f29c51](c4f29c51))



<a name="v0.51.1"></a>
## v0.51.1 (2018-11-14)


#### Features

* **bar:**  add support for layers to Bar component ([8a817ec9](8a817ec9))
* **website:**
  *  upgrade react-scripts ([db922af5](db922af5))
  *  upgrade nivo packages ([fd850795](fd850795))



<a name="v0.51.0"></a>
## v0.51.0 (2018-11-02)


#### Features

* **bubble:**  trigger onClick when isZoomable is false (#322) ([787341ac](787341ac))
* **chord:**  add support for ribbon blendmode ([2b0cfec6](2b0cfec6))
* **deps:**  upgrade deps ([be6e96e4](be6e96e4))
* **heatmap:**  use @nivo/axes package for axes ([36cd9c7b](36cd9c7b))
* **line:**
  *  add support for mix-blend-mode on areas ([c434148f](c434148f))
  *  add typescript definitions ([cfa6a59c](cfa6a59c))
* **scatterplot:**
  *  add ability to use a mesh to capture interactions ([ff9399fa](ff9399fa))
  *  add scatterplot typescript definitions ([22c930d0](22c930d0))
  *  improve scatterplot ([4ae6591d](4ae6591d))
* **website:**  upgrade nivo packages ([ddb22915](ddb22915))

#### Bug Fixes

* **chord:**  skip rendering for zero/negative radius ([647a496a](647a496a))
* **heatmap:**  fix support for enableLabels property ([a866586a](a866586a))



<a name="v0.50.0"></a>
## v0.50.0 (2018-10-17)


#### Features

* **axes:**  add `tickIndex` to Axis’ renderTick method (#305) ([93b85c0b](93b85c0b))
* **interactions:**  add support for mouseenter/leave on bar, pie & scatterplot svg (#280) ([76c8722b](76c8722b))
* **scatterplot-markers:**  add markers to scatterplot SVG (#287) ([d7192461](d7192461))
* **stream:**  add support for dots ([4860ef53](4860ef53))

#### Bug Fixes

* **website:**  remove extra space in heatmap package name ([93077734](93077734))



<a name="v0.49.1"></a>
## v0.49.1 (2018-09-08)


#### Features

* **bar:**  use @nivo/axes instead of @nivo/core for SVG axes ([3b22c6fb](3b22c6fb))
* **examples:**  upgrade retro example deps ([203f7198](203f7198))
* **website:**  upgrade nivo packages ([531e492b](531e492b))



<a name="v0.49.0"></a>
## v0.49.0 (2018-09-08)


#### Features

* **parallel-coordinates:**
  *  add support for individual axis options ([b8a39070](b8a39070))
  *  init package ([5a4db6ca](5a4db6ca))
* **theming:**  improve theming ([0040bb38](0040bb38))
* **umd:**  git ignore umd builds ([58f03a59](58f03a59))
* **website:**  upgrade nivo packages ([47a5f8a7](47a5f8a7))



<a name="v0.48.1"></a>
## v0.48.1 (2018-09-04)


#### Features

* **bullet:**  interpolate colors ([96ad5f64](96ad5f64))

#### Bug Fixes

* **build:**  add missing externals in rollup config ([e23182f2](e23182f2))
* **bullet:**  remove deprecated property titleWidth ([0c8e8bbb](0c8e8bbb))



<a name="v0.48.0"></a>
## v0.48.0 (2018-09-04)


#### Features

* **bullet:**
  *  improve @nivo/bullet package ([9154c51f](9154c51f))
  *  init @nivo/bullet package ([dc7b37f5](dc7b37f5))
* **theming:**  improve theming ([c7e7a9fe](c7e7a9fe))
* **website:**  upgrade nivo packages ([1c5fd5db](1c5fd5db))



<a name="v0.47.1"></a>
## v0.47.1 (2018-08-30)


#### Features

* **axes:**  improve tickValues support ([58aeaab0](58aeaab0))
* **website:**  upgrade nivo packages ([a88e50fd](a88e50fd))



<a name="v0.47.0"></a>
## v0.47.0 (2018-08-30)


#### Features

* **components:**  fix components display name ([84aa832d](84aa832d))
* **line:**
  *  fix line slices for time scales ([82e03d3a](82e03d3a))
  *  compute slices from scales package ([31c06c0f](31c06c0f))
  *  add story about negative values highlight ([b425e35f](b425e35f))
  *  init linear & time scale support ([3bce793a](3bce793a))
* **scales:**
  *  improve time scale support ([614038e4](614038e4))
  *  init scales package ([4324706d](4324706d))
* **storybook:**  improve components stories ([d29d21f4](d29d21f4))
* **stream:**  add info about stories ([4f98124c](4f98124c))
* **website:**
  *  change line demo data generation method ([124028de](124028de))
  *  upgrade nivo packages ([4aeed5d8](4aeed5d8))

#### Bug Fixes

* **colors:**  fix colors due to d3 packages upgrade ([a17d93bc](a17d93bc))



<a name="v0.46.0"></a>
## v0.46.0 (2018-08-26)


#### Features

* **line:**  add ability to specify grid X/Y values ([b44c8543](b44c8543))
* **radar:**  add ability to customize label ([03b3640b](03b3640b))
* **waffle:**  add ability to toggle datum by id ([7f411dae](7f411dae))
* **website:**
  *  add component to list storybook stories ([6b9ce02e](6b9ce02e))
  *  add Line legends control ([91bac9ed](91bac9ed))
  *  upgrade nivo packages ([c0f12986](c0f12986))



<a name="v0.45.0"></a>
## v0.45.0 (2018-08-26)


#### Features

* **core:**
  *  fix prop wraning when using markup for axis legend ([4152c090](4152c090))
  *  add support for string or number keys on bar/line and pie ([953c572e](953c572e))
* **deps:**  upgrade deps ([3f4b4294](3f4b4294))
* **legends:**
  *  add support for both color and fill ([4cb33e25](4cb33e25))
  *  add documentation for custom symbol shape ([7adc8381](7adc8381))
  *  add test for custom symbol shape support ([50b2d39c](50b2d39c))
  *  add support for custom symbol shape ([7419c912](7419c912))
  *  add support for basic interactivity ([527b1fa7](527b1fa7))
* **waffle:**
  *  add legend support for WaffleCanvas ([a60b34e6](a60b34e6))
  *  add legend support for Waffle ([6a5db0dd](6a5db0dd))
* **website:**
  *  add ability to manage array of props ([8f44ab94](8f44ab94))
  *  upgrade nivo packages ([4d819df6](4d819df6))

#### Bug Fixes

* **website:**  fix legends guide ([6828c33f](6828c33f))



<a name="v0.44.0"></a>
## v0.44.0 (2018-08-24)


#### Features

* **core:**
  *  remove packages directory prefix ([262a8ee9](262a8ee9))
  *  use yarn workspaces ([36999cc2](36999cc2))
* **line:**  add support for custom tooltip ([39fad124](39fad124))
* **scatterplot:**  remove unused min/max x/y ([efbda0fb](efbda0fb))
* **website:**  add option to showcase custom scatterplot tooltip ([68b72a44](68b72a44))

#### Bug Fixes

* **Makefile:**  disable command priting for packages-build recipe ([1046ee2c](1046ee2c))
* **calendar:**  fix crash when no data is empty ([5ac42141](5ac42141))
* **eslint:**  fix eslint for all packages ([27bf8d0c](27bf8d0c))
* **heatmap:**  better handling of NaN values ([02ef5577](02ef5577))



<a name="v0.43.0"></a>
## v0.43.0 (2018-06-05)


#### Features

* **calendar:**
  *  add ability to define custom tooltip ([7a076bf3](7a076bf3))
  *  add stories ([d3b8951e](d3b8951e))
  *  add ability to customize year/month legend ([a43c7082](a43c7082))
  *  add TypeScript definitions ([98106ab1](98106ab1))



<a name="v0.42.1"></a>
## v0.42.1 (2018-06-05)


#### Features

* **bar:**  add ability to define grid values ([afd1ee30](afd1ee30))
* **pie:**  adjust website & docs ([8f22f893](8f22f893))

#### Bug Fixes

* **bar:**  fix BarItem label prop type ([682cbed0](682cbed0))
* **line:**  fix LineSlices id prop type ([6f229b90](6f229b90))



<a name="v0.42.0"></a>
## v0.42.0 (2018-06-05)


#### Features

* **pie:**
  *  improve pie components ([eb14f0cb](eb14f0cb))
  *  cleanup website PieCanvas demo ([31ef9e53](31ef9e53))
  *  init support for start/end angle + PieCanvas ([52f6a9e1](52f6a9e1))
* **website:**  upgrade nivo packages ([d6eefa30](d6eefa30))



<a name="v0.41.0"></a>
## v0.41.0 (2018-05-30)


#### Features

* **sankey:**
  *  add TypeScript definitions ([c2a9d38b](c2a9d38b))
  *  add gradient & blend mode support for links ([27d56050](27d56050))
* **website:**  upgrade nivo packages ([cf62e33d](cf62e33d))



<a name="v0.40.0"></a>
## v0.40.0 (2018-05-30)


#### Features

* **bar:**  include TypeScript definition in package ([0d221c74](0d221c74))
* **heatmap:**  include TypeScript definition in package ([868620eb](868620eb))
* **pie:**
  *  add support for custom tooltip ([d3734428](d3734428))
  *  include TypeScript definition in package ([04fc931e](04fc931e))
* **radar:**  add ability to define max value ([880d7299](880d7299))
* **website:**  upgrade nivo packages ([8dadeead](8dadeead))

#### Bug Fixes

* **pie:**  fix code formatting ([1f9cf69e](1f9cf69e))
* **waffle:**  remove self import from TypeScript def ([867a545a](867a545a))



<a name="v0.39.0"></a>
## v0.39.0 (2018-05-30)


#### Features

* **waffle:**  add waffle package (#202) ([aceafc48](aceafc48))



<a name="v0.38.0"></a>
## v0.38.0 (2018-05-29)


#### Features

* **heatmap:**  init TypeScript definitions (#198) ([6c5432db](6c5432db))
* **pie:**  add TypeScript Definitions for Pie component ([0def4c31](0def4c31))
* **tooltips:**  add support for custom tooltips for bubble charts and treemaps (#200) ([092f3e0c](092f3e0c))
* **website:**
  *  fix treemap source code for treemap components ([b97c07b8](b97c07b8))
  *  restore scrol position when pathname changes ([49b7ffca](49b7ffca))
  *  use BrowserRouter instead of HashRouter ([a360e444](a360e444))
  *  upgrade nivo packages ([69deaa17](69deaa17))



<a name="v0.37.0"></a>
## v0.37.0 (2018-05-19)


#### Features

* **heatmap:**  add support for onClick event ([52d077c7](52d077c7))
* **website:**  upgrade nivo packages ([5f416e9a](5f416e9a))



<a name="v0.36.0"></a>
## v0.36.0 (2018-05-19)


#### Features

* **bar:**  improve custom tooltip support ([5816555e](5816555e))
* **tooltips:**  add support for configurable tooltips for bar charts and heat maps (#159) ([82473c10](82473c10))
* **website:**  upgrade nivo packages ([8d8374a3](8d8374a3))



<a name="v0.35.2"></a>
## v0.35.2 (2018-05-19)


#### Features

* **website:**  upgrade nivo packages ([66a7208c](66a7208c))

#### Bug Fixes

* **lodash:**  add missing deps & use scoped imports ([f04660f2](f04660f2))



<a name="v0.35.1"></a>
## v0.35.1 (2018-05-19)


#### Bug Fixes

* **generators:**  use modules ([9cec118c](9cec118c))



<a name="v0.35.0"></a>
## v0.35.0 (2018-05-19)


#### Features

* **ci:**  update travis config ([25e4cdca](25e4cdca))
* **deps:**  use yarn with lerna & add missing yarn.lock files ([42675e47](42675e47))
* **legends:**  add default text color + canvas support for text color ([20a30ab8](20a30ab8))
* **lint:**  centralize lint command & config ([e8e38da4](e8e38da4))
* **packages:**  use rollup for packages build ([f24cb08d](f24cb08d))
* **pie:**  add support for onClick event ([b171044e](b171044e))
* **react:**  nivo now require react >= 16.2.0 < 17.0.0 ([f64d3ef6](f64d3ef6))
* **stack:**  make line areas stack in front of each other visibly #152 ([8ec91a66](8ec91a66))
* **tests:**  centralize test command & dependencies ([eda819ca](eda819ca))
* **website:**  improve chart tabs ([2c2265f5](2c2265f5))

#### Bug Fixes

* **deps:**  do not ignore yarn.lock ([1a60cfb8](1a60cfb8))
* **scripts:**  fix make targets documentation ([48d87ec2](48d87ec2))
* **security:**  Upgrade transitive hoek dep ([50d6fd52](50d6fd52))
* **storybook:**  fix storybook packages import ([d3abafdc](d3abafdc))
* **website:**  fix website Stream example code (#188) ([129572e6](129572e6))



<a name="v0.34.0-1"></a>
## v0.34.0-1 (2017-12-18)


#### Features

* **chord:**
  *  update @nivo/chord directory layout ([a143d80f](a143d80f))
  *  init tests for @nivo/chord package ([a0622609](a0622609))
* **composition:**  init more granular approach to components ([da5c6fbf](da5c6fbf))
* **legends:**  init SizeLegendSvg ([22c186ad](22c186ad))
* **line:**
  *  fix dot label color ([330720ce](330720ce))
  *  init tests & eslint for @nivo/line package ([5bf09098](5bf09098))
  *  add support for empty values + custom x scale + stacking ([4690cbc4](4690cbc4))
  *  remove unused component ([bfec8288](bfec8288))
  *  add LineChartCanvas component ([be930613](be930613))
  *  rework stories ([05ea88f7](05ea88f7))
  *  add LineChartSvg component ([42f1cfe3](42f1cfe3))
  *  restore ability to animate line & line area ([d517c521](d517c521))
* **sankey:**  init tests & eslint for @nivo/sankey package ([b4428b1e](b4428b1e))
* **scales:**  add support for time scale ([28e8ebff](28e8ebff))
* **screenshots:**  update packages screenshots ([a39731c3](a39731c3))
* **website:**
  *  make chart demo layout consistent across chart types ([f3166062](f3166062))
  *  improve chart tabs ([c32c5729](c32c5729))
  *  add illustration to @nivo/line low level components doc ([5ddaede9](5ddaede9))
  *  add @nivo/line low level components doc ([cf8a5caa](cf8a5caa))
  *  upgrade @nivo packages ([71e1c4b0](71e1c4b0))

#### Bug Fixes

* **eslint:**  fix eslint for some packages ([22b6bf6e](22b6bf6e))
* **line:**  avoid re-rerendering LineDots ([a6f51379](a6f51379))



<a name="v0.33.0"></a>
## v0.33.0 (2017-12-09)


#### Features

* **scatterplot:**
  *  add tests and stories ([bbc03444](bbc03444))
  *  add support for tooltips on ScatterPlotCanvas ([42a17314](42a17314))
  *  add scatterplot package ([52fab5f9](52fab5f9))

#### Bug Fixes

* **chord:**  fix broken imports ([252efc0f](252efc0f))



<a name="v0.33.0-8"></a>
## v0.33.0-8 (2017-12-09)


#### Features

* **scatterplot:**  add support for tooltips on ScatterPlotCanvas ([fc01970b](fc01970b))



<a name="v0.33.0-7"></a>
## v0.33.0-7 (2017-12-09)




<a name="v0.33.0-6"></a>
## v0.33.0-6 (2017-12-09)


#### Bug Fixes

* **chord:**  fix broken imports ([1021624a](1021624a))



<a name="v0.33.0-5"></a>
## v0.33.0-5 (2017-12-09)


#### Features

* **api:**  remove empty api package ([dd47b293](dd47b293))
* **bar:**  add support for legends on Bar component ([6f22a4ab](6f22a4ab))
* **calendar:**  add support for legends on Calendar component ([6ef9dc20](6ef9dc20))
* **chord:**  add support for legends on Chord component ([39212ef4](39212ef4))
* **commands:**  sort Makefile help ([4f7a872c](4f7a872c))
* **dev:**  add commands to list/rm currently linked packages for website ([df1d3085](df1d3085))
* **examples:**
  *  ensure examples build successfully on CI ([2ad46b7a](2ad46b7a))
  * fix retro example dependencies ([2c84d014](2c84d014))
* **legends:**  init legends package ([4063428b](4063428b))
* **line:**  add support for legends on Line component ([b7cc2449](b7cc2449))
* **linting:**  add eslint on several packages ([38ba981d](38ba981d))
* **pie:**  add support for legends on Pie component ([8c3004be](8c3004be))
* **publish:**  add packages build prior to publish ([c6f9810b](c6f9810b))
* **radar:**  add support for legends on Radar component ([8d53e13b](8d53e13b))
* **sankey:**  add support for legends on Sankey component ([0082fb98](0082fb98))
* **scatterplot:**  add scatterplot package ([ff7610c6](ff7610c6))
* **stream:**  add support for legends on Stream component ([79395355](79395355))
* **website:**
  *  upgrade @nivo packages ([2da761d8](2da761d8))
  *  upgrade @nivo packages ([4b60e426](4b60e426))
  *  upgrade @nivo packages ([429bd5f0](429bd5f0))



<a name="v0.33.0-4"></a>
## v0.33.0-4 (2017-12-08)


#### Features

* **bar:**  add support for legends on Bar component ([09b0a2a9](09b0a2a9))
* **calendar:**  add support for legends on Calendar component ([3a547223](3a547223))
* **chord:**  add support for legends on Chord component ([daeb4d4c](daeb4d4c))
* **dev:**  add commands to list/rm currently linked packages for website ([3c5f0fdb](3c5f0fdb))
* **legends:**  init legends package ([56c5f99c](56c5f99c))
* **line:**  add support for legends on Line component ([b6a45955](b6a45955))
* **pie:**  add support for legends on Pie component ([d22faa6e](d22faa6e))
* **publish:**  add packages build prior to publish ([9a10a459](9a10a459))
* **radar:**  add support for legends on Radar component ([415ac596](415ac596))
* **sankey:**  add support for legends on Sankey component ([feccf224](feccf224))
* **stream:**  add support for legends on Stream component ([b0421f5c](b0421f5c))
* **website:**
  *  upgrade @nivo packages ([005e21af](005e21af))
  *  upgrade @nivo packages ([2a0f2d03](2a0f2d03))



<a name="v0.33.0-3"></a>
## v0.33.0-3 (2017-12-07)


#### Features

* **chord:**  add support for legends on Chord component ([9708b531](9708b531))
* **sankey:**  add support for legends on Sankey component ([3cfe7ec1](3cfe7ec1))



<a name="v0.33.0-2"></a>
## v0.33.0-2 (2017-12-07)


#### Features

* **pie:**  add support for legends on Pie component ([7092fbeb](7092fbeb))



<a name="v0.33.0-1"></a>
## v0.33.0-1 (2017-12-07)


#### Features

* **dev:**  add commands to list/rm currently linked packages for website ([c359a21b](c359a21b))
* **publish:**  add packages build prior to publish ([e37eb388](e37eb388))
* **stream:**  add support for legends on Stream component ([66c475ae](66c475ae))
* **website:**  upgrade @nivo packages ([65694f8d](65694f8d))



<a name="v0.33.0-0"></a>
## v0.33.0-0 (2017-12-07)


#### Features

* **calendar:**  add support for legends on Calendar component ([2ff2aeb3](2ff2aeb3))
* **chord:**  add source code for chord stories ([489f36fc](489f36fc))
* **legends:**  init legends package ([c27aae45](c27aae45))
* **line:**  add support for legends on Line component ([d53614f8](d53614f8))
* **radar:**  add support for legends on Radar component ([eec6ac5c](eec6ac5c))
* **website:**  upgrade website @nivo packages ([81adc8d0](81adc8d0))

#### Bug Fixes

* **readme:**  fix misleading installation instructions ([0a5120f7](0a5120f7))



<a name="v0.32.0"></a>
## v0.32.0 (2017-12-06)


#### Features

* **code style:**  add prettier formatting ([9a550eb8](9a550eb8))
* **d3:**  use caret range instead of fixed version for d3 deps ([9598511c](9598511c))
* **demo:**
  *  add command to deploy demo website + storybook ([e2f5c581](e2f5c581))
  *  remove unused deps ([eaff4d8b](eaff4d8b))
* **generators:**  use @nivo/generators instead of nivo-generators ([e65976d8](e65976d8))
* **lerna:**  exclude demo & examples from lerna ([aa255ebf](aa255ebf))
* **packages:**  add command to deploy all packages ([7467315c](7467315c))
* **split:**  init multi packages ([158a349d](158a349d))
* **tests:**  restored existing tests ([e4cf806f](e4cf806f))
* **website:**
  *  upgrade @nivo packages ([697e8aa5](697e8aa5))
  *  rename demo to website ([dadc8f58](dadc8f58))

#### Bug Fixes

* **babel-preset:**  add missing ignored script ([17ac44e1](17ac44e1))
* **split:**
  *  add missing deps ([e0763870](e0763870))
  *  add missing deps ([c5461363](c5461363))
  *  add missing dep react-motion ([cefabeb9](cefabeb9))



<a name="v0.32.0-12"></a>
## v0.32.0-12 (2017-12-06)


#### Features

* **generators:**  use @nivo/generators instead of nivo-generators ([a055d0e5](a055d0e5))



<a name="v0.32.0-11"></a>
## v0.32.0-11 (2017-12-06)


#### Features

* **code style:**  add prettier formatting ([2f9a29b2](2f9a29b2))
* **packages:**  add command to deploy all packages ([36e87edb](36e87edb))
* **tests:**  restored existing tests ([dc2b08bc](dc2b08bc))



<a name="v0.32.0-10"></a>
## v0.32.0-10 (2017-12-06)


#### Features

* **demo:**
  *  add command to deploy demo website + storybook ([968e645f](968e645f))
  *  remove unused deps ([770f521a](770f521a))
* **lerna:**  exclude demo & examples from lerna ([5c815ccc](5c815ccc))
* **website:**  rename demo to website ([14a375c1](14a375c1))



<a name="v0.32.0-9"></a>
## v0.32.0-9 (2017-12-06)


#### Bug Fixes

* **split:**  add missing deps ([0c222f70](0c222f70))



<a name="v0.32.0-8"></a>
## v0.32.0-8 (2017-12-06)


#### Features

* **d3:**  use caret range instead of fixed version for d3 deps ([fa47e01e](fa47e01e))



<a name="v0.32.0-7"></a>
## v0.32.0-7 (2017-12-06)


#### Bug Fixes

* **split:**  add missing deps ([dd9676bd](dd9676bd))



<a name="v0.32.0-5"></a>
## v0.32.0-5 (2017-12-06)


#### Bug Fixes

* **split:**  add missing dep react-motion ([74e0bf54](74e0bf54))



<a name="v0.32.0-4"></a>
## v0.32.0-4 (2017-12-06)




<a name="v0.32.0-3"></a>
## v0.32.0-3 (2017-12-05)




<a name="v0.32.0-2"></a>
## v0.32.0-2 (2017-12-05)




<a name="v0.32.0-1"></a>
## v0.32.0-1 (2017-12-05)




