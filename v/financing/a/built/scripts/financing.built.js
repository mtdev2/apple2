(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var addEventListenerUtil = require('./utils/addEventListener');
var getEventType = require('./shared/getEventType');

/**
 * @name module:ac-dom-events.addEventListener
 *
 * @function
 *
 * @desc Register the specified listener on a target.
 *       Automatically handles vendor prefixed and camel-cased event types.
 *
 * @param {Object} target
 *        The event target to listen to.
 *        Usually an Element, document, or window.
 *
 * @param {String} type
 *        A lowercase string representing the event type.
 *        e.g., "click", "transitionend"
 *
 * @param {Function} listener
 *        A Function to be called when the event type is triggered.
 *
 * @param {Boolean} [useCapture=false]
 *        `true` listens for the event in the capture phase.
 *        `false` (default) listens for the event in the bubbling phases.
 *        IE < 9 does not support useCapture
 *
 * @returns {Object} target
 */
module.exports = function addEventListener(target, type, listener, useCapture) {
	type = getEventType(target, type);
	return addEventListenerUtil(target, type, listener, useCapture);
};

// ac-dom-events@1.4.1

},{"./shared/getEventType":7,"./utils/addEventListener":8}],2:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var eventTypeAvailable = require('./utils/eventTypeAvailable');
var camelCasedEventTypes = require('./shared/camelCasedEventTypes');
var windowFallbackEventTypes = require('./shared/windowFallbackEventTypes');
var prefixHelper = require('./shared/prefixHelper');
var cache = {};

/**
 * @name module:ac-prefixer.getEventType
 *
 * @function
 *
 * @desc Get an Event type with appropriate vendor prefix and casing.
 *
 * @param {String} type
 *        A lowercase string representing the Event type.
 *        e.g., "click", "transitionend"
 *
 * @param {String} [tagName="div"]
 *        The Element tag name to test, or "window", or "document"
 *        e.g., "div", "video", "input"
 *
 * @returns {String|Boolean} The properly prefixed Event type, or `false` if not available.
 */
module.exports = function getEventType(type, tagName) {
	var prefixedType;
	var tagNameCache;
	var i;

	tagName = tagName || 'div';

	type = type.toLowerCase();

	// prepare cache
	if (!(tagName in cache)) {
		cache[tagName] = {};
	}

	tagNameCache = cache[tagName];

	// memoized?
	if (type in tagNameCache) {
		return tagNameCache[type];
	}

	// unprefixed?
	if (eventTypeAvailable(type, tagName)) {
		return tagNameCache[type] = type;
	}

	// camelCased vendor prefix?
	if (type in camelCasedEventTypes) {
		for (i = 0; i < camelCasedEventTypes[type].length; i++) {
			prefixedType = camelCasedEventTypes[type][i];
			if (eventTypeAvailable(prefixedType.toLowerCase(), tagName)) {
				return tagNameCache[type] = prefixedType;
			}
		}
	}

	// lowercase vendor prefix?
	for (i = 0; i < prefixHelper.evt.length; i++) {
		prefixedType = prefixHelper.evt[i] + type;
		if (eventTypeAvailable(prefixedType, tagName)) {
			prefixHelper.reduce(i);
			return tagNameCache[type] = prefixedType;
		}
	}

	// fallback to window for certain events
	if (tagName !== 'window' && windowFallbackEventTypes.indexOf(type)) {
		return tagNameCache[type] = getEventType(type, 'window');
	}

	// invalid event type
	return tagNameCache[type] = false;
};

// ac-prefixer@3.1.0

},{"./shared/camelCasedEventTypes":3,"./shared/prefixHelper":4,"./shared/windowFallbackEventTypes":5,"./utils/eventTypeAvailable":6}],3:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
module.exports = {
	transitionend: [
		'webkitTransitionEnd',
		'MSTransitionEnd'
	],
	animationstart: [
		'webkitAnimationStart',
		'MSAnimationStart'
	],
	animationend: [
		'webkitAnimationEnd',
		'MSAnimationEnd'
	],
	animationiteration: [
		'webkitAnimationIteration',
		'MSAnimationIteration'
	],
	fullscreenchange: [
		'MSFullscreenChange'
	],
	fullscreenerror: [
		'MSFullscreenError'
	]
};

// ac-prefixer@3.1.0

},{}],4:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

var CSS_PREFIXES = ['-webkit-', '-moz-', '-ms-'];
var DOM_PREFIXES = ['Webkit', 'Moz', 'ms'];
var EVT_PREFIXES = ['webkit', 'moz', 'ms'];

var PrefixeHelper = function () {
	this.initialize();
};

var proto = PrefixeHelper.prototype;

proto.initialize = function () {
	this.reduced = false;
	this.css = CSS_PREFIXES;
	this.dom = DOM_PREFIXES;
	this.evt = EVT_PREFIXES;
};

proto.reduce = function (index) {
	if (!this.reduced) {
		this.reduced = true;
		this.css = [this.css[index]];
		this.dom = [this.dom[index]];
		this.evt = [this.evt[index]];
	}
};

module.exports = new PrefixeHelper();

// ac-prefixer@3.1.0

},{}],5:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
module.exports = [
	'transitionend',
	'animationstart',
	'animationend',
	'animationiteration',
];

// ac-prefixer@3.1.0

},{}],6:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var testElements = {
	'window': window,
	'document': document
};

/**
 * @name eventTypeAvailable
 * @memberOf module:ac-prefixer/utils
 *
 * @function
 *
 * @desc Check if an Event type is available.
 *
 * @param {String} type
 *        A DOM-style string representing the Event type.
 *        e.g., "click", "transitionend", "webkittransitionend"
 *
 * @param {String} tagName
 *        The Element tag name to test, or "window", or "document"
 *        e.g., "div", "video", "input"
 *
 * @returns {Boolean} `true` if the Event type is available, otherwise `false`
 */
module.exports = function eventTypeAvailable(type, tagName) {
	var el;

	type = 'on' + type;

	if (!(tagName in testElements)) {
		testElements[tagName] = document.createElement(tagName);
	}

	el = testElements[tagName];

	// easy check first
	if (type in el) {
		return true;
	}

	// more robust check
	if ('setAttribute' in el) {
		el.setAttribute(type, 'return;');
		return (typeof el[type] === 'function');
	}

	// not available by default
	return false;
};

// ac-prefixer@3.1.0

},{}],7:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getPrefixedEventType = require('@marcom/ac-prefixer/getEventType');

/**
 * @name getEventType
 * @memberOf module:ac-dom-events/shared
 *
 * @function
 * @private
 *
 * @desc Get an Event type with appropriate vendor prefix and casing.
 *
 * @param {Object} target
 *        The event target, usually an Element, document, or window.
 *
 * @param {String} type
 *        A lowercase string representing the Event type.
 *        e.g., "click", "transitionend"
 *
 * @returns {String|Boolean} The properly prefixed Event type
 */
module.exports = function getEventType(target, type) {
	var tagName;
	var prefixed;

	if ('tagName' in target) {
		tagName = target.tagName;
	} else if (target === window) {
		tagName = 'window';
	} else {
		tagName = 'document';
	}

	prefixed = getPrefixedEventType(type, tagName);

	if (prefixed) {
		return prefixed;
	}

	return type;
};

// ac-dom-events@1.4.1

},{"@marcom/ac-prefixer/getEventType":2}],8:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name addEventListener
 * @memberOf module:ac-dom-events/utils
 *
 * @function
 *
 * @desc Register the specified listener on a target.
 *       Automatically handles vendor prefixed and camel-cased event types.
 *
 * @param {Object} target
 *        The event target to listen to.
 *        Usually an Element, document, or window.
 *
 * @param {String} type
 *        A lowercase string representing the event type.
 *        e.g., "click", "transitionend"
 *
 * @param {Function} listener
 *        A Function to be called when the event type is triggered.
 *
 * @param {Boolean} [useCapture=false]
 *        `true` listens for the event in the capture phase.
 *        `false` (default) listens for the event in the bubbling phases.
 *        IE < 9 does not support useCapture
 *
 * @returns {Object} target
 */
module.exports = function addEventListener(target, type, listener, useCapture) {
	if (target.addEventListener) {
		target.addEventListener(type, listener, !!useCapture);
	} else {
		target.attachEvent('on' + type, listener);
	}

	return target;
};

// ac-dom-events@1.4.1

},{}],9:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getBoundingClientRect = require('./utils/getBoundingClientRect');

/**
 * @name module:ac-dom-metrics.getContentDimensions
 *
 * @function
 *
 * @desc Get the width and height of an Element's content.
 *
 * @param {Element} el
 *
 * @param {Boolean} [rendered=false]
 *        `false` for layout values (before transforms).
 *        `true` for rendered values (after transforms).
 *
 * @returns {Dimensions} The scrollWidth/Height of an Element.
 */
module.exports = function getContentDimensions(el, rendered) {
	var scale = 1;

	if (rendered) {
		scale = getBoundingClientRect(el).width / el.offsetWidth;
	}

	return {
		width: el.scrollWidth * scale,
		height: el.scrollHeight * scale
	};
};

// ac-dom-metrics@2.3.0

},{"./utils/getBoundingClientRect":20}],10:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getBoundingClientRect = require('./utils/getBoundingClientRect');

/**
 * @name module:ac-dom-metrics.getDimensions
 *
 * @function
 *
 * @desc Get the width and height of an Element.
 *
 * @param {Element} el
 *
 * @param {Boolean} [rendered=false]
 *        `false` for layout values (before transforms).
 *        `true` for rendered values (after transforms).
 *
 * @returns {Dimensions} The Element dimensions.
 */
module.exports = function getDimensions(el, rendered) {
	var rect;

	if (rendered) {
		rect = getBoundingClientRect(el);

		return {
			width: rect.width,
			height: rect.height
		};
	}

	return {
		width: el.offsetWidth,
		height: el.offsetHeight
	};
};

// ac-dom-metrics@2.3.0

},{"./utils/getBoundingClientRect":20}],11:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getDimensions = require('./getDimensions');
var getBoundingClientRect = require('./utils/getBoundingClientRect');
var getScrollX = require('./getScrollX');
var getScrollY = require('./getScrollY');

/**
 * @name module:ac-dom-metrics.getPagePosition
 *
 * @function
 *
 * @desc Get the position of an Element, relative to the page (0,0).
 *
 * @param {Element} el
 *
 * @param {Boolean} [rendered=false]
 *        `false` for layout values (before transforms).
 *        `true` for rendered values (after transforms).
 *
 * @returns {Position} The Element position.
 */
module.exports = function getPagePosition(el, rendered) {
	var rect;
	var scrollX;
	var scrollY;
	var dimensions;
	var parentPosition;

	if (rendered) {
		rect = getBoundingClientRect(el);
		scrollX = getScrollX();
		scrollY = getScrollY();

		return {
			top: rect.top + scrollY,
			right: rect.right + scrollX,
			bottom: rect.bottom + scrollY,
			left: rect.left + scrollX
		};
	}

	dimensions = getDimensions(el, rendered);

	rect = {
		top: el.offsetTop,
		left: el.offsetLeft,
		width: dimensions.width,
		height: dimensions.height
	};

	while (el = el.offsetParent) {
		rect.top += el.offsetTop;
		rect.left += el.offsetLeft;
	}

	return {
		top: rect.top,
		right: rect.left + rect.width,
		bottom: rect.top + rect.height,
		left: rect.left
	};
};

// ac-dom-metrics@2.3.0

},{"./getDimensions":10,"./getScrollX":15,"./getScrollY":16,"./utils/getBoundingClientRect":20}],12:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getDimensions = require('./getDimensions');
var getPixelsInViewport = require('./getPixelsInViewport');

/**
 * @name module:ac-dom-metrics.getPercentInViewport
 *
 * @function
 *
 * @desc Get the percentage of the Element height in the current viewport.
 *
 * @param {Element} el
 *
 * @param {Boolean} [rendered=false]
 *        `false` for layout values (before transforms).
 *        `true` for rendered values (after transforms).
 *
 * @returns {Number} Amount in the current viewport, as a percentage from 0-1.
 */
module.exports = function getPercentInViewport(el, rendered) {
	var inViewport = getPixelsInViewport(el, rendered);
	var height = getDimensions(el, rendered).height;

	return (inViewport / height);
};

// ac-dom-metrics@2.3.0

},{"./getDimensions":10,"./getPixelsInViewport":13}],13:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getViewportPosition = require('./getViewportPosition');

/**
 * @name module:ac-dom-metrics.getPixelsInViewport
 *
 * @function
 *
 * @desc Get the vertical pixels of the Element in the current viewport.
 *
 * @param {Element} el
 *
 * @param {Boolean} [rendered=false]
 *        `false` for layout values (before transforms).
 *        `true` for rendered values (after transforms).
 *
 * @returns {Number} Amount in the current viewport, in pixels without 'px' units.
 */
module.exports = function getPixelsInViewport(el, rendered) {
	var vh = document.documentElement.clientHeight;
	var position = getViewportPosition(el, rendered);
	var pixels;

	if (position.top >= vh || position.bottom <= 0) {
		return 0;
	}

	pixels = (position.bottom - position.top);

	if (position.top < 0) {
		pixels += position.top;
	}

	if (position.bottom > vh) {
		pixels -= position.bottom - vh;
	}

	return pixels;
};

// ac-dom-metrics@2.3.0

},{"./getViewportPosition":17}],14:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getDimensions = require('./getDimensions');
var getBoundingClientRect = require('./utils/getBoundingClientRect');

/**
 * @name module:ac-dom-metrics.getPosition
 *
 * @function
 *
 * @desc Get the layout position of an Element, relative to it's offset parent.
 *
 * @param {Element} el
 *
 * @param {Boolean} [rendered=false]
 *        `false` for layout values (before transforms).
 *        `true` for rendered values (after transforms).
 *
 * @returns {Position} The Element position.
 */
module.exports = function getPosition(el, rendered) {
	var rect;
	var parentRect;
	var dimensions;

	if (rendered) {
		rect = getBoundingClientRect(el);

		if (el.offsetParent) {
			// Fixed position Elements don't have an offsetParent in WebKit
			parentRect = getBoundingClientRect(el.offsetParent);
			rect.top -= parentRect.top;
			rect.left -= parentRect.left;
		}
	} else {
		dimensions = getDimensions(el, rendered);

		rect = {
			top: el.offsetTop,
			left: el.offsetLeft,
			width: dimensions.width,
			height: dimensions.height
		};
	}

	return {
		top: rect.top,
		right: rect.left + rect.width,
		bottom: rect.top + rect.height,
		left: rect.left
	};
};

// ac-dom-metrics@2.3.0

},{"./getDimensions":10,"./utils/getBoundingClientRect":20}],15:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-metrics.getScrollX
 *
 * @function
 *
 * @desc Get the scrollX of an Element or the Window
 *
 * @param {Element|Window} [el=window]
 *
 * @returns {Number} The scrollX value.
 */
module.exports = function getScrollX(el) {
	var offset;

	el = el || window;

	if (el === window) {
		offset = window.pageXOffset;

		if (!offset) {
			el = document.documentElement || document.body.parentNode || document.body;
		} else {
			return offset;
		}
	}

	return el.scrollLeft;
};

// ac-dom-metrics@2.3.0

},{}],16:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-metrics.getScrollY
 *
 * @function
 *
 * @desc Get the scrollY of an Element or the Window
 *
 * @param {Element|Window} [el=window]
 *
 * @returns {Number} The scrollY value.
 */
module.exports = function getScrollY(el) {
	var offset;

	el = el || window;

	if (el === window) {
		offset = window.pageYOffset;

		if (!offset) {
			el = document.documentElement || document.body.parentNode || document.body;
		} else {
			return offset;
		}
	}

	return el.scrollTop;
};

// ac-dom-metrics@2.3.0

},{}],17:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getPagePosition = require('./getPagePosition');
var getBoundingClientRect = require('./utils/getBoundingClientRect');
var getScrollX = require('./getScrollX');
var getScrollY = require('./getScrollY');

/**
 * @name module:ac-dom-metrics.getViewportPosition
 *
 * @function
 *
 * @desc Get the layout position of an Element, relative to the current viewport/scroll.
 *       Note: Fixed position Elements are only accounted for with rendered set to `true`
 *
 * @param {Element} el
 *
 * @param {Boolean} [rendered=false]
 *        `false` for layout values (before transforms).
 *        `true` for rendered values (after transforms).
 *
 * @returns {Position} The Element position.
 */
module.exports = function getViewportPosition(el, rendered) {
	var position;
	var scrollX;
	var scrollY;

	if (rendered) {
		position = getBoundingClientRect(el);

		return {
			top: position.top,
			right: position.right,
			bottom: position.bottom,
			left: position.left
		};
	}

	position = getPagePosition(el);
	scrollX = getScrollX();
	scrollY = getScrollY();

	return {
		top: position.top - scrollY,
		right: position.right - scrollX,
		bottom: position.bottom - scrollY,
		left: position.left - scrollX
	};
};

// ac-dom-metrics@2.3.0

},{"./getPagePosition":11,"./getScrollX":15,"./getScrollY":16,"./utils/getBoundingClientRect":20}],18:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @module ac-dom-metrics
 */
module.exports = {
	getContentDimensions: require('./getContentDimensions'),
	getDimensions: require('./getDimensions'),
	getPagePosition: require('./getPagePosition'),
	getPercentInViewport: require('./getPercentInViewport'),
	getPixelsInViewport: require('./getPixelsInViewport'),
	getPosition: require('./getPosition'),
	getScrollX: require('./getScrollX'),
	getScrollY: require('./getScrollY'),
	getViewportPosition: require('./getViewportPosition'),
	isInViewport: require('./isInViewport')
};

/**
 * @class
 * @name Dimensions
 * @desc Just for documentation purposes. Not an actual class.
 * @property {Number} width
 * @property {Number} height
 */

/**
 * @class
 * @name Position
 * @desc Just for documentation purposes. Not an actual class.
 * @property {Number} top
 * @property {Number} right
 * @property {Number} bottom
 * @property {Number} left
 */

// ac-dom-metrics@2.3.0

},{"./getContentDimensions":9,"./getDimensions":10,"./getPagePosition":11,"./getPercentInViewport":12,"./getPixelsInViewport":13,"./getPosition":14,"./getScrollX":15,"./getScrollY":16,"./getViewportPosition":17,"./isInViewport":19}],19:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getPixelsInViewport = require('./getPixelsInViewport');
var getPercentInViewport = require('./getPercentInViewport');

/**
 * @name module:ac-dom-metrics.isInViewport
 *
 * @function
 *
 * @desc Determine whether or not an Element is in the current viewport, past a specified threshold
 *
 * @param {Element} el
 *
 * @param {Boolean} [rendered=false]
 *        `false` for layout values (before transforms).
 *        `true` for rendered values (after transforms).
 *
 * @param {Number|String} [threshold=0]
 *        The minimum amount an Element must be in view.
 *        Accepts a percentage from 0-1, or a string with 'px' units (e.g., '50px').
 *        Defaults to any visibility above 0.
 *
 * @returns {Boolean} `true` if the Element is in view, `false` otherwise.
 */
module.exports = function isInViewport(el, rendered, threshold) {
	var inViewport;

	threshold = threshold || 0;

	if (typeof threshold === 'string' && threshold.slice(-2) === 'px') {
		threshold = parseInt(threshold, 10);
		inViewport = getPixelsInViewport(el, rendered);
	} else {
		inViewport = getPercentInViewport(el, rendered);
	}

	return (inViewport > 0 && inViewport >= threshold);
};

// ac-dom-metrics@2.3.0

},{"./getPercentInViewport":12,"./getPixelsInViewport":13}],20:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-metrics/utils.getBoundingClientRect
 *
 * @function
 *
 * @desc Normalized version of `Element.getBoundingClientRect()`
 *
 * @param {Element} el
 *
 * @returns {Object} Rendered Dimensions and Position of an Element
 */
module.exports = function getBoundingClientRect(el) {
	var rect = el.getBoundingClientRect();

	return {
		top: rect.top,
		right: rect.right,
		bottom: rect.bottom,
		left: rect.left,
		width: rect.width || rect.right - rect.left,
		height: rect.height || rect.bottom - rect.top
	};
};

// ac-dom-metrics@2.3.0

},{}],21:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.COMMENT_NODE
 *
 * @constant
 *
 * @desc nodeType value for Comment
 */
module.exports = 8;

// ac-dom-nodes@1.6.0

},{}],22:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.DOCUMENT_FRAGMENT_NODE
 *
 * @constant
 *
 * @desc nodeType value for DocumentFragment
 */
module.exports = 11;

// ac-dom-nodes@1.6.0

},{}],23:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.DOCUMENT_NODE
 *
 * @constant
 *
 * @desc nodeType value for Document
 */
module.exports = 9;

// ac-dom-nodes@1.6.0

},{}],24:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.ELEMENT_NODE
 *
 * @constant
 *
 * @desc nodeType value for Element
 */
module.exports = 1;

// ac-dom-nodes@1.6.0

},{}],25:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.TEXT_NODE
 *
 * @constant
 *
 * @desc nodeType value for TextNode
 */
module.exports = 3;

// ac-dom-nodes@1.6.0

},{}],26:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isNode = require('../isNode');

module.exports = function isNodeType(node, nodeType) {
	if (!isNode(node)) {
		return false;
	}

	if (typeof nodeType === 'number') {
		return (node.nodeType === nodeType);
	}

	return (nodeType.indexOf(node.nodeType) !== -1);
};

// ac-dom-nodes@1.6.0

},{"../isNode":30}],27:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isNodeType = require('./isNodeType');
var COMMENT_NODE = require('../COMMENT_NODE');
var DOCUMENT_FRAGMENT_NODE = require('../DOCUMENT_FRAGMENT_NODE');
var ELEMENT_NODE = require('../ELEMENT_NODE');
var TEXT_NODE = require('../TEXT_NODE');

/** @ignore */
var VALID_INSERT_NODE = [
	ELEMENT_NODE,
	TEXT_NODE,
	COMMENT_NODE,
	DOCUMENT_FRAGMENT_NODE
];

/** @ignore */
var ERR_INVALID_INSERT_NODE = ' must be an Element, TextNode, Comment, or Document Fragment';

/** @ignore */
var VALID_CHILD_NODE = [
	ELEMENT_NODE,
	TEXT_NODE,
	COMMENT_NODE
];

/** @ignore */
var ERR_INVALID_CHILD_NODE = ' must be an Element, TextNode, or Comment';

/** @ignore */
var VALID_PARENT_NODE = [
	ELEMENT_NODE,
	DOCUMENT_FRAGMENT_NODE
];

/** @ignore */
var ERR_INVALID_PARENT_NODE = ' must be an Element, or Document Fragment';

/** @ignore */
var ERR_NO_PARENT_NODE = ' must have a parentNode';

module.exports = {

	/** @ignore */
	parentNode: function (node, required, funcName, paramName) {
		paramName = paramName || 'target';

		if ((node || required) && !isNodeType(node, VALID_PARENT_NODE)) {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_PARENT_NODE);
		}
	},

	/** @ignore */
	childNode: function (node, required, funcName, paramName) {
		paramName = paramName || 'target';

		if (!node && !required) {
			return;
		}

		if (!isNodeType(node, VALID_CHILD_NODE)) {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_CHILD_NODE);
		}
	},

	/** @ignore */
	insertNode: function (node, required, funcName, paramName) {
		paramName = paramName || 'node';

		if (!node && !required) {
			return;
		}

		if (!isNodeType(node, VALID_INSERT_NODE)) {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_INSERT_NODE);
		}
	},

	/** @ignore */
	hasParentNode: function (node, funcName, paramName) {
		paramName = paramName || 'target';

		if (!node.parentNode) {
			throw new TypeError(funcName + ': ' + paramName + ERR_NO_PARENT_NODE);
		}
	}

};

// ac-dom-nodes@1.6.0

},{"../COMMENT_NODE":21,"../DOCUMENT_FRAGMENT_NODE":22,"../ELEMENT_NODE":24,"../TEXT_NODE":25,"./isNodeType":26}],28:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isNodeType = require('./internal/isNodeType');
var DOCUMENT_FRAGMENT_NODE = require('./DOCUMENT_FRAGMENT_NODE');

/**
 * @name module:ac-dom-nodes.isDocumentFragment
 *
 * @function
 *
 * @desc Test whether or not an Object is a DocumentFragment.
 *
 * @param {Object} obj
 *
 * @returns {Boolean}
 */
module.exports = function isDocumentFragment(obj) {
 	return isNodeType(obj, DOCUMENT_FRAGMENT_NODE);
};

// ac-dom-nodes@1.6.0

},{"./DOCUMENT_FRAGMENT_NODE":22,"./internal/isNodeType":26}],29:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isNodeType = require('./internal/isNodeType');
var ELEMENT_NODE = require('./ELEMENT_NODE');

/**
 * @name module:ac-dom-nodes.isElement
 *
 * @function
 *
 * @desc Test whether or not an Object is an Element.
 *
 * @param {Object} obj
 *
 * @returns {Boolean}
 */
module.exports = function isElement (obj) {
 	return isNodeType(obj, ELEMENT_NODE);
};

// ac-dom-nodes@1.6.0

},{"./ELEMENT_NODE":24,"./internal/isNodeType":26}],30:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.isNode
 *
 * @function
 *
 * @desc Test whether or not an Object is a Node.
 *
 * @param {Object} obj
 *
 * @returns {Boolean}
 */
module.exports = function isNode (obj) {
 	return !!(obj && obj.nodeType);
};

// ac-dom-nodes@1.6.0

},{}],31:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-nodes.remove
 *
 * @function
 *
 * @desc Remove a Node from it's parentNode
 *
 * @param {Node} node
 *        The Node to remove
 *
 * @returns {Node} The removed Node
 */
module.exports = function remove (node) {
	validate.childNode(node, true, 'remove');

	if (!node.parentNode) {
		return node;
	}

	return node.parentNode.removeChild(node);
};

// ac-dom-nodes@1.6.0

},{"./internal/validate":27}],32:[function(require,module,exports){
if (!Array.prototype.indexOf) {
/**
	Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
	@param searchElement {Object} Element to locate in the array.
	@param fromIndex {Number} Optional; the index at which to begin the search. Defaults to 0, i.e. the whole array will be searched. If the index is greater than or equal to the length of the array, -1 is returned, i.e. the array will not be searched. If negative, it is taken as the offset from the end of the array. Note that even when the index is negative, the array is still searched from front to back. If the calculated index is less than 0, the whole array will be searched.
*/
	Array.prototype.indexOf = function indexOf(searchElement, fromIndex) {
		var startIndex = fromIndex || 0;
		var currentIndex = 0;

		if (startIndex < 0) {
			startIndex = this.length + fromIndex - 1;
			if (startIndex < 0) {
				throw 'Wrapped past beginning of array while looking up a negative start index.';
			}
		}

		for (currentIndex = 0; currentIndex < this.length; currentIndex++) {
			if (this[currentIndex] === searchElement) {
				return currentIndex;
			}
		}

		return (-1);
	};
}
// ac-polyfills@2.2.2

},{}],33:[function(require,module,exports){
/**
 * Shim for "fixing" IE's lack of support (IE < 9) for applying slice
 * on host objects like NamedNodeMap, NodeList, and HTMLCollection
 * (technically, since host objects have been implementation-dependent,
 * at least before ES6, IE hasn't needed to work this way).
 * Also works on strings, fixes IE < 9 to allow an explicit undefined
 * for the 2nd argument (as in Firefox), and prevents errors when
 * called on other DOM objects.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
 */
(function () {
    'use strict';
    var _slice = Array.prototype.slice;

    try {
        // Can't be used with DOM elements in IE < 9
        _slice.call(document.documentElement);
    } catch (e) { // Fails in IE < 9
        // This will work for genuine arrays, array-like objects, 
        // NamedNodeMap (attributes, entities, notations),
        // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
        // and will not fail on other DOM objects (as do DOM elements in IE < 9)
        Array.prototype.slice = function (begin, end) {
            // IE < 9 gets unhappy with an undefined end argument
            end = (typeof end !== 'undefined') ? end : this.length;

            // For native Array objects, we use the native slice function
            if (Object.prototype.toString.call(this) === '[object Array]'){
                return _slice.call(this, begin, end); 
            }

            // For array like object we handle it ourselves.
            var i, cloned = [],
                size, len = this.length;

            // Handle negative value for "begin"
            var start = begin || 0;
            start = (start >= 0) ? start: len + start;

            // Handle negative value for "end"
            var upTo = (end) ? end : len;
            if (end < 0) {
                upTo = len + end;
            }

            // Actual expected size of the slice
            size = upTo - start;

            if (size > 0) {
                cloned = new Array(size);
                if (this.charAt) {
                    for (i = 0; i < size; i++) {
                        cloned[i] = this.charAt(start + i);
                    }
                } else {
                    for (i = 0; i < size; i++) {
                        cloned[i] = this[start + i];
                    }
                }
            }

            return cloned;
        };
    }
}());
// ac-polyfills@2.2.2

},{}],34:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

require('@marcom/ac-polyfills/Array/prototype.indexOf');

/** @ignore */
var isNode = require('@marcom/ac-dom-nodes/isNode');
var COMMENT_NODE = require('@marcom/ac-dom-nodes/COMMENT_NODE');
var DOCUMENT_FRAGMENT_NODE = require('@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE');
var DOCUMENT_NODE = require('@marcom/ac-dom-nodes/DOCUMENT_NODE');
var ELEMENT_NODE = require('@marcom/ac-dom-nodes/ELEMENT_NODE');
var TEXT_NODE = require('@marcom/ac-dom-nodes/TEXT_NODE');

/** @ignore */
var isNodeType = function (node, nodeType) {
	if (!isNode(node)) {
		return false;
	}

	if (typeof nodeType === 'number') {
		return (node.nodeType === nodeType);
	}

	return (nodeType.indexOf(node.nodeType) !== -1);
};

/** @ignore */
var VALID_PARENT_NODE = [
	ELEMENT_NODE,
	DOCUMENT_NODE,
	DOCUMENT_FRAGMENT_NODE
];

/** @ignore */
var ERR_INVALID_PARENT_NODE = ' must be an Element, Document, or Document Fragment';

/** @ignore */
var VALID_CHILD_NODE = [
	ELEMENT_NODE,
	TEXT_NODE,
	COMMENT_NODE
];

/** @ignore */
var ERR_INVALID_CHILD_NODE = ' must be an Element, TextNode, or Comment';

/** @ignore */
var ERR_INVALID_SELECTOR = ' must be a string';

module.exports = {

	/** @ignore */
	parentNode: function (node, required, funcName, paramName) {
		paramName = paramName || 'node';

		if ((node || required) && !isNodeType(node, VALID_PARENT_NODE)) {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_PARENT_NODE);
		}
	},

	/** @ignore */
	childNode: function (node, required, funcName, paramName) {
		paramName = paramName || 'node';

		if (!node && !required) {
			return;
		}

		if (!isNodeType(node, VALID_CHILD_NODE)) {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_CHILD_NODE);
		}
	},

	/** @ignore */
	selector: function (selector, required, funcName, paramName) {
		paramName = paramName || 'selector';

		if ((selector || required) && typeof selector !== 'string') {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_SELECTOR);
		}
	}

};

// ac-dom-traversal@2.1.2

},{"@marcom/ac-dom-nodes/COMMENT_NODE":21,"@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":22,"@marcom/ac-dom-nodes/DOCUMENT_NODE":23,"@marcom/ac-dom-nodes/ELEMENT_NODE":24,"@marcom/ac-dom-nodes/TEXT_NODE":25,"@marcom/ac-dom-nodes/isNode":30,"@marcom/ac-polyfills/Array/prototype.indexOf":32}],35:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var validate = require('./internal/validate');
var querySelectorShim = require('./shims/querySelector');
var querySelectorAvailable = ('querySelector' in document);

/**
 * @name module:ac-dom-traversal.querySelector
 *
 * @function
 *
 * @desc Returns the first Element within the specified context that match given CSS selector(s).
 *
 * @param {String} selector
 *        One or more CSS selectors separated by commas.
 *
 * @param {Node} [context=document]
 *        An optional ParentNode to scope the selector to. Defaults to `document`.
 *
 * @returns {Element|null} First matching Element, or `null` if no matches are found.
 */
module.exports = function querySelector(selector, context) {
	context = context || document;

	validate.parentNode(context, true, 'querySelector', 'context');
	validate.selector(selector, true, 'querySelector');

	if (!querySelectorAvailable) {
		return querySelectorShim(selector, context);
	}

	return context.querySelector(selector);
};

// ac-dom-traversal@2.1.2

},{"./internal/validate":34,"./shims/querySelector":37}],36:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

require('@marcom/ac-polyfills/Array/prototype.slice');

/** @ignore */
var validate = require('./internal/validate');
var querySelectorAllShim = require('./shims/querySelectorAll');
var querySelectorAllAvailable = ('querySelectorAll' in document);

/**
 * @name module:ac-dom-traversal.querySelectorAll
 *
 * @function
 *
 * @desc Returns an Array of Elements within the specified context that match given CSS selector(s).
 *
 * @param {String} selector
 *        One or more CSS selectors separated by commas.
 *
 * @param {Node} [context=document]
 *        An optional ParentNode to scope the selector to. Defaults to `document`.
 *
 * @returns {Element[]} Array of matching Elements
 */
module.exports = function querySelectorAll(selector, context) {
	context = context || document;

	validate.parentNode(context, true, 'querySelectorAll', 'context');
	validate.selector(selector, true, 'querySelectorAll');

	if (!querySelectorAllAvailable) {
		return querySelectorAllShim(selector, context);
	}

	return Array.prototype.slice.call(context.querySelectorAll(selector));
};

// ac-dom-traversal@2.1.2

},{"./internal/validate":34,"./shims/querySelectorAll":38,"@marcom/ac-polyfills/Array/prototype.slice":33}],37:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var querySelectorAll = require('./querySelectorAll');

/**
 * module:ac-dom-traversal.querySelector shim for IE < 8
 */
module.exports = function querySelector(selector, context) {
	var allResults = querySelectorAll(selector, context);

	return allResults.length ? allResults[0] : null;
};

// ac-dom-traversal@2.1.2

},{"./querySelectorAll":38}],38:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

require('@marcom/ac-polyfills/Array/prototype.indexOf');

/** @ignore */
var isElement = require('@marcom/ac-dom-nodes/isElement');
var isDocumentFragment = require('@marcom/ac-dom-nodes/isDocumentFragment');
var removeElement = require('@marcom/ac-dom-nodes/remove');
var COLLECTION_PREFIX = '_ac_qsa_';

var isElementInContext = function (el, context) {
	var parent;

	if (context === document) {
		return true;
	}

	parent = el;
	while ((parent = parent.parentNode) && isElement(parent)) {
		if (parent === context) {
			return true;
		}
	}

	return false;
};

var recalcStyles = function (context) {
	if ('recalc' in context) {
		context.recalc(false);
	} else {
		document.recalc(false);
	}

	window.scrollBy(0, 0);
};

/**
 * module:ac-dom-traversal.querySelectorAll shim for IE < 8
 */
module.exports = function querySelectorAll(selector, context) {
	var style = document.createElement();
	var id = COLLECTION_PREFIX + (Math.random() + '').slice(-6);
	var els = [];
	var el;

	// default context
	context = context || document;

	// prepare the collection
	document[id] = [];

	// prepare style tag
	// ac-qsa:expression() adds matching elements to the collection
	// display:recalc; is invalid, but forces display:none; elements to recalc
	style.innerHTML = 'x<style>*{display:recalc;}' + selector + '{ac-qsa:expression(document["' + id + '"] && document["' + id + '"].push(this));}';
	style = style.lastChild;

	if (isDocumentFragment(context)) {
		context.appendChild(style);
	} else {
		document.documentElement.firstChild.appendChild(style);
	}

	// recalc styles
	recalcStyles(context);

	// cleanup and collect matched elements
	while (document[id].length) {
		el = document[id].shift();
		el.style.removeAttribute('ac-qsa');

		// don't repeat elements
		// and enforce the current context
		if (els.indexOf(el) === -1 && isElementInContext(el, context)) {
			els.push(el);
		}
	}

	// reset collection and styles
	document[id] = null;
	removeElement(style);
	recalcStyles(context);

	// done!
	return els;
};

// ac-dom-traversal@2.1.2

},{"@marcom/ac-dom-nodes/isDocumentFragment":28,"@marcom/ac-dom-nodes/isElement":29,"@marcom/ac-dom-nodes/remove":31,"@marcom/ac-polyfills/Array/prototype.indexOf":32}],39:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getStyleProperty = require('@marcom/ac-prefixer/getStyleProperty');
var stripPrefixes = require('@marcom/ac-prefixer/stripPrefixes');

/**
 * @name module:ac-dom-styles.getStyle
 *
 * @function
 *
 * @desc Get one or more CSS styles on an Element.
 *       Uses `window.getComputedStyle` to get styles set in CSS and/or inline.
 *       Automatically handles vendor prefixed properties and values.
 *
 * @param {Element} target
 *        The DOM element to get the style(s) on.
 *
 * @param {...String|String[]} properties
 *        One or more properties as multiple arguments, or an Array.
 *
 * @returns {Object} An Object with multiple domProperty:value pairs.
 */
module.exports = function getStyle() {
	var properties = Array.prototype.slice.call(arguments);
	var target = properties.shift(properties);
	var computed = window.getComputedStyle(target);
	var styles = {};
	var property;
	var prefixed;
	var value;
	var i;

	if (typeof properties[0] !== 'string') {
		properties = properties[0];
	}

	for (i = 0; i < properties.length; i++) {
		property = properties[i];
		prefixed = getStyleProperty(property);

		if (prefixed) {
			property = stripPrefixes(prefixed);
			value = computed[prefixed];

			if (!value || value === 'auto') {
				value = null;
			}

			if (value) {
				value = stripPrefixes(value);
			}
		} else {
			value = null;
		}

		styles[property] = value;
	}

	return styles;
};

// ac-dom-styles@3.1.0

},{"@marcom/ac-prefixer/getStyleProperty":43,"@marcom/ac-prefixer/stripPrefixes":49}],40:[function(require,module,exports){
/**
 * Utility methods for setting and getting Element styles
 * @module ac-dom-styles
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	getStyle: require('./getStyle'),
	setStyle: require('./setStyle')
};

// ac-dom-styles@3.1.0

},{"./getStyle":39,"./setStyle":52}],41:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name normalizeValue
 *
 * @function
 * @private
 *
 * @desc Normalize a CSS value, as follows:
 *       - converts falsey values other than `0` to an empty String
 *       - converts an Array to a String
 *       - combines Object keys as CSS functions
 *       - returns `value` otherwise
 *
 * @param {*} value
 *        The CSS property's value
 *
 * @returns {String|Number} The normalized value
 */
module.exports = function normalizeValue(value) {
	var combined;
	var partials;
	var i;

	if (!value && value !== 0) {
		return '';
	}

	if (Array.isArray(value)) {
		return value + '';
	}

	if (typeof value === 'object') {
		combined = '';
		partials = Object.keys(value);

		for (i = 0; i < partials.length; i++) {
			combined += partials[i] + '(' + value[partials[i]] + ') ';
		}

		return combined.trim();
	}

	return value;
};

// ac-dom-styles@3.1.0

},{}],42:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

var cache = require('./shared/stylePropertyCache');
var getStyleProperty = require('./getStyleProperty');
var getStyleValue = require('./getStyleValue');

/**
 * @name module:ac-prefixer.getStyleCSS
 *
 * @function
 *
 * @desc Returns a CSS property or full CSS rule with vendor prefixes, as needed.
 *
 * @param {String} property
 *        The unprefixed property name in CSS or DOM form.
 *
 * @param {String} [value]
 *        The unprefixed property's value.
 *
 * @returns {String|Boolean}
 *          The property in CSS form if no value is provided.
 *          The full CSS rule if a value is provided.
 *          `false` if the property and/or value are not avialable.
 */
module.exports = function getStyleCSS(property, value) {
	var css;

	property = getStyleProperty(property);

	if (!property) {
		return false;
	}

	css = cache[property].css;

	if (typeof value !== 'undefined') {
		value = getStyleValue(property, value);

		if (value === false) {
			return false;
		}

		css += ':' + value + ';';
	}

	return css;
};
// ac-prefixer@3.1.0

},{"./getStyleProperty":43,"./getStyleValue":44,"./shared/stylePropertyCache":47}],43:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

var cache = require('./shared/stylePropertyCache');
var getStyleTestElement = require('./shared/getStyleTestElement');
var toCSS = require('./utils/toCSS');
var toDOM = require('./utils/toDOM');
var prefixHelper = require('./shared/prefixHelper');

/**
 * @name memoizeStyleProperty
 *
 * @function
 * @private
 *
 * @desc Memoize the results of getStyleProperty
 *
 * @param {String} property
 *        The unprefixed property name in DOM form.
 *
 * @param {String} prefixed
 *        The properly prefixed property name in DOM form.
 */
var memoizeStyleProperty = function (property, prefixed) {
	var cssProperty = toCSS(property);
	var cssPrefixed = (prefixed === false) ? false : toCSS(prefixed);

	cache[property] =
	cache[prefixed] =
	cache[cssProperty] =
	cache[cssPrefixed] = {
		dom: prefixed,
		css: cssPrefixed
	};

	return prefixed;
};

/**
 * @name module:ac-prefixer.getStyleProperty
 *
 * @function
 *
 * @desc Returns the property in DOM form with vendor prefix, as needed.
 *
 * @param {String} property
 *        The unprefixed property name in CSS or DOM form.
 *
 * @returns {String|Boolean} The property in DOM form, or `false` if not available.
 */
module.exports = function getStyleProperty(property) {
	var properties;
	var ucProperty;
	var el;
	var i;

	property += '';

	if (property in cache) {
		return cache[property].dom;
	}

	el = getStyleTestElement();

	property = toDOM(property);
	ucProperty = property.charAt(0).toUpperCase() + property.substring(1);

	if (property === 'filter') {
		// Chrome has both prefixed and unprefixed `filter`
		// but only the prefixed version is fully implemented.
		// Firefox isn't prefixed, so we drop it here.
		properties = ['WebkitFilter', 'filter'];
	} else {
		properties = (property + ' ' + prefixHelper.dom.join(ucProperty + ' ') + ucProperty).split(' ');
	}

	for (i = 0; i < properties.length; i++) {
		if (typeof el.style[properties[i]] !== 'undefined') {

			if (i !== 0) {
				prefixHelper.reduce(i - 1);
			}

			return memoizeStyleProperty(property, properties[i]);
		}
	}

	return memoizeStyleProperty(property, false);
};

// ac-prefixer@3.1.0

},{"./shared/getStyleTestElement":45,"./shared/prefixHelper":46,"./shared/stylePropertyCache":47,"./utils/toCSS":50,"./utils/toDOM":51}],44:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getStyleProperty = require('./getStyleProperty');
var styleValueAvailable = require('./shared/styleValueAvailable');
var prefixHelper = require('./shared/prefixHelper');

var stylePropertyCache = require('./shared/stylePropertyCache');
var styleValueCache = {};

var RE_CSS_FUNCTION_PARAMS = /(\([^\)]+\))/gi;
var RE_CSS_VALUES = /([^ ,;\(]+(\([^\)]+\))?)/gi;

/**
 * @name module:ac-prefixer.getStyleValue
 *
 * @function
 *
 * @desc Returns the value for a specific property with vendor prefix(es), as needed.
 *
 * @param {String} property
 *        The unprefixed property name in CSS or DOM form.
 *
 * @param {String} value
 *        The unprefixed property value.
 *
 * @returns {String|Boolean} The value, or `false` if not available.
 */
module.exports = function getStyleValue(property, value) {
	var cssProperty;

	value += '';
	property = getStyleProperty(property);

	if (!property) {
		return false;
	}

	if (styleValueAvailable(property, value)) {
		return value;
	}

	cssProperty = stylePropertyCache[property].css;

	value = value.replace(RE_CSS_VALUES, function (match) {
		var values;
		var valueKey;
		var key;
		var i;

		// ignore colors and numbers
		if (match[0] === '#' || !isNaN(match[0])) {
			return match;
		}

		// check memoized value
		valueKey = match.replace(RE_CSS_FUNCTION_PARAMS, '');
		key = cssProperty + ':' + valueKey;
		if (key in styleValueCache) {
			if (styleValueCache[key] === false) {
				// value not supported, stripped
				return '';
			}

			return match.replace(valueKey, styleValueCache[key]);
		}

		// prepare potential prefixes
		values = prefixHelper.css.map(function (prefix) {
			return prefix + match;
		});
		values = [match].concat(values);

		// check potential prefixes
		for (i = 0; i < values.length; i++) {
			if (styleValueAvailable(property, values[i])) {
				// valid prefix found

				if (i !== 0) {
					prefixHelper.reduce(i - 1);
				}

				styleValueCache[key] = values[i].replace(RE_CSS_FUNCTION_PARAMS, '');
				return values[i];
			}
		}

		// value not supported, stripped
		styleValueCache[key] = false;
		return '';
	});

	value = value.trim();
	return (value === '') ? false : value;
};

// ac-prefixer@3.1.0

},{"./getStyleProperty":43,"./shared/prefixHelper":46,"./shared/stylePropertyCache":47,"./shared/styleValueAvailable":48}],45:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var el;

/**
 * @name getStyleTestElement
 * @memberOf module:ac-prefixer/shared
 *
 * @function
 * @private
 *
 * @desc Creates the test Element and/or resets it's style properties.
 */
 module.exports = function getStyleTestElement() {
	if (!el) {
		el = document.createElement('_');
	} else {
		el.style.cssText = '';
		el.removeAttribute('style');
	}

	return el;
};

/*
 * @name getStyleTestElement.resetElement
 *
 * @function
 * @private
 *
 * @desc Reset the test Element. Exposed for testing.
 */
module.exports.resetElement = function () {
	el = null;
};

// ac-prefixer@3.1.0

},{}],46:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],47:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
module.exports = {};

// ac-prefixer@3.1.0

},{}],48:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var cache = require('./stylePropertyCache');
var getStyleTestElement = require('./getStyleTestElement');
var flagsSet = false;
var supportsAvailable;
var invalidStyleThrowsError;

var prepareFlags = function () {
	var el;

	if (!flagsSet) {
		flagsSet = true;
		supportsAvailable = ('CSS' in window && 'supports' in window.CSS);
		invalidStyleThrowsError = false;

		el = getStyleTestElement();
		try {
			el.style.width = 'invalid';
		} catch (e) {
			// Old IE throws an error for invalid values
			invalidStyleThrowsError = true;
		}
	}
};

/**
 * @name styleValueAvailable
 * @memberOf module:ac-prefixer/shared
 *
 * @function
 * @private
 *
 * @desc Determine whether or not a CSS value is valid
 *
 * @param {String} property
 *        The property name in DOM form, prefixed as needed.
 *
 * @param {String} value
 *        The value to test.
 *
 * @returns {Boolean} `true` if the value is valid, otherwise `false`.
 */
module.exports = function styleValueAvailable(property, value) {
	var before;
	var el;

	prepareFlags();

	if (supportsAvailable) {
		property = cache[property].css;
		return CSS.supports(property, value);
	}

	el = getStyleTestElement();
	before = el.style[property];

	if (invalidStyleThrowsError) {
		try {
			el.style[property] = value;
		} catch (e) {
			// Old IE throws an error for invalid values
			return false;
		}
	} else {
		el.style[property] = value;
	}

	return (el.style[property] && el.style[property] !== before);
};

/*
 * @name styleValueAvailable.resetFlags
 *
 * @function
 * @private
 *
 * @desc Reset CSS.support and try/catch flags. Exposed for testing.
 */
module.exports.resetFlags = function () {
	flagsSet = false;
};

// ac-prefixer@3.1.0

},{"./getStyleTestElement":45,"./stylePropertyCache":47}],49:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

var RE_PREFIXES = /(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;

/**
 * @name module:ac-prefixer.stripPrefixes
 *
 * @function
 *
 * @desc Strips vendor prefixes from a property or value.
 *
 * @param {String} str
 *        The property or value in CSS or DOM form.
 *
 * @returns {String} String in original form with vendor prefixes removed.
 */
module.exports = function stripPrefixes(str) {
	str = String.prototype.replace.call(str, RE_PREFIXES, '');
	return str.charAt(0).toLowerCase() + str.substring(1);
};

// ac-prefixer@3.1.0

},{}],50:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var RE_DOM_PREFIXES = /^(webkit|moz|ms)/gi;

/**
 * @name toCSS
 * @memberOf module:ac-prefixer/utils
 *
 * @function
 *
 * @desc Converts a property or value to CSS form (i.e., "-webkit-property-name").
 *
 * @param {String} str
 *        The property or value in CSS or DOM form.
 *
 * @returns {String} String in CSS form.
 */
module.exports = function toCSS(str) {
	var i;

	if (str.toLowerCase() === 'cssfloat') {
		return 'float';
	}

	if (RE_DOM_PREFIXES.test(str)) {
		str = '-' + str;
	}

	return str.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
};

// ac-prefixer@3.1.0

},{}],51:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var RE_CSS_WORD = /-([a-z])/g;

/**
 * @name toDOM
 * @memberOf module:ac-prefixer/utils
 *
 * @function
 *
 * @desc Converts a property to DOM form (i.e., "WebkitPropertyName").
 *
 * @param {String} str
 *        The property in CSS or DOM form.
 *
 * @returns {String} String in DOM form.
 */
module.exports = function toDOM(str) {
	var i;

	if (str.toLowerCase() === 'float') {
		return 'cssFloat';
	}

	str = str.replace(RE_CSS_WORD, function (str, m1) {
		return m1.toUpperCase();
	});

	if (str.substr(0, 2) === 'Ms') {
		str = 'ms' + str.substring(2);
	}

	return str;
};

// ac-prefixer@3.1.0

},{}],52:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getStyleCSS = require('@marcom/ac-prefixer/getStyleCSS');
var getStyleProperty = require('@marcom/ac-prefixer/getStyleProperty');
var normalizeValue = require('./internal/normalizeValue');

/**
 * @name module:ac-dom-styles.setStyle
 *
 * @function
 *
 * @desc Set one or more inline styles on an Element.
 *       Automatically handles vendor prefixed properties and values.
 *
 * @param {Element} target
 *        The DOM element to set the style(s) on.
 *
 * @param {Object} styles
 *        One or more styles as an Object with property/value pairs.
 *        A value of `null` or an empty String will remove that inline style.
 *
 * @returns {Element} target
 */
module.exports = function setStyle(target, styles) {
	var cssText = '';
	var cssRule;
	var property;
	var domProperty;
	var value;
	var targetCSSText;

	if (typeof styles !== 'object') {
		throw new TypeError('setStyle: styles must be an Object');
	}

	for (property in styles) {
		value = normalizeValue(styles[property]);

		if (!value && value !== 0) {
			// remove properties with blank values

			domProperty = getStyleProperty(property);

			if ('removeAttribute' in target.style) {
				// IE < 9
				target.style.removeAttribute(domProperty);
			} else {
				target.style[domProperty] = '';
			}

		} else {
			// get the CSS rule
			cssRule = getStyleCSS(property, value);

			if (cssRule !== false) {
				cssText += ' ' + cssRule;
			}
		}
	}

	if (cssText.length) {
		targetCSSText = target.style.cssText;
		if (targetCSSText.charAt(targetCSSText.length - 1) !== ';') {
			targetCSSText += ';';
		}

		targetCSSText += cssText;

		target.style.cssText = targetCSSText;
	}

	return target;
};

// ac-dom-styles@3.1.0

},{"./internal/normalizeValue":41,"@marcom/ac-prefixer/getStyleCSS":42,"@marcom/ac-prefixer/getStyleProperty":43}],53:[function(require,module,exports){
var Clock = require("./ac-clock/Clock"),
	ThrottledClock = require("./ac-clock/ThrottledClock"),
	sharedClockInstance = require("./ac-clock/sharedClockInstance");

// expose parent constructor on global instance (in case we want to create private versions of this later)
sharedClockInstance.Clock = Clock;
sharedClockInstance.ThrottledClock = ThrottledClock;

module.exports = sharedClockInstance;

// ac-clock@1.1.0

},{"./ac-clock/Clock":54,"./ac-clock/ThrottledClock":55,"./ac-clock/sharedClockInstance":56}],54:[function(require,module,exports){
/*global module */
"use strict";

require('@marcom/ac-polyfills/Function/prototype.bind');
require('@marcom/ac-polyfills/requestAnimationFrame');

var proto;

var EventEmitter = require('@marcom/ac-event-emitter-micro').EventEmitterMicro;
var pageLoadTime = new Date().getTime();

/**
 * @name .Clock
 * @class Clock
 * <pre>Clock = require('/Clock');</pre>
 */
function Clock() {
	// initialize EventEmitter scope on this object
	EventEmitter.call( this );

	// create variables to house state information and animationFrame location
	this.lastFrameTime = null;
	this._animationFrame = null;
	this._active = false;
	this._startTime = null;
	this._boundOnAnimationFrame = this._onAnimationFrame.bind( this );
	this._getTime = Date.now || function() { return new Date().getTime(); };
}

// force EventEmitter prototype on Clock
proto = Clock.prototype = new EventEmitter( null );

// start running the animationFrame loop
proto.start = function() {
	// prevent the clock from running more than once
	if ( this._active ) {
		return;
	}
	this._tick();
};

// stop running the animationFrame loop
proto.stop = function() {
	if ( this._active ) {
		// cancel a previous animation frame if we're catching it off its refresh cycle
		window.cancelAnimationFrame( this._animationFrame );
	}

	// set the animationFrame to null and remove active state
	this._animationFrame = null;
	this.lastFrameTime = null;
	this._active = false;
};

// stop running the Clock and ensure that the object can be garbage collected
proto.destroy = function() {
	this.stop();
	this.off();

	var i;
	for ( i in this ) {
		if ( this.hasOwnProperty( i ) ) {
			this[ i ] = null;
		}
	}
};

// API to determine whether or not the clock is currently running
proto.isRunning = function() {
	return this._active;
};

// internally called start method to allow it to run continuously without triggering a new run cycle
proto._tick = function() {
	if ( !this._active ) {
		this._active = true;
	}

	// request the next animation frame to run
	this._animationFrame = window.requestAnimationFrame( this._boundOnAnimationFrame );
};

// method that gets called on each animationFrame render
proto._onAnimationFrame = function( e ) {
	var delta = 0;
	var timeNow = this._getTime();

	// push event object into a new object
	// TODO: Is this required? Maybe we'll want to add more date to each event object later?
	if ( this.lastFrameTime === null ) {
		this.lastFrameTime = timeNow - pageLoadTime;
	}
	else {
		delta = e - this.lastFrameTime;
	}

	// calculate delta and default fps
	var fps = 0,
		data;

	// if we can actually determine the FPS, calcaluate that here
	if ( delta !== 0 ) {
		fps = 1000 / delta;
	}

	// set data object
	data = {
		time : e,
		delta : delta,
		fps : fps,
		naturalFps : fps,
		timeNow : timeNow
	};

	// trigger the 'update' event, which modules should bind to if they have values that should be synced before 'draw'
	this.trigger( 'update', data );
	// trigger the 'draw' event, which modules should call when drawing to the page
	this.trigger( 'draw', data );

	// remove reference for this._animationFrame
	this._animationFrame = null;
	// set lastFrameTime
	this.lastFrameTime = e;
	// restart the animation frame loop

	// If the clock wasn't stopped in the update or draw cycles
	if (this._active !== false) {
		this._tick();
	} else {
		this.lastFrameTime = null;
	}
};


module.exports = Clock;

// ac-clock@1.1.0

},{"@marcom/ac-event-emitter-micro":91,"@marcom/ac-polyfills/Function/prototype.bind":58,"@marcom/ac-polyfills/requestAnimationFrame":59}],55:[function(require,module,exports){
/*global module */
"use strict";

require('@marcom/ac-polyfills/requestAnimationFrame');

var proto;

var sharedClockInstance = require('./sharedClockInstance'),
	EventEmitter = require('@marcom/ac-event-emitter-micro').EventEmitterMicro;

/**
 * @name .ThrottledClock
 * @class ThrottledClock
 * <pre>ThrottledClock = require('/ThrottledClock');</pre>
 */
function ThrottledClock( fps, options ) {
	// if being extended by another module, return false here;
	if ( fps === null ) {
		return;
	}

	EventEmitter.call( this );
	options = options || {};

	this._fps = fps || null;
	this._clock = options.clock || sharedClockInstance;
	this._lastThrottledTime = null;
	this._clockEvent = null;

	this._boundOnClockDraw = this._onClockDraw.bind(this);
	this._boundOnClockUpdate = this._onClockUpdate.bind(this);

	this._clock.on( 'update', this._boundOnClockUpdate );
}

proto = ThrottledClock.prototype = new EventEmitter( null );

proto.setFps = function( fps ) {
	this._fps = fps;
	return this;
};

proto.getFps = function() {
	return this._fps;
};

proto.start = function() {
	this._clock.start();
	return this;
};

proto.stop = function() {
	this._clock.stop();
	return this;
};

proto.isRunning = function() {
	return this._clock.isRunning();
};

proto.destroy = function() {
	this._clock.off( 'update', this._boundOnClockUpdate );
	this._clock.destroy.call( this );
};

proto._onClockUpdate = function( e ) {
	// get the last throttled time if DNE
	if ( this._lastThrottledTime === null ) {
		this._lastThrottledTime = this._clock.lastFrameTime;
	}

	var delta = e.time - this._lastThrottledTime;

	if ( !this._fps ) {
		throw new TypeError('FPS is not defined.');
	}

	// if the delta is less than the lastThrottledTime, return early
	if ( delta < ( 1000 / this._fps ) )  {
		return;
	}

	// pass the updated delta to object
	this._clockEvent = e;

	// set new delta and fps values
	this._clockEvent.delta = delta;
	this._clockEvent.fps = 1000 / delta;

	// set the lastThrottledTime to the current time
	this._lastThrottledTime = this._clockEvent.time;

	// ensure that _onClockDraw gets called on the next draw event from this._clock
	this._clock.once( 'draw', this._boundOnClockDraw );

	this.trigger( 'update', this._clockEvent );
};

proto._onClockDraw = function() {
	this.trigger( 'draw', this._clockEvent );
};

module.exports = ThrottledClock;

// ac-clock@1.1.0

},{"./sharedClockInstance":56,"@marcom/ac-event-emitter-micro":91,"@marcom/ac-polyfills/requestAnimationFrame":59}],56:[function(require,module,exports){
'use strict';

var Clock = require('./Clock');

module.exports = new Clock();
// ac-clock@1.1.0

},{"./Clock":54}],57:[function(require,module,exports){
if (!Array.isArray) {
    /**
     * Returns true if an object is an array, false if it is not.
     * @param {Object} object Object to test against.
     * @name Array.isArray
     */
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
// ac-polyfills@2.2.2

},{}],58:[function(require,module,exports){
if (!Function.prototype.bind) {
/**
	Creates a new function that, when called, itself calls this function in the context of the provided
	this value, with a given sequence of arguments preceding any provided when the new function was called.
	Arguments may be passed to bind as separate arguments following `thisObj`.
	@param {Object} thisObj The object that will provide the context of `this` for the called function.
*/
	Function.prototype.bind = function(originalContext){
		if (typeof this !== 'function') {
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}
		var applicableArgs = Array.prototype.slice.call(arguments, 1);
		var functionToBind = this;
		var fnOriginalPrototype = function(){ };
		var fnBound = function() {
			return functionToBind.apply(
				(this instanceof fnOriginalPrototype && originalContext) ? this : originalContext,
				applicableArgs.concat(Array.prototype.slice.call(arguments))
			);
		}
		fnOriginalPrototype.prototype = this.prototype;
		fnBound.prototype = new fnOriginalPrototype();
		return fnBound;
	};
}

// ac-polyfills@2.2.2

},{}],59:[function(require,module,exports){
/**
	http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	requestAnimationFrame polyfill by Erik Möller
	fixes from Paul Irish and Tino Zijdel
	Modified to implement Date.now()
*/
(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
		var currTime = Date.now();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(function () {
			callback(currTime + timeToCall);
		}, timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};

	if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
		clearTimeout(id);
	};
}());
// ac-polyfills@2.2.2

},{}],60:[function(require,module,exports){
/** 
 * @module ac-clip
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	Clip: require('./ac-clip/Clip')
};

// ac-clip@3.1.0

},{"./ac-clip/Clip":61}],61:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
require('@marcom/ac-polyfills/Array/isArray');
var create = require('@marcom/ac-object/create');
var createPredefined = require('@marcom/ac-easing').createPredefined;

/** @ignore */
var Clock = require('@marcom/ac-clock');
var Ease = require('@marcom/ac-easing').Ease;
var EventEmitterMicro = require('@marcom/ac-event-emitter-micro').EventEmitterMicro;

/** @ignore */
var DEFAULT_EASE = 'ease';

/**
 * @name module:ac-clip.Clip
 * @class
 *
 * @param {Object} target
 *        The `Object` whose properties Clip will transition / modify.
 *
 * @param {Number} duration
 *        The duration of the transition in seconds.
 *
 * @param {Object} propsTo
 *        An `Object` containing the end state of the properties you wish to
 *        transition on target.
 *
 * @param {Number} [options.delay=0]
 *        Delay in seconds before a clip will start after play has been called.
 *
 * @param {String|Function} [options.ease='ease']
 *        The ease used for transitions.
 *
 * @param {Clock} [options.clock=Clock]
 *        An instance of `ac-clock.Clock` to be used. Defaults to global singleton.
 *
 * @param {Object} [options.propsFrom={}]
 *        An `Object` containing the start state of the properties you wish to
 *        transition on target.
 *
 * @param {Number} [options.loop=0]
 *        Amount of times the clip will loop and replay upon completion.
 *
 * @param {Number} [options.yoyo=false]
 *        When `true` the clip will play in reverse upon completion until it returns
 *        to it’s original state.
 *
 * @param {Boolean} [options.destroyOnComplete=null]
 *        When true the clip will self destruct - call destroy on itself upon
 *        completion.
 *
 * @param {Function} [options.onStart=null]
 *        A callback `Function` called when the clip starts to play.
 *
 * @param {Function} [options.onUpdate=null]
 *        A callback `Function` called when the clip has updated properties.
 *        This should be used if you require to do further calculations with the
 *        properties and not for rendering. Use `onDraw` for rendering.
 *
 * @param {Function} [options.onDraw=null]
 *        A callback `Function` called when the clip has updated properties.
 *        This should be used for rendering, e.g. drawing something to a `canvas`
 *        element.
 *
 * @param {Function} [options.onComplete=null]
 *        A callback `Function` called when the clip has finished playing.
 */
function Clip(target, duration, propsTo, options) {

	// options
	options = options || {};
	this._options = options;

	// features
	this._isYoyo = options.yoyo;
	this._direction = 1;
	this._timeScale = 1;
	this._loop = options.loop || 0;
	this._loopCount = 0;

	// object / timing
	this._target = target;
	this.duration(duration);
	this._delay = (options.delay || 0) * 1000;
	this._remainingDelay = this._delay;
	this._progress = 0;
	this._clock = options.clock || Clock;
	this._playing = false;
	this._getTime = Date.now || function() { return new Date().getTime(); };

	// properties
	this._propsTo = propsTo || {};
	this._propsFrom = options.propsFrom || {};

	// callbacks
	this._onStart = options.onStart || null;
	this._onUpdate = options.onUpdate || null;
	this._onDraw = options.onDraw || null;
	this._onComplete = options.onComplete || null;

	// easing
	var ease = options.ease || DEFAULT_EASE;
	this._ease = (typeof ease === 'function') ? new Ease(ease) : createPredefined(ease);

	//bind
	this._start = this._start.bind(this);
	this._update = this._update.bind(this);
	this._draw = this._draw.bind(this);

	// further prep work to be done in _prepareProperties
	this._isPrepared = false;

	Clip._add(this);

	// call super
	EventEmitterMicro.call(this);
}

var proto = Clip.prototype = create(EventEmitterMicro.prototype);

/** Events */
Clip.COMPLETE = 'complete';
Clip.PAUSE = 'pause';
Clip.PLAY = 'play';


////////////////////////////////////////
//////////  PUBLIC METHODS   ///////////
////////////////////////////////////////

/**
 * @name module:ac-clip.Clip#play
 * @function
 *
 * @desc Starts the clip.
 *
 * @returns {Clip} A reference to this clip.
 */
proto.play = function () {
	if (!this._playing) {
		this._playing = true;

		if (this._delay === 0 || this._remainingDelay === 0) {
			this._start();
		}
		else {
			if (!this._isPrepared) {
				this._setDiff();
				this._updateProps();
			}
			this._startTimeout = setTimeout(this._start, this._remainingDelay / this._timeScale);
			this._delayStart = this._getTime();
		}
	}
	return this;
};

/**
 * @name module:ac-clip.Clip#pause
 * @function
 *
 * @desc Pauses the clip.
 *
 * @fires Clip#pause
 *
 * @returns {Clip} A reference to this clip.
 */
proto.pause = function () {
	if (this._playing) {
		if (this._startTimeout) {
			this._remainingDelay = this._getTime() - this._delayStart;
			clearTimeout(this._startTimeout);
		}

		this._stop();

		/**
		 * Pause event.
		 * @event Clip#pause
		 */
		this.trigger(Clip.PAUSE, this);
	}
	return this;
};

/**
 * @name module:ac-clip.Clip#destroy
 * @function
 *
 * @desc Immediately stop the clip and make it eligible for garbage collection.
 *       A clip can not be reused after it has been destroyed.
 *
 * @returns {Clip} A reference to this clip.
 */
proto.destroy = function () {
	this.pause();

	this._options = null;
	this._target = null;
	this._storeTarget = null;
	this._ease = null;
	this._clock = null;
	this._propsTo = null;
	this._propsFrom = null;
	this._storePropsTo = null;
	this._storePropsFrom = null;
	this._propsDiff = null;
	this._propsEase = null;
	this._onStart = null;
	this._onUpdate = null;
	this._onDraw = null;
	this._onComplete = null;

	Clip._remove(this);

	// call Super destroy method
	EventEmitterMicro.prototype.destroy.call(this);

	return this;
};

/**
 * @name module:ac-clip.Clip#reset
 * @function
 *
 * @desc Resets the clip and target properties.
 *
 * @returns {Clip} A reference to this clip.
 */
proto.reset = function () {
	if (!this._isPrepared) {
		// nothing to reset
		return;
	}

	this._stop();
	
	this._resetLoop(this._target, this._storeTarget);
	
	this._direction = 1;
	this._loop = this._options.loop || 0;
	this._loopCount = 0;
	this._propsFrom = this._storePropsFrom;
	this._propsTo = this._storePropsTo;
	
	this._progress = 0;
	this._setStartTime();

	if (this._onUpdate) {
		this._onUpdate.call(this, this);
	}
	if (this._onDraw) {
		this._onDraw.call(this, this);
	}

	return this;
};

/**
 * @name module:ac-clip.Clip#playing
 * @function
 *
 * @desc Returns the clips current play stat as a `Boolean` true / false.
 *
 * @returns {Boolean} The current play stat.
 */
proto.playing = function () {
	return this._playing;
};

/**
 * @name module:ac-clip.Clip#target
 * @function
 *
 * @desc Gets the target `Object`.
 *
 * @returns {Object} The target.
 */
proto.target = function () {
	return this._target;
};

/**
 * @name module:ac-clip.Clip#duration
 * @function
 *
 * @desc Gets or sets the duration of the transition.
 *
 * @param {Number} [duration]
 *        Optional new duration for the transition.
 *
 * @returns {Number} The current duration.
 */
proto.duration = function (duration) {

	if (duration !== undefined) {
		this._duration = duration;
		this._durationMs = (duration * 1000) / this._timeScale;

		if (this._playing) {
			this._setStartTime();
		}
	}

	return this._duration;
};

/**
 * @name module:ac-clip.Clip#timeScale
 * @function
 *
 * @desc Gets or sets the timeScale of the transition. TimeScale is the rate at
 *       which the transition will play. For example, a Clip with a duration of
 *       1 second and timeScale of 0.5 will play over 2 seconds.
 *
 * @param {Number} [timeScale]
 *        Optional new timeScale for the transition.
 *
 * @returns {Number} The current timeScale.
 */
proto.timeScale = function (timeScale) {

	if (timeScale !== undefined) {
		this._timeScale = timeScale;
		this.duration(this._duration);
	}
	
	return this._timeScale;
};

/**
 * @name module:ac-clip.Clip#currentTime
 * @function
 *
 * @desc Gets or sets the current time of the transition.
 *
 * @param {Number} [time]
 *        Optional new time for the Clip to jump to.
 *
 * @returns {Number} The current time.
 */
proto.currentTime = function (time) {

	if (time !== undefined) {
		return this.progress(time / this._duration) * this._duration;
	}
	
	return (this.progress() * this._duration);
};

/**
 * @name module:ac-clip.Clip#progress
 * @function
 *
 * @desc Gets or sets the current progress of the transition.
 *
 * @param {Number} progress
 *        Accepts a Number between 0 and 1 and will change the position of the clip.
 *
 * @returns {Number} The current progress.
 */
proto.progress = function (progress) {

	if (progress !== undefined) {

		this._progress = Math.min(1, Math.max(0, progress));
		this._setStartTime();
		
		if (!this._isPrepared) {
			this._setDiff();
		}
		
		if (this._playing && progress === 1) {
			this._completeProps();
			if (this._onUpdate) {
				this._onUpdate.call(this, this);
			}
			if (this._onDraw) {
				this._onDraw.call(this, this);
			}
			this._complete();
		}
		else {
			this._updateProps();
			if (this._onUpdate) {
				this._onUpdate.call(this, this);
			}
			if (this._onDraw) {
				this._onDraw.call(this, this);
			}
		}
	}
	
	return this._progress;
};


////////////////////////////////////////
/////////  PRIVATE METHODS   ///////////
////////////////////////////////////////

/**
 * @name module:ac-clip.Clip#_resetLoop
 * @function
 * @private
 */
/** @ignore */
proto._resetLoop = function (target, stored) {
	var prop;
	for (prop in stored) {
		if (stored.hasOwnProperty(prop)) {
			if (stored[prop] !== null) {
				if (typeof stored[prop] === 'object') {
					this._resetLoop(target[prop], stored[prop]);
				}
				else {
					target[prop] = stored[prop];
				}
			}
		}
	}
};

/**
 * @name module:ac-clip.Clip#_cloneObjects
 * @function
 * @private
 *
 * @returns {Object}
 */
/** @ignore */
proto._cloneObjects = function () {
	var cloneTarget = {};
	var clonePropsTo = {};
	var clonePropsFrom = {};
	this._cloneObjectsLoop(this._target, this._propsTo, this._propsFrom, cloneTarget, clonePropsTo, clonePropsFrom);
	return {
		target: cloneTarget,
		propsTo: clonePropsTo,
		propsFrom: clonePropsFrom
	};
};

/**
 * @name module:ac-clip.Clip#_cloneObjectsLoop
 * @function
 * @private
 *
 * @returns {Object}
 */
/** @ignore */
proto._cloneObjectsLoop = function (target, to, from, cloneTarget, clonePropsTo, clonePropsFrom) {
	var type;
	var prop;

	// loops through propsFrom and if there isn't a matching propsTo
	// adds propsTo property to match the current state of target
	for (prop in from) {
		if (from.hasOwnProperty(prop) && to[prop] === undefined && target[prop] !== undefined) {
			cloneTarget[prop] = target[prop];
			clonePropsTo[prop] = target[prop];
			clonePropsFrom[prop] = from[prop];
		}
	}

	for (prop in to) {
		if (target.hasOwnProperty(prop)) {
			type = typeof target[prop];
			if (target[prop] !== null && type === 'object') {

				if (Array.isArray(target[prop])) {
					// array
					cloneTarget[prop] = [];
					clonePropsTo[prop] = [];
					clonePropsFrom[prop] = [];
				}
				else {
					// object
					cloneTarget[prop] = {};
					clonePropsTo[prop] = {};
					clonePropsFrom[prop] = {};
				}

				this._cloneObjectsLoop(target[prop], to[prop] || {}, from[prop] || {}, cloneTarget[prop], clonePropsTo[prop], clonePropsFrom[prop]);
			}
			else if (to[prop] !== null && type === 'number') {
				cloneTarget[prop] = target[prop];
				clonePropsTo[prop] = to[prop];

				if (from && from[prop] !== undefined) {
					clonePropsFrom[prop] = from[prop];
				}
			}
		}
	}
};

/**
 * @name module:ac-clip.Clip#_prepareProperties
 * @function
 * @private
 */
/** @ignore */
proto._prepareProperties = function () {
	if (!this._isPrepared) {
		// create clones of main objects
		var clones = this._cloneObjects();
		// we need to clone the target so we can use it for reset, yoyo and loop etc
		this._storeTarget = clones.target;
		// we clone / override the propsTo as we don't want to manipulate / change the
		// object passed to Clip on instantiation as it might be used by something else
		this._propsTo = clones.propsTo;
		this._storePropsTo = this._propsTo;
		// same as propsTo - clone so we don't mess with object that might be used elsewhere
		this._propsFrom = clones.propsFrom;
		this._storePropsFrom = this._propsFrom;

		this._isPrepared = true;
	}
};

/**
 * @name module:ac-clip.Clip#_setStartTime
 * @function
 * @private
 */
/** @ignore */
proto._setStartTime = function () {
	this._startTime = this._getTime() - (this.progress() * this._durationMs);
};

/**
 * @name module:ac-clip.Clip#_setDiff
 * @function
 * @private
 */
/** @ignore */
proto._setDiff = function () {

	// this is the last moment to prep any props
	if (!this._isPrepared) {
		this._prepareProperties();
	}

	this._propsDiff = {};
	this._setDiffLoop(this._propsTo, this._propsFrom, this._target, this._propsDiff);
};

/**
 * @name module:ac-clip.Clip#_setDiffLoop
 * @function
 * @private
 */
/** @ignore */
proto._setDiffLoop = function (to, from, target, diff) {
	var type;
	var prop;
	for (prop in to) {
		if (to.hasOwnProperty(prop)) {
			type = typeof to[prop];
			if (to[prop] !== null && type === 'object') {
				from[prop] = from[prop] || {};
				diff[prop] = diff[prop] || {};
				this._setDiffLoop(to[prop], from[prop], target[prop], diff[prop]);
			}
			else if (type === 'number' && target[prop] !== undefined) {
				if (from[prop] !== undefined) {
					target[prop] = from[prop];
				}
				else {
					from[prop] = target[prop];
				}
				diff[prop] = to[prop] - target[prop];
			}
			else {
				to[prop] = null;
				from[prop] = null;
			}
		}
	}
};

/**
 * @name module:ac-clip.Clip#_start
 * @function
 * @private
 *
 * @fires Clip#play
 */
/** @ignore */
proto._start = function () {
	this._startTimeout = null;
	this._remainingDelay = 0;

	this._setStartTime();

	this._clock.on('update', this._update);
	this._clock.on('draw', this._draw);

	if (!this._clock.isRunning()) {
		this._clock.start();
	}

	this._setDiff();

	this._playing = true;
	this._running = true;

	if (this._onStart) {
		this._onStart.call(this, this);
	}

	/**
     * Play event.
     * @event Clip#play
     */
	this.trigger(Clip.PLAY, this);
};

/**
 * @name module:ac-clip.Clip#_stop
 * @function
 * @private
 */
/** @ignore */
proto._stop = function () {
	this._playing = false;
	this._running = false;
	this._clock.off('update', this._update);
	this._clock.off('draw', this._draw);
};

/**
 * @name module:ac-clip.Clip#_updateProps
 * @function
 * @private
 */
/** @ignore */
proto._updateProps = function () {
	var eased;
	if (this._direction === 1) {
		eased = this._ease.getValue(this._progress);
	}
	else {
		eased = 1 - this._ease.getValue(1 - this._progress);
	}

	this._updatePropsLoop(this._propsTo, this._propsFrom, this._target, this._propsDiff, eased);
};

/**
 * @name module:ac-clip.Clip#_updateProps
 * @function
 * @private
 */
/** @ignore */
proto._updatePropsLoop = function (to, from, target, diff, eased) {
	var prop;
	for (prop in to) {
		if (to.hasOwnProperty(prop) && to[prop] !== null) {
			if (typeof to[prop] !== 'number') {
				this._updatePropsLoop(to[prop], from[prop], target[prop], diff[prop], eased);
			}
			else {
				target[prop] = from[prop] + (diff[prop] * eased);
			}
		}
	}
};

/**
 * @name module:ac-clip.Clip#_completeProps
 * @function
 * @private
 */
/** @ignore */
proto._completeProps = function () {
	this._completePropsLoop(this._propsTo, this._target);
};

/**
 * @name module:ac-clip.Clip#_completePropsLoop
 * @function
 * @private
 */
/** @ignore */
proto._completePropsLoop = function (to, target) {
	var prop;
	for (prop in to) {
		if (to.hasOwnProperty(prop) && to[prop] !== null) {
			if (typeof to[prop] !== 'number') {
				this._completePropsLoop(to[prop], target[prop]);
			}
			else {
				target[prop] = to[prop];
			}
		}
	}
};

/**
 * @name module:ac-clip.Clip#_complete
 * @function
 * @private
 *
 * @fires Clip#complete
 */
/** @ignore */
proto._complete = function () {
	if (this._isYoyo && ((this._loop > 0 && this._loopCount <= this._loop) || (this._loop === 0 && this._loopCount === 0))) {
		this._propsFrom = (this._direction === 1) ? this._storePropsTo : this._storePropsFrom;
		this._propsTo = (this._direction === 1) ? this._storePropsFrom : this._storePropsTo;
		this._direction *= -1;
		if (this._direction === -1) {
			++this._loopCount;
		}
		this.progress(0);
		this._start();
	}
	else if (this._loopCount < this._loop) {
		++this._loopCount;
		this.progress(0);
		this._start();
	}
	else {
		/**
		 * Complete event.
		 * @event Clip#complete
		 */
		this.trigger(Clip.COMPLETE, this);

		if (this._onComplete) {
			this._onComplete.call(this, this);
		}

		if (this._options && this._options.destroyOnComplete) {
			this.destroy();
		}
	}
};

/**
 * @name module:ac-clip.Clip#_update
 * @function
 * @private
 *
 * @param {Object} [evt=undefined]
 */
/** @ignore */
proto._update = function (evt) {
	if (this._running) {
		this._progress = (evt.timeNow - this._startTime) / this._durationMs;

		if (this._progress >= 1) {
			this._progress = 1;
			this._running = false;
			this._completeProps();
		}
		else {
			this._updateProps();
		}

		if (this._onUpdate) {
			this._onUpdate.call(this, this);
		}
	}
};

/**
 * @name module:ac-clip.Clip#_draw
 * @function
 * @private
 *
 * @param {Object} [evt=undefined]
 */
/** @ignore */
proto._draw = function (evt) {
	if (this._onDraw) {
		this._onDraw.call(this, this);
	}

	if (!this._running) {
		this._stop();

		if (this._progress === 1) {
			this._complete();
		}
	}
};


////////////////////////////////////////
//////////  STATIC METHODS   ///////////
////////////////////////////////////////

/**
 * @name module:ac-clip.Clip#_instantiate
 * @function
 * @private
 * @static
 */
/** @ignore */
Clip._instantiate = function () {
	this._clips = [];
	return this;
};

/**
 * @name module:ac-clip.Clip#_add
 * @function
 * @private
 * @static
 *
 * @param {Clip} clip
 */
/** @ignore */
Clip._add = function (clip) {
	this._clips.push(clip);
};

/**
 * @name module:ac-clip.Clip#_remove
 * @function
 * @private
 * @static
 *
 * @param {Clip} clip
 */
/** @ignore */
Clip._remove = function (clip) {
	var index = this._clips.indexOf(clip);
	if (index > -1) {
		this._clips.splice(index, 1);
	}
};

/**
 * @name module:ac-clip.Clip#getAll
 * @function
 * @static
 *
 * @desc Returns an Array of all Clip instances. Will filter to only
 *       instances using target param when supplied.
 *
 * @param {Object} [target=null]
 *        An optional target options. If supplied this function will
 *        return only Clip instances who use this target.
 *
 * @returns {Array} An array of Clip instances.
 */
Clip.getAll = function (target) {
	if (target !== undefined) {
		var clips = [];
		var i = this._clips.length;
		while (i--) {
			if (this._clips[i].target() === target) {
				clips.push(this._clips[i]);
			}
		}
		return clips;
	}
	return Array.prototype.slice.call(this._clips);
};

/**
 * @name module:ac-clip.Clip#destroyAll
 * @function
 * @static
 *
 * @desc Destroys all Clip instances. Will filter to only
 *       instances using target param when supplied.
 *
 * @param {Object} [target=null]
 *        An optional target options. If supplied this function will
 *        destroy only Clip instances who use this target.
 *
 * @returns {Array} An array of all Clips destroyed.
 */
Clip.destroyAll = function (target) {
	var clips = this.getAll(target);
	if (this._clips.length === clips.length) {
		// if all clips then empty array to prevent splice
		this._clips = [];
	}
	var i = clips.length;
	while (i--) {
		clips[i].destroy();
	}
	return clips;
};

/**
 * @name module:ac-clip.Clip#to
 * @function
 * @static
 *
 * @desc Creates and returns an instance of a Clip that will autostart and destroy
 *       itself upon completetion. Ideal for creating throw away instances of Clip
 *       and not having to worry about memory / destroying them.
 *
 * @param {Object} target
 *        The `Object` whose properties Clip will transition / modify.
 *
 * @param {Number} duration
 *        The duration of the transition in seconds.
 *
 * @param {Object} propsTo
 *        An `Object` containing the end state of the properties you wish to
 *        transition on target.
 *
 * @param {Object} options
 *        See Clip instantiation docs for full list of options.
 *
 * @returns {Clip} An new instance of Clip.
 */
Clip.to = function (target, duration, propsTo, options) {
	options = options || {};
	if (options.destroyOnComplete === undefined) {
		options.destroyOnComplete = true;
	}
	return new Clip(target, duration, propsTo, options).play();
};

/**
 * @name module:ac-clip.Clip#from
 * @function
 * @static
 *
 * @desc Creates and returns an instance of a Clip that will autostart and destroy
 *       itself upon completetion. Ideal for creating throw away instances of Clip
 *       and not having to worry about memory / destroying them. Unlike the static
 *       `to` method this method takes propsFrom as the third argument and will
 *       transition an Object back to it's original state.
 *
 * @param {Object} target
 *        The `Object` whose properties Clip will transition / modify.
 *
 * @param {Number} duration
 *        The duration of the transition in seconds.
 *
 * @param {Object} propsFrom
 *        An `Object` containing the start state of the properties you wish to
 *        transition on target.
 *
 * @param {Object} options
 *        See Clip instantiation docs for full list of options. The one difference
 *        here is no `propsFrom` object can be passed in options but instead a `propsTo`
 *        option is accepted that works in a similar way - listing end states for props.
 *
 * @returns {Clip} An new instance of Clip.
 */
Clip.from = function (target, duration, propsFrom, options) {
	options = options || {};
	options.propsFrom = propsFrom;
	if (options.destroyOnComplete === undefined) {
		options.destroyOnComplete = true;
	}
	return new Clip(target, duration, options.propsTo, options).play();
};


module.exports = Clip._instantiate();

// ac-clip@3.1.0

},{"@marcom/ac-clock":53,"@marcom/ac-easing":83,"@marcom/ac-event-emitter-micro":91,"@marcom/ac-object/create":94,"@marcom/ac-polyfills/Array/isArray":57}],62:[function(require,module,exports){
/** 
 * @module ac-color
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** require Color */
var Color = require('./ac-color/Color');

/** add static methods to Color */
Color.decimalToHex =	require('./ac-color/static/decimalToHex');
Color.hexToDecimal =	require('./ac-color/static/hexToDecimal');
Color.hexToRgb =		require('./ac-color/static/hexToRgb');
Color.isColor =			require('./ac-color/static/isColor');
Color.isHex =			require('./ac-color/static/isHex');
Color.isRgb =			require('./ac-color/static/isRgb');
Color.isRgba =			require('./ac-color/static/isRgba');
Color.mixColors =		require('./ac-color/static/mixColors');
Color.rgbaToArray =		require('./ac-color/static/rgbaToArray');
Color.rgbToArray =		require('./ac-color/static/rgbToArray');
Color.rgbToDecimal =	require('./ac-color/static/rgbToDecimal');
Color.rgbToHex =		require('./ac-color/static/rgbToHex');
Color.rgbToHsl =		require('./ac-color/static/rgbToHsl');
Color.rgbToHsv =		require('./ac-color/static/rgbToHsv');
Color.rgbaToObject =	require('./ac-color/static/rgbaToObject');
Color.rgbToObject =		require('./ac-color/static/rgbToObject');
Color.shortToLongHex =	require('./ac-color/static/shortToLongHex');

/** exports */
module.exports = {
	Color: Color
};

// ac-color@1.1.0

},{"./ac-color/Color":63,"./ac-color/static/decimalToHex":65,"./ac-color/static/hexToDecimal":66,"./ac-color/static/hexToRgb":67,"./ac-color/static/isColor":68,"./ac-color/static/isHex":69,"./ac-color/static/isRgb":70,"./ac-color/static/isRgba":71,"./ac-color/static/mixColors":72,"./ac-color/static/rgbToArray":73,"./ac-color/static/rgbToDecimal":74,"./ac-color/static/rgbToHex":75,"./ac-color/static/rgbToHsl":76,"./ac-color/static/rgbToHsv":77,"./ac-color/static/rgbToObject":78,"./ac-color/static/rgbaToArray":79,"./ac-color/static/rgbaToObject":80,"./ac-color/static/shortToLongHex":81}],63:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var cssColorNames = require('./helpers/cssColorNames');
var hexToRgb = require('./static/hexToRgb');
var isColor = require('./static/isColor');
var isHex = require('./static/isHex');
var isRgba = require('./static/isRgba');
var mixColors = require('./static/mixColors');
var rgbaToArray = require('./static/rgbaToArray');
var rgbToArray = require('./static/rgbToArray');
var rgbToDecimal = require('./static/rgbToDecimal');
var rgbToHex = require('./static/rgbToHex');
var rgbaToObject = require('./static/rgbaToObject');
var rgbToObject = require('./static/rgbToObject');
var shortToLongHex = require('./static/shortToLongHex');

/**
 * @name module:ac-color.Color
 * @class
 *
 * @desc An Object with methods for converting and manipulating a color.
 *
 * @param {String} color
 *        The color of the object.
 */
function Color(color) {
	if (!isColor(color) && !cssColorNames.nameToRgbObject[color]) {
		throw new Error(color + ' is not a supported color.');
	}

	this._setColor(color);
}

var proto = Color.prototype;

/**
 * @name module:ac-color.Color#_setColor
 * @function
 * @private
 *
 * @param {String} color
 */
proto._setColor = function(color) {
	this._color = {};

	if (isHex(color)) {
		this._color.hex = shortToLongHex(color);
		this._color.rgb = {
			color: hexToRgb(color)
		};
	}
	else if (isRgba(color)) {
		this._color.rgba = {
			color: color
		};
		var rgbaObject = this.rgbaObject();
		this._color.rgb = {
			color: 'rgb(' + rgbaObject.r + ', ' + rgbaObject.g + ', ' + rgbaObject.b + ')'
		};
	}
	else if (cssColorNames.nameToRgbObject[color]) {
		var rgbObject = cssColorNames.nameToRgbObject[color];
		this._color.rgb = {
			object: rgbObject,
			color: 'rgb(' + rgbObject.r + ', ' + rgbObject.g + ', ' + rgbObject.b + ')'
		};
	}
	else {
		this._color.rgb = {
			color: color
		};
	}
};

/**
 * @name module:ac-color.Color#rgb
 * @function
 *
 * @desc Returns the color as an rgb string.
 *
 * @returns {String} The color as an rgb string.
 */
proto.rgb = function () {
	return this._color.rgb.color;
};

/**
 * @name module:ac-color.Color#rgba
 * @function
 *
 * @desc Returns the color as an rgba string.
 *
 * @returns {String} The color as an rgba string.
 */
proto.rgba = function () {
	if (this._color.rgba === undefined) {
		var rgbObject = this.rgbObject();
		this._color.rgba = {
			color: 'rgba(' + rgbObject.r + ', ' + rgbObject.g + ', ' + rgbObject.b + ', 1)'
		};
	}
	return this._color.rgba.color;
};

/**
 * @name module:ac-color.Color#hex
 * @function
 *
 * @desc Returns the color as a hex string.
 *
 * @returns {String} The color as a hex string.
 */
proto.hex = function () {
	if (this._color.hex === undefined) {
		this._color.hex = rgbToHex.apply(this, this.rgbArray());
	}
	return this._color.hex;
};

/**
 * @name module:ac-color.Color#decimal
 * @function
 *
 * @desc Returns the color as a decimal number.
 *
 * @returns {Number} The color as a decimal number.
 */
proto.decimal = function () {
	if (this._color.decimal === undefined) {
		this._color.decimal = rgbToDecimal(this.rgb());
	}
	return this._color.decimal;
};

/**
 * @name module:ac-color.Color#cssName
 * @function
 *
 * @desc Returns the color as a CSS name.
 *
 * @returns {Number} The color as a CSS name.
 */
proto.cssName = function () {
	return cssColorNames.rgbToName[this.rgb()] || null;
};

/**
 * @name module:ac-color.Color#rgbArray
 * @function
 *
 * @desc Returns the color as an rgb array.
 *
 * @returns {Array} The color as an rgb array.
 */
proto.rgbArray = function () {
	if (this._color.rgb.array === undefined) {
		this._color.rgb.array = rgbToArray(this.rgb());
	}
	return this._color.rgb.array;
};

/**
 * @name module:ac-color.Color#rgbaArray
 * @function
 *
 * @desc Returns the color as an rgba array.
 *
 * @returns {Array} The color as an rgba array.
 */
proto.rgbaArray = function () {
	if (this._color.rgba === undefined) {
		this.rgba();
	}
	if (this._color.rgba.array === undefined) {
		this._color.rgba.array = rgbaToArray(this.rgba());
	}
	return this._color.rgba.array;
};

/**
 * @name module:ac-color.Color#rgbObject
 * @function
 *
 * @desc Returns the color as an rgb object with the properties: r, g, b.
 *
 * @returns {Object} The color as an rgb object with the properties: r, g, b.
 */
proto.rgbObject = function () {
	if (this._color.rgb.object === undefined) {
		this._color.rgb.object = rgbToObject(this.rgb());
	}
	return this._color.rgb.object;
};

/**
 * @name module:ac-color.Color#rgbaObject
 * @function
 *
 * @desc Returns the color as an rgba object with the properties: r, g, b, a.
 *
 * @returns {Object} The color as an rgba object with the properties: r, g, b, a.
 */
proto.rgbaObject = function () {
	if (this._color.rgba === undefined) {
		this.rgba();
	}
	if (this._color.rgba.object === undefined) {
		this._color.rgba.object = rgbaToObject(this.rgba());
	}
	return this._color.rgba.object;
};

/**
 * @name module:ac-color.Color#getRed
 * @function
 *
 * @desc Returns the value of the red channel of the color.
 *
 * @returns {Number} The value of the red channel of the color.
 */
proto.getRed = function () {
	return this.rgbObject().r;
};

/**
 * @name module:ac-color.Color#getGreen
 * @function
 *
 * @desc Returns the value of the green channel of the color.
 *
 * @returns {Number} The value of the green channel of the color.
 */
proto.getGreen = function () {
	return this.rgbObject().g;
};

/**
 * @name module:ac-color.Color#getBlue
 * @function
 *
 * @desc Returns the value of the blue channel of the color.
 *
 * @returns {Number} The value of the blue channel of the color.
 */
proto.getBlue = function () {
	return this.rgbObject().b;
};

/**
 * @name module:ac-color.Color#getAlpha
 * @function
 *
 * @desc Returns the value of the alpha channel of the color.
 *
 * @returns {Number} The value of the alpha channel of the color.
 */
proto.getAlpha = function () {
	if (this._color.rgba === undefined) {
		return 1;
	}
	return this.rgbaObject().a;
};

/**
 * @name module:ac-color.Color#setRed
 * @function
 *
 * @desc Sets the red channel of the color.
 *
 * @param {Number} red
 *        The integer value to set the red channel to between 0-255.
 *
 * @returns {Number} The new value of the red channel of the color.
 */
proto.setRed = function (red) {
	if (red !== this.getRed()) {
		this._setColor('rgba(' + red + ', ' + this.getGreen() + ', ' + this.getBlue() + ', ' + this.getAlpha() + ')');
	}
	return this.rgbObject().r;
};

/**
 * @name module:ac-color.Color#setGreen
 * @function
 *
 * @desc Sets the green channel of the color.
 *
 * @param {Number} green
 *        The integer value to set the green channel to between 0-255.
 *
 * @returns {Number} The new value of the green channel of the color.
 */
proto.setGreen = function (green) {
	if (green !== this.getGreen()) {
		this._setColor('rgba(' + this.getRed() + ', ' + green + ', ' + this.getBlue() + ', ' + this.getAlpha() + ')');
	}
	return this.rgbObject().g;
};

/**
 * @name module:ac-color.Color#setBlue
 * @function
 *
 * @desc Sets the blue channel of the color.
 *
 * @param {Number} blue
 *        The integer value to set the blue channel to between 0-255.
 *
 * @returns {Number} The new value of the blue channel of the color.
 */
proto.setBlue = function (blue) {
	if (blue !== this.getBlue()) {
		this._setColor('rgba(' + this.getRed() + ', ' + this.getGreen() + ', ' + blue + ', ' + this.getAlpha() + ')');
	}
	return this.rgbObject().b;
};

/**
 * @name module:ac-color.Color#setAlpha
 * @function
 *
 * @desc Sets the alpha channel of the color.
 *
 * @param {Number} alpha
 *        The float value to set the alpha channel to between 0-1.
 *
 * @returns {Number} The new value of the alpha channel of the color.
 */
proto.setAlpha = function (alpha) {
	if (alpha !== this.getAlpha()) {
		this._setColor('rgba(' + this.getRed() + ', ' + this.getGreen() + ', ' + this.getBlue() + ', ' + alpha + ')');
	}
	return this.rgbaObject().a;
};

/**
 * @name module:ac-color.Color#mix
 * @function
 *
 * @desc Mixes a color into the color at a percentage.
 *
 * @param {String} color
 *        The color to mix into the color as a rgb or hex string.
 *
 * @param {Number} percent
 *        The float value percent to mix the color in between 0-1.
 *
 * @returns {String} The new color as an rgb string.
 */
proto.mix = function (color, percent) {
	var rgbObject = rgbToObject(mixColors(this.rgb(), color, percent));
	this._setColor('rgba(' + rgbObject.r + ', ' + rgbObject.g + ', ' + rgbObject.b + ', ' + this.getAlpha() + ')');
	return this.rgb();
};

/**
 * @name module:ac-color.Color#clone
 * @function
 *
 * @desc Creates a copy of this color object.
 *
 * @returns {Color} The new instance of a Color object.
 */
proto.clone = function () {
	return new Color(this.rgb());
};

module.exports = Color;

// ac-color@1.1.0

},{"./helpers/cssColorNames":64,"./static/hexToRgb":67,"./static/isColor":68,"./static/isHex":69,"./static/isRgba":71,"./static/mixColors":72,"./static/rgbToArray":73,"./static/rgbToDecimal":74,"./static/rgbToHex":75,"./static/rgbToObject":78,"./static/rgbaToArray":79,"./static/rgbaToObject":80,"./static/shortToLongHex":81}],64:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

var rgbToName = {
	'rgb(240, 248, 255)': 'aliceblue',
	'rgb(250, 235, 215)': 'antiquewhite',
	'rgb(0, 0, 0)': 'black',
	'rgb(0, 0, 255)': 'blue',
	'rgb(0, 255, 255)': 'cyan',
	'rgb(0, 0, 139)': 'darkblue',
	'rgb(0, 139, 139)': 'darkcyan',
	'rgb(0, 100, 0)': 'darkgreen',
	'rgb(0, 206, 209)': 'darkturquoise',
	'rgb(0, 191, 255)': 'deepskyblue',
	'rgb(0, 128, 0)': 'green',
	'rgb(0, 255, 0)': 'lime',
	'rgb(0, 0, 205)': 'mediumblue',
	'rgb(0, 250, 154)': 'mediumspringgreen',
	'rgb(0, 0, 128)': 'navy',
	'rgb(0, 255, 127)': 'springgreen',
	'rgb(0, 128, 128)': 'teal',
	'rgb(25, 25, 112)': 'midnightblue',
	'rgb(30, 144, 255)': 'dodgerblue',
	'rgb(32, 178, 170)': 'lightseagreen',
	'rgb(34, 139, 34)': 'forestgreen',
	'rgb(46, 139, 87)': 'seagreen',
	'rgb(47, 79, 79)': 'darkslategray',
	'rgb(50, 205, 50)': 'limegreen',
	'rgb(60, 179, 113)': 'mediumseagreen',
	'rgb(64, 224, 208)': 'turquoise',
	'rgb(65, 105, 225)': 'royalblue',
	'rgb(70, 130, 180)': 'steelblue',
	'rgb(72, 61, 139)': 'darkslateblue',
	'rgb(72, 209, 204)': 'mediumturquoise',
	'rgb(75, 0, 130)': 'indigo',
	'rgb(85, 107, 47)': 'darkolivegreen',
	'rgb(95, 158, 160)': 'cadetblue',
	'rgb(100, 149, 237)': 'cornflowerblue',
	'rgb(102, 205, 170)': 'mediumaquamarine',
	'rgb(105, 105, 105)': 'dimgray',
	'rgb(106, 90, 205)': 'slateblue',
	'rgb(107, 142, 35)': 'olivedrab',
	'rgb(112, 128, 144)': 'slategray',
	'rgb(119, 136, 153)': 'lightslategray',
	'rgb(123, 104, 238)': 'mediumslateblue',
	'rgb(124, 252, 0)': 'lawngreen',
	'rgb(127, 255, 212)': 'aquamarine',
	'rgb(127, 255, 0)': 'chartreuse',
	'rgb(128, 128, 128)': 'gray',
	'rgb(128, 0, 0)': 'maroon',
	'rgb(128, 128, 0)': 'olive',
	'rgb(128, 0, 128)': 'purple',
	'rgb(135, 206, 250)': 'lightskyblue',
	'rgb(135, 206, 235)': 'skyblue',
	'rgb(138, 43, 226)': 'blueviolet',
	'rgb(139, 0, 139)': 'darkmagenta',
	'rgb(139, 0, 0)': 'darkred',
	'rgb(139, 69, 19)': 'saddlebrown',
	'rgb(143, 188, 143)': 'darkseagreen',
	'rgb(144, 238, 144)': 'lightgreen',
	'rgb(147, 112, 219)': 'mediumpurple',
	'rgb(148, 0, 211)': 'darkviolet',
	'rgb(152, 251, 152)': 'palegreen',
	'rgb(153, 50, 204)': 'darkorchid',
	'rgb(154, 205, 50)': 'yellowgreen',
	'rgb(160, 82, 45)': 'sienna',
	'rgb(165, 42, 42)': 'brown',
	'rgb(169, 169, 169)': 'darkgray',
	'rgb(173, 255, 47)': 'greenyellow',
	'rgb(173, 216, 230)': 'lightblue',
	'rgb(175, 238, 238)': 'paleturquoise',
	'rgb(176, 196, 222)': 'lightsteelblue',
	'rgb(176, 224, 230)': 'powderblue',
	'rgb(178, 34, 34)': 'firebrick',
	'rgb(184, 134, 11)': 'darkgoldenrod',
	'rgb(186, 85, 211)': 'mediumorchid',
	'rgb(188, 143, 143)': 'rosybrown',
	'rgb(189, 183, 107)': 'darkkhaki',
	'rgb(192, 192, 192)': 'silver',
	'rgb(199, 21, 133)': 'mediumvioletred',
	'rgb(205, 92, 92)': 'indianred',
	'rgb(205, 133, 63)': 'peru',
	'rgb(210, 105, 30)': 'chocolate',
	'rgb(210, 180, 140)': 'tan',
	'rgb(211, 211, 211)': 'lightgray',
	'rgb(216, 191, 216)': 'thistle',
	'rgb(218, 165, 32)': 'goldenrod',
	'rgb(218, 112, 214)': 'orchid',
	'rgb(219, 112, 147)': 'palevioletred',
	'rgb(220, 20, 60)': 'crimson',
	'rgb(220, 220, 220)': 'gainsboro',
	'rgb(221, 160, 221)': 'plum',
	'rgb(222, 184, 135)': 'burlywood',
	'rgb(224, 255, 255)': 'lightcyan',
	'rgb(230, 230, 250)': 'lavender',
	'rgb(233, 150, 122)': 'darksalmon',
	'rgb(238, 232, 170)': 'palegoldenrod',
	'rgb(238, 130, 238)': 'violet',
	'rgb(240, 255, 255)': 'azure',
	'rgb(240, 255, 240)': 'honeydew',
	'rgb(240, 230, 140)': 'khaki',
	'rgb(240, 128, 128)': 'lightcoral',
	'rgb(244, 164, 96)': 'sandybrown',
	'rgb(245, 245, 220)': 'beige',
	'rgb(245, 255, 250)': 'mintcream',
	'rgb(245, 222, 179)': 'wheat',
	'rgb(245, 245, 245)': 'whitesmoke',
	'rgb(248, 248, 255)': 'ghostwhite',
	'rgb(250, 250, 210)': 'lightgoldenrodyellow',
	'rgb(250, 240, 230)': 'linen',
	'rgb(250, 128, 114)': 'salmon',
	'rgb(253, 245, 230)': 'oldlace',
	'rgb(255, 228, 196)': 'bisque',
	'rgb(255, 235, 205)': 'blanchedalmond',
	'rgb(255, 127, 80)': 'coral',
	'rgb(255, 248, 220)': 'cornsilk',
	'rgb(255, 140, 0)': 'darkorange',
	'rgb(255, 20, 147)': 'deeppink',
	'rgb(255, 250, 240)': 'floralwhite',
	'rgb(255, 215, 0)': 'gold',
	'rgb(255, 105, 180)': 'hotpink',
	'rgb(255, 255, 240)': 'ivory',
	'rgb(255, 240, 245)': 'lavenderblush',
	'rgb(255, 250, 205)': 'lemonchiffon',
	'rgb(255, 182, 193)': 'lightpink',
	'rgb(255, 160, 122)': 'lightsalmon',
	'rgb(255, 255, 224)': 'lightyellow',
	'rgb(255, 0, 255)': 'magenta',
	'rgb(255, 228, 225)': 'mistyrose',
	'rgb(255, 228, 181)': 'moccasin',
	'rgb(255, 222, 173)': 'navajowhite',
	'rgb(255, 165, 0)': 'orange',
	'rgb(255, 69, 0)': 'orangered',
	'rgb(255, 239, 213)': 'papayawhip',
	'rgb(255, 218, 185)': 'peachpuff',
	'rgb(255, 192, 203)': 'pink',
	'rgb(255, 0, 0)': 'red',
	'rgb(255, 245, 238)': 'seashell',
	'rgb(255, 250, 250)': 'snow',
	'rgb(255, 99, 71)': 'tomato',
	'rgb(255, 255, 255)': 'white',
	'rgb(255, 255, 0)': 'yellow',
	'rgb(102, 51, 153)': 'rebeccapurple'
};

var nameToRgbObject = {
	aqua: {r: 0, g: 255, b: 255},
	aliceblue: {r: 240, g: 248, b: 255},
	antiquewhite: {r: 250, g: 235, b: 215},
	black: {r: 0, g: 0, b: 0},
	blue: {r: 0, g: 0, b: 255},
	cyan: {r: 0, g: 255, b: 255},
	darkblue: {r: 0, g: 0, b: 139},
	darkcyan: {r: 0, g: 139, b: 139},
	darkgreen: {r: 0, g: 100, b: 0},
	darkturquoise: {r: 0, g: 206, b: 209},
	deepskyblue: {r: 0, g: 191, b: 255},
	green: {r: 0, g: 128, b: 0},
	lime: {r: 0, g: 255, b: 0},
	mediumblue: {r: 0, g: 0, b: 205},
	mediumspringgreen: {r: 0, g: 250, b: 154},
	navy: {r: 0, g: 0, b: 128},
	springgreen: {r: 0, g: 255, b: 127},
	teal: {r: 0, g: 128, b: 128},
	midnightblue: {r: 25, g: 25, b: 112},
	dodgerblue: {r: 30, g: 144, b: 255},
	lightseagreen: {r: 32, g: 178, b: 170},
	forestgreen: {r: 34, g: 139, b: 34},
	seagreen: {r: 46, g: 139, b: 87},
	darkslategray: {r: 47, g: 79, b: 79},
	darkslategrey: {r: 47, g: 79, b: 79},
	limegreen: {r: 50, g: 205, b: 50},
	mediumseagreen: {r: 60, g: 179, b: 113},
	turquoise: {r: 64, g: 224, b: 208},
	royalblue: {r: 65, g: 105, b: 225},
	steelblue: {r: 70, g: 130, b: 180},
	darkslateblue: {r: 72, g: 61, b: 139},
	mediumturquoise: {r: 72, g: 209, b: 204},
	indigo: {r: 75, g: 0, b: 130},
	darkolivegreen: {r: 85, g: 107, b: 47},
	cadetblue: {r: 95, g: 158, b: 160},
	cornflowerblue: {r: 100, g: 149, b: 237},
	mediumaquamarine: {r: 102, g: 205, b: 170},
	dimgray: {r: 105, g: 105, b: 105},
	dimgrey: {r: 105, g: 105, b: 105},
	slateblue: {r: 106, g: 90, b: 205},
	olivedrab: {r: 107, g: 142, b: 35},
	slategray: {r: 112, g: 128, b: 144},
	slategrey: {r: 112, g: 128, b: 144},
	lightslategray: {r: 119, g: 136, b: 153},
	lightslategrey: {r: 119, g: 136, b: 153},
	mediumslateblue: {r: 123, g: 104, b: 238},
	lawngreen: {r: 124, g: 252, b: 0},
	aquamarine: {r: 127, g: 255, b: 212},
	chartreuse: {r: 127, g: 255, b: 0},
	gray: {r: 128, g: 128, b: 128},
	grey: {r: 128, g: 128, b: 128},
	maroon: {r: 128, g: 0, b: 0},
	olive: {r: 128, g: 128, b: 0},
	purple: {r: 128, g: 0, b: 128},
	lightskyblue: {r: 135, g: 206, b: 250},
	skyblue: {r: 135, g: 206, b: 235},
	blueviolet: {r: 138, g: 43, b: 226},
	darkmagenta: {r: 139, g: 0, b: 139},
	darkred: {r: 139, g: 0, b: 0},
	saddlebrown: {r: 139, g: 69, b: 19},
	darkseagreen: {r: 143, g: 188, b: 143},
	lightgreen: {r: 144, g: 238, b: 144},
	mediumpurple: {r: 147, g: 112, b: 219},
	darkviolet: {r: 148, g: 0, b: 211},
	palegreen: {r: 152, g: 251, b: 152},
	darkorchid: {r: 153, g: 50, b: 204},
	yellowgreen: {r: 154, g: 205, b: 50},
	sienna: {r: 160, g: 82, b: 45},
	brown: {r: 165, g: 42, b: 42},
	darkgray: {r: 169, g: 169, b: 169},
	darkgrey: {r: 169, g: 169, b: 169},
	greenyellow: {r: 173, g: 255, b: 47},
	lightblue: {r: 173, g: 216, b: 230},
	paleturquoise: {r: 175, g: 238, b: 238},
	lightsteelblue: {r: 176, g: 196, b: 222},
	powderblue: {r: 176, g: 224, b: 230},
	firebrick: {r: 178, g: 34, b: 34},
	darkgoldenrod: {r: 184, g: 134, b: 11},
	mediumorchid: {r: 186, g: 85, b: 211},
	rosybrown: {r: 188, g: 143, b: 143},
	darkkhaki: {r: 189, g: 183, b: 107},
	silver: {r: 192, g: 192, b: 192},
	mediumvioletred: {r: 199, g: 21, b: 133},
	indianred: {r: 205, g: 92, b: 92},
	peru: {r: 205, g: 133, b: 63},
	chocolate: {r: 210, g: 105, b: 30},
	tan: {r: 210, g: 180, b: 140},
	lightgray: {r: 211, g: 211, b: 211},
	lightgrey: {r: 211, g: 211, b: 211},
	thistle: {r: 216, g: 191, b: 216},
	goldenrod: {r: 218, g: 165, b: 32},
	orchid: {r: 218, g: 112, b: 214},
	palevioletred: {r: 219, g: 112, b: 147},
	crimson: {r: 220, g: 20, b: 60},
	gainsboro: {r: 220, g: 220, b: 220},
	plum: {r: 221, g: 160, b: 221},
	burlywood: {r: 222, g: 184, b: 135},
	lightcyan: {r: 224, g: 255, b: 255},
	lavender: {r: 230, g: 230, b: 250},
	darksalmon: {r: 233, g: 150, b: 122},
	palegoldenrod: {r: 238, g: 232, b: 170},
	violet: {r: 238, g: 130, b: 238},
	azure: {r: 240, g: 255, b: 255},
	honeydew: {r: 240, g: 255, b: 240},
	khaki: {r: 240, g: 230, b: 140},
	lightcoral: {r: 240, g: 128, b: 128},
	sandybrown: {r: 244, g: 164, b: 96},
	beige: {r: 245, g: 245, b: 220},
	mintcream: {r: 245, g: 255, b: 250},
	wheat: {r: 245, g: 222, b: 179},
	whitesmoke: {r: 245, g: 245, b: 245},
	ghostwhite: {r: 248, g: 248, b: 255},
	lightgoldenrodyellow: {r: 250, g: 250, b: 210},
	linen: {r: 250, g: 240, b: 230},
	salmon: {r: 250, g: 128, b: 114},
	oldlace: {r: 253, g: 245, b: 230},
	bisque: {r: 255, g: 228, b: 196},
	blanchedalmond: {r: 255, g: 235, b: 205},
	coral: {r: 255, g: 127, b: 80},
	cornsilk: {r: 255, g: 248, b: 220},
	darkorange: {r: 255, g: 140, b: 0},
	deeppink: {r: 255, g: 20, b: 147},
	floralwhite: {r: 255, g: 250, b: 240},
	fuchsia: {r: 255, g: 0, b: 255},
	gold: {r: 255, g: 215, b: 0},
	hotpink: {r: 255, g: 105, b: 180},
	ivory: {r: 255, g: 255, b: 240},
	lavenderblush: {r: 255, g: 240, b: 245},
	lemonchiffon: {r: 255, g: 250, b: 205},
	lightpink: {r: 255, g: 182, b: 193},
	lightsalmon: {r: 255, g: 160, b: 122},
	lightyellow: {r: 255, g: 255, b: 224},
	magenta: {r: 255, g: 0, b: 255},
	mistyrose: {r: 255, g: 228, b: 225},
	moccasin: {r: 255, g: 228, b: 181},
	navajowhite: {r: 255, g: 222, b: 173},
	orange: {r: 255, g: 165, b: 0},
	orangered: {r: 255, g: 69, b: 0},
	papayawhip: {r: 255, g: 239, b: 213},
	peachpuff: {r: 255, g: 218, b: 185},
	pink: {r: 255, g: 192, b: 203},
	red: {r: 255, g: 0, b: 0},
	seashell: {r: 255, g: 245, b: 238},
	snow: {r: 255, g: 250, b: 250},
	tomato: {r: 255, g: 99, b: 71},
	white: {r: 255, g: 255, b: 255},
	yellow: {r: 255, g: 255, b: 0},
	rebeccapurple: {r: 102, g: 51, b: 153}
};

module.exports = {
	rgbToName: rgbToName,
	nameToRgbObject: nameToRgbObject
};

// ac-color@1.1.0

},{}],65:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-color.Color#decimalToHex
 * @function
 * @static
 *
 * @desc Converts a decimal value to a hex value.
 *
 * @param {Number} decimal
 *
 * @returns {String}
 */
module.exports = function decimalToHex (decimal) {
	return '#' + (decimal).toString(16);
};

// ac-color@1.1.0

},{}],66:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-color.Color#hexToDecimal
 * @function
 * @static
 *
 * @desc Converts a hex value to a decimal value.
 *
 * @param {String} hex
 *
 * @returns {Number}
 */
module.exports = function hexToDecimal (hex) {
	return parseInt(hex.substr(1), 16);
};

// ac-color@1.1.0

},{}],67:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var shortToLongHex = require('./shortToLongHex');

/**
 * @name module:ac-color.Color#hexToRgb
 * @function
 * @static
 *
 * @desc Converts a hex value to a rgb value.
 *
 * @param {String} hex
 *
 * @returns {String}
 */
module.exports = function hexToRgb (hex) {
	hex = shortToLongHex(hex);
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? 'rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')' : null;
};

// ac-color@1.1.0

},{"./shortToLongHex":81}],68:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isRgb = require('./isRgb');
var isRgba = require('./isRgba');
var isHex = require('./isHex');

/**
 * @name module:ac-color.Color#isColor
 * @function
 * @static
 *
 * @desc Returns `true` when passed value is a hex, rgb or rgba string.
 *
 * @param {String} str
 *
 * @returns {Boolean}
 */
module.exports = function isColor (str) {
	return isHex(str) || isRgb(str) || isRgba(str);
};

// ac-color@1.1.0

},{"./isHex":69,"./isRgb":70,"./isRgba":71}],69:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-color.Color#isHex
 * @function
 * @static
 *
 * @desc Returns `true` when passed value is a hex string.
 *
 * @param {String} str
 *
 * @returns {Boolean}
 */
module.exports = function isHex (str) {
	var regex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
	return regex.test(str);
};

// ac-color@1.1.0

},{}],70:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-color.Color#isRgb
 * @function
 * @static
 *
 * @desc Returns `true` when passed value is a rgb string.
 *
 * @param {String} str
 *
 * @returns {Boolean}
 */
module.exports = function isRgb (str) {
	var regex = /^rgb\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\)$/;
	return regex.exec(str) !== null;
};

// ac-color@1.1.0

},{}],71:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-color.Color#isRgba
 * @function
 * @static
 *
 * @desc Returns `true` when passed value is a rgba string.
 *
 * @param {String} str
 *
 * @returns {Boolean}
 */
module.exports = function isRgba (str) {
	var regex = /^rgba\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;
	return regex.exec(str) !== null;
};

// ac-color@1.1.0

},{}],72:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isHex = require('./isHex');
var hexToRgb = require('./hexToRgb');
var rgbToObject = require('./rgbToObject');

/**
 * @name module:ac-color.Color#hexToDecimal
 * @function
 * @static
 *
 * @desc Mixes two colors at a percentage.
 *
 * @param {String} from
 * @param {String} to
 * @param {Number} percent
 *
 * @returns {String}
 */
module.exports = function mixColors (from, to, percent) {
	// ensure rgb
	from = isHex(from) ? hexToRgb(from) : from;
	to = isHex(to) ? hexToRgb(to) : to;
	
	// convert to object
	from = rgbToObject(from);
	to = rgbToObject(to);
	
	// set rgb
	var r = from.r + ((to.r - from.r) * percent);
	var g = from.g + ((to.g - from.g) * percent);
	var b = from.b + ((to.b - from.b) * percent);

	return 'rgb(' + Math.round(r) + ', ' + Math.round(g) + ', ' + Math.round(b) + ')';
};

// ac-color@1.1.0

},{"./hexToRgb":67,"./isHex":69,"./rgbToObject":78}],73:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var rgbToObject = require('./rgbToObject');

/**
 * @name module:ac-color.Color#rgbToArray
 * @function
 * @static
 *
 * @desc Converts an rgb value to an `Array`.
 *
 * @param {String} rgb
 *
 * @returns {Array}
 */
module.exports = function rgbToArray (rgb) {
	var o = rgbToObject(rgb);
	return [o.r, o.g, o.b];
};

// ac-color@1.1.0

},{"./rgbToObject":78}],74:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var hexToDecimal = require('./hexToDecimal');
var rgbToArray = require('./rgbToArray');
var rgbToHex = require('./rgbToHex');

/**
 * @name module:ac-color.Color#rgbToDecimal
 * @function
 * @static
 *
 * @desc Converts an rgb value to a decimal value.
 *
 * @param {String} rgb
 *
 * @returns {Number}
 */
module.exports = function rgbToDecimal (rgb) {
	var hex = rgbToHex.apply(this, rgbToArray(rgb));
	return hexToDecimal(hex);
};

// ac-color@1.1.0

},{"./hexToDecimal":66,"./rgbToArray":73,"./rgbToHex":75}],75:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-color.Color#hexToDecimal
 * @function
 * @static
 *
 * @desc Converts an rgb value to a hex value.
 *
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 *
 * @returns {String}
 */
module.exports = function rgbToHex (r, g, b) {
	return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// ac-color@1.1.0

},{}],76:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-color.Color#rgbToHsl
 * @function
 * @static
 *
 * @desc Converts an RGB color value to HSL. Conversion formula
 *       adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 *       Assumes r, g, and b are contained in the set [0, 255] and
 *       returns h, s, and l in the set [0, 1].
 *
 * @param   {Number}  r
 *          The red color value
 *          
 * @param   {Number}  g
 *          The green color value
 *          
 * @param   {Number}  b
 *          The blue color value
 *
 * @return  {Object} The HSL representation
 */
module.exports = function rgbToHsl (r, g, b) {
    if (arguments.length !== 3) {
        return false;
    }

    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var sum = max + min;
    var diff = max - min;
    
    var h;
    var s;
    var l = (sum / 2);

      if (max === min) {
          h = s = 0; // achromatic
      } else {

          s = l > 0.5 ? diff / (2 - max - min) : diff / sum;

          switch(max) {
              case r: h = (g - b) / diff ; break;
              case g: h = 2 + ( (b - r) / diff); break;
              case b: h = 4 + ( (r - g) / diff); break;
          }

        h *= 60;

        if (h < 0) {
            h +=360;
        }
    }

    return([h, Math.round(100*s), Math.round(100*l)]);
};

// ac-color@1.1.0

},{}],77:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-color.Color#rgbToHsv
 * @function
 * @static
 * 
 * @desc Converts an RGB color value to HSV. Conversion formula
 *       adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * 
 *     This should match the same values that Photohop provides
 *     for HSB for a color
 * 
 *     Assumes r, g, and b are contained in the set [0, 255] and
 *     returns h, s, and v in the set [0, 1].
 *
 * @param   {Number}  r
 *          The red color value
 *          
 * @param   {Number}  g
 *          The green color value
 *          
 * @param   {Number}  b
 *          The blue color value
 * 
 * @return  {Array} The HSV representation
 */
module.exports = function rgbToHsv (r, g, b) {
    if (arguments.length !== 3) {
        return false;
    }

    var red   = r / 255;
    var green = g / 255;
    var blue  = b / 255;

    var max = Math.max(red, green, blue);
    var min = Math.min(red, green, blue);

    var h;
    var s;
    var v = max;

    var delta = max - min;

    s = max === 0 ? 0 : delta / max;

    if (max === min){
        h = 0; // achromatic
    } else {
        switch (max){
            case red:   h = (green - blue) / delta + (green < blue ? 6 : 0); break;
            case green: h = (blue - red) / delta + 2; break;
            case blue:  h = (red - green) / delta + 4; break;
        }

        h /= 6;
    }

    return [Math.round(360*h), Math.round(100*s), Math.round(100*v)];
};

// ac-color@1.1.0

},{}],78:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-color.Color#rgbToObject
 * @function
 * @static
 *
 * @desc Converts an rgb value to an `Object` with properties `r`, `g` and `b`.
 *
 * @param {String} rgb
 *
 * @returns {Object}
 */
module.exports = function rgbToObject (rgb) {
	var regex = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/;
	var match = regex.exec(rgb);
	return {
		r: Number(match[1]),
		g: Number(match[2]),
		b: Number(match[3])
	};
};

// ac-color@1.1.0

},{}],79:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var rgbaToObject = require('./rgbaToObject');

/**
 * @name module:ac-color.Color#rgbaToArray
 * @function
 * @static
 *
 * @desc Converts an rgba value to an `Array`.
 *
 * @param {String} rgba
 *
 * @returns {Array}
 */
module.exports = function rgbaToArray (rgba) {
	var o = rgbaToObject(rgba);
	return [o.r, o.g, o.b, o.a];
};

// ac-color@1.1.0

},{"./rgbaToObject":80}],80:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-color.Color#rgbaToObject
 * @function
 * @static
 *
 * @desc Converts an rgba value to an `Object` with properties `r`, `g`, `b` and `a`.
 *
 * @param {String} rgba
 *
 * @returns {Object}
 */
module.exports = function rgbaToObject (rgba) {
	var regex = /rgba\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0(\.\d+)?|1(\.0+)?)\s*\)/;
	var match = regex.exec(rgba);
	return {
		r: Number(match[1]),
		g: Number(match[2]),
		b: Number(match[3]),
		a: Number(match[4])
	};
};

// ac-color@1.1.0

},{}],81:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-color.Color#shortToLongHex
 * @function
 * @static
 *
 * @desc Converts a short hex value to a long hex value.
 *
 * @param {String} hex
 *
 * @returns {String}
 */
module.exports = function shortToLongHex (hex) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return '#' + r + r + g + g + b + b;
	});
	return hex;
};

// ac-color@1.1.0

},{}],82:[function(require,module,exports){
if (!Array.prototype.every) {
/**
	Behaving in a similar yet opposite fashion to Array.prototype.some, Array.prototype.every tests whether
	all elements in the array pass the test implemented by the provided function. A return of false by the
	callback will immediately return false for the whole method.
	@param {Function} callback Function to test against. The callback should return a boolean value. Please
	note that 'falsy' values, e.g. no return, will evaluate to false.
	@param {Object} thisObj Object to use as `this` when executing the callback.
	@returns {Boolean} Returns true if all objects pass the test implemented by the provided function.
	@reference https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every
*/
	Array.prototype.every = function every(callback, thisObj) {
		var arrayObject = Object(this);
		// Mimic ES5 spec call for interanl method ToUint32()
		var len = arrayObject.length >>> 0;
		var i;

		// Callback must be a callable function
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}

		for (i = 0; i < len; i += 1) {
			if (i in arrayObject && !callback.call(thisObj, arrayObject[i], i, arrayObject)) {
				return false;
			}
		}
		return true;
	};
}
// ac-polyfills@2.2.2

},{}],83:[function(require,module,exports){
/** 
 * @module ac-easing
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	createBezier: require('./ac-easing/createBezier'),
	createPredefined: require('./ac-easing/createPredefined'),
	createStep: require('./ac-easing/createStep'),
	Ease: require('./ac-easing/Ease')
};

// ac-easing@1.1.1

},{"./ac-easing/Ease":84,"./ac-easing/createBezier":85,"./ac-easing/createPredefined":86,"./ac-easing/createStep":87}],84:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var ERR_FUNCTION_REQUIRE = 'Ease expects an easing function.';

/**
 * @name module:ac-easing.Ease
 * @class
 *
 * @param {Function} func
 *        An easing function.
 *
 * @param {String} [cssString=null]
 *        The CSS equivelant of the easing function.
 *        e.g. ease-in would be 'cubic-bezier(0.42, 0.0, 1.00, 1.0)'
 */
function Ease(func, cssString) {
	if (typeof func !== 'function') {
		throw new TypeError(ERR_FUNCTION_REQUIRE);
	}

	/**
	 * @name module:ac-easing.Ease#easingFunction
	 * @type {Function}
	 *
	 * @desc The easing function.
	 */
	this.easingFunction = func;

	/**
	 * @name module:ac-easing.Ease#cssString
	 * @type {String}
	 * 
	 * @desc The CSS equivilant of the easing function.
	 */
	this.cssString = cssString || null;
}

var proto = Ease.prototype;

/**
 * @name module:ac-easing.Ease#getValue
 * @function
 *
 * @desc Returns the eased equivilant of the number passed.
 *
 * @param {Number} value
 *        A number between 0-1.
 *
 * @returns {Number} The eased equivilant of the number passed.
 */
proto.getValue = function (value) {
	return this.easingFunction(value, 0, 1, 1);
};

module.exports = Ease;

// ac-easing@1.1.1

},{}],85:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
require('@marcom/ac-polyfills/Array/prototype.every');

/** @ignore */
var Ease = require('./Ease');
var KeySpline = require('./helpers/KeySpline');

/** @ignore */
var ERR_BEZIER_VALUES = 'Bezier curve expects exactly four (4) numbers. Given: ';

/**
 * @name module:ac-easing.createBezier
 *
 * @function
 *
 * @desc Create an easing function from a set of bezier curve points.
 *
 * @param {Number} x1
 *        The x-coordinate of the first Bézier control point.
 *
 * @param {Number} y1
 *        The y-coordinate of the first Bézier control point.
 *
 * @param {Number} x2
 *        The x-coordinate of the second Bézier control point.
 *
 * @param {Number} y2
 *        The y-coordinate of the second Bézier control point.
 *
 * @returns {Ease} A new instance of an Ease object.
 */
module.exports = function createBezier (x1, y1, x2, y2) {
	var pts = Array.prototype.slice.call(arguments);
	var allNums = pts.every(function (pt) {
		return (typeof pt === 'number');
	});

	if (pts.length !== 4 || !allNums) {
		throw new TypeError(ERR_BEZIER_VALUES + pts);
	}

	var keySpline = new KeySpline(x1, y1, x2, y2);

	var easingFn = function(time, begin, change, duration) {
		return keySpline.get(time / duration) * change + begin;
	};

	var cssString = 'cubic-bezier(' + pts.join(', ') + ')';

	return new Ease(easingFn, cssString);
};

// ac-easing@1.1.1

},{"./Ease":84,"./helpers/KeySpline":88,"@marcom/ac-polyfills/Array/prototype.every":82}],86:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var createStep = require('./createStep');
var cssAliases = require('./helpers/cssAliases');
var easingFunctions = require('./helpers/easingFunctions');

/** @ignore */
var Ease = require('./Ease');

/** @ignore */
var ERR_PREDEFINED = 'Easing function "%TYPE%" not recognized among the following: ' + Object.keys(easingFunctions).join(', ');

/**
 * @name module:ac-easing.createPredefined
 *
 * @function
 * 
 * @desc Create an easing function from a set of predefined.
 *
 * @param {String} type
 *        The name of the ease, e.g. 'easeIn'.
 *
 * @returns {Ease} A new instance of an Ease object.
 */
module.exports = function createPredefined (type) {
	var easingFn;

	if (type === 'step-start') {
		return createStep(1, 'start');
	}
	else if (type === 'step-end') {
		return createStep(1, 'end');
	}
	else {
		easingFn = easingFunctions[type];
	}

	if (!easingFn) {
		throw new Error(ERR_PREDEFINED.replace('%TYPE%', type));
	}

	return new Ease(easingFn, cssAliases[type]);
};

// ac-easing@1.1.1

},{"./Ease":84,"./createStep":87,"./helpers/cssAliases":89,"./helpers/easingFunctions":90}],87:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var Ease = require('./Ease');

/** @ignore */
var ERR_STEP_TYPE = 'Step function expects a numeric value greater than zero. Given: ';
var ERR_STEP_DIRECTION = 'Step function direction must be either "start" or "end" (default). Given: ';

/**
 * @name module:ac-easing.createStep
 *
 * @function
 * 
 * @desc Create a step easing function.
 *
 * @param {Number} steps
 *        Amount of steps.
 *
 * @param {String} [direction='end']
 *        Direction of ease.
 *
 * @returns {Ease} A new instance of an Ease object.
 */
module.exports = function createStep (steps, direction) {
	direction = direction || 'end';

	if (typeof steps !== 'number' || steps < 1) {
		throw new TypeError(ERR_STEP_TYPE + steps);
	}

	if (direction !== 'start' && direction !== 'end') {
		throw new TypeError(ERR_STEP_DIRECTION + direction);
	}

	var easingFn = function (time, begin, change, duration) {
		var length = change / steps;
		var step = Math[(direction === 'start') ? 'floor' : 'ceil'](time / duration * steps);
		return begin + length * step;
	};

	var cssString = 'steps(' + steps + ', ' + direction + ')';

	return new Ease(easingFn, cssString);
};

// ac-easing@1.1.1

},{"./Ease":84}],88:[function(require,module,exports){
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
/**
* KeySpline - use bezier curve for transition easing function
* is inspired from Firefox's nsSMILKeySpline.cpp
* Usage:
* var spline = new KeySpline(0.25, 0.1, 0.25, 1.0)
* spline.get(x) => returns the easing value | x must be in [0, 1] range
*/

/* jshint newcap:false */


function KeySpline (mX1, mY1, mX2, mY2) {

  this.get = function(aX) {
    if (mX1 === mY1 && mX2 === mY2) { return aX; } // linear
    return CalcBezier(GetTForX(aX), mY1, mY2);
  };

  function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
  function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
  function C(aA1)      { return 3.0 * aA1; }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function CalcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2)*aT + B(aA1, aA2))*aT + C(aA1))*aT;
  }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function GetSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2)*aT*aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function GetTForX(aX) {
    // Newton raphson iteration
    var aGuessT = aX;
    for (var i = 0; i < 4; ++i) {
      var currentSlope = GetSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) { return aGuessT; }
      var currentX = CalcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }
}

module.exports = KeySpline;

// ac-easing@1.1.1

},{}],89:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

var aliases = {

	'linear': 'cubic-bezier(0, 0, 1, 1)',
	
	// ease
	'ease':        'cubic-bezier(0.25, 0.1, 0.25, 1)',
	'ease-in':     'cubic-bezier(0.42, 0, 1, 1)',
	'ease-out':    'cubic-bezier(0, 0, 0.58, 1)',
	'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
	
	// cubic
	'ease-in-cubic':     'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
	'ease-out-cubic':    'cubic-bezier(0.215, 0.61, 0.355, 1)',
	'ease-in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1)',

	// quad
	'ease-in-quad':     'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
	'ease-out-quad':    'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
	'ease-in-out-quad': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
	
	// quart
	'ease-in-quart':     'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
	'ease-out-quart':    'cubic-bezier(0.165, 0.84, 0.44, 1)',
	'ease-in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',

	// quint
	'ease-in-quint':     'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
	'ease-out-quint':    'cubic-bezier(0.23, 1, 0.32, 1)',
	'ease-in-out-quint': 'cubic-bezier(0.86, 0, 0.07, 1)',

	// sine
	'ease-in-sine':     'cubic-bezier(0.47, 0, 0.745, 0.715)',
	'ease-out-sine':    'cubic-bezier(0.39, 0.575, 0.565, 1)',
	'ease-in-out-sine': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

	// expo
	'ease-in-expo':     'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
	'ease-out-expo':    'cubic-bezier(0.19, 1, 0.22, 1)',
	'ease-in-out-expo': 'cubic-bezier(1, 0, 0, 1)',

	// circ
	'ease-in-circ':     'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
	'ease-out-circ':    'cubic-bezier(0.075, 0.82, 0.165, 1)',
	'ease-in-out-circ': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',

	// back
	'ease-in-back':     'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
	'ease-out-back':    'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
	'ease-in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
	
};

// ease
aliases['easeIn'] = aliases['ease-in'];
aliases['easeOut'] = aliases['ease-out'];
aliases['easeInOut'] = aliases['ease-in-out'];

// cubic
aliases['easeInCubic'] = aliases['ease-in-cubic'];
aliases['easeOutCubic'] = aliases['ease-out-cubic'];
aliases['easeInOutCubic'] = aliases['ease-in-out-cubic'];

// quad
aliases['easeInQuad'] = aliases['ease-in-quad'];
aliases['easeOutQuad'] = aliases['ease-out-quad'];
aliases['easeInOutQuad'] = aliases['ease-in-out-quad'];

// quart
aliases['easeInQuart'] = aliases['ease-in-quart'];
aliases['easeOutQuart'] = aliases['ease-out-quart'];
aliases['easeInOutQuart'] = aliases['ease-in-out-quart'];

// quint
aliases['easeInQuint'] = aliases['ease-in-quint'];
aliases['easeOutQuint'] = aliases['ease-out-quint'];
aliases['easeInOutQuint'] = aliases['ease-in-out-quint'];

// sine
aliases['easeInSine'] = aliases['ease-in-sine'];
aliases['easeOutSine'] = aliases['ease-out-sine'];
aliases['easeInOutSine'] = aliases['ease-in-out-sine'];

// expo
aliases['easeInExpo'] = aliases['ease-in-expo'];
aliases['easeOutExpo'] = aliases['ease-out-expo'];
aliases['easeInOutExpo'] = aliases['ease-in-out-expo'];

// circ
aliases['easeInCirc'] = aliases['ease-in-circ'];
aliases['easeOutCirc'] = aliases['ease-out-circ'];
aliases['easeInOutCirc'] = aliases['ease-in-out-circ'];

// back
aliases['easeInBack'] = aliases['ease-in-back'];
aliases['easeOutBack'] = aliases['ease-out-back'];
aliases['easeInOutBack'] = aliases['ease-in-out-back'];

module.exports = aliases;

// ac-easing@1.1.1

},{}],90:[function(require,module,exports){
'use strict';

/** @ignore */
var createBezier = require('../createBezier');

var ease = createBezier(0.25, 0.1, 0.25, 1.0).easingFunction;
var easeIn = createBezier(0.42, 0.0, 1.00, 1.0).easingFunction;
var easeOut = createBezier(0.00, 0.0, 0.58, 1.0).easingFunction;
var easeInOut = createBezier(0.42, 0.0, 0.58, 1.0).easingFunction;

var linear = function (time, begin, change, duration) {
	return change * time / duration + begin;
};

var easeInQuad = function (time, begin, change, duration) {
	return change * (time /= duration) * time + begin;
};

var easeOutQuad = function (time, begin, change, duration) {
	return -change * (time /= duration) * (time - 2) + begin;
};

var easeInOutQuad = function (time, begin, change, duration) {
	if ((time /= duration / 2) < 1) {
		return change / 2 * time * time + begin;
	}
	return -change / 2 * ((--time) * (time - 2) - 1) + begin;
};

var easeInCubic = function (time, begin, change, duration) {
	return change * (time /= duration) * time * time + begin;
};

var easeOutCubic = function (time, begin, change, duration) {
	return change * ((time = time / duration - 1) * time * time + 1) + begin;
};

var easeInOutCubic = function (time, begin, change, duration) {
	if ((time /= duration / 2) < 1) {
		return change / 2 * time * time * time + begin;
	}
	return change / 2 * ((time -= 2) * time * time + 2) + begin;
};

var easeInQuart = function (time, begin, change, duration) {
	return change * (time /= duration) * time * time * time + begin;
};

var easeOutQuart = function (time, begin, change, duration) {
	return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
};

var easeInOutQuart = function (time, begin, change, duration) {
	if ((time /= duration / 2) < 1) {
		return change / 2 * time * time * time * time + begin;
	}
	return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;
};

var easeInQuint = function (time, begin, change, duration) {
	return change * (time /= duration) * time * time * time * time + begin;
};

var easeOutQuint = function (time, begin, change, duration) {
	return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
};

var easeInOutQuint = function (time, begin, change, duration) {
	if ((time /= duration / 2) < 1) {
		return change / 2 * time * time * time * time * time + begin;
	}
	return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;
};

var easeInSine = function (time, begin, change, duration) {
	return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
};

var easeOutSine = function (time, begin, change, duration) {
	return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
};

var easeInOutSine = function (time, begin, change, duration) {
	return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
};

var easeInExpo = function (time, begin, change, duration) {
	return (time === 0) ? begin : change * Math.pow(2, 10 * (time / duration - 1)) + begin;
};

var easeOutExpo = function (time, begin, change, duration) {
	return (time === duration) ? begin + change : change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
};

var easeInOutExpo = function (time, begin, change, duration) {
	if (time === 0) {
		return begin;
	}
	else if (time === duration) {
		return begin + change;
	}
	else if ((time /= duration / 2) < 1) {
		return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
	}
	return change / 2 * (-Math.pow(2, -10 * --time) + 2) + begin;
};

var easeInCirc = function (time, begin, change, duration) {
	return -change * (Math.sqrt(1 - (time /= duration) * time) - 1) + begin;
};

var easeOutCirc = function (time, begin, change, duration) {
	return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
};

var easeInOutCirc = function (time, begin, change, duration) {
	if ((time /= duration / 2) < 1) {
		return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
	}
	return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;
};

var easeInElastic = function (time, begin, change, duration) {
	var shootover = 1.70158;
	var period = 0;
	var amplitude = change;
	if (time === 0) {
		return begin;
	}
	else if ((time /= duration) === 1) {
		return begin + change;
	}
	if (!period) {
		period = duration * 0.3;
	}
	if (amplitude < Math.abs(change)) {
		amplitude = change;
		shootover = period / 4;
	}
	else {
		shootover = period / (2 * Math.PI) * Math.asin(change / amplitude);
	}
	return -(amplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - shootover) * (2 * Math.PI) / period)) + begin;
};

var easeOutElastic = function (time, begin, change, duration) {
	var shootover = 1.70158;
	var period = 0;
	var amplitude = change;
	if (time === 0) {
		return begin;
	}
	else if ((time /= duration) === 1) {
		return begin + change;
	}
	if (!period) {
		period = duration * 0.3;
	}
	if (amplitude < Math.abs(change)) {
		amplitude = change;
		shootover = period / 4;
	}
	else {
		shootover = period / (2 * Math.PI) * Math.asin(change / amplitude);
	}
	return amplitude * Math.pow(2, -10 * time) * Math.sin((time * duration - shootover) * (2 * Math.PI) / period) + change + begin;
};

var easeInOutElastic = function (time, begin, change, duration) {
	var shootover = 1.70158;
	var period = 0;
	var amplitude = change;
	if (time === 0) {
		return begin;
	}
	else if ((time /= duration / 2) === 2) {
		return begin + change;
	}
	if (!period) {
		period = duration * (0.3 * 1.5);
	}
	if (amplitude < Math.abs(change)) {
		amplitude = change;
		shootover = period / 4;
	}
	else {
		shootover = period / (2 * Math.PI) * Math.asin(change / amplitude);
	}
	if (time < 1) {
		return -0.5 * (amplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - shootover) * (2 * Math.PI) / period)) + begin;
	}
	return amplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - shootover) * (2 * Math.PI) / period) * 0.5 + change + begin;
};


var easeInBack = function (time, begin, change, duration, shootover) {
	if (shootover === undefined) {
		shootover = 1.70158;
	}
	return change * (time /= duration) * time * ((shootover + 1) * time - shootover) + begin;
};

var easeOutBack = function (time, begin, change, duration, shootover) {
	if (shootover === undefined) {
		shootover = 1.70158;
	}
	return change * ((time = time / duration - 1) * time * ((shootover + 1) * time + shootover) + 1) + begin;
};

var easeInOutBack = function (time, begin, change, duration, shootover) {
	if (shootover === undefined) {
		shootover = 1.70158;
	}
	if ((time /= duration / 2) < 1) {
		return change / 2 * (time * time * (((shootover *= (1.525)) + 1) * time - shootover)) + begin;
	}
	return change / 2 * ((time -= 2) * time * (((shootover *= (1.525)) + 1) * time + shootover) + 2) + begin;
};

var easeOutBounce = function (time, begin, change, duration) {
	if ((time /= duration) < (1 / 2.75)) {
		return change * (7.5625 * time * time) + begin;
	}
	else if (time < (2 / 2.75)) {
		return change * (7.5625 * (time -= (1.5 / 2.75)) * time + 0.75) + begin;
	}
	else if (time < (2.5 / 2.75)) {
		return change * (7.5625 * (time -= (2.25 / 2.75)) * time + 0.9375) + begin;
	}
	return change * (7.5625 * (time -= (2.625 / 2.75)) * time + 0.984375) + begin;
};

var easeInBounce = function (time, begin, change, duration) {
	return change - easeOutBounce(duration - time, 0, change, duration) + begin;
};

var easeInOutBounce = function (time, begin, change, duration) {
	if (time < duration / 2) {
		return easeInBounce(time * 2, 0, change, duration) * 0.5 + begin;
	}
	return easeOutBounce(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
};

/**
 * @name module:ac-easing.easingFunctions
 * @function
 * @param {Float} time 
 *        Current position in time. Can be frames/seconds/milliseconds. ('t' in original Penner functions)
 * @param {Float} begin
 *        Start value. ('b' in original Penner functions)
 * @param {Float} change
 *        Change in value. ('c' in original Penner functions)
 * @param {Float} duration
 *        Duration. Can be frames/seconds/milliseconds. ('d' in original Penner functions)
 * @param {Float} [shootover=1.70158]
 *        Functions with 'Back' in their names take an additional optional parameter 'shootover', which
 *        controls the amount of overshoot. A higher value means greater overshoot. 'shootover' has a default
 *        value of 1.70158, which produces an overshoot of 10 percent. shootover==0 produces cubic easing with
 *        no overshoot. ('s' in original Penner functions)
 * @returns {Function}
 */
module.exports = {
	
	'linear': linear,

	// ease
	'ease':        ease,
	'easeIn':      easeIn,
	'ease-in':     easeIn,
	'easeOut':     easeOut,
	'ease-out':    easeOut,
	'easeInOut':   easeInOut,
	'ease-in-out': easeInOut,

	// cubic
	'easeInCubic':       easeInCubic,
	'ease-in-cubic':     easeInCubic,
	'easeOutCubic':      easeOutCubic,
	'ease-out-cubic':    easeOutCubic,
	'easeInOutCubic':    easeInOutCubic,
	'ease-in-out-cubic': easeInOutCubic,

	// quad
	'easeInQuad':       easeInQuad,
	'ease-in-quad':     easeInQuad,
	'easeOutQuad':      easeOutQuad,
	'ease-out-quad':    easeOutQuad,
	'easeInOutQuad':    easeInOutQuad,
	'ease-in-out-quad': easeInOutQuad,

	// quart
	'easeInQuart':       easeInQuart,
	'ease-in-quart':     easeInQuart,
	'easeOutQuart':      easeOutQuart,
	'ease-out-quart':    easeOutQuart,
	'easeInOutQuart':    easeInOutQuart,
	'ease-in-out-quart': easeInOutQuart,

	// quint
	'easeInQuint':       easeInQuint,
	'ease-in-quint':     easeInQuint,
	'easeOutQuint':      easeOutQuint,
	'ease-out-quint':    easeOutQuint,
	'easeInOutQuint':    easeInOutQuint,
	'ease-in-out-quint': easeInOutQuint,

	// sine
	'easeInSine':       easeInSine,
	'ease-in-sine':     easeInSine,
	'easeOutSine':      easeOutSine,
	'ease-out-sine':    easeOutSine,
	'easeInOutSine':    easeInOutSine,
	'ease-in-out-sine': easeInOutSine,

	// expo
	'easeInExpo':       easeInExpo,
	'ease-in-expo':     easeInExpo,
	'easeOutExpo':      easeOutExpo,
	'ease-out-expo':    easeOutExpo,
	'easeInOutExpo':    easeInOutExpo,
	'ease-in-out-expo': easeInOutExpo,

	// circ
	'easeInCirc':       easeInCirc,
	'ease-in-circ':     easeInCirc,
	'easeOutCirc':      easeOutCirc,
	'ease-out-circ':    easeOutCirc,
	'easeInOutCirc':    easeInOutCirc,
	'ease-in-out-circ': easeInOutCirc,

	// back
	'easeInBack':       easeInBack,
	'ease-in-back':     easeInBack,
	'easeOutBack':      easeOutBack,
	'ease-out-back':    easeOutBack,
	'easeInOutBack':    easeInOutBack,
	'ease-in-out-back': easeInOutBack,
	
	// elastic
	'easeInElastic':       easeInElastic,
	'ease-in-elastic':     easeInElastic,
	'easeOutElastic':      easeOutElastic,
	'ease-out-elastic':    easeOutElastic,
	'easeInOutElastic':    easeInOutElastic,
	'ease-in-out-elastic': easeInOutElastic,

	// bounce
	'easeInBounce':       easeInBounce,
	'ease-in-bounce':     easeInBounce,
	'easeOutBounce':      easeOutBounce,
	'ease-out-bounce':    easeOutBounce,
	'easeInOutBounce':    easeInOutBounce,
	'ease-in-out-bounce': easeInOutBounce
	
};

// ac-easing@1.1.1

},{"../createBezier":85}],91:[function(require,module,exports){
/** 
 * @module ac-event-emitter-micro
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	EventEmitterMicro: require('./ac-event-emitter-micro/EventEmitterMicro')
};

// ac-event-emitter-micro@1.1.0

},{"./ac-event-emitter-micro/EventEmitterMicro":92}],92:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';


/**
 * A performance focused minimal event emitter.
 * @constructor
 * @class
 */
function EventEmitterMicro() {
	this._events = {};
}
/** @lends EventEmitterMicro.prototype */
var proto = EventEmitterMicro.prototype;

/**
 * Adds an event listener, which will fire `callback` when `eventName` is triggered
 * @param {String} eventName
 * @param {Function} callback
 */
proto.on = function(eventName, callback) {
	this._events[eventName] = this._events[eventName] || [];
	this._events[eventName].unshift(callback);
};

/**
 * Same as `on` however event will be removed after first trigger
 * @param {String} eventName
 * @param {Function} callback
 */
proto.once = function(eventName, callback){
	var that = this;
	function fn(data){
		that.off(eventName, fn);

		if(data !== undefined) callback(data);
		else callback();
	}

	this.on(eventName, fn);
};

/**
 * Removes an event listener, listening for `eventName` with `callback
 * @param {String} eventName
 * @param {Function} callback
 */
proto.off = function(eventName, callback) {
	if (!this.has(eventName)) return;

	var index = this._events[eventName].indexOf(callback);
	if( index === -1 ) return;

	this._events[eventName].splice(index, 1);
};

/**
 * Dispatches an event with the name `eventName`, optionally passing in additional data
 * @param {String} eventName
 * @param {*=} data	Optional data that will be passed to the callback -
 */
proto.trigger = function(eventName, data) {
	if (!this.has(eventName)) return;

	for(var i = this._events[eventName].length -1; i >= 0 ; i--) {
		// Don't pass `undefined` to functions which don't expect a value
		if(data !== undefined) this._events[eventName][i](data);
		else this._events[eventName][i]();
	}
};

/**
 * Returns true if there are any listeners for `eventName`
 * @param {String} eventName
 */
proto.has = function(eventName) {
	if (eventName in this._events === false || this._events[eventName].length === 0) {
		return false;
	}

	return true;
};

/**
 * Clears this EventEmitterMicro instance for GC
 * It is no longer usable once this is called
 */
proto.destroy = function(){
	for(var eventName in this._events) {
		this._events[eventName] = null;
	}
	this._events = null;
};

/** @type {EventEmitterMicro} */
module.exports = EventEmitterMicro;

// ac-event-emitter-micro@1.1.0

},{}],93:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

require('@marcom/ac-polyfills/Array/isArray');

/** @ignore */
var extend = require('./extend');
var hasOwnProp = Object.prototype.hasOwnProperty;
var deepClone = function (dest, source) {
	var prop;
	for (prop in source) {
		// Anything that does not prototype Object will not have this method
		if (hasOwnProp.call(source, prop)) {
			if (source[prop] === null) {
				dest[prop] = null;
			}
			else if (typeof source[prop] === 'object') {
				dest[prop] = Array.isArray(source[prop]) ? [] : {};
				deepClone(dest[prop], source[prop]);
			}
			else {
				dest[prop] = source[prop];
			}
		}
	}
	return dest;
};

/**
 * @name module:ac-object.clone
 *
 * @function
 *
 * @desc Create a new Object that has the same properties as the original.
 *
 * @param {Object} object
 *        The Object to make a clone of.
 *
 * @param {Boolean} [deep=false]
 *        If `true` the clone will be deep. Defaults to shallow.
 *
 * @returns {Object} The cloned object.
 */
module.exports = function clone (object, deep) {
	if (deep) {
		return deepClone({}, object);
	}
	return extend({}, object);
};

// ac-object@1.2.0

},{"./extend":96,"@marcom/ac-polyfills/Array/isArray":102}],94:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var F = function () {};

/**
 * @name module:ac-object.create
 *
 * @function
 *
 * @desc Create a new Object who’s prototype is the object passed
 *
 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 *
 * @param {Object} proto
 *        The prototype for the new Object
 *
 * @returns {Object} The new Object
 */
module.exports = function create(proto) {
	// Don’t support second argument because it is not possible to accurately polyfill
	if (arguments.length > 1) {
		throw new Error('Second argument not supported');
	}

	// Prototype object is required
	if (proto === null || typeof proto !== 'object') {
		throw new TypeError('Object prototype may only be an Object.');
	}

	// If native Object.create exists, use it!
	if (typeof Object.create === 'function') {
		return Object.create(proto);

	// Otherwise create a new Object F with the prototype provided assigned to it
	} else {
		F.prototype = proto;
		return new F();
	}
};

// ac-object@1.2.0

},{}],95:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var extend = require('./extend');

/**
 * @name module:ac-object.defaults
 *
 * @function
 * 
 * @desc Combines defaults and options into a new object and returns it.
 *
 * @param {Object} defaultsObj
 *        The defaults object.
 *
 * @param {Object} options
 *        The options object.
 *
 * @returns {Object} An object resulting from the combination of defaults and options.
 */
module.exports = function defaults (defaultsObj, options) {
	if (typeof defaultsObj !== 'object'){
		throw new TypeError('defaults: must provide a defaults object');
	}
	options = options || {};
	if (typeof options !== 'object'){
		throw new TypeError('defaults: options must be a typeof object');
	}
	return extend({}, defaultsObj, options);
};

// ac-object@1.2.0

},{"./extend":96}],96:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

require('@marcom/ac-polyfills/Array/prototype.forEach');

/** @ignore */
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * @name module:ac-object.extend
 *
 * @function
 *
 * @desc Add properties from one object into another. Not a deep copy.
 *
 * @param {Object} destination
 *        The object where the properties will end up. Properties in this Object
 *        that have the same key as properties in the source object will be
 *        overwritten with the source property’s value. If destination is not
 *        provided a blank object is created.
 *
 * @param {Object} source
 *        The properties to add / overwrite in the destination Object. An infinite
 *        number of source paramaters may be passed.
 *
 * @returns {Object} The extended object.
 */
module.exports = function extend () {
	var args;
	var dest;

	if (arguments.length < 2) {
		args = [{}, arguments[0]];
	} else {
		args = [].slice.call(arguments);
	}

	dest = args.shift();

	args.forEach(function (source) {
		if (source != null) {
			for (var property in source) {
				// Anything that does not prototype Object will not have this method
				if (hasOwnProp.call(source, property)) {
					dest[property] = source[property];
				}
			}
		}
	});

	return dest;
};

// ac-object@1.2.0

},{"@marcom/ac-polyfills/Array/prototype.forEach":103}],97:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * @name module:ac-object.getPrototypeOf
 *
 * @function
 * 
 * @desc Returns the prototype (i.e. the internal [[Prototype]]) of the specified object.
 *
 * @param {Object} obj
 *        The object whose prototype is to be returned.
 *
 * @returns {Object} The prototype of the specified object.
 */
module.exports = function getPrototypeOf (obj) {
	if (Object.getPrototypeOf) {
		return Object.getPrototypeOf(obj);
	}
	else {
		if (typeof obj !== 'object') {
			throw new Error('Requested prototype of a value that is not an object.');
		}
		else if (typeof this.__proto__ === 'object') {
			return obj.__proto__;
		}
		else {
			var constructor = obj.constructor;
			var oldConstructor;
			if (hasOwnProp.call(obj, 'constructor')) {
				oldConstructor = constructor;
				// reset constructor
				if (!(delete obj.constructor)) {
					// can't delete obj.constructor, return null
					return null;
				}
				// get real constructor
				constructor = obj.constructor;
				// restore constructor
				obj.constructor = oldConstructor;
			}
			// needed for IE
			return constructor ? constructor.prototype : null;
		}
	}
};

// ac-object@1.2.0

},{}],98:[function(require,module,exports){
/**
 * @module ac-object
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	clone: require('./clone'),
	create: require('./create'),
	defaults: require('./defaults'),
	extend: require('./extend'),
	getPrototypeOf: require('./getPrototypeOf'),
	isDate: require('./isDate'),
	isEmpty: require('./isEmpty'),
	isRegExp: require('./isRegExp'),
	toQueryParameters: require('./toQueryParameters')
};

// ac-object@1.2.0

},{"./clone":93,"./create":94,"./defaults":95,"./extend":96,"./getPrototypeOf":97,"./isDate":99,"./isEmpty":100,"./isRegExp":101,"./toQueryParameters":105}],99:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-object.isDate
 *
 * @function
 * 
 * @desc Test an Object to see if it is an instance of the Date constructor or not.
 *
 * @param {Object} date
 *        The Object to test.
 *
 * @returns {Boolean} If the Object is a Date or not.
 */
module.exports = function isDate (date) {
	return Object.prototype.toString.call(date) === '[object Date]';
};

// ac-object@1.2.0

},{}],100:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * @name module:ac-object.isEmpty
 *
 * @function
 * 
 * @desc Check if an empty object.
 *
 * @param {Object} object
 *        The Object to check if empty.
 *
 * @returns {Boolean} Return true if and only if object is empty ({}).
 */
module.exports = function isEmpty (object) {
	var prop;

	if (typeof object !== 'object') {
		throw new TypeError('ac-base.Object.isEmpty : Invalid parameter - expected object');
	}

	for (prop in object) {
		if (hasOwnProp.call(object, prop)) {
			return false;
		}
	}

	return true;
};

// ac-object@1.2.0

},{}],101:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-object.isRegExp
 *
 * @function
 * 
 * @desc Test whether or not an Object is a Regular Expression.
 *
 * @param {Object} obj
 *        Object to test whether or not it is a Regular Expression.
 *
 * @returns {Boolean} Whether or not it is a Regular Expression.
 */
module.exports = function isRegExp (obj) {
	return window.RegExp ? obj instanceof RegExp : false;
};

// ac-object@1.2.0

},{}],102:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],103:[function(require,module,exports){
if (!Array.prototype.forEach) {
/**
	Executes a provided function once per array element.
	@param callback {Function} Object to test against.
	@param thisObj {Object} What the callback method is bound to.
*/
	Array.prototype.forEach = function forEach(callback, thisObj) {
		var arrayObject = Object(this);
		// Mimic ES5 spec call for interanl method ToUint32()
		var i;
		var currentValue;

		if (typeof callback !== 'function') {
			throw new TypeError('No function object passed to forEach.');
		}

		for (i = 0; i < this.length; i += 1) {
			currentValue = arrayObject[i];
			callback.call(thisObj, currentValue, i, arrayObject);
		}
	};
}
// ac-polyfills@2.2.2

},{}],104:[function(require,module,exports){
/**
 * Object#toString() ref for stringify().
 */

var toString = Object.prototype.toString;

/**
 * Object#hasOwnProperty ref
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Array#indexOf shim.
 */

var indexOf = typeof Array.prototype.indexOf === 'function'
  ? function(arr, el) { return arr.indexOf(el); }
  : function(arr, el) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === el) return i;
      }
      return -1;
    };

/**
 * Array.isArray shim.
 */

var isArray = Array.isArray || function(arr) {
  return toString.call(arr) == '[object Array]';
};

/**
 * Object.keys shim.
 */

var objectKeys = Object.keys || function(obj) {
  var ret = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret.push(key);
    }
  }
  return ret;
};

/**
 * Array#forEach shim.
 */

var forEach = typeof Array.prototype.forEach === 'function'
  ? function(arr, fn) { return arr.forEach(fn); }
  : function(arr, fn) {
      for (var i = 0; i < arr.length; i++) fn(arr[i]);
    };

/**
 * Array#reduce shim.
 */

var reduce = function(arr, fn, initial) {
  if (typeof arr.reduce === 'function') return arr.reduce(fn, initial);
  var res = initial;
  for (var i = 0; i < arr.length; i++) res = fn(res, arr[i]);
  return res;
};

/**
 * Cache non-integer test regexp.
 */

var isint = /^[0-9]+$/;

function promote(parent, key) {
  if (parent[key].length == 0) return parent[key] = {}
  var t = {};
  for (var i in parent[key]) {
    if (hasOwnProperty.call(parent[key], i)) {
      t[i] = parent[key][i];
    }
  }
  parent[key] = t;
  return t;
}

function parse(parts, parent, key, val) {
  var part = parts.shift();

  // illegal
  if (hasOwnProperty.call(Object.prototype, key)) return;

  // end
  if (!part) {
    if (isArray(parent[key])) {
      parent[key].push(val);
    } else if ('object' == typeof parent[key]) {
      parent[key] = val;
    } else if ('undefined' == typeof parent[key]) {
      parent[key] = val;
    } else {
      parent[key] = [parent[key], val];
    }
    // array
  } else {
    var obj = parent[key] = parent[key] || [];
    if (']' == part) {
      if (isArray(obj)) {
        if ('' != val) obj.push(val);
      } else if ('object' == typeof obj) {
        obj[objectKeys(obj).length] = val;
      } else {
        obj = parent[key] = [parent[key], val];
      }
      // prop
    } else if (~indexOf(part, ']')) {
      part = part.substr(0, part.length - 1);
      if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
      parse(parts, obj, part, val);
      // key
    } else {
      if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
      parse(parts, obj, part, val);
    }
  }
}

/**
 * Merge parent key/val pair.
 */

function merge(parent, key, val){
  if (~indexOf(key, ']')) {
    var parts = key.split('[')
      , len = parts.length
      , last = len - 1;
    parse(parts, parent, 'base', val);
    // optimize
  } else {
    if (!isint.test(key) && isArray(parent.base)) {
      var t = {};
      for (var k in parent.base) t[k] = parent.base[k];
      parent.base = t;
    }
    set(parent.base, key, val);
  }

  return parent;
}

/**
 * Compact sparse arrays.
 */

function compact(obj) {
  if ('object' != typeof obj) return obj;

  if (isArray(obj)) {
    var ret = [];

    for (var i in obj) {
      if (hasOwnProperty.call(obj, i)) {
        ret.push(obj[i]);
      }
    }

    return ret;
  }

  for (var key in obj) {
    obj[key] = compact(obj[key]);
  }

  return obj;
}

/**
 * Parse the given obj.
 */

function parseObject(obj){
  var ret = { base: {} };

  forEach(objectKeys(obj), function(name){
    merge(ret, name, obj[name]);
  });

  return compact(ret.base);
}

/**
 * Parse the given str.
 */

function parseString(str){
  var ret = reduce(String(str).split('&'), function(ret, pair){
    var eql = indexOf(pair, '=')
      , brace = lastBraceInKey(pair)
      , key = pair.substr(0, brace || eql)
      , val = pair.substr(brace || eql, pair.length)
      , val = val.substr(indexOf(val, '=') + 1, val.length);

    // ?foo
    if ('' == key) key = pair, val = '';
    if ('' == key) return ret;

    return merge(ret, decode(key), decode(val));
  }, { base: {} }).base;

  return compact(ret);
}

/**
 * Parse the given query `str` or `obj`, returning an object.
 *
 * @param {String} str | {Object} obj
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if (null == str || '' == str) return {};
  return 'object' == typeof str
    ? parseObject(str)
    : parseString(str);
};

/**
 * Turn the given `obj` into a query string
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

var stringify = exports.stringify = function(obj, prefix) {
  if (isArray(obj)) {
    return stringifyArray(obj, prefix);
  } else if ('[object Object]' == toString.call(obj)) {
    return stringifyObject(obj, prefix);
  } else if ('string' == typeof obj) {
    return stringifyString(obj, prefix);
  } else {
    return prefix + '=' + encodeURIComponent(String(obj));
  }
};

/**
 * Stringify the given `str`.
 *
 * @param {String} str
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyString(str, prefix) {
  if (!prefix) throw new TypeError('stringify expects an object');
  return prefix + '=' + encodeURIComponent(str);
}

/**
 * Stringify the given `arr`.
 *
 * @param {Array} arr
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyArray(arr, prefix) {
  var ret = [];
  if (!prefix) throw new TypeError('stringify expects an object');
  for (var i = 0; i < arr.length; i++) {
    ret.push(stringify(arr[i], prefix + '[' + i + ']'));
  }
  return ret.join('&');
}

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyObject(obj, prefix) {
  var ret = []
    , keys = objectKeys(obj)
    , key;

  for (var i = 0, len = keys.length; i < len; ++i) {
    key = keys[i];
    if ('' == key) continue;
    if (null == obj[key]) {
      ret.push(encodeURIComponent(key) + '=');
    } else {
      ret.push(stringify(obj[key], prefix
        ? prefix + '[' + encodeURIComponent(key) + ']'
        : encodeURIComponent(key)));
    }
  }

  return ret.join('&');
}

/**
 * Set `obj`'s `key` to `val` respecting
 * the weird and wonderful syntax of a qs,
 * where "foo=bar&foo=baz" becomes an array.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {String} val
 * @api private
 */

function set(obj, key, val) {
  var v = obj[key];
  if (hasOwnProperty.call(Object.prototype, key)) return;
  if (undefined === v) {
    obj[key] = val;
  } else if (isArray(v)) {
    v.push(val);
  } else {
    obj[key] = [v, val];
  }
}

/**
 * Locate last brace in `str` within the key.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function lastBraceInKey(str) {
  var len = str.length
    , brace
    , c;
  for (var i = 0; i < len; ++i) {
    c = str[i];
    if (']' == c) brace = false;
    if ('[' == c) brace = true;
    if ('=' == c && !brace) return i;
  }
}

/**
 * Decode `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function decode(str) {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch (err) {
    return str;
  }
}

},{}],105:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var qs = require('qs');

/**
 * @name module:ac-object.toQueryParameters
 *
 * @function
 * 
 * @desc Convert object to query string.
 *
 * @param {Object} object
 *        The Object to convert to a query string.
 *
 * @returns {String} Returns query string representation of object.
 */
module.exports = function toQueryParameters (object) {
	if (typeof object !== 'object'){
		throw new TypeError('toQueryParameters error: argument is not an object');
	}
	return qs.stringify(object);
};

// ac-object@1.2.0

},{"qs":104}],106:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */

'use strict';

module.exports = {
	PageVisibilityManager: require('./ac-page-visibility/PageVisibilityManager')
};
},{"./ac-page-visibility/PageVisibilityManager":107}],107:[function(require,module,exports){
'use strict';

/** @ignore */
var create = require('@marcom/ac-object/create'); 

/** @ignore */
var EventEmitterMicro = require('@marcom/ac-event-emitter-micro').EventEmitterMicro;

/**
 * @name PageVisibilityManager
 * @class
 * @singleton
 */
function PageVisibilityManager() {

	if (typeof document.addEventListener === 'undefined') {
		// if browser doesn't support addEventListener then it also won't support document.hidden
		return;
	}
	
	var visibilityChange;

	if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
		this._hidden = 'hidden';
		visibilityChange = 'visibilitychange';
	}
	else if (typeof document.mozHidden !== 'undefined') {
		this._hidden = 'mozHidden';
		visibilityChange = 'mozvisibilitychange';
	}
	else if (typeof document.msHidden !== 'undefined') {
		this._hidden = 'msHidden';
		visibilityChange = 'msvisibilitychange';
	}
	else if (typeof document.webkitHidden !== 'undefined') {
		this._hidden = 'webkitHidden';
		visibilityChange = 'webkitvisibilitychange';
	}
	
	if (typeof document[this._hidden] === "undefined") {
		this.isHidden = false;
	}
	else {
		this.isHidden = document[this._hidden];
	}
	
	// if we have found a string we can use to listen for events, bind an event listener
	if ( visibilityChange ) {
		document.addEventListener(visibilityChange, this._handleVisibilityChange.bind(this), false);
	}

	// call super
	EventEmitterMicro.call(this);
}

var proto = PageVisibilityManager.prototype = create(EventEmitterMicro.prototype);

/** Events */
proto.CHANGED = 'changed';

/**
 * @name PageVisibilityManager#_handleVisibilityChange
 * @function
 * @private
 *
 * @param {Object} [evt=undefined]
 *
 * @fires PageVisibilityManager#changed
 */
/** @ignore */
proto._handleVisibilityChange = function (evt) {
	this.isHidden = document[this._hidden];

	/**
	 * Changed event.
	 * @event PageVisibilityManager#changed
	 */
	this.trigger(this.CHANGED, {
		isHidden: this.isHidden
	});
};

module.exports = new PageVisibilityManager();

},{"@marcom/ac-event-emitter-micro":91,"@marcom/ac-object/create":94}],108:[function(require,module,exports){
module.exports = clone;

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function clone(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],109:[function(require,module,exports){
module.exports = create;

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
    var out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};
},{}],110:[function(require,module,exports){
module.exports = fromRotationTranslation;

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};
},{}],111:[function(require,module,exports){
module.exports = identity;

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};
},{}],112:[function(require,module,exports){
module.exports = invert;

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};
},{}],113:[function(require,module,exports){
module.exports = multiply;

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};
},{}],114:[function(require,module,exports){
module.exports = rotate;

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < 0.000001) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};
},{}],115:[function(require,module,exports){
module.exports = rotateX;

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};
},{}],116:[function(require,module,exports){
module.exports = rotateY;

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};
},{}],117:[function(require,module,exports){
module.exports = rotateZ;

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};
},{}],118:[function(require,module,exports){
module.exports = scale;

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],119:[function(require,module,exports){
module.exports = translate;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};
},{}],120:[function(require,module,exports){
module.exports = transpose;

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};
},{}],121:[function(require,module,exports){
module.exports = create;

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
    var out = new Float32Array(3)
    out[0] = 0
    out[1] = 0
    out[2] = 0
    return out
}
},{}],122:[function(require,module,exports){
module.exports = cross;

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2]

    out[0] = ay * bz - az * by
    out[1] = az * bx - ax * bz
    out[2] = ax * by - ay * bx
    return out
}
},{}],123:[function(require,module,exports){
module.exports = dot;

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}
},{}],124:[function(require,module,exports){
module.exports = fromValues;

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
    var out = new Float32Array(3)
    out[0] = x
    out[1] = y
    out[2] = z
    return out
}
},{}],125:[function(require,module,exports){
module.exports = length;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    return Math.sqrt(x*x + y*y + z*z)
}
},{}],126:[function(require,module,exports){
module.exports = normalize;

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    var len = x*x + y*y + z*z
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len)
        out[0] = a[0] * len
        out[1] = a[1] * len
        out[2] = a[2] * len
    }
    return out
}
},{}],127:[function(require,module,exports){
module.exports = create

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
function create () {
  var out = new Float32Array(4)
  out[0] = 0
  out[1] = 0
  out[2] = 0
  out[3] = 0
  return out
}

},{}],128:[function(require,module,exports){
module.exports = fromValues

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
function fromValues (x, y, z, w) {
  var out = new Float32Array(4)
  out[0] = x
  out[1] = y
  out[2] = z
  out[3] = w
  return out
}

},{}],129:[function(require,module,exports){
module.exports = transformMat4

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
function transformMat4 (out, a, m) {
  var x = a[0], y = a[1], z = a[2], w = a[3]
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w
  return out
}

},{}],130:[function(require,module,exports){
/**
 * @module ac-transform
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	Transform: require('./ac-transform/Transform')
};




// ac-transform@1.1.0

},{"./ac-transform/Transform":131}],131:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';
/* jshint -W116 */
/**
 * @type {mat4}
 * @ignore
 */
var mat4 = require("./gl-matrix/mat4");
/**
 * @type {vec3}
 * @ignore
 */
var vec3 = require("./gl-matrix/vec3");
/**
 * @type {vec4}
 * @ignore
 */
var vec4 = require("./gl-matrix/vec4");

var degToRad = Math.PI / 180;
var radToDeg = 180 / Math.PI;

// MATRIX SHORTHAND
// Because gl-matrix is a 16 length floating point array for performance,
// it is tricky to translate algorithms you see online because they always refer to A or m11 for affine/non-affine matrices respectively
// This makes it so we can more easily reason about the matrix
var m11 = 0,  mA = 0,     m12 = 1,  mB = 1,      m13 = 2,    m14 = 3;
var m21 = 4,  mC = 4,     m22 = 5,  mD = 5,      m23 = 6,    m24 = 7;
var m31 = 8,              m32 = 9,               m33 = 10,   m34 = 11;
var m41 = 12, mE = 12,    m42 = 13, mF = 13,     m43 = 14,   m44 = 15;

/**
 * @module ac-transform.Transform
 * @alias ac-transform:Transform
 * @constructor
 * @class
 *
 * @desc Javascript implementation of the w3 css3-transforms specification.
 * For performance, all functions modify the existing matrix instead of creating a new one.
 * Call Transform.Clone to clone the matrix, to run functions without modifying this matrix
 */
function Transform() {
	this.m = mat4.create();
}
var proto = Transform.prototype;

////////////////////////////////////////
////////////// ROTATION   //////////////
////////////////////////////////////////
/**
 * @module ac-transform.Transform#rotateX
 * @function
 *
 * @desc Applies a 3D rotation along the X axis by the angle specified.
 * Same as calling `same as rotate3d(1, 0, 0, angle)`
 *
 * @param {number} deg Rotation amount in degrees
 * @returns {Transform}
 */
proto.rotateX = function(deg) {
	var rad = degToRad * deg;
	mat4.rotateX( this.m, this.m, rad );

	return this;
};
/**
 * @module ac-transform.Transform#rotateY
 * @function
 *
 * @desc Applies a 3D rotation along the Y axis by the angle specified.
 * Same as calling `same as rotate3d(0, 1, 0, angle)`
 *
 * @param {number} deg Rotation amount in degrees
 *
 * @returns {Transform}
 */
proto.rotateY = function(deg) {
	var rad = degToRad * deg;
	mat4.rotateY( this.m, this.m, rad );

	return this;
};

/**
 * @module ac-transform.Transform#rotateZ
 * @function
 *
 * @desc Applies a 3D rotation along the Z axis by the angle specified.
 * Same as calling `same as rotate3d(0, 0, 1, angle)`
 *
 * @param {number} deg Rotation amount in degrees
 *
 * @returns {Transform}
 */
proto.rotateZ = function(deg) {
	var rad = degToRad * deg;
	mat4.rotateZ( this.m, this.m, rad );

	return this;
};
/**
 * @alias ac-transform.Transform.rotateZ
 */
proto.rotate = proto.rotateZ;

/**
 * @module ac-transform.Transform#rotate3d
 * @function
 *
 * @desc Applies a 3D rotation about the Vector(x,y,z) by the `deg` angle
 * For example, to rotate around the 180 degrees Y axis, you would call `Transform.rotate3d(0,1,0, 180)`
 *
 * @param {number} x	X axis for direction vector
 * @param {number} y	Y axis for direction vector
 * @param {number} z	Z axis for direction vector
 * @param {number} deg	Rotation amount in degrees
 *
 * @returns {Transform}
 */
proto.rotate3d = function( x, y, z, deg) {
	if (y === null || y === undefined ) y = x;
	if (z === null || y === undefined ) z = x;
	var rad = degToRad * deg;
	mat4.rotate( this.m, this.m, rad, [x,y,z] );

	return this;
};
/**
 * @alias ac-transform.Transform.rotate3d
 */
proto.rotateAxisAngle = proto.rotate3d;

////////////////////////////////////////
///////////////  SCALE   ///////////////
////////////////////////////////////////
/**
 * @module ac-transform.Transform#scale
 * @function
 *
 * @desc Applies a 2D scale operation using the [sx,sy] scaling vector
 *
 * @param {number} sx	Scaling vector along the x-axis
 * @param {number} sy	Scaling vector along the y-axis
 *
 * @returns {Transform}
 */
proto.scale = function( sx, sy ) {
	sy = sy || sx;
	mat4.scale(this.m, this.m, [sx,sy,1]);

	return this;
};
/**
 * @module ac-transform.Transform#scaleX
 * @function
 *
 * @desc Applies a 2D scale operation using the [sx,1] scaling vector, where sx is given as the parameter.
 * @param {number} sx	Scaling vector along the x-axis
 *
 * @returns {Transform}
 */
proto.scaleX = function( sx ) {
	mat4.scale(this.m, this.m, [sx,1,1]);

	return this;
};
/**
 * @module ac-transform.Transform#scaleY
 * @function
 *
 * @desc Applies a 2D scale operation using the [1,sy] scaling vector, where sy is given as the parameter.
 * @param {number} sy	Scaling vector along the y-axis
 *
 * @returns {Transform}
 */
proto.scaleY = function( sy ) {
	mat4.scale(this.m, this.m, [1,sy,1]);

	return this;
};
/**
 * @module ac-transform.Transform#scaleZ
 * @function
 *
 * @desc Applies a 3D scale operation using the [1,1,sz] scaling vector, where sz is given as the parameter.
 * @param sz
 *
 * @returns {Transform}
 */
proto.scaleZ = function( sz ) {
	mat4.scale(this.m, this.m, [1,1,sz]);

	return this;
};
/**
 * @module ac-transform.Transform#scale3d
 * @function
 *
 * @desc Applies a 3D scale operation by the [sx,sy,sz] scaling vector described by the 3 parameters.
 * @param {number} sx	Scaling vector along the x-axis
 * @param {number} sy	Scaling vector along the y-axis
 * @param {number} sz	Scaling vector along the y-axis
 *
 * @returns {Transform}
 */
proto.scale3d = function( sx, sy, sz ) {
	mat4.scale(this.m, this.m, [sx,sy,sz]);

	return this;
};


////////////////////////////////////////
///////////////  SKEW   ////////////////
////////////////////////////////////////
/**
 * @module ac-transform.Transform#skew
 * @function
 *
 * @desc Applies a 2D skew by [ax,ay] for X and Y.
 * If the second parameter is not provided, it has a zero value.
 * @param {number} ax	Skew vector along the X axis
 * @param {number} ay	Skew vector along the X axis
 *
 * @returns {Transform}
 */
proto.skew = function( ax, ay ) {
	if( ay === null || ay === undefined ) {
		return this.skewX(ax);
	}

	ax = degToRad * ax;
	ay = degToRad * ay;

	// X
	var transform = mat4.create();
	transform[mC] = Math.tan(ax);
	transform[mB] = Math.tan(ay);

	mat4.multiply(this.m, this.m, transform);

	return this;
};

/**
 * @module ac-transform.Transform#skewX
 * @function
 *
 * @desc Applies a 2D skew transformation along the X axis by the given angle.
 * @param {number} ax	Skew vector along the X axis
 *
 * @returns {Transform}
 */
proto.skewX = function( ax ) {
	ax = degToRad * ax;

	var transform = mat4.create();
	transform[mC] = Math.tan(ax);

	mat4.multiply(this.m, this.m, transform);

	return this;
};

/**
 * @module ac-transform.Transform#skewY
 * @function
 *
 * @desc Applies a 2D skew transformation along the Y axis by the given angle.
 * @param {number} ay	Skew vector along the Y axis
 *
 * @returns {Transform}
 */
proto.skewY = function( ay ) {
	ay = degToRad * ay;

	var transform = mat4.create();
	transform[mB] = Math.tan(ay);

	mat4.multiply(this.m, this.m, transform);

	return this;
};


////////////////////////////////////////
/////////////  TRANSLATE   /////////////
////////////////////////////////////////
/**
 * @module ac-transform.Transform#translate
 * @function
 *
 * @desc Applies a 2D translation by the vector [tx, ty], where tx represents the X axis, and ty is an optional value representing the Y axis.
 * If <ty> is not provided, ty has zero as a value.
 *
 * @param {number} tx	Translation along the X axis
 * @param {number} [ty]	Optional, translation along the Y axis
 *
 * @returns {Transform}
 */
proto.translate = function(tx, ty) {
	ty = ty || 0;
	mat4.translate( this.m, this.m, [tx, ty, 0] );

	return this;
};

/**
 * @module ac-transform.Transform#translate3d
 * @function
 *
 * @desc Applies a 3D translation by the vector [tx,ty,tz], with tx, ty and tz being the first, second and third translation-value parameters respectively.
 * @param {number} tx	Translation along the X axis
 * @param {number} ty	Translation along the X axis
 * @param {number} tz	Translation along the X axis
 *
 * @returns {Transform}
 */
proto.translate3d = function(tx, ty, tz) {
	mat4.translate( this.m, this.m, [tx, ty, tz] );

	return this;
};

/**
 * @module ac-transform.Transform#translateX
 * @function
 *
 * @desc Applies a 2D translation alon the X axis
 * Same as calling translate3d(tx,0,0);

 * @param {number} tx	Translation along the X axis
 * @returns {Transform}
 */
proto.translateX = function(tx) {
	mat4.translate( this.m, this.m, [tx, 0, 0] );

	return this;
};

/**
 * @module ac-transform.Transform#translateY
 * @function
 *
 * @desc Applies a 2D translation along the Y axis
 * Same as calling translate3d(0,ty,0);

 * @param {number} ty	Translation along the Y axis
 * @returns {Transform}
 */
proto.translateY = function(ty) {
	mat4.translate( this.m, this.m, [0, ty, 0] );

	return this;
};

/**
 * @module ac-transform.Transform#translateZ
 * @function
 *
 * @desc Applies a 3D translation along the Z axis
 * Same as calling translate3d(0,0, tz);
 *
 * @param tz	Translation along the Z axis
 * @returns {Transform}
 */
proto.translateZ = function(tz) {
	mat4.translate( this.m, this.m, [0, 0, tz] );

	return this;
};

////////////////////////////////////////
///////////////   MISC   ///////////////
////////////////////////////////////////
/**
 * @module ac-transform.Transform#perspective
 * @function
 *
 * @desc Applies a perspective projection matrix.
 * The perspective() function represents the distance of the z-plane (z = 0) from the viewer.
 *
 * @param {number} depth Distance of the z-plane in pixels
 * @returns {Transform}
 */
proto.perspective = function( depth ) {
	var t = mat4.create();
	if( depth !== 0 ) {
		t[m34] = -1.0 / depth;
	}

	mat4.multiply( this.m, this.m, t);
};

/**
 * @module ac-transform.Transform#inverse
 * @function
 *
 * @desc Returns a new Transform, which is the inverse of this instance
 * @returns {Transform} A new Transform, in which the matrix has been inverted
 */
proto.inverse = function(){
	var t = this.clone();
	t.m = mat4.invert(t.m, this.m);

	return t;
};

/**
 * @module ac-transform.Transform#inverse
 * @function
 *
 * @desc	Resets this Transform
 * @returns {Transform}
 */
proto.reset = function(){
	mat4.identity(this.m);
	return this;
};

/**
 * Returns an array [x,y] representing the current translation along the respective axis
 * @returns {Array.<number>}
 */
proto.getTranslateXY = function(){
	var m = this.m;
	if ( this.isAffine() ) {
		return [m[mE], m[mF]];
	}
	return [m[m41], m[m42]];
};

/**
 * Returns an array [x,y,z] representing the current translation along the respective axis
 * @returns {Array.<number>}
 */
proto.getTranslateXYZ = function(){
	var m = this.m;
	if ( this.isAffine() ) {
		return [m[mE], m[mF], 0];
	}
	return [m[m41], m[m42], m[m43]];
};

/**
 * Returns the current translation value along the X axis
 * @returns {number}
 */
proto.getTranslateX = function(){
	var m = this.m;
	if ( this.isAffine() ) {
		return m[mE];
	}
	return m[m41];
};

/**
 * Returns the current translation value along the Y axis
 * @returns {number}
 */
proto.getTranslateY = function(){
	var m = this.m;
	if ( this.isAffine() ) {
		return m[mF];
	}
	return m[m42];
};

/**
 * Returns the current translation value along the Z axis
 * @returns {number}
 */
proto.getTranslateZ = function(){
	var m = this.m;
	if ( this.isAffine() ) {
		return 0;
	}
	return m[m43];
};



/**
 * @module ac-transform.Transform#clone
 * @function
 *
 * @desc Clones this Transform
 * @returns {Transform}
 */
proto.clone = function(){
	var t = new Transform();
	t.m = mat4.clone( this.m );

	return t;
};

/**
 * @module ac-transform.Transform#toArray
 * @function
 *
 * @desc Returns an object containing all the values in our matrix
 * Used for animation in conjunction with fromObject
 *
 * @returns {Array}
 */
proto.toArray = function(){
	var m = this.m;
	if ( this.isAffine() ) {
		return [m[mA], m[mB], m[mC], m[mD], m[mE], m[mF]];
	}
	return [m[m11], m[m12], m[m13], m[m14], m[m21], m[m22], m[m23], m[m24],
			m[m31], m[m32], m[m33], m[m34], m[m41], m[m42], m[m43], m[m44]];
};

/**
 * @module ac-transform.Transform#fromArray
 * @function
 *
 * @desc Replaces the contents of our matrix, with the contents of this array
 * Used for animation in conjunction with toArray
 * NOTE: Assumes the array has a length of 16
 *
 * @param {Array} arr
 * @returns {Transform}
 */
proto.fromArray = function( arr ){
	this.m = Array.prototype.slice.call(arr);

	return this;
};


/**
 * @module ac-transform.Transform#setMatrixValue
 * @function
 *
 * @desc Sets the matrix via a CSS Transform string. e.g. `element.getComputedStyle().transform`
 *
 * @example
 * var t = new Transform();
 * t.setMatrixValue( window.getComputedStyle(element).transform);
 *
 * @param {String} string	String returned from getComputedStyle().transform
 * @returns {Transform}
 */
proto.setMatrixValue = function(string){
	string = String(string).trim();
	var m = mat4.create();
	if (string === 'none') {
		this.m = m;
		return this;
	}

	var type = string.slice(0, string.indexOf('(')), parts, i;
	if (type === 'matrix3d'){
		parts = string.slice(9, -1).split(',');
		for (i = 0; i < parts.length; i++) {
			m[i] = parseFloat(parts[i]);
		}
	} else if (type === 'matrix'){
		// From: https://github.com/arian/CSSMatrix/blob/master/CSSMatrix.js#L149
		// From: https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js#L928
		parts = string.slice(7, -1).split(',');
		for (i = parts.length; i--;) parts[i] = parseFloat(parts[i]);

		m[m11] = parts[0];	// m11 / A
		m[m12] = parts[1];	// m12 / B
		m[m41] = parts[4];	// m41 / C
		m[m21] = parts[2];	// m21 / D
		m[m22] = parts[3];	// m22 / E / TX
		m[m42] = parts[5];	// m42 / F / TY
	} else {
		throw new TypeError('Invalid Matrix Value');
	}

	this.m = m;

	return this;
};

/**
 * Helper method used by #decompose
 * Returns true if a number is fuzzy equal to 0
 * @param {number} val
 * @returns {boolean}
 */
var isZero = function( val ) {
	return Math.abs(val) < 1e-4;
};


/**
 * @module ac-transform.Transform#decompose
 * @function
 *
 * @desc Decomposes a 4x4 matrix returning independent Translation/Scale/Skew/Perspective/Quaternion properties.
 * If `convertToDegrees` is true, rotation and skew properties are converted from radians to degrees
 *
 * @see Algorithm converted from W3C css-transform pseudo algorithm
 * @link http://www.w3.org/TR/css3-transforms/#interpolation-of-3d-matrices
 *
 * @param {Boolean=} convertToDegrees If true, angle values will be converted from radians to degrees
 * @returns {{translation: vec3, scale: vec3, skew: vec3, perspective: vec4, quaternion: vec4, eulerRotation: vec3, axisAngle: vec3}}
 */
proto.decompose = function( convertToDegrees ){
	convertToDegrees = convertToDegrees || false;

	var matrix = mat4.clone(this.m);
	var translation = vec3.create();
	var scale = vec3.create();
	var skew = vec3.create();
	var perspective = vec4.create();
	var quaternion = vec4.create();
	var eulerRotation = vec3.create();

	// Normalize, or return null if not possible
	//if(matrix[m44] === 0 ) return null;

	for (var i=0; i<16; i++)
		matrix[i] /= matrix[m44];

	// perspectiveMatrix is used to solve for perspective, but it also provides
	// an easy way to test for singularity of the upper 3x3 component.
	var perspectiveMatrix = mat4.clone(matrix);
	perspectiveMatrix[m14] = 0;
	perspectiveMatrix[m24] = 0;
	perspectiveMatrix[m34] = 0;
	perspectiveMatrix[m44] = 1;

	//if (Math.abs(mat4.determinant(perspectiveMatrix)) < 1e-8)
	//	return false;

	var a03 = matrix[3], a13 = matrix[7], a23 = matrix[11],
		a30 = matrix[12], a31 = matrix[13], a32 = matrix[14], a33 = matrix[15];

	var rightHandSide = vec4.create();
	if ( !isZero(matrix[m14]) || !isZero(matrix[m24]) || !isZero(matrix[m34]) ) {
		// rightHandSide is the right hand side of the equation.
		rightHandSide[0] = matrix[m14];
		rightHandSide[1] = matrix[m24];
		rightHandSide[2] = matrix[m34];
		rightHandSide[3] = matrix[m44];

		// Solve the equation by inverting perspectiveMatrix and multiplying
		// rightHandSide by the inverse.
		var inversePerspectiveMatrix = mat4.invert(mat4.create(), perspectiveMatrix);
		var transposedInversePerspectiveMatrix = mat4.transpose(mat4.create(), inversePerspectiveMatrix);
		perspective = vec4.transformMat4(perspective, rightHandSide, transposedInversePerspectiveMatrix);
	} else {
		perspective = vec4.fromValues(0,0,0,1);
	}

	// TRANSLATION
	translation[0] = a30;
	translation[1] = a31;
	translation[2] = a32;

	// Now get scale and shear. 'row' is a 3 element array of 3 component vectors
	var row = [vec3.create(), vec3.create(), vec3.create()];
	row[0][0] = matrix[0];
	row[0][1] = matrix[1];
	row[0][2] = matrix[2];

	row[1][0] = matrix[4];
	row[1][1] = matrix[5];
	row[1][2] = matrix[6];

	row[2][0] = matrix[8];
	row[2][1] = matrix[9];
	row[2][2] = matrix[10];

	// Compute X scale factor and normalize first row.
	scale[0] = vec3.length(row[0]);
	vec3.normalize(row[0], row[0]);

	// Compute XY shear factor and make 2nd row orthogonal to 1st.
	skew[0] = vec3.dot(row[0], row[1]);
	row[1] = this._combine(row[1], row[0], 1.0, -skew[0]);

	// Now, compute Y scale and normalize 2nd row.
	scale[1] = vec3.length(row[1]);
	vec3.normalize(row[1], row[1]);
	skew[0] /= scale[1];

	// Compute XZ and YZ shears, orthogonalize 3rd row
	skew[1] = vec3.dot(row[0], row[2]);
	row[2] = this._combine(row[2], row[0], 1.0, -skew[1]);
	skew[2] = vec3.dot(row[1], row[2]);
	row[2] = this._combine(row[2], row[1], 1.0, -skew[2]);

	// Next, get Z scale and normalize 3rd row.
	scale[2] = vec3.length(row[2]);
	vec3.normalize(row[2], row[2]);
	skew[1] /= scale[2];
	skew[2] /= scale[2];

	// At this point, the matrix (in rows) is orthonormal.
	// Check for a coordinate system flip.  If the determinant
	// is -1, then negate the matrix and the scaling factors.
	var pdum3 = vec3.cross(vec3.create(), row[1], row[2]);
	if (vec3.dot(row[0], pdum3) < 0) {
		for (i = 0; i < 3; i++) {
			scale[i] *= -1;
			row[i][0] *= -1;
			row[i][1] *= -1;
			row[i][2] *= -1;
		}
	}

	// Now, get the rotations out
	quaternion[0] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] - row[1][1] - row[2][2], 0));
	quaternion[1] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] + row[1][1] - row[2][2], 0));
	quaternion[2] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] - row[1][1] + row[2][2], 0));
	quaternion[3] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] + row[1][1] + row[2][2], 0));

	if (row[2][1] > row[1][2])
		quaternion[0] = -quaternion[0];
	if (row[0][2] > row[2][0])
		quaternion[1] = -quaternion[1];
	if (row[1][0] > row[0][1])
		quaternion[2] = -quaternion[2];

	var axisAngle = vec4.fromValues( quaternion[0],quaternion[1],quaternion[2], 2 * Math.acos(quaternion[3]) );

	/** @type {vec3} **/
	var rotation = this._rotationFromQuat(quaternion);

	if( convertToDegrees ) {
		skew[0] = Math.round(skew[0] * radToDeg * 100)/100;
		skew[1] = Math.round(skew[1] * radToDeg * 100)/100;
		skew[2] = Math.round(skew[2] * radToDeg * 100)/100;

		rotation[0] = Math.round(rotation[0] * radToDeg * 100)/100;
		rotation[1] = Math.round(rotation[1] * radToDeg * 100)/100;
		rotation[2] = Math.round(rotation[2] * radToDeg * 100)/100;

		axisAngle[3] = Math.round(axisAngle[3] * radToDeg * 100)/100;
	}

	return {
		translation: translation,
		scale: scale,
		skew: skew,
		perspective: perspective,
		quaternion: quaternion,
		eulerRotation: rotation,
		axisAngle: axisAngle
	};
};

/**
 * Set this transform from recomposed values, if any are not supplied identity versions are supplied
 * @param {vec3|Array.<Number>} translation
 * @param {vec3|Array.<Number>} scale
 * @param {vec3|Array.<Number>} skew
 * @param {vec4|Array.<Number>} perspective
 * @param {vec4|Array.<Number>} quaternion
 *
 * @returns {Transform}
 */
proto.recompose = function(translation, scale, skew, perspective, quaternion) {
	translation = translation || vec3.create();
	scale = scale || vec3.create();
	skew = skew || vec3.create();
	perspective = perspective || vec4.create();
	quaternion = quaternion || vec4.create();

	var matrix = mat4.fromRotationTranslation(mat4.create(), quaternion, translation);

	//apply perspective
	matrix[m14] = perspective[0];
	matrix[m24] = perspective[1];
	matrix[m34] = perspective[2];
	matrix[m44] = perspective[3];

	// apply skew
	// temp is a identity 4x4 matrix initially
	var temp = mat4.create();

	if (skew[2] !== 0) {
		temp[m32] = skew[2];
		mat4.multiply(matrix, matrix, temp);
	}
	if (skew[1] !== 0) {
		temp[m32] = 0;
		temp[m31] = skew[1];
		mat4.multiply(matrix, matrix, temp);
	}

	if (skew[0]) {
		temp[m31] = 0;
		temp[4] = skew[0];
		mat4.multiply(matrix, matrix, temp);
	}

	// apply scale
	mat4.scale(matrix, matrix, scale);
	this.m = matrix;

	return this;
};

/**
 *
 * @module ac-transform.Transform#isAffine
 * @function
 * @desc Returns true if this is an affine transformation
 * @returns {Boolean}
 */
proto.isAffine = function() {
	return (this.m[m13] === 0 && this.m[m14] === 0 && this.m[m23] === 0 && this.m[m24] === 0 &&
	this.m[m31] === 0 && this.m[m32] === 0 && this.m[m33] === 1 && this.m[m34] === 0 && this.m[m43] === 0 && this.m[m44] === 1);
};

/**
 * @module ac-transform.Transform#toString
 * @function
 *
 * @desc Returns a string representation of the matrix, which can be used to apply the matrix to an element
 *
 * @example
 * element.style.transform = transform.toString();
 *
 * @return {string}
 */
proto.toString = function () {
	var m = this.m;
	if ( this.isAffine() ) {
		return 'matrix(' +	m[mA] + ', ' + m[mB] + ', ' +
			m[mC] + ', ' + m[mD] + ', ' +
			m[mE] + ', ' + m[mF] + ')';
	}
	return 'matrix3d('+ m[m11] + ', ' + m[m12] + ', ' + m[m13] + ', ' + m[m14] + ', ' +
		m[m21] + ', ' + m[m22] + ', ' + m[m23] + ', ' + m[m24] + ', ' +
		m[m31] + ', ' + m[m32] + ', ' + m[m33] + ', ' + m[m34] + ', ' +
		m[m41] + ', ' + m[m42] + ', ' + m[m43] + ', ' + m[m44] + ')';
};

/**
 * @alias ac-transform.Transform.toString
 */
proto.toCSSString = proto.toString;


/**
 * @module ac-transform.Transform#_combine
 * @function
 * @private
 *
 * @desc Helper function required for Transform.decompose
 * Creates a new vector, by interpolating A and B using the ratios supplied ascl/bscl respectively
 *
 * http://www.w3.org/TR/css3-transforms/#supporting-functions
 *
 * @param {vec3} A
 * 			Left side vec3
 * @param {vec3} B
 * 			Right side vec3
 * @param {number} ascl
 * 			Scale of vector A
 * @param bscl
 * 			Scale of vector B
 * @returns {vec3}	A new vec3 after combining A and B with the supplied ratios
 * @private
 */
proto._combine = function( A, B, ascl, bscl) {
	var result = vec3.create();
	result[0] = (ascl * A[0]) + (bscl * B[0]);
	result[1] = (ascl * A[1]) + (bscl * B[1]);
	result[2] = (ascl * A[2]) + (bscl * B[2]);

	return result;
};


/**
 * @name ac-transform.Transform#_matrix2dToMat4
 * @function
 * @private
 *
 * @desc Creates a 2d Array representation of the matrix, from a `mat4`
 * @returns {mat4}
 */
proto._matrix2dToMat4 = function( matrix ){
	var out = mat4.create();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			out[i * 4 + j] = matrix[i][j];
		}
	}

	return out;
};

/**
 * @name ac-transform.Transform#_mat4ToMatrix2d
 * @function
 * @private
 *
 * @desc Creates a `mat4` from a 2d array of numbers
 * @returns {Array.<Array.<number>>}
 */
proto._mat4ToMatrix2d = function( ref ) {
	var matrix = [];
	for (var i = 0; i < 4; i++) {
		matrix[i] = [];
		for (var j = 0; j < 4; j++) {
			matrix[i][j] = ref[i * 4 + j];
		}
	}

	return matrix;
};


// FROM: http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/
/**
 * Extracts the rotation in eulerAngles, somewhat experimental because at the poles the numbers are thrown off
 *
 * @param {quat} q
 * @returns {vec3}
 * @private
 */
proto._rotationFromQuat = function(q) {
	var sqw = q[3] * q[3];
	var sqx = q[0] * q[0];
	var sqy = q[1] * q[1];
	var sqz = q[2] * q[2];
	var unit = sqx + sqy + sqz + sqw; // if normalised is one, otherwise is correction factor
	var test = q[0] * q[1] + q[2] * q[3];

	var x, y, z;
	if (test > 0.499 * unit) { // singularity at north pole
		y = 2 * Math.atan2(q[0], q[3]);
		z = Math.PI / 2;
		x = 0;
		return vec3.fromValues(x,y,z);
	}
	if (test < -0.499 * unit) { // singularity at south pole
		y = -2 * Math.atan2(q[0], q[3]);
		z = -Math.PI / 2;
		x = 0;
		return vec3.fromValues(x,y,z);
	}
	y = Math.atan2(2 * q[1] * q[3] - 2 * q[0] * q[2], sqx - sqy - sqz + sqw);
	z = Math.asin(2 * test / unit);
	x = Math.atan2(2 * q[0] * q[3] - 2 * q[1] * q[2], -sqx + sqy - sqz + sqw);

	return vec3.fromValues(x,y,z);
};

//// Create shorthand matrix accessor getter/setters - for example Transform.m11
//var accessors = {
//	m11: 0, mA: 0, m12: 1, mB: 1, m13: 2, m14: 3,
//	m21: 4, mC: 4, m22: 5, mD: 5, m23: 6, m24: 7,
//	m31: 8, m32: 9, m33: 10, m34: 11,
//	m41: 12, mE: 12, m42: 13, mF: 13, m43: 14, m44: 15
//};
//for (var key in accessors) {
//	if (!accessors.hasOwnProperty(key)) continue;
//
//	(function (myKey) {
//		Object.defineProperty(proto, key, {
//			set: function (val) {
//				this.m[myKey] = val;
//			},
//			get: function () {
//				return this.m[myKey];
//			},
//			enumerable: true,
//			configurable: true
//		});
//	})(accessors[key]);
//}


module.exports = Transform;

// ac-transform@1.1.0

},{"./gl-matrix/mat4":132,"./gl-matrix/vec3":133,"./gl-matrix/vec4":134}],132:[function(require,module,exports){
/**
 * Slim version of mat4, with only the API needed by ac-transform
 * @type {mat4}
 */
var mat4 = {
	/** @type {mat4}*/
	create                 : require('gl-mat4/create'),
	/** @type {mat4}*/
	rotate                 : require('gl-mat4/rotate'),
	/** @type {mat4}*/
	rotateX                : require('gl-mat4/rotateX'),
	/** @type {mat4}*/
	rotateY                : require('gl-mat4/rotateY'),
	/** @type {mat4}*/
	rotateZ                : require('gl-mat4/rotateZ'),
	/** @type {mat4}*/
	scale                  : require('gl-mat4/scale'),
	/** @type {mat4}*/
	multiply               : require('gl-mat4/multiply'),
	/** @type {mat4}*/
	translate              : require('gl-mat4/translate'),
	/** @type {mat4}*/
	invert                 : require('gl-mat4/invert'),
	/** @type {mat4}*/
	clone                  : require('gl-mat4/clone'),
	/** @type {mat4}*/
	transpose              : require('gl-mat4/transpose'),
	/** @type {mat4}*/
	identity               : require('gl-mat4/identity'),
	/** @type {mat4}*/
	fromRotationTranslation: require('gl-mat4/fromRotationTranslation')
};

/** @type {mat4} */
module.exports = mat4;

// ac-transform@1.1.0

},{"gl-mat4/clone":108,"gl-mat4/create":109,"gl-mat4/fromRotationTranslation":110,"gl-mat4/identity":111,"gl-mat4/invert":112,"gl-mat4/multiply":113,"gl-mat4/rotate":114,"gl-mat4/rotateX":115,"gl-mat4/rotateY":116,"gl-mat4/rotateZ":117,"gl-mat4/scale":118,"gl-mat4/translate":119,"gl-mat4/transpose":120}],133:[function(require,module,exports){
/**
 * Slim version of vec3, with only the API needed by ac-transform
 * @type {vec3}
 */
var vec3 = {
	/** @type {vec3}*/
	create    : require("gl-vec3/create"),
	/** @type {vec3}*/
	dot       : require("gl-vec3/dot"),
	/** @type {vec3}*/
	normalize : require("gl-vec3/normalize"),
	/** @type {vec3}*/
	length    : require("gl-vec3/length"),
	/** @type {vec3}*/
	cross     : require("gl-vec3/cross"),
	/** @type {vec3}*/
	fromValues: require("gl-vec3/fromValues")
};

/** @type {vec3} */
module.exports = vec3;



// ac-transform@1.1.0

},{"gl-vec3/create":121,"gl-vec3/cross":122,"gl-vec3/dot":123,"gl-vec3/fromValues":124,"gl-vec3/length":125,"gl-vec3/normalize":126}],134:[function(require,module,exports){
/**
 * Slim version of mat4, with only the API needed by ac-transform
 * @type {vec4}
 */
var vec4 = {
	/** @type {vec4}*/
	create       : require('gl-vec4/create'),
	/** @type {vec4}*/
	transformMat4: require('gl-vec4/transformMat4'),
	/** @type {vec4}*/
	fromValues   : require('gl-vec4/fromValues')
};

/** @type {vec4} */
module.exports = vec4;

// ac-transform@1.1.0

},{"gl-vec4/create":127,"gl-vec4/fromValues":128,"gl-vec4/transformMat4":129}],135:[function(require,module,exports){
/** 
 * @module ac-eclipse
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	Clip: require('./ac-eclipse/ClipFactory'),
	Timeline: require('./ac-eclipse/Timeline')
};

// ac-eclipse@2.1.0

},{"./ac-eclipse/ClipFactory":136,"./ac-eclipse/Timeline":137}],136:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
require('./helpers/Float32Array'); // stops ac-transform blowing up in old browsers
var transitionEnd = require('./helpers/transitionEnd');

/** @ignore */
var Clip = require('@marcom/ac-clip').Clip;
var ClipEasing = require('./clips/ClipEasing');
var ClipInlineCss = require('./clips/ClipInlineCss');
var ClipTransitionCss = require('./clips/ClipTransitionCss');

/**
 * @name module:ac-eclipse.ClipFactory
 * @class
 *
 * @desc Clip will transition properties on an object or styles on an element.
 *
 * @param {Object|Element} target
 *        The `Object` or `Element` whose properties / styles will transition / modify.
 *
 * @param {Number} duration
 *        The duration of the transition in seconds.
 *
 * @param {Object} propsTo
 *        An `Object` containing the end state of the properties you wish to
 *        transition on target.
 *
 * @param {Number} [options.delay=0]
 *        Delay in seconds before a clip will start after play has been called.
 *
 * @param {String|Function} [options.ease='ease-out']
 *        The default ease for transitions.
 *
 * @param {Clock} [options.clock=Clock]
 *        An instance of `ac-clock.Clock` to be used. Defaults to global singleton.
 *
 * @param {Object} [options.propsFrom={}]
 *        An `Object` containing the start state of the properties you wish to
 *        transition on target.
 *
 * @param {Object} [options.propsEase={}]
 *        An `Object` containing unique easing algorithms for specific properties.
 *
 * @param {Boolean} [options.destroyOnComplete=null]
 *        When true the clip will self destruct - call destroy on itself upon
 *        completion.
 *
 * @param {Function} [options.onStart=null]
 *        A callback `Function` called when the clip starts to play.
 *
 * @param {Function} [options.onUpdate=null]
 *        A callback `Function` called when the clip has updated properties.
 *        This should be used if you require to do further calculations with the
 *        properties and not for rendering. Use `onDraw` for rendering.
 *
 * @param {Function} [options.onDraw=null]
 *        A callback `Function` called when the clip has updated properties.
 *        This should be used for rendering, e.g. drawing something to a `canvas`
 *        element.
 *
 * @param {Function} [options.onComplete=null]
 *        A callback `Function` called when the clip has finished playing.
 */
function ClipFactory(target, duration, propsTo, options) {

	// if target is an element then transition css styles
	if (target.nodeType) {

		// if css transitions not supports (or inlineStyles option true) then set styles inline
		if (transitionEnd === undefined || (options && options.inlineStyles)) {
			return new ClipInlineCss(target, duration, propsTo, options);
		}

		// otherwise use css transitions to control animations
		return new ClipTransitionCss(target, duration, propsTo, options);
	}

	// used for transitioning properties on objects
	return new ClipEasing(target, duration, propsTo, options);
}

// loop through Clip public static methods and inherit them
for (var prop in Clip) {
	if (typeof Clip[prop] === 'function' && prop.substr(0, 1) !== '_') {
		ClipFactory[prop] = Clip[prop].bind(Clip);
	}
}

/**
 * @name module:ac-eclipse.ClipFactory#to
 * @function
 * @override
 * @static
 *
 * @desc Creates and returns an instance of a Clip that will autostart and destroy
 *       itself upon completetion. Ideal for creating throw away instances of Clip
 *       and not having to worry about memory / destroying them.
 *
 * @param {Object|Element} target
 *        The `Object` or `Element` whose properties / styles will transition / modify.
 *
 * @param {Number} duration
 *        The duration of the transition in seconds.
 *
 * @param {Object} propsTo
 *        An `Object` containing the end state of the properties you wish to
 *        transition on target.
 *
 * @param {Object} options
 *        See Clip instantiation docs for full list of options.
 *
 * @returns {Clip} An new instance of Clip.
 */
ClipFactory.to = function (target, duration, propsTo, options) {
	options = options || {};
	if (options.destroyOnComplete === undefined) {
		options.destroyOnComplete = true;
	}
	return new ClipFactory(target, duration, propsTo, options).play();
};

/**
 * @name module:ac-eclipse.ClipFactory#from
 * @function
 * @override
 * @static
 *
 * @desc Creates and returns an instance of a Clip that will autostart and destroy
 *       itself upon completetion. Ideal for creating throw away instances of Clip
 *       and not having to worry about memory / destroying them. Unlike the static
 *       `to` method this method takes propsFrom as the third argument and will
 *       transition an Object back to it's original state.
 *
 * @param {Object|Element} target
 *        The `Object` or `Element` whose properties / styles will transition / modify.
 *
 * @param {Number} duration
 *        The duration of the transition in seconds.
 *
 * @param {Object} propsFrom
 *        An `Object` containing the start state of the properties you wish to
 *        transition on target.
 *
 * @param {Object} options
 *        See Clip instantiation docs for full list of options. The one difference
 *        here is no `propsFrom` object can be passed in options but instead a `propsTo`
 *        option is accepted that works in a similar way - listing end states for props.
 *
 * @returns {Clip} An new instance of Clip.
 */
ClipFactory.from = function (target, duration, propsFrom, options) {
	options = options || {};
	options.propsFrom = propsFrom;
	if (options.destroyOnComplete === undefined) {
		options.destroyOnComplete = true;
	}
	return new ClipFactory(target, duration, options.propsTo, options).play();
};

module.exports = ClipFactory;

// ac-eclipse@2.1.0

},{"./clips/ClipEasing":138,"./clips/ClipInlineCss":139,"./clips/ClipTransitionCss":140,"./helpers/Float32Array":143,"./helpers/transitionEnd":152,"@marcom/ac-clip":60}],137:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var create = require('@marcom/ac-object').create;

/** @ignore */
var Clip = require('@marcom/ac-clip').Clip;

function Timeline(options) {
	options = options || {};
}

var proto = Timeline.prototype = create(Clip.prototype);

module.exports = Timeline;

// ac-eclipse@2.1.0

},{"@marcom/ac-clip":60,"@marcom/ac-object":98}],138:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var clone = require('@marcom/ac-object').clone;
var create = require('@marcom/ac-object').create;
var createPredefined = require('@marcom/ac-easing').createPredefined;
var isCssCubicBezierString = require('../helpers/isCssCubicBezierString');

/** @ignore */
var BezierCurveCssManager = require('../helpers/BezierCurveCssManager');
var Clip = require('@marcom/ac-clip').Clip;
var Ease = require('@marcom/ac-easing').Ease;

/** @ignore */
var DEFAULT_EASE = 'ease'; // should match ac-clip.Clip.DEFAULT_EASE

/**
 * @name module:ac-eclipse.ClipEasing
 * @class
 * @extends Clip
 *
 * @desc ClipEasing basically does the same as ac-clip.Clip - transitioning properties on objects.
 *       The one difference is that ClipEasing can have different easing algorithms per property
 *       and this is set with the propsEase option (see below). To achieve this, when propsEase is
 *       set, ClipEasing will create multiple instances of ac-clip.Clip with each unqiue easing
 *       algorithm. If only one easing is used ClipEasing will work the same as Clip.
 *
 * @param {Object} target
 *        The `Object` whose properties will transition / modify.
 *
 * @param {Number} duration
 *        The duration of the transition in seconds.
 *
 * @param {Object} propsTo
 *        An `Object` containing the end state of the properties you wish to
 *        transition on target.
 *
 * @param {Number} [options.delay=0]
 *        Delay in seconds before a clip will start after play has been called.
 *
 * @param {String|Function} [options.ease='ease-out']
 *        The default ease for transitions.
 *
 * @param {Clock} [options.clock=Clock]
 *        An instance of `ac-clock.Clock` to be used. Defaults to global singleton.
 *
 * @param {Object} [options.propsFrom={}]
 *        An `Object` containing the start state of the properties you wish to
 *        transition on target.
 *
 * @param {Object} [options.propsEase={}]
 *        An `Object` containing unique easing algorithms for specific properties.
 *
 * @param {Boolean} [options.destroyOnComplete=null]
 *        When true the clip will self destruct - call destroy on itself upon
 *        completion.
 *
 * @param {Function} [options.onStart=null]
 *        A callback `Function` called when the clip starts to play.
 *
 * @param {Function} [options.onUpdate=null]
 *        A callback `Function` called when the clip has updated properties.
 *        This should be used if you require to do further calculations with the
 *        properties and not for rendering. Use `onDraw` for rendering.
 *
 * @param {Function} [options.onDraw=null]
 *        A callback `Function` called when the clip has updated properties.
 *        This should be used for rendering, e.g. drawing something to a `canvas`
 *        element.
 *
 * @param {Function} [options.onComplete=null]
 *        A callback `Function` called when the clip has finished playing.
 */
function ClipEasing(target, duration, propsTo, options) {

	if (options && isCssCubicBezierString(options.ease)) {
		// convert to js easing function
		options.ease = BezierCurveCssManager.create(options.ease).toEasingFunction();
	}

	options = options || {};
	this._propsEase = options.propsEase || {};

	Clip.call(this, target, duration, propsTo, options);
}

var Super = Clip.prototype;
var proto = ClipEasing.prototype = create(Super);


////////////////////////////////////////
//////////  PUBLIC METHODS   ///////////
////////////////////////////////////////

/**
 * @name module:ac-eclipse.ClipEasing#reset
 * @function
 * @override
 *
 * @desc Resets the clip and target properties.
 *
 * @returns {ClipEasing} A reference to this clip.
 */
proto.reset = function () {
	var returnValue = Super.reset.call(this);
	if (this._clips) {
		// if we have an array of clips then reset each clip
		var i = this._clips.length;
		while (i--) {
			this._clips[i].reset();
		}
	}
	return returnValue;
};

/**
 * @name module:ac-clip.ClipEasing#destroy
 * @function
 * @override
 *
 * @desc Immediately stop the clip and make it eligible for garbage collection.
 *       A clip can not be reused after it has been destroyed.
 *
 * @returns {ClipEasing} A reference to this clip.
 */
proto.destroy = function () {
	if (this._clips) {
		// if we have an array of clips then destroy each clip
		var i = this._clips.length;
		while (i--) {
			this._clips[i].destroy();
		}
		this._clips = null;
	}
	this._eases = null;
	this._storeOnUpdate = null;
	return Super.destroy.call(this);
};


////////////////////////////////////////
/////////  PRIVATE METHODS   ///////////
////////////////////////////////////////

/**
 * @name module:ac-eclipse.ClipEasing#_prepareProperties
 * @function
 * @override
 * @private
 */
/** @ignore */
proto._prepareProperties = function () {

	var easeCount = 0;
	var groupsTo = {};
	var groupsFrom = {};
	var eases = {};
	var prop, ease;

	if (this._propsEase) {
		// create groups of props that share the same easing
		for (prop in this._propsTo) {
			if (this._propsTo.hasOwnProperty(prop)) {

				ease = this._propsEase[prop];
				if (isCssCubicBezierString(ease)) {
					// if cubic bezier css string then convert to js function
					ease = BezierCurveCssManager.create(ease).toEasingFunction();
				}

				if (ease === undefined) {
					// uses default ease
					if (groupsTo[this._ease] === undefined) {
						groupsTo[this._ease] = {};
						groupsFrom[this._ease] = {};
						eases[this._ease] = this._ease.easingFunction;
						easeCount++;
					}
					groupsTo[this._ease][prop] = this._propsTo[prop];
					groupsFrom[this._ease][prop] = this._propsFrom[prop];
				}
				else if (typeof ease === 'function') {
					// uses function for ease
					// can't use function as key as will mostly match default and other
					// functions when converted to String so use the easeCount as the key
					groupsTo[easeCount] = {};
					groupsFrom[easeCount] = {};
					groupsTo[easeCount][prop] = this._propsTo[prop];
					groupsFrom[easeCount][prop] = this._propsFrom[prop];
					eases[easeCount] = ease;
					easeCount++;
				}
				else {
					// uses a predefined string
					if (groupsTo[ease] === undefined) {
						groupsTo[ease] = {};
						groupsFrom[ease] = {};
						eases[ease] = ease;
						easeCount++;
					}
					groupsTo[ease][prop] = this._propsTo[prop];
					groupsFrom[ease][prop] = this._propsFrom[prop];
				}
			}
		}

		if (easeCount > 1) {
			// there is more than one ease so we group the props with the
			// same ease and create an array of clips to control them
			var optionsClone = clone(this._options || {}, true);
			var duration = this._duration * 0.001;

			this._storeOnUpdate = this._onUpdate;
			this._onUpdate = this._onUpdateClips;

			// set callbacks to null otherwise ease instance of clip per
			// ease will call them, so if we have 3 types of easing onStart
			// will get triggered 3 times (which would be undesired behaviour)
			optionsClone.onStart = null;
			optionsClone.onUpdate = null;
			optionsClone.onDraw = null;
			optionsClone.onComplete = null;

			// iterate through each group of props that share an ease
			// and create a new instance of clip for them. The progress
			// of these clips will be controlled in this._onUpdate
			this._clips = [];
			for (ease in groupsTo) {
				if (groupsTo.hasOwnProperty(ease)) {
					optionsClone.ease = eases[ease];
					optionsClone.propsFrom = groupsFrom[ease];
					this._clips.push(new Clip(this._target, duration, groupsTo[ease], optionsClone));
				}
			}

			// set ease to linear as ease on this doesn't matter anymore as our array of clips are doing all that work
			ease = 'linear';
			
			// set propsTo and propsFrom to an empty object, again, our array of clips does all that
			this._propsTo = {};
			this._propsFrom = {};
		}
		else {
			// we do this as the only ease isn't necessarily `options.ease` as `options.propsEase`
			// might contain same ease for all props that's different to `options.ease`
			for (prop in eases) {
				if (eases.hasOwnProperty(prop)) {
					ease = eases[prop];
				}
			}
		}

		if (ease !== undefined) {
			this._ease = (typeof ease === 'function') ? new Ease(ease) : createPredefined(ease);
		}
	}

	return Super._prepareProperties.call(this);
};

/**
 * @name module:ac-eclipse.ClipEasing#_onUpdateClips
 * @function
 * @private
 *
 * @param {Clip} [clip=undefined]
 */
/** @ignore */
proto._onUpdateClips = function (clip) {
	// this method is only called if there was multiple easing algorithms specified on instantiation
	// using `options.propsEase`. In that instance there will be an array of clips that need there
	// progress setting to match this.progress() (which is passed in the evt as a progress property)
	var progress = (this._direction === 1) ? clip.progress() : 1 - clip.progress();
	var i = this._clips.length;
	while (i--) {
		this._clips[i].progress(progress);
	}

	if (typeof this._storeOnUpdate === 'function') {
		this._storeOnUpdate.call(this, this);
	}
};

module.exports = ClipEasing;

// ac-eclipse@2.1.0

},{"../helpers/BezierCurveCssManager":142,"../helpers/isCssCubicBezierString":148,"@marcom/ac-clip":60,"@marcom/ac-easing":83,"@marcom/ac-object":98}],139:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var convertToStyleObject = require('../helpers/convertToStyleObject');
var convertToTransitionableObjects = require('../helpers/convertToTransitionableObjects');
var clone = require('@marcom/ac-object').clone;
var create = require('@marcom/ac-object').create;
var removeTransitions = require('../helpers/removeTransitions');

/** @ignore */
var BezierCurveCssManager = require('../helpers/BezierCurveCssManager');
var ClipEasing = require('./ClipEasing');
var DomStyles = require('@marcom/ac-dom-styles');

/**
 * @name module:ac-eclipse.ClipInlineCss
 * @class
 * @extends ClipEasing
 *
 * @desc ClipInlineCss transitions CSS styles on an element. It extends ClipEasing to
 *       transition style properties on an object and then uses ac-dom-styles to apply
 *       these styles to a target element on Clock update.
 *
 * @param {Element} target
 *        The `Element` whose styles will transition / modify.
 *
 * @param {Number} duration
 *        The duration of the transition in seconds.
 *
 * @param {Object} propsTo
 *        An `Object` containing the end state of the properties you wish to
 *        transition on target.
 *
 * @param {Number} [options.delay=0]
 *        Delay in seconds before a clip will start after play has been called.
 *
 * @param {String|Function} [options.ease='ease-out']
 *        The default ease for transitions.
 *
 * @param {Clock} [options.clock=Clock]
 *        An instance of `ac-clock.Clock` to be used. Defaults to global singleton.
 *
 * @param {Object} [options.propsFrom={}]
 *        An `Object` containing the start state of the properties you wish to
 *        transition on target.
 *
 * @param {Object} [options.propsEase={}]
 *        An `Object` containing unique easing algorithms for specific properties.
 *
 * @param {Boolean} [options.destroyOnComplete=null]
 *        When true the clip will self destruct - call destroy on itself upon
 *        completion.
 *
 * @param {Function} [options.onStart=null]
 *        A callback `Function` called when the clip starts to play.
 *
 * @param {Function} [options.onUpdate=null]
 *        A callback `Function` called when the clip has updated properties.
 *        This should be used if you require to do further calculations with the
 *        properties and not for rendering. Use `onDraw` for rendering.
 *
 * @param {Function} [options.onDraw=null]
 *        A callback `Function` called when the clip has updated properties.
 *        This should be used for rendering, e.g. drawing something to a `canvas`
 *        element.
 *
 * @param {Function} [options.onComplete=null]
 *        A callback `Function` called when the clip has finished playing.
 */
function ClipInlineCss(target, duration, propsTo, options) {
	options = options || {};

	this._el = target;

	// store callbacks so they can be called later in this._onStart etc
	this._storeOnStart = options.onStart || null;
	this._storeOnDraw = options.onDraw || null;
	this._storeOnComplete = options.onComplete || null;

	// set callbacks to call internal methods on this so we can write styles on start and update etc
	options.onStart = this._onStart;
	options.onDraw = this._onDraw;
	options.onComplete = this._onComplete;

	// call super on ClipEasing constructor
	ClipEasing.call(this, {}, duration, propsTo, options);
}

var Super = ClipEasing.prototype;
var proto = ClipInlineCss.prototype = create(Super);


////////////////////////////////////////
//////////  PUBLIC METHODS   ///////////
////////////////////////////////////////

/**
 * @name module:ac-clip.ClipInlineCss#play
 * @function
 *
 * @desc Starts the clip.
 *
 * @returns {Clip} A reference to this clip.
 */
proto.play = function () {
	var returnValue = Super.play.call(this);
	if (this._remainingDelay !== 0) {
		DomStyles.setStyle(this._el, convertToStyleObject(this._target));
	}
	return returnValue;
};

/**
 * @name module:ac-eclipse.ClipInlineCss#reset
 * @function
 * @override
 *
 * @desc Resets the clip and target properties.
 *
 * @returns {ClipInlineCss} A reference to this clip.
 */
proto.reset = function () {
	var returnValue = Super.reset.call(this);
	DomStyles.setStyle(this._el, convertToStyleObject(this._target));
	return returnValue;
};

/**
 * @name module:ac-clip.ClipInlineCss#destroy
 * @function
 * @override
 *
 * @desc Immediately stop the clip and make it eligible for garbage collection.
 *       A clip can not be reused after it has been destroyed.
 *
 * @returns {ClipInlineCss} A reference to this clip.
 */
proto.destroy = function () {
	this._el = null;
	this._completeStyles = null;
	this._storeOnStart = null;
	this._storeOnDraw = null;
	this._storeOnComplete = null;
	return Super.destroy.call(this);
};

/**
 * @name module:ac-eclipse.ClipInlineCss#target
 * @function
 * @override
 *
 * @desc Returns the target `Element`.
 *
 * @returns {Element} The target.
 */
proto.target = function () {
	return this._el;
};


////////////////////////////////////////
/////////  PRIVATE METHODS   ///////////
////////////////////////////////////////

/**
 * @name module:ac-eclipse.ClipInlineCss#_prepareProperties
 * @function
 * @override
 * @private
 */
/** @ignore */
proto._prepareProperties = function () {

	// convert the object so it can be used with clip.
	// e.g. 'width':'10px' becomes 'width':{value:'10',unit'px'}
	var converted = convertToTransitionableObjects(this._el, this._propsTo, this._propsFrom);
	this._target = converted.target;
	this._propsFrom = converted.propsFrom;
	this._propsTo = converted.propsTo;

	// if properties we are animating have css transition on them weird things happen so remove
	removeTransitions(this._el, this._target);

	var completeStyles = (this._isYoyo) ? this._propsFrom : this._propsTo;
	this._completeStyles = convertToStyleObject(completeStyles);

	// if set will generate an object of styles to remove when transition completes
	if (this._options.removeStylesOnComplete !== undefined) {
		var prop;
		var removeStyles = this._options.removeStylesOnComplete;
		if (typeof removeStyles === 'boolean' && removeStyles) {
			// remove all styles
			for (prop in this._completeStyles) {
				if (this._completeStyles.hasOwnProperty(prop)) {
					this._completeStyles[prop] = null;
				}
			}
		}
		else if (typeof removeStyles === 'object' && removeStyles.length) {
			// remove certain styles
			var i = removeStyles.length;
			while (i--) {
				prop = removeStyles[i];
				if (this._completeStyles.hasOwnProperty(prop)) {
					this._completeStyles[prop] = null;
				}
			}
		}
	}

	return Super._prepareProperties.call(this);
};

/**
 * @name module:ac-eclipse.ClipInlineCss#_onStart
 * @function
 * @private
 *
 * @param {Clip} [clip=undefined]
 */
/** @ignore */
proto._onStart = function (clip) {
	if (this.playing() && this._direction === 1 && this._delay === 0) {
		DomStyles.setStyle(this._el, convertToStyleObject(this._propsFrom));
	}
	if (typeof this._storeOnStart === 'function') {
		this._storeOnStart.call(this, this);
	}
};

/**
 * @name module:ac-eclipse.ClipInlineCss#_onDraw
 * @function
 * @private
 *
 * @param {Clip} [clip=undefined]
 */
/** @ignore */
proto._onDraw = function (clip) {
	DomStyles.setStyle(this._el, convertToStyleObject(this._target));
	if (typeof this._storeOnDraw === 'function') {
		this._storeOnDraw.call(this, this);
	}
};

/**
 * @name module:ac-eclipse.ClipInlineCss#_onComplete
 * @function
 * @private
 *
 * @param {Clip} [clip=undefined]
 */
/** @ignore */
proto._onComplete = function (clip) {
	DomStyles.setStyle(this._el, this._completeStyles);
	if (typeof this._storeOnComplete === 'function') {
		this._storeOnComplete.call(this, this);
	}
};

module.exports = ClipInlineCss;

// ac-eclipse@2.1.0

},{"../helpers/BezierCurveCssManager":142,"../helpers/convertToStyleObject":145,"../helpers/convertToTransitionableObjects":146,"../helpers/removeTransitions":149,"./ClipEasing":138,"@marcom/ac-dom-styles":40,"@marcom/ac-object":98}],140:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var convertToStyleObject = require('../helpers/convertToStyleObject');
var convertToTransitionableObjects = require('../helpers/convertToTransitionableObjects');
var clone = require('@marcom/ac-object').clone;
var create = require('@marcom/ac-object').create;
var createPredefined = require('@marcom/ac-easing').createPredefined;
var isCssCubicBezierString = require('../helpers/isCssCubicBezierString');
var removeTransitions = require('../helpers/removeTransitions');
var splitUnits = require('../helpers/splitUnits');
var transitionEnd = require('../helpers/transitionEnd');
var waitAnimationFrames = require('../helpers/waitAnimationFrames');

/** @ignore */
var BezierCurveCssManager = require('../helpers/BezierCurveCssManager');
var Clip = require('@marcom/ac-clip').Clip;
var ClipEasing = require('./ClipEasing');
var DomStyles = require('@marcom/ac-dom-styles');
var PageVisibilityManager = require('@marcom/ac-page-visibility').PageVisibilityManager;

/** @ignore */
var DEFAULT_EASE = 'ease'; // should match ac-eclipse.ClipEasing.DEFAULT_EASE
var ERROR_EASE_NOT_SUPPORTED = '%EASE% is not a supported predefined ease when transitioning with Elements ' +
								'and CSS transition. If you need to use %EASE% then pass the inlineStyle:true option.';
var ERROR_EASE_IS_FUNCTION = 'Function eases are not supported when using CSS transitions with Elements. ' +
								'Either use a cubic-bezier string (e.g. \'cubic-bezier(0, 0, 1, 1)\' or pass the ' +
								'inlineStyle option as `true` to render styles each frame instead of using CSS transitions.';

/**
 * @name module:ac-eclipse.ClipTransitionCss
 * @class
 * @extends Clip
 *
 * @desc ClipTransitionCss transitions CSS styles on an element. As with ClipInlineCss, it
 *       extends ClipEasing to transition style properties on an object. However, instead
 *       of applying these styles on Clock update it instead uses ac-dom-styles to apply
 *       the end styles to a target element along with CSS transition properties.
 *
 * @param {Element} target
 *        The `Element` whose styles will transition / modify.
 *
 * @param {Number} duration
 *        The duration of the transition in seconds.
 *
 * @param {Object} propsTo
 *        An `Object` containing the end state of the properties you wish to
 *        transition on target.
 *
 * @param {Number} [options.delay=0]
 *        Delay in seconds before a clip will start after play has been called.
 *
 * @param {String|Function} [options.ease='ease-out']
 *        The default ease for transitions.
 *
 * @param {Clock} [options.clock=Clock]
 *        An instance of `ac-clock.Clock` to be used. Defaults to global singleton.
 *
 * @param {Object} [options.propsFrom={}]
 *        An `Object` containing the start state of the properties you wish to
 *        transition on target.
 *
 * @param {Object} [options.propsEase={}]
 *        An `Object` containing unique easing algorithms for specific properties.
 *
 * @param {Boolean} [options.destroyOnComplete=null]
 *        When true the clip will self destruct - call destroy on itself upon
 *        completion.
 *
 * @param {Function} [options.onStart=null]
 *        A callback `Function` called when the clip starts to play.
 *
 * @param {Function} [options.onUpdate=null]
 *        A callback `Function` called when the clip has updated properties.
 *        This should be used if you require to do further calculations with the
 *        properties and not for rendering. Use `onDraw` for rendering.
 *
 * @param {Function} [options.onDraw=null]
 *        A callback `Function` called when the clip has updated properties.
 *        This should be used for rendering, e.g. drawing something to a `canvas`
 *        element.
 *
 * @param {Function} [options.onComplete=null]
 *        A callback `Function` called when the clip has finished playing.
 */
function ClipTransitionCss(target, duration, propsTo, options) {
	options = options || {};

	this._el = target;
	this._storeEase = options.ease;

	if (typeof this._storeEase === 'function') {
		throw new Error(ERROR_EASE_IS_FUNCTION);
	}

	// store callbacks so they can be called later in this._onStart etc
	this._storeOnStart = options.onStart || null;
	this._storeOnComplete = options.onComplete || null;

	// set callbacks to call internal methods on this so we can write styles on start and update etc
	options.onStart = this._onStart.bind(this);
	options.onComplete = this._onComplete.bind(this);

	this._stylesTo = clone(propsTo, true);
	this._stylesFrom = (options.propsFrom) ? clone(options.propsFrom, true) : {};
	this._propsEase = (options.propsEase) ? clone(options.propsEase, true) : {};

	if (isCssCubicBezierString(options.ease)) {
		// convert to js easing function
		options.ease = BezierCurveCssManager.create(options.ease).toEasingFunction();
	}

	// call super on Clip constructor
	Clip.call(this, {}, duration, {}, options);

	// remove this._propsFrom as we don't want it used in super
	this._propsFrom = {};
}

var Super = Clip.prototype;
var proto = ClipTransitionCss.prototype = create(Super);


////////////////////////////////////////
//////////  PUBLIC METHODS   ///////////
////////////////////////////////////////

/**
 * @name module:ac-clip.ClipTransitionCss#play
 * @function
 *
 * @desc Starts the clip.
 *
 * @returns {Clip} A reference to this clip.
 */
proto.play = function () {
	var returnValue = Super.play.call(this);
	if (this._direction === 1 && this.progress() === 0 && this._remainingDelay !== 0) {
		this._applyStyles(0, convertToStyleObject(this._stylesFrom));
	}
	return returnValue;
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#reset
 * @function
 * @override
 *
 * @desc Resets the clip and target properties.
 *
 * @returns {ClipTransitionCss} A reference to this clip.
 */
proto.reset = function () {
	var returnValue = Super.reset.call(this);
	this._stylesClip.reset();
	this._applyStyles(0, convertToStyleObject(this._styles));
	return returnValue;
};

/**
 * @name module:ac-clip.ClipTransitionCss#destroy
 * @function
 * @override
 *
 * @desc Immediately stop the clip and make it eligible for garbage collection.
 *       A clip can not be reused after it has been destroyed.
 *
 * @returns {ClipTransitionCss} A reference to this clip.
 */
proto.destroy = function () {
	PageVisibilityManager.off('changed', this._onVisibilityChanged);
	this._removeTransitionListener();
	this.off('pause', this._onPaused);
	this._onPaused();
	this._stylesClip.destroy();
	this._stylesClip = null;
	this._el = null;
	this._propsArray = null;
	this._styles = null;
	this._stylesFrom = null;
	this._stylesTo = null;
	this._completeStyles = null;
	this._storeOnStart = null;
	this._storeOnComplete = null;
	this._onTransitionEnded = null;
	return Super.destroy.call(this);
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#target
 * @function
 * @override
 *
 * @desc Returns the target `Element`.
 *
 * @returns {Element} The target.
 */
proto.target = function () {
	return this._el;
};

/**
 * @name module:ac-clip.Clip#duration
 * @function
 * @override
 *
 * @desc Gets or sets the duration of the transition.
 *
 * @param {Number} [duration]
 *        Optional new duration for the transition.
 *
 * @returns {Number} The current duration.
 */
proto.duration = function (duration) {
	var returnValue = Super.duration.call(this, duration);

	if (duration === undefined) {
		return returnValue;
	}

	if (this.playing()) {
		this.progress(this._progress);
	}

	return returnValue;
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#progress
 * @function
 * @override
 *
 * @desc Accepts a `Number` between 0 and 1 and will change the position of the clip.
 *
 * @param {Number} progress
 *        Accepts a Number between 0 and 1 and will change the position of the clip.
 *
 * @returns {Number} The current progress.
 */
proto.progress = function (progress) {

	var returnValue = Super.progress.call(this, progress);

	if (progress === undefined) {
		return returnValue;
	}

	progress = (this._direction === 1) ? progress : 1 - progress;
	this._stylesClip.progress(progress);

	// first we set the styles immediately to using this._styles which is updated by this._stylesClip
	this._applyStyles(0, convertToStyleObject(this._styles));

	if (this.playing()) {
		this._isWaitingForStylesToBeApplied = true;
		// if we're playing we need to then set the end state along with transitions
		// the reason for waiting two frames here is immediately setting the styles with
		// CSS transition properties will stop the above _applyStyles to _target not be
		// instant (it will animate)
		waitAnimationFrames(this._setStylesAfterWaiting, 2);
	}

	return returnValue;
};


////////////////////////////////////////
/////////  PRIVATE METHODS   ///////////
////////////////////////////////////////

/**
 * @name module:ac-eclipse.ClipTransitionCss#_prepareProperties
 * @function
 * @override
 * @private
 */
/** @ignore */
proto._prepareProperties = function () {

	// convert the object so it can be used with clip.
	// e.g. 'width':'10px' becomes 'width':{value:'10',unit'px'}
	var converted = convertToTransitionableObjects(this._el, this._stylesTo, this._stylesFrom);
	this._styles = converted.target;
	this._stylesTo = converted.propsTo;
	this._stylesFrom = converted.propsFrom;

	var ease = this._storeEase || DEFAULT_EASE;
	this._eases = {};
	this._propsArray = [];
	var convertedEase;
	this._styleCompleteTo = convertToStyleObject(this._stylesTo);
	this._styleCompleteFrom = convertToStyleObject(this._stylesFrom);
	this._propsEaseKeys = {};
	
	var prop;
	for (prop in this._stylesTo) {

		if (this._stylesTo.hasOwnProperty(prop)) {
			// store props to use with ac-dom-styles in _onPaused
			// method to get current styles of element
			this._propsArray[this._propsArray.length] = prop;

			if (this._propsEase[prop] === undefined) {
				if (this._eases[ease] === undefined) {
					// setup default ease
					convertedEase = this._convertEase(ease);
					this._eases[ease] = convertedEase.css;
				}

				// use default
				this._propsEaseKeys[prop] = ease;
			}
			else if (this._eases[this._propsEase[prop]] === undefined) {
				// setup new bezier curve ease
				convertedEase = this._convertEase(this._propsEase[prop]);
				this._eases[this._propsEase[prop]] = convertedEase.css;

				this._propsEaseKeys[prop] = this._propsEase[prop];
				this._propsEase[prop] = convertedEase.js;
			}
			else if (isCssCubicBezierString(this._propsEase[prop])) {
				// uses a cubic bezier that we already converted so just need the JS function
				this._propsEaseKeys[prop] = this._propsEase[prop];
				this._propsEase[prop] = this._eases[this._propsEase[prop]]['1'].toEasingFunction();
			}
		}
	}

	// listen for pause event to fire from super so we can set styles
	this._onPaused = this._onPaused.bind(this);
	this.on('pause', this._onPaused);

	this._setOtherTransitions();
	this._currentTransitionStyles = this._otherTransitions;

	this._completeStyles = convertToStyleObject((this._isYoyo) ? this._stylesFrom : this._stylesTo);

	// if set will generate an object of styles to remove when transition completes
	if (this._options.removeStylesOnComplete !== undefined) {
		var removeStyles = this._options.removeStylesOnComplete;
		if (typeof removeStyles === 'boolean' && removeStyles) {
			// remove all styles
			for (prop in this._stylesTo) {
				this._completeStyles[prop] = null;
			}
		}
		else if (typeof removeStyles === 'object' && removeStyles.length) {
			// remove certain styles
			var i = removeStyles.length;
			while (i--) {
				this._completeStyles[removeStyles[i]] = null;
			}
		}
	}

	// bind methods to this context
	this._onTransitionEnded = this._onTransitionEnded.bind(this);
	this._setStylesAfterWaiting = this._setStylesAfterWaiting.bind(this);
	this._onVisibilityChanged = this._onVisibilityChanged.bind(this);

	PageVisibilityManager.on(PageVisibilityManager.CHANGED, this._onVisibilityChanged);

	// this._stylesClip is used in progress method to get the correctly eased values/styles
	// when jumping to a specific progress of a clip
	this._stylesClip = new ClipEasing(this._styles, 1, this._stylesTo, {
		ease: this._options.ease,
		propsFrom: this._stylesFrom,
		propsEase: this._options.propsEase
	});
	// this._stylesClip should only be used privately in ClipTransitionCss so remove it
	// from Clip Class array of all Clip instances to avoid user confusion and protect
	// it from inadvertidle getting interfered with
	Clip._remove(this._stylesClip);

	return Super._prepareProperties.call(this);
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_convertEase
 * @function
 * @override
 * @private
 *
 * @param {String} ease
 *
 * @returns {Object} Returns an `Object` containing converted eases.
 */
/** @ignore */
proto._convertEase = function (ease) {
	if (typeof ease === 'function') {
		throw new Error(ERROR_EASE_IS_FUNCTION);
	}
	var bezierCurve;
	var jsEase;
	if (isCssCubicBezierString(ease)) {
		bezierCurve = BezierCurveCssManager.create(ease);
		jsEase = bezierCurve.toEasingFunction();
	}
	else {
		var predefinedEase = createPredefined(ease);
		if (predefinedEase.cssString === null) {
			throw new Error(ERROR_EASE_NOT_SUPPORTED.replace(/%EASE%/g, ease));
		}
		bezierCurve = BezierCurveCssManager.create(predefinedEase.cssString);
		jsEase = ease;
	}
	return {
		css: {
			'1': bezierCurve,
			'-1': bezierCurve.reversed()
		},
		js: jsEase
	};
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_complete
 * @function
 * @override
 * @private
 *
 * @fires ClipTransitionCss#complete
 */
/** @ignore */
proto._complete = function () {
	if ((this._isWaitingForStylesToBeApplied || this._isTransitionEnded || !this._isListeningForTransitionEnd) && this.progress() === 1) {
		this._isWaitingForStylesToBeApplied = false;
		Super._complete.call(this);
	}
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_onTransitionEnded
 * @function
 * @private
 *
 * @fires ClipTransitionCss#complete
 */
/** @ignore */
proto._onTransitionEnded = function () {
	this._isTransitionEnded = true;
	this._complete();
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_addTransitionListener
 * @function
 * @private
 */
/** @ignore */
proto._addTransitionListener = function () {
	if (!this._isListeningForTransitionEnd && this._el && this._onTransitionEnded) {
		this._isListeningForTransitionEnd = true;
		this._isTransitionEnded = false;
		this._el.addEventListener(transitionEnd, this._onTransitionEnded);
	}
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_removeTransitionListener
 * @function
 * @private
 */
/** @ignore */
proto._removeTransitionListener = function () {
	if (this._isListeningForTransitionEnd && this._el && this._onTransitionEnded) {
		this._isListeningForTransitionEnd = false;
		this._isTransitionEnded = false;
		this._el.removeEventListener(transitionEnd, this._onTransitionEnded);
	}
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_applyStyles
 * @function
 * @private
 *
 * @param {Number} duration
 * @param {Object} styles
 */
/** @ignore */
proto._applyStyles = function (duration, styles) {

	if (duration > 0) {
		var transition = '';
		var eases = {};
		var prop;
		for (prop in this._eases) {
			if (this._eases.hasOwnProperty(prop)) {
				// this._eases contains instances of BezierCurveCss
				// split on the current progress to return the correct css bezier curve ease
				eases[prop] = this._eases[prop][this._direction].splitAt(this.progress()).toCSSString();
			}
		}
		for (prop in this._stylesTo) {
			if (this._stylesTo.hasOwnProperty(prop)) {
				// iterate through each property and generate a transition string
				transition += prop + ' ' + duration + 'ms ' + eases[this._propsEaseKeys[prop]] + ' 0ms, ';
			}
		}
		this._currentTransitionStyles = transition.substr(0, transition.length-2);
		
		if(!this._doStylesMatchCurrentStyles(styles)) {
			this._addTransitionListener();
		}
		else {
			this._removeTransitionListener();
		}
	}
	else {
		// no transition if duration is 0
		this._currentTransitionStyles = '';
		this._removeTransitionListener();
	}

	styles['transition'] = this._getOtherClipTransitionStyles() + this._currentTransitionStyles;

	// apply styles using ac-dom-styles
	DomStyles.setStyle(this._el, styles);
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_doStylesMatchCurrentStyles
 * @function
 * @private
 */
/** @ignore */
proto._doStylesMatchCurrentStyles = function (newStyles) {
	var currentStyles = DomStyles.getStyle.apply(this, [this._el].concat([this._propsArray]));
	var style;
	for (style in newStyles) {
		if (newStyles.hasOwnProperty(style) && currentStyles.hasOwnProperty(style) && newStyles[style] !== currentStyles[style]) {
			return false;
		}
	}
	return true;
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_setStylesAfterWaiting
 * @function
 * @private
 */
/** @ignore */
proto._setStylesAfterWaiting = function () {
	this._isWaitingForStylesToBeApplied = false;
	// ensure still playing - 2 frames can be a long time ;)
	if (this.playing()) {
		var duration = this._durationMs * (1 - this.progress());
		var styles = (this._direction > 0) ? this._styleCompleteTo : this._styleCompleteFrom;
		this._applyStyles(duration, styles);
	}
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_setOtherTransitions
 * @function
 * @private
 */
/** @ignore */
proto._setOtherTransitions = function () {
	// remove CSS transitions that clash with properties Clip will animate
	removeTransitions(this._el, this._stylesTo);

	var clips = Clip.getAll(this._el);
	var i = clips.length;
	while (i--) {
		if (clips[i] !== this && 
			clips[i].playing() && 
			clips[i]._otherTransitions && 
			clips[i]._otherTransitions.length) {
			this._otherTransitions = clips[i]._otherTransitions;
			return;
		}
	}

	// store transitions that don't clash with properties Clip will animate
	// because two instances of clip might be transitioning differing properties
	this._otherTransitions = DomStyles.getStyle(this._el, 'transition').transition;
	if (this._otherTransitions === null || this._otherTransitions === 'all 0s ease 0s') {
		this._otherTransitions = '';
	}
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_getTransitionStyles
 * @function
 * @private
 */
/** @ignore */
proto._getTransitionStyles = function () {
	var transition = this._getOtherClipTransitionStyles();
	if (this._otherTransitions.length) {
		transition += this._otherTransitions;
	}
	else if (transition.length) {
		transition = transition.substr(0, transition.length-2);
	}
	return transition;
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_getOtherClipTransitionStyles
 * @function
 * @private
 */
/** @ignore */
proto._getOtherClipTransitionStyles = function () {
	var transition = '';
	var clips = Clip.getAll(this._el);
	var i = clips.length;
	while (i--) {
		if (clips[i] !== this && 
			clips[i].playing() && 
			clips[i]._currentTransitionStyles && 
			clips[i]._currentTransitionStyles.length) {
			transition += clips[i]._currentTransitionStyles + ', ';
		}
	}
	return transition;
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_onVisibilityChanged
 * @function
 * @private
 *
 * @param {Object} [evt=undefined]
 */
/** @ignore */
proto._onVisibilityChanged = function (evt) {
	if (this.playing() && !evt.isHidden) {
		this._update({
			timeNow: this._getTime()
		});
		
		var progress = this.progress();
		if (progress < 1) {
			this.progress(progress);
		}
	}
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_onPaused
 * @function
 * @private
 *
 * @param {Clip} [clip=undefined]
 */
/** @ignore */
proto._onPaused = function (clip) {
	// get current styles
	var styles = DomStyles.getStyle.apply(this, [this._el].concat([this._propsArray]));
	// remove transition
	styles['transition'] = this._getTransitionStyles();
	this._removeTransitionListener();

	DomStyles.setStyle(this._el, styles);
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_onStart
 * @function
 * @private
 *
 * @param {Clip} [clip=undefined]
 */
/** @ignore */
proto._onStart = function (clip) {
	// if progress is 0 and direction is 1 then we want to initially apply the fromStyles
	// therefore, to ensure the inital styles don't animate we have to wait 2 frames before
	// apply the end state with CSS transition properties
	var waitFrames = (this._direction === 1 && this.progress() === 0 && this._delay === 0) ? 2 : 0;
	if (waitFrames) {
		this._isWaitingForStylesToBeApplied = true;
		this._applyStyles(0, this._styleCompleteFrom);
	}

	waitAnimationFrames(this._setStylesAfterWaiting, waitFrames);

	if (typeof this._storeOnStart === 'function') {
		this._storeOnStart.call(this, this);
	}
};

/**
 * @name module:ac-eclipse.ClipTransitionCss#_onComplete
 * @function
 * @private
 *
 * @param {Clip} [clip=undefined]
 */
/** @ignore */
proto._onComplete = function (clip) {
	this._removeTransitionListener();
	this._completeStyles['transition'] = this._getTransitionStyles();
	DomStyles.setStyle(this._el, this._completeStyles);
	if (typeof this._storeOnComplete === 'function') {
		this._storeOnComplete.call(this, this);
	}
};

module.exports = ClipTransitionCss;

// ac-eclipse@2.1.0

},{"../helpers/BezierCurveCssManager":142,"../helpers/convertToStyleObject":145,"../helpers/convertToTransitionableObjects":146,"../helpers/isCssCubicBezierString":148,"../helpers/removeTransitions":149,"../helpers/splitUnits":150,"../helpers/transitionEnd":152,"../helpers/waitAnimationFrames":153,"./ClipEasing":138,"@marcom/ac-clip":60,"@marcom/ac-dom-styles":40,"@marcom/ac-easing":83,"@marcom/ac-object":98,"@marcom/ac-page-visibility":106}],141:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var createBezier = require('@marcom/ac-easing').createBezier;

/**
 * @name BezierCurveCss
 * @class
 *
 * @desc Stores information about a CSS cubic bezier easing curve and has useful methods
 *       for splitting and reversing etc.
 *
 * @link http://en.wikipedia.org/wiki/B%C3%A9zier_curve#Cubic_B.C3.A9zier_curves
 * @link http://dev.w3.org/csswg/css-transitions/#propdef-transition-timing-function
 *
 * @param {Array} curve
 *        An `Array` containing the two control points, e.g. `[0, 0, 1, 1]`
 *
 * @param {BezierCurveCssManager} manager
 *        A reference to the BezierCurveCssManager instance that will create new instancs
 *        of BezierCurveCss when split and reverse methods are invoked.
 */
function BezierCurveCss(curve, manager) {
	this.manager = manager;
	
	this.p1 = {
		x: curve[0],
		y: curve[1]
	};
	
	this.p2 = {
		x: curve[2],
		y: curve[3]
	};

	this._isLinear = (this.p1.x === this.p1.y) && (this.p2.x === this.p2.y);
	this._cacheSplits = {};
}

var proto = BezierCurveCss.prototype;

/**
 * @name BezierCurveCss#splitAt
 * @function
 *
 * @desc Splits this bezier curve at a percent (0 to 1) and returns a new BezierCurveCss.
 *       Note: the percent in this instance is the time, or the x-axis of the bezier curve.
 *
 * @param {Number} percent
 *        Accepts a Number between 0 and 1 at which the bezier curver should be split.
 *
 * @returns {BezierCurveCss} A new instance of BezierCurveCss.
 */
proto.splitAt = function (percent) {

	// if the ease is linear we don't need to split it
	if (this._isLinear) {
		return this;
	}

	// round the split percent to the nearest 0.025, e.g. 0.043778348757853837 will be 0.05 and 0.076347848 will be 0.075
	// it means the split curve isn't *perfect* but it'll be close enough and will be much better for performance
	percent = Math.round(percent * 40) / 40; // 40 is used here because 1 / 0.025 = 40

	if (percent === 0) {
		return this;
	}
	else if (this._cacheSplits[percent] !== undefined) {
		return this._cacheSplits[percent];
	}

	var x = [this.p1.x, this.p2.x];
	var y = [this.p1.y, this.p2.y];
	var maxIterations = 0;
	var targetX = percent;
	var min = 0;
	var max = 1;
	var startX = this._getStartX(percent, x);

	// So what's happening here? Let me try and explain...
	// CSS uses bezier curves for controlling easing of transitions. The x-axis is the time ratio
	// and the y-axis the output ratio. We want this function to split on the x-axis, as we're thinking
	// about time. Imagine an ease-in curve (0.42, 0.0, 1.00, 1.0). If you split the bezier curve at 0.5
	// you will actually be at 0.6575 on the x-axis. I'm not sure on the maths for getting the actual
	// value we want elegantly so for now we use the below (sort of brute force). It usually takes about
	// 50 iterations and runs in 0-1ms so it's not a major blocker but if you know a better way please
	// feel free to make a pull request.
	// 
	// Make sense? Probably not. Hopefully this diagram will help:
	// https://interactive-git.apple.com/github-enterprise-assets/0000/0080/0000/0508/596a7432-c904-11e4-9650-2db51bc94cfe.png
	while (targetX !== startX && maxIterations < 1000) {
		if (targetX < startX) {
			max = percent;
		}
		else {
			min = percent;
		}

		percent = min + ((max - min) * 0.5); // split min / max
		startX = this._getStartX(percent, x);

		// count iterations so we don't get a maximum call stack size exceeded error if something goes awry
		++maxIterations;
	}

	var split = this._splitBezier(percent, x, y);
	var normalized = this._normalize(split);
	var newBezierCurve = this.manager.create(normalized);

	this._cacheSplits[targetX] = newBezierCurve; // todo: this should probably be cached globally / go in BezierCurveCssManager

	return newBezierCurve;
};

/**
 * @name BezierCurveCss#reversed
 * @function
 *
 * @desc Inverts / rotates the bezier curve. If currently eases in the new BezierCurveCss will ease out.
 * @link http://stackoverflow.com/questions/23453721/opposite-of-ease-cubic-bezier-function
 *
 * @returns {BezierCurveCss} A new instance of BezierCurveCss.
 */
proto.reversed = function () {
	var arr = this.toArray();
	return this.manager.create([
		0.5 - (arr[2] - 0.5),
		0.5 - (arr[3] - 0.5),
		0.5 - (arr[0] - 0.5),
		0.5 - (arr[1] - 0.5)
	]);
};

/**
 * @name BezierCurveCss#toArray
 * @function
 *
 * @desc Returns the anchor points in an array with a length of 4 (as the first point is always 0,0 and the last point 1,1).
 *
 * @returns {Array} The anchor points in an array.
 */
proto.toArray = function () {
	return [
		this.p1.x,
		this.p1.y,
		this.p2.x,
		this.p2.y
	];
};

/**
 * @name BezierCurveCss#toCSSString
 * @function
 *
 * @desc Returns a string that can be used as a CSS ease, e.g. `'cubic-bezier(0.0, 0.0, 1.0, 1.0)'`.
 *
 * @returns {String} A string that can be used as a CSS ease.
 */
proto.toCSSString = function () {
	// todo: cache this
	return 'cubic-bezier(' + this.p1.x + ', ' + this.p1.y + ', ' + this.p2.x + ', ' + this.p2.y + ')';
};

/**
 * @name BezierCurveCss#toEasingFunction
 * @function
 *
 * @desc Returns the equivalent JS easing function.
 *
 * @returns {Function} Equivalent JS easing function.
 */
proto.toEasingFunction = function () {
	// todo: cache this
	return createBezier.apply(this, this.toArray()).easingFunction;
};

/**
 * @name BezierCurveCss#_getStartX
 * @function
 * @private
 *
 * @desc Similar to the _splitBezier function below but only returns the starting X position of the new curve.
 *
 * @param {Number} p
 *        A number between 0 and 1 representing the percent at which the curve should be split.
 *
 * @param {Array} x
 *        The x-axis control points. The start and end points are always 0 and 1 so the length
 *        of this array will always be 2 for the control points only.
 *
 * @returns {Number} todo.
 */
/** @ignore */
proto._getStartX = function (p, x) {
	var cp = p - 1;
	var p2 = p * p;
	var cp2 = cp * cp;
	var p3 = p2 * p;
	return p3 - 3*p2*cp*x[1] + 3*p*cp2*x[0];
};

/**
 * @name BezierCurveCss#_splitBezier
 * @function
 * @private
 *
 * @desc Splits a bezier curve at a percentage along it's curve. Uses De Casteljau's algorithm.
 * @link http://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm
 * @link http://stackoverflow.com/questions/8369488/splitting-a-bezier-curve
 *
 * @param {Number} p
 *        A number between 0 and 1 representing the percent at which the curve should be split.
 *
 * @param {Array} x
 *        The x-axis control points. The start and end points are always 0 and 1 so the length
 *        of this array will always be 2 for the control points only.
 *
 * @param {Array} y
 *        The y-axis control points. The start and end points are always 0 and 1 so the length
 *        of this array will always be 2 for the control points only.
 *
 * @returns {Array} Returns an array of the new start and control points. End points are not
 *                  included as they will always be 1,1.
 */
/** @ignore */
proto._splitBezier = function (p, x, y) {
	var cp = p - 1;
	var p2 = p * p;
	var cp2 = cp * cp;
	var p3 = p2 * p;
	return [
		p3 - 3*p2*cp*x[1] + 3*p*cp2*x[0],	// p0.x
		p3 - 3*p2*cp*y[1] + 3*p*cp2*y[0],	// p0.y
		p2 - 2*p*cp*x[1] + cp2*x[0],		// p1.x
		p2 - 2*p*cp*y[1] + cp2*y[0],		// p1.y
		p - cp*x[1],						// p2.x
		p - cp*y[1]							// p2.y
	];
};

/**
 * @name BezierCurveCss#_normalize
 * @function
 * @private
 *
 * @desc Bezier curves used in CSS easing must always start at 0,0 and end at 1,1.
 *       What this function does is take an Array of control points and stretches it to
 *       meet this requirments.
 *
 * @param {Array} array
 *        An array of start and control points. The end points are always 1,1.
 *
 * @returns {Array} A new array of control points.
 *                  Note: that start points are not inluded as they are now 0,0.
 */
/** @ignore */
proto._normalize = function (array) {
	return [
		(array[2] - array[0]) / (1 - array[0]),	// p1.x
		(array[3] - array[1]) / (1 - array[1]),	// p1.y
		(array[4] - array[0]) / (1 - array[0]),	// p2.x
		(array[5] - array[1]) / (1 - array[1])	// p2.y
	];
};

module.exports = BezierCurveCss;

// ac-eclipse@2.1.0

},{"@marcom/ac-easing":83}],142:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var BezierCurveCss = require('./BezierCurveCss');

/**
 * @name BezierCurveCssManager
 * @class
 * @singleton
 *
 * @desc Manages instances of BezierCurveCss to enable caching.
 */
function BezierCurveCssManager() {
	this._instances = {};
}

var proto = BezierCurveCssManager.prototype;

/**
 * @name BezierCurveCssManager#curve
 * @function
 *
 * @desc Returns an instance of BezierCurveCss. Checks to see if there's already an
 *       instance first otherwise create new instance.
 *
 * @param {String|Array} curve
 *        Either a CSS cubic bezier ease `String`, e.g. `'cubic-bezier(0.0, 0.0, 1.0, 1.0)'`.
 *        Alternatively, an `Array` containing the two control points, so using the above
 *        CSS string, `[0, 0, 1, 1]`
 *
 * @returns {BezierCurveCss} An instance of BezierCurveCss.
 */
proto.create = function (curve) {
	var key;
	if (typeof curve === 'string') {
		key = curve.replace(/ /g, '');
	}
	else {
		key = 'cubic-bezier(' + curve.join(',') + ')';
	}

	if (this._instances[key] === undefined) {
		if (typeof curve === 'string') {
			curve = curve.match(/\d*\.?\d+/g);
			var i = curve.length;
			while (i--) {
				curve[i] = Number(curve[i]);
			}
		}
		this._instances[key] = new BezierCurveCss(curve, this);
	}

	return this._instances[key];
};

module.exports = new BezierCurveCssManager();

// ac-eclipse@2.1.0

},{"./BezierCurveCss":141}],143:[function(require,module,exports){
// Currently include ac-transform causing old IE to fall over because Float32Array is undefined
if (typeof window.Float32Array === 'undefined') {
	window.Float32Array = function () {};
}

// ac-eclipse@2.1.0

},{}],144:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var splitUnits = require('./splitUnits');

/** @ignore */
var DomMetrics = require('@marcom/ac-dom-metrics');

/** @ignore */
var percentagePropToDimention = {
	translateX: 'width',
	translateY: 'height'
};

/**
 * @name TransformMatrix
 * @class
 *
 * @desc TransformMatrix is a sort of wrapper for ac-transform. It takes an object
 *       of styles and applies them to an instance of Transform
 *
 * @param {Transform} transform
 *        An instance of ac-transform.Transform.
 *
 * @param {Element} el
 *        The element to use to get dimentions from when using %.
 *
 * @param {Object} styles
 *        An object containing css transform partial properties, e.g. translateX.
 */
function TransformMatrix(transform, el, styles) {
	this._transform = transform;
	var split;
	var value;
	var prop;
	for (prop in styles) {
		if (styles.hasOwnProperty(prop) && typeof this._transform[prop] === 'function') {
			split = splitUnits(styles[prop]);
			if (split.unit === '%') {
				value = this._convertPercentToPixelValue(prop, split.value, el);
			}
			else {
				value = split.value;
			}
			this._transform[prop].call(this._transform, value);
		}
	}
}

var proto = TransformMatrix.prototype;

/**
 * @name TransformMatrix#_convertPercentToPixelValue
 * @function
 * @private
 *
 * @param {String} prop
 * @param {Number} value
 * @param {Element} el
 *
 * @return {Number}
 */
/** @ignore */
proto._convertPercentToPixelValue = function (prop, value, el) {
	prop = percentagePropToDimention[prop];
	var dimentions = DomMetrics.getDimensions(el);

	if (dimentions[prop]) {
		value *= 0.01;
		return dimentions[prop] * value;
	}

	return value;
};

/**
 * @name TransformMatrix#toArray
 * @function
 *
 * @desc Returns the transform matrix as an Array.
 *
 * @returns {Array}
 */
proto.toArray = function () {
	return this._transform.toArray();
};

/**
 * @name TransformMatrix#toCSSString
 * @function
 *
 * @desc Returns the transform matrix as a CSS compatible string.
 *
 * @returns {String}
 */
proto.toCSSString = function () {
	return this._transform.toCSSString();
};

module.exports = TransformMatrix;

// ac-eclipse@2.1.0

},{"./splitUnits":150,"@marcom/ac-dom-metrics":18}],145:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name convertToStyleObject
 * @function
 * 
 * @desc Convert a transitional styles object into actual CSS styles.
 *
 * @param {Object} target
 *        The object of transitional style properties to convert.
 *
 * @returns {Object} An object containing CSS styles.
 */
module.exports = function convertToStyleObject (target) {
	var styles = {};
	var matrix;
	var prop;
	for (prop in target) {
		if (target.hasOwnProperty(prop) && target[prop] !== null) {
			if (target[prop].isColor) {
				if (target[prop].isRgb) {
					styles[prop] = 'rgb(' + Math.round(target[prop].r) + ', ' + 
											Math.round(target[prop].g) + ', ' + 
											Math.round(target[prop].b) + ')';
				}
				else if (target[prop].isRgba) {
					styles[prop] = 'rgba(' + Math.round(target[prop].r) + ', ' + 
											Math.round(target[prop].g) + ', ' + 
											Math.round(target[prop].b) + ', ' + 
											target[prop].a + ')';
				}
			}
			else if (prop === 'transform') {
				matrix = (target[prop].length === 6) ? 'matrix' : 'matrix3d';
				styles[prop] = matrix + '(' + target[prop].join(',') + ')';
			}
			else if (!target[prop].unit) {
				styles[prop] = target[prop].value;
			}
			else {
				styles[prop] = target[prop].value + target[prop].unit;
			}
		}
	}
	return styles;
};

// ac-eclipse@2.1.0

},{}],146:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var clone = require('@marcom/ac-object').clone;
var splitUnits = require('./splitUnits');
var toCamCase = require('./toCamCase');

/** @ignore */
var Color = require('@marcom/ac-color').Color;
var DomStyles = require('@marcom/ac-dom-styles');
var Feature = require('@marcom/ac-feature');
var Transform = require('@marcom/ac-transform').Transform;
var TransformMatrix = require('./TransformMatrix');

// takes a color (hex, color name (e.g. red) etc)
// and returns an rgb/rgba object
var toColorObject = function (color) {
	if (Color.isRgba(color)) {
		color = new Color(color).rgbaObject();
		color['isRgba'] = true;
	}
	else {
		color = new Color(color).rgbObject();
		color['isRgb'] = true;
	}
	color['isColor'] = true;
	return color;
};

var convertRgbToRgbaObject = function (obj) {
	if (obj.isRgb) {
		obj.isRgb = false;
		obj.isRgba = true;
		obj.a = 1;
	}
};

var standardizeColors = function (target, propsFrom, propsTo) {
	if (target.isRgba || propsFrom.isRgba || propsTo.isRgba) {
		convertRgbToRgbaObject(target);
		convertRgbToRgbaObject(propsFrom);
		convertRgbToRgbaObject(propsTo);
	}
};

var convertMatrixTo3d = function (matrix) {
	return [matrix[0], matrix[1], 0, 0, matrix[2], matrix[3], 0, 0, 0, 0, 1, 0, matrix[4], matrix[5], 0, 1];
};

var standardizeMatrices = function (target, propsFrom, propsTo) {
	if (target['transform'].length === 16 || 
		propsFrom['transform'].length === 16 ||
		propsTo['transform'].length === 16) {

		if (target['transform'].length === 6) {
			target['transform'] = convertMatrixTo3d(target['transform']);
		}
		if (propsFrom['transform'].length === 6) {
			propsFrom['transform'] = convertMatrixTo3d(propsFrom['transform']);
		}
		if (propsTo['transform'].length === 6) {
			propsTo['transform'] = convertMatrixTo3d(propsTo['transform']);
		}
	}
};

/**
 * @name convertToTransitionableObjects
 * @function
 * 
 * @desc Converts objects containing CSS styles into objects that ac-clip.Clip can use / transition.
 *
 * @param {Element} el
 *        The element that will be used to get inital / target styles (the element that will be transitioned).
 *
 * @param {Object} propsTo
 *        The CSS styles that will be transitioned to.
 *
 * @param {Object} propsFrom
 *        The CSS styles that will be a start state when the clip starts. Defaults to the current styles of el.
 *
 * @returns {Object} An object containing transitionable styles broken into target, propsTo and propsFrom.
 */
module.exports = function convertToTransitionableObjects (el, propsTo, propsFrom) {

	var target = {};
	propsTo = clone(propsTo, true);
	propsFrom = clone(propsFrom, true);
	
	var style;	
	var mTarget, mTo, mFrom;
	var isTransformSupported = Feature.cssPropertyAvailable('transform');

	var prop;
	// first loop through each propTo value
	for (prop in propsTo) {
		if (propsTo.hasOwnProperty(prop) && propsTo[prop] !== null) {
			if (prop === 'transform') {
				if (isTransformSupported) {
					// Transform is a JS implementation of the CSS3-Transforms spec
					mTarget = new Transform();
					style = DomStyles.getStyle(el, 'transform')['transform'] || 'none';
					mTarget.setMatrixValue(style);
					// if transform should be relative use mTarget.clone() instead of new Transform()
					mTo = new TransformMatrix(new Transform(), el, propsTo[prop]);
				}
				if (mTo && mTo.toCSSString() !== mTarget.toCSSString()) {
					mFrom = new TransformMatrix(propsFrom[prop] ? new Transform() : mTarget.clone(), el, propsFrom[prop]);
					target[prop] = mTarget.toArray();
					propsTo[prop] = mTo.toArray();
					propsFrom[prop] = mFrom.toArray();
				}
				else {
					// transforms not supported
					target[prop] = null;
					propsTo[prop] = null;
				}
			}
			else {
				style = DomStyles.getStyle(el, prop)[toCamCase(prop)] || propsFrom[prop];
				if (Color.isColor(style)) {
					// for colors convert to RGB and use an object
					target[prop] = toColorObject(style);
					propsFrom[prop] = (propsFrom[prop] !== undefined) ? toColorObject(propsFrom[prop]) : clone(target[prop], true);
					propsTo[prop] = toColorObject(propsTo[prop]);
				}
				else {
					// splitUnits takes a CSS value (e.g. 10px) and breaks it into an object ({ value:10, unit:'px' })
					target[prop] = splitUnits(style);
					propsFrom[prop] = (propsFrom[prop] !== undefined) ? splitUnits(propsFrom[prop]) : clone(target[prop], true);
					propsTo[prop] = splitUnits(propsTo[prop]);
				}
			}
		}
	}

	// next we loop through propsFrom and if a propsFrom doesn't have a propsTo we add propsTo to match the current state of target
	for (prop in propsFrom) {
		if (propsFrom.hasOwnProperty(prop) && propsFrom[prop] !== null && (propsTo[prop] === undefined || propsTo[prop] === null)) {
			if (prop === 'transform') {
				if (isTransformSupported) {
					// Transform is a JS implementation of the CSS3-Transforms spec
					mTarget = new Transform();
					mTarget.setMatrixValue(getComputedStyle(el).transform || getComputedStyle(el).webkitTransform || 'none');
					// if transform should be relative use mTarget.clone() instead of new Transform()
					mFrom = new TransformMatrix(new Transform(), el, propsFrom[prop]);
				}
				if (mFrom && mFrom.toCSSString() !== mTarget.toCSSString()) {
					mTo = new TransformMatrix(mTarget.clone());
					target[prop] = mTarget.toArray();
					propsTo[prop] = mTo.toArray();
					propsFrom[prop] = mFrom.toArray();
				}
				else {
					// transforms not supported
					target[prop] = null;
					propsTo[prop] = null;
					propsFrom[prop] = null;
				}
			}
			else {
				style = DomStyles.getStyle(el, prop)[toCamCase(prop)];
				if (Color.isColor(style)) {
					// for colors convert to RGB and use an object
					target[prop] = toColorObject(style);
					propsTo[prop] = clone(target[prop], true);
					propsFrom[prop] = toColorObject(propsFrom[prop]);
				}
				else {
					// splitUnits takes a CSS value (e.g. 10px) and breaks it into an object ({ value:10, unit:'px' })
					target[prop] = splitUnits(style);
					propsFrom[prop] = splitUnits(propsFrom[prop]);
					propsTo[prop] = clone(target[prop], true);
				}
			}
		}

		// as we loop through all the properties here and we're done manipulating
		// them we can ensure color objects match (as in all rgb or all rgba)
		if (target[prop] && target[prop].isColor) {
			standardizeColors(target[prop], propsFrom[prop], propsTo[prop]);
		}
	}

	if (target['transform']) {
		standardizeMatrices(target, propsFrom, propsTo);
	}

	return {
		target: target,
		propsTo: propsTo,
		propsFrom: propsFrom
	};
};

// ac-eclipse@2.1.0

},{"./TransformMatrix":144,"./splitUnits":150,"./toCamCase":151,"@marcom/ac-color":62,"@marcom/ac-dom-styles":40,"@marcom/ac-feature":163,"@marcom/ac-object":98,"@marcom/ac-transform":130}],147:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name getShorthandTransition
 * @function
 * 
 * @desc Converts an object containing longhand CSS transition properties into a shorthand string.
 *
 * @param {Object} styles
 *        An object containing longhand CSS transition properties:
 *        transitionProperty, transitionDuration, transitionTimingFunction, transitionDelay.
 *
 * @returns {String} Transition properties as shorthand.
 */
module.exports = function getShorthandTransition (styles) {
	if (styles.transitionProperty) {
		var transition = '';
		var props = styles.transitionProperty.split(', ');
		var duration = styles.transitionDuration.split(', ');
		var ease = styles.transitionTimingFunction.replace(/\d+[,]+[\s]/gi, function (match) {
			return match.substr(0, match.length-1);
		}).split(', ');
		var delay = styles.transitionDelay.split(', ');

		var i = props.length;
		while (i--) {
			transition += props[i] + ' ' + duration[i] + ' ' + ease[i] + ' ' + delay[i] + ', ';
		}

		return transition.substr(0, transition.length - 2);
	}

	return false;
};

// ac-eclipse@2.1.0

},{}],148:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name isCssCubicBezierString
 * @function
 * 
 * @desc Returns a boolean depending if a string starts with 'cubic-bezier('.
 *       Essentially, is an easing string cubic-bezier or predefined easing name like 'ease-out'.
 *
 * @param {String} str
 *        An easing string (e.g. 'ease-out' or 'cubic-bezier(...)'.
 *
 * @returns {Boolean} `true` if the string starts with 'cubic-bezier(', else `false`
 */
module.exports = function isCssCubicBezierString (str) {
	return typeof str === 'string' && str.substr(0, 13) === 'cubic-bezier(';
};

// ac-eclipse@2.1.0

},{}],149:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getShorthandTransition = require('./getShorthandTransition');

/** @ignore */
var DomStyles = require('@marcom/ac-dom-styles');

/**
 * @name removeTransitions
 * @function
 *
 * @desc Removes any CSS transitions that already exist for properties that
 *       will be transitioned using Clip.
 *
 * @param {Element} el
 *        The element from which to get the CSS transition property.
 *
 * @param {Object} propsTo
 *        An object containing which properties will be transitioned / removed.
 */
module.exports = function removeTransitions (el, propsTo) {
	var transition = DomStyles.getStyle(el, 
		'transition',
		'transition-property',
		'transition-duration',
		'transition-timing-function',
		'transition-delay'
	);
	// DomStyles returns an object, if transition is undefined then instead get shorthand transitions
	transition = transition.transition || getShorthandTransition(transition);

	if (transition && transition.length) {
		transition = transition.split(',');
		var deleteCount = 0;
		var prop;
		var i = transition.length;
		while (i--) {
			prop = transition[i].trim().split(' ')[0];
			if (propsTo[prop] !== undefined) {
				transition.splice(i, 1);
				++deleteCount;
			}
		}
		if (deleteCount) {
			if (transition.length === 0) {
				transition = ['all'];
			}
			DomStyles.setStyle(el, {
				'transition': transition.join(',').trim()
			});
		}
	}
};

// ac-eclipse@2.1.0

},{"./getShorthandTransition":147,"@marcom/ac-dom-styles":40}],150:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name splitUnits
 * @function
 * 
 * @desc Takes a value with units and splits it into an object.
 *       E.g. '10px' becomes the object { value:10, units:'px' }
 *
 * @param {String} value
 *        The value to be converted into an object, e.g. '10px'.
 *
 * @returns {Object} The return object, contains 'value' and 'units'
 *                   e.g. { value:10, units:'px' }.
 */
module.exports = function splitUnits (value) {

	value = String(value);
	if (value.indexOf(' ') > -1) {
		throw new Error('Shorthand CSS is not supported. Please use longhand CSS only.');
	}

	var regex = /(\d*\.?\d*)(.*)/;
	var multipler = 1;

	if (value && value.substr(0, 1) === '-') {
		// if the value is negative
		value = value.substr(1);
		multipler = -1;
	}

	var match = String(value).match(regex);

	return {
		value: Number(match[1]) * multipler,
		unit: match[2]
	};
};

// ac-eclipse@2.1.0

},{}],151:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name toCamCase
 * @function
 * 
 * @desc Simply converts a dash seperated string to camel case.
 *       E.g. background-color becomes backgroundColor
 *
 * @param {String} str
 *        Input string, e.g. background-color
 *
 * @returns {String} Output string, e.g. backgroundColor.
 */
module.exports = function toCamCase (str) {

	var camelCaseReplace = function (match, group, offset, string) {
		return (offset === 0) && (string.substr(1, 3) !== 'moz') ? group : group.toUpperCase();
	};

	return str.replace(/-(\w)/g, camelCaseReplace);
};

// ac-eclipse@2.1.0

},{}],152:[function(require,module,exports){
'use strict';

var transitionEnd;

/* From Modernizr */
module.exports = (function transitionEndEvent () {

	if (transitionEnd) {
		return transitionEnd;
	}

	var t;
	var el = document.createElement('fakeelement');
	var transitions = {
		'transition':'transitionend',
		'OTransition':'oTransitionEnd',
		'MozTransition':'transitionend',
		'WebkitTransition':'webkitTransitionEnd'
	};

	for (t in transitions) {
		if ( el.style[t] !== undefined ) {
			transitionEnd = transitions[t];
			return transitionEnd;
		}
	}
})();

// ac-eclipse@2.1.0

},{}],153:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var PageVisibilityManager = require('@marcom/ac-page-visibility').PageVisibilityManager;

/**
 * @name waitAnimationFrames
 * @function
 * 
 * @desc Waits n amount of animation frames before triggering a callback function.
 *       This exists because when applying CSS styles to dom elements in certain
 *       browsers it takes more than one requestAnimationFrame to apply the styles.
 *       The issue is when using CSS transition - if you need to set an initial state
 *       and then animate to an end start using CSS transitions you need to wait 2
 *       frames otherwise the browser will animate to the initial state.
 *
 * @param {Function} callback
 *        The function to be called.
 *
 * @param {Number} frames
 *        The amount of frames to wait until triggering the callback.
 */
module.exports = function waitAnimationFrames (callback, frames) {
	if (frames) {
		var rAF = function (cb) {
			if (PageVisibilityManager.isHidden) {
				setTimeout(cb, 16);
			}
			else {
				window.requestAnimationFrame(cb);
			}
		};
		var count = 0;
		var waitFunc = function () {
			if (count === frames) {
				callback.call(this);
			}
			else {
				++count;
				rAF(waitFunc);
			}
		};
		waitFunc();
	}
	else {
		callback.call(this);
	}
};

// ac-eclipse@2.1.0

},{"@marcom/ac-page-visibility":106}],154:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var globalsHelper = require('./helpers/globals');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.canvasAvailable
 *
 * @function
 *
 * @desc Returns the availability of the HTML5 Canvas API.
 *
 * @returns {Boolean} `true` if the browser supports canvas, otherwise `false`.
 */
var canvasAvailable = function () {
	var documentObj = globalsHelper.getDocument();
	var canvas = documentObj.createElement('canvas');

	return !!(typeof canvas.getContext === 'function' && canvas.getContext('2d'));
};

module.exports = once(canvasAvailable);
module.exports.original = canvasAvailable;

// ac-feature@2.2.1

},{"./helpers/globals":162,"@marcom/ac-function/once":172}],155:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var ac_browser = require('ac-browser');
var touchAvailable = require('./touchAvailable').original;
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.continuousScrollEventsAvailable
 *
 * @function
 *
 * @desc Returns the availability of continuous scroll events.
 *       iOS < 8 pauses painting and does not fire scroll events during scroll (only at the start and end).
 *
 * @returns {Boolean} `true` if scroll events are fired during scrolling, otherwise `false`.
 */
function continuousScrollEventsAvailable() {
	return (!touchAvailable() || (ac_browser.os === 'iOS' && ac_browser.version >= 8) || ac_browser.name === 'Chrome');
}

module.exports = once(continuousScrollEventsAvailable);
module.exports.original = continuousScrollEventsAvailable;

// ac-feature@2.2.1

},{"./touchAvailable":193,"@marcom/ac-function/once":172,"ac-browser":186}],156:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var globalsHelper = require('./helpers/globals');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.cookiesAvailable
 *
 * @function
 *
 * @desc Returns the availability of cookies.
 *
 * @returns {Boolean} `true` if cookies are enabled, otherwise `false`.
 */
function cookiesAvailable() {
	var available = false;
	var documentObj = globalsHelper.getDocument();
	var navigatorObj = globalsHelper.getNavigator();

	try {
		if ('cookie' in documentObj && !!navigatorObj.cookieEnabled) {
			documentObj.cookie = 'ac_feature_cookie=1';
			available = (documentObj.cookie.indexOf('ac_feature_cookie') !== -1);
			documentObj.cookie = 'ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	} catch (err) {}

	return available;
}

module.exports = once(cookiesAvailable);
module.exports.original = cookiesAvailable;

// ac-feature@2.2.1

},{"./helpers/globals":162,"@marcom/ac-function/once":172}],157:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getStyleValue = require('@marcom/ac-prefixer/getStyleValue');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.cssLinearGradientAvailable
 *
 * @function
 *
 * @desc Returns the availability of linear-gradient() in CSS, including vendor-prefixed flavors.
 *
 * @returns {Boolean} `true` if linear-gradient() is available, otherwise `false`.
 */
function cssLinearGradientAvailable() {
	var values = [
		'linear-gradient(to bottom right, #9f9, white)',
		'linear-gradient(top left, #9f9, white)',
		'gradient(linear, left top, right bottom, from(#9f9), to(white))'
	];

	return values.some(function (value) {
		return !!getStyleValue('background-image', value);
	});
}

module.exports = once(cssLinearGradientAvailable);
module.exports.original = cssLinearGradientAvailable;

// ac-feature@2.2.1

},{"@marcom/ac-function/once":172,"@marcom/ac-prefixer/getStyleValue":176}],158:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getStyleValue = require('@marcom/ac-prefixer/getStyleValue');
var getStyleProperty = require('@marcom/ac-prefixer/getStyleProperty');
var memoize = require('@marcom/ac-function/memoize');

/**
 * @name module:ac-feature.cssPropertyAvailable
 *
 * @function
 *
 * @desc Returns the availability of a CSS property including vendor-prefixed flavors, along with an optional value.
 *
 * @param {String} property
 *        The CSS property to test.
 *        Can be in DOM (borderRadius) or CSS (border-radius) form.
 *
 * @param {String} [value]
 *        An optional value to test.
 *
 * @returns {Boolean} `true` if the browser supports the given CSS property/value, otherwise `false`.
 */
function cssPropertyAvailable(property, value) {
	if (typeof value !== 'undefined') {
		return !!getStyleValue(property, value);
	} else {
		return !!getStyleProperty(property);
	}
}

module.exports = memoize(cssPropertyAvailable);
module.exports.original = cssPropertyAvailable;

// ac-feature@2.2.1

},{"@marcom/ac-function/memoize":171,"@marcom/ac-prefixer/getStyleProperty":175,"@marcom/ac-prefixer/getStyleValue":176}],159:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getStyleValue = require('@marcom/ac-prefixer/getStyleValue');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.cssViewportUnitsAvailable
 *
 * @function
 *
 * @desc Returns the availability of `vw` and `vh` units in CSS.
 *
 * @returns {Boolean} `true` if the browser supports viewports units, otherwise `false`.
 */
function cssViewportUnitsAvailable() {
	return !!getStyleValue('margin', '1vw 1vh');
}

module.exports = once(cssViewportUnitsAvailable);
module.exports.original = cssViewportUnitsAvailable;

// ac-feature@2.2.1

},{"@marcom/ac-function/once":172,"@marcom/ac-prefixer/getStyleValue":176}],160:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var globalsHelper = require('./helpers/globals');
var memoize = require('@marcom/ac-function/memoize');

/**
 * @name module:ac-feature.elementAttributeAvailable
 *
 * @function
 *
 * @desc Returns the availability of an attribute on a specific element type.
 *
 * @param {String} attr
 *        The attribute to test for.
 *
 * @param {String} [tagName='div']
 *        An optional Element tagName
 *
 * @returns {Boolean} `true` if the Element supports the given attribute, otherwise `false`.
 */
function elementAttributeAvailable(attr, tagName) {
	var documentObj = globalsHelper.getDocument();
	var el;

	tagName = tagName || 'div';
	el = documentObj.createElement(tagName);

	return (attr in el);
}

module.exports = memoize(elementAttributeAvailable);
module.exports.original = elementAttributeAvailable;

// ac-feature@2.2.1

},{"./helpers/globals":162,"@marcom/ac-function/memoize":171}],161:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getEventType = require('@marcom/ac-prefixer/getEventType');
var memoize = require('@marcom/ac-function/memoize');

/**
 * @name module:ac-feature.eventTypeAvailable
 *
 * @function
 *
 * @desc Returns the availability of a CSS property including vendor-prefixed flavors, along with an optional value.
 *
 * @param {String} property
 *        The CSS property to test.
 *        Can be in DOM (borderRadius) or CSS (border-radius) form.
 *
 * @param {String} [tagName='div']
 *        An optional Element tagName
 *
 * @returns {Boolean} `true` if the browser supports the given CSS property/value, otherwise `false`.
 */
function eventTypeAvailable(type, tagName) {
	return !!getEventType(type, tagName);
}

module.exports = memoize(eventTypeAvailable);
module.exports.original = eventTypeAvailable;

// ac-feature@2.2.1

},{"@marcom/ac-function/memoize":171,"@marcom/ac-prefixer/getEventType":174}],162:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:globals
 * @private
 */
module.exports = {
	/**
	 * @name module.globals.getWindow
	 *
	 * @function
	 *
	 * @desc Get the window object.
	 *
	 * @returns {Window}
	 */
	getWindow: function () {
		return window;
	},

	/**
	 * @name module.globals.getDocument
	 *
	 * @function
	 *
	 * @desc Get the document object.
	 *
	 * @returns {Document}
	 */
	getDocument: function () {
		return document;
	},

	/**
	 * @name module.globals.getNavigator
	 *
	 * @function
	 *
	 * @desc Get the navigator object.
	 *
	 * @returns {Navigator}
	 */
	getNavigator: function () {
		return navigator;
	}
};

// ac-feature@2.2.1

},{}],163:[function(require,module,exports){
/**
 * Helper methods for detecting the availability of various browser features.
 * @module ac-feature
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	canvasAvailable: require('./canvasAvailable'),
	continuousScrollEventsAvailable: require('./continuousScrollEventsAvailable'),
	cookiesAvailable: require('./cookiesAvailable'),
	cssLinearGradientAvailable: require('./cssLinearGradientAvailable'),
	cssPropertyAvailable: require('./cssPropertyAvailable'),
	cssViewportUnitsAvailable: require('./cssViewportUnitsAvailable'),
	elementAttributeAvailable: require('./elementAttributeAvailable'),
	eventTypeAvailable: require('./eventTypeAvailable'),
	isDesktop: require('./isDesktop'),
	isHandheld: require('./isHandheld'),
	isRetina: require('./isRetina'),
	isTablet: require('./isTablet'),
	localStorageAvailable: require('./localStorageAvailable'),
	mediaElementsAvailable: require('./mediaElementsAvailable'),
	mediaQueriesAvailable: require('./mediaQueriesAvailable'),
	sessionStorageAvailable: require('./sessionStorageAvailable'),
	svgAvailable: require('./svgAvailable'),
	threeDTransformsAvailable: require('./threeDTransformsAvailable'),
	touchAvailable: require('./touchAvailable'),
	webGLAvailable: require('./webGLAvailable')
};

// ac-feature@2.2.1

},{"./canvasAvailable":154,"./continuousScrollEventsAvailable":155,"./cookiesAvailable":156,"./cssLinearGradientAvailable":157,"./cssPropertyAvailable":158,"./cssViewportUnitsAvailable":159,"./elementAttributeAvailable":160,"./eventTypeAvailable":161,"./isDesktop":164,"./isHandheld":165,"./isRetina":166,"./isTablet":167,"./localStorageAvailable":168,"./mediaElementsAvailable":169,"./mediaQueriesAvailable":170,"./sessionStorageAvailable":190,"./svgAvailable":191,"./threeDTransformsAvailable":192,"./touchAvailable":193,"./webGLAvailable":194}],164:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var touchAvailable = require('./touchAvailable').original;
var globalsHelper = require('./helpers/globals');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.isDesktop
 *
 * @function
 *
 * @desc Attempts to determine if device is a Desktop.
 *       The test is based on the assumptions that desktops don't support touch and aren't orientable.
 *
 * @returns {Boolean} `true` if device does not support touch and/or orientation, otherwise `false`.
 */
function isDesktop() {
	var windowObj = globalsHelper.getWindow();

	return (!touchAvailable() && !windowObj.orientation);
}

module.exports = once(isDesktop);
module.exports.original = isDesktop;

// ac-feature@2.2.1

},{"./helpers/globals":162,"./touchAvailable":193,"@marcom/ac-function/once":172}],165:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isDesktop = require('./isDesktop').original;
var isTablet = require('./isTablet').original;
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.isHandheld
 *
 * @function
 *
 * @desc Attempts to determine if device is a Handheld (e.g., iPhone, iPod Touch, etc).
 *       The test is based on the value of [isDesktop()]{module:ac-feature.isDesktop()}
 *       and if the device screen width is < 600px.
 *
 * @returns {Boolean} `true` if device is not a Desktop or Tablet, otherwise `false`.
 */
function isHandheld() {
	return (!isDesktop() && !isTablet());
}

module.exports = once(isHandheld);
module.exports.original = isHandheld;

// ac-feature@2.2.1

},{"./isDesktop":164,"./isTablet":167,"@marcom/ac-function/once":172}],166:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var globalsHelper = require('./helpers/globals');

/**
 * @name module:ac-feature.isRetina
 *
 * @function
 *
 * @desc Determines whether or not the display is Retina.
 *       Note: This function is not memoized.
 *
 * @returns {Boolean} `true` if the DPR is >= 1.5, otherwise `false`.
 */
module.exports = function isRetina() {
	var windowObj = globalsHelper.getWindow();
	return ('devicePixelRatio' in windowObj && windowObj.devicePixelRatio >= 1.5);
};

// ac-feature@2.2.1

},{"./helpers/globals":162}],167:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isDesktop = require('./isDesktop').original;
var globalsHelper = require('./helpers/globals');
var once = require('@marcom/ac-function/once');
var MIN_TABLET_WIDTH = 600; // min width that we'd consider a tablet device to be / max handheld

/**
 * @name module:ac-feature.isTablet
 *
 * @function
 *
 * @desc Attempts to determine if device is a Tablet.
 *       The test is based on the values of [isDesktop()]{module:ac-feature.isDesktop()}
 *       and if the device screen width is >= 600px.
 *
 * @returns {Boolean} `true` if device is determined to be a Tablet otherwise `false`.
 */
function isTablet() {
	var windowObj = globalsHelper.getWindow();
	var width = windowObj.screen.width;

	if (windowObj.orientation && windowObj.screen.height < width) {
		// normalize screen width for orientable devices
		width = windowObj.screen.height;
	}

	return (!isDesktop() && width >= MIN_TABLET_WIDTH);
}

module.exports = once(isTablet);
module.exports.original = isTablet;

// ac-feature@2.2.1

},{"./helpers/globals":162,"./isDesktop":164,"@marcom/ac-function/once":172}],168:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var globalsHelper = require('./helpers/globals');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.localStorageAvailable
 *
 * @function
 *
 * @desc Returns the availability of HTML5 localStorage.
 *       Privacy mode must be disabled and cookies must be enabled.
 *       NOTE: Does not support Firefox <= 13 because of a bug where Firefox
 *       interprets a nonexistent item as null instead of undefined
 *
 * @returns {Boolean} `true` if localStorage is available, otherwise `false`.
 */
function localStorageAvailable() {
	var windowObj = globalsHelper.getWindow();
	var available = false;

	try {
		available = !!(windowObj.localStorage && windowObj.localStorage.non_existent !== null);
	} catch (err) {}

	return available;
}

module.exports = once(localStorageAvailable);
module.exports.original = localStorageAvailable;

// ac-feature@2.2.1

},{"./helpers/globals":162,"@marcom/ac-function/once":172}],169:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var globalsHelper = require('./helpers/globals');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.mediaElementsAvailable
 *
 * @function
 *
 * @desc Returns the availability of HTML5 video/audio tags
 *
 * @returns {Boolean} `true` if the browser supports video/audio tags, otherwise `false`.
 */
function mediaElementsAvailable() {
	var windowObj = globalsHelper.getWindow();

	return ('HTMLMediaElement' in windowObj);
}

module.exports = once(mediaElementsAvailable);
module.exports.original = mediaElementsAvailable;

// ac-feature@2.2.1

},{"./helpers/globals":162,"@marcom/ac-function/once":172}],170:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

require('@marcom/ac-polyfills/matchMedia');

/** @ignore */
var globalsHelper = require('./helpers/globals');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.mediaQueriesAvailable
 *
 * @function
 *
 * @desc Returns the availability of HTML5 video/audio tags
 *
 * @returns {Boolean} `true` if the browser supports video/audio tags, otherwise `false`.
 */
function mediaQueriesAvailable() {
	var windowObj = globalsHelper.getWindow();
	var mql = windowObj.matchMedia('only all');

	return !!(mql && mql.matches);
}

module.exports = once(mediaQueriesAvailable);
module.exports.original = mediaQueriesAvailable;

// ac-feature@2.2.1

},{"./helpers/globals":162,"@marcom/ac-function/once":172,"@marcom/ac-polyfills/matchMedia":173}],171:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name defaultHashFunction
 *
 * @function
 * @private
 *
 * @desc Creates a cache key based on arguments
 *
 * @param {...*}
 *
 * @returns {String} Comma-separated string of arguments
 */
var defaultHashFunction = function () {
	var key = '';
	var i;

	for (i = 0; i < arguments.length; i++) {
		if (i > 0) {
			key += ',';
		}

		key += arguments[i];
	}

	return key;
};

/**
 * @name module:ac-function.memoize
 *
 * @function
 *
 * @desc Creates a function that memoizes the result of `func`
 *
 * @param {Function} func
 *        The function to be memoized
 *
 * @param {Function} [hashFunction]
 *        A function that returns a cache key based on arguments
 *        Creates a comma-separated string of arguments by default
 *
 * @returns {Function}
 */
module.exports = function memoize(func, hashFunction) {
	hashFunction = hashFunction || defaultHashFunction;

	var memoized = function () {
		var args = arguments;
		var key = hashFunction.apply(this, args);

		if (!(key in memoized.cache)) {
			memoized.cache[key] = func.apply(this, args);
		}

		return memoized.cache[key];
	};

	memoized.cache = {};

	return memoized;
};

// ac-function@1.1.0

},{}],172:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-function.once
 *
 * @function
 *
 * @desc Creates a function that executes `func` only once
 *
 * @param {Function} func
 *        The function to be executed once
 *
 * @returns {Function}
 */
module.exports = function once(func) {
	var result;

	return function () {
		if (typeof result === 'undefined') {
			result = func.apply(this, arguments);
		}

		return result;
	};
};

// ac-function@1.1.0

},{}],173:[function(require,module,exports){
/**
	matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license
*/
window.matchMedia = window.matchMedia || (function (doc, undefined) {

	var bool, docElem = doc.documentElement,
	    refNode = docElem.firstElementChild || docElem.firstChild,

	// fakeBody required for <FF4 when executed in <head>
	fakeBody = doc.createElement('body'),
	     div = doc.createElement('div');

	div.id = 'mq-test-1';
	div.style.cssText = "position:absolute;top:-100em";
	fakeBody.style.background = "none";
	fakeBody.appendChild(div);

	return function (q) {

		div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width:42px; }</style>';

		docElem.insertBefore(fakeBody, refNode);
		bool = div.offsetWidth === 42;
		docElem.removeChild(fakeBody);

		return {
			matches: bool,
			media: q
		};
	};

}(document));
// ac-polyfills@2.2.2

},{}],174:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"./shared/camelCasedEventTypes":177,"./shared/prefixHelper":179,"./shared/windowFallbackEventTypes":182,"./utils/eventTypeAvailable":183,"dup":2}],175:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"./shared/getStyleTestElement":178,"./shared/prefixHelper":179,"./shared/stylePropertyCache":180,"./utils/toCSS":184,"./utils/toDOM":185,"dup":43}],176:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"./getStyleProperty":175,"./shared/prefixHelper":179,"./shared/stylePropertyCache":180,"./shared/styleValueAvailable":181,"dup":44}],177:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],178:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],179:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],180:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],181:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"./getStyleTestElement":178,"./stylePropertyCache":180,"dup":48}],182:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],183:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],184:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],185:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],186:[function(require,module,exports){
'use strict';

var BrowserData = require('./ac-browser/BrowserData');
var webkitRegExp = /applewebkit/i;
var IE = require('./ac-browser/IE');

/**
 * Reports information about the user's browser and device
 * based on the userAgent string and feature detection.
 * @reference http://www.quirksmode.org/js/detect.html
 * @name module:ac-browser
 * @kind namespace
 */
var browser = BrowserData.create();

/**
 * Returns true/false whether the browser is WebKit based
 * @param  {String}  userAgentString
 * @return {Boolean}
 * @name module:ac-browser.isWebKit
 * @kind function
 */
browser.isWebKit = function(userAgentString) {
	var userAgent = userAgentString || window.navigator.userAgent;
	return userAgent ? !! webkitRegExp.test(userAgent) : false;
};

/**
 * @type {String}
 * @name module:ac-browser.lowerCaseUserAgent
 */
browser.lowerCaseUserAgent = navigator.userAgent.toLowerCase();

if (browser.name === 'IE') {
	/**
	 * Only available in Internet Explorer
	 * @name module:ac-browser.IE
	 * @kind namespace
	 */
	browser.IE = {
		/**
		 * The emulated Internet Explorer version, which may not match actual version
		 * @name module:ac-browser.IE.documentMode
		 * @type {Number}
		 */
		documentMode: IE.getDocumentMode()
	};
}

module.exports = browser;

},{"./ac-browser/BrowserData":187,"./ac-browser/IE":188}],187:[function(require,module,exports){
'use strict';

require('ac-polyfills/Array/prototype.filter');
require('ac-polyfills/Array/prototype.some');

var _data = require('./data');

function BrowserData() { }

BrowserData.prototype = {
	/**
	 * Parses string (such as userAgent) and returns the browser version
	 * @param  {String} stringToSearch
	 * @return {Number}
	 */
	__getBrowserVersion: function(stringToSearch, identity) {
		var version;

		if (!stringToSearch || !identity) {
			return;
		}

		// Filters data.browser for the members with identities equal to identity
		var filteredData = _data.browser.filter(function(item) {
			return item.identity === identity;
		});

		filteredData.some(function (item) {
			var versionSearchString = item.versionSearch || identity;
			var index = stringToSearch.indexOf(versionSearchString);

			if (index > -1) {
				version = parseFloat(stringToSearch.substring(index + versionSearchString.length + 1));
				return true;
			}
		});

		return version;
	},

	/**
	 * Alias for __getIdentityStringFromArray
	 * @param  {Array} browserData | Expects data.browser
	 * @return {String}
	 */
	__getName: function(dataBrowser) {
		return this.__getIdentityStringFromArray(dataBrowser);
	},

	/**
	 * Expects single member of data.browser or data.os
	 * and returns a string to be used in os or name.
	 * @param  {Object} item
	 * @return {String}
	 */
	__getIdentity: function(item) {
		if (item.string) {
			return this.__matchSubString(item);
		} else if (item.prop) {
			return item.identity;
		}
	},

	/**
	 * Iterates through data.browser or data.os returning the correct
	 * browser or os identity
	 * @param  {Array} dataArray
	 * @return {String}
	 */
	__getIdentityStringFromArray: function(dataArray) {
		for (var i = 0, l = dataArray.length, identity; i < l; i++) {
			identity = this.__getIdentity(dataArray[i]);
			if (identity) {
				return identity;
			}
		}
	},

	/**
	 * Alias for __getIdentityStringFromArray
	 * @param  {Array} OSData | Expects data.os
	 * @return {String}
	 */
	__getOS: function(dataOS) {
		return this.__getIdentityStringFromArray(dataOS);
	},

	/**
	 * Parses string (such as userAgent) and returns the operating system version
	 * @param {String} stringToSearch
	 * @param {String} osIdentity
	 * @return {String|Number} int if not a decimal delimited version
	 */
	__getOSVersion: function(stringToSearch, osIdentity) {

		if (!stringToSearch || !osIdentity) {
			return;
		}

		// Filters data.os returning the member with an identity equal to osIdentity
		var filteredData = _data.os.filter(function(item) {
			return item.identity === osIdentity;
		})[0];

		var versionSearchString = filteredData.versionSearch || osIdentity;
		var regex = new RegExp(versionSearchString + ' ([\\d_\\.]+)', 'i');
		var version = stringToSearch.match(regex);

		if (version !== null) {
			return version[1].replace(/_/g, '.');
		}
	},

	/**
	 * Regular expression and indexOf against item.string using item.subString as the pattern
	 * @param  {Object} item
	 * @return {String}
	 */
	__matchSubString: function(item) {
		var subString = item.subString;
		if (subString) {
			var matches = subString.test ? !!subString.test(item.string) : item.string.indexOf(subString) > -1;
			if (matches) {
				return item.identity;
			}
		}
	}
};

BrowserData.create = function () {
	var instance = new BrowserData();
	var out = {};
	/**
	 * @type {String}
	 * @name module:ac-browser.name
	 */
	out.name      = instance.__getName(_data.browser);
	/**
	 * @type {String}
	 * @name module:ac-browser.version
	 */
	out.version   = instance.__getBrowserVersion(_data.versionString, out.name);
	/**
	 * @type {String}
	 * @name module:ac-browser.os
	 */
	out.os        = instance.__getOS(_data.os);
	/**
	 * @type {String}
	 * @name module:ac-browser.osVersion
	 */
	out.osVersion = instance.__getOSVersion(_data.versionString, out.os);
	return out;
};

module.exports = BrowserData;

},{"./data":189,"ac-polyfills/Array/prototype.filter":197,"ac-polyfills/Array/prototype.some":198}],188:[function(require,module,exports){
'use strict';

module.exports = {
	/**
	 * Detect what version or document/standards mode IE is rendering the page as.
	 * Accounts for later versions of IE rendering pages in earlier standards modes. E.G. it is
	 * possible to set the X-UA-Compatible tag to tell IE9 to render pages in IE7 standards mode.//
	 * Based on Microsoft test
	 * @see http://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx
	 */
	getDocumentMode: function () {
		var ie;

		// IE8 or later
		if (document.documentMode) {
			ie = parseInt(document.documentMode, 10);
		// IE 5-7
		} else {
			// Assume quirks mode unless proven otherwise
			ie = 5;
			if (document.compatMode) {
				// standards mode
				if (document.compatMode === "CSS1Compat") {
					ie = 7;
				}
			}
			// There is no test for IE6 standards mode because that mode
			// was replaced by IE7 standards mode; there is no emulation.
		}
		return ie;
	}
};

},{}],189:[function(require,module,exports){
'use strict';

module.exports = {
	// Used to test getName
	browser: [
		{
			string: window.navigator.userAgent,
			subString: "Edge",
			identity: "Edge"
		},
		{
			string: window.navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{
			string: window.navigator.userAgent,
			subString: /silk/i,
			identity: "Silk"
		},
		{
			string: window.navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: window.navigator.userAgent,
			subString: /mobile\/[^\s]*\ssafari\//i,
			identity: "Safari Mobile",
			versionSearch: "Version"
		},
		{
			string: window.navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: window.navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: window.navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: window.navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: window.navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{ // for newer Netscapes (6+)
			string: window.navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		// IE < 11
		{
			string: window.navigator.userAgent,
			subString: "MSIE",
			identity: "IE",
			versionSearch: "MSIE"
		},
		// IE >= 11
		{
			string: window.navigator.userAgent,
			subString: "Trident",
			identity: "IE",
			versionSearch: "rv"
		},
		{
			string: window.navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ // for older Netscapes (4-)
			string: window.navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	// Used to test getOS
	os: [
		{
			string: window.navigator.platform,
			subString: "Win",
			identity: "Windows",
			versionSearch: "Windows NT"
		},
		{
			string: window.navigator.platform,
			subString: "Mac",
			identity: "OS X"
		},
		{
			string: window.navigator.userAgent,
			subString: "iPhone",
			identity: "iOS",
			versionSearch: "iPhone OS"
		},
		{
			string: window.navigator.userAgent,
			subString: "iPad",
			identity: "iOS",
			versionSearch: "CPU OS"
		},
		{
			string: window.navigator.userAgent,
			subString: /android/i,
			identity: "Android"
		},
		{
			string: window.navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	],
	// Used to test version and osVersion
	versionString: window.navigator.userAgent || window.navigator.appVersion || undefined
};

},{}],190:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var globalsHelper = require('./helpers/globals');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.sessionStorageAvailable
 *
 * @function
 *
 * @desc Returns the availability of HTML5 sessionStorage.
 *       Privacy mode must be disabled and cookies must be enabled.
 *
 * @returns {Boolean} `true` if sessionStorage is available, otherwise `false`.
 */
function sessionStorageAvailable() {
	var windowObj = globalsHelper.getWindow();
	var available = false;

	try {
		if ('sessionStorage' in windowObj && typeof windowObj.sessionStorage.setItem === 'function') {
			windowObj.sessionStorage.setItem('ac_feature', 'test');
			available = true;
			windowObj.sessionStorage.removeItem('ac_feature', 'test');
		}
	} catch (e) {}

	return available;
}

module.exports = once(sessionStorageAvailable);
module.exports.original = sessionStorageAvailable;

// ac-feature@2.2.1

},{"./helpers/globals":162,"@marcom/ac-function/once":172}],191:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var globalsHelper = require('./helpers/globals');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.svgAvailable
 *
 * @function
 *
 * @desc Returns the availability of SVG for <img> tags and background images.
 *
 * @returns {Boolean} `true` if SVG is supported, otherwise `false`.
 */
function svgAvailable() {
	var documentObj = globalsHelper.getDocument();

	return !!documentObj.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
}

module.exports = once(svgAvailable);
module.exports.original = svgAvailable;

// ac-feature@2.2.1

},{"./helpers/globals":162,"@marcom/ac-function/once":172}],192:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var getStyleValue = require('@marcom/ac-prefixer/getStyleValue');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.threeDTransformsAvailable
 *
 * @function
 *
 * @desc Returns the availability of 3D transforms (e.g., 'translateZ').
 *
 * @returns {Boolean} `true` if 3D transforms are supported, otherwise `false`.
 */
function threeDTransformsAvailable() {
	return !!(getStyleValue('perspective', '1px') && getStyleValue('transform', 'translateZ(0)'));
}

module.exports = once(threeDTransformsAvailable);
module.exports.original = threeDTransformsAvailable;

// ac-feature@2.2.1

},{"@marcom/ac-function/once":172,"@marcom/ac-prefixer/getStyleValue":176}],193:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var globalsHelper = require('./helpers/globals');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.touchAvailable
 *
 * @function
 *
 * @desc Returns the availability of touch events.
 *
 * @returns {Boolean} `true` if touch events are supported, otherwise `false`.
 */
function touchAvailable() {
	var windowObj = globalsHelper.getWindow();
	var documentObj = globalsHelper.getDocument();
	var navigatorObj = globalsHelper.getNavigator();

	// DocumentTouch is specific to Firefox <25 support.
	// navigator.maxTouchPoints and navigator.msMaxTouchPoints are specific to IE10 & 11
	return !!(('ontouchstart' in windowObj) ||
		(windowObj.DocumentTouch && documentObj instanceof windowObj.DocumentTouch) ||
		(navigatorObj.maxTouchPoints > 0) ||
		(navigatorObj.msMaxTouchPoints > 0));
}

module.exports = once(touchAvailable);
module.exports.original = touchAvailable;

// ac-feature@2.2.1

},{"./helpers/globals":162,"@marcom/ac-function/once":172}],194:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var globalsHelper = require('./helpers/globals');
var once = require('@marcom/ac-function/once');

/**
 * @name module:ac-feature.webGLAvailable
 *
 * @function
 *
 * @desc Returns the availability of the HTML5 webGL API.
 *
 * @returns {Boolean} `true` if the browser supports webGL, otherwise `false`.
 */
function webGLAvailable() {
	var documentObj = globalsHelper.getDocument();
	var canvas = documentObj.createElement('canvas');

	if (typeof canvas.getContext === 'function') {
		return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
	}

	return false;
}

module.exports = once(webGLAvailable);
module.exports.original = webGLAvailable;

// ac-feature@2.2.1

},{"./helpers/globals":162,"@marcom/ac-function/once":172}],195:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var Clip = require('@marcom/ac-eclipse').Clip;

/**
 * @name module:ac-solar.scroll
 *
 * @function
 *
 * @desc Scrolls an element both horizontally and vertically.
 *
 * @param {Element} el
 *        The element to scroll.
 *
 * @param {Number} x
 *        The position to scroll to.
 *
 * @param {Number} y
 *        The position to scroll to.
 *
 * @param {Number} duration
 *        The duration of the scroll, how long it should take to animation.
 *
 * @param {Object} options
 *        Contains any AC Clip options specific to your scroll animation.
 *
 * @returns {Clip} The clip that controls the animation.
 */
module.exports = function scroll (el, x, y, duration, options) {

	options = options || {};

	var isWindow = el === window;
	var currentScrollPositionX;
	var currentScrollPositionY;

	if (isWindow) {
		currentScrollPositionX = el.scrollX;
		currentScrollPositionY = el.scrollY;
	} else {
		currentScrollPositionX = el.scrollLeft;
		currentScrollPositionY = el.scrollTop;
	}

	var scrollPosition = {
		x: currentScrollPositionX,
		y: currentScrollPositionY
	};

	var to = {
		x: x,
		y: y
	};

	if (typeof options.onDraw === 'function') {
		var storeOnDraw = options.onDraw;
	}

	var newOnDraw = function (evt) {
		if(isWindow) {
			el.scrollTo(scrollPosition.x, scrollPosition.y);
		} else {
			el.scrollLeft = scrollPosition.x;
			el.scrollTop = scrollPosition.y;
		}

		if (storeOnDraw) {
			storeOnDraw.call(this, evt);
		}
	};

	options.onDraw = newOnDraw;

	return Clip.to(scrollPosition, duration, to, options);
};
// ac-solar@1.2.0

},{"@marcom/ac-eclipse":135}],196:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var scroll = require('./scroll');

/**
 * @name module:ac-solar.scrollY
 *
 * @function
 *
 * @desc Scrolls an element vertically.
 *
 * @param {Element} el
 *        The element to scroll.
 *
 * @param {Number} y
 *        The position to scroll to.
 *
 * @param {Number} duration
 *        The duration of the scroll, how long it should take to animation.
 *
 * @param {Object} options
 *        Contains any AC Clip options specific to your scroll animation.
 *
 * @returns {Clip} The clip that controls the animation.
 */
module.exports = function scrollY (el, y, duration, options) {
	var isWindow = el === window;
	var currentScrollPositionX;

	if (isWindow) {
		currentScrollPositionX = el.scrollX;
	} else {
		currentScrollPositionX = el.scrollLeft;
	}

	return scroll(el, currentScrollPositionX, y, duration, options);
};

// ac-solar@1.2.0

},{"./scroll":195}],197:[function(require,module,exports){
if (!Array.prototype.filter) {
/**
	Tests all elements in an array and returns a new array filled with elements that pass the test.
	@param {Function} callback Function to test against. The callback must return a boolean value.
	@param {Object} thisObj Object to use as `this` when executing the callback.
	@returns {Array} Returns a new array populated with values from the original array that passed the test implemented by the provided function.
	@reference https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
*/
	Array.prototype.filter = function filter(callback, thisObj) {
		var arrayObject = Object(this);
		// Mimic ES5 spec call for interanl method ToUint32()
		var len = arrayObject.length >>> 0;
		var i;
		var results = [];

		// Callback must be a callable function
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}

		for (i = 0; i < len; i += 1) {
			if (i in arrayObject && callback.call(thisObj, arrayObject[i], i, arrayObject)) {
				results.push(arrayObject[i]);
			}
		}

		return results;
	};
}
},{}],198:[function(require,module,exports){
if (!Array.prototype.some) {
/**
	Essentially the opposite of Array.prototype.every, Array.prototype.some calls a provided callback function once
	for each element in an array, until the callback function returns true.
	@param {Function} callback The fucntion to execute on each element in the array. The return value must evaluate to
	a boolean true in order for the entire method to return true.
	@param {Object} thisObj Optional; The object to use as `this` when executing the callback
	@returns {Boolean} true if the callback returns a true value, otherwise false.
*/
	Array.prototype.some = function some(callback, thisObj) {
		var arrayObj = Object(this);
		// Mimic ES5 spec call for interanl method ToUint32()
		var len = arrayObj.length >>> 0;
		var i;

		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}

		for (i = 0; i < len; i += 1) {
			if (i in arrayObj && callback.call(thisObj, arrayObj[i], i, arrayObj) === true) {
				return true;
			}
		}

		return false;
	};
}
},{}],199:[function(require,module,exports){
'use strict';

var addEventListener = require('@marcom/ac-dom-events/addEventListener');
var querySelectorAll = require('@marcom/ac-dom-traversal/querySelectorAll');
var querySelector    = require('@marcom/ac-dom-traversal/querySelector');
var getPagePosition  = require('@marcom/ac-dom-metrics/getPagePosition');
var scrollY          = require('@marcom/ac-solar/scrollY');

var Main = (function() {
	return {
		initialize : function() {
			this.smoothScroll();
			return this;
		},
		scrollPage : function() {
			var elToScrollTo = getPagePosition(querySelector(this.hash)).top;
			scrollY(window, elToScrollTo, .5, { ease: 'ease-in-out' });
		},
		smoothScroll : function() {
			var scrollButton = querySelectorAll('#jump-nav a');

			for (var i = 0, len = scrollButton.length; i < len; i++) {
				addEventListener(scrollButton[i], 'click', this.scrollPage);
			};
			return this;
		}
	};
}());

module.exports = Main.initialize();

},{"@marcom/ac-dom-events/addEventListener":1,"@marcom/ac-dom-metrics/getPagePosition":11,"@marcom/ac-dom-traversal/querySelector":35,"@marcom/ac-dom-traversal/querySelectorAll":36,"@marcom/ac-solar/scrollY":196}]},{},[199]);
