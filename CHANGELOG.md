<a name="v0.66.0"></a>
## v0.66.0 (2020-11-27)


#### Features

* **bar:**  add the ability to round index scale (#1282) ([1ab12579](https://github.com/plouc/nivo/commit/1ab12579594baa2eb2c89e65c6bdf81a0e85cfd0))

#### Bug Fixes

* **bar:**  fix stacked bars when key is missing (#1291) ([484235ff](https://github.com/plouc/nivo/commit/484235ff44bf3cb516e906f8c2b101669b17fc8a))
* **changelog:**  update clog to allow setting a tag date (#1278) ([e984d72b](https://github.com/plouc/nivo/commit/e984d72beab35644a437d87ce7d2d6f8811eef10))
* **core:**  add missing properties back to theme type (#1292) ([681e0c28](https://github.com/plouc/nivo/commit/681e0c28fcf8ef593a8d5bc71b7b3256342982ac))

#### Chore

* **build:**  bump any nivo peer dep on version mismatch ([b0dd147c](https://github.com/plouc/nivo/commit/b0dd147c7f21074afaac9bbda1a27f2c01cdafc4))



<a name="v0.65.1"></a>
## v0.65.1 (2020-11-17)


#### Chore

* **build:**  add version script to bump peer dependencies on new version ([ea55db20](https://github.com/plouc/nivo/commit/ea55db2054b240cd0e8f90f55d635cec9b85ed88))
* **changelog:**  update changelog ([1d5a4830](https://github.com/plouc/nivo/commit/1d5a4830865210eebbd6eb705420978f55aa4848))



<a name="v0.65.0"></a>
## v0.65.0 (2020-11-17)


#### Features

* **BarCanvas:**
  *  allow to use ref to access the underlying canvas ([fb91ca4e](https://github.com/plouc/nivo/commit/fb91ca4e0cb4d53754fa75bf2f0a2825b78b4129))
  *  add a ref to access the canvas ([ce5b67a1](https://github.com/plouc/nivo/commit/ce5b67a10a42bf8b1be9735ec1823cfaf75d1e7b))
* **axes:**  adjustments for react-spring@next ([46dbb5a4](https://github.com/plouc/nivo/commit/46dbb5a45de31674bab92efe89dd576ac1aafbf8))
* **bar:**  add BarItem component to the exposed package API (#1261) ([df211c03](https://github.com/plouc/nivo/commit/df211c036c50a285f40eb81609f3840a286424dc))
* **bullet:**
  *  adjustments for react-spring@next ([c567ae18](https://github.com/plouc/nivo/commit/c567ae18f97ed0349105f6a55a82f655af6465c5))
  *  convert stories to typescript ([b2894a91](https://github.com/plouc/nivo/commit/b2894a91272f18e86801927947647e323e7893c5))
  *  switch from react-motion to react-spring ([04f07093](https://github.com/plouc/nivo/commit/04f0709341c1c7371722bb110dc9eb275b416120))
  *  convert to functional components ([3f63fd99](https://github.com/plouc/nivo/commit/3f63fd99fdca967f1046f3c7acce10d98306da07))
  *  remove recompose dependency ([ff7f1bc8](https://github.com/plouc/nivo/commit/ff7f1bc86aba13937f4475524976c80319d16427))
  *  init package migration to typescript ([d07378a3](https://github.com/plouc/nivo/commit/d07378a349631728bf14a3df2ff1ac74b64442aa))
* **colors:**
  *  update package typings according to TypeScript migration ([e98d8e07](https://github.com/plouc/nivo/commit/e98d8e071ae474526621761ba03d608d9a2971ec))
  *  migrate ordinalColorScale to TypeScript ([7bb42c68](https://github.com/plouc/nivo/commit/7bb42c688c718c68d5d734dbf401156cc04da496))
  *  migrate prop types to TypeScript ([6bf1f7d4](https://github.com/plouc/nivo/commit/6bf1f7d429a182776bed2d64778eebeb4f25dd20))
  *  rename InheritedColorProp to InheritedColor in all package typings ([29a73083](https://github.com/plouc/nivo/commit/29a73083447fec20d397f9dafc8a29694b516f73))
  *  migrate inheritedColor to TypeScript ([436117da](https://github.com/plouc/nivo/commit/436117dae71499a3db6db1129462a74bed4f7ac1))
  *  migrate motion to TypeScript ([e1785918](https://github.com/plouc/nivo/commit/e1785918de1eb57af7ca755ce3c3f1fb9b42d562))
  *  add typings for color schemes and interpolators ([1093da12](https://github.com/plouc/nivo/commit/1093da12ac0ec2e11b455d823f0749dc1a5277f6))
  *  init TypeScript migration ([2383b4d5](https://github.com/plouc/nivo/commit/2383b4d5c88b7e3b64deb66859b134faefa6cf7e))
* **core:**
  *  add proper type for useTheme hook ([66d2f4f0](https://github.com/plouc/nivo/commit/66d2f4f09b2d9a47258779ebb199e8741a0e1658))
  *  add missing spring config to Container ([25aa18fb](https://github.com/plouc/nivo/commit/25aa18fbdd0a8b5a97d31fac425b61bc57f401b2))
* **line:**  forward ref to the canvas element ([4be9c8ab](https://github.com/plouc/nivo/commit/4be9c8ab2e7e8315dccce28673ca52afd9e8a199))
* **marimekko:**
  *  fix doc typos and add missing custom layer props to the doc ([ae4c329c](https://github.com/plouc/nivo/commit/ae4c329cc59c3f0a74cd4ace886762e7e96d0305))
  *  update README preview ([ca4a0d66](https://github.com/plouc/nivo/commit/ca4a0d6628b36a104c22dd5a23d1d606c6cfb423))
  *  add support for legends ([f39f12a7](https://github.com/plouc/nivo/commit/f39f12a700ed37131650ff16c61b794f5a484628))
  *  add story about custom layers ([8560b6ad](https://github.com/plouc/nivo/commit/8560b6ad2acce4856074a28ecf61aa34580dbb9d))
  *  add support for value formatter ([c5429db2](https://github.com/plouc/nivo/commit/c5429db2761103a086a4c078f684d8ff910494a8))
  *  add icons and preview for README ([71b06a84](https://github.com/plouc/nivo/commit/71b06a84360750479127e94f4b8ecbb2a5de1120))
  *  add bar groups position and dimensions to layers context ([8ba4c018](https://github.com/plouc/nivo/commit/8ba4c018e0c16c99cd5649f267771386fe184957))
  *  add support for patterns and gradients ([d75a3952](https://github.com/plouc/nivo/commit/d75a3952b351778fff831e30393f13317a85e599))
  *  fix vertical layout and diverging offset ([604b523f](https://github.com/plouc/nivo/commit/604b523f7240332b5e713ddbf8545ef46cc51525))
  *  add support for axes and grid ([8e4cd0d6](https://github.com/plouc/nivo/commit/8e4cd0d659c79485aadd688d3947458959e4363f))
  *  add support for custom tooltip ([ed74e9f1](https://github.com/plouc/nivo/commit/ed74e9f11aee80f001450e33ccedfd6de94ab08f))
  *  expose thickness and dimensions scale ([914f1857](https://github.com/plouc/nivo/commit/914f1857c19f56a3e3e732f050ea1e25525175e2))
  *  add the ability to configure the stack offset ([a8437cca](https://github.com/plouc/nivo/commit/a8437ccab00f25192a46e262b384687059fb0afc))
  *  add stories ([6b6aa949](https://github.com/plouc/nivo/commit/6b6aa949c1fc72cd38c71fca424b9e70765300e4))
  *  pass default props to InnerMarimekko ([bb85398f](https://github.com/plouc/nivo/commit/bb85398f70f1192ae40664754a954f68c7787628))
  *  improve motion configuration ([7df05809](https://github.com/plouc/nivo/commit/7df05809689bb95b5ec1b82aa41dfb841e6a1497))
  *  add support for mouse handlers ([4f244ea3](https://github.com/plouc/nivo/commit/4f244ea346b87dfd9e10e0051287dab98248878a))
  *  improve documentation about data props ([3178ce81](https://github.com/plouc/nivo/commit/3178ce81f70371f1c18f5bbd9dc806c810aa7699))
  *  compute bars from top level component and pass them to custom layers ([146a04b2](https://github.com/plouc/nivo/commit/146a04b219a24afcd3b9749a04bf3d41a9aeb427))
  *  use react-spring@next and add animation support to bars ([001b6719](https://github.com/plouc/nivo/commit/001b6719072fd47b480a87f1575d7009d003e0f6))
  *  add to website and improve bars ([5f18b057](https://github.com/plouc/nivo/commit/5f18b057fb46d9cd2305f2b56187d58e46a5dd25))
  *  init package ([35556143](https://github.com/plouc/nivo/commit/35556143d9d786f7ede30ba0698cb3a77fa57d44))
* **parallel-coordinates:**  adjustments for react-spring@next ([df7d665c](https://github.com/plouc/nivo/commit/df7d665c232249028ba96116eb78838d4fe429cb))
* **scales:**  exclude null and undefined values in log scale validation (#1099) ([c87eba7d](https://github.com/plouc/nivo/commit/c87eba7d6e7539bc5de1a864d116191f852b9471))
* **sunburst:**  add mouse events and some labels (#880) ([1b3dd8f0](https://github.com/plouc/nivo/commit/1b3dd8f0844cad8d41bd0f46c41469ee0c73537b))
* **tooltip:**
  *  add a display name to memoized components to ease testing ([218e237f](https://github.com/plouc/nivo/commit/218e237f1db2329ad59f37f75926973b6538a713))
  *  migrate TableTooltip component to TypeScript ([0a54e62f](https://github.com/plouc/nivo/commit/0a54e62fc87bcaaeaa3342fe13056ed778050562))
  *  migrate Crosshair component to TypeScript ([1416e8cf](https://github.com/plouc/nivo/commit/1416e8cfb070fa3c038aaa5379b6e18ffe5ad1c1))
  *  ensure we only render the tooltip when the charts are interactive ([6623000f](https://github.com/plouc/nivo/commit/6623000f54d1f97e8cf0df8303129703084d4ffa))
  *  remove usage of tooltip prop types from other packages ([8addc8d4](https://github.com/plouc/nivo/commit/8addc8d4ec48d838ce871e78214e89c515d7fed7))
  *  adapt BasicTooltip for new typings ([cb87d9a4](https://github.com/plouc/nivo/commit/cb87d9a4e06b9e8cacf8387aa0f43f691aa3a88e))
  *  remove prop types ([b187c618](https://github.com/plouc/nivo/commit/b187c6186e22e12679889dcd5e7afd46469dae8f))
  *  init TypeScript migration ([3413142d](https://github.com/plouc/nivo/commit/3413142d056830bffef4f39e8550020928098b3b))
* **treemap:**  adjustments for react-spring@next ([e5611c30](https://github.com/plouc/nivo/commit/e5611c3064908713f811ffc0ff4e5bb4483244bb))

#### Bug Fixes

* **BarCanvas:**  stories demonstrating the canvas ref ([96cff43e](https://github.com/plouc/nivo/commit/96cff43e69bbf77a47959b51a4d4693e5d4e032a))
* **bar:**
  *  add new prop valueScale to BarCanvas (#1274) ([d66acd6a](https://github.com/plouc/nivo/commit/d66acd6ad130b6ada3aeff493c85d878581ab727))
  *  fix lint errors ([640c883b](https://github.com/plouc/nivo/commit/640c883be1a51834ea6abb087f8e727c22f15ade))
  *  prevent missing values causing bad scales (#1257) ([b9687754](https://github.com/plouc/nivo/commit/b96877547f504ba6249bc0df4bd92ddf29f7992c))
* **bullet:**
  *  make dimensions required props ([8451c279](https://github.com/plouc/nivo/commit/8451c279099d3931afc35950ae52aa22b84ee7f6))
  *  fix linting errors round 3 ([a5eac4a9](https://github.com/plouc/nivo/commit/a5eac4a910601678522148c95fcec58e1264a8ce))
  *  fix linting errors round 2 ([c446b46c](https://github.com/plouc/nivo/commit/c446b46cb98bdcff19d299b9e3fbc9a0363067ed))
  *  fix linting errors ([3df88ed5](https://github.com/plouc/nivo/commit/3df88ed5db3bb8556116b9ccdec6df22bbf7d115))
  *  fix website paths ([8dd28feb](https://github.com/plouc/nivo/commit/8dd28febc9618275e019d95cac9f57ac7c4ea838))
  *  fix tslint errors ([b6f67018](https://github.com/plouc/nivo/commit/b6f6701849ab8aecf2f6e82a84a592ede9b1a322))
* **core:**  add useDimensions hook to types ([4ce35386](https://github.com/plouc/nivo/commit/4ce35386d16dc1a7d3a088a5246d5fbd7ab75c48))
* **funnel:**  fix lint errors ([e66b51c5](https://github.com/plouc/nivo/commit/e66b51c531e02bea99d24e058b756ab7ee164211))
* **geo:**  fix lint errors ([bc398839](https://github.com/plouc/nivo/commit/bc398839d75ceccef6652e74d11a949e28be101d))
* **legends:**  fix lint errors ([275b2b55](https://github.com/plouc/nivo/commit/275b2b557008ef3d7409ce32fa21758afd7253e0))
* **line:**
  *  add a stories for the responsive canvas component ([0fe9c9d3](https://github.com/plouc/nivo/commit/0fe9c9d305541890132cf203e1260719ca8c733e))
  *  add a story showcasing the usage of the ref in canvas ([190acd7e](https://github.com/plouc/nivo/commit/190acd7e9487f388aaaeddcd156a87e971a6306d))
* **motion:**  replace deprecated  method with the new  helper ([57b27d8d](https://github.com/plouc/nivo/commit/57b27d8d0052372a8102ce48424aefd5641b0862))
* **packages:**  allow react 17 in peer dependencies ([a4f370b4](https://github.com/plouc/nivo/commit/a4f370b464b452038e3a68ed75dc475c5ed69f18))
* **pie:**
  *  fix typings issues due to better d3 types ([ad9cc2c6](https://github.com/plouc/nivo/commit/ad9cc2c61df170532f6b9d93f1428b73390a611f))
  *  make dimensions required props ([d502a409](https://github.com/plouc/nivo/commit/d502a40982894025e5d2e2a626b2efe92923dd8c))
  *  fix incomplete type for valueFormat ([0793553e](https://github.com/plouc/nivo/commit/0793553e73254db70586de093efc5c898f21548b))
* **storybook:**  move bar/race chart story to main bar stories (#1258) ([e9c5932d](https://github.com/plouc/nivo/commit/e9c5932d92f933259f15b73048f750dd220b44ce))
* **sunburst:**  apply my own fixes from pr review ([cbb9e37a](https://github.com/plouc/nivo/commit/cbb9e37acbcdf82cb72af78c8afccd23254ca050))
* **tooltip:**
  *  fix typings due to core adjustments ([87e5edb2](https://github.com/plouc/nivo/commit/87e5edb2588fbcfecd245a1bb28775e356350b18))
  *  export useTooltip hook in types ([7eb1b30b](https://github.com/plouc/nivo/commit/7eb1b30b6210620d83c51b8e81692acafa4ecb13))
* **website:**
  *  patch react-spring due to known issue with Gatsby ([c35b4e96](https://github.com/plouc/nivo/commit/c35b4e96c6f7103f3400ff02fc2b423eb741081b))
  *  changes to get deployment to work ([09f46839](https://github.com/plouc/nivo/commit/09f468393643580bb6d2c2fdb35c01d737109a4b))

#### Chore

* **bullet:**  add proper tests ([6168b680](https://github.com/plouc/nivo/commit/6168b6809bca15047495e1383bbe932741cde20e))
* **changelog:**  update changelog ([ea1ff453](https://github.com/plouc/nivo/commit/ea1ff453e30d9890a858b39e90026d7cf1d80b8a))
* **core:**  move @nivo/core to peer deps and add it to dev deps ([d22679c0](https://github.com/plouc/nivo/commit/d22679c0bb3369763f757ca73d26410a47a95092))
* **deps:**
  *  pin react-spring version ([3ba34a22](https://github.com/plouc/nivo/commit/3ba34a22aed3c85f09976f6afee0b42805a04a40))
  *  add repository field to every package.json (#1268) ([7f50401b](https://github.com/plouc/nivo/commit/7f50401bc041191311a5774f11a4bbff487ab91f))
* **lint:**
  *  add eslint-plugin-prettier ([daa9262a](https://github.com/plouc/nivo/commit/daa9262a416021e5728e4a79e44d4105d4ece8e6))
  *  switch from tslint to eslint ([10642f16](https://github.com/plouc/nivo/commit/10642f169c0edea66637e0d1ca041b9ed9c5c602))



<a name="v0.64.0"></a>
## v0.64.0 (2020-11-06)


#### Features

* **bar:**  add ability to set scale config via `valueScale` prop (#1183) ([bea61cd9](https://github.com/plouc/nivo/commit/bea61cd9b5f0e8dfc37ce2d776c592e0a3bebdfd))
* **build:**
  *  prevent types removal when building a package ([f0c6ca8f](https://github.com/plouc/nivo/commit/f0c6ca8ff5e3d5cc95640b8f28ff9671ba35a607))
  *  generate package types during build if tsconfig exists ([e50cc92a](https://github.com/plouc/nivo/commit/e50cc92aa610f7baa7b1021e98da58c81338d600))
  *  remove types generation from package build target ([95bec3c2](https://github.com/plouc/nivo/commit/95bec3c2d48a87c86ecd6b44820ecae375972ac8))
  *  include types generation in build make target ([39da664b](https://github.com/plouc/nivo/commit/39da664b12618dc46fc8f36490a91bd3960a86e1))
  *  update build tools ([d481cfe5](https://github.com/plouc/nivo/commit/d481cfe53f2a567496f8d33ae38ea08fffb11de2))
  *  add build config for optional typescript support ([6990e3f7](https://github.com/plouc/nivo/commit/6990e3f7fdcc68f4c6a03ded3100ad2cbfb9168f))
  *  add size and bundle stats rollup plugins ([c629c81f](https://github.com/plouc/nivo/commit/c629c81ff07416c53e54c1349843e0ae539d44ea))
* **ci:**
  *  fix example sandbox formatting ([7f698ade](https://github.com/plouc/nivo/commit/7f698adec9dba77988bbe83e360865cfc46744f9))
  *  rename example sandbox ([1df58b6d](https://github.com/plouc/nivo/commit/1df58b6dfa2f508750ecdba76b7b3e7b3ab28658))
  *  add example sandbox with all nivo packages pre-installed ([9007093f](https://github.com/plouc/nivo/commit/9007093fa8852078edecba02d4c8feabe46e51f3))
  *  update sandboxes for codesandbox-ci ([3932a099](https://github.com/plouc/nivo/commit/3932a099bcde55a8fff385d12a91976690fe5828))
  *  enable codesandbox-ci ([98257ff5](https://github.com/plouc/nivo/commit/98257ff59aab0839088859a11f8fa0a6c134ce07))
* **example:**  update retro example ([54c7af5c](https://github.com/plouc/nivo/commit/54c7af5cc4f8a7c1588875aea046ce3b7559c16c))
* **fmt:**  add missing tsx extension when checking formatting ([bd08b37e](https://github.com/plouc/nivo/commit/bd08b37e2d56014f29f7b9ffcbf90a1c414df017))
* **infrastructure:**  add stale bot config ([87a56e41](https://github.com/plouc/nivo/commit/87a56e41729fd5bb15d9553ababc56ce4db63214))
* **pie:**
  *  use nullish operator to extract datum label ([525fb5a8](https://github.com/plouc/nivo/commit/525fb5a82cd7e1f3cd68ee422569273d7951031d))
  *  properly handle possible presence of label on raw datum ([840a6cbc](https://github.com/plouc/nivo/commit/840a6cbc84e8bf69b2ebdea6062831745143f523))
  *  rename generics raw datum type to RawDatum instead of R ([f71cd5b5](https://github.com/plouc/nivo/commit/f71cd5b5052d7348c59113b2da1b35e796b85864))
  *  use optional chaining and nullish coalescing ([a770ed51](https://github.com/plouc/nivo/commit/a770ed518f8939f97e9c183db7142013a0f95f6e))
  *  get default pixel ratio from window if available ([ff242a95](https://github.com/plouc/nivo/commit/ff242a959116411f3398040f4fe14ff1dbe2a3f7))
  *  remove unnecessary ts ignore ([e9898aef](https://github.com/plouc/nivo/commit/e9898aef9c4e50c1f47611c5c050c2e8e6444b9a))
  *  finalize TypeScript migration ([60c80a90](https://github.com/plouc/nivo/commit/60c80a906e082febb9209feebae425372820468e))
  *  remove definitions file to types ([e84d3a9b](https://github.com/plouc/nivo/commit/e84d3a9b195f43eb5f0a543b905fcf76d48b084b))
  *  init pie package migration to typescript ([9fd5cee1](https://github.com/plouc/nivo/commit/9fd5cee1d6fe98fc10d497aaaac167afb44681f1))
  *  add tests to check various layouts ([0335b6d2](https://github.com/plouc/nivo/commit/0335b6d242e54241bc6a848e74951a9b51cec9b0))
  *  add tests for legends ([ba4fb4de](https://github.com/plouc/nivo/commit/ba4fb4ded8ef3c25bf2c91e56395c024fd884a22))
  *  improve TypeScript definitions ([d0a104e5](https://github.com/plouc/nivo/commit/d0a104e55ee060c22dce0cc8c36e8855b499abc7))
  *  change tooltip override management to disable default wrapper ([0f3eaed4](https://github.com/plouc/nivo/commit/0f3eaed4f0bb2d5dbf22c0be7ff12ca4d4843876))
  *  add tests for radial labels ([8cd3180a](https://github.com/plouc/nivo/commit/8cd3180a803b8730d02b6882f7de56b033562ba9))
  *  adapt swarmplot example using usePie hook ([d02e1e90](https://github.com/plouc/nivo/commit/d02e1e906626a1c0e60c4a17078e4d1ac64500c7))
  *  add missing props to API example ([615e3502](https://github.com/plouc/nivo/commit/615e350253358e00d13fead568d859f0bcf968c4))
  *  add tests for interactivity ([3f4f17e6](https://github.com/plouc/nivo/commit/3f4f17e6e78fc291a6eda320379d886d3eec7f5d))
  *  add story to showcase custom layers ([17b129d2](https://github.com/plouc/nivo/commit/17b129d26e73149ccbfd7f2e7071354ac20b79f3))
  *  add story to showcase the ability to use colors defined in dataset ([92f19c28](https://github.com/plouc/nivo/commit/92f19c289d83fc22dd446b4c10e69c8430ad44a4))
  *  add support for extra interactivity handlers ([ebaf86e6](https://github.com/plouc/nivo/commit/ebaf86e67807359c17d5e7458d5bd2eff3d373f8))
  *  use same tooltip for both svg and canvas implementations ([baa8af89](https://github.com/plouc/nivo/commit/baa8af89405ed9b3b8e09ffded3b9cceb5278155))
  *  improve PieSlice component ([b2c2bf1f](https://github.com/plouc/nivo/commit/b2c2bf1fb05633bdbbc16c9ef15bd8afae9f4350))
  *  memoize radial labels computation ([dbab51b2](https://github.com/plouc/nivo/commit/dbab51b28540cc724bb3a427f56dd9148720370b))
  *  honor isInteractive for svg implementation ([2a8cded4](https://github.com/plouc/nivo/commit/2a8cded423b4a458b298ab33488d29769d326311))
  *  use same computation for radial labels for both SVG and canvas implementations ([1c3f704d](https://github.com/plouc/nivo/commit/1c3f704d98d8c1835674c520c6de50710aaa8c2e))
  *  add tests for slice labels ([fd5b0470](https://github.com/plouc/nivo/commit/fd5b047041bc5e82f31847eafff014d9ebd712d0))
  *  use same computation for slice labels for both SVG and canvas implementations ([c22be686](https://github.com/plouc/nivo/commit/c22be686939203a4e37708032b47f1153b411853))
  *  add support for sliceLabelsRadiusOffset ([d913f50c](https://github.com/plouc/nivo/commit/d913f50c652fd1a558854e755af44024dfb0aa7b))
  *  homogeneize sliceLabels properties ([19444c72](https://github.com/plouc/nivo/commit/19444c72431c900fd33db5c67f62c4a4009abbec))
  *  improve internal props naming ([ed176a92](https://github.com/plouc/nivo/commit/ed176a92d71d8e41980e41834510b1f4c50e1c5e))
  *  document the interface of props passed to custom layers ([055e4775](https://github.com/plouc/nivo/commit/055e47755da2b2e441c542837f0fa68a4b1aa09b))
  *  document layers property ([b5ed2d4b](https://github.com/plouc/nivo/commit/b5ed2d4bfab5129fe20b6d4d5b292d2f277c88a2))
  *  add support for layers to Pie component ([a8f64685](https://github.com/plouc/nivo/commit/a8f646853a2fe0ba1220cf137f0e9099962cd925))
  *  add tests for colors ([f0cefd2e](https://github.com/plouc/nivo/commit/f0cefd2ede867368d8ef0a29139feffe0c4afbd0))
  *  add tests regarding data handling ([4abe3f35](https://github.com/plouc/nivo/commit/4abe3f3538282e6ee2c22d420eba67fc4f2fd66e))
  *  move @nivo/core to peerDependencies ([2aef261f](https://github.com/plouc/nivo/commit/2aef261fd8812ce6b260947587bb7cd62bd11fda))
  *  restore border for PieCanvas ([eab1311c](https://github.com/plouc/nivo/commit/eab1311cb5bf0e3d294bffbfc4f589d7d8228935))
  *  fix PieCanvas ([789d52a0](https://github.com/plouc/nivo/commit/789d52a055f27b827f866e0cc4eb18f9177dbdea))
  *  use theme hook instead of prop for PieRadialLabels ([7e415396](https://github.com/plouc/nivo/commit/7e41539698931ea140c17fb9aaddca2f1149f46c))
  *  use hooks instead of props to handle tooltip ([97974824](https://github.com/plouc/nivo/commit/97974824e8128967e473b4236df25e2b0acc9432))
  *  use hooks instead of component to compute layout ([6e298727](https://github.com/plouc/nivo/commit/6e298727091a78e5574fb30b00ab224ec5bd0ce7))
  *  pass datum to pie legend data ([5292831f](https://github.com/plouc/nivo/commit/5292831f0c5002b3163c1a73314057204cbd1b74))
  *  remove unused react-motion dependency ([3c7d65ce](https://github.com/plouc/nivo/commit/3c7d65ce58cd276dd234dadad10583cb2aa8996d))

#### Bug Fixes

* **bar:**  include bars with zero height/width ([32f48235](https://github.com/plouc/nivo/commit/32f482354b02e6294da8f918f9773025b4120cac))
* **bump:**  add missing @nivo/axes module to dependencies ([d79d0a18](https://github.com/plouc/nivo/commit/d79d0a189803d28f0c17a4a3ddb2eaf90e0ca74b))
* **deps:**  fix @nivo peer dependency versions ([505a7c08](https://github.com/plouc/nivo/commit/505a7c08566eacc481dfd0dafe80d50cf8ac7960))
* **pie:**  fix path to typings ([243613d3](https://github.com/plouc/nivo/commit/243613d396b69f2c5a78e1ba3d53386f4e6b9297))
* **radar:**
  *  typing for custom functions (#1089) ([20a5c124](https://github.com/plouc/nivo/commit/20a5c124ea81a9842a2605a0daa27247a423579f))
  *  fix issue with points being outside circular grid (#1189) ([beb3ac84](https://github.com/plouc/nivo/commit/beb3ac8440a31288eacec329e0ad82aab7f6fb0d))
* **theme:**  remove default fill for legends.text theme (#1181) ([2216f129](https://github.com/plouc/nivo/commit/2216f129da1104076485a6b89539ed7e0ea7cbe6))
* **tooltip:**  Show tooltip on first tap for touch devices (#1185) ([f712cfaa](https://github.com/plouc/nivo/commit/f712cfaa1b75917784506989949a2483f652cd8b))
* **website:**  fix crash caused by calendar tooltip (#1214) ([7eb69175](https://github.com/plouc/nivo/commit/7eb69175f10855cc433ec7d75faa33a43baee3a5))

#### Chore

* **changelog:**  update changelog ([78545294](https://github.com/plouc/nivo/commit/785452949ae3c266edb86cabdf70d3e16cbca045))
* **ci:**  add website to codesandbox ci (#1199) ([f14c5234](https://github.com/plouc/nivo/commit/f14c523447463807d157aad629af2b2aa859b736))
* **infrastructure:**  remove examples install during init ([98ddad4a](https://github.com/plouc/nivo/commit/98ddad4a0fb6499e29c189ff95b819d4aeec1519))
* **storybook:**  Storybook 6.0.X Upgrade (#1177) ([48d402e9](https://github.com/plouc/nivo/commit/48d402e98a4fc08575b48e4518d568ace438c9f6))



<a name="v0.63.1"></a>
## v0.63.1 (2020-10-22)


#### Bug Fixes

* **annotations:**  switch to useAnimatedPath hook ([6c8b767e](https://github.com/plouc/nivo/commit/6c8b767e1b05a1434099ac6dd3169431159d05da))
* **bar:**  Fix BarItemProps types (#1163) ([7f19561a](https://github.com/plouc/nivo/commit/7f19561a444d3e01910239c3b3894b20c638ff86))
* **bump:**
  *  switch to useAnimatedPath hook ([5ddb2ec2](https://github.com/plouc/nivo/commit/5ddb2ec2c11b40894a01cfe354397202ba9a6957))
  *  update input datum types for undefined/null (#1096) ([259e037f](https://github.com/plouc/nivo/commit/259e037f52b0b4134dd2fa0abec221bcb9f939c1))
* **ci:**  switch to GitHub actions (#1175) ([0affed68](https://github.com/plouc/nivo/commit/0affed6889b2653545ecac3f287af360b563e3a3))
* **funnel:**  switch to useAnimatedPath hook ([d4578414](https://github.com/plouc/nivo/commit/d457841430812520d5068b5888883f497a60c702))
* **line:**  animate paths properly ([6d2cd274](https://github.com/plouc/nivo/commit/6d2cd274e3c5b52c322e50f8e3708d560ef58513))
* **parallel-coordinates:**  switch to useAnimatedPath hook ([d755a11d](https://github.com/plouc/nivo/commit/d755a11d3c58000607b08be4907b5174a4eacb28))
* **radar:**  switch to useAnimatedPath hook ([e7991283](https://github.com/plouc/nivo/commit/e79912838533311816ede34f282708af71f755e0))
* **sankey:**  switch to useAnimatedPath hook ([a5cdf26f](https://github.com/plouc/nivo/commit/a5cdf26f789ef3d55981f0cdcc579c7f37c4ebcc))
* **storybook:**  always pull latest version of generators package (#1176) ([9e230cef](https://github.com/plouc/nivo/commit/9e230cefc80944a28a3e903ac0756777895832e0))
* **stream:**  switch to useAnimatedPath hook ([d983b19c](https://github.com/plouc/nivo/commit/d983b19c844f3208d3e21d81e979ec99ac976c3f))

#### Chore

* **changelog:**  update changelog (#1166) ([55954821](https://github.com/plouc/nivo/commit/5595482133d85a8bf4fdddcc23f32fe8e956ed13))



<a name="v0.63.0"></a>
## v0.63.0 (2020-10-19)


#### Features

* **a11y:**
  *  add ability to set `role` prop on all charts (#1128) ([7d52c072](https://github.com/plouc/nivo/commit/7d52c072cc27fbb9cd1728c8127e676cb56c324a))
  *  add changes to allow for improved accessibility on charts (#1054) ([464185c8](https://github.com/plouc/nivo/commit/464185c8758f72880c40778f1507edff5bfef697))
* **annotations:**  replace react-motion by react-spring ([7acc5721](https://github.com/plouc/nivo/commit/7acc5721e860cf78c2adf8a0a7d96dd02b6bb90f))
* **axes:**  replace react-motion by react-spring ([50c135d6](https://github.com/plouc/nivo/commit/50c135d6b983948b6b7ad87300772faa583dd9ca))
* **build:**
  *  remove custom nivo babel preset ([2083f8bd](https://github.com/plouc/nivo/commit/2083f8bd410a2e269599310b8e32b862375a5469))
  *  use react app babel preset ([18a8dd14](https://github.com/plouc/nivo/commit/18a8dd1430cb8b40c2610b543f795a7e2c34e044))
  *  change .esm suffix to .es ([aecf5b08](https://github.com/plouc/nivo/commit/aecf5b0849db4a2ff6987c842067b97241c1b03d))
  *  generate source maps for packages ([39a83fd4](https://github.com/plouc/nivo/commit/39a83fd401d59fd5125c22a1755bff33c226819c))
* **bullet:**  support ranges that support < 0 ([5dc5ce69](https://github.com/plouc/nivo/commit/5dc5ce699347ffa2a4088bd12005e684fd2abf73))
* **bump:**
  *  remove lodash dependency ([6f6aff3c](https://github.com/plouc/nivo/commit/6f6aff3cf22fd73bc567e864968f18967f003efc))
  *  replace react-motion by react-spring for Bump ([edf2daf6](https://github.com/plouc/nivo/commit/edf2daf63f360fd1c4d78229ddff233bc2ddf080))
  *  replace react-motion by react-spring for AreaBump ([90c3232c](https://github.com/plouc/nivo/commit/90c3232c47d0a809a67e8ca32aadb429e2a7598e))
* **calendar:**
  *  remove recompose and convert to hooks (#1040) ([daebd61f](https://github.com/plouc/nivo/commit/daebd61f3f7ab350aaa3674ed3134e38bc3c18a1))
  *  add monthSpacing prop (#964) ([8f55046e](https://github.com/plouc/nivo/commit/8f55046e04971da31654aa7adeb07ea692655f69))
* **ci:**  update Node.js version on CI to run v12 ([3888a729](https://github.com/plouc/nivo/commit/3888a729c581fafb45194bcc565eaed2fc96e2d6))
* **core:**
  *  replace react-measure with custom hook ([3e337cda](https://github.com/plouc/nivo/commit/3e337cda0a93b8665c7843280a6dea991d076751))
  *  remove SmartMotion component in favor of react-spring built-in support for various interpolators ([15177207](https://github.com/plouc/nivo/commit/15177207d55e818621e0b918b5c9f2ab6a4100a4))
* **funnel:**
  *  add funnel documentation screenshots ([ed1e58a9](https://github.com/plouc/nivo/commit/ed1e58a923d479c1fcf05fe7f48071330ca66175))
  *  disable stories ([4f6dc92a](https://github.com/plouc/nivo/commit/4f6dc92a47c9573fc15516f3e42ddc9e7a2cc65c))
  *  add TypeScript definitions ([2748dc10](https://github.com/plouc/nivo/commit/2748dc108f328004d3f77374c4ac831870a3c95f))
  *  add support for tooltip ([6ce539cb](https://github.com/plouc/nivo/commit/6ce539cbda6293dd67655c4d07ef4091c91ec78e))
  *  add the ability to disable animations ([7055d3d9](https://github.com/plouc/nivo/commit/7055d3d97b74535eef41e960160ae2b1996743d7))
  *  improve animation management ([99359f57](https://github.com/plouc/nivo/commit/99359f57000dca4832031604c08e657c8c5b249b))
  *  add support for custom event handlers ([bbdbc373](https://github.com/plouc/nivo/commit/bbdbc373686b44675c9dd6cbd0d4bcb6a7f672ec))
  *  add support for annotations to Funnel component ([9fca13ce](https://github.com/plouc/nivo/commit/9fca13ce9fb77a7f049a66cbdf7b8665ad267fa6))
  *  add support for current part ([a69780fd](https://github.com/plouc/nivo/commit/a69780fd753885fea17b95a4a9a28a27a527e335))
  *  update funnel icon ([826c08f6](https://github.com/plouc/nivo/commit/826c08f66482b2e8cfe8790c4a2d7dab06e62184))
  *  add support for animation to Funnel component ([e487a764](https://github.com/plouc/nivo/commit/e487a76461319600b3024bb6304b0a9077f089e9))
  *  add widget to be ease creation of d3 value formatters ([5f0bf7dc](https://github.com/plouc/nivo/commit/5f0bf7dcde4695e46e291593c28498a9a07c0a83))
  *  init @nivo/funnel package ([e2d1ce88](https://github.com/plouc/nivo/commit/e2d1ce8803d991c56d9bc204e5ce07dee66de109))
* **generators:**  add network data generation (#1082) ([46bf12c3](https://github.com/plouc/nivo/commit/46bf12c355c073ddf7294a97045ffa151cd7d1ac))
* **heatmap:**
  *  improve useHeatMap hook ([62b2e597](https://github.com/plouc/nivo/commit/62b2e597159f1de4f6e596fa7d164ee65795fa20))
  *  move cells computation to main hook ([80701b1f](https://github.com/plouc/nivo/commit/80701b1f8cddeff2f72dcadfd67d5eb3cbc4eb06))
  *  use hooks instead of recompose for HeatMapCanvas ([f823ea61](https://github.com/plouc/nivo/commit/f823ea61e5766d98ef80db16f6b88f1ed473dbb2))
  *  use hooks instead of recompose and migrate to react-spring ([6d6528aa](https://github.com/plouc/nivo/commit/6d6528aaba9c3d9f2cfbcf61a986c6789844fbcd))
* **infrastucture:**  upgrade rollup, babel, typescript and prettier ([b08e7917](https://github.com/plouc/nivo/commit/b08e79176eadd353794ef1318cffc10f6889d494))
* **line:**
  *  add custom layer support to LineCanvas (#987) ([1e5fd14d](https://github.com/plouc/nivo/commit/1e5fd14d30f0a55731e6a704491a7ede8c9e7d70))
  *  replace react-motion by react-spring ([ca452490](https://github.com/plouc/nivo/commit/ca45249082b81a9c37194a2ca7c695865a2c1592))
* **network:**  add support for tooltips (#1080) ([4d8e822e](https://github.com/plouc/nivo/commit/4d8e822ebe55a58e7c673304e9a315649875fecb))
* **parallel-coordinates:**  use hooks instead of recompose and migrate to react-spring ([0760d942](https://github.com/plouc/nivo/commit/0760d942c4711bba6191efe07e146e0ebd034c25))
* **radar:**
  *  remove lodash dependency ([6e5c7f9f](https://github.com/plouc/nivo/commit/6e5c7f9f2f0259df030d296ddddd2c9e6305ecac))
  *  replace react-motion by react-spring ([9e9c4984](https://github.com/plouc/nivo/commit/9e9c4984a906838d00cd81e873816ae2862a2fae))
* **sankey:**
  *  restore previous tooltip positioning ([7666935b](https://github.com/plouc/nivo/commit/7666935b9324674879ea522f156e22ae427d14f0))
  *  use hooks instead of recompose and migrate to react-spring ([b08c691d](https://github.com/plouc/nivo/commit/b08c691d0baecaf8e32d57892351894c2eecfaf1))
* **scales:**  Add support for symlog scale (#1097) ([954bef75](https://github.com/plouc/nivo/commit/954bef7545ba6d279e9d61b813960a748d13144f))
* **stream:**
  *  restore previous tooltip positioning ([611a72bd](https://github.com/plouc/nivo/commit/611a72bdb7612e22b2bad4074202008302fcc34f))
  *  use hooks instead of recompose and migrate to react-spring ([0c8dd3bc](https://github.com/plouc/nivo/commit/0c8dd3bc0a102f80da6628c2a767ed3786d0696a))
* **sunburst:**
  *  add support for custom tooltip #1024 ([9a5b1e42](https://github.com/plouc/nivo/commit/9a5b1e42151b187ea6bf4409658e12b3187314c9))
  *  Add typescript definition (#995) ([a32603ce](https://github.com/plouc/nivo/commit/a32603ce793f839eccf58d2cb22bdfc7abfd83fb))
* **swarmplot:**  add time scale support (#1121) ([9a19da66](https://github.com/plouc/nivo/commit/9a19da666e030219af440e2da8b4bf7d7a281106))
* **tooltip:**
  *  improve TooltipWrapper component for animation ([d969d836](https://github.com/plouc/nivo/commit/d969d836e89f731546ff241bee6daa9c3c09b895))
  *  restore animation and use new measure hook ([691125c1](https://github.com/plouc/nivo/commit/691125c1d12bb8cd53018ec1c5ab956a8d654a13))
  *  replace react-motion by react-spring ([a5850bc5](https://github.com/plouc/nivo/commit/a5850bc54119b0b5cf3083f735134c838239b2d7))
* **treemap:**
  *  restore pattern and gradient support for TreeMap component ([5e4ea120](https://github.com/plouc/nivo/commit/5e4ea120ffdb93134616c4f5677a6338539b0544))
  *  add stories to demo pages ([4b3241cd](https://github.com/plouc/nivo/commit/4b3241cd3bf8eff5198526e0f415d20510954e39))
  *  update treemap documentation screenshots ([43e625fa](https://github.com/plouc/nivo/commit/43e625fa33de7154683653d1ca7006e15b5c8e22))
  *  update stories ([f90f979d](https://github.com/plouc/nivo/commit/f90f979d57ff86e5292df4823bc58a655be4efa9))
  *  add support for parent labels ([c705f3e7](https://github.com/plouc/nivo/commit/c705f3e7da87943b8848f3d6ebd3b20af5d77e2c))
  *  add TypeScript definitions ([f1d9a3b9](https://github.com/plouc/nivo/commit/f1d9a3b9544d17f91255f7fec69e9ead35e5e552))
  *  use hooks instead of recompose and migrate to react-spring ([5ff360ef](https://github.com/plouc/nivo/commit/5ff360ef1a4e2f67a790e276af0530c65c2e8041))
* **website:**
  *  add theme property documentation to all components ([f967380e](https://github.com/plouc/nivo/commit/f967380e2900d893f5174c5070743a9b4dffa9ec))
  *  add theming guide ([975503ab](https://github.com/plouc/nivo/commit/975503ab21ca02e7846e4ea079c86438b380c18b))
  *  add ability to configure x/y formats from UI ([022ddf8d](https://github.com/plouc/nivo/commit/022ddf8ddf40d2da8392ad2c000ccd0a77830bd6))
  *  update heatmap motion config control for react-spring ([25ba5662](https://github.com/plouc/nivo/commit/25ba56629f9f271d73bdb7eaac35702ecc2f4eb7))
  *  add the ability to control react-spring config ([457ebfa4](https://github.com/plouc/nivo/commit/457ebfa490e6809f567155eb8789fb45d03cc05c))

#### Bug Fixes

* **bump:**  Add types for defs to AreaBumpSvgProps (#997) ([da9ea7f8](https://github.com/plouc/nivo/commit/da9ea7f84aafbcadc955c4457cf6ecae588f724e))
* **calendar:**  Add 'monthLegendPosition' definition (#1007) ([f58298ef](https://github.com/plouc/nivo/commit/f58298efa86c09a7b3807abcc3d33403a92a0fe2))
* **core:**
  *  Add missing Theme types to match default theme object (#1135) ([861000fc](https://github.com/plouc/nivo/commit/861000fcb31a95ed9053b9c2735dc9d19ba665d5))
  *  add Defs types and export for typescript (#1146) ([99b520e9](https://github.com/plouc/nivo/commit/99b520e9621e77472b8c922d85a0fcd7bc5e00cc))
* **core / swarmplot:**  Improve core and swarmplot typedefs (#1151) ([e370ea87](https://github.com/plouc/nivo/commit/e370ea87935cfb28ac863f488a1d4f2104f1cc85))
* **dependencies:**  remove forced package resolutions ([5be120a1](https://github.com/plouc/nivo/commit/5be120a1a52e2234b2df362b0bb5aa485e3956f4))
* **install:**  force resolution of fsevents package ([fbcafd14](https://github.com/plouc/nivo/commit/fbcafd1491d47fa878338b2cdd87b54d34f36b6d))
* **legends:**  Respect theme fill color (#941) ([fa847f6a](https://github.com/plouc/nivo/commit/fa847f6ad76c6841ff094cd1c7f3b4f160fa7d1c))
* **line:**  change points ordering on stacked lines (#1060) ([c10edbf0](https://github.com/plouc/nivo/commit/c10edbf027fe8346f64da0b39f57b9af303a81c5))
* **pie:**  tooltip props typing (#1088) ([54215e7e](https://github.com/plouc/nivo/commit/54215e7e77be7a1b42e365ceddf187f279dea3c2))
* **radar:**
  *  Add return type of GridLabelCustomFunction (#1045) ([f87be93a](https://github.com/plouc/nivo/commit/f87be93ad19eeaa3673e9a4da2dc57513f4bad5f))
  *  add theme prop to types (#1029) ([74001a66](https://github.com/plouc/nivo/commit/74001a660ef9c632bd8b46311f68bc2dd445d06d))
  *  fix eslint errors ([d96fb311](https://github.com/plouc/nivo/commit/d96fb311d22eb0ccf994681b6f59f3adf9c2d922))
* **sankey:**  Fix issue with gradient and parentheses in IDs (#1152) ([56f0e449](https://github.com/plouc/nivo/commit/56f0e4494096c76d8ad637e714a2b1515e0d7b9c))
* **scatterplot:**
  *  Support DerivedNodeProp for nodeSize prop (#1134) ([42adacd9](https://github.com/plouc/nivo/commit/42adacd99da1bf47a0099bdcd56b95a33fcc359d))
  *  adjust type/proptype of `data[].id` prop (#1147) ([52c1bc15](https://github.com/plouc/nivo/commit/52c1bc155b58c522c8dc3ca3d43385630b0c563c))
  *  onMouseLeave not firing when mesh is used (#1064) ([fb4aef0c](https://github.com/plouc/nivo/commit/fb4aef0c062901d0f71d23a2ac2d7eb005a2729e))
  *  fix canvas missing annotations layer (#1043) ([d2ceffc7](https://github.com/plouc/nivo/commit/d2ceffc7bdd29a83ea1f3236d96e36aea0cffb36))
* **treemap:**  fix treemap package nivo dependencies ([dbcd2167](https://github.com/plouc/nivo/commit/dbcd21676863c6264bcd3dcf159f3c8f20ec7a03))
* **website:**
  *  fix missing prop for Calendar API demo ([b8c7c995](https://github.com/plouc/nivo/commit/b8c7c995ecf6f266c25dc77c5dfa32fbee5ed29a))
  *  fix TreeMap usage on homepage ([09d3bc9f](https://github.com/plouc/nivo/commit/09d3bc9ff2efcbc4a387012dc68e3be368d2a13d))
  *  fix TreeMap in colors guide ([24327df4](https://github.com/plouc/nivo/commit/24327df4e032c4f089ca1fb5550e639e82526982))

#### Chore

* **docs:**  Add Testing section in CONTRIBUTING.md (#1059) ([565dc755](https://github.com/plouc/nivo/commit/565dc7559f8eca987e1bc955c7fd2c47dfb3ba29))
* **funding:**  add wyze to the list of contributors in funding config ([e2f8cec4](https://github.com/plouc/nivo/commit/e2f8cec455fe447db411d8cad7fb75ca39490733))
* **legends:**  fix broken snapshots (#1023) ([2e7deed7](https://github.com/plouc/nivo/commit/2e7deed7460f6327264ccd6664ab0eb512f15617))



<a name="v0.62.0"></a>
## v0.62.0 (2020-05-31)


#### Features

* **bar:**  pass showTooltip and hideTooltip functions to custom layers ([f1bff166](https://github.com/plouc/nivo/commit/f1bff166d0ca4a1ba12b9d54420e2983167f3854))
* **bump:**  add support for defs/fill properties to AreaBump (#926) ([c5d5d86f](https://github.com/plouc/nivo/commit/c5d5d86f3cb04820a7de5629b38842d6100fa4ef))
* **line:**
  *  pass the state to a custom layer (#656) ([07d2c3f2](https://github.com/plouc/nivo/commit/07d2c3f2e78b04ef47a8681a0698df98e0703fc2))
  *  add gradient support to line areas (#844) ([b84ec05a](https://github.com/plouc/nivo/commit/b84ec05af21d192248edb18c56eb6c852b9492f7))
  *  Updated @nivo/line typescript definition to add all curve options (#197, #944) ([7b3c503b](https://github.com/plouc/nivo/commit/7b3c503bc6c31e8afa4b765cba0824e58540a686))
* **scatterplot:**  Add support for annotations on scatterplots (#882) ([ffc759ea](https://github.com/plouc/nivo/commit/ffc759ea9a42ec149927cb14cf473ba9e9678575))
* **website:**
  *  add a references page to the website (#725) ([bdd45de5](https://github.com/plouc/nivo/commit/bdd45de5daaf1ea3b9c010a635f85234909033a8))
  *  add link to d3-format documentation for line & scatterplot value formatters ([98a4f439](https://github.com/plouc/nivo/commit/98a4f4394479c0d61c0f7c8ee7a52ce0b380b5f9))

#### Bug Fixes

* **axes:**  add typedef exports for all components ([354ef248](https://github.com/plouc/nivo/commit/354ef24824c2afd6d50867a4b9cf9c9aa6b7c7ff))
* **bar:**
  *  add missing grid value types (#855) ([033cf9ee](https://github.com/plouc/nivo/commit/033cf9ee6d4249cc2ff3c27dc3cfcfb3e14f042a))
  *  fix linting error in types ([cbba0f2a](https://github.com/plouc/nivo/commit/cbba0f2abd5fe19f23a83ade9e9fb1ec03ec8498))
  *  fix legend order in bar (#842) ([ced84ee0](https://github.com/plouc/nivo/commit/ced84ee0d20e2ef0b3037a309c424e0c4fe5f3a7))
* **core:**  add missing crosshair definitions to theme (#915) ([211d76d8](https://github.com/plouc/nivo/commit/211d76d8749e273969ac15fef59647589bc84baa))
* **heatmap:**  add missing type for tooltip property ([f4d4ea62](https://github.com/plouc/nivo/commit/f4d4ea623beed68c5d54a49f9f7b17cccef4ee8d))
* **line:**
  *  typings fix for custom layer props (#887) ([a293a648](https://github.com/plouc/nivo/commit/a293a648f324a7ed4090851f7f411784902d77ba))
  *  fix typescript definition for areaBaselineValue prop. (#961) ([9b1ed9cd](https://github.com/plouc/nivo/commit/9b1ed9cd80fbc487780f9c81bd976a739853d08b))
  *  add types for pointLabel function ([b5464bba](https://github.com/plouc/nivo/commit/b5464bba0a122f4dd39463a99da45ddc7ad34a7f))
  *  fix onMouseLeave firing ([f2816f44](https://github.com/plouc/nivo/commit/f2816f44f2fad60025d57bca6721c3c1cec8f14b))
  *  add missing layer 'crosshair' to TypeScript definition (#917) ([81d8fa0b](https://github.com/plouc/nivo/commit/81d8fa0b21a42f35cedde1b782f663364b6062dc))
* **pie:**  address some issues with data label prop (#967) ([d4714b6c](https://github.com/plouc/nivo/commit/d4714b6ceda90698f8f335fa1c5730a10599a7ae))
* **sankey:**  add missing motion typedefs and proptypes ([bc5489c9](https://github.com/plouc/nivo/commit/bc5489c9d995d84922ef6211b52a2fd14e8fee7a))
* **scales:**  fix timeScale min/max values and typings (#743) ([bcb45167](https://github.com/plouc/nivo/commit/bcb451670ed535a10f24cfa148a622b588eb6504))
* **scatter plot:**  add gridValues to ScatterPlot (#853) ([cf0fd6bd](https://github.com/plouc/nivo/commit/cf0fd6bdaacd36edfacbb951a036de19ce374aae))
* **scatterplot:**
  *  fix serieId typing (#886) ([ef1ee4c5](https://github.com/plouc/nivo/commit/ef1ee4c5c7f6bf3f0d9bd1defd3d5c32516cb098))
  *  remove TypeScript redefinition of Scale (#935) ([35b1681e](https://github.com/plouc/nivo/commit/35b1681e70369d864578a03205ef37a6c1fe5b14))
  *  fix no implicit any error on CustomTooltip (#857) ([7ad8ba75](https://github.com/plouc/nivo/commit/7ad8ba755e44323172222d9ecbf413fa6644d939))
* **storybook:**  add useUTC:false to line timeScale ([f3ba3f98](https://github.com/plouc/nivo/commit/f3ba3f985d3c78fa0358a6154e6d797d120caec4))
* **types:**  improve typings for onMouseLeave/Enter in Bar/Pie (#939) ([422ef569](https://github.com/plouc/nivo/commit/422ef5698d32a4ba86fa662e0761b526aaed2fa7))
* **website:**
  *  fix xScale.type option for line chart ([ad77a5f5](https://github.com/plouc/nivo/commit/ad77a5f54942b8b80dce228905de40115ae64e08))
  *  fix spelling mistake (#805) ([468a5538](https://github.com/plouc/nivo/commit/468a5538cde92b6125b149d14a11a714baee7382))
  *  Add closed bracket in gradients example code (#889) ([15bc0ee7](https://github.com/plouc/nivo/commit/15bc0ee73e2890c65f2effd13923a78f6269a6e0))

#### Chore

* **changelog:**  update changelog ([793bebc8](https://github.com/plouc/nivo/commit/793bebc8a972607820227ee87da1d3221caff9fc))
* **generators:**  change up treemap data ([54c9bf8f](https://github.com/plouc/nivo/commit/54c9bf8f38155fb728186281e0af8c1cac4164de))



<a name="v0.61.2"></a>
## v0.61.2 (2019-12-31)


#### Features

* **sankey:**  add support for layers to Sankey ([842ae0df](https://github.com/plouc/nivo/commit/842ae0df00c239dac526d148645841027bd60552))

#### Chore

* **changelog:**  update changelog ([48a9ecec](https://github.com/plouc/nivo/commit/48a9ecec535fb834253e78afc9b8b702d0d152e7))



<a name="v0.61.1"></a>
## v0.61.1 (2019-12-21)


#### Bug Fixes

* **geo:**  add missing dependency for legend data memoization ([887c57e7](https://github.com/plouc/nivo/commit/887c57e7b91ff7052fa657290e2b29889f87362a))
* **legends:**
  *  make sure to pass the theme object when using canvas legends ([ae621162](https://github.com/plouc/nivo/commit/ae6211629fd5ed56f98bceb83e9355a74b962dc7))
  *  honor theme font settings for labels ([e4a65fc4](https://github.com/plouc/nivo/commit/e4a65fc4199465bfe1a0920d30c0c7bc2aa72711))
  *  fix vertical alignment of canvas labels ([559e3c78](https://github.com/plouc/nivo/commit/559e3c78ff1298584f8e410b9c5cf8a47f7cce76))

#### Chore

* **doc:**  add explanation about the geo features file ([b199b278](https://github.com/plouc/nivo/commit/b199b2789c9faeed7f88227344c07f4dff1245fb))



<a name="v0.61.0"></a>
## v0.61.0 (2019-12-19)


#### Features

* **bump:**  add support for function for start/end labels ([80c3e92b](https://github.com/plouc/nivo/commit/80c3e92b322fc94d5d85ba79e6d3cc74b3210f1e))

#### Bug Fixes

* **bump:**  fix points keys & motion and code formatting ([d92a9655](https://github.com/plouc/nivo/commit/d92a9655028a34eda89465e04288022126fd2148))
* **prop-types:**  fix missing prop types on various packages ([8d0fe0d9](https://github.com/plouc/nivo/commit/8d0fe0d91cfdc7efb1428b341afa087a3fdb411a))
* **publish:**
  *  add missing npm-normalize-package-bin package ([91acdf21](https://github.com/plouc/nivo/commit/91acdf218de91659928fcbb13f31463d50501d67))
  *  fix lerna arg ([97fcb868](https://github.com/plouc/nivo/commit/97fcb86849a8d90bc056cda184c22b37d2680a40))
* **scatterplot:**  fix scatterplot unit tests ([c6b01ff1](https://github.com/plouc/nivo/commit/c6b01ff1a608f8bee0b1c77b8db0f264cb88dbf5))

#### Chore

* **deps:**  upgrade deps ([5098e530](https://github.com/plouc/nivo/commit/5098e530c08185bdf81e1421f38edc52a1674a3e))



<a name="v0.60.1"></a>
## v0.60.1 (2019-12-13)


#### Features

* **bump:**
  *  skip serie labels for missing data ([04a13a72](https://github.com/plouc/nivo/commit/04a13a728c5185a6166ba9995bb1aa07736c297e))
  *  add support for missing data to Bump component ([7275fa89](https://github.com/plouc/nivo/commit/7275fa89b8638d18e930d660cef1bbf864335959))
  *  add active/inactive state to points ([ee906f41](https://github.com/plouc/nivo/commit/ee906f41b31653d0533473e45cb8170ddc58800b))
  *  pass original datum to each point ([b4c739d2](https://github.com/plouc/nivo/commit/b4c739d2ca8f9b7c31928276c35f1b161a0e1686))
  *  add ability to use custom point component ([b29fed2a](https://github.com/plouc/nivo/commit/b29fed2a7d388a65a8e2d3fc134cb6ccb77a51e0))
* **line:**  add option to format x/y values in tooltip (#731) ([f92abbed](https://github.com/plouc/nivo/commit/f92abbed0192a92f5bf98e559cbd29ad87f654fb))

#### Bug Fixes

* **bar:**  add ability to use number for grid lines (#669) ([3d48b94d](https://github.com/plouc/nivo/commit/3d48b94d5e8e66665691129578fab4c55fa61d49))

#### Chore

* **website:**  upgrade dependencies ([6743820f](https://github.com/plouc/nivo/commit/6743820fe8f15686a90f1bd0a599d773f8e98713))



<a name="v0.60.0"></a>
## v0.60.0 (2019-12-13)


#### Features

* **calendar:**  add support for custom color scale (#703) ([484d3080](https://github.com/plouc/nivo/commit/484d30804fbba793b536625f4737ecbd261a07ca))
* **legends:**  pass id property to symbolShape (#687) ([289e9049](https://github.com/plouc/nivo/commit/289e9049f7dad19147ef002fcd3ca2a22c1fd9f2))
* **line:**  update TypeScript definitions ([c034393a](https://github.com/plouc/nivo/commit/c034393ac00baffe770b1cfda7fb7e58e3d3776e))
* **tooltip:**  add simple fix to keep the tooltip inbounds (#631) ([395fc5e7](https://github.com/plouc/nivo/commit/395fc5e7611971fd6a2d413b3e1b5b03e096c3e5))

#### Bug Fixes

* **bar:**
  *  add missing borderColor type to nivo/bar (#704) ([050f0a98](https://github.com/plouc/nivo/commit/050f0a98239ced802fd8d9582da49f6f9c588809))
  *  add missing `renderTick` type to Bar's definition (#697) ([61fc2078](https://github.com/plouc/nivo/commit/61fc20786b92eb1c96ba1c543f43aa91c57591c7))
* **calendar:**  add missing exports for canvas calendar (#700) ([3f9bc623](https://github.com/plouc/nivo/commit/3f9bc62358ebf1bbab4f62a38306c59b9de122ab))
* **line:**
  *  update PropType for Line markers when using dates for the X axis (#653) ([2c9bfc2d](https://github.com/plouc/nivo/commit/2c9bfc2dee8bc8485378dfc4fb180da5734c7aec))
  *  add missing pointSymbol prop to typings ([c249df83](https://github.com/plouc/nivo/commit/c249df83b2ff46d0b3c2f92b292f381cf52cea0b))
* **sankey:**  fix issue with gradient links and spaces in IDs (#676) ([52feccbf](https://github.com/plouc/nivo/commit/52feccbfdf9c65d01238edffe83efa75eb6e248a))
* **scales:**  add `useUTC` to types (#690) ([d7c1da53](https://github.com/plouc/nivo/commit/d7c1da530aead9a97f889edb20f6ecb27a4cd6db))
* **storybook:**  fix typo in line's story (#680) ([680a6ed3](https://github.com/plouc/nivo/commit/680a6ed357843d8a1c5b527d90a6f76f45e67621))
* **tooltip:**  update tooltip TypeScript types. (#657) ([305a536f](https://github.com/plouc/nivo/commit/305a536f4cff6401da179598d9bc688822528b16))
* **website:**  fix responsive problems with component's tab (#722) ([ccbb4de0](https://github.com/plouc/nivo/commit/ccbb4de0211f0a166903750aac17ab5e74dade75))

#### Chore

* **doc:**
  *  fix broken markdown description of the 'labelFormat' property (#748) ([d1efd7d3](https://github.com/plouc/nivo/commit/d1efd7d3f939ef0c1604d0da33eab09b9a6b4b32))
  *  fix bar previews in README.md (#759) ([cdfec980](https://github.com/plouc/nivo/commit/cdfec980cd9900804501fd36de555507a3a41e47))
  *  fix bullet previews in README.md (#760) ([a9442eba](https://github.com/plouc/nivo/commit/a9442eba6155ca8af13e9b064dcaaa888889127b))
  *  fix calendar previews in README.md (#761) ([62d4f4dc](https://github.com/plouc/nivo/commit/62d4f4dc60e99a22f40d0cf815d46849efca4596))
  *  fix circle-packing previews in README.md (#762) ([90afc53b](https://github.com/plouc/nivo/commit/90afc53bf198f4106a3ffaa9fc01fecbcafcd082))
  *  fix geo previews in README.md (#763) ([3a7267a3](https://github.com/plouc/nivo/commit/3a7267a33994769a2bd3fe86a0c52909fee7f73b))
  *  fix heatmap previews in README.md (#764) ([304825ce](https://github.com/plouc/nivo/commit/304825ce25174fe7078b4777d3e868e7ba36d11e))
  *  fix parallel-coordinates previews in README.md (#765) ([6a7ce3e7](https://github.com/plouc/nivo/commit/6a7ce3e71b93a1efd42a766a55c2e03583322097))
  *  fix pie previews in README.md (#766) ([a94c9c40](https://github.com/plouc/nivo/commit/a94c9c40ef8d0e7a2de206dbfc2038b740decce9))
  *  fix radar previews in README.md (#767) ([c557d303](https://github.com/plouc/nivo/commit/c557d303dde079afa6f08e2396a37196cfe95a46))
  *  fix sankey previews in README.md (#768) ([0eada510](https://github.com/plouc/nivo/commit/0eada510a2aff0e4b12d7babe3fee20e7e568e76))
  *  fix scatterplot previews in README.md (#769) ([b952aded](https://github.com/plouc/nivo/commit/b952aded8e7132a7f7e7fe6db243922e97442a6a))
  *  fix sunburst previews in README.md (#770) ([35706ad2](https://github.com/plouc/nivo/commit/35706ad2404b61516e20247a9290891e96b3b637))
  *  fix stream previews in README.md (#771) ([ea2b9a8a](https://github.com/plouc/nivo/commit/ea2b9a8a67d81407a64dd1b0b2a78b3ce9fa3ed0))
  *  fix treemap previews in README.md (#772) ([58c9e268](https://github.com/plouc/nivo/commit/58c9e268d09627154d1aaff7b5b58b5b2a9f7493))
  *  fix voronoi previews in README.md (#773) ([0820afe7](https://github.com/plouc/nivo/commit/0820afe7d2f4e7b5979dcdf44f0b3a6e3547ebcc))
  *  fix waffle previews in README.md (#774) ([474f9f75](https://github.com/plouc/nivo/commit/474f9f75f9f1826e029f430d28f506a79b03ed38))



<a name="v0.59.3"></a>
## v0.59.3 (2019-07-13)


#### Features

* **scales:**  add ability to reverse linear scale ([2f4ddc47](https://github.com/plouc/nivo/commit/2f4ddc478939acf4fee3fa37ff59a80f44a4b61b))

#### Bug Fixes

* **voronoi:**  upgrade d3-delaunay to fix single/collinear points (#640) ([b93c96a5](https://github.com/plouc/nivo/commit/b93c96a58d4614d020142648630ab7cdffc84094))

#### Chore

* **ci:**  disable build steps ([cdaf6fdf](https://github.com/plouc/nivo/commit/cdaf6fdf5a725dbd8235a245fcea433a2c34a7c1))
* **website:**  upgrade gatsby ([e8a8671f](https://github.com/plouc/nivo/commit/e8a8671f8066387fb6972451b556503a64cd72c9))



<a name="v0.59.2"></a>
## v0.59.2 (2019-07-12)


#### Features

* **website:**  add sponsoring link ([871c7efb](https://github.com/plouc/nivo/commit/871c7efbb9ae32b60a284afad91801024ce561f8))

#### Bug Fixes

* **axes:**  treat renderTick as a React component ([4bd566c8](https://github.com/plouc/nivo/commit/4bd566c8485725260f39b1e06f3424a7416f20ab))
* **choropleth:**  add missing domain prop to typings (#634) ([fa3c220a](https://github.com/plouc/nivo/commit/fa3c220a3ff519154d74ad2bcad5eb8b5c0a033f))
* **line:**  add missing tooltip prop to typings (#568) ([0a90609b](https://github.com/plouc/nivo/commit/0a90609bd4c7f9fb29cd95b4879a857736dbb680))



<a name="v0.59.1"></a>
## v0.59.1 (2019-06-29)


#### Features

* **line:**  add missing types (#605) ([f8562008](https://github.com/plouc/nivo/commit/f856200873324f08a8b317a1223834f0167063e4))
* **radar:**  pass key to tooltip format function (#587) ([cca8a9e9](https://github.com/plouc/nivo/commit/cca8a9e98b2cf3a475b81fa8fe786a9082a941a2))
* **tooltip:**  move Chip style to theme (#589) ([343e38c5](https://github.com/plouc/nivo/commit/343e38c5eb663ee0029a95c21c7dc5d93472ab35))

#### Bug Fixes

* **axes:**  respect useUTC option on x/y scale property (#574) ([b4ca5ecc](https://github.com/plouc/nivo/commit/b4ca5ecc576226ba345e77bd918e04eb1ab98b23))
* **bar:**
  *  allow null for axes ([8a22b666](https://github.com/plouc/nivo/commit/8a22b666e24ddeafabf6085daa55d946df2c38f7))
  *  remove unnecessary ColorProps ([865e9a61](https://github.com/plouc/nivo/commit/865e9a61a15d9ec8f45b182e30374194e33cd1ca))
* **stream:**  fix bugs in typings (#593) ([9b157510](https://github.com/plouc/nivo/commit/9b157510d7bacca846d984bc166ff486938b60c8))



<a name="v0.59.0"></a>
## v0.59.0 (2019-06-09)


#### Features

* **scatterplot:**
  *  update stories ([d55b5fce](https://github.com/plouc/nivo/commit/d55b5fce569e33d359b700ebc9be0f690c6334c2))
  *  improve ScatterPlotCanvas ([40d9d2de](https://github.com/plouc/nivo/commit/40d9d2decee9f7c762d057e0f95fdc13dcc94cf3))
  *  improve Mesh support for SVG implementation ([91f66dc4](https://github.com/plouc/nivo/commit/91f66dc4582e16b9f3ecc3e172c34618f9e9509b))
  *  fix TypeScript definitions ([ac012bad](https://github.com/plouc/nivo/commit/ac012bad6be657c1bb40625e9bd32400c154be95))
  *  adapt ScatterPlot stories ([81bf6fd5](https://github.com/plouc/nivo/commit/81bf6fd54457dc74bccf2bdcd67b353604969743))
  *  add ability to format x/y values ([7a80184b](https://github.com/plouc/nivo/commit/7a80184b68237d45780e8fac13b9028f55286938))
  *  rename symbolSize to nodeSize ([501ee0ff](https://github.com/plouc/nivo/commit/501ee0ffc4add6373d35d81fb291d20774bdd7ad))
  *  add support for mix-blend-mode ([4b667dab](https://github.com/plouc/nivo/commit/4b667dab1b5c8e4715059f6f27c0a8a012b7c9d3))
  *  migrate package to new architecture ([4397dab6](https://github.com/plouc/nivo/commit/4397dab67850d13d74890fbb0dbf3d2e89c114fb))
* **stream:**  add TypeScript definitions ([87c762cc](https://github.com/plouc/nivo/commit/87c762cc2a73eb31f54dc034523c40039ae98214))

#### Bug Fixes

* **sankey:**
  *  improve Sankey types ([9d5c7285](https://github.com/plouc/nivo/commit/9d5c7285748f44ce8c146d41643d21ed2b55f957))
  *  change custom align story to use correct align property ([6d300ab6](https://github.com/plouc/nivo/commit/6d300ab6b08d98046331dc754d90751aea46683f))
* **scatterplot:**  fix unit tests ([3ea40c02](https://github.com/plouc/nivo/commit/3ea40c02edcfc9bec9dcd794cefd96edc128de3c))
* **website:**  correct typo on line page ([0ed7eb8a](https://github.com/plouc/nivo/commit/0ed7eb8a77266f80569f8f67dd9e2f142606b631))



<a name="v0.58.0"></a>
## v0.58.0 (2019-05-16)


#### Features

* **bump:**
  *  add support for transitions on Bump component ([9fa5019b](https://github.com/plouc/nivo/commit/9fa5019b6c427a82425a481554c3d08527d43169))
  *  add support for animation for AreaLabels ([3efe3fd8](https://github.com/plouc/nivo/commit/3efe3fd822b9b4062093081d374a500f5fe0c031))
  *  add TypeScript definitions for Bump ([eed820ad](https://github.com/plouc/nivo/commit/eed820ad8674244d564a1a08cb3cdf1e48a44708))
  *  add TypeScript definitions for AreaBump ([e70c4cd5](https://github.com/plouc/nivo/commit/e70c4cd5103e689f254a1504481a359c0978cd1d))
  *  add screenshots ([edf72cae](https://github.com/plouc/nivo/commit/edf72caedd0e582a1eda166cfb3bae834e63f429))
  *  add support for area transition for AreaBump ([4553d555](https://github.com/plouc/nivo/commit/4553d5551a154fe35916e8860cf781ba4b90cf41))
  *  add AreaBump component ([9b69845e](https://github.com/plouc/nivo/commit/9b69845e9242ce09d89aca8798645339438b19e1))
  *  init @nivo/bump package ([5501852d](https://github.com/plouc/nivo/commit/5501852db649210e6c76edb804b5fdcc00ee7b01))

#### Bug Fixes

* **radar:**  fix Radar cached tooltip ([a8626bec](https://github.com/plouc/nivo/commit/a8626becc9ce87229d0d16dfd02da428deee5acd))



<a name="v0.57.2"></a>
## v0.57.2 (2019-05-10)


#### Bug Fixes

* **choropleth:**  add missing domain prop (#540) ([6bf655fb](https://github.com/plouc/nivo/commit/6bf655fba86de10ee40492d7cf062562627b64ee))
* **website:**  fix storybook url config ([5c866ce7](https://github.com/plouc/nivo/commit/5c866ce7f1e2c41d6bd303debe4ef631c07c0957))



<a name="v0.57.1"></a>
## v0.57.1 (2019-05-10)


#### Bug Fixes

* **scales:**  fix time scale instantiation ([c9abfaef](https://github.com/plouc/nivo/commit/c9abfaefa241c1b7bdba7a227894424682fb4894))



<a name="v0.57.0"></a>
## v0.57.0 (2019-05-09)


#### Features

* **line:**
  *  finalize first version of LineCanvas ([bd008153](https://github.com/plouc/nivo/commit/bd008153c80295d0f0c719c30b318b940d2559dc))
  *  fix slices spacing & add support for y axis ([d56881b8](https://github.com/plouc/nivo/commit/d56881b82f5fa480830f3dcb4d22645337f9008d))
  *  add canvas implementation ([d47d5cb1](https://github.com/plouc/nivo/commit/d47d5cb1f164cf930c70d71a305af2c701643871))
* **network:**
  *  add TypeScript definitions ([f2d4ec39](https://github.com/plouc/nivo/commit/f2d4ec39eb950799161565749615715dd17c5966))
  *  add separated node and link components ([a54ac593](https://github.com/plouc/nivo/commit/a54ac593cf59f412780d0ae3967d71610b26bd0c))
  *  init network package ([2ea85816](https://github.com/plouc/nivo/commit/2ea85816dad1653d1258158d03b24ff3081b5262))

#### Bug Fixes

* **svg:**  fix text vertical alignment ([d59fb722](https://github.com/plouc/nivo/commit/d59fb722ad8cc618f257cbb90faf067ccc58c9f4))
* **website:**  fix InheritedColorControl ([862fa0bd](https://github.com/plouc/nivo/commit/862fa0bd4ea0b7a8f1abf17c87f922f76d540392))



<a name="v0.56.2"></a>
## v0.56.2 (2019-04-24)


#### Features

* **colors:**  allow plain color for ordinal scale ([b8d3abb4](https://github.com/plouc/nivo/commit/b8d3abb4bd86398193b988cc30dd98feaf365be4))
* **core:**  allow string format spec in BasicTooltip ([8b382dc3](https://github.com/plouc/nivo/commit/8b382dc3d4c7eb6b75ee0b843a2b58a9c8627862))



<a name="v0.56.1"></a>
## v0.56.1 (2019-04-24)


#### Features

* **chord:**  improve @nivo/chord package ([51a58c11](https://github.com/plouc/nivo/commit/51a58c114b22961dcca6dfe9e52494c8336e0f22))



<a name="v0.56.0"></a>
## v0.56.0 (2019-04-17)


#### Features

* **annotations:**  init @nivo/annotations package ([e0dc149d](https://github.com/plouc/nivo/commit/e0dc149dc14e34c18d9816dfb769875b255123be))
* **axes:**
  *  move all grid & axes stuff from core ([0b564147](https://github.com/plouc/nivo/commit/0b564147c47a08b21e9ebb34d6165a56966059ae))
  *  add support for legends to canvas implementation ([5dcebd63](https://github.com/plouc/nivo/commit/5dcebd63459a5917d82e60bacf39c7bfaff29e3a))
* **bar:**  use @nivo/colors for inherited colors ([c7cf5ce0](https://github.com/plouc/nivo/commit/c7cf5ce03f4b8ebe18554bff965159aba94a06eb))
* **chord:**  use @nivo/colors for inherited colors ([f16f8244](https://github.com/plouc/nivo/commit/f16f8244c6b9a6445ecbb2c3db17dca0817f8b52))
* **circle-packing:**  use @nivo/colors for inherited colors ([53ffed92](https://github.com/plouc/nivo/commit/53ffed924dd90d7bf0c10e7362e03d041e15f426))
* **colors:**
  *  use @nivo/colors for inherited colors for all packages ([e8955560](https://github.com/plouc/nivo/commit/e89555601c2f1a35009fa660e208ab2ff3bc9537))
  *  add colorIdentity support to bar & bubble ([32e61b16](https://github.com/plouc/nivo/commit/32e61b16db29926314b541125205de06bf0f26aa))
  *  init @nivo/colors package ([62644b0a](https://github.com/plouc/nivo/commit/62644b0a8375e2e308fc8d48a4742d6a6873df93))
* **examples:**  upgrade examples dependencies ([e07f58f3](https://github.com/plouc/nivo/commit/e07f58f3d9e8f325762c09936eb27cdace94fe77))
* **geo:**
  *  update choropleth screenshots ([c2f64eac](https://github.com/plouc/nivo/commit/c2f64eac104205e888626adfc6e852743515f096))
  *  add legend support to choropleth components ([bb7a0a2e](https://github.com/plouc/nivo/commit/bb7a0a2ef65c0e9a0f6b47d33281f7fcd6499cfc))
* **line:**  use @nivo/colors for inherited colors ([1347fd82](https://github.com/plouc/nivo/commit/1347fd825d4ac82517ec8e7ad2ea9a04c4f23d52))
* **pie:**  use @nivo/colors for inherited colors ([a217ab8f](https://github.com/plouc/nivo/commit/a217ab8f81fe84dadc807dc9e075aa09573a8511))
* **radar:**
  *  add blend-mode support ([e46b10c9](https://github.com/plouc/nivo/commit/e46b10c9e0fab13ab644b1f7f5dbbf1dc55247a4))
  *  improve @nivo/radar package ([96e60be0](https://github.com/plouc/nivo/commit/96e60be0d2ed4bcfcd168b9df878d33b13cb5d5d))
  *  use @nivo/colors for inherited colors ([4686b2bf](https://github.com/plouc/nivo/commit/4686b2bfa763410c55a9c67c1768dbf975a7d995))
* **sunburst:**  use @nivo/colors for inherited colors ([9cb6b2af](https://github.com/plouc/nivo/commit/9cb6b2afca6839322925f0c4a1e3eacfdf4d696a))
* **swarmplot:**
  *  add support for border color ([de3e8b3a](https://github.com/plouc/nivo/commit/de3e8b3a081a9b18ee81c07934632e9b08000e66))
  *  add ability to use custom tooltip ([83f965ad](https://github.com/plouc/nivo/commit/83f965ad4d6b7007d3224202924acdddd5a0d4c5))
  *  add support for voronoi overlay) ([4b0bcb96](https://github.com/plouc/nivo/commit/4b0bcb960004942b2af6647d249ac10b86cd3101))
  *  init @nivo/swarmplot package ([eb593954](https://github.com/plouc/nivo/commit/eb5939540d0bb73ac0af4034049253e03bcb1b7f))
* **theming:**  add ability to theme crosshairs ([f03848f6](https://github.com/plouc/nivo/commit/f03848f6ff08d5cc73638b6cc16a7c3fde7e9eda))
* **treemap:**  use @nivo/colors for inherited colors ([4b5e65b6](https://github.com/plouc/nivo/commit/4b5e65b682e1b3d19115279427193aa9db100af2))
* **website:**
  *  update colors guide ([99e66e10](https://github.com/plouc/nivo/commit/99e66e109349e0840427ca31e2dd1073bbbbfc26))
  *  add inherited color control ([4a2e0c29](https://github.com/plouc/nivo/commit/4a2e0c29f7fd68cc87b0d804e7b525f3024aa933))
  *  add swarmplot icon ([aa074697](https://github.com/plouc/nivo/commit/aa07469706a4124fb89ecf9e0e101e387801df96))
  *  improve website ([7ed59e94](https://github.com/plouc/nivo/commit/7ed59e94d6248e761dfcd2ba167b28fab9699ddb))

#### Bug Fixes

* **api:**  fix api mappings ([80b281cc](https://github.com/plouc/nivo/commit/80b281cc6a8580101499f8da747beab4412e904d))
* **legends:**  fix legends unit tests ([41dd564f](https://github.com/plouc/nivo/commit/41dd564fcc740e99fa4a1a58ba707b22a877a7b8))
* **sankey:**  fix broken custom node sorting (#498) ([319e7e07](https://github.com/plouc/nivo/commit/319e7e072ac283f8abbece696458a49ccafeaf77))
* **scatterplot:**  fix scatterplot voronoi overlay ([3bdc783e](https://github.com/plouc/nivo/commit/3bdc783e215362bd039a13eb22bd4918ca38e4a9))
* **treemap:**  add missing default colorBy ([ba91da53](https://github.com/plouc/nivo/commit/ba91da53d7e843681db0440203a9d14ae94a8f2f))

#### Chore

* **lockfile:**  update lockfile ([6285d548](https://github.com/plouc/nivo/commit/6285d548440beee68d8450d374e6865b52fa36c1))



<a name="v0.55.0"></a>
## v0.55.0 (2019-03-27)


#### Features

* **calendar:**  add ability to align calendar in its container ([87cc6451](https://github.com/plouc/nivo/commit/87cc6451461c4fae477747a6e6aaade10585d0c8))
* **core:**  remove enclosing div from container if non interactive ([149ed0f8](https://github.com/plouc/nivo/commit/149ed0f86e08ff14d2ae6b6b2e8af5c81fcddf2a))
* **examples:**  add Bar live update example ([26dc32a8](https://github.com/plouc/nivo/commit/26dc32a8c423044542373b97e99f8a17c8590fa8))
* **geo:**
  *  add TypeScript definitions ([d818a665](https://github.com/plouc/nivo/commit/d818a66555a91c7bdf5e80f71ea0dc559707d997))
  *  add abillity to customize label & format value ([ef499799](https://github.com/plouc/nivo/commit/ef49979962609091ef404839524e2fb278bf839b))
  *  migrate to react hooks ([9c5f1879](https://github.com/plouc/nivo/commit/9c5f18798e958abd8902be721a86a852ea2b4d1e))
  *  add support for projection translation/rotation ([a78b293a](https://github.com/plouc/nivo/commit/a78b293ad9e81b70920d83b8a5478f059cfd9fc1))
  *  add charts' icons ([54c00402](https://github.com/plouc/nivo/commit/54c00402bd40fb0148eabeb88c23a3a8c7e8490b))
  *  init geo package ([119b9e98](https://github.com/plouc/nivo/commit/119b9e985026deb72ce69441e3edfc17a6e6db4f))
* **publish:**  add cleanup rollup plugin ([0c707e61](https://github.com/plouc/nivo/commit/0c707e61c3447eaec8e80121e3c02317d9bdf445))
* **voronoi:**
  *  add TypeScript definitions ([b98f65ae](https://github.com/plouc/nivo/commit/b98f65ae9cd84c1290da16a89a6cdd5ba3c2a045))
  *  add support for layers ([c16ae70d](https://github.com/plouc/nivo/commit/c16ae70d455ccdae2fe28e4df9141f98ddcbc97b))
* **website:**
  *  udpate geo icons ([8426ef5b](https://github.com/plouc/nivo/commit/8426ef5b78f4111d04cfeb73729d7ad69722e7f9))
  *  add package to tag list ([12415ac7](https://github.com/plouc/nivo/commit/12415ac7633e59b5af8059cebfc5a5f51843c944))
  *  init guide about theming ([61459b9e](https://github.com/plouc/nivo/commit/61459b9ecba4ed14714216c774b9e8ec253d344c))

#### Bug Fixes

* **geo:**  fix custom layers ([069e4e61](https://github.com/plouc/nivo/commit/069e4e61a048c6f672a3928c2a7d648397f688a2))



<a name="v0.54.0"></a>
## v0.54.0 (2019-03-24)


#### Features

* **calendar:**
  *  add ability to add arbitrary data ([6a46b723](https://github.com/plouc/nivo/commit/6a46b723703ad4204fb484933da8878cd64489c4))
  *  add CalendarCanvas component ([96f8ac29](https://github.com/plouc/nivo/commit/96f8ac2945bcfd80d773ea23895fc7f6bf672786))
  *  add ability to define year legends position ([bf8797ae](https://github.com/plouc/nivo/commit/bf8797ae2c3e779228be2adab4a9770a7685e6cf))
  *  add ability to define month legends position ([9bc70928](https://github.com/plouc/nivo/commit/9bc70928f7c472666e2b8e023b50773765ba6fab))
  *  avoid unnecessary layout computing ([5aa0ff5d](https://github.com/plouc/nivo/commit/5aa0ff5d1664f5ea4d7507275ca6f7b05ef2f404))
  *  add support for min/max value ([e0a46f5a](https://github.com/plouc/nivo/commit/e0a46f5a7fa58727e75d81715d67db4be3bdaa92))
* **sankey:**
  *  adjust labels for vertical layout ([e12cdf15](https://github.com/plouc/nivo/commit/e12cdf15d326c2989b277d90b63ff7af478e9d08))
  *  add support for vertical sankey ([e299590e](https://github.com/plouc/nivo/commit/e299590e729db12a892b1fe8401ccf046f8e11b8))
  *  use more neutral properties for layout support ([e0a56eb6](https://github.com/plouc/nivo/commit/e0a56eb6920e291cb86dc9071568f22aea3a8b64))
  *  move computing out of the rendering component ([a0c29fe4](https://github.com/plouc/nivo/commit/a0c29fe4fb57d36e2769902ccaacce5a8ceecdb6))
  *  improve support for nodes sorting ([f63450fa](https://github.com/plouc/nivo/commit/f63450fa95c05ea5d8c31b44081e4ca91129b4de))
  *  add ability to sort nodes (#401) ([fed5fc4b](https://github.com/plouc/nivo/commit/fed5fc4b81b7b97118e22d8c186f37ed6af23995))
* **website:**
  *  change sankey default layout ([a5352e41](https://github.com/plouc/nivo/commit/a5352e41c195ea34b3b5856403ef68370db58438))
  *  use hooks for calendar pages ([fec85fa0](https://github.com/plouc/nivo/commit/fec85fa0bb095145e9ac1382f256b63571e65dc0))
  *  add doc for bar label + fix stories links ([223c5e57](https://github.com/plouc/nivo/commit/223c5e577651dafe8a7a12c912266f3835f8b253))
  *  upgrade nivo packages ([775ea0b4](https://github.com/plouc/nivo/commit/775ea0b4ca9293d5b991c263d9856f5546517e9c))

#### Bug Fixes

* **website:**  fix broken legends guide ([cc3cb0b1](https://github.com/plouc/nivo/commit/cc3cb0b15171a0d1fa7851420841adc74c2cc8d4))

#### Chore

* **react:**  require React 16.8.4 for future hook usage ([16253fab](https://github.com/plouc/nivo/commit/16253fab9f7bc7e2aa7a13f0d060ceedf5420892))



<a name="v0.53.1"></a>
## v0.53.1 (2019-03-22)


#### Features

* **api:**  fix api publication ([1ec197b5](https://github.com/plouc/nivo/commit/1ec197b58535d04a052ee7df28c818cd725e4607))
* **bar:**
  *  adjust legend data according to layout/mode/reverse ([0c0a6a18](https://github.com/plouc/nivo/commit/0c0a6a185f73e757d742a0d8ba41bc89fe5fc6f9))
  *  add ability to use borders with BarCanvas ([4568516e](https://github.com/plouc/nivo/commit/4568516ec4fb4d26bd71dac977a45ae9c4af4af9))
* **website:**
  *  upgrade react ([62f066b8](https://github.com/plouc/nivo/commit/62f066b885c15da7500e43f08b69055a33f0474b))
  *  upgrade nivo packages ([991f0781](https://github.com/plouc/nivo/commit/991f07811925f556945e4d59f990fe161e393312))



<a name="v0.53.0"></a>
## v0.53.0 (2019-03-21)


#### Features

* **build:**  upgrade rollup & add esm build ([f6d64802](https://github.com/plouc/nivo/commit/f6d64802236337140289baaa96c3a3ace0acdfaa))
* **line:**  add support for gridXValues and gridYValues (#391) ([fd49e83d](https://github.com/plouc/nivo/commit/fd49e83df001d358187bae513eac8d9fc69957d4))
* **sankey:**  decouple node coloring and link coloring (#404) ([c793ffd1](https://github.com/plouc/nivo/commit/c793ffd1bddd89745d3219fd8132c16ebf53807f))
* **storybook:**  upgrade storybook ([670d22df](https://github.com/plouc/nivo/commit/670d22df060bc56533044a7ae4e9e2aebc5d02ca))
* **sunburst:**  allow independent child colors (#463) ([2525ad11](https://github.com/plouc/nivo/commit/2525ad11fa6bbec6d03e2b814df4e526c5a8ea67))
* **theming:**  improve theming ([95dd0603](https://github.com/plouc/nivo/commit/95dd0603f29b7b0109dce7c03e2af27dc0f7779b))
* **website:**  upgrade nivo packages ([33d5508c](https://github.com/plouc/nivo/commit/33d5508c679601af59e58c65292de59cf48575fd))

#### Bug Fixes

* **jest:**  fix jest babel config ([da5edb0d](https://github.com/plouc/nivo/commit/da5edb0d3986d791507fdcc7e5e873f7bc941467))
* **tests:**  upgrade enzyme ([d69be1fc](https://github.com/plouc/nivo/commit/d69be1fc674abdad08c646463a5917d21a84bbb5))
* **typescript:**  fix TableTooltip and LineComputedSerieDatum-type (#428) ([fd35f78e](https://github.com/plouc/nivo/commit/fd35f78e93198d459b0ac14afdde09625f156e96))
* **website:**  fix wrong title on the guides/axes page (#441) ([91eacdbe](https://github.com/plouc/nivo/commit/91eacdbe6e19ecf2ba454f8d7c0a07a35e4a5f25))

#### Chore

* **deps:**  upgrade few dependencies ([233e2eaf](https://github.com/plouc/nivo/commit/233e2eaf0b2fa93a840d71cf03a990d5cca62504))
* **github:**  add issue template ([944f8bdf](https://github.com/plouc/nivo/commit/944f8bdfac058ccce0ee48f331a0b4b1f47c5d22))



<a name="v0.52.1"></a>
## v0.52.1 (2019-01-24)


#### Features

* **canvas:**  add support for custom font family (#430) ([11f039e0](https://github.com/plouc/nivo/commit/11f039e0d8c2eb5a5b69b58006aa9aebcae2c787))
* **scatterplot:**  set pointer as 'normal' not crosshair (#402) ([29848b87](https://github.com/plouc/nivo/commit/29848b878429814cc9a2c7348172a9eb4f80d46a))
* **website:**
  *  remove responsive components from explorer ([27524f18](https://github.com/plouc/nivo/commit/27524f184ff338438291facac1b7ce2e762c8d21))
  *  generate chart icons from code ([209177af](https://github.com/plouc/nivo/commit/209177afea51515c70ccdf842cf10a0c8a3b6578))
  *  upgrade nivo packages ([d1bb0571](https://github.com/plouc/nivo/commit/d1bb0571f553ffca1c2e2f8dcf17871e1f6c288d))

#### Bug Fixes

* **bar:**  Allow BarItem label property to accept React.Element ([48c8e410](https://github.com/plouc/nivo/commit/48c8e410ba8acc5b05add184bad2542c026a21f8))
* **lodash:**  use scoped imports ([dea6a75f](https://github.com/plouc/nivo/commit/dea6a75f921e4e6e9c62a7ebb987c32fafbe04f8))
* **typescript:**  Allow axis to be AxisProps or `null` ([5d45796f](https://github.com/plouc/nivo/commit/5d45796f5a9ed8c4e7c55e979a5681e2edc10948))

#### Chore

* **line:**  Pass showTooltip and hideTooltip to custom layers (#425) ([a6a120ed](https://github.com/plouc/nivo/commit/a6a120ed905a8bd5e5cc51f7d53e70a1aca0a11a))
* **packages:**  cleanup packages on build ([75361dc4](https://github.com/plouc/nivo/commit/75361dc476ccbfce03e69d78d2e9e1e32cd4288f))



<a name="v0.52.0"></a>
## v0.52.0 (2018-12-10)


#### Features

* **api:**  move api to main nivo repo ([50245962](https://github.com/plouc/nivo/commit/5024596209bb0befb6f623d44d97f5663d881f4d))
* **scales:**  add support for log scale (#378) ([971925f8](https://github.com/plouc/nivo/commit/971925f89fe67f02dc3ab5e2be601bf4666d273b))
* **website:**
  *  disable service worker ([b40d620e](https://github.com/plouc/nivo/commit/b40d620e067d94a740cb63d2c36422c1dbe4d9bb))
  *  upgrade nivo packages ([fbc78c00](https://github.com/plouc/nivo/commit/fbc78c00364e9f1b6152c38d6d739ac3a3ef01f2))

#### Bug Fixes

* **bar:**  fix missing legend in Bar chart  #362 ([aa12d9d2](https://github.com/plouc/nivo/commit/aa12d9d23e43344b05c4ea103177afbe2285b6ee))
* **scatterplot:**  fix wrong legend item color in ScatterPlotCanvas (#372) ([155fdfae](https://github.com/plouc/nivo/commit/155fdfaefed512fd4b32d2e91f46055800ba1f1a))
* **website:**  use https instead of http ([07b1bade](https://github.com/plouc/nivo/commit/07b1bade670a7a7d7219f5a0aaf7849c21f23d7c))



<a name="v0.51.6"></a>
## v0.51.6 (2018-11-29)


#### Features

* **bar:**  add enableGridX/enableGridY/legends support to BarCanvas (#354) ([f872aaa1](https://github.com/plouc/nivo/commit/f872aaa11d51c76f2556807ca60fc43cf3bc2847))
* **line:**  add support for layers to Line component ([35911df3](https://github.com/plouc/nivo/commit/35911df3bebc2d4fc824e5d4e9fe38915ce5b6de))



<a name="v0.51.5"></a>
## v0.51.5 (2018-11-18)


#### Features

* **bar:**  add ability to customize tooltip label ([16ae9d5c](https://github.com/plouc/nivo/commit/16ae9d5c455bad7349598d95aa746d018c2454b6))



<a name="v0.51.4"></a>
## v0.51.4 (2018-11-18)


#### Features

* **tooltips:**  improve bar & stream tooltips ([698585fc](https://github.com/plouc/nivo/commit/698585fcf9c6fcb4d2bc93fc9c384e7bd7221793))



<a name="v0.51.3"></a>
## v0.51.3 (2018-11-17)


#### Features

* **scatterplot:**  add support for layers to ScatterPlot component ([f3a5a842](https://github.com/plouc/nivo/commit/f3a5a84259d0103193a766d610a517e7527c63e3))



<a name="v0.51.2"></a>
## v0.51.2 (2018-11-14)


#### Features

* **chord:**  add support for font style for ChordCanvas ([c4f29c51](https://github.com/plouc/nivo/commit/c4f29c51408b9be6ad513d0eaf9e303ac12a19eb))



<a name="v0.51.1"></a>
## v0.51.1 (2018-11-14)


#### Features

* **bar:**  add support for layers to Bar component ([8a817ec9](https://github.com/plouc/nivo/commit/8a817ec9b632740457546aca65fb3f09c8f9ffa3))
* **website:**
  *  upgrade react-scripts ([db922af5](https://github.com/plouc/nivo/commit/db922af5a723f4b2b04c11f5ce61c04dce9e5938))
  *  upgrade nivo packages ([fd850795](https://github.com/plouc/nivo/commit/fd850795df6efdc78b0a8a6c429f54d96a094763))



<a name="v0.51.0"></a>
## v0.51.0 (2018-11-02)


#### Features

* **bubble:**  trigger onClick when isZoomable is false (#322) ([787341ac](https://github.com/plouc/nivo/commit/787341acb2e540233e2a4b94799edcf7275c5b24))
* **chord:**  add support for ribbon blendmode ([2b0cfec6](https://github.com/plouc/nivo/commit/2b0cfec62751d5bb1a17dce0b76234d86d89e295))
* **deps:**  upgrade deps ([be6e96e4](https://github.com/plouc/nivo/commit/be6e96e414349df5a000de31725ad791a6b3f831))
* **heatmap:**  use @nivo/axes package for axes ([36cd9c7b](https://github.com/plouc/nivo/commit/36cd9c7b265f708b4a0a64a0244b2748d6ee58e4))
* **line:**
  *  add support for mix-blend-mode on areas ([c434148f](https://github.com/plouc/nivo/commit/c434148f50302bffba4d3dbdb042426ea6c968fd))
  *  add typescript definitions ([cfa6a59c](https://github.com/plouc/nivo/commit/cfa6a59c87ccfd41c6069837ff72150e8440daf5))
* **scatterplot:**
  *  add ability to use a mesh to capture interactions ([ff9399fa](https://github.com/plouc/nivo/commit/ff9399fa1d0a88a8ad696f74257b82f07d6a50a2))
  *  add scatterplot typescript definitions ([22c930d0](https://github.com/plouc/nivo/commit/22c930d0f26718a026ce06ceaa1735548efa7677))
  *  improve scatterplot ([4ae6591d](https://github.com/plouc/nivo/commit/4ae6591d47b85edc210c50d99cdf2280611ca479))
* **website:**  upgrade nivo packages ([ddb22915](https://github.com/plouc/nivo/commit/ddb22915c5718c94e2e37b20ddfc2aee639c9563))

#### Bug Fixes

* **chord:**  skip rendering for zero/negative radius ([647a496a](https://github.com/plouc/nivo/commit/647a496a250f1d558fff18ec193d2554043d1eb0))
* **heatmap:**  fix support for enableLabels property ([a866586a](https://github.com/plouc/nivo/commit/a866586abd33522558d3f552b90bc4daf655386b))



<a name="v0.50.0"></a>
## v0.50.0 (2018-10-17)


#### Features

* **axes:**  add `tickIndex` to Axis’ renderTick method (#305) ([93b85c0b](https://github.com/plouc/nivo/commit/93b85c0b55953dfcbc639164543e83ed788fd842))
* **interactions:**  add support for mouseenter/leave on bar, pie & scatterplot svg (#280) ([76c8722b](https://github.com/plouc/nivo/commit/76c8722bb90d947b1933bb00344a0bb606605159))
* **scatterplot-markers:**  add markers to scatterplot SVG (#287) ([d7192461](https://github.com/plouc/nivo/commit/d71924612f3c5a141defd06e5eab0d2487791403))
* **stream:**  add support for dots ([4860ef53](https://github.com/plouc/nivo/commit/4860ef5307af2a63662e3062cf2beef2e9286b42))

#### Bug Fixes

* **website:**  remove extra space in heatmap package name ([93077734](https://github.com/plouc/nivo/commit/93077734b6faed1beed595bff13fd8a0b16e85f2))



<a name="v0.49.1"></a>
## v0.49.1 (2018-09-08)


#### Features

* **bar:**  use @nivo/axes instead of @nivo/core for SVG axes ([3b22c6fb](https://github.com/plouc/nivo/commit/3b22c6fbfe553ee74e82481d7d7d443fe924a339))
* **examples:**  upgrade retro example deps ([203f7198](https://github.com/plouc/nivo/commit/203f719840a0f0287542567e2ca4bec8de08a5a5))
* **website:**  upgrade nivo packages ([531e492b](https://github.com/plouc/nivo/commit/531e492bea9b9d46a9633a2381dabbfe49584530))



<a name="v0.49.0"></a>
## v0.49.0 (2018-09-08)


#### Features

* **parallel-coordinates:**
  *  add support for individual axis options ([b8a39070](https://github.com/plouc/nivo/commit/b8a39070024450377314d21b27f11ceaaf623c17))
  *  init package ([5a4db6ca](https://github.com/plouc/nivo/commit/5a4db6cad3c00601ad6161adb54cf8a4c5891ff3))
* **theming:**  improve theming ([0040bb38](https://github.com/plouc/nivo/commit/0040bb38e0f5efe339ab7e96ea4c7025984bcdfe))
* **umd:**  git ignore umd builds ([58f03a59](https://github.com/plouc/nivo/commit/58f03a59a365a574fdac214d1470d670829ee268))
* **website:**  upgrade nivo packages ([47a5f8a7](https://github.com/plouc/nivo/commit/47a5f8a7e8611841ca1176d47670e1b6c5c6a993))



<a name="v0.48.1"></a>
## v0.48.1 (2018-09-04)


#### Features

* **bullet:**  interpolate colors ([96ad5f64](https://github.com/plouc/nivo/commit/96ad5f64e8ff948885d789e16765eebf4f5677f4))

#### Bug Fixes

* **build:**  add missing externals in rollup config ([e23182f2](https://github.com/plouc/nivo/commit/e23182f2de917835bd7cda267a57484b93c77290))
* **bullet:**  remove deprecated property titleWidth ([0c8e8bbb](https://github.com/plouc/nivo/commit/0c8e8bbb734e804c50e3bc235685c91d967c7c7d))



<a name="v0.48.0"></a>
## v0.48.0 (2018-09-04)


#### Features

* **bullet:**
  *  improve @nivo/bullet package ([9154c51f](https://github.com/plouc/nivo/commit/9154c51f6ec327891fa062d35042f2b1a7a0dd05))
  *  init @nivo/bullet package ([dc7b37f5](https://github.com/plouc/nivo/commit/dc7b37f5509923c55a3db1e89f451aeb459ec012))
* **theming:**  improve theming ([c7e7a9fe](https://github.com/plouc/nivo/commit/c7e7a9fe77eaf65abc1e450e1d2ce7d1b98acda9))
* **website:**  upgrade nivo packages ([1c5fd5db](https://github.com/plouc/nivo/commit/1c5fd5dbb9e99912d1df871450112c1ad678beda))



<a name="v0.47.1"></a>
## v0.47.1 (2018-08-30)


#### Features

* **axes:**  improve tickValues support ([58aeaab0](https://github.com/plouc/nivo/commit/58aeaab08eb14fa1bd52f8cd045e7e01fae4306a))
* **website:**  upgrade nivo packages ([a88e50fd](https://github.com/plouc/nivo/commit/a88e50fd21c4b4a4ff769a1b80a9e66262b7b196))



<a name="v0.47.0"></a>
## v0.47.0 (2018-08-30)


#### Features

* **components:**  fix components display name ([84aa832d](https://github.com/plouc/nivo/commit/84aa832da4d26c55e7920e3e3ad740437f124eea))
* **line:**
  *  fix line slices for time scales ([82e03d3a](https://github.com/plouc/nivo/commit/82e03d3a593b34a26ca2c2ebc1b6a97eb98ab5f7))
  *  compute slices from scales package ([31c06c0f](https://github.com/plouc/nivo/commit/31c06c0fdf1a1d45d4f0a0419d7a3b994f3f263e))
  *  add story about negative values highlight ([b425e35f](https://github.com/plouc/nivo/commit/b425e35f6ff5061023b77b1d8d41b1e118b18d75))
  *  init linear & time scale support ([3bce793a](https://github.com/plouc/nivo/commit/3bce793adc04c4cf49978517057bd47ea5359f4c))
* **scales:**
  *  improve time scale support ([614038e4](https://github.com/plouc/nivo/commit/614038e494bf935ffe601f0571a91e2ca4008e7b))
  *  init scales package ([4324706d](https://github.com/plouc/nivo/commit/4324706d07db77fdad25db23ab7e77eb54ae1f40))
* **storybook:**  improve components stories ([d29d21f4](https://github.com/plouc/nivo/commit/d29d21f483ae8761ba3abcf6cc0314b5012cb553))
* **stream:**  add info about stories ([4f98124c](https://github.com/plouc/nivo/commit/4f98124c5fca3fad59f7292366a4628925e387f8))
* **website:**
  *  change line demo data generation method ([124028de](https://github.com/plouc/nivo/commit/124028dec51dd8477ce158929ed617d7a49d72cf))
  *  upgrade nivo packages ([4aeed5d8](https://github.com/plouc/nivo/commit/4aeed5d87159164df0f045a125131f29bc2e2e5a))

#### Bug Fixes

* **colors:**  fix colors due to d3 packages upgrade ([a17d93bc](https://github.com/plouc/nivo/commit/a17d93bc859d2f202f4c2960e9c3fbee4590e581))



<a name="v0.46.0"></a>
## v0.46.0 (2018-08-26)


#### Features

* **line:**  add ability to specify grid X/Y values ([b44c8543](https://github.com/plouc/nivo/commit/b44c85437e8ccd204a266e830427f0527c5b77b5))
* **radar:**  add ability to customize label ([03b3640b](https://github.com/plouc/nivo/commit/03b3640b6aee3158e88d66868be099f16ba6e8f3))
* **waffle:**  add ability to toggle datum by id ([7f411dae](https://github.com/plouc/nivo/commit/7f411dae9d481c6118a95ff06d113ec045309480))
* **website:**
  *  add component to list storybook stories ([6b9ce02e](https://github.com/plouc/nivo/commit/6b9ce02ec79a0b8a524323300e3a14250df4cddb))
  *  add Line legends control ([91bac9ed](https://github.com/plouc/nivo/commit/91bac9ed70d27a01f5274cbfae3281ec9166fffd))
  *  upgrade nivo packages ([c0f12986](https://github.com/plouc/nivo/commit/c0f12986afef25b5ed3fd4c20de66fceec028b45))



<a name="v0.45.0"></a>
## v0.45.0 (2018-08-26)


#### Features

* **core:**
  *  fix prop wraning when using markup for axis legend ([4152c090](https://github.com/plouc/nivo/commit/4152c0906849aa53ef4fa311aa2a66a16402e9d8))
  *  add support for string or number keys on bar/line and pie ([953c572e](https://github.com/plouc/nivo/commit/953c572eb2ea8986b5599545bb23387202819356))
* **deps:**  upgrade deps ([3f4b4294](https://github.com/plouc/nivo/commit/3f4b4294cb3ad84a351cb4f50c4b60b39ffd88cc))
* **legends:**
  *  add support for both color and fill ([4cb33e25](https://github.com/plouc/nivo/commit/4cb33e25b12084932cd749b3e74f6f8789adbe80))
  *  add documentation for custom symbol shape ([7adc8381](https://github.com/plouc/nivo/commit/7adc8381728f53e4a392d5a8e1574cc469c769ba))
  *  add test for custom symbol shape support ([50b2d39c](https://github.com/plouc/nivo/commit/50b2d39c5bd7933f88e6fa296460c7afc311b7de))
  *  add support for custom symbol shape ([7419c912](https://github.com/plouc/nivo/commit/7419c912da7b936b1cc8eeb4d8188f11e752125e))
  *  add support for basic interactivity ([527b1fa7](https://github.com/plouc/nivo/commit/527b1fa738e267d05932e2914b52747ebda8d7fc))
* **waffle:**
  *  add legend support for WaffleCanvas ([a60b34e6](https://github.com/plouc/nivo/commit/a60b34e663a87d01d664627e414f2fda4fbe6712))
  *  add legend support for Waffle ([6a5db0dd](https://github.com/plouc/nivo/commit/6a5db0dd574050749d0944ac5ac0ebf451d51d5b))
* **website:**
  *  add ability to manage array of props ([8f44ab94](https://github.com/plouc/nivo/commit/8f44ab94bc198e10cdeebf2c6480ceb669a548b8))
  *  upgrade nivo packages ([4d819df6](https://github.com/plouc/nivo/commit/4d819df62f3a63b8b6665701a2f06e80e99719b1))

#### Bug Fixes

* **website:**  fix legends guide ([6828c33f](https://github.com/plouc/nivo/commit/6828c33f733c39026914e7d18c2fe0b8493b3157))



<a name="v0.44.0"></a>
## v0.44.0 (2018-08-24)


#### Features

* **core:**
  *  remove packages directory prefix ([262a8ee9](https://github.com/plouc/nivo/commit/262a8ee96bb870fe388e64d1453248aed94bf445))
  *  use yarn workspaces ([36999cc2](https://github.com/plouc/nivo/commit/36999cc216eb9d3e33f73111424e63d23143c17d))
* **line:**  add support for custom tooltip ([39fad124](https://github.com/plouc/nivo/commit/39fad12421f3b06be830da13d2efdbfccfff2e96))
* **scatterplot:**  remove unused min/max x/y ([efbda0fb](https://github.com/plouc/nivo/commit/efbda0fb54cf6b7a6c42537a6ec813975805571b))
* **website:**  add option to showcase custom scatterplot tooltip ([68b72a44](https://github.com/plouc/nivo/commit/68b72a448217963f0a7d287674be45aabef3257b))

#### Bug Fixes

* **Makefile:**  disable command priting for packages-build recipe ([1046ee2c](https://github.com/plouc/nivo/commit/1046ee2c723cd3f9d89c546f0785c72f6098f530))
* **calendar:**  fix crash when no data is empty ([5ac42141](https://github.com/plouc/nivo/commit/5ac42141d2495aa1b4afc22e6e2ada3e7b7e9a51))
* **eslint:**  fix eslint for all packages ([27bf8d0c](https://github.com/plouc/nivo/commit/27bf8d0cec55f7caf7bb18fc5f5eeeb9c4e7875e))
* **heatmap:**  better handling of NaN values ([02ef5577](https://github.com/plouc/nivo/commit/02ef55773bb3df971b5fefc876281eb72ccaae91))



<a name="v0.43.0"></a>
## v0.43.0 (2018-06-05)


#### Features

* **calendar:**
  *  add ability to define custom tooltip ([7a076bf3](https://github.com/plouc/nivo/commit/7a076bf370801bfb003be54f5bdfcf395cd959de))
  *  add stories ([d3b8951e](https://github.com/plouc/nivo/commit/d3b8951e964c5a6ad6bcc18a8161294591b5e67d))
  *  add ability to customize year/month legend ([a43c7082](https://github.com/plouc/nivo/commit/a43c7082ff9b921e9a4537db82dc1519f62012c7))
  *  add TypeScript definitions ([98106ab1](https://github.com/plouc/nivo/commit/98106ab1a2e7c5862b1a7977ff2ff92accd64933))



<a name="v0.42.1"></a>
## v0.42.1 (2018-06-05)


#### Features

* **bar:**  add ability to define grid values ([afd1ee30](https://github.com/plouc/nivo/commit/afd1ee30cc1e58a6d1dc15f75d9a1da62e8266f4))
* **pie:**  adjust website & docs ([8f22f893](https://github.com/plouc/nivo/commit/8f22f893ac230090b188e896a06fdf632b157a2c))

#### Bug Fixes

* **bar:**  fix BarItem label prop type ([682cbed0](https://github.com/plouc/nivo/commit/682cbed01babb4773568eb590463c22dfd0b5762))
* **line:**  fix LineSlices id prop type ([6f229b90](https://github.com/plouc/nivo/commit/6f229b90879c9c042c07e387b5999afdaa727442))



<a name="v0.42.0"></a>
## v0.42.0 (2018-06-05)


#### Features

* **pie:**
  *  improve pie components ([eb14f0cb](https://github.com/plouc/nivo/commit/eb14f0cb165b72ed1e2e19c2c03ce68cc4e4d8de))
  *  cleanup website PieCanvas demo ([31ef9e53](https://github.com/plouc/nivo/commit/31ef9e5371b508181d9dbf2a28d104f540973b2d))
  *  init support for start/end angle + PieCanvas ([52f6a9e1](https://github.com/plouc/nivo/commit/52f6a9e140937d8407cfe0af2c98749a514a5fad))
* **website:**  upgrade nivo packages ([d6eefa30](https://github.com/plouc/nivo/commit/d6eefa300d5ddaddc1e8ba0c13097670bf5269d4))



<a name="v0.41.0"></a>
## v0.41.0 (2018-05-30)


#### Features

* **sankey:**
  *  add TypeScript definitions ([c2a9d38b](https://github.com/plouc/nivo/commit/c2a9d38b20ee1ce30b0c2a8e0d9fb30d0f8b3534))
  *  add gradient & blend mode support for links ([27d56050](https://github.com/plouc/nivo/commit/27d56050a0ad98d2504275900daccdf25627598e))
* **website:**  upgrade nivo packages ([cf62e33d](https://github.com/plouc/nivo/commit/cf62e33d70943ade584b807cad3385fd16872fbd))



<a name="v0.40.0"></a>
## v0.40.0 (2018-05-30)


#### Features

* **bar:**  include TypeScript definition in package ([0d221c74](https://github.com/plouc/nivo/commit/0d221c747d34ba6031b3dae6e4a9d0c20821b9ca))
* **heatmap:**  include TypeScript definition in package ([868620eb](https://github.com/plouc/nivo/commit/868620eb2642aff5abbdac2dabb826a6b0f199dc))
* **pie:**
  *  add support for custom tooltip ([d3734428](https://github.com/plouc/nivo/commit/d3734428cee364f4eb67af5c0f4c572b9973dc31))
  *  include TypeScript definition in package ([04fc931e](https://github.com/plouc/nivo/commit/04fc931e032710fe245e4327eb525af15cde3c74))
* **radar:**  add ability to define max value ([880d7299](https://github.com/plouc/nivo/commit/880d7299c85ee7a151105773b4cd2d7566649f9f))
* **website:**  upgrade nivo packages ([8dadeead](https://github.com/plouc/nivo/commit/8dadeeadca3e29b4ab86226602afdc64609477f6))

#### Bug Fixes

* **pie:**  fix code formatting ([1f9cf69e](https://github.com/plouc/nivo/commit/1f9cf69e823d085345c6cb5d36b8233e18698f9d))
* **waffle:**  remove self import from TypeScript def ([867a545a](https://github.com/plouc/nivo/commit/867a545aba2ffb6110e226c2490572011049c895))



<a name="v0.39.0"></a>
## v0.39.0 (2018-05-30)


#### Features

* **waffle:**  add waffle package (#202) ([aceafc48](https://github.com/plouc/nivo/commit/aceafc489465f82be140b997cf950875baafc55d))



<a name="v0.38.0"></a>
## v0.38.0 (2018-05-29)


#### Features

* **heatmap:**  init TypeScript definitions (#198) ([6c5432db](https://github.com/plouc/nivo/commit/6c5432db7b1420bad94f6d7afe2931a67f6c7e0e))
* **pie:**  add TypeScript Definitions for Pie component ([0def4c31](https://github.com/plouc/nivo/commit/0def4c3141c869e309366730c26c28070ec143e6))
* **tooltips:**  add support for custom tooltips for bubble charts and treemaps (#200) ([092f3e0c](https://github.com/plouc/nivo/commit/092f3e0c5253d2ca66ce53b028c918953c08f97d))
* **website:**
  *  fix treemap source code for treemap components ([b97c07b8](https://github.com/plouc/nivo/commit/b97c07b8c53e66f64265662e832dedc4446df067))
  *  restore scrol position when pathname changes ([49b7ffca](https://github.com/plouc/nivo/commit/49b7ffcae859b57b2a7fac1d041755972ec242cb))
  *  use BrowserRouter instead of HashRouter ([a360e444](https://github.com/plouc/nivo/commit/a360e444f63944914456e6aab9f8c2819a2ec238))
  *  upgrade nivo packages ([69deaa17](https://github.com/plouc/nivo/commit/69deaa17a9634e9a31f7fcbf36dcafa2cbfa1a08))



<a name="v0.37.0"></a>
## v0.37.0 (2018-05-19)


#### Features

* **heatmap:**  add support for onClick event ([52d077c7](https://github.com/plouc/nivo/commit/52d077c718f3ca039737de13a19920625e9effde))
* **website:**  upgrade nivo packages ([5f416e9a](https://github.com/plouc/nivo/commit/5f416e9ac0a20e44ad9bf63c0fdbc6d285706966))



<a name="v0.36.0"></a>
## v0.36.0 (2018-05-19)


#### Features

* **bar:**  improve custom tooltip support ([5816555e](https://github.com/plouc/nivo/commit/5816555e73021d91d8af32a4b972c2738f58c1c6))
* **tooltips:**  add support for configurable tooltips for bar charts and heat maps (#159) ([82473c10](https://github.com/plouc/nivo/commit/82473c10553e976b6e9d14c9e51d4093a3af510c))
* **website:**  upgrade nivo packages ([8d8374a3](https://github.com/plouc/nivo/commit/8d8374a3dcd5d532c50831bbf193e06251996a2f))



<a name="v0.35.2"></a>
## v0.35.2 (2018-05-19)


#### Features

* **website:**  upgrade nivo packages ([66a7208c](https://github.com/plouc/nivo/commit/66a7208c577b74e30ba01fb986e1b4bdb7a5bdb5))

#### Bug Fixes

* **lodash:**  add missing deps & use scoped imports ([f04660f2](https://github.com/plouc/nivo/commit/f04660f2ff1cd965b0a9d2609782e0409cb486d5))



<a name="v0.35.1"></a>
## v0.35.1 (2018-05-19)


#### Bug Fixes

* **generators:**  use modules ([9cec118c](https://github.com/plouc/nivo/commit/9cec118c0024af202a9fe24e94715916e1088069))



<a name="v0.35.0"></a>
## v0.35.0 (2018-05-19)


#### Features

* **ci:**  update travis config ([25e4cdca](https://github.com/plouc/nivo/commit/25e4cdca8cfb92d584512af03c728828b52b5b30))
* **deps:**  use yarn with lerna & add missing yarn.lock files ([42675e47](https://github.com/plouc/nivo/commit/42675e47042d4bacf2edb3860f66a5a1971079e3))
* **legends:**  add default text color + canvas support for text color ([20a30ab8](https://github.com/plouc/nivo/commit/20a30ab8a795d359b6e6b1eeb0a2194780c4cb20))
* **lint:**  centralize lint command & config ([e8e38da4](https://github.com/plouc/nivo/commit/e8e38da4a0f20e0a9f07606ab36853fdab4d44ed))
* **packages:**  use rollup for packages build ([f24cb08d](https://github.com/plouc/nivo/commit/f24cb08d8a8eb2feecb858fb41875ac99b782db0))
* **pie:**  add support for onClick event ([b171044e](https://github.com/plouc/nivo/commit/b171044e25e25297e0f3714b5121dd24c21d86f8))
* **react:**  nivo now require react >= 16.2.0 < 17.0.0 ([f64d3ef6](https://github.com/plouc/nivo/commit/f64d3ef6026438e4af29f436b27c46f00f9feae7))
* **stack:**  make line areas stack in front of each other visibly #152 ([8ec91a66](https://github.com/plouc/nivo/commit/8ec91a66e3c3140c9176b52384a4603582545930))
* **tests:**  centralize test command & dependencies ([eda819ca](https://github.com/plouc/nivo/commit/eda819ca03f3abfae50a5f21a9f7a8af5dcb562c))
* **website:**  improve chart tabs ([2c2265f5](https://github.com/plouc/nivo/commit/2c2265f5671b82997515ea26c978b575e86dd3e7))

#### Bug Fixes

* **deps:**  do not ignore yarn.lock ([1a60cfb8](https://github.com/plouc/nivo/commit/1a60cfb84ccc17ee933866e3c573d03546e6c066))
* **scripts:**  fix make targets documentation ([48d87ec2](https://github.com/plouc/nivo/commit/48d87ec2a62b2e5bcd61110c132b8863776ceebb))
* **security:**  Upgrade transitive hoek dep ([50d6fd52](https://github.com/plouc/nivo/commit/50d6fd521150098093c2d633efed8116fa63a0c2))
* **storybook:**  fix storybook packages import ([d3abafdc](https://github.com/plouc/nivo/commit/d3abafdcaf612df8602c961e63e2c1d7a22fb94b))
* **website:**  fix website Stream example code (#188) ([129572e6](https://github.com/plouc/nivo/commit/129572e621b7e6b246b61a0a7cccdb484bd5d31f))



<a name="v0.34.0-1"></a>
## v0.34.0-1 (2017-12-18)


#### Features

* **chord:**
  *  update @nivo/chord directory layout ([a143d80f](https://github.com/plouc/nivo/commit/a143d80fbbbfe689872a0bfa51a8a1a54316b9ae))
  *  init tests for @nivo/chord package ([a0622609](https://github.com/plouc/nivo/commit/a0622609eda265d355a23c0dbdc42036a6c41bc6))
* **composition:**  init more granular approach to components ([da5c6fbf](https://github.com/plouc/nivo/commit/da5c6fbfe34db4bb5c22724a0926acffd5477608))
* **legends:**  init SizeLegendSvg ([22c186ad](https://github.com/plouc/nivo/commit/22c186ad5cf305bb1e7eb9ca1034af1a52f4741f))
* **line:**
  *  fix dot label color ([330720ce](https://github.com/plouc/nivo/commit/330720ceaffce246cb77f3a5cb08ff307d9e9c31))
  *  init tests & eslint for @nivo/line package ([5bf09098](https://github.com/plouc/nivo/commit/5bf0909843705aed65e49220ab076dfaaac312b0))
  *  add support for empty values + custom x scale + stacking ([4690cbc4](https://github.com/plouc/nivo/commit/4690cbc400565e35c5af463655d153d613991dc5))
  *  remove unused component ([bfec8288](https://github.com/plouc/nivo/commit/bfec82884f4a24b66ab682b32073287f998ddd9b))
  *  add LineChartCanvas component ([be930613](https://github.com/plouc/nivo/commit/be9306135d85569d9ad95da00e5266718bff9efe))
  *  rework stories ([05ea88f7](https://github.com/plouc/nivo/commit/05ea88f716ea86206258dab86f530321a747d84c))
  *  add LineChartSvg component ([42f1cfe3](https://github.com/plouc/nivo/commit/42f1cfe35027879cfeb8f62fcd09a765f6afaab6))
  *  restore ability to animate line & line area ([d517c521](https://github.com/plouc/nivo/commit/d517c521a5f652b026fe6b9a8380ad9440a12abf))
* **sankey:**  init tests & eslint for @nivo/sankey package ([b4428b1e](https://github.com/plouc/nivo/commit/b4428b1ec99e702565ce98fba1d1e50139b962de))
* **scales:**  add support for time scale ([28e8ebff](https://github.com/plouc/nivo/commit/28e8ebffe8fa9bdbd8d33c2143e61c9733655a1e))
* **screenshots:**  update packages screenshots ([a39731c3](https://github.com/plouc/nivo/commit/a39731c3ffdd59d36668603f033176d7f99b7b45))
* **website:**
  *  make chart demo layout consistent across chart types ([f3166062](https://github.com/plouc/nivo/commit/f31660625fa72fb827a8ecf662e6c9f89334ddc9))
  *  improve chart tabs ([c32c5729](https://github.com/plouc/nivo/commit/c32c5729e3402b20983c020dfb8d51d569be916c))
  *  add illustration to @nivo/line low level components doc ([5ddaede9](https://github.com/plouc/nivo/commit/5ddaede9a86723a94b3767ff2e3f67eb79d01117))
  *  add @nivo/line low level components doc ([cf8a5caa](https://github.com/plouc/nivo/commit/cf8a5caaa589027dc01b6486ffed8220cf0acbab))
  *  upgrade @nivo packages ([71e1c4b0](https://github.com/plouc/nivo/commit/71e1c4b039feb6ef7cc9e4378a30f3a5018d6781))

#### Bug Fixes

* **eslint:**  fix eslint for some packages ([22b6bf6e](https://github.com/plouc/nivo/commit/22b6bf6e195f231c0bc4ca9c68f494909c40d5c7))
* **line:**  avoid re-rerendering LineDots ([a6f51379](https://github.com/plouc/nivo/commit/a6f513793d1ba84bacc006ac3fc82932065f543f))



<a name="v0.33.0"></a>
## v0.33.0 (2017-12-09)


#### Features

* **scatterplot:**
  *  add tests and stories ([bbc03444](https://github.com/plouc/nivo/commit/bbc03444a1ecc69a49273c695bb37b53473fc6af))
  *  add support for tooltips on ScatterPlotCanvas ([42a17314](https://github.com/plouc/nivo/commit/42a17314fe299f14a0e2eee3a84e492da1d9099b))
  *  add scatterplot package ([52fab5f9](https://github.com/plouc/nivo/commit/52fab5f98dcda403df46dc2565b8f7bfd4863472))

#### Bug Fixes

* **chord:**  fix broken imports ([252efc0f](https://github.com/plouc/nivo/commit/252efc0f0a6694af0191b951bca3a7f93c0aef7a))



<a name="v0.33.0-8"></a>
## v0.33.0-8 (2017-12-09)


#### Features

* **scatterplot:**  add support for tooltips on ScatterPlotCanvas ([fc01970b](https://github.com/plouc/nivo/commit/fc01970bbfc0a8b811489f6df776f60956b140e8))



<a name="v0.33.0-7"></a>
## v0.33.0-7 (2017-12-09)




<a name="v0.33.0-6"></a>
## v0.33.0-6 (2017-12-09)


#### Bug Fixes

* **chord:**  fix broken imports ([1021624a](https://github.com/plouc/nivo/commit/1021624ae72d52f6b4336e1ef7fe9053ab9aca98))



<a name="v0.33.0-5"></a>
## v0.33.0-5 (2017-12-09)


#### Features

* **api:**  remove empty api package ([dd47b293](https://github.com/plouc/nivo/commit/dd47b293edcb07a6ed23cd0a26e29c4352ecfb3d))
* **bar:**  add support for legends on Bar component ([6f22a4ab](https://github.com/plouc/nivo/commit/6f22a4ab3fe02a210d686153ea7f587d302102ff))
* **calendar:**  add support for legends on Calendar component ([6ef9dc20](https://github.com/plouc/nivo/commit/6ef9dc20a0462e3279a50ab130bbe2902a6a85e5))
* **chord:**  add support for legends on Chord component ([39212ef4](https://github.com/plouc/nivo/commit/39212ef4b5516cae43b4a5a3fd7ce40d15482e1a))
* **commands:**  sort Makefile help ([4f7a872c](https://github.com/plouc/nivo/commit/4f7a872cb54c835235e0804482b516a24461e290))
* **dev:**  add commands to list/rm currently linked packages for website ([df1d3085](https://github.com/plouc/nivo/commit/df1d3085e7214786948e0f9edcfaaf05327ef566))
* **examples:**
  *  ensure examples build successfully on CI ([2ad46b7a](https://github.com/plouc/nivo/commit/2ad46b7af65fdcb7a3bb63d76327e3742e846776))
  * fix retro example dependencies ([2c84d014](https://github.com/plouc/nivo/commit/2c84d014c0ad88d1574f8ec5552cd837316a4371))
* **legends:**  init legends package ([4063428b](https://github.com/plouc/nivo/commit/4063428baa626dd2e0810b830ca4cf6e5cde3b5a))
* **line:**  add support for legends on Line component ([b7cc2449](https://github.com/plouc/nivo/commit/b7cc2449dc068e53e1449e7c04f09af7ebe8c624))
* **linting:**  add eslint on several packages ([38ba981d](https://github.com/plouc/nivo/commit/38ba981d5c2a1411367ca326c7b449a9685135ea))
* **pie:**  add support for legends on Pie component ([8c3004be](https://github.com/plouc/nivo/commit/8c3004bea9ca8e9315f4ce8c8c37e697a20db7a2))
* **publish:**  add packages build prior to publish ([c6f9810b](https://github.com/plouc/nivo/commit/c6f9810b69c776ad0f193eb3ac28e64b7fe05422))
* **radar:**  add support for legends on Radar component ([8d53e13b](https://github.com/plouc/nivo/commit/8d53e13bb5b5f54b6fbfecbc453f7c5245337a03))
* **sankey:**  add support for legends on Sankey component ([0082fb98](https://github.com/plouc/nivo/commit/0082fb98a6e310ee15ebafb8f220133c8466e7f3))
* **scatterplot:**  add scatterplot package ([ff7610c6](https://github.com/plouc/nivo/commit/ff7610c6c66531cb1f61b4766d1d109ffea6d083))
* **stream:**  add support for legends on Stream component ([79395355](https://github.com/plouc/nivo/commit/79395355ec117fb1dc10b567ea4373be11507126))
* **website:**
  *  upgrade @nivo packages ([2da761d8](https://github.com/plouc/nivo/commit/2da761d871348d1edfcadd46d91d214b77092fbb))
  *  upgrade @nivo packages ([4b60e426](https://github.com/plouc/nivo/commit/4b60e4262ec5188ec7dbf4c0b4565c10dfd25b20))
  *  upgrade @nivo packages ([429bd5f0](https://github.com/plouc/nivo/commit/429bd5f00dbb45301af606acecf24cde664b98da))



<a name="v0.33.0-4"></a>
## v0.33.0-4 (2017-12-08)


#### Features

* **bar:**  add support for legends on Bar component ([09b0a2a9](https://github.com/plouc/nivo/commit/09b0a2a979f81349c3211b4c28459a725e77fb63))
* **calendar:**  add support for legends on Calendar component ([3a547223](https://github.com/plouc/nivo/commit/3a54722393975dda50a2ac31f29461931e0fccff))
* **chord:**  add support for legends on Chord component ([daeb4d4c](https://github.com/plouc/nivo/commit/daeb4d4c601263e5212caae963116717f99dada5))
* **dev:**  add commands to list/rm currently linked packages for website ([3c5f0fdb](https://github.com/plouc/nivo/commit/3c5f0fdb00510d4e2b76708a42dce7c148e21210))
* **legends:**  init legends package ([56c5f99c](https://github.com/plouc/nivo/commit/56c5f99c0f50ae0c586a9b13e835e0333c88008e))
* **line:**  add support for legends on Line component ([b6a45955](https://github.com/plouc/nivo/commit/b6a45955d67abfc296994f99a2f5a56998766ffe))
* **pie:**  add support for legends on Pie component ([d22faa6e](https://github.com/plouc/nivo/commit/d22faa6eaa63e9b4f1a50b0d0ac2b78d21317506))
* **publish:**  add packages build prior to publish ([9a10a459](https://github.com/plouc/nivo/commit/9a10a4597fff0d90f5fa1a5dcfb3a5698b073368))
* **radar:**  add support for legends on Radar component ([415ac596](https://github.com/plouc/nivo/commit/415ac59682a1435685a32c444d2f53ba7edd8be5))
* **sankey:**  add support for legends on Sankey component ([feccf224](https://github.com/plouc/nivo/commit/feccf22489bd1c92c48e398a93fc7e5df98dc38b))
* **stream:**  add support for legends on Stream component ([b0421f5c](https://github.com/plouc/nivo/commit/b0421f5cff68fa093d80251f4f71887899a328e5))
* **website:**
  *  upgrade @nivo packages ([005e21af](https://github.com/plouc/nivo/commit/005e21afec69f8ab5db20e2d026f2c334dddfbad))
  *  upgrade @nivo packages ([2a0f2d03](https://github.com/plouc/nivo/commit/2a0f2d0312bfa43fbd66b71ca2aa19cfea8caaec))



<a name="v0.33.0-3"></a>
## v0.33.0-3 (2017-12-07)


#### Features

* **chord:**  add support for legends on Chord component ([9708b531](https://github.com/plouc/nivo/commit/9708b531202dfcced675130809b871d652e083d0))
* **sankey:**  add support for legends on Sankey component ([3cfe7ec1](https://github.com/plouc/nivo/commit/3cfe7ec1f223387b5b1eb5ea638d06d85d86bbb9))



<a name="v0.33.0-2"></a>
## v0.33.0-2 (2017-12-07)


#### Features

* **pie:**  add support for legends on Pie component ([7092fbeb](https://github.com/plouc/nivo/commit/7092fbebc1e297d3e8015adbf79a8f2e11d9b7c1))



<a name="v0.33.0-1"></a>
## v0.33.0-1 (2017-12-07)


#### Features

* **dev:**  add commands to list/rm currently linked packages for website ([c359a21b](https://github.com/plouc/nivo/commit/c359a21b473691c7ff2db84736fd027122a8400c))
* **publish:**  add packages build prior to publish ([e37eb388](https://github.com/plouc/nivo/commit/e37eb3888172131e19052a20a8334bb92e0b114e))
* **stream:**  add support for legends on Stream component ([66c475ae](https://github.com/plouc/nivo/commit/66c475aea009521700d6924837e556fa060ecefa))
* **website:**  upgrade @nivo packages ([65694f8d](https://github.com/plouc/nivo/commit/65694f8dc4c6fae93b0ac644deefe504098f4cb4))



<a name="v0.33.0-0"></a>
## v0.33.0-0 (2017-12-07)


#### Features

* **calendar:**  add support for legends on Calendar component ([2ff2aeb3](https://github.com/plouc/nivo/commit/2ff2aeb37665f7152486ab1e1b53e2a1dae91121))
* **chord:**  add source code for chord stories ([489f36fc](https://github.com/plouc/nivo/commit/489f36fc534c464a9ce234d5eb7c0183d1e5441e))
* **legends:**  init legends package ([c27aae45](https://github.com/plouc/nivo/commit/c27aae45e81cdf9011c6f8ddb39ee40cdd0a2faa))
* **line:**  add support for legends on Line component ([d53614f8](https://github.com/plouc/nivo/commit/d53614f80fa9220e2cdb873485524de1090d2672))
* **radar:**  add support for legends on Radar component ([eec6ac5c](https://github.com/plouc/nivo/commit/eec6ac5c8bfa9f28819ce74f08365d02bf2e1e4e))
* **website:**  upgrade website @nivo packages ([81adc8d0](https://github.com/plouc/nivo/commit/81adc8d057d5f770c5228ddf1450c4d77ac3e7bd))

#### Bug Fixes

* **readme:**  fix misleading installation instructions ([0a5120f7](https://github.com/plouc/nivo/commit/0a5120f7665b13e51fcba335574fc1701cce2ff9))



<a name="v0.32.0"></a>
## v0.32.0 (2017-12-06)


#### Features

* **code style:**  add prettier formatting ([9a550eb8](https://github.com/plouc/nivo/commit/9a550eb85d1db2611ada36239d8d85082317f12c))
* **d3:**  use caret range instead of fixed version for d3 deps ([9598511c](https://github.com/plouc/nivo/commit/9598511c8f185cfe7778c6bbde2c8b686f18006a))
* **demo:**
  *  add command to deploy demo website + storybook ([e2f5c581](https://github.com/plouc/nivo/commit/e2f5c5817765a2e6b35dce070f89b84110ef7a28))
  *  remove unused deps ([eaff4d8b](https://github.com/plouc/nivo/commit/eaff4d8bf183dcd3c5f9251cab3723e17765f42c))
* **generators:**  use @nivo/generators instead of nivo-generators ([e65976d8](https://github.com/plouc/nivo/commit/e65976d83c714da8e16b92ca6b76ff15f47b42f4))
* **lerna:**  exclude demo & examples from lerna ([aa255ebf](https://github.com/plouc/nivo/commit/aa255ebf94cfbdf7d997ad48e6edbaaaf54657f3))
* **packages:**  add command to deploy all packages ([7467315c](https://github.com/plouc/nivo/commit/7467315c5e191d0876e0938ae9c6b8b95846d118))
* **split:**  init multi packages ([158a349d](https://github.com/plouc/nivo/commit/158a349d2ba8e9e017486e32fc89baa4e5c0c0a3))
* **tests:**  restored existing tests ([e4cf806f](https://github.com/plouc/nivo/commit/e4cf806fc42977cd717b419b13aba36cb24aae0f))
* **website:**
  *  upgrade @nivo packages ([697e8aa5](https://github.com/plouc/nivo/commit/697e8aa59355b43d566cddd5f6a4314f30c06a71))
  *  rename demo to website ([dadc8f58](https://github.com/plouc/nivo/commit/dadc8f584f2514ae4f25a8d3b93051998805d586))

#### Bug Fixes

* **babel-preset:**  add missing ignored script ([17ac44e1](https://github.com/plouc/nivo/commit/17ac44e1815c4f19d707595cf4bf59dda810abdd))
* **split:**
  *  add missing deps ([e0763870](https://github.com/plouc/nivo/commit/e07638707ed55a230cfdf722362e1b06c562095f))
  *  add missing deps ([c5461363](https://github.com/plouc/nivo/commit/c5461363a6a0350919b67d3e3800d477e3428107))
  *  add missing dep react-motion ([cefabeb9](https://github.com/plouc/nivo/commit/cefabeb9d451ae2f70e7126f9f0dc81d8e7a9a8d))



<a name="v0.32.0-12"></a>
## v0.32.0-12 (2017-12-06)


#### Features

* **generators:**  use @nivo/generators instead of nivo-generators ([a055d0e5](https://github.com/plouc/nivo/commit/a055d0e56d6acc46cfc73a88feb28ae386e0aeaa))



<a name="v0.32.0-11"></a>
## v0.32.0-11 (2017-12-06)


#### Features

* **code style:**  add prettier formatting ([2f9a29b2](https://github.com/plouc/nivo/commit/2f9a29b2ea58ac4fc34bf795f28b589dbded69e5))
* **packages:**  add command to deploy all packages ([36e87edb](https://github.com/plouc/nivo/commit/36e87edb581c80cb58c7fb9cdc1e706c41c943a4))
* **tests:**  restored existing tests ([dc2b08bc](https://github.com/plouc/nivo/commit/dc2b08bc37f458d57f5f063e857ac68f2692647d))



<a name="v0.32.0-10"></a>
## v0.32.0-10 (2017-12-06)


#### Features

* **demo:**
  *  add command to deploy demo website + storybook ([968e645f](https://github.com/plouc/nivo/commit/968e645f496fe8593fbc5477c0d2da1cb34ea562))
  *  remove unused deps ([770f521a](https://github.com/plouc/nivo/commit/770f521a8e5bfefe73605646051b1c26185307a8))
* **lerna:**  exclude demo & examples from lerna ([5c815ccc](https://github.com/plouc/nivo/commit/5c815ccc38ece06424627eb4758cf843486fc39d))
* **website:**  rename demo to website ([14a375c1](https://github.com/plouc/nivo/commit/14a375c1da0d2f4c6ff774b5a936dd610bcc2fcd))



<a name="v0.32.0-9"></a>
## v0.32.0-9 (2017-12-06)


#### Bug Fixes

* **split:**  add missing deps ([0c222f70](https://github.com/plouc/nivo/commit/0c222f702e44bbb9c6c8f1764d035aeba795e70e))



<a name="v0.32.0-8"></a>
## v0.32.0-8 (2017-12-06)


#### Features

* **d3:**  use caret range instead of fixed version for d3 deps ([fa47e01e](https://github.com/plouc/nivo/commit/fa47e01ee50225376ef813a79c3f23a240a2885d))



<a name="v0.32.0-7"></a>
## v0.32.0-7 (2017-12-06)


#### Bug Fixes

* **split:**  add missing deps ([dd9676bd](https://github.com/plouc/nivo/commit/dd9676bdb910f497980c08f982d1207340f685ac))



<a name="v0.32.0-5"></a>
## v0.32.0-5 (2017-12-06)


#### Bug Fixes

* **split:**  add missing dep react-motion ([74e0bf54](https://github.com/plouc/nivo/commit/74e0bf543e4b6b973997304920a64d19906864bd))



<a name="v0.32.0-4"></a>
## v0.32.0-4 (2017-12-06)




<a name="v0.32.0-3"></a>
## v0.32.0-3 (2017-12-05)




<a name="v0.32.0-2"></a>
## v0.32.0-2 (2017-12-05)




<a name="v0.32.0-1"></a>
## v0.32.0-1 (2017-12-05)




