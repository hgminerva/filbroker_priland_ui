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
var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var l in o)o.hasOwnProperty(l)&&(e[l]=o[l])};return function(o,l){function r(){this.constructor=o}e(o,l),o.prototype=null===l?Object.create(l):(r.prototype=l.prototype,new r)}}();define(["require","exports","wijmo/wijmo.grid","wijmo/wijmo.xlsx","wijmo/wijmo","wijmo/wijmo.grid.xlsx"],function(e,o,l,r,t,n){"use strict";function s(){var e,o;return(e=window.wijmo)&&(o=e.grid)&&o.detail}function a(){var e,o;return(e=window.wijmo)&&(o=e.grid)&&o.multirow}Object.defineProperty(o,"__esModule",{value:!0}),window.wijmo=window.wijmo||{},window.wijmo.grid=window.wijmo.grid||{},window.wijmo.grid.xlsx=n;var i=function(){function e(){}return e.save=function(e,o,l){var r=this._saveFlexGridToWorkbook(e,o);return l&&r.save(l),r},e.saveAsync=function(e,o,l,r,t){var n=this._saveFlexGridToWorkbook(e,o);return n.saveAsync(l,r,t),n},e.load=function(e,o,l){var n=this;if(o instanceof Blob){var s=new FileReader;s.onload=function(){var o=r.Workbook._base64EncArr(new Uint8Array(s.result)),t=new r.Workbook;t.load(o),o=null,e.deferUpdate(function(){n._loadToFlexGrid(e,t,l),t=null})},s.readAsArrayBuffer(o)}else if(o instanceof r.Workbook)e.deferUpdate(function(){n._loadToFlexGrid(e,o,l),o=null});else{if(o instanceof ArrayBuffer)o=r.Workbook._base64EncArr(new Uint8Array(o));else if(!t.isString(o))throw"Invalid workbook.";var a=new r.Workbook;a.load(o),o=null,e.deferUpdate(function(){n._loadToFlexGrid(e,a,l),a=null})}},e.loadAsync=function(e,o,l,n,s){var a=this;if(o instanceof Blob){var i=new FileReader;i.onload=function(){var o=r.Workbook._base64EncArr(new Uint8Array(i.result)),t=new r.Workbook;t.loadAsync(o,function(r){o=null,t=null,e.deferUpdate(function(){a._loadToFlexGrid(e,r,l),n&&n(r),r=null})},s)},i.readAsArrayBuffer(o)}else if(o instanceof r.Workbook)e.deferUpdate(function(){a._loadToFlexGrid(e,o,l),n&&n(o),o=null});else{if(o instanceof ArrayBuffer)o=r.Workbook._base64EncArr(new Uint8Array(o));else if(!t.isString(o))throw"Invalid workbook.";(new r.Workbook).loadAsync(o,function(r){o=null,e.deferUpdate(function(){a._loadToFlexGrid(e,r,l),n&&n(r),r=null})},s)}},e._saveFlexGridToWorkbook=function(e,o){var n,s,a,i,d,u,c,f,h,m,p,w,g,b=new r.Workbook,y=new r.WorkSheet,_=(new r.WorkbookStyle,new r.WorkbookFrozenPane),v=!o||null==o.includeColumnHeaders||o.includeColumnHeaders,k=!(!o||null==o.includeRowHeaders)&&o.includeRowHeaders,C=!o||null==o.includeCellStyles||o.includeCellStyles,S=o?o.activeWorksheet:null,x=o?o.includeColumns:null,W=o?o.formatItem:null,A=0,R=0,T=0,N=0;if(m=e.wj_sheetInfo,y.name=o?o.sheetName:"",y.visible=!o||!1!==o.sheetVisible,m&&m.tableNames&&m.tableNames.length>0)for(var B=0;B<m.tableNames.length;B++)y.tableNames.push(m.tableNames[B]);if(u=[],m||!C&&!W||((p=document.createElement("div")).style.visibility="hidden",p.setAttribute(l.FlexGrid._WJS_MEASURE,"true"),e.hostElement.appendChild(p)),k){for(f=0,c=0;c<e.rowHeaders.rows.length;c++)if(!(e.rowHeaders.rows[c].renderSize<=0)){for(u[f]=[],h=0;h<e.rowHeaders.columns.length;h++)a=e._getBindingColumn(e.rowHeaders,c,e.rowHeaders.columns[h]),i=this._getColumnSetting(a,e.columnHeaders.columns.defaultSize),u[f][h]=i,0===f&&((d=new r.WorkbookColumn)._deserialize(i),y._addWorkbookColumn(d,h));f++}N=h}if(v&&e.columnHeaders.rows.length>0){for(f=0,c=0;c<e.columnHeaders.rows.length;c++)if(!(e.columnHeaders.rows[c].renderSize<=0)){for(u[f]||(u[f]=[]),h=0;h<e.columnHeaders.columns.length;h++)a=e._getBindingColumn(e.columnHeaders,c,e.columnHeaders.columns[h]),i=this._getColumnSetting(a,e.columnHeaders.columns.defaultSize),u[f][N+h]=i,0===f&&(x&&!x(a)||((d=new r.WorkbookColumn)._deserialize(i),y._addWorkbookColumn(d)));N=0,n={},s=new r.WorkbookRow,k&&(N=this._parseFlexGridRowToSheetRow(e.topLeftCells,n,c,0,u,C,p,!1,0,x,W)),this._parseFlexGridRowToSheetRow(e.columnHeaders,n,c,N,u,C,p,!1,0,x,W),n.cells.length>0&&(s._deserialize(n),y._addWorkbookRow(s,f)),f++}R=f}else for(u[0]||(u[0]=[]),h=0;h<e.columnHeaders.columns.length;h++)a=e._getBindingColumn(e.columnHeaders,0,e.columnHeaders.columns[h]),i=this._getColumnSetting(a,e.columnHeaders.columns.defaultSize),u[0][N+h]=i,x&&!x(a)||((d=new r.WorkbookColumn)._deserialize(i),y._addWorkbookColumn(d));for(c=0;c<e.cells.rows.length;c++)N=0,n={},s=new r.WorkbookRow,(w=e.rows[c])instanceof l._NewRowTemplate||((g=w instanceof l.GroupRow)?A=t.tryCast(w,l.GroupRow).level:e.rows.maxGroupLevel>-1&&(A=e.rows.maxGroupLevel+1),k&&(N=this._parseFlexGridRowToSheetRow(e.rowHeaders,n,c,0,u,C,p,g,A,x,W)),this._parseFlexGridRowToSheetRow(e.cells,n,c,N,u,C,p,g,A,x,W),n.cells.length>0&&(s._deserialize(n),y._addWorkbookRow(s,R+c)));for(T=e.cells.rows.length,c=0;c<e.columnFooters.rows.length;c++)N=0,n={},s=new r.WorkbookRow,g=(w=e.columnFooters.rows[c])instanceof l.GroupRow,k&&(N=this._parseFlexGridRowToSheetRow(e.rowHeaders,n,c,0,u,C,p,g,0,x,W)),this._parseFlexGridRowToSheetRow(e.columnFooters,n,c,N,u,C,p,g,0,x,W),n.cells.length>0&&(s._deserialize(n),y._addWorkbookRow(s,R+T+c));return _.rows=v?e.frozenRows+R:e.frozenRows,_.columns=k?e.frozenColumns+N:e.frozenColumns,y.frozenPane=_,b._addWorkSheet(y),m||!C&&!W||e.hostElement.removeChild(p),b.activeWorksheet=S,b},e._loadToFlexGrid=function(e,o,n){var s,a,i,d,u,c,f,h,m,p,w,g,b,y,_,v,k,C,S,x,W,A,R,T,N,B,H,F,D,E,I,j,z,G=!n||null==n.includeColumnHeaders||n.includeColumnHeaders,L=!n||null==n.includeColumnHeaders||n.includeColumnHeaders,O=n&&null!=n.sheetIndex&&!isNaN(n.sheetIndex)?n.sheetIndex:0,M=n?n.sheetName:null,P=!n||n.sheetVisible,V=null!=e.wj_sheetInfo,U=0,X=0,q=!1,$={};if(e.itemsSource=null,e.columns.clear(),e.rows.clear(),e.frozenColumns=0,e.frozenRows=0,H={},F={},X=0,d=[],D=[],O<0||O>=o.sheets.length)throw"The sheet index option is out of the sheet range of current workbook.";if(null!=M)for(s=0;s<o.sheets.length;s++)if(M===o.sheets[s].name){g=o.sheets[s];break}if(null!=(g=g||o.sheets[O]).rows){for(G&&(X=1,g.rows.length<=1&&(L=!1,X=0),h=g.rows[0]),y=this._getColumnCount(g.rows),b=this._getRowCount(g.rows,y),S=g.summaryBelow,i=g.columns,U=0;U<y;U++)e.columns.push(new l.Column),i[U]&&(isNaN(+i[U].width)||(e.columns[U].width=+i[U].width),i[U].visible||void 0==i[U].visible||(e.columns[U].visible=!!i[U].visible),i[U].style&&i[U].style.wordWrap&&(e.columns[U].wordWrap=i[U].style.wordWrap));for(;X<b;X++){if(_=!1,z=null,w=g.rows[X])for(k=X+1;k<g.rows.length;){if(C=g.rows[k]){(isNaN(w.groupLevel)&&!isNaN(C.groupLevel)||!isNaN(w.groupLevel)&&w.groupLevel<C.groupLevel)&&(_=!0);break}k++}for(_&&!S?(W&&(W.isCollapsed=q),(W=new l.GroupRow).isReadOnly=!1,q=null!=w.collapsed&&w.collapsed,W.level=isNaN(w.groupLevel)?0:w.groupLevel,$[W.level]=q,this._checkParentCollapsed($,W.level)&&W._setFlag(l.RowColFlags.ParentCollapsed,!0),e.rows.push(W)):(x=new l.Row,w&&this._checkParentCollapsed($,w.groupLevel)&&x._setFlag(l.RowColFlags.ParentCollapsed,!0),e.rows.push(x)),w&&w.height&&!isNaN(w.height)&&(e.rows[L?X-1:X].height=w.height),U=0;U<y;U++)if(w){if(v=w.cells[U],(T=v?v.formula:void 0)&&"="!==T[0]&&(T="="+T),e.setCellData(L?X-1:X,U,T&&V?T:this._getItemValue(v)),_||this._setColumn(d,U,v),N=X*y+U,B=v?v.style:void 0,E=r.Workbook._parseExcelFormat(v),B){if(z=null==z?!!B.wordWrap:z&&!!B.wordWrap,I=this._getItemType(v),B.hAlign)j=r.Workbook._parseHAlignToString(t.asEnum(B.hAlign,r.HAlign));else switch(I){case t.DataType.Number:j="right";break;case t.DataType.Boolean:j="center";break;default:j=E&&0===E.search(/[n,c,p]/i)?"right":"left"}H[N]={fontWeight:B.font&&B.font.bold?"bold":"none",fontStyle:B.font&&B.font.italic?"italic":"none",textDecoration:B.font&&B.font.underline?"underline":"none",textAlign:j,fontFamily:B.font&&B.font.family?B.font.family:"",fontSize:B.font&&B.font.size?B.font.size+"px":"",color:B.font&&B.font.color?B.font.color:"",backgroundColor:B.fill&&B.fill.color?B.fill.color:"",whiteSpace:B.wordWrap?"pre-wrap":"normal",format:E},B.borders&&(B.borders.left&&(this._parseBorderStyle(B.borders.left.style,"Left",H[N]),H[N].borderLeftColor=B.borders.left.color),B.borders.right&&(this._parseBorderStyle(B.borders.right.style,"Right",H[N]),H[N].borderRightColor=B.borders.right.color),B.borders.top&&(this._parseBorderStyle(B.borders.top.style,"Top",H[N]),H[N].borderTopColor=B.borders.top.color),B.borders.bottom&&(this._parseBorderStyle(B.borders.bottom.style,"Bottom",H[N]),H[N].borderBottomColor=B.borders.bottom.color)),B.font&&-1===D.indexOf(B.font.family)&&D.push(B.font.family)}if(v&&t.isNumber(v.rowSpan)&&v.rowSpan>0&&t.isNumber(v.colSpan)&&v.colSpan>0&&(v.rowSpan>1||v.colSpan>1))for(s=X;s<X+v.rowSpan;s++)for(a=U;a<U+v.colSpan;a++)F[N=s*y+a]=new l.CellRange(X,U,X+v.rowSpan-1,U+v.colSpan-1)}else e.setCellData(L?X-1:X,U,""),this._setColumn(d,U,void 0);w&&(this._checkParentCollapsed($,w.groupLevel)||w.visible||void 0==w.visible||(e.rows[L?X-1:X].visible=w.visible),e.rows[L?X-1:X].wordWrap=!!w.style&&!!w.style.wordWrap||!!z)}for(W&&(W.isCollapsed=q),g.frozenPane&&(A=g.frozenPane.columns,t.isNumber(A)&&!isNaN(A)&&(e.frozenColumns=A),R=g.frozenPane.rows,t.isNumber(R)&&!isNaN(R)&&(e.frozenRows=L&&R>0?R-1:R)),U=0;U<e.columnHeaders.columns.length;U++)u=d[U],(c=e.columns[U]).isRequired=!1,L&&(m=h?h.cells[U]:void 0)&&m.value?(p=r.Workbook._parseExcelFormat(m),f=t.Globalize.format(m.value,p)):f=this._numAlpha(U),c.header=f,u&&(u.dataType===t.DataType.Boolean&&(c.dataType=u.dataType),c.format=u.format,c.align=u.hAlign,c.wordWrap=c.wordWrap||!!u.wordWrap);V&&(e.wj_sheetInfo.name=g.name,e.wj_sheetInfo.visible=!0===P||!1!==g.visible,e.wj_sheetInfo.styledCells=H,e.wj_sheetInfo.mergedRanges=F,e.wj_sheetInfo.fonts=D,e.wj_sheetInfo.tableNames=g.tableNames)}},e._parseFlexGridRowToSheetRow=function(e,o,n,i,u,c,f,h,m,p,w){var g,b,y,_,v,k,C,S,x,W,A,R,T,N,B,H,F,D,E,I,j,z,G,L,O,M,P,V=!1;for(F=(g=e.grid).wj_sheetInfo,j=null!=(b=e.rows[n]).recordIndex?b.recordIndex:0,o.cells||(o.cells=[]),o.visible=b.isVisible,o.height=b.renderHeight||e.rows.defaultSize,o.groupLevel=m,h&&(o.collapsed=b.isCollapsed),b.wordWrap&&(o.style={wordWrap:b.wordWrap}),(b.constructor===l.Row||b.constructor===l._NewRowTemplate||s()&&b.constructor===s().DetailRow||a()&&b.constructor===a()._MultiRow)&&(V=!0),_=0;_<e.columns.length;_++)if(v=null,H=1,B=1,P=0,I=!1,T=null,O=null,E=g._getBindingColumn(e,n,e.columns[_]),N=null,F&&e===g.cells?(R=n*e.columns.length+_,F.mergedRanges&&(N=F.mergedRanges[R]),F.styledCells&&(T=F.styledCells[R])):c&&(L=f.cloneNode(),e.hostElement.children.length>0?e.hostElement.children[0].appendChild(L):e.hostElement.appendChild(L),T=(N=g.getMergedRange(e,n,_,!1))?this._getCellStyle(e,L,N.bottomRow,N.rightCol)||{}:this._getCellStyle(e,L,n,_)||{}),N||(N=g.getMergedRange(e,n,_,!1)),N?n===N.topRow&&_===N.leftCol&&(B=N.bottomRow-N.topRow+1,H=this._getColSpan(e,N,p),I=!0):I=!0,!p||p(E)){if(y=u[j][_+i],V||h?(C=I?e.getCellData(n,_,!0):null,S=I?e.getCellData(n,_,!1):null,W=!1,C&&t.isString(C)&&C.length>1&&"="===C[0]&&(W=!0),D=t.isDate(S),T&&T.format?(v=T.format,k=r.Workbook._parseCellFormat(T.format,D)):y&&y.style&&y.style.format?(v=E.format,k=y.style.format):k=null,k||(D?k="m/d/yyyy":t.isNumber(S)&&!E.dataMap?k=t.isInt(S)?"#,##0":"#,##0.00":W?(A=C.toLowerCase()).indexOf("now()")>-1?(k="m/d/yyyy h:mm",D=!0):A.indexOf("today()")>-1||A.indexOf("date(")>-1?(k="m/d/yyyy",D=!0):A.indexOf("time(")>-1&&(k="h:mm AM/PM",D=!0):k="General")):(C=I?g.columnHeaders.getCellData(0,_,!0):null,k="General"),O=this._parseCellStyle(T)||{},e===g.cells&&h&&b.hasChildren&&_===g.columns.firstVisibleIndex){if(C?x=C:I&&(x=b.getGroupHeader().replace(/<\/?\w+>/g,"")),null==x&&!T)continue;!(D=t.isDate(x))&&v&&"d"===v.toLowerCase()&&t.isInt(x)&&(k="0"),x="string"==typeof x?r.Workbook._unescapeXML(x):x,_===g.columns.firstVisibleIndex&&g.treeIndent&&(P=m),z={value:x,isDate:D,formula:W?this._parseToExcelFormula(C,D):null,colSpan:H,rowSpan:B,style:this._extend(O,{format:k,font:{bold:!0},hAlign:r.HAlign.Left,indent:P})}}else C="string"==typeof C?r.Workbook._unescapeXML(C):C,S="string"==typeof S?r.Workbook._unescapeXML(S):S,!D&&v&&"d"===v.toLowerCase()&&t.isInt(S)&&(k="0"),M=O&&O.hAlign?O.hAlign:y&&y.style&&null!=y.style.hAlign?t.asEnum(y.style.hAlign,r.HAlign,!0):t.isDate(S)?r.HAlign.Left:r.HAlign.General,_!==g.columns.firstVisibleIndex||!g.treeIndent||M!==r.HAlign.Left&&M!==r.HAlign.General||(P=m),z={value:W?null:"General"===k?t.isString(C)?C.replace(/^(\')(\s*=)/,"$2"):C:S,isDate:D,formula:W?this._parseToExcelFormula(C,D):null,colSpan:_<g.columns.firstVisibleIndex?1:H,rowSpan:B,style:this._extend(O,{format:k,hAlign:M,vAlign:B>1?e===g.cells||!1===g.centerHeadersVertically?r.VAlign.Top:r.VAlign.Center:null,indent:P})};w&&(w(G=new d(e,new l.CellRange(n,_),L,f,z)),L=G.cell),L&&(L.parentElement.removeChild(L),L=null),o.cells.push(z)}return i+_},e._parseCellStyle=function(e,o){if(void 0===o&&(o=!1),null==e)return null;var l=e.fontSize;l=l?+l.substring(0,l.indexOf("px")):null,isNaN(l)&&(l=null);var t=e.fontWeight;t="bold"===t||+t>=700;var n="italic"===e.fontStyle,s=e.textDecorationStyle;null==s&&(s=e.textDecoration),s="underline"===s;var a=e.whiteSpace;return a=!!a&&a.indexOf("pre")>-1,{font:{bold:t,italic:n,underline:s,family:this._parseToExcelFontFamily(e.fontFamily),size:l,color:e.color},fill:{color:e.backgroundColor},borders:this._parseBorder(e,o),hAlign:r.Workbook._parseStringToHAlign(e.textAlign),wordWrap:a}},e._parseBorder=function(e,o){var l={};return l.left=this._parseEgdeBorder(e,"Left"),l.right=this._parseEgdeBorder(e,"Right"),l.top=this._parseEgdeBorder(e,"Top"),l.bottom=this._parseEgdeBorder(e,"Bottom"),o&&(l.vertical=this._parseEgdeBorder(e,"Vertical"),l.horizontal=this._parseEgdeBorder(e,"Horizontal")),l},e._parseEgdeBorder=function(e,o){var l,t=e["border"+o+"Style"],n=e["border"+o+"Width"];if(n&&n.length>2&&(n=+n.substring(0,n.length-2)),t&&"none"!==t&&"hidden"!==t){switch(l={},t=t.toLowerCase()){case"dotted":l.style=n>1?r.BorderStyle.MediumDashDotted:r.BorderStyle.Dotted;break;case"dashed":l.style=n>1?r.BorderStyle.MediumDashed:r.BorderStyle.Dashed;break;case"double":l.style=r.BorderStyle.Double;break;default:l.style=n>2?r.BorderStyle.Thick:n>1?r.BorderStyle.Medium:r.BorderStyle.Thin}l.color=e["border"+o+"Color"]}return l},e._parseBorderStyle=function(e,o,l){var t="border"+o+"Style",n="border"+o+"Width";switch(e){case r.BorderStyle.Dotted:case r.BorderStyle.Hair:l[t]="dotted",l[n]="1px";break;case r.BorderStyle.Dashed:case r.BorderStyle.ThinDashDotDotted:case r.BorderStyle.ThinDashDotted:l[t]="dashed",l[n]="1px";break;case r.BorderStyle.MediumDashed:case r.BorderStyle.MediumDashDotDotted:case r.BorderStyle.MediumDashDotted:case r.BorderStyle.SlantedMediumDashDotted:l[t]="dashed",l[n]="2px";break;case r.BorderStyle.Double:l[t]="double",l[n]="3px";break;case r.BorderStyle.Medium:l[t]="solid",l[n]="2px";break;default:l[t]="solid",l[n]="1px"}},e._parseToExcelFontFamily=function(e){var o;return e&&(o=e.split(","))&&o.length>0&&(e=o[0].replace(/\"|\'/g,"")),e},e._parseToExcelFormula=function(e,o){var l,t,n,s,a,i,d,u=/(floor|ceiling)\([+-]?\d+\.?\d*\)/gi,c=/text\(\"?\w+\"?\s*\,\s*\"\w+\"\)/gi,f=/\"?\w+\"?\s*\,\s*\"(\w+)\"/i;if(l=e.match(u))for(a=0;a<l.length;a++)d=(i=l[a]).substring(0,i.lastIndexOf(")"))+", 1)",e=e.replace(i,d);if(l=null,l=e.match(c))for(a=0;a<l.length;a++)(t=(i=l[a]).match(f))&&2===t.length&&(n=t[1],/^d{1,4}?$/.test(n)||(s=r.Workbook._parseCellFormat(n,o),d=i.replace(n,s),e=e.replace(i,d)));return e},e._getColumnSetting=function(e,o){var l=e.renderWidth;return l=l||o,{autoWidth:!0,width:l,visible:e.visible,style:{format:e.format?r.Workbook._parseCellFormat(e.format,e.dataType===t.DataType.Date):"",hAlign:r.Workbook._parseStringToHAlign(this._toExcelHAlign(e.getAlignment())),wordWrap:e.wordWrap}}},e._toExcelHAlign=function(e){return(e=e?e.trim().toLowerCase():e)?e.indexOf("center")>-1?"center":e.indexOf("right")>-1||e.indexOf("end")>-1?"right":e.indexOf("justify")>-1?"justify":"left":e},e._getColumnCount=function(e){for(var o,l=0,r=0,n=0;n<e.length;n++)(o=e[n]&&e[n].cells?e[n].cells:[])&&o.length>0&&(r=o.length,t.isInt(o[r-1].colSpan)&&o[r-1].colSpan>1&&(r=r+o[r-1].colSpan-1),r>l&&(l=r));return l},e._getRowCount=function(e,o){for(var l,r,n,s=e.length,a=s-1,i=0;i<o;i++)e:for(;a>=0;a--)if(l=e[a],r=l&&l.cells?l.cells:[],(n=r[i])&&(null!=n.value&&""!==n.value||t.isInt(n.rowSpan)&&n.rowSpan>1)){t.isInt(n.rowSpan)&&n.rowSpan>1&&a+n.rowSpan>s&&(s=a+n.rowSpan);break e}return s},e._numAlpha=function(e){var o=Math.floor(e/26)-1;return(o>-1?this._numAlpha(o):"")+String.fromCharCode(65+e%26)},e._getItemType=function(e){if(void 0!==e&&null!==e&&void 0!==e.value&&null!==e.value&&!isNaN(e.value))return t.getType(e.value)},e._setColumn=function(e,o,l){var n,s,a,i=e[o];i?(n=this._getItemType(l),i.dataType!==n&&i.dataType===t.DataType.Boolean&&n!==t.DataType.Boolean&&(i.dataType=n),l&&null!=l.value&&""!==l.value&&(s=r.Workbook._parseExcelFormat(l))&&i.format!==s&&"General"!==s&&(i.format=s),l&&l.style&&(l.style.hAlign&&(a=r.Workbook._parseHAlignToString(t.asEnum(l.style.hAlign,r.HAlign))),null==i.wordWrap?i.wordWrap=!!l.style.wordWrap:i.wordWrap=i.wordWrap&&!!l.style.wordWrap),a||n!==t.DataType.Number||(a="right"),i.hAlign=a):e[o]={dataType:this._getItemType(l),format:r.Workbook._parseExcelFormat(l),hAlign:"",wordWrap:null}},e._getItemValue=function(e){if(void 0!==e&&null!==e&&void 0!==e.value&&null!==e.value){var o=e.value;return t.isNumber(o)&&isNaN(o)?"":o instanceof Date&&isNaN(o.getTime())?"":o}},e._getCellStyle=function(e,o,l,r){try{e.grid.cellFactory.updateCell(e,l,r,o),o.className=o.className.replace("wj-state-selected",""),o.className=o.className.replace("wj-state-multi-selected","")}catch(e){return null}return window.getComputedStyle(o)},e._extend=function(e,o){for(var l in o){var r=o[l];t.isObject(r)&&e[l]?t.copy(e[l],r):e[l]=r}return e},e._checkParentCollapsed=function(e,o){var l=!1;return Object.keys(e).forEach(function(r){!0===e[r]&&!1===l&&!isNaN(o)&&+r<o&&(l=!0)}),l},e._getColSpan=function(e,o,l){for(var r=0,t=o.leftCol;t<=o.rightCol;t++)l&&!l(e.columns[t])||r++;return r},e}();o.FlexGridXlsxConverter=i;var d=function(e){function o(o,l,r,t,n){var s=e.call(this,o,l)||this;return s._cell=r,s._patternCell=t,s._xlsxCell=n,s}return __extends(o,e),Object.defineProperty(o.prototype,"cell",{get:function(){return this._cell},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"xlsxCell",{get:function(){return this._xlsxCell},set:function(e){this._xlsxCell=e},enumerable:!0,configurable:!0}),o.prototype.getFormattedCell=function(){return this._cell||(this._cell=this._patternCell.cloneNode(),this.panel.hostElement.children[0].appendChild(this._cell),i._getCellStyle(this.panel,this._cell,this.range.row,this.range.col)),this._cell},o}(l.CellRangeEventArgs);o.XlsxFormatItemEventArgs=d});