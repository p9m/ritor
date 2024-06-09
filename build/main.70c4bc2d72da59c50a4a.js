(()=>{"use strict";var t=function(){function t(){this.sel=null,this.sel=this.getSelection()}return t.prototype.getSelection=function(){return window.getSelection()},t.prototype.getRange=function(){return this.sel&&this.sel.rangeCount>0?this.sel.getRangeAt(0):null},t.prototype.setRange=function(t){this.sel&&(this.sel.removeAllRanges(),this.sel.addRange(t))},t.prototype.isCollapsed=function(){return this.sel&&this.sel.isCollapsed},t.prototype.isWithin=function(t){return this.sel&&t.contains(this.sel.anchorNode)&&t.contains(this.sel.focusNode)},t.prototype.getContainer=function(){var t,e=null===(t=this.getRange())||void 0===t?void 0:t.cloneRange(),n=null==e?void 0:e.commonAncestorContainer;return n&&n.nodeType===Node.TEXT_NODE&&n.parentNode&&(n=n.parentNode),n},t}();const e=t;var n=["A","B","STRONG","I","EM","U","SPAN"],o={hasClass:function(t,e){return t.classList?t.classList.contains(e):!!t.className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))},addClass:function(t,e){t.classList?t.classList.add(e):this.hasClass(t,e)||(t.className+=" "+e)},removeClass:function(t,e){if(t.classList)t.classList.remove(e);else if(this.hasClass(t,e)){var n=new RegExp("(\\s|^)"+e+"(\\s|$)");t.className=t.className.replace(n,"")}},toggleClass:function(t,e){this.hasClass(t,e)?this.removeClass(t,e):this.addClass(t,e)},isInlineElement:function(t){return n.indexOf(t)>-1}};function r(t){return"object"==typeof t&&!Array.isArray(t)&&null!==t}var i=function(){function t(t){this.doc=document,this.commandState=new Map,this.cursor=new e,this.ritor=t}return t.prototype.isEmpty=function(){if(this.ritor.$el){var t=this.ritor.$el.innerHTML;return""===(t=t.replace(/^\s*(&nbsp;\s*)+/g,"").replace(/^\s+|\s+$/g,""))||"<br>"===t||"</br>"===t}throw new Error("Editor is initialized.")},t.prototype.clearFormat=function(){var t,e,n=this.cursor.getRange(),r=null==n?void 0:n.extractContents(),i=this.doc.createTextNode(r&&r.textContent||""),s=(null===(t=this.cursor.getContainer())||void 0===t?void 0:t.nodeName)||"";if(o.isInlineElement(s)&&!this.cursor.isCollapsed()){var a=this.cursor.getContainer();null===(e=null==a?void 0:a.parentNode)||void 0===e||e.removeChild(a)}null==n||n.insertNode(i),null==n||n.collapse(!1)},t.prototype.toggleTag=function(t){var e=this.cursor.getContainer();if(e&&e.nodeName.toLowerCase()===t){var n=e.parentNode;if(this.cursor.isCollapsed()){var o=e.nextSibling;o&&(null==n||n.insertBefore(this.doc.createTextNode(" "),o),(r=new Range).setStart(o,0),r.setEnd(o,0),this.cursor.setRange(r))}else{for(var r,i=null;e.firstChild;)i=e.firstChild,null==n||n.insertBefore(i,e);null==n||n.removeChild(e),i&&((r=new Range).setStartAfter(i),r.setEndAfter(i),this.cursor.setRange(r))}this.commandState.set(t,!1)}else this.wrap(t),this.commandState.set(t,!0)},t.prototype.insertHtml=function(t){var e=this.doc.createElement("div");e.innerHTML=t;for(var n=this.doc.createDocumentFragment(),o=null,r=null;o=e.firstChild;)r=n.appendChild(o);var i=this.cursor.getRange();null==i||i.insertNode(n),r&&(null==i||i.setStart(r,0)),null==i||i.collapse(!1),i&&this.cursor.setRange(i)},t.prototype.insertText=function(t){var e=this.doc.createTextNode(t),n=this.cursor.getRange();null==n||n.insertNode(e),null==n||n.setStart(e,0),null==n||n.collapse(!1),n&&this.cursor.setRange(n)},t.prototype.wrap=function(t){var e=this.doc.createElement(t),n=this.cursor.getRange();if(this.cursor.isCollapsed())e.innerHTML="&nbsp;",null==n||n.insertNode(e);else try{null==n||n.surroundContents(e)}catch(t){if(n){var o=null==n?void 0:n.extractContents(),r=this.doc.createTextNode(o&&o.textContent||"");e.appendChild(r),n.insertNode(e)}}null==n||n.setStartAfter(e.childNodes[0]),null==n||n.setEndAfter(e.childNodes[0]),n&&this.cursor.setRange(n)},t}();const s=i;var a=function(){function t(t){this.shortcutKeys=new Map,this.ritor=t,this.observeContentChange(),this.registerShortcutKeys()}return t.prototype.observeContentChange=function(){var t=this;this.ritor.$el&&new MutationObserver((function(){return t.ritor.emit("input:change")})).observe(this.ritor.$el,{childList:!0,subtree:!0,characterData:!0})},t.prototype.fixEmptyEditor=function(){var t=this.ritor.getContent();if((null==t?void 0:t.isEmpty())&&this.ritor.$el){this.ritor.$el.innerHTML="&nbsp;";var e=new Range;e.setStart(this.ritor.$el.childNodes[0],0),e.setEnd(this.ritor.$el.childNodes[0],0),t.cursor.setRange(e)}},t.prototype.bindShortcutKeys=function(t){var e,n=t.code;(t.ctrlKey||t.metaKey)&&(n="ctrl:".concat(t.code)),this.shortcutKeys.get(n)&&(null===(e=this.shortcutKeys.get(n))||void 0===e||e(t))},t.prototype.fireCursorChange=function(t){this.ritor.emit("cursor:change")},t.prototype.registerShortcutKeys=function(){var t=this;Array.from(this.ritor.moduleInstances).forEach((function(e){e[0];var n=e[1],o=n.shortcutKey;o&&n.click&&(o=o.replace(".prevent",""),t.shortcutKeys.set(o,(function(t){n.shortcutKey.indexOf(".prevent")>-1&&t.preventDefault(),n.click()})))})),this.shortcutKeys.set("ctrl:KeyZ",(function(){return console.log("Undo")})),this.shortcutKeys.set("ctrl:KeyY",(function(){return console.log("Redo")})),this.shortcutKeys.set("ctrl:KeyS",(function(t){t.preventDefault()}))},t.prototype.handleDoubleClick=function(t){if(-1!=navigator.userAgent.indexOf("Firefox")){var e=t.target,n=this.ritor.getContent();if(o.isInlineElement(e.nodeName)){var r=new Range;r.selectNodeContents(e),null==n||n.cursor.setRange(r),this.fireCursorChange(t)}}},t.prototype.handleBeforeInput=function(t){"historyUndo"===t.inputType&&t.preventDefault(),"historyRedo"===t.inputType&&t.preventDefault()},t.prototype.handlePaste=function(t){t.preventDefault();var e=t.clipboardData?t.clipboardData.getData("text/plain"):"",n=this.ritor.getContent();null==n||n.insertText(e),this.fireCursorChange(t)},t.prototype.handleOutsideDragAndDrop=function(t){t.preventDefault()},t.prototype.handleMouseUp=function(t){this.fireCursorChange(t)},t.prototype.handleKeydown=function(t){var e;switch(this.fixEmptyEditor(),this.bindShortcutKeys(t),t.code){case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"ArrowDown":case"Backspace":case"Delete":case"Home":case"End":this.fireCursorChange(t);break;case"Enter":t.preventDefault(),null===(e=this.ritor.getContent())||void 0===e||e.insertHtml("<br>")}this.ritor.emit("key:".concat(t.key),t)},t}();const l=a;var c=function(){function t(t,e){var n,o=this;this.$toolbar=null,this.ritor=t,this.options=e,this.options.toolbar&&(this.$toolbar=document.querySelector(this.options.toolbar));var r=this.click.bind(this);null===(n=this.$toolbar)||void 0===n||n.addEventListener("click",r),this.ritor.on("editor:destroyed",(function(){var t;o.toggleActive(!1),null===(t=o.$toolbar)||void 0===t||t.removeEventListener("click",r)})),this.options.tagName&&(this.ritor.on("cursor:change",this.handleCursor.bind(this)),this.ritor.on("input:change",this.handleCursor.bind(this)))}return t.prototype.click=function(){if(this.options.tagName){var t=this.ritor.getContent();null==t||t.toggleTag(this.options.tagName),this.toggleActive(!!(null==t?void 0:t.commandState.get(this.options.tagName)))}},t.prototype.toggleActive=function(t){this.$toolbar&&(t?o.addClass(this.$toolbar,"active"):o.removeClass(this.$toolbar,"active"))},t.prototype.handleCursor=function(){var t=this.ritor.getContent();if(t){var e=t.cursor.getContainer();this.toggleActive((null==e?void 0:e.nodeName.toLowerCase())===this.options.tagName)}},t}();const u=c;var p,h=(p=function(t,e){return p=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},p(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}p(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),f=function(){return f=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},f.apply(this,arguments)},d=function(t){function e(n,o){var r=t.call(this,n,f(f({},o),{toolbar:e.toolbar,tagName:e.tagName}))||this;return r.shortcutKey="ctrl:KeyB.prevent",r}return h(e,t),e.toolbar=".r-bold",e.tagName="strong",e}(u);const v=d;var y=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),g=function(){return g=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},g.apply(this,arguments)},m=function(t){function e(n,o){return t.call(this,n,g(g({},o),{toolbar:e.toolbar}))||this}return y(e,t),e.prototype.click=function(){var t=this.ritor.getContent();null==t||t.clearFormat()},e.toolbar=".r-clear",e}(u);const b=m;var C=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),w=function(){return w=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},w.apply(this,arguments)},E=function(t){function e(n,o){var r=t.call(this,n,w(w({},o),{toolbar:e.toolbar,tagName:e.tagName}))||this;return r.shortcutKey="ctrl:KeyI.prevent",r}return C(e,t),e.toolbar=".r-italic",e.tagName="em",e}(u);const O=E;var N=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),M=function(){return M=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},M.apply(this,arguments)},_=function(t){function e(n,o){var r=t.call(this,n,M(M({},o),{toolbar:e.toolbar,tagName:e.tagName}))||this;return r.shortcutKey="ctrl:KeyU.prevent",r}return N(e,t),e.toolbar=".r-underline",e.tagName="u",e}(u);const A={bold:v,clearFormat:b,italic:O,underline:_},S=function(){function t(){this.eventMap=new Map}return t.prototype.on=function(t,e){this.eventMap.has(t)||this.eventMap.set(t,[]),this.eventMap.get(t).push(e)},t.prototype.off=function(t,e){if(this.eventMap.has(t)){var n=this.eventMap.get(t).filter((function(t){return t!==e}));this.eventMap.set(t,n)}},t.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];this.eventMap.has(t)&&this.eventMap.get(t).forEach((function(t){setTimeout((function(){return t.apply(void 0,e)}),0)}))},t}();var j=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),R=function(){return R=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},R.apply(this,arguments)},$=function(t){function e(e,n){var o=t.call(this)||this;if(o.domEventMap=new Map,o.options={modules:{}},o.moduleInstances=new Map,!e)throw new Error("Target selector is required.");var i=document.querySelector(e);if(!i)throw new Error("Target element not found.");return o.$el=i,r(n)&&(o.options=Object.assign({},o.options,n)),o.options.modules=Object.assign({},r(o.options.modules)?o.options.modules:{},o.registerDefaultModules()),o.initModules(),o.init(),o.initialized=!0,o.emit("editor:init"),o}return j(e,t),e.prototype.registerDefaultModules=function(){var t={};for(var n in A)if(Object.prototype.hasOwnProperty.call(A,n)){var o=A[n];e.register(n,o),t[n]={}}return t},e.register=function(t,n){e.modules.set(t,{moduleClass:n})},e.getModule=function(t){return e.modules.get(t)},e.prototype.init=function(){var t=new l(this);this.domEventMap.set("mouseup",t.handleMouseUp.bind(t)),this.domEventMap.set("keydown",t.handleKeydown.bind(t)),this.domEventMap.set("beforeinput",t.handleBeforeInput.bind(t)),this.domEventMap.set("paste",t.handlePaste.bind(t)),this.domEventMap.set("dragover",t.handleOutsideDragAndDrop.bind(t)),this.domEventMap.set("drop",t.handleOutsideDragAndDrop.bind(t)),this.domEventMap.set("dblclick",t.handleDoubleClick.bind(t)),this.$el&&(this.$el.contentEditable="true",this.registerEvents())},e.prototype.initModules=function(){var t=this,n=this.options.modules;n&&Object.keys(n).forEach((function(o){var r=e.getModule(o);r&&t.moduleInstances.set(o,new r.moduleClass(t,R(R({},n[o]),{moduleName:o})))}))},e.prototype.registerEvents=function(){var t=this;Array.from(this.domEventMap).forEach((function(e){var n,o=e[0],r=e[1];null===(n=t.$el)||void 0===n||n.addEventListener(o,r)}))},e.prototype.unRegisterEvents=function(){var t=this;Array.from(this.domEventMap).forEach((function(e){var n,o=e[0],r=e[1];null===(n=t.$el)||void 0===n||n.removeEventListener(o,r)}))},e.prototype.destroy=function(){this.$el&&(this.$el.contentEditable="false"),this.unRegisterEvents(),this.emit("editor:destroyed"),this.initialized=!1},e.prototype.reInit=function(){this.initialized||(this.initModules(),this.init())},e.prototype.getContent=function(){var t=new s(this);return this.$el&&t.cursor.isWithin(this.$el)?t:null},e.prototype.getHtml=function(){var t;return null===(t=this.$el)||void 0===t?void 0:t.innerHTML},e.modules=new Map,e}(S);const T=$;const K=function(t,e){var n=e.target&&document.querySelector(e.target);t.on("input:change",(function(){n&&(n.value=t.getHtml()||"")})),t.on("editor:init",(function(){n&&(n.value=t.getHtml()||"")}))};var x,D,L;T.register("viewSource",K),L=new T("#editable",{toolbar:"#toolbar",placeholder:"",initialValue:"",modules:{viewSource:{target:"#output"}}}),null===(x=document.getElementById("destroy"))||void 0===x||x.addEventListener("click",(function(){L.destroy()})),null===(D=document.getElementById("reinit"))||void 0===D||D.addEventListener("click",(function(){L.reInit()}))})();