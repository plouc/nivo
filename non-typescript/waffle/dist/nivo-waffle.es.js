import{Fragment as e,createElement as t,Component as o}from"react";import r from"lodash/partial";import{TransitionMotion as i,spring as n}from"react-motion";import{pure as a,withPropsOnChange as l,withState as c,compose as s,defaultProps as d,setDisplayName as u}from"@nivo/recompose";import{defsPropTypes as p,noop as f,withDimensions as h,withTheme as m,withMotion as v,bindDefs as y,LegacyContainer as g,SvgWrapper as b,ResponsiveWrapper as C,getRelativeCursor as R,isCursorInRect as x}from"@nivo/core";import{LegendPropShape as q,BoxLegendSvg as w,renderLegendToCanvas as W}from"@nivo/legends";import k from"prop-types";import{ordinalColorsPropType as A,inheritedColorPropType as H,getOrdinalColorScale as D,getInheritedColorGenerator as M}from"@nivo/colors";import{jsx as I,jsxs as O}from"react/jsx-runtime";import E from"lodash/range";import{BasicTooltip as T}from"@nivo/tooltip";function z(){return z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},z.apply(this,arguments)}function L(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,S(e,t)}function S(e,t){return S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},S(e,t)}var P=function(e){var t=e.position,o=e.size,r=e.x,i=e.y,n=e.color,a=e.fill,l=e.opacity,c=e.borderWidth,s=e.borderColor,d=e.data,u=e.onHover,p=e.onLeave,f=e.onClick;return I("rect",{width:o,height:o,x:r,y:i,fill:a||n,strokeWidth:c,stroke:s,opacity:l,onMouseEnter:u,onMouseMove:u,onMouseLeave:p,onClick:function(e){f({position:t,color:n,x:r,y:i,data:d},e)}})};P.propTypes={position:k.number.isRequired,size:k.number.isRequired,x:k.number.isRequired,y:k.number.isRequired,color:k.string.isRequired,fill:k.string,opacity:k.number.isRequired,borderWidth:k.number.isRequired,borderColor:k.string.isRequired,data:k.object.isRequired,onHover:k.func.isRequired,onLeave:k.func.isRequired,onClick:k.func.isRequired},P.defaultProps={data:{}},P.displayName="WaffleCell";var N=a(P),j=function(e){var t=e.position,o=e.size,r=e.x,i=e.y,n=e.color,a=e.opacity,l=e.borderWidth,c=e.borderColor,s=e.data,d=e.onHover,u=e.onLeave,p=e.onClick;return I("div",{style:{position:"absolute",top:i,left:r,width:o,height:o,background:n,opacity:a,boxSizing:"content-box",borderStyle:"solid",borderWidth:l+"px",borderColor:c},onMouseEnter:d,onMouseMove:d,onMouseLeave:u,onClick:function(e){p({position:t,color:n,x:r,y:i,data:s},e)}})};j.propTypes={position:k.number.isRequired,size:k.number.isRequired,x:k.number.isRequired,y:k.number.isRequired,color:k.string.isRequired,opacity:k.number.isRequired,borderWidth:k.number.isRequired,borderColor:k.string.isRequired,data:k.object.isRequired,onHover:k.func.isRequired,onLeave:k.func.isRequired,onClick:k.func.isRequired},j.defaultProps={data:{}},j.displayName="WaffleCellHtml";var F=a(j),_={total:k.number.isRequired,data:k.arrayOf(k.shape({id:k.oneOfType([k.string,k.number]).isRequired,label:k.oneOfType([k.string,k.number]).isRequired,value:k.number.isRequired})).isRequired,hiddenIds:k.arrayOf(k.oneOfType([k.string,k.number])).isRequired,rows:k.number.isRequired,columns:k.number.isRequired,fillDirection:k.oneOf(["top","right","bottom","left"]).isRequired,padding:k.number.isRequired,colors:A.isRequired,emptyColor:k.string.isRequired,emptyOpacity:k.number.isRequired,borderWidth:k.number.isRequired,borderColor:H.isRequired,getBorderColor:k.func.isRequired,isInteractive:k.bool,tooltipFormat:k.oneOfType([k.func,k.string]),tooltip:k.func,cellSize:k.number.isRequired,cells:k.array.isRequired,origin:k.shape({x:k.number.isRequired,y:k.number.isRequired}).isRequired},B=z({},_,{cellComponent:k.func.isRequired,role:k.string.isRequired},p,{legends:k.arrayOf(k.shape(q)).isRequired}),K=z({},_,{cellComponent:k.func.isRequired}),U=z({},_,{pixelRatio:k.number.isRequired,legends:k.arrayOf(k.shape(q)).isRequired}),G={hiddenIds:[],fillDirection:"bottom",padding:1,colors:{scheme:"nivo"},emptyColor:"#cccccc",emptyOpacity:1,borderWidth:0,borderColor:{from:"color",modifiers:[["darker",1]]},defs:[],fill:[],isInteractive:!0,onClick:f},J=z({},G,{cellComponent:N,role:"img",defs:[],fill:[],legends:[]}),Q=z({},G,{cellComponent:F}),V=z({},G,{legends:[],pixelRatio:"undefined"!=typeof window&&window.devicePixelRatio||1}),X=Object.freeze({__proto__:null,WafflePropTypes:B,WaffleHtmlPropTypes:K,WaffleCanvasPropTypes:U,WaffleDefaultProps:J,WaffleHtmlDefaultProps:Q,WaffleCanvasDefaultProps:V}),Y=function(e,t,o,r,i,n){var a=function(e,t,o,r,i){var n=(e-(r-1)*i)/r,a=(t-(o-1)*i)/o;return Math.min(n,a)}(e,t,o,r,n),l=[];switch(i){case"top":E(o).forEach((function(e){E(r).forEach((function(t){l.push({position:e*r+t,row:e,column:t,x:t*(a+n),y:e*(a+n)})}))}));break;case"bottom":E(o-1,-1).forEach((function(e){E(r).forEach((function(t){l.push({position:e*r+t,row:e,column:t,x:t*(a+n),y:e*(a+n)})}))}));break;case"left":E(r).forEach((function(e){E(o).forEach((function(t){l.push({position:t*r+e,row:t,column:e,x:e*(a+n),y:t*(a+n)})}))}));break;case"right":E(r-1,-1).forEach((function(e){E(o-1,-1).forEach((function(t){l.push({position:t*r+e,row:t,column:e,x:e*(a+n),y:t*(a+n)})}))}));break;default:throw new Error("Invalid fill direction provided: "+i)}return{cells:l,cellSize:a,origin:{x:(e-(a*r+n*(r-1)))/2,y:(t-(a*o+n*(o-1)))/2}}},Z=function(e,t){var o=e.map((function(e){return z({},e)}));return t.forEach((function(e){E(e.startAt,e.endAt).forEach((function(t){var r=o[t];void 0!==r&&(r.data=e,r.groupIndex=e.groupIndex,r.color=e.color)}))})),o},$=[h(),m(),v(),l(["colors"],(function(e){var t=e.colors;return{getColor:D(t,"id")}})),l(["borderColor","theme"],(function(e){var t=e.borderColor,o=e.theme;return{getBorderColor:M(t,o)}})),c("currentCell","setCurrentCell",null),l(["rows","columns","total"],(function(e){var t=e.rows,o=e.columns;return{unit:e.total/(t*o)}})),l(["width","height","rows","columns","fillDirection","padding"],(function(e){var t=e.width,o=e.height,r=e.rows,i=e.columns,n=e.fillDirection,a=e.padding;return Y(t,o,r,i,n,a)})),l(["data","unit","getColor","hiddenIds"],(function(e){var t=e.data,o=e.unit,r=e.getColor,i=e.hiddenIds,n=0;return{computedData:t.map((function(e,t){if(!i.includes(e.id)){var a=z({},e,{groupIndex:t,startAt:n,endAt:n+Math.round(e.value/o),color:r(e)});return n=a.endAt,a}return z({},e,{groupIndex:t,startAt:n,endAt:n,color:r(e)})}))}})),l(["computedData"],(function(e){return{legendData:e.computedData.map((function(e){return{id:e.id,label:e.id,color:e.color,fill:e.fill}}))}}))],ee=function(e){var t=X[e.displayName+"DefaultProps"];switch(e.displayName){case"Waffle":return s.apply(void 0,[d(t)].concat($,[v(),l(["computedData","defs","fill"],(function(e){var t=e.computedData,o=e.defs,r=e.fill;return{defs:y(o,t,r,{targetKey:"fill"})}})),a]))(e);case"WaffleHtml":return s.apply(void 0,[d(t)].concat($,[v(),a]))(e);case"WaffleCanvas":return s.apply(void 0,[d(t)].concat($,[a]))(e)}return e},te=function(e){var t=e.position,o=e.row,r=e.column,i=e.color,n=e.data,a=e.theme,l=e.tooltipFormat,c=e.tooltip;return I(T,{id:n.label,value:n.value,enableChip:!0,color:i,theme:a,format:l,renderContent:"function"==typeof c?c.bind(null,z({position:t,row:o,column:r,color:i},n)):null})};te.displayName="WaffleCellTooltip",te.propTypes={position:k.number.isRequired,row:k.number.isRequired,column:k.number.isRequired,color:k.string.isRequired,data:k.object.isRequired,theme:k.object.isRequired,tooltipFormat:k.oneOfType([k.func,k.string]),tooltip:k.func};var oe=function(o){function a(){for(var e,t=arguments.length,r=new Array(t),i=0;i<t;i++)r[i]=arguments[i];return(e=o.call.apply(o,[this].concat(r))||this).handleCellHover=function(t,o,r){var i=e.props,n=i.setCurrentCell,a=i.theme,l=i.tooltipFormat,c=i.tooltip;n(o),o.data&&t(I(te,{position:o.position,row:o.row,column:o.column,color:o.color,data:o.data,theme:a,tooltipFormat:l,tooltip:c}),r)},e.handleCellLeave=function(t){e.props.setCurrentCell(null),t()},e}return L(a,o),a.prototype.render=function(){var o=this,a=this.props;a.hiddenIds;var l=a.margin,c=a.width,s=a.height,d=a.outerWidth,u=a.outerHeight,p=a.cellComponent,f=a.emptyColor,h=a.emptyOpacity,m=a.borderWidth,v=a.getBorderColor,y=a.theme,C=a.defs,R=a.animate,x=a.motionStiffness,q=a.motionDamping,W=a.isInteractive,k=a.onClick,A=a.cells,H=a.cellSize,D=a.origin,M=a.computedData,E=a.legendData,T=a.legends,L=a.role;return A.forEach((function(e){e.color=f})),I(g,{isInteractive:W,theme:y,animate:R,motionDamping:q,motionStiffness:x,children:function(a){var f,g=a.showTooltip,W=a.hideTooltip,S=r(o.handleCellHover,g),P=r(o.handleCellLeave,W);if(!0===R){var N={stiffness:x,damping:q};f=I(i,{styles:M.map((function(e){return{key:e.id,data:e,style:{startAt:n(e.startAt,N),endAt:n(e.endAt,N)}}})),children:function(o){var i=Z(A,o.map((function(e){return z({},e.data,{startAt:Math.round(e.style.startAt),endAt:Math.round(e.style.endAt)})})));return I(e,{children:i.map((function(e){return t(p,{key:e.position,position:e.position,size:H,x:e.x,y:e.y,color:e.color,fill:e.data&&e.data.fill,opacity:e.data?1:h,borderWidth:m,borderColor:v(e),data:e.data,onHover:r(S,e),onLeave:P,onClick:k})}))})}})}else{var j=Z(A,M);f=I(e,{children:j.map((function(e){return t(p,{key:e.position,position:e.position,size:H,x:e.x,y:e.y,color:e.color,fill:e.data&&e.data.fill,opacity:e.data?1:h,borderWidth:m,borderColor:v(e),data:e.data,onHover:r(S,e),onLeave:P,onClick:k})}))})}return O(b,{width:d,height:u,margin:l,defs:C,theme:y,role:L,children:[I("g",{transform:"translate("+D.x+", "+D.y+")",children:f}),T.map((function(e,t){return I(w,z({},e,{containerWidth:c,containerHeight:s,data:E,theme:y}),t)}))]})}})},a}(o);oe.propTypes=B,oe.displayName="Waffle";var re=u(oe.displayName)(ee(oe)),ie=function(e){return I(C,{children:function(t){var o=t.width,r=t.height;return I(re,z({width:o,height:r},e))}})},ne=function(o){function a(){for(var e,t=arguments.length,r=new Array(t),i=0;i<t;i++)r[i]=arguments[i];return(e=o.call.apply(o,[this].concat(r))||this).handleCellHover=function(t,o,r){var i=e.props,n=i.setCurrentCell,a=i.theme,l=i.tooltipFormat,c=i.tooltip;n(o),o.data&&t(I(te,{position:o.position,row:o.row,column:o.column,color:o.color,data:o.data,theme:a,tooltipFormat:l,tooltip:c}),r)},e.handleCellLeave=function(t){e.props.setCurrentCell(null),t()},e}return L(a,o),a.prototype.render=function(){var o=this,a=this.props,l=a.margin,c=a.outerWidth,s=a.outerHeight,d=a.cellComponent,u=a.emptyColor,p=a.emptyOpacity,f=a.borderWidth,h=a.getBorderColor,m=a.theme,v=a.animate,y=a.motionStiffness,b=a.motionDamping,C=a.isInteractive,R=a.onClick,x=a.cells,q=a.cellSize,w=a.origin,W=a.computedData;return x.forEach((function(e){e.color=u})),I(g,{isInteractive:C,theme:m,animate:v,motionDamping:b,motionStiffness:y,children:function(a){var u,m=a.showTooltip,g=a.hideTooltip,C=r(o.handleCellHover,m),k=r(o.handleCellLeave,g);if(!0===v){var A={stiffness:y,damping:b};u=I(i,{styles:W.map((function(e){return{key:e.id,data:e,style:{startAt:n(e.startAt,A),endAt:n(e.endAt,A)}}})),children:function(o){var i=Z(x,o.map((function(e){return z({},e.data,{startAt:Math.round(e.style.startAt),endAt:Math.round(e.style.endAt)})})));return I(e,{children:i.map((function(e){return t(d,{key:e.position,position:e.position,size:q,x:e.x,y:e.y,color:e.color,fill:e.data&&e.data.fill,opacity:e.data?1:p,borderWidth:f,borderColor:h(e),data:e.data,onHover:r(C,e),onLeave:k,onClick:R})}))})}})}else{var H=Z(x,W);u=I(e,{children:H.map((function(e){return t(d,{key:e.position,position:e.position,size:q,x:e.x,y:e.y,color:e.color,fill:e.data&&e.data.fill,opacity:e.data?1:p,borderWidth:f,borderColor:h(e),data:e.data,onHover:r(C,e),onLeave:k,onClick:R})}))})}return I("div",{style:{position:"relative",width:c,height:s},children:I("div",{style:{position:"absolute",top:l.top+w.y,left:l.left+w.x},children:u})})}})},a}(o);ne.propTypes=K,ne.displayName="WaffleHtml";var ae=u(ne.displayName)(ee(ne)),le=function(e){return I(C,{children:function(t){var o=t.width,r=t.height;return I(ae,z({width:o,height:r},e))}})},ce=function(e,t,o,r,i,n){return e.find((function(e){return x(e.x+o.x+r.left,e.y+o.y+r.top,t,t,i,n)}))},se=function(e){function t(){for(var t,o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r))||this).handleMouseHover=function(e,o){return function(r){var i=t.props,n=i.isInteractive,a=i.margin,l=i.theme,c=i.cells,s=i.cellSize,d=i.origin,u=i.tooltipFormat,p=i.tooltip;if(n&&c){var f=R(t.surface,r),h=f[0],m=f[1],v=ce(c,s,d,a,h,m);void 0!==v&&v.data?e(I(te,{position:v.position,row:v.row,column:v.column,color:v.color,data:v.data,theme:l,tooltipFormat:u,tooltip:p}),r):o()}}},t.handleMouseLeave=function(e){return function(){!0===t.props.isInteractive&&e()}},t.handleClick=function(e){var o=t.props,r=o.isInteractive,i=o.margin,n=o.onClick,a=o.cells,l=o.cellSize,c=o.origin;if(r&&a){var s=R(t.surface,e),d=s[0],u=s[1],p=ce(a,l,c,i,d,u);void 0!==p&&n(p,e)}},t}L(t,e);var o=t.prototype;return o.componentDidMount=function(){this.ctx=this.surface.getContext("2d"),this.draw(this.props)},o.componentDidUpdate=function(){this.ctx=this.surface.getContext("2d"),this.draw(this.props)},o.draw=function(e){var t=this,o=e.pixelRatio,r=e.margin,i=e.width,n=e.height,a=e.outerWidth,l=e.outerHeight,c=e.getColor,s=e.emptyColor,d=e.emptyOpacity,u=e.borderWidth,p=e.getBorderColor,f=e.cells,h=e.cellSize,m=e.origin,v=e.computedData,y=e.legendData,g=e.legends,b=e.theme;this.surface.width=a*o,this.surface.height=l*o,this.ctx.scale(o,o),this.ctx.fillStyle=b.background,this.ctx.fillRect(0,0,a,l),this.ctx.translate(r.left,r.top),f.forEach((function(e){e.color=s})),v.forEach((function(e){E(e.startAt,e.endAt).forEach((function(t){var o=f[t];void 0!==o&&(o.data=e,o.groupIndex=e.groupIndex,o.color=c(e))}))})),f.forEach((function(e){t.ctx.save(),t.ctx.globalAlpha=e.data?1:d,t.ctx.fillStyle=e.color,t.ctx.fillRect(e.x+m.x,e.y+m.y,h,h),u>0&&(t.ctx.strokeStyle=p(e),t.ctx.lineWidth=u,t.ctx.strokeRect(e.x+m.x,e.y+m.y,h,h)),t.ctx.restore()})),g.forEach((function(e){W(t.ctx,z({},e,{data:y,containerWidth:i,containerHeight:n,theme:b}))}))},o.render=function(){var e=this,t=this.props,o=t.outerWidth,r=t.outerHeight,i=t.pixelRatio,n=t.isInteractive,a=t.theme;return I(g,{isInteractive:n,theme:a,animate:!1,children:function(t){var n=t.showTooltip,a=t.hideTooltip;return I("canvas",{ref:function(t){e.surface=t},width:o*i,height:r*i,style:{width:o,height:r},onMouseEnter:e.handleMouseHover(n,a),onMouseMove:e.handleMouseHover(n,a),onMouseLeave:e.handleMouseLeave(a),onClick:e.handleClick})}})},t}(o);se.propTypes=U,se.displayName="WaffleCanvas";var de=u(se.displayName)(ee(se)),ue=function(e){return I(C,{children:function(t){var o=t.width,r=t.height;return I(de,z({width:o,height:r},e))}})};export{ie as ResponsiveWaffle,ue as ResponsiveWaffleCanvas,le as ResponsiveWaffleHtml,re as Waffle,de as WaffleCanvas,V as WaffleCanvasDefaultProps,U as WaffleCanvasPropTypes,J as WaffleDefaultProps,ae as WaffleHtml,Q as WaffleHtmlDefaultProps,K as WaffleHtmlPropTypes,B as WafflePropTypes};
//# sourceMappingURL=nivo-waffle.es.js.map