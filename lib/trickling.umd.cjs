(function(t,e){typeof exports=="object"&&typeof module<"u"?e(exports):typeof define=="function"&&define.amd?define(["exports"],e):(t=typeof globalThis<"u"?globalThis:t||self,e(t.Trickling={}))})(this,function(t){"use strict";var c=Object.defineProperty;var p=(t,e,i)=>e in t?c(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var r=(t,e,i)=>(p(t,typeof e!="symbol"?e+"":e,i),i);const s=class{constructor(n){r(this,"template",`
  <div class="bar" role="bar">
    <div class="peg"></div>
  </div>
  <div class="spinner" role="spinner">
    <div class="spinner-icon"></div>
  </div>`);r(this,"options",{speed:200,wrapperSelectorId:"trickling",appendTo:"body"});this.options=Object.assign(this.options,n)}render(){if(this.isRendered())return document.getElementById(this.options.wrapperSelectorId);const n=document.createElement("div");n.id=this.options.wrapperSelectorId,n.innerHTML=this.template;const o=typeof this.options.appendTo=="string"?document.querySelector(this.options.appendTo):this.options.appendTo;return o&&o.appendChild(n),n}start(){this.render()}done(){}isRendered(){return!!document.getElementById(this.options.wrapperSelectorId)}static createProgress(n){return s.instance||(s.instance=new s(n)),s.instance}};let e=s;r(e,"instance");const i=function(d){return e.createProgress(d)},a="";t.Trickling=e,t.createTrickling=i,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});