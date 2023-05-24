var n = Object.defineProperty;
var c = (o, s, r) => s in o ? n(o, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[s] = r;
var e = (o, s, r) => (c(o, typeof s != "symbol" ? s + "" : s, r), r);
const i = "0.1.0";
class v {
  constructor() {
    e(this, "version", i);
  }
}
export {
  v as OProgress
};
