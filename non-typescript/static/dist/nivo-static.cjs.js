"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("joi"),a=require("@nivo/bar"),t=require("@nivo/colors"),r=require("@nivo/circle-packing"),i=require("@nivo/calendar"),l=require("@nivo/chord"),n=require("@nivo/heatmap"),d=require("@nivo/line"),o=require("@nivo/core"),u=require("@nivo/pie"),s=require("@nivo/radar"),f=require("@nivo/sankey"),m=require("@nivo/sunburst"),b=require("@nivo/treemap"),g=require("lodash/pick"),c=require("react"),h=require("react-dom/server"),p=require("@nivo/generators");function y(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var v,k,x=y(e),L=y(g),q=x.default.extend({type:"array",base:x.default.array(),coerce:{from:"string",method:function(e){if("string"!=typeof e)return{};try{return{value:JSON.parse(e)}}catch(e){return{}}}}},{type:"object",base:x.default.object(),coerce:{from:"string",method:function(e){if("string"!=typeof e)return{};try{return{value:JSON.parse(e)}}catch(e){return{}}}}}),w=x.default.object().keys({orient:x.default.any().valid("top","right","bottom","left"),tickSize:x.default.number().min(0),tickPadding:x.default.number(),tickRotation:x.default.number(),legend:x.default.string().empty(""),legendPosition:x.default.any().valid("start","middle","end"),legendOffset:x.default.number()}).allow(null),C={axisTop:w,axisRight:w,axisBottom:w,axisLeft:w},P=x.default.valid("normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"),j={width:x.default.number().integer().required(),height:x.default.number().integer().required(),margin:x.default.object().keys({top:x.default.number().integer(),right:x.default.number().integer(),bottom:x.default.number().integer(),left:x.default.number().integer()})},O=x.default.alternatives().try(x.default.array().items(x.default.string()),x.default.object().keys({scheme:x.default.valid.apply(x.default,t.colorSchemeIds).required(),size:x.default.number()}),x.default.object().keys({datum:x.default.string().required()})),B=x.default.alternatives().try(x.default.string(),x.default.object().keys({theme:x.default.string().required()}),x.default.object().keys({from:x.default.string().required(),modifiers:x.default.array()})),S={component:a.Bar,schema:x.default.object().keys({width:j.width,height:j.height,margin:j.margin,data:q.array().min(1).required(),indexBy:x.default.string().required(),keys:x.default.array().sparse(!1).min(1).unique().required(),indexScale:x.default.object().keys({type:x.default.any().valid("band"),round:x.default.boolean()}).allow(null),valueScale:x.default.object().keys({type:x.default.any().valid("linear")}).allow(null),groupMode:x.default.any().valid("grouped","stacked"),layout:x.default.any().valid("horizontal","vertical"),reverse:x.default.boolean(),minValue:x.default.alternatives().try(x.default.any().valid("auto"),x.default.number()).required(),maxValue:x.default.alternatives().try(x.default.any().valid("auto"),x.default.number()).required(),padding:x.default.number(),innerPadding:x.default.number(),borderRadius:x.default.number().min(0),borderWidth:x.default.number().min(0),borderColor:B,enableGridX:x.default.boolean(),enableGridY:x.default.boolean(),axisTop:C.axisTop,axisRight:C.axisRight,axisBottom:C.axisBottom,axisLeft:C.axisLeft,enableLabel:x.default.boolean(),label:x.default.string(),labelSkipWidth:x.default.number(),labelSkipHeight:x.default.number(),labelTextColor:B,colors:O,colorBy:x.default.string()}),runtimeProps:["width","height","colors","groupMode"],defaults:{margin:{top:40,right:50,bottom:40,left:50}}},R={component:r.CirclePacking,schema:x.default.object().keys({data:q.object().required(),id:x.default.string(),value:x.default.string(),valueFormat:x.default.string(),padding:x.default.number(),leavesOnly:x.default.boolean(),width:j.width,height:j.height,margin:j.margin,colors:O,colorBy:x.default.any().valid("id","depth"),inheritColorFromParent:x.default.boolean(),childColor:B,borderWidth:x.default.number(),borderColor:B,enableLabels:x.default.boolean(),label:x.default.string(),labelsSkipRadius:x.default.number(),labelTextColor:B}),runtimeProps:["width","height","colors"],defaults:{margin:{top:0,right:0,bottom:0,left:0}}},T={component:i.Calendar,schema:x.default.object().keys({data:q.array().min(1).required(),from:x.default.string().required(),to:x.default.string().required(),width:j.width,height:j.height,direction:x.default.any().valid("horizontal","vertical"),margin:j.margin,align:x.default.any().valid("center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left"),minValue:x.default.alternatives().try(x.default.valid("auto"),x.default.number()),maxValue:x.default.alternatives().try(x.default.valid("auto"),x.default.number()),colors:x.default.array().items(x.default.string()),emptyColor:x.default.string(),yearSpacing:x.default.number().min(0),yearLegendPosition:x.default.any().valid("before","after"),yearLegendOffset:x.default.number(),monthSpacing:x.default.number().min(0),monthBorderWidth:x.default.number().min(0),monthBorderColor:x.default.string(),monthLegendPosition:x.default.any().valid("before","after"),monthLegendOffset:x.default.number(),daySpacing:x.default.number(),dayBorderWidth:x.default.number(),dayBorderColor:x.default.string()}),runtimeProps:["width","height","colors","direction"],defaults:{animate:!1,margin:{top:40,right:50,bottom:40,left:50}}},M={component:l.Chord,schema:x.default.object().keys({width:j.width,height:j.height,margin:j.margin,data:q.array().required(),keys:x.default.array().required(),padAngle:x.default.number(),innerRadiusRatio:x.default.number().min(0).max(1),innerRadiusOffset:x.default.number().min(0).max(1),ribbonOpacity:x.default.number().min(0).max(1),ribbonBorderWidth:x.default.number().min(0),ribbonBorderColor:B,arcOpacity:x.default.number().min(0).max(1),arcBorderWidth:x.default.number().min(0),arcBorderColor:B,enableLabel:x.default.boolean(),label:x.default.string(),labelOffset:x.default.number(),labelRotation:x.default.number(),labelTextColor:B,colors:O}),runtimeProps:["width","height","padAngle","innerRadiusRatio","innerRadiusOffset","ribbonOpacity","arcOpacity","colors"],defaults:{margin:{top:0,right:0,bottom:0,left:0}}},W={component:n.HeatMap,schema:x.default.object().keys({data:q.array().min(1).required(),forceSquare:x.default.boolean(),sizeVariation:x.default.number().min(0).max(1),xOuterPadding:x.default.number().min(0).max(1),xInnerPadding:x.default.number().min(0).max(1),yOuterPadding:x.default.number().min(0).max(1),yInnerPadding:x.default.number().min(0).max(1),width:j.width,height:j.height,margin:j.margin,cellComponent:x.default.any().valid("rect","circle"),colors:x.default.object(),opacity:x.default.number().min(0).max(1),borderWidth:x.default.number().min(0),borderColor:B,enableLabels:x.default.boolean(),labelTextColor:B,enableGridX:x.default.boolean(),enableGridY:x.default.boolean(),axisTop:C.axisTop,axisRight:C.axisRight,axisBottom:C.axisBottom,axisLeft:C.axisLeft}),runtimeProps:["width","height","colors"],defaults:{margin:{top:60,right:0,bottom:0,left:60}}},A={component:d.Line,schema:x.default.object().keys({data:q.array().items(x.default.object().keys({id:x.default.string().required(),data:x.default.array().items(x.default.object().keys({x:x.default.alternatives().try(x.default.string(),x.default.number()).required(),y:x.default.alternatives().try(x.default.string(),x.default.number()).required()}).unknown()).min(2).required()}).unknown()).min(1).required(),xScale:x.default.object(),xFormat:x.default.string(),yScale:x.default.object(),yFormat:x.default.string(),width:j.width,height:j.height,margin:j.margin,curve:(v=x.default.any()).valid.apply(v,o.curvePropKeys),colors:O,lineWidth:x.default.number().min(0),enableArea:x.default.boolean(),areaBaselineValue:x.default.alternatives().try(x.default.string(),x.default.number()),areaOpacity:x.default.number(),areaBlendMode:P,enablePoints:x.default.boolean(),pointSize:x.default.number().min(0),pointColor:B,pointBorderWidth:x.default.number().min(0),pointBorderColor:B,enablePointLabel:x.default.boolean(),pointLabel:x.default.string(),pointLabelYOffset:x.default.number(),enableGridX:x.default.boolean(),gridXValues:x.default.array(),enableGridY:x.default.boolean(),gridYValues:x.default.array(),axisTop:C.axisTop,axisRight:C.axisRight,axisBottom:C.axisBottom,axisLeft:C.axisLeft,markers:x.default.array().items(x.default.object().keys({axis:x.default.any().valid("x","y").required(),value:x.default.alternatives().try(x.default.string(),x.default.number()).required(),style:x.default.object()}))}),runtimeProps:["width","height","colors"],defaults:{margin:{top:40,right:50,bottom:40,left:50}}},z={component:u.Pie,schema:x.default.object().keys({data:q.array().min(1).required(),id:x.default.string(),value:x.default.string(),valueFormat:x.default.string(),width:j.width,height:j.height,startAngle:x.default.number(),endAngle:x.default.number(),fit:x.default.boolean(),innerRadius:x.default.number().min(0),padAngle:x.default.number().min(0),cornerRadius:x.default.number().min(0),sortByValue:x.default.boolean(),margin:j.margin,theme:x.default.object(),colors:O,borderWidth:x.default.number().min(0),borderColor:B,enableArcLabels:x.default.boolean(),arcLabel:x.default.string(),arcLabelsRadiusOffset:x.default.number(),arcLabelsSkipAngle:x.default.number().min(0),arcLabelsTextColor:B,enableArcLinkLabels:x.default.boolean(),arcLinkLabel:x.default.string(),arcLinkLabelsSkipAngle:x.default.number().min(0),arcLinkLabelsOffset:x.default.number(),arcLinkLabelsDiagonalLength:x.default.number().min(0),arcLinkLabelsStraightLength:x.default.number().min(0),arcLinkLabelsTextOffset:x.default.number(),arcLinkLabelsThickness:x.default.number().min(0),arcLinkLabelsTextColor:B,arcLinkLabelsColor:B}),runtimeProps:["width","height","colors","groupMode"],defaults:{margin:{top:40,right:50,bottom:40,left:50}}},F=x.default.valid("basisClosed","cardinalClosed","catmullRomClosed","linearClosed"),V={component:s.Radar,schema:x.default.object().keys({data:q.array().min(1).required(),indexBy:x.default.string().required(),keys:x.default.array().sparse(!1).min(1).unique().required(),maxValue:x.default.alternatives().try(x.default.valid("auto"),x.default.number()),valueFormat:x.default.string(),curve:F,width:j.width,height:j.height,margin:j.margin,theme:x.default.object(),colors:O,fillOpacity:x.default.number().min(0).max(1),blendMode:P,borderWidth:x.default.number().min(0),borderColor:B,gridLevels:x.default.number().integer().positive(),gridShape:x.default.any().valid("linear","circular"),gridLabelOffset:x.default.number(),enableDots:x.default.boolean(),dotSize:x.default.number().min(0),dotColor:B,dotBorderWidth:x.default.number().min(0),dotBorderColor:B,enableDotLabel:x.default.boolean(),dotLabel:x.default.string(),dotLabelYOffset:x.default.number()}),runtimeProps:["width","height","colors"],defaults:{margin:{top:40,right:40,bottom:40,left:40}}},D={component:f.Sankey,schema:x.default.object().keys({width:j.width,height:j.height,margin:j.margin,data:q.object().keys({nodes:x.default.array().items(x.default.object().keys({id:x.default.alternatives().try(x.default.string(),x.default.number())}).unknown()).required(),links:x.default.array().items(x.default.object().keys({source:x.default.alternatives().try(x.default.string(),x.default.number()),target:x.default.alternatives().try(x.default.string(),x.default.number()),value:x.default.number().min(0).required()}).unknown()).required()}).required(),layout:x.default.valid("horizontal","vertical"),align:(k=x.default.any()).valid.apply(k,f.sankeyAlignmentPropKeys),sort:x.default.valid("auto","input","ascending","descending"),nodeOpacity:x.default.number().min(0).max(1),nodeThickness:x.default.number().min(1),nodeSpacing:x.default.number().min(0),nodeInnerPadding:x.default.number().min(0),nodeBorderRadius:x.default.number().min(0),nodeBorderWidth:x.default.number().min(0),nodeBorderColor:B,linkOpacity:x.default.number().min(0).max(1),linkContract:x.default.number(),linkBlendMode:P,enableLinkGradient:x.default.boolean(),enableLabels:x.default.boolean(),labelPosition:x.default.any().valid("inside","outside"),labelPadding:x.default.number(),labelOrientation:x.default.any().valid("horizontal","vertical"),labelTextColor:B,colors:O}),runtimeProps:["width","height","colors"],defaults:{margin:{top:0,right:0,bottom:0,left:0},linkBlendMode:"normal"}},G={component:m.Sunburst,schema:x.default.object().keys({data:q.object().required(),id:x.default.string(),value:x.default.string(),valueFormat:x.default.string(),cornerRadius:x.default.number().min(0),width:j.width,height:j.height,margin:j.margin,colors:O,colorBy:x.default.any().valid("id","depth"),inheritColorFromParent:x.default.boolean(),childColor:B,borderWidth:x.default.number().min(0),borderColor:B,enableArcLabels:x.default.boolean(),arcLabel:x.default.string(),arcLabelsRadiusOffset:x.default.number(),arcLabelsSkipAngle:x.default.number().min(0),arcLabelsTextColor:B}),runtimeProps:["width","height","colors"],defaults:{margin:{top:0,right:0,bottom:0,left:0}}},I={component:b.TreeMap,schema:x.default.object().keys({data:q.object().required(),identity:x.default.string(),value:x.default.string(),valueFormat:x.default.string(),tile:x.default.any().valid("binary","squarify","slice","dice","sliceDice","resquarify"),leavesOnly:x.default.boolean(),innerPadding:x.default.number().min(0),outerPadding:x.default.number().min(0),width:j.width,height:j.height,margin:j.margin,colors:O,colorBy:x.default.string(),nodeOpacity:x.default.number().min(0).max(1),borderWidth:x.default.number().min(0),borderColor:B,enableLabel:x.default.boolean(),label:x.default.string(),labelSkipSize:x.default.number(),orientLabel:x.default.boolean(),labelTextColor:B,enableParentLabel:x.default.boolean(),parentLabel:x.default.string(),parentLabelSize:x.default.number().min(0),parentLabelPosition:x.default.any().valid("top","right","bottom","left"),parentLabelPadding:x.default.number().min(0),parentLabelTextColor:B}),runtimeProps:["width","height","colors","leavesOnly","tile","enableLabels","orientLabels","label","labelFormat","labelSkipSize","labelTextColor","innerPadding","outerPadding","colors","borderWidth","borderColor"],defaults:{margin:{top:0,right:0,bottom:0,left:0}}},Y={bar:S,circle_packing:R,calendar:T,chord:M,heatmap:W,line:A,pie:z,radar:V,sankey:D,sunburst:G,treemap:I};function X(){return X=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},X.apply(this,arguments)}var _={animate:!1,isInteractive:!1,renderWrapper:!1,theme:{}},H=["hot dogs","burgers","sandwich","kebab","fries","donut"],J=[].concat(H,["junk","sushi","ramen","curry","udon","bagel"]),K={bar:{type:"bar",props:{width:1400,height:600,data:p.generateCountriesData(H,{size:24}),keys:H,indexBy:"country",colors:"nivo"}},circle_packing:{type:"circle_packing",props:{width:600,height:600,data:p.generateLibTree(),id:"name",value:"loc",label:"name",margin:{top:0,right:0,bottom:0,left:0}}},chord:{type:"chord",props:{width:800,height:800,data:[[11975,5871,8916,2868,1967,2987,4300],[1951,10048,2060,6171,1967,2987,4300],[8010,16145,8090,8045,1967,2987,4300],[1013,990,940,6907,2306,1200,900],[1013,990,940,6907,800,3400,1200],[1013,990,940,6907,1967,2987,4300],[1013,990,940,6907,3e3,3456,876]],keys:J.slice(0,7),colors:{scheme:"paired"},padAngle:.01,innerRadiusRatio:.98,innerRadiusOffset:.01}},heatmap:{type:"heatmap",props:{width:900,height:600,data:p.generateCountriesData(J,{size:9,min:0,max:100}),forceSquare:!0,cellComponent:"rect",borderWidth:2,borderColor:"inherit:darker(0.4)",labelTextColor:"inherit:darker(2.4)"}},line:{type:"line",props:{width:800,height:500,data:p.generateDrinkStats(),keys:["whisky","rhum","gin","vodka","cognac"],identity:"country",cumulative:!1,curve:"monotoneX"}},pie:{type:"pie",props:{width:800,height:800,data:p.generateProgrammingLanguageStats(!0,9).map((function(e){return Object.assign(e,{id:e.label})})),innerRadius:.5,padAngle:.5,cornerRadius:5,margin:{top:100,right:100,bottom:100,left:100}}},radar:{type:"radar",props:Object.assign({width:800,height:800,indexBy:"taste",curve:"catmullRomClosed",enableMarkersLabel:!0},p.generateWinesTastes())},sankey:{type:"sankey",props:{width:1400,height:800,data:p.generateSankeyData({nodeCount:13,maxIterations:2}),colors:{scheme:"paired"},nodeOpacity:1,nodeThickness:14,nodeBorderWidth:0,linkOpacity:.15,labelPadding:20}},sunburst:{type:"sunburst",props:{width:800,height:800,data:p.generateLibTree(),id:"name",value:"loc",childColor:{from:"color",modifiers:[["brighter",.1]]},cornerRadius:2,enableArcLabels:!0,arcLabelsSkipAngle:10,arcLabelsTextColor:{from:"color",modifiers:[["darker",1.4]]}}},treemap:{type:"treemap",props:{width:800,height:500,data:p.generateLibTree(),identity:"name",value:"loc",labelFormat:".0s",leavesOnly:!1,innerPadding:3,outerPadding:3}}};exports.barMapping=S,exports.calendarMapping=T,exports.chartsMapping=Y,exports.chordMapping=M,exports.circlePackingMapping=R,exports.heatmapMapping=W,exports.lineMapping=A,exports.pieMapping=z,exports.radarMapping=V,exports.renderChart=function(e,a){var t=e.type,r=e.props,i=Y[t],l=i.component,n=X({},_,i.defaults,r,L.default(a,i.runtimeProps||[]));return'<?xml version="1.0" ?>'+h.renderToStaticMarkup(c.createElement(l,n))},exports.samples=K,exports.sankeyMapping=D,exports.treemapMapping=I;
//# sourceMappingURL=nivo-static.cjs.js.map