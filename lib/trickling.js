var v = Object.defineProperty;
var E = (s, t, e) => t in s ? v(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var o = (s, t, e) => (E(s, typeof t != "symbol" ? t + "" : t, e), e);
function m(s, t, e) {
  return s < t ? t : s > e ? e : s;
}
function u(s) {
  return ((-1 + s) * 100).toFixed(4);
}
const T = () => {
  const s = [];
  function t() {
    const e = s.shift();
    e && e(t);
  }
  return function(e) {
    s.push(e), s.length == 1 && t();
  };
}, C = T();
function p(s, t) {
  const r = (s.getAttribute("style") || "").split(";").filter((i) => !!i.trim()).reduce((i, h) => {
    const f = h.split(":").map((P) => P.trim()), k = f[0], b = f[1];
    return i[k] = b, i;
  }, {}), n = Object.assign(r, t), a = Object.keys(n).filter((i) => !!i.trim()).reduce((i, h) => (i += `${h}: ${n[h]};`, i), "");
  s.setAttribute("style", a);
}
function g(s, t) {
  const e = typeof t == "string" ? [t] : t;
  s.classList.add(...e);
}
function y(s, t) {
  const e = typeof t == "string" ? [t] : t;
  s.classList.remove(...e);
}
function S(s) {
  s && s.parentNode && s.parentNode.removeChild(s);
}
const l = class {
  constructor(t) {
    o(this, "template", `
    <div class="bar" role="bar">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon"></div>
    </div>`);
    o(this, "barSelector", '[role="bar"]');
    o(this, "spinnerSelector", '[role="spinner"]');
    o(this, "busyFlagClassName", "trickling-busy");
    o(this, "customParentClassName", "trickling-custom-parent");
    o(this, "status", null);
    o(this, "positionUsing", "");
    o(this, "options", {
      speed: 200,
      wrapperSelectorId: "trickling",
      appendTo: "body",
      minimum: 0.08,
      easing: "ease",
      showSpinner: !0,
      trickleSpeed: 1e3,
      trickle: !0,
      color: "#29d",
      progressBarHeight: "2px",
      spinnerOpacity: 1,
      spinnerSize: "18px",
      spinnerStrokeWidth: "2px"
    });
    this.options = Object.assign(this.options, t), this.setPercent(null);
  }
  setStyleVars(t) {
    p(t, {
      "--trickling-color": this.options.color,
      "--trickling-progress-bar-height": this.options.progressBarHeight,
      "--trickling-spinner-opacity": this.options.spinnerOpacity,
      "--trickling-spinner-size": this.options.spinnerSize,
      "--trickling-spinner-stroke-width": this.options.spinnerStrokeWidth
    });
  }
  render(t) {
    if (this.isRendered())
      return document.getElementById(
        this.options.wrapperSelectorId
      );
    g(document.documentElement, this.busyFlagClassName);
    const e = document.createElement("div");
    e.id = this.options.wrapperSelectorId, e.innerHTML = this.template, this.setStyleVars(e);
    const c = this.getBarElement(e), r = t ? "-100" : u(this.getPercent() || 0), n = this.getAppendToElement();
    if (p(c, {
      transition: "all 0 linear",
      transform: `translate3d(${r}%, 0, 0)`
    }), !this.options.showSpinner) {
      const a = e.querySelector(this.spinnerSelector);
      a && S(a);
    }
    return n != document.body && g(n, this.customParentClassName), n && n.appendChild(e), e;
  }
  set(t) {
    const e = this.isStarted();
    t = m(t, this.options.minimum, 1), this.setPercent(t === 1 ? null : t);
    const c = this.render(!e), r = this.getBarElement(c), n = this.options.speed, a = this.options.easing;
    return l.progressOffsetWidth = c.offsetWidth, C((i) => {
      this.positionUsing === "" && (this.positionUsing = this.getPositioningCSS()), p(r, this.barPositionCSS(t, n, a)), t === 1 ? (p(c, {
        transition: "none",
        opacity: 1
      }), l.progressOffsetWidth = c.offsetWidth, setTimeout(() => {
        p(c, {
          transition: `all ${n}ms linear`,
          opacity: 0
        }), setTimeout(() => {
          this.remove(), i();
        }, n);
      }, n)) : setTimeout(i, n);
    }), this;
  }
  inc(t) {
    let e = this.getPercent();
    return e ? e > 1 ? this : (typeof t != "number" && (e >= 0 && e < 0.2 ? t = 0.1 : e >= 0.2 && e < 0.5 ? t = 0.04 : e >= 0.5 && e < 0.8 ? t = 0.02 : e >= 0.8 && e < 0.99 ? t = 5e-3 : t = 0), e = m(e + t, 0, 0.994), this.set(e)) : this.start();
  }
  trickle() {
    return this.inc();
  }
  start() {
    this.getPercent() || this.set(0);
    const t = () => {
      setTimeout(() => {
        this.getPercent() && (this.trickle(), t());
      }, this.options.trickleSpeed);
    };
    return this.options.trickle && t(), this;
  }
  done(t) {
    return !t && !this.getPercent() ? this : this.inc(0.3 + 0.5 * Math.random()).set(1);
  }
  remove() {
    y(document.documentElement, this.busyFlagClassName);
    const t = this.getAppendToElement();
    y(t, this.customParentClassName);
    const e = document.getElementById(this.options.wrapperSelectorId);
    e && S(e);
  }
  getBarElement(t) {
    const e = t.querySelector(this.barSelector);
    if (!e)
      throw new Error("[Trickling]: Can not find 'barSelector' element!");
    return e;
  }
  getAppendToElement() {
    const t = typeof this.options.appendTo == "string" ? document.querySelector(this.options.appendTo) : this.options.appendTo;
    if (!t)
      throw new Error("[Trickling]: Can not find 'options.appendTo' element!");
    return t;
  }
  setPercent(t) {
    this.status = t;
  }
  getPercent() {
    return this.status;
  }
  isRendered() {
    return !!document.getElementById(this.options.wrapperSelectorId);
  }
  isStarted() {
    return typeof this.getPercent() == "number";
  }
  barPositionCSS(t, e, c) {
    let r = {};
    return this.positionUsing === "translate3d" ? r = { transform: `translate3d(${u(t)}%,0,0)` } : this.positionUsing === "translate" ? r = { transform: `translate(${u(t)}%,0)` } : r = { "margin-left": `${u(t)}%` }, r.transition = `all ${e}ms ${c} 0s`, r;
  }
  getPositioningCSS() {
    const t = document.body.style, e = "WebkitTransform" in t ? "Webkit" : "MozTransform" in t ? "Moz" : "msTransform" in t ? "ms" : "OTransform" in t ? "O" : "";
    return e + "Perspective" in t ? "translate3d" : e + "Transform" in t ? "translate" : "margin";
  }
  static createProgress(t) {
    return l.instance || (l.instance = new l(t)), l.instance;
  }
};
let d = l;
o(d, "instance"), o(d, "progressOffsetWidth", 0);
const O = function(s) {
  return d.createProgress(s);
};
export {
  d as Trickling,
  O as createTrickling
};
