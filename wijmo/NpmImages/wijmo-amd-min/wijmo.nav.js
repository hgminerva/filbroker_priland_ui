/*
    *
    * Wijmo Library 5.20173.380
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function i(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}();define(["require","exports","wijmo/wijmo","wijmo/wijmo.nav"],function(e,t,n,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),window.wijmo=window.wijmo||{},window.wijmo.nav=i;var r=function(e){function t(i,r){var s=e.call(this,i)||this;s._itmPath=new c("items"),s._dspPath=new c("header"),s._imgPath=new c,s._html=!1,s._animated=!0,s._xpndOnClick=!0,s._autoColl=!0,s._showChk=!1,s._srch="",s._isReadOnly=!0,s.itemsSourceChanged=new n.Event,s.loadingItems=new n.Event,s.loadedItems=new n.Event,s.itemClicked=new n.Event,s.selectedItemChanged=new n.Event,s.checkedItemsChanged=new n.Event,s.isCollapsedChanging=new n.Event,s.isCollapsedChanged=new n.Event,s.isCheckedChanging=new n.Event,s.isCheckedChanged=new n.Event,s.formatItem=new n.Event,s.dragStart=new n.Event,s.dragOver=new n.Event,s.drop=new n.Event,s.dragEnd=new n.Event,s.nodeEditStarting=new n.Event,s.nodeEditStarted=new n.Event,s.nodeEditEnding=new n.Event,s.nodeEditEnded=new n.Event;var o=s.getTemplate();s.applyTemplate("wj-control wj-content wj-treeview",o,{_root:"root"});var a=s.hostElement;return n.setAttribute(a,"role","tree",!0),n.addClass(s._root,t._CNDL),n.setAttribute(s._root,"role","group",!0),s.addEventListener(a,"mousedown",s._mousedown.bind(s)),s.addEventListener(a,"click",s._click.bind(s)),s.addEventListener(a,"keydown",s._keydown.bind(s)),s.addEventListener(a,"keypress",s._keypress.bind(s)),s.addEventListener(a,"wheel",function(e){a.scrollHeight>a.offsetHeight&&(e.deltaY<0&&0==a.scrollTop||e.deltaY>0&&a.scrollTop+a.offsetHeight>=a.scrollHeight)&&(e.preventDefault(),e.stopPropagation())}),s.addEventListener(a,"blur",function(e){s._edtNode&&!n.contains(s._edtNode.element,n.getActiveElement())&&s.finishEditing()},!0),s.initialize(r),s.refresh(),s}return __extends(t,e),Object.defineProperty(t.prototype,"itemsSource",{get:function(){return this._items},set:function(e){this._items!=e&&(this._items=n.asArray(e),this.onItemsSourceChanged(),this._reload())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"childItemsPath",{get:function(){return this._itmPath.path},set:function(e){e!=this.childItemsPath&&(this._itmPath.path=e,this._reload())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"displayMemberPath",{get:function(){return this._dspPath.path},set:function(e){e!=this.displayMemberPath&&(this._dspPath.path=e,this._reload())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"imageMemberPath",{get:function(){return this._imgPath.path},set:function(e){e!=this.imageMemberPath&&(this._imgPath.path=e,this._reload())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isContentHtml",{get:function(){return this._html},set:function(e){e!=this._html&&(this._html=n.asBoolean(e),this._reload())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"showCheckboxes",{get:function(){return this._showChk},set:function(e){e!=this._showChk&&(this._showChk=n.asBoolean(e),this._reload())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"autoCollapse",{get:function(){return this._autoColl},set:function(e){this._autoColl=n.asBoolean(e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isAnimated",{get:function(){return this._animated},set:function(e){e!=this._animated&&(this._animated=n.asBoolean(e))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isReadOnly",{get:function(){return this._isReadOnly},set:function(e){this._isReadOnly=n.asBoolean(e)},enumerable:!0,configurable:!0}),t.prototype.startEditing=function(e){if(this.isReadOnly)return!1;if(e||(e=this.selectedNode),!e||e.isDisabled)return!1;if(!this.finishEditing())return!1;var i=e.element.querySelector("."+t._CNDT);if(!i)return!1;var r=new a(e);if(!this.onNodeEditStarting(r))return!1;i.tabIndex=0,i.focus(),i.contentEditable="true",i.style.cursor="auto";var s=document.createRange();s.selectNodeContents(i);var o=getSelection();return o.removeAllRanges(),o.addRange(s),i.focus(),n.setAttribute(i,"autocomplete","off"),n.setAttribute(i,"autocorrect","off"),this._edtNode=e,this.onNodeEditStarted(r),!0},t.prototype.finishEditing=function(e){var n=this._edtNode;if(n){var i=n.element.querySelector("."+t._CNDT);if(!i)return!1;var r=new a(n);if(!this.onNodeEditEnding(r))return!1;var s=n.dataItem,o=n.level;this.isContentHtml?e?i.innerHTML=this._dspPath.getValue(s,o):this._dspPath.setValue(s,o,i.innerHTML):e?i.textContent=this._dspPath.getValue(s,o):this._dspPath.setValue(s,o,i.textContent),document.createRange().selectNodeContents(i),getSelection().removeAllRanges(),i.contentEditable="false",i.style.cursor="",this._edtNode=null,this.onNodeEditEnded(r)}return!0},Object.defineProperty(t.prototype,"allowDragging",{get:function(){return null!=this._dd},set:function(e){if(e!=this.allowDragging){n.asBoolean(e)?this._dd=new h(this):(this._dd.dispose(),this._dd=null);for(var i=this.hostElement.querySelectorAll("."+t._CND),r=0;r<i.length;r++){var s=i[r];n.setAttribute(s,"draggable",!!this._dd||null)}}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"expandOnClick",{get:function(){return this._xpndOnClick},set:function(e){this._xpndOnClick=n.asBoolean(e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"selectedItem",{get:function(){return this._selNode?this._selNode.dataItem:null},set:function(e){e!=this.selectedItem&&(this.selectedNode=e?this.getNode(e):null)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"selectedNode",{get:function(){return this._selNode},set:function(e){e!=this.selectedNode&&(this._prevSel=this._selNode,e?e.select():this._selNode&&(n.removeClass(this._selNode.element,t._CSEL),this._selNode=null,this.onSelectedItemChanged()))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"selectedPath",{get:function(){for(var e=[],t=this.selectedNode;t;t=t.parentNode){var n=this._dspPath.getValue(t.dataItem,t.level);e.splice(0,0,n)}return e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"checkedItems",{get:function(){if(null==this._chkItems){var e=t,n="."+e._CND+"."+e._CEMP+" > input:checked."+e._CNDC,i=this._root.querySelectorAll(n);this._chkItems=[];for(var r=0;r<i.length;r++){var s=i[r].parentElement[e._DATAITEM_KEY];this._chkItems.push(s)}}return this._chkItems},set:function(e){if(this.showCheckboxes){for(var n=t,i="."+n._CND+"."+n._CEMP,r=this._root.querySelectorAll(i),o=!1,a=0;a<r.length;a++){var l=new s(this,r[a]),d=e.indexOf(l.dataItem)>-1;l.isChecked!=d&&(l.isChecked=d,o=!0)}o&&this.onCheckedItemsChanged()}},enumerable:!0,configurable:!0}),t.prototype.checkAllItems=function(e){if(this.showCheckboxes){for(var n=t,i="."+n._CND+"."+n._CEMP,r=this._root.querySelectorAll(i),o=!1,a=0;a<r.length;a++){var l=new s(this,r[a]);l.isChecked!=e&&(l.isChecked=e,o=!0)}o&&this.onCheckedItemsChanged()}},Object.defineProperty(t.prototype,"totalItemCount",{get:function(){return this.hostElement.querySelectorAll("."+t._CND).length},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"lazyLoadFunction",{get:function(){return this._lazyLoad},set:function(e){e!=this._lazyLoad&&(this._lazyLoad=n.asFunction(e),this._reload())},enumerable:!0,configurable:!0}),t.prototype.getFirstNode=function(e,n){var i=this.hostElement.querySelector("."+t._CND),r=i?new s(this,i):null;return e&&r&&!r.element.offsetHeight&&(r=r.next(e,n)),n&&r&&r.isDisabled&&(r=r.next(e,n)),r},t.prototype.getLastNode=function(e,n){var i=this.hostElement.querySelectorAll("."+t._CND+":last-child"),r=i.length?new s(this,i[i.length-1]):null;return e&&r&&!r.element.offsetHeight&&(r=r.previous(e,n)),n&&r&&r.isDisabled&&(r=r.previous(e,n)),r},Object.defineProperty(t.prototype,"nodes",{get:function(){return s._getChildNodes(this,this._root)},enumerable:!0,configurable:!0}),t.prototype.getNode=function(e){this._isDirty&&this._loadTree();for(var n=this.hostElement.querySelectorAll("."+t._CND),i=0;i<n.length;i++){var r=n[i];if(r[t._DATAITEM_KEY]==e)return new s(this,r)}return null},t.prototype.collapseToLevel=function(e){var t=this._animated,n=this._autoColl;this._animated=this._autoColl=!1,this._collapseToLevel(this.nodes,e,0),this._animated=t,this._autoColl=n},t.prototype.loadTree=function(){this._loadTree()},t.prototype.onItemsSourceChanged=function(e){this.itemsSourceChanged.raise(this,e)},t.prototype.onLoadingItems=function(e){this.loadingItems.raise(this,e)},t.prototype.onLoadedItems=function(e){this.loadedItems.raise(this,e)},t.prototype.onItemClicked=function(e){this.itemClicked.raise(this,e)},t.prototype.onSelectedItemChanged=function(e){this.selectedItemChanged.raise(this,e)},t.prototype.onCheckedItemsChanged=function(e){this._chkItems=null,this.checkedItemsChanged.raise(this,e)},t.prototype.onIsCollapsedChanging=function(e){return this.isCollapsedChanging.raise(this,e),!e.cancel},t.prototype.onIsCollapsedChanged=function(e){this.isCollapsedChanged.raise(this,e)},t.prototype.onIsCheckedChanging=function(e){return this.isCheckedChanging.raise(this,e),!e.cancel},t.prototype.onIsCheckedChanged=function(e){this.isCheckedChanged.raise(this,e)},t.prototype.onFormatItem=function(e){this.formatItem.raise(this,e)},t.prototype.onDragStart=function(e){return this.dragStart.raise(this,e),!e.cancel},t.prototype.onDragOver=function(e){return this.dragOver.raise(this,e),!e.cancel},t.prototype.onDrop=function(e){return this.drop.raise(this,e),!e.cancel},t.prototype.onDragEnd=function(e){this.dragEnd.raise(this,e)},t.prototype.onNodeEditStarting=function(e){return this.nodeEditStarting.raise(this,e),!e.cancel},t.prototype.onNodeEditStarted=function(e){this.nodeEditStarted.raise(this,e)},t.prototype.onNodeEditEnding=function(e){return this.nodeEditEnding.raise(this,e),!e.cancel},t.prototype.onNodeEditEnded=function(e){this.nodeEditEnded.raise(this,e)},t.prototype.refresh=function(){e.prototype.refresh.call(this),!this.isUpdating&&this._isDirty&&this._loadTree()},t.prototype._reload=function(){this._isDirty=!0,this.invalidate()},t.prototype._mousedown=function(e){if(!e.defaultPrevented){var i=n.closest(e.target,"input."+t._CNDC),r=n.closestClass(e.target,t._CND),o=r?new s(this,r):null;o&&!o.isDisabled&&(this.selectedNode=o),this._dnIndet=i&&i.indeterminate}},t.prototype._click=function(e){var i=this;if(!e.defaultPrevented){var r=n.closestClass(e.target,t._CND);if(r){var o=new s(this,r),a=n.closest(e.target,"input."+t._CNDC);if(o.isDisabled)return;if(!a&&o.equals(this._edtNode))return;if(r.focus(),a&&(e.preventDefault(),e.stopPropagation(),setTimeout(function(){a.indeterminate=!1,o.isChecked=!o.isChecked,i.onCheckedItemsChanged()})),!a){var l=e.target,d=(e.ctrlKey||e.metaKey)&&!o.hasPendingChildren,h=r.getBoundingClientRect(),c=!1;(this.rightToLeft?h.right-e.clientX:e.clientX-h.left)<=l.offsetHeight?(d?this.collapseToLevel(o.isCollapsed?o.level+1:o.level):o.isCollapsed=!o.isCollapsed,c=!0):this.expandOnClick&&o.isCollapsed&&(d?this.collapseToLevel(o.level):o.isCollapsed=!1,c=!0),c&&d&&this.selectedNode&&this.selectedNode.ensureVisible(),c||this.isReadOnly||this.selectedNode&&this.selectedNode.equals(this._prevSel)&&this.startEditing()}this.selectedItem&&this.onItemClicked()}}},t.prototype._keydown=function(e){if(!e.defaultPrevented){var t=this._selNode,i=void 0,r=e.keyCode,s=!0;if(t&&!t.isDisabled){switch(r){case n.Key.F2:this.startEditing(),e.preventDefault();break;case n.Key.Escape:this.finishEditing(!0),e.preventDefault();break;case n.Key.Up:case n.Key.Down:this.finishEditing();break;case n.Key.Enter:this._edtNode?(this.finishEditing(),r=n.Key.Down):(this.startEditing(),e.preventDefault())}if(this._edtNode)return;if(this.rightToLeft)switch(r){case n.Key.Left:r=n.Key.Right;break;case n.Key.Right:r=n.Key.Left}switch(r){case n.Key.Left:!t.isCollapsed&&t.hasChildren?t.setCollapsed(!0):(t=t.parentNode)&&t.select();break;case n.Key.Right:t.setCollapsed(!1);break;case n.Key.Up:i=t.previous(!0,!0);break;case n.Key.Down:i=t.next(!0,!0);break;case n.Key.Home:i=this.getFirstNode(!0,!0);break;case n.Key.End:i=this.getLastNode(!0,!0);break;case n.Key.Space:if(this.selectedItem){var o=t.checkBox;o&&(t.isChecked=!o.checked,this.onCheckedItemsChanged())}break;case n.Key.Enter:this.selectedItem&&this.onItemClicked();break;default:s=!1}s&&(e.preventDefault(),i&&i.select())}}},t.prototype._keypress=function(e){var i=this;if(!e.defaultPrevented){if(e.target instanceof HTMLInputElement)return;if(this._edtNode)return;if(e.charCode>32&&this.startEditing(this.selectedNode)){var r=n.getActiveElement();if(n.contains(this._edtNode.element,r)){r.textContent=String.fromCharCode(e.charCode),e.preventDefault();var s=document.createRange();s.selectNodeContents(r),s.collapse(!1);var o=getSelection();o.removeAllRanges(),o.addRange(s)}return}if(e.charCode>32||32==e.charCode&&this._srch){e.preventDefault(),this._srch+=String.fromCharCode(e.charCode).toLowerCase(),this._toSrch&&clearTimeout(this._toSrch),this._toSrch=setTimeout(function(){i._toSrch=null,i._srch=""},t._AS_DLY);var a=this._findNext();null==a&&this._srch.length>1&&(this._srch=this._srch[this._srch.length-1],a=this._findNext()),null!=a&&(this.selectedItem=a)}}},t.prototype._findNext=function(){if(this.hostElement&&this.selectedItem){var e=this.getNode(this.selectedItem),t=e,n=!1,i=!1;for(1==this._srch.length&&(i=!0);t;){if(!t.isDisabled&&!i&&0==t.element.textContent.trim().toLowerCase().indexOf(this._srch))return t.dataItem;var r=t.next(!0,!0);if(r==e&&n)break;r||n||(r=this.getFirstNode(!0,!0),n=!0),t=r,i=!1}}return null},t.prototype._loadTree=function(){var e=this._root;if(e){this._isDirty=!1;var t=this.containsFocus(),n=this.selectedItem;if(this.selectedItem=null,this._chkItems=null,this._ldLvl=-1,this.onLoadingItems(),e.innerHTML="",this._items)for(var i=0;i<this._items.length;i++)this._addItem(e,0,this._items[i]);t&&!this.containsFocus()&&this.focus(),this.selectedItem=n,this.onLoadedItems(),this._ldLvl=-1}},t.prototype._addItem=function(e,i,r){var s=this._dspPath.getValue(r,i),a=this._imgPath.getValue(r,i),l=n.asArray(this._itmPath.getValue(r,i),!0),d=document.createElement("div");n.addClass(d,t._CND),d.tabIndex=0,n.setAttribute(d,"role","treeitem",!0);var h=document.createElement("span");if(this.isContentHtml?h.innerHTML=s:h.textContent=s,n.addClass(h,t._CNDT),d.appendChild(h),a){var c=document.createElement("img");c.src=a,d.insertBefore(c,d.firstChild)}if(this._showChk&&!this._lazyLoad){var u=document.createElement("input");u.type="checkbox",u.tabIndex=-1,n.addClass(u,t._CNDC),d.insertBefore(u,d.firstChild)}if(this._dd&&d.setAttribute("draggable","true"),e.appendChild(d),d[t._DATAITEM_KEY]=r,l&&0==l.length&&!this.lazyLoadFunction&&(l=null),l){var p=!0;if(i>this._ldLvl?(this._ldLvl=i,0==l.length&&(n.addClass(d,t._CCLD),p=!1)):(n.addClass(d,t._CCLD),p=!1,i<this._ldLvl&&(this._ldLvl=1e4)),l.length>0){var _=document.createElement("div");n.addClass(_,t._CNDL);for(var f=0;f<l.length;f++)this._addItem(_,i+1,l[f]);e.appendChild(_),n.setAttribute(d,"aria-expanded",p.toString(),!0),n.setAttribute(_,"role","group",!0)}}else n.addClass(d,t._CEMP);this.formatItem.hasHandlers&&this.onFormatItem(new o(r,d,i))},t.prototype._collapseToLevel=function(e,t,n){for(var i=0;i<e.length;i++){var r=e[i];r.hasPendingChildren||(r.isCollapsed=n>=t,r.hasChildren&&this._collapseToLevel(r.nodes,t,n+1))}},t.prototype._lazyLoadNode=function(e){var i=this.hostElement;n.hasClass(i,t._CLDG)||(n.addClass(i,t._CLDG),n.addClass(e.element,t._CLDG),this.lazyLoadFunction(e,this._lazyLoadCallback.bind(e)))},t.prototype._lazyLoadCallback=function(e){var t=this;t.treeView._lazyLoadNodeDone(t,e)},t.prototype._lazyLoadNodeDone=function(e,i){var r=t;n.removeClass(e.element,r._CLDG),n.removeClass(this.hostElement,r._CLDG);var s=e.dataItem,o=e.level,a=n.asArray(i,!0);if(null==a||0==a.length)this._itmPath.setValue(s,o,null),n.addClass(e.element,r._CEMP);else if(a.length){this._itmPath.setValue(s,o,a);var l=document.createElement("div"),d=e.element;n.addClass(l,r._CNDL),d.parentElement.insertBefore(l,d.nextSibling);for(var h=0;h<a.length;h++)this._addItem(l,o+1,a[h]);e.isCollapsed=!1}},t._DATAITEM_KEY="wj-Data-Item",t._AS_DLY=600,t._AN_DLY=200,t._CND="wj-node",t._CNDL="wj-nodelist",t._CEMP="wj-state-empty",t._CNDT="wj-node-text",t._CNDC="wj-node-check",t._CSEL="wj-state-selected",t._CCLD="wj-state-collapsed",t._CCLG="wj-state-collapsing",t._CLDG="wj-state-loading",t.controlTemplate='<div wj-part="root"></div>',t}(n.Control);t.TreeView=r;var s=function(){function e(t,i){n.hasClass(i,"wj-treeview")?(t=n.Control.getControl(i),i=null):e._assertNode(i),this._t=t,this._e=i}return Object.defineProperty(e.prototype,"dataItem",{get:function(){return this._e[r._DATAITEM_KEY]},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"element",{get:function(){return this._e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"treeView",{get:function(){return this._t},enumerable:!0,configurable:!0}),e.prototype.ensureVisible=function(){for(var e=this.parentNode;e;e=e.parentNode)e.isCollapsed=!1;var t=this.treeView.hostElement,n=this.element.getBoundingClientRect(),i=t.getBoundingClientRect();n.bottom>i.bottom?t.scrollTop+=n.bottom-i.bottom:n.top<i.top&&(t.scrollTop-=i.top-n.top)},e.prototype.equals=function(e){return null!=e&&e.element==this.element},e.prototype.select=function(){var e=this._t,t=e._selNode;this.equals(t)||(t&&n.removeClass(t.element,r._CSEL),e._selNode=this,n.addClass(this.element,r._CSEL),this.ensureVisible(),e.containsFocus()&&this.element.focus(),e.onSelectedItemChanged())},Object.defineProperty(e.prototype,"index",{get:function(){for(var t=0,n=this._pse(this.element);n;n=this._pse(n))e._isNode(n)&&t++;return t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"parentNode",{get:function(){var t=null;if(this._e){var n=this._e.parentElement;e._assertNodeList(n),t=this._pse(n)}return t?new e(this._t,t):null},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"level",{get:function(){for(var e=-1,t=this;t;t=t.parentNode)e++;return e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hasChildren",{get:function(){return e._isNode(this._e)&&!e._isEmpty(this._e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hasPendingChildren",{get:function(){return this.isCollapsed&&this.hasChildren&&!e._isNodeList(this.element.nextElementSibling)&&n.isFunction(this._t.lazyLoadFunction)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"nodes",{get:function(){return this.hasChildren?e._getChildNodes(this._t,this._e.nextSibling):null},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"checkBox",{get:function(){return this._e.querySelector("input."+r._CNDC)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isCollapsed",{get:function(){return this.hasChildren&&n.hasClass(this._e,r._CCLD)},set:function(e){if(e!=this.isCollapsed){var t=this.treeView,i=new a(this);t.onIsCollapsedChanging(i)&&(this.setCollapsed(n.asBoolean(e),t.isAnimated,t.autoCollapse),t.onIsCollapsedChanged(i))}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isChecked",{get:function(){var e=this.checkBox;return e&&!e.indeterminate?e.checked:null},set:function(e){if(e!=this.isChecked){var t=this.treeView,i=new a(this);t.onIsCheckedChanging(i)&&(this.setChecked(n.asBoolean(e),!0),t.onIsCheckedChanged(i))}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isDisabled",{get:function(){return this._e&&null!=this._e.getAttribute("disabled")},set:function(e){(e=n.asBoolean(e,!0))!=this.isDisabled&&n.enable(this._e,!e)},enumerable:!0,configurable:!0}),e.prototype.previous=function(t,n){var i=this._pse(this._e);if(!i&&e._isNodeList(this._e.parentElement)&&(i=this._pse(this._e.parentElement)),e._isNodeList(i)){for(;e._isNodeList(i)&&i.childElementCount;)i=i.lastChild;e._isNodeList(i)&&(i=this._pse(i))}var r=e._isNode(i)?new e(this._t,i):null;return t&&r&&!r.element.offsetHeight&&(r=r.previous(t,n)),n&&r&&r.isDisabled&&(r=r.previous(t,n)),r},e.prototype.next=function(t,n){var i=this._e.nextSibling;if(e._isNodeList(i)&&(i=i.childElementCount?i.firstChild:i.nextSibling),!i)for(var r=this._e.parentElement;!i&&e._isNodeList(r);r=r.parentElement)i=r.nextSibling;var s=e._isNode(i)?new e(this._t,i):null;return t&&s&&!s.element.offsetHeight&&(s=s.next(t,n)),n&&s&&s.isDisabled&&(s=s.next(t,n)),s},e.prototype.previousSibling=function(){var t=this._pse(this.element);return e._isNodeList(t)&&(t=this._pse(t)),t?new e(this.treeView,t):null},e.prototype.nextSibling=function(){var t=this.element.nextSibling;return e._isNodeList(t)&&(t=t.nextSibling),t?new e(this.treeView,t):null},e.prototype.setCollapsed=function(t,i,s){var o=this._e,a=this._e.nextElementSibling,l=e._isNodeList(a);if(l?o.setAttribute("aria-expanded",(!t).toString()):o.removeAttribute("aria-expanded"),t!=this.isCollapsed)if(t||l||!n.isFunction(this._t.lazyLoadFunction)){if(null==i&&(i=this.treeView.isAnimated),null==s&&(s=this.treeView.autoCollapse),i){if(l){var d=a.offsetHeight,h=a.style;t?(n.toggleClass(o,r._CCLG,!0),n.animate(function(e){e<1?(e=1-e,h.height=(e*d).toFixed(0)+"px"):(h.height=h.opacity="",n.toggleClass(o,r._CCLD,!0),n.toggleClass(o,r._CCLG,!1))},r._AN_DLY)):(n.toggleClass(o,r._CCLD,!1),h.height=h.opacity="0",n.animate(function(e){h.height=e>=1?h.opacity="":(e*d).toFixed(0)+"px"},r._AN_DLY))}}else n.toggleClass(o,r._CCLD,t);if(!t&&s){var c=o.parentElement;if(e._isNodeList(c))for(var u=0;u<c.children.length;u++){var p=c.children[u];p!=o&&e._isNode(p)&&(n.toggleClass(p,r._CCLD,!0),p.setAttribute("aria-expanded","false"))}}}else this._t._lazyLoadNode(this)},e.prototype.setChecked=function(e,t){var n=this.checkBox;if(n.checked=e,n.indeterminate=!1,this.hasChildren)for(var i=this.nodes,r=0;r<i.length;r++)i[r].setChecked(e,!1);if(t){var s=this.parentNode;s&&s._updateCheckedState()}},e.prototype.move=function(e,t){if(this._contains(e))return!1;var n=this.parentNode,i=this._getArray();this._moveElements(e,t);var r=this.parentNode,s=this._getArray();n&&n._updateState(),r&&r._updateState();var o=this.dataItem,a=i.indexOf(o);return i.splice(a,1),s.splice(this.index,0,o),e.treeView&&(this._t=e.treeView),!0},e.prototype._pse=function(e){return e.previousElementSibling},e.prototype._contains=function(e){for(;e;e=e.parentNode)if(e.element==this.element)return!0;return!1},e.prototype._getArray=function(){var e=this._t,t=this.parentNode,n=e.itemsSource;if(t){var i=e._itmPath;(n=i.getValue(t.dataItem,this.level))||(n=[],i.setValue(t.dataItem,this.level,n))}return n},e.prototype._moveElements=function(t,i){var s=t.element,o=s?s.parentElement:t.treeView._root,a=d;e._assertNodeList(o);var l=document.createDocumentFragment(),h=this.hasChildren&&!this.hasPendingChildren?this.element.nextSibling:null;switch(l.appendChild(this.element),h&&(e._assertNodeList(h),l.appendChild(h)),i){case a.Before:o.insertBefore(l,s);break;case a.After:s=(t=t.nextSibling())?t.element:null,o.insertBefore(l,s);break;case a.Into:t.hasChildren&&!t.hasPendingChildren||(h=document.createElement("div"),n.addClass(h,r._CNDL),o.insertBefore(h,s.nextSibling)),o=t.element.nextSibling,e._assertNodeList(o),o.insertBefore(l,null)}},e.prototype._updateState=function(){this._updateEmptyState(),this._updateCheckedState()},e.prototype._updateEmptyState=function(){var t=this.element.nextSibling,i=!1;e._isNodeList(t)&&(t.childElementCount?i=!0:t.parentElement.removeChild(t)),n.toggleClass(this.element,r._CEMP,!i)},e.prototype._updateCheckedState=function(){var e=this.checkBox,t=this.nodes,n=0,i=0;if(e&&t){for(var r=0;r<t.length;r++)switch(t[r].isChecked){case!0:n++;break;case!1:i++}n==t.length?(e.checked=!0,e.indeterminate=!1):i==t.length?(e.checked=!1,e.indeterminate=!1):(e.checked=!1,e.indeterminate=!0)}var s=this.parentNode;s&&s._updateCheckedState()},e._getChildNodes=function(t,n){e._assertNodeList(n);var i=[];if(e._isNodeList(n))for(var r=n.children,s=0;s<r.length;s++){var o=r[s];e._isNode(o)&&i.push(new e(t,o))}return i},e._isNode=function(e){return e&&n.hasClass(e,r._CND)},e._isNodeList=function(e){return e&&n.hasClass(e,r._CNDL)},e._isEmpty=function(t){return e._isNode(t)&&n.hasClass(t,r._CEMP)},e._isCollapsed=function(t){return e._isNode(t)&&!e._isEmpty(t)&&n.hasClass(t,r._CCLD)},e._assertNode=function(t){n.assert(e._isNode(t),"node expected")},e._assertNodeList=function(t){n.assert(e._isNodeList(t),"nodeList expected")},e}();t.TreeNode=s;var o=function(e){function t(t,i,r){var s=e.call(this)||this;return s._data=t,s._e=n.asType(i,HTMLElement),s._level=r,s}return __extends(t,e),Object.defineProperty(t.prototype,"dataItem",{get:function(){return this._data},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"element",{get:function(){return this._e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"level",{get:function(){return this._level},enumerable:!0,configurable:!0}),t}(n.EventArgs);t.FormatNodeEventArgs=o;var a=function(e){function t(t){var n=e.call(this)||this;return n._node=t,n}return __extends(t,e),Object.defineProperty(t.prototype,"node",{get:function(){return this._node},enumerable:!0,configurable:!0}),t}(n.CancelEventArgs);t.TreeNodeEventArgs=a;var l=function(e){function t(t,i,r){var o=e.call(this)||this;return o._src=n.asType(t,s),o._tgt=n.asType(i,s),o._pos=r,o}return __extends(t,e),Object.defineProperty(t.prototype,"dragSource",{get:function(){return this._src},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"dropTarget",{get:function(){return this._tgt},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"position",{get:function(){return this._pos},set:function(e){this._pos=n.asEnum(e,d)},enumerable:!0,configurable:!0}),t}(n.CancelEventArgs);t.TreeNodeDragDropEventArgs=l;var d;!function(e){e[e.Before=0]="Before",e[e.After=1]="After",e[e.Into=2]="Into"}(d=t.DropPosition||(t.DropPosition={}));var h=function(){function e(e){this._tree=n.asType(e,r),this._dragstartBnd=this._dragstart.bind(this),this._dragoverBnd=this._dragover.bind(this),this._dropBnd=this._drop.bind(this),this._dragendBnd=this._dragend.bind(this);var t=this._tree,i=t.hostElement;t.addEventListener(i,"dragstart",this._dragstartBnd),t.addEventListener(i,"dragover",this._dragoverBnd),t.addEventListener(i,"dragleave",this._dragoverBnd),t.addEventListener(i,"drop",this._dropBnd),t.addEventListener(i,"dragend",this._dragendBnd),t.addEventListener(i,"keydown",this._keydown)}return e.prototype.dispose=function(){var e=this._tree,t=e.hostElement;e.removeEventListener(t,"dragstart",this._dragstartBnd),e.removeEventListener(t,"dragover",this._dragoverBnd),e.removeEventListener(t,"dragleave",this._dragoverBnd),e.removeEventListener(t,"drop",this._dropBnd),e.removeEventListener(t,"dragend",this._dragendBnd),e.removeEventListener(t,"keydown",this._keydown),this._showDragMarker()},e.prototype._dragstart=function(t){if(!t.defaultPrevented){var i=this._tree,o=n.closestClass(t.target,r._CND),l=e;if(l._drgSrc=s._isNode(o)?new s(i,o):null,l._drgSrc){var d=new a(l._drgSrc);i.onDragStart(d)||(l._drgSrc=null)}l._drgSrc&&t.dataTransfer?(n._startDrag(t.dataTransfer,"copyMove"),t.stopPropagation()):t.preventDefault()}},e.prototype._dragover=function(e){this._handleDragDrop(e,!1)},e.prototype._drop=function(e){this._handleDragDrop(e,!0)},e.prototype._dragend=function(t){e._drgSrc=null,this._showDragMarker(),this._tree.onDragEnd()},e.prototype._keydown=function(e){e.defaultPrevented||e.keyCode==n.Key.Escape&&this._dragendBnd(null)},e.prototype._handleDragDrop=function(t,i){var o,a,h=this._tree,c=e,u=d,p=u.Into;if(!t.defaultPrevented&&c._drgSrc){var _=document.elementFromPoint(t.clientX,t.clientY),f=n.closestClass(_,r._CND);if(null==f){var g=n.Control.getControl(n.closest(_,".wj-treeview"));g instanceof r&&0==g.totalItemCount&&(f=g.hostElement)}if(f==c._drgSrc.element&&(f=null),f){a=f.getBoundingClientRect();var m=new s(h,f),C=m.hasPendingChildren?a.height/2:a.height/3;null==m.element?((a=n.Rect.fromBoundingRect(a)).inflate(-12,-12),p=u.Before):t.clientY<a.top+C?p=u.Before:(t.clientY>a.bottom-C||m.hasPendingChildren)&&(p=u.After,!m.hasChildren||m.isCollapsed||m.hasPendingChildren||(p=u.Before,a=(f=(m=m.next(!0,!1)).element).getBoundingClientRect())),c._drgSrc._contains(m)?f=null:((o=new l(c._drgSrc,m,p)).cancel=c._drgSrc.treeView!=m.treeView,h.onDragOver(o)||(f=null))}if(f)if((p=o.position)==u.Before){var v=o.dragSource.next(!0,!1);v&&v.element==f&&(f=null)}else if(p==u.After){var y=o.dragSource.previous(!0,!1);y&&y.element==f&&(f=null)}if(f&&!i?(t.dataTransfer.dropEffect="move",t.preventDefault(),t.stopPropagation(),this._showDragMarker(a,p)):this._showDragMarker(),f&&i&&h.onDrop(o)){h.hostElement.focus();var b=o.dragSource;b.move(o.dropTarget,o.position),b.select()}}},e.prototype._showDragMarker=function(t,i){var r=this._tree,s=e._dMarker.parentElement;if(t){var o=r.hostElement.getBoundingClientRect(),a=i==d.After?t.bottom:t.top,l={top:Math.round(a-o.top+r.hostElement.scrollTop-2),width:"75%",height:i==d.Into?t.height:4,opacity:i==d.Into?"0.15":""};r.rightToLeft?l.right=Math.round(o.right-t.right):l.left=Math.round(t.left-o.left),n.setCss(e._dMarker,l),s!=r._root&&r._root.appendChild(e._dMarker)}else s&&s.removeChild(e._dMarker)},e._dMarker=n.createElement('<div class="wj-marker">&nbsp;</div>'),e}();t._TreeDragDropManager=h;var c=function(){function e(e){this.path=e}return Object.defineProperty(e.prototype,"path",{get:function(){return this._path},set:function(e){if(this._path=e,n.isString(e))this._bindings=[new n.Binding(e)];else if(n.isArray(e)){this._bindings=[];for(var t=0;t<e.length;t++)this._bindings.push(new n.Binding(e[t]))}else null!=e&&n.assert(!1,"Path should be a string or an array of strings.");this._maxLevel=this._bindings?this._bindings.length-1:-1},enumerable:!0,configurable:!0}),e.prototype.getValue=function(e,t){var n=Math.min(t,this._maxLevel);return n>-1?this._bindings[n].getValue(e):null},e.prototype.setValue=function(e,t,n){var i=Math.min(t,this._maxLevel);i>-1&&this._bindings[i].setValue(e,n)},e}();t._BindingArray=c});