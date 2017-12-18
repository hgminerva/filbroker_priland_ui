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
var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a])};return function(e,a){function r(){this.constructor=e}t(e,a),e.prototype=null===a?Object.create(a):(r.prototype=a.prototype,new r)}}();define(["require","exports","wijmo/wijmo.chart","wijmo/wijmo","wijmo/wijmo.chart.radar"],function(t,e,a,r,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),window.wijmo=window.wijmo||{},window.wijmo.chart=window.wijmo.chart||{},window.wijmo.chart.radar=i;var n;!function(t){t[t.Column=0]="Column",t[t.Scatter=1]="Scatter",t[t.Line=2]="Line",t[t.LineSymbols=3]="LineSymbols",t[t.Area=4]="Area"}(n=e.RadarChartType||(e.RadarChartType={}));var s=function(t){function e(e,a){var r=t.call(this,e,a)||this;return r._chartType=n.Line,r._startAngle=0,r._totalAngle=360,r._reversed=!1,r._areas=[],r}return __extends(e,t),Object.defineProperty(e.prototype,"_radarLinePlotter",{get:function(){return null==this.__radarLinePlotter&&(this.__radarLinePlotter=new h,this._initPlotter(this.__radarLinePlotter)),this.__radarLinePlotter},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_radarColumnPlotter",{get:function(){return null==this.__radarColumnPlotter&&(this.__radarColumnPlotter=new _,this._initPlotter(this.__radarColumnPlotter)),this.__radarColumnPlotter},enumerable:!0,configurable:!0}),e.prototype._initAxes=function(){t.prototype._initAxes.call(this),this.axes.pop(),this.axes.pop(),this.axisX=new l(a.Position.Bottom),this.axisX.majorGrid=!0,this.axisY=new l(a.Position.Left),this.axisY.majorTickMarks=a.TickMark.Outside,this.axes.push(this.axisX),this.axes.push(this.axisY)},e.prototype._layout=function(e,a,i){t.prototype._layout.call(this,e,a,i);var n=this.axisX._height;this._plotRect.top+=n/2;var s=this._plotRect;this._radius=Math.min(s.width,s.height)/2,this._center=new r.Point(s.left+s.width/2,s.top+s.height/2)},Object.defineProperty(e.prototype,"chartType",{get:function(){return this._chartType},set:function(t){t!=this._chartType&&(this._chartType=r.asEnum(t,n),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"startAngle",{get:function(){return this._startAngle},set:function(t){t!=this._startAngle&&(this._startAngle=r.asNumber(t,!0),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"totalAngle",{get:function(){return this._totalAngle},set:function(t){t!=this._totalAngle&&t>=0&&(this._totalAngle=r.asNumber(t,!0),this._totalAngle<=0&&(r.assert(!1,"totalAngle must be greater than 0."),this._totalAngle=0),this._totalAngle>360&&(r.assert(!1,"totalAngle must be less than or equal to 360."),this._totalAngle=360),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"reversed",{get:function(){return this._reversed},set:function(t){t!=this._reversed&&(this._reversed=r.asBoolean(t,!0),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"stacking",{get:function(){return this._stacking},set:function(t){t!=this._stacking&&(this._stacking=r.asEnum(t,a.Stacking),this.invalidate())},enumerable:!0,configurable:!0}),e.prototype._getChartType=function(){var t=a.ChartType.Line;switch(this.chartType){case n.Area:t=a.ChartType.Area;break;case n.Line:t=a.ChartType.Line;break;case n.Column:t=a.ChartType.Column;break;case n.LineSymbols:t=a.ChartType.LineSymbols;break;case n.Scatter:t=a.ChartType.Scatter}return t},e.prototype._getPlotter=function(e){var a=this.chartType,r=null;if(e){var i=e.chartType;null!=i&&i!=a&&(a=i,!0)}switch(a){case n.Line:this._radarLinePlotter.hasSymbols=!1,this._radarLinePlotter.hasLines=!0,this._radarLinePlotter.isArea=!1,r=this._radarLinePlotter;break;case n.LineSymbols:this._radarLinePlotter.hasSymbols=!0,this._radarLinePlotter.hasLines=!0,this._radarLinePlotter.isArea=!1,r=this._radarLinePlotter;break;case n.Area:this._radarLinePlotter.hasSymbols=!1,this._radarLinePlotter.hasLines=!0,this._radarLinePlotter.isArea=!0,r=this._radarLinePlotter;break;case n.Scatter:this._radarLinePlotter.hasSymbols=!0,this._radarLinePlotter.hasLines=!1,this._radarLinePlotter.isArea=!1,r=this._radarLinePlotter;break;case n.Column:this._radarColumnPlotter.isVolume=!1,this._radarColumnPlotter.width=.8,r=this._radarColumnPlotter;break;default:r=t.prototype._getPlotter.call(this,e)}return r},e.prototype._convertPoint=function(t,e){var a=new r.Point,i=this._center;return a.x=i.x+t*Math.sin(e),a.y=i.y-t*Math.cos(e),a},e.prototype._createSeries=function(){return new o},e.prototype._clearCachedValues=function(){t.prototype._clearCachedValues.call(this),this._isPolar=!1,this._areas=[]},e.prototype._performBind=function(){t.prototype._performBind.call(this),this._xDataType===r.DataType.Number&&(this._isPolar=!0)},e.prototype._prepareRender=function(){t.prototype._prepareRender.call(this),this._areas=[]},e}(a.FlexChartCore);e.FlexRadar=s;var o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),Object.defineProperty(e.prototype,"chartType",{get:function(){return this._finChartType},set:function(t){t!=this._finChartType&&(this._finChartType=r.asEnum(t,n,!0),this._invalidate())},enumerable:!0,configurable:!0}),e.prototype._getChartType=function(){var t;switch(this.chartType){case n.Area:t=a.ChartType.Area;break;case n.Line:t=a.ChartType.Line;break;case n.Column:t=a.ChartType.Column;break;case n.LineSymbols:t=a.ChartType.LineSymbols;break;case n.Scatter:t=a.ChartType.Scatter}return t},e}(a.SeriesBase);e.FlexRadarSeries=o;var l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._points=[],e._axisLabels=[],e}return __extends(e,t),e.prototype._render=function(e){var r=this;if(this._hasVisibileSeries()){t.prototype._render.call(this,e);var i=this._axisLabels;if(i.length){var n=function(){var t=r.axisType==a.AxisType.X?"wj-axis-x-labels "+a.FlexChart._CSS_AXIS_X:"wj-axis-y-labels "+a.FlexChart._CSS_AXIS_Y;e.startGroup(t),i.forEach(function(t){var i=t.labelAngle;i>0?a.FlexChart._renderRotatedText(e,t.text,t.pos,t.align,t.vAlign,t.pos,i,t.class):i<0?a.FlexChart._renderRotatedText(e,t.text,t.pos,t.align,t.vAlign,t.pos,i,t.class):r._renderLabel(e,t.val,t.text,t.pos,t.align,t.vAlign,t.class)}),e.endGroup(),r._axisLabels=[],r._chart.rendered.removeHandler(n)};this._chart.rendered.addHandler(n,this)}}},e.prototype._getHeight=function(e,r){var i=t.prototype._getHeight.call(this,e,r);return this._axisType==a.AxisType.Y&&(i=4),this._height=2*i,2*i},e.prototype._updateActualLimits=function(e,a,r,i,n){var s=this;void 0===i&&(i=null),void 0===n&&(n=null),t.prototype._updateActualLimits.call(this,e,a,r,i,n);var o,l=this._chart,h=this._lbls,_=this.actualMin.valueOf?this.actualMin.valueOf():this.actualMin,c=this.actualMax.valueOf?this.actualMax.valueOf():this.actualMax;this._lbls&&this===l.axisX&&(l._angles=[],this._isTimeAxis&&0===this._lbls.length&&this._values.forEach(function(t){h.push(s._formatValue(t))}),o=h.length,l.totalAngle<360&&(o-=1),h.forEach(function(t,e){var a=_+e/o*(c-_),r=l.startAngle+e/o*l.totalAngle;isNaN(r)||isNaN(a)||l._angles.push({value:s.convert(a),angle:r})}))},e.prototype._updateActualLimitsByChartType=function(t,e,r){var i=this._chart;if(i._getChartType()!=a.ChartType.Column&&360===i.totalAngle&&this.axisType===a.AxisType.X)if(this._isTimeAxis){var n=(i._xlabels.length||i._xvals.length)-1;r+=(r-e)/(n=n<1?1:n)}else i._isPolar||(r+=1);return{min:e,max:r}},e.prototype.convert=function(t,e,r){var i=null==e?this.actualMax:e,n=null==r?this.actualMin:r,s=this._chart;if(!s)return NaN;if(i==n)return 0;if(this.axisType===a.AxisType.X)return s.reversed?(s.startAngle-(t-n)/(i-n)*s.totalAngle)*Math.PI/180:(s.startAngle+(t-n)/(i-n)*s.totalAngle)*Math.PI/180;if(this.logBase){if(t<=0)return NaN;var o=Math.log(i/n);return Math.log(t/n)/o*s._radius}return(t-n)/(i-n)*s._radius},e.prototype._renderLineAndTitle=function(t){var e=this._chart,r=a.FlexChart._CSS_LINE,i=(e.startAngle-90)*Math.PI/180,n=e.totalAngle*Math.PI/180,s=e._radius;this.axisType===a.AxisType.X&&this.axisLine&&(t.stroke=a.FlexChart._FG,e._isPolar?(i=e.reversed?i-n:i,t.drawPieSegment(e._center.x,e._center.y,s,i,n,r)):this._renderPolygon(t,s,r))},e.prototype._renderPolygon=function(t,e,a){var r=this._chart,i=r._angles,n=i.length,s=r.axisX.minorGrid,o=[],l=[];if(i.forEach(function(t,a){if(s&&a>0){var n=r._convertPoint(e,t.value-(t.value-i[a-1].value)/2);o.push(n.x),l.push(n.y)}var h=r._convertPoint(e,t.value);o.push(h.x),l.push(h.y)}),r.totalAngle<360)o.push(r._center.x),l.push(r._center.y);else if(s&&n>=2){var h=r._convertPoint(e,i[n-1].value-(i[n-2].value-i[n-1].value)/2);o.push(h.x),l.push(h.y)}t.drawPolygon(o,l,a)},e.prototype._renderMinors=function(t,e,r,i){var n,s=this,o=this._chart,l=a.FlexChart._CSS_GRIDLINE_MINOR,h=this.minorGrid,_=o._angles,c=_.length,u=o.axisX.minorGrid,p=a.FlexChart._FG,d=this._GRIDLINE_WIDTH,g=(o.startAngle,Math.PI,o.totalAngle,Math.PI,this._TICK_OVERLAP),y=this.minorTickMarks,f=!0;this._vals.minor=e,y==a.TickMark.Outside?g=1:y==a.TickMark.Inside?g=-1:y==a.TickMark.Cross?g=0:f=!1,this.axisType==a.AxisType.Y?(t.stroke=p,t.strokeWidth=d,e.forEach(function(e){var a=s.convert(e);if(h&&s._renderYGridLine(t,o,a,l),f&&(_.forEach(function(e,r){if(u&&r>0){n=e.value-(e.value-_[r-1].value)/2;var i=o._convertPoint(a,n);s._drawMinorTickLength(t,g,n,i)}n=e.value;var l=o._convertPoint(a,n);s._drawMinorTickLength(t,g,n,l)}),u&&c>=2)){n=_[c-1].value-(_[c-2].value-_[c-1].value)/2;var r=o._convertPoint(a,n);s._drawMinorTickLength(t,g,n,r)}})):(t.stroke=p,t.strokeWidth=d,e.forEach(function(e){var a=s.convert(e);h&&s._renderXGridLine(t,o,a,l)}))},e.prototype._drawMinorTickLength=function(t,e,r,i){var n=this._TICK_HEIGHT,s=a.FlexChart._CSS_TICK_MINOR,o=.5*(e-1)*n*Math.cos(r),l=.5*(1+e)*n*Math.cos(r),h=.5*(e-1)*n*Math.sin(r),_=.5*(1+e)*n*Math.sin(r);t.drawLine(i.x+o,i.y+h,i.x+l,i.y+_,s)},e.prototype._renderLabelsAndTicks=function(t,e,i,n,s,o,l,h,_){this._points=[],s=this.labelAngle||0;var c,u=this._chart,p=this.labelPadding||2,d=a.FlexChart._CSS_LABEL,g=a.FlexChart._CSS_GRIDLINE,y=a.FlexChart._CSS_TICK,f=a.FlexChart._FG,v=this._TICK_WIDTH,x=this.majorGrid,A=a.FlexChart._FG,P=this._GRIDLINE_WIDTH,m=u.startAngle*Math.PI/180,b=(u.totalAngle,Math.PI,1);if(this.axisType==a.AxisType.Y){x=i!=this.actualMin&&x&&i!=this.actualMax;var L=this.convert(i),T=u._convertPoint(L,m);if(x&&(t.stroke=A,t.strokeWidth=P,this._renderYGridLine(t,u,L,g)),t.stroke=f,t.strokeWidth=v,l){(c=(u.startAngle%360+360)%360)<=90&&c>=75||c>=270&&c<=285?b=2:(c>90&&c<=105||c<270&&c>=255)&&(b=0);M=new r.Point(T.x-p-Math.abs(h-_),T.y);this._axisLabels.push({val:i,text:n,pos:M,align:2,vAlign:b,labelAngle:s,class:d})}o!=a.TickMark.None&&t.drawLine(T.x-_*Math.cos(m),T.y-_*Math.sin(m),T.x-h*Math.cos(m),T.y-h*Math.sin(m),y)}else{var S=this.convert(i);if(x&&(t.stroke=A,t.strokeWidth=P,this._renderXGridLine(t,u,S,g)),t.stroke=f,t.strokeWidth=v,l){var k,C,w,M=u._convertPoint(u._radius+p,S);k=u._angles&&u._angles.length?u._angles[e].angle:u.startAngle+(i-this.actualMin)*u.totalAngle/(this.actualMax-this.actualMin),k=(k%=360)>=0?k:k+360,C=this._getXLabelVAlign(k),w=this._getXLabelAlign(k),u._isPolar&&(n=this._formatValue(k)),s>0?a.FlexChart._renderRotatedText(t,n,M,w,C,M,s,d):s<0?a.FlexChart._renderRotatedText(t,n,M,w,C,M,s,d):this._renderLabel(t,i,n,M,w,C,d)}}return!0},e.prototype._renderXGridLine=function(t,e,a,r){var i=e._center,n=e._convertPoint(e._radius,a);t.drawLine(i.x,i.y,n.x,n.y,r)},e.prototype._renderYGridLine=function(t,e,a,r){e._angles;var i=e._center,n=e.startAngle*Math.PI/180,s=e.totalAngle*Math.PI/180;e._isPolar?(n=(e.startAngle-90)*Math.PI/180,n=e.reversed?n-s:n,t.drawPieSegment(i.x,i.y,a,n,s,r)):this._renderPolygon(t,a,r)},e.prototype._getXLabelVAlign=function(t){var e=1,a=this._chart,r=a.startAngle;return a.reversed&&(t=(360+r+(r%360-t%360))%360),0===t?e=2:180===t&&(e=0),e},e.prototype._getXLabelAlign=function(t){var e=0,a=this._chart,r=a.startAngle;return a.reversed&&(t=(360+r+(r%360-t%360))%360),t>0&&t<180?e=-1:t>180&&t<360&&(e=1),e+1},e.prototype._createTimeLabels=function(e,r,i,n){var s=this;if(this._axisType==a.AxisType.Y)t.prototype._createTimeLabels.call(this,e,r,i,n);else{var o=this._values;this.format;if(!o||0===o.length)return;o.forEach(function(t){i.push(t),n.push(s._formatValue(t))})}},e}(a.Axis);e.FlexRadarAxis=l;var h=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.isArea=!1,e}return __extends(e,t),e.prototype._getLabelPoint=function(t,e){var a=t._getAxisX(),r=t._getAxisY(),i=a.convert(e.dataX),n=r.convert(e.dataY);return this.chart._convertPoint(n,i)},e.prototype.plotSeries=function(t,e,i,n,s,o,l){var h=r.asType(n,a.SeriesBase),_=this.chart,c=h._getChartType()||_._getChartType(),u=_.series.indexOf(n),p=n.getValues(0),d=n.getValues(1);if(p){d||(d=this.dataInfo.getXVals());var g=a._BasePlotter.cloneStyle(n.style,["fill"]),y=p.length,f=!0;d?y=Math.min(y,d.length):(f=!1,d=new Array(y));var v=this._DEFAULT_WIDTH,x=h._getSymbolFill(u),A=h._getAltSymbolFill(u)||x,P=h._getSymbolStroke(u),m=h._getAltSymbolStroke(u)||P,b=h._getSymbolSize();t.stroke=P,t.strokeWidth=v,t.fill=x;var L=new Array,T=new Array,S=this.stacking!=a.Stacking.None&&!h._isCustomAxisY(),k=this.stacking==a.Stacking.Stacked100pc&&!h._isCustomAxisY();void 0!==h._getChartType()&&(S=k=!1);for(var C=this.chart.interpolateNulls,w=!1,M=0;M<y;M++){var I=f?d[M]:M,N=p[M];if(a._DataInfo.isValid(I)&&a._DataInfo.isValid(N)){if(S)if(k&&(N/=this.dataInfo.getStackedAbsSum(I)),N>=0){F=isNaN(this.stackPos[I])?0:this.stackPos[I];N=this.stackPos[I]=F+N}else{var F=isNaN(this.stackNeg[I])?0:this.stackNeg[I];N=this.stackNeg[I]=F+N}var X;X=new a._DataPoint(u,M,I,N);var j=e.convert(I),O=i.convert(N),D=this.chart._convertPoint(O,j);if(I=D.x,N=D.y,isNaN(I)||isNaN(N))w=!0,!0!==C&&(L.push(void 0),T.push(void 0));else{L.push(I),T.push(N);var R=new a._CircleArea(new r.Point(I,N),.5*b);R.tag=X,this.hitTester.add(R,u)}}else w=!0,!0!==C&&(L.push(void 0),T.push(void 0))}var V=0;if(this.hasLines)if(this.isArea?t.fill=x||s._getColorLight(u):t.fill="none",w&&!0!==C){for(var G=[],Y=[],M=0;M<y;M++)void 0===L[M]?(G.push(void 0),Y.push(0)):(G.push(L[M]),Y.push(T[M]));G.length>1&&(_._isPolar&&c!==a.ChartType.Area?this._drawLines(t,G,Y,null,g,this.chart._plotrectId):(_.totalAngle<360&&(G.push(_._center.x),Y.push(_._center.y)),t.drawPolygon(G,Y,null,g,this.chart._plotrectId)),this.hitTester.add(new a._LinesArea(G,Y),u),V++)}else _._isPolar&&c!==a.ChartType.Area?this._drawLines(t,L,T,null,g,this.chart._plotrectId):(_.totalAngle<360&&(L.push(_._center.x),T.push(_._center.y)),t.drawPolygon(L,T,null,g,this.chart._plotrectId)),this.hitTester.add(new a._LinesArea(L,T),u),V++;t.fill=x;for(M=0;M<y;M++){var I=L[M],N=T[M];!1===this.hasLines&&(t.fill=p[M]>0?x:A,t.stroke=p[M]>0?P:m),this.isValid(I,N,e,i)&&((this.hasSymbols||this.chart.itemFormatter)&&b>0&&this._drawSymbol(t,I,N,b,h,M),n._setPointIndex(M,V),V++)}}},e}(a._LinePlotter);e._RadarLinePlotter=h;var _=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.adjustLimits=function(t,e){this.dataInfo=t;var a=t.getMinX(),i=t.getMinY(),n=t.getMaxX(),s=t.getMaxY(),o=t.getDeltaX();return o<=0&&(o=1),this.chart.totalAngle<360&&(o=0),this.unload(),this.chart.axisY.logBase||(this.origin>s?s=this.origin:this.origin<i&&(i=this.origin)),new r.Rect(a,i,n-a+o,s-i)},e.prototype._getLabelPoint=function(t,e){var a=t._getAxisX(),r=t._getAxisY(),i=a.convert(e.dataX),n=r.convert(e.dataY);return this.chart._convertPoint(n,i)},e.prototype.plotSeries=function(t,e,i,n,s,o,l){var h=this.chart.series.indexOf(n),_=r.asType(n,a.SeriesBase),c=(this.chart.options,this.width),u=this.chart,p=-90*Math.PI/180;o=o||0;var d,g=_._getAxisY()._uniqueId,y=(this.stackNegMap[g],this.stackPosMap[g]),f=this.stacking!=a.Stacking.None,v=this.stacking==a.Stacking.Stacked100pc,x=n.getValues(0),A=n.getValues(1);if(x){A||(A=this.dataInfo.getXVals());var P;(P=A?u.totalAngle/A.length:u.totalAngle/(e.actualMax-e.actualMin))>0&&(c=f?P*c*Math.PI/180:P*Math.pow(c,o+1)*Math.PI/180);var m=_._getSymbolFill(h),b=_._getAltSymbolFill(h)||m,L=_._getSymbolStroke(h),T=_._getAltSymbolStroke(h)||L,S=x.length;null!=A&&(S=Math.min(S,A.length));var k,C,w=this.origin,M=0;void 0!==_._getChartType()&&(f=v=!1),w<i.actualMin?w=i.actualMin:w>i.actualMax&&(w=i.actualMax);i.convert(w);var I=e.actualMin,N=e.actualMax;_._isCustomAxisY()&&(f=v=!1),u._areas[h]||(u._areas[h]=[]);for(var F=0;F<S;F++){var X=A?A[F]:F,j=x[F];if(this._getSymbolOrigin&&i.convert(this._getSymbolOrigin(w,F,S)),this._getSymbolStyles){var O=this._getSymbolStyles(F,S);m=O&&O.fill?O.fill:m,b=O&&O.fill?O.fill:b,L=O&&O.stroke?O.stroke:L,T=O&&O.stroke?O.stroke:T}if(k=j>0?m:b,C=j>0?L:T,t.fill=k,t.stroke=C,a._DataInfo.isValid(X)&&a._DataInfo.isValid(j)){if(f){var D=X-.5*c,R=X+.5*c;if(D<I&&R<I||D>N&&R>N)continue;if(D=e.convert(D),R=e.convert(R),!a._DataInfo.isValid(D)||!a._DataInfo.isValid(R))continue;var V,G;v&&(j/=this.dataInfo.getStackedAbsSum(X));var Y=isNaN(y[X])?0:y[X];V=Y,G=Y+j,y[X]=Y+j;var E=e.convert(X),B=i.convert(V),W=i.convert(G);E-=c/2,t.drawDonutSegment(u._center.x,u._center.y,W,B,E+p,c,null,_.symbolStyle),(d=new a._DonutSegment(new r.Point(u._center.x,u._center.y),W,B,E+p,c,u.startAngle||0)).tag=new a._DataPoint(h,F,X,Y+j),this.hitTester.add(d,h)}else{var E=e.convert(X),H=i.convert(j);u._convertPoint(H,E);E-=c/2,t.drawPieSegment(u._center.x,u._center.y,H,E+p,c,null,_.symbolStyle),(d=new a._PieSegment(new r.Point(u._center.x,u._center.y),H,E+p,c,u.startAngle)).tag=new a._DataPoint(h,F,X,j),this.hitTester.add(d,h)}u._areas[h].push(d),n._setPointIndex(F,M),M++}}}},e}(a._BarPlotter);e._RadarBarPlotter=_});