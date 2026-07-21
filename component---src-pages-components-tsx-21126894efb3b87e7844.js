"use strict";(self.webpackChunknivo_website=self.webpackChunknivo_website||[]).push([[747],{62681:function(e,t,o){var n=o(64543),r=o(97027);t.A=n.default.div.withConfig({displayName:"PageContent",componentId:"sc-5c9r0p-0"})(["margin:0 50px;position:relative;"," ",""],r.A.tablet`
        & {
            margin: 0 30px;
        }
    `,r.A.mobile`
        & {
            margin: 0 15px;
        }
    `)},87783:function(e,t,o){o.r(t),o.d(t,{default:function(){return B}});var n=o(7378),r=o(61650),l=o(44964),a=o(69629),i=o(64543),c=o(97027),s=o(62681),d=o(74856);const p=(0,n.memo)((e=>{let{term:t,onChange:o}=e;const r=(0,n.useCallback)((e=>o(e.target.value)),[o]),l=(0,n.useCallback)((()=>o("")),[o]);return n.createElement(m,null,n.createElement(u,{type:"text",onChange:r,placeholder:"Search",value:t}),n.createElement(g,null),t.length>0&&n.createElement(h,{onClick:l},n.createElement(d.m6K,null)))})),m=i.default.div.withConfig({displayName:"ComponentsSearch__Container",componentId:"sc-eco4zd-0"})(["position:relative;width:100%;"]),u=i.default.input.withConfig({displayName:"ComponentsSearch__Input",componentId:"sc-eco4zd-1"})(["width:100%;padding:0 44px;height:42px;line-height:38px;border:2px solid ",";font-size:inherit;border-radius:21px;background:",";color:",";cursor:pointer;box-shadow:none;&::-webkit-input-placeholder,&:-ms-input-placeholder,&::-moz-placeholder{color:",";}&:focus{outline:0;border-color:",";cursor:auto;}"],(e=>{let{theme:t}=e;return t.colors.borderLight}),(e=>{let{theme:t}=e;return t.colors.cardBackground}),(e=>{let{theme:t}=e;return t.colors.text}),(e=>{let{theme:t}=e;return t.colors.textLight}),(e=>{let{theme:t}=e;return t.colors.accent})),g=(0,i.default)(d.gZ7).withConfig({displayName:"ComponentsSearch__StyledSearchIcon",componentId:"sc-eco4zd-2"})(["color:",";font-size:26px;position:absolute;top:8px;left:12px;cursor:pointer;"],(e=>{let{theme:t}=e;return t.colors.accent})),h=i.default.span.withConfig({displayName:"ComponentsSearch__Clear",componentId:"sc-eco4zd-3"})(["background:",";color:",";width:26px;height:26px;font-size:18px;border-radius:13px;position:absolute;top:8px;right:9px;display:flex;align-items:center;justify-content:center;cursor:pointer;&:hover{color:white;}"],(e=>{let{theme:t}=e;return t.colors.accent}),(e=>{let{theme:t}=e;return t.colors.cardBackground})),f=["SVG","HTML","Canvas","API"],x=(0,n.memo)((e=>{let{filter:t,onChange:o}=e;return n.createElement(C,null,n.createElement(b,{isActive:null===t,onClick:()=>{o(null)}},"All"),f.map((e=>n.createElement(b,{key:e,isActive:null!==t&&e.toLowerCase()===t.toLowerCase(),onClick:()=>{o(e)}},e))))})),C=i.default.div.withConfig({displayName:"ComponentsFilters__Container",componentId:"sc-xb80ph-0"})(["display:flex;border:2px solid ",";height:42px;border-radius:2px;overflow:hidden;font-size:13px;font-weight:700;"],(e=>{let{theme:t}=e;return t.colors.accent})),b=i.default.span.withConfig({displayName:"ComponentsFilters__Item",componentId:"sc-xb80ph-1"})(["line-height:38px;background:",";color:",";flex:1;text-align:center;cursor:pointer;border-left:1px solid ",";padding:0 26px;&:first-child{border-left-width:0;}"," ",""],(e=>{let{isActive:t,theme:o}=e;return t?o.colors.accent:o.colors.cardBackground}),(e=>{let{isActive:t,theme:o}=e;return t?o.colors.cardBackground:o.colors.accent}),(e=>{let{theme:t}=e;return t.colors.accent}),c.A.tablet`
        & {
            padding: 0 12px;
        }
    `,c.A.mobile`
        & {
            padding: 0 12px;
        }
    `);var w=o(95088);const v=(0,n.memo)((e=>{let{name:t,id:o,flavors:r}=e;const l=(0,i.useTheme)(),a=(0,n.useCallback)((e=>{e.stopPropagation()}),[]);return n.createElement(k,null,n.createElement(E,{className:`sprite-icons-${o}-${l.id}-colored`}),n.createElement(y,null,n.createElement(_,null,t),n.createElement(I,null,n.createElement(A,{to:`/${o}/`},"SVG"),r.html&&n.createElement(A,{onClick:a,to:`/${o}/html/`},"HTML"),r.canvas&&n.createElement(A,{onClick:a,to:`/${o}/canvas/`},"Canvas"),r.api&&n.createElement(A,{onClick:a,to:`/${o}/api/`},"API"))))})),k=i.default.div.withConfig({displayName:"ComponentsGridItem__Container",componentId:"sc-1v9kuqg-0"})(["background-color:",";border-radius:2px;padding:12px;color:",";border:1px solid ",";box-shadow:",";display:flex;align-items:flex-start;justify-content:space-between;&:focus,&:hover{box-shadow:none;border-color:",";outline:0;}",""],(e=>{let{theme:t}=e;return t.colors.cardBackground}),(e=>{let{theme:t}=e;return t.colors.text}),(e=>{let{theme:t}=e;return t.colors.cardBackground}),(e=>{let{theme:t}=e;return t.cardShadow}),(e=>{let{theme:t}=e;return t.colors.accent}),c.A.mobile`
        & {
            border-width: 0;
            border-top-width: 1px;
            border-color: ${e=>{let{theme:t}=e;return t.colors.borderLight}};
            box-shadow: none;
        }
    
        &:focus,
        &:hover {
            background-color: ${e=>{let{theme:t}=e;return t.colors.background}};
            border-color: ${e=>{let{theme:t}=e;return t.colors.borderLight}};
        }
    
        &:first-child {
            border-top-width: 0;
        }    
    `),y=i.default.div.withConfig({displayName:"ComponentsGridItem__Header",componentId:"sc-1v9kuqg-1"})(["flex:1;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;"]),_=i.default.span.withConfig({displayName:"ComponentsGridItem__Name",componentId:"sc-1v9kuqg-2"})(["font-size:15px;font-weight:600;"]),E=i.default.span.withConfig({displayName:"ComponentsGridItem__Icon",componentId:"sc-1v9kuqg-3"})(["margin-right:15px;display:block;width:52px;height:52px;"]),I=i.default.div.withConfig({displayName:"ComponentsGridItem__Flavors",componentId:"sc-1v9kuqg-4"})(["font-size:0.8rem;line-height:0.8rem;margin-top:4px;display:flex;align-items:center;flex-wrap:wrap;"]),A=(0,i.default)(w.Link).withConfig({displayName:"ComponentsGridItem__Flavor",componentId:"sc-1v9kuqg-5"})(["cursor:pointer;text-decoration:none;font-size:0.75rem;line-height:1em;font-weight:700;padding:3px 4px;margin-right:3px;margin-bottom:3px;border-radius:2px;background-color:",";border:1px solid ",";color:#ffffff;&:hover{background-color:",";color:",";}"],(e=>{let{theme:t}=e;return t.colors.accent}),(e=>{let{theme:t}=e;return t.colors.accent}),(e=>{let{theme:t}=e;return t.colors.cardBackground}),(e=>{let{theme:t}=e;return t.colors.accent}));var N=o(12188);const L=e=>{let{filter:t,term:o}=e,r=N.d;if(o||t){const e=((e,t)=>{let o=[];if(e&&e.length>0&&o.push((t=>{let{name:o}=t;return o.toLowerCase().includes(e.toLowerCase())})),t){const e=t.toLowerCase();o.push((t=>{let{tags:o,flavors:n}=t;return!!o.includes(e)||!(!(e in n)||!n[e])}))}return e=>o.every((t=>t(e)))})(o,t);r=r.filter(e)}return 0===r.length?n.createElement(z,null,n.createElement(G,null,"¯\\_(ツ)_/¯"),n.createElement("div",null,"no result, sorry…")):n.createElement(S,null,r.map((e=>n.createElement(v,Object.assign({key:e.id},e)))))},S=i.default.div.withConfig({displayName:"ComponentsGrid__Grid",componentId:"sc-jx91q0-0"})(["display:grid;grid-row-gap:15px;margin-bottom:30px;"," "," "," ",""],c.A.desktopLarge`
        & {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-column-gap: 30px;
        }
    `,c.A.desktop`
        & {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-column-gap: 20px;
        }
    `,c.A.tablet`
        & {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-column-gap: 20px;
        }
    `,c.A.mobile`
        & {
            grid-template-columns: 1fr;
            grid-row-gap: 0;
            box-shadow: ${e=>{let{theme:t}=e;return t.cardShadow}};
        }
    `),z=i.default.div.withConfig({displayName:"ComponentsGrid__Empty",componentId:"sc-jx91q0-1"})(["margin-top:120px;text-align:center;"]),G=i.default.span.withConfig({displayName:"ComponentsGrid__EmptyIcon",componentId:"sc-jx91q0-2"})(["font-size:64px;display:block;margin-bottom:50px;white-space:pre;color:",";"],(e=>{let{theme:t}=e;return t.colors.accent})),q=e=>{let{location:t}=e;const{0:o,1:r}=(0,n.useMemo)((()=>{const e=new URLSearchParams(t.search);return[e.get("q"),e.get("filter")]}),[t.search]),l=(0,n.useCallback)((e=>{const t=new URLSearchParams;e&&t.append("q",e),r&&t.append("filter",r),(0,w.navigate)(`/components/?${t.toString()}`,{replace:!0})}),[r]),i=(0,n.useCallback)((e=>{const t=new URLSearchParams;o&&t.append("q",o),e&&t.append("filter",e),(0,w.navigate)(`/components/?${t.toString()}`)}),[o]);return n.createElement(s.A,null,n.createElement(a.A,{title:"Components"}),n.createElement($,null,n.createElement("h1",null,"Components")),n.createElement(j,null,n.createElement(p,{term:o||"",onChange:l}),n.createElement(x,{onChange:i,filter:r})),n.createElement(L,{term:o,filter:r}))},$=i.default.div.withConfig({displayName:"ComponentsExplorer__Header",componentId:"sc-2fuuvx-0"})(["height:130px;color:white;margin-bottom:50px;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;"]),j=i.default.div.withConfig({displayName:"ComponentsExplorer__SearchAndFilters",componentId:"sc-2fuuvx-1"})(["display:grid;align-items:center;margin-bottom:30px;grid-template-columns:1fr 2fr;"," "," "," ",""],c.A.desktopLarge`
        & {
            grid-column-gap: 30px;
        }
    `,c.A.desktop`
        & {
            grid-column-gap: 20px;
        }
    `,c.A.tablet`
        & {
            grid-template-columns: 1fr;
            grid-row-gap: 15px;
        }
    `,c.A.mobile`
        & {
            grid-template-columns: 1fr;
            grid-row-gap: 15px;
        }
    `);var B=e=>{let{location:t}=e;return n.createElement(r.A,null,n.createElement(l.G,{title:"Components"}),n.createElement(q,{location:t}))}}}]);
//# sourceMappingURL=component---src-pages-components-tsx-21126894efb3b87e7844.js.map