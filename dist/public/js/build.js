!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t=e.length,n=Z.type(e);return"function"===n||Z.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e}function r(e,t,n){if(Z.isFunction(t))return Z.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return Z.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(at.test(t))return Z.filter(t,e,n);t=Z.filter(t,e)}return Z.grep(e,function(e){return U.call(t,e)>=0!==n})}function i(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}function o(e){var t=ht[e]={};return Z.each(e.match(dt)||[],function(e,n){t[n]=!0}),t}function s(){J.removeEventListener("DOMContentLoaded",s,!1),e.removeEventListener("load",s,!1),Z.ready()}function a(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=Z.expando+a.uid++}function u(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(bt,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:xt.test(n)?Z.parseJSON(n):n}catch(i){}yt.set(e,t,n)}else n=void 0;return n}function l(){return!0}function c(){return!1}function f(){try{return J.activeElement}catch(e){}}function p(e,t){return Z.nodeName(e,"table")&&Z.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function d(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function h(e){var t=Pt.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function g(e,t){for(var n=0,r=e.length;r>n;n++)vt.set(e[n],"globalEval",!t||vt.get(t[n],"globalEval"))}function m(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(vt.hasData(e)&&(o=vt.access(e),s=vt.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)Z.event.add(t,i,l[i][n])}yt.hasData(e)&&(a=yt.access(e),u=Z.extend({},a),yt.set(t,u))}}function v(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return void 0===t||t&&Z.nodeName(e,t)?Z.merge([e],n):n}function y(e,t){var n=t.nodeName.toLowerCase();"input"===n&&Nt.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}function x(t,n){var r,i=Z(n.createElement(t)).appendTo(n.body),o=e.getDefaultComputedStyle&&(r=e.getDefaultComputedStyle(i[0]))?r.display:Z.css(i[0],"display");return i.detach(),o}function b(e){var t=J,n=$t[e];return n||(n=x(e,t),"none"!==n&&n||(Wt=(Wt||Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),t=Wt[0].contentDocument,t.write(),t.close(),n=x(e,t),Wt.detach()),$t[e]=n),n}function w(e,t,n){var r,i,o,s,a=e.style;return n=n||_t(e),n&&(s=n.getPropertyValue(t)||n[t]),n&&(""!==s||Z.contains(e.ownerDocument,e)||(s=Z.style(e,t)),Bt.test(s)&&It.test(t)&&(r=a.width,i=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=r,a.minWidth=i,a.maxWidth=o)),void 0!==s?s+"":s}function T(e,t){return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function C(e,t){if(t in e)return t;for(var n=t[0].toUpperCase()+t.slice(1),r=t,i=Gt.length;i--;)if(t=Gt[i]+n,t in e)return t;return r}function N(e,t,n){var r=Xt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function k(e,t,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;4>o;o+=2)"margin"===n&&(s+=Z.css(e,n+Tt[o],!0,i)),r?("content"===n&&(s-=Z.css(e,"padding"+Tt[o],!0,i)),"margin"!==n&&(s-=Z.css(e,"border"+Tt[o]+"Width",!0,i))):(s+=Z.css(e,"padding"+Tt[o],!0,i),"padding"!==n&&(s+=Z.css(e,"border"+Tt[o]+"Width",!0,i)));return s}function E(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=_t(e),s="border-box"===Z.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=w(e,t,o),(0>i||null==i)&&(i=e.style[t]),Bt.test(i))return i;r=s&&(Q.boxSizingReliable()||i===e.style[t]),i=parseFloat(i)||0}return i+k(e,t,n||(s?"border":"content"),r,o)+"px"}function S(e,t){for(var n,r,i,o=[],s=0,a=e.length;a>s;s++)r=e[s],r.style&&(o[s]=vt.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Ct(r)&&(o[s]=vt.access(r,"olddisplay",b(r.nodeName)))):(i=Ct(r),"none"===n&&i||vt.set(r,"olddisplay",i?n:Z.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}function D(e,t,n,r,i){return new D.prototype.init(e,t,n,r,i)}function j(){return setTimeout(function(){Qt=void 0}),Qt=Z.now()}function A(e,t){var n,r=0,i={height:e};for(t=t?1:0;4>r;r+=2-t)n=Tt[r],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function L(e,t,n){for(var r,i=(nn[t]||[]).concat(nn["*"]),o=0,s=i.length;s>o;o++)if(r=i[o].call(n,t,e))return r}function q(e,t,n){var r,i,o,s,a,u,l,c,f=this,p={},d=e.style,h=e.nodeType&&Ct(e),g=vt.get(e,"fxshow");n.queue||(a=Z._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,f.always(function(){f.always(function(){a.unqueued--,Z.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],l=Z.css(e,"display"),c="none"===l?vt.get(e,"olddisplay")||b(e.nodeName):l,"inline"===c&&"none"===Z.css(e,"float")&&(d.display="inline-block")),n.overflow&&(d.overflow="hidden",f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Kt.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(h?"hide":"show")){if("show"!==i||!g||void 0===g[r])continue;h=!0}p[r]=g&&g[r]||Z.style(e,r)}else l=void 0;if(Z.isEmptyObject(p))"inline"===("none"===l?b(e.nodeName):l)&&(d.display=l);else{g?"hidden"in g&&(h=g.hidden):g=vt.access(e,"fxshow",{}),o&&(g.hidden=!h),h?Z(e).show():f.done(function(){Z(e).hide()}),f.done(function(){var t;vt.remove(e,"fxshow");for(t in p)Z.style(e,t,p[t])});for(r in p)s=L(h?g[r]:0,r,f),r in g||(g[r]=s.start,h&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function H(e,t){var n,r,i,o,s;for(n in e)if(r=Z.camelCase(n),i=t[r],o=e[n],Z.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=Z.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function O(e,t,n){var r,i,o=0,s=tn.length,a=Z.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=Qt||j(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:Z.extend({},t),opts:Z.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Qt||j(),duration:n.duration,tweens:[],createTween:function(t,n){var r=Z.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(H(c,l.opts.specialEasing);s>o;o++)if(r=tn[o].call(l,e,c,l.opts))return r;return Z.map(c,L,l),Z.isFunction(l.opts.start)&&l.opts.start.call(e,l),Z.fx.timer(Z.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function F(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(dt)||[];if(Z.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function P(e,t,n,r){function i(a){var u;return o[a]=!0,Z.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||s||o[l]?s?!(u=l):void 0:(t.dataTypes.unshift(l),i(l),!1)}),u}var o={},s=e===bn;return i(t.dataTypes[0])||!o["*"]&&i("*")}function R(e,t){var n,r,i=Z.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&Z.extend(!0,e,r),e}function M(e,t,n){for(var r,i,o,s,a=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):void 0}function W(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(f){return{state:"parsererror",error:s?f:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}function $(e,t,n,r){var i;if(Z.isArray(t))Z.each(t,function(t,i){n||kn.test(e)?r(e,i):$(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==Z.type(t))r(e,t);else for(i in t)$(e+"["+i+"]",t[i],n,r)}function I(e){return Z.isWindow(e)?e:9===e.nodeType&&e.defaultView}var B=[],_=B.slice,z=B.concat,X=B.push,U=B.indexOf,V={},Y=V.toString,G=V.hasOwnProperty,Q={},J=e.document,K="2.1.3",Z=function(e,t){return new Z.fn.init(e,t)},et=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,tt=/^-ms-/,nt=/-([\da-z])/gi,rt=function(e,t){return t.toUpperCase()};Z.fn=Z.prototype={jquery:K,constructor:Z,selector:"",length:0,toArray:function(){return _.call(this)},get:function(e){return null!=e?0>e?this[e+this.length]:this[e]:_.call(this)},pushStack:function(e){var t=Z.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return Z.each(this,e,t)},map:function(e){return this.pushStack(Z.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(_.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:X,sort:B.sort,splice:B.splice},Z.extend=Z.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[a]||{},a++),"object"==typeof s||Z.isFunction(s)||(s={}),a===u&&(s=this,a--);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(Z.isPlainObject(r)||(i=Z.isArray(r)))?(i?(i=!1,o=n&&Z.isArray(n)?n:[]):o=n&&Z.isPlainObject(n)?n:{},s[t]=Z.extend(l,o,r)):void 0!==r&&(s[t]=r));return s},Z.extend({expando:"jQuery"+(K+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===Z.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!Z.isArray(e)&&e-parseFloat(e)+1>=0},isPlainObject:function(e){return"object"!==Z.type(e)||e.nodeType||Z.isWindow(e)?!1:e.constructor&&!G.call(e.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?V[Y.call(e)]||"object":typeof e},globalEval:function(e){var t,n=eval;e=Z.trim(e),e&&(1===e.indexOf("use strict")?(t=J.createElement("script"),t.text=e,J.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(tt,"ms-").replace(nt,rt)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var i,o=0,s=e.length,a=n(e);if(r){if(a)for(;s>o&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(a)for(;s>o&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(et,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?Z.merge(r,"string"==typeof e?[e]:e):X.call(r,e)),r},inArray:function(e,t,n){return null==t?-1:U.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;n>r;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,s=e.length,a=!n;s>o;o++)r=!t(e[o],o),r!==a&&i.push(e[o]);return i},map:function(e,t,r){var i,o=0,s=e.length,a=n(e),u=[];if(a)for(;s>o;o++)i=t(e[o],o,r),null!=i&&u.push(i);else for(o in e)i=t(e[o],o,r),null!=i&&u.push(i);return z.apply([],u)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),Z.isFunction(e)?(r=_.call(arguments,2),i=function(){return e.apply(t||this,r.concat(_.call(arguments)))},i.guid=e.guid=e.guid||Z.guid++,i):void 0},now:Date.now,support:Q}),Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){V["[object "+t+"]"]=t.toLowerCase()});var it=function(e){function t(e,t,n,r){var i,o,s,a,u,l,f,d,h,g;if((t?t.ownerDocument||t:$)!==q&&L(t),t=t||q,n=n||[],a=t.nodeType,"string"!=typeof e||!e||1!==a&&9!==a&&11!==a)return n;if(!r&&O){if(11!==a&&(i=yt.exec(e)))if(s=i[1]){if(9===a){if(o=t.getElementById(s),!o||!o.parentNode)return n;if(o.id===s)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(s))&&M(t,o)&&o.id===s)return n.push(o),n}else{if(i[2])return K.apply(n,t.getElementsByTagName(e)),n;if((s=i[3])&&w.getElementsByClassName)return K.apply(n,t.getElementsByClassName(s)),n}if(w.qsa&&(!F||!F.test(e))){if(d=f=W,h=t,g=1!==a&&e,1===a&&"object"!==t.nodeName.toLowerCase()){for(l=k(e),(f=t.getAttribute("id"))?d=f.replace(bt,"\\$&"):t.setAttribute("id",d),d="[id='"+d+"'] ",u=l.length;u--;)l[u]=d+p(l[u]);h=xt.test(e)&&c(t.parentNode)||t,g=l.join(",")}if(g)try{return K.apply(n,h.querySelectorAll(g)),n}catch(m){}finally{f||t.removeAttribute("id")}}}return S(e.replace(ut,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>T.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[W]=!0,e}function i(e){var t=q.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),r=e.length;r--;)T.attrHandle[n[r]]=t}function s(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||V)-(~e.sourceIndex||V);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function a(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function u(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function l(e){return r(function(t){return t=+t,r(function(n,r){for(var i,o=e([],n.length,t),s=o.length;s--;)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}function c(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function f(){}function p(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function d(e,t,n){var r=t.dir,i=n&&"parentNode"===r,o=B++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,s){var a,u,l=[I,o];if(s){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,s))return!0}else for(;t=t[r];)if(1===t.nodeType||i){if(u=t[W]||(t[W]={}),(a=u[r])&&a[0]===I&&a[1]===o)return l[2]=a[2];if(u[r]=l,l[2]=e(t,n,s))return!0}}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function g(e,n,r){for(var i=0,o=n.length;o>i;i++)t(e,n[i],r);return r}function m(e,t,n,r,i){for(var o,s=[],a=0,u=e.length,l=null!=t;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function v(e,t,n,i,o,s){return i&&!i[W]&&(i=v(i)),o&&!o[W]&&(o=v(o,s)),r(function(r,s,a,u){var l,c,f,p=[],d=[],h=s.length,v=r||g(t||"*",a.nodeType?[a]:a,[]),y=!e||!r&&t?v:m(v,p,e,a,u),x=n?o||(r?e:h||i)?[]:s:y;if(n&&n(y,x,a,u),i)for(l=m(x,d),i(l,[],a,u),c=l.length;c--;)(f=l[c])&&(x[d[c]]=!(y[d[c]]=f));if(r){if(o||e){if(o){for(l=[],c=x.length;c--;)(f=x[c])&&l.push(y[c]=f);o(null,x=[],l,u)}for(c=x.length;c--;)(f=x[c])&&(l=o?et(r,f):p[c])>-1&&(r[l]=!(s[l]=f))}}else x=m(x===s?x.splice(h,x.length):x),o?o(null,s,x,u):K.apply(s,x)})}function y(e){for(var t,n,r,i=e.length,o=T.relative[e[0].type],s=o||T.relative[" "],a=o?1:0,u=d(function(e){return e===t},s,!0),l=d(function(e){return et(t,e)>-1},s,!0),c=[function(e,n,r){var i=!o&&(r||n!==D)||((t=n).nodeType?u(e,n,r):l(e,n,r));return t=null,i}];i>a;a++)if(n=T.relative[e[a].type])c=[d(h(c),n)];else{if(n=T.filter[e[a].type].apply(null,e[a].matches),n[W]){for(r=++a;i>r&&!T.relative[e[r].type];r++);return v(a>1&&h(c),a>1&&p(e.slice(0,a-1).concat({value:" "===e[a-2].type?"*":""})).replace(ut,"$1"),n,r>a&&y(e.slice(a,r)),i>r&&y(e=e.slice(r)),i>r&&p(e))}c.push(n)}return h(c)}function x(e,n){var i=n.length>0,o=e.length>0,s=function(r,s,a,u,l){var c,f,p,d=0,h="0",g=r&&[],v=[],y=D,x=r||o&&T.find.TAG("*",l),b=I+=null==y?1:Math.random()||.1,w=x.length;for(l&&(D=s!==q&&s);h!==w&&null!=(c=x[h]);h++){if(o&&c){for(f=0;p=e[f++];)if(p(c,s,a)){u.push(c);break}l&&(I=b)}i&&((c=!p&&c)&&d--,r&&g.push(c))}if(d+=h,i&&h!==d){for(f=0;p=n[f++];)p(g,v,s,a);if(r){if(d>0)for(;h--;)g[h]||v[h]||(v[h]=Q.call(u));v=m(v)}K.apply(u,v),l&&!r&&v.length>0&&d+n.length>1&&t.uniqueSort(u)}return l&&(I=b,D=y),g};return i?r(s):s}var b,w,T,C,N,k,E,S,D,j,A,L,q,H,O,F,P,R,M,W="sizzle"+1*new Date,$=e.document,I=0,B=0,_=n(),z=n(),X=n(),U=function(e,t){return e===t&&(A=!0),0},V=1<<31,Y={}.hasOwnProperty,G=[],Q=G.pop,J=G.push,K=G.push,Z=G.slice,et=function(e,t){for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1},tt="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",nt="[\\x20\\t\\r\\n\\f]",rt="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",it=rt.replace("w","w#"),ot="\\["+nt+"*("+rt+")(?:"+nt+"*([*^$|!~]?=)"+nt+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+it+"))|)"+nt+"*\\]",st=":("+rt+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ot+")*)|.*)\\)|)",at=new RegExp(nt+"+","g"),ut=new RegExp("^"+nt+"+|((?:^|[^\\\\])(?:\\\\.)*)"+nt+"+$","g"),lt=new RegExp("^"+nt+"*,"+nt+"*"),ct=new RegExp("^"+nt+"*([>+~]|"+nt+")"+nt+"*"),ft=new RegExp("="+nt+"*([^\\]'\"]*?)"+nt+"*\\]","g"),pt=new RegExp(st),dt=new RegExp("^"+it+"$"),ht={ID:new RegExp("^#("+rt+")"),CLASS:new RegExp("^\\.("+rt+")"),TAG:new RegExp("^("+rt.replace("w","w*")+")"),ATTR:new RegExp("^"+ot),PSEUDO:new RegExp("^"+st),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+nt+"*(even|odd|(([+-]|)(\\d*)n|)"+nt+"*(?:([+-]|)"+nt+"*(\\d+)|))"+nt+"*\\)|)","i"),bool:new RegExp("^(?:"+tt+")$","i"),needsContext:new RegExp("^"+nt+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+nt+"*((?:-\\d)?\\d*)"+nt+"*\\)|)(?=[^-]|$)","i")},gt=/^(?:input|select|textarea|button)$/i,mt=/^h\d$/i,vt=/^[^{]+\{\s*\[native \w/,yt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,xt=/[+~]/,bt=/'|\\/g,wt=new RegExp("\\\\([\\da-f]{1,6}"+nt+"?|("+nt+")|.)","ig"),Tt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},Ct=function(){L()};try{K.apply(G=Z.call($.childNodes),$.childNodes),G[$.childNodes.length].nodeType}catch(Nt){K={apply:G.length?function(e,t){J.apply(e,Z.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}w=t.support={},N=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},L=t.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:$;return r!==q&&9===r.nodeType&&r.documentElement?(q=r,H=r.documentElement,n=r.defaultView,n&&n!==n.top&&(n.addEventListener?n.addEventListener("unload",Ct,!1):n.attachEvent&&n.attachEvent("onunload",Ct)),O=!N(r),w.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),w.getElementsByTagName=i(function(e){return e.appendChild(r.createComment("")),!e.getElementsByTagName("*").length}),w.getElementsByClassName=vt.test(r.getElementsByClassName),w.getById=i(function(e){return H.appendChild(e).id=W,!r.getElementsByName||!r.getElementsByName(W).length}),w.getById?(T.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&O){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},T.filter.ID=function(e){var t=e.replace(wt,Tt);return function(e){return e.getAttribute("id")===t}}):(delete T.find.ID,T.filter.ID=function(e){var t=e.replace(wt,Tt);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}}),T.find.TAG=w.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):w.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},T.find.CLASS=w.getElementsByClassName&&function(e,t){return O?t.getElementsByClassName(e):void 0},P=[],F=[],(w.qsa=vt.test(r.querySelectorAll))&&(i(function(e){H.appendChild(e).innerHTML="<a id='"+W+"'></a><select id='"+W+"-\f]' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&F.push("[*^$]="+nt+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||F.push("\\["+nt+"*(?:value|"+tt+")"),e.querySelectorAll("[id~="+W+"-]").length||F.push("~="),e.querySelectorAll(":checked").length||F.push(":checked"),e.querySelectorAll("a#"+W+"+*").length||F.push(".#.+[+~]")}),i(function(e){var t=r.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&F.push("name"+nt+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||F.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),F.push(",.*:")})),(w.matchesSelector=vt.test(R=H.matches||H.webkitMatchesSelector||H.mozMatchesSelector||H.oMatchesSelector||H.msMatchesSelector))&&i(function(e){w.disconnectedMatch=R.call(e,"div"),R.call(e,"[s!='']:x"),P.push("!=",st)}),F=F.length&&new RegExp(F.join("|")),P=P.length&&new RegExp(P.join("|")),t=vt.test(H.compareDocumentPosition),M=t||vt.test(H.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},U=t?function(e,t){if(e===t)return A=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!w.sortDetached&&t.compareDocumentPosition(e)===n?e===r||e.ownerDocument===$&&M($,e)?-1:t===r||t.ownerDocument===$&&M($,t)?1:j?et(j,e)-et(j,t):0:4&n?-1:1)}:function(e,t){if(e===t)return A=!0,0;var n,i=0,o=e.parentNode,a=t.parentNode,u=[e],l=[t];if(!o||!a)return e===r?-1:t===r?1:o?-1:a?1:j?et(j,e)-et(j,t):0;if(o===a)return s(e,t);for(n=e;n=n.parentNode;)u.unshift(n);for(n=t;n=n.parentNode;)l.unshift(n);for(;u[i]===l[i];)i++;return i?s(u[i],l[i]):u[i]===$?-1:l[i]===$?1:0},r):q},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==q&&L(e),n=n.replace(ft,"='$1']"),!(!w.matchesSelector||!O||P&&P.test(n)||F&&F.test(n)))try{var r=R.call(e,n);if(r||w.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return t(n,q,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==q&&L(e),M(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==q&&L(e);var n=T.attrHandle[t.toLowerCase()],r=n&&Y.call(T.attrHandle,t.toLowerCase())?n(e,t,!O):void 0;return void 0!==r?r:w.attributes||!O?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],r=0,i=0;if(A=!w.detectDuplicates,j=!w.sortStable&&e.slice(0),e.sort(U),A){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return j=null,e},C=t.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=C(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=C(t);return n},T=t.selectors={cacheLength:50,createPseudo:r,match:ht,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(wt,Tt),e[3]=(e[3]||e[4]||e[5]||"").replace(wt,Tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return ht.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&pt.test(n)&&(t=k(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(wt,Tt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=_[e+" "];return t||(t=new RegExp("(^|"+nt+")"+e+"("+nt+"|$)"))&&_(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(i){var o=t.attr(i,e);return null==o?"!="===n:n?(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o.replace(at," ")+" ").indexOf(r)>-1:"|="===n?o===r||o.slice(0,r.length+1)===r+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,v=a&&t.nodeName.toLowerCase(),y=!u&&!a;if(m){if(o){for(;g;){for(f=t;f=f[g];)if(a?f.nodeName.toLowerCase()===v:1===f.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[s?m.firstChild:m.lastChild],s&&y){for(c=m[W]||(m[W]={}),l=c[e]||[],d=l[0]===I&&l[1],p=l[0]===I&&l[2],f=d&&m.childNodes[d];f=++d&&f&&f[g]||(p=d=0)||h.pop();)if(1===f.nodeType&&++p&&f===t){c[e]=[I,d,p];break}}else if(y&&(l=(t[W]||(t[W]={}))[e])&&l[0]===I)p=l[1];else for(;(f=++d&&f&&f[g]||(p=d=0)||h.pop())&&((a?f.nodeName.toLowerCase()!==v:1!==f.nodeType)||!++p||(y&&((f[W]||(f[W]={}))[e]=[I,p]),f!==t)););return p-=i,p===r||p%r===0&&p/r>=0}}},PSEUDO:function(e,n){var i,o=T.pseudos[e]||T.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return o[W]?o(n):o.length>1?(i=[e,e,"",n],T.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),s=i.length;s--;)r=et(e,i[s]),e[r]=!(t[r]=i[s])}):function(e){return o(e,0,i)}):o}},pseudos:{not:r(function(e){var t=[],n=[],i=E(e.replace(ut,"$1"));return i[W]?r(function(e,t,n,r){for(var o,s=i(e,null,r,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),t[0]=null,!n.pop()}}),has:r(function(e){return function(n){return t(e,n).length>0}}),contains:r(function(e){return e=e.replace(wt,Tt),function(t){return(t.textContent||t.innerText||C(t)).indexOf(e)>-1}}),lang:r(function(e){return dt.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(wt,Tt).toLowerCase(),function(t){var n;do if(n=O?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===H},focus:function(e){return e===q.activeElement&&(!q.hasFocus||q.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!T.pseudos.empty(e)},header:function(e){return mt.test(e.nodeName)},input:function(e){return gt.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:l(function(){return[0]}),last:l(function(e,t){return[t-1]}),eq:l(function(e,t,n){return[0>n?n+t:n]}),even:l(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:l(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:l(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:l(function(e,t,n){for(var r=0>n?n+t:n;++r<t;)e.push(r);return e})}},T.pseudos.nth=T.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})T.pseudos[b]=a(b);for(b in{submit:!0,reset:!0})T.pseudos[b]=u(b);return f.prototype=T.filters=T.pseudos,T.setFilters=new f,k=t.tokenize=function(e,n){var r,i,o,s,a,u,l,c=z[e+" "];if(c)return n?0:c.slice(0);for(a=e,u=[],l=T.preFilter;a;){(!r||(i=lt.exec(a)))&&(i&&(a=a.slice(i[0].length)||a),u.push(o=[])),r=!1,(i=ct.exec(a))&&(r=i.shift(),o.push({value:r,type:i[0].replace(ut," ")}),a=a.slice(r.length));for(s in T.filter)!(i=ht[s].exec(a))||l[s]&&!(i=l[s](i))||(r=i.shift(),o.push({value:r,type:s,matches:i}),a=a.slice(r.length));if(!r)break}return n?a.length:a?t.error(e):z(e,u).slice(0)},E=t.compile=function(e,t){var n,r=[],i=[],o=X[e+" "];if(!o){for(t||(t=k(e)),n=t.length;n--;)o=y(t[n]),o[W]?r.push(o):i.push(o);o=X(e,x(i,r)),o.selector=e}return o},S=t.select=function(e,t,n,r){var i,o,s,a,u,l="function"==typeof e&&e,f=!r&&k(e=l.selector||e);if(n=n||[],1===f.length){if(o=f[0]=f[0].slice(0),o.length>2&&"ID"===(s=o[0]).type&&w.getById&&9===t.nodeType&&O&&T.relative[o[1].type]){if(t=(T.find.ID(s.matches[0].replace(wt,Tt),t)||[])[0],!t)return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(i=ht.needsContext.test(e)?0:o.length;i--&&(s=o[i],!T.relative[a=s.type]);)if((u=T.find[a])&&(r=u(s.matches[0].replace(wt,Tt),xt.test(o[0].type)&&c(t.parentNode)||t))){if(o.splice(i,1),e=r.length&&p(o),!e)return K.apply(n,r),n;break}}return(l||E(e,f))(r,t,!O,n,xt.test(e)&&c(t.parentNode)||t),n},w.sortStable=W.split("").sort(U).join("")===W,w.detectDuplicates=!!A,L(),w.sortDetached=i(function(e){return 1&e.compareDocumentPosition(q.createElement("div"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),w.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(tt,function(e,t,n){var r;return n?void 0:e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(e);Z.find=it,Z.expr=it.selectors,Z.expr[":"]=Z.expr.pseudos,Z.unique=it.uniqueSort,Z.text=it.getText,Z.isXMLDoc=it.isXML,Z.contains=it.contains;var ot=Z.expr.match.needsContext,st=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,at=/^.[^:#\[\.,]*$/;Z.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?Z.find.matchesSelector(r,e)?[r]:[]:Z.find.matches(e,Z.grep(t,function(e){return 1===e.nodeType}))},Z.fn.extend({find:function(e){var t,n=this.length,r=[],i=this;if("string"!=typeof e)return this.pushStack(Z(e).filter(function(){for(t=0;n>t;t++)if(Z.contains(i[t],this))return!0
}));for(t=0;n>t;t++)Z.find(e,i[t],r);return r=this.pushStack(n>1?Z.unique(r):r),r.selector=this.selector?this.selector+" "+e:e,r},filter:function(e){return this.pushStack(r(this,e||[],!1))},not:function(e){return this.pushStack(r(this,e||[],!0))},is:function(e){return!!r(this,"string"==typeof e&&ot.test(e)?Z(e):e||[],!1).length}});var ut,lt=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,ct=Z.fn.init=function(e,t){var n,r;if(!e)return this;if("string"==typeof e){if(n="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:lt.exec(e),!n||!n[1]&&t)return!t||t.jquery?(t||ut).find(e):this.constructor(t).find(e);if(n[1]){if(t=t instanceof Z?t[0]:t,Z.merge(this,Z.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:J,!0)),st.test(n[1])&&Z.isPlainObject(t))for(n in t)Z.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n]);return this}return r=J.getElementById(n[2]),r&&r.parentNode&&(this.length=1,this[0]=r),this.context=J,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):Z.isFunction(e)?"undefined"!=typeof ut.ready?ut.ready(e):e(Z):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),Z.makeArray(e,this))};ct.prototype=Z.fn,ut=Z(J);var ft=/^(?:parents|prev(?:Until|All))/,pt={children:!0,contents:!0,next:!0,prev:!0};Z.extend({dir:function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&Z(e).is(n))break;r.push(e)}return r},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}}),Z.fn.extend({has:function(e){var t=Z(e,this),n=t.length;return this.filter(function(){for(var e=0;n>e;e++)if(Z.contains(this,t[e]))return!0})},closest:function(e,t){for(var n,r=0,i=this.length,o=[],s=ot.test(e)||"string"!=typeof e?Z(e,t||this.context):0;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&Z.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?Z.unique(o):o)},index:function(e){return e?"string"==typeof e?U.call(Z(e),this[0]):U.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(Z.unique(Z.merge(this.get(),Z(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),Z.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return Z.dir(e,"parentNode")},parentsUntil:function(e,t,n){return Z.dir(e,"parentNode",n)},next:function(e){return i(e,"nextSibling")},prev:function(e){return i(e,"previousSibling")},nextAll:function(e){return Z.dir(e,"nextSibling")},prevAll:function(e){return Z.dir(e,"previousSibling")},nextUntil:function(e,t,n){return Z.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return Z.dir(e,"previousSibling",n)},siblings:function(e){return Z.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return Z.sibling(e.firstChild)},contents:function(e){return e.contentDocument||Z.merge([],e.childNodes)}},function(e,t){Z.fn[e]=function(n,r){var i=Z.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=Z.filter(r,i)),this.length>1&&(pt[e]||Z.unique(i),ft.test(e)&&i.reverse()),this.pushStack(i)}});var dt=/\S+/g,ht={};Z.Callbacks=function(e){e="string"==typeof e?ht[e]||o(e):Z.extend({},e);var t,n,r,i,s,a,u=[],l=!e.once&&[],c=function(o){for(t=e.memory&&o,n=!0,a=i||0,i=0,s=u.length,r=!0;u&&s>a;a++)if(u[a].apply(o[0],o[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,u&&(l?l.length&&c(l.shift()):t?u=[]:f.disable())},f={add:function(){if(u){var n=u.length;!function o(t){Z.each(t,function(t,n){var r=Z.type(n);"function"===r?e.unique&&f.has(n)||u.push(n):n&&n.length&&"string"!==r&&o(n)})}(arguments),r?s=u.length:t&&(i=n,c(t))}return this},remove:function(){return u&&Z.each(arguments,function(e,t){for(var n;(n=Z.inArray(t,u,n))>-1;)u.splice(n,1),r&&(s>=n&&s--,a>=n&&a--)}),this},has:function(e){return e?Z.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],s=0,this},disable:function(){return u=l=t=void 0,this},disabled:function(){return!u},lock:function(){return l=void 0,t||f.disable(),this},locked:function(){return!l},fireWith:function(e,t){return!u||n&&!l||(t=t||[],t=[e,t.slice?t.slice():t],r?l.push(t):c(t)),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!n}};return f},Z.extend({Deferred:function(e){var t=[["resolve","done",Z.Callbacks("once memory"),"resolved"],["reject","fail",Z.Callbacks("once memory"),"rejected"],["notify","progress",Z.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return Z.Deferred(function(n){Z.each(t,function(t,o){var s=Z.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&Z.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o[0]+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?Z.extend(e,r):r}},i={};return r.pipe=r.then,Z.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t,n,r,i=0,o=_.call(arguments),s=o.length,a=1!==s||e&&Z.isFunction(e.promise)?s:0,u=1===a?e:Z.Deferred(),l=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?_.call(arguments):i,r===t?u.notifyWith(n,r):--a||u.resolveWith(n,r)}};if(s>1)for(t=new Array(s),n=new Array(s),r=new Array(s);s>i;i++)o[i]&&Z.isFunction(o[i].promise)?o[i].promise().done(l(i,r,o)).fail(u.reject).progress(l(i,n,t)):--a;return a||u.resolveWith(r,o),u.promise()}});var gt;Z.fn.ready=function(e){return Z.ready.promise().done(e),this},Z.extend({isReady:!1,readyWait:1,holdReady:function(e){e?Z.readyWait++:Z.ready(!0)},ready:function(e){(e===!0?--Z.readyWait:Z.isReady)||(Z.isReady=!0,e!==!0&&--Z.readyWait>0||(gt.resolveWith(J,[Z]),Z.fn.triggerHandler&&(Z(J).triggerHandler("ready"),Z(J).off("ready"))))}}),Z.ready.promise=function(t){return gt||(gt=Z.Deferred(),"complete"===J.readyState?setTimeout(Z.ready):(J.addEventListener("DOMContentLoaded",s,!1),e.addEventListener("load",s,!1))),gt.promise(t)},Z.ready.promise();var mt=Z.access=function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===Z.type(n)){i=!0;for(a in n)Z.access(e,t,a,n[a],!0,o,s)}else if(void 0!==r&&(i=!0,Z.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(Z(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o};Z.acceptData=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType},a.uid=1,a.accepts=Z.acceptData,a.prototype={key:function(e){if(!a.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=a.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,Z.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(Z.isEmptyObject(o))Z.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return void 0===t?n:n[t]},access:function(e,t,n){var r;return void 0===t||t&&"string"==typeof t&&void 0===n?(r=this.get(e,t),void 0!==r?r:this.get(e,Z.camelCase(t))):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(void 0===t)this.cache[o]={};else{Z.isArray(t)?r=t.concat(t.map(Z.camelCase)):(i=Z.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(dt)||[])),n=r.length;for(;n--;)delete s[r[n]]}},hasData:function(e){return!Z.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}};var vt=new a,yt=new a,xt=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,bt=/([A-Z])/g;Z.extend({hasData:function(e){return yt.hasData(e)||vt.hasData(e)},data:function(e,t,n){return yt.access(e,t,n)},removeData:function(e,t){yt.remove(e,t)},_data:function(e,t,n){return vt.access(e,t,n)},_removeData:function(e,t){vt.remove(e,t)}}),Z.fn.extend({data:function(e,t){var n,r,i,o=this[0],s=o&&o.attributes;if(void 0===e){if(this.length&&(i=yt.get(o),1===o.nodeType&&!vt.get(o,"hasDataAttrs"))){for(n=s.length;n--;)s[n]&&(r=s[n].name,0===r.indexOf("data-")&&(r=Z.camelCase(r.slice(5)),u(o,r,i[r])));vt.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){yt.set(this,e)}):mt(this,function(t){var n,r=Z.camelCase(e);if(o&&void 0===t){if(n=yt.get(o,e),void 0!==n)return n;if(n=yt.get(o,r),void 0!==n)return n;if(n=u(o,r,void 0),void 0!==n)return n}else this.each(function(){var n=yt.get(this,r);yt.set(this,r,t),-1!==e.indexOf("-")&&void 0!==n&&yt.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){yt.remove(this,e)})}}),Z.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=vt.get(e,t),n&&(!r||Z.isArray(n)?r=vt.access(e,t,Z.makeArray(n)):r.push(n)),r||[]):void 0},dequeue:function(e,t){t=t||"fx";var n=Z.queue(e,t),r=n.length,i=n.shift(),o=Z._queueHooks(e,t),s=function(){Z.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return vt.get(e,n)||vt.access(e,n,{empty:Z.Callbacks("once memory").add(function(){vt.remove(e,[t+"queue",n])})})}}),Z.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?Z.queue(this[0],e):void 0===t?this:this.each(function(){var n=Z.queue(this,e,t);Z._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&Z.dequeue(this,e)})},dequeue:function(e){return this.each(function(){Z.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=Z.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)n=vt.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var wt=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Tt=["Top","Right","Bottom","Left"],Ct=function(e,t){return e=t||e,"none"===Z.css(e,"display")||!Z.contains(e.ownerDocument,e)},Nt=/^(?:checkbox|radio)$/i;!function(){var e=J.createDocumentFragment(),t=e.appendChild(J.createElement("div")),n=J.createElement("input");n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),Q.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",Q.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue}();var kt="undefined";Q.focusinBubbles="onfocusin"in e;var Et=/^key/,St=/^(?:mouse|pointer|contextmenu)|click/,Dt=/^(?:focusinfocus|focusoutblur)$/,jt=/^([^.]*)(?:\.(.+)|)$/;Z.event={global:{},add:function(e,t,n,r,i){var o,s,a,u,l,c,f,p,d,h,g,m=vt.get(e);if(m)for(n.handler&&(o=n,n=o.handler,i=o.selector),n.guid||(n.guid=Z.guid++),(u=m.events)||(u=m.events={}),(s=m.handle)||(s=m.handle=function(t){return typeof Z!==kt&&Z.event.triggered!==t.type?Z.event.dispatch.apply(e,arguments):void 0}),t=(t||"").match(dt)||[""],l=t.length;l--;)a=jt.exec(t[l])||[],d=g=a[1],h=(a[2]||"").split(".").sort(),d&&(f=Z.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=Z.event.special[d]||{},c=Z.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&Z.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||(p=u[d]=[],p.delegateCount=0,f.setup&&f.setup.call(e,r,h,s)!==!1||e.addEventListener&&e.addEventListener(d,s,!1)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),Z.event.global[d]=!0)},remove:function(e,t,n,r,i){var o,s,a,u,l,c,f,p,d,h,g,m=vt.hasData(e)&&vt.get(e);if(m&&(u=m.events)){for(t=(t||"").match(dt)||[""],l=t.length;l--;)if(a=jt.exec(t[l])||[],d=g=a[1],h=(a[2]||"").split(".").sort(),d){for(f=Z.event.special[d]||{},d=(r?f.delegateType:f.bindType)||d,p=u[d]||[],a=a[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=p.length;o--;)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));s&&!p.length&&(f.teardown&&f.teardown.call(e,h,m.handle)!==!1||Z.removeEvent(e,d,m.handle),delete u[d])}else for(d in u)Z.event.remove(e,d+t[l],n,r,!0);Z.isEmptyObject(u)&&(delete m.handle,vt.remove(e,"events"))}},trigger:function(t,n,r,i){var o,s,a,u,l,c,f,p=[r||J],d=G.call(t,"type")?t.type:t,h=G.call(t,"namespace")?t.namespace.split("."):[];if(s=a=r=r||J,3!==r.nodeType&&8!==r.nodeType&&!Dt.test(d+Z.event.triggered)&&(d.indexOf(".")>=0&&(h=d.split("."),d=h.shift(),h.sort()),l=d.indexOf(":")<0&&"on"+d,t=t[Z.expando]?t:new Z.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=h.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=r),n=null==n?[t]:Z.makeArray(n,[t]),f=Z.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!Z.isWindow(r)){for(u=f.delegateType||d,Dt.test(u+d)||(s=s.parentNode);s;s=s.parentNode)p.push(s),a=s;a===(r.ownerDocument||J)&&p.push(a.defaultView||a.parentWindow||e)}for(o=0;(s=p[o++])&&!t.isPropagationStopped();)t.type=o>1?u:f.bindType||d,c=(vt.get(s,"events")||{})[t.type]&&vt.get(s,"handle"),c&&c.apply(s,n),c=l&&s[l],c&&c.apply&&Z.acceptData(s)&&(t.result=c.apply(s,n),t.result===!1&&t.preventDefault());return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(p.pop(),n)!==!1||!Z.acceptData(r)||l&&Z.isFunction(r[d])&&!Z.isWindow(r)&&(a=r[l],a&&(r[l]=null),Z.event.triggered=d,r[d](),Z.event.triggered=void 0,a&&(r[l]=a)),t.result}},dispatch:function(e){e=Z.event.fix(e);var t,n,r,i,o,s=[],a=_.call(arguments),u=(vt.get(this,"events")||{})[e.type]||[],l=Z.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){for(s=Z.event.handlers.call(this,e,u),t=0;(i=s[t++])&&!e.isPropagationStopped();)for(e.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((Z.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),void 0!==r&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()));return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",void 0===r[i]&&(r[i]=o.needsContext?Z(i,this).index(u)>=0:Z.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return a<t.length&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,o=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||J,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0),e}},fix:function(e){if(e[Z.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];for(s||(this.fixHooks[i]=s=St.test(i)?this.mouseHooks:Et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new Z.Event(o),t=r.length;t--;)n=r[t],e[n]=o[n];return e.target||(e.target=J),3===e.target.nodeType&&(e.target=e.target.parentNode),s.filter?s.filter(e,o):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==f()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===f()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&Z.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(e){return Z.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=Z.extend(new Z.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?Z.event.trigger(i,null,t):Z.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},Z.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},Z.Event=function(e,t){return this instanceof Z.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?l:c):this.type=e,t&&Z.extend(this,t),this.timeStamp=e&&e.timeStamp||Z.now(),void(this[Z.expando]=!0)):new Z.Event(e,t)},Z.Event.prototype={isDefaultPrevented:c,isPropagationStopped:c,isImmediatePropagationStopped:c,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=l,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=l,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=l,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}},Z.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){Z.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!Z.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),Q.focusinBubbles||Z.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){Z.event.simulate(t,e.target,Z.event.fix(e),!0)};Z.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=vt.access(r,t);i||r.addEventListener(e,n,!0),vt.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=vt.access(r,t)-1;i?vt.access(r,t,i):(r.removeEventListener(e,n,!0),vt.remove(r,t))}}}),Z.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=void 0);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=void 0):null==r&&("string"==typeof t?(r=n,n=void 0):(r=n,n=t,t=void 0)),r===!1)r=c;else if(!r)return this;return 1===i&&(o=r,r=function(e){return Z().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=Z.guid++)),this.each(function(){Z.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,Z(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=void 0),n===!1&&(n=c),this.each(function(){Z.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){Z.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?Z.event.trigger(e,t,n,!0):void 0}});var At=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Lt=/<([\w:]+)/,qt=/<|&#?\w+;/,Ht=/<(?:script|style|link)/i,Ot=/checked\s*(?:[^=]|=\s*.checked.)/i,Ft=/^$|\/(?:java|ecma)script/i,Pt=/^true\/(.*)/,Rt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Mt={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Mt.optgroup=Mt.option,Mt.tbody=Mt.tfoot=Mt.colgroup=Mt.caption=Mt.thead,Mt.th=Mt.td,Z.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=Z.contains(e.ownerDocument,e);if(!(Q.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||Z.isXMLDoc(e)))for(s=v(a),o=v(e),r=0,i=o.length;i>r;r++)y(o[r],s[r]);if(t)if(n)for(o=o||v(e),s=s||v(a),r=0,i=o.length;i>r;r++)m(o[r],s[r]);else m(e,a);return s=v(a,"script"),s.length>0&&g(s,!u&&v(e,"script")),a},buildFragment:function(e,t,n,r){for(var i,o,s,a,u,l,c=t.createDocumentFragment(),f=[],p=0,d=e.length;d>p;p++)if(i=e[p],i||0===i)if("object"===Z.type(i))Z.merge(f,i.nodeType?[i]:i);else if(qt.test(i)){for(o=o||c.appendChild(t.createElement("div")),s=(Lt.exec(i)||["",""])[1].toLowerCase(),a=Mt[s]||Mt._default,o.innerHTML=a[1]+i.replace(At,"<$1></$2>")+a[2],l=a[0];l--;)o=o.lastChild;Z.merge(f,o.childNodes),o=c.firstChild,o.textContent=""}else f.push(t.createTextNode(i));for(c.textContent="",p=0;i=f[p++];)if((!r||-1===Z.inArray(i,r))&&(u=Z.contains(i.ownerDocument,i),o=v(c.appendChild(i),"script"),u&&g(o),n))for(l=0;i=o[l++];)Ft.test(i.type||"")&&n.push(i);return c},cleanData:function(e){for(var t,n,r,i,o=Z.event.special,s=0;void 0!==(n=e[s]);s++){if(Z.acceptData(n)&&(i=n[vt.expando],i&&(t=vt.cache[i]))){if(t.events)for(r in t.events)o[r]?Z.event.remove(n,r):Z.removeEvent(n,r,t.handle);vt.cache[i]&&delete vt.cache[i]}delete yt.cache[n[yt.expando]]}}}),Z.fn.extend({text:function(e){return mt(this,function(e){return void 0===e?Z.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=e)})},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=e?Z.filter(e,this):this,i=0;null!=(n=r[i]);i++)t||1!==n.nodeType||Z.cleanData(v(n)),n.parentNode&&(t&&Z.contains(n.ownerDocument,n)&&g(v(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(Z.cleanData(v(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return Z.clone(this,e,t)})},html:function(e){return mt(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ht.test(e)&&!Mt[(Lt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(At,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(Z.cleanData(v(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=arguments[0];return this.domManip(arguments,function(t){e=this.parentNode,Z.cleanData(v(this)),e&&e.replaceChild(t,this)}),e&&(e.length||e.nodeType)?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t){e=z.apply([],e);var n,r,i,o,s,a,u=0,l=this.length,c=this,f=l-1,p=e[0],g=Z.isFunction(p);if(g||l>1&&"string"==typeof p&&!Q.checkClone&&Ot.test(p))return this.each(function(n){var r=c.eq(n);g&&(e[0]=p.call(this,n,r.html())),r.domManip(e,t)});if(l&&(n=Z.buildFragment(e,this[0].ownerDocument,!1,this),r=n.firstChild,1===n.childNodes.length&&(n=r),r)){for(i=Z.map(v(n,"script"),d),o=i.length;l>u;u++)s=n,u!==f&&(s=Z.clone(s,!0,!0),o&&Z.merge(i,v(s,"script"))),t.call(this[u],s,u);if(o)for(a=i[i.length-1].ownerDocument,Z.map(i,h),u=0;o>u;u++)s=i[u],Ft.test(s.type||"")&&!vt.access(s,"globalEval")&&Z.contains(a,s)&&(s.src?Z._evalUrl&&Z._evalUrl(s.src):Z.globalEval(s.textContent.replace(Rt,"")))}return this}}),Z.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){Z.fn[e]=function(e){for(var n,r=[],i=Z(e),o=i.length-1,s=0;o>=s;s++)n=s===o?this:this.clone(!0),Z(i[s])[t](n),X.apply(r,n.get());return this.pushStack(r)}});var Wt,$t={},It=/^margin/,Bt=new RegExp("^("+wt+")(?!px)[a-z%]+$","i"),_t=function(t){return t.ownerDocument.defaultView.opener?t.ownerDocument.defaultView.getComputedStyle(t,null):e.getComputedStyle(t,null)};!function(){function t(){s.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",s.innerHTML="",i.appendChild(o);var t=e.getComputedStyle(s,null);n="1%"!==t.top,r="4px"===t.width,i.removeChild(o)}var n,r,i=J.documentElement,o=J.createElement("div"),s=J.createElement("div");s.style&&(s.style.backgroundClip="content-box",s.cloneNode(!0).style.backgroundClip="",Q.clearCloneStyle="content-box"===s.style.backgroundClip,o.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",o.appendChild(s),e.getComputedStyle&&Z.extend(Q,{pixelPosition:function(){return t(),n},boxSizingReliable:function(){return null==r&&t(),r},reliableMarginRight:function(){var t,n=s.appendChild(J.createElement("div"));return n.style.cssText=s.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",n.style.marginRight=n.style.width="0",s.style.width="1px",i.appendChild(o),t=!parseFloat(e.getComputedStyle(n,null).marginRight),i.removeChild(o),s.removeChild(n),t}}))}(),Z.swap=function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i};var zt=/^(none|table(?!-c[ea]).+)/,Xt=new RegExp("^("+wt+")(.*)$","i"),Ut=new RegExp("^([+-])=("+wt+")","i"),Vt={position:"absolute",visibility:"hidden",display:"block"},Yt={letterSpacing:"0",fontWeight:"400"},Gt=["Webkit","O","Moz","ms"];Z.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=w(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=Z.camelCase(t),u=e.style;return t=Z.cssProps[a]||(Z.cssProps[a]=C(u,a)),s=Z.cssHooks[t]||Z.cssHooks[a],void 0===n?s&&"get"in s&&void 0!==(i=s.get(e,!1,r))?i:u[t]:(o=typeof n,"string"===o&&(i=Ut.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(Z.css(e,t)),o="number"),null!=n&&n===n&&("number"!==o||Z.cssNumber[a]||(n+="px"),Q.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,r))||(u[t]=n)),void 0)}},css:function(e,t,n,r){var i,o,s,a=Z.camelCase(t);return t=Z.cssProps[a]||(Z.cssProps[a]=C(e.style,a)),s=Z.cssHooks[t]||Z.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),void 0===i&&(i=w(e,t,r)),"normal"===i&&t in Yt&&(i=Yt[t]),""===n||n?(o=parseFloat(i),n===!0||Z.isNumeric(o)?o||0:i):i}}),Z.each(["height","width"],function(e,t){Z.cssHooks[t]={get:function(e,n,r){return n?zt.test(Z.css(e,"display"))&&0===e.offsetWidth?Z.swap(e,Vt,function(){return E(e,t,r)}):E(e,t,r):void 0},set:function(e,n,r){var i=r&&_t(e);return N(e,n,r?k(e,t,r,"border-box"===Z.css(e,"boxSizing",!1,i),i):0)}}}),Z.cssHooks.marginRight=T(Q.reliableMarginRight,function(e,t){return t?Z.swap(e,{display:"inline-block"},w,[e,"marginRight"]):void 0}),Z.each({margin:"",padding:"",border:"Width"},function(e,t){Z.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[e+Tt[r]+t]=o[r]||o[r-2]||o[0];return i}},It.test(e)||(Z.cssHooks[e+t].set=N)}),Z.fn.extend({css:function(e,t){return mt(this,function(e,t,n){var r,i,o={},s=0;if(Z.isArray(t)){for(r=_t(e),i=t.length;i>s;s++)o[t[s]]=Z.css(e,t[s],!1,r);return o}return void 0!==n?Z.style(e,t,n):Z.css(e,t)},e,t,arguments.length>1)},show:function(){return S(this,!0)},hide:function(){return S(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Ct(this)?Z(this).show():Z(this).hide()})}}),Z.Tween=D,D.prototype={constructor:D,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(Z.cssNumber[n]?"":"px")},cur:function(){var e=D.propHooks[this.prop];return e&&e.get?e.get(this):D.propHooks._default.get(this)},run:function(e){var t,n=D.propHooks[this.prop];return this.pos=t=this.options.duration?Z.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):D.propHooks._default.set(this),this}},D.prototype.init.prototype=D.prototype,D.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=Z.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){Z.fx.step[e.prop]?Z.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[Z.cssProps[e.prop]]||Z.cssHooks[e.prop])?Z.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},D.propHooks.scrollTop=D.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},Z.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},Z.fx=D.prototype.init,Z.fx.step={};var Qt,Jt,Kt=/^(?:toggle|show|hide)$/,Zt=new RegExp("^(?:([+-])=|)("+wt+")([a-z%]*)$","i"),en=/queueHooks$/,tn=[q],nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Zt.exec(t),o=i&&i[3]||(Z.cssNumber[e]?"":"px"),s=(Z.cssNumber[e]||"px"!==o&&+r)&&Zt.exec(Z.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,Z.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};Z.Animation=Z.extend(O,{tweener:function(e,t){Z.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],nn[n]=nn[n]||[],nn[n].unshift(t)},prefilter:function(e,t){t?tn.unshift(e):tn.push(e)}}),Z.speed=function(e,t,n){var r=e&&"object"==typeof e?Z.extend({},e):{complete:n||!n&&t||Z.isFunction(e)&&e,duration:e,easing:n&&t||t&&!Z.isFunction(t)&&t};return r.duration=Z.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in Z.fx.speeds?Z.fx.speeds[r.duration]:Z.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){Z.isFunction(r.old)&&r.old.call(this),r.queue&&Z.dequeue(this,r.queue)},r},Z.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Ct).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=Z.isEmptyObject(e),o=Z.speed(t,n,r),s=function(){var t=O(this,Z.extend({},e),o);(i||vt.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=Z.timers,s=vt.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&en.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&Z.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=vt.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=Z.timers,s=r?r.length:0;for(n.finish=!0,Z.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);
delete n.finish})}}),Z.each(["toggle","show","hide"],function(e,t){var n=Z.fn[t];Z.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(A(t,!0),e,r,i)}}),Z.each({slideDown:A("show"),slideUp:A("hide"),slideToggle:A("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){Z.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),Z.timers=[],Z.fx.tick=function(){var e,t=0,n=Z.timers;for(Qt=Z.now();t<n.length;t++)e=n[t],e()||n[t]!==e||n.splice(t--,1);n.length||Z.fx.stop(),Qt=void 0},Z.fx.timer=function(e){Z.timers.push(e),e()?Z.fx.start():Z.timers.pop()},Z.fx.interval=13,Z.fx.start=function(){Jt||(Jt=setInterval(Z.fx.tick,Z.fx.interval))},Z.fx.stop=function(){clearInterval(Jt),Jt=null},Z.fx.speeds={slow:600,fast:200,_default:400},Z.fn.delay=function(e,t){return e=Z.fx?Z.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},function(){var e=J.createElement("input"),t=J.createElement("select"),n=t.appendChild(J.createElement("option"));e.type="checkbox",Q.checkOn=""!==e.value,Q.optSelected=n.selected,t.disabled=!0,Q.optDisabled=!n.disabled,e=J.createElement("input"),e.value="t",e.type="radio",Q.radioValue="t"===e.value}();var rn,on,sn=Z.expr.attrHandle;Z.fn.extend({attr:function(e,t){return mt(this,Z.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){Z.removeAttr(this,e)})}}),Z.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(e&&3!==o&&8!==o&&2!==o)return typeof e.getAttribute===kt?Z.prop(e,t,n):(1===o&&Z.isXMLDoc(e)||(t=t.toLowerCase(),r=Z.attrHooks[t]||(Z.expr.match.bool.test(t)?on:rn)),void 0===n?r&&"get"in r&&null!==(i=r.get(e,t))?i:(i=Z.find.attr(e,t),null==i?void 0:i):null!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:(e.setAttribute(t,n+""),n):void Z.removeAttr(e,t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(dt);if(o&&1===e.nodeType)for(;n=o[i++];)r=Z.propFix[n]||n,Z.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!Q.radioValue&&"radio"===t&&Z.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}}}),on={set:function(e,t,n){return t===!1?Z.removeAttr(e,n):e.setAttribute(n,n),n}},Z.each(Z.expr.match.bool.source.match(/\w+/g),function(e,t){var n=sn[t]||Z.find.attr;sn[t]=function(e,t,r){var i,o;return r||(o=sn[t],sn[t]=i,i=null!=n(e,t,r)?t.toLowerCase():null,sn[t]=o),i}});var an=/^(?:input|select|textarea|button)$/i;Z.fn.extend({prop:function(e,t){return mt(this,Z.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[Z.propFix[e]||e]})}}),Z.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!Z.isXMLDoc(e),o&&(t=Z.propFix[t]||t,i=Z.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||an.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),Q.optSelected||(Z.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),Z.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){Z.propFix[this.toLowerCase()]=this});var un=/[\t\r\n\f]/g;Z.fn.extend({addClass:function(e){var t,n,r,i,o,s,a="string"==typeof e&&e,u=0,l=this.length;if(Z.isFunction(e))return this.each(function(t){Z(this).addClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(dt)||[];l>u;u++)if(n=this[u],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(un," "):" ")){for(o=0;i=t[o++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");s=Z.trim(r),n.className!==s&&(n.className=s)}return this},removeClass:function(e){var t,n,r,i,o,s,a=0===arguments.length||"string"==typeof e&&e,u=0,l=this.length;if(Z.isFunction(e))return this.each(function(t){Z(this).removeClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(dt)||[];l>u;u++)if(n=this[u],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(un," "):"")){for(o=0;i=t[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");s=e?Z.trim(r):"",n.className!==s&&(n.className=s)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):this.each(Z.isFunction(e)?function(n){Z(this).toggleClass(e.call(this,n,this.className,t),t)}:function(){if("string"===n)for(var t,r=0,i=Z(this),o=e.match(dt)||[];t=o[r++];)i.hasClass(t)?i.removeClass(t):i.addClass(t);else(n===kt||"boolean"===n)&&(this.className&&vt.set(this,"__className__",this.className),this.className=this.className||e===!1?"":vt.get(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(un," ").indexOf(t)>=0)return!0;return!1}});var ln=/\r/g;Z.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=Z.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,Z(this).val()):e,null==i?i="":"number"==typeof i?i+="":Z.isArray(i)&&(i=Z.map(i,function(e){return null==e?"":e+""})),t=Z.valHooks[this.type]||Z.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return t=Z.valHooks[i.type]||Z.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(ln,""):null==n?"":n)}}}),Z.extend({valHooks:{option:{get:function(e){var t=Z.find.attr(e,"value");return null!=t?t:Z.trim(Z.text(e))}},select:{get:function(e){for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(Q.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&Z.nodeName(n.parentNode,"optgroup"))){if(t=Z(n).val(),o)return t;s.push(t)}return s},set:function(e,t){for(var n,r,i=e.options,o=Z.makeArray(t),s=i.length;s--;)r=i[s],(r.selected=Z.inArray(r.value,o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),Z.each(["radio","checkbox"],function(){Z.valHooks[this]={set:function(e,t){return Z.isArray(t)?e.checked=Z.inArray(Z(e).val(),t)>=0:void 0}},Q.checkOn||(Z.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){Z.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),Z.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var cn=Z.now(),fn=/\?/;Z.parseJSON=function(e){return JSON.parse(e+"")},Z.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=void 0}return(!t||t.getElementsByTagName("parsererror").length)&&Z.error("Invalid XML: "+e),t};var pn=/#.*$/,dn=/([?&])_=[^&]*/,hn=/^(.*?):[ \t]*([^\r\n]*)$/gm,gn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,mn=/^(?:GET|HEAD)$/,vn=/^\/\//,yn=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,xn={},bn={},wn="*/".concat("*"),Tn=e.location.href,Cn=yn.exec(Tn.toLowerCase())||[];Z.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Tn,type:"GET",isLocal:gn.test(Cn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":wn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":Z.parseJSON,"text xml":Z.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?R(R(e,Z.ajaxSettings),t):R(Z.ajaxSettings,e)},ajaxPrefilter:F(xn),ajaxTransport:F(bn),ajax:function(e,t){function n(e,t,n,s){var u,c,v,y,b,T=t;2!==x&&(x=2,a&&clearTimeout(a),r=void 0,o=s||"",w.readyState=e>0?4:0,u=e>=200&&300>e||304===e,n&&(y=M(f,w,n)),y=W(f,y,w,u),u?(f.ifModified&&(b=w.getResponseHeader("Last-Modified"),b&&(Z.lastModified[i]=b),b=w.getResponseHeader("etag"),b&&(Z.etag[i]=b)),204===e||"HEAD"===f.type?T="nocontent":304===e?T="notmodified":(T=y.state,c=y.data,v=y.error,u=!v)):(v=T,(e||!T)&&(T="error",0>e&&(e=0))),w.status=e,w.statusText=(t||T)+"",u?h.resolveWith(p,[c,T,w]):h.rejectWith(p,[w,T,v]),w.statusCode(m),m=void 0,l&&d.trigger(u?"ajaxSuccess":"ajaxError",[w,f,u?c:v]),g.fireWith(p,[w,T]),l&&(d.trigger("ajaxComplete",[w,f]),--Z.active||Z.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=void 0),t=t||{};var r,i,o,s,a,u,l,c,f=Z.ajaxSetup({},t),p=f.context||f,d=f.context&&(p.nodeType||p.jquery)?Z(p):Z.event,h=Z.Deferred(),g=Z.Callbacks("once memory"),m=f.statusCode||{},v={},y={},x=0,b="canceled",w={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!s)for(s={};t=hn.exec(o);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?o:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=y[n]=y[n]||e,v[e]=t),this},overrideMimeType:function(e){return x||(f.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else w.always(e[w.status]);return this},abort:function(e){var t=e||b;return r&&r.abort(t),n(0,t),this}};if(h.promise(w).complete=g.add,w.success=w.done,w.error=w.fail,f.url=((e||f.url||Tn)+"").replace(pn,"").replace(vn,Cn[1]+"//"),f.type=t.method||t.type||f.method||f.type,f.dataTypes=Z.trim(f.dataType||"*").toLowerCase().match(dt)||[""],null==f.crossDomain&&(u=yn.exec(f.url.toLowerCase()),f.crossDomain=!(!u||u[1]===Cn[1]&&u[2]===Cn[2]&&(u[3]||("http:"===u[1]?"80":"443"))===(Cn[3]||("http:"===Cn[1]?"80":"443")))),f.data&&f.processData&&"string"!=typeof f.data&&(f.data=Z.param(f.data,f.traditional)),P(xn,f,t,w),2===x)return w;l=Z.event&&f.global,l&&0===Z.active++&&Z.event.trigger("ajaxStart"),f.type=f.type.toUpperCase(),f.hasContent=!mn.test(f.type),i=f.url,f.hasContent||(f.data&&(i=f.url+=(fn.test(i)?"&":"?")+f.data,delete f.data),f.cache===!1&&(f.url=dn.test(i)?i.replace(dn,"$1_="+cn++):i+(fn.test(i)?"&":"?")+"_="+cn++)),f.ifModified&&(Z.lastModified[i]&&w.setRequestHeader("If-Modified-Since",Z.lastModified[i]),Z.etag[i]&&w.setRequestHeader("If-None-Match",Z.etag[i])),(f.data&&f.hasContent&&f.contentType!==!1||t.contentType)&&w.setRequestHeader("Content-Type",f.contentType),w.setRequestHeader("Accept",f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+("*"!==f.dataTypes[0]?", "+wn+"; q=0.01":""):f.accepts["*"]);for(c in f.headers)w.setRequestHeader(c,f.headers[c]);if(f.beforeSend&&(f.beforeSend.call(p,w,f)===!1||2===x))return w.abort();b="abort";for(c in{success:1,error:1,complete:1})w[c](f[c]);if(r=P(bn,f,t,w)){w.readyState=1,l&&d.trigger("ajaxSend",[w,f]),f.async&&f.timeout>0&&(a=setTimeout(function(){w.abort("timeout")},f.timeout));try{x=1,r.send(v,n)}catch(T){if(!(2>x))throw T;n(-1,T)}}else n(-1,"No Transport");return w},getJSON:function(e,t,n){return Z.get(e,t,n,"json")},getScript:function(e,t){return Z.get(e,void 0,t,"script")}}),Z.each(["get","post"],function(e,t){Z[t]=function(e,n,r,i){return Z.isFunction(n)&&(i=i||r,r=n,n=void 0),Z.ajax({url:e,type:t,dataType:i,data:n,success:r})}}),Z._evalUrl=function(e){return Z.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},Z.fn.extend({wrapAll:function(e){var t;return Z.isFunction(e)?this.each(function(t){Z(this).wrapAll(e.call(this,t))}):(this[0]&&(t=Z(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return this.each(Z.isFunction(e)?function(t){Z(this).wrapInner(e.call(this,t))}:function(){var t=Z(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=Z.isFunction(e);return this.each(function(n){Z(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){Z.nodeName(this,"body")||Z(this).replaceWith(this.childNodes)}).end()}}),Z.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0},Z.expr.filters.visible=function(e){return!Z.expr.filters.hidden(e)};var Nn=/%20/g,kn=/\[\]$/,En=/\r?\n/g,Sn=/^(?:submit|button|image|reset|file)$/i,Dn=/^(?:input|select|textarea|keygen)/i;Z.param=function(e,t){var n,r=[],i=function(e,t){t=Z.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(void 0===t&&(t=Z.ajaxSettings&&Z.ajaxSettings.traditional),Z.isArray(e)||e.jquery&&!Z.isPlainObject(e))Z.each(e,function(){i(this.name,this.value)});else for(n in e)$(n,e[n],t,i);return r.join("&").replace(Nn,"+")},Z.fn.extend({serialize:function(){return Z.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=Z.prop(this,"elements");return e?Z.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!Z(this).is(":disabled")&&Dn.test(this.nodeName)&&!Sn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=Z(this).val();return null==n?null:Z.isArray(n)?Z.map(n,function(e){return{name:t.name,value:e.replace(En,"\r\n")}}):{name:t.name,value:n.replace(En,"\r\n")}}).get()}}),Z.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var jn=0,An={},Ln={0:200,1223:204},qn=Z.ajaxSettings.xhr();e.attachEvent&&e.attachEvent("onunload",function(){for(var e in An)An[e]()}),Q.cors=!!qn&&"withCredentials"in qn,Q.ajax=qn=!!qn,Z.ajaxTransport(function(e){var t;return Q.cors||qn&&!e.crossDomain?{send:function(n,r){var i,o=e.xhr(),s=++jn;if(o.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)o[i]=e.xhrFields[i];e.mimeType&&o.overrideMimeType&&o.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)o.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete An[s],t=o.onload=o.onerror=null,"abort"===e?o.abort():"error"===e?r(o.status,o.statusText):r(Ln[o.status]||o.status,o.statusText,"string"==typeof o.responseText?{text:o.responseText}:void 0,o.getAllResponseHeaders()))}},o.onload=t(),o.onerror=t("error"),t=An[s]=t("abort");try{o.send(e.hasContent&&e.data||null)}catch(a){if(t)throw a}},abort:function(){t&&t()}}:void 0}),Z.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return Z.globalEval(e),e}}}),Z.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),Z.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=Z("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),J.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Hn=[],On=/(=)\?(?=&|$)|\?\?/;Z.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Hn.pop()||Z.expando+"_"+cn++;return this[e]=!0,e}}),Z.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(On.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&On.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=Z.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(On,"$1"+i):t.jsonp!==!1&&(t.url+=(fn.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||Z.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,Hn.push(i)),s&&Z.isFunction(o)&&o(s[0]),s=o=void 0}),"script"):void 0}),Z.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||J;var r=st.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=Z.buildFragment([e],t,i),i&&i.length&&Z(i).remove(),Z.merge([],r.childNodes))};var Fn=Z.fn.load;Z.fn.load=function(e,t,n){if("string"!=typeof e&&Fn)return Fn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=Z.trim(e.slice(a)),e=e.slice(0,a)),Z.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),s.length>0&&Z.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?Z("<div>").append(Z.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},Z.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){Z.fn[t]=function(e){return this.on(t,e)}}),Z.expr.filters.animated=function(e){return Z.grep(Z.timers,function(t){return e===t.elem}).length};var Pn=e.document.documentElement;Z.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=Z.css(e,"position"),f=Z(e),p={};"static"===c&&(e.style.position="relative"),a=f.offset(),o=Z.css(e,"top"),u=Z.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=f.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),Z.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(p.top=t.top-a.top+s),null!=t.left&&(p.left=t.left-a.left+i),"using"in t?t.using.call(e,p):f.css(p)}},Z.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){Z.offset.setOffset(this,e,t)});var t,n,r=this[0],i={top:0,left:0},o=r&&r.ownerDocument;if(o)return t=o.documentElement,Z.contains(t,r)?(typeof r.getBoundingClientRect!==kt&&(i=r.getBoundingClientRect()),n=I(o),{top:i.top+n.pageYOffset-t.clientTop,left:i.left+n.pageXOffset-t.clientLeft}):i},position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===Z.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),Z.nodeName(e[0],"html")||(r=e.offset()),r.top+=Z.css(e[0],"borderTopWidth",!0),r.left+=Z.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-Z.css(n,"marginTop",!0),left:t.left-r.left-Z.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||Pn;e&&!Z.nodeName(e,"html")&&"static"===Z.css(e,"position");)e=e.offsetParent;return e||Pn})}}),Z.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;Z.fn[t]=function(i){return mt(this,function(t,i,o){var s=I(t);return void 0===o?s?s[n]:t[i]:void(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o)},t,i,arguments.length,null)}}),Z.each(["top","left"],function(e,t){Z.cssHooks[t]=T(Q.pixelPosition,function(e,n){return n?(n=w(e,t),Bt.test(n)?Z(e).position()[t]+"px":n):void 0})}),Z.each({Height:"height",Width:"width"},function(e,t){Z.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){Z.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return mt(this,function(t,n,r){var i;return Z.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):void 0===r?Z.css(t,n,s):Z.style(t,n,r,s)},t,o?r:void 0,o,null)}})}),Z.fn.size=function(){return this.length},Z.fn.andSelf=Z.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return Z});var Rn=e.jQuery,Mn=e.$;return Z.noConflict=function(t){return e.$===Z&&(e.$=Mn),t&&e.jQuery===Z&&(e.jQuery=Rn),Z},typeof t===kt&&(e.jQuery=e.$=Z),Z});
!function(t,e,n){"use strict";function r(t){return function(){var e,n,r=arguments[0],i="["+(t?t+":":"")+r+"] ",o=arguments[1],a=arguments,s=function(t){return"function"==typeof t?t.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof t?"undefined":"string"!=typeof t?JSON.stringify(t):t};for(e=i+o.replace(/\{\d+\}/g,function(t){var e,n=+t.slice(1,-1);return n+2<a.length?(e=a[n+2],"function"==typeof e?e.toString().replace(/ ?\{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?L(e):e):t}),e=e+"\nhttp://errors.angularjs.org/1.2.28/"+(t?t+"/":"")+r,n=2;n<arguments.length;n++)e=e+(2==n?"?":"&")+"p"+(n-2)+"="+encodeURIComponent(s(arguments[n]));return new Error(e)}}function i(t){if(null==t||k(t))return!1;var e=t.length;return 1===t.nodeType&&e?!0:w(t)||Nr(t)||0===e||"number"==typeof e&&e>0&&e-1 in t}function o(t,e,n){var r;if(t)if(S(t))for(r in t)"prototype"==r||"length"==r||"name"==r||t.hasOwnProperty&&!t.hasOwnProperty(r)||e.call(n,t[r],r);else if(Nr(t)||i(t))for(r=0;r<t.length;r++)e.call(n,t[r],r);else if(t.forEach&&t.forEach!==o)t.forEach(e,n);else for(r in t)t.hasOwnProperty(r)&&e.call(n,t[r],r);return t}function a(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);return e.sort()}function s(t,e,n){for(var r=a(t),i=0;i<r.length;i++)e.call(n,t[r[i]],r[i]);return r}function u(t){return function(e,n){t(n,e)}}function c(){for(var t,e=Mr.length;e;){if(e--,t=Mr[e].charCodeAt(0),57==t)return Mr[e]="A",Mr.join("");if(90!=t)return Mr[e]=String.fromCharCode(t+1),Mr.join("");Mr[e]="0"}return Mr.unshift("0"),Mr.join("")}function l(t,e){e?t.$$hashKey=e:delete t.$$hashKey}function f(t){var e=t.$$hashKey;return o(arguments,function(e){e!==t&&o(e,function(e,n){t[n]=e})}),l(t,e),t}function h(t){return parseInt(t,10)}function p(t,e){return f(new(f(function(){},{prototype:t})),e)}function $(){}function d(t){return t}function v(t){return function(){return t}}function g(t){return"undefined"==typeof t}function m(t){return"undefined"!=typeof t}function y(t){return null!=t&&"object"==typeof t}function w(t){return"string"==typeof t}function b(t){return"number"==typeof t}function x(t){return"[object Date]"===Ar.call(t)}function S(t){return"function"==typeof t}function C(t){return"[object RegExp]"===Ar.call(t)}function k(t){return t&&t.document&&t.location&&t.alert&&t.setInterval}function E(t){return t&&t.$evalAsync&&t.$watch}function A(t){return"[object File]"===Ar.call(t)}function O(t){return"[object Blob]"===Ar.call(t)}function T(t){return t&&S(t.then)}function M(t){return!(!t||!(t.nodeName||t.prop&&t.attr&&t.find))}function N(t,e,n){var r=[];return o(t,function(t,i,o){r.push(e.call(n,t,i,o))}),r}function P(t,e){return-1!=j(t,e)}function j(t,e){if(t.indexOf)return t.indexOf(e);for(var n=0;n<t.length;n++)if(e===t[n])return n;return-1}function D(t,e){var n=j(t,e);return n>=0&&t.splice(n,1),e}function R(t,e,n,r){if(k(t)||E(t))throw Or("cpws","Can't copy! Making copies of Window or Scope instances is not supported.");if(e){if(t===e)throw Or("cpi","Can't copy! Source and destination are identical.");if(n=n||[],r=r||[],y(t)){var i=j(n,t);if(-1!==i)return r[i];n.push(t),r.push(e)}var a;if(Nr(t)){e.length=0;for(var s=0;s<t.length;s++)a=R(t[s],null,n,r),y(t[s])&&(n.push(t[s]),r.push(a)),e.push(a)}else{var u=e.$$hashKey;Nr(e)?e.length=0:o(e,function(t,n){delete e[n]});for(var c in t)a=R(t[c],null,n,r),y(t[c])&&(n.push(t[c]),r.push(a)),e[c]=a;l(e,u)}}else e=t,t&&(Nr(t)?e=R(t,[],n,r):x(t)?e=new Date(t.getTime()):C(t)?(e=new RegExp(t.source,t.toString().match(/[^\/]*$/)[0]),e.lastIndex=t.lastIndex):y(t)&&(e=R(t,{},n,r)));return e}function _(t,e){if(Nr(t)){e=e||[];for(var n=0;n<t.length;n++)e[n]=t[n]}else if(y(t)){e=e||{};for(var r in t)!vr.call(t,r)||"$"===r.charAt(0)&&"$"===r.charAt(1)||(e[r]=t[r])}return e||t}function q(t,e){if(t===e)return!0;if(null===t||null===e)return!1;if(t!==t&&e!==e)return!0;var r,i,o,a=typeof t,s=typeof e;if(a==s&&"object"==a){if(!Nr(t)){if(x(t))return x(e)?isNaN(t.getTime())&&isNaN(e.getTime())||t.getTime()===e.getTime():!1;if(C(t)&&C(e))return t.toString()==e.toString();if(E(t)||E(e)||k(t)||k(e)||Nr(e))return!1;o={};for(i in t)if("$"!==i.charAt(0)&&!S(t[i])){if(!q(t[i],e[i]))return!1;o[i]=!0}for(i in e)if(!o.hasOwnProperty(i)&&"$"!==i.charAt(0)&&e[i]!==n&&!S(e[i]))return!1;return!0}if(!Nr(e))return!1;if((r=t.length)==e.length){for(i=0;r>i;i++)if(!q(t[i],e[i]))return!1;return!0}}return!1}function U(t,e,n){return t.concat(kr.call(e,n))}function V(t,e){return kr.call(t,e||0)}function I(t,e){var n=arguments.length>2?V(arguments,2):[];return!S(e)||e instanceof RegExp?e:n.length?function(){return arguments.length?e.apply(t,n.concat(kr.call(arguments,0))):e.apply(t,n)}:function(){return arguments.length?e.apply(t,arguments):e.call(t)}}function F(t,r){var i=r;return"string"==typeof t&&"$"===t.charAt(0)?i=n:k(r)?i="$WINDOW":r&&e===r?i="$DOCUMENT":E(r)&&(i="$SCOPE"),i}function L(t,e){return"undefined"==typeof t?n:JSON.stringify(t,F,e?"  ":null)}function H(t){return w(t)?JSON.parse(t):t}function B(t){if("function"==typeof t)t=!0;else if(t&&0!==t.length){var e=dr(""+t);t=!("f"==e||"0"==e||"false"==e||"no"==e||"n"==e||"[]"==e)}else t=!1;return t}function z(t){t=br(t).clone();try{t.empty()}catch(e){}var n=3,r=br("<div>").append(t).html();try{return t[0].nodeType===n?dr(r):r.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(t,e){return"<"+dr(e)})}catch(e){return dr(r)}}function W(t){try{return decodeURIComponent(t)}catch(e){}}function Q(t){var e,n,r={};return o((t||"").split("&"),function(t){if(t&&(e=t.replace(/\+/g,"%20").split("="),n=W(e[0]),m(n))){var i=m(e[1])?W(e[1]):!0;vr.call(r,n)?Nr(r[n])?r[n].push(i):r[n]=[r[n],i]:r[n]=i}}),r}function J(t){var e=[];return o(t,function(t,n){Nr(t)?o(t,function(t){e.push(X(n,!0)+(t===!0?"":"="+X(t,!0)))}):e.push(X(n,!0)+(t===!0?"":"="+X(t,!0)))}),e.length?e.join("&"):""}function G(t){return X(t,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function X(t,e){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,e?"%20":"+")}function K(t,n){function r(t){t&&s.push(t)}var i,a,s=[t],u=["ng:app","ng-app","x-ng-app","data-ng-app"],c=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;o(u,function(n){u[n]=!0,r(e.getElementById(n)),n=n.replace(":","\\:"),t.querySelectorAll&&(o(t.querySelectorAll("."+n),r),o(t.querySelectorAll("."+n+"\\:"),r),o(t.querySelectorAll("["+n+"]"),r))}),o(s,function(t){if(!i){var e=" "+t.className+" ",n=c.exec(e);n?(i=t,a=(n[2]||"").replace(/\s+/g,",")):o(t.attributes,function(e){!i&&u[e.name]&&(i=t,a=e.value)})}}),i&&n(i,a?[a]:[])}function Y(n,r){var i=function(){if(n=br(n),n.injector()){var t=n[0]===e?"document":z(n);throw Or("btstrpd","App Already Bootstrapped with this Element '{0}'",t.replace(/</,"&lt;").replace(/>/,"&gt;"))}r=r||[],r.unshift(["$provide",function(t){t.value("$rootElement",n)}]),r.unshift("ng");var i=je(r);return i.invoke(["$rootScope","$rootElement","$compile","$injector","$animate",function(t,e,n,r){t.$apply(function(){e.data("$injector",r),n(e)(t)})}]),i},a=/^NG_DEFER_BOOTSTRAP!/;return t&&!a.test(t.name)?i():(t.name=t.name.replace(a,""),void(Tr.resumeBootstrap=function(t){o(t,function(t){r.push(t)}),i()}))}function Z(t,e){return e=e||"_",t.replace(Dr,function(t,n){return(n?e:"")+t.toLowerCase()})}function te(){xr=t.jQuery,xr&&xr.fn.on?(br=xr,f(xr.fn,{scope:Jr.scope,isolateScope:Jr.isolateScope,controller:Jr.controller,injector:Jr.injector,inheritedData:Jr.inheritedData}),le("remove",!0,!0,!1),le("empty",!1,!1,!1),le("html",!1,!1,!0)):br=$e,Tr.element=br}function ee(t,e,n){if(!t)throw Or("areq","Argument '{0}' is {1}",e||"?",n||"required");return t}function ne(t,e,n){return n&&Nr(t)&&(t=t[t.length-1]),ee(S(t),e,"not a function, got "+(t&&"object"==typeof t?t.constructor.name||"Object":typeof t)),t}function re(t,e){if("hasOwnProperty"===t)throw Or("badname","hasOwnProperty is not a valid {0} name",e)}function ie(t,e,n){if(!e)return t;for(var r,i=e.split("."),o=t,a=i.length,s=0;a>s;s++)r=i[s],t&&(t=(o=t)[r]);return!n&&S(t)?I(o,t):t}function oe(t){var e=t[0],n=t[t.length-1];if(e===n)return br(e);var r=e,i=[r];do{if(r=r.nextSibling,!r)break;i.push(r)}while(r!==n);return br(i)}function ae(t){function e(t,e,n){return t[e]||(t[e]=n())}var n=r("$injector"),i=r("ng"),o=e(t,"angular",Object);return o.$$minErr=o.$$minErr||r,e(o,"module",function(){var t={};return function(r,o,a){var s=function(t,e){if("hasOwnProperty"===t)throw i("badname","hasOwnProperty is not a valid {0} name",e)};return s(r,"module"),o&&t.hasOwnProperty(r)&&(t[r]=null),e(t,r,function(){function t(t,n,r){return function(){return e[r||"push"]([t,n,arguments]),u}}if(!o)throw n("nomod","Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.",r);var e=[],i=[],s=t("$injector","invoke"),u={_invokeQueue:e,_runBlocks:i,requires:o,name:r,provider:t("$provide","provider"),factory:t("$provide","factory"),service:t("$provide","service"),value:t("$provide","value"),constant:t("$provide","constant","unshift"),animation:t("$animateProvider","register"),filter:t("$filterProvider","register"),controller:t("$controllerProvider","register"),directive:t("$compileProvider","directive"),config:s,run:function(t){return i.push(t),this}};return a&&s(a),u})}})}function se(e){f(e,{bootstrap:Y,copy:R,extend:f,equals:q,element:br,forEach:o,injector:je,noop:$,bind:I,toJson:L,fromJson:H,identity:d,isUndefined:g,isDefined:m,isString:w,isFunction:S,isObject:y,isNumber:b,isElement:M,isArray:Nr,version:Rr,isDate:x,lowercase:dr,uppercase:gr,callbacks:{counter:0},$$minErr:r,$$csp:jr}),Sr=ae(t);try{Sr("ngLocale")}catch(n){Sr("ngLocale",[]).provider("$locale",nn)}Sr("ng",["ngLocale"],["$provide",function(t){t.provider({$$sanitizeUri:Nn}),t.provider("$compile",Ie).directive({a:Pi,input:Hi,textarea:Hi,form:_i,script:Eo,select:To,style:No,option:Mo,ngBind:eo,ngBindHtml:ro,ngBindTemplate:no,ngClass:io,ngClassEven:ao,ngClassOdd:oo,ngCloak:so,ngController:uo,ngForm:qi,ngHide:wo,ngIf:fo,ngInclude:ho,ngInit:$o,ngNonBindable:vo,ngPluralize:go,ngRepeat:mo,ngShow:yo,ngStyle:bo,ngSwitch:xo,ngSwitchWhen:So,ngSwitchDefault:Co,ngOptions:Oo,ngTransclude:ko,ngModel:Gi,ngList:Yi,ngChange:Xi,required:Ki,ngRequired:Ki,ngValue:to}).directive({ngInclude:po}).directive(ji).directive(co),t.provider({$anchorScroll:De,$animate:ri,$browser:qe,$cacheFactory:Ue,$controller:He,$document:Be,$exceptionHandler:ze,$filter:Ln,$interpolate:tn,$interval:en,$http:Xe,$httpBackend:Ye,$location:vn,$log:gn,$parse:En,$rootScope:Mn,$q:An,$sce:_n,$sceDelegate:Rn,$sniffer:qn,$templateCache:Ve,$timeout:Un,$window:Fn,$$rAF:Tn,$$asyncCallback:Re})}])}function ue(){return++qr}function ce(t){return t.replace(Ir,function(t,e,n,r){return r?n.toUpperCase():n}).replace(Fr,"Moz$1")}function le(t,e,n,r){function i(t){var i,a,s,u,c,l,f,h=n&&t?[this.filter(t)]:[this],p=e;if(!r||null!=t)for(;h.length;)for(i=h.shift(),a=0,s=i.length;s>a;a++)for(u=br(i[a]),p?u.triggerHandler("$destroy"):p=!p,c=0,l=(f=u.children()).length;l>c;c++)h.push(xr(f[c]));return o.apply(this,arguments)}var o=xr.fn[t];o=o.$original||o,i.$original=o,xr.fn[t]=i}function fe(t){return!Br.test(t)}function he(t,e){var n,r,i,o,a,s,u=e.createDocumentFragment(),c=[];if(fe(t))c.push(e.createTextNode(t));else{for(n=u.appendChild(e.createElement("div")),r=(zr.exec(t)||["",""])[1].toLowerCase(),i=Qr[r]||Qr._default,n.innerHTML="<div>&#160;</div>"+i[1]+t.replace(Wr,"<$1></$2>")+i[2],n.removeChild(n.firstChild),o=i[0];o--;)n=n.lastChild;for(a=0,s=n.childNodes.length;s>a;++a)c.push(n.childNodes[a]);n=u.firstChild,n.textContent=""}return u.textContent="",u.innerHTML="",c}function pe(t,n){n=n||e;var r;return(r=Hr.exec(t))?[n.createElement(r[1])]:he(t,n)}function $e(t){if(t instanceof $e)return t;if(w(t)&&(t=Pr(t)),!(this instanceof $e)){if(w(t)&&"<"!=t.charAt(0))throw Lr("nosel","Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");return new $e(t)}if(w(t)){Ce(this,pe(t));var n=br(e.createDocumentFragment());n.append(this)}else Ce(this,t)}function de(t){return t.cloneNode(!0)}function ve(t){me(t);for(var e=0,n=t.childNodes||[];e<n.length;e++)ve(n[e])}function ge(t,e,n,r){if(m(r))throw Lr("offargs","jqLite#off() does not support the `selector` argument");var i=ye(t,"events"),a=ye(t,"handle");a&&(g(e)?o(i,function(e,n){Vr(t,n,e),delete i[n]}):o(e.split(" "),function(e){g(n)?(Vr(t,e,i[e]),delete i[e]):D(i[e]||[],n)}))}function me(t,e){var r=t.ng339,i=_r[r];if(i){if(e)return void delete _r[r].data[e];i.handle&&(i.events.$destroy&&i.handle({},"$destroy"),ge(t)),delete _r[r],t.ng339=n}}function ye(t,e,n){var r=t.ng339,i=_r[r||-1];return m(n)?(i||(t.ng339=r=ue(),i=_r[r]={}),void(i[e]=n)):i&&i[e]}function we(t,e,n){var r=ye(t,"data"),i=m(n),o=!i&&m(e),a=o&&!y(e);if(r||a||ye(t,"data",r={}),i)r[e]=n;else{if(!o)return r;if(a)return r&&r[e];f(r,e)}}function be(t,e){return t.getAttribute?(" "+(t.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+e+" ")>-1:!1}function xe(t,e){e&&t.setAttribute&&o(e.split(" "),function(e){t.setAttribute("class",Pr((" "+(t.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+Pr(e)+" "," ")))})}function Se(t,e){if(e&&t.setAttribute){var n=(" "+(t.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");o(e.split(" "),function(t){t=Pr(t),-1===n.indexOf(" "+t+" ")&&(n+=t+" ")}),t.setAttribute("class",Pr(n))}}function Ce(t,e){if(e){e=e.nodeName||!m(e.length)||k(e)?[e]:e;for(var n=0;n<e.length;n++)t.push(e[n])}}function ke(t,e){return Ee(t,"$"+(e||"ngController")+"Controller")}function Ee(t,e,r){9==t.nodeType&&(t=t.documentElement);for(var i=Nr(e)?e:[e];t;){for(var o=0,a=i.length;a>o;o++)if((r=br.data(t,i[o]))!==n)return r;t=t.parentNode||11===t.nodeType&&t.host}}function Ae(t){for(var e=0,n=t.childNodes;e<n.length;e++)ve(n[e]);for(;t.firstChild;)t.removeChild(t.firstChild)}function Oe(t,e){var n=Gr[e.toLowerCase()];return n&&Xr[t.nodeName]&&n}function Te(t,n){var r=function(r,i){if(r.preventDefault||(r.preventDefault=function(){r.returnValue=!1}),r.stopPropagation||(r.stopPropagation=function(){r.cancelBubble=!0}),r.target||(r.target=r.srcElement||e),g(r.defaultPrevented)){var a=r.preventDefault;r.preventDefault=function(){r.defaultPrevented=!0,a.call(r)},r.defaultPrevented=!1}r.isDefaultPrevented=function(){return r.defaultPrevented||r.returnValue===!1};var s=_(n[i||r.type]||[]);o(s,function(e){e.call(t,r)}),8>=wr?(r.preventDefault=null,r.stopPropagation=null,r.isDefaultPrevented=null):(delete r.preventDefault,delete r.stopPropagation,delete r.isDefaultPrevented)};return r.elem=t,r}function Me(t,e){var r,i=typeof t;return"function"==i||"object"==i&&null!==t?"function"==typeof(r=t.$$hashKey)?r=t.$$hashKey():r===n&&(r=t.$$hashKey=(e||c)()):r=t,i+":"+r}function Ne(t,e){if(e){var n=0;this.nextUid=function(){return++n}}o(t,this.put,this)}function Pe(t){var e,n,r,i;return"function"==typeof t?(e=t.$inject)||(e=[],t.length&&(n=t.toString().replace(ti,""),r=n.match(Kr),o(r[1].split(Yr),function(t){t.replace(Zr,function(t,n,r){e.push(r)})})),t.$inject=e):Nr(t)?(i=t.length-1,ne(t[i],"fn"),e=t.slice(0,i)):ne(t,"fn",!0),e}function je(t){function e(t){return function(e,n){return y(e)?void o(e,u(t)):t(e,n)}}function n(t,e){if(re(t,"service"),(S(e)||Nr(e))&&(e=b.instantiate(e)),!e.$get)throw ei("pget","Provider '{0}' must define $get factory method.",t);return m[t+p]=e}function r(t,e){return n(t,{$get:e})}function i(t,e){return r(t,["$injector",function(t){return t.instantiate(e)}])}function a(t,e){return r(t,v(e))}function s(t,e){re(t,"constant"),m[t]=e,x[t]=e}function c(t,e){var n=b.get(t+p),r=n.$get;n.$get=function(){var t=C.invoke(r,n);return C.invoke(e,null,{$delegate:t})}}function l(t){var e,n,r,i,a=[];return o(t,function(t){if(!g.get(t)){g.put(t,!0);try{if(w(t))for(e=Sr(t),a=a.concat(l(e.requires)).concat(e._runBlocks),n=e._invokeQueue,r=0,i=n.length;i>r;r++){var o=n[r],s=b.get(o[0]);s[o[1]].apply(s,o[2])}else S(t)?a.push(b.invoke(t)):Nr(t)?a.push(b.invoke(t)):ne(t,"module")}catch(u){throw Nr(t)&&(t=t[t.length-1]),u.message&&u.stack&&-1==u.stack.indexOf(u.message)&&(u=u.message+"\n"+u.stack),ei("modulerr","Failed to instantiate module {0} due to:\n{1}",t,u.stack||u.message||u)}}}),a}function f(t,e){function n(n){if(t.hasOwnProperty(n)){if(t[n]===h)throw ei("cdep","Circular dependency found: {0}",n+" <- "+d.join(" <- "));return t[n]}try{return d.unshift(n),t[n]=h,t[n]=e(n)}catch(r){throw t[n]===h&&delete t[n],r}finally{d.shift()}}function r(t,e,r){var i,o,a,s=[],u=Pe(t);for(o=0,i=u.length;i>o;o++){if(a=u[o],"string"!=typeof a)throw ei("itkn","Incorrect injection token! Expected service name as string, got {0}",a);s.push(r&&r.hasOwnProperty(a)?r[a]:n(a))}return Nr(t)&&(t=t[i]),t.apply(e,s)}function i(t,e){var n,i,o=function(){};return o.prototype=(Nr(t)?t[t.length-1]:t).prototype,n=new o,i=r(t,n,e),y(i)||S(i)?i:n}return{invoke:r,instantiate:i,get:n,annotate:Pe,has:function(e){return m.hasOwnProperty(e+p)||t.hasOwnProperty(e)}}}var h={},p="Provider",d=[],g=new Ne([],!0),m={$provide:{provider:e(n),factory:e(r),service:e(i),value:e(a),constant:e(s),decorator:c}},b=m.$injector=f(m,function(){throw ei("unpr","Unknown provider: {0}",d.join(" <- "))}),x={},C=x.$injector=f(x,function(t){var e=b.get(t+p);return C.invoke(e.$get,e)});return o(l(t),function(t){C.invoke(t||$)}),C}function De(){var t=!0;this.disableAutoScrolling=function(){t=!1},this.$get=["$window","$location","$rootScope",function(e,n,r){function i(t){var e=null;return o(t,function(t){e||"a"!==dr(t.nodeName)||(e=t)}),e}function a(){var t,r=n.hash();r?(t=s.getElementById(r))?t.scrollIntoView():(t=i(s.getElementsByName(r)))?t.scrollIntoView():"top"===r&&e.scrollTo(0,0):e.scrollTo(0,0)}var s=e.document;return t&&r.$watch(function(){return n.hash()},function(){r.$evalAsync(a)}),a}]}function Re(){this.$get=["$$rAF","$timeout",function(t,e){return t.supported?function(e){return t(e)}:function(t){return e(t,0,!1)}}]}function _e(t,e,r,i){function a(t){try{t.apply(null,V(arguments,1))}finally{if(m--,0===m)for(;y.length;)try{y.pop()()}catch(e){r.error(e)}}}function s(t,e){!function n(){o(x,function(t){t()}),b=e(n,t)}()}function u(){S!=c.url()&&(S=c.url(),o(E,function(t){t(c.url())}))}var c=this,l=e[0],f=t.location,h=t.history,p=t.setTimeout,d=t.clearTimeout,v={};c.isMock=!1;var m=0,y=[];c.$$completeOutstandingRequest=a,c.$$incOutstandingRequestCount=function(){m++},c.notifyWhenNoOutstandingRequests=function(t){o(x,function(t){t()}),0===m?t():y.push(t)};var b,x=[];c.addPollFn=function(t){return g(b)&&s(100,p),x.push(t),t};var S=f.href,C=e.find("base"),k=null;c.url=function(e,n){if(f!==t.location&&(f=t.location),h!==t.history&&(h=t.history),e){if(S==e)return;var r=S&&un(S)===un(e);return S=e,!r&&i.history?n?h.replaceState(null,"",e):(h.pushState(null,"",e),C.attr("href",C.attr("href"))):(r||(k=e),n?f.replace(e):f.href=e),c}return k||f.href.replace(/%27/g,"'")};var E=[],A=!1;c.onUrlChange=function(e){return A||(i.history&&br(t).on("popstate",u),i.hashchange?br(t).on("hashchange",u):c.addPollFn(u),A=!0),E.push(e),e},c.$$checkUrlChange=u,c.baseHref=function(){var t=C.attr("href");return t?t.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var O={},T="",M=c.baseHref();c.cookies=function(t,e){var i,o,a,s,u;if(!t){if(l.cookie!==T)for(T=l.cookie,o=T.split("; "),O={},s=0;s<o.length;s++)a=o[s],u=a.indexOf("="),u>0&&(t=unescape(a.substring(0,u)),O[t]===n&&(O[t]=unescape(a.substring(u+1))));return O}e===n?l.cookie=escape(t)+"=;path="+M+";expires=Thu, 01 Jan 1970 00:00:00 GMT":w(e)&&(i=(l.cookie=escape(t)+"="+escape(e)+";path="+M).length+1,i>4096&&r.warn("Cookie '"+t+"' possibly not set or overflowed because it was too large ("+i+" > 4096 bytes)!"))},c.defer=function(t,e){var n;return m++,n=p(function(){delete v[n],a(t)},e||0),v[n]=!0,n},c.defer.cancel=function(t){return v[t]?(delete v[t],d(t),a($),!0):!1}}function qe(){this.$get=["$window","$log","$sniffer","$document",function(t,e,n,r){return new _e(t,r,e,n)}]}function Ue(){this.$get=function(){function t(t,n){function i(t){t!=h&&(p?p==t&&(p=t.n):p=t,o(t.n,t.p),o(t,h),h=t,h.n=null)}function o(t,e){t!=e&&(t&&(t.p=e),e&&(e.n=t))}if(t in e)throw r("$cacheFactory")("iid","CacheId '{0}' is already taken!",t);var a=0,s=f({},n,{id:t}),u={},c=n&&n.capacity||Number.MAX_VALUE,l={},h=null,p=null;return e[t]={put:function(t,e){if(c<Number.MAX_VALUE){var n=l[t]||(l[t]={key:t});i(n)}if(!g(e))return t in u||a++,u[t]=e,a>c&&this.remove(p.key),e},get:function(t){if(c<Number.MAX_VALUE){var e=l[t];if(!e)return;i(e)}return u[t]},remove:function(t){if(c<Number.MAX_VALUE){var e=l[t];if(!e)return;e==h&&(h=e.p),e==p&&(p=e.n),o(e.n,e.p),delete l[t]}delete u[t],a--},removeAll:function(){u={},a=0,l={},h=p=null},destroy:function(){u=null,s=null,l=null,delete e[t]},info:function(){return f({},s,{size:a})}}}var e={};return t.info=function(){var t={};return o(e,function(e,n){t[n]=e.info()}),t},t.get=function(t){return e[t]},t}}function Ve(){this.$get=["$cacheFactory",function(t){return t("templates")}]}function Ie(t,r){var i={},a="Directive",s=/^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/,c=/(([\d\w_\-]+)(?:\:([^;]+))?;?)/,l=/^(on[a-z]+|formaction)$/;this.directive=function h(e,n){return re(e,"directive"),w(e)?(ee(n,"directiveFactory"),i.hasOwnProperty(e)||(i[e]=[],t.factory(e+a,["$injector","$exceptionHandler",function(t,n){var r=[];return o(i[e],function(i,o){try{var a=t.invoke(i);S(a)?a={compile:v(a)}:!a.compile&&a.link&&(a.compile=v(a.link)),a.priority=a.priority||0,a.index=o,a.name=a.name||e,a.require=a.require||a.controller&&a.name,a.restrict=a.restrict||"A",r.push(a)}catch(s){n(s)}}),r}])),i[e].push(n)):o(e,u(h)),this},this.aHrefSanitizationWhitelist=function(t){return m(t)?(r.aHrefSanitizationWhitelist(t),this):r.aHrefSanitizationWhitelist()},this.imgSrcSanitizationWhitelist=function(t){return m(t)?(r.imgSrcSanitizationWhitelist(t),this):r.imgSrcSanitizationWhitelist()},this.$get=["$injector","$interpolate","$exceptionHandler","$http","$templateCache","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(t,r,u,h,$,v,g,m,b,x,C,k){function E(t,e,n,r,i){t instanceof br||(t=br(t)),o(t,function(e,n){3==e.nodeType&&e.nodeValue.match(/\S+/)&&(t[n]=e=br(e).wrap("<span></span>").parent()[0])});var a=O(t,e,t,n,r,i);return A(t,"ng-scope"),function(e,n,r,i){ee(e,"scope");var s=n?Jr.clone.call(t):t;o(r,function(t,e){s.data("$"+e+"Controller",t)});for(var u=0,c=s.length;c>u;u++){var l=s[u],f=l.nodeType;(1===f||9===f)&&s.eq(u).data("$scope",e)}return n&&n(s,e),a&&a(e,s,s,i),s}}function A(t,e){try{t.addClass(e)}catch(n){}}function O(t,e,r,i,o,a){function s(t,r,i,o){var a,s,u,c,l,f,h,p,d=r.length,v=new Array(d);for(l=0;d>l;l++)v[l]=r[l];for(l=0,h=0,f=$.length;f>l;h++)u=v[h],a=$[l++],s=$[l++],a?(a.scope?(c=t.$new(),br.data(u,"$scope",c)):c=t,p=a.transcludeOnThisElement?T(t,a.transclude,o):!a.templateOnThisElement&&o?o:!o&&e?T(t,e):null,a(s,c,u,i,p)):s&&s(t,u.childNodes,n,o)}for(var u,c,l,f,h,p,$=[],d=0;d<t.length;d++)u=new G,c=M(t[d],[],u,0===d?i:n,o),l=c.length?j(c,t[d],u,e,r,null,[],[],a):null,l&&l.scope&&A(u.$$element,"ng-scope"),h=l&&l.terminal||!(f=t[d].childNodes)||!f.length?null:O(f,l?(l.transcludeOnThisElement||!l.templateOnThisElement)&&l.transclude:e),$.push(l,h),p=p||l||h,a=null;return p?s:null}function T(t,e,n){var r=function(r,i,o){var a=!1;r||(r=t.$new(),r.$$transcluded=!0,a=!0);var s=e(r,i,o,n);return a&&s.on("$destroy",function(){r.$destroy()}),s};return r}function M(t,e,n,r,i){var o,a,u=t.nodeType,l=n.$attr;switch(u){case 1:R(e,Fe(Cr(t).toLowerCase()),"E",r,i);for(var f,h,p,$,d,v,g=t.attributes,m=0,y=g&&g.length;y>m;m++){var b=!1,x=!1;if(f=g[m],!wr||wr>=8||f.specified){h=f.name,d=Pr(f.value),$=Fe(h),(v=te.test($))&&(h=Z($.substr(6),"-"));var S=$.replace(/(Start|End)$/,"");$===S+"Start"&&(b=h,x=h.substr(0,h.length-5)+"end",h=h.substr(0,h.length-6)),p=Fe(h.toLowerCase()),l[p]=h,(v||!n.hasOwnProperty(p))&&(n[p]=d,Oe(t,p)&&(n[p]=!0)),W(t,e,d,p),R(e,p,"A",r,i,b,x)}}if(a=t.className,w(a)&&""!==a)for(;o=c.exec(a);)p=Fe(o[2]),R(e,p,"C",r,i)&&(n[p]=Pr(o[3])),a=a.substr(o.index+o[0].length);break;case 3:H(e,t.nodeValue);break;case 8:try{o=s.exec(t.nodeValue),o&&(p=Fe(o[1]),R(e,p,"M",r,i)&&(n[p]=Pr(o[2])))}catch(C){}}return e.sort(F),e}function N(t,e,n){var r=[],i=0;if(e&&t.hasAttribute&&t.hasAttribute(e)){do{if(!t)throw ii("uterdir","Unterminated attribute, found '{0}' but no matching '{1}' found.",e,n);1==t.nodeType&&(t.hasAttribute(e)&&i++,t.hasAttribute(n)&&i--),r.push(t),t=t.nextSibling}while(i>0)}else r.push(t);return br(r)}function P(t,e,n){return function(r,i,o,a,s){return i=N(i[0],e,n),t(r,i,o,a,s)}}function j(t,i,a,s,c,l,f,h,p){function $(t,e,n,r){t&&(n&&(t=P(t,n,r)),t.require=x.require,t.directiveName=C,(F===x||x.$$isolateScope)&&(t=J(t,{isolateScope:!0})),f.push(t)),e&&(n&&(e=P(e,n,r)),e.require=x.require,e.directiveName=C,(F===x||x.$$isolateScope)&&(e=J(e,{isolateScope:!0})),h.push(e))}function d(t,e,n,r){var i,a="data",s=!1;if(w(e)){for(;"^"==(i=e.charAt(0))||"?"==i;)e=e.substr(1),"^"==i&&(a="inheritedData"),s=s||"?"==i;if(i=null,r&&"data"===a&&(i=r[e]),i=i||n[a]("$"+e+"Controller"),!i&&!s)throw ii("ctreq","Controller '{0}', required by directive '{1}', can't be found!",e,t);return i}return Nr(e)&&(i=[],o(e,function(e){i.push(d(t,e,n,r))})),i}function m(t,e,s,c,l){function p(t,e){var r;return arguments.length<2&&(e=t,t=n),K&&(r=k),l(t,e,r)}var $,m,y,w,b,x,S,C,k={};if($=i===s?a:_(a,new G(br(s),a.$attr)),m=$.$$element,F){var E=/^\s*([@=&])(\??)\s*(\w*)\s*$/;S=e.$new(!0),!H||H!==F&&H!==F.$$originalDirective?m.data("$isolateScopeNoTemplate",S):m.data("$isolateScope",S),A(m,"ng-isolate-scope"),o(F.scope,function(t,n){var i,o,a,s,u=t.match(E)||[],c=u[3]||n,l="?"==u[2],f=u[1];switch(S.$$isolateBindings[n]=f+c,f){case"@":$.$observe(c,function(t){S[n]=t}),$.$$observers[c].$$scope=e,$[c]&&(S[n]=r($[c])(e));break;case"=":if(l&&!$[c])return;o=v($[c]),s=o.literal?q:function(t,e){return t===e||t!==t&&e!==e},a=o.assign||function(){throw i=S[n]=o(e),ii("nonassign","Expression '{0}' used with directive '{1}' is non-assignable!",$[c],F.name)},i=S[n]=o(e),S.$watch(function(){var t=o(e);return s(t,S[n])||(s(t,i)?a(e,t=S[n]):S[n]=t),i=t},null,o.literal);break;case"&":o=v($[c]),S[n]=function(t){return o(e,t)};break;default:throw ii("iscp","Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}",F.name,n,t)}})}for(C=l&&p,R&&o(R,function(t){var n,r={$scope:t===F||t.$$isolateScope?S:e,$element:m,$attrs:$,$transclude:C};x=t.controller,"@"==x&&(x=$[t.name]),n=g(x,r),k[t.name]=n,K||m.data("$"+t.name+"Controller",n),t.controllerAs&&(r.$scope[t.controllerAs]=n)}),y=0,w=f.length;w>y;y++)try{b=f[y],b(b.isolateScope?S:e,m,$,b.require&&d(b.directiveName,b.require,m,k),C)}catch(O){u(O,z(m))}var T=e;for(F&&(F.template||null===F.templateUrl)&&(T=S),t&&t(T,s.childNodes,n,l),y=h.length-1;y>=0;y--)try{b=h[y],b(b.isolateScope?S:e,m,$,b.require&&d(b.directiveName,b.require,m,k),C)}catch(O){u(O,z(m))}}p=p||{};for(var b,x,C,k,O,T,j=-Number.MAX_VALUE,R=p.controllerDirectives,F=p.newIsolateScopeDirective,H=p.templateDirective,B=p.nonTlbTranscludeDirective,W=!1,X=!1,K=p.hasElementTranscludeDirective,Z=a.$$element=br(i),te=l,ee=s,ne=0,re=t.length;re>ne;ne++){x=t[ne];var ie=x.$$start,oe=x.$$end;if(ie&&(Z=N(i,ie,oe)),k=n,j>x.priority)break;if((T=x.scope)&&(b=b||x,x.templateUrl||(L("new/isolated scope",F,x,Z),y(T)&&(F=x))),C=x.name,!x.templateUrl&&x.controller&&(T=x.controller,R=R||{},L("'"+C+"' controller",R[C],x,Z),R[C]=x),(T=x.transclude)&&(W=!0,x.$$tlb||(L("transclusion",B,x,Z),B=x),"element"==T?(K=!0,j=x.priority,k=Z,Z=a.$$element=br(e.createComment(" "+C+": "+a[C]+" ")),i=Z[0],Q(c,V(k),i),ee=E(k,s,j,te&&te.name,{nonTlbTranscludeDirective:B})):(k=br(de(i)).contents(),Z.empty(),ee=E(k,s))),x.template)if(X=!0,L("template",H,x,Z),H=x,T=S(x.template)?x.template(Z,a):x.template,T=Y(T),x.replace){if(te=x,k=fe(T)?[]:br(Pr(T)),i=k[0],1!=k.length||1!==i.nodeType)throw ii("tplrt","Template for directive '{0}' must have exactly one root element. {1}",C,"");Q(c,Z,i);var ae={$attr:{}},se=M(i,[],ae),ue=t.splice(ne+1,t.length-(ne+1));F&&D(se),t=t.concat(se).concat(ue),U(a,ae),re=t.length}else Z.html(T);if(x.templateUrl)X=!0,L("template",H,x,Z),H=x,x.replace&&(te=x),m=I(t.splice(ne,t.length-ne),Z,a,c,W&&ee,f,h,{controllerDirectives:R,newIsolateScopeDirective:F,templateDirective:H,nonTlbTranscludeDirective:B}),re=t.length;else if(x.compile)try{O=x.compile(Z,a,ee),S(O)?$(null,O,ie,oe):O&&$(O.pre,O.post,ie,oe)}catch(ce){u(ce,z(Z))}x.terminal&&(m.terminal=!0,j=Math.max(j,x.priority))}return m.scope=b&&b.scope===!0,m.transcludeOnThisElement=W,m.templateOnThisElement=X,m.transclude=ee,p.hasElementTranscludeDirective=K,m}function D(t){for(var e=0,n=t.length;n>e;e++)t[e]=p(t[e],{$$isolateScope:!0})}function R(e,r,o,s,c,l,f){if(r===c)return null;var h=null;if(i.hasOwnProperty(r))for(var $,d=t.get(r+a),v=0,g=d.length;g>v;v++)try{$=d[v],(s===n||s>$.priority)&&-1!=$.restrict.indexOf(o)&&(l&&($=p($,{$$start:l,$$end:f})),e.push($),h=$)}catch(m){u(m)}return h}function U(t,e){var n=e.$attr,r=t.$attr,i=t.$$element;o(t,function(r,i){"$"!=i.charAt(0)&&(e[i]&&e[i]!==r&&(r+=("style"===i?";":" ")+e[i]),t.$set(i,r,!0,n[i]))}),o(e,function(e,o){"class"==o?(A(i,e),t["class"]=(t["class"]?t["class"]+" ":"")+e):"style"==o?(i.attr("style",i.attr("style")+";"+e),t.style=(t.style?t.style+";":"")+e):"$"==o.charAt(0)||t.hasOwnProperty(o)||(t[o]=e,r[o]=n[o])})}function I(t,e,n,r,i,a,s,u){var c,l,p=[],d=e[0],v=t.shift(),g=f({},v,{templateUrl:null,transclude:null,replace:null,$$originalDirective:v}),m=S(v.templateUrl)?v.templateUrl(e,n):v.templateUrl;return e.empty(),h.get(x.getTrustedResourceUrl(m),{cache:$}).success(function(f){var h,$,w,b;if(f=Y(f),v.replace){if(w=fe(f)?[]:br(Pr(f)),h=w[0],1!=w.length||1!==h.nodeType)throw ii("tplrt","Template for directive '{0}' must have exactly one root element. {1}",v.name,m);$={$attr:{}},Q(r,e,h);var x=M(h,[],$);y(v.scope)&&D(x),t=x.concat(t),U(n,$)}else h=d,e.html(f);for(t.unshift(g),c=j(t,h,n,i,e,v,a,s,u),o(r,function(t,n){t==h&&(r[n]=e[0])}),l=O(e[0].childNodes,i);p.length;){var S=p.shift(),C=p.shift(),k=p.shift(),E=p.shift(),N=e[0];if(C!==d){var P=C.className;u.hasElementTranscludeDirective&&v.replace||(N=de(h)),Q(k,br(C),N),A(br(N),P)}b=c.transcludeOnThisElement?T(S,c.transclude,E):E,c(l,S,N,r,b)}p=null}).error(function(t,e,n,r){throw ii("tpload","Failed to load template: {0}",r.url)}),function(t,e,n,r,i){var o=i;p?(p.push(e),p.push(n),p.push(r),p.push(o)):(c.transcludeOnThisElement&&(o=T(e,c.transclude,i)),c(l,e,n,r,o))}}function F(t,e){var n=e.priority-t.priority;return 0!==n?n:t.name!==e.name?t.name<e.name?-1:1:t.index-e.index}function L(t,e,n,r){if(e)throw ii("multidir","Multiple directives [{0}, {1}] asking for {2} on: {3}",e.name,n.name,t,z(r))}function H(t,e){var n=r(e,!0);n&&t.push({priority:0,compile:function(t){var e=t.parent(),r=e.length;return r&&A(t.parent(),"ng-binding"),function(t,e){var i=e.parent(),o=i.data("$binding")||[];o.push(n),i.data("$binding",o),r||A(i,"ng-binding"),t.$watch(n,function(t){e[0].nodeValue=t})}}})}function B(t,e){if("srcdoc"==e)return x.HTML;var n=Cr(t);return"xlinkHref"==e||"FORM"==n&&"action"==e||"IMG"!=n&&("src"==e||"ngSrc"==e)?x.RESOURCE_URL:void 0}function W(t,e,n,i){var o=r(n,!0);if(o){if("multiple"===i&&"SELECT"===Cr(t))throw ii("selmulti","Binding to the 'multiple' attribute is not supported. Element: {0}",z(t));e.push({priority:100,compile:function(){return{pre:function(e,n,a){var s=a.$$observers||(a.$$observers={});if(l.test(i))throw ii("nodomevents","Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");o=r(a[i],!0,B(t,i)),o&&(a[i]=o(e),(s[i]||(s[i]=[])).$$inter=!0,(a.$$observers&&a.$$observers[i].$$scope||e).$watch(o,function(t,e){"class"===i&&t!=e?a.$updateClass(t,e):a.$set(i,t)}))}}}})}}function Q(t,n,r){var i,o,a=n[0],s=n.length,u=a.parentNode;if(t)for(i=0,o=t.length;o>i;i++)if(t[i]==a){t[i++]=r;
for(var c=i,l=c+s-1,f=t.length;f>c;c++,l++)f>l?t[c]=t[l]:delete t[c];t.length-=s-1;break}u&&u.replaceChild(r,a);var h=e.createDocumentFragment();h.appendChild(a),r[br.expando]=a[br.expando];for(var p=1,$=n.length;$>p;p++){var d=n[p];br(d).remove(),h.appendChild(d),delete n[p]}n[0]=r,n.length=1}function J(t,e){return f(function(){return t.apply(null,arguments)},t,e)}var G=function(t,e){this.$$element=t,this.$attr=e||{}};G.prototype={$normalize:Fe,$addClass:function(t){t&&t.length>0&&C.addClass(this.$$element,t)},$removeClass:function(t){t&&t.length>0&&C.removeClass(this.$$element,t)},$updateClass:function(t,e){var n=Le(t,e),r=Le(e,t);0===n.length?C.removeClass(this.$$element,r):0===r.length?C.addClass(this.$$element,n):C.setClass(this.$$element,n,r)},$set:function(t,e,r,i){var a,s=Oe(this.$$element[0],t);s&&(this.$$element.prop(t,e),i=s),this[t]=e,i?this.$attr[t]=i:(i=this.$attr[t],i||(this.$attr[t]=i=Z(t,"-"))),a=Cr(this.$$element),("A"===a&&"href"===t||"IMG"===a&&"src"===t)&&(this[t]=e=k(e,"src"===t)),r!==!1&&(null===e||e===n?this.$$element.removeAttr(i):this.$$element.attr(i,e));var c=this.$$observers;c&&o(c[t],function(t){try{t(e)}catch(n){u(n)}})},$observe:function(t,e){var n=this,r=n.$$observers||(n.$$observers={}),i=r[t]||(r[t]=[]);return i.push(e),m.$evalAsync(function(){i.$$inter||e(n[t])}),e}};var X=r.startSymbol(),K=r.endSymbol(),Y="{{"==X||"}}"==K?d:function(t){return t.replace(/\{\{/g,X).replace(/}}/g,K)},te=/^ngAttr[A-Z]/;return E}]}function Fe(t){return ce(t.replace(oi,""))}function Le(t,e){var n="",r=t.split(/\s+/),i=e.split(/\s+/);t:for(var o=0;o<r.length;o++){for(var a=r[o],s=0;s<i.length;s++)if(a==i[s])continue t;n+=(n.length>0?" ":"")+a}return n}function He(){var t={},e=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(e,n){re(e,"controller"),y(e)?f(t,e):t[e]=n},this.$get=["$injector","$window",function(n,i){return function(o,a){var s,u,c,l;if(w(o)&&(u=o.match(e),c=u[1],l=u[3],o=t.hasOwnProperty(c)?t[c]:ie(a.$scope,c,!0)||ie(i,c,!0),ne(o,c,!0)),s=n.instantiate(o,a),l){if(!a||"object"!=typeof a.$scope)throw r("$controller")("noscp","Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.",c||o.name,l);a.$scope[l]=s}return s}}]}function Be(){this.$get=["$window",function(t){return br(t.document)}]}function ze(){this.$get=["$log",function(t){return function(){t.error.apply(t,arguments)}}]}function We(t){var e,n,r,i={};return t?(o(t.split("\n"),function(t){r=t.indexOf(":"),e=dr(Pr(t.substr(0,r))),n=Pr(t.substr(r+1)),e&&(i[e]=i[e]?i[e]+", "+n:n)}),i):i}function Qe(t){var e=y(t)?t:n;return function(n){return e||(e=We(t)),n?e[dr(n)]||null:e}}function Je(t,e,n){return S(n)?n(t,e):(o(n,function(n){t=n(t,e)}),t)}function Ge(t){return t>=200&&300>t}function Xe(){var t=/^\s*(\[|\{[^\{])/,e=/[\}\]]\s*$/,r=/^\)\]\}',?\n/,i={"Content-Type":"application/json;charset=utf-8"},a=this.defaults={transformResponse:[function(n){return w(n)&&(n=n.replace(r,""),t.test(n)&&e.test(n)&&(n=H(n))),n}],transformRequest:[function(t){return!y(t)||A(t)||O(t)?t:L(t)}],headers:{common:{Accept:"application/json, text/plain, */*"},post:_(i),put:_(i),patch:_(i)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},u=this.interceptors=[],c=this.responseInterceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(t,e,r,i,l,h){function p(t){function e(t){var e=f({},t,{data:Je(t.data,t.headers,i.transformResponse)});return Ge(t.status)?e:l.reject(e)}function r(t){function e(t){var e;o(t,function(n,r){S(n)&&(e=n(),null!=e?t[r]=e:delete t[r])})}var n,r,i,s=a.headers,u=f({},t.headers);s=f({},s.common,s[dr(t.method)]);t:for(n in s){r=dr(n);for(i in u)if(dr(i)===r)continue t;u[n]=s[n]}return e(u),u}var i={method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse},s=r(t);f(i,t),i.headers=s,i.method=gr(i.method);var u=function(t){s=t.headers;var n=Je(t.data,Qe(s),t.transformRequest);return g(n)&&o(s,function(t,e){"content-type"===dr(e)&&delete s[e]}),g(t.withCredentials)&&!g(a.withCredentials)&&(t.withCredentials=a.withCredentials),v(t,n,s).then(e,e)},c=[u,n],h=l.when(i);for(o(k,function(t){(t.request||t.requestError)&&c.unshift(t.request,t.requestError),(t.response||t.responseError)&&c.push(t.response,t.responseError)});c.length;){var p=c.shift(),$=c.shift();h=h.then(p,$)}return h.success=function(t){return h.then(function(e){t(e.data,e.status,e.headers,i)}),h},h.error=function(t){return h.then(null,function(e){t(e.data,e.status,e.headers,i)}),h},h}function $(){o(arguments,function(t){p[t]=function(e,n){return p(f(n||{},{method:t,url:e}))}})}function d(){o(arguments,function(t){p[t]=function(e,n,r){return p(f(r||{},{method:t,url:e,data:n}))}})}function v(r,o,s){function u(t,e,n,r){h&&(Ge(t)?h.put(w,[t,e,We(n),r]):h.remove(w)),c(e,t,n,r),i.$$phase||i.$apply()}function c(t,e,n,i){e=Math.max(e,0),(Ge(e)?d.resolve:d.reject)({data:t,status:e,headers:Qe(n),config:r,statusText:i})}function f(){var t=j(p.pendingRequests,r);-1!==t&&p.pendingRequests.splice(t,1)}var h,$,d=l.defer(),v=d.promise,w=b(r.url,r.params);if(p.pendingRequests.push(r),v.then(f,f),!r.cache&&!a.cache||r.cache===!1||"GET"!==r.method&&"JSONP"!==r.method||(h=y(r.cache)?r.cache:y(a.cache)?a.cache:C),h)if($=h.get(w),m($)){if(T($))return $.then(f,f),$;Nr($)?c($[1],$[0],_($[2]),$[3]):c($,200,{},"OK")}else h.put(w,v);if(g($)){var x=In(r.url)?e.cookies()[r.xsrfCookieName||a.xsrfCookieName]:n;x&&(s[r.xsrfHeaderName||a.xsrfHeaderName]=x),t(r.method,w,o,u,s,r.timeout,r.withCredentials,r.responseType)}return v}function b(t,e){if(!e)return t;var n=[];return s(e,function(t,e){null===t||g(t)||(Nr(t)||(t=[t]),o(t,function(t){y(t)&&(t=x(t)?t.toISOString():L(t)),n.push(X(e)+"="+X(t))}))}),n.length>0&&(t+=(-1==t.indexOf("?")?"?":"&")+n.join("&")),t}var C=r("$http"),k=[];return o(u,function(t){k.unshift(w(t)?h.get(t):h.invoke(t))}),o(c,function(t,e){var n=w(t)?h.get(t):h.invoke(t);k.splice(e,0,{response:function(t){return n(l.when(t))},responseError:function(t){return n(l.reject(t))}})}),p.pendingRequests=[],$("get","delete","head","jsonp"),d("post","put","patch"),p.defaults=a,p}]}function Ke(e){if(8>=wr&&(!e.match(/^(get|post|head|put|delete|options)$/i)||!t.XMLHttpRequest))return new t.ActiveXObject("Microsoft.XMLHTTP");if(t.XMLHttpRequest)return new t.XMLHttpRequest;throw r("$httpBackend")("noxhr","This browser does not support XMLHttpRequest.")}function Ye(){this.$get=["$browser","$window","$document",function(t,e,n){return Ze(t,Ke,t.defer,e.angular.callbacks,n[0])}]}function Ze(t,e,n,r,i){function a(t,e,n){var o=i.createElement("script"),a=null;return o.type="text/javascript",o.src=t,o.async=!0,a=function(t){Vr(o,"load",a),Vr(o,"error",a),i.body.removeChild(o),o=null;var s=-1,u="unknown";t&&("load"!==t.type||r[e].called||(t={type:"error"}),u=t.type,s="error"===t.type?404:200),n&&n(s,u)},Ur(o,"load",a),Ur(o,"error",a),8>=wr&&(o.onreadystatechange=function(){w(o.readyState)&&/loaded|complete/.test(o.readyState)&&(o.onreadystatechange=null,a({type:"load"}))}),i.body.appendChild(o),a}var s=-1;return function(i,u,c,l,f,h,p,d){function v(){y=s,b&&b(),x&&x.abort()}function g(e,r,i,o,a){C&&n.cancel(C),b=x=null,0===r&&(r=i?200:"file"==Vn(u).protocol?404:0),r=1223===r?204:r,a=a||"",e(r,i,o,a),t.$$completeOutstandingRequest($)}var y;if(t.$$incOutstandingRequestCount(),u=u||t.url(),"jsonp"==dr(i)){var w="_"+(r.counter++).toString(36);r[w]=function(t){r[w].data=t,r[w].called=!0};var b=a(u.replace("JSON_CALLBACK","angular.callbacks."+w),w,function(t,e){g(l,t,r[w].data,"",e),r[w]=$})}else{var x=e(i);if(x.open(i,u,!0),o(f,function(t,e){m(t)&&x.setRequestHeader(e,t)}),x.onreadystatechange=function(){if(x&&4==x.readyState){var t=null,e=null,n="";y!==s&&(t=x.getAllResponseHeaders(),e="response"in x?x.response:x.responseText),y===s&&10>wr||(n=x.statusText),g(l,y||x.status,e,t,n)}},p&&(x.withCredentials=!0),d)try{x.responseType=d}catch(S){if("json"!==d)throw S}x.send(c||null)}if(h>0)var C=n(v,h);else T(h)&&h.then(v)}}function tn(){var t="{{",e="}}";this.startSymbol=function(e){return e?(t=e,this):t},this.endSymbol=function(t){return t?(e=t,this):e},this.$get=["$parse","$exceptionHandler","$sce",function(n,r,i){function o(o,u,c){for(var l,f,h,p,$=0,d=[],v=o.length,g=!1,m=[];v>$;)-1!=(l=o.indexOf(t,$))&&-1!=(f=o.indexOf(e,l+a))?($!=l&&d.push(o.substring($,l)),d.push(h=n(p=o.substring(l+a,f))),h.exp=p,$=f+s,g=!0):($!=v&&d.push(o.substring($)),$=v);if((v=d.length)||(d.push(""),v=1),c&&d.length>1)throw ai("noconcat","Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce",o);return!u||g?(m.length=v,h=function(t){try{for(var e,n=0,a=v;a>n;n++){if("function"==typeof(e=d[n]))if(e=e(t),e=c?i.getTrusted(c,e):i.valueOf(e),null==e)e="";else switch(typeof e){case"string":break;case"number":e=""+e;break;default:e=L(e)}m[n]=e}return m.join("")}catch(s){var u=ai("interr","Can't interpolate: {0}\n{1}",o,s.toString());r(u)}},h.exp=o,h.parts=d,h):void 0}var a=t.length,s=e.length;return o.startSymbol=function(){return t},o.endSymbol=function(){return e},o}]}function en(){this.$get=["$rootScope","$window","$q",function(t,e,n){function r(r,o,a,s){var u=e.setInterval,c=e.clearInterval,l=n.defer(),f=l.promise,h=0,p=m(s)&&!s;return a=m(a)?a:0,f.then(null,null,r),f.$$intervalId=u(function(){l.notify(h++),a>0&&h>=a&&(l.resolve(h),c(f.$$intervalId),delete i[f.$$intervalId]),p||t.$apply()},o),i[f.$$intervalId]=l,f}var i={};return r.cancel=function(t){return t&&t.$$intervalId in i?(i[t.$$intervalId].reject("canceled"),e.clearInterval(t.$$intervalId),delete i[t.$$intervalId],!0):!1},r}]}function nn(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"¤",posSuf:"",negPre:"(¤",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),SHORTMONTH:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),DAY:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),SHORTDAY:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(t){return 1===t?"one":"other"}}}}function rn(t){for(var e=t.split("/"),n=e.length;n--;)e[n]=G(e[n]);return e.join("/")}function on(t,e,n){var r=Vn(t,n);e.$$protocol=r.protocol,e.$$host=r.hostname,e.$$port=h(r.port)||ui[r.protocol]||null}function an(t,e,n){var r="/"!==t.charAt(0);r&&(t="/"+t);var i=Vn(t,n);e.$$path=decodeURIComponent(r&&"/"===i.pathname.charAt(0)?i.pathname.substring(1):i.pathname),e.$$search=Q(i.search),e.$$hash=decodeURIComponent(i.hash),e.$$path&&"/"!=e.$$path.charAt(0)&&(e.$$path="/"+e.$$path)}function sn(t,e){return 0===e.indexOf(t)?e.substr(t.length):void 0}function un(t){var e=t.indexOf("#");return-1==e?t:t.substr(0,e)}function cn(t){return t.substr(0,un(t).lastIndexOf("/")+1)}function ln(t){return t.substring(0,t.indexOf("/",t.indexOf("//")+2))}function fn(t,e){this.$$html5=!0,e=e||"";var r=cn(t);on(t,this,t),this.$$parse=function(e){var n=sn(r,e);if(!w(n))throw ci("ipthprfx",'Invalid url "{0}", missing path prefix "{1}".',e,r);an(n,this,t),this.$$path||(this.$$path="/"),this.$$compose()},this.$$compose=function(){var t=J(this.$$search),e=this.$$hash?"#"+G(this.$$hash):"";this.$$url=rn(this.$$path)+(t?"?"+t:"")+e,this.$$absUrl=r+this.$$url.substr(1)},this.$$parseLinkUrl=function(i){var o,a,s;return(o=sn(t,i))!==n?(a=o,s=(o=sn(e,o))!==n?r+(sn("/",o)||o):t+a):(o=sn(r,i))!==n?s=r+o:r==i+"/"&&(s=r),s&&this.$$parse(s),!!s}}function hn(t,e){var n=cn(t);on(t,this,t),this.$$parse=function(r){function i(t,e,n){var r,i=/^\/[A-Z]:(\/.*)/;return 0===e.indexOf(n)&&(e=e.replace(n,"")),i.exec(e)?t:(r=i.exec(t),r?r[1]:t)}var o=sn(t,r)||sn(n,r),a="#"==o.charAt(0)?sn(e,o):this.$$html5?o:"";if(!w(a))throw ci("ihshprfx",'Invalid url "{0}", missing hash prefix "{1}".',r,e);an(a,this,t),this.$$path=i(this.$$path,a,t),this.$$compose()},this.$$compose=function(){var n=J(this.$$search),r=this.$$hash?"#"+G(this.$$hash):"";this.$$url=rn(this.$$path)+(n?"?"+n:"")+r,this.$$absUrl=t+(this.$$url?e+this.$$url:"")},this.$$parseLinkUrl=function(e){return un(t)==un(e)?(this.$$parse(e),!0):!1}}function pn(t,e){this.$$html5=!0,hn.apply(this,arguments);var n=cn(t);this.$$parseLinkUrl=function(r){var i,o;return t==un(r)?i=r:(o=sn(n,r))?i=t+e+o:n===r+"/"&&(i=n),i&&this.$$parse(i),!!i},this.$$compose=function(){var n=J(this.$$search),r=this.$$hash?"#"+G(this.$$hash):"";this.$$url=rn(this.$$path)+(n?"?"+n:"")+r,this.$$absUrl=t+e+this.$$url}}function $n(t){return function(){return this[t]}}function dn(t,e){return function(n){return g(n)?this[t]:(this[t]=e(n),this.$$compose(),this)}}function vn(){var e="",n=!1;this.hashPrefix=function(t){return m(t)?(e=t,this):e},this.html5Mode=function(t){return m(t)?(n=t,this):n},this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(r,i,o,a){function s(t){r.$broadcast("$locationChangeSuccess",u.absUrl(),t)}var u,c,l,f=i.baseHref(),h=i.url();n?(l=ln(h)+(f||"/"),c=o.history?fn:pn):(l=un(h),c=hn),u=new c(l,"#"+e),u.$$parseLinkUrl(h,h);var p=/^\s*(javascript|mailto):/i;a.on("click",function(e){if(!e.ctrlKey&&!e.metaKey&&2!=e.which){for(var n=br(e.target);"a"!==dr(n[0].nodeName);)if(n[0]===a[0]||!(n=n.parent())[0])return;var o=n.prop("href"),s=n.attr("href")||n.attr("xlink:href");y(o)&&"[object SVGAnimatedString]"===o.toString()&&(o=Vn(o.animVal).href),p.test(o)||!o||n.attr("target")||e.isDefaultPrevented()||u.$$parseLinkUrl(o,s)&&(e.preventDefault(),u.absUrl()!=i.url()&&(r.$apply(),t.angular["ff-684208-preventDefault"]=!0))}}),u.absUrl()!=h&&i.url(u.absUrl(),!0),i.onUrlChange(function(t){u.absUrl()!=t&&(r.$evalAsync(function(){var e=u.absUrl();u.$$parse(t),r.$broadcast("$locationChangeStart",t,e).defaultPrevented?(u.$$parse(e),i.url(e)):s(e)}),r.$$phase||r.$digest())});var $=0;return r.$watch(function(){var t=i.url(),e=u.$$replace;return $&&t==u.absUrl()||($++,r.$evalAsync(function(){r.$broadcast("$locationChangeStart",u.absUrl(),t).defaultPrevented?u.$$parse(t):(i.url(u.absUrl(),e),s(t))})),u.$$replace=!1,$}),u}]}function gn(){var t=!0,e=this;this.debugEnabled=function(e){return m(e)?(t=e,this):t},this.$get=["$window",function(n){function r(t){return t instanceof Error&&(t.stack?t=t.message&&-1===t.stack.indexOf(t.message)?"Error: "+t.message+"\n"+t.stack:t.stack:t.sourceURL&&(t=t.message+"\n"+t.sourceURL+":"+t.line)),t}function i(t){var e=n.console||{},i=e[t]||e.log||$,a=!1;try{a=!!i.apply}catch(s){}return a?function(){var t=[];return o(arguments,function(e){t.push(r(e))}),i.apply(e,t)}:function(t,e){i(t,null==e?"":e)}}return{log:i("log"),info:i("info"),warn:i("warn"),error:i("error"),debug:function(){var n=i("debug");return function(){t&&n.apply(e,arguments)}}()}}]}function mn(t,e){if("__defineGetter__"===t||"__defineSetter__"===t||"__lookupGetter__"===t||"__lookupSetter__"===t||"__proto__"===t)throw fi("isecfld","Attempting to access a disallowed field in Angular expressions! Expression: {0}",e);return t}function yn(t,e){if(t){if(t.constructor===t)throw fi("isecfn","Referencing Function in Angular expressions is disallowed! Expression: {0}",e);if(t.document&&t.location&&t.alert&&t.setInterval)throw fi("isecwindow","Referencing the Window in Angular expressions is disallowed! Expression: {0}",e);if(t.children&&(t.nodeName||t.prop&&t.attr&&t.find))throw fi("isecdom","Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}",e);if(t===Object)throw fi("isecobj","Referencing Object in Angular expressions is disallowed! Expression: {0}",e)}return t}function wn(t,e){if(t){if(t.constructor===t)throw fi("isecfn","Referencing Function in Angular expressions is disallowed! Expression: {0}",e);if(t===pi||t===$i||di&&t===di)throw fi("isecff","Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}",e)}}function bn(t,e,r,i,o){yn(t,i),o=o||{};for(var a,s=e.split("."),u=0;s.length>1;u++){a=mn(s.shift(),i);var c=yn(t[a],i);c||(c={},t[a]=c),t=c,t.then&&o.unwrapPromises&&(li(i),"$$v"in t||!function(t){t.then(function(e){t.$$v=e})}(t),t.$$v===n&&(t.$$v={}),t=t.$$v)}return a=mn(s.shift(),i),yn(t[a],i),t[a]=r,r}function xn(t){return"constructor"==t}function Sn(t,e,r,i,o,a,s){mn(t,a),mn(e,a),mn(r,a),mn(i,a),mn(o,a);var u=function(t){return yn(t,a)},c=s.expensiveChecks,l=c||xn(t)?u:d,f=c||xn(e)?u:d,h=c||xn(r)?u:d,p=c||xn(i)?u:d,$=c||xn(o)?u:d;return s.unwrapPromises?function(s,u){var c,d=u&&u.hasOwnProperty(t)?u:s;return null==d?d:(d=l(d[t]),d&&d.then&&(li(a),"$$v"in d||(c=d,c.$$v=n,c.then(function(t){c.$$v=l(t)})),d=l(d.$$v)),e?null==d?n:(d=f(d[e]),d&&d.then&&(li(a),"$$v"in d||(c=d,c.$$v=n,c.then(function(t){c.$$v=f(t)})),d=f(d.$$v)),r?null==d?n:(d=h(d[r]),d&&d.then&&(li(a),"$$v"in d||(c=d,c.$$v=n,c.then(function(t){c.$$v=h(t)})),d=h(d.$$v)),i?null==d?n:(d=p(d[i]),d&&d.then&&(li(a),"$$v"in d||(c=d,c.$$v=n,c.then(function(t){c.$$v=p(t)})),d=p(d.$$v)),o?null==d?n:(d=$(d[o]),d&&d.then&&(li(a),"$$v"in d||(c=d,c.$$v=n,c.then(function(t){c.$$v=$(t)})),d=$(d.$$v)),d):d):d):d):d)}:function(a,s){var u=s&&s.hasOwnProperty(t)?s:a;return null==u?u:(u=l(u[t]),e?null==u?n:(u=f(u[e]),r?null==u?n:(u=h(u[r]),i?null==u?n:(u=p(u[i]),o?null==u?n:u=$(u[o]):u):u):u):u)}}function Cn(t,e){return function(n,r){return t(n,r,li,yn,e)}}function kn(t,e,r){var i=e.expensiveChecks,a=i?bi:wi;if(a.hasOwnProperty(t))return a[t];var s,u=t.split("."),c=u.length;if(e.csp)s=6>c?Sn(u[0],u[1],u[2],u[3],u[4],r,e):function(t,i){var o,a=0;do o=Sn(u[a++],u[a++],u[a++],u[a++],u[a++],r,e)(t,i),i=n,t=o;while(c>a);return o};else{var l="var p;\n";i&&(l+="s = eso(s, fe);\nl = eso(l, fe);\n");var f=i;o(u,function(t,n){mn(t,r);var o=(n?"s":'((l&&l.hasOwnProperty("'+t+'"))?l:s)')+'["'+t+'"]',a=i||xn(t);a&&(o="eso("+o+", fe)",f=!0),l+="if(s == null) return undefined;\ns="+o+";\n",e.unwrapPromises&&(l+='if (s && s.then) {\n pw("'+r.replace(/(["\r\n])/g,"\\$1")+'");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v='+(a?"eso(v)":"v")+";});\n}\n s="+(a?"eso(s.$$v)":"s.$$v")+"\n}\n")}),l+="return s;";var h=new Function("s","l","pw","eso","fe",l);h.toString=v(l),(f||e.unwrapPromises)&&(h=Cn(h,r)),s=h}return"hasOwnProperty"!==t&&(a[t]=s),s}function En(){var t={},e={},n={csp:!1,unwrapPromises:!1,logPromiseWarnings:!0,expensiveChecks:!1};this.unwrapPromises=function(t){return m(t)?(n.unwrapPromises=!!t,this):n.unwrapPromises},this.logPromiseWarnings=function(t){return m(t)?(n.logPromiseWarnings=t,this):n.logPromiseWarnings},this.$get=["$filter","$sniffer","$log",function(r,i,o){n.csp=i.csp;var a={csp:n.csp,unwrapPromises:n.unwrapPromises,logPromiseWarnings:n.logPromiseWarnings,expensiveChecks:!0};return li=function(t){n.logPromiseWarnings&&!hi.hasOwnProperty(t)&&(hi[t]=!0,o.warn("[$parse] Promise found in the expression `"+t+"`. Automatic unwrapping of promises in Angular expressions is deprecated."))},function(i,o){var s;switch(typeof i){case"string":var u=o?e:t;if(u.hasOwnProperty(i))return u[i];var c=o?a:n,l=new mi(c),f=new yi(l,r,c);return s=f.parse(i),"hasOwnProperty"!==i&&(u[i]=s),s;case"function":return i;default:return $}}}]}function An(){this.$get=["$rootScope","$exceptionHandler",function(t,e){return On(function(e){t.$evalAsync(e)},e)}]}function On(t,e){function r(t){return t}function i(t){return c(t)}function a(t){var e=s(),n=0,r=Nr(t)?[]:{};return o(t,function(t,i){n++,u(t).then(function(t){r.hasOwnProperty(i)||(r[i]=t,--n||e.resolve(r))},function(t){r.hasOwnProperty(i)||e.reject(t)})}),0===n&&e.resolve(r),e.promise}var s=function(){var o,a,c=[];return a={resolve:function(e){if(c){var r=c;c=n,o=u(e),r.length&&t(function(){for(var t,e=0,n=r.length;n>e;e++)t=r[e],o.then(t[0],t[1],t[2])})}},reject:function(t){a.resolve(l(t))},notify:function(e){if(c){var n=c;c.length&&t(function(){for(var t,r=0,i=n.length;i>r;r++)t=n[r],t[2](e)})}},promise:{then:function(t,n,a){var u=s(),l=function(n){try{u.resolve((S(t)?t:r)(n))}catch(i){u.reject(i),e(i)}},f=function(t){try{u.resolve((S(n)?n:i)(t))}catch(r){u.reject(r),e(r)}},h=function(t){try{u.notify((S(a)?a:r)(t))}catch(n){e(n)}};return c?c.push([l,f,h]):o.then(l,f,h),u.promise},"catch":function(t){return this.then(null,t)},"finally":function(t){function e(t,e){var n=s();return e?n.resolve(t):n.reject(t),n.promise}function n(n,i){var o=null;try{o=(t||r)()}catch(a){return e(a,!1)}return T(o)?o.then(function(){return e(n,i)},function(t){return e(t,!1)}):e(n,i)}return this.then(function(t){return n(t,!0)},function(t){return n(t,!1)})}}}},u=function(e){return T(e)?e:{then:function(n){var r=s();return t(function(){r.resolve(n(e))}),r.promise}}},c=function(t){var e=s();return e.reject(t),e.promise},l=function(n){return{then:function(r,o){var a=s();return t(function(){try{a.resolve((S(o)?o:i)(n))}catch(t){a.reject(t),e(t)}}),a.promise}}},f=function(n,o,a,l){var f,h=s(),p=function(t){try{return(S(o)?o:r)(t)}catch(n){return e(n),c(n)}},$=function(t){try{return(S(a)?a:i)(t)}catch(n){return e(n),c(n)}},d=function(t){try{return(S(l)?l:r)(t)}catch(n){e(n)}};return t(function(){u(n).then(function(t){f||(f=!0,h.resolve(u(t).then(p,$,d)))},function(t){f||(f=!0,h.resolve($(t)))},function(t){f||h.notify(d(t))})}),h.promise};return{defer:s,reject:c,when:f,all:a}}function Tn(){this.$get=["$window","$timeout",function(t,e){var n=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame,r=t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.webkitCancelRequestAnimationFrame,i=!!n,o=i?function(t){var e=n(t);return function(){r(e)}}:function(t){var n=e(t,16.66,!1);return function(){e.cancel(n)}};return o.supported=i,o}]}function Mn(){var t=10,e=r("$rootScope"),n=null;this.digestTtl=function(e){return arguments.length&&(t=e),t},this.$get=["$injector","$exceptionHandler","$parse","$browser",function(r,a,s,u){function l(){this.$id=c(),this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null,this["this"]=this.$root=this,this.$$destroyed=!1,this.$$asyncQueue=[],this.$$postDigestQueue=[],this.$$listeners={},this.$$listenerCount={},this.$$isolateBindings={}}function f(t){if(g.$$phase)throw e("inprog","{0} already in progress",g.$$phase);g.$$phase=t}function h(){g.$$phase=null}function p(t,e){var n=s(t);return ne(n,e),n}function d(t,e,n){do t.$$listenerCount[n]-=e,0===t.$$listenerCount[n]&&delete t.$$listenerCount[n];while(t=t.$parent)}function v(){}l.prototype={constructor:l,$new:function(t){var e;return t?(e=new l,e.$root=this.$root,e.$$asyncQueue=this.$$asyncQueue,e.$$postDigestQueue=this.$$postDigestQueue):(this.$$childScopeClass||(this.$$childScopeClass=function(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null,this.$$listeners={},this.$$listenerCount={},this.$id=c(),this.$$childScopeClass=null},this.$$childScopeClass.prototype=this),e=new this.$$childScopeClass),e["this"]=e,e.$parent=this,e.$$prevSibling=this.$$childTail,this.$$childHead?(this.$$childTail.$$nextSibling=e,this.$$childTail=e):this.$$childHead=this.$$childTail=e,e},$watch:function(t,e,r){var i=this,o=p(t,"watch"),a=i.$$watchers,s={fn:e,last:v,get:o,exp:t,eq:!!r};if(n=null,!S(e)){var u=p(e||$,"listener");s.fn=function(t,e,n){u(n)}}if("string"==typeof t&&o.constant){var c=s.fn;s.fn=function(t,e,n){c.call(this,t,e,n),D(a,s)}}return a||(a=i.$$watchers=[]),a.unshift(s),function(){D(a,s),n=null}},$watchCollection:function(t,e){function n(){o=h(c);var t,e,n;if(y(o))if(i(o)){a!==p&&(a=p,v=a.length=0,f++),t=o.length,v!==t&&(f++,a.length=v=t);for(var r=0;t>r;r++)n=a[r]!==a[r]&&o[r]!==o[r],n||a[r]===o[r]||(f++,a[r]=o[r])}else{a!==$&&(a=$={},v=0,f++),t=0;for(e in o)o.hasOwnProperty(e)&&(t++,a.hasOwnProperty(e)?(n=a[e]!==a[e]&&o[e]!==o[e],n||a[e]===o[e]||(f++,a[e]=o[e])):(v++,a[e]=o[e],f++));if(v>t){f++;for(e in a)a.hasOwnProperty(e)&&!o.hasOwnProperty(e)&&(v--,delete a[e])}}else a!==o&&(a=o,f++);return f}function r(){if(d?(d=!1,e(o,o,c)):e(o,u,c),l)if(y(o))if(i(o)){u=new Array(o.length);for(var t=0;t<o.length;t++)u[t]=o[t]}else{u={};for(var n in o)vr.call(o,n)&&(u[n]=o[n])}else u=o}var o,a,u,c=this,l=e.length>1,f=0,h=s(t),p=[],$={},d=!0,v=0;return this.$watch(n,r)},$digest:function(){var r,i,o,s,c,l,p,$,d,g,m,y=this.$$asyncQueue,w=this.$$postDigestQueue,b=t,x=this,C=[];f("$digest"),u.$$checkUrlChange(),n=null;do{for(l=!1,$=x;y.length;){try{m=y.shift(),m.scope.$eval(m.expression)}catch(k){h(),a(k)}n=null}t:do{if(s=$.$$watchers)for(c=s.length;c--;)try{if(r=s[c])if((i=r.get($))===(o=r.last)||(r.eq?q(i,o):"number"==typeof i&&"number"==typeof o&&isNaN(i)&&isNaN(o))){if(r===n){l=!1;break t}}else l=!0,n=r,r.last=r.eq?R(i,null):i,r.fn(i,o===v?i:o,$),5>b&&(d=4-b,C[d]||(C[d]=[]),g=S(r.exp)?"fn: "+(r.exp.name||r.exp.toString()):r.exp,g+="; newVal: "+L(i)+"; oldVal: "+L(o),C[d].push(g))}catch(k){h(),a(k)}if(!(p=$.$$childHead||$!==x&&$.$$nextSibling))for(;$!==x&&!(p=$.$$nextSibling);)$=$.$parent}while($=p);if((l||y.length)&&!b--)throw h(),e("infdig","{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}",t,L(C))}while(l||y.length);for(h();w.length;)try{w.shift()()}catch(k){a(k)}},$destroy:function(){if(!this.$$destroyed){var t=this.$parent;this.$broadcast("$destroy"),this.$$destroyed=!0,this!==g&&(o(this.$$listenerCount,I(null,d,this)),t.$$childHead==this&&(t.$$childHead=this.$$nextSibling),t.$$childTail==this&&(t.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=null,this.$$listeners={},this.$$watchers=this.$$asyncQueue=this.$$postDigestQueue=[],this.$destroy=this.$digest=this.$apply=$,this.$on=this.$watch=function(){return $})}},$eval:function(t,e){return s(t)(this,e)},$evalAsync:function(t){g.$$phase||g.$$asyncQueue.length||u.defer(function(){g.$$asyncQueue.length&&g.$digest()}),this.$$asyncQueue.push({scope:this,expression:t})},$$postDigest:function(t){this.$$postDigestQueue.push(t)},$apply:function(t){try{return f("$apply"),this.$eval(t)}catch(e){a(e)}finally{h();try{g.$digest()}catch(e){throw a(e),e}}},$on:function(t,e){var n=this.$$listeners[t];n||(this.$$listeners[t]=n=[]),n.push(e);var r=this;do r.$$listenerCount[t]||(r.$$listenerCount[t]=0),r.$$listenerCount[t]++;while(r=r.$parent);var i=this;return function(){var r=j(n,e);-1!==r&&(n[r]=null,d(i,1,t))}},$emit:function(t){var e,n,r,i=[],o=this,s=!1,u={name:t,targetScope:o,stopPropagation:function(){s=!0},preventDefault:function(){u.defaultPrevented=!0},defaultPrevented:!1},c=U([u],arguments,1);do{for(e=o.$$listeners[t]||i,u.currentScope=o,n=0,r=e.length;r>n;n++)if(e[n])try{e[n].apply(null,c)}catch(l){a(l)}else e.splice(n,1),n--,r--;if(s)return u;o=o.$parent}while(o);return u},$broadcast:function(t){for(var e,n,r,i=this,o=i,s=i,u={name:t,targetScope:i,preventDefault:function(){u.defaultPrevented=!0},defaultPrevented:!1},c=U([u],arguments,1);o=s;){for(u.currentScope=o,e=o.$$listeners[t]||[],n=0,r=e.length;r>n;n++)if(e[n])try{e[n].apply(null,c)}catch(l){a(l)}else e.splice(n,1),n--,r--;if(!(s=o.$$listenerCount[t]&&o.$$childHead||o!==i&&o.$$nextSibling))for(;o!==i&&!(s=o.$$nextSibling);)o=o.$parent}return u}};var g=new l;return g}]}function Nn(){var t=/^\s*(https?|ftp|mailto|tel|file):/,e=/^\s*((https?|ftp|file):|data:image\/)/;this.aHrefSanitizationWhitelist=function(e){return m(e)?(t=e,this):t},this.imgSrcSanitizationWhitelist=function(t){return m(t)?(e=t,this):e},this.$get=function(){return function(n,r){var i,o=r?e:t;return wr&&!(wr>=8)||(i=Vn(n).href,""===i||i.match(o))?n:"unsafe:"+i}}}function Pn(t){return t.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")}function jn(t){if("self"===t)return t;if(w(t)){if(t.indexOf("***")>-1)throw xi("iwcard","Illegal sequence *** in string matcher.  String: {0}",t);return t=Pn(t).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*"),new RegExp("^"+t+"$")}if(C(t))return new RegExp("^"+t.source+"$");throw xi("imatcher",'Matchers may only be "self", string patterns or RegExp objects')}function Dn(t){var e=[];return m(t)&&o(t,function(t){e.push(jn(t))}),e}function Rn(){this.SCE_CONTEXTS=Si;var t=["self"],e=[];this.resourceUrlWhitelist=function(e){return arguments.length&&(t=Dn(e)),t},this.resourceUrlBlacklist=function(t){return arguments.length&&(e=Dn(t)),e},this.$get=["$injector",function(r){function i(t,e){return"self"===t?In(e):!!t.exec(e.href)}function o(n){var r,o,a=Vn(n.toString()),s=!1;for(r=0,o=t.length;o>r;r++)if(i(t[r],a)){s=!0;break}if(s)for(r=0,o=e.length;o>r;r++)if(i(e[r],a)){s=!1;break}return s}function a(t){var e=function(t){this.$$unwrapTrustedValue=function(){return t}};return t&&(e.prototype=new t),e.prototype.valueOf=function(){return this.$$unwrapTrustedValue()},e.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()},e}function s(t,e){var r=h.hasOwnProperty(t)?h[t]:null;if(!r)throw xi("icontext","Attempted to trust a value in invalid context. Context: {0}; Value: {1}",t,e);if(null===e||e===n||""===e)return e;if("string"!=typeof e)throw xi("itype","Attempted to trust a non-string value in a content requiring a string: Context: {0}",t);return new r(e)}function u(t){return t instanceof f?t.$$unwrapTrustedValue():t}function c(t,e){if(null===e||e===n||""===e)return e;var r=h.hasOwnProperty(t)?h[t]:null;if(r&&e instanceof r)return e.$$unwrapTrustedValue();if(t===Si.RESOURCE_URL){if(o(e))return e;throw xi("insecurl","Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}",e.toString())}if(t===Si.HTML)return l(e);throw xi("unsafe","Attempting to use an unsafe value in a safe context.")}var l=function(){throw xi("unsafe","Attempting to use an unsafe value in a safe context.")};r.has("$sanitize")&&(l=r.get("$sanitize"));var f=a(),h={};return h[Si.HTML]=a(f),h[Si.CSS]=a(f),h[Si.URL]=a(f),h[Si.JS]=a(f),h[Si.RESOURCE_URL]=a(h[Si.URL]),{trustAs:s,getTrusted:c,valueOf:u}}]}function _n(){var t=!0;this.enabled=function(e){return arguments.length&&(t=!!e),t},this.$get=["$parse","$sniffer","$sceDelegate",function(e,n,r){if(t&&n.msie&&n.msieDocumentMode<8)throw xi("iequirks","Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");var i=_(Si);i.isEnabled=function(){return t},i.trustAs=r.trustAs,i.getTrusted=r.getTrusted,i.valueOf=r.valueOf,t||(i.trustAs=i.getTrusted=function(t,e){return e},i.valueOf=d),i.parseAs=function(t,n){var r=e(n);return r.literal&&r.constant?r:function(e,n){return i.getTrusted(t,r(e,n))}};var a=i.parseAs,s=i.getTrusted,u=i.trustAs;return o(Si,function(t,e){var n=dr(e);i[ce("parse_as_"+n)]=function(e){return a(t,e)},i[ce("get_trusted_"+n)]=function(e){return s(t,e)},i[ce("trust_as_"+n)]=function(e){return u(t,e)}}),i}]}function qn(){this.$get=["$window","$document",function(t,e){var n,r,i={},o=h((/android (\d+)/.exec(dr((t.navigator||{}).userAgent))||[])[1]),a=/Boxee/i.test((t.navigator||{}).userAgent),s=e[0]||{},u=s.documentMode,c=/^(Moz|webkit|O|ms)(?=[A-Z])/,l=s.body&&s.body.style,f=!1,p=!1;if(l){for(var $ in l)if(r=c.exec($)){n=r[0],n=n.substr(0,1).toUpperCase()+n.substr(1);break}n||(n="WebkitOpacity"in l&&"webkit"),f=!!("transition"in l||n+"Transition"in l),p=!!("animation"in l||n+"Animation"in l),!o||f&&p||(f=w(s.body.style.webkitTransition),p=w(s.body.style.webkitAnimation))}return{history:!(!t.history||!t.history.pushState||4>o||a),hashchange:"onhashchange"in t&&(!u||u>7),hasEvent:function(t){if("input"==t&&9==wr)return!1;
if(g(i[t])){var e=s.createElement("div");i[t]="on"+t in e}return i[t]},csp:jr(),vendorPrefix:n,transitions:f,animations:p,android:o,msie:wr,msieDocumentMode:u}}]}function Un(){this.$get=["$rootScope","$browser","$q","$exceptionHandler",function(t,e,n,r){function i(i,a,s){var u,c=n.defer(),l=c.promise,f=m(s)&&!s;return u=e.defer(function(){try{c.resolve(i())}catch(e){c.reject(e),r(e)}finally{delete o[l.$$timeoutId]}f||t.$apply()},a),l.$$timeoutId=u,o[u]=c,l}var o={};return i.cancel=function(t){return t&&t.$$timeoutId in o?(o[t.$$timeoutId].reject("canceled"),delete o[t.$$timeoutId],e.defer.cancel(t.$$timeoutId)):!1},i}]}function Vn(t){var e=t;return wr&&(Ci.setAttribute("href",e),e=Ci.href),Ci.setAttribute("href",e),{href:Ci.href,protocol:Ci.protocol?Ci.protocol.replace(/:$/,""):"",host:Ci.host,search:Ci.search?Ci.search.replace(/^\?/,""):"",hash:Ci.hash?Ci.hash.replace(/^#/,""):"",hostname:Ci.hostname,port:Ci.port,pathname:"/"===Ci.pathname.charAt(0)?Ci.pathname:"/"+Ci.pathname}}function In(t){var e=w(t)?Vn(t):t;return e.protocol===ki.protocol&&e.host===ki.host}function Fn(){this.$get=v(t)}function Ln(t){function e(r,i){if(y(r)){var a={};return o(r,function(t,n){a[n]=e(n,t)}),a}return t.factory(r+n,i)}var n="Filter";this.register=e,this.$get=["$injector",function(t){return function(e){return t.get(e+n)}}],e("currency",Bn),e("date",Yn),e("filter",Hn),e("json",Zn),e("limitTo",tr),e("lowercase",Mi),e("number",zn),e("orderBy",er),e("uppercase",Ni)}function Hn(){return function(t,e,n){if(!Nr(t))return t;var r=typeof n,i=[];i.check=function(t){for(var e=0;e<i.length;e++)if(!i[e](t))return!1;return!0},"function"!==r&&(n="boolean"===r&&n?function(t,e){return Tr.equals(t,e)}:function(t,e){if(t&&e&&"object"==typeof t&&"object"==typeof e){for(var r in t)if("$"!==r.charAt(0)&&vr.call(t,r)&&n(t[r],e[r]))return!0;return!1}return e=(""+e).toLowerCase(),(""+t).toLowerCase().indexOf(e)>-1});var o=function(t,e){if("string"==typeof e&&"!"===e.charAt(0))return!o(t,e.substr(1));switch(typeof t){case"boolean":case"number":case"string":return n(t,e);case"object":switch(typeof e){case"object":return n(t,e);default:for(var r in t)if("$"!==r.charAt(0)&&o(t[r],e))return!0}return!1;case"array":for(var i=0;i<t.length;i++)if(o(t[i],e))return!0;return!1;default:return!1}};switch(typeof e){case"boolean":case"number":case"string":e={$:e};case"object":for(var a in e)!function(t){"undefined"!=typeof e[t]&&i.push(function(n){return o("$"==t?n:n&&n[t],e[t])})}(a);break;case"function":i.push(e);break;default:return t}for(var s=[],u=0;u<t.length;u++){var c=t[u];i.check(c)&&s.push(c)}return s}}function Bn(t){var e=t.NUMBER_FORMATS;return function(t,n){return g(n)&&(n=e.CURRENCY_SYM),Wn(t,e.PATTERNS[1],e.GROUP_SEP,e.DECIMAL_SEP,2).replace(/\u00A4/g,n)}}function zn(t){var e=t.NUMBER_FORMATS;return function(t,n){return Wn(t,e.PATTERNS[0],e.GROUP_SEP,e.DECIMAL_SEP,n)}}function Wn(t,e,n,r,i){if(null==t||!isFinite(t)||y(t))return"";var o=0>t;t=Math.abs(t);var a=t+"",s="",u=[],c=!1;if(-1!==a.indexOf("e")){var l=a.match(/([\d\.]+)e(-?)(\d+)/);l&&"-"==l[2]&&l[3]>i+1?(a="0",t=0):(s=a,c=!0)}if(c)i>0&&t>-1&&1>t&&(s=t.toFixed(i));else{var f=(a.split(Ei)[1]||"").length;g(i)&&(i=Math.min(Math.max(e.minFrac,f),e.maxFrac)),t=+(Math.round(+(t.toString()+"e"+i)).toString()+"e"+-i),0===t&&(o=!1);var h=(""+t).split(Ei),p=h[0];h=h[1]||"";var $,d=0,v=e.lgSize,m=e.gSize;if(p.length>=v+m)for(d=p.length-v,$=0;d>$;$++)(d-$)%m===0&&0!==$&&(s+=n),s+=p.charAt($);for($=d;$<p.length;$++)(p.length-$)%v===0&&0!==$&&(s+=n),s+=p.charAt($);for(;h.length<i;)h+="0";i&&"0"!==i&&(s+=r+h.substr(0,i))}return u.push(o?e.negPre:e.posPre),u.push(s),u.push(o?e.negSuf:e.posSuf),u.join("")}function Qn(t,e,n){var r="";for(0>t&&(r="-",t=-t),t=""+t;t.length<e;)t="0"+t;return n&&(t=t.substr(t.length-e)),r+t}function Jn(t,e,n,r){return n=n||0,function(i){var o=i["get"+t]();return(n>0||o>-n)&&(o+=n),0===o&&-12==n&&(o=12),Qn(o,e,r)}}function Gn(t,e){return function(n,r){var i=n["get"+t](),o=gr(e?"SHORT"+t:t);return r[o][i]}}function Xn(t){var e=-1*t.getTimezoneOffset(),n=e>=0?"+":"";return n+=Qn(Math[e>0?"floor":"ceil"](e/60),2)+Qn(Math.abs(e%60),2)}function Kn(t,e){return t.getHours()<12?e.AMPMS[0]:e.AMPMS[1]}function Yn(t){function e(t){var e;if(e=t.match(n)){var r=new Date(0),i=0,o=0,a=e[8]?r.setUTCFullYear:r.setFullYear,s=e[8]?r.setUTCHours:r.setHours;e[9]&&(i=h(e[9]+e[10]),o=h(e[9]+e[11])),a.call(r,h(e[1]),h(e[2])-1,h(e[3]));var u=h(e[4]||0)-i,c=h(e[5]||0)-o,l=h(e[6]||0),f=Math.round(1e3*parseFloat("0."+(e[7]||0)));return s.call(r,u,c,l,f),r}return t}var n=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(n,r){var i,a,s="",u=[];if(r=r||"mediumDate",r=t.DATETIME_FORMATS[r]||r,w(n)&&(n=Ti.test(n)?h(n):e(n)),b(n)&&(n=new Date(n)),!x(n))return n;for(;r;)a=Oi.exec(r),a?(u=U(u,a,1),r=u.pop()):(u.push(r),r=null);return o(u,function(e){i=Ai[e],s+=i?i(n,t.DATETIME_FORMATS):e.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),s}}function Zn(){return function(t){return L(t,!0)}}function tr(){return function(t,e){if(!Nr(t)&&!w(t))return t;if(e=1/0===Math.abs(Number(e))?Number(e):h(e),w(t))return e?e>=0?t.slice(0,e):t.slice(e,t.length):"";var n,r,i=[];for(e>t.length?e=t.length:e<-t.length&&(e=-t.length),e>0?(n=0,r=e):(n=t.length+e,r=t.length);r>n;n++)i.push(t[n]);return i}}function er(t){return function(e,n,r){function o(t,e){for(var r=0;r<n.length;r++){var i=n[r](t,e);if(0!==i)return i}return 0}function a(t,e){return B(e)?function(e,n){return t(n,e)}:t}function s(t,e){var n=typeof t,r=typeof e;return n==r?(x(t)&&x(e)&&(t=t.valueOf(),e=e.valueOf()),"string"==n&&(t=t.toLowerCase(),e=e.toLowerCase()),t===e?0:e>t?-1:1):r>n?-1:1}return i(e)?(n=Nr(n)?n:[n],0===n.length&&(n=["+"]),n=N(n,function(e){var n=!1,r=e||d;if(w(e)){if(("+"==e.charAt(0)||"-"==e.charAt(0))&&(n="-"==e.charAt(0),e=e.substring(1)),""===e)return a(function(t,e){return s(t,e)},n);if(r=t(e),r.constant){var i=r();return a(function(t,e){return s(t[i],e[i])},n)}}return a(function(t,e){return s(r(t),r(e))},n)}),kr.call(e).sort(a(o,r))):e}}function nr(t){return S(t)&&(t={link:t}),t.restrict=t.restrict||"AC",v(t)}function rr(t,e,n,r){function i(e,n){n=n?"-"+Z(n,"-"):"",r.setClass(t,(e?Bi:zi)+n,(e?zi:Bi)+n)}var a=this,s=t.parent().controller("form")||Di,u=0,c=a.$error={},l=[];a.$name=e.name||e.ngForm,a.$dirty=!1,a.$pristine=!0,a.$valid=!0,a.$invalid=!1,s.$addControl(a),t.addClass(Wi),i(!0),a.$addControl=function(t){re(t.$name,"input"),l.push(t),t.$name&&(a[t.$name]=t)},a.$removeControl=function(t){t.$name&&a[t.$name]===t&&delete a[t.$name],o(c,function(e,n){a.$setValidity(n,!0,t)}),D(l,t)},a.$setValidity=function(t,e,n){var r=c[t];if(e)r&&(D(r,n),r.length||(u--,u||(i(e),a.$valid=!0,a.$invalid=!1),c[t]=!1,i(!0,t),s.$setValidity(t,!0,a)));else{if(u||i(e),r){if(P(r,n))return}else c[t]=r=[],u++,i(!1,t),s.$setValidity(t,!1,a);r.push(n),a.$valid=!1,a.$invalid=!0}},a.$setDirty=function(){r.removeClass(t,Wi),r.addClass(t,Qi),a.$dirty=!0,a.$pristine=!1,s.$setDirty()},a.$setPristine=function(){r.removeClass(t,Qi),r.addClass(t,Wi),a.$dirty=!1,a.$pristine=!0,o(l,function(t){t.$setPristine()})}}function ir(t,e,r,i){return t.$setValidity(e,r),r?i:n}function or(t,e){var n,r;if(e)for(n=0;n<e.length;++n)if(r=e[n],t[r])return!0;return!1}function ar(t,e,n,r,i){if(y(i)){t.$$hasNativeValidators=!0;var o=function(o){return t.$error[e]||or(i,r)||!or(i,n)?o:void t.$setValidity(e,!1)};t.$parsers.push(o)}}function sr(t,e,n,i,o,a){var s=e.prop($r),u=e[0].placeholder,c={},l=dr(e[0].type);if(i.$$validityState=s,!o.android){var f=!1;e.on("compositionstart",function(){f=!0}),e.on("compositionend",function(){f=!1,p()})}var p=function(r){if(!f){var o=e.val();if(wr&&"input"===(r||c).type&&e[0].placeholder!==u)return void(u=e[0].placeholder);"password"!==l&&B(n.ngTrim||"T")&&(o=Pr(o));var a=s&&i.$$hasNativeValidators;(i.$viewValue!==o||""===o&&a)&&(t.$root.$$phase?i.$setViewValue(o):t.$apply(function(){i.$setViewValue(o)}))}};if(o.hasEvent("input"))e.on("input",p);else{var $,d=function(){$||($=a.defer(function(){p(),$=null}))};e.on("keydown",function(t){var e=t.keyCode;91===e||e>15&&19>e||e>=37&&40>=e||d()}),o.hasEvent("paste")&&e.on("paste cut",d)}e.on("change",p),i.$render=function(){e.val(i.$isEmpty(i.$viewValue)?"":i.$viewValue)};var v,g,m=n.ngPattern;if(m){var y=function(t,e){return ir(i,"pattern",i.$isEmpty(e)||t.test(e),e)};g=m.match(/^\/(.*)\/([gim]*)$/),g?(m=new RegExp(g[1],g[2]),v=function(t){return y(m,t)}):v=function(n){var i=t.$eval(m);if(!i||!i.test)throw r("ngPattern")("noregexp","Expected {0} to be a RegExp but was {1}. Element: {2}",m,i,z(e));return y(i,n)},i.$formatters.push(v),i.$parsers.push(v)}if(n.ngMinlength){var w=h(n.ngMinlength),b=function(t){return ir(i,"minlength",i.$isEmpty(t)||t.length>=w,t)};i.$parsers.push(b),i.$formatters.push(b)}if(n.ngMaxlength){var x=h(n.ngMaxlength),S=function(t){return ir(i,"maxlength",i.$isEmpty(t)||t.length<=x,t)};i.$parsers.push(S),i.$formatters.push(S)}}function ur(t,e,r,i,o,a){if(sr(t,e,r,i,o,a),i.$parsers.push(function(t){var e=i.$isEmpty(t);return e||Ii.test(t)?(i.$setValidity("number",!0),""===t?null:e?t:parseFloat(t)):(i.$setValidity("number",!1),n)}),ar(i,"number",Li,null,i.$$validityState),i.$formatters.push(function(t){return i.$isEmpty(t)?"":""+t}),r.min){var s=function(t){var e=parseFloat(r.min);return ir(i,"min",i.$isEmpty(t)||t>=e,t)};i.$parsers.push(s),i.$formatters.push(s)}if(r.max){var u=function(t){var e=parseFloat(r.max);return ir(i,"max",i.$isEmpty(t)||e>=t,t)};i.$parsers.push(u),i.$formatters.push(u)}i.$formatters.push(function(t){return ir(i,"number",i.$isEmpty(t)||b(t),t)})}function cr(t,e,n,r,i,o){sr(t,e,n,r,i,o);var a=function(t){return ir(r,"url",r.$isEmpty(t)||Ui.test(t),t)};r.$formatters.push(a),r.$parsers.push(a)}function lr(t,e,n,r,i,o){sr(t,e,n,r,i,o);var a=function(t){return ir(r,"email",r.$isEmpty(t)||Vi.test(t),t)};r.$formatters.push(a),r.$parsers.push(a)}function fr(t,e,n,r){g(n.name)&&e.attr("name",c()),e.on("click",function(){e[0].checked&&t.$apply(function(){r.$setViewValue(n.value)})}),r.$render=function(){var t=n.value;e[0].checked=t==r.$viewValue},n.$observe("value",r.$render)}function hr(t,e,n,r){var i=n.ngTrueValue,o=n.ngFalseValue;w(i)||(i=!0),w(o)||(o=!1),e.on("click",function(){t.$apply(function(){r.$setViewValue(e[0].checked)})}),r.$render=function(){e[0].checked=r.$viewValue},r.$isEmpty=function(t){return t!==i},r.$formatters.push(function(t){return t===i}),r.$parsers.push(function(t){return t?i:o})}function pr(t,e){return t="ngClass"+t,["$animate",function(n){function r(t,e){var n=[];t:for(var r=0;r<t.length;r++){for(var i=t[r],o=0;o<e.length;o++)if(i==e[o])continue t;n.push(i)}return n}function i(t){if(Nr(t))return t;if(w(t))return t.split(" ");if(y(t)){var e=[];return o(t,function(t,n){t&&(e=e.concat(n.split(" ")))}),e}return t}return{restrict:"AC",link:function(a,s,u){function c(t){var e=f(t,1);u.$addClass(e)}function l(t){var e=f(t,-1);u.$removeClass(e)}function f(t,e){var n=s.data("$classCounts")||{},r=[];return o(t,function(t){(e>0||n[t])&&(n[t]=(n[t]||0)+e,n[t]===+(e>0)&&r.push(t))}),s.data("$classCounts",n),r.join(" ")}function h(t,e){var i=r(e,t),o=r(t,e);o=f(o,-1),i=f(i,1),0===i.length?n.removeClass(s,o):0===o.length?n.addClass(s,i):n.setClass(s,i,o)}function p(t){if(e===!0||a.$index%2===e){var n=i(t||[]);if($){if(!q(t,$)){var r=i($);h(r,n)}}else c(n)}$=_(t)}var $;a.$watch(u[t],p,!0),u.$observe("class",function(){p(a.$eval(u[t]))}),"ngClass"!==t&&a.$watch("$index",function(n,r){var o=1&n;if(o!==(1&r)){var s=i(a.$eval(u[t]));o===e?c(s):l(s)}})}}}]}var $r="validity",dr=function(t){return w(t)?t.toLowerCase():t},vr=Object.prototype.hasOwnProperty,gr=function(t){return w(t)?t.toUpperCase():t},mr=function(t){return w(t)?t.replace(/[A-Z]/g,function(t){return String.fromCharCode(32|t.charCodeAt(0))}):t},yr=function(t){return w(t)?t.replace(/[a-z]/g,function(t){return String.fromCharCode(-33&t.charCodeAt(0))}):t};"i"!=="I".toLowerCase()&&(dr=mr,gr=yr);var wr,br,xr,Sr,Cr,kr=[].slice,Er=[].push,Ar=Object.prototype.toString,Or=r("ng"),Tr=t.angular||(t.angular={}),Mr=["0","0","0"];wr=h((/msie (\d+)/.exec(dr(navigator.userAgent))||[])[1]),isNaN(wr)&&(wr=h((/trident\/.*; rv:(\d+)/.exec(dr(navigator.userAgent))||[])[1])),$.$inject=[],d.$inject=[];var Nr=function(){return S(Array.isArray)?Array.isArray:function(t){return"[object Array]"===Ar.call(t)}}(),Pr=function(){return String.prototype.trim?function(t){return w(t)?t.trim():t}:function(t){return w(t)?t.replace(/^\s\s*/,"").replace(/\s\s*$/,""):t}}();Cr=9>wr?function(t){return t=t.nodeName?t:t[0],t.scopeName&&"HTML"!=t.scopeName?gr(t.scopeName+":"+t.nodeName):t.nodeName}:function(t){return t.nodeName?t.nodeName:t[0].nodeName};var jr=function(){if(m(jr.isActive_))return jr.isActive_;var t=!(!e.querySelector("[ng-csp]")&&!e.querySelector("[data-ng-csp]"));if(!t)try{new Function("")}catch(n){t=!0}return jr.isActive_=t},Dr=/[A-Z]/g,Rr={full:"1.2.28",major:1,minor:2,dot:28,codeName:"finnish-disembarkation"};$e.expando="ng339";var _r=$e.cache={},qr=1,Ur=t.document.addEventListener?function(t,e,n){t.addEventListener(e,n,!1)}:function(t,e,n){t.attachEvent("on"+e,n)},Vr=t.document.removeEventListener?function(t,e,n){t.removeEventListener(e,n,!1)}:function(t,e,n){t.detachEvent("on"+e,n)},Ir=($e._data=function(t){return this.cache[t[this.expando]]||{}},/([\:\-\_]+(.))/g),Fr=/^moz([A-Z])/,Lr=r("jqLite"),Hr=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Br=/<|&#?\w+;/,zr=/<([\w:]+)/,Wr=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Qr={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Qr.optgroup=Qr.option,Qr.tbody=Qr.tfoot=Qr.colgroup=Qr.caption=Qr.thead,Qr.th=Qr.td;var Jr=$e.prototype={ready:function(n){function r(){i||(i=!0,n())}var i=!1;"complete"===e.readyState?setTimeout(r):(this.on("DOMContentLoaded",r),$e(t).on("load",r))},toString:function(){var t=[];return o(this,function(e){t.push(""+e)}),"["+t.join(", ")+"]"},eq:function(t){return br(t>=0?this[t]:this[this.length+t])},length:0,push:Er,sort:[].sort,splice:[].splice},Gr={};o("multiple,selected,checked,disabled,readOnly,required,open".split(","),function(t){Gr[dr(t)]=t});var Xr={};o("input,select,option,textarea,button,form,details".split(","),function(t){Xr[gr(t)]=!0}),o({data:we,removeData:me},function(t,e){$e[e]=t}),o({data:we,inheritedData:Ee,scope:function(t){return br.data(t,"$scope")||Ee(t.parentNode||t,["$isolateScope","$scope"])},isolateScope:function(t){return br.data(t,"$isolateScope")||br.data(t,"$isolateScopeNoTemplate")},controller:ke,injector:function(t){return Ee(t,"$injector")},removeAttr:function(t,e){t.removeAttribute(e)},hasClass:be,css:function(t,e,r){if(e=ce(e),!m(r)){var i;return 8>=wr&&(i=t.currentStyle&&t.currentStyle[e],""===i&&(i="auto")),i=i||t.style[e],8>=wr&&(i=""===i?n:i),i}t.style[e]=r},attr:function(t,e,r){var i=dr(e);if(Gr[i]){if(!m(r))return t[e]||(t.attributes.getNamedItem(e)||$).specified?i:n;r?(t[e]=!0,t.setAttribute(e,i)):(t[e]=!1,t.removeAttribute(i))}else if(m(r))t.setAttribute(e,r);else if(t.getAttribute){var o=t.getAttribute(e,2);return null===o?n:o}},prop:function(t,e,n){return m(n)?void(t[e]=n):t[e]},text:function(){function t(t,n){var r=e[t.nodeType];return g(n)?r?t[r]:"":void(t[r]=n)}var e=[];return 9>wr?(e[1]="innerText",e[3]="nodeValue"):e[1]=e[3]="textContent",t.$dv="",t}(),val:function(t,e){if(g(e)){if("SELECT"===Cr(t)&&t.multiple){var n=[];return o(t.options,function(t){t.selected&&n.push(t.value||t.text)}),0===n.length?null:n}return t.value}t.value=e},html:function(t,e){if(g(e))return t.innerHTML;for(var n=0,r=t.childNodes;n<r.length;n++)ve(r[n]);t.innerHTML=e},empty:Ae},function(t,e){$e.prototype[e]=function(e,r){var i,o,a=this.length;if(t!==Ae&&(2==t.length&&t!==be&&t!==ke?e:r)===n){if(y(e)){for(i=0;a>i;i++)if(t===we)t(this[i],e);else for(o in e)t(this[i],o,e[o]);return this}for(var s=t.$dv,u=s===n?Math.min(a,1):a,c=0;u>c;c++){var l=t(this[c],e,r);s=s?s+l:l}return s}for(i=0;a>i;i++)t(this[i],e,r);return this}}),o({removeData:me,dealoc:ve,on:function Po(t,n,r,i){if(m(i))throw Lr("onargs","jqLite#on() does not support the `selector` or `eventData` parameters");var a=ye(t,"events"),s=ye(t,"handle");a||ye(t,"events",a={}),s||ye(t,"handle",s=Te(t,a)),o(n.split(" "),function(n){var i=a[n];if(!i){if("mouseenter"==n||"mouseleave"==n){var o=e.body.contains||e.body.compareDocumentPosition?function(t,e){var n=9===t.nodeType?t.documentElement:t,r=e&&e.parentNode;return t===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):t.compareDocumentPosition&&16&t.compareDocumentPosition(r)))}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1};a[n]=[];var u={mouseleave:"mouseout",mouseenter:"mouseover"};Po(t,u[n],function(t){var e=this,r=t.relatedTarget;(!r||r!==e&&!o(e,r))&&s(t,n)})}else Ur(t,n,s),a[n]=[];i=a[n]}i.push(r)})},off:ge,one:function(t,e,n){t=br(t),t.on(e,function r(){t.off(e,n),t.off(e,r)}),t.on(e,n)},replaceWith:function(t,e){var n,r=t.parentNode;ve(t),o(new $e(e),function(e){n?r.insertBefore(e,n.nextSibling):r.replaceChild(e,t),n=e})},children:function(t){var e=[];return o(t.childNodes,function(t){1===t.nodeType&&e.push(t)}),e},contents:function(t){return t.contentDocument||t.childNodes||[]},append:function(t,e){o(new $e(e),function(e){(1===t.nodeType||11===t.nodeType)&&t.appendChild(e)})},prepend:function(t,e){if(1===t.nodeType){var n=t.firstChild;o(new $e(e),function(e){t.insertBefore(e,n)})}},wrap:function(t,e){e=br(e)[0];var n=t.parentNode;n&&n.replaceChild(e,t),e.appendChild(t)},remove:function(t){ve(t);var e=t.parentNode;e&&e.removeChild(t)},after:function(t,e){var n=t,r=t.parentNode;o(new $e(e),function(t){r.insertBefore(t,n.nextSibling),n=t})},addClass:Se,removeClass:xe,toggleClass:function(t,e,n){e&&o(e.split(" "),function(e){var r=n;g(r)&&(r=!be(t,e)),(r?Se:xe)(t,e)})},parent:function(t){var e=t.parentNode;return e&&11!==e.nodeType?e:null},next:function(t){if(t.nextElementSibling)return t.nextElementSibling;for(var e=t.nextSibling;null!=e&&1!==e.nodeType;)e=e.nextSibling;return e},find:function(t,e){return t.getElementsByTagName?t.getElementsByTagName(e):[]},clone:de,triggerHandler:function(t,e,n){var r,i,a,s=e.type||e,u=(ye(t,"events")||{})[s];u&&(r={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return this.defaultPrevented===!0},stopPropagation:$,type:s,target:t},e.type&&(r=f(r,e)),i=_(u),a=n?[r].concat(n):[r],o(i,function(e){e.apply(t,a)}))}},function(t,e){$e.prototype[e]=function(e,n,r){for(var i,o=0;o<this.length;o++)g(i)?(i=t(this[o],e,n,r),m(i)&&(i=br(i))):Ce(i,t(this[o],e,n,r));return m(i)?i:this},$e.prototype.bind=$e.prototype.on,$e.prototype.unbind=$e.prototype.off}),Ne.prototype={put:function(t,e){this[Me(t,this.nextUid)]=e},get:function(t){return this[Me(t,this.nextUid)]},remove:function(t){var e=this[t=Me(t,this.nextUid)];return delete this[t],e}};var Kr=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,Yr=/,/,Zr=/^\s*(_?)(\S+?)\1\s*$/,ti=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,ei=r("$injector"),ni=r("$animate"),ri=["$provide",function(t){this.$$selectors={},this.register=function(e,n){var r=e+"-animation";if(e&&"."!=e.charAt(0))throw ni("notcsel","Expecting class selector starting with '.' got '{0}'.",e);this.$$selectors[e.substr(1)]=r,t.factory(r,n)},this.classNameFilter=function(t){return 1===arguments.length&&(this.$$classNameFilter=t instanceof RegExp?t:null),this.$$classNameFilter},this.$get=["$timeout","$$asyncCallback",function(t,e){function n(t){t&&e(t)}return{enter:function(t,e,r,i){r?r.after(t):(e&&e[0]||(e=r.parent()),e.append(t)),n(i)},leave:function(t,e){t.remove(),n(e)},move:function(t,e,n,r){this.enter(t,e,n,r)},addClass:function(t,e,r){e=w(e)?e:Nr(e)?e.join(" "):"",o(t,function(t){Se(t,e)}),n(r)},removeClass:function(t,e,r){e=w(e)?e:Nr(e)?e.join(" "):"",o(t,function(t){xe(t,e)}),n(r)},setClass:function(t,e,r,i){o(t,function(t){Se(t,e),xe(t,r)}),n(i)},enabled:$}}]}],ii=r("$compile");Ie.$inject=["$provide","$$sanitizeUriProvider"];var oi=/^(x[\:\-_]|data[\:\-_])/i,ai=r("$interpolate"),si=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,ui={http:80,https:443,ftp:21},ci=r("$location");pn.prototype=hn.prototype=fn.prototype={$$html5:!1,$$replace:!1,absUrl:$n("$$absUrl"),url:function(t){if(g(t))return this.$$url;var e=si.exec(t);return e[1]&&this.path(decodeURIComponent(e[1])),(e[2]||e[1])&&this.search(e[3]||""),this.hash(e[5]||""),this},protocol:$n("$$protocol"),host:$n("$$host"),port:$n("$$port"),path:dn("$$path",function(t){return t=null!==t?t.toString():"","/"==t.charAt(0)?t:"/"+t}),search:function(t,e){switch(arguments.length){case 0:return this.$$search;case 1:if(w(t)||b(t))t=t.toString(),this.$$search=Q(t);else{if(!y(t))throw ci("isrcharg","The first argument of the `$location#search()` call must be a string or an object.");o(t,function(e,n){null==e&&delete t[n]}),this.$$search=t}break;default:g(e)||null===e?delete this.$$search[t]:this.$$search[t]=e}return this.$$compose(),this},hash:dn("$$hash",function(t){return null!==t?t.toString():""}),replace:function(){return this.$$replace=!0,this}};var li,fi=r("$parse"),hi={},pi=Function.prototype.call,$i=Function.prototype.apply,di=Function.prototype.bind,vi={"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:$,"+":function(t,e,r,i){return r=r(t,e),i=i(t,e),m(r)?m(i)?r+i:r:m(i)?i:n},"-":function(t,e,n,r){return n=n(t,e),r=r(t,e),(m(n)?n:0)-(m(r)?r:0)},"*":function(t,e,n,r){return n(t,e)*r(t,e)},"/":function(t,e,n,r){return n(t,e)/r(t,e)},"%":function(t,e,n,r){return n(t,e)%r(t,e)},"^":function(t,e,n,r){return n(t,e)^r(t,e)},"=":$,"===":function(t,e,n,r){return n(t,e)===r(t,e)},"!==":function(t,e,n,r){return n(t,e)!==r(t,e)},"==":function(t,e,n,r){return n(t,e)==r(t,e)},"!=":function(t,e,n,r){return n(t,e)!=r(t,e)},"<":function(t,e,n,r){return n(t,e)<r(t,e)},">":function(t,e,n,r){return n(t,e)>r(t,e)},"<=":function(t,e,n,r){return n(t,e)<=r(t,e)},">=":function(t,e,n,r){return n(t,e)>=r(t,e)},"&&":function(t,e,n,r){return n(t,e)&&r(t,e)},"||":function(t,e,n,r){return n(t,e)||r(t,e)},"&":function(t,e,n,r){return n(t,e)&r(t,e)},"|":function(t,e,n,r){return r(t,e)(t,e,n(t,e))},"!":function(t,e,n){return!n(t,e)}},gi={n:"\n",f:"\f",r:"\r",t:"	",v:"","'":"'",'"':'"'},mi=function(t){this.options=t};mi.prototype={constructor:mi,lex:function(t){for(this.text=t,this.index=0,this.ch=n,this.lastCh=":",this.tokens=[];this.index<this.text.length;){if(this.ch=this.text.charAt(this.index),this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent();else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch}),this.index++;else{if(this.isWhitespace(this.ch)){this.index++;continue}var e=this.ch+this.peek(),r=e+this.peek(2),i=vi[this.ch],o=vi[e],a=vi[r];a?(this.tokens.push({index:this.index,text:r,fn:a}),this.index+=3):o?(this.tokens.push({index:this.index,text:e,fn:o}),this.index+=2):i?(this.tokens.push({index:this.index,text:this.ch,fn:i}),this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+1)}this.lastCh=this.ch}return this.tokens},is:function(t){return-1!==t.indexOf(this.ch)},was:function(t){return-1!==t.indexOf(this.lastCh)},peek:function(t){var e=t||1;return this.index+e<this.text.length?this.text.charAt(this.index+e):!1},isNumber:function(t){return t>="0"&&"9">=t},isWhitespace:function(t){return" "===t||"\r"===t||"	"===t||"\n"===t||""===t||" "===t},isIdent:function(t){return t>="a"&&"z">=t||t>="A"&&"Z">=t||"_"===t||"$"===t},isExpOperator:function(t){return"-"===t||"+"===t||this.isNumber(t)},throwError:function(t,e,n){n=n||this.index;var r=m(e)?"s "+e+"-"+this.index+" ["+this.text.substring(e,n)+"]":" "+n;throw fi("lexerr","Lexer Error: {0} at column{1} in expression [{2}].",t,r,this.text)},readNumber:function(){for(var t="",e=this.index;this.index<this.text.length;){var n=dr(this.text.charAt(this.index));if("."==n||this.isNumber(n))t+=n;else{var r=this.peek();if("e"==n&&this.isExpOperator(r))t+=n;else if(this.isExpOperator(n)&&r&&this.isNumber(r)&&"e"==t.charAt(t.length-1))t+=n;else{if(!this.isExpOperator(n)||r&&this.isNumber(r)||"e"!=t.charAt(t.length-1))break;this.throwError("Invalid exponent")}}this.index++}t=1*t,this.tokens.push({index:e,text:t,literal:!0,constant:!0,fn:function(){return t}})},readIdent:function(){for(var t,e,n,r,i=this,o="",a=this.index;this.index<this.text.length&&(r=this.text.charAt(this.index),"."===r||this.isIdent(r)||this.isNumber(r));)"."===r&&(t=this.index),o+=r,this.index++;if(t)for(e=this.index;e<this.text.length;){if(r=this.text.charAt(e),"("===r){n=o.substr(t-a+1),o=o.substr(0,t-a),this.index=e;break}if(!this.isWhitespace(r))break;e++}var s={index:a,text:o};if(vi.hasOwnProperty(o))s.fn=vi[o],s.literal=!0,s.constant=!0;else{var u=kn(o,this.options,this.text);s.fn=f(function(t,e){return u(t,e)},{assign:function(t,e){return bn(t,o,e,i.text,i.options)}})}this.tokens.push(s),n&&(this.tokens.push({index:t,text:"."}),this.tokens.push({index:t+1,text:n}))},readString:function(t){var e=this.index;this.index++;for(var n="",r=t,i=!1;this.index<this.text.length;){var o=this.text.charAt(this.index);if(r+=o,i){if("u"===o){var a=this.text.substring(this.index+1,this.index+5);a.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+a+"]"),this.index+=4,n+=String.fromCharCode(parseInt(a,16))}else{var s=gi[o];n+=s||o}i=!1}else if("\\"===o)i=!0;else{if(o===t)return this.index++,void this.tokens.push({index:e,text:r,string:n,literal:!0,constant:!0,fn:function(){return n}});n+=o}this.index++}this.throwError("Unterminated quote",e)}};var yi=function(t,e,n){this.lexer=t,this.$filter=e,this.options=n};yi.ZERO=f(function(){return 0},{constant:!0}),yi.prototype={constructor:yi,parse:function(t){this.text=t,this.tokens=this.lexer.lex(t);var e=this.statements();return 0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]),e.literal=!!e.literal,e.constant=!!e.constant,e},primary:function(){var t;if(this.expect("("))t=this.filterChain(),this.consume(")");else if(this.expect("["))t=this.arrayDeclaration();else if(this.expect("{"))t=this.object();else{var e=this.expect();t=e.fn,t||this.throwError("not a primary expression",e),t.literal=!!e.literal,t.constant=!!e.constant}for(var n,r;n=this.expect("(","[",".");)"("===n.text?(t=this.functionCall(t,r),r=null):"["===n.text?(r=t,t=this.objectIndex(t)):"."===n.text?(r=t,t=this.fieldAccess(t)):this.throwError("IMPOSSIBLE");return t},throwError:function(t,e){throw fi("syntax","Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].",e.text,t,e.index+1,this.text,this.text.substring(e.index))},peekToken:function(){if(0===this.tokens.length)throw fi("ueoe","Unexpected end of expression: {0}",this.text);return this.tokens[0]},peek:function(t,e,n,r){if(this.tokens.length>0){var i=this.tokens[0],o=i.text;if(o===t||o===e||o===n||o===r||!t&&!e&&!n&&!r)return i}return!1},expect:function(t,e,n,r){var i=this.peek(t,e,n,r);return i?(this.tokens.shift(),i):!1},consume:function(t){this.expect(t)||this.throwError("is unexpected, expecting ["+t+"]",this.peek())},unaryFn:function(t,e){return f(function(n,r){return t(n,r,e)},{constant:e.constant})},ternaryFn:function(t,e,n){return f(function(r,i){return t(r,i)?e(r,i):n(r,i)},{constant:t.constant&&e.constant&&n.constant})},binaryFn:function(t,e,n){return f(function(r,i){return e(r,i,t,n)},{constant:t.constant&&n.constant})},statements:function(){for(var t=[];;)if(this.tokens.length>0&&!this.peek("}",")",";","]")&&t.push(this.filterChain()),!this.expect(";"))return 1===t.length?t[0]:function(e,n){for(var r,i=0;i<t.length;i++){var o=t[i];o&&(r=o(e,n))}return r}},filterChain:function(){for(var t,e=this.expression();;){if(!(t=this.expect("|")))return e;e=this.binaryFn(e,t.fn,this.filter())}},filter:function(){for(var t=this.expect(),e=this.$filter(t.text),n=[];;){if(!(t=this.expect(":"))){var r=function(t,r,i){for(var o=[i],a=0;a<n.length;a++)o.push(n[a](t,r));return e.apply(t,o)};return function(){return r}}n.push(this.expression())}},expression:function(){return this.assignment()},assignment:function(){var t,e,n=this.ternary();return(e=this.expect("="))?(n.assign||this.throwError("implies assignment but ["+this.text.substring(0,e.index)+"] can not be assigned to",e),t=this.ternary(),function(e,r){return n.assign(e,t(e,r),r)}):n},ternary:function(){var t,e,n=this.logicalOR();return(e=this.expect("?"))?(t=this.assignment(),(e=this.expect(":"))?this.ternaryFn(n,t,this.assignment()):void this.throwError("expected :",e)):n},logicalOR:function(){for(var t,e=this.logicalAND();;){if(!(t=this.expect("||")))return e;e=this.binaryFn(e,t.fn,this.logicalAND())}},logicalAND:function(){var t,e=this.equality();return(t=this.expect("&&"))&&(e=this.binaryFn(e,t.fn,this.logicalAND())),e},equality:function(){var t,e=this.relational();return(t=this.expect("==","!=","===","!=="))&&(e=this.binaryFn(e,t.fn,this.equality())),e},relational:function(){var t,e=this.additive();return(t=this.expect("<",">","<=",">="))&&(e=this.binaryFn(e,t.fn,this.relational())),e},additive:function(){for(var t,e=this.multiplicative();t=this.expect("+","-");)e=this.binaryFn(e,t.fn,this.multiplicative());return e},multiplicative:function(){for(var t,e=this.unary();t=this.expect("*","/","%");)e=this.binaryFn(e,t.fn,this.unary());return e},unary:function(){var t;return this.expect("+")?this.primary():(t=this.expect("-"))?this.binaryFn(yi.ZERO,t.fn,this.unary()):(t=this.expect("!"))?this.unaryFn(t.fn,this.unary()):this.primary()},fieldAccess:function(t){var e=this,n=this.expect().text,r=kn(n,this.options,this.text);return f(function(e,n,i){return r(i||t(e,n))},{assign:function(r,i,o){var a=t(r,o);return a||t.assign(r,a={}),bn(a,n,i,e.text,e.options)}})},objectIndex:function(t){var e=this,r=this.expression();return this.consume("]"),f(function(i,o){var a,s,u=t(i,o),c=r(i,o);return mn(c,e.text),u?(a=yn(u[c],e.text),a&&a.then&&e.options.unwrapPromises&&(s=a,"$$v"in a||(s.$$v=n,s.then(function(t){s.$$v=t})),a=a.$$v),a):n},{assign:function(n,i,o){var a=mn(r(n,o),e.text),s=yn(t(n,o),e.text);return s||t.assign(n,s={}),s[a]=i}})},functionCall:function(t,e){var n=[];if(")"!==this.peekToken().text)do n.push(this.expression());while(this.expect(","));this.consume(")");var r=this;return function(i,o){for(var a=[],s=e?e(i,o):i,u=0;u<n.length;u++)a.push(yn(n[u](i,o),r.text));var c=t(i,o,s)||$;yn(s,r.text),wn(c,r.text);var l=c.apply?c.apply(s,a):c(a[0],a[1],a[2],a[3],a[4]);return yn(l,r.text)}},arrayDeclaration:function(){var t=[],e=!0;if("]"!==this.peekToken().text)do{if(this.peek("]"))break;var n=this.expression();t.push(n),n.constant||(e=!1)}while(this.expect(","));return this.consume("]"),f(function(e,n){for(var r=[],i=0;i<t.length;i++)r.push(t[i](e,n));return r},{literal:!0,constant:e})},object:function(){var t=[],e=!0;if("}"!==this.peekToken().text)do{if(this.peek("}"))break;var n=this.expect(),r=n.string||n.text;this.consume(":");var i=this.expression();t.push({key:r,value:i}),i.constant||(e=!1)}while(this.expect(","));return this.consume("}"),f(function(e,n){for(var r={},i=0;i<t.length;i++){var o=t[i];r[o.key]=o.value(e,n)}return r},{literal:!0,constant:e})}};var wi={},bi={},xi=r("$sce"),Si={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},Ci=e.createElement("a"),ki=Vn(t.location.href,!0);Ln.$inject=["$provide"],Bn.$inject=["$locale"],zn.$inject=["$locale"];var Ei=".",Ai={yyyy:Jn("FullYear",4),yy:Jn("FullYear",2,0,!0),y:Jn("FullYear",1),MMMM:Gn("Month"),MMM:Gn("Month",!0),MM:Jn("Month",2,1),M:Jn("Month",1,1),dd:Jn("Date",2),d:Jn("Date",1),HH:Jn("Hours",2),H:Jn("Hours",1),hh:Jn("Hours",2,-12),h:Jn("Hours",1,-12),mm:Jn("Minutes",2),m:Jn("Minutes",1),ss:Jn("Seconds",2),s:Jn("Seconds",1),sss:Jn("Milliseconds",3),EEEE:Gn("Day"),EEE:Gn("Day",!0),a:Kn,Z:Xn},Oi=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,Ti=/^\-?\d+$/;
Yn.$inject=["$locale"];var Mi=v(dr),Ni=v(gr);er.$inject=["$parse"];var Pi=v({restrict:"E",compile:function(t,n){return 8>=wr&&(n.href||n.name||n.$set("href",""),t.append(e.createComment("IE fix"))),n.href||n.xlinkHref||n.name?void 0:function(t,e){var n="[object SVGAnimatedString]"===Ar.call(e.prop("href"))?"xlink:href":"href";e.on("click",function(t){e.attr(n)||t.preventDefault()})}}}),ji={};o(Gr,function(t,e){if("multiple"!=t){var n=Fe("ng-"+e);ji[n]=function(){return{priority:100,link:function(t,r,i){t.$watch(i[n],function(t){i.$set(e,!!t)})}}}}}),o(["src","srcset","href"],function(t){var e=Fe("ng-"+t);ji[e]=function(){return{priority:99,link:function(n,r,i){var o=t,a=t;"href"===t&&"[object SVGAnimatedString]"===Ar.call(r.prop("href"))&&(a="xlinkHref",i.$attr[a]="xlink:href",o=null),i.$observe(e,function(e){return e?(i.$set(a,e),void(wr&&o&&r.prop(o,i[a]))):void("href"===t&&i.$set(a,null))})}}}});var Di={$addControl:$,$removeControl:$,$setValidity:$,$setDirty:$,$setPristine:$};rr.$inject=["$element","$attrs","$scope","$animate"];var Ri=function(t){return["$timeout",function(e){var r={name:"form",restrict:t?"EAC":"E",controller:rr,compile:function(){return{pre:function(t,r,i,o){if(!i.action){var a=function(t){t.preventDefault?t.preventDefault():t.returnValue=!1};Ur(r[0],"submit",a),r.on("$destroy",function(){e(function(){Vr(r[0],"submit",a)},0,!1)})}var s=r.parent().controller("form"),u=i.name||i.ngForm;u&&bn(t,u,o,u),s&&r.on("$destroy",function(){s.$removeControl(o),u&&bn(t,u,n,u),f(o,Di)})}}}};return r}]},_i=Ri(),qi=Ri(!0),Ui=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,Vi=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,Ii=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,Fi={text:sr,number:ur,url:cr,email:lr,radio:fr,checkbox:hr,hidden:$,button:$,submit:$,reset:$,file:$},Li=["badInput"],Hi=["$browser","$sniffer",function(t,e){return{restrict:"E",require:"?ngModel",link:function(n,r,i,o){o&&(Fi[dr(i.type)]||Fi.text)(n,r,i,o,e,t)}}}],Bi="ng-valid",zi="ng-invalid",Wi="ng-pristine",Qi="ng-dirty",Ji=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate",function(t,e,n,i,a,s){function u(t,e){e=e?"-"+Z(e,"-"):"",s.removeClass(i,(t?zi:Bi)+e),s.addClass(i,(t?Bi:zi)+e)}this.$viewValue=Number.NaN,this.$modelValue=Number.NaN,this.$parsers=[],this.$formatters=[],this.$viewChangeListeners=[],this.$pristine=!0,this.$dirty=!1,this.$valid=!0,this.$invalid=!1,this.$name=n.name;var c=a(n.ngModel),l=c.assign;if(!l)throw r("ngModel")("nonassign","Expression '{0}' is non-assignable. Element: {1}",n.ngModel,z(i));this.$render=$,this.$isEmpty=function(t){return g(t)||""===t||null===t||t!==t};var f=i.inheritedData("$formController")||Di,h=0,p=this.$error={};i.addClass(Wi),u(!0),this.$setValidity=function(t,e){p[t]!==!e&&(e?(p[t]&&h--,h||(u(!0),this.$valid=!0,this.$invalid=!1)):(u(!1),this.$invalid=!0,this.$valid=!1,h++),p[t]=!e,u(e,t),f.$setValidity(t,e,this))},this.$setPristine=function(){this.$dirty=!1,this.$pristine=!0,s.removeClass(i,Qi),s.addClass(i,Wi)},this.$setViewValue=function(n){this.$viewValue=n,this.$pristine&&(this.$dirty=!0,this.$pristine=!1,s.removeClass(i,Wi),s.addClass(i,Qi),f.$setDirty()),o(this.$parsers,function(t){n=t(n)}),this.$modelValue!==n&&(this.$modelValue=n,l(t,n),o(this.$viewChangeListeners,function(t){try{t()}catch(n){e(n)}}))};var d=this;t.$watch(function(){var e=c(t);if(d.$modelValue!==e){var n=d.$formatters,r=n.length;for(d.$modelValue=e;r--;)e=n[r](e);d.$viewValue!==e&&(d.$viewValue=e,d.$render())}return e})}],Gi=function(){return{require:["ngModel","^?form"],controller:Ji,link:function(t,e,n,r){var i=r[0],o=r[1]||Di;o.$addControl(i),t.$on("$destroy",function(){o.$removeControl(i)})}}},Xi=v({require:"ngModel",link:function(t,e,n,r){r.$viewChangeListeners.push(function(){t.$eval(n.ngChange)})}}),Ki=function(){return{require:"?ngModel",link:function(t,e,n,r){if(r){n.required=!0;var i=function(t){return n.required&&r.$isEmpty(t)?void r.$setValidity("required",!1):(r.$setValidity("required",!0),t)};r.$formatters.push(i),r.$parsers.unshift(i),n.$observe("required",function(){i(r.$viewValue)})}}}},Yi=function(){return{require:"ngModel",link:function(t,e,r,i){var a=/\/(.*)\//.exec(r.ngList),s=a&&new RegExp(a[1])||r.ngList||",",u=function(t){if(!g(t)){var e=[];return t&&o(t.split(s),function(t){t&&e.push(Pr(t))}),e}};i.$parsers.push(u),i.$formatters.push(function(t){return Nr(t)?t.join(", "):n}),i.$isEmpty=function(t){return!t||!t.length}}}},Zi=/^(true|false|\d+)$/,to=function(){return{priority:100,compile:function(t,e){return Zi.test(e.ngValue)?function(t,e,n){n.$set("value",t.$eval(n.ngValue))}:function(t,e,n){t.$watch(n.ngValue,function(t){n.$set("value",t)})}}}},eo=nr({compile:function(t){return t.addClass("ng-binding"),function(t,e,r){e.data("$binding",r.ngBind),t.$watch(r.ngBind,function(t){e.text(t==n?"":t)})}}}),no=["$interpolate",function(t){return function(e,n,r){var i=t(n.attr(r.$attr.ngBindTemplate));n.addClass("ng-binding").data("$binding",i),r.$observe("ngBindTemplate",function(t){n.text(t)})}}],ro=["$sce","$parse",function(t,e){return{compile:function(n){return n.addClass("ng-binding"),function(n,r,i){function o(){return(a(n)||"").toString()}r.data("$binding",i.ngBindHtml);var a=e(i.ngBindHtml);n.$watch(o,function(){r.html(t.getTrustedHtml(a(n))||"")})}}}}],io=pr("",!0),oo=pr("Odd",0),ao=pr("Even",1),so=nr({compile:function(t,e){e.$set("ngCloak",n),t.removeClass("ng-cloak")}}),uo=[function(){return{scope:!0,controller:"@",priority:500}}],co={},lo={blur:!0,focus:!0};o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(t){var e=Fe("ng-"+t);co[e]=["$parse","$rootScope",function(n,r){return{compile:function(i,o){var a=n(o[e],!0);return function(e,n){n.on(t,function(n){var i=function(){a(e,{$event:n})};lo[t]&&r.$$phase?e.$evalAsync(i):e.$apply(i)})}}}}]});var fo=["$animate",function(t){return{transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(n,r,i,o,a){var s,u,c;n.$watch(i.ngIf,function(o){B(o)?u||(u=n.$new(),a(u,function(n){n[n.length++]=e.createComment(" end ngIf: "+i.ngIf+" "),s={clone:n},t.enter(n,r.parent(),r)})):(c&&(c.remove(),c=null),u&&(u.$destroy(),u=null),s&&(c=oe(s.clone),t.leave(c,function(){c=null}),s=null))})}}}],ho=["$http","$templateCache","$anchorScroll","$animate","$sce",function(t,e,n,r,i){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:Tr.noop,compile:function(o,a){var s=a.ngInclude||a.src,u=a.onload||"",c=a.autoscroll;return function(o,a,l,f,h){var p,$,d,v=0,g=function(){$&&($.remove(),$=null),p&&(p.$destroy(),p=null),d&&(r.leave(d,function(){$=null}),$=d,d=null)};o.$watch(i.parseAsResourceUrl(s),function(i){var s=function(){!m(c)||c&&!o.$eval(c)||n()},l=++v;i?(t.get(i,{cache:e}).success(function(t){if(l===v){var e=o.$new();f.template=t;var n=h(e,function(t){g(),r.enter(t,null,a,s)});p=e,d=n,p.$emit("$includeContentLoaded"),o.$eval(u)}}).error(function(){l===v&&g()}),o.$emit("$includeContentRequested")):(g(),f.template=null)})}}}}],po=["$compile",function(t){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(e,n,r,i){n.html(i.template),t(n.contents())(e)}}}],$o=nr({priority:450,compile:function(){return{pre:function(t,e,n){t.$eval(n.ngInit)}}}}),vo=nr({terminal:!0,priority:1e3}),go=["$locale","$interpolate",function(t,e){var n=/{}/g;return{restrict:"EA",link:function(r,i,a){var s=a.count,u=a.$attr.when&&i.attr(a.$attr.when),c=a.offset||0,l=r.$eval(u)||{},f={},h=e.startSymbol(),p=e.endSymbol(),$=/^when(Minus)?(.+)$/;o(a,function(t,e){$.test(e)&&(l[dr(e.replace("when","").replace("Minus","-"))]=i.attr(a.$attr[e]))}),o(l,function(t,r){f[r]=e(t.replace(n,h+s+"-"+c+p))}),r.$watch(function(){var e=parseFloat(r.$eval(s));return isNaN(e)?"":(e in l||(e=t.pluralCat(e-c)),f[e](r,i,!0))},function(t){i.text(t)})}}}],mo=["$parse","$animate",function(t,n){function a(t){return t.clone[0]}function s(t){return t.clone[t.clone.length-1]}var u="$$NG_REMOVED",c=r("ngRepeat");return{transclude:"element",priority:1e3,terminal:!0,$$tlb:!0,link:function(r,l,f,h,p){var $,d,v,g,m,y,w,b,x,S=f.ngRepeat,C=S.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),k={$id:Me};if(!C)throw c("iexp","Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",S);if(y=C[1],w=C[2],$=C[3],$?(d=t($),v=function(t,e,n){return x&&(k[x]=t),k[b]=e,k.$index=n,d(r,k)}):(g=function(t,e){return Me(e)},m=function(t){return t}),C=y.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/),!C)throw c("iidexp","'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.",y);b=C[3]||C[1],x=C[2];var E={};r.$watchCollection(w,function(t){var f,h,$,d,y,w,C,k,A,O,T,M,N=l[0],P={},j=[];if(i(t))O=t,A=v||g;else{A=v||m,O=[];for(w in t)t.hasOwnProperty(w)&&"$"!=w.charAt(0)&&O.push(w);O.sort()}for(d=O.length,h=j.length=O.length,f=0;h>f;f++)if(w=t===O?f:O[f],C=t[w],k=A(w,C,f),re(k,"`track by` id"),E.hasOwnProperty(k))T=E[k],delete E[k],P[k]=T,j[f]=T;else{if(P.hasOwnProperty(k))throw o(j,function(t){t&&t.scope&&(E[t.id]=t)}),c("dupes","Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}",S,k,L(C));j[f]={id:k},P[k]=!1}for(w in E)E.hasOwnProperty(w)&&(T=E[w],M=oe(T.clone),n.leave(M),o(M,function(t){t[u]=!0}),T.scope.$destroy());for(f=0,h=O.length;h>f;f++){if(w=t===O?f:O[f],C=t[w],T=j[f],j[f-1]&&(N=s(j[f-1])),T.scope){y=T.scope,$=N;do $=$.nextSibling;while($&&$[u]);a(T)!=$&&n.move(oe(T.clone),null,br(N)),N=s(T)}else y=r.$new();y[b]=C,x&&(y[x]=w),y.$index=f,y.$first=0===f,y.$last=f===d-1,y.$middle=!(y.$first||y.$last),y.$odd=!(y.$even=0===(1&f)),T.scope||p(y,function(t){t[t.length++]=e.createComment(" end ngRepeat: "+S+" "),n.enter(t,null,br(N)),N=t,T.scope=y,T.clone=t,P[T.id]=T})}E=P})}}}],yo=["$animate",function(t){return function(e,n,r){e.$watch(r.ngShow,function(e){t[B(e)?"removeClass":"addClass"](n,"ng-hide")})}}],wo=["$animate",function(t){return function(e,n,r){e.$watch(r.ngHide,function(e){t[B(e)?"addClass":"removeClass"](n,"ng-hide")})}}],bo=nr(function(t,e,n){t.$watch(n.ngStyle,function(t,n){n&&t!==n&&o(n,function(t,n){e.css(n,"")}),t&&e.css(t)},!0)}),xo=["$animate",function(t){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(e,n,r,i){var a=r.ngSwitch||r.on,s=[],u=[],c=[],l=[];e.$watch(a,function(n){var a,f;for(a=0,f=c.length;f>a;++a)c[a].remove();for(c.length=0,a=0,f=l.length;f>a;++a){var h=u[a];l[a].$destroy(),c[a]=h,t.leave(h,function(){c.splice(a,1)})}u.length=0,l.length=0,(s=i.cases["!"+n]||i.cases["?"])&&(e.$eval(r.change),o(s,function(n){var r=e.$new();l.push(r),n.transclude(r,function(e){var r=n.element;u.push(e),t.enter(e,r.parent(),r)})}))})}}}],So=nr({transclude:"element",priority:800,require:"^ngSwitch",link:function(t,e,n,r,i){r.cases["!"+n.ngSwitchWhen]=r.cases["!"+n.ngSwitchWhen]||[],r.cases["!"+n.ngSwitchWhen].push({transclude:i,element:e})}}),Co=nr({transclude:"element",priority:800,require:"^ngSwitch",link:function(t,e,n,r,i){r.cases["?"]=r.cases["?"]||[],r.cases["?"].push({transclude:i,element:e})}}),ko=nr({link:function(t,e,n,i,o){if(!o)throw r("ngTransclude")("orphan","Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}",z(e));o(function(t){e.empty(),e.append(t)})}}),Eo=["$templateCache",function(t){return{restrict:"E",terminal:!0,compile:function(e,n){if("text/ng-template"==n.type){var r=n.id,i=e[0].text;t.put(r,i)}}}}],Ao=r("ngOptions"),Oo=v({terminal:!0}),To=["$compile","$parse",function(t,r){var i=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,s={$setViewValue:$};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(t,e,n){var r,i,o=this,a={},u=s;o.databound=n.ngModel,o.init=function(t,e,n){u=t,r=e,i=n},o.addOption=function(e){re(e,'"option value"'),a[e]=!0,u.$viewValue==e&&(t.val(e),i.parent()&&i.remove())},o.removeOption=function(t){this.hasOption(t)&&(delete a[t],u.$viewValue==t&&this.renderUnknownOption(t))},o.renderUnknownOption=function(e){var n="? "+Me(e)+" ?";i.val(n),t.prepend(i),t.val(n),i.prop("selected",!0)},o.hasOption=function(t){return a.hasOwnProperty(t)},e.$on("$destroy",function(){o.renderUnknownOption=$})}],link:function(s,u,c,l){function f(t,e,n,r){n.$render=function(){var t=n.$viewValue;r.hasOption(t)?(C.parent()&&C.remove(),e.val(t),""===t&&$.prop("selected",!0)):g(t)&&$?e.val(""):r.renderUnknownOption(t)},e.on("change",function(){t.$apply(function(){C.parent()&&C.remove(),n.$setViewValue(e.val())})})}function h(t,e,n){var r;n.$render=function(){var t=new Ne(n.$viewValue);o(e.find("option"),function(e){e.selected=m(t.get(e.value))})},t.$watch(function(){q(r,n.$viewValue)||(r=_(n.$viewValue),n.$render())}),e.on("change",function(){t.$apply(function(){var t=[];o(e.find("option"),function(e){e.selected&&t.push(e.value)}),n.$setViewValue(t)})})}function p(e,o,s){function u(){var t=!1;if(y){var n=s.$modelValue;if(k&&Nr(n)){t=new Ne([]);for(var r={},i=0;i<n.length;i++)r[h]=n[i],t.put(k(e,r),n[i])}else t=new Ne(n)}return t}function c(){var t,n,r,i,c,l,w,C,A,O,T,M,N,P,j,D={"":[]},R=[""],_=s.$modelValue,q=g(e)||[],U=p?a(q):q,V={},I=u();for(T=0;A=U.length,A>T;T++){if(w=T,p){if(w=U[T],"$"===w.charAt(0))continue;V[p]=w}if(V[h]=q[w],t=$(e,V)||"",(n=D[t])||(n=D[t]=[],R.push(t)),y)M=m(I.remove(k?k(e,V):v(e,V)));else{if(k){var F={};F[h]=_,M=k(e,F)===k(e,V)}else M=_===v(e,V);I=I||M}j=f(e,V),j=m(j)?j:"",n.push({id:k?k(e,V):p?U[T]:T,label:j,selected:M})}for(y||(b||null===_?D[""].unshift({id:"",label:"",selected:!I}):I||D[""].unshift({id:"?",label:"",selected:!0})),O=0,C=R.length;C>O;O++){for(t=R[O],n=D[t],E.length<=O?(i={element:S.clone().attr("label",t),label:n.label},c=[i],E.push(c),o.append(i.element)):(c=E[O],i=c[0],i.label!=t&&i.element.attr("label",i.label=t)),N=null,T=0,A=n.length;A>T;T++)r=n[T],(l=c[T+1])?(N=l.element,l.label!==r.label&&(N.text(l.label=r.label),N.prop("label",l.label)),l.id!==r.id&&N.val(l.id=r.id),N[0].selected!==r.selected&&(N.prop("selected",l.selected=r.selected),wr&&N.prop("selected",l.selected))):(""===r.id&&b?P=b:(P=x.clone()).val(r.id).prop("selected",r.selected).attr("selected",r.selected).prop("label",r.label).text(r.label),c.push(l={element:P,label:r.label,id:r.id,selected:r.selected}),d.addOption(r.label,P),N?N.after(P):i.element.append(P),N=P);for(T++;c.length>T;)r=c.pop(),d.removeOption(r.label),r.element.remove()}for(;E.length>O;)E.pop()[0].element.remove()}var l;if(!(l=w.match(i)))throw Ao("iexp","Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}",w,z(o));var f=r(l[2]||l[1]),h=l[4]||l[6],p=l[5],$=r(l[3]||""),v=r(l[2]?l[1]:h),g=r(l[7]),C=l[8],k=C?r(l[8]):null,E=[[{element:o,label:""}]];b&&(t(b)(e),b.removeClass("ng-scope"),b.remove()),o.empty(),o.on("change",function(){e.$apply(function(){var t,r,i,a,u,l,f,$,d,m=g(e)||[],w={};if(y){for(i=[],l=0,$=E.length;$>l;l++)for(t=E[l],u=1,f=t.length;f>u;u++)if((a=t[u].element)[0].selected){if(r=a.val(),p&&(w[p]=r),k)for(d=0;d<m.length&&(w[h]=m[d],k(e,w)!=r);d++);else w[h]=m[r];i.push(v(e,w))}}else if(r=o.val(),"?"==r)i=n;else if(""===r)i=null;else if(k){for(d=0;d<m.length;d++)if(w[h]=m[d],k(e,w)==r){i=v(e,w);break}}else w[h]=m[r],p&&(w[p]=r),i=v(e,w);s.$setViewValue(i),c()})}),s.$render=c,e.$watchCollection(g,c),e.$watchCollection(function(){var t={},n=g(e);if(n){for(var r=new Array(n.length),i=0,o=n.length;o>i;i++)t[h]=n[i],r[i]=f(e,t);return r}},c),y&&e.$watchCollection(function(){return s.$modelValue},c)}if(l[1]){for(var $,d=l[0],v=l[1],y=c.multiple,w=c.ngOptions,b=!1,x=br(e.createElement("option")),S=br(e.createElement("optgroup")),C=x.clone(),k=0,E=u.children(),A=E.length;A>k;k++)if(""===E[k].value){$=b=E.eq(k);break}d.init(v,b,C),y&&(v.$isEmpty=function(t){return!t||0===t.length}),w?p(s,u,v):y?h(s,u,v):f(s,u,v,d)}}}}],Mo=["$interpolate",function(t){var e={addOption:$,removeOption:$};return{restrict:"E",priority:100,compile:function(n,r){if(g(r.value)){var i=t(n.text(),!0);i||r.$set("value",n.text())}return function(t,n,r){var o="$selectController",a=n.parent(),s=a.data(o)||a.parent().data(o);s&&s.databound?n.prop("selected",!1):s=e,i?t.$watch(i,function(t,e){r.$set("value",t),t!==e&&s.removeOption(e),s.addOption(t)}):s.addOption(r.value),n.on("$destroy",function(){s.removeOption(r.value)})}}}}],No=v({restrict:"E",terminal:!0});return t.angular.bootstrap?void void 0:(te(),se(Tr),void br(e).ready(function(){K(e,Y)}))}(window,document),!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>');
angular.module("ui.config",[]).value("ui.config",{}),angular.module("ui.filters",["ui.config"]),angular.module("ui.directives",["ui.config"]),angular.module("ui",["ui.filters","ui.directives","ui.config"]),angular.module("ui.directives").directive("uiAnimate",["ui.config","$timeout",function(e,i){var n={};return angular.isString(e.animate)?n["class"]=e.animate:e.animate&&(n=e.animate),{restrict:"A",link:function(e,t,r){var a={};r.uiAnimate&&(a=e.$eval(r.uiAnimate),angular.isString(a)&&(a={"class":a})),a=angular.extend({"class":"ui-animate"},n,a),t.addClass(a["class"]),i(function(){t.removeClass(a["class"])},20,!1)}}}]),angular.module("ui.directives").directive("uiCalendar",["ui.config","$parse",function(e){return e.uiCalendar=e.uiCalendar||{},{require:"ngModel",restrict:"A",link:function(i,n,t){function r(){i.calendar=n.html("");var r=i.calendar.fullCalendar("getView");r&&(r=r.name);var u,o={defaultView:r,eventSources:a};u=t.uiCalendar?i.$eval(t.uiCalendar):{},angular.extend(o,e.uiCalendar,u),i.calendar.fullCalendar(o)}var a=i.$eval(t.ngModel),u=0,o=function(){var e=i.$eval(t.equalsTracker);return u=0,angular.forEach(a,function(e){angular.isArray(e)&&(u+=e.length)}),angular.isNumber(e)?u+a.length+e:u+a.length};r(),i.$watch(o,function(){r()})}}}]),angular.module("ui.directives").directive("uiCodemirror",["ui.config","$timeout",function(e,i){"use strict";var n=["cursorActivity","viewportChange","gutterClick","focus","blur","scroll","update"];return{restrict:"A",require:"ngModel",link:function(t,r,a,u){var o,l,c,s,d;if("textarea"!==r[0].type)throw new Error("uiCodemirror3 can only be applied to a textarea element");o=e.codemirror||{},l=angular.extend({},o,t.$eval(a.uiCodemirror)),c=function(e){return function(i,n){var r=i.getValue();r!==u.$viewValue&&(u.$setViewValue(r),t.$apply()),"function"==typeof e&&e(i,n)}},s=function(){d=CodeMirror.fromTextArea(r[0],l),d.on("change",c(l.onChange));for(var e,o=0,s=n.length;s>o;++o)e=l["on"+n[o].charAt(0).toUpperCase()+n[o].slice(1)],void 0!==e&&"function"==typeof e&&d.on(n[o],e);u.$formatters.push(function(e){if(angular.isUndefined(e)||null===e)return"";if(angular.isObject(e)||angular.isArray(e))throw new Error("ui-codemirror cannot use an object or an array as a model");return e}),u.$render=function(){d.setValue(u.$viewValue)},a.uiRefresh&&t.$watch(a.uiRefresh,function(e,n){e!==n&&i(d.refresh)})},i(s)}}}]),angular.module("ui.directives").directive("uiCurrency",["ui.config","currencyFilter",function(e,i){var n={pos:"ui-currency-pos",neg:"ui-currency-neg",zero:"ui-currency-zero"};return e.currency&&angular.extend(n,e.currency),{restrict:"EAC",require:"ngModel",link:function(e,t,r,a){var u,o,l;u=angular.extend({},n,e.$eval(r.uiCurrency)),o=function(e){var n;return n=1*e,t.toggleClass(u.pos,n>0),t.toggleClass(u.neg,0>n),t.toggleClass(u.zero,0===n),t.text(""===e?"":i(n,u.symbol)),!0},a.$render=function(){l=a.$viewValue,t.val(l),o(l)}}}}]),angular.module("ui.directives").directive("uiDate",["ui.config",function(e){"use strict";var i;return i={},angular.isObject(e.date)&&angular.extend(i,e.date),{require:"?ngModel",link:function(i,n,t,r){var a=function(){return angular.extend({},e.date,i.$eval(t.uiDate))},u=function(){var e=a();if(r){var t=function(){i.$apply(function(){var e=n.datepicker("getDate");n.datepicker("setDate",n.val()),r.$setViewValue(e),n.blur()})};if(e.onSelect){var u=e.onSelect;e.onSelect=function(e,n){t(),i.$apply(function(){u(e,n)})}}else e.onSelect=t;n.bind("change",t),r.$render=function(){var e=r.$viewValue;if(angular.isDefined(e)&&null!==e&&!angular.isDate(e))throw new Error("ng-Model value must be a Date object - currently it is a "+typeof e+" - use ui-date-format to convert it from a string");n.datepicker("setDate",e)}}n.datepicker("destroy"),n.datepicker(e),r&&r.$render()};i.$watch(a,u,!0)}}}]).directive("uiDateFormat",["ui.config",function(e){var i={require:"ngModel",link:function(i,n,t,r){var a=t.uiDateFormat||e.dateFormat;a?(r.$formatters.push(function(e){return angular.isString(e)?$.datepicker.parseDate(a,e):void 0}),r.$parsers.push(function(e){return e?$.datepicker.formatDate(a,e):void 0})):(r.$formatters.push(function(e){return angular.isString(e)?new Date(e):void 0}),r.$parsers.push(function(e){return e?e.toISOString():void 0}))}};return i}]),angular.module("ui.directives").directive("uiEvent",["$parse",function(e){return function(i,n,t){var r=i.$eval(t.uiEvent);angular.forEach(r,function(t,r){var a=e(t);n.bind(r,function(e){var n=Array.prototype.slice.call(arguments);n=n.splice(1),i.$apply(function(){a(i,{$event:e,$params:n})})})})}}]),angular.module("ui.directives").directive("uiIf",[function(){return{transclude:"element",priority:1e3,terminal:!0,restrict:"A",compile:function(e,i,n){return function(e,i,t){var r,a;e.$watch(t.uiIf,function(t){r&&(r.remove(),r=void 0),a&&(a.$destroy(),a=void 0),t&&(a=e.$new(),n(a,function(e){r=e,i.after(e)}))})}}}}]),angular.module("ui.directives").directive("uiJq",["ui.config","$timeout",function(e,i){return{restrict:"A",compile:function(n,t){if(!angular.isFunction(n[t.uiJq]))throw new Error('ui-jq: The "'+t.uiJq+'" function does not exist');var r=e.jq&&e.jq[t.uiJq];return function(e,n,t){function a(){i(function(){n[t.uiJq].apply(n,u)},0,!1)}var u=[];t.uiOptions?(u=e.$eval("["+t.uiOptions+"]"),angular.isObject(r)&&angular.isObject(u[0])&&(u[0]=angular.extend({},r,u[0]))):r&&(u=[r]),t.ngModel&&n.is("select,input,textarea")&&n.on("change",function(){n.trigger("input")}),t.uiRefresh&&e.$watch(t.uiRefresh,function(){a()}),a()}}}}]),angular.module("ui.directives").factory("keypressHelper",["$parse",function(e){var i={8:"backspace",9:"tab",13:"enter",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"delete"},n=function(e){return e.charAt(0).toUpperCase()+e.slice(1)};return function(t,r,a,u){var o,l=[];o=r.$eval(u["ui"+n(t)]),angular.forEach(o,function(i,n){var t,r;r=e(i),angular.forEach(n.split(" "),function(e){t={expression:r,keys:{}},angular.forEach(e.split("-"),function(e){t.keys[e]=!0}),l.push(t)})}),a.bind(t,function(e){var n=e.metaKey||e.altKey,a=e.ctrlKey,u=e.shiftKey,o=e.keyCode;"keypress"===t&&!u&&o>=97&&122>=o&&(o-=32),angular.forEach(l,function(t){var o=t.keys[i[e.keyCode]]||t.keys[e.keyCode.toString()]||!1,l=t.keys.alt||!1,c=t.keys.ctrl||!1,s=t.keys.shift||!1;o&&l==n&&c==a&&s==u&&r.$apply(function(){t.expression(r,{$event:e})})})})}}]),angular.module("ui.directives").directive("uiKeydown",["keypressHelper",function(e){return{link:function(i,n,t){e("keydown",i,n,t)}}}]),angular.module("ui.directives").directive("uiKeypress",["keypressHelper",function(e){return{link:function(i,n,t){e("keypress",i,n,t)}}}]),angular.module("ui.directives").directive("uiKeyup",["keypressHelper",function(e){return{link:function(i,n,t){e("keyup",i,n,t)}}}]),function(){function e(e,i,n,t){angular.forEach(i.split(" "),function(i){var r={type:"map-"+i};google.maps.event.addListener(n,i,function(i){t.triggerHandler(angular.extend({},r,i)),e.$$phase||e.$apply()})})}function i(i,t){n.directive(i,[function(){return{restrict:"A",link:function(n,r,a){n.$watch(a[i],function(i){e(n,t,i,r)})}}}])}var n=angular.module("ui.directives");n.directive("uiMap",["ui.config","$parse",function(i,n){var t="bounds_changed center_changed click dblclick drag dragend dragstart heading_changed idle maptypeid_changed mousemove mouseout mouseover projection_changed resize rightclick tilesloaded tilt_changed zoom_changed",r=i.map||{};return{restrict:"A",link:function(i,a,u){var o=angular.extend({},r,i.$eval(u.uiOptions)),l=new google.maps.Map(a[0],o),c=n(u.uiMap);c.assign(i,l),e(i,t,l,a)}}}]),n.directive("uiMapInfoWindow",["ui.config","$parse","$compile",function(i,n,t){var r="closeclick content_change domready position_changed zindex_changed",a=i.mapInfoWindow||{};return{link:function(i,u,o){var l=angular.extend({},a,i.$eval(o.uiOptions));l.content=u[0];var c=n(o.uiMapInfoWindow),s=c(i);s||(s=new google.maps.InfoWindow(l),c.assign(i,s)),e(i,r,s,u),u.replaceWith("<div></div>");var d=s.open;s.open=function(e,n,r,a,o,l){t(u.contents())(i),d.call(s,e,n,r,a,o,l)}}}}]),i("uiMapMarker","animation_changed click clickable_changed cursor_changed dblclick drag dragend draggable_changed dragstart flat_changed icon_changed mousedown mouseout mouseover mouseup position_changed rightclick shadow_changed shape_changed title_changed visible_changed zindex_changed"),i("uiMapPolyline","click dblclick mousedown mousemove mouseout mouseover mouseup rightclick"),i("uiMapPolygon","click dblclick mousedown mousemove mouseout mouseover mouseup rightclick"),i("uiMapRectangle","bounds_changed click dblclick mousedown mousemove mouseout mouseover mouseup rightclick"),i("uiMapCircle","center_changed click dblclick mousedown mousemove mouseout mouseover mouseup radius_changed rightclick"),i("uiMapGroundOverlay","click dblclick")}(),angular.module("ui.directives").directive("uiMask",[function(){return{require:"ngModel",link:function(e,i,n,t){t.$render=function(){var r=t.$viewValue||"";i.val(r),i.mask(e.$eval(n.uiMask))},t.$parsers.push(function(e){var n=i.isMaskValid()||angular.isUndefined(i.isMaskValid())&&i.val().length>0;return t.$setValidity("mask",n),n?e:void 0}),i.bind("keyup",function(){e.$apply(function(){t.$setViewValue(i.mask())})})}}}]),angular.module("ui.directives").directive("uiReset",["ui.config",function(e){var i=null;return void 0!==e.reset&&(i=e.reset),{require:"ngModel",link:function(e,n,t,r){var a;a=angular.element('<a class="ui-reset" />'),n.wrap('<span class="ui-resetwrap" />').after(a),a.bind("click",function(n){n.preventDefault(),e.$apply(function(){r.$setViewValue(t.uiReset?e.$eval(t.uiReset):i),r.$render()})})}}}]),angular.module("ui.directives").directive("uiRoute",["$location","$parse",function(e,i){return{restrict:"AC",compile:function(n,t){var r;if(t.uiRoute)r="uiRoute";else if(t.ngHref)r="ngHref";else{if(!t.href)throw new Error("uiRoute missing a route or href property on "+n[0]);r="href"}return function(n,t,a){function u(i){(hash=i.indexOf("#"))>-1&&(i=i.substr(hash+1)),(c=function(){l(n,e.path().indexOf(i)>-1)})()}function o(i){(hash=i.indexOf("#"))>-1&&(i=i.substr(hash+1)),(c=function(){var t=new RegExp("^"+i+"$",["i"]);l(n,t.test(e.path()))})()}var l=i(a.ngModel||a.routeModel||"$uiRoute").assign,c=angular.noop;switch(r){case"uiRoute":a.uiRoute?o(a.uiRoute):a.$observe("uiRoute",o);break;case"ngHref":a.ngHref?u(a.ngHref):a.$observe("ngHref",u);break;case"href":u(a.href)}n.$on("$routeChangeSuccess",function(){c()})}}}}]),angular.module("ui.directives").directive("uiScrollfix",["$window",function(e){"use strict";return{link:function(i,n,t){var r=n.offset().top;t.uiScrollfix?"-"===t.uiScrollfix.charAt(0)?t.uiScrollfix=r-t.uiScrollfix.substr(1):"+"===t.uiScrollfix.charAt(0)&&(t.uiScrollfix=r+parseFloat(t.uiScrollfix.substr(1))):t.uiScrollfix=r,angular.element(e).on("scroll.ui-scrollfix",function(){var i;if(angular.isDefined(e.pageYOffset))i=e.pageYOffset;else{var r=document.compatMode&&"BackCompat"!==document.compatMode?document.documentElement:document.body;i=r.scrollTop}!n.hasClass("ui-scrollfix")&&i>t.uiScrollfix?n.addClass("ui-scrollfix"):n.hasClass("ui-scrollfix")&&i<t.uiScrollfix&&n.removeClass("ui-scrollfix")})}}}]),angular.module("ui.directives").directive("uiSelect2",["ui.config","$timeout",function(e,i){var n={};return e.select2&&angular.extend(n,e.select2),{require:"?ngModel",compile:function(e,t){var r,a,u,o=e.is("select"),l=void 0!==t.multiple;return e.is("select")&&(a=e.find("option[ng-repeat], option[data-ng-repeat]"),a.length&&(u=a.attr("ng-repeat")||a.attr("data-ng-repeat"),r=jQuery.trim(u.split("|")[0]).split(" ").pop())),function(e,t,a,u){var c=angular.extend({},n,e.$eval(a.uiSelect2));if(o?(delete c.multiple,delete c.initSelection):l&&(c.multiple=!0),u&&(u.$render=function(){o?t.select2("val",u.$modelValue):l?u.$modelValue?angular.isArray(u.$modelValue)?t.select2("data",u.$modelValue):t.select2("val",u.$modelValue):t.select2("data",[]):angular.isObject(u.$modelValue)?t.select2("data",u.$modelValue):t.select2("val",u.$modelValue)},r&&e.$watch(r,function(e){e&&i(function(){t.select2("val",u.$viewValue),t.trigger("change")})}),!o&&(t.bind("change",function(){e.$apply(function(){u.$setViewValue(t.select2("data"))})}),c.initSelection))){var s=c.initSelection;c.initSelection=function(e,i){s(e,function(e){u.$setViewValue(e),i(e)})}}a.$observe("disabled",function(e){t.select2(e&&"disable"||"enable")}),a.ngMultiple&&e.$watch(a.ngMultiple,function(){t.select2(c)}),t.val(e.$eval(a.ngModel)),i(function(){t.select2(c),c.initSelection||o||u.$setViewValue(t.select2("data"))})}}}}]),angular.module("ui.directives").directive("uiShow",[function(){return function(e,i,n){e.$watch(n.uiShow,function(e){e?i.addClass("ui-show"):i.removeClass("ui-show")})}}]).directive("uiHide",[function(){return function(e,i,n){e.$watch(n.uiHide,function(e){e?i.addClass("ui-hide"):i.removeClass("ui-hide")})}}]).directive("uiToggle",[function(){return function(e,i,n){e.$watch(n.uiToggle,function(e){e?i.removeClass("ui-hide").addClass("ui-show"):i.removeClass("ui-show").addClass("ui-hide")})}}]),angular.module("ui.directives").directive("uiSortable",["ui.config",function(e){return{require:"?ngModel",link:function(i,n,t,r){var a,u,o,l,c,s,d,f,g;c=angular.extend({},e.sortable,i.$eval(t.uiSortable)),r&&(r.$render=function(){n.sortable("refresh")},o=function(e,i){i.item.sortable={index:i.item.index()}},l=function(e,i){i.item.sortable.resort=r},a=function(e,i){i.item.sortable.relocate=!0,r.$modelValue.splice(i.item.index(),0,i.item.sortable.moved)},u=function(e,i){i.item.sortable.moved=1===r.$modelValue.length?r.$modelValue.splice(0,1)[0]:r.$modelValue.splice(i.item.sortable.index,1)[0]},onStop=function(e,n){if(n.item.sortable.resort&&!n.item.sortable.relocate){var t,r;r=n.item.sortable.index,t=n.item.index(),t>r&&t--,n.item.sortable.resort.$modelValue.splice(t,0,n.item.sortable.resort.$modelValue.splice(r,1)[0])}(n.item.sortable.resort||n.item.sortable.relocate)&&i.$apply()},f=c.start,c.start=function(e,i){o(e,i),"function"==typeof f&&f(e,i)},_stop=c.stop,c.stop=function(e,i){onStop(e,i),"function"==typeof _stop&&_stop(e,i)},g=c.update,c.update=function(e,i){l(e,i),"function"==typeof g&&g(e,i)},s=c.receive,c.receive=function(e,i){a(e,i),"function"==typeof s&&s(e,i)},d=c.remove,c.remove=function(e,i){u(e,i),"function"==typeof d&&d(e,i)}),n.sortable(c)}}}]),angular.module("ui.directives").directive("uiTinymce",["ui.config",function(e){return e.tinymce=e.tinymce||{},{require:"ngModel",link:function(i,n,t,r){var a,u={onchange_callback:function(e){e.isDirty()&&(e.save(),r.$setViewValue(n.val()),i.$$phase||i.$apply())},handle_event_callback:function(){return this.isDirty()&&(this.save(),r.$setViewValue(n.val()),i.$$phase||i.$apply()),!0},setup:function(e){e.onSetContent.add(function(e){e.isDirty()&&(e.save(),r.$setViewValue(n.val()),i.$$phase||i.$apply())})}};a=t.uiTinymce?i.$eval(t.uiTinymce):{},angular.extend(u,e.tinymce,a),setTimeout(function(){n.tinymce(u)})}}}]),angular.module("ui.directives").directive("uiValidate",function(){return{restrict:"A",require:"ngModel",link:function(e,i,n,t){var r,a,u={},o=e.$eval(n.uiValidate);o&&(angular.isString(o)&&(o={validator:o}),angular.forEach(o,function(i,n){r=function(r){return e.$eval(i,{$value:r})?(t.$setValidity(n,!0),r):void t.$setValidity(n,!1)},u[n]=r,t.$formatters.push(r),t.$parsers.push(r)}),n.uiValidateWatch&&(a=e.$eval(n.uiValidateWatch),angular.isString(a)?e.$watch(a,function(){angular.forEach(u,function(e){e(t.$modelValue)})}):angular.forEach(a,function(i,n){e.$watch(i,function(){u[n](t.$modelValue)})})))}}}),angular.module("ui.filters").filter("format",function(){return function(e,i){if(!e)return e;var n,t=e.toString();return void 0===i?t:angular.isArray(i)||angular.isObject(i)?(n=angular.isArray(i)&&"$"||":",angular.forEach(i,function(e,i){t=t.split(n+i).join(e)}),t):t.split("$0").join(i)}}),angular.module("ui.filters").filter("highlight",function(){return function(e,i,n){return i||angular.isNumber(i)?(e=e.toString(),i=i.toString(),n?e.split(i).join('<span class="ui-match">'+i+"</span>"):e.replace(new RegExp(i,"gi"),'<span class="ui-match">$&</span>')):e}}),angular.module("ui.filters").filter("inflector",function(){function e(e){return e.replace(/^([a-z])|\s+([a-z])/g,function(e){return e.toUpperCase()})}function i(e,i){return e.replace(/[A-Z]/g,function(e){return i+e})}var n={humanize:function(n){return e(i(n," ").split("_").join(" "))},underscore:function(e){return e.substr(0,1).toLowerCase()+i(e.substr(1),"_").toLowerCase().split(" ").join("_")},variable:function(i){return i=i.substr(0,1).toLowerCase()+e(i.split("_").join(" ")).substr(1).split(" ").join("")}};return function(e,i){return i!==!1&&angular.isString(e)?(i=i||"humanize",n[i](e)):e}}),angular.module("ui.filters").filter("unique",function(){return function(e,i){if(i===!1)return e;if((i||angular.isUndefined(i))&&angular.isArray(e)){var n=[],t=function(e){return angular.isObject(e)&&angular.isString(i)?e[i]:e};angular.forEach(e,function(e){for(var i=!1,r=0;r<n.length;r++)if(angular.equals(t(n[r]),t(e))){i=!0;break}i||n.push(e)}),e=n}return e}});
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(r,t,e){"use strict";function n(r,t){return N(new(N(function(){},{prototype:r})),t)}function o(r){return k(arguments,function(t){t!==r&&k(t,function(t,e){r.hasOwnProperty(e)||(r[e]=t)})}),r}function i(r,t){var e=[];for(var n in r.path){if(r.path[n]!==t.path[n])break;e.push(r.path[n])}return e}function a(r,t){if(Array.prototype.indexOf)return r.indexOf(t,Number(arguments[2])||0);var e=r.length>>>0,n=Number(arguments[2])||0;for(n=0>n?Math.ceil(n):Math.floor(n),0>n&&(n+=e);e>n;n++)if(n in r&&r[n]===t)return n;return-1}function u(r,t,e,n){var o,u=i(e,n),l={},s=[];for(var c in u)if(u[c].params&&u[c].params.length){o=u[c].params;for(var f in o)a(s,o[f])>=0||(s.push(o[f]),l[o[f]]=r[o[f]])}return N({},l,t)}function l(r,t){var e={};return k(r,function(r){var n=t[r];e[r]=null!=n?String(n):null}),e}function s(r,t,e){if(!e){e=[];for(var n in r)e.push(n)}for(var o=0;o<e.length;o++){var i=e[o];if(r[i]!=t[i])return!1}return!0}function c(r,t){var e={};return k(r,function(r){e[r]=t[r]}),e}function f(r,t){var n=1,i=2,a={},u=[],l=a,s=N(r.when(a),{$$promises:a,$$values:a});this.study=function(a){function c(r,e){if(p[e]!==i){if($.push(e),p[e]===n)throw $.splice(0,$.indexOf(e)),new Error("Cyclic dependency: "+$.join(" -> "));if(p[e]=n,M(r))h.push(e,[function(){return t.get(r)}],u);else{var o=t.annotate(r);k(o,function(r){r!==e&&a.hasOwnProperty(r)&&c(a[r],r)}),h.push(e,r,o)}$.pop(),p[e]=i}}function f(r){return V(r)&&r.then&&r.$$promises}if(!V(a))throw new Error("'invocables' must be an object");var h=[],$=[],p={};return k(a,c),a=$=p=null,function(n,i,a){function u(){--w||(g||o(d,i.$$values),v.$$values=d,v.$$promises=!0,p.resolve(d))}function c(r){v.$$failure=r,p.reject(r)}function $(e,o,i){function l(r){f.reject(r),c(r)}function s(){if(!O(v.$$failure))try{f.resolve(t.invoke(o,a,d)),f.promise.then(function(r){d[e]=r,u()},l)}catch(r){l(r)}}var f=r.defer(),h=0;k(i,function(r){m.hasOwnProperty(r)&&!n.hasOwnProperty(r)&&(h++,m[r].then(function(t){d[r]=t,--h||s()},l))}),h||s(),m[e]=f.promise}if(f(n)&&a===e&&(a=i,i=n,n=null),n){if(!V(n))throw new Error("'locals' must be an object")}else n=l;if(i){if(!f(i))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else i=s;var p=r.defer(),v=p.promise,m=v.$$promises={},d=N({},n),w=1+h.length/3,g=!1;if(O(i.$$failure))return c(i.$$failure),v;i.$$values?(g=o(d,i.$$values),u()):(N(m,i.$$promises),i.then(u,c));for(var b=0,y=h.length;y>b;b+=3)n.hasOwnProperty(h[b])?u():$(h[b],h[b+1],h[b+2]);return v}},this.resolve=function(r,t,e,n){return this.study(r)(t,e,n)}}function h(r,t,e){this.fromConfig=function(r,t,e){return O(r.template)?this.fromString(r.template,t):O(r.templateUrl)?this.fromUrl(r.templateUrl,t):O(r.templateProvider)?this.fromProvider(r.templateProvider,t,e):null},this.fromString=function(r,t){return A(r)?r(t):r},this.fromUrl=function(e,n){return A(e)&&(e=e(n)),null==e?null:r.get(e,{cache:t}).then(function(r){return r.data})},this.fromProvider=function(r,t,n){return e.invoke(r,null,n||{params:t})}}function $(r){function t(t){if(!/^\w+(-+\w+)*$/.test(t))throw new Error("Invalid parameter name '"+t+"' in pattern '"+r+"'");if(i[t])throw new Error("Duplicate parameter name '"+t+"' in pattern '"+r+"'");i[t]=!0,s.push(t)}function e(r){return r.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&")}var n,o=/([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,i={},a="^",u=0,l=this.segments=[],s=this.params=[];this.source=r;for(var c,f,h;(n=o.exec(r))&&(c=n[2]||n[3],f=n[4]||("*"==n[1]?".*":"[^/]*"),h=r.substring(u,n.index),!(h.indexOf("?")>=0));)a+=e(h)+"("+f+")",t(c),l.push(h),u=o.lastIndex;h=r.substring(u);var $=h.indexOf("?");if($>=0){var p=this.sourceSearch=h.substring($);h=h.substring(0,$),this.sourcePath=r.substring(0,u+$),k(p.substring(1).split(/[&?]/),t)}else this.sourcePath=r,this.sourceSearch="";a+=e(h)+"$",l.push(h),this.regexp=new RegExp(a),this.prefix=l[0]}function p(){this.compile=function(r){return new $(r)},this.isMatcher=function(r){return V(r)&&A(r.exec)&&A(r.format)&&A(r.concat)},this.$get=function(){return this}}function v(r){function t(r){var t=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(r.source);return null!=t?t[1].replace(/\\(.)/g,"$1"):""}function e(r,t){return r.replace(/\$(\$|\d{1,2})/,function(r,e){return t["$"===e?0:Number(e)]})}function n(r,t,e){if(!e)return!1;var n=r.invoke(t,t,{$match:e});return O(n)?n:!0}var o=[],i=null;this.rule=function(r){if(!A(r))throw new Error("'rule' must be a function");return o.push(r),this},this.otherwise=function(r){if(M(r)){var t=r;r=function(){return t}}else if(!A(r))throw new Error("'rule' must be a function");return i=r,this},this.when=function(o,i){var a,u=M(i);if(M(o)&&(o=r.compile(o)),!u&&!A(i)&&!I(i))throw new Error("invalid 'handler' in when()");var l={matcher:function(t,e){return u&&(a=r.compile(e),e=["$match",function(r){return a.format(r)}]),N(function(r,o){return n(r,e,t.exec(o.path(),o.search()))},{prefix:M(t.prefix)?t.prefix:""})},regex:function(r,o){if(r.global||r.sticky)throw new Error("when() RegExp must not be global or sticky");return u&&(a=o,o=["$match",function(r){return e(a,r)}]),N(function(t,e){return n(t,o,r.exec(e.path()))},{prefix:t(r)})}},s={matcher:r.isMatcher(o),regex:o instanceof RegExp};for(var c in s)if(s[c])return this.rule(l[c](o,i));throw new Error("invalid 'what' in when()")},this.$get=["$location","$rootScope","$injector",function(r,t,e){function n(t){function n(t){var n=t(e,r);return n?(M(n)&&r.replace().url(n),!0):!1}if(!t||!t.defaultPrevented){var a,u=o.length;for(a=0;u>a;a++)if(n(o[a]))return;i&&n(i)}}return t.$on("$locationChangeSuccess",n),{sync:function(){n()}}}]}function m(r,o,i){function a(r){return 0===r.indexOf(".")||0===r.indexOf("^")}function f(r,t){var n=M(r),o=n?r:r.name,i=a(o);if(i){if(!t)throw new Error("No reference point given for path '"+o+"'");for(var u=o.split("."),l=0,s=u.length,c=t;s>l;l++)if(""!==u[l]||0!==l){if("^"!==u[l])break;if(!c.parent)throw new Error("Path '"+o+"' not valid for state '"+t.name+"'");c=c.parent}else c=t;u=u.slice(l).join("."),o=c.name+(c.name&&u?".":"")+u}var f=x[o];return!f||!n&&(n||f!==r&&f.self!==r)?e:f}function h(r,t){E[r]||(E[r]=[]),E[r].push(t)}function $(t){t=n(t,{self:t,resolve:t.resolve||{},toString:function(){return this.name}});var e=t.name;if(!M(e)||e.indexOf("@")>=0)throw new Error("State must have a valid name");if(x.hasOwnProperty(e))throw new Error("State '"+e+"'' is already defined");var o=-1!==e.indexOf(".")?e.substring(0,e.lastIndexOf(".")):M(t.parent)?t.parent:"";if(o&&!x[o])return h(o,t.self);for(var i in S)A(S[i])&&(t[i]=S[i](t,S.$delegates[i]));if(x[e]=t,!t[P]&&t.url&&r.when(t.url,["$match","$stateParams",function(r,e){y.$current.navigable==t&&s(r,e)||y.transitionTo(t,r,{location:!1})}]),E[e])for(var a=0;a<E[e].length;a++)$(E[e][a]);return t}function p(r){return r.indexOf("*")>-1}function v(r){var t=r.split("."),e=y.$current.name.split(".");if("**"===t[0]&&(e=e.slice(e.indexOf(t[1])),e.unshift("**")),"**"===t[t.length-1]&&(e.splice(e.indexOf(t[t.length-2])+1,Number.MAX_VALUE),e.push("**")),t.length!=e.length)return!1;for(var n=0,o=t.length;o>n;n++)"*"===t[n]&&(e[n]="*");return e.join("")===t.join("")}function m(r,t){return M(r)&&!O(t)?S[r]:A(t)&&M(r)?(S[r]&&!S.$delegates[r]&&(S.$delegates[r]=S[r]),S[r]=t,this):this}function d(r,t){return V(r)?t=r:t.name=r,$(t),this}function w(r,o,a,h,$,m,d,w,E){function S(){d.url()!==T&&(d.url(T),d.replace())}function j(r,e,n,i,u){var l=n?e:c(r.params,e),s={$stateParams:l};u.resolve=$.resolve(r.resolve,s,u.resolve,r);var f=[u.resolve.then(function(r){u.globals=r})];return i&&f.push(i),k(r.views,function(e,n){var o=e.resolve&&e.resolve!==r.resolve?e.resolve:{};o.$template=[function(){return a.load(n,{view:e,locals:s,params:l,notify:!1})||""}],f.push($.resolve(o,s,u.resolve,r).then(function(i){if(A(e.controllerProvider)||I(e.controllerProvider)){var a=t.extend({},o,s);i.$$controller=h.invoke(e.controllerProvider,null,a)}else i.$$controller=e.controller;i.$$state=r,i.$$controllerAs=e.controllerAs,u[n]=i}))}),o.all(f).then(function(){return u})}var C=o.reject(new Error("transition superseded")),V=o.reject(new Error("transition prevented")),U=o.reject(new Error("transition aborted")),F=o.reject(new Error("transition failed")),T=d.url(),D=E.baseHref();return b.locals={resolve:null,globals:{$stateParams:{}}},y={params:{},current:b.self,$current:b,transition:null},y.reload=function(){y.transitionTo(y.current,m,{reload:!0,inherit:!1,notify:!1})},y.go=function(r,t,e){return this.transitionTo(r,t,N({inherit:!0,relative:y.$current},e))},y.transitionTo=function(t,e,i){e=e||{},i=N({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},i||{});var a,c=y.$current,$=y.params,p=c.path,v=f(t,i.relative);if(!O(v)){var w={to:t,toParams:e,options:i};if(a=r.$broadcast("$stateNotFound",w,c.self,$),a.defaultPrevented)return S(),U;if(a.retry){if(i.$retry)return S(),F;var x=y.transition=o.when(a.retry);return x.then(function(){return x!==y.transition?C:(w.options.$retry=!0,y.transitionTo(w.to,w.toParams,w.options))},function(){return U}),S(),x}if(t=w.to,e=w.toParams,i=w.options,v=f(t,i.relative),!O(v)){if(i.relative)throw new Error("Could not resolve '"+t+"' from state '"+i.relative+"'");throw new Error("No such state '"+t+"'")}}if(v[P])throw new Error("Cannot transition to abstract state '"+t+"'");i.inherit&&(e=u(m,e||{},y.$current,v)),t=v;var E,A,M=t.path,I=b.locals,k=[];for(E=0,A=M[E];A&&A===p[E]&&s(e,$,A.ownParams)&&!i.reload;E++,A=M[E])I=k[E]=A.locals;if(g(t,c,I,i))return t.self.reloadOnSearch!==!1&&S(),y.transition=null,o.when(y.current);if(e=l(t.params,e||{}),i.notify&&(a=r.$broadcast("$stateChangeStart",t.self,e,c.self,$),a.defaultPrevented))return S(),V;for(var D=o.when(I),q=E;q<M.length;q++,A=M[q])I=k[q]=n(I),D=j(A,e,A===t,D,I);var L=y.transition=D.then(function(){var n,o,a;if(y.transition!==L)return C;for(n=p.length-1;n>=E;n--)a=p[n],a.self.onExit&&h.invoke(a.self.onExit,a.self,a.locals.globals),a.locals=null;for(n=E;n<M.length;n++)o=M[n],o.locals=k[n],o.self.onEnter&&h.invoke(o.self.onEnter,o.self,o.locals.globals);if(y.transition!==L)return C;y.$current=t,y.current=t.self,y.params=e,R(y.params,m),y.transition=null;var u=t.navigable;return i.location&&u&&(d.url(u.url.format(u.locals.globals.$stateParams)),"replace"===i.location&&d.replace()),i.notify&&r.$broadcast("$stateChangeSuccess",t.self,e,c.self,$),T=d.url(),y.current},function(n){return y.transition!==L?C:(y.transition=null,r.$broadcast("$stateChangeError",t.self,e,c.self,$,n),S(),o.reject(n))});return L},y.is=function(r,n){var o=f(r);return O(o)?y.$current!==o?!1:O(n)&&null!==n?t.equals(m,n):!0:e},y.includes=function(r,n){if(M(r)&&p(r)){if(!v(r))return!1;r=y.$current.name}var o=f(r);if(!O(o))return e;if(!O(y.$current.includes[o.name]))return!1;var i=!0;return t.forEach(n,function(r,t){O(m[t])&&m[t]===r||(i=!1)}),i},y.href=function(r,t,e){e=N({lossy:!0,inherit:!1,absolute:!1,relative:y.$current},e||{});var n=f(r,e.relative);if(!O(n))return null;t=u(m,t||{},y.$current,n);var o=n&&e.lossy?n.navigable:n,a=o&&o.url?o.url.format(l(n.params,t||{})):null;return!i.html5Mode()&&a&&(a="#"+i.hashPrefix()+a),"/"!==D&&(i.html5Mode()?a=D.slice(0,-1)+a:e.absolute&&(a=D.slice(1)+a)),e.absolute&&a&&(a=d.protocol()+"://"+d.host()+(80==d.port()||443==d.port()?"":":"+d.port())+(!i.html5Mode()&&a?"/":"")+a),a},y.get=function(r,t){if(!O(r)){var e=[];return k(x,function(r){e.push(r.self)}),e}var n=f(r,t);return n&&n.self?n.self:null},y}function g(r,t,e,n){return r!==t||(e!==t.locals||n.reload)&&r.self.reloadOnSearch!==!1?void 0:!0}var b,y,x={},E={},P="abstract",S={parent:function(r){if(O(r.parent)&&r.parent)return f(r.parent);var t=/^(.+)\.[^.]+$/.exec(r.name);return t?f(t[1]):b},data:function(r){return r.parent&&r.parent.data&&(r.data=r.self.data=N({},r.parent.data,r.data)),r.data},url:function(r){var t=r.url;if(M(t))return"^"==t.charAt(0)?o.compile(t.substring(1)):(r.parent.navigable||b).url.concat(t);if(o.isMatcher(t)||null==t)return t;throw new Error("Invalid url '"+t+"' in state '"+r+"'")},navigable:function(r){return r.url?r:r.parent?r.parent.navigable:null},params:function(r){if(!r.params)return r.url?r.url.parameters():r.parent.params;if(!I(r.params))throw new Error("Invalid params in state '"+r+"'");if(r.url)throw new Error("Both params and url specicified in state '"+r+"'");return r.params},views:function(r){var t={};return k(O(r.views)?r.views:{"":r},function(e,n){n.indexOf("@")<0&&(n+="@"+r.parent.name),t[n]=e}),t},ownParams:function(r){if(!r.parent)return r.params;var t={};k(r.params,function(r){t[r]=!0}),k(r.parent.params,function(e){if(!t[e])throw new Error("Missing required parameter '"+e+"' in state '"+r.name+"'");t[e]=!1});var e=[];return k(t,function(r,t){r&&e.push(t)}),e},path:function(r){return r.parent?r.parent.path.concat(r):[]},includes:function(r){var t=r.parent?N({},r.parent.includes):{};return t[r.name]=!0,t},$delegates:{}};b=$({name:"",url:"^",views:null,"abstract":!0}),b.navigable=null,this.decorator=m,this.state=d,this.$get=w,w.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$location","$urlRouter","$browser"]}function d(){function r(r,t){return{load:function(e,n){var o,i={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return n=N(i,n),n.view&&(o=t.fromConfig(n.view,n.params,n.locals)),o&&n.notify&&r.$broadcast("$viewContentLoading",n),o}}}this.$get=r,r.$inject=["$rootScope","$templateFactory"]}function w(){var r=!1;this.useAnchorScroll=function(){r=!0},this.$get=["$anchorScroll","$timeout",function(t,e){return r?t:function(r){e(function(){r[0].scrollIntoView()},0,!1)}}]}function g(r,e,n){function o(){return e.has?function(r){return e.has(r)?e.get(r):null}:function(r){try{return e.get(r)}catch(t){return null}}}function i(r,t){var e=function(){return{enter:function(r,t,e){t.after(r),e()},leave:function(r,t){r.remove(),t()}}};if(l)return{enter:function(r,t,e){l.enter(r,null,t,e)},leave:function(r,t){l.leave(r,t)}};if(u){var n=u&&u(t,r);return{enter:function(r,t,e){n.enter(r,null,t),e()},leave:function(r,t){n.leave(r),t()}}}return e()}var a=o(),u=a("$animator"),l=a("$animate"),s={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(e,o,a){return function(e,o,u){function l(){c&&(c.remove(),c=null),h&&(h.$destroy(),h=null),f&&(m.leave(f,function(){c=null}),c=f,f=null)}function s(i){var u=e.$new(),s=f&&f.data("$uiViewName"),c=s&&r.$current&&r.$current.locals[s];if(i||c!==$){var d=a(u,function(r){m.enter(r,o,function(){(t.isDefined(v)&&!v||e.$eval(v))&&n(r)}),l()});$=r.$current.locals[d.data("$uiViewName")],f=d,h=u,h.$emit("$viewContentLoaded"),h.$eval(p)}}var c,f,h,$,p=u.onload||"",v=u.autoscroll,m=i(u,e);e.$on("$stateChangeSuccess",function(){s(!1)}),e.$on("$viewContentLoading",function(){s(!1)}),s(!0)}}};return s}function b(r,t,e){return{restrict:"ECA",priority:-400,compile:function(n){var o=n.html();return function(n,i,a){var u=a.uiView||a.name||"",l=i.inheritedData("$uiView");u.indexOf("@")<0&&(u=u+"@"+(l?l.state.name:"")),i.data("$uiViewName",u);var s=e.$current,c=s&&s.locals[u];if(c){i.data("$uiView",{name:u,state:c.$$state}),i.html(c.$template?c.$template:o);var f=r(i.contents());if(c.$$controller){c.$scope=n;var h=t(c.$$controller,c);c.$$controllerAs&&(n[c.$$controllerAs]=h),i.data("$ngControllerController",h),i.children().data("$ngControllerController",h)}f(n)}}}}}function y(r){var t=r.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/);if(!t||4!==t.length)throw new Error("Invalid state ref '"+r+"'");return{state:t[1],paramExpr:t[3]||null}}function x(r){var t=r.parent().inheritedData("$uiView");return t&&t.state&&t.state.name?t.state:void 0}function E(r,e){var n=["location","inherit","reload"];return{restrict:"A",require:"?^uiSrefActive",link:function(o,i,a,u){var l=y(a.uiSref),s=null,c=x(i)||r.$current,f="FORM"===i[0].nodeName,h=f?"action":"href",$=!0,p={relative:c},v=o.$eval(a.uiSrefOpts)||{};t.forEach(n,function(r){r in v&&(p[r]=v[r])});var m=function(t){if(t&&(s=t),$){var e=r.href(l.state,s,p);return u&&u.$$setStateInfo(l.state,s),e?void(i[0][h]=e):($=!1,!1)}};l.paramExpr&&(o.$watch(l.paramExpr,function(r){r!==s&&m(r)},!0),s=o.$eval(l.paramExpr)),m(),f||i.bind("click",function(t){var n=t.which||t.button;n>1||t.ctrlKey||t.metaKey||t.shiftKey||i.attr("target")||(e(function(){r.go(l.state,s,p)}),t.preventDefault())})}}}function P(r,t,e){return{restrict:"A",controller:["$scope","$element","$attrs",function(n,o,i){function a(){r.$current.self===l&&u()?o.addClass(f):o.removeClass(f)}function u(){return!c||s(c,t)}var l,c,f;f=e(i.uiSrefActive||"",!1)(n),this.$$setStateInfo=function(t,e){l=r.get(t,x(o)),c=e,a()},n.$on("$stateChangeSuccess",a)}]}}function S(r){return function(t){return r.is(t)}}function j(r){return function(t){return r.includes(t)}}function C(r,t){function o(r){this.locals=r.locals.globals,this.params=this.locals.$stateParams}function i(){this.locals=null,this.params=null}function a(e,a){if(null!=a.redirectTo){var u,s=a.redirectTo;if(M(s))u=s;else{if(!A(s))throw new Error("Invalid 'redirectTo' in when()");u=function(r,t){return s(r,t.path(),t.search())}}t.when(e,u)}else r.state(n(a,{parent:null,name:"route:"+encodeURIComponent(e),url:e,onEnter:o,onExit:i}));return l.push(a),this}function u(r,t,n){function o(r){return""!==r.name?r:e}var i={routes:l,params:n,current:e};return t.$on("$stateChangeStart",function(r,e,n,i){t.$broadcast("$routeChangeStart",o(e),o(i))}),t.$on("$stateChangeSuccess",function(r,e,n,a){i.current=o(e),t.$broadcast("$routeChangeSuccess",o(e),o(a)),R(n,i.params)}),t.$on("$stateChangeError",function(r,e,n,i,a,u){t.$broadcast("$routeChangeError",o(e),o(i),u)}),i}var l=[];o.$inject=["$$state"],this.when=a,this.$get=u,u.$inject=["$state","$rootScope","$routeParams"]}var O=t.isDefined,A=t.isFunction,M=t.isString,V=t.isObject,I=t.isArray,k=t.forEach,N=t.extend,R=t.copy;t.module("ui.router.util",["ng"]),t.module("ui.router.router",["ui.router.util"]),t.module("ui.router.state",["ui.router.router","ui.router.util"]),t.module("ui.router",["ui.router.state"]),t.module("ui.router.compat",["ui.router"]),f.$inject=["$q","$injector"],t.module("ui.router.util").service("$resolve",f),h.$inject=["$http","$templateCache","$injector"],t.module("ui.router.util").service("$templateFactory",h),$.prototype.concat=function(r){return new $(this.sourcePath+r+this.sourceSearch)},$.prototype.toString=function(){return this.source},$.prototype.exec=function(r,t){var e=this.regexp.exec(r);if(!e)return null;var n,o=this.params,i=o.length,a=this.segments.length-1,u={};if(a!==e.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(n=0;a>n;n++)u[o[n]]=e[n+1];for(;i>n;n++)u[o[n]]=t[o[n]];return u},$.prototype.parameters=function(){return this.params},$.prototype.format=function(r){var t=this.segments,e=this.params;if(!r)return t.join("");var n,o,i,a=t.length-1,u=e.length,l=t[0];for(n=0;a>n;n++)i=r[e[n]],null!=i&&(l+=encodeURIComponent(i)),l+=t[n+1];for(;u>n;n++)i=r[e[n]],null!=i&&(l+=(o?"&":"?")+e[n]+"="+encodeURIComponent(i),o=!0);return l},t.module("ui.router.util").provider("$urlMatcherFactory",p),v.$inject=["$urlMatcherFactoryProvider"],t.module("ui.router.router").provider("$urlRouter",v),m.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider","$locationProvider"],t.module("ui.router.state").value("$stateParams",{}).provider("$state",m),d.$inject=[],t.module("ui.router.state").provider("$view",d),t.module("ui.router.state").provider("$uiViewScroll",w),g.$inject=["$state","$injector","$uiViewScroll"],b.$inject=["$compile","$controller","$state"],t.module("ui.router.state").directive("uiView",g),t.module("ui.router.state").directive("uiView",b),E.$inject=["$state","$timeout"],P.$inject=["$state","$stateParams","$interpolate"],t.module("ui.router.state").directive("uiSref",E).directive("uiSrefActive",P),S.$inject=["$state"],j.$inject=["$state"],t.module("ui.router.state").filter("isState",S).filter("includedByState",j),C.$inject=["$stateProvider","$urlRouterProvider"],t.module("ui.router.compat").provider("$route",C).directive("ngView",g)}(window,window.angular);
!function(e,t){"use strict";function r(){this.$get=["$$sanitizeUri",function(e){return function(t){var r=[];return s(t,c(r,function(t,r){return!/^unsafe/.test(e(t,r))})),r.join("")}}]}function n(e){var r=[],n=c(r,t.noop);return n.chars(e),r.join("")}function a(e){var t,r={},n=e.split(",");for(t=0;t<n.length;t++)r[n[t]]=!0;return r}function s(e,r){function n(e,n,s,o){if(n=t.lowercase(n),k[n])for(;w.last()&&C[w.last()];)a("",w.last());y[n]&&w.last()==n&&a("",n),o=x[n]||!!o,o||w.push(n);var c={};s.replace(f,function(e,t,r,n,a){var s=r||n||a||"";c[t]=i(s)}),r.start&&r.start(n,c,o)}function a(e,n){var a,s=0;if(n=t.lowercase(n))for(s=w.length-1;s>=0&&w[s]!=n;s--);if(s>=0){for(a=w.length-1;a>=s;a--)r.end&&r.end(w[a]);w.length=s}}"string"!=typeof e&&(e=null===e||"undefined"==typeof e?"":""+e);var s,o,c,v,w=[],$=e;for(w.last=function(){return w[w.length-1]};e;){if(v="",o=!0,w.last()&&A[w.last()]?(e=e.replace(new RegExp("(.*)<\\s*\\/\\s*"+w.last()+"[^>]*>","i"),function(e,t){return t=t.replace(d,"$1").replace(m,"$1"),r.chars&&r.chars(i(t)),""}),a("",w.last())):(0===e.indexOf("<!--")?(s=e.indexOf("--",4),s>=0&&e.lastIndexOf("-->",s)===s&&(r.comment&&r.comment(e.substring(4,s)),e=e.substring(s+3),o=!1)):b.test(e)?(c=e.match(b),c&&(e=e.replace(c[0],""),o=!1)):g.test(e)?(c=e.match(p),c&&(e=e.substring(c[0].length),c[0].replace(p,a),o=!1)):h.test(e)&&(c=e.match(u),c?(c[4]&&(e=e.substring(c[0].length),c[0].replace(u,n)),o=!1):(v+="<",e=e.substring(1))),o&&(s=e.indexOf("<"),v+=0>s?e:e.substring(0,s),e=0>s?"":e.substring(s),r.chars&&r.chars(i(v)))),e==$)throw l("badparse","The sanitizer was unable to parse the following block of html: {0}",e);$=e}a()}function i(e){if(!e)return"";var t=T.exec(e),r=t[1],n=t[3],a=t[2];return a&&(O.innerHTML=a.replace(/</g,"&lt;"),a="textContent"in O?O.textContent:O.innerText),r+a+n}function o(e){return e.replace(/&/g,"&amp;").replace(v,function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1);return"&#"+(1024*(t-55296)+(r-56320)+65536)+";"}).replace(w,function(e){return"&#"+e.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function c(e,r){var n=!1,a=t.bind(e,e.push);return{start:function(e,s,i){e=t.lowercase(e),!n&&A[e]&&(n=e),n||D[e]!==!0||(a("<"),a(e),t.forEach(s,function(n,s){var i=t.lowercase(s),c="img"===e&&"src"===i||"background"===i;F[i]!==!0||E[i]===!0&&!r(n,c)||(a(" "),a(s),a('="'),a(o(n)),a('"'))}),a(i?"/>":">"))},end:function(e){e=t.lowercase(e),n||D[e]!==!0||(a("</"),a(e),a(">")),e==n&&(n=!1)},chars:function(e){n||a(o(e))}}}var l=t.$$minErr("$sanitize"),u=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,p=/^<\/\s*([\w:-]+)[^>]*>/,f=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,h=/^</,g=/^<\//,d=/<!--(.*?)-->/g,b=/<!DOCTYPE([^>]*?)>/i,m=/<!\[CDATA\[(.*?)]]>/g,v=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,w=/([^\#-~| |!])/g,x=a("area,br,col,hr,img,wbr"),$=a("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),z=a("rp,rt"),y=t.extend({},z,$),k=t.extend({},$,a("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),C=t.extend({},z,a("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),A=a("script,style"),D=t.extend({},x,k,C,y),E=a("background,cite,href,longdesc,src,usemap"),F=t.extend({},E,a("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),O=document.createElement("pre"),T=/^(\s*)([\s\S]*?)(\s*)$/;t.module("ngSanitize",[]).provider("$sanitize",r),t.module("ngSanitize").filter("linky",["$sanitize",function(e){var r=/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/,a=/^mailto:/;return function(s,i){function o(e){e&&h.push(n(e))}function c(e,r){h.push("<a "),t.isDefined(i)&&(h.push('target="'),h.push(i),h.push('" ')),h.push('href="',e.replace('"',"&quot;"),'">'),o(r),h.push("</a>")}if(!s)return s;for(var l,u,p,f=s,h=[];l=f.match(r);)u=l[0],l[2]==l[3]&&(u="mailto:"+u),p=l.index,o(f.substr(0,p)),c(u,l[0].replace(a,"")),f=f.substring(p+l[0].length);return o(f),e(h.join(""))}}])}(window,window.angular);
!function(e,t,n){"use strict";function r(e){var t;if(t=e.match(u)){var n=new Date(0),r=0,i=0;return t[9]&&(r=o(t[9]+t[10]),i=o(t[9]+t[11])),n.setUTCFullYear(o(t[1]),o(t[2])-1,o(t[3])),n.setUTCHours(o(t[4]||0)-r,o(t[5]||0)-i,o(t[6]||0),o(t[7]||0)),n}return e}function o(e){return parseInt(e,10)}function i(e,t,n){var r="";for(0>e&&(r="-",e=-e),e=""+e;e.length<t;)e="0"+e;return n&&(e=e.substr(e.length-t)),r+e}function s(e,r,o){function i(e,n,r,o){return t.isFunction(e)?e:function(){return t.isNumber(e)?[e,n,r,o]:[200,e,n]}}function s(e,i,s,a,u,m,p){function $(e){return t.isString(e)||t.isFunction(e)||e instanceof RegExp?e:t.toJson(e)}function v(t){function r(){var n=t.response(e,i,s,u);k.$$respHeaders=n[2],a(g(n[0]),g(n[1]),k.getAllResponseHeaders(),g(n[3]||""))}function c(){for(var e=0,t=d.length;t>e;e++)if(d[e]===r){d.splice(e,1),a(-1,n,"");break}}return!o&&m&&m.then&&m.then(c),r}var k=new c,w=l[0],E=!1;if(w&&w.match(e,i)){if(!w.matchData(s))throw new Error("Expected "+w+" with different data\nEXPECTED: "+$(w.data)+"\nGOT:      "+s);if(!w.matchHeaders(u))throw new Error("Expected "+w+" with different headers\nEXPECTED: "+$(w.headers)+"\nGOT:      "+$(u));if(l.shift(),w.response)return void d.push(v(w));E=!0}for(var D,T=-1;D=f[++T];)if(D.match(e,i,s,u||{})){if(D.response)(o?o.defer:h)(v(D));else{if(!D.passThrough)throw new Error("No response defined !");r(e,i,s,a,u,m,p)}return}throw new Error(E?"No response defined !":"Unexpected request: "+e+" "+i+"\n"+(w?"Expected "+w:"No more request expected"))}function u(e){t.forEach(["GET","DELETE","JSONP","HEAD"],function(t){s[e+t]=function(r,o){return s[e](t,r,n,o)}}),t.forEach(["PUT","POST","PATCH"],function(t){s[e+t]=function(n,r,o){return s[e](t,n,r,o)}})}var f=[],l=[],d=[],h=t.bind(d,d.push),g=t.copy;return s.when=function(e,t,n,r){var s=new a(e,t,n,r),c={respond:function(e,t,n,r){s.response=i(e,t,n,r)}};return o&&(c.passThrough=function(){s.passThrough=!0}),f.push(s),c},u("when"),s.expect=function(e,t,n,r){var o=new a(e,t,n,r);return l.push(o),{respond:function(e,t,n,r){o.response=i(e,t,n,r)}}},u("expect"),s.flush=function(n){if(e.$digest(),!d.length)throw new Error("No pending request to flush !");if(t.isDefined(n))for(;n--;){if(!d.length)throw new Error("No more pending request to flush !");d.shift()()}else for(;d.length;)d.shift()();s.verifyNoOutstandingExpectation()},s.verifyNoOutstandingExpectation=function(){if(e.$digest(),l.length)throw new Error("Unsatisfied requests: "+l.join(", "))},s.verifyNoOutstandingRequest=function(){if(d.length)throw new Error("Unflushed requests: "+d.length)},s.resetExpectations=function(){l.length=0,d.length=0},s}function a(e,n,r,o){this.data=r,this.headers=o,this.match=function(n,r,o,i){return e!=n?!1:this.matchUrl(r)?t.isDefined(o)&&!this.matchData(o)?!1:t.isDefined(i)&&!this.matchHeaders(i)?!1:!0:!1},this.matchUrl=function(e){return n?t.isFunction(n.test)?n.test(e):n==e:!0},this.matchHeaders=function(e){return t.isUndefined(o)?!0:t.isFunction(o)?o(e):t.equals(o,e)},this.matchData=function(e){return t.isUndefined(r)?!0:r&&t.isFunction(r.test)?r.test(e):r&&t.isFunction(r)?r(e):r&&!t.isString(r)?t.equals(t.fromJson(t.toJson(r)),t.fromJson(e)):r==e},this.toString=function(){return e+" "+n}}function c(){c.$$lastInstance=this,this.open=function(e,t,n){this.$$method=e,this.$$url=t,this.$$async=n,this.$$reqHeaders={},this.$$respHeaders={}},this.send=function(e){this.$$data=e},this.setRequestHeader=function(e,t){this.$$reqHeaders[e]=t},this.getResponseHeader=function(e){var r=this.$$respHeaders[e];return r?r:(e=t.lowercase(e),(r=this.$$respHeaders[e])?r:(r=n,t.forEach(this.$$respHeaders,function(n,o){r||t.lowercase(o)!=e||(r=n)}),r))},this.getAllResponseHeaders=function(){var e=[];return t.forEach(this.$$respHeaders,function(t,n){e.push(n+": "+t)}),e.join("\n")},this.abort=t.noop}t.mock={},t.mock.$BrowserProvider=function(){this.$get=function(){return new t.mock.$Browser}},t.mock.$Browser=function(){var e=this;this.isMock=!0,e.$$url="http://server/",e.$$lastUrl=e.$$url,e.pollFns=[],e.$$completeOutstandingRequest=t.noop,e.$$incOutstandingRequestCount=t.noop,e.onUrlChange=function(t){return e.pollFns.push(function(){e.$$lastUrl!=e.$$url&&(e.$$lastUrl=e.$$url,t(e.$$url))}),t},e.$$checkUrlChange=t.noop,e.cookieHash={},e.lastCookieHash={},e.deferredFns=[],e.deferredNextId=0,e.defer=function(t,n){return n=n||0,e.deferredFns.push({time:e.defer.now+n,fn:t,id:e.deferredNextId}),e.deferredFns.sort(function(e,t){return e.time-t.time}),e.deferredNextId++},e.defer.now=0,e.defer.cancel=function(r){var o;return t.forEach(e.deferredFns,function(e,t){e.id===r&&(o=t)}),o!==n?(e.deferredFns.splice(o,1),!0):!1},e.defer.flush=function(n){if(t.isDefined(n))e.defer.now+=n;else{if(!e.deferredFns.length)throw new Error("No deferred tasks to be flushed");e.defer.now=e.deferredFns[e.deferredFns.length-1].time}for(;e.deferredFns.length&&e.deferredFns[0].time<=e.defer.now;)e.deferredFns.shift().fn()},e.$$baseHref="",e.baseHref=function(){return this.$$baseHref}},t.mock.$Browser.prototype={poll:function(){t.forEach(this.pollFns,function(e){e()})},addPollFn:function(e){return this.pollFns.push(e),e},url:function(e){return e?(this.$$url=e,this):this.$$url},cookies:function(e,n){return e?void(t.isUndefined(n)?delete this.cookieHash[e]:t.isString(n)&&n.length<=4096&&(this.cookieHash[e]=n)):(t.equals(this.cookieHash,this.lastCookieHash)||(this.lastCookieHash=t.copy(this.cookieHash),this.cookieHash=t.copy(this.cookieHash)),this.cookieHash)},notifyWhenNoOutstandingRequests:function(e){e()}},t.mock.$ExceptionHandlerProvider=function(){var e;this.mode=function(t){switch(t){case"rethrow":e=function(e){throw e};break;case"log":var n=[];e=function(e){n.push(1==arguments.length?e:[].slice.call(arguments,0))},e.errors=n;break;default:throw new Error("Unknown mode '"+t+"', only 'log'/'rethrow' modes are allowed!")}},this.$get=function(){return e},this.mode("rethrow")},t.mock.$LogProvider=function(){function e(e,t,n){return e.concat(Array.prototype.slice.call(t,n))}var n=!0;this.debugEnabled=function(e){return t.isDefined(e)?(n=e,this):n},this.$get=function(){var r={log:function(){r.log.logs.push(e([],arguments,0))},warn:function(){r.warn.logs.push(e([],arguments,0))},info:function(){r.info.logs.push(e([],arguments,0))},error:function(){r.error.logs.push(e([],arguments,0))},debug:function(){n&&r.debug.logs.push(e([],arguments,0))}};return r.reset=function(){r.log.logs=[],r.info.logs=[],r.warn.logs=[],r.error.logs=[],r.debug.logs=[]},r.assertEmpty=function(){var e=[];if(t.forEach(["error","warn","info","log","debug"],function(n){t.forEach(r[n].logs,function(r){t.forEach(r,function(t){e.push("MOCK $log ("+n+"): "+String(t)+"\n"+(t.stack||""))})})}),e.length)throw e.unshift("Expected $log to be empty! Either a message was logged unexpectedly, or an expected log message was not checked and removed:"),e.push(""),new Error(e.join("\n---------\n"))},r.reset(),r}},t.mock.$IntervalProvider=function(){this.$get=["$rootScope","$q",function(e,r){var o=[],i=0,s=0,a=function(a,c,u,f){function l(){if(d.notify(g++),u>0&&g>=u){var r;d.resolve(g),t.forEach(o,function(e,t){e.id===h.$$intervalId&&(r=t)}),r!==n&&o.splice(r,1)}m||e.$apply()}var d=r.defer(),h=d.promise,g=0,m=t.isDefined(f)&&!f;return u=t.isDefined(u)?u:0,h.then(null,null,a),h.$$intervalId=i,o.push({nextTime:s+c,delay:c,fn:l,id:i,deferred:d}),o.sort(function(e,t){return e.nextTime-t.nextTime}),i++,h};return a.cancel=function(e){if(!e)return!1;var r;return t.forEach(o,function(t,n){t.id===e.$$intervalId&&(r=n)}),r!==n?(o[r].deferred.reject("canceled"),o.splice(r,1),!0):!1},a.flush=function(e){for(s+=e;o.length&&o[0].nextTime<=s;){var t=o[0];t.fn(),t.nextTime+=t.delay,o.sort(function(e,t){return e.nextTime-t.nextTime})}return e},a}]};var u=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?:\:?(\d\d)(?:\:?(\d\d)(?:\.(\d{3}))?)?)?(Z|([+-])(\d\d):?(\d\d)))?$/;if(t.mock.TzDate=function(e,n){var o=new Date(0);if(t.isString(n)){var s=n;if(o.origDate=r(n),n=o.origDate.getTime(),isNaN(n))throw{name:"Illegal Argument",message:"Arg '"+s+"' passed into TzDate constructor is not a valid date string"}}else o.origDate=new Date(n);var a=new Date(n).getTimezoneOffset();o.offsetDiff=60*a*1e3-1e3*e*60*60,o.date=new Date(n+o.offsetDiff),o.getTime=function(){return o.date.getTime()-o.offsetDiff},o.toLocaleDateString=function(){return o.date.toLocaleDateString()},o.getFullYear=function(){return o.date.getFullYear()},o.getMonth=function(){return o.date.getMonth()},o.getDate=function(){return o.date.getDate()},o.getHours=function(){return o.date.getHours()},o.getMinutes=function(){return o.date.getMinutes()},o.getSeconds=function(){return o.date.getSeconds()},o.getMilliseconds=function(){return o.date.getMilliseconds()},o.getTimezoneOffset=function(){return 60*e},o.getUTCFullYear=function(){return o.origDate.getUTCFullYear()},o.getUTCMonth=function(){return o.origDate.getUTCMonth()},o.getUTCDate=function(){return o.origDate.getUTCDate()},o.getUTCHours=function(){return o.origDate.getUTCHours()},o.getUTCMinutes=function(){return o.origDate.getUTCMinutes()},o.getUTCSeconds=function(){return o.origDate.getUTCSeconds()},o.getUTCMilliseconds=function(){return o.origDate.getUTCMilliseconds()},o.getDay=function(){return o.date.getDay()},o.toISOString&&(o.toISOString=function(){return i(o.origDate.getUTCFullYear(),4)+"-"+i(o.origDate.getUTCMonth()+1,2)+"-"+i(o.origDate.getUTCDate(),2)+"T"+i(o.origDate.getUTCHours(),2)+":"+i(o.origDate.getUTCMinutes(),2)+":"+i(o.origDate.getUTCSeconds(),2)+"."+i(o.origDate.getUTCMilliseconds(),3)+"Z"});var c=["getUTCDay","getYear","setDate","setFullYear","setHours","setMilliseconds","setMinutes","setMonth","setSeconds","setTime","setUTCDate","setUTCFullYear","setUTCHours","setUTCMilliseconds","setUTCMinutes","setUTCMonth","setUTCSeconds","setYear","toDateString","toGMTString","toJSON","toLocaleFormat","toLocaleString","toLocaleTimeString","toSource","toString","toTimeString","toUTCString","valueOf"];return t.forEach(c,function(e){o[e]=function(){throw new Error("Method '"+e+"' is not implemented in the TzDate mock")}}),o},t.mock.TzDate.prototype=Date.prototype,t.mock.animate=t.module("ngAnimateMock",["ng"]).config(["$provide",function(e){var n=[];e.value("$$animateReflow",function(e){var t=n.length;return n.push(e),function(){n.splice(t,1)}}),e.decorator("$animate",function(e,r){var o={queue:[],enabled:e.enabled,triggerCallbacks:function(){r.flush()},triggerReflow:function(){t.forEach(n,function(e){e()}),n=[]}};return t.forEach(["enter","leave","move","addClass","removeClass","setClass"],function(t){o[t]=function(){o.queue.push({event:t,element:arguments[0],args:arguments}),e[t].apply(e,arguments)}}),o})}]),t.mock.dump=function(e){function n(e){var o;return t.isElement(e)?(e=t.element(e),o=t.element("<div></div>"),t.forEach(e,function(e){o.append(t.element(e).clone())}),o=o.html()):t.isArray(e)?(o=[],t.forEach(e,function(e){o.push(n(e))}),o="[ "+o.join(", ")+" ]"):o=t.isObject(e)?t.isFunction(e.$eval)&&t.isFunction(e.$apply)?r(e):e instanceof Error?e.stack||""+e.name+": "+e.message:t.toJson(e,!0):String(e),o}function r(e,n){n=n||"  ";var o=[n+"Scope("+e.$id+"): {"];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&!i.match(/^(\$|this)/)&&o.push("  "+i+": "+t.toJson(e[i]));for(var s=e.$$childHead;s;)o.push(r(s,n+"  ")),s=s.$$nextSibling;return o.push("}"),o.join("\n"+n)}return n(e)},t.mock.$HttpBackendProvider=function(){this.$get=["$rootScope",s]},t.mock.$TimeoutDecorator=function(e,n){function r(e){var n=[];return t.forEach(e,function(e){n.push("{id: "+e.id+", time: "+e.time+"}")}),n.join(", ")}return e.flush=function(e){n.defer.flush(e)},e.verifyNoPendingTasks=function(){if(n.deferredFns.length)throw new Error("Deferred tasks to flush ("+n.deferredFns.length+"): "+r(n.deferredFns))},e},t.mock.$RAFDecorator=function(e){var t=[],n=function(e){var n=t.length;return t.push(e),function(){t.splice(n,1)}};return n.supported=e.supported,n.flush=function(){if(0===t.length)throw new Error("No rAF callbacks present");for(var e=t.length,n=0;e>n;n++)t[n]();t=[]},n},t.mock.$AsyncCallbackDecorator=function(){var e=[],n=function(t){e.push(t)};return n.flush=function(){t.forEach(e,function(e){e()}),e=[]},n},t.mock.$RootElementProvider=function(){this.$get=function(){return t.element("<div ng-app></div>")}},t.module("ngMock",["ng"]).provider({$browser:t.mock.$BrowserProvider,$exceptionHandler:t.mock.$ExceptionHandlerProvider,$log:t.mock.$LogProvider,$interval:t.mock.$IntervalProvider,$httpBackend:t.mock.$HttpBackendProvider,$rootElement:t.mock.$RootElementProvider}).config(["$provide",function(e){e.decorator("$timeout",t.mock.$TimeoutDecorator),e.decorator("$$rAF",t.mock.$RAFDecorator),e.decorator("$$asyncCallback",t.mock.$AsyncCallbackDecorator)}]),t.module("ngMockE2E",["ng"]).config(["$provide",function(e){e.decorator("$httpBackend",t.mock.e2e.$httpBackendDecorator)}]),t.mock.e2e={},t.mock.e2e.$httpBackendDecorator=["$rootScope","$delegate","$browser",s],t.mock.clearDataCache=function(){var e,n=t.element.cache;for(e in n)if(Object.prototype.hasOwnProperty.call(n,e)){var r=n[e].handle;r&&t.element(r.elem).off(),delete n[e]}},e.jasmine||e.mocha){var f=null,l=function(){return!!f};(e.beforeEach||e.setup)(function(){f=this}),(e.afterEach||e.teardown)(function(){var e=f.$injector;t.forEach(f.$modules,function(e){e&&e.$$hashKey&&(e.$$hashKey=n)}),f.$injector=null,f.$modules=null,f=null,e&&(e.get("$rootElement").off(),e.get("$browser").pollFns.length=0),t.mock.clearDataCache(),t.forEach(t.element.fragments,function(e,n){delete t.element.fragments[n]}),c.$$lastInstance=null,t.forEach(t.callbacks,function(e,n){delete t.callbacks[n]}),t.callbacks.counter=0}),e.module=t.mock.module=function(){function e(){if(f.$injector)throw new Error("Injector already created, can not register a module!");var e=f.$modules||(f.$modules=[]);t.forEach(n,function(n){e.push(t.isObject(n)&&!t.isArray(n)?function(e){t.forEach(n,function(t,n){e.value(n,t)})}:n)})}var n=Array.prototype.slice.call(arguments,0);return l()?e():e};var d=function(e,t){this.message=e.message,this.name=e.name,e.line&&(this.line=e.line),e.sourceId&&(this.sourceId=e.sourceId),e.stack&&t&&(this.stack=e.stack+"\n"+t.stack),e.stackArray&&(this.stackArray=e.stackArray)};d.prototype.toString=Error.prototype.toString,e.inject=t.mock.inject=function(){function e(){var e=f.$modules||[];e.unshift("ngMock"),e.unshift("ng");var o=f.$injector;o||(o=f.$injector=t.injector(e));for(var i=0,s=n.length;s>i;i++)try{o.invoke(n[i]||t.noop,this)}catch(a){if(a.stack&&r)throw new d(a,r);throw a}finally{r=null}}var n=Array.prototype.slice.call(arguments,0),r=new Error("Declaration Location");return l()?e.call(f):e}}}(window,window.angular);
angular.module("youtube-embed",["ng"]).service("youtubeEmbedUtils",["$window","$rootScope",function(e,t){function r(e,t){return e.indexOf(t)>-1}var a={},n=/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi,i=/t=(\d+)[ms]?(\d+)?s?/;return a.getIdFromURL=function(e){var t=e.replace(n,"$1");if(r(t,";")){var a=t.split(";");if(r(a[1],"%")){var i=decodeURIComponent(t.split(";")[1]);t=("http://youtube.com"+i).replace(n,"$1")}else t=a[0]}else r(t,"#")&&(t=t.split("#")[0]);return t},a.getTimeFromURL=function(e){e=e||"";var t=e.match(i);if(!t)return 0;var a=t[0],n=t[1],o=t[2];return"undefined"!=typeof o?(o=parseInt(o,10),n=parseInt(n,10)):r(a,"m")?(n=parseInt(n,10),o=0):(o=parseInt(n,10),n=0),o+60*n},function(){var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),a.ready=!1,e.onYouTubeIframeAPIReady=function(){t.$apply(function(){a.ready=!0})},a}]).directive("youtubeVideo",["youtubeEmbedUtils",function(e){var t=1,r={"-1":"unstarted",0:"ended",1:"playing",2:"paused",3:"buffering",5:"queued"},a="youtube.player.";return{restrict:"EA",scope:{videoId:"=?",videoUrl:"=?",player:"=?",playerVars:"=?",playerHeight:"=?",playerWidth:"=?"},link:function(n,i,o){function u(){var e=Array.prototype.slice.call(arguments);n.$apply(function(){n.$emit.apply(n,e)})}function d(e){var t=r[e.data];"undefined"!=typeof t&&u(a+t,n.player,e),n.$apply(function(){n.player.currentState=t})}function l(e){u(a+"ready",n.player,e)}function p(){var e=angular.copy(n.playerVars);e.start=e.start||n.urlStartTime;var t=new YT.Player(c,{height:n.playerHeight,width:n.playerWidth,videoId:n.videoId,playerVars:e,events:{onReady:l,onStateChange:d}});return t.id=c,t}function y(){(n.videoId||n.playerVars.list)&&(n.player&&n.player.d&&"function"==typeof n.player.destroy&&n.player.destroy(),n.player=p())}n.utils=e;var c=o.playerId||i[0].id||"unique-youtube-embed-id-"+t++;i[0].id=c,n.playerHeight=n.playerHeight||390,n.playerWidth=n.playerWidth||640,n.playerVars=n.playerVars||{};var s=n.$watch(function(){return n.utils.ready&&("undefined"!=typeof n.videoUrl||"undefined"!=typeof n.videoId||"undefined"!=typeof n.playerVars.list)},function(e){e&&(s(),"undefined"!=typeof n.videoUrl?n.$watch("videoUrl",function(e){n.videoId=n.utils.getIdFromURL(e),n.urlStartTime=n.utils.getTimeFromURL(e),y()}):"undefined"!=typeof n.videoId?n.$watch("videoId",function(){n.urlStartTime=null,y()}):n.$watch("playerVars.list",function(){n.urlStartTime=null,y()}))});n.$watchCollection(["playerHeight","playerWidth"],function(){n.player&&n.player.setSize(n.playerWidth,n.playerHeight)}),n.$on("$destroy",function(){n.player&&n.player.destroy()})}}}]);
(function(){var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,a=r.slice,o=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,h.VERSION="1.7.0";var g=function(n,t,r){if(void 0===t)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?g(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},h.each=h.forEach=function(n,t,r){if(null==n)return n;t=g(t,r);var e,u=n.length;if(u===+u)for(e=0;u>e;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,a=Array(i),o=0;i>o;o++)e=u?u[o]:o,a[o]=t(n[e],e,n);return a};var v="Reduce of empty array with no initial value";h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length,o=0;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[o++]:o++]}for(;a>o;o++)u=i?i[o]:o,r=t(r,n[u],u,n);return r},h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[--a]:--a]}for(;a--;)u=i?i[a]:a,r=t(r,n[u],u,n);return r},h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){return t(n,r,u)?(e=n,!0):void 0}),e},h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},h.contains=h.include=function(n,t){return null==n?!1:(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},h.invoke=function(n,t){var r=a.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},h.pluck=function(n,t){return h.map(n,h.property(t))},h.where=function(n,t){return h.filter(n,h.matches(t))},h.findWhere=function(n,t){return h.find(n,h.matches(t))},h.max=function(n,t,r){var e,u,i=-1/0,a=-1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-1/0&&i===-1/0)&&(i=n,a=u)});return i},h.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],i>e&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(a>u||1/0===u&&1/0===i)&&(i=n,a=u)});return i},h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||void 0===r)return 1;if(e>r||void 0===e)return-1}return n.index-t.index}),"value")};var m=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};h.groupBy=m(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),h.indexBy=m(function(n,t,r){n[r]=t}),h.countBy=m(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,a=n.length;a>i;){var o=i+a>>>1;r(n[o])<u?i=o+1:a=o}return i},h.toArray=function(n){return n?h.isArray(n)?a.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},h.first=h.head=h.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:a.call(n,0,t)},h.initial=function(n,t,r){return a.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},h.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:a.call(n,Math.max(n.length-t,0))},h.rest=h.tail=h.drop=function(n,t,r){return a.call(n,null==t||r?1:t)},h.compact=function(n){return h.filter(n,h.identity)};var y=function(n,t,r,e){if(t&&h.every(n,h.isArray))return o.apply(e,n);for(var u=0,a=n.length;a>u;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):y(l,t,r,e):r||e.push(l)}return e};h.flatten=function(n,t){return y(n,t,!1,[])},h.without=function(n){return h.difference(n,a.call(arguments,1))},h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],a=0,o=n.length;o>a;a++){var l=n[a];if(t)a&&i===l||u.push(l),i=l;else if(r){var c=r(l,a,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},h.union=function(){return h.uniq(y(arguments,!0,!0,[]))},h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!h.contains(t,i)){for(var a=1;r>a&&h.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},h.difference=function(n){var t=y(a.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;t>e;e++)r[e]=h.pluck(arguments,e);return r},h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}for(;u>e;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var d=function(){};h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,a.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=a.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(a.call(arguments)));d.prototype=n.prototype;var u=new d;d.prototype=null;var i=n.apply(u,r.concat(a.call(arguments)));return h.isObject(i)?i:u}},h.partial=function(n){var t=a.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},h.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},h.delay=function(n,t){var r=a.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},h.defer=function(n){return h.delay.apply(h,[n,1].concat(a.call(arguments,1)))},h.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var l=function(){o=r.leading===!1?0:h.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var c=h.now();o||r.leading!==!1||(o=c);var f=t-(c-o);return e=this,u=arguments,0>=f||f>t?(clearTimeout(a),a=null,o=c,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(l,f)),i}},h.debounce=function(n,t,r){var e,u,i,a,o,l=function(){var c=h.now()-a;t>c&&c>0?e=setTimeout(l,t-c):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(o=n.apply(i,u),i=u=null),o}},h.wrap=function(n,t){return h.partial(t,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},h.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},h.once=h.partial(h.before,2),h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;u>e;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=g(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=o.apply([],a.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;f>c;c++)e=l[c],e in n&&(u[e]=n[e])}return u},h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(o.apply([],a.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;r>t;t++){var e=arguments[t];for(var u in e)void 0===n[u]&&(n[u]=e[u])}return n},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,t){return t(n),n};var b=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]===n)return e[i]===t;var a=n.constructor,o=t.constructor;if(a!==o&&"constructor"in n&&"constructor"in t&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c,f;if("[object Array]"===u){if(c=n.length,f=c===t.length)for(;c--&&(f=b(n[c],t[c],r,e)););}else{var s,p=h.keys(n);if(c=p.length,f=h.keys(t).length===c)for(;c--&&(s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}return r.pop(),e.pop(),f};h.isEqual=function(n,t){return b(n,t,[],[])},h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=f||function(n){return"[object Array]"===l.call(n)},h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&n!==+n},h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return void 0===n},h.has=function(n,t){return null!=n&&c.call(n,t)},h.noConflict=function(){return n._=t,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;r>e;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},h.times=function(n,t,r){var e=Array(Math.max(0,n));t=g(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),h.result=function(n,t){if(null==n)return void 0;var r=n[t];return h.isFunction(r)?n[t]():r};var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(O,F),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var l=function(n){return a.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},h.chain=function(n){var t=h(n);return t._chain=!0,t};var E=function(n){return this._chain?h(n).chain():n};h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);
var Canvas2Image=function(){function t(t,e,n){var r=t.width,a=t.height;void 0==e&&(e=r),void 0==n&&(n=a);var o=document.createElement("canvas"),i=o.getContext("2d");return o.width=e,o.height=n,i.drawImage(t,0,0,r,a,0,0,e,n),o}function e(e,n,r,a){return e=t(e,r,a),e.toDataURL(n)}function n(t){document.location.href=t}function r(t){var e=document.createElement("img");return e.src=t,e}function a(t){t=t.toLowerCase().replace(/jpg/i,"jpeg");var e=t.match(/png|jpeg|bmp|gif/)[0];return"image/"+e}function o(t){if(!window.btoa)throw"btoa undefined";var e="";if("string"==typeof t)e=t;else for(var n=0;n<t.length;n++)e+=String.fromCharCode(t[n]);return btoa(e)}function i(t){var e=t.width,n=t.height;return t.getContext("2d").getImageData(0,0,e,n)}function c(t,e){return"data:"+e+";base64,"+t}var u=function(){var t=document.createElement("canvas"),e=t.getContext("2d");return{canvas:!!e,imageData:!!e.getImageData,dataURL:!!t.toDataURL,btoa:!!window.btoa}}(),g="image/octet-stream",f=function(t){var e=t.width,n=t.height,r=e*n*3,a=r+54,i=[66,77,255&a,a>>8&255,a>>16&255,a>>24&255,0,0,0,0,54,0,0,0],c=[40,0,0,0,255&e,e>>8&255,e>>16&255,e>>24&255,255&n,n>>8&255,n>>16&255,n>>24&255,1,0,24,0,0,0,0,0,255&r,r>>8&255,r>>16&255,r>>24&255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],u=(4-3*e%4)%4,g=t.data,f="",v=e<<2,d=n,m=String.fromCharCode;do{for(var s=v*(d-1),p="",h=0;e>h;h++){var b=h<<2;p+=m(g[s+b+2])+m(g[s+b+1])+m(g[s+b])}for(var l=0;u>l;l++)p+=String.fromCharCode(0);f+=p}while(--d);var w=o(i.concat(c))+o(f);return w},v=function(r,o,v,d){if(u.canvas&&u.dataURL)if("string"==typeof r&&(r=document.getElementById(r)),void 0==d&&(d="png"),d=a(d),/bmp/.test(d)){var m=i(t(r,o,v)),s=f(m);n(c(s,g))}else{var s=e(r,d,o,v);n(s.replace(d,g))}},d=function(n,o,g,v){if(u.canvas&&u.dataURL){if("string"==typeof n&&(n=document.getElementById(n)),void 0==v&&(v="png"),v=a(v),/bmp/.test(v)){var d=i(t(n,o,g)),m=f(d);return r(c(m,"image/bmp"))}var m=e(n,v,o,g);return r(m)}};return{saveAsImage:v,saveAsPNG:function(t,e,n){return v(t,e,n,"png")},saveAsJPEG:function(t,e,n){return v(t,e,n,"jpeg")},saveAsGIF:function(t,e,n){return v(t,e,n,"gif")},saveAsBMP:function(t,e,n){return v(t,e,n,"bmp")},convertToImage:d,convertToPNG:function(t,e,n){return d(t,e,n,"png")},convertToJPEG:function(t,e,n){return d(t,e,n,"jpeg")},convertToGIF:function(t,e,n){return d(t,e,n,"gif")},convertToBMP:function(t,e,n){return d(t,e,n,"bmp")}}}();
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.io=t()}}(function(){var t;return function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+s+"'")}var u=n[s]={exports:{}};t[s][0].call(u.exports,function(e){var n=t[s][1][e];return o(n?n:e)},u,u.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(t,e){e.exports=t("./lib/")},{"./lib/":2}],2:[function(t,e,n){function r(t,e){"object"==typeof t&&(e=t,t=void 0),e=e||{};var n,r=o(t),i=r.source,u=r.id;return e.forceNew||e["force new connection"]||!1===e.multiplex?(a("ignoring socket cache for %s",i),n=s(i,e)):(c[u]||(a("new io instance for %s",i),c[u]=s(i,e)),n=c[u]),n.socket(r.path)}var o=t("./url"),i=t("socket.io-parser"),s=t("./manager"),a=t("debug")("socket.io-client");e.exports=n=r;var c=n.managers={};n.protocol=i.protocol,n.connect=r,n.Manager=t("./manager"),n.Socket=t("./socket")},{"./manager":3,"./socket":5,"./url":6,debug:9,"socket.io-parser":43}],3:[function(t,e){function n(t,e){return this instanceof n?(t&&"object"==typeof t&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.nsps={},this.subs=[],this.opts=e,this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.timeout(null==e.timeout?2e4:e.timeout),this.readyState="closed",this.uri=t,this.connected=[],this.attempts=0,this.encoding=!1,this.packetBuffer=[],this.encoder=new s.Encoder,this.decoder=new s.Decoder,this.autoConnect=e.autoConnect!==!1,void(this.autoConnect&&this.open())):new n(t,e)}var r=(t("./url"),t("engine.io-client")),o=t("./socket"),i=t("component-emitter"),s=t("socket.io-parser"),a=t("./on"),c=t("component-bind"),u=(t("object-component"),t("debug")("socket.io-client:manager")),p=t("indexof");e.exports=n,n.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var t in this.nsps)this.nsps[t].emit.apply(this.nsps[t],arguments)},i(n.prototype),n.prototype.reconnection=function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection},n.prototype.reconnectionAttempts=function(t){return arguments.length?(this._reconnectionAttempts=t,this):this._reconnectionAttempts},n.prototype.reconnectionDelay=function(t){return arguments.length?(this._reconnectionDelay=t,this):this._reconnectionDelay},n.prototype.reconnectionDelayMax=function(t){return arguments.length?(this._reconnectionDelayMax=t,this):this._reconnectionDelayMax},n.prototype.timeout=function(t){return arguments.length?(this._timeout=t,this):this._timeout},n.prototype.maybeReconnectOnOpen=function(){this.openReconnect||this.reconnecting||!this._reconnection||0!==this.attempts||(this.openReconnect=!0,this.reconnect())},n.prototype.open=n.prototype.connect=function(t){if(u("readyState %s",this.readyState),~this.readyState.indexOf("open"))return this;u("opening %s",this.uri),this.engine=r(this.uri,this.opts);var e=this.engine,n=this;this.readyState="opening",this.skipReconnect=!1;var o=a(e,"open",function(){n.onopen(),t&&t()}),i=a(e,"error",function(e){if(u("connect_error"),n.cleanup(),n.readyState="closed",n.emitAll("connect_error",e),t){var r=new Error("Connection error");r.data=e,t(r)}n.maybeReconnectOnOpen()});if(!1!==this._timeout){var s=this._timeout;u("connect attempt will timeout after %d",s);var c=setTimeout(function(){u("connect attempt timed out after %d",s),o.destroy(),e.close(),e.emit("error","timeout"),n.emitAll("connect_timeout",s)},s);this.subs.push({destroy:function(){clearTimeout(c)}})}return this.subs.push(o),this.subs.push(i),this},n.prototype.onopen=function(){u("open"),this.cleanup(),this.readyState="open",this.emit("open");var t=this.engine;this.subs.push(a(t,"data",c(this,"ondata"))),this.subs.push(a(this.decoder,"decoded",c(this,"ondecoded"))),this.subs.push(a(t,"error",c(this,"onerror"))),this.subs.push(a(t,"close",c(this,"onclose")))},n.prototype.ondata=function(t){this.decoder.add(t)},n.prototype.ondecoded=function(t){this.emit("packet",t)},n.prototype.onerror=function(t){u("error",t),this.emitAll("error",t)},n.prototype.socket=function(t){var e=this.nsps[t];if(!e){e=new o(this,t),this.nsps[t]=e;var n=this;e.on("connect",function(){~p(n.connected,e)||n.connected.push(e)})}return e},n.prototype.destroy=function(t){var e=p(this.connected,t);~e&&this.connected.splice(e,1),this.connected.length||this.close()},n.prototype.packet=function(t){u("writing packet %j",t);var e=this;e.encoding?e.packetBuffer.push(t):(e.encoding=!0,this.encoder.encode(t,function(t){for(var n=0;n<t.length;n++)e.engine.write(t[n]);e.encoding=!1,e.processPacketQueue()}))},n.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var t=this.packetBuffer.shift();this.packet(t)}},n.prototype.cleanup=function(){for(var t;t=this.subs.shift();)t.destroy();this.packetBuffer=[],this.encoding=!1,this.decoder.destroy()},n.prototype.close=n.prototype.disconnect=function(){this.skipReconnect=!0,this.readyState="closed",this.engine&&this.engine.close()},n.prototype.onclose=function(t){u("close"),this.cleanup(),this.readyState="closed",this.emit("close",t),this._reconnection&&!this.skipReconnect&&this.reconnect()},n.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var t=this;if(this.attempts++,this.attempts>this._reconnectionAttempts)u("reconnect failed"),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var e=this.attempts*this.reconnectionDelay();e=Math.min(e,this.reconnectionDelayMax()),u("will wait %dms before reconnect attempt",e),this.reconnecting=!0;var n=setTimeout(function(){t.skipReconnect||(u("attempting reconnect"),t.emitAll("reconnect_attempt",t.attempts),t.emitAll("reconnecting",t.attempts),t.skipReconnect||t.open(function(e){e?(u("reconnect attempt error"),t.reconnecting=!1,t.reconnect(),t.emitAll("reconnect_error",e.data)):(u("reconnect success"),t.onreconnect())}))},e);this.subs.push({destroy:function(){clearTimeout(n)}})}},n.prototype.onreconnect=function(){var t=this.attempts;this.attempts=0,this.reconnecting=!1,this.emitAll("reconnect",t)}},{"./on":4,"./socket":5,"./url":6,"component-bind":7,"component-emitter":8,debug:9,"engine.io-client":10,indexof:39,"object-component":40,"socket.io-parser":43}],4:[function(t,e){function n(t,e,n){return t.on(e,n),{destroy:function(){t.removeListener(e,n)}}}e.exports=n},{}],5:[function(t,e,n){function r(t,e){this.io=t,this.nsp=e,this.json=this,this.ids=0,this.acks={},this.io.autoConnect&&this.open(),this.receiveBuffer=[],this.sendBuffer=[],this.connected=!1,this.disconnected=!0}var o=t("socket.io-parser"),i=t("component-emitter"),s=t("to-array"),a=t("./on"),c=t("component-bind"),u=t("debug")("socket.io-client:socket"),p=t("has-binary");e.exports=n=r;var f={connect:1,connect_error:1,connect_timeout:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1},h=i.prototype.emit;i(r.prototype),r.prototype.subEvents=function(){if(!this.subs){var t=this.io;this.subs=[a(t,"open",c(this,"onopen")),a(t,"packet",c(this,"onpacket")),a(t,"close",c(this,"onclose"))]}},r.prototype.open=r.prototype.connect=function(){return this.connected?this:(this.subEvents(),this.io.open(),"open"==this.io.readyState&&this.onopen(),this)},r.prototype.send=function(){var t=s(arguments);return t.unshift("message"),this.emit.apply(this,t),this},r.prototype.emit=function(t){if(f.hasOwnProperty(t))return h.apply(this,arguments),this;var e=s(arguments),n=o.EVENT;p(e)&&(n=o.BINARY_EVENT);var r={type:n,data:e};return"function"==typeof e[e.length-1]&&(u("emitting packet with ack id %d",this.ids),this.acks[this.ids]=e.pop(),r.id=this.ids++),this.connected?this.packet(r):this.sendBuffer.push(r),this},r.prototype.packet=function(t){t.nsp=this.nsp,this.io.packet(t)},r.prototype.onopen=function(){u("transport is open - connecting"),"/"!=this.nsp&&this.packet({type:o.CONNECT})},r.prototype.onclose=function(t){u("close (%s)",t),this.connected=!1,this.disconnected=!0,this.emit("disconnect",t)},r.prototype.onpacket=function(t){if(t.nsp==this.nsp)switch(t.type){case o.CONNECT:this.onconnect();break;case o.EVENT:this.onevent(t);break;case o.BINARY_EVENT:this.onevent(t);break;case o.ACK:this.onack(t);break;case o.BINARY_ACK:this.onack(t);break;case o.DISCONNECT:this.ondisconnect();break;case o.ERROR:this.emit("error",t.data)}},r.prototype.onevent=function(t){var e=t.data||[];u("emitting event %j",e),null!=t.id&&(u("attaching ack callback to event"),e.push(this.ack(t.id))),this.connected?h.apply(this,e):this.receiveBuffer.push(e)},r.prototype.ack=function(t){var e=this,n=!1;return function(){if(!n){n=!0;var r=s(arguments);u("sending ack %j",r);var i=p(r)?o.BINARY_ACK:o.ACK;e.packet({type:i,id:t,data:r})}}},r.prototype.onack=function(t){u("calling ack %s with %j",t.id,t.data);var e=this.acks[t.id];e.apply(this,t.data),delete this.acks[t.id]},r.prototype.onconnect=function(){this.connected=!0,this.disconnected=!1,this.emit("connect"),this.emitBuffered()},r.prototype.emitBuffered=function(){var t;for(t=0;t<this.receiveBuffer.length;t++)h.apply(this,this.receiveBuffer[t]);for(this.receiveBuffer=[],t=0;t<this.sendBuffer.length;t++)this.packet(this.sendBuffer[t]);this.sendBuffer=[]},r.prototype.ondisconnect=function(){u("server disconnect (%s)",this.nsp),this.destroy(),this.onclose("io server disconnect")},r.prototype.destroy=function(){if(this.subs){for(var t=0;t<this.subs.length;t++)this.subs[t].destroy();this.subs=null}this.io.destroy(this)},r.prototype.close=r.prototype.disconnect=function(){return this.connected&&(u("performing disconnect (%s)",this.nsp),this.packet({type:o.DISCONNECT})),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}},{"./on":4,"component-bind":7,"component-emitter":8,debug:9,"has-binary":35,"socket.io-parser":43,"to-array":47}],6:[function(t,e){(function(n){function r(t,e){var r=t,e=e||n.location;return null==t&&(t=e.protocol+"//"+e.hostname),"string"==typeof t&&("/"==t.charAt(0)&&(t="/"==t.charAt(1)?e.protocol+t:e.hostname+t),/^(https?|wss?):\/\//.test(t)||(i("protocol-less url %s",t),t="undefined"!=typeof e?e.protocol+"//"+t:"https://"+t),i("parse %s",t),r=o(t)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/",r.id=r.protocol+"://"+r.host+":"+r.port,r.href=r.protocol+"://"+r.host+(e&&e.port==r.port?"":":"+r.port),r}var o=t("parseuri"),i=t("debug")("socket.io-client:url");e.exports=r}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{debug:9,parseuri:41}],7:[function(t,e){var n=[].slice;e.exports=function(t,e){if("string"==typeof e&&(e=t[e]),"function"!=typeof e)throw new Error("bind() requires a function");var r=n.call(arguments,2);return function(){return e.apply(t,r.concat(n.call(arguments)))}}},{}],8:[function(t,e){function n(t){return t?r(t):void 0}function r(t){for(var e in n.prototype)t[e]=n.prototype[e];return t}e.exports=n,n.prototype.on=n.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks[t]=this._callbacks[t]||[]).push(e),this},n.prototype.once=function(t,e){function n(){r.off(t,n),e.apply(this,arguments)}var r=this;return this._callbacks=this._callbacks||{},n.fn=e,this.on(t,n),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks[t];if(!n)return this;if(1==arguments.length)return delete this._callbacks[t],this;for(var r,o=0;o<n.length;o++)if(r=n[o],r===e||r.fn===e){n.splice(o,1);break}return this},n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks[t];if(n){n=n.slice(0);for(var r=0,o=n.length;o>r;++r)n[r].apply(this,e)}return this},n.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks[t]||[]},n.prototype.hasListeners=function(t){return!!this.listeners(t).length}},{}],9:[function(t,e){function n(t){return n.enabled(t)?function(e){e=r(e);var o=new Date,i=o-(n[t]||o);n[t]=o,e=t+" "+e+" +"+n.humanize(i),window.console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}:function(){}}function r(t){return t instanceof Error?t.stack||t.message:t}e.exports=n,n.names=[],n.skips=[],n.enable=function(t){try{localStorage.debug=t}catch(e){}for(var r=(t||"").split(/[\s,]+/),o=r.length,i=0;o>i;i++)t=r[i].replace("*",".*?"),"-"===t[0]?n.skips.push(new RegExp("^"+t.substr(1)+"$")):n.names.push(new RegExp("^"+t+"$"))},n.disable=function(){n.enable("")},n.humanize=function(t){var e=1e3,n=6e4,r=60*n;return t>=r?(t/r).toFixed(1)+"h":t>=n?(t/n).toFixed(1)+"m":t>=e?(t/e|0)+"s":t+"ms"},n.enabled=function(t){for(var e=0,r=n.skips.length;r>e;e++)if(n.skips[e].test(t))return!1;for(var e=0,r=n.names.length;r>e;e++)if(n.names[e].test(t))return!0;return!1};try{window.localStorage&&n.enable(localStorage.debug)}catch(o){}},{}],10:[function(t,e){e.exports=t("./lib/")},{"./lib/":11}],11:[function(t,e){e.exports=t("./socket"),e.exports.parser=t("engine.io-parser")},{"./socket":12,"engine.io-parser":24}],12:[function(t,e){(function(n){function r(t,e){if(!(this instanceof r))return new r(t,e);if(e=e||{},t&&"object"==typeof t&&(e=t,t=null),t&&(t=p(t),e.host=t.host,e.secure="https"==t.protocol||"wss"==t.protocol,e.port=t.port,t.query&&(e.query=t.query)),this.secure=null!=e.secure?e.secure:n.location&&"https:"==location.protocol,e.host){var o=e.host.split(":");e.hostname=o.shift(),o.length&&(e.port=o.pop())}this.agent=e.agent||!1,this.hostname=e.hostname||(n.location?location.hostname:"localhost"),this.port=e.port||(n.location&&location.port?location.port:this.secure?443:80),this.query=e.query||{},"string"==typeof this.query&&(this.query=h.decode(this.query)),this.upgrade=!1!==e.upgrade,this.path=(e.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!e.forceJSONP,this.jsonp=!1!==e.jsonp,this.forceBase64=!!e.forceBase64,this.enablesXDR=!!e.enablesXDR,this.timestampParam=e.timestampParam||"t",this.timestampRequests=e.timestampRequests,this.transports=e.transports||["polling","websocket"],this.readyState="",this.writeBuffer=[],this.callbackBuffer=[],this.policyPort=e.policyPort||843,this.rememberUpgrade=e.rememberUpgrade||!1,this.open(),this.binaryType=null,this.onlyBinaryUpgrades=e.onlyBinaryUpgrades}function o(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}var i=t("./transports"),s=t("component-emitter"),a=t("debug")("engine.io-client:socket"),c=t("indexof"),u=t("engine.io-parser"),p=t("parseuri"),f=t("parsejson"),h=t("parseqs");e.exports=r,r.priorWebsocketSuccess=!1,s(r.prototype),r.protocol=u.protocol,r.Socket=r,r.Transport=t("./transport"),r.transports=t("./transports"),r.parser=t("engine.io-parser"),r.prototype.createTransport=function(t){a('creating transport "%s"',t);var e=o(this.query);e.EIO=u.protocol,e.transport=t,this.id&&(e.sid=this.id);var n=new i[t]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:e,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,policyPort:this.policyPort,socket:this});return n},r.prototype.open=function(){var t;if(this.rememberUpgrade&&r.priorWebsocketSuccess&&-1!=this.transports.indexOf("websocket"))t="websocket";else{if(0==this.transports.length){var e=this;return void setTimeout(function(){e.emit("error","No transports available")},0)}t=this.transports[0]}this.readyState="opening";var t;try{t=this.createTransport(t)}catch(n){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)},r.prototype.setTransport=function(t){a("setting transport %s",t.name);var e=this;this.transport&&(a("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=t,t.on("drain",function(){e.onDrain()}).on("packet",function(t){e.onPacket(t)}).on("error",function(t){e.onError(t)}).on("close",function(){e.onClose("transport close")})},r.prototype.probe=function(t){function e(){if(h.onlyBinaryUpgrades){var e=!this.supportsBinary&&h.transport.supportsBinary;f=f||e}f||(a('probe transport "%s" opened',t),p.send([{type:"ping",data:"probe"}]),p.once("packet",function(e){if(!f)if("pong"==e.type&&"probe"==e.data){if(a('probe transport "%s" pong',t),h.upgrading=!0,h.emit("upgrading",p),!p)return;r.priorWebsocketSuccess="websocket"==p.name,a('pausing current transport "%s"',h.transport.name),h.transport.pause(function(){f||"closed"!=h.readyState&&(a("changing transport and sending upgrade packet"),u(),h.setTransport(p),p.send([{type:"upgrade"}]),h.emit("upgrade",p),p=null,h.upgrading=!1,h.flush())})}else{a('probe transport "%s" failed',t);var n=new Error("probe error");n.transport=p.name,h.emit("upgradeError",n)}}))}function n(){f||(f=!0,u(),p.close(),p=null)}function o(e){var r=new Error("probe error: "+e);r.transport=p.name,n(),a('probe transport "%s" failed because of error: %s',t,e),h.emit("upgradeError",r)}function i(){o("transport closed")}function s(){o("socket closed")}function c(t){p&&t.name!=p.name&&(a('"%s" works - aborting "%s"',t.name,p.name),n())}function u(){p.removeListener("open",e),p.removeListener("error",o),p.removeListener("close",i),h.removeListener("close",s),h.removeListener("upgrading",c)}a('probing transport "%s"',t);var p=this.createTransport(t,{probe:1}),f=!1,h=this;r.priorWebsocketSuccess=!1,p.once("open",e),p.once("error",o),p.once("close",i),this.once("close",s),this.once("upgrading",c),p.open()},r.prototype.onOpen=function(){if(a("socket open"),this.readyState="open",r.priorWebsocketSuccess="websocket"==this.transport.name,this.emit("open"),this.flush(),"open"==this.readyState&&this.upgrade&&this.transport.pause){a("starting upgrade probes");for(var t=0,e=this.upgrades.length;e>t;t++)this.probe(this.upgrades[t])}},r.prototype.onPacket=function(t){if("opening"==this.readyState||"open"==this.readyState)switch(a('socket receive: type "%s", data "%s"',t.type,t.data),this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(f(t.data));break;case"pong":this.setPing();break;case"error":var e=new Error("server error");e.code=t.data,this.emit("error",e);break;case"message":this.emit("data",t.data),this.emit("message",t.data)}else a('packet received with socket readyState "%s"',this.readyState)},r.prototype.onHandshake=function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!=this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},r.prototype.onHeartbeat=function(t){clearTimeout(this.pingTimeoutTimer);var e=this;e.pingTimeoutTimer=setTimeout(function(){"closed"!=e.readyState&&e.onClose("ping timeout")},t||e.pingInterval+e.pingTimeout)},r.prototype.setPing=function(){var t=this;clearTimeout(t.pingIntervalTimer),t.pingIntervalTimer=setTimeout(function(){a("writing ping packet - expecting pong within %sms",t.pingTimeout),t.ping(),t.onHeartbeat(t.pingTimeout)},t.pingInterval)},r.prototype.ping=function(){this.sendPacket("ping")},r.prototype.onDrain=function(){for(var t=0;t<this.prevBufferLen;t++)this.callbackBuffer[t]&&this.callbackBuffer[t]();this.writeBuffer.splice(0,this.prevBufferLen),this.callbackBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0==this.writeBuffer.length?this.emit("drain"):this.flush()},r.prototype.flush=function(){"closed"!=this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(a("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},r.prototype.write=r.prototype.send=function(t,e){return this.sendPacket("message",t,e),this},r.prototype.sendPacket=function(t,e,n){if("closing"!=this.readyState&&"closed"!=this.readyState){var r={type:t,data:e};this.emit("packetCreate",r),this.writeBuffer.push(r),this.callbackBuffer.push(n),this.flush()}},r.prototype.close=function(){function t(){r.onClose("forced close"),a("socket closing - telling transport to close"),r.transport.close()}function e(){r.removeListener("upgrade",e),r.removeListener("upgradeError",e),t()}function n(){r.once("upgrade",e),r.once("upgradeError",e)}if("opening"==this.readyState||"open"==this.readyState){this.readyState="closing";var r=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?n():t()}):this.upgrading?n():t()}return this},r.prototype.onError=function(t){a("socket error %j",t),r.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t)},r.prototype.onClose=function(t,e){if("opening"==this.readyState||"open"==this.readyState||"closing"==this.readyState){a('socket close with reason: "%s"',t);var n=this;clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),setTimeout(function(){n.writeBuffer=[],n.callbackBuffer=[],n.prevBufferLen=0},0),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",t,e)}},r.prototype.filterUpgrades=function(t){for(var e=[],n=0,r=t.length;r>n;n++)~c(this.transports,t[n])&&e.push(t[n]);return e}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./transport":13,"./transports":14,"component-emitter":8,debug:21,"engine.io-parser":24,indexof:39,parsejson:31,parseqs:32,parseuri:33}],13:[function(t,e){function n(t){this.path=t.path,this.hostname=t.hostname,this.port=t.port,this.secure=t.secure,this.query=t.query,this.timestampParam=t.timestampParam,this.timestampRequests=t.timestampRequests,this.readyState="",this.agent=t.agent||!1,this.socket=t.socket,this.enablesXDR=t.enablesXDR}var r=t("engine.io-parser"),o=t("component-emitter");e.exports=n,o(n.prototype),n.timestamps=0,n.prototype.onError=function(t,e){var n=new Error(t);return n.type="TransportError",n.description=e,this.emit("error",n),this},n.prototype.open=function(){return("closed"==this.readyState||""==this.readyState)&&(this.readyState="opening",this.doOpen()),this},n.prototype.close=function(){return("opening"==this.readyState||"open"==this.readyState)&&(this.doClose(),this.onClose()),this},n.prototype.send=function(t){if("open"!=this.readyState)throw new Error("Transport not open");this.write(t)},n.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},n.prototype.onData=function(t){var e=r.decodePacket(t,this.socket.binaryType);this.onPacket(e)},n.prototype.onPacket=function(t){this.emit("packet",t)},n.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},{"component-emitter":8,"engine.io-parser":24}],14:[function(t,e,n){(function(e){function r(t){var n,r=!1,a=!1,c=!1!==t.jsonp;if(e.location){var u="https:"==location.protocol,p=location.port;p||(p=u?443:80),r=t.hostname!=location.hostname||p!=t.port,a=t.secure!=u}if(t.xdomain=r,t.xscheme=a,n=new o(t),"open"in n&&!t.forceJSONP)return new i(t);if(!c)throw new Error("JSONP disabled");return new s(t)}var o=t("xmlhttprequest"),i=t("./polling-xhr"),s=t("./polling-jsonp"),a=t("./websocket");n.polling=r,n.websocket=a}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./polling-jsonp":15,"./polling-xhr":16,"./websocket":18,xmlhttprequest:19}],15:[function(t,e){(function(n){function r(){}function o(t){i.call(this,t),this.query=this.query||{},a||(n.___eio||(n.___eio=[]),a=n.___eio),this.index=a.length;var e=this;a.push(function(t){e.onData(t)}),this.query.j=this.index,n.document&&n.addEventListener&&n.addEventListener("beforeunload",function(){e.script&&(e.script.onerror=r)},!1)}var i=t("./polling"),s=t("component-inherit");e.exports=o;var a,c=/\n/g,u=/\\n/g;s(o,i),o.prototype.supportsBinary=!1,o.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),i.prototype.doClose.call(this)},o.prototype.doPoll=function(){var t=this,e=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),e.async=!0,e.src=this.uri(),e.onerror=function(e){t.onError("jsonp poll error",e)};var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n),this.script=e;var r="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent);r&&setTimeout(function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t)},100)},o.prototype.doWrite=function(t,e){function n(){r(),e()}function r(){if(o.iframe)try{o.form.removeChild(o.iframe)}catch(t){o.onError("jsonp polling iframe removal error",t)}try{var e='<iframe src="javascript:0" name="'+o.iframeId+'">';i=document.createElement(e)}catch(t){i=document.createElement("iframe"),i.name=o.iframeId,i.src="javascript:0"}i.id=o.iframeId,o.form.appendChild(i),o.iframe=i}var o=this;if(!this.form){var i,s=document.createElement("form"),a=document.createElement("textarea"),p=this.iframeId="eio_iframe_"+this.index;s.className="socketio",s.style.position="absolute",s.style.top="-1000px",s.style.left="-1000px",s.target=p,s.method="POST",s.setAttribute("accept-charset","utf-8"),a.name="d",s.appendChild(a),document.body.appendChild(s),this.form=s,this.area=a}this.form.action=this.uri(),r(),t=t.replace(u,"\\\n"),this.area.value=t.replace(c,"\\n");try{this.form.submit()}catch(f){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"==o.iframe.readyState&&n()}:this.iframe.onload=n}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./polling":17,"component-inherit":20}],16:[function(t,e){(function(n){function r(){}function o(t){if(c.call(this,t),n.location){var e="https:"==location.protocol,r=location.port;r||(r=e?443:80),this.xd=t.hostname!=n.location.hostname||r!=t.port,this.xs=t.secure!=e}}function i(t){this.method=t.method||"GET",this.uri=t.uri,this.xd=!!t.xd,this.xs=!!t.xs,this.async=!1!==t.async,this.data=void 0!=t.data?t.data:null,this.agent=t.agent,this.isBinary=t.isBinary,this.supportsBinary=t.supportsBinary,this.enablesXDR=t.enablesXDR,this.create()}function s(){for(var t in i.requests)i.requests.hasOwnProperty(t)&&i.requests[t].abort()}var a=t("xmlhttprequest"),c=t("./polling"),u=t("component-emitter"),p=t("component-inherit"),f=t("debug")("engine.io-client:polling-xhr");e.exports=o,e.exports.Request=i,p(o,c),o.prototype.supportsBinary=!0,o.prototype.request=function(t){return t=t||{},t.uri=this.uri(),t.xd=this.xd,t.xs=this.xs,t.agent=this.agent||!1,t.supportsBinary=this.supportsBinary,t.enablesXDR=this.enablesXDR,new i(t)},o.prototype.doWrite=function(t,e){var n="string"!=typeof t&&void 0!==t,r=this.request({method:"POST",data:t,isBinary:n}),o=this;r.on("success",e),r.on("error",function(t){o.onError("xhr post error",t)}),this.sendXhr=r},o.prototype.doPoll=function(){f("xhr poll");var t=this.request(),e=this;t.on("data",function(t){e.onData(t)}),t.on("error",function(t){e.onError("xhr poll error",t)}),this.pollXhr=t},u(i.prototype),i.prototype.create=function(){var t=this.xhr=new a({agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR}),e=this;try{if(f("xhr open %s: %s",this.method,this.uri),t.open(this.method,this.uri,this.async),this.supportsBinary&&(t.responseType="arraybuffer"),"POST"==this.method)try{this.isBinary?t.setRequestHeader("Content-type","application/octet-stream"):t.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(r){}"withCredentials"in t&&(t.withCredentials=!0),this.hasXDR()?(t.onload=function(){e.onLoad()},t.onerror=function(){e.onError(t.responseText)}):t.onreadystatechange=function(){4==t.readyState&&(200==t.status||1223==t.status?e.onLoad():setTimeout(function(){e.onError(t.status)},0))},f("xhr data %s",this.data),t.send(this.data)}catch(r){return void setTimeout(function(){e.onError(r)},0)}n.document&&(this.index=i.requestsCount++,i.requests[this.index]=this)},i.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},i.prototype.onData=function(t){this.emit("data",t),this.onSuccess()},i.prototype.onError=function(t){this.emit("error",t),this.cleanup()},i.prototype.cleanup=function(){if("undefined"!=typeof this.xhr&&null!==this.xhr){this.hasXDR()?this.xhr.onload=this.xhr.onerror=r:this.xhr.onreadystatechange=r;try{this.xhr.abort()}catch(t){}n.document&&delete i.requests[this.index],this.xhr=null}},i.prototype.onLoad=function(){var t;try{var e;try{e=this.xhr.getResponseHeader("Content-Type").split(";")[0]}catch(n){}t="application/octet-stream"===e?this.xhr.response:this.supportsBinary?"ok":this.xhr.responseText}catch(n){this.onError(n)}null!=t&&this.onData(t)},i.prototype.hasXDR=function(){return"undefined"!=typeof n.XDomainRequest&&!this.xs&&this.enablesXDR},i.prototype.abort=function(){this.cleanup()},n.document&&(i.requestsCount=0,i.requests={},n.attachEvent?n.attachEvent("onunload",s):n.addEventListener&&n.addEventListener("beforeunload",s,!1))}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./polling":17,"component-emitter":8,"component-inherit":20,debug:21,xmlhttprequest:19}],17:[function(t,e){function n(t){var e=t&&t.forceBase64;(!c||e)&&(this.supportsBinary=!1),r.call(this,t)}var r=t("../transport"),o=t("parseqs"),i=t("engine.io-parser"),s=t("component-inherit"),a=t("debug")("engine.io-client:polling");e.exports=n;var c=function(){var e=t("xmlhttprequest"),n=new e({xdomain:!1});return null!=n.responseType}();s(n,r),n.prototype.name="polling",n.prototype.doOpen=function(){this.poll()},n.prototype.pause=function(t){function e(){a("paused"),n.readyState="paused",t()}var n=this;if(this.readyState="pausing",this.polling||!this.writable){var r=0;this.polling&&(a("we are currently polling - waiting to pause"),r++,this.once("pollComplete",function(){a("pre-pause polling complete"),--r||e()})),this.writable||(a("we are currently writing - waiting to pause"),r++,this.once("drain",function(){a("pre-pause writing complete"),--r||e()}))}else e()},n.prototype.poll=function(){a("polling"),this.polling=!0,this.doPoll(),this.emit("poll")},n.prototype.onData=function(t){var e=this;a("polling got data %s",t);var n=function(t){return"opening"==e.readyState&&e.onOpen(),"close"==t.type?(e.onClose(),!1):void e.onPacket(t)};i.decodePayload(t,this.socket.binaryType,n),"closed"!=this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"==this.readyState?this.poll():a('ignoring poll - transport state "%s"',this.readyState))},n.prototype.doClose=function(){function t(){a("writing close packet"),e.write([{type:"close"}])}var e=this;"open"==this.readyState?(a("transport open - closing"),t()):(a("transport not open - deferring close"),this.once("open",t))},n.prototype.write=function(t){var e=this;this.writable=!1;var n=function(){e.writable=!0,e.emit("drain")},e=this;i.encodePayload(t,this.supportsBinary,function(t){e.doWrite(t,n)})},n.prototype.uri=function(){var t=this.query||{},e=this.secure?"https":"http",n="";return!1!==this.timestampRequests&&(t[this.timestampParam]=+new Date+"-"+r.timestamps++),this.supportsBinary||t.sid||(t.b64=1),t=o.encode(t),this.port&&("https"==e&&443!=this.port||"http"==e&&80!=this.port)&&(n=":"+this.port),t.length&&(t="?"+t),e+"://"+this.hostname+n+this.path+t}},{"../transport":13,"component-inherit":20,debug:21,"engine.io-parser":24,parseqs:32,xmlhttprequest:19}],18:[function(t,e){function n(t){var e=t&&t.forceBase64;
e&&(this.supportsBinary=!1),r.call(this,t)}var r=t("../transport"),o=t("engine.io-parser"),i=t("parseqs"),s=t("component-inherit"),a=t("debug")("engine.io-client:websocket"),c=t("ws");e.exports=n,s(n,r),n.prototype.name="websocket",n.prototype.supportsBinary=!0,n.prototype.doOpen=function(){if(this.check()){var t=this.uri(),e=void 0,n={agent:this.agent};this.ws=new c(t,e,n),void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.binaryType="arraybuffer",this.addEventListeners()}},n.prototype.addEventListeners=function(){var t=this;this.ws.onopen=function(){t.onOpen()},this.ws.onclose=function(){t.onClose()},this.ws.onmessage=function(e){t.onData(e.data)},this.ws.onerror=function(e){t.onError("websocket error",e)}},"undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)&&(n.prototype.onData=function(t){var e=this;setTimeout(function(){r.prototype.onData.call(e,t)},0)}),n.prototype.write=function(t){function e(){n.writable=!0,n.emit("drain")}var n=this;this.writable=!1;for(var r=0,i=t.length;i>r;r++)o.encodePacket(t[r],this.supportsBinary,function(t){try{n.ws.send(t)}catch(e){a("websocket closed before onclose event")}});setTimeout(e,0)},n.prototype.onClose=function(){r.prototype.onClose.call(this)},n.prototype.doClose=function(){"undefined"!=typeof this.ws&&this.ws.close()},n.prototype.uri=function(){var t=this.query||{},e=this.secure?"wss":"ws",n="";return this.port&&("wss"==e&&443!=this.port||"ws"==e&&80!=this.port)&&(n=":"+this.port),this.timestampRequests&&(t[this.timestampParam]=+new Date),this.supportsBinary||(t.b64=1),t=i.encode(t),t.length&&(t="?"+t),e+"://"+this.hostname+n+this.path+t},n.prototype.check=function(){return!(!c||"__initialize"in c&&this.name===n.prototype.name)}},{"../transport":13,"component-inherit":20,debug:21,"engine.io-parser":24,parseqs:32,ws:34}],19:[function(t,e){var n=t("has-cors");e.exports=function(t){var e=t.xdomain,r=t.xscheme,o=t.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!e||n))return new XMLHttpRequest}catch(i){}try{if("undefined"!=typeof XDomainRequest&&!r&&o)return new XDomainRequest}catch(i){}if(!e)try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(i){}}},{"has-cors":37}],20:[function(t,e){e.exports=function(t,e){var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},{}],21:[function(t,e,n){function r(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var t=arguments,e=this.useColors;if(t[0]=(e?"%c":"")+this.namespace+(e?" %c":" ")+t[0]+(e?"%c ":" ")+"+"+n.humanize(this.diff),!e)return t;var r="color: "+this.color;t=[t[0],r,"color: inherit"].concat(Array.prototype.slice.call(t,1));var o=0,i=0;return t[0].replace(/%[a-z%]/g,function(t){"%"!==t&&(o++,"%c"===t&&(i=o))}),t.splice(i,0,r),t}function i(){return"object"==typeof console&&"function"==typeof console.log&&Function.prototype.apply.call(console.log,console,arguments)}function s(t){try{null==t?localStorage.removeItem("debug"):localStorage.debug=t}catch(e){}}function a(){var t;try{t=localStorage.debug}catch(e){}return t}n=e.exports=t("./debug"),n.log=i,n.formatArgs=o,n.save=s,n.load=a,n.useColors=r,n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(t){return JSON.stringify(t)},n.enable(a())},{"./debug":22}],22:[function(t,e,n){function r(){return n.colors[p++%n.colors.length]}function o(t){function e(){}function o(){var t=o,e=+new Date,i=e-(u||e);t.diff=i,t.prev=u,t.curr=e,u=e,null==t.useColors&&(t.useColors=n.useColors()),null==t.color&&t.useColors&&(t.color=r());var s=Array.prototype.slice.call(arguments);s[0]=n.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var a=0;s[0]=s[0].replace(/%([a-z%])/g,function(e,r){if("%"===e)return e;a++;var o=n.formatters[r];if("function"==typeof o){var i=s[a];e=o.call(t,i),s.splice(a,1),a--}return e}),"function"==typeof n.formatArgs&&(s=n.formatArgs.apply(t,s));var c=o.log||n.log||console.log.bind(console);c.apply(t,s)}e.enabled=!1,o.enabled=!0;var i=n.enabled(t)?o:e;return i.namespace=t,i}function i(t){n.save(t);for(var e=(t||"").split(/[\s,]+/),r=e.length,o=0;r>o;o++)e[o]&&(t=e[o].replace(/\*/g,".*?"),"-"===t[0]?n.skips.push(new RegExp("^"+t.substr(1)+"$")):n.names.push(new RegExp("^"+t+"$")))}function s(){n.enable("")}function a(t){var e,r;for(e=0,r=n.skips.length;r>e;e++)if(n.skips[e].test(t))return!1;for(e=0,r=n.names.length;r>e;e++)if(n.names[e].test(t))return!0;return!1}function c(t){return t instanceof Error?t.stack||t.message:t}n=e.exports=o,n.coerce=c,n.disable=s,n.enable=i,n.enabled=a,n.humanize=t("ms"),n.names=[],n.skips=[],n.formatters={};var u,p=0},{ms:23}],23:[function(t,e){function n(t){var e=/^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(t);if(e){var n=parseFloat(e[1]),r=(e[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"y":return n*p;case"days":case"day":case"d":return n*u;case"hours":case"hour":case"h":return n*c;case"minutes":case"minute":case"m":return n*a;case"seconds":case"second":case"s":return n*s;case"ms":return n}}}function r(t){return t>=u?Math.round(t/u)+"d":t>=c?Math.round(t/c)+"h":t>=a?Math.round(t/a)+"m":t>=s?Math.round(t/s)+"s":t+"ms"}function o(t){return i(t,u,"day")||i(t,c,"hour")||i(t,a,"minute")||i(t,s,"second")||t+" ms"}function i(t,e,n){return e>t?void 0:1.5*e>t?Math.floor(t/e)+" "+n:Math.ceil(t/e)+" "+n+"s"}var s=1e3,a=60*s,c=60*a,u=24*c,p=365.25*u;e.exports=function(t,e){return e=e||{},"string"==typeof t?n(t):e.long?o(t):r(t)}},{}],24:[function(t,e,n){(function(e){function r(t,e,r){if(!e)return n.encodeBase64Packet(t,r);var o=t.data,i=new Uint8Array(o),s=new Uint8Array(1+o.byteLength);s[0]=l[t.type];for(var a=0;a<i.length;a++)s[a+1]=i[a];return r(s.buffer)}function o(t,e,r){if(!e)return n.encodeBase64Packet(t,r);var o=new FileReader;return o.onload=function(){t.data=o.result,n.encodePacket(t,e,!0,r)},o.readAsArrayBuffer(t.data)}function i(t,e,r){if(!e)return n.encodeBase64Packet(t,r);if(h)return o(t,e,r);var i=new Uint8Array(1);i[0]=l[t.type];var s=new g([i.buffer,t.data]);return r(s)}function s(t,e,n){for(var r=new Array(t.length),o=p(t.length,n),i=function(t,n,o){e(n,function(e,n){r[t]=n,o(e,r)})},s=0;s<t.length;s++)i(s,t[s],o)}var a=t("./keys"),c=t("arraybuffer.slice"),u=t("base64-arraybuffer"),p=t("after"),f=t("utf8"),h=navigator.userAgent.match(/Android/i);n.protocol=3;var l=n.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},d=a(l),y={type:"error",data:"parser error"},g=t("blob");n.encodePacket=function(t,n,o,s){"function"==typeof n&&(s=n,n=!1),"function"==typeof o&&(s=o,o=null);var a=void 0===t.data?void 0:t.data.buffer||t.data;if(e.ArrayBuffer&&a instanceof ArrayBuffer)return r(t,n,s);if(g&&a instanceof e.Blob)return i(t,n,s);var c=l[t.type];return void 0!==t.data&&(c+=o?f.encode(String(t.data)):String(t.data)),s(""+c)},n.encodeBase64Packet=function(t,r){var o="b"+n.packets[t.type];if(g&&t.data instanceof g){var i=new FileReader;return i.onload=function(){var t=i.result.split(",")[1];r(o+t)},i.readAsDataURL(t.data)}var s;try{s=String.fromCharCode.apply(null,new Uint8Array(t.data))}catch(a){for(var c=new Uint8Array(t.data),u=new Array(c.length),p=0;p<c.length;p++)u[p]=c[p];s=String.fromCharCode.apply(null,u)}return o+=e.btoa(s),r(o)},n.decodePacket=function(t,e,r){if("string"==typeof t||void 0===t){if("b"==t.charAt(0))return n.decodeBase64Packet(t.substr(1),e);if(r)try{t=f.decode(t)}catch(o){return y}var i=t.charAt(0);return Number(i)==i&&d[i]?t.length>1?{type:d[i],data:t.substring(1)}:{type:d[i]}:y}var s=new Uint8Array(t),i=s[0],a=c(t,1);return g&&"blob"===e&&(a=new g([a])),{type:d[i],data:a}},n.decodeBase64Packet=function(t,n){var r=d[t.charAt(0)];if(!e.ArrayBuffer)return{type:r,data:{base64:!0,data:t.substr(1)}};var o=u.decode(t.substr(1));return"blob"===n&&g&&(o=new g([o])),{type:r,data:o}},n.encodePayload=function(t,e,r){function o(t){return t.length+":"+t}function i(t,r){n.encodePacket(t,e,!0,function(t){r(null,o(t))})}return"function"==typeof e&&(r=e,e=null),e?g&&!h?n.encodePayloadAsBlob(t,r):n.encodePayloadAsArrayBuffer(t,r):t.length?void s(t,i,function(t,e){return r(e.join(""))}):r("0:")},n.decodePayload=function(t,e,r){if("string"!=typeof t)return n.decodePayloadAsBinary(t,e,r);"function"==typeof e&&(r=e,e=null);var o;if(""==t)return r(y,0,1);for(var i,s,a="",c=0,u=t.length;u>c;c++){var p=t.charAt(c);if(":"!=p)a+=p;else{if(""==a||a!=(i=Number(a)))return r(y,0,1);if(s=t.substr(c+1,i),a!=s.length)return r(y,0,1);if(s.length){if(o=n.decodePacket(s,e,!0),y.type==o.type&&y.data==o.data)return r(y,0,1);var f=r(o,c+i,u);if(!1===f)return}c+=i,a=""}}return""!=a?r(y,0,1):void 0},n.encodePayloadAsArrayBuffer=function(t,e){function r(t,e){n.encodePacket(t,!0,!0,function(t){return e(null,t)})}return t.length?void s(t,r,function(t,n){var r=n.reduce(function(t,e){var n;return n="string"==typeof e?e.length:e.byteLength,t+n.toString().length+n+2},0),o=new Uint8Array(r),i=0;return n.forEach(function(t){var e="string"==typeof t,n=t;if(e){for(var r=new Uint8Array(t.length),s=0;s<t.length;s++)r[s]=t.charCodeAt(s);n=r.buffer}o[i++]=e?0:1;for(var a=n.byteLength.toString(),s=0;s<a.length;s++)o[i++]=parseInt(a[s]);o[i++]=255;for(var r=new Uint8Array(n),s=0;s<r.length;s++)o[i++]=r[s]}),e(o.buffer)}):e(new ArrayBuffer(0))},n.encodePayloadAsBlob=function(t,e){function r(t,e){n.encodePacket(t,!0,!0,function(t){var n=new Uint8Array(1);if(n[0]=1,"string"==typeof t){for(var r=new Uint8Array(t.length),o=0;o<t.length;o++)r[o]=t.charCodeAt(o);t=r.buffer,n[0]=0}for(var i=t instanceof ArrayBuffer?t.byteLength:t.size,s=i.toString(),a=new Uint8Array(s.length+1),o=0;o<s.length;o++)a[o]=parseInt(s[o]);if(a[s.length]=255,g){var c=new g([n.buffer,a.buffer,t]);e(null,c)}})}s(t,r,function(t,n){return e(new g(n))})},n.decodePayloadAsBinary=function(t,e,r){"function"==typeof e&&(r=e,e=null);for(var o=t,i=[],s=!1;o.byteLength>0;){for(var a=new Uint8Array(o),u=0===a[0],p="",f=1;255!=a[f];f++){if(p.length>310){s=!0;break}p+=a[f]}if(s)return r(y,0,1);o=c(o,2+p.length),p=parseInt(p);var h=c(o,0,p);if(u)try{h=String.fromCharCode.apply(null,new Uint8Array(h))}catch(l){var d=new Uint8Array(h);h="";for(var f=0;f<d.length;f++)h+=String.fromCharCode(d[f])}i.push(h),o=c(o,p)}var g=i.length;i.forEach(function(t,o){r(n.decodePacket(t,e,!0),o,g)})}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./keys":25,after:26,"arraybuffer.slice":27,"base64-arraybuffer":28,blob:29,utf8:30}],25:[function(t,e){e.exports=Object.keys||function(t){var e=[],n=Object.prototype.hasOwnProperty;for(var r in t)n.call(t,r)&&e.push(r);return e}},{}],26:[function(t,e){function n(t,e,n){function o(t,r){if(o.count<=0)throw new Error("after called too many times");--o.count,t?(i=!0,e(t),e=n):0!==o.count||i||e(null,r)}var i=!1;return n=n||r,o.count=t,0===t?e():o}function r(){}e.exports=n},{}],27:[function(t,e){e.exports=function(t,e,n){var r=t.byteLength;if(e=e||0,n=n||r,t.slice)return t.slice(e,n);if(0>e&&(e+=r),0>n&&(n+=r),n>r&&(n=r),e>=r||e>=n||0===r)return new ArrayBuffer(0);for(var o=new Uint8Array(t),i=new Uint8Array(n-e),s=e,a=0;n>s;s++,a++)i[a]=o[s];return i.buffer}},{}],28:[function(t,e,n){!function(t){"use strict";n.encode=function(e){var n,r=new Uint8Array(e),o=r.length,i="";for(n=0;o>n;n+=3)i+=t[r[n]>>2],i+=t[(3&r[n])<<4|r[n+1]>>4],i+=t[(15&r[n+1])<<2|r[n+2]>>6],i+=t[63&r[n+2]];return o%3===2?i=i.substring(0,i.length-1)+"=":o%3===1&&(i=i.substring(0,i.length-2)+"=="),i},n.decode=function(e){var n,r,o,i,s,a=.75*e.length,c=e.length,u=0;"="===e[e.length-1]&&(a--,"="===e[e.length-2]&&a--);var p=new ArrayBuffer(a),f=new Uint8Array(p);for(n=0;c>n;n+=4)r=t.indexOf(e[n]),o=t.indexOf(e[n+1]),i=t.indexOf(e[n+2]),s=t.indexOf(e[n+3]),f[u++]=r<<2|o>>4,f[u++]=(15&o)<<4|i>>2,f[u++]=(3&i)<<6|63&s;return p}}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")},{}],29:[function(t,e){(function(t){function n(t,e){e=e||{};for(var n=new r,o=0;o<t.length;o++)n.append(t[o]);return e.type?n.getBlob(e.type):n.getBlob()}var r=t.BlobBuilder||t.WebKitBlobBuilder||t.MSBlobBuilder||t.MozBlobBuilder,o=function(){try{var t=new Blob(["hi"]);return 2==t.size}catch(e){return!1}}(),i=r&&r.prototype.append&&r.prototype.getBlob;e.exports=function(){return o?t.Blob:i?n:void 0}()}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],30:[function(e,n,r){(function(e){!function(o){function i(t){for(var e,n,r=[],o=0,i=t.length;i>o;)e=t.charCodeAt(o++),e>=55296&&56319>=e&&i>o?(n=t.charCodeAt(o++),56320==(64512&n)?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),o--)):r.push(e);return r}function s(t){for(var e,n=t.length,r=-1,o="";++r<n;)e=t[r],e>65535&&(e-=65536,o+=b(e>>>10&1023|55296),e=56320|1023&e),o+=b(e);return o}function a(t,e){return b(t>>e&63|128)}function c(t){if(0==(4294967168&t))return b(t);var e="";return 0==(4294965248&t)?e=b(t>>6&31|192):0==(4294901760&t)?(e=b(t>>12&15|224),e+=a(t,6)):0==(4292870144&t)&&(e=b(t>>18&7|240),e+=a(t,12),e+=a(t,6)),e+=b(63&t|128)}function u(t){for(var e,n=i(t),r=n.length,o=-1,s="";++o<r;)e=n[o],s+=c(e);return s}function p(){if(v>=m)throw Error("Invalid byte index");var t=255&g[v];if(v++,128==(192&t))return 63&t;throw Error("Invalid continuation byte")}function f(){var t,e,n,r,o;if(v>m)throw Error("Invalid byte index");if(v==m)return!1;if(t=255&g[v],v++,0==(128&t))return t;if(192==(224&t)){var e=p();if(o=(31&t)<<6|e,o>=128)return o;throw Error("Invalid continuation byte")}if(224==(240&t)){if(e=p(),n=p(),o=(15&t)<<12|e<<6|n,o>=2048)return o;throw Error("Invalid continuation byte")}if(240==(248&t)&&(e=p(),n=p(),r=p(),o=(15&t)<<18|e<<12|n<<6|r,o>=65536&&1114111>=o))return o;throw Error("Invalid UTF-8 detected")}function h(t){g=i(t),m=g.length,v=0;for(var e,n=[];(e=f())!==!1;)n.push(e);return s(n)}var l="object"==typeof r&&r,d="object"==typeof n&&n&&n.exports==l&&n,y="object"==typeof e&&e;(y.global===y||y.window===y)&&(o=y);var g,m,v,b=String.fromCharCode,w={version:"2.0.0",encode:u,decode:h};if("function"==typeof t&&"object"==typeof t.amd&&t.amd)t(function(){return w});else if(l&&!l.nodeType)if(d)d.exports=w;else{var k={},A=k.hasOwnProperty;for(var x in w)A.call(w,x)&&(l[x]=w[x])}else o.utf8=w}(this)}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],31:[function(t,e){(function(t){var n=/^[\],:{}\s]*$/,r=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,o=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,i=/(?:^|:|,)(?:\s*\[)+/g,s=/^\s+/,a=/\s+$/;e.exports=function(e){return"string"==typeof e&&e?(e=e.replace(s,"").replace(a,""),t.JSON&&JSON.parse?JSON.parse(e):n.test(e.replace(r,"@").replace(o,"]").replace(i,""))?new Function("return "+e)():void 0):null}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],32:[function(t,e,n){n.encode=function(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e},n.decode=function(t){for(var e={},n=t.split("&"),r=0,o=n.length;o>r;r++){var i=n[r].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}},{}],33:[function(t,e){var n=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,r=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];e.exports=function(t){var e=t,o=t.indexOf("["),i=t.indexOf("]");-1!=o&&-1!=i&&(t=t.substring(0,o)+t.substring(o,i).replace(/:/g,";")+t.substring(i,t.length));for(var s=n.exec(t||""),a={},c=14;c--;)a[r[c]]=s[c]||"";return-1!=o&&-1!=i&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a}},{}],34:[function(t,e){function n(t,e){var n;return n=e?new o(t,e):new o(t)}var r=function(){return this}(),o=r.WebSocket||r.MozWebSocket;e.exports=o?n:null,o&&(n.prototype=o.prototype)},{}],35:[function(t,e){(function(n){function r(t){function e(t){if(!t)return!1;if(n.Buffer&&n.Buffer.isBuffer(t)||n.ArrayBuffer&&t instanceof ArrayBuffer||n.Blob&&t instanceof Blob||n.File&&t instanceof File)return!0;if(o(t)){for(var r=0;r<t.length;r++)if(e(t[r]))return!0}else if(t&&"object"==typeof t){t.toJSON&&(t=t.toJSON());for(var i in t)if(t.hasOwnProperty(i)&&e(t[i]))return!0}return!1}return e(t)}var o=t("isarray");e.exports=r}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{isarray:36}],36:[function(t,e){e.exports=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)}},{}],37:[function(t,e){var n=t("global");try{e.exports="XMLHttpRequest"in n&&"withCredentials"in new n.XMLHttpRequest}catch(r){e.exports=!1}},{global:38}],38:[function(t,e){e.exports=function(){return this}()},{}],39:[function(t,e){var n=[].indexOf;e.exports=function(t,e){if(n)return t.indexOf(e);for(var r=0;r<t.length;++r)if(t[r]===e)return r;return-1}},{}],40:[function(t,e,n){var r=Object.prototype.hasOwnProperty;n.keys=Object.keys||function(t){var e=[];for(var n in t)r.call(t,n)&&e.push(n);return e},n.values=function(t){var e=[];for(var n in t)r.call(t,n)&&e.push(t[n]);return e},n.merge=function(t,e){for(var n in e)r.call(e,n)&&(t[n]=e[n]);return t},n.length=function(t){return n.keys(t).length},n.isEmpty=function(t){return 0==n.length(t)}},{}],41:[function(t,e){var n=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,r=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];e.exports=function(t){for(var e=n.exec(t||""),o={},i=14;i--;)o[r[i]]=e[i]||"";return o}},{}],42:[function(t,e,n){(function(e){var r=t("isarray"),o=t("./is-buffer");n.deconstructPacket=function(t){function e(t){if(!t)return t;if(o(t)){var i={_placeholder:!0,num:n.length};return n.push(t),i}if(r(t)){for(var s=new Array(t.length),a=0;a<t.length;a++)s[a]=e(t[a]);return s}if("object"==typeof t&&!(t instanceof Date)){var s={};for(var c in t)s[c]=e(t[c]);return s}return t}var n=[],i=t.data,s=t;return s.data=e(i),s.attachments=n.length,{packet:s,buffers:n}},n.reconstructPacket=function(t,e){function n(t){if(t&&t._placeholder){var o=e[t.num];return o}if(r(t)){for(var i=0;i<t.length;i++)t[i]=n(t[i]);return t}if(t&&"object"==typeof t){for(var s in t)t[s]=n(t[s]);return t}return t}return t.data=n(t.data),t.attachments=void 0,t},n.removeBlobs=function(t,n){function i(t,c,u){if(!t)return t;if(e.Blob&&t instanceof Blob||e.File&&t instanceof File){s++;var p=new FileReader;p.onload=function(){u?u[c]=this.result:a=this.result,--s||n(a)},p.readAsArrayBuffer(t)}else if(r(t))for(var f=0;f<t.length;f++)i(t[f],f,t);else if(t&&"object"==typeof t&&!o(t))for(var h in t)i(t[h],h,t)}var s=0,a=t;i(a),s||n(a)}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-buffer":44,isarray:45}],43:[function(t,e,n){function r(){}function o(t){var e="",r=!1;return e+=t.type,(n.BINARY_EVENT==t.type||n.BINARY_ACK==t.type)&&(e+=t.attachments,e+="-"),t.nsp&&"/"!=t.nsp&&(r=!0,e+=t.nsp),null!=t.id&&(r&&(e+=",",r=!1),e+=t.id),null!=t.data&&(r&&(e+=","),e+=f.stringify(t.data)),p("encoded %j as %s",t,e),e}function i(t,e){function n(t){var n=l.deconstructPacket(t),r=o(n.packet),i=n.buffers;i.unshift(r),e(i)}l.removeBlobs(t,n)}function s(){this.reconstructor=null}function a(t){var e={},r=0;if(e.type=Number(t.charAt(0)),null==n.types[e.type])return u();if(n.BINARY_EVENT==e.type||n.BINARY_ACK==e.type){for(e.attachments="";"-"!=t.charAt(++r);)e.attachments+=t.charAt(r);e.attachments=Number(e.attachments)}if("/"==t.charAt(r+1))for(e.nsp="";++r;){var o=t.charAt(r);if(","==o)break;if(e.nsp+=o,r+1==t.length)break}else e.nsp="/";var i=t.charAt(r+1);if(""!=i&&Number(i)==i){for(e.id="";++r;){var o=t.charAt(r);if(null==o||Number(o)!=o){--r;break}if(e.id+=t.charAt(r),r+1==t.length)break}e.id=Number(e.id)}if(t.charAt(++r))try{e.data=f.parse(t.substr(r))}catch(s){return u()}return p("decoded %s as %j",t,e),e}function c(t){this.reconPack=t,this.buffers=[]}function u(){return{type:n.ERROR,data:"parser error"}}var p=t("debug")("socket.io-parser"),f=t("json3"),h=(t("isarray"),t("component-emitter")),l=t("./binary"),d=t("./is-buffer");n.protocol=4,n.types=["CONNECT","DISCONNECT","EVENT","BINARY_EVENT","ACK","BINARY_ACK","ERROR"],n.CONNECT=0,n.DISCONNECT=1,n.EVENT=2,n.ACK=3,n.ERROR=4,n.BINARY_EVENT=5,n.BINARY_ACK=6,n.Encoder=r,n.Decoder=s,r.prototype.encode=function(t,e){if(p("encoding packet %j",t),n.BINARY_EVENT==t.type||n.BINARY_ACK==t.type)i(t,e);else{var r=o(t);e([r])}},h(s.prototype),s.prototype.add=function(t){var e;if("string"==typeof t)e=a(t),n.BINARY_EVENT==e.type||n.BINARY_ACK==e.type?(this.reconstructor=new c(e),0==this.reconstructor.reconPack.attachments&&this.emit("decoded",e)):this.emit("decoded",e);else{if(!d(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");e=this.reconstructor.takeBinaryData(t),e&&(this.reconstructor=null,this.emit("decoded",e))}},s.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()},c.prototype.takeBinaryData=function(t){if(this.buffers.push(t),this.buffers.length==this.reconPack.attachments){var e=l.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null},c.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]}},{"./binary":42,"./is-buffer":44,"component-emitter":8,debug:9,isarray:45,json3:46}],44:[function(t,e){(function(t){function n(e){return t.Buffer&&t.Buffer.isBuffer(e)||t.ArrayBuffer&&e instanceof ArrayBuffer}e.exports=n}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],45:[function(t,e){e.exports=t(36)},{}],46:[function(e,n,r){!function(e){function n(t){if(n[t]!==s)return n[t];var e;if("bug-string-char-index"==t)e="a"!="a"[0];else if("json"==t)e=n("json-stringify")&&n("json-parse");else{var r,o='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if("json-stringify"==t){var i=p.stringify,c="function"==typeof i&&f;if(c){(r=function(){return 1}).toJSON=r;try{c="0"===i(0)&&"0"===i(new Number)&&'""'==i(new String)&&i(a)===s&&i(s)===s&&i()===s&&"1"===i(r)&&"[1]"==i([r])&&"[null]"==i([s])&&"null"==i(null)&&"[null,null,null]"==i([s,a,null])&&i({a:[r,!0,!1,null,"\x00\b\n\f\r	"]})==o&&"1"===i(null,r)&&"[\n 1,\n 2\n]"==i([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==i(new Date(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==i(new Date(864e13))&&'"-000001-01-01T00:00:00.000Z"'==i(new Date(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==i(new Date(-1))}catch(u){c=!1}}e=c}if("json-parse"==t){var h=p.parse;if("function"==typeof h)try{if(0===h("0")&&!h(!1)){r=h(o);var l=5==r.a.length&&1===r.a[0];if(l){try{l=!h('"	"')}catch(u){}if(l)try{l=1!==h("01")}catch(u){}if(l)try{l=1!==h("1.")}catch(u){}}}}catch(u){l=!1}e=l}}return n[t]=!!e}var o,i,s,a={}.toString,c="function"==typeof t&&t.amd,u="object"==typeof JSON&&JSON,p="object"==typeof r&&r&&!r.nodeType&&r;p&&u?(p.stringify=u.stringify,p.parse=u.parse):p=e.JSON=u||{};var f=new Date(-0xc782b5b800cec);try{f=-109252==f.getUTCFullYear()&&0===f.getUTCMonth()&&1===f.getUTCDate()&&10==f.getUTCHours()&&37==f.getUTCMinutes()&&6==f.getUTCSeconds()&&708==f.getUTCMilliseconds()}catch(h){}if(!n("json")){var l="[object Function]",d="[object Date]",y="[object Number]",g="[object String]",m="[object Array]",v="[object Boolean]",b=n("bug-string-char-index");if(!f)var w=Math.floor,k=[0,31,59,90,120,151,181,212,243,273,304,334],A=function(t,e){return k[e]+365*(t-1970)+w((t-1969+(e=+(e>1)))/4)-w((t-1901+e)/100)+w((t-1601+e)/400)};(o={}.hasOwnProperty)||(o=function(t){var e,n={};return(n.__proto__=null,n.__proto__={toString:1},n).toString!=a?o=function(t){var e=this.__proto__,n=t in(this.__proto__=null,this);return this.__proto__=e,n}:(e=n.constructor,o=function(t){var n=(this.constructor||e).prototype;return t in this&&!(t in n&&this[t]===n[t])}),n=null,o.call(this,t)});var x={"boolean":1,number:1,string:1,undefined:1},B=function(t,e){var n=typeof t[e];return"object"==n?!!t[e]:!x[n]};if(i=function(t,e){var n,r,s,c=0;(n=function(){this.valueOf=0}).prototype.valueOf=0,r=new n;for(s in r)o.call(r,s)&&c++;return n=r=null,c?i=2==c?function(t,e){var n,r={},i=a.call(t)==l;for(n in t)i&&"prototype"==n||o.call(r,n)||!(r[n]=1)||!o.call(t,n)||e(n)}:function(t,e){var n,r,i=a.call(t)==l;for(n in t)i&&"prototype"==n||!o.call(t,n)||(r="constructor"===n)||e(n);(r||o.call(t,n="constructor"))&&e(n)}:(r=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],i=function(t,e){var n,i,s=a.call(t)==l,c=!s&&"function"!=typeof t.constructor&&B(t,"hasOwnProperty")?t.hasOwnProperty:o;for(n in t)s&&"prototype"==n||!c.call(t,n)||e(n);for(i=r.length;n=r[--i];c.call(t,n)&&e(n));}),i(t,e)},!n("json-stringify")){var C={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},S="000000",E=function(t,e){return(S+(e||0)).slice(-t)},T="\\u00",_=function(t){var e,n='"',r=0,o=t.length,i=o>10&&b;for(i&&(e=t.split(""));o>r;r++){var s=t.charCodeAt(r);switch(s){case 8:case 9:case 10:case 12:case 13:case 34:case 92:n+=C[s];break;default:if(32>s){n+=T+E(2,s.toString(16));break}n+=i?e[r]:b?t.charAt(r):t[r]}}return n+'"'},R=function(t,e,n,r,c,u,p){var f,h,l,b,k,x,B,C,S,T,P,N,O,j,q,D;try{f=e[t]}catch(I){}if("object"==typeof f&&f)if(h=a.call(f),h!=d||o.call(f,"toJSON"))"function"==typeof f.toJSON&&(h!=y&&h!=g&&h!=m||o.call(f,"toJSON"))&&(f=f.toJSON(t));else if(f>-1/0&&1/0>f){if(A){for(k=w(f/864e5),l=w(k/365.2425)+1970-1;A(l+1,0)<=k;l++);for(b=w((k-A(l,0))/30.42);A(l,b+1)<=k;b++);k=1+k-A(l,b),x=(f%864e5+864e5)%864e5,B=w(x/36e5)%24,C=w(x/6e4)%60,S=w(x/1e3)%60,T=x%1e3}else l=f.getUTCFullYear(),b=f.getUTCMonth(),k=f.getUTCDate(),B=f.getUTCHours(),C=f.getUTCMinutes(),S=f.getUTCSeconds(),T=f.getUTCMilliseconds();f=(0>=l||l>=1e4?(0>l?"-":"+")+E(6,0>l?-l:l):E(4,l))+"-"+E(2,b+1)+"-"+E(2,k)+"T"+E(2,B)+":"+E(2,C)+":"+E(2,S)+"."+E(3,T)+"Z"}else f=null;if(n&&(f=n.call(e,t,f)),null===f)return"null";if(h=a.call(f),h==v)return""+f;if(h==y)return f>-1/0&&1/0>f?""+f:"null";if(h==g)return _(""+f);if("object"==typeof f){for(j=p.length;j--;)if(p[j]===f)throw TypeError();if(p.push(f),P=[],q=u,u+=c,h==m){for(O=0,j=f.length;j>O;O++)N=R(O,f,n,r,c,u,p),P.push(N===s?"null":N);D=P.length?c?"[\n"+u+P.join(",\n"+u)+"\n"+q+"]":"["+P.join(",")+"]":"[]"}else i(r||f,function(t){var e=R(t,f,n,r,c,u,p);e!==s&&P.push(_(t)+":"+(c?" ":"")+e)}),D=P.length?c?"{\n"+u+P.join(",\n"+u)+"\n"+q+"}":"{"+P.join(",")+"}":"{}";return p.pop(),D}};p.stringify=function(t,e,n){var r,o,i,s;if("function"==typeof e||"object"==typeof e&&e)if((s=a.call(e))==l)o=e;else if(s==m){i={};for(var c,u=0,p=e.length;p>u;c=e[u++],s=a.call(c),(s==g||s==y)&&(i[c]=1));}if(n)if((s=a.call(n))==y){if((n-=n%1)>0)for(r="",n>10&&(n=10);r.length<n;r+=" ");}else s==g&&(r=n.length<=10?n:n.slice(0,10));return R("",(c={},c[""]=t,c),o,i,r,"",[])}}if(!n("json-parse")){var P,N,O=String.fromCharCode,j={92:"\\",34:'"',47:"/",98:"\b",116:"	",110:"\n",102:"\f",114:"\r"},q=function(){throw P=N=null,SyntaxError()},D=function(){for(var t,e,n,r,o,i=N,s=i.length;s>P;)switch(o=i.charCodeAt(P)){case 9:case 10:case 13:case 32:P++;break;case 123:case 125:case 91:case 93:case 58:case 44:return t=b?i.charAt(P):i[P],P++,t;case 34:for(t="@",P++;s>P;)if(o=i.charCodeAt(P),32>o)q();else if(92==o)switch(o=i.charCodeAt(++P)){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:t+=j[o],P++;break;case 117:for(e=++P,n=P+4;n>P;P++)o=i.charCodeAt(P),o>=48&&57>=o||o>=97&&102>=o||o>=65&&70>=o||q();t+=O("0x"+i.slice(e,P));break;default:q()}else{if(34==o)break;for(o=i.charCodeAt(P),e=P;o>=32&&92!=o&&34!=o;)o=i.charCodeAt(++P);t+=i.slice(e,P)}if(34==i.charCodeAt(P))return P++,t;q();default:if(e=P,45==o&&(r=!0,o=i.charCodeAt(++P)),o>=48&&57>=o){for(48==o&&(o=i.charCodeAt(P+1),o>=48&&57>=o)&&q(),r=!1;s>P&&(o=i.charCodeAt(P),o>=48&&57>=o);P++);if(46==i.charCodeAt(P)){for(n=++P;s>n&&(o=i.charCodeAt(n),o>=48&&57>=o);n++);n==P&&q(),P=n}if(o=i.charCodeAt(P),101==o||69==o){for(o=i.charCodeAt(++P),(43==o||45==o)&&P++,n=P;s>n&&(o=i.charCodeAt(n),o>=48&&57>=o);n++);n==P&&q(),P=n}return+i.slice(e,P)}if(r&&q(),"true"==i.slice(P,P+4))return P+=4,!0;if("false"==i.slice(P,P+5))return P+=5,!1;if("null"==i.slice(P,P+4))return P+=4,null;q()}return"$"},I=function(t){var e,n;if("$"==t&&q(),"string"==typeof t){if("@"==(b?t.charAt(0):t[0]))return t.slice(1);if("["==t){for(e=[];t=D(),"]"!=t;n||(n=!0))n&&(","==t?(t=D(),"]"==t&&q()):q()),","==t&&q(),e.push(I(t));return e}if("{"==t){for(e={};t=D(),"}"!=t;n||(n=!0))n&&(","==t?(t=D(),"}"==t&&q()):q()),(","==t||"string"!=typeof t||"@"!=(b?t.charAt(0):t[0])||":"!=D())&&q(),e[t.slice(1)]=I(D());return e}q()}return t},U=function(t,e,n){var r=L(t,e,n);r===s?delete t[e]:t[e]=r},L=function(t,e,n){var r,o=t[e];if("object"==typeof o&&o)if(a.call(o)==m)for(r=o.length;r--;)U(o,r,n);else i(o,function(t){U(o,t,n)});return n.call(t,e,o)};p.parse=function(t,e){var n,r;return P=0,N=""+t,n=I(D()),"$"!=D()&&q(),P=N=null,e&&a.call(e)==l?L((r={},r[""]=n,r),"",e):n}}}c&&t(function(){return p})}(this)},{}],47:[function(t,e){function n(t,e){var n=[];e=e||0;for(var r=e||0;r<t.length;r++)n[r-e]=t[r];return n}e.exports=n},{}]},{},[1])(1)});
// app.js
(function() {
    'use strict';

    var field_guide_app = angular.module('field_guide_app',['ui','ui.router', 'ngSanitize', 'youtube-embed', 'field_guide_controls','field_guide_filters']);

    // function list for working with arrays

    // sorts an array of objects by key.
    function keysrt(key,desc) {
            return function(a,b){
                return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
            };
        }

    function keygen(){
        return Math.round((new Date().valueOf() * Math.random()));
    }

    // FRONT-END ROUTE CONFIGURATION ==============================================
    field_guide_app.config(function($stateProvider,$urlRouterProvider,$httpProvider,$locationProvider) {

        $locationProvider.html5Mode(true);

        $httpProvider.defaults.timeout = 3000;

        // TODO: this should probably be an Interceptor, but it works on load for now.
        function checkLoggedin($q, $timeout, $http, $location, $rootScope){ 
            // console.log('checking logged in identity');
            // Make an AJAX call to check if the user is logged in
            var deferred = $q.defer(); 

            $http
                .get('/loggedin')
                .success(function(user){
                    // Authenticated
                    if (user !== '0') {
                        void 0;
                        $rootScope.user = user;
                        $timeout(deferred.resolve, 0);
                    }

                    // Not Authenticated 
                    else { 
                        void 0;
                        $rootScope.userNote = 'You need to log in.'; 
                        $timeout(function(){deferred.reject();}, 0);

                        $location.url('/login');
                    }
                })
                .error(function(err){
                    void 0;
                });
            // }
            
        }

        $urlRouterProvider.otherwise("/login");
        // $urlRouterProvider.otherwise("/overview");


        $stateProvider
        // PUBLIC ROUTES ================================================
            
            // CANVAS SOCKETS TESTING ===================================
            // .state('canvas', {
            //     // url: '/canvas/',
            //     url: '/canvas/:_id',
            //     controller:'canvas',
            //     templateUrl: 'partials/app/testCanvas.html'
            // })
            
            // LOGIN AND REGISTRATION PAGES ===================
            .state('/login', {
                url: '/login{acct:(?:/[^/]+)?}',
                controller:'login',
                templateUrl: 'partials/auth/login.html',
            })

            // PUBLIC REPORTS ===========================================
            .state('report_public', {
                url: '/p/report/:test_id',
                controller:'reportPublic',
                templateUrl: 'partials/app/report_public.html'
            })

        // PRIVATE ROUTES ===============================================

            // REPORT PAGE FOR SINGLE TEST ====================
            .state('report', {
                url: '/report/:test_id',
                controller:'reportPrivate',
                templateUrl: 'partials/app/report_private.html',
                resolve: { loggedin: checkLoggedin }
            })

            // ACCOUNT MANAGEMENT =============================
            .state('account', {
                url: '/account',
                controller: 'account',
                templateUrl : 'partials/app/account.html',
                resolve: { loggedin: checkLoggedin }
            })

            // OVERVIEW AND test CREATION =====================
            .state('default', {
                url:'/',
                controller: 'overview',
                templateUrl: 'partials/app/overview.html',
                resolve: { loggedin: checkLoggedin }
            })

            .state('overview', {
                url: '/overview',
                controller: 'overview',
                templateUrl: 'partials/app/overview.html',
                resolve: { loggedin: checkLoggedin }
            })
            .state('test', {
                url: '/edit/test/:test_id',
                controller:'test',
                templateUrl: 'partials/app/test.html',
                resolve: { loggedin: checkLoggedin }
            })

            // RUN TEST =======================================
            .state('run', {
                url: '/run/:_id',
                controller:'run',
                templateUrl: 'partials/app/run.html',
                resolve: { loggedin: checkLoggedin }
            })

            // SUMMARIZE VIEW =================================
            .state('summary', {
                url: '/summary/:_id',
                controller:'summary',
                templateUrl: 'partials/app/summary.html',
                resolve: { loggedin: checkLoggedin }
            })
            .state('summary.test', {
                templateUrl: 'partials/app/summary_test.html'
            })
            .state('summary.task', {
                templateUrl: 'partials/app/summary_task.html'
            });

    });

    // SERVICES (factories, etc) ==================================================
    // a factory to provide sockets to the app
    // http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
    // this should be a straight-up feed from that site

    field_guide_app.factory('socket', function ($rootScope, $location) {

        // for live... $location.protocol()+'://'+$location.host()+':8080/'
        // var socket = io.connect('http://127.0.0.1:8080/');
        
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            },
            removeAllListeners: function (eventName, callback) {
                socket.removeAllListeners(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                }); 
            }
        };
    });

    // KEYPRESS CONTROLLER ====================================
    // TODO Make this work to smell combos on ctrl.

    // $scope.keyboard = {
    //   var buffer: [], 
    //   detectCombination : function() {
    //     var codes = {};
    //     this.buffer.forEach(function(code) {
    //       codes['key_' + code] = 1;
    //     })

    //     if ((codes.key_91 || codes.key_93) && codes.key_8) {
    //       // I'm looking for 'command + delete'
    //     }
    //   },
    //   keydown: function($event) {
    //     this.buffer.push($event.keyCode);
    //     this.detectCombination()
    //   },
    //   keyup: function($event, week) {
    //     this.buffer = [];
    //   }
    // }

    // FILTERS ============================================================================
    angular.module('field_guide_filters', ['ngSanitize', 'ui','ui.router']);

    // CONTROLLERS, DIRECTIVES ============================================================
    angular.module('field_guide_controls', ['ngSanitize', 'ui','ui.router','youtube-embed']);

})();
// account.js
(function() {
	'use strict';

	// ACCOUNT CONTROLLER ===========================================================
	angular.module('field_guide_controls').controller('account', ['$scope','$http', '$stateParams','$state', '$location', '$window', '$rootScope', function($scope, $http, $stateParams,$state, $location, $window, $rootScope){
		var user_id = $rootScope.user._id;

		$scope.live_user = $rootScope.user;
		$scope.account = $rootScope.user.account;
		
		// https://trello.com/1/members/my/boards?key=substitutewithyourapplicationkey&token=substitutethispartwiththeauthorizationtokenthatyougotfromtheuser
		// https://trello.com/docs/api/card/index.html#post-1-cards
		
		$http
			.get('/api/account/'+ user_id)
			.success(function(data){
				// // console.log(data);
				$scope.live_user = data;
			});

		$scope.connector = {};
		
		if($scope.live_user.trello){
			$scope.connector.message = "Your Trello account is connected.";
			$scope.connector.toggle = 1;
		} 

		if (!$scope.live_user.trello) {
			$scope.connector.message = "Connect your Trello account.";
			$scope.connector.toggle = 2;
		}

		$window.inviteCallback = function(){
			$scope.connector.message = "Your Trello account is connected.";
			$scope.connector.toggle = 1;
			// // console.log('called back');
			$scope.$apply();
		};


		// $scope.removeTeamMember = function(person){
		// 	// // console.log('remove this person', person._id );
		// 	var index = $scope.live_user.team.indexOf(person);

		// 	$http
		// 		.delete('/api/account/'+person._id)
		// 		.success(function(err, data){
		// 			// // console.log('deleted', data);
		// 			$scope.live_user.team.splice(index, 1);
		// 		});
		// };
		// $scope.team_mail = function(){

		// }

		$scope.team_mail = {};

		$scope.inviteTeamMember = function(email){
			var url = '/api/invite/',
				dataOut = email,
				new_url = $location.protocol()+'://'+$location.host()+':8080';

			mixpanel.track('Team member invite', { 'email': email });
	        
			$http
				.post(url, dataOut)
				.success(function(invite){
					void 0;

					if(invite.user_email){
						// user_email exists only on the Invite model.
						// if an invitation then exists, do the following.

						$scope.live_user.invites.push(invite);
						// console.log('$scope.live_user.invites', $scope.live_user.invites);
						email.address = "";
						$scope.message = "We&rsquo;ve sent an e-mail invitation to your team member."+
	                                     " Just in case, you can also invite them using this personalized link:"+
	                                     " <a href='"+new_url+"/login/"+invite._id+"' target='_blank'>"+new_url+
	                                     "/login/"+invite._id+"</a>";
					}
					else if(invite.msg === 'user found'){
						// an existing user was found
						// their existing account identity was wiped out and 
						// they have been added to the new team
						
						$scope.live_user.team.push({ local : {email : invite.email}, 'name': invite.name});
						email.address = "";
						$scope.message = "<strong>This team member is already a Field Guide user. "+
										 "If they join your team they will be removed from their current team "+
										 "and lose access to those projects.</strong><br><br>"+
	                                     "Invite them to your team using this personalized link:"+
	                                     " <a href='"+new_url+"/login/"+invite._id+"' target='_blank'>"+
	                                     new_url+"/login/"+invite._id+"</a>";
					} 
					else {
						$scope.message = invite;
					}
				});
		};
	    
		$scope.resendInvite = function(invite){
			// this will resend a pending invitation for a non-existent user
			// it requires that the previous invitation supply an invitation._id
			// console.log('sent', invite);
			var url = '/api/invite/'+invite._id,
				dataOut = invite,
				new_url = $location.protocol()+'://'+$location.host()+':8080';

			$http
				.post(url, dataOut)
				.success(function(data){
					// console.log('reinvitation sent', data);
					$scope.message = "Reinvitation sent to "+ data.user_email +
	                                 "<br /> Here is a personalized invitation link you can share with them: "+
	                                 "<a href='"+new_url+"/login/"+invite._id+"'>"+new_url+"/login/"+invite._id+
	                                 "</a>";
				});

		};

		$scope.deleteInvite = function(invite){
			var index = $scope.live_user.invites.indexOf(invite);

			$http
				.delete('/api/invite/'+invite._id)
				.success(function(err, data){
					// console.log('invitation removed', data);
					$scope.live_user.invites.splice(index, 1);
				});
		};

		$scope.accountExport = function(){

			$http
				.get('/auth/export/account/')
				.success(function(data){
					void 0;
				});
		};

		$scope.connectTrello = function(){
			$scope.connector.message = "Connecting your Trello account...";
			$scope.connector.toggle = 3;
			// $window.open('views/anotherWindow.html', '_blank','menubar=yes,toolbar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes,personalbar=yes');
			$window.open('/connect/trello', 'Connect Field Guide to Trello', 'width=450, height=600');
			$scope.$watch('inviteCallback', function(){
				// // console.log('hello callback!');
				// $scope.connector = false;
				// $scope.live_user.trello = true;
			});
		};

		$scope.disconnectTrello = function() {
			// // console.log('touched disconnect');

			$http.delete('/connect/trello')
				.success(function(err, data){
					// // console.log('Trello disconnected');
					$scope.live_user.trello=false;

					$scope.connector.message = "Connect your Trello account.";
					$scope.connector.toggle = 2;
				});

		};
	}]);
})();
// login.js
(function() {
    'use strict';

    // LOGIN CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('login', ['$scope','$http', '$location', '$stateParams','$rootScope', 'socket', 
        function($scope, $http, $location, $stateParams, $rootScope, socket){

        // LOGIN FUNCTIONS ====================================
        
        if($rootScope.user){
            $scope.user = $rootScope.user;
        }
        // console.log('$scope.login $rootScope.user', $rootScope.user);

        if($stateParams.acct){
            $scope.acct = $stateParams.acct.replace( /\//gi,"");
            $scope.reg_toggle = true;
            mixpanel.track('registration page touch', { 'account': $stateParams.acct });
            
            // TODO: get the invitation represented by that id and pre-populate the e-mail field.
            $http
                .get('/auth/invite'+$stateParams.acct)
                .success(function(data){
                    void 0;
                    $scope.user = data;
                    $scope.user.email = data.user_email;
                });
        }
        
        $scope.tracker = function(){
            mixpanel.track('myAccount', { 'account': $stateParams.acct });
        };
        $scope.login = function(user){
            var url = '/auth/login';
            var dataOut =  {email: user.email, password: user.password};

            $http
                .post(url, dataOut)
                .success(function(data){
                    // console.log('login controller success', data.error);
                    $scope.flashmessage = data.error;
                    $location.path(data.redirect);
                })
                .error(function(error){
                    // console.log('login no bueno.', error);
                });
        };

        $scope.showReg = function(){
            $scope.reg_toggle = true;
            void 0;

        };

        $scope.showLogin = function(){
            // console.log('touched login', $scope.reg_toggle);
            $scope.reg_toggle = false;
        };

        $scope.register = function(user){
            // console.log('register this user', user);
            var url, 
                dataOut,
                invite;
            
            if($stateParams.acct){
                invite = $stateParams.acct.replace( /\//gi,"");
                // console.log('touched account', acct);
                url = '/auth/signup/';
                dataOut = {email: user.email, name:user.name, password: user.password, invite: invite};
            } else if (!$stateParams.acct) {
                // console.log('this signup does not include an account (stateparams.acct)');
                url = '/auth/signup/';
                dataOut = {email: user.email, name:user.name, password: user.password};
            }
            
            $http
                .post(url, dataOut)
                .success(function(data){
                    $scope.flashmessage = data.error;
                    // console.log('register controller success passed back this', data);
                    
                    $rootScope.user = data._id;
                    $location.path(data.redirect);

                    mixpanel.track('registered new user', { 'name': data.email });

                })
                .error(function(error){
                    // console.log('signup no bueno.', error);
            });
        };

        $scope.logout = function(){
            var url = '/auth/logout';

            $http
                .post(url)
                .success(function(data){
                    // console.log('Success! Logged out.', data);
                    $location.path(data.redirect);
                    $rootScope.user = '';
                })
                .error(function(error){
                    // console.log('logout no bueno.', error);
            });
        };
    }]);
})();
// overview.js
(function() {
    'use strict';

    // OVERVIEW CONTROLLER ===========================================================
    angular.module('field_guide_controls')
        .controller('overview', ['$scope','$http', '$location', '$stateParams','$rootScope', function($scope, $http, $location, $stateParams, $rootScope){
        
        // get all sessions and their tests on first load
        $http
            .get('/api/test/', {timeout : 5000})
            .success(function(data) {
                $scope.tests = data;
                void 0;
                // initially selected 
                // $scope.selected = data[0];
            })
            .error(function(data) {
                void 0;
            });


        // SESSION ROUTES =====================================

        $scope.select = function (session){
            void 0;
            $scope.selected = session;
        };

        // edit titles inline.
        $scope.editTitle = function(textfield){
            textfield.editing = 'true';
        };

        $scope.blurTitle = function(session){
            
            $scope.editedTitle = null;
            session.editing ='false';
            
            
            var url = '/api/session/'+session._id;
            
            if (!session.name) {
                session.name = 'New Session';
            }

            var data_out = {name : session.name};

            $http.put(url, data_out)
                    .success(function(data){
                        void 0;
                    })
                    .error(function(data){
                        void 0;
                    });
        };

        $scope.addSession = function(session){
            
            $http.post('/api/session/')
                .success(function(data){

                    void 0;
                    
                    $scope.sessions.push(data);

                    // TODO add an auto-select for the new session here
                    $scope.selected = $scope.sessions[$scope.sessions.length-1];
                })
                .error(function(data){
                    void 0;
                });   
        };
       
        $scope.removeSession = function(session){
            var url = '/api/session/'+session._id;
            var index = $scope.sessions.indexOf(session);

            $http.delete(url)
                .success(function(data){
                    void 0;

                    $scope.sessions.splice(index, 1);
                    $scope.selected = $scope.sessions[$scope.sessions.length-1];
                })
                .error(function(data){
                    void 0;
                });
        };

        // TEST ROUTES ========================================
        $scope.devTest = function(){
            void 0;
            
            $http.post('/api/test/dev_tests/')
                .success(function(data){
                    $scope.tests.push(data);
                });
        };

        $scope.newTest = function(){
                void 0;
                
                var test = {};

                if($rootScope.user){
                    void 0;
                    test.created_by = $rootScope.user;
                   
                    mixpanel.track('Add new test', { 'user' : $rootScope.user });


                }else{
                    void 0;
                }

                var url = '/api/test/';
                var data_out = test;
                
                $http
                    .post(url, data_out)
                    .success(function(data){
                        void 0;
                        $location.path('/edit/test/'+ data._id);
                        $scope.tests.push(data);
                    })
                    .error(function(data){
                        void 0;
                    });
            };

        $scope.removeTest = function(test){ 
            // delete a test from the database
            // if (confirm("sure to delete") === true) {
                var url = '/api/test/'+test._id,
                index = $scope.tests.indexOf(test);
            
                $scope.tests.splice(index, 1);

                $http
                    .delete(url)
                    .success(function(data){
                        void 0;
                    })
                    .error(function(data){
                        void 0;
                    });
            // }        
        };

        $scope.dupeTest = function(test){
            void 0;

            var url = '/api/test/'+test._id;
            var data_out = test;
            
            $http
                .post(url, data_out)
                .success(function(data){
                    void 0;
                    $scope.tests.push(data);
                })
                .error(function(data){
                    void 0;
                });
        };

        $scope.editTest = function(test){
            void 0;
            $location.path('/edit/test/'+ test._id);
        };

        $scope.watchTest = function(test){
            void 0;
            $location.path('/watch/'+test._id);
        };
         
        $scope.runTest = function(test){
            void 0;
            $location.path('/run/'+test._id);
            mixpanel.track('Run test', { 'user': $rootScope.user });
        };

        $scope.summarizeTest = function(test_id){
            void 0;
            $location.path('/summary/'+ test_id);
            mixpanel.track('Summary clicked', {});
        };

        $scope.loadReport = function(test_id){
            void 0;
            $location.path('/report/'+ test_id);
        };

    }]);
})();
// register.js
(function() {
    'use strict';

    // REGISTRATION CONTROLLER ===========================================================
    angular.module('field_guide_controls')
           .controller('register', ['$scope','$http', '$location', '$stateParams','$rootScope', 'socket', function($scope, $http, $location, $stateParams, $rootScope, socket){
        
        $scope.user = $rootScope.user;
        
        if($stateParams.acct){
            $scope.acct = $stateParams.acct.replace( /\//gi,"");
            void 0;
        }

    }]);
})();
'use strict';
// report.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('reportPrivate', ['$scope', '$sce', '$http', '$location', '$stateParams','$state','$sanitize', function($scope, $sce, $http, $location,$stateParams,$state, $sanitize){
// https://trello.com/docs/api/card/index.html#post-1-cards << HOW 2 POST CARDS TO TRELLO

    $scope.reportLink = $location.protocol()+'://'+$location.host()+':8080/p/report/'+$stateParams.test_id;
    
    $scope.showReportLink = false;
    $scope.toggleReportLink =  function(){
        if(!$scope.showReportLink){ $scope.showReportLink=true; }
        else{ $scope.showReportLink = false; }
    };

    $http.get('/api/private/report/'+$stateParams.test_id)
            .success(function(data){
                void 0;
                
                $scope.leftNavList = [];
                $scope.testname = data.test;
                
                var sort = _.sortBy(data.navlist, function(obj){
                                return(obj.report_index);
                            });

                _.each(sort, function(obj){
                    if(obj.visible){
                        void 0; 
                        $scope.leftNavList.push(obj);
                    }
                });

                $scope.messages = data.messages;

                void 0;
                $scope.activate($scope.leftNavList[0]);
                
            }); 

// == mixpanel ==================================

    mixpanel.track('Report Loaded', {});

// ==============================================

// NAVIGATION =============================================

    $scope.summarize = function(){
        $location.path('/summary/'+ $stateParams.test_id);
    };

    $scope.activate = function(obj, selectedIndex) {
        // passes the task to the global variable

        $scope.selected = '';
        $scope.commentMessage = '';
        $scope.selectedIndex = '';
        $scope.showCommentToggle = 'hide';
        
        $scope.selectedIndex = selectedIndex;
        
        if(obj){
            $scope.selected = obj;

            // here's where we do the rendering shit for the embeds. Slow. Boo.
            if(obj.embed){
                var ytube = /youtube.com/i;
                var yt = ytube.test(obj.embed);
                if(yt){
                    $scope.selected.youTubeCode = obj.embed;
                }

                var utest = /usabilitytestresults/i;
                var ut = utest.test(obj.embed);
                if(ut){
                    var w1 = /width='\d+'/i;
                    var h1 = /height='\d+'/i;
                    var w2 = /"width":"\d+"/i;
                    var h2 = /"height":"\d+"/i;
                    
                    var res = obj.embed.replace(w1, "width='574'");
                    res = res.replace(w2, '"width":"574"');
                    res = res.replace(h1, "height='380'");
                    res = res.replace(h2, '"height":"380"');
                    
                    void 0;

                    $scope.selected.userTesting = $sce.trustAsHtml(res);
                    // $scope.selected.HTMLdemo = '<a href="#linky">I am a link</a>';
                }

            }
        }
    };

    $scope.showObjectMessages = function(msg, obj){
        if(obj._messages){
            if((obj._messages.indexOf(msg._id) >= 0)){     
                if(obj.doctype === 'task' && msg.fav_task){
                    return true;
                }
                if(obj.doctype === 'tag' && msg.fav_tag){
                    return true;
                }
            }
        }
    };

// COMMENTING =========================================
    $scope.showComments = function(message){
        // if the comment toggle is the same as the current comment toggle
        // hide commenting
        // else show the new message's comments

        void 0;

        // if(){}
        if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'show'){
            void 0;
            $scope.showCommentToggle = 'hide';
            $scope.commentMessage = '';
            return;
        }
        if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'hide'){
            void 0;
            $scope.showCommentToggle = 'show';
            return;
        }
        if ($scope.commentMessage._id !== message._id && $scope.showCommentToggle === 'hide'){
            void 0;
            $scope.showCommentToggle = 'show'; 
            $scope.commentMessage = message;
            return;
        }
        
        $scope.commentMessage = message;

    };

    $scope.addComment = function(comment){
        void 0;
        if(comment && comment.body.length > 0){
            var dataOut = {
                comment: {body : comment.body}
            };
            
            $http
                .post('/api/comment/'+$scope.commentMessage._id, dataOut)
                .success(function(data){
                    comment.body = '';

                    var arr = _.pluck($scope.messages, '_id');
                    var msg_idx = _.indexOf(arr, $scope.commentMessage._id);

                    void 0;
                    $scope.messages[msg_idx]._comments.push(data.comment);
                });
        } else {
            $scope.showCommentToggle = 'hide';   
        }
    };


}]);
'use strict';
// report.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('reportPublic', ['$scope', '$sce', '$http', '$location', '$stateParams','$state','$sanitize', function($scope, $sce, $http, $location,$stateParams,$state, $sanitize){
// https://trello.com/docs/api/card/index.html#post-1-cards << HOW 2 POST CARDS TO TRELLO

    $scope.reportLink = $location.protocol()+'://'+$location.host()+':8080/p/report/'+$stateParams.test_id;

    $scope.showReportLink = false;
    $scope.toggleReportLink =  function(){
        if(!$scope.showReportLink){ $scope.showReportLink=true; }
        else{ $scope.showReportLink = false; }
    };

    $http.get('/api/public/report/'+$stateParams.test_id)
            .success(function(data){
                void 0;
                
                $scope.leftNavList = [];
                $scope.testname = data.test;

                var sort = _.sortBy(data.navlist, function(obj){
                                return(obj.report_index);
                            });

                _.each(sort, function(obj){
                    if(obj.visible){
                        void 0; 
                        $scope.leftNavList.push(obj);
                    }
                });

                $scope.messages = data.messages;
                void 0;

                $scope.activate($scope.leftNavList[0]);
                
            }); 

// == mixpanel ==================================

    mixpanel.track('Report Loaded', {});
    
// ==============================================

// NAVIGATION =============================================

    $scope.summarize = function(){
        $location.path('/summary/'+ $stateParams.test_id);
    };

    $scope.activate = function(obj, selectedIndex) {
        // passes the task to the global variable

        $scope.selected = '';
        $scope.commentMessage = '';
        $scope.selectedIndex = '';
        $scope.showCommentToggle = 'hide';
        
        $scope.selectedIndex = selectedIndex;
        
        if(obj){
            $scope.selected = obj;
            void 0;
            // here's where we do the rendering shit for the embeds. Slow. Boo.
            if(obj.embed){
                var ytube = /youtube.com/i;
                var yt = ytube.test(obj.embed);
                if(yt){
                    $scope.selected.youTubeCode = obj.embed;
                }

                var utest = /usabilitytestresults/i;
                var ut = utest.test(obj.embed);
                if(ut){
                    var w1 = /width='\d+'/i;
                    var h1 = /height='\d+'/i;
                    var w2 = /"width":"\d+"/i;
                    var h2 = /"height":"\d+"/i;
                    
                    var res = obj.embed.replace(w1, "width='574'");
                    res = res.replace(w2, '"width":"574"');
                    res = res.replace(h1, "height='380'");
                    res = res.replace(h2, '"height":"380"');
                    
                    void 0;

                    $scope.selected.userTesting = $sce.trustAsHtml(res);
                    // $scope.selected.HTMLdemo = '<a href="#linky">I am a link</a>';
                }

            }
        }
    };

    $scope.showObjectMessages = function(msg, obj){
        if(obj._messages){
            if((obj._messages.indexOf(msg._id) >= 0)){     
                if(obj.doctype === 'task' && msg.fav_task){
                    return true;
                }
                if(obj.doctype === 'tag' && msg.fav_tag){
                    return true;
                }
            }
        }
    };

// COMMENTING =========================================
    $scope.showComments = function(message){
        // if the comment toggle is the same as the current comment toggle
        // hide commenting
        // else show the new message's comments

        void 0;

        // if(){}
        if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'show'){
            void 0;
            $scope.showCommentToggle = 'hide';
            $scope.commentMessage = '';
            return;
        }
        if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'hide'){
            void 0;
            $scope.showCommentToggle = 'show';
            return;
        }
        if ($scope.commentMessage._id !== message._id && $scope.showCommentToggle === 'hide'){
            void 0;
            $scope.showCommentToggle = 'show'; 
            $scope.commentMessage = message;
            return;
        }
        
        $scope.commentMessage = message;

    };

    $scope.addComment = function(comment){
        void 0;
        if(comment && comment.body.length > 0){
            var dataOut = {
                comment: {body : comment.body}
            };
            
            $http
                .post('/api/comment/'+$scope.commentMessage._id, dataOut)
                .success(function(data){
                    comment.body = '';

                    var arr = _.pluck($scope.messages, '_id');
                    var msg_idx = _.indexOf(arr, $scope.commentMessage._id);

                    void 0;
                    $scope.messages[msg_idx]._comments.push(data.comment);
                });
        } else {
            $scope.showCommentToggle = 'hide';   
        }
    };


}]);
// run.js
(function() {
    'use strict';
    // RUN CONTROLLER ===========================================================

    angular.module('field_guide_controls').controller('run', 
    ['$scope','$http', '$location','$stateParams','$state','socket', '$rootScope', 
    function($scope,  $http ,  $location , $stateParams , $state , socket ,  $rootScope){
        
        // set up controller-wide variables
        $scope.update = {};
        $scope.update.tests = [];
        $scope.update.tasks = [];

        $scope.timeline = []; // holds all messages currently in test
        $scope.glued = true;

        $http
            .get('/api/run/'+$stateParams._id)
            .success(function(data){
                $scope.tests = data;
                void 0;

                $scope.kind = data[0].kind;

                // reset variables to clear cache from state changes.
                $scope.task = {};
                var message = {};
                // Subject has been created, now open a room with that subject_id

            });
        
    // SOCKET ROUTES - 1.0 ==============================================
    // var socket = io('http://127.0.0.1:8080/?test='+$stateParams._id);

    // socket.on('disconnect', function(data)
    // {
    //     console.log('disconnect');
    // });

    // socket.disconnect();

    // SOCKET ROUTES - 0.9 ============================================== 
        
        
    // RECIEVE SCREENCAPS FROM THE SOCKET ===============================
        // var canvas = document.getElementById('feed'),
        //     image = document.getElementById('ia'),
        //     context = canvas.getContext('2d');

        // $scope.connect = {};
        // $scope.connect.text = '71b';

        // $scope.subscription = function(chan){
        //     console.log('touched a channel', chan);
        //     socket.emit('subscribe', { room: chan, test: $stateParams._id });
        //     socket.emit('channel', { room: chan, test: $stateParams._id });
        // };

        // var socket = io.connect('http://104.236.16.159:8080/?test='+$stateParams._id, {
        //         'force new connection': true});

        // socket.on('connect_failed', function(data)
        // {
        //     console.log('connect_failed');
        // });
        // socket.on('connecting', function(data)
        // {
        //     console.log('connecting');
        // });
        // socket.on('disconnect', function(data)
        // {
        //     console.log('disconnect');

        //     image.src = "/layout/assets/avatar-binocs.jpg";
        //     canvas.width = 358;
        //     canvas.height = 358 * image.height / image.width;

        //     context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);

        //     socket.socket.disconnect();
        // });
        // socket.on('error', function(reason)
        // {
        //     console.log('error', reason);
        // });
        // socket.on('reconnect_failed', function(data)
        // {
        //     console.log('reconnect_failed');
        // });
        // socket.on('reconnect', function(data)
        // {
        //     console.log('reconnect');
        //     socket.emit('channel', {room : $scope.subject.testroom, test: $stateParams._id});
        // });
        // socket.on('reconnecting', function(data)
        // {
        //     console.log('reconnecting');
        // });

        // socket.on('announce', function(data){
        //     console.log('announce', data);
        // });

        // socket.on('joined_channel', function(data){
        //     console.log('joined_channel', data);
        // });

        // socket.on('note', function(data){
        //     console.log('note', data);
        //     $scope.timeline.push(data.note.msg);
        //     $scope.$apply();
        // });

        // socket.on('subject', function(data){
        //     socket.emit('join_subject_test', data);
        // });

        // socket.on('message',function(data) {
        //     console.log('message');
        //     image.src = "data:image/jpg;base64,"+data;
        //     canvas.width = 358;
        //     canvas.height = 358 * image.height / image.width;

        //     context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
        //     // context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
        // });

    // ANGULAR HELPER SERVICE - TODO: MOVE UP APP =======================
        

    // ANGULAR ROUTES ===================================================
        $scope.addTask = function(task){
            void 0;
            if($scope.adding_task){$scope.adding_task=false;}

            var dataOut = { 
                name : task.name,
                desc : task.desc,
                _test : $stateParams._id,
                index : $scope.tests[0]._tasks.length
            };

            void 0;
            
            $http
                .post('/api/task/', dataOut)
                .success(function(data){
                    void 0;
                    $scope.tests[0]._tasks.push(data);
                });

        };

        $scope.select = function(testIndex, taskIndex) {
            // console.log('task',  $scope.tests[testIndex]._tasks[taskIndex]);

            var test = $scope.tests[testIndex];

            $scope.selected = test._tasks[taskIndex];

            mixpanel.track('Task changed', {});

            // select
            // pushes the identity of a test or task
            // to the update array
            // which is then output to server when things are updated
            // this prevents the session from bulk-updating everything onscreen
            // if it has not in fact been touched.

            if(taskIndex === 0){
            
                var m   = {};
                m.title = 'Starting test';
                m.body  = test.name;

                $scope.timeline.push(m);

                if($scope.update.tests.indexOf(test._id) === -1){
                    $scope.update.tests.push(test._id);
                    $scope.subject._tests.push(test._id);
                }
            }

            var em   = {};
            em.title = 'Starting task';
            em.body  = test._tasks[taskIndex].name;

            $scope.timeline.push(em);

            if($scope.update.tasks.indexOf(test._tasks[taskIndex]._id) === -1){
                $scope.update.tasks.push(test._tasks[taskIndex]._id);
            }
        };


        $scope.addSubject = function(subject){
            void 0;

            $scope.subject = subject;
            void 0;

            // if(subject.testroom){
            //     var room = subject.testroom.toLowerCase();
            // }

            var url = 'api/subject/';
            var data_out = {name : subject.name, testroom: subject.testroom, test: $stateParams._id};

            $http
                .post(url, data_out)
                .success(function(subject){
                    $scope.subject = subject;
                    $scope.live = true;
                    $scope.select(0,0);

                    mixpanel.track('Add Participant Name', {});

                    void 0;
                    // socket.emit('send:subject_added', {subject: subject});
                    socket.emit('channel', {room : $scope.subject.testroom, test: $stateParams._id});
        
                })
                .error(function(data){
                    // console.log('Error: ' + data);
            });
        };

        $scope.postMessage = function(message){
            // here we create a note object
            if(message.length <= 0){
                return;
            } else {
                var note = {};

                note.body = message;
                note.tags = [];
                note.created = new Date();
                 
                note._task = $scope.selected._id;
                note._test = $scope.selected._test;
                // note._session = $stateParams._id;
                note._subject = $scope.subject._id;

                $scope.timeline.push(note);
                // console.log('message pushing to', $scope.selected._id);

                // TODO: this will catch things on both sides of the hash. 
                // if message has # with no space, post that to message.tags

                var hashCatch = new RegExp(/\S*#\S+/gi);
                var hashPull = new RegExp(/#/gi);
                var tagIt = message.match(hashCatch);          
                
                if (tagIt){
                    for (var i=0; i < tagIt.length; ++i) {
                        var msg = tagIt[i].replace(hashPull,'');
                        // console.log('tag being pushed', msg)
                        note.tags.push(msg);
                    }
                }


                var url = '/api/message/';
                var data_out = note;

                $http
                    .post(url, data_out)
                    .success(function(data){
                        // socket.emit('send:note', { note: data });
                        $scope.message='';
                    });
            }
        };

        $scope.postTest = function(){
            void 0;

            var url = '/api/run/'+$stateParams._id;
            var data_out = {session: $scope.session, tests: $scope.update.tests, tasks: $scope.update.tasks, subject: $scope.subject._id};
            // socket.emit('testComplete', {data: {body:'test_complete', room : $scope.subject.testroom, test: $stateParams._id}});

            mixpanel.track('Test completed', {});
            // console.log('touched end', data_out);

            // collects all the tests and steps and outputs them as a collected object
            // to the session api link
            // where they are parsed 
            // and their individual subject lists are updated.

            $http
                .post(url, data_out)
                .success(function(data){
                    // console.log('Updated tests', data);
                    $location.path('/overview');
                })
                .error(function(data){
                    // console.log('Error: ' + data);
                });

        }
    }]);
})();
// summary.js
(function() {
    'use strict';

    // SUMMARY CONTROLLER ===========================================================

    angular.module('field_guide_controls')
        .controller('summary', ['$scope','$rootScope','$http','$location','$stateParams','$state','$sanitize', 
                        function($scope,  $rootScope,  $http,  $location,  $stateParams,  $state,  $sanitize){
    	$scope.test = {};
        $scope.timeline = [];
        $scope.commentMessage = '';

        $scope.reportLink = $location.protocol()+'://'+$location.host()+':8080/p/report/'+$stateParams.test_id;
        $scope.showReportLink = false;
        $scope.toggleReportLink =  function(){
            if(!$scope.showReportLink){ $scope.showReportLink=true; }
            else{ $scope.showReportLink = false; }
        };

        $http.get('/api/summary/'+$stateParams._id)
            .success(function(data){
                $scope.leftNavList = [];
                $scope.testname = data.test;
                
                var sort = _.sortBy(data.navlist, function(obj){
                                    return(obj.report_index);
                                });

                _.each(sort, function(obj){ $scope.leftNavList.push(obj); });
                
                // group messages by users
                $scope.messages = _.groupBy(data.messages, 
                    function(z){
                        if(z._subject.name){
                            return z._subject.name;
                        } else {
                            return 'report comment';
                        }
                    });
                
                void 0;
                $scope.activate($scope.leftNavList[0]);

            });

    // NAVIGATION =============================================

        $scope.reportPreview = function(){
            $location.path('/report/'+ $stateParams._id);
        };

        $scope.activate = function(obj, selectedIndex) {
            // passes the task to the global variable

            $scope.selected = '';
            $scope.commentMessage = '';
            $scope.selectedIndex = '';
            $scope.inputNote = '';
            $scope.showCommentToggle = 'hide';
            $scope.messageEditToggle = '';
            
            $scope.selectedIndex = selectedIndex;
            
            if(obj){
                $scope.selected = obj;
            }
        };

        $scope.showObjectMessages = function(msg, obj){
            if(obj._messages){
                if((obj._messages.indexOf(msg._id) >= 0)){                
                    return true;
                }
            }
        };

    // COMMENTING =========================================
        $scope.showComments = function(message){
            // if the comment toggle is the same as the current comment toggle
            // hide commenting
            // else show the new message's comments

            void 0;

            // if(){}
            if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'show'){
                void 0;
                $scope.showCommentToggle = 'hide';
                $scope.commentMessage = '';
                return;
            }
            if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'hide'){
                void 0;
                $scope.showCommentToggle = 'show';
                return;
            }
            if ($scope.commentMessage._id !== message._id && $scope.showCommentToggle === 'hide'){
                void 0;
                $scope.showCommentToggle = 'show'; 
                $scope.commentMessage = message;
                return;
            }
            
            $scope.commentMessage = message;

        };

        $scope.addComment = function(comment){
            if(comment && comment.body.length > 0){
                var dataOut = {
                    comment: {body : comment.body}
                };
                
                $http
                    .post('/api/comment/'+$scope.commentMessage._id, dataOut)
                    .success(function(data){
                        comment.body = '';

                        var name = data.msg._subject.name;
                        var arr = _.pluck($scope.messages[name], '_id');
                        var msg_idx = _.indexOf(arr, $scope.commentMessage._id);

                        $scope.messages[name][msg_idx]._comments.push(data.comment);
                    });
            } else {
                $scope.showCommentToggle = 'hide';   
            }
        };

        // MOVE STEPS =========================================

        $scope.moveTask = function(old_index, new_index){

            new_index = old_index + new_index;

            while (old_index < 0) {
                old_index += this.length;
            }
            while (new_index < 0) {
                new_index += this.length;
            }
            if (new_index >= this.length) {
                var k = new_index - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            
            $scope.leftNavList.splice(new_index, 0, $scope.leftNavList.splice(old_index, 1)[0]);

            var obj_count=0;
            
            // set the stored index of the task properly
            _.each($scope.leftNavList, function(obj){
                obj.report_index = obj_count;
                obj_count++;
            });

            var dataOut = $scope.leftNavList;

            var nav = _.pluck($scope.leftNavList, 'name');
            

            $scope.saveSummary();

        };


        // OBJECT FUNCTIONS =====================================
        $scope.saveObject = function(obj){
            var url, data;
            void 0;

            if(obj.doctype === 'test'){
                url = 'summary/test/'+ obj._id;
                data = obj;
            }
            if(obj.doctype === 'task'){
                url = 'summary/task/'+ obj._id;
                data = obj;
            }
            if(obj.doctype === 'tag'){
                url = 'summary/tag/'+ obj._id;
                data = obj;
                obj.summarized = true;
            }
            $http
                .put('/api/'+url, data)
                .success(function(doc){
                    void 0;
                });
        };

        $scope.passFail = function(obj){
            if(obj.pass_fail){ obj.pass_fail = false; }
            else if (!obj.fail){ obj.pass_fail = true; }

            $scope.saveObject(obj);
        };

        $scope.toggleVis = function(obj){
            if (obj.visible){ obj.visible = false; $scope.saveObject(obj); return;}
            if (!obj.visible){ obj.visible = true; $scope.saveObject(obj); return;}
        };


        // MESSAGE FUNCTIONS ==================================

        $scope.msgFilter = function(message){
            // Display messages that belong to the current selected item.
            if (message._id === $scope.selected._id) { return true; }
            else { return false; }
        };

        $scope.editMessage = function(message, index){
            // clear this on blur to block weird toggle bug
            $scope.inputNote = '';
            $scope.messageEditToggle = message._id;
        };

        $scope.saveEdit = function(message){
            $scope.messageEditToggle = '';

            var tags = [];
            var hashCatch = new RegExp(/\S*#\S+/gi);
            var hashPull = new RegExp(/#/gi);
            var tagIt = message.body.match(hashCatch);
            
            if (tagIt){
                _.each(tagIt, function(tag){
                    var msg = tag.replace(hashPull,'');
                    tags.push(msg);
                });
            }
            
            message.tags = tags;

            $http
                .put('/api/message/'+message._id, message)
                .success(function(msg, err){

                    var new_list =_.groupBy(msg.messages, function(z){return z._subject.name;});
                    
                    $scope.leftNavList = msg.nav_list;
                    $scope.messages = new_list;
                });
        };

        $scope.toggleNote = function(user){
            void 0;
            $scope.messageEditToggle = '';
            $scope.inputNote = user;
        };

        $scope.saveFav = function(message){
            
            if($scope.selected.doctype === 'task'){
                if(message.fav_task){ message.fav_task = false; }
                else if (!message.fav_task){ message.fav_task = true; }
            }

            if($scope.selected.doctype === 'tag'){
                if(message.fav_tag){ message.fav_tag = false; } 
                else if (!message.fav_tag){ message.fav_tag = true;}
            }

            $http
                .put('/api/summary/message/'+message._id, message)
                .success(function(data){
                });
        };

        $scope.postMessage = function(message, subject){
            // Make a note object, which becomes a message on the back end.

            //TODO make the note never be blank.
            var note = {};

            note.body = message;
            note.tags = [];
            note.created = new Date();
             
            note._task = $scope.selected._id;
            note._test = $scope.selected._test;
            note._subject = subject._id;

            message = '';
            $scope.newnote = '';
            $scope.toggleNote(subject._id);

            // TODO: this will catch things on both sides of the hash. 
            // if message has # with no space, post that to message.tags

            var hashCatch = new RegExp(/\S*#\S+/gi);
            var hashPull = new RegExp(/#/gi);
            var tagIt = note.body.match(hashCatch);
            
            if (tagIt){
                for (var i=0; i < tagIt.length; ++i) {
                    var msg = tagIt[i].replace(hashPull,'');
                    note.tags.push(msg);
                }
            }
            
            var url = '/api/summary/message/';
            var data_out = note;

            $http
                .post(url, data_out)
                .success(function(data){
                    $scope.toggleNote();

                    $scope.messages[data.msg._subject.name].push(data.msg);
                    $scope.selected._messages.push(data.msg._id);

                    _.each(data.tags, function(tag){
                        tag.report_index = $scope.leftNavList.length;
                        $scope.leftNavList.push(tag);
                    });
                });
        };

    // SAVE SUMMARY ==========================================
        $scope.saveSummary = function(){
            // post all the summary changes to the test
            // post fav'd statuses to relevant messages

            $scope.messages = _.map($scope.messages, function(val, key){ return val; });

            mixpanel.track('Summary complete', {});

            var url = '/api/summary/'+ $stateParams._id;
            var data_out = {navlist: $scope.leftNavList, messages:$scope.messages[0]} ;
            
            $http.put(url, data_out)
                .success(function(data, msg){
                });     

        };
    }]);
})();
// test.js
(function() {
    'use strict';
    // TEST CONTROLLER ===========================================================
    angular.module('field_guide_controls')
    .run(['$anchorScroll', function($anchorScroll) {
        $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
    }])
    .controller('test', 
                ['$scope','$compile','$http','$stateParams','$state','$location','$window','$rootScope','$anchorScroll',
        function(  $scope, $compile,  $http,  $stateParams,  $state,  $location,  $window,  $rootScope,  $anchorScroll){
        
        void 0;
        
        $http
            .get('/api/test/'+$stateParams.test_id, {timeout : 5000, cache:false})
            .success(function(data) {
                $scope.test = data;
                $scope.tasks = data._tasks;

                void 0;
                void 0;
                $scope.showAnchor(1);

            })
            .error(function(data) {
                void 0;
            });

        // DIRECTIVES AND FUNCTIONS ===========================

        // $scope.dragControlListeners = {
        //     accept: function (sourceItemHandleScope, destSortableScope) {return boolean} //override to determine drag is allowed or not. default is true.
        //     itemMoved: function (event) {//Do what you want},
        //     orderChanged: function(event) {//Do what you want},
        //     containment: '#board'//optional param.
        // };

        $scope.treeOptions = {
            dropped: function(e) {
                void 0;
                void 0;
                _.each($scope.tasks, function(task){
                    task.index = $scope.tasks.indexOf(task);
                });
                $scope.batchTask();
            }
        };


        // ACTIONS ============================================
        // an effort to manipulate order.... 
        $scope.moveTask = function(old_index, new_index){
            void 0
            new_index = old_index + new_index;

            while (old_index < 0) {
                old_index += this.length;
            }
            while (new_index < 0) {
                new_index += this.length;
            }
            if (new_index >= this.length) {
                var k = new_index - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            
            $scope.tasks.splice(new_index, 0, $scope.tasks.splice(old_index, 1)[0]);

            // set the stored index of the task properly
            // console.log('did things stay moved', $scope.tasks); // for testing purposes
            
            // I think if we don't do this, it won't store if another thing's not pressed.
            $scope.updateTest();
            
        };

        $scope.selectPrototype = function(kind){
            void 0;
            $scope.test.kind = kind;
            mixpanel.track('Type of Test', {'test type' : kind });
        };

        $scope.selectPlatform = function(kind){
            $scope.test.platform = kind;
            void 0;
        };

        $scope.showAnchor = function(x) {
            // var newHash = 'anchor' + x;
            // if ($location.hash() !== newHash) {
            //   // set the $location.hash to `newHash` and
            //   // $anchorScroll will automatically scroll to it
            //   $location.hash('anchor' + x);
            // } else {
            //   // call $anchorScroll() explicitly,
            //   // since $location.hash hasn't changed
            //   $anchorScroll();


            var explanations = [
                {   anchor : 1,
                    title : 'What is a test?',
                    body : 'A <strong>Test</strong> is a series of screens,' + 
                           ' goals, or steps for your customers to interact with.'+
                           ' For example, you could use a <strong>Test</strong> to'+
                           ' capture a sign-up process.'
                },
                {   anchor : 3,
                    title : 'What is a task?',
                    body : '<strong>Tasks</strong> allow you to define important'+
                           ' steps in your prototype, website, or app. <strong>Talking points</strong>'+
                           ' are the notes and ideas you want to ask the person you’re testing with.'+
                           ' You define steps to <strong>sort and organize</strong> your notes and feedback.'
                },
                {   anchor : 5,
                    title : 'Next steps',
                    body : 'Round up some testers - you&rsquo;re ready to test.'+
                           ' This would be a good time to schedule in some test participants.'
                }
            ];

            $scope.anchor = x;
            $scope.explanation = _.findWhere(explanations, {anchor:x});
            if(x === 5){
                mixpanel.track('Test setup completion page', { 'user': $rootScope.user });
            }
        };

        $scope.saveAndMove = function(anchor){
            $scope.updateTest();
            $scope.showAnchor(anchor);
        };

        // TIPS ===============================================
        $scope.tip = function(test){
            
            // $scope.tip.body = 'Testing your prototype on an <strong>iPhone</strong> or <strong>iPad</strong>? Download the Field Guide
            //             app from the <a href="#" class="alt">App Store</a>.'

            // do something HTML-rendering-and-sanitizing related in here.
            // perhaps implement a Markdown directive?
        };

        // TASK FUNCTIONS =====================================

    	$scope.newTask = function(task) {
            void 0;

            task._test = $stateParams.test_id;
            task._session = $scope.test._session;
            task.index = $scope.tasks.length;
            
            void 0;
            mixpanel.track('Task added', { 'user': $rootScope.user });

            var url = '/api/task/';
            var data_out = task;
            
            $http
                .post(url,data_out)
                .success(function(data){
                    void 0;

                    $scope.tasks.push(data);
                    $scope.selectedTask = $scope.tasks[$scope.tasks.length-1];
                    $scope.newtask = '';
                })
                .error(function(data){
                    void 0;
                });
        };
        
        $scope.removeTask = function(task){
        
            task.edit=false;
            task.title_edit=false;

            var index = $scope.tasks.indexOf(task);
            var url = '/api/task/'+task._id;
            
            $scope.tasks.splice(index, 1);

            void 0;
            void 0;

            $http.delete(url)
                .success(function(data){
                    void 0;
                    $scope.selectedTask = $scope.tasks[$scope.tasks.length-1];
                })
                .error(function(data){
                    void 0;
                });
        };

    	$scope.editTitle = function (task){
    		// edit the title box for a task
    		task.title_edit = true;
    		$scope.edited = task;
    	};

    	$scope.blurTitle = function (task){
    		// on losing the focus, save the name of the task
    		task.title_edit = false;
    		$scope.editedtask = null;

    		task.name = task.name.trim();

    		if (!task.name) {
    			$scope.removeTask(task);
    		}

            $scope.updateTask(task);
    	};

        $scope.select = function(task) {
            $scope.selectedTask = task;         
        };
        
        $scope.isActive = function(task) {
            return $scope.selectedTask === task;
        };

        $scope.batchTask = function(){
            void 0;

            var dataOut = $scope.tasks;
            var url = '/api/task/';

            $http
                .put(url, dataOut)
                .success(function(data){
                    void 0;
                })
                .error(function(data){
                    void 0;
                });

        };

        $scope.updateTask = function(task){
            void 0;

            var url = '/api/task/'+task._id;
            var data_out = task;

            return $http
                .put(url, data_out)
                .success(function(data){
                    void 0;
                    void 0;
                 })
                .error(function(data){
                    void 0;
                });
            
        };

        $scope.updateTest = function(){
            var test = $scope.test;
            
            if($scope.test.desc){
                test.desc = test.desc;
            }

            if($scope.test.name){
                mixpanel.track('Test name changed', { 'user': $rootScope.user });
            }

            void 0;

            var url = '/api/test/'+$stateParams.test_id;
            var data_out = test;

            var task_count=0;
            _.each($scope.tasks, function(task){
                task.index = task_count;
                task_count++;
                void 0;
            });

            void 0;

            // reminder: this pushes an update to an already-created test
    		return $http
                .put(url, data_out, {timeout:5000})
                .success(function(data){
                    void 0;
                })
                .error(function(data){
                    void 0;
                });
    	};

        $scope.goHome = function(){
            // fun facts! This might cause a race condition.
            // TODO: see if THEN will work here.
            $scope.updateTest()
                .then(function(){
                    $location.path('/overview');
                });
        };
    }]);
})();
// watch.js
(function() {
    'use strict';
    // REPORT CONTROLLER ===========================================================
        
    angular.module('field_guide_controls')
    .controller('watch', 
               ['$scope','$http','$location','$stateParams','$state','$sanitize','socket', 
        function($scope,  $http,  $location,  $stateParams,  $state,  $sanitize,  socket){


        $scope.roomList = [];

    // SOCKET ROUTES ================================================

        // 1.0 -----------
        // var client = io('http://104.236.16.159:8080/');

        // 0.9 -----------
        // TODO ALL OF THIS NEEDS TO BE AN ENVIRONMENT VARIABLE
        var socket = io.connect('//104.236.16.159:8080/?test='+$stateParams._id, {
                'force new connection': true
            });
        
        socket.on('message',function(data) {
            image.src = "data:image/jpg;base64,"+data;
            canvas.width = 358;
            canvas.height = 358 * image.height / image.width;

            context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
        });

        socket.on('connect_failed', function(data)
        {
            void 0;
        });
        socket.on('connecting', function(data)
        {
            void 0;
        });
        socket.on('disconnect', function(data)
        {
            void 0;
            image.src = "/layout/assets/avatar-binocs.jpg";
            canvas.width = 358;
            canvas.height = 358 * image.height / image.width;

            context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
            socket.socket.disconnect();
        });
        socket.on('error', function(reason)
        {
            void 0;
        });
        socket.on('reconnect_failed', function(data)
        {
            void 0;
        });
        socket.on('reconnect', function(data)
        {
            void 0;
        });
        socket.on('reconnecting', function(data)
        {
            void 0;
        });

        socket.on('announce', function(data){
            void 0;
        });

        socket.on('note', function(data){
            void 0;
            $scope.timeline.push(data.note.msg);
            $scope.$apply();
        });

        socket.on('subject', function(data){
            socket.emit('join_subject_test', data);
        });

       

    // EMIT SCREENCAPS TO THE SOCKET ====================================
        var canvas = document.getElementById('channel'),
            image = document.getElementById('ia'),
            context = canvas.getContext('2d');

        $scope.connect = {};
        $scope.connect.text = '71b';

        $scope.subscription = function(chan){
            void 0;
            socket.emit('subscribe', { room: chan });
            socket.emit('channel', { room: chan });
        };

    // ANGULAR ROUTES ===================================================
        $scope.testName = $stateParams._id; 

        $scope.joinRoom = function(room){
            void 0;
            // socket.emit('join_room', $scope.selectedRoom.room);
            $scope.live = true;
        };


        $scope.postMessage = function(message){
            // here we create a note object
            var note = {};

            note.body = message;
            note.tags = [];
            note.created = new Date();
             
            note._task = $scope.selected._id;
            note._test = $scope.selected._test;
            // note._session = $stateParams._id;
            note._subject = $scope.subject._id;

            $scope.timeline.push(note);
            // console.log('message pushing to', $scope.selected._id);

            // TODO: this will catch things on both sides of the hash. 
            // if message has # with no space, post that to message.tags

            var hashCatch = new RegExp(/\S*#\S+/gi);
            var hashPull = new RegExp(/#/gi);
            var tagIt = message.match(hashCatch);          
            
            if (tagIt){
                for (var i=0; i < tagIt.length; ++i) {
                    var msg = tagIt[i].replace(hashPull,'');
                    // console.log('tag being pushed', msg)
                    note.tags.push(msg);
                }
            }
            
            // console.log('note tags', note.tags);

            var url = '/api/message/';
            var data_out = note;

            $http
                .post(url, data_out)
                .success(function(data){
                    // socket.emit('send:note', { note: data });
                })
                .error(function(data){
                    // console.log('Error: ' + data);
                });

            $scope.message='';
        };
    }]);
})();

// confirm-click.js
(function() {
    'use strict';

    angular.module('field_guide_controls')
    .directive('ngConfirmClick', function(){
        return {
            restrict: 'A',
            replace: false,
            link: function($scope, $element, $attr) {
                var clickAction, msg;
                msg = $attr.ngConfirmClick || "Are you sure?";
                clickAction = $attr.confirmedClickAction;
                return $element.bind('click', function(event) {
                    if (window.confirm(msg)) {
                        return $scope.$eval(clickAction);
                    }
                });
            }
        };
    });
})();
// elastic-textbox.js
(function() {
'use strict';
angular.module('field_guide_controls')
.constant('msdElasticConfig', {
    append: ''
  })
.directive('msdElastic', [
'$timeout', '$window', 'msdElasticConfig',
function($timeout, $window, config) {
  'use strict';

  return {
    require: 'ngModel',
    restrict: 'A, C',
    link: function(scope, element, attrs, ngModel) {

      // cache a reference to the DOM element
      var ta = element[0],
          $ta = element;

      // ensure the element is a textarea, and browser is capable
      if (ta.nodeName !== 'TEXTAREA' || !$window.getComputedStyle) {
        return;
      }

      // set these properties before measuring dimensions
      $ta.css({
        'overflow': 'hidden',
        'overflow-y': 'hidden',
        'word-wrap': 'break-word'
      });

      // force text reflow
      var text = ta.value;
      ta.value = '';
      ta.value = text;

      var append = attrs.msdElastic ? attrs.msdElastic.replace(/\\n/g, '\n') : config.append,
          $win = angular.element($window),
          mirrorInitStyle = 'position: absolute; top: -999px; right: auto; bottom: auto;' +
                            'left: 0; overflow: hidden; -webkit-box-sizing: content-box;' +
                            '-moz-box-sizing: content-box; box-sizing: content-box;' +
                            'min-height: 0 !important; height: 0 !important; padding: 0;' +
                            'word-wrap: break-word; border: 0;',
          $mirror = angular.element('<textarea tabindex="-1" ' +
                                    'style="' + mirrorInitStyle + '"/>').data('elastic', true),
          mirror = $mirror[0],
          taStyle = getComputedStyle(ta),
          resize = taStyle.getPropertyValue('resize'),
          borderBox = taStyle.getPropertyValue('box-sizing') === 'border-box' ||
                      taStyle.getPropertyValue('-moz-box-sizing') === 'border-box' ||
                      taStyle.getPropertyValue('-webkit-box-sizing') === 'border-box',
          boxOuter = !borderBox ? {width: 0, height: 0} : {
                        width:  parseInt(taStyle.getPropertyValue('border-right-width'), 10) +
                                parseInt(taStyle.getPropertyValue('padding-right'), 10) +
                                parseInt(taStyle.getPropertyValue('padding-left'), 10) +
                                parseInt(taStyle.getPropertyValue('border-left-width'), 10),
                        height: parseInt(taStyle.getPropertyValue('border-top-width'), 10) +
                                parseInt(taStyle.getPropertyValue('padding-top'), 10) +
                                parseInt(taStyle.getPropertyValue('padding-bottom'), 10) +
                                parseInt(taStyle.getPropertyValue('border-bottom-width'), 10)
                      },
          minHeightValue = parseInt(taStyle.getPropertyValue('min-height'), 10),
          heightValue = parseInt(taStyle.getPropertyValue('height'), 10),
          minHeight = Math.max(minHeightValue, heightValue) - boxOuter.height,
          maxHeight = parseInt(taStyle.getPropertyValue('max-height'), 10),
          mirrored,
          active,
          copyStyle = ['font-family',
                       'font-size',
                       'font-weight',
                       'font-style',
                       'letter-spacing',
                       'line-height',
                       'text-transform',
                       'word-spacing',
                       'text-indent'];

      // exit if elastic already applied (or is the mirror element)
      if ($ta.data('elastic')) {
        return;
      }

      // Opera returns max-height of -1 if not set
      maxHeight = maxHeight && maxHeight > 0 ? maxHeight : 9e4;

      // append mirror to the DOM
      if (mirror.parentNode !== document.body) {
        angular.element(document.body).append(mirror);
      }

      // set resize and apply elastic
      $ta.css({
        'resize': (resize === 'none' || resize === 'vertical') ? 'none' : 'horizontal'
      }).data('elastic', true);

      /*
       * methods
       */

      function initMirror() {
        var mirrorStyle = mirrorInitStyle;

        mirrored = ta;
        // copy the essential styles from the textarea to the mirror
        taStyle = getComputedStyle(ta);
        angular.forEach(copyStyle, function(val) {
          mirrorStyle += val + ':' + taStyle.getPropertyValue(val) + ';';
        });
        mirror.setAttribute('style', mirrorStyle);
      }

      function adjust() {
        var taHeight,
            taComputedStyleWidth,
            mirrorHeight,
            width,
            overflow;

        if (mirrored !== ta) {
          initMirror();
        }

        // active flag prevents actions in function from calling adjust again
        if (!active) {
          active = true;

          mirror.value = ta.value + append; // optional whitespace to improve animation
          mirror.style.overflowY = ta.style.overflowY;

          taHeight = ta.style.height === '' ? 'auto' : parseInt(ta.style.height, 10);

          taComputedStyleWidth = getComputedStyle(ta).getPropertyValue('width');

          // ensure getComputedStyle has returned a readable 'used value' pixel width
          if (taComputedStyleWidth.substr(taComputedStyleWidth.length - 2, 2) === 'px') {
            // update mirror width in case the textarea width has changed
            width = parseInt(taComputedStyleWidth, 10) - boxOuter.width;
            mirror.style.width = width + 'px';
          }

          mirrorHeight = mirror.scrollHeight;

          if (mirrorHeight > maxHeight) {
            mirrorHeight = maxHeight;
            overflow = 'scroll';
          } else if (mirrorHeight < minHeight) {
            mirrorHeight = minHeight;
          }
          mirrorHeight += boxOuter.height;
          ta.style.overflowY = overflow || 'hidden';

          if (taHeight !== mirrorHeight) {
            ta.style.height = mirrorHeight + 'px';
            scope.$emit('elastic:resize', $ta);
          }

          // small delay to prevent an infinite loop
          $timeout(function() {
            active = false;
          }, 1);

        }
      }

      function forceAdjust() {
        active = false;
        adjust();
      }

      /*
       * initialise
       */

      // listen
      if ('onpropertychange' in ta && 'oninput' in ta) {
        // IE9
        ta['oninput'] = ta.onkeyup = adjust;
      } else {
        ta['oninput'] = adjust;
      }

      $win.bind('resize', forceAdjust);
      $win.bind('click', forceAdjust);

      scope.$watch(function() {
        return ngModel.$modelValue;
      }, function(newValue) {
        forceAdjust();
      });

      scope.$on('elastic:adjust', function() {
        initMirror();
        forceAdjust();
      });

      $timeout(adjust);
      
      /*
       * destroy
       */

      scope.$on('$destroy', function() {
        $mirror.remove();
        $win.unbind('resize', forceAdjust);
      });
      
    }
  };
}
]);
})();
// scroll-glue.js
(function() {
    'use strict';

    angular.module('field_guide_controls')
    .directive('scrollGlue', ['$parse', function($parse){
    // via https://github.com/Luegg/angularjs-scroll-glue/blob/master/src/scrollglue.js
        function unboundState(initValue){
            var activated = initValue;
            return {
                getValue: function(){
                    return activated;
                },
                setValue: function(value){
                    activated = value;
                }
            };
        }

        function oneWayBindingState(getter, scope){
            return {
                getValue: function(){
                    return getter(scope);
                },
                setValue: function(){}
            };
        }

        function twoWayBindingState(getter, setter, scope){
            return {
                getValue: function(){
                    return getter(scope);
                },
                setValue: function(value){
                    if(value !== getter(scope)){
                        scope.$apply(function(){
                            setter(scope, value);
                        });
                    }
                }
            };
        }

        function createActivationState(attr, scope){
            if(attr !== ""){
                var getter = $parse(attr);
                if(getter.assign !== undefined){
                    return twoWayBindingState(getter, getter.assign, scope);
                } else {
                    return oneWayBindingState(getter, scope);
                }
            } else {
                return unboundState(true);
            }
        }

        return {
            priority: 1,
            restrict: 'A',
            link: function(scope, $el, attrs){
                var el = $el[0],
                    activationState = createActivationState(attrs.scrollGlue, scope);

                function scrollToBottom(){
                    el.scrollTop = el.scrollHeight;
                }

                function onScopeChanges(scope){
                    if(activationState.getValue()){
                        scrollToBottom();
                    }
                }

                function shouldActivateAutoScroll(){
                    // + 1 catches off by one errors in chrome
                    return el.scrollTop + el.clientHeight + 1 >= el.scrollHeight;
                }

                function onScroll(){
                    activationState.setValue(shouldActivateAutoScroll());
                }

                scope.$watch(onScopeChanges);
                $el.bind('scroll', onScroll);
            }
        };
    }]);
})();
// youtube-embed.js
(function() {
    'use strict';

    angular.module('field_guide_controls')
    .directive('youtube', function($window) {
        return {
            restrict: "E",

            scope: {
                height:   "@",
                width:    "@",
                videoId:  "@"  
            },

            template: '<div></div>',

            link: function(scope, element) {
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                var player;

                $window.onYouTubeIframeAPIReady = function() {
                    player = new YT.Player(element.children()[0], {
                        playerVars: {
                            autoplay: 0,
                            html5: 1,
                            theme: "light",
                            modesbranding: 0,
                            color: "white",
                            iv_load_policy: 3,
                            showinfo: 1,
                            controls: 1,
                        },
                        height: scope.height,
                        width: scope.width,
                        videoId: scope.videoid
                    });
                };
            },  
        };
    })
})();

// FILTERS =================================================================
angular.module('field_guide_filters')
.filter('hashtag', ['$sce', function($sce){
        return function(message) {
            // TODO : this runs on subjects? Fix.
            var hashCatch = new RegExp(/\S*#\S+/gi); 
            var tagIt = message.match(hashCatch);
            
            var msg = message.replace(hashCatch, "<span class='tag'>$&</span>");

            return $sce.trustAsHtml(msg);
        };
}])
.filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }

        };
    })
.filter('linebreaker', ['$sce', function($sce){
    return function(text) {
        text = text.replace(/\r?\n/g, '<br />');

        return $sce.trustAsHtml(text);
    }
}]);
// vendor.js

(function() {
// google analytics =========
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-56304013-1', 'auto');
  ga('send', 'pageview');
})();

(function() {
// mixpanel =================
(function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
  for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=!0;a.src="//cdn.mxpnl.com/libs/mixpanel-2.2.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);
  
  mixpanel.init("c7752c1767cb7302972c2846d81b78cf");
  mixpanel.track('view page', { 'url': location.pathname });
})();