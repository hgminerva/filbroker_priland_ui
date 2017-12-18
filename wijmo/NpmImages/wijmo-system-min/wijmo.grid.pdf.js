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
System.register(["wijmo/wijmo.pdf","wijmo/wijmo.grid","wijmo/wijmo","wijmo/wijmo.grid.pdf"],function(e,t){"use strict";function o(){var e,t;return(e=window.wijmo)&&(t=e.grid)&&t.multirow}function r(){var e,t;return(e=window.wijmo)&&(t=e.grid)&&t.sheet}function i(){var e;return(e=window.wijmo)&&e.olap}function n(e,t,o){if(void 0===o&&(o=!1),t&&e)for(var r in t){var i=t[r],l=e[r];if(s.isObject(i)){if(void 0===l||!s.isObject(l)&&o){if(s.isFunction(i.clone)){e[r]=l=i.clone();continue}e[r]=l={}}s.isObject(l)&&n(e[r],i,o)}else(void 0===l||o&&void 0!==i)&&(e[r]=i)}return e}var l,a,s,h,d,c,u,g,f,p,w,b,m,_,y,C,R,v,S,x,T=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])};return function(t,o){function r(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}();t&&t.id;return{setters:[function(e){l=e},function(e){a=e},function(e){s=e},function(e){h=e}],execute:function(){window.wijmo=window.wijmo||{},window.wijmo.grid=window.wijmo.grid||{},window.wijmo.grid.pdf=h,function(e){e[e.ActualSize=0]="ActualSize",e[e.PageWidth=1]="PageWidth",e[e.SinglePage=2]="SinglePage"}(d||(d={})),e("ScaleMode",d),function(e){e[e.All=0]="All",e[e.Selection=1]="Selection"}(c||(c={})),e("ExportMode",c),u=function(e){function t(t,o,r,i,n,l,a,h,d){var c=e.call(this,t,o)||this;return c.cancelBorders=!1,c._cell=s.asType(r,HTMLElement,!0),c._canvas=i,c._clientRect=n,c._contentRect=l,c._textTop=a,c._style=h,c._getFormattedCell=d,c}return T(t,e),Object.defineProperty(t.prototype,"canvas",{get:function(){return this._canvas},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"cell",{get:function(){return this._cell},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"clientRect",{get:function(){return this._clientRect},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"contentRect",{get:function(){return this._contentRect},enumerable:!0,configurable:!0}),t.prototype.getFormattedCell=function(){return s.asFunction(this._getFormattedCell)()},Object.defineProperty(t.prototype,"style",{get:function(){return this._style},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"textTop",{get:function(){return this._textTop},enumerable:!0,configurable:!0}),t}(a.CellRangeEventArgs),e("PdfFormatItemEventArgs",u),f=function(){function e(){}return e.draw=function(e,t,o,r,i){s.assert(!!e,"The flex argument cannot be null."),s.assert(!!t,"The doc argument cannot be null.");var a=n({},i);n(a,this.DefaultDrawSettings),a.scaleMode=null==o?d.ActualSize:null==r?d.PageWidth:d.SinglePage;try{a.recalculateStarWidths&&e.columns._updateStarSizes(l.ptToPx(t.width)),this._draw(e,t,null,o,r,a)}finally{a.recalculateStarWidths&&e.invalidate(!0)}},e.drawToPosition=function(e,t,o,r,i,a){s.assert(!!e,"The flex argument cannot be null."),s.assert(!!t,"The doc argument cannot be null."),s.assert(!!o,"The point argument cannot be null.");var h=n({},a);n(h,this.DefaultDrawSettings),h.scaleMode=null==r?d.ActualSize:null==i?d.PageWidth:d.SinglePage;try{h.recalculateStarWidths&&e.columns._updateStarSizes(l.ptToPx(t.width)),this._draw(e,t,o,r,i,h)}finally{h.recalculateStarWidths&&e.invalidate(!0)}},e.export=function(e,t,o){s.assert(!!e,"The flex argument cannot be null."),s.assert(!!t,"The fileName argument cannot be empty."),n(o=n({},o),this.DefaultExportSettings);var r=o.documentOptions.ended;o.documentOptions.ended=function(e,o){r&&!1===r.apply(i,[e,o])||l.saveBlob(o.blob,t)};var i=new l.PdfDocument(o.documentOptions);try{o.recalculateStarWidths&&e.columns._updateStarSizes(l.ptToPx(i.width)),this._draw(e,i,null,null,null,o),i.end()}finally{o.recalculateStarWidths&&e.invalidate(!0)}},e._draw=function(e,t,o,r,i,n){var l=null!=o,h=new s.Size(t.width,t.height);o||(o=new s.Point(0,t.y)),s.isArray(n.embeddedFonts)&&n.embeddedFonts.forEach(function(e){t.registerFont(e)});var d=S.getSelection(e,n.exportMode),c=this._getGridRenderer(e,n,d,this.BorderWidth,!0),u=new s.Rect(o.x||0,o.y||0,r||h.width,i||h.height),f=this._getScaleFactor(c,n.scaleMode,u),p=this._getPages(c,d,u,n,l,f);(g=document.createElement("div")).setAttribute(a.FlexGrid._WJS_MEASURE,"true"),g.style.visibility="hidden",e.hostElement.appendChild(g);try{for(var w=0;w<p.length;w++){w>0&&t.addPage();var b=p[w],m=0===b.pageCol?u.left:0,_=0===b.pageRow?u.top:0;t.saveState(),t.paths.rect(0,0,h.width,h.height).clip(),t.scale(f,f,new s.Point(m,_)),t.translate(m,_);var y=this._getGridRenderer(e,n,b.range,this.BorderWidth,w===p.length-1);y.render(t),t.restoreState(),t.x=m,t.y=_+y.renderSize.height*f}}finally{g&&(g.parentElement.removeChild(g),g=null)}},e._getScaleFactor=function(e,t,o){var r=1;if(t===d.ActualSize)return r;var i=e.renderSize;if(t===d.SinglePage)(n=Math.min(o.width/i.width,o.height/i.height))<1&&(r=n);else{var n=o.width/i.width;n<1&&(r=n)}return r},e._getPages=function(e,t,o,r,i,n){var a=this,s=[],h=[],c=l.pxToPt,u=e.flex,g=e.showColumnHeader,f=e.showRowHeader,p=g?c(u.columnHeaders.height):0,w=f?c(u.rowHeaders.width):0,b=r.scaleMode===d.ActualSize||r.scaleMode===d.PageWidth,m=r.scaleMode===d.ActualSize,y=(o.width-o.left)*(1/n),C=(o.height-o.top)*(1/n),R=o.width*(1/n),v=o.height*(1/n),S=p,T=w,P=i&&r.scaleMode==d.ActualSize;if(b){var z=0;t.forEach(u.cells,function(e,t,o,r){var i=s.length?v:C;if(_.isRenderableRow(e)){var n=c(e.renderHeight);z++,S+=n,(g||z>1)&&(S-=a.BorderWidth),S>i&&(p+n>i||P?(s.push(r),S=p):(s.push(r-1),S=p+n),g&&(S-=a.BorderWidth))}})}var W=t.length()-1;if(W<0&&(W=0),s.length&&s[s.length-1]===W||s.push(W),m)for(var j=0,M=t.leftCol;M<=t.rightCol;M++){var H=u.columns[M];if(H.isVisible){var A=c(H.renderWidth),L=h.length?R:y;j++,T+=A,(f||j>1)&&(T-=this.BorderWidth),T>L&&(w+A>L||P?(h.push(M),T=w):(h.push(M-1),T=w+A),f&&(T-=this.BorderWidth))}}h.length&&h[h.length-1]===t.rightCol||h.push(t.rightCol);for(var B=[],V=!1,O=1,F=i&&r.maxPages>0?1:r.maxPages,M=0;M<s.length&&!V;M++)for(var E=0;E<h.length&&!V;E++,O++)if(!(V=O>F)){var k=0==M?0:s[M-1]+1,D=0==E?t.leftCol:h[E-1]+1;B.push(new x(t.subrange(k,s[M]-k+1,D,h[E]),E,M))}return B},e._getGridRenderer=function(e,t,n,l,a){return new(o()&&e instanceof o().MultiRow&&b||r()&&e instanceof r().FlexSheet&&w||i()&&e instanceof i().PivotGrid&&m||p)(e,t,n,l,a)},e.BorderWidth=1,e.DefaultDrawSettings={maxPages:Number.MAX_VALUE,exportMode:c.All,repeatMergedValuesAcrossPages:!0,recalculateStarWidths:!0,styles:{cellStyle:{font:new l.PdfFont,padding:1.5,verticalAlign:"middle"},headerCellStyle:{font:{weight:"bold"}}}},e.DefaultExportSettings=n({scaleMode:d.PageWidth,documentOptions:{compress:!1,pageSettings:{margins:{left:36,right:36,top:18,bottom:18}}}},e.DefaultDrawSettings),e}(),e("FlexGridPdfConverter",f),p=function(){function e(e,t,o,r,i){this._flex=e,this._borderWidth=r,this._lastPage=i,this._settings=t||{},this._topLeft=new y(this,e.topLeftCells,this.showRowHeader&&this.showColumnHeader?new S(e,[new a.CellRange(0,0,e.topLeftCells.rows.length-1,e.topLeftCells.columns.length-1)]):new S(e,[]),r),this._rowHeader=new y(this,e.rowHeaders,this.showRowHeader?o.clone(0,e.rowHeaders.columns.length-1):new S(e,[]),r),this._columnHeader=new y(this,e.columnHeaders,this.showColumnHeader?new S(e,[new a.CellRange(0,o.leftCol,e.columnHeaders.rows.length-1,o.rightCol)]):new S(e,[]),r),this._cells=new y(this,e.cells,o,r),this._bottomLeft=new y(this,e.bottomLeftCells,this.showRowHeader&&this.showColumnFooter?new S(e,[new a.CellRange(0,0,e.bottomLeftCells.rows.length-1,e.bottomLeftCells.columns.length-1)]):new S(e,[]),r),this._columnFooter=new y(this,e.columnFooters,this.showColumnFooter?new S(e,[new a.CellRange(0,o.leftCol,e.columnFooters.rows.length-1,o.rightCol)]):new S(e,[]),r)}return Object.defineProperty(e.prototype,"settings",{get:function(){return this._settings},enumerable:!0,configurable:!0}),e.prototype.render=function(e){var t=Math.max(0,Math.max(this._topLeft.renderSize.width,this._rowHeader.renderSize.width)-this._borderWidth),o=Math.max(0,Math.max(this._topLeft.renderSize.height,this._columnHeader.renderSize.height)-this._borderWidth);this._topLeft.render(e,0,0),this._rowHeader.render(e,0,o),this._columnHeader.render(e,t,0),this._cells.render(e,t,o),o=Math.max(0,o+this._cells.renderSize.height-this._borderWidth),this._bottomLeft.render(e,0,o),this._columnFooter.render(e,t,o)},Object.defineProperty(e.prototype,"flex",{get:function(){return this._flex},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderSize",{get:function(){var e=Math.max(this._topLeft.renderSize.height,this._columnHeader.renderSize.height)+Math.max(this._rowHeader.renderSize.height,this._cells.renderSize.height)+Math.max(this._bottomLeft.renderSize.height,this._columnFooter.renderSize.height),t=Math.max(this._topLeft.renderSize.width,this._rowHeader.renderSize.width)+Math.max(this._columnHeader.renderSize.width,this._cells.renderSize.width);return this._columnHeader.visibleRows>0&&(e-=this._borderWidth),this._columnFooter.visibleRows>0&&(e-=this._borderWidth),this._rowHeader.visibleColumns>0&&(t-=this._borderWidth),new s.Size(t,e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"showColumnHeader",{get:function(){return!!(this._flex.headersVisibility&a.HeadersVisibility.Column)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"showRowHeader",{get:function(){return!!(this._flex.headersVisibility&a.HeadersVisibility.Row)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"showColumnFooter",{get:function(){return this._lastPage&&this._flex.columnFooters.rows.length>0},enumerable:!0,configurable:!0}),e.prototype.alignMergedTextToTheTopRow=function(e){return!1},e.prototype.getCellValue=function(e,t,o){return e.getCellData(o,t,!0)},e.prototype.getColumn=function(e,t,o){return e.columns[t]},e.prototype.isAlternatingRow=function(e){return e.index%2!=0},e.prototype.isGroupRow=function(e){return e instanceof a.GroupRow&&e.hasChildren},e.prototype.isMergeableCell=function(e,t){return!0},e.prototype.getCellStyle=function(e,t,o){var r=this.settings.styles,i=n({},r.cellStyle),l=this._flex;switch(e.cellType){case a.CellType.Cell:this.isGroupRow(t)?n(i,r.groupCellStyle,!0):this.isAlternatingRow(t)&&n(i,r.altCellStyle,!0);break;case a.CellType.ColumnHeader:case a.CellType.RowHeader:case a.CellType.TopLeft:case a.CellType.BottomLeft:n(i,r.headerCellStyle,!0);break;case a.CellType.ColumnFooter:n(i,r.headerCellStyle,!0),n(i,r.footerCellStyle,!0)}return!this.settings.customCellContent&&l._getShowErrors()&&l._getError(e,t.index,o.index)&&n(i,r.errorCellStyle,!0),i},e}(),w=function(e){function t(t,o,r,i,n){return e.call(this,t,o,r,i,n)||this}return T(t,e),t.prototype.getCellValue=function(t,o,i){return t.cellType===a.CellType.Cell?t.rows[i]instanceof r().HeaderRow?this.flex.columnHeaders.getCellData(i,o,!0):this.flex.getCellValue(i,o,!0):e.prototype.getCellValue.call(this,t,o,i)},t.prototype.getCellStyle=function(t,o,r){var i=e.prototype.getCellStyle.call(this,t,o,r),a=this.flex.selectedSheet.findTable(o.index,r.index);if(a){var s=o.index-a.range.topRow,h=r.index-a.range.leftCol,d=a._getTableCellAppliedStyles(s,h);d&&(Object.keys(d).forEach(function(e){e.toLowerCase().indexOf("color")>=0&&(d[e]=a._getStrColor(d[e]))}),d.font=new l.PdfFont(d.fontFamily,l._asPt(d.fontSize,!0,void 0),d.fontStyle,d.fontWeight)),n(i,d,!0)}return i},Object.defineProperty(t.prototype,"showColumnHeader",{get:function(){return!1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"showRowHeader",{get:function(){return!1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"showColumnFooter",{get:function(){return!1},enumerable:!0,configurable:!0}),t}(p),b=function(e){function t(t,o,r,i,n){return e.call(this,t,o,r,i,n)||this}return T(t,e),t.prototype.getColumn=function(e,t,o){return this.flex.getBindingColumn(e,o,t)},t.prototype.isAlternatingRow=function(t){return t instanceof o()._MultiRow?t.dataIndex%2!=0:e.prototype.isAlternatingRow.call(this,t)},t.prototype.isMergeableCell=function(e,t){return!0},t}(p),m=function(e){function t(t,o,r,i,n){return e.call(this,t,o,r,i,n)||this}return T(t,e),t.prototype.alignMergedTextToTheTopRow=function(e){return!this.flex.centerHeadersVertically&&(e.cellType===a.CellType.ColumnHeader||e.cellType===a.CellType.RowHeader)},t}(p),_=function(){function e(e,t){this._panel=e,this._range=t.clone()}return e.isRenderableRow=function(e){return e.isVisible&&!(e instanceof a._NewRowTemplate)},Object.defineProperty(e.prototype,"visibleRows",{get:function(){var e=this;return null==this._visibleRows&&(this._visibleRows=0,this._range.forEach(this._panel,function(t){e.isRenderableRow(t)&&e._visibleRows++})),this._visibleRows},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"visibleColumns",{get:function(){if(null==this._visibleColumns&&(this._visibleColumns=0,this._range.isValid))for(var e=this._range.leftCol;e<=this._range.rightCol;e++)this._panel.columns[e].isVisible&&this._visibleColumns++;return this._visibleColumns},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"size",{get:function(){if(null==this._size){var e=this._range.getRenderSize(this._panel);this._size=new s.Size(l.pxToPt(e.width),l.pxToPt(e.height))}return this._size},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"range",{get:function(){return this._range},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"panel",{get:function(){return this._panel},enumerable:!0,configurable:!0}),e.prototype.isRenderableRow=function(t){return e.isRenderableRow(t)},e}(),y=function(e){function t(t,o,r,i){var n=e.call(this,o,r)||this;return n._gr=t,n._borderWidth=i,n}return T(t,e),Object.defineProperty(t.prototype,"gr",{get:function(){return this._gr},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"renderSize",{get:function(){return null==this._renderSize&&(this._renderSize=this.size.clone(),this.visibleColumns>1&&(this._renderSize.width-=this._borderWidth*(this.visibleColumns-1)),this.visibleRows>1&&(this._renderSize.height-=this._borderWidth*(this.visibleRows-1))),this._renderSize},enumerable:!0,configurable:!0}),t.prototype.getRangeWidth=function(e,t){for(var o=0,r=0,i=this.panel,n=e;n<=t;n++){var a=i.columns[n];a.isVisible&&(r++,o+=a.renderWidth)}return o=l.pxToPt(o),r>1&&(o-=this._borderWidth*(r-1)),o},t.prototype.getRangeHeight=function(e,t){for(var o=0,r=0,i=this.panel,n=e;n<=t;n++){var a=i.rows[n];this.isRenderableRow(a)&&(r++,o+=a.renderHeight)}return o=l.pxToPt(o),r>1&&(o-=this._borderWidth*(r-1)),o},t.prototype.render=function(e,t,o){var r=this,i=this.range,n=this.panel,l=new R(this._gr.flex),a=new v(n,0,0,0,0),h=new C(this,e,this._borderWidth);if(i.isValid){for(var d={},c=i.leftCol;c<=i.rightCol;c++)d[c]=o;i.forEach(n,function(e,o,c){if(r.isRenderableRow(e))for(var u=t,g=i.leftCol;g<=i.rightCol;g++){var f,p=r.gr.getColumn(n,g,c),w=void 0,b=void 0,m=!1,_=void 0;if(p.isVisible){var y=r._getCellValue(g,c),C=null;if(r.gr.isMergeableCell(p,e)&&(C=l.getMergedRange(n,c,g)))if(a.copyFrom(C),C.topRow!==C.bottomRow)C.firstVisibleRow===c||c===o.topRow?(m=!0,f=r.gr.settings.repeatMergedValuesAcrossPages?y:C.firstVisibleRow===c?y:"",w=r.getRangeHeight(c,Math.min(C.bottomRow,o.bottomRow)),b=r.getRangeWidth(g,g)):b=r.getRangeWidth(g,g);else{m=!0,f=r.gr.settings.repeatMergedValuesAcrossPages?y:g===C.leftCol?y:"",w=r.getRangeHeight(c,c),b=r.getRangeWidth(Math.max(i.leftCol,C.leftCol),Math.min(i.rightCol,C.rightCol)),_=Math.min(i.rightCol,C.rightCol);for(var R=g+1;R<=_;R++)d[R]+=w-r._borderWidth}else a.setRange(c,g,c,g),m=!0,f=y,w=r.getRangeHeight(c,c),b=r.getRangeWidth(g,g);m&&h.renderCell(f,e,p,a,new s.Rect(u,d[g],b,w)),w&&(d[g]+=w-r._borderWidth),b&&(u+=b-r._borderWidth),_&&(g=_)}}})}},t.prototype._getCellValue=function(e,t){var o=this.panel,r=this.gr.getCellValue(o,e,t);if(!r&&o.cellType===a.CellType.Cell){var i=o.rows[t];if(i instanceof a.GroupRow&&i.dataItem&&i.dataItem.groupDescription&&e===o.columns.firstVisibleIndex){var n=i.dataItem.groupDescription.propertyName,l=o.columns.getColumn(n);l&&l.header&&(n=l.header),r=n+": "+i.dataItem.name+" ("+i.dataItem.items.length+" items)"}}return r},t}(_),C=function(){function e(e,t,o){this._pr=e,this._area=t,this._borderWidth=o}return e.prototype.renderCell=function(e,t,o,r,i){var n,h=t.grid,d=this._pr.panel,c=function(){var e=r.topRow,t=r.leftCol,o=d.getCellElement(e,t);return o||(g.innerHTML=g.className=g.style.cssText="",h.cellFactory.updateCell(d,e,t,g)),o||g},f=!!this._pr.gr.settings.customCellContent,p=null,w=this._pr.gr.getCellStyle(d,t,o);if(f&&(p=c()),f&&!(e=p.textContent.trim())&&this._isBooleanCell(o,t,d)&&(e=this._extractCheckboxValue(p)+""),f){var b=function(e){return e.className=e.className.replace("wj-state-selected",""),e.className=e.className.replace("wj-state-multi-selected",""),window.getComputedStyle(e)}(p);w.color=b.color,w.backgroundColor=b.backgroundColor,w.borderColor=b.borderColor||b.borderRightColor||b.borderBottomColor||b.borderLeftColor||b.borderTopColor,w.font=new l.PdfFont(b.fontFamily,l._asPt(b.fontSize,!0,void 0),b.fontStyle,b.fontWeight),w.textAlign=b.textAlign}if(w.boxSizing="border-box",w.borderWidth=this._borderWidth,w.borderStyle="solid",w.textAlign||t instanceof a.GroupRow&&!o.aggregate||(w.textAlign=o.getAlignment()),d.cellType===a.CellType.Cell&&h.rows.maxGroupLevel>=0&&r.leftCol===h.columns.firstVisibleIndex){var m=t instanceof a.GroupRow?Math.max(t.level,0):h.rows.maxGroupLevel+1,_=l._asPt(w.paddingLeft||w.padding),y=l.pxToPt(m*h.treeIndent);w.paddingLeft=_+y}var C,R=this._measureCell(e,o,t,d,w,i),v=r.rowSpan>1&&r.visibleRowsCount>1&&this._pr.gr.alignMergedTextToTheTopRow(d);v&&(C=new s.Rect(R.contentRect.left,R.contentRect.top,R.contentRect.width,R.contentRect.height/(r.visibleRowsCount||1)),R.textRect=this._calculateTextRect(e,o,t,d,C,w)),s.isFunction(this._pr.gr.settings.formatItem)&&((n=new u(d,r,p,this._area,R.rect,R.contentRect,R.textRect.top,w,function(){return p||c()})).data=e,this._pr.gr.settings.formatItem(n),n.data!==e&&(e=s.asString(n.data),R.textRect=this._calculateTextRect(e,o,t,d,v?C:R.contentRect,w))),this._renderCell(e,t,o,r,R,w,!n||!n.cancel,!n||!n.cancelBorders)},e.prototype._renderCell=function(e,t,o,r,i,n,l,a){(l||a)&&(this._isBooleanCellAndValue(e,o,t,this._pr.panel)?this._renderBooleanCell(e,i,n,l,a):this._renderTextCell(e,i,n,l,a))},e.prototype._isBooleanCellAndValue=function(e,t,o,r){return this._isBooleanCell(t,o,r)&&this._isBoolean(e)},e.prototype._isBooleanCell=function(e,t,o){return e.dataType===s.DataType.Boolean&&o.cellType===a.CellType.Cell&&!this._pr.gr.isGroupRow(t)},e.prototype._isBoolean=function(e){var t=s.isString(e)&&e.toLowerCase();return"true"===t||"false"===t||!0===e||!1===e},e.prototype._measureCell=function(e,t,o,r,i,n){this._decompositeStyle(i);var a=n.left,h=n.top,d=n.height,c=n.width,u=this._parseBorder(i),g=u.left.width,f=u.top.width,p=u.bottom.width,w=u.right.width,b=this._parsePadding(i),m=0,_=0,y=0,C=0;if("content-box"===i.boxSizing||void 0===i.boxSizing)m=b.top+d+b.bottom,_=b.left+c+b.right,y=d,C=c;else{if("border-box"!==i.boxSizing)throw"Invalid value: "+i.boxSizing;l._IE&&i instanceof CSSStyleDeclaration?(m=b.top+b.bottom+d,_=b.left+b.right+c):(m=d-f-p,_=c-g-w),y=m-b.top-b.bottom,C=_-b.left-b.right}var n=new s.Rect(a,h,c,d),R=new s.Rect(a+g,h+f,_,m),v=new s.Rect(a+g+b.left,h+f+b.top,C,y);return{rect:n,clientRect:R,contentRect:v,textRect:this._calculateTextRect(e,t,o,r,v,i)}},e.prototype._decompositeStyle=function(e){if(e){var t;(t=e.borderColor)&&(e.borderLeftColor||(e.borderLeftColor=t),e.borderRightColor||(e.borderRightColor=t),e.borderTopColor||(e.borderTopColor=t),e.borderBottomColor||(e.borderBottomColor=t)),(t=e.borderWidth)&&(e.borderLeftWidth||(e.borderLeftWidth=t),e.borderRightWidth||(e.borderRightWidth=t),e.borderTopWidth||(e.borderTopWidth=t),e.borderBottomWidth||(e.borderBottomWidth=t)),(t=e.borderStyle)&&(e.borderLeftStyle||(e.borderLeftStyle=t),e.borderRightStyle||(e.borderRightStyle=t),e.borderTopStyle||(e.borderTopStyle=t),e.borderBottomStyle||(e.borderBottomStyle=t)),(t=e.padding)&&(e.paddingLeft||(e.paddingLeft=t),e.paddingRight||(e.paddingRight=t),e.paddingTop||(e.paddingTop=t),e.paddingBottom||(e.paddingBottom=t))}},e.prototype._parseBorder=function(e){var t={left:{width:0},top:{width:0},bottom:{width:0},right:{width:0}};return"none"!==e.borderLeftStyle&&(t.left={width:l._asPt(e.borderLeftWidth),style:e.borderLeftStyle,color:e.borderLeftColor}),"none"!==e.borderTopStyle&&(t.top={width:l._asPt(e.borderTopWidth),style:e.borderTopStyle,color:e.borderTopColor}),"none"!==e.borderBottomStyle&&(t.bottom={width:l._asPt(e.borderBottomWidth),style:e.borderBottomStyle,color:e.borderBottomColor}),"none"!==e.borderRightStyle&&(t.right={width:l._asPt(e.borderRightWidth),style:e.borderRightStyle,color:e.borderRightColor}),t},e.prototype._parsePadding=function(e){return{left:l._asPt(e.paddingLeft),top:l._asPt(e.paddingTop),bottom:l._asPt(e.paddingBottom),right:l._asPt(e.paddingRight)}},e.prototype._renderEmptyCell=function(e,t,o,r){var i=e.rect.left,n=e.rect.top,a=e.clientRect.width,s=e.clientRect.height,h=e.clientRect.left-e.rect.left,d=e.clientRect.top-e.rect.top,c=e.rect.top+e.rect.height-(e.clientRect.top+e.clientRect.height),u=e.rect.left+e.rect.width-(e.clientRect.left+e.clientRect.width);if(r&&(h||u||c||d)){var g=t.borderLeftColor||t.borderColor,f=t.borderRightColor||t.borderColor,p=t.borderTopColor||t.borderColor,w=t.borderBottomColor||t.borderColor;if(h&&d&&c&&u&&h===u&&h===c&&h===d&&g===f&&g===w&&g===p){var b=h,m=b/2;this._area.paths.rect(i+m,n+m,a+b,s+b).stroke(new l.PdfPen(g,b))}else h&&this._area.paths.polygon([[i,n],[i+h,n+d],[i+h,n+d+s],[i,n+d+s+c]]).fill(g),d&&this._area.paths.polygon([[i,n],[i+h,n+d],[i+h+a,n+d],[i+h+a+u,n]]).fill(p),u&&this._area.paths.polygon([[i+h+a+u,n],[i+h+a,n+d],[i+h+a,n+d+s],[i+h+a+u,n+d+s+c]]).fill(f),c&&this._area.paths.polygon([[i,n+d+s+c],[i+h,n+d+s],[i+h+a,n+d+s],[i+h+a+u,n+d+s+c]]).fill(w)}o&&t.backgroundColor&&a>0&&s>0&&this._area.paths.rect(i+h,n+d,a,s).fill(t.backgroundColor)},e.prototype._renderBooleanCell=function(e,t,o,r,i){if(this._renderEmptyCell(t,o,r,i),r){var n=t.textRect.left,a=t.textRect.top,h=t.textRect.height;if(this._area.paths.rect(n,a,h,h).fillAndStroke(s.Color.fromRgba(255,255,255),new l.PdfPen(void 0,.5)),!0===s.changeType(e,s.DataType.Boolean,"")){var d=h/20,c=h-.5-2*d,u=h/8;this._area._pdfdoc.saveState(),this._area.translate(n+.25+d,a+.25+d).paths.moveTo(u/2,.6*c).lineTo(c-.6*c,c-u).lineTo(c-u/2,u/2).stroke(new l.PdfPen(void 0,u)),this._area._pdfdoc.restoreState()}}},e.prototype._renderTextCell=function(e,t,o,r,i){this._renderEmptyCell(t,o,r,i),r&&e&&this._area.drawText(e,t.textRect.left,t.textRect.top,{brush:o.color,font:o.font,height:t.textRect.height,width:t.textRect.width,align:"center"===o.textAlign?l.PdfTextHorizontalAlign.Center:"right"===o.textAlign?l.PdfTextHorizontalAlign.Right:"justify"===o.textAlign?l.PdfTextHorizontalAlign.Justify:l.PdfTextHorizontalAlign.Left})},e.prototype._calculateTextRect=function(e,t,o,r,i,n){var l=i.clone();if(this._isBooleanCellAndValue(e,t,o,r)){var a=this._getTextLineHeight(n.font);switch(n.verticalAlign){case"middle":l.top=i.top+i.height/2-a/2;break;case"bottom":l.top=i.top+i.height-a}switch(n.textAlign){case"justify":case"center":l.left=i.left+i.width/2-a/2;break;case"right":l.left=i.left+i.width-a}l.height=l.width=a}else if(l.height>0&&l.width>0){switch(n.verticalAlign){case"bottom":(s=this._area.measureText(e,n.font,{height:l.height,width:l.width})).size.height<l.height&&(l.top+=l.height-s.size.height,l.height=s.size.height);break;case"middle":var s=this._area.measureText(e,n.font,{height:l.height,width:l.width});s.size.height<l.height&&(l.top+=l.height/2-s.size.height/2,l.height=s.size.height)}t.wordWrap||(l.height=this._getTextLineHeight(n.font))}return l},e.prototype._extractCheckboxValue=function(e){var t=e.querySelector("input.wj-cell-check[type=checkbox]");if(t){var o=window.getComputedStyle(t);if("none"!==o.display&&"hidden"!==o.visibility)return t.checked}},e.prototype._getTextLineHeight=function(e){return this._area.lineHeight(e)},e}(),R=function(){function e(e){this._columns={},this._flex=e}return e.prototype.getMergedRange=function(e,t,o){var r=this._columns[o];if(r&&t>=r.topRow&&t<=r.bottomRow)return r;var i=this._flex.getMergedRange(e,t,o,!1);return this._columns[o]=i?new v(e,i):null},e}(),v=function(e){function t(t,o,r,i,n){var l=this;(l=o instanceof a.CellRange?e.call(this,o.row,o.col,o.row2,o.col2)||this:e.call(this,o,r,i,n)||this).firstVisibleRow=-1,l.visibleRowsCount=0;var s=l.topRow,h=l.bottomRow,d=t.rows.length;if(d>0)for(var c=s;c<=h&&c<d;c++)t.rows[c].isVisible&&(l.firstVisibleRow<0&&(l.firstVisibleRow=c),l.visibleRowsCount++);return l}return T(t,e),t.prototype.copyFrom=function(e){this.setRange(e.row,e.col,e.row2,e.col2),this.firstVisibleRow=e.firstVisibleRow,this.visibleRowsCount=e.visibleRowsCount},t}(a.CellRange),S=function(){function e(e,t){this._flex=e,this._ranges=t||[]}return e.getSelection=function(t,o){var r=[];if(o===c.All)r.push(new a.CellRange(0,0,t.rows.length-1,t.columns.length-1));else{var i=t.selection;switch(t.selectionMode){case a.SelectionMode.None:break;case a.SelectionMode.Cell:case a.SelectionMode.CellRange:r.push(i);break;case a.SelectionMode.Row:r.push(new a.CellRange(i.topRow,0,i.topRow,t.cells.columns.length-1));break;case a.SelectionMode.RowRange:r.push(new a.CellRange(i.topRow,0,i.bottomRow,t.cells.columns.length-1));break;case a.SelectionMode.ListBox:for(var n=-1,l=0;l<t.rows.length;l++)t.rows[l].isSelected?(n<0&&(n=l),l===t.rows.length-1&&r.push(new a.CellRange(n,0,l,t.cells.columns.length-1))):(n>=0&&r.push(new a.CellRange(n,0,l-1,t.cells.columns.length-1)),n=-1)}}return new e(t,r)},e.prototype.length=function(){for(var e=0,t=0;t<this._ranges.length;t++){var o=this._ranges[t];o.isValid&&(e+=o.bottomRow-o.topRow+1)}return e},Object.defineProperty(e.prototype,"isValid",{get:function(){return this._ranges.length&&this._ranges[0].isValid},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"leftCol",{get:function(){return this._ranges.length?this._ranges[0].leftCol:-1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"rightCol",{get:function(){return this._ranges.length?this._ranges[0].rightCol:-1},enumerable:!0,configurable:!0}),e.prototype.clone=function(t,o){for(var r=[],i=0;i<this._ranges.length;i++){var n=this._ranges[i].clone();arguments.length>0&&(n.col=t),arguments.length>1&&(n.col2=o),r.push(n)}return new e(this._flex,r)},e.prototype.getRenderSize=function(e){for(var t=new s.Size(0,0),o=0;o<this._ranges.length;o++){var r=this._ranges[o].getRenderSize(e);t.width=Math.max(t.width,r.width),t.height+=r.height}return t},e.prototype.forEach=function(e,t){for(var o=0,r=0;r<this._ranges.length;r++){var i=this._ranges[r];if(i.isValid)for(var n=i.topRow;n<=i.bottomRow;n++)t(e.rows[n],i,n,o++)}},e.prototype.subrange=function(t,o,r,i){var n=[];if(t>=0&&o>0)for(var l=0,s=0,h=0;h<this._ranges.length&&o>0;h++,l=s+1){var d=this._ranges[h];if(s=l+(d.bottomRow-d.topRow),!(t>s)){var c=t>l?d.topRow+(t-l):d.topRow,u=Math.min(d.bottomRow,c+o-1),g=arguments.length>2?r:d.leftCol,f=arguments.length>2?i:d.rightCol;n.push(new a.CellRange(c,g,u,f)),o-=u-c+1}}return new e(this._flex,n)},e}(),x=function(){function e(e,t,o){this._col=t,this._row=o,this._range=e}return Object.defineProperty(e.prototype,"range",{get:function(){return this._range},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pageCol",{get:function(){return this._col},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pageRow",{get:function(){return this._row},enumerable:!0,configurable:!0}),e}()}}});