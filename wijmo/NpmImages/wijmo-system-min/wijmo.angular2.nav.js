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
System.register(["wijmo/wijmo.nav","@angular/core","@angular/common","@angular/forms","wijmo/wijmo.angular2.directiveBase"],function(e,t){"use strict";var n,o,i,r,a,d,s,c,g,u,l,p=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();t&&t.id;return{setters:[function(e){n=e},function(e){o=e,i=e,r=e},function(e){a=e},function(e){d=e},function(e){s=e}],execute:function(){e("wjTreeViewMeta",c={selector:"wj-tree-view",template:"",inputs:["asyncBindings","wjModelProperty","isDisabled","childItemsPath","displayMemberPath","imageMemberPath","isContentHtml","showCheckboxes","autoCollapse","isAnimated","isReadOnly","allowDragging","expandOnClick","lazyLoadFunction","itemsSource","selectedItem","selectedNode","checkedItems"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","itemsSourceChangedNg: itemsSourceChanged","loadingItemsNg: loadingItems","loadedItemsNg: loadedItems","itemClickedNg: itemClicked","selectedItemChangedNg: selectedItemChanged","selectedItemChangePC: selectedItemChange","selectedNodeChangePC: selectedNodeChange","checkedItemsChangedNg: checkedItemsChanged","checkedItemsChangePC: checkedItemsChange","isCollapsedChangingNg: isCollapsedChanging","isCollapsedChangedNg: isCollapsedChanged","isCheckedChangingNg: isCheckedChanging","isCheckedChangedNg: isCheckedChanged","formatItemNg: formatItem","dragStartNg: dragStart","dragOverNg: dragOver","dropNg: drop","dragEndNg: dragEnd","nodeEditStartingNg: nodeEditStarting","nodeEditStartedNg: nodeEditStarted","nodeEditEndingNg: nodeEditEnding","nodeEditEndedNg: nodeEditEnded"],providers:[{provide:d.NG_VALUE_ACCESSOR,useFactory:s.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]}),g=function(e){function t(t,n,o){var i=e.call(this,s.WjDirectiveBehavior.getHostElement(t,n))||this;i.isInitialized=!1;i._wjBehaviour=s.WjDirectiveBehavior.attach(i,t,n,o);return i.created(),i}return p(t,e),t.prototype.created=function(){},t.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},t.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},t.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},t.prototype.addEventListener=function(t,n,o,i){var r=this;void 0===i&&(i=!1);var a=s.WjDirectiveBehavior,d=a.ngZone;d&&a.outsideZoneEvents[n]?d.runOutsideAngular(function(){e.prototype.addEventListener.call(r,t,n,o,i)}):e.prototype.addEventListener.call(this,t,n,o,i)},t.meta={outputs:c.outputs,changeEvents:{selectedItemChanged:["selectedItem","selectedNode"],checkedItemsChanged:["checkedItems"]}},t.decorators=[{type:o.Component,args:[{selector:c.selector,template:c.template,inputs:c.inputs,outputs:c.outputs,providers:[{provide:"WjComponent",useExisting:i.forwardRef(function(){return t})}].concat(c.providers)}]}],t.ctorParameters=function(){return[{type:i.ElementRef,decorators:[{type:r.Inject,args:[i.ElementRef]}]},{type:i.Injector,decorators:[{type:r.Inject,args:[i.Injector]}]},{type:void 0,decorators:[{type:r.Inject,args:["WjComponent"]},{type:r.SkipSelf},{type:i.Optional}]}]},t}(n.TreeView),e("WjTreeView",g),u=[g],l=function(){function e(){}return e.decorators=[{type:o.NgModule,args:[{imports:[s.WjDirectiveBaseModule,a.CommonModule],declarations:u.slice(),exports:u.slice()}]}],e.ctorParameters=function(){return[]},e}(),e("WjNavModule",l)}}});