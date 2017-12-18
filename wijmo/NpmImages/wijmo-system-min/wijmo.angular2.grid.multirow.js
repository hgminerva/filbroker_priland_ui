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
System.register(["wijmo/wijmo.grid.multirow","@angular/core","@angular/common","@angular/forms","wijmo/wijmo.angular2.directiveBase"],function(e,t){"use strict";var o,n,i,r,a,g,d,s,l,u,c,p=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();t&&t.id;return{setters:[function(e){o=e},function(e){n=e,i=e,r=e},function(e){a=e},function(e){g=e},function(e){d=e}],execute:function(){e("wjMultiRowMeta",s={selector:"wj-multi-row",template:"",inputs:["wjModelProperty","isDisabled","newRowAtTop","allowAddNew","allowDelete","allowDragging","allowMerging","allowResizing","allowSorting","autoSizeMode","autoGenerateColumns","childItemsPath","groupHeaderFormat","headersVisibility","showSelectedHeaders","showMarquee","itemFormatter","isReadOnly","imeEnabled","mergeManager","selectionMode","showGroups","showSort","showDropDown","showAlternatingRows","showErrors","validateEdits","treeIndent","itemsSource","autoClipboard","frozenRows","frozenColumns","deferResizing","sortRowIndex","stickyHeaders","preserveSelectedState","preserveOutlineState","keyActionTab","keyActionEnter","rowHeaderPath","virtualizationThreshold","layoutDefinition","centerHeadersVertically","collapsedHeaders","showHeaderCollapseButton"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","beginningEditNg: beginningEdit","cellEditEndedNg: cellEditEnded","cellEditEndingNg: cellEditEnding","prepareCellForEditNg: prepareCellForEdit","formatItemNg: formatItem","resizingColumnNg: resizingColumn","resizedColumnNg: resizedColumn","autoSizingColumnNg: autoSizingColumn","autoSizedColumnNg: autoSizedColumn","draggingColumnNg: draggingColumn","draggingColumnOverNg: draggingColumnOver","draggedColumnNg: draggedColumn","sortingColumnNg: sortingColumn","sortedColumnNg: sortedColumn","resizingRowNg: resizingRow","resizedRowNg: resizedRow","autoSizingRowNg: autoSizingRow","autoSizedRowNg: autoSizedRow","draggingRowNg: draggingRow","draggingRowOverNg: draggingRowOver","draggedRowNg: draggedRow","deletingRowNg: deletingRow","deletedRowNg: deletedRow","loadingRowsNg: loadingRows","loadedRowsNg: loadedRows","rowEditStartingNg: rowEditStarting","rowEditStartedNg: rowEditStarted","rowEditEndingNg: rowEditEnding","rowEditEndedNg: rowEditEnded","rowAddedNg: rowAdded","groupCollapsedChangedNg: groupCollapsedChanged","groupCollapsedChangingNg: groupCollapsedChanging","itemsSourceChangedNg: itemsSourceChanged","selectionChangingNg: selectionChanging","selectionChangedNg: selectionChanged","scrollPositionChangedNg: scrollPositionChanged","updatingViewNg: updatingView","updatedViewNg: updatedView","updatingLayoutNg: updatingLayout","updatedLayoutNg: updatedLayout","pastingNg: pasting","pastedNg: pasted","pastingCellNg: pastingCell","pastedCellNg: pastedCell","copyingNg: copying","copiedNg: copied"],providers:[{provide:g.NG_VALUE_ACCESSOR,useFactory:d.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]}),l=function(e){function t(t,o,n){var i=e.call(this,d.WjDirectiveBehavior.getHostElement(t,o))||this;i.isInitialized=!1;i._wjBehaviour=d.WjDirectiveBehavior.attach(i,t,o,n);return i.created(),i}return p(t,e),t.prototype.created=function(){},t.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},t.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},t.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},t.prototype.addEventListener=function(t,o,n,i){var r=this;void 0===i&&(i=!1);var a=d.WjDirectiveBehavior,g=a.ngZone;g&&a.outsideZoneEvents[o]?g.runOutsideAngular(function(){e.prototype.addEventListener.call(r,t,o,n,i)}):e.prototype.addEventListener.call(this,t,o,n,i)},t.meta={outputs:s.outputs},t.decorators=[{type:n.Component,args:[{selector:s.selector,template:s.template,inputs:s.inputs,outputs:s.outputs,providers:[{provide:"WjComponent",useExisting:i.forwardRef(function(){return t})}].concat(s.providers)}]}],t.ctorParameters=function(){return[{type:i.ElementRef,decorators:[{type:r.Inject,args:[i.ElementRef]}]},{type:i.Injector,decorators:[{type:r.Inject,args:[i.Injector]}]},{type:void 0,decorators:[{type:r.Inject,args:["WjComponent"]},{type:r.SkipSelf},{type:i.Optional}]}]},t}(o.MultiRow),e("WjMultiRow",l),u=[l],c=function(){function e(){}return e.decorators=[{type:n.NgModule,args:[{imports:[d.WjDirectiveBaseModule,a.CommonModule],declarations:u.slice(),exports:u.slice()}]}],e.ctorParameters=function(){return[]},e}(),e("WjGridMultirowModule",c)}}});