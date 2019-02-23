(function e(h,j,l){function m(a,c){if(!j[a]){if(!h[a]){var d=typeof require=="function"&&require;
if(!c&&d){return d(a,!0)}if(i){return i(a,!0)}var b=new Error("Cannot find module '"+a+"'");
throw b.code="MODULE_NOT_FOUND",b}var f=j[a]={exports:{}};h[a][0].call(f.exports,function(g){var n=h[a][1][g];
return m(n?n:g)},f,f.exports,e,h,j,l)}return j[a].exports}var i=typeof require=="function"&&require;
for(var k=0;k<l.length;k++){m(l[k])}return m})({1:[function(o,n,p){var q=o("./helpers/TabManager");
var j=o("./helpers/hideSiblingElements");var k=o("./helpers/showSiblingElements");
var l=function(a){this._tabbables=null;this._firstTabbableElement=null;this._lastTabbableElement=null;
this._relatedTarget=null;this.el=a;this._handleOnFocus=this._handleOnFocus.bind(this)
};var m=l.prototype;m.start=function(){this.updateTabbables();j(this.el);if(this._firstTabbableElement){if(!this.el.contains(document.activeElement)){this._firstTabbableElement.focus()
}}else{console.warn("this._firstTabbableElement is null, CircularTab needs at least one tabbable element.")
}this._relatedTarget=document.activeElement;document.addEventListener("focus",this._handleOnFocus,true)
};m.stop=function(){k(this.el);document.removeEventListener("focus",this._handleOnFocus,true)
};m.updateTabbables=function(){this._tabbables=q.getTabbableElements(this.el);this._firstTabbableElement=this._tabbables[0];
this._lastTabbableElement=this._tabbables[this._tabbables.length-1]};m._handleOnFocus=function(a){if(!this.el.contains(a.target)){a.preventDefault();
this.updateTabbables();if(this._relatedTarget===this._lastTabbableElement||this._relatedTarget===null){this._firstTabbableElement.focus();
this._relatedTarget=this._firstTabbableElement;return}if(this._relatedTarget===this._firstTabbableElement){this._lastTabbableElement.focus();
this._relatedTarget=this._lastTabbableElement;return}}else{this._relatedTarget=a.target
}};m.destroy=function(){this.stop();this.el=null;this._tabbables=null;this._firstTabbableElement=null;
this._lastTabbableElement=null;this._relatedTarget=null;this._handleOnFocus=null
};n.exports=l},{"./helpers/TabManager":2,"./helpers/hideSiblingElements":4,"./helpers/showSiblingElements":8}],2:[function(m,l,h){var j=m("./../maps/focusableElement");
var i=function(){this.focusableSelectors=j.join(",")};var k=i.prototype;k.isFocusableElement=function(b,c,d){if(!c&&!this._isDisplayed(b,c)){return false
}var a=b.nodeName.toLowerCase();var f=j.indexOf(a)>-1;if(a==="a"){return true}if(f){return !b.disabled
}if(!b.contentEditable){return true}d=d||parseFloat(b.getAttribute("tabindex"));
return !isNaN(d)};k.isTabbableElement=function(a,b){if(!b&&!this._isDisplayed(a,b)){return false
}var c=a.getAttribute("tabindex");c=parseFloat(c);if(!isNaN(c)){return(c>=0)}else{return this.isFocusableElement(a,b,c)
}};k._isDisplayed=function(b){var a=b.getBoundingClientRect();return a.top>0&&a.left>0&&a.width>0&&a.height>0
};k.getTabbableElements=function(a,d){var f=a.querySelectorAll(this.focusableSelectors);
var b=f.length;var c=[];for(var g=0;g<b;g++){if(this.isTabbableElement(f[g],d)){c.push(f[g])
}}return c};k.getFocusableElements=function(b,d){var f=b.querySelectorAll(this.focusableSelectors);
var c=f.length;var g=[];for(var a=0;a<c;a++){if(this.isFocusableElement(f[a],d)){g.push(f[a])
}}return g};l.exports=new i()},{"./../maps/focusableElement":10}],3:[function(s,t,r){var u=s("./setAttributes");
var o=s("./../maps/ariaMap");var l=s("./TabManager");var q="data-original-";var n="tabindex";
var m=function(a,c){var b=a.getAttribute(q+c);if(!b){b=a.getAttribute(c)||"";u(a,q+c,b)
}};t.exports=function p(a){if(l.isFocusableElement(a)){m(a,n);u(a,n,-1)}else{var c=l.getTabbableElements(a,true);
var b=c.length;while(b--){m(c[b],n);u(c[b],n,-1)}}m(a,o.HIDDEN);u(a,o.HIDDEN,true)
}},{"./../maps/ariaMap":9,"./TabManager":2,"./setAttributes":6}],4:[function(k,i,g){var j=k("./hide");
i.exports=function h(a,b){b=b||document.body;var c=a;var d=a;while((c=c.previousElementSibling)){j(c)
}while((d=d.nextElementSibling)){j(d)}if(a.parentElement&&a.parentElement!==b){h(a.parentElement)
}}},{"./hide":3}],5:[function(g,j,h){var i=function(b,c){if(typeof c!=="string"){return
}var a=c.split(/\s+/);for(var d=0;d<a.length;d++){if(b.getAttribute(a[d])){b.removeAttribute(a[d])
}}};var k=function(b,c){if(b.length){for(var a=0;a<b.length;a++){i(b[a],c)}}else{i(b,c)
}};j.exports=k},{}],6:[function(j,i,k){var g=function(b,c,a){if(b&&b.nodeType===1){b.setAttribute(c,a)
}};var h=function(d,b,a){if(typeof a!=="string"){a=a.toString()}if(!d){return}if(d.length){for(var c=0;
c<d.length;c++){g(d[c],b,a)}}else{g(d,b,a)}};i.exports=h},{}],7:[function(s,t,r){var o=s("./removeAttributes");
var u=s("./setAttributes");var n=s("./../maps/ariaMap");var q="data-original-";
var l="tabindex";var p=function(a,c){var b=a.getAttribute(q+c);if(typeof b==="string"){if(b.length){u(a,c,b)
}else{o(a,c)}o(a,q+c)}};t.exports=function m(a){o(a,l+" "+n.HIDDEN);p(a,l);p(a,n.HIDDEN);
var c=a.querySelectorAll("["+q+l+"]");var b=c.length;while(b--){p(c[b],l)}}},{"./../maps/ariaMap":9,"./removeAttributes":5,"./setAttributes":6}],8:[function(j,i,k){var g=j("./show");
i.exports=function h(a,b){b=b||document.body;var c=a;var d=a;while((c=c.previousElementSibling)){g(c)
}while((d=d.nextElementSibling)){g(d)}if(a.parentElement&&a.parentElement!==b){h(a.parentElement)
}}},{"./show":7}],9:[function(d,g,f){g.exports={AUTOCOMPLETE:"aria-autocomplete",CHECKED:"aria-checked",DISABLED:"aria-disabled",EXPANDED:"aria-expanded",HASPOPUP:"aria-haspopup",HIDDEN:"aria-hidden",INVALID:"aria-invalid",LABEL:"aria-label",LEVEL:"aria-level",MULTILINE:"aria-multiline",MULTISELECTABLE:"aria-multiselectable",ORIENTATION:"aria-orientation",PRESSED:"aria-pressed",READONLY:"aria-readonly",REQUIRED:"aria-required",SELECTED:"aria-selected",SORT:"aria-sort",VALUEMAX:"aria-valuemax",VALUEMIN:"aria-valuemin",VALUENOW:"aria-valuenow",VALUETEXT:"aria-valuetext",ATOMIC:"aria-atomic",BUSY:"aria-busy",LIVE:"aria-live",RELEVANT:"aria-relevant",DROPEFFECT:"aria-dropeffect",GRABBED:"aria-grabbed",ACTIVEDESCENDANT:"aria-activedescendant",CONTROLS:"aria-controls",DESCRIBEDBY:"aria-describedby",FLOWTO:"aria-flowto",LABELLEDBY:"aria-labelledby",OWNS:"aria-owns",POSINSET:"aria-posinset",SETSIZE:"aria-setsize"}
},{}],10:[function(d,g,f){g.exports=["input","select","textarea","button","optgroup","option","menuitem","fieldset","object","a[href]","*[tabindex]","*[contenteditable]"]
},{}],11:[function(g,k,h){g("@marcom/ac-polyfills/Array/prototype.slice");g("@marcom/ac-polyfills/Element/prototype.classList");
var j=g("./className/add");k.exports=function i(){var a=Array.prototype.slice.call(arguments);
var b=a.shift(a);var c;if(b.classList&&b.classList.add){b.classList.add.apply(b.classList,a);
return}for(c=0;c<a.length;c++){j(b,a[c])}}},{"./className/add":12,"@marcom/ac-polyfills/Array/prototype.slice":undefined,"@marcom/ac-polyfills/Element/prototype.classList":undefined}],12:[function(g,k,h){var j=g("./contains");
k.exports=function i(a,b){if(!j(a,b)){a.className+=" "+b}}},{"./contains":13}],13:[function(g,k,h){var i=g("./getTokenRegExp");
k.exports=function j(a,b){return i(b).test(a.className)}},{"./getTokenRegExp":14}],14:[function(f,i,g){i.exports=function h(a){return new RegExp("(\\s|^)"+a+"(\\s|$)")
}},{}],15:[function(m,l,h){var k=m("./contains");var j=m("./getTokenRegExp");l.exports=function i(a,b){if(k(a,b)){a.className=a.className.replace(j(b),"$1").trim()
}}},{"./contains":13,"./getTokenRegExp":14}],16:[function(j,i,k){j("@marcom/ac-polyfills/Array/prototype.slice");
j("@marcom/ac-polyfills/Element/prototype.classList");var g=j("./className/remove");
i.exports=function h(){var a=Array.prototype.slice.call(arguments);var b=a.shift(a);
var c;if(b.classList&&b.classList.remove){b.classList.remove.apply(b.classList,a);
return}for(c=0;c<a.length;c++){g(b,a[c])}}},{"./className/remove":15,"@marcom/ac-polyfills/Array/prototype.slice":undefined,"@marcom/ac-polyfills/Element/prototype.classList":undefined}],17:[function(d,g,f){g.exports={EventEmitterMicro:d("./ac-event-emitter-micro/EventEmitterMicro")}
},{"./ac-event-emitter-micro/EventEmitterMicro":18}],18:[function(g,k,h){function i(){this._events={}
}var j=i.prototype;j.on=function(b,a){this._events[b]=this._events[b]||[];this._events[b].unshift(a)
};j.once=function(d,a){var b=this;function c(f){b.off(d,c);if(f!==undefined){a(f)
}else{a()}}this.on(d,c)};j.off=function(c,a){if(!this.has(c)){return}var b=this._events[c].indexOf(a);
if(b===-1){return}this._events[c].splice(b,1)};j.trigger=function(c,a){if(!this.has(c)){return
}for(var b=this._events[c].length-1;b>=0;b--){if(a!==undefined){this._events[c][b](a)
}else{this._events[c][b]()}}};j.has=function(a){if(a in this._events===false||this._events[a].length===0){return false
}return true};j.destroy=function(){for(var a in this._events){this._events[a]=null
}this._events=null};k.exports=i},{}],19:[function(d,g,f){g.exports={Clip:d("./ac-clip/Clip")}
},{"./ac-clip/Clip":20}],20:[function(u,v,t){u("@marcom/ac-polyfills/Array/isArray");
var r=u("@marcom/ac-object/create");var m=u("@marcom/ac-easing").createPredefined;
var w=u("@marcom/ac-clock");var o=u("@marcom/ac-easing").Ease;var n=u("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var p="ease";function q(d,f,b,a){a=a||{};this._options=a;this._isYoyo=a.yoyo;this._direction=1;
this._timeScale=1;this._loop=a.loop||0;this._loopCount=0;this._target=d;this.duration(f);
this._delay=(a.delay||0)*1000;this._remainingDelay=this._delay;this._progress=0;
this._clock=a.clock||w;this._playing=false;this._getTime=Date.now||function(){return new Date().getTime()
};this._propsTo=b||{};this._propsFrom=a.propsFrom||{};this._onStart=a.onStart||null;
this._onUpdate=a.onUpdate||null;this._onDraw=a.onDraw||null;this._onComplete=a.onComplete||null;
var c=a.ease||p;this._ease=(typeof c==="function")?new o(c):m(c);this._start=this._start.bind(this);
this._update=this._update.bind(this);this._draw=this._draw.bind(this);this._isPrepared=false;
q._add(this);n.call(this)}var s=q.prototype=r(n.prototype);q.COMPLETE="complete";
q.PAUSE="pause";q.PLAY="play";s.play=function(){if(!this._playing){this._playing=true;
if(this._delay===0||this._remainingDelay===0){this._start()}else{if(!this._isPrepared){this._setDiff();
this._updateProps()}this._startTimeout=setTimeout(this._start,this._remainingDelay/this._timeScale);
this._delayStart=this._getTime()}}return this};s.pause=function(){if(this._playing){if(this._startTimeout){this._remainingDelay=this._getTime()-this._delayStart;
clearTimeout(this._startTimeout)}this._stop();this.trigger(q.PAUSE,this)}return this
};s.destroy=function(){this.pause();this._options=null;this._target=null;this._storeTarget=null;
this._ease=null;this._clock=null;this._propsTo=null;this._propsFrom=null;this._storePropsTo=null;
this._storePropsFrom=null;this._propsDiff=null;this._propsEase=null;this._onStart=null;
this._onUpdate=null;this._onDraw=null;this._onComplete=null;q._remove(this);n.prototype.destroy.call(this);
return this};s.reset=function(){if(!this._isPrepared){return}this._stop();this._resetLoop(this._target,this._storeTarget);
this._direction=1;this._loop=this._options.loop||0;this._loopCount=0;this._propsFrom=this._storePropsFrom;
this._propsTo=this._storePropsTo;this._progress=0;this._setStartTime();if(this._onUpdate){this._onUpdate.call(this,this)
}if(this._onDraw){this._onDraw.call(this,this)}return this};s.playing=function(){return this._playing
};s.target=function(){return this._target};s.duration=function(a){if(a!==undefined){this._duration=a;
this._durationMs=(a*1000)/this._timeScale;if(this._playing){this._setStartTime()
}}return this._duration};s.timeScale=function(a){if(a!==undefined){this._timeScale=a;
this.duration(this._duration)}return this._timeScale};s.currentTime=function(a){if(a!==undefined){return this.progress(a/this._duration)*this._duration
}return(this.progress()*this._duration)};s.progress=function(a){if(a!==undefined){this._progress=Math.min(1,Math.max(0,a));
this._setStartTime();if(!this._isPrepared){this._setDiff()}if(this._playing&&a===1){this._completeProps();
if(this._onUpdate){this._onUpdate.call(this,this)}if(this._onDraw){this._onDraw.call(this,this)
}this._complete()}else{this._updateProps();if(this._onUpdate){this._onUpdate.call(this,this)
}if(this._onDraw){this._onDraw.call(this,this)}}}return this._progress};s._resetLoop=function(c,a){var b;
for(b in a){if(a.hasOwnProperty(b)){if(a[b]!==null){if(typeof a[b]==="object"){this._resetLoop(c[b],a[b])
}else{c[b]=a[b]}}}}};s._cloneObjects=function(){var b={};var c={};var a={};this._cloneObjectsLoop(this._target,this._propsTo,this._propsFrom,b,c,a);
return{target:b,propsTo:c,propsFrom:a}};s._cloneObjectsLoop=function(g,b,c,d,i,a){var h;
var f;for(f in c){if(c.hasOwnProperty(f)&&b[f]===undefined&&g[f]!==undefined){d[f]=g[f];
i[f]=g[f];a[f]=c[f]}}for(f in b){if(g.hasOwnProperty(f)){h=typeof g[f];if(g[f]!==null&&h==="object"){if(Array.isArray(g[f])){d[f]=[];
i[f]=[];a[f]=[]}else{d[f]={};i[f]={};a[f]={}}this._cloneObjectsLoop(g[f],b[f]||{},c[f]||{},d[f],i[f],a[f])
}else{if(b[f]!==null&&h==="number"){d[f]=g[f];i[f]=b[f];if(c&&c[f]!==undefined){a[f]=c[f]
}}}}}};s._prepareProperties=function(){if(!this._isPrepared){var a=this._cloneObjects();
this._storeTarget=a.target;this._propsTo=a.propsTo;this._storePropsTo=this._propsTo;
this._propsFrom=a.propsFrom;this._storePropsFrom=this._propsFrom;this._isPrepared=true
}};s._setStartTime=function(){this._startTime=this._getTime()-(this.progress()*this._durationMs)
};s._setDiff=function(){if(!this._isPrepared){this._prepareProperties()}this._propsDiff={};
this._setDiffLoop(this._propsTo,this._propsFrom,this._target,this._propsDiff)};
s._setDiffLoop=function(b,c,f,g){var a;var d;for(d in b){if(b.hasOwnProperty(d)){a=typeof b[d];
if(b[d]!==null&&a==="object"){c[d]=c[d]||{};g[d]=g[d]||{};this._setDiffLoop(b[d],c[d],f[d],g[d])
}else{if(a==="number"&&f[d]!==undefined){if(c[d]!==undefined){f[d]=c[d]}else{c[d]=f[d]
}g[d]=b[d]-f[d]}else{b[d]=null;c[d]=null}}}}};s._start=function(){this._startTimeout=null;
this._remainingDelay=0;this._setStartTime();this._clock.on("update",this._update);
this._clock.on("draw",this._draw);if(!this._clock.isRunning()){this._clock.start()
}this._setDiff();this._playing=true;this._running=true;if(this._onStart){this._onStart.call(this,this)
}this.trigger(q.PLAY,this)};s._stop=function(){this._playing=false;this._running=false;
this._clock.off("update",this._update);this._clock.off("draw",this._draw)};s._updateProps=function(){var a;
if(this._direction===1){a=this._ease.getValue(this._progress)}else{a=1-this._ease.getValue(1-this._progress)
}this._updatePropsLoop(this._propsTo,this._propsFrom,this._target,this._propsDiff,a)
};s._updatePropsLoop=function(b,c,f,g,a){var d;for(d in b){if(b.hasOwnProperty(d)&&b[d]!==null){if(typeof b[d]!=="number"){this._updatePropsLoop(b[d],c[d],f[d],g[d],a)
}else{f[d]=c[d]+(g[d]*a)}}}};s._completeProps=function(){this._completePropsLoop(this._propsTo,this._target)
};s._completePropsLoop=function(b,a){var c;for(c in b){if(b.hasOwnProperty(c)&&b[c]!==null){if(typeof b[c]!=="number"){this._completePropsLoop(b[c],a[c])
}else{a[c]=b[c]}}}};s._complete=function(){if(this._isYoyo&&((this._loop>0&&this._loopCount<=this._loop)||(this._loop===0&&this._loopCount===0))){this._propsFrom=(this._direction===1)?this._storePropsTo:this._storePropsFrom;
this._propsTo=(this._direction===1)?this._storePropsFrom:this._storePropsTo;this._direction*=-1;
if(this._direction===-1){++this._loopCount}this.progress(0);this._start()}else{if(this._loopCount<this._loop){++this._loopCount;
this.progress(0);this._start()}else{this.trigger(q.COMPLETE,this);if(this._onComplete){this._onComplete.call(this,this)
}if(this._options&&this._options.destroyOnComplete){this.destroy()}}}};s._update=function(a){if(this._running){this._progress=(a.timeNow-this._startTime)/this._durationMs;
if(this._progress>=1){this._progress=1;this._running=false;this._completeProps()
}else{this._updateProps()}if(this._onUpdate){this._onUpdate.call(this,this)}}};
s._draw=function(a){if(this._onDraw){this._onDraw.call(this,this)}if(!this._running){this._stop();
if(this._progress===1){this._complete()}}};q._instantiate=function(){this._clips=[];
return this};q._add=function(a){this._clips.push(a)};q._remove=function(b){var a=this._clips.indexOf(b);
if(a>-1){this._clips.splice(a,1)}};q.getAll=function(b){if(b!==undefined){var a=[];
var c=this._clips.length;while(c--){if(this._clips[c].target()===b){a.push(this._clips[c])
}}return a}return Array.prototype.slice.call(this._clips)};q.destroyAll=function(b){var a=this.getAll(b);
if(this._clips.length===a.length){this._clips=[]}var c=a.length;while(c--){a[c].destroy()
}return a};q.to=function(c,d,b,a){a=a||{};if(a.destroyOnComplete===undefined){a.destroyOnComplete=true
}return new q(c,d,b,a).play()};q.from=function(b,c,a,d){d=d||{};d.propsFrom=a;if(d.destroyOnComplete===undefined){d.destroyOnComplete=true
}return new q(b,c,d.propsTo,d).play()};v.exports=q._instantiate()},{"@marcom/ac-clock":21,"@marcom/ac-easing":80,"@marcom/ac-event-emitter-micro":17,"@marcom/ac-object/create":180,"@marcom/ac-polyfills/Array/isArray":undefined}],21:[function(m,l,h){var j=m("./ac-clock/Clock"),k=m("./ac-clock/ThrottledClock"),i=m("./ac-clock/sharedClockInstance");
i.Clock=j;i.ThrottledClock=k;l.exports=i},{"./ac-clock/Clock":22,"./ac-clock/ThrottledClock":23,"./ac-clock/sharedClockInstance":24}],22:[function(o,n,i){o("@marcom/ac-polyfills/Function/prototype.bind");
o("@marcom/ac-polyfills/requestAnimationFrame");var l;var m=o("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var j=new Date().getTime();function k(){m.call(this);this.lastFrameTime=null;this._animationFrame=null;
this._active=false;this._startTime=null;this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);
this._getTime=Date.now||function(){return new Date().getTime()}}l=k.prototype=new m(null);
l.start=function(){if(this._active){return}this._tick()};l.stop=function(){if(this._active){window.cancelAnimationFrame(this._animationFrame)
}this._animationFrame=null;this.lastFrameTime=null;this._active=false};l.destroy=function(){this.stop();
this.off();var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null}}};l.isRunning=function(){return this._active
};l._tick=function(){if(!this._active){this._active=true}this._animationFrame=window.requestAnimationFrame(this._boundOnAnimationFrame)
};l._onAnimationFrame=function(b){if(this.lastFrameTime===null){this.lastFrameTime=b
}var a=b-this.lastFrameTime;var c=0;if(a>=1000){a=0}if(a!==0){c=1000/a}if(this._firstFrame===true){a=0;
this._firstFrame=false}if(c===0){this._firstFrame=true}else{var d={time:b,delta:a,fps:c,naturalFps:c,timeNow:this._getTime()};
this.trigger("update",d);this.trigger("draw",d)}this._animationFrame=null;this.lastFrameTime=b;
if(this._active!==false){this._tick()}else{this.lastFrameTime=null}};n.exports=k
},{"@marcom/ac-event-emitter-micro":118,"@marcom/ac-polyfills/Function/prototype.bind":undefined,"@marcom/ac-polyfills/requestAnimationFrame":undefined}],23:[function(o,n,i){o("@marcom/ac-polyfills/requestAnimationFrame");
var l;var j=o("./sharedClockInstance"),m=o("@marcom/ac-event-emitter-micro").EventEmitterMicro;
function k(a,b){if(a===null){return}m.call(this);b=b||{};this._fps=a||null;this._clock=b.clock||j;
this._lastThrottledTime=null;this._clockEvent=null;this._boundOnClockDraw=this._onClockDraw.bind(this);
this._boundOnClockUpdate=this._onClockUpdate.bind(this);this._clock.on("update",this._boundOnClockUpdate)
}l=k.prototype=new m(null);l.setFps=function(a){this._fps=a;return this};l.getFps=function(){return this._fps
};l.start=function(){this._clock.start();return this};l.stop=function(){this._clock.stop();
return this};l.isRunning=function(){return this._clock.isRunning()};l.destroy=function(){this._clock.off("update",this._boundOnClockUpdate);
this._clock.destroy.call(this)};l._onClockUpdate=function(b){if(this._lastThrottledTime===null){this._lastThrottledTime=this._clock.lastFrameTime
}var a=b.time-this._lastThrottledTime;if(!this._fps){throw new TypeError("FPS is not defined.")
}if(Math.ceil(1000/a)>=this._fps+2){return}this._clockEvent=b;this._clockEvent.delta=a;
this._clockEvent.fps=1000/a;this._lastThrottledTime=this._clockEvent.time;this._clock.once("draw",this._boundOnClockDraw);
this.trigger("update",this._clockEvent)};l._onClockDraw=function(){this.trigger("draw",this._clockEvent)
};n.exports=k},{"./sharedClockInstance":24,"@marcom/ac-event-emitter-micro":118,"@marcom/ac-polyfills/requestAnimationFrame":undefined}],24:[function(f,i,g){var h=f("./Clock");
i.exports=new h()},{"./Clock":22}],25:[function(f,i,g){var h=f("./ac-color/Color");
h.decimalToHex=f("./ac-color/static/decimalToHex");h.hexToDecimal=f("./ac-color/static/hexToDecimal");
h.hexToRgb=f("./ac-color/static/hexToRgb");h.isColor=f("./ac-color/static/isColor");
h.isHex=f("./ac-color/static/isHex");h.isRgb=f("./ac-color/static/isRgb");h.isRgba=f("./ac-color/static/isRgba");
h.mixColors=f("./ac-color/static/mixColors");h.rgbaToArray=f("./ac-color/static/rgbaToArray");
h.rgbToArray=f("./ac-color/static/rgbToArray");h.rgbToDecimal=f("./ac-color/static/rgbToDecimal");
h.rgbToHex=f("./ac-color/static/rgbToHex");h.rgbToHsl=f("./ac-color/static/rgbToHsl");
h.rgbToHsv=f("./ac-color/static/rgbToHsv");h.rgbaToObject=f("./ac-color/static/rgbaToObject");
h.rgbToObject=f("./ac-color/static/rgbToObject");h.shortToLongHex=f("./ac-color/static/shortToLongHex");
i.exports={Color:h}},{"./ac-color/Color":26,"./ac-color/static/decimalToHex":28,"./ac-color/static/hexToDecimal":29,"./ac-color/static/hexToRgb":30,"./ac-color/static/isColor":31,"./ac-color/static/isHex":32,"./ac-color/static/isRgb":33,"./ac-color/static/isRgba":34,"./ac-color/static/mixColors":35,"./ac-color/static/rgbToArray":36,"./ac-color/static/rgbToDecimal":37,"./ac-color/static/rgbToHex":38,"./ac-color/static/rgbToHsl":39,"./ac-color/static/rgbToHsv":40,"./ac-color/static/rgbToObject":41,"./ac-color/static/rgbaToArray":42,"./ac-color/static/rgbaToObject":43,"./ac-color/static/shortToLongHex":44}],26:[function(H,K,v){var E=H("./helpers/cssColorNames");
var z=H("./static/hexToRgb");var A=H("./static/isColor");var G=H("./static/isHex");
var J=H("./static/isRgba");var w=H("./static/mixColors");var B=H("./static/rgbaToArray");
var y=H("./static/rgbToArray");var t=H("./static/rgbToDecimal");var D=H("./static/rgbToHex");
var I=H("./static/rgbaToObject");var C=H("./static/rgbToObject");var x=H("./static/shortToLongHex");
function u(a){if(!A(a)&&!E.nameToRgbObject[a]){throw new Error(a+" is not a supported color.")
}this._setColor(a)}var F=u.prototype;F._setColor=function(c){this._color={};if(G(c)){this._color.hex=x(c);
this._color.rgb={color:z(c)}}else{if(J(c)){this._color.rgba={color:c};var a=this.rgbaObject();
this._color.rgb={color:"rgb("+a.r+", "+a.g+", "+a.b+")"}}else{if(E.nameToRgbObject[c]){var b=E.nameToRgbObject[c];
this._color.rgb={object:b,color:"rgb("+b.r+", "+b.g+", "+b.b+")"}}else{this._color.rgb={color:c}
}}}};F.rgb=function(){return this._color.rgb.color};F.rgba=function(){if(this._color.rgba===undefined){var a=this.rgbObject();
this._color.rgba={color:"rgba("+a.r+", "+a.g+", "+a.b+", 1)"}}return this._color.rgba.color
};F.hex=function(){if(this._color.hex===undefined){this._color.hex=D.apply(this,this.rgbArray())
}return this._color.hex};F.decimal=function(){if(this._color.decimal===undefined){this._color.decimal=t(this.rgb())
}return this._color.decimal};F.cssName=function(){return E.rgbToName[this.rgb()]||null
};F.rgbArray=function(){if(this._color.rgb.array===undefined){this._color.rgb.array=y(this.rgb())
}return this._color.rgb.array};F.rgbaArray=function(){if(this._color.rgba===undefined){this.rgba()
}if(this._color.rgba.array===undefined){this._color.rgba.array=B(this.rgba())}return this._color.rgba.array
};F.rgbObject=function(){if(this._color.rgb.object===undefined){this._color.rgb.object=C(this.rgb())
}return this._color.rgb.object};F.rgbaObject=function(){if(this._color.rgba===undefined){this.rgba()
}if(this._color.rgba.object===undefined){this._color.rgba.object=I(this.rgba())
}return this._color.rgba.object};F.getRed=function(){return this.rgbObject().r};
F.getGreen=function(){return this.rgbObject().g};F.getBlue=function(){return this.rgbObject().b
};F.getAlpha=function(){if(this._color.rgba===undefined){return 1}return this.rgbaObject().a
};F.setRed=function(a){if(a!==this.getRed()){this._setColor("rgba("+a+", "+this.getGreen()+", "+this.getBlue()+", "+this.getAlpha()+")")
}return this.rgbObject().r};F.setGreen=function(a){if(a!==this.getGreen()){this._setColor("rgba("+this.getRed()+", "+a+", "+this.getBlue()+", "+this.getAlpha()+")")
}return this.rgbObject().g};F.setBlue=function(a){if(a!==this.getBlue()){this._setColor("rgba("+this.getRed()+", "+this.getGreen()+", "+a+", "+this.getAlpha()+")")
}return this.rgbObject().b};F.setAlpha=function(a){if(a!==this.getAlpha()){this._setColor("rgba("+this.getRed()+", "+this.getGreen()+", "+this.getBlue()+", "+a+")")
}return this.rgbaObject().a};F.mix=function(c,b){var a=C(w(this.rgb(),c,b));this._setColor("rgba("+a.r+", "+a.g+", "+a.b+", "+this.getAlpha()+")");
return this.rgb()};F.clone=function(){return new u(this.rgb())};K.exports=u},{"./helpers/cssColorNames":27,"./static/hexToRgb":30,"./static/isColor":31,"./static/isHex":32,"./static/isRgba":34,"./static/mixColors":35,"./static/rgbToArray":36,"./static/rgbToDecimal":37,"./static/rgbToHex":38,"./static/rgbToObject":41,"./static/rgbaToArray":42,"./static/rgbaToObject":43,"./static/shortToLongHex":44}],27:[function(g,k,h){var j={"rgb(240, 248, 255)":"aliceblue","rgb(250, 235, 215)":"antiquewhite","rgb(0, 0, 0)":"black","rgb(0, 0, 255)":"blue","rgb(0, 255, 255)":"cyan","rgb(0, 0, 139)":"darkblue","rgb(0, 139, 139)":"darkcyan","rgb(0, 100, 0)":"darkgreen","rgb(0, 206, 209)":"darkturquoise","rgb(0, 191, 255)":"deepskyblue","rgb(0, 128, 0)":"green","rgb(0, 255, 0)":"lime","rgb(0, 0, 205)":"mediumblue","rgb(0, 250, 154)":"mediumspringgreen","rgb(0, 0, 128)":"navy","rgb(0, 255, 127)":"springgreen","rgb(0, 128, 128)":"teal","rgb(25, 25, 112)":"midnightblue","rgb(30, 144, 255)":"dodgerblue","rgb(32, 178, 170)":"lightseagreen","rgb(34, 139, 34)":"forestgreen","rgb(46, 139, 87)":"seagreen","rgb(47, 79, 79)":"darkslategray","rgb(50, 205, 50)":"limegreen","rgb(60, 179, 113)":"mediumseagreen","rgb(64, 224, 208)":"turquoise","rgb(65, 105, 225)":"royalblue","rgb(70, 130, 180)":"steelblue","rgb(72, 61, 139)":"darkslateblue","rgb(72, 209, 204)":"mediumturquoise","rgb(75, 0, 130)":"indigo","rgb(85, 107, 47)":"darkolivegreen","rgb(95, 158, 160)":"cadetblue","rgb(100, 149, 237)":"cornflowerblue","rgb(102, 205, 170)":"mediumaquamarine","rgb(105, 105, 105)":"dimgray","rgb(106, 90, 205)":"slateblue","rgb(107, 142, 35)":"olivedrab","rgb(112, 128, 144)":"slategray","rgb(119, 136, 153)":"lightslategray","rgb(123, 104, 238)":"mediumslateblue","rgb(124, 252, 0)":"lawngreen","rgb(127, 255, 212)":"aquamarine","rgb(127, 255, 0)":"chartreuse","rgb(128, 128, 128)":"gray","rgb(128, 0, 0)":"maroon","rgb(128, 128, 0)":"olive","rgb(128, 0, 128)":"purple","rgb(135, 206, 250)":"lightskyblue","rgb(135, 206, 235)":"skyblue","rgb(138, 43, 226)":"blueviolet","rgb(139, 0, 139)":"darkmagenta","rgb(139, 0, 0)":"darkred","rgb(139, 69, 19)":"saddlebrown","rgb(143, 188, 143)":"darkseagreen","rgb(144, 238, 144)":"lightgreen","rgb(147, 112, 219)":"mediumpurple","rgb(148, 0, 211)":"darkviolet","rgb(152, 251, 152)":"palegreen","rgb(153, 50, 204)":"darkorchid","rgb(154, 205, 50)":"yellowgreen","rgb(160, 82, 45)":"sienna","rgb(165, 42, 42)":"brown","rgb(169, 169, 169)":"darkgray","rgb(173, 255, 47)":"greenyellow","rgb(173, 216, 230)":"lightblue","rgb(175, 238, 238)":"paleturquoise","rgb(176, 196, 222)":"lightsteelblue","rgb(176, 224, 230)":"powderblue","rgb(178, 34, 34)":"firebrick","rgb(184, 134, 11)":"darkgoldenrod","rgb(186, 85, 211)":"mediumorchid","rgb(188, 143, 143)":"rosybrown","rgb(189, 183, 107)":"darkkhaki","rgb(192, 192, 192)":"silver","rgb(199, 21, 133)":"mediumvioletred","rgb(205, 92, 92)":"indianred","rgb(205, 133, 63)":"peru","rgb(210, 105, 30)":"chocolate","rgb(210, 180, 140)":"tan","rgb(211, 211, 211)":"lightgray","rgb(216, 191, 216)":"thistle","rgb(218, 165, 32)":"goldenrod","rgb(218, 112, 214)":"orchid","rgb(219, 112, 147)":"palevioletred","rgb(220, 20, 60)":"crimson","rgb(220, 220, 220)":"gainsboro","rgb(221, 160, 221)":"plum","rgb(222, 184, 135)":"burlywood","rgb(224, 255, 255)":"lightcyan","rgb(230, 230, 250)":"lavender","rgb(233, 150, 122)":"darksalmon","rgb(238, 232, 170)":"palegoldenrod","rgb(238, 130, 238)":"violet","rgb(240, 255, 255)":"azure","rgb(240, 255, 240)":"honeydew","rgb(240, 230, 140)":"khaki","rgb(240, 128, 128)":"lightcoral","rgb(244, 164, 96)":"sandybrown","rgb(245, 245, 220)":"beige","rgb(245, 255, 250)":"mintcream","rgb(245, 222, 179)":"wheat","rgb(245, 245, 245)":"whitesmoke","rgb(248, 248, 255)":"ghostwhite","rgb(250, 250, 210)":"lightgoldenrodyellow","rgb(250, 240, 230)":"linen","rgb(250, 128, 114)":"salmon","rgb(253, 245, 230)":"oldlace","rgb(255, 228, 196)":"bisque","rgb(255, 235, 205)":"blanchedalmond","rgb(255, 127, 80)":"coral","rgb(255, 248, 220)":"cornsilk","rgb(255, 140, 0)":"darkorange","rgb(255, 20, 147)":"deeppink","rgb(255, 250, 240)":"floralwhite","rgb(255, 215, 0)":"gold","rgb(255, 105, 180)":"hotpink","rgb(255, 255, 240)":"ivory","rgb(255, 240, 245)":"lavenderblush","rgb(255, 250, 205)":"lemonchiffon","rgb(255, 182, 193)":"lightpink","rgb(255, 160, 122)":"lightsalmon","rgb(255, 255, 224)":"lightyellow","rgb(255, 0, 255)":"magenta","rgb(255, 228, 225)":"mistyrose","rgb(255, 228, 181)":"moccasin","rgb(255, 222, 173)":"navajowhite","rgb(255, 165, 0)":"orange","rgb(255, 69, 0)":"orangered","rgb(255, 239, 213)":"papayawhip","rgb(255, 218, 185)":"peachpuff","rgb(255, 192, 203)":"pink","rgb(255, 0, 0)":"red","rgb(255, 245, 238)":"seashell","rgb(255, 250, 250)":"snow","rgb(255, 99, 71)":"tomato","rgb(255, 255, 255)":"white","rgb(255, 255, 0)":"yellow","rgb(102, 51, 153)":"rebeccapurple"};
var i={aqua:{r:0,g:255,b:255},aliceblue:{r:240,g:248,b:255},antiquewhite:{r:250,g:235,b:215},black:{r:0,g:0,b:0},blue:{r:0,g:0,b:255},cyan:{r:0,g:255,b:255},darkblue:{r:0,g:0,b:139},darkcyan:{r:0,g:139,b:139},darkgreen:{r:0,g:100,b:0},darkturquoise:{r:0,g:206,b:209},deepskyblue:{r:0,g:191,b:255},green:{r:0,g:128,b:0},lime:{r:0,g:255,b:0},mediumblue:{r:0,g:0,b:205},mediumspringgreen:{r:0,g:250,b:154},navy:{r:0,g:0,b:128},springgreen:{r:0,g:255,b:127},teal:{r:0,g:128,b:128},midnightblue:{r:25,g:25,b:112},dodgerblue:{r:30,g:144,b:255},lightseagreen:{r:32,g:178,b:170},forestgreen:{r:34,g:139,b:34},seagreen:{r:46,g:139,b:87},darkslategray:{r:47,g:79,b:79},darkslategrey:{r:47,g:79,b:79},limegreen:{r:50,g:205,b:50},mediumseagreen:{r:60,g:179,b:113},turquoise:{r:64,g:224,b:208},royalblue:{r:65,g:105,b:225},steelblue:{r:70,g:130,b:180},darkslateblue:{r:72,g:61,b:139},mediumturquoise:{r:72,g:209,b:204},indigo:{r:75,g:0,b:130},darkolivegreen:{r:85,g:107,b:47},cadetblue:{r:95,g:158,b:160},cornflowerblue:{r:100,g:149,b:237},mediumaquamarine:{r:102,g:205,b:170},dimgray:{r:105,g:105,b:105},dimgrey:{r:105,g:105,b:105},slateblue:{r:106,g:90,b:205},olivedrab:{r:107,g:142,b:35},slategray:{r:112,g:128,b:144},slategrey:{r:112,g:128,b:144},lightslategray:{r:119,g:136,b:153},lightslategrey:{r:119,g:136,b:153},mediumslateblue:{r:123,g:104,b:238},lawngreen:{r:124,g:252,b:0},aquamarine:{r:127,g:255,b:212},chartreuse:{r:127,g:255,b:0},gray:{r:128,g:128,b:128},grey:{r:128,g:128,b:128},maroon:{r:128,g:0,b:0},olive:{r:128,g:128,b:0},purple:{r:128,g:0,b:128},lightskyblue:{r:135,g:206,b:250},skyblue:{r:135,g:206,b:235},blueviolet:{r:138,g:43,b:226},darkmagenta:{r:139,g:0,b:139},darkred:{r:139,g:0,b:0},saddlebrown:{r:139,g:69,b:19},darkseagreen:{r:143,g:188,b:143},lightgreen:{r:144,g:238,b:144},mediumpurple:{r:147,g:112,b:219},darkviolet:{r:148,g:0,b:211},palegreen:{r:152,g:251,b:152},darkorchid:{r:153,g:50,b:204},yellowgreen:{r:154,g:205,b:50},sienna:{r:160,g:82,b:45},brown:{r:165,g:42,b:42},darkgray:{r:169,g:169,b:169},darkgrey:{r:169,g:169,b:169},greenyellow:{r:173,g:255,b:47},lightblue:{r:173,g:216,b:230},paleturquoise:{r:175,g:238,b:238},lightsteelblue:{r:176,g:196,b:222},powderblue:{r:176,g:224,b:230},firebrick:{r:178,g:34,b:34},darkgoldenrod:{r:184,g:134,b:11},mediumorchid:{r:186,g:85,b:211},rosybrown:{r:188,g:143,b:143},darkkhaki:{r:189,g:183,b:107},silver:{r:192,g:192,b:192},mediumvioletred:{r:199,g:21,b:133},indianred:{r:205,g:92,b:92},peru:{r:205,g:133,b:63},chocolate:{r:210,g:105,b:30},tan:{r:210,g:180,b:140},lightgray:{r:211,g:211,b:211},lightgrey:{r:211,g:211,b:211},thistle:{r:216,g:191,b:216},goldenrod:{r:218,g:165,b:32},orchid:{r:218,g:112,b:214},palevioletred:{r:219,g:112,b:147},crimson:{r:220,g:20,b:60},gainsboro:{r:220,g:220,b:220},plum:{r:221,g:160,b:221},burlywood:{r:222,g:184,b:135},lightcyan:{r:224,g:255,b:255},lavender:{r:230,g:230,b:250},darksalmon:{r:233,g:150,b:122},palegoldenrod:{r:238,g:232,b:170},violet:{r:238,g:130,b:238},azure:{r:240,g:255,b:255},honeydew:{r:240,g:255,b:240},khaki:{r:240,g:230,b:140},lightcoral:{r:240,g:128,b:128},sandybrown:{r:244,g:164,b:96},beige:{r:245,g:245,b:220},mintcream:{r:245,g:255,b:250},wheat:{r:245,g:222,b:179},whitesmoke:{r:245,g:245,b:245},ghostwhite:{r:248,g:248,b:255},lightgoldenrodyellow:{r:250,g:250,b:210},linen:{r:250,g:240,b:230},salmon:{r:250,g:128,b:114},oldlace:{r:253,g:245,b:230},bisque:{r:255,g:228,b:196},blanchedalmond:{r:255,g:235,b:205},coral:{r:255,g:127,b:80},cornsilk:{r:255,g:248,b:220},darkorange:{r:255,g:140,b:0},deeppink:{r:255,g:20,b:147},floralwhite:{r:255,g:250,b:240},fuchsia:{r:255,g:0,b:255},gold:{r:255,g:215,b:0},hotpink:{r:255,g:105,b:180},ivory:{r:255,g:255,b:240},lavenderblush:{r:255,g:240,b:245},lemonchiffon:{r:255,g:250,b:205},lightpink:{r:255,g:182,b:193},lightsalmon:{r:255,g:160,b:122},lightyellow:{r:255,g:255,b:224},magenta:{r:255,g:0,b:255},mistyrose:{r:255,g:228,b:225},moccasin:{r:255,g:228,b:181},navajowhite:{r:255,g:222,b:173},orange:{r:255,g:165,b:0},orangered:{r:255,g:69,b:0},papayawhip:{r:255,g:239,b:213},peachpuff:{r:255,g:218,b:185},pink:{r:255,g:192,b:203},red:{r:255,g:0,b:0},seashell:{r:255,g:245,b:238},snow:{r:255,g:250,b:250},tomato:{r:255,g:99,b:71},white:{r:255,g:255,b:255},yellow:{r:255,g:255,b:0},rebeccapurple:{r:102,g:51,b:153}};
k.exports={rgbToName:j,nameToRgbObject:i}},{}],28:[function(i,h,f){h.exports=function g(a){return"#"+(a).toString(16)
}},{}],29:[function(i,h,g){h.exports=function f(a){return parseInt(a.substr(1),16)
}},{}],30:[function(j,i,k){var h=j("./shortToLongHex");i.exports=function g(a){a=h(a);
var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return b?"rgb("+parseInt(b[1],16)+", "+parseInt(b[2],16)+", "+parseInt(b[3],16)+")":null
}},{"./shortToLongHex":44}],31:[function(o,m,i){var k=o("./isRgb");var l=o("./isRgba");
var j=o("./isHex");m.exports=function n(a){return j(a)||k(a)||l(a)}},{"./isHex":32,"./isRgb":33,"./isRgba":34}],32:[function(i,h,f){h.exports=function g(a){var b=/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
return b.test(a)}},{}],33:[function(f,i,g){i.exports=function h(a){var b=/^rgb\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\)$/;
return b.exec(a)!==null}},{}],34:[function(f,i,g){i.exports=function h(a){var b=/^rgba\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;
return b.exec(a)!==null}},{}],35:[function(n,m,o){var i=n("./isHex");var j=n("./hexToRgb");
var k=n("./rgbToObject");m.exports=function l(g,a,b){g=i(g)?j(g):g;a=i(a)?j(a):a;
g=k(g);a=k(a);var c=g.r+((a.r-g.r)*b);var d=g.g+((a.g-g.g)*b);var f=g.b+((a.b-g.b)*b);
return"rgb("+Math.round(c)+", "+Math.round(d)+", "+Math.round(f)+")"}},{"./hexToRgb":30,"./isHex":32,"./rgbToObject":41}],36:[function(g,k,h){var j=g("./rgbToObject");
k.exports=function i(b){var a=j(b);return[a.r,a.g,a.b]}},{"./rgbToObject":41}],37:[function(n,m,i){var o=n("./hexToDecimal");
var k=n("./rgbToArray");var l=n("./rgbToHex");m.exports=function j(b){var a=l.apply(this,k(b));
return o(a)}},{"./hexToDecimal":29,"./rgbToArray":36,"./rgbToHex":38}],38:[function(f,i,g){i.exports=function h(a,b,c){return"#"+((1<<24)+(a<<16)+(b<<8)+c).toString(16).slice(1)
}},{}],39:[function(i,h,f){h.exports=function g(v,l,c){if(arguments.length!==3){return false
}v/=255;l/=255;c/=255;var b=Math.max(v,l,c);var s=Math.min(v,l,c);var d=b+s;var a=b-s;
var r;var w;var u=(d/2);if(b===s){r=w=0}else{w=u>0.5?a/(2-b-s):a/d;switch(b){case v:r=(l-c)/a;
break;case l:r=2+((c-v)/a);break;case c:r=4+((v-l)/a);break}r*=60;if(r<0){r+=360
}}return([r,Math.round(100*w),Math.round(100*u)])}},{}],40:[function(i,h,g){h.exports=function f(y,r,d){if(arguments.length!==3){return false
}var x=y/255;var w=r/255;var b=d/255;var c=Math.max(x,w,b);var v=Math.min(x,w,b);
var s;var z;var A=c;var a=c-v;z=c===0?0:a/c;if(c===v){s=0}else{switch(c){case x:s=(w-b)/a+(w<b?6:0);
break;case w:s=(b-x)/a+2;break;case b:s=(x-w)/a+4;break}s/=6}return[Math.round(360*s),Math.round(100*z),Math.round(100*A)]
}},{}],41:[function(f,i,g){i.exports=function h(b){var a=/rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/;
var c=a.exec(b);return{r:Number(c[1]),g:Number(c[2]),b:Number(c[3])}}},{}],42:[function(g,k,h){var i=g("./rgbaToObject");
k.exports=function j(b){var a=i(b);return[a.r,a.g,a.b,a.a]}},{"./rgbaToObject":43}],43:[function(f,i,g){i.exports=function h(b){var a=/rgba\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0(\.\d+)?|1(\.0+)?)\s*\)/;
var c=a.exec(b);return{r:Number(c[1]),g:Number(c[2]),b:Number(c[3]),a:Number(c[4])}
}},{}],44:[function(i,h,f){h.exports=function g(a){var b=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;
a=a.replace(b,function(l,c,d,m){return"#"+c+c+d+d+m+m});return a}},{}],45:[function(m,l,h){var j=m("./utils/addEventListener");
var i=m("./shared/getEventType");l.exports=function k(a,c,b,d){c=i(a,c);return j(a,c,b,d)
}},{"./shared/getEventType":47,"./utils/addEventListener":49}],46:[function(l,k,m){var h=l("./utils/removeEventListener");
var i=l("./shared/getEventType");k.exports=function j(a,c,b,d){c=i(a,c);return h(a,c,b,d)
}},{"./shared/getEventType":47,"./utils/removeEventListener":50}],47:[function(k,i,g){var j=k("@marcom/ac-prefixer/getEventType");
i.exports=function h(a,b){var c;var d;if("tagName" in a){c=a.tagName}else{if(a===window){c="window"
}else{c="document"}}d=j(b,c);if(d){return d}return b}},{"@marcom/ac-prefixer/getEventType":185}],48:[function(f,i,g){i.exports=function h(a){a=a||window.event;
return(typeof a.target!=="undefined")?a.target:a.srcElement}},{}],49:[function(f,i,g){i.exports=function h(a,c,b,d){if(a.addEventListener){a.addEventListener(c,b,!!d)
}else{a.attachEvent("on"+c,b)}return a}},{}],50:[function(f,i,g){i.exports=function h(a,c,b,d){if(a.removeEventListener){a.removeEventListener(c,b,!!d)
}else{a.detachEvent("on"+c,b)}return a}},{}],51:[function(i,h,f){h.exports=function g(c,a){var b;
if(a){b=c.getBoundingClientRect();return{width:b.width,height:b.height}}return{width:c.offsetWidth,height:c.offsetHeight}
}},{}],52:[function(m,l,n){var o=m("./getDimensions");var i=m("./getScrollX");var j=m("./getScrollY");
l.exports=function k(f,g){var c;var a;var b;var d;if(g){c=f.getBoundingClientRect();
a=i();b=j();return{top:c.top+b,right:c.right+a,bottom:c.bottom+b,left:c.left+a}
}d=o(f,g);c={top:f.offsetTop,left:f.offsetLeft,width:d.width,height:d.height};while((f=f.offsetParent)){c.top+=f.offsetTop;
c.left+=f.offsetLeft}return{top:c.top,right:c.left+c.width,bottom:c.top+c.height,left:c.left}
}},{"./getDimensions":51,"./getScrollX":53,"./getScrollY":54}],53:[function(i,h,f){h.exports=function g(a){a=a||window;
if(a===window){return window.scrollX||window.pageXOffset}return a.scrollLeft}},{}],54:[function(i,h,f){h.exports=function g(a){a=a||window;
if(a===window){return window.scrollY||window.pageYOffset}return a.scrollTop}},{}],55:[function(d,g,f){g.exports=8
},{}],56:[function(d,g,f){g.exports=11},{}],57:[function(d,g,f){g.exports=9},{}],58:[function(d,g,f){g.exports=1
},{}],59:[function(d,g,f){g.exports=3},{}],60:[function(l,k,m){l("@marcom/ac-polyfills/Array/prototype.slice");
l("@marcom/ac-polyfills/Array/prototype.filter");var j=l("./internal/isNodeType");
var i=l("./ELEMENT_NODE");k.exports=function h(a,b){b=b||i;a=Array.prototype.slice.call(a);
return a.filter(function(c){return j(c,b)})}},{"./ELEMENT_NODE":58,"./internal/isNodeType":61,"@marcom/ac-polyfills/Array/prototype.filter":undefined,"@marcom/ac-polyfills/Array/prototype.slice":undefined}],61:[function(g,k,h){var j=g("../isNode");
k.exports=function i(a,b){if(!j(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)}},{"../isNode":65}],62:[function(z,B,w){var D=z("./isNodeType");
var C=z("../COMMENT_NODE");var v=z("../DOCUMENT_FRAGMENT_NODE");var x=z("../ELEMENT_NODE");
var y=z("../TEXT_NODE");var t=[x,y,C,v];var A=" must be an Element, TextNode, Comment, or Document Fragment";
var q=[x,y,C];var u=" must be an Element, TextNode, or Comment";var s=[x,v];var r=" must be an Element, or Document Fragment";
var E=" must have a parentNode";B.exports={parentNode:function(d,a,b,c){c=c||"target";
if((d||a)&&!D(d,s)){throw new TypeError(b+": "+c+r)}},childNode:function(d,a,b,c){c=c||"target";
if(!d&&!a){return}if(!D(d,q)){throw new TypeError(b+": "+c+u)}},insertNode:function(d,a,b,c){c=c||"node";
if(!d&&!a){return}if(!D(d,t)){throw new TypeError(b+": "+c+A)}},hasParentNode:function(c,a,b){b=b||"target";
if(!c.parentNode){throw new TypeError(a+": "+b+E)}}}},{"../COMMENT_NODE":55,"../DOCUMENT_FRAGMENT_NODE":56,"../ELEMENT_NODE":58,"../TEXT_NODE":59,"./isNodeType":61}],63:[function(m,l,h){var j=m("./internal/isNodeType");
var i=m("./DOCUMENT_FRAGMENT_NODE");l.exports=function k(a){return j(a,i)}},{"./DOCUMENT_FRAGMENT_NODE":56,"./internal/isNodeType":61}],64:[function(m,l,h){var j=m("./internal/isNodeType");
var i=m("./ELEMENT_NODE");l.exports=function k(a){return j(a,i)}},{"./ELEMENT_NODE":58,"./internal/isNodeType":61}],65:[function(f,i,g){i.exports=function h(a){return !!(a&&a.nodeType)
}},{}],66:[function(k,j,g){var i=/^\[object (HTMLCollection|NodeList|Object)\]$/;
j.exports=function h(a){if(!a){return false}if(typeof a.length!=="number"){return false
}if(typeof a[0]==="object"&&(!a[0]||!a[0].nodeType)){return false}return i.test(Object.prototype.toString.call(a))
}},{}],67:[function(k,j,g){var i=k("./internal/validate");j.exports=function h(a){i.childNode(a,true,"remove");
if(!a.parentNode){return a}return a.parentNode.removeChild(a)}},{"./internal/validate":62}],68:[function(m,l,h){var k=m("@marcom/ac-prefixer/getStyleProperty");
var j=m("@marcom/ac-prefixer/stripPrefixes");l.exports=function i(){var c=Array.prototype.slice.call(arguments);
var g=c.shift(c);var a=window.getComputedStyle(g);var b={};var q;var f;var r;var d;
if(typeof c[0]!=="string"){c=c[0]}for(d=0;d<c.length;d++){q=c[d];f=k(q);if(f){q=j(f);
r=a[f];if(!r||r==="auto"){r=null}if(r){r=j(r)}}else{r=null}b[q]=r}return b}},{"@marcom/ac-prefixer/getStyleProperty":187,"@marcom/ac-prefixer/stripPrefixes":195}],69:[function(i,h,f){h.exports=function g(a){var b;
var c;var d;if(!a&&a!==0){return""}if(Array.isArray(a)){return a+""}if(typeof a==="object"){b="";
c=Object.keys(a);for(d=0;d<c.length;d++){b+=c[d]+"("+a[c[d]]+") "}return b.trim()
}return a}},{}],70:[function(n,m,o){var j=n("@marcom/ac-prefixer/getStyleCSS");
var l=n("@marcom/ac-prefixer/getStyleProperty");var i=n("./internal/normalizeValue");
m.exports=function k(h,b){var c="";var d;var q;var f;var a;var g;if(typeof b!=="object"){throw new TypeError("setStyle: styles must be an Object")
}for(q in b){a=i(b[q]);if(!a&&a!==0){f=l(q);if("removeAttribute" in h.style){h.style.removeAttribute(f)
}else{h.style[f]=""}}else{d=j(q,a);if(d!==false){c+=" "+d}}}if(c.length){g=h.style.cssText;
if(g.charAt(g.length-1)!==";"){g+=";"}g+=c;h.style.cssText=g}return h}},{"./internal/normalizeValue":69,"@marcom/ac-prefixer/getStyleCSS":186,"@marcom/ac-prefixer/getStyleProperty":187}],71:[function(n,l,o){var i=n("@marcom/ac-dom-nodes/filterByNodeType");
var j=n("./filterBySelector");var k=n("./internal/validate");l.exports=function m(a,c){var b;
k.parentNode(a,true,"children");k.selector(c,false,"children");b=a.children||a.childNodes;
b=i(b);if(c){b=j(b,c)}return b}},{"./filterBySelector":72,"./internal/validate":74,"@marcom/ac-dom-nodes/filterByNodeType":60}],72:[function(l,k,m){l("@marcom/ac-polyfills/Array/prototype.slice");
l("@marcom/ac-polyfills/Array/prototype.filter");var h=l("./matchesSelector");var j=l("./internal/validate");
k.exports=function i(a,b){j.selector(b,true,"filterBySelector");a=Array.prototype.slice.call(a);
return a.filter(function(c){return h(c,b)})}},{"./internal/validate":74,"./matchesSelector":75,"@marcom/ac-polyfills/Array/prototype.filter":undefined,"@marcom/ac-polyfills/Array/prototype.slice":undefined}],73:[function(d,g,f){g.exports=window.Element?(function(a){return a.matches||a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector
}(Element.prototype)):null},{}],74:[function(z,C,x){z("@marcom/ac-polyfills/Array/prototype.indexOf");
var r=z("@marcom/ac-dom-nodes/isNode");var D=z("@marcom/ac-dom-nodes/COMMENT_NODE");
var v=z("@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE");var w=z("@marcom/ac-dom-nodes/DOCUMENT_NODE");
var y=z("@marcom/ac-dom-nodes/ELEMENT_NODE");var A=z("@marcom/ac-dom-nodes/TEXT_NODE");
var E=function(a,b){if(!r(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)};var t=[y,w,v];var s=" must be an Element, Document, or Document Fragment";
var q=[y,A,D];var u=" must be an Element, TextNode, or Comment";var B=" must be a string";
C.exports={parentNode:function(d,a,b,c){c=c||"node";if((d||a)&&!E(d,t)){throw new TypeError(b+": "+c+s)
}},childNode:function(d,a,b,c){c=c||"node";if(!d&&!a){return}if(!E(d,q)){throw new TypeError(b+": "+c+u)
}},selector:function(d,a,b,c){c=c||"selector";if((d||a)&&typeof d!=="string"){throw new TypeError(b+": "+c+B)
}}}},{"@marcom/ac-dom-nodes/COMMENT_NODE":55,"@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":56,"@marcom/ac-dom-nodes/DOCUMENT_NODE":57,"@marcom/ac-dom-nodes/ELEMENT_NODE":58,"@marcom/ac-dom-nodes/TEXT_NODE":59,"@marcom/ac-dom-nodes/isNode":65,"@marcom/ac-polyfills/Array/prototype.indexOf":undefined}],75:[function(p,o,q){var n=p("@marcom/ac-dom-nodes/isElement");
var l=p("./internal/validate");var k=p("./internal/nativeMatches");var m=p("./shims/matchesSelector");
o.exports=function j(a,b){l.selector(b,true,"matchesSelector");if(!n(a)){return false
}if(!k){return m(a,b)}return k.call(a,b)}},{"./internal/nativeMatches":73,"./internal/validate":74,"./shims/matchesSelector":77,"@marcom/ac-dom-nodes/isElement":64}],76:[function(i,o,j){i("@marcom/ac-polyfills/Array/prototype.slice");
var k=i("./internal/validate");var l=i("./shims/querySelectorAll");var m=("querySelectorAll" in document);
o.exports=function n(b,a){a=a||document;k.parentNode(a,true,"querySelectorAll","context");
k.selector(b,true,"querySelectorAll");if(!m){return l(b,a)}return Array.prototype.slice.call(a.querySelectorAll(b))
}},{"./internal/validate":74,"./shims/querySelectorAll":78,"@marcom/ac-polyfills/Array/prototype.slice":undefined}],77:[function(k,j,g){var i=k("../querySelectorAll");
j.exports=function h(a,f){var b=a.parentNode||document;var d=i(f,b);var c;for(c=0;
c<d.length;c++){if(d[c]===a){return true}}return false}},{"../querySelectorAll":76}],78:[function(s,t,q){s("@marcom/ac-polyfills/Array/prototype.indexOf");
var m=s("@marcom/ac-dom-nodes/isElement");var o=s("@marcom/ac-dom-nodes/isDocumentFragment");
var l=s("@marcom/ac-dom-nodes/remove");var r="_ac_qsa_";var n=function(c,b){var a;
if(b===document){return true}a=c;while((a=a.parentNode)&&m(a)){if(a===b){return true
}}return false};var p=function(a){if("recalc" in a){a.recalc(false)}else{document.recalc(false)
}window.scrollBy(0,0)};t.exports=function u(b,g){var d=document.createElement("style");
var c=r+(Math.random()+"").slice(-6);var a=[];var f;g=g||document;document[c]=[];
if(o(g)){g.appendChild(d)}else{document.documentElement.firstChild.appendChild(d)
}d.styleSheet.cssText="*{display:recalc;}"+b+'{ac-qsa:expression(document["'+c+'"] && document["'+c+'"].push(this));}';
p(g);while(document[c].length){f=document[c].shift();f.style.removeAttribute("ac-qsa");
if(a.indexOf(f)===-1&&n(f,g)){a.push(f)}}document[c]=null;l(d);p(g);return a}},{"@marcom/ac-dom-nodes/isDocumentFragment":63,"@marcom/ac-dom-nodes/isElement":64,"@marcom/ac-dom-nodes/remove":67,"@marcom/ac-polyfills/Array/prototype.indexOf":undefined}],79:[function(h,l,i){var m=h("./children");
var j=h("./internal/validate");l.exports=function k(a,c){var b=[];j.childNode(a,true,"siblings");
j.selector(c,false,"siblings");if(a.parentNode){b=m(a.parentNode,c);b=b.filter(function(d){return(d!==a)
})}return b}},{"./children":71,"./internal/validate":74}],80:[function(d,g,f){g.exports={createBezier:d("./ac-easing/createBezier"),createPredefined:d("./ac-easing/createPredefined"),createStep:d("./ac-easing/createStep"),Ease:d("./ac-easing/Ease")}
},{"./ac-easing/Ease":81,"./ac-easing/createBezier":82,"./ac-easing/createPredefined":83,"./ac-easing/createStep":84}],81:[function(h,m,i){var j="Ease expects an easing function.";
function k(a,b){if(typeof a!=="function"){throw new TypeError(j)}this.easingFunction=a;
this.cssString=b||null}var l=k.prototype;l.getValue=function(a){return this.easingFunction(a,0,1,1)
};m.exports=k},{}],82:[function(i,o,j){i("@marcom/ac-polyfills/Array/prototype.every");
var m=i("./Ease");var k=i("./helpers/KeySpline");var n="Bezier curve expects exactly four (4) numbers. Given: ";
o.exports=function l(r,b,s,c){var a=Array.prototype.slice.call(arguments);var f=a.every(function(p){return(typeof p==="number")
});if(a.length!==4||!f){throw new TypeError(n+a)}var d=new k(r,b,s,c);var h=function(q,w,p,v){return d.get(q/v)*p+w
};var g="cubic-bezier("+a.join(", ")+")";return new m(h,g)}},{"./Ease":81,"./helpers/KeySpline":85,"@marcom/ac-polyfills/Array/prototype.every":undefined}],83:[function(q,s,p){var l=q("./createStep");
var o=q("./helpers/cssAliases");var r=q("./helpers/easingFunctions");var m=q("./Ease");
var n='Easing function "%TYPE%" not recognized among the following: '+Object.keys(r).join(", ");
s.exports=function k(b){var a;if(b==="step-start"){return l(1,"start")}else{if(b==="step-end"){return l(1,"end")
}else{a=r[b]}}if(!a){throw new Error(n.replace("%TYPE%",b))}return new m(a,o[b])
}},{"./Ease":81,"./createStep":84,"./helpers/cssAliases":86,"./helpers/easingFunctions":87}],84:[function(n,m,o){var l=n("./Ease");
var i="Step function expects a numeric value greater than zero. Given: ";var j='Step function direction must be either "start" or "end" (default). Given: ';
m.exports=function k(d,a){a=a||"end";if(typeof d!=="number"||d<1){throw new TypeError(i+d)
}if(a!=="start"&&a!=="end"){throw new TypeError(j+a)}var b=function(h,f,g,s){var t=g/d;
var u=Math[(a==="start")?"floor":"ceil"](h/s*d);return f+t*u};var c="steps("+d+", "+a+")";
return new l(b,c)}},{"./Ease":81}],85:[function(f,i,g){
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
function h(a,d,b,q){this.get=function(j){if(a===d&&b===q){return j}return t(p(j),d,q)
};function r(k,j){return 1-3*j+3*k}function s(k,j){return 3*j-6*k}function u(j){return 3*j
}function t(j,l,k){return((r(l,k)*j+s(l,k))*j+u(l))*j}function c(j,l,k){return 3*r(l,k)*j*j+2*s(l,k)*j+u(l)
}function p(k){var m=k;for(var l=0;l<4;++l){var j=c(m,a,b);if(j===0){return m}var n=t(m,a,b)-k;
m-=n/j}return m}}i.exports=h},{}],86:[function(i,h,f){var g={linear:"cubic-bezier(0, 0, 1, 1)",ease:"cubic-bezier(0.25, 0.1, 0.25, 1)","ease-in":"cubic-bezier(0.42, 0, 1, 1)","ease-out":"cubic-bezier(0, 0, 0.58, 1)","ease-in-out":"cubic-bezier(0.42, 0, 0.58, 1)","ease-in-cubic":"cubic-bezier(0.55, 0.055, 0.675, 0.19)","ease-out-cubic":"cubic-bezier(0.215, 0.61, 0.355, 1)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1)","ease-in-quad":"cubic-bezier(0.55, 0.085, 0.68, 0.53)","ease-out-quad":"cubic-bezier(0.25, 0.46, 0.45, 0.94)","ease-in-out-quad":"cubic-bezier(0.455, 0.03, 0.515, 0.955)","ease-in-quart":"cubic-bezier(0.895, 0.03, 0.685, 0.22)","ease-out-quart":"cubic-bezier(0.165, 0.84, 0.44, 1)","ease-in-out-quart":"cubic-bezier(0.77, 0, 0.175, 1)","ease-in-quint":"cubic-bezier(0.755, 0.05, 0.855, 0.06)","ease-out-quint":"cubic-bezier(0.23, 1, 0.32, 1)","ease-in-out-quint":"cubic-bezier(0.86, 0, 0.07, 1)","ease-in-sine":"cubic-bezier(0.47, 0, 0.745, 0.715)","ease-out-sine":"cubic-bezier(0.39, 0.575, 0.565, 1)","ease-in-out-sine":"cubic-bezier(0.445, 0.05, 0.55, 0.95)","ease-in-expo":"cubic-bezier(0.95, 0.05, 0.795, 0.035)","ease-out-expo":"cubic-bezier(0.19, 1, 0.22, 1)","ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","ease-in-circ":"cubic-bezier(0.6, 0.04, 0.98, 0.335)","ease-out-circ":"cubic-bezier(0.075, 0.82, 0.165, 1)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.15, 0.86)","ease-in-back":"cubic-bezier(0.6, -0.28, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.32, 1.275)","ease-in-out-back":"cubic-bezier(0.68, -0.55, 0.265, 1.55)"};
g.easeIn=g["ease-in"];g.easeOut=g["ease-out"];g.easeInOut=g["ease-in-out"];g.easeInCubic=g["ease-in-cubic"];
g.easeOutCubic=g["ease-out-cubic"];g.easeInOutCubic=g["ease-in-out-cubic"];g.easeInQuad=g["ease-in-quad"];
g.easeOutQuad=g["ease-out-quad"];g.easeInOutQuad=g["ease-in-out-quad"];g.easeInQuart=g["ease-in-quart"];
g.easeOutQuart=g["ease-out-quart"];g.easeInOutQuart=g["ease-in-out-quart"];g.easeInQuint=g["ease-in-quint"];
g.easeOutQuint=g["ease-out-quint"];g.easeInOutQuint=g["ease-in-out-quint"];g.easeInSine=g["ease-in-sine"];
g.easeOutSine=g["ease-out-sine"];g.easeInOutSine=g["ease-in-out-sine"];g.easeInExpo=g["ease-in-expo"];
g.easeOutExpo=g["ease-out-expo"];g.easeInOutExpo=g["ease-in-out-expo"];g.easeInCirc=g["ease-in-circ"];
g.easeOutCirc=g["ease-out-circ"];g.easeInOutCirc=g["ease-in-out-circ"];g.easeInBack=g["ease-in-back"];
g.easeOutBack=g["ease-out-back"];g.easeInOutBack=g["ease-in-out-back"];h.exports=g
},{}],87:[function(ay,aA,W){var S=ay("../createBezier");var af=S(0.25,0.1,0.25,1).easingFunction;
var aw=S(0.42,0,1,1).easingFunction;var Z=S(0,0,0.58,1).easingFunction;var ae=S(0.42,0,0.58,1).easingFunction;
var ah=function(b,d,a,c){return a*b/c+d};var av=function(b,d,a,c){return a*(b/=c)*b+d
};var O=function(b,d,a,c){return -a*(b/=c)*(b-2)+d};var Y=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b+d
}return -a/2*((--b)*(b-2)-1)+d};var au=function(b,d,a,c){return a*(b/=c)*b*b+d};
var aB=function(b,d,a,c){return a*((b=b/c-1)*b*b+1)+d};var at=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b*b+d
}return a/2*((b-=2)*b*b+2)+d};var an=function(b,d,a,c){return a*(b/=c)*b*b*b+d};
var ap=function(b,d,a,c){return -a*((b=b/c-1)*b*b*b-1)+d};var am=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b*b*b+d
}return -a/2*((b-=2)*b*b*b-2)+d};var ad=function(b,d,a,c){return a*(b/=c)*b*b*b*b+d
};var ag=function(b,d,a,c){return a*((b=b/c-1)*b*b*b*b+1)+d};var ac=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b*b*b*b+d
}return a/2*((b-=2)*b*b*b*b+2)+d};var az=function(b,d,a,c){return -a*Math.cos(b/c*(Math.PI/2))+a+d
};var Q=function(b,d,a,c){return a*Math.sin(b/c*(Math.PI/2))+d};var aa=function(b,d,a,c){return -a/2*(Math.cos(Math.PI*b/c)-1)+d
};var V=function(b,d,a,c){return(b===0)?d:a*Math.pow(2,10*(b/c-1))+d};var ab=function(b,d,a,c){return(b===c)?d+a:a*(-Math.pow(2,-10*b/c)+1)+d
};var ak=function(b,d,a,c){if(b===0){return d}else{if(b===c){return d+a}else{if((b/=c/2)<1){return a/2*Math.pow(2,10*(b-1))+d
}}}return a/2*(-Math.pow(2,-10*--b)+2)+d};var aq=function(b,d,a,c){return -a*(Math.sqrt(1-(b/=c)*b)-1)+d
};var ax=function(b,d,a,c){return a*Math.sqrt(1-(b=b/c-1)*b)+d};var T=function(b,d,a,c){if((b/=c/2)<1){return -a/2*(Math.sqrt(1-b*b)-1)+d
}return a/2*(Math.sqrt(1-(b-=2)*b)+1)+d};var X=function(c,f,a,d){var h=1.70158;
var b=0;var g=a;if(c===0){return f}else{if((c/=d)===1){return f+a}}if(!b){b=d*0.3
}if(g<Math.abs(a)){g=a;h=b/4}else{h=b/(2*Math.PI)*Math.asin(a/g)}return -(g*Math.pow(2,10*(c-=1))*Math.sin((c*d-h)*(2*Math.PI)/b))+f
};var U=function(c,f,a,d){var h=1.70158;var b=0;var g=a;if(c===0){return f}else{if((c/=d)===1){return f+a
}}if(!b){b=d*0.3}if(g<Math.abs(a)){g=a;h=b/4}else{h=b/(2*Math.PI)*Math.asin(a/g)
}return g*Math.pow(2,-10*c)*Math.sin((c*d-h)*(2*Math.PI)/b)+a+f};var ai=function(c,f,a,d){var h=1.70158;
var b=0;var g=a;if(c===0){return f}else{if((c/=d/2)===2){return f+a}}if(!b){b=d*(0.3*1.5)
}if(g<Math.abs(a)){g=a;h=b/4}else{h=b/(2*Math.PI)*Math.asin(a/g)}if(c<1){return -0.5*(g*Math.pow(2,10*(c-=1))*Math.sin((c*d-h)*(2*Math.PI)/b))+f
}return g*Math.pow(2,-10*(c-=1))*Math.sin((c*d-h)*(2*Math.PI)/b)*0.5+a+f};var aj=function(b,d,a,c,f){if(f===undefined){f=1.70158
}return a*(b/=c)*b*((f+1)*b-f)+d};var al=function(b,d,a,c,f){if(f===undefined){f=1.70158
}return a*((b=b/c-1)*b*((f+1)*b+f)+1)+d};var ar=function(b,d,a,c,f){if(f===undefined){f=1.70158
}if((b/=c/2)<1){return a/2*(b*b*(((f*=(1.525))+1)*b-f))+d}return a/2*((b-=2)*b*(((f*=(1.525))+1)*b+f)+2)+d
};var R=function(b,d,a,c){if((b/=c)<(1/2.75)){return a*(7.5625*b*b)+d}else{if(b<(2/2.75)){return a*(7.5625*(b-=(1.5/2.75))*b+0.75)+d
}else{if(b<(2.5/2.75)){return a*(7.5625*(b-=(2.25/2.75))*b+0.9375)+d}}}return a*(7.5625*(b-=(2.625/2.75))*b+0.984375)+d
};var ao=function(b,d,a,c){return a-R(c-b,0,a,c)+d};var P=function(b,d,a,c){if(b<c/2){return ao(b*2,0,a,c)*0.5+d
}return R(b*2-c,0,a,c)*0.5+a*0.5+d};aA.exports={linear:ah,ease:af,easeIn:aw,"ease-in":aw,easeOut:Z,"ease-out":Z,easeInOut:ae,"ease-in-out":ae,easeInCubic:au,"ease-in-cubic":au,easeOutCubic:aB,"ease-out-cubic":aB,easeInOutCubic:at,"ease-in-out-cubic":at,easeInQuad:av,"ease-in-quad":av,easeOutQuad:O,"ease-out-quad":O,easeInOutQuad:Y,"ease-in-out-quad":Y,easeInQuart:an,"ease-in-quart":an,easeOutQuart:ap,"ease-out-quart":ap,easeInOutQuart:am,"ease-in-out-quart":am,easeInQuint:ad,"ease-in-quint":ad,easeOutQuint:ag,"ease-out-quint":ag,easeInOutQuint:ac,"ease-in-out-quint":ac,easeInSine:az,"ease-in-sine":az,easeOutSine:Q,"ease-out-sine":Q,easeInOutSine:aa,"ease-in-out-sine":aa,easeInExpo:V,"ease-in-expo":V,easeOutExpo:ab,"ease-out-expo":ab,easeInOutExpo:ak,"ease-in-out-expo":ak,easeInCirc:aq,"ease-in-circ":aq,easeOutCirc:ax,"ease-out-circ":ax,easeInOutCirc:T,"ease-in-out-circ":T,easeInBack:aj,"ease-in-back":aj,easeOutBack:al,"ease-out-back":al,easeInOutBack:ar,"ease-in-out-back":ar,easeInElastic:X,"ease-in-elastic":X,easeOutElastic:U,"ease-out-elastic":U,easeInOutElastic:ai,"ease-in-out-elastic":ai,easeInBounce:ao,"ease-in-bounce":ao,easeOutBounce:R,"ease-out-bounce":R,easeInOutBounce:P,"ease-in-out-bounce":P}
},{"../createBezier":82}],88:[function(j,i,k){var g=j("./utils/getBoundingClientRect");
i.exports=function h(c,a){var b;if(a){b=g(c);return{width:b.width,height:b.height}
}return{width:c.offsetWidth,height:c.offsetHeight}}},{"./utils/getBoundingClientRect":89}],89:[function(i,h,f){h.exports=function g(b){var a=b.getBoundingClientRect();
return{top:a.top,right:a.right,bottom:a.bottom,left:a.left,width:a.width||a.right-a.left,height:a.height||a.bottom-a.top}
}},{}],90:[function(p,r,o){p("./helpers/Float32Array");var s=p("./helpers/transitionEnd");
var n=p("@marcom/ac-clip").Clip;var l=p("./clips/ClipEasing");var q=p("./clips/ClipInlineCss");
var m=p("./clips/ClipTransitionCss");function t(d,a,c,b){if(d.nodeType){if(s===undefined||(b&&b.inlineStyles)){return new q(d,a,c,b)
}return new m(d,a,c,b)}return new l(d,a,c,b)}for(var u in n){if(typeof n[u]==="function"&&u.substr(0,1)!=="_"){t[u]=n[u].bind(n)
}}t.to=function(d,a,c,b){b=b||{};if(b.destroyOnComplete===undefined){b.destroyOnComplete=true
}return new t(d,a,c,b).play()};t.from=function(c,d,b,a){a=a||{};a.propsFrom=b;if(a.destroyOnComplete===undefined){a.destroyOnComplete=true
}return new t(c,d,a.propsTo,a).play()};r.exports=t},{"./clips/ClipEasing":93,"./clips/ClipInlineCss":94,"./clips/ClipTransitionCss":95,"./helpers/Float32Array":98,"./helpers/transitionEnd":107,"@marcom/ac-clip":19}],91:[function(d,g,f){g.exports=d("./timeline/Timeline")
},{"./timeline/Timeline":109}],92:[function(d,g,f){g.exports={Clip:d("./Clip"),Timeline:d("./Timeline")}
},{"./Clip":90,"./Timeline":91}],93:[function(z,A,y){var r=z("@marcom/ac-object/clone");
var v=z("@marcom/ac-object/create");var o=z("@marcom/ac-easing").createPredefined;
var q=z("../helpers/isCssCubicBezierString");var w=z("../helpers/BezierCurveCssManager");
var t=z("@marcom/ac-clip").Clip;var s=z("@marcom/ac-easing").Ease;function p(b,c,a,d){if(d&&q(d.ease)){d.ease=w.create(d.ease).toEasingFunction()
}d=d||{};this._propsEase=d.propsEase||{};t.call(this,b,c,a,d)}var u=t.prototype;
var x=p.prototype=v(u);x.reset=function(){var a=u.reset.call(this);if(this._clips){var b=this._clips.length;
while(b--){this._clips[b].reset()}}return a};x.destroy=function(){if(this._clips){var a=this._clips.length;
while(a--){this._clips[a].destroy()}this._clips=null}this._eases=null;this._storeOnUpdate=null;
return u.destroy.call(this)};x._prepareProperties=function(){var i=0;var f={};var h={};
var d={};var a;var b;if(this._propsEase){for(a in this._propsTo){if(this._propsTo.hasOwnProperty(a)){b=this._propsEase[a];
if(q(b)){b=w.create(b).toEasingFunction()}if(b===undefined){if(f[this._ease]===undefined){f[this._ease]={};
h[this._ease]={};d[this._ease]=this._ease.easingFunction;i++}f[this._ease][a]=this._propsTo[a];
h[this._ease][a]=this._propsFrom[a]}else{if(typeof b==="function"){f[i]={};h[i]={};
f[i][a]=this._propsTo[a];h[i][a]=this._propsFrom[a];d[i]=b;i++}else{if(f[b]===undefined){f[b]={};
h[b]={};d[b]=b;i++}f[b][a]=this._propsTo[a];h[b][a]=this._propsFrom[a]}}}}if(i>1){var g=r(this._options||{},true);
var c=this._duration*0.001;this._storeOnUpdate=this._onUpdate;this._onUpdate=this._onUpdateClips;
g.onStart=null;g.onUpdate=null;g.onDraw=null;g.onComplete=null;this._clips=[];for(b in f){if(f.hasOwnProperty(b)){g.ease=d[b];
g.propsFrom=h[b];this._clips.push(new t(this._target,c,f[b],g))}}b="linear";this._propsTo={};
this._propsFrom={}}else{for(a in d){if(d.hasOwnProperty(a)){b=d[a]}}}if(b!==undefined){this._ease=(typeof b==="function")?new s(b):o(b)
}}return u._prepareProperties.call(this)};x._onUpdateClips=function(a){var c=(this._direction===1)?a.progress():1-a.progress();
var b=this._clips.length;while(b--){this._clips[b].progress(c)}if(typeof this._storeOnUpdate==="function"){this._storeOnUpdate.call(this,this)
}};A.exports=p},{"../helpers/BezierCurveCssManager":97,"../helpers/isCssCubicBezierString":103,"@marcom/ac-clip":19,"@marcom/ac-easing":80,"@marcom/ac-object/clone":179,"@marcom/ac-object/create":180}],94:[function(u,w,t){var o=u("@marcom/ac-dom-styles/setStyle");
var x=u("../helpers/convertToStyleObject");var v=u("../helpers/convertToTransitionableObjects");
var r=u("@marcom/ac-object/create");var q=u("../helpers/removeTransitions");var n=u("./ClipEasing");
function y(b,c,a,d){d=d||{};this._el=b;this._storeOnStart=d.onStart||null;this._storeOnDraw=d.onDraw||null;
this._storeOnComplete=d.onComplete||null;d.onStart=this._onStart;d.onDraw=this._onDraw;
d.onComplete=this._onComplete;n.call(this,{},c,a,d)}var p=n.prototype;var s=y.prototype=r(p);
s.play=function(){var a=p.play.call(this);if(this._remainingDelay!==0){o(this._el,x(this._target))
}return a};s.reset=function(){var a=p.reset.call(this);o(this._el,x(this._target));
return a};s.destroy=function(){this._el=null;this._completeStyles=null;this._storeOnStart=null;
this._storeOnDraw=null;this._storeOnComplete=null;return p.destroy.call(this)};
s.target=function(){return this._el};s._prepareProperties=function(){var b=v(this._el,this._propsTo,this._propsFrom);
this._target=b.target;this._propsFrom=b.propsFrom;this._propsTo=b.propsTo;q(this._el,this._target);
var d=(this._isYoyo)?this._propsFrom:this._propsTo;this._completeStyles=x(d);if(this._options.removeStylesOnComplete!==undefined){var a;
var c=this._options.removeStylesOnComplete;if(typeof c==="boolean"&&c){for(a in this._completeStyles){if(this._completeStyles.hasOwnProperty(a)){this._completeStyles[a]=null
}}}else{if(typeof c==="object"&&c.length){var f=c.length;while(f--){a=c[f];if(this._completeStyles.hasOwnProperty(a)){this._completeStyles[a]=null
}}}}}return p._prepareProperties.call(this)};s._onStart=function(a){if(this.playing()&&this._direction===1&&this._delay===0){o(this._el,x(this._propsFrom))
}if(typeof this._storeOnStart==="function"){this._storeOnStart.call(this,this)}};
s._onDraw=function(a){o(this._el,x(this._target));if(typeof this._storeOnDraw==="function"){this._storeOnDraw.call(this,this)
}};s._onComplete=function(a){o(this._el,this._completeStyles);if(typeof this._storeOnComplete==="function"){this._storeOnComplete.call(this,this)
}};w.exports=y},{"../helpers/convertToStyleObject":100,"../helpers/convertToTransitionableObjects":101,"../helpers/removeTransitions":104,"./ClipEasing":93,"@marcom/ac-dom-styles/setStyle":70,"@marcom/ac-object/create":180}],95:[function(N,V,z){var T=N("@marcom/ac-dom-styles/setStyle");
var S=N("@marcom/ac-dom-styles/getStyle");var U=N("../helpers/convertToStyleObject");
var I=N("../helpers/convertToTransitionableObjects");var A=N("@marcom/ac-object/clone");
var K=N("@marcom/ac-object/create");var D=N("@marcom/ac-easing").createPredefined;
var L=N("../helpers/isCssCubicBezierString");var C=N("../helpers/removeTransitions");
var O=N("../helpers/transitionEnd");var J=N("../helpers/waitAnimationFrames");var B=N("../helpers/BezierCurveCssManager");
var W=N("@marcom/ac-clip").Clip;var F=N("./ClipEasing");var E=N("@marcom/ac-page-visibility").PageVisibilityManager;
var R="ease";var P="%EASE% is not a supported predefined ease when transitioning with Elements and CSS transition. If you need to use %EASE% then pass the inlineStyle:true option.";
var M="Function eases are not supported when using CSS transitions with Elements. Either use a cubic-bezier string (e.g. 'cubic-bezier(0, 0, 1, 1)' or pass the inlineStyle option as `true` to render styles each frame instead of using CSS transitions.";
function Q(d,a,c,b){b=b||{};this._el=d;this._storeEase=b.ease;if(typeof this._storeEase==="function"){throw new Error(M)
}this._storeOnStart=b.onStart||null;this._storeOnComplete=b.onComplete||null;b.onStart=this._onStart.bind(this);
b.onComplete=this._onComplete.bind(this);this._stylesTo=A(c,true);this._stylesFrom=(b.propsFrom)?A(b.propsFrom,true):{};
this._propsEase=(b.propsEase)?A(b.propsEase,true):{};if(L(b.ease)){b.ease=B.create(b.ease).toEasingFunction()
}W.call(this,{},a,{},b);this._propsFrom={}}var H=W.prototype;var G=Q.prototype=K(H);
G.play=function(){var a=H.play.call(this);if(this._direction===1&&this.progress()===0&&this._remainingDelay!==0){this._applyStyles(0,U(this._stylesFrom))
}return a};G.reset=function(){var a=H.reset.call(this);this._stylesClip.reset();
this._applyStyles(0,U(this._styles));return a};G.destroy=function(){E.off("changed",this._onVisibilityChanged);
this._removeTransitionListener();this.off("pause",this._onPaused);this._onPaused();
this._stylesClip.destroy();this._stylesClip=null;this._el=null;this._propsArray=null;
this._styles=null;this._stylesFrom=null;this._stylesTo=null;this._completeStyles=null;
this._storeOnStart=null;this._storeOnComplete=null;this._onTransitionEnded=null;
return H.destroy.call(this)};G.target=function(){return this._el};G.duration=function(a){var b=H.duration.call(this,a);
if(a===undefined){return b}if(this.playing()){this.progress(this._progress)}return b
};G.progress=function(b){var a=H.progress.call(this,b);if(b===undefined){return a
}b=(this._direction===1)?b:1-b;this._stylesClip.progress(b);this._applyStyles(0,U(this._styles));
if(this.playing()){this._isWaitingForStylesToBeApplied=true;J(this._setStylesAfterWaiting,2)
}return a};G._prepareProperties=function(){var g=I(this._el,this._stylesTo,this._stylesFrom);
this._styles=g.target;this._stylesTo=g.propsTo;this._stylesFrom=g.propsFrom;var f=this._storeEase||R;
this._eases={};this._propsArray=[];var b;this._styleCompleteTo=U(this._stylesTo);
this._styleCompleteFrom=U(this._stylesFrom);this._propsEaseKeys={};var c;for(c in this._stylesTo){if(this._stylesTo.hasOwnProperty(c)){this._propsArray[this._propsArray.length]=c;
if(this._propsEase[c]===undefined){if(this._eases[f]===undefined){b=this._convertEase(f);
this._eases[f]=b.css}this._propsEaseKeys[c]=f}else{if(this._eases[this._propsEase[c]]===undefined){b=this._convertEase(this._propsEase[c]);
this._eases[this._propsEase[c]]=b.css;this._propsEaseKeys[c]=this._propsEase[c];
this._propsEase[c]=b.js}else{if(L(this._propsEase[c])){this._propsEaseKeys[c]=this._propsEase[c];
this._propsEase[c]=this._eases[this._propsEase[c]]["1"].toEasingFunction()}}}}}this._onPaused=this._onPaused.bind(this);
this.on("pause",this._onPaused);this._setOtherTransitions();this._currentTransitionStyles=this._otherTransitions;
this._completeStyles=U((this._isYoyo)?this._stylesFrom:this._stylesTo);if(this._options.removeStylesOnComplete!==undefined){var a=this._options.removeStylesOnComplete;
if(typeof a==="boolean"&&a){for(c in this._stylesTo){this._completeStyles[c]=null
}}else{if(typeof a==="object"&&a.length){var d=a.length;while(d--){this._completeStyles[a[d]]=null
}}}}this._onTransitionEnded=this._onTransitionEnded.bind(this);this._setStylesAfterWaiting=this._setStylesAfterWaiting.bind(this);
this._onVisibilityChanged=this._onVisibilityChanged.bind(this);E.on(E.CHANGED,this._onVisibilityChanged);
this._stylesClip=new F(this._styles,1,this._stylesTo,{ease:this._options.ease,propsFrom:this._stylesFrom,propsEase:this._options.propsEase});
W._remove(this._stylesClip);return H._prepareProperties.call(this)};G._convertEase=function(d){if(typeof d==="function"){throw new Error(M)
}var c;var a;if(L(d)){c=B.create(d);a=c.toEasingFunction()}else{var b=D(d);if(b.cssString===null){throw new Error(P.replace(/%EASE%/g,d))
}c=B.create(b.cssString);a=d}return{css:{"1":c,"-1":c.reversed()},js:a}};G._complete=function(){if((this._isWaitingForStylesToBeApplied||this._isTransitionEnded||!this._isListeningForTransitionEnd)&&this.progress()===1){this._isWaitingForStylesToBeApplied=false;
H._complete.call(this)}};G._onTransitionEnded=function(){this._isTransitionEnded=true;
this._complete()};G._addTransitionListener=function(){if(!this._isListeningForTransitionEnd&&this._el&&this._onTransitionEnded){this._isListeningForTransitionEnd=true;
this._isTransitionEnded=false;this._el.addEventListener(O,this._onTransitionEnded)
}};G._removeTransitionListener=function(){if(this._isListeningForTransitionEnd&&this._el&&this._onTransitionEnded){this._isListeningForTransitionEnd=false;
this._isTransitionEnded=false;this._el.removeEventListener(O,this._onTransitionEnded)
}};G._applyStyles=function(f,d){if(f>0){var c="";var a={};var b;for(b in this._eases){if(this._eases.hasOwnProperty(b)){a[b]=this._eases[b][this._direction].splitAt(this.progress()).toCSSString()
}}for(b in this._stylesTo){if(this._stylesTo.hasOwnProperty(b)){c+=b+" "+f+"ms "+a[this._propsEaseKeys[b]]+" 0ms, "
}}this._currentTransitionStyles=c.substr(0,c.length-2);if(!this._doStylesMatchCurrentStyles(d)){this._addTransitionListener()
}else{this._removeTransitionListener()}}else{this._currentTransitionStyles="";this._removeTransitionListener()
}d.transition=this._getOtherClipTransitionStyles()+this._currentTransitionStyles;
T(this._el,d)};G._doStylesMatchCurrentStyles=function(c){var a=S.apply(this,[this._el].concat([this._propsArray]));
var b;for(b in c){if(c.hasOwnProperty(b)&&a.hasOwnProperty(b)&&c[b]!==a[b]){return false
}}return true};G._setStylesAfterWaiting=function(){this._isWaitingForStylesToBeApplied=false;
if(this.playing()){var a=this._durationMs*(1-this.progress());var b=(this._direction>0)?this._styleCompleteTo:this._styleCompleteFrom;
this._applyStyles(a,b)}};G._setOtherTransitions=function(){C(this._el,this._stylesTo);
var b=W.getAll(this._el);var a=b.length;while(a--){if(b[a]!==this&&b[a].playing()&&b[a]._otherTransitions&&b[a]._otherTransitions.length){this._otherTransitions=b[a]._otherTransitions;
return}}this._otherTransitions=S(this._el,"transition").transition;if(this._otherTransitions===null||this._otherTransitions==="all 0s ease 0s"){this._otherTransitions=""
}};G._getTransitionStyles=function(){var a=this._getOtherClipTransitionStyles();
if(this._otherTransitions.length){a+=this._otherTransitions}else{if(a.length){a=a.substr(0,a.length-2)
}}return a};G._getOtherClipTransitionStyles=function(){var c="";var b=W.getAll(this._el);
var a=b.length;while(a--){if(b[a]!==this&&b[a].playing()&&b[a]._currentTransitionStyles&&b[a]._currentTransitionStyles.length){c+=b[a]._currentTransitionStyles+", "
}}return c};G._onVisibilityChanged=function(b){if(this.playing()&&!b.isHidden){this._update({timeNow:this._getTime()});
var a=this.progress();if(a<1){this.progress(a)}}};G._onPaused=function(a){var b=S.apply(this,[this._el].concat([this._propsArray]));
b.transition=this._getTransitionStyles();this._removeTransitionListener();T(this._el,b)
};G._onStart=function(b){var a=(this._direction===1&&this.progress()===0&&this._delay===0)?2:0;
if(a){this._isWaitingForStylesToBeApplied=true;this._applyStyles(0,this._styleCompleteFrom)
}J(this._setStylesAfterWaiting,a);if(typeof this._storeOnStart==="function"){this._storeOnStart.call(this,this)
}};G._onComplete=function(a){this._removeTransitionListener();this._completeStyles.transition=this._getTransitionStyles();
T(this._el,this._completeStyles);if(typeof this._storeOnComplete==="function"){this._storeOnComplete.call(this,this)
}};V.exports=Q},{"../helpers/BezierCurveCssManager":97,"../helpers/convertToStyleObject":100,"../helpers/convertToTransitionableObjects":101,"../helpers/isCssCubicBezierString":103,"../helpers/removeTransitions":104,"../helpers/transitionEnd":107,"../helpers/waitAnimationFrames":108,"./ClipEasing":93,"@marcom/ac-clip":19,"@marcom/ac-dom-styles/getStyle":68,"@marcom/ac-dom-styles/setStyle":70,"@marcom/ac-easing":80,"@marcom/ac-object/clone":179,"@marcom/ac-object/create":180,"@marcom/ac-page-visibility":183}],96:[function(m,l,i){var j=m("@marcom/ac-easing").createBezier;
function h(a,b){this.manager=b;this.p1={x:a[0],y:a[1]};this.p2={x:a[2],y:a[3]};
this._isLinear=(this.p1.x===this.p1.y)&&(this.p2.x===this.p2.y);this._cacheSplits={}
}var k=h.prototype;k.splitAt=function(t){if(this._isLinear){return this}t=Math.round(t*40)/40;
if(t===0){return this}else{if(this._cacheSplits[t]!==undefined){return this._cacheSplits[t]
}}var b=[this.p1.x,this.p2.x];var f=[this.p1.y,this.p2.y];var g=0;var d=t;var v=0;
var c=1;var u=this._getStartX(t,b);while(d!==u&&g<1000){if(d<u){c=t}else{v=t}t=v+((c-v)*0.5);
u=this._getStartX(t,b);++g}var s=this._splitBezier(t,b,f);var a=this._normalize(s);
var w=this.manager.create(a);this._cacheSplits[d]=w;return w};k.reversed=function(){var a=this.toArray();
return this.manager.create([0.5-(a[2]-0.5),0.5-(a[3]-0.5),0.5-(a[0]-0.5),0.5-(a[1]-0.5)])
};k.toArray=function(){return[this.p1.x,this.p1.y,this.p2.x,this.p2.y]};k.toCSSString=function(){return"cubic-bezier("+this.p1.x+", "+this.p1.y+", "+this.p2.x+", "+this.p2.y+")"
};k.toEasingFunction=function(){return j.apply(this,this.toArray()).easingFunction
};k._getStartX=function(a,g){var b=a-1;var c=a*a;var d=b*b;var f=c*a;return f-3*c*b*g[1]+3*a*d*g[0]
};k._splitBezier=function(a,g,o){var b=a-1;var c=a*a;var d=b*b;var f=c*a;return[f-3*c*b*g[1]+3*a*d*g[0],f-3*c*b*o[1]+3*a*d*o[0],c-2*a*b*g[1]+d*g[0],c-2*a*b*o[1]+d*o[0],a-b*g[1],a-b*o[1]]
};k._normalize=function(a){return[(a[2]-a[0])/(1-a[0]),(a[3]-a[1])/(1-a[1]),(a[4]-a[0])/(1-a[0]),(a[5]-a[1])/(1-a[1])]
};l.exports=h},{"@marcom/ac-easing":80}],97:[function(m,l,i){var h=m("./BezierCurveCss");
function j(){this._instances={}}var k=j.prototype;k.create=function(a){var b;if(typeof a==="string"){b=a.replace(/ /g,"")
}else{b="cubic-bezier("+a.join(",")+")"}if(this._instances[b]===undefined){if(typeof a==="string"){a=a.match(/\d*\.?\d+/g);
var c=a.length;while(c--){a[c]=Number(a[c])}}this._instances[b]=new h(a,this)}return this._instances[b]
};l.exports=new j()},{"./BezierCurveCss":96}],98:[function(d,g,f){if(typeof window.Float32Array==="undefined"){window.Float32Array=function(){}
}},{}],99:[function(o,n,p){var k=o("@marcom/ac-dom-metrics/getDimensions");var q=o("./splitUnits");
var j={translateX:"width",translateY:"height"};function l(d,b,a){this._transform=d;
var c;var g;var f;for(f in a){if(a.hasOwnProperty(f)&&typeof this._transform[f]==="function"){c=q(a[f]);
if(c.unit==="%"){g=this._convertPercentToPixelValue(f,c.value,b)}else{g=c.value
}this._transform[f].call(this._transform,g)}}}var m=l.prototype;m._convertPercentToPixelValue=function(a,b,c){a=j[a];
var d=k(c);if(d[a]){b*=0.01;return d[a]*b}return b};m.toArray=function(){return this._transform.toArray()
};m.toCSSString=function(){return this._transform.toCSSString()};n.exports=l},{"./splitUnits":105,"@marcom/ac-dom-metrics/getDimensions":88}],100:[function(f,i,g){i.exports=function h(b){var c={};
var d;var a;for(a in b){if(b.hasOwnProperty(a)&&b[a]!==null){if(b[a].isColor){if(b[a].isRgb){c[a]="rgb("+Math.round(b[a].r)+", "+Math.round(b[a].g)+", "+Math.round(b[a].b)+")"
}else{if(b[a].isRgba){c[a]="rgba("+Math.round(b[a].r)+", "+Math.round(b[a].g)+", "+Math.round(b[a].b)+", "+b[a].a+")"
}}}else{if(a==="transform"){d=(b[a].length===6)?"matrix":"matrix3d";c[a]=d+"("+b[a].join(",")+")"
}else{if(!b[a].unit){c[a]=b[a].value}else{c[a]=b[a].value+b[a].unit}}}}}return c
}},{}],101:[function(C,F,A){var x=C("@marcom/ac-dom-styles/getStyle");var v=C("@marcom/ac-object/clone");
var E=C("./splitUnits");var H=C("./toCamCase");var G=C("@marcom/ac-color").Color;
var y=C("@marcom/ac-feature/cssPropertyAvailable");var B=C("@marcom/ac-transform").Transform;
var I=C("./TransformMatrix");var w=function(a){if(G.isRgba(a)){a=new G(a).rgbaObject();
a.isRgba=true}else{a=new G(a).rgbObject();a.isRgb=true}a.isColor=true;return a};
var s=function(a){if(a.isRgb){a.isRgb=false;a.isRgba=true;a.a=1}};var t=function(b,c,a){if(b.isRgba||c.isRgba||a.isRgba){s(b);
s(c);s(a)}};var u=function(a){return[a[0],a[1],0,0,a[2],a[3],0,0,0,0,1,0,a[4],a[5],0,1]
};var z=function(b,c,a){if(b.transform.length===16||c.transform.length===16||a.transform.length===16){if(b.transform.length===6){b.transform=u(b.transform)
}if(c.transform.length===6){c.transform=u(c.transform)}if(a.transform.length===6){a.transform=u(a.transform)
}}};F.exports=function D(i,b,c){var g={};b=v(b,true);c=v(c,true);var j;var a;var f;
var d;var h=y("transform");var k;for(k in b){if(b.hasOwnProperty(k)&&b[k]!==null){if(k==="transform"){if(h){a=new B();
j=x(i,"transform")["transform"]||"none";a.setMatrixValue(j);f=new I(new B(),i,b[k])
}if(f&&f.toCSSString()!==a.toCSSString()){d=new I(c[k]?new B():a.clone(),i,c[k]);
g[k]=a.toArray();b[k]=f.toArray();c[k]=d.toArray()}else{g[k]=null;b[k]=null}}else{j=x(i,k)[H(k)]||c[k];
if(G.isColor(j)){g[k]=w(j);c[k]=(c[k]!==undefined)?w(c[k]):v(g[k],true);b[k]=w(b[k])
}else{g[k]=E(j);c[k]=(c[k]!==undefined)?E(c[k]):v(g[k],true);b[k]=E(b[k])}}}}for(k in c){if(c.hasOwnProperty(k)&&c[k]!==null&&(b[k]===undefined||b[k]===null)){if(k==="transform"){if(h){a=new B();
a.setMatrixValue(getComputedStyle(i).transform||getComputedStyle(i).webkitTransform||"none");
d=new I(new B(),i,c[k])}if(d&&d.toCSSString()!==a.toCSSString()){f=new I(a.clone());
g[k]=a.toArray();b[k]=f.toArray();c[k]=d.toArray()}else{g[k]=null;b[k]=null;c[k]=null
}}else{j=x(i,k)[H(k)];if(G.isColor(j)){g[k]=w(j);b[k]=v(g[k],true);c[k]=w(c[k])
}else{g[k]=E(j);c[k]=E(c[k]);b[k]=v(g[k],true)}}}if(g[k]&&g[k].isColor){t(g[k],c[k],b[k])
}}if(g.transform){z(g,c,b)}return{target:g,propsTo:b,propsFrom:c}}},{"./TransformMatrix":99,"./splitUnits":105,"./toCamCase":106,"@marcom/ac-color":25,"@marcom/ac-dom-styles/getStyle":68,"@marcom/ac-feature/cssPropertyAvailable":120,"@marcom/ac-object/clone":179,"@marcom/ac-transform":217}],102:[function(f,i,g){i.exports=function h(d){if(d.transitionProperty){var a="";
var n=d.transitionProperty.split(", ");var c=d.transitionDuration.split(", ");var b=d.transitionTimingFunction.replace(/\d+[,]+[\s]/gi,function(j){return j.substr(0,j.length-1)
}).split(", ");var p=d.transitionDelay.split(", ");var o=n.length;while(o--){a+=n[o]+" "+c[o]+" "+b[o]+" "+p[o]+", "
}return a.substr(0,a.length-2)}return false}},{}],103:[function(i,h,f){h.exports=function g(a){return typeof a==="string"&&a.substr(0,13)==="cubic-bezier("
}},{}],104:[function(n,m,o){var k=n("@marcom/ac-dom-styles/setStyle");var j=n("@marcom/ac-dom-styles/getStyle");
var l=n("./getShorthandTransition");m.exports=function i(b,g){var a=j(b,"transition","transition-property","transition-duration","transition-timing-function","transition-delay");
a=a.transition||l(a);if(a&&a.length){a=a.split(",");var c=0;var f;var d=a.length;
while(d--){f=a[d].trim().split(" ")[0];if(g[f]!==undefined){a.splice(d,1);++c}}if(c){if(a.length===0){a=["all"]
}k(b,{transition:a.join(",").trim()})}}}},{"./getShorthandTransition":102,"@marcom/ac-dom-styles/getStyle":68,"@marcom/ac-dom-styles/setStyle":70}],105:[function(i,h,f){h.exports=function g(a){a=String(a);
if(a.indexOf(" ")>-1){throw new Error("Shorthand CSS is not supported. Please use longhand CSS only.")
}var b=/(\d*\.?\d*)(.*)/;var d=1;if(a&&a.substr(0,1)==="-"){a=a.substr(1);d=-1}var c=String(a).match(b);
return{value:Number(c[1])*d,unit:c[2]}}},{}],106:[function(i,h,f){h.exports=function g(a){var b=function(l,d,c,m){return(c===0)&&(m.substr(1,3)!=="moz")?d:d.toUpperCase()
};return a.replace(/-(\w)/g,b)}},{}],107:[function(j,i,k){var h;i.exports=(function g(){if(h){return h
}var c;var b=document.createElement("fakeelement");var a={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};
for(c in a){if(b.style[c]!==undefined){h=a[c];return h}}})()},{}],108:[function(j,i,g){var h=j("@marcom/ac-page-visibility").PageVisibilityManager;
i.exports=function k(a,c){if(c){var b=function(m){if(h.isHidden){setTimeout(m,16)
}else{window.requestAnimationFrame(m)}};var d=0;var f=function(){if(d===c){a.call(this)
}else{++d;b(f)}};f()}else{a.call(this)}}},{"@marcom/ac-page-visibility":183}],109:[function(u,w,t){var q=u("@marcom/ac-object/create");
var p=u("@marcom/ac-clip").Clip;var s=u("./TimelineClip");var v=u("./TimelineCallback");
var m=u("./TimelineItemList");var n=p.prototype;function o(a){a=a||{};a.ease=a.ease||"linear";
a.destroyOnComplete=false;this.options=a;p.call(this,{t:0},0,{t:1},a);this._itemList=new m()
}var r=o.prototype=q(n);o.prototype.constructor=o;r._update=function(a){n._update.call(this,a);
this._render()};r.progress=function(a){n.progress.call(this,a);if(a!==undefined){this._render()
}return this._progress};r._render=function(){if(this._itemList.length===0){return
}var b=this._target.t*this._duration;var a=this._itemList.head;var d=a;while(d){d=a.next;
var c=(b-a.position);a.currentTime(c);a=d}};r.addClip=function(b,c){c=(c===undefined)?this.duration():c;
var a=b._delay/1000;this._itemList.append(new s(b,c+a));this._updateDuration()};
r.addCallback=function(b,a){a=(a===undefined)?this.duration():a;this._itemList.append(new v(b,a));
this._updateDuration()};r.remove=function(a){var b=this._itemList.getItem(a);if(b){this._itemList.remove(b);
this._updateDuration()}};r._updateDuration=function(){var a=this._itemList.head;
var b=a.position+a.duration();this._itemList.forEach(function(c){var d=c.position+c.duration();
if(d>=b){a=c;b=d}});this.duration(b)};r.destroy=function(){var a=this._itemList.head;
while(a){var b=a;a=b.next;this._itemList.remove(b)}this._duration=0;return n.destroy.call(this)
};w.exports=o},{"./TimelineCallback":110,"./TimelineClip":111,"./TimelineItemList":112,"@marcom/ac-clip":19,"@marcom/ac-object/create":180}],110:[function(g,k,h){function i(a,b){this.callback=a;
this._delay=0;this.position=b;this._hasTriggered=false;this.prev=null;this.next=null
}var j=i.prototype;j.duration=function(){return 0};j.currentTime=function(a){if(a>=0&&!this._hasTriggered){this.callback();
this._hasTriggered=true}if(a<0&&this._hasTriggered){this.callback();this._hasTriggered=false
}return 0};k.exports=i},{}],111:[function(g,k,h){function i(a,b){this.clip=a;this.position=b;
this.duration=this.clip.duration.bind(this.clip);this.lastProgress=-1;this.prev=null;
this.next=null}var j=i.prototype;j.currentTime=function(a){var b=Math.min(1,Math.max(0,a/this.clip._duration));
if(b!==b){b=1}if(this.lastProgress===b){return this.lastProgress}if(this.lastProgress===0||b===0||this.lastProgress===-1){if(this.clip._storeOnStart){this.clip._storeOnStart(this.clip)
}}this.clip._playing=(b*this.clip._duration===this.clip._duration);this.lastProgress=this.clip.progress(b);
return this.lastProgress};j.destroy=function(){this.clip.destroy();this.prev=null;
this.next=null;this.duration=null};k.exports=i},{}],112:[function(i,o,j){var k=i("./TimelineClip");
var m=i("./TimelineCallback");var l=function(){this.head=null;this.tail=null;this.length=0
};var n=l.prototype;n.append=function(a){a.prev=null;a.next=null;if(this.tail){this.tail.next=a;
a.prev=this.tail}else{this.head=a}this.tail=a;this.length++};n.remove=function(a){if(a===this.head){this.head=this.head.next
}else{if(a===this.tail){this.tail=this.tail.prev}}if(a.prev){a.prev.next=a.next
}if(a.next){a.next.prev=a.prev}a.next=a.prev=null;if(this.head===null){this.tail=null
}this.length--};n.getItem=function(c){var b=this.head;while(b){var a=b;if((a instanceof k&&a.clip===c)||(a instanceof m&&a.callback===c)){return a
}b=a.next}return null};n.forEach=function(a){var d=0;var c=this.head;while(c){var b=c;
a(b,d,this.length);c=b.next}};n.destroy=function(){while(this.head){var a=this.head;
this.remove(a);a.destroy()}};o.exports=l},{"./TimelineCallback":110,"./TimelineClip":111}],113:[function(f,h,g){var i=f("./ac-element-engagement/ElementEngagement");
h.exports=new i();h.exports.ElementEngagement=i},{"./ac-element-engagement/ElementEngagement":114}],114:[function(s,t,q){var p;
var l=s("@marcom/ac-event-emitter-micro").EventEmitterMicro;var r={defaults:s("@marcom/ac-object/defaults"),extend:s("@marcom/ac-object/extend")};
var o=s("@marcom/ac-element-tracker").ElementTracker;var m={timeToEngage:500,inViewThreshold:0.75,stopOnEngaged:true};
var n={thresholdEnterTime:0,thresholdExitTime:0,inThreshold:false,engaged:false,tracking:true};
var u=function(a){o.call(this,null,a);l.call(this);this._thresholdEnter=this._thresholdEnter.bind(this);
this._thresholdExit=this._thresholdExit.bind(this);this._enterView=this._enterView.bind(this);
this._exitView=this._exitView.bind(this)};p=u.prototype=Object.create(o.prototype);
p=r.extend(p,l.prototype);p._decorateTrackedElement=function(a,b){var c;c=r.defaults(m,b||{});
r.extend(a,c);r.extend(a,n)};p._attachElementListeners=function(a){a.on("thresholdenter",this._thresholdEnter,this);
a.on("thresholdexit",this._thresholdExit,this);a.on("enterview",this._enterView,this);
a.on("exitview",this._exitView,this)};p._removeElementListeners=function(a){a.off("thresholdenter",this._thresholdEnter);
a.off("thresholdexit",this._thresholdExit);a.off("enterview",this._enterView);a.off("exitview",this._exitView)
};p._attachAllElementListeners=function(){this.elements.forEach(function(a){if(!a.stopOnEngaged){this._attachElementListeners(a)
}else{if(!a.engaged){this._attachElementListeners(a)}}},this)};p._removeAllElementListeners=function(){this.elements.forEach(function(a){this._removeElementListeners(a)
},this)};p._elementInViewPastThreshold=function(a){var b=false;if(a.pixelsInView===this._windowHeight){b=true
}else{b=(a.percentInView>a.inViewThreshold)}return b};p._ifInView=function(b,c){var a=b.inThreshold;
o.prototype._ifInView.apply(this,arguments);if(!a&&this._elementInViewPastThreshold(b)){b.inThreshold=true;
b.trigger("thresholdenter",b);if(typeof b.timeToEngage==="number"&&b.timeToEngage>=0){b.engagedTimeout=window.setTimeout(this._engaged.bind(this,b),b.timeToEngage)
}}};p._ifAlreadyInView=function(b){var a=b.inThreshold;o.prototype._ifAlreadyInView.apply(this,arguments);
if(a&&!this._elementInViewPastThreshold(b)){b.inThreshold=false;b.trigger("thresholdexit",b);
if(b.engagedTimeout){window.clearTimeout(b.engagedTimeout);b.engagedTimeout=null
}}};p._engaged=function(a){a.engagedTimeout=null;this._elementEngaged(a);a.trigger("engaged",a);
this.trigger("engaged",a)};p._thresholdEnter=function(a){a.thresholdEnterTime=Date.now();
a.thresholdExitTime=0;this.trigger("thresholdenter",a)};p._thresholdExit=function(a){a.thresholdExitTime=Date.now();
this.trigger("thresholdexit",a)};p._enterView=function(a){this.trigger("enterview",a)
};p._exitView=function(a){this.trigger("exitview",a)};p._elementEngaged=function(a){a.engaged=true;
if(a.stopOnEngaged){this.stop(a)}};p.stop=function(a){if(this.tracking&&!a){this._removeAllElementListeners();
o.prototype.stop.call(this)}if(a&&a.tracking){a.tracking=false;this._removeElementListeners(a);
this.removeElement(a)}};p.start=function(a){if(!a){this._attachAllElementListeners()
}if(a&&!a.tracking){if(!a.stopOnEngaged){a.tracking=true;this._attachElementListeners(a)
}else{if(!a.engaged){a.tracking=true;this._attachElementListeners(a)}}}if(!this.tracking){o.prototype.start.call(this)
}else{this.refreshAllElementMetrics();this.refreshAllElementStates()}};p.addElement=function(c,b){b=b||{};
var a=o.prototype.addElement.call(this,c,b.useRenderedPosition);this._decorateTrackedElement(a,b);
return a};p.addElements=function(a,b){[].forEach.call(a,function(c){this.addElement(c,b)
},this)};t.exports=u},{"@marcom/ac-element-tracker":115,"@marcom/ac-event-emitter-micro":118,"@marcom/ac-object/defaults":181,"@marcom/ac-object/extend":182}],115:[function(g,k,h){var i=g("./ac-element-tracker/ElementTracker");
var j=g("./ac-element-tracker/TrackedElement");k.exports=new i();k.exports.ElementTracker=i;
k.exports.TrackedElement=j},{"./ac-element-tracker/ElementTracker":116,"./ac-element-tracker/TrackedElement":117}],116:[function(r,s,o){var l={isNodeList:r("@marcom/ac-dom-nodes/isNodeList"),isElement:r("@marcom/ac-dom-nodes/isElement")};
var u={getDimensions:r("@marcom/ac-dom-metrics/getDimensions"),getPagePosition:r("@marcom/ac-dom-metrics/getPagePosition"),getScrollY:r("@marcom/ac-dom-metrics/getScrollY")};
var q={clone:r("@marcom/ac-object/clone"),extend:r("@marcom/ac-object/extend")};
var m=r("./TrackedElement");var p={autoStart:false,useRenderedPosition:false};function t(a,b){this.options=q.clone(p);
this.options=typeof b==="object"?q.extend(this.options,b):this.options;this._scrollY=this._getScrollY();
this._windowHeight=this._getWindowHeight();this.tracking=false;this.elements=[];
if(a&&(Array.isArray(a)||l.isNodeList(a)||l.isElement(a))){this.addElements(a)}this.refreshAllElementStates=this.refreshAllElementStates.bind(this);
this.refreshAllElementMetrics=this.refreshAllElementMetrics.bind(this);if(this.options.autoStart){this.start()
}}var n=t.prototype;n.destroy=function(){var a,b;this.stop();for(a=0,b=this.elements.length;
a<b;a++){this.elements[a].destroy()}this.elements=null;this.options=null};n._registerTrackedElements=function(b){var a=[].concat(b);
a.forEach(function(c){if(this._elementInDOM(c.element)){c.offsetTop=c.element.offsetTop;
this.elements.push(c)}},this)};n._elementInDOM=function(c){var a=false;var b=document.getElementsByTagName("body")[0];
if(l.isElement(c)&&b.contains(c)){a=true}return a};n._elementPercentInView=function(a){return a.pixelsInView/a.height
};n._elementPixelsInView=function(a){var b=a.top-this._scrollY;var c=a.bottom-this._scrollY;
if(b>this._windowHeight||c<0){return 0}return Math.min(c,this._windowHeight)-Math.max(b,0)
};n._ifInView=function(b,a){if(!a){b.trigger("enterview",b)}};n._ifAlreadyInView=function(a){if(!a.inView){a.trigger("exitview",a)
}};n.addElements=function(c,d){if(typeof d==="undefined"){d=this.options.useRenderedPosition
}c=l.isNodeList(c)?Array.prototype.slice.call(c):[].concat(c);for(var a=0,b=c.length;
a<b;a++){this.addElement(c[a],d)}};n.addElement=function(a,c){var b=null;if(typeof c==="undefined"){c=this.options.useRenderedPosition
}if(l.isElement(a)){b=new m(a,c);this._registerTrackedElements(b);this.refreshElementMetrics(b);
this.refreshElementState(b)}else{throw new TypeError("ElementTracker: "+a+" is not a valid DOM element")
}return b};n.removeElement=function(c){var a=[];var b;this.elements.forEach(function(d,f){if(d===c||d.element===c){a.push(f)
}});b=this.elements.filter(function(d,f){return a.indexOf(f)<0});this.elements=b
};n.start=function(){if(this.tracking===false){this.tracking=true;window.addEventListener("resize",this.refreshAllElementMetrics);
window.addEventListener("orientationchange",this.refreshAllElementMetrics);window.addEventListener("scroll",this.refreshAllElementStates);
this.refreshAllElementMetrics()}};n.stop=function(){if(this.tracking===true){this.tracking=false;
window.removeEventListener("resize",this.refreshAllElementMetrics);window.removeEventListener("orientationchange",this.refreshAllElementMetrics);
window.removeEventListener("scroll",this.refreshAllElementStates)}};n.refreshAllElementMetrics=function(b,a){if(typeof b!=="number"){b=this._getScrollY()
}if(typeof a!=="number"){a=this._getWindowHeight()}this._scrollY=b;this._windowHeight=a;
this.elements.forEach(this.refreshElementMetrics,this)};n.refreshElementMetrics=function(a){if(!a.isActive){return a
}var c=u.getDimensions(a.element,a.useRenderedPosition);var b=u.getPagePosition(a.element,a.useRenderedPosition);
a=q.extend(a,c,b);return this.refreshElementState(a)};n.refreshAllElementStates=function(a){if(typeof a!=="number"){a=this._getScrollY()
}this._scrollY=a;this.elements.forEach(this.refreshElementState,this)};n.refreshElementState=function(b){if(!b.isActive){return b
}var a=b.inView;b.pixelsInView=this._elementPixelsInView(b);b.percentInView=this._elementPercentInView(b);
b.inView=b.pixelsInView>0;if(b.inView){this._ifInView(b,a)}if(a){this._ifAlreadyInView(b)
}return b};n.pauseElementTracking=function(a){if(a){a.isActive=false}};n.resumeElementTracking=function(a){if(a){a.isActive=true
}};n._getWindowHeight=function(){return window.innerHeight};n._getScrollY=function(){return u.getScrollY()
};s.exports=t},{"./TrackedElement":117,"@marcom/ac-dom-metrics/getDimensions":51,"@marcom/ac-dom-metrics/getPagePosition":52,"@marcom/ac-dom-metrics/getScrollY":54,"@marcom/ac-dom-nodes/isElement":64,"@marcom/ac-dom-nodes/isNodeList":66,"@marcom/ac-object/clone":179,"@marcom/ac-object/extend":182}],117:[function(q,p,j){var k={isElement:q("@marcom/ac-dom-nodes/isElement")};
var n=q("@marcom/ac-event-emitter-micro").EventEmitterMicro;var l=n.prototype;function m(b,a){if(!k.isElement(b)){throw new TypeError("TrackedElement: "+b+" is not a valid DOM element")
}n.call(this);this.element=b;this.inView=false;this.isActive=true;this.percentInView=0;
this.pixelsInView=0;this.offsetTop=0;this.top=0;this.right=0;this.bottom=0;this.left=0;
this.width=0;this.height=0;this.useRenderedPosition=a||false}var o=m.prototype=Object.create(l);
o.destroy=function(){this.element=null;l.destroy.call(this)};p.exports=m},{"@marcom/ac-dom-nodes/isElement":64,"@marcom/ac-event-emitter-micro":118}],118:[function(d,g,f){g.exports={EventEmitterMicro:d("./ac-event-emitter-micro/EventEmitterMicro")}
},{"./ac-event-emitter-micro/EventEmitterMicro":119}],119:[function(g,k,h){function i(){this._events={}
}var j=i.prototype;j.on=function(b,a){this._events[b]=this._events[b]||[];this._events[b].unshift(a)
};j.once=function(d,a){var b=this;function c(f){b.off(d,c);if(f!==undefined){a(f)
}else{a()}}this.on(d,c)};j.off=function(c,a){if(!this.has(c)){return}if(arguments.length===1){this._events[c]=null;
delete this._events[c];return}var b=this._events[c].indexOf(a);if(b===-1){return
}this._events[c].splice(b,1)};j.trigger=function(c,a){if(!this.has(c)){return}for(var b=this._events[c].length-1;
b>=0;b--){if(a!==undefined){this._events[c][b](a)}else{this._events[c][b]()}}};
j.has=function(a){if(a in this._events===false||this._events[a].length===0){return false
}return true};j.destroy=function(){for(var a in this._events){this._events[a]=null
}this._events=null};k.exports=i},{}],120:[function(o,n,i){var l=o("@marcom/ac-prefixer/getStyleValue");
var m=o("@marcom/ac-prefixer/getStyleProperty");var k=o("@marcom/ac-function/memoize");
function j(a,b){if(typeof b!=="undefined"){return !!l(a,b)}else{return !!m(a)}}n.exports=k(j);
n.exports.original=j},{"@marcom/ac-function/memoize":129,"@marcom/ac-prefixer/getStyleProperty":187,"@marcom/ac-prefixer/getStyleValue":188}],121:[function(d,g,f){g.exports={getWindow:function(){return window
},getDocument:function(){return document},getNavigator:function(){return navigator
}}},{}],122:[function(n,m,i){var j=n("./touchAvailable").original;var k=n("./helpers/globals");
var l=n("@marcom/ac-function/once");function o(){var a=k.getWindow();return(!j()&&!a.orientation)
}m.exports=l(o);m.exports.original=o},{"./helpers/globals":121,"./touchAvailable":127,"@marcom/ac-function/once":130}],123:[function(g,k,h){var j=g("./helpers/globals");
k.exports=function i(){var a=j.getWindow();return("devicePixelRatio" in a&&a.devicePixelRatio>=1.5)
}},{"./helpers/globals":121}],124:[function(m,l,h){m("@marcom/ac-polyfills/matchMedia");
var j=m("./helpers/globals");var k=m("@marcom/ac-function/once");function i(){var a=j.getWindow();
var b=a.matchMedia("only all");return !!(b&&b.matches)}l.exports=k(i);l.exports.original=i
},{"./helpers/globals":121,"@marcom/ac-function/once":130,"@marcom/ac-polyfills/matchMedia":undefined}],125:[function(g,k,h){var i=g("./helpers/globals");
function j(){var a=i.getWindow();var b=a.matchMedia("(prefers-reduced-motion)");
return !!(b&&b.matches)}k.exports=j},{"./helpers/globals":121}],126:[function(h,m,i){var j=h("@marcom/ac-prefixer/getStyleValue");
var l=h("@marcom/ac-function/once");function k(){return !!(j("perspective","1px")&&j("transform","translateZ(0)"))
}m.exports=l(k);m.exports.original=k},{"@marcom/ac-function/once":130,"@marcom/ac-prefixer/getStyleValue":188}],127:[function(m,l,h){var j=m("./helpers/globals");
var k=m("@marcom/ac-function/once");function i(){var a=j.getWindow();var c=j.getDocument();
var b=j.getNavigator();return !!(("ontouchstart" in a)||(a.DocumentTouch&&c instanceof a.DocumentTouch)||(b.maxTouchPoints>0)||(b.msMaxTouchPoints>0))
}l.exports=k(i);l.exports.original=i},{"./helpers/globals":121,"@marcom/ac-function/once":130}],128:[function(i,h,f){function g(c,a){var b;
function d(){var n=arguments;var j=this;var o=function(){b=null;c.apply(j,n)};clearTimeout(b);
b=setTimeout(o,a)}function k(){clearTimeout(b)}d.cancel=k;return d}h.exports=g},{}],129:[function(k,j,g){var h=function(){var a="";
var b;for(b=0;b<arguments.length;b++){if(b>0){a+=","}a+=arguments[b]}return a};
j.exports=function i(a,b){b=b||h;var c=function(){var f=arguments;var d=b.apply(this,f);
if(!(d in c.cache)){c.cache[d]=a.apply(this,f)}return c.cache[d]};c.cache={};return c
}},{}],130:[function(f,i,g){i.exports=function h(a){var b;return function(){if(typeof b==="undefined"){b=a.apply(this,arguments)
}return b}}},{}],131:[function(B,C,x){var s=B("@marcom/ac-clip").Clip;var t=B("./helpers/clipManager");
var w=B("./helpers/Productivity");var p=new w();var u=p.forEach;var z=p.defaults;
var r=B("@marcom/ac-eclipse").Timeline;var q=B("@marcom/ac-object/clone");var y;
function A(a){this.build(a)}var v=A.prototype;v.destroy=function(){this.clipManager.destroy();
this.artboard.destroy();this.options=null;this.timelines=null};v.play=function(){this.clipManager.play("play")
};v.build=function(b){try{this._set(b);this.clipManager.play("load")}catch(a){console.log("Donut graph failure: "+a);
return}};v.update=function(d){for(var f=0,g=d.length;f<g;f++){var c=this.options.wedges;
var a=d[f];c[f].initial_start=c[f].adj_start;c[f].initial_end=c[f].adj_end;c[f]=this._wedgeCalculations(z(c[f],a));
var b=this._getClipParams(c[f]);s.to(b.obj,c[f].duration,b.change,b.options)}};
v._degreesToAngle=function(a){return a*(Math.PI/180)};v._updateWithChanges=function(b){var a=b.target();
this.artboard.updateShape.wedge(a.el,{cx:a.segment.cx,cy:a.segment.cy,start:a._startAngle,end:a._endAngle,diameter:a.segment.diameter,thickness:a.segment.thickness})
};v._set=function(a){this.options=q(a,true)||{};this.options.el=a.el;if(!a.wedges){throw"No graph data provided"
}this.timelines={};this.clipManager=new t();y=B("./renderers/svgRenderer");this.artboard=new y(this.options.el,"ac-graph-donut");
this.options.default_size=Math.min(this.options.el.offsetWidth,this.options.el.offsetHeight);
this.options.centerPoint={x:a.el.offsetWidth/2,y:a.el.offsetHeight/2};if(a.animations!==undefined){this._setAnimations(this.options.animations)
}this._setWedges()};v._setAnimations=function(a){for(var b in a){var c=a[b];c.delay=c.delay||0;
c.draw_on=c.draw_on||"load";c.duration=(c.duration!==undefined&&c.duration>=0)?c.duration:1.5;
c.ease=c.ease||"easeInOutQuart";c.wedge_gap=(c.wedge_gap!==undefined&&c.wedge_gap>=0)?c.wedge_gap:3;
c.onStart=c.onStart||null;c.onUpdate=c.onUpdate||null;c.onComplete=c.onComplete||null;
this.timelines[b]=new r({delay:c.delay,ease:c.ease,onStart:c.onStart,onUpdate:c.onUpdate,onComplete:c.onComplete});
this.clipManager.addTo(c.draw_on,this.timelines[b])}};v._getClipParams=function(a){return{obj:{el:a.el,segment:a,_progress:0,_startAngle:a.initial_start,_endAngle:a.initial_end},change:{_progress:1,_startAngle:a.adj_start,_endAngle:a.adj_end},options:{delay:a.delay,ease:a.ease,onDraw:this._updateWithChanges.bind(this),onStart:a.onStart,onUpdate:a.onUpdate,onComplete:a.onComplete}}
};v._setWedges=function(){var d=this.options.wedges;for(var a=0,c=d.length;a<c;
a++){var g={el:this.artboard.createShape("wedge","donut-wedge wedge-"+(a+1)),start_angle:0,percent:1,animation_group:"",delay:0,draw_on:"load",duration:0,ease:"linear",thickness:3,diameter:this.options.default_size,cx:this.options.centerPoint.x,cy:this.options.centerPoint.y,onStart:function(){},onUpdate:function(){},onComplete:function(){}};
var f=d[a]=this._wedgeCalculations(z(g,d[a]));f.initial_start=f.adj_start;f.initial_end=f.adj_start;
var h=this._getClipParams(f);if(f.animation_group!==""){h.options.delay=0;h.options.ease="linear";
var b=this.options.animations[f.animation_group];var i=b.duration;var j=f.percent*i;
var l=(f.start_angle/360)*i;var k=new s(h.obj,j,h.change,h.options);this.timelines[f.animation_group].addClip(k,l)
}else{this.clipManager.addTo(f.draw_on,new s(h.obj,f.duration,h.change,h.options))
}}};v._wedgeCalculations=function(b){b.end_angle=b.start_angle+(b.percent*360);
var a=(b.animation_group!==undefined&&b.animation_group!=="")?this.options.animations[b.animation_group].wedge_gap/(Math.PI*b.diameter)*360:0;
b.adj_start=b.start_angle+a/2;b.adj_end=b.end_angle-a/2;return b};C.exports=A},{"./helpers/Productivity":133,"./helpers/clipManager":134,"./renderers/svgRenderer":135,"@marcom/ac-clip":19,"@marcom/ac-eclipse":92,"@marcom/ac-object/clone":179}],132:[function(t,u,q){var n=t("@marcom/ac-clip").Clip;
var o=t("./helpers/clipManager");var m=t("@marcom/ac-eclipse").Timeline;var l=t("@marcom/ac-object/clone");
var r;function s(a){this.build(a)}var p=s.prototype;p.destroy=function(){this.clipManager.destroy();
this.artboard.destroy();this.options=null;this.timelines=null;this.biggest=null
};p.play=function(){this.clipManager.play("play")};p.build=function(b){try{this._set(b);
this.clipManager.play("load")}catch(a){console.log("Line graph failure: "+a);return
}};p.update=function(a){var g=this.biggest.pts;this.biggest.pts=[];for(var c=0,f=a.length;
c<f;c++){var h=this.options.graphLines[c];var b=a[c];h.el.setAttributeNS(null,"stroke-dashoffset","");
h.el.setAttributeNS(null,"stroke-dasharray","");var d={el:h.el,dots:h.dots,dot_size:h.dot_size,biggest:g,pts:h.pts,control_pts:l(h.control_pts,true),_progress:0};
h.data=b.data||h.data;h.control_pts=b.control_pts||h.control_pts;h.duration=(b.duration!==undefined&&b.duration>=0)?b.duration:h.duration;
h.delay=(b.delay!==undefined&&b.delay>=0)?b.delay:h.delay;h.ease=b.ease||h.ease;
h.onStart=b.onStart||h.onStart;h.onUpdate=b.onUpdate||h.onUpdate;h.onComplete=b.onComplete||h.onComplete;
this._calculateLinePoints(h);var j={pts:h.pts,biggest:this.biggest.pts,control_pts:b.control_pts,_progress:1};
var i={delay:h.delay,ease:h.ease,onDraw:this._moveLinePoints.bind(this),onStart:h.onStart,onUpdate:h.onUpdate,onComplete:h.onComplete};
n.to(d,h.duration,j,i)}};p._calculateSuperlatives=function(){var d;this.biggest={num_points:0,dot_size:0,duration:0,graph_stroke:3,pts:[]};
this.smallest={duration:null};for(var a=0,f=this.options.graphLines.length;a<f;
a++){d=this.options.graphLines[a];if(d.data.length>this.biggest.num_points){this.biggest.num_points=d.data.length
}if(d.dot_size>this.biggest.dot_size){this.biggest.dot_size=d.dot_size}var b=d.duration+d.delay;
if(b>this.biggest.duration){this.biggest.duration=b}if(!this.smallest.duration||b<this.smallest.duration){this.smallest.duration=b
}}var c=this.artboard.createShape("line","line-graphline");this.biggest.graph_stroke=parseInt(getComputedStyle(c).strokeWidth);
c.parentNode.removeChild(c)};p._calculateGraphPoints=function(){for(var a=0,b=this.options.graphLines.length;
a<b;a++){this._calculateLinePoints(this.options.graphLines[a])}};p._calculateLinePoints=function(a){a.pts=[];
var d=a.data;for(var f=0,b=d.length;f<b;f++){var c=this._calculatePoint(d[f],f);
a.pts[f]=c}};p._calculatePoint=function(a,b){var d=(b/(this.biggest.num_points-1));
var c={x:this._x(d),y:this._y(a),x_percent:d,y_percent:a};if(c.y_percent>this.biggest.pts[b]||this.biggest.pts[b]===undefined){this.biggest.pts[b]=c.y_percent
}return c};p._set=function(a){this.options=l(a,true)||{};this.options.el=a.el;if(!this.options.graphLines){throw"No graphLines options provided"
}this.timelines={};this.clipManager=new o();r=t("./renderers/svgRenderer");this.artboard=new r(this.options.el,"ac-graph-line");
this.options.duration=this.options.duration||2;this.options.width=this.options.el.offsetWidth;
this.options.height=this.options.el.offsetHeight;this._setGraphLines();this._calculateSuperlatives();
this._calculateGraphPoints();this._createMarkers();this._createXAxis();this._createXAxisDots();
this._createGraphLines()};p._setGraphLines=function(){if(this.options.graphLines.length<1){throw"graphLines must contain an array"
}for(var a=0,c=this.options.graphLines.length;a<c;a++){var b=this.options.graphLines[a];
b.draw_on=b.draw_on||"play";b.duration=(b.duration!==undefined&&b.duration>=0)?b.duration:2;
b.delay=(b.delay!==undefined&&b.delay>=0)?b.delay:0;b.ease=b.ease||"easeOutQuint";
b.line_shape=b.line_shape||"straight";b.show_dots=b.show_dots||"all";b.onStart=b.onStart||null;
b.onUpdate=b.onUpdate||null;b.onComplete=b.onComplete||null;if(b.show_dots==="none"&&!b.dot_size){b.dot_size=this.biggest.graph_stroke||3
}else{b.dot_size=b.dot_size||8}}};p._createGraphLines=function(){for(var h=0,c=this.options.graphLines.length;
h<c;h++){var g=this.options.graphLines[h];var k="graphline";var x="graphline-group-"+(h+1);
if(g.line_shape==="straight"){g.el=this.artboard.createShape("line",k);this.artboard.updateShape.line(g.el,g.pts)
}else{g.el=this.artboard.createShape("curve",k);g.control_pts=g.control_pts||[[-50,0]];
var a=g.control_pts.length;var i=[];for(var b=0,I=g.pts.length;b<I;b++){i[b]=g.control_pts[b%a]
}this.artboard.updateShape.curve(g.el,g.pts,i)}var L=this.artboard.createElement("defs","");
var j=this.artboard.getParentId()+"-gradient-"+(h+1);var K=this.artboard.createLinearGradient(j,"0%","100%","100%","100%","gradient-"+(h+1));
L.appendChild(K);g.el.setAttributeNS(null,"stroke","url(#"+j+")");var J=Math.ceil(g.el.getTotalLength());
g.el.setAttributeNS(null,"stroke-dasharray",J+"px");g.el.setAttributeNS(null,"stroke-dashoffset",J+"px");
var d={el:g.el,dash_offset:J};var f={dash_offset:0};var G={ease:"linear",onDraw:this._drawGraphLine.bind(this),onStart:g.onStart,onUpdate:g.onUpdate,onComplete:g.onComplete};
this.artboard.addToGroup(L,x);this.artboard.addToGroup(g.el,x);var F=new n(d,g.duration,f,G);
this.timelines["graphline_"+(h+1)]=new m({ease:g.ease});var H=(g.duration>0)?g.delay+0.3:0;
this.timelines["graphline_"+(h+1)].addClip(F,H);this.clipManager.addTo(g.draw_on,this.timelines["graphline_"+(h+1)]);
this._createLineDots(g,h+1)}};p._createLineDots=function(h,j){h.dots=[];for(var a=0,f=h.pts.length;
a<f;a++){h.dots[a]=this.artboard.createShape("circle","graphline-dot graphline-dot-"+(a+1));
var d={el:h.dots[a],x:h.pts[a].x,y:h.pts[a].y,d:0};var b={d:h.dot_size};var i={ease:"easeOutQuart",onDraw:this._updateCircle.bind(this)};
this.artboard.addToGroup(d.el,"graphline-group-"+j);var g=new n(d,h.duration/f,b,i);
var c=(h.duration/f*a)+h.delay;this.timelines["graphline_"+j].addCallback(g.play.bind(g),c);
if(a==0&&h.show_dots==="ends"){a=f-2}}};p._createMarkers=function(){this.options.markers=this.options.markers||{};
this.options.markers.draw_on=this.options.markers.draw_on||"play";this.options.markers.direction=this.options.markers.direction||"vertical";
this.options.markers.horiz_count=this.options.markers.horiz_count||5;this.options.markers.vert_length=this.options.markers.vert_length||"to_points";
this.options.markers.elements=[];var d=(this.options.markers.direction==="horizontal")?this.options.markers.horiz_count:this.biggest.num_points;
for(var b=0;b<d;b++){this.options.markers.elements[b]=this.artboard.createShape("line","marker marker-"+(b+1));
var g=b/(d-1);if(this.options.markers.direction==="horizontal"){var f={el:this.options.markers.elements[b],x1:this._x(0),x2:this._x(0),y1:this._y(g),y2:this._y(g)};
var c={x2:this._x(1)}}else{var f={el:this.options.markers.elements[b],x1:this._x(g),x2:this._x(g),y1:this._y(0),y2:this._y(0)};
var c={y2:(this.options.markers.vert_length=="full")?this._y(1):this._y(this.biggest.pts[b])}
}var a={onDraw:this._updateLine.bind(this)};this.clipManager.addTo(this.options.markers.draw_on,new n(f,this.smallest.duration*0.6,c,a))
}};p._createXAxis=function(){this.options.xAxis=this.options.xAxis||{};this.options.xAxis.draw_on=this.options.xAxis.draw_on||"load";
this.options.xAxis.duration=(this.options.xAxis.draw_on==="load")?0:this.options.duration;
var a={el:this.artboard.createShape("line","x-axis"),x1:this._x(0),x2:this._x(0),y1:this._y(0),y2:this._y(0)};
var c={x2:this._x(1)};var b={onDraw:this._updateLine.bind(this)};this.clipManager.addTo(this.options.xAxis.draw_on,new n(a,this.options.xAxis.duration,c,b))
};p._createXAxisDots=function(){this.options.xAxis.show_dots=this.options.xAxis.show_dots||"all";
this.options.xAxis.dot_size=this.options.xAxis.dot_size||4;for(var b=0;b<this.biggest.num_points;
b++){var d={el:this.artboard.createShape("circle","x-axis-dot x-axis-dot-"+(b+1)),x:this._x(b/(this.biggest.num_points-1)),y:this._y(0),d:0};
var c={d:this.options.xAxis.dot_size};var a={onDraw:this._updateCircle.bind(this)};
this.clipManager.addTo(this.options.xAxis.draw_on,new n(d,0.5,c,a))}};p._moveLinePoints=function(c){var b=c.target();
this.artboard.updateShape.curve(b.el,b.pts,b.control_pts);for(var a=0,d=b.pts.length;
a<d;a++){this.artboard.updateShape.circle(b.dots[a],{cx:b.pts[a].x,cy:b.pts[a].y,diameter:b.dot_size});
if(this.options.markers.direction==="vertical"&&this.options.markers.vert_length==="to_points"){this.artboard.updateShape.line(this.options.markers.elements[a],[{x:b.pts[a].x,y:this._y(0)},{x:b.pts[a].x,y:this._y(b.biggest[a])}])
}}};p._updateCircle=function(b){var a=b.target();this.artboard.updateShape.circle(a.el,{cx:a.x,cy:a.y,diameter:a.d})
};p._drawGraphLine=function(b){var a=b.target();a.el.setAttributeNS(null,"stroke-dashoffset",a.dash_offset+"px")
};p._updateLine=function(b){var a=b.target();this.artboard.updateShape.line(a.el,[{x:a.x1,y:a.y1},{x:a.x2,y:a.y2}])
};p._x=function(a){return(this.options.width-(this.biggest.dot_size+4))*a+(this.biggest.dot_size/2+2)
};p._y=function(a){return(this.options.height-(this.biggest.dot_size+4))*(1-a)+(this.biggest.dot_size/2+2)
};u.exports=s},{"./helpers/clipManager":134,"./renderers/svgRenderer":135,"@marcom/ac-clip":19,"@marcom/ac-eclipse":92,"@marcom/ac-object/clone":179}],133:[function(g,k,h){function j(){}var i=j.prototype;
i.defaults=function(b,d){var a={};for(var f in b){var c=b[f];if(d.hasOwnProperty(f)&&typeof(d[f])===typeof(c)){if(typeof(c)==="object"&&!c.nodeType){a[f]=this.defaults(c,d[f])
}else{a[f]=d[f]}}else{a[f]=c}}return a};i.forEach=function(b,a){for(var d=0,c=b.length;
d<c;d++){a(b[d],d)}};k.exports=j},{}],134:[function(g,k,h){function i(){this.allClips=[];
this.clipTriggers={}}var j=i.prototype;j.add=function(a,b){return this.allClips.push(a)
};j.addTo=function(a,b){this.create(a);var c=this.add(b);this.clipTriggers[a].push(c-1)
};j.create=function(a){if(this.clipTriggers[a]===undefined){this.clipTriggers[a]=[]
}};j.destroy=function(){this.allClips=[];this.clipTriggers={}};j.getClip=function(a){return this.allClips[a]
};j.play=function(a){if(this.clipTriggers[a]!==undefined){var b=this.clipTriggers[a];
for(var c=0,d=b.length;c<d;c++){this.getClip(b[c]).play()}}};k.exports=i},{}],135:[function(k,j,g){function h(a,b){this.el=a;
this.groups={};this.ns="http://www.w3.org/2000/svg";this.svg=document.createElementNS(this.ns,"svg");
this.svg.setAttributeNS(null,"class","ac-graph-svg "+b);this.parent_id=a.getAttribute("id");
if(this.el.childNodes.length>0){this.el.insertBefore(this.svg,this.el.childNodes[0])
}else{this.el.appendChild(this.svg)}}var i=h.prototype;i.addToGroup=function(c,a){if(this.groups[a]===undefined){this.groups[a]=this.createElement("g",a)
}var b=this.svg.removeChild(c);this.groups[a].appendChild(b)};i.createLinearGradient=function(f,r,b,s,d,p){var c=document.createElementNS(this.ns,"linearGradient");
c=this.setAttributes(c,{id:f,"class":f+" "+p,x1:r,y1:b,x2:s,y2:d});var a=document.createElementNS(this.ns,"stop");
a=this.setAttributes(a,{"class":"left-stop",offset:"0%"});var q=document.createElementNS(this.ns,"stop");
q=this.setAttributes(q,{"class":"right-stop",offset:"100%"});c.appendChild(a);c.appendChild(q);
return c};i.createElement=function(a,b){var c=document.createElementNS(this.ns,a);
c.setAttributeNS(null,"class",b);this.svg.appendChild(c);return c};i.createShape=function(a,b){a=this._getShapeName(a);
b=(b!==undefined)?b:"";return this.createElement(a,"ac-graph-"+a+" "+b)};i.destroy=function(){this.el.removeChild(this.svg);
this.el=null;this.groups={};this.svg=null;this.parent_id=null};i.getParentId=function(){return this.parent_id
};i.setAttributes=function(a,b){for(var c in b){a.setAttributeNS(null,c,b[c])}return a
};i.updateShape={circle:function(c,a){c.setAttributeNS(null,"cx",a.cx);c.setAttributeNS(null,"cy",a.cy);
var b=a.diameter/2;if(b>=0){c.setAttributeNS(null,"r",b)}},curve:function(c,d,b){var n=d.length;
var a="M "+d[0].x+" "+d[0].y+" C "+(d[0].x+b[0][0])+" "+(d[0].y+(b[0][1]*-1))+", "+(d[1].x+b[1][0])+" "+(d[1].y+(b[1][1]*-1))+", "+d[1].x+" "+d[1].y;
if(n>2){for(var f=2,n=d.length;f<n;f++){a+=" S "+(d[f].x+b[f][0])+" "+(d[f].y+(b[f][1]*-1))+", "+d[f].x+" "+d[f].y
}}c.setAttributeNS(null,"d",a)},line:function(b,c){var f=c.length;var a="M "+c[0].x+" "+c[0].y;
for(var d=1;d<f;d++){a+=" L "+c[d].x+" "+c[d].y}b.setAttributeNS(null,"d",a)},rectangle:function(b,c){var a="";
for(var d=0,f=c.length;d<f;d++){a+=c[d].x+","+c[d].y+" "}b.setAttributeNS(null,"points",a)
},wedge:function(d,c){c.radius=c.diameter/2;c.inside_radius=c.radius-c.thickness;
var b={out_start:this.getPointOnCircle(c.cx,c.cy,c.radius,c.start),out_end:this.getPointOnCircle(c.cx,c.cy,c.radius,c.end),in_start:this.getPointOnCircle(c.cx,c.cy,c.inside_radius,c.start),in_end:this.getPointOnCircle(c.cx,c.cy,c.inside_radius,c.end)};
if(c.end-c.start>180){b.out_mid=this.getPointOnCircle(c.cx,c.cy,c.radius,c.start+180);
b.in_mid=this.getPointOnCircle(c.cx,c.cy,c.inside_radius,c.start+180);var a="M "+b.out_start.x+" "+b.out_start.y+this.getArc(c.radius,0,1,b.out_mid)+this.getArc(c.radius,0,1,b.out_end)+" L "+b.in_end.x+" "+b.in_end.y+this.getArc(c.inside_radius,0,0,b.in_mid)+this.getArc(c.inside_radius,0,0,b.in_start)+" Z"
}else{var a="M "+b.out_start.x+" "+b.out_start.y+this.getArc(c.radius,0,1,b.out_end)+" L "+b.in_end.x+" "+b.in_end.y+this.getArc(c.inside_radius,0,0,b.in_start)+" Z"
}d.setAttributeNS(null,"d",a)},getArc:function(b,c,a,d){return" A "+b+" "+b+" 0 "+c+" "+a+" "+d.x+" "+d.y
},getPointOnCircle:function(d,a,c,b){return{x:d+c*Math.cos(Math.PI*b/180-(Math.PI/2)),y:a+c*Math.sin(Math.PI*b/180-(Math.PI/2))}
}};i._getShapeName=function(b){var a={curve:"path",line:"path",rectangle:"polygon",wedge:"path"};
return(a[b])?a[b]:b};j.exports=h},{}],136:[function(f,i,g){var h=f("./initializer");
h.setup();f("gsap/TimelineLite");h.complete();i.exports=window.TimelineLite},{"./initializer":142,"gsap/TimelineLite":263}],137:[function(f,i,g){var h=f("./initializer");
h.setup();f("gsap/TimelineMax");h.complete();i.exports=window.TimelineMax},{"./initializer":142,"gsap/TimelineMax":264}],138:[function(f,i,g){var h=f("./initializer");
h.setup();f("gsap/TweenLite");h.complete();i.exports=window.TweenLite},{"./initializer":142,"gsap/TweenLite":265}],139:[function(f,i,g){var h=f("./initializer");
h.setup();f("gsap/TweenMax");h.complete();i.exports=window.TweenMax},{"./initializer":142,"gsap/TweenMax":266}],140:[function(d,g,f){g.exports={initializer:d("./initializer"),TimelineLite:d("./TimelineLite"),TimelineMax:d("./TimelineMax"),TweenLite:d("./TweenLite"),TweenMax:d("./TweenMax"),EasePack:d("./easing/EasePack.js"),AttrPlugin:d("./plugins/AttrPlugin.js"),BezierPlugin:d("./plugins/BezierPlugin.js"),CSSPlugin:d("./plugins/CSSPlugin.js"),CSSRulePlugin:d("./plugins/CSSRulePlugin.js"),ColorPropsPlugin:d("./plugins/ColorPropsPlugin.js"),DirectionalRotationPlugin:d("./plugins/DirectionalRotationPlugin.js"),EndArrayPlugin:d("./plugins/EndArrayPlugin.js"),ModifiersPlugin:d("./plugins/ModifiersPlugin.js"),RoundPropsPlugin:d("./plugins/RoundPropsPlugin.js"),ScrollToPlugin:d("./plugins/ScrollToPlugin.js"),TextPlugin:d("./plugins/TextPlugin.js"),Draggable:d("./utils/Draggable.js")}
},{"./TimelineLite":136,"./TimelineMax":137,"./TweenLite":138,"./TweenMax":139,"./easing/EasePack.js":141,"./initializer":142,"./plugins/AttrPlugin.js":143,"./plugins/BezierPlugin.js":144,"./plugins/CSSPlugin.js":145,"./plugins/CSSRulePlugin.js":146,"./plugins/ColorPropsPlugin.js":147,"./plugins/DirectionalRotationPlugin.js":148,"./plugins/EndArrayPlugin.js":149,"./plugins/ModifiersPlugin.js":150,"./plugins/RoundPropsPlugin.js":151,"./plugins/ScrollToPlugin.js":152,"./plugins/TextPlugin.js":153,"./utils/Draggable.js":154}],141:[function(f,i,g){var h=f("../initializer");
h.setup();f("gsap/EasePack");h.complete();i.exports=window.Ease},{"../initializer":142,"gsap/EasePack":257}],142:[function(g,k,h){var j=g("@marcom/ac-raf-emitter/external");
var i=g("@marcom/ac-raf-emitter/cancelExternal");k.exports=(function(){var b=true;
var a=window.requestAnimationFrame;var c=window.cancelAnimationFrame;return{useRAFEmitter:function(d){b=d
},setup:function(){if(b){window.requestAnimationFrame=j;window.cancelAnimationFrame=i
}},complete:function(){window.requestAnimationFrame=a;window.cancelAnimationFrame=c
}}})()},{"@marcom/ac-raf-emitter/cancelExternal":209,"@marcom/ac-raf-emitter/external":211}],143:[function(f,i,g){var h=f("../initializer");
i.exports=(function(){return function a(){h.setup();f("gsap/AttrPlugin");h.complete();
return true}})()},{"../initializer":142,"gsap/AttrPlugin":250}],144:[function(f,i,g){var h=f("../initializer");
i.exports=(function(){return function a(){h.setup();f("gsap/BezierPlugin");h.complete();
return window.BezierPlugin}})()},{"../initializer":142,"gsap/BezierPlugin":251}],145:[function(f,i,g){var h=f("../initializer");
i.exports=(function(){return function a(){h.setup();f("gsap/CSSPlugin");h.complete();
return window.CSSPlugin}})()},{"../initializer":142,"gsap/CSSPlugin":252}],146:[function(f,i,g){var h=f("../initializer");
i.exports=(function(){return function a(){h.setup();f("gsap/CSSRulePlugin");h.complete();
return window.CSSRulePlugin}})()},{"../initializer":142,"gsap/CSSRulePlugin":253}],147:[function(f,i,g){var h=f("../initializer");
i.exports=(function(){return function a(){h.setup();f("gsap/ColorPropsPlugin");
h.complete();return window.ColorPropsPlugin}})()},{"../initializer":142,"gsap/ColorPropsPlugin":254}],148:[function(f,i,g){var h=f("../initializer");
i.exports=(function(){return function a(){h.setup();f("gsap/DirectionalRotationPlugin");
h.complete();return true}})()},{"../initializer":142,"gsap/DirectionalRotationPlugin":255}],149:[function(f,i,g){var h=f("../initializer");
i.exports=(function(){return function a(){h.setup();var b=f("gsap/EndArrayPlugin");
h.complete();return b}})()},{"../initializer":142,"gsap/EndArrayPlugin":258}],150:[function(f,i,g){var h=f("../initializer");
i.exports=(function(){return function a(){h.setup();f("gsap/ModifiersPlugin");h.complete();
return true}})()},{"../initializer":142,"gsap/ModifiersPlugin":259}],151:[function(f,i,g){var h=f("../initializer");
i.exports=(function(){return function a(){h.setup();var b=f("gsap/RoundPropsPlugin");
h.complete();return b}})()},{"../initializer":142,"gsap/RoundPropsPlugin":260}],152:[function(f,i,g){var h=f("../initializer");
i.exports=(function(){return function a(){h.setup();var b=f("gsap/ScrollToPlugin");
h.complete();return b}})()},{"../initializer":142,"gsap/ScrollToPlugin":261}],153:[function(f,i,g){var h=f("../initializer");
i.exports=(function(){return function a(){h.setup();f("gsap/TextPlugin");h.complete();
return true}})()},{"../initializer":142,"gsap/TextPlugin":262}],154:[function(k,j,g){var i=k("../initializer");
i.setup();var h=k("gsap/Draggable");i.complete();j.exports=h},{"../initializer":142,"gsap/Draggable":256}],155:[function(p,o,q){p("@marcom/ac-polyfills/Object/create");
var k=p("@marcom/ac-raf-emitter/RAFEmitter");var m=p("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var l=m.prototype;function j(h,f,d,a,c,g,b){if(arguments.length!==7){throw new Error("Incorrect number of arguments passed to BaseComponent check the constructor or BaseComponent.call method - argument's should be (section, componentElement, componentName, currentBreakpoint, scrollPosition, windowHeight, index)")
}m.call(this);this.section=h;this.element=f;this.componentName=d;this.index=b;this.isEnabled=true
}var n=j.prototype=Object.create(m.prototype);j.prototype.constructor=j;n.destroy=function(){this.teardownEvents();
this.teardownRAFEmitter();this.section=null;l.destroy.call(this)};n.setupEvents=function(){};
n.teardownEvents=function(){};n.setupRAFEmitter=function(){if(this._rafEmitter){return
}this._rafEmitter=new k();this.onDOMRead=this.onDOMRead.bind(this);this.onDOMWrite=this.onDOMWrite.bind(this);
this._rafEmitter.on("update",this.onDOMRead);this._rafEmitter.on("draw",this.onDOMWrite)
};n.teardownRAFEmitter=function(){if(!this._rafEmitter){return}this._rafEmitter.destroy();
this._rafEmitter=null};n.parsePropsFromDataAttribute=function(d,g,b){b=b||this.element;
g=g||{};d="data-"+d;var f=b.getAttribute(d)||"{}";var i=null;try{i=JSON.parse(f)
}catch(h){throw new Error(this.componentName+"::parsePropsFromDataAttribute bad JSON in `"+d+"`",h)
}var a={};for(var c in g){a[c]=i[c];if(!i.hasOwnProperty(c)){if(g[c]===null){throw new Error(this.componentName+"::parsePropsFromDataAttribute `"+c+"` is required in `"+d+"`")
}else{a[c]=g[c]}}}return a};n.onSectionWillAppearWithPadding=function(b,a){};n.onSectionWillAppear=function(b,a){};
n.activate=function(){};n.animateIn=function(){};n.requestDOMChange=function(){if(!this.isEnabled||!this.section.isVisible){return false
}if(!this._rafEmitter){this.setupRAFEmitter()}return this._rafEmitter.run()};n.onDOMRead=function(a){};
n.onDOMWrite=function(a){};n.deactivate=function(){};n.onScroll=function(b,c,a){};
n.onSectionWillDisappearWithPadding=function(b,a){};n.onSectionWillDisappear=function(b,a){};
n.onResizeDebounced=function(b,c,a){};n.onResizeImmediate=function(b,c,a){};n.onOrientationChange=function(b,c,d,a){};
n.onBreakpoint=function(c,a,d,b){};n.onRetinaChange=function(a,c,d,b){};o.exports=j
},{"@marcom/ac-event-emitter-micro":118,"@marcom/ac-polyfills/Object/create":undefined,"@marcom/ac-raf-emitter/RAFEmitter":205}],156:[function(s,u,p){s("@marcom/ac-polyfills/console.log");
var v=s("@marcom/ac-element-tracker").ElementTracker;var m=s("@marcom/ac-viewport-emitter");
if(!m.viewport){console.log("Jetpack Error: Required module `ac-viewport-emitter` not initialized properly (missing required css styles). Please see `ac-viewport-emitter` documentation.\n\tBreakpoint will always be 'large' and no `onBreakPoint` events will be fired");
m=s("../utils/ViewportEmitterStub")()}var n=s("../utils/Page");var w=s("../model/SectionMap");
var q=s("../model/DataAttributes");var t=s("../model/EnabledFeatures");function r(a){t.init();
n.setPage(this);this.name=this.name||"[NOT SET]";this._mainEl=document.querySelector("main,.main");
this._sections=[];this._visibleSections=[];this._visibleSectionsWithPadding=[];
this._elementTracker=new v(null,{autoStart:true});this._currentSection=null;this._sectionUnderLocalNav=null;
this._currentBreakpoint=m.viewport;this.isRetina=m.retina;this._cachedScrollY=this._getScrollY(true);
this._cachedWindowHeight=this.getWindowHeight(true);this._resizeTimeout=-1;this._resizeTimeoutDelay=this._resizeTimeoutDelay||250;
this.setupSections();this.setupEvents();this._updateSectionVisibility()}var o=r.prototype;
o.destroy=function(){for(var b=0,a=this._sections.length;b<a;b++){this._sections[b].destroy()
}this.teardownEvents();this._elementTracker.destroy();this._elementTracker=null;
this._sections=null;this._currentSection=null;this._sectionUnderLocalNav=null;this._visibleSections=null;
this._mainEl=null;n.removePage(this)};o.setupEvents=function(){this._onScroll=this._onScroll.bind(this);
this._onBreakpoint=this._onBreakpoint.bind(this);this._onRetinaChange=this._onRetinaChange.bind(this);
this._onPageDidAppear=this._onPageDidAppear.bind(this);this._onResizeImmediate=this._onResizeImmediate.bind(this);
this._onOrientationChange=this._onOrientationChange.bind(this);this._onPageWillDisappear=this._onPageWillDisappear.bind(this);
this.performDeepMetricsRefresh=this.performDeepMetricsRefresh.bind(this);window.addEventListener("scroll",this._onScroll);
window.addEventListener("resize",this._onResizeImmediate);window.addEventListener("orientationchange",this._onOrientationChange);
m.on("change",this._onBreakpoint);m.on("retinachange",this._onRetinaChange);n.on(n.DEEP_REFRESH_ALL_METRICS,this.performDeepMetricsRefresh)
};o.teardownEvents=function(){window.removeEventListener("scroll",this._onScroll);
window.removeEventListener("resize",this._onResizeImmediate);window.removeEventListener("orientationchange",this._onOrientationChange);
m.off("change",this._onBreakpoint);m.off("retinachange",this._onRetinaChange);n.off(n.DEEP_REFRESH_ALL_METRICS,this.performDeepMetricsRefresh);
this._elementTracker.stop();clearTimeout(this._resizeTimeout)};o.setupSections=function(){var d=this._mainEl.querySelectorAll("section,.section,[data-section-type]");
for(var b=0,a=d.length;b<a;b++){if(d[b].parentElement!==this._mainEl){console.warn("BasePage::addSection - Jetpack does not support nested BaseSections, consider using a component instead.",d[b]);
continue}var c=d[b];this._addSectionImp(c)}};o.addSection=function(a){var b=this.getBaseSectionForElement(a);
if(b){return b}b=this._addSectionImp(a);this._updateSectionVisibility();return b
};o.removeSection=function(a){var b=(a instanceof w.BaseSection);var c=b?a:this.getBaseSectionForElement(a);
if(c){this._sections.splice(this._sections.indexOf(c),1)}this._updateSectionVisibility();
return c};o._addSectionImp=function(d){if(d.parentNode!==this._mainEl&&this._isNestedSection(d)){console.warn("BasePage::addSection - Jetpack does not support nested BaseSections, consider using a component instead.",d);
return null}var f=this._elementTracker.addElement(d);this._elementTracker.refreshElementState(f);
var c=(d.hasAttribute(q.SECTION_TYPE))?d.getAttribute(q.SECTION_TYPE):"BaseSection";
if(c===""){c="BaseSection"}if(!w.hasOwnProperty(c)){throw"BasePage::setupSections parsing '#"+d.id+" ."+d.className+"' no section type '"+c+"'found!"
}var a=w[c];var b=new a(d,f,this._getCurrentBreakpoint(),this._getScrollY(),this.getWindowHeight(),this._sections.length);
b.setupEvents();this._sections.push(b);return b};o.getWindowHeight=function(a){if(a){this._cachedWindowHeight=window.innerHeight
}return this._cachedWindowHeight};o._activateSection=function(a){if(this._currentSection===a){return
}if(this._currentSection){this._currentSection.deactivate()}this._currentSection=a;
this._currentSection.activate()};o._updateSectionVisibility=function(){var h=this._getScrollY();
var j=this.getWindowHeight();var c=n.getViewportPadding();var a=[];var H=this._sections[0];
var f=[];var l=0;var E=[];var b=h-c;var g=h+j+c;for(var I=0,F=this._sections.length;
I<F;I++){var d=this._sections[I];var k=d.trackedElement;var D=k.pixelsInView;if(d.isFixedHero){D=j-h
}if(D>l){H=d;l=D}if(D>0.000001){a.push(d);f.push(d);E.push(d)}else{if(g>k.top&&b<k.bottom){a.push(d);
E.push(d)}}}var i={};var G={};for(I=0,F=Math.max(this._visibleSections.length,a.length);
I<F;I++){if(this._visibleSectionsWithPadding[I]){if(typeof i[I]==="undefined"){i[I]=E.indexOf(this._visibleSectionsWithPadding[I])===-1
}if(i[I]){this._visibleSectionsWithPadding[I].onSectionWillDisappearWithPadding(h,j)
}}if(this._visibleSections[I]&&f.indexOf(this._visibleSections[I])===-1){this._visibleSections[I].onSectionWillDisappear(h,j)
}if(E[I]){if(typeof G[I]==="undefined"){G[I]=this._visibleSectionsWithPadding.indexOf(E[I])===-1
}if(G[I]){E[I].onSectionWillAppearWithPadding(h,j)}}if(f[I]&&this._visibleSections.indexOf(f[I])===-1){f[I].onSectionWillAppear(h,j)
}}this._visibleSections=f;this._visibleSectionsWithPadding=E;this._activateSection(H)
};o._onPageDidAppear=function(a){};o._onPageWillDisappear=function(a){this.destroy()
};o._onBreakpoint=function(c){var h=c.to;var f=c.from;this._currentBreakpoint=h;
var g=this._getScrollY();var b=this.getWindowHeight();this._elementTracker.refreshAllElementMetrics(g,b);
for(var d=0,a=this._sections.length;d<a;d++){this._sections[d].onBreakpoint(h,f,g,b)
}this.performDeepMetricsRefresh()};o._onRetinaChange=function(c){var g=this._getScrollY(true);
var b=this.getWindowHeight(true);this.isRetina=m.retina;var d=this._currentBreakpoint;
this._elementTracker.refreshAllElementMetrics(g,b);for(var f=0,a=this._sections.length;
f<a;f++){this._sections[f].onRetinaChange(this.isRetina,d,g,b)}};o._onScroll=function(c){var f=this._getScrollY(true);
var b=this.getWindowHeight();this._updateSectionVisibility();for(var d=0,a=this._visibleSections.length;
d<a;d++){this._visibleSections[d].onScroll(c,f,b)}};o._onResizeDebounced=function(c){var g=this._getScrollY();
var b=this.getWindowHeight();var d=false;for(var f=0,a=this._sections.length;f<a;
f++){if(!d&&this._sections[f]["onResize"]){console.warn("Jetpack: onResize has been removed please use `onResizeImmediate` or `onResizeDebounced` instead.");
d=true}this._sections[f].onResizeDebounced(c,g,b)}this._updateSectionVisibility()
};o.performDeepMetricsRefresh=function(){var d=this._getScrollY();var b=this.getWindowHeight();
this._elementTracker.refreshAllElementMetrics(d,b);for(var c=0,a=this._sections.length;
c<a;c++){this._sections[c].elementEngagement.refreshAllElementMetrics(d,b);this._sections[c].updateScrollToPosition()
}this._updateSectionVisibility()};o._onOrientationChange=function(c){var f=this._getScrollY(true);
var b=this.getWindowHeight(true);var g=c.orientation;for(var d=0,a=this._sections.length;
d<a;d++){this._sections[d].onOrientationChange(c,g,f,b)}};o._onResizeImmediate=function(c){var g=this._getScrollY();
var b=this.getWindowHeight(true);var d=false;for(var f=0,a=this._sections.length;
f<a;f++){if(!d&&this._sections[f]["onResizeWillBeCalledAfterDelay"]){console.warn("Jetpack: onResizeWillBeCalledAfterDelay has been removed please use `onResizeImmediate` or `onResizeDebounced` instead.");
d=true}this._sections[f].onResizeImmediate(c,g,b)}window.clearTimeout(this._resizeTimeout);
this._resizeTimeout=window.setTimeout(this._onResizeDebounced.bind(this,c),this._resizeTimeoutDelay)
};o._getScrollY=function(a){if(a){this._cachedScrollY=window.pageYOffset||(document.documentElement||document.body).scrollTop
}return this._cachedScrollY};o._getVisibleBottomOfPage=function(){return this._getScrollY()+this.getWindowHeight()
};o._getCurrentBreakpoint=function(){return this._currentBreakpoint};o._isNestedSection=function(c){var b=c;
var a=this._sections.length;while(b=b.parentElement){for(var d=0;d<a;d++){if(this._sections[d].element===b){return true
}}}return false};o.getBaseSectionForElement=function(b){for(var c=0,a=this._sections.length;
c<a;c++){if(this._sections[c].element===b){return this._sections[c]}}return null
};u.exports=r},{"../model/DataAttributes":159,"../model/EnabledFeatures":160,"../model/SectionMap":161,"../utils/Page":162,"../utils/ViewportEmitterStub":163,"@marcom/ac-element-tracker":115,"@marcom/ac-polyfills/console.log":undefined,"@marcom/ac-viewport-emitter":227}],157:[function(y,z,v){y("@marcom/ac-polyfills/Object/create");
y("@marcom/ac-polyfills/console.log");var o={};var r={getPagePosition:y("@marcom/ac-dom-metrics/getPagePosition")};
var A=y("@marcom/ac-element-engagement").ElementEngagement;var w=y("./../model/DataAttributes");
var u=y("./../model/ComponentMap");var x=y("./BaseComponent");var q=y("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var p=q.prototype;function s(b,c,d,g,a,f){if(arguments.length!==6){throw new Error("Incorrect number of arguments passed to BaseSection")
}q.call(this);this.element=b;this.trackedElement=c;this.elementEngagement=new A(null,{autoStart:false});
this.index=f;this.isVisible=this.trackedElement.pixelsInView>0;this.isVisibleWithPadding=false;
this.hasAnimatedIn=false;this.isActive=false;this.isFixedHero=false;this.cachedBreakpoint=d;
this.cachedScrollPosition=g;this.cachedWindowHeight=a;this.name=this.name||this.element.className;
this.scrollToPosition=0;this.updateScrollToPosition();this._components=[];this.setupComponents(d,g,a);
this.setIsFixedHero();this.performDeprecatedMethodCheck()}var t=s.prototype=Object.create(q.prototype);
s.prototype.constructor=s;t.performDeprecatedMethodCheck=function(){if(this["onViewWillAppear"]){throw new Error("Section.onViewWillAppear is now `onSectionWillAppear`, please update your BaseSection subclass")
}if(this["onViewWillDisappear"]){throw new Error("Section.onViewWillDisappear is now `onSectionWillDisappear`, please update your BaseSection subclass")
}return true};t.destroy=function(){this.teardownEvents();this.elementEngagement.stop();
this.elementEngagement=null;for(var a=0,b=this._components.length;a<b;a++){this._components[a].destroy()
}this._components=null;this.trackedElement=null;this.element=null;p.destroy.call(this)
};t.setupEvents=function(){for(var a=0,b=this._components.length;a<b;a++){this._components[a].setupEvents()
}};t.teardownEvents=function(){for(var a=0,b=this._components.length;a<b;a++){this._components[a].teardownEvents()
}};t.setupComponents=function(){var c=Array.prototype.slice.call(this.element.querySelectorAll("["+w.COMPONENT_LIST+"]"));
if(this.element.hasAttribute(w.COMPONENT_LIST)){c.push(this.element)}for(var f=0;
f<c.length;f++){var a=c[f];var b=a.getAttribute(w.COMPONENT_LIST);if(b.indexOf("|")!==-1){throw"BaseSection::setupComponents component list should be space delimited, pipe character is no longer supported. Error at: '"+b+"'"
}var d=b.split(" ");for(var g=0,i=d.length;g<i;g++){var h=d[g];if(h===""||h===" "){continue
}this.addComponentOfType(h,a)}setTimeout(this.elementEngagement.refreshAllElementStates.bind(this.elementEngagement),100)
}};t.addComponentOfType=function(c,a){if(!u.hasOwnProperty(c)){throw"BaseSection::setupComponents parsing '#"+a.id+" ."+a.className+"' no component type '"+c+"'found!"
}var b=u[c];if(!this.componentIsSupported(b,c)){if(o[c]===undefined){console.log("BaseSection::setupComponents unsupported component '"+c+"'. Reason: '"+c+".IS_SUPPORTED' returned false");
o[c]=true}return}var d=new b(this,a,c,this.cachedBreakpoint,this.cachedScrollPosition,this.cachedWindowHeight,this._components.length);
this._components.push(d);return d};t.removeComponentOfType=function(b){var a=this.getComponentOfType(b);
if(a===null){return}this.removeComponent(a)};t.removeComponent=function(a){var b=this._components.indexOf(a);
if(b===-1){return}this._components.splice(b,1);a.destroy()};t.activate=function(){for(var a=0,b=this._components.length;
a<b;a++){if(!this._components[a].isEnabled){continue}this._components[a].activate()
}this.isActive=true;if(!this.hasAnimatedIn){this.animateIn();this.hasAnimatedIn=true
}};t.deactivate=function(){this.isActive=false;for(var a=0,b=this._components.length;
a<b;a++){if(!this._components[a].isEnabled){continue}this._components[a].deactivate()
}};t.animateIn=function(){for(var a=0,b=this._components.length;a<b;a++){if(!this._components[a].isEnabled){continue
}this._components[a].animateIn()}};t.onResizeImmediate=function(b,f,a){this.cachedScrollPosition=f;
this.cachedWindowHeight=a;var c=false;for(var d=0,g=this._components.length;d<g;
d++){if(!this._components[d].isEnabled){continue}if(!c&&this._components[d]["onResizeWillBeCalledAfterDelay"]){console.warn("Jetpack: onResizeWillBeCalledAfterDelay has been removed please use `onResizeImmediate` or `onResizeDebounced` instead.");
c=true}this._components[d].onResizeImmediate(b,f,a)}};t.onResizeDebounced=function(b,f,a){this.updateScrollToPosition();
var c=false;for(var d=0,g=this._components.length;d<g;d++){if(!this._components[d].isEnabled){continue
}if(!c&&this._components[d]["onResize"]){console.warn("Jetpack: onResize has been removed please use `onResizeImmediate` or `onResizeDebounced` instead.");
c=true}this._components[d].onResizeDebounced(b,f,a)}this.elementEngagement.refreshAllElementMetrics(f,a)
};t.onBreakpoint=function(d,a,f,b){this.cachedBreakpoint=d;for(var c=0,g=this._components.length;
c<g;c++){if(!this._components[c].isEnabled){continue}this._components[c].onBreakpoint(d,a,f,b)
}};t.onRetinaChange=function(a,c,f,b){for(var d=0,g=this._components.length;d<g;
d++){if(!this._components[d].isEnabled){continue}this._components[d].onRetinaChange(a,c,f,b)
}this.elementEngagement.refreshAllElementMetrics(f,b)};t.onOrientationChange=function(b,d,f,a){this.cachedScrollPosition=f;
this.cachedWindowHeight=a;for(var c=0,g=this._components.length;c<g;c++){if(!this._components[c].isEnabled){continue
}this._components[c].onOrientationChange(b,d,f,a)}};t.onScroll=function(b,d,a){this.cachedScrollPosition=d;
this.elementEngagement.refreshAllElementStates(d);for(var c=0,f=this._components.length;
c<f;c++){if(!this._components[c].isEnabled){continue}this._components[c].onScroll(b,d,a)
}};t.onSectionWillAppearWithPadding=function(c,a){this.cachedScrollPosition=c;this.isVisibleWithPadding=true;
this.elementEngagement.refreshAllElementStates(c);for(var b=0,d=this._components.length;
b<d;b++){this._components[b].onSectionWillAppearWithPadding(c,a)}};t.onSectionWillAppear=function(c,a){this.cachedScrollPosition=c;
this.isVisible=true;this.elementEngagement.refreshAllElementStates(c);for(var b=0,d=this._components.length;
b<d;b++){this._components[b].onSectionWillAppear(c,a)}};t.onSectionWillDisappearWithPadding=function(c,a){this.cachedScrollPosition=c;
this.isVisibleWithPadding=false;for(var b=0,d=this._components.length;b<d;b++){this._components[b].onSectionWillDisappearWithPadding(c,a)
}};t.onSectionWillDisappear=function(c,a){this.cachedScrollPosition=c;this.isVisible=false;
for(var b=0,d=this._components.length;b<d;b++){this._components[b].onSectionWillDisappear(c,a)
}};t.getComponentOfType=function(b){if(!u.hasOwnProperty(b)){throw"BaseSection::getComponentOfType no component type '"+b+"' exist in ComponentMap!"
}for(var a=0,c=this._components.length;a<c;a++){if(this._components[a].componentName===b){return this._components[a]
}}return null};t.getAllComponentsOfType=function(c){if(!u.hasOwnProperty(c)){throw"BaseSection::getAllComponentsOfType no component type '"+c+"' exist in ComponentMap!"
}var a=[];for(var b=0,d=this._components.length;b<d;b++){if(this._components[b].componentName===c){a.push(this._components[b])
}}return a};t.updateScrollToPosition=function(){return this.scrollToPosition=r.getPagePosition(this.element).top
};t.setIsFixedHero=function(){if(this.index!==0){this.isFixedHero=false}else{var a=window.getComputedStyle(this.element);
this.isFixedHero=a.position==="fixed"}};s.prototype.componentIsSupported=function(a,c){var d=a.IS_SUPPORTED;
if(d===undefined){return true}if(typeof d!=="function"){console.error('BaseSection::setupComponents error in "'+c+'".IS_SUPPORTED - it should be a function which returns true/false');
return true}var b=a.IS_SUPPORTED();if(b===undefined){console.error('BaseSection::setupComponents error in "'+c+'".IS_SUPPORTED - it should be a function which returns true/false');
return true}return b};z.exports=s},{"./../model/ComponentMap":158,"./../model/DataAttributes":159,"./BaseComponent":155,"@marcom/ac-dom-metrics/getPagePosition":52,"@marcom/ac-element-engagement":113,"@marcom/ac-event-emitter-micro":118,"@marcom/ac-polyfills/Object/create":undefined,"@marcom/ac-polyfills/console.log":undefined}],158:[function(d,g,f){g.exports={BaseComponent:d("../core/BaseComponent")}
},{"../core/BaseComponent":155}],159:[function(d,g,f){g.exports={PAGE_TYPE:"data-page-type",SECTION_TYPE:"data-section-type",JUMP_SECTION_NAME:"data-page-jump-name",COMPONENT_LIST:"data-component-list"}
},{}],160:[function(i,h,f){var g={isDesktop:i("@marcom/ac-feature/isDesktop"),isRetina:i("@marcom/ac-feature/isRetina"),threeDTransformsAvailable:i("@marcom/ac-feature/threeDTransformsAvailable"),prefersReducedMotion:i("@marcom/ac-feature/prefersReducedMotion")};
h.exports={TOUCH:undefined,SVG:undefined,PAGE_JUMP:undefined,IS_DESKTOP:undefined,IS_RETINA:undefined,THREE_D_TRANSFORMS:undefined,REDUCED_MOTION:undefined,IS_AOW:undefined,init:function(){var a=document.getElementsByTagName("html")[0];
this.TOUCH=a.classList.contains("touch");this.SVG=a.classList.contains("svg");this.PAGE_JUMP=a.classList.contains("pageJump");
this.IS_DESKTOP=g.isDesktop();this.IS_RETINA=g.isRetina();this.THREE_D_TRANSFORMS=g.threeDTransformsAvailable();
this.REDUCED_MOTION=g.prefersReducedMotion();this.IS_AOW=a.classList.contains("aow")
},extend:function(b){if(!b.hasOwnProperty("init")||(typeof b.init!=="function")){throw new TypeError("The object extended Jetpack.model.EnabledFeatures must contain an init function")
}var a=this.init;var c=b.init;var d=Object.assign(this,b);d.init=function(){if(this.HAS_INITIALIZED){return
}this.HAS_INITIALIZED=true;a.call(d);c.call(d)};return d},HAS_INITIALIZED:false}
},{"@marcom/ac-feature/isDesktop":122,"@marcom/ac-feature/isRetina":123,"@marcom/ac-feature/prefersReducedMotion":125,"@marcom/ac-feature/threeDTransformsAvailable":126}],161:[function(d,g,f){g.exports={BaseSection:d("../core/BaseSection")}
},{"../core/BaseSection":157}],162:[function(h,l,i){var j=h("@marcom/ac-event-emitter-micro").EventEmitterMicro;
function m(){j.call(this);this._page=null;this.viewportPaddingRatio=1}var k=m.prototype=Object.create(j.prototype);
m.prototype.constructor=m;k.getPage=function(){return this._page};k.setPage=function(a){this._page=a
};k.removePage=function(a){if(a===this._page){this._page=null}};k.getViewportPadding=function(){return this.getPage().getWindowHeight()*this.viewportPaddingRatio
};k.deepRefreshAllElementMetrics=function(){this.trigger(m.prototype.DEEP_REFRESH_ALL_METRICS)
};k.onPageHeightSettled=function(a,f){var d=document.documentElement.scrollHeight;
var c=0;var f=f||30;window.requestAnimationFrame(function b(){var g=document.documentElement.scrollHeight;
if(d!==g){c=0}else{c++;if(c>=f){a();return}}d=g;window.requestAnimationFrame(b)
})};k.DEEP_REFRESH_ALL_METRICS="page.deep_refresh_all_metrics";l.exports=new m()
},{"@marcom/ac-event-emitter-micro":118}],163:[function(d,g,f){g.exports=function(){var a;
if(window.ViewportEmitterTestProxy){a=window.ViewportEmitterTestProxy}else{a={};
a.viewport="large";a.on=a.off=function(){}}return a}},{}],164:[function(v,w,t){var n=v("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var q=v("@marcom/ac-dom-events/utils/addEventListener");var x=v("@marcom/ac-dom-events/utils/removeEventListener");
var r=v("@marcom/ac-object/create");var u=v("./internal/KeyEvent");var p="keydown";
var o="keyup";function y(a){this._keysDown={};this._DOMKeyDown=this._DOMKeyDown.bind(this);
this._DOMKeyUp=this._DOMKeyUp.bind(this);this._context=a||document;q(this._context,p,this._DOMKeyDown,true);
q(this._context,o,this._DOMKeyUp,true);n.call(this)}var s=y.prototype=r(n.prototype);
s.onDown=function(b,a){return this.on(p+":"+b,a)};s.onceDown=function(b,a){return this.once(p+":"+b,a)
};s.offDown=function(b,a){return this.off(p+":"+b,a)};s.onUp=function(b,a){return this.on(o+":"+b,a)
};s.onceUp=function(b,a){return this.once(o+":"+b,a)};s.offUp=function(b,a){return this.off(o+":"+b,a)
};s.isDown=function(a){a+="";return this._keysDown[a]||false};s.isUp=function(a){return !this.isDown(a)
};s.destroy=function(){x(this._context,p,this._DOMKeyDown,true);x(this._context,o,this._DOMKeyUp,true);
this._keysDown=null;this._context=null;n.prototype.destroy.call(this);return this
};s._DOMKeyDown=function(b){var c=this._normalizeKeyboardEvent(b);var a=c.keyCode+="";
this._trackKeyDown(a);this.trigger(p+":"+a,c)};s._DOMKeyUp=function(b){var c=this._normalizeKeyboardEvent(b);
var a=c.keyCode+="";this._trackKeyUp(a);this.trigger(o+":"+a,c)};s._normalizeKeyboardEvent=function(a){return new u(a)
};s._trackKeyUp=function(a){if(this._keysDown[a]){this._keysDown[a]=false}};s._trackKeyDown=function(a){if(!this._keysDown[a]){this._keysDown[a]=true
}};w.exports=y},{"./internal/KeyEvent":166,"@marcom/ac-dom-events/utils/addEventListener":49,"@marcom/ac-dom-events/utils/removeEventListener":50,"@marcom/ac-event-emitter-micro":118,"@marcom/ac-object/create":180}],165:[function(i,h,f){var g=i("./Keyboard");
h.exports=new g()},{"./Keyboard":164}],166:[function(k,j,g){var h=["keyLocation"];
function i(b){this.originalEvent=b;var a;for(a in b){if(h.indexOf(a)===-1&&typeof b[a]!=="function"){this[a]=b[a]
}}this.location=(this.originalEvent.location!==undefined)?this.originalEvent.location:this.originalEvent.keyLocation
}i.prototype={preventDefault:function(){if(typeof this.originalEvent.preventDefault!=="function"){this.originalEvent.returnValue=false;
return}return this.originalEvent.preventDefault()},stopPropagation:function(){return this.originalEvent.stopPropagation()
}};j.exports=i},{}],167:[function(d,g,f){g.exports={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,COMMAND:91,CAPSLOCK:20,ESCAPE:27,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUMPAD_ZERO:96,NUMPAD_ONE:97,NUMPAD_TWO:98,NUMPAD_THREE:99,NUMPAD_FOUR:100,NUMPAD_FIVE:101,NUMPAD_SIX:102,NUMPAD_SEVEN:103,NUMPAD_EIGHT:104,NUMPAD_NINE:105,NUMPAD_ASTERISK:106,NUMPAD_PLUS:107,NUMPAD_DASH:109,NUMPAD_DOT:110,NUMPAD_SLASH:111,NUMPAD_EQUALS:187,TICK:192,LEFT_BRACKET:219,RIGHT_BRACKET:221,BACKSLASH:220,SEMICOLON:186,APOSTRAPHE:222,APOSTROPHE:222,SPACEBAR:32,CLEAR:12,COMMA:188,DOT:190,SLASH:191}
},{}],168:[function(i,h,f){h.exports=function g(b){var a;b=b||window;if(b===window){a=window.pageXOffset;
if(!a){b=document.documentElement||document.body.parentNode||document.body}else{return a
}}return b.scrollLeft}},{}],169:[function(i,h,f){h.exports=function g(b){var a;
b=b||window;if(b===window){a=window.pageYOffset;if(!a){b=document.documentElement||document.body.parentNode||document.body
}else{return a}}return b.scrollTop}},{}],170:[function(d,g,f){g.exports={Modal:d("./ac-modal-basic/Modal"),Renderer:d("./ac-modal-basic/Renderer"),classNames:d("./ac-modal-basic/classNames"),dataAttributes:d("./ac-modal-basic/dataAttributes")}
},{"./ac-modal-basic/Modal":171,"./ac-modal-basic/Renderer":172,"./ac-modal-basic/classNames":173,"./ac-modal-basic/dataAttributes":174}],171:[function(z,A,w){var r={addEventListener:z("@marcom/ac-dom-events/addEventListener"),removeEventListener:z("@marcom/ac-dom-events/removeEventListener"),target:z("@marcom/ac-dom-events/target")};
var u={getScrollX:z("@marcom/ac-dom-metrics/getScrollX"),getScrollY:z("@marcom/ac-dom-metrics/getScrollY")};
var y={create:z("@marcom/ac-object/create"),defaults:z("@marcom/ac-object/defaults")};
var t=z("@marcom/ac-keyboard");var o=z("@marcom/ac-keyboard/keyMap");var q=z("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var x=z("./Renderer");var p={retainScrollPosition:false};function s(b,a){q.call(this);
this.options=y.defaults(p,b);this.renderer=new x(a);this.opened=false;this._keysToClose=[o.ESCAPE];
this._attachedKeysToClose=[];this.close=this.close.bind(this)}var v=s.prototype=y.create(q.prototype);
v.open=function(){if(this.options.retainScrollPosition){this._saveScrollPosition()
}if(!this.opened){this._attachEvents();this.trigger("willopen");this.renderer.open();
this.opened=true;this.trigger("open")}};v.close=function(c){var a;var b;if(this.opened){if(c&&c.type==="click"){a=r.target(c);
b=this.renderer.options.dataAttributes.close;if(!a.hasAttribute(b)){return}}this.trigger("willclose");
this._removeEvents();this.renderer.close();if(this.options.retainScrollPosition){this._restoreScrollPosition()
}this.opened=false;this.trigger("close")}};v.render=function(){this.renderer.render()
};v.appendContent=function(b,a){this.renderer.appendContent(b,a)};v.removeContent=function(a){this.renderer.removeContent(a)
};v.destroy=function(){this._removeEvents();this.renderer.destroy();for(var a in this){if(this.hasOwnProperty(a)){this[a]=null
}}};v.addKeyToClose=function(a){var b=this._keysToClose.indexOf(a);if(b===-1){this._keysToClose.push(a);
this._bindKeyToClose(a)}};v.removeKeyToClose=function(a){var b=this._keysToClose.indexOf(a);
if(b!==-1){this._keysToClose.splice(b,1)}this._releaseKeyToClose(a)};v._bindKeyToClose=function(a){var b=this._attachedKeysToClose.indexOf(a);
if(b===-1){t.onUp(a,this.close);this._attachedKeysToClose.push(a)}};v._releaseKeyToClose=function(a){var b=this._attachedKeysToClose.indexOf(a);
if(b!==-1){t.offUp(a,this.close);this._attachedKeysToClose.splice(b,1)}};v._removeEvents=function(){if(this.renderer.modalElement){r.removeEventListener(this.renderer.modalElement,"click",this.close)
}this._keysToClose.forEach(this._releaseKeyToClose,this)};v._attachEvents=function(){if(this.renderer.modalElement){r.addEventListener(this.renderer.modalElement,"click",this.close)
}this._keysToClose.forEach(this._bindKeyToClose,this)};v._restoreScrollPosition=function(){window.scrollTo(this._scrollX||0,this._scrollY||0)
};v._saveScrollPosition=function(){this._scrollX=u.getScrollX();this._scrollY=u.getScrollY()
};A.exports=s},{"./Renderer":172,"@marcom/ac-dom-events/addEventListener":45,"@marcom/ac-dom-events/removeEventListener":46,"@marcom/ac-dom-events/target":48,"@marcom/ac-dom-metrics/getScrollX":168,"@marcom/ac-dom-metrics/getScrollY":169,"@marcom/ac-event-emitter-micro":118,"@marcom/ac-keyboard":165,"@marcom/ac-keyboard/keyMap":167,"@marcom/ac-object/create":180,"@marcom/ac-object/defaults":181}],172:[function(u,v,q){var w={add:u("@marcom/ac-classlist/add"),remove:u("@marcom/ac-classlist/remove")};
var s={defaults:u("@marcom/ac-object/defaults")};var n={remove:u("@marcom/ac-dom-nodes/remove"),isElement:u("@marcom/ac-dom-nodes/isElement")};
var o=u("./classNames");var m=u("./dataAttributes");var t={modalElement:null,contentElement:null,closeButton:null,classNames:o,dataAttributes:m};
var r=function(a){a=a||{};this.options=s.defaults(t,a);this.options.classNames=s.defaults(t.classNames,a.classNames);
this.options.dataAttributes=s.defaults(t.dataAttributes,a.dataAttributes);this.modalElement=this.options.modalElement;
this.contentElement=this.options.contentElement;this.closeButton=this.options.closeButton
};var p=r.prototype;p.render=function(){if(!n.isElement(this.modalElement)){this.modalElement=this.renderModalElement(this.options.classNames.modalElement)
}if(!n.isElement(this.contentElement)){this.contentElement=this.renderContentElement(this.options.classNames.contentElement)
}if(this.closeButton!==false){if(!n.isElement(this.closeButton)){this.closeButton=this.renderCloseButton(this.options.classNames.closeButton)
}this.modalElement.appendChild(this.closeButton)}this.modalElement.appendChild(this.contentElement);
document.body.appendChild(this.modalElement);return this.modalElement};p.renderCloseButton=function(b){var a;
b=b||this.options.classNames.closeButton;a=this._renderElement("button",b);a.setAttribute(this.options.dataAttributes.close,"");
return a};p.renderModalElement=function(a){a=a||this.options.classNames.modalElement;
return this._renderElement("div",a)};p.renderContentElement=function(a){a=a||this.options.classNames.contentElement;
return this._renderElement("div",a)};p.appendContent=function(a,b){if(!n.isElement(a)){return
}if(arguments[1]===undefined){this.contentElement.appendChild(a)}else{if(n.isElement(b)){b.appendChild(a)
}}};p.removeContent=function(a){if(a){if(this.modalElement.contains(a)){n.remove(a)
}}else{this._emptyContent()}};p.open=function(){var b=[document.documentElement].concat(this.options.classNames.documentElement);
var a=[this.modalElement].concat(this.options.classNames.modalOpen);w.add.apply(null,b);
w.add.apply(null,a)};p.close=function(){var b=[document.documentElement].concat(this.options.classNames.documentElement);
var a=[this.modalElement].concat(this.options.classNames.modalOpen);w.remove.apply(null,b);
w.remove.apply(null,a)};p.destroy=function(){var a=[document.documentElement].concat(this.options.classNames.documentElement);
if(this.modalElement&&document.body.contains(this.modalElement)){this.close();document.body.removeChild(this.modalElement)
}w.remove.apply(null,a);for(var b in this){if(this.hasOwnProperty(b)){this[b]=null
}}};p._renderElement=function(c,b){var d=document.createElement(c);var a=[d];if(b){a=a.concat(b)
}w.add.apply(null,a);return d};p._emptyContent=function(){this.contentElement.innerHTML=""
};v.exports=r},{"./classNames":173,"./dataAttributes":174,"@marcom/ac-classlist/add":11,"@marcom/ac-classlist/remove":16,"@marcom/ac-dom-nodes/isElement":64,"@marcom/ac-dom-nodes/remove":67,"@marcom/ac-object/defaults":181}],173:[function(d,g,f){g.exports={modalElement:"modal",modalOpen:"modal-open",documentElement:"has-modal",contentElement:"modal-content",closeButton:"modal-close"}
},{}],174:[function(d,g,f){g.exports={close:"data-modal-close"}},{}],175:[function(d,g,f){g.exports={Modal:d("./ac-modal/Modal"),createStandardModal:d("./ac-modal/factory/createStandardModal"),createFullViewportModal:d("./ac-modal/factory/createFullViewportModal")}
},{"./ac-modal/Modal":176,"./ac-modal/factory/createFullViewportModal":177,"./ac-modal/factory/createStandardModal":178}],176:[function(q,p,j){var m=q("@marcom/ac-modal-basic").Modal;
var n=q("@marcom/ac-event-emitter-micro").EventEmitterMicro;var l=q("@marcom/ac-accessibility/CircularTab");
function k(a){n.call(this);this.options=a||{};this._modal=new m(a,this.options.renderer);
this.opened=false;this._render();this.closeButton=this._modal.renderer.closeButton;
this.modalElement=this._modal.renderer.modalElement;this.contentElement=this._modal.renderer.contentElement;
this.modalElement.setAttribute("role","dialog");this.closeButton.setAttribute("aria-label","Close");
this._circularTab=new l(this.modalElement);this._onWillOpen=this._onWillOpen.bind(this);
this._onOpen=this._onOpen.bind(this);this._onWillClose=this._onWillClose.bind(this);
this._onClose=this._onClose.bind(this);this._bindEvents()}var o=k.prototype=Object.create(n.prototype);
o.open=function(){this._modal.open();this.opened=this._modal.opened};o.close=function(){this._modal.close()
};o.appendContent=function(a){this._modal.appendContent(a)};o.removeContent=function(a){this._modal.removeContent(a)
};o.destroy=function(){this._releaseEvents();this._modal.destroy();this._removeModalFocus();
this._circularTab.destroy();this._focusObj=null;for(var a in this){if(this.hasOwnProperty(a)){this[a]=null
}}};o.addKeyToClose=function(a){this._modal.addKeyToClose(a)};o.removeKeyToClose=function(a){this._modal.removeKeyToClose(a)
};o._render=function(){this._modal.render();this._modal.renderer.modalElement.setAttribute("aria-hidden","true")
};o._bindEvents=function(){this._modal.on("willopen",this._onWillOpen);this._modal.on("open",this._onOpen);
this._modal.on("willclose",this._onWillClose);this._modal.on("close",this._onClose)
};o._releaseEvents=function(){this._modal.off("willopen",this._onWillOpen);this._modal.off("open",this._onOpen);
this._modal.off("willclose",this._onWillClose);this._modal.off("close",this._onClose)
};o._onWillOpen=function(){this.trigger("willopen")};o._onOpen=function(){this.opened=this._modal.opened;
this._giveModalFocus();this.trigger("open")};o._onWillClose=function(){this.trigger("willclose");
this._removeModalFocus()};o._onClose=function(){this.opened=this._modal.opened;
this.trigger("close")};o._giveModalFocus=function(){this.modalElement.setAttribute("aria-hidden","false");
this._activeElement=document.activeElement;this.closeButton.focus();this._circularTab.start()
};o._removeModalFocus=function(){this._circularTab.stop();this.modalElement.setAttribute("aria-hidden","true");
if(this._activeElement){this._activeElement.focus();this._activeElement=null}};
p.exports=k},{"@marcom/ac-accessibility/CircularTab":1,"@marcom/ac-event-emitter-micro":118,"@marcom/ac-modal-basic":170}],177:[function(l,k,n){var o=l("../Modal");
var i=l("@marcom/ac-modal-basic").classNames;var m={retainScrollPosition:true,renderer:{classNames:{documentElement:[i.documentElement].concat("has-modal-full-viewport"),modalElement:[i.modalElement].concat("modal-full-viewport")}}};
function j(a){var b=new o(m);if(a){b.appendContent(a)}return b}k.exports=j},{"../Modal":176,"@marcom/ac-modal-basic":170}],178:[function(q,r,p){var m=q("../Modal");
var o=q("@marcom/ac-modal-basic").classNames;var l=q("@marcom/ac-modal-basic").dataAttributes;
var s={add:q("@marcom/ac-classlist/add")};var k={renderer:{classNames:{documentElement:[o.documentElement].concat("has-modal-standard"),modalElement:[o.modalElement].concat("modal-standard")}}};
function n(d){var f=new m(k);if(d){f.appendContent(d)}var b=document.createElement("div");
var g=document.createElement("div");var a=document.createElement("div");var c=document.createElement("div");
s.add(b,"content-table");s.add(g,"content-cell");s.add(a,"content-wrapper");s.add(c,"content-padding","large-8","medium-10");
f.modalElement.setAttribute(l.close,"");a.setAttribute(l.close,"");g.setAttribute(l.close,"");
b.appendChild(g);g.appendChild(a);a.appendChild(c);f.modalElement.appendChild(b);
c.appendChild(f.contentElement);c.appendChild(f.closeButton);return f}r.exports=n
},{"../Modal":176,"@marcom/ac-classlist/add":11,"@marcom/ac-modal-basic":170}],179:[function(o,n,i){o("@marcom/ac-polyfills/Array/isArray");
var k=o("./extend");var j=Object.prototype.hasOwnProperty;var m=function(c,b){var a;
for(a in b){if(j.call(b,a)){if(b[a]===null){c[a]=null}else{if(typeof b[a]==="object"){c[a]=Array.isArray(b[a])?[]:{};
m(c[a],b[a])}else{c[a]=b[a]}}}}return c};n.exports=function l(a,b){if(b){return m({},a)
}return k({},a)}},{"./extend":182,"@marcom/ac-polyfills/Array/isArray":undefined}],180:[function(g,j,h){var i=function(){};
j.exports=function k(a){if(arguments.length>1){throw new Error("Second argument not supported")
}if(a===null||typeof a!=="object"){throw new TypeError("Object prototype may only be an Object.")
}if(typeof Object.create==="function"){return Object.create(a)}else{i.prototype=a;
return new i()}}},{}],181:[function(g,k,h){var i=g("./extend");k.exports=function j(a,b){if(typeof a!=="object"){throw new TypeError("defaults: must provide a defaults object")
}b=b||{};if(typeof b!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return i({},a,b)}},{"./extend":182}],182:[function(k,j,g){k("@marcom/ac-polyfills/Array/prototype.forEach");
var h=Object.prototype.hasOwnProperty;j.exports=function i(){var a;var b;if(arguments.length<2){a=[{},arguments[0]]
}else{a=[].slice.call(arguments)}b=a.shift();a.forEach(function(c){if(c!=null){for(var d in c){if(h.call(c,d)){b[d]=c[d]
}}}});return b}},{"@marcom/ac-polyfills/Array/prototype.forEach":undefined}],183:[function(d,g,f){g.exports={PageVisibilityManager:d("./ac-page-visibility/PageVisibilityManager")}
},{"./ac-page-visibility/PageVisibilityManager":184}],184:[function(o,m,i){var n=o("@marcom/ac-object/create");
var k=o("@marcom/ac-event-emitter-micro").EventEmitterMicro;function j(){if(typeof document.addEventListener==="undefined"){return
}var a;if(typeof document.hidden!=="undefined"){this._hidden="hidden";a="visibilitychange"
}else{if(typeof document.mozHidden!=="undefined"){this._hidden="mozHidden";a="mozvisibilitychange"
}else{if(typeof document.msHidden!=="undefined"){this._hidden="msHidden";a="msvisibilitychange"
}else{if(typeof document.webkitHidden!=="undefined"){this._hidden="webkitHidden";
a="webkitvisibilitychange"}}}}if(typeof document[this._hidden]==="undefined"){this.isHidden=false
}else{this.isHidden=document[this._hidden]}if(a){document.addEventListener(a,this._handleVisibilityChange.bind(this),false)
}k.call(this)}var l=j.prototype=n(k.prototype);l.CHANGED="changed";l._handleVisibilityChange=function(a){this.isHidden=document[this._hidden];
this.trigger(this.CHANGED,{isHidden:this.isHidden})};m.exports=new j()},{"@marcom/ac-event-emitter-micro":118,"@marcom/ac-object/create":180}],185:[function(p,r,o){var n=p("./utils/eventTypeAvailable");
var k=p("./shared/camelCasedEventTypes");var q=p("./shared/windowFallbackEventTypes");
var m=p("./shared/prefixHelper");var s={};r.exports=function l(a,b){var f;var d;
var c;b=b||"div";a=a.toLowerCase();if(!(b in s)){s[b]={}}d=s[b];if(a in d){return d[a]
}if(n(a,b)){return d[a]=a}if(a in k){for(c=0;c<k[a].length;c++){f=k[a][c];if(n(f.toLowerCase(),b)){return d[a]=f
}}}for(c=0;c<m.evt.length;c++){f=m.evt[c]+a;if(n(f,b)){m.reduce(c);return d[a]=f
}}if(b!=="window"&&q.indexOf(a)){return d[a]=l(a,"window")}return d[a]=false}},{"./shared/camelCasedEventTypes":189,"./shared/prefixHelper":191,"./shared/windowFallbackEventTypes":194,"./utils/eventTypeAvailable":196}],186:[function(n,m,o){var i=n("./shared/stylePropertyCache");
var k=n("./getStyleProperty");var l=n("./getStyleValue");m.exports=function j(a,b){var c;
a=k(a);if(!a){return false}c=i[a].css;if(typeof b!=="undefined"){b=l(a,b);if(b===false){return false
}c+=":"+b+";"}return c}},{"./getStyleProperty":187,"./getStyleValue":188,"./shared/stylePropertyCache":192}],187:[function(q,r,o){var u=q("./shared/stylePropertyCache");
var n=q("./shared/getStyleTestElement");var t=q("./utils/toCSS");var l=q("./utils/toDOM");
var m=q("./shared/prefixHelper");var s=function(c,b){var a=t(c);var d=(b===false)?false:t(b);
u[c]=u[b]=u[a]=u[d]={dom:b,css:d};return b};r.exports=function p(c){var f;var b;
var d;var a;c+="";if(c in u){return u[c].dom}d=n();c=l(c);b=c.charAt(0).toUpperCase()+c.substring(1);
if(c==="filter"){f=["WebkitFilter","filter"]}else{f=(c+" "+m.dom.join(b+" ")+b).split(" ")
}for(a=0;a<f.length;a++){if(typeof d.style[f[a]]!=="undefined"){if(a!==0){m.reduce(a-1)
}return s(c,f[a])}}return s(c,false)}},{"./shared/getStyleTestElement":190,"./shared/prefixHelper":191,"./shared/stylePropertyCache":192,"./utils/toCSS":197,"./utils/toDOM":198}],188:[function(t,v,q){var s=t("./getStyleProperty");
var n=t("./shared/styleValueAvailable");var o=t("./shared/prefixHelper");var w=t("./shared/stylePropertyCache");
var p={};var m=/(\([^\)]+\))/gi;var r=/([^ ,;\(]+(\([^\)]+\))?)/gi;v.exports=function u(b,c){var a;
c+="";b=s(b);if(!b){return false}if(n(b,c)){return c}a=w[b].css;c=c.replace(r,function(h){var i;
var d;var f;var g;if(h[0]==="#"||!isNaN(h[0])){return h}d=h.replace(m,"");f=a+":"+d;
if(f in p){if(p[f]===false){return""}return h.replace(d,p[f])}i=o.css.map(function(j){return j+h
});i=[h].concat(i);for(g=0;g<i.length;g++){if(n(b,i[g])){if(g!==0){o.reduce(g-1)
}p[f]=i[g].replace(m,"");return i[g]}}p[f]=false;return""});c=c.trim();return(c==="")?false:c
}},{"./getStyleProperty":187,"./shared/prefixHelper":191,"./shared/stylePropertyCache":192,"./shared/styleValueAvailable":193}],189:[function(d,g,f){g.exports={transitionend:["webkitTransitionEnd","MSTransitionEnd"],animationstart:["webkitAnimationStart","MSAnimationStart"],animationend:["webkitAnimationEnd","MSAnimationEnd"],animationiteration:["webkitAnimationIteration","MSAnimationIteration"],fullscreenchange:["MSFullscreenChange"],fullscreenerror:["MSFullscreenError"]}
},{}],190:[function(k,j,g){var i;j.exports=function h(){if(!i){i=document.createElement("_")
}else{i.style.cssText="";i.removeAttribute("style")}return i};j.exports.resetElement=function(){i=null
}},{}],191:[function(j,p,k){var l=["-webkit-","-moz-","-ms-"];var o=["Webkit","Moz","ms"];
var m=["webkit","moz","ms"];var q=function(){this.initialize()};var n=q.prototype;
n.initialize=function(){this.reduced=false;this.css=l;this.dom=o;this.evt=m};n.reduce=function(a){if(!this.reduced){this.reduced=true;
this.css=[this.css[a]];this.dom=[this.dom[a]];this.evt=[this.evt[a]]}};p.exports=new q()
},{}],192:[function(d,g,f){g.exports={}},{}],193:[function(s,t,r){var u=s("./stylePropertyCache");
var q=s("./getStyleTestElement");var n=false;var l;var m;var p=function(){var b;
if(!n){n=true;l=("CSS" in window&&"supports" in window.CSS);m=false;b=q();try{b.style.width="invalid"
}catch(a){m=true}}};t.exports=function o(d,f){var a;var b;p();if(l){d=u[d].css;
return CSS.supports(d,f)}b=q();a=b.style[d];if(m){try{b.style[d]=f}catch(c){return false
}}else{b.style[d]=f}return(b.style[d]&&b.style[d]!==a)};t.exports.resetFlags=function(){n=false
}},{"./getStyleTestElement":190,"./stylePropertyCache":192}],194:[function(d,g,f){g.exports=["transitionend","animationstart","animationend","animationiteration"]
},{}],195:[function(k,j,h){var g=/(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;j.exports=function i(a){a=String.prototype.replace.call(a,g,"");
return a.charAt(0).toLowerCase()+a.substring(1)}},{}],196:[function(k,i,g){var h={window:window,document:document};
i.exports=function j(a,c){var b;a="on"+a;if(!(c in h)){h[c]=document.createElement(c)
}b=h[c];if(a in b){return true}if("setAttribute" in b){b.setAttribute(a,"return;");
return(typeof b[a]==="function")}return false}},{}],197:[function(k,j,g){var i=/^(webkit|moz|ms)/gi;
j.exports=function h(a){var b;if(a.toLowerCase()==="cssfloat"){return"float"}if(i.test(a)){a="-"+a
}return a.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
}},{}],198:[function(g,k,h){var i=/-([a-z])/g;k.exports=function j(a){var b;if(a.toLowerCase()==="float"){return"cssFloat"
}a=a.replace(i,function(c,d){return d.toUpperCase()});if(a.substr(0,2)==="Ms"){a="ms"+a.substring(2)
}return a}},{}],199:[function(x,y,s){var v=x("@marcom/ac-object/defaults");var u=x("@marcom/ac-queue").LiveQueue;
var o=x("@marcom/ac-event-emitter-micro").EventEmitterMicro;var t=x("@marcom/ac-raf-emitter/update");
var q=x("@marcom/ac-raf-emitter/draw");var w={container:document.body,includeContainer:false};
var p={loadingPoolSize:8,timeout:null,imageDataAttribute:"data-progressive-image",imageAnimate:true,imageAnimateClass:"progressive-image-animated"};
n.Events={ImageLoad:"image-load",Complete:"complete"};function n(a){o.call(this);
this.options=v(w,a);this.loadingOptions=null;this.els=[];this.loadingQueue=null;
this._queueItems=[];this._queueItemsObj={};this._loadOrder=[];this._timeout=null;
this._didCallLoad=false}var r=n.prototype=Object.create(o.prototype);r.load=function(a){if(this._didCallLoad){return
}this._didCallLoad=true;this.loadingOptions=v(p,a);this.loadingQueue=new u(this.loadingOptions.loadingPoolSize);
this.els=Array.from(this._getProgressiveImageElements());if(this.options.includeContainer&&this.options.container.hasAttribute(this._getProgressiveImageDataAttribute())){this.els.unshift(this.options.container)
}q(function(){var c,d=this.els.length,b;for(c=0;c<d;c++){b={queueItem:this.loadingQueue.enqueue(this._loadNextItem.bind(this,c),c),el:this.els[c],id:c};
this._queueItems.push(b);this._queueItemsObj[c]=b;if(this.loadingOptions.imageAnimate){this.els[c].classList.add(this.loadingOptions.imageAnimateClass)
}}t(function(){this.loadingQueue.start();if(typeof this.loadingOptions.timeout==="number"){this._timeout=setTimeout(this.cancel.bind(this),this.loadingOptions.timeout)
}}.bind(this))}.bind(this))};r.setVisible=function(a){return new Promise(function(b,c){q(function(){a.removeAttribute(this._getProgressiveImageDataAttribute());
b();a=null}.bind(this))}.bind(this))};r.cancel=function(){if(this.els){var a,b=this.els.length;
for(a=0;a<b;a++){this.setVisible(this.els[a]);if(this.loadingOptions.imageAnimate){q(function(){this.els[a].setAttribute("data-progressive-image-loaded","")
}.bind(this,a))}}}this._handleLoadingComplete()};r.destroy=function(){this.cancel();
this.off();o.prototype.destroy.call(this)};r._loadNextItem=function(a){return new Promise(function(f,c,d){var b=this._queueItemsObj[f];
this._loadAndSetVisible(b.el).then(function(){var g=this._queueItems.indexOf(b);
this._queueItems.splice(g,1);this._queueItemsObj[b.id]=null;c();this._handleImageLoad(b.el);
b=c=null;if(this.loadingQueue.count()===1){this._handleLoadingComplete()}}.bind(this))
}.bind(this,a))};r._loadAndSetVisible=function(a){return new Promise(function(b,c){this.setVisible(a).then(function(){this._getBackgroundImageSrc(a).then(function(d){this._loadImage(d).then(b);
a=null}.bind(this))}.bind(this))}.bind(this))};r._getBackgroundImageSrc=function(a){return new Promise(function(b,c){t(function(){var d=a.currentStyle;
if(!d){d=window.getComputedStyle(a,false)}a=null;if(d.backgroundImage.indexOf("url(")===0){b(d.backgroundImage.slice(4,-1).replace(/"/g,""));
return}b(null)}.bind(this))}.bind(this))};r._getProgressiveImageDataAttribute=function(){return this.loadingOptions.imageDataAttribute
};r._getProgressiveImageCSSQuery=function(){return"["+this._getProgressiveImageDataAttribute()+"]"
};r._getProgressiveImageElements=function(){return this.options.container.querySelectorAll(this._getProgressiveImageCSSQuery())||[]
};r._loadImage=function(a){return new Promise(this._loadImagePromiseFunc.bind(this,a))
};r._loadImagePromiseFunc=function(a,b,c){function d(){this.removeEventListener("load",d);
b(this);b=null}if(!a){b(null);return}var f=new Image();f.addEventListener("load",d);
f.src=a};r._clearTimeout=function(){if(this._timeout){window.clearTimeout(this._timeout);
this._timeout=null}};r._handleImageLoad=function(a){q(function(){this.trigger(n.Events.ImageLoad,a);
if(this.loadingOptions.imageAnimate){a.setAttribute("data-progressive-image-loaded","")
}a=null}.bind(this))};r._handleLoadingComplete=function(){this.loadingQueue.stop();
this._clearTimeout();this.trigger(n.Events.Complete)};y.exports=n},{"@marcom/ac-event-emitter-micro":118,"@marcom/ac-object/defaults":181,"@marcom/ac-queue":200,"@marcom/ac-raf-emitter/draw":210,"@marcom/ac-raf-emitter/update":212}],200:[function(d,g,f){g.exports={Queue:d("./ac-queue/Queue"),QueueItem:d("./ac-queue/QueueItem"),LiveQueue:d("./ac-queue/LiveQueue")}
},{"./ac-queue/LiveQueue":201,"./ac-queue/Queue":202,"./ac-queue/QueueItem":203}],201:[function(i,o,j){i("@marcom/ac-polyfills/Promise");
i("@marcom/ac-polyfills/requestAnimationFrame");i("@marcom/ac-polyfills/Function/prototype.bind");
var l=i("./Queue");var k=i("./QueueItem");function m(a){this._queue=new l();this._maxProcesses=a||1;
this._availableSlots=this._maxProcesses;this._rafId=0;this._isRunning=false;this._boundFunctions={_run:this._run.bind(this),_releaseSlot:this._releaseSlot.bind(this)}
}var n=m.prototype;n.start=function(){if(this._isRunning){cancelAnimationFrame(this._rafId)
}this._rafId=requestAnimationFrame(this._boundFunctions._run);this._isRunning=true
};n.pause=function(){if(this._isRunning){cancelAnimationFrame(this._rafId);this._rafId=0
}this._isRunning=false};n.stop=function(){this.pause();this.clear()};n.enqueue=function(c,b){if(typeof c!=="function"){throw new Error("LiveQueue can only enqueue functions")
}if(b===undefined){b=l.PRIORITY_DEFAULT}var a=new k(c,b);return this.enqueueQueueItem(a)
};n.enqueueQueueItem=function(a){this._queue.enqueueQueueItem(a);if(this._isRunning&&this._rafId===0){this.start()
}return a};n.dequeueQueueItem=function(a){return this._queue.dequeueQueueItem(a)
};n.clear=function(){this._queue=new l()};n.destroy=function(){this.pause();this._isRunning=false;
this._queue=null;this._boundFunctions=null};n.count=function(){return this._queue.count()+this.pending()
};n.pending=function(){return this._maxProcesses-this._availableSlots};n.isEmpty=function(){return this.count()===0
};n._run=function(){if(!this._isRunning){return}this._rafId=requestAnimationFrame(this._boundFunctions._run);
if(this._queue.isEmpty()||this._availableSlots===0){return}var a=this._queue.dequeue();
var b=a.data();if(this._isPromise(b)){this._retainSlot();b.then(this._boundFunctions._releaseSlot,this._boundFunctions._releaseSlot)
}this._stopRunningIfDone()};n._retainSlot=function(){this._availableSlots--};n._releaseSlot=function(){this._availableSlots++;
this._stopRunningIfDone()};n._stopRunningIfDone=function(){if(this._rafId!=0&&this._queue.count()===0&&this._availableSlots==this._maxProcesses){cancelAnimationFrame(this._rafId);
this._rafId=0}};n._isPromise=function(a){return !!(a&&typeof a.then==="function")
};o.exports=m},{"./Queue":202,"./QueueItem":203,"@marcom/ac-polyfills/Function/prototype.bind":undefined,"@marcom/ac-polyfills/Promise":undefined,"@marcom/ac-polyfills/requestAnimationFrame":undefined}],202:[function(h,m,i){var j=h("./QueueItem");
function k(){this._items=[]}var l=k.prototype;l.enqueue=function(a,c){if(c===undefined){c=k.PRIORITY_DEFAULT
}var b=new j(a,c);return this.enqueueQueueItem(b)};l.enqueueQueueItem=function(a){if(this._items.indexOf(a)===-1){this._items.push(a)
}return a};l.dequeue=function(){this._heapSort();var a=this._items.length-1;var b=this._items[0];
this._items[0]=this._items[a];this._items.pop();return b};l.dequeueQueueItem=function(a){var b=this._items.indexOf(a);
if(b>-1){this._items.splice(b,1)}return a};l.peek=function(){if(this.count()==0){return null
}this._heapSort();return this._items[0]};l.isEmpty=function(){return this._items.length===0
};l.count=function(){return this._items.length};l.toString=function(){var a=["Queue total items: "+this.count()+"\n"];
for(var b=0;b<this.count();++b){a.push(this._items[b].toString()+"\n")}return a.join("")
};l._heapSort=function(){var d=0;for(var a=this._items.length-1;a>=0;a--){var f=a;
while(f>0){d++;var c=Math.floor((f-1)/2);if(this._items[f].compareTo(this._items[c])>=0){break
}var b=this._items[f];this._items[f]=this._items[c];this._items[c]=b;f=c}}};k.PRIORITY_LOW=10;
k.PRIORITY_DEFAULT=5;k.PRIORITY_HIGH=1;m.exports=k},{"./QueueItem":203}],203:[function(h,m,i){var j=0;
function k(a,b){this.priority=b;this.data=a;this.insertionOrder=j++}var l=k.prototype;
l.compareTo=function(a){if(this.priority<a.priority){return -1}else{if(this.priority>a.priority){return 1
}else{return(this.insertionOrder<a.insertionOrder)?-1:1}}};l.toString=function(){return"QueueItem {priority:"+this.priority+",\tdata:"+this.data+"\tinsertionOrder:"+this.insertionOrder+"}"
};m.exports=k},{}],204:[function(o,m,i){var j=o("@marcom/ac-shared-instance").SharedInstance;
var l="ac-raf-emitter-id-generator:sharedRAFEmitterIDGeneratorInstance",n="1.0.3";
var k=function(){this._currentID=0};k.prototype.getNewID=function(){this._currentID++;
return"raf:"+this._currentID};m.exports=j.share(l,n,k)},{"@marcom/ac-shared-instance":215}],205:[function(o,n,p){var l;
var m=o("@marcom/ac-event-emitter-micro").EventEmitterMicro;var q=o("@marcom/ac-raf-executor/sharedRAFExecutorInstance");
var j=o("@marcom/ac-raf-emitter-id-generator/sharedRAFEmitterIDGeneratorInstance");
function k(a){a=a||{};m.call(this);this.id=j.getNewID();this.executor=a.executor||q;
this._reset();this._willRun=false;this._didDestroy=false}l=k.prototype=Object.create(m.prototype);
l.run=function(){if(!this._willRun){this._willRun=true}return this._subscribe()
};l.cancel=function(){this._unsubscribe();if(this._willRun){this._willRun=false
}this._reset()};l.destroy=function(){var a=this.willRun();this.cancel();this.executor=null;
m.prototype.destroy.call(this);this._didDestroy=true;return a};l.willRun=function(){return this._willRun
};l.isRunning=function(){return this._isRunning};l._subscribe=function(){return this.executor.subscribe(this)
};l._unsubscribe=function(){return this.executor.unsubscribe(this)};l._onAnimationFrameStart=function(a){this._isRunning=true;
this._willRun=false;if(!this._didEmitFrameData){this._didEmitFrameData=true;this.trigger("start",a)
}};l._onAnimationFrameEnd=function(a){if(!this._willRun){this.trigger("stop",a);
this._reset()}};l._reset=function(){this._didEmitFrameData=false;this._isRunning=false
};n.exports=k},{"@marcom/ac-event-emitter-micro":118,"@marcom/ac-raf-emitter-id-generator/sharedRAFEmitterIDGeneratorInstance":204,"@marcom/ac-raf-executor/sharedRAFExecutorInstance":214}],206:[function(h,m,i){var l=h("./SingleCallRAFEmitter");
var j=function(a){this.rafEmitter=new l();this.rafEmitter.on(a,this._onRAFExecuted.bind(this));
this.requestAnimationFrame=this.requestAnimationFrame.bind(this);this.cancelAnimationFrame=this.cancelAnimationFrame.bind(this);
this._frameCallbacks=[];this._nextFrameCallbacks=[];this._currentFrameID=-1;this._cancelFrameIdx=-1;
this._frameCallbackLength=0;this._nextFrameCallbacksLength=0;this._frameCallbackIteration=0
};var k=j.prototype;k.requestAnimationFrame=function(a){this._currentFrameID=this.rafEmitter.run();
this._nextFrameCallbacks.push(this._currentFrameID,a);this._nextFrameCallbacksLength+=2;
return this._currentFrameID};k.cancelAnimationFrame=function(a){this._cancelFrameIdx=this._nextFrameCallbacks.indexOf(a);
if(this._cancelFrameIdx===-1){return}this._nextFrameCallbacks.splice(this._cancelFrameIdx,2);
this._nextFrameCallbacksLength-=2;if(this._nextFrameCallbacksLength===0){this.rafEmitter.cancel()
}};k._onRAFExecuted=function(a){this._frameCallbacks=this._nextFrameCallbacks;this._frameCallbackLength=this._nextFrameCallbacksLength;
this._nextFrameCallbacks=[];this._nextFrameCallbacksLength=0;for(this._frameCallbackIteration=0;
this._frameCallbackIteration<this._frameCallbackLength;this._frameCallbackIteration+=2){this._frameCallbacks[this._frameCallbackIteration+1](a.time,a)
}};m.exports=j},{"./SingleCallRAFEmitter":208}],207:[function(h,m,i){var j=h("./RAFInterface");
var k=function(){this.events={}};var l=k.prototype;l.requestAnimationFrame=function(a){if(!this.events[a]){this.events[a]=new j(a)
}return this.events[a].requestAnimationFrame};l.cancelAnimationFrame=function(a){if(!this.events[a]){this.events[a]=new j(a)
}return this.events[a].cancelAnimationFrame};m.exports=new k()},{"./RAFInterface":206}],208:[function(m,l,h){var i=m("./RAFEmitter");
var k=function(a){i.call(this,a)};var j=k.prototype=Object.create(i.prototype);
j._subscribe=function(){return this.executor.subscribe(this,true)};l.exports=k},{"./RAFEmitter":205}],209:[function(f,i,g){var h=f("./RAFInterfaceController");
i.exports=h.cancelAnimationFrame("external")},{"./RAFInterfaceController":207}],210:[function(f,i,g){var h=f("./RAFInterfaceController");
i.exports=h.requestAnimationFrame("draw")},{"./RAFInterfaceController":207}],211:[function(f,i,g){var h=f("./RAFInterfaceController");
i.exports=h.requestAnimationFrame("external")},{"./RAFInterfaceController":207}],212:[function(f,i,g){var h=f("./RAFInterfaceController");
i.exports=h.requestAnimationFrame("update")},{"./RAFInterfaceController":207}],213:[function(g,j,h){g("@marcom/ac-polyfills/performance/now");
var i;function k(a){a=a||{};this._reset();this._willRun=false;this._totalSubscribeCount=-1;
this._requestAnimationFrame=window.requestAnimationFrame;this._cancelAnimationFrame=window.cancelAnimationFrame;
this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);this._boundOnExternalAnimationFrame=this._onExternalAnimationFrame.bind(this)
}i=k.prototype;i.subscribe=function(b,a){this._totalSubscribeCount++;if(!this._nextFrameSubscribers[b.id]){if(a){this._nextFrameSubscribersOrder.unshift(b.id)
}else{this._nextFrameSubscribersOrder.push(b.id)}this._nextFrameSubscribers[b.id]=b;
this._nextFrameSubscriberArrayLength++;this._nextFrameSubscriberCount++;this._run()
}return this._totalSubscribeCount};i.unsubscribe=function(a){if(!this._nextFrameSubscribers[a.id]){return false
}this._nextFrameSubscribers[a.id]=null;this._nextFrameSubscriberCount--;if(this._nextFrameSubscriberCount===0){this._cancel()
}return true};i.trigger=function(a,b){var c;for(c=0;c<this._subscriberArrayLength;
c++){if(this._subscribers[this._subscribersOrder[c]]!==null&&this._subscribers[this._subscribersOrder[c]]._didDestroy===false){this._subscribers[this._subscribersOrder[c]].trigger(a,b)
}}};i.destroy=function(){var a=this._cancel();this._subscribers=null;this._subscribersOrder=null;
this._nextFrameSubscribers=null;this._nextFrameSubscribersOrder=null;this._rafData=null;
this._boundOnAnimationFrame=null;this._onExternalAnimationFrame=null;return a};
i.useExternalAnimationFrame=function(b){if(typeof b!=="boolean"){return}var a=this._isUsingExternalAnimationFrame;
if(b&&this._animationFrame){this._cancelAnimationFrame.call(window,this._animationFrame);
this._animationFrame=null}if(this._willRun&&!b&&!this._animationFrame){this._animationFrame=this._requestAnimationFrame.call(window,this._boundOnAnimationFrame)
}this._isUsingExternalAnimationFrame=b;if(b){return this._boundOnExternalAnimationFrame
}return a||false};i._run=function(){if(!this._willRun){this._willRun=true;if(this.lastFrameTime===0){this.lastFrameTime=performance.now()
}this._animationFrameActive=true;if(!this._isUsingExternalAnimationFrame){this._animationFrame=this._requestAnimationFrame.call(window,this._boundOnAnimationFrame)
}return true}};i._cancel=function(){var a=false;if(this._animationFrameActive){if(this._animationFrame){this._cancelAnimationFrame.call(window,this._animationFrame);
this._animationFrame=null}this._animationFrameActive=false;this._willRun=false;
a=true}if(!this._isRunning){this._reset()}return a};i._onSubscribersAnimationFrameStart=function(a){var b;
for(b=0;b<this._subscriberArrayLength;b++){if(this._subscribers[this._subscribersOrder[b]]!==null&&this._subscribers[this._subscribersOrder[b]]._didDestroy===false){this._subscribers[this._subscribersOrder[b]]._onAnimationFrameStart(a)
}}};i._onSubscribersAnimationFrameEnd=function(a){var b;for(b=0;b<this._subscriberArrayLength;
b++){if(this._subscribers[this._subscribersOrder[b]]!==null&&this._subscribers[this._subscribersOrder[b]]._didDestroy===false){this._subscribers[this._subscribersOrder[b]]._onAnimationFrameEnd(a)
}}};i._onAnimationFrame=function(a){this._subscribers=this._nextFrameSubscribers;
this._subscribersOrder=this._nextFrameSubscribersOrder;this._subscriberArrayLength=this._nextFrameSubscriberArrayLength;
this._subscriberCount=this._nextFrameSubscriberCount;this._nextFrameSubscribers={};
this._nextFrameSubscribersOrder=[];this._nextFrameSubscriberArrayLength=0;this._nextFrameSubscriberCount=0;
this._isRunning=true;this._willRun=false;this._didRequestNextRAF=false;this._rafData.delta=a-this.lastFrameTime;
this.lastFrameTime=a;this._rafData.fps=0;if(this._rafData.delta>=1000){this._rafData.delta=0
}if(this._rafData.delta!==0){this._rafData.fps=1000/this._rafData.delta}this._rafData.time=a;
this._rafData.naturalFps=this._rafData.fps;this._rafData.timeNow=Date.now();this._onSubscribersAnimationFrameStart(this._rafData);
this.trigger("update",this._rafData);this.trigger("external",this._rafData);this.trigger("draw",this._rafData);
this._onSubscribersAnimationFrameEnd(this._rafData);if(!this._willRun){this._reset()
}};i._onExternalAnimationFrame=function(a){if(!this._isUsingExternalAnimationFrame){return
}this._onAnimationFrame(a)};i._reset=function(){this._rafData={time:0,delta:0,fps:0,naturalFps:0,timeNow:0};
this._subscribers={};this._subscribersOrder=[];this._subscriberArrayLength=0;this._subscriberCount=0;
this._nextFrameSubscribers={};this._nextFrameSubscribersOrder=[];this._nextFrameSubscriberArrayLength=0;
this._nextFrameSubscriberCount=0;this._didEmitFrameData=false;this._animationFrame=null;
this._animationFrameActive=false;this._isRunning=false;this._shouldReset=false;
this.lastFrameTime=0};j.exports=k},{"@marcom/ac-polyfills/performance/now":undefined}],214:[function(o,l,i){var j=o("@marcom/ac-shared-instance").SharedInstance;
var k="ac-raf-executor:sharedRAFExecutorInstance",m="2.0.1";var n=o("./RAFExecutor");
l.exports=j.share(k,m,n)},{"./RAFExecutor":213,"@marcom/ac-shared-instance":215}],215:[function(d,g,f){g.exports={SharedInstance:d("./ac-shared-instance/SharedInstance")}
},{"./ac-shared-instance/SharedInstance":216}],216:[function(p,m,q){var l=window,n="AC",k="SharedInstance",o=l[n];
var j=(function(){var a={};return{get:function(c,d){var b=null;if(a[c]&&a[c][d]){b=a[c][d]
}return b},set:function(b,d,c){if(!a[b]){a[b]={}}if(typeof c==="function"){a[b][d]=new c()
}else{a[b][d]=c}return a[b][d]},share:function(b,d,c){var f=this.get(b,d);if(!f){f=this.set(b,d,c)
}return f},remove:function(c,d){var b=typeof d;if(b==="string"||b==="number"){if(!a[c]||!a[c][d]){return
}a[c][d]=null;return}if(a[c]){a[c]=null}}}}());if(!o){o=l[n]={}}if(!o[k]){o[k]=j
}m.exports=o[k]},{}],217:[function(d,g,f){g.exports={Transform:d("./ac-transform/Transform")}
},{"./ac-transform/Transform":218}],218:[function(ae,al,L){var af=ae("./gl-matrix/mat4");
var an=ae("./gl-matrix/vec3");var ao=ae("./gl-matrix/vec4");var ak=Math.PI/180;
var am=180/Math.PI;var Q=0,J=0,U=1,K=1,Y=2,I=3;var ag=4,M=4,ah=5,O=5,ai=6,aj=7;
var S=8,X=9,ab=10,ac=11;var N=12,P=12,R=13,T=13,W=14,aa=15;function Z(){this.m=af.create()
}var V=Z.prototype;V.rotateX=function(a){var b=ak*a;af.rotateX(this.m,this.m,b);
return this};V.rotateY=function(a){var b=ak*a;af.rotateY(this.m,this.m,b);return this
};V.rotateZ=function(a){var b=ak*a;af.rotateZ(this.m,this.m,b);return this};V.rotate=V.rotateZ;
V.rotate3d=function(c,f,a,b){if(f===null||f===undefined){f=c}if(a===null||f===undefined){a=c
}var d=ak*b;af.rotate(this.m,this.m,d,[c,f,a]);return this};V.rotateAxisAngle=V.rotate3d;
V.scale=function(a,b){b=b||a;af.scale(this.m,this.m,[a,b,1]);return this};V.scaleX=function(a){af.scale(this.m,this.m,[a,1,1]);
return this};V.scaleY=function(a){af.scale(this.m,this.m,[1,a,1]);return this};
V.scaleZ=function(a){af.scale(this.m,this.m,[1,1,a]);return this};V.scale3d=function(a,b,c){af.scale(this.m,this.m,[a,b,c]);
return this};V.skew=function(a,b){if(b===null||b===undefined){return this.skewX(a)
}a=ak*a;b=ak*b;var c=af.create();c[M]=Math.tan(a);c[K]=Math.tan(b);af.multiply(this.m,this.m,c);
return this};V.skewX=function(a){a=ak*a;var b=af.create();b[M]=Math.tan(a);af.multiply(this.m,this.m,b);
return this};V.skewY=function(a){a=ak*a;var b=af.create();b[K]=Math.tan(a);af.multiply(this.m,this.m,b);
return this};V.translate=function(a,b){b=b||0;af.translate(this.m,this.m,[a,b,0]);
return this};V.translate3d=function(b,c,a){af.translate(this.m,this.m,[b,c,a]);
return this};V.translateX=function(a){af.translate(this.m,this.m,[a,0,0]);return this
};V.translateY=function(a){af.translate(this.m,this.m,[0,a,0]);return this};V.translateZ=function(a){af.translate(this.m,this.m,[0,0,a]);
return this};V.perspective=function(a){var b=af.create();if(a!==0){b[ac]=-1/a}af.multiply(this.m,this.m,b)
};V.inverse=function(){var a=this.clone();a.m=af.invert(a.m,this.m);return a};V.reset=function(){af.identity(this.m);
return this};V.getTranslateXY=function(){var a=this.m;if(this.isAffine()){return[a[P],a[T]]
}return[a[N],a[R]]};V.getTranslateXYZ=function(){var a=this.m;if(this.isAffine()){return[a[P],a[T],0]
}return[a[N],a[R],a[W]]};V.getTranslateX=function(){var a=this.m;if(this.isAffine()){return a[P]
}return a[N]};V.getTranslateY=function(){var a=this.m;if(this.isAffine()){return a[T]
}return a[R]};V.getTranslateZ=function(){var a=this.m;if(this.isAffine()){return 0
}return a[W]};V.clone=function(){var a=new Z();a.m=af.clone(this.m);return a};V.toArray=function(){var a=this.m;
if(this.isAffine()){return[a[J],a[K],a[M],a[O],a[P],a[T]]}return[a[Q],a[U],a[Y],a[I],a[ag],a[ah],a[ai],a[aj],a[S],a[X],a[ab],a[ac],a[N],a[R],a[W],a[aa]]
};V.fromArray=function(a){this.m=Array.prototype.slice.call(a);return this};V.setMatrixValue=function(c){c=String(c).trim();
var d=af.create();if(c==="none"){this.m=d;return this}var a=c.slice(0,c.indexOf("(")),f,b;
if(a==="matrix3d"){f=c.slice(9,-1).split(",");for(b=0;b<f.length;b++){d[b]=parseFloat(f[b])
}}else{if(a==="matrix"){f=c.slice(7,-1).split(",");for(b=f.length;b--;){f[b]=parseFloat(f[b])
}d[Q]=f[0];d[U]=f[1];d[N]=f[4];d[ag]=f[2];d[ah]=f[3];d[R]=f[5]}else{throw new TypeError("Invalid Matrix Value")
}}this.m=d;return this};var ad=function(a){return Math.abs(a)<0.0001};V.decompose=function(h){h=h||false;
var c=af.clone(this.m);var m=an.create();var v=an.create();var p=an.create();var k=ao.create();
var r=ao.create();var q=an.create();for(var a=0;a<16;a++){c[a]/=c[aa]}var f=af.clone(c);
f[I]=0;f[aj]=0;f[ac]=0;f[aa]=1;var y=c[3],o=c[7],l=c[11],t=c[12],u=c[13],w=c[14],x=c[15];
var i=ao.create();if(!ad(c[I])||!ad(c[aj])||!ad(c[ac])){i[0]=c[I];i[1]=c[aj];i[2]=c[ac];
i[3]=c[aa];var b=af.invert(af.create(),f);var j=af.transpose(af.create(),b);k=ao.transformMat4(k,i,j)
}else{k=ao.fromValues(0,0,0,1)}m[0]=t;m[1]=u;m[2]=w;var n=[an.create(),an.create(),an.create()];
n[0][0]=c[0];n[0][1]=c[1];n[0][2]=c[2];n[1][0]=c[4];n[1][1]=c[5];n[1][2]=c[6];n[2][0]=c[8];
n[2][1]=c[9];n[2][2]=c[10];v[0]=an.length(n[0]);an.normalize(n[0],n[0]);p[0]=an.dot(n[0],n[1]);
n[1]=this._combine(n[1],n[0],1,-p[0]);v[1]=an.length(n[1]);an.normalize(n[1],n[1]);
p[0]/=v[1];p[1]=an.dot(n[0],n[2]);n[2]=this._combine(n[2],n[0],1,-p[1]);p[2]=an.dot(n[1],n[2]);
n[2]=this._combine(n[2],n[1],1,-p[2]);v[2]=an.length(n[2]);an.normalize(n[2],n[2]);
p[1]/=v[2];p[2]/=v[2];var d=an.cross(an.create(),n[1],n[2]);if(an.dot(n[0],d)<0){for(a=0;
a<3;a++){v[a]*=-1;n[a][0]*=-1;n[a][1]*=-1;n[a][2]*=-1}}r[0]=0.5*Math.sqrt(Math.max(1+n[0][0]-n[1][1]-n[2][2],0));
r[1]=0.5*Math.sqrt(Math.max(1-n[0][0]+n[1][1]-n[2][2],0));r[2]=0.5*Math.sqrt(Math.max(1-n[0][0]-n[1][1]+n[2][2],0));
r[3]=0.5*Math.sqrt(Math.max(1+n[0][0]+n[1][1]+n[2][2],0));if(n[2][1]>n[1][2]){r[0]=-r[0]
}if(n[0][2]>n[2][0]){r[1]=-r[1]}if(n[1][0]>n[0][1]){r[2]=-r[2]}var s=ao.fromValues(r[0],r[1],r[2],2*Math.acos(r[3]));
var g=this._rotationFromQuat(r);if(h){p[0]=Math.round(p[0]*am*100)/100;p[1]=Math.round(p[1]*am*100)/100;
p[2]=Math.round(p[2]*am*100)/100;g[0]=Math.round(g[0]*am*100)/100;g[1]=Math.round(g[1]*am*100)/100;
g[2]=Math.round(g[2]*am*100)/100;s[3]=Math.round(s[3]*am*100)/100}return{translation:m,scale:v,skew:p,perspective:k,quaternion:r,eulerRotation:g,axisAngle:s}
};V.recompose=function(f,g,b,a,h){f=f||an.create();g=g||an.create();b=b||an.create();
a=a||ao.create();h=h||ao.create();var c=af.fromRotationTranslation(af.create(),h,f);
c[I]=a[0];c[aj]=a[1];c[ac]=a[2];c[aa]=a[3];var d=af.create();if(b[2]!==0){d[X]=b[2];
af.multiply(c,c,d)}if(b[1]!==0){d[X]=0;d[S]=b[1];af.multiply(c,c,d)}if(b[0]){d[S]=0;
d[4]=b[0];af.multiply(c,c,d)}af.scale(c,c,g);this.m=c;return this};V.isAffine=function(){return(this.m[Y]===0&&this.m[I]===0&&this.m[ai]===0&&this.m[aj]===0&&this.m[S]===0&&this.m[X]===0&&this.m[ab]===1&&this.m[ac]===0&&this.m[W]===0&&this.m[aa]===1)
};V.toString=function(){var a=this.m;if(this.isAffine()){return"matrix("+a[J]+", "+a[K]+", "+a[M]+", "+a[O]+", "+a[P]+", "+a[T]+")"
}return"matrix3d("+a[Q]+", "+a[U]+", "+a[Y]+", "+a[I]+", "+a[ag]+", "+a[ah]+", "+a[ai]+", "+a[aj]+", "+a[S]+", "+a[X]+", "+a[ab]+", "+a[ac]+", "+a[N]+", "+a[R]+", "+a[W]+", "+a[aa]+")"
};V.toCSSString=V.toString;V._combine=function(c,f,a,b){var d=an.create();d[0]=(a*c[0])+(b*f[0]);
d[1]=(a*c[1])+(b*f[1]);d[2]=(a*c[2])+(b*f[2]);return d};V._matrix2dToMat4=function(d){var b=af.create();
for(var a=0;a<4;a++){for(var c=0;c<4;c++){b[a*4+c]=d[a][c]}}return b};V._mat4ToMatrix2d=function(a){var d=[];
for(var b=0;b<4;b++){d[b]=[];for(var c=0;c<4;c++){d[b][c]=a[b*4+c]}}return d};V._rotationFromQuat=function(k){var g=k[3]*k[3];
var h=k[0]*k[0];var i=k[1]*k[1];var j=k[2]*k[2];var a=h+i+j+g;var f=k[0]*k[1]+k[2]*k[3];
var b,c,d;if(f>0.499*a){c=2*Math.atan2(k[0],k[3]);d=Math.PI/2;b=0;return an.fromValues(b,c,d)
}if(f<-0.499*a){c=-2*Math.atan2(k[0],k[3]);d=-Math.PI/2;b=0;return an.fromValues(b,c,d)
}c=Math.atan2(2*k[1]*k[3]-2*k[0]*k[2],h-i-j+g);d=Math.asin(2*f/a);b=Math.atan2(2*k[0]*k[3]-2*k[1]*k[2],-h+i-j+g);
return an.fromValues(b,c,d)};al.exports=Z},{"./gl-matrix/mat4":219,"./gl-matrix/vec3":220,"./gl-matrix/vec4":221}],219:[function(i,h,g){var f={create:i("gl-mat4/create"),rotate:i("gl-mat4/rotate"),rotateX:i("gl-mat4/rotateX"),rotateY:i("gl-mat4/rotateY"),rotateZ:i("gl-mat4/rotateZ"),scale:i("gl-mat4/scale"),multiply:i("gl-mat4/multiply"),translate:i("gl-mat4/translate"),invert:i("gl-mat4/invert"),clone:i("gl-mat4/clone"),transpose:i("gl-mat4/transpose"),identity:i("gl-mat4/identity"),fromRotationTranslation:i("gl-mat4/fromRotationTranslation")};
h.exports=f},{"gl-mat4/clone":228,"gl-mat4/create":229,"gl-mat4/fromRotationTranslation":230,"gl-mat4/identity":231,"gl-mat4/invert":232,"gl-mat4/multiply":233,"gl-mat4/rotate":234,"gl-mat4/rotateX":235,"gl-mat4/rotateY":236,"gl-mat4/rotateZ":237,"gl-mat4/scale":238,"gl-mat4/translate":239,"gl-mat4/transpose":240}],220:[function(f,h,g){var i={create:f("gl-vec3/create"),dot:f("gl-vec3/dot"),normalize:f("gl-vec3/normalize"),length:f("gl-vec3/length"),cross:f("gl-vec3/cross"),fromValues:f("gl-vec3/fromValues")};
h.exports=i},{"gl-vec3/create":241,"gl-vec3/cross":242,"gl-vec3/dot":243,"gl-vec3/fromValues":244,"gl-vec3/length":245,"gl-vec3/normalize":246}],221:[function(i,h,g){var f={create:i("gl-vec4/create"),transformMat4:i("gl-vec4/transformMat4"),fromValues:i("gl-vec4/fromValues")};
h.exports=f},{"gl-vec4/create":247,"gl-vec4/fromValues":248,"gl-vec4/transformMat4":249}],222:[function(f,i,g){var h={ua:window.navigator.userAgent,platform:window.navigator.platform,vendor:window.navigator.vendor};
i.exports=f("./parseUserAgent")(h)},{"./parseUserAgent":225}],223:[function(d,g,f){g.exports={browser:{safari:false,chrome:false,firefox:false,ie:false,opera:false,android:false,edge:false,version:{name:"",major:0,minor:0,patch:0,documentMode:false}},os:{osx:false,ios:false,android:false,windows:false,linux:false,fireos:false,chromeos:false,version:{name:"",major:0,minor:0,patch:0}}}
},{}],224:[function(d,g,f){g.exports={browser:[{name:"edge",userAgent:"Edge",version:["rv","Edge"],test:function(a){return(a.ua.indexOf("Edge")>-1||a.ua==="Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
}},{name:"chrome",userAgent:"Chrome"},{name:"firefox",test:function(a){return(a.ua.indexOf("Firefox")>-1&&a.ua.indexOf("Opera")===-1)
},version:"Firefox"},{name:"android",userAgent:"Android"},{name:"safari",test:function(a){return(a.ua.indexOf("Safari")>-1&&a.vendor.indexOf("Apple")>-1)
},version:"Version"},{name:"ie",test:function(a){return(a.ua.indexOf("IE")>-1||a.ua.indexOf("Trident")>-1)
},version:["MSIE","rv"],parseDocumentMode:function(){var a=false;if(document.documentMode){a=parseInt(document.documentMode,10)
}return a}},{name:"opera",userAgent:"Opera",version:["Version","Opera"]}],os:[{name:"windows",test:function(a){return(a.platform.indexOf("Win")>-1)
},version:"Windows NT"},{name:"osx",userAgent:"Mac",test:function(a){return(a.platform.indexOf("Mac")>-1)
}},{name:"ios",test:function(a){return(a.ua.indexOf("iPhone")>-1||a.ua.indexOf("iPad")>-1)
},version:["iPhone OS","CPU OS"]},{name:"linux",userAgent:"Linux",test:function(a){return(a.platform.indexOf("Linux")>-1&&a.ua.indexOf("Android")===-1)
}},{name:"fireos",test:function(a){return(a.ua.indexOf("Firefox")>-1&&a.ua.indexOf("Mobile")>-1)
},version:"rv"},{name:"android",userAgent:"Android"},{name:"chromeos",userAgent:"CrOS"}]}
},{}],225:[function(r,s,p){var q=r("./defaults");var m=r("./dictionary");function n(a){return new RegExp(a+"[a-zA-Z\\s/:]+([0-9_.]+)","i")
}function o(g,a){if(typeof g.parseVersion==="function"){return g.parseVersion(a)
}else{var d=g.version||g.userAgent;if(typeof d==="string"){d=[d]}var f=d.length;
var c;for(var b=0;b<f;b++){c=a.match(n(d[b]));if(c&&c.length>1){return c[1].replace(/_/g,".")
}}}}function k(a,d,g){var h=a.length;var f;var c;for(var i=0;i<h;i++){if(typeof a[i].test==="function"){if(a[i].test(g)===true){f=a[i].name
}}else{if(g.ua.indexOf(a[i].userAgent)>-1){f=a[i].name}}if(f){d[f]=true;c=o(a[i],g.ua);
if(typeof c==="string"){var b=c.split(".");d.version.name=c;if(b&&b.length>0){d.version.major=parseInt(b[0]||0);
d.version.minor=parseInt(b[1]||0);d.version.patch=parseInt(b[2]||0)}}else{if(f==="edge"){d.version.name="12.0.0";
d.version.major="12";d.version.minor="0";d.version.patch="0"}}if(typeof a[i].parseDocumentMode==="function"){d.version.documentMode=a[i].parseDocumentMode()
}return d}}return d}function l(a){var b={};b.browser=k(m.browser,q.browser,a);b.os=k(m.os,q.os,a);
return b}s.exports=l},{"./defaults":223,"./dictionary":224}],226:[function(v,w,s){v("@marcom/ac-polyfills/Function/prototype.bind");
v("@marcom/ac-polyfills/Object/keys");v("@marcom/ac-polyfills/Object/create");var m=v("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var p=v("@marcom/ac-dom-events/utils/addEventListener");var q=v("@marcom/ac-feature/mediaQueriesAvailable");
var u="viewport-emitter";var o="::before";var t="only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)";
function n(a){m.call(this);this._initializeElement(a);if(q()){this._updateViewport=this._updateViewport.bind(this);
p(window,"resize",this._updateViewport);p(window,"orientationchange",this._updateViewport);
this._retinaQuery=window.matchMedia(t);this._updateRetina();if(this._retinaQuery.addListener){this._updateRetina=this._updateRetina.bind(this);
this._retinaQuery.addListener(this._updateRetina)}}this._updateViewport()}var r=n.prototype=Object.create(m.prototype);
r.viewport=false;r.retina=false;r._initializeElement=function(b){var a;b=b||u;a=document.getElementById(b);
if(!a){a=document.createElement("div");a.id=b;a=document.body.appendChild(a)}this._el=a
};r._getElementContent=function(){var a;if("currentStyle" in this._el){a=this._el.currentStyle["x-content"]
}else{this._invalidateStyles();a=window.getComputedStyle(this._el,o).content}if(a){a=a.replace(/["']/g,"")
}if(a){return a}return false};r._updateViewport=function(){var a=this.viewport;
var c;var b;this.viewport=this._getElementContent();if(this.viewport){this.viewport=this.viewport.split(":").pop()
}if(a&&this.viewport!==a){b={from:a,to:this.viewport};this.trigger("change",b);
this.trigger("from:"+a,b);this.trigger("to:"+this.viewport,b)}};r._updateRetina=function(a){var b=this.retina;
this.retina=this._retinaQuery.matches;if(b!==this.retina){this.trigger("retinachange",{from:b,to:this.retina})
}};r._invalidateStyles=function(){document.documentElement.clientWidth;this._el.innerHTML=(this._el.innerHTML===" ")?" ":" ";
document.documentElement.clientWidth};w.exports=n},{"@marcom/ac-dom-events/utils/addEventListener":49,"@marcom/ac-event-emitter-micro":118,"@marcom/ac-feature/mediaQueriesAvailable":124,"@marcom/ac-polyfills/Function/prototype.bind":undefined,"@marcom/ac-polyfills/Object/create":undefined,"@marcom/ac-polyfills/Object/keys":undefined}],227:[function(i,h,f){var g=i("./ViewportEmitter");
h.exports=new g()},{"./ViewportEmitter":226}],228:[function(f,i,g){i.exports=h;
function h(b){var a=new Float32Array(16);a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];
a[4]=b[4];a[5]=b[5];a[6]=b[6];a[7]=b[7];a[8]=b[8];a[9]=b[9];a[10]=b[10];a[11]=b[11];
a[12]=b[12];a[13]=b[13];a[14]=b[14];a[15]=b[15];return a}},{}],229:[function(f,h,g){h.exports=i;
function i(){var a=new Float32Array(16);a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;
a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a
}},{}],230:[function(f,i,g){i.exports=h;function h(b,v,z){var G=v[0],H=v[1],I=v[2],F=v[3],a=G+G,M=H+H,E=I+I,J=G*a,K=G*M,L=G*E,c=H*M,y=H*E,q=I*E,d=F*a,w=F*M,x=F*E;
b[0]=1-(c+q);b[1]=K+x;b[2]=L-w;b[3]=0;b[4]=K-x;b[5]=1-(J+q);b[6]=y+d;b[7]=0;b[8]=L+w;
b[9]=y-d;b[10]=1-(J+c);b[11]=0;b[12]=z[0];b[13]=z[1];b[14]=z[2];b[15]=1;return b
}},{}],231:[function(i,h,f){h.exports=g;function g(a){a[0]=1;a[1]=0;a[2]=0;a[3]=0;
a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;
a[15]=1;return a}},{}],232:[function(f,i,g){i.exports=h;function h(c,U){var L=U[0],P=U[1],S=U[2],Y=U[3],ag=U[4],ah=U[5],ai=U[6],aj=U[7],K=U[8],M=U[9],O=U[10],Q=U[11],b=U[12],d=U[13],N=U[14],W=U[15],R=L*ah-P*ag,T=L*ai-S*ag,V=L*aj-Y*ag,X=P*ai-S*ah,aa=P*aj-Y*ah,ab=S*aj-Y*ai,ac=K*d-M*b,ad=K*N-O*b,ae=K*W-Q*b,af=M*N-O*d,Z=M*W-Q*d,a=O*W-Q*N,ak=R*a-T*Z+V*af+X*ae-aa*ad+ab*ac;
if(!ak){return null}ak=1/ak;c[0]=(ah*a-ai*Z+aj*af)*ak;c[1]=(S*Z-P*a-Y*af)*ak;c[2]=(d*ab-N*aa+W*X)*ak;
c[3]=(O*aa-M*ab-Q*X)*ak;c[4]=(ai*ae-ag*a-aj*ad)*ak;c[5]=(L*a-S*ae+Y*ad)*ak;c[6]=(N*V-b*ab-W*T)*ak;
c[7]=(K*ab-O*V+Q*T)*ak;c[8]=(ag*Z-ah*ae+aj*ac)*ak;c[9]=(P*ae-L*Z-Y*ac)*ak;c[10]=(b*aa-d*V+W*R)*ak;
c[11]=(M*V-K*aa-Q*R)*ak;c[12]=(ah*ad-ag*af-ai*ac)*ak;c[13]=(L*af-P*ad+S*ac)*ak;
c[14]=(d*T-b*X-N*R)*ak;c[15]=(K*X-M*T+O*R)*ak;return c}},{}],233:[function(i,h,f){h.exports=g;
function g(G,C,F){var a=C[0],b=C[1],d=C[2],E=C[3],O=C[4],Q=C[5],S=C[6],U=C[7],I=C[8],K=C[9],L=C[10],M=C[11],H=C[12],J=C[13],c=C[14],D=C[15];
var N=F[0],P=F[1],R=F[2],T=F[3];G[0]=N*a+P*O+R*I+T*H;G[1]=N*b+P*Q+R*K+T*J;G[2]=N*d+P*S+R*L+T*c;
G[3]=N*E+P*U+R*M+T*D;N=F[4];P=F[5];R=F[6];T=F[7];G[4]=N*a+P*O+R*I+T*H;G[5]=N*b+P*Q+R*K+T*J;
G[6]=N*d+P*S+R*L+T*c;G[7]=N*E+P*U+R*M+T*D;N=F[8];P=F[9];R=F[10];T=F[11];G[8]=N*a+P*O+R*I+T*H;
G[9]=N*b+P*Q+R*K+T*J;G[10]=N*d+P*S+R*L+T*c;G[11]=N*E+P*U+R*M+T*D;N=F[12];P=F[13];
R=F[14];T=F[15];G[12]=N*a+P*O+R*I+T*H;G[13]=N*b+P*Q+R*K+T*J;G[14]=N*d+P*S+R*L+T*c;
G[15]=N*E+P*U+R*M+T*D;return G}},{}],234:[function(i,h,g){h.exports=f;function f(V,s,c,am){var ac=am[0],ad=am[1],ae=am[2],U=Math.sqrt(ac*ac+ad*ad+ae*ae),Q,x,S,a,b,d,t,af,ag,ah,ai,W,Y,aa,ab,T,X,Z,y,z,R,aj,ak,al;
if(Math.abs(U)<0.000001){return null}U=1/U;ac*=U;ad*=U;ae*=U;Q=Math.sin(c);x=Math.cos(c);
S=1-x;a=s[0];b=s[1];d=s[2];t=s[3];af=s[4];ag=s[5];ah=s[6];ai=s[7];W=s[8];Y=s[9];
aa=s[10];ab=s[11];T=ac*ac*S+x;X=ad*ac*S+ae*Q;Z=ae*ac*S-ad*Q;y=ac*ad*S-ae*Q;z=ad*ad*S+x;
R=ae*ad*S+ac*Q;aj=ac*ae*S+ad*Q;ak=ad*ae*S-ac*Q;al=ae*ae*S+x;V[0]=a*T+af*X+W*Z;V[1]=b*T+ag*X+Y*Z;
V[2]=d*T+ah*X+aa*Z;V[3]=t*T+ai*X+ab*Z;V[4]=a*y+af*z+W*R;V[5]=b*y+ag*z+Y*R;V[6]=d*y+ah*z+aa*R;
V[7]=t*y+ai*z+ab*R;V[8]=a*aj+af*ak+W*al;V[9]=b*aj+ag*ak+Y*al;V[10]=d*aj+ah*ak+aa*al;
V[11]=t*aj+ai*ak+ab*al;if(s!==V){V[12]=s[12];V[13]=s[13];V[14]=s[14];V[15]=s[15]
}return V}},{}],235:[function(i,h,g){h.exports=f;function f(A,t,u){var a=Math.sin(u),v=Math.cos(u),b=t[4],c=t[5],d=t[6],s=t[7],w=t[8],x=t[9],y=t[10],z=t[11];
if(t!==A){A[0]=t[0];A[1]=t[1];A[2]=t[2];A[3]=t[3];A[12]=t[12];A[13]=t[13];A[14]=t[14];
A[15]=t[15]}A[4]=b*v+w*a;A[5]=c*v+x*a;A[6]=d*v+y*a;A[7]=s*v+z*a;A[8]=w*v-b*a;A[9]=x*v-c*a;
A[10]=y*v-d*a;A[11]=z*v-s*a;return A}},{}],236:[function(i,h,f){h.exports=g;function g(w,b,c){var a=Math.sin(c),d=Math.cos(c),x=b[0],y=b[1],z=b[2],A=b[3],s=b[8],t=b[9],u=b[10],v=b[11];
if(b!==w){w[4]=b[4];w[5]=b[5];w[6]=b[6];w[7]=b[7];w[12]=b[12];w[13]=b[13];w[14]=b[14];
w[15]=b[15]}w[0]=x*d-s*a;w[1]=y*d-t*a;w[2]=z*d-u*a;w[3]=A*d-v*a;w[8]=x*a+s*d;w[9]=y*a+t*d;
w[10]=z*a+u*d;w[11]=A*a+v*d;return w}},{}],237:[function(i,h,f){h.exports=g;function g(w,t,u){var a=Math.sin(u),v=Math.cos(u),x=t[0],y=t[1],z=t[2],A=t[3],b=t[4],c=t[5],d=t[6],s=t[7];
if(t!==w){w[8]=t[8];w[9]=t[9];w[10]=t[10];w[11]=t[11];w[12]=t[12];w[13]=t[13];w[14]=t[14];
w[15]=t[15]}w[0]=x*v+b*a;w[1]=y*v+c*a;w[2]=z*v+d*a;w[3]=A*v+s*a;w[4]=b*v-x*a;w[5]=c*v-y*a;
w[6]=d*v-z*a;w[7]=s*v-A*a;return w}},{}],238:[function(f,i,g){i.exports=h;function h(c,l,d){var m=d[0],a=d[1],b=d[2];
c[0]=l[0]*m;c[1]=l[1]*m;c[2]=l[2]*m;c[3]=l[3]*m;c[4]=l[4]*a;c[5]=l[5]*a;c[6]=l[6]*a;
c[7]=l[7]*a;c[8]=l[8]*b;c[9]=l[9]*b;c[10]=l[10]*b;c[11]=l[11]*b;c[12]=l[12];c[13]=l[13];
c[14]=l[14];c[15]=l[15];return c}},{}],239:[function(f,i,g){i.exports=h;function h(v,c,D){var E=D[0],F=D[1],G=D[2],y,a,b,d,H,I,J,K,x,z,B,C;
if(c===v){v[12]=c[0]*E+c[4]*F+c[8]*G+c[12];v[13]=c[1]*E+c[5]*F+c[9]*G+c[13];v[14]=c[2]*E+c[6]*F+c[10]*G+c[14];
v[15]=c[3]*E+c[7]*F+c[11]*G+c[15]}else{y=c[0];a=c[1];b=c[2];d=c[3];H=c[4];I=c[5];
J=c[6];K=c[7];x=c[8];z=c[9];B=c[10];C=c[11];v[0]=y;v[1]=a;v[2]=b;v[3]=d;v[4]=H;
v[5]=I;v[6]=J;v[7]=K;v[8]=x;v[9]=z;v[10]=B;v[11]=C;v[12]=y*E+H*F+x*G+c[12];v[13]=a*E+I*F+z*G+c[13];
v[14]=b*E+J*F+B*G+c[14];v[15]=d*E+K*F+C*G+c[15]}return v}},{}],240:[function(f,i,g){i.exports=h;
function h(n,o){if(n===o){var a=o[1],c=o[2],d=o[3],q=o[6],b=o[7],p=o[11];n[1]=o[4];
n[2]=o[8];n[3]=o[12];n[4]=a;n[6]=o[9];n[7]=o[13];n[8]=c;n[9]=q;n[11]=o[14];n[12]=d;
n[13]=b;n[14]=p}else{n[0]=o[0];n[1]=o[4];n[2]=o[8];n[3]=o[12];n[4]=o[1];n[5]=o[5];
n[6]=o[9];n[7]=o[13];n[8]=o[2];n[9]=o[6];n[10]=o[10];n[11]=o[14];n[12]=o[3];n[13]=o[7];
n[14]=o[11];n[15]=o[15]}return n}},{}],241:[function(f,h,g){h.exports=i;function i(){var a=new Float32Array(3);
a[0]=0;a[1]=0;a[2]=0;return a}},{}],242:[function(f,i,g){i.exports=h;function h(r,c,d){var s=c[0],a=c[1],b=c[2],o=d[0],p=d[1],q=d[2];
r[0]=a*q-b*p;r[1]=b*o-s*q;r[2]=s*p-a*o;return r}},{}],243:[function(i,h,f){h.exports=g;
function g(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]}},{}],244:[function(f,i,g){i.exports=h;
function h(d,a,b){var c=new Float32Array(3);c[0]=d;c[1]=a;c[2]=b;return c}},{}],245:[function(f,i,g){i.exports=h;
function h(c){var d=c[0],a=c[1],b=c[2];return Math.sqrt(d*d+a*a+b*b)}},{}],246:[function(i,h,f){h.exports=g;
function g(c,d){var l=d[0],a=d[1],b=d[2];var m=l*l+a*a+b*b;if(m>0){m=1/Math.sqrt(m);
c[0]=d[0]*m;c[1]=d[1]*m;c[2]=d[2]*m}return c}},{}],247:[function(f,h,g){h.exports=i;
function i(){var a=new Float32Array(4);a[0]=0;a[1]=0;a[2]=0;a[3]=0;return a}},{}],248:[function(f,i,g){i.exports=h;
function h(k,a,b,d){var c=new Float32Array(4);c[0]=k;c[1]=a;c[2]=b;c[3]=d;return c
}},{}],249:[function(f,h,g){h.exports=i;function i(c,d,n){var o=d[0],a=d[1],b=d[2],m=d[3];
c[0]=n[0]*o+n[4]*a+n[8]*b+n[12]*m;c[1]=n[1]*o+n[5]*a+n[9]*b+n[13]*m;c[2]=n[2]*o+n[6]*a+n[10]*b+n[14]*m;
c[3]=n[3]*o+n[7]*a+n[11]*b+n[15]*m;return c}},{}],250:[function(d,g,f){(function(a){
/*!
 * VERSION: 0.6.0
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){b._gsDefine.plugin({propName:"attr",API:2,version:"0.6.0",init:function(c,n,o,p){var m,q;
if(typeof(c.setAttribute)!=="function"){return false}for(m in n){q=n[m];if(typeof(q)==="function"){q=q(p,c)
}this._addTween(c,"setAttribute",c.getAttribute(m)+"",q+"",m,false,m);this._overwriteProps.push(m)
}return true}})});if(b._gsDefine){b._gsQueue.pop()()}(function(i){var c=function(){return(b.GreenSockGlobals||b)[i]
};if(typeof(define)==="function"&&define.amd){define(["./TweenLite"],c)}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");
g.exports=c()}}}("AttrPlugin"))}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./TweenLite.js":265}],251:[function(d,g,f){(function(a){
/*!
 * VERSION: 1.3.7
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){var I=180/Math.PI,M=[],p=[],y=[],K={},A=b._gsDefine.globals,C=function(k,i,h,j){if(h===j){h=j-(j-i)/1000000
}if(k===i){i=k+(h-k)/1000000}this.a=k;this.b=i;this.c=h;this.d=j;this.da=j-k;this.ca=h-k;
this.ba=i-k},E=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",B=function(q,r,s,u){var h={a:q},i={},k={},l={c:u},t=(q+r)/2,m=(r+s)/2,o=(s+u)/2,n=(t+m)/2,j=(m+o)/2,v=(j-n)/8;
h.b=t+(q-t)/4;i.b=n+v;h.c=i.a=(h.b+i.b)/2;i.c=k.a=(n+j)/2;k.b=j-v;l.b=o+(u-o)/4;
k.c=l.a=(k.b+l.b)/2;return[h,i,k,l]},F=function(h,v,u,S,T){var r=h.length-1,t=0,i=h[0].a,m,U,V,s,k,q,W,l,j,w,n,o,x;
for(m=0;m<r;m++){k=h[t];U=k.a;V=k.d;s=h[t+1].d;if(T){n=M[m];o=p[m];x=((o+n)*v*0.25)/(S?0.5:y[m]||0.5);
q=V-(V-U)*(S?v*0.5:(n!==0?x/n:0));W=V+(s-V)*(S?v*0.5:(o!==0?x/o:0));l=V-(q+(((W-q)*((n*3/(n+o))+0.5)/4)||0))
}else{q=V-(V-U)*v*0.5;W=V+(s-V)*v*0.5;l=V-(q+W)/2}q+=l;W+=l;k.c=j=q;if(m!==0){k.b=i
}else{k.b=i=k.a+(k.c-k.a)*0.6}k.da=V-U;k.ca=j-U;k.ba=i-U;if(u){w=B(U,i,j,V);h.splice(t,1,w[0],w[1],w[2],w[3]);
t+=4}else{t++}i=W}k=h[t];k.b=i;k.c=i+(k.d-i)*0.4;k.da=k.d-k.a;k.ca=k.c-k.a;k.ba=i-k.a;
if(u){w=B(k.a,i,k.c,k.d);h.splice(t,1,w[0],w[1],w[2],w[3])}},J=function(q,m,l,n){var h=[],k,i,o,r,s,j;
if(n){q=[n].concat(q);i=q.length;while(--i>-1){if(typeof((j=q[i][m]))==="string"){if(j.charAt(1)==="="){q[i][m]=n[m]+Number(j.charAt(0)+j.substr(2))
}}}}k=q.length-2;if(k<0){h[0]=new C(q[0][m],0,0,q[0][m]);return h}for(i=0;i<k;i++){o=q[i][m];
r=q[i+1][m];h[i]=new C(o,0,0,r);if(l){s=q[i+2][m];M[i]=(M[i]||0)+(r-o)*(r-o);p[i]=(p[i]||0)+(s-r)*(s-r)
}}h[i]=new C(q[i][m],0,0,q[i+1][m]);return h},c=function(m,q,w,P,j,l){var u={},s=[],t=l||m[0],v,k,o,x,r,h,i,n;
j=(typeof(j)==="string")?","+j+",":E;if(q==null){q=1}for(k in m[0]){s.push(k)}if(m.length>1){n=m[m.length-1];
i=true;v=s.length;while(--v>-1){k=s[v];if(Math.abs(t[k]-n[k])>0.05){i=false;break
}}if(i){m=m.concat();if(l){m.unshift(l)}m.push(m[1]);l=m[m.length-3]}}M.length=p.length=y.length=0;
v=s.length;while(--v>-1){k=s[v];K[k]=(j.indexOf(","+k+",")!==-1);u[k]=J(m,k,K[k],l)
}v=M.length;while(--v>-1){M[v]=Math.sqrt(M[v]);p[v]=Math.sqrt(p[v])}if(!P){v=s.length;
while(--v>-1){if(K[k]){o=u[s[v]];h=o.length-1;for(x=0;x<h;x++){r=(o[x+1].da/p[x]+o[x].da/M[x])||0;
y[x]=(y[x]||0)+r*r}}}v=y.length;while(--v>-1){y[v]=Math.sqrt(y[v])}}v=s.length;
x=w?4:1;while(--v>-1){k=s[v];o=u[k];F(o,q,w,P,K[k]);if(i){o.splice(0,x);o.splice(o.length-x,x)
}}return u},L=function(q,Q,h){Q=Q||"soft";var w={},x=(Q==="cubic")?3:2,o=(Q==="soft"),R=[],i,j,k,m,n,r,t,u,v,s,l;
if(o&&h){q=[h].concat(q)}if(q==null||q.length<x+1){throw"invalid Bezier data"}for(v in q[0]){R.push(v)
}r=R.length;while(--r>-1){v=R[r];w[v]=n=[];s=0;u=q.length;for(t=0;t<u;t++){i=(h==null)?q[t][v]:(typeof((l=q[t][v]))==="string"&&l.charAt(1)==="=")?h[v]+Number(l.charAt(0)+l.substr(2)):Number(l);
if(o){if(t>1){if(t<u-1){n[s++]=(i+n[s-2])/2}}}n[s++]=i}u=s-x+1;s=0;for(t=0;t<u;
t+=x){i=n[t];j=n[t+1];k=n[t+2];m=(x===2)?0:n[t+3];n[s++]=l=(x===3)?new C(i,j,k,m):new C(i,(2*j+i)/3,(2*j+k)/3,k)
}n.length=s}return w},H=function(r,s,j){var k=1/j,h=r.length,u,q,l,m,i,t,o,w,x,n,v;
while(--h>-1){n=r[h];l=n.a;m=n.d-l;i=n.c-l;t=n.b-l;u=q=0;for(w=1;w<=j;w++){o=k*w;
x=1-o;u=q-(q=(o*o*m+3*x*(o*i+x*t))*o);v=h*j+w-1;s[v]=(s[v]||0)+u*u}}},z=function(h,j){j=j>>0||6;
var n=[],k=[],q=0,o=0,t=j-1,u=[],r=[],m,i,l,s;for(m in h){H(h[m],n,j)}l=n.length;
for(i=0;i<l;i++){q+=Math.sqrt(n[i]);s=i%j;r[s]=q;if(s===t){o+=q;s=(i/j)>>0;u[s]=r;
k[s]=o;q=0;r=[]}}return{length:o,lengths:k,segments:u}},G=b._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.7",API:2,global:true,init:function(t,s,o){this._target=t;
if(s instanceof Array){s={values:s}}this._func={};this._mod={};this._props=[];this._timeRes=(s.timeResolution==null)?6:parseInt(s.timeResolution,10);
var q=s.values||[],u={},k=q[0],j=s.autoRotate||o.vars.orientToBezier,l,r,h,i,n;
this._autoRotate=j?(j instanceof Array)?j:[["x","y","rotation",((j===true)?0:Number(j)||0)]]:null;
for(l in k){this._props.push(l)}h=this._props.length;while(--h>-1){l=this._props[h];
this._overwriteProps.push(l);r=this._func[l]=(typeof(t[l])==="function");u[l]=(!r)?parseFloat(t[l]):t[((l.indexOf("set")||typeof(t["get"+l.substr(3)])!=="function")?l:"get"+l.substr(3))]();
if(!n){if(u[l]!==q[0][l]){n=u}}}this._beziers=(s.type!=="cubic"&&s.type!=="quadratic"&&s.type!=="soft")?c(q,isNaN(s.curviness)?1:s.curviness,false,(s.type==="thruBasic"),s.correlate,n):L(q,s.type,u);
this._segCount=this._beziers[l].length;if(this._timeRes){var m=z(this._beziers,this._timeRes);
this._length=m.length;this._lengths=m.lengths;this._segments=m.segments;this._l1=this._li=this._s1=this._si=0;
this._l2=this._lengths[0];this._curSeg=this._segments[0];this._s2=this._curSeg[0];
this._prec=1/this._curSeg.length}if((j=this._autoRotate)){this._initialRotations=[];
if(!(j[0] instanceof Array)){this._autoRotate=j=[j]}h=j.length;while(--h>-1){for(i=0;
i<3;i++){l=j[h][i];this._func[l]=(typeof(t[l])==="function")?t[((l.indexOf("set")||typeof(t["get"+l.substr(3)])!=="function")?l:"get"+l.substr(3))]:false
}l=j[h][2];this._initialRotations[h]=(this._func[l]?this._func[l].call(this._target):this._target[l])||0;
this._overwriteProps.push(l)}}this._startRatio=o.vars.runBackwards?1:0;return true
},set:function(w){var o=this._segCount,X=this._func,i=this._target,v=(w!==this._startRatio),x,t,m,q,j,u,h,n,Y,V;
if(!this._timeRes){x=(w<0)?0:(w>=1)?o-1:(o*w)>>0;u=(w-(x*(1/o)))*o}else{Y=this._lengths;
V=this._curSeg;w*=this._length;m=this._li;if(w>this._l2&&m<o-1){n=o-1;while(m<n&&(this._l2=Y[++m])<=w){}this._l1=Y[m-1];
this._li=m;this._curSeg=V=this._segments[m];this._s2=V[(this._s1=this._si=0)]}else{if(w<this._l1&&m>0){while(m>0&&(this._l1=Y[--m])>=w){}if(m===0&&w<this._l1){this._l1=0
}else{m++}this._l2=Y[m];this._li=m;this._curSeg=V=this._segments[m];this._s1=V[(this._si=V.length-1)-1]||0;
this._s2=V[this._si]}}x=m;w-=this._l1;m=this._si;if(w>this._s2&&m<V.length-1){n=V.length-1;
while(m<n&&(this._s2=V[++m])<=w){}this._s1=V[m-1];this._si=m}else{if(w<this._s1&&m>0){while(m>0&&(this._s1=V[--m])>=w){}if(m===0&&w<this._s1){this._s1=0
}else{m++}this._s2=V[m];this._si=m}}u=((m+(w-this._s1)/(this._s2-this._s1))*this._prec)||0
}t=1-u;m=this._props.length;while(--m>-1){q=this._props[m];j=this._beziers[q][x];
h=(u*u*j.da+3*t*(u*j.ca+t*j.ba))*u+j.a;if(this._mod[q]){h=this._mod[q](h,i)}if(X[q]){i[q](h)
}else{i[q]=h}}if(this._autoRotate){var r=this._autoRotate,W,k,Z,l,aa,s,ab;m=r.length;
while(--m>-1){q=r[m][2];s=r[m][3]||0;ab=(r[m][4]===true)?1:I;j=this._beziers[r[m][0]];
W=this._beziers[r[m][1]];if(j&&W){j=j[x];W=W[x];k=j.a+(j.b-j.a)*u;l=j.b+(j.c-j.b)*u;
k+=(l-k)*u;l+=((j.c+(j.d-j.c)*u)-l)*u;Z=W.a+(W.b-W.a)*u;aa=W.b+(W.c-W.b)*u;Z+=(aa-Z)*u;
aa+=((W.c+(W.d-W.c)*u)-aa)*u;h=v?Math.atan2(aa-Z,l-k)*ab+s:this._initialRotations[m];
if(this._mod[q]){h=this._mod[q](h,i)}if(X[q]){i[q](h)}else{i[q]=h}}}}}}),D=G.prototype;
G.bezierThrough=c;G.cubicToQuadratic=B;G._autoCSS=true;G.quadraticToCubic=function(j,h,i){return new C(j,(2*h+j)/3,(2*h+i)/3,i)
};G._cssRegister=function(){var j=A.CSSPlugin;if(!j){return}var i=j._internals,h=i._parseToProxy,l=i._setPluginRatio,k=i.CSSPropTween;
i._registerComplexSpecialProp("bezier",{parser:function(q,t,n,P,o,u){if(t instanceof Array){t={values:t}
}u=new G();var r=t.values,x=r.length-1,Q=[],s={},v,m,w;if(x<0){return o}for(v=0;
v<=x;v++){w=h(q,r[v],P,o,u,(x!==v));Q[v]=w.end}for(m in t){s[m]=t[m]}s.values=Q;
o=new k(q,"bezier",0,0,w.pt,2);o.data=w;o.plugin=u;o.setRatio=l;if(s.autoRotate===0){s.autoRotate=true
}if(s.autoRotate&&!(s.autoRotate instanceof Array)){v=(s.autoRotate===true)?0:Number(s.autoRotate);
s.autoRotate=(w.end.left!=null)?[["left","top","rotation",v,false]]:(w.end.x!=null)?[["x","y","rotation",v,false]]:false
}if(s.autoRotate){if(!P._transform){P._enableTransforms(false)}w.autoRotate=P._target._gsTransform;
w.proxy.rotation=w.autoRotate.rotation||0;P._overwriteProps.push("rotation")}u._onInitTween(w.proxy,s,P._tween);
return o}})};D._mod=function(k){var h=this._overwriteProps,i=h.length,j;while(--i>-1){j=k[h[i]];
if(j&&typeof(j)==="function"){this._mod[h[i]]=j}}};D._kill=function(k){var j=this._props,h,i;
for(h in this._beziers){if(h in k){delete this._beziers[h];delete this._func[h];
i=j.length;while(--i>-1){if(j[i]===h){j.splice(i,1)}}}}j=this._autoRotate;if(j){i=j.length;
while(--i>-1){if(k[j[i][2]]){j.splice(i,1)}}}return this._super._kill.call(this,k)
}});if(b._gsDefine){b._gsQueue.pop()()}(function(i){var c=function(){return(b.GreenSockGlobals||b)[i]
};if(typeof(define)==="function"&&define.amd){define(["./TweenLite"],c)}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");
g.exports=c()}}}("BezierPlugin"))}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./TweenLite.js":265}],252:[function(d,g,f){(function(a){
/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){b._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(bJ,p){var cy=function(){bJ.call(this,"css");
this._overwriteProps.length=0;this.setRatio=cy.prototype.setRatio},bY=b._gsDefine.globals,cA,br,bv,cK,bq={},cg=cy.prototype=new bJ("css");
cg.constructor=cy;cy.version="1.19.1";cy.API=2;cy.defaultTransformPerspective=0;
cy.defaultSkewType="compensated";cy.defaultSmoothOrigin=true;cg="px";cy.suffixMap={top:cg,right:cg,bottom:cg,left:cg,width:cg,height:cg,fontSize:cg,padding:cg,margin:cg,perspective:cg,lineHeight:""};
var cl=/(?:\-|\.|\b)(\d|\.|e\-)+/g,bV=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,cG=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,co=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,bT=/(?:\d|\-|\+|=|#|\.)*/g,cs=/opacity *= *([^)]*)/i,bg=/opacity:([^;]*)/i,bX=/alpha\(opacity *=.+?\)/i,cd=/^(rgb|hsl)/,b7=/([A-Z])/g,bm=/-([a-z])/gi,cc=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,cF=function(h,j){return j.toUpperCase()
},bP=/(?:Left|Right|Width)/i,bZ=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,bA=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,bS=/,(?=[^\)]*(?:\(|$))/gi,b6=/[\s,\(]/i,ch=Math.PI/180,cw=180/Math.PI,bC={},by={style:{}},cS=b.document||{createElement:function(){return by
}},cP=function(j,h){return cS.createElementNS?cS.createElementNS(h||"http://www.w3.org/1999/xhtml",j):cS.createElement(j)
},bF=cP("div"),bQ=cP("img"),bh=cy._internals={_specialProps:bq},cI=(b.navigator||{}).userAgent||"",bK,cx,bG,bz,bf,bs,ce=(function(){var h=cI.indexOf("Android"),j=cP("a");
bG=(cI.indexOf("Safari")!==-1&&cI.indexOf("Chrome")===-1&&(h===-1||parseFloat(cI.substr(h+8,2))>3));
bf=(bG&&(parseFloat(cI.substr(cI.indexOf("Version/")+8,2))<6));bz=(cI.indexOf("Firefox")!==-1);
if((/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(cI)||(/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/).exec(cI)){bs=parseFloat(RegExp.$1)
}if(!j){return false}j.style.cssText="top:1px;opacity:.55;";return/^0.55/.test(j.style.opacity)
}()),bR=function(h){return(cs.test(((typeof(h)==="string")?h:(h.currentStyle?h.currentStyle.filter:h.style.filter)||""))?(parseFloat(RegExp.$1)/100):1)
},bN=function(h){if(b.console){console.log(h)}},cB,cq,i="",cQ="",bu=function(h,j){j=j||bF;
var k=j.style,m,l;if(k[h]!==undefined){return h}h=h.charAt(0).toUpperCase()+h.substr(1);
m=["O","Moz","ms","Ms","Webkit"];l=5;while(--l>-1&&k[m[l]+h]===undefined){}if(l>=0){cQ=(l===3)?"ms":m[l];
i="-"+cQ.toLowerCase()+"-";return cQ+h}return null},ct=cS.defaultView?cS.defaultView.getComputedStyle:function(){},bM=cy.getStyle=function(n,k,m,j,l){var h;
if(!ce){if(k==="opacity"){return bR(n)}}if(!j&&n.style[k]){h=n.style[k]}else{if((m=m||ct(n))){h=m[k]||m.getPropertyValue(k)||m.getPropertyValue(k.replace(b7,"-$1").toLowerCase())
}else{if(n.currentStyle){h=n.currentStyle[k]}}}return(l!=null&&(!h||h==="none"||h==="auto"||h==="auto auto"))?l:h
},bH=bh.convertToPixels=function(h,t,k,n,v){if(n==="px"||!n){return k}if(n==="auto"||!k){return 0
}var j=bP.test(t),q=h,u=bF.style,o=(k<0),m=(k===1),l,s,r;if(o){k=-k}if(m){k*=100
}if(n==="%"&&t.indexOf("border")!==-1){l=(k/100)*(j?h.clientWidth:h.clientHeight)
}else{u.cssText="border:0 solid red;position:"+bM(h,"position")+";line-height:0;";
if(n==="%"||!q.appendChild||n.charAt(0)==="v"||n==="rem"){q=h.parentNode||cS.body;
s=q._gsCache;r=p.ticker.frame;if(s&&j&&s.time===r){return s.width*k/100}u[(j?"width":"height")]=k+n
}else{u[(j?"borderLeftWidth":"borderTopWidth")]=k+n}q.appendChild(bF);l=parseFloat(bF[(j?"offsetWidth":"offsetHeight")]);
q.removeChild(bF);if(j&&n==="%"&&cy.cacheWidths!==false){s=q._gsCache=q._gsCache||{};
s.time=r;s.width=l/k*100}if(l===0&&!v){l=bH(h,t,k,n,true)}}if(m){l/=100}return o?-l:l
},bn=bh.calculateOffset=function(m,j,l){if(bM(m,"position",l)!=="absolute"){return 0
}var k=((j==="left")?"Left":"Top"),h=bM(m,"margin"+k,l);return m["offset"+k]-(bH(m,j,parseFloat(h),h.replace(bT,""))||0)
},cz=function(m,k){var l={},n,j,h;if((k=k||ct(m,null))){if((n=k.length)){while(--n>-1){h=k[n];
if(h.indexOf("-transform")===-1||cE===h){l[h.replace(bm,cF)]=k.getPropertyValue(h)
}}}else{for(n in k){if(n.indexOf("Transform")===-1||cm===n){l[n]=k[n]}}}}else{if((k=m.currentStyle||m.style)){for(n in k){if(typeof(n)==="string"&&l[n]===undefined){l[n.replace(bm,cF)]=k[n]
}}}}if(!ce){l.opacity=bR(m)}j=bp(m,k,false);l.rotation=j.rotation;l.skewX=j.skewX;
l.scaleX=j.scaleX;l.scaleY=j.scaleY;l.x=j.x;l.y=j.y;if(bo){l.z=j.z;l.rotationX=j.rotationX;
l.rotationY=j.rotationY;l.scaleZ=j.scaleZ}if(l.filters){delete l.filters}return l
},bd=function(h,j,k,m,n){var q={},o=h.style,r,s,l;for(s in k){if(s!=="cssText"){if(s!=="length"){if(isNaN(s)){if(j[s]!==(r=k[s])||(n&&n[s])){if(s.indexOf("Origin")===-1){if(typeof(r)==="number"||typeof(r)==="string"){q[s]=(r==="auto"&&(s==="left"||s==="top"))?bn(h,s):((r===""||r==="auto"||r==="none")&&typeof(j[s])==="string"&&j[s].replace(co,"")!=="")?0:r;
if(o[s]!==undefined){l=new b9(o,s,o[s],l)}}}}}}}}if(m){for(s in m){if(s!=="className"){q[s]=m[s]
}}}return{difs:q,firstMPT:l}},cn={width:["Left","Right"],height:["Top","Bottom"]},b5=["marginLeft","marginRight","marginTop","marginBottom"],cr=function(k,h,j){if((k.nodeName+"").toLowerCase()==="svg"){return(j||ct(k))[h]||0
}else{if(k.getCTM&&be(k)){return k.getBBox()[h]||0}}var m=parseFloat((h==="width")?k.offsetWidth:k.offsetHeight),n=cn[h],l=n.length;
j=j||ct(k,null);while(--l>-1){m-=parseFloat(bM(k,"padding"+n[l],j,true))||0;m-=parseFloat(bM(k,"border"+n[l]+"Width",j,true))||0
}return m},cv=function(l,k){if(l==="contain"||l==="auto"||l==="auto auto"){return l+" "
}if(l==null||l===""){l="0 0"}var m=l.split(" "),n=(l.indexOf("left")!==-1)?"0%":(l.indexOf("right")!==-1)?"100%":m[0],h=(l.indexOf("top")!==-1)?"0%":(l.indexOf("bottom")!==-1)?"100%":m[1],j;
if(m.length>3&&!k){m=l.split(", ").join(",").split(",");l=[];for(j=0;j<m.length;
j++){l.push(cv(m[j]))}return l.join(",")}if(h==null){h=(n==="center")?"50%":"0"
}else{if(h==="center"){h="50%"}}if(n==="center"||(isNaN(parseFloat(n))&&(n+"").indexOf("=")===-1)){n="50%"
}l=n+" "+h+((m.length>2)?" "+m[2]:"");if(k){k.oxp=(n.indexOf("%")!==-1);k.oyp=(h.indexOf("%")!==-1);
k.oxr=(n.charAt(1)==="=");k.oyr=(h.charAt(1)==="=");k.ox=parseFloat(n.replace(co,""));
k.oy=parseFloat(h.replace(co,""));k.v=l}return k||l},bE=function(j,h){if(typeof(j)==="function"){j=j(cq,cB)
}return(typeof(j)==="string"&&j.charAt(1)==="=")?parseInt(j.charAt(0)+"1",10)*parseFloat(j.substr(2)):(parseFloat(j)-parseFloat(h))||0
},bW=function(h,j){if(typeof(h)==="function"){h=h(cq,cB)}return(h==null)?j:(typeof(h)==="string"&&h.charAt(1)==="=")?parseInt(h.charAt(0)+"1",10)*parseFloat(h.substr(2))+j:parseFloat(h)||0
},cM=function(k,r,n,l){var s=0.000001,j,q,o,h,m;if(typeof(k)==="function"){k=k(cq,cB)
}if(k==null){h=r}else{if(typeof(k)==="number"){h=k}else{j=360;q=k.split("_");m=(k.charAt(1)==="=");
o=(m?parseInt(k.charAt(0)+"1",10)*parseFloat(q[0].substr(2)):parseFloat(q[0]))*((k.indexOf("rad")===-1)?1:cw)-(m?0:r);
if(q.length){if(l){l[n]=r+o}if(k.indexOf("short")!==-1){o=o%j;if(o!==o%(j/2)){o=(o<0)?o+j:o-j
}}if(k.indexOf("_cw")!==-1&&o<0){o=((o+j*9999999999)%j)-((o/j)|0)*j}else{if(k.indexOf("ccw")!==-1&&o>0){o=((o-j*9999999999)%j)-((o/j)|0)*j
}}}h=r+o}}if(h<s&&h>-s){h=0}return h},b8={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},cu=function(j,k,h){j=(j<0)?j+1:(j>1)?j-1:j;
return((((j*6<1)?k+(h-k)*j*6:(j<0.5)?h:(j*3<2)?k+(h-k)*(2/3-j)*6:k)*255)+0.5)|0
},cN=cy.parseColor=function(k,u){var l,s,q,m,t,j,h,n,v,o,r;if(!k){l=b8.black}else{if(typeof(k)==="number"){l=[k>>16,(k>>8)&255,k&255]
}else{if(k.charAt(k.length-1)===","){k=k.substr(0,k.length-1)}if(b8[k]){l=b8[k]
}else{if(k.charAt(0)==="#"){if(k.length===4){s=k.charAt(1);q=k.charAt(2);m=k.charAt(3);
k="#"+s+s+q+q+m+m}k=parseInt(k.substr(1),16);l=[k>>16,(k>>8)&255,k&255]}else{if(k.substr(0,3)==="hsl"){l=r=k.match(cl);
if(!u){t=(Number(l[0])%360)/360;j=Number(l[1])/100;h=Number(l[2])/100;q=(h<=0.5)?h*(j+1):h+j-h*j;
s=h*2-q;if(l.length>3){l[3]=Number(k[3])}l[0]=cu(t+1/3,s,q);l[1]=cu(t,s,q);l[2]=cu(t-1/3,s,q)
}else{if(k.indexOf("=")!==-1){return k.match(bV)}}}else{l=k.match(cl)||b8.transparent
}}}l[0]=Number(l[0]);l[1]=Number(l[1]);l[2]=Number(l[2]);if(l.length>3){l[3]=Number(l[3])
}}}if(u&&!r){s=l[0]/255;q=l[1]/255;m=l[2]/255;n=Math.max(s,q,m);v=Math.min(s,q,m);
h=(n+v)/2;if(n===v){t=j=0}else{o=n-v;j=h>0.5?o/(2-n-v):o/(n+v);t=(n===s)?(q-m)/o+(q<m?6:0):(n===q)?(m-s)/o+2:(s-q)/o+4;
t*=60}l[0]=(t+0.5)|0;l[1]=(j*100+0.5)|0;l[2]=(h*100+0.5)|0}return l},bL=function(k,h){var q=k.match(cD)||[],j=0,m=q.length?"":k,l,n,o;
for(l=0;l<q.length;l++){n=q[l];o=k.substr(j,k.indexOf(n,j)-j);j+=o.length+n.length;
n=cN(n,h);if(n.length===3){n.push(1)}m+=o+(h?"hsla("+n[0]+","+n[1]+"%,"+n[2]+"%,"+n[3]:"rgba("+n.join(","))+")"
}return m+k.substr(j)},cD="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
for(cg in b8){cD+="|"+cg+"\\b"}cD=new RegExp(cD+")","gi");cy.colorStringFilter=function(h){var k=h[0]+h[1],j;
if(cD.test(k)){j=(k.indexOf("hsl(")!==-1||k.indexOf("hsla(")!==-1);h[0]=bL(h[0],j);
h[1]=bL(h[1],j)}cD.lastIndex=0};if(!p.defaultStringFilter){p.defaultStringFilter=cy.colorStringFilter
}var cH=function(r,j,k,o){if(r==null){return function(v){return v}}var l=j?(r.match(cD)||[""])[0]:"",s=r.split(l).join("").match(cG)||[],n=r.substr(0,r.indexOf(s[0])),t=(r.charAt(r.length-1)===")")?")":"",q=(r.indexOf(" ")!==-1)?" ":",",u=s.length,h=(u>0)?s[0].replace(cl,""):"",m;
if(!u){return function(v){return v}}if(j){m=function(x){var y,v,w,z;if(typeof(x)==="number"){x+=h
}else{if(o&&bS.test(x)){z=x.replace(bS,"|").split("|");for(w=0;w<z.length;w++){z[w]=m(z[w])
}return z.join(",")}}y=(x.match(cD)||[l])[0];v=x.split(y).join("").match(cG)||[];
w=v.length;if(u>w--){while(++w<u){v[w]=k?v[(((w-1)/2)|0)]:s[w]}}return n+v.join(q)+q+y+t+(x.indexOf("inset")!==-1?" inset":"")
};return m}m=function(x){var v,y,w;if(typeof(x)==="number"){x+=h}else{if(o&&bS.test(x)){y=x.replace(bS,"|").split("|");
for(w=0;w<y.length;w++){y[w]=m(y[w])}return y.join(",")}}v=x.match(cG)||[];w=v.length;
if(u>w--){while(++w<u){v[w]=k?v[(((w-1)/2)|0)]:s[w]}}return n+v.join(q)+t};return m
},cp=function(h){h=h.split(",");return function(k,n,s,r,j,o,m){var l=(n+"").split(" "),q;
m={};for(q=0;q<4;q++){m[h[q]]=l[q]=l[q]||l[(((q-1)/2)>>0)]}return r.parse(k,m,j,o)
}},cJ=bh._setPluginRatio=function(j){this.plugin.setRatio(j);var n=this.data,m=n.proxy,k=n.firstMPT,q=0.000001,r,h,o,l,s;
while(k){r=m[k.v];if(k.r){r=Math.round(r)}else{if(r<q&&r>-q){r=0}}k.t[k.p]=r;k=k._next
}if(n.autoRotate){n.autoRotate.rotation=n.mod?n.mod(m.rotation,this.t):m.rotation
}if(j===1||j===0){k=n.firstMPT;s=(j===1)?"e":"b";while(k){h=k.t;if(!h.type){h[s]=h.s+h.xs0
}else{if(h.type===1){l=h.xs0+h.s+h.xs1;for(o=1;o<h.l;o++){l+=h["xn"+o]+h["xs"+(o+1)]
}h[s]=l}}k=k._next}}},b9=function(m,j,h,l,k){this.t=m;this.p=j;this.v=h;this.r=k;
if(l){l._prev=this;this._next=l}},bw=bh._parseToProxy=function(x,h,r,w,j,s){var q=w,u={},m={},t=r._transform,n=bC,k,v,l,y,o;
r._transform=null;bC=h;w=o=r.parse(x,h,w,j);bC=n;if(s){r._transform=t;if(q){q._prev=null;
if(q._prev){q._prev._next=null}}}while(w&&w!==q){if(w.type<=1){v=w.p;m[v]=w.s+w.c;
u[v]=w.s;if(!s){y=new b9(w,"s",v,y,w.r);w.c=0}if(w.type===1){k=w.l;while(--k>0){l="xn"+k;
v=w.p+"_"+l;m[v]=w.data[l];u[v]=w[l];if(!s){y=new b9(w,l,v,y,w.rxp[l])}}}}w=w._next
}return{proxy:u,end:m,firstMPT:y,pt:o}},b2=bh.CSSPropTween=function(j,s,h,m,o,l,r,q,t,k,n){this.t=j;
this.p=s;this.s=h;this.c=m;this.n=r||s;if(!(j instanceof b2)){cK.push(this.n)}this.r=q;
this.type=l||0;if(t){this.pr=t;cA=true}this.b=(k===undefined)?h:k;this.e=(n===undefined)?h+m:n;
if(o){this._next=o;o._prev=this}},a0=function(l,h,k,j,n,o){var m=new b2(l,h,k,j-k,n,-1,o);
m.b=k;m.e=m.xs0=j;return m},bj=cy.parseComplex=function(j,I,y,G,H,J,F,A,o,v){y=y||J||"";
if(typeof(G)==="function"){G=G(cq,cB)}F=new b2(j,I,0,0,F,(v?2:1),null,false,A,y,G);
G+="";if(H&&cD.test(G+y)){G=[y,G];cy.colorStringFilter(G);y=G[0];G=G[1]}var l=y.split(", ").join(",").split(" "),k=G.split(", ").join(",").split(" "),C=l.length,z=(bK!==false),w,h,n,t,B,m,r,s,x,E,q,D,u;
if(G.indexOf(",")!==-1||y.indexOf(",")!==-1){l=l.join(" ").replace(bS,", ").split(" ");
k=k.join(" ").replace(bS,", ").split(" ");C=l.length}if(C!==k.length){l=(J||"").split(" ");
C=l.length}F.plugin=o;F.setRatio=v;cD.lastIndex=0;for(w=0;w<C;w++){t=l[w];B=k[w];
s=parseFloat(t);if(s||s===0){F.appendXtra("",s,bE(B,s),B.replace(bV,""),(z&&B.indexOf("px")!==-1),true)
}else{if(H&&cD.test(t)){D=B.indexOf(")")+1;D=")"+(D?B.substr(D):"");u=(B.indexOf("hsl")!==-1&&ce);
t=cN(t,u);B=cN(B,u);x=(t.length+B.length>6);if(x&&!ce&&B[3]===0){F["xs"+F.l]+=F.l?" transparent":"transparent";
F.e=F.e.split(k[w]).join("transparent")}else{if(!ce){x=false}if(u){F.appendXtra((x?"hsla(":"hsl("),t[0],bE(B[0],t[0]),",",false,true).appendXtra("",t[1],bE(B[1],t[1]),"%,",false).appendXtra("",t[2],bE(B[2],t[2]),(x?"%,":"%"+D),false)
}else{F.appendXtra((x?"rgba(":"rgb("),t[0],B[0]-t[0],",",true,true).appendXtra("",t[1],B[1]-t[1],",",true).appendXtra("",t[2],B[2]-t[2],(x?",":D),true)
}if(x){t=(t.length<4)?1:t[3];F.appendXtra("",t,((B.length<4)?1:B[3])-t,D,false)
}}cD.lastIndex=0}else{m=t.match(cl);if(!m){F["xs"+F.l]+=(F.l||F["xs"+F.l])?" "+B:B
}else{r=B.match(bV);if(!r||r.length!==m.length){return F}n=0;for(h=0;h<m.length;
h++){q=m[h];E=t.indexOf(q,n);F.appendXtra(t.substr(n,E-n),Number(q),bE(r[h],q),"",(z&&t.substr(E+q.length,2)==="px"),(h===0));
n=E+q.length}F["xs"+F.l]+=t.substr(n)}}}}if(G.indexOf("=")!==-1){if(F.data){D=F.xs0+F.data.s;
for(w=1;w<F.l;w++){D+=F["xs"+w]+F.data["xn"+w]}F.e=D+F["xs"+w]}}if(!F.l){F.type=-1;
F.xs0=F.e}return F.xfirst||F},ca=9;cg=b2.prototype;cg.l=cg.pr=0;while(--ca>0){cg["xn"+ca]=0;
cg["xs"+ca]=""}cg.xs0="";cg._next=cg._prev=cg.xfirst=cg.data=cg.plugin=cg.setRatio=cg.rxp=null;
cg.appendXtra=function(j,q,h,l,o,m){var n=this,k=n.l;n["xs"+k]+=(m&&(k||n["xs"+k]))?" "+j:j||"";
if(!h){if(k!==0&&!n.plugin){n["xs"+k]+=q+(l||"");return n}}n.l++;n.type=n.setRatio?2:1;
n["xs"+n.l]=l||"";if(k>0){n.data["xn"+k]=q+h;n.rxp["xn"+k]=o;n["xn"+k]=q;if(!n.plugin){n.xfirst=new b2(n,"xn"+k,q,h,n.xfirst||n,0,n.n,o,n.pr);
n.xfirst.xs0=0}return n}n.data={s:q+h};n.rxp={};n.s=q;n.c=h;n.r=o;return n};var b3=function(j,h){h=h||{};
this.p=h.prefix?bu(j)||j:j;bq[j]=bq[this.p]=this;this.format=h.formatter||cH(h.defaultValue,h.color,h.collapsible,h.multi);
if(h.parser){this.parse=h.parser}this.clrs=h.color;this.multi=h.multi;this.keyword=h.keyword;
this.dflt=h.defaultValue;this.pr=h.priority||0},bx=bh._registerComplexSpecialProp=function(j,m,k){if(typeof(m)!=="object"){m={parser:k}
}var o=j.split(","),h=m.defaultValue,l,n;k=k||[h];for(l=0;l<o.length;l++){m.prefix=(l===0&&m.prefix);
m.defaultValue=k[l]||h;n=new b3(o[l],m)}},bk=bh._registerPluginProp=function(j){if(!bq[j]){var h=j.charAt(0).toUpperCase()+j.substr(1)+"Plugin";
bx(j,{parser:function(r,k,l,s,m,o,n){var q=bY.com.greensock.plugins[h];if(!q){bN("Error: "+h+" js file not loaded.");
return m}q._cssRegister();return bq[l].parse(r,k,l,s,m,o,n)}})}};cg=b3.prototype;
cg.parseComplex=function(j,k,o,h,r,l){var q=this.keyword,s,m,n,u,t,v;if(this.multi){if(bS.test(o)||bS.test(k)){m=k.replace(bS,"|").split("|");
n=o.replace(bS,"|").split("|")}else{if(q){m=[k];n=[o]}}}if(n){u=(n.length>m.length)?n.length:m.length;
for(s=0;s<u;s++){k=m[s]=m[s]||this.dflt;o=n[s]=n[s]||this.dflt;if(q){t=k.indexOf(q);
v=o.indexOf(q);if(t!==v){if(v===-1){m[s]=m[s].split(q).join("")}else{if(t===-1){m[s]+=" "+q
}}}}}k=m.join(", ");o=n.join(", ")}return bj(j,this.p,k,o,this.clrs,this.dflt,h,this.pr,r,l)
};cg.parse=function(l,j,k,h,m,o,n){return this.parseComplex(l.style,this.format(bM(l,this.p,bv,false,this.dflt)),this.format(j),m,o)
};cy.registerSpecialProp=function(h,j,k){bx(h,{parser:function(s,m,n,l,o,r,q){var t=new b2(s,n,0,0,o,2,n,false,k);
t.plugin=r;t.setRatio=j(s,m,l._tween,n);return t},priority:k})};cy.useSVGTransformAttr=true;
var bO=("scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent").split(","),cm=bu("transform"),cE=i+"transform",ci=bu("transformOrigin"),bo=(bu("perspective")!==null),cO=bh.Transform=function(){this.perspective=parseFloat(cy.defaultTransformPerspective)||0;
this.force3D=(cy.defaultForce3D===false||!bo)?false:cy.defaultForce3D||"auto"},bU=b.SVGElement,bI,c=function(k,j,n){var m=cS.createElementNS("http://www.w3.org/2000/svg",k),l=/([a-z])([A-Z])/g,h;
for(h in n){m.setAttributeNS(null,h.replace(l,"$1-$2").toLowerCase(),n[h])}j.appendChild(m);
return m},bD=cS.documentElement||{},cj=(function(){var j=bs||(/Android/i.test(cI)&&!b.chrome),h,k,l;
if(cS.createElementNS&&!j){h=c("svg",bD);k=c("rect",h,{width:100,height:50,x:100});
l=k.getBoundingClientRect().width;k.style[ci]="50% 50%";k.style[cm]="scaleX(0.5)";
j=(l===k.getBoundingClientRect().width&&!(bz&&bo));bD.removeChild(h)}return j})(),bi=function(h,l,w,C,n,s){var u=h._gsTransform,k=b1(h,true),o,q,r,j,v,x,z,B,D,y,A,m,E,t;
if(u){E=u.xOrigin;t=u.yOrigin}if(!C||(o=C.split(" ")).length<2){z=h.getBBox();if(z.x===0&&z.y===0&&z.width+z.height===0){z={x:parseFloat(h.hasAttribute("x")?h.getAttribute("x"):h.hasAttribute("cx")?h.getAttribute("cx"):0)||0,y:parseFloat(h.hasAttribute("y")?h.getAttribute("y"):h.hasAttribute("cy")?h.getAttribute("cy"):0)||0,width:0,height:0}
}l=cv(l).split(" ");o=[(l[0].indexOf("%")!==-1?parseFloat(l[0])/100*z.width:parseFloat(l[0]))+z.x,(l[1].indexOf("%")!==-1?parseFloat(l[1])/100*z.height:parseFloat(l[1]))+z.y]
}w.xOrigin=j=parseFloat(o[0]);w.yOrigin=v=parseFloat(o[1]);if(C&&k!==bt){x=k[0];
z=k[1];B=k[2];D=k[3];y=k[4];A=k[5];m=(x*D-z*B);if(m){q=j*(D/m)+v*(-B/m)+((B*A-D*y)/m);
r=j*(-z/m)+v*(x/m)-((x*A-z*y)/m);j=w.xOrigin=o[0]=q;v=w.yOrigin=o[1]=r}}if(u){if(s){w.xOffset=u.xOffset;
w.yOffset=u.yOffset;u=w}if(n||(n!==false&&cy.defaultSmoothOrigin!==false)){q=j-E;
r=v-t;u.xOffset+=(q*k[0]+r*k[2])-q;u.yOffset+=(q*k[1]+r*k[3])-r}else{u.xOffset=u.yOffset=0
}}if(!s){h.setAttribute("data-svg-origin",o.join(" "))}},bl=function(m){var k=cP("svg",this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,o=this.nextSibling,h=this.style.cssText,j;
bD.appendChild(k);k.appendChild(this);this.style.display="block";if(m){try{j=this.getBBox();
this._originalGetBBox=this.getBBox;this.getBBox=bl}catch(l){}}else{if(this._originalGetBBox){j=this._originalGetBBox()
}}if(o){n.insertBefore(this,o)}else{n.appendChild(this)}bD.removeChild(k);this.style.cssText=h;
return j},ck=function(j){try{return j.getBBox()}catch(h){return bl.call(j,true)
}},be=function(h){return !!(bU&&h.getCTM&&ck(h)&&(!h.parentNode||h.ownerSVGElement))
},bt=[1,0,0,1,0,0],b1=function(m,s){var k=m._gsTransform||new cO(),h=100000,q=m.style,n,j,r,t,o,l;
if(cm){j=bM(m,cE,null,true)}else{if(m.currentStyle){j=m.currentStyle.filter.match(bZ);
j=(j&&j.length===4)?[j[0].substr(4),Number(j[2].substr(4)),Number(j[1].substr(4)),j[3].substr(4),(k.x||0),(k.y||0)].join(","):""
}}n=(!j||j==="none"||j==="matrix(1, 0, 0, 1, 0, 0)");if(n&&cm&&((l=(ct(m).display==="none"))||!m.parentNode)){if(l){t=q.display;
q.display="block"}if(!m.parentNode){o=1;bD.appendChild(m)}j=bM(m,cE,null,true);
n=(!j||j==="none"||j==="matrix(1, 0, 0, 1, 0, 0)");if(t){q.display=t}else{if(l){cf(q,"display")
}}if(o){bD.removeChild(m)}}if(k.svg||(m.getCTM&&be(m))){if(n&&(q[cm]+"").indexOf("matrix")!==-1){j=q[cm];
n=0}r=m.getAttribute("transform");if(n&&r){if(r.indexOf("matrix")!==-1){j=r;n=0
}else{if(r.indexOf("translate")!==-1){j="matrix(1,0,0,1,"+r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",")+")";
n=0}}}}if(n){return bt}r=(j||"").match(cl)||[];ca=r.length;while(--ca>-1){t=Number(r[ca]);
r[ca]=(o=t-(t|=0))?((o*h+(o<0?-0.5:0.5))|0)/h+t:t}return(s&&r.length>6)?[r[0],r[1],r[4],r[5],r[12],r[13]]:r
},bp=bh.getTransform=function(A,O,z,P){if(A._gsTransform&&z&&!P){return A._gsTransform
}var h=z?A._gsTransform||new cO():new cO(),r=(h.scaleX<0),m=0.00002,x=100000,D=bo?parseFloat(bM(A,ci,O,false,"0 0 0").split(" ")[2])||h.zOrigin||0:0,L=parseFloat(cy.defaultTransformPerspective)||0,y,v,B,C,K,j;
h.svg=!!(A.getCTM&&be(A));if(h.svg){bi(A,bM(A,ci,O,false,"50% 50%")+"",h,A.getAttribute("data-svg-origin"));
bI=cy.useSVGTransformAttr||cj}y=b1(A);if(y!==bt){if(y.length===16){var U=y[0],q=y[1],H=y[2],R=y[3],W=y[4],s=y[5],I=y[6],S=y[7],X=y[8],t=y[9],M=y[10],Y=y[12],u=y[13],N=y[14],T=y[11],Q=Math.atan2(I,M),E,F,G,J,Z,V;
if(h.zOrigin){N=-h.zOrigin;Y=X*N-y[12];u=t*N-y[13];N=M*N+h.zOrigin-y[14]}h.rotationX=Q*cw;
if(Q){Z=Math.cos(-Q);V=Math.sin(-Q);E=W*Z+X*V;F=s*Z+t*V;G=I*Z+M*V;X=W*-V+X*Z;t=s*-V+t*Z;
M=I*-V+M*Z;T=S*-V+T*Z;W=E;s=F;I=G}Q=Math.atan2(-H,M);h.rotationY=Q*cw;if(Q){Z=Math.cos(-Q);
V=Math.sin(-Q);E=U*Z-X*V;F=q*Z-t*V;G=H*Z-M*V;t=q*V+t*Z;M=H*V+M*Z;T=R*V+T*Z;U=E;
q=F;H=G}Q=Math.atan2(q,U);h.rotation=Q*cw;if(Q){Z=Math.cos(-Q);V=Math.sin(-Q);U=U*Z+W*V;
F=q*Z+s*V;s=q*-V+s*Z;I=H*-V+I*Z;q=F}if(h.rotationX&&Math.abs(h.rotationX)+Math.abs(h.rotation)>359.9){h.rotationX=h.rotation=0;
h.rotationY=180-h.rotationY}h.scaleX=((Math.sqrt(U*U+q*q)*x+0.5)|0)/x;h.scaleY=((Math.sqrt(s*s+t*t)*x+0.5)|0)/x;
h.scaleZ=((Math.sqrt(I*I+M*M)*x+0.5)|0)/x;if(h.rotationX||h.rotationY){h.skewX=0
}else{h.skewX=(W||s)?Math.atan2(W,s)*cw+h.rotation:h.skewX||0;if(Math.abs(h.skewX)>90&&Math.abs(h.skewX)<270){if(r){h.scaleX*=-1;
h.skewX+=(h.rotation<=0)?180:-180;h.rotation+=(h.rotation<=0)?180:-180}else{h.scaleY*=-1;
h.skewX+=(h.skewX<=0)?180:-180}}}h.perspective=T?1/((T<0)?-T:T):0;h.x=Y;h.y=u;h.z=N;
if(h.svg){h.x-=h.xOrigin-(h.xOrigin*U-h.yOrigin*W);h.y-=h.yOrigin-(h.yOrigin*q-h.xOrigin*s)
}}else{if((!bo||P||!y.length||h.x!==y[4]||h.y!==y[5]||(!h.rotationX&&!h.rotationY))){var w=(y.length>=6),k=w?y[0]:1,l=y[1]||0,n=y[2]||0,o=w?y[3]:1;
h.x=y[4]||0;h.y=y[5]||0;B=Math.sqrt(k*k+l*l);C=Math.sqrt(o*o+n*n);K=(k||l)?Math.atan2(l,k)*cw:h.rotation||0;
j=(n||o)?Math.atan2(n,o)*cw+K:h.skewX||0;if(Math.abs(j)>90&&Math.abs(j)<270){if(r){B*=-1;
j+=(K<=0)?180:-180;K+=(K<=0)?180:-180}else{C*=-1;j+=(j<=0)?180:-180}}h.scaleX=B;
h.scaleY=C;h.rotation=K;h.skewX=j;if(bo){h.rotationX=h.rotationY=h.z=0;h.perspective=L;
h.scaleZ=1}if(h.svg){h.x-=h.xOrigin-(h.xOrigin*k+h.yOrigin*n);h.y-=h.yOrigin-(h.xOrigin*l+h.yOrigin*o)
}}}h.zOrigin=D;for(v in h){if(h[v]<m){if(h[v]>-m){h[v]=0}}}}if(z){A._gsTransform=h;
if(h.svg){if(bI&&A.style[cm]){p.delayedCall(0.001,function(){cf(A.style,cm)})}else{if(!bI&&A.getAttribute("transform")){p.delayedCall(0.001,function(){A.removeAttribute("transform")
})}}}}return h},cC=function(j){var H=this.data,y=-H.rotation*ch,u=y+H.skewX*ch,o=100000,x=((Math.cos(y)*H.scaleX*o)|0)/o,z=((Math.sin(y)*H.scaleX*o)|0)/o,A=((Math.sin(u)*-H.scaleY*o)|0)/o,C=((Math.cos(u)*H.scaleY*o)|0)/o,E=this.t.style,q=this.t.currentStyle,n,w;
if(!q){return}w=z;z=-A;A=-w;n=q.filter;E.filter="";var l=this.t.offsetWidth,F=this.t.offsetHeight,D=(q.position!=="absolute"),G="progid:DXImageTransform.Microsoft.Matrix(M11="+x+", M12="+z+", M21="+A+", M22="+C,s=H.x+(l*H.xPercent/100),t=H.y+(F*H.yPercent/100),k,m;
if(H.ox!=null){k=((H.oxp)?l*H.ox*0.01:H.ox)-l/2;m=((H.oyp)?F*H.oy*0.01:H.oy)-F/2;
s+=k-(k*x+m*z);t+=m-(k*A+m*C)}if(!D){G+=", sizingMethod='auto expand')"}else{k=(l/2);
m=(F/2);G+=", Dx="+(k-(k*x+m*z)+s)+", Dy="+(m-(k*A+m*C)+t)+")"}if(n.indexOf("DXImageTransform.Microsoft.Matrix(")!==-1){E.filter=n.replace(bA,G)
}else{E.filter=G+" "+n}if(j===0||j===1){if(x===1){if(z===0){if(A===0){if(C===1){if(!D||G.indexOf("Dx=0, Dy=0")!==-1){if(!cs.test(n)||parseFloat(RegExp.$1)===100){if(n.indexOf("gradient("&&n.indexOf("Alpha"))===-1){E.removeAttribute("filter")
}}}}}}}}if(!D){var r=(bs<8)?1:-1,h,v,B;k=H.ieOffsetX||0;m=H.ieOffsetY||0;H.ieOffsetX=Math.round((l-((x<0?-x:x)*l+(z<0?-z:z)*F))/2+s);
H.ieOffsetY=Math.round((F-((C<0?-C:C)*F+(A<0?-A:A)*l))/2+t);for(ca=0;ca<4;ca++){v=b5[ca];
h=q[v];w=(h.indexOf("px")!==-1)?parseFloat(h):bH(this.t,v,parseFloat(h),h.replace(bT,""))||0;
if(w!==H[v]){B=(ca<2)?-H.ieOffsetX:-H.ieOffsetY}else{B=(ca<2)?k-H.ieOffsetX:m-H.ieOffsetY
}E[v]=(H[v]=Math.round(w-B*((ca===0||ca===2)?1:r)))+"px"}}},cR=bh.set3DTransformRatio=bh.setTransformRatio=function(t){var s=this.data,r=this.t.style,G=s.rotation,I=s.rotationX,J=s.rotationY,T=s.scaleX,U=s.scaleY,V=s.scaleZ,u=s.x,v=s.y,w=s.z,H=s.svg,x=s.perspective,n=s.force3D,j=s.skewY,h=s.skewX,z,P,R,S,l,m,o,B,D,E,K,L,N,y,k,W,M,A,F,Q,O,C,q;
if(j){h+=j;G+=j}if(((((t===1||t===0)&&n==="auto"&&(this.tween._totalTime===this.tween._totalDuration||!this.tween._totalTime))||!n)&&!w&&!x&&!J&&!I&&V===1)||(bI&&H)||!bo){if(G||h||H){G*=ch;
C=h*ch;q=100000;P=Math.cos(G)*T;l=Math.sin(G)*T;R=Math.sin(G-C)*-U;m=Math.cos(G-C)*U;
if(C&&s.skewType==="simple"){z=Math.tan(C-j*ch);z=Math.sqrt(1+z*z);R*=z;m*=z;if(j){z=Math.tan(j*ch);
z=Math.sqrt(1+z*z);P*=z;l*=z}}if(H){u+=s.xOrigin-(s.xOrigin*P+s.yOrigin*R)+s.xOffset;
v+=s.yOrigin-(s.xOrigin*l+s.yOrigin*m)+s.yOffset;if(bI&&(s.xPercent||s.yPercent)){k=this.t.getBBox();
u+=s.xPercent*0.01*k.width;v+=s.yPercent*0.01*k.height}k=0.000001;if(u<k){if(u>-k){u=0
}}if(v<k){if(v>-k){v=0}}}F=(((P*q)|0)/q)+","+(((l*q)|0)/q)+","+(((R*q)|0)/q)+","+(((m*q)|0)/q)+","+u+","+v+")";
if(H&&bI){this.t.setAttribute("transform","matrix("+F)}else{r[cm]=((s.xPercent||s.yPercent)?"translate("+s.xPercent+"%,"+s.yPercent+"%) matrix(":"matrix(")+F
}}else{r[cm]=((s.xPercent||s.yPercent)?"translate("+s.xPercent+"%,"+s.yPercent+"%) matrix(":"matrix(")+T+",0,0,"+U+","+u+","+v+")"
}return}if(bz){k=0.0001;if(T<k&&T>-k){T=V=0.00002}if(U<k&&U>-k){U=V=0.00002}if(x&&!s.z&&!s.rotationX&&!s.rotationY){x=0
}}if(G||h){G*=ch;W=P=Math.cos(G);M=l=Math.sin(G);if(h){G-=h*ch;W=Math.cos(G);M=Math.sin(G);
if(s.skewType==="simple"){z=Math.tan((h-j)*ch);z=Math.sqrt(1+z*z);W*=z;M*=z;if(s.skewY){z=Math.tan(j*ch);
z=Math.sqrt(1+z*z);P*=z;l*=z}}}R=-M;m=W}else{if(!J&&!I&&V===1&&!x&&!H){r[cm]=((s.xPercent||s.yPercent)?"translate("+s.xPercent+"%,"+s.yPercent+"%) translate3d(":"translate3d(")+u+"px,"+v+"px,"+w+"px)"+((T!==1||U!==1)?" scale("+T+","+U+")":"");
return}else{P=m=1;R=l=0}}E=1;S=o=B=D=K=L=0;N=(x)?-1/x:0;y=s.zOrigin;k=0.000001;
Q=",";O="0";G=J*ch;if(G){W=Math.cos(G);M=Math.sin(G);B=-M;K=N*-M;S=P*M;o=l*M;E=W;
N*=W;P*=W;l*=W}G=I*ch;if(G){W=Math.cos(G);M=Math.sin(G);z=R*W+S*M;A=m*W+o*M;D=E*M;
L=N*M;S=R*-M+S*W;o=m*-M+o*W;E=E*W;N=N*W;R=z;m=A}if(V!==1){S*=V;o*=V;E*=V;N*=V}if(U!==1){R*=U;
m*=U;D*=U;L*=U}if(T!==1){P*=T;l*=T;B*=T;K*=T}if(y||H){if(y){u+=S*-y;v+=o*-y;w+=E*-y+y
}if(H){u+=s.xOrigin-(s.xOrigin*P+s.yOrigin*R)+s.xOffset;v+=s.yOrigin-(s.xOrigin*l+s.yOrigin*m)+s.yOffset
}if(u<k&&u>-k){u=O}if(v<k&&v>-k){v=O}if(w<k&&w>-k){w=0}}F=((s.xPercent||s.yPercent)?"translate("+s.xPercent+"%,"+s.yPercent+"%) matrix3d(":"matrix3d(");
F+=((P<k&&P>-k)?O:P)+Q+((l<k&&l>-k)?O:l)+Q+((B<k&&B>-k)?O:B);F+=Q+((K<k&&K>-k)?O:K)+Q+((R<k&&R>-k)?O:R)+Q+((m<k&&m>-k)?O:m);
if(I||J||V!==1){F+=Q+((D<k&&D>-k)?O:D)+Q+((L<k&&L>-k)?O:L)+Q+((S<k&&S>-k)?O:S);
F+=Q+((o<k&&o>-k)?O:o)+Q+((E<k&&E>-k)?O:E)+Q+((N<k&&N>-k)?O:N)+Q}else{F+=",0,0,0,0,1,0,"
}F+=u+Q+v+Q+w+Q+(x?(1+(-w/x)):1)+")";r[cm]=F};cg=cO.prototype;cg.x=cg.y=cg.z=cg.skewX=cg.skewY=cg.rotation=cg.rotationX=cg.rotationY=cg.zOrigin=cg.xPercent=cg.yPercent=cg.xOffset=cg.yOffset=0;
cg.scaleX=cg.scaleY=cg.scaleZ=1;bx("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",{parser:function(I,D,F,q,y,m,E){if(q._lastParsedTransform===E){return y
}q._lastParsedTransform=E;var J=(E.scale&&typeof(E.scale)==="function")?E.scale:0,w;
if(typeof(E[F])==="function"){w=E[F];E[F]=D}if(J){E.scale=J(cq,I)}var z=I._gsTransform,G=I.style,v=0.000001,H=bO.length,h=E,l={},s="transformOrigin",r=bp(I,bv,true,h.parseTransform),n=h.transform&&((typeof(h.transform)==="function")?h.transform(cq,cB):h.transform),t,x,o,C,A,j,k,u,B;
q._transform=r;if(n&&typeof(n)==="string"&&cm){x=bF.style;x[cm]=n;x.display="block";
x.position="absolute";cS.body.appendChild(bF);t=bp(bF,null,false);if(r.svg){j=r.xOrigin;
k=r.yOrigin;t.x-=r.xOffset;t.y-=r.yOffset;if(h.transformOrigin||h.svgOrigin){n={};
bi(I,cv(h.transformOrigin),n,h.svgOrigin,h.smoothOrigin,true);j=n.xOrigin;k=n.yOrigin;
t.x-=n.xOffset-r.xOffset;t.y-=n.yOffset-r.yOffset}if(j||k){u=b1(bF,true);t.x-=j-(j*u[0]+k*u[2]);
t.y-=k-(j*u[1]+k*u[3])}}cS.body.removeChild(bF);if(!t.perspective){t.perspective=r.perspective
}if(h.xPercent!=null){t.xPercent=bW(h.xPercent,r.xPercent)}if(h.yPercent!=null){t.yPercent=bW(h.yPercent,r.yPercent)
}}else{if(typeof(h)==="object"){t={scaleX:bW((h.scaleX!=null)?h.scaleX:h.scale,r.scaleX),scaleY:bW((h.scaleY!=null)?h.scaleY:h.scale,r.scaleY),scaleZ:bW(h.scaleZ,r.scaleZ),x:bW(h.x,r.x),y:bW(h.y,r.y),z:bW(h.z,r.z),xPercent:bW(h.xPercent,r.xPercent),yPercent:bW(h.yPercent,r.yPercent),perspective:bW(h.transformPerspective,r.perspective)};
A=h.directionalRotation;if(A!=null){if(typeof(A)==="object"){for(x in A){h[x]=A[x]
}}else{h.rotation=A}}if(typeof(h.x)==="string"&&h.x.indexOf("%")!==-1){t.x=0;t.xPercent=bW(h.x,r.xPercent)
}if(typeof(h.y)==="string"&&h.y.indexOf("%")!==-1){t.y=0;t.yPercent=bW(h.y,r.yPercent)
}t.rotation=cM(("rotation" in h)?h.rotation:("shortRotation" in h)?h.shortRotation+"_short":("rotationZ" in h)?h.rotationZ:r.rotation,r.rotation,"rotation",l);
if(bo){t.rotationX=cM(("rotationX" in h)?h.rotationX:("shortRotationX" in h)?h.shortRotationX+"_short":r.rotationX||0,r.rotationX,"rotationX",l);
t.rotationY=cM(("rotationY" in h)?h.rotationY:("shortRotationY" in h)?h.shortRotationY+"_short":r.rotationY||0,r.rotationY,"rotationY",l)
}t.skewX=cM(h.skewX,r.skewX);t.skewY=cM(h.skewY,r.skewY)}}if(bo&&h.force3D!=null){r.force3D=h.force3D;
C=true}r.skewType=h.skewType||r.skewType||cy.defaultSkewType;o=(r.force3D||r.z||r.rotationX||r.rotationY||t.z||t.rotationX||t.rotationY||t.perspective);
if(!o&&h.scale!=null){t.scaleZ=1}while(--H>-1){B=bO[H];n=t[B]-r[B];if(n>v||n<-v||h[B]!=null||bC[B]!=null){C=true;
y=new b2(r,B,r[B],n,y);if(B in l){y.e=l[B]}y.xs0=0;y.plugin=m;q._overwriteProps.push(y.n)
}}n=h.transformOrigin;if(r.svg&&(n||h.svgOrigin)){j=r.xOffset;k=r.yOffset;bi(I,cv(n),t,h.svgOrigin,h.smoothOrigin);
y=a0(r,"xOrigin",(z?r:t).xOrigin,t.xOrigin,y,s);y=a0(r,"yOrigin",(z?r:t).yOrigin,t.yOrigin,y,s);
if(j!==r.xOffset||k!==r.yOffset){y=a0(r,"xOffset",(z?j:r.xOffset),r.xOffset,y,s);
y=a0(r,"yOffset",(z?k:r.yOffset),r.yOffset,y,s)}n="0px 0px"}if(n||(bo&&o&&r.zOrigin)){if(cm){C=true;
B=ci;n=(n||bM(I,B,bv,false,"50% 50%"))+"";y=new b2(G,B,0,0,y,-1,s);y.b=G[B];y.plugin=m;
if(bo){x=r.zOrigin;n=n.split(" ");r.zOrigin=((n.length>2&&!(x!==0&&n[2]==="0px"))?parseFloat(n[2]):x)||0;
y.xs0=y.e=n[0]+" "+(n[1]||"50%")+" 0px";y=new b2(r,"zOrigin",0,0,y,-1,y.n);y.b=x;
y.xs0=y.e=r.zOrigin}else{y.xs0=y.e=n}}else{cv(n+"",r)}}if(C){q._transformType=(!(r.svg&&bI)&&(o||this._transformType===3))?3:2
}if(w){E[F]=w}if(J){E.scale=J}return y},prefix:true});bx("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:true,color:true,multi:true,keyword:"inset"});
bx("borderRadius",{defaultValue:"0px",parser:function(F,u,C,n,B,k){u=this.format(u);
var l=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],x=F.style,t,z,A,j,E,D,s,r,G,y,v,h,m,o,w,q;
G=parseFloat(F.offsetWidth);y=parseFloat(F.offsetHeight);t=u.split(" ");for(z=0;
z<l.length;z++){if(this.p.indexOf("border")){l[z]=bu(l[z])}E=j=bM(F,l[z],bv,false,"0px");
if(E.indexOf(" ")!==-1){j=E.split(" ");E=j[0];j=j[1]}D=A=t[z];s=parseFloat(E);h=E.substr((s+"").length);
m=(D.charAt(1)==="=");if(m){r=parseInt(D.charAt(0)+"1",10);D=D.substr(2);r*=parseFloat(D);
v=D.substr((r+"").length-(r<0?1:0))||""}else{r=parseFloat(D);v=D.substr((r+"").length)
}if(v===""){v=br[C]||h}if(v!==h){o=bH(F,"borderLeft",s,h);w=bH(F,"borderTop",s,h);
if(v==="%"){E=(o/G*100)+"%";j=(w/y*100)+"%"}else{if(v==="em"){q=bH(F,"borderLeft",1,"em");
E=(o/q)+"em";j=(w/q)+"em"}else{E=o+"px";j=w+"px"}}if(m){D=(parseFloat(E)+r)+v;A=(parseFloat(j)+r)+v
}}B=bj(x,l[z],E+" "+j,D+" "+A,false,"0px",B)}return B},prefix:true,formatter:cH("0px 0px 0px 0px",false,true)});
bx("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",{defaultValue:"0px",parser:function(k,j,l,h,m,n){return bj(k.style,l,this.format(bM(k,l,bv,false,"0px 0px")),this.format(j),false,"0px",m)
},prefix:true,formatter:cH("0px 0px",false,true)});bx("backgroundPosition",{defaultValue:"0 0",parser:function(w,m,s,r,v,o){var t="background-position",n=(bv||ct(w,null)),x=this.format(((n)?bs?n.getPropertyValue(t+"-x")+" "+n.getPropertyValue(t+"-y"):n.getPropertyValue(t):w.currentStyle.backgroundPositionX+" "+w.currentStyle.backgroundPositionY)||"0 0"),y=this.format(m),k,l,q,h,j,u;
if((x.indexOf("%")!==-1)!==(y.indexOf("%")!==-1)&&y.split(",").length<2){u=bM(w,"backgroundImage").replace(cc,"");
if(u&&u!=="none"){k=x.split(" ");l=y.split(" ");bQ.setAttribute("src",u);q=2;while(--q>-1){x=k[q];
h=(x.indexOf("%")!==-1);if(h!==(l[q].indexOf("%")!==-1)){j=(q===0)?w.offsetWidth-bQ.width:w.offsetHeight-bQ.height;
k[q]=h?(parseFloat(x)/100*j)+"px":(parseFloat(x)/j*100)+"%"}}x=k.join(" ")}}return this.parseComplex(w.style,x,y,v,o)
},formatter:cv});bx("backgroundSize",{defaultValue:"0 0",formatter:function(h){h+="";
return cv(h.indexOf(" ")===-1?h+" "+h:h)}});bx("perspective",{defaultValue:"0px",prefix:true});
bx("perspectiveOrigin",{defaultValue:"50% 50%",prefix:true});bx("transformStyle",{prefix:true});
bx("backfaceVisibility",{prefix:true});bx("userSelect",{prefix:true});bx("margin",{parser:cp("marginTop,marginRight,marginBottom,marginLeft")});
bx("padding",{parser:cp("paddingTop,paddingRight,paddingBottom,paddingLeft")});
bx("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(j,l,m,q,h,o){var k,n,r;
if(bs<9){n=j.currentStyle;r=bs<8?" ":",";k="rect("+n.clipTop+r+n.clipRight+r+n.clipBottom+r+n.clipLeft+")";
l=this.format(l).split(",").join(r)}else{k=this.format(bM(j,this.p,bv,false,this.dflt));
l=this.format(l)}return this.parseComplex(j.style,k,l,h,o)}});bx("textShadow",{defaultValue:"0px 0px 0px #999",color:true,multi:true});
bx("autoRound,strictUnits",{parser:function(j,k,l,h,m){return m}});bx("border",{defaultValue:"0px solid #000",parser:function(j,m,n,r,h,o){var l=bM(j,"borderTopWidth",bv,false,"0px"),q=this.format(m).split(" "),k=q[0].replace(bT,"");
if(k!=="px"){l=(parseFloat(l)/bH(j,"borderTopWidth",1,k))+k}return this.parseComplex(j.style,this.format(l+" "+bM(j,"borderTopStyle",bv,false,"solid")+" "+bM(j,"borderTopColor",bv,false,"#000")),q.join(" "),h,o)
},color:true,formatter:function(j){var h=j.split(" ");return h[0]+" "+(h[1]||"solid")+" "+(j.match(cD)||["#000"])[0]
}});bx("borderWidth",{parser:cp("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")});
bx("float,cssFloat,styleFloat",{parser:function(m,k,l,j,n,o){var q=m.style,h=("cssFloat" in q)?"cssFloat":"styleFloat";
return new b2(q,h,0,0,n,-1,l,false,0,q[h],k)}});var cb=function(h){var m=this.t,k=m.filter||bM(this.data,"filter")||"",j=(this.s+this.c*h)|0,l;
if(j===100){if(k.indexOf("atrix(")===-1&&k.indexOf("radient(")===-1&&k.indexOf("oader(")===-1){m.removeAttribute("filter");
l=(!bM(this.data,"filter"))}else{m.filter=k.replace(bX,"");l=true}}if(!l){if(this.xn1){m.filter=k=k||("alpha(opacity="+j+")")
}if(k.indexOf("pacity")===-1){if(j!==0||!this.xn1){m.filter=k+" alpha(opacity="+j+")"
}}else{m.filter=k.replace(cs,"opacity="+j)}}};bx("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(j,l,q,o,h,n){var k=parseFloat(bM(j,"opacity",bv,false,"1")),r=j.style,m=(q==="autoAlpha");
if(typeof(l)==="string"&&l.charAt(1)==="="){l=((l.charAt(0)==="-")?-1:1)*parseFloat(l.substr(2))+k
}if(m&&k===1&&bM(j,"visibility",bv)==="hidden"&&l!==0){k=0}if(ce){h=new b2(r,"opacity",k,l-k,h)
}else{h=new b2(r,"opacity",k*100,(l-k)*100,h);h.xn1=m?1:0;r.zoom=1;h.type=2;h.b="alpha(opacity="+h.s+")";
h.e="alpha(opacity="+(h.s+h.c)+")";h.data=j;h.plugin=n;h.setRatio=cb}if(m){h=new b2(r,"visibility",0,0,h,-1,null,false,0,((k!==0)?"inherit":"hidden"),((l===0)?"hidden":"inherit"));
h.xs0="inherit";o._overwriteProps.push(h.n);o._overwriteProps.push(q)}return h}});
var cf=function(h,j){if(j){if(h.removeProperty){if(j.substr(0,2)==="ms"||j.substr(0,6)==="webkit"){j="-"+j
}h.removeProperty(j.replace(b7,"-$1").toLowerCase())}else{h.removeAttribute(j)}}},b0=function(k){this.t._gsClassPT=this;
if(k===1||k===0){this.t.setAttribute("class",(k===0)?this.b:this.e);var h=this.data,j=this.t.style;
while(h){if(!h.v){cf(j,h.p)}else{j[h.p]=h.v}h=h._next}if(k===1&&this.t._gsClassPT===this){this.t._gsClassPT=null
}}else{if(this.t.getAttribute("class")!==this.e){this.t.setAttribute("class",this.e)
}}};bx("className",{parser:function(j,o,w,t,h,q,n){var l=j.getAttribute("class")||"",v=j.style.cssText,u,k,s,r,m;
h=t._classNamePT=new b2(j,w,0,0,h,2);h.setRatio=b0;h.pr=-11;cA=true;h.b=l;k=cz(j,bv);
s=j._gsClassPT;if(s){r={};m=s.data;while(m){r[m.p]=1;m=m._next}s.setRatio(1)}j._gsClassPT=h;
h.e=(o.charAt(1)!=="=")?o:l.replace(new RegExp("(?:\\s|^)"+o.substr(2)+"(?![\\w-])"),"")+((o.charAt(0)==="+")?" "+o.substr(2):"");
j.setAttribute("class",h.e);u=bd(j,k,cz(j),n,r);j.setAttribute("class",l);h.data=u.firstMPT;
j.style.cssText=v;h=h.xfirst=t.parse(j,u.difs,h,q);return h}});var bB=function(o){if(o===1||o===0){if(this.data._totalTime===this.data._totalDuration&&this.data.data!=="isFromStart"){var l=this.t.style,h=bq.transform.parse,q,j,m,k,n;
if(this.e==="all"){l.cssText="";k=true}else{q=this.e.split(" ").join("").split(",");
m=q.length;while(--m>-1){j=q[m];if(bq[j]){if(bq[j].parse===h){k=true}else{j=(j==="transformOrigin")?ci:bq[j].p
}}cf(l,j)}}if(k){cf(l,cm);n=this.t._gsTransform;if(n){if(n.svg){this.t.removeAttribute("data-svg-origin");
this.t.removeAttribute("transform")}delete this.t._gsTransform}}}}};bx("clearProps",{parser:function(j,k,l,h,m){m=new b2(j,l,0,0,m,2);
m.setRatio=bB;m.e=k;m.pr=-10;m.data=h._tween;cA=true;return m}});cg="bezier,throwProps,physicsProps,physics2D".split(",");
ca=cg.length;while(ca--){bk(cg[ca])}cg=cy.prototype;cg._firstPT=cg._lastParsedTransform=cg._transform=null;
cg._onInitTween=function(s,q,k,u){if(!s.nodeType){return false}this._target=cB=s;
this._tween=k;this._vars=q;cq=u;bK=q.autoRound;cA=false;br=q.suffixMap||cy.suffixMap;
bv=ct(s,"");cK=this._overwriteProps;var t=s.style,l,h,n,v,m,w,o,j,r;if(cx){if(t.zIndex===""){l=bM(s,"zIndex",bv);
if(l==="auto"||l===""){this._addLazySet(t,"zIndex",0)}}}if(typeof(q)==="string"){v=t.cssText;
l=cz(s,bv);t.cssText=v+";"+q;l=bd(s,l,cz(s)).difs;if(!ce&&bg.test(q)){l.opacity=parseFloat(RegExp.$1)
}q=l;t.cssText=v}if(q.className){this._firstPT=h=bq.className.parse(s,q.className,"className",this,null,null,q)
}else{this._firstPT=h=this.parse(s,q,null)}if(this._transformType){r=(this._transformType===3);
if(!cm){t.zoom=1}else{if(bG){cx=true;if(t.zIndex===""){o=bM(s,"zIndex",bv);if(o==="auto"||o===""){this._addLazySet(t,"zIndex",0)
}}if(bf){this._addLazySet(t,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(r?"visible":"hidden"))
}}}n=h;while(n&&n._next){n=n._next}j=new b2(s,"transform",0,0,null,2);this._linkCSSP(j,null,n);
j.setRatio=cm?cR:cC;j.data=this._transform||bp(s,bv,true);j.tween=k;j.pr=-1;cK.pop()
}if(cA){while(h){w=h._next;n=v;while(n&&n.pr>h.pr){n=n._next}if((h._prev=n?n._prev:m)){h._prev._next=h
}else{v=h}if((h._next=n)){n._prev=h}else{m=h}h=w}this._firstPT=v}return true};cg.parse=function(n,m,w,q){var v=n.style,u,s,t,r,j,k,l,x,o,h;
for(u in m){k=m[u];if(typeof(k)==="function"){k=k(cq,cB)}s=bq[u];if(s){w=s.parse(n,k,u,this,w,q,m)
}else{j=bM(n,u,bv)+"";o=(typeof(k)==="string");if(u==="color"||u==="fill"||u==="stroke"||u.indexOf("Color")!==-1||(o&&cd.test(k))){if(!o){k=cN(k);
k=((k.length>3)?"rgba(":"rgb(")+k.join(",")+")"}w=bj(v,u,j,k,true,"transparent",w,0,q)
}else{if(o&&b6.test(k)){w=bj(v,u,j,k,true,null,w,0,q)}else{t=parseFloat(j);l=(t||t===0)?j.substr((t+"").length):"";
if(j===""||j==="auto"){if(u==="width"||u==="height"){t=cr(n,u,bv);l="px"}else{if(u==="left"||u==="top"){t=bn(n,u,bv);
l="px"}else{t=(u!=="opacity")?0:1;l=""}}}h=(o&&k.charAt(1)==="=");if(h){r=parseInt(k.charAt(0)+"1",10);
k=k.substr(2);r*=parseFloat(k);x=k.replace(bT,"")}else{r=parseFloat(k);x=o?k.replace(bT,""):""
}if(x===""){x=(u in br)?br[u]:l}k=(r||r===0)?(h?r+t:r)+x:m[u];if(l!==x){if(x!==""){if(r||r===0){if(t){t=bH(n,u,t,l);
if(x==="%"){t/=bH(n,u,100,"%")/100;if(m.strictUnits!==true){j=t+"%"}}else{if(x==="em"||x==="rem"||x==="vw"||x==="vh"){t/=bH(n,u,1,x)
}else{if(x!=="px"){r=bH(n,u,r,x);x="px"}}}if(h){if(r||r===0){k=(r+t)+x}}}}}}if(h){r+=t
}if((t||t===0)&&(r||r===0)){w=new b2(v,u,t,r-t,w,0,u,(bK!==false&&(x==="px"||u==="zIndex")),0,j,k);
w.xs0=x}else{if(v[u]===undefined||!k&&(k+""==="NaN"||k==null)){bN("invalid "+u+" tween value: "+m[u])
}else{w=new b2(v,u,r||t||0,0,w,-1,u,false,0,j,k);w.xs0=(k==="none"&&(u==="display"||u.indexOf("Style")!==-1))?j:k
}}}}}if(q){if(w&&!w.plugin){w.plugin=q}}}return w};cg.setRatio=function(n){var k=this._firstPT,l=0.000001,h,j,m;
if(n===1&&(this._tween._time===this._tween._duration||this._tween._time===0)){while(k){if(k.type!==2){if(k.r&&k.type!==-1){h=Math.round(k.s+k.c);
if(!k.type){k.t[k.p]=h+k.xs0}else{if(k.type===1){m=k.l;j=k.xs0+h+k.xs1;for(m=1;
m<k.l;m++){j+=k["xn"+m]+k["xs"+(m+1)]}k.t[k.p]=j}}}else{k.t[k.p]=k.e}}else{k.setRatio(n)
}k=k._next}}else{if(n||!(this._tween._time===this._tween._duration||this._tween._time===0)||this._tween._rawPrevTime===-0.000001){while(k){h=k.c*n+k.s;
if(k.r){h=Math.round(h)}else{if(h<l){if(h>-l){h=0}}}if(!k.type){k.t[k.p]=h+k.xs0
}else{if(k.type===1){m=k.l;if(m===2){k.t[k.p]=k.xs0+h+k.xs1+k.xn1+k.xs2}else{if(m===3){k.t[k.p]=k.xs0+h+k.xs1+k.xn1+k.xs2+k.xn2+k.xs3
}else{if(m===4){k.t[k.p]=k.xs0+h+k.xs1+k.xn1+k.xs2+k.xn2+k.xs3+k.xn3+k.xs4}else{if(m===5){k.t[k.p]=k.xs0+h+k.xs1+k.xn1+k.xs2+k.xn2+k.xs3+k.xn3+k.xs4+k.xn4+k.xs5
}else{j=k.xs0+h+k.xs1;for(m=1;m<k.l;m++){j+=k["xn"+m]+k["xs"+(m+1)]}k.t[k.p]=j}}}}}else{if(k.type===-1){k.t[k.p]=k.xs0
}else{if(k.setRatio){k.setRatio(n)}}}}k=k._next}}else{while(k){if(k.type!==2){k.t[k.p]=k.b
}else{k.setRatio(n)}k=k._next}}}};cg._enableTransforms=function(h){this._transform=this._transform||bp(this._target,bv,true);
this._transformType=(!(this._transform.svg&&bI)&&(h||this._transformType===3))?3:2
};var b4=function(h){this.t[this.p]=this.e;this.data._linkCSSP(this,this._next,null,true)
};cg._addLazySet=function(l,j,h){var k=this._firstPT=new b2(l,j,0,0,this._firstPT,2);
k.e=h;k.setRatio=b4;k.data=this};cg._linkCSSP=function(j,l,k,h){if(j){if(l){l._prev=j
}if(j._next){j._next._prev=j._prev}if(j._prev){j._prev._next=j._next}else{if(this._firstPT===j){this._firstPT=j._next;
h=true}}if(k){k._next=j}else{if(!h&&this._firstPT===null){this._firstPT=j}}j._next=l;
j._prev=k}return j};cg._mod=function(j){var h=this._firstPT;while(h){if(typeof(j[h.p])==="function"&&j[h.p]===Math.round){h.r=1
}h=h._next}};cg._kill=function(k){var j=k,l,m,h;if(k.autoAlpha||k.alpha){j={};for(m in k){j[m]=k[m]
}j.opacity=1;if(j.autoAlpha){j.visibility=1}}if(k.className&&(l=this._classNamePT)){h=l.xfirst;
if(h&&h._prev){this._linkCSSP(h._prev,l._next,h._prev._prev)}else{if(h===this._firstPT){this._firstPT=l._next
}}if(l._next){this._linkCSSP(l._next,l._next._next,h._prev)}this._classNamePT=null
}l=this._firstPT;while(l){if(l.plugin&&l.plugin!==m&&l.plugin._kill){l.plugin._kill(k);
m=l.plugin}l=l._next}return bJ.prototype._kill.call(this,j)};var cL=function(j,k,o){var m,n,h,l;
if(j.slice){n=j.length;while(--n>-1){cL(j[n],k,o)}return}m=j.childNodes;n=m.length;
while(--n>-1){h=m[n];l=h.type;if(h.style){k.push(cz(h));if(o){o.push(h)}}if((l===1||l===9||l===11)&&h.childNodes.length){cL(h,k,o)
}}};cy.cascadeTo=function(o,t,m){var h=p.to(o,t,m),r=[h],l=[],n=[],q=[],j=p._internals.reservedProps,s,u,v,k;
o=h._targets||h.target;cL(o,l,q);h.render(t,true,true);cL(o,n);h.render(0,true,true);
h._enabled(true);s=q.length;while(--s>-1){u=bd(q[s],l[s],n[s]);if(u.firstMPT){u=u.difs;
for(v in m){if(j[v]){u[v]=m[v]}}k={};for(v in u){k[v]=l[s][v]}r.push(p.fromTo(q[s],t,k,u))
}}return r};bJ.activate([cy]);return cy},true)});if(b._gsDefine){b._gsQueue.pop()()
}(function(i){var c=function(){return(b.GreenSockGlobals||b)[i]};if(typeof(define)==="function"&&define.amd){define(["./TweenLite"],c)
}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");g.exports=c()}}}("CSSPlugin"))
}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./TweenLite.js":265}],253:[function(d,g,f){(function(a){
/*!
 * VERSION: 0.6.4
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){b._gsDefine("plugins.CSSRulePlugin",["plugins.TweenPlugin","TweenLite","plugins.CSSPlugin"],function(r,p,n){var q=function(){r.call(this,"cssRule");
this._overwriteProps.length=0},c=b.document,s=n.prototype.setRatio,o=q.prototype=new n();
o._propName="cssRule";o.constructor=q;q.version="0.6.4";q.API=2;q.getRule=function(k){var x=c.all?"rules":"cssRules",m=c.styleSheets,i=m.length,y=(k.charAt(0)===":"),j,l,h,z;
k=(y?"":",")+k.toLowerCase()+",";if(y){z=[]}while(--i>-1){try{l=m[i][x];if(!l){continue
}j=l.length}catch(A){console.log(A);continue}while(--j>-1){h=l[j];if(h.selectorText&&(","+h.selectorText.split("::").join(":").toLowerCase()+",").indexOf(k)!==-1){if(y){z.push(h.style)
}else{return h.style}}}}return z};o._onInitTween=function(i,j,k){if(i.cssText===undefined){return false
}var h=i._gsProxy=i._gsProxy||c.createElement("div");this._ss=i;this._proxy=h.style;
h.style.cssText=i.cssText;n.prototype._onInitTween.call(this,h,j,k);return true
};o.setRatio=function(h){s.call(this,h);this._ss.cssText=this._proxy.cssText};r.activate([q]);
return q},true)});if(b._gsDefine){b._gsQueue.pop()()}(function(i){var c=function(){return(b.GreenSockGlobals||b)[i]
};if(typeof(define)==="function"&&define.amd){define(["./TweenLite"],c)}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");
g.exports=c()}}}("CSSRulePlugin"))}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./TweenLite.js":265}],254:[function(d,g,f){(function(a){
/*!
 * VERSION: beta 1.5.0
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){var c=/(\d|\.)+/g,v=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,p={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},u=function(h,i,j){h=(h<0)?h+1:(h>1)?h-1:h;
return((((h*6<1)?i+(j-i)*h*6:(h<0.5)?j:(h*3<2)?i+(j-i)*(2/3-h)*6:i)*255)+0.5)|0
},z=function(I,q){var h,k,m,i,o,H,G,j,r,l,n;if(!I){h=p.black}else{if(typeof(I)==="number"){h=[I>>16,(I>>8)&255,I&255]
}else{if(I.charAt(I.length-1)===","){I=I.substr(0,I.length-1)}if(p[I]){h=p[I]}else{if(I.charAt(0)==="#"){if(I.length===4){k=I.charAt(1);
m=I.charAt(2);i=I.charAt(3);I="#"+k+k+m+m+i+i}I=parseInt(I.substr(1),16);h=[I>>16,(I>>8)&255,I&255]
}else{if(I.substr(0,3)==="hsl"){h=n=I.match(c);if(!q){o=(Number(h[0])%360)/360;
H=Number(h[1])/100;G=Number(h[2])/100;m=(G<=0.5)?G*(H+1):G+H-G*H;k=G*2-m;if(h.length>3){h[3]=Number(I[3])
}h[0]=u(o+1/3,k,m);h[1]=u(o,k,m);h[2]=u(o-1/3,k,m)}else{if(I.indexOf("=")!==-1){return I.match(v)
}}}else{h=I.match(c)||p.transparent}}}h[0]=Number(h[0]);h[1]=Number(h[1]);h[2]=Number(h[2]);
if(h.length>3){h[3]=Number(h[3])}}}if(q&&!n){k=h[0]/255;m=h[1]/255;i=h[2]/255;j=Math.max(k,m,i);
r=Math.min(k,m,i);G=(j+r)/2;if(j===r){o=H=0}else{l=j-r;H=G>0.5?l/(2-j-r):l/(j+r);
o=(j===k)?(m-i)/l+(m<i?6:0):(j===m)?(i-k)/l+2:(k-m)/l+4;o*=60}h[0]=(o+0.5)|0;h[1]=(H*100+0.5)|0;
h[2]=(G*100+0.5)|0}return h},s=function(h,n){var m=(h+"").match(w)||[],o=0,j=m.length?"":h,i,k,l;
for(i=0;i<m.length;i++){k=m[i];l=h.substr(o,h.indexOf(k,o)-o);o+=l.length+k.length;
k=z(k,n);if(k.length===3){k.push(1)}j+=l+(n?"hsla("+k[0]+","+k[1]+"%,"+k[2]+"%,"+k[3]:"rgba("+k.join(","))+")"
}return j+h.substr(o)},A,y,x=b.TweenLite,w="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b",t=b._gsDefine.plugin({propName:"colorProps",version:"1.5.0",priority:-1,API:2,global:true,init:function(o,j,k,m){var h,l,i,n;
this._target=o;this._proxy=l=((j.format+"").toUpperCase()==="NUMBER")?{}:0;for(h in j){if(h!=="format"){if(l){this._firstNumPT=i={_next:this._firstNumPT,t:o,p:h,f:(typeof(o[h])==="function")};
l[h]="rgb("+z(!i.f?o[h]:o[((h.indexOf("set")||typeof(o["get"+h.substr(3)])!=="function")?h:"get"+h.substr(3))]()).join(",")+")";
n=j[h];if(typeof(n)==="function"){n=n(m,o)}this._addTween(l,h,"get",((typeof(n)==="number")?"rgb("+z(n,false).join(",")+")":n),h,null,null,y)
}else{this._addTween(o,h,"get",j[h],h,null,null,y,m)}}}return true},set:function(j){var i=this._firstNumPT,h;
this._super.setRatio.call(this,j);while(i){h=z(this._proxy[i.p],false);h=h[0]<<16|h[1]<<8|h[2];
if(i.f){this._target[i.p](h)}else{this._target[i.p]=h}i=i._next}}});for(A in p){w+="|"+A+"\\b"
}w=new RegExp(w+")","gi");t.colorStringFilter=y=function(j){var i=j[0]+j[1],h;w.lastIndex=0;
if(w.test(i)){h=(i.indexOf("hsl(")!==-1||i.indexOf("hsla(")!==-1);j[0]=s(j[0],h);
j[1]=s(j[1],h)}};if(!x.defaultStringFilter){x.defaultStringFilter=t.colorStringFilter
}t.parseColor=z;A=t.prototype;A._firstNumPT=null;A._kill=function(h){var i=this._firstNumPT,j;
while(i){if(i.p in h){if(i===A._firstNumPT){this._firstNumPT=i._next}if(j){j._next=i._next
}}else{j=i}i=i._next}return this._super._kill(h)}});if(b._gsDefine){b._gsQueue.pop()()
}(function(i){var c=function(){return(b.GreenSockGlobals||b)[i]};if(typeof(define)==="function"&&define.amd){define(["./TweenLite"],c)
}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");g.exports=c()}}}("ColorPropsPlugin"))
}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./TweenLite.js":265}],255:[function(d,g,f){(function(a){
/*!
 * VERSION: 0.3.0
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){b._gsDefine.plugin({propName:"directionalRotation",version:"0.3.0",API:2,init:function(w,t,c,x){if(typeof(t)!=="object"){t={rotation:t}
}this.finals={};var C=(t.useRadians===true)?Math.PI*2:360,y=0.000001,A,p,B,z,u,v;
for(A in t){if(A!=="useRadians"){z=t[A];if(typeof(z)==="function"){z=z(x,w)}v=(z+"").split("_");
p=v[0];B=parseFloat((typeof(w[A])!=="function")?w[A]:w[((A.indexOf("set")||typeof(w["get"+A.substr(3)])!=="function")?A:"get"+A.substr(3))]());
z=this.finals[A]=(typeof(p)==="string"&&p.charAt(1)==="=")?B+parseInt(p.charAt(0)+"1",10)*Number(p.substr(2)):Number(p)||0;
u=z-B;if(v.length){p=v.join("_");if(p.indexOf("short")!==-1){u=u%C;if(u!==u%(C/2)){u=(u<0)?u+C:u-C
}}if(p.indexOf("_cw")!==-1&&u<0){u=((u+C*9999999999)%C)-((u/C)|0)*C}else{if(p.indexOf("ccw")!==-1&&u>0){u=((u-C*9999999999)%C)-((u/C)|0)*C
}}}if(u>y||u<-y){this._addTween(w,A,B,B+u,A);this._overwriteProps.push(A)}}}return true
},set:function(i){var c;if(i!==1){this._super.setRatio.call(this,i)}else{c=this._firstPT;
while(c){if(c.f){c.t[c.p](this.finals[c.p])}else{c.t[c.p]=this.finals[c.p]}c=c._next
}}}})._autoCSS=true});if(b._gsDefine){b._gsQueue.pop()()}(function(i){var c=function(){return(b.GreenSockGlobals||b)[i]
};if(typeof(define)==="function"&&define.amd){define(["./TweenLite"],c)}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");
g.exports=c()}}}("DirectionalRotationPlugin"))}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./TweenLite.js":265}],256:[function(d,g,f){(function(a){
/*!
 * VERSION: 0.15.0
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Requires TweenLite and CSSPlugin version 1.17.0 or later (TweenMax contains both TweenLite and CSSPlugin). ThrowPropsPlugin is required for momentum-based continuation of movement after the mouse/touch is released (ThrowPropsPlugin is a membership benefit of Club GreenSock - http://greensock.com/club/).
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){b._gsDefine("utils.Draggable",["events.EventDispatcher","TweenLite","plugins.CSSPlugin"],function(cA,bU,bN){var c={css:{}},bv={css:{}},bw={css:{}},ce={css:{}},bS=b._gsDefine.globals,p={},bx={style:{}},cs=b.document||{createElement:function(){return bx
}},bz=cs.documentElement||{},ck=function(h){return cs.createElementNS?cs.createElementNS("http://www.w3.org/1999/xhtml",h):cs.createElement(h)
},cF=ck("div"),a8=[],b4=function(){return false},cD=180/Math.PI,bH=999999999999999,cb=Date.now||function(){return new Date().getTime()
},bi=!!(!cs.addEventListener&&cs.all),bc=cs.createElement("div"),bE=[],cH={},cx=0,cI=/^(?:a|input|textarea|button|select)$/i,a0=0,cm,b3,cu=(navigator.userAgent.toLowerCase().indexOf("android")!==-1),bp=0,cz={},b5={},bj=function(h){if(typeof(h)==="string"){h=bU.selector(h)
}if(!h||h.nodeType){return[h]}var j=[],i=h.length,k;for(k=0;k!==i;j.push(h[k++])){}return j
},bs=function(k,i){var j={},h;if(i){for(h in k){j[h]=k[h]*i}}else{for(h in k){j[h]=k[h]
}}return j},bu,bV=function(){var h=bE.length;while(--h>-1){bE[h]()}},b0=function(h){bE.push(h);
if(bE.length===1){bU.ticker.addEventListener("tick",bV,this,false,1)}},b9=function(h){var i=bE.length;
while(--i>-1){if(bE[i]===h){bE.splice(i,1)}}bU.to(ca,0,{overwrite:"all",delay:15,onComplete:ca})
},ca=function(){if(!bE.length){bU.ticker.removeEventListener("tick",bV)}},bJ=function(j,h){var i;
for(i in h){if(j[i]===undefined){j[i]=h[i]}}return j},bT=function(){return(window.pageYOffset!=null)?window.pageYOffset:(cs.scrollTop!=null)?cs.scrollTop:bz.scrollTop||cs.body.scrollTop||0
},bP=function(){return(window.pageXOffset!=null)?window.pageXOffset:(cs.scrollLeft!=null)?cs.scrollLeft:bz.scrollLeft||cs.body.scrollLeft||0
},cg=function(i,h){cr(i,"scroll",h);if(!ct(i.parentNode)){cg(i.parentNode,h)}},bB=function(i,h){cw(i,"scroll",h);
if(!ct(i.parentNode)){bB(i.parentNode,h)}},ct=function(h){return !!(!h||h===bz||h===cs||h===cs.body||h===window||!h.nodeType||!h.parentNode)
},cn=function(m,l){var k=(l==="x")?"Width":"Height",i="scroll"+k,h="client"+k,j=cs.body;
return Math.max(0,ct(m)?Math.max(bz[i],j[i])-(window["inner"+k]||bz[h]||j[h]):m[i]-m[h])
},bR=function(h){var i=ct(h),j=cn(h,"x"),k=cn(h,"y");if(i){h=b5}else{bR(h.parentNode)
}h._gsMaxScrollX=j;h._gsMaxScrollY=k;h._gsScrollX=h.scrollLeft||0;h._gsScrollY=h.scrollTop||0
},cy=function(h,i){h=h||window.event;p.pageX=h.clientX+cs.body.scrollLeft+bz.scrollLeft;
p.pageY=h.clientY+cs.body.scrollTop+bz.scrollTop;if(i){h.returnValue=false}return p
},bY=function(h){if(!h){return h}if(typeof(h)==="string"){h=bU.selector(h)}if(h.length&&h!==window&&h[0]&&h[0].style&&!h.nodeType){h=h[0]
}return(h===window||(h.nodeType&&h.style))?h:null},cG=function(j,k){var l=j.style,i,m,h;
if(l[k]===undefined){h=["O","Moz","ms","Ms","Webkit"];m=5;i=k.charAt(0).toUpperCase()+k.substr(1);
while(--m>-1&&l[h[m]+i]===undefined){}if(m<0){return""}cm=(m===3)?"ms":h[m];k=cm+i
}return k},co=function(j,k,h){var i=j.style;if(!i){return}if(i[k]===undefined){k=cG(j,k)
}if(h==null){if(i.removeProperty){i.removeProperty(k.replace(/([A-Z])/g,"-$1").toLowerCase())
}else{i.removeAttribute(k)}}else{if(i[k]!==undefined){i[k]=h}}},cC=cs.defaultView?cs.defaultView.getComputedStyle:b4,bI=/(?:Left|Right|Width)/i,b6=/(?:\d|\-|\+|=|#|\.)*/g,bA=function(h,o,j,l,r){if(l==="px"||!l){return j
}if(l==="auto"||!j){return 0}var i=bI.test(o),n=h,q=cF.style,m=(j<0),k;if(m){j=-j
}if(l==="%"&&o.indexOf("border")!==-1){k=(j/100)*(i?h.clientWidth:h.clientHeight)
}else{q.cssText="border:0 solid red;position:"+bG(h,"position",true)+";line-height:0;";
if(l==="%"||!n.appendChild){n=h.parentNode||cs.body;q[(i?"width":"height")]=j+l
}else{q[(i?"borderLeftWidth":"borderTopWidth")]=j+l}n.appendChild(cF);k=parseFloat(cF[(i?"offsetWidth":"offsetHeight")]);
n.removeChild(cF);if(k===0&&!r){k=bA(h,o,j,l,true)}}return m?-k:k},bn=function(h,j){if(bG(h,"position",true)!=="absolute"){return 0
}var k=((j==="left")?"Left":"Top"),i=bG(h,"margin"+k,true);return h["offset"+k]-(bA(h,j,parseFloat(i),(i+"").replace(b6,""))||0)
},bG=function(j,k,h){var l=(j._gsTransform||{})[k],i;if(l||l===0){return l}else{if(j.style[k]){l=j.style[k]
}else{if((i=cC(j))){l=i.getPropertyValue(k.replace(/([A-Z])/g,"-$1").toLowerCase());
l=(l||i.length)?l:i[k]}else{if(j.currentStyle){l=j.currentStyle[k]}}}}if(l==="auto"&&(k==="top"||k==="left")){l=bn(j,k)
}return h?l:parseFloat(l)||0},cK=function(k,h,l){var m=k.vars,j=m[l],i=k._listeners[h];
if(typeof(j)==="function"){j.apply(m[l+"Scope"]||m.callbackScope||k,m[l+"Params"]||[k.pointerEvent])
}if(i){k.dispatchEvent(h)}},bd=function(l,k){var m=bY(l),h,i,j;if(!m){if(l.left!==undefined){j=bD(k);
return{left:l.left-j.x,top:l.top-j.y,width:l.width,height:l.height}}i=l.min||l.minX||l.minRotation||0;
h=l.min||l.minY||0;return{left:i,top:h,width:(l.max||l.maxX||l.maxRotation||0)-i,height:(l.max||l.maxY||0)-h}
}return be(m,k)},bQ,bZ,bL,bW,cc,ba=function(){if(!cs.createElementNS){bQ=0;bZ=false;
return}var q=ck("div"),m=cs.createElementNS("http://www.w3.org/2000/svg","svg"),o=ck("div"),n=q.style,j=cs.body||bz,k,l,i,h;
if(cs.body&&cv){n.position="absolute";j.appendChild(o);o.appendChild(q);h=q.offsetParent;
o.style[cv]="rotate(1deg)";cc=(q.offsetParent===h);o.style.position="absolute";
n.height="10px";h=q.offsetTop;o.style.border="5px solid red";bW=(h!==q.offsetTop);
j.removeChild(o)}n=m.style;m.setAttributeNS(null,"width","400px");m.setAttributeNS(null,"height","400px");
m.setAttributeNS(null,"viewBox","0 0 400 400");n.display="block";n.boxSizing="border-box";
n.border="0px solid red";n.transform="none";q.style.cssText="width:100px;height:100px;overflow:scroll;-ms-overflow-style:none;";
j.appendChild(q);q.appendChild(m);i=m.createSVGPoint().matrixTransform(m.getScreenCTM());
l=i.y;q.scrollTop=100;i.x=i.y=0;i=i.matrixTransform(m.getScreenCTM());bL=(l-i.y<100.1)?0:l-i.y-150;
q.removeChild(m);j.removeChild(q);j.appendChild(m);k=m.getScreenCTM();l=k.e;n.border="50px solid red";
k=m.getScreenCTM();if(l===0&&k.e===0&&k.f===0&&k.a===1){bQ=1;bZ=true}else{bQ=(l!==k.e)?1:0;
bZ=(k.a!==1)}j.removeChild(m)},bo=(cG(cF,"perspective")!==""),br=cG(cF,"transformOrigin").replace(/^ms/g,"Ms").replace(/([A-Z])/g,"-$1").toLowerCase(),cv=cG(cF,"transform"),bX=cv.replace(/^ms/g,"Ms").replace(/([A-Z])/g,"-$1").toLowerCase(),cj={},cl={},b7=window.SVGElement,bg=function(h){return !!(b7&&typeof(h.getBBox)==="function"&&h.getCTM&&(!h.parentNode||(h.parentNode.getBBox&&h.parentNode.getCTM)))
},cE=(((/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(navigator.userAgent)||(/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/).exec(navigator.userAgent))&&parseFloat(RegExp.$1)<11),bC=[],cJ=[],bm=function(n){if(!n.getBoundingClientRect||!n.parentNode||!cv){return{offsetTop:0,offsetLeft:0,scaleX:1,scaleY:1,offsetParent:bz}
}if(cf.cacheSVGData!==false&&n._dCache&&n._dCache.lastUpdate===bU.ticker.frame){return n._dCache
}var l=n,w=a9(n),s,i,v,o,t,r,k,m,h,q,u,j;w.lastUpdate=bU.ticker.frame;if(n.getBBox&&!w.isSVGRoot){l=n.parentNode;
s=n.getBBox();while(l&&(l.nodeName+"").toLowerCase()!=="svg"){l=l.parentNode}o=bm(l);
w.offsetTop=s.y*o.scaleY;w.offsetLeft=s.x*o.scaleX;w.scaleX=o.scaleX;w.scaleY=o.scaleY;
w.offsetParent=l||bz;return w}v=w.offsetParent;if(v===cs.body){v=bz}cJ.length=bC.length=0;
while(l){t=bG(l,cv,true);if(t!=="matrix(1, 0, 0, 1, 0, 0)"&&t!=="none"&&t!=="translate3d(0px, 0px, 0px)"){cJ.push(l);
bC.push(l.style[cv]);l.style[cv]="none"}if(l===v){break}l=l.parentNode}i=v.getBoundingClientRect();
t=n.getScreenCTM();m=n.createSVGPoint();k=m.matrixTransform(t);m.x=m.y=10;m=m.matrixTransform(t);
w.scaleX=(m.x-k.x)/10;w.scaleY=(m.y-k.y)/10;if(bQ===undefined){ba()}if(w.borderBox&&!bZ&&n.getAttribute("width")){o=cC(n)||{};
h=(parseFloat(o.borderLeftWidth)+parseFloat(o.borderRightWidth))||0;q=(parseFloat(o.borderTopWidth)+parseFloat(o.borderBottomWidth))||0;
u=parseFloat(o.width)||0;j=parseFloat(o.height)||0;w.scaleX*=(u-h)/u;w.scaleY*=(j-q)/j
}if(bL){s=n.getBoundingClientRect();w.offsetLeft=s.left-i.left;w.offsetTop=s.top-i.top
}else{w.offsetLeft=k.x-i.left;w.offsetTop=k.y-i.top}w.offsetParent=v;r=cJ.length;
while(--r>-1){cJ[r].style[cv]=bC[r]}return w},bD=function(l,m){m=m||{};if(!l||l===bz||!l.parentNode||l===window){return{x:0,y:0}
}var n=cC(l),h=(br&&n)?n.getPropertyValue(br):"50% 50%",i=h.split(" "),k=(h.indexOf("left")!==-1)?"0%":(h.indexOf("right")!==-1)?"100%":i[0],j=(h.indexOf("top")!==-1)?"0%":(h.indexOf("bottom")!==-1)?"100%":i[1];
if(j==="center"||j==null){j="50%"}if(k==="center"||isNaN(parseFloat(k))){k="50%"
}if(l.getBBox&&bg(l)){if(!l._gsTransform){bU.set(l,{x:"+=0",overwrite:false});if(l._gsTransform.xOrigin===undefined){console.log("Draggable requires at least GSAP 1.17.0")
}}h=l.getBBox();m.x=(l._gsTransform.xOrigin-h.x);m.y=(l._gsTransform.yOrigin-h.y)
}else{if(l.getBBox&&(k+j).indexOf("%")!==-1){l=l.getBBox();l={offsetWidth:l.width,offsetHeight:l.height}
}m.x=((k.indexOf("%")!==-1)?l.offsetWidth*parseFloat(k)/100:parseFloat(k));m.y=((j.indexOf("%")!==-1)?l.offsetHeight*parseFloat(j)/100:parseFloat(j))
}return m},a9=function(m){if(cf.cacheSVGData!==false&&m._dCache&&m._dCache.lastUpdate===bU.ticker.frame){return m._dCache
}var k=m._dCache=m._dCache||{},i=cC(m),j=(m.getBBox&&bg(m)),h=((m.nodeName+"").toLowerCase()==="svg"),l;
k.isSVG=j;k.isSVGRoot=h;k.borderBox=(i.boxSizing==="border-box");k.computedStyle=i;
if(h){l=m.parentNode||bz;l.insertBefore(cF,m);k.offsetParent=cF.offsetParent||bz;
l.removeChild(cF)}else{if(j){l=m.parentNode;while(l&&(l.nodeName+"").toLowerCase()!=="svg"){l=l.parentNode
}k.offsetParent=l}else{k.offsetParent=m.offsetParent}}return k},bt=function(A,k,E,i){if(A===window||!A||!A.style||!A.parentNode){return[1,0,0,1,0,0]
}var n=A._dCache||a9(A),s=A.parentNode,t=s._dCache||a9(s),v=n.computedStyle,x=n.isSVG?t.offsetParent:s.offsetParent,h,D,u,w,o,j,l,z,B,C,m,y,q,r;
h=(n.isSVG&&(A.style[cv]+"").indexOf("matrix")!==-1)?A.style[cv]:v?v.getPropertyValue(bX):A.currentStyle?A.currentStyle[cv]:"1,0,0,1,0,0";
if(A.getBBox&&(A.getAttribute("transform")+"").indexOf("matrix")!==-1){h=A.getAttribute("transform")
}h=(h+"").match(/(?:\-|\.|\b)(\d|\.|e\-)+/g)||[1,0,0,1,0,0];if(h.length>6){h=[h[0],h[1],h[4],h[5],h[12],h[13]]
}if(i){h[4]=h[5]=0}else{if(n.isSVG&&(o=A._gsTransform)&&(o.xOrigin||o.yOrigin)){h[0]=parseFloat(h[0]);
h[1]=parseFloat(h[1]);h[2]=parseFloat(h[2]);h[3]=parseFloat(h[3]);h[4]=parseFloat(h[4])-(o.xOrigin-(o.xOrigin*h[0]+o.yOrigin*h[2]));
h[5]=parseFloat(h[5])-(o.yOrigin-(o.xOrigin*h[1]+o.yOrigin*h[3]))}}if(k){if(bQ===undefined){ba()
}u=(n.isSVG||n.isSVGRoot)?bm(A):A;if(n.isSVG){w=A.getBBox();C=(t.isSVGRoot)?{x:0,y:0}:s.getBBox();
u={offsetLeft:w.x-C.x,offsetTop:w.y-C.y,offsetParent:n.offsetParent}}else{if(n.isSVGRoot){m=parseInt(v.borderTopWidth,10)||0;
y=parseInt(v.borderLeftWidth,10)||0;q=((h[0]-bQ)*y+h[2]*m);r=(h[1]*y+(h[3]-bQ)*m);
j=k.x;l=k.y;z=(j-(j*h[0]+l*h[2]));B=(l-(j*h[1]+l*h[3]));h[4]=parseFloat(h[4])+z;
h[5]=parseFloat(h[5])+B;k.x-=z;k.y-=B;j=u.scaleX;l=u.scaleY;k.x*=j;k.y*=l;h[0]*=j;
h[1]*=l;h[2]*=j;h[3]*=l;if(!cE){k.x+=q;k.y+=r}}else{if(!bW&&A.offsetParent){k.x+=parseInt(bG(A.offsetParent,"borderLeftWidth"),10)||0;
k.y+=parseInt(bG(A.offsetParent,"borderTopWidth"),10)||0}}}D=(s===bz||s===cs.body);
h[4]=Number(h[4])+k.x+(u.offsetLeft||0)-E.x-(D?0:s.scrollLeft||0);h[5]=Number(h[5])+k.y+(u.offsetTop||0)-E.y-(D?0:s.scrollTop||0);
if(s&&bG(A,"position",v)==="fixed"){h[4]+=bP();h[5]+=bT()}if(s&&s!==bz&&x===u.offsetParent&&!t.isSVG&&(!cc||bt(s).join("")==="100100")){u=(t.isSVGRoot)?bm(s):s;
h[4]-=u.offsetLeft||0;h[5]-=u.offsetTop||0;if(!bW&&t.offsetParent&&!n.isSVG&&!n.isSVGRoot){h[4]-=parseInt(bG(t.offsetParent,"borderLeftWidth"),10)||0;
h[5]-=parseInt(bG(t.offsetParent,"borderTopWidth"),10)||0}}}return h},cp=function(o,h){if(!o||o===window||!o.parentNode){return[1,0,0,1,0,0]
}var q=bD(o,cj),s=bD(o.parentNode,cl),u=bt(o,q,s),j,k,m,n,r,t,i,l;while((o=o.parentNode)&&o.parentNode&&o!==bz){q=s;
s=bD(o.parentNode,(q===cj)?cl:cj);i=bt(o,q,s);j=u[0];k=u[1];m=u[2];n=u[3];r=u[4];
t=u[5];u[0]=j*i[0]+k*i[2];u[1]=j*i[1]+k*i[3];u[2]=m*i[0]+n*i[2];u[3]=m*i[1]+n*i[3];
u[4]=r*i[0]+t*i[2]+i[4];u[5]=r*i[1]+t*i[3]+i[5]}if(h){j=u[0];k=u[1];m=u[2];n=u[3];
r=u[4];t=u[5];l=(j*n-k*m);u[0]=n/l;u[1]=-k/l;u[2]=-m/l;u[3]=j/l;u[4]=(m*t-n*r)/l;
u[5]=-(j*t-k*r)/l}return u},bf=function(l,m,j,n,o){l=bY(l);var h=cp(l,false,o),i=m.x,k=m.y;
if(j){bD(l,m);i-=m.x;k-=m.y}n=(n===true)?m:n||{};n.x=i*h[0]+k*h[2]+h[4];n.y=i*h[1]+k*h[3]+h[5];
return n},b8=function(k,l,h){var i=k.x*l[0]+k.y*l[2]+l[4],j=k.x*l[1]+k.y*l[3]+l[5];
k.x=i*h[0]+j*h[2]+h[4];k.y=i*h[1]+j*h[3]+h[5];return k},be=function(D,s,C){if(!(D=bY(D))){return null
}s=bY(s);var H=(D.getBBox&&bg(D)),z,r,B,i,n,o,m,u,v,x,w,y,E,h,k,t,j,l,F,G,A,q;if(D===window){i=bT();
r=bP();B=r+(bz.clientWidth||D.innerWidth||cs.body.clientWidth||0);n=i+(((D.innerHeight||0)-20<bz.clientHeight)?bz.clientHeight:D.innerHeight||cs.body.clientHeight||0)
}else{if(s===undefined||s===window){return D.getBoundingClientRect()}else{z=bD(D);
r=-z.x;i=-z.y;if(H){y=D.getBBox();E=y.width;h=y.height}else{if((D.nodeName+"").toLowerCase()!=="svg"&&D.offsetWidth){E=D.offsetWidth;
h=D.offsetHeight}else{A=cC(D);E=parseFloat(A.width);h=parseFloat(A.height)}}B=r+E;
n=i+h;if(D.nodeName.toLowerCase()==="svg"&&!bi){k=bm(D);q=k.computedStyle||{};l=(D.getAttribute("viewBox")||"0 0").split(" ");
F=parseFloat(l[0]);G=parseFloat(l[1]);t=parseFloat(q.borderLeftWidth)||0;j=parseFloat(q.borderTopWidth)||0;
B-=E-((E-t)/k.scaleX)-F;n-=h-((h-j)/k.scaleY)-G;r-=t/k.scaleX-F;i-=j/k.scaleY-G;
if(A){B+=(parseFloat(q.borderRightWidth)+t)/k.scaleX;n+=(j+parseFloat(q.borderBottomWidth))/k.scaleY
}}}}if(D===s){return{left:r,top:i,width:B-r,height:n-i}}o=cp(D);m=cp(s,true);u=b8({x:r,y:i},o,m);
v=b8({x:B,y:i},o,m);x=b8({x:B,y:n},o,m);w=b8({x:r,y:n},o,m);r=Math.min(u.x,v.x,x.x,w.x);
i=Math.min(u.y,v.y,x.y,w.y);cz.x=cz.y=0;if(C){bD(s,cz)}return{left:r+cz.x,top:i+cz.y,width:Math.max(u.x,v.x,x.x,w.x)-r,height:Math.max(u.y,v.y,x.y,w.y)-i}
},cd=function(h){return(h&&h.length&&h[0]&&((h[0].nodeType&&h[0].style&&!h.nodeType)||(h[0].length&&h[0][0])))?true:false
},bk=function(h){var k=[],i=h.length,l,j,m;for(l=0;l<i;l++){j=h[l];if(cd(j)){m=j.length;
for(m=0;m<j.length;m++){k.push(j[m])}}else{if(j&&j.length!==0){k.push(j)}}}return k
},bM=(("ontouchstart" in bz)&&("orientation" in window)),bb=(function(h){var j=h.split(","),k=((cF.onpointerdown!==undefined)?"pointerdown,pointermove,pointerup,pointercancel":(cF.onmspointerdown!==undefined)?"MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel":h).split(","),l={},i=8;
while(--i>-1){l[j[i]]=k[i];l[k[i]]=j[i]}return l}("touchstart,touchmove,touchend,touchcancel")),cr=function(i,h,k,j){if(i.addEventListener){i.addEventListener(bb[h]||h,k,j)
}else{if(i.attachEvent){i.attachEvent("on"+h,k)}}},cw=function(j,i,h){if(j.removeEventListener){j.removeEventListener(bb[i]||i,h)
}else{if(j.detachEvent){j.detachEvent("on"+i,h)}}},bh=function(h,j){var i=h.length;
while(--i>-1){if(h[i].identifier===j){return true}}return false},by=function(h){b3=(h.touches&&a0<h.touches.length);
cw(h.target,"touchend",by)},ci=function(h){b3=(h.touches&&a0<h.touches.length);
cr(h.target,"touchend",by)},b2=function(i,r,l,q,m,j){var n={},k,o,h;if(r){if(m!==1&&r instanceof Array){n.end=k=[];
h=r.length;if(typeof(r[0])==="object"){for(o=0;o<h;o++){k[o]=bs(r[o],m)}}else{for(o=0;
o<h;o++){k[o]=r[o]*m}}l+=1.1;q-=1.1}else{if(typeof(r)==="function"){n.end=function(u){var v=r.call(i,u),s,t;
if(m!==1&&typeof(v)==="object"){s={};for(t in v){s[t]=v[t]*m}v=s}return v}}else{n.end=r
}}}if(l||l===0){n.max=l}if(q||q===0){n.min=q}if(j){n.velocity=0}return n},cB=function(h){var i;
return(!h||!h.getAttribute||h.nodeName==="BODY")?false:((i=h.getAttribute("data-clickable"))==="true"||(i!=="false"&&(h.onclick||cI.test(h.nodeName+"")||h.getAttribute("contentEditable")==="true")))?true:cB(h.parentNode)
},bO=function(h,j){var i=h.length,k;while(--i>-1){k=h[i];k.ondragstart=k.onselectstart=j?null:b4;
co(k,"userSelect",(j?"text":"none"))}},bl,bK=(function(){var k=cs.createElement("div"),l=cs.createElement("div"),j=l.style,i=cs.body||cF,h;
j.display="inline-block";j.position="relative";k.style.cssText=l.innerHTML="width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden";
k.appendChild(l);i.appendChild(k);bl=(l.offsetHeight+18>k.scrollHeight);j.width="100%";
if(!cv){j.paddingRight="500px";h=k.scrollLeft=k.scrollWidth-k.clientWidth;j.left="-90px";
h=(h!==k.scrollLeft)}i.removeChild(k);return h}()),bF=function(w,o){w=bY(w);o=o||{};
var m=cs.createElement("div"),k=m.style,n=w.firstChild,h=0,u=0,r=w.scrollTop,x=w.scrollLeft,t=w.scrollWidth,B=w.scrollHeight,s=0,j=0,z=0,A,q,l,y,v,i;
if(bo&&o.force3D!==false){v="translate3d(";i="px,0px)"}else{if(cv){v="translate(";
i="px)"}}this.scrollTop=function(C,D){if(!arguments.length){return -this.top()}this.top(-C,D)
};this.scrollLeft=function(C,D){if(!arguments.length){return -this.left()}this.left(-C,D)
};this.left=function(D,E){if(!arguments.length){return -(w.scrollLeft+u)}var F=w.scrollLeft-x,C=u;
if((F>2||F<-2)&&!E){x=w.scrollLeft;bU.killTweensOf(this,true,{left:1,scrollLeft:1});
this.left(-x);if(o.onKill){o.onKill()}return}D=-D;if(D<0){u=(D-0.5)|0;D=0}else{if(D>j){u=(D-j)|0;
D=j}else{u=0}}if(u||C){if(v){if(!this._suspendTransforms){k[cv]=v+-u+"px,"+-h+i
}}else{k.left=-u+"px"}if(bK&&u+s>=0){k.paddingRight=u+s+"px"}}w.scrollLeft=D|0;
x=w.scrollLeft};this.top=function(D,E){if(!arguments.length){return -(w.scrollTop+h)
}var F=w.scrollTop-r,C=h;if((F>2||F<-2)&&!E){r=w.scrollTop;bU.killTweensOf(this,true,{top:1,scrollTop:1});
this.top(-r);if(o.onKill){o.onKill()}return}D=-D;if(D<0){h=(D-0.5)|0;D=0}else{if(D>z){h=(D-z)|0;
D=z}else{h=0}}if(h||C){if(v){if(!this._suspendTransforms){k[cv]=v+-u+"px,"+-h+i
}}else{k.top=-h+"px"}}w.scrollTop=D|0;r=w.scrollTop};this.maxScrollTop=function(){return z
};this.maxScrollLeft=function(){return j};this.disable=function(){n=m.firstChild;
while(n){y=n.nextSibling;w.appendChild(n);n=y}if(w===m.parentNode){w.removeChild(m)
}};this.enable=function(){n=w.firstChild;if(n===m){return}while(n){y=n.nextSibling;
m.appendChild(n);n=y}w.appendChild(m);this.calibrate()};this.calibrate=function(D){var E=(w.clientWidth===A),F,C;
r=w.scrollTop;x=w.scrollLeft;if(E&&w.clientHeight===q&&m.offsetHeight===l&&t===w.scrollWidth&&B===w.scrollHeight&&!D){return
}if(h||u){F=this.left();C=this.top();this.left(-w.scrollLeft);this.top(-w.scrollTop)
}if(!E||D){k.display="block";k.width="auto";k.paddingRight="0px";s=Math.max(0,w.scrollWidth-w.clientWidth);
if(s){s+=bG(w,"paddingLeft")+(bl?bG(w,"paddingRight"):0)}}k.display="inline-block";
k.position="relative";k.overflow="visible";k.verticalAlign="top";k.width="100%";
k.paddingRight=s+"px";if(bl){k.paddingBottom=bG(w,"paddingBottom",true)}if(bi){k.zoom="1"
}A=w.clientWidth;q=w.clientHeight;t=w.scrollWidth;B=w.scrollHeight;j=w.scrollWidth-A;
z=w.scrollHeight-q;l=m.offsetHeight;k.display="block";if(F||C){this.left(F);this.top(C)
}};this.content=m;this.element=w;this._suspendTransforms=false;this.enable()},cf=function(ah,k){cA.call(this,ah);
ah=bY(ah);if(!bu){bu=bS.com.greensock.plugins.ThrowPropsPlugin}this.vars=k=bs(k||{});
this.target=ah;this.x=this.y=this.rotation=0;this.dragResistance=parseFloat(k.dragResistance)||0;
this.edgeResistance=isNaN(k.edgeResistance)?1:parseFloat(k.edgeResistance)||0;this.lockAxis=k.lockAxis;
this.autoScroll=k.autoScroll||0;this.lockedAxis=null;this.allowEventDefault=!!k.allowEventDefault;
var S=(k.type||(bi?"top,left":"x,y")).toLowerCase(),O=(S.indexOf("x")!==-1||S.indexOf("y")!==-1),N=(S.indexOf("rotation")!==-1),ai=N?"rotation":O?"x":"left",ay=O?"y":"top",aq=(S.indexOf("x")!==-1||S.indexOf("left")!==-1||S==="scroll"),ar=(S.indexOf("y")!==-1||S.indexOf("top")!==-1||S==="scroll"),o=k.minimumMovement||2,av=this,E=bj(k.trigger||k.handle||ah),Y={},T=0,az=false,J=k.clickableTest||cB,af=0,au,y,U,V,G,H,an,x,ac,q,ad,r,B,m,P,z,L,ae,h,I,K,ab,at,aw,C,s,t,l,D,M,i,aj,R,ak,A=function(aF){if(av.autoScroll&&av.isDragging&&(az||ae)){var aA=ah,aM=av.autoScroll*15,aI,aC,aL,aD,aE,aG,aH,aJ;
az=false;b5.scrollTop=((window.pageYOffset!=null)?window.pageYOffset:(bz.scrollTop!=null)?bz.scrollTop:cs.body.scrollTop);
b5.scrollLeft=((window.pageXOffset!=null)?window.pageXOffset:(bz.scrollLeft!=null)?bz.scrollLeft:cs.body.scrollLeft);
aD=av.pointerX-b5.scrollLeft;aE=av.pointerY-b5.scrollTop;while(aA&&!aC){aC=ct(aA.parentNode);
aI=aC?b5:aA.parentNode;aL=aC?{bottom:Math.max(bz.clientHeight,window.innerHeight||0),right:Math.max(bz.clientWidth,window.innerWidth||0),left:0,top:0}:aI.getBoundingClientRect();
aG=aH=0;if(ar){aJ=aI._gsMaxScrollY-aI.scrollTop;if(aJ<0){aH=aJ}else{if(aE>aL.bottom-40&&aJ){az=true;
aH=Math.min(aJ,(aM*(1-Math.max(0,(aL.bottom-aE))/40))|0)}else{if(aE<aL.top+40&&aI.scrollTop){az=true;
aH=-Math.min(aI.scrollTop,(aM*(1-Math.max(0,(aE-aL.top))/40))|0)}}}if(aH){aI.scrollTop+=aH
}}if(aq){aJ=aI._gsMaxScrollX-aI.scrollLeft;if(aJ<0){aG=aJ}else{if(aD>aL.right-40&&aJ){az=true;
aG=Math.min(aJ,(aM*(1-Math.max(0,(aL.right-aD))/40))|0)}else{if(aD<aL.left+40&&aI.scrollLeft){az=true;
aG=-Math.min(aI.scrollLeft,(aM*(1-Math.max(0,(aD-aL.left))/40))|0)}}}if(aG){aI.scrollLeft+=aG
}}if(aC&&(aG||aH)){window.scrollTo(aI.scrollLeft,aI.scrollTop);w(av.pointerX+aG,av.pointerY+aH)
}aA=aI}}if(ae){var aK=av.x,aN=av.y,aB=0.000001;if(aK<aB&&aK>-aB){aK=0}if(aN<aB&&aN>-aB){aN=0
}if(N){av.deltaX=aK-D.data.rotation;D.data.rotation=av.rotation=aK;D.setRatio(1)
}else{if(y){if(ar){av.deltaY=aN-y.top();y.top(aN)}if(aq){av.deltaX=aK-y.left();
y.left(aK)}}else{if(O){if(ar){av.deltaY=aN-D.data.y;D.data.y=aN}if(aq){av.deltaX=aK-D.data.x;
D.data.x=aK}D.setRatio(1)}else{if(ar){av.deltaY=aN-parseFloat(ah.style.top||0);
ah.style.top=aN+"px"}if(aq){av.deltaY=aK-parseFloat(ah.style.left||0);ah.style.left=aK+"px"
}}}}if(x&&!aF&&!aj){aj=true;cK(av,"drag","onDrag");aj=false}}ae=false},ao=function(aD,aA){var aE=av.x,aB=av.y,aC;
if(!ah._gsTransform&&(O||N)){bU.set(ah,{x:"+=0",overwrite:false})}if(O){av.y=ah._gsTransform.y;
av.x=ah._gsTransform.x}else{if(N){av.x=av.rotation=ah._gsTransform.rotation}else{if(y){av.y=y.top();
av.x=y.left()}else{av.y=parseInt(ah.style.top,10)||0;av.x=parseInt(ah.style.left,10)||0
}}}if((I||K||ab)&&!aA&&(av.isDragging||av.isThrowing)){if(ab){cz.x=av.x;cz.y=av.y;
aC=ab(cz);if(aC.x!==av.x){av.x=aC.x;ae=true}if(aC.y!==av.y){av.y=aC.y;ae=true}}if(I){aC=I(av.x);
if(aC!==av.x){av.x=aC;if(N){av.rotation=aC}ae=true}}if(K){aC=K(av.y);if(aC!==av.y){av.y=aC
}ae=true}}if(ae){A(true)}if(!aD){av.deltaX=av.x-aE;av.deltaY=av.y-aB;cK(av,"throwupdate","onThrowUpdate")
}},v=function(){var aA,aB,aD,aC;an=false;if(y){y.calibrate();av.minX=q=-y.maxScrollLeft();
av.minY=r=-y.maxScrollTop();av.maxX=ac=av.maxY=ad=0;an=true}else{if(!!k.bounds){aA=bd(k.bounds,ah.parentNode);
if(N){av.minX=q=aA.left;av.maxX=ac=aA.left+aA.width;av.minY=r=av.maxY=ad=0}else{if(k.bounds.maxX!==undefined||k.bounds.maxY!==undefined){aA=k.bounds;
av.minX=q=aA.minX;av.minY=r=aA.minY;av.maxX=ac=aA.maxX;av.maxY=ad=aA.maxY}else{aB=bd(ah,ah.parentNode);
av.minX=q=bG(ah,ai)+aA.left-aB.left;av.minY=r=bG(ah,ay)+aA.top-aB.top;av.maxX=ac=q+(aA.width-aB.width);
av.maxY=ad=r+(aA.height-aB.height)}}if(q>ac){av.minX=ac;av.maxX=ac=q;q=av.minX}if(r>ad){av.minY=ad;
av.maxY=ad=r;r=av.minY}if(N){av.minRotation=q;av.maxRotation=ac}an=true}}if(k.liveSnap){aD=(k.liveSnap===true)?(k.snap||{}):k.liveSnap;
aC=(aD instanceof Array||typeof(aD)==="function");if(N){I=Z((aC?aD:aD.rotation),q,ac,1);
K=null}else{if(aD.points){ab=W((aC?aD:aD.points),q,ac,r,ad,aD.radius,y?-1:1)}else{if(aq){I=Z((aC?aD:aD.x||aD.left||aD.scrollLeft),q,ac,y?-1:1)
}if(ar){K=Z((aC?aD:aD.y||aD.top||aD.scrollTop),r,ad,y?-1:1)}}}}},ag=function(){av.isThrowing=false;
cK(av,"throwcomplete","onThrowComplete")},j=function(){av.isThrowing=false},Q=function(aD,aA){var aE,aB,aC,aF;
if(aD&&bu){if(aD===true){aE=k.snap||k.liveSnap||{};aB=(aE instanceof Array||typeof(aE)==="function");
aD={resistance:(k.throwResistance||k.resistance||1000)/(N?10:1)};if(N){aD.rotation=b2(av,aB?aE:aE.rotation,ac,q,1,aA)
}else{if(aq){aD[ai]=b2(av,aB?aE:aE.points||aE.x||aE.left||aE.scrollLeft,ac,q,y?-1:1,aA||(av.lockedAxis==="x"))
}if(ar){aD[ay]=b2(av,aB?aE:aE.points||aE.y||aE.top||aE.scrollTop,ad,r,y?-1:1,aA||(av.lockedAxis==="y"))
}if(aE.points||(aE instanceof Array&&typeof(aE[0])==="object")){aD.linkedProps=ai+","+ay;
aD.radius=aE.radius}}}av.isThrowing=true;aF=(!isNaN(k.overshootTolerance))?k.overshootTolerance:(k.edgeResistance===1)?0:(1-av.edgeResistance)+0.2;
av.tween=aC=bu.to(y||ah,{throwProps:aD,ease:(k.ease||bS.Power3.easeOut),onComplete:ag,onOverwrite:j,onUpdate:(k.fastMode?cK:ao),onUpdateParams:(k.fastMode?[av,"onthrowupdate","onThrowUpdate"]:(aE&&aE.radius)?[false,true]:a8)},(isNaN(k.maxDuration)?2:k.maxDuration),(!isNaN(k.minDuration)?k.minDuration:(aF===0)?0:0.5),aF);
if(!k.fastMode){if(y){y._suspendTransforms=true}aC.render(aC.duration(),true,true);
ao(true,true);av.endX=av.x;av.endY=av.y;if(N){av.endRotation=av.x}aC.play(0);ao(true,true);
if(y){y._suspendTransforms=false}}}else{if(an){av.applyBounds()}}},aa=function(aB){var aC=C||[1,0,0,1,0,0],aF,aG,aI,aJ,aK,aA,aH,aD,aE;
C=cp(ah.parentNode,true);if(aB&&av.isPressed&&aC.join(",")!==C.join(",")){aF=aC[0];
aG=aC[1];aI=aC[2];aJ=aC[3];aK=aC[4];aA=aC[5];aH=(aF*aJ-aG*aI);aD=U*(aJ/aH)+V*(-aI/aH)+((aI*aA-aJ*aK)/aH);
aE=U*(-aG/aH)+V*(aF/aH)+(-(aF*aA-aG*aK)/aH);V=aD*C[1]+aE*C[3]+C[5];U=aD*C[0]+aE*C[2]+C[4]
}if(!C[1]&&!C[2]&&C[0]==1&&C[3]==1&&C[4]==0&&C[5]==0){C=null}},n=function(){var aA=1-av.edgeResistance;
aa(false);if(C){U=av.pointerX*C[0]+av.pointerY*C[2]+C[4];V=av.pointerX*C[1]+av.pointerY*C[3]+C[5]
}if(ae){w(av.pointerX,av.pointerY);A(true)}if(y){v();H=y.top();G=y.left()}else{if(ax()){ao(true,true);
v()}else{av.applyBounds()}if(N){L=bf(ah,{x:0,y:0});ao(true,true);G=av.x;H=av.y=Math.atan2(L.y-av.pointerY,av.pointerX-L.x)*cD
}else{t=ah.parentNode?ah.parentNode.scrollTop||0:0;l=ah.parentNode?ah.parentNode.scrollLeft||0:0;
H=bG(ah,ay);G=bG(ah,ai)}}if(an&&aA){if(G>ac){G=ac+(G-ac)/aA}else{if(G<q){G=q-(q-G)/aA
}}if(!N){if(H>ad){H=ad+(H-ad)/aA}else{if(H<r){H=r-(r-H)/aA}}}}av.startX=G;av.startY=H
},ax=function(){return(av.tween&&av.tween.isActive())},ap=function(){if(bc.parentNode&&!ax()&&!av.isDragging){bc.parentNode.removeChild(bc)
}},Z=function(aC,aA,aD,aB){if(typeof(aC)==="function"){return function(aE){var aF=!av.isPressed?1:1-av.edgeResistance;
return aC.call(av,(aE>aD?aD+(aE-aD)*aF:(aE<aA)?aA+(aE-aA)*aF:aE))*aB}}if(aC instanceof Array){return function(aJ){var aH=aC.length,aF=0,aG=bH,aE,aI;
while(--aH>-1){aE=aC[aH];aI=aE-aJ;if(aI<0){aI=-aI}if(aI<aG&&aE>=aA&&aE<=aD){aF=aH;
aG=aI}}return aC[aF]}}return isNaN(aC)?function(aE){return aE}:function(){return aC*aB
}},W=function(aE,aF,aB,aA,aC,aG,aD){aG=aG||bH;if(typeof(aE)==="function"){return function(aN){var aL=!av.isPressed?1:1-av.edgeResistance,aH=aN.x,aJ=aN.y,aI,aK,aM;
aN.x=aH=(aH>aB?aB+(aH-aB)*aL:(aH<aF)?aF+(aH-aF)*aL:aH);aN.y=aJ=(aJ>aC?aC+(aJ-aC)*aL:(aJ<aA)?aA+(aJ-aA)*aL:aJ);
aI=aE.call(av,aN);if(aI!==aN){aN.x=aI.x;aN.y=aI.y}if(aD!==1){aN.x*=aD;aN.y*=aD}if(aG<bH){aK=aN.x-aH;
aM=aN.y-aJ;if(Math.sqrt(aK*aK+aM*aM)>aG){aN.x=aH;aN.y=aJ}}return aN}}if(aE instanceof Array){return function(aL){var aN=aE.length,aM=0,aO=bH,aH,aJ,aI,aK;
while(--aN>-1){aI=aE[aN];aH=aI.x-aL.x;aJ=aI.y-aL.y;aK=Math.sqrt(aH*aH+aJ*aJ);if(aK<aO){aM=aN;
aO=aK}}return(aO<=aG)?aE[aM]:aL}}return function(aH){return aH}},F=function(aA){var aB;
if(!au||av.isPressed||!aA||((aA.type==="mousedown"||aA.type==="pointerdown")&&cb()-af<30&&bb[av.pointerEvent.type])){return
}s=ax();av.pointerEvent=aA;if(bb[aA.type]){aw=(aA.type.indexOf("touch")!==-1)?(aA.currentTarget||aA.target):cs;
cr(aw,"touchend",am);cr(aw,"touchmove",al);cr(aw,"touchcancel",am);cr(cs,"touchstart",ci)
}else{aw=null;cr(cs,"mousemove",al)}i=null;cr(cs,"mouseup",am);if(aA&&aA.target){cr(aA.target,"mouseup",am)
}at=(J.call(av,aA.target)&&!k.dragClickables);if(at){cr(aA.target,"change",am);
cK(av,"press","onPress");bO(E,true);return}M=(!aw||aq===ar||av.vars.allowNativeTouchScrolling===false)?false:aq?"y":"x";
if(bi){aA=cy(aA,true)}else{if(!M&&!av.allowEventDefault){aA.preventDefault();if(aA.preventManipulation){aA.preventManipulation()
}}}if(aA.changedTouches){aA=P=aA.changedTouches[0];z=aA.identifier}else{if(aA.pointerId){z=aA.pointerId
}else{P=z=null}}a0++;b0(A);V=av.pointerY=aA.pageY;U=av.pointerX=aA.pageX;if(M||av.autoScroll){bR(ah.parentNode)
}if(ah.parentNode&&(y||(av.autoScroll&&!N&&ah.parentNode._gsMaxScrollX&&!bc.parentNode))&&!ah.getBBox){bc.style.width=(ah.parentNode.scrollWidth)+"px";
ah.parentNode.appendChild(bc)}n();if(av.tween){av.tween.kill()}av.isThrowing=false;
bU.killTweensOf(y||ah,true,Y);if(y){bU.killTweensOf(ah,true,{scrollTo:1})}av.tween=av.lockedAxis=null;
if(k.zIndexBoost||(!N&&!y&&k.zIndexBoost!==false)){ah.style.zIndex=cf.zIndex++}av.isPressed=true;
x=!!(k.onDrag||av._listeners.drag);if(!N){aB=E.length;while(--aB>-1){co(E[aB],"cursor",k.cursor||"move")
}}cK(av,"press","onPress")},al=function(aA){var aH=aA,aB,aC,aD,aE,aF,aG;if(!au||b3||!av.isPressed||!aA){return
}av.pointerEvent=aA;aB=aA.changedTouches;if(aB){aA=aB[0];if(aA!==P&&aA.identifier!==z){aE=aB.length;
while(--aE>-1&&(aA=aB[aE]).identifier!==z){}if(aE<0){return}}}else{if(aA.pointerId&&z&&aA.pointerId!==z){return
}}if(bi){aA=cy(aA,true)}else{if(aw&&M&&!i){aC=aA.pageX;aD=aA.pageY;if(C){aE=aC*C[0]+aD*C[2]+C[4];
aD=aC*C[1]+aD*C[3]+C[5];aC=aE}aF=Math.abs(aC-U);aG=Math.abs(aD-V);if((aF!==aG&&(aF>o||aG>o))||(cu&&M===i)){i=(aF>aG&&aq)?"x":"y";
if(av.vars.lockAxisOnTouchScroll!==false){av.lockedAxis=(i==="x")?"y":"x";if(typeof(av.vars.onLockAxis)==="function"){av.vars.onLockAxis.call(av,aH)
}}if(cu&&M===i){am(aH);return}}}if(!av.allowEventDefault&&(!M||(i&&M!==i))&&aH.cancelable!==false){aH.preventDefault();
if(aH.preventManipulation){aH.preventManipulation()}}}if(av.autoScroll){az=true
}w(aA.pageX,aA.pageY)},w=function(aD,aE){var aC=1-av.dragResistance,aA=1-av.edgeResistance,aF,aB,aH,aJ,aI,aG;
av.pointerX=aD;av.pointerY=aE;if(N){aJ=Math.atan2(L.y-aE,aD-L.x)*cD;aI=av.y-aJ;
av.y=aJ;if(aI>180){H-=360}else{if(aI<-180){H+=360}}aH=G+(H-aJ)*aC}else{if(C){aG=aD*C[0]+aE*C[2]+C[4];
aE=aD*C[1]+aE*C[3]+C[5];aD=aG}aB=(aE-V);aF=(aD-U);if(aB<o&&aB>-o){aB=0}if(aF<o&&aF>-o){aF=0
}if((av.lockAxis||av.lockedAxis)&&(aF||aB)){aG=av.lockedAxis;if(!aG){av.lockedAxis=aG=(aq&&Math.abs(aF)>Math.abs(aB))?"y":ar?"x":null;
if(aG&&typeof(av.vars.onLockAxis)==="function"){av.vars.onLockAxis.call(av,av.pointerEvent)
}}if(aG==="y"){aB=0}else{if(aG==="x"){aF=0}}}aH=G+aF*aC;aJ=H+aB*aC}if((I||K||ab)&&(av.x!==aH||(av.y!==aJ&&!N))){if(ab){cz.x=aH;
cz.y=aJ;aG=ab(cz);aH=aG.x;aJ=aG.y}if(I){aH=I(aH)}if(K){aJ=K(aJ)}}else{if(an){if(aH>ac){aH=ac+(aH-ac)*aA
}else{if(aH<q){aH=q+(aH-q)*aA}}if(!N){if(aJ>ad){aJ=ad+(aJ-ad)*aA}else{if(aJ<r){aJ=r+(aJ-r)*aA
}}}}}if(!N){aH=Math.round(aH);aJ=Math.round(aJ)}if(av.x!==aH||(av.y!==aJ&&!N)){if(N){av.endRotation=av.x=av.endX=aH;
ae=true}else{if(ar){av.y=av.endY=aJ;ae=true}if(aq){av.x=av.endX=aH;ae=true}}if(!av.isDragging&&av.isPressed){av.isDragging=true;
cK(av,"dragstart","onDragStart")}}},am=function(aG,aB){if(!au||!av.isPressed||(aG&&z!=null&&!aB&&((aG.pointerId&&aG.pointerId!==z)||(aG.changedTouches&&!bh(aG.changedTouches,z))))){return
}av.isPressed=false;var aD=aG,aC=av.isDragging,aE=bU.delayedCall(0.001,ap),aH,aI,aJ,aF,aA;
if(aw){cw(aw,"touchend",am);cw(aw,"touchmove",al);cw(aw,"touchcancel",am);cw(cs,"touchstart",ci)
}else{cw(cs,"mousemove",al)}cw(cs,"mouseup",am);if(aG&&aG.target){cw(aG.target,"mouseup",am)
}ae=false;if(at){if(aG){cw(aG.target,"change",am)}bO(E,false);cK(av,"release","onRelease");
cK(av,"click","onClick");at=false;return}b9(A);if(!N){aI=E.length;while(--aI>-1){co(E[aI],"cursor",k.cursor||"move")
}}if(aC){T=bp=cb();av.isDragging=false}a0--;if(aG){if(bi){aG=cy(aG,false)}aH=aG.changedTouches;
if(aH){aG=aH[0];if(aG!==P&&aG.identifier!==z){aI=aH.length;while(--aI>-1&&(aG=aH[aI]).identifier!==z){}if(aI<0){return
}}}av.pointerEvent=aD;av.pointerX=aG.pageX;av.pointerY=aG.pageY}if(aD&&!aC){if(s&&(k.snap||k.bounds)){Q(k.throwProps)
}cK(av,"release","onRelease");if(!cu||aD.type!=="touchmove"){cK(av,"click","onClick");
aF=aD.target||aD.srcElement||ah;af=cb();aA=function(){if(af!==R&&av.enabled()&&!av.isPressed){if(aF.click){aF.click()
}else{if(cs.createEvent){aJ=cs.createEvent("MouseEvents");aJ.initMouseEvent("click",true,true,window,1,av.pointerEvent.screenX,av.pointerEvent.screenY,av.pointerX,av.pointerY,false,false,false,false,0,null);
aF.dispatchEvent(aJ)}}}};if(!cu&&!aD.defaultPrevented){bU.delayedCall(0.00001,aA)
}}}else{Q(k.throwProps);if(!bi&&!av.allowEventDefault&&aD&&(k.dragClickables||!J.call(av,aD.target))&&aC&&(!M||(i&&M===i))&&aD.cancelable!==false){aD.preventDefault();
if(aD.preventManipulation){aD.preventManipulation()}}cK(av,"release","onRelease")
}if(ax()){aE.duration(av.tween.duration())}if(aC){cK(av,"dragend","onDragEnd")}return true
},u=function(aA){if(aA&&av.isDragging&&!y){var aB=aA.target||aA.srcElement||ah.parentNode,aC=aB.scrollLeft-aB._gsScrollX,aD=aB.scrollTop-aB._gsScrollY;
if(aC||aD){if(C){U-=aC*C[0]+aD*C[2];V-=aD*C[3]+aC*C[1]}else{U-=aC;V-=aD}aB._gsScrollX+=aC;
aB._gsScrollY+=aD;w(av.pointerX,av.pointerY)}}},X=function(aA){var aC=cb(),aF=(aC-af<40),aD=(aC-T<40),aG=(aF&&R===af),aH=!!aA.preventDefault,aI=(av.pointerEvent&&av.pointerEvent.defaultPrevented),aE=(aF&&ak===af),aB=aA.isTrusted||(aA.isTrusted==null&&aF&&aG);
if(aH&&(aG||(aD&&av.vars.suppressClickOnDrag!==false))){aA.stopImmediatePropagation()
}if(aF&&!(av.pointerEvent&&av.pointerEvent.defaultPrevented)&&(!aG||(aB!==aE))){if(aB&&aG){ak=af
}R=af;return}if(av.isPressed||aD||aF){if(!aH){aA.returnValue=false}else{if(!aB||!aA.detail||!aF||aI){aA.preventDefault();
if(aA.preventManipulation){aA.preventManipulation()}}}}};h=cf.get(this.target);
if(h){h.kill()}this.startDrag=function(aA){F(aA);if(!av.isDragging){av.isDragging=true;
cK(av,"dragstart","onDragStart")}};this.drag=al;this.endDrag=function(aA){am(aA,true)
};this.timeSinceDrag=function(){return av.isDragging?0:(cb()-T)/1000};this.hitTest=function(aA,aB){return cf.hitTest(av.target,aA,aB)
};this.getDirection=function(aF,aB){var aI=(aF==="velocity"&&bu)?aF:(typeof(aF)==="object"&&!N)?"element":"start",aE,aA,aH,aG,aC,aD;
if(aI==="element"){aC=ch(av.target);aD=ch(aF)}aE=(aI==="start")?av.x-G:(aI==="velocity")?bu.getVelocity(this.target,ai):(aC.left+aC.width/2)-(aD.left+aD.width/2);
if(N){return aE<0?"counter-clockwise":"clockwise"}else{aB=aB||2;aA=(aI==="start")?av.y-H:(aI==="velocity")?bu.getVelocity(this.target,ay):(aC.top+aC.height/2)-(aD.top+aD.height/2);
aH=Math.abs(aE/aA);aG=(aH<1/aB)?"":(aE<0)?"left":"right";if(aH<aB){if(aG!==""){aG+="-"
}aG+=(aA<0)?"up":"down"}}return aG};this.applyBounds=function(aD){var aG,aA,aB,aC,aE,aF;
if(aD&&k.bounds!==aD){k.bounds=aD;return av.update(true)}ao(true);v();if(an){aG=av.x;
aA=av.y;if(aG>ac){aG=ac}else{if(aG<q){aG=q}}if(aA>ad){aA=ad}else{if(aA<r){aA=r}}if(av.x!==aG||av.y!==aA){aB=true;
av.x=av.endX=aG;if(N){av.endRotation=aG}else{av.y=av.endY=aA}ae=true;A(true);if(av.autoScroll&&!av.isDragging){bR(ah.parentNode);
aC=ah;b5.scrollTop=((window.pageYOffset!=null)?window.pageYOffset:(bz.scrollTop!=null)?bz.scrollTop:cs.body.scrollTop);
b5.scrollLeft=((window.pageXOffset!=null)?window.pageXOffset:(bz.scrollLeft!=null)?bz.scrollLeft:cs.body.scrollLeft);
while(aC&&!aF){aF=ct(aC.parentNode);aE=aF?b5:aC.parentNode;if(ar&&aE.scrollTop>aE._gsMaxScrollY){aE.scrollTop=aE._gsMaxScrollY
}if(aq&&aE.scrollLeft>aE._gsMaxScrollX){aE.scrollLeft=aE._gsMaxScrollX}aC=aE}}}if(av.isThrowing&&(aB||av.endX>ac||av.endX<q||av.endY>ad||av.endY<r)){Q(k.throwProps,aB)
}}return av};this.update=function(aC,aB,aD){var aE=av.x,aA=av.y;aa(!aB);if(aC){av.applyBounds()
}else{if(ae&&aD){A(true)}ao(true)}if(aB){w(av.pointerX,av.pointerY);if(ae){A(true)
}}if(av.isPressed&&!aB&&((aq&&Math.abs(aE-av.x)>0.01)||(ar&&(Math.abs(aA-av.y)>0.01&&!N)))){n()
}if(av.autoScroll){bR(ah.parentNode);az=av.isDragging;A(true)}if(av.autoScroll){bB(ah,u);
cg(ah,u)}return av};this.enable=function(aB){var aA,aC,aD;if(aB!=="soft"){aC=E.length;
while(--aC>-1){aD=E[aC];cr(aD,"mousedown",F);cr(aD,"touchstart",F);cr(aD,"click",X,true);
if(!N){co(aD,"cursor",k.cursor||"move")}co(aD,"touchCallout","none");co(aD,"touchAction",(aq===ar)?"none":aq?"pan-y":"pan-x")
}bO(E,false)}cg(ah,u);au=true;if(bu&&aB!=="soft"){bu.track(y||ah,(O?"x,y":N?"rotation":"top,left"))
}if(y){y.enable()}ah._gsDragID=aA="d"+(cx++);cH[aA]=this;if(y){y.element._gsDragID=aA
}bU.set(ah,{x:"+=0",overwrite:false});D={t:ah,data:bi?m:ah._gsTransform,tween:{},setRatio:(bi?function(){bU.set(ah,B)
}:bN._internals.setTransformRatio||bN._internals.set3DTransformRatio)};n();av.update(true);
return av};this.disable=function(aB){var aA=av.isDragging,aC,aD;if(!N){aC=E.length;
while(--aC>-1){co(E[aC],"cursor",null)}}if(aB!=="soft"){aC=E.length;while(--aC>-1){aD=E[aC];
co(aD,"touchCallout",null);co(aD,"touchAction",null);cw(aD,"mousedown",F);cw(aD,"touchstart",F);
cw(aD,"click",X)}bO(E,true);if(aw){cw(aw,"touchcancel",am);cw(aw,"touchend",am);
cw(aw,"touchmove",al)}cw(cs,"mouseup",am);cw(cs,"mousemove",al)}bB(ah,u);au=false;
if(bu&&aB!=="soft"){bu.untrack(y||ah,(O?"x,y":N?"rotation":"top,left"))}if(y){y.disable()
}b9(A);av.isDragging=av.isPressed=at=false;if(aA){cK(av,"dragend","onDragEnd")}return av
};this.enabled=function(aA,aB){return arguments.length?(aA?av.enable(aB):av.disable(aB)):au
};this.kill=function(){av.isThrowing=false;bU.killTweensOf(y||ah,true,Y);av.disable();
delete cH[ah._gsDragID];return av};if(S.indexOf("scroll")!==-1){y=this.scrollProxy=new bF(ah,bJ({onKill:function(){if(av.isPressed){am(null)
}}},k));ah.style.overflowY=(ar&&!bM)?"auto":"hidden";ah.style.overflowX=(aq&&!bM)?"auto":"hidden";
ah=y.content}if(k.force3D!==false){bU.set(ah,{force3D:true})}if(N){Y.rotation=1
}else{if(aq){Y[ai]=1}if(ar){Y[ay]=1}}if(N){B=ce;m=B.css;B.overwrite=false}else{if(O){B=(aq&&ar)?c:aq?bv:bw;
m=B.css;B.overwrite=false}}this.enable()},bq=cf.prototype=new cA();bq.constructor=cf;
bq.pointerX=bq.pointerY=bq.startX=bq.startY=bq.deltaX=bq.deltaY=0;bq.isDragging=bq.isPressed=false;
cf.version="0.15.0";cf.zIndex=1000;cr(cs,"touchcancel",function(){});cr(cs,"contextmenu",function(h){var i;
for(i in cH){if(cH[i].isPressed){cH[i].endDrag()}}});cf.create=function(i,k){if(typeof(i)==="string"){i=bU.selector(i)
}var j=(!i||i.length===0)?[]:cd(i)?bk(i):[i],h=j.length;while(--h>-1){j[h]=new cf(j[h],k)
}return j};cf.get=function(h){return cH[(bY(h)||{})._gsDragID]};cf.timeSinceDrag=function(){return(cb()-bp)/1000
};var cq={},b1=function(k){var l=0,h=0,i,j;k=bY(k);i=k.offsetWidth;j=k.offsetHeight;
while(k){l+=k.offsetTop;h+=k.offsetLeft;k=k.offsetParent}return{top:l,left:h,width:i,height:j}
},ch=function(i,h){if(i===window){cq.left=cq.top=0;cq.width=cq.right=bz.clientWidth||i.innerWidth||cs.body.clientWidth||0;
cq.height=cq.bottom=((i.innerHeight||0)-20<bz.clientHeight)?bz.clientHeight:i.innerHeight||cs.body.clientHeight||0;
return cq}var j=(i.pageX!==h)?{left:i.pageX-bP(),top:i.pageY-bT(),right:i.pageX-bP()+1,bottom:i.pageY-bT()+1}:(!i.nodeType&&i.left!==h&&i.top!==h)?i:bi?b1(i):bY(i).getBoundingClientRect();
if(j.right===h&&j.width!==h){j.right=j.left+j.width;j.bottom=j.top+j.height}else{if(j.width===h){j={width:j.right-j.left,height:j.bottom-j.top,right:j.right,left:j.left,bottom:j.bottom,top:j.top}
}}return j};cf.hitTest=function(l,m,k){if(l===m){return false}var n=ch(l),q=ch(m),o=(q.left>n.right||q.right<n.left||q.top>n.bottom||q.bottom<n.top),i,h,j;
if(o||!k){return !o}j=((k+"").indexOf("%")!==-1);k=parseFloat(k)||0;i={left:Math.max(n.left,q.left),top:Math.max(n.top,q.top)};
i.width=Math.min(n.right,q.right)-i.left;i.height=Math.min(n.bottom,q.bottom)-i.top;
if(i.width<0||i.height<0){return false}if(j){k*=0.01;h=i.width*i.height;return(h>=n.width*n.height*k||h>=q.width*q.height*k)
}return(i.width>k&&i.height>k)};bc.style.cssText="visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;";
return cf},true)});if(b._gsDefine){b._gsQueue.pop()()}(function(i){var c=function(){return(b.GreenSockGlobals||b)[i]
};if(typeof(define)==="function"&&define.amd){define(["./TweenLite","./CSSPlugin"],c)
}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");d("./CSSPlugin.js");
g.exports=c()}}}("Draggable"))}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./CSSPlugin.js":252,"./TweenLite.js":265}],257:[function(d,g,f){(function(a){
/*!
 * VERSION: 1.15.5
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){b._gsDefine("easing.Back",["easing.Ease"],function(L){var J=(b.GreenSockGlobals||b),C=J.com.greensock,G=Math.PI*2,M=Math.PI/2,c=C._class,H=function(k,i){var h=c("easing."+k,function(){},true),j=h.prototype=new L();
j.constructor=h;j.getRatio=i;return h},p=L.register||function(){},I=function(l,i,m,h,k){var j=c("easing."+l,{easeOut:new i(),easeIn:new m(),easeInOut:new h()},true);
p(j,l);return j},z=function(j,h,i){this.t=j;this.v=h;if(i){this.next=i;i.prev=this;
this.c=i.v-h;this.gap=i.t-j}},A=function(k,i){var h=c("easing."+k,function(l){this._p1=(l||l===0)?l:1.70158;
this._p2=this._p1*1.525},true),j=h.prototype=new L();j.constructor=h;j.getRatio=i;
j.config=function(l){return new h(l)};return h},K=I("Back",A("BackOut",function(h){return((h=h-1)*h*((this._p1+1)*h+this._p1)+1)
}),A("BackIn",function(h){return h*h*((this._p1+1)*h-this._p1)}),A("BackInOut",function(h){return((h*=2)<1)?0.5*h*h*((this._p2+1)*h-this._p2):0.5*((h-=2)*h*((this._p2+1)*h+this._p2)+2)
})),w=c("easing.SlowMo",function(i,h,j){h=(h||h===0)?h:0.7;if(i==null){i=0.7}else{if(i>1){i=1
}}this._p=(i!==1)?h:0;this._p1=(1-i)/2;this._p2=i;this._p3=this._p1+this._p2;this._calcEnd=(j===true)
},true),E=w.prototype=new L(),B,D,F;E.constructor=w;E.getRatio=function(i){var h=i+(0.5-i)*this._p;
if(i<this._p1){return this._calcEnd?1-((i=1-(i/this._p1))*i):h-((i=1-(i/this._p1))*i*i*i*h)
}else{if(i>this._p3){return this._calcEnd?1-(i=(i-this._p3)/this._p1)*i:h+((i-h)*(i=(i-this._p3)/this._p1)*i*i*i)
}}return this._calcEnd?1:h};w.ease=new w(0.7,0.7);E.config=w.config=function(i,h,j){return new w(i,h,j)
};B=c("easing.SteppedEase",function(h){h=h||1;this._p1=1/h;this._p2=h+1},true);
E=B.prototype=new L();E.constructor=B;E.getRatio=function(h){if(h<0){h=0}else{if(h>=1){h=0.999999999
}}return((this._p2*h)>>0)*this._p1};E.config=B.config=function(h){return new B(h)
};D=c("easing.RoughEase",function(v){v=v||{};var m=v.taper||"none",r=[],k=0,o=(v.points||20)|0,h=o,n=(v.randomize!==false),y=(v.clamp===true),q=(v.template instanceof L)?v.template:null,l=(typeof(v.strength)==="number")?v.strength*0.4:0.4,t,u,s,x,i,j;
while(--h>-1){t=n?Math.random():(1/o)*h;u=q?q.getRatio(t):t;if(m==="none"){s=l}else{if(m==="out"){x=1-t;
s=x*x*l}else{if(m==="in"){s=t*t*l}else{if(t<0.5){x=t*2;s=x*x*0.5*l}else{x=(1-t)*2;
s=x*x*0.5*l}}}}if(n){u+=(Math.random()*s)-(s*0.5)}else{if(h%2){u+=s*0.5}else{u-=s*0.5
}}if(y){if(u>1){u=1}else{if(u<0){u=0}}}r[k++]={x:t,y:u}}r.sort(function(P,Q){return P.x-Q.x
});j=new z(1,1,null);h=o;while(--h>-1){i=r[h];j=new z(i.x,i.y,j)}this._prev=new z(0,0,(j.t!==0)?j:j.next)
},true);E=D.prototype=new L();E.constructor=D;E.getRatio=function(i){var h=this._prev;
if(i>h.t){while(h.next&&i>=h.t){h=h.next}h=h.prev}else{while(h.prev&&i<=h.t){h=h.prev
}}this._prev=h;return(h.v+((i-h.t)/h.gap)*h.c)};E.config=function(h){return new D(h)
};D.ease=new D();I("Bounce",H("BounceOut",function(h){if(h<1/2.75){return 7.5625*h*h
}else{if(h<2/2.75){return 7.5625*(h-=1.5/2.75)*h+0.75}else{if(h<2.5/2.75){return 7.5625*(h-=2.25/2.75)*h+0.9375
}}}return 7.5625*(h-=2.625/2.75)*h+0.984375}),H("BounceIn",function(h){if((h=1-h)<1/2.75){return 1-(7.5625*h*h)
}else{if(h<2/2.75){return 1-(7.5625*(h-=1.5/2.75)*h+0.75)}else{if(h<2.5/2.75){return 1-(7.5625*(h-=2.25/2.75)*h+0.9375)
}}}return 1-(7.5625*(h-=2.625/2.75)*h+0.984375)}),H("BounceInOut",function(h){var i=(h<0.5);
if(i){h=1-(h*2)}else{h=(h*2)-1}if(h<1/2.75){h=7.5625*h*h}else{if(h<2/2.75){h=7.5625*(h-=1.5/2.75)*h+0.75
}else{if(h<2.5/2.75){h=7.5625*(h-=2.25/2.75)*h+0.9375}else{h=7.5625*(h-=2.625/2.75)*h+0.984375
}}}return i?(1-h)*0.5:h*0.5+0.5}));I("Circ",H("CircOut",function(h){return Math.sqrt(1-(h=h-1)*h)
}),H("CircIn",function(h){return -(Math.sqrt(1-(h*h))-1)}),H("CircInOut",function(h){return((h*=2)<1)?-0.5*(Math.sqrt(1-h*h)-1):0.5*(Math.sqrt(1-(h-=2)*h)+1)
}));F=function(j,k,i){var l=c("easing."+j,function(m,n){this._p1=(m>=1)?m:1;this._p2=(n||i)/(m<1?m:1);
this._p3=this._p2/G*(Math.asin(1/this._p1)||0);this._p2=G/this._p2},true),h=l.prototype=new L();
h.constructor=l;h.getRatio=k;h.config=function(m,n){return new l(m,n)};return l
};I("Elastic",F("ElasticOut",function(h){return this._p1*Math.pow(2,-10*h)*Math.sin((h-this._p3)*this._p2)+1
},0.3),F("ElasticIn",function(h){return -(this._p1*Math.pow(2,10*(h-=1))*Math.sin((h-this._p3)*this._p2))
},0.3),F("ElasticInOut",function(h){return((h*=2)<1)?-0.5*(this._p1*Math.pow(2,10*(h-=1))*Math.sin((h-this._p3)*this._p2)):this._p1*Math.pow(2,-10*(h-=1))*Math.sin((h-this._p3)*this._p2)*0.5+1
},0.45));I("Expo",H("ExpoOut",function(h){return 1-Math.pow(2,-10*h)}),H("ExpoIn",function(h){return Math.pow(2,10*(h-1))-0.001
}),H("ExpoInOut",function(h){return((h*=2)<1)?0.5*Math.pow(2,10*(h-1)):0.5*(2-Math.pow(2,-10*(h-1)))
}));I("Sine",H("SineOut",function(h){return Math.sin(h*M)}),H("SineIn",function(h){return -Math.cos(h*M)+1
}),H("SineInOut",function(h){return -0.5*(Math.cos(Math.PI*h)-1)}));c("easing.EaseLookup",{find:function(h){return L.map[h]
}},true);p(J.SlowMo,"SlowMo","ease,");p(D,"RoughEase","ease,");p(B,"SteppedEase","ease,");
return K},true)});if(b._gsDefine){b._gsQueue.pop()()}(function(){var c=function(){return(b.GreenSockGlobals||b)
};if(typeof(define)==="function"&&define.amd){define(["./TweenLite"],c)}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");
g.exports=c()}}}())}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./TweenLite.js":265}],258:[function(d,g,f){(function(a){
/*!
 * VERSION: 0.1.3
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){b._gsDefine.plugin({propName:"endArray",API:2,version:"0.1.3",init:function(c,i,o){var p=i.length,q=this.a=[],s,r;
this.target=c;this._mod=0;if(!p){return false}while(--p>-1){s=c[p];r=i[p];if(s!==r){q.push({i:p,s:s,c:r-s})
}}return true},mod:function(c){if(typeof(c.endArray)==="function"){this._mod=c.endArray
}},set:function(o){var c=this.target,r=this.a,p=r.length,q=this._mod,i,s;if(q){while(--p>-1){i=r[p];
c[i.i]=q(i.s+i.c*o,c)}}else{while(--p>-1){i=r[p];s=i.s+i.c*o;c[i.i]=(s<0.000001&&s>-0.000001)?0:s
}}}})});if(b._gsDefine){b._gsQueue.pop()()}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{}],259:[function(d,g,f){(function(a){
/*!
 * VERSION: 0.0.2
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){var l=function(s,r,h){var u=s.type,j=s.setRatio,i=r._tween,t=r._target;
s.type=2;s.m=h;s.setRatio=function(v){var p=0.000001,n,o,q;if(v===1&&(i._time===i._duration||i._time===0)){if(u!==2){if(s.r&&u!==-1){n=Math.round(s.s+s.c);
if(!u){s.t[s.p]=h(n+s.xs0,t)}else{if(u===1){o=s.xs0+n+s.xs1;for(q=1;q<s.l;q++){o+=s["xn"+q]+s["xs"+(q+1)]
}s.t[s.p]=h(o,t)}}}else{s.t[s.p]=h(s.e,t)}}else{j.call(s,v)}}else{if(v||!(i._time===i._duration||i._time===0)||i._rawPrevTime===-0.000001){n=s.c*v+s.s;
if(s.r){n=Math.round(n)}else{if(n<p){if(n>-p){n=0}}}if(!u){s.t[s.p]=h(n+s.xs0,t)
}else{if(u===1){o=s.xs0+n+s.xs1;for(q=1;q<s.l;q++){o+=s["xn"+q]+s["xs"+(q+1)]}s.t[s.p]=h(o,t)
}else{if(u===-1){s.t[s.p]=h(s.xs0,t)}else{if(j){j.call(s,v)}}}}}else{if(u!==2){s.t[s.p]=h(s.b,t)
}else{j.call(s,v)}}}}},m=function(h,o){var i=o._firstPT,j=(h.rotation&&o._overwriteProps.join("").indexOf("bezier")!==-1);
while(i){if(typeof(h[i.p])==="function"){l(i,o,h[i.p])}else{if(j&&i.n==="bezier"&&i.plugin._overwriteProps.join("").indexOf("rotation")!==-1){i.data.mod=h.rotation
}}i=i._next}},c=b._gsDefine.plugin({propName:"modifiers",version:"0.0.2",API:2,init:function(h,i,j){this._tween=j;
this._vars=i;return true},initAll:function(){var i=this._tween,r=this._vars,j=this,s=i._firstPT,q,h;
while(s){h=s._next;q=r[s.n];if(s.pg){if(s.t._propName==="css"){m(r,s.t)}else{if(s.t!==j){q=r[s.t._propName];
s.t._mod((typeof(q)==="object")?q:r)}}}else{if(typeof(q)==="function"){if(s.f===2&&s.t){s.t._applyPT.m=q
}else{this._add(s.t,s.p,s.s,s.c,q);if(h){h._prev=s._prev}if(s._prev){s._prev._next=h
}else{if(i._firstPT===s){i._firstPT=h}}s._next=s._prev=null;i._propLookup[s.n]=j
}}}s=h}return false}}),k=c.prototype;k._add=function(q,h,i,p,j){this._addTween(q,h,i,i+p,h,j);
this._overwriteProps.push(h)};k=b._gsDefine.globals.TweenLite.version.split(".");
if(Number(k[0])<=1&&Number(k[1])<19&&b.console){console.log("ModifiersPlugin requires GSAP 1.19.0 or later.")
}});if(b._gsDefine){b._gsQueue.pop()()}(function(i){var c=function(){return(b.GreenSockGlobals||b)[i]
};if(typeof(define)==="function"&&define.amd){define(["./TweenLite"],c)}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");
g.exports=c()}}}("ModifiersPlugin"))}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./TweenLite.js":265}],260:[function(d,g,f){(function(a){
/*!
 * VERSION: 1.6.0
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){var k=b._gsDefine.plugin({propName:"roundProps",version:"1.6.0",priority:-1,API:2,init:function(h,i,m){this._tween=m;
return true}}),c=function(h){while(h){if(!h.f&&!h.blob){h.m=Math.round}h=h._next
}},j=k.prototype;j._onInitAllProps=function(){var i=this._tween,w=(i.vars.roundProps.join)?i.vars.roundProps:i.vars.roundProps.split(","),r=w.length,u={},s=i._propLookup.roundProps,t,v,h;
while(--r>-1){u[w[r]]=Math.round}r=w.length;while(--r>-1){t=w[r];v=i._firstPT;while(v){h=v._next;
if(v.pg){v.t._mod(u)}else{if(v.n===t){if(v.f===2&&v.t){c(v.t._firstPT)}else{this._add(v.t,t,v.s,v.c);
if(h){h._prev=v._prev}if(v._prev){v._prev._next=h}else{if(i._firstPT===v){i._firstPT=h
}}v._next=v._prev=null;i._propLookup[t]=s}}}v=h}}return false};j._add=function(i,n,o,h){this._addTween(i,n,o,o+h,n,Math.round);
this._overwriteProps.push(n)}});if(b._gsDefine){b._gsQueue.pop()()}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{}],261:[function(d,g,f){(function(a){
/*!
 * VERSION: 1.8.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){var w=document.documentElement,v=b,c=function(j,i){var h=(i==="x")?"Width":"Height",l="scroll"+h,k="client"+h,m=document.body;
return(j===v||j===w||j===m)?Math.max(w[l],m[l])-(v["inner"+h]||w[k]||m[k]):j[l]-j["offset"+h]
},t=function(h){if(typeof(h)==="string"){h=TweenLite.selector(h)}if(h.length&&h!==v&&h[0]&&h[0].style&&!h.nodeType){h=h[0]
}return(h===v||(h.nodeType&&h.style))?h:null},q=function(h,j){var i="scroll"+((j==="x")?"Left":"Top");
if(h===v){if(h.pageXOffset!=null){i="page"+j.toUpperCase()+"Offset"}else{if(w[i]!=null){h=w
}else{h=document.body}}}return function(){return h[i]}},p=function(j,m){var h=t(j).getBoundingClientRect(),l=(!m||m===v||m===document.body),k=(l?w:m).getBoundingClientRect(),i={x:h.left-k.left,y:h.top-k.top};
if(!l&&m){i.x+=q(m,"x")();i.y+=q(m,"y")()}return i},s=function(i,h,j){var k=typeof(i);
if(k==="number"||(k==="string"&&i.charAt(1)==="=")){return i}else{if(i==="max"){return c(h,j)
}}return Math.min(c(h,j),p(i,h)[j])},r=b._gsDefine.plugin({propName:"scrollTo",API:2,global:true,version:"1.8.1",init:function(h,i,j){this._wdw=(h===v);
this._target=h;this._tween=j;if(typeof(i)!=="object"){i={y:i};if(typeof(i.y)==="string"&&i.y!=="max"&&i.y.charAt(1)!=="="){i.x=i.y
}}else{if(i.nodeType){i={y:i,x:i}}}this.vars=i;this._autoKill=(i.autoKill!==false);
this.getX=q(h,"x");this.getY=q(h,"y");this.x=this.xPrev=this.getX();this.y=this.yPrev=this.getY();
if(i.x!=null){this._addTween(this,"x",this.x,s(i.x,h,"x")-(i.offsetX||0),"scrollTo_x",true);
this._overwriteProps.push("scrollTo_x")}else{this.skipX=true}if(i.y!=null){this._addTween(this,"y",this.y,s(i.y,h,"y")-(i.offsetY||0),"scrollTo_y",true);
this._overwriteProps.push("scrollTo_y")}else{this.skipY=true}return true},set:function(j){this._super.setRatio.call(this,j);
var k=(this._wdw||!this.skipX)?this.getX():this.xPrev,h=(this._wdw||!this.skipY)?this.getY():this.yPrev,l=h-this.yPrev,i=k-this.xPrev,m=r.autoKillThreshold;
if(this.x<0){this.x=0}if(this.y<0){this.y=0}if(this._autoKill){if(!this.skipX&&(i>m||i<-m)&&k<c(this._target,"x")){this.skipX=true
}if(!this.skipY&&(l>m||l<-m)&&h<c(this._target,"y")){this.skipY=true}if(this.skipX&&this.skipY){this._tween.kill();
if(this.vars.onAutoKill){this.vars.onAutoKill.apply(this.vars.onAutoKillScope||this._tween,this.vars.onAutoKillParams||[])
}}}if(this._wdw){v.scrollTo((!this.skipX)?this.x:k,(!this.skipY)?this.y:h)}else{if(!this.skipY){this._target.scrollTop=this.y
}if(!this.skipX){this._target.scrollLeft=this.x}}this.xPrev=this.x;this.yPrev=this.y
}}),u=r.prototype;r.max=c;r.getOffset=p;r.autoKillThreshold=7;u._kill=function(h){if(h.scrollTo_x){this.skipX=true
}if(h.scrollTo_y){this.skipY=true}return this._super._kill.call(this,h)}});if(b._gsDefine){b._gsQueue.pop()()
}(function(i){var c=function(){return(b.GreenSockGlobals||b)[i]};if(typeof(define)==="function"&&define.amd){define(["./TweenLite"],c)
}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");g.exports=c()}}}("ScrollToPlugin"))
}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./TweenLite.js":265}],262:[function(d,g,f){(function(a){
/*!
 * VERSION: 0.5.2
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){var j=function(h){var i=h.nodeType,m="";
if(i===1||i===9||i===11){if(typeof(h.textContent)==="string"){return h.textContent
}else{for(h=h.firstChild;h;h=h.nextSibling){m+=j(h)}}}else{if(i===3||i===4){return h.nodeValue
}}return m},k=b._gsDefine.plugin({propName:"text",API:2,version:"0.5.2",init:function(s,h,i,q){var p=s.nodeName.toUpperCase(),r;
if(typeof(h)==="function"){h=h(q,s)}this._svg=(s.getBBox&&(p==="TEXT"||p==="TSPAN"));
if(!("innerHTML" in s)&&!this._svg){return false}this._target=s;if(typeof(h)!=="object"){h={value:h}
}if(h.value===undefined){this._text=this._original=[""];return true}this._delimiter=h.delimiter||"";
this._original=j(s).replace(/\s+/g," ").split(this._delimiter);this._text=h.value.replace(/\s+/g," ").split(this._delimiter);
this._runBackwards=(i.vars.runBackwards===true);if(this._runBackwards){p=this._original;
this._original=this._text;this._text=p}if(typeof(h.newClass)==="string"){this._newClass=h.newClass;
this._hasClass=true}if(typeof(h.oldClass)==="string"){this._oldClass=h.oldClass;
this._hasClass=true}p=this._original.length-this._text.length;r=(p<0)?this._original:this._text;
this._fillChar=h.fillChar||(h.padSpace?"&nbsp;":"");if(p<0){p=-p}while(--p>-1){r.push(this._fillChar)
}return true},set:function(r){if(r>1){r=1}else{if(r<0){r=0}}if(this._runBackwards){r=1-r
}var i=this._text.length,h=(r*i+0.5)|0,s,l,q;if(this._hasClass){s=(this._newClass&&h!==0);
l=(this._oldClass&&h!==i);q=(s?"<span class='"+this._newClass+"'>":"")+this._text.slice(0,h).join(this._delimiter)+(s?"</span>":"")+(l?"<span class='"+this._oldClass+"'>":"")+this._delimiter+this._original.slice(h).join(this._delimiter)+(l?"</span>":"")
}else{q=this._text.slice(0,h).join(this._delimiter)+this._delimiter+this._original.slice(h).join(this._delimiter)
}if(this._svg){this._target.textContent=q}else{this._target.innerHTML=(this._fillChar==="&nbsp;"&&q.indexOf("  ")!==-1)?q.split("  ").join("&nbsp;&nbsp;"):q
}}}),c=k.prototype;c._newClass=c._oldClass=c._delimiter=""});if(b._gsDefine){b._gsQueue.pop()()
}(function(i){var c=function(){return(b.GreenSockGlobals||b)[i]};if(typeof(define)==="function"&&define.amd){define(["./TweenLite"],c)
}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");g.exports=c()}}}("TextPlugin"))
}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./TweenLite.js":265}],263:[function(d,g,f){(function(a){
/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){b._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(y,B,c){var E=function(h){B.call(this,h);
this._labels={};this.autoRemoveChildren=(this.vars.autoRemoveChildren===true);this.smoothChildTiming=(this.vars.smoothChildTiming===true);
this._sortChildren=true;this._onUpdate=this.vars.onUpdate;var k=this.vars,j,i;for(i in k){j=k[i];
if(L(j)){if(j.join("").indexOf("{self}")!==-1){k[i]=this._swapSelfInParams(j)}}}if(L(k.tweens)){this.add(k.tweens,0,k.align,k.stagger)
}},z=1e-10,J=c._internals,p=E._internals={},F=J.isSelector,L=J.isArray,G=J.lazyTweens,M=J.lazyRender,A=b._gsDefine.globals,K=function(i){var h={},j;
for(j in i){h[j]=i[j]}return h},C=function(k,m,j){var l=k.cycle,h,i;for(h in l){i=l[h];
k[h]=(typeof(i)==="function")?i(j,m[j]):i[j%i.length]}delete k.cycle},H=p.pauseCallback=function(){},I=function(j){var i=[],k=j.length,h;
for(h=0;h!==k;i.push(j[h++])){}return i},D=E.prototype=new B();E.version="1.19.1";
D.constructor=E;D.kill()._gc=D._forcingPlayhead=D._hasPause=false;D.to=function(l,h,j,i){var k=(j.repeat&&A.TweenMax)||c;
return h?this.add(new k(l,h,j),i):this.set(l,j,i)};D.from=function(h,j,k,i){return this.add(((k.repeat&&A.TweenMax)||c).from(h,j,k),i)
};D.fromTo=function(m,h,k,j,i){var l=(j.repeat&&A.TweenMax)||c;return h?this.add(l.fromTo(m,h,k,j),i):this.set(m,j,i)
};D.staggerTo=function(s,k,r,n,t,q,m,l){var o=new E({onComplete:q,onCompleteParams:m,callbackScope:l,smoothChildTiming:this.smoothChildTiming}),i=r.cycle,j,h;
if(typeof(s)==="string"){s=c.selector(s)||s}s=s||[];if(F(s)){s=I(s)}n=n||0;if(n<0){s=I(s);
s.reverse();n*=-1}for(h=0;h<s.length;h++){j=K(r);if(j.startAt){j.startAt=K(j.startAt);
if(j.startAt.cycle){C(j.startAt,s,h)}}if(i){C(j,s,h);if(j.duration!=null){k=j.duration;
delete j.duration}}o.to(s[h],k,j,h*n)}return this.add(o,t)};D.staggerFrom=function(m,i,k,l,o,n,j,h){k.immediateRender=(k.immediateRender!=false);
k.runBackwards=true;return this.staggerTo(m,i,k,l,o,n,j,h)};D.staggerFromTo=function(h,j,n,o,k,i,q,m,l){o.startAt=n;
o.immediateRender=(o.immediateRender!=false&&n.immediateRender!=false);return this.staggerTo(h,j,o,k,i,q,m,l)
};D.call=function(h,j,k,i){return this.add(c.delayedCall(0,h,j,k),i)};D.set=function(i,j,h){h=this._parseTimeOrLabel(h,0,true);
if(j.immediateRender==null){j.immediateRender=(h===this._time&&!this._paused)}return this.add(new c(i,0,j),h)
};E.exportRoot=function(k,m){k=k||{};if(k.smoothChildTiming==null){k.smoothChildTiming=true
}var l=new E(k),i=l._timeline,j,h;if(m==null){m=true}i._remove(l,true);l._startTime=0;
l._rawPrevTime=l._time=l._totalTime=i._time;j=i._first;while(j){h=j._next;if(!m||!(j instanceof c&&j.target===j.vars.onComplete)){l.add(j,j._startTime-j._delay)
}j=h}i.add(l,0);return l};D.add=function(q,h,r,k){var m,l,i,n,o,j;if(typeof(h)!=="number"){h=this._parseTimeOrLabel(h,0,true,q)
}if(!(q instanceof y)){if((q instanceof Array)||(q&&q.push&&L(q))){r=r||"normal";
k=k||0;m=h;l=q.length;for(i=0;i<l;i++){if(L(n=q[i])){n=new E({tweens:n})}this.add(n,m);
if(typeof(n)!=="string"&&typeof(n)!=="function"){if(r==="sequence"){m=n._startTime+(n.totalDuration()/n._timeScale)
}else{if(r==="start"){n._startTime-=n.delay()}}}m+=k}return this._uncache(true)
}else{if(typeof(q)==="string"){return this.addLabel(q,h)}else{if(typeof(q)==="function"){q=c.delayedCall(0,q)
}else{throw ("Cannot add "+q+" into the timeline; it is not a tween, timeline, function, or string.")
}}}}B.prototype.add.call(this,q,h);if(this._gc||this._time===this._duration){if(!this._paused){if(this._duration<this.duration()){o=this;
j=(o.rawTime()>q._startTime);while(o._timeline){if(j&&o._timeline.smoothChildTiming){o.totalTime(o._totalTime,true)
}else{if(o._gc){o._enabled(true,false)}}o=o._timeline}}}}return this};D.remove=function(i){if(i instanceof y){this._remove(i,false);
var h=i._timeline=i.vars.useFrames?y._rootFramesTimeline:y._rootTimeline;i._startTime=(i._paused?i._pauseTime:h._time)-((!i._reversed?i._totalTime:i.totalDuration()-i._totalTime)/i._timeScale);
return this}else{if(i instanceof Array||(i&&i.push&&L(i))){var j=i.length;while(--j>-1){this.remove(i[j])
}return this}else{if(typeof(i)==="string"){return this.removeLabel(i)}}}return this.kill(null,i)
};D._remove=function(h,i){B.prototype._remove.call(this,h,i);var j=this._last;if(!j){this._time=this._totalTime=this._duration=this._totalDuration=0
}else{if(this._time>this.duration()){this._time=this._duration;this._totalTime=this._totalDuration
}}return this};D.append=function(i,h){return this.add(i,this._parseTimeOrLabel(null,h,true,i))
};D.insert=D.insertMultiple=function(j,i,h,k){return this.add(j,i||0,h,k)};D.appendMultiple=function(j,i,h,k){return this.add(j,this._parseTimeOrLabel(null,i,true,j),h,k)
};D.addLabel=function(i,h){this._labels[i]=this._parseTimeOrLabel(h);return this
};D.addPause=function(i,l,h,j){var k=c.delayedCall(0,H,h,j||this);k.vars.onComplete=k.vars.onReverseComplete=l;
k.data="isPause";this._hasPause=true;return this.add(k,i)};D.removeLabel=function(h){delete this._labels[h];
return this};D.getLabelTime=function(h){return(this._labels[h]!=null)?this._labels[h]:-1
};D._parseTimeOrLabel=function(h,i,j,l){var k;if(l instanceof y&&l.timeline===this){this.remove(l)
}else{if(l&&((l instanceof Array)||(l.push&&L(l)))){k=l.length;while(--k>-1){if(l[k] instanceof y&&l[k].timeline===this){this.remove(l[k])
}}}}if(typeof(i)==="string"){return this._parseTimeOrLabel(i,(j&&typeof(h)==="number"&&this._labels[i]==null)?h-this.duration():0,j)
}i=i||0;if(typeof(h)==="string"&&(isNaN(h)||this._labels[h]!=null)){k=h.indexOf("=");
if(k===-1){if(this._labels[h]==null){return j?(this._labels[h]=this.duration()+i):i
}return this._labels[h]+i}i=parseInt(h.charAt(k-1)+"1",10)*Number(h.substr(k+1));
h=(k>1)?this._parseTimeOrLabel(h.substr(0,k-1),0,j):this.duration()}else{if(h==null){h=this.duration()
}}return Number(h)+i};D.seek=function(h,i){return this.totalTime((typeof(h)==="number")?h:this._parseTimeOrLabel(h),(i!==false))
};D.stop=function(){return this.paused(true)};D.gotoAndPlay=function(h,i){return this.play(h,i)
};D.gotoAndStop=function(h,i){return this.pause(h,i)};D.render=function(l,n,m){if(this._gc){this._enabled(true,false)
}var v=(!this._dirty)?this._totalDuration:this.totalDuration(),k=this._time,t=this._startTime,h=this._timeScale,j=this._paused,q,u,w,r,o,s,i;
if(l>=v-1e-7&&l>=0){this._totalTime=this._time=v;if(!this._reversed){if(!this._hasPausedChild()){u=true;
r="onComplete";o=!!this._timeline.autoRemoveChildren;if(this._duration===0){if((l<=0&&l>=-1e-7)||this._rawPrevTime<0||this._rawPrevTime===z){if(this._rawPrevTime!==l&&this._first){o=true;
if(this._rawPrevTime>z){r="onReverseComplete"}}}}}}this._rawPrevTime=(this._duration||!n||l||this._rawPrevTime===l)?l:z;
l=v+0.0001}else{if(l<1e-7){this._totalTime=this._time=0;if(k!==0||(this._duration===0&&this._rawPrevTime!==z&&(this._rawPrevTime>0||(l<0&&this._rawPrevTime>=0)))){r="onReverseComplete";
u=this._reversed}if(l<0){this._active=false;if(this._timeline.autoRemoveChildren&&this._reversed){o=u=true;
r="onReverseComplete"}else{if(this._rawPrevTime>=0&&this._first){o=true}}this._rawPrevTime=l
}else{this._rawPrevTime=(this._duration||!n||l||this._rawPrevTime===l)?l:z;if(l===0&&u){q=this._first;
while(q&&q._startTime===0){if(!q._duration){u=false}q=q._next}}l=0;if(!this._initted){o=true
}}}else{if(this._hasPause&&!this._forcingPlayhead&&!n){if(l>=k){q=this._first;while(q&&q._startTime<=l&&!s){if(!q._duration){if(q.data==="isPause"&&!q.ratio&&!(q._startTime===0&&this._rawPrevTime===0)){s=q
}}q=q._next}}else{q=this._last;while(q&&q._startTime>=l&&!s){if(!q._duration){if(q.data==="isPause"&&q._rawPrevTime>0){s=q
}}q=q._prev}}if(s){this._time=l=s._startTime;this._totalTime=l+(this._cycle*(this._totalDuration+this._repeatDelay))
}}this._totalTime=this._time=this._rawPrevTime=l}}if((this._time===k||!this._first)&&!m&&!o&&!s){return
}else{if(!this._initted){this._initted=true}}if(!this._active){if(!this._paused&&this._time!==k&&l>0){this._active=true
}}if(k===0){if(this.vars.onStart){if(this._time!==0||!this._duration){if(!n){this._callback("onStart")
}}}}i=this._time;if(i>=k){q=this._first;while(q){w=q._next;if(i!==this._time||(this._paused&&!j)){break
}else{if(q._active||(q._startTime<=i&&!q._paused&&!q._gc)){if(s===q){this.pause()
}if(!q._reversed){q.render((l-q._startTime)*q._timeScale,n,m)}else{q.render(((!q._dirty)?q._totalDuration:q.totalDuration())-((l-q._startTime)*q._timeScale),n,m)
}}}q=w}}else{q=this._last;while(q){w=q._prev;if(i!==this._time||(this._paused&&!j)){break
}else{if(q._active||(q._startTime<=k&&!q._paused&&!q._gc)){if(s===q){s=q._prev;
while(s&&s.endTime()>this._time){s.render((s._reversed?s.totalDuration()-((l-s._startTime)*s._timeScale):(l-s._startTime)*s._timeScale),n,m);
s=s._prev}s=null;this.pause()}if(!q._reversed){q.render((l-q._startTime)*q._timeScale,n,m)
}else{q.render(((!q._dirty)?q._totalDuration:q.totalDuration())-((l-q._startTime)*q._timeScale),n,m)
}}}q=w}}if(this._onUpdate){if(!n){if(G.length){M()}this._callback("onUpdate")}}if(r){if(!this._gc){if(t===this._startTime||h!==this._timeScale){if(this._time===0||v>=this.totalDuration()){if(u){if(G.length){M()
}if(this._timeline.autoRemoveChildren){this._enabled(false,false)}this._active=false
}if(!n&&this.vars[r]){this._callback(r)}}}}}};D._hasPausedChild=function(){var h=this._first;
while(h){if(h._paused||((h instanceof E)&&h._hasPausedChild())){return true}h=h._next
}return false};D.getChildren=function(j,l,h,n){n=n||-9999999999;var i=[],k=this._first,m=0;
while(k){if(k._startTime<n){}else{if(k instanceof c){if(l!==false){i[m++]=k}}else{if(h!==false){i[m++]=k
}if(j!==false){i=i.concat(k.getChildren(true,l,h));m=i.length}}}k=k._next}return i
};D.getTweensOf=function(l,j){var h=this._gc,i=[],k=0,n,m;if(h){this._enabled(true,true)
}n=c.getTweensOf(l);m=n.length;while(--m>-1){if(n[m].timeline===this||(j&&this._contains(n[m]))){i[k++]=n[m]
}}if(h){this._enabled(false,true)}return i};D.recent=function(){return this._recent
};D._contains=function(i){var h=i.timeline;while(h){if(h===this){return true}h=h.timeline
}return false};D.shiftChildren=function(k,j,h){h=h||0;var m=this._first,i=this._labels,l;
while(m){if(m._startTime>=h){m._startTime+=k}m=m._next}if(j){for(l in i){if(i[l]>=h){i[l]+=k
}}}return this._uncache(true)};D._kill=function(h,j){if(!h&&!j){return this._enabled(false,false)
}var l=(!j)?this.getChildren(true,true,false):this.getTweensOf(j),i=l.length,k=false;
while(--i>-1){if(l[i]._kill(h,j)){k=true}}return k};D.clear=function(i){var j=this.getChildren(false,true,true),h=j.length;
this._time=this._totalTime=0;while(--h>-1){j[h]._enabled(false,false)}if(i!==false){this._labels={}
}return this._uncache(true)};D.invalidate=function(){var h=this._first;while(h){h.invalidate();
h=h._next}return y.prototype.invalidate.call(this)};D._enabled=function(j,h){if(j===this._gc){var i=this._first;
while(i){i._enabled(j,true);i=i._next}}return B.prototype._enabled.call(this,j,h)
};D.totalTime=function(j,k,i){this._forcingPlayhead=true;var h=y.prototype.totalTime.apply(this,arguments);
this._forcingPlayhead=false;return h};D.duration=function(h){if(!arguments.length){if(this._dirty){this.totalDuration()
}return this._duration}if(this.duration()!==0&&h!==0){this.timeScale(this._duration/h)
}return this};D.totalDuration=function(k){if(!arguments.length){if(this._dirty){var m=0,h=this._last,i=999999999999,l,j;
while(h){l=h._prev;if(h._dirty){h.totalDuration()}if(h._startTime>i&&this._sortChildren&&!h._paused){this.add(h,h._startTime-h._delay)
}else{i=h._startTime}if(h._startTime<0&&!h._paused){m-=h._startTime;if(this._timeline.smoothChildTiming){this._startTime+=h._startTime/this._timeScale
}this.shiftChildren(-h._startTime,false,-9999999999);i=0}j=h._startTime+(h._totalDuration/h._timeScale);
if(j>m){m=j}h=l}this._duration=this._totalDuration=m;this._dirty=false}return this._totalDuration
}return(k&&this.totalDuration())?this.timeScale(this._totalDuration/k):this};D.paused=function(j){if(!j){var h=this._first,i=this._time;
while(h){if(h._startTime===i&&h.data==="isPause"){h._rawPrevTime=0}h=h._next}}return y.prototype.paused.apply(this,arguments)
};D.usesFrames=function(){var h=this._timeline;while(h._timeline){h=h._timeline
}return(h===y._rootFramesTimeline)};D.rawTime=function(h){return(h&&(this._paused||(this._repeat&&this.time()>0&&this.totalProgress()<1)))?this._totalTime%(this._duration+this._repeatDelay):this._paused?this._totalTime:(this._timeline.rawTime(h)-this._startTime)*this._timeScale
};return E},true)});if(b._gsDefine){b._gsQueue.pop()()}(function(i){var c=function(){return(b.GreenSockGlobals||b)[i]
};if(typeof(define)==="function"&&define.amd){define(["./TweenLite"],c)}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");
g.exports=c()}}}("TimelineLite"))}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./TweenLite.js":265}],264:[function(d,g,f){(function(a){
/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){b._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(z,u,s){var c=function(h){z.call(this,h);
this._repeat=this.vars.repeat||0;this._repeatDelay=this.vars.repeatDelay||0;this._cycle=0;
this._yoyo=(this.vars.yoyo===true);this._dirty=true},v=1e-10,p=u._internals,A=p.lazyTweens,t=p.lazyRender,w=b._gsDefine.globals,x=new s(null,null,1,0),y=c.prototype=new z();
y.constructor=c;y.kill()._gc=false;c.version="1.19.1";y.invalidate=function(){this._yoyo=(this.vars.yoyo===true);
this._repeat=this.vars.repeat||0;this._repeatDelay=this.vars.repeatDelay||0;this._uncache(true);
return z.prototype.invalidate.call(this)};y.addCallback=function(h,k,i,j){return this.add(u.delayedCall(0,h,i,j),k)
};y.removeCallback=function(h,l){if(h){if(l==null){this._kill(null,h)}else{var k=this.getTweensOf(h,false),j=k.length,i=this._parseTimeOrLabel(l);
while(--j>-1){if(k[j]._startTime===i){k[j]._enabled(false,false)}}}}return this
};y.removePause=function(h){return this.removeCallback(z._internals.pauseCallback,h)
};y.tweenTo=function(l,n){n=n||{};var m={ease:x,useFrames:this.usesFrames(),immediateRender:false},k=(n.repeat&&w.TweenMax)||u,h,i,j;
for(i in n){m[i]=n[i]}m.time=this._parseTimeOrLabel(l);h=(Math.abs(Number(m.time)-this._time)/this._timeScale)||0.001;
j=new k(this,h,m);m.onStart=function(){j.target.paused(true);if(j.vars.time!==j.target.time()&&h===j.duration()){j.duration(Math.abs(j.vars.time-j.target.time())/j.target._timeScale)
}if(n.onStart){n.onStart.apply(n.onStartScope||n.callbackScope||j,n.onStartParams||[])
}};return j};y.tweenFromTo=function(k,h,i){i=i||{};k=this._parseTimeOrLabel(k);
i.startAt={onComplete:this.seek,onCompleteParams:[k],callbackScope:this};i.immediateRender=(i.immediateRender!==false);
var j=this.tweenTo(h,i);return j.duration((Math.abs(j.vars.time-k)/this._timeScale)||0.001)
};y.render=function(ad,V,ac){if(this._gc){this._enabled(true,false)}var h=(!this._dirty)?this._totalDuration:this.totalDuration(),k=this._duration,o=this._time,q=this._totalTime,r=this._startTime,ag=this._timeScale,n=this._rawPrevTime,j=this._paused,R=this._cycle,W,ae,m,S,Y,l,af,aa;
if(ad>=h-1e-7&&ad>=0){if(!this._locked){this._totalTime=h;this._cycle=this._repeat
}if(!this._reversed){if(!this._hasPausedChild()){ae=true;S="onComplete";Y=!!this._timeline.autoRemoveChildren;
if(this._duration===0){if((ad<=0&&ad>=-1e-7)||n<0||n===v){if(n!==ad&&this._first){Y=true;
if(n>v){S="onReverseComplete"}}}}}}this._rawPrevTime=(this._duration||!V||ad||this._rawPrevTime===ad)?ad:v;
if(this._yoyo&&(this._cycle&1)!==0){this._time=ad=0}else{this._time=k;ad=k+0.0001
}}else{if(ad<1e-7){if(!this._locked){this._totalTime=this._cycle=0}this._time=0;
if(o!==0||(k===0&&n!==v&&(n>0||(ad<0&&n>=0))&&!this._locked)){S="onReverseComplete";
ae=this._reversed}if(ad<0){this._active=false;if(this._timeline.autoRemoveChildren&&this._reversed){Y=ae=true;
S="onReverseComplete"}else{if(n>=0&&this._first){Y=true}}this._rawPrevTime=ad}else{this._rawPrevTime=(k||!V||ad||this._rawPrevTime===ad)?ad:v;
if(ad===0&&ae){W=this._first;while(W&&W._startTime===0){if(!W._duration){ae=false
}W=W._next}}ad=0;if(!this._initted){Y=true}}}else{if(k===0&&n<0){Y=true}this._time=this._rawPrevTime=ad;
if(!this._locked){this._totalTime=ad;if(this._repeat!==0){l=k+this._repeatDelay;
this._cycle=(this._totalTime/l)>>0;if(this._cycle!==0){if(this._cycle===this._totalTime/l&&q<=ad){this._cycle--
}}this._time=this._totalTime-(this._cycle*l);if(this._yoyo){if((this._cycle&1)!==0){this._time=k-this._time
}}if(this._time>k){this._time=k;ad=k+0.0001}else{if(this._time<0){this._time=ad=0
}else{ad=this._time}}}}if(this._hasPause&&!this._forcingPlayhead&&!V&&ad<k){ad=this._time;
if(ad>=o||(this._repeat&&R!==this._cycle)){W=this._first;while(W&&W._startTime<=ad&&!af){if(!W._duration){if(W.data==="isPause"&&!W.ratio&&!(W._startTime===0&&this._rawPrevTime===0)){af=W
}}W=W._next}}else{W=this._last;while(W&&W._startTime>=ad&&!af){if(!W._duration){if(W.data==="isPause"&&W._rawPrevTime>0){af=W
}}W=W._prev}}if(af){this._time=ad=af._startTime;this._totalTime=ad+(this._cycle*(this._totalDuration+this._repeatDelay))
}}}}if(this._cycle!==R){if(!this._locked){var i=(this._yoyo&&(R&1)!==0),U=(i===(this._yoyo&&(this._cycle&1)!==0)),X=this._totalTime,T=this._cycle,ab=this._rawPrevTime,Z=this._time;
this._totalTime=R*k;if(this._cycle<R){i=!i}else{this._totalTime+=k}this._time=o;
this._rawPrevTime=(k===0)?n-0.0001:n;this._cycle=R;this._locked=true;o=(i)?0:k;
this.render(o,V,(k===0));if(!V){if(!this._gc){if(this.vars.onRepeat){this._cycle=T;
this._locked=false;this._callback("onRepeat")}}}if(o!==this._time){return}if(U){this._cycle=R;
this._locked=true;o=(i)?k+0.0001:-0.0001;this.render(o,true,false)}this._locked=false;
if(this._paused&&!j){return}this._time=Z;this._totalTime=X;this._cycle=T;this._rawPrevTime=ab
}}if((this._time===o||!this._first)&&!ac&&!Y&&!af){if(q!==this._totalTime){if(this._onUpdate){if(!V){this._callback("onUpdate")
}}}return}else{if(!this._initted){this._initted=true}}if(!this._active){if(!this._paused&&this._totalTime!==q&&ad>0){this._active=true
}}if(q===0){if(this.vars.onStart){if(this._totalTime!==0||!this._totalDuration){if(!V){this._callback("onStart")
}}}}aa=this._time;if(aa>=o){W=this._first;while(W){m=W._next;if(aa!==this._time||(this._paused&&!j)){break
}else{if(W._active||(W._startTime<=this._time&&!W._paused&&!W._gc)){if(af===W){this.pause()
}if(!W._reversed){W.render((ad-W._startTime)*W._timeScale,V,ac)}else{W.render(((!W._dirty)?W._totalDuration:W.totalDuration())-((ad-W._startTime)*W._timeScale),V,ac)
}}}W=m}}else{W=this._last;while(W){m=W._prev;if(aa!==this._time||(this._paused&&!j)){break
}else{if(W._active||(W._startTime<=o&&!W._paused&&!W._gc)){if(af===W){af=W._prev;
while(af&&af.endTime()>this._time){af.render((af._reversed?af.totalDuration()-((ad-af._startTime)*af._timeScale):(ad-af._startTime)*af._timeScale),V,ac);
af=af._prev}af=null;this.pause()}if(!W._reversed){W.render((ad-W._startTime)*W._timeScale,V,ac)
}else{W.render(((!W._dirty)?W._totalDuration:W.totalDuration())-((ad-W._startTime)*W._timeScale),V,ac)
}}}W=m}}if(this._onUpdate){if(!V){if(A.length){t()}this._callback("onUpdate")}}if(S){if(!this._locked){if(!this._gc){if(r===this._startTime||ag!==this._timeScale){if(this._time===0||h>=this.totalDuration()){if(ae){if(A.length){t()
}if(this._timeline.autoRemoveChildren){this._enabled(false,false)}this._active=false
}if(!V&&this.vars[S]){this._callback(S)}}}}}}};y.getActive=function(l,n,m){if(l==null){l=true
}if(n==null){n=true}if(m==null){m=false}var k=[],j=this.getChildren(l,n,m),h=0,q=j.length,o,i;
for(o=0;o<q;o++){i=j[o];if(i.isActive()){k[h++]=i}}return k};y.getLabelAfter=function(i){if(!i){if(i!==0){i=this._time
}}var h=this.getLabelsArray(),k=h.length,j;for(j=0;j<k;j++){if(h[j].time>i){return h[j].name
}}return null};y.getLabelBefore=function(i){if(i==null){i=this._time}var h=this.getLabelsArray(),j=h.length;
while(--j>-1){if(h[j].time<i){return h[j].name}}return null};y.getLabelsArray=function(){var j=[],i=0,h;
for(h in this._labels){j[i++]={time:this._labels[h],name:h}}j.sort(function(k,l){return k.time-l.time
});return j};y.invalidate=function(){this._locked=false;return z.prototype.invalidate.call(this)
};y.progress=function(h,i){return(!arguments.length)?this._time/this.duration():this.totalTime(this.duration()*((this._yoyo&&(this._cycle&1)!==0)?1-h:h)+(this._cycle*(this._duration+this._repeatDelay)),i)
};y.totalProgress=function(h,i){return(!arguments.length)?this._totalTime/this.totalDuration():this.totalTime(this.totalDuration()*h,i)
};y.totalDuration=function(h){if(!arguments.length){if(this._dirty){z.prototype.totalDuration.call(this);
this._totalDuration=(this._repeat===-1)?999999999999:this._duration*(this._repeat+1)+(this._repeatDelay*this._repeat)
}return this._totalDuration}return(this._repeat===-1||!h)?this:this.timeScale(this.totalDuration()/h)
};y.time=function(h,i){if(!arguments.length){return this._time}if(this._dirty){this.totalDuration()
}if(h>this._duration){h=this._duration}if(this._yoyo&&(this._cycle&1)!==0){h=(this._duration-h)+(this._cycle*(this._duration+this._repeatDelay))
}else{if(this._repeat!==0){h+=this._cycle*(this._duration+this._repeatDelay)}}return this.totalTime(h,i)
};y.repeat=function(h){if(!arguments.length){return this._repeat}this._repeat=h;
return this._uncache(true)};y.repeatDelay=function(h){if(!arguments.length){return this._repeatDelay
}this._repeatDelay=h;return this._uncache(true)};y.yoyo=function(h){if(!arguments.length){return this._yoyo
}this._yoyo=h;return this};y.currentLabel=function(h){if(!arguments.length){return this.getLabelBefore(this._time+1e-8)
}return this.seek(h,true)};return c},true);b._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(y,B,c){var E=function(h){B.call(this,h);
this._labels={};this.autoRemoveChildren=(this.vars.autoRemoveChildren===true);this.smoothChildTiming=(this.vars.smoothChildTiming===true);
this._sortChildren=true;this._onUpdate=this.vars.onUpdate;var k=this.vars,j,i;for(i in k){j=k[i];
if(L(j)){if(j.join("").indexOf("{self}")!==-1){k[i]=this._swapSelfInParams(j)}}}if(L(k.tweens)){this.add(k.tweens,0,k.align,k.stagger)
}},z=1e-10,J=c._internals,p=E._internals={},F=J.isSelector,L=J.isArray,G=J.lazyTweens,M=J.lazyRender,A=b._gsDefine.globals,K=function(i){var h={},j;
for(j in i){h[j]=i[j]}return h},C=function(k,m,j){var l=k.cycle,h,i;for(h in l){i=l[h];
k[h]=(typeof(i)==="function")?i(j,m[j]):i[j%i.length]}delete k.cycle},H=p.pauseCallback=function(){},I=function(j){var i=[],k=j.length,h;
for(h=0;h!==k;i.push(j[h++])){}return i},D=E.prototype=new B();E.version="1.19.1";
D.constructor=E;D.kill()._gc=D._forcingPlayhead=D._hasPause=false;D.to=function(l,h,j,i){var k=(j.repeat&&A.TweenMax)||c;
return h?this.add(new k(l,h,j),i):this.set(l,j,i)};D.from=function(h,j,k,i){return this.add(((k.repeat&&A.TweenMax)||c).from(h,j,k),i)
};D.fromTo=function(m,h,k,j,i){var l=(j.repeat&&A.TweenMax)||c;return h?this.add(l.fromTo(m,h,k,j),i):this.set(m,j,i)
};D.staggerTo=function(s,k,r,n,t,q,m,l){var o=new E({onComplete:q,onCompleteParams:m,callbackScope:l,smoothChildTiming:this.smoothChildTiming}),i=r.cycle,j,h;
if(typeof(s)==="string"){s=c.selector(s)||s}s=s||[];if(F(s)){s=I(s)}n=n||0;if(n<0){s=I(s);
s.reverse();n*=-1}for(h=0;h<s.length;h++){j=K(r);if(j.startAt){j.startAt=K(j.startAt);
if(j.startAt.cycle){C(j.startAt,s,h)}}if(i){C(j,s,h);if(j.duration!=null){k=j.duration;
delete j.duration}}o.to(s[h],k,j,h*n)}return this.add(o,t)};D.staggerFrom=function(m,i,k,l,o,n,j,h){k.immediateRender=(k.immediateRender!=false);
k.runBackwards=true;return this.staggerTo(m,i,k,l,o,n,j,h)};D.staggerFromTo=function(h,j,n,o,k,i,q,m,l){o.startAt=n;
o.immediateRender=(o.immediateRender!=false&&n.immediateRender!=false);return this.staggerTo(h,j,o,k,i,q,m,l)
};D.call=function(h,j,k,i){return this.add(c.delayedCall(0,h,j,k),i)};D.set=function(i,j,h){h=this._parseTimeOrLabel(h,0,true);
if(j.immediateRender==null){j.immediateRender=(h===this._time&&!this._paused)}return this.add(new c(i,0,j),h)
};E.exportRoot=function(k,m){k=k||{};if(k.smoothChildTiming==null){k.smoothChildTiming=true
}var l=new E(k),i=l._timeline,j,h;if(m==null){m=true}i._remove(l,true);l._startTime=0;
l._rawPrevTime=l._time=l._totalTime=i._time;j=i._first;while(j){h=j._next;if(!m||!(j instanceof c&&j.target===j.vars.onComplete)){l.add(j,j._startTime-j._delay)
}j=h}i.add(l,0);return l};D.add=function(q,h,r,k){var m,l,i,n,o,j;if(typeof(h)!=="number"){h=this._parseTimeOrLabel(h,0,true,q)
}if(!(q instanceof y)){if((q instanceof Array)||(q&&q.push&&L(q))){r=r||"normal";
k=k||0;m=h;l=q.length;for(i=0;i<l;i++){if(L(n=q[i])){n=new E({tweens:n})}this.add(n,m);
if(typeof(n)!=="string"&&typeof(n)!=="function"){if(r==="sequence"){m=n._startTime+(n.totalDuration()/n._timeScale)
}else{if(r==="start"){n._startTime-=n.delay()}}}m+=k}return this._uncache(true)
}else{if(typeof(q)==="string"){return this.addLabel(q,h)}else{if(typeof(q)==="function"){q=c.delayedCall(0,q)
}else{throw ("Cannot add "+q+" into the timeline; it is not a tween, timeline, function, or string.")
}}}}B.prototype.add.call(this,q,h);if(this._gc||this._time===this._duration){if(!this._paused){if(this._duration<this.duration()){o=this;
j=(o.rawTime()>q._startTime);while(o._timeline){if(j&&o._timeline.smoothChildTiming){o.totalTime(o._totalTime,true)
}else{if(o._gc){o._enabled(true,false)}}o=o._timeline}}}}return this};D.remove=function(i){if(i instanceof y){this._remove(i,false);
var h=i._timeline=i.vars.useFrames?y._rootFramesTimeline:y._rootTimeline;i._startTime=(i._paused?i._pauseTime:h._time)-((!i._reversed?i._totalTime:i.totalDuration()-i._totalTime)/i._timeScale);
return this}else{if(i instanceof Array||(i&&i.push&&L(i))){var j=i.length;while(--j>-1){this.remove(i[j])
}return this}else{if(typeof(i)==="string"){return this.removeLabel(i)}}}return this.kill(null,i)
};D._remove=function(h,i){B.prototype._remove.call(this,h,i);var j=this._last;if(!j){this._time=this._totalTime=this._duration=this._totalDuration=0
}else{if(this._time>this.duration()){this._time=this._duration;this._totalTime=this._totalDuration
}}return this};D.append=function(i,h){return this.add(i,this._parseTimeOrLabel(null,h,true,i))
};D.insert=D.insertMultiple=function(j,i,h,k){return this.add(j,i||0,h,k)};D.appendMultiple=function(j,i,h,k){return this.add(j,this._parseTimeOrLabel(null,i,true,j),h,k)
};D.addLabel=function(i,h){this._labels[i]=this._parseTimeOrLabel(h);return this
};D.addPause=function(i,l,h,j){var k=c.delayedCall(0,H,h,j||this);k.vars.onComplete=k.vars.onReverseComplete=l;
k.data="isPause";this._hasPause=true;return this.add(k,i)};D.removeLabel=function(h){delete this._labels[h];
return this};D.getLabelTime=function(h){return(this._labels[h]!=null)?this._labels[h]:-1
};D._parseTimeOrLabel=function(h,i,j,l){var k;if(l instanceof y&&l.timeline===this){this.remove(l)
}else{if(l&&((l instanceof Array)||(l.push&&L(l)))){k=l.length;while(--k>-1){if(l[k] instanceof y&&l[k].timeline===this){this.remove(l[k])
}}}}if(typeof(i)==="string"){return this._parseTimeOrLabel(i,(j&&typeof(h)==="number"&&this._labels[i]==null)?h-this.duration():0,j)
}i=i||0;if(typeof(h)==="string"&&(isNaN(h)||this._labels[h]!=null)){k=h.indexOf("=");
if(k===-1){if(this._labels[h]==null){return j?(this._labels[h]=this.duration()+i):i
}return this._labels[h]+i}i=parseInt(h.charAt(k-1)+"1",10)*Number(h.substr(k+1));
h=(k>1)?this._parseTimeOrLabel(h.substr(0,k-1),0,j):this.duration()}else{if(h==null){h=this.duration()
}}return Number(h)+i};D.seek=function(h,i){return this.totalTime((typeof(h)==="number")?h:this._parseTimeOrLabel(h),(i!==false))
};D.stop=function(){return this.paused(true)};D.gotoAndPlay=function(h,i){return this.play(h,i)
};D.gotoAndStop=function(h,i){return this.pause(h,i)};D.render=function(l,n,m){if(this._gc){this._enabled(true,false)
}var v=(!this._dirty)?this._totalDuration:this.totalDuration(),k=this._time,t=this._startTime,h=this._timeScale,j=this._paused,q,u,w,r,o,s,i;
if(l>=v-1e-7&&l>=0){this._totalTime=this._time=v;if(!this._reversed){if(!this._hasPausedChild()){u=true;
r="onComplete";o=!!this._timeline.autoRemoveChildren;if(this._duration===0){if((l<=0&&l>=-1e-7)||this._rawPrevTime<0||this._rawPrevTime===z){if(this._rawPrevTime!==l&&this._first){o=true;
if(this._rawPrevTime>z){r="onReverseComplete"}}}}}}this._rawPrevTime=(this._duration||!n||l||this._rawPrevTime===l)?l:z;
l=v+0.0001}else{if(l<1e-7){this._totalTime=this._time=0;if(k!==0||(this._duration===0&&this._rawPrevTime!==z&&(this._rawPrevTime>0||(l<0&&this._rawPrevTime>=0)))){r="onReverseComplete";
u=this._reversed}if(l<0){this._active=false;if(this._timeline.autoRemoveChildren&&this._reversed){o=u=true;
r="onReverseComplete"}else{if(this._rawPrevTime>=0&&this._first){o=true}}this._rawPrevTime=l
}else{this._rawPrevTime=(this._duration||!n||l||this._rawPrevTime===l)?l:z;if(l===0&&u){q=this._first;
while(q&&q._startTime===0){if(!q._duration){u=false}q=q._next}}l=0;if(!this._initted){o=true
}}}else{if(this._hasPause&&!this._forcingPlayhead&&!n){if(l>=k){q=this._first;while(q&&q._startTime<=l&&!s){if(!q._duration){if(q.data==="isPause"&&!q.ratio&&!(q._startTime===0&&this._rawPrevTime===0)){s=q
}}q=q._next}}else{q=this._last;while(q&&q._startTime>=l&&!s){if(!q._duration){if(q.data==="isPause"&&q._rawPrevTime>0){s=q
}}q=q._prev}}if(s){this._time=l=s._startTime;this._totalTime=l+(this._cycle*(this._totalDuration+this._repeatDelay))
}}this._totalTime=this._time=this._rawPrevTime=l}}if((this._time===k||!this._first)&&!m&&!o&&!s){return
}else{if(!this._initted){this._initted=true}}if(!this._active){if(!this._paused&&this._time!==k&&l>0){this._active=true
}}if(k===0){if(this.vars.onStart){if(this._time!==0||!this._duration){if(!n){this._callback("onStart")
}}}}i=this._time;if(i>=k){q=this._first;while(q){w=q._next;if(i!==this._time||(this._paused&&!j)){break
}else{if(q._active||(q._startTime<=i&&!q._paused&&!q._gc)){if(s===q){this.pause()
}if(!q._reversed){q.render((l-q._startTime)*q._timeScale,n,m)}else{q.render(((!q._dirty)?q._totalDuration:q.totalDuration())-((l-q._startTime)*q._timeScale),n,m)
}}}q=w}}else{q=this._last;while(q){w=q._prev;if(i!==this._time||(this._paused&&!j)){break
}else{if(q._active||(q._startTime<=k&&!q._paused&&!q._gc)){if(s===q){s=q._prev;
while(s&&s.endTime()>this._time){s.render((s._reversed?s.totalDuration()-((l-s._startTime)*s._timeScale):(l-s._startTime)*s._timeScale),n,m);
s=s._prev}s=null;this.pause()}if(!q._reversed){q.render((l-q._startTime)*q._timeScale,n,m)
}else{q.render(((!q._dirty)?q._totalDuration:q.totalDuration())-((l-q._startTime)*q._timeScale),n,m)
}}}q=w}}if(this._onUpdate){if(!n){if(G.length){M()}this._callback("onUpdate")}}if(r){if(!this._gc){if(t===this._startTime||h!==this._timeScale){if(this._time===0||v>=this.totalDuration()){if(u){if(G.length){M()
}if(this._timeline.autoRemoveChildren){this._enabled(false,false)}this._active=false
}if(!n&&this.vars[r]){this._callback(r)}}}}}};D._hasPausedChild=function(){var h=this._first;
while(h){if(h._paused||((h instanceof E)&&h._hasPausedChild())){return true}h=h._next
}return false};D.getChildren=function(j,l,h,n){n=n||-9999999999;var i=[],k=this._first,m=0;
while(k){if(k._startTime<n){}else{if(k instanceof c){if(l!==false){i[m++]=k}}else{if(h!==false){i[m++]=k
}if(j!==false){i=i.concat(k.getChildren(true,l,h));m=i.length}}}k=k._next}return i
};D.getTweensOf=function(l,j){var h=this._gc,i=[],k=0,n,m;if(h){this._enabled(true,true)
}n=c.getTweensOf(l);m=n.length;while(--m>-1){if(n[m].timeline===this||(j&&this._contains(n[m]))){i[k++]=n[m]
}}if(h){this._enabled(false,true)}return i};D.recent=function(){return this._recent
};D._contains=function(i){var h=i.timeline;while(h){if(h===this){return true}h=h.timeline
}return false};D.shiftChildren=function(k,j,h){h=h||0;var m=this._first,i=this._labels,l;
while(m){if(m._startTime>=h){m._startTime+=k}m=m._next}if(j){for(l in i){if(i[l]>=h){i[l]+=k
}}}return this._uncache(true)};D._kill=function(h,j){if(!h&&!j){return this._enabled(false,false)
}var l=(!j)?this.getChildren(true,true,false):this.getTweensOf(j),i=l.length,k=false;
while(--i>-1){if(l[i]._kill(h,j)){k=true}}return k};D.clear=function(i){var j=this.getChildren(false,true,true),h=j.length;
this._time=this._totalTime=0;while(--h>-1){j[h]._enabled(false,false)}if(i!==false){this._labels={}
}return this._uncache(true)};D.invalidate=function(){var h=this._first;while(h){h.invalidate();
h=h._next}return y.prototype.invalidate.call(this)};D._enabled=function(j,h){if(j===this._gc){var i=this._first;
while(i){i._enabled(j,true);i=i._next}}return B.prototype._enabled.call(this,j,h)
};D.totalTime=function(j,k,i){this._forcingPlayhead=true;var h=y.prototype.totalTime.apply(this,arguments);
this._forcingPlayhead=false;return h};D.duration=function(h){if(!arguments.length){if(this._dirty){this.totalDuration()
}return this._duration}if(this.duration()!==0&&h!==0){this.timeScale(this._duration/h)
}return this};D.totalDuration=function(k){if(!arguments.length){if(this._dirty){var m=0,h=this._last,i=999999999999,l,j;
while(h){l=h._prev;if(h._dirty){h.totalDuration()}if(h._startTime>i&&this._sortChildren&&!h._paused){this.add(h,h._startTime-h._delay)
}else{i=h._startTime}if(h._startTime<0&&!h._paused){m-=h._startTime;if(this._timeline.smoothChildTiming){this._startTime+=h._startTime/this._timeScale
}this.shiftChildren(-h._startTime,false,-9999999999);i=0}j=h._startTime+(h._totalDuration/h._timeScale);
if(j>m){m=j}h=l}this._duration=this._totalDuration=m;this._dirty=false}return this._totalDuration
}return(k&&this.totalDuration())?this.timeScale(this._totalDuration/k):this};D.paused=function(j){if(!j){var h=this._first,i=this._time;
while(h){if(h._startTime===i&&h.data==="isPause"){h._rawPrevTime=0}h=h._next}}return y.prototype.paused.apply(this,arguments)
};D.usesFrames=function(){var h=this._timeline;while(h._timeline){h=h._timeline
}return(h===y._rootFramesTimeline)};D.rawTime=function(h){return(h&&(this._paused||(this._repeat&&this.time()>0&&this.totalProgress()<1)))?this._totalTime%(this._duration+this._repeatDelay):this._paused?this._totalTime:(this._timeline.rawTime(h)-this._startTime)*this._timeScale
};return E},true)});if(b._gsDefine){b._gsQueue.pop()()}(function(i){var c=function(){return(b.GreenSockGlobals||b)[i]
};if(typeof(define)==="function"&&define.amd){define(["./TweenLite"],c)}else{if(typeof(g)!=="undefined"&&g.exports){d("./TweenLite.js");
g.exports=c()}}}("TimelineMax"))}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./TweenLite.js":265}],265:[function(d,g,f){(function(a){
/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function(c,aY){var aZ={},a5=c.document,ax=c.GreenSockGlobals=c.GreenSockGlobals||c;
if(ax.TweenLite){return}var aJ=function(j){var l=j.split("."),h=ax,k;for(k=0;k<l.length;
k++){h[l[k]]=h=h[l[k]]||{}}return h},a3=aJ("com.greensock"),a9=1e-10,aT=function(j){var l=[],k=j.length,h;
for(h=0;h!==k;l.push(j[h++])){}return l},az=function(){},aE=(function(){var h=Object.prototype.toString,j=h.call([]);
return function(k){return k!=null&&(k instanceof Array||(typeof(k)==="object"&&!!k.push&&h.call(k)===j))
}}()),aB,aN,aU,aL,av,a6={},aD=function(m,j,k,l){this.sc=(a6[m])?a6[m].sc:[];a6[m]=this;
this.gsClass=null;this.func=k;var h=[];this.check=function(u){var n=j.length,o=n,v,q,s,r,t;
while(--n>-1){if((v=a6[j[n]]||new aD(j[n],[])).gsClass){h[n]=v.gsClass;o--}else{if(u){v.sc.push(this)
}}}if(o===0&&k){q=("com.greensock."+m).split(".");s=q.pop();r=aJ(q.join("."))[s]=this.gsClass=k.apply(k,h);
if(l){ax[s]=aZ[s]=r;t=(typeof(g)!=="undefined"&&g.exports);if(!t&&typeof(define)==="function"&&define.amd){define((c.GreenSockAMDPath?c.GreenSockAMDPath+"/":"")+m.split(".").pop(),[],function(){return r
})}else{if(t){if(m===aY){g.exports=aZ[aY]=r;for(n in aZ){r[n]=aZ[n]}}else{if(aZ[aY]){aZ[aY][s]=r
}}}}}for(n=0;n<this.sc.length;n++){this.sc[n].check()}}};this.check(true)},bc=c._gsDefine=function(h,j,k,l){return new aD(h,j,k,l)
},aX=a3._class=function(h,j,k){j=j||function(){};bc(h,[],function(){return j},k);
return j};bc.globals=ax;var aC=[0,0,1,1],aS=[],aH=aX("easing.Ease",function(k,j,l,h){this._func=k;
this._type=l||0;this._power=h||0;this._params=j?aC.concat(j):aC},true),ay=aH.map={},a0=aH.register=function(t,h,m,o){var n=h.split(","),r=n.length,q=(m||"easeIn,easeOut,easeInOut").split(","),l,k,s,j;
while(--r>-1){k=n[r];l=o?aX("easing."+k,null,true):a3.easing[k]||{};s=q.length;
while(--s>-1){j=q[s];ay[k+"."+j]=ay[j+k]=l[j]=t.getRatio?t:t[j]||new t()}}};aU=aH.prototype;
aU._calcEnd=false;aU.getRatio=function(j){if(this._func){this._params[0]=j;return this._func.apply(null,this._params)
}var h=this._type,l=this._power,k=(h===1)?1-j:(h===2)?j:(j<0.5)?j*2:(1-j)*2;if(l===1){k*=k
}else{if(l===2){k*=k*k}else{if(l===3){k*=k*k*k}else{if(l===4){k*=k*k*k*k}}}}return(h===1)?1-k:(h===2)?k:(j<0.5)?k/2:1-(k/2)
};aB=["Linear","Quad","Cubic","Quart","Quint,Strong"];aN=aB.length;while(--aN>-1){aU=aB[aN]+",Power"+aN;
a0(new aH(null,null,1,aN),aU,"easeOut",true);a0(new aH(null,null,2,aN),aU,"easeIn"+((aN===0)?",easeNone":""));
a0(new aH(null,null,3,aN),aU,"easeInOut")}ay.linear=a3.easing.Linear.easeIn;ay.swing=a3.easing.Quad.easeInOut;
var aP=aX("events.EventDispatcher",function(h){this._listeners={};this._eventTarget=h||this
});aU=aP.prototype;aU.addEventListener=function(m,k,j,r,l){l=l||0;var n=this._listeners[m],o=0,h,q;
if(this===aL&&!av){aL.wake()}if(n==null){this._listeners[m]=n=[]}q=n.length;while(--q>-1){h=n[q];
if(h.c===k&&h.s===j){n.splice(q,1)}else{if(o===0&&h.pr<l){o=q+1}}}n.splice(o,0,{c:k,s:j,up:r,pr:l})
};aU.removeEventListener=function(k,h){var j=this._listeners[k],l;if(j){l=j.length;
while(--l>-1){if(j[l].c===h){j.splice(l,1);return}}}};aU.dispatchEvent=function(k){var h=this._listeners[k],l,m,j;
if(h){l=h.length;if(l>1){h=h.slice(0)}m=this._eventTarget;while(--l>-1){j=h[l];
if(j){if(j.up){j.c.call(j.s||m,{type:k,target:m})}else{j.c.call(j.s||m)}}}}};var a4=c.requestAnimationFrame,a2=c.cancelAnimationFrame,i=Date.now||function(){return new Date().getTime()
},at=i();aB=["ms","moz","webkit","o"];aN=aB.length;while(--aN>-1&&!a4){a4=c[aB[aN]+"RequestAnimationFrame"];
a2=c[aB[aN]+"CancelAnimationFrame"]||c[aB[aN]+"CancelRequestAnimationFrame"]}aX("Ticker",function(s,m){var k=this,t=i(),v=(m!==false&&a4)?"auto":false,r=500,l=33,n="tick",o,h,j,w,q,u=function(y){var A=i()-at,x,z;
if(A>r){t+=A-l}at+=A;k.time=(at-t)/1000;x=k.time-q;if(!o||x>0||y===true){k.frame++;
q+=x+(x>=w?0.004:w-x);z=true}if(y!==true){j=h(u)}if(z){k.dispatchEvent(n)}};aP.call(k);
k.time=k.frame=0;k.tick=function(){u(true)};k.lagSmoothing=function(x,y){r=x||(1/a9);
l=Math.min(y,r,0)};k.sleep=function(){if(j==null){return}if(!v||!a2){clearTimeout(j)
}else{a2(j)}h=az;j=null;if(k===aL){av=false}};k.wake=function(x){if(j!==null){k.sleep()
}else{if(x){t+=-at+(at=i())}else{if(k.frame>10){at=i()-r+5}}}h=(o===0)?az:(!v||!a4)?function(y){return setTimeout(y,((q-k.time)*1000+1)|0)
}:a4;if(k===aL){av=true}u(2)};k.fps=function(x){if(!arguments.length){return o}o=x;
w=1/(o||60);q=this.time+w;k.wake()};k.useRAF=function(x){if(!arguments.length){return v
}k.sleep();v=x;k.fps(o)};k.fps(s);setTimeout(function(){if(v==="auto"&&k.frame<5&&a5.visibilityState!=="hidden"){k.useRAF(false)
}},1500)});aU=a3.Ticker.prototype=new a3.events.EventDispatcher();aU.constructor=a3.Ticker;
var aV=aX("core.Animation",function(j,k){this.vars=k=k||{};this._duration=this._totalDuration=j||0;
this._delay=Number(k.delay)||0;this._timeScale=1;this._active=(k.immediateRender===true);
this.data=k.data;this._reversed=(k.reversed===true);if(!aw){return}if(!av){aL.wake()
}var h=this.vars.useFrames?aW:aw;h.add(this,h._time);if(this.vars.paused){this.paused(true)
}});aL=aV.ticker=new a3.Ticker();aU=aV.prototype;aU._dirty=aU._gc=aU._initted=aU._paused=false;
aU._totalTime=aU._time=0;aU._rawPrevTime=-1;aU._next=aU._last=aU._onUpdate=aU._timeline=aU.timeline=null;
aU._paused=false;var ar=function(){if(av&&i()-at>2000){aL.wake()}setTimeout(ar,2000)
};ar();aU.play=function(j,h){if(j!=null){this.seek(j,h)}return this.reversed(false).paused(false)
};aU.pause=function(h,j){if(h!=null){this.seek(h,j)}return this.paused(true)};aU.resume=function(j,h){if(j!=null){this.seek(j,h)
}return this.paused(false)};aU.seek=function(j,h){return this.totalTime(Number(j),h!==false)
};aU.restart=function(j,h){return this.reversed(false).paused(false).totalTime(j?-this._delay:0,(h!==false),true)
};aU.reverse=function(j,h){if(j!=null){this.seek((j||this.totalDuration()),h)}return this.reversed(true).paused(false)
};aU.render=function(j,h,k){};aU.invalidate=function(){this._time=this._totalTime=0;
this._initted=this._gc=false;this._rawPrevTime=-1;if(this._gc||!this.timeline){this._enabled(true)
}return this};aU.isActive=function(){var k=this._timeline,j=this._startTime,h;return(!k||(!this._gc&&!this._paused&&k.isActive()&&(h=k.rawTime(true))>=j&&h<j+this.totalDuration()/this._timeScale))
};aU._enabled=function(j,h){if(!av){aL.wake()}this._gc=!j;this._active=this.isActive();
if(h!==true){if(j&&!this.timeline){this._timeline.add(this,this._startTime-this._delay)
}else{if(!j&&this.timeline){this._timeline._remove(this,true)}}}return false};aU._kill=function(j,h){return this._enabled(false,false)
};aU.kill=function(j,h){this._kill(j,h);return this};aU._uncache=function(h){var j=h?this:this.timeline;
while(j){j._dirty=true;j=j.timeline}return this};aU._swapSelfInParams=function(j){var k=j.length,h=j.concat();
while(--k>-1){if(j[k]==="{self}"){h[k]=this}}return h};aU._callback=function(l){var n=this.vars,j=n[l],k=n[l+"Params"],m=n[l+"Scope"]||n.callbackScope||this,h=k?k.length:0;
switch(h){case 0:j.call(m);break;case 1:j.call(m,k[0]);break;case 2:j.call(m,k[0],k[1]);
break;default:j.apply(m,k)}};aU.eventCallback=function(l,j,k,m){if((l||"").substr(0,2)==="on"){var h=this.vars;
if(arguments.length===1){return h[l]}if(j==null){delete h[l]}else{h[l]=j;h[l+"Params"]=(aE(k)&&k.join("").indexOf("{self}")!==-1)?this._swapSelfInParams(k):k;
h[l+"Scope"]=m}if(l==="onUpdate"){this._onUpdate=j}}return this};aU.delay=function(h){if(!arguments.length){return this._delay
}if(this._timeline.smoothChildTiming){this.startTime(this._startTime+h-this._delay)
}this._delay=h;return this};aU.duration=function(h){if(!arguments.length){this._dirty=false;
return this._duration}this._duration=this._totalDuration=h;this._uncache(true);
if(this._timeline.smoothChildTiming){if(this._time>0){if(this._time<this._duration){if(h!==0){this.totalTime(this._totalTime*(h/this._duration),true)
}}}}return this};aU.totalDuration=function(h){this._dirty=false;return(!arguments.length)?this._totalDuration:this.duration(h)
};aU.time=function(j,h){if(!arguments.length){return this._time}if(this._dirty){this.totalDuration()
}return this.totalTime((j>this._duration)?this._duration:j,h)};aU.totalTime=function(k,l,m){if(!av){aL.wake()
}if(!arguments.length){return this._totalTime}if(this._timeline){if(k<0&&!m){k+=this.totalDuration()
}if(this._timeline.smoothChildTiming){if(this._dirty){this.totalDuration()}var j=this._totalDuration,h=this._timeline;
if(k>j&&!m){k=j}this._startTime=(this._paused?this._pauseTime:h._time)-((!this._reversed?k:j-k)/this._timeScale);
if(!h._dirty){this._uncache(false)}if(h._timeline){while(h._timeline){if(h._timeline._time!==(h._startTime+h._totalTime)/h._timeScale){h.totalTime(h._totalTime,true)
}h=h._timeline}}}if(this._gc){this._enabled(true,false)}if(this._totalTime!==k||this._duration===0){if(aA.length){a1()
}this.render(k,l,false);if(aA.length){a1()}}}return this};aU.progress=aU.totalProgress=function(k,h){var j=this.duration();
return(!arguments.length)?(j?this._time/j:this.ratio):this.totalTime(j*k,h)};aU.startTime=function(h){if(!arguments.length){return this._startTime
}if(h!==this._startTime){this._startTime=h;if(this.timeline){if(this.timeline._sortChildren){this.timeline.add(this,h-this._delay)
}}}return this};aU.endTime=function(h){return this._startTime+((h!=false)?this.totalDuration():this.duration())/this._timeScale
};aU.timeScale=function(j){if(!arguments.length){return this._timeScale}j=j||a9;
if(this._timeline&&this._timeline.smoothChildTiming){var h=this._pauseTime,k=(h||h===0)?h:this._timeline.totalTime();
this._startTime=k-((k-this._startTime)*this._timeScale/j)}this._timeScale=j;return this._uncache(false)
};aU.reversed=function(h){if(!arguments.length){return this._reversed}if(h!=this._reversed){this._reversed=h;
this.totalTime(((this._timeline&&!this._timeline.smoothChildTiming)?this.totalDuration()-this._totalTime:this._totalTime),true)
}return this};aU.paused=function(j){if(!arguments.length){return this._paused}var l=this._timeline,k,h;
if(j!=this._paused){if(l){if(!av&&!j){aL.wake()}k=l.rawTime();h=k-this._pauseTime;
if(!j&&l.smoothChildTiming){this._startTime+=h;this._uncache(false)}this._pauseTime=j?k:null;
this._paused=j;this._active=this.isActive();if(!j&&h!==0&&this._initted&&this.duration()){k=l.smoothChildTiming?this._totalTime:(k-this._startTime)/this._timeScale;
this.render(k,(k===this._totalTime),true)}}}if(this._gc&&!j){this._enabled(true,false)
}return this};var aI=aX("core.SimpleTimeline",function(h){aV.call(this,0,h);this.autoRemoveChildren=this.smoothChildTiming=true
});aU=aI.prototype=new aV();aU.constructor=aI;aU.kill()._gc=false;aU._first=aU._last=aU._recent=null;
aU._sortChildren=false;aU.add=aU.insert=function(j,h,k,l){var m,n;j._startTime=Number(h||0)+j._delay;
if(j._paused){if(this!==j._timeline){j._pauseTime=j._startTime+((this.rawTime()-j._startTime)/j._timeScale)
}}if(j.timeline){j.timeline._remove(j,true)}j.timeline=j._timeline=this;if(j._gc){j._enabled(true,true)
}m=this._last;if(this._sortChildren){n=j._startTime;while(m&&m._startTime>n){m=m._prev
}}if(m){j._next=m._next;m._next=j}else{j._next=this._first;this._first=j}if(j._next){j._next._prev=j
}else{this._last=j}j._prev=m;this._recent=j;if(this._timeline){this._uncache(true)
}return this};aU._remove=function(h,j){if(h.timeline===this){if(!j){h._enabled(false,true)
}if(h._prev){h._prev._next=h._next}else{if(this._first===h){this._first=h._next
}}if(h._next){h._next._prev=h._prev}else{if(this._last===h){this._last=h._prev}}h._next=h._prev=h.timeline=null;
if(h===this._recent){this._recent=this._last}if(this._timeline){this._uncache(true)
}}return this};aU.render=function(j,l,k){var h=this._first,m;this._totalTime=this._time=this._rawPrevTime=j;
while(h){m=h._next;if(h._active||(j>=h._startTime&&!h._paused)){if(!h._reversed){h.render((j-h._startTime)*h._timeScale,l,k)
}else{h.render(((!h._dirty)?h._totalDuration:h.totalDuration())-((j-h._startTime)*h._timeScale),l,k)
}}h=m}};aU.rawTime=function(){if(!av){aL.wake()}return this._totalTime};var aF=aX("TweenLite",function(j,k,l){aV.call(this,k,l);
this.render=aF.prototype.render;if(j==null){throw"Cannot tween a null target."}this.target=j=(typeof(j)!=="string")?j:aF.selector(j)||j;
var h=(j.jquery||(j.length&&j!==c&&j[0]&&(j[0]===c||(j[0].nodeType&&j[0].style&&!j.nodeType)))),o=this.vars.overwrite,m,n,q;
this._overwrite=o=(o==null)?aQ[aF.defaultOverwrite]:(typeof(o)==="number")?o>>0:aQ[o];
if((h||j instanceof Array||(j.push&&aE(j)))&&typeof(j[0])!=="number"){this._targets=q=aT(j);
this._propLookup=[];this._siblings=[];for(m=0;m<q.length;m++){n=q[m];if(!n){q.splice(m--,1);
continue}else{if(typeof(n)==="string"){n=q[m--]=aF.selector(n);if(typeof(n)==="string"){q.splice(m+1,1)
}continue}else{if(n.length&&n!==c&&n[0]&&(n[0]===c||(n[0].nodeType&&n[0].style&&!n.nodeType))){q.splice(m--,1);
this._targets=q=q.concat(aT(n));continue}}}this._siblings[m]=ap(n,this,false);if(o===1){if(this._siblings[m].length>1){a8(n,this,null,1,this._siblings[m])
}}}}else{this._propLookup={};this._siblings=ap(j,this,false);if(o===1){if(this._siblings.length>1){a8(j,this,null,1,this._siblings)
}}}if(this.vars.immediateRender||(k===0&&this._delay===0&&this.vars.immediateRender!==false)){this._time=-a9;
this.render(Math.min(0,-this._delay))}},true),aG=function(h){return(h&&h.length&&h!==c&&h[0]&&(h[0]===c||(h[0].nodeType&&h[0].style&&!h.nodeType)))
},a7=function(j,k){var h={},l;for(l in j){if(!an[l]&&(!(l in k)||l==="transform"||l==="x"||l==="y"||l==="width"||l==="height"||l==="className"||l==="border")&&(!aM[l]||(aM[l]&&aM[l]._autoCSS))){h[l]=j[l];
delete j[l]}}j.css=h};aU=aF.prototype=new aV();aU.constructor=aF;aU.kill()._gc=false;
aU.ratio=0;aU._firstPT=aU._targets=aU._overwrittenProps=aU._startAt=null;aU._notifyPluginsOfEnabled=aU._lazy=false;
aF.version="1.19.1";aF.defaultEase=aU._ease=new aH(null,null,1,1);aF.defaultOverwrite="auto";
aF.ticker=aL;aF.autoSleep=120;aF.lagSmoothing=function(h,j){aL.lagSmoothing(h,j)
};aF.selector=c.$||c.jQuery||function(j){var h=c.$||c.jQuery;if(h){aF.selector=h;
return h(j)}return(typeof(a5)==="undefined")?j:(a5.querySelectorAll?a5.querySelectorAll(j):a5.getElementById((j.charAt(0)==="#")?j.substr(1):j))
};var aA=[],p={},am=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,ba=function(h){var k=this._firstPT,l=0.000001,j;
while(k){j=!k.blob?k.c*h+k.s:(h===1)?this.end:h?this.join(""):this.start;if(k.m){j=k.m(j,this._target||k.t)
}else{if(j<l){if(j>-l&&!k.blob){j=0}}}if(!k.f){k.t[k.p]=j}else{if(k.fp){k.t[k.p](k.fp,j)
}else{k.t[k.p](j)}}k=k._next}},bb=function(u,n,t,w){var h=[],l=0,s="",o=0,j,v,k,m,r,x,q;
h.start=u;h.end=n;u=h[0]=u+"";n=h[1]=n+"";if(t){t(h);u=h[0];n=h[1]}h.length=0;j=u.match(am)||[];
v=n.match(am)||[];if(w){w._next=null;w.blob=1;h._firstPT=h._applyPT=w}r=v.length;
for(m=0;m<r;m++){q=v[m];x=n.substr(l,n.indexOf(q,l)-l);s+=(x||!m)?x:",";l+=x.length;
if(o){o=(o+1)%5}else{if(x.substr(-5)==="rgba("){o=1}}if(q===j[m]||j.length<=m){s+=q
}else{if(s){h.push(s);s=""}k=parseFloat(j[m]);h.push(k);h._firstPT={_next:h._firstPT,t:h,p:h.length-1,s:k,c:((q.charAt(1)==="=")?parseInt(q.charAt(0)+"1",10)*parseFloat(q.substr(2)):(parseFloat(q)-k))||0,f:0,m:(o&&o<4)?Math.round:0}
}l+=q.length}s+=n.substr(l);if(s){h.push(s)}h.setRatio=ba;return h},aR=function(o,l,u,r,t,k,v,w,q){if(typeof(r)==="function"){r=r(q||0,o)
}var n=typeof(o[l]),m=(n!=="function")?"":((l.indexOf("set")||typeof(o["get"+l.substr(3)])!=="function")?l:"get"+l.substr(3)),x=(u!=="get")?u:!m?o[l]:v?o[m](v):o[m](),j=(typeof(r)==="string"&&r.charAt(1)==="="),h={t:o,p:l,s:x,f:(n==="function"),pg:0,n:t||l,m:(!k?0:(typeof(k)==="function")?k:Math.round),pr:0,c:j?parseInt(r.charAt(0)+"1",10)*parseFloat(r.substr(2)):(parseFloat(r)-x)||0},s;
if(typeof(x)!=="number"||(typeof(r)!=="number"&&!j)){if(v||isNaN(x)||(!j&&isNaN(r))||typeof(x)==="boolean"||typeof(r)==="boolean"){h.fp=v;
s=bb(x,(j?h.s+h.c:r),w||aF.defaultStringFilter,h);h={t:s,p:"setRatio",s:0,c:1,f:2,pg:0,n:t||l,pr:0,m:0}
}else{h.s=parseFloat(x);if(!j){h.c=(parseFloat(r)-h.s)||0}}}if(h.c){if((h._next=this._firstPT)){h._next._prev=h
}this._firstPT=h;return h}},ao=aF._internals={isArray:aE,isSelector:aG,lazyTweens:aA,blobDif:bb},aM=aF._plugins={},aO=ao.tweenLookup={},aq=0,an=ao.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1,callbackScope:1,stringFilter:1,id:1},aQ={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},aW=aV._rootFramesTimeline=new aI(),aw=aV._rootTimeline=new aI(),aK=30,a1=ao.lazyRender=function(){var h=aA.length,j;
p={};while(--h>-1){j=aA[h];if(j&&j._lazy!==false){j.render(j._lazy[0],j._lazy[1],true);
j._lazy=false}}aA.length=0};aw._startTime=aL.time;aW._startTime=aL.frame;aw._active=aW._active=true;
setTimeout(a1,1);aV._updateRoot=aF.render=function(){var j,k,h;if(aA.length){a1()
}aw.render((aL.time-aw._startTime)*aw._timeScale,false,false);aW.render((aL.frame-aW._startTime)*aW._timeScale,false,false);
if(aA.length){a1()}if(aL.frame>=aK){aK=aL.frame+(parseInt(aF.autoSleep,10)||120);
for(h in aO){k=aO[h].tweens;j=k.length;while(--j>-1){if(k[j]._gc){k.splice(j,1)
}}if(k.length===0){delete aO[h]}}h=aw._first;if(!h||h._paused){if(aF.autoSleep&&!aW._first&&aL._listeners.tick.length===1){while(h&&h._paused){h=h._next
}if(!h){aL.sleep()}}}}};aL.addEventListener("tick",aV._updateRoot);var ap=function(j,l,k){var h=j._gsTweenID,n,m;
if(!aO[h||(j._gsTweenID=h="t"+(aq++))]){aO[h]={target:j,tweens:[]}}if(l){n=aO[h].tweens;
n[(m=n.length)]=l;if(k){while(--m>-1){if(n[m]===l){n.splice(m,1)}}}}return aO[h].tweens
},au=function(k,h,l,m){var n=k.vars.onOverwrite,o,j;if(n){o=n(k,h,l,m)}n=aF.onOverwrite;
if(n){j=n(k,h,l,m)}return(o!==false&&j!==false)},a8=function(j,v,h,l,w){var n,q,o,t;
if(l===1||l>=4){t=w.length;for(n=0;n<t;n++){if((o=w[n])!==v){if(!o._gc){if(o._kill(null,j,v)){q=true
}}}else{if(l===5){break}}}return q}var u=v._startTime+a9,k=[],r=0,s=(v._duration===0),m;
n=w.length;while(--n>-1){if((o=w[n])===v||o._gc||o._paused){}else{if(o._timeline!==v._timeline){m=m||b(v,0,s);
if(b(o,m,s)===0){k[r++]=o}}else{if(o._startTime<=u){if(o._startTime+o.totalDuration()/o._timeScale>u){if(!((s||!o._initted)&&u-o._startTime<=2e-10)){k[r++]=o
}}}}}}n=r;while(--n>-1){o=k[n];if(l===2){if(o._kill(h,j,v)){q=true}}if(l!==2||(!o._firstPT&&o._initted)){if(l!==2&&!au(o,v)){continue
}if(o._enabled(false,false)){q=true}}}return q},b=function(k,j,m){var n=k._timeline,h=n._timeScale,l=k._startTime;
while(n._timeline){l+=n._startTime;h*=n._timeScale;if(n._paused){return -100}n=n._timeline
}l/=h;return(l>j)?l-j:((m&&l===j)||(!k._initted&&l-j<2*a9))?a9:((l+=k.totalDuration()/k._timeScale/h)>j+a9)?0:l-j-a9
};aU._init=function(){var j=this.vars,l=this._overwrittenProps,t=this._duration,r=!!j.immediateRender,o=j.ease,m,n,h,s,k,q;
if(j.startAt){if(this._startAt){this._startAt.render(-1,true);this._startAt.kill()
}k={};for(s in j.startAt){k[s]=j.startAt[s]}k.overwrite=false;k.immediateRender=true;
k.lazy=(r&&j.lazy!==false);k.startAt=k.delay=null;this._startAt=aF.to(this.target,0,k);
if(r){if(this._time>0){this._startAt=null}else{if(t!==0){return}}}}else{if(j.runBackwards&&t!==0){if(this._startAt){this._startAt.render(-1,true);
this._startAt.kill();this._startAt=null}else{if(this._time!==0){r=false}h={};for(s in j){if(!an[s]||s==="autoCSS"){h[s]=j[s]
}}h.overwrite=0;h.data="isFromStart";h.lazy=(r&&j.lazy!==false);h.immediateRender=r;
this._startAt=aF.to(this.target,0,h);if(!r){this._startAt._init();this._startAt._enabled(false);
if(this.vars.immediateRender){this._startAt=null}}else{if(this._time===0){return
}}}}}this._ease=o=(!o)?aF.defaultEase:(o instanceof aH)?o:(typeof(o)==="function")?new aH(o,j.easeParams):ay[o]||aF.defaultEase;
if(j.easeParams instanceof Array&&o.config){this._ease=o.config.apply(o,j.easeParams)
}this._easeType=this._ease._type;this._easePower=this._ease._power;this._firstPT=null;
if(this._targets){q=this._targets.length;for(m=0;m<q;m++){if(this._initProps(this._targets[m],(this._propLookup[m]={}),this._siblings[m],(l?l[m]:null),m)){n=true
}}}else{n=this._initProps(this.target,this._propLookup,this._siblings,l,0)}if(n){aF._onPluginEvent("_onInitAllProps",this)
}if(l){if(!this._firstPT){if(typeof(this.target)!=="function"){this._enabled(false,false)
}}}if(j.runBackwards){h=this._firstPT;while(h){h.s+=h.c;h.c=-h.c;h=h._next}}this._onUpdate=j.onUpdate;
this._initted=true};aU._initProps=function(m,n,l,j,o){var t,r,s,q,h,k;if(m==null){return false
}if(p[m._gsTweenID]){a1()}if(!this.vars.css){if(m.style){if(m!==c&&m.nodeType){if(aM.css){if(this.vars.autoCSS!==false){a7(this.vars,m)
}}}}}for(t in this.vars){k=this.vars[t];if(an[t]){if(k){if((k instanceof Array)||(k.push&&aE(k))){if(k.join("").indexOf("{self}")!==-1){this.vars[t]=k=this._swapSelfInParams(k,this)
}}}}else{if(aM[t]&&(q=new aM[t]())._onInitTween(m,this.vars[t],this,o)){this._firstPT=h={_next:this._firstPT,t:q,p:"setRatio",s:0,c:1,f:1,n:t,pg:1,pr:q._priority,m:0};
r=q._overwriteProps.length;while(--r>-1){n[q._overwriteProps[r]]=this._firstPT}if(q._priority||q._onInitAllProps){s=true
}if(q._onDisable||q._onEnable){this._notifyPluginsOfEnabled=true}if(h._next){h._next._prev=h
}}else{n[t]=aR.call(this,m,t,"get",k,t,0,null,this.vars.stringFilter,o)}}}if(j){if(this._kill(j,m)){return this._initProps(m,n,l,j,o)
}}if(this._overwrite>1){if(this._firstPT){if(l.length>1){if(a8(m,this,n,this._overwrite,l)){this._kill(n,m);
return this._initProps(m,n,l,j,o)}}}}if(this._firstPT){if((this.vars.lazy!==false&&this._duration)||(this.vars.lazy&&!this._duration)){p[m._gsTweenID]=true
}}return s};aU.render=function(u,k,v){var l=this._time,t=this._duration,j=this._rawPrevTime,n,m,h,r;
if(u>=t-1e-7&&u>=0){this._totalTime=this._time=t;this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1;
if(!this._reversed){n=true;m="onComplete";v=(v||this._timeline.autoRemoveChildren)
}if(t===0){if(this._initted||!this.vars.lazy||v){if(this._startTime===this._timeline._duration){u=0
}if(j<0||(u<=0&&u>=-1e-7)||(j===a9&&this.data!=="isPause")){if(j!==u){v=true;if(j>a9){m="onReverseComplete"
}}}this._rawPrevTime=r=(!k||u||j===u)?u:a9}}}else{if(u<1e-7){this._totalTime=this._time=0;
this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0;if(l!==0||(t===0&&j>0)){m="onReverseComplete";
n=this._reversed}if(u<0){this._active=false;if(t===0){if(this._initted||!this.vars.lazy||v){if(j>=0&&!(j===a9&&this.data==="isPause")){v=true
}this._rawPrevTime=r=(!k||u||j===u)?u:a9}}}if(!this._initted){v=true}}else{this._totalTime=this._time=u;
if(this._easeType){var s=u/t,o=this._easeType,q=this._easePower;if(o===1||(o===3&&s>=0.5)){s=1-s
}if(o===3){s*=2}if(q===1){s*=s}else{if(q===2){s*=s*s}else{if(q===3){s*=s*s*s}else{if(q===4){s*=s*s*s*s
}}}}if(o===1){this.ratio=1-s}else{if(o===2){this.ratio=s}else{if(u/t<0.5){this.ratio=s/2
}else{this.ratio=1-(s/2)}}}}else{this.ratio=this._ease.getRatio(u/t)}}}if(this._time===l&&!v){return
}else{if(!this._initted){this._init();if(!this._initted||this._gc){return}else{if(!v&&this._firstPT&&((this.vars.lazy!==false&&this._duration)||(this.vars.lazy&&!this._duration))){this._time=this._totalTime=l;
this._rawPrevTime=j;aA.push(this);this._lazy=[u,k];return}}if(this._time&&!n){this.ratio=this._ease.getRatio(this._time/t)
}else{if(n&&this._ease._calcEnd){this.ratio=this._ease.getRatio((this._time===0)?0:1)
}}}}if(this._lazy!==false){this._lazy=false}if(!this._active){if(!this._paused&&this._time!==l&&u>=0){this._active=true
}}if(l===0){if(this._startAt){if(u>=0){this._startAt.render(u,k,v)}else{if(!m){m="_dummyGS"
}}}if(this.vars.onStart){if(this._time!==0||t===0){if(!k){this._callback("onStart")
}}}}h=this._firstPT;while(h){if(h.f){h.t[h.p](h.c*this.ratio+h.s)}else{h.t[h.p]=h.c*this.ratio+h.s
}h=h._next}if(this._onUpdate){if(u<0){if(this._startAt&&u!==-0.0001){this._startAt.render(u,k,v)
}}if(!k){if(this._time!==l||n||v){this._callback("onUpdate")}}}if(m){if(!this._gc||v){if(u<0&&this._startAt&&!this._onUpdate&&u!==-0.0001){this._startAt.render(u,k,v)
}if(n){if(this._timeline.autoRemoveChildren){this._enabled(false,false)}this._active=false
}if(!k&&this.vars[m]){this._callback(m)}if(t===0&&this._rawPrevTime===a9&&r!==a9){this._rawPrevTime=0
}}}};aU._kill=function(k,l,h){if(k==="all"){k=null}if(k==null){if(l==null||l===this.target){this._lazy=false;
return this._enabled(false,false)}}l=(typeof(l)!=="string")?(l||this._targets||this.target):aF.selector(l)||l;
var o=(h&&this._time&&h._startTime===this._startTime&&this._timeline===h._timeline),r,v,t,u,m,s,j,q,n;
if((aE(l)||aG(l))&&typeof(l[0])!=="number"){r=l.length;while(--r>-1){if(this._kill(k,l[r],h)){s=true
}}}else{if(this._targets){r=this._targets.length;while(--r>-1){if(l===this._targets[r]){m=this._propLookup[r]||{};
this._overwrittenProps=this._overwrittenProps||[];v=this._overwrittenProps[r]=k?this._overwrittenProps[r]||{}:"all";
break}}}else{if(l!==this.target){return false}else{m=this._propLookup;v=this._overwrittenProps=k?this._overwrittenProps||{}:"all"
}}if(m){j=k||m;q=(k!==v&&v!=="all"&&k!==m&&(typeof(k)!=="object"||!k._tempKill));
if(h&&(aF.onOverwrite||this.vars.onOverwrite)){for(t in j){if(m[t]){if(!n){n=[]
}n.push(t)}}if((n||!k)&&!au(this,h,l,n)){return false}}for(t in j){if((u=m[t])){if(o){if(u.f){u.t[u.p](u.s)
}else{u.t[u.p]=u.s}s=true}if(u.pg&&u.t._kill(j)){s=true}if(!u.pg||u.t._overwriteProps.length===0){if(u._prev){u._prev._next=u._next
}else{if(u===this._firstPT){this._firstPT=u._next}}if(u._next){u._next._prev=u._prev
}u._next=u._prev=null}delete m[t]}if(q){v[t]=1}}if(!this._firstPT&&this._initted){this._enabled(false,false)
}}}return s};aU.invalidate=function(){if(this._notifyPluginsOfEnabled){aF._onPluginEvent("_onDisable",this)
}this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null;this._notifyPluginsOfEnabled=this._active=this._lazy=false;
this._propLookup=(this._targets)?{}:[];aV.prototype.invalidate.call(this);if(this.vars.immediateRender){this._time=-a9;
this.render(Math.min(0,-this._delay))}return this};aU._enabled=function(j,l){if(!av){aL.wake()
}if(j&&this._gc){var k=this._targets,h;if(k){h=k.length;while(--h>-1){this._siblings[h]=ap(k[h],this,true)
}}else{this._siblings=ap(this.target,this,true)}}aV.prototype._enabled.call(this,j,l);
if(this._notifyPluginsOfEnabled){if(this._firstPT){return aF._onPluginEvent((j?"_onEnable":"_onDisable"),this)
}}return false};aF.to=function(j,k,h){return new aF(j,k,h)};aF.from=function(j,k,h){h.runBackwards=true;
h.immediateRender=(h.immediateRender!=false);return new aF(j,k,h)};aF.fromTo=function(k,l,j,h){h.startAt=j;
h.immediateRender=(h.immediateRender!=false&&j.immediateRender!=false);return new aF(k,l,h)
};aF.delayedCall=function(h,j,k,l,m){return new aF(j,0,{delay:h,onComplete:j,onCompleteParams:k,callbackScope:l,onReverseComplete:j,onReverseCompleteParams:k,immediateRender:false,lazy:false,useFrames:m,overwrite:0})
};aF.set=function(j,h){return new aF(j,0,h)};aF.getTweensOf=function(h,l){if(h==null){return[]
}h=(typeof(h)!=="string")?h:aF.selector(h)||h;var j,n,m,k;if((aE(h)||aG(h))&&typeof(h[0])!=="number"){j=h.length;
n=[];while(--j>-1){n=n.concat(aF.getTweensOf(h[j],l))}j=n.length;while(--j>-1){k=n[j];
m=j;while(--m>-1){if(k===n[m]){n.splice(j,1)}}}}else{n=ap(h).concat();j=n.length;
while(--j>-1){if(n[j]._gc||(l&&!n[j].isActive())){n.splice(j,1)}}}return n};aF.killTweensOf=aF.killDelayedCallsTo=function(h,l,j){if(typeof(l)==="object"){j=l;
l=false}var m=aF.getTweensOf(h,l),k=m.length;while(--k>-1){m[k]._kill(j,h)}};var bd=aX("plugins.TweenPlugin",function(j,h){this._overwriteProps=(j||"").split(",");
this._propName=this._overwriteProps[0];this._priority=h||0;this._super=bd.prototype
},true);aU=bd.prototype;bd.version="1.19.0";bd.API=2;aU._firstPT=null;aU._addTween=aR;
aU.setRatio=ba;aU._kill=function(h){var l=this._overwriteProps,j=this._firstPT,k;
if(h[this._propName]!=null){this._overwriteProps=[]}else{k=l.length;while(--k>-1){if(h[l[k]]!=null){l.splice(k,1)
}}}while(j){if(h[j.n]!=null){if(j._next){j._next._prev=j._prev}if(j._prev){j._prev._next=j._next;
j._prev=null}else{if(this._firstPT===j){this._firstPT=j._next}}}j=j._next}return false
};aU._mod=aU._roundProps=function(k){var h=this._firstPT,j;while(h){j=k[this._propName]||(h.n!=null&&k[h.n.split(this._propName+"_").join("")]);
if(j&&typeof(j)==="function"){if(h.f===2){h.t._applyPT.m=j}else{h.m=j}}h=h._next
}};aF._onPluginEvent=function(o,l){var k=l._firstPT,h,m,j,n,q;if(o==="_onInitAllProps"){while(k){q=k._next;
m=j;while(m&&m.pr>k.pr){m=m._next}if((k._prev=m?m._prev:n)){k._prev._next=k}else{j=k
}if((k._next=m)){m._prev=k}else{n=k}k=q}k=l._firstPT=j}while(k){if(k.pg){if(typeof(k.t[o])==="function"){if(k.t[o]()){h=true
}}}k=k._next}return h};bd.activate=function(j){var h=j.length;while(--h>-1){if(j[h].API===bd.API){aM[(new j[h]())._propName]=j[h]
}}return true};bc.plugin=function(m){if(!m||!m.propName||!m.init||!m.API){throw"illegal plugin definition."
}var n=m.propName,q=m.priority||0,j=m.overwriteProps,k={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_mod",mod:"_mod",initAll:"_onInitAllProps"},o=aX("plugins."+n.charAt(0).toUpperCase()+n.substr(1)+"Plugin",function(){bd.call(this,n,q);
this._overwriteProps=j||[]},(m.global===true)),l=o.prototype=new bd(n),h;l.constructor=o;
o.API=m.API;for(h in k){if(typeof(m[h])==="function"){l[k[h]]=m[h]}}o.version=m.version;
bd.activate([o]);return o};aB=c._gsQueue;if(aB){for(aN=0;aN<aB.length;aN++){aB[aN]()
}for(aU in a6){if(!a6[aU].func){c.console.log("GSAP encountered missing dependency: "+aU)
}}}av=false})((typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window,"TweenLite")
}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{}],266:[function(d,g,f){(function(a){
/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
;
var b=(typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window;
(b._gsQueue||(b._gsQueue=[])).push(function(){b._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(y,C,x){var F=function(h){var j=[],i=h.length,k;
for(k=0;k!==i;j.push(h[k++])){}return j},B=function(i,j,h){var k=i.cycle,m,l;for(m in k){l=k[m];
i[m]=(typeof(l)==="function")?l(h,j[h]):l[h%l.length]}delete i.cycle},I=function(h,i,j){x.call(this,h,i,j);
this._cycle=0;this._yoyo=(this.vars.yoyo===true);this._repeat=this.vars.repeat||0;
this._repeatDelay=this.vars.repeatDelay||0;this._dirty=true;this.render=I.prototype.render
},z=1e-10,H=x._internals,E=H.isSelector,c=H.isArray,D=I.prototype=x.to({},0.1,{}),p=[];
I.version="1.19.1";D.constructor=I;D.kill()._gc=false;I.killTweensOf=I.killDelayedCallsTo=x.killTweensOf;
I.getTweensOf=x.getTweensOf;I.lagSmoothing=x.lagSmoothing;I.ticker=x.ticker;I.render=x.render;
D.invalidate=function(){this._yoyo=(this.vars.yoyo===true);this._repeat=this.vars.repeat||0;
this._repeatDelay=this.vars.repeatDelay||0;this._uncache(true);return x.prototype.invalidate.call(this)
};D.updateTo=function(i,k){var m=this.ratio,l=this.vars.immediateRender||i.immediateRender,n;
if(k&&this._startTime<this._timeline._time){this._startTime=this._timeline._time;
this._uncache(false);if(this._gc){this._enabled(true,false)}else{this._timeline.insert(this,this._startTime-this._delay)
}}for(n in i){this.vars[n]=i[n]}if(this._initted||l){if(k){this._initted=false;
if(l){this.render(0,true,true)}}else{if(this._gc){this._enabled(true,false)}if(this._notifyPluginsOfEnabled&&this._firstPT){x._onPluginEvent("_onDisable",this)
}if(this._time/this._duration>0.998){var o=this._totalTime;this.render(0,true,false);
this._initted=false;this.render(o,true,false)}else{this._initted=false;this._init();
if(this._time>0||l){var j=1/(1-m),q=this._firstPT,h;while(q){h=q.s+q.c;q.c*=j;q.s=h-q.c;
q=q._next}}}}}return this};D.render=function(l,q,s){if(!this._initted){if(this._duration===0&&this.vars.repeat){this.invalidate()
}}var h=(!this._dirty)?this._totalDuration:this.totalDuration(),u=this._time,M=this._totalTime,o=this._cycle,k=this._duration,r=this._rawPrevTime,v,t,n,m,j,N,O,i;
if(l>=h-1e-7&&l>=0){this._totalTime=h;this._cycle=this._repeat;if(this._yoyo&&(this._cycle&1)!==0){this._time=0;
this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0}else{this._time=k;this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1
}if(!this._reversed){v=true;t="onComplete";s=(s||this._timeline.autoRemoveChildren)
}if(k===0){if(this._initted||!this.vars.lazy||s){if(this._startTime===this._timeline._duration){l=0
}if(r<0||(l<=0&&l>=-1e-7)||(r===z&&this.data!=="isPause")){if(r!==l){s=true;if(r>z){t="onReverseComplete"
}}}this._rawPrevTime=i=(!q||l||r===l)?l:z}}}else{if(l<1e-7){this._totalTime=this._time=this._cycle=0;
this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0;if(M!==0||(k===0&&r>0)){t="onReverseComplete";
v=this._reversed}if(l<0){this._active=false;if(k===0){if(this._initted||!this.vars.lazy||s){if(r>=0){s=true
}this._rawPrevTime=i=(!q||l||r===l)?l:z}}}if(!this._initted){s=true}}else{this._totalTime=this._time=l;
if(this._repeat!==0){m=k+this._repeatDelay;this._cycle=(this._totalTime/m)>>0;if(this._cycle!==0){if(this._cycle===this._totalTime/m&&M<=l){this._cycle--
}}this._time=this._totalTime-(this._cycle*m);if(this._yoyo){if((this._cycle&1)!==0){this._time=k-this._time
}}if(this._time>k){this._time=k}else{if(this._time<0){this._time=0}}}if(this._easeType){j=this._time/k;
N=this._easeType;O=this._easePower;if(N===1||(N===3&&j>=0.5)){j=1-j}if(N===3){j*=2
}if(O===1){j*=j}else{if(O===2){j*=j*j}else{if(O===3){j*=j*j*j}else{if(O===4){j*=j*j*j*j
}}}}if(N===1){this.ratio=1-j}else{if(N===2){this.ratio=j}else{if(this._time/k<0.5){this.ratio=j/2
}else{this.ratio=1-(j/2)}}}}else{this.ratio=this._ease.getRatio(this._time/k)}}}if(u===this._time&&!s&&o===this._cycle){if(M!==this._totalTime){if(this._onUpdate){if(!q){this._callback("onUpdate")
}}}return}else{if(!this._initted){this._init();if(!this._initted||this._gc){return
}else{if(!s&&this._firstPT&&((this.vars.lazy!==false&&this._duration)||(this.vars.lazy&&!this._duration))){this._time=u;
this._totalTime=M;this._rawPrevTime=r;this._cycle=o;H.lazyTweens.push(this);this._lazy=[l,q];
return}}if(this._time&&!v){this.ratio=this._ease.getRatio(this._time/k)}else{if(v&&this._ease._calcEnd){this.ratio=this._ease.getRatio((this._time===0)?0:1)
}}}}if(this._lazy!==false){this._lazy=false}if(!this._active){if(!this._paused&&this._time!==u&&l>=0){this._active=true
}}if(M===0){if(this._initted===2&&l>0){this._init()}if(this._startAt){if(l>=0){this._startAt.render(l,q,s)
}else{if(!t){t="_dummyGS"}}}if(this.vars.onStart){if(this._totalTime!==0||k===0){if(!q){this._callback("onStart")
}}}}n=this._firstPT;while(n){if(n.f){n.t[n.p](n.c*this.ratio+n.s)}else{n.t[n.p]=n.c*this.ratio+n.s
}n=n._next}if(this._onUpdate){if(l<0){if(this._startAt&&this._startTime){this._startAt.render(l,q,s)
}}if(!q){if(this._totalTime!==M||t){this._callback("onUpdate")}}}if(this._cycle!==o){if(!q){if(!this._gc){if(this.vars.onRepeat){this._callback("onRepeat")
}}}}if(t){if(!this._gc||s){if(l<0&&this._startAt&&!this._onUpdate&&this._startTime){this._startAt.render(l,q,s)
}if(v){if(this._timeline.autoRemoveChildren){this._enabled(false,false)}this._active=false
}if(!q&&this.vars[t]){this._callback(t)}if(k===0&&this._rawPrevTime===z&&i!==z){this._rawPrevTime=0
}}}};I.to=function(h,i,j){return new I(h,i,j)};I.from=function(h,i,j){j.runBackwards=true;
j.immediateRender=(j.immediateRender!=false);return new I(h,i,j)};I.fromTo=function(h,i,k,j){j.startAt=k;
j.immediateRender=(j.immediateRender!=false&&k.immediateRender!=false);return new I(h,i,j)
};I.staggerTo=I.allTo=function(v,i,t,r,q,m,k){r=r||0;var M=0,o=[],l=function(){if(t.onComplete){t.onComplete.apply(t.onCompleteScope||this,arguments)
}q.apply(k||t.callbackScope||this,m||p)},h=t.cycle,u=(t.startAt&&t.startAt.cycle),j,s,N,n;
if(!c(v)){if(typeof(v)==="string"){v=x.selector(v)||v}if(E(v)){v=F(v)}}v=v||[];
if(r<0){v=F(v);v.reverse();r*=-1}j=v.length-1;for(N=0;N<=j;N++){s={};for(n in t){s[n]=t[n]
}if(h){B(s,v,N);if(s.duration!=null){i=s.duration;delete s.duration}}if(u){u=s.startAt={};
for(n in t.startAt){u[n]=t.startAt[n]}B(s.startAt,v,N)}s.delay=M+(s.delay||0);if(N===j&&q){s.onComplete=l
}o[N]=new I(v[N],i,s);M+=r}return o};I.staggerFrom=I.allFrom=function(j,n,i,l,m,k,h){i.runBackwards=true;
i.immediateRender=(i.immediateRender!=false);return I.staggerTo(j,n,i,l,m,k,h)};
I.staggerFromTo=I.allFromTo=function(j,o,m,i,l,n,k,h){i.startAt=m;i.immediateRender=(i.immediateRender!=false&&m.immediateRender!=false);
return I.staggerTo(j,o,i,l,n,k,h)};I.delayedCall=function(j,k,l,h,i){return new I(k,0,{delay:j,onComplete:k,onCompleteParams:l,callbackScope:h,onReverseComplete:k,onReverseCompleteParams:l,immediateRender:false,useFrames:i,overwrite:0})
};I.set=function(h,i){return new I(h,0,i)};I.isTweening=function(h){return(x.getTweensOf(h,true).length>0)
};var G=function(l,k){var j=[],h=0,i=l._first;while(i){if(i instanceof x){j[h++]=i
}else{if(k){j[h++]=i}j=j.concat(G(i,k));h=j.length}i=i._next}return j},A=I.getAllTweens=function(h){return G(y._rootTimeline,h).concat(G(y._rootFramesTimeline,h))
};I.killAll=function(o,l,r,j){if(l==null){l=true}if(r==null){r=true}var i=A((j!=false)),n=i.length,q=(l&&r&&j),k,h,m;
for(m=0;m<n;m++){h=i[m];if(q||(h instanceof C)||((k=(h.target===h.vars.onComplete))&&r)||(l&&!k)){if(o){h.totalTime(h._reversed?0:h.totalDuration())
}else{h._enabled(false,false)}}}};I.killChildTweensOf=function(m,o){if(m==null){return
}var l=H.tweenLookup,i,n,k,h,j;if(typeof(m)==="string"){m=x.selector(m)||m}if(E(m)){m=F(m)
}if(c(m)){h=m.length;while(--h>-1){I.killChildTweensOf(m[h],o)}return}i=[];for(k in l){n=l[k].target.parentNode;
while(n){if(n===m){i=i.concat(l[k].tweens)}n=n.parentNode}}j=i.length;for(h=0;h<j;
h++){if(o){i[h].totalTime(i[h].totalDuration())}i[h]._enabled(false,false)}};var w=function(h,n,i,m){n=(n!==false);
i=(i!==false);m=(m!==false);var l=A(m),q=(n&&i&&m),o=l.length,k,j;while(--o>-1){j=l[o];
if(q||(j instanceof C)||((k=(j.target===j.vars.onComplete))&&i)||(n&&!k)){j.paused(h)
}}};I.pauseAll=function(i,h,j){w(true,i,h,j)};I.resumeAll=function(i,h,j){w(false,i,h,j)
};I.globalTimeScale=function(h){var j=y._rootTimeline,i=x.ticker.time;if(!arguments.length){return j._timeScale
}h=h||z;j._startTime=i-((i-j._startTime)*j._timeScale/h);j=y._rootFramesTimeline;
i=x.ticker.frame;j._startTime=i-((i-j._startTime)*j._timeScale/h);j._timeScale=y._rootTimeline._timeScale=h;
return h};D.progress=function(h,i){return(!arguments.length)?this._time/this.duration():this.totalTime(this.duration()*((this._yoyo&&(this._cycle&1)!==0)?1-h:h)+(this._cycle*(this._duration+this._repeatDelay)),i)
};D.totalProgress=function(h,i){return(!arguments.length)?this._totalTime/this.totalDuration():this.totalTime(this.totalDuration()*h,i)
};D.time=function(h,i){if(!arguments.length){return this._time}if(this._dirty){this.totalDuration()
}if(h>this._duration){h=this._duration}if(this._yoyo&&(this._cycle&1)!==0){h=(this._duration-h)+(this._cycle*(this._duration+this._repeatDelay))
}else{if(this._repeat!==0){h+=this._cycle*(this._duration+this._repeatDelay)}}return this.totalTime(h,i)
};D.duration=function(h){if(!arguments.length){return this._duration}return y.prototype.duration.call(this,h)
};D.totalDuration=function(h){if(!arguments.length){if(this._dirty){this._totalDuration=(this._repeat===-1)?999999999999:this._duration*(this._repeat+1)+(this._repeatDelay*this._repeat);
this._dirty=false}return this._totalDuration}return(this._repeat===-1)?this:this.duration((h-(this._repeat*this._repeatDelay))/(this._repeat+1))
};D.repeat=function(h){if(!arguments.length){return this._repeat}this._repeat=h;
return this._uncache(true)};D.repeatDelay=function(h){if(!arguments.length){return this._repeatDelay
}this._repeatDelay=h;return this._uncache(true)};D.yoyo=function(h){if(!arguments.length){return this._yoyo
}this._yoyo=h;return this};return I},true);b._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(y,B,c){var E=function(h){B.call(this,h);
this._labels={};this.autoRemoveChildren=(this.vars.autoRemoveChildren===true);this.smoothChildTiming=(this.vars.smoothChildTiming===true);
this._sortChildren=true;this._onUpdate=this.vars.onUpdate;var k=this.vars,j,i;for(i in k){j=k[i];
if(L(j)){if(j.join("").indexOf("{self}")!==-1){k[i]=this._swapSelfInParams(j)}}}if(L(k.tweens)){this.add(k.tweens,0,k.align,k.stagger)
}},z=1e-10,J=c._internals,p=E._internals={},F=J.isSelector,L=J.isArray,G=J.lazyTweens,M=J.lazyRender,A=b._gsDefine.globals,K=function(i){var h={},j;
for(j in i){h[j]=i[j]}return h},C=function(k,m,j){var l=k.cycle,h,i;for(h in l){i=l[h];
k[h]=(typeof(i)==="function")?i(j,m[j]):i[j%i.length]}delete k.cycle},H=p.pauseCallback=function(){},I=function(j){var i=[],k=j.length,h;
for(h=0;h!==k;i.push(j[h++])){}return i},D=E.prototype=new B();E.version="1.19.1";
D.constructor=E;D.kill()._gc=D._forcingPlayhead=D._hasPause=false;D.to=function(l,h,j,i){var k=(j.repeat&&A.TweenMax)||c;
return h?this.add(new k(l,h,j),i):this.set(l,j,i)};D.from=function(h,j,k,i){return this.add(((k.repeat&&A.TweenMax)||c).from(h,j,k),i)
};D.fromTo=function(m,h,k,j,i){var l=(j.repeat&&A.TweenMax)||c;return h?this.add(l.fromTo(m,h,k,j),i):this.set(m,j,i)
};D.staggerTo=function(s,k,r,n,t,q,m,l){var o=new E({onComplete:q,onCompleteParams:m,callbackScope:l,smoothChildTiming:this.smoothChildTiming}),i=r.cycle,j,h;
if(typeof(s)==="string"){s=c.selector(s)||s}s=s||[];if(F(s)){s=I(s)}n=n||0;if(n<0){s=I(s);
s.reverse();n*=-1}for(h=0;h<s.length;h++){j=K(r);if(j.startAt){j.startAt=K(j.startAt);
if(j.startAt.cycle){C(j.startAt,s,h)}}if(i){C(j,s,h);if(j.duration!=null){k=j.duration;
delete j.duration}}o.to(s[h],k,j,h*n)}return this.add(o,t)};D.staggerFrom=function(m,i,k,l,o,n,j,h){k.immediateRender=(k.immediateRender!=false);
k.runBackwards=true;return this.staggerTo(m,i,k,l,o,n,j,h)};D.staggerFromTo=function(h,j,n,o,k,i,q,m,l){o.startAt=n;
o.immediateRender=(o.immediateRender!=false&&n.immediateRender!=false);return this.staggerTo(h,j,o,k,i,q,m,l)
};D.call=function(h,j,k,i){return this.add(c.delayedCall(0,h,j,k),i)};D.set=function(i,j,h){h=this._parseTimeOrLabel(h,0,true);
if(j.immediateRender==null){j.immediateRender=(h===this._time&&!this._paused)}return this.add(new c(i,0,j),h)
};E.exportRoot=function(k,m){k=k||{};if(k.smoothChildTiming==null){k.smoothChildTiming=true
}var l=new E(k),i=l._timeline,j,h;if(m==null){m=true}i._remove(l,true);l._startTime=0;
l._rawPrevTime=l._time=l._totalTime=i._time;j=i._first;while(j){h=j._next;if(!m||!(j instanceof c&&j.target===j.vars.onComplete)){l.add(j,j._startTime-j._delay)
}j=h}i.add(l,0);return l};D.add=function(q,h,r,k){var m,l,i,n,o,j;if(typeof(h)!=="number"){h=this._parseTimeOrLabel(h,0,true,q)
}if(!(q instanceof y)){if((q instanceof Array)||(q&&q.push&&L(q))){r=r||"normal";
k=k||0;m=h;l=q.length;for(i=0;i<l;i++){if(L(n=q[i])){n=new E({tweens:n})}this.add(n,m);
if(typeof(n)!=="string"&&typeof(n)!=="function"){if(r==="sequence"){m=n._startTime+(n.totalDuration()/n._timeScale)
}else{if(r==="start"){n._startTime-=n.delay()}}}m+=k}return this._uncache(true)
}else{if(typeof(q)==="string"){return this.addLabel(q,h)}else{if(typeof(q)==="function"){q=c.delayedCall(0,q)
}else{throw ("Cannot add "+q+" into the timeline; it is not a tween, timeline, function, or string.")
}}}}B.prototype.add.call(this,q,h);if(this._gc||this._time===this._duration){if(!this._paused){if(this._duration<this.duration()){o=this;
j=(o.rawTime()>q._startTime);while(o._timeline){if(j&&o._timeline.smoothChildTiming){o.totalTime(o._totalTime,true)
}else{if(o._gc){o._enabled(true,false)}}o=o._timeline}}}}return this};D.remove=function(i){if(i instanceof y){this._remove(i,false);
var h=i._timeline=i.vars.useFrames?y._rootFramesTimeline:y._rootTimeline;i._startTime=(i._paused?i._pauseTime:h._time)-((!i._reversed?i._totalTime:i.totalDuration()-i._totalTime)/i._timeScale);
return this}else{if(i instanceof Array||(i&&i.push&&L(i))){var j=i.length;while(--j>-1){this.remove(i[j])
}return this}else{if(typeof(i)==="string"){return this.removeLabel(i)}}}return this.kill(null,i)
};D._remove=function(h,i){B.prototype._remove.call(this,h,i);var j=this._last;if(!j){this._time=this._totalTime=this._duration=this._totalDuration=0
}else{if(this._time>this.duration()){this._time=this._duration;this._totalTime=this._totalDuration
}}return this};D.append=function(i,h){return this.add(i,this._parseTimeOrLabel(null,h,true,i))
};D.insert=D.insertMultiple=function(j,i,h,k){return this.add(j,i||0,h,k)};D.appendMultiple=function(j,i,h,k){return this.add(j,this._parseTimeOrLabel(null,i,true,j),h,k)
};D.addLabel=function(i,h){this._labels[i]=this._parseTimeOrLabel(h);return this
};D.addPause=function(i,l,h,j){var k=c.delayedCall(0,H,h,j||this);k.vars.onComplete=k.vars.onReverseComplete=l;
k.data="isPause";this._hasPause=true;return this.add(k,i)};D.removeLabel=function(h){delete this._labels[h];
return this};D.getLabelTime=function(h){return(this._labels[h]!=null)?this._labels[h]:-1
};D._parseTimeOrLabel=function(h,i,j,l){var k;if(l instanceof y&&l.timeline===this){this.remove(l)
}else{if(l&&((l instanceof Array)||(l.push&&L(l)))){k=l.length;while(--k>-1){if(l[k] instanceof y&&l[k].timeline===this){this.remove(l[k])
}}}}if(typeof(i)==="string"){return this._parseTimeOrLabel(i,(j&&typeof(h)==="number"&&this._labels[i]==null)?h-this.duration():0,j)
}i=i||0;if(typeof(h)==="string"&&(isNaN(h)||this._labels[h]!=null)){k=h.indexOf("=");
if(k===-1){if(this._labels[h]==null){return j?(this._labels[h]=this.duration()+i):i
}return this._labels[h]+i}i=parseInt(h.charAt(k-1)+"1",10)*Number(h.substr(k+1));
h=(k>1)?this._parseTimeOrLabel(h.substr(0,k-1),0,j):this.duration()}else{if(h==null){h=this.duration()
}}return Number(h)+i};D.seek=function(h,i){return this.totalTime((typeof(h)==="number")?h:this._parseTimeOrLabel(h),(i!==false))
};D.stop=function(){return this.paused(true)};D.gotoAndPlay=function(h,i){return this.play(h,i)
};D.gotoAndStop=function(h,i){return this.pause(h,i)};D.render=function(l,n,m){if(this._gc){this._enabled(true,false)
}var v=(!this._dirty)?this._totalDuration:this.totalDuration(),k=this._time,t=this._startTime,h=this._timeScale,j=this._paused,q,u,w,r,o,s,i;
if(l>=v-1e-7&&l>=0){this._totalTime=this._time=v;if(!this._reversed){if(!this._hasPausedChild()){u=true;
r="onComplete";o=!!this._timeline.autoRemoveChildren;if(this._duration===0){if((l<=0&&l>=-1e-7)||this._rawPrevTime<0||this._rawPrevTime===z){if(this._rawPrevTime!==l&&this._first){o=true;
if(this._rawPrevTime>z){r="onReverseComplete"}}}}}}this._rawPrevTime=(this._duration||!n||l||this._rawPrevTime===l)?l:z;
l=v+0.0001}else{if(l<1e-7){this._totalTime=this._time=0;if(k!==0||(this._duration===0&&this._rawPrevTime!==z&&(this._rawPrevTime>0||(l<0&&this._rawPrevTime>=0)))){r="onReverseComplete";
u=this._reversed}if(l<0){this._active=false;if(this._timeline.autoRemoveChildren&&this._reversed){o=u=true;
r="onReverseComplete"}else{if(this._rawPrevTime>=0&&this._first){o=true}}this._rawPrevTime=l
}else{this._rawPrevTime=(this._duration||!n||l||this._rawPrevTime===l)?l:z;if(l===0&&u){q=this._first;
while(q&&q._startTime===0){if(!q._duration){u=false}q=q._next}}l=0;if(!this._initted){o=true
}}}else{if(this._hasPause&&!this._forcingPlayhead&&!n){if(l>=k){q=this._first;while(q&&q._startTime<=l&&!s){if(!q._duration){if(q.data==="isPause"&&!q.ratio&&!(q._startTime===0&&this._rawPrevTime===0)){s=q
}}q=q._next}}else{q=this._last;while(q&&q._startTime>=l&&!s){if(!q._duration){if(q.data==="isPause"&&q._rawPrevTime>0){s=q
}}q=q._prev}}if(s){this._time=l=s._startTime;this._totalTime=l+(this._cycle*(this._totalDuration+this._repeatDelay))
}}this._totalTime=this._time=this._rawPrevTime=l}}if((this._time===k||!this._first)&&!m&&!o&&!s){return
}else{if(!this._initted){this._initted=true}}if(!this._active){if(!this._paused&&this._time!==k&&l>0){this._active=true
}}if(k===0){if(this.vars.onStart){if(this._time!==0||!this._duration){if(!n){this._callback("onStart")
}}}}i=this._time;if(i>=k){q=this._first;while(q){w=q._next;if(i!==this._time||(this._paused&&!j)){break
}else{if(q._active||(q._startTime<=i&&!q._paused&&!q._gc)){if(s===q){this.pause()
}if(!q._reversed){q.render((l-q._startTime)*q._timeScale,n,m)}else{q.render(((!q._dirty)?q._totalDuration:q.totalDuration())-((l-q._startTime)*q._timeScale),n,m)
}}}q=w}}else{q=this._last;while(q){w=q._prev;if(i!==this._time||(this._paused&&!j)){break
}else{if(q._active||(q._startTime<=k&&!q._paused&&!q._gc)){if(s===q){s=q._prev;
while(s&&s.endTime()>this._time){s.render((s._reversed?s.totalDuration()-((l-s._startTime)*s._timeScale):(l-s._startTime)*s._timeScale),n,m);
s=s._prev}s=null;this.pause()}if(!q._reversed){q.render((l-q._startTime)*q._timeScale,n,m)
}else{q.render(((!q._dirty)?q._totalDuration:q.totalDuration())-((l-q._startTime)*q._timeScale),n,m)
}}}q=w}}if(this._onUpdate){if(!n){if(G.length){M()}this._callback("onUpdate")}}if(r){if(!this._gc){if(t===this._startTime||h!==this._timeScale){if(this._time===0||v>=this.totalDuration()){if(u){if(G.length){M()
}if(this._timeline.autoRemoveChildren){this._enabled(false,false)}this._active=false
}if(!n&&this.vars[r]){this._callback(r)}}}}}};D._hasPausedChild=function(){var h=this._first;
while(h){if(h._paused||((h instanceof E)&&h._hasPausedChild())){return true}h=h._next
}return false};D.getChildren=function(j,l,h,n){n=n||-9999999999;var i=[],k=this._first,m=0;
while(k){if(k._startTime<n){}else{if(k instanceof c){if(l!==false){i[m++]=k}}else{if(h!==false){i[m++]=k
}if(j!==false){i=i.concat(k.getChildren(true,l,h));m=i.length}}}k=k._next}return i
};D.getTweensOf=function(l,j){var h=this._gc,i=[],k=0,n,m;if(h){this._enabled(true,true)
}n=c.getTweensOf(l);m=n.length;while(--m>-1){if(n[m].timeline===this||(j&&this._contains(n[m]))){i[k++]=n[m]
}}if(h){this._enabled(false,true)}return i};D.recent=function(){return this._recent
};D._contains=function(i){var h=i.timeline;while(h){if(h===this){return true}h=h.timeline
}return false};D.shiftChildren=function(k,j,h){h=h||0;var m=this._first,i=this._labels,l;
while(m){if(m._startTime>=h){m._startTime+=k}m=m._next}if(j){for(l in i){if(i[l]>=h){i[l]+=k
}}}return this._uncache(true)};D._kill=function(h,j){if(!h&&!j){return this._enabled(false,false)
}var l=(!j)?this.getChildren(true,true,false):this.getTweensOf(j),i=l.length,k=false;
while(--i>-1){if(l[i]._kill(h,j)){k=true}}return k};D.clear=function(i){var j=this.getChildren(false,true,true),h=j.length;
this._time=this._totalTime=0;while(--h>-1){j[h]._enabled(false,false)}if(i!==false){this._labels={}
}return this._uncache(true)};D.invalidate=function(){var h=this._first;while(h){h.invalidate();
h=h._next}return y.prototype.invalidate.call(this)};D._enabled=function(j,h){if(j===this._gc){var i=this._first;
while(i){i._enabled(j,true);i=i._next}}return B.prototype._enabled.call(this,j,h)
};D.totalTime=function(j,k,i){this._forcingPlayhead=true;var h=y.prototype.totalTime.apply(this,arguments);
this._forcingPlayhead=false;return h};D.duration=function(h){if(!arguments.length){if(this._dirty){this.totalDuration()
}return this._duration}if(this.duration()!==0&&h!==0){this.timeScale(this._duration/h)
}return this};D.totalDuration=function(k){if(!arguments.length){if(this._dirty){var m=0,h=this._last,i=999999999999,l,j;
while(h){l=h._prev;if(h._dirty){h.totalDuration()}if(h._startTime>i&&this._sortChildren&&!h._paused){this.add(h,h._startTime-h._delay)
}else{i=h._startTime}if(h._startTime<0&&!h._paused){m-=h._startTime;if(this._timeline.smoothChildTiming){this._startTime+=h._startTime/this._timeScale
}this.shiftChildren(-h._startTime,false,-9999999999);i=0}j=h._startTime+(h._totalDuration/h._timeScale);
if(j>m){m=j}h=l}this._duration=this._totalDuration=m;this._dirty=false}return this._totalDuration
}return(k&&this.totalDuration())?this.timeScale(this._totalDuration/k):this};D.paused=function(j){if(!j){var h=this._first,i=this._time;
while(h){if(h._startTime===i&&h.data==="isPause"){h._rawPrevTime=0}h=h._next}}return y.prototype.paused.apply(this,arguments)
};D.usesFrames=function(){var h=this._timeline;while(h._timeline){h=h._timeline
}return(h===y._rootFramesTimeline)};D.rawTime=function(h){return(h&&(this._paused||(this._repeat&&this.time()>0&&this.totalProgress()<1)))?this._totalTime%(this._duration+this._repeatDelay):this._paused?this._totalTime:(this._timeline.rawTime(h)-this._startTime)*this._timeScale
};return E},true);b._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(z,u,s){var c=function(h){z.call(this,h);
this._repeat=this.vars.repeat||0;this._repeatDelay=this.vars.repeatDelay||0;this._cycle=0;
this._yoyo=(this.vars.yoyo===true);this._dirty=true},v=1e-10,p=u._internals,A=p.lazyTweens,t=p.lazyRender,w=b._gsDefine.globals,x=new s(null,null,1,0),y=c.prototype=new z();
y.constructor=c;y.kill()._gc=false;c.version="1.19.1";y.invalidate=function(){this._yoyo=(this.vars.yoyo===true);
this._repeat=this.vars.repeat||0;this._repeatDelay=this.vars.repeatDelay||0;this._uncache(true);
return z.prototype.invalidate.call(this)};y.addCallback=function(h,k,i,j){return this.add(u.delayedCall(0,h,i,j),k)
};y.removeCallback=function(h,l){if(h){if(l==null){this._kill(null,h)}else{var k=this.getTweensOf(h,false),j=k.length,i=this._parseTimeOrLabel(l);
while(--j>-1){if(k[j]._startTime===i){k[j]._enabled(false,false)}}}}return this
};y.removePause=function(h){return this.removeCallback(z._internals.pauseCallback,h)
};y.tweenTo=function(l,n){n=n||{};var m={ease:x,useFrames:this.usesFrames(),immediateRender:false},k=(n.repeat&&w.TweenMax)||u,h,i,j;
for(i in n){m[i]=n[i]}m.time=this._parseTimeOrLabel(l);h=(Math.abs(Number(m.time)-this._time)/this._timeScale)||0.001;
j=new k(this,h,m);m.onStart=function(){j.target.paused(true);if(j.vars.time!==j.target.time()&&h===j.duration()){j.duration(Math.abs(j.vars.time-j.target.time())/j.target._timeScale)
}if(n.onStart){n.onStart.apply(n.onStartScope||n.callbackScope||j,n.onStartParams||[])
}};return j};y.tweenFromTo=function(k,h,i){i=i||{};k=this._parseTimeOrLabel(k);
i.startAt={onComplete:this.seek,onCompleteParams:[k],callbackScope:this};i.immediateRender=(i.immediateRender!==false);
var j=this.tweenTo(h,i);return j.duration((Math.abs(j.vars.time-k)/this._timeScale)||0.001)
};y.render=function(ad,V,ac){if(this._gc){this._enabled(true,false)}var h=(!this._dirty)?this._totalDuration:this.totalDuration(),k=this._duration,o=this._time,q=this._totalTime,r=this._startTime,ag=this._timeScale,n=this._rawPrevTime,j=this._paused,R=this._cycle,W,ae,m,S,Y,l,af,aa;
if(ad>=h-1e-7&&ad>=0){if(!this._locked){this._totalTime=h;this._cycle=this._repeat
}if(!this._reversed){if(!this._hasPausedChild()){ae=true;S="onComplete";Y=!!this._timeline.autoRemoveChildren;
if(this._duration===0){if((ad<=0&&ad>=-1e-7)||n<0||n===v){if(n!==ad&&this._first){Y=true;
if(n>v){S="onReverseComplete"}}}}}}this._rawPrevTime=(this._duration||!V||ad||this._rawPrevTime===ad)?ad:v;
if(this._yoyo&&(this._cycle&1)!==0){this._time=ad=0}else{this._time=k;ad=k+0.0001
}}else{if(ad<1e-7){if(!this._locked){this._totalTime=this._cycle=0}this._time=0;
if(o!==0||(k===0&&n!==v&&(n>0||(ad<0&&n>=0))&&!this._locked)){S="onReverseComplete";
ae=this._reversed}if(ad<0){this._active=false;if(this._timeline.autoRemoveChildren&&this._reversed){Y=ae=true;
S="onReverseComplete"}else{if(n>=0&&this._first){Y=true}}this._rawPrevTime=ad}else{this._rawPrevTime=(k||!V||ad||this._rawPrevTime===ad)?ad:v;
if(ad===0&&ae){W=this._first;while(W&&W._startTime===0){if(!W._duration){ae=false
}W=W._next}}ad=0;if(!this._initted){Y=true}}}else{if(k===0&&n<0){Y=true}this._time=this._rawPrevTime=ad;
if(!this._locked){this._totalTime=ad;if(this._repeat!==0){l=k+this._repeatDelay;
this._cycle=(this._totalTime/l)>>0;if(this._cycle!==0){if(this._cycle===this._totalTime/l&&q<=ad){this._cycle--
}}this._time=this._totalTime-(this._cycle*l);if(this._yoyo){if((this._cycle&1)!==0){this._time=k-this._time
}}if(this._time>k){this._time=k;ad=k+0.0001}else{if(this._time<0){this._time=ad=0
}else{ad=this._time}}}}if(this._hasPause&&!this._forcingPlayhead&&!V&&ad<k){ad=this._time;
if(ad>=o||(this._repeat&&R!==this._cycle)){W=this._first;while(W&&W._startTime<=ad&&!af){if(!W._duration){if(W.data==="isPause"&&!W.ratio&&!(W._startTime===0&&this._rawPrevTime===0)){af=W
}}W=W._next}}else{W=this._last;while(W&&W._startTime>=ad&&!af){if(!W._duration){if(W.data==="isPause"&&W._rawPrevTime>0){af=W
}}W=W._prev}}if(af){this._time=ad=af._startTime;this._totalTime=ad+(this._cycle*(this._totalDuration+this._repeatDelay))
}}}}if(this._cycle!==R){if(!this._locked){var i=(this._yoyo&&(R&1)!==0),U=(i===(this._yoyo&&(this._cycle&1)!==0)),X=this._totalTime,T=this._cycle,ab=this._rawPrevTime,Z=this._time;
this._totalTime=R*k;if(this._cycle<R){i=!i}else{this._totalTime+=k}this._time=o;
this._rawPrevTime=(k===0)?n-0.0001:n;this._cycle=R;this._locked=true;o=(i)?0:k;
this.render(o,V,(k===0));if(!V){if(!this._gc){if(this.vars.onRepeat){this._cycle=T;
this._locked=false;this._callback("onRepeat")}}}if(o!==this._time){return}if(U){this._cycle=R;
this._locked=true;o=(i)?k+0.0001:-0.0001;this.render(o,true,false)}this._locked=false;
if(this._paused&&!j){return}this._time=Z;this._totalTime=X;this._cycle=T;this._rawPrevTime=ab
}}if((this._time===o||!this._first)&&!ac&&!Y&&!af){if(q!==this._totalTime){if(this._onUpdate){if(!V){this._callback("onUpdate")
}}}return}else{if(!this._initted){this._initted=true}}if(!this._active){if(!this._paused&&this._totalTime!==q&&ad>0){this._active=true
}}if(q===0){if(this.vars.onStart){if(this._totalTime!==0||!this._totalDuration){if(!V){this._callback("onStart")
}}}}aa=this._time;if(aa>=o){W=this._first;while(W){m=W._next;if(aa!==this._time||(this._paused&&!j)){break
}else{if(W._active||(W._startTime<=this._time&&!W._paused&&!W._gc)){if(af===W){this.pause()
}if(!W._reversed){W.render((ad-W._startTime)*W._timeScale,V,ac)}else{W.render(((!W._dirty)?W._totalDuration:W.totalDuration())-((ad-W._startTime)*W._timeScale),V,ac)
}}}W=m}}else{W=this._last;while(W){m=W._prev;if(aa!==this._time||(this._paused&&!j)){break
}else{if(W._active||(W._startTime<=o&&!W._paused&&!W._gc)){if(af===W){af=W._prev;
while(af&&af.endTime()>this._time){af.render((af._reversed?af.totalDuration()-((ad-af._startTime)*af._timeScale):(ad-af._startTime)*af._timeScale),V,ac);
af=af._prev}af=null;this.pause()}if(!W._reversed){W.render((ad-W._startTime)*W._timeScale,V,ac)
}else{W.render(((!W._dirty)?W._totalDuration:W.totalDuration())-((ad-W._startTime)*W._timeScale),V,ac)
}}}W=m}}if(this._onUpdate){if(!V){if(A.length){t()}this._callback("onUpdate")}}if(S){if(!this._locked){if(!this._gc){if(r===this._startTime||ag!==this._timeScale){if(this._time===0||h>=this.totalDuration()){if(ae){if(A.length){t()
}if(this._timeline.autoRemoveChildren){this._enabled(false,false)}this._active=false
}if(!V&&this.vars[S]){this._callback(S)}}}}}}};y.getActive=function(l,n,m){if(l==null){l=true
}if(n==null){n=true}if(m==null){m=false}var k=[],j=this.getChildren(l,n,m),h=0,q=j.length,o,i;
for(o=0;o<q;o++){i=j[o];if(i.isActive()){k[h++]=i}}return k};y.getLabelAfter=function(i){if(!i){if(i!==0){i=this._time
}}var h=this.getLabelsArray(),k=h.length,j;for(j=0;j<k;j++){if(h[j].time>i){return h[j].name
}}return null};y.getLabelBefore=function(i){if(i==null){i=this._time}var h=this.getLabelsArray(),j=h.length;
while(--j>-1){if(h[j].time<i){return h[j].name}}return null};y.getLabelsArray=function(){var j=[],i=0,h;
for(h in this._labels){j[i++]={time:this._labels[h],name:h}}j.sort(function(k,l){return k.time-l.time
});return j};y.invalidate=function(){this._locked=false;return z.prototype.invalidate.call(this)
};y.progress=function(h,i){return(!arguments.length)?this._time/this.duration():this.totalTime(this.duration()*((this._yoyo&&(this._cycle&1)!==0)?1-h:h)+(this._cycle*(this._duration+this._repeatDelay)),i)
};y.totalProgress=function(h,i){return(!arguments.length)?this._totalTime/this.totalDuration():this.totalTime(this.totalDuration()*h,i)
};y.totalDuration=function(h){if(!arguments.length){if(this._dirty){z.prototype.totalDuration.call(this);
this._totalDuration=(this._repeat===-1)?999999999999:this._duration*(this._repeat+1)+(this._repeatDelay*this._repeat)
}return this._totalDuration}return(this._repeat===-1||!h)?this:this.timeScale(this.totalDuration()/h)
};y.time=function(h,i){if(!arguments.length){return this._time}if(this._dirty){this.totalDuration()
}if(h>this._duration){h=this._duration}if(this._yoyo&&(this._cycle&1)!==0){h=(this._duration-h)+(this._cycle*(this._duration+this._repeatDelay))
}else{if(this._repeat!==0){h+=this._cycle*(this._duration+this._repeatDelay)}}return this.totalTime(h,i)
};y.repeat=function(h){if(!arguments.length){return this._repeat}this._repeat=h;
return this._uncache(true)};y.repeatDelay=function(h){if(!arguments.length){return this._repeatDelay
}this._repeatDelay=h;return this._uncache(true)};y.yoyo=function(h){if(!arguments.length){return this._yoyo
}this._yoyo=h;return this};y.currentLabel=function(h){if(!arguments.length){return this.getLabelBefore(this._time+1e-8)
}return this.seek(h,true)};return c},true);(function(){var I=180/Math.PI,M=[],p=[],y=[],K={},A=b._gsDefine.globals,C=function(k,i,h,j){if(h===j){h=j-(j-i)/1000000
}if(k===i){i=k+(h-k)/1000000}this.a=k;this.b=i;this.c=h;this.d=j;this.da=j-k;this.ca=h-k;
this.ba=i-k},E=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",B=function(q,r,s,u){var h={a:q},i={},k={},l={c:u},t=(q+r)/2,m=(r+s)/2,o=(s+u)/2,n=(t+m)/2,j=(m+o)/2,v=(j-n)/8;
h.b=t+(q-t)/4;i.b=n+v;h.c=i.a=(h.b+i.b)/2;i.c=k.a=(n+j)/2;k.b=j-v;l.b=o+(u-o)/4;
k.c=l.a=(k.b+l.b)/2;return[h,i,k,l]},F=function(h,v,u,S,T){var r=h.length-1,t=0,i=h[0].a,m,U,V,s,k,q,W,l,j,w,n,o,x;
for(m=0;m<r;m++){k=h[t];U=k.a;V=k.d;s=h[t+1].d;if(T){n=M[m];o=p[m];x=((o+n)*v*0.25)/(S?0.5:y[m]||0.5);
q=V-(V-U)*(S?v*0.5:(n!==0?x/n:0));W=V+(s-V)*(S?v*0.5:(o!==0?x/o:0));l=V-(q+(((W-q)*((n*3/(n+o))+0.5)/4)||0))
}else{q=V-(V-U)*v*0.5;W=V+(s-V)*v*0.5;l=V-(q+W)/2}q+=l;W+=l;k.c=j=q;if(m!==0){k.b=i
}else{k.b=i=k.a+(k.c-k.a)*0.6}k.da=V-U;k.ca=j-U;k.ba=i-U;if(u){w=B(U,i,j,V);h.splice(t,1,w[0],w[1],w[2],w[3]);
t+=4}else{t++}i=W}k=h[t];k.b=i;k.c=i+(k.d-i)*0.4;k.da=k.d-k.a;k.ca=k.c-k.a;k.ba=i-k.a;
if(u){w=B(k.a,i,k.c,k.d);h.splice(t,1,w[0],w[1],w[2],w[3])}},J=function(q,m,l,n){var h=[],k,i,o,r,s,j;
if(n){q=[n].concat(q);i=q.length;while(--i>-1){if(typeof((j=q[i][m]))==="string"){if(j.charAt(1)==="="){q[i][m]=n[m]+Number(j.charAt(0)+j.substr(2))
}}}}k=q.length-2;if(k<0){h[0]=new C(q[0][m],0,0,q[(k<-1)?0:1][m]);return h}for(i=0;
i<k;i++){o=q[i][m];r=q[i+1][m];h[i]=new C(o,0,0,r);if(l){s=q[i+2][m];M[i]=(M[i]||0)+(r-o)*(r-o);
p[i]=(p[i]||0)+(s-r)*(s-r)}}h[i]=new C(q[i][m],0,0,q[i+1][m]);return h},c=function(m,q,w,P,j,l){var u={},s=[],t=l||m[0],v,k,o,x,r,h,i,n;
j=(typeof(j)==="string")?","+j+",":E;if(q==null){q=1}for(k in m[0]){s.push(k)}if(m.length>1){n=m[m.length-1];
i=true;v=s.length;while(--v>-1){k=s[v];if(Math.abs(t[k]-n[k])>0.05){i=false;break
}}if(i){m=m.concat();if(l){m.unshift(l)}m.push(m[1]);l=m[m.length-3]}}M.length=p.length=y.length=0;
v=s.length;while(--v>-1){k=s[v];K[k]=(j.indexOf(","+k+",")!==-1);u[k]=J(m,k,K[k],l)
}v=M.length;while(--v>-1){M[v]=Math.sqrt(M[v]);p[v]=Math.sqrt(p[v])}if(!P){v=s.length;
while(--v>-1){if(K[k]){o=u[s[v]];h=o.length-1;for(x=0;x<h;x++){r=(o[x+1].da/p[x]+o[x].da/M[x])||0;
y[x]=(y[x]||0)+r*r}}}v=y.length;while(--v>-1){y[v]=Math.sqrt(y[v])}}v=s.length;
x=w?4:1;while(--v>-1){k=s[v];o=u[k];F(o,q,w,P,K[k]);if(i){o.splice(0,x);o.splice(o.length-x,x)
}}return u},L=function(q,Q,h){Q=Q||"soft";var w={},x=(Q==="cubic")?3:2,o=(Q==="soft"),R=[],i,j,k,m,n,r,t,u,v,s,l;
if(o&&h){q=[h].concat(q)}if(q==null||q.length<x+1){throw"invalid Bezier data"}for(v in q[0]){R.push(v)
}r=R.length;while(--r>-1){v=R[r];w[v]=n=[];s=0;u=q.length;for(t=0;t<u;t++){i=(h==null)?q[t][v]:(typeof((l=q[t][v]))==="string"&&l.charAt(1)==="=")?h[v]+Number(l.charAt(0)+l.substr(2)):Number(l);
if(o){if(t>1){if(t<u-1){n[s++]=(i+n[s-2])/2}}}n[s++]=i}u=s-x+1;s=0;for(t=0;t<u;
t+=x){i=n[t];j=n[t+1];k=n[t+2];m=(x===2)?0:n[t+3];n[s++]=l=(x===3)?new C(i,j,k,m):new C(i,(2*j+i)/3,(2*j+k)/3,k)
}n.length=s}return w},H=function(r,s,j){var k=1/j,h=r.length,u,q,l,m,i,t,o,w,x,n,v;
while(--h>-1){n=r[h];l=n.a;m=n.d-l;i=n.c-l;t=n.b-l;u=q=0;for(w=1;w<=j;w++){o=k*w;
x=1-o;u=q-(q=(o*o*m+3*x*(o*i+x*t))*o);v=h*j+w-1;s[v]=(s[v]||0)+u*u}}},z=function(h,j){j=j>>0||6;
var n=[],k=[],q=0,o=0,t=j-1,u=[],r=[],m,i,l,s;for(m in h){H(h[m],n,j)}l=n.length;
for(i=0;i<l;i++){q+=Math.sqrt(n[i]);s=i%j;r[s]=q;if(s===t){o+=q;s=(i/j)>>0;u[s]=r;
k[s]=o;q=0;r=[]}}return{length:o,lengths:k,segments:u}},G=b._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.7",API:2,global:true,init:function(t,s,o){this._target=t;
if(s instanceof Array){s={values:s}}this._func={};this._mod={};this._props=[];this._timeRes=(s.timeResolution==null)?6:parseInt(s.timeResolution,10);
var q=s.values||[],u={},k=q[0],j=s.autoRotate||o.vars.orientToBezier,l,r,h,i,n;
this._autoRotate=j?(j instanceof Array)?j:[["x","y","rotation",((j===true)?0:Number(j)||0)]]:null;
for(l in k){this._props.push(l)}h=this._props.length;while(--h>-1){l=this._props[h];
this._overwriteProps.push(l);r=this._func[l]=(typeof(t[l])==="function");u[l]=(!r)?parseFloat(t[l]):t[((l.indexOf("set")||typeof(t["get"+l.substr(3)])!=="function")?l:"get"+l.substr(3))]();
if(!n){if(u[l]!==q[0][l]){n=u}}}this._beziers=(s.type!=="cubic"&&s.type!=="quadratic"&&s.type!=="soft")?c(q,isNaN(s.curviness)?1:s.curviness,false,(s.type==="thruBasic"),s.correlate,n):L(q,s.type,u);
this._segCount=this._beziers[l].length;if(this._timeRes){var m=z(this._beziers,this._timeRes);
this._length=m.length;this._lengths=m.lengths;this._segments=m.segments;this._l1=this._li=this._s1=this._si=0;
this._l2=this._lengths[0];this._curSeg=this._segments[0];this._s2=this._curSeg[0];
this._prec=1/this._curSeg.length}if((j=this._autoRotate)){this._initialRotations=[];
if(!(j[0] instanceof Array)){this._autoRotate=j=[j]}h=j.length;while(--h>-1){for(i=0;
i<3;i++){l=j[h][i];this._func[l]=(typeof(t[l])==="function")?t[((l.indexOf("set")||typeof(t["get"+l.substr(3)])!=="function")?l:"get"+l.substr(3))]:false
}l=j[h][2];this._initialRotations[h]=(this._func[l]?this._func[l].call(this._target):this._target[l])||0;
this._overwriteProps.push(l)}}this._startRatio=o.vars.runBackwards?1:0;return true
},set:function(w){var o=this._segCount,X=this._func,i=this._target,v=(w!==this._startRatio),x,t,m,q,j,u,h,n,Y,V;
if(!this._timeRes){x=(w<0)?0:(w>=1)?o-1:(o*w)>>0;u=(w-(x*(1/o)))*o}else{Y=this._lengths;
V=this._curSeg;w*=this._length;m=this._li;if(w>this._l2&&m<o-1){n=o-1;while(m<n&&(this._l2=Y[++m])<=w){}this._l1=Y[m-1];
this._li=m;this._curSeg=V=this._segments[m];this._s2=V[(this._s1=this._si=0)]}else{if(w<this._l1&&m>0){while(m>0&&(this._l1=Y[--m])>=w){}if(m===0&&w<this._l1){this._l1=0
}else{m++}this._l2=Y[m];this._li=m;this._curSeg=V=this._segments[m];this._s1=V[(this._si=V.length-1)-1]||0;
this._s2=V[this._si]}}x=m;w-=this._l1;m=this._si;if(w>this._s2&&m<V.length-1){n=V.length-1;
while(m<n&&(this._s2=V[++m])<=w){}this._s1=V[m-1];this._si=m}else{if(w<this._s1&&m>0){while(m>0&&(this._s1=V[--m])>=w){}if(m===0&&w<this._s1){this._s1=0
}else{m++}this._s2=V[m];this._si=m}}u=((m+(w-this._s1)/(this._s2-this._s1))*this._prec)||0
}t=1-u;m=this._props.length;while(--m>-1){q=this._props[m];j=this._beziers[q][x];
h=(u*u*j.da+3*t*(u*j.ca+t*j.ba))*u+j.a;if(this._mod[q]){h=this._mod[q](h,i)}if(X[q]){i[q](h)
}else{i[q]=h}}if(this._autoRotate){var r=this._autoRotate,W,k,Z,l,aa,s,ab;m=r.length;
while(--m>-1){q=r[m][2];s=r[m][3]||0;ab=(r[m][4]===true)?1:I;j=this._beziers[r[m][0]];
W=this._beziers[r[m][1]];if(j&&W){j=j[x];W=W[x];k=j.a+(j.b-j.a)*u;l=j.b+(j.c-j.b)*u;
k+=(l-k)*u;l+=((j.c+(j.d-j.c)*u)-l)*u;Z=W.a+(W.b-W.a)*u;aa=W.b+(W.c-W.b)*u;Z+=(aa-Z)*u;
aa+=((W.c+(W.d-W.c)*u)-aa)*u;h=v?Math.atan2(aa-Z,l-k)*ab+s:this._initialRotations[m];
if(this._mod[q]){h=this._mod[q](h,i)}if(X[q]){i[q](h)}else{i[q]=h}}}}}}),D=G.prototype;
G.bezierThrough=c;G.cubicToQuadratic=B;G._autoCSS=true;G.quadraticToCubic=function(j,h,i){return new C(j,(2*h+j)/3,(2*h+i)/3,i)
};G._cssRegister=function(){var j=A.CSSPlugin;if(!j){return}var i=j._internals,h=i._parseToProxy,l=i._setPluginRatio,k=i.CSSPropTween;
i._registerComplexSpecialProp("bezier",{parser:function(q,t,n,P,o,u){if(t instanceof Array){t={values:t}
}u=new G();var r=t.values,x=r.length-1,Q=[],s={},v,m,w;if(x<0){return o}for(v=0;
v<=x;v++){w=h(q,r[v],P,o,u,(x!==v));Q[v]=w.end}for(m in t){s[m]=t[m]}s.values=Q;
o=new k(q,"bezier",0,0,w.pt,2);o.data=w;o.plugin=u;o.setRatio=l;if(s.autoRotate===0){s.autoRotate=true
}if(s.autoRotate&&!(s.autoRotate instanceof Array)){v=(s.autoRotate===true)?0:Number(s.autoRotate);
s.autoRotate=(w.end.left!=null)?[["left","top","rotation",v,false]]:(w.end.x!=null)?[["x","y","rotation",v,false]]:false
}if(s.autoRotate){if(!P._transform){P._enableTransforms(false)}w.autoRotate=P._target._gsTransform;
w.proxy.rotation=w.autoRotate.rotation||0;P._overwriteProps.push("rotation")}u._onInitTween(w.proxy,s,P._tween);
return o}})};D._mod=function(k){var h=this._overwriteProps,i=h.length,j;while(--i>-1){j=k[h[i]];
if(j&&typeof(j)==="function"){this._mod[h[i]]=j}}};D._kill=function(k){var j=this._props,h,i;
for(h in this._beziers){if(h in k){delete this._beziers[h];delete this._func[h];
i=j.length;while(--i>-1){if(j[i]===h){j.splice(i,1)}}}}j=this._autoRotate;if(j){i=j.length;
while(--i>-1){if(k[j[i][2]]){j.splice(i,1)}}}return this._super._kill.call(this,k)
}}());b._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(bJ,p){var cy=function(){bJ.call(this,"css");
this._overwriteProps.length=0;this.setRatio=cy.prototype.setRatio},bY=b._gsDefine.globals,cA,br,bv,cK,bq={},cg=cy.prototype=new bJ("css");
cg.constructor=cy;cy.version="1.19.1";cy.API=2;cy.defaultTransformPerspective=0;
cy.defaultSkewType="compensated";cy.defaultSmoothOrigin=true;cg="px";cy.suffixMap={top:cg,right:cg,bottom:cg,left:cg,width:cg,height:cg,fontSize:cg,padding:cg,margin:cg,perspective:cg,lineHeight:""};
var cl=/(?:\-|\.|\b)(\d|\.|e\-)+/g,bV=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,cG=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,co=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,bT=/(?:\d|\-|\+|=|#|\.)*/g,cs=/opacity *= *([^)]*)/i,bg=/opacity:([^;]*)/i,bX=/alpha\(opacity *=.+?\)/i,cd=/^(rgb|hsl)/,b7=/([A-Z])/g,bm=/-([a-z])/gi,cc=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,cF=function(h,j){return j.toUpperCase()
},bP=/(?:Left|Right|Width)/i,bZ=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,bA=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,bS=/,(?=[^\)]*(?:\(|$))/gi,b6=/[\s,\(]/i,ch=Math.PI/180,cw=180/Math.PI,bC={},by={style:{}},cS=b.document||{createElement:function(){return by
}},cP=function(j,h){return cS.createElementNS?cS.createElementNS(h||"http://www.w3.org/1999/xhtml",j):cS.createElement(j)
},bF=cP("div"),bQ=cP("img"),bh=cy._internals={_specialProps:bq},cI=(b.navigator||{}).userAgent||"",bK,cx,bG,bz,bf,bs,ce=(function(){var h=cI.indexOf("Android"),j=cP("a");
bG=(cI.indexOf("Safari")!==-1&&cI.indexOf("Chrome")===-1&&(h===-1||parseFloat(cI.substr(h+8,2))>3));
bf=(bG&&(parseFloat(cI.substr(cI.indexOf("Version/")+8,2))<6));bz=(cI.indexOf("Firefox")!==-1);
if((/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(cI)||(/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/).exec(cI)){bs=parseFloat(RegExp.$1)
}if(!j){return false}j.style.cssText="top:1px;opacity:.55;";return/^0.55/.test(j.style.opacity)
}()),bR=function(h){return(cs.test(((typeof(h)==="string")?h:(h.currentStyle?h.currentStyle.filter:h.style.filter)||""))?(parseFloat(RegExp.$1)/100):1)
},bN=function(h){if(b.console){console.log(h)}},cB,cq,i="",cQ="",bu=function(h,j){j=j||bF;
var k=j.style,m,l;if(k[h]!==undefined){return h}h=h.charAt(0).toUpperCase()+h.substr(1);
m=["O","Moz","ms","Ms","Webkit"];l=5;while(--l>-1&&k[m[l]+h]===undefined){}if(l>=0){cQ=(l===3)?"ms":m[l];
i="-"+cQ.toLowerCase()+"-";return cQ+h}return null},ct=cS.defaultView?cS.defaultView.getComputedStyle:function(){},bM=cy.getStyle=function(n,k,m,j,l){var h;
if(!ce){if(k==="opacity"){return bR(n)}}if(!j&&n.style[k]){h=n.style[k]}else{if((m=m||ct(n))){h=m[k]||m.getPropertyValue(k)||m.getPropertyValue(k.replace(b7,"-$1").toLowerCase())
}else{if(n.currentStyle){h=n.currentStyle[k]}}}return(l!=null&&(!h||h==="none"||h==="auto"||h==="auto auto"))?l:h
},bH=bh.convertToPixels=function(h,t,k,n,v){if(n==="px"||!n){return k}if(n==="auto"||!k){return 0
}var j=bP.test(t),q=h,u=bF.style,o=(k<0),m=(k===1),l,s,r;if(o){k=-k}if(m){k*=100
}if(n==="%"&&t.indexOf("border")!==-1){l=(k/100)*(j?h.clientWidth:h.clientHeight)
}else{u.cssText="border:0 solid red;position:"+bM(h,"position")+";line-height:0;";
if(n==="%"||!q.appendChild||n.charAt(0)==="v"||n==="rem"){q=h.parentNode||cS.body;
s=q._gsCache;r=p.ticker.frame;if(s&&j&&s.time===r){return s.width*k/100}u[(j?"width":"height")]=k+n
}else{u[(j?"borderLeftWidth":"borderTopWidth")]=k+n}q.appendChild(bF);l=parseFloat(bF[(j?"offsetWidth":"offsetHeight")]);
q.removeChild(bF);if(j&&n==="%"&&cy.cacheWidths!==false){s=q._gsCache=q._gsCache||{};
s.time=r;s.width=l/k*100}if(l===0&&!v){l=bH(h,t,k,n,true)}}if(m){l/=100}return o?-l:l
},bn=bh.calculateOffset=function(m,j,l){if(bM(m,"position",l)!=="absolute"){return 0
}var k=((j==="left")?"Left":"Top"),h=bM(m,"margin"+k,l);return m["offset"+k]-(bH(m,j,parseFloat(h),h.replace(bT,""))||0)
},cz=function(m,k){var l={},n,j,h;if((k=k||ct(m,null))){if((n=k.length)){while(--n>-1){h=k[n];
if(h.indexOf("-transform")===-1||cE===h){l[h.replace(bm,cF)]=k.getPropertyValue(h)
}}}else{for(n in k){if(n.indexOf("Transform")===-1||cm===n){l[n]=k[n]}}}}else{if((k=m.currentStyle||m.style)){for(n in k){if(typeof(n)==="string"&&l[n]===undefined){l[n.replace(bm,cF)]=k[n]
}}}}if(!ce){l.opacity=bR(m)}j=bp(m,k,false);l.rotation=j.rotation;l.skewX=j.skewX;
l.scaleX=j.scaleX;l.scaleY=j.scaleY;l.x=j.x;l.y=j.y;if(bo){l.z=j.z;l.rotationX=j.rotationX;
l.rotationY=j.rotationY;l.scaleZ=j.scaleZ}if(l.filters){delete l.filters}return l
},bd=function(h,j,k,m,n){var q={},o=h.style,r,s,l;for(s in k){if(s!=="cssText"){if(s!=="length"){if(isNaN(s)){if(j[s]!==(r=k[s])||(n&&n[s])){if(s.indexOf("Origin")===-1){if(typeof(r)==="number"||typeof(r)==="string"){q[s]=(r==="auto"&&(s==="left"||s==="top"))?bn(h,s):((r===""||r==="auto"||r==="none")&&typeof(j[s])==="string"&&j[s].replace(co,"")!=="")?0:r;
if(o[s]!==undefined){l=new b9(o,s,o[s],l)}}}}}}}}if(m){for(s in m){if(s!=="className"){q[s]=m[s]
}}}return{difs:q,firstMPT:l}},cn={width:["Left","Right"],height:["Top","Bottom"]},b5=["marginLeft","marginRight","marginTop","marginBottom"],cr=function(k,h,j){if((k.nodeName+"").toLowerCase()==="svg"){return(j||ct(k))[h]||0
}else{if(k.getCTM&&be(k)){return k.getBBox()[h]||0}}var m=parseFloat((h==="width")?k.offsetWidth:k.offsetHeight),n=cn[h],l=n.length;
j=j||ct(k,null);while(--l>-1){m-=parseFloat(bM(k,"padding"+n[l],j,true))||0;m-=parseFloat(bM(k,"border"+n[l]+"Width",j,true))||0
}return m},cv=function(l,k){if(l==="contain"||l==="auto"||l==="auto auto"){return l+" "
}if(l==null||l===""){l="0 0"}var m=l.split(" "),n=(l.indexOf("left")!==-1)?"0%":(l.indexOf("right")!==-1)?"100%":m[0],h=(l.indexOf("top")!==-1)?"0%":(l.indexOf("bottom")!==-1)?"100%":m[1],j;
if(m.length>3&&!k){m=l.split(", ").join(",").split(",");l=[];for(j=0;j<m.length;
j++){l.push(cv(m[j]))}return l.join(",")}if(h==null){h=(n==="center")?"50%":"0"
}else{if(h==="center"){h="50%"}}if(n==="center"||(isNaN(parseFloat(n))&&(n+"").indexOf("=")===-1)){n="50%"
}l=n+" "+h+((m.length>2)?" "+m[2]:"");if(k){k.oxp=(n.indexOf("%")!==-1);k.oyp=(h.indexOf("%")!==-1);
k.oxr=(n.charAt(1)==="=");k.oyr=(h.charAt(1)==="=");k.ox=parseFloat(n.replace(co,""));
k.oy=parseFloat(h.replace(co,""));k.v=l}return k||l},bE=function(j,h){if(typeof(j)==="function"){j=j(cq,cB)
}return(typeof(j)==="string"&&j.charAt(1)==="=")?parseInt(j.charAt(0)+"1",10)*parseFloat(j.substr(2)):(parseFloat(j)-parseFloat(h))||0
},bW=function(h,j){if(typeof(h)==="function"){h=h(cq,cB)}return(h==null)?j:(typeof(h)==="string"&&h.charAt(1)==="=")?parseInt(h.charAt(0)+"1",10)*parseFloat(h.substr(2))+j:parseFloat(h)||0
},cM=function(k,r,n,l){var s=0.000001,j,q,o,h,m;if(typeof(k)==="function"){k=k(cq,cB)
}if(k==null){h=r}else{if(typeof(k)==="number"){h=k}else{j=360;q=k.split("_");m=(k.charAt(1)==="=");
o=(m?parseInt(k.charAt(0)+"1",10)*parseFloat(q[0].substr(2)):parseFloat(q[0]))*((k.indexOf("rad")===-1)?1:cw)-(m?0:r);
if(q.length){if(l){l[n]=r+o}if(k.indexOf("short")!==-1){o=o%j;if(o!==o%(j/2)){o=(o<0)?o+j:o-j
}}if(k.indexOf("_cw")!==-1&&o<0){o=((o+j*9999999999)%j)-((o/j)|0)*j}else{if(k.indexOf("ccw")!==-1&&o>0){o=((o-j*9999999999)%j)-((o/j)|0)*j
}}}h=r+o}}if(h<s&&h>-s){h=0}return h},b8={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},cu=function(j,k,h){j=(j<0)?j+1:(j>1)?j-1:j;
return((((j*6<1)?k+(h-k)*j*6:(j<0.5)?h:(j*3<2)?k+(h-k)*(2/3-j)*6:k)*255)+0.5)|0
},cN=cy.parseColor=function(k,u){var l,s,q,m,t,j,h,n,v,o,r;if(!k){l=b8.black}else{if(typeof(k)==="number"){l=[k>>16,(k>>8)&255,k&255]
}else{if(k.charAt(k.length-1)===","){k=k.substr(0,k.length-1)}if(b8[k]){l=b8[k]
}else{if(k.charAt(0)==="#"){if(k.length===4){s=k.charAt(1);q=k.charAt(2);m=k.charAt(3);
k="#"+s+s+q+q+m+m}k=parseInt(k.substr(1),16);l=[k>>16,(k>>8)&255,k&255]}else{if(k.substr(0,3)==="hsl"){l=r=k.match(cl);
if(!u){t=(Number(l[0])%360)/360;j=Number(l[1])/100;h=Number(l[2])/100;q=(h<=0.5)?h*(j+1):h+j-h*j;
s=h*2-q;if(l.length>3){l[3]=Number(k[3])}l[0]=cu(t+1/3,s,q);l[1]=cu(t,s,q);l[2]=cu(t-1/3,s,q)
}else{if(k.indexOf("=")!==-1){return k.match(bV)}}}else{l=k.match(cl)||b8.transparent
}}}l[0]=Number(l[0]);l[1]=Number(l[1]);l[2]=Number(l[2]);if(l.length>3){l[3]=Number(l[3])
}}}if(u&&!r){s=l[0]/255;q=l[1]/255;m=l[2]/255;n=Math.max(s,q,m);v=Math.min(s,q,m);
h=(n+v)/2;if(n===v){t=j=0}else{o=n-v;j=h>0.5?o/(2-n-v):o/(n+v);t=(n===s)?(q-m)/o+(q<m?6:0):(n===q)?(m-s)/o+2:(s-q)/o+4;
t*=60}l[0]=(t+0.5)|0;l[1]=(j*100+0.5)|0;l[2]=(h*100+0.5)|0}return l},bL=function(k,h){var q=k.match(cD)||[],j=0,m=q.length?"":k,l,n,o;
for(l=0;l<q.length;l++){n=q[l];o=k.substr(j,k.indexOf(n,j)-j);j+=o.length+n.length;
n=cN(n,h);if(n.length===3){n.push(1)}m+=o+(h?"hsla("+n[0]+","+n[1]+"%,"+n[2]+"%,"+n[3]:"rgba("+n.join(","))+")"
}return m+k.substr(j)},cD="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
for(cg in b8){cD+="|"+cg+"\\b"}cD=new RegExp(cD+")","gi");cy.colorStringFilter=function(h){var k=h[0]+h[1],j;
if(cD.test(k)){j=(k.indexOf("hsl(")!==-1||k.indexOf("hsla(")!==-1);h[0]=bL(h[0],j);
h[1]=bL(h[1],j)}cD.lastIndex=0};if(!p.defaultStringFilter){p.defaultStringFilter=cy.colorStringFilter
}var cH=function(r,j,k,o){if(r==null){return function(v){return v}}var l=j?(r.match(cD)||[""])[0]:"",s=r.split(l).join("").match(cG)||[],n=r.substr(0,r.indexOf(s[0])),t=(r.charAt(r.length-1)===")")?")":"",q=(r.indexOf(" ")!==-1)?" ":",",u=s.length,h=(u>0)?s[0].replace(cl,""):"",m;
if(!u){return function(v){return v}}if(j){m=function(x){var y,v,w,z;if(typeof(x)==="number"){x+=h
}else{if(o&&bS.test(x)){z=x.replace(bS,"|").split("|");for(w=0;w<z.length;w++){z[w]=m(z[w])
}return z.join(",")}}y=(x.match(cD)||[l])[0];v=x.split(y).join("").match(cG)||[];
w=v.length;if(u>w--){while(++w<u){v[w]=k?v[(((w-1)/2)|0)]:s[w]}}return n+v.join(q)+q+y+t+(x.indexOf("inset")!==-1?" inset":"")
};return m}m=function(x){var v,y,w;if(typeof(x)==="number"){x+=h}else{if(o&&bS.test(x)){y=x.replace(bS,"|").split("|");
for(w=0;w<y.length;w++){y[w]=m(y[w])}return y.join(",")}}v=x.match(cG)||[];w=v.length;
if(u>w--){while(++w<u){v[w]=k?v[(((w-1)/2)|0)]:s[w]}}return n+v.join(q)+t};return m
},cp=function(h){h=h.split(",");return function(k,n,s,r,j,o,m){var l=(n+"").split(" "),q;
m={};for(q=0;q<4;q++){m[h[q]]=l[q]=l[q]||l[(((q-1)/2)>>0)]}return r.parse(k,m,j,o)
}},cJ=bh._setPluginRatio=function(j){this.plugin.setRatio(j);var n=this.data,m=n.proxy,k=n.firstMPT,q=0.000001,r,h,o,l,s;
while(k){r=m[k.v];if(k.r){r=Math.round(r)}else{if(r<q&&r>-q){r=0}}k.t[k.p]=r;k=k._next
}if(n.autoRotate){n.autoRotate.rotation=n.mod?n.mod(m.rotation,this.t):m.rotation
}if(j===1||j===0){k=n.firstMPT;s=(j===1)?"e":"b";while(k){h=k.t;if(!h.type){h[s]=h.s+h.xs0
}else{if(h.type===1){l=h.xs0+h.s+h.xs1;for(o=1;o<h.l;o++){l+=h["xn"+o]+h["xs"+(o+1)]
}h[s]=l}}k=k._next}}},b9=function(m,j,h,l,k){this.t=m;this.p=j;this.v=h;this.r=k;
if(l){l._prev=this;this._next=l}},bw=bh._parseToProxy=function(x,h,r,w,j,s){var q=w,u={},m={},t=r._transform,n=bC,k,v,l,y,o;
r._transform=null;bC=h;w=o=r.parse(x,h,w,j);bC=n;if(s){r._transform=t;if(q){q._prev=null;
if(q._prev){q._prev._next=null}}}while(w&&w!==q){if(w.type<=1){v=w.p;m[v]=w.s+w.c;
u[v]=w.s;if(!s){y=new b9(w,"s",v,y,w.r);w.c=0}if(w.type===1){k=w.l;while(--k>0){l="xn"+k;
v=w.p+"_"+l;m[v]=w.data[l];u[v]=w[l];if(!s){y=new b9(w,l,v,y,w.rxp[l])}}}}w=w._next
}return{proxy:u,end:m,firstMPT:y,pt:o}},b2=bh.CSSPropTween=function(j,s,h,m,o,l,r,q,t,k,n){this.t=j;
this.p=s;this.s=h;this.c=m;this.n=r||s;if(!(j instanceof b2)){cK.push(this.n)}this.r=q;
this.type=l||0;if(t){this.pr=t;cA=true}this.b=(k===undefined)?h:k;this.e=(n===undefined)?h+m:n;
if(o){this._next=o;o._prev=this}},a0=function(l,h,k,j,n,o){var m=new b2(l,h,k,j-k,n,-1,o);
m.b=k;m.e=m.xs0=j;return m},bj=cy.parseComplex=function(j,I,y,G,H,J,F,A,o,v){y=y||J||"";
if(typeof(G)==="function"){G=G(cq,cB)}F=new b2(j,I,0,0,F,(v?2:1),null,false,A,y,G);
G+="";if(H&&cD.test(G+y)){G=[y,G];cy.colorStringFilter(G);y=G[0];G=G[1]}var l=y.split(", ").join(",").split(" "),k=G.split(", ").join(",").split(" "),C=l.length,z=(bK!==false),w,h,n,t,B,m,r,s,x,E,q,D,u;
if(G.indexOf(",")!==-1||y.indexOf(",")!==-1){l=l.join(" ").replace(bS,", ").split(" ");
k=k.join(" ").replace(bS,", ").split(" ");C=l.length}if(C!==k.length){l=(J||"").split(" ");
C=l.length}F.plugin=o;F.setRatio=v;cD.lastIndex=0;for(w=0;w<C;w++){t=l[w];B=k[w];
s=parseFloat(t);if(s||s===0){F.appendXtra("",s,bE(B,s),B.replace(bV,""),(z&&B.indexOf("px")!==-1),true)
}else{if(H&&cD.test(t)){D=B.indexOf(")")+1;D=")"+(D?B.substr(D):"");u=(B.indexOf("hsl")!==-1&&ce);
t=cN(t,u);B=cN(B,u);x=(t.length+B.length>6);if(x&&!ce&&B[3]===0){F["xs"+F.l]+=F.l?" transparent":"transparent";
F.e=F.e.split(k[w]).join("transparent")}else{if(!ce){x=false}if(u){F.appendXtra((x?"hsla(":"hsl("),t[0],bE(B[0],t[0]),",",false,true).appendXtra("",t[1],bE(B[1],t[1]),"%,",false).appendXtra("",t[2],bE(B[2],t[2]),(x?"%,":"%"+D),false)
}else{F.appendXtra((x?"rgba(":"rgb("),t[0],B[0]-t[0],",",true,true).appendXtra("",t[1],B[1]-t[1],",",true).appendXtra("",t[2],B[2]-t[2],(x?",":D),true)
}if(x){t=(t.length<4)?1:t[3];F.appendXtra("",t,((B.length<4)?1:B[3])-t,D,false)
}}cD.lastIndex=0}else{m=t.match(cl);if(!m){F["xs"+F.l]+=(F.l||F["xs"+F.l])?" "+B:B
}else{r=B.match(bV);if(!r||r.length!==m.length){return F}n=0;for(h=0;h<m.length;
h++){q=m[h];E=t.indexOf(q,n);F.appendXtra(t.substr(n,E-n),Number(q),bE(r[h],q),"",(z&&t.substr(E+q.length,2)==="px"),(h===0));
n=E+q.length}F["xs"+F.l]+=t.substr(n)}}}}if(G.indexOf("=")!==-1){if(F.data){D=F.xs0+F.data.s;
for(w=1;w<F.l;w++){D+=F["xs"+w]+F.data["xn"+w]}F.e=D+F["xs"+w]}}if(!F.l){F.type=-1;
F.xs0=F.e}return F.xfirst||F},ca=9;cg=b2.prototype;cg.l=cg.pr=0;while(--ca>0){cg["xn"+ca]=0;
cg["xs"+ca]=""}cg.xs0="";cg._next=cg._prev=cg.xfirst=cg.data=cg.plugin=cg.setRatio=cg.rxp=null;
cg.appendXtra=function(j,q,h,l,o,m){var n=this,k=n.l;n["xs"+k]+=(m&&(k||n["xs"+k]))?" "+j:j||"";
if(!h){if(k!==0&&!n.plugin){n["xs"+k]+=q+(l||"");return n}}n.l++;n.type=n.setRatio?2:1;
n["xs"+n.l]=l||"";if(k>0){n.data["xn"+k]=q+h;n.rxp["xn"+k]=o;n["xn"+k]=q;if(!n.plugin){n.xfirst=new b2(n,"xn"+k,q,h,n.xfirst||n,0,n.n,o,n.pr);
n.xfirst.xs0=0}return n}n.data={s:q+h};n.rxp={};n.s=q;n.c=h;n.r=o;return n};var b3=function(j,h){h=h||{};
this.p=h.prefix?bu(j)||j:j;bq[j]=bq[this.p]=this;this.format=h.formatter||cH(h.defaultValue,h.color,h.collapsible,h.multi);
if(h.parser){this.parse=h.parser}this.clrs=h.color;this.multi=h.multi;this.keyword=h.keyword;
this.dflt=h.defaultValue;this.pr=h.priority||0},bx=bh._registerComplexSpecialProp=function(j,m,k){if(typeof(m)!=="object"){m={parser:k}
}var o=j.split(","),h=m.defaultValue,l,n;k=k||[h];for(l=0;l<o.length;l++){m.prefix=(l===0&&m.prefix);
m.defaultValue=k[l]||h;n=new b3(o[l],m)}},bk=bh._registerPluginProp=function(j){if(!bq[j]){var h=j.charAt(0).toUpperCase()+j.substr(1)+"Plugin";
bx(j,{parser:function(r,k,l,s,m,o,n){var q=bY.com.greensock.plugins[h];if(!q){bN("Error: "+h+" js file not loaded.");
return m}q._cssRegister();return bq[l].parse(r,k,l,s,m,o,n)}})}};cg=b3.prototype;
cg.parseComplex=function(j,k,o,h,r,l){var q=this.keyword,s,m,n,u,t,v;if(this.multi){if(bS.test(o)||bS.test(k)){m=k.replace(bS,"|").split("|");
n=o.replace(bS,"|").split("|")}else{if(q){m=[k];n=[o]}}}if(n){u=(n.length>m.length)?n.length:m.length;
for(s=0;s<u;s++){k=m[s]=m[s]||this.dflt;o=n[s]=n[s]||this.dflt;if(q){t=k.indexOf(q);
v=o.indexOf(q);if(t!==v){if(v===-1){m[s]=m[s].split(q).join("")}else{if(t===-1){m[s]+=" "+q
}}}}}k=m.join(", ");o=n.join(", ")}return bj(j,this.p,k,o,this.clrs,this.dflt,h,this.pr,r,l)
};cg.parse=function(l,j,k,h,m,o,n){return this.parseComplex(l.style,this.format(bM(l,this.p,bv,false,this.dflt)),this.format(j),m,o)
};cy.registerSpecialProp=function(h,j,k){bx(h,{parser:function(s,m,n,l,o,r,q){var t=new b2(s,n,0,0,o,2,n,false,k);
t.plugin=r;t.setRatio=j(s,m,l._tween,n);return t},priority:k})};cy.useSVGTransformAttr=true;
var bO=("scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent").split(","),cm=bu("transform"),cE=i+"transform",ci=bu("transformOrigin"),bo=(bu("perspective")!==null),cO=bh.Transform=function(){this.perspective=parseFloat(cy.defaultTransformPerspective)||0;
this.force3D=(cy.defaultForce3D===false||!bo)?false:cy.defaultForce3D||"auto"},bU=b.SVGElement,bI,c=function(k,j,n){var m=cS.createElementNS("http://www.w3.org/2000/svg",k),l=/([a-z])([A-Z])/g,h;
for(h in n){m.setAttributeNS(null,h.replace(l,"$1-$2").toLowerCase(),n[h])}j.appendChild(m);
return m},bD=cS.documentElement||{},cj=(function(){var j=bs||(/Android/i.test(cI)&&!b.chrome),h,k,l;
if(cS.createElementNS&&!j){h=c("svg",bD);k=c("rect",h,{width:100,height:50,x:100});
l=k.getBoundingClientRect().width;k.style[ci]="50% 50%";k.style[cm]="scaleX(0.5)";
j=(l===k.getBoundingClientRect().width&&!(bz&&bo));bD.removeChild(h)}return j})(),bi=function(h,l,w,C,n,s){var u=h._gsTransform,k=b1(h,true),o,q,r,j,v,x,z,B,D,y,A,m,E,t;
if(u){E=u.xOrigin;t=u.yOrigin}if(!C||(o=C.split(" ")).length<2){z=h.getBBox();if(z.x===0&&z.y===0&&z.width+z.height===0){z={x:parseFloat(h.hasAttribute("x")?h.getAttribute("x"):h.hasAttribute("cx")?h.getAttribute("cx"):0)||0,y:parseFloat(h.hasAttribute("y")?h.getAttribute("y"):h.hasAttribute("cy")?h.getAttribute("cy"):0)||0,width:0,height:0}
}l=cv(l).split(" ");o=[(l[0].indexOf("%")!==-1?parseFloat(l[0])/100*z.width:parseFloat(l[0]))+z.x,(l[1].indexOf("%")!==-1?parseFloat(l[1])/100*z.height:parseFloat(l[1]))+z.y]
}w.xOrigin=j=parseFloat(o[0]);w.yOrigin=v=parseFloat(o[1]);if(C&&k!==bt){x=k[0];
z=k[1];B=k[2];D=k[3];y=k[4];A=k[5];m=(x*D-z*B);if(m){q=j*(D/m)+v*(-B/m)+((B*A-D*y)/m);
r=j*(-z/m)+v*(x/m)-((x*A-z*y)/m);j=w.xOrigin=o[0]=q;v=w.yOrigin=o[1]=r}}if(u){if(s){w.xOffset=u.xOffset;
w.yOffset=u.yOffset;u=w}if(n||(n!==false&&cy.defaultSmoothOrigin!==false)){q=j-E;
r=v-t;u.xOffset+=(q*k[0]+r*k[2])-q;u.yOffset+=(q*k[1]+r*k[3])-r}else{u.xOffset=u.yOffset=0
}}if(!s){h.setAttribute("data-svg-origin",o.join(" "))}},bl=function(m){var k=cP("svg",this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,o=this.nextSibling,h=this.style.cssText,j;
bD.appendChild(k);k.appendChild(this);this.style.display="block";if(m){try{j=this.getBBox();
this._originalGetBBox=this.getBBox;this.getBBox=bl}catch(l){}}else{if(this._originalGetBBox){j=this._originalGetBBox()
}}if(o){n.insertBefore(this,o)}else{n.appendChild(this)}bD.removeChild(k);this.style.cssText=h;
return j},ck=function(j){try{return j.getBBox()}catch(h){return bl.call(j,true)
}},be=function(h){return !!(bU&&h.getCTM&&ck(h)&&(!h.parentNode||h.ownerSVGElement))
},bt=[1,0,0,1,0,0],b1=function(m,s){var k=m._gsTransform||new cO(),h=100000,q=m.style,n,j,r,t,o,l;
if(cm){j=bM(m,cE,null,true)}else{if(m.currentStyle){j=m.currentStyle.filter.match(bZ);
j=(j&&j.length===4)?[j[0].substr(4),Number(j[2].substr(4)),Number(j[1].substr(4)),j[3].substr(4),(k.x||0),(k.y||0)].join(","):""
}}n=(!j||j==="none"||j==="matrix(1, 0, 0, 1, 0, 0)");if(n&&cm&&((l=(ct(m).display==="none"))||!m.parentNode)){if(l){t=q.display;
q.display="block"}if(!m.parentNode){o=1;bD.appendChild(m)}j=bM(m,cE,null,true);
n=(!j||j==="none"||j==="matrix(1, 0, 0, 1, 0, 0)");if(t){q.display=t}else{if(l){cf(q,"display")
}}if(o){bD.removeChild(m)}}if(k.svg||(m.getCTM&&be(m))){if(n&&(q[cm]+"").indexOf("matrix")!==-1){j=q[cm];
n=0}r=m.getAttribute("transform");if(n&&r){if(r.indexOf("matrix")!==-1){j=r;n=0
}else{if(r.indexOf("translate")!==-1){j="matrix(1,0,0,1,"+r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",")+")";
n=0}}}}if(n){return bt}r=(j||"").match(cl)||[];ca=r.length;while(--ca>-1){t=Number(r[ca]);
r[ca]=(o=t-(t|=0))?((o*h+(o<0?-0.5:0.5))|0)/h+t:t}return(s&&r.length>6)?[r[0],r[1],r[4],r[5],r[12],r[13]]:r
},bp=bh.getTransform=function(A,O,z,P){if(A._gsTransform&&z&&!P){return A._gsTransform
}var h=z?A._gsTransform||new cO():new cO(),r=(h.scaleX<0),m=0.00002,x=100000,D=bo?parseFloat(bM(A,ci,O,false,"0 0 0").split(" ")[2])||h.zOrigin||0:0,L=parseFloat(cy.defaultTransformPerspective)||0,y,v,B,C,K,j;
h.svg=!!(A.getCTM&&be(A));if(h.svg){bi(A,bM(A,ci,O,false,"50% 50%")+"",h,A.getAttribute("data-svg-origin"));
bI=cy.useSVGTransformAttr||cj}y=b1(A);if(y!==bt){if(y.length===16){var U=y[0],q=y[1],H=y[2],R=y[3],W=y[4],s=y[5],I=y[6],S=y[7],X=y[8],t=y[9],M=y[10],Y=y[12],u=y[13],N=y[14],T=y[11],Q=Math.atan2(I,M),E,F,G,J,Z,V;
if(h.zOrigin){N=-h.zOrigin;Y=X*N-y[12];u=t*N-y[13];N=M*N+h.zOrigin-y[14]}h.rotationX=Q*cw;
if(Q){Z=Math.cos(-Q);V=Math.sin(-Q);E=W*Z+X*V;F=s*Z+t*V;G=I*Z+M*V;X=W*-V+X*Z;t=s*-V+t*Z;
M=I*-V+M*Z;T=S*-V+T*Z;W=E;s=F;I=G}Q=Math.atan2(-H,M);h.rotationY=Q*cw;if(Q){Z=Math.cos(-Q);
V=Math.sin(-Q);E=U*Z-X*V;F=q*Z-t*V;G=H*Z-M*V;t=q*V+t*Z;M=H*V+M*Z;T=R*V+T*Z;U=E;
q=F;H=G}Q=Math.atan2(q,U);h.rotation=Q*cw;if(Q){Z=Math.cos(-Q);V=Math.sin(-Q);U=U*Z+W*V;
F=q*Z+s*V;s=q*-V+s*Z;I=H*-V+I*Z;q=F}if(h.rotationX&&Math.abs(h.rotationX)+Math.abs(h.rotation)>359.9){h.rotationX=h.rotation=0;
h.rotationY=180-h.rotationY}h.scaleX=((Math.sqrt(U*U+q*q)*x+0.5)|0)/x;h.scaleY=((Math.sqrt(s*s+t*t)*x+0.5)|0)/x;
h.scaleZ=((Math.sqrt(I*I+M*M)*x+0.5)|0)/x;if(h.rotationX||h.rotationY){h.skewX=0
}else{h.skewX=(W||s)?Math.atan2(W,s)*cw+h.rotation:h.skewX||0;if(Math.abs(h.skewX)>90&&Math.abs(h.skewX)<270){if(r){h.scaleX*=-1;
h.skewX+=(h.rotation<=0)?180:-180;h.rotation+=(h.rotation<=0)?180:-180}else{h.scaleY*=-1;
h.skewX+=(h.skewX<=0)?180:-180}}}h.perspective=T?1/((T<0)?-T:T):0;h.x=Y;h.y=u;h.z=N;
if(h.svg){h.x-=h.xOrigin-(h.xOrigin*U-h.yOrigin*W);h.y-=h.yOrigin-(h.yOrigin*q-h.xOrigin*s)
}}else{if((!bo||P||!y.length||h.x!==y[4]||h.y!==y[5]||(!h.rotationX&&!h.rotationY))){var w=(y.length>=6),k=w?y[0]:1,l=y[1]||0,n=y[2]||0,o=w?y[3]:1;
h.x=y[4]||0;h.y=y[5]||0;B=Math.sqrt(k*k+l*l);C=Math.sqrt(o*o+n*n);K=(k||l)?Math.atan2(l,k)*cw:h.rotation||0;
j=(n||o)?Math.atan2(n,o)*cw+K:h.skewX||0;if(Math.abs(j)>90&&Math.abs(j)<270){if(r){B*=-1;
j+=(K<=0)?180:-180;K+=(K<=0)?180:-180}else{C*=-1;j+=(j<=0)?180:-180}}h.scaleX=B;
h.scaleY=C;h.rotation=K;h.skewX=j;if(bo){h.rotationX=h.rotationY=h.z=0;h.perspective=L;
h.scaleZ=1}if(h.svg){h.x-=h.xOrigin-(h.xOrigin*k+h.yOrigin*n);h.y-=h.yOrigin-(h.xOrigin*l+h.yOrigin*o)
}}}h.zOrigin=D;for(v in h){if(h[v]<m){if(h[v]>-m){h[v]=0}}}}if(z){A._gsTransform=h;
if(h.svg){if(bI&&A.style[cm]){p.delayedCall(0.001,function(){cf(A.style,cm)})}else{if(!bI&&A.getAttribute("transform")){p.delayedCall(0.001,function(){A.removeAttribute("transform")
})}}}}return h},cC=function(j){var H=this.data,y=-H.rotation*ch,u=y+H.skewX*ch,o=100000,x=((Math.cos(y)*H.scaleX*o)|0)/o,z=((Math.sin(y)*H.scaleX*o)|0)/o,A=((Math.sin(u)*-H.scaleY*o)|0)/o,C=((Math.cos(u)*H.scaleY*o)|0)/o,E=this.t.style,q=this.t.currentStyle,n,w;
if(!q){return}w=z;z=-A;A=-w;n=q.filter;E.filter="";var l=this.t.offsetWidth,F=this.t.offsetHeight,D=(q.position!=="absolute"),G="progid:DXImageTransform.Microsoft.Matrix(M11="+x+", M12="+z+", M21="+A+", M22="+C,s=H.x+(l*H.xPercent/100),t=H.y+(F*H.yPercent/100),k,m;
if(H.ox!=null){k=((H.oxp)?l*H.ox*0.01:H.ox)-l/2;m=((H.oyp)?F*H.oy*0.01:H.oy)-F/2;
s+=k-(k*x+m*z);t+=m-(k*A+m*C)}if(!D){G+=", sizingMethod='auto expand')"}else{k=(l/2);
m=(F/2);G+=", Dx="+(k-(k*x+m*z)+s)+", Dy="+(m-(k*A+m*C)+t)+")"}if(n.indexOf("DXImageTransform.Microsoft.Matrix(")!==-1){E.filter=n.replace(bA,G)
}else{E.filter=G+" "+n}if(j===0||j===1){if(x===1){if(z===0){if(A===0){if(C===1){if(!D||G.indexOf("Dx=0, Dy=0")!==-1){if(!cs.test(n)||parseFloat(RegExp.$1)===100){if(n.indexOf("gradient("&&n.indexOf("Alpha"))===-1){E.removeAttribute("filter")
}}}}}}}}if(!D){var r=(bs<8)?1:-1,h,v,B;k=H.ieOffsetX||0;m=H.ieOffsetY||0;H.ieOffsetX=Math.round((l-((x<0?-x:x)*l+(z<0?-z:z)*F))/2+s);
H.ieOffsetY=Math.round((F-((C<0?-C:C)*F+(A<0?-A:A)*l))/2+t);for(ca=0;ca<4;ca++){v=b5[ca];
h=q[v];w=(h.indexOf("px")!==-1)?parseFloat(h):bH(this.t,v,parseFloat(h),h.replace(bT,""))||0;
if(w!==H[v]){B=(ca<2)?-H.ieOffsetX:-H.ieOffsetY}else{B=(ca<2)?k-H.ieOffsetX:m-H.ieOffsetY
}E[v]=(H[v]=Math.round(w-B*((ca===0||ca===2)?1:r)))+"px"}}},cR=bh.set3DTransformRatio=bh.setTransformRatio=function(t){var s=this.data,r=this.t.style,G=s.rotation,I=s.rotationX,J=s.rotationY,T=s.scaleX,U=s.scaleY,V=s.scaleZ,u=s.x,v=s.y,w=s.z,H=s.svg,x=s.perspective,n=s.force3D,j=s.skewY,h=s.skewX,z,P,R,S,l,m,o,B,D,E,K,L,N,y,k,W,M,A,F,Q,O,C,q;
if(j){h+=j;G+=j}if(((((t===1||t===0)&&n==="auto"&&(this.tween._totalTime===this.tween._totalDuration||!this.tween._totalTime))||!n)&&!w&&!x&&!J&&!I&&V===1)||(bI&&H)||!bo){if(G||h||H){G*=ch;
C=h*ch;q=100000;P=Math.cos(G)*T;l=Math.sin(G)*T;R=Math.sin(G-C)*-U;m=Math.cos(G-C)*U;
if(C&&s.skewType==="simple"){z=Math.tan(C-j*ch);z=Math.sqrt(1+z*z);R*=z;m*=z;if(j){z=Math.tan(j*ch);
z=Math.sqrt(1+z*z);P*=z;l*=z}}if(H){u+=s.xOrigin-(s.xOrigin*P+s.yOrigin*R)+s.xOffset;
v+=s.yOrigin-(s.xOrigin*l+s.yOrigin*m)+s.yOffset;if(bI&&(s.xPercent||s.yPercent)){k=this.t.getBBox();
u+=s.xPercent*0.01*k.width;v+=s.yPercent*0.01*k.height}k=0.000001;if(u<k){if(u>-k){u=0
}}if(v<k){if(v>-k){v=0}}}F=(((P*q)|0)/q)+","+(((l*q)|0)/q)+","+(((R*q)|0)/q)+","+(((m*q)|0)/q)+","+u+","+v+")";
if(H&&bI){this.t.setAttribute("transform","matrix("+F)}else{r[cm]=((s.xPercent||s.yPercent)?"translate("+s.xPercent+"%,"+s.yPercent+"%) matrix(":"matrix(")+F
}}else{r[cm]=((s.xPercent||s.yPercent)?"translate("+s.xPercent+"%,"+s.yPercent+"%) matrix(":"matrix(")+T+",0,0,"+U+","+u+","+v+")"
}return}if(bz){k=0.0001;if(T<k&&T>-k){T=V=0.00002}if(U<k&&U>-k){U=V=0.00002}if(x&&!s.z&&!s.rotationX&&!s.rotationY){x=0
}}if(G||h){G*=ch;W=P=Math.cos(G);M=l=Math.sin(G);if(h){G-=h*ch;W=Math.cos(G);M=Math.sin(G);
if(s.skewType==="simple"){z=Math.tan((h-j)*ch);z=Math.sqrt(1+z*z);W*=z;M*=z;if(s.skewY){z=Math.tan(j*ch);
z=Math.sqrt(1+z*z);P*=z;l*=z}}}R=-M;m=W}else{if(!J&&!I&&V===1&&!x&&!H){r[cm]=((s.xPercent||s.yPercent)?"translate("+s.xPercent+"%,"+s.yPercent+"%) translate3d(":"translate3d(")+u+"px,"+v+"px,"+w+"px)"+((T!==1||U!==1)?" scale("+T+","+U+")":"");
return}else{P=m=1;R=l=0}}E=1;S=o=B=D=K=L=0;N=(x)?-1/x:0;y=s.zOrigin;k=0.000001;
Q=",";O="0";G=J*ch;if(G){W=Math.cos(G);M=Math.sin(G);B=-M;K=N*-M;S=P*M;o=l*M;E=W;
N*=W;P*=W;l*=W}G=I*ch;if(G){W=Math.cos(G);M=Math.sin(G);z=R*W+S*M;A=m*W+o*M;D=E*M;
L=N*M;S=R*-M+S*W;o=m*-M+o*W;E=E*W;N=N*W;R=z;m=A}if(V!==1){S*=V;o*=V;E*=V;N*=V}if(U!==1){R*=U;
m*=U;D*=U;L*=U}if(T!==1){P*=T;l*=T;B*=T;K*=T}if(y||H){if(y){u+=S*-y;v+=o*-y;w+=E*-y+y
}if(H){u+=s.xOrigin-(s.xOrigin*P+s.yOrigin*R)+s.xOffset;v+=s.yOrigin-(s.xOrigin*l+s.yOrigin*m)+s.yOffset
}if(u<k&&u>-k){u=O}if(v<k&&v>-k){v=O}if(w<k&&w>-k){w=0}}F=((s.xPercent||s.yPercent)?"translate("+s.xPercent+"%,"+s.yPercent+"%) matrix3d(":"matrix3d(");
F+=((P<k&&P>-k)?O:P)+Q+((l<k&&l>-k)?O:l)+Q+((B<k&&B>-k)?O:B);F+=Q+((K<k&&K>-k)?O:K)+Q+((R<k&&R>-k)?O:R)+Q+((m<k&&m>-k)?O:m);
if(I||J||V!==1){F+=Q+((D<k&&D>-k)?O:D)+Q+((L<k&&L>-k)?O:L)+Q+((S<k&&S>-k)?O:S);
F+=Q+((o<k&&o>-k)?O:o)+Q+((E<k&&E>-k)?O:E)+Q+((N<k&&N>-k)?O:N)+Q}else{F+=",0,0,0,0,1,0,"
}F+=u+Q+v+Q+w+Q+(x?(1+(-w/x)):1)+")";r[cm]=F};cg=cO.prototype;cg.x=cg.y=cg.z=cg.skewX=cg.skewY=cg.rotation=cg.rotationX=cg.rotationY=cg.zOrigin=cg.xPercent=cg.yPercent=cg.xOffset=cg.yOffset=0;
cg.scaleX=cg.scaleY=cg.scaleZ=1;bx("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",{parser:function(I,D,F,q,y,m,E){if(q._lastParsedTransform===E){return y
}q._lastParsedTransform=E;var J=(E.scale&&typeof(E.scale)==="function")?E.scale:0,w;
if(typeof(E[F])==="function"){w=E[F];E[F]=D}if(J){E.scale=J(cq,I)}var z=I._gsTransform,G=I.style,v=0.000001,H=bO.length,h=E,l={},s="transformOrigin",r=bp(I,bv,true,h.parseTransform),n=h.transform&&((typeof(h.transform)==="function")?h.transform(cq,cB):h.transform),t,x,o,C,A,j,k,u,B;
q._transform=r;if(n&&typeof(n)==="string"&&cm){x=bF.style;x[cm]=n;x.display="block";
x.position="absolute";cS.body.appendChild(bF);t=bp(bF,null,false);if(r.svg){j=r.xOrigin;
k=r.yOrigin;t.x-=r.xOffset;t.y-=r.yOffset;if(h.transformOrigin||h.svgOrigin){n={};
bi(I,cv(h.transformOrigin),n,h.svgOrigin,h.smoothOrigin,true);j=n.xOrigin;k=n.yOrigin;
t.x-=n.xOffset-r.xOffset;t.y-=n.yOffset-r.yOffset}if(j||k){u=b1(bF,true);t.x-=j-(j*u[0]+k*u[2]);
t.y-=k-(j*u[1]+k*u[3])}}cS.body.removeChild(bF);if(!t.perspective){t.perspective=r.perspective
}if(h.xPercent!=null){t.xPercent=bW(h.xPercent,r.xPercent)}if(h.yPercent!=null){t.yPercent=bW(h.yPercent,r.yPercent)
}}else{if(typeof(h)==="object"){t={scaleX:bW((h.scaleX!=null)?h.scaleX:h.scale,r.scaleX),scaleY:bW((h.scaleY!=null)?h.scaleY:h.scale,r.scaleY),scaleZ:bW(h.scaleZ,r.scaleZ),x:bW(h.x,r.x),y:bW(h.y,r.y),z:bW(h.z,r.z),xPercent:bW(h.xPercent,r.xPercent),yPercent:bW(h.yPercent,r.yPercent),perspective:bW(h.transformPerspective,r.perspective)};
A=h.directionalRotation;if(A!=null){if(typeof(A)==="object"){for(x in A){h[x]=A[x]
}}else{h.rotation=A}}if(typeof(h.x)==="string"&&h.x.indexOf("%")!==-1){t.x=0;t.xPercent=bW(h.x,r.xPercent)
}if(typeof(h.y)==="string"&&h.y.indexOf("%")!==-1){t.y=0;t.yPercent=bW(h.y,r.yPercent)
}t.rotation=cM(("rotation" in h)?h.rotation:("shortRotation" in h)?h.shortRotation+"_short":("rotationZ" in h)?h.rotationZ:r.rotation,r.rotation,"rotation",l);
if(bo){t.rotationX=cM(("rotationX" in h)?h.rotationX:("shortRotationX" in h)?h.shortRotationX+"_short":r.rotationX||0,r.rotationX,"rotationX",l);
t.rotationY=cM(("rotationY" in h)?h.rotationY:("shortRotationY" in h)?h.shortRotationY+"_short":r.rotationY||0,r.rotationY,"rotationY",l)
}t.skewX=cM(h.skewX,r.skewX);t.skewY=cM(h.skewY,r.skewY)}}if(bo&&h.force3D!=null){r.force3D=h.force3D;
C=true}r.skewType=h.skewType||r.skewType||cy.defaultSkewType;o=(r.force3D||r.z||r.rotationX||r.rotationY||t.z||t.rotationX||t.rotationY||t.perspective);
if(!o&&h.scale!=null){t.scaleZ=1}while(--H>-1){B=bO[H];n=t[B]-r[B];if(n>v||n<-v||h[B]!=null||bC[B]!=null){C=true;
y=new b2(r,B,r[B],n,y);if(B in l){y.e=l[B]}y.xs0=0;y.plugin=m;q._overwriteProps.push(y.n)
}}n=h.transformOrigin;if(r.svg&&(n||h.svgOrigin)){j=r.xOffset;k=r.yOffset;bi(I,cv(n),t,h.svgOrigin,h.smoothOrigin);
y=a0(r,"xOrigin",(z?r:t).xOrigin,t.xOrigin,y,s);y=a0(r,"yOrigin",(z?r:t).yOrigin,t.yOrigin,y,s);
if(j!==r.xOffset||k!==r.yOffset){y=a0(r,"xOffset",(z?j:r.xOffset),r.xOffset,y,s);
y=a0(r,"yOffset",(z?k:r.yOffset),r.yOffset,y,s)}n="0px 0px"}if(n||(bo&&o&&r.zOrigin)){if(cm){C=true;
B=ci;n=(n||bM(I,B,bv,false,"50% 50%"))+"";y=new b2(G,B,0,0,y,-1,s);y.b=G[B];y.plugin=m;
if(bo){x=r.zOrigin;n=n.split(" ");r.zOrigin=((n.length>2&&!(x!==0&&n[2]==="0px"))?parseFloat(n[2]):x)||0;
y.xs0=y.e=n[0]+" "+(n[1]||"50%")+" 0px";y=new b2(r,"zOrigin",0,0,y,-1,y.n);y.b=x;
y.xs0=y.e=r.zOrigin}else{y.xs0=y.e=n}}else{cv(n+"",r)}}if(C){q._transformType=(!(r.svg&&bI)&&(o||this._transformType===3))?3:2
}if(w){E[F]=w}if(J){E.scale=J}return y},prefix:true});bx("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:true,color:true,multi:true,keyword:"inset"});
bx("borderRadius",{defaultValue:"0px",parser:function(F,u,C,n,B,k){u=this.format(u);
var l=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],x=F.style,t,z,A,j,E,D,s,r,G,y,v,h,m,o,w,q;
G=parseFloat(F.offsetWidth);y=parseFloat(F.offsetHeight);t=u.split(" ");for(z=0;
z<l.length;z++){if(this.p.indexOf("border")){l[z]=bu(l[z])}E=j=bM(F,l[z],bv,false,"0px");
if(E.indexOf(" ")!==-1){j=E.split(" ");E=j[0];j=j[1]}D=A=t[z];s=parseFloat(E);h=E.substr((s+"").length);
m=(D.charAt(1)==="=");if(m){r=parseInt(D.charAt(0)+"1",10);D=D.substr(2);r*=parseFloat(D);
v=D.substr((r+"").length-(r<0?1:0))||""}else{r=parseFloat(D);v=D.substr((r+"").length)
}if(v===""){v=br[C]||h}if(v!==h){o=bH(F,"borderLeft",s,h);w=bH(F,"borderTop",s,h);
if(v==="%"){E=(o/G*100)+"%";j=(w/y*100)+"%"}else{if(v==="em"){q=bH(F,"borderLeft",1,"em");
E=(o/q)+"em";j=(w/q)+"em"}else{E=o+"px";j=w+"px"}}if(m){D=(parseFloat(E)+r)+v;A=(parseFloat(j)+r)+v
}}B=bj(x,l[z],E+" "+j,D+" "+A,false,"0px",B)}return B},prefix:true,formatter:cH("0px 0px 0px 0px",false,true)});
bx("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",{defaultValue:"0px",parser:function(k,j,l,h,m,n){return bj(k.style,l,this.format(bM(k,l,bv,false,"0px 0px")),this.format(j),false,"0px",m)
},prefix:true,formatter:cH("0px 0px",false,true)});bx("backgroundPosition",{defaultValue:"0 0",parser:function(w,m,s,r,v,o){var t="background-position",n=(bv||ct(w,null)),x=this.format(((n)?bs?n.getPropertyValue(t+"-x")+" "+n.getPropertyValue(t+"-y"):n.getPropertyValue(t):w.currentStyle.backgroundPositionX+" "+w.currentStyle.backgroundPositionY)||"0 0"),y=this.format(m),k,l,q,h,j,u;
if((x.indexOf("%")!==-1)!==(y.indexOf("%")!==-1)&&y.split(",").length<2){u=bM(w,"backgroundImage").replace(cc,"");
if(u&&u!=="none"){k=x.split(" ");l=y.split(" ");bQ.setAttribute("src",u);q=2;while(--q>-1){x=k[q];
h=(x.indexOf("%")!==-1);if(h!==(l[q].indexOf("%")!==-1)){j=(q===0)?w.offsetWidth-bQ.width:w.offsetHeight-bQ.height;
k[q]=h?(parseFloat(x)/100*j)+"px":(parseFloat(x)/j*100)+"%"}}x=k.join(" ")}}return this.parseComplex(w.style,x,y,v,o)
},formatter:cv});bx("backgroundSize",{defaultValue:"0 0",formatter:function(h){h+="";
return cv(h.indexOf(" ")===-1?h+" "+h:h)}});bx("perspective",{defaultValue:"0px",prefix:true});
bx("perspectiveOrigin",{defaultValue:"50% 50%",prefix:true});bx("transformStyle",{prefix:true});
bx("backfaceVisibility",{prefix:true});bx("userSelect",{prefix:true});bx("margin",{parser:cp("marginTop,marginRight,marginBottom,marginLeft")});
bx("padding",{parser:cp("paddingTop,paddingRight,paddingBottom,paddingLeft")});
bx("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(j,l,m,q,h,o){var k,n,r;
if(bs<9){n=j.currentStyle;r=bs<8?" ":",";k="rect("+n.clipTop+r+n.clipRight+r+n.clipBottom+r+n.clipLeft+")";
l=this.format(l).split(",").join(r)}else{k=this.format(bM(j,this.p,bv,false,this.dflt));
l=this.format(l)}return this.parseComplex(j.style,k,l,h,o)}});bx("textShadow",{defaultValue:"0px 0px 0px #999",color:true,multi:true});
bx("autoRound,strictUnits",{parser:function(j,k,l,h,m){return m}});bx("border",{defaultValue:"0px solid #000",parser:function(j,m,n,r,h,o){var l=bM(j,"borderTopWidth",bv,false,"0px"),q=this.format(m).split(" "),k=q[0].replace(bT,"");
if(k!=="px"){l=(parseFloat(l)/bH(j,"borderTopWidth",1,k))+k}return this.parseComplex(j.style,this.format(l+" "+bM(j,"borderTopStyle",bv,false,"solid")+" "+bM(j,"borderTopColor",bv,false,"#000")),q.join(" "),h,o)
},color:true,formatter:function(j){var h=j.split(" ");return h[0]+" "+(h[1]||"solid")+" "+(j.match(cD)||["#000"])[0]
}});bx("borderWidth",{parser:cp("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")});
bx("float,cssFloat,styleFloat",{parser:function(m,k,l,j,n,o){var q=m.style,h=("cssFloat" in q)?"cssFloat":"styleFloat";
return new b2(q,h,0,0,n,-1,l,false,0,q[h],k)}});var cb=function(h){var m=this.t,k=m.filter||bM(this.data,"filter")||"",j=(this.s+this.c*h)|0,l;
if(j===100){if(k.indexOf("atrix(")===-1&&k.indexOf("radient(")===-1&&k.indexOf("oader(")===-1){m.removeAttribute("filter");
l=(!bM(this.data,"filter"))}else{m.filter=k.replace(bX,"");l=true}}if(!l){if(this.xn1){m.filter=k=k||("alpha(opacity="+j+")")
}if(k.indexOf("pacity")===-1){if(j!==0||!this.xn1){m.filter=k+" alpha(opacity="+j+")"
}}else{m.filter=k.replace(cs,"opacity="+j)}}};bx("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(j,l,q,o,h,n){var k=parseFloat(bM(j,"opacity",bv,false,"1")),r=j.style,m=(q==="autoAlpha");
if(typeof(l)==="string"&&l.charAt(1)==="="){l=((l.charAt(0)==="-")?-1:1)*parseFloat(l.substr(2))+k
}if(m&&k===1&&bM(j,"visibility",bv)==="hidden"&&l!==0){k=0}if(ce){h=new b2(r,"opacity",k,l-k,h)
}else{h=new b2(r,"opacity",k*100,(l-k)*100,h);h.xn1=m?1:0;r.zoom=1;h.type=2;h.b="alpha(opacity="+h.s+")";
h.e="alpha(opacity="+(h.s+h.c)+")";h.data=j;h.plugin=n;h.setRatio=cb}if(m){h=new b2(r,"visibility",0,0,h,-1,null,false,0,((k!==0)?"inherit":"hidden"),((l===0)?"hidden":"inherit"));
h.xs0="inherit";o._overwriteProps.push(h.n);o._overwriteProps.push(q)}return h}});
var cf=function(h,j){if(j){if(h.removeProperty){if(j.substr(0,2)==="ms"||j.substr(0,6)==="webkit"){j="-"+j
}h.removeProperty(j.replace(b7,"-$1").toLowerCase())}else{h.removeAttribute(j)}}},b0=function(k){this.t._gsClassPT=this;
if(k===1||k===0){this.t.setAttribute("class",(k===0)?this.b:this.e);var h=this.data,j=this.t.style;
while(h){if(!h.v){cf(j,h.p)}else{j[h.p]=h.v}h=h._next}if(k===1&&this.t._gsClassPT===this){this.t._gsClassPT=null
}}else{if(this.t.getAttribute("class")!==this.e){this.t.setAttribute("class",this.e)
}}};bx("className",{parser:function(j,o,w,t,h,q,n){var l=j.getAttribute("class")||"",v=j.style.cssText,u,k,s,r,m;
h=t._classNamePT=new b2(j,w,0,0,h,2);h.setRatio=b0;h.pr=-11;cA=true;h.b=l;k=cz(j,bv);
s=j._gsClassPT;if(s){r={};m=s.data;while(m){r[m.p]=1;m=m._next}s.setRatio(1)}j._gsClassPT=h;
h.e=(o.charAt(1)!=="=")?o:l.replace(new RegExp("(?:\\s|^)"+o.substr(2)+"(?![\\w-])"),"")+((o.charAt(0)==="+")?" "+o.substr(2):"");
j.setAttribute("class",h.e);u=bd(j,k,cz(j),n,r);j.setAttribute("class",l);h.data=u.firstMPT;
j.style.cssText=v;h=h.xfirst=t.parse(j,u.difs,h,q);return h}});var bB=function(o){if(o===1||o===0){if(this.data._totalTime===this.data._totalDuration&&this.data.data!=="isFromStart"){var l=this.t.style,h=bq.transform.parse,q,j,m,k,n;
if(this.e==="all"){l.cssText="";k=true}else{q=this.e.split(" ").join("").split(",");
m=q.length;while(--m>-1){j=q[m];if(bq[j]){if(bq[j].parse===h){k=true}else{j=(j==="transformOrigin")?ci:bq[j].p
}}cf(l,j)}}if(k){cf(l,cm);n=this.t._gsTransform;if(n){if(n.svg){this.t.removeAttribute("data-svg-origin");
this.t.removeAttribute("transform")}delete this.t._gsTransform}}}}};bx("clearProps",{parser:function(j,k,l,h,m){m=new b2(j,l,0,0,m,2);
m.setRatio=bB;m.e=k;m.pr=-10;m.data=h._tween;cA=true;return m}});cg="bezier,throwProps,physicsProps,physics2D".split(",");
ca=cg.length;while(ca--){bk(cg[ca])}cg=cy.prototype;cg._firstPT=cg._lastParsedTransform=cg._transform=null;
cg._onInitTween=function(s,q,k,u){if(!s.nodeType){return false}this._target=cB=s;
this._tween=k;this._vars=q;cq=u;bK=q.autoRound;cA=false;br=q.suffixMap||cy.suffixMap;
bv=ct(s,"");cK=this._overwriteProps;var t=s.style,l,h,n,v,m,w,o,j,r;if(cx){if(t.zIndex===""){l=bM(s,"zIndex",bv);
if(l==="auto"||l===""){this._addLazySet(t,"zIndex",0)}}}if(typeof(q)==="string"){v=t.cssText;
l=cz(s,bv);t.cssText=v+";"+q;l=bd(s,l,cz(s)).difs;if(!ce&&bg.test(q)){l.opacity=parseFloat(RegExp.$1)
}q=l;t.cssText=v}if(q.className){this._firstPT=h=bq.className.parse(s,q.className,"className",this,null,null,q)
}else{this._firstPT=h=this.parse(s,q,null)}if(this._transformType){r=(this._transformType===3);
if(!cm){t.zoom=1}else{if(bG){cx=true;if(t.zIndex===""){o=bM(s,"zIndex",bv);if(o==="auto"||o===""){this._addLazySet(t,"zIndex",0)
}}if(bf){this._addLazySet(t,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(r?"visible":"hidden"))
}}}n=h;while(n&&n._next){n=n._next}j=new b2(s,"transform",0,0,null,2);this._linkCSSP(j,null,n);
j.setRatio=cm?cR:cC;j.data=this._transform||bp(s,bv,true);j.tween=k;j.pr=-1;cK.pop()
}if(cA){while(h){w=h._next;n=v;while(n&&n.pr>h.pr){n=n._next}if((h._prev=n?n._prev:m)){h._prev._next=h
}else{v=h}if((h._next=n)){n._prev=h}else{m=h}h=w}this._firstPT=v}return true};cg.parse=function(n,m,w,q){var v=n.style,u,s,t,r,j,k,l,x,o,h;
for(u in m){k=m[u];if(typeof(k)==="function"){k=k(cq,cB)}s=bq[u];if(s){w=s.parse(n,k,u,this,w,q,m)
}else{j=bM(n,u,bv)+"";o=(typeof(k)==="string");if(u==="color"||u==="fill"||u==="stroke"||u.indexOf("Color")!==-1||(o&&cd.test(k))){if(!o){k=cN(k);
k=((k.length>3)?"rgba(":"rgb(")+k.join(",")+")"}w=bj(v,u,j,k,true,"transparent",w,0,q)
}else{if(o&&b6.test(k)){w=bj(v,u,j,k,true,null,w,0,q)}else{t=parseFloat(j);l=(t||t===0)?j.substr((t+"").length):"";
if(j===""||j==="auto"){if(u==="width"||u==="height"){t=cr(n,u,bv);l="px"}else{if(u==="left"||u==="top"){t=bn(n,u,bv);
l="px"}else{t=(u!=="opacity")?0:1;l=""}}}h=(o&&k.charAt(1)==="=");if(h){r=parseInt(k.charAt(0)+"1",10);
k=k.substr(2);r*=parseFloat(k);x=k.replace(bT,"")}else{r=parseFloat(k);x=o?k.replace(bT,""):""
}if(x===""){x=(u in br)?br[u]:l}k=(r||r===0)?(h?r+t:r)+x:m[u];if(l!==x){if(x!==""){if(r||r===0){if(t){t=bH(n,u,t,l);
if(x==="%"){t/=bH(n,u,100,"%")/100;if(m.strictUnits!==true){j=t+"%"}}else{if(x==="em"||x==="rem"||x==="vw"||x==="vh"){t/=bH(n,u,1,x)
}else{if(x!=="px"){r=bH(n,u,r,x);x="px"}}}if(h){if(r||r===0){k=(r+t)+x}}}}}}if(h){r+=t
}if((t||t===0)&&(r||r===0)){w=new b2(v,u,t,r-t,w,0,u,(bK!==false&&(x==="px"||u==="zIndex")),0,j,k);
w.xs0=x}else{if(v[u]===undefined||!k&&(k+""==="NaN"||k==null)){bN("invalid "+u+" tween value: "+m[u])
}else{w=new b2(v,u,r||t||0,0,w,-1,u,false,0,j,k);w.xs0=(k==="none"&&(u==="display"||u.indexOf("Style")!==-1))?j:k
}}}}}if(q){if(w&&!w.plugin){w.plugin=q}}}return w};cg.setRatio=function(n){var k=this._firstPT,l=0.000001,h,j,m;
if(n===1&&(this._tween._time===this._tween._duration||this._tween._time===0)){while(k){if(k.type!==2){if(k.r&&k.type!==-1){h=Math.round(k.s+k.c);
if(!k.type){k.t[k.p]=h+k.xs0}else{if(k.type===1){m=k.l;j=k.xs0+h+k.xs1;for(m=1;
m<k.l;m++){j+=k["xn"+m]+k["xs"+(m+1)]}k.t[k.p]=j}}}else{k.t[k.p]=k.e}}else{k.setRatio(n)
}k=k._next}}else{if(n||!(this._tween._time===this._tween._duration||this._tween._time===0)||this._tween._rawPrevTime===-0.000001){while(k){h=k.c*n+k.s;
if(k.r){h=Math.round(h)}else{if(h<l){if(h>-l){h=0}}}if(!k.type){k.t[k.p]=h+k.xs0
}else{if(k.type===1){m=k.l;if(m===2){k.t[k.p]=k.xs0+h+k.xs1+k.xn1+k.xs2}else{if(m===3){k.t[k.p]=k.xs0+h+k.xs1+k.xn1+k.xs2+k.xn2+k.xs3
}else{if(m===4){k.t[k.p]=k.xs0+h+k.xs1+k.xn1+k.xs2+k.xn2+k.xs3+k.xn3+k.xs4}else{if(m===5){k.t[k.p]=k.xs0+h+k.xs1+k.xn1+k.xs2+k.xn2+k.xs3+k.xn3+k.xs4+k.xn4+k.xs5
}else{j=k.xs0+h+k.xs1;for(m=1;m<k.l;m++){j+=k["xn"+m]+k["xs"+(m+1)]}k.t[k.p]=j}}}}}else{if(k.type===-1){k.t[k.p]=k.xs0
}else{if(k.setRatio){k.setRatio(n)}}}}k=k._next}}else{while(k){if(k.type!==2){k.t[k.p]=k.b
}else{k.setRatio(n)}k=k._next}}}};cg._enableTransforms=function(h){this._transform=this._transform||bp(this._target,bv,true);
this._transformType=(!(this._transform.svg&&bI)&&(h||this._transformType===3))?3:2
};var b4=function(h){this.t[this.p]=this.e;this.data._linkCSSP(this,this._next,null,true)
};cg._addLazySet=function(l,j,h){var k=this._firstPT=new b2(l,j,0,0,this._firstPT,2);
k.e=h;k.setRatio=b4;k.data=this};cg._linkCSSP=function(j,l,k,h){if(j){if(l){l._prev=j
}if(j._next){j._next._prev=j._prev}if(j._prev){j._prev._next=j._next}else{if(this._firstPT===j){this._firstPT=j._next;
h=true}}if(k){k._next=j}else{if(!h&&this._firstPT===null){this._firstPT=j}}j._next=l;
j._prev=k}return j};cg._mod=function(j){var h=this._firstPT;while(h){if(typeof(j[h.p])==="function"&&j[h.p]===Math.round){h.r=1
}h=h._next}};cg._kill=function(k){var j=k,l,m,h;if(k.autoAlpha||k.alpha){j={};for(m in k){j[m]=k[m]
}j.opacity=1;if(j.autoAlpha){j.visibility=1}}if(k.className&&(l=this._classNamePT)){h=l.xfirst;
if(h&&h._prev){this._linkCSSP(h._prev,l._next,h._prev._prev)}else{if(h===this._firstPT){this._firstPT=l._next
}}if(l._next){this._linkCSSP(l._next,l._next._next,h._prev)}this._classNamePT=null
}l=this._firstPT;while(l){if(l.plugin&&l.plugin!==m&&l.plugin._kill){l.plugin._kill(k);
m=l.plugin}l=l._next}return bJ.prototype._kill.call(this,j)};var cL=function(j,k,o){var m,n,h,l;
if(j.slice){n=j.length;while(--n>-1){cL(j[n],k,o)}return}m=j.childNodes;n=m.length;
while(--n>-1){h=m[n];l=h.type;if(h.style){k.push(cz(h));if(o){o.push(h)}}if((l===1||l===9||l===11)&&h.childNodes.length){cL(h,k,o)
}}};cy.cascadeTo=function(o,t,m){var h=p.to(o,t,m),r=[h],l=[],n=[],q=[],j=p._internals.reservedProps,s,u,v,k;
o=h._targets||h.target;cL(o,l,q);h.render(t,true,true);cL(o,n);h.render(0,true,true);
h._enabled(true);s=q.length;while(--s>-1){u=bd(q[s],l[s],n[s]);if(u.firstMPT){u=u.difs;
for(v in m){if(j[v]){u[v]=m[v]}}k={};for(v in u){k[v]=l[s][v]}r.push(p.fromTo(q[s],t,k,u))
}}return r};bJ.activate([cy]);return cy},true);(function(){var k=b._gsDefine.plugin({propName:"roundProps",version:"1.6.0",priority:-1,API:2,init:function(h,i,m){this._tween=m;
return true}}),c=function(h){while(h){if(!h.f&&!h.blob){h.m=Math.round}h=h._next
}},j=k.prototype;j._onInitAllProps=function(){var i=this._tween,w=(i.vars.roundProps.join)?i.vars.roundProps:i.vars.roundProps.split(","),r=w.length,u={},s=i._propLookup.roundProps,t,v,h;
while(--r>-1){u[w[r]]=Math.round}r=w.length;while(--r>-1){t=w[r];v=i._firstPT;while(v){h=v._next;
if(v.pg){v.t._mod(u)}else{if(v.n===t){if(v.f===2&&v.t){c(v.t._firstPT)}else{this._add(v.t,t,v.s,v.c);
if(h){h._prev=v._prev}if(v._prev){v._prev._next=h}else{if(i._firstPT===v){i._firstPT=h
}}v._next=v._prev=null;i._propLookup[t]=s}}}v=h}}return false};j._add=function(i,n,o,h){this._addTween(i,n,o,o+h,n,Math.round);
this._overwriteProps.push(n)}}());(function(){b._gsDefine.plugin({propName:"attr",API:2,version:"0.6.0",init:function(c,n,o,p){var m,q;
if(typeof(c.setAttribute)!=="function"){return false}for(m in n){q=n[m];if(typeof(q)==="function"){q=q(p,c)
}this._addTween(c,"setAttribute",c.getAttribute(m)+"",q+"",m,false,m);this._overwriteProps.push(m)
}return true}})}());b._gsDefine.plugin({propName:"directionalRotation",version:"0.3.0",API:2,init:function(w,t,c,x){if(typeof(t)!=="object"){t={rotation:t}
}this.finals={};var C=(t.useRadians===true)?Math.PI*2:360,y=0.000001,A,p,B,z,u,v;
for(A in t){if(A!=="useRadians"){z=t[A];if(typeof(z)==="function"){z=z(x,w)}v=(z+"").split("_");
p=v[0];B=parseFloat((typeof(w[A])!=="function")?w[A]:w[((A.indexOf("set")||typeof(w["get"+A.substr(3)])!=="function")?A:"get"+A.substr(3))]());
z=this.finals[A]=(typeof(p)==="string"&&p.charAt(1)==="=")?B+parseInt(p.charAt(0)+"1",10)*Number(p.substr(2)):Number(p)||0;
u=z-B;if(v.length){p=v.join("_");if(p.indexOf("short")!==-1){u=u%C;if(u!==u%(C/2)){u=(u<0)?u+C:u-C
}}if(p.indexOf("_cw")!==-1&&u<0){u=((u+C*9999999999)%C)-((u/C)|0)*C}else{if(p.indexOf("ccw")!==-1&&u>0){u=((u-C*9999999999)%C)-((u/C)|0)*C
}}}if(u>y||u<-y){this._addTween(w,A,B,B+u,A);this._overwriteProps.push(A)}}}return true
},set:function(i){var c;if(i!==1){this._super.setRatio.call(this,i)}else{c=this._firstPT;
while(c){if(c.f){c.t[c.p](this.finals[c.p])}else{c.t[c.p]=this.finals[c.p]}c=c._next
}}}})._autoCSS=true;b._gsDefine("easing.Back",["easing.Ease"],function(L){var J=(b.GreenSockGlobals||b),C=J.com.greensock,G=Math.PI*2,M=Math.PI/2,c=C._class,H=function(k,i){var h=c("easing."+k,function(){},true),j=h.prototype=new L();
j.constructor=h;j.getRatio=i;return h},p=L.register||function(){},I=function(l,i,m,h,k){var j=c("easing."+l,{easeOut:new i(),easeIn:new m(),easeInOut:new h()},true);
p(j,l);return j},z=function(j,h,i){this.t=j;this.v=h;if(i){this.next=i;i.prev=this;
this.c=i.v-h;this.gap=i.t-j}},A=function(k,i){var h=c("easing."+k,function(l){this._p1=(l||l===0)?l:1.70158;
this._p2=this._p1*1.525},true),j=h.prototype=new L();j.constructor=h;j.getRatio=i;
j.config=function(l){return new h(l)};return h},K=I("Back",A("BackOut",function(h){return((h=h-1)*h*((this._p1+1)*h+this._p1)+1)
}),A("BackIn",function(h){return h*h*((this._p1+1)*h-this._p1)}),A("BackInOut",function(h){return((h*=2)<1)?0.5*h*h*((this._p2+1)*h-this._p2):0.5*((h-=2)*h*((this._p2+1)*h+this._p2)+2)
})),w=c("easing.SlowMo",function(i,h,j){h=(h||h===0)?h:0.7;if(i==null){i=0.7}else{if(i>1){i=1
}}this._p=(i!==1)?h:0;this._p1=(1-i)/2;this._p2=i;this._p3=this._p1+this._p2;this._calcEnd=(j===true)
},true),E=w.prototype=new L(),B,D,F;E.constructor=w;E.getRatio=function(i){var h=i+(0.5-i)*this._p;
if(i<this._p1){return this._calcEnd?1-((i=1-(i/this._p1))*i):h-((i=1-(i/this._p1))*i*i*i*h)
}else{if(i>this._p3){return this._calcEnd?1-(i=(i-this._p3)/this._p1)*i:h+((i-h)*(i=(i-this._p3)/this._p1)*i*i*i)
}}return this._calcEnd?1:h};w.ease=new w(0.7,0.7);E.config=w.config=function(i,h,j){return new w(i,h,j)
};B=c("easing.SteppedEase",function(h){h=h||1;this._p1=1/h;this._p2=h+1},true);
E=B.prototype=new L();E.constructor=B;E.getRatio=function(h){if(h<0){h=0}else{if(h>=1){h=0.999999999
}}return((this._p2*h)>>0)*this._p1};E.config=B.config=function(h){return new B(h)
};D=c("easing.RoughEase",function(v){v=v||{};var m=v.taper||"none",r=[],k=0,o=(v.points||20)|0,h=o,n=(v.randomize!==false),y=(v.clamp===true),q=(v.template instanceof L)?v.template:null,l=(typeof(v.strength)==="number")?v.strength*0.4:0.4,t,u,s,x,i,j;
while(--h>-1){t=n?Math.random():(1/o)*h;u=q?q.getRatio(t):t;if(m==="none"){s=l}else{if(m==="out"){x=1-t;
s=x*x*l}else{if(m==="in"){s=t*t*l}else{if(t<0.5){x=t*2;s=x*x*0.5*l}else{x=(1-t)*2;
s=x*x*0.5*l}}}}if(n){u+=(Math.random()*s)-(s*0.5)}else{if(h%2){u+=s*0.5}else{u-=s*0.5
}}if(y){if(u>1){u=1}else{if(u<0){u=0}}}r[k++]={x:t,y:u}}r.sort(function(P,Q){return P.x-Q.x
});j=new z(1,1,null);h=o;while(--h>-1){i=r[h];j=new z(i.x,i.y,j)}this._prev=new z(0,0,(j.t!==0)?j:j.next)
},true);E=D.prototype=new L();E.constructor=D;E.getRatio=function(i){var h=this._prev;
if(i>h.t){while(h.next&&i>=h.t){h=h.next}h=h.prev}else{while(h.prev&&i<=h.t){h=h.prev
}}this._prev=h;return(h.v+((i-h.t)/h.gap)*h.c)};E.config=function(h){return new D(h)
};D.ease=new D();I("Bounce",H("BounceOut",function(h){if(h<1/2.75){return 7.5625*h*h
}else{if(h<2/2.75){return 7.5625*(h-=1.5/2.75)*h+0.75}else{if(h<2.5/2.75){return 7.5625*(h-=2.25/2.75)*h+0.9375
}}}return 7.5625*(h-=2.625/2.75)*h+0.984375}),H("BounceIn",function(h){if((h=1-h)<1/2.75){return 1-(7.5625*h*h)
}else{if(h<2/2.75){return 1-(7.5625*(h-=1.5/2.75)*h+0.75)}else{if(h<2.5/2.75){return 1-(7.5625*(h-=2.25/2.75)*h+0.9375)
}}}return 1-(7.5625*(h-=2.625/2.75)*h+0.984375)}),H("BounceInOut",function(h){var i=(h<0.5);
if(i){h=1-(h*2)}else{h=(h*2)-1}if(h<1/2.75){h=7.5625*h*h}else{if(h<2/2.75){h=7.5625*(h-=1.5/2.75)*h+0.75
}else{if(h<2.5/2.75){h=7.5625*(h-=2.25/2.75)*h+0.9375}else{h=7.5625*(h-=2.625/2.75)*h+0.984375
}}}return i?(1-h)*0.5:h*0.5+0.5}));I("Circ",H("CircOut",function(h){return Math.sqrt(1-(h=h-1)*h)
}),H("CircIn",function(h){return -(Math.sqrt(1-(h*h))-1)}),H("CircInOut",function(h){return((h*=2)<1)?-0.5*(Math.sqrt(1-h*h)-1):0.5*(Math.sqrt(1-(h-=2)*h)+1)
}));F=function(j,k,i){var l=c("easing."+j,function(m,n){this._p1=(m>=1)?m:1;this._p2=(n||i)/(m<1?m:1);
this._p3=this._p2/G*(Math.asin(1/this._p1)||0);this._p2=G/this._p2},true),h=l.prototype=new L();
h.constructor=l;h.getRatio=k;h.config=function(m,n){return new l(m,n)};return l
};I("Elastic",F("ElasticOut",function(h){return this._p1*Math.pow(2,-10*h)*Math.sin((h-this._p3)*this._p2)+1
},0.3),F("ElasticIn",function(h){return -(this._p1*Math.pow(2,10*(h-=1))*Math.sin((h-this._p3)*this._p2))
},0.3),F("ElasticInOut",function(h){return((h*=2)<1)?-0.5*(this._p1*Math.pow(2,10*(h-=1))*Math.sin((h-this._p3)*this._p2)):this._p1*Math.pow(2,-10*(h-=1))*Math.sin((h-this._p3)*this._p2)*0.5+1
},0.45));I("Expo",H("ExpoOut",function(h){return 1-Math.pow(2,-10*h)}),H("ExpoIn",function(h){return Math.pow(2,10*(h-1))-0.001
}),H("ExpoInOut",function(h){return((h*=2)<1)?0.5*Math.pow(2,10*(h-1)):0.5*(2-Math.pow(2,-10*(h-1)))
}));I("Sine",H("SineOut",function(h){return Math.sin(h*M)}),H("SineIn",function(h){return -Math.cos(h*M)+1
}),H("SineInOut",function(h){return -0.5*(Math.cos(Math.PI*h)-1)}));c("easing.EaseLookup",{find:function(h){return L.map[h]
}},true);p(J.SlowMo,"SlowMo","ease,");p(D,"RoughEase","ease,");p(B,"SteppedEase","ease,");
return K},true)});if(b._gsDefine){b._gsQueue.pop()()}(function(c,a0){var a1={},a7=c.document,ay=c.GreenSockGlobals=c.GreenSockGlobals||c;
if(ay.TweenLite){return}var aK=function(j){var l=j.split("."),h=ay,k;for(k=0;k<l.length;
k++){h[l[k]]=h=h[l[k]]||{}}return h},a5=aK("com.greensock"),bb=1e-10,aU=function(j){var l=[],k=j.length,h;
for(h=0;h!==k;l.push(j[h++])){}return l},aA=function(){},aF=(function(){var h=Object.prototype.toString,j=h.call([]);
return function(k){return k!=null&&(k instanceof Array||(typeof(k)==="object"&&!!k.push&&h.call(k)===j))
}}()),aC,aO,aV,aM,aw,a8={},aE=function(m,j,k,l){this.sc=(a8[m])?a8[m].sc:[];a8[m]=this;
this.gsClass=null;this.func=k;var h=[];this.check=function(t){var v=j.length,n=v,u,o,r,q,s;
while(--v>-1){if((u=a8[j[v]]||new aE(j[v],[])).gsClass){h[v]=u.gsClass;n--}else{if(t){u.sc.push(this)
}}}if(n===0&&k){o=("com.greensock."+m).split(".");r=o.pop();q=aK(o.join("."))[r]=this.gsClass=k.apply(k,h);
if(l){ay[r]=a1[r]=q;s=(typeof(g)!=="undefined"&&g.exports);if(!s&&typeof(define)==="function"&&define.amd){define((c.GreenSockAMDPath?c.GreenSockAMDPath+"/":"")+m.split(".").pop(),[],function(){return q
})}else{if(s){if(m===a0){g.exports=a1[a0]=q;for(v in a1){q[v]=a1[v]}}else{if(a1[a0]){a1[a0][r]=q
}}}}}for(v=0;v<this.sc.length;v++){this.sc[v].check()}}};this.check(true)},be=c._gsDefine=function(h,j,k,l){return new aE(h,j,k,l)
},aZ=a5._class=function(h,j,k){j=j||function(){};be(h,[],function(){return j},k);
return j};be.globals=ay;var aD=[0,0,1,1],aT=[],aI=aZ("easing.Ease",function(k,j,l,h){this._func=k;
this._type=l||0;this._power=h||0;this._params=j?aD.concat(j):aD},true),az=aI.map={},a2=aI.register=function(t,h,m,o){var n=h.split(","),r=n.length,q=(m||"easeIn,easeOut,easeInOut").split(","),l,k,s,j;
while(--r>-1){k=n[r];l=o?aZ("easing."+k,null,true):a5.easing[k]||{};s=q.length;
while(--s>-1){j=q[s];az[k+"."+j]=az[j+k]=l[j]=t.getRatio?t:t[j]||new t()}}};aV=aI.prototype;
aV._calcEnd=false;aV.getRatio=function(j){if(this._func){this._params[0]=j;return this._func.apply(null,this._params)
}var h=this._type,l=this._power,k=(h===1)?1-j:(h===2)?j:(j<0.5)?j*2:(1-j)*2;if(l===1){k*=k
}else{if(l===2){k*=k*k}else{if(l===3){k*=k*k*k}else{if(l===4){k*=k*k*k*k}}}}return(h===1)?1-k:(h===2)?k:(j<0.5)?k/2:1-(k/2)
};aC=["Linear","Quad","Cubic","Quart","Quint,Strong"];aO=aC.length;while(--aO>-1){aV=aC[aO]+",Power"+aO;
a2(new aI(null,null,1,aO),aV,"easeOut",true);a2(new aI(null,null,2,aO),aV,"easeIn"+((aO===0)?",easeNone":""));
a2(new aI(null,null,3,aO),aV,"easeInOut")}az.linear=a5.easing.Linear.easeIn;az.swing=a5.easing.Quad.easeInOut;
var aQ=aZ("events.EventDispatcher",function(h){this._listeners={};this._eventTarget=h||this
});aV=aQ.prototype;aV.addEventListener=function(m,k,h,r,l){l=l||0;var n=this._listeners[m],o=0,j,q;
if(this===aM&&!aw){aM.wake()}if(n==null){this._listeners[m]=n=[]}q=n.length;while(--q>-1){j=n[q];
if(j.c===k&&j.s===h){n.splice(q,1)}else{if(o===0&&j.pr<l){o=q+1}}}n.splice(o,0,{c:k,s:h,up:r,pr:l})
};aV.removeEventListener=function(k,h){var j=this._listeners[k],l;if(j){l=j.length;
while(--l>-1){if(j[l].c===h){j.splice(l,1);return}}}};aV.dispatchEvent=function(k){var h=this._listeners[k],l,m,j;
if(h){l=h.length;if(l>1){h=h.slice(0)}m=this._eventTarget;while(--l>-1){j=h[l];
if(j){if(j.up){j.c.call(j.s||m,{type:k,target:m})}else{j.c.call(j.s||m)}}}}};var a6=c.requestAnimationFrame,a4=c.cancelAnimationFrame,i=Date.now||function(){return new Date().getTime()
},au=i();aC=["ms","moz","webkit","o"];aO=aC.length;while(--aO>-1&&!a6){a6=c[aC[aO]+"RequestAnimationFrame"];
a4=c[aC[aO]+"CancelAnimationFrame"]||c[aC[aO]+"CancelRequestAnimationFrame"]}aZ("Ticker",function(r,k){var j=this,t=i(),u=(k!==false&&a6)?"auto":false,q=500,l=33,m="tick",n,w,h,v,o,s=function(x){var z=i()-au,A,y;
if(z>q){t+=z-l}au+=z;j.time=(au-t)/1000;A=j.time-o;if(!n||A>0||x===true){j.frame++;
o+=A+(A>=v?0.004:v-A);y=true}if(x!==true){h=w(s)}if(y){j.dispatchEvent(m)}};aQ.call(j);
j.time=j.frame=0;j.tick=function(){s(true)};j.lagSmoothing=function(y,x){q=y||(1/bb);
l=Math.min(x,q,0)};j.sleep=function(){if(h==null){return}if(!u||!a4){clearTimeout(h)
}else{a4(h)}w=aA;h=null;if(j===aM){aw=false}};j.wake=function(x){if(h!==null){j.sleep()
}else{if(x){t+=-au+(au=i())}else{if(j.frame>10){au=i()-q+5}}}w=(n===0)?aA:(!u||!a6)?function(y){return setTimeout(y,((o-j.time)*1000+1)|0)
}:a6;if(j===aM){aw=true}s(2)};j.fps=function(x){if(!arguments.length){return n}n=x;
v=1/(n||60);o=this.time+v;j.wake()};j.useRAF=function(x){if(!arguments.length){return u
}j.sleep();u=x;j.fps(n)};j.fps(r);setTimeout(function(){if(u==="auto"&&j.frame<5&&a7.visibilityState!=="hidden"){j.useRAF(false)
}},1500)});aV=a5.Ticker.prototype=new a5.events.EventDispatcher();aV.constructor=a5.Ticker;
var aW=aZ("core.Animation",function(j,k){this.vars=k=k||{};this._duration=this._totalDuration=j||0;
this._delay=Number(k.delay)||0;this._timeScale=1;this._active=(k.immediateRender===true);
this.data=k.data;this._reversed=(k.reversed===true);if(!ax){return}if(!aw){aM.wake()
}var h=this.vars.useFrames?aY:ax;h.add(this,h._time);if(this.vars.paused){this.paused(true)
}});aM=aW.ticker=new a5.Ticker();aV=aW.prototype;aV._dirty=aV._gc=aV._initted=aV._paused=false;
aV._totalTime=aV._time=0;aV._rawPrevTime=-1;aV._next=aV._last=aV._onUpdate=aV._timeline=aV.timeline=null;
aV._paused=false;var at=function(){if(aw&&i()-au>2000){aM.wake()}setTimeout(at,2000)
};at();aV.play=function(j,h){if(j!=null){this.seek(j,h)}return this.reversed(false).paused(false)
};aV.pause=function(h,j){if(h!=null){this.seek(h,j)}return this.paused(true)};aV.resume=function(j,h){if(j!=null){this.seek(j,h)
}return this.paused(false)};aV.seek=function(j,h){return this.totalTime(Number(j),h!==false)
};aV.restart=function(j,h){return this.reversed(false).paused(false).totalTime(j?-this._delay:0,(h!==false),true)
};aV.reverse=function(j,h){if(j!=null){this.seek((j||this.totalDuration()),h)}return this.reversed(true).paused(false)
};aV.render=function(j,h,k){};aV.invalidate=function(){this._time=this._totalTime=0;
this._initted=this._gc=false;this._rawPrevTime=-1;if(this._gc||!this.timeline){this._enabled(true)
}return this};aV.isActive=function(){var k=this._timeline,j=this._startTime,h;return(!k||(!this._gc&&!this._paused&&k.isActive()&&(h=k.rawTime(true))>=j&&h<j+this.totalDuration()/this._timeScale))
};aV._enabled=function(j,h){if(!aw){aM.wake()}this._gc=!j;this._active=this.isActive();
if(h!==true){if(j&&!this.timeline){this._timeline.add(this,this._startTime-this._delay)
}else{if(!j&&this.timeline){this._timeline._remove(this,true)}}}return false};aV._kill=function(j,h){return this._enabled(false,false)
};aV.kill=function(j,h){this._kill(j,h);return this};aV._uncache=function(h){var j=h?this:this.timeline;
while(j){j._dirty=true;j=j.timeline}return this};aV._swapSelfInParams=function(j){var k=j.length,h=j.concat();
while(--k>-1){if(j[k]==="{self}"){h[k]=this}}return h};aV._callback=function(l){var n=this.vars,h=n[l],k=n[l+"Params"],m=n[l+"Scope"]||n.callbackScope||this,j=k?k.length:0;
switch(j){case 0:h.call(m);break;case 1:h.call(m,k[0]);break;case 2:h.call(m,k[0],k[1]);
break;default:h.apply(m,k)}};aV.eventCallback=function(l,j,k,m){if((l||"").substr(0,2)==="on"){var h=this.vars;
if(arguments.length===1){return h[l]}if(j==null){delete h[l]}else{h[l]=j;h[l+"Params"]=(aF(k)&&k.join("").indexOf("{self}")!==-1)?this._swapSelfInParams(k):k;
h[l+"Scope"]=m}if(l==="onUpdate"){this._onUpdate=j}}return this};aV.delay=function(h){if(!arguments.length){return this._delay
}if(this._timeline.smoothChildTiming){this.startTime(this._startTime+h-this._delay)
}this._delay=h;return this};aV.duration=function(h){if(!arguments.length){this._dirty=false;
return this._duration}this._duration=this._totalDuration=h;this._uncache(true);
if(this._timeline.smoothChildTiming){if(this._time>0){if(this._time<this._duration){if(h!==0){this.totalTime(this._totalTime*(h/this._duration),true)
}}}}return this};aV.totalDuration=function(h){this._dirty=false;return(!arguments.length)?this._totalDuration:this.duration(h)
};aV.time=function(j,h){if(!arguments.length){return this._time}if(this._dirty){this.totalDuration()
}return this.totalTime((j>this._duration)?this._duration:j,h)};aV.totalTime=function(k,l,m){if(!aw){aM.wake()
}if(!arguments.length){return this._totalTime}if(this._timeline){if(k<0&&!m){k+=this.totalDuration()
}if(this._timeline.smoothChildTiming){if(this._dirty){this.totalDuration()}var j=this._totalDuration,h=this._timeline;
if(k>j&&!m){k=j}this._startTime=(this._paused?this._pauseTime:h._time)-((!this._reversed?k:j-k)/this._timeScale);
if(!h._dirty){this._uncache(false)}if(h._timeline){while(h._timeline){if(h._timeline._time!==(h._startTime+h._totalTime)/h._timeScale){h.totalTime(h._totalTime,true)
}h=h._timeline}}}if(this._gc){this._enabled(true,false)}if(this._totalTime!==k||this._duration===0){if(aB.length){a3()
}this.render(k,l,false);if(aB.length){a3()}}}return this};aV.progress=aV.totalProgress=function(k,h){var j=this.duration();
return(!arguments.length)?(j?this._time/j:this.ratio):this.totalTime(j*k,h)};aV.startTime=function(h){if(!arguments.length){return this._startTime
}if(h!==this._startTime){this._startTime=h;if(this.timeline){if(this.timeline._sortChildren){this.timeline.add(this,h-this._delay)
}}}return this};aV.endTime=function(h){return this._startTime+((h!=false)?this.totalDuration():this.duration())/this._timeScale
};aV.timeScale=function(j){if(!arguments.length){return this._timeScale}j=j||bb;
if(this._timeline&&this._timeline.smoothChildTiming){var h=this._pauseTime,k=(h||h===0)?h:this._timeline.totalTime();
this._startTime=k-((k-this._startTime)*this._timeScale/j)}this._timeScale=j;return this._uncache(false)
};aV.reversed=function(h){if(!arguments.length){return this._reversed}if(h!=this._reversed){this._reversed=h;
this.totalTime(((this._timeline&&!this._timeline.smoothChildTiming)?this.totalDuration()-this._totalTime:this._totalTime),true)
}return this};aV.paused=function(j){if(!arguments.length){return this._paused}var l=this._timeline,k,h;
if(j!=this._paused){if(l){if(!aw&&!j){aM.wake()}k=l.rawTime();h=k-this._pauseTime;
if(!j&&l.smoothChildTiming){this._startTime+=h;this._uncache(false)}this._pauseTime=j?k:null;
this._paused=j;this._active=this.isActive();if(!j&&h!==0&&this._initted&&this.duration()){k=l.smoothChildTiming?this._totalTime:(k-this._startTime)/this._timeScale;
this.render(k,(k===this._totalTime),true)}}}if(this._gc&&!j){this._enabled(true,false)
}return this};var aJ=aZ("core.SimpleTimeline",function(h){aW.call(this,0,h);this.autoRemoveChildren=this.smoothChildTiming=true
});aV=aJ.prototype=new aW();aV.constructor=aJ;aV.kill()._gc=false;aV._first=aV._last=aV._recent=null;
aV._sortChildren=false;aV.add=aV.insert=function(h,k,j,l){var m,n;h._startTime=Number(k||0)+h._delay;
if(h._paused){if(this!==h._timeline){h._pauseTime=h._startTime+((this.rawTime()-h._startTime)/h._timeScale)
}}if(h.timeline){h.timeline._remove(h,true)}h.timeline=h._timeline=this;if(h._gc){h._enabled(true,true)
}m=this._last;if(this._sortChildren){n=h._startTime;while(m&&m._startTime>n){m=m._prev
}}if(m){h._next=m._next;m._next=h}else{h._next=this._first;this._first=h}if(h._next){h._next._prev=h
}else{this._last=h}h._prev=m;this._recent=h;if(this._timeline){this._uncache(true)
}return this};aV._remove=function(h,j){if(h.timeline===this){if(!j){h._enabled(false,true)
}if(h._prev){h._prev._next=h._next}else{if(this._first===h){this._first=h._next
}}if(h._next){h._next._prev=h._prev}else{if(this._last===h){this._last=h._prev}}h._next=h._prev=h.timeline=null;
if(h===this._recent){this._recent=this._last}if(this._timeline){this._uncache(true)
}}return this};aV.render=function(j,l,k){var h=this._first,m;this._totalTime=this._time=this._rawPrevTime=j;
while(h){m=h._next;if(h._active||(j>=h._startTime&&!h._paused)){if(!h._reversed){h.render((j-h._startTime)*h._timeScale,l,k)
}else{h.render(((!h._dirty)?h._totalDuration:h.totalDuration())-((j-h._startTime)*h._timeScale),l,k)
}}h=m}};aV.rawTime=function(){if(!aw){aM.wake()}return this._totalTime};var aG=aZ("TweenLite",function(h,j,k){aW.call(this,j,k);
this.render=aG.prototype.render;if(h==null){throw"Cannot tween a null target."}this.target=h=(typeof(h)!=="string")?h:aG.selector(h)||h;
var q=(h.jquery||(h.length&&h!==c&&h[0]&&(h[0]===c||(h[0].nodeType&&h[0].style&&!h.nodeType)))),n=this.vars.overwrite,l,m,o;
this._overwrite=n=(n==null)?aR[aG.defaultOverwrite]:(typeof(n)==="number")?n>>0:aR[n];
if((q||h instanceof Array||(h.push&&aF(h)))&&typeof(h[0])!=="number"){this._targets=o=aU(h);
this._propLookup=[];this._siblings=[];for(l=0;l<o.length;l++){m=o[l];if(!m){o.splice(l--,1);
continue}else{if(typeof(m)==="string"){m=o[l--]=aG.selector(m);if(typeof(m)==="string"){o.splice(l+1,1)
}continue}else{if(m.length&&m!==c&&m[0]&&(m[0]===c||(m[0].nodeType&&m[0].style&&!m.nodeType))){o.splice(l--,1);
this._targets=o=o.concat(aU(m));continue}}}this._siblings[l]=aq(m,this,false);if(n===1){if(this._siblings[l].length>1){ba(m,this,null,1,this._siblings[l])
}}}}else{this._propLookup={};this._siblings=aq(h,this,false);if(n===1){if(this._siblings.length>1){ba(h,this,null,1,this._siblings)
}}}if(this.vars.immediateRender||(j===0&&this._delay===0&&this.vars.immediateRender!==false)){this._time=-bb;
this.render(Math.min(0,-this._delay))}},true),aH=function(h){return(h&&h.length&&h!==c&&h[0]&&(h[0]===c||(h[0].nodeType&&h[0].style&&!h.nodeType)))
},a9=function(j,k){var h={},l;for(l in j){if(!ao[l]&&(!(l in k)||l==="transform"||l==="x"||l==="y"||l==="width"||l==="height"||l==="className"||l==="border")&&(!aN[l]||(aN[l]&&aN[l]._autoCSS))){h[l]=j[l];
delete j[l]}}j.css=h};aV=aG.prototype=new aW();aV.constructor=aG;aV.kill()._gc=false;
aV.ratio=0;aV._firstPT=aV._targets=aV._overwrittenProps=aV._startAt=null;aV._notifyPluginsOfEnabled=aV._lazy=false;
aG.version="1.19.1";aG.defaultEase=aV._ease=new aI(null,null,1,1);aG.defaultOverwrite="auto";
aG.ticker=aM;aG.autoSleep=120;aG.lagSmoothing=function(h,j){aM.lagSmoothing(h,j)
};aG.selector=c.$||c.jQuery||function(j){var h=c.$||c.jQuery;if(h){aG.selector=h;
return h(j)}return(typeof(a7)==="undefined")?j:(a7.querySelectorAll?a7.querySelectorAll(j):a7.getElementById((j.charAt(0)==="#")?j.substr(1):j))
};var aB=[],p={},an=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,bc=function(h){var k=this._firstPT,l=0.000001,j;
while(k){j=!k.blob?k.c*h+k.s:(h===1)?this.end:h?this.join(""):this.start;if(k.m){j=k.m(j,this._target||k.t)
}else{if(j<l){if(j>-l&&!k.blob){j=0}}}if(!k.f){k.t[k.p]=j}else{if(k.fp){k.t[k.p](k.fp,j)
}else{k.t[k.p](j)}}k=k._next}},bd=function(u,m,s,t){var x=[],l=0,r="",n=0,h,v,j,k,q,w,o;
x.start=u;x.end=m;u=x[0]=u+"";m=x[1]=m+"";if(s){s(x);u=x[0];m=x[1]}x.length=0;h=u.match(an)||[];
v=m.match(an)||[];if(t){t._next=null;t.blob=1;x._firstPT=x._applyPT=t}q=v.length;
for(k=0;k<q;k++){o=v[k];w=m.substr(l,m.indexOf(o,l)-l);r+=(w||!k)?w:",";l+=w.length;
if(n){n=(n+1)%5}else{if(w.substr(-5)==="rgba("){n=1}}if(o===h[k]||h.length<=k){r+=o
}else{if(r){x.push(r);r=""}j=parseFloat(h[k]);x.push(j);x._firstPT={_next:x._firstPT,t:x,p:x.length-1,s:j,c:((o.charAt(1)==="=")?parseInt(o.charAt(0)+"1",10)*parseFloat(o.substr(2)):(parseFloat(o)-j))||0,f:0,m:(n&&n<4)?Math.round:0}
}l+=o.length}r+=m.substr(l);if(r){x.push(r)}x.setRatio=bc;return x},aS=function(n,l,u,q,r,j,v,t,o){if(typeof(q)==="function"){q=q(o||0,n)
}var m=typeof(n[l]),k=(m!=="function")?"":((l.indexOf("set")||typeof(n["get"+l.substr(3)])!=="function")?l:"get"+l.substr(3)),w=(u!=="get")?u:!k?n[l]:v?n[k](v):n[k](),h=(typeof(q)==="string"&&q.charAt(1)==="="),x={t:n,p:l,s:w,f:(m==="function"),pg:0,n:r||l,m:(!j?0:(typeof(j)==="function")?j:Math.round),pr:0,c:h?parseInt(q.charAt(0)+"1",10)*parseFloat(q.substr(2)):(parseFloat(q)-w)||0},s;
if(typeof(w)!=="number"||(typeof(q)!=="number"&&!h)){if(v||isNaN(w)||(!h&&isNaN(q))||typeof(w)==="boolean"||typeof(q)==="boolean"){x.fp=v;
s=bd(w,(h?x.s+x.c:q),t||aG.defaultStringFilter,x);x={t:s,p:"setRatio",s:0,c:1,f:2,pg:0,n:r||l,pr:0,m:0}
}else{x.s=parseFloat(w);if(!h){x.c=(parseFloat(q)-x.s)||0}}}if(x.c){if((x._next=this._firstPT)){x._next._prev=x
}this._firstPT=x;return x}},ap=aG._internals={isArray:aF,isSelector:aH,lazyTweens:aB,blobDif:bd},aN=aG._plugins={},aP=ap.tweenLookup={},ar=0,ao=ap.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1,callbackScope:1,stringFilter:1,id:1},aR={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},aY=aW._rootFramesTimeline=new aJ(),ax=aW._rootTimeline=new aJ(),aL=30,a3=ap.lazyRender=function(){var h=aB.length,j;
p={};while(--h>-1){j=aB[h];if(j&&j._lazy!==false){j.render(j._lazy[0],j._lazy[1],true);
j._lazy=false}}aB.length=0};ax._startTime=aM.time;aY._startTime=aM.frame;ax._active=aY._active=true;
setTimeout(a3,1);aW._updateRoot=aG.render=function(){var j,k,h;if(aB.length){a3()
}ax.render((aM.time-ax._startTime)*ax._timeScale,false,false);aY.render((aM.frame-aY._startTime)*aY._timeScale,false,false);
if(aB.length){a3()}if(aM.frame>=aL){aL=aM.frame+(parseInt(aG.autoSleep,10)||120);
for(h in aP){k=aP[h].tweens;j=k.length;while(--j>-1){if(k[j]._gc){k.splice(j,1)
}}if(k.length===0){delete aP[h]}}h=ax._first;if(!h||h._paused){if(aG.autoSleep&&!aY._first&&aM._listeners.tick.length===1){while(h&&h._paused){h=h._next
}if(!h){aM.sleep()}}}}};aM.addEventListener("tick",aW._updateRoot);var aq=function(j,l,k){var h=j._gsTweenID,n,m;
if(!aP[h||(j._gsTweenID=h="t"+(ar++))]){aP[h]={target:j,tweens:[]}}if(l){n=aP[h].tweens;
n[(m=n.length)]=l;if(k){while(--m>-1){if(n[m]===l){n.splice(m,1)}}}}return aP[h].tweens
},av=function(j,h,l,m){var n=j.vars.onOverwrite,o,k;if(n){o=n(j,h,l,m)}n=aG.onOverwrite;
if(n){k=n(j,h,l,m)}return(o!==false&&k!==false)},ba=function(h,t,w,j,v){var m,o,n,s;
if(j===1||j>=4){s=v.length;for(m=0;m<s;m++){if((n=v[m])!==t){if(!n._gc){if(n._kill(null,h,t)){o=true
}}}else{if(j===5){break}}}return o}var u=t._startTime+bb,l=[],q=0,r=(t._duration===0),k;
m=v.length;while(--m>-1){if((n=v[m])===t||n._gc||n._paused){}else{if(n._timeline!==t._timeline){k=k||aX(t,0,r);
if(aX(n,k,r)===0){l[q++]=n}}else{if(n._startTime<=u){if(n._startTime+n.totalDuration()/n._timeScale>u){if(!((r||!n._initted)&&u-n._startTime<=2e-10)){l[q++]=n
}}}}}}m=q;while(--m>-1){n=l[m];if(j===2){if(n._kill(w,h,t)){o=true}}if(j!==2||(!n._firstPT&&n._initted)){if(j!==2&&!av(n,t)){continue
}if(n._enabled(false,false)){o=true}}}return o},aX=function(k,j,m){var n=k._timeline,h=n._timeScale,l=k._startTime;
while(n._timeline){l+=n._startTime;h*=n._timeScale;if(n._paused){return -100}n=n._timeline
}l/=h;return(l>j)?l-j:((m&&l===j)||(!k._initted&&l-j<2*bb))?bb:((l+=k.totalDuration()/k._timeScale/h)>j+bb)?0:l-j-bb
};aV._init=function(){var h=this.vars,k=this._overwrittenProps,s=this._duration,q=!!h.immediateRender,n=h.ease,l,m,t,r,j,o;
if(h.startAt){if(this._startAt){this._startAt.render(-1,true);this._startAt.kill()
}j={};for(r in h.startAt){j[r]=h.startAt[r]}j.overwrite=false;j.immediateRender=true;
j.lazy=(q&&h.lazy!==false);j.startAt=j.delay=null;this._startAt=aG.to(this.target,0,j);
if(q){if(this._time>0){this._startAt=null}else{if(s!==0){return}}}}else{if(h.runBackwards&&s!==0){if(this._startAt){this._startAt.render(-1,true);
this._startAt.kill();this._startAt=null}else{if(this._time!==0){q=false}t={};for(r in h){if(!ao[r]||r==="autoCSS"){t[r]=h[r]
}}t.overwrite=0;t.data="isFromStart";t.lazy=(q&&h.lazy!==false);t.immediateRender=q;
this._startAt=aG.to(this.target,0,t);if(!q){this._startAt._init();this._startAt._enabled(false);
if(this.vars.immediateRender){this._startAt=null}}else{if(this._time===0){return
}}}}}this._ease=n=(!n)?aG.defaultEase:(n instanceof aI)?n:(typeof(n)==="function")?new aI(n,h.easeParams):az[n]||aG.defaultEase;
if(h.easeParams instanceof Array&&n.config){this._ease=n.config.apply(n,h.easeParams)
}this._easeType=this._ease._type;this._easePower=this._ease._power;this._firstPT=null;
if(this._targets){o=this._targets.length;for(l=0;l<o;l++){if(this._initProps(this._targets[l],(this._propLookup[l]={}),this._siblings[l],(k?k[l]:null),l)){m=true
}}}else{m=this._initProps(this.target,this._propLookup,this._siblings,k,0)}if(m){aG._onPluginEvent("_onInitAllProps",this)
}if(k){if(!this._firstPT){if(typeof(this.target)!=="function"){this._enabled(false,false)
}}}if(h.runBackwards){t=this._firstPT;while(t){t.s+=t.c;t.c=-t.c;t=t._next}}this._onUpdate=h.onUpdate;
this._initted=true};aV._initProps=function(l,m,k,h,n){var s,q,r,o,t,j;if(l==null){return false
}if(p[l._gsTweenID]){a3()}if(!this.vars.css){if(l.style){if(l!==c&&l.nodeType){if(aN.css){if(this.vars.autoCSS!==false){a9(this.vars,l)
}}}}}for(s in this.vars){j=this.vars[s];if(ao[s]){if(j){if((j instanceof Array)||(j.push&&aF(j))){if(j.join("").indexOf("{self}")!==-1){this.vars[s]=j=this._swapSelfInParams(j,this)
}}}}else{if(aN[s]&&(o=new aN[s]())._onInitTween(l,this.vars[s],this,n)){this._firstPT=t={_next:this._firstPT,t:o,p:"setRatio",s:0,c:1,f:1,n:s,pg:1,pr:o._priority,m:0};
q=o._overwriteProps.length;while(--q>-1){m[o._overwriteProps[q]]=this._firstPT}if(o._priority||o._onInitAllProps){r=true
}if(o._onDisable||o._onEnable){this._notifyPluginsOfEnabled=true}if(t._next){t._next._prev=t
}}else{m[s]=aS.call(this,l,s,"get",j,s,0,null,this.vars.stringFilter,n)}}}if(h){if(this._kill(h,l)){return this._initProps(l,m,k,h,n)
}}if(this._overwrite>1){if(this._firstPT){if(k.length>1){if(ba(l,this,m,this._overwrite,k)){this._kill(m,l);
return this._initProps(l,m,k,h,n)}}}}if(this._firstPT){if((this.vars.lazy!==false&&this._duration)||(this.vars.lazy&&!this._duration)){p[l._gsTweenID]=true
}}return r};aV.render=function(t,j,u){var l=this._time,r=this._duration,h=this._rawPrevTime,m,k,v,q;
if(t>=r-1e-7&&t>=0){this._totalTime=this._time=r;this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1;
if(!this._reversed){m=true;k="onComplete";u=(u||this._timeline.autoRemoveChildren)
}if(r===0){if(this._initted||!this.vars.lazy||u){if(this._startTime===this._timeline._duration){t=0
}if(h<0||(t<=0&&t>=-1e-7)||(h===bb&&this.data!=="isPause")){if(h!==t){u=true;if(h>bb){k="onReverseComplete"
}}}this._rawPrevTime=q=(!j||t||h===t)?t:bb}}}else{if(t<1e-7){this._totalTime=this._time=0;
this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0;if(l!==0||(r===0&&h>0)){k="onReverseComplete";
m=this._reversed}if(t<0){this._active=false;if(r===0){if(this._initted||!this.vars.lazy||u){if(h>=0&&!(h===bb&&this.data==="isPause")){u=true
}this._rawPrevTime=q=(!j||t||h===t)?t:bb}}}if(!this._initted){u=true}}else{this._totalTime=this._time=t;
if(this._easeType){var s=t/r,n=this._easeType,o=this._easePower;if(n===1||(n===3&&s>=0.5)){s=1-s
}if(n===3){s*=2}if(o===1){s*=s}else{if(o===2){s*=s*s}else{if(o===3){s*=s*s*s}else{if(o===4){s*=s*s*s*s
}}}}if(n===1){this.ratio=1-s}else{if(n===2){this.ratio=s}else{if(t/r<0.5){this.ratio=s/2
}else{this.ratio=1-(s/2)}}}}else{this.ratio=this._ease.getRatio(t/r)}}}if(this._time===l&&!u){return
}else{if(!this._initted){this._init();if(!this._initted||this._gc){return}else{if(!u&&this._firstPT&&((this.vars.lazy!==false&&this._duration)||(this.vars.lazy&&!this._duration))){this._time=this._totalTime=l;
this._rawPrevTime=h;aB.push(this);this._lazy=[t,j];return}}if(this._time&&!m){this.ratio=this._ease.getRatio(this._time/r)
}else{if(m&&this._ease._calcEnd){this.ratio=this._ease.getRatio((this._time===0)?0:1)
}}}}if(this._lazy!==false){this._lazy=false}if(!this._active){if(!this._paused&&this._time!==l&&t>=0){this._active=true
}}if(l===0){if(this._startAt){if(t>=0){this._startAt.render(t,j,u)}else{if(!k){k="_dummyGS"
}}}if(this.vars.onStart){if(this._time!==0||r===0){if(!j){this._callback("onStart")
}}}}v=this._firstPT;while(v){if(v.f){v.t[v.p](v.c*this.ratio+v.s)}else{v.t[v.p]=v.c*this.ratio+v.s
}v=v._next}if(this._onUpdate){if(t<0){if(this._startAt&&t!==-0.0001){this._startAt.render(t,j,u)
}}if(!j){if(this._time!==l||m||u){this._callback("onUpdate")}}}if(k){if(!this._gc||u){if(t<0&&this._startAt&&!this._onUpdate&&t!==-0.0001){this._startAt.render(t,j,u)
}if(m){if(this._timeline.autoRemoveChildren){this._enabled(false,false)}this._active=false
}if(!j&&this.vars[k]){this._callback(k)}if(r===0&&this._rawPrevTime===bb&&q!==bb){this._rawPrevTime=0
}}}};aV._kill=function(j,k,v){if(j==="all"){j=null}if(j==null){if(k==null||k===this.target){this._lazy=false;
return this._enabled(false,false)}}k=(typeof(k)!=="string")?(k||this._targets||this.target):aG.selector(k)||k;
var n=(v&&this._time&&v._startTime===this._startTime&&this._timeline===v._timeline),q,u,t,s,l,r,h,o,m;
if((aF(k)||aH(k))&&typeof(k[0])!=="number"){q=k.length;while(--q>-1){if(this._kill(j,k[q],v)){r=true
}}}else{if(this._targets){q=this._targets.length;while(--q>-1){if(k===this._targets[q]){l=this._propLookup[q]||{};
this._overwrittenProps=this._overwrittenProps||[];u=this._overwrittenProps[q]=j?this._overwrittenProps[q]||{}:"all";
break}}}else{if(k!==this.target){return false}else{l=this._propLookup;u=this._overwrittenProps=j?this._overwrittenProps||{}:"all"
}}if(l){h=j||l;o=(j!==u&&u!=="all"&&j!==l&&(typeof(j)!=="object"||!j._tempKill));
if(v&&(aG.onOverwrite||this.vars.onOverwrite)){for(t in h){if(l[t]){if(!m){m=[]
}m.push(t)}}if((m||!j)&&!av(this,v,k,m)){return false}}for(t in h){if((s=l[t])){if(n){if(s.f){s.t[s.p](s.s)
}else{s.t[s.p]=s.s}r=true}if(s.pg&&s.t._kill(h)){r=true}if(!s.pg||s.t._overwriteProps.length===0){if(s._prev){s._prev._next=s._next
}else{if(s===this._firstPT){this._firstPT=s._next}}if(s._next){s._next._prev=s._prev
}s._next=s._prev=null}delete l[t]}if(o){u[t]=1}}if(!this._firstPT&&this._initted){this._enabled(false,false)
}}}return r};aV.invalidate=function(){if(this._notifyPluginsOfEnabled){aG._onPluginEvent("_onDisable",this)
}this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null;this._notifyPluginsOfEnabled=this._active=this._lazy=false;
this._propLookup=(this._targets)?{}:[];aW.prototype.invalidate.call(this);if(this.vars.immediateRender){this._time=-bb;
this.render(Math.min(0,-this._delay))}return this};aV._enabled=function(j,l){if(!aw){aM.wake()
}if(j&&this._gc){var k=this._targets,h;if(k){h=k.length;while(--h>-1){this._siblings[h]=aq(k[h],this,true)
}}else{this._siblings=aq(this.target,this,true)}}aW.prototype._enabled.call(this,j,l);
if(this._notifyPluginsOfEnabled){if(this._firstPT){return aG._onPluginEvent((j?"_onEnable":"_onDisable"),this)
}}return false};aG.to=function(j,k,h){return new aG(j,k,h)};aG.from=function(j,k,h){h.runBackwards=true;
h.immediateRender=(h.immediateRender!=false);return new aG(j,k,h)};aG.fromTo=function(k,l,j,h){h.startAt=j;
h.immediateRender=(h.immediateRender!=false&&j.immediateRender!=false);return new aG(k,l,h)
};aG.delayedCall=function(j,h,k,l,m){return new aG(h,0,{delay:j,onComplete:h,onCompleteParams:k,callbackScope:l,onReverseComplete:h,onReverseCompleteParams:k,immediateRender:false,lazy:false,useFrames:m,overwrite:0})
};aG.set=function(j,h){return new aG(j,0,h)};aG.getTweensOf=function(h,l){if(h==null){return[]
}h=(typeof(h)!=="string")?h:aG.selector(h)||h;var j,n,m,k;if((aF(h)||aH(h))&&typeof(h[0])!=="number"){j=h.length;
n=[];while(--j>-1){n=n.concat(aG.getTweensOf(h[j],l))}j=n.length;while(--j>-1){k=n[j];
m=j;while(--m>-1){if(k===n[m]){n.splice(j,1)}}}}else{n=aq(h).concat();j=n.length;
while(--j>-1){if(n[j]._gc||(l&&!n[j].isActive())){n.splice(j,1)}}}return n};aG.killTweensOf=aG.killDelayedCallsTo=function(h,l,j){if(typeof(l)==="object"){j=l;
l=false}var m=aG.getTweensOf(h,l),k=m.length;while(--k>-1){m[k]._kill(j,h)}};var bf=aZ("plugins.TweenPlugin",function(j,h){this._overwriteProps=(j||"").split(",");
this._propName=this._overwriteProps[0];this._priority=h||0;this._super=bf.prototype
},true);aV=bf.prototype;bf.version="1.19.0";bf.API=2;aV._firstPT=null;aV._addTween=aS;
aV.setRatio=bc;aV._kill=function(h){var l=this._overwriteProps,j=this._firstPT,k;
if(h[this._propName]!=null){this._overwriteProps=[]}else{k=l.length;while(--k>-1){if(h[l[k]]!=null){l.splice(k,1)
}}}while(j){if(h[j.n]!=null){if(j._next){j._next._prev=j._prev}if(j._prev){j._prev._next=j._next;
j._prev=null}else{if(this._firstPT===j){this._firstPT=j._next}}}j=j._next}return false
};aV._mod=aV._roundProps=function(k){var h=this._firstPT,j;while(h){j=k[this._propName]||(h.n!=null&&k[h.n.split(this._propName+"_").join("")]);
if(j&&typeof(j)==="function"){if(h.f===2){h.t._applyPT.m=j}else{h.m=j}}h=h._next
}};aG._onPluginEvent=function(o,m){var k=m._firstPT,h,l,j,n,q;if(o==="_onInitAllProps"){while(k){q=k._next;
l=j;while(l&&l.pr>k.pr){l=l._next}if((k._prev=l?l._prev:n)){k._prev._next=k}else{j=k
}if((k._next=l)){l._prev=k}else{n=k}k=q}k=m._firstPT=j}while(k){if(k.pg){if(typeof(k.t[o])==="function"){if(k.t[o]()){h=true
}}}k=k._next}return h};bf.activate=function(j){var h=j.length;while(--h>-1){if(j[h].API===bf.API){aN[(new j[h]())._propName]=j[h]
}}return true};be.plugin=function(m){if(!m||!m.propName||!m.init||!m.API){throw"illegal plugin definition."
}var l=m.propName,o=m.priority||0,h=m.overwriteProps,j={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_mod",mod:"_mod",initAll:"_onInitAllProps"},n=aZ("plugins."+l.charAt(0).toUpperCase()+l.substr(1)+"Plugin",function(){bf.call(this,l,o);
this._overwriteProps=h||[]},(m.global===true)),k=n.prototype=new bf(l),q;k.constructor=n;
n.API=m.API;for(q in j){if(typeof(m[q])==="function"){k[j[q]]=m[q]}}n.version=m.version;
bf.activate([n]);return n};aC=c._gsQueue;if(aC){for(aO=0;aO<aC.length;aO++){aC[aO]()
}for(aV in a8){if(!a8[aV].func){c.console.log("GSAP encountered missing dependency: "+aV)
}}}aw=false})((typeof(g)!=="undefined"&&g.exports&&typeof(a)!=="undefined")?a:this||window,"TweenMax")
}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{}],267:[function(l,k,m){var i=l("@marcom/ac-dom-metrics/getDimensions");var j=l("@marcom/ac-dom-styles/getStyle");
var n=l("@marcom/ac-viewport-emitter");function o(a,c){var b=a;this.options=c;this.htmlClass="float-columns-ready";
this.ready=false;this.blocks=[];this.bumped=[];this.vp=null;for(var d=0;d<b.length;
d++){this.blocks.push({el:b[d],innerContent:b[d].querySelector(".content-inner"),heights:{},rightFloats:{},bumpHeight:{}})
}this.redraw=this.redraw.bind(this);this.start=this.start.bind(this);this.vp=n.viewport
}k.exports=o;o.prototype.redraw=function(){for(var a=0;a<this.bumped.length;a++){this.bumped[a].innerContent.style.paddingBottom=""
}var b=n.viewport;if(b==="small"){this.render(b);return}if(typeof this.blocks[0].heights[b]==="undefined"){this.options.rafEmitter.once("update",this.calculate.bind(this,b))
}this.options.rafEmitter.once("draw",this.render.bind(this,b))};o.prototype.calculate=function(c){var q=0;
var g=0;var h=null;var d=null;var b=j(this.blocks[0].el,"margin-bottom","margin-top");
b=parseInt(b.marginTop,10)+parseInt(b.marginBottom,10);for(var f=0;f<this.blocks.length;
f++){if(typeof this.blocks[f].heights[c]==="undefined"&&typeof this.blocks[f].rightFloats[c]==="undefined"){this.blocks[f].heights[c]=i(this.blocks[f].el,true).height;
this.blocks[f].bumpHeight[c]=this.blocks[f].bumpHeight[c]||0;if(q>g||f<1){g=g+this.blocks[f].heights[c]+b;
this.blocks[f].rightFloats[c]=false;h=f}else{q=q+this.blocks[f].heights[c]+b;this.blocks[f].rightFloats[c]=true;
d=f}}}if(g!==q&&Math.abs(g-q)<this.options.matchThreshold){var a=g<q?h:d;this.blocks[a].bumpHeight[c]=Math.abs(g-q);
this.bumped.push(this.blocks[a])}};o.prototype.flush=function(c){var b=c||n.viewport;
for(var a=0;a<this.blocks.length;a++){this.blocks[a].heights[b]=undefined;this.blocks[a].rightFloats[b]=undefined;
this.blocks[a].bumpHeight[b]=undefined}};o.prototype.render=function(d){var b=d;
var f;if(b!=="small"){for(f=0;f<this.blocks.length;f++){var a=this.blocks[f].el;
var c=this.blocks[f].rightFloats[b]?"add":"remove";if(this.blocks[f].bumpHeight[b]>0){this.blocks[f].innerContent.style.paddingBottom=parseFloat(j(this.blocks[f].innerContent,"paddingBottom").paddingBottom)+this.blocks[f].bumpHeight[b]+"px"
}a.classList[c]("float-column-tile-right")}}document.documentElement.classList.add(this.htmlClass);
this.vp=b};o.prototype.start=function(){this.ready=true;this.redraw()}},{"@marcom/ac-dom-metrics/getDimensions":51,"@marcom/ac-dom-styles/getStyle":68,"@marcom/ac-viewport-emitter":227}],268:[function(t,u,q){var m=t("@marcom/ac-jetpack-lib/utils/Page");
var s=t("@marcom/ac-jetpack-lib/core/BaseComponent");var l=s.prototype;var r=t("./Floater");
var n={tileClass:"float-column-tile",matchThreshold:20};function p(f,c,b,g,a,d,h){s.call(this,f,c,b,g,a,d,h);
this.setupRAFEmitter();this.options=this.getOptions();this.options.rafEmitter=this._rafEmitter;
this.clearThrottle();this.init()}p.prototype=Object.create(s.prototype);var o=p.prototype;
o.init=function(){this.tiles=[].slice.call(this.element.querySelectorAll("."+this.options.tileClass));
this.tiles.forEach(function(a){a.classList.add(n.tileClass)});this.floater=new r(this.tiles,this.options);
this.refresh()};o.getOptions=function(){var a=JSON.parse(this.element.getAttribute("data-column-floater-options")||"{}");
return Object.assign({},n,a)};o.refresh=function(){if(!this.floater){return}this.floater.flush();
this.floater.redraw();this._rafEmitter.once("draw",function(){m.deepRefreshAllElementMetrics();
this.section.trigger("floater:redraw")}.bind(this));this._rafEmitter.run()};o.clearThrottle=function(){if(this.throttle!==null){clearTimeout(this.throttle);
this.throttle=null}};o.startThrottle=function(a){this.throttle=setTimeout(function(){this.clearThrottle();
a()}.bind(this),200)};o.onOrientationChange=function(){l.onOrientationChange.apply(this,arguments);
this.refresh()};o.onBreakpoint=function(){l.onBreakpoint.apply(this,arguments);
this.refresh()};o.onResizeDebounced=function(){l.onResizeDebounced.apply(this,arguments);
this.clearThrottle();this.startThrottle(function(){this.refresh()}.bind(this))};
u.exports=p},{"./Floater":267,"@marcom/ac-jetpack-lib/core/BaseComponent":155,"@marcom/ac-jetpack-lib/utils/Page":162}],269:[function(d,g,f){g.exports=function(a){return Math.pow(a,2)*0.0005
}},{}],270:[function(t,u,q){var s=t("@marcom/ac-jetpack-lib/core/BaseComponent");
var r=t("@marcom/ac-graph/Line");var m=t("@marcom/ac-function/debounce");var n=t("./amplify-y");
var l=s.prototype;function o(f,c,b,g,a,d,h){s.call(this,f,c,b,g,a,d,h);this.currentBreakpoint=g;
this.GRAPH_DEFAULTS={xAxis:{draw_on:"play",show_dots:"all",dot_size:0},markers:{draw_on:"play",direction:"vertical",vert_length:"to_points"}};
this.LINE_DEFAULTS={draw_on:"play",delay:1,duration:1,dot_size:10};this.init(1,1);
this.redraw=m(function(){if(this._hasPlayed===true){this.requestDOMChange()}else{this.init(1,1)
}},500);this.trackedElement=this.section.elementEngagement.addElement(this.element,{inViewThreshold:0.3});
this.trackedElement.once("engaged",this.play.bind(this))}o.prototype=Object.create(s.prototype);
var p=o.prototype;p._getOptions=function(f,c,h){var d=JSON.parse(f.dataset.lineGraph).graph;
var g=d.datasets;var b={};Object.keys(g).forEach(function(j){if(b[j]===undefined){b[j]=[]
}var i=g[j];Object.keys(i).forEach(function(k){var w=n(i[k]);b[j].push(w)})});var a=Object.assign({},this.GRAPH_DEFAULTS,{graphLines:[],el:f});
Object.keys(b).forEach(function(i){var j=Object.assign({},this.LINE_DEFAULTS);j.data=b[i];
j.duration=c||0;j.delay=h||0;a.graphLines.push(j)}.bind(this));return a};p.init=function(c,a){var b=this._getOptions(this.element,c,a);
if(this.graph){this.graph.destroy();this.graph=null}this.graph=new r(b);this.windowWidth=window.innerWidth;
return this};p.play=function(){this._hasPlayed=true;this.graph.play();return this
};p.onDOMRead=function(a){l.onDOMRead.call(this,arguments);this.init()};p.onDOMWrite=function(a){l.onDOMWrite.call(this,arguments);
this.play()};p.onBreakpoint=function(a){l.onBreakpoint.call(this,arguments);this.currentBreakpoint=a;
this.redraw()};p.onResizeDebounced=function(){l.onResizeDebounced.call(this,arguments);
if(["small","xsmall"].indexOf(this.currentBreakpoint)<0){return}if(window.innerWidth===this.windowWidth){return
}this.redraw()};p.onOrientationChange=function(){l.onOrientationChange.call(this,arguments);
this.redraw()};u.exports=o},{"./amplify-y":269,"@marcom/ac-function/debounce":128,"@marcom/ac-graph/Line":132,"@marcom/ac-jetpack-lib/core/BaseComponent":155}],271:[function(w,y,u){var C=w("@marcom/ac-useragent");
var v=w("@marcom/ac-jetpack-lib/core/BaseComponent");var B=w("@marcom/ac-modal").createFullViewportModal;
var z=w("@marcom/ac-element-tracker");var x=w("@marcom/ac-viewport-emitter");var p=w("@marcom/ac-progressive-image-loader/ProgressiveImageLoader");
var A=function A(a){var b=a.querySelector("[data-progressive-image-loaded]");if(b){b.classList.remove("progressive-image-animated");
b.removeAttribute("data-progressive-image-loaded");b.setAttribute("data-progressive-image","")
}new p({container:a}).load()};var r=function r(a){if(a.trackedElement.inView){A(a.image)
}};var s=function s(a){a.forEach(r)};function q(){v.apply(this,arguments);var a=[].slice.call(this.element.querySelectorAll(".modal-group"));
var b=[];this.section.once("floater:redraw",function(){a.forEach(function(g){var c=this._getContentEls(g);
var f=this._createModal(c);f.modalElement.classList.add(g.getAttribute("data-id"));
var h=z.addElement(c.button);h.on("enterview",function(i){A(c.image)});b.push({trackedElement:h,image:c.image});
if(C.browser.safari||C.browser.firefox){var d=document.documentElement;f.on("willopen",function(){d.style.height="auto";
d.style.position="static";d.style.overflowY="scroll"});f.on("open",function(){d.style.height=null;
d.style.position=null;d.style.overflowY=null})}c.button.addEventListener("click",function(){if(!f.opened){f.open()
}if(C.browser.safari&&C.os.ios){f._activeElement=c.button}})}.bind(this));z.start();
s(b);x.on("change",function(){s(b)})}.bind(this))}q.prototype=Object.create(v.prototype);
var t=q.prototype;t._getContentEls=function(b){var c=b.querySelector(".modal-button-text");
var a=b.querySelector(".modal-image");var d=b.querySelector(".modal-copy-container");
a.remove();d.remove();var f='[data-id="'+b.getAttribute("data-id")+'"]';var g=this.element.querySelector(".quote"+f).cloneNode(true);
if(!g){console.warn("Could not find modal quote for tile "+this.element.classList+" (using selector + "+f+")")
}return{button:c,image:a,copyContainer:d,quote:g}};t._createModal=function(b){var c=document.createElement("div");
c.classList.add("modal-profile-content");c.appendChild(b.image);c.appendChild(b.copyContainer);
b.copyContainer.querySelector(".column-quote").appendChild(b.quote);var a=B(c);
a.modalElement.classList.add("modal-profile");a.modalElement.setAttribute("aria-labelledby",b.button.getAttribute("id"));
return a};y.exports=q},{"@marcom/ac-element-tracker":115,"@marcom/ac-jetpack-lib/core/BaseComponent":155,"@marcom/ac-modal":175,"@marcom/ac-progressive-image-loader/ProgressiveImageLoader":199,"@marcom/ac-useragent":222,"@marcom/ac-viewport-emitter":227}],272:[function(l,k,m){var h=l("@marcom/ac-jetpack-lib/core/BaseComponent");
function i(){h.apply(this,arguments);this._onMainTabClick=this._onMainTabClick.bind(this);
this.section.on("mainTabClick",this._onMainTabClick)}i.prototype=Object.create(h.prototype);
var j=i.prototype;j._onMainTabClick=function(a){this.element.setAttribute("aria-labelledby","representation-maintab-"+a)
};k.exports=i},{"@marcom/ac-jetpack-lib/core/BaseComponent":155}],273:[function(o,n,q){var j=o("@marcom/ac-jetpack-lib/core/BaseComponent");
var l=o("@marcom/ac-gsap/TweenLite");var p=o("@marcom/ac-gsap").Power3;var k=function k(){j.apply(this,arguments);
this.bindEvents()};k.prototype=Object.create(j.prototype);var m=k.prototype;m.bindEvents=function(){this.trackedElement=this.section.elementEngagement.addElement(this.element,{inViewThreshold:0.2});
this._onElementEngaged=this._onElementEngaged.bind(this);this.trackedElement.once("engaged",this._onElementEngaged)
};m._onElementEngaged=function(){this._playGraph()};m._playGraph=function(){var f=this.element.querySelectorAll(".graph-dataset");
var g=0.25;var d=0;var s=0.05;var c;var i;var b;var h;var a;Array.prototype.forEach.call(f,function(r){c=r.querySelectorAll(".graph-badge");
i=d;Array.prototype.forEach.call(c,function(u){l.to(u,g,{opacity:1,delay:i+=s})
});b=r.querySelectorAll(".graph-bar");h=d;Array.prototype.forEach.call(b,function(u){l.set(u,{opacity:1});
l.from(u,g*2,{width:0,delay:h+=s,ease:p})});a=r.querySelector(".graph-caption");
if(a){l.to(a,g,{opacity:1,delay:h+=s})}d=h})};n.exports=k},{"@marcom/ac-gsap":140,"@marcom/ac-gsap/TweenLite":138,"@marcom/ac-jetpack-lib/core/BaseComponent":155}],274:[function(g,k,h){var i=[[8,17,25],[5,6,11],[5,10,15],[2,2,4],[0.4,0.6,1],[13,30,43]];
var j=[[6,15,21],[4,5,9],[5,8,13],[1,2,3],[0.4,0.6,1],[15,39,54]];k.exports=[i,j]
},{}],275:[function(w,y,t){var u=w("@marcom/ac-jetpack-lib/core/BaseComponent");
var v=w("@marcom/ac-graph/Donut");var x=w("@marcom/ac-viewport-emitter");var q=w("@marcom/ac-gsap/TweenLite");
var s=w("./data");var o=2;var p=function p(){u.apply(this,arguments);this._index=this.element.getAttribute("data-index");
this.data=s;this._getCurrentViewport();this.numbers=this.element.querySelectorAll(".number");
this.bindEvents();this.graph=this.createAnimation(0,{duration:o})};p.prototype=Object.create(u.prototype);
var n=u.prototype;var r=p.prototype;r.bindEvents=function(){this._onTabClick=this._onTabClick.bind(this);
this._playGraph=this._playGraph.bind(this);this._onElementEngaged=this._onElementEngaged.bind(this);
this.trackedElement=this.section.elementEngagement.addElement(this.element,{inViewThreshold:0.25,timeToEngage:0});
this.trackedElement.once("engaged",this._onElementEngaged);this.section.on("mainTabClick",this._onTabClick)
};r.createAnimation=function(f,d){var a={duration:0};d=d?Object.assign(a,d):a;var c=this.element.querySelector(".graph-image");
var b=new v({el:c,animations:{wedge_group_one:{delay:0,duration:d.duration,wedge_gap:0,draw_on:"play",ease:"easeInOutQuart"}},wedges:this._createWedgeOptions(f)});
return b};r._getCurrentViewport=function(){this.currentViewport=x.viewport};r._createWedgeOptions=function(f){var a={xlarge:6,large:6,medium:6,small:6};
var b={start_angle:0,percent:this.data[f][this._index][0]/100,animation_group:"wedge_group_one",thickness:a[this.currentViewport]};
var g=3/360;var c={start_angle:360*(b.percent+g),percent:this.data[f][this._index][1]/100,animation_group:"wedge_group_one",thickness:a[this.currentViewport]};
var d={start_angle:360*(b.percent+g+c.percent),percent:1-(b.percent+g+c.percent),animation_group:"wedge_group_one",thickness:a[this.currentViewport]};
return[b,c,d]};r._onElementEngaged=function(){this._hasEngaged=true;setTimeout(function(){this.element.classList.add("animate");
this._playGraph()}.bind(this),400*(this._index%2))};r._playGraph=function(){this.graph.play()
};r._onTabClick=function(a){this._updateWedges(a);this._animateNumber()};r._updateWedges=function(b){if(this._hasEngaged){var a=this._createWedgeOptions(b);
a.forEach(function(c){c.duration=0.25});this.graph.update(a)}else{this.graph.destroy();
this.graph=this.createAnimation(b,{duration:o})}};r._animateNumber=function(){var g=this.section.currentActiveIndex;
var a=[2,0,1];for(var c=0;c<this.numbers.length;c++){var d=this.numbers[c];var b=parseFloat(d.textContent);
var f=a[c];var h=this.data[g][this._index][f];this._tweenNumberValue(d.childNodes[0],b,h);
this._fixAriaLabelForVO(d.parentElement,h)}};r._tweenNumberValue=function(b,a,c){q.to({number:a},0.25,{number:c,onUpdateParams:[b],onUpdate:this._onDraw})
};r._onDraw=function(c){var b=this.vars.number!==Math.round(this.vars.number);var a=this.target.number.toFixed(b?1:0);
c.textContent=a};r._fixAriaLabelForVO=function(c,b){var a=c.getAttribute("aria-label");
var d=b+a.slice(a.indexOf("%"));c.setAttribute("aria-label",d)};r.onBreakpoint=function(b,a){n.onBreakpoint.apply(this,arguments);
this.currentViewport=b;if(this.currentViewport!==a){this.graph.destroy();this.graph=null;
this.graph=this.createAnimation(this.section.currentActiveIndex,{duration:this._hasEngaged?0:o});
if(this._hasEngaged){this._playGraph()}}};y.exports=p},{"./data":274,"@marcom/ac-graph/Donut":131,"@marcom/ac-gsap/TweenLite":138,"@marcom/ac-jetpack-lib/core/BaseComponent":155,"@marcom/ac-viewport-emitter":227}],276:[function(y,z,v){var w=y("@marcom/ac-jetpack-lib/core/BaseComponent");
var s=y("@marcom/ac-clip").Clip;var r=200;var q=30;var x="easeInOutExpo";var t=1.5;
var p=["small","xsmall"];function A(c,a,h,d,g,b,f){w.apply(this,arguments);this.section.on("floater:redraw",function(){if(!this._hasPlayed){this.calculateOffsetTop();
this.checkIfAnimationTriggered(g)}}.bind(this));this._onDraw=this._onDraw.bind(this);
this._onComplete=this._onComplete.bind(this);this._hasPlayed=false;this.currentBreakpoint=d;
this.calculateOffsetTop();this.clip=this._createClip();this.clip.progress(0);this.checkIfAnimationTriggered(g)
}A.prototype=Object.create(w.prototype);var u=A.prototype;var o=w.prototype;u._createClip=function(){this.animation={opacity:0,y:q};
var a=new s(this.animation,t,{opacity:1,y:0},{onDraw:this._onDraw,onComplete:this._onComplete,ease:x});
return a};u.play=function(){if(this._hasPlayed){return}this._hasPlayed=true;this.element.style.willChange="opacity, transform";
this.clip.play()};u._onDraw=function(){this.element.style.opacity=this.animation.opacity;
this.element.style.transform="translateY("+this.animation.y+"px)"};u._onComplete=function(){this.element.style.willChange=""
};u.onScroll=function(a,b){o.onScroll.apply(this,arguments);this.checkIfAnimationTriggered(b)
};u.onBreakpoint=function(a){o.onBreakpoint.apply(this,arguments);this.currentBreakpoint=a
};u.onResizeDebounced=function(a,b){o.onResizeDebounced.apply(this,arguments);this.checkIfAnimationTriggered(b)
};u.checkIfAnimationTriggered=function(a){if(this._hasPlayed){return}if(p.indexOf(this.currentBreakpoint)>-1){this.clip.progress(1);
this._hasPlayed=true;return}if(this.elementOffsetTop-a<window.innerHeight-r){this.play()
}};u.calculateOffsetTop=function(){if(this.element.classList.contains("content-info-representation")){this.elementOffsetTop=this.element.offsetTop+this.element.parentElement.offsetTop
}this.elementOffsetTop=this.element.offsetTop};z.exports=A},{"@marcom/ac-clip":19,"@marcom/ac-jetpack-lib/core/BaseComponent":155}],277:[function(s,t,q){var r=s("@marcom/ac-jetpack-lib/core/BaseComponent");
var p=s("./model/graphData");var n=["female","male"];var l=["asian","black","hispanic","multiracial","other","undeclared","white"];
var m=[2017,2016,2015];var u=function u(f,c,b,g,a,d,h){r.call(this,f,c,b,g,a,d,h);
this.graphBadge=this.element.querySelectorAll(".graph-badge");this.voText=this.element.querySelectorAll(".vo-text");
this.dataType=this.element.getAttribute("data-type");this.panelTitle=this.element.querySelector(".graph-title");
this.graph={globalGender:{component:this.section.getComponentOfType("Donutgraph"),caption:n},ethnicity:{component:this.section.getComponentOfType("Bargraph"),caption:l}};
this.tab=this.graph[this.dataType].component.tab;this._setAriaRole();this._setAriaLabelForBadges();
this._setAriaLabelForTabs();this._onTabClickUpdate=this._onTabClickUpdate.bind(this);
this._updateVOText=this._updateVOText.bind(this);this.section.on("tabClick",this._onTabClickUpdate);
this.section.on("mainTabClick",this._updateVOText)};u.prototype=Object.create(r.prototype);
var o=u.prototype;o._getActiveSubTab=function(){return this.graph[this.dataType].component.tab.currentActiveIndex
};o._createAriaLabelValue=function(c){var b=this._getActiveSubTab();var a=p[this.dataType][this.section.currentActiveIndex];
if(isNaN(a[b][c])){return}return a[b][c]+"% "+this.graph[this.dataType].caption[c]
};o._setAriaLabelForBadges=function(){for(var b=0;b<this.graphBadge.length;b++){var a=this._createAriaLabelValue(b);
if(a){this.graphBadge[b].setAttribute("aria-label",a)}}};o._setAriaLabelForTabs=function(){for(var b=0;
b<this.tab.children.length;b++){var a=this.panelTitle.textContent+" "+this.tab.children[b].textContent.replace("•","");
this.tab.children[b].setAttribute("aria-label",a)}};o._setAriaRole=function(){for(var a=0;
a<this.graphBadge.length;a++){this.graphBadge[a].setAttribute("role","text")}};
o._onTabClickUpdate=function(a){if(a===this.element){this._setAriaLabelForBadges()
}};o._updateVOText=function(a){for(var b=0;b<this.voText.length;b++){this.voText[b].textContent=m[a];
this._setAriaLabelForTabs()}};t.exports=u},{"./model/graphData":282,"@marcom/ac-jetpack-lib/core/BaseComponent":155}],278:[function(r,s,o){var p=r("@marcom/ac-jetpack-lib/core/BaseComponent");
var l=r("@marcom/ac-gsap/TweenLite");var n=r("./model/graphData");var q=r("./helpers/Tab");
var k=function k(g,d,c,h,b,f,a){p.call(this,g,d,c,h,b,f,a);this.currentWedge=[];
this.tab=new q(this.element.querySelector(".sub-tablist"));this.graphBars=this.element.querySelectorAll(".graph-bar");
this.graphUnit=this.element.querySelectorAll(".graph-unit");this.normalizeData();
this.bindEvents();this.lastMainTab=this.section.currentActiveIndex;this._updateAttributes()
};k.prototype=Object.create(p.prototype);var m=k.prototype;m.bindEvents=function(){this._onTabClick=this._onTabClick.bind(this);
this._updateSubTab=this._updateSubTab.bind(this);this._onTweenComplete=this._onTweenComplete.bind(this);
this._onDrawStyle=this._onDrawStyle.bind(this);this.tab.on("tabClick",this._onTabClick);
this.trackedElement=this.section.elementEngagement.addElement(this.element,{inViewThreshold:0.5,timeToEngage:500});
this.trackedElement.once("engaged",this.playGraph.bind(this));this.section.on("mainTabClick",this._updateSubTab)
};m.normalizeData=function(){var a=n.ethnicity;var c=[];for(var b=0;b<a.length;
b++){c=c.concat(a[b])}this.data=c};m.playGraph=function(){this.element.querySelector(".animate-graph").classList.add("animate")
};m._onTabClick=function(){this._animateBarGraph(this._dataPostion());this._animateNumber(this._dataPostion());
this.section.trigger("tabClick",this.element)};m._updateSubTab=function(a){this._fadeOutIn(false);
this.lastMainTab=a};m._updateAttributes=function(){this.element.setAttribute("data-show","data-set-"+this.lastMainTab)
};m._createTween=function(d,c,b,a){l.to({number:d},1,{number:c,onUpdateParams:["{self}",b],onUpdate:this._onDrawStyle,onCompleteParams:[b],onComplete:a})
};m._fadeOutIn=function(a){this._createTween(1,0,a,this._onTweenComplete)};m._onTweenComplete=function(a){if(this.lastMainTab===0||this.lastMainTab===1){this.graphUnit[5].style.display="none";
this._createTween(0,1,true)}else{this.graphUnit[5].style.display="table";this.graphUnit[5].style.opacity=0;
this._createTween(0,1,false)}this._updateAttributes();this._animateBarGraph(this._dataPostion());
this._animateNumber(this._dataPostion(),false);this.tab.updateActiveTab(0)};m._dataPostion=function(){return this.tab.currentActiveIndex+this.section.currentActiveIndex*this.tab.length
};m._animateBarGraph=function(a){for(var b=0;b<this.graphBars.length;b++){this.graphBars[b].style.width=this._NaNToNumber(this.data[a][b])+"%"
}};m._animateNumber=function(d,a){var b=this.element.querySelectorAll(".number");
for(var g=0;g<b.length;g++){var h=b[g];var f=Number(h.innerText);var c=this._NaNToNumber(this.data[d][g]);
if(a===false){h.innerText=c}else{this._tweenNumberValue(h,f,c)}}};m._tweenNumberValue=function(b,a,c){l.to({number:a},0.5,{number:c,onUpdateParams:[b],onUpdate:this._onDraw})
};m._animateBarGraphOpacity=function(b,c){var f=c?this.graphUnit.length-1:this.graphUnit.length;
var a=0;for(var d=0;d<f;d++){a=c&&d===f-1?f:d;this.graphUnit[a].style.opacity=b/(1/this.graphUnit.length)-d
}};m._onDraw=function(a){a.innerText=Math.round(this.target.number)};m._onDrawStyle=function(c,b){var a=c.target.number;
this._animateBarGraphOpacity(a,b)};m._NaNToNumber=function(a){if(isNaN(a)){return 0
}return a};s.exports=k},{"./helpers/Tab":281,"./model/graphData":282,"@marcom/ac-gsap/TweenLite":138,"@marcom/ac-jetpack-lib/core/BaseComponent":155}],279:[function(u,x,r){var s=u("@marcom/ac-jetpack-lib/core/BaseComponent");
var t=u("@marcom/ac-graph/Donut");var w=u("@marcom/ac-viewport-emitter");var o=u("@marcom/ac-gsap/TweenLite");
var q=u("./model/graphData");var v=u("./helpers/Tab");var y=function y(c,a,h,d,g,b,f){s.call(this,c,a,h,d,g,b,f);
this._getCurrentViewport();this.tab=new v(this.element.querySelector(".sub-tablist"));
this.numbers=this.element.querySelectorAll(".number");this.graphContainer=document.querySelector(".graph-global-gender .graph");
this.graphTarget=document.querySelector(".graph-global-gender .graph-image");this.graph=this.createAnimation(1);
this.bindEvents()};y.prototype=Object.create(s.prototype);var n=s.prototype;var p=y.prototype;
p.bindEvents=function(){this._onElementEngaged=this._onElementEngaged.bind(this);
this.trackedElement=this.section.elementEngagement.addElement(this.element,{inViewThreshold:0.25,timeToEngage:0});
this.trackedElement.once("engaged",this._onElementEngaged);this._onTabClickMain=this._onTabClickMain.bind(this);
this.section.on("mainTabClick",this._onTabClickMain);this._onTabClick=this._onTabClick.bind(this);
this.tab.on("tabClick",this._onTabClick);this._playGraph=this._playGraph.bind(this)
};p.createAnimation=function(a){this.data=q.globalGender;var b=new t({el:this.graphTarget,animations:{wedge_group_one:{delay:0,duration:a,wedge_gap:8,draw_on:"play",ease:"easeInOutQuart"}},wedges:this._createWedgeOptions()});
return b};p._getCurrentViewport=function(){this.currentViewport=w.viewport};p._createWedgeOptions=function(){var b=this.section.currentActiveIndex;
var c=this.tab.currentActiveIndex;var a={xlarge:8,large:8,medium:8,small:8};return[{start_angle:0,percent:this.data[b][c][1]/100,animation_group:"wedge_group_one",thickness:a[this.currentViewport]},{start_angle:360*this.data[b][c][1]/100,percent:this.data[b][c][0]/100,animation_group:"wedge_group_one",thickness:a[this.currentViewport]}]
};p._onElementEngaged=function(){this.element.classList.add("animate");this._playGraph()
};p._playGraph=function(){this._hasPlayed=true;this.graph.play()};p._onTabClickMain=function(){this.isTabClickMain=true;
o.to(this.graphContainer,0.5,{opacity:0,onComplete:function(){this.graph.destroy();
this.tab.updateActiveTab(0)}.bind(this)})};p._onTabClick=function(){if(this.isTabClickMain){this.isTabClickMain=false;
this.graph=this.createAnimation(1);this._animateNumber(this._dataPostion(),0);o.to(this.graphContainer,0.25,{opacity:1});
this._playGraph()}else{this._toggleWedges();this._animateNumber(this._dataPostion())
}this.section.trigger("tabClick",this.element)};p._toggleWedges=function(){var b=this.section.currentActiveIndex;
var c=this.tab.currentActiveIndex;var a=[{percent:this.data[b][c][1]/100,duration:0.25},{start_angle:360*this.data[b][c][1]/100,percent:this.data[b][c][0]/100,duration:0.25}];
this.graph.update(a)};p._dataPostion=function(){return this.tab.currentActiveIndex+this.section.currentActiveIndex*this.tab.length
};p._animateNumber=function(a,b){var g=this.section.currentActiveIndex;var h=this.tab.currentActiveIndex;
for(var d=0;d<this.numbers.length;d++){var f=this.numbers[d];var c=Number(f.innerText);
var i=this.data[g][h][d];this._tweenNumberValue(f,c,i,b)}};p._tweenNumberValue=function(c,a,d,b){b=typeof b==="number"&&b!==undefined?b:0.5;
o.to({number:a},b,{number:d,onUpdateParams:[c],onUpdate:this._onDraw})};p._onDraw=function(a){a.innerText=Math.round(this.target.number)
};p.onBreakpoint=function(b,a){n.onBreakpoint.apply(this,arguments);this.currentViewport=b;
if(this.currentViewport===a){return}this.graph.destroy();this.graph=this.createAnimation(this._hasPlayed?0:1);
if(this._hasPlayed){this._playGraph()}};x.exports=y},{"./helpers/Tab":281,"./model/graphData":282,"@marcom/ac-graph/Donut":131,"@marcom/ac-gsap/TweenLite":138,"@marcom/ac-jetpack-lib/core/BaseComponent":155,"@marcom/ac-viewport-emitter":227}],280:[function(n,m,o){var i=n("@marcom/ac-jetpack-lib/core/BaseComponent");
var j=n("./helpers/Tab");var k=function k(a,g,f,b,d,h,c){i.call(this,a,g,f,b,d,h,c);
this._onClick=this._onClick.bind(this);this.tab=new j(g);this.tab.on("tabClick",this._onClick);
this.section.currentActiveIndex=this.tab.currentActiveIndex};k.prototype=Object.create(i.prototype);
var l=k.prototype;l._onClick=function(a){this.section.currentActiveIndex=this.tab.currentActiveIndex;
this.element.setAttribute("data-show","data-set-"+this.tab.currentActiveIndex);
this.section.trigger("mainTabClick",a)};m.exports=k},{"./helpers/Tab":281,"@marcom/ac-jetpack-lib/core/BaseComponent":155}],281:[function(r,t,q){var m=r("@marcom/ac-dom-traversal/siblings");
var u=r("@marcom/ac-keyboard/Keyboard");var o=r("@marcom/ac-keyboard/keyMap");var l=r("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var n=l.prototype;var s=function s(a){l.call(this);this.current=a.querySelector(".current");
this.currentActiveIndex=this._getNodeIndex(this.current);this._onClick=this._onClick.bind(this);
this.children=a.querySelectorAll("li");this.length=this.children.length;this.tabPanel=m(a,'[role="tabpanel"]');
this._addAriaSelected();a.addEventListener("click",this._onClick);this._keyboardAccessibility(a)
};s.prototype=Object.create(n);var p=s.prototype;p._keyboardAccessibility=function(a){var b=new u(a);
this._onKeyDownArrowLeft=this._onKeyDownArrowLeft.bind(this);this._onKeyDownArrowRight=this._onKeyDownArrowRight.bind(this);
b.onDown(o.ARROW_LEFT,this._onKeyDownArrowLeft);b.onDown(o.ARROW_RIGHT,this._onKeyDownArrowRight);
b.onDown(o.ENTER,this._onClick);b.onDown(o.SPACEBAR,this._onClick)};p._onKeyDownArrowLeft=function(a){if(this.currentActiveIndex-->0){this.updateActiveTab(this.currentActiveIndex);
this.children[this.currentActiveIndex].focus()}else{this.currentActiveIndex=0}};
p._onKeyDownArrowRight=function(){if(++this.currentActiveIndex<this.length){this.updateActiveTab(this.currentActiveIndex);
this.children[this.currentActiveIndex].focus()}else{this.currentActiveIndex=this.length-1
}};p._onClick=function(a){a.preventDefault();if(a.target!==a.currentTarget){this.currentActiveIndex=this._getNodeIndex(a.target);
this.currentClass(a.target);this.trigger("tabClick",this.currentActiveIndex)}};
p.currentClass=function(b){this.current.classList.remove("current");b.classList.add("current");
this.current.setAttribute("aria-selected","false");b.setAttribute("aria-selected","true");
this.current=b;var a=b.getAttribute("id");this._updateTabPanelAria(a)};p.updateActiveTab=function(a){if(!this.children[a]){return
}this.currentActiveIndex=a;this.currentClass(this.children[a]);this.trigger("tabClick",this.currentActiveIndex)
};p._getNodeIndex=function(a){var b=0;while(a=a.previousSibling){if(a.nodeType===1){b++
}}return b};p._addAriaSelected=function(){for(var a=0;a<this.children.length;a++){if(this.children[a]===this.current){this.children[a].setAttribute("aria-selected","true")
}else{this.children[a].setAttribute("aria-selected","false")}}};p._updateTabPanelAria=function(a){if(this.tabPanel[0]){this.tabPanel[0].setAttribute("aria-labelledby",a)
}};t.exports=s},{"@marcom/ac-dom-traversal/siblings":79,"@marcom/ac-event-emitter-micro":118,"@marcom/ac-keyboard/Keyboard":164,"@marcom/ac-keyboard/keyMap":167}],282:[function(l,k,m){var h=[99.6,99.7];
var i=[[[32,68],[23,77],[39,61],[29,71],[32,68],[33,67]],[[32,68],[23,77],[38,62],[28,72],[31,69],[33,67]],[[31,69],[22,79],[37,63],[28,72],[30,71],[32,68]],[[30,70],[20,80],[35,65],[28,72],[28,72],[32,68]]];
var j=[[[21,9,13,3,1,"n/a",54],[31,7,8,2,1,"n/a",52],[12,11,17,3,1,"n/a",56],[23,3,7,1,0,"n/a",66],[7,13,18,3,1,"n/a",57],[5,5,11,2,1,"n/a",76]],[[19,9,12,2,1,"n/a",56],[27,8,8,2,1,"n/a",55],[12,11,16,3,1,"n/a",58],[21,3,7,1,0,"n/a",67],[7,12,17,3,1,"n/a",59],[5,5,10,2,1,"n/a",76]],[[18,8,11,2,1,6,54],[25,7,8,2,1,5,53],[11,10,14,3,1,6,56],[21,3,6,1,0,5,63],[7,11,15,3,1,7,56],[5,5,9,2,1,9,69]],[[15,7,11,2,1,9,55],[23,6,7,2,0,8,54],[9,9,14,3,0,9,56],[21,3,6,0,0,6,64],[6,10,13,3,1,8,59],[4,5,9,2,1,9,70]]];
k.exports={globalGender:i,ethnicity:j,payEquity:h}},{}],283:[function(B,J,t){var w=B("@marcom/ac-jetpack-lib/core/BasePage");
var K=B("@marcom/ac-jetpack-lib/model/ComponentMap");var E=B("@marcom/ac-jetpack-lib/utils/Page");
var G=B("./components/ColumnFloater");var F=B("./components/TileFadeInComponent");
var y=B("./components/ModalComponent");var x=B("./components/LineGraph");var C=B("./components/RepresentationDonutgraph");
var I=B("./components/RepresentationBargraph");var H=B("./components/RepresentationAccessibility");
var D=B("./components/graphs/Accessibility");var u=B("./components/graphs/Bargraph");
var A=B("./components/graphs/Donutgraph");var v=B("./components/graphs/MainTabNav");
var z=function(){return{initialize:function a(){Object.assign(K,{ColumnFloater:G,LineGraph:x,TileFadeInComponent:F,ModalComponent:y,Accessibility:D,Bargraph:u,Donutgraph:A,RepresentationAccessibility:H,RepresentationDonutgraph:C,RepresentationBargraph:I,MainTabNav:v});
E.onPageHeightSettled(function(){new w()});return this}}}();J.exports=z.initialize()
},{"./components/ColumnFloater":268,"./components/LineGraph":270,"./components/ModalComponent":271,"./components/RepresentationAccessibility":272,"./components/RepresentationBargraph":273,"./components/RepresentationDonutgraph":275,"./components/TileFadeInComponent":276,"./components/graphs/Accessibility":277,"./components/graphs/Bargraph":278,"./components/graphs/Donutgraph":279,"./components/graphs/MainTabNav":280,"@marcom/ac-jetpack-lib/core/BasePage":156,"@marcom/ac-jetpack-lib/model/ComponentMap":158,"@marcom/ac-jetpack-lib/utils/Page":162}]},{},[283]);