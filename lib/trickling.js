var T = Object.defineProperty;
var w = (s, t, e) => t in s ? T(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var c = (s, t, e) => (w(s, typeof t != "symbol" ? t + "" : t, e), e);
function m(s, t, e) {
  return s < t ? t : s > e ? e : s;
}
function h(s) {
  return ((-1 + s) * 100).toFixed(4);
}
const N = () => {
  const s = [];
  function t() {
    const e = s.shift();
    e && e(t);
  }
  return function(e) {
    s.push(e), s.length == 1 && t();
  };
}, O = N();
function p(s, t) {
  const o = (s.getAttribute("style") || "").split(";").filter((r) => !!r.trim()).reduce((r, u) => {
    const g = u.split(":").map((C) => C.trim()), k = g[0], v = g[1];
    return r[k] = v, r;
  }, {}), n = Object.assign(o, t), l = Object.keys(n).filter((r) => !!r.trim()).reduce((r, u) => (r += `${u}: ${n[u]};`, r), "");
  s.setAttribute("style", l);
}
function P(s, t) {
  return (typeof s == "string" ? s : f(s)).indexOf(" " + t + " ") >= 0;
}
function y(s, t) {
  const e = f(s), i = e + t;
  P(e, t) || (s.className = i.substring(1));
}
function S(s, t) {
  const e = f(s);
  if (!P(s, t))
    return;
  const i = e.replace(" " + t + " ", " ");
  s.className = i.substring(1, i.length - 1);
}
function f(s) {
  return (" " + (s && s.className || "") + " ").replace(
    /\s+/gi,
    " "
  );
}
function b(s) {
  s && s.parentNode && s.parentNode.removeChild(s);
}
const a = class {
  constructor(t) {
    c(this, "template", `
    <div class="bar" role="bar">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon"></div>
    </div>`);
    c(this, "barSelector", '[role="bar"]');
    c(this, "spinnerSelector", '[role="spinner"]');
    c(this, "busyFlagClassName", "trickling-busy");
    c(this, "customParentClassName", "trickling-custom-parent");
    c(this, "status", null);
    c(this, "positionUsing", "");
    c(this, "options", {
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
    y(document.documentElement, this.busyFlagClassName);
    const e = document.createElement("div");
    e.id = this.options.wrapperSelectorId, e.innerHTML = this.template, this.setStyleVars(e);
    const i = e.querySelector(this.barSelector), o = t ? "-100" : h(this.getPercent() || 0), n = typeof this.options.appendTo == "string" ? document.querySelector(this.options.appendTo) : this.options.appendTo;
    if (p(i, {
      transition: "all 0 linear",
      transform: `translate3d(${o}%, 0, 0)`
    }), !this.options.showSpinner) {
      const l = e.querySelector(this.spinnerSelector);
      l && b(l);
    }
    return n != document.body && y(n, this.customParentClassName), n && n.appendChild(e), e;
  }
  set(t) {
    const e = this.isStarted();
    t = m(t, this.options.minimum, 1), this.setPercent(t === 1 ? null : t);
    const i = this.render(!e), o = i.querySelector(this.barSelector), n = this.options.speed, l = this.options.easing;
    return a.progressOffsetWidth = i.offsetWidth, O((r) => {
      this.positionUsing === "" && (this.positionUsing = this.getPositioningCSS()), p(o, this.barPositionCSS(t, n, l)), t === 1 ? (p(i, {
        transition: "none",
        opacity: 1
      }), a.progressOffsetWidth = i.offsetWidth, setTimeout(() => {
        p(i, {
          transition: `all ${n}ms linear`,
          opacity: 0
        }), setTimeout(() => {
          this.remove(), r();
        }, n);
      }, n)) : setTimeout(r, n);
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
    S(document.documentElement, this.busyFlagClassName);
    const t = typeof this.options.appendTo == "string" ? document.querySelector(this.options.appendTo) : this.options.appendTo;
    S(t, this.customParentClassName);
    const e = document.getElementById(this.options.wrapperSelectorId);
    e && b(e);
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
  barPositionCSS(t, e, i) {
    let o = {};
    return this.positionUsing === "translate3d" ? o = { transform: `translate3d(${h(t)}%,0,0)` } : this.positionUsing === "translate" ? o = { transform: `translate(${h(t)}%,0)` } : o = { "margin-left": `${h(t)}%` }, o.transition = `all ${e}ms ${i} 0s`, o;
  }
  getPositioningCSS() {
    const t = document.body.style, e = "WebkitTransform" in t ? "Webkit" : "MozTransform" in t ? "Moz" : "msTransform" in t ? "ms" : "OTransform" in t ? "O" : "";
    return e + "Perspective" in t ? "translate3d" : e + "Transform" in t ? "translate" : "margin";
  }
  static createProgress(t) {
    return a.instance || (a.instance = new a(t)), a.instance;
  }
};
let d = a;
c(d, "instance"), c(d, "progressOffsetWidth", 0);
const E = function(s) {
  return d.createProgress(s);
};
export {
  d as Trickling,
  E as createTrickling
};
