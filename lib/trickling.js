var C = Object.defineProperty;
var W = (s, e, t) => e in s ? C(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var p = (s, e, t) => (W(s, typeof e != "symbol" ? e + "" : e, t), t);
function E(s, e, t) {
  return s < e ? e : s > t ? t : s;
}
function m(s) {
  return ((-1 + s) * 100).toFixed(4);
}
const w = () => {
  const s = [];
  function e() {
    const t = s.shift();
    t && t(e);
  }
  return function(t) {
    s.push(t), s.length == 1 && e();
  };
}, x = w();
function u(s, e) {
  const i = (s.getAttribute("style") || "").split(";").filter((r) => !!r.trim()).reduce((r, h) => {
    const y = h.split(":").map((v) => v.trim()), S = y[0], P = y[1];
    return r[S] = P, r;
  }, {}), n = Object.assign(i, e), l = Object.keys(n).filter((r) => !!r.trim()).reduce((r, h) => (r += `${h}: ${n[h]};`, r), "");
  s.setAttribute("style", l);
}
function f(s, e) {
  const t = typeof e == "string" ? [e] : e;
  s.classList.add(...t);
}
function k(s, e) {
  const t = typeof e == "string" ? [e] : e;
  s.classList.remove(...t);
}
function b(s) {
  s && s.parentNode && s.parentNode.removeChild(s);
}
var c = /* @__PURE__ */ ((s) => (s.wrapperSelectorId = "trickling", s.customParentClassName = "trickling-custom-parent", s.busyFlagClassName = "trickling-busy", s.template = `
  <div class="bar" role="bar">
    <div class="peg"></div>
  </div>
  <div class="spinner" role="spinner">
    <div class="spinner-icon"></div>
  </div>`, s.barSelector = '[role="bar"]', s.spinnerSelector = '[role="spinner"]', s))(c || {}), g = /* @__PURE__ */ ((s) => (s.queryBarElementError = "[Trickling]: Can not find 'barSelector' element!", s.queryAppendToElementError = "[Trickling]: Can not find 'options.appendTo' element!", s))(g || {});
const a = class {
  constructor(e) {
    p(this, "status", null);
    p(this, "positionUsing", "");
    p(this, "options", {
      speed: 200,
      easing: "ease",
      appendTo: "body",
      customWrapperClassName: "",
      minimum: 0.08,
      maximum: 0.994,
      showSpinner: !0,
      trickleSpeed: 1e3,
      trickle: !0,
      color: "#29d",
      progressBarHeight: "2px",
      spinnerOpacity: 1,
      spinnerSize: "18px",
      spinnerStrokeWidth: "2px"
    });
    this.options = Object.assign(this.options, e), this.setPercent(null);
  }
  setOptions(e) {
    return this.options = Object.assign(this.options, e), this;
  }
  setCSSVars(e) {
    u(e, {
      "--trickling-color": this.options.color,
      "--trickling-progress-bar-height": this.options.progressBarHeight,
      "--trickling-spinner-opacity": this.options.spinnerOpacity,
      "--trickling-spinner-size": this.options.spinnerSize,
      "--trickling-spinner-stroke-width": this.options.spinnerStrokeWidth
    });
  }
  getWrapperElement() {
    return document.getElementById(c.wrapperSelectorId);
  }
  render(e) {
    if (this.isRendered())
      return this.getWrapperElement();
    f(document.documentElement, c.busyFlagClassName);
    const t = document.createElement("div");
    t.id = c.wrapperSelectorId, t.innerHTML = c.template, this.options.customWrapperClassName && f(t, this.options.customWrapperClassName), this.setCSSVars(t);
    const o = this.getBarElement(t), i = e ? "-100" : m(this.getPercent() || 0), n = this.getAppendToElement();
    if (u(o, {
      transition: "all 0 linear",
      transform: `translate3d(${i}%, 0, 0)`
    }), !this.options.showSpinner) {
      const l = t.querySelector(c.spinnerSelector);
      l && b(l);
    }
    return n != document.body && f(n, c.customParentClassName), n && n.appendChild(t), t;
  }
  set(e) {
    const t = this.isStarted();
    e = E(e, this.options.minimum, 1), this.setPercent(e === 1 ? null : e);
    const o = this.render(!t), i = this.getBarElement(o), n = this.options.speed, l = this.options.easing;
    return a.progressOffsetWidth = o.offsetWidth, x((r) => {
      this.positionUsing === "" && (this.positionUsing = this.getPositioningCSS()), u(i, this.barPositionCSS(e, n, l)), e === 1 ? (u(o, {
        transition: "none",
        opacity: 1
      }), a.progressOffsetWidth = o.offsetWidth, setTimeout(() => {
        u(o, {
          transition: `all ${n}ms linear`,
          opacity: 0
        }), setTimeout(() => {
          this.remove(), r();
        }, n);
      }, n)) : setTimeout(r, n);
    }), this;
  }
  inc(e) {
    let t = this.getPercent();
    return t ? t > 1 ? this : (typeof e != "number" && (t >= 0 && t < 0.2 ? e = 0.1 : t >= 0.2 && t < 0.5 ? e = 0.04 : t >= 0.5 && t < 0.8 ? e = 0.02 : t >= 0.8 && t < 0.99 ? e = 5e-3 : e = 0), t = E(t + e, 0, this.options.maximum), this.set(t)) : this.start();
  }
  trickle() {
    return this.inc();
  }
  start() {
    this.getPercent() || this.set(0);
    const e = () => {
      setTimeout(() => {
        this.getPercent() && (this.trickle(), e());
      }, this.options.trickleSpeed);
    };
    return this.options.trickle && e(), this;
  }
  done(e) {
    return !e && !this.getPercent() ? this : this.inc(0.3 + 0.5 * Math.random()).set(1);
  }
  remove() {
    k(document.documentElement, c.busyFlagClassName);
    const e = this.getAppendToElement();
    k(e, c.customParentClassName);
    const t = this.getWrapperElement();
    t && b(t);
  }
  getBarElement(e) {
    const t = e.querySelector(c.barSelector);
    if (!t)
      throw new Error(g.queryBarElementError);
    return t;
  }
  getAppendToElement() {
    const e = typeof this.options.appendTo == "string" ? document.querySelector(this.options.appendTo) : this.options.appendTo;
    if (!e)
      throw new Error(g.queryAppendToElementError);
    return e;
  }
  setPercent(e) {
    this.status = e;
  }
  getPercent() {
    return this.status;
  }
  isRendered() {
    return !!this.getWrapperElement();
  }
  isStarted() {
    return typeof this.getPercent() == "number";
  }
  barPositionCSS(e, t, o) {
    let i = {};
    return this.positionUsing === "translate3d" ? i = { transform: `translate3d(${m(e)}%,0,0)` } : this.positionUsing === "translate" ? i = { transform: `translate(${m(e)}%,0)` } : i = { "margin-left": `${m(e)}%` }, i.transition = `all ${t}ms ${o} 0s`, i;
  }
  getPositioningCSS() {
    const e = document.body.style, t = "WebkitTransform" in e ? "Webkit" : "MozTransform" in e ? "Moz" : "msTransform" in e ? "ms" : "OTransform" in e ? "O" : "";
    return t + "Perspective" in e ? "translate3d" : t + "Transform" in e ? "translate" : "margin";
  }
  static createProgress(e) {
    return a.instance || (a.instance = new a(e)), a.instance;
  }
};
let d = a;
p(d, "instance"), p(d, "progressOffsetWidth", 0);
const B = function(s) {
  return d.createProgress(s);
};
export {
  d as Trickling,
  B as createTrickling
};
