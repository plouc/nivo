"use strict";(self.webpackChunkstorybook=self.webpackChunkstorybook||[]).push([[9921],{"./stories/icicle/IcicleHtml.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,ColorPickedFromData:()=>ColorPickedFromData,CustomColors:()=>CustomColors,CustomNode:()=>CustomNode,CustomTooltip:()=>CustomTooltip,KeyboardNavigation:()=>KeyboardNavigation,__namedExportsOrder:()=>__namedExportsOrder,default:()=>IcicleHtml_stories});var jsx_runtime=__webpack_require__("../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js"),nivo_generators=__webpack_require__("../packages/generators/dist/nivo-generators.mjs"),nivo_icicle=__webpack_require__("../packages/icicle/dist/nivo-icicle.mjs"),styled_components_browser_esm=__webpack_require__("../node_modules/.pnpm/styled-components@6.1.18_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/styled-components/dist/styled-components.browser.esm.js"),react_spring_web_modern=__webpack_require__("../node_modules/.pnpm/@react-spring+web@10.0.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@react-spring/web/dist/react-spring_web.modern.mjs");const conifers_namespaceObject=__webpack_require__.p+"static/media/conifers.a4317dff.png",pinaceae_namespaceObject=__webpack_require__.p+"static/media/pinaceae.22064d5a.png",flowering_fruiting_trees_namespaceObject=__webpack_require__.p+"static/media/flowering_fruiting_trees.7fa43393.png",deciduous_broadleaf_namespaceObject=__webpack_require__.p+"static/media/deciduous_broadleaf.53e685b3.png",cupressaceae_namespaceObject=__webpack_require__.p+"static/media/cupressaceae.8955d321.png",fagaceae_namespaceObject=__webpack_require__.p+"static/media/fagaceae.e10d17ac.png",sapindaceae_namespaceObject=__webpack_require__.p+"static/media/sapindaceae.7f2401c3.png",betulaceae_namespaceObject=__webpack_require__.p+"static/media/betulaceae.89168562.png",rosaceae_namespaceObject=__webpack_require__.p+"static/media/rosaceae.373a38e5.png",theaceae_namespaceObject=__webpack_require__.p+"static/media/theaceae.ee6c7d64.png",ericaceae_namespaceObject=__webpack_require__.p+"static/media/ericaceae.828f8da1.png",moraceae_namespaceObject=__webpack_require__.p+"static/media/moraceae.facfccdb.png",myrtaceae_namespaceObject=__webpack_require__.p+"static/media/myrtaceae.26bc9736.png",ulmaceae_namespaceObject=__webpack_require__.p+"static/media/ulmaceae.8a0277c7.png",leguminosae_namespaceObject=__webpack_require__.p+"static/media/leguminosae.01b54418.png",tropicals_subtropicals_namespaceObject=__webpack_require__.p+"static/media/tropicals_subtropicals.247abe28.png",withLogDisplay=node=>{const c=node.cultivarCount??0,scaled=10*Math.log10(c+1);return{...node,displayValue:parseFloat(scaled.toFixed(2)),children:node.children?.map(withLogDisplay)}},bonsaiData={taxon:"Bonsais",aggCultivarCount:4654,children:[{taxon:"Conifers",aggCultivarCount:301,img:conifers_namespaceObject,children:[{taxon:"Pinaceae",aggCultivarCount:111,img:pinaceae_namespaceObject,children:[{taxon:"Pinus",aggCultivarCount:97,children:[{taxon:"Pinus thunbergii",cultivarCount:60},{taxon:"Pinus parviflora",cultivarCount:25},{taxon:"Pinus sylvestris",cultivarCount:12}]},{taxon:"Picea",aggCultivarCount:12,children:[{taxon:"Picea abies",cultivarCount:8},{taxon:"Picea jezoensis",cultivarCount:4}]},{taxon:"Larix",aggCultivarCount:2,children:[{taxon:"Larix kaempferi",cultivarCount:2}]}]},{taxon:"Cupressaceae",aggCultivarCount:190,img:cupressaceae_namespaceObject,children:[{taxon:"Juniperus",aggCultivarCount:130,children:[{taxon:"Juniperus procumbens",cultivarCount:30},{taxon:"Juniperus chinensis",cultivarCount:80},{taxon:"Juniperus rigida",cultivarCount:20}]},{taxon:"Chamaecyparis",aggCultivarCount:60,children:[{taxon:"Chamaecyparis obtusa",cultivarCount:60}]}]}]},{taxon:"Deciduous Broadleaf",aggCultivarCount:1533,img:deciduous_broadleaf_namespaceObject,children:[{taxon:"Fagaceae",aggCultivarCount:3,img:fagaceae_namespaceObject,children:[{taxon:"Quercus",aggCultivarCount:3,children:[{taxon:"Quercus serrata",cultivarCount:2},{taxon:"Quercus acutissima",cultivarCount:1}]}]},{taxon:"Sapindaceae",aggCultivarCount:1437,img:sapindaceae_namespaceObject,children:[{taxon:"Acer",aggCultivarCount:1437,children:[{taxon:"Acer palmatum",cultivarCount:1400},{taxon:"Acer buergerianum",cultivarCount:25},{taxon:"Acer ginnala",cultivarCount:12}]}]},{taxon:"Betulaceae",aggCultivarCount:7,img:betulaceae_namespaceObject,children:[{taxon:"Carpinus",aggCultivarCount:4,children:[{taxon:"Carpinus japonica",cultivarCount:3},{taxon:"Carpinus turczaninowii",cultivarCount:1}]},{taxon:"Betula",aggCultivarCount:3,children:[{taxon:"Betula pendula",cultivarCount:3}]}]},{taxon:"Ulmaceae",aggCultivarCount:86,img:ulmaceae_namespaceObject,children:[{taxon:"Zelkova",aggCultivarCount:6,children:[{taxon:"Zelkova serrata",cultivarCount:6}]},{taxon:"Ulmus",aggCultivarCount:80,children:[{taxon:"Ulmus parvifolia",cultivarCount:50},{taxon:"Ulmus minor",cultivarCount:30}]}]}]},{taxon:"Flowering and Fruiting Trees",aggCultivarCount:2786,img:flowering_fruiting_trees_namespaceObject,children:[{taxon:"Rosaceae",aggCultivarCount:336,img:rosaceae_namespaceObject,children:[{taxon:"Malus",aggCultivarCount:4,children:[{taxon:"Malus halliana",cultivarCount:4}]},{taxon:"Prunus",aggCultivarCount:312,children:[{taxon:"Prunus mume",cultivarCount:10},{taxon:"Prunus serrulata",cultivarCount:300},{taxon:"Prunus incisa",cultivarCount:2}]},{taxon:"Chaenomeles",aggCultivarCount:20,children:[{taxon:"Chaenomeles speciosa",cultivarCount:20}]}]},{taxon:"Theaceae",aggCultivarCount:2e3,img:theaceae_namespaceObject,children:[{taxon:"Camellia",aggCultivarCount:2e3,children:[{taxon:"Camellia japonica",cultivarCount:2e3}]}]},{taxon:"Ericaceae",aggCultivarCount:450,img:ericaceae_namespaceObject,children:[{taxon:"Rhododendron",aggCultivarCount:450,children:[{taxon:"Rhododendron indicum",cultivarCount:300},{taxon:"Rhododendron obtusum",cultivarCount:150}]}]}]},{taxon:"Tropicals and Subtropicals",aggCultivarCount:34,img:tropicals_subtropicals_namespaceObject,children:[{taxon:"Moraceae",aggCultivarCount:8,img:moraceae_namespaceObject,children:[{taxon:"Ficus",aggCultivarCount:8,children:[{taxon:"Ficus retusa",cultivarCount:3},{taxon:"Ficus benjamina",cultivarCount:5}]}]},{taxon:"Myrtaceae",aggCultivarCount:10,img:myrtaceae_namespaceObject,children:[{taxon:"Syzygium",aggCultivarCount:10,children:[{taxon:"Syzygium paniculatum",cultivarCount:10}]}]},{taxon:"Leguminosae",aggCultivarCount:16,img:leguminosae_namespaceObject,children:[{taxon:"Serissa",aggCultivarCount:15,children:[{taxon:"Serissa foetida",cultivarCount:15}]},{taxon:"Tamarindus",aggCultivarCount:1,children:[{taxon:"Tamarindus indica",cultivarCount:1}]}]}]}]},shimpaku_namespaceObject=__webpack_require__.p+"static/media/shimpaku.f60eca30.png",Label=styled_components_browser_esm.Ay.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 26px;
    background: rgb(218, 218, 202);
    color: #121b02;
    font-size: 12px;
    font-weight: 600;
    border-radius: 13px;
    max-width: 100%;
    pointer-events: none;
    user-select: none;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.35);
    transition: border-radius 0.4s ease-in-out;
`,LabelText=styled_components_browser_esm.Ay.span`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`,RootNodeWrapper=(0,styled_components_browser_esm.Ay)(react_spring_web_modern.CS.div)`
    position: absolute;
    overflow: hidden;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    flex-direction: ${({orientation})=>"top"===orientation||"bottom"===orientation?"row":"column"};
    justify-content: flex-start;
    align-items: center;
    color: #dadaca;

    & > div:first-child {
        flex: 1;
        height: ${({orientation})=>"top"===orientation||"bottom"===orientation?"100%":"auto"};
        display: flex;
        flex-direction: column;
        justify-content: ${({orientation})=>"top"===orientation||"bottom"===orientation?"flex-end":"flex-start"};
        align-items: flex-start;
        padding: 16px;
        line-height: 20px;
        text-align: left;
    }
`,RootNodeIllustration=styled_components_browser_esm.Ay.div`
    width: 300px;
    height: 300px;
    background-image: url(${shimpaku_namespaceObject});
    background-size: cover;
    background-repeat: no-repeat;
`,Title=styled_components_browser_esm.Ay.h1`
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: 500;
`,Description=styled_components_browser_esm.Ay.div`
    margin: 6px 0 0;
    padding: 0;
    font-size: 14px;
    font-weight: 400;
    opacity: 0.6;

    a {
        color: inherit;
        cursor: pointer;
        font-weight: 600;
    }
`,NodeWrapper=(0,styled_components_browser_esm.Ay)(react_spring_web_modern.CS.div)`
    position: absolute;
    padding: 0 9px;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-repeat: repeat;
    background-size: 120px 120px;
    background-position: center center;
    transform-origin: center center;

    ${({img})=>img?`background-image: url(${img});`:null}
`,TooltipWrapper=styled_components_browser_esm.Ay.div`
    padding: 9px 12px;
    font-size: 12px;
    color: #dadaca;
    border-radius: 2px;
    box-shadow: 0 0 0 1px #dadaca;
`,CustomNodeComponent=({node,style,onMouseEnter,onMouseMove,onMouseLeave,onClick})=>{const{orientation}=(0,nivo_icicle.Gp)();return 0===node.hierarchy.depth?(0,jsx_runtime.jsxs)(RootNodeWrapper,{orientation,style:{top:style.y,left:style.x,width:style.width,height:style.height,backgroundColor:node.color},onClick,children:[(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(Title,{children:"Tree species commonly used for bonsai cultivation"}),(0,jsx_runtime.jsxs)(Description,{children:["Sized by number of cultivars (fake data).",(0,jsx_runtime.jsx)("br",{}),"You can find the source code for this chart"," ",(0,jsx_runtime.jsx)("a",{href:"https://github.com/plouc/nivo/blob/master/storybook/stories/icicle/BonsaisIcicle.tsx",children:"here"}),"."]})]}),(0,jsx_runtime.jsx)(RootNodeIllustration,{})]}):(0,jsx_runtime.jsx)(NodeWrapper,{style:{top:style.y,left:style.x,width:style.width,height:style.height,backgroundColor:node.color},img:node.data.img,onMouseEnter,onMouseMove,onMouseLeave,onClick,children:node.rect.width>=80&&node.rect.height>=36&&(0,jsx_runtime.jsx)(Label,{children:(0,jsx_runtime.jsx)(LabelText,{children:node.data.taxon})})})},BonsaiIcicle=({orientation})=>(0,jsx_runtime.jsx)(nivo_icicle.Pk,{width:800,height:600,margin:{top:0,right:0,bottom:0,left:0},theme:{background:"#dadaca"},orientation,data:withLogDisplay(bonsaiData),identity:"taxon",value:"displayValue",valueFormat:v=>`${(displayValue=>{const raw=Math.pow(10,displayValue/10)-1;return Math.round(raw)})(v)}`,gapX:2,gapY:2,nodeComponent:CustomNodeComponent,colors:["#172b12","#061715","#172b12","#373e1a","#1c2904"],zoomMode:"global",enableLabels:!1,role:"application",tooltip:node=>(0,jsx_runtime.jsxs)(TooltipWrapper,{style:{backgroundColor:node.color},children:[(0,jsx_runtime.jsx)("strong",{children:node.id}),":",(0,jsx_runtime.jsx)("br",{}),"~",(0,jsx_runtime.jsx)("strong",{children:node.data.aggCultivarCount||node.data.cultivarCount})," ","cultivars"]})});try{BonsaiIcicle.displayName="BonsaiIcicle",BonsaiIcicle.__docgenInfo={description:"",displayName:"BonsaiIcicle",props:{orientation:{defaultValue:null,description:"",name:"orientation",required:!0,type:{name:"enum",value:[{value:'"top"'},{value:'"right"'},{value:'"bottom"'},{value:'"left"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["stories/icicle/BonsaisIcicle.tsx#BonsaiIcicle"]={docgenInfo:BonsaiIcicle.__docgenInfo,name:"BonsaiIcicle",path:"stories/icicle/BonsaisIcicle.tsx#BonsaiIcicle"})}catch(__react_docgen_typescript_loader_error){}var KeyLogger=__webpack_require__("./stories/internal/KeyLogger.tsx"),shared=__webpack_require__("./stories/icicle/shared.tsx");const commonProperties={width:900,height:500,data:(0,nivo_generators.bx)(),identity:"name",value:"loc",enableLabels:!0,label:"id",labelTextColor:{from:"color",modifiers:[["darker",.6]]},labelSkipWidth:32,labelSkipHeight:32,theme:{labels:{text:{fontSize:11,fontWeight:600,outlineWidth:1,outlineColor:"#ffffff",outlineOpacity:1}}}},IcicleHtml_stories={title:"IcicleHtml",component:nivo_icicle.Pk,tags:["autodocs"],argTypes:{orientation:{control:"select",options:["top","right","bottom","left"]}},args:{orientation:nivo_icicle.bV.orientation}},Basic={render:args=>(0,jsx_runtime.jsx)(nivo_icicle.Pk,{...commonProperties,orientation:args.orientation})},customPalette=["#ffd700","#ffb14e","#fa8775","#ea5f94","#cd34b5","#9d02d7","#0000ff"],CustomColors={render:args=>(0,jsx_runtime.jsx)(nivo_icicle.Pk,{...commonProperties,orientation:args.orientation,colors:customPalette})},ColorPickedFromData={render:args=>(0,jsx_runtime.jsx)(nivo_icicle.Pk,{...commonProperties,orientation:args.orientation,colors:node=>node.data.color})},CustomTooltip={render:args=>(0,jsx_runtime.jsx)(nivo_icicle.Pk,{...commonProperties,orientation:args.orientation,tooltip:({id,value,color})=>(0,jsx_runtime.jsxs)("div",{style:{padding:12,color,background:"#333333"},children:[(0,jsx_runtime.jsx)("span",{children:"Look, I'm custom :)"}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsxs)("strong",{children:[id,": ",value]})]})})},CustomNode={parameters:{backgrounds:{default:"Paper",values:[{name:"Paper",value:"#dadaca"}]}},args:{orientation:"bottom"},render:args=>(0,jsx_runtime.jsx)(BonsaiIcicle,{orientation:args.orientation})},KeyboardNavigation={render:args=>{const keyLogger=(0,KeyLogger.Og)();return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(KeyLogger.ps,{ref:keyLogger,only:shared.qU,duration:2e3}),(0,jsx_runtime.jsxs)(shared.l2,{children:[(0,jsx_runtime.jsx)(nivo_icicle.Pk,{...commonProperties,width:600,orientation:args.orientation,isFocusable:!0,onKeyDown:(_node,event)=>{keyLogger.current?.logKey(event)}}),(0,jsx_runtime.jsx)(shared.Gf,{})]})]})},play:async({canvasElement})=>{await(0,shared.ZB)(canvasElement)}},__namedExportsOrder=["Basic","CustomColors","ColorPickedFromData","CustomTooltip","CustomNode","KeyboardNavigation"];Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  render: args => <IcicleHtml<RawDatum> {...commonProperties} orientation={args.orientation} />\n}",...Basic.parameters?.docs?.source}}},CustomColors.parameters={...CustomColors.parameters,docs:{...CustomColors.parameters?.docs,source:{originalSource:"{\n  render: args => <IcicleHtml<RawDatum> {...commonProperties} orientation={args.orientation} colors={customPalette} />\n}",...CustomColors.parameters?.docs?.source}}},ColorPickedFromData.parameters={...ColorPickedFromData.parameters,docs:{...ColorPickedFromData.parameters?.docs,source:{originalSource:"{\n  render: args => <IcicleHtml<RawDatum> {...commonProperties} orientation={args.orientation} colors={node => node.data.color} />\n}",...ColorPickedFromData.parameters?.docs?.source}}},CustomTooltip.parameters={...CustomTooltip.parameters,docs:{...CustomTooltip.parameters?.docs,source:{originalSource:"{\n  render: args => <IcicleHtml<RawDatum> {...commonProperties} orientation={args.orientation} tooltip={({\n    id,\n    value,\n    color\n  }) => <div style={{\n    padding: 12,\n    color,\n    background: '#333333'\n  }}>\n                    <span>Look, I'm custom :)</span>\n                    <br />\n                    <strong>\n                        {id}: {value}\n                    </strong>\n                </div>} />\n}",...CustomTooltip.parameters?.docs?.source}}},CustomNode.parameters={...CustomNode.parameters,docs:{...CustomNode.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    backgrounds: {\n      default: 'Paper',\n      values: [{\n        name: 'Paper',\n        value: '#dadaca'\n      }]\n    }\n  },\n  args: {\n    orientation: 'bottom'\n  },\n  render: args => <BonsaiIcicle orientation={args.orientation} />\n}",...CustomNode.parameters?.docs?.source}}},KeyboardNavigation.parameters={...KeyboardNavigation.parameters,docs:{...KeyboardNavigation.parameters?.docs,source:{originalSource:"{\n  render: args => {\n    const keyLogger = useKeyLoggerRef();\n    return <>\n                <KeyLogger ref={keyLogger} only={SUPPORTED_KEYBOARD_KEYS} duration={2000} />\n                <KeyboardNavigationContainer>\n                    <IcicleHtml<RawDatum> {...commonProperties} width={600} orientation={args.orientation} isFocusable onKeyDown={(_node, event) => {\n          keyLogger.current?.logKey(event);\n        }} />\n                    <KeyboardDoc />\n                </KeyboardNavigationContainer>\n            </>;\n  },\n  play: async ({\n    canvasElement\n  }) => {\n    await playKeyboardNavigationDemo(canvasElement);\n  }\n}",...KeyboardNavigation.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=icicle-IcicleHtml-stories.ff800094.iframe.bundle.js.map