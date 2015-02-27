!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t=e.length,n=Z.type(e);return"function"===n||Z.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e}function r(e,t,n){if(Z.isFunction(t))return Z.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return Z.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(at.test(t))return Z.filter(t,e,n);t=Z.filter(t,e)}return Z.grep(e,function(e){return U.call(t,e)>=0!==n})}function i(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}function o(e){var t=ht[e]={};return Z.each(e.match(dt)||[],function(e,n){t[n]=!0}),t}function s(){J.removeEventListener("DOMContentLoaded",s,!1),e.removeEventListener("load",s,!1),Z.ready()}function a(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=Z.expando+a.uid++}function u(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(bt,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:xt.test(n)?Z.parseJSON(n):n}catch(i){}yt.set(e,t,n)}else n=void 0;return n}function l(){return!0}function c(){return!1}function f(){try{return J.activeElement}catch(e){}}function p(e,t){return Z.nodeName(e,"table")&&Z.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function d(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function h(e){var t=Pt.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function g(e,t){for(var n=0,r=e.length;r>n;n++)vt.set(e[n],"globalEval",!t||vt.get(t[n],"globalEval"))}function m(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(vt.hasData(e)&&(o=vt.access(e),s=vt.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)Z.event.add(t,i,l[i][n])}yt.hasData(e)&&(a=yt.access(e),u=Z.extend({},a),yt.set(t,u))}}function v(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return void 0===t||t&&Z.nodeName(e,t)?Z.merge([e],n):n}function y(e,t){var n=t.nodeName.toLowerCase();"input"===n&&Nt.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}function x(t,n){var r,i=Z(n.createElement(t)).appendTo(n.body),o=e.getDefaultComputedStyle&&(r=e.getDefaultComputedStyle(i[0]))?r.display:Z.css(i[0],"display");return i.detach(),o}function b(e){var t=J,n=$t[e];return n||(n=x(e,t),"none"!==n&&n||(Wt=(Wt||Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),t=Wt[0].contentDocument,t.write(),t.close(),n=x(e,t),Wt.detach()),$t[e]=n),n}function w(e,t,n){var r,i,o,s,a=e.style;return n=n||_t(e),n&&(s=n.getPropertyValue(t)||n[t]),n&&(""!==s||Z.contains(e.ownerDocument,e)||(s=Z.style(e,t)),Bt.test(s)&&It.test(t)&&(r=a.width,i=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=r,a.minWidth=i,a.maxWidth=o)),void 0!==s?s+"":s}function T(e,t){return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function C(e,t){if(t in e)return t;for(var n=t[0].toUpperCase()+t.slice(1),r=t,i=Gt.length;i--;)if(t=Gt[i]+n,t in e)return t;return r}function N(e,t,n){var r=Xt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function k(e,t,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;4>o;o+=2)"margin"===n&&(s+=Z.css(e,n+Tt[o],!0,i)),r?("content"===n&&(s-=Z.css(e,"padding"+Tt[o],!0,i)),"margin"!==n&&(s-=Z.css(e,"border"+Tt[o]+"Width",!0,i))):(s+=Z.css(e,"padding"+Tt[o],!0,i),"padding"!==n&&(s+=Z.css(e,"border"+Tt[o]+"Width",!0,i)));return s}function E(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=_t(e),s="border-box"===Z.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=w(e,t,o),(0>i||null==i)&&(i=e.style[t]),Bt.test(i))return i;r=s&&(Q.boxSizingReliable()||i===e.style[t]),i=parseFloat(i)||0}return i+k(e,t,n||(s?"border":"content"),r,o)+"px"}function S(e,t){for(var n,r,i,o=[],s=0,a=e.length;a>s;s++)r=e[s],r.style&&(o[s]=vt.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Ct(r)&&(o[s]=vt.access(r,"olddisplay",b(r.nodeName)))):(i=Ct(r),"none"===n&&i||vt.set(r,"olddisplay",i?n:Z.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}function D(e,t,n,r,i){return new D.prototype.init(e,t,n,r,i)}function j(){return setTimeout(function(){Qt=void 0}),Qt=Z.now()}function A(e,t){var n,r=0,i={height:e};for(t=t?1:0;4>r;r+=2-t)n=Tt[r],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function L(e,t,n){for(var r,i=(nn[t]||[]).concat(nn["*"]),o=0,s=i.length;s>o;o++)if(r=i[o].call(n,t,e))return r}function q(e,t,n){var r,i,o,s,a,u,l,c,f=this,p={},d=e.style,h=e.nodeType&&Ct(e),g=vt.get(e,"fxshow");n.queue||(a=Z._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,f.always(function(){f.always(function(){a.unqueued--,Z.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],l=Z.css(e,"display"),c="none"===l?vt.get(e,"olddisplay")||b(e.nodeName):l,"inline"===c&&"none"===Z.css(e,"float")&&(d.display="inline-block")),n.overflow&&(d.overflow="hidden",f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Kt.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(h?"hide":"show")){if("show"!==i||!g||void 0===g[r])continue;h=!0}p[r]=g&&g[r]||Z.style(e,r)}else l=void 0;if(Z.isEmptyObject(p))"inline"===("none"===l?b(e.nodeName):l)&&(d.display=l);else{g?"hidden"in g&&(h=g.hidden):g=vt.access(e,"fxshow",{}),o&&(g.hidden=!h),h?Z(e).show():f.done(function(){Z(e).hide()}),f.done(function(){var t;vt.remove(e,"fxshow");for(t in p)Z.style(e,t,p[t])});for(r in p)s=L(h?g[r]:0,r,f),r in g||(g[r]=s.start,h&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function H(e,t){var n,r,i,o,s;for(n in e)if(r=Z.camelCase(n),i=t[r],o=e[n],Z.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=Z.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function O(e,t,n){var r,i,o=0,s=tn.length,a=Z.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=Qt||j(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:Z.extend({},t),opts:Z.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Qt||j(),duration:n.duration,tweens:[],createTween:function(t,n){var r=Z.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(H(c,l.opts.specialEasing);s>o;o++)if(r=tn[o].call(l,e,c,l.opts))return r;return Z.map(c,L,l),Z.isFunction(l.opts.start)&&l.opts.start.call(e,l),Z.fx.timer(Z.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function F(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(dt)||[];if(Z.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function P(e,t,n,r){function i(a){var u;return o[a]=!0,Z.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||s||o[l]?s?!(u=l):void 0:(t.dataTypes.unshift(l),i(l),!1)}),u}var o={},s=e===bn;return i(t.dataTypes[0])||!o["*"]&&i("*")}function R(e,t){var n,r,i=Z.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&Z.extend(!0,e,r),e}function M(e,t,n){for(var r,i,o,s,a=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):void 0}function W(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(f){return{state:"parsererror",error:s?f:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}function $(e,t,n,r){var i;if(Z.isArray(t))Z.each(t,function(t,i){n||kn.test(e)?r(e,i):$(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==Z.type(t))r(e,t);else for(i in t)$(e+"["+i+"]",t[i],n,r)}function I(e){return Z.isWindow(e)?e:9===e.nodeType&&e.defaultView}var B=[],_=B.slice,z=B.concat,X=B.push,U=B.indexOf,V={},Y=V.toString,G=V.hasOwnProperty,Q={},J=e.document,K="2.1.3",Z=function(e,t){return new Z.fn.init(e,t)},et=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,tt=/^-ms-/,nt=/-([\da-z])/gi,rt=function(e,t){return t.toUpperCase()};Z.fn=Z.prototype={jquery:K,constructor:Z,selector:"",length:0,toArray:function(){return _.call(this)},get:function(e){return null!=e?0>e?this[e+this.length]:this[e]:_.call(this)},pushStack:function(e){var t=Z.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return Z.each(this,e,t)},map:function(e){return this.pushStack(Z.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(_.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:X,sort:B.sort,splice:B.splice},Z.extend=Z.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[a]||{},a++),"object"==typeof s||Z.isFunction(s)||(s={}),a===u&&(s=this,a--);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(Z.isPlainObject(r)||(i=Z.isArray(r)))?(i?(i=!1,o=n&&Z.isArray(n)?n:[]):o=n&&Z.isPlainObject(n)?n:{},s[t]=Z.extend(l,o,r)):void 0!==r&&(s[t]=r));return s},Z.extend({expando:"jQuery"+(K+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===Z.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!Z.isArray(e)&&e-parseFloat(e)+1>=0},isPlainObject:function(e){return"object"!==Z.type(e)||e.nodeType||Z.isWindow(e)?!1:e.constructor&&!G.call(e.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?V[Y.call(e)]||"object":typeof e},globalEval:function(e){var t,n=eval;e=Z.trim(e),e&&(1===e.indexOf("use strict")?(t=J.createElement("script"),t.text=e,J.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(tt,"ms-").replace(nt,rt)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var i,o=0,s=e.length,a=n(e);if(r){if(a)for(;s>o&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(a)for(;s>o&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(et,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?Z.merge(r,"string"==typeof e?[e]:e):X.call(r,e)),r},inArray:function(e,t,n){return null==t?-1:U.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;n>r;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,s=e.length,a=!n;s>o;o++)r=!t(e[o],o),r!==a&&i.push(e[o]);return i},map:function(e,t,r){var i,o=0,s=e.length,a=n(e),u=[];if(a)for(;s>o;o++)i=t(e[o],o,r),null!=i&&u.push(i);else for(o in e)i=t(e[o],o,r),null!=i&&u.push(i);return z.apply([],u)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),Z.isFunction(e)?(r=_.call(arguments,2),i=function(){return e.apply(t||this,r.concat(_.call(arguments)))},i.guid=e.guid=e.guid||Z.guid++,i):void 0},now:Date.now,support:Q}),Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){V["[object "+t+"]"]=t.toLowerCase()});var it=function(e){function t(e,t,n,r){var i,o,s,a,u,l,f,d,h,g;if((t?t.ownerDocument||t:$)!==q&&L(t),t=t||q,n=n||[],a=t.nodeType,"string"!=typeof e||!e||1!==a&&9!==a&&11!==a)return n;if(!r&&O){if(11!==a&&(i=yt.exec(e)))if(s=i[1]){if(9===a){if(o=t.getElementById(s),!o||!o.parentNode)return n;if(o.id===s)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(s))&&M(t,o)&&o.id===s)return n.push(o),n}else{if(i[2])return K.apply(n,t.getElementsByTagName(e)),n;if((s=i[3])&&w.getElementsByClassName)return K.apply(n,t.getElementsByClassName(s)),n}if(w.qsa&&(!F||!F.test(e))){if(d=f=W,h=t,g=1!==a&&e,1===a&&"object"!==t.nodeName.toLowerCase()){for(l=k(e),(f=t.getAttribute("id"))?d=f.replace(bt,"\\$&"):t.setAttribute("id",d),d="[id='"+d+"'] ",u=l.length;u--;)l[u]=d+p(l[u]);h=xt.test(e)&&c(t.parentNode)||t,g=l.join(",")}if(g)try{return K.apply(n,h.querySelectorAll(g)),n}catch(m){}finally{f||t.removeAttribute("id")}}}return S(e.replace(ut,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>T.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[W]=!0,e}function i(e){var t=q.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),r=e.length;r--;)T.attrHandle[n[r]]=t}function s(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||V)-(~e.sourceIndex||V);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function a(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function u(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function l(e){return r(function(t){return t=+t,r(function(n,r){for(var i,o=e([],n.length,t),s=o.length;s--;)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}function c(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function f(){}function p(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function d(e,t,n){var r=t.dir,i=n&&"parentNode"===r,o=B++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,s){var a,u,l=[I,o];if(s){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,s))return!0}else for(;t=t[r];)if(1===t.nodeType||i){if(u=t[W]||(t[W]={}),(a=u[r])&&a[0]===I&&a[1]===o)return l[2]=a[2];if(u[r]=l,l[2]=e(t,n,s))return!0}}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function g(e,n,r){for(var i=0,o=n.length;o>i;i++)t(e,n[i],r);return r}function m(e,t,n,r,i){for(var o,s=[],a=0,u=e.length,l=null!=t;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function v(e,t,n,i,o,s){return i&&!i[W]&&(i=v(i)),o&&!o[W]&&(o=v(o,s)),r(function(r,s,a,u){var l,c,f,p=[],d=[],h=s.length,v=r||g(t||"*",a.nodeType?[a]:a,[]),y=!e||!r&&t?v:m(v,p,e,a,u),x=n?o||(r?e:h||i)?[]:s:y;if(n&&n(y,x,a,u),i)for(l=m(x,d),i(l,[],a,u),c=l.length;c--;)(f=l[c])&&(x[d[c]]=!(y[d[c]]=f));if(r){if(o||e){if(o){for(l=[],c=x.length;c--;)(f=x[c])&&l.push(y[c]=f);o(null,x=[],l,u)}for(c=x.length;c--;)(f=x[c])&&(l=o?et(r,f):p[c])>-1&&(r[l]=!(s[l]=f))}}else x=m(x===s?x.splice(h,x.length):x),o?o(null,s,x,u):K.apply(s,x)})}function y(e){for(var t,n,r,i=e.length,o=T.relative[e[0].type],s=o||T.relative[" "],a=o?1:0,u=d(function(e){return e===t},s,!0),l=d(function(e){return et(t,e)>-1},s,!0),c=[function(e,n,r){var i=!o&&(r||n!==D)||((t=n).nodeType?u(e,n,r):l(e,n,r));return t=null,i}];i>a;a++)if(n=T.relative[e[a].type])c=[d(h(c),n)];else{if(n=T.filter[e[a].type].apply(null,e[a].matches),n[W]){for(r=++a;i>r&&!T.relative[e[r].type];r++);return v(a>1&&h(c),a>1&&p(e.slice(0,a-1).concat({value:" "===e[a-2].type?"*":""})).replace(ut,"$1"),n,r>a&&y(e.slice(a,r)),i>r&&y(e=e.slice(r)),i>r&&p(e))}c.push(n)}return h(c)}function x(e,n){var i=n.length>0,o=e.length>0,s=function(r,s,a,u,l){var c,f,p,d=0,h="0",g=r&&[],v=[],y=D,x=r||o&&T.find.TAG("*",l),b=I+=null==y?1:Math.random()||.1,w=x.length;for(l&&(D=s!==q&&s);h!==w&&null!=(c=x[h]);h++){if(o&&c){for(f=0;p=e[f++];)if(p(c,s,a)){u.push(c);break}l&&(I=b)}i&&((c=!p&&c)&&d--,r&&g.push(c))}if(d+=h,i&&h!==d){for(f=0;p=n[f++];)p(g,v,s,a);if(r){if(d>0)for(;h--;)g[h]||v[h]||(v[h]=Q.call(u));v=m(v)}K.apply(u,v),l&&!r&&v.length>0&&d+n.length>1&&t.uniqueSort(u)}return l&&(I=b,D=y),g};return i?r(s):s}var b,w,T,C,N,k,E,S,D,j,A,L,q,H,O,F,P,R,M,W="sizzle"+1*new Date,$=e.document,I=0,B=0,_=n(),z=n(),X=n(),U=function(e,t){return e===t&&(A=!0),0},V=1<<31,Y={}.hasOwnProperty,G=[],Q=G.pop,J=G.push,K=G.push,Z=G.slice,et=function(e,t){for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1},tt="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",nt="[\\x20\\t\\r\\n\\f]",rt="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",it=rt.replace("w","w#"),ot="\\["+nt+"*("+rt+")(?:"+nt+"*([*^$|!~]?=)"+nt+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+it+"))|)"+nt+"*\\]",st=":("+rt+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ot+")*)|.*)\\)|)",at=new RegExp(nt+"+","g"),ut=new RegExp("^"+nt+"+|((?:^|[^\\\\])(?:\\\\.)*)"+nt+"+$","g"),lt=new RegExp("^"+nt+"*,"+nt+"*"),ct=new RegExp("^"+nt+"*([>+~]|"+nt+")"+nt+"*"),ft=new RegExp("="+nt+"*([^\\]'\"]*?)"+nt+"*\\]","g"),pt=new RegExp(st),dt=new RegExp("^"+it+"$"),ht={ID:new RegExp("^#("+rt+")"),CLASS:new RegExp("^\\.("+rt+")"),TAG:new RegExp("^("+rt.replace("w","w*")+")"),ATTR:new RegExp("^"+ot),PSEUDO:new RegExp("^"+st),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+nt+"*(even|odd|(([+-]|)(\\d*)n|)"+nt+"*(?:([+-]|)"+nt+"*(\\d+)|))"+nt+"*\\)|)","i"),bool:new RegExp("^(?:"+tt+")$","i"),needsContext:new RegExp("^"+nt+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+nt+"*((?:-\\d)?\\d*)"+nt+"*\\)|)(?=[^-]|$)","i")},gt=/^(?:input|select|textarea|button)$/i,mt=/^h\d$/i,vt=/^[^{]+\{\s*\[native \w/,yt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,xt=/[+~]/,bt=/'|\\/g,wt=new RegExp("\\\\([\\da-f]{1,6}"+nt+"?|("+nt+")|.)","ig"),Tt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},Ct=function(){L()};try{K.apply(G=Z.call($.childNodes),$.childNodes),G[$.childNodes.length].nodeType}catch(Nt){K={apply:G.length?function(e,t){J.apply(e,Z.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}w=t.support={},N=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},L=t.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:$;return r!==q&&9===r.nodeType&&r.documentElement?(q=r,H=r.documentElement,n=r.defaultView,n&&n!==n.top&&(n.addEventListener?n.addEventListener("unload",Ct,!1):n.attachEvent&&n.attachEvent("onunload",Ct)),O=!N(r),w.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),w.getElementsByTagName=i(function(e){return e.appendChild(r.createComment("")),!e.getElementsByTagName("*").length}),w.getElementsByClassName=vt.test(r.getElementsByClassName),w.getById=i(function(e){return H.appendChild(e).id=W,!r.getElementsByName||!r.getElementsByName(W).length}),w.getById?(T.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&O){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},T.filter.ID=function(e){var t=e.replace(wt,Tt);return function(e){return e.getAttribute("id")===t}}):(delete T.find.ID,T.filter.ID=function(e){var t=e.replace(wt,Tt);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}}),T.find.TAG=w.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):w.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},T.find.CLASS=w.getElementsByClassName&&function(e,t){return O?t.getElementsByClassName(e):void 0},P=[],F=[],(w.qsa=vt.test(r.querySelectorAll))&&(i(function(e){H.appendChild(e).innerHTML="<a id='"+W+"'></a><select id='"+W+"-\f]' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&F.push("[*^$]="+nt+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||F.push("\\["+nt+"*(?:value|"+tt+")"),e.querySelectorAll("[id~="+W+"-]").length||F.push("~="),e.querySelectorAll(":checked").length||F.push(":checked"),e.querySelectorAll("a#"+W+"+*").length||F.push(".#.+[+~]")}),i(function(e){var t=r.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&F.push("name"+nt+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||F.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),F.push(",.*:")})),(w.matchesSelector=vt.test(R=H.matches||H.webkitMatchesSelector||H.mozMatchesSelector||H.oMatchesSelector||H.msMatchesSelector))&&i(function(e){w.disconnectedMatch=R.call(e,"div"),R.call(e,"[s!='']:x"),P.push("!=",st)}),F=F.length&&new RegExp(F.join("|")),P=P.length&&new RegExp(P.join("|")),t=vt.test(H.compareDocumentPosition),M=t||vt.test(H.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},U=t?function(e,t){if(e===t)return A=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!w.sortDetached&&t.compareDocumentPosition(e)===n?e===r||e.ownerDocument===$&&M($,e)?-1:t===r||t.ownerDocument===$&&M($,t)?1:j?et(j,e)-et(j,t):0:4&n?-1:1)}:function(e,t){if(e===t)return A=!0,0;var n,i=0,o=e.parentNode,a=t.parentNode,u=[e],l=[t];if(!o||!a)return e===r?-1:t===r?1:o?-1:a?1:j?et(j,e)-et(j,t):0;if(o===a)return s(e,t);for(n=e;n=n.parentNode;)u.unshift(n);for(n=t;n=n.parentNode;)l.unshift(n);for(;u[i]===l[i];)i++;return i?s(u[i],l[i]):u[i]===$?-1:l[i]===$?1:0},r):q},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==q&&L(e),n=n.replace(ft,"='$1']"),!(!w.matchesSelector||!O||P&&P.test(n)||F&&F.test(n)))try{var r=R.call(e,n);if(r||w.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return t(n,q,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==q&&L(e),M(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==q&&L(e);var n=T.attrHandle[t.toLowerCase()],r=n&&Y.call(T.attrHandle,t.toLowerCase())?n(e,t,!O):void 0;return void 0!==r?r:w.attributes||!O?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],r=0,i=0;if(A=!w.detectDuplicates,j=!w.sortStable&&e.slice(0),e.sort(U),A){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return j=null,e},C=t.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=C(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=C(t);return n},T=t.selectors={cacheLength:50,createPseudo:r,match:ht,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(wt,Tt),e[3]=(e[3]||e[4]||e[5]||"").replace(wt,Tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return ht.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&pt.test(n)&&(t=k(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(wt,Tt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=_[e+" "];return t||(t=new RegExp("(^|"+nt+")"+e+"("+nt+"|$)"))&&_(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(i){var o=t.attr(i,e);return null==o?"!="===n:n?(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o.replace(at," ")+" ").indexOf(r)>-1:"|="===n?o===r||o.slice(0,r.length+1)===r+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,v=a&&t.nodeName.toLowerCase(),y=!u&&!a;if(m){if(o){for(;g;){for(f=t;f=f[g];)if(a?f.nodeName.toLowerCase()===v:1===f.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[s?m.firstChild:m.lastChild],s&&y){for(c=m[W]||(m[W]={}),l=c[e]||[],d=l[0]===I&&l[1],p=l[0]===I&&l[2],f=d&&m.childNodes[d];f=++d&&f&&f[g]||(p=d=0)||h.pop();)if(1===f.nodeType&&++p&&f===t){c[e]=[I,d,p];break}}else if(y&&(l=(t[W]||(t[W]={}))[e])&&l[0]===I)p=l[1];else for(;(f=++d&&f&&f[g]||(p=d=0)||h.pop())&&((a?f.nodeName.toLowerCase()!==v:1!==f.nodeType)||!++p||(y&&((f[W]||(f[W]={}))[e]=[I,p]),f!==t)););return p-=i,p===r||p%r===0&&p/r>=0}}},PSEUDO:function(e,n){var i,o=T.pseudos[e]||T.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return o[W]?o(n):o.length>1?(i=[e,e,"",n],T.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),s=i.length;s--;)r=et(e,i[s]),e[r]=!(t[r]=i[s])}):function(e){return o(e,0,i)}):o}},pseudos:{not:r(function(e){var t=[],n=[],i=E(e.replace(ut,"$1"));return i[W]?r(function(e,t,n,r){for(var o,s=i(e,null,r,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),t[0]=null,!n.pop()}}),has:r(function(e){return function(n){return t(e,n).length>0}}),contains:r(function(e){return e=e.replace(wt,Tt),function(t){return(t.textContent||t.innerText||C(t)).indexOf(e)>-1}}),lang:r(function(e){return dt.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(wt,Tt).toLowerCase(),function(t){var n;do if(n=O?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===H},focus:function(e){return e===q.activeElement&&(!q.hasFocus||q.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!T.pseudos.empty(e)},header:function(e){return mt.test(e.nodeName)},input:function(e){return gt.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:l(function(){return[0]}),last:l(function(e,t){return[t-1]}),eq:l(function(e,t,n){return[0>n?n+t:n]}),even:l(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:l(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:l(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:l(function(e,t,n){for(var r=0>n?n+t:n;++r<t;)e.push(r);return e})}},T.pseudos.nth=T.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})T.pseudos[b]=a(b);for(b in{submit:!0,reset:!0})T.pseudos[b]=u(b);return f.prototype=T.filters=T.pseudos,T.setFilters=new f,k=t.tokenize=function(e,n){var r,i,o,s,a,u,l,c=z[e+" "];if(c)return n?0:c.slice(0);for(a=e,u=[],l=T.preFilter;a;){(!r||(i=lt.exec(a)))&&(i&&(a=a.slice(i[0].length)||a),u.push(o=[])),r=!1,(i=ct.exec(a))&&(r=i.shift(),o.push({value:r,type:i[0].replace(ut," ")}),a=a.slice(r.length));for(s in T.filter)!(i=ht[s].exec(a))||l[s]&&!(i=l[s](i))||(r=i.shift(),o.push({value:r,type:s,matches:i}),a=a.slice(r.length));if(!r)break}return n?a.length:a?t.error(e):z(e,u).slice(0)},E=t.compile=function(e,t){var n,r=[],i=[],o=X[e+" "];if(!o){for(t||(t=k(e)),n=t.length;n--;)o=y(t[n]),o[W]?r.push(o):i.push(o);o=X(e,x(i,r)),o.selector=e}return o},S=t.select=function(e,t,n,r){var i,o,s,a,u,l="function"==typeof e&&e,f=!r&&k(e=l.selector||e);if(n=n||[],1===f.length){if(o=f[0]=f[0].slice(0),o.length>2&&"ID"===(s=o[0]).type&&w.getById&&9===t.nodeType&&O&&T.relative[o[1].type]){if(t=(T.find.ID(s.matches[0].replace(wt,Tt),t)||[])[0],!t)return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(i=ht.needsContext.test(e)?0:o.length;i--&&(s=o[i],!T.relative[a=s.type]);)if((u=T.find[a])&&(r=u(s.matches[0].replace(wt,Tt),xt.test(o[0].type)&&c(t.parentNode)||t))){if(o.splice(i,1),e=r.length&&p(o),!e)return K.apply(n,r),n;break}}return(l||E(e,f))(r,t,!O,n,xt.test(e)&&c(t.parentNode)||t),n},w.sortStable=W.split("").sort(U).join("")===W,w.detectDuplicates=!!A,L(),w.sortDetached=i(function(e){return 1&e.compareDocumentPosition(q.createElement("div"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),w.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(tt,function(e,t,n){var r;return n?void 0:e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(e);Z.find=it,Z.expr=it.selectors,Z.expr[":"]=Z.expr.pseudos,Z.unique=it.uniqueSort,Z.text=it.getText,Z.isXMLDoc=it.isXML,Z.contains=it.contains;var ot=Z.expr.match.needsContext,st=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,at=/^.[^:#\[\.,]*$/;Z.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?Z.find.matchesSelector(r,e)?[r]:[]:Z.find.matches(e,Z.grep(t,function(e){return 1===e.nodeType}))},Z.fn.extend({find:function(e){var t,n=this.length,r=[],i=this;if("string"!=typeof e)return this.pushStack(Z(e).filter(function(){for(t=0;n>t;t++)if(Z.contains(i[t],this))return!0
}));for(t=0;n>t;t++)Z.find(e,i[t],r);return r=this.pushStack(n>1?Z.unique(r):r),r.selector=this.selector?this.selector+" "+e:e,r},filter:function(e){return this.pushStack(r(this,e||[],!1))},not:function(e){return this.pushStack(r(this,e||[],!0))},is:function(e){return!!r(this,"string"==typeof e&&ot.test(e)?Z(e):e||[],!1).length}});var ut,lt=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,ct=Z.fn.init=function(e,t){var n,r;if(!e)return this;if("string"==typeof e){if(n="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:lt.exec(e),!n||!n[1]&&t)return!t||t.jquery?(t||ut).find(e):this.constructor(t).find(e);if(n[1]){if(t=t instanceof Z?t[0]:t,Z.merge(this,Z.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:J,!0)),st.test(n[1])&&Z.isPlainObject(t))for(n in t)Z.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n]);return this}return r=J.getElementById(n[2]),r&&r.parentNode&&(this.length=1,this[0]=r),this.context=J,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):Z.isFunction(e)?"undefined"!=typeof ut.ready?ut.ready(e):e(Z):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),Z.makeArray(e,this))};ct.prototype=Z.fn,ut=Z(J);var ft=/^(?:parents|prev(?:Until|All))/,pt={children:!0,contents:!0,next:!0,prev:!0};Z.extend({dir:function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&Z(e).is(n))break;r.push(e)}return r},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}}),Z.fn.extend({has:function(e){var t=Z(e,this),n=t.length;return this.filter(function(){for(var e=0;n>e;e++)if(Z.contains(this,t[e]))return!0})},closest:function(e,t){for(var n,r=0,i=this.length,o=[],s=ot.test(e)||"string"!=typeof e?Z(e,t||this.context):0;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&Z.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?Z.unique(o):o)},index:function(e){return e?"string"==typeof e?U.call(Z(e),this[0]):U.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(Z.unique(Z.merge(this.get(),Z(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),Z.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return Z.dir(e,"parentNode")},parentsUntil:function(e,t,n){return Z.dir(e,"parentNode",n)},next:function(e){return i(e,"nextSibling")},prev:function(e){return i(e,"previousSibling")},nextAll:function(e){return Z.dir(e,"nextSibling")},prevAll:function(e){return Z.dir(e,"previousSibling")},nextUntil:function(e,t,n){return Z.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return Z.dir(e,"previousSibling",n)},siblings:function(e){return Z.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return Z.sibling(e.firstChild)},contents:function(e){return e.contentDocument||Z.merge([],e.childNodes)}},function(e,t){Z.fn[e]=function(n,r){var i=Z.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=Z.filter(r,i)),this.length>1&&(pt[e]||Z.unique(i),ft.test(e)&&i.reverse()),this.pushStack(i)}});var dt=/\S+/g,ht={};Z.Callbacks=function(e){e="string"==typeof e?ht[e]||o(e):Z.extend({},e);var t,n,r,i,s,a,u=[],l=!e.once&&[],c=function(o){for(t=e.memory&&o,n=!0,a=i||0,i=0,s=u.length,r=!0;u&&s>a;a++)if(u[a].apply(o[0],o[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,u&&(l?l.length&&c(l.shift()):t?u=[]:f.disable())},f={add:function(){if(u){var n=u.length;!function o(t){Z.each(t,function(t,n){var r=Z.type(n);"function"===r?e.unique&&f.has(n)||u.push(n):n&&n.length&&"string"!==r&&o(n)})}(arguments),r?s=u.length:t&&(i=n,c(t))}return this},remove:function(){return u&&Z.each(arguments,function(e,t){for(var n;(n=Z.inArray(t,u,n))>-1;)u.splice(n,1),r&&(s>=n&&s--,a>=n&&a--)}),this},has:function(e){return e?Z.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],s=0,this},disable:function(){return u=l=t=void 0,this},disabled:function(){return!u},lock:function(){return l=void 0,t||f.disable(),this},locked:function(){return!l},fireWith:function(e,t){return!u||n&&!l||(t=t||[],t=[e,t.slice?t.slice():t],r?l.push(t):c(t)),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!n}};return f},Z.extend({Deferred:function(e){var t=[["resolve","done",Z.Callbacks("once memory"),"resolved"],["reject","fail",Z.Callbacks("once memory"),"rejected"],["notify","progress",Z.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return Z.Deferred(function(n){Z.each(t,function(t,o){var s=Z.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&Z.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o[0]+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?Z.extend(e,r):r}},i={};return r.pipe=r.then,Z.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t,n,r,i=0,o=_.call(arguments),s=o.length,a=1!==s||e&&Z.isFunction(e.promise)?s:0,u=1===a?e:Z.Deferred(),l=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?_.call(arguments):i,r===t?u.notifyWith(n,r):--a||u.resolveWith(n,r)}};if(s>1)for(t=new Array(s),n=new Array(s),r=new Array(s);s>i;i++)o[i]&&Z.isFunction(o[i].promise)?o[i].promise().done(l(i,r,o)).fail(u.reject).progress(l(i,n,t)):--a;return a||u.resolveWith(r,o),u.promise()}});var gt;Z.fn.ready=function(e){return Z.ready.promise().done(e),this},Z.extend({isReady:!1,readyWait:1,holdReady:function(e){e?Z.readyWait++:Z.ready(!0)},ready:function(e){(e===!0?--Z.readyWait:Z.isReady)||(Z.isReady=!0,e!==!0&&--Z.readyWait>0||(gt.resolveWith(J,[Z]),Z.fn.triggerHandler&&(Z(J).triggerHandler("ready"),Z(J).off("ready"))))}}),Z.ready.promise=function(t){return gt||(gt=Z.Deferred(),"complete"===J.readyState?setTimeout(Z.ready):(J.addEventListener("DOMContentLoaded",s,!1),e.addEventListener("load",s,!1))),gt.promise(t)},Z.ready.promise();var mt=Z.access=function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===Z.type(n)){i=!0;for(a in n)Z.access(e,t,a,n[a],!0,o,s)}else if(void 0!==r&&(i=!0,Z.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(Z(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o};Z.acceptData=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType},a.uid=1,a.accepts=Z.acceptData,a.prototype={key:function(e){if(!a.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=a.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,Z.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(Z.isEmptyObject(o))Z.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return void 0===t?n:n[t]},access:function(e,t,n){var r;return void 0===t||t&&"string"==typeof t&&void 0===n?(r=this.get(e,t),void 0!==r?r:this.get(e,Z.camelCase(t))):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(void 0===t)this.cache[o]={};else{Z.isArray(t)?r=t.concat(t.map(Z.camelCase)):(i=Z.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(dt)||[])),n=r.length;for(;n--;)delete s[r[n]]}},hasData:function(e){return!Z.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}};var vt=new a,yt=new a,xt=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,bt=/([A-Z])/g;Z.extend({hasData:function(e){return yt.hasData(e)||vt.hasData(e)},data:function(e,t,n){return yt.access(e,t,n)},removeData:function(e,t){yt.remove(e,t)},_data:function(e,t,n){return vt.access(e,t,n)},_removeData:function(e,t){vt.remove(e,t)}}),Z.fn.extend({data:function(e,t){var n,r,i,o=this[0],s=o&&o.attributes;if(void 0===e){if(this.length&&(i=yt.get(o),1===o.nodeType&&!vt.get(o,"hasDataAttrs"))){for(n=s.length;n--;)s[n]&&(r=s[n].name,0===r.indexOf("data-")&&(r=Z.camelCase(r.slice(5)),u(o,r,i[r])));vt.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){yt.set(this,e)}):mt(this,function(t){var n,r=Z.camelCase(e);if(o&&void 0===t){if(n=yt.get(o,e),void 0!==n)return n;if(n=yt.get(o,r),void 0!==n)return n;if(n=u(o,r,void 0),void 0!==n)return n}else this.each(function(){var n=yt.get(this,r);yt.set(this,r,t),-1!==e.indexOf("-")&&void 0!==n&&yt.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){yt.remove(this,e)})}}),Z.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=vt.get(e,t),n&&(!r||Z.isArray(n)?r=vt.access(e,t,Z.makeArray(n)):r.push(n)),r||[]):void 0},dequeue:function(e,t){t=t||"fx";var n=Z.queue(e,t),r=n.length,i=n.shift(),o=Z._queueHooks(e,t),s=function(){Z.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return vt.get(e,n)||vt.access(e,n,{empty:Z.Callbacks("once memory").add(function(){vt.remove(e,[t+"queue",n])})})}}),Z.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?Z.queue(this[0],e):void 0===t?this:this.each(function(){var n=Z.queue(this,e,t);Z._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&Z.dequeue(this,e)})},dequeue:function(e){return this.each(function(){Z.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=Z.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)n=vt.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var wt=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Tt=["Top","Right","Bottom","Left"],Ct=function(e,t){return e=t||e,"none"===Z.css(e,"display")||!Z.contains(e.ownerDocument,e)},Nt=/^(?:checkbox|radio)$/i;!function(){var e=J.createDocumentFragment(),t=e.appendChild(J.createElement("div")),n=J.createElement("input");n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),Q.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",Q.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue}();var kt="undefined";Q.focusinBubbles="onfocusin"in e;var Et=/^key/,St=/^(?:mouse|pointer|contextmenu)|click/,Dt=/^(?:focusinfocus|focusoutblur)$/,jt=/^([^.]*)(?:\.(.+)|)$/;Z.event={global:{},add:function(e,t,n,r,i){var o,s,a,u,l,c,f,p,d,h,g,m=vt.get(e);if(m)for(n.handler&&(o=n,n=o.handler,i=o.selector),n.guid||(n.guid=Z.guid++),(u=m.events)||(u=m.events={}),(s=m.handle)||(s=m.handle=function(t){return typeof Z!==kt&&Z.event.triggered!==t.type?Z.event.dispatch.apply(e,arguments):void 0}),t=(t||"").match(dt)||[""],l=t.length;l--;)a=jt.exec(t[l])||[],d=g=a[1],h=(a[2]||"").split(".").sort(),d&&(f=Z.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=Z.event.special[d]||{},c=Z.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&Z.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||(p=u[d]=[],p.delegateCount=0,f.setup&&f.setup.call(e,r,h,s)!==!1||e.addEventListener&&e.addEventListener(d,s,!1)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),Z.event.global[d]=!0)},remove:function(e,t,n,r,i){var o,s,a,u,l,c,f,p,d,h,g,m=vt.hasData(e)&&vt.get(e);if(m&&(u=m.events)){for(t=(t||"").match(dt)||[""],l=t.length;l--;)if(a=jt.exec(t[l])||[],d=g=a[1],h=(a[2]||"").split(".").sort(),d){for(f=Z.event.special[d]||{},d=(r?f.delegateType:f.bindType)||d,p=u[d]||[],a=a[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=p.length;o--;)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));s&&!p.length&&(f.teardown&&f.teardown.call(e,h,m.handle)!==!1||Z.removeEvent(e,d,m.handle),delete u[d])}else for(d in u)Z.event.remove(e,d+t[l],n,r,!0);Z.isEmptyObject(u)&&(delete m.handle,vt.remove(e,"events"))}},trigger:function(t,n,r,i){var o,s,a,u,l,c,f,p=[r||J],d=G.call(t,"type")?t.type:t,h=G.call(t,"namespace")?t.namespace.split("."):[];if(s=a=r=r||J,3!==r.nodeType&&8!==r.nodeType&&!Dt.test(d+Z.event.triggered)&&(d.indexOf(".")>=0&&(h=d.split("."),d=h.shift(),h.sort()),l=d.indexOf(":")<0&&"on"+d,t=t[Z.expando]?t:new Z.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=h.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=r),n=null==n?[t]:Z.makeArray(n,[t]),f=Z.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!Z.isWindow(r)){for(u=f.delegateType||d,Dt.test(u+d)||(s=s.parentNode);s;s=s.parentNode)p.push(s),a=s;a===(r.ownerDocument||J)&&p.push(a.defaultView||a.parentWindow||e)}for(o=0;(s=p[o++])&&!t.isPropagationStopped();)t.type=o>1?u:f.bindType||d,c=(vt.get(s,"events")||{})[t.type]&&vt.get(s,"handle"),c&&c.apply(s,n),c=l&&s[l],c&&c.apply&&Z.acceptData(s)&&(t.result=c.apply(s,n),t.result===!1&&t.preventDefault());return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(p.pop(),n)!==!1||!Z.acceptData(r)||l&&Z.isFunction(r[d])&&!Z.isWindow(r)&&(a=r[l],a&&(r[l]=null),Z.event.triggered=d,r[d](),Z.event.triggered=void 0,a&&(r[l]=a)),t.result}},dispatch:function(e){e=Z.event.fix(e);var t,n,r,i,o,s=[],a=_.call(arguments),u=(vt.get(this,"events")||{})[e.type]||[],l=Z.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){for(s=Z.event.handlers.call(this,e,u),t=0;(i=s[t++])&&!e.isPropagationStopped();)for(e.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((Z.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),void 0!==r&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()));return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",void 0===r[i]&&(r[i]=o.needsContext?Z(i,this).index(u)>=0:Z.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return a<t.length&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,o=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||J,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0),e}},fix:function(e){if(e[Z.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];for(s||(this.fixHooks[i]=s=St.test(i)?this.mouseHooks:Et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new Z.Event(o),t=r.length;t--;)n=r[t],e[n]=o[n];return e.target||(e.target=J),3===e.target.nodeType&&(e.target=e.target.parentNode),s.filter?s.filter(e,o):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==f()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===f()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&Z.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(e){return Z.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=Z.extend(new Z.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?Z.event.trigger(i,null,t):Z.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},Z.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},Z.Event=function(e,t){return this instanceof Z.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?l:c):this.type=e,t&&Z.extend(this,t),this.timeStamp=e&&e.timeStamp||Z.now(),void(this[Z.expando]=!0)):new Z.Event(e,t)},Z.Event.prototype={isDefaultPrevented:c,isPropagationStopped:c,isImmediatePropagationStopped:c,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=l,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=l,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=l,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}},Z.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){Z.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!Z.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),Q.focusinBubbles||Z.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){Z.event.simulate(t,e.target,Z.event.fix(e),!0)};Z.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=vt.access(r,t);i||r.addEventListener(e,n,!0),vt.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=vt.access(r,t)-1;i?vt.access(r,t,i):(r.removeEventListener(e,n,!0),vt.remove(r,t))}}}),Z.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=void 0);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=void 0):null==r&&("string"==typeof t?(r=n,n=void 0):(r=n,n=t,t=void 0)),r===!1)r=c;else if(!r)return this;return 1===i&&(o=r,r=function(e){return Z().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=Z.guid++)),this.each(function(){Z.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,Z(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=void 0),n===!1&&(n=c),this.each(function(){Z.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){Z.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?Z.event.trigger(e,t,n,!0):void 0}});var At=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Lt=/<([\w:]+)/,qt=/<|&#?\w+;/,Ht=/<(?:script|style|link)/i,Ot=/checked\s*(?:[^=]|=\s*.checked.)/i,Ft=/^$|\/(?:java|ecma)script/i,Pt=/^true\/(.*)/,Rt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Mt={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Mt.optgroup=Mt.option,Mt.tbody=Mt.tfoot=Mt.colgroup=Mt.caption=Mt.thead,Mt.th=Mt.td,Z.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=Z.contains(e.ownerDocument,e);if(!(Q.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||Z.isXMLDoc(e)))for(s=v(a),o=v(e),r=0,i=o.length;i>r;r++)y(o[r],s[r]);if(t)if(n)for(o=o||v(e),s=s||v(a),r=0,i=o.length;i>r;r++)m(o[r],s[r]);else m(e,a);return s=v(a,"script"),s.length>0&&g(s,!u&&v(e,"script")),a},buildFragment:function(e,t,n,r){for(var i,o,s,a,u,l,c=t.createDocumentFragment(),f=[],p=0,d=e.length;d>p;p++)if(i=e[p],i||0===i)if("object"===Z.type(i))Z.merge(f,i.nodeType?[i]:i);else if(qt.test(i)){for(o=o||c.appendChild(t.createElement("div")),s=(Lt.exec(i)||["",""])[1].toLowerCase(),a=Mt[s]||Mt._default,o.innerHTML=a[1]+i.replace(At,"<$1></$2>")+a[2],l=a[0];l--;)o=o.lastChild;Z.merge(f,o.childNodes),o=c.firstChild,o.textContent=""}else f.push(t.createTextNode(i));for(c.textContent="",p=0;i=f[p++];)if((!r||-1===Z.inArray(i,r))&&(u=Z.contains(i.ownerDocument,i),o=v(c.appendChild(i),"script"),u&&g(o),n))for(l=0;i=o[l++];)Ft.test(i.type||"")&&n.push(i);return c},cleanData:function(e){for(var t,n,r,i,o=Z.event.special,s=0;void 0!==(n=e[s]);s++){if(Z.acceptData(n)&&(i=n[vt.expando],i&&(t=vt.cache[i]))){if(t.events)for(r in t.events)o[r]?Z.event.remove(n,r):Z.removeEvent(n,r,t.handle);vt.cache[i]&&delete vt.cache[i]}delete yt.cache[n[yt.expando]]}}}),Z.fn.extend({text:function(e){return mt(this,function(e){return void 0===e?Z.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=e)})},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=e?Z.filter(e,this):this,i=0;null!=(n=r[i]);i++)t||1!==n.nodeType||Z.cleanData(v(n)),n.parentNode&&(t&&Z.contains(n.ownerDocument,n)&&g(v(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(Z.cleanData(v(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return Z.clone(this,e,t)})},html:function(e){return mt(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ht.test(e)&&!Mt[(Lt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(At,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(Z.cleanData(v(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=arguments[0];return this.domManip(arguments,function(t){e=this.parentNode,Z.cleanData(v(this)),e&&e.replaceChild(t,this)}),e&&(e.length||e.nodeType)?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t){e=z.apply([],e);var n,r,i,o,s,a,u=0,l=this.length,c=this,f=l-1,p=e[0],g=Z.isFunction(p);if(g||l>1&&"string"==typeof p&&!Q.checkClone&&Ot.test(p))return this.each(function(n){var r=c.eq(n);g&&(e[0]=p.call(this,n,r.html())),r.domManip(e,t)});if(l&&(n=Z.buildFragment(e,this[0].ownerDocument,!1,this),r=n.firstChild,1===n.childNodes.length&&(n=r),r)){for(i=Z.map(v(n,"script"),d),o=i.length;l>u;u++)s=n,u!==f&&(s=Z.clone(s,!0,!0),o&&Z.merge(i,v(s,"script"))),t.call(this[u],s,u);if(o)for(a=i[i.length-1].ownerDocument,Z.map(i,h),u=0;o>u;u++)s=i[u],Ft.test(s.type||"")&&!vt.access(s,"globalEval")&&Z.contains(a,s)&&(s.src?Z._evalUrl&&Z._evalUrl(s.src):Z.globalEval(s.textContent.replace(Rt,"")))}return this}}),Z.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){Z.fn[e]=function(e){for(var n,r=[],i=Z(e),o=i.length-1,s=0;o>=s;s++)n=s===o?this:this.clone(!0),Z(i[s])[t](n),X.apply(r,n.get());return this.pushStack(r)}});var Wt,$t={},It=/^margin/,Bt=new RegExp("^("+wt+")(?!px)[a-z%]+$","i"),_t=function(t){return t.ownerDocument.defaultView.opener?t.ownerDocument.defaultView.getComputedStyle(t,null):e.getComputedStyle(t,null)};!function(){function t(){s.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",s.innerHTML="",i.appendChild(o);var t=e.getComputedStyle(s,null);n="1%"!==t.top,r="4px"===t.width,i.removeChild(o)}var n,r,i=J.documentElement,o=J.createElement("div"),s=J.createElement("div");s.style&&(s.style.backgroundClip="content-box",s.cloneNode(!0).style.backgroundClip="",Q.clearCloneStyle="content-box"===s.style.backgroundClip,o.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",o.appendChild(s),e.getComputedStyle&&Z.extend(Q,{pixelPosition:function(){return t(),n},boxSizingReliable:function(){return null==r&&t(),r},reliableMarginRight:function(){var t,n=s.appendChild(J.createElement("div"));return n.style.cssText=s.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",n.style.marginRight=n.style.width="0",s.style.width="1px",i.appendChild(o),t=!parseFloat(e.getComputedStyle(n,null).marginRight),i.removeChild(o),s.removeChild(n),t}}))}(),Z.swap=function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i};var zt=/^(none|table(?!-c[ea]).+)/,Xt=new RegExp("^("+wt+")(.*)$","i"),Ut=new RegExp("^([+-])=("+wt+")","i"),Vt={position:"absolute",visibility:"hidden",display:"block"},Yt={letterSpacing:"0",fontWeight:"400"},Gt=["Webkit","O","Moz","ms"];Z.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=w(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=Z.camelCase(t),u=e.style;return t=Z.cssProps[a]||(Z.cssProps[a]=C(u,a)),s=Z.cssHooks[t]||Z.cssHooks[a],void 0===n?s&&"get"in s&&void 0!==(i=s.get(e,!1,r))?i:u[t]:(o=typeof n,"string"===o&&(i=Ut.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(Z.css(e,t)),o="number"),null!=n&&n===n&&("number"!==o||Z.cssNumber[a]||(n+="px"),Q.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,r))||(u[t]=n)),void 0)}},css:function(e,t,n,r){var i,o,s,a=Z.camelCase(t);return t=Z.cssProps[a]||(Z.cssProps[a]=C(e.style,a)),s=Z.cssHooks[t]||Z.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),void 0===i&&(i=w(e,t,r)),"normal"===i&&t in Yt&&(i=Yt[t]),""===n||n?(o=parseFloat(i),n===!0||Z.isNumeric(o)?o||0:i):i}}),Z.each(["height","width"],function(e,t){Z.cssHooks[t]={get:function(e,n,r){return n?zt.test(Z.css(e,"display"))&&0===e.offsetWidth?Z.swap(e,Vt,function(){return E(e,t,r)}):E(e,t,r):void 0},set:function(e,n,r){var i=r&&_t(e);return N(e,n,r?k(e,t,r,"border-box"===Z.css(e,"boxSizing",!1,i),i):0)}}}),Z.cssHooks.marginRight=T(Q.reliableMarginRight,function(e,t){return t?Z.swap(e,{display:"inline-block"},w,[e,"marginRight"]):void 0}),Z.each({margin:"",padding:"",border:"Width"},function(e,t){Z.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[e+Tt[r]+t]=o[r]||o[r-2]||o[0];return i}},It.test(e)||(Z.cssHooks[e+t].set=N)}),Z.fn.extend({css:function(e,t){return mt(this,function(e,t,n){var r,i,o={},s=0;if(Z.isArray(t)){for(r=_t(e),i=t.length;i>s;s++)o[t[s]]=Z.css(e,t[s],!1,r);return o}return void 0!==n?Z.style(e,t,n):Z.css(e,t)},e,t,arguments.length>1)},show:function(){return S(this,!0)},hide:function(){return S(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Ct(this)?Z(this).show():Z(this).hide()})}}),Z.Tween=D,D.prototype={constructor:D,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(Z.cssNumber[n]?"":"px")},cur:function(){var e=D.propHooks[this.prop];return e&&e.get?e.get(this):D.propHooks._default.get(this)},run:function(e){var t,n=D.propHooks[this.prop];return this.pos=t=this.options.duration?Z.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):D.propHooks._default.set(this),this}},D.prototype.init.prototype=D.prototype,D.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=Z.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){Z.fx.step[e.prop]?Z.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[Z.cssProps[e.prop]]||Z.cssHooks[e.prop])?Z.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},D.propHooks.scrollTop=D.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},Z.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},Z.fx=D.prototype.init,Z.fx.step={};var Qt,Jt,Kt=/^(?:toggle|show|hide)$/,Zt=new RegExp("^(?:([+-])=|)("+wt+")([a-z%]*)$","i"),en=/queueHooks$/,tn=[q],nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Zt.exec(t),o=i&&i[3]||(Z.cssNumber[e]?"":"px"),s=(Z.cssNumber[e]||"px"!==o&&+r)&&Zt.exec(Z.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,Z.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};Z.Animation=Z.extend(O,{tweener:function(e,t){Z.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],nn[n]=nn[n]||[],nn[n].unshift(t)},prefilter:function(e,t){t?tn.unshift(e):tn.push(e)}}),Z.speed=function(e,t,n){var r=e&&"object"==typeof e?Z.extend({},e):{complete:n||!n&&t||Z.isFunction(e)&&e,duration:e,easing:n&&t||t&&!Z.isFunction(t)&&t};return r.duration=Z.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in Z.fx.speeds?Z.fx.speeds[r.duration]:Z.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){Z.isFunction(r.old)&&r.old.call(this),r.queue&&Z.dequeue(this,r.queue)},r},Z.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Ct).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=Z.isEmptyObject(e),o=Z.speed(t,n,r),s=function(){var t=O(this,Z.extend({},e),o);(i||vt.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=Z.timers,s=vt.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&en.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&Z.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=vt.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=Z.timers,s=r?r.length:0;for(n.finish=!0,Z.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);
delete n.finish})}}),Z.each(["toggle","show","hide"],function(e,t){var n=Z.fn[t];Z.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(A(t,!0),e,r,i)}}),Z.each({slideDown:A("show"),slideUp:A("hide"),slideToggle:A("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){Z.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),Z.timers=[],Z.fx.tick=function(){var e,t=0,n=Z.timers;for(Qt=Z.now();t<n.length;t++)e=n[t],e()||n[t]!==e||n.splice(t--,1);n.length||Z.fx.stop(),Qt=void 0},Z.fx.timer=function(e){Z.timers.push(e),e()?Z.fx.start():Z.timers.pop()},Z.fx.interval=13,Z.fx.start=function(){Jt||(Jt=setInterval(Z.fx.tick,Z.fx.interval))},Z.fx.stop=function(){clearInterval(Jt),Jt=null},Z.fx.speeds={slow:600,fast:200,_default:400},Z.fn.delay=function(e,t){return e=Z.fx?Z.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},function(){var e=J.createElement("input"),t=J.createElement("select"),n=t.appendChild(J.createElement("option"));e.type="checkbox",Q.checkOn=""!==e.value,Q.optSelected=n.selected,t.disabled=!0,Q.optDisabled=!n.disabled,e=J.createElement("input"),e.value="t",e.type="radio",Q.radioValue="t"===e.value}();var rn,on,sn=Z.expr.attrHandle;Z.fn.extend({attr:function(e,t){return mt(this,Z.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){Z.removeAttr(this,e)})}}),Z.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(e&&3!==o&&8!==o&&2!==o)return typeof e.getAttribute===kt?Z.prop(e,t,n):(1===o&&Z.isXMLDoc(e)||(t=t.toLowerCase(),r=Z.attrHooks[t]||(Z.expr.match.bool.test(t)?on:rn)),void 0===n?r&&"get"in r&&null!==(i=r.get(e,t))?i:(i=Z.find.attr(e,t),null==i?void 0:i):null!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:(e.setAttribute(t,n+""),n):void Z.removeAttr(e,t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(dt);if(o&&1===e.nodeType)for(;n=o[i++];)r=Z.propFix[n]||n,Z.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!Q.radioValue&&"radio"===t&&Z.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}}}),on={set:function(e,t,n){return t===!1?Z.removeAttr(e,n):e.setAttribute(n,n),n}},Z.each(Z.expr.match.bool.source.match(/\w+/g),function(e,t){var n=sn[t]||Z.find.attr;sn[t]=function(e,t,r){var i,o;return r||(o=sn[t],sn[t]=i,i=null!=n(e,t,r)?t.toLowerCase():null,sn[t]=o),i}});var an=/^(?:input|select|textarea|button)$/i;Z.fn.extend({prop:function(e,t){return mt(this,Z.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[Z.propFix[e]||e]})}}),Z.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!Z.isXMLDoc(e),o&&(t=Z.propFix[t]||t,i=Z.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||an.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),Q.optSelected||(Z.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),Z.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){Z.propFix[this.toLowerCase()]=this});var un=/[\t\r\n\f]/g;Z.fn.extend({addClass:function(e){var t,n,r,i,o,s,a="string"==typeof e&&e,u=0,l=this.length;if(Z.isFunction(e))return this.each(function(t){Z(this).addClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(dt)||[];l>u;u++)if(n=this[u],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(un," "):" ")){for(o=0;i=t[o++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");s=Z.trim(r),n.className!==s&&(n.className=s)}return this},removeClass:function(e){var t,n,r,i,o,s,a=0===arguments.length||"string"==typeof e&&e,u=0,l=this.length;if(Z.isFunction(e))return this.each(function(t){Z(this).removeClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(dt)||[];l>u;u++)if(n=this[u],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(un," "):"")){for(o=0;i=t[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");s=e?Z.trim(r):"",n.className!==s&&(n.className=s)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):this.each(Z.isFunction(e)?function(n){Z(this).toggleClass(e.call(this,n,this.className,t),t)}:function(){if("string"===n)for(var t,r=0,i=Z(this),o=e.match(dt)||[];t=o[r++];)i.hasClass(t)?i.removeClass(t):i.addClass(t);else(n===kt||"boolean"===n)&&(this.className&&vt.set(this,"__className__",this.className),this.className=this.className||e===!1?"":vt.get(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(un," ").indexOf(t)>=0)return!0;return!1}});var ln=/\r/g;Z.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=Z.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,Z(this).val()):e,null==i?i="":"number"==typeof i?i+="":Z.isArray(i)&&(i=Z.map(i,function(e){return null==e?"":e+""})),t=Z.valHooks[this.type]||Z.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return t=Z.valHooks[i.type]||Z.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(ln,""):null==n?"":n)}}}),Z.extend({valHooks:{option:{get:function(e){var t=Z.find.attr(e,"value");return null!=t?t:Z.trim(Z.text(e))}},select:{get:function(e){for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(Q.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&Z.nodeName(n.parentNode,"optgroup"))){if(t=Z(n).val(),o)return t;s.push(t)}return s},set:function(e,t){for(var n,r,i=e.options,o=Z.makeArray(t),s=i.length;s--;)r=i[s],(r.selected=Z.inArray(r.value,o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),Z.each(["radio","checkbox"],function(){Z.valHooks[this]={set:function(e,t){return Z.isArray(t)?e.checked=Z.inArray(Z(e).val(),t)>=0:void 0}},Q.checkOn||(Z.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){Z.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),Z.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var cn=Z.now(),fn=/\?/;Z.parseJSON=function(e){return JSON.parse(e+"")},Z.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=void 0}return(!t||t.getElementsByTagName("parsererror").length)&&Z.error("Invalid XML: "+e),t};var pn=/#.*$/,dn=/([?&])_=[^&]*/,hn=/^(.*?):[ \t]*([^\r\n]*)$/gm,gn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,mn=/^(?:GET|HEAD)$/,vn=/^\/\//,yn=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,xn={},bn={},wn="*/".concat("*"),Tn=e.location.href,Cn=yn.exec(Tn.toLowerCase())||[];Z.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Tn,type:"GET",isLocal:gn.test(Cn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":wn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":Z.parseJSON,"text xml":Z.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?R(R(e,Z.ajaxSettings),t):R(Z.ajaxSettings,e)},ajaxPrefilter:F(xn),ajaxTransport:F(bn),ajax:function(e,t){function n(e,t,n,s){var u,c,v,y,b,T=t;2!==x&&(x=2,a&&clearTimeout(a),r=void 0,o=s||"",w.readyState=e>0?4:0,u=e>=200&&300>e||304===e,n&&(y=M(f,w,n)),y=W(f,y,w,u),u?(f.ifModified&&(b=w.getResponseHeader("Last-Modified"),b&&(Z.lastModified[i]=b),b=w.getResponseHeader("etag"),b&&(Z.etag[i]=b)),204===e||"HEAD"===f.type?T="nocontent":304===e?T="notmodified":(T=y.state,c=y.data,v=y.error,u=!v)):(v=T,(e||!T)&&(T="error",0>e&&(e=0))),w.status=e,w.statusText=(t||T)+"",u?h.resolveWith(p,[c,T,w]):h.rejectWith(p,[w,T,v]),w.statusCode(m),m=void 0,l&&d.trigger(u?"ajaxSuccess":"ajaxError",[w,f,u?c:v]),g.fireWith(p,[w,T]),l&&(d.trigger("ajaxComplete",[w,f]),--Z.active||Z.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=void 0),t=t||{};var r,i,o,s,a,u,l,c,f=Z.ajaxSetup({},t),p=f.context||f,d=f.context&&(p.nodeType||p.jquery)?Z(p):Z.event,h=Z.Deferred(),g=Z.Callbacks("once memory"),m=f.statusCode||{},v={},y={},x=0,b="canceled",w={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!s)for(s={};t=hn.exec(o);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?o:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=y[n]=y[n]||e,v[e]=t),this},overrideMimeType:function(e){return x||(f.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else w.always(e[w.status]);return this},abort:function(e){var t=e||b;return r&&r.abort(t),n(0,t),this}};if(h.promise(w).complete=g.add,w.success=w.done,w.error=w.fail,f.url=((e||f.url||Tn)+"").replace(pn,"").replace(vn,Cn[1]+"//"),f.type=t.method||t.type||f.method||f.type,f.dataTypes=Z.trim(f.dataType||"*").toLowerCase().match(dt)||[""],null==f.crossDomain&&(u=yn.exec(f.url.toLowerCase()),f.crossDomain=!(!u||u[1]===Cn[1]&&u[2]===Cn[2]&&(u[3]||("http:"===u[1]?"80":"443"))===(Cn[3]||("http:"===Cn[1]?"80":"443")))),f.data&&f.processData&&"string"!=typeof f.data&&(f.data=Z.param(f.data,f.traditional)),P(xn,f,t,w),2===x)return w;l=Z.event&&f.global,l&&0===Z.active++&&Z.event.trigger("ajaxStart"),f.type=f.type.toUpperCase(),f.hasContent=!mn.test(f.type),i=f.url,f.hasContent||(f.data&&(i=f.url+=(fn.test(i)?"&":"?")+f.data,delete f.data),f.cache===!1&&(f.url=dn.test(i)?i.replace(dn,"$1_="+cn++):i+(fn.test(i)?"&":"?")+"_="+cn++)),f.ifModified&&(Z.lastModified[i]&&w.setRequestHeader("If-Modified-Since",Z.lastModified[i]),Z.etag[i]&&w.setRequestHeader("If-None-Match",Z.etag[i])),(f.data&&f.hasContent&&f.contentType!==!1||t.contentType)&&w.setRequestHeader("Content-Type",f.contentType),w.setRequestHeader("Accept",f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+("*"!==f.dataTypes[0]?", "+wn+"; q=0.01":""):f.accepts["*"]);for(c in f.headers)w.setRequestHeader(c,f.headers[c]);if(f.beforeSend&&(f.beforeSend.call(p,w,f)===!1||2===x))return w.abort();b="abort";for(c in{success:1,error:1,complete:1})w[c](f[c]);if(r=P(bn,f,t,w)){w.readyState=1,l&&d.trigger("ajaxSend",[w,f]),f.async&&f.timeout>0&&(a=setTimeout(function(){w.abort("timeout")},f.timeout));try{x=1,r.send(v,n)}catch(T){if(!(2>x))throw T;n(-1,T)}}else n(-1,"No Transport");return w},getJSON:function(e,t,n){return Z.get(e,t,n,"json")},getScript:function(e,t){return Z.get(e,void 0,t,"script")}}),Z.each(["get","post"],function(e,t){Z[t]=function(e,n,r,i){return Z.isFunction(n)&&(i=i||r,r=n,n=void 0),Z.ajax({url:e,type:t,dataType:i,data:n,success:r})}}),Z._evalUrl=function(e){return Z.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},Z.fn.extend({wrapAll:function(e){var t;return Z.isFunction(e)?this.each(function(t){Z(this).wrapAll(e.call(this,t))}):(this[0]&&(t=Z(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return this.each(Z.isFunction(e)?function(t){Z(this).wrapInner(e.call(this,t))}:function(){var t=Z(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=Z.isFunction(e);return this.each(function(n){Z(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){Z.nodeName(this,"body")||Z(this).replaceWith(this.childNodes)}).end()}}),Z.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0},Z.expr.filters.visible=function(e){return!Z.expr.filters.hidden(e)};var Nn=/%20/g,kn=/\[\]$/,En=/\r?\n/g,Sn=/^(?:submit|button|image|reset|file)$/i,Dn=/^(?:input|select|textarea|keygen)/i;Z.param=function(e,t){var n,r=[],i=function(e,t){t=Z.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(void 0===t&&(t=Z.ajaxSettings&&Z.ajaxSettings.traditional),Z.isArray(e)||e.jquery&&!Z.isPlainObject(e))Z.each(e,function(){i(this.name,this.value)});else for(n in e)$(n,e[n],t,i);return r.join("&").replace(Nn,"+")},Z.fn.extend({serialize:function(){return Z.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=Z.prop(this,"elements");return e?Z.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!Z(this).is(":disabled")&&Dn.test(this.nodeName)&&!Sn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=Z(this).val();return null==n?null:Z.isArray(n)?Z.map(n,function(e){return{name:t.name,value:e.replace(En,"\r\n")}}):{name:t.name,value:n.replace(En,"\r\n")}}).get()}}),Z.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var jn=0,An={},Ln={0:200,1223:204},qn=Z.ajaxSettings.xhr();e.attachEvent&&e.attachEvent("onunload",function(){for(var e in An)An[e]()}),Q.cors=!!qn&&"withCredentials"in qn,Q.ajax=qn=!!qn,Z.ajaxTransport(function(e){var t;return Q.cors||qn&&!e.crossDomain?{send:function(n,r){var i,o=e.xhr(),s=++jn;if(o.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)o[i]=e.xhrFields[i];e.mimeType&&o.overrideMimeType&&o.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)o.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete An[s],t=o.onload=o.onerror=null,"abort"===e?o.abort():"error"===e?r(o.status,o.statusText):r(Ln[o.status]||o.status,o.statusText,"string"==typeof o.responseText?{text:o.responseText}:void 0,o.getAllResponseHeaders()))}},o.onload=t(),o.onerror=t("error"),t=An[s]=t("abort");try{o.send(e.hasContent&&e.data||null)}catch(a){if(t)throw a}},abort:function(){t&&t()}}:void 0}),Z.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return Z.globalEval(e),e}}}),Z.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),Z.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=Z("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),J.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Hn=[],On=/(=)\?(?=&|$)|\?\?/;Z.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Hn.pop()||Z.expando+"_"+cn++;return this[e]=!0,e}}),Z.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(On.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&On.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=Z.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(On,"$1"+i):t.jsonp!==!1&&(t.url+=(fn.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||Z.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,Hn.push(i)),s&&Z.isFunction(o)&&o(s[0]),s=o=void 0}),"script"):void 0}),Z.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||J;var r=st.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=Z.buildFragment([e],t,i),i&&i.length&&Z(i).remove(),Z.merge([],r.childNodes))};var Fn=Z.fn.load;Z.fn.load=function(e,t,n){if("string"!=typeof e&&Fn)return Fn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=Z.trim(e.slice(a)),e=e.slice(0,a)),Z.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),s.length>0&&Z.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?Z("<div>").append(Z.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},Z.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){Z.fn[t]=function(e){return this.on(t,e)}}),Z.expr.filters.animated=function(e){return Z.grep(Z.timers,function(t){return e===t.elem}).length};var Pn=e.document.documentElement;Z.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=Z.css(e,"position"),f=Z(e),p={};"static"===c&&(e.style.position="relative"),a=f.offset(),o=Z.css(e,"top"),u=Z.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=f.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),Z.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(p.top=t.top-a.top+s),null!=t.left&&(p.left=t.left-a.left+i),"using"in t?t.using.call(e,p):f.css(p)}},Z.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){Z.offset.setOffset(this,e,t)});var t,n,r=this[0],i={top:0,left:0},o=r&&r.ownerDocument;if(o)return t=o.documentElement,Z.contains(t,r)?(typeof r.getBoundingClientRect!==kt&&(i=r.getBoundingClientRect()),n=I(o),{top:i.top+n.pageYOffset-t.clientTop,left:i.left+n.pageXOffset-t.clientLeft}):i},position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===Z.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),Z.nodeName(e[0],"html")||(r=e.offset()),r.top+=Z.css(e[0],"borderTopWidth",!0),r.left+=Z.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-Z.css(n,"marginTop",!0),left:t.left-r.left-Z.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||Pn;e&&!Z.nodeName(e,"html")&&"static"===Z.css(e,"position");)e=e.offsetParent;return e||Pn})}}),Z.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;Z.fn[t]=function(i){return mt(this,function(t,i,o){var s=I(t);return void 0===o?s?s[n]:t[i]:void(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o)},t,i,arguments.length,null)}}),Z.each(["top","left"],function(e,t){Z.cssHooks[t]=T(Q.pixelPosition,function(e,n){return n?(n=w(e,t),Bt.test(n)?Z(e).position()[t]+"px":n):void 0})}),Z.each({Height:"height",Width:"width"},function(e,t){Z.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){Z.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return mt(this,function(t,n,r){var i;return Z.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):void 0===r?Z.css(t,n,s):Z.style(t,n,r,s)},t,o?r:void 0,o,null)}})}),Z.fn.size=function(){return this.length},Z.fn.andSelf=Z.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return Z});var Rn=e.jQuery,Mn=e.$;return Z.noConflict=function(t){return e.$===Z&&(e.$=Mn),t&&e.jQuery===Z&&(e.jQuery=Rn),Z},typeof t===kt&&(e.jQuery=e.$=Z),Z});
!function(t,e,n){"use strict";function r(t){return function(){var e,n,r=arguments[0],i="["+(t?t+":":"")+r+"] ",o=arguments[1],a=arguments,s=function(t){return"function"==typeof t?t.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof t?"undefined":"string"!=typeof t?JSON.stringify(t):t};for(e=i+o.replace(/\{\d+\}/g,function(t){var e,n=+t.slice(1,-1);return n+2<a.length?(e=a[n+2],"function"==typeof e?e.toString().replace(/ ?\{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?L(e):e):t}),e=e+"\nhttp://errors.angularjs.org/1.2.28/"+(t?t+"/":"")+r,n=2;n<arguments.length;n++)e=e+(2==n?"?":"&")+"p"+(n-2)+"="+encodeURIComponent(s(arguments[n]));return new Error(e)}}function i(t){if(null==t||k(t))return!1;var e=t.length;return 1===t.nodeType&&e?!0:w(t)||Nr(t)||0===e||"number"==typeof e&&e>0&&e-1 in t}function o(t,e,n){var r;if(t)if(S(t))for(r in t)"prototype"==r||"length"==r||"name"==r||t.hasOwnProperty&&!t.hasOwnProperty(r)||e.call(n,t[r],r);else if(Nr(t)||i(t))for(r=0;r<t.length;r++)e.call(n,t[r],r);else if(t.forEach&&t.forEach!==o)t.forEach(e,n);else for(r in t)t.hasOwnProperty(r)&&e.call(n,t[r],r);return t}function a(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);return e.sort()}function s(t,e,n){for(var r=a(t),i=0;i<r.length;i++)e.call(n,t[r[i]],r[i]);return r}function u(t){return function(e,n){t(n,e)}}function c(){for(var t,e=Mr.length;e;){if(e--,t=Mr[e].charCodeAt(0),57==t)return Mr[e]="A",Mr.join("");if(90!=t)return Mr[e]=String.fromCharCode(t+1),Mr.join("");Mr[e]="0"}return Mr.unshift("0"),Mr.join("")}function l(t,e){e?t.$$hashKey=e:delete t.$$hashKey}function f(t){var e=t.$$hashKey;return o(arguments,function(e){e!==t&&o(e,function(e,n){t[n]=e})}),l(t,e),t}function h(t){return parseInt(t,10)}function p(t,e){return f(new(f(function(){},{prototype:t})),e)}function $(){}function d(t){return t}function v(t){return function(){return t}}function g(t){return"undefined"==typeof t}function m(t){return"undefined"!=typeof t}function y(t){return null!=t&&"object"==typeof t}function w(t){return"string"==typeof t}function b(t){return"number"==typeof t}function x(t){return"[object Date]"===Ar.call(t)}function S(t){return"function"==typeof t}function C(t){return"[object RegExp]"===Ar.call(t)}function k(t){return t&&t.document&&t.location&&t.alert&&t.setInterval}function E(t){return t&&t.$evalAsync&&t.$watch}function A(t){return"[object File]"===Ar.call(t)}function O(t){return"[object Blob]"===Ar.call(t)}function T(t){return t&&S(t.then)}function M(t){return!(!t||!(t.nodeName||t.prop&&t.attr&&t.find))}function N(t,e,n){var r=[];return o(t,function(t,i,o){r.push(e.call(n,t,i,o))}),r}function P(t,e){return-1!=j(t,e)}function j(t,e){if(t.indexOf)return t.indexOf(e);for(var n=0;n<t.length;n++)if(e===t[n])return n;return-1}function D(t,e){var n=j(t,e);return n>=0&&t.splice(n,1),e}function R(t,e,n,r){if(k(t)||E(t))throw Or("cpws","Can't copy! Making copies of Window or Scope instances is not supported.");if(e){if(t===e)throw Or("cpi","Can't copy! Source and destination are identical.");if(n=n||[],r=r||[],y(t)){var i=j(n,t);if(-1!==i)return r[i];n.push(t),r.push(e)}var a;if(Nr(t)){e.length=0;for(var s=0;s<t.length;s++)a=R(t[s],null,n,r),y(t[s])&&(n.push(t[s]),r.push(a)),e.push(a)}else{var u=e.$$hashKey;Nr(e)?e.length=0:o(e,function(t,n){delete e[n]});for(var c in t)a=R(t[c],null,n,r),y(t[c])&&(n.push(t[c]),r.push(a)),e[c]=a;l(e,u)}}else e=t,t&&(Nr(t)?e=R(t,[],n,r):x(t)?e=new Date(t.getTime()):C(t)?(e=new RegExp(t.source,t.toString().match(/[^\/]*$/)[0]),e.lastIndex=t.lastIndex):y(t)&&(e=R(t,{},n,r)));return e}function _(t,e){if(Nr(t)){e=e||[];for(var n=0;n<t.length;n++)e[n]=t[n]}else if(y(t)){e=e||{};for(var r in t)!vr.call(t,r)||"$"===r.charAt(0)&&"$"===r.charAt(1)||(e[r]=t[r])}return e||t}function q(t,e){if(t===e)return!0;if(null===t||null===e)return!1;if(t!==t&&e!==e)return!0;var r,i,o,a=typeof t,s=typeof e;if(a==s&&"object"==a){if(!Nr(t)){if(x(t))return x(e)?isNaN(t.getTime())&&isNaN(e.getTime())||t.getTime()===e.getTime():!1;if(C(t)&&C(e))return t.toString()==e.toString();if(E(t)||E(e)||k(t)||k(e)||Nr(e))return!1;o={};for(i in t)if("$"!==i.charAt(0)&&!S(t[i])){if(!q(t[i],e[i]))return!1;o[i]=!0}for(i in e)if(!o.hasOwnProperty(i)&&"$"!==i.charAt(0)&&e[i]!==n&&!S(e[i]))return!1;return!0}if(!Nr(e))return!1;if((r=t.length)==e.length){for(i=0;r>i;i++)if(!q(t[i],e[i]))return!1;return!0}}return!1}function U(t,e,n){return t.concat(kr.call(e,n))}function V(t,e){return kr.call(t,e||0)}function I(t,e){var n=arguments.length>2?V(arguments,2):[];return!S(e)||e instanceof RegExp?e:n.length?function(){return arguments.length?e.apply(t,n.concat(kr.call(arguments,0))):e.apply(t,n)}:function(){return arguments.length?e.apply(t,arguments):e.call(t)}}function F(t,r){var i=r;return"string"==typeof t&&"$"===t.charAt(0)?i=n:k(r)?i="$WINDOW":r&&e===r?i="$DOCUMENT":E(r)&&(i="$SCOPE"),i}function L(t,e){return"undefined"==typeof t?n:JSON.stringify(t,F,e?"  ":null)}function H(t){return w(t)?JSON.parse(t):t}function B(t){if("function"==typeof t)t=!0;else if(t&&0!==t.length){var e=dr(""+t);t=!("f"==e||"0"==e||"false"==e||"no"==e||"n"==e||"[]"==e)}else t=!1;return t}function z(t){t=br(t).clone();try{t.empty()}catch(e){}var n=3,r=br("<div>").append(t).html();try{return t[0].nodeType===n?dr(r):r.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(t,e){return"<"+dr(e)})}catch(e){return dr(r)}}function W(t){try{return decodeURIComponent(t)}catch(e){}}function Q(t){var e,n,r={};return o((t||"").split("&"),function(t){if(t&&(e=t.replace(/\+/g,"%20").split("="),n=W(e[0]),m(n))){var i=m(e[1])?W(e[1]):!0;vr.call(r,n)?Nr(r[n])?r[n].push(i):r[n]=[r[n],i]:r[n]=i}}),r}function J(t){var e=[];return o(t,function(t,n){Nr(t)?o(t,function(t){e.push(X(n,!0)+(t===!0?"":"="+X(t,!0)))}):e.push(X(n,!0)+(t===!0?"":"="+X(t,!0)))}),e.length?e.join("&"):""}function G(t){return X(t,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function X(t,e){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,e?"%20":"+")}function K(t,n){function r(t){t&&s.push(t)}var i,a,s=[t],u=["ng:app","ng-app","x-ng-app","data-ng-app"],c=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;o(u,function(n){u[n]=!0,r(e.getElementById(n)),n=n.replace(":","\\:"),t.querySelectorAll&&(o(t.querySelectorAll("."+n),r),o(t.querySelectorAll("."+n+"\\:"),r),o(t.querySelectorAll("["+n+"]"),r))}),o(s,function(t){if(!i){var e=" "+t.className+" ",n=c.exec(e);n?(i=t,a=(n[2]||"").replace(/\s+/g,",")):o(t.attributes,function(e){!i&&u[e.name]&&(i=t,a=e.value)})}}),i&&n(i,a?[a]:[])}function Y(n,r){var i=function(){if(n=br(n),n.injector()){var t=n[0]===e?"document":z(n);throw Or("btstrpd","App Already Bootstrapped with this Element '{0}'",t.replace(/</,"&lt;").replace(/>/,"&gt;"))}r=r||[],r.unshift(["$provide",function(t){t.value("$rootElement",n)}]),r.unshift("ng");var i=je(r);return i.invoke(["$rootScope","$rootElement","$compile","$injector","$animate",function(t,e,n,r){t.$apply(function(){e.data("$injector",r),n(e)(t)})}]),i},a=/^NG_DEFER_BOOTSTRAP!/;return t&&!a.test(t.name)?i():(t.name=t.name.replace(a,""),void(Tr.resumeBootstrap=function(t){o(t,function(t){r.push(t)}),i()}))}function Z(t,e){return e=e||"_",t.replace(Dr,function(t,n){return(n?e:"")+t.toLowerCase()})}function te(){xr=t.jQuery,xr&&xr.fn.on?(br=xr,f(xr.fn,{scope:Jr.scope,isolateScope:Jr.isolateScope,controller:Jr.controller,injector:Jr.injector,inheritedData:Jr.inheritedData}),le("remove",!0,!0,!1),le("empty",!1,!1,!1),le("html",!1,!1,!0)):br=$e,Tr.element=br}function ee(t,e,n){if(!t)throw Or("areq","Argument '{0}' is {1}",e||"?",n||"required");return t}function ne(t,e,n){return n&&Nr(t)&&(t=t[t.length-1]),ee(S(t),e,"not a function, got "+(t&&"object"==typeof t?t.constructor.name||"Object":typeof t)),t}function re(t,e){if("hasOwnProperty"===t)throw Or("badname","hasOwnProperty is not a valid {0} name",e)}function ie(t,e,n){if(!e)return t;for(var r,i=e.split("."),o=t,a=i.length,s=0;a>s;s++)r=i[s],t&&(t=(o=t)[r]);return!n&&S(t)?I(o,t):t}function oe(t){var e=t[0],n=t[t.length-1];if(e===n)return br(e);var r=e,i=[r];do{if(r=r.nextSibling,!r)break;i.push(r)}while(r!==n);return br(i)}function ae(t){function e(t,e,n){return t[e]||(t[e]=n())}var n=r("$injector"),i=r("ng"),o=e(t,"angular",Object);return o.$$minErr=o.$$minErr||r,e(o,"module",function(){var t={};return function(r,o,a){var s=function(t,e){if("hasOwnProperty"===t)throw i("badname","hasOwnProperty is not a valid {0} name",e)};return s(r,"module"),o&&t.hasOwnProperty(r)&&(t[r]=null),e(t,r,function(){function t(t,n,r){return function(){return e[r||"push"]([t,n,arguments]),u}}if(!o)throw n("nomod","Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.",r);var e=[],i=[],s=t("$injector","invoke"),u={_invokeQueue:e,_runBlocks:i,requires:o,name:r,provider:t("$provide","provider"),factory:t("$provide","factory"),service:t("$provide","service"),value:t("$provide","value"),constant:t("$provide","constant","unshift"),animation:t("$animateProvider","register"),filter:t("$filterProvider","register"),controller:t("$controllerProvider","register"),directive:t("$compileProvider","directive"),config:s,run:function(t){return i.push(t),this}};return a&&s(a),u})}})}function se(e){f(e,{bootstrap:Y,copy:R,extend:f,equals:q,element:br,forEach:o,injector:je,noop:$,bind:I,toJson:L,fromJson:H,identity:d,isUndefined:g,isDefined:m,isString:w,isFunction:S,isObject:y,isNumber:b,isElement:M,isArray:Nr,version:Rr,isDate:x,lowercase:dr,uppercase:gr,callbacks:{counter:0},$$minErr:r,$$csp:jr}),Sr=ae(t);try{Sr("ngLocale")}catch(n){Sr("ngLocale",[]).provider("$locale",nn)}Sr("ng",["ngLocale"],["$provide",function(t){t.provider({$$sanitizeUri:Nn}),t.provider("$compile",Ie).directive({a:Pi,input:Hi,textarea:Hi,form:_i,script:Eo,select:To,style:No,option:Mo,ngBind:eo,ngBindHtml:ro,ngBindTemplate:no,ngClass:io,ngClassEven:ao,ngClassOdd:oo,ngCloak:so,ngController:uo,ngForm:qi,ngHide:wo,ngIf:fo,ngInclude:ho,ngInit:$o,ngNonBindable:vo,ngPluralize:go,ngRepeat:mo,ngShow:yo,ngStyle:bo,ngSwitch:xo,ngSwitchWhen:So,ngSwitchDefault:Co,ngOptions:Oo,ngTransclude:ko,ngModel:Gi,ngList:Yi,ngChange:Xi,required:Ki,ngRequired:Ki,ngValue:to}).directive({ngInclude:po}).directive(ji).directive(co),t.provider({$anchorScroll:De,$animate:ri,$browser:qe,$cacheFactory:Ue,$controller:He,$document:Be,$exceptionHandler:ze,$filter:Ln,$interpolate:tn,$interval:en,$http:Xe,$httpBackend:Ye,$location:vn,$log:gn,$parse:En,$rootScope:Mn,$q:An,$sce:_n,$sceDelegate:Rn,$sniffer:qn,$templateCache:Ve,$timeout:Un,$window:Fn,$$rAF:Tn,$$asyncCallback:Re})}])}function ue(){return++qr}function ce(t){return t.replace(Ir,function(t,e,n,r){return r?n.toUpperCase():n}).replace(Fr,"Moz$1")}function le(t,e,n,r){function i(t){var i,a,s,u,c,l,f,h=n&&t?[this.filter(t)]:[this],p=e;if(!r||null!=t)for(;h.length;)for(i=h.shift(),a=0,s=i.length;s>a;a++)for(u=br(i[a]),p?u.triggerHandler("$destroy"):p=!p,c=0,l=(f=u.children()).length;l>c;c++)h.push(xr(f[c]));return o.apply(this,arguments)}var o=xr.fn[t];o=o.$original||o,i.$original=o,xr.fn[t]=i}function fe(t){return!Br.test(t)}function he(t,e){var n,r,i,o,a,s,u=e.createDocumentFragment(),c=[];if(fe(t))c.push(e.createTextNode(t));else{for(n=u.appendChild(e.createElement("div")),r=(zr.exec(t)||["",""])[1].toLowerCase(),i=Qr[r]||Qr._default,n.innerHTML="<div>&#160;</div>"+i[1]+t.replace(Wr,"<$1></$2>")+i[2],n.removeChild(n.firstChild),o=i[0];o--;)n=n.lastChild;for(a=0,s=n.childNodes.length;s>a;++a)c.push(n.childNodes[a]);n=u.firstChild,n.textContent=""}return u.textContent="",u.innerHTML="",c}function pe(t,n){n=n||e;var r;return(r=Hr.exec(t))?[n.createElement(r[1])]:he(t,n)}function $e(t){if(t instanceof $e)return t;if(w(t)&&(t=Pr(t)),!(this instanceof $e)){if(w(t)&&"<"!=t.charAt(0))throw Lr("nosel","Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");return new $e(t)}if(w(t)){Ce(this,pe(t));var n=br(e.createDocumentFragment());n.append(this)}else Ce(this,t)}function de(t){return t.cloneNode(!0)}function ve(t){me(t);for(var e=0,n=t.childNodes||[];e<n.length;e++)ve(n[e])}function ge(t,e,n,r){if(m(r))throw Lr("offargs","jqLite#off() does not support the `selector` argument");var i=ye(t,"events"),a=ye(t,"handle");a&&(g(e)?o(i,function(e,n){Vr(t,n,e),delete i[n]}):o(e.split(" "),function(e){g(n)?(Vr(t,e,i[e]),delete i[e]):D(i[e]||[],n)}))}function me(t,e){var r=t.ng339,i=_r[r];if(i){if(e)return void delete _r[r].data[e];i.handle&&(i.events.$destroy&&i.handle({},"$destroy"),ge(t)),delete _r[r],t.ng339=n}}function ye(t,e,n){var r=t.ng339,i=_r[r||-1];return m(n)?(i||(t.ng339=r=ue(),i=_r[r]={}),void(i[e]=n)):i&&i[e]}function we(t,e,n){var r=ye(t,"data"),i=m(n),o=!i&&m(e),a=o&&!y(e);if(r||a||ye(t,"data",r={}),i)r[e]=n;else{if(!o)return r;if(a)return r&&r[e];f(r,e)}}function be(t,e){return t.getAttribute?(" "+(t.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+e+" ")>-1:!1}function xe(t,e){e&&t.setAttribute&&o(e.split(" "),function(e){t.setAttribute("class",Pr((" "+(t.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+Pr(e)+" "," ")))})}function Se(t,e){if(e&&t.setAttribute){var n=(" "+(t.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");o(e.split(" "),function(t){t=Pr(t),-1===n.indexOf(" "+t+" ")&&(n+=t+" ")}),t.setAttribute("class",Pr(n))}}function Ce(t,e){if(e){e=e.nodeName||!m(e.length)||k(e)?[e]:e;for(var n=0;n<e.length;n++)t.push(e[n])}}function ke(t,e){return Ee(t,"$"+(e||"ngController")+"Controller")}function Ee(t,e,r){9==t.nodeType&&(t=t.documentElement);for(var i=Nr(e)?e:[e];t;){for(var o=0,a=i.length;a>o;o++)if((r=br.data(t,i[o]))!==n)return r;t=t.parentNode||11===t.nodeType&&t.host}}function Ae(t){for(var e=0,n=t.childNodes;e<n.length;e++)ve(n[e]);for(;t.firstChild;)t.removeChild(t.firstChild)}function Oe(t,e){var n=Gr[e.toLowerCase()];return n&&Xr[t.nodeName]&&n}function Te(t,n){var r=function(r,i){if(r.preventDefault||(r.preventDefault=function(){r.returnValue=!1}),r.stopPropagation||(r.stopPropagation=function(){r.cancelBubble=!0}),r.target||(r.target=r.srcElement||e),g(r.defaultPrevented)){var a=r.preventDefault;r.preventDefault=function(){r.defaultPrevented=!0,a.call(r)},r.defaultPrevented=!1}r.isDefaultPrevented=function(){return r.defaultPrevented||r.returnValue===!1};var s=_(n[i||r.type]||[]);o(s,function(e){e.call(t,r)}),8>=wr?(r.preventDefault=null,r.stopPropagation=null,r.isDefaultPrevented=null):(delete r.preventDefault,delete r.stopPropagation,delete r.isDefaultPrevented)};return r.elem=t,r}function Me(t,e){var r,i=typeof t;return"function"==i||"object"==i&&null!==t?"function"==typeof(r=t.$$hashKey)?r=t.$$hashKey():r===n&&(r=t.$$hashKey=(e||c)()):r=t,i+":"+r}function Ne(t,e){if(e){var n=0;this.nextUid=function(){return++n}}o(t,this.put,this)}function Pe(t){var e,n,r,i;return"function"==typeof t?(e=t.$inject)||(e=[],t.length&&(n=t.toString().replace(ti,""),r=n.match(Kr),o(r[1].split(Yr),function(t){t.replace(Zr,function(t,n,r){e.push(r)})})),t.$inject=e):Nr(t)?(i=t.length-1,ne(t[i],"fn"),e=t.slice(0,i)):ne(t,"fn",!0),e}function je(t){function e(t){return function(e,n){return y(e)?void o(e,u(t)):t(e,n)}}function n(t,e){if(re(t,"service"),(S(e)||Nr(e))&&(e=b.instantiate(e)),!e.$get)throw ei("pget","Provider '{0}' must define $get factory method.",t);return m[t+p]=e}function r(t,e){return n(t,{$get:e})}function i(t,e){return r(t,["$injector",function(t){return t.instantiate(e)}])}function a(t,e){return r(t,v(e))}function s(t,e){re(t,"constant"),m[t]=e,x[t]=e}function c(t,e){var n=b.get(t+p),r=n.$get;n.$get=function(){var t=C.invoke(r,n);return C.invoke(e,null,{$delegate:t})}}function l(t){var e,n,r,i,a=[];return o(t,function(t){if(!g.get(t)){g.put(t,!0);try{if(w(t))for(e=Sr(t),a=a.concat(l(e.requires)).concat(e._runBlocks),n=e._invokeQueue,r=0,i=n.length;i>r;r++){var o=n[r],s=b.get(o[0]);s[o[1]].apply(s,o[2])}else S(t)?a.push(b.invoke(t)):Nr(t)?a.push(b.invoke(t)):ne(t,"module")}catch(u){throw Nr(t)&&(t=t[t.length-1]),u.message&&u.stack&&-1==u.stack.indexOf(u.message)&&(u=u.message+"\n"+u.stack),ei("modulerr","Failed to instantiate module {0} due to:\n{1}",t,u.stack||u.message||u)}}}),a}function f(t,e){function n(n){if(t.hasOwnProperty(n)){if(t[n]===h)throw ei("cdep","Circular dependency found: {0}",n+" <- "+d.join(" <- "));return t[n]}try{return d.unshift(n),t[n]=h,t[n]=e(n)}catch(r){throw t[n]===h&&delete t[n],r}finally{d.shift()}}function r(t,e,r){var i,o,a,s=[],u=Pe(t);for(o=0,i=u.length;i>o;o++){if(a=u[o],"string"!=typeof a)throw ei("itkn","Incorrect injection token! Expected service name as string, got {0}",a);s.push(r&&r.hasOwnProperty(a)?r[a]:n(a))}return Nr(t)&&(t=t[i]),t.apply(e,s)}function i(t,e){var n,i,o=function(){};return o.prototype=(Nr(t)?t[t.length-1]:t).prototype,n=new o,i=r(t,n,e),y(i)||S(i)?i:n}return{invoke:r,instantiate:i,get:n,annotate:Pe,has:function(e){return m.hasOwnProperty(e+p)||t.hasOwnProperty(e)}}}var h={},p="Provider",d=[],g=new Ne([],!0),m={$provide:{provider:e(n),factory:e(r),service:e(i),value:e(a),constant:e(s),decorator:c}},b=m.$injector=f(m,function(){throw ei("unpr","Unknown provider: {0}",d.join(" <- "))}),x={},C=x.$injector=f(x,function(t){var e=b.get(t+p);return C.invoke(e.$get,e)});return o(l(t),function(t){C.invoke(t||$)}),C}function De(){var t=!0;this.disableAutoScrolling=function(){t=!1},this.$get=["$window","$location","$rootScope",function(e,n,r){function i(t){var e=null;return o(t,function(t){e||"a"!==dr(t.nodeName)||(e=t)}),e}function a(){var t,r=n.hash();r?(t=s.getElementById(r))?t.scrollIntoView():(t=i(s.getElementsByName(r)))?t.scrollIntoView():"top"===r&&e.scrollTo(0,0):e.scrollTo(0,0)}var s=e.document;return t&&r.$watch(function(){return n.hash()},function(){r.$evalAsync(a)}),a}]}function Re(){this.$get=["$$rAF","$timeout",function(t,e){return t.supported?function(e){return t(e)}:function(t){return e(t,0,!1)}}]}function _e(t,e,r,i){function a(t){try{t.apply(null,V(arguments,1))}finally{if(m--,0===m)for(;y.length;)try{y.pop()()}catch(e){r.error(e)}}}function s(t,e){!function n(){o(x,function(t){t()}),b=e(n,t)}()}function u(){S!=c.url()&&(S=c.url(),o(E,function(t){t(c.url())}))}var c=this,l=e[0],f=t.location,h=t.history,p=t.setTimeout,d=t.clearTimeout,v={};c.isMock=!1;var m=0,y=[];c.$$completeOutstandingRequest=a,c.$$incOutstandingRequestCount=function(){m++},c.notifyWhenNoOutstandingRequests=function(t){o(x,function(t){t()}),0===m?t():y.push(t)};var b,x=[];c.addPollFn=function(t){return g(b)&&s(100,p),x.push(t),t};var S=f.href,C=e.find("base"),k=null;c.url=function(e,n){if(f!==t.location&&(f=t.location),h!==t.history&&(h=t.history),e){if(S==e)return;var r=S&&un(S)===un(e);return S=e,!r&&i.history?n?h.replaceState(null,"",e):(h.pushState(null,"",e),C.attr("href",C.attr("href"))):(r||(k=e),n?f.replace(e):f.href=e),c}return k||f.href.replace(/%27/g,"'")};var E=[],A=!1;c.onUrlChange=function(e){return A||(i.history&&br(t).on("popstate",u),i.hashchange?br(t).on("hashchange",u):c.addPollFn(u),A=!0),E.push(e),e},c.$$checkUrlChange=u,c.baseHref=function(){var t=C.attr("href");return t?t.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var O={},T="",M=c.baseHref();c.cookies=function(t,e){var i,o,a,s,u;if(!t){if(l.cookie!==T)for(T=l.cookie,o=T.split("; "),O={},s=0;s<o.length;s++)a=o[s],u=a.indexOf("="),u>0&&(t=unescape(a.substring(0,u)),O[t]===n&&(O[t]=unescape(a.substring(u+1))));return O}e===n?l.cookie=escape(t)+"=;path="+M+";expires=Thu, 01 Jan 1970 00:00:00 GMT":w(e)&&(i=(l.cookie=escape(t)+"="+escape(e)+";path="+M).length+1,i>4096&&r.warn("Cookie '"+t+"' possibly not set or overflowed because it was too large ("+i+" > 4096 bytes)!"))},c.defer=function(t,e){var n;return m++,n=p(function(){delete v[n],a(t)},e||0),v[n]=!0,n},c.defer.cancel=function(t){return v[t]?(delete v[t],d(t),a($),!0):!1}}function qe(){this.$get=["$window","$log","$sniffer","$document",function(t,e,n,r){return new _e(t,r,e,n)}]}function Ue(){this.$get=function(){function t(t,n){function i(t){t!=h&&(p?p==t&&(p=t.n):p=t,o(t.n,t.p),o(t,h),h=t,h.n=null)}function o(t,e){t!=e&&(t&&(t.p=e),e&&(e.n=t))}if(t in e)throw r("$cacheFactory")("iid","CacheId '{0}' is already taken!",t);var a=0,s=f({},n,{id:t}),u={},c=n&&n.capacity||Number.MAX_VALUE,l={},h=null,p=null;return e[t]={put:function(t,e){if(c<Number.MAX_VALUE){var n=l[t]||(l[t]={key:t});i(n)}if(!g(e))return t in u||a++,u[t]=e,a>c&&this.remove(p.key),e},get:function(t){if(c<Number.MAX_VALUE){var e=l[t];if(!e)return;i(e)}return u[t]},remove:function(t){if(c<Number.MAX_VALUE){var e=l[t];if(!e)return;e==h&&(h=e.p),e==p&&(p=e.n),o(e.n,e.p),delete l[t]}delete u[t],a--},removeAll:function(){u={},a=0,l={},h=p=null},destroy:function(){u=null,s=null,l=null,delete e[t]},info:function(){return f({},s,{size:a})}}}var e={};return t.info=function(){var t={};return o(e,function(e,n){t[n]=e.info()}),t},t.get=function(t){return e[t]},t}}function Ve(){this.$get=["$cacheFactory",function(t){return t("templates")}]}function Ie(t,r){var i={},a="Directive",s=/^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/,c=/(([\d\w_\-]+)(?:\:([^;]+))?;?)/,l=/^(on[a-z]+|formaction)$/;this.directive=function h(e,n){return re(e,"directive"),w(e)?(ee(n,"directiveFactory"),i.hasOwnProperty(e)||(i[e]=[],t.factory(e+a,["$injector","$exceptionHandler",function(t,n){var r=[];return o(i[e],function(i,o){try{var a=t.invoke(i);S(a)?a={compile:v(a)}:!a.compile&&a.link&&(a.compile=v(a.link)),a.priority=a.priority||0,a.index=o,a.name=a.name||e,a.require=a.require||a.controller&&a.name,a.restrict=a.restrict||"A",r.push(a)}catch(s){n(s)}}),r}])),i[e].push(n)):o(e,u(h)),this},this.aHrefSanitizationWhitelist=function(t){return m(t)?(r.aHrefSanitizationWhitelist(t),this):r.aHrefSanitizationWhitelist()},this.imgSrcSanitizationWhitelist=function(t){return m(t)?(r.imgSrcSanitizationWhitelist(t),this):r.imgSrcSanitizationWhitelist()},this.$get=["$injector","$interpolate","$exceptionHandler","$http","$templateCache","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(t,r,u,h,$,v,g,m,b,x,C,k){function E(t,e,n,r,i){t instanceof br||(t=br(t)),o(t,function(e,n){3==e.nodeType&&e.nodeValue.match(/\S+/)&&(t[n]=e=br(e).wrap("<span></span>").parent()[0])});var a=O(t,e,t,n,r,i);return A(t,"ng-scope"),function(e,n,r,i){ee(e,"scope");var s=n?Jr.clone.call(t):t;o(r,function(t,e){s.data("$"+e+"Controller",t)});for(var u=0,c=s.length;c>u;u++){var l=s[u],f=l.nodeType;(1===f||9===f)&&s.eq(u).data("$scope",e)}return n&&n(s,e),a&&a(e,s,s,i),s}}function A(t,e){try{t.addClass(e)}catch(n){}}function O(t,e,r,i,o,a){function s(t,r,i,o){var a,s,u,c,l,f,h,p,d=r.length,v=new Array(d);for(l=0;d>l;l++)v[l]=r[l];for(l=0,h=0,f=$.length;f>l;h++)u=v[h],a=$[l++],s=$[l++],a?(a.scope?(c=t.$new(),br.data(u,"$scope",c)):c=t,p=a.transcludeOnThisElement?T(t,a.transclude,o):!a.templateOnThisElement&&o?o:!o&&e?T(t,e):null,a(s,c,u,i,p)):s&&s(t,u.childNodes,n,o)}for(var u,c,l,f,h,p,$=[],d=0;d<t.length;d++)u=new G,c=M(t[d],[],u,0===d?i:n,o),l=c.length?j(c,t[d],u,e,r,null,[],[],a):null,l&&l.scope&&A(u.$$element,"ng-scope"),h=l&&l.terminal||!(f=t[d].childNodes)||!f.length?null:O(f,l?(l.transcludeOnThisElement||!l.templateOnThisElement)&&l.transclude:e),$.push(l,h),p=p||l||h,a=null;return p?s:null}function T(t,e,n){var r=function(r,i,o){var a=!1;r||(r=t.$new(),r.$$transcluded=!0,a=!0);var s=e(r,i,o,n);return a&&s.on("$destroy",function(){r.$destroy()}),s};return r}function M(t,e,n,r,i){var o,a,u=t.nodeType,l=n.$attr;switch(u){case 1:R(e,Fe(Cr(t).toLowerCase()),"E",r,i);for(var f,h,p,$,d,v,g=t.attributes,m=0,y=g&&g.length;y>m;m++){var b=!1,x=!1;if(f=g[m],!wr||wr>=8||f.specified){h=f.name,d=Pr(f.value),$=Fe(h),(v=te.test($))&&(h=Z($.substr(6),"-"));var S=$.replace(/(Start|End)$/,"");$===S+"Start"&&(b=h,x=h.substr(0,h.length-5)+"end",h=h.substr(0,h.length-6)),p=Fe(h.toLowerCase()),l[p]=h,(v||!n.hasOwnProperty(p))&&(n[p]=d,Oe(t,p)&&(n[p]=!0)),W(t,e,d,p),R(e,p,"A",r,i,b,x)}}if(a=t.className,w(a)&&""!==a)for(;o=c.exec(a);)p=Fe(o[2]),R(e,p,"C",r,i)&&(n[p]=Pr(o[3])),a=a.substr(o.index+o[0].length);break;case 3:H(e,t.nodeValue);break;case 8:try{o=s.exec(t.nodeValue),o&&(p=Fe(o[1]),R(e,p,"M",r,i)&&(n[p]=Pr(o[2])))}catch(C){}}return e.sort(F),e}function N(t,e,n){var r=[],i=0;if(e&&t.hasAttribute&&t.hasAttribute(e)){do{if(!t)throw ii("uterdir","Unterminated attribute, found '{0}' but no matching '{1}' found.",e,n);1==t.nodeType&&(t.hasAttribute(e)&&i++,t.hasAttribute(n)&&i--),r.push(t),t=t.nextSibling}while(i>0)}else r.push(t);return br(r)}function P(t,e,n){return function(r,i,o,a,s){return i=N(i[0],e,n),t(r,i,o,a,s)}}function j(t,i,a,s,c,l,f,h,p){function $(t,e,n,r){t&&(n&&(t=P(t,n,r)),t.require=x.require,t.directiveName=C,(F===x||x.$$isolateScope)&&(t=J(t,{isolateScope:!0})),f.push(t)),e&&(n&&(e=P(e,n,r)),e.require=x.require,e.directiveName=C,(F===x||x.$$isolateScope)&&(e=J(e,{isolateScope:!0})),h.push(e))}function d(t,e,n,r){var i,a="data",s=!1;if(w(e)){for(;"^"==(i=e.charAt(0))||"?"==i;)e=e.substr(1),"^"==i&&(a="inheritedData"),s=s||"?"==i;if(i=null,r&&"data"===a&&(i=r[e]),i=i||n[a]("$"+e+"Controller"),!i&&!s)throw ii("ctreq","Controller '{0}', required by directive '{1}', can't be found!",e,t);return i}return Nr(e)&&(i=[],o(e,function(e){i.push(d(t,e,n,r))})),i}function m(t,e,s,c,l){function p(t,e){var r;return arguments.length<2&&(e=t,t=n),K&&(r=k),l(t,e,r)}var $,m,y,w,b,x,S,C,k={};if($=i===s?a:_(a,new G(br(s),a.$attr)),m=$.$$element,F){var E=/^\s*([@=&])(\??)\s*(\w*)\s*$/;S=e.$new(!0),!H||H!==F&&H!==F.$$originalDirective?m.data("$isolateScopeNoTemplate",S):m.data("$isolateScope",S),A(m,"ng-isolate-scope"),o(F.scope,function(t,n){var i,o,a,s,u=t.match(E)||[],c=u[3]||n,l="?"==u[2],f=u[1];switch(S.$$isolateBindings[n]=f+c,f){case"@":$.$observe(c,function(t){S[n]=t}),$.$$observers[c].$$scope=e,$[c]&&(S[n]=r($[c])(e));break;case"=":if(l&&!$[c])return;o=v($[c]),s=o.literal?q:function(t,e){return t===e||t!==t&&e!==e},a=o.assign||function(){throw i=S[n]=o(e),ii("nonassign","Expression '{0}' used with directive '{1}' is non-assignable!",$[c],F.name)},i=S[n]=o(e),S.$watch(function(){var t=o(e);return s(t,S[n])||(s(t,i)?a(e,t=S[n]):S[n]=t),i=t},null,o.literal);break;case"&":o=v($[c]),S[n]=function(t){return o(e,t)};break;default:throw ii("iscp","Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}",F.name,n,t)}})}for(C=l&&p,R&&o(R,function(t){var n,r={$scope:t===F||t.$$isolateScope?S:e,$element:m,$attrs:$,$transclude:C};x=t.controller,"@"==x&&(x=$[t.name]),n=g(x,r),k[t.name]=n,K||m.data("$"+t.name+"Controller",n),t.controllerAs&&(r.$scope[t.controllerAs]=n)}),y=0,w=f.length;w>y;y++)try{b=f[y],b(b.isolateScope?S:e,m,$,b.require&&d(b.directiveName,b.require,m,k),C)}catch(O){u(O,z(m))}var T=e;for(F&&(F.template||null===F.templateUrl)&&(T=S),t&&t(T,s.childNodes,n,l),y=h.length-1;y>=0;y--)try{b=h[y],b(b.isolateScope?S:e,m,$,b.require&&d(b.directiveName,b.require,m,k),C)}catch(O){u(O,z(m))}}p=p||{};for(var b,x,C,k,O,T,j=-Number.MAX_VALUE,R=p.controllerDirectives,F=p.newIsolateScopeDirective,H=p.templateDirective,B=p.nonTlbTranscludeDirective,W=!1,X=!1,K=p.hasElementTranscludeDirective,Z=a.$$element=br(i),te=l,ee=s,ne=0,re=t.length;re>ne;ne++){x=t[ne];var ie=x.$$start,oe=x.$$end;if(ie&&(Z=N(i,ie,oe)),k=n,j>x.priority)break;if((T=x.scope)&&(b=b||x,x.templateUrl||(L("new/isolated scope",F,x,Z),y(T)&&(F=x))),C=x.name,!x.templateUrl&&x.controller&&(T=x.controller,R=R||{},L("'"+C+"' controller",R[C],x,Z),R[C]=x),(T=x.transclude)&&(W=!0,x.$$tlb||(L("transclusion",B,x,Z),B=x),"element"==T?(K=!0,j=x.priority,k=Z,Z=a.$$element=br(e.createComment(" "+C+": "+a[C]+" ")),i=Z[0],Q(c,V(k),i),ee=E(k,s,j,te&&te.name,{nonTlbTranscludeDirective:B})):(k=br(de(i)).contents(),Z.empty(),ee=E(k,s))),x.template)if(X=!0,L("template",H,x,Z),H=x,T=S(x.template)?x.template(Z,a):x.template,T=Y(T),x.replace){if(te=x,k=fe(T)?[]:br(Pr(T)),i=k[0],1!=k.length||1!==i.nodeType)throw ii("tplrt","Template for directive '{0}' must have exactly one root element. {1}",C,"");Q(c,Z,i);var ae={$attr:{}},se=M(i,[],ae),ue=t.splice(ne+1,t.length-(ne+1));F&&D(se),t=t.concat(se).concat(ue),U(a,ae),re=t.length}else Z.html(T);if(x.templateUrl)X=!0,L("template",H,x,Z),H=x,x.replace&&(te=x),m=I(t.splice(ne,t.length-ne),Z,a,c,W&&ee,f,h,{controllerDirectives:R,newIsolateScopeDirective:F,templateDirective:H,nonTlbTranscludeDirective:B}),re=t.length;else if(x.compile)try{O=x.compile(Z,a,ee),S(O)?$(null,O,ie,oe):O&&$(O.pre,O.post,ie,oe)}catch(ce){u(ce,z(Z))}x.terminal&&(m.terminal=!0,j=Math.max(j,x.priority))}return m.scope=b&&b.scope===!0,m.transcludeOnThisElement=W,m.templateOnThisElement=X,m.transclude=ee,p.hasElementTranscludeDirective=K,m}function D(t){for(var e=0,n=t.length;n>e;e++)t[e]=p(t[e],{$$isolateScope:!0})}function R(e,r,o,s,c,l,f){if(r===c)return null;var h=null;if(i.hasOwnProperty(r))for(var $,d=t.get(r+a),v=0,g=d.length;g>v;v++)try{$=d[v],(s===n||s>$.priority)&&-1!=$.restrict.indexOf(o)&&(l&&($=p($,{$$start:l,$$end:f})),e.push($),h=$)}catch(m){u(m)}return h}function U(t,e){var n=e.$attr,r=t.$attr,i=t.$$element;o(t,function(r,i){"$"!=i.charAt(0)&&(e[i]&&e[i]!==r&&(r+=("style"===i?";":" ")+e[i]),t.$set(i,r,!0,n[i]))}),o(e,function(e,o){"class"==o?(A(i,e),t["class"]=(t["class"]?t["class"]+" ":"")+e):"style"==o?(i.attr("style",i.attr("style")+";"+e),t.style=(t.style?t.style+";":"")+e):"$"==o.charAt(0)||t.hasOwnProperty(o)||(t[o]=e,r[o]=n[o])})}function I(t,e,n,r,i,a,s,u){var c,l,p=[],d=e[0],v=t.shift(),g=f({},v,{templateUrl:null,transclude:null,replace:null,$$originalDirective:v}),m=S(v.templateUrl)?v.templateUrl(e,n):v.templateUrl;return e.empty(),h.get(x.getTrustedResourceUrl(m),{cache:$}).success(function(f){var h,$,w,b;if(f=Y(f),v.replace){if(w=fe(f)?[]:br(Pr(f)),h=w[0],1!=w.length||1!==h.nodeType)throw ii("tplrt","Template for directive '{0}' must have exactly one root element. {1}",v.name,m);$={$attr:{}},Q(r,e,h);var x=M(h,[],$);y(v.scope)&&D(x),t=x.concat(t),U(n,$)}else h=d,e.html(f);for(t.unshift(g),c=j(t,h,n,i,e,v,a,s,u),o(r,function(t,n){t==h&&(r[n]=e[0])}),l=O(e[0].childNodes,i);p.length;){var S=p.shift(),C=p.shift(),k=p.shift(),E=p.shift(),N=e[0];if(C!==d){var P=C.className;u.hasElementTranscludeDirective&&v.replace||(N=de(h)),Q(k,br(C),N),A(br(N),P)}b=c.transcludeOnThisElement?T(S,c.transclude,E):E,c(l,S,N,r,b)}p=null}).error(function(t,e,n,r){throw ii("tpload","Failed to load template: {0}",r.url)}),function(t,e,n,r,i){var o=i;p?(p.push(e),p.push(n),p.push(r),p.push(o)):(c.transcludeOnThisElement&&(o=T(e,c.transclude,i)),c(l,e,n,r,o))}}function F(t,e){var n=e.priority-t.priority;return 0!==n?n:t.name!==e.name?t.name<e.name?-1:1:t.index-e.index}function L(t,e,n,r){if(e)throw ii("multidir","Multiple directives [{0}, {1}] asking for {2} on: {3}",e.name,n.name,t,z(r))}function H(t,e){var n=r(e,!0);n&&t.push({priority:0,compile:function(t){var e=t.parent(),r=e.length;return r&&A(t.parent(),"ng-binding"),function(t,e){var i=e.parent(),o=i.data("$binding")||[];o.push(n),i.data("$binding",o),r||A(i,"ng-binding"),t.$watch(n,function(t){e[0].nodeValue=t})}}})}function B(t,e){if("srcdoc"==e)return x.HTML;var n=Cr(t);return"xlinkHref"==e||"FORM"==n&&"action"==e||"IMG"!=n&&("src"==e||"ngSrc"==e)?x.RESOURCE_URL:void 0}function W(t,e,n,i){var o=r(n,!0);if(o){if("multiple"===i&&"SELECT"===Cr(t))throw ii("selmulti","Binding to the 'multiple' attribute is not supported. Element: {0}",z(t));e.push({priority:100,compile:function(){return{pre:function(e,n,a){var s=a.$$observers||(a.$$observers={});if(l.test(i))throw ii("nodomevents","Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");o=r(a[i],!0,B(t,i)),o&&(a[i]=o(e),(s[i]||(s[i]=[])).$$inter=!0,(a.$$observers&&a.$$observers[i].$$scope||e).$watch(o,function(t,e){"class"===i&&t!=e?a.$updateClass(t,e):a.$set(i,t)}))}}}})}}function Q(t,n,r){var i,o,a=n[0],s=n.length,u=a.parentNode;if(t)for(i=0,o=t.length;o>i;i++)if(t[i]==a){t[i++]=r;
for(var c=i,l=c+s-1,f=t.length;f>c;c++,l++)f>l?t[c]=t[l]:delete t[c];t.length-=s-1;break}u&&u.replaceChild(r,a);var h=e.createDocumentFragment();h.appendChild(a),r[br.expando]=a[br.expando];for(var p=1,$=n.length;$>p;p++){var d=n[p];br(d).remove(),h.appendChild(d),delete n[p]}n[0]=r,n.length=1}function J(t,e){return f(function(){return t.apply(null,arguments)},t,e)}var G=function(t,e){this.$$element=t,this.$attr=e||{}};G.prototype={$normalize:Fe,$addClass:function(t){t&&t.length>0&&C.addClass(this.$$element,t)},$removeClass:function(t){t&&t.length>0&&C.removeClass(this.$$element,t)},$updateClass:function(t,e){var n=Le(t,e),r=Le(e,t);0===n.length?C.removeClass(this.$$element,r):0===r.length?C.addClass(this.$$element,n):C.setClass(this.$$element,n,r)},$set:function(t,e,r,i){var a,s=Oe(this.$$element[0],t);s&&(this.$$element.prop(t,e),i=s),this[t]=e,i?this.$attr[t]=i:(i=this.$attr[t],i||(this.$attr[t]=i=Z(t,"-"))),a=Cr(this.$$element),("A"===a&&"href"===t||"IMG"===a&&"src"===t)&&(this[t]=e=k(e,"src"===t)),r!==!1&&(null===e||e===n?this.$$element.removeAttr(i):this.$$element.attr(i,e));var c=this.$$observers;c&&o(c[t],function(t){try{t(e)}catch(n){u(n)}})},$observe:function(t,e){var n=this,r=n.$$observers||(n.$$observers={}),i=r[t]||(r[t]=[]);return i.push(e),m.$evalAsync(function(){i.$$inter||e(n[t])}),e}};var X=r.startSymbol(),K=r.endSymbol(),Y="{{"==X||"}}"==K?d:function(t){return t.replace(/\{\{/g,X).replace(/}}/g,K)},te=/^ngAttr[A-Z]/;return E}]}function Fe(t){return ce(t.replace(oi,""))}function Le(t,e){var n="",r=t.split(/\s+/),i=e.split(/\s+/);t:for(var o=0;o<r.length;o++){for(var a=r[o],s=0;s<i.length;s++)if(a==i[s])continue t;n+=(n.length>0?" ":"")+a}return n}function He(){var t={},e=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(e,n){re(e,"controller"),y(e)?f(t,e):t[e]=n},this.$get=["$injector","$window",function(n,i){return function(o,a){var s,u,c,l;if(w(o)&&(u=o.match(e),c=u[1],l=u[3],o=t.hasOwnProperty(c)?t[c]:ie(a.$scope,c,!0)||ie(i,c,!0),ne(o,c,!0)),s=n.instantiate(o,a),l){if(!a||"object"!=typeof a.$scope)throw r("$controller")("noscp","Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.",c||o.name,l);a.$scope[l]=s}return s}}]}function Be(){this.$get=["$window",function(t){return br(t.document)}]}function ze(){this.$get=["$log",function(t){return function(){t.error.apply(t,arguments)}}]}function We(t){var e,n,r,i={};return t?(o(t.split("\n"),function(t){r=t.indexOf(":"),e=dr(Pr(t.substr(0,r))),n=Pr(t.substr(r+1)),e&&(i[e]=i[e]?i[e]+", "+n:n)}),i):i}function Qe(t){var e=y(t)?t:n;return function(n){return e||(e=We(t)),n?e[dr(n)]||null:e}}function Je(t,e,n){return S(n)?n(t,e):(o(n,function(n){t=n(t,e)}),t)}function Ge(t){return t>=200&&300>t}function Xe(){var t=/^\s*(\[|\{[^\{])/,e=/[\}\]]\s*$/,r=/^\)\]\}',?\n/,i={"Content-Type":"application/json;charset=utf-8"},a=this.defaults={transformResponse:[function(n){return w(n)&&(n=n.replace(r,""),t.test(n)&&e.test(n)&&(n=H(n))),n}],transformRequest:[function(t){return!y(t)||A(t)||O(t)?t:L(t)}],headers:{common:{Accept:"application/json, text/plain, */*"},post:_(i),put:_(i),patch:_(i)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},u=this.interceptors=[],c=this.responseInterceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(t,e,r,i,l,h){function p(t){function e(t){var e=f({},t,{data:Je(t.data,t.headers,i.transformResponse)});return Ge(t.status)?e:l.reject(e)}function r(t){function e(t){var e;o(t,function(n,r){S(n)&&(e=n(),null!=e?t[r]=e:delete t[r])})}var n,r,i,s=a.headers,u=f({},t.headers);s=f({},s.common,s[dr(t.method)]);t:for(n in s){r=dr(n);for(i in u)if(dr(i)===r)continue t;u[n]=s[n]}return e(u),u}var i={method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse},s=r(t);f(i,t),i.headers=s,i.method=gr(i.method);var u=function(t){s=t.headers;var n=Je(t.data,Qe(s),t.transformRequest);return g(n)&&o(s,function(t,e){"content-type"===dr(e)&&delete s[e]}),g(t.withCredentials)&&!g(a.withCredentials)&&(t.withCredentials=a.withCredentials),v(t,n,s).then(e,e)},c=[u,n],h=l.when(i);for(o(k,function(t){(t.request||t.requestError)&&c.unshift(t.request,t.requestError),(t.response||t.responseError)&&c.push(t.response,t.responseError)});c.length;){var p=c.shift(),$=c.shift();h=h.then(p,$)}return h.success=function(t){return h.then(function(e){t(e.data,e.status,e.headers,i)}),h},h.error=function(t){return h.then(null,function(e){t(e.data,e.status,e.headers,i)}),h},h}function $(){o(arguments,function(t){p[t]=function(e,n){return p(f(n||{},{method:t,url:e}))}})}function d(){o(arguments,function(t){p[t]=function(e,n,r){return p(f(r||{},{method:t,url:e,data:n}))}})}function v(r,o,s){function u(t,e,n,r){h&&(Ge(t)?h.put(w,[t,e,We(n),r]):h.remove(w)),c(e,t,n,r),i.$$phase||i.$apply()}function c(t,e,n,i){e=Math.max(e,0),(Ge(e)?d.resolve:d.reject)({data:t,status:e,headers:Qe(n),config:r,statusText:i})}function f(){var t=j(p.pendingRequests,r);-1!==t&&p.pendingRequests.splice(t,1)}var h,$,d=l.defer(),v=d.promise,w=b(r.url,r.params);if(p.pendingRequests.push(r),v.then(f,f),!r.cache&&!a.cache||r.cache===!1||"GET"!==r.method&&"JSONP"!==r.method||(h=y(r.cache)?r.cache:y(a.cache)?a.cache:C),h)if($=h.get(w),m($)){if(T($))return $.then(f,f),$;Nr($)?c($[1],$[0],_($[2]),$[3]):c($,200,{},"OK")}else h.put(w,v);if(g($)){var x=In(r.url)?e.cookies()[r.xsrfCookieName||a.xsrfCookieName]:n;x&&(s[r.xsrfHeaderName||a.xsrfHeaderName]=x),t(r.method,w,o,u,s,r.timeout,r.withCredentials,r.responseType)}return v}function b(t,e){if(!e)return t;var n=[];return s(e,function(t,e){null===t||g(t)||(Nr(t)||(t=[t]),o(t,function(t){y(t)&&(t=x(t)?t.toISOString():L(t)),n.push(X(e)+"="+X(t))}))}),n.length>0&&(t+=(-1==t.indexOf("?")?"?":"&")+n.join("&")),t}var C=r("$http"),k=[];return o(u,function(t){k.unshift(w(t)?h.get(t):h.invoke(t))}),o(c,function(t,e){var n=w(t)?h.get(t):h.invoke(t);k.splice(e,0,{response:function(t){return n(l.when(t))},responseError:function(t){return n(l.reject(t))}})}),p.pendingRequests=[],$("get","delete","head","jsonp"),d("post","put","patch"),p.defaults=a,p}]}function Ke(e){if(8>=wr&&(!e.match(/^(get|post|head|put|delete|options)$/i)||!t.XMLHttpRequest))return new t.ActiveXObject("Microsoft.XMLHTTP");if(t.XMLHttpRequest)return new t.XMLHttpRequest;throw r("$httpBackend")("noxhr","This browser does not support XMLHttpRequest.")}function Ye(){this.$get=["$browser","$window","$document",function(t,e,n){return Ze(t,Ke,t.defer,e.angular.callbacks,n[0])}]}function Ze(t,e,n,r,i){function a(t,e,n){var o=i.createElement("script"),a=null;return o.type="text/javascript",o.src=t,o.async=!0,a=function(t){Vr(o,"load",a),Vr(o,"error",a),i.body.removeChild(o),o=null;var s=-1,u="unknown";t&&("load"!==t.type||r[e].called||(t={type:"error"}),u=t.type,s="error"===t.type?404:200),n&&n(s,u)},Ur(o,"load",a),Ur(o,"error",a),8>=wr&&(o.onreadystatechange=function(){w(o.readyState)&&/loaded|complete/.test(o.readyState)&&(o.onreadystatechange=null,a({type:"load"}))}),i.body.appendChild(o),a}var s=-1;return function(i,u,c,l,f,h,p,d){function v(){y=s,b&&b(),x&&x.abort()}function g(e,r,i,o,a){C&&n.cancel(C),b=x=null,0===r&&(r=i?200:"file"==Vn(u).protocol?404:0),r=1223===r?204:r,a=a||"",e(r,i,o,a),t.$$completeOutstandingRequest($)}var y;if(t.$$incOutstandingRequestCount(),u=u||t.url(),"jsonp"==dr(i)){var w="_"+(r.counter++).toString(36);r[w]=function(t){r[w].data=t,r[w].called=!0};var b=a(u.replace("JSON_CALLBACK","angular.callbacks."+w),w,function(t,e){g(l,t,r[w].data,"",e),r[w]=$})}else{var x=e(i);if(x.open(i,u,!0),o(f,function(t,e){m(t)&&x.setRequestHeader(e,t)}),x.onreadystatechange=function(){if(x&&4==x.readyState){var t=null,e=null,n="";y!==s&&(t=x.getAllResponseHeaders(),e="response"in x?x.response:x.responseText),y===s&&10>wr||(n=x.statusText),g(l,y||x.status,e,t,n)}},p&&(x.withCredentials=!0),d)try{x.responseType=d}catch(S){if("json"!==d)throw S}x.send(c||null)}if(h>0)var C=n(v,h);else T(h)&&h.then(v)}}function tn(){var t="{{",e="}}";this.startSymbol=function(e){return e?(t=e,this):t},this.endSymbol=function(t){return t?(e=t,this):e},this.$get=["$parse","$exceptionHandler","$sce",function(n,r,i){function o(o,u,c){for(var l,f,h,p,$=0,d=[],v=o.length,g=!1,m=[];v>$;)-1!=(l=o.indexOf(t,$))&&-1!=(f=o.indexOf(e,l+a))?($!=l&&d.push(o.substring($,l)),d.push(h=n(p=o.substring(l+a,f))),h.exp=p,$=f+s,g=!0):($!=v&&d.push(o.substring($)),$=v);if((v=d.length)||(d.push(""),v=1),c&&d.length>1)throw ai("noconcat","Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce",o);return!u||g?(m.length=v,h=function(t){try{for(var e,n=0,a=v;a>n;n++){if("function"==typeof(e=d[n]))if(e=e(t),e=c?i.getTrusted(c,e):i.valueOf(e),null==e)e="";else switch(typeof e){case"string":break;case"number":e=""+e;break;default:e=L(e)}m[n]=e}return m.join("")}catch(s){var u=ai("interr","Can't interpolate: {0}\n{1}",o,s.toString());r(u)}},h.exp=o,h.parts=d,h):void 0}var a=t.length,s=e.length;return o.startSymbol=function(){return t},o.endSymbol=function(){return e},o}]}function en(){this.$get=["$rootScope","$window","$q",function(t,e,n){function r(r,o,a,s){var u=e.setInterval,c=e.clearInterval,l=n.defer(),f=l.promise,h=0,p=m(s)&&!s;return a=m(a)?a:0,f.then(null,null,r),f.$$intervalId=u(function(){l.notify(h++),a>0&&h>=a&&(l.resolve(h),c(f.$$intervalId),delete i[f.$$intervalId]),p||t.$apply()},o),i[f.$$intervalId]=l,f}var i={};return r.cancel=function(t){return t&&t.$$intervalId in i?(i[t.$$intervalId].reject("canceled"),e.clearInterval(t.$$intervalId),delete i[t.$$intervalId],!0):!1},r}]}function nn(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"¤",posSuf:"",negPre:"(¤",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),SHORTMONTH:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),DAY:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),SHORTDAY:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(t){return 1===t?"one":"other"}}}}function rn(t){for(var e=t.split("/"),n=e.length;n--;)e[n]=G(e[n]);return e.join("/")}function on(t,e,n){var r=Vn(t,n);e.$$protocol=r.protocol,e.$$host=r.hostname,e.$$port=h(r.port)||ui[r.protocol]||null}function an(t,e,n){var r="/"!==t.charAt(0);r&&(t="/"+t);var i=Vn(t,n);e.$$path=decodeURIComponent(r&&"/"===i.pathname.charAt(0)?i.pathname.substring(1):i.pathname),e.$$search=Q(i.search),e.$$hash=decodeURIComponent(i.hash),e.$$path&&"/"!=e.$$path.charAt(0)&&(e.$$path="/"+e.$$path)}function sn(t,e){return 0===e.indexOf(t)?e.substr(t.length):void 0}function un(t){var e=t.indexOf("#");return-1==e?t:t.substr(0,e)}function cn(t){return t.substr(0,un(t).lastIndexOf("/")+1)}function ln(t){return t.substring(0,t.indexOf("/",t.indexOf("//")+2))}function fn(t,e){this.$$html5=!0,e=e||"";var r=cn(t);on(t,this,t),this.$$parse=function(e){var n=sn(r,e);if(!w(n))throw ci("ipthprfx",'Invalid url "{0}", missing path prefix "{1}".',e,r);an(n,this,t),this.$$path||(this.$$path="/"),this.$$compose()},this.$$compose=function(){var t=J(this.$$search),e=this.$$hash?"#"+G(this.$$hash):"";this.$$url=rn(this.$$path)+(t?"?"+t:"")+e,this.$$absUrl=r+this.$$url.substr(1)},this.$$parseLinkUrl=function(i){var o,a,s;return(o=sn(t,i))!==n?(a=o,s=(o=sn(e,o))!==n?r+(sn("/",o)||o):t+a):(o=sn(r,i))!==n?s=r+o:r==i+"/"&&(s=r),s&&this.$$parse(s),!!s}}function hn(t,e){var n=cn(t);on(t,this,t),this.$$parse=function(r){function i(t,e,n){var r,i=/^\/[A-Z]:(\/.*)/;return 0===e.indexOf(n)&&(e=e.replace(n,"")),i.exec(e)?t:(r=i.exec(t),r?r[1]:t)}var o=sn(t,r)||sn(n,r),a="#"==o.charAt(0)?sn(e,o):this.$$html5?o:"";if(!w(a))throw ci("ihshprfx",'Invalid url "{0}", missing hash prefix "{1}".',r,e);an(a,this,t),this.$$path=i(this.$$path,a,t),this.$$compose()},this.$$compose=function(){var n=J(this.$$search),r=this.$$hash?"#"+G(this.$$hash):"";this.$$url=rn(this.$$path)+(n?"?"+n:"")+r,this.$$absUrl=t+(this.$$url?e+this.$$url:"")},this.$$parseLinkUrl=function(e){return un(t)==un(e)?(this.$$parse(e),!0):!1}}function pn(t,e){this.$$html5=!0,hn.apply(this,arguments);var n=cn(t);this.$$parseLinkUrl=function(r){var i,o;return t==un(r)?i=r:(o=sn(n,r))?i=t+e+o:n===r+"/"&&(i=n),i&&this.$$parse(i),!!i},this.$$compose=function(){var n=J(this.$$search),r=this.$$hash?"#"+G(this.$$hash):"";this.$$url=rn(this.$$path)+(n?"?"+n:"")+r,this.$$absUrl=t+e+this.$$url}}function $n(t){return function(){return this[t]}}function dn(t,e){return function(n){return g(n)?this[t]:(this[t]=e(n),this.$$compose(),this)}}function vn(){var e="",n=!1;this.hashPrefix=function(t){return m(t)?(e=t,this):e},this.html5Mode=function(t){return m(t)?(n=t,this):n},this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(r,i,o,a){function s(t){r.$broadcast("$locationChangeSuccess",u.absUrl(),t)}var u,c,l,f=i.baseHref(),h=i.url();n?(l=ln(h)+(f||"/"),c=o.history?fn:pn):(l=un(h),c=hn),u=new c(l,"#"+e),u.$$parseLinkUrl(h,h);var p=/^\s*(javascript|mailto):/i;a.on("click",function(e){if(!e.ctrlKey&&!e.metaKey&&2!=e.which){for(var n=br(e.target);"a"!==dr(n[0].nodeName);)if(n[0]===a[0]||!(n=n.parent())[0])return;var o=n.prop("href"),s=n.attr("href")||n.attr("xlink:href");y(o)&&"[object SVGAnimatedString]"===o.toString()&&(o=Vn(o.animVal).href),p.test(o)||!o||n.attr("target")||e.isDefaultPrevented()||u.$$parseLinkUrl(o,s)&&(e.preventDefault(),u.absUrl()!=i.url()&&(r.$apply(),t.angular["ff-684208-preventDefault"]=!0))}}),u.absUrl()!=h&&i.url(u.absUrl(),!0),i.onUrlChange(function(t){u.absUrl()!=t&&(r.$evalAsync(function(){var e=u.absUrl();u.$$parse(t),r.$broadcast("$locationChangeStart",t,e).defaultPrevented?(u.$$parse(e),i.url(e)):s(e)}),r.$$phase||r.$digest())});var $=0;return r.$watch(function(){var t=i.url(),e=u.$$replace;return $&&t==u.absUrl()||($++,r.$evalAsync(function(){r.$broadcast("$locationChangeStart",u.absUrl(),t).defaultPrevented?u.$$parse(t):(i.url(u.absUrl(),e),s(t))})),u.$$replace=!1,$}),u}]}function gn(){var t=!0,e=this;this.debugEnabled=function(e){return m(e)?(t=e,this):t},this.$get=["$window",function(n){function r(t){return t instanceof Error&&(t.stack?t=t.message&&-1===t.stack.indexOf(t.message)?"Error: "+t.message+"\n"+t.stack:t.stack:t.sourceURL&&(t=t.message+"\n"+t.sourceURL+":"+t.line)),t}function i(t){var e=n.console||{},i=e[t]||e.log||$,a=!1;try{a=!!i.apply}catch(s){}return a?function(){var t=[];return o(arguments,function(e){t.push(r(e))}),i.apply(e,t)}:function(t,e){i(t,null==e?"":e)}}return{log:i("log"),info:i("info"),warn:i("warn"),error:i("error"),debug:function(){var n=i("debug");return function(){t&&n.apply(e,arguments)}}()}}]}function mn(t,e){if("__defineGetter__"===t||"__defineSetter__"===t||"__lookupGetter__"===t||"__lookupSetter__"===t||"__proto__"===t)throw fi("isecfld","Attempting to access a disallowed field in Angular expressions! Expression: {0}",e);return t}function yn(t,e){if(t){if(t.constructor===t)throw fi("isecfn","Referencing Function in Angular expressions is disallowed! Expression: {0}",e);if(t.document&&t.location&&t.alert&&t.setInterval)throw fi("isecwindow","Referencing the Window in Angular expressions is disallowed! Expression: {0}",e);if(t.children&&(t.nodeName||t.prop&&t.attr&&t.find))throw fi("isecdom","Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}",e);if(t===Object)throw fi("isecobj","Referencing Object in Angular expressions is disallowed! Expression: {0}",e)}return t}function wn(t,e){if(t){if(t.constructor===t)throw fi("isecfn","Referencing Function in Angular expressions is disallowed! Expression: {0}",e);if(t===pi||t===$i||di&&t===di)throw fi("isecff","Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}",e)}}function bn(t,e,r,i,o){yn(t,i),o=o||{};for(var a,s=e.split("."),u=0;s.length>1;u++){a=mn(s.shift(),i);var c=yn(t[a],i);c||(c={},t[a]=c),t=c,t.then&&o.unwrapPromises&&(li(i),"$$v"in t||!function(t){t.then(function(e){t.$$v=e})}(t),t.$$v===n&&(t.$$v={}),t=t.$$v)}return a=mn(s.shift(),i),yn(t[a],i),t[a]=r,r}function xn(t){return"constructor"==t}function Sn(t,e,r,i,o,a,s){mn(t,a),mn(e,a),mn(r,a),mn(i,a),mn(o,a);var u=function(t){return yn(t,a)},c=s.expensiveChecks,l=c||xn(t)?u:d,f=c||xn(e)?u:d,h=c||xn(r)?u:d,p=c||xn(i)?u:d,$=c||xn(o)?u:d;return s.unwrapPromises?function(s,u){var c,d=u&&u.hasOwnProperty(t)?u:s;return null==d?d:(d=l(d[t]),d&&d.then&&(li(a),"$$v"in d||(c=d,c.$$v=n,c.then(function(t){c.$$v=l(t)})),d=l(d.$$v)),e?null==d?n:(d=f(d[e]),d&&d.then&&(li(a),"$$v"in d||(c=d,c.$$v=n,c.then(function(t){c.$$v=f(t)})),d=f(d.$$v)),r?null==d?n:(d=h(d[r]),d&&d.then&&(li(a),"$$v"in d||(c=d,c.$$v=n,c.then(function(t){c.$$v=h(t)})),d=h(d.$$v)),i?null==d?n:(d=p(d[i]),d&&d.then&&(li(a),"$$v"in d||(c=d,c.$$v=n,c.then(function(t){c.$$v=p(t)})),d=p(d.$$v)),o?null==d?n:(d=$(d[o]),d&&d.then&&(li(a),"$$v"in d||(c=d,c.$$v=n,c.then(function(t){c.$$v=$(t)})),d=$(d.$$v)),d):d):d):d):d)}:function(a,s){var u=s&&s.hasOwnProperty(t)?s:a;return null==u?u:(u=l(u[t]),e?null==u?n:(u=f(u[e]),r?null==u?n:(u=h(u[r]),i?null==u?n:(u=p(u[i]),o?null==u?n:u=$(u[o]):u):u):u):u)}}function Cn(t,e){return function(n,r){return t(n,r,li,yn,e)}}function kn(t,e,r){var i=e.expensiveChecks,a=i?bi:wi;if(a.hasOwnProperty(t))return a[t];var s,u=t.split("."),c=u.length;if(e.csp)s=6>c?Sn(u[0],u[1],u[2],u[3],u[4],r,e):function(t,i){var o,a=0;do o=Sn(u[a++],u[a++],u[a++],u[a++],u[a++],r,e)(t,i),i=n,t=o;while(c>a);return o};else{var l="var p;\n";i&&(l+="s = eso(s, fe);\nl = eso(l, fe);\n");var f=i;o(u,function(t,n){mn(t,r);var o=(n?"s":'((l&&l.hasOwnProperty("'+t+'"))?l:s)')+'["'+t+'"]',a=i||xn(t);a&&(o="eso("+o+", fe)",f=!0),l+="if(s == null) return undefined;\ns="+o+";\n",e.unwrapPromises&&(l+='if (s && s.then) {\n pw("'+r.replace(/(["\r\n])/g,"\\$1")+'");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v='+(a?"eso(v)":"v")+";});\n}\n s="+(a?"eso(s.$$v)":"s.$$v")+"\n}\n")}),l+="return s;";var h=new Function("s","l","pw","eso","fe",l);h.toString=v(l),(f||e.unwrapPromises)&&(h=Cn(h,r)),s=h}return"hasOwnProperty"!==t&&(a[t]=s),s}function En(){var t={},e={},n={csp:!1,unwrapPromises:!1,logPromiseWarnings:!0,expensiveChecks:!1};this.unwrapPromises=function(t){return m(t)?(n.unwrapPromises=!!t,this):n.unwrapPromises},this.logPromiseWarnings=function(t){return m(t)?(n.logPromiseWarnings=t,this):n.logPromiseWarnings},this.$get=["$filter","$sniffer","$log",function(r,i,o){n.csp=i.csp;var a={csp:n.csp,unwrapPromises:n.unwrapPromises,logPromiseWarnings:n.logPromiseWarnings,expensiveChecks:!0};return li=function(t){n.logPromiseWarnings&&!hi.hasOwnProperty(t)&&(hi[t]=!0,o.warn("[$parse] Promise found in the expression `"+t+"`. Automatic unwrapping of promises in Angular expressions is deprecated."))},function(i,o){var s;switch(typeof i){case"string":var u=o?e:t;if(u.hasOwnProperty(i))return u[i];var c=o?a:n,l=new mi(c),f=new yi(l,r,c);return s=f.parse(i),"hasOwnProperty"!==i&&(u[i]=s),s;case"function":return i;default:return $}}}]}function An(){this.$get=["$rootScope","$exceptionHandler",function(t,e){return On(function(e){t.$evalAsync(e)},e)}]}function On(t,e){function r(t){return t}function i(t){return c(t)}function a(t){var e=s(),n=0,r=Nr(t)?[]:{};return o(t,function(t,i){n++,u(t).then(function(t){r.hasOwnProperty(i)||(r[i]=t,--n||e.resolve(r))},function(t){r.hasOwnProperty(i)||e.reject(t)})}),0===n&&e.resolve(r),e.promise}var s=function(){var o,a,c=[];return a={resolve:function(e){if(c){var r=c;c=n,o=u(e),r.length&&t(function(){for(var t,e=0,n=r.length;n>e;e++)t=r[e],o.then(t[0],t[1],t[2])})}},reject:function(t){a.resolve(l(t))},notify:function(e){if(c){var n=c;c.length&&t(function(){for(var t,r=0,i=n.length;i>r;r++)t=n[r],t[2](e)})}},promise:{then:function(t,n,a){var u=s(),l=function(n){try{u.resolve((S(t)?t:r)(n))}catch(i){u.reject(i),e(i)}},f=function(t){try{u.resolve((S(n)?n:i)(t))}catch(r){u.reject(r),e(r)}},h=function(t){try{u.notify((S(a)?a:r)(t))}catch(n){e(n)}};return c?c.push([l,f,h]):o.then(l,f,h),u.promise},"catch":function(t){return this.then(null,t)},"finally":function(t){function e(t,e){var n=s();return e?n.resolve(t):n.reject(t),n.promise}function n(n,i){var o=null;try{o=(t||r)()}catch(a){return e(a,!1)}return T(o)?o.then(function(){return e(n,i)},function(t){return e(t,!1)}):e(n,i)}return this.then(function(t){return n(t,!0)},function(t){return n(t,!1)})}}}},u=function(e){return T(e)?e:{then:function(n){var r=s();return t(function(){r.resolve(n(e))}),r.promise}}},c=function(t){var e=s();return e.reject(t),e.promise},l=function(n){return{then:function(r,o){var a=s();return t(function(){try{a.resolve((S(o)?o:i)(n))}catch(t){a.reject(t),e(t)}}),a.promise}}},f=function(n,o,a,l){var f,h=s(),p=function(t){try{return(S(o)?o:r)(t)}catch(n){return e(n),c(n)}},$=function(t){try{return(S(a)?a:i)(t)}catch(n){return e(n),c(n)}},d=function(t){try{return(S(l)?l:r)(t)}catch(n){e(n)}};return t(function(){u(n).then(function(t){f||(f=!0,h.resolve(u(t).then(p,$,d)))},function(t){f||(f=!0,h.resolve($(t)))},function(t){f||h.notify(d(t))})}),h.promise};return{defer:s,reject:c,when:f,all:a}}function Tn(){this.$get=["$window","$timeout",function(t,e){var n=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame,r=t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.webkitCancelRequestAnimationFrame,i=!!n,o=i?function(t){var e=n(t);return function(){r(e)}}:function(t){var n=e(t,16.66,!1);return function(){e.cancel(n)}};return o.supported=i,o}]}function Mn(){var t=10,e=r("$rootScope"),n=null;this.digestTtl=function(e){return arguments.length&&(t=e),t},this.$get=["$injector","$exceptionHandler","$parse","$browser",function(r,a,s,u){function l(){this.$id=c(),this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null,this["this"]=this.$root=this,this.$$destroyed=!1,this.$$asyncQueue=[],this.$$postDigestQueue=[],this.$$listeners={},this.$$listenerCount={},this.$$isolateBindings={}}function f(t){if(g.$$phase)throw e("inprog","{0} already in progress",g.$$phase);g.$$phase=t}function h(){g.$$phase=null}function p(t,e){var n=s(t);return ne(n,e),n}function d(t,e,n){do t.$$listenerCount[n]-=e,0===t.$$listenerCount[n]&&delete t.$$listenerCount[n];while(t=t.$parent)}function v(){}l.prototype={constructor:l,$new:function(t){var e;return t?(e=new l,e.$root=this.$root,e.$$asyncQueue=this.$$asyncQueue,e.$$postDigestQueue=this.$$postDigestQueue):(this.$$childScopeClass||(this.$$childScopeClass=function(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null,this.$$listeners={},this.$$listenerCount={},this.$id=c(),this.$$childScopeClass=null},this.$$childScopeClass.prototype=this),e=new this.$$childScopeClass),e["this"]=e,e.$parent=this,e.$$prevSibling=this.$$childTail,this.$$childHead?(this.$$childTail.$$nextSibling=e,this.$$childTail=e):this.$$childHead=this.$$childTail=e,e},$watch:function(t,e,r){var i=this,o=p(t,"watch"),a=i.$$watchers,s={fn:e,last:v,get:o,exp:t,eq:!!r};if(n=null,!S(e)){var u=p(e||$,"listener");s.fn=function(t,e,n){u(n)}}if("string"==typeof t&&o.constant){var c=s.fn;s.fn=function(t,e,n){c.call(this,t,e,n),D(a,s)}}return a||(a=i.$$watchers=[]),a.unshift(s),function(){D(a,s),n=null}},$watchCollection:function(t,e){function n(){o=h(c);var t,e,n;if(y(o))if(i(o)){a!==p&&(a=p,v=a.length=0,f++),t=o.length,v!==t&&(f++,a.length=v=t);for(var r=0;t>r;r++)n=a[r]!==a[r]&&o[r]!==o[r],n||a[r]===o[r]||(f++,a[r]=o[r])}else{a!==$&&(a=$={},v=0,f++),t=0;for(e in o)o.hasOwnProperty(e)&&(t++,a.hasOwnProperty(e)?(n=a[e]!==a[e]&&o[e]!==o[e],n||a[e]===o[e]||(f++,a[e]=o[e])):(v++,a[e]=o[e],f++));if(v>t){f++;for(e in a)a.hasOwnProperty(e)&&!o.hasOwnProperty(e)&&(v--,delete a[e])}}else a!==o&&(a=o,f++);return f}function r(){if(d?(d=!1,e(o,o,c)):e(o,u,c),l)if(y(o))if(i(o)){u=new Array(o.length);for(var t=0;t<o.length;t++)u[t]=o[t]}else{u={};for(var n in o)vr.call(o,n)&&(u[n]=o[n])}else u=o}var o,a,u,c=this,l=e.length>1,f=0,h=s(t),p=[],$={},d=!0,v=0;return this.$watch(n,r)},$digest:function(){var r,i,o,s,c,l,p,$,d,g,m,y=this.$$asyncQueue,w=this.$$postDigestQueue,b=t,x=this,C=[];f("$digest"),u.$$checkUrlChange(),n=null;do{for(l=!1,$=x;y.length;){try{m=y.shift(),m.scope.$eval(m.expression)}catch(k){h(),a(k)}n=null}t:do{if(s=$.$$watchers)for(c=s.length;c--;)try{if(r=s[c])if((i=r.get($))===(o=r.last)||(r.eq?q(i,o):"number"==typeof i&&"number"==typeof o&&isNaN(i)&&isNaN(o))){if(r===n){l=!1;break t}}else l=!0,n=r,r.last=r.eq?R(i,null):i,r.fn(i,o===v?i:o,$),5>b&&(d=4-b,C[d]||(C[d]=[]),g=S(r.exp)?"fn: "+(r.exp.name||r.exp.toString()):r.exp,g+="; newVal: "+L(i)+"; oldVal: "+L(o),C[d].push(g))}catch(k){h(),a(k)}if(!(p=$.$$childHead||$!==x&&$.$$nextSibling))for(;$!==x&&!(p=$.$$nextSibling);)$=$.$parent}while($=p);if((l||y.length)&&!b--)throw h(),e("infdig","{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}",t,L(C))}while(l||y.length);for(h();w.length;)try{w.shift()()}catch(k){a(k)}},$destroy:function(){if(!this.$$destroyed){var t=this.$parent;this.$broadcast("$destroy"),this.$$destroyed=!0,this!==g&&(o(this.$$listenerCount,I(null,d,this)),t.$$childHead==this&&(t.$$childHead=this.$$nextSibling),t.$$childTail==this&&(t.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=null,this.$$listeners={},this.$$watchers=this.$$asyncQueue=this.$$postDigestQueue=[],this.$destroy=this.$digest=this.$apply=$,this.$on=this.$watch=function(){return $})}},$eval:function(t,e){return s(t)(this,e)},$evalAsync:function(t){g.$$phase||g.$$asyncQueue.length||u.defer(function(){g.$$asyncQueue.length&&g.$digest()}),this.$$asyncQueue.push({scope:this,expression:t})},$$postDigest:function(t){this.$$postDigestQueue.push(t)},$apply:function(t){try{return f("$apply"),this.$eval(t)}catch(e){a(e)}finally{h();try{g.$digest()}catch(e){throw a(e),e}}},$on:function(t,e){var n=this.$$listeners[t];n||(this.$$listeners[t]=n=[]),n.push(e);var r=this;do r.$$listenerCount[t]||(r.$$listenerCount[t]=0),r.$$listenerCount[t]++;while(r=r.$parent);var i=this;return function(){var r=j(n,e);-1!==r&&(n[r]=null,d(i,1,t))}},$emit:function(t){var e,n,r,i=[],o=this,s=!1,u={name:t,targetScope:o,stopPropagation:function(){s=!0},preventDefault:function(){u.defaultPrevented=!0},defaultPrevented:!1},c=U([u],arguments,1);do{for(e=o.$$listeners[t]||i,u.currentScope=o,n=0,r=e.length;r>n;n++)if(e[n])try{e[n].apply(null,c)}catch(l){a(l)}else e.splice(n,1),n--,r--;if(s)return u;o=o.$parent}while(o);return u},$broadcast:function(t){for(var e,n,r,i=this,o=i,s=i,u={name:t,targetScope:i,preventDefault:function(){u.defaultPrevented=!0},defaultPrevented:!1},c=U([u],arguments,1);o=s;){for(u.currentScope=o,e=o.$$listeners[t]||[],n=0,r=e.length;r>n;n++)if(e[n])try{e[n].apply(null,c)}catch(l){a(l)}else e.splice(n,1),n--,r--;if(!(s=o.$$listenerCount[t]&&o.$$childHead||o!==i&&o.$$nextSibling))for(;o!==i&&!(s=o.$$nextSibling);)o=o.$parent}return u}};var g=new l;return g}]}function Nn(){var t=/^\s*(https?|ftp|mailto|tel|file):/,e=/^\s*((https?|ftp|file):|data:image\/)/;this.aHrefSanitizationWhitelist=function(e){return m(e)?(t=e,this):t},this.imgSrcSanitizationWhitelist=function(t){return m(t)?(e=t,this):e},this.$get=function(){return function(n,r){var i,o=r?e:t;return wr&&!(wr>=8)||(i=Vn(n).href,""===i||i.match(o))?n:"unsafe:"+i}}}function Pn(t){return t.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")}function jn(t){if("self"===t)return t;if(w(t)){if(t.indexOf("***")>-1)throw xi("iwcard","Illegal sequence *** in string matcher.  String: {0}",t);return t=Pn(t).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*"),new RegExp("^"+t+"$")}if(C(t))return new RegExp("^"+t.source+"$");throw xi("imatcher",'Matchers may only be "self", string patterns or RegExp objects')}function Dn(t){var e=[];return m(t)&&o(t,function(t){e.push(jn(t))}),e}function Rn(){this.SCE_CONTEXTS=Si;var t=["self"],e=[];this.resourceUrlWhitelist=function(e){return arguments.length&&(t=Dn(e)),t},this.resourceUrlBlacklist=function(t){return arguments.length&&(e=Dn(t)),e},this.$get=["$injector",function(r){function i(t,e){return"self"===t?In(e):!!t.exec(e.href)}function o(n){var r,o,a=Vn(n.toString()),s=!1;for(r=0,o=t.length;o>r;r++)if(i(t[r],a)){s=!0;break}if(s)for(r=0,o=e.length;o>r;r++)if(i(e[r],a)){s=!1;break}return s}function a(t){var e=function(t){this.$$unwrapTrustedValue=function(){return t}};return t&&(e.prototype=new t),e.prototype.valueOf=function(){return this.$$unwrapTrustedValue()},e.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()},e}function s(t,e){var r=h.hasOwnProperty(t)?h[t]:null;if(!r)throw xi("icontext","Attempted to trust a value in invalid context. Context: {0}; Value: {1}",t,e);if(null===e||e===n||""===e)return e;if("string"!=typeof e)throw xi("itype","Attempted to trust a non-string value in a content requiring a string: Context: {0}",t);return new r(e)}function u(t){return t instanceof f?t.$$unwrapTrustedValue():t}function c(t,e){if(null===e||e===n||""===e)return e;var r=h.hasOwnProperty(t)?h[t]:null;if(r&&e instanceof r)return e.$$unwrapTrustedValue();if(t===Si.RESOURCE_URL){if(o(e))return e;throw xi("insecurl","Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}",e.toString())}if(t===Si.HTML)return l(e);throw xi("unsafe","Attempting to use an unsafe value in a safe context.")}var l=function(){throw xi("unsafe","Attempting to use an unsafe value in a safe context.")};r.has("$sanitize")&&(l=r.get("$sanitize"));var f=a(),h={};return h[Si.HTML]=a(f),h[Si.CSS]=a(f),h[Si.URL]=a(f),h[Si.JS]=a(f),h[Si.RESOURCE_URL]=a(h[Si.URL]),{trustAs:s,getTrusted:c,valueOf:u}}]}function _n(){var t=!0;this.enabled=function(e){return arguments.length&&(t=!!e),t},this.$get=["$parse","$sniffer","$sceDelegate",function(e,n,r){if(t&&n.msie&&n.msieDocumentMode<8)throw xi("iequirks","Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");var i=_(Si);i.isEnabled=function(){return t},i.trustAs=r.trustAs,i.getTrusted=r.getTrusted,i.valueOf=r.valueOf,t||(i.trustAs=i.getTrusted=function(t,e){return e},i.valueOf=d),i.parseAs=function(t,n){var r=e(n);return r.literal&&r.constant?r:function(e,n){return i.getTrusted(t,r(e,n))}};var a=i.parseAs,s=i.getTrusted,u=i.trustAs;return o(Si,function(t,e){var n=dr(e);i[ce("parse_as_"+n)]=function(e){return a(t,e)},i[ce("get_trusted_"+n)]=function(e){return s(t,e)},i[ce("trust_as_"+n)]=function(e){return u(t,e)}}),i}]}function qn(){this.$get=["$window","$document",function(t,e){var n,r,i={},o=h((/android (\d+)/.exec(dr((t.navigator||{}).userAgent))||[])[1]),a=/Boxee/i.test((t.navigator||{}).userAgent),s=e[0]||{},u=s.documentMode,c=/^(Moz|webkit|O|ms)(?=[A-Z])/,l=s.body&&s.body.style,f=!1,p=!1;if(l){for(var $ in l)if(r=c.exec($)){n=r[0],n=n.substr(0,1).toUpperCase()+n.substr(1);break}n||(n="WebkitOpacity"in l&&"webkit"),f=!!("transition"in l||n+"Transition"in l),p=!!("animation"in l||n+"Animation"in l),!o||f&&p||(f=w(s.body.style.webkitTransition),p=w(s.body.style.webkitAnimation))}return{history:!(!t.history||!t.history.pushState||4>o||a),hashchange:"onhashchange"in t&&(!u||u>7),hasEvent:function(t){if("input"==t&&9==wr)return!1;
if(g(i[t])){var e=s.createElement("div");i[t]="on"+t in e}return i[t]},csp:jr(),vendorPrefix:n,transitions:f,animations:p,android:o,msie:wr,msieDocumentMode:u}}]}function Un(){this.$get=["$rootScope","$browser","$q","$exceptionHandler",function(t,e,n,r){function i(i,a,s){var u,c=n.defer(),l=c.promise,f=m(s)&&!s;return u=e.defer(function(){try{c.resolve(i())}catch(e){c.reject(e),r(e)}finally{delete o[l.$$timeoutId]}f||t.$apply()},a),l.$$timeoutId=u,o[u]=c,l}var o={};return i.cancel=function(t){return t&&t.$$timeoutId in o?(o[t.$$timeoutId].reject("canceled"),delete o[t.$$timeoutId],e.defer.cancel(t.$$timeoutId)):!1},i}]}function Vn(t){var e=t;return wr&&(Ci.setAttribute("href",e),e=Ci.href),Ci.setAttribute("href",e),{href:Ci.href,protocol:Ci.protocol?Ci.protocol.replace(/:$/,""):"",host:Ci.host,search:Ci.search?Ci.search.replace(/^\?/,""):"",hash:Ci.hash?Ci.hash.replace(/^#/,""):"",hostname:Ci.hostname,port:Ci.port,pathname:"/"===Ci.pathname.charAt(0)?Ci.pathname:"/"+Ci.pathname}}function In(t){var e=w(t)?Vn(t):t;return e.protocol===ki.protocol&&e.host===ki.host}function Fn(){this.$get=v(t)}function Ln(t){function e(r,i){if(y(r)){var a={};return o(r,function(t,n){a[n]=e(n,t)}),a}return t.factory(r+n,i)}var n="Filter";this.register=e,this.$get=["$injector",function(t){return function(e){return t.get(e+n)}}],e("currency",Bn),e("date",Yn),e("filter",Hn),e("json",Zn),e("limitTo",tr),e("lowercase",Mi),e("number",zn),e("orderBy",er),e("uppercase",Ni)}function Hn(){return function(t,e,n){if(!Nr(t))return t;var r=typeof n,i=[];i.check=function(t){for(var e=0;e<i.length;e++)if(!i[e](t))return!1;return!0},"function"!==r&&(n="boolean"===r&&n?function(t,e){return Tr.equals(t,e)}:function(t,e){if(t&&e&&"object"==typeof t&&"object"==typeof e){for(var r in t)if("$"!==r.charAt(0)&&vr.call(t,r)&&n(t[r],e[r]))return!0;return!1}return e=(""+e).toLowerCase(),(""+t).toLowerCase().indexOf(e)>-1});var o=function(t,e){if("string"==typeof e&&"!"===e.charAt(0))return!o(t,e.substr(1));switch(typeof t){case"boolean":case"number":case"string":return n(t,e);case"object":switch(typeof e){case"object":return n(t,e);default:for(var r in t)if("$"!==r.charAt(0)&&o(t[r],e))return!0}return!1;case"array":for(var i=0;i<t.length;i++)if(o(t[i],e))return!0;return!1;default:return!1}};switch(typeof e){case"boolean":case"number":case"string":e={$:e};case"object":for(var a in e)!function(t){"undefined"!=typeof e[t]&&i.push(function(n){return o("$"==t?n:n&&n[t],e[t])})}(a);break;case"function":i.push(e);break;default:return t}for(var s=[],u=0;u<t.length;u++){var c=t[u];i.check(c)&&s.push(c)}return s}}function Bn(t){var e=t.NUMBER_FORMATS;return function(t,n){return g(n)&&(n=e.CURRENCY_SYM),Wn(t,e.PATTERNS[1],e.GROUP_SEP,e.DECIMAL_SEP,2).replace(/\u00A4/g,n)}}function zn(t){var e=t.NUMBER_FORMATS;return function(t,n){return Wn(t,e.PATTERNS[0],e.GROUP_SEP,e.DECIMAL_SEP,n)}}function Wn(t,e,n,r,i){if(null==t||!isFinite(t)||y(t))return"";var o=0>t;t=Math.abs(t);var a=t+"",s="",u=[],c=!1;if(-1!==a.indexOf("e")){var l=a.match(/([\d\.]+)e(-?)(\d+)/);l&&"-"==l[2]&&l[3]>i+1?(a="0",t=0):(s=a,c=!0)}if(c)i>0&&t>-1&&1>t&&(s=t.toFixed(i));else{var f=(a.split(Ei)[1]||"").length;g(i)&&(i=Math.min(Math.max(e.minFrac,f),e.maxFrac)),t=+(Math.round(+(t.toString()+"e"+i)).toString()+"e"+-i),0===t&&(o=!1);var h=(""+t).split(Ei),p=h[0];h=h[1]||"";var $,d=0,v=e.lgSize,m=e.gSize;if(p.length>=v+m)for(d=p.length-v,$=0;d>$;$++)(d-$)%m===0&&0!==$&&(s+=n),s+=p.charAt($);for($=d;$<p.length;$++)(p.length-$)%v===0&&0!==$&&(s+=n),s+=p.charAt($);for(;h.length<i;)h+="0";i&&"0"!==i&&(s+=r+h.substr(0,i))}return u.push(o?e.negPre:e.posPre),u.push(s),u.push(o?e.negSuf:e.posSuf),u.join("")}function Qn(t,e,n){var r="";for(0>t&&(r="-",t=-t),t=""+t;t.length<e;)t="0"+t;return n&&(t=t.substr(t.length-e)),r+t}function Jn(t,e,n,r){return n=n||0,function(i){var o=i["get"+t]();return(n>0||o>-n)&&(o+=n),0===o&&-12==n&&(o=12),Qn(o,e,r)}}function Gn(t,e){return function(n,r){var i=n["get"+t](),o=gr(e?"SHORT"+t:t);return r[o][i]}}function Xn(t){var e=-1*t.getTimezoneOffset(),n=e>=0?"+":"";return n+=Qn(Math[e>0?"floor":"ceil"](e/60),2)+Qn(Math.abs(e%60),2)}function Kn(t,e){return t.getHours()<12?e.AMPMS[0]:e.AMPMS[1]}function Yn(t){function e(t){var e;if(e=t.match(n)){var r=new Date(0),i=0,o=0,a=e[8]?r.setUTCFullYear:r.setFullYear,s=e[8]?r.setUTCHours:r.setHours;e[9]&&(i=h(e[9]+e[10]),o=h(e[9]+e[11])),a.call(r,h(e[1]),h(e[2])-1,h(e[3]));var u=h(e[4]||0)-i,c=h(e[5]||0)-o,l=h(e[6]||0),f=Math.round(1e3*parseFloat("0."+(e[7]||0)));return s.call(r,u,c,l,f),r}return t}var n=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(n,r){var i,a,s="",u=[];if(r=r||"mediumDate",r=t.DATETIME_FORMATS[r]||r,w(n)&&(n=Ti.test(n)?h(n):e(n)),b(n)&&(n=new Date(n)),!x(n))return n;for(;r;)a=Oi.exec(r),a?(u=U(u,a,1),r=u.pop()):(u.push(r),r=null);return o(u,function(e){i=Ai[e],s+=i?i(n,t.DATETIME_FORMATS):e.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),s}}function Zn(){return function(t){return L(t,!0)}}function tr(){return function(t,e){if(!Nr(t)&&!w(t))return t;if(e=1/0===Math.abs(Number(e))?Number(e):h(e),w(t))return e?e>=0?t.slice(0,e):t.slice(e,t.length):"";var n,r,i=[];for(e>t.length?e=t.length:e<-t.length&&(e=-t.length),e>0?(n=0,r=e):(n=t.length+e,r=t.length);r>n;n++)i.push(t[n]);return i}}function er(t){return function(e,n,r){function o(t,e){for(var r=0;r<n.length;r++){var i=n[r](t,e);if(0!==i)return i}return 0}function a(t,e){return B(e)?function(e,n){return t(n,e)}:t}function s(t,e){var n=typeof t,r=typeof e;return n==r?(x(t)&&x(e)&&(t=t.valueOf(),e=e.valueOf()),"string"==n&&(t=t.toLowerCase(),e=e.toLowerCase()),t===e?0:e>t?-1:1):r>n?-1:1}return i(e)?(n=Nr(n)?n:[n],0===n.length&&(n=["+"]),n=N(n,function(e){var n=!1,r=e||d;if(w(e)){if(("+"==e.charAt(0)||"-"==e.charAt(0))&&(n="-"==e.charAt(0),e=e.substring(1)),""===e)return a(function(t,e){return s(t,e)},n);if(r=t(e),r.constant){var i=r();return a(function(t,e){return s(t[i],e[i])},n)}}return a(function(t,e){return s(r(t),r(e))},n)}),kr.call(e).sort(a(o,r))):e}}function nr(t){return S(t)&&(t={link:t}),t.restrict=t.restrict||"AC",v(t)}function rr(t,e,n,r){function i(e,n){n=n?"-"+Z(n,"-"):"",r.setClass(t,(e?Bi:zi)+n,(e?zi:Bi)+n)}var a=this,s=t.parent().controller("form")||Di,u=0,c=a.$error={},l=[];a.$name=e.name||e.ngForm,a.$dirty=!1,a.$pristine=!0,a.$valid=!0,a.$invalid=!1,s.$addControl(a),t.addClass(Wi),i(!0),a.$addControl=function(t){re(t.$name,"input"),l.push(t),t.$name&&(a[t.$name]=t)},a.$removeControl=function(t){t.$name&&a[t.$name]===t&&delete a[t.$name],o(c,function(e,n){a.$setValidity(n,!0,t)}),D(l,t)},a.$setValidity=function(t,e,n){var r=c[t];if(e)r&&(D(r,n),r.length||(u--,u||(i(e),a.$valid=!0,a.$invalid=!1),c[t]=!1,i(!0,t),s.$setValidity(t,!0,a)));else{if(u||i(e),r){if(P(r,n))return}else c[t]=r=[],u++,i(!1,t),s.$setValidity(t,!1,a);r.push(n),a.$valid=!1,a.$invalid=!0}},a.$setDirty=function(){r.removeClass(t,Wi),r.addClass(t,Qi),a.$dirty=!0,a.$pristine=!1,s.$setDirty()},a.$setPristine=function(){r.removeClass(t,Qi),r.addClass(t,Wi),a.$dirty=!1,a.$pristine=!0,o(l,function(t){t.$setPristine()})}}function ir(t,e,r,i){return t.$setValidity(e,r),r?i:n}function or(t,e){var n,r;if(e)for(n=0;n<e.length;++n)if(r=e[n],t[r])return!0;return!1}function ar(t,e,n,r,i){if(y(i)){t.$$hasNativeValidators=!0;var o=function(o){return t.$error[e]||or(i,r)||!or(i,n)?o:void t.$setValidity(e,!1)};t.$parsers.push(o)}}function sr(t,e,n,i,o,a){var s=e.prop($r),u=e[0].placeholder,c={},l=dr(e[0].type);if(i.$$validityState=s,!o.android){var f=!1;e.on("compositionstart",function(){f=!0}),e.on("compositionend",function(){f=!1,p()})}var p=function(r){if(!f){var o=e.val();if(wr&&"input"===(r||c).type&&e[0].placeholder!==u)return void(u=e[0].placeholder);"password"!==l&&B(n.ngTrim||"T")&&(o=Pr(o));var a=s&&i.$$hasNativeValidators;(i.$viewValue!==o||""===o&&a)&&(t.$root.$$phase?i.$setViewValue(o):t.$apply(function(){i.$setViewValue(o)}))}};if(o.hasEvent("input"))e.on("input",p);else{var $,d=function(){$||($=a.defer(function(){p(),$=null}))};e.on("keydown",function(t){var e=t.keyCode;91===e||e>15&&19>e||e>=37&&40>=e||d()}),o.hasEvent("paste")&&e.on("paste cut",d)}e.on("change",p),i.$render=function(){e.val(i.$isEmpty(i.$viewValue)?"":i.$viewValue)};var v,g,m=n.ngPattern;if(m){var y=function(t,e){return ir(i,"pattern",i.$isEmpty(e)||t.test(e),e)};g=m.match(/^\/(.*)\/([gim]*)$/),g?(m=new RegExp(g[1],g[2]),v=function(t){return y(m,t)}):v=function(n){var i=t.$eval(m);if(!i||!i.test)throw r("ngPattern")("noregexp","Expected {0} to be a RegExp but was {1}. Element: {2}",m,i,z(e));return y(i,n)},i.$formatters.push(v),i.$parsers.push(v)}if(n.ngMinlength){var w=h(n.ngMinlength),b=function(t){return ir(i,"minlength",i.$isEmpty(t)||t.length>=w,t)};i.$parsers.push(b),i.$formatters.push(b)}if(n.ngMaxlength){var x=h(n.ngMaxlength),S=function(t){return ir(i,"maxlength",i.$isEmpty(t)||t.length<=x,t)};i.$parsers.push(S),i.$formatters.push(S)}}function ur(t,e,r,i,o,a){if(sr(t,e,r,i,o,a),i.$parsers.push(function(t){var e=i.$isEmpty(t);return e||Ii.test(t)?(i.$setValidity("number",!0),""===t?null:e?t:parseFloat(t)):(i.$setValidity("number",!1),n)}),ar(i,"number",Li,null,i.$$validityState),i.$formatters.push(function(t){return i.$isEmpty(t)?"":""+t}),r.min){var s=function(t){var e=parseFloat(r.min);return ir(i,"min",i.$isEmpty(t)||t>=e,t)};i.$parsers.push(s),i.$formatters.push(s)}if(r.max){var u=function(t){var e=parseFloat(r.max);return ir(i,"max",i.$isEmpty(t)||e>=t,t)};i.$parsers.push(u),i.$formatters.push(u)}i.$formatters.push(function(t){return ir(i,"number",i.$isEmpty(t)||b(t),t)})}function cr(t,e,n,r,i,o){sr(t,e,n,r,i,o);var a=function(t){return ir(r,"url",r.$isEmpty(t)||Ui.test(t),t)};r.$formatters.push(a),r.$parsers.push(a)}function lr(t,e,n,r,i,o){sr(t,e,n,r,i,o);var a=function(t){return ir(r,"email",r.$isEmpty(t)||Vi.test(t),t)};r.$formatters.push(a),r.$parsers.push(a)}function fr(t,e,n,r){g(n.name)&&e.attr("name",c()),e.on("click",function(){e[0].checked&&t.$apply(function(){r.$setViewValue(n.value)})}),r.$render=function(){var t=n.value;e[0].checked=t==r.$viewValue},n.$observe("value",r.$render)}function hr(t,e,n,r){var i=n.ngTrueValue,o=n.ngFalseValue;w(i)||(i=!0),w(o)||(o=!1),e.on("click",function(){t.$apply(function(){r.$setViewValue(e[0].checked)})}),r.$render=function(){e[0].checked=r.$viewValue},r.$isEmpty=function(t){return t!==i},r.$formatters.push(function(t){return t===i}),r.$parsers.push(function(t){return t?i:o})}function pr(t,e){return t="ngClass"+t,["$animate",function(n){function r(t,e){var n=[];t:for(var r=0;r<t.length;r++){for(var i=t[r],o=0;o<e.length;o++)if(i==e[o])continue t;n.push(i)}return n}function i(t){if(Nr(t))return t;if(w(t))return t.split(" ");if(y(t)){var e=[];return o(t,function(t,n){t&&(e=e.concat(n.split(" ")))}),e}return t}return{restrict:"AC",link:function(a,s,u){function c(t){var e=f(t,1);u.$addClass(e)}function l(t){var e=f(t,-1);u.$removeClass(e)}function f(t,e){var n=s.data("$classCounts")||{},r=[];return o(t,function(t){(e>0||n[t])&&(n[t]=(n[t]||0)+e,n[t]===+(e>0)&&r.push(t))}),s.data("$classCounts",n),r.join(" ")}function h(t,e){var i=r(e,t),o=r(t,e);o=f(o,-1),i=f(i,1),0===i.length?n.removeClass(s,o):0===o.length?n.addClass(s,i):n.setClass(s,i,o)}function p(t){if(e===!0||a.$index%2===e){var n=i(t||[]);if($){if(!q(t,$)){var r=i($);h(r,n)}}else c(n)}$=_(t)}var $;a.$watch(u[t],p,!0),u.$observe("class",function(){p(a.$eval(u[t]))}),"ngClass"!==t&&a.$watch("$index",function(n,r){var o=1&n;if(o!==(1&r)){var s=i(a.$eval(u[t]));o===e?c(s):l(s)}})}}}]}var $r="validity",dr=function(t){return w(t)?t.toLowerCase():t},vr=Object.prototype.hasOwnProperty,gr=function(t){return w(t)?t.toUpperCase():t},mr=function(t){return w(t)?t.replace(/[A-Z]/g,function(t){return String.fromCharCode(32|t.charCodeAt(0))}):t},yr=function(t){return w(t)?t.replace(/[a-z]/g,function(t){return String.fromCharCode(-33&t.charCodeAt(0))}):t};"i"!=="I".toLowerCase()&&(dr=mr,gr=yr);var wr,br,xr,Sr,Cr,kr=[].slice,Er=[].push,Ar=Object.prototype.toString,Or=r("ng"),Tr=t.angular||(t.angular={}),Mr=["0","0","0"];wr=h((/msie (\d+)/.exec(dr(navigator.userAgent))||[])[1]),isNaN(wr)&&(wr=h((/trident\/.*; rv:(\d+)/.exec(dr(navigator.userAgent))||[])[1])),$.$inject=[],d.$inject=[];var Nr=function(){return S(Array.isArray)?Array.isArray:function(t){return"[object Array]"===Ar.call(t)}}(),Pr=function(){return String.prototype.trim?function(t){return w(t)?t.trim():t}:function(t){return w(t)?t.replace(/^\s\s*/,"").replace(/\s\s*$/,""):t}}();Cr=9>wr?function(t){return t=t.nodeName?t:t[0],t.scopeName&&"HTML"!=t.scopeName?gr(t.scopeName+":"+t.nodeName):t.nodeName}:function(t){return t.nodeName?t.nodeName:t[0].nodeName};var jr=function(){if(m(jr.isActive_))return jr.isActive_;var t=!(!e.querySelector("[ng-csp]")&&!e.querySelector("[data-ng-csp]"));if(!t)try{new Function("")}catch(n){t=!0}return jr.isActive_=t},Dr=/[A-Z]/g,Rr={full:"1.2.28",major:1,minor:2,dot:28,codeName:"finnish-disembarkation"};$e.expando="ng339";var _r=$e.cache={},qr=1,Ur=t.document.addEventListener?function(t,e,n){t.addEventListener(e,n,!1)}:function(t,e,n){t.attachEvent("on"+e,n)},Vr=t.document.removeEventListener?function(t,e,n){t.removeEventListener(e,n,!1)}:function(t,e,n){t.detachEvent("on"+e,n)},Ir=($e._data=function(t){return this.cache[t[this.expando]]||{}},/([\:\-\_]+(.))/g),Fr=/^moz([A-Z])/,Lr=r("jqLite"),Hr=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Br=/<|&#?\w+;/,zr=/<([\w:]+)/,Wr=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Qr={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Qr.optgroup=Qr.option,Qr.tbody=Qr.tfoot=Qr.colgroup=Qr.caption=Qr.thead,Qr.th=Qr.td;var Jr=$e.prototype={ready:function(n){function r(){i||(i=!0,n())}var i=!1;"complete"===e.readyState?setTimeout(r):(this.on("DOMContentLoaded",r),$e(t).on("load",r))},toString:function(){var t=[];return o(this,function(e){t.push(""+e)}),"["+t.join(", ")+"]"},eq:function(t){return br(t>=0?this[t]:this[this.length+t])},length:0,push:Er,sort:[].sort,splice:[].splice},Gr={};o("multiple,selected,checked,disabled,readOnly,required,open".split(","),function(t){Gr[dr(t)]=t});var Xr={};o("input,select,option,textarea,button,form,details".split(","),function(t){Xr[gr(t)]=!0}),o({data:we,removeData:me},function(t,e){$e[e]=t}),o({data:we,inheritedData:Ee,scope:function(t){return br.data(t,"$scope")||Ee(t.parentNode||t,["$isolateScope","$scope"])},isolateScope:function(t){return br.data(t,"$isolateScope")||br.data(t,"$isolateScopeNoTemplate")},controller:ke,injector:function(t){return Ee(t,"$injector")},removeAttr:function(t,e){t.removeAttribute(e)},hasClass:be,css:function(t,e,r){if(e=ce(e),!m(r)){var i;return 8>=wr&&(i=t.currentStyle&&t.currentStyle[e],""===i&&(i="auto")),i=i||t.style[e],8>=wr&&(i=""===i?n:i),i}t.style[e]=r},attr:function(t,e,r){var i=dr(e);if(Gr[i]){if(!m(r))return t[e]||(t.attributes.getNamedItem(e)||$).specified?i:n;r?(t[e]=!0,t.setAttribute(e,i)):(t[e]=!1,t.removeAttribute(i))}else if(m(r))t.setAttribute(e,r);else if(t.getAttribute){var o=t.getAttribute(e,2);return null===o?n:o}},prop:function(t,e,n){return m(n)?void(t[e]=n):t[e]},text:function(){function t(t,n){var r=e[t.nodeType];return g(n)?r?t[r]:"":void(t[r]=n)}var e=[];return 9>wr?(e[1]="innerText",e[3]="nodeValue"):e[1]=e[3]="textContent",t.$dv="",t}(),val:function(t,e){if(g(e)){if("SELECT"===Cr(t)&&t.multiple){var n=[];return o(t.options,function(t){t.selected&&n.push(t.value||t.text)}),0===n.length?null:n}return t.value}t.value=e},html:function(t,e){if(g(e))return t.innerHTML;for(var n=0,r=t.childNodes;n<r.length;n++)ve(r[n]);t.innerHTML=e},empty:Ae},function(t,e){$e.prototype[e]=function(e,r){var i,o,a=this.length;if(t!==Ae&&(2==t.length&&t!==be&&t!==ke?e:r)===n){if(y(e)){for(i=0;a>i;i++)if(t===we)t(this[i],e);else for(o in e)t(this[i],o,e[o]);return this}for(var s=t.$dv,u=s===n?Math.min(a,1):a,c=0;u>c;c++){var l=t(this[c],e,r);s=s?s+l:l}return s}for(i=0;a>i;i++)t(this[i],e,r);return this}}),o({removeData:me,dealoc:ve,on:function Po(t,n,r,i){if(m(i))throw Lr("onargs","jqLite#on() does not support the `selector` or `eventData` parameters");var a=ye(t,"events"),s=ye(t,"handle");a||ye(t,"events",a={}),s||ye(t,"handle",s=Te(t,a)),o(n.split(" "),function(n){var i=a[n];if(!i){if("mouseenter"==n||"mouseleave"==n){var o=e.body.contains||e.body.compareDocumentPosition?function(t,e){var n=9===t.nodeType?t.documentElement:t,r=e&&e.parentNode;return t===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):t.compareDocumentPosition&&16&t.compareDocumentPosition(r)))}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1};a[n]=[];var u={mouseleave:"mouseout",mouseenter:"mouseover"};Po(t,u[n],function(t){var e=this,r=t.relatedTarget;(!r||r!==e&&!o(e,r))&&s(t,n)})}else Ur(t,n,s),a[n]=[];i=a[n]}i.push(r)})},off:ge,one:function(t,e,n){t=br(t),t.on(e,function r(){t.off(e,n),t.off(e,r)}),t.on(e,n)},replaceWith:function(t,e){var n,r=t.parentNode;ve(t),o(new $e(e),function(e){n?r.insertBefore(e,n.nextSibling):r.replaceChild(e,t),n=e})},children:function(t){var e=[];return o(t.childNodes,function(t){1===t.nodeType&&e.push(t)}),e},contents:function(t){return t.contentDocument||t.childNodes||[]},append:function(t,e){o(new $e(e),function(e){(1===t.nodeType||11===t.nodeType)&&t.appendChild(e)})},prepend:function(t,e){if(1===t.nodeType){var n=t.firstChild;o(new $e(e),function(e){t.insertBefore(e,n)})}},wrap:function(t,e){e=br(e)[0];var n=t.parentNode;n&&n.replaceChild(e,t),e.appendChild(t)},remove:function(t){ve(t);var e=t.parentNode;e&&e.removeChild(t)},after:function(t,e){var n=t,r=t.parentNode;o(new $e(e),function(t){r.insertBefore(t,n.nextSibling),n=t})},addClass:Se,removeClass:xe,toggleClass:function(t,e,n){e&&o(e.split(" "),function(e){var r=n;g(r)&&(r=!be(t,e)),(r?Se:xe)(t,e)})},parent:function(t){var e=t.parentNode;return e&&11!==e.nodeType?e:null},next:function(t){if(t.nextElementSibling)return t.nextElementSibling;for(var e=t.nextSibling;null!=e&&1!==e.nodeType;)e=e.nextSibling;return e},find:function(t,e){return t.getElementsByTagName?t.getElementsByTagName(e):[]},clone:de,triggerHandler:function(t,e,n){var r,i,a,s=e.type||e,u=(ye(t,"events")||{})[s];u&&(r={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return this.defaultPrevented===!0},stopPropagation:$,type:s,target:t},e.type&&(r=f(r,e)),i=_(u),a=n?[r].concat(n):[r],o(i,function(e){e.apply(t,a)}))}},function(t,e){$e.prototype[e]=function(e,n,r){for(var i,o=0;o<this.length;o++)g(i)?(i=t(this[o],e,n,r),m(i)&&(i=br(i))):Ce(i,t(this[o],e,n,r));return m(i)?i:this},$e.prototype.bind=$e.prototype.on,$e.prototype.unbind=$e.prototype.off}),Ne.prototype={put:function(t,e){this[Me(t,this.nextUid)]=e},get:function(t){return this[Me(t,this.nextUid)]},remove:function(t){var e=this[t=Me(t,this.nextUid)];return delete this[t],e}};var Kr=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,Yr=/,/,Zr=/^\s*(_?)(\S+?)\1\s*$/,ti=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,ei=r("$injector"),ni=r("$animate"),ri=["$provide",function(t){this.$$selectors={},this.register=function(e,n){var r=e+"-animation";if(e&&"."!=e.charAt(0))throw ni("notcsel","Expecting class selector starting with '.' got '{0}'.",e);this.$$selectors[e.substr(1)]=r,t.factory(r,n)},this.classNameFilter=function(t){return 1===arguments.length&&(this.$$classNameFilter=t instanceof RegExp?t:null),this.$$classNameFilter},this.$get=["$timeout","$$asyncCallback",function(t,e){function n(t){t&&e(t)}return{enter:function(t,e,r,i){r?r.after(t):(e&&e[0]||(e=r.parent()),e.append(t)),n(i)},leave:function(t,e){t.remove(),n(e)},move:function(t,e,n,r){this.enter(t,e,n,r)},addClass:function(t,e,r){e=w(e)?e:Nr(e)?e.join(" "):"",o(t,function(t){Se(t,e)}),n(r)},removeClass:function(t,e,r){e=w(e)?e:Nr(e)?e.join(" "):"",o(t,function(t){xe(t,e)}),n(r)},setClass:function(t,e,r,i){o(t,function(t){Se(t,e),xe(t,r)}),n(i)},enabled:$}}]}],ii=r("$compile");Ie.$inject=["$provide","$$sanitizeUriProvider"];var oi=/^(x[\:\-_]|data[\:\-_])/i,ai=r("$interpolate"),si=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,ui={http:80,https:443,ftp:21},ci=r("$location");pn.prototype=hn.prototype=fn.prototype={$$html5:!1,$$replace:!1,absUrl:$n("$$absUrl"),url:function(t){if(g(t))return this.$$url;var e=si.exec(t);return e[1]&&this.path(decodeURIComponent(e[1])),(e[2]||e[1])&&this.search(e[3]||""),this.hash(e[5]||""),this},protocol:$n("$$protocol"),host:$n("$$host"),port:$n("$$port"),path:dn("$$path",function(t){return t=null!==t?t.toString():"","/"==t.charAt(0)?t:"/"+t}),search:function(t,e){switch(arguments.length){case 0:return this.$$search;case 1:if(w(t)||b(t))t=t.toString(),this.$$search=Q(t);else{if(!y(t))throw ci("isrcharg","The first argument of the `$location#search()` call must be a string or an object.");o(t,function(e,n){null==e&&delete t[n]}),this.$$search=t}break;default:g(e)||null===e?delete this.$$search[t]:this.$$search[t]=e}return this.$$compose(),this},hash:dn("$$hash",function(t){return null!==t?t.toString():""}),replace:function(){return this.$$replace=!0,this}};var li,fi=r("$parse"),hi={},pi=Function.prototype.call,$i=Function.prototype.apply,di=Function.prototype.bind,vi={"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:$,"+":function(t,e,r,i){return r=r(t,e),i=i(t,e),m(r)?m(i)?r+i:r:m(i)?i:n},"-":function(t,e,n,r){return n=n(t,e),r=r(t,e),(m(n)?n:0)-(m(r)?r:0)},"*":function(t,e,n,r){return n(t,e)*r(t,e)},"/":function(t,e,n,r){return n(t,e)/r(t,e)},"%":function(t,e,n,r){return n(t,e)%r(t,e)},"^":function(t,e,n,r){return n(t,e)^r(t,e)},"=":$,"===":function(t,e,n,r){return n(t,e)===r(t,e)},"!==":function(t,e,n,r){return n(t,e)!==r(t,e)},"==":function(t,e,n,r){return n(t,e)==r(t,e)},"!=":function(t,e,n,r){return n(t,e)!=r(t,e)},"<":function(t,e,n,r){return n(t,e)<r(t,e)},">":function(t,e,n,r){return n(t,e)>r(t,e)},"<=":function(t,e,n,r){return n(t,e)<=r(t,e)},">=":function(t,e,n,r){return n(t,e)>=r(t,e)},"&&":function(t,e,n,r){return n(t,e)&&r(t,e)},"||":function(t,e,n,r){return n(t,e)||r(t,e)},"&":function(t,e,n,r){return n(t,e)&r(t,e)},"|":function(t,e,n,r){return r(t,e)(t,e,n(t,e))},"!":function(t,e,n){return!n(t,e)}},gi={n:"\n",f:"\f",r:"\r",t:"	",v:"","'":"'",'"':'"'},mi=function(t){this.options=t};mi.prototype={constructor:mi,lex:function(t){for(this.text=t,this.index=0,this.ch=n,this.lastCh=":",this.tokens=[];this.index<this.text.length;){if(this.ch=this.text.charAt(this.index),this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent();else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch}),this.index++;else{if(this.isWhitespace(this.ch)){this.index++;continue}var e=this.ch+this.peek(),r=e+this.peek(2),i=vi[this.ch],o=vi[e],a=vi[r];a?(this.tokens.push({index:this.index,text:r,fn:a}),this.index+=3):o?(this.tokens.push({index:this.index,text:e,fn:o}),this.index+=2):i?(this.tokens.push({index:this.index,text:this.ch,fn:i}),this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+1)}this.lastCh=this.ch}return this.tokens},is:function(t){return-1!==t.indexOf(this.ch)},was:function(t){return-1!==t.indexOf(this.lastCh)},peek:function(t){var e=t||1;return this.index+e<this.text.length?this.text.charAt(this.index+e):!1},isNumber:function(t){return t>="0"&&"9">=t},isWhitespace:function(t){return" "===t||"\r"===t||"	"===t||"\n"===t||""===t||" "===t},isIdent:function(t){return t>="a"&&"z">=t||t>="A"&&"Z">=t||"_"===t||"$"===t},isExpOperator:function(t){return"-"===t||"+"===t||this.isNumber(t)},throwError:function(t,e,n){n=n||this.index;var r=m(e)?"s "+e+"-"+this.index+" ["+this.text.substring(e,n)+"]":" "+n;throw fi("lexerr","Lexer Error: {0} at column{1} in expression [{2}].",t,r,this.text)},readNumber:function(){for(var t="",e=this.index;this.index<this.text.length;){var n=dr(this.text.charAt(this.index));if("."==n||this.isNumber(n))t+=n;else{var r=this.peek();if("e"==n&&this.isExpOperator(r))t+=n;else if(this.isExpOperator(n)&&r&&this.isNumber(r)&&"e"==t.charAt(t.length-1))t+=n;else{if(!this.isExpOperator(n)||r&&this.isNumber(r)||"e"!=t.charAt(t.length-1))break;this.throwError("Invalid exponent")}}this.index++}t=1*t,this.tokens.push({index:e,text:t,literal:!0,constant:!0,fn:function(){return t}})},readIdent:function(){for(var t,e,n,r,i=this,o="",a=this.index;this.index<this.text.length&&(r=this.text.charAt(this.index),"."===r||this.isIdent(r)||this.isNumber(r));)"."===r&&(t=this.index),o+=r,this.index++;if(t)for(e=this.index;e<this.text.length;){if(r=this.text.charAt(e),"("===r){n=o.substr(t-a+1),o=o.substr(0,t-a),this.index=e;break}if(!this.isWhitespace(r))break;e++}var s={index:a,text:o};if(vi.hasOwnProperty(o))s.fn=vi[o],s.literal=!0,s.constant=!0;else{var u=kn(o,this.options,this.text);s.fn=f(function(t,e){return u(t,e)},{assign:function(t,e){return bn(t,o,e,i.text,i.options)}})}this.tokens.push(s),n&&(this.tokens.push({index:t,text:"."}),this.tokens.push({index:t+1,text:n}))},readString:function(t){var e=this.index;this.index++;for(var n="",r=t,i=!1;this.index<this.text.length;){var o=this.text.charAt(this.index);if(r+=o,i){if("u"===o){var a=this.text.substring(this.index+1,this.index+5);a.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+a+"]"),this.index+=4,n+=String.fromCharCode(parseInt(a,16))}else{var s=gi[o];n+=s||o}i=!1}else if("\\"===o)i=!0;else{if(o===t)return this.index++,void this.tokens.push({index:e,text:r,string:n,literal:!0,constant:!0,fn:function(){return n}});n+=o}this.index++}this.throwError("Unterminated quote",e)}};var yi=function(t,e,n){this.lexer=t,this.$filter=e,this.options=n};yi.ZERO=f(function(){return 0},{constant:!0}),yi.prototype={constructor:yi,parse:function(t){this.text=t,this.tokens=this.lexer.lex(t);var e=this.statements();return 0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]),e.literal=!!e.literal,e.constant=!!e.constant,e},primary:function(){var t;if(this.expect("("))t=this.filterChain(),this.consume(")");else if(this.expect("["))t=this.arrayDeclaration();else if(this.expect("{"))t=this.object();else{var e=this.expect();t=e.fn,t||this.throwError("not a primary expression",e),t.literal=!!e.literal,t.constant=!!e.constant}for(var n,r;n=this.expect("(","[",".");)"("===n.text?(t=this.functionCall(t,r),r=null):"["===n.text?(r=t,t=this.objectIndex(t)):"."===n.text?(r=t,t=this.fieldAccess(t)):this.throwError("IMPOSSIBLE");return t},throwError:function(t,e){throw fi("syntax","Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].",e.text,t,e.index+1,this.text,this.text.substring(e.index))},peekToken:function(){if(0===this.tokens.length)throw fi("ueoe","Unexpected end of expression: {0}",this.text);return this.tokens[0]},peek:function(t,e,n,r){if(this.tokens.length>0){var i=this.tokens[0],o=i.text;if(o===t||o===e||o===n||o===r||!t&&!e&&!n&&!r)return i}return!1},expect:function(t,e,n,r){var i=this.peek(t,e,n,r);return i?(this.tokens.shift(),i):!1},consume:function(t){this.expect(t)||this.throwError("is unexpected, expecting ["+t+"]",this.peek())},unaryFn:function(t,e){return f(function(n,r){return t(n,r,e)},{constant:e.constant})},ternaryFn:function(t,e,n){return f(function(r,i){return t(r,i)?e(r,i):n(r,i)},{constant:t.constant&&e.constant&&n.constant})},binaryFn:function(t,e,n){return f(function(r,i){return e(r,i,t,n)},{constant:t.constant&&n.constant})},statements:function(){for(var t=[];;)if(this.tokens.length>0&&!this.peek("}",")",";","]")&&t.push(this.filterChain()),!this.expect(";"))return 1===t.length?t[0]:function(e,n){for(var r,i=0;i<t.length;i++){var o=t[i];o&&(r=o(e,n))}return r}},filterChain:function(){for(var t,e=this.expression();;){if(!(t=this.expect("|")))return e;e=this.binaryFn(e,t.fn,this.filter())}},filter:function(){for(var t=this.expect(),e=this.$filter(t.text),n=[];;){if(!(t=this.expect(":"))){var r=function(t,r,i){for(var o=[i],a=0;a<n.length;a++)o.push(n[a](t,r));return e.apply(t,o)};return function(){return r}}n.push(this.expression())}},expression:function(){return this.assignment()},assignment:function(){var t,e,n=this.ternary();return(e=this.expect("="))?(n.assign||this.throwError("implies assignment but ["+this.text.substring(0,e.index)+"] can not be assigned to",e),t=this.ternary(),function(e,r){return n.assign(e,t(e,r),r)}):n},ternary:function(){var t,e,n=this.logicalOR();return(e=this.expect("?"))?(t=this.assignment(),(e=this.expect(":"))?this.ternaryFn(n,t,this.assignment()):void this.throwError("expected :",e)):n},logicalOR:function(){for(var t,e=this.logicalAND();;){if(!(t=this.expect("||")))return e;e=this.binaryFn(e,t.fn,this.logicalAND())}},logicalAND:function(){var t,e=this.equality();return(t=this.expect("&&"))&&(e=this.binaryFn(e,t.fn,this.logicalAND())),e},equality:function(){var t,e=this.relational();return(t=this.expect("==","!=","===","!=="))&&(e=this.binaryFn(e,t.fn,this.equality())),e},relational:function(){var t,e=this.additive();return(t=this.expect("<",">","<=",">="))&&(e=this.binaryFn(e,t.fn,this.relational())),e},additive:function(){for(var t,e=this.multiplicative();t=this.expect("+","-");)e=this.binaryFn(e,t.fn,this.multiplicative());return e},multiplicative:function(){for(var t,e=this.unary();t=this.expect("*","/","%");)e=this.binaryFn(e,t.fn,this.unary());return e},unary:function(){var t;return this.expect("+")?this.primary():(t=this.expect("-"))?this.binaryFn(yi.ZERO,t.fn,this.unary()):(t=this.expect("!"))?this.unaryFn(t.fn,this.unary()):this.primary()},fieldAccess:function(t){var e=this,n=this.expect().text,r=kn(n,this.options,this.text);return f(function(e,n,i){return r(i||t(e,n))},{assign:function(r,i,o){var a=t(r,o);return a||t.assign(r,a={}),bn(a,n,i,e.text,e.options)}})},objectIndex:function(t){var e=this,r=this.expression();return this.consume("]"),f(function(i,o){var a,s,u=t(i,o),c=r(i,o);return mn(c,e.text),u?(a=yn(u[c],e.text),a&&a.then&&e.options.unwrapPromises&&(s=a,"$$v"in a||(s.$$v=n,s.then(function(t){s.$$v=t})),a=a.$$v),a):n},{assign:function(n,i,o){var a=mn(r(n,o),e.text),s=yn(t(n,o),e.text);return s||t.assign(n,s={}),s[a]=i}})},functionCall:function(t,e){var n=[];if(")"!==this.peekToken().text)do n.push(this.expression());while(this.expect(","));this.consume(")");var r=this;return function(i,o){for(var a=[],s=e?e(i,o):i,u=0;u<n.length;u++)a.push(yn(n[u](i,o),r.text));var c=t(i,o,s)||$;yn(s,r.text),wn(c,r.text);var l=c.apply?c.apply(s,a):c(a[0],a[1],a[2],a[3],a[4]);return yn(l,r.text)}},arrayDeclaration:function(){var t=[],e=!0;if("]"!==this.peekToken().text)do{if(this.peek("]"))break;var n=this.expression();t.push(n),n.constant||(e=!1)}while(this.expect(","));return this.consume("]"),f(function(e,n){for(var r=[],i=0;i<t.length;i++)r.push(t[i](e,n));return r},{literal:!0,constant:e})},object:function(){var t=[],e=!0;if("}"!==this.peekToken().text)do{if(this.peek("}"))break;var n=this.expect(),r=n.string||n.text;this.consume(":");var i=this.expression();t.push({key:r,value:i}),i.constant||(e=!1)}while(this.expect(","));return this.consume("}"),f(function(e,n){for(var r={},i=0;i<t.length;i++){var o=t[i];r[o.key]=o.value(e,n)}return r},{literal:!0,constant:e})}};var wi={},bi={},xi=r("$sce"),Si={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},Ci=e.createElement("a"),ki=Vn(t.location.href,!0);Ln.$inject=["$provide"],Bn.$inject=["$locale"],zn.$inject=["$locale"];var Ei=".",Ai={yyyy:Jn("FullYear",4),yy:Jn("FullYear",2,0,!0),y:Jn("FullYear",1),MMMM:Gn("Month"),MMM:Gn("Month",!0),MM:Jn("Month",2,1),M:Jn("Month",1,1),dd:Jn("Date",2),d:Jn("Date",1),HH:Jn("Hours",2),H:Jn("Hours",1),hh:Jn("Hours",2,-12),h:Jn("Hours",1,-12),mm:Jn("Minutes",2),m:Jn("Minutes",1),ss:Jn("Seconds",2),s:Jn("Seconds",1),sss:Jn("Milliseconds",3),EEEE:Gn("Day"),EEE:Gn("Day",!0),a:Kn,Z:Xn},Oi=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,Ti=/^\-?\d+$/;
Yn.$inject=["$locale"];var Mi=v(dr),Ni=v(gr);er.$inject=["$parse"];var Pi=v({restrict:"E",compile:function(t,n){return 8>=wr&&(n.href||n.name||n.$set("href",""),t.append(e.createComment("IE fix"))),n.href||n.xlinkHref||n.name?void 0:function(t,e){var n="[object SVGAnimatedString]"===Ar.call(e.prop("href"))?"xlink:href":"href";e.on("click",function(t){e.attr(n)||t.preventDefault()})}}}),ji={};o(Gr,function(t,e){if("multiple"!=t){var n=Fe("ng-"+e);ji[n]=function(){return{priority:100,link:function(t,r,i){t.$watch(i[n],function(t){i.$set(e,!!t)})}}}}}),o(["src","srcset","href"],function(t){var e=Fe("ng-"+t);ji[e]=function(){return{priority:99,link:function(n,r,i){var o=t,a=t;"href"===t&&"[object SVGAnimatedString]"===Ar.call(r.prop("href"))&&(a="xlinkHref",i.$attr[a]="xlink:href",o=null),i.$observe(e,function(e){return e?(i.$set(a,e),void(wr&&o&&r.prop(o,i[a]))):void("href"===t&&i.$set(a,null))})}}}});var Di={$addControl:$,$removeControl:$,$setValidity:$,$setDirty:$,$setPristine:$};rr.$inject=["$element","$attrs","$scope","$animate"];var Ri=function(t){return["$timeout",function(e){var r={name:"form",restrict:t?"EAC":"E",controller:rr,compile:function(){return{pre:function(t,r,i,o){if(!i.action){var a=function(t){t.preventDefault?t.preventDefault():t.returnValue=!1};Ur(r[0],"submit",a),r.on("$destroy",function(){e(function(){Vr(r[0],"submit",a)},0,!1)})}var s=r.parent().controller("form"),u=i.name||i.ngForm;u&&bn(t,u,o,u),s&&r.on("$destroy",function(){s.$removeControl(o),u&&bn(t,u,n,u),f(o,Di)})}}}};return r}]},_i=Ri(),qi=Ri(!0),Ui=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,Vi=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,Ii=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,Fi={text:sr,number:ur,url:cr,email:lr,radio:fr,checkbox:hr,hidden:$,button:$,submit:$,reset:$,file:$},Li=["badInput"],Hi=["$browser","$sniffer",function(t,e){return{restrict:"E",require:"?ngModel",link:function(n,r,i,o){o&&(Fi[dr(i.type)]||Fi.text)(n,r,i,o,e,t)}}}],Bi="ng-valid",zi="ng-invalid",Wi="ng-pristine",Qi="ng-dirty",Ji=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate",function(t,e,n,i,a,s){function u(t,e){e=e?"-"+Z(e,"-"):"",s.removeClass(i,(t?zi:Bi)+e),s.addClass(i,(t?Bi:zi)+e)}this.$viewValue=Number.NaN,this.$modelValue=Number.NaN,this.$parsers=[],this.$formatters=[],this.$viewChangeListeners=[],this.$pristine=!0,this.$dirty=!1,this.$valid=!0,this.$invalid=!1,this.$name=n.name;var c=a(n.ngModel),l=c.assign;if(!l)throw r("ngModel")("nonassign","Expression '{0}' is non-assignable. Element: {1}",n.ngModel,z(i));this.$render=$,this.$isEmpty=function(t){return g(t)||""===t||null===t||t!==t};var f=i.inheritedData("$formController")||Di,h=0,p=this.$error={};i.addClass(Wi),u(!0),this.$setValidity=function(t,e){p[t]!==!e&&(e?(p[t]&&h--,h||(u(!0),this.$valid=!0,this.$invalid=!1)):(u(!1),this.$invalid=!0,this.$valid=!1,h++),p[t]=!e,u(e,t),f.$setValidity(t,e,this))},this.$setPristine=function(){this.$dirty=!1,this.$pristine=!0,s.removeClass(i,Qi),s.addClass(i,Wi)},this.$setViewValue=function(n){this.$viewValue=n,this.$pristine&&(this.$dirty=!0,this.$pristine=!1,s.removeClass(i,Wi),s.addClass(i,Qi),f.$setDirty()),o(this.$parsers,function(t){n=t(n)}),this.$modelValue!==n&&(this.$modelValue=n,l(t,n),o(this.$viewChangeListeners,function(t){try{t()}catch(n){e(n)}}))};var d=this;t.$watch(function(){var e=c(t);if(d.$modelValue!==e){var n=d.$formatters,r=n.length;for(d.$modelValue=e;r--;)e=n[r](e);d.$viewValue!==e&&(d.$viewValue=e,d.$render())}return e})}],Gi=function(){return{require:["ngModel","^?form"],controller:Ji,link:function(t,e,n,r){var i=r[0],o=r[1]||Di;o.$addControl(i),t.$on("$destroy",function(){o.$removeControl(i)})}}},Xi=v({require:"ngModel",link:function(t,e,n,r){r.$viewChangeListeners.push(function(){t.$eval(n.ngChange)})}}),Ki=function(){return{require:"?ngModel",link:function(t,e,n,r){if(r){n.required=!0;var i=function(t){return n.required&&r.$isEmpty(t)?void r.$setValidity("required",!1):(r.$setValidity("required",!0),t)};r.$formatters.push(i),r.$parsers.unshift(i),n.$observe("required",function(){i(r.$viewValue)})}}}},Yi=function(){return{require:"ngModel",link:function(t,e,r,i){var a=/\/(.*)\//.exec(r.ngList),s=a&&new RegExp(a[1])||r.ngList||",",u=function(t){if(!g(t)){var e=[];return t&&o(t.split(s),function(t){t&&e.push(Pr(t))}),e}};i.$parsers.push(u),i.$formatters.push(function(t){return Nr(t)?t.join(", "):n}),i.$isEmpty=function(t){return!t||!t.length}}}},Zi=/^(true|false|\d+)$/,to=function(){return{priority:100,compile:function(t,e){return Zi.test(e.ngValue)?function(t,e,n){n.$set("value",t.$eval(n.ngValue))}:function(t,e,n){t.$watch(n.ngValue,function(t){n.$set("value",t)})}}}},eo=nr({compile:function(t){return t.addClass("ng-binding"),function(t,e,r){e.data("$binding",r.ngBind),t.$watch(r.ngBind,function(t){e.text(t==n?"":t)})}}}),no=["$interpolate",function(t){return function(e,n,r){var i=t(n.attr(r.$attr.ngBindTemplate));n.addClass("ng-binding").data("$binding",i),r.$observe("ngBindTemplate",function(t){n.text(t)})}}],ro=["$sce","$parse",function(t,e){return{compile:function(n){return n.addClass("ng-binding"),function(n,r,i){function o(){return(a(n)||"").toString()}r.data("$binding",i.ngBindHtml);var a=e(i.ngBindHtml);n.$watch(o,function(){r.html(t.getTrustedHtml(a(n))||"")})}}}}],io=pr("",!0),oo=pr("Odd",0),ao=pr("Even",1),so=nr({compile:function(t,e){e.$set("ngCloak",n),t.removeClass("ng-cloak")}}),uo=[function(){return{scope:!0,controller:"@",priority:500}}],co={},lo={blur:!0,focus:!0};o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(t){var e=Fe("ng-"+t);co[e]=["$parse","$rootScope",function(n,r){return{compile:function(i,o){var a=n(o[e],!0);return function(e,n){n.on(t,function(n){var i=function(){a(e,{$event:n})};lo[t]&&r.$$phase?e.$evalAsync(i):e.$apply(i)})}}}}]});var fo=["$animate",function(t){return{transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(n,r,i,o,a){var s,u,c;n.$watch(i.ngIf,function(o){B(o)?u||(u=n.$new(),a(u,function(n){n[n.length++]=e.createComment(" end ngIf: "+i.ngIf+" "),s={clone:n},t.enter(n,r.parent(),r)})):(c&&(c.remove(),c=null),u&&(u.$destroy(),u=null),s&&(c=oe(s.clone),t.leave(c,function(){c=null}),s=null))})}}}],ho=["$http","$templateCache","$anchorScroll","$animate","$sce",function(t,e,n,r,i){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:Tr.noop,compile:function(o,a){var s=a.ngInclude||a.src,u=a.onload||"",c=a.autoscroll;return function(o,a,l,f,h){var p,$,d,v=0,g=function(){$&&($.remove(),$=null),p&&(p.$destroy(),p=null),d&&(r.leave(d,function(){$=null}),$=d,d=null)};o.$watch(i.parseAsResourceUrl(s),function(i){var s=function(){!m(c)||c&&!o.$eval(c)||n()},l=++v;i?(t.get(i,{cache:e}).success(function(t){if(l===v){var e=o.$new();f.template=t;var n=h(e,function(t){g(),r.enter(t,null,a,s)});p=e,d=n,p.$emit("$includeContentLoaded"),o.$eval(u)}}).error(function(){l===v&&g()}),o.$emit("$includeContentRequested")):(g(),f.template=null)})}}}}],po=["$compile",function(t){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(e,n,r,i){n.html(i.template),t(n.contents())(e)}}}],$o=nr({priority:450,compile:function(){return{pre:function(t,e,n){t.$eval(n.ngInit)}}}}),vo=nr({terminal:!0,priority:1e3}),go=["$locale","$interpolate",function(t,e){var n=/{}/g;return{restrict:"EA",link:function(r,i,a){var s=a.count,u=a.$attr.when&&i.attr(a.$attr.when),c=a.offset||0,l=r.$eval(u)||{},f={},h=e.startSymbol(),p=e.endSymbol(),$=/^when(Minus)?(.+)$/;o(a,function(t,e){$.test(e)&&(l[dr(e.replace("when","").replace("Minus","-"))]=i.attr(a.$attr[e]))}),o(l,function(t,r){f[r]=e(t.replace(n,h+s+"-"+c+p))}),r.$watch(function(){var e=parseFloat(r.$eval(s));return isNaN(e)?"":(e in l||(e=t.pluralCat(e-c)),f[e](r,i,!0))},function(t){i.text(t)})}}}],mo=["$parse","$animate",function(t,n){function a(t){return t.clone[0]}function s(t){return t.clone[t.clone.length-1]}var u="$$NG_REMOVED",c=r("ngRepeat");return{transclude:"element",priority:1e3,terminal:!0,$$tlb:!0,link:function(r,l,f,h,p){var $,d,v,g,m,y,w,b,x,S=f.ngRepeat,C=S.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),k={$id:Me};if(!C)throw c("iexp","Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",S);if(y=C[1],w=C[2],$=C[3],$?(d=t($),v=function(t,e,n){return x&&(k[x]=t),k[b]=e,k.$index=n,d(r,k)}):(g=function(t,e){return Me(e)},m=function(t){return t}),C=y.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/),!C)throw c("iidexp","'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.",y);b=C[3]||C[1],x=C[2];var E={};r.$watchCollection(w,function(t){var f,h,$,d,y,w,C,k,A,O,T,M,N=l[0],P={},j=[];if(i(t))O=t,A=v||g;else{A=v||m,O=[];for(w in t)t.hasOwnProperty(w)&&"$"!=w.charAt(0)&&O.push(w);O.sort()}for(d=O.length,h=j.length=O.length,f=0;h>f;f++)if(w=t===O?f:O[f],C=t[w],k=A(w,C,f),re(k,"`track by` id"),E.hasOwnProperty(k))T=E[k],delete E[k],P[k]=T,j[f]=T;else{if(P.hasOwnProperty(k))throw o(j,function(t){t&&t.scope&&(E[t.id]=t)}),c("dupes","Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}",S,k,L(C));j[f]={id:k},P[k]=!1}for(w in E)E.hasOwnProperty(w)&&(T=E[w],M=oe(T.clone),n.leave(M),o(M,function(t){t[u]=!0}),T.scope.$destroy());for(f=0,h=O.length;h>f;f++){if(w=t===O?f:O[f],C=t[w],T=j[f],j[f-1]&&(N=s(j[f-1])),T.scope){y=T.scope,$=N;do $=$.nextSibling;while($&&$[u]);a(T)!=$&&n.move(oe(T.clone),null,br(N)),N=s(T)}else y=r.$new();y[b]=C,x&&(y[x]=w),y.$index=f,y.$first=0===f,y.$last=f===d-1,y.$middle=!(y.$first||y.$last),y.$odd=!(y.$even=0===(1&f)),T.scope||p(y,function(t){t[t.length++]=e.createComment(" end ngRepeat: "+S+" "),n.enter(t,null,br(N)),N=t,T.scope=y,T.clone=t,P[T.id]=T})}E=P})}}}],yo=["$animate",function(t){return function(e,n,r){e.$watch(r.ngShow,function(e){t[B(e)?"removeClass":"addClass"](n,"ng-hide")})}}],wo=["$animate",function(t){return function(e,n,r){e.$watch(r.ngHide,function(e){t[B(e)?"addClass":"removeClass"](n,"ng-hide")})}}],bo=nr(function(t,e,n){t.$watch(n.ngStyle,function(t,n){n&&t!==n&&o(n,function(t,n){e.css(n,"")}),t&&e.css(t)},!0)}),xo=["$animate",function(t){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(e,n,r,i){var a=r.ngSwitch||r.on,s=[],u=[],c=[],l=[];e.$watch(a,function(n){var a,f;for(a=0,f=c.length;f>a;++a)c[a].remove();for(c.length=0,a=0,f=l.length;f>a;++a){var h=u[a];l[a].$destroy(),c[a]=h,t.leave(h,function(){c.splice(a,1)})}u.length=0,l.length=0,(s=i.cases["!"+n]||i.cases["?"])&&(e.$eval(r.change),o(s,function(n){var r=e.$new();l.push(r),n.transclude(r,function(e){var r=n.element;u.push(e),t.enter(e,r.parent(),r)})}))})}}}],So=nr({transclude:"element",priority:800,require:"^ngSwitch",link:function(t,e,n,r,i){r.cases["!"+n.ngSwitchWhen]=r.cases["!"+n.ngSwitchWhen]||[],r.cases["!"+n.ngSwitchWhen].push({transclude:i,element:e})}}),Co=nr({transclude:"element",priority:800,require:"^ngSwitch",link:function(t,e,n,r,i){r.cases["?"]=r.cases["?"]||[],r.cases["?"].push({transclude:i,element:e})}}),ko=nr({link:function(t,e,n,i,o){if(!o)throw r("ngTransclude")("orphan","Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}",z(e));o(function(t){e.empty(),e.append(t)})}}),Eo=["$templateCache",function(t){return{restrict:"E",terminal:!0,compile:function(e,n){if("text/ng-template"==n.type){var r=n.id,i=e[0].text;t.put(r,i)}}}}],Ao=r("ngOptions"),Oo=v({terminal:!0}),To=["$compile","$parse",function(t,r){var i=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,s={$setViewValue:$};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(t,e,n){var r,i,o=this,a={},u=s;o.databound=n.ngModel,o.init=function(t,e,n){u=t,r=e,i=n},o.addOption=function(e){re(e,'"option value"'),a[e]=!0,u.$viewValue==e&&(t.val(e),i.parent()&&i.remove())},o.removeOption=function(t){this.hasOption(t)&&(delete a[t],u.$viewValue==t&&this.renderUnknownOption(t))},o.renderUnknownOption=function(e){var n="? "+Me(e)+" ?";i.val(n),t.prepend(i),t.val(n),i.prop("selected",!0)},o.hasOption=function(t){return a.hasOwnProperty(t)},e.$on("$destroy",function(){o.renderUnknownOption=$})}],link:function(s,u,c,l){function f(t,e,n,r){n.$render=function(){var t=n.$viewValue;r.hasOption(t)?(C.parent()&&C.remove(),e.val(t),""===t&&$.prop("selected",!0)):g(t)&&$?e.val(""):r.renderUnknownOption(t)},e.on("change",function(){t.$apply(function(){C.parent()&&C.remove(),n.$setViewValue(e.val())})})}function h(t,e,n){var r;n.$render=function(){var t=new Ne(n.$viewValue);o(e.find("option"),function(e){e.selected=m(t.get(e.value))})},t.$watch(function(){q(r,n.$viewValue)||(r=_(n.$viewValue),n.$render())}),e.on("change",function(){t.$apply(function(){var t=[];o(e.find("option"),function(e){e.selected&&t.push(e.value)}),n.$setViewValue(t)})})}function p(e,o,s){function u(){var t=!1;if(y){var n=s.$modelValue;if(k&&Nr(n)){t=new Ne([]);for(var r={},i=0;i<n.length;i++)r[h]=n[i],t.put(k(e,r),n[i])}else t=new Ne(n)}return t}function c(){var t,n,r,i,c,l,w,C,A,O,T,M,N,P,j,D={"":[]},R=[""],_=s.$modelValue,q=g(e)||[],U=p?a(q):q,V={},I=u();for(T=0;A=U.length,A>T;T++){if(w=T,p){if(w=U[T],"$"===w.charAt(0))continue;V[p]=w}if(V[h]=q[w],t=$(e,V)||"",(n=D[t])||(n=D[t]=[],R.push(t)),y)M=m(I.remove(k?k(e,V):v(e,V)));else{if(k){var F={};F[h]=_,M=k(e,F)===k(e,V)}else M=_===v(e,V);I=I||M}j=f(e,V),j=m(j)?j:"",n.push({id:k?k(e,V):p?U[T]:T,label:j,selected:M})}for(y||(b||null===_?D[""].unshift({id:"",label:"",selected:!I}):I||D[""].unshift({id:"?",label:"",selected:!0})),O=0,C=R.length;C>O;O++){for(t=R[O],n=D[t],E.length<=O?(i={element:S.clone().attr("label",t),label:n.label},c=[i],E.push(c),o.append(i.element)):(c=E[O],i=c[0],i.label!=t&&i.element.attr("label",i.label=t)),N=null,T=0,A=n.length;A>T;T++)r=n[T],(l=c[T+1])?(N=l.element,l.label!==r.label&&(N.text(l.label=r.label),N.prop("label",l.label)),l.id!==r.id&&N.val(l.id=r.id),N[0].selected!==r.selected&&(N.prop("selected",l.selected=r.selected),wr&&N.prop("selected",l.selected))):(""===r.id&&b?P=b:(P=x.clone()).val(r.id).prop("selected",r.selected).attr("selected",r.selected).prop("label",r.label).text(r.label),c.push(l={element:P,label:r.label,id:r.id,selected:r.selected}),d.addOption(r.label,P),N?N.after(P):i.element.append(P),N=P);for(T++;c.length>T;)r=c.pop(),d.removeOption(r.label),r.element.remove()}for(;E.length>O;)E.pop()[0].element.remove()}var l;if(!(l=w.match(i)))throw Ao("iexp","Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}",w,z(o));var f=r(l[2]||l[1]),h=l[4]||l[6],p=l[5],$=r(l[3]||""),v=r(l[2]?l[1]:h),g=r(l[7]),C=l[8],k=C?r(l[8]):null,E=[[{element:o,label:""}]];b&&(t(b)(e),b.removeClass("ng-scope"),b.remove()),o.empty(),o.on("change",function(){e.$apply(function(){var t,r,i,a,u,l,f,$,d,m=g(e)||[],w={};if(y){for(i=[],l=0,$=E.length;$>l;l++)for(t=E[l],u=1,f=t.length;f>u;u++)if((a=t[u].element)[0].selected){if(r=a.val(),p&&(w[p]=r),k)for(d=0;d<m.length&&(w[h]=m[d],k(e,w)!=r);d++);else w[h]=m[r];i.push(v(e,w))}}else if(r=o.val(),"?"==r)i=n;else if(""===r)i=null;else if(k){for(d=0;d<m.length;d++)if(w[h]=m[d],k(e,w)==r){i=v(e,w);break}}else w[h]=m[r],p&&(w[p]=r),i=v(e,w);s.$setViewValue(i),c()})}),s.$render=c,e.$watchCollection(g,c),e.$watchCollection(function(){var t={},n=g(e);if(n){for(var r=new Array(n.length),i=0,o=n.length;o>i;i++)t[h]=n[i],r[i]=f(e,t);return r}},c),y&&e.$watchCollection(function(){return s.$modelValue},c)}if(l[1]){for(var $,d=l[0],v=l[1],y=c.multiple,w=c.ngOptions,b=!1,x=br(e.createElement("option")),S=br(e.createElement("optgroup")),C=x.clone(),k=0,E=u.children(),A=E.length;A>k;k++)if(""===E[k].value){$=b=E.eq(k);break}d.init(v,b,C),y&&(v.$isEmpty=function(t){return!t||0===t.length}),w?p(s,u,v):y?h(s,u,v):f(s,u,v,d)}}}}],Mo=["$interpolate",function(t){var e={addOption:$,removeOption:$};return{restrict:"E",priority:100,compile:function(n,r){if(g(r.value)){var i=t(n.text(),!0);i||r.$set("value",n.text())}return function(t,n,r){var o="$selectController",a=n.parent(),s=a.data(o)||a.parent().data(o);s&&s.databound?n.prop("selected",!1):s=e,i?t.$watch(i,function(t,e){r.$set("value",t),t!==e&&s.removeOption(e),s.addOption(t)}):s.addOption(r.value),n.on("$destroy",function(){s.removeOption(r.value)})}}}}],No=v({restrict:"E",terminal:!0});return t.angular.bootstrap?void console.log("WARNING: Tried to load angular more than once."):(te(),se(Tr),void br(e).ready(function(){K(e,Y)}))}(window,document),!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>');
angular.module("ui.config",[]).value("ui.config",{}),angular.module("ui.filters",["ui.config"]),angular.module("ui.directives",["ui.config"]),angular.module("ui",["ui.filters","ui.directives","ui.config"]),angular.module("ui.directives").directive("uiAnimate",["ui.config","$timeout",function(e,i){var n={};return angular.isString(e.animate)?n["class"]=e.animate:e.animate&&(n=e.animate),{restrict:"A",link:function(e,t,r){var a={};r.uiAnimate&&(a=e.$eval(r.uiAnimate),angular.isString(a)&&(a={"class":a})),a=angular.extend({"class":"ui-animate"},n,a),t.addClass(a["class"]),i(function(){t.removeClass(a["class"])},20,!1)}}}]),angular.module("ui.directives").directive("uiCalendar",["ui.config","$parse",function(e){return e.uiCalendar=e.uiCalendar||{},{require:"ngModel",restrict:"A",link:function(i,n,t){function r(){i.calendar=n.html("");var r=i.calendar.fullCalendar("getView");r&&(r=r.name);var u,o={defaultView:r,eventSources:a};u=t.uiCalendar?i.$eval(t.uiCalendar):{},angular.extend(o,e.uiCalendar,u),i.calendar.fullCalendar(o)}var a=i.$eval(t.ngModel),u=0,o=function(){var e=i.$eval(t.equalsTracker);return u=0,angular.forEach(a,function(e){angular.isArray(e)&&(u+=e.length)}),angular.isNumber(e)?u+a.length+e:u+a.length};r(),i.$watch(o,function(){r()})}}}]),angular.module("ui.directives").directive("uiCodemirror",["ui.config","$timeout",function(e,i){"use strict";var n=["cursorActivity","viewportChange","gutterClick","focus","blur","scroll","update"];return{restrict:"A",require:"ngModel",link:function(t,r,a,u){var o,l,c,s,d;if("textarea"!==r[0].type)throw new Error("uiCodemirror3 can only be applied to a textarea element");o=e.codemirror||{},l=angular.extend({},o,t.$eval(a.uiCodemirror)),c=function(e){return function(i,n){var r=i.getValue();r!==u.$viewValue&&(u.$setViewValue(r),t.$apply()),"function"==typeof e&&e(i,n)}},s=function(){d=CodeMirror.fromTextArea(r[0],l),d.on("change",c(l.onChange));for(var e,o=0,s=n.length;s>o;++o)e=l["on"+n[o].charAt(0).toUpperCase()+n[o].slice(1)],void 0!==e&&"function"==typeof e&&d.on(n[o],e);u.$formatters.push(function(e){if(angular.isUndefined(e)||null===e)return"";if(angular.isObject(e)||angular.isArray(e))throw new Error("ui-codemirror cannot use an object or an array as a model");return e}),u.$render=function(){d.setValue(u.$viewValue)},a.uiRefresh&&t.$watch(a.uiRefresh,function(e,n){e!==n&&i(d.refresh)})},i(s)}}}]),angular.module("ui.directives").directive("uiCurrency",["ui.config","currencyFilter",function(e,i){var n={pos:"ui-currency-pos",neg:"ui-currency-neg",zero:"ui-currency-zero"};return e.currency&&angular.extend(n,e.currency),{restrict:"EAC",require:"ngModel",link:function(e,t,r,a){var u,o,l;u=angular.extend({},n,e.$eval(r.uiCurrency)),o=function(e){var n;return n=1*e,t.toggleClass(u.pos,n>0),t.toggleClass(u.neg,0>n),t.toggleClass(u.zero,0===n),t.text(""===e?"":i(n,u.symbol)),!0},a.$render=function(){l=a.$viewValue,t.val(l),o(l)}}}}]),angular.module("ui.directives").directive("uiDate",["ui.config",function(e){"use strict";var i;return i={},angular.isObject(e.date)&&angular.extend(i,e.date),{require:"?ngModel",link:function(i,n,t,r){var a=function(){return angular.extend({},e.date,i.$eval(t.uiDate))},u=function(){var e=a();if(r){var t=function(){i.$apply(function(){var e=n.datepicker("getDate");n.datepicker("setDate",n.val()),r.$setViewValue(e),n.blur()})};if(e.onSelect){var u=e.onSelect;e.onSelect=function(e,n){t(),i.$apply(function(){u(e,n)})}}else e.onSelect=t;n.bind("change",t),r.$render=function(){var e=r.$viewValue;if(angular.isDefined(e)&&null!==e&&!angular.isDate(e))throw new Error("ng-Model value must be a Date object - currently it is a "+typeof e+" - use ui-date-format to convert it from a string");n.datepicker("setDate",e)}}n.datepicker("destroy"),n.datepicker(e),r&&r.$render()};i.$watch(a,u,!0)}}}]).directive("uiDateFormat",["ui.config",function(e){var i={require:"ngModel",link:function(i,n,t,r){var a=t.uiDateFormat||e.dateFormat;a?(r.$formatters.push(function(e){return angular.isString(e)?$.datepicker.parseDate(a,e):void 0}),r.$parsers.push(function(e){return e?$.datepicker.formatDate(a,e):void 0})):(r.$formatters.push(function(e){return angular.isString(e)?new Date(e):void 0}),r.$parsers.push(function(e){return e?e.toISOString():void 0}))}};return i}]),angular.module("ui.directives").directive("uiEvent",["$parse",function(e){return function(i,n,t){var r=i.$eval(t.uiEvent);angular.forEach(r,function(t,r){var a=e(t);n.bind(r,function(e){var n=Array.prototype.slice.call(arguments);n=n.splice(1),i.$apply(function(){a(i,{$event:e,$params:n})})})})}}]),angular.module("ui.directives").directive("uiIf",[function(){return{transclude:"element",priority:1e3,terminal:!0,restrict:"A",compile:function(e,i,n){return function(e,i,t){var r,a;e.$watch(t.uiIf,function(t){r&&(r.remove(),r=void 0),a&&(a.$destroy(),a=void 0),t&&(a=e.$new(),n(a,function(e){r=e,i.after(e)}))})}}}}]),angular.module("ui.directives").directive("uiJq",["ui.config","$timeout",function(e,i){return{restrict:"A",compile:function(n,t){if(!angular.isFunction(n[t.uiJq]))throw new Error('ui-jq: The "'+t.uiJq+'" function does not exist');var r=e.jq&&e.jq[t.uiJq];return function(e,n,t){function a(){i(function(){n[t.uiJq].apply(n,u)},0,!1)}var u=[];t.uiOptions?(u=e.$eval("["+t.uiOptions+"]"),angular.isObject(r)&&angular.isObject(u[0])&&(u[0]=angular.extend({},r,u[0]))):r&&(u=[r]),t.ngModel&&n.is("select,input,textarea")&&n.on("change",function(){n.trigger("input")}),t.uiRefresh&&e.$watch(t.uiRefresh,function(){a()}),a()}}}}]),angular.module("ui.directives").factory("keypressHelper",["$parse",function(e){var i={8:"backspace",9:"tab",13:"enter",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"delete"},n=function(e){return e.charAt(0).toUpperCase()+e.slice(1)};return function(t,r,a,u){var o,l=[];o=r.$eval(u["ui"+n(t)]),angular.forEach(o,function(i,n){var t,r;r=e(i),angular.forEach(n.split(" "),function(e){t={expression:r,keys:{}},angular.forEach(e.split("-"),function(e){t.keys[e]=!0}),l.push(t)})}),a.bind(t,function(e){var n=e.metaKey||e.altKey,a=e.ctrlKey,u=e.shiftKey,o=e.keyCode;"keypress"===t&&!u&&o>=97&&122>=o&&(o-=32),angular.forEach(l,function(t){var o=t.keys[i[e.keyCode]]||t.keys[e.keyCode.toString()]||!1,l=t.keys.alt||!1,c=t.keys.ctrl||!1,s=t.keys.shift||!1;o&&l==n&&c==a&&s==u&&r.$apply(function(){t.expression(r,{$event:e})})})})}}]),angular.module("ui.directives").directive("uiKeydown",["keypressHelper",function(e){return{link:function(i,n,t){e("keydown",i,n,t)}}}]),angular.module("ui.directives").directive("uiKeypress",["keypressHelper",function(e){return{link:function(i,n,t){e("keypress",i,n,t)}}}]),angular.module("ui.directives").directive("uiKeyup",["keypressHelper",function(e){return{link:function(i,n,t){e("keyup",i,n,t)}}}]),function(){function e(e,i,n,t){angular.forEach(i.split(" "),function(i){var r={type:"map-"+i};google.maps.event.addListener(n,i,function(i){t.triggerHandler(angular.extend({},r,i)),e.$$phase||e.$apply()})})}function i(i,t){n.directive(i,[function(){return{restrict:"A",link:function(n,r,a){n.$watch(a[i],function(i){e(n,t,i,r)})}}}])}var n=angular.module("ui.directives");n.directive("uiMap",["ui.config","$parse",function(i,n){var t="bounds_changed center_changed click dblclick drag dragend dragstart heading_changed idle maptypeid_changed mousemove mouseout mouseover projection_changed resize rightclick tilesloaded tilt_changed zoom_changed",r=i.map||{};return{restrict:"A",link:function(i,a,u){var o=angular.extend({},r,i.$eval(u.uiOptions)),l=new google.maps.Map(a[0],o),c=n(u.uiMap);c.assign(i,l),e(i,t,l,a)}}}]),n.directive("uiMapInfoWindow",["ui.config","$parse","$compile",function(i,n,t){var r="closeclick content_change domready position_changed zindex_changed",a=i.mapInfoWindow||{};return{link:function(i,u,o){var l=angular.extend({},a,i.$eval(o.uiOptions));l.content=u[0];var c=n(o.uiMapInfoWindow),s=c(i);s||(s=new google.maps.InfoWindow(l),c.assign(i,s)),e(i,r,s,u),u.replaceWith("<div></div>");var d=s.open;s.open=function(e,n,r,a,o,l){t(u.contents())(i),d.call(s,e,n,r,a,o,l)}}}}]),i("uiMapMarker","animation_changed click clickable_changed cursor_changed dblclick drag dragend draggable_changed dragstart flat_changed icon_changed mousedown mouseout mouseover mouseup position_changed rightclick shadow_changed shape_changed title_changed visible_changed zindex_changed"),i("uiMapPolyline","click dblclick mousedown mousemove mouseout mouseover mouseup rightclick"),i("uiMapPolygon","click dblclick mousedown mousemove mouseout mouseover mouseup rightclick"),i("uiMapRectangle","bounds_changed click dblclick mousedown mousemove mouseout mouseover mouseup rightclick"),i("uiMapCircle","center_changed click dblclick mousedown mousemove mouseout mouseover mouseup radius_changed rightclick"),i("uiMapGroundOverlay","click dblclick")}(),angular.module("ui.directives").directive("uiMask",[function(){return{require:"ngModel",link:function(e,i,n,t){t.$render=function(){var r=t.$viewValue||"";i.val(r),i.mask(e.$eval(n.uiMask))},t.$parsers.push(function(e){var n=i.isMaskValid()||angular.isUndefined(i.isMaskValid())&&i.val().length>0;return t.$setValidity("mask",n),n?e:void 0}),i.bind("keyup",function(){e.$apply(function(){t.$setViewValue(i.mask())})})}}}]),angular.module("ui.directives").directive("uiReset",["ui.config",function(e){var i=null;return void 0!==e.reset&&(i=e.reset),{require:"ngModel",link:function(e,n,t,r){var a;a=angular.element('<a class="ui-reset" />'),n.wrap('<span class="ui-resetwrap" />').after(a),a.bind("click",function(n){n.preventDefault(),e.$apply(function(){r.$setViewValue(t.uiReset?e.$eval(t.uiReset):i),r.$render()})})}}}]),angular.module("ui.directives").directive("uiRoute",["$location","$parse",function(e,i){return{restrict:"AC",compile:function(n,t){var r;if(t.uiRoute)r="uiRoute";else if(t.ngHref)r="ngHref";else{if(!t.href)throw new Error("uiRoute missing a route or href property on "+n[0]);r="href"}return function(n,t,a){function u(i){(hash=i.indexOf("#"))>-1&&(i=i.substr(hash+1)),(c=function(){l(n,e.path().indexOf(i)>-1)})()}function o(i){(hash=i.indexOf("#"))>-1&&(i=i.substr(hash+1)),(c=function(){var t=new RegExp("^"+i+"$",["i"]);l(n,t.test(e.path()))})()}var l=i(a.ngModel||a.routeModel||"$uiRoute").assign,c=angular.noop;switch(r){case"uiRoute":a.uiRoute?o(a.uiRoute):a.$observe("uiRoute",o);break;case"ngHref":a.ngHref?u(a.ngHref):a.$observe("ngHref",u);break;case"href":u(a.href)}n.$on("$routeChangeSuccess",function(){c()})}}}}]),angular.module("ui.directives").directive("uiScrollfix",["$window",function(e){"use strict";return{link:function(i,n,t){var r=n.offset().top;t.uiScrollfix?"-"===t.uiScrollfix.charAt(0)?t.uiScrollfix=r-t.uiScrollfix.substr(1):"+"===t.uiScrollfix.charAt(0)&&(t.uiScrollfix=r+parseFloat(t.uiScrollfix.substr(1))):t.uiScrollfix=r,angular.element(e).on("scroll.ui-scrollfix",function(){var i;if(angular.isDefined(e.pageYOffset))i=e.pageYOffset;else{var r=document.compatMode&&"BackCompat"!==document.compatMode?document.documentElement:document.body;i=r.scrollTop}!n.hasClass("ui-scrollfix")&&i>t.uiScrollfix?n.addClass("ui-scrollfix"):n.hasClass("ui-scrollfix")&&i<t.uiScrollfix&&n.removeClass("ui-scrollfix")})}}}]),angular.module("ui.directives").directive("uiSelect2",["ui.config","$timeout",function(e,i){var n={};return e.select2&&angular.extend(n,e.select2),{require:"?ngModel",compile:function(e,t){var r,a,u,o=e.is("select"),l=void 0!==t.multiple;return e.is("select")&&(a=e.find("option[ng-repeat], option[data-ng-repeat]"),a.length&&(u=a.attr("ng-repeat")||a.attr("data-ng-repeat"),r=jQuery.trim(u.split("|")[0]).split(" ").pop())),function(e,t,a,u){var c=angular.extend({},n,e.$eval(a.uiSelect2));if(o?(delete c.multiple,delete c.initSelection):l&&(c.multiple=!0),u&&(u.$render=function(){o?t.select2("val",u.$modelValue):l?u.$modelValue?angular.isArray(u.$modelValue)?t.select2("data",u.$modelValue):t.select2("val",u.$modelValue):t.select2("data",[]):angular.isObject(u.$modelValue)?t.select2("data",u.$modelValue):t.select2("val",u.$modelValue)},r&&e.$watch(r,function(e){e&&i(function(){t.select2("val",u.$viewValue),t.trigger("change")})}),!o&&(t.bind("change",function(){e.$apply(function(){u.$setViewValue(t.select2("data"))})}),c.initSelection))){var s=c.initSelection;c.initSelection=function(e,i){s(e,function(e){u.$setViewValue(e),i(e)})}}a.$observe("disabled",function(e){t.select2(e&&"disable"||"enable")}),a.ngMultiple&&e.$watch(a.ngMultiple,function(){t.select2(c)}),t.val(e.$eval(a.ngModel)),i(function(){t.select2(c),c.initSelection||o||u.$setViewValue(t.select2("data"))})}}}}]),angular.module("ui.directives").directive("uiShow",[function(){return function(e,i,n){e.$watch(n.uiShow,function(e){e?i.addClass("ui-show"):i.removeClass("ui-show")})}}]).directive("uiHide",[function(){return function(e,i,n){e.$watch(n.uiHide,function(e){e?i.addClass("ui-hide"):i.removeClass("ui-hide")})}}]).directive("uiToggle",[function(){return function(e,i,n){e.$watch(n.uiToggle,function(e){e?i.removeClass("ui-hide").addClass("ui-show"):i.removeClass("ui-show").addClass("ui-hide")})}}]),angular.module("ui.directives").directive("uiSortable",["ui.config",function(e){return{require:"?ngModel",link:function(i,n,t,r){var a,u,o,l,c,s,d,f,g;c=angular.extend({},e.sortable,i.$eval(t.uiSortable)),r&&(r.$render=function(){n.sortable("refresh")},o=function(e,i){i.item.sortable={index:i.item.index()}},l=function(e,i){i.item.sortable.resort=r},a=function(e,i){i.item.sortable.relocate=!0,r.$modelValue.splice(i.item.index(),0,i.item.sortable.moved)},u=function(e,i){i.item.sortable.moved=1===r.$modelValue.length?r.$modelValue.splice(0,1)[0]:r.$modelValue.splice(i.item.sortable.index,1)[0]},onStop=function(e,n){if(n.item.sortable.resort&&!n.item.sortable.relocate){var t,r;r=n.item.sortable.index,t=n.item.index(),t>r&&t--,n.item.sortable.resort.$modelValue.splice(t,0,n.item.sortable.resort.$modelValue.splice(r,1)[0])}(n.item.sortable.resort||n.item.sortable.relocate)&&i.$apply()},f=c.start,c.start=function(e,i){o(e,i),"function"==typeof f&&f(e,i)},_stop=c.stop,c.stop=function(e,i){onStop(e,i),"function"==typeof _stop&&_stop(e,i)},g=c.update,c.update=function(e,i){l(e,i),"function"==typeof g&&g(e,i)},s=c.receive,c.receive=function(e,i){a(e,i),"function"==typeof s&&s(e,i)},d=c.remove,c.remove=function(e,i){u(e,i),"function"==typeof d&&d(e,i)}),n.sortable(c)}}}]),angular.module("ui.directives").directive("uiTinymce",["ui.config",function(e){return e.tinymce=e.tinymce||{},{require:"ngModel",link:function(i,n,t,r){var a,u={onchange_callback:function(e){e.isDirty()&&(e.save(),r.$setViewValue(n.val()),i.$$phase||i.$apply())},handle_event_callback:function(){return this.isDirty()&&(this.save(),r.$setViewValue(n.val()),i.$$phase||i.$apply()),!0},setup:function(e){e.onSetContent.add(function(e){e.isDirty()&&(e.save(),r.$setViewValue(n.val()),i.$$phase||i.$apply())})}};a=t.uiTinymce?i.$eval(t.uiTinymce):{},angular.extend(u,e.tinymce,a),setTimeout(function(){n.tinymce(u)})}}}]),angular.module("ui.directives").directive("uiValidate",function(){return{restrict:"A",require:"ngModel",link:function(e,i,n,t){var r,a,u={},o=e.$eval(n.uiValidate);o&&(angular.isString(o)&&(o={validator:o}),angular.forEach(o,function(i,n){r=function(r){return e.$eval(i,{$value:r})?(t.$setValidity(n,!0),r):void t.$setValidity(n,!1)},u[n]=r,t.$formatters.push(r),t.$parsers.push(r)}),n.uiValidateWatch&&(a=e.$eval(n.uiValidateWatch),angular.isString(a)?e.$watch(a,function(){angular.forEach(u,function(e){e(t.$modelValue)})}):angular.forEach(a,function(i,n){e.$watch(i,function(){u[n](t.$modelValue)})})))}}}),angular.module("ui.filters").filter("format",function(){return function(e,i){if(!e)return e;var n,t=e.toString();return void 0===i?t:angular.isArray(i)||angular.isObject(i)?(n=angular.isArray(i)&&"$"||":",angular.forEach(i,function(e,i){t=t.split(n+i).join(e)}),t):t.split("$0").join(i)}}),angular.module("ui.filters").filter("highlight",function(){return function(e,i,n){return i||angular.isNumber(i)?(e=e.toString(),i=i.toString(),n?e.split(i).join('<span class="ui-match">'+i+"</span>"):e.replace(new RegExp(i,"gi"),'<span class="ui-match">$&</span>')):e}}),angular.module("ui.filters").filter("inflector",function(){function e(e){return e.replace(/^([a-z])|\s+([a-z])/g,function(e){return e.toUpperCase()})}function i(e,i){return e.replace(/[A-Z]/g,function(e){return i+e})}var n={humanize:function(n){return e(i(n," ").split("_").join(" "))},underscore:function(e){return e.substr(0,1).toLowerCase()+i(e.substr(1),"_").toLowerCase().split(" ").join("_")},variable:function(i){return i=i.substr(0,1).toLowerCase()+e(i.split("_").join(" ")).substr(1).split(" ").join("")}};return function(e,i){return i!==!1&&angular.isString(e)?(i=i||"humanize",n[i](e)):e}}),angular.module("ui.filters").filter("unique",function(){return function(e,i){if(i===!1)return e;if((i||angular.isUndefined(i))&&angular.isArray(e)){var n=[],t=function(e){return angular.isObject(e)&&angular.isString(i)?e[i]:e};angular.forEach(e,function(e){for(var i=!1,r=0;r<n.length;r++)if(angular.equals(t(n[r]),t(e))){i=!0;break}i||n.push(e)}),e=n}return e}});
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(e,t,r){"use strict";function n(e,t){return D(new(D(function(){},{prototype:e})),t)}function i(e){return R(arguments,function(t){t!==e&&R(t,function(t,r){e.hasOwnProperty(r)||(e[r]=t)})}),e}function a(e,t){var r=[];for(var n in e.path){if(e.path[n]!==t.path[n])break;r.push(e.path[n])}return r}function o(e){if(Object.keys)return Object.keys(e);var r=[];return t.forEach(e,function(e,t){r.push(t)}),r}function u(e,t){if(Array.prototype.indexOf)return e.indexOf(t,Number(arguments[2])||0);var r=e.length>>>0,n=Number(arguments[2])||0;for(n=0>n?Math.ceil(n):Math.floor(n),0>n&&(n+=r);r>n;n++)if(n in e&&e[n]===t)return n;return-1}function s(e,t,r,n){var i,s=a(r,n),l={},c=[];for(var f in s)if(s[f].params&&(i=o(s[f].params),i.length))for(var p in i)u(c,i[p])>=0||(c.push(i[p]),l[i[p]]=e[i[p]]);return D({},l,t)}function l(e,t,r){if(!r){r=[];for(var n in e)r.push(n)}for(var i=0;i<r.length;i++){var a=r[i];if(e[a]!=t[a])return!1}return!0}function c(e,t){var r={};return R(e,function(e){r[e]=t[e]}),r}function f(e){var t={},r=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var n in e)-1==u(r,n)&&(t[n]=e[n]);return t}function p(e,t){var r=N(e),n=r?[]:{};return R(e,function(e,i){t(e,i)&&(n[r?n.length:i]=e)}),n}function h(e,t){var r=N(e)?[]:{};return R(e,function(e,n){r[n]=t(e,n)}),r}function v(e,t){var n=1,a=2,s={},l=[],c=s,p=D(e.when(s),{$$promises:s,$$values:s});this.study=function(s){function h(e,r){if(g[r]!==a){if(m.push(r),g[r]===n)throw m.splice(0,u(m,r)),new Error("Cyclic dependency: "+m.join(" -> "));if(g[r]=n,M(e))d.push(r,[function(){return t.get(e)}],l);else{var i=t.annotate(e);R(i,function(e){e!==r&&s.hasOwnProperty(e)&&h(s[e],e)}),d.push(r,e,i)}m.pop(),g[r]=a}}function v(e){return F(e)&&e.then&&e.$$promises}if(!F(s))throw new Error("'invocables' must be an object");var $=o(s||{}),d=[],m=[],g={};return R(s,h),s=m=g=null,function(n,a,o){function u(){--y||(b||i(w,a.$$values),m.$$values=w,m.$$promises=m.$$promises||!0,delete m.$$inheritedValues,h.resolve(w))}function s(e){m.$$failure=e,h.reject(e)}function l(r,i,a){function l(e){f.reject(e),s(e)}function c(){if(!I(m.$$failure))try{f.resolve(t.invoke(i,o,w)),f.promise.then(function(e){w[r]=e,u()},l)}catch(e){l(e)}}var f=e.defer(),p=0;R(a,function(e){g.hasOwnProperty(e)&&!n.hasOwnProperty(e)&&(p++,g[e].then(function(t){w[e]=t,--p||c()},l))}),p||c(),g[r]=f.promise}if(v(n)&&o===r&&(o=a,a=n,n=null),n){if(!F(n))throw new Error("'locals' must be an object")}else n=c;if(a){if(!v(a))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else a=p;var h=e.defer(),m=h.promise,g=m.$$promises={},w=D({},n),y=1+d.length/3,b=!1;if(I(a.$$failure))return s(a.$$failure),m;a.$$inheritedValues&&i(w,f(a.$$inheritedValues,$)),D(g,a.$$promises),a.$$values?(b=i(w,f(a.$$values,$)),m.$$inheritedValues=f(a.$$values,$),u()):(a.$$inheritedValues&&(m.$$inheritedValues=f(a.$$inheritedValues,$)),a.then(u,s));for(var E=0,S=d.length;S>E;E+=3)n.hasOwnProperty(d[E])?u():l(d[E],d[E+1],d[E+2]);return m}},this.resolve=function(e,t,r,n){return this.study(e)(t,r,n)}}function $(e,t,r){this.fromConfig=function(e,t,r){return I(e.template)?this.fromString(e.template,t):I(e.templateUrl)?this.fromUrl(e.templateUrl,t):I(e.templateProvider)?this.fromProvider(e.templateProvider,t,r):null},this.fromString=function(e,t){return V(e)?e(t):e},this.fromUrl=function(r,n){return V(r)&&(r=r(n)),null==r?null:e.get(r,{cache:t,headers:{Accept:"text/html"}}).then(function(e){return e.data})},this.fromProvider=function(e,t,n){return r.invoke(e,null,n||{params:t})}}function d(e,t,i){function a(t,r,n,i){if(d.push(t),v[t])return v[t];if(!/^\w+(-+\w+)*(?:\[\])?$/.test(t))throw new Error("Invalid parameter name '"+t+"' in pattern '"+e+"'");if($[t])throw new Error("Duplicate parameter name '"+t+"' in pattern '"+e+"'");return $[t]=new T.Param(t,r,n,i),$[t]}function o(e,t,r){var n=["",""],i=e.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!t)return i;switch(r){case!1:n=["(",")"];break;case!0:n=["?(",")?"];break;default:n=["("+r+"|",")?"]}return i+n[0]+t+n[1]}function u(r,i){var a,o,u,s,l;return a=r[2]||r[3],l=t.params[a],u=e.substring(p,r.index),o=i?r[4]:r[4]||("*"==r[1]?".*":null),s=T.type(o||"string")||n(T.type("string"),{pattern:new RegExp(o)}),{id:a,regexp:o,segment:u,type:s,cfg:l}}t=D({params:{}},F(t)?t:{});var s,l=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,c=/([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,f="^",p=0,h=this.segments=[],v=i?i.params:{},$=this.params=i?i.params.$$new():new T.ParamSet,d=[];this.source=e;for(var m,g,w;(s=l.exec(e))&&(m=u(s,!1),!(m.segment.indexOf("?")>=0));)g=a(m.id,m.type,m.cfg,"path"),f+=o(m.segment,g.type.pattern.source,g.squash),h.push(m.segment),p=l.lastIndex;w=e.substring(p);var y=w.indexOf("?");if(y>=0){var b=this.sourceSearch=w.substring(y);if(w=w.substring(0,y),this.sourcePath=e.substring(0,p+y),b.length>0)for(p=0;s=c.exec(b);)m=u(s,!0),g=a(m.id,m.type,m.cfg,"search"),p=l.lastIndex}else this.sourcePath=e,this.sourceSearch="";f+=o(w)+(t.strict===!1?"/?":"")+"$",h.push(w),this.regexp=new RegExp(f,t.caseInsensitive?"i":r),this.prefix=h[0],this.$$paramNames=d}function m(e){D(this,e)}function g(){function e(e){return null!=e?e.toString().replace(/\//g,"%2F"):e}function i(e){return null!=e?e.toString().replace(/%2F/g,"/"):e}function a(e){return this.pattern.test(e)}function s(){return{strict:w,caseInsensitive:$}}function l(e){return V(e)||N(e)&&V(e[e.length-1])}function c(){for(;S.length;){var e=S.shift();if(e.pattern)throw new Error("You cannot override a type's .pattern at runtime.");t.extend(b[e.name],v.invoke(e.def))}}function f(e){D(this,e||{})}T=this;var v,$=!1,w=!0,y=!1,b={},E=!0,S=[],x={string:{encode:e,decode:i,is:a,pattern:/[^/]*/},"int":{encode:e,decode:function(e){return parseInt(e,10)},is:function(e){return I(e)&&this.decode(e.toString())===e},pattern:/\d+/},bool:{encode:function(e){return e?1:0},decode:function(e){return 0!==parseInt(e,10)},is:function(e){return e===!0||e===!1},pattern:/0|1/},date:{encode:function(e){return this.is(e)?[e.getFullYear(),("0"+(e.getMonth()+1)).slice(-2),("0"+e.getDate()).slice(-2)].join("-"):r},decode:function(e){if(this.is(e))return e;var t=this.capture.exec(e);return t?new Date(t[1],t[2]-1,t[3]):r},is:function(e){return e instanceof Date&&!isNaN(e.valueOf())},equals:function(e,t){return this.is(e)&&this.is(t)&&e.toISOString()===t.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:t.toJson,decode:t.fromJson,is:t.isObject,equals:t.equals,pattern:/[^/]*/},any:{encode:t.identity,decode:t.identity,is:t.identity,equals:t.equals,pattern:/.*/}};g.$$getDefaultValue=function(e){if(!l(e.value))return e.value;if(!v)throw new Error("Injectable functions cannot be called at configuration time");return v.invoke(e.value)},this.caseInsensitive=function(e){return I(e)&&($=e),$},this.strictMode=function(e){return I(e)&&(w=e),w},this.defaultSquashPolicy=function(e){if(!I(e))return y;if(e!==!0&&e!==!1&&!M(e))throw new Error("Invalid squash policy: "+e+". Valid policies: false, true, arbitrary-string");return y=e,e},this.compile=function(e,t){return new d(e,D(s(),t))},this.isMatcher=function(e){if(!F(e))return!1;var t=!0;return R(d.prototype,function(r,n){V(r)&&(t=t&&I(e[n])&&V(e[n]))}),t},this.type=function(e,t,r){if(!I(t))return b[e];if(b.hasOwnProperty(e))throw new Error("A type named '"+e+"' has already been defined.");return b[e]=new m(D({name:e},t)),r&&(S.push({name:e,def:r}),E||c()),this},R(x,function(e,t){b[t]=new m(D({name:t},e))}),b=n(b,{}),this.$get=["$injector",function(e){return v=e,E=!1,c(),R(x,function(e,t){b[t]||(b[t]=new m(e))}),this}],this.Param=function(e,t,n,i){function a(e){var t=F(e)?o(e):[],r=-1===u(t,"value")&&-1===u(t,"type")&&-1===u(t,"squash")&&-1===u(t,"array");return r&&(e={value:e}),e.$$fn=l(e.value)?e.value:function(){return e.value},e}function s(t,r,n){if(t.type&&r)throw new Error("Param '"+e+"' has two type configurations.");return r?r:t.type?t.type instanceof m?t.type:new m(t.type):"config"===n?b.any:b.string}function c(){var t={array:"search"===i?"auto":!1},r=e.match(/\[\]$/)?{array:!0}:{};return D(t,r,n).array}function f(e,t){var r=e.squash;if(!t||r===!1)return!1;if(!I(r)||null==r)return y;if(r===!0||M(r))return r;throw new Error("Invalid squash policy: '"+r+"'. Valid policies: false, true, or arbitrary string")}function $(e,t,n,i){var a,o,s=[{from:"",to:n||t?r:""},{from:null,to:n||t?r:""}];return a=N(e.replace)?e.replace:[],M(i)&&a.push({from:i,to:r}),o=h(a,function(e){return e.from}),p(s,function(e){return-1===u(o,e.from)}).concat(a)}function d(){if(!v)throw new Error("Injectable functions cannot be called at configuration time");return v.invoke(n.$$fn)}function g(e){function t(e){return function(t){return t.from===e}}function r(e){var r=h(p(E.replace,t(e)),function(e){return e.to});return r.length?r[0]:e}return e=r(e),I(e)?E.type.decode(e):d()}function w(){return"{Param:"+e+" "+t+" squash: '"+P+"' optional: "+x+"}"}var E=this;n=a(n),t=s(n,t,i);var S=c();t=S?t.$asArray(S,"search"===i):t,"string"!==t.name||S||"path"!==i||n.value!==r||(n.value="");var x=n.value!==r,P=f(n,x),j=$(n,S,x,P);D(this,{id:e,type:t,location:i,array:S,squash:P,replace:j,isOptional:x,value:g,dynamic:r,config:n,toString:w})},f.prototype={$$new:function(){return n(this,D(new f,{$$parent:this}))},$$keys:function(){for(var e=[],t=[],r=this,n=o(f.prototype);r;)t.push(r),r=r.$$parent;return t.reverse(),R(t,function(t){R(o(t),function(t){-1===u(e,t)&&-1===u(n,t)&&e.push(t)})}),e},$$values:function(e){var t={},r=this;return R(r.$$keys(),function(n){t[n]=r[n].value(e&&e[n])}),t},$$equals:function(e,t){var r=!0,n=this;return R(n.$$keys(),function(i){var a=e&&e[i],o=t&&t[i];n[i].type.equals(a,o)||(r=!1)}),r},$$validates:function(e){var t,r,n,i=!0,a=this;return R(this.$$keys(),function(o){n=a[o],r=e[o],t=!r&&n.isOptional,i=i&&(t||!!n.type.is(r))}),i},$$parent:r},this.ParamSet=f}function w(e,n){function i(e){var t=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(e.source);return null!=t?t[1].replace(/\\(.)/g,"$1"):""}function a(e,t){return e.replace(/\$(\$|\d{1,2})/,function(e,r){return t["$"===r?0:Number(r)]})}function o(e,t,r){if(!r)return!1;var n=e.invoke(t,t,{$match:r});return I(n)?n:!0}function u(n,i,a,o){function u(e,t,r){return"/"===$?e:t?$.slice(0,-1)+e:r?$.slice(1)+e:e}function p(e){function t(e){var t=e(a,n);return t?(M(t)&&n.replace().url(t),!0):!1}if(!e||!e.defaultPrevented){var i=v&&n.url()===v;if(v=r,i)return!0;var o,u=l.length;for(o=0;u>o;o++)if(t(l[o]))return;c&&t(c)}}function h(){return s=s||i.$on("$locationChangeSuccess",p)}var v,$=o.baseHref(),d=n.url();return f||h(),{sync:function(){p()},listen:function(){return h()},update:function(e){return e?void(d=n.url()):void(n.url()!==d&&(n.url(d),n.replace()))},push:function(e,t,i){n.url(e.format(t||{})),v=i&&i.$$avoidResync?n.url():r,i&&i.replace&&n.replace()},href:function(r,i,a){if(!r.validates(i))return null;var o=e.html5Mode();t.isObject(o)&&(o=o.enabled);var s=r.format(i);if(a=a||{},o||null===s||(s="#"+e.hashPrefix()+s),s=u(s,o,a.absolute),!a.absolute||!s)return s;var l=!o&&s?"/":"",c=n.port();return c=80===c||443===c?"":":"+c,[n.protocol(),"://",n.host(),c,l,s].join("")}}}var s,l=[],c=null,f=!1;this.rule=function(e){if(!V(e))throw new Error("'rule' must be a function");return l.push(e),this},this.otherwise=function(e){if(M(e)){var t=e;e=function(){return t}}else if(!V(e))throw new Error("'rule' must be a function");return c=e,this},this.when=function(e,t){var r,u=M(t);if(M(e)&&(e=n.compile(e)),!u&&!V(t)&&!N(t))throw new Error("invalid 'handler' in when()");var s={matcher:function(e,t){return u&&(r=n.compile(t),t=["$match",function(e){return r.format(e)}]),D(function(r,n){return o(r,t,e.exec(n.path(),n.search()))},{prefix:M(e.prefix)?e.prefix:""})},regex:function(e,t){if(e.global||e.sticky)throw new Error("when() RegExp must not be global or sticky");return u&&(r=t,t=["$match",function(e){return a(r,e)}]),D(function(r,n){return o(r,t,e.exec(n.path()))},{prefix:i(e)})}},l={matcher:n.isMatcher(e),regex:e instanceof RegExp};for(var c in l)if(l[c])return this.rule(s[c](e,t));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(e){e===r&&(e=!0),f=e},this.$get=u,u.$inject=["$location","$rootScope","$injector","$browser"]}function y(e,i){function a(e){return 0===e.indexOf(".")||0===e.indexOf("^")}function f(e,t){if(!e)return r;var n=M(e),i=n?e:e.name,o=a(i);if(o){if(!t)throw new Error("No reference point given for path '"+i+"'");t=f(t);for(var u=i.split("."),s=0,l=u.length,c=t;l>s;s++)if(""!==u[s]||0!==s){if("^"!==u[s])break;if(!c.parent)throw new Error("Path '"+i+"' not valid for state '"+t.name+"'");c=c.parent}else c=t;u=u.slice(s).join("."),i=c.name+(c.name&&u?".":"")+u}var p=x[i];return!p||!n&&(n||p!==e&&p.self!==e)?r:p}function p(e,t){P[e]||(P[e]=[]),P[e].push(t)}function v(e){for(var t=P[e]||[];t.length;)$(t.shift())}function $(t){t=n(t,{self:t,resolve:t.resolve||{},toString:function(){return this.name}});var r=t.name;if(!M(r)||r.indexOf("@")>=0)throw new Error("State must have a valid name");if(x.hasOwnProperty(r))throw new Error("State '"+r+"'' is already defined");var i=-1!==r.indexOf(".")?r.substring(0,r.lastIndexOf(".")):M(t.parent)?t.parent:F(t.parent)&&M(t.parent.name)?t.parent.name:"";if(i&&!x[i])return p(i,t.self);for(var a in O)V(O[a])&&(t[a]=O[a](t,O.$delegates[a]));return x[r]=t,!t[j]&&t.url&&e.when(t.url,["$match","$stateParams",function(e,r){S.$current.navigable==t&&l(e,r)||S.transitionTo(t,e,{inherit:!0,location:!1})}]),v(r),t}function d(e){return e.indexOf("*")>-1}function m(e){var t=e.split("."),r=S.$current.name.split(".");if("**"===t[0]&&(r=r.slice(u(r,t[1])),r.unshift("**")),"**"===t[t.length-1]&&(r.splice(u(r,t[t.length-2])+1,Number.MAX_VALUE),r.push("**")),t.length!=r.length)return!1;for(var n=0,i=t.length;i>n;n++)"*"===t[n]&&(r[n]="*");return r.join("")===t.join("")}function g(e,t){return M(e)&&!I(t)?O[e]:V(t)&&M(e)?(O[e]&&!O.$delegates[e]&&(O.$delegates[e]=O[e]),O[e]=t,this):this}function w(e,t){return F(e)?t=e:t.name=e,$(t),this}function y(e,i,a,u,p,v,$){function g(t,r,n,a){var o=e.$broadcast("$stateNotFound",t,r,n);if(o.defaultPrevented)return $.update(),O;if(!o.retry)return null;if(a.$retry)return $.update(),A;var u=S.transition=i.when(o.retry);return u.then(function(){return u!==S.transition?y:(t.options.$retry=!0,S.transitionTo(t.to,t.toParams,t.options))},function(){return O}),$.update(),u}function w(e,r,n,o,s,l){var f=n?r:c(e.params.$$keys(),r),h={$stateParams:f};s.resolve=p.resolve(e.resolve,h,s.resolve,e);var v=[s.resolve.then(function(e){s.globals=e})];return o&&v.push(o),R(e.views,function(r,n){var i=r.resolve&&r.resolve!==e.resolve?r.resolve:{};i.$template=[function(){return a.load(n,{view:r,locals:h,params:f,notify:l.notify})||""}],v.push(p.resolve(i,h,s.resolve,e).then(function(a){if(V(r.controllerProvider)||N(r.controllerProvider)){var o=t.extend({},i,h);a.$$controller=u.invoke(r.controllerProvider,null,o)}else a.$$controller=r.controller;a.$$state=e,a.$$controllerAs=r.controllerAs,s[n]=a}))}),i.all(v).then(function(){return s})}var y=i.reject(new Error("transition superseded")),P=i.reject(new Error("transition prevented")),O=i.reject(new Error("transition aborted")),A=i.reject(new Error("transition failed"));return E.locals={resolve:null,globals:{$stateParams:{}}},S={params:{},current:E.self,$current:E,transition:null},S.reload=function(){return S.transitionTo(S.current,v,{reload:!0,inherit:!1,notify:!0})},S.go=function(e,t,r){return S.transitionTo(e,t,D({inherit:!0,relative:S.$current},r))},S.transitionTo=function(t,r,a){r=r||{},a=D({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},a||{});var o,l=S.$current,p=S.params,h=l.path,d=f(t,a.relative);if(!I(d)){var m={to:t,toParams:r,options:a},x=g(m,l.self,p,a);if(x)return x;if(t=m.to,r=m.toParams,a=m.options,d=f(t,a.relative),!I(d)){if(!a.relative)throw new Error("No such state '"+t+"'");throw new Error("Could not resolve '"+t+"' from state '"+a.relative+"'")}}if(d[j])throw new Error("Cannot transition to abstract state '"+t+"'");if(a.inherit&&(r=s(v,r||{},S.$current,d)),!d.params.$$validates(r))return A;r=d.params.$$values(r),t=d;var O=t.path,q=0,C=O[q],k=E.locals,V=[];if(!a.reload)for(;C&&C===h[q]&&C.ownParams.$$equals(r,p);)k=V[q]=C.locals,q++,C=O[q];if(b(t,l,k,a))return t.self.reloadOnSearch!==!1&&$.update(),S.transition=null,i.when(S.current);if(r=c(t.params.$$keys(),r||{}),a.notify&&e.$broadcast("$stateChangeStart",t.self,r,l.self,p).defaultPrevented)return $.update(),P;for(var M=i.when(k),F=q;F<O.length;F++,C=O[F])k=V[F]=n(k),M=w(C,r,C===t,M,k,a);var N=S.transition=M.then(function(){var n,i,o;if(S.transition!==N)return y;for(n=h.length-1;n>=q;n--)o=h[n],o.self.onExit&&u.invoke(o.self.onExit,o.self,o.locals.globals),o.locals=null;for(n=q;n<O.length;n++)i=O[n],i.locals=V[n],i.self.onEnter&&u.invoke(i.self.onEnter,i.self,i.locals.globals);return S.transition!==N?y:(S.$current=t,S.current=t.self,S.params=r,U(S.params,v),S.transition=null,a.location&&t.navigable&&$.push(t.navigable.url,t.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===a.location}),a.notify&&e.$broadcast("$stateChangeSuccess",t.self,r,l.self,p),$.update(!0),S.current)},function(n){return S.transition!==N?y:(S.transition=null,o=e.$broadcast("$stateChangeError",t.self,r,l.self,p,n),o.defaultPrevented||$.update(),i.reject(n))});return N},S.is=function(e,t,n){n=D({relative:S.$current},n||{});var i=f(e,n.relative);return I(i)?S.$current!==i?!1:t?l(i.params.$$values(t),v):!0:r},S.includes=function(e,t,n){if(n=D({relative:S.$current},n||{}),M(e)&&d(e)){if(!m(e))return!1;e=S.$current.name}var i=f(e,n.relative);return I(i)?I(S.$current.includes[i.name])?t?l(i.params.$$values(t),v,o(t)):!0:!1:r},S.href=function(e,t,n){n=D({lossy:!0,inherit:!0,absolute:!1,relative:S.$current},n||{});var i=f(e,n.relative);if(!I(i))return null;n.inherit&&(t=s(v,t||{},S.$current,i));var a=i&&n.lossy?i.navigable:i;return a&&a.url!==r&&null!==a.url?$.href(a.url,c(i.params.$$keys(),t||{}),{absolute:n.absolute}):null},S.get=function(e,t){if(0===arguments.length)return h(o(x),function(e){return x[e].self});var r=f(e,t||S.$current);return r&&r.self?r.self:null},S}function b(e,t,r,n){return e!==t||(r!==t.locals||n.reload)&&e.self.reloadOnSearch!==!1?void 0:!0}var E,S,x={},P={},j="abstract",O={parent:function(e){if(I(e.parent)&&e.parent)return f(e.parent);var t=/^(.+)\.[^.]+$/.exec(e.name);return t?f(t[1]):E},data:function(e){return e.parent&&e.parent.data&&(e.data=e.self.data=D({},e.parent.data,e.data)),e.data},url:function(e){var t=e.url,r={params:e.params||{}};if(M(t))return"^"==t.charAt(0)?i.compile(t.substring(1),r):(e.parent.navigable||E).url.concat(t,r);if(!t||i.isMatcher(t))return t;throw new Error("Invalid url '"+t+"' in state '"+e+"'")},navigable:function(e){return e.url?e:e.parent?e.parent.navigable:null},ownParams:function(e){var t=e.url&&e.url.params||new T.ParamSet;return R(e.params||{},function(e,r){t[r]||(t[r]=new T.Param(r,null,e,"config"))}),t},params:function(e){return e.parent&&e.parent.params?D(e.parent.params.$$new(),e.ownParams):new T.ParamSet},views:function(e){var t={};return R(I(e.views)?e.views:{"":e},function(r,n){n.indexOf("@")<0&&(n+="@"+e.parent.name),t[n]=r}),t},path:function(e){return e.parent?e.parent.path.concat(e):[]},includes:function(e){var t=e.parent?D({},e.parent.includes):{};return t[e.name]=!0,t},$delegates:{}};E=$({name:"",url:"^",views:null,"abstract":!0}),E.navigable=null,this.decorator=g,this.state=w,this.$get=y,y.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function b(){function e(e,t){return{load:function(r,n){var i,a={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return n=D(a,n),n.view&&(i=t.fromConfig(n.view,n.params,n.locals)),i&&n.notify&&e.$broadcast("$viewContentLoading",n),i}}}this.$get=e,e.$inject=["$rootScope","$templateFactory"]}function E(){var e=!1;this.useAnchorScroll=function(){e=!0},this.$get=["$anchorScroll","$timeout",function(t,r){return e?t:function(e){r(function(){e[0].scrollIntoView()},0,!1)}}]}function S(e,r,n,i){function a(){return r.has?function(e){return r.has(e)?r.get(e):null}:function(e){try{return r.get(e)}catch(t){return null}}}function o(e,t){var r=function(){return{enter:function(e,t,r){t.after(e),r()},leave:function(e,t){e.remove(),t()}}};if(l)return{enter:function(e,t,r){var n=l.enter(e,null,t,r);n&&n.then&&n.then(r)},leave:function(e,t){var r=l.leave(e,t);r&&r.then&&r.then(t)}};if(s){var n=s&&s(t,e);return{enter:function(e,t,r){n.enter(e,null,t),r()},leave:function(e,t){n.leave(e),t()}}}return r()}var u=a(),s=u("$animator"),l=u("$animate"),c={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(r,a,u){return function(r,a,s){function l(){f&&(f.remove(),f=null),h&&(h.$destroy(),h=null),p&&(m.leave(p,function(){f=null}),f=p,p=null)}function c(o){var c,f=P(r,s,a,i),g=f&&e.$current&&e.$current.locals[f];if(o||g!==v){c=r.$new(),v=e.$current.locals[f];var w=u(c,function(e){m.enter(e,a,function(){h&&h.$emit("$viewContentAnimationEnded"),(t.isDefined(d)&&!d||r.$eval(d))&&n(e)}),l()});p=w,h=c,h.$emit("$viewContentLoaded"),h.$eval($)}}var f,p,h,v,$=s.onload||"",d=s.autoscroll,m=o(s,r);r.$on("$stateChangeSuccess",function(){c(!1)}),r.$on("$viewContentLoading",function(){c(!1)}),c(!0)}}};return c}function x(e,t,r,n){return{restrict:"ECA",priority:-400,compile:function(i){var a=i.html();return function(i,o,u){var s=r.$current,l=P(i,u,o,n),c=s&&s.locals[l];if(c){o.data("$uiView",{name:l,state:c.$$state}),o.html(c.$template?c.$template:a);var f=e(o.contents());if(c.$$controller){c.$scope=i;var p=t(c.$$controller,c);c.$$controllerAs&&(i[c.$$controllerAs]=p),o.data("$ngControllerController",p),o.children().data("$ngControllerController",p)}f(i)}}}}}function P(e,t,r,n){var i=n(t.uiView||t.name||"")(e),a=r.inheritedData("$uiView");return i.indexOf("@")>=0?i:i+"@"+(a?a.state.name:"")}function j(e,t){var r,n=e.match(/^\s*({[^}]*})\s*$/);if(n&&(e=t+"("+n[1]+")"),r=e.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!r||4!==r.length)throw new Error("Invalid state ref '"+e+"'");return{state:r[1],paramExpr:r[3]||null}}function O(e){var t=e.parent().inheritedData("$uiView");return t&&t.state&&t.state.name?t.state:void 0}function A(e,r){var n=["location","inherit","reload"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(i,a,o,u){var s=j(o.uiSref,e.current.name),l=null,c=O(a)||e.$current,f=null,p="A"===a.prop("tagName"),h="FORM"===a[0].nodeName,v=h?"action":"href",$=!0,d={relative:c,inherit:!0},m=i.$eval(o.uiSrefOpts)||{};t.forEach(n,function(e){e in m&&(d[e]=m[e])});var g=function(r){if(r&&(l=t.copy(r)),$){f=e.href(s.state,l,d);var n=u[1]||u[0];return n&&n.$$setStateInfo(s.state,l),null===f?($=!1,!1):void o.$set(v,f)}};s.paramExpr&&(i.$watch(s.paramExpr,function(e){e!==l&&g(e)},!0),l=t.copy(i.$eval(s.paramExpr))),g(),h||a.bind("click",function(t){var n=t.which||t.button;if(!(n>1||t.ctrlKey||t.metaKey||t.shiftKey||a.attr("target"))){var i=r(function(){e.go(s.state,l,d)});t.preventDefault();var o=p&&!f?1:0;t.preventDefault=function(){o--<=0&&r.cancel(i)}}})}}}function q(e,t,r){return{restrict:"A",controller:["$scope","$element","$attrs",function(t,n,i){function a(){o()?n.addClass(l):n.removeClass(l)}function o(){return"undefined"!=typeof i.uiSrefActiveEq?u&&e.is(u.name,s):u&&e.includes(u.name,s)}var u,s,l;l=r(i.uiSrefActiveEq||i.uiSrefActive||"",!1)(t),this.$$setStateInfo=function(t,r){u=e.get(t,O(n)),s=r,a()},t.$on("$stateChangeSuccess",a)}]}}function C(e){var t=function(t){return e.is(t)};return t.$stateful=!0,t}function k(e){var t=function(t){return e.includes(t)};return t.$stateful=!0,t}var I=t.isDefined,V=t.isFunction,M=t.isString,F=t.isObject,N=t.isArray,R=t.forEach,D=t.extend,U=t.copy;t.module("ui.router.util",["ng"]),t.module("ui.router.router",["ui.router.util"]),t.module("ui.router.state",["ui.router.router","ui.router.util"]),t.module("ui.router",["ui.router.state"]),t.module("ui.router.compat",["ui.router"]),v.$inject=["$q","$injector"],t.module("ui.router.util").service("$resolve",v),$.$inject=["$http","$templateCache","$injector"],t.module("ui.router.util").service("$templateFactory",$);var T;d.prototype.concat=function(e,t){var r={caseInsensitive:T.caseInsensitive(),strict:T.strictMode(),squash:T.defaultSquashPolicy()};return new d(this.sourcePath+e+this.sourceSearch,D(r,t),this)},d.prototype.toString=function(){return this.source},d.prototype.exec=function(e,t){function r(e){function t(e){return e.split("").reverse().join("")}function r(e){return e.replace(/\\-/,"-")}var n=t(e).split(/-(?!\\)/),i=h(n,t);return h(i,r).reverse()}var n=this.regexp.exec(e);if(!n)return null;t=t||{};var i,a,o,u=this.parameters(),s=u.length,l=this.segments.length-1,c={};if(l!==n.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(i=0;l>i;i++){o=u[i];var f=this.params[o],p=n[i+1];for(a=0;a<f.replace;a++)f.replace[a].from===p&&(p=f.replace[a].to);p&&f.array===!0&&(p=r(p)),c[o]=f.value(p)}for(;s>i;i++)o=u[i],c[o]=this.params[o].value(t[o]);return c},d.prototype.parameters=function(e){return I(e)?this.params[e]||null:this.$$paramNames},d.prototype.validates=function(e){return this.params.$$validates(e)},d.prototype.format=function(e){function t(e){return encodeURIComponent(e).replace(/-/g,function(e){return"%5C%"+e.charCodeAt(0).toString(16).toUpperCase()})}e=e||{};var r=this.segments,n=this.parameters(),i=this.params;if(!this.validates(e))return null;var a,o=!1,u=r.length-1,s=n.length,l=r[0];for(a=0;s>a;a++){var c=u>a,f=n[a],p=i[f],v=p.value(e[f]),$=p.isOptional&&p.type.equals(p.value(),v),d=$?p.squash:!1,m=p.type.encode(v);if(c){var g=r[a+1];if(d===!1)null!=m&&(l+=N(m)?h(m,t).join("-"):encodeURIComponent(m)),l+=g;else if(d===!0){var w=l.match(/\/$/)?/\/?(.*)/:/(.*)/;l+=g.match(w)[1]}else M(d)&&(l+=d+g)}else{if(null==m||$&&d!==!1)continue;N(m)||(m=[m]),m=h(m,encodeURIComponent).join("&"+f+"="),l+=(o?"&":"?")+(f+"="+m),o=!0}}return l},m.prototype.is=function(){return!0},m.prototype.encode=function(e){return e},m.prototype.decode=function(e){return e},m.prototype.equals=function(e,t){return e==t},m.prototype.$subPattern=function(){var e=this.pattern.toString();return e.substr(1,e.length-2)},m.prototype.pattern=/.*/,m.prototype.toString=function(){return"{Type:"+this.name+"}"},m.prototype.$asArray=function(e,t){function n(e,t){function n(e,t){return function(){return e[t].apply(e,arguments)}}function i(e){return N(e)?e:I(e)?[e]:[]}function a(e){switch(e.length){case 0:return r;case 1:return"auto"===t?e[0]:e;default:return e}}function o(e){return!e}function u(e,t){return function(r){r=i(r);var n=h(r,e);return t===!0?0===p(n,o).length:a(n)}}function s(e){return function(t,r){var n=i(t),a=i(r);if(n.length!==a.length)return!1;for(var o=0;o<n.length;o++)if(!e(n[o],a[o]))return!1;return!0}}this.encode=u(n(e,"encode")),this.decode=u(n(e,"decode")),this.is=u(n(e,"is"),!0),this.equals=s(n(e,"equals")),this.pattern=e.pattern,this.$arrayMode=t}if(!e)return this;if("auto"===e&&!t)throw new Error("'auto' array mode is for query parameters only");return new n(this,e)},t.module("ui.router.util").provider("$urlMatcherFactory",g),t.module("ui.router.util").run(["$urlMatcherFactory",function(){}]),w.$inject=["$locationProvider","$urlMatcherFactoryProvider"],t.module("ui.router.router").provider("$urlRouter",w),y.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],t.module("ui.router.state").value("$stateParams",{}).provider("$state",y),b.$inject=[],t.module("ui.router.state").provider("$view",b),t.module("ui.router.state").provider("$uiViewScroll",E),S.$inject=["$state","$injector","$uiViewScroll","$interpolate"],x.$inject=["$compile","$controller","$state","$interpolate"],t.module("ui.router.state").directive("uiView",S),t.module("ui.router.state").directive("uiView",x),A.$inject=["$state","$timeout"],q.$inject=["$state","$stateParams","$interpolate"],t.module("ui.router.state").directive("uiSref",A).directive("uiSrefActive",q).directive("uiSrefActiveEq",q),C.$inject=["$state"],k.$inject=["$state"],t.module("ui.router.state").filter("isState",C).filter("includedByState",k)}(window,window.angular);
!function(e,t){"use strict";function r(){this.$get=["$$sanitizeUri",function(e){return function(t){var r=[];return s(t,c(r,function(t,r){return!/^unsafe/.test(e(t,r))})),r.join("")}}]}function n(e){var r=[],n=c(r,t.noop);return n.chars(e),r.join("")}function a(e){var t,r={},n=e.split(",");for(t=0;t<n.length;t++)r[n[t]]=!0;return r}function s(e,r){function n(e,n,s,o){if(n=t.lowercase(n),k[n])for(;w.last()&&C[w.last()];)a("",w.last());y[n]&&w.last()==n&&a("",n),o=x[n]||!!o,o||w.push(n);var c={};s.replace(f,function(e,t,r,n,a){var s=r||n||a||"";c[t]=i(s)}),r.start&&r.start(n,c,o)}function a(e,n){var a,s=0;if(n=t.lowercase(n))for(s=w.length-1;s>=0&&w[s]!=n;s--);if(s>=0){for(a=w.length-1;a>=s;a--)r.end&&r.end(w[a]);w.length=s}}"string"!=typeof e&&(e=null===e||"undefined"==typeof e?"":""+e);var s,o,c,v,w=[],$=e;for(w.last=function(){return w[w.length-1]};e;){if(v="",o=!0,w.last()&&A[w.last()]?(e=e.replace(new RegExp("(.*)<\\s*\\/\\s*"+w.last()+"[^>]*>","i"),function(e,t){return t=t.replace(d,"$1").replace(m,"$1"),r.chars&&r.chars(i(t)),""}),a("",w.last())):(0===e.indexOf("<!--")?(s=e.indexOf("--",4),s>=0&&e.lastIndexOf("-->",s)===s&&(r.comment&&r.comment(e.substring(4,s)),e=e.substring(s+3),o=!1)):b.test(e)?(c=e.match(b),c&&(e=e.replace(c[0],""),o=!1)):g.test(e)?(c=e.match(p),c&&(e=e.substring(c[0].length),c[0].replace(p,a),o=!1)):h.test(e)&&(c=e.match(u),c?(c[4]&&(e=e.substring(c[0].length),c[0].replace(u,n)),o=!1):(v+="<",e=e.substring(1))),o&&(s=e.indexOf("<"),v+=0>s?e:e.substring(0,s),e=0>s?"":e.substring(s),r.chars&&r.chars(i(v)))),e==$)throw l("badparse","The sanitizer was unable to parse the following block of html: {0}",e);$=e}a()}function i(e){if(!e)return"";var t=T.exec(e),r=t[1],n=t[3],a=t[2];return a&&(O.innerHTML=a.replace(/</g,"&lt;"),a="textContent"in O?O.textContent:O.innerText),r+a+n}function o(e){return e.replace(/&/g,"&amp;").replace(v,function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1);return"&#"+(1024*(t-55296)+(r-56320)+65536)+";"}).replace(w,function(e){return"&#"+e.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function c(e,r){var n=!1,a=t.bind(e,e.push);return{start:function(e,s,i){e=t.lowercase(e),!n&&A[e]&&(n=e),n||D[e]!==!0||(a("<"),a(e),t.forEach(s,function(n,s){var i=t.lowercase(s),c="img"===e&&"src"===i||"background"===i;F[i]!==!0||E[i]===!0&&!r(n,c)||(a(" "),a(s),a('="'),a(o(n)),a('"'))}),a(i?"/>":">"))},end:function(e){e=t.lowercase(e),n||D[e]!==!0||(a("</"),a(e),a(">")),e==n&&(n=!1)},chars:function(e){n||a(o(e))}}}var l=t.$$minErr("$sanitize"),u=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,p=/^<\/\s*([\w:-]+)[^>]*>/,f=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,h=/^</,g=/^<\//,d=/<!--(.*?)-->/g,b=/<!DOCTYPE([^>]*?)>/i,m=/<!\[CDATA\[(.*?)]]>/g,v=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,w=/([^\#-~| |!])/g,x=a("area,br,col,hr,img,wbr"),$=a("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),z=a("rp,rt"),y=t.extend({},z,$),k=t.extend({},$,a("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),C=t.extend({},z,a("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),A=a("script,style"),D=t.extend({},x,k,C,y),E=a("background,cite,href,longdesc,src,usemap"),F=t.extend({},E,a("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),O=document.createElement("pre"),T=/^(\s*)([\s\S]*?)(\s*)$/;t.module("ngSanitize",[]).provider("$sanitize",r),t.module("ngSanitize").filter("linky",["$sanitize",function(e){var r=/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/,a=/^mailto:/;return function(s,i){function o(e){e&&h.push(n(e))}function c(e,r){h.push("<a "),t.isDefined(i)&&(h.push('target="'),h.push(i),h.push('" ')),h.push('href="',e.replace('"',"&quot;"),'">'),o(r),h.push("</a>")}if(!s)return s;for(var l,u,p,f=s,h=[];l=f.match(r);)u=l[0],l[2]==l[3]&&(u="mailto:"+u),p=l.index,o(f.substr(0,p)),c(u,l[0].replace(a,"")),f=f.substring(p+l[0].length);return o(f),e(h.join(""))}}])}(window,window.angular);
!function(e,t,n){"use strict";function r(e){var t;if(t=e.match(u)){var n=new Date(0),r=0,i=0;return t[9]&&(r=o(t[9]+t[10]),i=o(t[9]+t[11])),n.setUTCFullYear(o(t[1]),o(t[2])-1,o(t[3])),n.setUTCHours(o(t[4]||0)-r,o(t[5]||0)-i,o(t[6]||0),o(t[7]||0)),n}return e}function o(e){return parseInt(e,10)}function i(e,t,n){var r="";for(0>e&&(r="-",e=-e),e=""+e;e.length<t;)e="0"+e;return n&&(e=e.substr(e.length-t)),r+e}function s(e,r,o){function i(e,n,r,o){return t.isFunction(e)?e:function(){return t.isNumber(e)?[e,n,r,o]:[200,e,n]}}function s(e,i,s,a,u,m,p){function $(e){return t.isString(e)||t.isFunction(e)||e instanceof RegExp?e:t.toJson(e)}function v(t){function r(){var n=t.response(e,i,s,u);k.$$respHeaders=n[2],a(g(n[0]),g(n[1]),k.getAllResponseHeaders(),g(n[3]||""))}function c(){for(var e=0,t=d.length;t>e;e++)if(d[e]===r){d.splice(e,1),a(-1,n,"");break}}return!o&&m&&m.then&&m.then(c),r}var k=new c,w=l[0],E=!1;if(w&&w.match(e,i)){if(!w.matchData(s))throw new Error("Expected "+w+" with different data\nEXPECTED: "+$(w.data)+"\nGOT:      "+s);if(!w.matchHeaders(u))throw new Error("Expected "+w+" with different headers\nEXPECTED: "+$(w.headers)+"\nGOT:      "+$(u));if(l.shift(),w.response)return void d.push(v(w));E=!0}for(var D,T=-1;D=f[++T];)if(D.match(e,i,s,u||{})){if(D.response)(o?o.defer:h)(v(D));else{if(!D.passThrough)throw new Error("No response defined !");r(e,i,s,a,u,m,p)}return}throw new Error(E?"No response defined !":"Unexpected request: "+e+" "+i+"\n"+(w?"Expected "+w:"No more request expected"))}function u(e){t.forEach(["GET","DELETE","JSONP","HEAD"],function(t){s[e+t]=function(r,o){return s[e](t,r,n,o)}}),t.forEach(["PUT","POST","PATCH"],function(t){s[e+t]=function(n,r,o){return s[e](t,n,r,o)}})}var f=[],l=[],d=[],h=t.bind(d,d.push),g=t.copy;return s.when=function(e,t,n,r){var s=new a(e,t,n,r),c={respond:function(e,t,n,r){s.response=i(e,t,n,r)}};return o&&(c.passThrough=function(){s.passThrough=!0}),f.push(s),c},u("when"),s.expect=function(e,t,n,r){var o=new a(e,t,n,r);return l.push(o),{respond:function(e,t,n,r){o.response=i(e,t,n,r)}}},u("expect"),s.flush=function(n){if(e.$digest(),!d.length)throw new Error("No pending request to flush !");if(t.isDefined(n))for(;n--;){if(!d.length)throw new Error("No more pending request to flush !");d.shift()()}else for(;d.length;)d.shift()();s.verifyNoOutstandingExpectation()},s.verifyNoOutstandingExpectation=function(){if(e.$digest(),l.length)throw new Error("Unsatisfied requests: "+l.join(", "))},s.verifyNoOutstandingRequest=function(){if(d.length)throw new Error("Unflushed requests: "+d.length)},s.resetExpectations=function(){l.length=0,d.length=0},s}function a(e,n,r,o){this.data=r,this.headers=o,this.match=function(n,r,o,i){return e!=n?!1:this.matchUrl(r)?t.isDefined(o)&&!this.matchData(o)?!1:t.isDefined(i)&&!this.matchHeaders(i)?!1:!0:!1},this.matchUrl=function(e){return n?t.isFunction(n.test)?n.test(e):n==e:!0},this.matchHeaders=function(e){return t.isUndefined(o)?!0:t.isFunction(o)?o(e):t.equals(o,e)},this.matchData=function(e){return t.isUndefined(r)?!0:r&&t.isFunction(r.test)?r.test(e):r&&t.isFunction(r)?r(e):r&&!t.isString(r)?t.equals(t.fromJson(t.toJson(r)),t.fromJson(e)):r==e},this.toString=function(){return e+" "+n}}function c(){c.$$lastInstance=this,this.open=function(e,t,n){this.$$method=e,this.$$url=t,this.$$async=n,this.$$reqHeaders={},this.$$respHeaders={}},this.send=function(e){this.$$data=e},this.setRequestHeader=function(e,t){this.$$reqHeaders[e]=t},this.getResponseHeader=function(e){var r=this.$$respHeaders[e];return r?r:(e=t.lowercase(e),(r=this.$$respHeaders[e])?r:(r=n,t.forEach(this.$$respHeaders,function(n,o){r||t.lowercase(o)!=e||(r=n)}),r))},this.getAllResponseHeaders=function(){var e=[];return t.forEach(this.$$respHeaders,function(t,n){e.push(n+": "+t)}),e.join("\n")},this.abort=t.noop}t.mock={},t.mock.$BrowserProvider=function(){this.$get=function(){return new t.mock.$Browser}},t.mock.$Browser=function(){var e=this;this.isMock=!0,e.$$url="http://server/",e.$$lastUrl=e.$$url,e.pollFns=[],e.$$completeOutstandingRequest=t.noop,e.$$incOutstandingRequestCount=t.noop,e.onUrlChange=function(t){return e.pollFns.push(function(){e.$$lastUrl!=e.$$url&&(e.$$lastUrl=e.$$url,t(e.$$url))}),t},e.$$checkUrlChange=t.noop,e.cookieHash={},e.lastCookieHash={},e.deferredFns=[],e.deferredNextId=0,e.defer=function(t,n){return n=n||0,e.deferredFns.push({time:e.defer.now+n,fn:t,id:e.deferredNextId}),e.deferredFns.sort(function(e,t){return e.time-t.time}),e.deferredNextId++},e.defer.now=0,e.defer.cancel=function(r){var o;return t.forEach(e.deferredFns,function(e,t){e.id===r&&(o=t)}),o!==n?(e.deferredFns.splice(o,1),!0):!1},e.defer.flush=function(n){if(t.isDefined(n))e.defer.now+=n;else{if(!e.deferredFns.length)throw new Error("No deferred tasks to be flushed");e.defer.now=e.deferredFns[e.deferredFns.length-1].time}for(;e.deferredFns.length&&e.deferredFns[0].time<=e.defer.now;)e.deferredFns.shift().fn()},e.$$baseHref="",e.baseHref=function(){return this.$$baseHref}},t.mock.$Browser.prototype={poll:function(){t.forEach(this.pollFns,function(e){e()})},addPollFn:function(e){return this.pollFns.push(e),e},url:function(e){return e?(this.$$url=e,this):this.$$url},cookies:function(e,n){return e?void(t.isUndefined(n)?delete this.cookieHash[e]:t.isString(n)&&n.length<=4096&&(this.cookieHash[e]=n)):(t.equals(this.cookieHash,this.lastCookieHash)||(this.lastCookieHash=t.copy(this.cookieHash),this.cookieHash=t.copy(this.cookieHash)),this.cookieHash)},notifyWhenNoOutstandingRequests:function(e){e()}},t.mock.$ExceptionHandlerProvider=function(){var e;this.mode=function(t){switch(t){case"rethrow":e=function(e){throw e};break;case"log":var n=[];e=function(e){n.push(1==arguments.length?e:[].slice.call(arguments,0))},e.errors=n;break;default:throw new Error("Unknown mode '"+t+"', only 'log'/'rethrow' modes are allowed!")}},this.$get=function(){return e},this.mode("rethrow")},t.mock.$LogProvider=function(){function e(e,t,n){return e.concat(Array.prototype.slice.call(t,n))}var n=!0;this.debugEnabled=function(e){return t.isDefined(e)?(n=e,this):n},this.$get=function(){var r={log:function(){r.log.logs.push(e([],arguments,0))},warn:function(){r.warn.logs.push(e([],arguments,0))},info:function(){r.info.logs.push(e([],arguments,0))},error:function(){r.error.logs.push(e([],arguments,0))},debug:function(){n&&r.debug.logs.push(e([],arguments,0))}};return r.reset=function(){r.log.logs=[],r.info.logs=[],r.warn.logs=[],r.error.logs=[],r.debug.logs=[]},r.assertEmpty=function(){var e=[];if(t.forEach(["error","warn","info","log","debug"],function(n){t.forEach(r[n].logs,function(r){t.forEach(r,function(t){e.push("MOCK $log ("+n+"): "+String(t)+"\n"+(t.stack||""))})})}),e.length)throw e.unshift("Expected $log to be empty! Either a message was logged unexpectedly, or an expected log message was not checked and removed:"),e.push(""),new Error(e.join("\n---------\n"))},r.reset(),r}},t.mock.$IntervalProvider=function(){this.$get=["$rootScope","$q",function(e,r){var o=[],i=0,s=0,a=function(a,c,u,f){function l(){if(d.notify(g++),u>0&&g>=u){var r;d.resolve(g),t.forEach(o,function(e,t){e.id===h.$$intervalId&&(r=t)}),r!==n&&o.splice(r,1)}m||e.$apply()}var d=r.defer(),h=d.promise,g=0,m=t.isDefined(f)&&!f;return u=t.isDefined(u)?u:0,h.then(null,null,a),h.$$intervalId=i,o.push({nextTime:s+c,delay:c,fn:l,id:i,deferred:d}),o.sort(function(e,t){return e.nextTime-t.nextTime}),i++,h};return a.cancel=function(e){if(!e)return!1;var r;return t.forEach(o,function(t,n){t.id===e.$$intervalId&&(r=n)}),r!==n?(o[r].deferred.reject("canceled"),o.splice(r,1),!0):!1},a.flush=function(e){for(s+=e;o.length&&o[0].nextTime<=s;){var t=o[0];t.fn(),t.nextTime+=t.delay,o.sort(function(e,t){return e.nextTime-t.nextTime})}return e},a}]};var u=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?:\:?(\d\d)(?:\:?(\d\d)(?:\.(\d{3}))?)?)?(Z|([+-])(\d\d):?(\d\d)))?$/;if(t.mock.TzDate=function(e,n){var o=new Date(0);if(t.isString(n)){var s=n;if(o.origDate=r(n),n=o.origDate.getTime(),isNaN(n))throw{name:"Illegal Argument",message:"Arg '"+s+"' passed into TzDate constructor is not a valid date string"}}else o.origDate=new Date(n);var a=new Date(n).getTimezoneOffset();o.offsetDiff=60*a*1e3-1e3*e*60*60,o.date=new Date(n+o.offsetDiff),o.getTime=function(){return o.date.getTime()-o.offsetDiff},o.toLocaleDateString=function(){return o.date.toLocaleDateString()},o.getFullYear=function(){return o.date.getFullYear()},o.getMonth=function(){return o.date.getMonth()},o.getDate=function(){return o.date.getDate()},o.getHours=function(){return o.date.getHours()},o.getMinutes=function(){return o.date.getMinutes()},o.getSeconds=function(){return o.date.getSeconds()},o.getMilliseconds=function(){return o.date.getMilliseconds()},o.getTimezoneOffset=function(){return 60*e},o.getUTCFullYear=function(){return o.origDate.getUTCFullYear()},o.getUTCMonth=function(){return o.origDate.getUTCMonth()},o.getUTCDate=function(){return o.origDate.getUTCDate()},o.getUTCHours=function(){return o.origDate.getUTCHours()},o.getUTCMinutes=function(){return o.origDate.getUTCMinutes()},o.getUTCSeconds=function(){return o.origDate.getUTCSeconds()},o.getUTCMilliseconds=function(){return o.origDate.getUTCMilliseconds()},o.getDay=function(){return o.date.getDay()},o.toISOString&&(o.toISOString=function(){return i(o.origDate.getUTCFullYear(),4)+"-"+i(o.origDate.getUTCMonth()+1,2)+"-"+i(o.origDate.getUTCDate(),2)+"T"+i(o.origDate.getUTCHours(),2)+":"+i(o.origDate.getUTCMinutes(),2)+":"+i(o.origDate.getUTCSeconds(),2)+"."+i(o.origDate.getUTCMilliseconds(),3)+"Z"});var c=["getUTCDay","getYear","setDate","setFullYear","setHours","setMilliseconds","setMinutes","setMonth","setSeconds","setTime","setUTCDate","setUTCFullYear","setUTCHours","setUTCMilliseconds","setUTCMinutes","setUTCMonth","setUTCSeconds","setYear","toDateString","toGMTString","toJSON","toLocaleFormat","toLocaleString","toLocaleTimeString","toSource","toString","toTimeString","toUTCString","valueOf"];return t.forEach(c,function(e){o[e]=function(){throw new Error("Method '"+e+"' is not implemented in the TzDate mock")}}),o},t.mock.TzDate.prototype=Date.prototype,t.mock.animate=t.module("ngAnimateMock",["ng"]).config(["$provide",function(e){var n=[];e.value("$$animateReflow",function(e){var t=n.length;return n.push(e),function(){n.splice(t,1)}}),e.decorator("$animate",function(e,r){var o={queue:[],enabled:e.enabled,triggerCallbacks:function(){r.flush()},triggerReflow:function(){t.forEach(n,function(e){e()}),n=[]}};return t.forEach(["enter","leave","move","addClass","removeClass","setClass"],function(t){o[t]=function(){o.queue.push({event:t,element:arguments[0],args:arguments}),e[t].apply(e,arguments)}}),o})}]),t.mock.dump=function(e){function n(e){var o;return t.isElement(e)?(e=t.element(e),o=t.element("<div></div>"),t.forEach(e,function(e){o.append(t.element(e).clone())}),o=o.html()):t.isArray(e)?(o=[],t.forEach(e,function(e){o.push(n(e))}),o="[ "+o.join(", ")+" ]"):o=t.isObject(e)?t.isFunction(e.$eval)&&t.isFunction(e.$apply)?r(e):e instanceof Error?e.stack||""+e.name+": "+e.message:t.toJson(e,!0):String(e),o}function r(e,n){n=n||"  ";var o=[n+"Scope("+e.$id+"): {"];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&!i.match(/^(\$|this)/)&&o.push("  "+i+": "+t.toJson(e[i]));for(var s=e.$$childHead;s;)o.push(r(s,n+"  ")),s=s.$$nextSibling;return o.push("}"),o.join("\n"+n)}return n(e)},t.mock.$HttpBackendProvider=function(){this.$get=["$rootScope",s]},t.mock.$TimeoutDecorator=function(e,n){function r(e){var n=[];return t.forEach(e,function(e){n.push("{id: "+e.id+", time: "+e.time+"}")}),n.join(", ")}return e.flush=function(e){n.defer.flush(e)},e.verifyNoPendingTasks=function(){if(n.deferredFns.length)throw new Error("Deferred tasks to flush ("+n.deferredFns.length+"): "+r(n.deferredFns))},e},t.mock.$RAFDecorator=function(e){var t=[],n=function(e){var n=t.length;return t.push(e),function(){t.splice(n,1)}};return n.supported=e.supported,n.flush=function(){if(0===t.length)throw new Error("No rAF callbacks present");for(var e=t.length,n=0;e>n;n++)t[n]();t=[]},n},t.mock.$AsyncCallbackDecorator=function(){var e=[],n=function(t){e.push(t)};return n.flush=function(){t.forEach(e,function(e){e()}),e=[]},n},t.mock.$RootElementProvider=function(){this.$get=function(){return t.element("<div ng-app></div>")}},t.module("ngMock",["ng"]).provider({$browser:t.mock.$BrowserProvider,$exceptionHandler:t.mock.$ExceptionHandlerProvider,$log:t.mock.$LogProvider,$interval:t.mock.$IntervalProvider,$httpBackend:t.mock.$HttpBackendProvider,$rootElement:t.mock.$RootElementProvider}).config(["$provide",function(e){e.decorator("$timeout",t.mock.$TimeoutDecorator),e.decorator("$$rAF",t.mock.$RAFDecorator),e.decorator("$$asyncCallback",t.mock.$AsyncCallbackDecorator)}]),t.module("ngMockE2E",["ng"]).config(["$provide",function(e){e.decorator("$httpBackend",t.mock.e2e.$httpBackendDecorator)}]),t.mock.e2e={},t.mock.e2e.$httpBackendDecorator=["$rootScope","$delegate","$browser",s],t.mock.clearDataCache=function(){var e,n=t.element.cache;for(e in n)if(Object.prototype.hasOwnProperty.call(n,e)){var r=n[e].handle;r&&t.element(r.elem).off(),delete n[e]}},e.jasmine||e.mocha){var f=null,l=function(){return!!f};(e.beforeEach||e.setup)(function(){f=this}),(e.afterEach||e.teardown)(function(){var e=f.$injector;t.forEach(f.$modules,function(e){e&&e.$$hashKey&&(e.$$hashKey=n)}),f.$injector=null,f.$modules=null,f=null,e&&(e.get("$rootElement").off(),e.get("$browser").pollFns.length=0),t.mock.clearDataCache(),t.forEach(t.element.fragments,function(e,n){delete t.element.fragments[n]}),c.$$lastInstance=null,t.forEach(t.callbacks,function(e,n){delete t.callbacks[n]}),t.callbacks.counter=0}),e.module=t.mock.module=function(){function e(){if(f.$injector)throw new Error("Injector already created, can not register a module!");var e=f.$modules||(f.$modules=[]);t.forEach(n,function(n){e.push(t.isObject(n)&&!t.isArray(n)?function(e){t.forEach(n,function(t,n){e.value(n,t)})}:n)})}var n=Array.prototype.slice.call(arguments,0);return l()?e():e};var d=function(e,t){this.message=e.message,this.name=e.name,e.line&&(this.line=e.line),e.sourceId&&(this.sourceId=e.sourceId),e.stack&&t&&(this.stack=e.stack+"\n"+t.stack),e.stackArray&&(this.stackArray=e.stackArray)};d.prototype.toString=Error.prototype.toString,e.inject=t.mock.inject=function(){function e(){var e=f.$modules||[];e.unshift("ngMock"),e.unshift("ng");var o=f.$injector;o||(o=f.$injector=t.injector(e));for(var i=0,s=n.length;s>i;i++)try{o.invoke(n[i]||t.noop,this)}catch(a){if(a.stack&&r)throw new d(a,r);throw a}finally{r=null}}var n=Array.prototype.slice.call(arguments,0),r=new Error("Declaration Location");return l()?e.call(f):e}}}(window,window.angular);
var Canvas2Image=function(){function t(t,e,n){var r=t.width,a=t.height;void 0==e&&(e=r),void 0==n&&(n=a);var o=document.createElement("canvas"),i=o.getContext("2d");return o.width=e,o.height=n,i.drawImage(t,0,0,r,a,0,0,e,n),o}function e(e,n,r,a){return e=t(e,r,a),e.toDataURL(n)}function n(t){document.location.href=t}function r(t){var e=document.createElement("img");return e.src=t,e}function a(t){t=t.toLowerCase().replace(/jpg/i,"jpeg");var e=t.match(/png|jpeg|bmp|gif/)[0];return"image/"+e}function o(t){if(!window.btoa)throw"btoa undefined";var e="";if("string"==typeof t)e=t;else for(var n=0;n<t.length;n++)e+=String.fromCharCode(t[n]);return btoa(e)}function i(t){var e=t.width,n=t.height;return t.getContext("2d").getImageData(0,0,e,n)}function c(t,e){return"data:"+e+";base64,"+t}var u=function(){var t=document.createElement("canvas"),e=t.getContext("2d");return{canvas:!!e,imageData:!!e.getImageData,dataURL:!!t.toDataURL,btoa:!!window.btoa}}(),g="image/octet-stream",f=function(t){var e=t.width,n=t.height,r=e*n*3,a=r+54,i=[66,77,255&a,a>>8&255,a>>16&255,a>>24&255,0,0,0,0,54,0,0,0],c=[40,0,0,0,255&e,e>>8&255,e>>16&255,e>>24&255,255&n,n>>8&255,n>>16&255,n>>24&255,1,0,24,0,0,0,0,0,255&r,r>>8&255,r>>16&255,r>>24&255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],u=(4-3*e%4)%4,g=t.data,f="",v=e<<2,d=n,m=String.fromCharCode;do{for(var s=v*(d-1),p="",h=0;e>h;h++){var b=h<<2;p+=m(g[s+b+2])+m(g[s+b+1])+m(g[s+b])}for(var l=0;u>l;l++)p+=String.fromCharCode(0);f+=p}while(--d);var w=o(i.concat(c))+o(f);return w},v=function(r,o,v,d){if(u.canvas&&u.dataURL)if("string"==typeof r&&(r=document.getElementById(r)),void 0==d&&(d="png"),d=a(d),/bmp/.test(d)){var m=i(t(r,o,v)),s=f(m);n(c(s,g))}else{var s=e(r,d,o,v);n(s.replace(d,g))}},d=function(n,o,g,v){if(u.canvas&&u.dataURL){if("string"==typeof n&&(n=document.getElementById(n)),void 0==v&&(v="png"),v=a(v),/bmp/.test(v)){var d=i(t(n,o,g)),m=f(d);return r(c(m,"image/bmp"))}var m=e(n,v,o,g);return r(m)}};return{saveAsImage:v,saveAsPNG:function(t,e,n){return v(t,e,n,"png")},saveAsJPEG:function(t,e,n){return v(t,e,n,"jpeg")},saveAsGIF:function(t,e,n){return v(t,e,n,"gif")},saveAsBMP:function(t,e,n){return v(t,e,n,"bmp")},convertToImage:d,convertToPNG:function(t,e,n){return d(t,e,n,"png")},convertToJPEG:function(t,e,n){return d(t,e,n,"jpeg")},convertToGIF:function(t,e,n){return d(t,e,n,"gif")},convertToBMP:function(t,e,n){return d(t,e,n,"bmp")}}}();
(function(){function n(n,r,e){for(var t=(e||0)-1,o=n?n.length:0;++t<o;)if(n[t]===r)return t;return-1}function r(r,e){var t=typeof e;if(r=r.cache,"boolean"==t||null==e)return r[e]?0:-1;"number"!=t&&"string"!=t&&(t="object");var o="number"==t?e:m+e;return r=(r=r[t])&&r[o],"object"==t?r&&n(r,e)>-1?0:-1:r?0:-1}function e(n){var r=this.cache,e=typeof n;if("boolean"==e||null==n)r[n]=!0;else{"number"!=e&&"string"!=e&&(e="object");var t="number"==e?n:m+n,o=r[e]||(r[e]={});"object"==e?(o[t]||(o[t]=[])).push(n):o[t]=!0}}function t(n){return n.charCodeAt(0)}function o(n,r){for(var e=n.criteria,t=r.criteria,o=-1,u=e.length;++o<u;){var a=e[o],i=t[o];if(a!==i){if(a>i||"undefined"==typeof a)return 1;if(i>a||"undefined"==typeof i)return-1}}return n.index-r.index}function u(n){var r=-1,t=n.length,o=n[0],u=n[t/2|0],a=n[t-1];if(o&&"object"==typeof o&&u&&"object"==typeof u&&a&&"object"==typeof a)return!1;var i=l();i["false"]=i["null"]=i["true"]=i.undefined=!1;var c=l();for(c.array=n,c.cache=i,c.push=e;++r<t;)c.push(n[r]);return c}function a(n){return"\\"+Z[n]}function i(){return v.pop()||[]}function l(){return y.pop()||{array:null,cache:null,criteria:null,"false":!1,index:0,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1,value:null}}function c(n){return"function"!=typeof n.toString&&"string"==typeof(n+"")}function f(n){n.length=0,v.length<w&&v.push(n)}function s(n){var r=n.cache;r&&s(r),n.array=n.cache=n.criteria=n.object=n.number=n.string=n.value=null,y.length<w&&y.push(n)}function p(n,r,e){r||(r=0),"undefined"==typeof e&&(e=n?n.length:0);for(var t=-1,o=e-r||0,u=Array(0>o?0:o);++t<o;)u[t]=n[r+t];return u}function g(e){function v(n){return n&&"object"==typeof n&&!fo(n)&&zt.call(n,"__wrapped__")?n:new y(n)}function y(n,r){this.__chain__=!!r,this.__wrapped__=n}function w(n){function r(){if(t){var n=p(t);Kt.apply(n,arguments)}if(this instanceof r){var u=rr(e.prototype),a=e.apply(u,n||arguments);return $r(a)?a:u}return e.apply(o,n||arguments)}var e=n[0],t=n[2],o=n[4];return co(r,n),r}function Z(n,r,e,t,o){if(e){var u=e(n);if("undefined"!=typeof u)return u}var a=$r(n);if(!a)return n;var l=Dt.call(n);if(!G[l]||!io.nodeClass&&c(n))return n;var s=uo[l];switch(l){case H:case W:return new s(+n);case K:case V:return new s(n);case M:return u=s(n.source,O.exec(n)),u.lastIndex=n.lastIndex,u}var g=fo(n);if(r){var h=!t;t||(t=i()),o||(o=i());for(var v=t.length;v--;)if(t[v]==n)return o[v];u=g?s(n.length):{}}else u=g?p(n):xo({},n);return g&&(zt.call(n,"index")&&(u.index=n.index),zt.call(n,"input")&&(u.input=n.input)),r?(t.push(n),o.push(u),(g?wo:Co)(n,function(n,a){u[a]=Z(n,r,e,t,o)}),h&&(f(t),f(o)),u):u}function rr(n){return $r(n)?Qt(n):{}}function er(n,r,e){if("function"!=typeof n)return ot;if("undefined"==typeof r||!("prototype"in n))return n;var t=n.__bindData__;if("undefined"==typeof t&&(io.funcNames&&(t=!n.name),t=t||!io.funcDecomp,!t)){var o=Wt.call(n);io.funcNames||(t=!S.test(o)),t||(t=N.test(o),co(n,t))}if(t===!1||t!==!0&&1&t[1])return n;switch(e){case 1:return function(e){return n.call(r,e)};case 2:return function(e,t){return n.call(r,e,t)};case 3:return function(e,t,o){return n.call(r,e,t,o)};case 4:return function(e,t,o,u){return n.call(r,e,t,o,u)}}return We(n,r)}function tr(n){function r(){var n=l?a:this;if(o){var h=p(o);Kt.apply(h,arguments)}if((u||f)&&(h||(h=p(arguments)),u&&Kt.apply(h,u),f&&h.length<i))return t|=16,tr([e,s?t:-4&t,h,null,a,i]);if(h||(h=arguments),c&&(e=n[g]),this instanceof r){n=rr(e.prototype);var v=e.apply(n,h);return $r(v)?v:n}return e.apply(n,h)}var e=n[0],t=n[1],o=n[2],u=n[3],a=n[4],i=n[5],l=1&t,c=2&t,f=4&t,s=8&t,g=e;return co(r,n),r}function or(e,t){var o=-1,a=vr(),i=e?e.length:0,l=i>=_&&a===n,c=[];if(l){var f=u(t);f?(a=r,t=f):l=!1}for(;++o<i;){var p=e[o];a(t,p)<0&&c.push(p)}return l&&s(t),c}function ar(n,r,e,t){for(var o=(t||0)-1,u=n?n.length:0,a=[];++o<u;){var i=n[o];if(i&&"object"==typeof i&&"number"==typeof i.length&&(fo(i)||mr(i))){r||(i=ar(i,r,e));var l=-1,c=i.length,f=a.length;for(a.length+=c;++l<c;)a[f++]=i[l]}else e||a.push(i)}return a}function ir(n,r,e,t,o,u){if(e){var a=e(n,r);if("undefined"!=typeof a)return!!a}if(n===r)return 0!==n||1/n==1/r;var l=typeof n,s=typeof r;if(!(n!==n||n&&Y[l]||r&&Y[s]))return!1;if(null==n||null==r)return n===r;var p=Dt.call(n),g=Dt.call(r);if(p==F&&(p=U),g==F&&(g=U),p!=g)return!1;switch(p){case H:case W:return+n==+r;case K:return n!=+n?r!=+r:0==n?1/n==1/r:n==+r;case M:case V:return n==St(r)}var h=p==B;if(!h){var v=zt.call(n,"__wrapped__"),y=zt.call(r,"__wrapped__");if(v||y)return ir(v?n.__wrapped__:n,y?r.__wrapped__:r,e,t,o,u);if(p!=U||!io.nodeClass&&(c(n)||c(r)))return!1;var b=!io.argsObject&&mr(n)?Et:n.constructor,d=!io.argsObject&&mr(r)?Et:r.constructor;if(b!=d&&!(Dr(b)&&b instanceof b&&Dr(d)&&d instanceof d)&&"constructor"in n&&"constructor"in r)return!1}var m=!o;o||(o=i()),u||(u=i());for(var _=o.length;_--;)if(o[_]==n)return u[_]==r;var w=0;if(a=!0,o.push(n),u.push(r),h){if(_=n.length,w=r.length,a=w==_,a||t)for(;w--;){var x=_,j=r[w];if(t)for(;x--&&!(a=ir(n[x],j,e,t,o,u)););else if(!(a=ir(n[w],j,e,t,o,u)))break}}else ko(r,function(r,i,l){return zt.call(l,i)?(w++,a=zt.call(n,i)&&ir(n[i],r,e,t,o,u)):void 0}),a&&!t&&ko(n,function(n,r,e){return zt.call(e,r)?a=--w>-1:void 0});return o.pop(),u.pop(),m&&(f(o),f(u)),a}function lr(n,r,e,t,o){(fo(r)?te:Co)(r,function(r,u){var a,i,l=r,c=n[u];if(r&&((i=fo(r))||Po(r))){for(var f=t.length;f--;)if(a=t[f]==r){c=o[f];break}if(!a){var s;e&&(l=e(c,r),(s="undefined"!=typeof l)&&(c=l)),s||(c=i?fo(c)?c:[]:Po(c)?c:{}),t.push(r),o.push(c),s||lr(c,r,e,t,o)}}else e&&(l=e(c,r),"undefined"==typeof l&&(l=r)),"undefined"!=typeof l&&(c=l);n[u]=c})}function cr(n,r){return n+Ht(oo()*(r-n+1))}function fr(e,t,o){var a=-1,l=vr(),c=e?e.length:0,p=[],g=!t&&c>=_&&l===n,h=o||g?i():p;if(g){var v=u(h);l=r,h=v}for(;++a<c;){var y=e[a],b=o?o(y,a,e):y;(t?!a||h[h.length-1]!==b:l(h,b)<0)&&((o||g)&&h.push(b),p.push(y))}return g?(f(h.array),s(h)):o&&f(h),p}function sr(n){return function(r,e,t){var o={};if(e=v.createCallback(e,t,3),fo(r))for(var u=-1,a=r.length;++u<a;){var i=r[u];n(o,i,e(i,u,r),r)}else wo(r,function(r,t,u){n(o,r,e(r,t,u),u)});return o}}function pr(n,r,e,t,o,u){var a=1&r,i=2&r,l=4&r,c=16&r,f=32&r;if(!i&&!Dr(n))throw new At;c&&!e.length&&(r&=-17,c=e=!1),f&&!t.length&&(r&=-33,f=t=!1);var s=n&&n.__bindData__;if(s&&s!==!0)return s=p(s),s[2]&&(s[2]=p(s[2])),s[3]&&(s[3]=p(s[3])),!a||1&s[1]||(s[4]=o),!a&&1&s[1]&&(r|=8),!l||4&s[1]||(s[5]=u),c&&Kt.apply(s[2]||(s[2]=[]),e),f&&Gt.apply(s[3]||(s[3]=[]),t),s[1]|=r,pr.apply(null,s);var g=1==r||17===r?w:tr;return g([n,r,e,t,o,u])}function gr(){X.shadowedProps=D,X.array=X.bottom=X.loop=X.top="",X.init="iterable",X.useHas=!0;for(var n,r=0;n=arguments[r];r++)for(var e in n)X[e]=n[e];var t=X.args;X.firstArg=/^[^,]+/.exec(t)[0];var o=kt("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString","return function("+t+") {\n"+lo(X)+"\n}");return o(er,q,Lt,zt,d,mr,fo,qr,X.keys,Nt,Y,ao,V,Rt,Dt)}function hr(n){return yo[n]}function vr(){var r=(r=v.indexOf)===ke?n:r;return r}function yr(n){return"function"==typeof n&&$t.test(n)}function br(n){var r,e;return!n||Dt.call(n)!=U||(r=n.constructor,Dr(r)&&!(r instanceof r))||!io.argsClass&&mr(n)||!io.nodeClass&&c(n)?!1:io.ownLast?(ko(n,function(n,r,t){return e=zt.call(t,r),!1}),e!==!1):(ko(n,function(n,r){e=r}),"undefined"==typeof e||zt.call(n,e))}function dr(n){return bo[n]}function mr(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Dt.call(n)==F||!1}function _r(n,r,e,t){return"boolean"!=typeof r&&null!=r&&(t=e,e=r,r=!1),Z(n,r,"function"==typeof e&&er(e,t,1))}function wr(n,r,e){return Z(n,!0,"function"==typeof r&&er(r,e,1))}function xr(n,r){var e=rr(n);return r?xo(e,r):e}function jr(n,r,e){var t;return r=v.createCallback(r,e,3),Co(n,function(n,e,o){return r(n,e,o)?(t=e,!1):void 0}),t}function kr(n,r,e){var t;return r=v.createCallback(r,e,3),Pr(n,function(n,e,o){return r(n,e,o)?(t=e,!1):void 0}),t}function Cr(n,r,e){var t=[];ko(n,function(n,r){t.push(r,n)});var o=t.length;for(r=er(r,e,3);o--&&r(t[o--],t[o],n)!==!1;);return n}function Pr(n,r,e){var t=po(n),o=t.length;for(r=er(r,e,3);o--;){var u=t[o];if(r(n[u],u,n)===!1)break}return n}function Er(n){var r=[];return ko(n,function(n,e){Dr(n)&&r.push(e)}),r.sort()}function Or(n,r){return n?zt.call(n,r):!1}function Sr(n){for(var r=-1,e=po(n),t=e.length,o={};++r<t;){var u=e[r];o[n[u]]=u}return o}function Ar(n){return n===!0||n===!1||n&&"object"==typeof n&&Dt.call(n)==H||!1}function Ir(n){return n&&"object"==typeof n&&Dt.call(n)==W||!1}function Lr(n){return n&&1===n.nodeType||!1}function Nr(n){var r=!0;if(!n)return r;var e=Dt.call(n),t=n.length;return e==B||e==V||(io.argsClass?e==F:mr(n))||e==U&&"number"==typeof t&&Dr(n.splice)?!t:(Co(n,function(){return r=!1}),r)}function Rr(n,r,e,t){return ir(n,r,"function"==typeof e&&er(e,t,2))}function Tr(n){return Yt(n)&&!Zt(parseFloat(n))}function Dr(n){return"function"==typeof n}function $r(n){return!(!n||!Y[typeof n])}function Fr(n){return Hr(n)&&n!=+n}function Br(n){return null===n}function Hr(n){return"number"==typeof n||n&&"object"==typeof n&&Dt.call(n)==K||!1}function Wr(n){return n&&Y[typeof n]&&Dt.call(n)==M||!1}function qr(n){return"string"==typeof n||n&&"object"==typeof n&&Dt.call(n)==V||!1}function zr(n){return"undefined"==typeof n}function Kr(n,r,e){var t={};return r=v.createCallback(r,e,3),Co(n,function(n,e,o){t[e]=r(n,e,o)}),t}function Ur(n){var r=arguments,e=2;if(!$r(n))return n;if("number"!=typeof r[2]&&(e=r.length),e>3&&"function"==typeof r[e-2])var t=er(r[--e-1],r[e--],2);else e>2&&"function"==typeof r[e-1]&&(t=r[--e]);for(var o=p(arguments,1,e),u=-1,a=i(),l=i();++u<e;)lr(n,o[u],t,a,l);return f(a),f(l),n}function Mr(n,r,e){var t={};if("function"!=typeof r){var o=[];ko(n,function(n,r){o.push(r)}),o=or(o,ar(arguments,!0,!1,1));for(var u=-1,a=o.length;++u<a;){var i=o[u];t[i]=n[i]}}else r=v.createCallback(r,e,3),ko(n,function(n,e,o){r(n,e,o)||(t[e]=n)});return t}function Vr(n){for(var r=-1,e=po(n),t=e.length,o=_t(t);++r<t;){var u=e[r];o[r]=[u,n[u]]}return o}function Gr(n,r,e){var t={};if("function"!=typeof r)for(var o=-1,u=ar(arguments,!0,!1,1),a=$r(n)?u.length:0;++o<a;){var i=u[o];i in n&&(t[i]=n[i])}else r=v.createCallback(r,e,3),ko(n,function(n,e,o){r(n,e,o)&&(t[e]=n)});return t}function Jr(n,r,e,t){var o=fo(n);if(null==e)if(o)e=[];else{var u=n&&n.constructor,a=u&&u.prototype;e=rr(a)}return r&&(r=v.createCallback(r,t,4),(o?wo:Co)(n,function(n,t,o){return r(e,n,t,o)})),e}function Qr(n){for(var r=-1,e=po(n),t=e.length,o=_t(t);++r<t;)o[r]=n[e[r]];return o}function Xr(n){var r=arguments,e=-1,t=ar(r,!0,!1,1),o=r[2]&&r[2][r[1]]===n?1:t.length,u=_t(o);for(io.unindexedChars&&qr(n)&&(n=n.split(""));++e<o;)u[e]=n[t[e]];return u}function Yr(n,r,e){var t=-1,o=vr(),u=n?n.length:0,a=!1;return e=(0>e?ro(0,u+e):e)||0,fo(n)?a=o(n,r,e)>-1:"number"==typeof u?a=(qr(n)?n.indexOf(r,e):o(n,r,e))>-1:wo(n,function(n){return++t>=e?!(a=n===r):void 0}),a}function Zr(n,r,e){var t=!0;if(r=v.createCallback(r,e,3),fo(n))for(var o=-1,u=n.length;++o<u&&(t=!!r(n[o],o,n)););else wo(n,function(n,e,o){return t=!!r(n,e,o)});return t}function ne(n,r,e){var t=[];if(r=v.createCallback(r,e,3),fo(n))for(var o=-1,u=n.length;++o<u;){var a=n[o];r(a,o,n)&&t.push(a)}else wo(n,function(n,e,o){r(n,e,o)&&t.push(n)});return t}function re(n,r,e){if(r=v.createCallback(r,e,3),!fo(n)){var t;return wo(n,function(n,e,o){return r(n,e,o)?(t=n,!1):void 0}),t}for(var o=-1,u=n.length;++o<u;){var a=n[o];if(r(a,o,n))return a}}function ee(n,r,e){var t;return r=v.createCallback(r,e,3),oe(n,function(n,e,o){return r(n,e,o)?(t=n,!1):void 0}),t}function te(n,r,e){if(r&&"undefined"==typeof e&&fo(n))for(var t=-1,o=n.length;++t<o&&r(n[t],t,n)!==!1;);else wo(n,r,e);return n}function oe(n,r,e){var t=n,o=n?n.length:0;if(r=r&&"undefined"==typeof e?r:er(r,e,3),fo(n))for(;o--&&r(n[o],o,n)!==!1;);else{if("number"!=typeof o){var u=po(n);o=u.length}else io.unindexedChars&&qr(n)&&(t=n.split(""));wo(n,function(n,e,a){return e=u?u[--o]:--o,r(t[e],e,a)})}return n}function ue(n,r){var e=p(arguments,2),t=-1,o="function"==typeof r,u=n?n.length:0,a=_t("number"==typeof u?u:0);return te(n,function(n){a[++t]=(o?r:n[r]).apply(n,e)}),a}function ae(n,r,e){var t=-1,o=n?n.length:0,u=_t("number"==typeof o?o:0);if(r=v.createCallback(r,e,3),fo(n))for(;++t<o;)u[t]=r(n[t],t,n);else wo(n,function(n,e,o){u[++t]=r(n,e,o)});return u}function ie(n,r,e){var o=-1/0,u=o;if("function"!=typeof r&&e&&e[r]===n&&(r=null),null==r&&fo(n))for(var a=-1,i=n.length;++a<i;){var l=n[a];l>u&&(u=l)}else r=null==r&&qr(n)?t:v.createCallback(r,e,3),wo(n,function(n,e,t){var a=r(n,e,t);a>o&&(o=a,u=n)});return u}function le(n,r,e){var o=1/0,u=o;if("function"!=typeof r&&e&&e[r]===n&&(r=null),null==r&&fo(n))for(var a=-1,i=n.length;++a<i;){var l=n[a];u>l&&(u=l)}else r=null==r&&qr(n)?t:v.createCallback(r,e,3),wo(n,function(n,e,t){var a=r(n,e,t);o>a&&(o=a,u=n)});return u}function ce(n,r,e,t){var o=arguments.length<3;if(r=v.createCallback(r,t,4),fo(n)){var u=-1,a=n.length;for(o&&(e=n[++u]);++u<a;)e=r(e,n[u],u,n)}else wo(n,function(n,t,u){e=o?(o=!1,n):r(e,n,t,u)});return e}function fe(n,r,e,t){var o=arguments.length<3;return r=v.createCallback(r,t,4),oe(n,function(n,t,u){e=o?(o=!1,n):r(e,n,t,u)}),e}function se(n,r,e){return r=v.createCallback(r,e,3),ne(n,function(n,e,t){return!r(n,e,t)})}function pe(n,r,e){if(n&&"number"!=typeof n.length?n=Qr(n):io.unindexedChars&&qr(n)&&(n=n.split("")),null==r||e)return n?n[cr(0,n.length-1)]:h;var t=ge(n);return t.length=eo(ro(0,r),t.length),t}function ge(n){var r=-1,e=n?n.length:0,t=_t("number"==typeof e?e:0);return te(n,function(n){var e=cr(0,++r);t[r]=t[e],t[e]=n}),t}function he(n){var r=n?n.length:0;return"number"==typeof r?r:po(n).length}function ve(n,r,e){var t;if(r=v.createCallback(r,e,3),fo(n))for(var o=-1,u=n.length;++o<u&&!(t=r(n[o],o,n)););else wo(n,function(n,e,o){return!(t=r(n,e,o))});return!!t}function ye(n,r,e){var t=-1,u=fo(r),a=n?n.length:0,c=_t("number"==typeof a?a:0);for(u||(r=v.createCallback(r,e,3)),te(n,function(n,e,o){var a=c[++t]=l();u?a.criteria=ae(r,function(r){return n[r]}):(a.criteria=i())[0]=r(n,e,o),a.index=t,a.value=n}),a=c.length,c.sort(o);a--;){var p=c[a];c[a]=p.value,u||f(p.criteria),s(p)}return c}function be(n){return n&&"number"==typeof n.length?io.unindexedChars&&qr(n)?n.split(""):p(n):Qr(n)}function de(n){for(var r=-1,e=n?n.length:0,t=[];++r<e;){var o=n[r];o&&t.push(o)}return t}function me(n){return or(n,ar(arguments,!0,!0,1))}function _e(n,r,e){var t=-1,o=n?n.length:0;for(r=v.createCallback(r,e,3);++t<o;)if(r(n[t],t,n))return t;return-1}function we(n,r,e){var t=n?n.length:0;for(r=v.createCallback(r,e,3);t--;)if(r(n[t],t,n))return t;return-1}function xe(n,r,e){var t=0,o=n?n.length:0;if("number"!=typeof r&&null!=r){var u=-1;for(r=v.createCallback(r,e,3);++u<o&&r(n[u],u,n);)t++}else if(t=r,null==t||e)return n?n[0]:h;return p(n,0,eo(ro(0,t),o))}function je(n,r,e,t){return"boolean"!=typeof r&&null!=r&&(t=e,e="function"!=typeof r&&t&&t[r]===n?null:r,r=!1),null!=e&&(n=ae(n,e,t)),ar(n,r)}function ke(r,e,t){if("number"==typeof t){var o=r?r.length:0;t=0>t?ro(0,o+t):t||0}else if(t){var u=Ne(r,e);return r[u]===e?u:-1}return n(r,e,t)}function Ce(n,r,e){var t=0,o=n?n.length:0;if("number"!=typeof r&&null!=r){var u=o;for(r=v.createCallback(r,e,3);u--&&r(n[u],u,n);)t++}else t=null==r||e?1:r||t;return p(n,0,eo(ro(0,o-t),o))}function Pe(){for(var e=[],t=-1,o=arguments.length,a=i(),l=vr(),c=l===n,p=i();++t<o;){var g=arguments[t];(fo(g)||mr(g))&&(e.push(g),a.push(c&&g.length>=_&&u(t?e[t]:p)))}var h=e[0],v=-1,y=h?h.length:0,b=[];n:for(;++v<y;){var d=a[0];if(g=h[v],(d?r(d,g):l(p,g))<0){for(t=o,(d||p).push(g);--t;)if(d=a[t],(d?r(d,g):l(e[t],g))<0)continue n;b.push(g)}}for(;o--;)d=a[o],d&&s(d);return f(a),f(p),b}function Ee(n,r,e){var t=0,o=n?n.length:0;if("number"!=typeof r&&null!=r){var u=o;for(r=v.createCallback(r,e,3);u--&&r(n[u],u,n);)t++}else if(t=r,null==t||e)return n?n[o-1]:h;return p(n,ro(0,o-t))}function Oe(n,r,e){var t=n?n.length:0;for("number"==typeof e&&(t=(0>e?ro(0,t+e):eo(e,t-1))+1);t--;)if(n[t]===r)return t;return-1}function Se(n){for(var r=arguments,e=0,t=r.length,o=n?n.length:0;++e<t;)for(var u=-1,a=r[e];++u<o;)n[u]===a&&(Vt.call(n,u--,1),o--);return n}function Ae(n,r,e){n=+n||0,e="number"==typeof e?e:+e||1,null==r&&(r=n,n=0);for(var t=-1,o=ro(0,Ft((r-n)/(e||1))),u=_t(o);++t<o;)u[t]=n,n+=e;return u}function Ie(n,r,e){var t=-1,o=n?n.length:0,u=[];for(r=v.createCallback(r,e,3);++t<o;){var a=n[t];r(a,t,n)&&(u.push(a),Vt.call(n,t--,1),o--)}return u}function Le(n,r,e){if("number"!=typeof r&&null!=r){var t=0,o=-1,u=n?n.length:0;for(r=v.createCallback(r,e,3);++o<u&&r(n[o],o,n);)t++}else t=null==r||e?1:ro(0,r);return p(n,t)}function Ne(n,r,e,t){var o=0,u=n?n.length:o;for(e=e?v.createCallback(e,t,1):ot,r=e(r);u>o;){var a=o+u>>>1;e(n[a])<r?o=a+1:u=a}return o}function Re(){return fr(ar(arguments,!0,!0))}function Te(n,r,e,t){return"boolean"!=typeof r&&null!=r&&(t=e,e="function"!=typeof r&&t&&t[r]===n?null:r,r=!1),null!=e&&(e=v.createCallback(e,t,3)),fr(n,r,e)}function De(n){return or(n,p(arguments,1))}function $e(){for(var n=-1,r=arguments.length;++n<r;){var e=arguments[n];if(fo(e)||mr(e))var t=t?fr(or(t,e).concat(or(e,t))):e}return t||[]}function Fe(){for(var n=arguments.length>1?arguments:arguments[0],r=-1,e=n?ie(Ao(n,"length")):0,t=_t(0>e?0:e);++r<e;)t[r]=Ao(n,r);return t}function Be(n,r){var e=-1,t=n?n.length:0,o={};for(r||!t||fo(n[0])||(r=[]);++e<t;){var u=n[e];r?o[u]=r[e]:u&&(o[u[0]]=u[1])}return o}function He(n,r){if(!Dr(r))throw new At;return function(){return--n<1?r.apply(this,arguments):void 0}}function We(n,r){return arguments.length>2?pr(n,17,p(arguments,2),null,r):pr(n,1,null,null,r)}function qe(n){for(var r=arguments.length>1?ar(arguments,!0,!1,1):Er(n),e=-1,t=r.length;++e<t;){var o=r[e];n[o]=pr(n[o],1,null,null,n)}return n}function ze(n,r){return arguments.length>2?pr(r,19,p(arguments,2),null,n):pr(r,3,null,null,n)}function Ke(){for(var n=arguments,r=n.length;r--;)if(!Dr(n[r]))throw new At;return function(){for(var r=arguments,e=n.length;e--;)r=[n[e].apply(this,r)];return r[0]}}function Ue(n,r){return r="number"==typeof r?r:+r||n.length,pr(n,4,null,null,null,r)}function Me(n,r,e){var t,o,u,a,i,l,c,f=0,s=!1,p=!0;if(!Dr(n))throw new At;if(r=ro(0,r)||0,e===!0){var g=!0;p=!1}else $r(e)&&(g=e.leading,s="maxWait"in e&&(ro(r,e.maxWait)||0),p="trailing"in e?e.trailing:p);var v=function(){var e=r-(Lo()-a);if(0>=e){o&&Bt(o);var s=c;o=l=c=h,s&&(f=Lo(),u=n.apply(i,t),l||o||(t=i=null))}else l=Mt(v,e)},y=function(){l&&Bt(l),o=l=c=h,(p||s!==r)&&(f=Lo(),u=n.apply(i,t),l||o||(t=i=null))};return function(){if(t=arguments,a=Lo(),i=this,c=p&&(l||!g),s===!1)var e=g&&!l;else{o||g||(f=a);var h=s-(a-f),b=0>=h;b?(o&&(o=Bt(o)),f=a,u=n.apply(i,t)):o||(o=Mt(y,h))}return b&&l?l=Bt(l):l||r===s||(l=Mt(v,r)),e&&(b=!0,u=n.apply(i,t)),!b||l||o||(t=i=null),u}}function Ve(n){if(!Dr(n))throw new At;var r=p(arguments,1);return Mt(function(){n.apply(h,r)},1)}function Ge(n,r){if(!Dr(n))throw new At;var e=p(arguments,2);return Mt(function(){n.apply(h,e)},r)}function Je(n,r){if(!Dr(n))throw new At;var e=function(){var t=e.cache,o=r?r.apply(this,arguments):m+arguments[0];return zt.call(t,o)?t[o]:t[o]=n.apply(this,arguments)};return e.cache={},e}function Qe(n){var r,e;if(!Dr(n))throw new At;return function(){return r?e:(r=!0,e=n.apply(this,arguments),n=null,e)}}function Xe(n){return pr(n,16,p(arguments,1))}function Ye(n){return pr(n,32,null,p(arguments,1))}function Ze(n,r,e){var t=!0,o=!0;if(!Dr(n))throw new At;return e===!1?t=!1:$r(e)&&(t="leading"in e?e.leading:t,o="trailing"in e?e.trailing:o),J.leading=t,J.maxWait=r,J.trailing=o,Me(n,r,J)}function nt(n,r){return pr(r,16,[n])}function rt(n){return function(){return n}}function et(n,r,e){var t=typeof n;if(null==n||"function"==t)return er(n,r,e);if("object"!=t)return lt(n);var o=po(n),u=o[0],a=n[u];return 1!=o.length||a!==a||$r(a)?function(r){for(var e=o.length,t=!1;e--&&(t=ir(r[o[e]],n[o[e]],null,!0)););return t}:function(n){var r=n[u];return a===r&&(0!==a||1/a==1/r)}}function tt(n){return null==n?"":St(n).replace(_o,hr)}function ot(n){return n}function ut(n,r,e){var t=!0,o=r&&Er(r);r&&(e||o.length)||(null==e&&(e=r),u=y,r=n,n=v,o=Er(r)),e===!1?t=!1:$r(e)&&"chain"in e&&(t=e.chain);var u=n,a=Dr(u);te(o,function(e){var o=n[e]=r[e];a&&(u.prototype[e]=function(){var r=this.__chain__,e=this.__wrapped__,a=[e];Kt.apply(a,arguments);var i=o.apply(n,a);if(t||r){if(e===i&&$r(i))return this;i=new u(i),i.__chain__=r}return i})})}function at(){return e._=Tt,this}function it(){}function lt(n){return function(r){return r[n]}}function ct(n,r,e){var t=null==n,o=null==r;if(null==e&&("boolean"==typeof n&&o?(e=n,n=1):o||"boolean"!=typeof r||(e=r,o=!0)),t&&o&&(r=1),n=+n||0,o?(r=n,n=0):r=+r||0,e||n%1||r%1){var u=oo();return eo(n+u*(r-n+parseFloat("1e-"+((u+"").length-1))),r)}return cr(n,r)}function ft(n,r){if(n){var e=n[r];return Dr(e)?n[r]():e}}function st(n,r,e){var t=v.templateSettings;n=St(n||""),e=jo({},e,t);var o,u=jo({},e.imports,t.imports),i=po(u),l=Qr(u),c=0,f=e.interpolate||L,s="__p += '",p=Ot((e.escape||L).source+"|"+f.source+"|"+(f===A?E:L).source+"|"+(e.evaluate||L).source+"|$","g");n.replace(p,function(r,e,t,u,i,l){return t||(t=u),s+=n.slice(c,l).replace(R,a),e&&(s+="' +\n__e("+e+") +\n'"),i&&(o=!0,s+="';\n"+i+";\n__p += '"),t&&(s+="' +\n((__t = ("+t+")) == null ? '' : __t) +\n'"),c=l+r.length,r}),s+="';\n";var g=e.variable,y=g;y||(g="obj",s="with ("+g+") {\n"+s+"\n}\n"),s=(o?s.replace(j,""):s).replace(C,"$1").replace(P,"$1;"),s="function("+g+") {\n"+(y?"":g+" || ("+g+" = {});\n")+"var __t, __p = '', __e = _.escape"+(o?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+s+"return __p\n}";var b="\n/*\n//# sourceURL="+(e.sourceURL||"/lodash/template/source["+$++ +"]")+"\n*/";try{var d=kt(i,"return "+s+b).apply(h,l)}catch(m){throw m.source=s,m}return r?d(r):(d.source=s,d)}function pt(n,r,e){n=(n=+n)>-1?n:0;var t=-1,o=_t(n);for(r=er(r,e,1);++t<n;)o[t]=r(t);return o}function gt(n){return null==n?"":St(n).replace(mo,dr)}function ht(n){var r=++b;return St(null==n?"":n)+r}function vt(n){return n=new y(n),n.__chain__=!0,n}function yt(n,r){return r(n),n}function bt(){return this.__chain__=!0,this}function dt(){return St(this.__wrapped__)}function mt(){return this.__wrapped__}e=e?ur.defaults(nr.Object(),e,ur.pick(nr,T)):nr;var _t=e.Array,wt=e.Boolean,xt=e.Date,jt=e.Error,kt=e.Function,Ct=e.Math,Pt=e.Number,Et=e.Object,Ot=e.RegExp,St=e.String,At=e.TypeError,It=[],Lt=jt.prototype,Nt=Et.prototype,Rt=St.prototype,Tt=e._,Dt=Nt.toString,$t=Ot("^"+St(Dt).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),Ft=Ct.ceil,Bt=e.clearTimeout,Ht=Ct.floor,Wt=kt.prototype.toString,qt=yr(qt=Et.getPrototypeOf)&&qt,zt=Nt.hasOwnProperty,Kt=It.push,Ut=Nt.propertyIsEnumerable,Mt=e.setTimeout,Vt=It.splice,Gt=It.unshift,Jt=function(){try{var n={},r=yr(r=Et.defineProperty)&&r,e=r(n,n,n)&&r}catch(t){}return e}(),Qt=yr(Qt=Et.create)&&Qt,Xt=yr(Xt=_t.isArray)&&Xt,Yt=e.isFinite,Zt=e.isNaN,no=yr(no=Et.keys)&&no,ro=Ct.max,eo=Ct.min,to=e.parseInt,oo=Ct.random,uo={};uo[B]=_t,uo[H]=wt,uo[W]=xt,uo[z]=kt,uo[U]=Et,uo[K]=Pt,uo[M]=Ot,uo[V]=St;var ao={};ao[B]=ao[W]=ao[K]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},ao[H]=ao[V]={constructor:!0,toString:!0,valueOf:!0},ao[q]=ao[z]=ao[M]={constructor:!0,toString:!0},ao[U]={constructor:!0},function(){for(var n=D.length;n--;){var r=D[n];for(var e in ao)zt.call(ao,e)&&!zt.call(ao[e],r)&&(ao[e][r]=!1)}}(),y.prototype=v.prototype;var io=v.support={};!function(){var n=function(){this.x=1},r={0:1,length:1},t=[];n.prototype={valueOf:1,y:1};for(var o in new n)t.push(o);for(o in arguments);io.argsClass=Dt.call(arguments)==F,io.argsObject=arguments.constructor==Et&&!(arguments instanceof _t),io.enumErrorProps=Ut.call(Lt,"message")||Ut.call(Lt,"name"),io.enumPrototypes=Ut.call(n,"prototype"),io.funcDecomp=!yr(e.WinRTError)&&N.test(g),io.funcNames="string"==typeof kt.name,io.nonEnumArgs=0!=o,io.nonEnumShadows=!/valueOf/.test(t),io.ownLast="x"!=t[0],io.spliceObjects=(It.splice.call(r,0,1),!r[0]),io.unindexedChars="x"[0]+Et("x")[0]!="xx";try{io.nodeClass=!(Dt.call(document)==U&&!({toString:0}+""))}catch(u){io.nodeClass=!0}}(1),v.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:A,variable:"",imports:{_:v}};var lo=function(n){var r="var index, iterable = "+n.firstArg+", result = "+n.init+";\nif (!iterable) return result;\n"+n.top+";";n.array?(r+="\nvar length = iterable.length; index = -1;\nif ("+n.array+") {  ",io.unindexedChars&&(r+="\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "),r+="\n  while (++index < length) {\n    "+n.loop+";\n  }\n}\nelse {  "):io.nonEnumArgs&&(r+="\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      "+n.loop+";\n    }\n  } else {  "),io.enumPrototypes&&(r+="\n  var skipProto = typeof iterable == 'function';\n  "),io.enumErrorProps&&(r+="\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ");var e=[];if(io.enumPrototypes&&e.push('!(skipProto && index == "prototype")'),io.enumErrorProps&&e.push('!(skipErrorProps && (index == "message" || index == "name"))'),n.useHas&&n.keys)r+="\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n",e.length&&(r+="    if ("+e.join(" && ")+") {\n  "),r+=n.loop+";    ",e.length&&(r+="\n    }"),r+="\n  }  ";else if(r+="\n  for (index in iterable) {\n",n.useHas&&e.push("hasOwnProperty.call(iterable, index)"),e.length&&(r+="    if ("+e.join(" && ")+") {\n  "),r+=n.loop+";    ",e.length&&(r+="\n    }"),r+="\n  }    ",io.nonEnumShadows){for(r+="\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ",k=0;k<7;k++)r+="\n    index = '"+n.shadowedProps[k]+"';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))",n.useHas||(r+=" || (!nonEnum[index] && iterable[index] !== objectProto[index])"),r+=") {\n      "+n.loop+";\n    }      ";r+="\n  }    "}return(n.array||io.nonEnumArgs)&&(r+="\n}"),r+=n.bottom+";\nreturn result"};Qt||(rr=function(){function n(){}return function(r){if($r(r)){n.prototype=r;var t=new n;n.prototype=null}return t||e.Object()}}());var co=Jt?function(n,r){Q.value=r,Jt(n,"__bindData__",Q)}:it;io.argsClass||(mr=function(n){return n&&"object"==typeof n&&"number"==typeof n.length&&zt.call(n,"callee")&&!Ut.call(n,"callee")||!1});var fo=Xt||function(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Dt.call(n)==B||!1},so=gr({args:"object",init:"[]",top:"if (!(objectTypes[typeof object])) return result",loop:"result.push(index)"}),po=no?function(n){return $r(n)?io.enumPrototypes&&"function"==typeof n||io.nonEnumArgs&&n.length&&mr(n)?so(n):no(n):[]}:so,go={args:"collection, callback, thisArg",top:"callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",array:"typeof length == 'number'",keys:po,loop:"if (callback(iterable[index], index, collection) === false) return result"},ho={args:"object, source, guard",top:"var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {",keys:po,loop:"if (typeof result[index] == 'undefined') result[index] = iterable[index]",bottom:"  }\n}"},vo={top:"if (!objectTypes[typeof iterable]) return result;\n"+go.top,array:!1},yo={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},bo=Sr(yo),mo=Ot("("+po(bo).join("|")+")","g"),_o=Ot("["+po(yo).join("")+"]","g"),wo=gr(go),xo=gr(ho,{top:ho.top.replace(";",";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"),loop:"result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"}),jo=gr(ho),ko=gr(go,vo,{useHas:!1}),Co=gr(go,vo);Dr(/x/)&&(Dr=function(n){return"function"==typeof n&&Dt.call(n)==z});var Po=qt?function(n){if(!n||Dt.call(n)!=U||!io.argsClass&&mr(n))return!1;var r=n.valueOf,e=yr(r)&&(e=qt(r))&&qt(e);return e?n==e||qt(n)==e:br(n)}:br,Eo=sr(function(n,r,e){zt.call(n,e)?n[e]++:n[e]=1}),Oo=sr(function(n,r,e){(zt.call(n,e)?n[e]:n[e]=[]).push(r)}),So=sr(function(n,r,e){n[e]=r}),Ao=ae,Io=ne,Lo=yr(Lo=xt.now)&&Lo||function(){return(new xt).getTime()},No=8==to(x+"08")?to:function(n,r){return to(qr(n)?n.replace(I,""):n,r||0)};return v.after=He,v.assign=xo,v.at=Xr,v.bind=We,v.bindAll=qe,v.bindKey=ze,v.chain=vt,v.compact=de,v.compose=Ke,v.constant=rt,v.countBy=Eo,v.create=xr,v.createCallback=et,v.curry=Ue,v.debounce=Me,v.defaults=jo,v.defer=Ve,v.delay=Ge,v.difference=me,v.filter=ne,v.flatten=je,v.forEach=te,v.forEachRight=oe,v.forIn=ko,v.forInRight=Cr,v.forOwn=Co,v.forOwnRight=Pr,v.functions=Er,v.groupBy=Oo,v.indexBy=So,v.initial=Ce,v.intersection=Pe,v.invert=Sr,v.invoke=ue,v.keys=po,v.map=ae,v.mapValues=Kr,v.max=ie,v.memoize=Je,v.merge=Ur,v.min=le,v.omit=Mr,v.once=Qe,v.pairs=Vr,v.partial=Xe,v.partialRight=Ye,v.pick=Gr,v.pluck=Ao,v.property=lt,v.pull=Se,v.range=Ae,v.reject=se,v.remove=Ie,v.rest=Le,v.shuffle=ge,v.sortBy=ye,v.tap=yt,v.throttle=Ze,v.times=pt,v.toArray=be,v.transform=Jr,v.union=Re,v.uniq=Te,v.values=Qr,v.where=Io,v.without=De,v.wrap=nt,v.xor=$e,v.zip=Fe,v.zipObject=Be,v.collect=ae,v.drop=Le,v.each=te,v.eachRight=oe,v.extend=xo,v.methods=Er,v.object=Be,v.select=ne,v.tail=Le,v.unique=Te,v.unzip=Fe,ut(v),v.clone=_r,v.cloneDeep=wr,v.contains=Yr,v.escape=tt,v.every=Zr,v.find=re,v.findIndex=_e,v.findKey=jr,v.findLast=ee,v.findLastIndex=we,v.findLastKey=kr,v.has=Or,v.identity=ot,v.indexOf=ke,v.isArguments=mr,v.isArray=fo,v.isBoolean=Ar,v.isDate=Ir,v.isElement=Lr,v.isEmpty=Nr,v.isEqual=Rr,v.isFinite=Tr,v.isFunction=Dr,v.isNaN=Fr,v.isNull=Br,v.isNumber=Hr,v.isObject=$r,v.isPlainObject=Po,v.isRegExp=Wr,v.isString=qr,v.isUndefined=zr,v.lastIndexOf=Oe,v.mixin=ut,v.noConflict=at,v.noop=it,v.now=Lo,v.parseInt=No,v.random=ct,v.reduce=ce,v.reduceRight=fe,v.result=ft,v.runInContext=g,v.size=he,v.some=ve,v.sortedIndex=Ne,v.template=st,v.unescape=gt,v.uniqueId=ht,v.all=Zr,v.any=ve,v.detect=re,v.findWhere=re,v.foldl=ce,v.foldr=fe,v.include=Yr,v.inject=ce,ut(function(){var n={};return Co(v,function(r,e){v.prototype[e]||(n[e]=r)}),n}(),!1),v.first=xe,v.last=Ee,v.sample=pe,v.take=xe,v.head=xe,Co(v,function(n,r){var e="sample"!==r;v.prototype[r]||(v.prototype[r]=function(r,t){var o=this.__chain__,u=n(this.__wrapped__,r,t);return o||null!=r&&(!t||e&&"function"==typeof r)?new y(u,o):u})}),v.VERSION="2.4.1",v.prototype.chain=bt,v.prototype.toString=dt,v.prototype.value=mt,v.prototype.valueOf=mt,wo(["join","pop","shift"],function(n){var r=It[n];v.prototype[n]=function(){var n=this.__chain__,e=r.apply(this.__wrapped__,arguments);return n?new y(e,n):e}}),wo(["push","reverse","sort","unshift"],function(n){var r=It[n];v.prototype[n]=function(){return r.apply(this.__wrapped__,arguments),this}}),wo(["concat","slice","splice"],function(n){var r=It[n];v.prototype[n]=function(){return new y(r.apply(this.__wrapped__,arguments),this.__chain__)}}),io.spliceObjects||wo(["pop","shift","splice"],function(n){var r=It[n],e="splice"==n;v.prototype[n]=function(){var n=this.__chain__,t=this.__wrapped__,o=r.apply(t,arguments);return 0===t.length&&delete t[0],n||e?new y(o,n):o}}),v}var h,v=[],y=[],b=0,d={},m=+new Date+"",_=75,w=40,x=" 	\f ﻿\n\r\u2028\u2029 ᠎             　",j=/\b__p \+= '';/g,C=/\b(__p \+=) '' \+/g,P=/(__e\(.*?\)|\b__t\)) \+\n'';/g,E=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,O=/\w*$/,S=/^\s*function[ \n\r\t]+\w/,A=/<%=([\s\S]+?)%>/g,I=RegExp("^["+x+"]*0+(?=.$)"),L=/($^)/,N=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,T=["Array","Boolean","Date","Error","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setTimeout"],D=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],$=0,F="[object Arguments]",B="[object Array]",H="[object Boolean]",W="[object Date]",q="[object Error]",z="[object Function]",K="[object Number]",U="[object Object]",M="[object RegExp]",V="[object String]",G={};
G[z]=!1,G[F]=G[B]=G[H]=G[W]=G[K]=G[U]=G[M]=G[V]=!0;var J={leading:!1,maxWait:0,trailing:!1},Q={configurable:!1,enumerable:!1,value:null,writable:!1},X={args:"",array:null,bottom:"",firstArg:"",init:"",keys:null,loop:"",shadowedProps:null,support:null,top:"",useHas:!1},Y={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},Z={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"},nr=Y[typeof window]&&window||this,rr=Y[typeof exports]&&exports&&!exports.nodeType&&exports,er=Y[typeof module]&&module&&!module.nodeType&&module,tr=er&&er.exports===rr&&rr,or=Y[typeof global]&&global;!or||or.global!==or&&or.window!==or||(nr=or);var ur=g();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(nr._=ur,define(function(){return ur})):rr&&er?tr?(er.exports=ur)._=ur:rr._=ur:nr._=ur}).call(this);
angular.module("youtube-embed",["ng"]).service("youtubeEmbedUtils",["$window","$rootScope",function(e,t){function r(e,t){return e.indexOf(t)>-1}var a={},n=/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi,i=/t=(\d+)[ms]?(\d+)?s?/;return a.getIdFromURL=function(e){var t=e.replace(n,"$1");if(r(t,";")){var a=t.split(";");if(r(a[1],"%")){var i=decodeURIComponent(t.split(";")[1]);t=("http://youtube.com"+i).replace(n,"$1")}else t=a[0]}else r(t,"#")&&(t=t.split("#")[0]);return console.log("youTubeId 2",t),t},a.getTimeFromURL=function(e){e=e||"";var t=e.match(i);if(!t)return 0;var a=t[0],n=t[1],o=t[2];return"undefined"!=typeof o?(o=parseInt(o,10),n=parseInt(n,10)):r(a,"m")?(n=parseInt(n,10),o=0):(o=parseInt(n,10),n=0),o+60*n},function(){var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),a.ready=!1,e.onYouTubeIframeAPIReady=function(){t.$apply(function(){a.ready=!0})},a}]).directive("youtubeVideo",["youtubeEmbedUtils",function(e){var t=1,r={"-1":"unstarted",0:"ended",1:"playing",2:"paused",3:"buffering",5:"queued"},a="youtube.player.";return{restrict:"EA",scope:{videoId:"=?",videoUrl:"=?",player:"=?",playerVars:"=?",playerHeight:"=?",playerWidth:"=?"},link:function(n,i,o){function u(){var e=Array.prototype.slice.call(arguments);n.$apply(function(){n.$emit.apply(n,e)})}function l(e){var t=r[e.data];"undefined"!=typeof t&&u(a+t,n.player,e),n.$apply(function(){n.player.currentState=t})}function d(e){u(a+"ready",n.player,e)}function y(){var e=angular.copy(n.playerVars);e.start=e.start||n.urlStartTime;var t=new YT.Player(c,{height:n.playerHeight,width:n.playerWidth,videoId:n.videoId,playerVars:e,events:{onReady:d,onStateChange:l}});return console.log("createPlayer",t),t.id=c,t}function p(){(n.videoId||n.playerVars.list)&&(n.player&&n.player.d&&"function"==typeof n.player.destroy&&n.player.destroy(),n.player=y())}n.utils=e,console.log("youtube id",n,i,o);var c=o.playerId||i[0].id||"unique-youtube-embed-id-"+t++;i[0].id=c,n.playerHeight=n.playerHeight||390,n.playerWidth=n.playerWidth||640,n.playerVars=n.playerVars||{};var s=n.$watch(function(){return n.utils.ready&&("undefined"!=typeof n.videoUrl||"undefined"!=typeof n.videoId||"undefined"!=typeof n.playerVars.list)},function(e){e&&(s(),"undefined"!=typeof n.videoUrl?n.$watch("videoUrl",function(e){n.videoId=n.utils.getIdFromURL(e),n.urlStartTime=n.utils.getTimeFromURL(e),p()}):"undefined"!=typeof n.videoId?n.$watch("videoId",function(){n.urlStartTime=null,p()}):n.$watch("playerVars.list",function(){n.urlStartTime=null,p()}))});n.$watchCollection(["playerHeight","playerWidth"],function(){n.player&&n.player.setSize(n.playerWidth,n.playerHeight)}),n.$on("$destroy",function(){n.player&&n.player.destroy()})}}}]);
angular.module("angularPayments",[]),angular.module("angularPayments").factory("Common",[function(){var e={};return e.parseExpiry=function(e){var t,r,n,a;return e=e||"",e=e.replace(/\s/g,""),a=e.split("/",2),t=a[0],n=a[1],2===(null!=n?n.length:void 0)&&/^\d+$/.test(n)&&(r=(new Date).getFullYear(),r=r.toString().slice(0,2),n=r+n),t=parseInt(t,10),n=parseInt(n,10),{month:t,year:n}},e}]),angular.module("angularPayments").factory("Cards",[function(){var e=/(\d{1,4})/g,t=/(?:^|\s)(\d{4})$/,r=[{type:"maestro",pattern:/^(5018|5020|5038|6304|6759|676[1-3])/,format:e,inputFormat:t,length:[12,13,14,15,16,17,18,19],cvcLength:[3],luhn:!0},{type:"dinersclub",pattern:/^(36|38|30[0-5])/,format:e,inputFormat:t,length:[14],cvcLength:[3],luhn:!0},{type:"laser",pattern:/^(6706|6771|6709)/,format:e,inputFormat:t,length:[16,17,18,19],cvcLength:[3],luhn:!0},{type:"jcb",pattern:/^35/,format:e,inputFormat:t,length:[16],cvcLength:[3],luhn:!0},{type:"unionpay",pattern:/^62/,format:e,inputFormat:t,length:[16,17,18,19],cvcLength:[3],luhn:!1},{type:"discover",pattern:/^(6011|65|64[4-9]|622)/,format:e,inputFormat:t,length:[16],cvcLength:[3],luhn:!0},{type:"mastercard",pattern:/^5[1-5]/,format:e,inputFormat:t,length:[16],cvcLength:[3],luhn:!0},{type:"amex",pattern:/^3[47]/,format:/(\d{1,4})(\d{1,6})?(\d{1,5})?/,inputFormat:/^(\d{4}|\d{4}\s\d{6})$/,length:[15],cvcLength:[3,4],luhn:!0},{type:"visa",pattern:/^4/,format:e,inputFormat:t,length:[13,14,15,16],cvcLength:[3],luhn:!0}],n=function(e){var t,n,a;for(e=(e+"").replace(/\D/g,""),n=0,a=r.length;a>n;n++)if(t=r[n],t.pattern.test(e))return t},a=function(e){var t,n,a;for(n=0,a=r.length;a>n;n++)if(t=r[n],t.type===e)return t};return{fromNumber:function(e){return n(e)},fromType:function(e){return a(e)},defaultFormat:function(){return e},defaultInputFormat:function(){return t}}}]),angular.module("angularPayments").factory("_Format",["Cards","Common","$filter",function(e,t,r){var n={},a=function(e){var t;return null!=e.prop("selectionStart")&&e.prop("selectionStart")!==e.prop("selectionEnd")?!0:("undefined"!=typeof document&&null!==document&&null!=(t=document.selection)&&"function"==typeof t.createRange?t.createRange().text:void 0)?!0:!1},o=function(t){var r,n,a,o,l,i,u;if(a=String.fromCharCode(t.which),r=angular.element(t.currentTarget),u=r.val(),n=e.fromNumber(u+a),o=(u.replace(/\D/g,"")+a).length,i=16,n&&(i=n.length[n.length.length-1]),!(o>=i)){if(!/^\d+$/.test(a)&&!t.meta&&t.keyCode>=46)return void t.preventDefault();if(null==r.prop("selectionStart")||r.prop("selectionStart")===u.length)return l=e.defaultInputFormat(),n&&(l=n.inputFormat),l.test(u)?(t.preventDefault(),r.val(u+" "+a)):l.test(u+a)?(t.preventDefault(),r.val(u+a+" ")):void 0}},l=function(t){var r,n,o,l;r=angular.element(t.currentTarget),o=String.fromCharCode(t.which),/^\d+$/.test(o)&&(a(r)||(l=(r.val()+o).replace(/\D/g,""),n=e.fromNumber(l),n?l.length<=n.length[n.length.length-1]||t.preventDefault():l.length<=16||t.preventDefault()))},i=function(e){var t,r;return t=angular.element(e.currentTarget),r=t.val(),e.meta||8!==e.which||null!=t.prop("selectionStart")&&t.prop("selectionStart")!==r.length?void 0:/\d\s$/.test(r)&&!e.meta&&e.keyCode>=46?(e.preventDefault(),t.val(r.replace(/\d\s$/,""))):/\s\d?$/.test(r)?(e.preventDefault(),t.val(r.replace(/\s\d?$/,""))):void 0},u=function(t){var r,n,a,o;return(r=e.fromNumber(t))?(a=r.length[r.length.length-1],t=t.replace(/\D/g,""),t=t.slice(0,+a+1||9e9),r.format.global?null!=(o=t.match(r.format))?o.join(" "):void 0:(n=r.format.exec(t),null!=n&&n.shift(),null!=n?n.join(" "):void 0)):t},p=function(e){return setTimeout(function(){var t,r;return t=angular.element(e.target),r=t.val(),r=u(r),t.val(r)})},s=function(e){return null!=e?e.replace(/\s/g,""):e};n.card=function(e,t){e.bind("keypress",l),e.bind("keypress",o),e.bind("keydown",i),e.bind("paste",p),t.$parsers.push(s),t.$formatters.push(u)},_formatCVC=function(e){return $target=angular.element(e.currentTarget),digit=String.fromCharCode(e.which),!/^\d+$/.test(digit)&&!e.meta&&e.keyCode>=46?void e.preventDefault():(val=$target.val()+digit,val.length<=4?void 0:void e.preventDefault())},n.cvc=function(e){e.bind("keypress",_formatCVC)},_restrictExpiry=function(e){var t,r,n;return t=angular.element(e.currentTarget),r=String.fromCharCode(e.which),!/^\d+$/.test(r)&&!e.meta&&e.keyCode>=46?void e.preventDefault():a(t)?void 0:(n=t.val()+r,n=n.replace(/\D/g,""),n.length>6?void e.preventDefault():void 0)},_formatExpiry=function(e){var t,r,n;return r=String.fromCharCode(e.which),!/^\d+$/.test(r)&&!e.meta&&e.keyCode>=46?void e.preventDefault():(t=angular.element(e.currentTarget),n=t.val()+r,/^\d$/.test(n)&&"0"!==n&&"1"!==n?(e.preventDefault(),t.val("0"+n+" / ")):/^\d\d$/.test(n)?(e.preventDefault(),t.val(""+n+" / ")):void 0)},_formatForwardExpiry=function(e){var t,r,n;return r=String.fromCharCode(e.which),!/^\d+$/.test(r)&&!e.meta&&e.keyCode>=46?void 0:(t=angular.element(e.currentTarget),n=t.val(),/^\d\d$/.test(n)?t.val(""+n+" / "):void 0)},_formatForwardSlash=function(e){var t,r,n;return r=String.fromCharCode(e.which),"/"===r?(t=angular.element(e.currentTarget),n=t.val(),/^\d$/.test(n)&&"0"!==n?t.val("0"+n+" / "):void 0):void 0},_formatBackExpiry=function(e){var t,r;if(!e.meta&&(t=angular.element(e.currentTarget),r=t.val(),8===e.which&&(null==t.prop("selectionStart")||t.prop("selectionStart")===r.length)))return/\d(\s|\/)+$/.test(r)?(e.preventDefault(),t.val(r.replace(/\d(\s|\/)*$/,""))):/\s\/\s?\d?$/.test(r)?(e.preventDefault(),t.val(r.replace(/\s\/\s?\d?$/,""))):void 0};var d=function(e){if(null!=e){var n=t.parseExpiry(e),a=new Date(n.year,n.month-1);return r("date")(a,"MM/yyyy")}return null},c=function(e){if(null!=e){var n=t.parseExpiry(e),a=new Date(n.year,n.month-1);return r("date")(a,"MM / yyyy")}return null};return n.expiry=function(e,t){e.bind("keypress",_restrictExpiry),e.bind("keypress",_formatExpiry),e.bind("keypress",_formatForwardSlash),e.bind("keypress",_formatForwardExpiry),e.bind("keydown",_formatBackExpiry),t.$parsers.push(d),t.$formatters.push(c)},function(e,t,r){if(!n[e])throw types=Object.keys(n),errstr='Unknown type for formatting: "'+e+'". ',errstr+='Should be one of: "'+types.join('", "')+'"',errstr;return n[e](t,r)}}]).directive("paymentsFormat",["$window","_Format",function(e,t){return{restrict:"A",require:"ngModel",link:function(e,r,n,a){t(n.paymentsFormat,r,a)}}}]),angular.module("angularPayments").factory("_Validate",["Cards","Common","$parse",function(e,t,r){var n=[].indexOf||function(e){for(var t=0,r=this.length;r>t;t++)if(t in this&&this[t]===e)return t;return-1},a=function(e){var t,r,n,a,o,l;for(n=!0,a=0,r=(e+"").split("").reverse(),o=0,l=r.length;l>o;o++)t=r[o],t=parseInt(t,10),(n=!n)&&(t*=2),t>9&&(t-=9),a+=t;return a%10===0},o={};return o.cvc=function(t,a,o,l){var i,u;if(null==t||0==t.length)return!0;if(!/^\d+$/.test(t))return!1;var p;if(l.paymentsTypeModel){var s=r(l.paymentsTypeModel);p=s(o)}return p?(i=t.length,n.call(null!=(u=e.fromType(p))?u.cvcLength:void 0,i)>=0):t.length>=3&&t.length<=4},o.card=function(t,o,l,i){var u,p,s;i.paymentsTypeModel&&(s=r(i.paymentsTypeModel));var d=function(){s&&s.assign(l,null),o.$card=null};return null==t||0==t.length?(d(),!0):(t=(t+"").replace(/\s+|-/g,""),/^\d+$/.test(t)&&(u=e.fromNumber(t))?(o.$card=angular.copy(u),s&&s.assign(l,u.type),ret=(p=t.length,n.call(u.length,p)>=0&&(u.luhn===!1||a(t))),ret):(d(),!1))},o.expiry=function(e){if(null==e||0==e.length)return!0;obj=t.parseExpiry(e),month=obj.month,year=obj.year;var r,n,a;return month&&year&&/^\d+$/.test(month)&&/^\d+$/.test(year)&&parseInt(month,10)<=12?(2===year.length&&(a=(new Date).getFullYear(),a=a.toString().slice(0,2),year=a+year),n=new Date(year,month),r=new Date,n.setMonth(n.getMonth()-1),n.setMonth(n.getMonth()+1,1),n>r):!1},function(e,t,r,n,a){if(!o[e])throw types=Object.keys(o),errstr='Unknown type for validation: "'+e+'". ',errstr+='Should be one of: "'+types.join('", "')+'"',errstr;return o[e](t,r,n,a)}}]).factory("_ValidateWatch",["_Validate",function(e){var t={};return t.cvc=function(t,r,n,a){a.paymentsTypeModel&&n.$watch(a.paymentsTypeModel,function(o,l){if(o!=l){var i=e(t,r.$modelValue,r,n,a);r.$setValidity(t,i)}})},function(e,r,n,a){return t[e]?t[e](e,r,n,a):void 0}}]).directive("paymentsValidate",["$window","_Validate","_ValidateWatch",function(e,t,r){return{restrict:"A",require:"ngModel",link:function(e,n,a,o){var l=a.paymentsValidate;r(l,o,e,a);var i=function(r){var n=t(l,r,o,e,a);return o.$setValidity(l,n),n?r:void 0};o.$formatters.push(i),o.$parsers.push(i)}}}]),angular.module("angularPayments").directive("stripeForm",["$window","$parse","Common",function(e,t,r){return _getDataToSend=function(e){var t=["number","expMonth","expYear","cvc","name","addressLine1","addressLine2","addressCity","addressState","addressZip","addressCountry"],r=function(e){return e.replace(/([A-Z])/g,function(e){return"_"+e.toLowerCase()})},n={};for(i in t)e.hasOwnProperty(t[i])&&(n[r(t[i])]=angular.copy(e[t[i]]));return n.number=(n.number||"").replace(/ /g,""),n},{restrict:"A",link:function(t,n,a){if(!e.Stripe)throw"stripeForm requires that you have stripe.js installed. Include https://js.stripe.com/v2/ into your html.";var o=angular.element(n);o.bind("submit",function(){expMonthUsed=t.expMonth?!0:!1,expYearUsed=t.expYear?!0:!1,expMonthUsed&&expYearUsed||(exp=r.parseExpiry(t.expiry),t.expMonth=exp.month,t.expYear=exp.year);var n=o.find("button");n.prop("disabled",!0),o.hasClass("ng-valid")?e.Stripe.createToken(_getDataToSend(t),function(){var e=arguments;t.$apply(function(){t[a.stripeForm].apply(t,e)}),n.prop("disabled",!1)}):(t.$apply(function(){t[a.stripeForm].apply(t,[400,{error:"Invalid form submitted."}])}),n.prop("disabled",!1)),t.expMonth=null,t.expYear=null})}}}]);
// app.js
(function() {
    'use strict';

    var field_guide_app = angular.module('field_guide_app',['ui','ui.router', 'ngSanitize', 'youtube-embed', 'field_guide_controls','field_guide_filters']);

    // FRONT-END ROUTE CONFIGURATION ==============================================
    field_guide_app.config(function($stateProvider,$urlRouterProvider,$httpProvider,$locationProvider) {

        $locationProvider.html5Mode(true);

        $httpProvider.defaults.timeout = 3000;
        
        $urlRouterProvider.otherwise("/login");

    // APP ROUTING ====================================================================
        $stateProvider
        // PUBLIC ROUTES ======================================================

            // BLOCK SCREENS ============================================
            .state('404', {
                url: '/404',                
                templateUrl: 'partials/app/404.html',
            })
            .state('upgrade', {
                url: '/upgrade',                
                templateUrl: 'partials/app/upgrade.html',
            })

            // LOGIN AND REGISTRATION PAGES =============================
            
            .state('login', {
                url: '/login{acct:(?:/[^/]+)?}',
                controller:'login',
                templateUrl: 'partials/auth/login.html'
            })
           
            .state('register', {
                url: '/register',
                templateUrl: 'partials/auth/register.html'
            })

            .state('reset', {
                url: '/reset',
                controller : 'reset',
                templateUrl: 'partials/auth/reset.html'
            })

            .state('forgot', {
                url: '/forgot{token:(?:/[^/]+)?}',
                controller : 'forgot',
                templateUrl: 'partials/auth/forgot.html'
            })

            // PUBLIC REPORTS ===========================================
            .state('report_public', {
                url: '/p/report/:_id',
                controller:'reportPublic',
                templateUrl: 'partials/app/report_public.html',
                resolve: { 
                    loadData: ['$http','$stateParams', function($http, $stateParams) {
                        return $http.get('/api/public/report/'+$stateParams._id)
                                    .success(function(data) {
                                        return data;
                                    });
                    }]
                }
            })

        // PRIVATE ROUTES ===============================================
            // SUMMARIZE VIEW =============================
            .state('summary', {
                url: '/summary/:_id',
                controller:'summary',
                templateUrl: 'partials/app/summary.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                            return checkLoggedin();
                        }],
                    loadData: ['$http','$stateParams', function($http, $stateParams) {
                        return $http.get('/api/summary/'+$stateParams._id)
                                    .success(function(data) {
                                        return data;
                                    });
                    }]
                }
            })
            .state('summary.test', {
                templateUrl: 'partials/app/summary_test.html'
            })
            .state('summary.task', {
                templateUrl: 'partials/app/summary_task.html'
            })

            // REPORT PREVIEW =============================
            .state('report', {
                url: '/report/:_id',
                controller:'summary',
                templateUrl: 'partials/app/report_private.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                            return checkLoggedin();
                        }],
                    loadData: ['$http','$stateParams', function($http, $stateParams) {
                        return $http.get('/api/summary/'+$stateParams._id)
                                    .success(function(data) {
                                        return data;
                                    });
                    }]
                }
            })

            // ACCOUNT MANAGEMENT =============================
            .state('account', {
                url: '/account',
                controller: 'account',
                templateUrl : 'partials/app/account.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                            return checkLoggedin();
                        }]
                }
            })

            // OVERVIEW AND test CREATION =====================
            .state('default', {
                url: '/',
                controller: 'overview',
                templateUrl: 'partials/app/overview.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                            return checkLoggedin();
                        }]
                }
            })
            .state('overview', {
                url: '/overview',
                controller: 'overview',
                templateUrl: 'partials/app/overview.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                            return checkLoggedin();
                        }]
                }
            })
            .state('test', {
                url: '/edit/test/:test_id',
                controller:'test',
                templateUrl: 'partials/app/test.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                            return checkLoggedin();
                        }]
                }
            })

            // RUN TEST =======================================
            .state('run', {
                url: '/run/:_id',
                controller:'run',
                templateUrl: 'partials/app/run.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                        return checkLoggedin();
                    }],
                    loadData : ['$http','$stateParams', function($http, $stateParams) {
                        return $http.get('/api/run/'+$stateParams._id).success(function(data){
                                    return data;
                                });
                    }]
                }
            });
    });

    // FILTERS ============================================================================
    angular.module('field_guide_filters', ['ngSanitize', 'ui','ui.router']);

    // CONTROLLERS, DIRECTIVES ============================================================
    angular.module('field_guide_controls', ['ngSanitize', 'ui','ui.router', 'youtube-embed']);

})();
// account.js
(function() {
	'use strict';

	// ACCOUNT CONTROLLER ===========================================================
	angular.module('field_guide_controls')
		.controller('account', ['$scope','$http', '$stateParams','$state', '$location', '$window', '$rootScope', 
					function($scope, $http, $stateParams,$state, $location, $window, $rootScope){
		var user_id = $rootScope.user._id;

		$scope.live_user = $rootScope.user;
		$scope.account = $rootScope.user.account;
		$scope.connector = {};
		
		// console.log('account user', $rootScope.user);
		// https://trello.com/1/members/my/boards?key=substitutewithyourapplicationkey&token=substitutethispartwiththeauthorizationtokenthatyougotfromtheuser
		// https://trello.com/docs/api/card/index.html#post-1-cards
		
		$http
			.get('/api/account/'+ user_id)
			.success(function(data){
				// // console.log(data);
				$scope.live_user = data;
			});

		
	// ONBOARDING =========================================
    // TODO: Abstract into service for dependency injection

        $scope.changeOnboard = function(num){
            $rootScope.user.onboard = num;

            var url = '/api/user/'+$rootScope.user._id;
            var dataOut = {onboard : $rootScope.user.onboard};

            $http
                .put(url, dataOut)
                .success(function(data){
                    console.log($rootScope.user);
                    $location.path('/overview');
                });
        };

  //   // STRIPE CHECKOUT ====================================

		// $scope.stripeCheckout = function(){
		// 	var handler = StripeCheckout.configure({
		// 	key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
		// 	// image: '/square-image.png',
		// 	token: function(token) {
		// 	// Use the token to create the charge with a server-side script.
		// 	// You can access the token ID with `token.id`
		// 	}
		// 	});

		// 	handler.open({
		// 		name: 'Demo Site',
		// 		description: '2 widgets ($20.00)',
		// 		amount: 2000
		// 	});
		// };
    


	// HOOK UP TRELLO =====================================
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
			$scope.$apply();
		};

		$scope.connectTrello = function(){
			$scope.connector.message = "Connecting your Trello account...";
			$scope.connector.toggle = 3;

			$window.open('/connect/trello', 'Connect Field Guide to Trello', 'width=450, height=600');
			$scope.$watch('inviteCallback', function(){
				// $scope.connector = false;
				// $scope.live_user.trello = true;
			});
		};

		$scope.disconnectTrello = function() {
			// // // console.log('touched disconnect');

			$http.delete('/connect/trello')
				.success(function(err, data){
					// // // console.log('Trello disconnected');
					$scope.live_user.trello=false;

					$scope.connector.message = "Connect your Trello account.";
					$scope.connector.toggle = 2;
				});

		};

// TEAM MEMBER INVITATIONS ================================
		// $scope.removeTeamMember = function(person){
		// 	var index = $scope.live_user.team.indexOf(person);

		// 	$http
		// 		.delete('/api/account/'+person._id)
		// 		.success(function(err, data){
		// 			$scope.live_user.team.splice(index, 1);
		// 		});
		// };

		// $scope.team_mail = function(){
		// }

		// $scope.team_mail = {};

		$scope.inviteTeamMember = function(email){
			var url = '/api/invite/',
				dataOut = email,
				new_url = $location.protocol()+'://'+$location.host()+':8080';

			mixpanel.track('Team member invite', { 'email': email });

			$http
				.post(url, dataOut)
				.success(function(invite){
					if(invite.user_email){
						// user_email exists only on the Invite model.
						// if an invitation then exists, do the following.

						$scope.live_user.invites.push(invite);

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
			
			var url = '/api/invite/'+invite._id,
				dataOut = invite,
				new_url = $location.protocol()+'://'+$location.host()+':8080';

			$http
				.post(url, dataOut)
				.success(function(data){
					
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
					$scope.live_user.invites.splice(index, 1);
				});
		};

		$scope.accountExport = function(){
			// TODO: Output this data as a compressed JSON return.
			$http
				.get('/auth/export/account/')
				.success(function(data){
					// console.log('success', data);
				});
		};
	}]);
})();
// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('forgot', ['$scope','$http', '$location', '$stateParams','$rootScope', 
        function($scope, $http, $location, $stateParams, $rootScope){
            var url = '/reset'+$stateParams.token;

        // Controller Functions ===========================
            $scope.newPass = function(pass){
                var dataOut = {password: pass};

                $http
                    .post(url, dataOut)
                    .success(function(data){
                        // do a login here, perhaps
                        // console.log('reset', data);
                        if(data.length > 0){
                            $scope.successMsg = data;
                        }
                    });
            };

            $scope.goToLogin = function(){
                $location.path('/login');
            };
    }]);
})();
// login.js
(function() {
    'use strict';

    // LOGIN CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('login', [ '$scope','$http', '$location', '$stateParams','$rootScope',
        function( $scope, $http, $location, $stateParams, $rootScope){
            // TODO: Reinsert ngCheckStrength

        // LOGIN FUNCTIONS ====================================
        if($rootScope.user){
            $scope.user = $rootScope.user;
        }

        if($stateParams.acct){
            $scope.acct = $stateParams.acct.replace( /\//gi,"");
            $scope.reg_toggle = true;
            mixpanel.track('registration page touch', { 'account': $stateParams.acct });
            
            
            // TODO: get the invitation represented by that id and pre-populate the e-mail field.
            $http
                .get('/auth/invite'+$stateParams.acct)
                .success(function(data){
                    // console.log(data);
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
                    $scope.flashmessage = data.error;
                    $location.path('/');
                });
        };

        $scope.showLogin = function(){
            $scope.reg_toggle = false;
        };

        $scope.showReg = function(){
            $scope.reg_toggle = true;
        };

        $scope.goToReset = function(){
            $location.path('/reset');
        };

        $scope.register = function(user){
            var url, 
                dataOut,
                invite;
            
            if($stateParams.acct){
                invite = $stateParams.acct.replace( /\//gi,"");
                url = '/auth/signup/';
                dataOut = {email: user.email, name:user.name, password: user.password, invite: invite};
            } else if (!$stateParams.acct) {
                url = '/auth/signup/';
                dataOut = {email: user.email, name:user.name, password:  user.password};
            }
            
            $http
                .post(url, dataOut)
                .success(function(data){

                    $scope.flashmessage = data.error;
                    $rootScope.user = data._id;
                    $location.path(data.redirect);

                    mixpanel.track('registered new user', { 'name': data.email });

                });
        };

        $scope.logout = function(){
            var url = '/auth/logout';

            $http
                .post(url)
                .success(function(data){
                    $location.path(data.redirect);
                    $rootScope.user = '';
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
                
                if($rootScope.user.onboard === 2){ 
                    
                }

                if($rootScope.user.onboard === 3 || $rootScope.user.onboard === 4 || $rootScope.user.onboard === 5 ){
                    $location.path('/run/'+$scope.tests[1]._id);
                }

                if($rootScope.user.onboard === 6 && $scope.tests.length > 0){
                    $location.path('/summary/'+$scope.tests[1]._id);
                }

                if($rootScope.user.onboard === 7 && $scope.tests.length > 0){
                    $location.path('/report/'+$scope.tests[1]._id);
                }
            });

        // ONBOARDING =========================================
        // TODO: Abstract into service for dependency injection

        // TODO: check the onboard number
        // if the onboard number requires a route change, change the route.
        // check for the name of the appropriate test, as it may no longer exist in the DB
        // or possibly should have permit locks on it.
        // Tests do not have actual permit locks on them now, do they.
        // else just continue as normal.
        // console.log('onboard', $rootScope.user.onboard);

        $scope.changeOnboard = function(num){
            $rootScope.user.onboard = num;

            var url = '/api/user/'+$rootScope.user._id;
            var dataOut = { onboard : $rootScope.user.onboard };

            $http
                .put(url, dataOut)
                .success(function(data){
                    console.log($rootScope.user);
                    if($rootScope.user.onboard === 3){
                        $location.path('/run/'+$scope.tests[1]._id);
                    }
                });
        };

        // TEST ROUTES ========================================
        $scope.devTest = function(){
            $http.post('/api/test/dev_tests/')
                .success(function(data){
                    $scope.tests.push(data);
                });
        };

        $scope.newTest = function(){
                var test = {};
                
                if($rootScope.user){
                    test.created_by_user = $rootScope.user;
                    mixpanel.track('Add new test', { 'user' : $rootScope.user });
                } else {
                    console.log('whoops, needs a checkin');
                }

                var url = '/api/test/';
                var data_out = test;
                
                $http
                    .post(url, data_out)
                    .success(function(data){
                        $location.path('/edit/test/'+ data._id);
                        $scope.tests.push(data);
                    });
            };

        $scope.removeTest = function(test){ 
            // delete a test from the database
                var url = '/api/test/'+test._id,
                index = $scope.tests.indexOf(test);
            
                $scope.tests.splice(index, 1);
                $http.delete(url);
        };

        $scope.dupeTest = function(test){
            var url = '/api/test/'+test._id;
            var data_out = test;
            
            $http
                .post(url, data_out)
                .success(function(data){
                    $scope.tests.push(data);
                });
        };

        $scope.editTest = function(test){
            $location.path('/edit/test/'+ test._id);
        };

        $scope.watchTest = function(test){
            $location.path('/watch/'+test._id);
        };
         
        $scope.runTest = function(test){
            $location.path('/run/'+test._id);
            mixpanel.track('Run test', { 'user': $rootScope.user });
        };

        $scope.summarizeTest = function(test_id){
            $location.path('/summary/'+ test_id);
            mixpanel.track('Summary clicked', {});
        };

        $scope.loadReport = function(test_id){
            $location.path('/report/'+ test_id);
        };

    }]);
})();
// register.js
(function() {
    'use strict';

    // REGISTRATION CONTROLLER ===========================================================
    angular.module('field_guide_controls')
           .controller('register', ['$scope','$http', '$location', '$stateParams','$rootScope', function($scope, $http, $location, $stateParams, $rootScope){
        
        $scope.user = $rootScope.user;
        
        if($stateParams.acct){
            $scope.acct = $stateParams.acct.replace( /\//gi,"");
        }

    }]);
})();
// report.js
(function() {
    'use strict';

    // REPORT CONTROLLER ===========================================================
    angular.module('field_guide_controls').controller('reportPublic', 
                [ 'loadData', 'reportFunctions', '$scope', '$sce', '$http', '$location', '$stateParams','$state','$sanitize', 
        function( loadData, reportFunctions, $scope, $sce, $http, $location,$stateParams,$state, $sanitize){
    // https://trello.com/docs/api/card/index.html#post-1-cards << HOW 2 POST CARDS TO TRELLO

    // == mixpanel ==================================

        mixpanel.track('Report Loaded', {});
        
    // ==============================================

    // SHARE LINK =========================================
        $scope.reportLink = $location.protocol()+'://'+$location.host()+':8080/p/report/'+$stateParams.test_id;

        $scope.showReportLink = false;

        $scope.toggleReportLink =  function(){
            $scope.showReportLink = $scope.showReportLink ? false : true;
        };

    // ON LEFT NAV CLICK, SELECT THINGS ===================
        $scope.activate = function(obj, selectedIndex) {
            // passes an object from left nav to the global selection variable
            // reset all previous reliant variables, there are a lot!
            $scope.selected = '';
            $scope.commentMessage = '';
            $scope.selectedIndex = '';
            $scope.inputNote = '';
            $scope.showCommentToggle = 'hide';
            $scope.messageEditToggle = '';

            $scope.selectedIndex = selectedIndex;
            $scope.selected = obj || $scope.selected;
            

        // Set up what kind of video we're expecting to need here.
            if(obj.embed){
                var loadVideo = reportFunctions.videoRender(obj.embed);
                if(loadVideo.youtube){
                    $scope.selected.youTubeCode = loadVideo.youtube;
                } else {
                    $scope.selected.userTesting = loadVideo.embed;
                }
            }  
        };

    // SET VIEW VARIABLES FROM LOAD DATA ==================
        // var data = loadData.data; // lol who even fucking knows why this can't return directly.
        // console.log(data);
        // $scope.navlist = _.sortBy(data.navlist.list, function(obj){
        //             return obj.report_index;
        //         });
        
        // $scope.messages = _.groupBy(data.messages, function(z){
        //             return z._subject.name ? z._subject.name : 'report comment';
        //         });

        // $scope.testname = data.navlist.test;

        // $scope.activate(data.navlist.list[0], 0);

    // NAVIGATION =============================================

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
            if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'show'){
                $scope.showCommentToggle = 'hide';
                $scope.commentMessage = '';
                return;
            } else if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'hide'){
                $scope.showCommentToggle = 'show';
                return;
            } else if ($scope.commentMessage._id !== message._id && $scope.showCommentToggle === 'hide'){
                $scope.showCommentToggle = 'show'; 
                $scope.commentMessage = message;
                return;
            }
            
            $scope.commentMessage = message;

        };

        // $scope.addComment = function(comment){
        //     if(comment && comment.body.length > 0){
        //         var dataOut = {
        //             comment: {body : comment.body}
        //         };
                
        //         $http
        //             .post('/api/comment/'+$scope.commentMessage._id, dataOut)
        //             .success(function(data){
        //                 comment.body = '';
        //                 var arr = _.pluck($scope.messages, '_id');
        //                 var msg_idx = _.indexOf(arr, $scope.commentMessage._id);
        //                 $scope.messages[msg_idx]._comments.push(data.comment);

        //             });
        //     } else {
        //         $scope.showCommentToggle = 'hide';   
        //     }
        // };
    }]);
})();
// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('reset', ['$scope','$http', '$location', '$stateParams','$rootScope', 
                    function($scope, $http, $location, $stateParams, $rootScope){

        $scope.sendToken = function(email){
            var url = '/auth/forgot';
            var dataOut = {email: email};

            $http
                .post(url, dataOut)
                .success(function(data){
                    $scope.successMsg = data;
                });
        };
        
        $scope.goToLogin = function(){
            $location.path('/login');
        };
        
    }]);
})();
// run.js
(function() {
    'use strict';
    // RUN CONTROLLER ===========================================================

    angular.module('field_guide_controls').controller('run', 
    [ 'loadData', 'testBuildFunctions', 'postMessage', '$scope','$http', '$location','$stateParams','$state', '$rootScope', 'socket', 
    function(loadData, testBuildFunctions, postMessage, $scope,  $http ,  $location , $stateParams , $state , $rootScope, socket){
    // get the starting data from resolve
        var data = loadData.data;
        
    // set up and reset variables to clear cache from state changes.
        $scope.update = [];
        $scope.task = {};
        var message = {};
        
    // holds all messages currently in test
        $scope.timeline = [{ 
                title: 'Starting test', 
                body: data.name 
            }]; 

    // make sure the scroll works
        $scope.glued = true;

        $scope.test = data;
        $scope.kind = data.kind;
        $scope.navlist = data._tasks;
                
    // ONBOARDING =========================================
        // TODO: Abstract into service for dependency injection

        $scope.changeOnboard = function(num){
            if($rootScope.user.onboard !== 100){
                $rootScope.user.onboard = num;
    
                var url = '/api/user/'+$rootScope.user._id;
                var dataOut = {onboard : $rootScope.user.onboard};
    
                $http
                    .put(url, dataOut)
                    .success(function(data){
                        console.log($rootScope.user);
                        if($rootScope.user.onboard === 6 ){
                            $location.path('/summary/'+$scope.test._id);
                        }
                    });
            } else {
                return; 
            }
        };


    // SOCKET ROUTES - 0.9 ============================================== 
    // for 1.0 check socket_routes_1.js in /server/
        
    // RECIEVE SCREENCAPS FROM THE SOCKET ===============================
        var canvas = document.getElementById('feed'),
            image = document.getElementById('ia'),
            context = canvas.getContext('2d');

        $scope.connect = {};
        $scope.connect.text = '71b';

        socket.on('connect_failed', function(data)
        {
            // console.log('connect_failed');
        });

        socket.on('connecting', function(data)
        {
            // console.log('connecting');
        });
        socket.on('disconnect', function(data)
        {
            // console.log('disconnect');

        });

        socket.on('error', function(reason)
        {
            // console.log('error', reason);
        });
        socket.on('reconnect_failed', function(data)
        {
            // console.log('reconnect_failed');
        });
        socket.on('reconnect', function(data)
        {
            // console.log('reconnect');
            // socket.emit('channel', {room : $scope.subject.testroom, test: $stateParams._id});
        });
        socket.on('reconnecting', function(data)
        {
            // console.log('reconnecting');
        });

        socket.on('announce', function(data){
            // console.log('announce', data);
        });

        socket.on('joined_channel', function(data){ 
            // console.log('joined_channel', data);
        });

        socket.on('note', function(data){
            // console.log('note', data);
            $scope.timeline.push(data.note.msg);
            $scope.$apply();
        });

        socket.on('subject', function(data){
            socket.emit('join_subject_test', data);
        });

        socket.on('message',function(data) {
            // console.log('message');
            image.src = "data:image/jpg;base64,"+data;
            canvas.width = 358;
            canvas.height = 358 * image.height / image.width;

            context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
            // context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
        });


    // ANGULAR ROUTES ===================================================
        $scope.addTask = function(task){
            $scope.adding_task = $scope.adding_task ? false : $scope.adding_task;
            
            testBuildFunctions.addTask(task).then(function(data){
                    $scope.test._tasks.push(data);
                });
        };

        $scope.select = function(index) {
            $scope.selected = $scope.navlist[index];

            mixpanel.track('Task changed', {});

            $scope.timeline.push({ 
                title: 'Starting task', 
                body: $scope.selected.name 
            });

            // get the id of the selected object, 
            // update it with the new subject when we finish the test.
            var arr = _.pluck($scope.update, '_id');
            var id = $scope.selected._id;

            if(arr.indexOf($scope.test._id) === -1){
                $scope.update
                    .push({ 
                    '_id' : $scope.selected._id, 
                    '_subject' : $scope.subject._id,
                    'doctype' : 'task',
                });
            }
        };


        $scope.addSubject = function(subject){
            subject.name     = subject.name;
            subject.testroom = subject.testroom || '';
            subject.test     = $stateParams._id;

            $http
                .post('api/subject/', subject)
                .success(function(data){
                    $scope.subject = data;
                    $scope.live = true;
                    $scope.select(0,0);

                    socket.emit('channel', {room : subject.testroom, test: subject.test});
                    mixpanel.track('Add Participant Name', {});
                });
        };

        $scope.postMessage = function(message){
            if(message.length <= 0){
                return ;
            } else {
                postMessage(message, $scope.selected._id, $scope.selected._test, $scope.subject._id )
                    .then(function(data){
                        $scope.message='';
                    });
            }
        };

        $scope.postTest = function(){
            // Send tasks that have had a subject added to the DB.
            mixpanel.track('Test completed', {});

            $http
                .post('/api/run/', $scope.update)
                .success(function(data){
                    $location.path('/overview');
                });

        };
    }]);
})();
// summary.js
(function() {
    'use strict';

    // SUMMARY CONTROLLER ===========================================================
    angular.module('field_guide_controls')
        .controller('summary', 
            [ 'loadData', 'reportFunctions', 'postMessage', '$scope','$rootScope','$http','$location','$stateParams','$state','$sanitize', '$q',
        function(loadData, reportFunctions, postMessage, $scope,  $rootScope,  $http,  $location,  $stateParams,  $state,  $sanitize, $q){
        
        $scope.test = {};
        $scope.timeline = [];
        $scope.commentMessage = '';
        $scope.showCommentToggle = 'hide';
        $scope.reportLink = $location.protocol()+'://'+$location.host()+'/p/report/'+$stateParams._id;
        $scope.showReportLink = false;

        // synchronous shit is weird. =====================
        $scope.activate = function(obj, selectedIndex) {
            // passes an object from left nav to the global selection variable
            // reset all previous reliant variables, there are a lot!
            $scope.selected = '';
            $scope.commentMessage = '';
            $scope.selectedIndex = '';
            $scope.inputNote = '';
            $scope.showCommentToggle = 'hide';
            $scope.messageEditToggle = '';

            $scope.selectedIndex = selectedIndex;
            $scope.selected = obj || $scope.selected;
            

        // Set up what kind of video we're expecting to need here.
            if(obj.embed){
                var loadVideo = reportFunctions.videoRender(obj.embed);
                if(loadVideo.youtube){
                    $scope.selected.youTubeCode = loadVideo.youtube;
                } else {
                    $scope.selected.userTesting = loadVideo.embed;
                }
            }  
        };

    // SET VIEW VARIABLES FROM LOAD DATA ==================
        var data = loadData.data; // lol who even fucking knows why this can't return directly.
        
        $scope.navlist = _.sortBy(data.navlist.list, function(obj){
                    return obj.report_index;
                });
        
        $scope.messages = _.groupBy(data.messages, function(z){
                    return z._subject.name ? z._subject.name : 'report comment';
                });

        $scope.testname = data.navlist.test;

        $scope.activate(data.navlist.list[0], 0);

    // NAVIGATION =========================================

        $scope.reportView = function(){
            $location.path('/report/'+$stateParams._id);
        };

        $scope.summaryView = function(){
            $location.path('/summary/'+$stateParams._id);
        };

        $scope.toggleReportLink =  function(){
            $scope.showReportLink = $scope.showReportLink ? false : true;
        };

        $scope.showObjectMessages = function(msg, obj){
            if(obj._messages){
                if((obj._messages.indexOf(msg._id) >= 0)){                
                    return true;
                }
            }
        };

    // ONBOARDING =========================================
        // TODO: Abstract into service for dependency injection

        $scope.changeOnboard = function(num){
            $rootScope.user.onboard = num;

            var url = '/api/user/'+$rootScope.user._id;
            var dataOut = {onboard : $rootScope.user.onboard};

            $http
                .put(url, dataOut)
                .success(function(data){
                    console.log($rootScope.user);
                    $location.path('/report/'+$stateParams._id);
                });
        };


    // COMMENTING =========================================
        $scope.showComments = function(message){
            // if the comment toggle is the same as the current comment toggle
            // hide commenting
            // else show the new message's comments

            if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'show'){
                $scope.showCommentToggle = 'hide';
                $scope.commentMessage = '';
                return;
            }

            if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'hide'){
                $scope.showCommentToggle = 'show';
                return;
            }

            if ($scope.commentMessage._id !== message._id && $scope.showCommentToggle === 'hide'){
                $scope.showCommentToggle = 'show'; 
                $scope.commentMessage = message;
                return;
            }
            
            $scope.commentMessage = message;
        };

        
        $scope.addComment = function(comment){
            if(comment && comment.body.length > 0){
                reportFunctions.postComment(comment, $scope.commentMessage._id)
                    .then(function(data){
                        comment.body = '';
                        var arr = _.pluck($scope.messages, '_id');
                        var msg_idx = _.indexOf(arr, $scope.commentMessage._id);
                        $scope.messages[msg_idx] = data;
                    });
            }
            else {
                $scope.showCommentToggle = 'hide';
            }
        };

        // MOVE STEPS =========================================

        $scope.msgFilter = function(message){
            // Display messages that belong to the current selected item.
            return (message._id === $scope.selected._id) ? true : false;
        };

        $scope.moveTask = function(old_index, new_index){   
            $scope.navlist = reportFunctions.moveTask($scope.navlist, old_index, new_index);
            $http.put('/api/summary/'+ $stateParams._id, $scope.navlist);           
        };

        // OBJECT FUNCTIONS =====================================
        $scope.saveObject = function(obj){
            $http.put('/api/summary/object', [obj]);
        };

        $scope.passFail = function(obj){
            obj.pass_fail = obj.pass_fail ? false : true;
            $scope.saveObject(obj);
        };

        $scope.toggleVis = function(obj){
            obj.visible = obj.visible ? false : true;
            $scope.saveObject(obj);
        };


        // MESSAGE FUNCTIONS ==================================
        $scope.editMessage = function(message, index){
            // clear this on blur to block weird toggle bug
            $scope.inputNote = '';
            $scope.messageEditToggle = message._id;
        };

        $scope.toggleNote = function(user){
            // Opens up a new message from a user who previously participated in a test.
            $scope.messageEditToggle = '';
            $scope.inputNote = user;
        };

        $scope.saveEdit = function(message){
            $scope.messageEditToggle = '';
            $http.put('/api/message/', message);
        };

        $scope.saveFav = function(message){
            if($scope.selected.doctype === 'task'){
                return (message.fav_task) ? message.fav_task = false : message.fav_task = true ;
            }

            if($scope.selected.doctype === 'tag'){
                return (message.fav_tag) ? message.fav_tag = false : message.fav_tag = true ;
            }

            $http.put('/api/message/fav', message);
        };

        $scope.postMessage = function(message, subject){
            postMessage(message, $scope.selected._id, $scope.selected._test, subject._id )
                .then(function(data){
                    console.log(data);

                    $scope.newnote = '';

                    $scope.toggleNote(subject._id);
                    $scope.toggleNote();
                    
                    $scope.messages[data.msg._subject.name].push(data.msg);
                    $scope.selected._messages.push(data.msg._id);

                    var indexCheck = _.pluck($scope.leftNavList, 'name');

                    _.each(data.tags, function(tag){
                        
                        var idx = indexCheck.indexOf(tag.name);

                        if(idx === -1){
                            tag.report_index = $scope.leftNavList.length;
                            $scope.leftNavList.push(tag);
                            $scope.leftNavList[tag.report_index]._messages.push(data.msg._id);
                        } else {
                            $scope.leftNavList[idx]._messages.push(data.msg._id);
                        }
                    });
                });
        };



    // SAVE SUMMARY ==========================================
        $scope.saveSummary = function(){
            // post all the summary changes to the test
            // post fav'd statuses to relevant messages

            $scope.messages = _.map($scope.messages, function(val, key){ return val; });

            mixpanel.track('Summary complete', {});

            $http.put('/api/summary/'+ $stateParams._id, 
                { navlist  : $scope.navlist, 
                  messages : $scope.messages[0]
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
        
        $http
            .get('/api/test/'+$stateParams.test_id, {timeout : 5000, cache:false})
            .success(function(data) {
                $scope.test = data;
                $scope.tasks = data._tasks;
                $scope.showAnchor(1);
            });

    // DIRECTIVES AND FUNCTIONS ===============================

        // ONBOARDING =========================================
        // TODO: Abstract into service for dependency injection

        $scope.changeOnboard = function(num){
            $rootScope.user.onboard = num;

            var url = '/api/user/'+$rootScope.user._id;
            var dataOut = {onboard : $rootScope.user.onboard};

            $http
                .put(url, dataOut);
        };
        
        // SELECTION ======================================
        $scope.select = function(task) {
            $scope.selectedTask = task;
            // TODO: Set isActive in here. 
        };
        
        $scope.isActive = function(task) {
            return $scope.selectedTask === task;
        };

    // ACTIONS ============================================
        $scope.selectPrototype = function(kind){
            $scope.test.kind = kind;

            mixpanel.track('Type of Test', {'test type' : kind });
        };

        $scope.selectPlatform = function(kind){
            $scope.test.platform = kind;
        };

        $scope.showAnchor = function(x) {

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
            // Saves the test and changes the step to the next page
            $scope.updateTest();
            $scope.showAnchor(anchor);
        };

    // TASK FUNCTIONS =====================================
        $scope.newTask = function(task) {
            // Add a new task
            mixpanel.track('Task added', { 'user': $rootScope.user });
            
            task._test = $stateParams.test_id;
            task._session = $scope.test._session;
            task.index = $scope.tasks.length;
            
            var url = '/api/task/';
            var data_out = task;
            
            $http
                .post(url,data_out)
                .success(function(data){
                    $scope.tasks.push(data);
                    $scope.selectedTask = $scope.tasks[$scope.tasks.length-1];
                    $scope.newtask = '';
                });
        };
        
        $scope.removeTask = function(task){
            // Delete a task
            task.edit=false;
            task.title_edit=false;

            var index = $scope.tasks.indexOf(task);
            var url = '/api/task/'+task._id;
            
            $scope.tasks.splice(index, 1);

            $http.delete(url)
                .success(function(data){
                    $scope.selectedTask = $scope.tasks[$scope.tasks.length-1];
                });
        };

        $scope.moveTask = function(old_index, up_down){
            // set the stored index of the task
            // Tasks therefore appear in order
            // TODO: Abstract into a directive

            var new_index = old_index + up_down;
            $scope.tasks.splice(new_index, 0, $scope.tasks.splice(old_index, 1)[0]);

            $scope.updateTest();
        };

    // Edit Task Things =========================
        $scope.editTitle = function (task){
            task.title_edit = true;
            $scope.edited = task;
        };

        $scope.blurTitle = function (task){
            // on losing the focus, save the name of the task
            task.title_edit = false;
            $scope.editedtask = null;

            task.name = task.name.trim();

            // deleted the name of the task? Remove it entirely.
            if (!task.name) {
                $scope.removeTask(task);
            }

            $scope.updateTask(task);            
        };

        $scope.updateTask = function(task){
            var url = '/api/task/'+task._id;
            var data_out = task;

            $http
                .put(url, data_out);
        };

    // TEST UPDATE ==============================
        $scope.updateTest = function(){
            // reminder: this pushes an update to an already-created test
            var test = $scope.test;
            
            if($scope.test.name){
                mixpanel.track('Test name changed', { 'user': $rootScope.user });
            }

            if($scope.test.desc){
                test.desc = $scope.test.desc;
            }

            var url = '/api/test/'+$stateParams.test_id;
            var data_out = test;

            // index the tasks appropriately and make sure they're put away
            var task_count=0;
            _.each($scope.tasks, function(task){
                task.index = task_count;
                task_count++;
            });
            
            $http
                .put(url, data_out, {timeout:5000});
        };

    // RETURN TO MAIN SCREEN ====================
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
    
    // WATCH CONTROLLER FOR GROUP INTERVIEWS ==================================
        
    angular.module('field_guide_controls')
    .controller('watch', 
               ['$scope','$http','$location','$stateParams','$state','$sanitize',
        function($scope,  $http,  $location,  $stateParams,  $state,  $sanitize){


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
            // console.log('connect_failed');
        });
        socket.on('connecting', function(data)
        {
            // console.log('connecting');
        });
        socket.on('disconnect', function(data)
        {
            // console.log('disconnect');
            image.src = "/layout/assets/avatar-binocs.jpg";
            canvas.width = 358;
            canvas.height = 358 * image.height / image.width;

            context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
            socket.socket.disconnect();
        });
        socket.on('error', function(reason)
        {
            // console.log('error');
        });
        socket.on('reconnect_failed', function(data)
        {
            // console.log('reconnect_failed');
        });
        socket.on('reconnect', function(data)
        {
            // console.log('reconnect');
        });
        socket.on('reconnecting', function(data)
        {
            // console.log('reconnecting');
        });

        socket.on('announce', function(data){
            // console.log('announce', data);
        });

        socket.on('note', function(data){
            // console.log('note', data);
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
            // console.log('touched a channel', chan);
            socket.emit('subscribe', { room: chan });
            socket.emit('channel', { room: chan });
        };

    // ANGULAR ROUTES ===================================================
        $scope.testName = $stateParams._id; 

        $scope.joinRoom = function(room){
            // console.log('I want to join this room', $scope.selectedRoom);
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
            // // console.log('message pushing to', $scope.selected._id);

            // TODO: this will catch things on both sides of the hash. 
            // if message has # with no space, post that to message.tags

            var hashCatch = new RegExp(/\S*#\S+/gi);
            var hashPull = new RegExp(/#/gi);
            var tagIt = message.match(hashCatch);          
            
            if (tagIt){
                for (var i=0; i < tagIt.length; ++i) {
                    var msg = tagIt[i].replace(hashPull,'');
                    // // console.log('tag being pushed', msg)
                    note.tags.push(msg);
                }
            }
            
            // // console.log('note tags', note.tags);

            var url = '/api/message/';
            var data_out = note;

            $http
                .post(url, data_out)
                .success(function(data){
                    // socket.emit('send:note', { note: data });
                })
                .error(function(data){
                    // // console.log('Error: ' + data);
                });

            $scope.message='';
        };
    }]);
})();

// check-password-strength.js
// check the strength of a password.
'use strict';

(function() {
    angular.module('field_guide_controls')
    .directive('ngCheckStrength', function () {

        // return {
        //     replace: false,
        //     restrict: 'EACM',
        //     link: function (scope, iElement, iAttrs) {

        //         var strength = {
        //             colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
        //             measureStrength: function (p) {
        //                 if(p){
        //                     var _force = 0;                    
        //                     var _regex = new RegExp('[$-/:-?{-~!"^_`\[\]]','g');
                                                  
        //                     var _lowerLetters = /[a-z]+/.test(p);                    
        //                     var _upperLetters = /[A-Z]+/.test(p);
        //                     var _numbers = /[0-9]+/.test(p);
        //                     var _symbols = _regex.test(p);
                                                  
        //                     var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];                    
        //                     var _passedMatches = $.grep(_flags, function (el) { return el === true; }).length;                                          
                            
        //                     _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
        //                     _force += _passedMatches * 10;
                                
        //                     // penality (short password)
        //                     _force = (p.length <= 6) ? Math.min(_force, 10) : _force;                                      
                            
        //                     // penality (poor variety of characters)
        //                     _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
        //                     _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
        //                     _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;
                            
        //                     return _force;
        //                 }

        //             },
        //             getColor: function (s) {
        //                 if(s){
        //                     var idx = 0;
        //                     if (s <= 10) { idx = 0; }
        //                     else if (s <= 20) { idx = 1; }
        //                     else if (s <= 30) { idx = 2; }
        //                     else if (s <= 40) { idx = 3; }
        //                     else { idx = 4; }
    
        //                     return { idx: idx + 1, col: this.colors[idx] };
        //                 }
        //             }
        //         };

        //         scope.$watch(iAttrs.ngCheckStrength, function () {
        //             // console.log('watching');
        //             if (!scope.user) {
        //                 // console.log('no user');
        //                 iElement.css({ "display": "none"  });
        //             } else {
        //                 // console.log(scope.user.password.length);
        //                 var c = strength.getColor(strength.measureStrength(scope.user.password));
        //                 iElement.css({ "display": "inline" });
        //                 iElement.children('li')
        //                     .css({ "background": "#DDD" })
        //                     .slice(0, c.idx)
        //                     .css({ "background": c.col });
        //             }
        //         });

        //     },
        //     template:   '<li class="pwStrength"></li>'+
        //                 '<li class="pwStrength"></li>'+
        //                 '<li class="pwStrength"></li>'+
        //                 '<li class="pwStrength"></li>'+
        //                 '<li class="pwStrength"></li>'
        // };

    });
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
// fg-check-login.js
// Make an AJAX call to check if the user is logged in.

'use strict';
(function(){
    angular.module('field_guide_controls')
        .factory('checkLoggedin', ['$q', '$timeout', '$http', '$location', '$rootScope', 
            function($q, $timeout, $http, $location, $rootScope) {

            var checkLoggedin = function(user){

                    var deferred = $q.defer();
                    var promise = $http.get('/loggedin')
                        .success(function(user){
                        // Authenticated
                            if (user !== '0') {
                                // console.log('user', user);
                                $rootScope.user = user;
                                deferred.resolve();
                            }
                            // Not Authenticated 
                            else { 
                                // console.log('welp, that flunked.');
                                $location.url('/login');
                                deferred.resolve();
                            }
                        }).error(function(err){
                            $location.url('/login');
                            deferred.resolve();
                        });

                    return deferred.promise;
                };
            
            return checkLoggedin;
        }]);
})();
// fg-comment.js
// add comments to mesages 
'use strict';

(function(){

angular.module('field_guide_controls')
    .factory('postComment', ['$http', function($http) {
        var postComment = function(comment, msg_id){
        // if there's a comment, edit the comment
                var out = {
                    body : comment.body,
                    msg  : msg_id
                };
            
                var promise = $http.post('/api/comment/', out).then(function (response) {
                        return response.data;
                    });

                return promise;
            };
        return postComment;
    }]);
})();
// fg-post-message.js
// post a new note to the database.
'use strict';
(function(){
    angular.module('field_guide_controls')
        .factory('postMessage', ['$http', function($http) {
            var postMessage = function(message, task, test, subject_id){
                    var note = {};
                    note.body = message;
                    note.created = new Date();
                     
                    note._task = task;
                    note._test = test;
                    note._subject = subject_id;

                    var promise = $http.post('/api/message/', note).then(function (response) {
                        return response.data;
                    });

                    return promise;
                };
            return postMessage;
        }]);
})();
// fg-report-functions.js
//  simple functions used in all three report views.

(function() {
    'use strict';

// This module builds out the left navigation used in report and summary controllers.
// It does not require login in order to load information, because it is required for public routes.
    angular.module('field_guide_controls')
        .service('reportFunctions', ['$http', '$sce', function($http, $sce) {
            return {
                videoRender : function(embed){
                    var utest = /usabilitytestresults/i;
                    var ut = utest.test(embed);

                    if(ut){
                        var w1 = /width='\d+'/i;
                        var h1 = /height='\d+'/i;
                        var w2 = /"width":"\d+"/i;
                        var h2 = /"height":"\d+"/i;
                        
                        var res = embed.replace(w1, "width='574'");
                        res = res.replace(w2, '"width":"574"');
                        res = res.replace(h1, "height='380'");
                        res = res.replace(h2, '"height":"380"');

                        return {embed : $sce.trustAsHtml(res)};
                    } else {
                        return {youtube: embed};
                    }
                },
                moveTask : function(list, old_index, new_index){
                    new_index = old_index + new_index;
                    list.splice(new_index, 0, list.splice(old_index, 1)[0]);
                    
                    (function(){
                        var obj_count=0;
                        // set the stored index of the task properly
                        _.each(list, function(obj){
                            obj.report_index = obj_count;
                            obj_count++;
                        });
                    })();
                    return list;
                }
            };
        }]);
})();
// test-task-build.js
// functions required to build out a test
'use strict';

(function(){
    angular.module('field_guide_controls')
        .factory('testBuildFunctions', ['$q', '$timeout', '$http', '$location', '$rootScope', 
            function($q, $timeout, $http, $location, $rootScope) {
                return {
                    addTask : function(test, task){
                        task._test = test;

                        var promise = $http.post('/api/task/', task).success(function(data){
                                return data;
                            });
                        return promise;
                    }
                };
            }]);
})();
// ngMatch.js
'use strict';

(function(){

    angular.module('field_guide_controls')
    .directive('ngMatch', ['$parse', function ($parse) {
        var directive = {
            link: link,
            restrict: 'A',
            require: '?ngModel'
        };

        return directive;
         
        function link(scope, elem, attrs, ctrl) {
        // if ngModel is not defined, we don't need to do anything
            if (!ctrl){ return;}
            if (!attrs.ngMatch){ return; }
             
            var firstPassword = $parse(attrs.ngMatch);
             
            var validator = function (value) {
                var temp = firstPassword(scope),
                v = value === temp;
                ctrl.$setValidity('match', v);
                return value;
            };
             
            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);
            attrs.$observe('ngMatch', function () {
                validator(ctrl.$viewValue);
            });
         
        }
    }]);

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
// socket-factory.js
// a factory to generate a socket.io connection
'use strict';

(function(){

    angular.module('field_guide_controls')
    .factory('socket', function ($rootScope, $location) {
        // for live... $location.protocol()+'://'+$location.host()+':8080/'
        var socket = io.connect();
        
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

})();
// youtube-embed.js
'use strict';

(function(){
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
    });
})();
// filters.js
(function() {
    'use strict';
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
                if (isNaN(length)){
                    length = 10;
                }

                if (end === undefined){
                    end = "...";
                }

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
        };
    }]);
})();
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