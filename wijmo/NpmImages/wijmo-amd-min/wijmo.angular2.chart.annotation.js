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
var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();define(["require","exports","wijmo/wijmo.chart.annotation","@angular/core","@angular/core","@angular/core","@angular/common","wijmo/wijmo.angular2.directiveBase"],function(t,e,n,o,r,i,a,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.wjFlexChartAnnotationLayerMeta={selector:"wj-flex-chart-annotation-layer",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty"],outputs:["initialized"],providers:[]};var p=function(t){function n(e,n,o){var r=t.call(this,o)||this;r.isInitialized=!1;r._wjBehaviour=s.WjDirectiveBehavior.attach(r,e,n,o);return r.created(),r}return __extends(n,t),n.prototype.created=function(){},n.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},n.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},n.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},n.meta={outputs:e.wjFlexChartAnnotationLayerMeta.outputs},n.decorators=[{type:o.Component,args:[{selector:e.wjFlexChartAnnotationLayerMeta.selector,template:e.wjFlexChartAnnotationLayerMeta.template,inputs:e.wjFlexChartAnnotationLayerMeta.inputs,outputs:e.wjFlexChartAnnotationLayerMeta.outputs,providers:[{provide:"WjComponent",useExisting:r.forwardRef(function(){return n})}].concat(e.wjFlexChartAnnotationLayerMeta.providers)}]}],n.ctorParameters=function(){return[{type:r.ElementRef,decorators:[{type:i.Inject,args:[r.ElementRef]}]},{type:r.Injector,decorators:[{type:i.Inject,args:[r.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:r.Optional}]}]},n}(n.AnnotationLayer);e.WjFlexChartAnnotationLayer=p,e.wjFlexChartAnnotationTextMeta={selector:"wj-flex-chart-annotation-text",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};var c=function(t){function n(e,n,o){var r=t.call(this)||this;r.isInitialized=!1,r.wjProperty="items";r._wjBehaviour=s.WjDirectiveBehavior.attach(r,e,n,o);return r.created(),r}return __extends(n,t),n.prototype.created=function(){},n.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},n.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},n.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},n.meta={outputs:e.wjFlexChartAnnotationTextMeta.outputs,siblingId:"annotation"},n.decorators=[{type:o.Component,args:[{selector:e.wjFlexChartAnnotationTextMeta.selector,template:e.wjFlexChartAnnotationTextMeta.template,inputs:e.wjFlexChartAnnotationTextMeta.inputs,outputs:e.wjFlexChartAnnotationTextMeta.outputs,providers:[{provide:"WjComponent",useExisting:r.forwardRef(function(){return n})}].concat(e.wjFlexChartAnnotationTextMeta.providers)}]}],n.ctorParameters=function(){return[{type:r.ElementRef,decorators:[{type:i.Inject,args:[r.ElementRef]}]},{type:r.Injector,decorators:[{type:i.Inject,args:[r.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:r.Optional}]}]},n}(n.Text);e.WjFlexChartAnnotationText=c,e.wjFlexChartAnnotationEllipseMeta={selector:"wj-flex-chart-annotation-ellipse",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};var l=function(t){function n(e,n,o){var r=t.call(this)||this;r.isInitialized=!1,r.wjProperty="items";r._wjBehaviour=s.WjDirectiveBehavior.attach(r,e,n,o);return r.created(),r}return __extends(n,t),n.prototype.created=function(){},n.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},n.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},n.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},n.meta={outputs:e.wjFlexChartAnnotationEllipseMeta.outputs,siblingId:"annotation"},n.decorators=[{type:o.Component,args:[{selector:e.wjFlexChartAnnotationEllipseMeta.selector,template:e.wjFlexChartAnnotationEllipseMeta.template,inputs:e.wjFlexChartAnnotationEllipseMeta.inputs,outputs:e.wjFlexChartAnnotationEllipseMeta.outputs,providers:[{provide:"WjComponent",useExisting:r.forwardRef(function(){return n})}].concat(e.wjFlexChartAnnotationEllipseMeta.providers)}]}],n.ctorParameters=function(){return[{type:r.ElementRef,decorators:[{type:i.Inject,args:[r.ElementRef]}]},{type:r.Injector,decorators:[{type:i.Inject,args:[r.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:r.Optional}]}]},n}(n.Ellipse);e.WjFlexChartAnnotationEllipse=l,e.wjFlexChartAnnotationRectangleMeta={selector:"wj-flex-chart-annotation-rectangle",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};var u=function(t){function n(e,n,o){var r=t.call(this)||this;r.isInitialized=!1,r.wjProperty="items";r._wjBehaviour=s.WjDirectiveBehavior.attach(r,e,n,o);return r.created(),r}return __extends(n,t),n.prototype.created=function(){},n.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},n.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},n.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},n.meta={outputs:e.wjFlexChartAnnotationRectangleMeta.outputs,siblingId:"annotation"},n.decorators=[{type:o.Component,args:[{selector:e.wjFlexChartAnnotationRectangleMeta.selector,template:e.wjFlexChartAnnotationRectangleMeta.template,inputs:e.wjFlexChartAnnotationRectangleMeta.inputs,outputs:e.wjFlexChartAnnotationRectangleMeta.outputs,providers:[{provide:"WjComponent",useExisting:r.forwardRef(function(){return n})}].concat(e.wjFlexChartAnnotationRectangleMeta.providers)}]}],n.ctorParameters=function(){return[{type:r.ElementRef,decorators:[{type:i.Inject,args:[r.ElementRef]}]},{type:r.Injector,decorators:[{type:i.Inject,args:[r.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:r.Optional}]}]},n}(n.Rectangle);e.WjFlexChartAnnotationRectangle=u,e.wjFlexChartAnnotationLineMeta={selector:"wj-flex-chart-annotation-line",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};var h=function(t){function n(e,n,o){var r=t.call(this)||this;r.isInitialized=!1,r.wjProperty="items";r._wjBehaviour=s.WjDirectiveBehavior.attach(r,e,n,o);return r.created(),r}return __extends(n,t),n.prototype.created=function(){},n.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},n.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},n.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},n.meta={outputs:e.wjFlexChartAnnotationLineMeta.outputs,siblingId:"annotation"},n.decorators=[{type:o.Component,args:[{selector:e.wjFlexChartAnnotationLineMeta.selector,template:e.wjFlexChartAnnotationLineMeta.template,inputs:e.wjFlexChartAnnotationLineMeta.inputs,outputs:e.wjFlexChartAnnotationLineMeta.outputs,providers:[{provide:"WjComponent",useExisting:r.forwardRef(function(){return n})}].concat(e.wjFlexChartAnnotationLineMeta.providers)}]}],n.ctorParameters=function(){return[{type:r.ElementRef,decorators:[{type:i.Inject,args:[r.ElementRef]}]},{type:r.Injector,decorators:[{type:i.Inject,args:[r.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:r.Optional}]}]},n}(n.Line);e.WjFlexChartAnnotationLine=h,e.wjFlexChartAnnotationPolygonMeta={selector:"wj-flex-chart-annotation-polygon",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};var j=function(t){function n(e,n,o){var r=t.call(this)||this;r.isInitialized=!1,r.wjProperty="items";r._wjBehaviour=s.WjDirectiveBehavior.attach(r,e,n,o);return r.created(),r}return __extends(n,t),n.prototype.created=function(){},n.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},n.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},n.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},n.meta={outputs:e.wjFlexChartAnnotationPolygonMeta.outputs,siblingId:"annotation"},n.decorators=[{type:o.Component,args:[{selector:e.wjFlexChartAnnotationPolygonMeta.selector,template:e.wjFlexChartAnnotationPolygonMeta.template,inputs:e.wjFlexChartAnnotationPolygonMeta.inputs,outputs:e.wjFlexChartAnnotationPolygonMeta.outputs,providers:[{provide:"WjComponent",useExisting:r.forwardRef(function(){return n})}].concat(e.wjFlexChartAnnotationPolygonMeta.providers)}]}],n.ctorParameters=function(){return[{type:r.ElementRef,decorators:[{type:i.Inject,args:[r.ElementRef]}]},{type:r.Injector,decorators:[{type:i.Inject,args:[r.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:r.Optional}]}]},n}(n.Polygon);e.WjFlexChartAnnotationPolygon=j,e.wjFlexChartAnnotationCircleMeta={selector:"wj-flex-chart-annotation-circle",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};var d=function(t){function n(e,n,o){var r=t.call(this)||this;r.isInitialized=!1,r.wjProperty="items";r._wjBehaviour=s.WjDirectiveBehavior.attach(r,e,n,o);return r.created(),r}return __extends(n,t),n.prototype.created=function(){},n.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},n.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},n.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},n.meta={outputs:e.wjFlexChartAnnotationCircleMeta.outputs,siblingId:"annotation"},n.decorators=[{type:o.Component,args:[{selector:e.wjFlexChartAnnotationCircleMeta.selector,template:e.wjFlexChartAnnotationCircleMeta.template,inputs:e.wjFlexChartAnnotationCircleMeta.inputs,outputs:e.wjFlexChartAnnotationCircleMeta.outputs,providers:[{provide:"WjComponent",useExisting:r.forwardRef(function(){return n})}].concat(e.wjFlexChartAnnotationCircleMeta.providers)}]}],n.ctorParameters=function(){return[{type:r.ElementRef,decorators:[{type:i.Inject,args:[r.ElementRef]}]},{type:r.Injector,decorators:[{type:i.Inject,args:[r.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:r.Optional}]}]},n}(n.Circle);e.WjFlexChartAnnotationCircle=d,e.wjFlexChartAnnotationSquareMeta={selector:"wj-flex-chart-annotation-square",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};var y=function(t){function n(e,n,o){var r=t.call(this)||this;r.isInitialized=!1,r.wjProperty="items";r._wjBehaviour=s.WjDirectiveBehavior.attach(r,e,n,o);return r.created(),r}return __extends(n,t),n.prototype.created=function(){},n.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},n.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},n.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},n.meta={outputs:e.wjFlexChartAnnotationSquareMeta.outputs,siblingId:"annotation"},n.decorators=[{type:o.Component,args:[{selector:e.wjFlexChartAnnotationSquareMeta.selector,template:e.wjFlexChartAnnotationSquareMeta.template,inputs:e.wjFlexChartAnnotationSquareMeta.inputs,outputs:e.wjFlexChartAnnotationSquareMeta.outputs,providers:[{provide:"WjComponent",useExisting:r.forwardRef(function(){return n})}].concat(e.wjFlexChartAnnotationSquareMeta.providers)}]}],n.ctorParameters=function(){return[{type:r.ElementRef,decorators:[{type:i.Inject,args:[r.ElementRef]}]},{type:r.Injector,decorators:[{type:i.Inject,args:[r.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:r.Optional}]}]},n}(n.Square);e.WjFlexChartAnnotationSquare=y,e.wjFlexChartAnnotationImageMeta={selector:"wj-flex-chart-annotation-image",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};var f=function(t){function n(e,n,o){var r=t.call(this)||this;r.isInitialized=!1,r.wjProperty="items";r._wjBehaviour=s.WjDirectiveBehavior.attach(r,e,n,o);return r.created(),r}return __extends(n,t),n.prototype.created=function(){},n.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},n.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},n.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},n.meta={outputs:e.wjFlexChartAnnotationImageMeta.outputs,siblingId:"annotation"},n.decorators=[{type:o.Component,args:[{selector:e.wjFlexChartAnnotationImageMeta.selector,template:e.wjFlexChartAnnotationImageMeta.template,inputs:e.wjFlexChartAnnotationImageMeta.inputs,outputs:e.wjFlexChartAnnotationImageMeta.outputs,providers:[{provide:"WjComponent",useExisting:r.forwardRef(function(){return n})}].concat(e.wjFlexChartAnnotationImageMeta.providers)}]}],n.ctorParameters=function(){return[{type:r.ElementRef,decorators:[{type:i.Inject,args:[r.ElementRef]}]},{type:r.Injector,decorators:[{type:i.Inject,args:[r.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:r.Optional}]}]},n}(n.Image);e.WjFlexChartAnnotationImage=f;var g=[p,c,l,u,h,j,d,y,f],w=function(){function t(){}return t.decorators=[{type:o.NgModule,args:[{imports:[s.WjDirectiveBaseModule,a.CommonModule],declarations:g.slice(),exports:g.slice()}]}],t.ctorParameters=function(){return[]},t}();e.WjChartAnnotationModule=w});