var S = Object.defineProperty;
var C = (s, e, t) => e in s ? S(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var h = (s, e, t) => (C(s, typeof e != "symbol" ? e + "" : e, t), t);
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
function l(s, e) {
  const n = (s.getAttribute("style") || "").split(";").filter((i) => !!i.trim()).reduce((i, m) => {
    const f = m.split(":").map((k) => k.trim()), E = f[0], P = f[1];
    return i[E] = P, i;
  }, {}), r = Object.assign(n, e), p = Object.keys(r).filter((i) => !!i.trim()).reduce((i, m) => (i += `${m}: ${r[m]};`, i), "");
  s.setAttribute("style", p);
}
function u(s, e) {
  const t = typeof e == "string" ? [e] : e;
  s.classList.add(...t);
}
function b(s, e) {
  const t = typeof e == "string" ? [e] : e;
  s.classList.remove(...t);
}
function v(s) {
  s && s.parentNode && s.parentNode.removeChild(s);
}
var o = /* @__PURE__ */ ((s) => (s.wrapperSelectorId = "trickling", s.customParentClassName = "trickling-custom-parent", s.busyFlagClassName = "trickling-busy", s.template = `
  <div class="trickling-progress-bar" role="bar">
    <div class="trickling-progress-peg"></div>
  </div>
  <div class="trickling-progress-spinner" role="spinner">
    <div class="trickling-progress-spinner__spinner-icon"></div>
  </div>`, s.barSelector = '[role="bar"]', s.spinnerSelector = '[role="spinner"]', s.rtlClassName = "rtl", s))(o || {}), g = /* @__PURE__ */ ((s) => (s.queryBarElementError = "[Trickling]: Can not find 'barSelector' element!", s.queryAppendToElementError = "[Trickling]: Can not find 'options.appendTo' element!", s))(g || {});
const c = class {
  constructor(e) {
    h(this, "status", null);
    h(this, "positionUsing", "");
    h(this, "options", {
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
      rtl: !1,
      removeFromDOM: !0
    });
    this.options = Object.assign(this.options, e), this.setPercent(null);
  }
  setOptions(e) {
    return this.options = Object.assign(this.options, e), this;
  }
  setCSSVars(e) {
    l(e, {
      "--trickling-color": this.options.color,
      "--trickling-progress-bar-height": this.options.progressBarHeight,
      "--trickling-spinner-opacity": this.options.spinnerOpacity,
      "--trickling-spinner-size": this.options.spinnerSize,
      "--trickling-spinner-stroke-width": this.options.spinnerStrokeWidth
    });
  }
  render(e) {
    if (this.isRendered())
      return this.getWrapperElement();
    u(document.documentElement, o.busyFlagClassName);
    const t = document.createElement("div");
    t.id = o.wrapperSelectorId, t.innerHTML = o.template, this.options.rtl && u(t, o.rtlClassName), this.options.customWrapperClassName && u(t, this.options.customWrapperClassName), this.setCSSVars(t);
    const a = this.getBarElement(t), n = e ? this.getBarPercentage(0) : this.getBarPercentage(this.getPercent() || 0), r = this.getAppendToElement();
    if (l(a, {
      transition: "all 0 linear",
      transform: `translate3d(${n}%, 0, 0)`
    }), !this.options.showSpinner) {
      const p = t.querySelector(o.spinnerSelector);
      p && v(p);
    }
    return r != document.body && u(r, o.customParentClassName), r && r.appendChild(t), t;
  }
  set(e) {
    this.visible();
    const t = this.isStarted();
    e = y(e, this.options.minimum, 1), this.setPercent(e === 1 ? null : e);
    const a = this.render(!t), n = this.getBarElement(a), r = this.options.speed, p = this.options.easing;
    return c.progressOffsetWidth = a.offsetWidth, w((i) => {
      this.positionUsing === "" && (this.positionUsing = this.getPositioningCSS()), l(n, this.barPositionCSS(e, r, p)), e === 1 ? (l(a, {
        transition: "none",
        opacity: 1
      }), c.progressOffsetWidth = a.offsetWidth, setTimeout(() => {
        l(a, {
          transition: `all ${r}ms linear`,
          opacity: 0
        }), setTimeout(() => {
          this.remove(), i();
        }, r);
      }, r)) : setTimeout(i, r);
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
    this.visible(), this.getPercent() || this.set(0);
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
  visible() {
    if (this.isRendered() && !this.options.removeFromDOM) {
      const e = this.getWrapperElement();
      e && l(e, { visibility: "visible", opacity: 1 }), this.setPercent(null);
    }
  }
  hidden() {
    const e = this.getWrapperElement();
    e && l(e, { visibility: "hidden" });
  }
  remove() {
    if (b(document.documentElement, o.busyFlagClassName), !this.options.removeFromDOM) {
      this.hidden();
      return;
    }
    const e = this.getAppendToElement();
    b(e, o.customParentClassName);
    const t = this.getWrapperElement();
    t && v(t);
  }
  getWrapperElement() {
    return document.getElementById(o.wrapperSelectorId);
  }
  getBarElement(e) {
    const t = e.querySelector(o.barSelector);
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
  getBarPercentage(e) {
    return W(e, this.options.rtl);
  }
  barPositionCSS(e, t, a) {
    let n = {};
    return this.positionUsing === "translate3d" ? n = {
      transform: `translate3d(${this.getBarPercentage(e)}%,0,0)`
    } : this.positionUsing === "translate" ? n = {
      transform: `translate(${this.getBarPercentage(e)}%,0)`
    } : n = { "margin-left": `${this.getBarPercentage(e)}%` }, n.transition = `all ${t}ms ${a} 0s`, n;
  }
  getPositioningCSS() {
    const e = document.body.style, t = "WebkitTransform" in e ? "Webkit" : "MozTransform" in e ? "Moz" : "msTransform" in e ? "ms" : "OTransform" in e ? "O" : "";
    return t + "Perspective" in e ? "translate3d" : t + "Transform" in e ? "translate" : "margin";
  }
  static createProgress(e) {
    return c.instance || (c.instance = new c(e)), c.instance;
  }
};
let d = c;
h(d, "instance"), h(d, "progressOffsetWidth", 0);
const M = function(s) {
  return d.createProgress(s);
};
export {
  d as Trickling,
  M as createTrickling
};
