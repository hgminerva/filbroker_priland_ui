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
var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();define(["require","exports","wijmo/wijmo.chart.animation","@angular/core","@angular/core","@angular/core","@angular/common","wijmo/wijmo.angular2.directiveBase"],function(t,e,n,o,r,i,a,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.wjFlexChartAnimationMeta={selector:"wj-flex-chart-animation",template:"",inputs:["wjProperty","animationMode","easing","duration","axisAnimation"],outputs:["initialized"],providers:[]};var c=function(t){function n(e,n,o){var r=t.call(this,o)||this;r.isInitialized=!1;r._wjBehaviour=s.WjDirectiveBehavior.attach(r,e,n,o);return r.created(),r}return __extends(n,t),n.prototype.created=function(){},n.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},n.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},n.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},n.meta={outputs:e.wjFlexChartAnimationMeta.outputs},n.decorators=[{type:o.Component,args:[{selector:e.wjFlexChartAnimationMeta.selector,template:e.wjFlexChartAnimationMeta.template,inputs:e.wjFlexChartAnimationMeta.inputs,outputs:e.wjFlexChartAnimationMeta.outputs,providers:[{provide:"WjComponent",useExisting:r.forwardRef(function(){return n})}].concat(e.wjFlexChartAnimationMeta.providers)}]}],n.ctorParameters=function(){return[{type:r.ElementRef,decorators:[{type:i.Inject,args:[r.ElementRef]}]},{type:r.Injector,decorators:[{type:i.Inject,args:[r.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:r.Optional}]}]},n}(n.ChartAnimation);e.WjFlexChartAnimation=c;var u=[c],p=function(){function t(){}return t.decorators=[{type:o.NgModule,args:[{imports:[s.WjDirectiveBaseModule,a.CommonModule],declarations:u.slice(),exports:u.slice()}]}],t.ctorParameters=function(){return[]},t}();e.WjChartAnimationModule=p});