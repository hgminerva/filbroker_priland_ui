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
var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])};return function(t,i){function n(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}();define(["require","exports","wijmo/wijmo.grid","wijmo/wijmo","wijmo/wijmo.grid.detail"],function(e,t,i,n,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),window.wijmo=window.wijmo||{},window.wijmo.grid=window.wijmo.grid||{},window.wijmo.grid.detail=o;var l;!function(e){e[e.Code=0]="Code",e[e.Selection=1]="Selection",e[e.ExpandSingle=2]="ExpandSingle",e[e.ExpandMulti=3]="ExpandMulti"}(l=t.DetailVisibilityMode||(t.DetailVisibilityMode={}));var r=function(){function e(e,t){var i=this;this._mode=l.ExpandSingle,this._animated=!1,this._g=e,e.mergeManager=new a(e),e.rowHeaders.hostElement.addEventListener("click",this._hdrClick.bind(this)),e.formatItem.addHandler(this._formatItem,this),e.selectionChanged.addHandler(this._selectionChanged,this),e.resizedRow.addHandler(this._resizedRow,this),e.loadingRows.addHandler(function(){i.hideDetail()}),e.draggingRow.addHandler(function(e,t){t.row<e.rows.length-1&&e.rows[t.row+1]instanceof s&&(t.cancel=!0,i.hideDetail(t.row))}),e.formatItem.addHandler(function(e,t){t.panel==e.cells&&e.rows[t.row]instanceof s&&(t.cell.style.left="0")}),t&&n.copy(this,t)}return Object.defineProperty(e.prototype,"grid",{get:function(){return this._g},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"detailVisibilityMode",{get:function(){return this._mode},set:function(e){e!=this._mode&&(this._mode=n.asEnum(e,l),this.hideDetail(),this._g.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"maxHeight",{get:function(){return this._maxHeight},set:function(e){this._maxHeight=n.asNumber(e,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isAnimated",{get:function(){return this._animated},set:function(e){e!=this._animated&&(this._animated=n.asBoolean(e))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"createDetailCell",{get:function(){return this._createDetailCellFn},set:function(e){this._createDetailCellFn=n.asFunction(e,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"disposeDetailCell",{get:function(){return this._disposeDetailCellFn},set:function(e){this._disposeDetailCellFn=n.asFunction(e,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"rowHasDetail",{get:function(){return this._rowHasDetailFn},set:function(e){this._rowHasDetailFn=n.asFunction(e,!0)},enumerable:!0,configurable:!0}),e.prototype.getDetailRow=function(e){var t=this._g.rows;return e=this._toIndex(e),t[e]instanceof s?t[e]:e<t.length-1&&t[e+1]instanceof s?t[e+1]:null},e.prototype.isDetailVisible=function(e){return null!=this.getDetailRow(e)},e.prototype.isDetailAvailable=function(e){this._g.rows;return e=this._toIndex(e),this._hasDetail(e)},e.prototype.hideDetail=function(e){var t=this._g.rows;if(null!=e){!(t[e=this._toIndex(e)]instanceof s)&&e<t.length-1&&t[e+1]instanceof s&&e++;var i=t[e];i instanceof s&&(this.disposeDetailCell&&this.disposeDetailCell(i),n.Control.disposeAll(i.detail),t.removeAt(e))}else for(var o=0;o<t.length;o++)t[o]instanceof s&&this.hideDetail(o)},e.prototype.showDetail=function(e,t){void 0===t&&(t=!1);var i=this._g,o=i.rows;if((e=this._toIndex(e))>0&&o[e]instanceof s&&e--,t){for(var l=i.selection,r=!1,a=0;a<o.length-1;a++)a!=e&&o[a+1]instanceof s&&(this.hideDetail(a),a<e&&e--,a<l.row&&(l.row--,l.row2--,r=!0));r&&i.select(l,!1)}if(!this.isDetailVisible(e)&&this._hasDetail(e)){var c=new s(o[e]);if(c.detail=this._createDetailCell(o[e]),c.detail)if(this._animated){var d=c.detail.style;d.transform="translateY(-100%)",d.opacity="0",o.insert(e+1,c),n.animate(function(t){t<1?(d.transform="translateY("+(100*-(1-t)).toFixed(0)+"%)",d.opacity=(t*t).toString()):(d.transform="",d.opacity="",n.Control.invalidateAll(c.detail),i.scrollIntoView(e,-1))})}else o.insert(e+1,c),i.scrollIntoView(e,-1)}},e.prototype._toIndex=function(e){return e instanceof i.Row&&(e=e.index),n.asNumber(e,!1,!0)},e.prototype._hdrClick=function(e){if(!e.defaultPrevented)switch(this._mode){case l.ExpandMulti:case l.ExpandSingle:var t=this._g,n=t.hitTest(e);if(n.row>-1){t.rows[n.row];this.isDetailVisible(n.row)?this.hideDetail(n.row):(t.select(new i.CellRange(n.row,0,n.row,t.columns.length-1)),this.showDetail(n.row,this._mode==l.ExpandSingle)),e.preventDefault()}}},e.prototype._selectionChanged=function(e,t){var i=this;this._mode==l.Selection&&(this._toSel&&clearTimeout(this._toSel),this._toSel=setTimeout(function(){e.selection.row>-1?i.showDetail(e.selection.row,!0):i.hideDetail()},300))},e.prototype._formatItem=function(e,t){var i=this._g,o=t.panel.rows[t.row];if(t.panel==i.cells&&o instanceof s&&null!=o.detail)if(n.addClass(t.cell,"wj-detail"),t.cell.textContent="",t.cell.style.textAlign="",t.cell.appendChild(o.detail),null==o.height){n.Control.refreshAll(t.cell);var r=getComputedStyle(t.cell),a=o.detail.scrollHeight+parseInt(r.paddingTop)+parseInt(r.paddingBottom);this._maxHeight>0&&a>this._maxHeight&&(a=this._maxHeight),o.height=a,o.detail.style.height||(o.detail.style.height="100%");var c=o.detail.querySelector(".wj-flexgrid");c&&!c.style.height&&(c.style.height="100%")}else setTimeout(function(){n.Control.refreshAll(o.detail)});if((this._mode==l.ExpandMulti||this._mode==l.ExpandSingle)&&t.panel==i.rowHeaders&&0==t.col&&this._hasDetail(t.row)){var d=t.row<i.rows.length-1&&i.rows[t.row+1]instanceof s;t.cell.innerHTML=d?'<span class="wj-glyph-minus"></span>':'<span class="wj-glyph-plus"></span>'}},e.prototype._resizedRow=function(e,t){var i=t.panel.rows[t.row];i instanceof s&&i.detail&&n.Control.refreshAll(i.detail)},e.prototype._hasVisibleDetail=function(e){return!(e instanceof s||e instanceof i.GroupRow||e instanceof i._NewRowTemplate)},e.prototype._hasDetail=function(e){return!n.isFunction(this._rowHasDetailFn)||this._rowHasDetailFn(this._g.rows[e])},e.prototype._createDetailCell=function(e,t){return this.createDetailCell?this.createDetailCell(e,t):null},e}();t.FlexGridDetailProvider=r;var a=function(e){function t(t){return e.call(this,t)||this}return __extends(t,e),t.prototype.getMergedRange=function(t,n,o,l){switch(void 0===l&&(l=!0),t.cellType){case i.CellType.Cell:if(t.rows[n]instanceof s)return new i.CellRange(n,0,n,t.columns.length-1);break;case i.CellType.RowHeader:if(t.rows[n]instanceof s)return new i.CellRange(n-1,o,n,o);if(n<t.rows.length-1&&t.rows[n+1]instanceof s)return new i.CellRange(n,o,n+1,o)}return e.prototype.getMergedRange.call(this,t,n,o,l)},t}(i.MergeManager);t.DetailMergeManager=a;var s=function(e){function t(t){var i=e.call(this)||this;return i.isReadOnly=!0,i}return __extends(t,e),Object.defineProperty(t.prototype,"detail",{get:function(){return this._detail},set:function(e){this._detail=e},enumerable:!0,configurable:!0}),t}(i.Row);t.DetailRow=s});