var P = Object.defineProperty;
var w = (e, t, s) => t in e ? P(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var a = (e, t, s) => (w(e, typeof t != "symbol" ? t + "" : t, s), s);
function g(e, t, s) {
  return e < t ? t : e > s ? s : e;
}
function u(e) {
  return ((-1 + e) * 100).toFixed(4);
}
function d(e, t) {
  const o = (e.getAttribute("style") || "").split(";").filter((r) => !!r.trim()).reduce((r, p) => {
    const m = p.split(":").map((k) => k.trim()), C = m[0], T = m[1];
    return r[C] = T, r;
  }, {}), n = Object.assign(o, t), l = Object.keys(n).filter((r) => !!r.trim()).reduce((r, p) => (r += `${p}: ${n[p]};`, r), "");
  e.setAttribute("style", l);
}
const N = () => {
  const e = [];
  function t() {
    const s = e.shift();
    s && s(t);
  }
  return function(s) {
    e.push(s), e.length == 1 && t();
  };
}, E = N();
function v(e, t) {
  return (typeof e == "string" ? e : f(e)).indexOf(" " + t + " ") >= 0;
}
function S(e, t) {
  const s = f(e), i = s + t;
  v(s, t) || (e.className = i.substring(1));
}
function y(e, t) {
  const s = f(e);
  if (!v(e, t))
    return;
  const i = s.replace(" " + t + " ", " ");
  e.className = i.substring(1, i.length - 1);
}
function f(e) {
  return (" " + (e && e.className || "") + " ").replace(
    /\s+/gi,
    " "
  );
}
function b(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
const c = class {
  constructor(t) {
    a(this, "template", `
    <div class="bar" role="bar">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon"></div>
    </div>`);
    a(this, "barSelector", '[role="bar"]');
    a(this, "spinnerSelector", '[role="spinner"]');
    a(this, "busyFlagClassName", "trickling-busy");
    a(this, "customParentClassName", "trickling-custom-parent");
    a(this, "status", null);
    a(this, "progressOffsetWidth", 0);
    a(this, "positionUsing", "");
    a(this, "options", {
      speed: 200,
      wrapperSelectorId: "trickling",
      appendTo: "body",
      minimum: 0.08,
      easing: "ease",
      showSpinner: !0,
      trickleSpeed: 1e3,
      trickle: !0
    });
    this.options = Object.assign(this.options, t), this.status = null;
  }
  render(t) {
    if (this.isRendered())
      return document.getElementById(
        this.options.wrapperSelectorId
      );
    S(document.documentElement, this.busyFlagClassName);
    const s = document.createElement("div");
    s.id = this.options.wrapperSelectorId, s.innerHTML = this.template;
    const i = s.querySelector(this.barSelector), o = t ? "-100" : u(this.status || 0), n = typeof this.options.appendTo == "string" ? document.querySelector(this.options.appendTo) : this.options.appendTo;
    if (d(i, {
      transition: "all 0 linear",
      transform: `translate3d(${o}%, 0, 0)`
    }), !this.options.showSpinner) {
      const l = s.querySelector(this.spinnerSelector);
      l && b(l);
    }
    return n != document.body && S(n, this.customParentClassName), n && n.appendChild(s), s;
  }
  set(t) {
    const s = this.isStarted();
    t = g(t, this.options.minimum, 1), this.status = t === 1 ? null : t;
    const i = this.render(!s), o = i.querySelector(this.barSelector), n = this.options.speed, l = this.options.easing;
    return this.progressOffsetWidth = i.offsetWidth, E((r) => {
      this.positionUsing === "" && (this.positionUsing = this.getPositioningCSS()), d(o, this.barPositionCSS(t, n, l)), t === 1 ? (d(i, {
        transition: "none",
        opacity: 1
      }), this.progressOffsetWidth = i.offsetWidth, setTimeout(() => {
        d(i, {
          transition: `all ${n}ms linear`,
          opacity: 0
        }), setTimeout(() => {
          this.remove(), r();
        }, n);
      }, n)) : setTimeout(r, n);
    }), this;
  }
  inc(t) {
    let s = this.status;
    return s ? s > 1 ? this : (typeof t != "number" && (s >= 0 && s < 0.2 ? t = 0.1 : s >= 0.2 && s < 0.5 ? t = 0.04 : s >= 0.5 && s < 0.8 ? t = 0.02 : s >= 0.8 && s < 0.99 ? t = 5e-3 : t = 0), s = g(s + t, 0, 0.994), this.set(s)) : this.start();
  }
  trickle() {
    return this.inc();
  }
  start() {
    this.status || this.set(0);
    const t = () => {
      setTimeout(() => {
        this.status && (this.trickle(), t());
      }, this.options.trickleSpeed);
    };
    return this.options.trickle && t(), this;
  }
  done(t) {
    var s;
    return !t && !this.status ? this : (s = this.inc(0.3 + 0.5 * Math.random())) == null ? void 0 : s.set(1);
  }
  remove() {
    y(document.documentElement, this.busyFlagClassName);
    const t = typeof this.options.appendTo == "string" ? document.querySelector(this.options.appendTo) : this.options.appendTo;
    y(t, this.customParentClassName);
    const s = document.getElementById(this.options.wrapperSelectorId);
    s && b(s);
  }
  isRendered() {
    return !!document.getElementById(this.options.wrapperSelectorId);
  }
  isStarted() {
    return typeof this.status == "number";
  }
  barPositionCSS(t, s, i) {
    let o = {};
    return this.positionUsing === "translate3d" ? o = { transform: `translate3d(${u(t)}%,0,0)` } : this.positionUsing === "translate" ? o = { transform: `translate(${u(t)}%,0)` } : o = { "margin-left": `${u(t)}%` }, o.transition = `all ${s}ms ${i} 0s`, o;
  }
  getPositioningCSS() {
    const t = document.body.style, s = "WebkitTransform" in t ? "Webkit" : "MozTransform" in t ? "Moz" : "msTransform" in t ? "ms" : "OTransform" in t ? "O" : "";
    return s + "Perspective" in t ? "translate3d" : s + "Transform" in t ? "translate" : "margin";
  }
  static createProgress(t) {
    return c.instance || (c.instance = new c(t)), c.instance;
  }
};
let h = c;
a(h, "instance");
const $ = function(e) {
  return h.createProgress(e);
};
export {
  h as Trickling,
  $ as createTrickling
};
