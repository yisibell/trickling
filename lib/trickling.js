var o = Object.defineProperty;
var p = (n, e, t) => e in n ? o(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var r = (n, e, t) => (p(n, typeof e != "symbol" ? e + "" : e, t), t);
const s = class {
  constructor(e) {
    r(this, "template", `
  <div class="bar" role="bar">
    <div class="peg"></div>
  </div>
  <div class="spinner" role="spinner">
    <div class="spinner-icon"></div>
  </div>`);
    r(this, "options", {
      speed: 200,
      wrapperSelectorId: "trickling",
      appendTo: "body"
    });
    this.options = Object.assign(this.options, e);
  }
  render() {
    if (this.isRendered())
      return document.getElementById(this.options.wrapperSelectorId);
    const e = document.createElement("div");
    e.id = this.options.wrapperSelectorId, e.innerHTML = this.template;
    const t = typeof this.options.appendTo == "string" ? document.querySelector(this.options.appendTo) : this.options.appendTo;
    return t && t.appendChild(e), e;
  }
  start() {
    this.render();
  }
  done() {
  }
  isRendered() {
    return !!document.getElementById(this.options.wrapperSelectorId);
  }
  static createProgress(e) {
    return s.instance || (s.instance = new s(e)), s.instance;
  }
};
let i = s;
r(i, "instance");
const d = function(n) {
  return i.createProgress(n);
};
export {
  i as Trickling,
  d as createTrickling
};
