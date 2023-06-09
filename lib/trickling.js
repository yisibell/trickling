var C = Object.defineProperty;
var S = (r, e, t) => e in r ? C(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var p = (r, e, t) => (S(r, typeof e != "symbol" ? e + "" : e, t), t);
function y(r, e, t) {
  return r < e ? e : r > t ? t : r;
}
function W(r, e) {
  return (e ? (1 - r) * 100 : (-1 + r) * 100).toFixed(4);
}
const B = () => {
  const r = [];
  function e() {
    const t = r.shift();
    t && t(e);
  }
  return function(t) {
    r.push(t), r.length == 1 && e();
  };
}, x = B();
function l(r, e) {
  const n = (r.getAttribute("style") || "").split(";").filter((o) => !!o.trim()).reduce((o, h) => {
    const f = h.split(":").map((b) => b.trim()), P = f[0], E = f[1];
    return o[P] = E, o;
  }, {}), i = Object.assign(n, e), g = Object.keys(i).filter((o) => !!o.trim()).reduce((o, h) => (o += `${h}: ${i[h]};`, o), "");
  r.setAttribute("style", g);
}
function u(r, e) {
  const t = typeof e == "string" ? [e] : e;
  r.classList.add(...t);
}
function v(r, e) {
  const t = typeof e == "string" ? [e] : e;
  r.classList.remove(...t);
}
function k(r) {
  r && r.parentNode && r.parentNode.removeChild(r);
}
var a = /* @__PURE__ */ ((r) => (r.wrapperSelectorId = "trickling", r.customParentClassName = "trickling-custom-parent", r.busyFlagClassName = "trickling-busy", r.template = `
  <div class="trickling-progress-bar" role="bar">
    <div class="trickling-progress-peg"></div>
  </div>
  <div class="trickling-progress-spinner" role="spinner">
    <div class="trickling-progress-spinner__spinner-icon"></div>
  </div>`, r.barSelector = '[role="bar"]', r.spinnerSelector = '[role="spinner"]', r.rtlClassName = "rtl", r))(a || {}), d = /* @__PURE__ */ ((r) => (r.queryBarElementError = "[Trickling]: Can not find 'barSelector' element!", r.queryAppendToElementError = "[Trickling]: Can not find 'options.appendTo' element!", r))(d || {});
const c = class {
  constructor(e) {
    p(this, "progressOffsetWidth", 0);
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
      zIndex: 1031,
      rtl: !1,
      removeFromDOMWhenDone: !0,
      trickleIncrementalCurve: [
        { from: 0, to: 0.2, value: 0.1 },
        { from: 0.2, to: 0.5, value: 0.04 },
        { from: 0.5, to: 0.8, value: 0.02 },
        { from: 0.8, to: 0.99, value: 5e-3 }
      ]
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
      "--trickling-spinner-stroke-width": this.options.spinnerStrokeWidth,
      "--trickling-progress-bar-z-index": this.options.zIndex
    });
  }
  render(e) {
    if (this.isRendered())
      return this.getWrapperElement();
    u(document.documentElement, a.busyFlagClassName);
    const t = document.createElement("div");
    t.id = a.wrapperSelectorId, t.innerHTML = a.template, this.options.rtl && u(t, a.rtlClassName), this.options.customWrapperClassName && u(t, this.options.customWrapperClassName), this.setCSSVars(t);
    const s = this.getBarElement(t), n = this.getAppendToElement();
    if (this.translateProgressBar(s, e), !this.options.showSpinner) {
      const i = t.querySelector(a.spinnerSelector);
      i && k(i);
    }
    return n != document.body && u(n, a.customParentClassName), n && n.appendChild(t), t;
  }
  triggerRepaint() {
    const e = this.getWrapperElement();
    e && (this.progressOffsetWidth = e.offsetWidth);
  }
  set(e) {
    const t = this.isStarted();
    !t && this.visible(), e = y(e, this.options.minimum, 1), this.setPercent(e === 1 ? null : e);
    const s = this.render(!t), n = this.getBarElement(s), i = this.options.speed, g = this.options.easing;
    return this.triggerRepaint(), x((o) => {
      this.positionUsing === "" && (this.positionUsing = this.getPositioningCSS()), l(n, this.barPositionCSS(e, i, g)), e === 1 ? (l(s, {
        transition: "none",
        opacity: 1
      }), this.triggerRepaint(), setTimeout(() => {
        l(s, {
          transition: `all ${i}ms linear`,
          opacity: 0
        }), setTimeout(() => {
          this.remove(), o();
        }, i);
      }, i)) : setTimeout(o, i);
    }), this;
  }
  inc(e) {
    let t = this.getPercent();
    if (t) {
      if (t > 1)
        return this;
      if (typeof e != "number") {
        const s = typeof this.options.trickleIncrementalCurve == "function" ? this.options.trickleIncrementalCurve(t) : this.options.trickleIncrementalCurve;
        if (typeof s == "number")
          e = s || 0;
        else {
          const n = s.find(
            (i) => t !== null && t >= i.from && t < i.to
          );
          n ? e = n.value : e = 0;
        }
      }
      return t = y(t + e, 0, this.options.maximum), this.set(t);
    } else
      return this.start();
  }
  trickle() {
    return this.inc();
  }
  start() {
    !this.isStarted() && this.visible(), this.getPercent() || this.set(0);
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
  translateProgressBar(e, t) {
    const s = t ? this.getBarPercentage(0) : this.getBarPercentage(this.getPercent() || 0);
    l(e, {
      transition: "all 0 linear",
      transform: `translate3d(${s}%, 0, 0)`
    });
  }
  visible() {
    if (this.isRendered() && !this.options.removeFromDOMWhenDone) {
      const e = this.getWrapperElement();
      e && l(e, { display: "block", opacity: 1 }), this.setPercent(null);
    }
  }
  hidden() {
    const e = this.getWrapperElement();
    e && (l(e, { display: "none" }), this.setPercent(null), this.translateProgressBar(this.getBarElement(e), !0));
  }
  remove(e) {
    if (v(document.documentElement, a.busyFlagClassName), !this.options.removeFromDOMWhenDone && !e) {
      this.hidden();
      return;
    }
    const t = this.getAppendToElement();
    v(t, a.customParentClassName);
    const s = this.getWrapperElement();
    s && k(s);
  }
  getWrapperElement() {
    return document.getElementById(a.wrapperSelectorId);
  }
  getBarElement(e) {
    const t = e.querySelector(a.barSelector);
    if (!t)
      throw new Error(d.queryBarElementError);
    return t;
  }
  getAppendToElement() {
    const e = typeof this.options.appendTo == "string" ? document.querySelector(this.options.appendTo) : this.options.appendTo;
    if (!e)
      throw new Error(d.queryAppendToElementError);
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
  barPositionCSS(e, t, s) {
    let n = {};
    return this.positionUsing === "translate3d" ? n = {
      transform: `translate3d(${this.getBarPercentage(e)}%,0,0)`
    } : this.positionUsing === "translate" ? n = {
      transform: `translate(${this.getBarPercentage(e)}%,0)`
    } : n = { "margin-left": `${this.getBarPercentage(e)}%` }, n.transition = `all ${t}ms ${s} 0s`, n;
  }
  getPositioningCSS() {
    const e = document.body.style, t = "WebkitTransform" in e ? "Webkit" : "MozTransform" in e ? "Moz" : "msTransform" in e ? "ms" : "OTransform" in e ? "O" : "";
    return t + "Perspective" in e ? "translate3d" : t + "Transform" in e ? "translate" : "margin";
  }
  static createProgress(e) {
    return c.instance || (c.instance = new c(e)), c.instance;
  }
};
let m = c;
p(m, "instance");
const I = function(r) {
  return m.createProgress(r);
};
export {
  m as Trickling,
  I as createTrickling
};
