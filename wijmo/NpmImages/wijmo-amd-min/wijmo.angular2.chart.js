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
var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();define(["require","exports","wijmo/wijmo.chart","@angular/core","@angular/core","@angular/core","@angular/common","@angular/forms","wijmo/wijmo.angular2.directiveBase"],function(e,t,r,n,o,i,a,s,p){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.wjFlexChartMeta={selector:"wj-flex-chart",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjModelProperty","isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","bindingX","interpolateNulls","legendToggle","symbolSize","options","selection","itemFormatter","labelContent","chartType","rotated","stacking"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","renderingNg: rendering","renderedNg: rendered","selectionChangedNg: selectionChanged","selectionChangePC: selectionChange","seriesVisibilityChangedNg: seriesVisibilityChanged"],providers:[{provide:s.NG_VALUE_ACCESSOR,useFactory:p.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};var c=function(e){function r(t,r,n){var o=e.call(this,p.WjDirectiveBehavior.getHostElement(t,r))||this;o.isInitialized=!1;o._wjBehaviour=p.WjDirectiveBehavior.attach(o,t,r,n);return o.created(),o}return __extends(r,e),r.prototype.created=function(){},r.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},r.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},r.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},r.prototype.addEventListener=function(t,r,n,o){var i=this;void 0===o&&(o=!1);var a=p.WjDirectiveBehavior,s=a.ngZone;s&&a.outsideZoneEvents[r]?s.runOutsideAngular(function(){e.prototype.addEventListener.call(i,t,r,n,o)}):e.prototype.addEventListener.call(this,t,r,n,o)},Object.defineProperty(r.prototype,"tooltipContent",{get:function(){return this.tooltip.content},set:function(e){this.tooltip.content=e},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"labelContent",{get:function(){return this.dataLabel.content},set:function(e){this.dataLabel.content=e},enumerable:!0,configurable:!0}),r.meta={outputs:t.wjFlexChartMeta.outputs,changeEvents:{selectionChanged:["selection"]}},r.decorators=[{type:n.Component,args:[{selector:t.wjFlexChartMeta.selector,template:t.wjFlexChartMeta.template,inputs:t.wjFlexChartMeta.inputs,outputs:t.wjFlexChartMeta.outputs,providers:[{provide:"WjComponent",useExisting:o.forwardRef(function(){return r})}].concat(t.wjFlexChartMeta.providers)}]}],r.ctorParameters=function(){return[{type:o.ElementRef,decorators:[{type:i.Inject,args:[o.ElementRef]}]},{type:o.Injector,decorators:[{type:i.Inject,args:[o.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:o.Optional}]}]},r}(r.FlexChart);t.WjFlexChart=c,t.wjFlexPieMeta={selector:"wj-flex-pie",template:"<div><ng-content></ng-content></div>",inputs:["wjModelProperty","isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","bindingName","innerRadius","isAnimated","offset","reversed","startAngle","selectedItemPosition","selectedItemOffset","itemFormatter","labelContent"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","renderingNg: rendering","renderedNg: rendered","selectionChangedNg: selectionChanged"],providers:[{provide:s.NG_VALUE_ACCESSOR,useFactory:p.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};var l=function(e){function r(t,r,n){var o=e.call(this,p.WjDirectiveBehavior.getHostElement(t,r))||this;o.isInitialized=!1;o._wjBehaviour=p.WjDirectiveBehavior.attach(o,t,r,n);return o.created(),o}return __extends(r,e),r.prototype.created=function(){},r.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},r.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},r.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},r.prototype.addEventListener=function(t,r,n,o){var i=this;void 0===o&&(o=!1);var a=p.WjDirectiveBehavior,s=a.ngZone;s&&a.outsideZoneEvents[r]?s.runOutsideAngular(function(){e.prototype.addEventListener.call(i,t,r,n,o)}):e.prototype.addEventListener.call(this,t,r,n,o)},Object.defineProperty(r.prototype,"tooltipContent",{get:function(){return this.tooltip.content},set:function(e){this.tooltip.content=e},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"labelContent",{get:function(){return this.dataLabel.content},set:function(e){this.dataLabel.content=e},enumerable:!0,configurable:!0}),r.meta={outputs:t.wjFlexPieMeta.outputs},r.decorators=[{type:n.Component,args:[{selector:t.wjFlexPieMeta.selector,template:t.wjFlexPieMeta.template,inputs:t.wjFlexPieMeta.inputs,outputs:t.wjFlexPieMeta.outputs,providers:[{provide:"WjComponent",useExisting:o.forwardRef(function(){return r})}].concat(t.wjFlexPieMeta.providers)}]}],r.ctorParameters=function(){return[{type:o.ElementRef,decorators:[{type:i.Inject,args:[o.ElementRef]}]},{type:o.Injector,decorators:[{type:i.Inject,args:[o.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:o.Optional}]}]},r}(r.FlexPie);t.WjFlexPie=l,t.wjFlexChartAxisMeta={selector:"wj-flex-chart-axis",template:"",inputs:["wjProperty","axisLine","format","labels","majorGrid","majorTickMarks","majorUnit","max","min","position","reversed","title","labelAngle","minorGrid","minorTickMarks","minorUnit","origin","logBase","plotArea","labelAlign","name","overlappingLabels","labelPadding","itemFormatter","itemsSource","binding"],outputs:["initialized","rangeChangedNg: rangeChanged"],providers:[]};var u=function(e){function r(t,r,n){var o=e.call(this)||this;o.isInitialized=!1,o.wjProperty="axes";o._wjBehaviour=p.WjDirectiveBehavior.attach(o,t,r,n);return o.created(),o}return __extends(r,e),r.prototype.created=function(){},r.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},r.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},r.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},r.meta={outputs:t.wjFlexChartAxisMeta.outputs},r.decorators=[{type:n.Component,args:[{selector:t.wjFlexChartAxisMeta.selector,template:t.wjFlexChartAxisMeta.template,inputs:t.wjFlexChartAxisMeta.inputs,outputs:t.wjFlexChartAxisMeta.outputs,providers:[{provide:"WjComponent",useExisting:o.forwardRef(function(){return r})}].concat(t.wjFlexChartAxisMeta.providers)}]}],r.ctorParameters=function(){return[{type:o.ElementRef,decorators:[{type:i.Inject,args:[o.ElementRef]}]},{type:o.Injector,decorators:[{type:i.Inject,args:[o.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:o.Optional}]}]},r}(r.Axis);t.WjFlexChartAxis=u,t.wjFlexChartLegendMeta={selector:"wj-flex-chart-legend",template:"",inputs:["wjProperty","position"],outputs:["initialized"],providers:[]};var d=function(e){function r(t,r,n){var o=e.call(this,n)||this;o.isInitialized=!1,o.wjProperty="legend";o._wjBehaviour=p.WjDirectiveBehavior.attach(o,t,r,n);return o.created(),o}return __extends(r,e),r.prototype.created=function(){},r.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},r.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},r.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},r.meta={outputs:t.wjFlexChartLegendMeta.outputs},r.decorators=[{type:n.Component,args:[{selector:t.wjFlexChartLegendMeta.selector,template:t.wjFlexChartLegendMeta.template,inputs:t.wjFlexChartLegendMeta.inputs,outputs:t.wjFlexChartLegendMeta.outputs,providers:[{provide:"WjComponent",useExisting:o.forwardRef(function(){return r})}].concat(t.wjFlexChartLegendMeta.providers)}]}],r.ctorParameters=function(){return[{type:o.ElementRef,decorators:[{type:i.Inject,args:[o.ElementRef]}]},{type:o.Injector,decorators:[{type:i.Inject,args:[o.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:o.Optional}]}]},r}(r.Legend);t.WjFlexChartLegend=d,t.wjFlexChartDataLabelMeta={selector:"wj-flex-chart-data-label",template:"",inputs:["wjProperty","content","border","offset","connectingLine","position"],outputs:["initialized","renderingNg: rendering"],providers:[]};var j=function(e){function r(t,r,n){var o=e.call(this)||this;o.isInitialized=!1,o.wjProperty="dataLabel";o._wjBehaviour=p.WjDirectiveBehavior.attach(o,t,r,n);return o.created(),o}return __extends(r,e),r.prototype.created=function(){},r.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},r.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},r.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},r.meta={outputs:t.wjFlexChartDataLabelMeta.outputs},r.decorators=[{type:n.Component,args:[{selector:t.wjFlexChartDataLabelMeta.selector,template:t.wjFlexChartDataLabelMeta.template,inputs:t.wjFlexChartDataLabelMeta.inputs,outputs:t.wjFlexChartDataLabelMeta.outputs,providers:[{provide:"WjComponent",useExisting:o.forwardRef(function(){return r})}].concat(t.wjFlexChartDataLabelMeta.providers)}]}],r.ctorParameters=function(){return[{type:o.ElementRef,decorators:[{type:i.Inject,args:[o.ElementRef]}]},{type:o.Injector,decorators:[{type:i.Inject,args:[o.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:o.Optional}]}]},r}(r.DataLabel);t.WjFlexChartDataLabel=j,t.wjFlexPieDataLabelMeta={selector:"wj-flex-pie-data-label",template:"",inputs:["wjProperty","content","border","offset","connectingLine","position"],outputs:["initialized","renderingNg: rendering"],providers:[]};var h=function(e){function r(t,r,n){var o=e.call(this)||this;o.isInitialized=!1,o.wjProperty="dataLabel";o._wjBehaviour=p.WjDirectiveBehavior.attach(o,t,r,n);return o.created(),o}return __extends(r,e),r.prototype.created=function(){},r.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},r.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},r.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},r.meta={outputs:t.wjFlexPieDataLabelMeta.outputs},r.decorators=[{type:n.Component,args:[{selector:t.wjFlexPieDataLabelMeta.selector,template:t.wjFlexPieDataLabelMeta.template,inputs:t.wjFlexPieDataLabelMeta.inputs,outputs:t.wjFlexPieDataLabelMeta.outputs,providers:[{provide:"WjComponent",useExisting:o.forwardRef(function(){return r})}].concat(t.wjFlexPieDataLabelMeta.providers)}]}],r.ctorParameters=function(){return[{type:o.ElementRef,decorators:[{type:i.Inject,args:[o.ElementRef]}]},{type:o.Injector,decorators:[{type:i.Inject,args:[o.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:o.Optional}]}]},r}(r.PieDataLabel);t.WjFlexPieDataLabel=h,t.wjFlexChartSeriesMeta={selector:"wj-flex-chart-series",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjProperty","axisX","axisY","binding","bindingX","cssClass","name","style","altStyle","symbolMarker","symbolSize","symbolStyle","visibility","itemsSource","chartType"],outputs:["initialized","renderingNg: rendering","renderedNg: rendered","visibilityChangePC: visibilityChange"],providers:[]};var g=function(e){function r(t,r,n){var o=e.call(this)||this;o.isInitialized=!1,o.wjProperty="series";o._wjBehaviour=p.WjDirectiveBehavior.attach(o,t,r,n);return o.created(),o}return __extends(r,e),r.prototype.created=function(){},r.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},r.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},r.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},r.meta={outputs:t.wjFlexChartSeriesMeta.outputs,changeEvents:{"chart.seriesVisibilityChanged":["visibility"]},siblingId:"series"},r.decorators=[{type:n.Component,args:[{selector:t.wjFlexChartSeriesMeta.selector,template:t.wjFlexChartSeriesMeta.template,inputs:t.wjFlexChartSeriesMeta.inputs,outputs:t.wjFlexChartSeriesMeta.outputs,providers:[{provide:"WjComponent",useExisting:o.forwardRef(function(){return r})}].concat(t.wjFlexChartSeriesMeta.providers)}]}],r.ctorParameters=function(){return[{type:o.ElementRef,decorators:[{type:i.Inject,args:[o.ElementRef]}]},{type:o.Injector,decorators:[{type:i.Inject,args:[o.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:o.Optional}]}]},r}(r.Series);t.WjFlexChartSeries=g,t.wjFlexChartLineMarkerMeta={selector:"wj-flex-line-marker",template:"",inputs:["wjProperty","isVisible","seriesIndex","horizontalPosition","content","verticalPosition","alignment","lines","interaction","dragLines","dragThreshold","dragContent"],outputs:["initialized","positionChangedNg: positionChanged"],providers:[]};var y=function(e){function r(t,r,n){var o=e.call(this,n)||this;o.isInitialized=!1;o._wjBehaviour=p.WjDirectiveBehavior.attach(o,t,r,n);return o.created(),o}return __extends(r,e),r.prototype.created=function(){},r.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},r.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},r.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},r.meta={outputs:t.wjFlexChartLineMarkerMeta.outputs},r.decorators=[{type:n.Component,args:[{selector:t.wjFlexChartLineMarkerMeta.selector,template:t.wjFlexChartLineMarkerMeta.template,inputs:t.wjFlexChartLineMarkerMeta.inputs,outputs:t.wjFlexChartLineMarkerMeta.outputs,providers:[{provide:"WjComponent",useExisting:o.forwardRef(function(){return r})}].concat(t.wjFlexChartLineMarkerMeta.providers)}]}],r.ctorParameters=function(){return[{type:o.ElementRef,decorators:[{type:i.Inject,args:[o.ElementRef]}]},{type:o.Injector,decorators:[{type:i.Inject,args:[o.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:o.Optional}]}]},r}(r.LineMarker);t.WjFlexChartLineMarker=y,t.wjFlexChartDataPointMeta={selector:"wj-flex-chart-data-point",template:"",inputs:["wjProperty","x","y"],outputs:["initialized"],providers:[]};var f=function(e){function r(t,r,n){var o=e.call(this)||this;o.isInitialized=!1,o.wjProperty="";o._wjBehaviour=p.WjDirectiveBehavior.attach(o,t,r,n);return o.created(),o}return __extends(r,e),r.prototype.created=function(){},r.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},r.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},r.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},r.meta={outputs:t.wjFlexChartDataPointMeta.outputs},r.decorators=[{type:n.Component,args:[{selector:t.wjFlexChartDataPointMeta.selector,template:t.wjFlexChartDataPointMeta.template,inputs:t.wjFlexChartDataPointMeta.inputs,outputs:t.wjFlexChartDataPointMeta.outputs,providers:[{provide:"WjComponent",useExisting:o.forwardRef(function(){return r})}].concat(t.wjFlexChartDataPointMeta.providers)}]}],r.ctorParameters=function(){return[{type:o.ElementRef,decorators:[{type:i.Inject,args:[o.ElementRef]}]},{type:o.Injector,decorators:[{type:i.Inject,args:[o.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:o.Optional}]}]},r}(r.DataPoint);t.WjFlexChartDataPoint=f,t.wjFlexChartPlotAreaMeta={selector:"wj-flex-chart-plot-area",template:"",inputs:["wjProperty","column","height","name","row","style","width"],outputs:["initialized"],providers:[]};var v=function(e){function r(t,r,n){var o=e.call(this)||this;o.isInitialized=!1,o.wjProperty="plotAreas";o._wjBehaviour=p.WjDirectiveBehavior.attach(o,t,r,n);return o.created(),o}return __extends(r,e),r.prototype.created=function(){},r.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},r.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},r.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},r.meta={outputs:t.wjFlexChartPlotAreaMeta.outputs},r.decorators=[{type:n.Component,args:[{selector:t.wjFlexChartPlotAreaMeta.selector,template:t.wjFlexChartPlotAreaMeta.template,inputs:t.wjFlexChartPlotAreaMeta.inputs,outputs:t.wjFlexChartPlotAreaMeta.outputs,providers:[{provide:"WjComponent",useExisting:o.forwardRef(function(){return r})}].concat(t.wjFlexChartPlotAreaMeta.providers)}]}],r.ctorParameters=function(){return[{type:o.ElementRef,decorators:[{type:i.Inject,args:[o.ElementRef]}]},{type:o.Injector,decorators:[{type:i.Inject,args:[o.Injector]}]},{type:void 0,decorators:[{type:i.Inject,args:["WjComponent"]},{type:i.SkipSelf},{type:o.Optional}]}]},r}(r.PlotArea);t.WjFlexChartPlotArea=v;var w=[c,l,u,d,j,h,g,y,f,v],m=function(){function e(){}return e.decorators=[{type:n.NgModule,args:[{imports:[p.WjDirectiveBaseModule,a.CommonModule],declarations:w.slice(),exports:w.slice()}]}],e.ctorParameters=function(){return[]},e}();t.WjChartModule=m});