!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("lodash/forOwn"),require("express"),require("uuid"),require("@nivo/static"),require("lodash/omit")):"function"==typeof define&&define.amd?define(["exports","lodash/forOwn","express","uuid","@nivo/static","lodash/omit"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).nivo=e.nivo||{},e["lodash/forOwn"],e.express,e.uuid,e.nivo,e["lodash/omit"])}(this,(function(e,t,r,n,o,s){"use strict";function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function i(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var u=a(t),f=i(n),d=a(s),l={},c=r.Router();c.get("/",(function(e,t){t.status(200).json({samples:Object.keys(o.samples).map((function(t){return e.protocol+"://"+e.get("host")+e.originalUrl+"/samples/"+t+".svg"}))})})),u.default(o.chartsMapping,(function(e,t){var r=e.schema;c.post("/charts/"+t,function(e,t){void 0===t&&(t={});var r=t.omit;return function(t,n,o){var s=t.body;d.default&&(s=d.default(s,r));try{t.payload=e.validate(s,{abortEarly:!0,convert:!0}),o()}catch(e){return n.status(400).json({errors:e.details.map((function(e){var t=e.message,r=e.path;return t+(r?" ("+r+")":"")}))})}}}(r),(function(e,r){var n,o=e.payload,s=f.v4(),a=e.protocol+"://"+e.get("host")+"/r/"+s;n={type:t,props:o,url:a},l[s]=n,r.status(201).json({id:s,url:a})}))})),c.get("/r/:id",(function(e,t){var r,n=e.params.id,s=(r=e.params.id,l[r]);if(!s)return t.set("Content-Type","text/plain").status(404).send('no chart found for id "'+n+'"');var a=o.renderChart(s,e.query);t.set("Content-Type","image/svg+xml").status(200).send(a)})),u.default(o.samples,(function(e,t){c.get("/samples/"+t+".svg",(function(t,r){var n=o.renderChart(e,t.query);r.set("Content-Type","image/svg+xml").status(200).send(n)}))})),e.nivo=c,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=nivo-express.umd.js.map
