var v = Object.defineProperty;
var C = (s, e, t) => e in s ? v(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var p = (s, e, t) => (C(s, typeof e != "symbol" ? e + "" : e, t), t);
function y(s, e, t) {
  return s < e ? e : s > t ? t : s;
}
function W(s, e) {
  return (e ? (1 - s) * 100 : (-1 + s) * 100).toFixed(4);
}
const B = () => {
  const s = [];
  function e() {
    const t = s.shift();
    t && t(e);
  }
  return function(t) {
    s.push(t), s.length == 1 && e();
  };
}, w = B();
function h(s, e) {
  const i = (s.getAttribute("style") || "").split(";").filter((n) => !!n.trim()).reduce((n, g) => {
    const f = g.split(":").map((S) => S.trim()), E = f[0], b = f[1];
    return n[E] = b, n;
  }, {}), r = Object.assign(i, e), l = Object.keys(r).filter((n) => !!n.trim()).reduce((n, g) => (n += `${g}: ${r[g]};`, n), "");
  s.setAttribute("style", l);
}
function d(s, e) {
  const t = typeof e == "string" ? [e] : e;
  s.classList.add(...t);
}
function k(s, e) {
  const t = typeof e == "string" ? [e] : e;
  s.classList.remove(...t);
}
function P(s) {
  s && s.parentNode && s.parentNode.removeChild(s);
}
var o = /* @__PURE__ */ ((s) => (s.wrapperSelectorId = "trickling", s.customParentClassName = "trickling-custom-parent", s.busyFlagClassName = "trickling-busy", s.template = `
  <div class="trickling-progress-bar" role="bar">
    <div class="trickling-progress-peg"></div>
  </div>
  <div class="trickling-progress-spinner" role="spinner">
    <div class="trickling-progress-spinner__spinner-icon"></div>
  </div>`, s.barSelector = '[role="bar"]', s.spinnerSelector = '[role="spinner"]', s.rtlClassName = "rtl", s))(o || {}), m = /* @__PURE__ */ ((s) => (s.queryBarElementError = "[Trickling]: Can not find 'barSelector' element!", s.queryAppendToElementError = "[Trickling]: Can not find 'options.appendTo' element!", s))(m || {});
const c = class {
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
      color: "#2299dd",
      progressBarHeight: "2px",
      spinnerOpacity: 1,
      spinnerSize: "18px",
      spinnerStrokeWidth: "2px",
      rtl: !1
    });
    this.options = Object.assign(this.options, e), this.setPercent(null);
  }
  setOptions(e) {
    return this.options = Object.assign(this.options, e), this;
  }
  setCSSVars(e) {
    h(e, {
      "--trickling-color": this.options.color,
      "--trickling-progress-bar-height": this.options.progressBarHeight,
      "--trickling-spinner-opacity": this.options.spinnerOpacity,
      "--trickling-spinner-size": this.options.spinnerSize,
      "--trickling-spinner-stroke-width": this.options.spinnerStrokeWidth
    });
  }
  getWrapperElement() {
    return document.getElementById(o.wrapperSelectorId);
  }
  render(e) {
    if (this.isRendered())
      return this.getWrapperElement();
    d(document.documentElement, o.busyFlagClassName);
    const t = document.createElement("div");
    t.id = o.wrapperSelectorId, t.innerHTML = o.template, this.options.rtl && d(t, o.rtlClassName), this.options.customWrapperClassName && d(t, this.options.customWrapperClassName), this.setCSSVars(t);
    const a = this.getBarElement(t), i = e ? this.getBarPercentage(0) : this.getBarPercentage(this.getPercent() || 0), r = this.getAppendToElement();
    if (h(a, {
      transition: "all 0 linear",
      transform: `translate3d(${i}%, 0, 0)`
    }), !this.options.showSpinner) {
      const l = t.querySelector(o.spinnerSelector);
      l && P(l);
    }
    return r != document.body && d(r, o.customParentClassName), r && r.appendChild(t), t;
  }
  set(e) {
    const t = this.isStarted();
    e = y(e, this.options.minimum, 1), this.setPercent(e === 1 ? null : e);
    const a = this.render(!t), i = this.getBarElement(a), r = this.options.speed, l = this.options.easing;
    return c.progressOffsetWidth = a.offsetWidth, w((n) => {
      this.positionUsing === "" && (this.positionUsing = this.getPositioningCSS()), h(i, this.barPositionCSS(e, r, l)), e === 1 ? (h(a, {
        transition: "none",
        opacity: 1
      }), c.progressOffsetWidth = a.offsetWidth, setTimeout(() => {
        h(a, {
          transition: `all ${r}ms linear`,
          opacity: 0
        }), setTimeout(() => {
          this.remove(), n();
        }, r);
      }, r)) : setTimeout(n, r);
    }), this;
  }
  inc(e) {
    let t = this.getPercent();
    return t ? t > 1 ? this : (typeof e != "number" && (t >= 0 && t < 0.2 ? e = 0.1 : t >= 0.2 && t < 0.5 ? e = 0.04 : t >= 0.5 && t < 0.8 ? e = 0.02 : t >= 0.8 && t < 0.99 ? e = 5e-3 : e = 0), t = y(t + e, 0, this.options.maximum), this.set(t)) : this.start();
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
    k(document.documentElement, o.busyFlagClassName);
    const e = this.getAppendToElement();
    k(e, o.customParentClassName);
    const t = this.getWrapperElement();
    t && P(t);
  }
  getBarElement(e) {
    const t = e.querySelector(o.barSelector);
    if (!t)
      throw new Error(m.queryBarElementError);
    return t;
  }
  getAppendToElement() {
    const e = typeof this.options.appendTo == "string" ? document.querySelector(this.options.appendTo) : this.options.appendTo;
    if (!e)
      throw new Error(m.queryAppendToElementError);
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
  getBarPercentage(e) {
    return W(e, this.options.rtl);
  }
  barPositionCSS(e, t, a) {
    let i = {};
    return this.positionUsing === "translate3d" ? i = {
      transform: `translate3d(${this.getBarPercentage(e)}%,0,0)`
    } : this.positionUsing === "translate" ? i = {
      transform: `translate(${this.getBarPercentage(e)}%,0)`
    } : i = { "margin-left": `${this.getBarPercentage(e)}%` }, i.transition = `all ${t}ms ${a} 0s`, i;
  }
  getPositioningCSS() {
    const e = document.body.style, t = "WebkitTransform" in e ? "Webkit" : "MozTransform" in e ? "Moz" : "msTransform" in e ? "ms" : "OTransform" in e ? "O" : "";
    return t + "Perspective" in e ? "translate3d" : t + "Transform" in e ? "translate" : "margin";
  }
  static createProgress(e) {
    return c.instance || (c.instance = new c(e)), c.instance;
  }
};
let u = c;
p(u, "instance"), p(u, "progressOffsetWidth", 0);
const $ = function(s) {
  return u.createProgress(s);
};
export {
  u as Trickling,
  $ as createTrickling
};
