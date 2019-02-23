/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
;
if(typeof document!=="undefined"&&!("classList" in document.createElement("a"))){(function(k){if(!("HTMLElement" in k)&&!("Element" in k)){return
}var a="classList",g="prototype",n=(k.HTMLElement||k.Element)[g],b=Object,l=String[g].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},c=Array[g].indexOf||function(r){var q=0,p=this.length;for(;q<p;q++){if(q in this&&this[q]===r){return q
}}return -1},o=function(p,q){this.name=p;this.code=DOMException[p];this.message=q
},h=function(q,p){if(p===""){throw new o("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(p)){throw new o("INVALID_CHARACTER_ERR","String contains an invalid character")
}return c.call(q,p)},d=function(u){var t=l.call(u.className),r=t?t.split(/\s+/):[],q=0,p=r.length;
for(;q<p;q++){this.push(r[q])}this._updateClassName=function(){u.className=this.toString()
}},f=d[g]=[],j=function(){return new d(this)};o[g]=Error[g];f.item=function(p){return this[p]||null
};f.contains=function(p){p+="";return h(this,p)!==-1};f.add=function(){var u=arguments,t=0,q=u.length,r,p=false;
do{r=u[t]+"";if(h(this,r)===-1){this.push(r);p=true}}while(++t<q);if(p){this._updateClassName()
}};f.remove=function(){var v=arguments,u=0,q=v.length,t,p=false;do{t=v[u]+"";var r=h(this,t);
if(r!==-1){this.splice(r,1);p=true}}while(++u<q);if(p){this._updateClassName()}};
f.toggle=function(q,r){q+="";var p=this.contains(q),t=p?r!==true&&"remove":r!==false&&"add";
if(t){this[t](q)}return !p};f.toString=function(){return this.join(" ")};if(b.defineProperty){var m={get:j,enumerable:true,configurable:true};
try{b.defineProperty(n,a,m)}catch(i){if(i.number===-2146823252){m.enumerable=false;
b.defineProperty(n,a,m)}}}else{if(b[g].__defineGetter__){n.__defineGetter__(a,j)
}}}(self))}if(document.createEvent){try{new window.CustomEvent("click")}catch(err){window.CustomEvent=(function(){function a(c,d){d=d||{bubbles:false,cancelable:false,detail:undefined};
var b=document.createEvent("CustomEvent");b.initCustomEvent(c,d.bubbles,d.cancelable,d.detail);
return b}a.prototype=window.Event.prototype;return a}())}}if(!Function.prototype.bind){Function.prototype.bind=function(a){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
}var f=Array.prototype.slice.call(arguments,1);var d=this;var b=function(){};var c=function(){return d.apply((this instanceof b&&a)?this:a,f.concat(Array.prototype.slice.call(arguments)))
};b.prototype=this.prototype;c.prototype=new b();return c}}if(!Array.isArray){Array.isArray=function isArray(a){return(a&&typeof a==="object"&&"splice" in a&&"join" in a)
}}if(!Array.prototype.every){Array.prototype.every=function every(f,d){var c=Object(this);
var a=c.length>>>0;var b;if(typeof f!=="function"){throw new TypeError(f+" is not a function")
}for(b=0;b<a;b+=1){if(b in c&&!f.call(d,c[b],b,c)){return false}}return true}}if(!Array.prototype.filter){Array.prototype.filter=function filter(g,f){var d=Object(this);
var a=d.length>>>0;var c;var b=[];if(typeof g!=="function"){throw new TypeError(g+" is not a function")
}for(c=0;c<a;c+=1){if(c in d&&g.call(f,d[c],c,d)){b.push(d[c])}}return b}}if(!Array.prototype.forEach){Array.prototype.forEach=function forEach(f,d){var c=Object(this);
var a;var b;if(typeof f!=="function"){throw new TypeError("No function object passed to forEach.")
}for(a=0;a<this.length;a+=1){b=c[a];f.call(d,b,a,c)}}}if(!Array.prototype.indexOf){Array.prototype.indexOf=function indexOf(b,c){var d=c||0;
var a=0;if(d<0){d=this.length+c-1;if(d<0){throw"Wrapped past beginning of array while looking up a negative start index."
}}for(a=0;a<this.length;a++){if(this[a]===b){return a}}return(-1)}}if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=function lastIndexOf(f,d){var b=Object(this);
var a=b.length>>>0;var c;d=parseInt(d,10);if(a<=0){return -1}c=(typeof d==="number")?Math.min(a-1,d):a-1;
c=c>=0?c:a-Math.abs(c);for(;c>=0;c-=1){if(c in b&&f===b[c]){return c}}return -1
}}if(!Array.prototype.map){Array.prototype.map=function map(g,f){var c=Object(this);
var b=c.length>>>0;var d;var a=new Array(b);if(typeof g!=="function"){throw new TypeError(g+" is not a function")
}for(d=0;d<b;d+=1){if(d in c){a[d]=g.call(f,c[d],d,c)}}return a}}if(!Array.prototype.reduce){Array.prototype.reduce=function reduce(g,c){var d=Object(this);
var b=d.length>>>0;var f=0;var a;if(typeof g!=="function"){throw new TypeError(g+" is not a function")
}if(typeof c==="undefined"){if(!b){throw new TypeError("Reduce of empty array with no initial value")
}a=d[0];f=1}else{a=c}while(f<b){if(f in d){a=g.call(undefined,a,d[f],f,d);f+=1}}return a
}}if(!Array.prototype.reduceRight){Array.prototype.reduceRight=function reduceRight(g,c){var d=Object(this);
var b=d.length>>>0;var f=b-1;var a;if(typeof g!=="function"){throw new TypeError(g+" is not a function")
}if(c===undefined){if(!b){throw new TypeError("Reduce of empty array with no initial value")
}a=d[b-1];f=b-2}else{a=c}while(f>=0){if(f in d){a=g.call(undefined,a,d[f],f,d);
f-=1}}return a}}if(!Array.prototype.some){Array.prototype.some=function some(f,d){var b=Object(this);
var a=b.length>>>0;var c;if(typeof f!=="function"){throw new TypeError(f+" is not a function")
}for(c=0;c<a;c+=1){if(c in b&&f.call(d,b[c],c,b)===true){return true}}return false
}}if(!Date.now){Date.now=function now(){return new Date().getTime()}}if(!Date.prototype.toISOString){Date.prototype.toISOString=function toISOString(){if(!isFinite(this)){throw new RangeError("Date.prototype.toISOString called on non-finite value.")
}var b={year:this.getUTCFullYear(),month:this.getUTCMonth()+1,day:this.getUTCDate(),hours:this.getUTCHours(),minutes:this.getUTCMinutes(),seconds:this.getUTCSeconds(),mseconds:(this.getUTCMilliseconds()/1000).toFixed(3).substr(2,3)};
var c;var a;for(c in b){if(b.hasOwnProperty(c)&&c!=="year"&&c!=="mseconds"){b[c]=String(b[c]).length===1?"0"+String(b[c]):String(b[c])
}}if(b.year<0||b.year>9999){a=b.year<0?"-":"+";b.year=a+String(Math.abs(b.year/1000000)).substr(2,6)
}return b.year+"-"+b.month+"-"+b.day+"T"+b.hours+":"+b.minutes+":"+b.seconds+"."+b.mseconds+"Z"
}}if(!Date.prototype.toJSON){Date.prototype.toJSON=function(d){var f=Object(this);
var a;var c=function(g){var i=typeof g;var h=[null,"undefined","boolean","string","number"].some(function(j){return j===i
});if(h){return true}return false};var b=function(g){var h;if(c(g)){return g}h=(typeof g.valueOf==="function")?g.valueOf():(typeof g.toString==="function")?g.toString():null;
if(h&&c(h)){return h}throw new TypeError(g+" cannot be converted to a primitive")
};a=b(f);if(typeof a==="number"&&!isFinite(a)){return null}if(typeof f.toISOString!=="function"){throw new TypeError("toISOString is not callable")
}return f.toISOString.call(f)}}if(!String.prototype.trim){String.prototype.trim=function trim(){return this.replace(/^\s+|\s+$/g,"")
}}if(!Object.keys){Object.keys=function keys(b){var a=[];var c;if((!b)||(typeof b.hasOwnProperty!=="function")){throw"Object.keys called on non-object."
}for(c in b){if(b.hasOwnProperty(c)){a.push(c)}}return a}}if(typeof JSON=="undefined"||!("stringify" in JSON&&"parse" in JSON)){if(!this.JSON){this.JSON={}
}(function(){function f(n){return n<10?"0"+n:n}if(typeof String.prototype.toJSON!=="function"){String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);
case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;
i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space
}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)
}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")
}}}())}window.matchMedia=window.matchMedia||(function(f,g){var c,a=f.documentElement,b=a.firstElementChild||a.firstChild,d=f.createElement("body"),h=f.createElement("div");
h.id="mq-test-1";h.style.cssText="position:absolute;top:-100em";d.style.background="none";
d.appendChild(h);return function(i){h.innerHTML='&shy;<style media="'+i+'"> #mq-test-1 { width:42px; }</style>';
a.insertBefore(d,b);c=h.offsetWidth===42;a.removeChild(d);return{matches:c,media:i}
}}(document));(function(){var b=0;var c=["ms","moz","webkit","o"];for(var a=0;a<c.length&&!window.requestAnimationFrame;
++a){window.requestAnimationFrame=window[c[a]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[c[a]+"CancelAnimationFrame"]||window[c[a]+"CancelRequestAnimationFrame"]
}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(i,f){var d=Date.now();
var g=Math.max(0,16-(d-b));var h=window.setTimeout(function(){i(d+g)},g);b=d+g;
return h}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(d){clearTimeout(d)
}}}());window.XMLHttpRequest=window.XMLHttpRequest||function(){var b;try{b=new ActiveXObject("Msxml2.XMLHTTP")
}catch(a){try{b=new ActiveXObject("Microsoft.XMLHTTP")}catch(a){b=false}}return b
};!function(){var g,f,i,h;!function(){var b={},a={};g=function(j,d,k){b[j]={deps:d,callback:k}
},h=i=f=function(x){function w(j){if("."!==j.charAt(0)){return j}for(var y=j.split("/"),n=x.split("/").slice(0,-1),m=0,l=y.length;
l>m;m++){var k=y[m];if(".."===k){n.pop()}else{if("."===k){continue}n.push(k)}}return n.join("/")
}if(h._eak_seen=b,a[x]){return a[x]}if(a[x]={},!b[x]){throw new Error("Could not find module "+x)
}for(var v,u=b[x],t=u.deps,r=u.callback,q=[],p=0,o=t.length;o>p;p++){"exports"===t[p]?q.push(v={}):q.push(f(w(t[p])))
}var d=r.apply(this,q);return a[x]=v||d}}(),g("promise/all",["./utils","exports"],function(k,j){function n(d){var c=this;
if(!m(d)){throw new TypeError("You must pass an array to all.")}return new c(function(a,v){function u(b){return function(w){t(b,w)
}}function t(b,w){q[b]=w,0===--p&&a(q)}var r,q=[],p=d.length;0===p&&a([]);for(var o=0;
o<d.length;o++){r=d[o],r&&l(r.then)?r.then(u(o),v):t(o,r)}})}var m=k.isArray,l=k.isFunction;
j.all=n}),g("promise/asap",["exports"],function(w){function v(){return function(){process.nextTick(r)
}}function u(){var j=0,d=new n(r),k=document.createTextNode("");return d.observe(k,{characterData:!0}),function(){k.data=j=++j%2
}}function t(){return function(){m.setTimeout(r,1)}}function r(){for(var k=0;k<l.length;
k++){var j=l[k],y=j[0],x=j[1];y(x)}l=[]}function q(j,d){var k=l.push([j,d]);1===k&&p()
}var p,o="undefined"!=typeof window?window:{},n=o.MutationObserver||o.WebKitMutationObserver,m="undefined"!=typeof global?global:void 0===this?window:this,l=[];
p="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?v():n?u():t(),w.asap=q
}),g("promise/config",["exports"],function(j){function d(l,c){return 2!==arguments.length?k[l]:(k[l]=c,void 0)
}var k={instrument:!1};j.config=k,j.configure=d}),g("promise/polyfill",["./promise","./utils","exports"],function(k,j,o){function n(){var d;
d="undefined"!=typeof global?global:"undefined"!=typeof window&&window.document?window:self;
var c="Promise" in d&&"resolve" in d.Promise&&"reject" in d.Promise&&"all" in d.Promise&&"race" in d.Promise&&function(){var a;
return new d.Promise(function(b){a=b}),l(a)}();c||(d.Promise=m)}var m=k.Promise,l=j.isFunction;
o.polyfill=n}),g("promise/promise",["./config","./utils","./all","./race","./resolve","./reject","./asap","exports"],function(aj,ai,ah,ag,af,ae,ad,ac){function ab(b){if(!J(b)){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
}if(!(this instanceof ab)){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
}this._subscribers=[],aa(b,this)}function aa(k,j){function n(b){V(j,b)}function m(b){S(j,b)
}try{k(n,m)}catch(l){m(l)}}function Z(u,t,r,q){var p,o,n,m,l=J(r);if(l){try{p=r(q),n=!0
}catch(k){m=!0,o=k}}else{p=q,n=!0}W(t,p)||(l&&n?V(t,p):m?S(t,o):u===N?V(t,p):u===L&&S(t,p))
}function Y(k,j,o,n){var m=k._subscribers,l=m.length;m[l]=j,m[l+N]=o,m[l+L]=n}function X(k,j){for(var p,o,n=k._subscribers,m=k._detail,l=0;
l<n.length;l+=3){p=n[l],o=n[l+j],Z(j,p,o,m)}k._subscribers=null}function W(k,j){var n,m=null;
try{if(k===j){throw new TypeError("A promises callback cannot return that same promise.")
}if(K(j)&&(m=j.then,J(m))){return m.call(j,function(a){return n?!0:(n=!0,j!==a?V(k,a):U(k,a),void 0)
},function(a){return n?!0:(n=!0,S(k,a),void 0)}),!0}}catch(l){return n?!0:(S(k,l),!0)
}return !1}function V(d,c){d===c?U(d,c):W(d,c)||U(d,c)}function U(d,c){d._state===R&&(d._state=P,d._detail=c,M.async(Q,d))
}function S(d,c){d._state===R&&(d._state=P,d._detail=c,M.async(O,d))}function Q(b){X(b,b._state=N)
}function O(b){X(b,b._state=L)}var M=aj.config,K=(aj.configure,ai.objectOrFunction),J=ai.isFunction,I=(ai.now,ah.all),H=ag.race,G=af.resolve,F=ae.reject,T=ad.asap;
M.async=T;var R=void 0,P=0,N=1,L=2;ab.prototype={constructor:ab,_state:void 0,_detail:void 0,_subscribers:void 0,then:function(k,j){var n=this,m=new this.constructor(function(){});
if(this._state){var l=arguments;M.async(function(){Z(n._state,m,l[n._state-1],n._detail)
})}else{Y(this,m,k,j)}return m},"catch":function(b){return this.then(null,b)}},ab.all=I,ab.race=H,ab.resolve=G,ab.reject=F,ac.Promise=ab
}),g("promise/race",["./utils","exports"],function(k,j){function m(d){var c=this;
if(!l(d)){throw new TypeError("You must pass an array to race.")}return new c(function(a,p){for(var o,n=0;
n<d.length;n++){o=d[n],o&&"function"==typeof o.then?o.then(a,p):a(o)}})}var l=k.isArray;
j.race=m}),g("promise/reject",["exports"],function(d){function c(k){var j=this;
return new j(function(a,l){l(k)})}d.reject=c}),g("promise/resolve",["exports"],function(d){function c(k){if(k&&"object"==typeof k&&k.constructor===this){return k
}var j=this;return new j(function(a){a(k)})}d.resolve=c}),g("promise/utils",["exports"],function(k){function j(b){return n(b)||"object"==typeof b&&null!==b
}function n(b){return"function"==typeof b}function m(b){return"[object Array]"===Object.prototype.toString.call(b)
}var l=Date.now||function(){return(new Date).getTime()};k.objectOrFunction=j,k.isFunction=n,k.isArray=m,k.now=l
}),f("promise/polyfill").polyfill()}();!function(f){function d(l,k){var i,j,m=l.map(function(n){return"exports"===n?i={}:"module"===n?j={exports:{}}:"require"===n?function(o){return c(h(o,k))
}:(n=h(n,k),c(n))});return{deps:m,exports:i,module:j}}function h(j,m){var k,l=m&&m.split("/");
if(j&&"."===j.charAt(0)){if(m){for(l.pop(),j=j.split("/"),j=l.concat(j),k=0;k<j.length;
k+=1){if("."===j[k]){j.splice(k,1),k-=1}else{if(".."===j[k]){if(1===k&&(".."===j[2]||".."===j[0])){break
}k>0&&(j.splice(k-1,2),k-=2)}}}j=j.join("/")}else{0===j.indexOf("./")&&(j=j.substring(2))
}}return j}function c(j,k){var i;return"string"==typeof j?(j=h(j),i=b[j],i||"function"!=typeof a||(i=a(j)),i):"function"==typeof k&&Array.isArray(j)?k.apply(f,d(j).deps):void 0
}function g(i,k,j){if(!b[i]){if(j||(j=k),"function"==typeof j&&Array.isArray(k)){var l=d(k,i);
b[i]=j.apply(j,l.deps),b[i]||!l.exports&&!l.module||(b[i]="object"==typeof l.exports&&Object.keys(l.exports).length?l.exports:l.module.exports)
}else{b[i]="function"==typeof j?j():j}}}var b,a;c.version="1.4.0",c.config=function(){},g.amd={},c._init=function(){b={}
},g.getRegisteredModules=function(){return Object.getOwnPropertyNames(b).sort()
},g.getRegisteredNamespaces=function(){var i=g.getRegisteredModules(),j={};return i.forEach(function(k){var l=k.split("/")[0];
j[l]||(j[l]=[]),j[l].push(k)}),j},c._init(),"function"==typeof f.define&&f.define.amd||(a=f.require,f.require=c,f.define=g)
}(this);require=(function e(b,g,d){function c(k,i){if(!g[k]){if(!b[k]){var h=typeof require=="function"&&require;
if(!i&&h){return h(k,!0)}if(a){return a(k,!0)}throw new Error("Cannot find module '"+k+"'")
}var j=g[k]={exports:{}};b[k][0].call(j.exports,function(l){var m=b[k][1][l];return c(m?m:l)
},j,j.exports,e,b,g,d)}return g[k].exports}var a=typeof require=="function"&&require;
for(var f=0;f<d.length;f++){c(d[f])}return c})({1:[function(b,c,a){(function(d,f){if(typeof a==="object"&&a){c.exports=f
}else{if(typeof define==="function"&&define.amd){define(f)}else{d.Deferred=f}}}(this,(function(){var g={};
var f,l,n,d,k,j,m,h;f={0:"pending",1:"resolved",2:"rejected"};l=function(r,u){var q,v,t,p,o;
if(this._status!==0){if(console&&console.warn){console.warn("Trying to fulfill more than once.")
}return false}this.data=u;v=this.pending;t=v.length;for(q=0;q<t;q++){p=v[q];if(p[r]){o=p[r](u)
}if(typeof o==="object"&&o.hasOwnProperty("then")&&o.hasOwnProperty("status")){o.then(function(w){p.deferred.resolve(w)
},function(w){p.deferred.reject(w)},function(w){p.deferred.progress(w)})}else{p.deferred[r](o||undefined)
}}if(r!=="progress"){v=[]}return true};j=function(p,o){this.then=p;this.status=o
};m=j.prototype;h=function(o){return o};m.success=function(p,o){return this.then(p.bind(o),h,h)
};m.fail=function(p,o){return this.then(h,p.bind(o),h)};m.progress=function(p,o){return this.then(h,h,p.bind(o))
};d=function(o){if(typeof o!=="function"){return function(){}}return o};n=function(q,p,o){this.resolve=d(q);
this.reject=d(p);this.progress=d(o);this.deferred=new k()};k=function(){this.pending=[];
this._status=0;this._promise=new j(this.then.bind(this),this.status.bind(this))
};k.prototype={status:function(){return f[this._status]},promise:function(){return this._promise
},progress:function(o){l.call(this,"progress",o);return this._promise},resolve:function(o){l.call(this,"resolve",o);
if(this._status===0){this._status=1}return this._promise},reject:function(o){l.call(this,"reject",o);
if(this._status===0){this._status=2}return this._promise},then:function(t,q,p){var o,r;
r=new n(t,q,p);if(this._status===0){this.pending.push(r)}else{if(this._status===1&&typeof t==="function"){o=t(this.data);
if(typeof o==="object"&&o.hasOwnProperty("then")&&o.hasOwnProperty("status")){o.then(function(u){r.deferred.resolve(u)
},function(u){r.deferred.reject(u)},function(u){r.deferred.progress(u)})}else{r.deferred.resolve(o)
}}else{if(this._status===2&&typeof q==="function"){o=q(this.data);r.deferred.reject(o)
}}}return r.deferred.promise()}};var i=function(){var q,p,t,r,o;q=[].slice.call(arguments);
p=new k();t=0;r=function(v){t--;var u=q.indexOf(this);q[u]=v;if(t===0){p.resolve(q)
}};o=function(u){p.reject(u)};q.forEach(function(u){if(u.then){t++}});q.forEach(function(u){if(u.then){u.then(r.bind(u),o)
}});return p.promise()};k.when=i;g.Deferred=k;return g}())))},{}],2:[function(c,b,d){function g(){}g.prototype={resolve:function h(){this._defer.resolve.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},reject:function j(){this._defer.reject.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},progress:function a(){var k="ac-defer.progress is deprecated since it is not part of the A+ spec. Recommend using ac-event-emitter for progress signaling";
console.warn(k);this._defer.progress.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},then:function f(){this._defer.then.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},promise:function i(){return this._defer.promise.apply(this._defer,Array.prototype.slice.call(arguments))
}};b.exports=g},{}],"ac-deferred":[function(b,c,a){c.exports=b("gpsNR2")},{}],gpsNR2:[function(c,d,a){var h=new (c("./ac-deferred/Deferred"))(),g=c("smartsign-deferred").Deferred;
function b(){this._defer=new g()}b.prototype=h;d.exports.join=function i(){return g.when.apply(null,[].slice.call(arguments))
};d.exports.all=function f(j){return g.when.apply(null,j)};d.exports.Deferred=b
},{"./ac-deferred/Deferred":2,"smartsign-deferred":1}],nhHP3s:[function(b,c,a){c.exports.EventEmitter=b("./ac-event-emitter/EventEmitter")
},{"./ac-event-emitter/EventEmitter":7}],"ac-event-emitter":[function(b,c,a){c.exports=b("nhHP3s")
},{}],7:[function(d,c,f){var h="EventEmitter:propagation";var k=function(l){if(l){this.context=l
}};var g=k.prototype;var i=function(){if(!this.hasOwnProperty("_events")&&typeof this._events!=="object"){this._events={}
}return this._events};var a=function(m,o){var p=m[0];var q=m[1];var n=m[2];if((typeof p!=="string"&&typeof p!=="object")||p===null||Array.isArray(p)){throw new TypeError("Expecting event name to be a string or object.")
}if((typeof p==="string")&&!q){throw new Error("Expecting a callback function to be provided.")
}if(q&&(typeof q!=="function")){if(typeof p==="object"&&typeof q==="object"){n=q
}else{throw new TypeError("Expecting callback to be a function.")}}if(typeof p==="object"){for(var l in p){o.call(this,l,p[l],n)
}}if(typeof p==="string"){p=p.split(" ");p.forEach(function(r){o.call(this,r,q,n)
},this)}};var j=function(o,p){var l;var m;var n;l=i.call(this)[o];if(!l||l.length===0){return
}l=l.slice();for(m=0,n=l.length;m<n;m++){if(p(l[m],m)){break}}};var b=function(m,n,o){var l=-1;
j.call(this,n,function(q,p){if(q.callback===o){l=p;return true}});if(l===-1){return
}m[n].splice(l,1)};g.on=function(){var l=i.call(this);a.call(this,arguments,function(n,o,m){l[n]=l[n]||(l[n]=[]);
l[n].push({callback:o,context:m})});return this};g.once=function(){a.call(this,arguments,function(m,o,l){var n=function(p){o.call(l||this,p);
this.off(m,n)};this.on(m,n,this)});return this};g.off=function(n,p){var m=i.call(this);
if(arguments.length===0){this._events={}}else{if(!n||(typeof n!=="string"&&typeof n!=="object")||Array.isArray(n)){throw new TypeError("Expecting event name to be a string or object.")
}}if(typeof n==="object"){for(var o in n){b.call(this,m,o,n[o])}}if(typeof n==="string"){var l=n.split(" ");
if(l.length===1){if(p){b.call(this,m,n,p)}else{m[n]=[]}}else{l.forEach(function(q){m[q]=[]
})}}return this};g.trigger=function(m,n,l){if(!m){throw new Error("trigger method requires an event name")
}if(typeof m!=="string"){throw new TypeError("Expecting event names to be a string.")
}if(l&&typeof l!=="boolean"){throw new TypeError("Expecting doNotPropagate to be a boolean.")
}m=m.split(" ");m.forEach(function(o){j.call(this,o,function(p){p.callback.call(p.context||this.context||this,n)
}.bind(this));if(!l){j.call(this,h,function(q){var p=o;if(q.prefix){p=q.prefix+p
}q.emitter.trigger(p,n)})}},this);return this};g.propagateTo=function(m,n){var l=i.call(this);
if(!l[h]){this._events[h]=[]}l[h].push({emitter:m,prefix:n})};g.stopPropagatingTo=function(o){var m=i.call(this);
if(!o){m[h]=[];return}var p=m[h];var n=p.length;var l;for(l=0;l<n;l++){if(p[l].emitter===o){p.splice(l,1);
break}}};g.has=function(l,t,p){var o=i.call(this);var m=o[l];if(arguments.length===0){return Object.keys(o)
}if(!t){return(m&&m.length>0)?true:false}for(var n=0,q=m.length;n<q;n++){var r=m[n];
if(p&&t&&r.context===p&&r.callback===t){return true}else{if(t&&!p&&r.callback===t){return true
}}}return false};c.exports=k},{}],8:[function(i,c,y){var t=Object.prototype.toString;
var l=Object.prototype.hasOwnProperty;var b=typeof Array.prototype.indexOf==="function"?function(A,B){return A.indexOf(B)
}:function(A,C){for(var B=0;B<A.length;B++){if(A[B]===C){return B}}return -1};var k=Array.isArray||function(A){return t.call(A)=="[object Array]"
};var w=Object.keys||function(C){var A=[];for(var B in C){if(C.hasOwnProperty(B)){A.push(B)
}}return A};var v=typeof Array.prototype.forEach==="function"?function(A,B){return A.forEach(B)
}:function(A,C){for(var B=0;B<A.length;B++){C(A[B])}};var m=function(A,E,B){if(typeof A.reduce==="function"){return A.reduce(E,B)
}var D=B;for(var C=0;C<A.length;C++){D=E(D,A[C])}return D};var z=/^[0-9]+$/;function d(D,C){if(D[C].length==0){return D[C]={}
}var B={};for(var A in D[C]){if(l.call(D[C],A)){B[A]=D[C][A]}}D[C]=B;return B}function q(E,C,B,F){var A=E.shift();
if(l.call(Object.prototype,B)){return}if(!A){if(k(C[B])){C[B].push(F)}else{if("object"==typeof C[B]){C[B]=F
}else{if("undefined"==typeof C[B]){C[B]=F}else{C[B]=[C[B],F]}}}}else{var D=C[B]=C[B]||[];
if("]"==A){if(k(D)){if(""!=F){D.push(F)}}else{if("object"==typeof D){D[w(D).length]=F
}else{D=C[B]=[C[B],F]}}}else{if(~b(A,"]")){A=A.substr(0,A.length-1);if(!z.test(A)&&k(D)){D=d(C,B)
}q(E,D,A,F)}else{if(!z.test(A)&&k(D)){D=d(C,B)}q(E,D,A,F)}}}}function f(E,D,H){if(~b(D,"]")){var G=D.split("["),A=G.length,F=A-1;
q(G,E,"base",H)}else{if(!z.test(D)&&k(E.base)){var C={};for(var B in E.base){C[B]=E.base[B]
}E.base=C}n(E.base,D,H)}return E}function o(D){if("object"!=typeof D){return D}if(k(D)){var A=[];
for(var C in D){if(l.call(D,C)){A.push(D[C])}}return A}for(var B in D){D[B]=o(D[B])
}return D}function g(B){var A={base:{}};v(w(B),function(C){f(A,C,B[C])});return o(A.base)
}function h(B){var A=m(String(B).split("&"),function(C,G){var H=b(G,"="),F=u(G),D=G.substr(0,F||H),E=G.substr(F||H,G.length),E=E.substr(b(E,"=")+1,E.length);
if(""==D){D=G,E=""}if(""==D){return C}return f(C,p(D),p(E))},{base:{}}).base;return o(A)
}y.parse=function(A){if(null==A||""==A){return{}}return"object"==typeof A?g(A):h(A)
};var r=y.stringify=function(B,A){if(k(B)){return j(B,A)}else{if("[object Object]"==t.call(B)){return x(B,A)
}else{if("string"==typeof B){return a(B,A)}else{return A+"="+encodeURIComponent(String(B))
}}}};function a(B,A){if(!A){throw new TypeError("stringify expects an object")}return A+"="+encodeURIComponent(B)
}function j(A,D){var B=[];if(!D){throw new TypeError("stringify expects an object")
}for(var C=0;C<A.length;C++){B.push(r(A[C],D+"["+C+"]"))}return B.join("&")}function x(G,F){var B=[],E=w(G),D;
for(var C=0,A=E.length;C<A;++C){D=E[C];if(""==D){continue}if(null==G[D]){B.push(encodeURIComponent(D)+"=")
}else{B.push(r(G[D],F?F+"["+encodeURIComponent(D)+"]":encodeURIComponent(D)))}}return B.join("&")
}function n(C,B,D){var A=C[B];if(l.call(Object.prototype,B)){return}if(undefined===A){C[B]=D
}else{if(k(A)){A.push(D)}else{C[B]=[A,D]}}}function u(D){var A=D.length,C,E;for(var B=0;
B<A;++B){E=D[B];if("]"==E){C=false}if("["==E){C=true}if("="==E&&!C){return B}}}function p(B){try{return decodeURIComponent(B.replace(/\+/g," "))
}catch(A){return B}}},{}],QQX0yI:[function(b,c,a){var f=b("./ac-base/globals");
var h=f.window.AC=f.window.AC||{};var d=b("./ac-base/Environment");var g=b("./ac-base/Element/onDOMReady");
if(d.Browser.IE){if(d.Browser.IE.documentMode<9){b("./ac-base/shims/html5.js")()
}if(d.Browser.IE.documentMode<8){g(b("./ac-base/shims/ie/nonClickableImageBooster"))
}}if(typeof define!=="undefined"){h.define=define;h.require=b}h.adler32=b("./ac-base/adler32");
h.Ajax=b("./ac-base/Ajax");h.Array=b("./ac-base/Array");h.bindEventListeners=b("./ac-base/bindEventListeners");
h.Canvas=b("./ac-base/Canvas");h.Class=b("./ac-base/Class");h.Date=b("./ac-base/Date");
h.DeferredQueue=b("./ac-base/DeferredQueue");h.EasingFunctions=b("./ac-base/EasingFunctions");
h.Element=b("./ac-base/Element");h.Environment=d;h.Event=b("./ac-base/Event");h.Function=b("./ac-base/Function");
h.History=b("./ac-base/History");h.log=b("./ac-base/log");h.namespace=b("./ac-base/namespace");
h.NotificationCenter=b("./ac-base/NotificationCenter");h.Object=b("./ac-base/Object");
h.onDOMReady=g;h.onWindowLoad=b("./ac-base/Element/onWindowLoad");h.queryParameters=b("./ac-base/queryParameters");
h.RegExp=b("./ac-base/RegExp");h.Registry=b("./ac-base/Registry");h.String=b("./ac-base/String");
h.Synthesize=b("./ac-base/Synthesize");h.uid=b("./ac-base/uid");h.Viewport=b("./ac-base/Viewport");
h.windowHasLoaded=false;h.Element.addEventListener(f.window,"load",function(){h.windowHasLoaded=true
});c.exports=h},{"./ac-base/Ajax":11,"./ac-base/Array":15,"./ac-base/Canvas":16,"./ac-base/Class":17,"./ac-base/Date":18,"./ac-base/DeferredQueue":19,"./ac-base/EasingFunctions":20,"./ac-base/Element":21,"./ac-base/Element/onDOMReady":24,"./ac-base/Element/onWindowLoad":25,"./ac-base/Environment":27,"./ac-base/Event":33,"./ac-base/Function":34,"./ac-base/History":35,"./ac-base/NotificationCenter":36,"./ac-base/Object":37,"./ac-base/RegExp":38,"./ac-base/Registry":39,"./ac-base/String":41,"./ac-base/Synthesize":42,"./ac-base/Viewport":43,"./ac-base/adler32":44,"./ac-base/bindEventListeners":45,"./ac-base/globals":46,"./ac-base/log":47,"./ac-base/namespace":48,"./ac-base/queryParameters":49,"./ac-base/shims/html5.js":50,"./ac-base/shims/ie/nonClickableImageBooster":54,"./ac-base/uid":55}],"ac-base":[function(b,c,a){c.exports=b("QQX0yI")
},{}],11:[function(c,d,a){var b={};c("./Ajax/ajax-tracker")(b);c("./Ajax/ajax-response")(b);
c("./Ajax/ajax-request")(b);b.getTransport=function(){return new XMLHttpRequest()
};b.checkURL=function(g,i){var f=b.__validateArguments(g,i);if(f){throw f}var h=b.getTransport();
this.__handleReadyStateChange(h,i);h.open("HEAD",g,true);h.send(null)};b.__handleReadyStateChange=function(g,f){g.onreadystatechange=function(){if(this.readyState===4){if(typeof f==="function"){f(this.status===200)
}}}};b.__validateArguments=function(f,h){var g;if(!f){g="Must provide a url"}if(!h){g="Must provide a callback"
}if(!f&&!h){g="Must provide a url and callback"}return g};d.exports=b},{"./Ajax/ajax-request":12,"./Ajax/ajax-response":13,"./Ajax/ajax-tracker":14}],12:[function(c,d,b){var f=c("../Class");
var a=c("../Object");d.exports=function(g){var h=f();h.prototype={__defaultOptions:{method:"get"},initialize:function(j,i){this._transport=g.getTransport();
this._mimeTypeOverride=null;this._options=null;a.synthesize(this);this.setOptions(a.extend(a.clone(this.__defaultOptions),i||{}));
g.AjaxTracker.sharedInstance().addResponder(this);this.__configureTransport(j)},__configureTransport:function(i){this.transport().onreadystatechange=this.__handleTransportStateChange.bind(this);
this.transport().open(this.options().method,i,true);this.transport().setRequestHeader("Content-Type",this.options().contentType);
this.transport().send(null)},__handleTransportStateChange:function(){if(this.transport().readyState===4){var i=new g.AjaxResponse(this)
}},overrideMimeType:function(i){this._mimeTypeOverride=i;if(this.transport().overrideMimeType){this.transport().overrideMimeType(i)
}},_overrideMimeType:null};g.AjaxRequest=h}},{"../Class":17,"../Object":37}],13:[function(b,c,a){var d=b("../Class");
c.exports=function(f){var g=d();g.prototype={_request:null,_transport:null,initialize:function(i){this._transport=i.transport();
this._request=i;var j=false;var h=this._transport.readyState===4;if(h){this.__triggerCallbacks();
j=true}if(j){if(this._request.options().onComplete){this._request.options().onComplete(this)
}f.AjaxTracker.sharedInstance().removeResponder(i)}},__triggerCallbacks:function(){var k=this._transport.status;
var j=k>=200&&k<300;var i=k>=400&&k<500;var h=k>=500&&k<600||k===0;if(j&&this._request.options().onSuccess){this._request.options().onSuccess(this)
}if(i&&this._request.options().onFailure){this._request.options().onFailure(this)
}if(h&&this._request.options().onError){this._request.options().onError(this)}},responseText:function(){return this._transport.responseText
},responseXML:function(){return this._transport.responseXML},responseJSON:function(){return JSON.parse(this._transport.responseText)
}};f.AjaxResponse=g}},{"../Class":17}],14:[function(b,c,a){var d=b("../Class");
c.exports=function(f){var g=d();g.prototype={__responders:[],initialize:function(){},addResponder:function(h){this.__responders.push(h);
return this.__responders},removeResponder:function(i){var h=this.__responders.length;
this.__responders=this.__responders.filter(function(k){return k!==i});var j=this.__responders.length;
if(h>j){return true}return false}};f.AjaxTracker=g}},{"../Class":17}],15:[function(c,d,b){var f=c("./Environment/Browser");
var a={};a.toArray=function(g){return Array.prototype.slice.call(g)};a.flatten=function(i){var g=[];
var h=function(j){if(Array.isArray(j)){j.forEach(h)}else{g.push(j)}};i.forEach(h);
return g};a.without=function(g,k){var i;var h=g.indexOf(k);var j=g.length;if(h>=0){if(h===(j-1)){i=g.slice(0,(j-1))
}else{if(h===0){i=g.slice(1)}else{i=g.slice(0,h);i=i.concat(g.slice(h+1))}}}else{return g
}return i};if(f.name==="IE"){c("./shims/ie/Array")(a,f)}d.exports=a},{"./Environment/Browser":28,"./shims/ie/Array":51}],16:[function(c,d,b){var f=c("./Element");
var a={};a.imageDataFromFile=function(h,i){if(typeof i!=="function"){throw new TypeError("Need callback method to call when imageData is retrieved.")
}if(typeof h!=="string"||h===""){throw new TypeError("Src for imageData must be an Image Node with a src attribute or a string.")
}var g=new Image();g.onload=function(){i(a.imageDataFromNode(g))};g.src=h};a.imageDataFromNode=function(g){if(!f.isElement(g)||g.getAttribute("src")==="null"||g.width===0){throw new TypeError("Source node must be an IMG tag and must have already loaded.")
}var j;var h=document.createElement("canvas");var i=h.getContext("2d");h.width=g.width;
h.height=g.height;i.drawImage(g,0,0);j=i.getImageData(0,0,g.width,g.height);return j
};d.exports=a},{"./Element":21}],17:[function(d,f,c){var b=d("./Object");var a=d("./Array");
var i=d("./Function");var g=d("./Element/onDOMReady");function h(){var j=a.toArray(arguments);
var n=(typeof j[0]==="function")?j.shift():null;var m=j.shift()||{};var l;var k=function(){var o;
var p;o=((typeof this.initialize==="function"&&k.__shouldInitialize!==false)?this.initialize.apply(this,arguments):false);
if(o===h.Invalidate){p=function(){try{if(this&&this._parentClass&&this._parentClass._sharedInstance===this){this._parentClass._sharedInstance=null
}}catch(q){throw q}};window.setTimeout(p.bind(this),200)}};k.__superclass=n;if(n){if(n.__superclass){l=h(n.__superclass,n.prototype)
}else{l=h(n.prototype)}l.__shouldInitialize=false;k.prototype=new l();b.extend(k.prototype,m);
h.__wrapSuperMethods(k)}else{k.prototype=m}k.sharedInstance=function(){if(!k._sharedInstance){k._sharedInstance=new k();
k._sharedInstance._parentClass=k}return k._sharedInstance};b.synthesize(k.prototype);
k.autocreate=m.__instantiateOnDOMReady||false;delete m.__instantiateOnDOMReady;
if(k.autocreate){g(function(){if(k.autocreate){k.sharedInstance()}})}return k}h.__wrapSuperMethods=function(m){var l=m.prototype;
var k=m.__superclass.prototype;var n;for(n in l){if(l.hasOwnProperty(n)){if(typeof l[n]==="function"){var j=l[n];
var o=i.getParamNames(j);if(o[0]==="$super"){l[n]=(function(q,p){var r=k[q];return function t(){var u=a.toArray(arguments);
return p.apply(this,[r.bind(this)].concat(u))}}(n,j))}}}}return this};h.Invalidate=function(){return false
};f.exports=h},{"./Array":15,"./Element/onDOMReady":24,"./Function":34,"./Object":37}],18:[function(b,c,a){var d={};
d.isDate=function(f){return !!(f&&typeof f.getTime==="function")};c.exports=d},{}],19:[function(c,a,i){var j=c("./Array");
var h=c("./Class");var f=c("./Object");var g={autoplay:false,asynchronous:false};
var d=h({initialize:function(k){if(typeof k!=="object"){k={}}this._options=f.extend(f.clone(g),k);
this._isPlaying=false;this._isRunningAction=false;this._queue=[];this.didFinish=this.__didFinish.bind(this);
this.synthesize()},add:function(m,l){var k={};var n;if(l>0){k.delay=l}n=new d.Action(m,k);
this.queue().push(n);if(!this.isPlaying()&&this._options.autoplay===true){this.start()
}},remove:function(k){this.setQueue(j.without(this.queue(),k))},start:function(){if(this.isPlaying()){return false
}this.setIsPlaying(true);this.__runNextAction()},stop:function(){if(!this.isPlaying()){return false
}this.setIsPlaying(false)},clear:function(){this.setQueue([]);this.stop()},__didFinish:function(){this.setIsRunningAction(false);
this.__runNextAction()},__runNextAction:function(){if(!this.isPlaying()){return false
}if(this.queue().length&&!this.isRunningAction()){var k=this.queue().shift();k.run();
if(this._options.asynchronous===true){this.setIsRunningAction(true);return}this.__runNextAction()
}}});var b={delay:0};d.Action=h({initialize:function(l,k){if(typeof l!=="function"){throw new TypeError("Deferred Queue func must be a function.")
}if(typeof k!=="object"){k={}}this._options=f.extend(f.clone(b),k);this.__func=l;
this.synthesize()},run:function(){var k=this.__func;if(typeof this._options.delay==="number"&&this._options.delay>0){window.setTimeout(function(){k()
},this._options.delay*1000)}else{k()}}});a.exports=d},{"./Array":15,"./Class":17,"./Object":37}],20:[function(b,c,a){var d={linear:function(h,f,i,g){return i*h/g+f
},easeInQuad:function(h,f,i,g){return i*(h/=g)*h+f},easeOutQuad:function(h,f,i,g){return -i*(h/=g)*(h-2)+f
},easeInOutQuad:function(h,f,i,g){if((h/=g/2)<1){return i/2*h*h+f}return -i/2*((--h)*(h-2)-1)+f
},easeInCubic:function(h,f,i,g){return i*(h/=g)*h*h+f},easeOutCubic:function(h,f,i,g){return i*((h=h/g-1)*h*h+1)+f
},easeInOutCubic:function(h,f,i,g){if((h/=g/2)<1){return i/2*h*h*h+f}return i/2*((h-=2)*h*h+2)+f
},easeInQuart:function(h,f,i,g){return i*(h/=g)*h*h*h+f},easeOutQuart:function(h,f,i,g){return -i*((h=h/g-1)*h*h*h-1)+f
},easeInOutQuart:function(h,f,i,g){if((h/=g/2)<1){return i/2*h*h*h*h+f}return -i/2*((h-=2)*h*h*h-2)+f
},easeInQuint:function(h,f,i,g){return i*(h/=g)*h*h*h*h+f},easeOutQuint:function(h,f,i,g){return i*((h=h/g-1)*h*h*h*h+1)+f
},easeInOutQuint:function(h,f,i,g){if((h/=g/2)<1){return i/2*h*h*h*h*h+f}return i/2*((h-=2)*h*h*h*h+2)+f
},easeInSine:function(h,f,i,g){return -i*Math.cos(h/g*(Math.PI/2))+i+f},easeOutSine:function(h,f,i,g){return i*Math.sin(h/g*(Math.PI/2))+f
},easeInOutSine:function(h,f,i,g){return -i/2*(Math.cos(Math.PI*h/g)-1)+f},easeInExpo:function(h,f,i,g){return(h==0)?f:i*Math.pow(2,10*(h/g-1))+f
},easeOutExpo:function(h,f,i,g){return(h==g)?f+i:i*(-Math.pow(2,-10*h/g)+1)+f},easeInOutExpo:function(h,f,i,g){if(h==0){return f
}if(h==g){return f+i}if((h/=g/2)<1){return i/2*Math.pow(2,10*(h-1))+f}return i/2*(-Math.pow(2,-10*--h)+2)+f
},easeInCirc:function(h,f,i,g){return -i*(Math.sqrt(1-(h/=g)*h)-1)+f},easeOutCirc:function(h,f,i,g){return i*Math.sqrt(1-(h=h/g-1)*h)+f
},easeInOutCirc:function(h,f,i,g){if((h/=g/2)<1){return -i/2*(Math.sqrt(1-h*h)-1)+f
}return i/2*(Math.sqrt(1-(h-=2)*h)+1)+f},easeInElastic:function(j,h,l,i){var f=1.70158;
var k=0;var g=l;if(j==0){return h}if((j/=i)==1){return h+l}if(!k){k=i*0.3}if(g<Math.abs(l)){g=l;
f=k/4}else{f=k/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(j-=1))*Math.sin((j*i-f)*(2*Math.PI)/k))+h
},easeOutElastic:function(j,h,l,i){var f=1.70158;var k=0;var g=l;if(j==0){return h
}if((j/=i)==1){return h+l}if(!k){k=i*0.3}if(g<Math.abs(l)){g=l;f=k/4}else{f=k/(2*Math.PI)*Math.asin(l/g)
}return g*Math.pow(2,-10*j)*Math.sin((j*i-f)*(2*Math.PI)/k)+l+h},easeInOutElastic:function(j,h,l,i){var f=1.70158;
var k=0;var g=l;if(j==0){return h}if((j/=i/2)==2){return h+l}if(!k){k=i*(0.3*1.5)
}if(g<Math.abs(l)){g=l;f=k/4}else{f=k/(2*Math.PI)*Math.asin(l/g)}if(j<1){return -0.5*(g*Math.pow(2,10*(j-=1))*Math.sin((j*i-f)*(2*Math.PI)/k))+h
}return g*Math.pow(2,-10*(j-=1))*Math.sin((j*i-f)*(2*Math.PI)/k)*0.5+l+h},easeInBack:function(i,g,j,h,f){if(f==undefined){f=1.70158
}return j*(i/=h)*i*((f+1)*i-f)+g},easeOutBack:function(i,g,j,h,f){if(f==undefined){f=1.70158
}return j*((i=i/h-1)*i*((f+1)*i+f)+1)+g},easeInOutBack:function(i,g,j,h,f){if(f==undefined){f=1.70158
}if((i/=h/2)<1){return j/2*(i*i*(((f*=(1.525))+1)*i-f))+g}return j/2*((i-=2)*i*(((f*=(1.525))+1)*i+f)+2)+g
},easeInBounce:function(h,f,i,g){return i-d.easeOutBounce(g-h,0,i,g)+f},easeOutBounce:function(h,f,i,g){if((h/=g)<(1/2.75)){return i*(7.5625*h*h)+f
}else{if(h<(2/2.75)){return i*(7.5625*(h-=(1.5/2.75))*h+0.75)+f}else{if(h<(2.5/2.75)){return i*(7.5625*(h-=(2.25/2.75))*h+0.9375)+f
}else{return i*(7.5625*(h-=(2.625/2.75))*h+0.984375)+f}}}},easeInOutBounce:function(h,f,i,g){if(h<g/2){return d.easeInBounce(h*2,0,i,g)*0.5+f
}return d.easeOutBounce(h*2-g,0,i,g)*0.5+i*0.5+f}};d.ease=function(h,g){if(g==="ease"){g="easeInOutSine"
}else{if(g==="ease-in"){g="easeInCubic"}else{if(g==="ease-out"){g="easeOutCubic"
}else{if(g==="ease-in-out"){g="easeInOutCubic"}else{if(g==="linear"){g="linear"
}else{if(g==="step-start"){return(h===0)?0:1}else{if(g==="step-end"){return(h===1)?1:0
}else{if(typeof g==="string"&&/^steps\(\d+\,\s*(start|end)\)$/.test(g)){var f=parseInt(g.match(/\d+/)[0]);
var i=g.match(/(start|end)/)[0];var j=(1/f);return Math[(i==="start")?"floor":"ceil"]((h/j))*j
}}}}}}}}if(typeof g==="string"){if(typeof d[g]==="function"&&g!=="ease"){g=d[g]
}else{throw new TypeError('"'+g+'" is not a valid easing type')}}return g(h,0,1,1)
};c.exports=d},{}],21:[function(c,a,d){var h=c("./Viewport");var i=c("./log");var k=c("./Element/events");
var l=c("./Element/vendorTransformHelper");var b=c("./Environment/Browser");var g={addEventListener:k.addEventListener,removeEventListener:k.removeEventListener,addVendorPrefixEventListener:k.addVendorPrefixEventListener,removeVendorPrefixEventListener:k.removeVendorPrefixEventListener,addVendorEventListener:function(n,o,p,m){i("ac-base.Element.addVendorEventListener is deprecated. Please use ac-base.Element.addVendorPrefixEventListener.");
return this.addVendorPrefixEventListener(n,o,p,m)},removeVendorEventListener:function(n,o,p,m){i("ac-base.Element.removeVendorEventListener is deprecated. Please use ac-base.Element.removeVendorPrefixEventListener.");
return this.removeVendorPrefixEventListener(n,o,p,m)}};c("./Element/EventDelegate")(g);
g.getElementById=function(m){if(typeof m==="string"){m=document.getElementById(m)
}if(g.isElement(m)){return m}else{return null}};g.selectAll=function(m,n){if(typeof n==="undefined"){n=document
}else{if(!g.isElement(n)&&n.nodeType!==9&&n.nodeType!==11){throw new TypeError("ac-base.Element.selectAll: Invalid context nodeType")
}}if(typeof m!=="string"){throw new TypeError("ac-base.Element.selectAll: Selector must be a string")
}return Array.prototype.slice.call(n.querySelectorAll(m))};g.select=function(m,n){if(typeof n==="undefined"){n=document
}else{if(!g.isElement(n)&&n.nodeType!==9&&n.nodeType!==11){throw new TypeError("ac-base.Element.select: Invalid context nodeType")
}}if(typeof m!=="string"){throw new TypeError("ac-base.Element.select: Selector must be a string")
}return n.querySelector(m)};var f=window.Element?(function(m){return m.matches||m.matchesSelector||m.webkitMatchesSelector||m.mozMatchesSelector||m.msMatchesSelector||m.oMatchesSelector
}(Element.prototype)):null;g.matchesSelector=function(n,m){return g.isElement(n)?f.call(n,m):false
};g.matches=function(n,m){i("ac-base.Element.matches is deprecated. Use ac-base.Element.filterBySelector instead.");
return g.filterBySelector(m,n)};g.filterBySelector=function(q,n){var m=[];for(var p=0,o=q.length;
p<o;p++){if(g.isElement(q[p])&&f.call(q[p],n)){m[m.length]=q[p]}}return m};g.setOpacity=function(m,n){i("ac-base.Element.setOpacity is deprecated. Use ac-base.Element.setStyle instead.");
return g.setStyle(m,{opacity:n})};g.setStyle=function(n,o){if((typeof o!=="string"&&typeof o!=="object")||Array.isArray(o)){throw new TypeError("styles argument must be either an object or a string")
}n=g.getElementById(n);var m;var p;var q;m=g.setStyle.__explodeStyleStringToObject(o);
for(q in m){if(m.hasOwnProperty(q)){p=q.replace(/-(\w)/g,g.setStyle.__camelCaseReplace);
g.setStyle.__setStyle(n,p,m,m[q])}}return n};g.setStyle.__explodeStyleStringToObject=function(q){var o=(typeof q==="object")?q:{};
var r;var p;var m;var n;if(typeof q==="string"){r=q.split(";");m=r.length;for(n=0;
n<m;n+=1){p=r[n].indexOf(":");if(p>0){o[r[n].substr(0,p).trim()]=r[n].substr(p+1).trim()
}}}return o};g.setStyle.__setStyle=function(o,p,n,m){if(typeof o.style[p]!=="undefined"){o.style[p]=m
}};g.setStyle.__camelCaseReplace=function(n,o,p,m){return(p===0)&&(m.substr(1,3)!=="moz")?o:o.toUpperCase()
};g.getStyle=function(n,o,m){var p;o=o.replace(/-(\w)/g,g.setStyle.__camelCaseReplace);
n=g.getElementById(n);o=(o==="float")?"cssFloat":o;m=m||window.getComputedStyle(n,null);
p=m?m[o]:null;if(o==="opacity"){return p?parseFloat(p):1}return p==="auto"?null:p
};g.cumulativeOffset=function(n){var o=g.getBoundingBox(n);var m=h.scrollOffsets();
var p=[o.top+m.y,o.left+m.x];p.top=p[0];p.left=p[1];return p};g.getBoundingBox=function(n){n=g.getElementById(n);
var p=n.getBoundingClientRect();var m=p.width||p.right-p.left;var o=p.height||p.bottom-p.top;
return{top:p.top,right:p.right,bottom:p.bottom,left:p.left,width:m,height:o}};g.getInnerDimensions=function(p){var t=g.getBoundingBox(p);
var m=t.width;var r=t.height;var q;var n;var o=window.getComputedStyle?window.getComputedStyle(p,null):null;
["padding","border"].forEach(function(u){["Top","Right","Bottom","Left"].forEach(function(v){q=u==="border"?u+v+"Width":u+v;
n=parseFloat(g.getStyle(p,q,o));n=isNaN(n)?0:n;if(v==="Right"||v==="Left"){m-=n
}if(v==="Top"||v==="Bottom"){r-=n}})});return{width:m,height:r}};g.getOuterDimensions=function(o){var r=g.getBoundingBox(o);
var m=r.width;var p=r.height;var q;var n=window.getComputedStyle?window.getComputedStyle(o,null):null;
["margin"].forEach(function(t){["Top","Right","Bottom","Left"].forEach(function(u){q=parseFloat(g.getStyle(o,t+u,n));
q=isNaN(q)?0:q;if(u==="Right"||u==="Left"){m+=q}if(u==="Top"||u==="Bottom"){p+=q
}})});return{width:m,height:p}};g.hasClassName=function(o,n){var m=g.getElementById(o);
if(m&&m.className!==""){return new RegExp("(\\s|^)"+n+"(\\s|$)").test(m.className)
}else{return false}};g.addClassName=function(o,n){var m=g.getElementById(o);if(m.classList){m.classList.add(n)
}else{if(!g.hasClassName(m,n)){m.className+=" "+n}}};g.removeClassName=function(o,n){var m=g.getElementById(o);
if(g.hasClassName(m,n)){var p=new RegExp("(\\s|^)"+n+"(\\s|$)");m.className=m.className.replace(p,"$1").trim()
}};g.toggleClassName=function(o,n){var m=g.getElementById(o);if(m.classList){m.classList.toggle(n)
}else{if(g.hasClassName(m,n)){g.removeClassName(m,n)}else{g.addClassName(m,n)}}};
g.isElement=function(m){return !!(m&&m.nodeType===1)};g.setVendorPrefixStyle=function(m,p,o){if(typeof p!=="string"){throw new TypeError("ac-base.Element.setVendorPrefixStyle: property must be a string")
}if(typeof o!=="string"&&typeof o!=="number"){throw new TypeError("ac-base.Element.setVendorPrefixStyle: value must be a string or a number")
}o+="";m=g.getElementById(m);var n=["","webkit","Moz","ms","O"];var r;var q;p=p.replace(/-(webkit|moz|ms|o)-/i,"");
p=p.replace(/^(webkit|Moz|ms|O)/,"");p=p.charAt(0).toLowerCase()+p.slice(1);p=p.replace(/-(\w)/,function(t,u){return u.toUpperCase()
});o=o.replace(/-(webkit|moz|ms|o)-/,"-vendor-");n.forEach(function(t){r=(t==="")?p:t+p.charAt(0).toUpperCase()+p.slice(1);
q=(t==="")?o.replace("-vendor-",""):o.replace("-vendor-","-"+t.charAt(0).toLowerCase()+t.slice(1)+"-");
if(r in m.style){g.setStyle(m,r+":"+q)}})};g.getVendorPrefixStyle=function(m,p){if(typeof p!=="string"){throw new TypeError("ac-base.Element.getVendorPrefixStyle: property must be a string")
}m=g.getElementById(m);var o=["","webkit","Moz","ms","O"];var n;p=p.replace(/-(webkit|moz|ms|o)-/i,"");
p=p.replace(/^(webkit|Moz|ms|O)/,"").charAt(0).toLowerCase()+p.slice(1);p=p.replace(/-(\w)/,function(q,r){return r.toUpperCase()
});o.some(function(r,q){var t=(r==="")?p:r+p.charAt(0).toUpperCase()+p.slice(1);
if(t in m.style){n=g.getStyle(m,t);return true}});return n};g.insert=function(n,o,m){if(!n||!(n.nodeType===1||n.nodeType===3||n.nodeType===11)){throw new TypeError("ac-base.Element.insert: element must be a valid node of type element, text, or document fragment")
}if(!o||!(o.nodeType===1||o.nodeType===11)){throw new TypeError("ac-base.Element.insert: target must be a valid node of type element or document fragment")
}switch(m){case"before":if(o.nodeType===11){throw new TypeError("ac-base.Element.insert: target cannot be nodeType of documentFragment when using placement ‘before’")
}o.parentNode.insertBefore(n,o);break;case"after":if(o.nodeType===11){throw new TypeError("ac-base.Element.insert: target cannot be nodeType of documentFragment when using placement ‘after’")
}o.parentNode.insertBefore(n,o.nextSibling);break;case"first":o.insertBefore(n,o.firstChild);
break;default:o.appendChild(n)}};g.insertAt=function(q,r,n){var p;var m;var o;q=g.getElementById(q);
r=g.getElementById(r);if(!g.isElement(q)||!g.isElement(r)){throw new TypeError("ac-base.Element.insertAt: element must be a valid DOM element")
}p=g.children(r);if(n<0&&p.length){n+=p.length}if(r.contains(q)&&n>p.indexOf(q)){n++
}if(p&&n<=p.length-1){for(o=0,m=p.length;o<m;o++){if(o===n){r.insertBefore(q,p[o]);
break}}}else{r.appendChild(q)}};g.children=function(o){var p,q;o=g.getElementById(o);
if(!g.isElement(o)){throw new TypeError("ac-base.Element.children: element must be a valid DOM element")
}if(o.children){p=[];for(var n=0,m=o.children.length;n<m;n++){q=o.children[n];if(q&&q.nodeType===1){p.push(q)
}}}return p.length?p:null};g.remove=function(m,o){if(!g.isElement(m)){throw new TypeError("ac-base.Element.remove: element must be a valid DOM element")
}if(o===true){var n=m.parentNode.removeChild(m);return n}else{m.parentNode.removeChild(m)
}};g.viewportOffset=function(m){var n=g.getBoundingBox(m);return{x:n.left,y:n.top}
};g.pixelsInViewport=function(o,n){var p;if(!g.isElement(o)){throw new TypeError("ac-base.Element.pixelsInViewport : element must be a valid DOM element")
}var q=h.dimensions();n=n||g.getBoundingBox(o);var m=n.top;if(m>=0){p=q.height-m;
if(p>n.height){p=n.height}}else{p=n.height+m}if(p<0){p=0}if(p>q.height){p=q.height
}return p};g.percentInViewport=function(n){var m=g.getBoundingBox(n);var o=g.pixelsInViewport(n,m);
return o/m.height};g.isInViewport=function(n,o){if(typeof o!=="number"||1<o||o<0){o=0
}var m=g.percentInViewport(n);return(m>o||m===1)};var j=function(n,o){n=g.getElementById(n);
var m=n.parentNode;while(m&&g.isElement(m)){if(typeof o==="function"){if(o(m)===false){break
}}if(m!==document.body){m=m.parentNode}else{m=null}}};g.ancestors=function(m,n){var o=[];
j(m,function(p){if(n===undefined||g.matchesSelector(p,n)){o.push(p)}});return o
};g.ancestor=function(n,o){n=g.getElementById(n);var m=null;if(n!==null&&o===undefined){return n.parentNode
}j(n,function(p){if(g.matchesSelector(p,o)){m=p;return false}});return m};g.setVendorPrefixTransform=function(m,n){if((typeof n!=="string"&&typeof n!=="object")||Array.isArray(n)||n===null){throw new TypeError("ac-base.Element.setVendorPrefixTransform: transformFunctions argument must be either an object or a string")
}g.setVendorPrefixStyle(m,"transform",l.convert2dFunctions(n))};if(b.name==="IE"){c("./shims/ie/Element")(g,b)
}a.exports=g},{"./Element/EventDelegate":22,"./Element/events":23,"./Element/vendorTransformHelper":26,"./Environment/Browser":28,"./Viewport":43,"./log":47,"./shims/ie/Element":52}],22:[function(b,c,a){c.exports=function(f){function d(h,g){this.element=h;
this.options=g||{}}d.prototype={__findMatchingTarget:function(h){var g=null;if(f.matchesSelector(h,this.options.selector)){g=h
}else{g=f.ancestor(h,this.options.selector)}return g},__generateDelegateMethod:function(){var g=this;
var h=g.options.handler;return function(i){var l=i.target||i.srcElement;var k=g.__findMatchingTarget(l);
var j;if(k!==null){j=new d.Event(i);j.setTarget(k);h(j)}}},attachEventListener:function(){this.__delegateMethod=this.__generateDelegateMethod();
f.addEventListener(this.element,this.options.eventType,this.__delegateMethod);return this.__delegateMethod
},unbind:function(){f.removeEventListener(this.element,this.options.eventType,this.__delegateMethod);
this.__delegateMethod=undefined}};d.instances=[];d.filterInstances=function(g){var h=[];
d.instances.forEach(function(i){if(g(i)===true){h.push(i)}});return h};d.Event=function(g){this.originalEvent=g
};d.Event.prototype.setTarget=function(g){this.target=g;this.currentTarget=g};f.addEventDelegate=function(j,i,h,k){var g=new f.__EventDelegate(j,{eventType:i,selector:h,handler:k});
d.instances.push(g);return g.attachEventListener()};f.removeEventDelegate=function(j,i,h,k){var g=f.__EventDelegate.filterInstances(function(l){var m=l.options;
return l.element===j&&m.selector===h&&m.eventType===i&&m.handler===k});g.forEach(function(l){l.unbind()
})};f.__EventDelegate=d}},{}],23:[function(b,d,a){var c={};c.addEventListener=function(i,g,h,f){if(i.addEventListener){i.addEventListener(g,h,f)
}else{if(i.attachEvent){i.attachEvent("on"+g,h)}else{i["on"+g]=h}}return i};c.dispatchEvent=function(g,f){if(document.createEvent){g.dispatchEvent(new CustomEvent(f))
}else{g.fireEvent("on"+f,document.createEventObject())}return g};c.removeEventListener=function(i,g,h,f){if(i.removeEventListener){i.removeEventListener(g,h,f)
}else{i.detachEvent("on"+g,h)}return i};c.addVendorPrefixEventListener=function(g,h,i,f){if(h.match(/^webkit/i)){h=h.replace(/^webkit/i,"")
}else{if(h.match(/^moz/i)){h=h.replace(/^moz/i,"")}else{if(h.match(/^ms/i)){h=h.replace(/^ms/i,"")
}else{if(h.match(/^o/i)){h=h.replace(/^o/i,"")}else{h=h.charAt(0).toUpperCase()+h.slice(1)
}}}}if(/WebKit/i.test(window.navigator.userAgent)){return c.addEventListener(g,"webkit"+h,i,f)
}else{if(/Opera/i.test(window.navigator.userAgent)){return c.addEventListener(g,"O"+h,i,f)
}else{if(/Gecko/i.test(window.navigator.userAgent)){return c.addEventListener(g,h.toLowerCase(),i,f)
}else{h=h.charAt(0).toLowerCase()+h.slice(1);return c.addEventListener(g,h,i,f)
}}}};c.removeVendorPrefixEventListener=function(g,h,i,f){if(h.match(/^webkit/i)){h=h.replace(/^webkit/i,"")
}else{if(h.match(/^moz/i)){h=h.replace(/^moz/i,"")}else{if(h.match(/^ms/i)){h=h.replace(/^ms/i,"")
}else{if(h.match(/^o/i)){h=h.replace(/^o/i,"")}else{h=h.charAt(0).toUpperCase()+h.slice(1)
}}}}c.removeEventListener(g,"webkit"+h,i,f);c.removeEventListener(g,"O"+h,i,f);
c.removeEventListener(g,h.toLowerCase(),i,f);h=h.charAt(0).toLowerCase()+h.slice(1);
return c.removeEventListener(g,h,i,f)};d.exports=c},{}],24:[function(c,a,d){var f=c("../globals");
var k=c("./events");var b;var g;function h(m){var o=f.document;var n=f.window;if(m.type==="readystatechange"&&o.readyState!=="complete"){return
}var l=g.length;while(l--){g.shift().call(n,m.type||m)}k.removeEventListener(o,"DOMContentLoaded",h,false);
k.removeEventListener(o,"readystatechange",h,false);k.removeEventListener(n,"load",h,false);
clearTimeout(b)}function i(){try{f.document.documentElement.doScroll("left")}catch(l){b=setTimeout(i,50);
return}h("poll")}a.exports=function j(o){var n=f.document;var m=f.window;if(n.readyState==="complete"){o.call(m,"lazy")
}else{if(!g||!g.length){g=[];k.addEventListener(n,"DOMContentLoaded",h,false);k.addEventListener(n,"readystatechange",h,false);
k.addEventListener(m,"load",h,false);if(n.createEventObject&&n.documentElement.doScroll){try{if(!m.frameElement){i()
}}catch(l){}}}g.push(o)}}},{"../globals":46,"./events":23}],25:[function(d,g,b){var i=d("../globals");
var f=d("./events");var a;function h(){var j=a.length;while(j--){a.shift()()}f.removeEventListener(i.window,"load",h)
}g.exports=function c(j){if(i.document.readyState==="complete"){j()}else{if(!a){a=[];
f.addEventListener(i.window,"load",h)}a.push(j)}}},{"../globals":46,"./events":23}],26:[function(c,d,b){var a={__objectifiedFunctions:{},__paramMaps:{translate:"p1, p2, 0",translateX:"p1, 0, 0",translateY:"0, p1, 0",scale:"p1, p2, 1",scaleX:"p1, 1, 1",scaleY:"1, p1, 1",rotate:"0, 0, 1, p1",matrix:"p1, p2, 0, 0, p3, p4, 0, 0, 0, 0, 1, 0, p5, p6, 0, 1"},convert2dFunctions:function(g){var f;
this.__init(g);for(var h in this.__objectifiedFunctions){if(this.__objectifiedFunctions.hasOwnProperty(h)){f=this.__objectifiedFunctions[h].replace(" ","").split(",");
if(h in this.__paramMaps){for(var i in this.__paramMaps){if(h===i){this.valuesToSet.push(this.__stripFunctionAxis(h)+"3d("+this.__map2DTransformParams(f,this.__paramMaps[h])+")")
}}}else{this.valuesToSet.push(h+"("+this.__objectifiedFunctions[h]+")")}}}return this.valuesToSet.join(" ")
},__init:function(f){this.valuesToSet=[];this.__objectifiedFunctions=(typeof f==="object")?f:{};
if(typeof f==="string"){this.__objectifiedFunctions=this.__objectifyFunctionString(f)
}},__map2DTransformParams:function(f,g){f.forEach(function(j,h){g=g.replace("p"+(h+1),j)
});return g},__splitFunctionStringToArray:function(f){return f.match(/[\w]+\(.+?\)/g)
},__splitFunctionNameAndParams:function(f){return f.match(/(.*)\((.*)\)/)},__stripFunctionAxis:function(f){return f.match(/([a-z]+)(|X|Y)$/)[1]
},__objectifyFunctionString:function(f){var g=this;var h;this.__splitFunctionStringToArray(f).forEach(function(i){h=g.__splitFunctionNameAndParams(i);
g.__objectifiedFunctions[h[1]]=h[2]});return this.__objectifiedFunctions}};d.exports=a
},{}],27:[function(b,c,a){var d={Browser:b("./Environment/Browser"),Feature:b("./Environment/Feature")};
c.exports=d},{"./Environment/Browser":28,"./Environment/Feature":31}],28:[function(b,c,a){var d=b("./Browser/BrowserData");
var f=d.create();f.isWebKit=function(g){var h=g||window.navigator.userAgent;return h?!!h.match(/applewebkit/i):false
};f.lowerCaseUserAgent=navigator.userAgent.toLowerCase();if(f.name==="IE"){b("../shims/ie/Environment/Browser")(f)
}c.exports=f},{"../shims/ie/Environment/Browser":53,"./Browser/BrowserData":29}],29:[function(c,d,b){var f=c("./data");
var a=c("../../RegExp");function g(){}g.prototype={__getBrowserVersion:function(i,j){if(!i||!j){return
}var l=f.browser.filter(function(m){return m.identity===j})[0];var h=l.versionSearch||j;
var k=i.indexOf(h);if(k>-1){return parseFloat(i.substring(k+h.length+1))}},__getName:function(h){return this.__getIdentityStringFromArray(h)
},__getIdentity:function(h){if(h.string){return this.__matchSubString(h)}else{if(h.prop){return h.identity
}}},__getIdentityStringFromArray:function(h){for(var m=0,j=h.length,k;m<j;m++){k=this.__getIdentity(h[m]);
if(k){return k}}},__getOS:function(h){return this.__getIdentityStringFromArray(h)
},__getOSVersion:function(j,m){if(!j||!m){return}var l=f.os.filter(function(n){return n.identity===m
})[0];var h=l.versionSearch||m;var k=new RegExp(h+" ([\\d_\\.]+)","i");var i=j.match(k);
if(i!==null){return i[1].replace(/_/g,".")}},__matchSubString:function(i){var h=i.subString;
var j;if(h){j=a.isRegExp(h)&&!!i.string.match(h);if(j||i.string.indexOf(h)>-1){return i.identity
}}}};g.create=function(){var h=new g();var i={};i.name=h.__getName(f.browser);i.version=h.__getBrowserVersion(f.versionString,i.name);
i.os=h.__getOS(f.os);i.osVersion=h.__getOSVersion(f.versionString,i.os);return i
};d.exports=g},{"../../RegExp":38,"./data":30}],30:[function(b,c,a){c.exports={browser:[{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],31:[function(d,f,c){var g=d("../log");var b={localStorageAvailable:d("./Feature/localStorageAvailable")};
var a=Object.prototype.hasOwnProperty;(function(){var j=null;var k=null;var h=null;
var i=null;b.isCSSAvailable=function(l){g("ac-base.Environment.Feature.isCSSAvailable is deprecated. Please use ac-base.Environment.Feature.cssPropertyAvailable instead.");
return this.cssPropertyAvailable(l)};b.cssPropertyAvailable=function(u){if(j===null){j=document.createElement("browserdetect").style
}if(k===null){k=["-webkit-","-moz-","-o-","-ms-","-khtml-",""]}if(h===null){h=["Webkit","Moz","O","ms","Khtml",""]
}if(i===null){i={}}u=u.replace(/([A-Z]+)([A-Z][a-z])/g,"$1\\-$2").replace(/([a-z\d])([A-Z])/g,"$1\\-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(u){case"gradient":if(i.gradient!==undefined){return i.gradient}u="background-image:";
var r="gradient(linear,left top,right bottom,from(#9f9),to(white));";var q="linear-gradient(left top,#9f9, white);";
j.cssText=(u+k.join(r+u)+k.join(q+u)).slice(0,-u.length);i.gradient=(j.backgroundImage.indexOf("gradient")!==-1);
return i.gradient;case"inset-box-shadow":if(i["inset-box-shadow"]!==undefined){return i["inset-box-shadow"]
}u="box-shadow:";var t="#fff 0 1px 1px inset;";j.cssText=k.join(u+t);i["inset-box-shadow"]=(j.cssText.indexOf("inset")!==-1);
return i["inset-box-shadow"];default:var p=u.split("-");var l=p.length;var o;var n;
var m;if(p.length>0){u=p[0];for(n=1;n<l;n+=1){u+=p[n].substr(0,1).toUpperCase()+p[n].substr(1)
}}o=u.substr(0,1).toUpperCase()+u.substr(1);if(i[u]!==undefined){return i[u]}for(m=h.length-1;
m>=0;m-=1){if(j[h[m]+u]!==undefined||j[h[m]+o]!==undefined){i[u]=true;return true
}}return false}}}());b.supportsThreeD=function(){g("ac-base.Environment.Feature.supportsThreeD is deprecated. Please use ac-base.Environment.Feature.threeDTransformsAvailable instead.");
return this.threeDTransformsAvailable()};b.threeDTransformsAvailable=function(){if(typeof this._threeDTransformsAvailable!=="undefined"){return this._threeDTransformsAvailable
}var j,h;try{this._threeDTransformsAvailable=false;if(a.call(window,"styleMedia")){this._threeDTransformsAvailable=window.styleMedia.matchMedium("(-webkit-transform-3d)")
}else{if(a.call(window,"media")){this._threeDTransformsAvailable=window.media.matchMedium("(-webkit-transform-3d)")
}}if(!this._threeDTransformsAvailable){if(!(h=document.getElementById("supportsThreeDStyle"))){h=document.createElement("style");
h.id="supportsThreeDStyle";h.textContent="@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
document.querySelector("head").appendChild(h)}if(!(j=document.querySelector("#supportsThreeD"))){j=document.createElement("div");
j.id="supportsThreeD";document.body.appendChild(j)}this._threeDTransformsAvailable=(j.offsetHeight===3)||h.style.MozTransform!==undefined||h.style.WebkitTransform!==undefined
}return this._threeDTransformsAvailable}catch(i){return false}};b.supportsCanvas=function(){g("ac-base.Environment.Feature.supportsCanvas is deprecated. Please use ac-base.Environment.Feature.canvasAvailable instead.");
return this.canvasAvailable()};b.canvasAvailable=function(){if(typeof this._canvasAvailable!=="undefined"){return this._canvasAvailable
}var h=document.createElement("canvas");this._canvasAvailable=!!(typeof h.getContext==="function"&&h.getContext("2d"));
return this._canvasAvailable};b.sessionStorageAvailable=function(){if(typeof this._sessionStorageAvailable!=="undefined"){return this._sessionStorageAvailable
}try{if(typeof window.sessionStorage!=="undefined"&&typeof window.sessionStorage.setItem==="function"){window.sessionStorage.setItem("ac_browser_detect","test");
this._sessionStorageAvailable=true;window.sessionStorage.removeItem("ac_browser_detect","test")
}else{this._sessionStorageAvailable=false}}catch(h){this._sessionStorageAvailable=false
}return this._sessionStorageAvailable};b.cookiesAvailable=function(){if(typeof this._cookiesAvailable!=="undefined"){return this._cookiesAvailable
}this._cookiesAvailable=(a.call(document,"cookie")&&!!navigator.cookieEnabled)?true:false;
return this._cookiesAvailable};b.__normalizedScreenWidth=function(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?window.screen.width:window.screen.height
};b.touchAvailable=function(){return !!(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch)
};b.isDesktop=function(){if(!this.touchAvailable()&&!window.orientation){return true
}return false};b.isHandheld=function(){return !this.isDesktop()&&!this.isTablet()
};b.isTablet=function(){return !this.isDesktop()&&this.__normalizedScreenWidth()>480
};b.isRetina=function(){var h=["min-device-pixel-ratio:1.5","-webkit-min-device-pixel-ratio:1.5","min-resolution:1.5dppx","min-resolution:144dpi","min--moz-device-pixel-ratio:1.5"];
var j;if(window.devicePixelRatio!==undefined){if(window.devicePixelRatio>=1.5){return true
}}else{for(j=0;j<h.length;j+=1){if(window.matchMedia("("+h[j]+")").matches===true){return true
}}}return false};b.svgAvailable=function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
};f.exports=b},{"../log":47,"./Feature/localStorageAvailable":32}],32:[function(d,f,b){var a=null;
f.exports=function c(){if(a===null){a=!!(window.localStorage&&window.localStorage.non_existent!==null)
}return a}},{}],33:[function(b,c,a){var d={};d.stop=function(f){if(!f){f=window.event
}if(f.stopPropagation){f.stopPropagation()}else{f.cancelBubble=true}if(f.preventDefault){f.preventDefault()
}f.stopped=true;f.returnValue=false};d.target=function(f){return(typeof f.target!=="undefined")?f.target:f.srcElement
};d.Keys={UP:38,DOWN:40,LEFT:37,RIGHT:39,ESC:27,SPACE:32,BACKSPACE:8,DELETE:46,END:35,HOME:36,PAGEDOWN:34,PAGEUP:33,RETURN:13,TAB:9};
c.exports=d},{}],34:[function(c,d,b){var a=c("./Array");var f={};f.emptyFunction=function(){};
f.bindAsEventListener=function(g,i){var h=a.toArray(arguments).slice(2);return function(j){return g.apply(i,[j||window.event].concat(h))
}};f.getParamNames=function(h){var g=h.toString();return g.slice(g.indexOf("(")+1,g.indexOf(")")).match(/([^\s,]+)/g)||[]
};f.iterateFramesOverAnimationDuration=function(m,l,j){var k=0;var g;var h;var i;
l=l*1000;h=function(n){i=i||n;k=l?Math.min(Math.max(0,(n-i)/l),1):1;m(k);if(k<1){g=window.requestAnimationFrame(h)
}else{window.cancelAnimationFrame(g);if(typeof j==="function"){j()}}};g=window.requestAnimationFrame(h)
};d.exports=f},{"./Array":15}],35:[function(c,f,b){var h=c("./NotificationCenter");
var g=c("./Class");var a=c("./Object");var i=c("./Element");var d={};d.HashChange=g({initialize:function(j){this._boundEventHandler=null;
this._notificationString=j||"ac-history-hashchange";this.synthesize()},__eventHandler:function(j){var k=new d.HashChange.Event(j);
h.publish(this.notificationString(),{data:k},false)},__bindWindowEvent:function(){this.setBoundEventHandler(this.__eventHandler.bind(this));
i.addEventListener(window,"hashchange",this.boundEventHandler())},__unbindWindowEvent:function(){i.removeEventListener(window,"hashchange",this.boundEventHandler());
this.setBoundEventHandler(null)},subscribe:function(j){if(this.boundEventHandler()===null){this.__bindWindowEvent()
}h.subscribe(this.notificationString(),j)},unsubscribe:function(j){h.unsubscribe(this.notificationString(),j);
if(!h.hasSubscribers(this.notificationString())){this.__unbindWindowEvent()}}});
d.HashChange.Event=g({initialize:function(j){this.event=j;a.extend(this,j);if(this.hasOwnProperty("oldURL")&&this.oldURL.match("#")){this.oldHash=this.oldURL.split("#")[1]
}if(this.hasOwnProperty("newURL")&&this.newURL.match("#")){this.newHash=this.newURL.split("#")[1]
}}});f.exports=d},{"./Class":17,"./Element":21,"./NotificationCenter":36,"./Object":37}],36:[function(b,c,a){var d={};
c.exports={publish:function(i,g,f){g=g||{};var h=function(){if((!d[i])||d[i].length<1){return
}d[i].forEach(function(j){if(typeof j!=="undefined"){if(j.target&&g.target){if(j.target===g.target){j.callback(g.data)
}}else{j.callback(g.data)}}})};if(f===true){window.setTimeout(h,10)}else{h()}},subscribe:function(f,h,g){if(!d[f]){d[f]=[]
}d[f].push({callback:h,target:g})},unsubscribe:function(g,i,h){var f=d[g].slice(0);
d[g].forEach(function(k,j){if(typeof k!=="undefined"){if(h){if(i===k.callback&&k.target===h){f.splice(j,1)
}}else{if(i===k.callback){f.splice(j,1)}}}});d[g]=f},hasSubscribers:function(h,j){if((!d[h])||d[h].length<1){return false
}if(!j){return true}var f=d[h].length;var g;while(f--){g=d[h][f];if(g.target&&j){if(g.target===j){return true
}}}return false}}},{}],37:[function(b,a,f){var g=b("./Synthesize");var j=b("qs");
var d={};var c=Object.prototype.hasOwnProperty;d.extend=function h(){var m;var l;
if(arguments.length<2){m=[{},arguments[0]]}else{m=[].slice.call(arguments)}l=m.shift();
m.forEach(function(o){for(var n in o){if(c.call(o,n)){l[n]=o[n]}}});return l};d.clone=function i(l){return d.extend({},l)
};if(Object.getPrototypeOf){d.getPrototypeOf=Object.getPrototypeOf}else{if(typeof this.__proto__==="object"){d.getPrototypeOf=function k(l){return l.__proto__
}}else{d.getPrototypeOf=function k(n){var l=n.constructor;var m;if(c.call(n,"constructor")){m=l;
if(!(delete n.constructor)){return null}l=n.constructor;n.constructor=m}return l?l.prototype:null
}}}d.toQueryParameters=function(l){if(typeof l!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return j.stringify(l)};d.isEmpty=function(l){var m;if(typeof l!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(m in l){if(c.call(l,m)){return false}}return true};d.synthesize=function(l){if(typeof l==="object"){d.extend(l,d.clone(g));
l.synthesize();return l}else{throw new TypeError("Argument supplied was not a valid object.")
}};a.exports=d},{"./Synthesize":42,qs:8}],38:[function(c,d,b){var a={};a.isRegExp=function(f){return window.RegExp?f instanceof RegExp:false
};d.exports=a},{}],39:[function(d,f,c){var g=d("./Class");var b=d("./Object");var h=d("./Element");
var a=g();a.Component=d("./Registry/Component");a.prototype={__defaultOptions:{contextInherits:[],matchCatchAll:false},initialize:function(j,i){if(typeof j!=="string"){throw new Error("Prefix not defined for Component Registry")
}if(typeof i!=="object"){i={}}this._options=b.extend(b.clone(this.__defaultOptions),i);
this._prefix=j;this._reservedNames=[];this.__model=[];this.__lookup={};b.synthesize(this)
},addComponent:function(j,l,n,o,k){var m=null;var i;if(!this.__isReserved(j)){if(typeof j==="string"){if(typeof o==="string"){m=this.lookup(o)
}if(!m&&j!=="_base"){m=this.lookup("_base")||this.addComponent("_base")}if(this.lookup(j)){throw new Error("Cannot overwrite existing Component: "+j)
}if(typeof k!=="object"){k={}}if(typeof k.inherits==="undefined"&&Array.isArray(this._options.contextInherits)){k.inherits=this._options.contextInherits
}i=this.__lookup[j]=new a.Component(j,l,n,m,k);this.__addToModel(i);return i}}return null
},match:function(j){var i;if(i=this.__matchName(j)){return i}if(i=this.__matchQualifier(j)){return i
}if(this.options().matchCatchAll===true){if(typeof this.__model[1]!=="undefined"){if(typeof this.__model[1][0]!=="undefined"){return this.__model[1][0]
}else{throw new Error("Catchall Type not defined")}}else{throw new Error("No non-_base types defined at index 1.")
}}return null},__matchName:function(k){if(!h.isElement(k)){return null}var j,l;
for(j=this.__model.length-1;j>=0;j--){if(Array.isArray(this.__model[j])){for(l=this.__model[j].length-1;
l>=0;l--){if(h.hasClassName(k,this._prefix+this.__model[j][l].name())){return this.__model[j][l]
}}}}return null},__matchQualifier:function(k){if(!h.isElement(k)){return null}var j,l;
for(j=this.__model.length-1;j>=0;j--){if(Array.isArray(this.__model[j])){for(l=this.__model[j].length-1;
l>=0;l--){if(typeof this.__model[j][l].qualifier==="function"){if(this.__model[j][l].qualifier.apply(this.__model[j][l],[k,this._prefix])===true){return this.__model[j][l]
}}}}}return null},__addToModel:function(i){if(a.Component.isComponent(i)){if(typeof this.__model[i.level()]==="undefined"){this.__model[i.level()]=[]
}this.__model[i.level()].push(i)}},lookup:function(i){if(typeof i==="string"){if(typeof this.__lookup[i]!=="undefined"){return this.__lookup[i]
}}return null},hasComponent:function(i){var j;if(typeof i==="object"&&typeof i.name==="function"){if(j=this.lookup(i.name())){return j===i
}}return false},reserveName:function(i){if(typeof i==="string"){if(this.lookup(i)!==null){throw new Error("Cannot reserve name: Component with name already exists.")
}else{if(!this.__isReserved(i)){this._reservedNames.push(i)}}}else{throw new Error("Cannot reserve name: Name must be a string")
}},__isReserved:function(i){if(typeof i==="string"){return(this._reservedNames.indexOf(i)!==-1)
}else{throw new Error("Cannot check if this name is reserved because it is not a String.")
}}};f.exports=a},{"./Class":17,"./Element":21,"./Object":37,"./Registry/Component":40}],40:[function(c,f,b){var g=c("../Class");
var h=c("../Function");var a=c("../Object");var d=g();d.prototype={initialize:function(i,k,m,l,j){if(typeof i!=="string"){throw new Error("Cannot create Component without a name")
}this._name=i;this._properties=k||{};this.qualifier=typeof m==="function"?m:h.emptyFunction;
this._parent=l;this._context=j||{};a.synthesize(this)},properties:function(){var i=(typeof this._parent==="undefined"||this._parent===null)?{}:this._parent.properties();
return a.extend(i,this._properties)},context:function(i){if(this._context[i]){return this._context[i]
}else{if(Array.isArray(this._context.inherits)&&this._context.inherits.indexOf[i]!==-1){return(this.parent())?this.parent().context(i):null
}}return null},level:function(){if(typeof this._level!=="undefined"){return this._level
}if(this._name==="_base"){return 0}else{if(typeof this._parent==="undefined"||this._parent.name()==="_base"){return 1
}else{return this._parent.level()+1}}}};d.isComponent=function(i){return(i instanceof d)
};f.exports=d},{"../Class":17,"../Function":34,"../Object":37}],41:[function(d,f,c){var a=d("qs");
var b={};b.isString=function(g){return(typeof g==="string")};b.toCamelCase=function(g){if(!b.isString(g)){throw new TypeError("Argument must be of type String.")
}return g.replace(/-+(.)?/g,function(h,i){return i?i.toUpperCase():""})};b.queryStringToObject=function(g){if(!b.isString(g)){throw new TypeError("QueryStringToObject error: argument must be a string")
}return a.parse(g)};b.toQueryPair=function(g,h){if(!b.isString(g)||!b.isString(h)){throw new TypeError("toQueryPair error: argument must be a string")
}return encodeURIComponent(g)+"="+encodeURIComponent(h)};f.exports=b},{qs:8}],42:[function(d,g,b){var a={};
function f(h,i){var j=h.slice(1,h.length);if(typeof i[j]==="undefined"){i[j]=function(){return i[h]
}}}function c(h,i){var j=h.slice(1,h.length);j="set"+j.slice(0,1).toUpperCase()+j.slice(1,j.length);
if(typeof i[j]==="undefined"){i[j]=function(k){i[h]=k}}}a.synthesize=function(i){if(typeof i!=="object"){i=this
}var h;for(h in i){if(i.hasOwnProperty(h)){if(h.charAt(0)==="_"&&h.charAt(1)!=="_"){if(typeof i[h]!=="function"){f(h,i);
c(h,i)}}}}};g.exports=a},{}],43:[function(b,c,a){var d={};d.scrollOffsets=function(){return{x:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop}
};d.dimensions=function(){return{height:window.innerHeight||document.documentElement.clientHeight,width:window.innerWidth||document.documentElement.clientWidth}
};c.exports=d},{}],44:[function(b,d,a){d.exports=function c(h){var f=65521;var k=1;
var g=0;var l;var j;for(j=0;j<h.length;j+=1){l=h.charCodeAt(j);k=(k+l)%f;g=(g+k)%f
}return(g<<16)|k}},{}],45:[function(b,c,a){var f=b("./Element");var g=b("./Function");
c.exports=function d(j,k,i){var l;k=f.getElementById(k);if(!f.isElement(k)){throw"Invalid or non-existent element passed to bindEventListeners."
}for(l in i){if(i.hasOwnProperty(l)){var h=i[l];if(typeof h==="function"){f.addEventListener(k,l,g.bindAsEventListener(h,j))
}else{if(typeof h==="string"){f.addEventListener(k,l,g.bindAsEventListener(j[h],j))
}}}}}},{"./Element":21,"./Function":34}],46:[function(b,c,a){c.exports={console:window.console,document:document,window:window}
},{}],47:[function(f,g,b){var d=f("./Environment/Feature/localStorageAvailable");
var a="f7c9180f-5c45-47b4-8de4-428015f096c0";var c=(d()&&!!window.localStorage.getItem(a));
g.exports=function h(i){if(window.console&&typeof console.log==="function"&&c){console.log(i)
}}},{"./Environment/Feature/localStorageAvailable":32}],48:[function(b,c,a){c.exports=function d(h){var f;
if(!(h&&h.match&&h.match(/\S/))){throw"Attempt to create namespace with no name."
}var g=h.split(/\./);var j=window;for(f=0;f<g.length;f++){j[g[f]]=j[g[f]]||{};j=j[g[f]]
}}},{}],49:[function(d,f,c){var b=d("./String");f.exports=function a(){var g={};
var h=window.location.toString().split("?")[1];if(b.isString(h)){g=b.queryStringToObject(h)
}return g}},{"./String":41}],50:[function(b,c,a){c.exports=function(){var d=["abbr","article","aside","command","details","figcaption","figure","footer","header","hgroup","mark","meter","nav","output","picture","progress","section","source","summary","time","video"];
d.forEach(function(f){document.createElement(f)})}},{}],51:[function(b,c,a){c.exports=function(d,f){if(f.IE.documentMode<=8){d.toArray=function(h){var k=[];
var g=h.length;var j;if(g>0){for(j=0;j<g;j+=1){k.push(h[j])}}return k}}}},{}],52:[function(c,d,b){var a=c("../../Array");
var f=c("../../vendor/Sizzle");d.exports=function(j,i,h){var g=i.IE.documentMode;
h=h||f;if(g<8){j.selectAll=function(k,l){if(typeof l==="undefined"){l=document}else{if(!j.isElement(l)&&l.nodeType!==9&&l.nodeType!==11){throw new TypeError("ac-base.Element.selectAll: Invalid context nodeType")
}}if(typeof k!=="string"){throw new TypeError("ac-base.Element.selectAll: Selector must be a string")
}if(l.nodeType===11){var n=[];var m;a.toArray(l.childNodes).forEach(function(o){if(h.matchesSelector(o,k)){n.push(o)
}if(m=h(k,o).length>0){n.concat(m)}});return n}return h(k,l)}}else{if(g<9){j.selectAll=function(k,l){if(typeof l==="undefined"){l=document
}else{if(!j.isElement(l)&&l.nodeType!==9&&l.nodeType!==11){throw new TypeError("ac-base.Element.selectAll: Invalid context nodeType")
}}if(typeof k!=="string"){throw new TypeError("ac-base.Element.selectAll: Selector must be a string")
}return a.toArray(l.querySelectorAll(k))}}}if(g<8){j.select=function(k,m){if(typeof m==="undefined"){m=document
}else{if(!j.isElement(m)&&m.nodeType!==9&&m.nodeType!==11){throw new TypeError("ac-base.Element.select: Invalid context nodeType")
}}if(typeof k!=="string"){throw new TypeError("ac-base.Element.select: Selector must be a string")
}if(m.nodeType===11){var l=[];var n;a.toArray(m.childNodes).some(function(o){if(h.matchesSelector(o,k)){l=o;
return true}else{if(n=h(k,o).length>0){l=n[0];return true}}});return l}return h(k,m)[0]
}}if(g<9){j.matchesSelector=function(l,k){return h.matchesSelector(l,k)};j.filterBySelector=function(l,k){return h.matches(k,l)
}}if(g<9&&typeof window.getComputedStyle!=="function"){j.getStyle=function(m,n,l){m=j.getElementById(m);
var k;var o;l=l||m.currentStyle;if(l){n=n.replace(/-(\w)/g,j.setStyle.__camelCaseReplace);
n=n==="float"?"styleFloat":n;if(n==="opacity"){k=m.filters["DXImageTransform.Microsoft.Alpha"]||m.filters.Alpha;
if(k){return parseFloat(k.Opacity/100)}return 1}o=l[n]||null;return o==="auto"?null:o
}}}if(g<=8){j.setStyle.__superSetStyle=j.setStyle.__setStyle;j.setStyle.__setStyle=function(m,n,l,k){if(n==="opacity"){j.setStyle.__setOpacity(m,k)
}else{j.setStyle.__superSetStyle(m,n,l,k)}};j.setStyle.__setOpacity=function(l,m){m=(m>1)?1:((m<0.00001)?0:m)*100;
var k=l.filters["DXImageTransform.Microsoft.Alpha"]||l.filters.Alpha;if(k){k.Opacity=m
}else{l.style.filter+=" progid:DXImageTransform.Microsoft.Alpha(Opacity="+m+")"
}}}if(i.version<8){j.getBoundingBox=function(l){l=j.getElementById(l);var o=l.offsetLeft;
var n=l.offsetTop;var k=l.offsetWidth;var m=l.offsetHeight;return{top:n,right:o+k,bottom:n+m,left:o,width:k,height:m}
}}}},{"../../Array":15,"../../vendor/Sizzle":56}],53:[function(b,c,a){c.exports=function(f){function d(){var g;
if(document.documentMode){g=parseInt(document.documentMode,10)}else{g=5;if(document.compatMode){if(document.compatMode==="CSS1Compat"){g=7
}}}return g}f.IE={documentMode:d()}}},{}],54:[function(c,d,b){var f=c("../../Element");
function a(i,j){var g=false;var h=i.parentNode;while(h!==j){if(h){if(h.currentStyle.hasLayout){g=true;
break}h=h.parentNode}}return g}d.exports=function(){var o;var j;var p;var i;var l=[];
var h;var m=(location.protocol==="https:"?"https://ssl":"http://images")+".apple.com";
var k="g";var n="url("+m+"/global/elements/blank."+k+"if)";f.selectAll("a > * img").forEach(function(g){o=g.parentNode;
j=f.ancestor(g,"a");if(a(g,j)&&g.height>0&&g.width>0){if(!f.select("ieclickbooster",j)){p=document.createElement("ieclickbooster");
i=f.getStyle(j,"position");if(i==="static"){f.setStyle(j,{position:"relative"})
}f.selectAll("> *",j).forEach(function(q){var r=parseInt(q.currentStyle.zIndex,10);
if(r>0){l.push(r)}});l.sort(function(r,q){return q-r});h=l[0]?l[0].toString():"1";
f.insert(p,j);f.setStyle(p,{display:"block",position:"absolute",top:"0",bottom:"0",left:"0",right:"0",background:n,cursor:"pointer",zIndex:h})
}}})}},{"../../Element":21}],55:[function(b,d,a){var c=0;d.exports=function f(){return c++
}},{}],56:[function(b,c,a){
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(ae,w){var aj,E,v,h,n,l=ae.document,o=l.documentElement,M="undefined",p=false,m=true,u=0,z=[].slice,ai=[].push,am=("sizcache"+Math.random()).replace(".",""),P="[\\x20\\t\\r\\n\\f]",y="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])",x="(?:[\\w#_-]|[^\\x00-\\xa0]|\\\\.)",ar="([*^$|!~]?=)",ab="\\["+P+"*("+y+"+)"+P+"*(?:"+ar+P+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+x+"+)|)|)"+P+"*\\]",at=":("+y+"+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|(.*))\\)|)",R=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",t=P+"*([\\x20\\t\\r\\n\\f>+~])"+P+"*",r="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+ab+"|"+at.replace(2,7)+"|[^\\\\(),])+",ak=new RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),V=new RegExp("^"+t),J=new RegExp(r+"?(?="+P+"*,|$)","g"),Z=new RegExp("^(?:(?!,)(?:(?:^|,)"+P+"*"+r+")*?|"+P+"*(.*?))(\\)|$)"),ap=new RegExp(r.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+t,"g"),aa=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,af=/[\x20\t\r\n\f]*[+~]/,an=/:not\($/,F=/h\d/i,ac=/input|select|textarea|button/i,I=/\\(?!\\)/g,U={ID:new RegExp("^#("+y+"+)"),CLASS:new RegExp("^\\.("+y+"+)"),NAME:new RegExp("^\\[name=['\"]?("+y+"+)['\"]?\\]"),TAG:new RegExp("^("+y.replace("[-","[-\\*")+"+)"),ATTR:new RegExp("^"+ab),PSEUDO:new RegExp("^"+at),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),POS:new RegExp(R,"ig"),needsContext:new RegExp("^"+P+"*[>+~]|"+R,"i")},ah={},G=[],B={},K=[],ao=function(au){au.sizzleFilter=true;
return au},i=function(au){return function(av){return av.nodeName.toLowerCase()==="input"&&av.type===au
}},H=function(au){return function(aw){var av=aw.nodeName.toLowerCase();return(av==="input"||av==="button")&&aw.type===au
}},X=function(au){var av=false,ax=l.createElement("div");try{av=au(ax)}catch(aw){}ax=null;
return av},D=X(function(av){av.innerHTML="<select></select>";var au=typeof av.lastChild.getAttribute("multiple");
return au!=="boolean"&&au!=="string"}),f=X(function(av){av.id=am+0;av.innerHTML="<a name='"+am+"'></a><div name='"+am+"'></div>";
o.insertBefore(av,o.firstChild);var au=l.getElementsByName&&l.getElementsByName(am).length===2+l.getElementsByName(am+0).length;
n=!l.getElementById(am);o.removeChild(av);return au}),k=X(function(au){au.appendChild(l.createComment(""));
return au.getElementsByTagName("*").length===0}),T=X(function(au){au.innerHTML="<a href='#'></a>";
return au.firstChild&&typeof au.firstChild.getAttribute!==M&&au.firstChild.getAttribute("href")==="#"
}),S=X(function(au){au.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";
if(!au.getElementsByClassName||au.getElementsByClassName("e").length===0){return false
}au.lastChild.className="e";return au.getElementsByClassName("e").length!==1});
var ad=function(ax,au,az,aC){az=az||[];au=au||l;var aA,av,aB,aw,ay=au.nodeType;
if(ay!==1&&ay!==9){return[]}if(!ax||typeof ax!=="string"){return az}aB=A(au);if(!aB&&!aC){if((aA=aa.exec(ax))){if((aw=aA[1])){if(ay===9){av=au.getElementById(aw);
if(av&&av.parentNode){if(av.id===aw){az.push(av);return az}}else{return az}}else{if(au.ownerDocument&&(av=au.ownerDocument.getElementById(aw))&&Q(au,av)&&av.id===aw){az.push(av);
return az}}}else{if(aA[2]){ai.apply(az,z.call(au.getElementsByTagName(ax),0));return az
}else{if((aw=aA[3])&&S&&au.getElementsByClassName){ai.apply(az,z.call(au.getElementsByClassName(aw),0));
return az}}}}}return al(ax,au,az,aC,aB)};var W=ad.selectors={cacheLength:50,match:U,order:["ID","TAG"],attrHandle:{},createPseudo:ao,find:{ID:n?function(ax,aw,av){if(typeof aw.getElementById!==M&&!av){var au=aw.getElementById(ax);
return au&&au.parentNode?[au]:[]}}:function(ax,aw,av){if(typeof aw.getElementById!==M&&!av){var au=aw.getElementById(ax);
return au?au.id===ax||typeof au.getAttributeNode!==M&&au.getAttributeNode("id").value===ax?[au]:w:[]
}},TAG:k?function(au,av){if(typeof av.getElementsByTagName!==M){return av.getElementsByTagName(au)
}}:function(au,ay){var ax=ay.getElementsByTagName(au);if(au==="*"){var az,aw=[],av=0;
for(;(az=ax[av]);av++){if(az.nodeType===1){aw.push(az)}}return aw}return ax}},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(au){au[1]=au[1].replace(I,"");
au[3]=(au[4]||au[5]||"").replace(I,"");if(au[2]==="~="){au[3]=" "+au[3]+" "}return au.slice(0,4)
},CHILD:function(au){au[1]=au[1].toLowerCase();if(au[1]==="nth"){if(!au[2]){ad.error(au[0])
}au[3]=+(au[3]?au[4]+(au[5]||1):2*(au[2]==="even"||au[2]==="odd"));au[4]=+((au[6]+au[7])||au[2]==="odd")
}else{if(au[2]){ad.error(au[0])}}return au},PSEUDO:function(au){var av,aw=au[4];
if(U.CHILD.test(au[0])){return null}if(aw&&(av=Z.exec(aw))&&av.pop()){au[0]=au[0].slice(0,av[0].length-aw.length-1);
aw=av[0].slice(0,-1)}au.splice(2,3,aw||au[3]);return au}},filter:{ID:n?function(au){au=au.replace(I,"");
return function(av){return av.getAttribute("id")===au}}:function(au){au=au.replace(I,"");
return function(aw){var av=typeof aw.getAttributeNode!==M&&aw.getAttributeNode("id");
return av&&av.value===au}},TAG:function(au){if(au==="*"){return function(){return true
}}au=au.replace(I,"").toLowerCase();return function(av){return av.nodeName&&av.nodeName.toLowerCase()===au
}},CLASS:function(au){var av=ah[au];if(!av){av=ah[au]=new RegExp("(^|"+P+")"+au+"("+P+"|$)");
G.push(au);if(G.length>W.cacheLength){delete ah[G.shift()]}}return function(aw){return av.test(aw.className||(typeof aw.getAttribute!==M&&aw.getAttribute("class"))||"")
}},ATTR:function(aw,av,au){if(!av){return function(ax){return ad.attr(ax,aw)!=null
}}return function(ay){var ax=ad.attr(ay,aw),az=ax+"";if(ax==null){return av==="!="
}switch(av){case"=":return az===au;case"!=":return az!==au;case"^=":return au&&az.indexOf(au)===0;
case"*=":return au&&az.indexOf(au)>-1;case"$=":return au&&az.substr(az.length-au.length)===au;
case"~=":return(" "+az+" ").indexOf(au)>-1;case"|=":return az===au||az.substr(0,au.length+1)===au+"-"
}}},CHILD:function(av,ax,ay,aw){if(av==="nth"){var au=u++;return function(aC){var az,aD,aB=0,aA=aC;
if(ay===1&&aw===0){return true}az=aC.parentNode;if(az&&(az[am]!==au||!aC.sizset)){for(aA=az.firstChild;
aA;aA=aA.nextSibling){if(aA.nodeType===1){aA.sizset=++aB;if(aA===aC){break}}}az[am]=au
}aD=aC.sizset-aw;if(ay===0){return aD===0}else{return(aD%ay===0&&aD/ay>=0)}}}return function(aA){var az=aA;
switch(av){case"only":case"first":while((az=az.previousSibling)){if(az.nodeType===1){return false
}}if(av==="first"){return true}az=aA;case"last":while((az=az.nextSibling)){if(az.nodeType===1){return false
}}return true}}},PSEUDO:function(ay,ax,av,au){var aw=W.pseudos[ay]||W.pseudos[ay.toLowerCase()];
if(!aw){ad.error("unsupported pseudo: "+ay)}if(!aw.sizzleFilter){return aw}return aw(ax,av,au)
}},pseudos:{not:ao(function(au,aw,av){var ax=q(au.replace(ak,"$1"),aw,av);return function(ay){return !ax(ay)
}}),enabled:function(au){return au.disabled===false},disabled:function(au){return au.disabled===true
},checked:function(au){var av=au.nodeName.toLowerCase();return(av==="input"&&!!au.checked)||(av==="option"&&!!au.selected)
},selected:function(au){if(au.parentNode){au.parentNode.selectedIndex}return au.selected===true
},parent:function(au){return !!au.firstChild},empty:function(au){return !au.firstChild
},contains:ao(function(au){return function(av){return(av.textContent||av.innerText||d(av)).indexOf(au)>-1
}}),has:ao(function(au){return function(av){return ad(au,av).length>0}}),header:function(au){return F.test(au.nodeName)
},text:function(aw){var av,au;return aw.nodeName.toLowerCase()==="input"&&(av=aw.type)==="text"&&((au=aw.getAttribute("type"))==null||au.toLowerCase()===av)
},radio:i("radio"),checkbox:i("checkbox"),file:i("file"),password:i("password"),image:i("image"),submit:H("submit"),reset:H("reset"),button:function(av){var au=av.nodeName.toLowerCase();
return au==="input"&&av.type==="button"||au==="button"},input:function(au){return ac.test(au.nodeName)
},focus:function(au){var av=au.ownerDocument;return au===av.activeElement&&(!av.hasFocus||av.hasFocus())&&!!(au.type||au.href)
},active:function(au){return au===au.ownerDocument.activeElement}},setFilters:{first:function(aw,av,au){return au?aw.slice(1):[aw[0]]
},last:function(ax,aw,av){var au=ax.pop();return av?ax:[au]},even:function(az,ay,ax){var aw=[],av=ax?1:0,au=az.length;
for(;av<au;av=av+2){aw.push(az[av])}return aw},odd:function(az,ay,ax){var aw=[],av=ax?0:1,au=az.length;
for(;av<au;av=av+2){aw.push(az[av])}return aw},lt:function(aw,av,au){return au?aw.slice(+av):aw.slice(0,+av)
},gt:function(aw,av,au){return au?aw.slice(0,+av+1):aw.slice(+av+1)},eq:function(ax,aw,av){var au=ax.splice(+aw,1);
return av?ax:au}}};W.setFilters.nth=W.setFilters.eq;W.filters=W.pseudos;if(!T){W.attrHandle={href:function(au){return au.getAttribute("href",2)
},type:function(au){return au.getAttribute("type")}}}if(f){W.order.push("NAME");
W.find.NAME=function(au,av){if(typeof av.getElementsByName!==M){return av.getElementsByName(au)
}}}if(S){W.order.splice(1,0,"CLASS");W.find.CLASS=function(aw,av,au){if(typeof av.getElementsByClassName!==M&&!au){return av.getElementsByClassName(aw)
}}}try{z.call(o.childNodes,0)[0].nodeType}catch(aq){z=function(av){var aw,au=[];
for(;(aw=this[av]);av++){au.push(aw)}return au}}var A=ad.isXML=function(au){var av=au&&(au.ownerDocument||au).documentElement;
return av?av.nodeName!=="HTML":false};var Q=ad.contains=o.compareDocumentPosition?function(av,au){return !!(av.compareDocumentPosition(au)&16)
}:o.contains?function(av,au){var ax=av.nodeType===9?av.documentElement:av,aw=au.parentNode;
return av===aw||!!(aw&&aw.nodeType===1&&ax.contains&&ax.contains(aw))}:function(av,au){while((au=au.parentNode)){if(au===av){return true
}}return false};var d=ad.getText=function(ay){var ax,av="",aw=0,au=ay.nodeType;
if(au){if(au===1||au===9||au===11){if(typeof ay.textContent==="string"){return ay.textContent
}else{for(ay=ay.firstChild;ay;ay=ay.nextSibling){av+=d(ay)}}}else{if(au===3||au===4){return ay.nodeValue
}}}else{for(;(ax=ay[aw]);aw++){av+=d(ax)}}return av};ad.attr=function(ax,aw){var au,av=A(ax);
if(!av){aw=aw.toLowerCase()}if(W.attrHandle[aw]){return W.attrHandle[aw](ax)}if(D||av){return ax.getAttribute(aw)
}au=ax.getAttributeNode(aw);return au?typeof ax[aw]==="boolean"?ax[aw]?aw:null:au.specified?au.value:null:null
};ad.error=function(au){throw new Error("Syntax error, unrecognized expression: "+au)
};[0,0].sort(function(){return(m=0)});if(o.compareDocumentPosition){v=function(av,au){if(av===au){p=true;
return 0}return(!av.compareDocumentPosition||!au.compareDocumentPosition?av.compareDocumentPosition:av.compareDocumentPosition(au)&4)?-1:1
}}else{v=function(aC,aB){if(aC===aB){p=true;return 0}else{if(aC.sourceIndex&&aB.sourceIndex){return aC.sourceIndex-aB.sourceIndex
}}var az,av,aw=[],au=[],ay=aC.parentNode,aA=aB.parentNode,aD=ay;if(ay===aA){return h(aC,aB)
}else{if(!ay){return -1}else{if(!aA){return 1}}}while(aD){aw.unshift(aD);aD=aD.parentNode
}aD=aA;while(aD){au.unshift(aD);aD=aD.parentNode}az=aw.length;av=au.length;for(var ax=0;
ax<az&&ax<av;ax++){if(aw[ax]!==au[ax]){return h(aw[ax],au[ax])}}return ax===az?h(aC,au[ax],-1):h(aw[ax],aB,1)
};h=function(av,au,aw){if(av===au){return aw}var ax=av.nextSibling;while(ax){if(ax===au){return -1
}ax=ax.nextSibling}return 1}}ad.uniqueSort=function(av){var aw,au=1;if(v){p=m;av.sort(v);
if(p){for(;(aw=av[au]);au++){if(aw===av[au-1]){av.splice(au--,1)}}}}return av};
function C(av,az,ay,aw){var ax=0,au=az.length;for(;ax<au;ax++){ad(av,az[ax],ay,aw)
}}function Y(au,aw,aA,aB,av,az){var ax,ay=W.setFilters[aw.toLowerCase()];if(!ay){ad.error(aw)
}if(au||!(ax=av)){C(au||"*",aB,(ax=[]),av)}return ax.length>0?ay(ax,aA,az):[]}function ag(aE,au,aC,aw,aI){var az,av,ay,aK,aB,aJ,aD,aH,aF=0,aG=aI.length,ax=U.POS,aA=new RegExp("^"+ax.source+"(?!"+P+")","i"),aL=function(){var aN=1,aM=arguments.length-2;
for(;aN<aM;aN++){if(arguments[aN]===w){az[aN]=w}}};for(;aF<aG;aF++){ax.exec("");
aE=aI[aF];aK=[];ay=0;aB=aw;while((az=ax.exec(aE))){aH=ax.lastIndex=az.index+az[0].length;
if(aH>ay){aD=aE.slice(ay,az.index);ay=aH;aJ=[au];if(V.test(aD)){if(aB){aJ=aB}aB=aw
}if((av=an.test(aD))){aD=aD.slice(0,-5).replace(V,"$&*")}if(az.length>1){az[0].replace(aA,aL)
}aB=Y(aD,az[1],az[2],aJ,aB,av)}}if(aB){aK=aK.concat(aB);if((aD=aE.slice(ay))&&aD!==")"){C(aD,aK,aC,aw)
}else{ai.apply(aC,aK)}}else{ad(aE,au,aC,aw)}}return aG===1?aC:ad.uniqueSort(aC)
}function g(aA,aw,aD){var aF,aE,aG,ay=[],aB=0,aC=Z.exec(aA),av=!aC.pop()&&!aC.pop(),aH=av&&aA.match(J)||[""],au=W.preFilter,ax=W.filter,az=!aD&&aw!==l;
for(;(aE=aH[aB])!=null&&av;aB++){ay.push(aF=[]);if(az){aE=" "+aE}while(aE){av=false;
if((aC=V.exec(aE))){aE=aE.slice(aC[0].length);av=aF.push({part:aC.pop().replace(ak," "),captures:aC})
}for(aG in ax){if((aC=U[aG].exec(aE))&&(!au[aG]||(aC=au[aG](aC,aw,aD)))){aE=aE.slice(aC.shift().length);
av=aF.push({part:aG,captures:aC})}}if(!av){break}}}if(!av){ad.error(aA)}return ay
}function N(ay,ax,aw){var au=ax.dir,av=u++;if(!ay){ay=function(az){return az===aw
}}return ax.first?function(aA,az){while((aA=aA[au])){if(aA.nodeType===1){return ay(aA,az)&&aA
}}}:function(aB,aA){var az,aC=av+"."+E,aD=aC+"."+aj;while((aB=aB[au])){if(aB.nodeType===1){if((az=aB[am])===aD){return false
}else{if(typeof az==="string"&&az.indexOf(aC)===0){if(aB.sizset){return aB}}else{aB[am]=aD;
if(ay(aB,aA)){aB.sizset=true;return aB}aB.sizset=false}}}}}}function L(au,av){return au?function(ay,ax){var aw=av(ay,ax);
return aw&&au(aw===true?ay:aw,ax)}:av}function O(az,ax,au){var aw,ay,av=0;for(;
(aw=az[av]);av++){if(W.relative[aw.part]){ay=N(ay,W.relative[aw.part],ax)}else{aw.captures.push(ax,au);
ay=L(ay,W.filter[aw.part].apply(null,aw.captures))}}return ay}function j(au){return function(ax,aw){var ay,av=0;
for(;(ay=au[av]);av++){if(ay(ax,aw)){return true}}return false}}var q=ad.compile=function(au,ax,av){var aA,az,aw,ay=B[au];
if(ay&&ay.context===ax){ay.dirruns++;return ay}az=g(au,ax,av);for(aw=0;(aA=az[aw]);
aw++){az[aw]=O(aA,ax,av)}ay=B[au]=j(az);ay.context=ax;ay.runs=ay.dirruns=0;K.push(au);
if(K.length>W.cacheLength){delete B[K.shift()]}return ay};ad.matches=function(av,au){return ad(av,null,null,au)
};ad.matchesSelector=function(au,av){return ad(av,null,null,[au]).length>0};var al=function(ay,av,aA,aE,aD){ay=ay.replace(ak,"$1");
var au,aF,aB,aG,aw,ax,aI,aJ,az,aC=ay.match(J),aH=ay.match(ap),aK=av.nodeType;if(U.POS.test(ay)){return ag(ay,av,aA,aE,aC)
}if(aE){au=z.call(aE,0)}else{if(aC&&aC.length===1){if(aH.length>1&&aK===9&&!aD&&(aC=U.ID.exec(aH[0]))){av=W.find.ID(aC[1],av,aD)[0];
if(!av){return aA}ay=ay.slice(aH.shift().length)}aJ=((aC=af.exec(aH[0]))&&!aC.index&&av.parentNode)||av;
az=aH.pop();ax=az.split(":not")[0];for(aB=0,aG=W.order.length;aB<aG;aB++){aI=W.order[aB];
if((aC=U[aI].exec(ax))){au=W.find[aI]((aC[1]||"").replace(I,""),aJ,aD);if(au==null){continue
}if(ax===az){ay=ay.slice(0,ay.length-az.length)+ax.replace(U[aI],"");if(!ay){ai.apply(aA,z.call(au,0))
}}break}}}}if(ay){aF=q(ay,av,aD);E=aF.dirruns;if(au==null){au=W.find.TAG("*",(af.test(ay)&&av.parentNode)||av)
}for(aB=0;(aw=au[aB]);aB++){aj=aF.runs++;if(aF(aw,av)){aA.push(aw)}}}return aA};
if(l.querySelectorAll){(function(){var az,aA=al,ay=/'|\\/g,aw=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,av=[],au=[":active"],ax=o.matchesSelector||o.mozMatchesSelector||o.webkitMatchesSelector||o.oMatchesSelector||o.msMatchesSelector;
X(function(aB){aB.innerHTML="<select><option selected></option></select>";if(!aB.querySelectorAll("[selected]").length){av.push("\\["+P+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
}if(!aB.querySelectorAll(":checked").length){av.push(":checked")}});X(function(aB){aB.innerHTML="<p test=''></p>";
if(aB.querySelectorAll("[test^='']").length){av.push("[*^$]="+P+"*(?:\"\"|'')")
}aB.innerHTML="<input type='hidden'>";if(!aB.querySelectorAll(":enabled").length){av.push(":enabled",":disabled")
}});av=av.length&&new RegExp(av.join("|"));al=function(aG,aC,aH,aJ,aI){if(!aJ&&!aI&&(!av||!av.test(aG))){if(aC.nodeType===9){try{ai.apply(aH,z.call(aC.querySelectorAll(aG),0));
return aH}catch(aF){}}else{if(aC.nodeType===1&&aC.nodeName.toLowerCase()!=="object"){var aE=aC.getAttribute("id"),aB=aE||am,aD=af.test(aG)&&aC.parentNode||aC;
if(aE){aB=aB.replace(ay,"\\$&")}else{aC.setAttribute("id",aB)}try{ai.apply(aH,z.call(aD.querySelectorAll(aG.replace(J,"[id='"+aB+"'] $&")),0));
return aH}catch(aF){}finally{if(!aE){aC.removeAttribute("id")}}}}}return aA(aG,aC,aH,aJ,aI)
};if(ax){X(function(aC){az=ax.call(aC,"div");try{ax.call(aC,"[test!='']:sizzle");
au.push(W.match.PSEUDO)}catch(aB){}});au=new RegExp(au.join("|"));ad.matchesSelector=function(aC,aE){aE=aE.replace(aw,"='$1']");
if(!A(aC)&&!au.test(aE)&&(!av||!av.test(aE))){try{var aB=ax.call(aC,aE);if(aB||az||aC.document&&aC.document.nodeType!==11){return aB
}}catch(aD){}}return ad(aE,null,null,[aC]).length>0}}})()}if(typeof c==="object"&&c.exports){c.exports=ad
}else{ae.Sizzle=ad}})(window)},{}]},{},["QQX0yI"]);require("ac-base");(function e(b,g,d){function c(k,i){if(!g[k]){if(!b[k]){var h=typeof require=="function"&&require;
if(!i&&h){return h(k,!0)}if(a){return a(k,!0)}throw new Error("Cannot find module '"+k+"'")
}var j=g[k]={exports:{}};b[k][0].call(j.exports,function(l){var m=b[k][1][l];return c(m?m:l)
},j,j.exports,e,b,g,d)}return g[k].exports}var a=typeof require=="function"&&require;
for(var f=0;f<d.length;f++){c(d[f])}return c})({1:[function(d,f,c){var i=d("ac-base").Element;
var b=d("ac-gallery").builder;var a=d("ac-viewport").Viewport;var h=d("ac-localnav-sticky").LocalnavSticky;
var g=(function(){return{initialize:function(){this.sticky=new h({analyticsEnabled:false});
var k=a.getBreakpoint().name;var j=i.selectAll(".player-gallery .slide");var q={keyframeElements:j,triggerSelector:".gallery-1-control",touch:false,touchElement:i.select(".player-gallery")};
var n=b(q);var t=i.selectAll(".store-gallery .slide");var p={keyframeElements:t,triggerSelector:".gallery-2-control",touch:true,touchElement:i.select(".store-gallery")};
var m=b(p);if(k!="small"){var r=i.selectAll(".on-itunes-gallery .slide");var o={keyframeElements:r,triggerSelector:".gallery-3-control",touch:true,touchElement:i.select(".on-itunes-gallery")};
var l=b(o)}return this}}}());f.exports=g.initialize()},{"ac-base":false,"ac-gallery":146,"ac-localnav-sticky":205,"ac-viewport":281}],2:[function(b,c,a){c.exports={log:b("./ac-console/log")}
},{"./ac-console/log":3}],3:[function(d,f,b){var a="f7c9180f-5c45-47b4-8de4-428015f096c0";
var c=!!(function(){try{return window.localStorage.getItem(a)}catch(h){}}());f.exports=function g(h){if(window.console&&typeof console.log!=="undefined"&&c){console.log(h)
}}},{}],4:[function(b,d,a){var c={};c.addEventListener=function(j,h,i,g){if(j.addEventListener){j.addEventListener(h,i,g)
}else{if(j.attachEvent){j.attachEvent("on"+h,i)}else{j["on"+h]=i}}return j};c.dispatchEvent=function(h,g){if(document.createEvent){h.dispatchEvent(new CustomEvent(g))
}else{h.fireEvent("on"+g,document.createEventObject())}return h};c.removeEventListener=function(j,h,i,g){if(j.removeEventListener){j.removeEventListener(h,i,g)
}else{j.detachEvent("on"+h,i)}return j};var f=/^(webkit|moz|ms|o)/i;c.addVendorPrefixEventListener=function(j,h,i,g){if(f.test(h)){h=h.replace(f,"")
}else{h=h.charAt(0).toUpperCase()+h.slice(1)}if(/WebKit/i.test(window.navigator.userAgent)){return c.addEventListener(j,"webkit"+h,i,g)
}else{if(/Opera/i.test(window.navigator.userAgent)){return c.addEventListener(j,"O"+h,i,g)
}else{if(/Gecko/i.test(window.navigator.userAgent)){return c.addEventListener(j,h.toLowerCase(),i,g)
}else{h=h.charAt(0).toLowerCase()+h.slice(1);return c.addEventListener(j,h,i,g)
}}}};c.removeVendorPrefixEventListener=function(j,h,i,g){if(f.test(h)){h=h.replace(f,"")
}else{h=h.charAt(0).toUpperCase()+h.slice(1)}c.removeEventListener(j,"webkit"+h,i,g);
c.removeEventListener(j,"O"+h,i,g);c.removeEventListener(j,h.toLowerCase(),i,g);
h=h.charAt(0).toLowerCase()+h.slice(1);return c.removeEventListener(j,h,i,g)};c.stop=function(g){if(!g){g=window.event
}if(g.stopPropagation){g.stopPropagation()}else{g.cancelBubble=true}if(g.preventDefault){g.preventDefault()
}g.stopped=true;g.returnValue=false};c.target=function(g){return(typeof g.target!=="undefined")?g.target:g.srcElement
};d.exports=c},{}],5:[function(b,c,a){c.exports={flatten:b("./ac-array/flatten"),intersection:b("./ac-array/intersection"),toArray:b("./ac-array/toArray"),union:b("./ac-array/union"),unique:b("./ac-array/unique"),without:b("./ac-array/without")}
},{"./ac-array/flatten":6,"./ac-array/intersection":7,"./ac-array/toArray":8,"./ac-array/union":9,"./ac-array/unique":10,"./ac-array/without":11}],6:[function(b,c,a){c.exports=function d(h){var f=[];
var g=function(i){if(Array.isArray(i)){i.forEach(g)}else{f.push(i)}};h.forEach(g);
return f}},{}],7:[function(b,c,a){c.exports=function d(n){if(!n){return[]}var m=arguments.length;
var k=0;var g=n.length;var f=[];var l;for(k;k<g;k++){l=n[k];if(f.indexOf(l)>-1){continue
}for(var h=1;h<m;h++){if(arguments[h].indexOf(l)<0){break}}if(h===m){f.push(l)}}return f
}},{}],8:[function(b,d,a){d.exports=function c(f){return Array.prototype.slice.call(f)
}},{}],9:[function(b,c,a){var g=b("./flatten");var f=b("./unique");c.exports=function d(h){return f(g(Array.prototype.slice.call(arguments)))
}},{"./flatten":6,"./unique":10}],10:[function(b,c,a){c.exports=function d(g){var f=function(h,i){if(h.indexOf(i)<0){h.push(i)
}return h};return g.reduce(f,[])}},{}],11:[function(b,d,a){d.exports=function c(f,n,m){var k;
var h=f.indexOf(n);var l=f.length;if(h>=0){if(m){k=f.slice(0,l);var j,g=0;for(j=h;
j<l;j++){if(f[j]===n){k.splice(j-g,1);g++}}}else{if(h===(l-1)){k=f.slice(0,(l-1))
}else{if(h===0){k=f.slice(1)}else{k=f.slice(0,h);k=k.concat(f.slice(h+1))}}}}else{return f
}return k}},{}],12:[function(b,c,a){c.exports.DOMEmitter=b("./ac-dom-emitter/DOMEmitter")
},{"./ac-dom-emitter/DOMEmitter":13}],13:[function(b,c,a){var g;var f=b("ac-event-emitter").EventEmitter;
var d="dom-emitter";function h(i){if(i===null){return}this.el=i;this._bindings={};
this._eventEmitter=new f()}g=h.prototype;g._parseEventNames=function(i){if(!i){return[i]
}return i.split(" ")};g._onListenerEvent=function(j,i){this.trigger(j,i,false)};
g._setListener=function(i){this._bindings[i]=this._onListenerEvent.bind(this,i);
this._addEventListener(i,this._bindings[i])};g._removeListener=function(i){this._removeEventListener(i,this._bindings[i]);
delete this._bindings[i]};g._addEventListener=function(j,k,i){if(this.el.addEventListener){this.el.addEventListener(j,k,i)
}else{if(this.el.attachEvent){this.el.attachEvent("on"+j,k)}else{target["on"+j]=k
}}return this};g._removeEventListener=function(j,k,i){if(this.el.removeEventListener){this.el.removeEventListener(j,k,i)
}else{this.el.detachEvent("on"+j,k)}return this};g._triggerInternalEvent=function(i,j){this.trigger(d+":"+i,j)
};g.on=function(i,k,j){i=this._parseEventNames(i);i.forEach(function(n,m,l){if(!this.has(l)){this._setListener(l)
}this._triggerInternalEvent("willon",{evt:l,callback:n,context:m});this._eventEmitter.on(l,n,m);
this._triggerInternalEvent("didon",{evt:l,callback:n,context:m})}.bind(this,k,j));
return this};g.off=function(i,l,k){var j=Array.prototype.slice.call(arguments,0);
i=this._parseEventNames(i);i.forEach(function(q,p,n,m){if(n.length===0){this._eventEmitter.off();
var o;for(o in this._bindings){if(this._bindings.hasOwnProperty(o)){this._removeListener(o)
}}return}this._triggerInternalEvent("willoff",{evt:m,callback:q,context:p});this._eventEmitter.off(m,q,p);
this._triggerInternalEvent("didoff",{evt:m,callback:q,context:p});if(!this.has(m)){this._removeListener(m)
}}.bind(this,l,k,j));return this};g.once=function(i,k,j){i=this._parseEventNames(i);
i.forEach(function(n,m,l){if(!this.has(l)){this._setListener(l)}this._triggerInternalEvent("willonce",{evt:l,callback:n,context:m});
this._eventEmitter.once.call(this,l,n,m);this._triggerInternalEvent("didonce",{evt:l,callback:n,context:m})
}.bind(this,k,j));return this};g.has=function(i,k,j){if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};g.trigger=function(i,j,k){i=this._parseEventNames(i);i.forEach(function(m,n,l){this._eventEmitter.trigger(l,m,n)
}.bind(this,j,k));return this};g.destroy=function(){this._triggerInternalEvent("willdestroy");
this.off();this.el=this._eventEmitter=this._bindings=null};c.exports=h},{"ac-event-emitter":88}],14:[function(b,c,a){c.exports.WindowDelegate=b("./window-delegate/WindowDelegate");
c.exports.windowEmitter=b("./window-delegate/windowEmitter")},{"./window-delegate/WindowDelegate":15,"./window-delegate/windowEmitter":16}],15:[function(c,f,a){var g;
var b=c("./windowEmitter");function d(){this._emitter=b;this._setWindowDimensionValues();
this._setScrollValues();this.on("resize",this._setWindowDimensionValues.bind(this));
this.on("scroll",this._setScrollValues.bind(this));this.on("touchstart",this._touchScrollStart.bind(this));
this.on("touchend",this._setZoomValues.bind(this))}g=d.prototype;g.on=function(){this._emitter.on.apply(this._emitter,arguments);
return this};g.once=function(){this._emitter.once.apply(this._emitter,arguments);
return this};g.off=function(){this._emitter.off.apply(this._emitter,arguments);
return this};g.has=function(){return this._emitter.has.apply(this._emitter,arguments)
};g.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};g.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};g.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};g.isZoomed=function(){return this.clientWidth>this.innerWidth};g._setWindowDimensionValues=function(){this.clientWidth=document.documentElement.clientWidth;
this.clientHeight=document.documentElement.clientHeight;this.innerWidth=window.innerWidth||this.clientWidth;
this.innerHeight=window.innerHeight||this.clientHeight};g._setZoomValues=function(){var h=this.innerWidth;
this.innerWidth=window.innerWidth;if(h!==this.innerWidth){this.innerHeight=window.innerHeight;
this.trigger("zoom");if(h<this.innerWidth){this.trigger("zoomIn")}else{this.trigger("zoomOut")
}}else{setTimeout(this._setZoomValues.bind(this),500)}};g._updateScrollX=function(){this.scrollX=(window.pageXOffset!==undefined)?window.pageXOffset:(document.documentElement||document.body.parentNode||document.body).scrollLeft;
this.maxScrollX=document.body.scrollWidth-this.innerWidth;return this.scrollX};
g._updateScrollY=function(){this.scrollY=(window.pageYOffset!==undefined)?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;
this.maxScrollY=document.body.scrollHeight-this.innerHeight;return this.scrollY
};g._setScrollValues=function(){var i=this.scrollX,h=this.scrollY;this._updateScrollX();
this._updateScrollY();if(this.scrollX!==i){this.trigger("scrollX")}if(this.scrollY!==h){this.trigger("scrollY")
}this._scrollStop()};g._scrollStop=function(){if(typeof window.ontouchstart==="undefined"){if(this._scrollStopTimer){clearTimeout(this._scrollStopTimer)
}this._scrollStopTimer=setTimeout(function(){clearTimeout(this._scrollStopTimer);
this.trigger("scrollStop")}.bind(this),300)}};g._touchScrollStart=function(){this._updateScrollX();
this._updateScrollY();this.once("touchend",this._touchScrollStop.bind(this,this.scrollX,this.scrollY))
};g._touchScrollStop=function(i,h,j){this._updateScrollX();this._updateScrollY();
if(i!==this.scrollX||h!==this.scrollY){setTimeout(this._touchScrollStop.bind(this,this.scrollX,this.scrollY,true),300)
}else{if(j){this.trigger("scrollStop")}}};f.exports=new d()},{"./windowEmitter":16}],16:[function(b,c,a){var d=b("ac-dom-emitter").DOMEmitter;
c.exports=new d(window)},{"ac-dom-emitter":12}],17:[function(b,c,a){var d=b("./ac-element-tracker/ElementTracker");
c.exports=new d();c.exports.ElementTracker=d},{"./ac-element-tracker/ElementTracker":18}],18:[function(c,b,g){var h;
var f=c("ac-object");var i=c("ac-base").Element;var k=c("ac-base").Array;var m=c("window-delegate").WindowDelegate;
var j=c("./TrackedElement");var d={autoStart:false};function a(o,n){this.options=f.clone(d);
this.options=typeof n==="object"?f.extend(this.options,n):this.options;this.windowDelegate=m;
this.tracking=false;this.elements=[];if(o&&(Array.isArray(o)||this._isNodeList(o)||i.isElement(o))){this.addElements(o)
}if(this.options.autoStart===true){this.start()}}h=a.prototype;var l=/^\[object (HTMLCollection|NodeList|Object)\]$/;
h._isNodeList=function(n){if(!n){return false}if(typeof n.length!=="number"){return false
}if(typeof n[0]==="object"&&(!n[0]||!n[0].nodeType)){return false}return l.test(Object.prototype.toString.call(n))
};h._registerElements=function(n){n=[].concat(n);n.forEach(function(p){if(this._elementInDOM(p)){var o=new j(p);
o.offsetTop=o.element.offsetTop;this.elements.push(o)}},this)};h._registerTrackedElementObjects=function(o){var n=[].concat(o);
n.forEach(function(p){if(this._elementInDOM(p.element)){p.offsetTop=p.element.offsetTop;
this.elements.push(p)}},this)};h._elementInDOM=function(p){var o=false;var n=document.getElementsByTagName("body")[0];
if(i.isElement(p)&&n.contains(p)){o=true}return o};h._onScroll=function(){this.elements.forEach(function(n){this.refreshElementState(n)
},this)};h._onResize=function(){this.elements.forEach(function(n){this.refreshElementState(n)
},this)};h._elementPercentInView=function(n){return n.pixelsInView/n.height};h._elementPixelsInView=function(o){var r=0;
var q=o.top;var p=o.bottom;var n=this.windowDelegate.innerHeight;if(q<=0&&p>=n){r=n
}else{if(q>=0&&q<n&&p>n){r=n-q}else{if(q<0&&(p<n&&p>=0)){r=o.bottom}else{if(q>=0&&p<=n){r=o.height
}}}}return r};h._isElementOrObject=function(n){return n&&(i.isElement(n)||(typeof n==="object"&&!Array.isArray(n)&&!this._isNodeList(n)))
};h._ifInView=function(n,p,o){if(!p){n.trigger("enterview",n)}if(!o&&n.percentInView>n.inViewThreshold){n.inThreshold=true;
n.trigger("thresholdenter",n)}};h._ifAlreadyInView=function(n,o){if(!n.inView){n.trigger("exitview",n)
}if(o&&n.percentInView<n.inViewThreshold){n.inThreshold=false;n.trigger("thresholdexit",n)
}};h.addElements=function(n){n=this._isNodeList(n)?k.toArray(n):[].concat(n);n.forEach(function(o){this.addElement(o)
},this)};h.addElement=function(o){var n;if(this._isElementOrObject(o)){n=new j(o);
this._registerTrackedElementObjects(n)}else{throw new TypeError("ElementTracker.addElement: "+o+"must be a valid Element or Object")
}return n};h.removeElement=function(p){var o=[];var n;this.elements.forEach(function(q,r){if(q===p||q.element===p){o.push(r)
}});n=this.elements.filter(function(r,q){return o.indexOf(q)<0?true:false});this.elements=n
};h.stop=function(){if(this.tracking===true){this.tracking=false;this.windowDelegate.off("scroll",this._onScroll);
this.windowDelegate.off("resize",this._onResize)}};h.start=function(){if(this.tracking===false){this.tracking=true;
this.windowDelegate.on("scroll",this._onScroll,this);this.windowDelegate.on("resize",this._onResize,this);
this.refreshAllElementStates()}};h.refreshAllElementStates=function(){this.elements.forEach(function(n){this.refreshElementState(n)
},this)};h.refreshElementState=function(n){var p=i.getBoundingBox(n.element);var q=n.inView;
var o=n.inThreshold;n=f.extend(n,p);n.pixelsInView=this._elementPixelsInView(n);
n.percentInView=this._elementPercentInView(n);n.inView=n.pixelsInView>0;if(n.inView){this._ifInView(n,q,o)
}if(q){this._ifAlreadyInView(n,o)}return n};b.exports=a},{"./TrackedElement":19,"ac-base":false,"ac-object":26,"window-delegate":14}],19:[function(b,c,a){var d;
var h=b("ac-dom-emitter").DOMEmitter;var g={inViewThreshold:0.75};function f(j){var i={};
var k;if(j.nodeType&&j.nodeType>0){i.element=j}else{i=j}for(k in g){this[k]=g[k]
}for(k in i){this[k]=i[k]}this.inView=false;this.inThreshold=false;this.percentInView=0;
this.pixelsInView=0;this.offsetTop=0;this.top=0;this.right=0;this.bottom=0;this.left=0;
this.width=0;this.height=0;h.call(this,i.element)}d=f.prototype=new h(null);c.exports=f
},{"ac-dom-emitter":12}],20:[function(b,c,a){c.exports.ElementEngagement=b("./ac-element-engagement/ElementEngagement")
},{"./ac-element-engagement/ElementEngagement":21}],21:[function(f,c,i){var j;var h=f("ac-object");
var k=f("ac-base").Element;var l=f("ac-array");var m=f("ac-base").onDOMReady;var b=f("ac-element-tracker").ElementTracker;
var n=f("ac-event-emitter").EventEmitter;var g={dataAttribute:"element-engagement",autoStart:false,autoSelect:true};
var d={thresholdEnterTime:0,thresholdExitTime:0,engaged:false,timeToEngage:1000,tracking:true,trackOnce:true};
var a=function(o){var p;o=o||{};p=(o.elements&&o.elements.length)?o.elements:[];
delete o.elements;this.options=h.defaults(g,o);this.tracking=false;this.elements=[];
this.elementTracker=new b();this._collectElementsToTrack(p);if(this.options.autoStart===true&&this.elements.length>0){this.start()
}};j=a.prototype=new n();j._collectElementsToTrack=function(q){var p;var o=[];if(this.options.autoSelect){o=k.selectAll("[data-"+this.options.dataAttribute+"]")
}p=l.union(q,o);if(p.length>0){this.elementTracker.addElements(p);this.elements=this.elementTracker.elements;
this._decorateTrackedElements()}};j._decorateTrackedElements=function(){var o;this.elements.forEach(function(p){var q=this._dataAttributeToObject(p);
q=this._castDataAttributeOptions(q);o=h.defaults(d,q);h.extend(p,o)},this)};j._castDataAttributeOptions=function(p){var o;
var r;var q;p=h.clone(p);if(p.inViewThreshold&&typeof p.inViewThreshold!=="number"){o=parseFloat(p.inViewThreshold,10);
if(!isNaN(o)){p.inViewThreshold=o}else{delete p.inViewThreshold}}if(p.timeToEngage&&typeof p.timeToEngage!=="number"){r=parseInt(p.timeToEngage,10);
if(!isNaN(r)){p.timeToEngage=r}else{delete p.timeToEngage}}if(p.trackOnce&&typeof p.trackOnce!=="boolean"){if(p.trackOnce==="false"){p.trackOnce=false
}else{delete p.trackOnce}}return p};j._attachElementListeners=function(o){o.on("thresholdenter",this._thresholdEnter,this);
o.on("thresholdexit",this._thresholdExit,this)};j._removeElementListeners=function(o){o.off("thresholdenter",this._thresholdEnter);
o.off("thresholdexit",this._thresholdExit)};j._attachAllElementListeners=function(){this.elements.forEach(function(o){if(!o.trackOnce){this._attachElementListeners(o)
}else{if(!o.engaged){this._attachElementListeners(o)}}},this)};j._removeAllElementListeners=function(){this.elements.forEach(function(o){this._removeElementListeners(o)
},this)};j._thresholdEnter=function(o){o.thresholdEnterTime=Date.now();o.thresholdExitTime=0;
this.trigger("thresholdenter",o)};j._thresholdExit=function(o){o.thresholdExitTime=Date.now();
o.engaged=this._wasElementEngaged(o);this.trigger("thresholdexit",o)};j._wasElementEngaged=function(p){var q;
var t=false;var r=p.thresholdEnterTime;var o=p.thresholdExitTime;if(r>0&&o>0){q=o-r;
t=q>=p.timeToEngage}if(t){this._elementEngaged(p);this.trigger("engaged",p)}return t
};j._elementEngaged=function(o){o.engaged=true;if(o.trackOnce){this.stop(o)}};j._dataAttributeToObject=function(r){var q=r.element;
var t=q.getAttribute("data-"+this.options.dataAttribute);var o;var p={};var u;if(t&&t.length>0){o=t.split(",");
if(o&&o.length>0){o.forEach(function(v){u=v.split(":");p[u[0]]=u[1]})}}return p
};j.stop=function(o){if(this.tracking&&!o){this.tracking=false;this.elementTracker.stop();
this._removeAllElementListeners()}if(o&&o.tracking){o.tracking=false;this._removeElementListeners(o)
}};j.start=function(o){if(!this.tracking&&!o){this.tracking=true;this._attachAllElementListeners();
this.elementTracker.start()}if(o&&!o.tracking){if(!o.trackOnce){o.tracking=true;
this._attachElementListeners(o)}else{if(!o.engaged){o.tracking=true;this._attachElementListeners(o)
}}}};c.exports=a},{"ac-array":5,"ac-base":false,"ac-element-tracker":17,"ac-event-emitter":88,"ac-object":26}],22:[function(c,f,b){var d={cssPropertyAvailable:c("./ac-feature/cssPropertyAvailable"),localStorageAvailable:c("./ac-feature/localStorageAvailable")};
var a=Object.prototype.hasOwnProperty;d.threeDTransformsAvailable=function(){if(typeof this._threeDTransformsAvailable!=="undefined"){return this._threeDTransformsAvailable
}var i,g;try{this._threeDTransformsAvailable=false;if(a.call(window,"styleMedia")){this._threeDTransformsAvailable=window.styleMedia.matchMedium("(-webkit-transform-3d)")
}else{if(a.call(window,"media")){this._threeDTransformsAvailable=window.media.matchMedium("(-webkit-transform-3d)")
}}if(!this._threeDTransformsAvailable){if(!(g=document.getElementById("supportsThreeDStyle"))){g=document.createElement("style");
g.id="supportsThreeDStyle";g.textContent="@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
document.querySelector("head").appendChild(g)}if(!(i=document.querySelector("#supportsThreeD"))){i=document.createElement("div");
i.id="supportsThreeD";document.body.appendChild(i)}this._threeDTransformsAvailable=(i.offsetHeight===3)||g.style.MozTransform!==undefined||g.style.WebkitTransform!==undefined
}return this._threeDTransformsAvailable}catch(h){return false}};d.canvasAvailable=function(){if(typeof this._canvasAvailable!=="undefined"){return this._canvasAvailable
}var g=document.createElement("canvas");this._canvasAvailable=!!(typeof g.getContext==="function"&&g.getContext("2d"));
return this._canvasAvailable};d.sessionStorageAvailable=function(){if(typeof this._sessionStorageAvailable!=="undefined"){return this._sessionStorageAvailable
}try{if(typeof window.sessionStorage!=="undefined"&&typeof window.sessionStorage.setItem==="function"){window.sessionStorage.setItem("ac_browser_detect","test");
this._sessionStorageAvailable=true;window.sessionStorage.removeItem("ac_browser_detect","test")
}else{this._sessionStorageAvailable=false}}catch(g){this._sessionStorageAvailable=false
}return this._sessionStorageAvailable};d.cookiesAvailable=function(){if(typeof this._cookiesAvailable!=="undefined"){return this._cookiesAvailable
}this._cookiesAvailable=(a.call(document,"cookie")&&!!navigator.cookieEnabled)?true:false;
return this._cookiesAvailable};d.__normalizedScreenWidth=function(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?window.screen.width:window.screen.height
};d.touchAvailable=function(){return !!(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch)
};d.isDesktop=function(){if(!this.touchAvailable()&&!window.orientation){return true
}return false};d.isHandheld=function(){return !this.isDesktop()&&!this.isTablet()
};d.isTablet=function(){return !this.isDesktop()&&this.__normalizedScreenWidth()>480
};d.isRetina=function(){var g=["min-device-pixel-ratio:1.5","-webkit-min-device-pixel-ratio:1.5","min-resolution:1.5dppx","min-resolution:144dpi","min--moz-device-pixel-ratio:1.5"];
var h;if(window.devicePixelRatio!==undefined){if(window.devicePixelRatio>=1.5){return true
}}else{for(h=0;h<g.length;h+=1){if(window.matchMedia("("+g[h]+")").matches===true){return true
}}}return false};d.svgAvailable=function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
};f.exports=d},{"./ac-feature/cssPropertyAvailable":23,"./ac-feature/localStorageAvailable":24}],23:[function(c,f,b){var g=null;
var h=null;var a=null;var d=null;f.exports=function(t){if(g===null){g=document.createElement("browserdetect").style
}if(h===null){h=["-webkit-","-moz-","-o-","-ms-","-khtml-",""]}if(a===null){a=["Webkit","Moz","O","ms","Khtml",""]
}if(d===null){d={}}t=t.replace(/([A-Z]+)([A-Z][a-z])/g,"$1\\-$2").replace(/([a-z\d])([A-Z])/g,"$1\\-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(t){case"gradient":if(d.gradient!==undefined){return d.gradient}t="background-image:";
var q="gradient(linear,left top,right bottom,from(#9f9),to(white));";var p="linear-gradient(left top,#9f9, white);";
g.cssText=(t+h.join(q+t)+h.join(p+t)).slice(0,-t.length);d.gradient=(g.backgroundImage.indexOf("gradient")!==-1);
return d.gradient;case"inset-box-shadow":if(d["inset-box-shadow"]!==undefined){return d["inset-box-shadow"]
}t="box-shadow:";var r="#fff 0 1px 1px inset;";g.cssText=h.join(t+r);d["inset-box-shadow"]=(g.cssText.indexOf("inset")!==-1);
return d["inset-box-shadow"];default:var o=t.split("-");var k=o.length;var n;var m;
var l;if(o.length>0){t=o[0];for(m=1;m<k;m+=1){t+=o[m].substr(0,1).toUpperCase()+o[m].substr(1)
}}n=t.substr(0,1).toUpperCase()+t.substr(1);if(d[t]!==undefined){return d[t]}for(l=a.length-1;
l>=0;l-=1){if(g[a[l]+t]!==undefined||g[a[l]+n]!==undefined){d[t]=true;return true
}}return false}}},{}],24:[function(d,f,b){var a=null;f.exports=function c(){if(a===null){a=!!(window.localStorage&&window.localStorage.non_existent!==null)
}return a}},{}],25:[function(i,c,y){var t=Object.prototype.toString;var l=Object.prototype.hasOwnProperty;
var b=typeof Array.prototype.indexOf==="function"?function(A,B){return A.indexOf(B)
}:function(A,C){for(var B=0;B<A.length;B++){if(A[B]===C){return B}}return -1};var k=Array.isArray||function(A){return t.call(A)=="[object Array]"
};var w=Object.keys||function(C){var A=[];for(var B in C){if(C.hasOwnProperty(B)){A.push(B)
}}return A};var v=typeof Array.prototype.forEach==="function"?function(A,B){return A.forEach(B)
}:function(A,C){for(var B=0;B<A.length;B++){C(A[B])}};var m=function(A,E,B){if(typeof A.reduce==="function"){return A.reduce(E,B)
}var D=B;for(var C=0;C<A.length;C++){D=E(D,A[C])}return D};var z=/^[0-9]+$/;function d(D,C){if(D[C].length==0){return D[C]={}
}var B={};for(var A in D[C]){if(l.call(D[C],A)){B[A]=D[C][A]}}D[C]=B;return B}function q(E,C,B,F){var A=E.shift();
if(l.call(Object.prototype,B)){return}if(!A){if(k(C[B])){C[B].push(F)}else{if("object"==typeof C[B]){C[B]=F
}else{if("undefined"==typeof C[B]){C[B]=F}else{C[B]=[C[B],F]}}}}else{var D=C[B]=C[B]||[];
if("]"==A){if(k(D)){if(""!=F){D.push(F)}}else{if("object"==typeof D){D[w(D).length]=F
}else{D=C[B]=[C[B],F]}}}else{if(~b(A,"]")){A=A.substr(0,A.length-1);if(!z.test(A)&&k(D)){D=d(C,B)
}q(E,D,A,F)}else{if(!z.test(A)&&k(D)){D=d(C,B)}q(E,D,A,F)}}}}function f(E,D,H){if(~b(D,"]")){var G=D.split("["),A=G.length,F=A-1;
q(G,E,"base",H)}else{if(!z.test(D)&&k(E.base)){var C={};for(var B in E.base){C[B]=E.base[B]
}E.base=C}n(E.base,D,H)}return E}function o(D){if("object"!=typeof D){return D}if(k(D)){var A=[];
for(var C in D){if(l.call(D,C)){A.push(D[C])}}return A}for(var B in D){D[B]=o(D[B])
}return D}function g(B){var A={base:{}};v(w(B),function(C){f(A,C,B[C])});return o(A.base)
}function h(B){var A=m(String(B).split("&"),function(C,G){var H=b(G,"="),F=u(G),D=G.substr(0,F||H),E=G.substr(F||H,G.length),E=E.substr(b(E,"=")+1,E.length);
if(""==D){D=G,E=""}if(""==D){return C}return f(C,p(D),p(E))},{base:{}}).base;return o(A)
}y.parse=function(A){if(null==A||""==A){return{}}return"object"==typeof A?g(A):h(A)
};var r=y.stringify=function(B,A){if(k(B)){return j(B,A)}else{if("[object Object]"==t.call(B)){return x(B,A)
}else{if("string"==typeof B){return a(B,A)}else{return A+"="+encodeURIComponent(String(B))
}}}};function a(B,A){if(!A){throw new TypeError("stringify expects an object")}return A+"="+encodeURIComponent(B)
}function j(A,D){var B=[];if(!D){throw new TypeError("stringify expects an object")
}for(var C=0;C<A.length;C++){B.push(r(A[C],D+"["+C+"]"))}return B.join("&")}function x(G,F){var B=[],E=w(G),D;
for(var C=0,A=E.length;C<A;++C){D=E[C];if(""==D){continue}if(null==G[D]){B.push(encodeURIComponent(D)+"=")
}else{B.push(r(G[D],F?F+"["+encodeURIComponent(D)+"]":encodeURIComponent(D)))}}return B.join("&")
}function n(C,B,D){var A=C[B];if(l.call(Object.prototype,B)){return}if(undefined===A){C[B]=D
}else{if(k(A)){A.push(D)}else{C[B]=[A,D]}}}function u(D){var A=D.length,C,E;for(var B=0;
B<A;++B){E=D[B];if("]"==E){C=false}if("["==E){C=true}if("="==E&&!C){return B}}}function p(B){try{return decodeURIComponent(B.replace(/\+/g," "))
}catch(A){return B}}},{}],26:[function(b,c,a){c.exports={clone:b("./ac-object/clone"),defaults:b("./ac-object/defaults"),extend:b("./ac-object/extend"),getPrototypeOf:b("./ac-object/getPrototypeOf"),isEmpty:b("./ac-object/isEmpty"),toQueryParameters:b("./ac-object/toQueryParameters")}
},{"./ac-object/clone":27,"./ac-object/defaults":28,"./ac-object/extend":29,"./ac-object/getPrototypeOf":30,"./ac-object/isEmpty":31,"./ac-object/toQueryParameters":32}],27:[function(b,c,a){var f=b("./extend");
c.exports=function d(g){return f({},g)}},{"./extend":29}],28:[function(b,c,a){var f=b("./extend");
c.exports=function d(h,g){if(typeof h!=="object"||typeof g!=="object"){throw new TypeError("defaults: must provide a defaults and options object")
}return f({},h,g)}},{"./extend":29}],29:[function(c,d,b){var a=Object.prototype.hasOwnProperty;
d.exports=function f(){var h;var g;if(arguments.length<2){h=[{},arguments[0]]}else{h=[].slice.call(arguments)
}g=h.shift();h.forEach(function(j){if(j!=null){for(var i in j){if(a.call(j,i)){g[i]=j[i]
}}}});return g}},{}],30:[function(c,d,b){var a=Object.prototype.hasOwnProperty;
d.exports=function f(i){if(Object.getPrototypeOf){return Object.getPrototypeOf(i)
}else{if(typeof i!=="object"){throw new Error("Requested prototype of a value that is not an object.")
}else{if(typeof this.__proto__==="object"){return i.__proto__}else{var g=i.constructor;
var h;if(a.call(i,"constructor")){h=g;if(!(delete i.constructor)){return null}g=i.constructor;
i.constructor=h}return g?g.prototype:null}}}}},{}],31:[function(c,d,b){var a=Object.prototype.hasOwnProperty;
d.exports=function f(g){var h;if(typeof g!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(h in g){if(a.call(g,h)){return false}}return true}},{}],32:[function(c,f,b){var a=c("qs");
f.exports=function d(g){if(typeof g!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return a.stringify(g)}},{qs:25}],33:[function(b,c,a){c.exports={observer:{Page:b("./ac-analytics/observer/Page"),Exit:b("./ac-analytics/observer/Exit"),Link:b("./ac-analytics/observer/Link"),Click:b("./ac-analytics/observer/Click"),Section:b("./ac-analytics/observer/Section"),Audio:b("./ac-analytics/observer/Audio"),Overlay:b("./ac-analytics/observer/Overlay"),Gallery:b("./ac-analytics/observer/Gallery"),Video:b("./ac-analytics/observer/Video")},regions:b("./ac-analytics/regions/regions")}
},{"./ac-analytics/observer/Audio":42,"./ac-analytics/observer/Click":43,"./ac-analytics/observer/Exit":44,"./ac-analytics/observer/Gallery":45,"./ac-analytics/observer/Link":46,"./ac-analytics/observer/Overlay":47,"./ac-analytics/observer/Page":48,"./ac-analytics/observer/Section":49,"./ac-analytics/observer/Video":50,"./ac-analytics/regions/regions":72}],34:[function(c,d,b){var g;
var a=c("./error-handler/ErrorHandler");var i=c("./Storage");var h="analytics-queue";
function f(){this._storage=i;this._arr=[];this._length=0}g=f.prototype;g.add=function(j){if(!j){a.log("Queue","add",j+" is not a valid object")
}if(a.exception){return}this._arr.push(j);this._updateQueueSize()};g.remove=function(){if(this.size()>0){this._arr.shift();
this._updateQueueSize()}};g.clear=function(){this._arr=[];this._length=0};g.peek=function(){if(this.size()>0){return this._arr[0]
}};g.isEmpty=function(){return(this.size()===0)};g.size=function(){return this._length
};g.load=function(){var j=this._storage.getItem(h);if(j){this._arr=JSON.parse(j);
this._storage.removeItem(h);this._updateQueueSize()}};g.save=function(){this._storage.setItem(h,JSON.stringify(this._arr));
this.clear()};g.collect=function(){var j=this._arr;var l=this._storage.getItem(h);
if(l){var k=JSON.parse(l);j=k.concat(j)}this._storage.setItem(h,JSON.stringify(j));
this.clear()};g.canSave=function(){return this._storage.isStorageAvailable()};g._updateQueueSize=function(){this._length=this._arr.length
};d.exports=f},{"./Storage":35,"./error-handler/ErrorHandler":38}],35:[function(c,d,b){var g;
var h=c("ac-base").onDOMReady;var i=c("./storage/localStorage");var a=c("./storage/userData");
function f(){if(i.available()){this.api=i}else{h(this.fallback.bind(this))}}g=f.prototype;
g.fallback=function(){if(a.available()){this.api=a}};g.setItem=function(j,k){if(!this.isStorageAvailable()){return
}this.api.setItem(j,k)};g.getItem=function(j){if(!this.isStorageAvailable()){return
}return this.api.getItem(j)};g.hasItem=function(j){if(!this.isStorageAvailable()){return
}return this.api.hasItem(j)};g.removeItem=function(j){if(!this.isStorageAvailable()){return
}this.api.removeItem(j)};g.clear=function(){if(!this.isStorageAvailable()){return
}this.api.clear()};g.isStorageAvailable=function(){if(i.available()===true||a.available()===true){return true
}return false};d.exports=new f();d.exports.Storage=f},{"./storage/localStorage":73,"./storage/userData":74,"ac-base":false}],36:[function(c,b,g){var h;
var l=c("ac-deferred").Deferred;var d=c("./Queue");var f=c("./plugins/plugins");
var k=c("./translator/translator");var j=c("./error-handler/ErrorHandler");var a="Tracker";
function i(m){if(typeof f[m]==="function"){this._plugin=new f[m]()}else{j.log(a,null,'Could not create a Tracker. "'+m+'" is not a valid plugin')
}if(j.exception){return}this.paused=false;this._queue=new d();this.resume()}h=i.prototype;
h.track=function(n){var m;if(!n||typeof n!=="object"||!n.type){j.log(a,"track",n+" is not a valid request object")
}if(j.exception){return}m=k.translate(n);m=this._plugin.translate(m);this._queue.add(m);
if(this.paused===true){this._queue.collect();return}this._run()};h.isPaused=function(){return this.paused
};h.resume=function(){if(this.paused===false){return}this._queue.load();var m=this._queue.size();
if(m===0){return}this.paused=false;this._run()};h._run=function(){var o;if(this._queue.size()===0){return
}var n=this._queue.peek();var m=n.options||{};if(typeof m.async==="undefined"){m.async=true
}if(m.async===false){o=this.sync(this.send.bind(this))}else{o=this.async(this.send.bind(this))
}o.then(function(){if(this.paused===false&&this._queue.size()>0){this._run()}}.bind(this))
};h.send=function(){if(typeof this._plugin.submit!=="function"){j.log(a,"send","provided plugin does not contain a valid submit method")
}if(j.exception){return}var m=this._queue.peek();this._plugin.submit(m);this._queue.remove()
};h.pause=function(){if(this.paused===true){return}if(!this.canPause()){return}if(this._queue.size()>0){this._queue.save()
}this.paused=true};h.canPause=function(){return this._queue.canSave()};h.async=function(n){var m=new l();
if((!n)||(typeof(n)!=="function")){j.log(a,"async",'Provided callback "'+n+'" is not a function')
}if(j.exception){return}setTimeout(function(){n();m.resolve()},0);return m.promise()
};h.sync=function(n){var m=new l();if((!n)||(typeof(n)!=="function")){j.log(a,"sync",'Provided callback "'+n+'" is not a function')
}if(j.exception){return}n();m.resolve();return m.promise()};b.exports=i},{"./Queue":34,"./error-handler/ErrorHandler":38,"./plugins/plugins":51,"./translator/translator":84,"ac-deferred":87}],37:[function(b,c,a){(function(){function d(h){var f;
var g={};var i;if(h&&h.length>0){f=h.split(",");if(f&&f.length>0){f.forEach(function(j){i=j.split(":");
g[i[0]]=i[1]})}}return g}c.exports={dataStringToObject:d}}())},{}],38:[function(d,f,c){var g;
var a=d("ac-console");var h="Analytics";function b(){this.exception=false;this.errors=[]
}g=b.prototype;g.log=function(j,i,l){var k=this._formatMessage(j,i,l);this.exception=true;
this.errors.push({instance:j,method:i,message:k});a.log(k)};g.report=function(j){var i="";
if(typeof j==="number"&&this.errors[j]){i=this.errors[j].message;a.log(this.errors[j].message)
}else{this.errors.forEach(function(k){i+=k.message+"\r\n"});a.log(i)}return i};
g._formatMessage=function(m,l,n){var k;var j="";var o=" : ";var i;if(!!m||!!l){i=(m&&l)?".":"";
j=(m||"")+i+(l||"")+o}return h+o+j+n};f.exports=new b()},{"ac-console":2}],39:[function(b,c,a){c.exports=b(38)
},{"ac-console":2}],40:[function(b,c,a){(function(){var k=b("ac-base").Array;var m=b("./error-handler/ErrorHandler");
var j=document.getElementsByTagName("head")[0];var l=k.toArray(j.getElementsByTagName("meta"));
var t="analytics";var n="^"+t+"-";var u=new RegExp(n);var v;var w=Date.now();var r="metadata";
function q(y){var x=o(y.track);if(!Array.isArray(x)||x.length===0){m.log(r,"_getProductname",'"track" meta tag value is malformed. e.g. "product name - page name"')
}if(m.exception){return}return x[0].trim()}function h(y){var x=o(y.track);if(!x||x.length<2){m.log(r,"_getPageName",'"track" meta tag value is malformed. e.g. "product name - page name"')
}if(m.exception){return}return x[0]+"-"+x[1]}function f(){var x=document.documentElement.lang;
if(!x){m.log(r,"_getLocale","html lang attribute can not be empty")}if(m.exception){return
}return x}function d(x){x=g(x);var y={};x.forEach(function(z){var A=p(z.getAttribute("property"));
var B=z.getAttribute("content");y[A]=B});return y}function g(y){var x=y.filter(function(z){var A=z.getAttribute("property");
return u.test(A)});return x}function p(y){var x=y.replace(t+"-","");return x.replace(/-+(.)?/g,function(z,A){return A?A.toUpperCase():""
})}function i(x){x.pageName=x.pageName||h(x);x.productName=x.productName||q(x);
x.locale=x.locale||f();x.initialTimeStamp=w;return x}function o(y,x){x=x||"-";if(typeof y!=="string"){m.log(r,"_strToArray",y+" is not a valid string")
}if(m.exception){return}return y.split(x)}v=d(l);c.exports=i(v)}())},{"./error-handler/ErrorHandler":38,"ac-base":false}],41:[function(b,d,a){var c=b("./Tracker");
d.exports=new c("sCode");d.exports.Tracker=c},{"./Tracker":36}],42:[function(d,c,h){var i;
var g=d("ac-object");var k=d("ac-base").Element;var b=d("ac-dom-events");var m=d("../metricsTracker");
var j=d("../error-handler/ErrorHandler");var f={mediaEvents:["play","pause","ended"]};
var a="AudioAnalyticsObserver";function l(o,n){if(!o){j.log(a,null,o+" is not a valid audio object")
}f.mediaEventCallbacks={ended:this._onEnded.bind(this)};this.options=g.defaults(f,n||{});
if(!Array.isArray(this.options.mediaEvents)){j.log(a,null,this.options.mediaEvents+" is not a valid media events array")
}if(j.exception){return}this.audio=o;this.tracker=m;this.defaultTracking=this.track.bind(this);
this.attachEvents()}i=l.prototype;i.attachEvents=function(){var o=this.options;
var n;var p;o.mediaEvents.forEach(function(q){n=o.mediaEventCallbacks[q];p=(typeof n==="function")?n:this.defaultTracking;
this.addListener(q,p)}.bind(this))};i.detachEvents=function(){var o=this.options;
var n;var p;o.mediaEvents.forEach(function(q){n=o.mediaEventCallbacks[q];p=(typeof n==="function")?n:this.defaultTracking;
this.removeListener(q,p)}.bind(this))};i.addListener=function(n,o){k.addEventListener(this.audio,n,o)
};i.removeListener=function(n,o){k.removeEventListener(this.audio,n,o)};i._onEnded=function(n){this.ended=true;
this.track(n)};i.track=function(o){var n={};n.ended=this.ended;this.tracker.track({type:"audio",event:o,data:n,options:this.options})
};c.exports=l},{"../error-handler/ErrorHandler":38,"../metricsTracker":41,"ac-base":false,"ac-dom-events":4,"ac-object":26}],43:[function(c,a,g){var h;
var k=c("ac-base").onDOMReady;var j=c("ac-base").Element;var f=c("ac-object");var l=c("../metricsTracker");
var i=c("../error-handler/ErrorHandler");var d={dataAttribute:"analytics-click"};
function b(m){if(i.exception){return}this.options=f.defaults(d,m||{});this.tracker=l;
k(this.addListener.bind(this))}h=b.prototype;h.addListener=function(){var m=j.selectAll("*[data-"+this.options.dataAttribute+"]");
m.forEach(function(o,n){j.addEventListener(o,"mouseup",this._track.bind(this))}.bind(this))
};h.removeListener=function(){var m=j.selectAll("*[data-"+this.options.dataAttribute+"]");
m.forEach(function(o,n){j.removeEventListener(o,"mouseup",this._track.bind(this))
}.bind(this))};h._track=function(n){var m={};var o=(n.currentTarget)?n.currentTarget:n.srcElement;
m.targetEl=o;this.tracker.track({type:"click",event:n,data:m,options:this.options})
};a.exports=b},{"../error-handler/ErrorHandler":38,"../metricsTracker":41,"ac-base":false,"ac-object":26}],44:[function(b,a,f){var g;
var d=b("ac-object");var h=b("ac-base").Element;var k=b("../metricsTracker");var i=b("../error-handler/ErrorHandler");
var c={async:false};function j(l){if(i.exception){return}this.options=d.defaults(c,l||{});
this.tracker=k;this.addExitListener()}g=j.prototype;g.addExitListener=function(){if("onbeforeunload" in window){h.addEventListener(window,"beforeunload",this._onBeforeUnload.bind(this))
}};g._onBeforeUnload=function(m){var l={};l.exitTimeStamp=m.timeStamp;this.tracker.track({type:"exit",event:m,data:l,options:this.options})
};a.exports=j},{"../error-handler/ErrorHandler":38,"../metricsTracker":41,"ac-base":false,"ac-object":26}],45:[function(d,c,h){var i;
var g=d("ac-object");var b=d("ac-dom-events");var k=d("ac-base").Element;var n=d("../metricsTracker");
var l=d("../metadata");var j=d("../error-handler/ErrorHandler");var f={galleryName:"gallery interaction",trackAutoRotate:false};
var a="GalleryAnalyticsObserver";function m(o,p){if(!o||typeof o!=="object"){j.log(a,null,o+" is not an object")
}if(j.exception){return}this.options=g.defaults(f,p||{});this.gallery=o;this.tracker=n;
this.previousInteractionType="auto";this.trackedInteractionTypes=[];this.incomingSlideTimestamp=l.initialTimeStamp;
this.addListener()}i=m.prototype;i.addListener=function(){this.gallery.on("didShow",this._track.bind(this))
};i.removeListener=function(){this.gallery.off("didShow",this._track.bind(this))
};i._track=function(p){if(this.options.trackAutoRotate===false){if(!p.interactionEvent||p.interactionEvent===this.gallery){return false
}}var o=g.clone(p);this.outgoingSlideTimestamp=this.incomingSlideTimestamp;this.incomingSlideTimestamp=Date.now();
o.incomingSlideTimestamp=this.incomingSlideTimestamp;o.outgoingSlideTimestamp=this.outgoingSlideTimestamp;
this.tracker.track({type:"gallery",data:o,observer:this,options:this.options})};
c.exports=m},{"../error-handler/ErrorHandler":38,"../metadata":40,"../metricsTracker":41,"ac-base":false,"ac-dom-events":4,"ac-object":26}],46:[function(c,b,h){var l=c("ac-base").onDOMReady;
var k=c("ac-base").Element;var g=c("ac-object");var a=c("ac-dom-events");var m=c("../metricsTracker");
var j=c("../error-handler/ErrorHandler");var i;var f={dataAttribute:"analytics-click",silent:true};
function d(n){if(j.exception){return}this.options=g.defaults(f,n||{});this.tracker=m;
l(this.addListener.bind(this))}i=d.prototype;i.addListener=function(){k.addEventListener(document.body,"mouseup",this._track.bind(this))
};i.removeListener=function(){k.removeEventListener(document.body,"mouseup",this._track.bind(this))
};i._track=function(q){var p={};var r;var n;var o=a.target(q);if(o.nodeName.toLowerCase()==="a"&&!o.getAttribute("data-"+this.options.dataAttribute)){r=o
}if(!r){n=k.ancestor(o,"a");if(n&&!n.getAttribute("data-"+this.options.dataAttribute)){r=n
}}if(r){p.targetEl=r;this.tracker.track({type:"link",event:q,data:p,options:this.options})
}};b.exports=d},{"../error-handler/ErrorHandler":38,"../metricsTracker":41,"ac-base":false,"ac-dom-events":4,"ac-object":26}],47:[function(c,b,g){var h;
var d=c("ac-object");var k=c("../metricsTracker");var i=c("../error-handler/ErrorHandler");
var f={interactionEvents:["open","close","reopen"]};var a="OverlayAnalyticsObserver";
function j(m,l){if(!m||typeof m!=="object"||typeof m.on!=="function"||typeof m.off!=="function"){i.log(a,null,m+" is not an object")
}f.interactionEventCallbacks={open:this._onOpen.bind(this),close:this._onClose.bind(this),reopen:this._onReopen.bind(this)};
this.options=d.defaults(f,l||{});if(!Array.isArray(this.options.interactionEvents)){i.log(a,null,this.options.interactionEvents+" is not a valid interaction events array")
}if(i.exception){return}this.overlay=m;this.tracker=k;this.active=false;this.defaultTracking=this.track.bind(this);
this.attachEvents()}h=j.prototype;h.attachEvents=function(){var m=this.options;
var l;var n;m.interactionEvents.forEach(function(o){l=m.interactionEventCallbacks[o];
n=(typeof l==="function")?l:this.defaultTracking;this.addListener(o,n)}.bind(this))
};h.detachEvents=function(){var m=this.options;var l;var n;m.interactionEvents.forEach(function(o){l=m.interactionEventCallbacks[o];
n=(typeof l==="function")?l:this.defaultTracking;this.removeListener(o,n)}.bind(this))
};h.addListener=function(l,m){this.overlay.on(l,m)};h.removeListener=function(l,m){this.overlay.off(l,m)
};h._onOpen=function(l){this.active=true;this.track(l)};h._onReopen=function(l){this.active=true;
this.track(l)};h._onClose=function(l){this.active=false;this.track(l)};h.track=function(m){var l=this.options.data||{};
l.active=this.active;this.tracker.track({type:"overlay",event:m,data:l,options:this.options})
};b.exports=j},{"../error-handler/ErrorHandler":38,"../metricsTracker":41,"ac-object":26}],48:[function(c,b,g){var h;
var j=c("ac-base").onDOMReady;var f=c("ac-object");var k=c("../metricsTracker");
var i=c("../error-handler/ErrorHandler");var d={};function a(l){if(i.exception){return
}this.options=f.defaults(d,l||{});this.tracker=k;this.data=this.options.data||{};
j(this._track.bind(this))}h=a.prototype;h._track=function(m){var l=this.options.data||{};
this.tracker.track({type:"page",event:m,data:l,options:this.options})};b.exports=a
},{"../error-handler/ErrorHandler":38,"../metricsTracker":41,"ac-base":false,"ac-object":26}],49:[function(c,b,g){var h;
var l=c("ac-base").onDOMReady;var f=c("ac-object");var j=c("ac-base").Element;var a=c("ac-element-engagement").ElementEngagement;
var m=c("../metricsTracker");var i=c("../error-handler/ErrorHandler");var d={dataAttribute:"analytics-section-engagement",autoSelect:false};
function k(n){if(i.exception){return}this.options=f.defaults(d,n||{});this.tracker=m;
l(this._onDOMReady.bind(this))}h=k.prototype;h._onDOMReady=function(){this.sections=j.selectAll("*[data-"+this.options.dataAttribute+"]");
if(this.sections.length>0){this._setPosition();this.options.elements=this.sections;
this._elementEngagement=new a(this.options);this._bindEvents();this._elementEngagement.start()
}};h._setPosition=function(){var n=this.sections.length;for(var o=0;o<n;o++){this.sections[o].position=o+1
}};h._bindEvents=function(){this._elementEngagement.on("thresholdenter",this._onThresholdenter.bind(this));
this._elementEngagement.on("thresholdexit",this._onThresholdexit.bind(this));this._elementEngagement.on("engaged",this._onEngaged.bind(this))
};h._onThresholdenter=function(n){return n};h._onThresholdexit=function(n){return n
};h._onEngaged=function(n){var o={element:n};this._track(o)};h._track=function(n){this.tracker.track({type:"section",data:n,options:this.options})
};b.exports=k},{"../error-handler/ErrorHandler":38,"../metricsTracker":41,"ac-base":false,"ac-element-engagement":20,"ac-object":26}],50:[function(c,b,g){var h;
var d=c("ac-object");var i=c("../error-handler/ErrorHandler");var j=c("../metricsTracker");
var f={mediaEvents:["play","ended"],mediaEventPrefix:"acv-"};var a="VideoAnalyticsObserver";
function k(m,l){if(!m||typeof m!=="object"){i.log(a,null,m+" is not an object")
}f.mediaEventCallbacks={play:this._onPlay.bind(this,"play"),ended:this._onEnded.bind(this,"ended")};
this.options=d.defaults(f,l||{});if(!Array.isArray(this.options.mediaEvents)){i.log(a,null,this.options.mediaEvents+" is not a valid media events array")
}if(i.exception){return}this.tracker=j;this.video=m;this.attachEvents()}h=k.prototype;
h.attachEvents=function(){var m=this.options;var l;var o;var n;m.mediaEvents.forEach(function(p){l=m.mediaEventCallbacks[p];
n="_boundMediaEventCallback_"+p;this[n]=(typeof l==="function")?l:this._defaultTracking.bind(this,p);
this.addListener(m.mediaEventPrefix+p,this[n])}.bind(this))};h.detachEvents=function(){var m=this.options;
var l;var o;var n;m.mediaEvents.forEach(function(p){n="_boundMediaEventCallback_"+p;
this.removeListener(m.mediaEventPrefix+p,this[n])}.bind(this))};h._onPlay=function(l,n){var m=this._bundleTrackingData(l,n);
this.playCount=(typeof this.playCount!=="undefined")?this.playCount+=1:0;m.playCount=this.playCount;
this.track(m)};h._onEnded=function(l,n){var m=this._bundleTrackingData(l,n);this.ended=true;
this.track(m)};h.addListener=function(l,m){this.video.on(l,m)};h.removeListener=function(l,m){this.video.off(l,m)
};h._getCommonVideoData=function(){var l={};l.targetEl=this.video.element;l.videoId=this.video.targetId;
l.ended=this.ended;return l};h._bundleTrackingData=function(m,n){var l=this._getCommonVideoData();
l.eventType=m;return d.extend(d.clone(n),l)};h._defaultTracking=function(l,n){var m=this._bundleTrackingData(l,n);
this.track(m)};h.track=function(l){this.tracker.track({type:"video",data:l,options:this.options})
};b.exports=k},{"../error-handler/ErrorHandler":38,"../metricsTracker":41,"ac-object":26}],51:[function(b,c,a){c.exports={sCode:b("./s-code/sCode")}
},{"./s-code/sCode":56}],52:[function(b,c,a){(function(){var f=b("ac-base").Element;
function d(h){if(f.isElement(h)&&h.href){var g=h.getAttribute("href");if(g.charAt(0)==="#"||g.indexOf("javascript:")>-1){return true
}}return false}c.exports={isIntraPageLink:d}}())},{"ac-base":false}],53:[function(b,c,a){(function(){var l=b("../../../error-handler/ErrorHandler");
var f="sCodePluginFormatter";function r(v){return v.toLowerCase()}function m(y,v){var x="www.";
var w={"fr-ca":"ca.fr"};x+=w[v]?w[v]:k(v);return x+"."+y}function u(x){var v="";
if(typeof x==="string"){var w=x.split("-");if(w&&w[2]){v=n(w[2]," ","")}}return v.toLowerCase()
}function p(x,v){var y="";var w={"fr-ca":"ca-fr"};var z=w[v];x=x||"";if(typeof v==="string"){v=v.toLowerCase();
y=z?w[v]:k(v);y=q(y)}return x.toLowerCase()+y}function o(v,w){v=v||"";w=w||"";return !!v?(v+"@"+w):w
}function t(w){var y;var v={"fr-ca":"ca/fr","en-419":"lae","en-ap":"asia"};var x=["fr-be","nl-be","fr-ch","de-ch"];
if(v[w]){y=v[w]}else{if(x.indexOf(w)>=0){y=w.split("-").reverse().join("-")}else{y=j(w)
}}return y}function k(w){var v;var x={"fr-be":"bf","nl-be":"bl","fr-ch":"cr","de-ch":"ce","en-419":"la","en-gb":"uk"};
if(x[w]){v=x[w]}else{v=j(w)}return v}function d(x){var w={};if(typeof(x)==="object"){for(var v in x){w[v]=i(x[v])
}}return w}function n(y,x,v){var w=y;x=(typeof x==="string")?x:"";v=(typeof v==="string")?v:"";
if(typeof w==="string"){w=w.replace(new RegExp(x,"g"),v)}return w}function j(v){if(!v){l.log(f,"_getCountryCodeFromLocale","locale should be a valid string")
}if(l.exception){return}var w=v.split("-");var x;if(w.length>1){x=w[1].toLowerCase()
}return x}function q(v){if(!v){l.log(f,"_decorateCountryCode","countryCode should be a valid string")
}if(l.exception){return}return" ("+v.toLowerCase()+")"}var h=/[\ì\î\ë\í]/g;function i(v){if(typeof v==="string"){v=v.replace(h,"")
}return v}function g(v){if(typeof v==="string"){v=v.toLowerCase()}return v}c.exports={productName:r,channel:m,pageName:p,eventString:o,countryCodeFilter:t,legacyCountryCode:k,cleanProps:d,stringReplacer:n,friendlyProductName:u,lowerCaseString:g}
}())},{"../../../error-handler/ErrorHandler":38}],54:[function(b,c,a){(function(){var k=b("../../../error-handler/ErrorHandler");
var h=b("./../../../metadata");var m={channel:"sChannel",campaign:"sCampaign",bucket:"sBucket",bucketProduct:"sBucketProduct"};
var d="sCodePluginMetadataHelper";function l(){var n=h[m.channel];if(!n){k.log(d,"channel","analytics-s-channel metadata tag must exist")
}if(k.exception){return}n=n.toLowerCase().split(" ").join(".");return n}function g(o){var n=m.bucket+o;
if(!h[n]){k.log(d,"bucket","analytics-s-bucket-"+o+" metadata tag must exist")}if(k.exception){return
}return h[n]}function j(n){var p=m.bucketProduct+n;var o=h[p];return o}function i(){return h[m.campaign]||""
}function f(){var q="other";var p=navigator.userAgent;var o={"mobile other":"/(kindle|silk-accelerated|android|webos|rim tablet os|windows phone)/i",windows:/windows/i,"iphone/ipod touch":/(iphone|ipod)/i,ipad:/(ipad)/i,Mac:/Mac OS X/i};
for(var n in o){if(p.match(o[n])){q=n;break}}return q}c.exports={channel:l,bucket:g,bucketProduct:j,platform:f,campaign:i}
}())},{"../../../error-handler/ErrorHandler":38,"./../../../metadata":40}],55:[function(b,c,a){(function(){var d=b("./formatter");
function g(h){return[{name:"{PAGE_NAME}",value:h.pageName},{name:"{CHANNEL}",value:h.channel},{name:"{CAMPAIGN}",value:h.campaign},{name:"{COUNTRY_CODE}",value:h.legacyCountryCode},{name:"{COUNTRY_CODE_FILTER}",value:h.countryCodeFilter},{name:"{PRODUCT_NAME}",value:h.productName},{name:"{FRIENDLY_PRODUCT_NAME}",value:h.friendlyProductName},{name:"{PLATFORM}",value:h.platform}]
}function f(i,h){if(typeof i==="string"){h.forEach(function(j){if(i.indexOf(j.name)>-1){i=d.stringReplacer(i,j.name,j.value)
}})}return i}c.exports={set:g,translate:f}}())},{"./formatter":53}],56:[function(f,c,h){var l;
var m=f("../../error-handler/errorHandler");var g=f("ac-object");var d=f("../../metadata");
var p=f("./helpers/formatter");var o=f("./helpers/metadata");var n=f("./translator/translator");
var b=f("./submit-methods/submitMethods");var j=f("./helpers/templateVar");var i=["us","ca|cn|de|es|fr|it|jp|uk","ap|at|au|bf|bl|br|ce|cn|cr|dk|fi|hk|ie|in|kr|la|mx|nl|no|nz|pl|pt|ru|se|sg|th|tw|za"];
var a="SCodePlugin";function k(){if(m.exception){return}this.setPageMetadata(d);
this.setFormattedValues();this.setTemplateVars();this.exportGlobalMethods()}l=k.prototype;
l.exportGlobalMethods=function(){var q=this.getBucket();if(typeof(window.Analytics)!=="object"){window.Analytics={}
}window.Analytics.getsAccount=function(){return q}.bind(this);window.Analytics.getsChannel=function(){return this.formattedValues.channel
}.bind(this);window.Analytics.getsPageName=function(){return this.formattedValues.pageName
}.bind(this);window.Analytics.setLinkInternalFilters=function(){return this.setLinkInternalFilters()
}.bind(this)};l.setPageMetadata=function(q){this.pageMetadata=g.clone(q);this.pageMetadata.platform=o.platform();
this.pageMetadata.channel=o.channel();this.pageMetadata.campaign=o.campaign();this.pageMetadata.pageName=p.lowerCaseString(this.pageMetadata.pageName);
this.pageMetadata.locale=p.lowerCaseString(this.pageMetadata.locale)};l.setFormattedValues=function(){this.formattedValues={pageName:p.pageName(this.pageMetadata.pageName,this.pageMetadata.locale),channel:p.channel(this.pageMetadata.channel,this.pageMetadata.locale),productName:p.productName(this.pageMetadata.productName),friendlyProductName:p.friendlyProductName(this.pageMetadata.track),countryCodeFilter:p.countryCodeFilter(this.pageMetadata.locale),legacyCountryCode:p.legacyCountryCode(this.pageMetadata.locale),campaign:this.pageMetadata.campaign,platform:this.pageMetadata.platform}
};l.setTemplateVars=function(){this.templateVarArr=j.set(this.formattedValues)};
l.clearProps=function(){if(window.s){s.prop4=s.g_prop4=s.prop6=s.g_prop6=s.pageURL=s.g_pageURL=s.g_channel=""
}};l.translate=function(q){if(!q||typeof q!=="object"){m.log(a,"translate","Request param ("+q+") is not an object")
}if(m.exception){return}q=n.translate(q,this.formattedValues,this.pageMetadata);
return q};l.submit=function(r){var q;if(!r||typeof r!=="object"){m.log(a,"submit","Request param ("+r+") is not an object")
}if(m.exception){return}if(!r.type||typeof r.type!=="string"){m.log(a,"submit",'property "type" ('+r.type+'") must be a string')
}if(!window.s||typeof window.s!=="object"){m.log(a,"submit","sCode ("+window.s+") is not an object")
}if(m.exception){return}q=r.options||{};this._setSCodeProps(r);if(q.silent!==true){if(r.submitMethod&&b[r.submitMethod]){b[r.submitMethod](r,this.formattedValues)
}}};l.setLinkInternalFilters=function(){var q;if(this.formattedValues.countryCodeFilter!=="us"){q=this.formattedValues.countryCodeFilter
}return q};l._setSCodeProps=function(t){var r=t.properties||{};t.data.linkTrackVars=t.data.linkTrackVars||[];
for(var q in r){if(q==="events"){s.linkTrackEvents=r[q]}if(q!=="title"){t.data.linkTrackVars.push(q);
s[q]=r[q]}}};l.getBucket=function(){var v=i.length;var q=2;for(var t=0;t<v;t++){if(i[t].indexOf(this.formattedValues.legacyCountryCode)!==-1){q=t;
break}}var r=o.bucket(q);var w=this._replaceTemplateVars(r);var u=this._replaceTemplateVars(o.bucketProduct(q));
return w+(!!u?(","+u):"")};l._replaceTemplateVars=function(q){return j.translate(q,this.templateVarArr)
};c.exports=k},{"../../error-handler/errorHandler":39,"../../metadata":40,"./helpers/formatter":53,"./helpers/metadata":54,"./helpers/templateVar":55,"./submit-methods/submitMethods":58,"./translator/translator":70,"ac-object":26}],57:[function(b,c,a){(function(){function f(k,i){var h=window.location.href;
var m=k.properties.title||"";var l;var j;if(typeof window.s==="object"){l=g(h)+((i.countryCodeFilter!=="us")?i.countryCodeFilter:"")+"/b/ss/"+s.un+"/"+(s.mobile?"5.1":"1")+"/"+s.version+"/s0"+Date.now()+"?ndh=1&t="+d()+"&fid="+s.fid+"&g="+h+"&pageName="+i.pageName+"&cc="+s.currencyCode+"&c3="+m+"&h1="+s.channel+"&pe=lnk_e&pev2="+m+"&s="+s.resolution+"&c="+s.colorDepth+"&j="+s.javascriptVersion+"&v="+s.javaEnabled+"&k="+s.cookiesEnabled+"&bw="+s.browserWidth+"&bh="+s.browserHeight+"&p="+s.plugins+"&r="+s.eVar49;
j=document.createElement("img");j.setAttribute("width","1");j.setAttribute("height","1");
j.setAttribute("border","0");j.src=l;return j}}function g(h){var j;var i;h=h.split("/");
j=h[0];i=h[2];return j+"//"+i+"/"}function d(){var h=new Date();return h.getDate()+"/"+h.getMonth()+"/"+h.getFullYear()+" "+h.getHours()+":"+h.getMinutes()+":"+h.getSeconds()+" "+h.getDay()+" "+h.getTimezoneOffset()
}c.exports=f}())},{}],58:[function(c,g,b){var f=c("./t");var a=c("./tl");var d=c("./manual");
g.exports={t:f,tl:a,manual:d}},{"./manual":57,"./t":59,"./tl":60}],59:[function(b,c,a){(function(){function d(g,f){if(window.s&&typeof window.s.t==="function"){s.pageName=f.pageName;
s.channel=f.channel;s.t()}}c.exports=d}())},{}],60:[function(b,c,a){(function(){var f=b("../../../error-handler/ErrorHandler");
var g="sCodePluginSubmitMethodtl";var d=b("../helpers/DOM");function i(n,m){var l;
var o;if(window.s&&s.tl&&typeof s.tl==="function"){if(typeof n.data!=="object"){f.log(g,"submit","Request param data ("+n.data+") is not an object")
}if(typeof n.properties.title!=="string"){f.log(g,"submit","Request param title ("+n.properties.title+") is not a string")
}if(f.exception){return}s.linkTrackVars="eVar54,eVar49";if(n.data.linkTrackVars&&n.data.linkTrackVars.length>0){s.linkTrackVars+=","+n.data.linkTrackVars.join(",")
}l=n.data.linkType||"o";o=k(n.data.targetEl);s.forcedLinkTrackingTimeout=h(n);s.tl(o,l,n.properties.title)
}}function h(n){var o=0;var m=n.data.targetEl;var l;if(n.type&&n.type==="link"){if(j(m)!==true){o=100
}}return o}function k(l){return j(l)}function j(l){var m;if(!l){return true}m=d.isIntraPageLink(l);
if(m){return true}return l}c.exports=i}())},{"../../../error-handler/ErrorHandler":38,"../helpers/DOM":52}],61:[function(b,c,a){(function(){var d=b("../../helpers/formatter");
function f(l,j,n){var h=l;var m=h.data;var g={play:"s",replay:"r",ended:"e",pause:"p"};
var k=" - ";var i={};i.prop13=d.eventString("a",g[m.interactionType])+k+n.pageName;
i.prop3=i.title=d.eventString("a",g[m.interactionType])+k+n.pageName+k+d.lowerCaseString(m.title);
i.prop4=m.audioSrc;h.properties=i;h.submitMethod="tl";return h}c.exports={translate:f}
}())},{"../../helpers/formatter":53}],62:[function(b,c,a){(function(){var i=b("../../../../Storage");
var d=b("../../../../data-attr/helper");var g=b("../../helpers/formatter");var f=b("../../helpers/DOM");
function h(m,u,l){var k=m;var o=k.data;var n=" - ";var q={};var p=o.targetEl.getAttribute("data-"+m.options.dataAttribute);
var j=d.dataStringToObject(p);var t=l.pageName+n+(k.data.linkImg||o.linkText.toLowerCase());
var v;var r=f.isIntraPageLink(o.targetEl);if(j.prop3){j.prop3=g.lowerCaseString(j.prop3)
}if(j.prefix){t=g.eventString(j.prefix,j.prop3||k.data.linkImg||o.linkText.toLowerCase())+n+l.pageName
}k.options.async=(!r)?false:true;q.prop3=q.title=(!j.prefix&&j.prop3)?l.pageName+n+j.prop3:t;
if(o.region){i.setItem("s_nav",o.region)}k.properties=q;k.submitMethod="tl";return k
}c.exports={translate:h}}())},{"../../../../Storage":35,"../../../../data-attr/helper":37,"../../helpers/DOM":52,"../../helpers/formatter":53}],63:[function(b,c,a){(function(){var d=b("../../helpers/formatter");
function f(l,i,n){var g=l;var m=g.data;var k=" - ";var h={};var j=((m.exitTimeStamp-n.initialTimeStamp)*0.001).toFixed(2);
h.prop3=j;h.title=d.eventString(j,n.pageName);g.properties=h;g.submitMethod="manual";
return g}c.exports={translate:f}}())},{"../../helpers/formatter":53}],64:[function(b,c,a){(function(){var d=b("../../../../error-handler/ErrorHandler");
var g=b("../../helpers/formatter");var f="sCodePluginGalleryTranslator";function h(l,r,k){var j=l;
var o=j.data;var m=" - ";var p={click:"mi",keydown:"ki",swipe:"si",dot:"bi",thumb:"gi",paddle:"pi",auto:"ai"};
var i;var n;var q={};q.events="";q.prop16=q.eVar16="";if(o.incomingInteractionType){if(p[o.incomingInteractionType]){n=p[o.incomingInteractionType]
}}if(o.outgoingInteractionType){if(p[o.outgoingInteractionType]){i=p[o.outgoingInteractionType]
}}if(!n){d.log(f,"translate",n+'" is not a valid interaction type for the incoming slide')
}if(!i){d.log(f,"translate",i+'" is not a valid interaction type for the outgoing slide')
}if(d.exception){return}q.prop2=g.eventString(n,o.incoming.id)+m+k.pageName+m+l.options.galleryName;
q.prop3=q.title=g.eventString(i,o.outgoing.id)+m+k.pageName+m+l.options.galleryName;
q.prop35=(typeof o.slideInViewTime==="number")?Math.floor((o.slideInViewTime/1000)%60):o.slideInViewTime;
if(o.newInteractionType===true){q.prop16=l.options.galleryName+" gallery interaction";
q.eVar16=o.outgoingInteractionType+" gallery interaction";q.events="event1"}j.properties=q;
j.submitMethod="tl";return j}c.exports={translate:h}}())},{"../../../../error-handler/ErrorHandler":38,"../../helpers/formatter":53}],65:[function(b,c,a){(function(){var h=b("../../../../Storage");
var f=b("../../helpers/formatter");var d=b("../../helpers/DOM");function g(k,r,j){var i=k;
var m=i.data;var l=" - ";var n=m.targetEl.getAttribute("href");var t=(n.indexOf("http://")>-1||n.indexOf("https://")>-1)?n.split("/")[2].split(".")[0]+" link":"";
var q=(m.region)?f.eventString(m.region.charAt(0),m.linkImg||m.linkText.toLowerCase()||m.linkId)+l+j.pageName:j.pageName+l+m.linkText.toLowerCase();
var p=d.isIntraPageLink(m.targetEl);var o={};o.prop3=o.title=q+((t!=="")?l+t:"");
i.options.async=(!p)?false:true;if(m.region){h.setItem("s_nav",m.region)}i.properties=o;
i.submitMethod="tl";return i}c.exports={translate:g}}())},{"../../../../Storage":35,"../../helpers/DOM":52,"../../helpers/formatter":53}],66:[function(b,c,a){(function(){var d=b("../../helpers/formatter");
function f(j,i,k){var g=j;var h={};g.properties=h;g.submitMethod="tl";return g}c.exports={translate:f}
}())},{"../../helpers/formatter":53}],67:[function(b,c,a){(function(){var i=b("../../../../Storage");
var d=b("../../helpers/formatter");var f=b("../../helpers/templateVar");function g(l,q,k){var j=l;
var m=j.data;var o=f.set(q);var p={};var t=h();var n=i.getItem("s_nav");for(var r in m){p[r]=m[r];
if(typeof p[r]==="string"){p[r]=f.translate(p[r],o)}}if(t){p.prop25=t}if(n){i.removeItem("s_nav");
p.prop25=n}if(!p.prop25){p.prop25="other nav or none"}j.properties=p;j.submitMethod="t";
return j}function h(){var j=document.referrer;var k=window.location.host;var l;
if(!j){l="direct entry"}if(j&&j!==""&&j.split("?")[0].indexOf(k)===-1){l="third party"
}return l}c.exports={translate:g}}())},{"../../../../Storage":35,"../../helpers/formatter":53,"../../helpers/templateVar":55}],68:[function(b,c,a){(function(){function d(i,l,h){var f=i;
var m=f.data.element;var j=" - ";var k={};var o=m.name||m.id||"";var g=m.thresholdExitTime-m.thresholdEnterTime;
var n=(m.element&&m.element.position)?" ."+m.element.position:"";k.prop34=k.title=h.pageName+j+o+j+"section engaged"+n;
k.prop35=(g/1000).toFixed(2);f.properties=k;f.submitMethod="tl";return f}c.exports={translate:d}
}())},{}],69:[function(b,c,a){(function(){var d=b("../../helpers/formatter");function g(k,q,j){var i=k;
var m=i.data;var l=" - ";var o={started:"s",replay:"r",ended:"e"};var p=(m.targetEl.href)?m.targetEl.href.split("/").pop():"";
var h=(m.eventType&&o[m.eventType])?o[m.eventType]:m.eventType;var n={};f(n);n.prop13=d.eventString("v",h)+": "+j.pageName+l+p;
if(m.eventType==="started"||m.eventType==="replay"){n.prop16=n.eVar16="video plays";
if(m.eventType==="started"){n.events="event2"}}else{if(m.eventType==="ended"){n.prop16=n.eVar16="video ends"
}}n.title=d.eventString("v",h)+l+j.pageName+l+m.videoId+l+p;i.properties=n;i.submitMethod="tl";
return i}function f(h){h.events="";h.prop16=h.eVar16=""}c.exports={translate:g}
}())},{"../../helpers/formatter":53}],70:[function(b,c,a){(function(){var d={audio:b("./component/audio"),gallery:b("./component/gallery"),link:b("./component/link"),click:b("./component/click"),overlay:b("./component/overlay"),page:b("./component/page"),section:b("./component/section"),video:b("./component/video"),exit:b("./component/exit")};
function f(i,g,j){var h=i;if(i.type&&d[i.type]){h=d[i.type].translate(i,g,j)}return h
}c.exports={translate:f,components:d}}())},{"./component/audio":61,"./component/click":62,"./component/exit":63,"./component/gallery":64,"./component/link":65,"./component/overlay":66,"./component/page":67,"./component/section":68,"./component/video":69}],71:[function(b,a,c){var d;
var i="analytics-region";var h=/(?:\w+:\w+)(?:,(?=(?:\w+:\w+))|$)/;var f=/[\w\s]+/;
var g=b("../data-attr/helper");function j(k){this.element=k;this.childRegions={};
this.parentRegion="";this.options=this._getDataOptions();this.name=this._setName()
}d=j.prototype;d._setName=function(){var k="";if(this.options.name){k=this.options.name
}if(!this.options.name&&this.element.id){this.options.name=this.element.id}return k
};d._getDataOptions=function(){var l={};var k=this.element.getAttribute("data-"+i);
k=k.charAt(k.length-1)===","?k.substr(0,k.length-1):k;if(this._isJSONable(k)){l=g.dataStringToObject(k)
}else{if(this._isSingleValue(k)){l.name=k}}return l};d._isJSONable=function(k){return h.test(k)
};d._isSingleValue=function(k){return f.test(k)};a.exports={Region:j,dataAttribute:i}
},{"../data-attr/helper":37}],72:[function(b,c,a){(function(){var f=b("ac-base").Element;
var l=b("./Region").Region;var k=b("./Region").dataAttribute;var d=[];var n={};
function j(){if(d.length>0){return d}var r=f.selectAll("[data-"+k+"]");var t;var o=r.length;
var q=0;function p(u){var v;while(f.isElement(r[q+1])&&u.element.contains(r[q+1])){v=new l(r[q+1]);
d.push(v);v.parentRegion=u.name;u.childRegions[v.name]=v;q+=1;p(v)}}for(q;q<o;q+=1){t=new l(r[q]);
n[t.name]=t;d.push(t);p(t)}return d}function m(){j();if(Object.keys(n).length>0){return n
}}function i(o){var q=j();if(f.isElement(o)){var p=h(o);if(p.length>0){return p.pop()
}}}function h(o){var p=j();if(f.isElement(o)){return p.filter(function(q){return q.element.contains(o)
})}}function g(o){var p=j();if(typeof o==="string"){return p.filter(function(q){return q.name===o
})}}c.exports={getTree:m,getAllRegions:j,getRegionByElement:i,getRegionByName:g,getRegionAncestryByElement:h}
}())},{"./Region":71,"ac-base":false}],73:[function(b,c,a){(function(){var d=b("ac-feature");
c.exports={available:function(){return d.localStorageAvailable()},setItem:function(f,g){localStorage.setItem(f,g)
},getItem:function(f){return localStorage[f]},hasItem:function(f){return(localStorage.getItem(f)===null)
},removeItem:function(f){localStorage.removeItem(f)},clear:function(){localStorage.clear()
}}}())},{"ac-feature":22}],74:[function(b,c,a){(function(){var f=b("ac-base").Element;
var d="ac-analytics-storage";c.exports={available:function(){this.storageEl=document.createElement("meta");
this.storageEl.setAttribute("property","ac-analytics-storage");this.storageEl.setAttribute("id","ac-analytics-storage");
f.insert(this.storageEl,document.getElementsByTagName("head")[0]);if(this.storageEl&&this.storageEl.addBehavior){this.storageEl.addBehavior("#default#userdata");
try{this.storageEl.load(d)}catch(g){return false}this.storageEl.expires=new Date((new Date()).getTime()+1).toUTCString();
return true}f.remove(this.storageEl);return false},setItem:function(g,h){this.storageEl.setAttribute(g,h);
this.storageEl.save(d)},getItem:function(g){this.storageEl.load(d);return this.storageEl.getAttribute(g)
},hasItem:function(g){this.storageEl.load(d);return(this.storageEl.getAttribute(g)===undefined)
},removeItem:function(g){this.storageEl.removeAttribute(g);this.storageEl.save(d)
},clear:function(){var h=this.storageEl.attributes.length;for(var g=0;g<h;g++){if(this.storageEl.attributes[g]!=="property"){this.storageEl.removeAttributeNode(this.storageEl.attributes[g])
}}this.storageEl.save(d)}}}())},{"ac-base":false}],75:[function(b,c,a){(function(){var g=b("ac-base").Element;
var d=b("ac-dom-events");var h={play:function(i){if(i.data.ended===true){return"replay"
}return"play"},ended:function(i){return i.event.type},pause:function(i){return i.event.type
}};function f(j){var i=j;var k=d.target(j.event);i.data.targetEl=k;if(k&&k.getAttribute("src")){i.data.audioSrc=k.getAttribute("src")
}if(!i.data.audioSrc){var l=g.select("source",k);if(l&&l.getAttribute("src")){i.data.audioSrc=l.getAttribute("src")
}}i.data.interactionType=(h[j.event.type])?h[j.event.type](j):j.event.type;i.data.title=i.data.targetEl.title||"No title found";
i.data.duration=i.data.targetEl.duration;i.data.currentTime=i.data.targetEl.currentTime;
return i}c.exports={translate:f}}())},{"ac-base":false,"ac-dom-events":4}],76:[function(b,c,a){(function(){var f=b("ac-base").Element;
var g=b("../../regions/regions");function d(l){var j=l;var h=f.select("img",l.data.targetEl);
var k;var i=g.getRegionByElement(l.data.targetEl);if(h){k=h.getAttribute("src");
j.data.linkImg=k.substring(k.lastIndexOf("/")+1,k.length);if(typeof j.data.linkImg==="string"){j.data.linkImg=j.data.linkImg.toLowerCase()
}}j.data.linkText=(typeof l.data.targetEl.innerText==="string")?l.data.targetEl.innerText.trim():l.data.targetEl.textContent.trim();
if(typeof i==="object"){j.data.region=i.name}return j}c.exports={translate:d}}())
},{"../../regions/regions":72,"ac-base":false}],77:[function(b,c,a){(function(){function d(g){var f=g;
return f}c.exports={translate:d}}())},{}],78:[function(b,c,a){(function(){var k=b("ac-base").Element;
var m={click:function(q){var p="click";var o=h(q);return o||p},auto:function(p){var o="auto";
return o},keydown:function(p){var o="keydown";return o},touchend:function(o){return l(o)
},touchstart:function(o){return l(o)},touchmove:function(o){return l(o)}};function f(r){var t=d(r);
var q=t;var o=r.observer;var p=r;if(m[t]){q=m[t](r)}p.data.targetEl=n(r);p.data.slideInViewTime=i(r);
p.data.outgoingInteractionType=r.observer.previousInteractionType;p.data.incomingInteractionType=q;
p.data.newInteractionType=j(p);o.previousInteractionType=q;return p}function h(r){var q=false;
var o=r.data.interactionEvent;var p=n(r);var t;if(p){t=k.ancestor(p,"nav");q=t?g(t.className):q
}return q}function g(p){var o=false;["paddle","dot","thumb"].some(function(q){if(p.indexOf(q)>=0){o=q;
return true}});return o}function n(q){var o=q.data.interactionEvent;var p=false;
if(o){p=o.target||o.srcElement}return p}function i(o){return o.data.incomingSlideTimestamp-o.data.outgoingSlideTimestamp
}function j(r){var q=false;var o=r.incomingInteractionType;var p=r.observer;if(p.trackedInteractionTypes.indexOf(r.incomingInteractionType)===-1){q=true;
p.trackedInteractionTypes.push(o)}return q}function d(q){var o;var p="auto";var r=q.data;
if(r.interactionEvent){o=r.interactionEvent.originalEvent||r.interactionEvent;p=o.type
}return p}function l(p){var o="swipe";return o}c.exports={translate:f}}())},{"ac-base":false}],79:[function(b,c,a){(function(){var f=b("ac-base").Element;
var g=b("../../regions/regions");function d(l){var j=l;var h=f.select("img",l.data.targetEl);
var k;var i=g.getRegionByElement(l.data.targetEl);j.data.linkText=(typeof l.data.targetEl.innerText==="string")?l.data.targetEl.innerText.trim():l.data.targetEl.textContent.trim();
if(l.data.targetEl.id){j.data.linkId=l.data.targetEl.id}if(h){k=h.getAttribute("src");
j.data.linkImg=k.substring(k.lastIndexOf("/")+1,k.length);if(typeof j.data.linkImg==="string"){j.data.linkImg=j.data.linkImg.toLowerCase()
}}if(typeof i==="object"){j.data.region=i.name}return j}c.exports={translate:d}
}())},{"../../regions/regions":72,"ac-base":false}],80:[function(b,c,a){(function(){function d(g){var f=g;
return f}c.exports={translate:d}}())},{}],81:[function(b,c,a){(function(){function d(g){var f=g;
return f}c.exports={translate:d}}())},{}],82:[function(b,c,a){(function(){function d(f){return f
}c.exports={translate:d}}())},{}],83:[function(b,c,a){(function(){var d={play:function(h){if(h.data.ended===true){return"replay"
}if(h.data.playCount===0){return"started"}return"play"}};var g={click:function(h){return h.data.event.type
}};function f(i){var h=i;h.data.eventType=(d[i.data.eventType])?d[i.data.eventType](i):i.data.eventType;
if(i.data.event&&g[i.data.event.type]){h.data.interactionType=g[i.data.event.type](i)
}return h}c.exports={translate:f}}())},{}],84:[function(b,c,a){(function(){var d=b("../error-handler/ErrorHandler");
var f={audio:b("./component/audio"),gallery:b("./component/gallery"),link:b("./component/link"),click:b("./component/click"),overlay:b("./component/overlay"),page:b("./component/page"),section:b("./component/section"),video:b("./component/video"),exit:b("./component/exit")};
function g(i){var h=i;if(i.type&&f[i.type]){if(typeof i.data!=="object"){d.log("Translator","translate","request.data ("+i.data+") must be an object")
}if(d.exception){return}h=f[i.type].translate(i)}return h}c.exports={translate:g,components:f}
}())},{"../error-handler/ErrorHandler":38,"./component/audio":75,"./component/click":76,"./component/exit":77,"./component/gallery":78,"./component/link":79,"./component/overlay":80,"./component/page":81,"./component/section":82,"./component/video":83}],85:[function(b,c,a){(function(d,f){if(typeof a==="object"&&a){c.exports=f
}else{if(typeof define==="function"&&define.amd){define(f)}else{d.Deferred=f}}}(this,(function(){var g={};
var f,l,n,d,k,j,m,h;f={0:"pending",1:"resolved",2:"rejected"};l=function(r,u){var q,v,t,p,o;
if(this._status!==0){if(console&&console.warn){console.warn("Trying to fulfill more than once.")
}return false}this.data=u;v=this.pending;t=v.length;for(q=0;q<t;q++){p=v[q];if(p[r]){o=p[r](u)
}if(typeof o==="object"&&o.hasOwnProperty("then")&&o.hasOwnProperty("status")){o.then(function(w){p.deferred.resolve(w)
},function(w){p.deferred.reject(w)},function(w){p.deferred.progress(w)})}else{p.deferred[r](o||undefined)
}}if(r!=="progress"){v=[]}return true};j=function(p,o){this.then=p;this.status=o
};m=j.prototype;h=function(o){return o};m.success=function(p,o){return this.then(p.bind(o),h,h)
};m.fail=function(p,o){return this.then(h,p.bind(o),h)};m.progress=function(p,o){return this.then(h,h,p.bind(o))
};d=function(o){if(typeof o!=="function"){return function(){}}return o};n=function(q,p,o){this.resolve=d(q);
this.reject=d(p);this.progress=d(o);this.deferred=new k()};k=function(){this.pending=[];
this._status=0;this._promise=new j(this.then.bind(this),this.status.bind(this))
};k.prototype={status:function(){return f[this._status]},promise:function(){return this._promise
},progress:function(o){l.call(this,"progress",o);return this._promise},resolve:function(o){l.call(this,"resolve",o);
if(this._status===0){this._status=1}return this._promise},reject:function(o){l.call(this,"reject",o);
if(this._status===0){this._status=2}return this._promise},then:function(t,q,p){var o,r;
r=new n(t,q,p);if(this._status===0){this.pending.push(r)}else{if(this._status===1&&typeof t==="function"){o=t(this.data);
if(typeof o==="object"&&o.hasOwnProperty("then")&&o.hasOwnProperty("status")){o.then(function(u){r.deferred.resolve(u)
},function(u){r.deferred.reject(u)},function(u){r.deferred.progress(u)})}else{r.deferred.resolve(o)
}}else{if(this._status===2&&typeof q==="function"){o=q(this.data);r.deferred.reject(o)
}}}return r.deferred.promise()}};var i=function(){var q,p,t,r,o;q=[].slice.call(arguments);
p=new k();t=0;r=function(v){t--;var u=q.indexOf(this);q[u]=v;if(t===0){p.resolve(q)
}};o=function(u){p.reject(u)};q.forEach(function(u){if(u.then){t++}});q.forEach(function(u){if(u.then){u.then(r.bind(u),o)
}});return p.promise()};k.when=i;g.Deferred=k;return g}())))},{}],86:[function(c,b,d){function g(){}g.prototype={resolve:function h(){this._defer.resolve.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},reject:function j(){this._defer.reject.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},progress:function a(){var k="ac-defer.progress is deprecated since it is not part of the A+ spec. Recommend using ac-event-emitter for progress signaling";
console.warn(k);this._defer.progress.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},then:function f(){this._defer.then.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},promise:function i(){return this._defer.promise.apply(this._defer,Array.prototype.slice.call(arguments))
}};b.exports=g},{}],87:[function(c,d,a){var h=new (c("./ac-deferred/Deferred"))(),g=c("smartsign-deferred").Deferred;
function b(){this._defer=new g()}b.prototype=h;d.exports.join=function i(){return g.when.apply(null,[].slice.call(arguments))
};d.exports.all=function f(j){return g.when.apply(null,j)};d.exports.Deferred=b
},{"./ac-deferred/Deferred":86,"smartsign-deferred":85}],88:[function(b,c,a){c.exports.EventEmitter=b("./ac-event-emitter/EventEmitter")
},{"./ac-event-emitter/EventEmitter":89}],89:[function(d,c,f){var h="EventEmitter:propagation";
var k=function(l){if(l){this.context=l}};var g=k.prototype;var i=function(){if(!this.hasOwnProperty("_events")&&typeof this._events!=="object"){this._events={}
}return this._events};var a=function(m,o){var p=m[0];var q=m[1];var n=m[2];if((typeof p!=="string"&&typeof p!=="object")||p===null||Array.isArray(p)){throw new TypeError("Expecting event name to be a string or object.")
}if((typeof p==="string")&&!q){throw new Error("Expecting a callback function to be provided.")
}if(q&&(typeof q!=="function")){if(typeof p==="object"&&typeof q==="object"){n=q
}else{throw new TypeError("Expecting callback to be a function.")}}if(typeof p==="object"){for(var l in p){o.call(this,l,p[l],n)
}}if(typeof p==="string"){p=p.split(" ");p.forEach(function(r){o.call(this,r,q,n)
},this)}};var j=function(o,p){var l;var m;var n;l=i.call(this)[o];if(!l||l.length===0){return
}l=l.slice();for(m=0,n=l.length;m<n;m++){if(p(l[m],m)){break}}};var b=function(m,n,o){var l=-1;
j.call(this,n,function(q,p){if(q.callback===o){l=p;return true}});if(l===-1){return
}m[n].splice(l,1)};g.on=function(){var l=i.call(this);a.call(this,arguments,function(n,o,m){l[n]=l[n]||(l[n]=[]);
l[n].push({callback:o,context:m})});return this};g.once=function(){a.call(this,arguments,function(m,o,l){var n=function(p){o.call(l||this,p);
this.off(m,n)};this.on(m,n,this)});return this};g.off=function(n,p){var m=i.call(this);
if(arguments.length===0){this._events={}}else{if(!n||(typeof n!=="string"&&typeof n!=="object")||Array.isArray(n)){throw new TypeError("Expecting event name to be a string or object.")
}}if(typeof n==="object"){for(var o in n){b.call(this,m,o,n[o])}}if(typeof n==="string"){var l=n.split(" ");
if(l.length===1){if(p){b.call(this,m,n,p)}else{m[n]=[]}}else{l.forEach(function(q){m[q]=[]
})}}return this};g.trigger=function(m,n,l){if(!m){throw new Error("trigger method requires an event name")
}if(typeof m!=="string"){throw new TypeError("Expecting event names to be a string.")
}if(l&&typeof l!=="boolean"){throw new TypeError("Expecting doNotPropagate to be a boolean.")
}m=m.split(" ");m.forEach(function(o){j.call(this,o,function(p){p.callback.call(p.context||this.context||this,n)
}.bind(this));if(!l){j.call(this,h,function(q){var p=o;if(q.prefix){p=q.prefix+p
}q.emitter.trigger(p,n)})}},this);return this};g.propagateTo=function(m,n){var l=i.call(this);
if(!l[h]){this._events[h]=[]}l[h].push({emitter:m,prefix:n})};g.stopPropagatingTo=function(o){var m=i.call(this);
if(!o){m[h]=[];return}var p=m[h];var n=p.length;var l;for(l=0;l<n;l++){if(p[l].emitter===o){p.splice(l,1);
break}}};g.has=function(l,t,p){var o=i.call(this);var m=o[l];if(arguments.length===0){return Object.keys(o)
}if(!m){return false}if(!t){return(m.length>0)?true:false}for(var n=0,q=m.length;
n<q;n++){var r=m[n];if(p&&t&&r.context===p&&r.callback===t){return true}else{if(t&&!p&&r.callback===t){return true
}}}return false};c.exports=k},{}],90:[function(b,c,a){a.Clock=b("./ac-animation-sequencer/Clock");
a.PlayerMonitor=b("./ac-animation-sequencer/PlayerMonitor");a.Timeline=b("./ac-animation-sequencer/Timeline");
a.Tween=b("./ac-animation-sequencer/Tween");a.BasicPlayer=b("./ac-animation-sequencer/player/BasicPlayer");
a.MediaPlayer=b("./ac-animation-sequencer/player/MediaPlayer");a.Pause=b("./ac-animation-sequencer/controllers/Pause");
a.MediaGroup=b("./ac-animation-sequencer/controllers/MediaGroup");a.BaseClip=b("./ac-animation-sequencer/clip/BaseClip");
a.CompositeClip=b("./ac-animation-sequencer/clip/CompositeClip");a.TimedClip=b("./ac-animation-sequencer/clip/TimedClip");
a.TweenClip=b("./ac-animation-sequencer/clip/TweenClip");a.ElementClip=b("./ac-animation-sequencer/clip/ElementClip");
a.VideoClip=b("./ac-animation-sequencer/clip/VideoClip");a.ReversibleVideo=b("./ac-animation-sequencer/adapters/ReversibleVideo")
},{"./ac-animation-sequencer/Clock":91,"./ac-animation-sequencer/PlayerMonitor":92,"./ac-animation-sequencer/Timeline":93,"./ac-animation-sequencer/Tween":94,"./ac-animation-sequencer/adapters/ReversibleVideo":97,"./ac-animation-sequencer/clip/BaseClip":98,"./ac-animation-sequencer/clip/CompositeClip":99,"./ac-animation-sequencer/clip/ElementClip":100,"./ac-animation-sequencer/clip/TimedClip":101,"./ac-animation-sequencer/clip/TweenClip":102,"./ac-animation-sequencer/clip/VideoClip":103,"./ac-animation-sequencer/controllers/MediaGroup":104,"./ac-animation-sequencer/controllers/Pause":105,"./ac-animation-sequencer/player/BasicPlayer":106,"./ac-animation-sequencer/player/MediaPlayer":107}],91:[function(b,c,a){function f(){this._currentTimeMS=0;
this._playbackRate=1;this._paused=true;this._resetStartTime()}var d=f.prototype;
d._updateCurrentTime=function(){var h,g=Date.now();if(this._paused){h=0}else{h=(g-this._startTime)
}this._currentTimeMS+=(h*this._playbackRate);this._startTime=g};d._resetStartTime=function(){this._startTime=Date.now()
};d.play=function(){this._resetStartTime();this._paused=false;return this};d.pause=function(){this._updateCurrentTime();
this._paused=true;return this};d.isPaused=function(){return this._paused};d.getCurrentTime=function(){this._updateCurrentTime();
return this._currentTimeMS/1000};d.setCurrentTime=function(g){if(isNaN(g)){return
}this._resetStartTime();this._currentTimeMS=g*1000};d.getPlaybackRate=function(){return this._playbackRate
};d.setPlaybackRate=function(g){if(isNaN(g)){return}this._playbackRate=g};c.exports=f
},{}],92:[function(c,f,a){var h=c("ac-event-emitter").EventEmitter;var b=c("./vendor/utils");
function d(j,k,i){i=(Array.isArray(k)?i:k)||{};k=(Array.isArray(k)?k:[]);this._player=j;
this._isMonitoring=true;this._times=[0];this._previous=0;this._currentTimeIndex=0;
this._options=b.defaults({active:true,readyEvent:"canplaythrough",autoInit:false},i);
if(this._options.autoInit){this.addPlayerListener(this._options.readyEvent,this._init.bind(this,k))
}}var g=d.prototype=new h();g.addPlayerListener=function(j,i){if(typeof this._player.addEventListener==="function"){this._player.addEventListener(j,i)
}else{if(typeof this._player.on==="function"){this._player.on(j,i)}}};g._init=function(i){if(this._initialized){return
}this.addTime(this._player.duration);if(i&&i.length){i.forEach(this.addTime.bind(this))
}this._resetNextTimes();this._attachEvents();if(this._options.active){this._listen()
}this.trigger("ready");this._initialized=true};g._attachEvents=function(){this.addPlayerListener("play",this._handlePlay.bind(this));
if(!this._options.active){this.addPlayerListener("timeupdate",this._listen.bind(this))
}this.addPlayerListener("seeking",this._handleSeek.bind(this));this.addPlayerListener("ratechange",this._handleRateChange.bind(this))
};g.addTime=function(i,j){i=parseFloat(i);if(isNaN(i)){throw new TypeError('Invalid time "'+i+'", expected Number"')
}if(this._times.indexOf(i)===-1){this._times.push(i);this._times.sort(function(l,k){return l-k
})}if(typeof j==="function"){this.on("time:"+i,j)}this._resetNextTimes()};g._handleSeek=function(){var j=this._player.currentTime;
var i=this._times.indexOf(j);this._currentTimeIndex=(i!==-1)?i:this._calcCurrentTimeIndex(j);
this._resetNextTimes()};g._handlePlay=function(){this._resetNextTimes();this._listen()
};g._handleRateChange=function(){var j=this._player.currentTime;var k=j===this._player.duration;
var i=this._times.indexOf(j)!==-1;this._currentTimeIndex=(k||i)?this._currentTimeIndex:this._calcCurrentTimeIndex(j);
this._resetNextTimes()};g._resetNextTimes=function(){var i=this._calcNextTimeIndex(this._currentTimeIndex);
if(b.isNum(i)){this._nextTimeIndex=i;this._nextTimePoint=this._times[i]}};g._calcCurrentTimeIndex=function(m){var j,l,k,i;
k=this._calcTimeIndices(m);l=k[0];j=k[1];i=(this._forwards())?l:j;return(this._validTimeIndex(i))?i:null
};g._validTimeIndex=function(i){return(0<=i&&i<=this._times.length-1)};g._calcNextTimeIndex=function(i){var j=i+((this._forwards())?1:-1);
return(this._validTimeIndex(j))?j:null};g._calcTimeIndices=function(j){var i=this._times.reduce(function(l,m,k){return(j>=this._times[l+1])?k:l
}.bind(this),0);return[i,i+1]};g._reachedNextTime=function(m){var l=this._forwards();
var j=this._nextTimePoint;var k=!this._player.paused||m===0||m===this._player.duration;
var n=l&&m>=j;var i=!l&&m<=j;return k&&(n||i)};g._forwards=function(){return this._player.playbackRate>0
};g._listen=function(){var j=this._player.currentTime;var i=this._previous;var k=this._reachedNextTime(j);
if(k){this._enterTimePoint(i)}this._previous=j;if(this._options.active&&!this._player.paused){window.requestAnimationFrame(this._listen.bind(this))
}};g._enterTimePoint=function(j){var i=this._calcNextTimeIndex(this._currentTimeIndex);
if(!b.isNum(i)){return}var k=this._times[i];this.trigger("time:"+k,{previous:j,next:this._player.currentTime,requested:k});
this._currentTimeIndex=i;this._resetNextTimes()};f.exports=d},{"./vendor/utils":110,"ac-event-emitter":88}],93:[function(b,c,a){var i=b("./clip/CompositeClip");
var h=b("./clip/TimedClip");var g="Invalid duration for the following clip; must be number greater than or equal to zero (0)";
var f='Invalid clip type: "';var d={clipTypes:{Tween:b("./clip/TweenClip"),Element:b("./clip/ElementClip")},create:function(j){if(this.validTimeline(j)){return this._buildTimeline(j)
}if(this.debug&&console&&typeof console.warn==="function"){console.warn("Timeline: invalid timeline data:",j)
}return null},validTimeline:function(j){return Array.isArray(j)&&j.every(this._validClip.bind(this))
},_getClipType:function(j){if(typeof j==="string"&&this.clipTypes[j]){j=this.clipTypes[j]
}if(this._isValidClipType(j)){return j}return false},_isValidClipType:function(j){return(j&&j.create)
},_validate:function(){return true},_buildTimeline:function(k){var j=k.map(this._createTimedClip.bind(this));
return new i(j)},_createTimedClip:function(k){var j=this._getClipType(k.clip);return new h(j.create(k),k)
},_validClip:function(m){var l;var j=this._getClipType(m.clip);var k=this._validDuration(m);
if(!j){throw new TypeError(f+m.clip+'"\n\n'+JSON.stringify(m))}l=j.validate||this._validate;
return k&&l(m)},_validDuration:function(k){var l=k.duration;var j=typeof l==="number"&&l>0;
if(!j){throw new TypeError(g+"\n\n"+JSON.stringify(k))}return j}};c.exports=d},{"./clip/CompositeClip":99,"./clip/ElementClip":100,"./clip/TimedClip":101,"./clip/TweenClip":102}],94:[function(b,a,d){var i=b("./vendor/KeySpline");
var g=b("./vendor/EasingFunctions");var k="Easing option must be one of: String, Array[Number:4], or Function. Given: ";
var c="KeySpline easing expected an array of exactly four (4) numbers, given: ";
var j=b("./vendor/utils");function h(l){l=l||{};j.defaultProps(this,h.defaults,l);
this._easingFunction=this._createEasing(this.easing)}h.defaults={from:0,to:1,duration:1,easing:"linear"};
var f=h.prototype;f._createEasing=function(l){var m;if(typeof l==="string"){m=this._createPredefinedEasing(l)
}else{if(Array.isArray(l)){m=this._createBezierEasing(l)}else{if(typeof l==="function"){m=l
}else{throw new TypeError(k+l)}}}return m};f._createBezierEasing=function(l){var n;
var o=l;var m=l.every(function(p){return(typeof p==="number")});if(l.length!==4||!m){throw new TypeError(c+l)
}n=new i(o[0],o[1],o[2],o[3]);return function(p,t,r,q){return t+n.get(p/q)*r}};
f._createPredefinedEasing=function(n){var m=g[n];var l="";if(!m){l+='Easing function "'+m;
l+='" not recognized among the following: ';l+=Object.keys(g).join(", ");throw new Error(l)
}return m};f._getInterpolatedValue=function(l,o,n,m){return this._easingFunction(l,o,n,m)
};f.valueAtLocation=function(m){if(m<0||m>1){return null}var l=this.duration*m;
return this.valueAtTime(l)};f.valueAtPercent=function(l){if(l<0||l>100){return null
}return this.valueAtLocation(l/100)};f.valueAtTime=function(l){if(l<0||l>this.duration){return null
}return this._getInterpolatedValue(l,this.from,this.to-this.from,this.duration)
};a.exports=h},{"./vendor/EasingFunctions":108,"./vendor/KeySpline":109,"./vendor/utils":110}],95:[function(c,d,b){function a(g){this._media=g
}var f=a.prototype;f.on=function(){this._media.addEventListener.apply(this._media,arguments)
};f.off=function(){this._media.removeEventListener.apply(this._media,arguments)
};f.getCurrentTime=function(){return this._media.currentTime};f.setCurrentTime=function(g){this._media.currentTime=g
};f.getDuration=function(){return this._media.duration};f.getPlaybackRate=function(){return this._media.playbackRate
};f.setPlaybackRate=function(g){this._media.playbackRate=g};d.exports=a},{}],96:[function(c,d,a){if(typeof Object.defineProperties!=="function"){return
}var g=c("ac-event-emitter").EventEmitter;function b(h){this._player=h}var f=b.prototype=new g();
f.addEventListener=function(){this._player.on.apply(this._player,arguments)};f.removeEventListener=function(){this._player.on.apply(this._player,arguments)
};f.play=function(){this._player.play.apply(this._player,arguments)};f.pause=function(){this._player.pause.apply(this._player,arguments)
};Object.defineProperties(b.prototype,{paused:{get:function(){return this._player.isPaused()
},set:function(h){this._player.setPaused(h)}},currentTime:{get:function(){return this._player.getCurrentTime()
},set:function(h){this._player.setCurrentTime(h)}},duration:{get:function(){return this._player.getDuration()
}},playbackRate:{get:function(){return this._player.getPlaybackRate()},set:function(h){this.trigger("ratechange",{rate:h});
this._player.setPlaybackRate(h)}}});d.exports=b},{"ac-event-emitter":88}],97:[function(b,c,a){if(typeof Object.defineProperties!=="function"){return
}var f=b("ac-event-emitter").EventEmitter;function g(h){this._media=h;this._lastTime=null;
g.passThroughEvents.forEach(this.passThroughEvent.bind(this));g.interceptedEvents.forEach(this.interceptEvent.bind(this))
}g.interceptedEvents=["seeking","play"];g.passThroughEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","playing","progress","ratechange","seeked","suspend","timeupdate","volumechange","waiting"];
var d=g.prototype=new f();d.addEventListener=function(h){var i=g.passThroughEvents;
if(i.indexOf(h)>-1){this._media.addEventListener.apply(this._media,arguments)}else{this.on.apply(this,arguments)
}};d.removeEventListener=function(h){var i=g.passThroughEvents;if(i.indexOf(h)>-1){this._media.removeEventListener.apply(this._media,arguments)
}else{this.off.apply(this,arguments)}};d.passThroughEvent=function(h){this._media.addEventListener(h,this._passThrough.bind(this))
};d.interceptEvent=function(h){var i=this["_on"+h];if(typeof i!=="undefined"){this._media.addEventListener(h,i.bind(this))
}};d._passThrough=function(h){this.trigger(h.type,h)};d._onseeking=function(){if(!this._playing){this.trigger("seeking")
}};d._onplay=function(){this.trigger("play")};d.play=function(){if(this.playbackRate<0){this._playing=true;
this._lastTime=null;window.requestAnimationFrame(this._update.bind(this));this.trigger("play")
}else{this._media.play()}};d.load=function(){this._media.load()};d._stop=function(h){h.preventDefault();
h.stopPropagation()};d._update=function(i){var j=i-(this._lastTime||i);var h=this._media.currentTime+((j*this.playbackRate)/1000);
if(h<=0){this._media.currentTime=0;this._playing=false;this.trigger("returned",{type:"returned"})
}else{this._media.currentTime=h;this.trigger("timeupdate",{type:"timeupdate"})}this._lastTime=i;
if(this._playing){window.requestAnimationFrame(this._update.bind(this))}};d.pause=function(){this._playing=false;
this._media.pause()};Object.defineProperties(g.prototype,{currentTime:{get:function(){return this._media.currentTime
},set:function(h){this._media.currentTime=h}},duration:{get:function(){return this._media.duration
}},buffered:{get:function(){return this._media.buffered}},playbackRate:{get:function(){return this._media.playbackRate
},set:function(h){this._media.playbackRate=h}},paused:{get:function(){return !this._playing&&this._media.paused
},set:function(h){this._media.paused=h}}});c.exports=g},{"ac-event-emitter":88}],98:[function(b,a,d){var h=b("../vendor/KeySpline");
var i=b("ac-style-renderer").LogRenderer;var g=b("../vendor/EasingFunctions");var l="Easing option must be one of: String, Array[Number:4], or Function. Given: ";
var c="KeySpline easing expected an array of exactly four (4) numbers, given: ";
var k=b("ac-event-emitter").EventEmitter;function j(n,m){this.options=m||{};this._renderer=this.options.renderer||i;
this._duration=n;this._currentTime=0;this._easingFunction=this._createEasing(this.options.easing||j.DEFAULT_EASING)
}j.DEFAULT_EASING="linear";var f=j.prototype=new k();f._createEasing=function(m){var n;
if(typeof m==="string"){n=this._createPredefinedEasing(m)}else{if(Array.isArray(m)){n=this._createBezierEasing(m)
}else{if(typeof m==="function"){n=m}else{throw new TypeError(l+m)}}}return n};f._createBezierEasing=function(m){var o;
var p=m;var n=m.every(function(q){return(typeof q==="number")});if(m.length!==4||!n){throw new TypeError(c+m)
}o=new h(p[0],p[1],p[2],p[3]);return function(q,u,t,r){return o.get(q/r)*t}};f._createPredefinedEasing=function(o){var n=g[o];
var m="";if(!n){m+='Easing function "'+n;m+='" not recognized among the following: ';
m+=Object.keys(g).join(", ");throw new Error(m)}return n};f._getInterpolatedValue=function(m,p,o,n){return this._easingFunction(m,p,o,n)
};f.getDuration=function(){return this._duration};f.getCurrentTime=function(){return this._currentTime
};f.setCurrentTime=function(m){this._currentTime=m;this.update()};f.getPlaybackRate=function(){return this._playbackRate
};f.setPlaybackRate=function(m){this._playbackRate=m};f.update=function(){};a.exports=j
},{"../vendor/EasingFunctions":108,"../vendor/KeySpline":109,"ac-event-emitter":88,"ac-style-renderer":143}],99:[function(b,c,a){var g=b("./TimedClip");
function f(h){if(h&&h.length){this._clips=h.map(this._ensureTimedClip);this._duration=this._calcDuration()
}}var d=f.prototype;d._calcDuration=function(h){h=h||this._clips;var i=h.reduce(function(k,l){var j=l.getStartDelay()+l.getDuration();
return(j>k)?j:k},0);return i};d._ensureTimedClip=function(h){if(!(h instanceof g)){h=new g(h)
}return h};d._getLocalTime=function(h,i){return i-h.getStartDelay()};d._getEligibleClips=function(){return this._clips
};d.addClip=function(h){h=this._ensureTimedClip(h);this._clips.push(h);this._duration=this._calcDuration()
};d.on=function(){var h=arguments;this._clips.forEach(function(i){i.on.apply(i,h)
})};d.off=function(){var h=arguments;this._clips.forEach(function(i){i.off.apply(i,h)
})};d.trigger=function(){var h=arguments;this._clips.forEach(function(i){i.trigger.apply(i,h)
})};d.setEasingDirection=function(h){this._clips.forEach(function(i){i.setEasingDirection(h)
})};d.getDuration=function(){return this._duration};d.getCurrentTime=function(){return this._currentTime
};d.setCurrentTime=function(j,i){var h=this._getEligibleClips();if(!h||!h.length){return
}h.forEach(function(k){var l=this._getLocalTime(k,j);k.setCurrentTime(l,i)}.bind(this))
};d.getPlaybackRate=function(){return this._playbackRate};d.setPlaybackRate=function(h){if(isNaN(h)){return
}this._playbackRate=h};c.exports=f},{"./TimedClip":101}],100:[function(c,a,d){var j=c("../vendor/utils");
var h=c("../Tween");var k=c("./BaseClip");var i=c("ac-style-renderer").InlineStyleRenderer;
var b="Invalid element or selector: ";function g(l){l=j.defaults(g.DEFAULTS,l);
this.props=l.props||[];if(l.selector||typeof l.element==="string"){this.el=document.querySelector(l.selector||l.element)
}else{this.el=l.element}if(!this.el||!this.el.nodeType||this.el.nodeType!==1){throw new TypeError(b+l.element)
}if(!l.renderer){this.renderer=i}k.call(this,l.duration,l);this._initProps()}g.DEFAULTS={props:[],selector:null,element:".default_selector",renderer:i,duration:1};
g.create=function(l){return new g(l)};g.validate=function(m){var l="selector" in m||"element" in m;
return l};var f=g.prototype=new k();f._initProps=function(){this.props.forEach(function(l){l.tween=this._createTween({easing:l.easing||k.DEFAULT_EASING,from:l.from,to:l.to,duration:this.getDuration()})
}.bind(this))};f._createTween=function(l){return new h(l)};f.update=function(m){if(this.props.length<1){return
}var l=this.props.map(function(q){var o=q.tween;var n=q.units;var p=o.valueAtTime(m);
p=(n?(p+n):p);return{prop:q.property,value:p}});this._renderer.render(this.el,l);
this.trigger("tween_update",{el:this.el,context:l})};f.getCurrentTime=function(){return this._currentTime
};f.setCurrentTime=function(l){if(l<0||l>this.getDuration()){return}this._currentTime=l;
this.update(this._currentTime)};a.exports=g},{"../Tween":94,"../vendor/utils":110,"./BaseClip":98,"ac-style-renderer":143}],101:[function(c,d,a){var b=c("../vendor/utils");
function g(i,h){h=b.defaults(g.DEFAULTS,(h||{}));this._clip=i;this._startDelay=h.startDelay||0;
this._loop=h.loop||false;this._fill=h.fill||"none"}g.DEFAULTS={fill:"none",loop:false,startDelay:0};
g.FILL_MODES=["none","forwards","backwards","both"];var f=g.prototype;f._show=function(){if(this._isHidden){this._isHidden=false;
this._clip.show()}};f._applyFill=function(n){if(this.getFill()==="none"){return
}var m=this.getDuration();var k=n>m;var j=this.getFill();var i=k&&j==="forwards";
var h=!k&&j==="backwards";var l=j==="both"||i||h;if(l){this._clip.setCurrentTime((k)?m:0)
}};f._hide=function(){if(!this._isHidden){this._isHidden=true;this._clip.hide()
}};f.setEasingDirection=function(h){return this._clip.setEasingDirection(h)};f.on=function(){this._clip.on.apply(this._clip,arguments)
};f.off=function(){this._clip.off.apply(this._clip,arguments)};f.trigger=function(){this._clip.trigger.apply(this._clip,arguments)
};f.getCurrentTime=function(){return this._currentTime};f.setCurrentTime=function(i,h){if(i<0||i>this.getDuration()){this._clip.inEffect=false;
this._applyFill(i)}else{this._clip.inEffect=true;this._clip.setCurrentTime(i,h)
}};f.getDuration=function(){return this._clip.getDuration()};f.getStartDelay=function(){return this._startDelay
};f.setStartDelay=function(h){if(b.isNum(h)){this._startDelay=h}};f.getLoop=function(){return this._loop
};f.setLoop=function(h){this._loop=!!h};f.getFill=function(){return this._fill};
f.setFill=function(i){var h=g.FILL_MODES;if(h.indexOf(i.toLowerCase())!==-1){this._fill=i
}};d.exports=g},{"../vendor/utils":110}],102:[function(c,d,b){var g=c("./BaseClip");
function a(j,i,h){if(typeof j==="object"){h=j;j=h.duration;i=h.props}g.call(this,j,h);
this.props=i||[];this._initializePropEasing();this._lastComputedTime=0;this._easingDirection=1
}a.create=function(h){return new a(h.duration,h.props)};a.validate=function(h){return(Array.isArray(h.props)&&h.props.length>0)
};a.DEFAULT_EASING="linear";var f=a.prototype=new g();f._initializePropEasing=function(){this.props.forEach(function(h){h.easing=this._createEasing(h.easing||g.DEFAULT_EASING)
}.bind(this))};f.setEasingDirection=function(h){this._easingDirection=h};f.update=function(k){var i=(this._easingDirection===-1);
if(this.options.reverseEase!==true){i=false}var j=this.getDuration(),h={};if(this.props.length<1){return
}this.props.forEach(function(n){var m;var l=n.property;if(i){m=n.easing(this.getDuration()-k,n.to,-(n.to-n.from),j)
}else{m=n.easing(k,n.from,(n.to-n.from),j)}h[l]=m}.bind(this));this.trigger("tween_update",h)
};f.getCurrentTime=function(){return this._currentTime};f.setCurrentTime=function(h){if(h<0){h=0
}if(h>this.getDuration()){h=this.getDuration()}if(h<0||h>this.getDuration()){return
}this._currentTime=h;this.update(this._currentTime)};d.exports=a},{"./BaseClip":98}],103:[function(c,d,b){var a=c("../adapters/MediaAsClip");
function f(h,g){if(console){console.warn("VideoClip deprecated, please use adapters/MediaAsClip.")
}return new a(h,g)}d.exports=f},{"../adapters/MediaAsClip":95}],104:[function(c,d,a){if(typeof Object.defineProperties!=="function"){return
}var h=c("ac-event-emitter").EventEmitter;var i=c("../Clock");var b=c("../vendor/utils");
function g(){var j=[].slice.call(arguments);this._mediaElements=j.filter(this._validateMediaElements);
this._clock=new i()}var f=g.prototype=new h();f.addEventListener=f.on;f.removeEventListener=f.off;
f._validateMediaElements=function(j){return(typeof j.play==="function")&&(typeof j.pause==="function")
};f._updateCurrentTime=function(j){this._lastTime=this._clock.currentTime;this._mediaElements.forEach(function(k){k.currentTime=j
})};f._isValidTime=function(j){return(0<=j)&&(j<=this.duration)};f.play=function(){this.paused=false;
this._clock.play();b.invoke(this._mediaElements,"play");this.trigger("play")};f.pause=function(){this.paused=true;
this._clock.pause();b.invoke(this._mediaElements,"pause");this.trigger("pause")
};Object.defineProperties(g.prototype,{paused:{get:function(){return this._paused
},set:function(j){this._paused=!!j}},currentTime:{get:function(){return this._clock.getCurrentTime()
},set:function(j){if(this._isValidTime(j)){this.trigger("seeking",{time:j});this._updateCurrentTime(j);
this.trigger("seeked",{time:j})}}},playbackRate:{get:function(){return this._clock.getPlaybackRate()
},set:function(j){if(!b.isNum(j)){return}this._clock.setPlaybackRate(j);this._mediaElements.forEach(function(k){k.playbackRate=j
});this.trigger("ratechange",{rate:j})}},duration:{get:function(){return this._duration
},set:function(j){this._duration=j}}});d.exports=g},{"../Clock":91,"../vendor/utils":110,"ac-event-emitter":88}],105:[function(b,d,a){var h=b("ac-event-emitter").EventEmitter;
var c=b("../PlayerMonitor");function f(k,i,j){j=j||{};this._player=k;this._monitor=new c(this._player,j);
this._monitor.on("ready",this._initPauses.bind(this,i));this._previousPauseIndex=0;
this._player.addEventListener("play",this._exitPause.bind(this),false)}var g=f.prototype=new h();
g._initPauses=function(i){this._pauses=this._processPauses(i);this._attachPauses(this._pauses)
};g._processPauses=function(i){i=i.filter(function(j){return(0<j)&&(j<this._player.duration)
}.bind(this));i=i.sort(function(k,j){return k-j});if(i[0]!==0){i.unshift(0)}if(i[i.length-1]!==this._player.duration){i.push(this._player.duration)
}return i};g._attachPauses=function(i){i.forEach(function(j){this._monitor.addTime(j,this._enterPause.bind(this))
}.bind(this))};g._enterPause=function(l){var j=l.requested;var i=this._previousPauseIndex;
var k=this._pauses.indexOf(j);if(i===k){return}this._atPausePoint=true;this._player.pause();
this._player.currentTime=j;this.trigger("pauseenter",{from:i,to:k});this._previousPauseIndex=k
};g._exitPause=function(){var k=this._player.currentTime;var j=this._forwards();
var l=j&&k===this._player.duration;var i=!j&&k===0;if(this._atPausePoint&&!(l||i)){this._atPausePoint=false;
this.trigger("pauseexit",{from:this._previousPauseIndex,to:this._calcNextPauseIndex()})
}};g._forwards=function(){return this._player.playbackRate>0};g._calcNextPauseIndex=function(){var i=this._previousPauseIndex;
var j=this._forwards();return i+((j)?1:-1)};d.exports=f},{"../PlayerMonitor":92,"ac-event-emitter":88}],106:[function(d,f,b){var h=d("ac-event-emitter").EventEmitter;
var i=d("../Clock");var c=d("../adapters/PlayerAsMedia");function a(k,j){j=j||{};
if(!k){throw new TypeError("BasicPlayer: Invalid clip provided",k)}this._clip=k;
this._paused=true;this.setClock(j.clock||new i());window.setTimeout(this._triggerStart.bind(this),0)
}var g=a.prototype=new h();g.addEventListener=g.on;g.removeEventListener=g.off;
g.play=function(){this._paused=false;this._clock.play();this._update();this.trigger("play")
};g.pause=function(){this.setPaused(true);this._clock.pause();this.trigger("pause")
};g._triggerStart=function(){this.trigger("canplay");this.trigger("canplaythrough")
};g._updateCurrentTime=function(j){this._clock.setCurrentTime(j);this._lastTime=this._clip.setCurrentTime(j)
};g._update=function(){var m=this._clock.getCurrentTime();var n=this.getDuration();
var l=this._clock.getPlaybackRate();var k=l>0;var o=k&&m>=n;var j=!k&&m<=0;if(o||j){m=(o)?n:0;
this.pause();this._updateCurrentTime(m)}this.trigger("timeupdate",{previous:this._lastTime,time:m});
if(o){this.trigger("ended")}if(j){this.trigger("returned")}if(!this.isPaused()){this._updateCurrentTime(m);
window.requestAnimationFrame(this._update.bind(this))}};g._isValidTime=function(j){return(0<=j)&&(j<=this.getDuration())
};g.asMedia=function(){return new c(this)};g.isPaused=function(){return this._paused
};g.setPaused=function(j){this._paused=!!j};g.getCurrentTime=function(){return this._clock.getCurrentTime()
};g.setCurrentTime=function(j){if(this._isValidTime(j)){this.trigger("seeking",{time:j});
this._updateCurrentTime(j);this.trigger("seeked",{time:j})}};g.getPlaybackRate=function(){return this._clock.getPlaybackRate()
};g.setPlaybackRate=function(j){this._clock.setPlaybackRate(j);this.trigger("ratechange",{rate:j})
};g.getDuration=function(){return this._clip.getDuration()};g.setClock=function(j){this._clock=j
};g.getClock=function(){return this._clock};f.exports=a},{"../Clock":91,"../adapters/PlayerAsMedia":96,"ac-event-emitter":88}],107:[function(d,f,c){var b=d("./BasicPlayer");
function a(h,g){var i=new b(h,g);if(console){console.warn("MediaPlayer module deprecated, please use adapters/PlayerAsMedia or #toMedia method on instances of BasicPlayer")
}return i.asMedia()}f.exports=a},{"./BasicPlayer":106}],108:[function(q,d,K){var x={linear:function F(O,M,N,L){return N*O/L+M
},easeInQuad:function n(O,M,N,L){return N*(O/=L)*O+M},easeOutQuad:function b(O,M,N,L){return -N*(O/=L)*(O-2)+M
},easeInOutQuad:function y(O,M,N,L){if((O/=L/2)<1){return N/2*O*O+M}return -N/2*((--O)*(O-2)-1)+M
},easeInCubic:function u(O,M,N,L){return N*(O/=L)*O*O+M},easeOutCubic:function i(O,M,N,L){return N*((O=O/L-1)*O*O+1)+M
},easeInOutCubic:function h(O,M,N,L){if((O/=L/2)<1){return N/2*O*O*O+M}return N/2*((O-=2)*O*O+2)+M
},easeInQuart:function j(O,M,N,L){return N*(O/=L)*O*O*O+M},easeOutQuart:function J(O,M,N,L){return -N*((O=O/L-1)*O*O*O-1)+M
},easeInOutQuart:function H(O,M,N,L){if((O/=L/2)<1){return N/2*O*O*O*O+M}return -N/2*((O-=2)*O*O*O-2)+M
},easeInQuint:function m(O,M,N,L){return N*(O/=L)*O*O*O*O+M},easeOutQuint:function a(O,M,N,L){return N*((O=O/L-1)*O*O*O*O+1)+M
},easeInOutQuint:function I(O,M,N,L){if((O/=L/2)<1){return N/2*O*O*O*O*O+M}return N/2*((O-=2)*O*O*O*O+2)+M
},easeInSine:function r(O,M,N,L){return -N*Math.cos(O/L*(Math.PI/2))+N+M},easeOutSine:function f(O,M,N,L){return N*Math.sin(O/L*(Math.PI/2))+M
},easeInOutSine:function B(O,M,N,L){return -N/2*(Math.cos(Math.PI*O/L)-1)+M},easeInExpo:function c(O,M,N,L){return(O===0)?M:N*Math.pow(2,10*(O/L-1))+M
},easeOutExpo:function E(O,M,N,L){return(O===L)?M+N:N*(-Math.pow(2,-10*O/L)+1)+M
},easeInOutExpo:function p(O,M,N,L){if(O===0){return M}if(O===L){return M+N}if((O/=L/2)<1){return N/2*Math.pow(2,10*(O-1))+M
}return N/2*(-Math.pow(2,-10*--O)+2)+M},easeInCirc:function t(O,M,N,L){return -N*(Math.sqrt(1-(O/=L)*O)-1)+M
},easeOutCirc:function g(O,M,N,L){return N*Math.sqrt(1-(O=O/L-1)*O)+M},easeInOutCirc:function C(O,M,N,L){if((O/=L/2)<1){return -N/2*(Math.sqrt(1-O*O)-1)+M
}return N/2*(Math.sqrt(1-(O-=2)*O)+1)+M},easeInElastic:function A(P,R,N,Q){var M=1.70158;
var O=0;var L=N;if(P===0){return R}if((P/=Q)===1){return R+N}if(!O){O=Q*0.3}if(L<Math.abs(N)){L=N;
M=O/4}else{M=O/(2*Math.PI)*Math.asin(N/L)}return -(L*Math.pow(2,10*(P-=1))*Math.sin((P*Q-M)*(2*Math.PI)/O))+R
},easeOutElastic:function z(P,R,N,Q){var M=1.70158;var O=0;var L=N;if(P===0){return R
}if((P/=Q)===1){return R+N}if(!O){O=Q*0.3}if(L<Math.abs(N)){L=N;M=O/4}else{M=O/(2*Math.PI)*Math.asin(N/L)
}return L*Math.pow(2,-10*P)*Math.sin((P*Q-M)*(2*Math.PI)/O)+N+R},easeInOutElastic:function D(P,R,N,Q){var M=1.70158;
var O=0;var L=N;if(P===0){return R}if((P/=Q/2)===2){return R+N}if(!O){O=Q*(0.3*1.5)
}if(L<Math.abs(N)){L=N;M=O/4}else{M=O/(2*Math.PI)*Math.asin(N/L)}if(P<1){return -0.5*(L*Math.pow(2,10*(P-=1))*Math.sin((P*Q-M)*(2*Math.PI)/O))+R
}return L*Math.pow(2,-10*(P-=1))*Math.sin((P*Q-M)*(2*Math.PI)/O)*0.5+N+R},easeInBack:function w(O,L,N,P,M){if(M===undefined){M=1.70158
}return N*(O/=P)*O*((M+1)*O-M)+L},easeOutBack:function l(O,L,N,P,M){if(M===undefined){M=1.70158
}return N*((O=O/P-1)*O*((M+1)*O+M)+1)+L},easeInOutBack:function G(O,L,N,P,M){if(M===undefined){M=1.70158
}if((O/=P/2)<1){return N/2*(O*O*(((M*=(1.525))+1)*O-M))+L}return N/2*((O-=2)*O*(((M*=(1.525))+1)*O+M)+2)+L
},easeInBounce:function v(O,M,N,L){return N-x.easeOutBounce(L-O,0,N,L)+M},easeOutBounce:function k(O,M,N,L){if((O/=L)<(1/2.75)){return N*(7.5625*O*O)+M
}else{if(O<(2/2.75)){return N*(7.5625*(O-=(1.5/2.75))*O+0.75)+M}else{if(O<(2.5/2.75)){return N*(7.5625*(O-=(2.25/2.75))*O+0.9375)+M
}else{return N*(7.5625*(O-=(2.625/2.75))*O+0.984375)+M}}}},easeInOutBounce:function o(O,M,N,L){if(O<L/2){return x.easeInBounce(O*2,0,N,L)*0.5+M
}return x.easeOutBounce(O*2-L,0,N,L)*0.5+N*0.5+M}};d.exports=x},{}],109:[function(b,c,a){
/*! MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
;
function d(o,l,n,j){this.get=function(p){if(o===l&&n===j){return p}return g(k(p),l,j)
};function i(p,q){return 1-3*q+3*p}function h(p,q){return 3*q-6*p}function f(p){return 3*p
}function g(r,p,q){return((i(p,q)*r+h(p,q))*r+f(p))*r}function m(r,p,q){return 3*i(p,q)*r*r+2*h(p,q)*r+f(p)
}function k(t){var q=t;for(var r=0;r<4;++r){var u=m(q,o,n);if(u===0){return q}var p=g(q,o,n)-t;
q-=p/u}return q}}c.exports=d},{}],110:[function(b,c,a){c.exports={isNum:function(d){return typeof d==="number"
},isArray:function(f){var d=Object.prototype.toString;return d.call(f)==="[object Array]"
},addClass:function(d,f){d.classList.add(f)},removeClass:function(d,f){d.classList.remove(f)
},hasClass:function(d,f){return d.contains(f)},defaults:function(g,f){var d={};
f=f||{};for(var h in g){if(g.hasOwnProperty(h)){d[h]=(f[h]!=null)?f[h]:g[h]}}return d
},defaultProps:function(h,g,d){var f=this.defaults(g,d);for(var i in f){if(f.hasOwnProperty(i)){h[i]=f[i]
}}},invoke:function(g,d){var f=[].slice.call(arguments,2);if(!Array.isArray(g)){throw new Error("List is not an array")
}g.forEach(function(h){var i=h[d];if(i&&typeof i==="function"){i.apply(h,f)}})}}
},{}],111:[function(b,c,a){c.exports=b(12)},{"./ac-dom-emitter/DOMEmitter":112}],112:[function(b,c,a){c.exports=b(13)
},{"ac-event-emitter":88}],113:[function(b,c,a){c.exports=b(25)},{}],114:[function(b,c,a){c.exports={clone:b("./ac-object/clone"),create:b("./ac-object/create"),defaults:b("./ac-object/defaults"),extend:b("./ac-object/extend"),getPrototypeOf:b("./ac-object/getPrototypeOf"),isDate:b("./ac-object/isDate"),isEmpty:b("./ac-object/isEmpty"),isRegExp:b("./ac-object/isRegExp"),toQueryParameters:b("./ac-object/toQueryParameters")}
},{"./ac-object/clone":115,"./ac-object/create":116,"./ac-object/defaults":117,"./ac-object/extend":118,"./ac-object/getPrototypeOf":119,"./ac-object/isDate":120,"./ac-object/isEmpty":121,"./ac-object/isRegExp":122,"./ac-object/toQueryParameters":123}],115:[function(b,c,a){c.exports=b(27)
},{"./extend":118}],116:[function(b,d,a){var f=function(){};d.exports=function c(g){if(arguments.length>1){throw new Error("Second argument not supported")
}if(g===null||typeof g!=="object"){throw new TypeError("Object prototype may only be an Object.")
}if(typeof Object.create==="function"){return Object.create(g)}else{f.prototype=g;
return new f()}}},{}],117:[function(b,c,a){var f=b("./extend");c.exports=function d(h,g){if(typeof h!=="object"){throw new TypeError("defaults: must provide a defaults object")
}g=g||{};if(typeof g!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return f({},h,g)}},{"./extend":118}],118:[function(b,c,a){c.exports=b(29)},{}],119:[function(b,c,a){c.exports=b(30)
},{}],120:[function(b,d,a){d.exports=function c(f){return Object.prototype.toString.call(f)==="[object Date]"
}},{}],121:[function(b,c,a){c.exports=b(31)},{}],122:[function(c,d,b){d.exports=function a(f){return window.RegExp?f instanceof RegExp:false
}},{}],123:[function(b,c,a){c.exports=b(32)},{qs:113}],124:[function(b,c,a){c.exports=b(14)
},{"./window-delegate/WindowDelegate":125,"./window-delegate/windowEmitter":126}],125:[function(b,c,a){c.exports=b(15)
},{"./windowEmitter":126}],126:[function(b,c,a){c.exports=b(16)},{"ac-dom-emitter":111}],127:[function(b,c,a){arguments[4][17][0].apply(a,arguments)
},{"./ac-element-tracker/ElementTracker":128}],128:[function(c,b,g){var h;var f=c("ac-object");
var i=c("ac-base").Element;var k=c("ac-base").Array;var m=c("window-delegate").WindowDelegate;
var j=c("./TrackedElement");var n=c("ac-event-emitter").EventEmitter;var d={autoStart:false};
function a(p,o){this.options=f.clone(d);this.options=typeof o==="object"?f.extend(this.options,o):this.options;
this.windowDelegate=m;this.tracking=false;this.elements=[];if(p&&(Array.isArray(p)||this._isNodeList(p)||i.isElement(p))){this.addElements(p)
}if(this.options.autoStart){this.start()}}h=a.prototype=new n();var l=/^\[object (HTMLCollection|NodeList|Object)\]$/;
h._isNodeList=function(o){if(!o){return false}if(typeof o.length!=="number"){return false
}if(typeof o[0]==="object"&&(!o[0]||!o[0].nodeType)){return false}return l.test(Object.prototype.toString.call(o))
};h._registerElements=function(o){o=[].concat(o);o.forEach(function(q){if(this._elementInDOM(q)){var p=new j(q);
p.offsetTop=p.element.offsetTop;this.elements.push(p)}},this)};h._registerTrackedElements=function(o){var p=[].concat(o);
p.forEach(function(q){if(this._elementInDOM(q.element)){q.offsetTop=q.element.offsetTop;
this.elements.push(q)}},this)};h._elementInDOM=function(q){var p=false;var o=document.getElementsByTagName("body")[0];
if(i.isElement(q)&&o.contains(q)){p=true}return p};h._onVPChange=function(){this.elements.forEach(function(o){this.refreshElementState(o)
},this)};h._elementPercentInView=function(o){return o.pixelsInView/o.height};h._elementPixelsInView=function(p){var t=0;
var r=p.top;var q=p.bottom;var o=this.windowDelegate.innerHeight;if(r<=0&&q>=o){t=o
}else{if(r>=0&&r<o&&q>o){t=o-r}else{if(r<0&&(q<o&&q>=0)){t=p.bottom}else{if(r>=0&&q<=o){t=p.height
}}}}return t};h._ifInView=function(o,p){if(!p){o.trigger("enterview",o)}};h._ifAlreadyInView=function(o){if(!o.inView){o.trigger("exitview",o)
}};h.addElements=function(o){o=this._isNodeList(o)?k.toArray(o):[].concat(o);o.forEach(function(p){this.addElement(p)
},this)};h.addElement=function(p){var o;if(i.isElement(p)){o=new j(p);this._registerTrackedElements(o)
}return o};h.removeElement=function(q){var p=[];var o;this.elements.forEach(function(r,t){if(r===q||r.element===q){p.push(t)
}});o=this.elements.filter(function(t,r){return p.indexOf(r)<0?true:false});this.elements=o
};h.stop=function(){if(this.tracking===true){this.tracking=false;this.windowDelegate.off("scroll resize orientationchange",this._onVPChange)
}};h.start=function(){if(this.tracking===false){this.tracking=true;this.windowDelegate.on("scroll resize orientationchange",this._onVPChange,this);
this.refreshAllElementStates()}};h.refreshAllElementStates=function(){this.elements.forEach(function(o){this.refreshElementState(o)
},this)};h.refreshElementState=function(o){var p=i.getBoundingBox(o.element);var q=o.inView;
o=f.extend(o,p);o.pixelsInView=this._elementPixelsInView(o);o.percentInView=this._elementPercentInView(o);
o.inView=o.pixelsInView>0;if(o.inView){this._ifInView(o,q)}if(q){this._ifAlreadyInView(o)
}return o};b.exports=a},{"./TrackedElement":129,"ac-base":false,"ac-event-emitter":88,"ac-object":114,"window-delegate":124}],129:[function(b,c,a){var d;
var g=b("ac-dom-emitter").DOMEmitter;function f(h){if(h.nodeType&&h.nodeType>0){this.element=h
}else{throw new TypeError("TrackedElement: "+h+" is not a valid DOM element")}this.inView=false;
this.percentInView=0;this.pixelsInView=0;this.offsetTop=0;this.top=0;this.right=0;
this.bottom=0;this.left=0;this.width=0;this.height=0;g.call(this,h)}d=f.prototype=new g(null);
c.exports=f},{"ac-dom-emitter":111}],130:[function(c,d,b){var a=c("./ac-keyboard/Keyboard");
d.exports=new a();d.exports.Keyboard=a;d.exports.keys=c("./ac-keyboard/keymap")
},{"./ac-keyboard/Keyboard":132,"./ac-keyboard/keymap":133}],131:[function(d,f,b){var c=d("ac-base").Object;
var a=["keyLocation"];function g(h){this.originalEvent=h;for(var i in h){if(typeof h[i]!=="function"&&a.indexOf(i)===-1){this[i]=h[i]
}}this.location=(this.originalEvent.keyLocation===undefined)?this.originalEvent.location:this.originalEvent.keyLocation
}g.prototype={preventDefault:function(){if(typeof this.originalEvent.preventDefault!=="function"){this.originalEvent.returnValue=false;
return}return this.originalEvent.preventDefault()},stopPropagation:function(){return this.originalEvent.stopPropagation()
}};f.exports=g},{"ac-base":false}],132:[function(f,c,h){var j=f("ac-base").Element;
var g=f("./KeyEvent");var n=f("ac-event-emitter").EventEmitter;var k=f("./keymap");
var l=0;var d=1;var a=2;var m=3;var i;function b(){this._keysDown=[];this._keyDownEmitter=new n();
this._keyUpEmitter=new n();j.addEventListener(document,"keydown",this._DOMKeyDown.bind(this),true);
j.addEventListener(document,"keyup",this._DOMKeyUp.bind(this),true);this._listening=[]
}i=b.prototype;i._castEventNameNumberToString=function(o){if(typeof o==="number"){return o.toString()
}return o};i._DOMKeyDown=function(p){var o=this._normalizeKeyboardEvent(p);var q=o.keyCode;
this._trackKeyDown(q);this._keyDownEmitter.trigger(q.toString(),o)};i._DOMKeyUp=function(p){var o=this._normalizeKeyboardEvent(p);
var q=o.keyCode;this._trackKeyUp(q);this._keyUpEmitter.trigger(q.toString(),o)};
i.addKeyDown=function(){var o=Array.prototype.slice.call(arguments);var p=o.shift();
if(p===undefined){throw new TypeError('Could not listen for keyup event on "'+p+'"')
}p=this._castEventNameNumberToString(p);return this._keyDownEmitter.on.apply(this._keyDownEmitter,[p].concat(o))
};i.addKeyUp=function(){var o=Array.prototype.slice.call(arguments);var p=o.shift();
if(p===undefined){throw new TypeError('Could not listen for keyup event on "'+p+'"')
}p=this._castEventNameNumberToString(p);return this._keyUpEmitter.on.apply(this._keyUpEmitter,[p].concat(o))
};i.removeKeyDown=function(){var o=Array.prototype.slice.call(arguments);var p=o.shift();
p=this._castEventNameNumberToString(p);return this._keyDownEmitter.off.apply(this._keyDownEmitter,[p].concat(o))
};i.removeKeyUp=function(){var o=Array.prototype.slice.call(arguments);var p=o.shift();
p=this._castEventNameNumberToString(p);return this._keyUpEmitter.off.apply(this._keyUpEmitter,[p].concat(o))
};i.isDown=function(o){return(this._keysDown.indexOf(o)!==-1)};i.isUp=function(o){return !this.isDown(o)
};i._trackKeyUp=function(p){var o=this._keysDown.indexOf(p);if(o!==-1){this._keysDown.splice(o,1)
}};i._trackKeyDown=function(o){if(this._keysDown.indexOf(o)===-1){this._keysDown.push(o)
}};i._normalizeKeyboardEvent=function(o){return new g(o)};c.exports=b},{"./KeyEvent":131,"./keymap":133,"ac-base":false,"ac-event-emitter":88}],133:[function(b,c,a){c.exports={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,COMMAND:91,CAPSLOCK:20,ESCAPE:27,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUMPAD_ZERO:96,NUMPAD_ONE:97,NUMPAD_TWO:98,NUMPAD_THREE:99,NUMPAD_FOUR:100,NUMPAD_FIVE:101,NUMPAD_SIX:102,NUMPAD_SEVEN:103,NUMPAD_EIGHT:104,NUMPAD_NINE:105,NUMPAD_ASTERISK:106,NUMPAD_PLUS:107,NUMPAD_DASH:109,NUMPAD_DOT:110,NUMPAD_SLASH:111,NUMPAD_EQUALS:187,TICK:192,LEFT_BRACKET:219,RIGHT_BRACKET:221,BACKSLASH:220,SEMICOLON:186,APOSTRAPHE:222,SPACEBAR:32,CLEAR:12,COMMA:188,DOT:190,SLASH:191}
},{}],134:[function(b,c,a){a.ScrollView=b("./ac-scrollview/ScrollView");a.MouseWheel=b("./ac-scrollview/input/MouseWheel");
a.ScrollBounds=b("./ac-scrollview/ScrollBounds");a.Y_AXIS="y";a.X_AXIS="x"},{"./ac-scrollview/ScrollBounds":136,"./ac-scrollview/ScrollView":137,"./ac-scrollview/input/MouseWheel":140}],135:[function(c,d,a){var b=c("ac-base").Object;
function f(g,h){this._parent=g;this._axis=h;this._inputs=[];this._startTouchMove=null;
this._shouldTouchEnd=false;this._checkToPreventDefault=false}f.prototype={_calculateTouchAngles:function(){var n={x:0,y:0};
var i=this._inputs[this._inputs.length-1];var k=this._inputs[0];var g=i.x-k.x;var m=i.y-k.y;
var l=Math.sqrt(g*g+m*m);if(l===0){return false}var j=Math.asin(m/l);var h=Math.acos(g/l);
n.x=j*(180/Math.PI);n.y=h*(180/Math.PI);n.y-=90;return n},inputStart:function(g,j,h,i){this._inputs=[{x:g,y:j}];
this._startTouchMove={x:g,y:j,timeStamp:h,e:i};this._shouldTouchEnd=false;this._checkToPreventDefault=true
},inputMove:function(g,n,j,k){this._inputs[1]={x:g,y:n};var h=45;var i=-h;var m=this._calculateTouchAngles();
var l=m[this._axis];if(l<=h&&l>=i||this._checkToPreventDefault===false){this._shouldTouchEnd=true;
this._checkToPreventDefault=false;if(this._startTouchMove!==null){this._parent.inputStart(this._startTouchMove.x,this._startTouchMove.y,this._startTouchMove.timeStamp,this._startTouchMove.e);
this._startTouchMove=null}k.preventDefault();this._parent.inputMove.apply(this._parent,arguments)
}},inputEnd:function(g,h){if(this._shouldTouchEnd===true){this._checkToPreventDefault=true;
this._parent.inputEnd.apply(this._parent,arguments)}},on:function(){return this._parent.on.apply(this._parent,arguments)
},off:function(){return this._parent.off.apply(this._parent,arguments)},trigger:function(){return this._parent.trigger.apply(this._parent,arguments)
},once:function(){return this._parent.once.apply(this._parent,arguments)}};d.exports=f
},{"ac-base":false}],136:[function(d,f,b){var c=d("ac-base").Object;function a(k,j,h,g){var i={maxPerSwipe:1,axis:"x"};
this.options=c.extend(i,g||{});this._grid=h;this._scrollInertia=k;this._scrollView=this._scrollInertia.getScrollView();
this._runningIndex=j;this._axisString=(this.options.axis==="x")?"left":"top"}a.prototype={calculateTargetIndex:function(){var g=(this._axisString==="left")?this._scrollView.getTouchContainerWidth():this._scrollView.getTouchContainerHeight();
var i=Math.round(this._scrollInertia.calculateFinalInertiaPosition()[this._axisString]/g);
var h=this._runningIndex;var j=(i-h);if(j>0&&i>h+this.options.maxPerSwipe){i=h+this.options.maxPerSwipe
}else{if(j<0&&i<h-this.options.maxPerSwipe){i=h-this.options.maxPerSwipe}}if(j>0&&i>this._grid[this._axisString].length-1){i=this._grid[this._axisString].length-1
}else{if(j<0&&i<0){i=0}}return i},calculateFuturePositions:function(){var g=this.calculateTargetIndex();
return{left:g*this._scrollView.getTouchContainerWidth(),top:g*this._scrollView.getTouchContainerHeight()}
}};f.exports=a},{"ac-base":false}],137:[function(c,b,h){var d=c("ac-base").Object;
var k=c("ac-base").Element;var o=c("ac-event-emitter").EventEmitter;var n=c("./TouchInertia");
var m=c("./input/MouseWheel");var l=c("./input/Touch");var j=c("./input/Input");
var i=c("./InputPreventDefault");var a=c("./model/Scroll");var f={startBounceDistance:0,endBounceDistance:0,axis:"y",touch:true,mouseWheel:false,mouse:false,preventDefault:true};
function g(q,p){this.options=d.extend(d.clone(f),p||{});this._element=q;this._touchContainerWidth=(typeof this.options.containerWidth==="number")?this.options.containerWidth:q.offsetWidth;
this._touchContainerHeight=(this.options.containerHeight||q.offsetHeight);this._innerScrollWidth=(this.options.innerWidth||q.offsetWidth)+this.options.startBounceDistance+this.options.endBounceDistance;
this._innerScrollHeight=(this.options.innerHeight||q.offsetHeight)+this.options.startBounceDistance+this.options.endBounceDistance;
this._scroll=new a();this._scrollPositions=[];this._inputNormalize=new j(this._scroll);
this._inputNormalize=new i(this._inputNormalize,this.options.axis);this._inputNormalize.on("input_start",this.inputStart,this);
this._inputNormalize.on("input_move",this.inputMove,this);this._inputNormalize.on("input_end",this.inputEnd,this);
if(this.options.touch===true){this._touch=new l(this._inputNormalize,q);this._touch.bindDOMEvents()
}if(this.options.mouseWheel===true){this._mouseWheel=new m(this._inputNormalize,q);
this._mouseWheel.bindDOMEvents()}}g.prototype={};g.prototype.__playInertia=function(q){var p=q.calculateInertiaPositions();
var r=function(u){var t=p[u];if(t===undefined||this._down===true){return}this._scroll.scrollTo(t.left,t.top);
window.requestAnimationFrame(function(){r(u+1)})}.bind(this);r(0)};g.prototype.getTouchContainerHeight=function(){return this._touchContainerHeight
};g.prototype.getTouchContainerWidth=function(){return this._touchContainerWidth
};g.prototype.setInnerWidth=function(p){this._innerScrollWidth=p;return this};g.prototype.setInnerHeight=function(p){this._innerScrollHeight=p;
return this};g.prototype.getInnerScrollWidth=function(){return this._innerScrollWidth
};g.prototype.getInnerScrollHeight=function(){return this._innerScrollHeight};g.prototype.getScrollYDistance=function(){var p=this.getInnerScrollHeight()-this.getTouchContainerHeight()-(this.options.startBounceDistance+this.options.endBounceDistance);
if(p<0){p=0}return p};g.prototype.getScrollXDistance=function(){var p=this.getInnerScrollWidth()-this.getTouchContainerWidth()-(this.options.startBounceDistance+this.options.endBounceDistance);
if(p<0){p=0}return p};g.prototype.inputStart=function(p,t,r,q){this._down=true;
this.trigger("scrollStart",{originalEvent:q,timeStamp:r})};g.prototype.inputMove=function(q){var p=q.scrollLeft;
var r=q.scrollTop;if(q.originalEvent.type==="mousewheel"){if(r>this.getScrollYDistance()){r=this.getScrollYDistance()
}else{if(r<0){r=0}}if(p>this.getScrollXDistance()){p=this.getScrollXDistance()}else{if(p<0){p=0
}}}this._scrollPositions.push({left:p,top:r,timeStamp:q.timeStamp});this._scroll.scrollTo(p,r)
};g.prototype.inputEnd=function(r){var w=true;var q=this._scrollPositions;var x=[];
var u=this._scrollPositions[this._scrollPositions.length-1];var t=r.timeStamp;if(u===null){return
}for(var v=0;v<q.length;v+=1){x[x.length]=q[v].left;x[x.length]=q[v].top;x[x.length]=q[v].timeStamp
}var p=new n(this,{left:this._scroll.scrollLeft,top:this._scroll.scrollTop},x,u.timeStamp,t);
this._down=false;this.trigger("inertiaStart",{originalEvent:r,originalEventName:"touchend",inertia:p,position:{left:this._scroll.scrollLeft,top:this._scroll.scrollTop},velocity:p.calculateVelocity(),preventDefault:function(){w=false
}});if(w===true){this.__playInertia(p)}this._scrollPositions=[]};g.prototype.once=function(){return this._scroll.once.apply(this._scroll,arguments)
};g.prototype.on=function(){return this._scroll.on.apply(this._scroll,arguments)
};g.prototype.off=function(){return this._scroll.off.apply(this._scroll,arguments)
};g.prototype.trigger=function(){return this._scroll.trigger.apply(this._scroll,arguments)
};g.prototype.scrollTo=function(q,p){return this._scroll.scrollTo(q,p)};b.exports=g
},{"./InputPreventDefault":135,"./TouchInertia":138,"./input/Input":139,"./input/MouseWheel":140,"./input/Touch":141,"./model/Scroll":142,"ac-base":false,"ac-event-emitter":88}],138:[function(d,f,b){var c=d("ac-base").Object;
function a(i,l,g,k,h,j){var m={frictionCoefficient:0.95,minFrictionVelocity:0.1};
this.options=c.extend(m,j||{});this._scrollView=i;this._currentPosition=l;this.__scrollLeft=this._currentPosition.left;
this.__scrollTop=this._currentPosition.top;this._positions=g;this._lastTouchMove=k;
this._timeStamp=h;this._frameRate=(1000/60)}a.prototype={__stepThroughFriction:function(m,l){var n=m+this._frictionVelocityX;
var k=l+this._frictionVelocityY;if(Math.abs(this._frictionVelocityX)<=this.options.minFrictionVelocity){n=m
}if(Math.abs(this._frictionVelocityY)<=this.options.minFrictionVelocity){k=l}this._frictionVelocityX*=this.options.frictionCoefficient;
this._frictionVelocityY*=this.options.frictionCoefficient;var h=0;var g=0;var j=0.03;
var i=0.08;if(n<this._minScrollLeft){h=this._minScrollLeft-n}else{if(n>this._maxScrollLeft){h=this._maxScrollLeft-n
}}if(k<this._minScrollTop){g=this._minScrollTop-k}else{if(k>this._maxScrollTop){g=this._maxScrollTop-k
}}if(h!==0){if(h*this._frictionVelocityX<=0){this._frictionVelocityX+=h*j}else{this._frictionVelocityX=h*i
}}if(g!==0){if(g*this._frictionVelocityY<=0){this._frictionVelocityY+=g*j}else{this._frictionVelocityY=g*i
}}return{left:n,top:k}},getScrollView:function(){return this._scrollView},calculateInertiaDuration:function(){var g=this.calculateInertiaPositions();
return g.length*this._frameRate},calculateVelocity:function(){var m=this._positions;
var h=m.length-1;var n=h;for(var l=h;l>0&&m[l]>(this._lastTouchMove-100);l-=3){n=l
}var p=m[h]-m[n];var g=this.__scrollLeft-(m[n-2]);var o=this.__scrollTop-(m[n-1]);
var j=g/p*this._frameRate;var k=o/p*this._frameRate;if((this._timeStamp-this._lastTouchMove)>=100){j=0;
k=0}if(isNaN(j)){j=0}if(isNaN(k)){k=0}return{left:j,top:k}},calculateInertiaPositions:function(){this._minScrollLeft=0;
this._minScrollTop=0;this._maxScrollLeft=this._scrollView.getScrollXDistance();
this._maxScrollTop=this._scrollView.getScrollYDistance();var g=this._positions;
var m=[];var j=this.calculateVelocity();this._frictionVelocityX=j.left;this._frictionVelocityY=j.top;
var l=this.__scrollLeft;var k=this.__scrollTop;var h;var i=0;if(Math.abs(this._frictionVelocityX)<this.options.minFrictionVelocity&&Math.abs(this._frictionVelocityY)<this.options.minFrictionVelocity){h=this.__stepThroughFriction(l,k)
}while((Math.abs(this._frictionVelocityX)>=this.options.minFrictionVelocity||Math.abs(this._frictionVelocityY)>=this.options.minFrictionVelocity)){h=this.__stepThroughFriction(l,k);
l=h.left;k=h.top;m.push(h)}if(l<this._minScrollLeft){l=this._minScrollLeft}else{if(l>this._maxScrollLeft){l=this._maxScrollLeft
}}if(k<this._minScrollTop){k=this._minScrollTop}else{if(k>this._maxScrollTop){k=this._maxScrollTop
}}m[m.length-1]={left:l,top:k};return m},calculateFinalInertiaPosition:function(){var g=this.calculateInertiaPositions();
if(g.length===0){return{left:this.__scrollLeft,top:this.__scrollTop}}return g[g.length-1]
}};f.exports=a},{"ac-base":false}],139:[function(b,c,a){var f=b("ac-event-emitter").EventEmitter;
function g(h){this._startingInputPosition=null;this._lastInputPosition=null;this._inputPositions=[];
this._scroll=h}var d=g.prototype=new f();d.inputStart=function(h,l,j,i){var k={x:h,y:l,timeStamp:j};
this._inputPositions.push(k);this._startingInputPosition=k;this.trigger("input_start",{timeStamp:j,originalEvent:i})
};d.inputMove=function(h,m,k,i){var l={x:h,y:m,timeStamp:k};this._inputPositions.push(l);
this._lastInputPosition=l;var j=this.getScrollValues();this.trigger("input_move",{scrollLeft:j.x,scrollTop:j.y,timeStamp:k,originalEvent:i})
};d.inputEnd=function(i,h){this.trigger("input_end",{lastInputPosition:this._lastInputPosition,inputPositions:this._inputPositions.slice(),timeStamp:i,originalEvent:h});
this._inputPositions=[];this._lastInputPosition=null};d.getScrollValues=function(){var j=this._inputPositions[this._inputPositions.length-2];
var i=(j.x-this._lastInputPosition.x)+this._scroll.scrollLeft;var h=(j.y-this._lastInputPosition.y)+this._scroll.scrollTop;
return{x:i,y:h}};c.exports=g},{"ac-event-emitter":88}],140:[function(d,f,b){var g=d("ac-base").Element;
var c=d("ac-base").Object;function a(h,i){this._inputController=h;this._element=i;
this._scrollTop=0;this._scrollLeft=0;this._timeout=null;this._hasStarted=false;
this._boundMouseWheelComplete=this.mouseWheelComplete.bind(this);this._lastEvent=null;
this._velocities=[]}a.prototype={mouseWheelComplete:function(){this._scrollTop=0;
this._scrollLeft=0;this._hasStarted=false;this._inputController.inputEnd(new Date().getTime(),this._lastEvent);
this._lastEvent=null},onMouseWheel:function(k){var i;var h;var j;if(this._hasStarted===false){this._inputController.inputStart(this._scrollLeft,this._scrollTop,k.timeStamp,k);
this._hasStarted=true}i=this._scrollTop+k.wheelDeltaY;h=this._scrollLeft+k.wheelDeltaX;
this._lastEvent=c.clone(k);this._scrollTop=i;this._scrollLeft=h;this._inputController.inputMove(this._scrollLeft,this._scrollTop,k.timeStamp,k);
window.clearTimeout(this._timeout);this._timeout=window.setTimeout(this._boundMouseWheelComplete,100)
},bindDOMEvents:function(){g.addEventListener(this._element,"mousewheel",this.onMouseWheel.bind(this))
}};f.exports=a},{"ac-base":false}],141:[function(c,d,a){var f=c("ac-base").Element;
function b(g,h){this._input=g;this._element=h}b.prototype={bindDOMEvents:function(){var g=this._input;
var h=this._element;f.addEventListener(h,"touchstart",function(i){if(i.touches&&i.touches[0]&&i.touches[0].target&&i.touches[0].target.tagName.match(/input|textarea|select/i)){return
}g.inputStart(i.touches[0].pageX,i.touches[0].pageY,i.timeStamp,i)},false);f.addEventListener(h,"touchmove",function(i){g.inputMove(i.touches[0].pageX,i.touches[0].pageY,i.timeStamp,i)
},false);f.addEventListener(h,"touchend",function(i){g.inputEnd(i.timeStamp,i)},false);
f.addEventListener(h,"touchcancel",function(i){g.inputEnd(i.timeStamp,i)},false)
}};d.exports=b},{"ac-base":false}],142:[function(b,c,a){var f=b("ac-event-emitter").EventEmitter;
function g(){this.scrollLeft=0;this.scrollTop=0}var d=g.prototype=new f();d.scrollTo=function(i,h){if(i===this.scrollLeft&&h===this.scrollTop){return
}this.scrollLeft=i;this.scrollTop=h;this.trigger("scroll",{scrollTop:h,scrollLeft:i})
};c.exports=g},{"ac-event-emitter":88}],143:[function(b,c,a){c.exports.InlineStyleRenderer=b("./ac-style-renderer/InlineStyleRenderer");
c.exports.LogRenderer=b("./ac-style-renderer/LogRenderer")},{"./ac-style-renderer/InlineStyleRenderer":144,"./ac-style-renderer/LogRenderer":145}],144:[function(d,f,c){var a=(function(){var h,g;
if(a){return}g=document.createElement("div");h=["transform","webkitTransform","MozTransform","msTransform","oTransform"];
h.some(function(i){if(i in g.style){a=i;return true}});return a})();var b={transformFunctions:["none","matrix","translate","translateX","translateY","scale","scaleX","scaleY","rotate","skewX","skewY","matrix3d","translate3d","translateZ","scale3d","scaleZ","rotate3d","rotateX","rotateY","rotateZ","perspective"],render:function(i,g){var h=this._parseProps(g);
h.forEach(function(j){i.style[j.prop]=j.value})},_mergeTransformProps:function(g){var h=g.reduce(this._partialPropValue.bind(this),"");
return{prop:a,value:h}},_partialPropValue:function(h,i){var j=this._parseTransformFunction(i.prop);
var g=[h," ",j,"(",i.value,")"].join("");return g},_parseTransformFunction:function(g){return g.replace("transform-","")
},_isTransformFunction:function(g){return this.transformFunctions.indexOf(g)!==-1
},_parseProps:function(l){var k=[];var j=[];var n;var m;var o;for(var h=0,g=l.length;
h<g;h++){o=l[h];n=this._isTransformFunction(o.prop);[].push.call(n?j:k,o)}if(j.length){m=this._mergeTransformProps(j);
k.push(m)}return k}};f.exports=b},{}],145:[function(b,c,a){c.exports={render:function(g,f){var d=(arguments.length<2)?g:f;
console.log(d)}}},{}],146:[function(b,c,a){a.Gallery=b("./ac-gallery/Gallery");
a.builder=b("./ac-gallery/builder");a.Trigger=b("./ac-gallery/controller/Trigger");
a.MediaSegue=b("./ac-gallery/segue/MediaSegue");a.MediaRenderer=b("./ac-gallery/segue/media/MediaRenderer");
a.AnimationSequenceSegue=b("./ac-gallery/segue/AnimationSequence");a.CSSTransitionSegue=b("./ac-gallery/segue/CSSTransition");
a.FadeInCSSTransition=b("./ac-gallery/segue/FadeInCSSTransition");a.fadeInKeyframesGenerator=b("./ac-gallery/keyframe/fadeInKeyframesGenerator");
a.crossFadeKeyframesGenerator=b("./ac-gallery/keyframe/crossFadeKeyframesGenerator");
a.showHideKeyframesGenerator=b("./ac-gallery/keyframe/showHideKeyframesGenerator");
a.horizontalSliderKeyframesGenerator=b("./ac-gallery/keyframe/horizontalSliderKeyframesGenerator");
a.Touch=b("./ac-gallery/controller/Touch")},{"./ac-gallery/Gallery":147,"./ac-gallery/builder":148,"./ac-gallery/controller/Touch":149,"./ac-gallery/controller/Trigger":150,"./ac-gallery/keyframe/crossFadeKeyframesGenerator":158,"./ac-gallery/keyframe/fadeInKeyframesGenerator":159,"./ac-gallery/keyframe/horizontalSliderKeyframesGenerator":160,"./ac-gallery/keyframe/showHideKeyframesGenerator":161,"./ac-gallery/segue/AnimationSequence":165,"./ac-gallery/segue/CSSTransition":166,"./ac-gallery/segue/FadeInCSSTransition":167,"./ac-gallery/segue/MediaSegue":168,"./ac-gallery/segue/media/MediaRenderer":171}],147:[function(b,a,g){var j=b("ac-deferred").Deferred;
var l=b("ac-event-emitter").EventEmitter;var c=b("ac-base").Object;var f=b("./generator/Timeline");
var k=b("./segue/Segue");var d={transitionDuration:0.4,transitionEasing:"linear",locks:true,endless:false};
function i(q,m){var p;m=m||{};if(!q){throw new TypeError("Could not create gallery, no keyframes were specified")
}this._keyboard=null;p=c.clone(d);this.setOptions(c.extend(p,m),{replace:true});
if(this.options.keyboard){this.setKeyboard(this.options.keyboard)}this._keyframes=q;
this._selected=0;this._locked=false;var o=this.getTransitionDuration();var n=k.create({duration:0});
this._keyframes[0].draw()}var h=i.prototype=new l();h.setOptions=function(n,m){m=m||{};
if(m.replace===true){this.options=n}else{this.options=c.extend(this.options,n)}return this
};h.getSelectedKeyframe=function(){return this._keyframes[this._selected]};h.getSelected=function(){return this.getSelectedKeyframe.apply(this,arguments)
};h.getKeyframes=function(){return this._keyframes};h.getKeyframeIndex=function(m){return this._keyframes.indexOf(m)
};h.addKeyframe=function(n,m){m=m||{};if(typeof m.index!=="number"){this._keyframes.push(n)
}else{this._keyframes.splice(m.index,0,n)}this._trigger("keyframeAdd",{keyframe:n,index:this.getKeyframeIndex(n)},m);
return this};h.removeKeyframe=function(n,m){var o;m=m||{};if(this.getSelected()===n){throw new Error("Could not remove keyframe, it is the current selected Keyframe instance.")
}o=this.getKeyframeIndex(n);this._keyframes.splice(o,1);this._trigger("keyframeRemove",{keyframe:n,index:o},m);
return this};h.containsKeyframe=function(m){return(this._keyframes.indexOf(m)!==-1)
};h.numKeyframes=function(){return this._keyframes.length};h.eachKeyframe=function(n,m){this._keyframes.forEach(function(){n.apply(m,arguments)
});return this};h.getNext=function(){var m=this.getSelectedIndex()+1;var n;if(this.isEndless()===true&&m===this.numKeyframes()){m=0
}n=this._keyframes[m];if(n===undefined){n=null}return n};h.getPrevious=function(){var m=this.getSelectedIndex()-1;
var n;if(this.isEndless()===true&&m<0){m=this.numKeyframes()-1}n=this._keyframes[m];
if(n===undefined){n=null}return n};h.getSelectedIndex=function(){return this._selected
};h.showNext=function(m){var p=new j();var o=this.getNext();var n=p.promise();if(o!==null){n=this.show(o,m)
}else{p.reject()}return n};h.showPrevious=function(m){var p=new j();var n=this.getPrevious();
var o=p.promise();if(n!==null){o=this.show(n,m)}else{p.reject()}return o};h.showFirst=function(m){var n=this.getFirst();
return this.show(n,m)};h.showLast=function(m){return this.show(this.getLast(),m)
};h.getLastIndex=function(){return this._keyframes.length-1};h.getLast=function(){return this._keyframes[this.getLastIndex()]
};h._trigger=function(m,o,n){if(n&&n.silent===true){return}o.target=this;this.trigger(m,o)
};h.getTransitionDuration=function(){return this.options.transitionDuration};h.setTransitionDuration=function(o,n){var m=this.options.transitionDuration;
this.options.transitionDuration=o;this._trigger("transition-duration-change",{previous:m,duration:o},n||{})
};h.setTransitionEasing=function(o,m){var n=this.options.transitionEasing;this.options.transitionEasing=o;
this._trigger("transition-easing-change",{previous:n,easing:o},m||{})};h.toTimeline=function(o,n){var m=new f(this,o,n);
return m.getTimeline()};h.getFirst=function(){return this._keyframes[0]};h.getLocked=function(){return this._locked
};h.isLocked=function(){return this.getLocked()};h.setLocked=function(m){this._locked=m;
return this._locked};h.getEngaged=function(){return this._engaged};h.setEngaged=function(m){this._engaged=m;
this._trigger("updateengagement",{engaged:this._engaged});return this._engaged};
h.isEndless=function(){return this.options.endless};h.show=function(q,o){var u=new j();
var n;var m;var p;var r=k.create({duration:this.options.transitionDuration,easing:this.options.transitionEasing});
var t=u.promise();o=o||{};if(this.options.locks===true&&this.isLocked()===true){u.reject();
return t}this._locked=true;n=this._keyframes[this._selected];if(typeof q==="number"){m=this._keyframes[q]
}else{if(typeof q==="string"){m=this._keyframes.filter(function(v){return(v.id===q)
})[0]}else{m=q}}if(m===null){throw new TypeError('Could not show Keyframe with supplied query. Query "'+q+'" returned no items.')
}else{if(m===n){u.resolve();this._locked=false;return t}}p=c.extend({outgoing:n,incoming:m},o);
this._trigger("willShow",p,o);if(o.useTransition===false){t=t.then(this._afterShow.bind(this,n,m,p,o));
u.resolve();return t}return r.play(n,m).then(this._afterShow.bind(this,n,m,p,o))
};h.hasKeyboard=function(){return this._keyboard!==null};h.getKeyboard=function(){return this._keyboard
};h.setKeyboard=function(m){if(this._keyboard!==null){this._keyboard.removeKeyDown();
this._keyboard.removeKeyUp()}this._keyboard=m;return this};h.keyboardAddKeyDown=function(){this._keyboard.addKeyDown.apply(this._keyboard,arguments);
return this};h.keyboardAddKeyUp=function(){this._keyboard.addKeyUp.apply(this._keyboard,arguments);
return this};h.keyboardRemoveKeyDown=function(){this._keyboard.removeKeyDown.apply(this._keyboard,arguments);
return this};h.keyboardRemoveKeyUp=function(){this._keyboard.removeKeyUp.apply(this._keyboard,arguments);
return this};h.showPrevious=function(m){var p=new j();var n=this.getPrevious();
var o=p.promise();if(n!==null){o=this.show(n,m)}else{p.reject()}return o};h._afterShow=function(o,m,p,n){this.eachKeyframe(function(r,q){if(r.id===m.id){this._selected=q
}},this);this._locked=false;return this._trigger("didShow",p,n)};a.exports=i},{"./generator/Timeline":151,"./segue/Segue":169,"ac-base":false,"ac-deferred":87,"ac-event-emitter":88}],148:[function(j,b,z){var A=j("ac-base").Object;
var y=j("ac-base").Element;var l=j("ac-base").Environment;var t=j("ac-keyboard");
var g=j("ac-keyframe").Keyframe;var k;try{k=j("ac-analytics").observer.Gallery}catch(u){}var p=j("./Gallery");
var d=j("./controller/Trigger");var h=j("./observer/TriggerPainter");var i=j("./observer/PreviousNextTriggerPainter");
var a=j("./observer/ElementTracker");var x=j("./keyboard/defaultMap");var r=j("./keyframe/crossFadeKeyframesGenerator");
var m=j("./keyframe/showHideKeyframesGenerator");var f=j("./touch/builder");var c="Could not create gallery: there are both custom keyframes and keyframe elements specified";
var q="Could not create gallery: there are no keyframes or elements to generate keyframes from";
var o="Could not create gallery: there is no touch element, but requested touches to be turned on";
var w="Could not create gallery: triggerSelector should be a string";var v={locks:true,shouldUseKeyboard:true,keyboardMap:x};
b.exports=function n(K){K=K||{};K=A.extend(A.clone(v),K);var E=K.keyframes||[];
var H=K.keyframeElements||[];var M=K.shouldUseKeyboard||true;var F,L,D,B,I,C,J,G;
if(K.keyframes&&K.keyframeElements){throw new Error(c)}if(!E||E.length===0){if(H.length===0){return
}else{H=Array.prototype.slice.call(H);if(l.Feature.cssPropertyAvailable("opacity")&&l.Feature.cssPropertyAvailable("transition")){E=r(H)
}else{E=m(H)}}}K.keyboard=K.keyboard||new t.Keyboard();if(K.shouldUseKeyboard!==true){K.keyboard=undefined
}L=new p(E,K);if(L.hasKeyboard()){L.keyboardAddKeyDown(K.keyboardMap,L)}if(y.isElement(K.engagementElement)){C=new a(L,K.engagementElement)
}if(K.triggerSelector){if(typeof K.triggerSelector!=="string"){throw new Error(w)
}else{D=new d({gallery:L,el:K.triggerSelector});B=(K.activeTriggerClassname)?new h(L,K.triggerSelector,K.activeTriggerClassname):new h(L,K.triggerSelector);
L.on("willShow",B._paint,B);if(!L.isEndless()){I=new i(B);L.on("willShow",I._paint,I)
}}}if(K.touch){if(l.Feature.touchAvailable()&&K.touch!==false){if(!y.isElement(K.touchElement)){throw new Error(o)
}else{J=f(K.touchElement,L,K)}}}if(typeof k==="function"){G=new k(L,((typeof K.analytics==="object")?K.analytics:{}))
}F={gallery:L,elementTracker:C,trigger:D,triggerPainter:B,touchController:J,analytics:G};
return F}},{"./Gallery":147,"./controller/Trigger":150,"./keyboard/defaultMap":157,"./keyframe/crossFadeKeyframesGenerator":158,"./keyframe/showHideKeyframesGenerator":161,"./observer/ElementTracker":162,"./observer/PreviousNextTriggerPainter":163,"./observer/TriggerPainter":164,"./touch/builder":174,"ac-analytics":33,"ac-base":false,"ac-keyboard":130,"ac-keyframe":199}],149:[function(f,c,i){var g=f("ac-base").Object;
var h=f("ac-scrollview").ScrollView;var l=f("./../touch/TimelineRenderer");var a=f("ac-animation-sequencer").BasicPlayer;
var m=f("ac-animation-sequencer").TweenClip;var j=f("ac-base").EasingFunctions;
var k=f("ac-scrollview").ScrollBounds;var b=f("./../touch/GalleryGrid");function d(p,n,o){var q={axis:"x",scrollVelocity:1};
this._element=p;this.options=g.extend(q,o||{});this._gallery=n;this._axisString=(this.options.axis==="x")?"left":"top";
if(!this._gallery){throw new TypeError('Could not instantiate Touch Controller. "'+this._gallery+'" is not a valid gallery')
}this._player=this.options.player||new a(n.toTimeline(this.options.bounceOutKeyframe,this.options.bounceInKeyframe));
this._player.setCurrentTime(this._gallery.getTransitionDuration());this._inertiaPlayer=null;
this._enRoute=false;this._runningIndex=this._gallery.getSelectedIndex();this._scrollView=this.options.scrollView||this.__buildScrollView();
this._scrollRenderer=this.options.scrollRenderer||this.__buildScrollRenderer();
this._scrollRenderer.render(this._scrollView.scrollLeft);this._gallery.on("didShow",this.onDidShow,this);
this._scrollView.on("scrollStart",this.onScrollStart,this);this._scrollView.on("inertiaStart",this.onInertiaStart,this);
this._scrollView.on("scroll",this.onScroll,this)}d.prototype={__generateEasingFunction:function(n){return function(q,o,p,r){return j.easeOutBack(q,o,p,r,n)
}},__buildScrollView:function(){var p=this._element.offsetWidth/this.options.scrollVelocity;
var n=this._element.offsetHeight/this.options.scrollVelocity;var o=g.extend(g.clone(this.options),{innerWidth:p*this._gallery.numKeyframes(),innerHeight:n*this._gallery.numKeyframes(),startBounceDistance:p,endBounceDistance:p,touchContainerWidth:p,touchContainerHeight:n});
return new h(this._element,o)},__buildScrollRenderer:function(){var n=g.extend(g.clone(this.options),{bounceDuration:this._gallery.getTransitionDuration()});
return new l(this._player,this._scrollView,n)},getAxis:function(){return this.options.axis||"x"
},getScrollView:function(){return this._scrollView},onDidShow:function(){var n=this._gallery.getSelectedIndex();
this._runningIndex=n;this._scrollView.scrollTo(n*this._scrollView.getTouchContainerWidth(),n*this._scrollView.getTouchContainerHeight())
},onScrollStart:function(){if(this._inertiaPlayer&&typeof this._inertiaPlayer.pause==="function"){this._inertiaPlayer.pause()
}this._scrollStartTimeout=window.setTimeout(function(){this._gallery.trigger("touchStart")
}.bind(this),100)},onScroll:function(p){var o=p.scrollLeft;var n=p.scrollTop;this._scrollRenderer.render(o,n);
this._gallery.trigger("scroll",{scrollLeft:o,scrollTop:n})},onInertiaStart:function(w){w.preventDefault();
this._gallery.trigger("touchEnd");var v=w.inertia;var o=new b(this._gallery,this._scrollView);
var p=new k(v,this._runningIndex,o.getGrid(),this.options);var u=v.calculateFinalInertiaPosition();
var r=p.calculateTargetIndex();var y=0.4;var t=p.calculateFuturePositions().left;
var B=3;var n=Math.abs(p.calculateFuturePositions().left-w.position.left);if(n!==0){y*=(Math.abs(n)/this._scrollView.getTouchContainerWidth())
}if((r-this._runningIndex)!==0){y=y/Math.abs(r-this._runningIndex)}var A=(Math.abs(n)/this._scrollView.getTouchContainerWidth());
var q=0;if(y<0.32&&y>0.15){y+=0.2;q=1.4}else{if(y<=0.15){y+=0.3;q=1.7}}if(q<0){q=0
}else{if(q>B){q=B}}var x=Math.abs(w.velocity.top)-3;if(x<0){x=0}else{if(x>B){x=B
}}var z=new m(y,[{property:"scrollLeft",from:w.position.left,to:p.calculateFuturePositions().left,easing:this.__generateEasingFunction(q)},{property:"scrollTop",from:w.position.top,to:p.calculateFuturePositions().top,easing:this.__generateEasingFunction(x)}]);
if(this._inertiaPlayer){this._inertiaPlayer.off("ended")}this._inertiaPlayer=new a(z);
z.on("tween_update",function(C){this._scrollView.scrollTo(C.scrollLeft,C.scrollTop)
},this);this._inertiaPlayer.play();this._inertiaPlayer.on("ended",function(){this._enRoute=false;
this._gallery.show(r,{useTransition:false,interactionEvent:w.originalEvent})},this);
this._runningIndex=r;this._enRoute=true}};c.exports=d},{"./../touch/GalleryGrid":172,"./../touch/TimelineRenderer":173,"ac-animation-sequencer":90,"ac-base":false,"ac-scrollview":134}],150:[function(c,d,b){var f=c("ac-base").Element;
var h=c("ac-base").Event;function a(i){i=i||{};this._el=i.el||"";this._id=i.id||"href";
this._method=i.method||"data-method";this.setGallery(i.gallery)}var g=a.prototype;
g.setGallery=function(i){this._gallery=i;if(this._gallery!==undefined){this._addListener()
}};g.getGallery=function(){return this._gallery};g.setEl=function(i){this._el=i;
this._removeListener();if(this._gallery!==undefined){this._addListener()}};g.getEl=function(){return this._el
};g.destroy=function(){this._removeListener();this.func=function(){}};g._addListener=function(){if(this._el!==""){this.func=this._onClickTrigger.bind(this);
f.addEventDelegate(document,"click",this._el,this.func)}};g._removeListener=function(){if(this.func){f.removeEventDelegate(document,"click",this._el,this.func);
this.func=null}};g._onClickTrigger=function(i){h.stop(i.originalEvent);this._click(i.currentTarget,i.originalEvent)
};g._click=function(j,i){var l={interactionEvent:i};if(j.getAttribute(this._method)){var m=j.getAttribute(this._method);
if(typeof this._gallery[m]==="function"){this._gallery[m].call(this._gallery,l)
}else{throw new Error(m+" is not a valid method to call")}}else{if(j.getAttribute(this._id)){var k=j.getAttribute(this._id).split("#")[1];
if(k!==""){this._gallery.show(k,l)}else{throw new Error("Trigger has no ID or method")
}}else{throw new Error("Trigger has no ID or method")}}};d.exports=a},{"ac-base":false}],151:[function(c,b,g){var i=c("ac-animation-sequencer").Timeline;
var h=c("ac-keyframe").Interpolation;var j=c("./../segue/media/MediaClip");var f=c("ac-animation-sequencer").TimedClip;
var a=c("ac-animation-sequencer").CompositeClip;i.clipTypes.Media=j;function d(k,m,l){this._gallery=k;
this._bounceOutKeyframe=m;this._bounceInKeyframe=l}d.prototype={getGallery:function(){return this._gallery
},getTimeline:function(){var m;var k=[];var o=this._gallery.getKeyframes().slice(0);
if(this._bounceInKeyframe){o.unshift(this._bounceInKeyframe)}if(this._bounceOutKeyframe){o.push(this._bounceOutKeyframe)
}var n=new h();n.setDuration(this._gallery.getTransitionDuration());for(var l=1;
l<o.length;l+=1){n.setStartKeyframe(o[l-1]).setEndKeyframe(o[l]);m=n.getClip();
m=new f(m,{startDelay:(l-1)*this._gallery.getTransitionDuration(),fill:"none"});
k.push(m)}return new a(k)}};b.exports=d},{"./../segue/media/MediaClip":170,"ac-animation-sequencer":90,"ac-keyframe":199}],152:[function(f,g,c){var h=f("./../helper/isTransformProperty");
var b=f("./../helper/camelCaseToHyphen");var a=f("./../helper/canTransitionStyle");
var d={zIndex:true,display:true,visibility:true,position:true};g.exports=function(q,l,n,m){var p=[];
var i=false;var k=n;var o=l;m=(typeof m==="number")?" "+m+"s":"";var j=m;q.forEach(function(r){var t=r.property;
if(d[t]===true){return}var v=(typeof r.easing==="string")?r.easing:n;var w=(typeof r.duration==="number")?r.duration:l;
var u=(typeof r.delay==="number")?" "+r.delay+"s":m;if(!a(t)){return}if(!h(t)){p.push(b(t)+" "+w+"s "+v+u)
}else{o=w;k=v;j=u;i=true}});if(i===true){p.push("-webkit-transform "+l+"s "+k+j)
}return p.join(",")}},{"./../helper/camelCaseToHyphen":153,"./../helper/canTransitionStyle":154,"./../helper/isTransformProperty":155}],153:[function(b,c,a){c.exports=function(d){return d.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()
}},{}],154:[function(b,c,a){var d=["display"];c.exports=function(f){return(d.indexOf(f)===-1)
}},{}],155:[function(b,d,a){var c=["matrix","translate","translateX","translateY","scale","scaleX","scaleY","rotate","skewX","skewY","matrix3d","translate3d","translateZ","scale3d","scaleZ","rotate3d","rotateX","rotateY","rotateZ","perspective"];
d.exports=function(f){return(c.indexOf(f)!==-1)}},{}],156:[function(f,g,a){var d=f("ac-deferred").Deferred;
var c=f("./buildTransitionString");var i=f("ac-style-renderer").InlineStyleRenderer;
var h=f("ac-base").Element;var b=f("ac-base").Object;g.exports=function(n,t,m,p,o){var j=new d();
var k=c(t,m,p,o);var q=[];var l;var r=function(u){if(u.target===n){h.removeVendorPrefixEventListener(n,"transitionEnd",r);
h.setVendorPrefixStyle(n,"transition","none");window.requestAnimationFrame(j.resolve.bind(j))
}};if(k!==""&&m!==0){h.addVendorPrefixEventListener(n,"transitionEnd",r);l=h.getVendorPrefixStyle(n,"transition")+",";
if(!/none/.test(l)&&l!==","){k=l+k}h.setVendorPrefixStyle(n,"transition",k)}else{window.requestAnimationFrame(j.resolve.bind(j))
}t.forEach(function(u){var v=b.clone(u);v.prop=v.property;if(v.units){v.value+=v.units
}q.push(v)});i.render(n,q);return j.promise()}},{"./buildTransitionString":152,"ac-base":false,"ac-deferred":87,"ac-style-renderer":143}],157:[function(b,c,a){var d=b("ac-keyboard").keys;
var f={};f[d.ARROW_LEFT]=function(g){g.preventDefault();if(this.getEngaged()){this.showPrevious({interactionEvent:g})
}};f[d.ARROW_RIGHT]=function(g){g.preventDefault();if(this.getEngaged()){this.showNext({interactionEvent:g})
}};c.exports=f},{"ac-keyboard":130}],158:[function(c,d,a){var f=c("ac-keyframe").Keyframe;
var b=c("ac-base").Object;var g={zIndex:1};d.exports=function(j,h){var i=[];h=b.extend(b.clone(g),h||{});
j.forEach(function(k,m){var l=[];j.forEach(function(n,o){l.push({element:n,props:[{property:"opacity",value:(o===m)?1:0},{property:"zIndex",value:(o===m)?(h.zIndex+1):h.zIndex}]})
});i.push(new f(k.id,l))});return i}},{"ac-base":false,"ac-keyframe":199}],159:[function(c,d,a){var g=c("ac-keyframe").Keyframe;
var f=c("./../segue/FadeInCSSTransition");var h=c("./../segue/CSSTransition");var b=c("ac-base").Object;
var i={zIndex:1};d.exports=function(l,j){var k=[];j=b.extend(b.clone(i),j||{});
l.forEach(function(m,o){var n=[];l.forEach(function(p,q){n.push({SegueType:f,element:p,props:[{property:"opacity",value:(q===o)?"1":"0"},{property:"zIndex",value:(q===o)?(j.zIndex+1):j.zIndex}]})
});k.push(new g(m.id,n))});return k}},{"./../segue/CSSTransition":166,"./../segue/FadeInCSSTransition":167,"ac-base":false,"ac-keyframe":199}],160:[function(c,d,b){var h=c("ac-base").Environment.Feature;
var f=c("ac-keyframe").Keyframe;var g=c("./../segue/CSSTransition");var a=c("./../segue/AnimationSequence");
d.exports=function(o){var l=(h.cssPropertyAvailable("transform"))?"translateX":"left";
var m=(h.cssPropertyAvailable("transition"))?g:a;var j={keyframes:[],bounceInKeyframe:null,bounceOutKeyframe:null};
var n=o[0].offsetWidth;o.forEach(function(p,r){var q=[];o.forEach(function(t,u){q.push({element:t,SegueType:m,props:[{property:l,value:-(n*r),units:"px"}]})
});j.keyframes.push(new f(p.id,q))});var i=[];o.forEach(function(p,q){i.push({element:p,props:[{property:l,value:n,units:"px"}]})
});j.bounceInKeyframe=new f("bounceIn",i);var k=[];o.forEach(function(p,q){k.push({element:p,props:[{property:l,value:-(n*(o.length)),units:"px"}]})
});j.bounceOutKeyframe=new f("bounceOut",k);return j}},{"./../segue/AnimationSequence":165,"./../segue/CSSTransition":166,"ac-base":false,"ac-keyframe":199}],161:[function(b,a,d){var h=b("ac-keyframe").Keyframe;
var f=b("ac-animation-sequencer").ElementClip;var j=b("ac-animation-sequencer").BaseClip;
var g=b("ac-animation-sequencer").Timeline;var c=b("ac-base").Object;var i=function(){f.apply(this,arguments)
};i.prototype=new j();c.extend(i.prototype,f.prototype);i.prototype.update=function(l){if(this.props.length<1){return
}var k=this.props.map(function(o){var m=o.units;var n=o.to;n=(m?(n+m):n);return{prop:o.property,value:n}
});this._renderer.render(this.el,k)};i.create=function(k){return new i(k)};g.clipTypes.Gallery_ShowHide=i;
a.exports=function(l){var k=[];l.forEach(function(m,o){var n=[];l.forEach(function(p,q){n.push({element:p,clipType:"Gallery_ShowHide",props:[{property:"display",value:(q===o)?"block":"none"}]})
});k.push(new h(m.id,n))});return k}},{"ac-animation-sequencer":90,"ac-base":false,"ac-keyframe":199}],162:[function(b,c,a){var d=b("ac-base").Element;
var f=b("ac-element-tracker");function g(h,j){if(!d.isElement(j)){return}this._gallery=h;
this._elementTracker=f;var i=this._elementTracker.addElement(j);this._gallery.setEngaged(false);
i.on("enterview",this._onEnterWithinThreshold,this);i.on("exitview",this._onExitWithinThreshold,this);
this._elementTracker.start();return this}g.prototype._onEnterWithinThreshold=function(h){this._gallery.setEngaged(true)
};g.prototype._onExitWithinThreshold=function(h){this._gallery.setEngaged(false)
};c.exports=g},{"ac-base":false,"ac-element-tracker":127}],163:[function(c,d,b){var f=c("ac-base").Element;
function a(h){if(h.getGallery()&&h.getGallery().isEndless()){return}this.triggerPainter=h;
var i={incoming:h.getGallery().getSelected()};this._paint(i)}var g=a.prototype;
g._paint=function(j){var m=j.incoming.id;var n=this.triggerPainter;var i=n.getGallery();
var o=n.getTriggerSelector();var l=f.selectAll(o+"[data-method]");var k=f.selectAll(o+'[data-method="showPrevious"]');
var h=f.selectAll(o+'[data-method="showNext"]');if(l){n._unpaintTriggers(l,"disabled");
if(m===i.getFirst().id){n._paintTriggers(k,"disabled")}else{if(m===i.getLast().id){n._paintTriggers(h,"disabled")
}}}};d.exports=a},{"ac-base":false}],164:[function(c,d,b){var f=c("ac-base").Element;
function a(i,j,k){this.setGallery(i);this.setTriggerSelector(j);k=k||"current";
this.setActiveTriggerClassname(k);var h={incoming:this._gallery.getSelected()};
this._paint(h)}var g=a.prototype;g.setGallery=function(h){this._gallery=h};g.getGallery=function(){return this._gallery
};g.setTriggerSelector=function(h){this._triggerSelector=h};g.getTriggerSelector=function(){return this._triggerSelector
};g.setActiveTriggerClassname=function(h){this._activeTriggerClassname=h};g.getActiveTriggerClassname=function(){return this._activeTriggerClassname
};g._paint=function(i){var k=i.incoming.id;var m=this.getTriggerSelector();var h=this.getActiveTriggerClassname();
var j=f.selectAll(m+"."+h);var l=f.selectAll(m+'[href="#'+k+'"]');this._unpaintTriggers(j,h);
this._paintTriggers(l,h)};g._paintTriggers=function(m,l){var k,h,j;for(k=0,h=m.length;
k<h;k+=1){j=m[k];f.addClassName(j,l)}};g._unpaintTriggers=function(m,l){var k,h,j;
for(k=0,h=m.length;k<h;k+=1){j=m[k];f.removeClassName(j,l)}};d.exports=a},{"ac-base":false}],165:[function(d,f,b){var h=d("ac-animation-sequencer").Timeline;
var a=d("ac-animation-sequencer").BasicPlayer;var c=d("ac-deferred").Deferred;var g=d("ac-keyframe").Interpolation;
function i(k,j,l,m){this._from=k;this._to=j;this._duration=l;this._easing=m}i.prototype={animate:function(){var m=new c();
var n=this._easing;var j=new g();j.setDuration(this._duration).setStartKeyframe(this._from).setEndKeyframe(this._to);
var l=j.getClip();var k=new a(l);k.once("ended",m.resolve,m);k.play();return m.promise()
}};i.create=function(j){return new i(j.from,j.to,j.duration,j.easing)};f.exports=i
},{"ac-animation-sequencer":90,"ac-deferred":87,"ac-keyframe":199}],166:[function(c,d,b){var g=c("./../helper/playCSSTransition");
var a=c("ac-deferred");function f(h,i,j,k){this._toKeyframe=h;this._fromKeyframe=i;
this._duration=j;this._easing=k}f.prototype={animate:function(){var i=this._duration;
var j=this._easing;var h=this._toKeyframe.getStyles().map(function(k){return g(k.element,k.props,i,j)
});return a.all(h)}};f.create=function(h){return new f(h.to,h.from,h.duration,h.easing)
};d.exports=f},{"./../helper/playCSSTransition":156,"ac-deferred":87}],167:[function(c,b,d){var h=c("./../helper/playCSSTransition");
var f=c("ac-deferred");var g=c("ac-keyframe").Keyframe;var a=c("ac-style-renderer").InlineStyleRenderer;
function i(l){var k={prop:l.property,value:l.value,units:l.units};return k}function j(k,l,m,n){this._toKeyframe=k;
this._fromKeyframe=l;this._duration=m;this._easing=n;this._beforeStyles=[];this._afterStyles=[]
}j.prototype={_renderBeforeStyles:function(){this._beforeStyles.forEach(function(k){a.render(k.element,k.props.map(i))
})},_renderAfterStyles:function(){this._afterStyles.forEach(function(k){a.render(k.element,k.props.map(i))
})},_processIncomingStyle:function(o){var m;var q=this._toKeyframe.findStyle(o.element,"zIndex");
var p=this._fromKeyframe;var n=this._beforeStyles;var k=this._afterStyles;var l={element:o.element,props:[]};
o.props.forEach(function(r){if(r.property==="opacity"){m=p.findStyle(o.element,r.property).value;
if(parseFloat(m)<parseFloat(r.value)){l.props.push(r);if(q){n.push({element:o.element,props:[q]})
}}else{k.push({element:o.element,props:[r]});if(q){k[k.length-1].props.push(q)}}}else{l.props.push(r)
}});return l},animate:function(){var m=this._duration;var p=this._easing;var o=this._fromKeyframe;
var n=this._toKeyframe;var l=this._toKeyframe.getStyles().map(this._processIncomingStyle.bind(this));
this._renderBeforeStyles();var k=l.map(function(q){return h(q.element,q.props,m,p)
});return f.all(k).then(this._renderAfterStyles.bind(this))}};j.create=function(k){return new j(k.to,k.from,k.duration,k.easing)
};b.exports=j},{"./../helper/playCSSTransition":156,"ac-deferred":87,"ac-keyframe":199,"ac-style-renderer":143}],168:[function(c,d,b){var a=c("ac-deferred");
var f=c("ac-animation-sequencer").Pause;var h=c("ac-animation-sequencer").ReversibleVideo;
function g(k,j,i){this._from=k;this._to=j;this._duration=i}g.prototype={animate:function(){var i=[];
var j=this._duration;var k=this._from;this._to.getStyles().forEach(function(l){l.props.forEach(function(t){var n;
var r;var m;var p;var o;var q;if(t.property==="time"){r=new a.Deferred();p=k.findStyle(l.element,t.property);
o=(p.value<t.value)?1:-1;n=new h(l.element);if(t.value!==0){m=new f(n,[0,t.value]);
m._monitor._init();m.once("pauseenter",function(){m=undefined;r.resolve()})}else{if(t.value===0){q=function(){if(l.element.currentTime===0){r.resolve()
}l.element.removeEventListener("timeupdate",q)};l.element.addEventListener("timeupdate",q)
}else{if(t.value===this.element.duration){q=function(){if(l.element.currentTime===this.element.duration){r.resolve()
}l.element.removeEventListener("timeupdate",q)};l.element.addEventListener("timeupdate",q)
}}}n.playbackRate=(Math.abs(p.value-t.value)/j)*o;n.play();i.push(r.promise())}})
});return a.all(i)}};g.create=function(i){return new g(i.from,i.to,i.duration,i.easing)
};d.exports=g},{"ac-animation-sequencer":90,"ac-deferred":87}],169:[function(c,b,d){var a=c("./CSSTransition");
var k=c("./AnimationSequence");var j=c("./../helper/playCSSTransition");var f=c("ac-deferred");
var h=f.Deferred;var g=c("ac-keyframe").Keyframe;function i(l,m){this._duration=l;
this._easing=m||"linear"}i.prototype={_determineSegueType:function(m){var l;if(m.SegueType!==undefined){l=m.SegueType
}else{if(typeof m.clipType!=="undefined"&&m.clipType!=="Element"){l=k}else{l=a}}return l
},_sortPropertiesBySegueType:function(m){var n=[];function l(o){for(var p=0;p<n.length;
p+=1){if(n[p].Type===o){return n[p]}}}m.getStyles().forEach(function(p){var q=this._determineSegueType(p);
var o=l(p.SegueType);if(!o){o={Type:q,properties:[]};n.push(o)}o.properties.push({clipType:p.clipType,element:p.element,props:p.props})
}.bind(this));return n},_transition:function(t,n){var p=[];var l;var m=this._duration;
var o=this._easing;if(this._duration===0){return n.draw()}var q=(m===0)?n.clone():t.diff(n);
var r=this._sortPropertiesBySegueType(q);var u=this._sortPropertiesBySegueType(n.diff(t));
r.forEach(function(x,v){var z=new g("to",x.properties);var y=new g("from",u[v].properties);
var w=x.Type.create({duration:m,easing:o,to:z,from:y});p.push(w.animate())});return f.all(p)
},getDuration:function(){return this._duration},setDuration:function(l){this._duration=l;
return this},getEasing:function(){return this._easing},setEasing:function(l){this._easing=l;
return this},play:function(m,l){return this._transition(m,l)}};i.create=function(l){return new i(l.duration,l.easing,l)
};b.exports=i},{"./../helper/playCSSTransition":156,"./AnimationSequence":165,"./CSSTransition":166,"ac-deferred":87,"ac-keyframe":199}],170:[function(f,g,c){var a=f("ac-animation-sequencer").TweenClip;
var i=f("./MediaRenderer");var d=f("ac-base").Object;function b(){a.apply(this,arguments)
}var h=b.prototype=new a();b.create=function(j){j=j||{};if(!j.element){throw new TypeError("MediaClip could not be created: "+j.element+" is not a valid element")
}j.renderer=new i(j.element);return new b(j)};g.exports=b},{"./MediaRenderer":171,"ac-animation-sequencer":90,"ac-base":false}],171:[function(b,c,a){function f(g){this._element=g
}var d=f.prototype;d.render=function(h,g){g.forEach(function(i){if(i.prop==="time"){if(h.currentTime!==i.value){h.currentTime=i.value
}}})};c.exports=f},{}],172:[function(c,d,b){function a(f,g){this._gallery=f;this._scrollView=g
}a.prototype={getGrid:function(){var g={left:[],top:[]};for(var f=0;f<this._gallery.numKeyframes();
f+=1){g.left.push(this._scrollView.getTouchContainerWidth()*f);g.top.push(this._scrollView.getTouchContainerHeight()*f)
}return g}};d.exports=a},{}],173:[function(c,f,a){var b=c("ac-base").Object;var g={axis:"x",bounceDuration:0};
function d(i,j,h){this.options=b.extend(g,h||{});this._player=i;this._touchScrollBounds=j
}d.prototype={_calculateScrollPercentage:function(i,h){return{left:i/this._touchScrollBounds.getScrollXDistance(),top:h/this._touchScrollBounds.getScrollYDistance()}
},calculateCurrentTime:function(k,j){var h=this._calculateScrollPercentage(k,j);
var l=(this.options.axis==="x")?"left":"top";var i=(this._player.getDuration()-(this.options.bounceDuration*2))*h[l];
return this.options.bounceDuration+i},render:function(i,h){this._player.setCurrentTime(this.calculateCurrentTime(i,h));
return this}};f.exports=d},{"ac-base":false}],174:[function(b,c,a){var d=b("ac-base").Element;
var f=b("./../controller/Touch");c.exports=function g(k,i,j){j=j||{};var h=new f(k,i,j);
return h}},{"./../controller/Touch":149,"ac-base":false}],175:[function(b,c,a){c.exports=b(90)
},{"./ac-animation-sequencer/Clock":176,"./ac-animation-sequencer/PlayerMonitor":177,"./ac-animation-sequencer/Timeline":178,"./ac-animation-sequencer/Tween":179,"./ac-animation-sequencer/adapters/ReversibleVideo":182,"./ac-animation-sequencer/clip/BaseClip":183,"./ac-animation-sequencer/clip/CompositeClip":184,"./ac-animation-sequencer/clip/ElementClip":185,"./ac-animation-sequencer/clip/TimedClip":186,"./ac-animation-sequencer/clip/TweenClip":187,"./ac-animation-sequencer/clip/VideoClip":188,"./ac-animation-sequencer/controllers/MediaGroup":189,"./ac-animation-sequencer/controllers/Pause":190,"./ac-animation-sequencer/player/BasicPlayer":191,"./ac-animation-sequencer/player/MediaPlayer":192}],176:[function(b,c,a){c.exports=b(91)
},{}],177:[function(b,c,a){c.exports=b(92)},{"./vendor/utils":195,"ac-event-emitter":88}],178:[function(b,c,a){c.exports=b(93)
},{"./clip/CompositeClip":184,"./clip/ElementClip":185,"./clip/TimedClip":186,"./clip/TweenClip":187}],179:[function(b,c,a){c.exports=b(94)
},{"./vendor/EasingFunctions":193,"./vendor/KeySpline":194,"./vendor/utils":195}],180:[function(b,c,a){c.exports=b(95)
},{}],181:[function(b,c,a){c.exports=b(96)},{"ac-event-emitter":88}],182:[function(b,c,a){c.exports=b(97)
},{"ac-event-emitter":88}],183:[function(b,c,a){c.exports=b(98)},{"../vendor/EasingFunctions":193,"../vendor/KeySpline":194,"ac-event-emitter":88,"ac-style-renderer":196}],184:[function(b,c,a){c.exports=b(99)
},{"./TimedClip":186}],185:[function(b,c,a){c.exports=b(100)},{"../Tween":179,"../vendor/utils":195,"./BaseClip":183,"ac-style-renderer":196}],186:[function(b,c,a){c.exports=b(101)
},{"../vendor/utils":195}],187:[function(b,c,a){c.exports=b(102)},{"./BaseClip":183}],188:[function(b,c,a){c.exports=b(103)
},{"../adapters/MediaAsClip":180}],189:[function(b,c,a){c.exports=b(104)},{"../Clock":176,"../vendor/utils":195,"ac-event-emitter":88}],190:[function(b,c,a){c.exports=b(105)
},{"../PlayerMonitor":177,"ac-event-emitter":88}],191:[function(b,c,a){c.exports=b(106)
},{"../Clock":176,"../adapters/PlayerAsMedia":181,"ac-event-emitter":88}],192:[function(b,c,a){c.exports=b(107)
},{"./BasicPlayer":191}],193:[function(b,c,a){c.exports=b(108)},{}],194:[function(b,c,a){c.exports=b(109)
},{}],195:[function(b,c,a){c.exports=b(110)},{}],196:[function(b,c,a){c.exports=b(143)
},{"./ac-style-renderer/InlineStyleRenderer":197,"./ac-style-renderer/LogRenderer":198}],197:[function(b,c,a){c.exports=b(144)
},{}],198:[function(b,c,a){c.exports=b(145)},{}],199:[function(b,c,a){a.Keyframe=b("./ac-keyframe/Keyframe");
a.Interpolation=b("./ac-keyframe/Interpolation")},{"./ac-keyframe/Interpolation":200,"./ac-keyframe/Keyframe":201}],200:[function(b,c,a){var f=b("ac-animation-sequencer").Timeline;
function d(){this._start=null;this._end=null;this._duration=null}d.prototype={_mergeToClip:function(){var i=this._start;
var j=this._end;var g=this._duration;var h=function(l){var k={element:l.element,clip:l.clipType||"Element",duration:g,props:[]};
l.props.forEach(function(o){var n={property:o.property,from:o.value,to:o.value,easing:o.easing||"linear"};
if(o.units){n.units=o.units}var m=i.findStyle(l.element,o.property);if(m){n.from=m.value
}k.props.push(n)});return k};return j.getStyles().map(h)},setStartKeyframe:function(g){this._start=g;
return this},setEndKeyframe:function(g){this._end=g;return this},setDuration:function(g){this._duration=g;
return this},getClip:function(){return f.create(this._mergeToClip())}};c.exports=d
},{"ac-animation-sequencer":175}],201:[function(b,a,f){var j=b("./helper/isTransformProperty");
var c=b("ac-base").Object;var g=b("ac-deferred");var h=b("ac-animation-sequencer").Timeline;
var d={};function i(n,m,l){var k=c.clone(d);this.id=n;this._styles=m;this.options=c.extend(k,l||{})
}i.prototype={clone:function(){return new i(this.id,this._styles,this.options)},findStyle:function(l,m){var k=null;
this._styles.forEach(function(n){if(n.element===l){n.props.forEach(function(o){if(o.property===m){k=o
}})}});return k},getStyles:function(){return this._styles},__rafDraw:function(k,l){window.requestAnimationFrame(function(){k.update(k.getDuration());
l.resolve()})},draw:function(){var k=[];this.getStyles().forEach(function(n){var m=n.clipType||"Element";
var l=h.clipTypes[m];var p=[];var q=new g.Deferred();n.props.forEach(function(t){var r=c.clone(t);
r.from=r.to=r.value;r.easing="linear";p.push(r)});var o=l.create({element:n.element,props:p});
this.__rafDraw(o,q);k.push(q.promise())}.bind(this));return g.all(k)},diff:function(l){var k=[];
var p;var n=this.getStyles();var m=l.getStyles();var o;n.forEach(function(w,r){var t=w.element;
var u=w.props;var y={};var v=false;for(var q in m[r]){if(m[r].hasOwnProperty(q)){y[q]=m[r][q]
}}y.props=[];u.forEach(function(A){var x=A.property;var z=l.findStyle(t,x);if(z===null){y.props.push(A)
}else{if(z.value!==A.value||(j(x)&&v===true)){y.props.push(z);if(j(x)){v=true}}}});
if(y.props.length>0){k.push(y)}});return new i("diff",k,this.options)}};a.exports=i
},{"./helper/isTransformProperty":202,"ac-animation-sequencer":175,"ac-base":false,"ac-deferred":87}],202:[function(b,d,a){var c=["skew","scale","rotate","translateX","translateY","translateZ"];
d.exports=function(f){return(c.indexOf(f)!==-1)}},{}],203:[function(b,c,a){c.exports=b(12)
},{"./ac-dom-emitter/DOMEmitter":204}],204:[function(b,c,a){c.exports=b(13)},{"ac-event-emitter":88}],205:[function(b,c,a){c.exports={LocalnavSticky:b("./ac-localnav-sticky/Localnav-sticky")}
},{"./ac-localnav-sticky/Localnav-sticky":206}],206:[function(c,b,f){var i=c("ac-base").Element;
var g=c("ac-base").Environment;var m=c("ac-dom-emitter").DOMEmitter;var n=c("ac-event-emitter").EventEmitter;
var d=new m(window);var l;try{l=c("ac-analytics")}catch(j){}var a={visible:"visible",hidden:"hidden"};
function k(o){this._options=o||{};this._globalHeader=i.select("#globalheader");
this._localNav=(this._options.wrapperName)?i.select("."+this._options.wrapperName):i.select(".localnav-wrapper");
this._stickyClass=this._options.stickyClass||"localnav-sticky";this._analyticsEnabled=(this._options.analyticsEnabled!==undefined)?this._options.analyticsEnabled:true;
this._visible=false;if(this._globalHeader&&this._localNav&&!this._isOldIE()){d.on("scroll",this._scrollUpdate.bind(this));
d.on("resize orientationchange",this._setThreshold.bind(this));setTimeout(this._scrollUpdate.bind(this),1000)
}}var h=k.prototype=new n(null);h._getThreshold=function(){if(!this._threshold){this._setThreshold()
}return this._threshold};h._setThreshold=function(){this._threshold=i.cumulativeOffset(this._localNav).top
};h._isOldIE=function(){return(g.Browser.name==="IE"&&g.Browser.version<9)};h._stickyAvailable=function(){var p=document.createElement("div"),o=["sticky","-webkit-sticky"];
return o.some(function(q){try{p.style.position=q;if(p.getAttribute("style")){return true
}}catch(r){return false}})};h._scrollUpdate=function(){var o=this._getThreshold();
var p=(window.pageYOffset!==undefined)?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;
if(o&&p>=o){this._showStickyNav()}else{this._hideStickyNav()}};h._showStickyNav=function(){if(!this._visible){i.addClassName(this._localNav,this._stickyClass);
if(!this._stickyAvailable()){i.setStyle(this._globalHeader,{marginBottom:i.getBoundingBox(this._localNav).height+"px"})
}if(typeof l==="object"&&this._analyticsEnabled){this._localNav.setAttribute("data-analytics-region","product nav locked");
l.regions.refreshRegion(this._localNav)}this._visible=true;this.trigger(a.visible)
}};h._hideStickyNav=function(){if(this._visible){i.removeClassName(this._localNav,this._stickyClass);
if(!this._stickyAvailable()){i.setStyle(this._globalHeader,{marginBottom:"0"})}if(typeof l==="object"&&this._analyticsEnabled){this._localNav.setAttribute("data-analytics-region","product nav");
l.regions.refreshRegion(this._localNav)}this._visible=false;this.trigger(a.hidden)
}};b.exports=k},{"ac-analytics":33,"ac-base":false,"ac-dom-emitter":203,"ac-event-emitter":88}],207:[function(b,c,a){c.exports=b(25)
},{}],208:[function(b,c,a){c.exports=b(114)},{"./ac-object/clone":209,"./ac-object/create":210,"./ac-object/defaults":211,"./ac-object/extend":212,"./ac-object/getPrototypeOf":213,"./ac-object/isDate":214,"./ac-object/isEmpty":215,"./ac-object/isRegExp":216,"./ac-object/toQueryParameters":217}],209:[function(b,c,a){c.exports=b(27)
},{"./extend":212}],210:[function(b,c,a){c.exports=b(116)},{}],211:[function(b,c,a){c.exports=b(117)
},{"./extend":212}],212:[function(b,c,a){c.exports=b(29)},{}],213:[function(b,c,a){c.exports=b(30)
},{}],214:[function(b,c,a){c.exports=b(120)},{}],215:[function(b,c,a){c.exports=b(31)
},{}],216:[function(b,c,a){c.exports=b(122)},{}],217:[function(b,c,a){c.exports=b(32)
},{qs:207}],218:[function(b,c,a){c.exports={BreakpointsDelegate:b("./ac-breakpoints-delegate/BreakpointsDelegate")}
},{"./ac-breakpoints-delegate/BreakpointsDelegate":219}],219:[function(f,b,i){var d=f("ac-shared-instance").SharedInstance,g=f("ac-object"),p=f("ac-window-delegate").WindowDelegate,c=f("ac-window-delegate").WindowDelegateCustomEvent,o=f("ac-event-emitter").EventEmitter;
var l="ac-breakpoints-delegate:BreakpointsDelegate",a="1.0.1";var m="breakpoint",n="resize orientationchange";
var h={small:{width:0,maxDeviceWidth:768},medium:{width:736},large:{width:1025,oldIE:true},xlarge:{width:1442}};
function k(q){this.breakpoints=g.clone(h);this._customEvent=new c(m,this._onBreakpointListenerAdded.bind(this),this._onBreakpointListenerRemoved.bind(this));
this.initialize()}var j=k.prototype;j.initialize=function(){this._breakpoint=null;
this._lastBreakpoint=null;this._handleOldIE();this._handleDevices();this._breakpointOrder=this._setBreakpointOrder();
if(!this._isOldIE){this._handleResize()}};j.getCustomEvent=function(){return this._customEvent
};j.getBreakpoint=function(){if(!this._customEvent.active){this._handleResize()
}return this._breakpoint};j._handleResize=function(){var v=p.innerWidth(),w;var u,t,r,q=this._breakpointOrder.length;
for(u=0;u<q;u++){t=this._breakpointOrder[u];r=this.breakpoints[t];if(r.width>v){break
}}if(u>0){u=u-1}w=this.breakpoints[this._breakpointOrder[u]];if(!this._breakpoint){this._breakpoint=w;
return}if(w.name===this._breakpoint.name){return}this._lastBreakpoint=this._breakpoint;
this._breakpoint=w;p.trigger(m,{incoming:this._breakpoint,outgoing:this._lastBreakpoint})
};j._setBreakpointOrder=function(){var r=[],q=[],t;for(t in this.breakpoints){if(this.breakpoints.hasOwnProperty(t)){this.breakpoints[t].name=t;
r.push(this.breakpoints[t].width)}}r.sort(function(v,u){return v-u});r.forEach(function(v){var u;
for(u in this.breakpoints){if(this.breakpoints.hasOwnProperty(u)){if(this.breakpoints[u].width===v){q.push(u)
}}}}.bind(this));return q};j._handleOldIE=function(){var q=document.documentElement,r="oldie";
if(q.className.indexOf("no-"+r)>-1||q.className.indexOf(r)===-1){return}this._breakpoint=this.breakpoints.large;
this._isOldIE=true;this._replaceBreakpoints(function(t){return t.oldIE===true})
};j._handleDevices=function(){this._replaceBreakpoints(function(q){if(typeof q.maxDeviceWidth!=="number"){return true
}if(window.screen&&window.screen.width<=q.maxDeviceWidth){return true}return false
})};j._replaceBreakpoints=function(u){var r,t={},q;for(r in this.breakpoints){if(this.breakpoints.hasOwnProperty(r)){q=this.breakpoints[r];
if(u(q)){t[r]=g.clone(this.breakpoints[r])}}}this.breakpoints=t};j._onBreakpointListenerAdded=function(){p.on(n,this._handleResize,this)
};j._onBreakpointListenerRemoved=function(){p.off(n,this._handleResize,this)};b.exports=d.share(l,a,k)
},{"ac-event-emitter":88,"ac-object":208,"ac-shared-instance":220,"ac-window-delegate":263}],220:[function(b,c,a){c.exports={SharedInstance:b("./ac-shared-instance/SharedInstance")}
},{"./ac-shared-instance/SharedInstance":221}],221:[function(d,h,c){var i=window,g="AC",a="SharedInstance",f=i[g];
var b=(function(){var j={};return{get:function(l,k){var m=null;if(j[l]&&j[l][k]){m=j[l][k]
}return m},set:function(m,k,l){if(!j[m]){j[m]={}}if(typeof l==="function"){j[m][k]=new l()
}else{j[m][k]=l}return j[m][k]},share:function(m,k,l){var n=this.get(m,k);if(!n){n=this.set(m,k,l)
}return n},remove:function(l,k){var m=typeof k;if(m==="string"||m==="number"){if(!j[l]||!j[l][k]){return
}j[l][k]=null;return}if(j[l]){j[l]=null}}}}());if(!f){f=i[g]={}}if(!f[a]){f[a]=b
}h.exports=f[a]},{}],222:[function(b,c,a){c.exports=b(4)},{}],223:[function(d,f,c){var b=d("./ac-dom-nodes/helpers/nodeTypes");
var g;var a={createDocumentFragment:d("./ac-dom-nodes/createDocumentFragment"),filterByNodeType:d("./ac-dom-nodes/filterByNodeType"),insertAfter:d("./ac-dom-nodes/insertAfter"),insertBefore:d("./ac-dom-nodes/insertBefore"),insertFirstChild:d("./ac-dom-nodes/insertFirstChild"),insertLastChild:d("./ac-dom-nodes/insertLastChild"),isComment:d("./ac-dom-nodes/isComment"),isDocument:d("./ac-dom-nodes/isDocument"),isDocumentFragment:d("./ac-dom-nodes/isDocumentFragment"),isDocumentType:d("./ac-dom-nodes/isDocumentType"),isElement:d("./ac-dom-nodes/isElement"),isNode:d("./ac-dom-nodes/isNode"),isTextNode:d("./ac-dom-nodes/isTextNode"),remove:d("./ac-dom-nodes/remove"),replace:d("./ac-dom-nodes/replace")};
for(g in b){a[g]=b[g]}f.exports=a},{"./ac-dom-nodes/createDocumentFragment":224,"./ac-dom-nodes/filterByNodeType":225,"./ac-dom-nodes/helpers/nodeTypes":227,"./ac-dom-nodes/insertAfter":229,"./ac-dom-nodes/insertBefore":230,"./ac-dom-nodes/insertFirstChild":231,"./ac-dom-nodes/insertLastChild":232,"./ac-dom-nodes/isComment":233,"./ac-dom-nodes/isDocument":234,"./ac-dom-nodes/isDocumentFragment":235,"./ac-dom-nodes/isDocumentType":236,"./ac-dom-nodes/isElement":237,"./ac-dom-nodes/isNode":238,"./ac-dom-nodes/isTextNode":239,"./ac-dom-nodes/remove":240,"./ac-dom-nodes/replace":241}],224:[function(c,d,b){d.exports=function a(g){var f=document.createDocumentFragment();
var h;if(g){h=document.createElement("div");h.innerHTML=g;while(h.firstChild){f.appendChild(h.firstChild)
}}return f}},{}],225:[function(d,f,c){var g=d("./helpers/isNodeType");var a=d("./helpers/nodeTypes").ELEMENT_NODE;
f.exports=function b(i,h){h=h||a;i=Array.prototype.slice.call(i);return i.filter(function(j){return g(j,h)
})}},{"./helpers/isNodeType":226,"./helpers/nodeTypes":227}],226:[function(b,c,a){var d=b("../isNode");
c.exports=function f(h,g){if(!d(h)){return false}if(typeof g==="number"){return(h.nodeType===g)
}return(g.indexOf(h.nodeType)!==-1)}},{"../isNode":238}],227:[function(b,c,a){c.exports={ELEMENT_NODE:1,TEXT_NODE:3,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11}
},{}],228:[function(f,c,h){var g=f("./nodeTypes");var b=f("./isNodeType");var j=[g.ELEMENT_NODE,g.TEXT_NODE,g.COMMENT_NODE,g.DOCUMENT_FRAGMENT_NODE];
var d=" must be an Element, TextNode, Comment, or Document Fragment";var m=[g.ELEMENT_NODE,g.TEXT_NODE,g.COMMENT_NODE];
var i=" must be an Element, TextNode, or Comment";var k=[g.ELEMENT_NODE,g.DOCUMENT_FRAGMENT_NODE];
var l=" must be an Element, or Document Fragment";var a=" must have a parentNode";
c.exports={parentNode:function(n,q,p,o){o=o||"target";if((n||q)&&!b(n,k)){throw new TypeError(p+": "+o+l)
}},childNode:function(n,q,p,o){o=o||"target";if(!n&&!q){return}if(!b(n,m)){throw new TypeError(p+": "+o+i)
}},insertNode:function(n,q,p,o){o=o||"node";if(!n&&!q){return}if(!b(n,j)){throw new TypeError(p+": "+o+d)
}},hasParentNode:function(n,p,o){o=o||"target";if(!n.parentNode){throw new TypeError(p+": "+o+a)
}}}},{"./isNodeType":226,"./nodeTypes":227}],229:[function(b,c,a){var f=b("./helpers/validate");
c.exports=function d(g,h){f.insertNode(g,true,"insertAfter");f.childNode(h,true,"insertAfter");
f.hasParentNode(h,"insertAfter");if(!h.nextSibling){return h.parentNode.appendChild(g)
}return h.parentNode.insertBefore(g,h.nextSibling)}},{"./helpers/validate":228}],230:[function(c,d,a){var f=c("./helpers/validate");
d.exports=function b(g,h){f.insertNode(g,true,"insertBefore");f.childNode(h,true,"insertBefore");
f.hasParentNode(h,"insertBefore");return h.parentNode.insertBefore(g,h)}},{"./helpers/validate":228}],231:[function(c,d,b){var f=c("./helpers/validate");
d.exports=function a(g,h){f.insertNode(g,true,"insertFirstChild");f.parentNode(h,true,"insertFirstChild");
if(!h.firstChild){return h.appendChild(g)}return h.insertBefore(g,h.firstChild)
}},{"./helpers/validate":228}],232:[function(b,c,a){var d=b("./helpers/validate");
c.exports=function f(g,h){d.insertNode(g,true,"insertLastChild");d.parentNode(h,true,"insertLastChild");
return h.appendChild(g)}},{"./helpers/validate":228}],233:[function(c,d,a){var g=c("./helpers/isNodeType");
var f=c("./helpers/nodeTypes").COMMENT_NODE;d.exports=function b(h){return g(h,f)
}},{"./helpers/isNodeType":226,"./helpers/nodeTypes":227}],234:[function(c,d,b){var g=c("./helpers/isNodeType");
var a=c("./helpers/nodeTypes").DOCUMENT_NODE;d.exports=function f(h){return g(h,a)
}},{"./helpers/isNodeType":226,"./helpers/nodeTypes":227}],235:[function(c,d,b){var g=c("./helpers/isNodeType");
var a=c("./helpers/nodeTypes").DOCUMENT_FRAGMENT_NODE;d.exports=function f(h){return g(h,a)
}},{"./helpers/isNodeType":226,"./helpers/nodeTypes":227}],236:[function(b,c,a){var g=b("./helpers/isNodeType");
var f=b("./helpers/nodeTypes").DOCUMENT_TYPE_NODE;c.exports=function d(h){return g(h,f)
}},{"./helpers/isNodeType":226,"./helpers/nodeTypes":227}],237:[function(c,d,b){var g=c("./helpers/isNodeType");
var a=c("./helpers/nodeTypes").ELEMENT_NODE;d.exports=function f(h){return g(h,a)
}},{"./helpers/isNodeType":226,"./helpers/nodeTypes":227}],238:[function(b,c,a){c.exports=function d(f){return !!(f&&f.nodeType)
}},{}],239:[function(c,d,a){var g=c("./helpers/isNodeType");var b=c("./helpers/nodeTypes").TEXT_NODE;
d.exports=function f(h){return g(h,b)}},{"./helpers/isNodeType":226,"./helpers/nodeTypes":227}],240:[function(c,d,b){var f=c("./helpers/validate");
d.exports=function a(g){f.childNode(g,true,"remove");if(!g.parentNode){return g
}return g.parentNode.removeChild(g)}},{"./helpers/validate":228}],241:[function(b,d,a){var f=b("./helpers/validate");
d.exports=function c(g,h){f.insertNode(g,true,"insertFirstChild","newNode");f.childNode(h,true,"insertFirstChild","oldNode");
f.hasParentNode(h,"insertFirstChild","oldNode");return h.parentNode.replaceChild(g,h)
}},{"./helpers/validate":228}],242:[function(b,c,a){var d={querySelector:b("./ac-dom-traversal/querySelector"),querySelectorAll:b("./ac-dom-traversal/querySelectorAll"),ancestor:b("./ac-dom-traversal/ancestor"),ancestors:b("./ac-dom-traversal/ancestors"),children:b("./ac-dom-traversal/children"),firstChild:b("./ac-dom-traversal/firstChild"),lastChild:b("./ac-dom-traversal/lastChild"),siblings:b("./ac-dom-traversal/siblings"),nextSibling:b("./ac-dom-traversal/nextSibling"),nextSiblings:b("./ac-dom-traversal/nextSiblings"),previousSibling:b("./ac-dom-traversal/previousSibling"),previousSiblings:b("./ac-dom-traversal/previousSiblings"),filterBySelector:b("./ac-dom-traversal/filterBySelector"),matchesSelector:b("./ac-dom-traversal/matchesSelector")};
b("./ac-dom-traversal/shims/ie")(d);c.exports=d},{"./ac-dom-traversal/ancestor":243,"./ac-dom-traversal/ancestors":244,"./ac-dom-traversal/children":245,"./ac-dom-traversal/filterBySelector":246,"./ac-dom-traversal/firstChild":247,"./ac-dom-traversal/lastChild":250,"./ac-dom-traversal/matchesSelector":251,"./ac-dom-traversal/nextSibling":252,"./ac-dom-traversal/nextSiblings":253,"./ac-dom-traversal/previousSibling":254,"./ac-dom-traversal/previousSiblings":255,"./ac-dom-traversal/querySelector":256,"./ac-dom-traversal/querySelectorAll":257,"./ac-dom-traversal/shims/ie":258,"./ac-dom-traversal/siblings":259}],243:[function(d,g,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");g.exports=function f(j,i){h.childNode(j,true,"ancestors");
h.selector(i,false,"ancestors");if(j!==document.body){while((j=j.parentNode)&&a.isElement(j)){if(!i||b(j,i)){return j
}if(j===document.body){break}}}return null}},{"./helpers/validate":249,"./matchesSelector":251,"ac-dom-nodes":223}],244:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(k,i){var j=[];
h.childNode(k,true,"ancestors");h.selector(i,false,"ancestors");if(k!==document.body){while((k=k.parentNode)&&a.isElement(k)){if(!i||b(k,i)){j.push(k)
}if(k===document.body){break}}}return j}},{"./helpers/validate":249,"./matchesSelector":251,"ac-dom-nodes":223}],245:[function(d,g,c){var a=d("ac-dom-nodes");
var b=d("./filterBySelector");var h=d("./helpers/validate");g.exports=function f(k,i){var j;
h.parentNode(k,true,"children");h.selector(i,false,"children");j=k.children||k.childNodes;
j=a.filterByNodeType(j);if(i){j=b(j,i)}return j}},{"./filterBySelector":246,"./helpers/validate":249,"ac-dom-nodes":223}],246:[function(d,f,c){var b=d("./matchesSelector");
var g=d("./helpers/validate");f.exports=function a(i,h){g.selector(h,true,"filterBySelector");
i=Array.prototype.slice.call(i);return i.filter(function(j){return b(j,h)})}},{"./helpers/validate":249,"./matchesSelector":251}],247:[function(b,d,a){var c=b("./children");
var g=b("./helpers/validate");d.exports=function f(j,h){var i;g.parentNode(j,true,"firstChild");
g.selector(h,false,"firstChild");if(j.firstElementChild&&!h){return j.firstElementChild
}i=c(j,h);if(i.length){return i[0]}return null}},{"./children":245,"./helpers/validate":249}],248:[function(b,c,a){c.exports=window.Element?(function(d){return d.matches||d.matchesSelector||d.webkitMatchesSelector||d.mozMatchesSelector||d.msMatchesSelector||d.oMatchesSelector
}(Element.prototype)):null},{}],249:[function(d,b,f){var j=d("ac-dom-nodes");var a=function(m,l){if(!j.isNode(m)){return false
}if(typeof l==="number"){return(m.nodeType===l)}return(l.indexOf(m.nodeType)!==-1)
};var h=[j.ELEMENT_NODE,j.DOCUMENT_NODE,j.DOCUMENT_FRAGMENT_NODE];var i=" must be an Element, Document, or Document Fragment";
var k=[j.ELEMENT_NODE,j.TEXT_NODE,j.COMMENT_NODE];var g=" must be an Element, TextNode, or Comment";
var c=" must be a string";b.exports={parentNode:function(l,o,n,m){m=m||"node";if((l||o)&&!a(l,h)){throw new TypeError(n+": "+m+i)
}},childNode:function(l,o,n,m){m=m||"node";if(!l&&!o){return}if(!a(l,k)){throw new TypeError(n+": "+m+g)
}},selector:function(l,o,n,m){m=m||"selector";if((l||o)&&typeof l!=="string"){throw new TypeError(n+": "+m+c)
}}}},{"ac-dom-nodes":223}],250:[function(b,d,a){var c=b("./children");var g=b("./helpers/validate");
d.exports=function f(j,h){var i;g.parentNode(j,true,"lastChild");g.selector(h,false,"lastChild");
if(j.lastElementChild&&!h){return j.lastElementChild}i=c(j,h);if(i.length){return i[i.length-1]
}return null}},{"./children":245,"./helpers/validate":249}],251:[function(f,g,d){var b=f("ac-dom-nodes");
var a=f("./helpers/nativeMatches");var h=f("./helpers/validate");g.exports=function c(j,i){h.selector(i,true,"matchesSelector");
return b.isElement(j)?a.call(j,i):false}},{"./helpers/nativeMatches":248,"./helpers/validate":249,"ac-dom-nodes":223}],252:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(j,i){h.childNode(j,true,"nextSibling");
h.selector(i,false,"nextSibling");if(j.nextElementSibling&&!i){return j.nextElementSibling
}while(j=j.nextSibling){if(a.isElement(j)){if(!i||b(j,i)){return j}}}return null
}},{"./helpers/validate":249,"./matchesSelector":251,"ac-dom-nodes":223}],253:[function(f,g,c){var a=f("ac-dom-nodes");
var b=f("./matchesSelector");var h=f("./helpers/validate");g.exports=function d(k,i){var j=[];
h.childNode(k,true,"nextSiblings");h.selector(i,false,"nextSiblings");while(k=k.nextSibling){if(a.isElement(k)){if(!i||b(k,i)){j.push(k)
}}}return j}},{"./helpers/validate":249,"./matchesSelector":251,"ac-dom-nodes":223}],254:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(j,i){h.childNode(j,true,"previousSibling");
h.selector(i,false,"previousSibling");if(j.previousElementSibling&&!i){return j.previousElementSibling
}while(j=j.previousSibling){if(a.isElement(j)){if(!i||b(j,i)){return j}}}return null
}},{"./helpers/validate":249,"./matchesSelector":251,"ac-dom-nodes":223}],255:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(k,i){var j=[];
h.childNode(k,true,"previousSiblings");h.selector(i,false,"previousSiblings");while(k=k.previousSibling){if(a.isElement(k)){if(!i||b(k,i)){j.push(k)
}}}return j.reverse()}},{"./helpers/validate":249,"./matchesSelector":251,"ac-dom-nodes":223}],256:[function(b,c,a){var f=b("./helpers/validate");
c.exports=function d(g,h){h=h||document;f.parentNode(h,true,"querySelector","context");
f.selector(g,true,"querySelector");return h.querySelector(g)}},{"./helpers/validate":249}],257:[function(b,c,a){var f=b("./helpers/validate");
c.exports=function d(g,h){h=h||document;f.parentNode(h,true,"querySelectorAll","context");
f.selector(g,true,"querySelectorAll");return Array.prototype.slice.call(h.querySelectorAll(g))
}},{"./helpers/validate":249}],258:[function(d,f,c){var g=d("../vendor/sizzle/sizzle");
var b=d("ac-dom-nodes");var a=d("../helpers/nativeMatches");var h=d("../helpers/validate");
f.exports=function(j,i){if(i||!("querySelectorAll" in document)){j.querySelectorAll=function(k,m){var l;
var n;m=m||document;h.parentNode(m,true,"querySelectorAll","context");h.selector(k,true,"querySelectorAll");
if(b.isDocumentFragment(m)){l=j.children(m);n=[];l.forEach(function(p){var o;if(g.matchesSelector(p,k)){n.push(p)
}o=g(k,p);if(o.length){n=n.concat(o)}});return n}return g(k,m)};j.querySelector=function(l,m){var k;
m=m||document;h.parentNode(m,true,"querySelector","context");h.selector(l,true,"querySelector");
k=j.querySelectorAll(l,m);return k.length?k[0]:null}}if(i||!a){j.matchesSelector=function(l,k){return g.matchesSelector(l,k)
}}}},{"../helpers/nativeMatches":248,"../helpers/validate":249,"../vendor/sizzle/sizzle":260,"ac-dom-nodes":223}],259:[function(b,d,a){var c=b("./children");
var g=b("./helpers/validate");d.exports=function f(j,h){var i=[];g.childNode(j,true,"siblings");
g.selector(h,false,"siblings");if(j.parentNode){i=c(j.parentNode,h);i=i.filter(function(k){return(k!==j)
})}return i}},{"./children":245,"./helpers/validate":249}],260:[function(b,c,a){
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(ae,w){var aj,E,v,h,n,l=ae.document,o=l.documentElement,M="undefined",p=false,m=true,u=0,z=[].slice,ai=[].push,am=("sizcache"+Math.random()).replace(".",""),P="[\\x20\\t\\r\\n\\f]",y="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])",x="(?:[\\w#_-]|[^\\x00-\\xa0]|\\\\.)",ar="([*^$|!~]?=)",ab="\\["+P+"*("+y+"+)"+P+"*(?:"+ar+P+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+x+"+)|)|)"+P+"*\\]",at=":("+y+"+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|(.*))\\)|)",R=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",t=P+"*([\\x20\\t\\r\\n\\f>+~])"+P+"*",r="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+ab+"|"+at.replace(2,7)+"|[^\\\\(),])+",ak=new RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),V=new RegExp("^"+t),J=new RegExp(r+"?(?="+P+"*,|$)","g"),Z=new RegExp("^(?:(?!,)(?:(?:^|,)"+P+"*"+r+")*?|"+P+"*(.*?))(\\)|$)"),ap=new RegExp(r.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+t,"g"),aa=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,af=/[\x20\t\r\n\f]*[+~]/,an=/:not\($/,F=/h\d/i,ac=/input|select|textarea|button/i,I=/\\(?!\\)/g,U={ID:new RegExp("^#("+y+"+)"),CLASS:new RegExp("^\\.("+y+"+)"),NAME:new RegExp("^\\[name=['\"]?("+y+"+)['\"]?\\]"),TAG:new RegExp("^("+y.replace("[-","[-\\*")+"+)"),ATTR:new RegExp("^"+ab),PSEUDO:new RegExp("^"+at),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),POS:new RegExp(R,"ig"),needsContext:new RegExp("^"+P+"*[>+~]|"+R,"i")},ah={},G=[],B={},K=[],ao=function(au){au.sizzleFilter=true;
return au},i=function(au){return function(av){return av.nodeName.toLowerCase()==="input"&&av.type===au
}},H=function(au){return function(aw){var av=aw.nodeName.toLowerCase();return(av==="input"||av==="button")&&aw.type===au
}},X=function(au){var av=false,ax=l.createElement("div");try{av=au(ax)}catch(aw){}ax=null;
return av},D=X(function(av){av.innerHTML="<select></select>";var au=typeof av.lastChild.getAttribute("multiple");
return au!=="boolean"&&au!=="string"}),f=X(function(av){av.id=am+0;av.innerHTML="<a name='"+am+"'></a><div name='"+am+"'></div>";
o.insertBefore(av,o.firstChild);var au=l.getElementsByName&&l.getElementsByName(am).length===2+l.getElementsByName(am+0).length;
n=!l.getElementById(am);o.removeChild(av);return au}),k=X(function(au){au.appendChild(l.createComment(""));
return au.getElementsByTagName("*").length===0}),T=X(function(au){au.innerHTML="<a href='#'></a>";
return au.firstChild&&typeof au.firstChild.getAttribute!==M&&au.firstChild.getAttribute("href")==="#"
}),S=X(function(au){au.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";
if(!au.getElementsByClassName||au.getElementsByClassName("e").length===0){return false
}au.lastChild.className="e";return au.getElementsByClassName("e").length!==1});
var ad=function(ax,au,az,aC){az=az||[];au=au||l;var aA,av,aB,aw,ay=au.nodeType;
if(ay!==1&&ay!==9){return[]}if(!ax||typeof ax!=="string"){return az}aB=A(au);if(!aB&&!aC){if((aA=aa.exec(ax))){if((aw=aA[1])){if(ay===9){av=au.getElementById(aw);
if(av&&av.parentNode){if(av.id===aw){az.push(av);return az}}else{return az}}else{if(au.ownerDocument&&(av=au.ownerDocument.getElementById(aw))&&Q(au,av)&&av.id===aw){az.push(av);
return az}}}else{if(aA[2]){ai.apply(az,z.call(au.getElementsByTagName(ax),0));return az
}else{if((aw=aA[3])&&S&&au.getElementsByClassName){ai.apply(az,z.call(au.getElementsByClassName(aw),0));
return az}}}}}return al(ax,au,az,aC,aB)};var W=ad.selectors={cacheLength:50,match:U,order:["ID","TAG"],attrHandle:{},createPseudo:ao,find:{ID:n?function(ax,aw,av){if(typeof aw.getElementById!==M&&!av){var au=aw.getElementById(ax);
return au&&au.parentNode?[au]:[]}}:function(ax,aw,av){if(typeof aw.getElementById!==M&&!av){var au=aw.getElementById(ax);
return au?au.id===ax||typeof au.getAttributeNode!==M&&au.getAttributeNode("id").value===ax?[au]:w:[]
}},TAG:k?function(au,av){if(typeof av.getElementsByTagName!==M){return av.getElementsByTagName(au)
}}:function(au,ay){var ax=ay.getElementsByTagName(au);if(au==="*"){var az,aw=[],av=0;
for(;(az=ax[av]);av++){if(az.nodeType===1){aw.push(az)}}return aw}return ax}},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(au){au[1]=au[1].replace(I,"");
au[3]=(au[4]||au[5]||"").replace(I,"");if(au[2]==="~="){au[3]=" "+au[3]+" "}return au.slice(0,4)
},CHILD:function(au){au[1]=au[1].toLowerCase();if(au[1]==="nth"){if(!au[2]){ad.error(au[0])
}au[3]=+(au[3]?au[4]+(au[5]||1):2*(au[2]==="even"||au[2]==="odd"));au[4]=+((au[6]+au[7])||au[2]==="odd")
}else{if(au[2]){ad.error(au[0])}}return au},PSEUDO:function(au){var av,aw=au[4];
if(U.CHILD.test(au[0])){return null}if(aw&&(av=Z.exec(aw))&&av.pop()){au[0]=au[0].slice(0,av[0].length-aw.length-1);
aw=av[0].slice(0,-1)}au.splice(2,3,aw||au[3]);return au}},filter:{ID:n?function(au){au=au.replace(I,"");
return function(av){return av.getAttribute("id")===au}}:function(au){au=au.replace(I,"");
return function(aw){var av=typeof aw.getAttributeNode!==M&&aw.getAttributeNode("id");
return av&&av.value===au}},TAG:function(au){if(au==="*"){return function(){return true
}}au=au.replace(I,"").toLowerCase();return function(av){return av.nodeName&&av.nodeName.toLowerCase()===au
}},CLASS:function(au){var av=ah[au];if(!av){av=ah[au]=new RegExp("(^|"+P+")"+au+"("+P+"|$)");
G.push(au);if(G.length>W.cacheLength){delete ah[G.shift()]}}return function(aw){return av.test(aw.className||(typeof aw.getAttribute!==M&&aw.getAttribute("class"))||"")
}},ATTR:function(aw,av,au){if(!av){return function(ax){return ad.attr(ax,aw)!=null
}}return function(ay){var ax=ad.attr(ay,aw),az=ax+"";if(ax==null){return av==="!="
}switch(av){case"=":return az===au;case"!=":return az!==au;case"^=":return au&&az.indexOf(au)===0;
case"*=":return au&&az.indexOf(au)>-1;case"$=":return au&&az.substr(az.length-au.length)===au;
case"~=":return(" "+az+" ").indexOf(au)>-1;case"|=":return az===au||az.substr(0,au.length+1)===au+"-"
}}},CHILD:function(av,ax,ay,aw){if(av==="nth"){var au=u++;return function(aC){var az,aD,aB=0,aA=aC;
if(ay===1&&aw===0){return true}az=aC.parentNode;if(az&&(az[am]!==au||!aC.sizset)){for(aA=az.firstChild;
aA;aA=aA.nextSibling){if(aA.nodeType===1){aA.sizset=++aB;if(aA===aC){break}}}az[am]=au
}aD=aC.sizset-aw;if(ay===0){return aD===0}else{return(aD%ay===0&&aD/ay>=0)}}}return function(aA){var az=aA;
switch(av){case"only":case"first":while((az=az.previousSibling)){if(az.nodeType===1){return false
}}if(av==="first"){return true}az=aA;case"last":while((az=az.nextSibling)){if(az.nodeType===1){return false
}}return true}}},PSEUDO:function(ay,ax,av,au){var aw=W.pseudos[ay]||W.pseudos[ay.toLowerCase()];
if(!aw){ad.error("unsupported pseudo: "+ay)}if(!aw.sizzleFilter){return aw}return aw(ax,av,au)
}},pseudos:{not:ao(function(au,aw,av){var ax=q(au.replace(ak,"$1"),aw,av);return function(ay){return !ax(ay)
}}),enabled:function(au){return au.disabled===false},disabled:function(au){return au.disabled===true
},checked:function(au){var av=au.nodeName.toLowerCase();return(av==="input"&&!!au.checked)||(av==="option"&&!!au.selected)
},selected:function(au){if(au.parentNode){au.parentNode.selectedIndex}return au.selected===true
},parent:function(au){return !!au.firstChild},empty:function(au){return !au.firstChild
},contains:ao(function(au){return function(av){return(av.textContent||av.innerText||d(av)).indexOf(au)>-1
}}),has:ao(function(au){return function(av){return ad(au,av).length>0}}),header:function(au){return F.test(au.nodeName)
},text:function(aw){var av,au;return aw.nodeName.toLowerCase()==="input"&&(av=aw.type)==="text"&&((au=aw.getAttribute("type"))==null||au.toLowerCase()===av)
},radio:i("radio"),checkbox:i("checkbox"),file:i("file"),password:i("password"),image:i("image"),submit:H("submit"),reset:H("reset"),button:function(av){var au=av.nodeName.toLowerCase();
return au==="input"&&av.type==="button"||au==="button"},input:function(au){return ac.test(au.nodeName)
},focus:function(au){var av=au.ownerDocument;return au===av.activeElement&&(!av.hasFocus||av.hasFocus())&&!!(au.type||au.href)
},active:function(au){return au===au.ownerDocument.activeElement}},setFilters:{first:function(aw,av,au){return au?aw.slice(1):[aw[0]]
},last:function(ax,aw,av){var au=ax.pop();return av?ax:[au]},even:function(az,ay,ax){var aw=[],av=ax?1:0,au=az.length;
for(;av<au;av=av+2){aw.push(az[av])}return aw},odd:function(az,ay,ax){var aw=[],av=ax?0:1,au=az.length;
for(;av<au;av=av+2){aw.push(az[av])}return aw},lt:function(aw,av,au){return au?aw.slice(+av):aw.slice(0,+av)
},gt:function(aw,av,au){return au?aw.slice(0,+av+1):aw.slice(+av+1)},eq:function(ax,aw,av){var au=ax.splice(+aw,1);
return av?ax:au}}};W.setFilters.nth=W.setFilters.eq;W.filters=W.pseudos;if(!T){W.attrHandle={href:function(au){return au.getAttribute("href",2)
},type:function(au){return au.getAttribute("type")}}}if(f){W.order.push("NAME");
W.find.NAME=function(au,av){if(typeof av.getElementsByName!==M){return av.getElementsByName(au)
}}}if(S){W.order.splice(1,0,"CLASS");W.find.CLASS=function(aw,av,au){if(typeof av.getElementsByClassName!==M&&!au){return av.getElementsByClassName(aw)
}}}try{z.call(o.childNodes,0)[0].nodeType}catch(aq){z=function(av){var aw,au=[];
for(;(aw=this[av]);av++){au.push(aw)}return au}}var A=ad.isXML=function(au){var av=au&&(au.ownerDocument||au).documentElement;
return av?av.nodeName!=="HTML":false};var Q=ad.contains=o.compareDocumentPosition?function(av,au){return !!(av.compareDocumentPosition(au)&16)
}:o.contains?function(av,au){var ax=av.nodeType===9?av.documentElement:av,aw=au.parentNode;
return av===aw||!!(aw&&aw.nodeType===1&&ax.contains&&ax.contains(aw))}:function(av,au){while((au=au.parentNode)){if(au===av){return true
}}return false};var d=ad.getText=function(ay){var ax,av="",aw=0,au=ay.nodeType;
if(au){if(au===1||au===9||au===11){if(typeof ay.textContent==="string"){return ay.textContent
}else{for(ay=ay.firstChild;ay;ay=ay.nextSibling){av+=d(ay)}}}else{if(au===3||au===4){return ay.nodeValue
}}}else{for(;(ax=ay[aw]);aw++){av+=d(ax)}}return av};ad.attr=function(ax,aw){var au,av=A(ax);
if(!av){aw=aw.toLowerCase()}if(W.attrHandle[aw]){return W.attrHandle[aw](ax)}if(D||av){return ax.getAttribute(aw)
}au=ax.getAttributeNode(aw);return au?typeof ax[aw]==="boolean"?ax[aw]?aw:null:au.specified?au.value:null:null
};ad.error=function(au){throw new Error("Syntax error, unrecognized expression: "+au)
};[0,0].sort(function(){return(m=0)});if(o.compareDocumentPosition){v=function(av,au){if(av===au){p=true;
return 0}return(!av.compareDocumentPosition||!au.compareDocumentPosition?av.compareDocumentPosition:av.compareDocumentPosition(au)&4)?-1:1
}}else{v=function(aC,aB){if(aC===aB){p=true;return 0}else{if(aC.sourceIndex&&aB.sourceIndex){return aC.sourceIndex-aB.sourceIndex
}}var az,av,aw=[],au=[],ay=aC.parentNode,aA=aB.parentNode,aD=ay;if(ay===aA){return h(aC,aB)
}else{if(!ay){return -1}else{if(!aA){return 1}}}while(aD){aw.unshift(aD);aD=aD.parentNode
}aD=aA;while(aD){au.unshift(aD);aD=aD.parentNode}az=aw.length;av=au.length;for(var ax=0;
ax<az&&ax<av;ax++){if(aw[ax]!==au[ax]){return h(aw[ax],au[ax])}}return ax===az?h(aC,au[ax],-1):h(aw[ax],aB,1)
};h=function(av,au,aw){if(av===au){return aw}var ax=av.nextSibling;while(ax){if(ax===au){return -1
}ax=ax.nextSibling}return 1}}ad.uniqueSort=function(av){var aw,au=1;if(v){p=m;av.sort(v);
if(p){for(;(aw=av[au]);au++){if(aw===av[au-1]){av.splice(au--,1)}}}}return av};
function C(av,az,ay,aw){var ax=0,au=az.length;for(;ax<au;ax++){ad(av,az[ax],ay,aw)
}}function Y(au,aw,aA,aB,av,az){var ax,ay=W.setFilters[aw.toLowerCase()];if(!ay){ad.error(aw)
}if(au||!(ax=av)){C(au||"*",aB,(ax=[]),av)}return ax.length>0?ay(ax,aA,az):[]}function ag(aE,au,aC,aw,aI){var az,av,ay,aK,aB,aJ,aD,aH,aF=0,aG=aI.length,ax=U.POS,aA=new RegExp("^"+ax.source+"(?!"+P+")","i"),aL=function(){var aN=1,aM=arguments.length-2;
for(;aN<aM;aN++){if(arguments[aN]===w){az[aN]=w}}};for(;aF<aG;aF++){ax.exec("");
aE=aI[aF];aK=[];ay=0;aB=aw;while((az=ax.exec(aE))){aH=ax.lastIndex=az.index+az[0].length;
if(aH>ay){aD=aE.slice(ay,az.index);ay=aH;aJ=[au];if(V.test(aD)){if(aB){aJ=aB}aB=aw
}if((av=an.test(aD))){aD=aD.slice(0,-5).replace(V,"$&*")}if(az.length>1){az[0].replace(aA,aL)
}aB=Y(aD,az[1],az[2],aJ,aB,av)}}if(aB){aK=aK.concat(aB);if((aD=aE.slice(ay))&&aD!==")"){C(aD,aK,aC,aw)
}else{ai.apply(aC,aK)}}else{ad(aE,au,aC,aw)}}return aG===1?aC:ad.uniqueSort(aC)
}function g(aA,aw,aD){var aF,aE,aG,ay=[],aB=0,aC=Z.exec(aA),av=!aC.pop()&&!aC.pop(),aH=av&&aA.match(J)||[""],au=W.preFilter,ax=W.filter,az=!aD&&aw!==l;
for(;(aE=aH[aB])!=null&&av;aB++){ay.push(aF=[]);if(az){aE=" "+aE}while(aE){av=false;
if((aC=V.exec(aE))){aE=aE.slice(aC[0].length);av=aF.push({part:aC.pop().replace(ak," "),captures:aC})
}for(aG in ax){if((aC=U[aG].exec(aE))&&(!au[aG]||(aC=au[aG](aC,aw,aD)))){aE=aE.slice(aC.shift().length);
av=aF.push({part:aG,captures:aC})}}if(!av){break}}}if(!av){ad.error(aA)}return ay
}function N(ay,ax,aw){var au=ax.dir,av=u++;if(!ay){ay=function(az){return az===aw
}}return ax.first?function(aA,az){while((aA=aA[au])){if(aA.nodeType===1){return ay(aA,az)&&aA
}}}:function(aB,aA){var az,aC=av+"."+E,aD=aC+"."+aj;while((aB=aB[au])){if(aB.nodeType===1){if((az=aB[am])===aD){return false
}else{if(typeof az==="string"&&az.indexOf(aC)===0){if(aB.sizset){return aB}}else{aB[am]=aD;
if(ay(aB,aA)){aB.sizset=true;return aB}aB.sizset=false}}}}}}function L(au,av){return au?function(ay,ax){var aw=av(ay,ax);
return aw&&au(aw===true?ay:aw,ax)}:av}function O(az,ax,au){var aw,ay,av=0;for(;
(aw=az[av]);av++){if(W.relative[aw.part]){ay=N(ay,W.relative[aw.part],ax)}else{aw.captures.push(ax,au);
ay=L(ay,W.filter[aw.part].apply(null,aw.captures))}}return ay}function j(au){return function(ax,aw){var ay,av=0;
for(;(ay=au[av]);av++){if(ay(ax,aw)){return true}}return false}}var q=ad.compile=function(au,ax,av){var aA,az,aw,ay=B[au];
if(ay&&ay.context===ax){ay.dirruns++;return ay}az=g(au,ax,av);for(aw=0;(aA=az[aw]);
aw++){az[aw]=O(aA,ax,av)}ay=B[au]=j(az);ay.context=ax;ay.runs=ay.dirruns=0;K.push(au);
if(K.length>W.cacheLength){delete B[K.shift()]}return ay};ad.matches=function(av,au){return ad(av,null,null,au)
};ad.matchesSelector=function(au,av){return ad(av,null,null,[au]).length>0};var al=function(ay,av,aA,aE,aD){ay=ay.replace(ak,"$1");
var au,aF,aB,aG,aw,ax,aI,aJ,az,aC=ay.match(J),aH=ay.match(ap),aK=av.nodeType;if(U.POS.test(ay)){return ag(ay,av,aA,aE,aC)
}if(aE){au=z.call(aE,0)}else{if(aC&&aC.length===1){if(aH.length>1&&aK===9&&!aD&&(aC=U.ID.exec(aH[0]))){av=W.find.ID(aC[1],av,aD)[0];
if(!av){return aA}ay=ay.slice(aH.shift().length)}aJ=((aC=af.exec(aH[0]))&&!aC.index&&av.parentNode)||av;
az=aH.pop();ax=az.split(":not")[0];for(aB=0,aG=W.order.length;aB<aG;aB++){aI=W.order[aB];
if((aC=U[aI].exec(ax))){au=W.find[aI]((aC[1]||"").replace(I,""),aJ,aD);if(au==null){continue
}if(ax===az){ay=ay.slice(0,ay.length-az.length)+ax.replace(U[aI],"");if(!ay){ai.apply(aA,z.call(au,0))
}}break}}}}if(ay){aF=q(ay,av,aD);E=aF.dirruns;if(au==null){au=W.find.TAG("*",(af.test(ay)&&av.parentNode)||av)
}for(aB=0;(aw=au[aB]);aB++){aj=aF.runs++;if(aF(aw,av)){aA.push(aw)}}}return aA};
if(l.querySelectorAll){(function(){var az,aA=al,ay=/'|\\/g,aw=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,av=[],au=[":active"],ax=o.matchesSelector||o.mozMatchesSelector||o.webkitMatchesSelector||o.oMatchesSelector||o.msMatchesSelector;
X(function(aB){aB.innerHTML="<select><option selected></option></select>";if(!aB.querySelectorAll("[selected]").length){av.push("\\["+P+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
}if(!aB.querySelectorAll(":checked").length){av.push(":checked")}});X(function(aB){aB.innerHTML="<p test=''></p>";
if(aB.querySelectorAll("[test^='']").length){av.push("[*^$]="+P+"*(?:\"\"|'')")
}aB.innerHTML="<input type='hidden'>";if(!aB.querySelectorAll(":enabled").length){av.push(":enabled",":disabled")
}});av=av.length&&new RegExp(av.join("|"));al=function(aG,aC,aH,aJ,aI){if(!aJ&&!aI&&(!av||!av.test(aG))){if(aC.nodeType===9){try{ai.apply(aH,z.call(aC.querySelectorAll(aG),0));
return aH}catch(aF){}}else{if(aC.nodeType===1&&aC.nodeName.toLowerCase()!=="object"){var aE=aC.getAttribute("id"),aB=aE||am,aD=af.test(aG)&&aC.parentNode||aC;
if(aE){aB=aB.replace(ay,"\\$&")}else{aC.setAttribute("id",aB)}try{ai.apply(aH,z.call(aD.querySelectorAll(aG.replace(J,"[id='"+aB+"'] $&")),0));
return aH}catch(aF){}finally{if(!aE){aC.removeAttribute("id")}}}}}return aA(aG,aC,aH,aJ,aI)
};if(ax){X(function(aC){az=ax.call(aC,"div");try{ax.call(aC,"[test!='']:sizzle");
au.push(W.match.PSEUDO)}catch(aB){}});au=new RegExp(au.join("|"));ad.matchesSelector=function(aC,aE){aE=aE.replace(aw,"='$1']");
if(!A(aC)&&!au.test(aE)&&(!av||!av.test(aE))){try{var aB=ax.call(aC,aE);if(aB||az||aC.document&&aC.document.nodeType!==11){return aB
}}catch(aD){}}return ad(aE,null,null,[aC]).length>0}}})()}if(typeof c==="object"&&c.exports){c.exports=ad
}else{ae.Sizzle=ad}})(window)},{}],261:[function(b,c,a){c.exports={DOMEmitter:b("./ac-dom-emitter/DOMEmitter")}
},{"./ac-dom-emitter/DOMEmitter":262}],262:[function(c,b,d){var f;var j=c("ac-event-emitter").EventEmitter,g=c("ac-dom-events"),a=c("ac-dom-traversal");
var i="dom-emitter";function h(k){if(k===null){return}this.el=k;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new j()}f=h.prototype;f._parseEventNames=function(k){if(!k){return[k]
}return k.split(" ")};f._onListenerEvent=function(l,k){this.trigger(l,k,false)};
f._setListener=function(k){this._bindings[k]=this._onListenerEvent.bind(this,k);
g.addEventListener(this.el,k,this._bindings[k])};f._removeListener=function(k){g.removeEventListener(this.el,k,this._bindings[k]);
this._bindings[k]=null};f._triggerInternalEvent=function(k,l){this.trigger(i+":"+k,l)
};f._normalizeArgumentsAndCall=function(k,m){var q={};if(k.length===0){m.call(this,q);
return}if(typeof k[0]==="string"||k[0]===null){k=this._cleanStringData(k);q.events=k[0];
if(typeof k[1]==="string"){q.delegateQuery=k[1];q.callback=k[2];q.context=k[3]}else{q.callback=k[1];
q.context=k[2]}m.call(this,q);return}var l,o,p=":",n=k[0];for(l in n){if(n.hasOwnProperty(l)){q={};
o=this._cleanStringData(l.split(p));q.events=o[0];q.delegateQuery=o[1];q.callback=n[l];
q.context=k[1];m.call(this,q)}}};f._registerDelegateFunc=function(m,o,p,k,n){var l=this._delegateFunc.bind(this,m,o,p,n);
this._delegateFuncs[o]=this._delegateFuncs[o]||{};this._delegateFuncs[o][m]=this._delegateFuncs[o][m]||[];
this._delegateFuncs[o][m].push({func:k,context:n,delegateFunc:l});return l};f._cleanStringData=function(n){var m=false;
if(typeof n==="string"){n=[n];m=true}var l=[],p,r,q,o,k=n.length;for(p=0;p<k;p++){r=n[p];
if(typeof r==="string"){if(r===""||r===" "){continue}q=r.length;while(r[0]===" "){r=r.slice(1,q);
q--}while(r[q-1]===" "){r=r.slice(0,q-1);q--}}l.push(r)}if(m){return l[0]}return l
};f._unregisterDelegateFunc=function(m,p,k,o){if(!this._delegateFuncs[p]||!this._delegateFuncs[p][m]){return
}var n=this._getDelegateFuncBindingIdx(m,p,k,o),l;if(n>-1){l=this._delegateFuncs[p][m][n].delegateFunc;
this._delegateFuncs[p][m].splice(n,1);if(this._delegateFuncs[p][m].length===0){this._delegateFuncs[p][m]=null
}}return l};f._unregisterDelegateFuncs=function(k,m){if(!this._delegateFuncs[m]){return
}if(k!==null&&!this._delegateFuncs[m][k]){return}if(k===null){var l;for(l in this._delegateFuncs[m]){if(this._delegateFuncs[m].hasOwnProperty(l)){this._unbindDelegateFunc(l,m)
}}return}this._unbindDelegateFunc(k,m)};f._unbindDelegateFunc=function(k,m){var n,o,l=0;
while(this._delegateFuncs[m][k]&&this._delegateFuncs[m][k][l]){n=this._delegateFuncs[m][k][l];
o=this._delegateFuncs[m][k][l].length;this._off({events:k,delegateQuery:m,callback:n.func,context:n.context});
if(this._delegateFuncs[m][k]&&o===this._delegateFuncs[m][k].length){l++}}n=o=null
};f._unregisterDelegateFuncsByEvent=function(k){var l;for(l in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(l)){this._unregisterDelegateFuncs(k,l)
}}};f._delegateFunc=function(k,o,q,m,p){if(a.matchesSelector(g.target(p),o)){var l=Array.prototype.slice.call(arguments,0),n=l.slice(4,l.length);
m=m||window;if(typeof p.detail==="object"){n[0]=p.detail}q.call(m,n)}};f.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};f.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};f.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};f._on=function(o){var l=o.events,p=o.callback,n=o.delegateQuery,m=o.context,k=o.unboundCallback||p;
l=this._parseEventNames(l);l.forEach(function(v,q,t,u,r){if(!this.has(r)){this._setListener(r)
}if(typeof u==="string"){v=this._registerDelegateFunc(r,u,v,q,t)}this._triggerInternalEvent("willon",{evt:r,callback:v,context:t,delegateQuery:u});
this._eventEmitter.on(r,v,t);this._triggerInternalEvent("didon",{evt:r,callback:v,context:t,delegateQuery:u})
}.bind(this,p,k,m,n));l=p=k=n=m=null};f._off=function(p){var l=p.events,q=p.callback,o=p.delegateQuery,n=p.context,k=p.unboundCallback||q;
if(typeof l==="undefined"){this._eventEmitter.off();var m;for(m in this._bindings){if(this._bindings.hasOwnProperty(m)){this._removeListener(m)
}}for(m in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(m)){this._delegateFuncs[m]=null
}}return}l=this._parseEventNames(l);l.forEach(function(w,r,u,v,t){if(typeof v==="string"&&typeof r==="function"){w=this._unregisterDelegateFunc(t,v,r,u);
if(!w){return}}if(typeof v==="string"&&typeof w==="undefined"){this._unregisterDelegateFuncs(t,v);
return}if(typeof t==="string"&&typeof w==="undefined"){this._unregisterDelegateFuncsByEvent(t);
if(typeof v==="string"){return}}this._triggerInternalEvent("willoff",{evt:t,callback:w,context:u,delegateQuery:v});
this._eventEmitter.off(t,w,u);this._triggerInternalEvent("didoff",{evt:t,callback:w,context:u,delegateQuery:v});
if(!this.has(t)){this._removeListener(t)}}.bind(this,q,k,n,o));l=q=k=o=n=null};
f._once=function(n){var k=n.events,o=n.callback,m=n.delegateQuery,l=n.context;k=this._parseEventNames(k);
k.forEach(function(t,q,r,p){if(typeof r==="string"){return this._handleDelegateOnce(p,t,q,r)
}if(!this.has(p)){this._setListener(p)}this._triggerInternalEvent("willonce",{evt:p,callback:t,context:q,delegateQuery:r});
this._eventEmitter.once.call(this,p,t,q);this._triggerInternalEvent("didonce",{evt:p,callback:t,context:q,delegateQuery:r})
}.bind(this,o,l,m));k=o=m=l=null};f._handleDelegateOnce=function(k,n,l,m){this._triggerInternalEvent("willonce",{evt:k,callback:n,context:l,delegateQuery:m});
this._on({events:k,context:l,delegateQuery:m,callback:this._getDelegateOnceCallback.bind(this,k,n,l,m),unboundCallback:n});
this._triggerInternalEvent("didonce",{evt:k,callback:n,context:l,delegateQuery:m});
return this};f._getDelegateOnceCallback=function(k,p,m,o){var l=Array.prototype.slice.call(arguments,0),n=l.slice(4,l.length);
p.apply(m,n);this._off({events:k,delegateQuery:o,callback:p,context:m})};f._getDelegateFuncBindingIdx=function(r,o,m,k,t){var q=-1;
if(this._delegateFuncs[o]&&this._delegateFuncs[o][r]){var n,l,p=this._delegateFuncs[o][r].length;
for(n=0;n<p;n++){l=this._delegateFuncs[o][r][n];if(t&&typeof m==="undefined"){m=l.func
}if(l.func===m&&l.context===k){q=n;break}}}return q};f._triggerDelegateEvents=function(n,p,q){var m=a.querySelectorAll(p,this.el);
var o,r,k=m.length;for(o=0;o<k;o++){r=m[o];if(document.createEvent){r.dispatchEvent(new CustomEvent(n,{bubbles:true,cancelable:false,detail:q}))
}else{var l=document.createEventObject();l.detail=q;r.fireEvent("on"+n,l)}return r
}};f.has=function(k,p,o,m){var n,q;if(typeof p==="string"){n=p;q=o}else{q=p;m=o
}if(n){var l=this._getDelegateFuncBindingIdx(k,n,q,m,true);if(l>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};f.trigger=function(l,k,m,p){l=this._parseEventNames(l);var n,o;if(typeof k==="string"){n=this._cleanStringData(k);
o=m}else{o=k;p=m}l=this._cleanStringData(l);l.forEach(function(r,t,u,q){if(r){this._triggerDelegateEvents(q,r,t);
return}this._eventEmitter.trigger(q,t,u)}.bind(this,n,o,p));return this};f.propagateTo=function(k,l){this._eventEmitter.propagateTo(k,l);
return this};f.stopPropagatingTo=function(k){this._eventEmitter.stopPropagatingTo(k);
return this};f.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
this.el=this._eventEmitter=this._bindings=this._delegateFuncs=null};b.exports=h
},{"ac-dom-events":222,"ac-dom-traversal":242,"ac-event-emitter":88}],263:[function(b,c,a){c.exports={WindowDelegate:b("./ac-window-delegate/WindowDelegate"),WindowDelegateOptimizer:b("./ac-window-delegate/WindowDelegateOptimizer"),WindowDelegateCustomEvent:b("./ac-window-delegate/WindowDelegateCustomEvent")}
},{"./ac-window-delegate/WindowDelegate":266,"./ac-window-delegate/WindowDelegateCustomEvent":267,"./ac-window-delegate/WindowDelegateOptimizer":268}],264:[function(b,c,a){var f=b("ac-event-emitter").EventEmitter;
var g=function(){this._emitter=new f();this._customEvents={}};var d=g.prototype;
d.on=function(h,j,i){this._activateCustomEvents(h);this._emitterOn.apply(this,arguments);
return this};d.once=function(h,j,i){this._emitterOnce.apply(this,arguments);return this
};d.off=function(h,j,i){this._emitterOff.apply(this,arguments);this._deactivateCustomEvents(h);
return this};d.has=function(h,j,i){return this._emitter.has.apply(this._emitter,arguments)
};d.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};d.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};d.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};d.add=function(h){this._customEvents[h.name]=h};d.canHandleCustomEvent=function(h){return this._customEvents.hasOwnProperty(h)
};d.isHandlingCustomEvent=function(h){if(this._customEvents[h]&&this._customEvents[h].active){return true
}return false};d._activateCustomEvents=function(l){var j=l.split(" "),k,m,h=j.length;
for(m=0;m<h;m++){k=j[m];if(this._customEvents[k]&&!this._customEvents[k].active){this._customEvents[k].initialize();
this._customEvents[k].active=true}}};d._deactivateCustomEvents=function(k){var l;
if(!k||k.length===0){for(l in this._customEvents){if(this._customEvents.hasOwnProperty(l)){this._deactivateCustomEvent(l)
}}return}var j=k.split(" "),h=j.length;for(l=0;l<h;l++){this._deactivateCustomEvent(j[l])
}};d._deactivateCustomEvent=function(h){if(!this.has(h)&&this._customEvents[h]&&this._customEvents[h].active){this._customEvents[h].deinitialize();
this._customEvents[h].active=false}};d._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)
};d._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)};
d._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};c.exports=g
},{"ac-event-emitter":88}],265:[function(b,c,a){var g=b("ac-event-emitter").EventEmitter;
var f;var d=function(h){g.call(this);this.optimizers=h;this._events={};this._properties={};
this._initialize()};f=d.prototype=new g(null);f.canOptimizeEvent=function(h){return this._events.hasOwnProperty(h)
};f.canOptimizeProperty=function(h){return this._properties.hasOwnProperty(h)};
f.isOptimizingEvent=function(h){if(this._events[h]&&this._events[h].active){return true
}return false};f.isOptimizingProperty=function(h){if(this._properties[h]&&this._properties[h].active){return true
}return false};f.add=function(h){this._setOptimizerEvents(h);this._setOptimizerProperties(h);
h.on("update",this._onUpdate,this);h.on("activate",this._onActivate,this);h.on("deactivate",this._onDeactivate,this)
};f.get=function(h){if(this.isOptimizingProperty(h)){return this._properties[h].value
}return null};f.set=function(i,h){if(!this._properties[i]){return false}this._properties[i].value=h;
return this};f.getOptimizerByEvent=function(h){if(this._events[h]){return this._events[h]
}return null};f._initialize=function(){var j,h;for(j in this.optimizers){if(this.optimizers.hasOwnProperty(j)){this.add(this.optimizers[j])
}}};f._onUpdate=function(h){this.set(h.prop,h.val)};f._onActivate=function(j){var k=j.propertyNames,l,h=k.length;
for(l=0;l<h;l++){this._properties[k[l]].active=true}};f._onDeactivate=function(j){var k=j.propertyNames,l,h=k.length;
for(l=0;l<h;l++){this._properties[k[l]].active=false}};f._setOptimizerEvents=function(j){var l,k=j.eventNames,h=k.length;
for(l=0;l<h;l++){this._setOptimizerEvent(k[l],j)}};f._setOptimizerEvent=function(i,h){if(this._events[i]){return
}this._events[i]=h};f._setOptimizerProperties=function(k){var l,j=k.propertyNames,h=j.length;
for(l=0;l<h;l++){this._setOptimizerProperty(j[l])}};f._setOptimizerProperty=function(h){if(this._properties.hasOwnProperty(h)){return
}this._properties[h]={};this._properties[h].active=false;this._properties[h].value=null
};c.exports=d},{"ac-event-emitter":88}],266:[function(d,b,g){var i;var c=d("ac-shared-instance").SharedInstance,l=d("ac-dom-emitter").DOMEmitter,j=d("./OptimizerController"),f=d("./CustomEventController"),h=d("./queries/queries"),m=d("./optimizers/optimizers");
var k="ac-window-delegate:WindowDelegate",a="2.0.1";function n(){this._emitter=new l(window);
this._controllers={optimizer:new j(m),customEvent:new f()};var o;for(o in h){if(h.hasOwnProperty(o)){this[o]=this._getProperty.bind(this,o);
h[o]=h[o].bind(this)}}this._bindEvents()}i=n.prototype;i.on=function(o,r,p){var q=this._seperateCustomEvents(o);
this._optimizeEvents(q.standardEvents);this._customEventOn(q.customEvents,r,p);
this._emitterOn.apply(this,arguments);return this};i.once=function(o,r,p){var q=this._seperateCustomEvents(o);
this._optimizeEvents(q.standardEvents);this._customEventOnce(q.customEvents,r,p);
this._emitterOnce.apply(this,arguments);return this};i.off=function(p,v,q){var u=this._seperateCustomEvents(p),r=false;
if(!p){r=true}this._customEventOff(u.customEvents,v,q,r);this._emitterOff.apply(this,arguments);
if(r){try{var o;for(o in this._controllers.optimizer._events){if(this._controllers.optimizer._events.hasOwnProperty(o)&&this._shouldDeoptimizeEvent(o,true)){this._deoptimizeEvent(o)
}}this._bindEvents()}catch(t){}}return this};i.has=function(o,q,p){return this._emitter.has.apply(this._emitter,arguments)
};i.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};i.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};i.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};i.addOptimizer=function(o){this._controllers.optimizer.add(o);return this
};i.addCustomEvent=function(o){this._controllers.customEvent.add(o);return this
};i._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)};i._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)
};i._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};i._onEventUnbound=function(p){var o=p.evt;
if(this._shouldDeoptimizeEvent(o)){this._deoptimizeEvent(o)}};i._customEventOn=function(o,q,p){if(o.length===0){return
}this._controllers.customEvent.on(o.join(" "),q,p)};i._customEventOnce=function(o,q,p){if(o.length===0){return
}this._controllers.customEvent.once(o.join(" "),q,p)};i._customEventOff=function(o,r,p,q){if(!q&&o.length===0){return
}if(q&&o.length===0){this._controllers.customEvent.off();return}this._controllers.customEvent.off(o.join(" "),r,p)
};i._getProperty=function(q,o){var p=null;if(!o){p=this._getOptimizedValue(q)}if(p===null){p=h[q].call(this,o)
}return p};i._optimizeEvents=function(q){var p,r,o=q.length;for(r=0;r<o;r++){p=q[r];
if(this._shouldOptimizeEvent(p)){this._optimizeEvent(p)}}};i._shouldOptimizeEvent=function(o){if(this._controllers.optimizer.canOptimizeEvent(o)&&!this._controllers.optimizer.isOptimizingEvent(o)){return true
}return false};i._shouldDeoptimizeEvent=function(o,p){if(this._controllers.optimizer.isOptimizingEvent(o)&&(p||this._emitter._eventEmitter._events[o].length<=1)){return true
}return false};i._optimizeEvent=function(p){var o=this._controllers.optimizer.getOptimizerByEvent(p);
o.activate();this._emitterOn(p,o.callback,o)};i._deoptimizeEvent=function(p){var o=this._controllers.optimizer.getOptimizerByEvent(p);
o.deactivate();this._emitterOff(p,o.callback,o)};i._getOptimizedValue=function(o){return this._controllers.optimizer.get(o)
};i._seperateCustomEvents=function(t){var p={customEvents:[],standardEvents:[]};
if(typeof t==="string"){var u=t.split(" "),q,r,o=u.length;for(r=0;r<o;r++){q=u[r];
if(this._controllers.customEvent.canHandleCustomEvent(q)){p.customEvents.push(q)
}else{p.standardEvents.push(q)}}}return p};i._bindEvents=function(){this._emitter.on("dom-emitter:didoff",this._onEventUnbound,this)
};b.exports=c.share(k,a,n)},{"./CustomEventController":264,"./OptimizerController":265,"./optimizers/optimizers":271,"./queries/queries":280,"ac-dom-emitter":261,"ac-shared-instance":220}],267:[function(c,d,a){var g=c("ac-event-emitter").EventEmitter;
function b(h,j,i){g.call(this);this.name=h;this.active=false;this._initializeFunc=j;
this._deinitializeFunc=i}var f=b.prototype=new g(null);f.initialize=function(){if(this._initializeFunc){this._initializeFunc()
}return this};f.deinitialize=function(){if(this._deinitializeFunc){this._deinitializeFunc()
}return this};d.exports=b},{"ac-event-emitter":88}],268:[function(c,d,b){var g=c("ac-event-emitter").EventEmitter;
function a(h,i){g.call(this);this.active=false;this.eventNames=h.eventNames;this.propertyNames=h.propertyNames;
this.options=h.options||{};this.callback=i}var f=a.prototype=new g(null);f.update=function(i,h){this.trigger("update",{prop:i,val:h})
};f.activate=function(){this.active=true;this.trigger("activate",this)};f.deactivate=function(){this.active=false;
this.trigger("deactivate",this)};d.exports=a},{"ac-event-emitter":88}],269:[function(f,g,b){var a=f("../../WindowDelegateOptimizer"),d=f("../../queries/queries");
var c={eventNames:["resize"],propertyNames:["clientWidth","clientHeight","innerWidth","innerHeight"]};
var h=new a(c,function(m){var l,k=c.propertyNames,j=k.length;for(l=0;l<j;l++){this.update(k[l],d[k[l]](true))
}});g.exports=h},{"../../WindowDelegateOptimizer":268,"../../queries/queries":280}],270:[function(g,h,b){var a=g("../../WindowDelegateOptimizer"),f=g("../../queries/queries");
var d={eventNames:["scroll"],propertyNames:["scrollX","scrollY","maxScrollX","maxScrollY"]};
var c=new a(d,function(m){var l,k=d.propertyNames,j=k.length;for(l=0;l<j;l++){this.update(k[l],f[k[l]](true))
}});h.exports=c},{"../../WindowDelegateOptimizer":268,"../../queries/queries":280}],271:[function(d,f,b){var c=d("./events/resize"),a=d("./events/scroll");
f.exports=[c,a]},{"./events/resize":269,"./events/scroll":270}],272:[function(b,c,a){var d=function(f){return document.documentElement.clientHeight
};c.exports=d},{}],273:[function(b,c,a){var d=function(f){return document.documentElement.clientWidth
};c.exports=d},{}],274:[function(b,d,a){var c=function(f){return window.innerHeight||this.clientHeight(f)
};d.exports=c},{}],275:[function(b,c,a){var d=function(f){return window.innerWidth||this.clientWidth(f)
};c.exports=d},{}],276:[function(c,d,a){var b=function(f){return document.body.scrollWidth-this.innerWidth()
};d.exports=b},{}],277:[function(c,d,b){var a=function(f){return document.body.scrollHeight-this.innerHeight()
};d.exports=a},{}],278:[function(b,c,a){var d=function(f){var h=window.pageXOffset;
if(!h){var g=document.documentElement||document.body.parentNode||document.body;
h=g.scrollLeft}return h};c.exports=d},{}],279:[function(b,c,a){var d=function(f){var h=window.pageYOffset;
if(!h){var g=document.documentElement||document.body.parentNode||document.body;
h=g.scrollTop}return h};c.exports=d},{}],280:[function(i,g,k){var b=i("./methods/innerWidth"),j=i("./methods/innerHeight"),d=i("./methods/clientWidth"),l=i("./methods/clientHeight"),c=i("./methods/scrollX"),a=i("./methods/scrollY"),h=i("./methods/maxScrollX"),f=i("./methods/maxScrollY");
g.exports={innerWidth:b,innerHeight:j,clientWidth:d,clientHeight:l,scrollX:c,scrollY:a,maxScrollX:h,maxScrollY:f}
},{"./methods/clientHeight":272,"./methods/clientWidth":273,"./methods/innerHeight":274,"./methods/innerWidth":275,"./methods/maxScrollX":276,"./methods/maxScrollY":277,"./methods/scrollX":278,"./methods/scrollY":279}],281:[function(b,c,a){c.exports={Viewport:b("./ac-viewport/Viewport")}
},{"./ac-viewport/Viewport":282}],282:[function(d,b,g){var c=d("ac-shared-instance").SharedInstance,k=d("ac-window-delegate").WindowDelegate,i=d("ac-breakpoints-delegate").BreakpointsDelegate;
var j="ac-viewport:Viewport",a="1.0.0";var h;function f(m){var n,l=k;for(n in l){if(l.hasOwnProperty(n)){this[n]=l[n]
}else{h[n]=l[n]}}this.addCustomEvent(i.getCustomEvent())}h=f.prototype;h.getBreakpoint=function(){return i.getBreakpoint()
};b.exports=c.share(j,a,f)},{"ac-breakpoints-delegate":218,"ac-shared-instance":220,"ac-window-delegate":263}]},{},[1]);