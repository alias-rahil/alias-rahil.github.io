/*! IDRViewer - v1.12.0 | Copyright 2021 IDRsolutions */

!function(){"use strict";var g,p,m,h,L={LAYOUT_PRESENTATION:"presentation",LAYOUT_MAGAZINE:"magazine",LAYOUT_CONTINUOUS:"continuous",SELECT_SELECT:"select",SELECT_PAN:"pan",ZOOM_SPECIFIC:"specific",ZOOM_ACTUALSIZE:"actualsize",ZOOM_FITWIDTH:"fitwidth",ZOOM_FITHEIGHT:"fitheight",ZOOM_FITPAGE:"fitpage",ZOOM_AUTO:"auto"},v=1,b=0,T=[],y=10,r=!1;L.setup=function(e){e=e||IDRViewer.config,r=!0,h=e.bounds,b=e.pagecount,(v<1||b<v)&&(v=1),p=document.getElementById("idrviewer");var t=document.createElement("div");t.style.position="relative",t.style.display="inline-block",t.style.verticalAlign="middle",t.style.minWidth="100%",t.style.lineHeight="normal",p.appendChild(t),(g=document.createElement("div")).id="contentContainer",g.style.overflow="hidden",g.style.transform="translateZ(0)",g.style.padding="5px",t.appendChild(g);for(var n=1;n<=b;n++){var o=document.createElement("div");o.id="page"+n,o.setAttribute("style","width: "+h[n-1][0]+"px; height: "+h[n-1][1]+"px;"),o.className="page",g.appendChild(o),T[n]=o}c.setup(),O.setup(),E.setup(e.pageType,e.url),l.setup(!!e.isR2L),C.setup(),m.goToPage(v),O.setPage(v,!0);var a,i={selectMode:c.currentSelectMode,isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),layout:m.toString(),availableLayouts:l.getAvailableLayouts(),isFirstPage:1===v,isLastPage:m.isLastPage(v)};for(a in e)e.hasOwnProperty(a)&&(i[a]=e[a]);i.page=v,L.fire("ready",i)};var n,e,o,a,i,t,s,u,E=function(){var u,r,s,e={},l=!1,c=[],d="file:"===location.protocol,f="";e.setup=function(e,t){r=(s="svgz"===e)||"svg"===e,t&&(f=t);t=document.createElement("style");t.setAttribute("type","text/css"),document.head.appendChild(t),u=t.sheet,r&&window.addEventListener("mousedown",function(e){0===e.button&&m(window)})},e.clearSelection=function(){(r?m:n)(window)};function g(e,t){var n=document.createElement("iframe");n.setAttribute("class","page-inner"),n.setAttribute("src",f+e+".html"),n.setAttribute("style","width: "+h[e-1][0]+"px; height: "+h[e-1][1]+"px; position: absolute; border: 0;"),n.onload=t,T[e].appendChild(n)}function p(e,t){var n=new XMLHttpRequest;n.open("GET",f+e+".html",!0),n.onload=function(){200<=n.status&&n.status<400?function(e,t,n){var o=document.createElement("div");o.innerHTML=e;var a=o.querySelector("#p"+t);a.style.margin="0",a.style.overflow="hidden",a.style.position="absolute";var i=function(){this&&this.removeEventListener("load",i),n()},e=a.querySelector("#pdf"+t);(o=e.getAttribute("data")||e.getAttribute("src"))&&e.addEventListener("load",i),f&&((r=e.getAttribute("data"))?e.setAttribute("data",f+r):(r=e.getAttribute("src"))&&-1===r.indexOf("base64")&&e.setAttribute("src",f+r));var r=a.querySelector("#fonts"+t);r&&(s=r.innerHTML,r.parentNode.removeChild(r),s.match(/@font-face {[\s\S]*?}/g).forEach(function(e){-1===c.indexOf(e)&&(c.push(e),u.insertRule(e.replace('url("','url("'+f),u.cssRules.length))}));var s=a.querySelector(".shared-css");s&&(s.parentNode.removeChild(s),l||(document.head.appendChild(s),l=!0)),A.addClass(a,"page-inner"),T[t].appendChild(a),o||i()}(n.responseText,e,t):g(e,t)},n.onerror=function(){g(e,t)},n.send()}var n=function(e){try{e.getSelection?e.getSelection().empty?e.getSelection().empty():e.getSelection().removeAllRanges&&e.getSelection().removeAllRanges():e.document.selection&&e.document.selection.empty()}catch(e){}},m=function(e){try{n(e);for(var t=1;t<=b;t++)O.isVisible(t)&&n(T[t].firstChild.contentDocument)}catch(e){}};return e.show=function(e){T[e].firstChild.style.display="block"},e.hide=function(e){T[e].firstChild.style.display="none"},e.load=function(e,t){var n,o,a,i;r?(n=e,o=t,a=function(){this.removeEventListener("load",a);try{this.contentDocument.addEventListener("mousedown",function(e){0===e.button&&m(window)})}catch(e){}o()},(i=document.createElement("object")).setAttribute("width",""+h[n-1][0]),i.setAttribute("height",""+h[n-1][1]),i.setAttribute("data",f+n+(s?".svgz":".svg")),i.setAttribute("type","image/svg+xml"),i.setAttribute("class","page-inner"),i.setAttribute("style","position: absolute"),i.addEventListener("load",a),T[n].appendChild(i)):(d?g:p)(e,t)},e.unload=function(e){T[e].removeChild(T[e].firstChild)},e}(),O=function(){var o,a,i,n="loading",r="hidden",s="unloaded",u="loaded",e={},l=0,c=0,d=[];e.setup=function(){i=b;for(var e=1;e<=b;e++)d[e]=s};function t(e,t){v(d[e],t),d[e]=t}function f(e){return d[e]===u}function g(e){return d[e]===u||d[e]===r}function p(e){d[e]===u&&(t(e,r),E.hide(e))}function m(e){d[e]===r&&(t(e,u),E.show(e)),d[e]===s&&(t(e,n),E.load(e,function(){t(e,u),L.fire("pageload",{page:e})}))}function h(e){d[e]!==u&&d[e]!==r||(t(e,s),E.unload(e),L.fire("pageunload",{page:e}))}var v=function(e,t){switch(e){case n:l--;break;case u:c--;break;case r:0;break;case s:i--}switch(t){case n:l++;break;case u:c++;break;case r:0;break;case s:i++}},T=function(){if(m(o),l<2)for(var e=1;e<10&&(y(o-e)&&(f(o-e)||m(o-e)),2!==l)&&(y(o+e)&&(f(o+e)||m(o+e)),2!==l);e++);for(var t=1,n=b;20<c+l;)n-o<o-t?(f(t)&&p(t),t++):(f(n)&&p(n),n--);for(t=1,n=b;50<b-i;)n-o<o-t?(g(t)&&h(t),t++):(g(n)&&h(n),n--);a=setTimeout(T,500)},y=function(e){return 1<=e&&e<=b};return e.setPage=function(e,t){o=e,t&&m(e),clearTimeout(a),a=setTimeout(T,500)},e.stopLoading=function(){clearTimeout(a),a=setTimeout(T,500)},e.hide=p,e.isVisible=f,e}(),l=(o={},i=!(a=!0),(e={}).setup=function(e){i=e;for(var t=0;t<b;t++)if(h[t][0]!==h[0][0]||h[t][1]!==h[0][1]){a=!1;break}(m=o[n]||o[IDRViewer.LAYOUT_CONTINUOUS]).setup(a,i),A.addClass(p,"layout-"+m.toString()),i&&A.addClass(p,"isR2L")},e.setLayout=function(e){m.unload(),A.removeClass(p,"layout-"+m.toString()),(m=o[e]).setup(a,i),A.addClass(p,"layout-"+m.toString()),C.updateZoom(IDRViewer.ZOOM_AUTO),m.goToPage(v),L.fire("layoutchange",{layout:e})},e.addLayout=function(e,t){o[e]=t},e.setDefault=function(e){n=e},e.getAvailableLayouts=function(){return Object.keys(o)},e.updatePage=function(e){v!=e&&(v=e,O.setPage(e),L.fire("pagechange",{page:v,pagecount:b,isFirstPage:1===v,isLastPage:m.isLastPage(e)}))},e);l.addLayout(L.LAYOUT_PRESENTATION,(s={setup:function(e){t=e},unload:function(){for(var e=1;e<=b;e++)T[e].style.marginLeft="",T[e].style.marginTop="",A.removeClass(T[e],"current","prev","next","before","after");g.style.width="",g.style.height=""},goToPage:function(e){l.updatePage(e),t||C.updateZoom(),p.scrollTop=0,u(e),s.updateLayout()},getVisiblePages:function(){return[v]}},u=function(e){for(var t=1;t<=b;t++)A.removeClass(T[t],"current","prev","next","before","after"),t<e?A.addClass(T[t],"before"):e<t&&A.addClass(T[t],"after");A.addClass(T[e],"current"),1<=e-1&&A.addClass(T[e-1],"prev"),e+1<=b&&A.addClass(T[e+1],"next")},s.updateLayout=function(){var e=C.getZoom(),t=Math.floor(h[v-1][0]*e),n=0,o=p.clientWidth-y;t<o?n=(o-t)/2:o=t;var t=Math.floor(h[v-1][1]*e),a=0,e=p.clientHeight-y;t<e?a=(e-t)/2:e=t,g.style.width=o+"px",g.style.height=e+"px";for(var i=1;i<=b;i++)T[i].style.marginLeft=n+"px",T[i].style.marginTop=a+"px"},s.isLastPage=function(e){return e===b},s.getZoomBounds=function(){return{width:h[v-1][0],height:h[v-1][1]}},s.getAutoZoom=function(e,t){return Math.min(e,t)},s.next=function(){L.goToPage(v+1)},s.prev=function(){L.goToPage(v-1)},s.toString=function(){return IDRViewer.LAYOUT_PRESENTATION},s)),l.addLayout(L.LAYOUT_MAGAZINE,function(){var n,d,t={};function f(e){return 1<e&&e<b}t.setup=function(e,t){n=e,d=t},t.unload=function(){for(var e=1;e<=b;e++)T[e].style.marginLeft="",T[e].style.marginTop="",A.removeClass(T[e],"current","prev","next","before","after");g.style.width="",g.style.height=""},t.goToPage=function(e){1!==e&&e%2!=0&&--e,l.updatePage(e),n||C.updateZoom(),o(e),t.updateLayout()},t.getVisiblePages=function(){var e=[v];return f(v)&&e.push(v+1),e};var o=function(e){for(var t=1;t<=b;t++)A.removeClass(T[t],"current","prev","next","before","after");if(A.addClass(T[e],"current"),f(e)&&A.addClass(T[e+1],"current"),(e=1==e?0:e)+2<=b&&(A.addClass(T[e+2],"next"),e+3<=b&&A.addClass(T[e+3],"next")),0<e-1&&(A.addClass(T[e-1],"prev"),0<e-2&&A.addClass(T[e-2],"prev")),e+4<=b)for(t=e+4;t<=b;t++)A.addClass(T[t],"after");if(0<e-3)for(t=e-3;0<t;t--)A.addClass(T[t],"before")};return t.updateLayout=function(){var e=f(v),t=C.getZoom(),n=Math.floor(h[v-1][0]*t),o=e?Math.floor(h[v][0]*t):n,a=2*Math.max(n,o),i=Math.max(a,p.clientWidth-y),a=Math.floor(i/2),r=a,s=a;d?s-=o:r-=n;var n=Math.floor(h[v-1][1]*t),e=e?Math.floor(h[v][1]*t):n,t=Math.max(n,e,p.clientHeight-y),u=Math.floor((t-(d?e:n))/2),l=Math.floor((t-(d?n:e))/2);g.style.width=i+"px",g.style.height=t+"px",T[1].style.marginLeft=s+"px",T[1].style.marginTop=l+"px";for(var c=2;c<=b;c+=2)T[c].style.marginLeft=r+"px",T[c].style.marginTop=u+"px",c<b&&(T[c+1].style.marginLeft=s+"px",T[c+1].style.marginTop=l+"px")},t.isLastPage=function(e){return b<e+(1==e?1:2)},t.getZoomBounds=function(){var e=f(v),t=Math.floor(h[v-1][0]),n=e?Math.floor(h[v][0]):0,o=Math.floor(h[v-1][1]),e=e?Math.floor(h[v][1]):0;return{width:2*Math.max(t,n),height:Math.max(o,e)}},t.getAutoZoom=function(e,t){return Math.min(e,t)},t.next=function(){L.goToPage(v+(1==v?1:2))},t.prev=function(){L.goToPage(v-1)},t.toString=function(){return IDRViewer.LAYOUT_MAGAZINE},t}()),l.addLayout(L.LAYOUT_CONTINUOUS,function(){var t={},n=0,o=0,a=[];t.setup=function(){p.addEventListener("scroll",i);for(var e=0;e<b;e++)h[e][0]>n&&(n=h[e][0]),h[e][1]>o&&(o=h[e][1])},t.unload=function(){p.removeEventListener("scroll",i)};var i=function(){O.stopLoading(),e()},e=function(){var e;if(0<T[1].getBoundingClientRect().top)l.updatePage(1);else for(e=1;e<=b;e++){var t=T[e].getBoundingClientRect(),n=t.top,t=t.bottom-t.top;if(n<=.25*t&&.5*-t<n){l.updatePage(e);break}}r()},r=function(){a=[v];for(var t,n=p.clientHeight,e=function(e){return 0<(t=T[e].getBoundingClientRect()).bottom&&t.top<n},o=v-1;1<=o&&e(o);o--)a.push(o);for(o=v+1;o<=b&&e(o);o++)a.push(o)};return t.goToPage=function(e,t){var n=0;if(t){var o=t.split(" ");switch(o[0]){case"XYZ":n=Number(o[2]);break;case"FitH":n=Number(o[1]);break;case"FitR":n=Number(o[4]);break;case"FitBH":n=Number(o[1])}0!==(n=isNaN(n)||n<0||n>h[e-1][1]?0:n)&&(n=h[e-1][1]-n)}t=C.getZoom();p.scrollTop=T[e].offsetTop-5+n*t,l.updatePage(e),r()},t.getVisiblePages=function(){return a},t.updateLayout=function(){},t.isLastPage=function(e){return e===b},t.getZoomBounds=function(){return{width:n,height:o}},t.getAutoZoom=function(e){return t.getZoomBounds().width>p.clientWidth-y?e:1},t.next=function(){L.goToPage(v+1)},t.prev=function(){L.goToPage(v-1)},t.toString=function(){return IDRViewer.LAYOUT_CONTINUOUS},t}());var c=function(){var t,n,o,a,e={},i=!1;e.setup=function(){switch((a=document.createElement("div")).id="overlay",g.parentNode.insertBefore(a,g),o){case IDRViewer.SELECT_PAN:case IDRViewer.SELECT_SELECT:break;default:o=IDRViewer.SELECT_SELECT}this.currentSelectMode=o,this.currentSelectMode==L.SELECT_SELECT?e.enableTextSelection():e.enablePanning()},e.enableTextSelection=function(){this.currentSelectMode=L.SELECT_SELECT,A.removeClass(a,"panning"),a.removeEventListener("mousedown",r),document.removeEventListener("mouseup",s),a.removeEventListener("mousemove",u)};var r=function(e){return e=e||window.event,A.addClass(a,"mousedown"),t=e.clientX,n=e.clientY,!(i=!0)},s=function(){A.removeClass(a,"mousedown"),i=!1},u=function(e){if(i)return e=e||window.event,p.scrollLeft=p.scrollLeft+t-e.clientX,p.scrollTop=p.scrollTop+n-e.clientY,t=e.clientX,n=e.clientY,!1};return e.enablePanning=function(){this.currentSelectMode=L.SELECT_PAN,E.clearSelection(),A.addClass(a,"panning"),a.addEventListener("mousedown",r),document.addEventListener("mouseup",s),a.addEventListener("mousemove",u)},e.setDefaultMode=function(e){o=e},e}();L.setSelectMode=function(e){r?(e==L.SELECT_SELECT?c.enableTextSelection():c.enablePanning(),L.fire("selectchange",{type:e})):c.setDefaultMode(e)};var d,C=function(){var s,u,t,e={},l=L.ZOOM_AUTO,i=[.25,.5,.75,1,1.25,1.5,2,2.5,3,3.5,4],r=[L.ZOOM_AUTO,L.ZOOM_FITPAGE,L.ZOOM_FITHEIGHT,L.ZOOM_FITWIDTH,L.ZOOM_ACTUALSIZE],c=0,d=1;e.setup=function(){var e=document.createElement("style");e.setAttribute("type","text/css"),document.head.appendChild(e),u=e.sheet,window.addEventListener("resize",function(){f()}),f(t)};var f=function(e){O.stopLoading();var t=!1,n=!1;4<=(d=g(e))?(d=4,n=!0):d<=.25&&(d=.25,t=!0);var o=p.scrollTop/p.scrollHeight;m.updateLayout();for(var a=m.getVisiblePages(),i=1;i<=b;i++)-1===a.indexOf(i)&&O.hide(i);s&&u.deleteRule(s);e=function(e,t,n,o){n=o?"translate3d("+e+"px, "+t+"px, 0) scale("+n+")":"translateX("+e+"px) translateY("+t+"px) scale("+n+")";return"-webkit-transform: "+n+";\n-ms-transform: "+n+";\ntransform: "+n+";"}(0,0,d,!1);s=u.insertRule(".page-inner { \n"+e+"\n}",u.cssRules.length);for(var r=0;r<b;r++)T[r+1].style.width=Math.floor(h[r][0]*d)+"px",T[r+1].style.height=Math.floor(h[r][1]*d)+"px";p.scrollTop=p.scrollHeight*o,++c%2==1&&f(),L.fire("zoomchange",{zoomType:l,zoomValue:d,isMinZoom:t,isMaxZoom:n})},g=function(e){var t=m.getZoomBounds(),n=(p.clientWidth-y)/t.width,o=(p.clientHeight-y)/t.height,t=parseFloat(e);switch(isNaN(t)||(d=t,e=L.ZOOM_SPECIFIC),e=e||l){case L.ZOOM_AUTO:d=m.getAutoZoom(n,o);break;case L.ZOOM_FITWIDTH:d=n;break;case L.ZOOM_FITHEIGHT:d=o;break;case L.ZOOM_FITPAGE:d=Math.min(n,o);break;case L.ZOOM_ACTUALSIZE:d=1}return l=e,d};return e.updateZoom=f,e.zoomIn=function(){f(function(){for(var e,t=d,n=i[i.length-1],o=0;o<i.length;o++)if(t<i[o]){n=i[o];break}for(o=0;o<r.length;o++){var a=g(r[o]);t<a&&a<=n&&(e&&a===n||(e=r[o],n=a))}return e||n}())},e.zoomOut=function(){f(function(){for(var e,t=d,n=i[0],o=i.length-1;0<=o;o--)if(i[o]<t){n=i[o];break}for(o=0;o<r.length;o++){var a=g(r[o]);a<t&&n<=a&&(e&&a===n||(e=r[o],n=a))}return e||n}())},e.getZoom=function(){return d},e.setDefault=function(e){t=e},e}();L.zoomIn=function(){C.zoomIn()},L.zoomOut=function(){C.zoomOut()},L.setZoom=function(e){r?C.updateZoom(e):C.setDefault(e)},L.goToPage=function(e,t){r?1<=e&&e<=b&&m.goToPage(Number(e),t):v=e},L.next=function(){m.next()},L.prev=function(){m.prev()},L.setLayout=function(e){r?l.setLayout(e):l.setDefault(e)},L.updateLayout=function(){C.updateZoom()},d={},L.on=function(e,t){d[e]||(d[e]=[]),-1===d[e].indexOf(t)&&d[e].push(t)},L.off=function(e,t){!d[e]||-1!==(t=d[e].indexOf(t))&&d[e].splice(t,1)},L.fire=function(e,t){d[e]&&d[e].forEach(function(e){e(t)})};var A={addClass:function(e,t){var n=0!==e.className.length?e.className.split(" "):[];-1===n.indexOf(t)&&(n.push(t),e.className=n.join(" "))},removeClass:function(){for(var e=arguments[0],t=0!==e.className.length?e.className.split(" "):[],n=1;n<arguments.length;n++){var o=t.indexOf(arguments[n]);-1!==o&&t.splice(o,1)}e.className=t.join(" ")}};"function"==typeof define&&define.amd?define(["idrviewer"],[],function(){return L}):"object"==typeof module&&module.exports?module.exports=L:window.IDRViewer=L}();