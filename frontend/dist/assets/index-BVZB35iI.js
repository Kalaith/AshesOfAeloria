(function () {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) o(c);
  new MutationObserver((c) => {
    for (const f of c)
      if (f.type === "childList")
        for (const d of f.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && o(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(c) {
    const f = {};
    return (
      c.integrity && (f.integrity = c.integrity),
      c.referrerPolicy && (f.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === "use-credentials"
        ? (f.credentials = "include")
        : c.crossOrigin === "anonymous"
          ? (f.credentials = "omit")
          : (f.credentials = "same-origin"),
      f
    );
  }
  function o(c) {
    if (c.ep) return;
    c.ep = !0;
    const f = l(c);
    fetch(c.href, f);
  }
})();
function Sp(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default")
    ? a.default
    : a;
}
var Ru = { exports: {} },
  cs = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Km;
function Nx() {
  if (Km) return cs;
  Km = 1;
  var a = Symbol.for("react.transitional.element"),
    s = Symbol.for("react.fragment");
  function l(o, c, f) {
    var d = null;
    if (
      (f !== void 0 && (d = "" + f),
      c.key !== void 0 && (d = "" + c.key),
      "key" in c)
    ) {
      f = {};
      for (var m in c) m !== "key" && (f[m] = c[m]);
    } else f = c;
    return (
      (c = f.ref),
      { $$typeof: a, type: o, key: d, ref: c !== void 0 ? c : null, props: f }
    );
  }
  return ((cs.Fragment = s), (cs.jsx = l), (cs.jsxs = l), cs);
}
var Qm;
function Dx() {
  return (Qm || ((Qm = 1), (Ru.exports = Nx())), Ru.exports);
}
var x = Dx(),
  ju = { exports: {} },
  rt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pm;
function Rx() {
  if (Pm) return rt;
  Pm = 1;
  var a = Symbol.for("react.transitional.element"),
    s = Symbol.for("react.portal"),
    l = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    c = Symbol.for("react.profiler"),
    f = Symbol.for("react.consumer"),
    d = Symbol.for("react.context"),
    m = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    g = Symbol.for("react.memo"),
    y = Symbol.for("react.lazy"),
    b = Symbol.iterator;
  function S(A) {
    return A === null || typeof A != "object"
      ? null
      : ((A = (b && A[b]) || A["@@iterator"]),
        typeof A == "function" ? A : null);
  }
  var M = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    U = Object.assign,
    V = {};
  function w(A, H, J) {
    ((this.props = A),
      (this.context = H),
      (this.refs = V),
      (this.updater = J || M));
  }
  ((w.prototype.isReactComponent = {}),
    (w.prototype.setState = function (A, H) {
      if (typeof A != "object" && typeof A != "function" && A != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, A, H, "setState");
    }),
    (w.prototype.forceUpdate = function (A) {
      this.updater.enqueueForceUpdate(this, A, "forceUpdate");
    }));
  function k() {}
  k.prototype = w.prototype;
  function Z(A, H, J) {
    ((this.props = A),
      (this.context = H),
      (this.refs = V),
      (this.updater = J || M));
  }
  var C = (Z.prototype = new k());
  ((C.constructor = Z), U(C, w.prototype), (C.isPureReactComponent = !0));
  var q = Array.isArray,
    G = { H: null, A: null, T: null, S: null, V: null },
    Q = Object.prototype.hasOwnProperty;
  function W(A, H, J, P, tt, yt) {
    return (
      (J = yt.ref),
      { $$typeof: a, type: A, key: H, ref: J !== void 0 ? J : null, props: yt }
    );
  }
  function F(A, H) {
    return W(A.type, H, void 0, void 0, void 0, A.props);
  }
  function ot(A) {
    return typeof A == "object" && A !== null && A.$$typeof === a;
  }
  function bt(A) {
    var H = { "=": "=0", ":": "=2" };
    return (
      "$" +
      A.replace(/[=:]/g, function (J) {
        return H[J];
      })
    );
  }
  var Nt = /\/+/g;
  function mt(A, H) {
    return typeof A == "object" && A !== null && A.key != null
      ? bt("" + A.key)
      : H.toString(36);
  }
  function Ft() {}
  function Zt(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (
          (typeof A.status == "string"
            ? A.then(Ft, Ft)
            : ((A.status = "pending"),
              A.then(
                function (H) {
                  A.status === "pending" &&
                    ((A.status = "fulfilled"), (A.value = H));
                },
                function (H) {
                  A.status === "pending" &&
                    ((A.status = "rejected"), (A.reason = H));
                },
              )),
          A.status)
        ) {
          case "fulfilled":
            return A.value;
          case "rejected":
            throw A.reason;
        }
    }
    throw A;
  }
  function ft(A, H, J, P, tt) {
    var yt = typeof A;
    (yt === "undefined" || yt === "boolean") && (A = null);
    var lt = !1;
    if (A === null) lt = !0;
    else
      switch (yt) {
        case "bigint":
        case "string":
        case "number":
          lt = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case a:
            case s:
              lt = !0;
              break;
            case y:
              return ((lt = A._init), ft(lt(A._payload), H, J, P, tt));
          }
      }
    if (lt)
      return (
        (tt = tt(A)),
        (lt = P === "" ? "." + mt(A, 0) : P),
        q(tt)
          ? ((J = ""),
            lt != null && (J = lt.replace(Nt, "$&/") + "/"),
            ft(tt, H, J, "", function (mn) {
              return mn;
            }))
          : tt != null &&
            (ot(tt) &&
              (tt = F(
                tt,
                J +
                  (tt.key == null || (A && A.key === tt.key)
                    ? ""
                    : ("" + tt.key).replace(Nt, "$&/") + "/") +
                  lt,
              )),
            H.push(tt)),
        1
      );
    lt = 0;
    var me = P === "" ? "." : P + ":";
    if (q(A))
      for (var Rt = 0; Rt < A.length; Rt++)
        ((P = A[Rt]), (yt = me + mt(P, Rt)), (lt += ft(P, H, J, yt, tt)));
    else if (((Rt = S(A)), typeof Rt == "function"))
      for (A = Rt.call(A), Rt = 0; !(P = A.next()).done; )
        ((P = P.value), (yt = me + mt(P, Rt++)), (lt += ft(P, H, J, yt, tt)));
    else if (yt === "object") {
      if (typeof A.then == "function") return ft(Zt(A), H, J, P, tt);
      throw (
        (H = String(A)),
        Error(
          "Objects are not valid as a React child (found: " +
            (H === "[object Object]"
              ? "object with keys {" + Object.keys(A).join(", ") + "}"
              : H) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return lt;
  }
  function z(A, H, J) {
    if (A == null) return A;
    var P = [],
      tt = 0;
    return (
      ft(A, P, "", "", function (yt) {
        return H.call(J, yt, tt++);
      }),
      P
    );
  }
  function B(A) {
    if (A._status === -1) {
      var H = A._result;
      ((H = H()),
        H.then(
          function (J) {
            (A._status === 0 || A._status === -1) &&
              ((A._status = 1), (A._result = J));
          },
          function (J) {
            (A._status === 0 || A._status === -1) &&
              ((A._status = 2), (A._result = J));
          },
        ),
        A._status === -1 && ((A._status = 0), (A._result = H)));
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var K =
    typeof reportError == "function"
      ? reportError
      : function (A) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var H = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof A == "object" &&
                A !== null &&
                typeof A.message == "string"
                  ? String(A.message)
                  : String(A),
              error: A,
            });
            if (!window.dispatchEvent(H)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", A);
            return;
          }
          console.error(A);
        };
  function st() {}
  return (
    (rt.Children = {
      map: z,
      forEach: function (A, H, J) {
        z(
          A,
          function () {
            H.apply(this, arguments);
          },
          J,
        );
      },
      count: function (A) {
        var H = 0;
        return (
          z(A, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (A) {
        return (
          z(A, function (H) {
            return H;
          }) || []
        );
      },
      only: function (A) {
        if (!ot(A))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return A;
      },
    }),
    (rt.Component = w),
    (rt.Fragment = l),
    (rt.Profiler = c),
    (rt.PureComponent = Z),
    (rt.StrictMode = o),
    (rt.Suspense = p),
    (rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G),
    (rt.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (A) {
        return G.H.useMemoCache(A);
      },
    }),
    (rt.cache = function (A) {
      return function () {
        return A.apply(null, arguments);
      };
    }),
    (rt.cloneElement = function (A, H, J) {
      if (A == null)
        throw Error(
          "The argument must be a React element, but you passed " + A + ".",
        );
      var P = U({}, A.props),
        tt = A.key,
        yt = void 0;
      if (H != null)
        for (lt in (H.ref !== void 0 && (yt = void 0),
        H.key !== void 0 && (tt = "" + H.key),
        H))
          !Q.call(H, lt) ||
            lt === "key" ||
            lt === "__self" ||
            lt === "__source" ||
            (lt === "ref" && H.ref === void 0) ||
            (P[lt] = H[lt]);
      var lt = arguments.length - 2;
      if (lt === 1) P.children = J;
      else if (1 < lt) {
        for (var me = Array(lt), Rt = 0; Rt < lt; Rt++)
          me[Rt] = arguments[Rt + 2];
        P.children = me;
      }
      return W(A.type, tt, void 0, void 0, yt, P);
    }),
    (rt.createContext = function (A) {
      return (
        (A = {
          $$typeof: d,
          _currentValue: A,
          _currentValue2: A,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (A.Provider = A),
        (A.Consumer = { $$typeof: f, _context: A }),
        A
      );
    }),
    (rt.createElement = function (A, H, J) {
      var P,
        tt = {},
        yt = null;
      if (H != null)
        for (P in (H.key !== void 0 && (yt = "" + H.key), H))
          Q.call(H, P) &&
            P !== "key" &&
            P !== "__self" &&
            P !== "__source" &&
            (tt[P] = H[P]);
      var lt = arguments.length - 2;
      if (lt === 1) tt.children = J;
      else if (1 < lt) {
        for (var me = Array(lt), Rt = 0; Rt < lt; Rt++)
          me[Rt] = arguments[Rt + 2];
        tt.children = me;
      }
      if (A && A.defaultProps)
        for (P in ((lt = A.defaultProps), lt))
          tt[P] === void 0 && (tt[P] = lt[P]);
      return W(A, yt, void 0, void 0, null, tt);
    }),
    (rt.createRef = function () {
      return { current: null };
    }),
    (rt.forwardRef = function (A) {
      return { $$typeof: m, render: A };
    }),
    (rt.isValidElement = ot),
    (rt.lazy = function (A) {
      return { $$typeof: y, _payload: { _status: -1, _result: A }, _init: B };
    }),
    (rt.memo = function (A, H) {
      return { $$typeof: g, type: A, compare: H === void 0 ? null : H };
    }),
    (rt.startTransition = function (A) {
      var H = G.T,
        J = {};
      G.T = J;
      try {
        var P = A(),
          tt = G.S;
        (tt !== null && tt(J, P),
          typeof P == "object" &&
            P !== null &&
            typeof P.then == "function" &&
            P.then(st, K));
      } catch (yt) {
        K(yt);
      } finally {
        G.T = H;
      }
    }),
    (rt.unstable_useCacheRefresh = function () {
      return G.H.useCacheRefresh();
    }),
    (rt.use = function (A) {
      return G.H.use(A);
    }),
    (rt.useActionState = function (A, H, J) {
      return G.H.useActionState(A, H, J);
    }),
    (rt.useCallback = function (A, H) {
      return G.H.useCallback(A, H);
    }),
    (rt.useContext = function (A) {
      return G.H.useContext(A);
    }),
    (rt.useDebugValue = function () {}),
    (rt.useDeferredValue = function (A, H) {
      return G.H.useDeferredValue(A, H);
    }),
    (rt.useEffect = function (A, H, J) {
      var P = G.H;
      if (typeof J == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React.",
        );
      return P.useEffect(A, H);
    }),
    (rt.useId = function () {
      return G.H.useId();
    }),
    (rt.useImperativeHandle = function (A, H, J) {
      return G.H.useImperativeHandle(A, H, J);
    }),
    (rt.useInsertionEffect = function (A, H) {
      return G.H.useInsertionEffect(A, H);
    }),
    (rt.useLayoutEffect = function (A, H) {
      return G.H.useLayoutEffect(A, H);
    }),
    (rt.useMemo = function (A, H) {
      return G.H.useMemo(A, H);
    }),
    (rt.useOptimistic = function (A, H) {
      return G.H.useOptimistic(A, H);
    }),
    (rt.useReducer = function (A, H, J) {
      return G.H.useReducer(A, H, J);
    }),
    (rt.useRef = function (A) {
      return G.H.useRef(A);
    }),
    (rt.useState = function (A) {
      return G.H.useState(A);
    }),
    (rt.useSyncExternalStore = function (A, H, J) {
      return G.H.useSyncExternalStore(A, H, J);
    }),
    (rt.useTransition = function () {
      return G.H.useTransition();
    }),
    (rt.version = "19.1.0"),
    rt
  );
}
var Jm;
function pc() {
  return (Jm || ((Jm = 1), (ju.exports = Rx())), ju.exports);
}
var X = pc();
const Pu = Sp(X);
var Ou = { exports: {} },
  fs = {},
  wu = { exports: {} },
  Vu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fm;
function jx() {
  return (
    Fm ||
      ((Fm = 1),
      (function (a) {
        function s(z, B) {
          var K = z.length;
          z.push(B);
          t: for (; 0 < K; ) {
            var st = (K - 1) >>> 1,
              A = z[st];
            if (0 < c(A, B)) ((z[st] = B), (z[K] = A), (K = st));
            else break t;
          }
        }
        function l(z) {
          return z.length === 0 ? null : z[0];
        }
        function o(z) {
          if (z.length === 0) return null;
          var B = z[0],
            K = z.pop();
          if (K !== B) {
            z[0] = K;
            t: for (var st = 0, A = z.length, H = A >>> 1; st < H; ) {
              var J = 2 * (st + 1) - 1,
                P = z[J],
                tt = J + 1,
                yt = z[tt];
              if (0 > c(P, K))
                tt < A && 0 > c(yt, P)
                  ? ((z[st] = yt), (z[tt] = K), (st = tt))
                  : ((z[st] = P), (z[J] = K), (st = J));
              else if (tt < A && 0 > c(yt, K))
                ((z[st] = yt), (z[tt] = K), (st = tt));
              else break t;
            }
          }
          return B;
        }
        function c(z, B) {
          var K = z.sortIndex - B.sortIndex;
          return K !== 0 ? K : z.id - B.id;
        }
        if (
          ((a.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var f = performance;
          a.unstable_now = function () {
            return f.now();
          };
        } else {
          var d = Date,
            m = d.now();
          a.unstable_now = function () {
            return d.now() - m;
          };
        }
        var p = [],
          g = [],
          y = 1,
          b = null,
          S = 3,
          M = !1,
          U = !1,
          V = !1,
          w = !1,
          k = typeof setTimeout == "function" ? setTimeout : null,
          Z = typeof clearTimeout == "function" ? clearTimeout : null,
          C = typeof setImmediate < "u" ? setImmediate : null;
        function q(z) {
          for (var B = l(g); B !== null; ) {
            if (B.callback === null) o(g);
            else if (B.startTime <= z)
              (o(g), (B.sortIndex = B.expirationTime), s(p, B));
            else break;
            B = l(g);
          }
        }
        function G(z) {
          if (((V = !1), q(z), !U))
            if (l(p) !== null) ((U = !0), Q || ((Q = !0), mt()));
            else {
              var B = l(g);
              B !== null && ft(G, B.startTime - z);
            }
        }
        var Q = !1,
          W = -1,
          F = 5,
          ot = -1;
        function bt() {
          return w ? !0 : !(a.unstable_now() - ot < F);
        }
        function Nt() {
          if (((w = !1), Q)) {
            var z = a.unstable_now();
            ot = z;
            var B = !0;
            try {
              t: {
                ((U = !1), V && ((V = !1), Z(W), (W = -1)), (M = !0));
                var K = S;
                try {
                  e: {
                    for (
                      q(z), b = l(p);
                      b !== null && !(b.expirationTime > z && bt());
                    ) {
                      var st = b.callback;
                      if (typeof st == "function") {
                        ((b.callback = null), (S = b.priorityLevel));
                        var A = st(b.expirationTime <= z);
                        if (((z = a.unstable_now()), typeof A == "function")) {
                          ((b.callback = A), q(z), (B = !0));
                          break e;
                        }
                        (b === l(p) && o(p), q(z));
                      } else o(p);
                      b = l(p);
                    }
                    if (b !== null) B = !0;
                    else {
                      var H = l(g);
                      (H !== null && ft(G, H.startTime - z), (B = !1));
                    }
                  }
                  break t;
                } finally {
                  ((b = null), (S = K), (M = !1));
                }
                B = void 0;
              }
            } finally {
              B ? mt() : (Q = !1);
            }
          }
        }
        var mt;
        if (typeof C == "function")
          mt = function () {
            C(Nt);
          };
        else if (typeof MessageChannel < "u") {
          var Ft = new MessageChannel(),
            Zt = Ft.port2;
          ((Ft.port1.onmessage = Nt),
            (mt = function () {
              Zt.postMessage(null);
            }));
        } else
          mt = function () {
            k(Nt, 0);
          };
        function ft(z, B) {
          W = k(function () {
            z(a.unstable_now());
          }, B);
        }
        ((a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (z) {
            z.callback = null;
          }),
          (a.unstable_forceFrameRate = function (z) {
            0 > z || 125 < z
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (F = 0 < z ? Math.floor(1e3 / z) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return S;
          }),
          (a.unstable_next = function (z) {
            switch (S) {
              case 1:
              case 2:
              case 3:
                var B = 3;
                break;
              default:
                B = S;
            }
            var K = S;
            S = B;
            try {
              return z();
            } finally {
              S = K;
            }
          }),
          (a.unstable_requestPaint = function () {
            w = !0;
          }),
          (a.unstable_runWithPriority = function (z, B) {
            switch (z) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                z = 3;
            }
            var K = S;
            S = z;
            try {
              return B();
            } finally {
              S = K;
            }
          }),
          (a.unstable_scheduleCallback = function (z, B, K) {
            var st = a.unstable_now();
            switch (
              (typeof K == "object" && K !== null
                ? ((K = K.delay),
                  (K = typeof K == "number" && 0 < K ? st + K : st))
                : (K = st),
              z)
            ) {
              case 1:
                var A = -1;
                break;
              case 2:
                A = 250;
                break;
              case 5:
                A = 1073741823;
                break;
              case 4:
                A = 1e4;
                break;
              default:
                A = 5e3;
            }
            return (
              (A = K + A),
              (z = {
                id: y++,
                callback: B,
                priorityLevel: z,
                startTime: K,
                expirationTime: A,
                sortIndex: -1,
              }),
              K > st
                ? ((z.sortIndex = K),
                  s(g, z),
                  l(p) === null &&
                    z === l(g) &&
                    (V ? (Z(W), (W = -1)) : (V = !0), ft(G, K - st)))
                : ((z.sortIndex = A),
                  s(p, z),
                  U || M || ((U = !0), Q || ((Q = !0), mt()))),
              z
            );
          }),
          (a.unstable_shouldYield = bt),
          (a.unstable_wrapCallback = function (z) {
            var B = S;
            return function () {
              var K = S;
              S = B;
              try {
                return z.apply(this, arguments);
              } finally {
                S = K;
              }
            };
          }));
      })(Vu)),
    Vu
  );
}
var $m;
function Ox() {
  return ($m || (($m = 1), (wu.exports = jx())), wu.exports);
}
var zu = { exports: {} },
  ie = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wm;
function wx() {
  if (Wm) return ie;
  Wm = 1;
  var a = pc();
  function s(p) {
    var g = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        g += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return (
      "Minified React error #" +
      p +
      "; visit " +
      g +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function l() {}
  var o = {
      d: {
        f: l,
        r: function () {
          throw Error(s(522));
        },
        D: l,
        C: l,
        L: l,
        m: l,
        X: l,
        S: l,
        M: l,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for("react.portal");
  function f(p, g, y) {
    var b =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: b == null ? null : "" + b,
      children: p,
      containerInfo: g,
      implementation: y,
    };
  }
  var d = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(p, g) {
    if (p === "font") return "";
    if (typeof g == "string") return g === "use-credentials" ? g : "";
  }
  return (
    (ie.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (ie.createPortal = function (p, g) {
      var y =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11))
        throw Error(s(299));
      return f(p, g, null, y);
    }),
    (ie.flushSync = function (p) {
      var g = d.T,
        y = o.p;
      try {
        if (((d.T = null), (o.p = 2), p)) return p();
      } finally {
        ((d.T = g), (o.p = y), o.d.f());
      }
    }),
    (ie.preconnect = function (p, g) {
      typeof p == "string" &&
        (g
          ? ((g = g.crossOrigin),
            (g =
              typeof g == "string"
                ? g === "use-credentials"
                  ? g
                  : ""
                : void 0))
          : (g = null),
        o.d.C(p, g));
    }),
    (ie.prefetchDNS = function (p) {
      typeof p == "string" && o.d.D(p);
    }),
    (ie.preinit = function (p, g) {
      if (typeof p == "string" && g && typeof g.as == "string") {
        var y = g.as,
          b = m(y, g.crossOrigin),
          S = typeof g.integrity == "string" ? g.integrity : void 0,
          M = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
        y === "style"
          ? o.d.S(p, typeof g.precedence == "string" ? g.precedence : void 0, {
              crossOrigin: b,
              integrity: S,
              fetchPriority: M,
            })
          : y === "script" &&
            o.d.X(p, {
              crossOrigin: b,
              integrity: S,
              fetchPriority: M,
              nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            });
      }
    }),
    (ie.preinitModule = function (p, g) {
      if (typeof p == "string")
        if (typeof g == "object" && g !== null) {
          if (g.as == null || g.as === "script") {
            var y = m(g.as, g.crossOrigin);
            o.d.M(p, {
              crossOrigin: y,
              integrity: typeof g.integrity == "string" ? g.integrity : void 0,
              nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            });
          }
        } else g == null && o.d.M(p);
    }),
    (ie.preload = function (p, g) {
      if (
        typeof p == "string" &&
        typeof g == "object" &&
        g !== null &&
        typeof g.as == "string"
      ) {
        var y = g.as,
          b = m(y, g.crossOrigin);
        o.d.L(p, y, {
          crossOrigin: b,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          type: typeof g.type == "string" ? g.type : void 0,
          fetchPriority:
            typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
          referrerPolicy:
            typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
          imageSrcSet:
            typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
          imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
          media: typeof g.media == "string" ? g.media : void 0,
        });
      }
    }),
    (ie.preloadModule = function (p, g) {
      if (typeof p == "string")
        if (g) {
          var y = m(g.as, g.crossOrigin);
          o.d.m(p, {
            as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
            crossOrigin: y,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          });
        } else o.d.m(p);
    }),
    (ie.requestFormReset = function (p) {
      o.d.r(p);
    }),
    (ie.unstable_batchedUpdates = function (p, g) {
      return p(g);
    }),
    (ie.useFormState = function (p, g, y) {
      return d.H.useFormState(p, g, y);
    }),
    (ie.useFormStatus = function () {
      return d.H.useHostTransitionStatus();
    }),
    (ie.version = "19.1.0"),
    ie
  );
}
var Im;
function Tp() {
  if (Im) return zu.exports;
  Im = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (s) {
        console.error(s);
      }
  }
  return (a(), (zu.exports = wx()), zu.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var tg;
function Vx() {
  if (tg) return fs;
  tg = 1;
  var a = Ox(),
    s = pc(),
    l = Tp();
  function o(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      e +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function c(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function f(t) {
    var e = t,
      n = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do ((e = t), (e.flags & 4098) !== 0 && (n = e.return), (t = e.return));
      while (t);
    }
    return e.tag === 3 ? n : null;
  }
  function d(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated;
    }
    return null;
  }
  function m(t) {
    if (f(t) !== t) throw Error(o(188));
  }
  function p(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = f(t)), e === null)) throw Error(o(188));
      return e !== t ? null : t;
    }
    for (var n = t, i = e; ; ) {
      var r = n.return;
      if (r === null) break;
      var u = r.alternate;
      if (u === null) {
        if (((i = r.return), i !== null)) {
          n = i;
          continue;
        }
        break;
      }
      if (r.child === u.child) {
        for (u = r.child; u; ) {
          if (u === n) return (m(r), t);
          if (u === i) return (m(r), e);
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (n.return !== i.return) ((n = r), (i = u));
      else {
        for (var h = !1, v = r.child; v; ) {
          if (v === n) {
            ((h = !0), (n = r), (i = u));
            break;
          }
          if (v === i) {
            ((h = !0), (i = r), (n = u));
            break;
          }
          v = v.sibling;
        }
        if (!h) {
          for (v = u.child; v; ) {
            if (v === n) {
              ((h = !0), (n = u), (i = r));
              break;
            }
            if (v === i) {
              ((h = !0), (i = u), (n = r));
              break;
            }
            v = v.sibling;
          }
          if (!h) throw Error(o(189));
        }
      }
      if (n.alternate !== i) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
    return n.stateNode.current === n ? t : e;
  }
  function g(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = g(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var y = Object.assign,
    b = Symbol.for("react.element"),
    S = Symbol.for("react.transitional.element"),
    M = Symbol.for("react.portal"),
    U = Symbol.for("react.fragment"),
    V = Symbol.for("react.strict_mode"),
    w = Symbol.for("react.profiler"),
    k = Symbol.for("react.provider"),
    Z = Symbol.for("react.consumer"),
    C = Symbol.for("react.context"),
    q = Symbol.for("react.forward_ref"),
    G = Symbol.for("react.suspense"),
    Q = Symbol.for("react.suspense_list"),
    W = Symbol.for("react.memo"),
    F = Symbol.for("react.lazy"),
    ot = Symbol.for("react.activity"),
    bt = Symbol.for("react.memo_cache_sentinel"),
    Nt = Symbol.iterator;
  function mt(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (Nt && t[Nt]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var Ft = Symbol.for("react.client.reference");
  function Zt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Ft ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case U:
        return "Fragment";
      case w:
        return "Profiler";
      case V:
        return "StrictMode";
      case G:
        return "Suspense";
      case Q:
        return "SuspenseList";
      case ot:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case M:
          return "Portal";
        case C:
          return (t.displayName || "Context") + ".Provider";
        case Z:
          return (t._context.displayName || "Context") + ".Consumer";
        case q:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case W:
          return (
            (e = t.displayName || null),
            e !== null ? e : Zt(t.type) || "Memo"
          );
        case F:
          ((e = t._payload), (t = t._init));
          try {
            return Zt(t(e));
          } catch {}
      }
    return null;
  }
  var ft = Array.isArray,
    z = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    B = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    K = { pending: !1, data: null, method: null, action: null },
    st = [],
    A = -1;
  function H(t) {
    return { current: t };
  }
  function J(t) {
    0 > A || ((t.current = st[A]), (st[A] = null), A--);
  }
  function P(t, e) {
    (A++, (st[A] = t.current), (t.current = e));
  }
  var tt = H(null),
    yt = H(null),
    lt = H(null),
    me = H(null);
  function Rt(t, e) {
    switch ((P(lt, e), P(yt, t), P(tt, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? bm(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI)))
          ((e = bm(e)), (t = Sm(e, t)));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    (J(tt), P(tt, t));
  }
  function mn() {
    (J(tt), J(yt), J(lt));
  }
  function hr(t) {
    t.memoizedState !== null && P(me, t);
    var e = tt.current,
      n = Sm(e, t.type);
    e !== n && (P(yt, t), P(tt, n));
  }
  function ws(t) {
    (yt.current === t && (J(tt), J(yt)),
      me.current === t && (J(me), (ss._currentValue = K)));
  }
  var mr = Object.prototype.hasOwnProperty,
    gr = a.unstable_scheduleCallback,
    pr = a.unstable_cancelCallback,
    s0 = a.unstable_shouldYield,
    l0 = a.unstable_requestPaint,
    Ye = a.unstable_now,
    r0 = a.unstable_getCurrentPriorityLevel,
    Ic = a.unstable_ImmediatePriority,
    tf = a.unstable_UserBlockingPriority,
    Vs = a.unstable_NormalPriority,
    o0 = a.unstable_LowPriority,
    ef = a.unstable_IdlePriority,
    u0 = a.log,
    c0 = a.unstable_setDisableYieldValue,
    hi = null,
    ge = null;
  function gn(t) {
    if (
      (typeof u0 == "function" && c0(t),
      ge && typeof ge.setStrictMode == "function")
    )
      try {
        ge.setStrictMode(hi, t);
      } catch {}
  }
  var pe = Math.clz32 ? Math.clz32 : h0,
    f0 = Math.log,
    d0 = Math.LN2;
  function h0(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((f0(t) / d0) | 0)) | 0);
  }
  var zs = 256,
    _s = 4194304;
  function Xn(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Us(t, e, n) {
    var i = t.pendingLanes;
    if (i === 0) return 0;
    var r = 0,
      u = t.suspendedLanes,
      h = t.pingedLanes;
    t = t.warmLanes;
    var v = i & 134217727;
    return (
      v !== 0
        ? ((i = v & ~u),
          i !== 0
            ? (r = Xn(i))
            : ((h &= v),
              h !== 0
                ? (r = Xn(h))
                : n || ((n = v & ~t), n !== 0 && (r = Xn(n)))))
        : ((v = i & ~u),
          v !== 0
            ? (r = Xn(v))
            : h !== 0
              ? (r = Xn(h))
              : n || ((n = i & ~t), n !== 0 && (r = Xn(n)))),
      r === 0
        ? 0
        : e !== 0 &&
            e !== r &&
            (e & u) === 0 &&
            ((u = r & -r),
            (n = e & -e),
            u >= n || (u === 32 && (n & 4194048) !== 0))
          ? e
          : r
    );
  }
  function mi(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function m0(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function nf() {
    var t = zs;
    return ((zs <<= 1), (zs & 4194048) === 0 && (zs = 256), t);
  }
  function af() {
    var t = _s;
    return ((_s <<= 1), (_s & 62914560) === 0 && (_s = 4194304), t);
  }
  function yr(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function gi(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function g0(t, e, n, i, r, u) {
    var h = t.pendingLanes;
    ((t.pendingLanes = n),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= n),
      (t.entangledLanes &= n),
      (t.errorRecoveryDisabledLanes &= n),
      (t.shellSuspendCounter = 0));
    var v = t.entanglements,
      T = t.expirationTimes,
      R = t.hiddenUpdates;
    for (n = h & ~n; 0 < n; ) {
      var _ = 31 - pe(n),
        Y = 1 << _;
      ((v[_] = 0), (T[_] = -1));
      var j = R[_];
      if (j !== null)
        for (R[_] = null, _ = 0; _ < j.length; _++) {
          var O = j[_];
          O !== null && (O.lane &= -536870913);
        }
      n &= ~Y;
    }
    (i !== 0 && sf(t, i, 0),
      u !== 0 && r === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(h & ~e)));
  }
  function sf(t, e, n) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var i = 31 - pe(e);
    ((t.entangledLanes |= e),
      (t.entanglements[i] = t.entanglements[i] | 1073741824 | (n & 4194090)));
  }
  function lf(t, e) {
    var n = (t.entangledLanes |= e);
    for (t = t.entanglements; n; ) {
      var i = 31 - pe(n),
        r = 1 << i;
      ((r & e) | (t[i] & e) && (t[i] |= e), (n &= ~r));
    }
  }
  function vr(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function xr(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function rf() {
    var t = B.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Gm(t.type));
  }
  function p0(t, e) {
    var n = B.p;
    try {
      return ((B.p = t), e());
    } finally {
      B.p = n;
    }
  }
  var pn = Math.random().toString(36).slice(2),
    ne = "__reactFiber$" + pn,
    oe = "__reactProps$" + pn,
    pa = "__reactContainer$" + pn,
    br = "__reactEvents$" + pn,
    y0 = "__reactListeners$" + pn,
    v0 = "__reactHandles$" + pn,
    of = "__reactResources$" + pn,
    pi = "__reactMarker$" + pn;
  function Sr(t) {
    (delete t[ne], delete t[oe], delete t[br], delete t[y0], delete t[v0]);
  }
  function ya(t) {
    var e = t[ne];
    if (e) return e;
    for (var n = t.parentNode; n; ) {
      if ((e = n[pa] || n[ne])) {
        if (
          ((n = e.alternate),
          e.child !== null || (n !== null && n.child !== null))
        )
          for (t = Mm(t); t !== null; ) {
            if ((n = t[ne])) return n;
            t = Mm(t);
          }
        return e;
      }
      ((t = n), (n = t.parentNode));
    }
    return null;
  }
  function va(t) {
    if ((t = t[ne] || t[pa])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function yi(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function xa(t) {
    var e = t[of];
    return (
      e ||
        (e = t[of] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      e
    );
  }
  function Kt(t) {
    t[pi] = !0;
  }
  var uf = new Set(),
    cf = {};
  function kn(t, e) {
    (ba(t, e), ba(t + "Capture", e));
  }
  function ba(t, e) {
    for (cf[t] = e, t = 0; t < e.length; t++) uf.add(e[t]);
  }
  var x0 = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    ff = {},
    df = {};
  function b0(t) {
    return mr.call(df, t)
      ? !0
      : mr.call(ff, t)
        ? !1
        : x0.test(t)
          ? (df[t] = !0)
          : ((ff[t] = !0), !1);
  }
  function Bs(t, e, n) {
    if (b0(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var i = e.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + n);
      }
  }
  function Ls(t, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + n);
    }
  }
  function Fe(t, e, n, i) {
    if (i === null) t.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, "" + i);
    }
  }
  var Tr, hf;
  function Sa(t) {
    if (Tr === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        ((Tr = (e && e[1]) || ""),
          (hf =
            -1 <
            n.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < n.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      Tr +
      t +
      hf
    );
  }
  var Ar = !1;
  function Er(t, e) {
    if (!t || Ar) return "";
    Ar = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var Y = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Y.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Y, []);
                } catch (O) {
                  var j = O;
                }
                Reflect.construct(t, [], Y);
              } else {
                try {
                  Y.call();
                } catch (O) {
                  j = O;
                }
                t.call(Y.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (O) {
                j = O;
              }
              (Y = t()) &&
                typeof Y.catch == "function" &&
                Y.catch(function () {});
            }
          } catch (O) {
            if (O && j && typeof O.stack == "string") return [O.stack, j.stack];
          }
          return [null, null];
        },
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var r = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name",
      );
      r &&
        r.configurable &&
        Object.defineProperty(i.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var u = i.DetermineComponentFrameRoot(),
        h = u[0],
        v = u[1];
      if (h && v) {
        var T = h.split(`
`),
          R = v.split(`
`);
        for (
          r = i = 0;
          i < T.length && !T[i].includes("DetermineComponentFrameRoot");
        )
          i++;
        for (; r < R.length && !R[r].includes("DetermineComponentFrameRoot"); )
          r++;
        if (i === T.length || r === R.length)
          for (
            i = T.length - 1, r = R.length - 1;
            1 <= i && 0 <= r && T[i] !== R[r];
          )
            r--;
        for (; 1 <= i && 0 <= r; i--, r--)
          if (T[i] !== R[r]) {
            if (i !== 1 || r !== 1)
              do
                if ((i--, r--, 0 > r || T[i] !== R[r])) {
                  var _ =
                    `
` + T[i].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      _.includes("<anonymous>") &&
                      (_ = _.replace("<anonymous>", t.displayName)),
                    _
                  );
                }
              while (1 <= i && 0 <= r);
            break;
          }
      }
    } finally {
      ((Ar = !1), (Error.prepareStackTrace = n));
    }
    return (n = t ? t.displayName || t.name : "") ? Sa(n) : "";
  }
  function S0(t) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Sa(t.type);
      case 16:
        return Sa("Lazy");
      case 13:
        return Sa("Suspense");
      case 19:
        return Sa("SuspenseList");
      case 0:
      case 15:
        return Er(t.type, !1);
      case 11:
        return Er(t.type.render, !1);
      case 1:
        return Er(t.type, !0);
      case 31:
        return Sa("Activity");
      default:
        return "";
    }
  }
  function mf(t) {
    try {
      var e = "";
      do ((e += S0(t)), (t = t.return));
      while (t);
      return e;
    } catch (n) {
      return (
        `
Error generating stack: ` +
        n.message +
        `
` +
        n.stack
      );
    }
  }
  function Ee(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function gf(t) {
    var e = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (e === "checkbox" || e === "radio")
    );
  }
  function T0(t) {
    var e = gf(t) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e),
      i = "" + t[e];
    if (
      !t.hasOwnProperty(e) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var r = n.get,
        u = n.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return r.call(this);
          },
          set: function (h) {
            ((i = "" + h), u.call(this, h));
          },
        }),
        Object.defineProperty(t, e, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return i;
          },
          setValue: function (h) {
            i = "" + h;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[e]);
          },
        }
      );
    }
  }
  function Hs(t) {
    t._valueTracker || (t._valueTracker = T0(t));
  }
  function pf(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(),
      i = "";
    return (
      t && (i = gf(t) ? (t.checked ? "true" : "false") : t.value),
      (t = i),
      t !== n ? (e.setValue(t), !0) : !1
    );
  }
  function Gs(t) {
    if (
      ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var A0 = /[\n"\\]/g;
  function Me(t) {
    return t.replace(A0, function (e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    });
  }
  function Mr(t, e, n, i, r, u, h, v) {
    ((t.name = ""),
      h != null &&
      typeof h != "function" &&
      typeof h != "symbol" &&
      typeof h != "boolean"
        ? (t.type = h)
        : t.removeAttribute("type"),
      e != null
        ? h === "number"
          ? ((e === 0 && t.value === "") || t.value != e) &&
            (t.value = "" + Ee(e))
          : t.value !== "" + Ee(e) && (t.value = "" + Ee(e))
        : (h !== "submit" && h !== "reset") || t.removeAttribute("value"),
      e != null
        ? Cr(t, h, Ee(e))
        : n != null
          ? Cr(t, h, Ee(n))
          : i != null && t.removeAttribute("value"),
      r == null && u != null && (t.defaultChecked = !!u),
      r != null &&
        (t.checked = r && typeof r != "function" && typeof r != "symbol"),
      v != null &&
      typeof v != "function" &&
      typeof v != "symbol" &&
      typeof v != "boolean"
        ? (t.name = "" + Ee(v))
        : t.removeAttribute("name"));
  }
  function yf(t, e, n, i, r, u, h, v) {
    if (
      (u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        typeof u != "boolean" &&
        (t.type = u),
      e != null || n != null)
    ) {
      if (!((u !== "submit" && u !== "reset") || e != null)) return;
      ((n = n != null ? "" + Ee(n) : ""),
        (e = e != null ? "" + Ee(e) : n),
        v || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((i = i ?? r),
      (i = typeof i != "function" && typeof i != "symbol" && !!i),
      (t.checked = v ? t.checked : !!i),
      (t.defaultChecked = !!i),
      h != null &&
        typeof h != "function" &&
        typeof h != "symbol" &&
        typeof h != "boolean" &&
        (t.name = h));
  }
  function Cr(t, e, n) {
    (e === "number" && Gs(t.ownerDocument) === t) ||
      t.defaultValue === "" + n ||
      (t.defaultValue = "" + n);
  }
  function Ta(t, e, n, i) {
    if (((t = t.options), e)) {
      e = {};
      for (var r = 0; r < n.length; r++) e["$" + n[r]] = !0;
      for (n = 0; n < t.length; n++)
        ((r = e.hasOwnProperty("$" + t[n].value)),
          t[n].selected !== r && (t[n].selected = r),
          r && i && (t[n].defaultSelected = !0));
    } else {
      for (n = "" + Ee(n), e = null, r = 0; r < t.length; r++) {
        if (t[r].value === n) {
          ((t[r].selected = !0), i && (t[r].defaultSelected = !0));
          return;
        }
        e !== null || t[r].disabled || (e = t[r]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function vf(t, e, n) {
    if (
      e != null &&
      ((e = "" + Ee(e)), e !== t.value && (t.value = e), n == null)
    ) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + Ee(n) : "";
  }
  function xf(t, e, n, i) {
    if (e == null) {
      if (i != null) {
        if (n != null) throw Error(o(92));
        if (ft(i)) {
          if (1 < i.length) throw Error(o(93));
          i = i[0];
        }
        n = i;
      }
      (n == null && (n = ""), (e = n));
    }
    ((n = Ee(e)),
      (t.defaultValue = n),
      (i = t.textContent),
      i === n && i !== "" && i !== null && (t.value = i));
  }
  function Aa(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var E0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function bf(t, e, n) {
    var i = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? i
        ? t.setProperty(e, "")
        : e === "float"
          ? (t.cssFloat = "")
          : (t[e] = "")
      : i
        ? t.setProperty(e, n)
        : typeof n != "number" || n === 0 || E0.has(e)
          ? e === "float"
            ? (t.cssFloat = n)
            : (t[e] = ("" + n).trim())
          : (t[e] = n + "px");
  }
  function Sf(t, e, n) {
    if (e != null && typeof e != "object") throw Error(o(62));
    if (((t = t.style), n != null)) {
      for (var i in n)
        !n.hasOwnProperty(i) ||
          (e != null && e.hasOwnProperty(i)) ||
          (i.indexOf("--") === 0
            ? t.setProperty(i, "")
            : i === "float"
              ? (t.cssFloat = "")
              : (t[i] = ""));
      for (var r in e)
        ((i = e[r]), e.hasOwnProperty(r) && n[r] !== i && bf(t, r, i));
    } else for (var u in e) e.hasOwnProperty(u) && bf(t, u, e[u]);
  }
  function Nr(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var M0 = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    C0 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ys(t) {
    return C0.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  var Dr = null;
  function Rr(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Ea = null,
    Ma = null;
  function Tf(t) {
    var e = va(t);
    if (e && (t = e.stateNode)) {
      var n = t[oe] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case "input":
          if (
            (Mr(
              t,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name,
            ),
            (e = n.name),
            n.type === "radio" && e != null)
          ) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name="' + Me("" + e) + '"][type="radio"]',
              ),
                e = 0;
              e < n.length;
              e++
            ) {
              var i = n[e];
              if (i !== t && i.form === t.form) {
                var r = i[oe] || null;
                if (!r) throw Error(o(90));
                Mr(
                  i,
                  r.value,
                  r.defaultValue,
                  r.defaultValue,
                  r.checked,
                  r.defaultChecked,
                  r.type,
                  r.name,
                );
              }
            }
            for (e = 0; e < n.length; e++)
              ((i = n[e]), i.form === t.form && pf(i));
          }
          break t;
        case "textarea":
          vf(t, n.value, n.defaultValue);
          break t;
        case "select":
          ((e = n.value), e != null && Ta(t, !!n.multiple, e, !1));
      }
    }
  }
  var jr = !1;
  function Af(t, e, n) {
    if (jr) return t(e, n);
    jr = !0;
    try {
      var i = t(e);
      return i;
    } finally {
      if (
        ((jr = !1),
        (Ea !== null || Ma !== null) &&
          (Cl(), Ea && ((e = Ea), (t = Ma), (Ma = Ea = null), Tf(e), t)))
      )
        for (e = 0; e < t.length; e++) Tf(t[e]);
    }
  }
  function vi(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var i = n[oe] || null;
    if (i === null) return null;
    n = i[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((i = !i.disabled) ||
          ((t = t.type),
          (i = !(
            t === "button" ||
            t === "input" ||
            t === "select" ||
            t === "textarea"
          ))),
          (t = !i));
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (n && typeof n != "function") throw Error(o(231, e, typeof n));
    return n;
  }
  var $e = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Or = !1;
  if ($e)
    try {
      var xi = {};
      (Object.defineProperty(xi, "passive", {
        get: function () {
          Or = !0;
        },
      }),
        window.addEventListener("test", xi, xi),
        window.removeEventListener("test", xi, xi));
    } catch {
      Or = !1;
    }
  var yn = null,
    wr = null,
    qs = null;
  function Ef() {
    if (qs) return qs;
    var t,
      e = wr,
      n = e.length,
      i,
      r = "value" in yn ? yn.value : yn.textContent,
      u = r.length;
    for (t = 0; t < n && e[t] === r[t]; t++);
    var h = n - t;
    for (i = 1; i <= h && e[n - i] === r[u - i]; i++);
    return (qs = r.slice(t, 1 < i ? 1 - i : void 0));
  }
  function Xs(t) {
    var e = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
        : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function ks() {
    return !0;
  }
  function Mf() {
    return !1;
  }
  function ue(t) {
    function e(n, i, r, u, h) {
      ((this._reactName = n),
        (this._targetInst = r),
        (this.type = i),
        (this.nativeEvent = u),
        (this.target = h),
        (this.currentTarget = null));
      for (var v in t)
        t.hasOwnProperty(v) && ((n = t[v]), (this[v] = n ? n(u) : u[v]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? ks
          : Mf),
        (this.isPropagationStopped = Mf),
        this
      );
    }
    return (
      y(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = ks));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = ks));
        },
        persist: function () {},
        isPersistent: ks,
      }),
      e
    );
  }
  var Zn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Zs = ue(Zn),
    bi = y({}, Zn, { view: 0, detail: 0 }),
    N0 = ue(bi),
    Vr,
    zr,
    Si,
    Ks = y({}, bi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Ur,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== Si &&
              (Si && t.type === "mousemove"
                ? ((Vr = t.screenX - Si.screenX), (zr = t.screenY - Si.screenY))
                : (zr = Vr = 0),
              (Si = t)),
            Vr);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : zr;
      },
    }),
    Cf = ue(Ks),
    D0 = y({}, Ks, { dataTransfer: 0 }),
    R0 = ue(D0),
    j0 = y({}, bi, { relatedTarget: 0 }),
    _r = ue(j0),
    O0 = y({}, Zn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    w0 = ue(O0),
    V0 = y({}, Zn, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    z0 = ue(V0),
    _0 = y({}, Zn, { data: 0 }),
    Nf = ue(_0),
    U0 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    B0 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    L0 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function H0(t) {
    var e = this.nativeEvent;
    return e.getModifierState
      ? e.getModifierState(t)
      : (t = L0[t])
        ? !!e[t]
        : !1;
  }
  function Ur() {
    return H0;
  }
  var G0 = y({}, bi, {
      key: function (t) {
        if (t.key) {
          var e = U0[t.key] || t.key;
          if (e !== "Unidentified") return e;
        }
        return t.type === "keypress"
          ? ((t = Xs(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? B0[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ur,
      charCode: function (t) {
        return t.type === "keypress" ? Xs(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? Xs(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    Y0 = ue(G0),
    q0 = y({}, Ks, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Df = ue(q0),
    X0 = y({}, bi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ur,
    }),
    k0 = ue(X0),
    Z0 = y({}, Zn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    K0 = ue(Z0),
    Q0 = y({}, Ks, {
      deltaX: function (t) {
        return "deltaX" in t
          ? t.deltaX
          : "wheelDeltaX" in t
            ? -t.wheelDeltaX
            : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    P0 = ue(Q0),
    J0 = y({}, Zn, { newState: 0, oldState: 0 }),
    F0 = ue(J0),
    $0 = [9, 13, 27, 32],
    Br = $e && "CompositionEvent" in window,
    Ti = null;
  $e && "documentMode" in document && (Ti = document.documentMode);
  var W0 = $e && "TextEvent" in window && !Ti,
    Rf = $e && (!Br || (Ti && 8 < Ti && 11 >= Ti)),
    jf = " ",
    Of = !1;
  function wf(t, e) {
    switch (t) {
      case "keyup":
        return $0.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Vf(t) {
    return (
      (t = t.detail),
      typeof t == "object" && "data" in t ? t.data : null
    );
  }
  var Ca = !1;
  function I0(t, e) {
    switch (t) {
      case "compositionend":
        return Vf(e);
      case "keypress":
        return e.which !== 32 ? null : ((Of = !0), jf);
      case "textInput":
        return ((t = e.data), t === jf && Of ? null : t);
      default:
        return null;
    }
  }
  function tv(t, e) {
    if (Ca)
      return t === "compositionend" || (!Br && wf(t, e))
        ? ((t = Ef()), (qs = wr = yn = null), (Ca = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Rf && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var ev = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function zf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!ev[t.type] : e === "textarea";
  }
  function _f(t, e, n, i) {
    (Ea ? (Ma ? Ma.push(i) : (Ma = [i])) : (Ea = i),
      (e = wl(e, "onChange")),
      0 < e.length &&
        ((n = new Zs("onChange", "change", null, n, i)),
        t.push({ event: n, listeners: e })));
  }
  var Ai = null,
    Ei = null;
  function nv(t) {
    gm(t, 0);
  }
  function Qs(t) {
    var e = yi(t);
    if (pf(e)) return t;
  }
  function Uf(t, e) {
    if (t === "change") return e;
  }
  var Bf = !1;
  if ($e) {
    var Lr;
    if ($e) {
      var Hr = "oninput" in document;
      if (!Hr) {
        var Lf = document.createElement("div");
        (Lf.setAttribute("oninput", "return;"),
          (Hr = typeof Lf.oninput == "function"));
      }
      Lr = Hr;
    } else Lr = !1;
    Bf = Lr && (!document.documentMode || 9 < document.documentMode);
  }
  function Hf() {
    Ai && (Ai.detachEvent("onpropertychange", Gf), (Ei = Ai = null));
  }
  function Gf(t) {
    if (t.propertyName === "value" && Qs(Ei)) {
      var e = [];
      (_f(e, Ei, t, Rr(t)), Af(nv, e));
    }
  }
  function av(t, e, n) {
    t === "focusin"
      ? (Hf(), (Ai = e), (Ei = n), Ai.attachEvent("onpropertychange", Gf))
      : t === "focusout" && Hf();
  }
  function iv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Qs(Ei);
  }
  function sv(t, e) {
    if (t === "click") return Qs(e);
  }
  function lv(t, e) {
    if (t === "input" || t === "change") return Qs(e);
  }
  function rv(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var ye = typeof Object.is == "function" ? Object.is : rv;
  function Mi(t, e) {
    if (ye(t, e)) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof e != "object" ||
      e === null
    )
      return !1;
    var n = Object.keys(t),
      i = Object.keys(e);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var r = n[i];
      if (!mr.call(e, r) || !ye(t[r], e[r])) return !1;
    }
    return !0;
  }
  function Yf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function qf(t, e) {
    var n = Yf(t);
    t = 0;
    for (var i; n; ) {
      if (n.nodeType === 3) {
        if (((i = t + n.textContent.length), t <= e && i >= e))
          return { node: n, offset: e - t };
        t = i;
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break t;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Yf(n);
    }
  }
  function Xf(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? Xf(t, e.parentNode)
            : "contains" in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function kf(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = Gs(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = Gs(t.document);
    }
    return e;
  }
  function Gr(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      e &&
      ((e === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        e === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var ov = $e && "documentMode" in document && 11 >= document.documentMode,
    Na = null,
    Yr = null,
    Ci = null,
    qr = !1;
  function Zf(t, e, n) {
    var i =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    qr ||
      Na == null ||
      Na !== Gs(i) ||
      ((i = Na),
      "selectionStart" in i && Gr(i)
        ? (i = { start: i.selectionStart, end: i.selectionEnd })
        : ((i = (
            (i.ownerDocument && i.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (i = {
            anchorNode: i.anchorNode,
            anchorOffset: i.anchorOffset,
            focusNode: i.focusNode,
            focusOffset: i.focusOffset,
          })),
      (Ci && Mi(Ci, i)) ||
        ((Ci = i),
        (i = wl(Yr, "onSelect")),
        0 < i.length &&
          ((e = new Zs("onSelect", "select", null, e, n)),
          t.push({ event: e, listeners: i }),
          (e.target = Na))));
  }
  function Kn(t, e) {
    var n = {};
    return (
      (n[t.toLowerCase()] = e.toLowerCase()),
      (n["Webkit" + t] = "webkit" + e),
      (n["Moz" + t] = "moz" + e),
      n
    );
  }
  var Da = {
      animationend: Kn("Animation", "AnimationEnd"),
      animationiteration: Kn("Animation", "AnimationIteration"),
      animationstart: Kn("Animation", "AnimationStart"),
      transitionrun: Kn("Transition", "TransitionRun"),
      transitionstart: Kn("Transition", "TransitionStart"),
      transitioncancel: Kn("Transition", "TransitionCancel"),
      transitionend: Kn("Transition", "TransitionEnd"),
    },
    Xr = {},
    Kf = {};
  $e &&
    ((Kf = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Da.animationend.animation,
      delete Da.animationiteration.animation,
      delete Da.animationstart.animation),
    "TransitionEvent" in window || delete Da.transitionend.transition);
  function Qn(t) {
    if (Xr[t]) return Xr[t];
    if (!Da[t]) return t;
    var e = Da[t],
      n;
    for (n in e) if (e.hasOwnProperty(n) && n in Kf) return (Xr[t] = e[n]);
    return t;
  }
  var Qf = Qn("animationend"),
    Pf = Qn("animationiteration"),
    Jf = Qn("animationstart"),
    uv = Qn("transitionrun"),
    cv = Qn("transitionstart"),
    fv = Qn("transitioncancel"),
    Ff = Qn("transitionend"),
    $f = new Map(),
    kr =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  kr.push("scrollEnd");
  function Be(t, e) {
    ($f.set(t, e), kn(e, [t]));
  }
  var Wf = new WeakMap();
  function Ce(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = Wf.get(t);
      return n !== void 0
        ? n
        : ((e = { value: t, source: e, stack: mf(e) }), Wf.set(t, e), e);
    }
    return { value: t, source: e, stack: mf(e) };
  }
  var Ne = [],
    Ra = 0,
    Zr = 0;
  function Ps() {
    for (var t = Ra, e = (Zr = Ra = 0); e < t; ) {
      var n = Ne[e];
      Ne[e++] = null;
      var i = Ne[e];
      Ne[e++] = null;
      var r = Ne[e];
      Ne[e++] = null;
      var u = Ne[e];
      if (((Ne[e++] = null), i !== null && r !== null)) {
        var h = i.pending;
        (h === null ? (r.next = r) : ((r.next = h.next), (h.next = r)),
          (i.pending = r));
      }
      u !== 0 && If(n, r, u);
    }
  }
  function Js(t, e, n, i) {
    ((Ne[Ra++] = t),
      (Ne[Ra++] = e),
      (Ne[Ra++] = n),
      (Ne[Ra++] = i),
      (Zr |= i),
      (t.lanes |= i),
      (t = t.alternate),
      t !== null && (t.lanes |= i));
  }
  function Kr(t, e, n, i) {
    return (Js(t, e, n, i), Fs(t));
  }
  function ja(t, e) {
    return (Js(t, null, null, e), Fs(t));
  }
  function If(t, e, n) {
    t.lanes |= n;
    var i = t.alternate;
    i !== null && (i.lanes |= n);
    for (var r = !1, u = t.return; u !== null; )
      ((u.childLanes |= n),
        (i = u.alternate),
        i !== null && (i.childLanes |= n),
        u.tag === 22 &&
          ((t = u.stateNode), t === null || t._visibility & 1 || (r = !0)),
        (t = u),
        (u = u.return));
    return t.tag === 3
      ? ((u = t.stateNode),
        r &&
          e !== null &&
          ((r = 31 - pe(n)),
          (t = u.hiddenUpdates),
          (i = t[r]),
          i === null ? (t[r] = [e]) : i.push(e),
          (e.lane = n | 536870912)),
        u)
      : null;
  }
  function Fs(t) {
    if (50 < $i) throw (($i = 0), (Io = null), Error(o(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var Oa = {};
  function dv(t, e, n, i) {
    ((this.tag = t),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = e),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = i),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function ve(t, e, n, i) {
    return new dv(t, e, n, i);
  }
  function Qr(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function We(t, e) {
    var n = t.alternate;
    return (
      n === null
        ? ((n = ve(t.tag, e, t.key, t.mode)),
          (n.elementType = t.elementType),
          (n.type = t.type),
          (n.stateNode = t.stateNode),
          (n.alternate = t),
          (t.alternate = n))
        : ((n.pendingProps = e),
          (n.type = t.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = t.flags & 65011712),
      (n.childLanes = t.childLanes),
      (n.lanes = t.lanes),
      (n.child = t.child),
      (n.memoizedProps = t.memoizedProps),
      (n.memoizedState = t.memoizedState),
      (n.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (n.dependencies =
        e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (n.sibling = t.sibling),
      (n.index = t.index),
      (n.ref = t.ref),
      (n.refCleanup = t.refCleanup),
      n
    );
  }
  function td(t, e) {
    t.flags &= 65011714;
    var n = t.alternate;
    return (
      n === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = n.childLanes),
          (t.lanes = n.lanes),
          (t.child = n.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = n.memoizedProps),
          (t.memoizedState = n.memoizedState),
          (t.updateQueue = n.updateQueue),
          (t.type = n.type),
          (e = n.dependencies),
          (t.dependencies =
            e === null
              ? null
              : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    );
  }
  function $s(t, e, n, i, r, u) {
    var h = 0;
    if (((i = t), typeof t == "function")) Qr(t) && (h = 1);
    else if (typeof t == "string")
      h = mx(t, n, tt.current)
        ? 26
        : t === "html" || t === "head" || t === "body"
          ? 27
          : 5;
    else
      t: switch (t) {
        case ot:
          return (
            (t = ve(31, n, e, r)),
            (t.elementType = ot),
            (t.lanes = u),
            t
          );
        case U:
          return Pn(n.children, r, u, e);
        case V:
          ((h = 8), (r |= 24));
          break;
        case w:
          return (
            (t = ve(12, n, e, r | 2)),
            (t.elementType = w),
            (t.lanes = u),
            t
          );
        case G:
          return ((t = ve(13, n, e, r)), (t.elementType = G), (t.lanes = u), t);
        case Q:
          return ((t = ve(19, n, e, r)), (t.elementType = Q), (t.lanes = u), t);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case k:
              case C:
                h = 10;
                break t;
              case Z:
                h = 9;
                break t;
              case q:
                h = 11;
                break t;
              case W:
                h = 14;
                break t;
              case F:
                ((h = 16), (i = null));
                break t;
            }
          ((h = 29),
            (n = Error(o(130, t === null ? "null" : typeof t, ""))),
            (i = null));
      }
    return (
      (e = ve(h, n, e, r)),
      (e.elementType = t),
      (e.type = i),
      (e.lanes = u),
      e
    );
  }
  function Pn(t, e, n, i) {
    return ((t = ve(7, t, i, e)), (t.lanes = n), t);
  }
  function Pr(t, e, n) {
    return ((t = ve(6, t, null, e)), (t.lanes = n), t);
  }
  function Jr(t, e, n) {
    return (
      (e = ve(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = n),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var wa = [],
    Va = 0,
    Ws = null,
    Is = 0,
    De = [],
    Re = 0,
    Jn = null,
    Ie = 1,
    tn = "";
  function Fn(t, e) {
    ((wa[Va++] = Is), (wa[Va++] = Ws), (Ws = t), (Is = e));
  }
  function ed(t, e, n) {
    ((De[Re++] = Ie), (De[Re++] = tn), (De[Re++] = Jn), (Jn = t));
    var i = Ie;
    t = tn;
    var r = 32 - pe(i) - 1;
    ((i &= ~(1 << r)), (n += 1));
    var u = 32 - pe(e) + r;
    if (30 < u) {
      var h = r - (r % 5);
      ((u = (i & ((1 << h) - 1)).toString(32)),
        (i >>= h),
        (r -= h),
        (Ie = (1 << (32 - pe(e) + r)) | (n << r) | i),
        (tn = u + t));
    } else ((Ie = (1 << u) | (n << r) | i), (tn = t));
  }
  function Fr(t) {
    t.return !== null && (Fn(t, 1), ed(t, 1, 0));
  }
  function $r(t) {
    for (; t === Ws; )
      ((Ws = wa[--Va]), (wa[Va] = null), (Is = wa[--Va]), (wa[Va] = null));
    for (; t === Jn; )
      ((Jn = De[--Re]),
        (De[Re] = null),
        (tn = De[--Re]),
        (De[Re] = null),
        (Ie = De[--Re]),
        (De[Re] = null));
  }
  var le = null,
    zt = null,
    xt = !1,
    $n = null,
    qe = !1,
    Wr = Error(o(519));
  function Wn(t) {
    var e = Error(o(418, ""));
    throw (Ri(Ce(e, t)), Wr);
  }
  function nd(t) {
    var e = t.stateNode,
      n = t.type,
      i = t.memoizedProps;
    switch (((e[ne] = t), (e[oe] = i), n)) {
      case "dialog":
        (ht("cancel", e), ht("close", e));
        break;
      case "iframe":
      case "object":
      case "embed":
        ht("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Ii.length; n++) ht(Ii[n], e);
        break;
      case "source":
        ht("error", e);
        break;
      case "img":
      case "image":
      case "link":
        (ht("error", e), ht("load", e));
        break;
      case "details":
        ht("toggle", e);
        break;
      case "input":
        (ht("invalid", e),
          yf(
            e,
            i.value,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name,
            !0,
          ),
          Hs(e));
        break;
      case "select":
        ht("invalid", e);
        break;
      case "textarea":
        (ht("invalid", e), xf(e, i.value, i.defaultValue, i.children), Hs(e));
    }
    ((n = i.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      e.textContent === "" + n ||
      i.suppressHydrationWarning === !0 ||
      xm(e.textContent, n)
        ? (i.popover != null && (ht("beforetoggle", e), ht("toggle", e)),
          i.onScroll != null && ht("scroll", e),
          i.onScrollEnd != null && ht("scrollend", e),
          i.onClick != null && (e.onclick = Vl),
          (e = !0))
        : (e = !1),
      e || Wn(t));
  }
  function ad(t) {
    for (le = t.return; le; )
      switch (le.tag) {
        case 5:
        case 13:
          qe = !1;
          return;
        case 27:
        case 3:
          qe = !0;
          return;
        default:
          le = le.return;
      }
  }
  function Ni(t) {
    if (t !== le) return !1;
    if (!xt) return (ad(t), (xt = !0), !1);
    var e = t.tag,
      n;
    if (
      ((n = e !== 3 && e !== 27) &&
        ((n = e === 5) &&
          ((n = t.type),
          (n =
            !(n !== "form" && n !== "button") || gu(t.type, t.memoizedProps))),
        (n = !n)),
      n && zt && Wn(t),
      ad(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(o(317));
      t: {
        for (t = t.nextSibling, e = 0; t; ) {
          if (t.nodeType === 8)
            if (((n = t.data), n === "/$")) {
              if (e === 0) {
                zt = He(t.nextSibling);
                break t;
              }
              e--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || e++;
          t = t.nextSibling;
        }
        zt = null;
      }
    } else
      e === 27
        ? ((e = zt), Vn(t.type) ? ((t = xu), (xu = null), (zt = t)) : (zt = e))
        : (zt = le ? He(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Di() {
    ((zt = le = null), (xt = !1));
  }
  function id() {
    var t = $n;
    return (
      t !== null &&
        (de === null ? (de = t) : de.push.apply(de, t), ($n = null)),
      t
    );
  }
  function Ri(t) {
    $n === null ? ($n = [t]) : $n.push(t);
  }
  var Ir = H(null),
    In = null,
    en = null;
  function vn(t, e, n) {
    (P(Ir, e._currentValue), (e._currentValue = n));
  }
  function nn(t) {
    ((t._currentValue = Ir.current), J(Ir));
  }
  function to(t, e, n) {
    for (; t !== null; ) {
      var i = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), i !== null && (i.childLanes |= e))
          : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e),
        t === n)
      )
        break;
      t = t.return;
    }
  }
  function eo(t, e, n, i) {
    var r = t.child;
    for (r !== null && (r.return = t); r !== null; ) {
      var u = r.dependencies;
      if (u !== null) {
        var h = r.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var v = u;
          u = r;
          for (var T = 0; T < e.length; T++)
            if (v.context === e[T]) {
              ((u.lanes |= n),
                (v = u.alternate),
                v !== null && (v.lanes |= n),
                to(u.return, n, t),
                i || (h = null));
              break t;
            }
          u = v.next;
        }
      } else if (r.tag === 18) {
        if (((h = r.return), h === null)) throw Error(o(341));
        ((h.lanes |= n),
          (u = h.alternate),
          u !== null && (u.lanes |= n),
          to(h, n, t),
          (h = null));
      } else h = r.child;
      if (h !== null) h.return = r;
      else
        for (h = r; h !== null; ) {
          if (h === t) {
            h = null;
            break;
          }
          if (((r = h.sibling), r !== null)) {
            ((r.return = h.return), (h = r));
            break;
          }
          h = h.return;
        }
      r = h;
    }
  }
  function ji(t, e, n, i) {
    t = null;
    for (var r = e, u = !1; r !== null; ) {
      if (!u) {
        if ((r.flags & 524288) !== 0) u = !0;
        else if ((r.flags & 262144) !== 0) break;
      }
      if (r.tag === 10) {
        var h = r.alternate;
        if (h === null) throw Error(o(387));
        if (((h = h.memoizedProps), h !== null)) {
          var v = r.type;
          ye(r.pendingProps.value, h.value) ||
            (t !== null ? t.push(v) : (t = [v]));
        }
      } else if (r === me.current) {
        if (((h = r.alternate), h === null)) throw Error(o(387));
        h.memoizedState.memoizedState !== r.memoizedState.memoizedState &&
          (t !== null ? t.push(ss) : (t = [ss]));
      }
      r = r.return;
    }
    (t !== null && eo(e, t, n, i), (e.flags |= 262144));
  }
  function tl(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!ye(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function ta(t) {
    ((In = t),
      (en = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null));
  }
  function ae(t) {
    return sd(In, t);
  }
  function el(t, e) {
    return (In === null && ta(t), sd(t, e));
  }
  function sd(t, e) {
    var n = e._currentValue;
    if (((e = { context: e, memoizedValue: n, next: null }), en === null)) {
      if (t === null) throw Error(o(308));
      ((en = e),
        (t.dependencies = { lanes: 0, firstContext: e }),
        (t.flags |= 524288));
    } else en = en.next = e;
    return n;
  }
  var hv =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (n, i) {
                  t.push(i);
                },
              });
            this.abort = function () {
              ((e.aborted = !0),
                t.forEach(function (n) {
                  return n();
                }));
            };
          },
    mv = a.unstable_scheduleCallback,
    gv = a.unstable_NormalPriority,
    Xt = {
      $$typeof: C,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function no() {
    return { controller: new hv(), data: new Map(), refCount: 0 };
  }
  function Oi(t) {
    (t.refCount--,
      t.refCount === 0 &&
        mv(gv, function () {
          t.controller.abort();
        }));
  }
  var wi = null,
    ao = 0,
    za = 0,
    _a = null;
  function pv(t, e) {
    if (wi === null) {
      var n = (wi = []);
      ((ao = 0),
        (za = lu()),
        (_a = {
          status: "pending",
          value: void 0,
          then: function (i) {
            n.push(i);
          },
        }));
    }
    return (ao++, e.then(ld, ld), e);
  }
  function ld() {
    if (--ao === 0 && wi !== null) {
      _a !== null && (_a.status = "fulfilled");
      var t = wi;
      ((wi = null), (za = 0), (_a = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function yv(t, e) {
    var n = [],
      i = {
        status: "pending",
        value: null,
        reason: null,
        then: function (r) {
          n.push(r);
        },
      };
    return (
      t.then(
        function () {
          ((i.status = "fulfilled"), (i.value = e));
          for (var r = 0; r < n.length; r++) (0, n[r])(e);
        },
        function (r) {
          for (i.status = "rejected", i.reason = r, r = 0; r < n.length; r++)
            (0, n[r])(void 0);
        },
      ),
      i
    );
  }
  var rd = z.S;
  z.S = function (t, e) {
    (typeof e == "object" &&
      e !== null &&
      typeof e.then == "function" &&
      pv(t, e),
      rd !== null && rd(t, e));
  };
  var ea = H(null);
  function io() {
    var t = ea.current;
    return t !== null ? t : Dt.pooledCache;
  }
  function nl(t, e) {
    e === null ? P(ea, ea.current) : P(ea, e.pool);
  }
  function od() {
    var t = io();
    return t === null ? null : { parent: Xt._currentValue, pool: t };
  }
  var Vi = Error(o(460)),
    ud = Error(o(474)),
    al = Error(o(542)),
    so = { then: function () {} };
  function cd(t) {
    return ((t = t.status), t === "fulfilled" || t === "rejected");
  }
  function il() {}
  function fd(t, e, n) {
    switch (
      ((n = t[n]),
      n === void 0 ? t.push(e) : n !== e && (e.then(il, il), (e = n)),
      e.status)
    ) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw ((t = e.reason), hd(t), t);
      default:
        if (typeof e.status == "string") e.then(il, il);
        else {
          if (((t = Dt), t !== null && 100 < t.shellSuspendCounter))
            throw Error(o(482));
          ((t = e),
            (t.status = "pending"),
            t.then(
              function (i) {
                if (e.status === "pending") {
                  var r = e;
                  ((r.status = "fulfilled"), (r.value = i));
                }
              },
              function (i) {
                if (e.status === "pending") {
                  var r = e;
                  ((r.status = "rejected"), (r.reason = i));
                }
              },
            ));
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw ((t = e.reason), hd(t), t);
        }
        throw ((zi = e), Vi);
    }
  }
  var zi = null;
  function dd() {
    if (zi === null) throw Error(o(459));
    var t = zi;
    return ((zi = null), t);
  }
  function hd(t) {
    if (t === Vi || t === al) throw Error(o(483));
  }
  var xn = !1;
  function lo(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function ro(t, e) {
    ((t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }));
  }
  function bn(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Sn(t, e, n) {
    var i = t.updateQueue;
    if (i === null) return null;
    if (((i = i.shared), (St & 2) !== 0)) {
      var r = i.pending;
      return (
        r === null ? (e.next = e) : ((e.next = r.next), (r.next = e)),
        (i.pending = e),
        (e = Fs(t)),
        If(t, null, n),
        e
      );
    }
    return (Js(t, i, e, n), Fs(t));
  }
  function _i(t, e, n) {
    if (
      ((e = e.updateQueue), e !== null && ((e = e.shared), (n & 4194048) !== 0))
    ) {
      var i = e.lanes;
      ((i &= t.pendingLanes), (n |= i), (e.lanes = n), lf(t, n));
    }
  }
  function oo(t, e) {
    var n = t.updateQueue,
      i = t.alternate;
    if (i !== null && ((i = i.updateQueue), n === i)) {
      var r = null,
        u = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var h = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null,
          };
          (u === null ? (r = u = h) : (u = u.next = h), (n = n.next));
        } while (n !== null);
        u === null ? (r = u = e) : (u = u.next = e);
      } else r = u = e;
      ((n = {
        baseState: i.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: u,
        shared: i.shared,
        callbacks: i.callbacks,
      }),
        (t.updateQueue = n));
      return;
    }
    ((t = n.lastBaseUpdate),
      t === null ? (n.firstBaseUpdate = e) : (t.next = e),
      (n.lastBaseUpdate = e));
  }
  var uo = !1;
  function Ui() {
    if (uo) {
      var t = _a;
      if (t !== null) throw t;
    }
  }
  function Bi(t, e, n, i) {
    uo = !1;
    var r = t.updateQueue;
    xn = !1;
    var u = r.firstBaseUpdate,
      h = r.lastBaseUpdate,
      v = r.shared.pending;
    if (v !== null) {
      r.shared.pending = null;
      var T = v,
        R = T.next;
      ((T.next = null), h === null ? (u = R) : (h.next = R), (h = T));
      var _ = t.alternate;
      _ !== null &&
        ((_ = _.updateQueue),
        (v = _.lastBaseUpdate),
        v !== h &&
          (v === null ? (_.firstBaseUpdate = R) : (v.next = R),
          (_.lastBaseUpdate = T)));
    }
    if (u !== null) {
      var Y = r.baseState;
      ((h = 0), (_ = R = T = null), (v = u));
      do {
        var j = v.lane & -536870913,
          O = j !== v.lane;
        if (O ? (gt & j) === j : (i & j) === j) {
          (j !== 0 && j === za && (uo = !0),
            _ !== null &&
              (_ = _.next =
                {
                  lane: 0,
                  tag: v.tag,
                  payload: v.payload,
                  callback: null,
                  next: null,
                }));
          t: {
            var at = t,
              et = v;
            j = e;
            var Mt = n;
            switch (et.tag) {
              case 1:
                if (((at = et.payload), typeof at == "function")) {
                  Y = at.call(Mt, Y, j);
                  break t;
                }
                Y = at;
                break t;
              case 3:
                at.flags = (at.flags & -65537) | 128;
              case 0:
                if (
                  ((at = et.payload),
                  (j = typeof at == "function" ? at.call(Mt, Y, j) : at),
                  j == null)
                )
                  break t;
                Y = y({}, Y, j);
                break t;
              case 2:
                xn = !0;
            }
          }
          ((j = v.callback),
            j !== null &&
              ((t.flags |= 64),
              O && (t.flags |= 8192),
              (O = r.callbacks),
              O === null ? (r.callbacks = [j]) : O.push(j)));
        } else
          ((O = {
            lane: j,
            tag: v.tag,
            payload: v.payload,
            callback: v.callback,
            next: null,
          }),
            _ === null ? ((R = _ = O), (T = Y)) : (_ = _.next = O),
            (h |= j));
        if (((v = v.next), v === null)) {
          if (((v = r.shared.pending), v === null)) break;
          ((O = v),
            (v = O.next),
            (O.next = null),
            (r.lastBaseUpdate = O),
            (r.shared.pending = null));
        }
      } while (!0);
      (_ === null && (T = Y),
        (r.baseState = T),
        (r.firstBaseUpdate = R),
        (r.lastBaseUpdate = _),
        u === null && (r.shared.lanes = 0),
        (Rn |= h),
        (t.lanes = h),
        (t.memoizedState = Y));
    }
  }
  function md(t, e) {
    if (typeof t != "function") throw Error(o(191, t));
    t.call(e);
  }
  function gd(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++) md(n[t], e);
  }
  var Ua = H(null),
    sl = H(0);
  function pd(t, e) {
    ((t = cn), P(sl, t), P(Ua, e), (cn = t | e.baseLanes));
  }
  function co() {
    (P(sl, cn), P(Ua, Ua.current));
  }
  function fo() {
    ((cn = sl.current), J(Ua), J(sl));
  }
  var Tn = 0,
    ut = null,
    At = null,
    Gt = null,
    ll = !1,
    Ba = !1,
    na = !1,
    rl = 0,
    Li = 0,
    La = null,
    vv = 0;
  function Bt() {
    throw Error(o(321));
  }
  function ho(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!ye(t[n], e[n])) return !1;
    return !0;
  }
  function mo(t, e, n, i, r, u) {
    return (
      (Tn = u),
      (ut = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (z.H = t === null || t.memoizedState === null ? Id : th),
      (na = !1),
      (u = n(i, r)),
      (na = !1),
      Ba && (u = vd(e, n, i, r)),
      yd(t),
      u
    );
  }
  function yd(t) {
    z.H = hl;
    var e = At !== null && At.next !== null;
    if (((Tn = 0), (Gt = At = ut = null), (ll = !1), (Li = 0), (La = null), e))
      throw Error(o(300));
    t === null ||
      Qt ||
      ((t = t.dependencies), t !== null && tl(t) && (Qt = !0));
  }
  function vd(t, e, n, i) {
    ut = t;
    var r = 0;
    do {
      if ((Ba && (La = null), (Li = 0), (Ba = !1), 25 <= r))
        throw Error(o(301));
      if (((r += 1), (Gt = At = null), t.updateQueue != null)) {
        var u = t.updateQueue;
        ((u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0));
      }
      ((z.H = Mv), (u = e(n, i)));
    } while (Ba);
    return u;
  }
  function xv() {
    var t = z.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == "function" ? Hi(e) : e),
      (t = t.useState()[0]),
      (At !== null ? At.memoizedState : null) !== t && (ut.flags |= 1024),
      e
    );
  }
  function go() {
    var t = rl !== 0;
    return ((rl = 0), t);
  }
  function po(t, e, n) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~n));
  }
  function yo(t) {
    if (ll) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      ll = !1;
    }
    ((Tn = 0), (Gt = At = ut = null), (Ba = !1), (Li = rl = 0), (La = null));
  }
  function ce() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Gt === null ? (ut.memoizedState = Gt = t) : (Gt = Gt.next = t), Gt);
  }
  function Yt() {
    if (At === null) {
      var t = ut.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = At.next;
    var e = Gt === null ? ut.memoizedState : Gt.next;
    if (e !== null) ((Gt = e), (At = t));
    else {
      if (t === null)
        throw ut.alternate === null ? Error(o(467)) : Error(o(310));
      ((At = t),
        (t = {
          memoizedState: At.memoizedState,
          baseState: At.baseState,
          baseQueue: At.baseQueue,
          queue: At.queue,
          next: null,
        }),
        Gt === null ? (ut.memoizedState = Gt = t) : (Gt = Gt.next = t));
    }
    return Gt;
  }
  function vo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Hi(t) {
    var e = Li;
    return (
      (Li += 1),
      La === null && (La = []),
      (t = fd(La, t, e)),
      (e = ut),
      (Gt === null ? e.memoizedState : Gt.next) === null &&
        ((e = e.alternate),
        (z.H = e === null || e.memoizedState === null ? Id : th)),
      t
    );
  }
  function ol(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Hi(t);
      if (t.$$typeof === C) return ae(t);
    }
    throw Error(o(438, String(t)));
  }
  function xo(t) {
    var e = null,
      n = ut.updateQueue;
    if ((n !== null && (e = n.memoCache), e == null)) {
      var i = ut.alternate;
      i !== null &&
        ((i = i.updateQueue),
        i !== null &&
          ((i = i.memoCache),
          i != null &&
            (e = {
              data: i.data.map(function (r) {
                return r.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      n === null && ((n = vo()), (ut.updateQueue = n)),
      (n.memoCache = e),
      (n = e.data[e.index]),
      n === void 0)
    )
      for (n = e.data[e.index] = Array(t), i = 0; i < t; i++) n[i] = bt;
    return (e.index++, n);
  }
  function an(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function ul(t) {
    var e = Yt();
    return bo(e, At, t);
  }
  function bo(t, e, n) {
    var i = t.queue;
    if (i === null) throw Error(o(311));
    i.lastRenderedReducer = n;
    var r = t.baseQueue,
      u = i.pending;
    if (u !== null) {
      if (r !== null) {
        var h = r.next;
        ((r.next = u.next), (u.next = h));
      }
      ((e.baseQueue = r = u), (i.pending = null));
    }
    if (((u = t.baseState), r === null)) t.memoizedState = u;
    else {
      e = r.next;
      var v = (h = null),
        T = null,
        R = e,
        _ = !1;
      do {
        var Y = R.lane & -536870913;
        if (Y !== R.lane ? (gt & Y) === Y : (Tn & Y) === Y) {
          var j = R.revertLane;
          if (j === 0)
            (T !== null &&
              (T = T.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: R.action,
                  hasEagerState: R.hasEagerState,
                  eagerState: R.eagerState,
                  next: null,
                }),
              Y === za && (_ = !0));
          else if ((Tn & j) === j) {
            ((R = R.next), j === za && (_ = !0));
            continue;
          } else
            ((Y = {
              lane: 0,
              revertLane: R.revertLane,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null,
            }),
              T === null ? ((v = T = Y), (h = u)) : (T = T.next = Y),
              (ut.lanes |= j),
              (Rn |= j));
          ((Y = R.action),
            na && n(u, Y),
            (u = R.hasEagerState ? R.eagerState : n(u, Y)));
        } else
          ((j = {
            lane: Y,
            revertLane: R.revertLane,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null,
          }),
            T === null ? ((v = T = j), (h = u)) : (T = T.next = j),
            (ut.lanes |= Y),
            (Rn |= Y));
        R = R.next;
      } while (R !== null && R !== e);
      if (
        (T === null ? (h = u) : (T.next = v),
        !ye(u, t.memoizedState) && ((Qt = !0), _ && ((n = _a), n !== null)))
      )
        throw n;
      ((t.memoizedState = u),
        (t.baseState = h),
        (t.baseQueue = T),
        (i.lastRenderedState = u));
    }
    return (r === null && (i.lanes = 0), [t.memoizedState, i.dispatch]);
  }
  function So(t) {
    var e = Yt(),
      n = e.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = t;
    var i = n.dispatch,
      r = n.pending,
      u = e.memoizedState;
    if (r !== null) {
      n.pending = null;
      var h = (r = r.next);
      do ((u = t(u, h.action)), (h = h.next));
      while (h !== r);
      (ye(u, e.memoizedState) || (Qt = !0),
        (e.memoizedState = u),
        e.baseQueue === null && (e.baseState = u),
        (n.lastRenderedState = u));
    }
    return [u, i];
  }
  function xd(t, e, n) {
    var i = ut,
      r = Yt(),
      u = xt;
    if (u) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = e();
    var h = !ye((At || r).memoizedState, n);
    (h && ((r.memoizedState = n), (Qt = !0)), (r = r.queue));
    var v = Td.bind(null, i, r, t);
    if (
      (Gi(2048, 8, v, [t]),
      r.getSnapshot !== e || h || (Gt !== null && Gt.memoizedState.tag & 1))
    ) {
      if (
        ((i.flags |= 2048),
        Ha(9, cl(), Sd.bind(null, i, r, n, e), null),
        Dt === null)
      )
        throw Error(o(349));
      u || (Tn & 124) !== 0 || bd(i, e, n);
    }
    return n;
  }
  function bd(t, e, n) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: n }),
      (e = ut.updateQueue),
      e === null
        ? ((e = vo()), (ut.updateQueue = e), (e.stores = [t]))
        : ((n = e.stores), n === null ? (e.stores = [t]) : n.push(t)));
  }
  function Sd(t, e, n, i) {
    ((e.value = n), (e.getSnapshot = i), Ad(e) && Ed(t));
  }
  function Td(t, e, n) {
    return n(function () {
      Ad(e) && Ed(t);
    });
  }
  function Ad(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !ye(t, n);
    } catch {
      return !0;
    }
  }
  function Ed(t) {
    var e = ja(t, 2);
    e !== null && Ae(e, t, 2);
  }
  function To(t) {
    var e = ce();
    if (typeof t == "function") {
      var n = t;
      if (((t = n()), na)) {
        gn(!0);
        try {
          n();
        } finally {
          gn(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: an,
        lastRenderedState: t,
      }),
      e
    );
  }
  function Md(t, e, n, i) {
    return ((t.baseState = n), bo(t, At, typeof i == "function" ? i : an));
  }
  function bv(t, e, n, i, r) {
    if (dl(t)) throw Error(o(485));
    if (((t = e.action), t !== null)) {
      var u = {
        payload: r,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (h) {
          u.listeners.push(h);
        },
      };
      (z.T !== null ? n(!0) : (u.isTransition = !1),
        i(u),
        (n = e.pending),
        n === null
          ? ((u.next = e.pending = u), Cd(e, u))
          : ((u.next = n.next), (e.pending = n.next = u)));
    }
  }
  function Cd(t, e) {
    var n = e.action,
      i = e.payload,
      r = t.state;
    if (e.isTransition) {
      var u = z.T,
        h = {};
      z.T = h;
      try {
        var v = n(r, i),
          T = z.S;
        (T !== null && T(h, v), Nd(t, e, v));
      } catch (R) {
        Ao(t, e, R);
      } finally {
        z.T = u;
      }
    } else
      try {
        ((u = n(r, i)), Nd(t, e, u));
      } catch (R) {
        Ao(t, e, R);
      }
  }
  function Nd(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (i) {
            Dd(t, e, i);
          },
          function (i) {
            return Ao(t, e, i);
          },
        )
      : Dd(t, e, n);
  }
  function Dd(t, e, n) {
    ((e.status = "fulfilled"),
      (e.value = n),
      Rd(e),
      (t.state = n),
      (e = t.pending),
      e !== null &&
        ((n = e.next),
        n === e ? (t.pending = null) : ((n = n.next), (e.next = n), Cd(t, n))));
  }
  function Ao(t, e, n) {
    var i = t.pending;
    if (((t.pending = null), i !== null)) {
      i = i.next;
      do ((e.status = "rejected"), (e.reason = n), Rd(e), (e = e.next));
      while (e !== i);
    }
    t.action = null;
  }
  function Rd(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function jd(t, e) {
    return e;
  }
  function Od(t, e) {
    if (xt) {
      var n = Dt.formState;
      if (n !== null) {
        t: {
          var i = ut;
          if (xt) {
            if (zt) {
              e: {
                for (var r = zt, u = qe; r.nodeType !== 8; ) {
                  if (!u) {
                    r = null;
                    break e;
                  }
                  if (((r = He(r.nextSibling)), r === null)) {
                    r = null;
                    break e;
                  }
                }
                ((u = r.data), (r = u === "F!" || u === "F" ? r : null));
              }
              if (r) {
                ((zt = He(r.nextSibling)), (i = r.data === "F!"));
                break t;
              }
            }
            Wn(i);
          }
          i = !1;
        }
        i && (e = n[0]);
      }
    }
    return (
      (n = ce()),
      (n.memoizedState = n.baseState = e),
      (i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jd,
        lastRenderedState: e,
      }),
      (n.queue = i),
      (n = Fd.bind(null, ut, i)),
      (i.dispatch = n),
      (i = To(!1)),
      (u = Do.bind(null, ut, !1, i.queue)),
      (i = ce()),
      (r = { state: e, dispatch: null, action: t, pending: null }),
      (i.queue = r),
      (n = bv.bind(null, ut, r, u, n)),
      (r.dispatch = n),
      (i.memoizedState = t),
      [e, n, !1]
    );
  }
  function wd(t) {
    var e = Yt();
    return Vd(e, At, t);
  }
  function Vd(t, e, n) {
    if (
      ((e = bo(t, e, jd)[0]),
      (t = ul(an)[0]),
      typeof e == "object" && e !== null && typeof e.then == "function")
    )
      try {
        var i = Hi(e);
      } catch (h) {
        throw h === Vi ? al : h;
      }
    else i = e;
    e = Yt();
    var r = e.queue,
      u = r.dispatch;
    return (
      n !== e.memoizedState &&
        ((ut.flags |= 2048), Ha(9, cl(), Sv.bind(null, r, n), null)),
      [i, u, t]
    );
  }
  function Sv(t, e) {
    t.action = e;
  }
  function zd(t) {
    var e = Yt(),
      n = At;
    if (n !== null) return Vd(e, n, t);
    (Yt(), (e = e.memoizedState), (n = Yt()));
    var i = n.queue.dispatch;
    return ((n.memoizedState = t), [e, i, !1]);
  }
  function Ha(t, e, n, i) {
    return (
      (t = { tag: t, create: n, deps: i, inst: e, next: null }),
      (e = ut.updateQueue),
      e === null && ((e = vo()), (ut.updateQueue = e)),
      (n = e.lastEffect),
      n === null
        ? (e.lastEffect = t.next = t)
        : ((i = n.next), (n.next = t), (t.next = i), (e.lastEffect = t)),
      t
    );
  }
  function cl() {
    return { destroy: void 0, resource: void 0 };
  }
  function _d() {
    return Yt().memoizedState;
  }
  function fl(t, e, n, i) {
    var r = ce();
    ((i = i === void 0 ? null : i),
      (ut.flags |= t),
      (r.memoizedState = Ha(1 | e, cl(), n, i)));
  }
  function Gi(t, e, n, i) {
    var r = Yt();
    i = i === void 0 ? null : i;
    var u = r.memoizedState.inst;
    At !== null && i !== null && ho(i, At.memoizedState.deps)
      ? (r.memoizedState = Ha(e, u, n, i))
      : ((ut.flags |= t), (r.memoizedState = Ha(1 | e, u, n, i)));
  }
  function Ud(t, e) {
    fl(8390656, 8, t, e);
  }
  function Bd(t, e) {
    Gi(2048, 8, t, e);
  }
  function Ld(t, e) {
    return Gi(4, 2, t, e);
  }
  function Hd(t, e) {
    return Gi(4, 4, t, e);
  }
  function Gd(t, e) {
    if (typeof e == "function") {
      t = t();
      var n = e(t);
      return function () {
        typeof n == "function" ? n() : e(null);
      };
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null;
        }
      );
  }
  function Yd(t, e, n) {
    ((n = n != null ? n.concat([t]) : null), Gi(4, 4, Gd.bind(null, e, t), n));
  }
  function Eo() {}
  function qd(t, e) {
    var n = Yt();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    return e !== null && ho(e, i[1]) ? i[0] : ((n.memoizedState = [t, e]), t);
  }
  function Xd(t, e) {
    var n = Yt();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    if (e !== null && ho(e, i[1])) return i[0];
    if (((i = t()), na)) {
      gn(!0);
      try {
        t();
      } finally {
        gn(!1);
      }
    }
    return ((n.memoizedState = [i, e]), i);
  }
  function Mo(t, e, n) {
    return n === void 0 || (Tn & 1073741824) !== 0
      ? (t.memoizedState = e)
      : ((t.memoizedState = n), (t = Kh()), (ut.lanes |= t), (Rn |= t), n);
  }
  function kd(t, e, n, i) {
    return ye(n, e)
      ? n
      : Ua.current !== null
        ? ((t = Mo(t, n, i)), ye(t, e) || (Qt = !0), t)
        : (Tn & 42) === 0
          ? ((Qt = !0), (t.memoizedState = n))
          : ((t = Kh()), (ut.lanes |= t), (Rn |= t), e);
  }
  function Zd(t, e, n, i, r) {
    var u = B.p;
    B.p = u !== 0 && 8 > u ? u : 8;
    var h = z.T,
      v = {};
    ((z.T = v), Do(t, !1, e, n));
    try {
      var T = r(),
        R = z.S;
      if (
        (R !== null && R(v, T),
        T !== null && typeof T == "object" && typeof T.then == "function")
      ) {
        var _ = yv(T, i);
        Yi(t, e, _, Te(t));
      } else Yi(t, e, i, Te(t));
    } catch (Y) {
      Yi(t, e, { then: function () {}, status: "rejected", reason: Y }, Te());
    } finally {
      ((B.p = u), (z.T = h));
    }
  }
  function Tv() {}
  function Co(t, e, n, i) {
    if (t.tag !== 5) throw Error(o(476));
    var r = Kd(t).queue;
    Zd(
      t,
      r,
      e,
      K,
      n === null
        ? Tv
        : function () {
            return (Qd(t), n(i));
          },
    );
  }
  function Kd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: K,
      baseState: K,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: an,
        lastRenderedState: K,
      },
      next: null,
    };
    var n = {};
    return (
      (e.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: an,
          lastRenderedState: n,
        },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    );
  }
  function Qd(t) {
    var e = Kd(t).next.queue;
    Yi(t, e, {}, Te());
  }
  function No() {
    return ae(ss);
  }
  function Pd() {
    return Yt().memoizedState;
  }
  function Jd() {
    return Yt().memoizedState;
  }
  function Av(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = Te();
          t = bn(n);
          var i = Sn(e, t, n);
          (i !== null && (Ae(i, e, n), _i(i, e, n)),
            (e = { cache: no() }),
            (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function Ev(t, e, n) {
    var i = Te();
    ((n = {
      lane: i,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      dl(t)
        ? $d(e, n)
        : ((n = Kr(t, e, n, i)), n !== null && (Ae(n, t, i), Wd(n, e, i))));
  }
  function Fd(t, e, n) {
    var i = Te();
    Yi(t, e, n, i);
  }
  function Yi(t, e, n, i) {
    var r = {
      lane: i,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (dl(t)) $d(e, r);
    else {
      var u = t.alternate;
      if (
        t.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = e.lastRenderedReducer), u !== null)
      )
        try {
          var h = e.lastRenderedState,
            v = u(h, n);
          if (((r.hasEagerState = !0), (r.eagerState = v), ye(v, h)))
            return (Js(t, e, r, 0), Dt === null && Ps(), !1);
        } catch {
        } finally {
        }
      if (((n = Kr(t, e, r, i)), n !== null))
        return (Ae(n, t, i), Wd(n, e, i), !0);
    }
    return !1;
  }
  function Do(t, e, n, i) {
    if (
      ((i = {
        lane: 2,
        revertLane: lu(),
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      dl(t))
    ) {
      if (e) throw Error(o(479));
    } else ((e = Kr(t, n, i, 2)), e !== null && Ae(e, t, 2));
  }
  function dl(t) {
    var e = t.alternate;
    return t === ut || (e !== null && e === ut);
  }
  function $d(t, e) {
    Ba = ll = !0;
    var n = t.pending;
    (n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
      (t.pending = e));
  }
  function Wd(t, e, n) {
    if ((n & 4194048) !== 0) {
      var i = e.lanes;
      ((i &= t.pendingLanes), (n |= i), (e.lanes = n), lf(t, n));
    }
  }
  var hl = {
      readContext: ae,
      use: ol,
      useCallback: Bt,
      useContext: Bt,
      useEffect: Bt,
      useImperativeHandle: Bt,
      useLayoutEffect: Bt,
      useInsertionEffect: Bt,
      useMemo: Bt,
      useReducer: Bt,
      useRef: Bt,
      useState: Bt,
      useDebugValue: Bt,
      useDeferredValue: Bt,
      useTransition: Bt,
      useSyncExternalStore: Bt,
      useId: Bt,
      useHostTransitionStatus: Bt,
      useFormState: Bt,
      useActionState: Bt,
      useOptimistic: Bt,
      useMemoCache: Bt,
      useCacheRefresh: Bt,
    },
    Id = {
      readContext: ae,
      use: ol,
      useCallback: function (t, e) {
        return ((ce().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: ae,
      useEffect: Ud,
      useImperativeHandle: function (t, e, n) {
        ((n = n != null ? n.concat([t]) : null),
          fl(4194308, 4, Gd.bind(null, e, t), n));
      },
      useLayoutEffect: function (t, e) {
        return fl(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        fl(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var n = ce();
        e = e === void 0 ? null : e;
        var i = t();
        if (na) {
          gn(!0);
          try {
            t();
          } finally {
            gn(!1);
          }
        }
        return ((n.memoizedState = [i, e]), i);
      },
      useReducer: function (t, e, n) {
        var i = ce();
        if (n !== void 0) {
          var r = n(e);
          if (na) {
            gn(!0);
            try {
              n(e);
            } finally {
              gn(!1);
            }
          }
        } else r = e;
        return (
          (i.memoizedState = i.baseState = r),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: r,
          }),
          (i.queue = t),
          (t = t.dispatch = Ev.bind(null, ut, t)),
          [i.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = ce();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = To(t);
        var e = t.queue,
          n = Fd.bind(null, ut, e);
        return ((e.dispatch = n), [t.memoizedState, n]);
      },
      useDebugValue: Eo,
      useDeferredValue: function (t, e) {
        var n = ce();
        return Mo(n, t, e);
      },
      useTransition: function () {
        var t = To(!1);
        return (
          (t = Zd.bind(null, ut, t.queue, !0, !1)),
          (ce().memoizedState = t),
          [!1, t]
        );
      },
      useSyncExternalStore: function (t, e, n) {
        var i = ut,
          r = ce();
        if (xt) {
          if (n === void 0) throw Error(o(407));
          n = n();
        } else {
          if (((n = e()), Dt === null)) throw Error(o(349));
          (gt & 124) !== 0 || bd(i, e, n);
        }
        r.memoizedState = n;
        var u = { value: n, getSnapshot: e };
        return (
          (r.queue = u),
          Ud(Td.bind(null, i, u, t), [t]),
          (i.flags |= 2048),
          Ha(9, cl(), Sd.bind(null, i, u, n, e), null),
          n
        );
      },
      useId: function () {
        var t = ce(),
          e = Dt.identifierPrefix;
        if (xt) {
          var n = tn,
            i = Ie;
          ((n = (i & ~(1 << (32 - pe(i) - 1))).toString(32) + n),
            (e = "«" + e + "R" + n),
            (n = rl++),
            0 < n && (e += "H" + n.toString(32)),
            (e += "»"));
        } else ((n = vv++), (e = "«" + e + "r" + n.toString(32) + "»"));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: No,
      useFormState: Od,
      useActionState: Od,
      useOptimistic: function (t) {
        var e = ce();
        e.memoizedState = e.baseState = t;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (e.queue = n),
          (e = Do.bind(null, ut, !0, n)),
          (n.dispatch = e),
          [t, e]
        );
      },
      useMemoCache: xo,
      useCacheRefresh: function () {
        return (ce().memoizedState = Av.bind(null, ut));
      },
    },
    th = {
      readContext: ae,
      use: ol,
      useCallback: qd,
      useContext: ae,
      useEffect: Bd,
      useImperativeHandle: Yd,
      useInsertionEffect: Ld,
      useLayoutEffect: Hd,
      useMemo: Xd,
      useReducer: ul,
      useRef: _d,
      useState: function () {
        return ul(an);
      },
      useDebugValue: Eo,
      useDeferredValue: function (t, e) {
        var n = Yt();
        return kd(n, At.memoizedState, t, e);
      },
      useTransition: function () {
        var t = ul(an)[0],
          e = Yt().memoizedState;
        return [typeof t == "boolean" ? t : Hi(t), e];
      },
      useSyncExternalStore: xd,
      useId: Pd,
      useHostTransitionStatus: No,
      useFormState: wd,
      useActionState: wd,
      useOptimistic: function (t, e) {
        var n = Yt();
        return Md(n, At, t, e);
      },
      useMemoCache: xo,
      useCacheRefresh: Jd,
    },
    Mv = {
      readContext: ae,
      use: ol,
      useCallback: qd,
      useContext: ae,
      useEffect: Bd,
      useImperativeHandle: Yd,
      useInsertionEffect: Ld,
      useLayoutEffect: Hd,
      useMemo: Xd,
      useReducer: So,
      useRef: _d,
      useState: function () {
        return So(an);
      },
      useDebugValue: Eo,
      useDeferredValue: function (t, e) {
        var n = Yt();
        return At === null ? Mo(n, t, e) : kd(n, At.memoizedState, t, e);
      },
      useTransition: function () {
        var t = So(an)[0],
          e = Yt().memoizedState;
        return [typeof t == "boolean" ? t : Hi(t), e];
      },
      useSyncExternalStore: xd,
      useId: Pd,
      useHostTransitionStatus: No,
      useFormState: zd,
      useActionState: zd,
      useOptimistic: function (t, e) {
        var n = Yt();
        return At !== null
          ? Md(n, At, t, e)
          : ((n.baseState = t), [t, n.queue.dispatch]);
      },
      useMemoCache: xo,
      useCacheRefresh: Jd,
    },
    Ga = null,
    qi = 0;
  function ml(t) {
    var e = qi;
    return ((qi += 1), Ga === null && (Ga = []), fd(Ga, t, e));
  }
  function Xi(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function gl(t, e) {
    throw e.$$typeof === b
      ? Error(o(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          o(
            31,
            t === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : t,
          ),
        ));
  }
  function eh(t) {
    var e = t._init;
    return e(t._payload);
  }
  function nh(t) {
    function e(N, E) {
      if (t) {
        var D = N.deletions;
        D === null ? ((N.deletions = [E]), (N.flags |= 16)) : D.push(E);
      }
    }
    function n(N, E) {
      if (!t) return null;
      for (; E !== null; ) (e(N, E), (E = E.sibling));
      return null;
    }
    function i(N) {
      for (var E = new Map(); N !== null; )
        (N.key !== null ? E.set(N.key, N) : E.set(N.index, N), (N = N.sibling));
      return E;
    }
    function r(N, E) {
      return ((N = We(N, E)), (N.index = 0), (N.sibling = null), N);
    }
    function u(N, E, D) {
      return (
        (N.index = D),
        t
          ? ((D = N.alternate),
            D !== null
              ? ((D = D.index), D < E ? ((N.flags |= 67108866), E) : D)
              : ((N.flags |= 67108866), E))
          : ((N.flags |= 1048576), E)
      );
    }
    function h(N) {
      return (t && N.alternate === null && (N.flags |= 67108866), N);
    }
    function v(N, E, D, L) {
      return E === null || E.tag !== 6
        ? ((E = Pr(D, N.mode, L)), (E.return = N), E)
        : ((E = r(E, D)), (E.return = N), E);
    }
    function T(N, E, D, L) {
      var $ = D.type;
      return $ === U
        ? _(N, E, D.props.children, L, D.key)
        : E !== null &&
            (E.elementType === $ ||
              (typeof $ == "object" &&
                $ !== null &&
                $.$$typeof === F &&
                eh($) === E.type))
          ? ((E = r(E, D.props)), Xi(E, D), (E.return = N), E)
          : ((E = $s(D.type, D.key, D.props, null, N.mode, L)),
            Xi(E, D),
            (E.return = N),
            E);
    }
    function R(N, E, D, L) {
      return E === null ||
        E.tag !== 4 ||
        E.stateNode.containerInfo !== D.containerInfo ||
        E.stateNode.implementation !== D.implementation
        ? ((E = Jr(D, N.mode, L)), (E.return = N), E)
        : ((E = r(E, D.children || [])), (E.return = N), E);
    }
    function _(N, E, D, L, $) {
      return E === null || E.tag !== 7
        ? ((E = Pn(D, N.mode, L, $)), (E.return = N), E)
        : ((E = r(E, D)), (E.return = N), E);
    }
    function Y(N, E, D) {
      if (
        (typeof E == "string" && E !== "") ||
        typeof E == "number" ||
        typeof E == "bigint"
      )
        return ((E = Pr("" + E, N.mode, D)), (E.return = N), E);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case S:
            return (
              (D = $s(E.type, E.key, E.props, null, N.mode, D)),
              Xi(D, E),
              (D.return = N),
              D
            );
          case M:
            return ((E = Jr(E, N.mode, D)), (E.return = N), E);
          case F:
            var L = E._init;
            return ((E = L(E._payload)), Y(N, E, D));
        }
        if (ft(E) || mt(E))
          return ((E = Pn(E, N.mode, D, null)), (E.return = N), E);
        if (typeof E.then == "function") return Y(N, ml(E), D);
        if (E.$$typeof === C) return Y(N, el(N, E), D);
        gl(N, E);
      }
      return null;
    }
    function j(N, E, D, L) {
      var $ = E !== null ? E.key : null;
      if (
        (typeof D == "string" && D !== "") ||
        typeof D == "number" ||
        typeof D == "bigint"
      )
        return $ !== null ? null : v(N, E, "" + D, L);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case S:
            return D.key === $ ? T(N, E, D, L) : null;
          case M:
            return D.key === $ ? R(N, E, D, L) : null;
          case F:
            return (($ = D._init), (D = $(D._payload)), j(N, E, D, L));
        }
        if (ft(D) || mt(D)) return $ !== null ? null : _(N, E, D, L, null);
        if (typeof D.then == "function") return j(N, E, ml(D), L);
        if (D.$$typeof === C) return j(N, E, el(N, D), L);
        gl(N, D);
      }
      return null;
    }
    function O(N, E, D, L, $) {
      if (
        (typeof L == "string" && L !== "") ||
        typeof L == "number" ||
        typeof L == "bigint"
      )
        return ((N = N.get(D) || null), v(E, N, "" + L, $));
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case S:
            return (
              (N = N.get(L.key === null ? D : L.key) || null),
              T(E, N, L, $)
            );
          case M:
            return (
              (N = N.get(L.key === null ? D : L.key) || null),
              R(E, N, L, $)
            );
          case F:
            var ct = L._init;
            return ((L = ct(L._payload)), O(N, E, D, L, $));
        }
        if (ft(L) || mt(L))
          return ((N = N.get(D) || null), _(E, N, L, $, null));
        if (typeof L.then == "function") return O(N, E, D, ml(L), $);
        if (L.$$typeof === C) return O(N, E, D, el(E, L), $);
        gl(E, L);
      }
      return null;
    }
    function at(N, E, D, L) {
      for (
        var $ = null, ct = null, I = E, nt = (E = 0), Jt = null;
        I !== null && nt < D.length;
        nt++
      ) {
        I.index > nt ? ((Jt = I), (I = null)) : (Jt = I.sibling);
        var vt = j(N, I, D[nt], L);
        if (vt === null) {
          I === null && (I = Jt);
          break;
        }
        (t && I && vt.alternate === null && e(N, I),
          (E = u(vt, E, nt)),
          ct === null ? ($ = vt) : (ct.sibling = vt),
          (ct = vt),
          (I = Jt));
      }
      if (nt === D.length) return (n(N, I), xt && Fn(N, nt), $);
      if (I === null) {
        for (; nt < D.length; nt++)
          ((I = Y(N, D[nt], L)),
            I !== null &&
              ((E = u(I, E, nt)),
              ct === null ? ($ = I) : (ct.sibling = I),
              (ct = I)));
        return (xt && Fn(N, nt), $);
      }
      for (I = i(I); nt < D.length; nt++)
        ((Jt = O(I, N, nt, D[nt], L)),
          Jt !== null &&
            (t &&
              Jt.alternate !== null &&
              I.delete(Jt.key === null ? nt : Jt.key),
            (E = u(Jt, E, nt)),
            ct === null ? ($ = Jt) : (ct.sibling = Jt),
            (ct = Jt)));
      return (
        t &&
          I.forEach(function (Ln) {
            return e(N, Ln);
          }),
        xt && Fn(N, nt),
        $
      );
    }
    function et(N, E, D, L) {
      if (D == null) throw Error(o(151));
      for (
        var $ = null, ct = null, I = E, nt = (E = 0), Jt = null, vt = D.next();
        I !== null && !vt.done;
        nt++, vt = D.next()
      ) {
        I.index > nt ? ((Jt = I), (I = null)) : (Jt = I.sibling);
        var Ln = j(N, I, vt.value, L);
        if (Ln === null) {
          I === null && (I = Jt);
          break;
        }
        (t && I && Ln.alternate === null && e(N, I),
          (E = u(Ln, E, nt)),
          ct === null ? ($ = Ln) : (ct.sibling = Ln),
          (ct = Ln),
          (I = Jt));
      }
      if (vt.done) return (n(N, I), xt && Fn(N, nt), $);
      if (I === null) {
        for (; !vt.done; nt++, vt = D.next())
          ((vt = Y(N, vt.value, L)),
            vt !== null &&
              ((E = u(vt, E, nt)),
              ct === null ? ($ = vt) : (ct.sibling = vt),
              (ct = vt)));
        return (xt && Fn(N, nt), $);
      }
      for (I = i(I); !vt.done; nt++, vt = D.next())
        ((vt = O(I, N, nt, vt.value, L)),
          vt !== null &&
            (t &&
              vt.alternate !== null &&
              I.delete(vt.key === null ? nt : vt.key),
            (E = u(vt, E, nt)),
            ct === null ? ($ = vt) : (ct.sibling = vt),
            (ct = vt)));
      return (
        t &&
          I.forEach(function (Cx) {
            return e(N, Cx);
          }),
        xt && Fn(N, nt),
        $
      );
    }
    function Mt(N, E, D, L) {
      if (
        (typeof D == "object" &&
          D !== null &&
          D.type === U &&
          D.key === null &&
          (D = D.props.children),
        typeof D == "object" && D !== null)
      ) {
        switch (D.$$typeof) {
          case S:
            t: {
              for (var $ = D.key; E !== null; ) {
                if (E.key === $) {
                  if ((($ = D.type), $ === U)) {
                    if (E.tag === 7) {
                      (n(N, E.sibling),
                        (L = r(E, D.props.children)),
                        (L.return = N),
                        (N = L));
                      break t;
                    }
                  } else if (
                    E.elementType === $ ||
                    (typeof $ == "object" &&
                      $ !== null &&
                      $.$$typeof === F &&
                      eh($) === E.type)
                  ) {
                    (n(N, E.sibling),
                      (L = r(E, D.props)),
                      Xi(L, D),
                      (L.return = N),
                      (N = L));
                    break t;
                  }
                  n(N, E);
                  break;
                } else e(N, E);
                E = E.sibling;
              }
              D.type === U
                ? ((L = Pn(D.props.children, N.mode, L, D.key)),
                  (L.return = N),
                  (N = L))
                : ((L = $s(D.type, D.key, D.props, null, N.mode, L)),
                  Xi(L, D),
                  (L.return = N),
                  (N = L));
            }
            return h(N);
          case M:
            t: {
              for ($ = D.key; E !== null; ) {
                if (E.key === $)
                  if (
                    E.tag === 4 &&
                    E.stateNode.containerInfo === D.containerInfo &&
                    E.stateNode.implementation === D.implementation
                  ) {
                    (n(N, E.sibling),
                      (L = r(E, D.children || [])),
                      (L.return = N),
                      (N = L));
                    break t;
                  } else {
                    n(N, E);
                    break;
                  }
                else e(N, E);
                E = E.sibling;
              }
              ((L = Jr(D, N.mode, L)), (L.return = N), (N = L));
            }
            return h(N);
          case F:
            return (($ = D._init), (D = $(D._payload)), Mt(N, E, D, L));
        }
        if (ft(D)) return at(N, E, D, L);
        if (mt(D)) {
          if ((($ = mt(D)), typeof $ != "function")) throw Error(o(150));
          return ((D = $.call(D)), et(N, E, D, L));
        }
        if (typeof D.then == "function") return Mt(N, E, ml(D), L);
        if (D.$$typeof === C) return Mt(N, E, el(N, D), L);
        gl(N, D);
      }
      return (typeof D == "string" && D !== "") ||
        typeof D == "number" ||
        typeof D == "bigint"
        ? ((D = "" + D),
          E !== null && E.tag === 6
            ? (n(N, E.sibling), (L = r(E, D)), (L.return = N), (N = L))
            : (n(N, E), (L = Pr(D, N.mode, L)), (L.return = N), (N = L)),
          h(N))
        : n(N, E);
    }
    return function (N, E, D, L) {
      try {
        qi = 0;
        var $ = Mt(N, E, D, L);
        return ((Ga = null), $);
      } catch (I) {
        if (I === Vi || I === al) throw I;
        var ct = ve(29, I, null, N.mode);
        return ((ct.lanes = L), (ct.return = N), ct);
      } finally {
      }
    };
  }
  var Ya = nh(!0),
    ah = nh(!1),
    je = H(null),
    Xe = null;
  function An(t) {
    var e = t.alternate;
    (P(kt, kt.current & 1),
      P(je, t),
      Xe === null &&
        (e === null || Ua.current !== null || e.memoizedState !== null) &&
        (Xe = t));
  }
  function ih(t) {
    if (t.tag === 22) {
      if ((P(kt, kt.current), P(je, t), Xe === null)) {
        var e = t.alternate;
        e !== null && e.memoizedState !== null && (Xe = t);
      }
    } else En();
  }
  function En() {
    (P(kt, kt.current), P(je, je.current));
  }
  function sn(t) {
    (J(je), Xe === t && (Xe = null), J(kt));
  }
  var kt = H(0);
  function pl(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === "$?" || vu(n))
        )
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        ((e.child.return = e), (e = e.child));
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
    return null;
  }
  function Ro(t, e, n, i) {
    ((e = t.memoizedState),
      (n = n(i, e)),
      (n = n == null ? e : y({}, e, n)),
      (t.memoizedState = n),
      t.lanes === 0 && (t.updateQueue.baseState = n));
  }
  var jo = {
    enqueueSetState: function (t, e, n) {
      t = t._reactInternals;
      var i = Te(),
        r = bn(i);
      ((r.payload = e),
        n != null && (r.callback = n),
        (e = Sn(t, r, i)),
        e !== null && (Ae(e, t, i), _i(e, t, i)));
    },
    enqueueReplaceState: function (t, e, n) {
      t = t._reactInternals;
      var i = Te(),
        r = bn(i);
      ((r.tag = 1),
        (r.payload = e),
        n != null && (r.callback = n),
        (e = Sn(t, r, i)),
        e !== null && (Ae(e, t, i), _i(e, t, i)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var n = Te(),
        i = bn(n);
      ((i.tag = 2),
        e != null && (i.callback = e),
        (e = Sn(t, i, n)),
        e !== null && (Ae(e, t, n), _i(e, t, n)));
    },
  };
  function sh(t, e, n, i, r, u, h) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(i, u, h)
        : e.prototype && e.prototype.isPureReactComponent
          ? !Mi(n, i) || !Mi(r, u)
          : !0
    );
  }
  function lh(t, e, n, i) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == "function" &&
        e.componentWillReceiveProps(n, i),
      typeof e.UNSAFE_componentWillReceiveProps == "function" &&
        e.UNSAFE_componentWillReceiveProps(n, i),
      e.state !== t && jo.enqueueReplaceState(e, e.state, null));
  }
  function aa(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var i in e) i !== "ref" && (n[i] = e[i]);
    }
    if ((t = t.defaultProps)) {
      n === e && (n = y({}, n));
      for (var r in t) n[r] === void 0 && (n[r] = t[r]);
    }
    return n;
  }
  var yl =
    typeof reportError == "function"
      ? reportError
      : function (t) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var e = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof t == "object" &&
                t !== null &&
                typeof t.message == "string"
                  ? String(t.message)
                  : String(t),
              error: t,
            });
            if (!window.dispatchEvent(e)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", t);
            return;
          }
          console.error(t);
        };
  function rh(t) {
    yl(t);
  }
  function oh(t) {
    console.error(t);
  }
  function uh(t) {
    yl(t);
  }
  function vl(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function ch(t, e, n) {
    try {
      var i = t.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null,
      });
    } catch (r) {
      setTimeout(function () {
        throw r;
      });
    }
  }
  function Oo(t, e, n) {
    return (
      (n = bn(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        vl(t, e);
      }),
      n
    );
  }
  function fh(t) {
    return ((t = bn(t)), (t.tag = 3), t);
  }
  function dh(t, e, n, i) {
    var r = n.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var u = i.value;
      ((t.payload = function () {
        return r(u);
      }),
        (t.callback = function () {
          ch(e, n, i);
        }));
    }
    var h = n.stateNode;
    h !== null &&
      typeof h.componentDidCatch == "function" &&
      (t.callback = function () {
        (ch(e, n, i),
          typeof r != "function" &&
            (jn === null ? (jn = new Set([this])) : jn.add(this)));
        var v = i.stack;
        this.componentDidCatch(i.value, {
          componentStack: v !== null ? v : "",
        });
      });
  }
  function Cv(t, e, n, i, r) {
    if (
      ((n.flags |= 32768),
      i !== null && typeof i == "object" && typeof i.then == "function")
    ) {
      if (
        ((e = n.alternate),
        e !== null && ji(e, n, r, !0),
        (n = je.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 13:
            return (
              Xe === null ? eu() : n.alternate === null && _t === 0 && (_t = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = r),
              i === so
                ? (n.flags |= 16384)
                : ((e = n.updateQueue),
                  e === null ? (n.updateQueue = new Set([i])) : e.add(i),
                  au(t, i, r)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              i === so
                ? (n.flags |= 16384)
                : ((e = n.updateQueue),
                  e === null
                    ? ((e = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([i]),
                      }),
                      (n.updateQueue = e))
                    : ((n = e.retryQueue),
                      n === null ? (e.retryQueue = new Set([i])) : n.add(i)),
                  au(t, i, r)),
              !1
            );
        }
        throw Error(o(435, n.tag));
      }
      return (au(t, i, r), eu(), !1);
    }
    if (xt)
      return (
        (e = je.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = r),
            i !== Wr && ((t = Error(o(422), { cause: i })), Ri(Ce(t, n))))
          : (i !== Wr && ((e = Error(o(423), { cause: i })), Ri(Ce(e, n))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (r &= -r),
            (t.lanes |= r),
            (i = Ce(i, n)),
            (r = Oo(t.stateNode, i, r)),
            oo(t, r),
            _t !== 4 && (_t = 2)),
        !1
      );
    var u = Error(o(520), { cause: i });
    if (
      ((u = Ce(u, n)),
      Fi === null ? (Fi = [u]) : Fi.push(u),
      _t !== 4 && (_t = 2),
      e === null)
    )
      return !0;
    ((i = Ce(i, n)), (n = e));
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (t = r & -r),
            (n.lanes |= t),
            (t = Oo(n.stateNode, i, t)),
            oo(n, t),
            !1
          );
        case 1:
          if (
            ((e = n.type),
            (u = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == "function" ||
                (u !== null &&
                  typeof u.componentDidCatch == "function" &&
                  (jn === null || !jn.has(u)))))
          )
            return (
              (n.flags |= 65536),
              (r &= -r),
              (n.lanes |= r),
              (r = fh(r)),
              dh(r, t, n, i),
              oo(n, r),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var hh = Error(o(461)),
    Qt = !1;
  function $t(t, e, n, i) {
    e.child = t === null ? ah(e, null, n, i) : Ya(e, t.child, n, i);
  }
  function mh(t, e, n, i, r) {
    n = n.render;
    var u = e.ref;
    if ("ref" in i) {
      var h = {};
      for (var v in i) v !== "ref" && (h[v] = i[v]);
    } else h = i;
    return (
      ta(e),
      (i = mo(t, e, n, h, u, r)),
      (v = go()),
      t !== null && !Qt
        ? (po(t, e, r), ln(t, e, r))
        : (xt && v && Fr(e), (e.flags |= 1), $t(t, e, i, r), e.child)
    );
  }
  function gh(t, e, n, i, r) {
    if (t === null) {
      var u = n.type;
      return typeof u == "function" &&
        !Qr(u) &&
        u.defaultProps === void 0 &&
        n.compare === null
        ? ((e.tag = 15), (e.type = u), ph(t, e, u, i, r))
        : ((t = $s(n.type, null, i, e, e.mode, r)),
          (t.ref = e.ref),
          (t.return = e),
          (e.child = t));
    }
    if (((u = t.child), !Ho(t, r))) {
      var h = u.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Mi), n(h, i) && t.ref === e.ref)
      )
        return ln(t, e, r);
    }
    return (
      (e.flags |= 1),
      (t = We(u, i)),
      (t.ref = e.ref),
      (t.return = e),
      (e.child = t)
    );
  }
  function ph(t, e, n, i, r) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (Mi(u, i) && t.ref === e.ref)
        if (((Qt = !1), (e.pendingProps = i = u), Ho(t, r)))
          (t.flags & 131072) !== 0 && (Qt = !0);
        else return ((e.lanes = t.lanes), ln(t, e, r));
    }
    return wo(t, e, n, i, r);
  }
  function yh(t, e, n) {
    var i = e.pendingProps,
      r = i.children,
      u = t !== null ? t.memoizedState : null;
    if (i.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (((i = u !== null ? u.baseLanes | n : n), t !== null)) {
          for (r = e.child = t.child, u = 0; r !== null; )
            ((u = u | r.lanes | r.childLanes), (r = r.sibling));
          e.childLanes = u & ~i;
        } else ((e.childLanes = 0), (e.child = null));
        return vh(t, e, i, n);
      }
      if ((n & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && nl(e, u !== null ? u.cachePool : null),
          u !== null ? pd(e, u) : co(),
          ih(e));
      else
        return (
          (e.lanes = e.childLanes = 536870912),
          vh(t, e, u !== null ? u.baseLanes | n : n, n)
        );
    } else
      u !== null
        ? (nl(e, u.cachePool), pd(e, u), En(), (e.memoizedState = null))
        : (t !== null && nl(e, null), co(), En());
    return ($t(t, e, r, n), e.child);
  }
  function vh(t, e, n, i) {
    var r = io();
    return (
      (r = r === null ? null : { parent: Xt._currentValue, pool: r }),
      (e.memoizedState = { baseLanes: n, cachePool: r }),
      t !== null && nl(e, null),
      co(),
      ih(e),
      t !== null && ji(t, e, i, !0),
      null
    );
  }
  function xl(t, e) {
    var n = e.ref;
    if (n === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(o(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function wo(t, e, n, i, r) {
    return (
      ta(e),
      (n = mo(t, e, n, i, void 0, r)),
      (i = go()),
      t !== null && !Qt
        ? (po(t, e, r), ln(t, e, r))
        : (xt && i && Fr(e), (e.flags |= 1), $t(t, e, n, r), e.child)
    );
  }
  function xh(t, e, n, i, r, u) {
    return (
      ta(e),
      (e.updateQueue = null),
      (n = vd(e, i, n, r)),
      yd(t),
      (i = go()),
      t !== null && !Qt
        ? (po(t, e, u), ln(t, e, u))
        : (xt && i && Fr(e), (e.flags |= 1), $t(t, e, n, u), e.child)
    );
  }
  function bh(t, e, n, i, r) {
    if ((ta(e), e.stateNode === null)) {
      var u = Oa,
        h = n.contextType;
      (typeof h == "object" && h !== null && (u = ae(h)),
        (u = new n(i, u)),
        (e.memoizedState =
          u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = jo),
        (e.stateNode = u),
        (u._reactInternals = e),
        (u = e.stateNode),
        (u.props = i),
        (u.state = e.memoizedState),
        (u.refs = {}),
        lo(e),
        (h = n.contextType),
        (u.context = typeof h == "object" && h !== null ? ae(h) : Oa),
        (u.state = e.memoizedState),
        (h = n.getDerivedStateFromProps),
        typeof h == "function" && (Ro(e, n, h, i), (u.state = e.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function" ||
          (typeof u.UNSAFE_componentWillMount != "function" &&
            typeof u.componentWillMount != "function") ||
          ((h = u.state),
          typeof u.componentWillMount == "function" && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == "function" &&
            u.UNSAFE_componentWillMount(),
          h !== u.state && jo.enqueueReplaceState(u, u.state, null),
          Bi(e, i, u, r),
          Ui(),
          (u.state = e.memoizedState)),
        typeof u.componentDidMount == "function" && (e.flags |= 4194308),
        (i = !0));
    } else if (t === null) {
      u = e.stateNode;
      var v = e.memoizedProps,
        T = aa(n, v);
      u.props = T;
      var R = u.context,
        _ = n.contextType;
      ((h = Oa), typeof _ == "object" && _ !== null && (h = ae(_)));
      var Y = n.getDerivedStateFromProps;
      ((_ =
        typeof Y == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function"),
        (v = e.pendingProps !== v),
        _ ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((v || R !== h) && lh(e, u, i, h)),
        (xn = !1));
      var j = e.memoizedState;
      ((u.state = j),
        Bi(e, i, u, r),
        Ui(),
        (R = e.memoizedState),
        v || j !== R || xn
          ? (typeof Y == "function" && (Ro(e, n, Y, i), (R = e.memoizedState)),
            (T = xn || sh(e, n, T, i, j, R, h))
              ? (_ ||
                  (typeof u.UNSAFE_componentWillMount != "function" &&
                    typeof u.componentWillMount != "function") ||
                  (typeof u.componentWillMount == "function" &&
                    u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == "function" &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == "function" &&
                  (e.flags |= 4194308))
              : (typeof u.componentDidMount == "function" &&
                  (e.flags |= 4194308),
                (e.memoizedProps = i),
                (e.memoizedState = R)),
            (u.props = i),
            (u.state = R),
            (u.context = h),
            (i = T))
          : (typeof u.componentDidMount == "function" && (e.flags |= 4194308),
            (i = !1)));
    } else {
      ((u = e.stateNode),
        ro(t, e),
        (h = e.memoizedProps),
        (_ = aa(n, h)),
        (u.props = _),
        (Y = e.pendingProps),
        (j = u.context),
        (R = n.contextType),
        (T = Oa),
        typeof R == "object" && R !== null && (T = ae(R)),
        (v = n.getDerivedStateFromProps),
        (R =
          typeof v == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function") ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((h !== Y || j !== T) && lh(e, u, i, T)),
        (xn = !1),
        (j = e.memoizedState),
        (u.state = j),
        Bi(e, i, u, r),
        Ui());
      var O = e.memoizedState;
      h !== Y ||
      j !== O ||
      xn ||
      (t !== null && t.dependencies !== null && tl(t.dependencies))
        ? (typeof v == "function" && (Ro(e, n, v, i), (O = e.memoizedState)),
          (_ =
            xn ||
            sh(e, n, _, i, j, O, T) ||
            (t !== null && t.dependencies !== null && tl(t.dependencies)))
            ? (R ||
                (typeof u.UNSAFE_componentWillUpdate != "function" &&
                  typeof u.componentWillUpdate != "function") ||
                (typeof u.componentWillUpdate == "function" &&
                  u.componentWillUpdate(i, O, T),
                typeof u.UNSAFE_componentWillUpdate == "function" &&
                  u.UNSAFE_componentWillUpdate(i, O, T)),
              typeof u.componentDidUpdate == "function" && (e.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == "function" &&
                (e.flags |= 1024))
            : (typeof u.componentDidUpdate != "function" ||
                (h === t.memoizedProps && j === t.memoizedState) ||
                (e.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != "function" ||
                (h === t.memoizedProps && j === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = i),
              (e.memoizedState = O)),
          (u.props = i),
          (u.state = O),
          (u.context = T),
          (i = _))
        : (typeof u.componentDidUpdate != "function" ||
            (h === t.memoizedProps && j === t.memoizedState) ||
            (e.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != "function" ||
            (h === t.memoizedProps && j === t.memoizedState) ||
            (e.flags |= 1024),
          (i = !1));
    }
    return (
      (u = i),
      xl(t, e),
      (i = (e.flags & 128) !== 0),
      u || i
        ? ((u = e.stateNode),
          (n =
            i && typeof n.getDerivedStateFromError != "function"
              ? null
              : u.render()),
          (e.flags |= 1),
          t !== null && i
            ? ((e.child = Ya(e, t.child, null, r)),
              (e.child = Ya(e, null, n, r)))
            : $t(t, e, n, r),
          (e.memoizedState = u.state),
          (t = e.child))
        : (t = ln(t, e, r)),
      t
    );
  }
  function Sh(t, e, n, i) {
    return (Di(), (e.flags |= 256), $t(t, e, n, i), e.child);
  }
  var Vo = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function zo(t) {
    return { baseLanes: t, cachePool: od() };
  }
  function _o(t, e, n) {
    return ((t = t !== null ? t.childLanes & ~n : 0), e && (t |= Oe), t);
  }
  function Th(t, e, n) {
    var i = e.pendingProps,
      r = !1,
      u = (e.flags & 128) !== 0,
      h;
    if (
      ((h = u) ||
        (h =
          t !== null && t.memoizedState === null ? !1 : (kt.current & 2) !== 0),
      h && ((r = !0), (e.flags &= -129)),
      (h = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (xt) {
        if ((r ? An(e) : En(), xt)) {
          var v = zt,
            T;
          if ((T = v)) {
            t: {
              for (T = v, v = qe; T.nodeType !== 8; ) {
                if (!v) {
                  v = null;
                  break t;
                }
                if (((T = He(T.nextSibling)), T === null)) {
                  v = null;
                  break t;
                }
              }
              v = T;
            }
            v !== null
              ? ((e.memoizedState = {
                  dehydrated: v,
                  treeContext: Jn !== null ? { id: Ie, overflow: tn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (T = ve(18, null, null, 0)),
                (T.stateNode = v),
                (T.return = e),
                (e.child = T),
                (le = e),
                (zt = null),
                (T = !0))
              : (T = !1);
          }
          T || Wn(e);
        }
        if (
          ((v = e.memoizedState),
          v !== null && ((v = v.dehydrated), v !== null))
        )
          return (vu(v) ? (e.lanes = 32) : (e.lanes = 536870912), null);
        sn(e);
      }
      return (
        (v = i.children),
        (i = i.fallback),
        r
          ? (En(),
            (r = e.mode),
            (v = bl({ mode: "hidden", children: v }, r)),
            (i = Pn(i, r, n, null)),
            (v.return = e),
            (i.return = e),
            (v.sibling = i),
            (e.child = v),
            (r = e.child),
            (r.memoizedState = zo(n)),
            (r.childLanes = _o(t, h, n)),
            (e.memoizedState = Vo),
            i)
          : (An(e), Uo(e, v))
      );
    }
    if (
      ((T = t.memoizedState), T !== null && ((v = T.dehydrated), v !== null))
    ) {
      if (u)
        e.flags & 256
          ? (An(e), (e.flags &= -257), (e = Bo(t, e, n)))
          : e.memoizedState !== null
            ? (En(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (En(),
              (r = i.fallback),
              (v = e.mode),
              (i = bl({ mode: "visible", children: i.children }, v)),
              (r = Pn(r, v, n, null)),
              (r.flags |= 2),
              (i.return = e),
              (r.return = e),
              (i.sibling = r),
              (e.child = i),
              Ya(e, t.child, null, n),
              (i = e.child),
              (i.memoizedState = zo(n)),
              (i.childLanes = _o(t, h, n)),
              (e.memoizedState = Vo),
              (e = r));
      else if ((An(e), vu(v))) {
        if (((h = v.nextSibling && v.nextSibling.dataset), h)) var R = h.dgst;
        ((h = R),
          (i = Error(o(419))),
          (i.stack = ""),
          (i.digest = h),
          Ri({ value: i, source: null, stack: null }),
          (e = Bo(t, e, n)));
      } else if (
        (Qt || ji(t, e, n, !1), (h = (n & t.childLanes) !== 0), Qt || h)
      ) {
        if (
          ((h = Dt),
          h !== null &&
            ((i = n & -n),
            (i = (i & 42) !== 0 ? 1 : vr(i)),
            (i = (i & (h.suspendedLanes | n)) !== 0 ? 0 : i),
            i !== 0 && i !== T.retryLane))
        )
          throw ((T.retryLane = i), ja(t, i), Ae(h, t, i), hh);
        (v.data === "$?" || eu(), (e = Bo(t, e, n)));
      } else
        v.data === "$?"
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = T.treeContext),
            (zt = He(v.nextSibling)),
            (le = e),
            (xt = !0),
            ($n = null),
            (qe = !1),
            t !== null &&
              ((De[Re++] = Ie),
              (De[Re++] = tn),
              (De[Re++] = Jn),
              (Ie = t.id),
              (tn = t.overflow),
              (Jn = e)),
            (e = Uo(e, i.children)),
            (e.flags |= 4096));
      return e;
    }
    return r
      ? (En(),
        (r = i.fallback),
        (v = e.mode),
        (T = t.child),
        (R = T.sibling),
        (i = We(T, { mode: "hidden", children: i.children })),
        (i.subtreeFlags = T.subtreeFlags & 65011712),
        R !== null ? (r = We(R, r)) : ((r = Pn(r, v, n, null)), (r.flags |= 2)),
        (r.return = e),
        (i.return = e),
        (i.sibling = r),
        (e.child = i),
        (i = r),
        (r = e.child),
        (v = t.child.memoizedState),
        v === null
          ? (v = zo(n))
          : ((T = v.cachePool),
            T !== null
              ? ((R = Xt._currentValue),
                (T = T.parent !== R ? { parent: R, pool: R } : T))
              : (T = od()),
            (v = { baseLanes: v.baseLanes | n, cachePool: T })),
        (r.memoizedState = v),
        (r.childLanes = _o(t, h, n)),
        (e.memoizedState = Vo),
        i)
      : (An(e),
        (n = t.child),
        (t = n.sibling),
        (n = We(n, { mode: "visible", children: i.children })),
        (n.return = e),
        (n.sibling = null),
        t !== null &&
          ((h = e.deletions),
          h === null ? ((e.deletions = [t]), (e.flags |= 16)) : h.push(t)),
        (e.child = n),
        (e.memoizedState = null),
        n);
  }
  function Uo(t, e) {
    return (
      (e = bl({ mode: "visible", children: e }, t.mode)),
      (e.return = t),
      (t.child = e)
    );
  }
  function bl(t, e) {
    return (
      (t = ve(22, t, null, e)),
      (t.lanes = 0),
      (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      t
    );
  }
  function Bo(t, e, n) {
    return (
      Ya(e, t.child, null, n),
      (t = Uo(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function Ah(t, e, n) {
    t.lanes |= e;
    var i = t.alternate;
    (i !== null && (i.lanes |= e), to(t.return, e, n));
  }
  function Lo(t, e, n, i, r) {
    var u = t.memoizedState;
    u === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: i,
          tail: n,
          tailMode: r,
        })
      : ((u.isBackwards = e),
        (u.rendering = null),
        (u.renderingStartTime = 0),
        (u.last = i),
        (u.tail = n),
        (u.tailMode = r));
  }
  function Eh(t, e, n) {
    var i = e.pendingProps,
      r = i.revealOrder,
      u = i.tail;
    if (($t(t, e, i.children, n), (i = kt.current), (i & 2) !== 0))
      ((i = (i & 1) | 2), (e.flags |= 128));
    else {
      if (t !== null && (t.flags & 128) !== 0)
        t: for (t = e.child; t !== null; ) {
          if (t.tag === 13) t.memoizedState !== null && Ah(t, n, e);
          else if (t.tag === 19) Ah(t, n, e);
          else if (t.child !== null) {
            ((t.child.return = t), (t = t.child));
            continue;
          }
          if (t === e) break t;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) break t;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
      i &= 1;
    }
    switch ((P(kt, i), r)) {
      case "forwards":
        for (n = e.child, r = null; n !== null; )
          ((t = n.alternate),
            t !== null && pl(t) === null && (r = n),
            (n = n.sibling));
        ((n = r),
          n === null
            ? ((r = e.child), (e.child = null))
            : ((r = n.sibling), (n.sibling = null)),
          Lo(e, !1, r, n, u));
        break;
      case "backwards":
        for (n = null, r = e.child, e.child = null; r !== null; ) {
          if (((t = r.alternate), t !== null && pl(t) === null)) {
            e.child = r;
            break;
          }
          ((t = r.sibling), (r.sibling = n), (n = r), (r = t));
        }
        Lo(e, !0, n, null, u);
        break;
      case "together":
        Lo(e, !1, null, null, void 0);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function ln(t, e, n) {
    if (
      (t !== null && (e.dependencies = t.dependencies),
      (Rn |= e.lanes),
      (n & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((ji(t, e, n, !1), (n & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(o(153));
    if (e.child !== null) {
      for (
        t = e.child, n = We(t, t.pendingProps), e.child = n, n.return = e;
        t.sibling !== null;
      )
        ((t = t.sibling),
          (n = n.sibling = We(t, t.pendingProps)),
          (n.return = e));
      n.sibling = null;
    }
    return e.child;
  }
  function Ho(t, e) {
    return (t.lanes & e) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && tl(t)));
  }
  function Nv(t, e, n) {
    switch (e.tag) {
      case 3:
        (Rt(e, e.stateNode.containerInfo),
          vn(e, Xt, t.memoizedState.cache),
          Di());
        break;
      case 27:
      case 5:
        hr(e);
        break;
      case 4:
        Rt(e, e.stateNode.containerInfo);
        break;
      case 10:
        vn(e, e.type, e.memoizedProps.value);
        break;
      case 13:
        var i = e.memoizedState;
        if (i !== null)
          return i.dehydrated !== null
            ? (An(e), (e.flags |= 128), null)
            : (n & e.child.childLanes) !== 0
              ? Th(t, e, n)
              : (An(e), (t = ln(t, e, n)), t !== null ? t.sibling : null);
        An(e);
        break;
      case 19:
        var r = (t.flags & 128) !== 0;
        if (
          ((i = (n & e.childLanes) !== 0),
          i || (ji(t, e, n, !1), (i = (n & e.childLanes) !== 0)),
          r)
        ) {
          if (i) return Eh(t, e, n);
          e.flags |= 128;
        }
        if (
          ((r = e.memoizedState),
          r !== null &&
            ((r.rendering = null), (r.tail = null), (r.lastEffect = null)),
          P(kt, kt.current),
          i)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((e.lanes = 0), yh(t, e, n));
      case 24:
        vn(e, Xt, t.memoizedState.cache);
    }
    return ln(t, e, n);
  }
  function Mh(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) Qt = !0;
      else {
        if (!Ho(t, n) && (e.flags & 128) === 0) return ((Qt = !1), Nv(t, e, n));
        Qt = (t.flags & 131072) !== 0;
      }
    else ((Qt = !1), xt && (e.flags & 1048576) !== 0 && ed(e, Is, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          t = e.pendingProps;
          var i = e.elementType,
            r = i._init;
          if (((i = r(i._payload)), (e.type = i), typeof i == "function"))
            Qr(i)
              ? ((t = aa(i, t)), (e.tag = 1), (e = bh(null, e, i, t, n)))
              : ((e.tag = 0), (e = wo(null, e, i, t, n)));
          else {
            if (i != null) {
              if (((r = i.$$typeof), r === q)) {
                ((e.tag = 11), (e = mh(null, e, i, t, n)));
                break t;
              } else if (r === W) {
                ((e.tag = 14), (e = gh(null, e, i, t, n)));
                break t;
              }
            }
            throw ((e = Zt(i) || i), Error(o(306, e, "")));
          }
        }
        return e;
      case 0:
        return wo(t, e, e.type, e.pendingProps, n);
      case 1:
        return ((i = e.type), (r = aa(i, e.pendingProps)), bh(t, e, i, r, n));
      case 3:
        t: {
          if ((Rt(e, e.stateNode.containerInfo), t === null))
            throw Error(o(387));
          i = e.pendingProps;
          var u = e.memoizedState;
          ((r = u.element), ro(t, e), Bi(e, i, null, n));
          var h = e.memoizedState;
          if (
            ((i = h.cache),
            vn(e, Xt, i),
            i !== u.cache && eo(e, [Xt], n, !0),
            Ui(),
            (i = h.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: i, isDehydrated: !1, cache: h.cache }),
              (e.updateQueue.baseState = u),
              (e.memoizedState = u),
              e.flags & 256)
            ) {
              e = Sh(t, e, i, n);
              break t;
            } else if (i !== r) {
              ((r = Ce(Error(o(424)), e)), Ri(r), (e = Sh(t, e, i, n)));
              break t;
            } else {
              switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (
                zt = He(t.firstChild),
                  le = e,
                  xt = !0,
                  $n = null,
                  qe = !0,
                  n = ah(e, null, i, n),
                  e.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
            }
          else {
            if ((Di(), i === r)) {
              e = ln(t, e, n);
              break t;
            }
            $t(t, e, i, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          xl(t, e),
          t === null
            ? (n = Rm(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = n)
              : xt ||
                ((n = e.type),
                (t = e.pendingProps),
                (i = zl(lt.current).createElement(n)),
                (i[ne] = e),
                (i[oe] = t),
                It(i, n, t),
                Kt(i),
                (e.stateNode = i))
            : (e.memoizedState = Rm(
                e.type,
                t.memoizedProps,
                e.pendingProps,
                t.memoizedState,
              )),
          null
        );
      case 27:
        return (
          hr(e),
          t === null &&
            xt &&
            ((i = e.stateNode = Cm(e.type, e.pendingProps, lt.current)),
            (le = e),
            (qe = !0),
            (r = zt),
            Vn(e.type) ? ((xu = r), (zt = He(i.firstChild))) : (zt = r)),
          $t(t, e, e.pendingProps.children, n),
          xl(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            xt &&
            ((r = i = zt) &&
              ((i = ex(i, e.type, e.pendingProps, qe)),
              i !== null
                ? ((e.stateNode = i),
                  (le = e),
                  (zt = He(i.firstChild)),
                  (qe = !1),
                  (r = !0))
                : (r = !1)),
            r || Wn(e)),
          hr(e),
          (r = e.type),
          (u = e.pendingProps),
          (h = t !== null ? t.memoizedProps : null),
          (i = u.children),
          gu(r, u) ? (i = null) : h !== null && gu(r, h) && (e.flags |= 32),
          e.memoizedState !== null &&
            ((r = mo(t, e, xv, null, null, n)), (ss._currentValue = r)),
          xl(t, e),
          $t(t, e, i, n),
          e.child
        );
      case 6:
        return (
          t === null &&
            xt &&
            ((t = n = zt) &&
              ((n = nx(n, e.pendingProps, qe)),
              n !== null
                ? ((e.stateNode = n), (le = e), (zt = null), (t = !0))
                : (t = !1)),
            t || Wn(e)),
          null
        );
      case 13:
        return Th(t, e, n);
      case 4:
        return (
          Rt(e, e.stateNode.containerInfo),
          (i = e.pendingProps),
          t === null ? (e.child = Ya(e, null, i, n)) : $t(t, e, i, n),
          e.child
        );
      case 11:
        return mh(t, e, e.type, e.pendingProps, n);
      case 7:
        return ($t(t, e, e.pendingProps, n), e.child);
      case 8:
        return ($t(t, e, e.pendingProps.children, n), e.child);
      case 12:
        return ($t(t, e, e.pendingProps.children, n), e.child);
      case 10:
        return (
          (i = e.pendingProps),
          vn(e, e.type, i.value),
          $t(t, e, i.children, n),
          e.child
        );
      case 9:
        return (
          (r = e.type._context),
          (i = e.pendingProps.children),
          ta(e),
          (r = ae(r)),
          (i = i(r)),
          (e.flags |= 1),
          $t(t, e, i, n),
          e.child
        );
      case 14:
        return gh(t, e, e.type, e.pendingProps, n);
      case 15:
        return ph(t, e, e.type, e.pendingProps, n);
      case 19:
        return Eh(t, e, n);
      case 31:
        return (
          (i = e.pendingProps),
          (n = e.mode),
          (i = { mode: i.mode, children: i.children }),
          t === null
            ? ((n = bl(i, n)),
              (n.ref = e.ref),
              (e.child = n),
              (n.return = e),
              (e = n))
            : ((n = We(t.child, i)),
              (n.ref = e.ref),
              (e.child = n),
              (n.return = e),
              (e = n)),
          e
        );
      case 22:
        return yh(t, e, n);
      case 24:
        return (
          ta(e),
          (i = ae(Xt)),
          t === null
            ? ((r = io()),
              r === null &&
                ((r = Dt),
                (u = no()),
                (r.pooledCache = u),
                u.refCount++,
                u !== null && (r.pooledCacheLanes |= n),
                (r = u)),
              (e.memoizedState = { parent: i, cache: r }),
              lo(e),
              vn(e, Xt, r))
            : ((t.lanes & n) !== 0 && (ro(t, e), Bi(e, null, null, n), Ui()),
              (r = t.memoizedState),
              (u = e.memoizedState),
              r.parent !== i
                ? ((r = { parent: i, cache: i }),
                  (e.memoizedState = r),
                  e.lanes === 0 &&
                    (e.memoizedState = e.updateQueue.baseState = r),
                  vn(e, Xt, i))
                : ((i = u.cache),
                  vn(e, Xt, i),
                  i !== r.cache && eo(e, [Xt], n, !0))),
          $t(t, e, e.pendingProps.children, n),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function rn(t) {
    t.flags |= 4;
  }
  function Ch(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (((t.flags |= 16777216), !zm(e))) {
      if (
        ((e = je.current),
        e !== null &&
          ((gt & 4194048) === gt
            ? Xe !== null
            : ((gt & 62914560) !== gt && (gt & 536870912) === 0) || e !== Xe))
      )
        throw ((zi = so), ud);
      t.flags |= 8192;
    }
  }
  function Sl(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((e = t.tag !== 22 ? af() : 536870912), (t.lanes |= e), (Za |= e)));
  }
  function ki(t, e) {
    if (!xt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var n = null; e !== null; )
            (e.alternate !== null && (n = e), (e = e.sibling));
          n === null ? (t.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = t.tail;
          for (var i = null; n !== null; )
            (n.alternate !== null && (i = n), (n = n.sibling));
          i === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (i.sibling = null);
      }
  }
  function Ot(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      n = 0,
      i = 0;
    if (e)
      for (var r = t.child; r !== null; )
        ((n |= r.lanes | r.childLanes),
          (i |= r.subtreeFlags & 65011712),
          (i |= r.flags & 65011712),
          (r.return = t),
          (r = r.sibling));
    else
      for (r = t.child; r !== null; )
        ((n |= r.lanes | r.childLanes),
          (i |= r.subtreeFlags),
          (i |= r.flags),
          (r.return = t),
          (r = r.sibling));
    return ((t.subtreeFlags |= i), (t.childLanes = n), e);
  }
  function Dv(t, e, n) {
    var i = e.pendingProps;
    switch (($r(e), e.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Ot(e), null);
      case 1:
        return (Ot(e), null);
      case 3:
        return (
          (n = e.stateNode),
          (i = null),
          t !== null && (i = t.memoizedState.cache),
          e.memoizedState.cache !== i && (e.flags |= 2048),
          nn(Xt),
          mn(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (t === null || t.child === null) &&
            (Ni(e)
              ? rn(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), id())),
          Ot(e),
          null
        );
      case 26:
        return (
          (n = e.memoizedState),
          t === null
            ? (rn(e),
              n !== null ? (Ot(e), Ch(e, n)) : (Ot(e), (e.flags &= -16777217)))
            : n
              ? n !== t.memoizedState
                ? (rn(e), Ot(e), Ch(e, n))
                : (Ot(e), (e.flags &= -16777217))
              : (t.memoizedProps !== i && rn(e), Ot(e), (e.flags &= -16777217)),
          null
        );
      case 27:
        (ws(e), (n = lt.current));
        var r = e.type;
        if (t !== null && e.stateNode != null) t.memoizedProps !== i && rn(e);
        else {
          if (!i) {
            if (e.stateNode === null) throw Error(o(166));
            return (Ot(e), null);
          }
          ((t = tt.current),
            Ni(e) ? nd(e) : ((t = Cm(r, i, n)), (e.stateNode = t), rn(e)));
        }
        return (Ot(e), null);
      case 5:
        if ((ws(e), (n = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== i && rn(e);
        else {
          if (!i) {
            if (e.stateNode === null) throw Error(o(166));
            return (Ot(e), null);
          }
          if (((t = tt.current), Ni(e))) nd(e);
          else {
            switch (((r = zl(lt.current)), t)) {
              case 1:
                t = r.createElementNS("http://www.w3.org/2000/svg", n);
                break;
              case 2:
                t = r.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                break;
              default:
                switch (n) {
                  case "svg":
                    t = r.createElementNS("http://www.w3.org/2000/svg", n);
                    break;
                  case "math":
                    t = r.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n,
                    );
                    break;
                  case "script":
                    ((t = r.createElement("div")),
                      (t.innerHTML = "<script><\/script>"),
                      (t = t.removeChild(t.firstChild)));
                    break;
                  case "select":
                    ((t =
                      typeof i.is == "string"
                        ? r.createElement("select", { is: i.is })
                        : r.createElement("select")),
                      i.multiple
                        ? (t.multiple = !0)
                        : i.size && (t.size = i.size));
                    break;
                  default:
                    t =
                      typeof i.is == "string"
                        ? r.createElement(n, { is: i.is })
                        : r.createElement(n);
                }
            }
            ((t[ne] = e), (t[oe] = i));
            t: for (r = e.child; r !== null; ) {
              if (r.tag === 5 || r.tag === 6) t.appendChild(r.stateNode);
              else if (r.tag !== 4 && r.tag !== 27 && r.child !== null) {
                ((r.child.return = r), (r = r.child));
                continue;
              }
              if (r === e) break t;
              for (; r.sibling === null; ) {
                if (r.return === null || r.return === e) break t;
                r = r.return;
              }
              ((r.sibling.return = r.return), (r = r.sibling));
            }
            e.stateNode = t;
            t: switch ((It(t, n, i), n)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                t = !!i.autoFocus;
                break t;
              case "img":
                t = !0;
                break t;
              default:
                t = !1;
            }
            t && rn(e);
          }
        }
        return (Ot(e), (e.flags &= -16777217), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== i && rn(e);
        else {
          if (typeof i != "string" && e.stateNode === null) throw Error(o(166));
          if (((t = lt.current), Ni(e))) {
            if (
              ((t = e.stateNode),
              (n = e.memoizedProps),
              (i = null),
              (r = le),
              r !== null)
            )
              switch (r.tag) {
                case 27:
                case 5:
                  i = r.memoizedProps;
              }
            ((t[ne] = e),
              (t = !!(
                t.nodeValue === n ||
                (i !== null && i.suppressHydrationWarning === !0) ||
                xm(t.nodeValue, n)
              )),
              t || Wn(e));
          } else
            ((t = zl(t).createTextNode(i)), (t[ne] = e), (e.stateNode = t));
        }
        return (Ot(e), null);
      case 13:
        if (
          ((i = e.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((r = Ni(e)), i !== null && i.dehydrated !== null)) {
            if (t === null) {
              if (!r) throw Error(o(318));
              if (
                ((r = e.memoizedState),
                (r = r !== null ? r.dehydrated : null),
                !r)
              )
                throw Error(o(317));
              r[ne] = e;
            } else
              (Di(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4));
            (Ot(e), (r = !1));
          } else
            ((r = id()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = r),
              (r = !0));
          if (!r) return e.flags & 256 ? (sn(e), e) : (sn(e), null);
        }
        if ((sn(e), (e.flags & 128) !== 0)) return ((e.lanes = n), e);
        if (
          ((n = i !== null), (t = t !== null && t.memoizedState !== null), n)
        ) {
          ((i = e.child),
            (r = null),
            i.alternate !== null &&
              i.alternate.memoizedState !== null &&
              i.alternate.memoizedState.cachePool !== null &&
              (r = i.alternate.memoizedState.cachePool.pool));
          var u = null;
          (i.memoizedState !== null &&
            i.memoizedState.cachePool !== null &&
            (u = i.memoizedState.cachePool.pool),
            u !== r && (i.flags |= 2048));
        }
        return (
          n !== t && n && (e.child.flags |= 8192),
          Sl(e, e.updateQueue),
          Ot(e),
          null
        );
      case 4:
        return (mn(), t === null && cu(e.stateNode.containerInfo), Ot(e), null);
      case 10:
        return (nn(e.type), Ot(e), null);
      case 19:
        if ((J(kt), (r = e.memoizedState), r === null)) return (Ot(e), null);
        if (((i = (e.flags & 128) !== 0), (u = r.rendering), u === null))
          if (i) ki(r, !1);
          else {
            if (_t !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((u = pl(t)), u !== null)) {
                  for (
                    e.flags |= 128,
                      ki(r, !1),
                      t = u.updateQueue,
                      e.updateQueue = t,
                      Sl(e, t),
                      e.subtreeFlags = 0,
                      t = n,
                      n = e.child;
                    n !== null;
                  )
                    (td(n, t), (n = n.sibling));
                  return (P(kt, (kt.current & 1) | 2), e.child);
                }
                t = t.sibling;
              }
            r.tail !== null &&
              Ye() > El &&
              ((e.flags |= 128), (i = !0), ki(r, !1), (e.lanes = 4194304));
          }
        else {
          if (!i)
            if (((t = pl(u)), t !== null)) {
              if (
                ((e.flags |= 128),
                (i = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                Sl(e, t),
                ki(r, !0),
                r.tail === null &&
                  r.tailMode === "hidden" &&
                  !u.alternate &&
                  !xt)
              )
                return (Ot(e), null);
            } else
              2 * Ye() - r.renderingStartTime > El &&
                n !== 536870912 &&
                ((e.flags |= 128), (i = !0), ki(r, !1), (e.lanes = 4194304));
          r.isBackwards
            ? ((u.sibling = e.child), (e.child = u))
            : ((t = r.last),
              t !== null ? (t.sibling = u) : (e.child = u),
              (r.last = u));
        }
        return r.tail !== null
          ? ((e = r.tail),
            (r.rendering = e),
            (r.tail = e.sibling),
            (r.renderingStartTime = Ye()),
            (e.sibling = null),
            (t = kt.current),
            P(kt, i ? (t & 1) | 2 : t & 1),
            e)
          : (Ot(e), null);
      case 22:
      case 23:
        return (
          sn(e),
          fo(),
          (i = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== i && (e.flags |= 8192)
            : i && (e.flags |= 8192),
          i
            ? (n & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Ot(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Ot(e),
          (n = e.updateQueue),
          n !== null && Sl(e, n.retryQueue),
          (n = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (n = t.memoizedState.cachePool.pool),
          (i = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (i = e.memoizedState.cachePool.pool),
          i !== n && (e.flags |= 2048),
          t !== null && J(ea),
          null
        );
      case 24:
        return (
          (n = null),
          t !== null && (n = t.memoizedState.cache),
          e.memoizedState.cache !== n && (e.flags |= 2048),
          nn(Xt),
          Ot(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, e.tag));
  }
  function Rv(t, e) {
    switch (($r(e), e.tag)) {
      case 1:
        return (
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 3:
        return (
          nn(Xt),
          mn(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((e.flags = (t & -65537) | 128), e)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (ws(e), null);
      case 13:
        if (
          (sn(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (e.alternate === null) throw Error(o(340));
          Di();
        }
        return (
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 19:
        return (J(kt), null);
      case 4:
        return (mn(), null);
      case 10:
        return (nn(e.type), null);
      case 22:
      case 23:
        return (
          sn(e),
          fo(),
          t !== null && J(ea),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (nn(Xt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Nh(t, e) {
    switch (($r(e), e.tag)) {
      case 3:
        (nn(Xt), mn());
        break;
      case 26:
      case 27:
      case 5:
        ws(e);
        break;
      case 4:
        mn();
        break;
      case 13:
        sn(e);
        break;
      case 19:
        J(kt);
        break;
      case 10:
        nn(e.type);
        break;
      case 22:
      case 23:
        (sn(e), fo(), t !== null && J(ea));
        break;
      case 24:
        nn(Xt);
    }
  }
  function Zi(t, e) {
    try {
      var n = e.updateQueue,
        i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var r = i.next;
        n = r;
        do {
          if ((n.tag & t) === t) {
            i = void 0;
            var u = n.create,
              h = n.inst;
            ((i = u()), (h.destroy = i));
          }
          n = n.next;
        } while (n !== r);
      }
    } catch (v) {
      Ct(e, e.return, v);
    }
  }
  function Mn(t, e, n) {
    try {
      var i = e.updateQueue,
        r = i !== null ? i.lastEffect : null;
      if (r !== null) {
        var u = r.next;
        i = u;
        do {
          if ((i.tag & t) === t) {
            var h = i.inst,
              v = h.destroy;
            if (v !== void 0) {
              ((h.destroy = void 0), (r = e));
              var T = n,
                R = v;
              try {
                R();
              } catch (_) {
                Ct(r, T, _);
              }
            }
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (_) {
      Ct(e, e.return, _);
    }
  }
  function Dh(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        gd(e, n);
      } catch (i) {
        Ct(t, t.return, i);
      }
    }
  }
  function Rh(t, e, n) {
    ((n.props = aa(t.type, t.memoizedProps)), (n.state = t.memoizedState));
    try {
      n.componentWillUnmount();
    } catch (i) {
      Ct(t, e, i);
    }
  }
  function Ki(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var i = t.stateNode;
            break;
          case 30:
            i = t.stateNode;
            break;
          default:
            i = t.stateNode;
        }
        typeof n == "function" ? (t.refCleanup = n(i)) : (n.current = i);
      }
    } catch (r) {
      Ct(t, e, r);
    }
  }
  function ke(t, e) {
    var n = t.ref,
      i = t.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (r) {
          Ct(t, e, r);
        } finally {
          ((t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null));
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          Ct(t, e, r);
        }
      else n.current = null;
  }
  function jh(t) {
    var e = t.type,
      n = t.memoizedProps,
      i = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && i.focus();
          break t;
        case "img":
          n.src ? (i.src = n.src) : n.srcSet && (i.srcset = n.srcSet);
      }
    } catch (r) {
      Ct(t, t.return, r);
    }
  }
  function Go(t, e, n) {
    try {
      var i = t.stateNode;
      (Fv(i, t.type, n, e), (i[oe] = e));
    } catch (r) {
      Ct(t, t.return, r);
    }
  }
  function Oh(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && Vn(t.type)) ||
      t.tag === 4
    );
  }
  function Yo(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Oh(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if (
          (t.tag === 27 && Vn(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function qo(t, e, n) {
    var i = t.tag;
    if (i === 5 || i === 6)
      ((t = t.stateNode),
        e
          ? (n.nodeType === 9
              ? n.body
              : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n
            ).insertBefore(t, e)
          : ((e =
              n.nodeType === 9
                ? n.body
                : n.nodeName === "HTML"
                  ? n.ownerDocument.body
                  : n),
            e.appendChild(t),
            (n = n._reactRootContainer),
            n != null || e.onclick !== null || (e.onclick = Vl)));
    else if (
      i !== 4 &&
      (i === 27 && Vn(t.type) && ((n = t.stateNode), (e = null)),
      (t = t.child),
      t !== null)
    )
      for (qo(t, e, n), t = t.sibling; t !== null; )
        (qo(t, e, n), (t = t.sibling));
  }
  function Tl(t, e, n) {
    var i = t.tag;
    if (i === 5 || i === 6)
      ((t = t.stateNode), e ? n.insertBefore(t, e) : n.appendChild(t));
    else if (
      i !== 4 &&
      (i === 27 && Vn(t.type) && (n = t.stateNode), (t = t.child), t !== null)
    )
      for (Tl(t, e, n), t = t.sibling; t !== null; )
        (Tl(t, e, n), (t = t.sibling));
  }
  function wh(t) {
    var e = t.stateNode,
      n = t.memoizedProps;
    try {
      for (var i = t.type, r = e.attributes; r.length; )
        e.removeAttributeNode(r[0]);
      (It(e, i, n), (e[ne] = t), (e[oe] = n));
    } catch (u) {
      Ct(t, t.return, u);
    }
  }
  var on = !1,
    Lt = !1,
    Xo = !1,
    Vh = typeof WeakSet == "function" ? WeakSet : Set,
    Pt = null;
  function jv(t, e) {
    if (((t = t.containerInfo), (hu = Gl), (t = kf(t)), Gr(t))) {
      if ("selectionStart" in t)
        var n = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          n = ((n = t.ownerDocument) && n.defaultView) || window;
          var i = n.getSelection && n.getSelection();
          if (i && i.rangeCount !== 0) {
            n = i.anchorNode;
            var r = i.anchorOffset,
              u = i.focusNode;
            i = i.focusOffset;
            try {
              (n.nodeType, u.nodeType);
            } catch {
              n = null;
              break t;
            }
            var h = 0,
              v = -1,
              T = -1,
              R = 0,
              _ = 0,
              Y = t,
              j = null;
            e: for (;;) {
              for (
                var O;
                Y !== n || (r !== 0 && Y.nodeType !== 3) || (v = h + r),
                  Y !== u || (i !== 0 && Y.nodeType !== 3) || (T = h + i),
                  Y.nodeType === 3 && (h += Y.nodeValue.length),
                  (O = Y.firstChild) !== null;
              )
                ((j = Y), (Y = O));
              for (;;) {
                if (Y === t) break e;
                if (
                  (j === n && ++R === r && (v = h),
                  j === u && ++_ === i && (T = h),
                  (O = Y.nextSibling) !== null)
                )
                  break;
                ((Y = j), (j = Y.parentNode));
              }
              Y = O;
            }
            n = v === -1 || T === -1 ? null : { start: v, end: T };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      mu = { focusedElem: t, selectionRange: n }, Gl = !1, Pt = e;
      Pt !== null;
    )
      if (
        ((e = Pt), (t = e.child), (e.subtreeFlags & 1024) !== 0 && t !== null)
      )
        ((t.return = e), (Pt = t));
      else
        for (; Pt !== null; ) {
          switch (((e = Pt), (u = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                ((t = void 0),
                  (n = e),
                  (r = u.memoizedProps),
                  (u = u.memoizedState),
                  (i = n.stateNode));
                try {
                  var at = aa(n.type, r, n.elementType === n.type);
                  ((t = i.getSnapshotBeforeUpdate(at, u)),
                    (i.__reactInternalSnapshotBeforeUpdate = t));
                } catch (et) {
                  Ct(n, n.return, et);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = e.stateNode.containerInfo), (n = t.nodeType), n === 9)
                )
                  yu(t);
                else if (n === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      yu(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (((t = e.sibling), t !== null)) {
            ((t.return = e.return), (Pt = t));
            break;
          }
          Pt = e.return;
        }
  }
  function zh(t, e, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (Cn(t, n), i & 4 && Zi(5, n));
        break;
      case 1:
        if ((Cn(t, n), i & 4))
          if (((t = n.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (h) {
              Ct(n, n.return, h);
            }
          else {
            var r = aa(n.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(r, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (h) {
              Ct(n, n.return, h);
            }
          }
        (i & 64 && Dh(n), i & 512 && Ki(n, n.return));
        break;
      case 3:
        if ((Cn(t, n), i & 64 && ((t = n.updateQueue), t !== null))) {
          if (((e = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            gd(t, e);
          } catch (h) {
            Ct(n, n.return, h);
          }
        }
        break;
      case 27:
        e === null && i & 4 && wh(n);
      case 26:
      case 5:
        (Cn(t, n), e === null && i & 4 && jh(n), i & 512 && Ki(n, n.return));
        break;
      case 12:
        Cn(t, n);
        break;
      case 13:
        (Cn(t, n),
          i & 4 && Bh(t, n),
          i & 64 &&
            ((t = n.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((n = Hv.bind(null, n)), ax(t, n)))));
        break;
      case 22:
        if (((i = n.memoizedState !== null || on), !i)) {
          ((e = (e !== null && e.memoizedState !== null) || Lt), (r = on));
          var u = Lt;
          ((on = i),
            (Lt = e) && !u ? Nn(t, n, (n.subtreeFlags & 8772) !== 0) : Cn(t, n),
            (on = r),
            (Lt = u));
        }
        break;
      case 30:
        break;
      default:
        Cn(t, n);
    }
  }
  function _h(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), _h(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && Sr(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var jt = null,
    fe = !1;
  function un(t, e, n) {
    for (n = n.child; n !== null; ) (Uh(t, e, n), (n = n.sibling));
  }
  function Uh(t, e, n) {
    if (ge && typeof ge.onCommitFiberUnmount == "function")
      try {
        ge.onCommitFiberUnmount(hi, n);
      } catch {}
    switch (n.tag) {
      case 26:
        (Lt || ke(n, e),
          un(t, e, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
        break;
      case 27:
        Lt || ke(n, e);
        var i = jt,
          r = fe;
        (Vn(n.type) && ((jt = n.stateNode), (fe = !1)),
          un(t, e, n),
          es(n.stateNode),
          (jt = i),
          (fe = r));
        break;
      case 5:
        Lt || ke(n, e);
      case 6:
        if (
          ((i = jt),
          (r = fe),
          (jt = null),
          un(t, e, n),
          (jt = i),
          (fe = r),
          jt !== null)
        )
          if (fe)
            try {
              (jt.nodeType === 9
                ? jt.body
                : jt.nodeName === "HTML"
                  ? jt.ownerDocument.body
                  : jt
              ).removeChild(n.stateNode);
            } catch (u) {
              Ct(n, e, u);
            }
          else
            try {
              jt.removeChild(n.stateNode);
            } catch (u) {
              Ct(n, e, u);
            }
        break;
      case 18:
        jt !== null &&
          (fe
            ? ((t = jt),
              Em(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === "HTML"
                    ? t.ownerDocument.body
                    : t,
                n.stateNode,
              ),
              us(t))
            : Em(jt, n.stateNode));
        break;
      case 4:
        ((i = jt),
          (r = fe),
          (jt = n.stateNode.containerInfo),
          (fe = !0),
          un(t, e, n),
          (jt = i),
          (fe = r));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Lt || Mn(2, n, e), Lt || Mn(4, n, e), un(t, e, n));
        break;
      case 1:
        (Lt ||
          (ke(n, e),
          (i = n.stateNode),
          typeof i.componentWillUnmount == "function" && Rh(n, e, i)),
          un(t, e, n));
        break;
      case 21:
        un(t, e, n);
        break;
      case 22:
        ((Lt = (i = Lt) || n.memoizedState !== null), un(t, e, n), (Lt = i));
        break;
      default:
        un(t, e, n);
    }
  }
  function Bh(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        us(t);
      } catch (n) {
        Ct(e, e.return, n);
      }
  }
  function Ov(t) {
    switch (t.tag) {
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new Vh()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new Vh()),
          e
        );
      default:
        throw Error(o(435, t.tag));
    }
  }
  function ko(t, e) {
    var n = Ov(t);
    e.forEach(function (i) {
      var r = Gv.bind(null, t, i);
      n.has(i) || (n.add(i), i.then(r, r));
    });
  }
  function xe(t, e) {
    var n = e.deletions;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var r = n[i],
          u = t,
          h = e,
          v = h;
        t: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (Vn(v.type)) {
                ((jt = v.stateNode), (fe = !1));
                break t;
              }
              break;
            case 5:
              ((jt = v.stateNode), (fe = !1));
              break t;
            case 3:
            case 4:
              ((jt = v.stateNode.containerInfo), (fe = !0));
              break t;
          }
          v = v.return;
        }
        if (jt === null) throw Error(o(160));
        (Uh(u, h, r),
          (jt = null),
          (fe = !1),
          (u = r.alternate),
          u !== null && (u.return = null),
          (r.return = null));
      }
    if (e.subtreeFlags & 13878)
      for (e = e.child; e !== null; ) (Lh(e, t), (e = e.sibling));
  }
  var Le = null;
  function Lh(t, e) {
    var n = t.alternate,
      i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (xe(e, t),
          be(t),
          i & 4 && (Mn(3, t, t.return), Zi(3, t), Mn(5, t, t.return)));
        break;
      case 1:
        (xe(e, t),
          be(t),
          i & 512 && (Lt || n === null || ke(n, n.return)),
          i & 64 &&
            on &&
            ((t = t.updateQueue),
            t !== null &&
              ((i = t.callbacks),
              i !== null &&
                ((n = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = n === null ? i : n.concat(i))))));
        break;
      case 26:
        var r = Le;
        if (
          (xe(e, t),
          be(t),
          i & 512 && (Lt || n === null || ke(n, n.return)),
          i & 4)
        ) {
          var u = n !== null ? n.memoizedState : null;
          if (((i = t.memoizedState), n === null))
            if (i === null)
              if (t.stateNode === null) {
                t: {
                  ((i = t.type),
                    (n = t.memoizedProps),
                    (r = r.ownerDocument || r));
                  e: switch (i) {
                    case "title":
                      ((u = r.getElementsByTagName("title")[0]),
                        (!u ||
                          u[pi] ||
                          u[ne] ||
                          u.namespaceURI === "http://www.w3.org/2000/svg" ||
                          u.hasAttribute("itemprop")) &&
                          ((u = r.createElement(i)),
                          r.head.insertBefore(
                            u,
                            r.querySelector("head > title"),
                          )),
                        It(u, i, n),
                        (u[ne] = t),
                        Kt(u),
                        (i = u));
                      break t;
                    case "link":
                      var h = wm("link", "href", r).get(i + (n.href || ""));
                      if (h) {
                        for (var v = 0; v < h.length; v++)
                          if (
                            ((u = h[v]),
                            u.getAttribute("href") ===
                              (n.href == null || n.href === ""
                                ? null
                                : n.href) &&
                              u.getAttribute("rel") ===
                                (n.rel == null ? null : n.rel) &&
                              u.getAttribute("title") ===
                                (n.title == null ? null : n.title) &&
                              u.getAttribute("crossorigin") ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            h.splice(v, 1);
                            break e;
                          }
                      }
                      ((u = r.createElement(i)),
                        It(u, i, n),
                        r.head.appendChild(u));
                      break;
                    case "meta":
                      if (
                        (h = wm("meta", "content", r).get(
                          i + (n.content || ""),
                        ))
                      ) {
                        for (v = 0; v < h.length; v++)
                          if (
                            ((u = h[v]),
                            u.getAttribute("content") ===
                              (n.content == null ? null : "" + n.content) &&
                              u.getAttribute("name") ===
                                (n.name == null ? null : n.name) &&
                              u.getAttribute("property") ===
                                (n.property == null ? null : n.property) &&
                              u.getAttribute("http-equiv") ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              u.getAttribute("charset") ===
                                (n.charSet == null ? null : n.charSet))
                          ) {
                            h.splice(v, 1);
                            break e;
                          }
                      }
                      ((u = r.createElement(i)),
                        It(u, i, n),
                        r.head.appendChild(u));
                      break;
                    default:
                      throw Error(o(468, i));
                  }
                  ((u[ne] = t), Kt(u), (i = u));
                }
                t.stateNode = i;
              } else Vm(r, t.type, t.stateNode);
            else t.stateNode = Om(r, i, t.memoizedProps);
          else
            u !== i
              ? (u === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : u.count--,
                i === null
                  ? Vm(r, t.type, t.stateNode)
                  : Om(r, i, t.memoizedProps))
              : i === null &&
                t.stateNode !== null &&
                Go(t, t.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        (xe(e, t),
          be(t),
          i & 512 && (Lt || n === null || ke(n, n.return)),
          n !== null && i & 4 && Go(t, t.memoizedProps, n.memoizedProps));
        break;
      case 5:
        if (
          (xe(e, t),
          be(t),
          i & 512 && (Lt || n === null || ke(n, n.return)),
          t.flags & 32)
        ) {
          r = t.stateNode;
          try {
            Aa(r, "");
          } catch (O) {
            Ct(t, t.return, O);
          }
        }
        (i & 4 &&
          t.stateNode != null &&
          ((r = t.memoizedProps), Go(t, r, n !== null ? n.memoizedProps : r)),
          i & 1024 && (Xo = !0));
        break;
      case 6:
        if ((xe(e, t), be(t), i & 4)) {
          if (t.stateNode === null) throw Error(o(162));
          ((i = t.memoizedProps), (n = t.stateNode));
          try {
            n.nodeValue = i;
          } catch (O) {
            Ct(t, t.return, O);
          }
        }
        break;
      case 3:
        if (
          ((Bl = null),
          (r = Le),
          (Le = _l(e.containerInfo)),
          xe(e, t),
          (Le = r),
          be(t),
          i & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            us(e.containerInfo);
          } catch (O) {
            Ct(t, t.return, O);
          }
        Xo && ((Xo = !1), Hh(t));
        break;
      case 4:
        ((i = Le),
          (Le = _l(t.stateNode.containerInfo)),
          xe(e, t),
          be(t),
          (Le = i));
        break;
      case 12:
        (xe(e, t), be(t));
        break;
      case 13:
        (xe(e, t),
          be(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (Fo = Ye()),
          i & 4 &&
            ((i = t.updateQueue),
            i !== null && ((t.updateQueue = null), ko(t, i))));
        break;
      case 22:
        r = t.memoizedState !== null;
        var T = n !== null && n.memoizedState !== null,
          R = on,
          _ = Lt;
        if (
          ((on = R || r),
          (Lt = _ || T),
          xe(e, t),
          (Lt = _),
          (on = R),
          be(t),
          i & 8192)
        )
          t: for (
            e = t.stateNode,
              e._visibility = r ? e._visibility & -2 : e._visibility | 1,
              r && (n === null || T || on || Lt || ia(t)),
              n = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (n === null) {
                T = n = e;
                try {
                  if (((u = T.stateNode), r))
                    ((h = u.style),
                      typeof h.setProperty == "function"
                        ? h.setProperty("display", "none", "important")
                        : (h.display = "none"));
                  else {
                    v = T.stateNode;
                    var Y = T.memoizedProps.style,
                      j =
                        Y != null && Y.hasOwnProperty("display")
                          ? Y.display
                          : null;
                    v.style.display =
                      j == null || typeof j == "boolean" ? "" : ("" + j).trim();
                  }
                } catch (O) {
                  Ct(T, T.return, O);
                }
              }
            } else if (e.tag === 6) {
              if (n === null) {
                T = e;
                try {
                  T.stateNode.nodeValue = r ? "" : T.memoizedProps;
                } catch (O) {
                  Ct(T, T.return, O);
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) ||
                e.memoizedState === null ||
                e === t) &&
              e.child !== null
            ) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              (n === e && (n = null), (e = e.return));
            }
            (n === e && (n = null),
              (e.sibling.return = e.return),
              (e = e.sibling));
          }
        i & 4 &&
          ((i = t.updateQueue),
          i !== null &&
            ((n = i.retryQueue),
            n !== null && ((i.retryQueue = null), ko(t, n))));
        break;
      case 19:
        (xe(e, t),
          be(t),
          i & 4 &&
            ((i = t.updateQueue),
            i !== null && ((t.updateQueue = null), ko(t, i))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (xe(e, t), be(t));
    }
  }
  function be(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, i = t.return; i !== null; ) {
          if (Oh(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var r = n.stateNode,
              u = Yo(t);
            Tl(t, u, r);
            break;
          case 5:
            var h = n.stateNode;
            n.flags & 32 && (Aa(h, ""), (n.flags &= -33));
            var v = Yo(t);
            Tl(t, v, h);
            break;
          case 3:
          case 4:
            var T = n.stateNode.containerInfo,
              R = Yo(t);
            qo(t, R, T);
            break;
          default:
            throw Error(o(161));
        }
      } catch (_) {
        Ct(t, t.return, _);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Hh(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (Hh(e),
          e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
          (t = t.sibling));
      }
  }
  function Cn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (zh(t, e.alternate, e), (e = e.sibling));
  }
  function ia(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Mn(4, e, e.return), ia(e));
          break;
        case 1:
          ke(e, e.return);
          var n = e.stateNode;
          (typeof n.componentWillUnmount == "function" && Rh(e, e.return, n),
            ia(e));
          break;
        case 27:
          es(e.stateNode);
        case 26:
        case 5:
          (ke(e, e.return), ia(e));
          break;
        case 22:
          e.memoizedState === null && ia(e);
          break;
        case 30:
          ia(e);
          break;
        default:
          ia(e);
      }
      t = t.sibling;
    }
  }
  function Nn(t, e, n) {
    for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var i = e.alternate,
        r = t,
        u = e,
        h = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (Nn(r, u, n), Zi(4, u));
          break;
        case 1:
          if (
            (Nn(r, u, n),
            (i = u),
            (r = i.stateNode),
            typeof r.componentDidMount == "function")
          )
            try {
              r.componentDidMount();
            } catch (R) {
              Ct(i, i.return, R);
            }
          if (((i = u), (r = i.updateQueue), r !== null)) {
            var v = i.stateNode;
            try {
              var T = r.shared.hiddenCallbacks;
              if (T !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < T.length; r++)
                  md(T[r], v);
            } catch (R) {
              Ct(i, i.return, R);
            }
          }
          (n && h & 64 && Dh(u), Ki(u, u.return));
          break;
        case 27:
          wh(u);
        case 26:
        case 5:
          (Nn(r, u, n), n && i === null && h & 4 && jh(u), Ki(u, u.return));
          break;
        case 12:
          Nn(r, u, n);
          break;
        case 13:
          (Nn(r, u, n), n && h & 4 && Bh(r, u));
          break;
        case 22:
          (u.memoizedState === null && Nn(r, u, n), Ki(u, u.return));
          break;
        case 30:
          break;
        default:
          Nn(r, u, n);
      }
      e = e.sibling;
    }
  }
  function Zo(t, e) {
    var n = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (n = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== n && (t != null && t.refCount++, n != null && Oi(n)));
  }
  function Ko(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && Oi(t)));
  }
  function Ze(t, e, n, i) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (Gh(t, e, n, i), (e = e.sibling));
  }
  function Gh(t, e, n, i) {
    var r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Ze(t, e, n, i), r & 2048 && Zi(9, e));
        break;
      case 1:
        Ze(t, e, n, i);
        break;
      case 3:
        (Ze(t, e, n, i),
          r & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && Oi(t))));
        break;
      case 12:
        if (r & 2048) {
          (Ze(t, e, n, i), (t = e.stateNode));
          try {
            var u = e.memoizedProps,
              h = u.id,
              v = u.onPostCommit;
            typeof v == "function" &&
              v(
                h,
                e.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0,
              );
          } catch (T) {
            Ct(e, e.return, T);
          }
        } else Ze(t, e, n, i);
        break;
      case 13:
        Ze(t, e, n, i);
        break;
      case 23:
        break;
      case 22:
        ((u = e.stateNode),
          (h = e.alternate),
          e.memoizedState !== null
            ? u._visibility & 2
              ? Ze(t, e, n, i)
              : Qi(t, e)
            : u._visibility & 2
              ? Ze(t, e, n, i)
              : ((u._visibility |= 2),
                qa(t, e, n, i, (e.subtreeFlags & 10256) !== 0)),
          r & 2048 && Zo(h, e));
        break;
      case 24:
        (Ze(t, e, n, i), r & 2048 && Ko(e.alternate, e));
        break;
      default:
        Ze(t, e, n, i);
    }
  }
  function qa(t, e, n, i, r) {
    for (r = r && (e.subtreeFlags & 10256) !== 0, e = e.child; e !== null; ) {
      var u = t,
        h = e,
        v = n,
        T = i,
        R = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          (qa(u, h, v, T, r), Zi(8, h));
          break;
        case 23:
          break;
        case 22:
          var _ = h.stateNode;
          (h.memoizedState !== null
            ? _._visibility & 2
              ? qa(u, h, v, T, r)
              : Qi(u, h)
            : ((_._visibility |= 2), qa(u, h, v, T, r)),
            r && R & 2048 && Zo(h.alternate, h));
          break;
        case 24:
          (qa(u, h, v, T, r), r && R & 2048 && Ko(h.alternate, h));
          break;
        default:
          qa(u, h, v, T, r);
      }
      e = e.sibling;
    }
  }
  function Qi(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t,
          i = e,
          r = i.flags;
        switch (i.tag) {
          case 22:
            (Qi(n, i), r & 2048 && Zo(i.alternate, i));
            break;
          case 24:
            (Qi(n, i), r & 2048 && Ko(i.alternate, i));
            break;
          default:
            Qi(n, i);
        }
        e = e.sibling;
      }
  }
  var Pi = 8192;
  function Xa(t) {
    if (t.subtreeFlags & Pi)
      for (t = t.child; t !== null; ) (Yh(t), (t = t.sibling));
  }
  function Yh(t) {
    switch (t.tag) {
      case 26:
        (Xa(t),
          t.flags & Pi &&
            t.memoizedState !== null &&
            px(Le, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Xa(t);
        break;
      case 3:
      case 4:
        var e = Le;
        ((Le = _l(t.stateNode.containerInfo)), Xa(t), (Le = e));
        break;
      case 22:
        t.memoizedState === null &&
          ((e = t.alternate),
          e !== null && e.memoizedState !== null
            ? ((e = Pi), (Pi = 16777216), Xa(t), (Pi = e))
            : Xa(t));
        break;
      default:
        Xa(t);
    }
  }
  function qh(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function Ji(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          ((Pt = i), kh(i, t));
        }
      qh(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (Xh(t), (t = t.sibling));
  }
  function Xh(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Ji(t), t.flags & 2048 && Mn(9, t, t.return));
        break;
      case 3:
        Ji(t);
        break;
      case 12:
        Ji(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null &&
        e._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), Al(t))
          : Ji(t);
        break;
      default:
        Ji(t);
    }
  }
  function Al(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          ((Pt = i), kh(i, t));
        }
      qh(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (Mn(8, e, e.return), Al(e));
          break;
        case 22:
          ((n = e.stateNode),
            n._visibility & 2 && ((n._visibility &= -3), Al(e)));
          break;
        default:
          Al(e);
      }
      t = t.sibling;
    }
  }
  function kh(t, e) {
    for (; Pt !== null; ) {
      var n = Pt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Mn(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Oi(n.memoizedState.cache);
      }
      if (((i = n.child), i !== null)) ((i.return = n), (Pt = i));
      else
        t: for (n = t; Pt !== null; ) {
          i = Pt;
          var r = i.sibling,
            u = i.return;
          if ((_h(i), i === n)) {
            Pt = null;
            break t;
          }
          if (r !== null) {
            ((r.return = u), (Pt = r));
            break t;
          }
          Pt = u;
        }
    }
  }
  var wv = {
      getCacheForType: function (t) {
        var e = ae(Xt),
          n = e.data.get(t);
        return (n === void 0 && ((n = t()), e.data.set(t, n)), n);
      },
    },
    Vv = typeof WeakMap == "function" ? WeakMap : Map,
    St = 0,
    Dt = null,
    dt = null,
    gt = 0,
    Tt = 0,
    Se = null,
    Dn = !1,
    ka = !1,
    Qo = !1,
    cn = 0,
    _t = 0,
    Rn = 0,
    sa = 0,
    Po = 0,
    Oe = 0,
    Za = 0,
    Fi = null,
    de = null,
    Jo = !1,
    Fo = 0,
    El = 1 / 0,
    Ml = null,
    jn = null,
    Wt = 0,
    On = null,
    Ka = null,
    Qa = 0,
    $o = 0,
    Wo = null,
    Zh = null,
    $i = 0,
    Io = null;
  function Te() {
    if ((St & 2) !== 0 && gt !== 0) return gt & -gt;
    if (z.T !== null) {
      var t = za;
      return t !== 0 ? t : lu();
    }
    return rf();
  }
  function Kh() {
    Oe === 0 && (Oe = (gt & 536870912) === 0 || xt ? nf() : 536870912);
    var t = je.current;
    return (t !== null && (t.flags |= 32), Oe);
  }
  function Ae(t, e, n) {
    (((t === Dt && (Tt === 2 || Tt === 9)) || t.cancelPendingCommit !== null) &&
      (Pa(t, 0), wn(t, gt, Oe, !1)),
      gi(t, n),
      ((St & 2) === 0 || t !== Dt) &&
        (t === Dt &&
          ((St & 2) === 0 && (sa |= n), _t === 4 && wn(t, gt, Oe, !1)),
        Ke(t)));
  }
  function Qh(t, e, n) {
    if ((St & 6) !== 0) throw Error(o(327));
    var i = (!n && (e & 124) === 0 && (e & t.expiredLanes) === 0) || mi(t, e),
      r = i ? Uv(t, e) : nu(t, e, !0),
      u = i;
    do {
      if (r === 0) {
        ka && !i && wn(t, e, 0, !1);
        break;
      } else {
        if (((n = t.current.alternate), u && !zv(n))) {
          ((r = nu(t, e, !1)), (u = !1));
          continue;
        }
        if (r === 2) {
          if (((u = e), t.errorRecoveryDisabledLanes & u)) var h = 0;
          else
            ((h = t.pendingLanes & -536870913),
              (h = h !== 0 ? h : h & 536870912 ? 536870912 : 0));
          if (h !== 0) {
            e = h;
            t: {
              var v = t;
              r = Fi;
              var T = v.current.memoizedState.isDehydrated;
              if ((T && (Pa(v, h).flags |= 256), (h = nu(v, h, !1)), h !== 2)) {
                if (Qo && !T) {
                  ((v.errorRecoveryDisabledLanes |= u), (sa |= u), (r = 4));
                  break t;
                }
                ((u = de),
                  (de = r),
                  u !== null &&
                    (de === null ? (de = u) : de.push.apply(de, u)));
              }
              r = h;
            }
            if (((u = !1), r !== 2)) continue;
          }
        }
        if (r === 1) {
          (Pa(t, 0), wn(t, e, 0, !0));
          break;
        }
        t: {
          switch (((i = t), (u = r), u)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              wn(i, e, Oe, !Dn);
              break t;
            case 2:
              de = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && ((r = Fo + 300 - Ye()), 10 < r)) {
            if ((wn(i, e, Oe, !Dn), Us(i, 0, !0) !== 0)) break t;
            i.timeoutHandle = Tm(
              Ph.bind(null, i, n, de, Ml, Jo, e, Oe, sa, Za, Dn, u, 2, -0, 0),
              r,
            );
            break t;
          }
          Ph(i, n, de, Ml, Jo, e, Oe, sa, Za, Dn, u, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    Ke(t);
  }
  function Ph(t, e, n, i, r, u, h, v, T, R, _, Y, j, O) {
    if (
      ((t.timeoutHandle = -1),
      (Y = e.subtreeFlags),
      (Y & 8192 || (Y & 16785408) === 16785408) &&
        ((is = { stylesheets: null, count: 0, unsuspend: gx }),
        Yh(e),
        (Y = yx()),
        Y !== null))
    ) {
      ((t.cancelPendingCommit = Y(
        em.bind(null, t, e, u, n, i, r, h, v, T, _, 1, j, O),
      )),
        wn(t, u, h, !R));
      return;
    }
    em(t, e, u, n, i, r, h, v, T);
  }
  function zv(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        e.flags & 16384 &&
        ((n = e.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var i = 0; i < n.length; i++) {
          var r = n[i],
            u = r.getSnapshot;
          r = r.value;
          try {
            if (!ye(u(), r)) return !1;
          } catch {
            return !1;
          }
        }
      if (((n = e.child), e.subtreeFlags & 16384 && n !== null))
        ((n.return = e), (e = n));
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    }
    return !0;
  }
  function wn(t, e, n, i) {
    ((e &= ~Po),
      (e &= ~sa),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      i && (t.warmLanes |= e),
      (i = t.expirationTimes));
    for (var r = e; 0 < r; ) {
      var u = 31 - pe(r),
        h = 1 << u;
      ((i[u] = -1), (r &= ~h));
    }
    n !== 0 && sf(t, n, e);
  }
  function Cl() {
    return (St & 6) === 0 ? (Wi(0), !1) : !0;
  }
  function tu() {
    if (dt !== null) {
      if (Tt === 0) var t = dt.return;
      else ((t = dt), (en = In = null), yo(t), (Ga = null), (qi = 0), (t = dt));
      for (; t !== null; ) (Nh(t.alternate, t), (t = t.return));
      dt = null;
    }
  }
  function Pa(t, e) {
    var n = t.timeoutHandle;
    (n !== -1 && ((t.timeoutHandle = -1), Wv(n)),
      (n = t.cancelPendingCommit),
      n !== null && ((t.cancelPendingCommit = null), n()),
      tu(),
      (Dt = t),
      (dt = n = We(t.current, null)),
      (gt = e),
      (Tt = 0),
      (Se = null),
      (Dn = !1),
      (ka = mi(t, e)),
      (Qo = !1),
      (Za = Oe = Po = sa = Rn = _t = 0),
      (de = Fi = null),
      (Jo = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var i = t.entangledLanes;
    if (i !== 0)
      for (t = t.entanglements, i &= e; 0 < i; ) {
        var r = 31 - pe(i),
          u = 1 << r;
        ((e |= t[r]), (i &= ~u));
      }
    return ((cn = e), Ps(), n);
  }
  function Jh(t, e) {
    ((ut = null),
      (z.H = hl),
      e === Vi || e === al
        ? ((e = dd()), (Tt = 3))
        : e === ud
          ? ((e = dd()), (Tt = 4))
          : (Tt =
              e === hh
                ? 8
                : e !== null &&
                    typeof e == "object" &&
                    typeof e.then == "function"
                  ? 6
                  : 1),
      (Se = e),
      dt === null && ((_t = 1), vl(t, Ce(e, t.current))));
  }
  function Fh() {
    var t = z.H;
    return ((z.H = hl), t === null ? hl : t);
  }
  function $h() {
    var t = z.A;
    return ((z.A = wv), t);
  }
  function eu() {
    ((_t = 4),
      Dn || ((gt & 4194048) !== gt && je.current !== null) || (ka = !0),
      ((Rn & 134217727) === 0 && (sa & 134217727) === 0) ||
        Dt === null ||
        wn(Dt, gt, Oe, !1));
  }
  function nu(t, e, n) {
    var i = St;
    St |= 2;
    var r = Fh(),
      u = $h();
    ((Dt !== t || gt !== e) && ((Ml = null), Pa(t, e)), (e = !1));
    var h = _t;
    t: do
      try {
        if (Tt !== 0 && dt !== null) {
          var v = dt,
            T = Se;
          switch (Tt) {
            case 8:
              (tu(), (h = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              je.current === null && (e = !0);
              var R = Tt;
              if (((Tt = 0), (Se = null), Ja(t, v, T, R), n && ka)) {
                h = 0;
                break t;
              }
              break;
            default:
              ((R = Tt), (Tt = 0), (Se = null), Ja(t, v, T, R));
          }
        }
        (_v(), (h = _t));
        break;
      } catch (_) {
        Jh(t, _);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (en = In = null),
      (St = i),
      (z.H = r),
      (z.A = u),
      dt === null && ((Dt = null), (gt = 0), Ps()),
      h
    );
  }
  function _v() {
    for (; dt !== null; ) Wh(dt);
  }
  function Uv(t, e) {
    var n = St;
    St |= 2;
    var i = Fh(),
      r = $h();
    Dt !== t || gt !== e
      ? ((Ml = null), (El = Ye() + 500), Pa(t, e))
      : (ka = mi(t, e));
    t: do
      try {
        if (Tt !== 0 && dt !== null) {
          e = dt;
          var u = Se;
          e: switch (Tt) {
            case 1:
              ((Tt = 0), (Se = null), Ja(t, e, u, 1));
              break;
            case 2:
            case 9:
              if (cd(u)) {
                ((Tt = 0), (Se = null), Ih(e));
                break;
              }
              ((e = function () {
                ((Tt !== 2 && Tt !== 9) || Dt !== t || (Tt = 7), Ke(t));
              }),
                u.then(e, e));
              break t;
            case 3:
              Tt = 7;
              break t;
            case 4:
              Tt = 5;
              break t;
            case 7:
              cd(u)
                ? ((Tt = 0), (Se = null), Ih(e))
                : ((Tt = 0), (Se = null), Ja(t, e, u, 7));
              break;
            case 5:
              var h = null;
              switch (dt.tag) {
                case 26:
                  h = dt.memoizedState;
                case 5:
                case 27:
                  var v = dt;
                  if (!h || zm(h)) {
                    ((Tt = 0), (Se = null));
                    var T = v.sibling;
                    if (T !== null) dt = T;
                    else {
                      var R = v.return;
                      R !== null ? ((dt = R), Nl(R)) : (dt = null);
                    }
                    break e;
                  }
              }
              ((Tt = 0), (Se = null), Ja(t, e, u, 5));
              break;
            case 6:
              ((Tt = 0), (Se = null), Ja(t, e, u, 6));
              break;
            case 8:
              (tu(), (_t = 6));
              break t;
            default:
              throw Error(o(462));
          }
        }
        Bv();
        break;
      } catch (_) {
        Jh(t, _);
      }
    while (!0);
    return (
      (en = In = null),
      (z.H = i),
      (z.A = r),
      (St = n),
      dt !== null ? 0 : ((Dt = null), (gt = 0), Ps(), _t)
    );
  }
  function Bv() {
    for (; dt !== null && !s0(); ) Wh(dt);
  }
  function Wh(t) {
    var e = Mh(t.alternate, t, cn);
    ((t.memoizedProps = t.pendingProps), e === null ? Nl(t) : (dt = e));
  }
  function Ih(t) {
    var e = t,
      n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = xh(n, e, e.pendingProps, e.type, void 0, gt);
        break;
      case 11:
        e = xh(n, e, e.pendingProps, e.type.render, e.ref, gt);
        break;
      case 5:
        yo(e);
      default:
        (Nh(n, e), (e = dt = td(e, cn)), (e = Mh(n, e, cn)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? Nl(t) : (dt = e));
  }
  function Ja(t, e, n, i) {
    ((en = In = null), yo(e), (Ga = null), (qi = 0));
    var r = e.return;
    try {
      if (Cv(t, r, e, n, gt)) {
        ((_t = 1), vl(t, Ce(n, t.current)), (dt = null));
        return;
      }
    } catch (u) {
      if (r !== null) throw ((dt = r), u);
      ((_t = 1), vl(t, Ce(n, t.current)), (dt = null));
      return;
    }
    e.flags & 32768
      ? (xt || i === 1
          ? (t = !0)
          : ka || (gt & 536870912) !== 0
            ? (t = !1)
            : ((Dn = t = !0),
              (i === 2 || i === 9 || i === 3 || i === 6) &&
                ((i = je.current),
                i !== null && i.tag === 13 && (i.flags |= 16384))),
        tm(e, t))
      : Nl(e);
  }
  function Nl(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        tm(e, Dn);
        return;
      }
      t = e.return;
      var n = Dv(e.alternate, e, cn);
      if (n !== null) {
        dt = n;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        dt = e;
        return;
      }
      dt = e = t;
    } while (e !== null);
    _t === 0 && (_t = 5);
  }
  function tm(t, e) {
    do {
      var n = Rv(t.alternate, t);
      if (n !== null) {
        ((n.flags &= 32767), (dt = n));
        return;
      }
      if (
        ((n = t.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        dt = t;
        return;
      }
      dt = t = n;
    } while (t !== null);
    ((_t = 6), (dt = null));
  }
  function em(t, e, n, i, r, u, h, v, T) {
    t.cancelPendingCommit = null;
    do Dl();
    while (Wt !== 0);
    if ((St & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      if (
        ((u = e.lanes | e.childLanes),
        (u |= Zr),
        g0(t, n, u, h, v, T),
        t === Dt && ((dt = Dt = null), (gt = 0)),
        (Ka = e),
        (On = t),
        (Qa = n),
        ($o = u),
        (Wo = r),
        (Zh = i),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            Yv(Vs, function () {
              return (lm(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (i = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || i)
      ) {
        ((i = z.T), (z.T = null), (r = B.p), (B.p = 2), (h = St), (St |= 4));
        try {
          jv(t, e, n);
        } finally {
          ((St = h), (B.p = r), (z.T = i));
        }
      }
      ((Wt = 1), nm(), am(), im());
    }
  }
  function nm() {
    if (Wt === 1) {
      Wt = 0;
      var t = On,
        e = Ka,
        n = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || n) {
        ((n = z.T), (z.T = null));
        var i = B.p;
        B.p = 2;
        var r = St;
        St |= 4;
        try {
          Lh(e, t);
          var u = mu,
            h = kf(t.containerInfo),
            v = u.focusedElem,
            T = u.selectionRange;
          if (
            h !== v &&
            v &&
            v.ownerDocument &&
            Xf(v.ownerDocument.documentElement, v)
          ) {
            if (T !== null && Gr(v)) {
              var R = T.start,
                _ = T.end;
              if ((_ === void 0 && (_ = R), "selectionStart" in v))
                ((v.selectionStart = R),
                  (v.selectionEnd = Math.min(_, v.value.length)));
              else {
                var Y = v.ownerDocument || document,
                  j = (Y && Y.defaultView) || window;
                if (j.getSelection) {
                  var O = j.getSelection(),
                    at = v.textContent.length,
                    et = Math.min(T.start, at),
                    Mt = T.end === void 0 ? et : Math.min(T.end, at);
                  !O.extend && et > Mt && ((h = Mt), (Mt = et), (et = h));
                  var N = qf(v, et),
                    E = qf(v, Mt);
                  if (
                    N &&
                    E &&
                    (O.rangeCount !== 1 ||
                      O.anchorNode !== N.node ||
                      O.anchorOffset !== N.offset ||
                      O.focusNode !== E.node ||
                      O.focusOffset !== E.offset)
                  ) {
                    var D = Y.createRange();
                    (D.setStart(N.node, N.offset),
                      O.removeAllRanges(),
                      et > Mt
                        ? (O.addRange(D), O.extend(E.node, E.offset))
                        : (D.setEnd(E.node, E.offset), O.addRange(D)));
                  }
                }
              }
            }
            for (Y = [], O = v; (O = O.parentNode); )
              O.nodeType === 1 &&
                Y.push({ element: O, left: O.scrollLeft, top: O.scrollTop });
            for (
              typeof v.focus == "function" && v.focus(), v = 0;
              v < Y.length;
              v++
            ) {
              var L = Y[v];
              ((L.element.scrollLeft = L.left), (L.element.scrollTop = L.top));
            }
          }
          ((Gl = !!hu), (mu = hu = null));
        } finally {
          ((St = r), (B.p = i), (z.T = n));
        }
      }
      ((t.current = e), (Wt = 2));
    }
  }
  function am() {
    if (Wt === 2) {
      Wt = 0;
      var t = On,
        e = Ka,
        n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        ((n = z.T), (z.T = null));
        var i = B.p;
        B.p = 2;
        var r = St;
        St |= 4;
        try {
          zh(t, e.alternate, e);
        } finally {
          ((St = r), (B.p = i), (z.T = n));
        }
      }
      Wt = 3;
    }
  }
  function im() {
    if (Wt === 4 || Wt === 3) {
      ((Wt = 0), l0());
      var t = On,
        e = Ka,
        n = Qa,
        i = Zh;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (Wt = 5)
        : ((Wt = 0), (Ka = On = null), sm(t, t.pendingLanes));
      var r = t.pendingLanes;
      if (
        (r === 0 && (jn = null),
        xr(n),
        (e = e.stateNode),
        ge && typeof ge.onCommitFiberRoot == "function")
      )
        try {
          ge.onCommitFiberRoot(hi, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (i !== null) {
        ((e = z.T), (r = B.p), (B.p = 2), (z.T = null));
        try {
          for (var u = t.onRecoverableError, h = 0; h < i.length; h++) {
            var v = i[h];
            u(v.value, { componentStack: v.stack });
          }
        } finally {
          ((z.T = e), (B.p = r));
        }
      }
      ((Qa & 3) !== 0 && Dl(),
        Ke(t),
        (r = t.pendingLanes),
        (n & 4194090) !== 0 && (r & 42) !== 0
          ? t === Io
            ? $i++
            : (($i = 0), (Io = t))
          : ($i = 0),
        Wi(0));
    }
  }
  function sm(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), Oi(e)));
  }
  function Dl(t) {
    return (nm(), am(), im(), lm());
  }
  function lm() {
    if (Wt !== 5) return !1;
    var t = On,
      e = $o;
    $o = 0;
    var n = xr(Qa),
      i = z.T,
      r = B.p;
    try {
      ((B.p = 32 > n ? 32 : n), (z.T = null), (n = Wo), (Wo = null));
      var u = On,
        h = Qa;
      if (((Wt = 0), (Ka = On = null), (Qa = 0), (St & 6) !== 0))
        throw Error(o(331));
      var v = St;
      if (
        ((St |= 4),
        Xh(u.current),
        Gh(u, u.current, h, n),
        (St = v),
        Wi(0, !1),
        ge && typeof ge.onPostCommitFiberRoot == "function")
      )
        try {
          ge.onPostCommitFiberRoot(hi, u);
        } catch {}
      return !0;
    } finally {
      ((B.p = r), (z.T = i), sm(t, e));
    }
  }
  function rm(t, e, n) {
    ((e = Ce(n, e)),
      (e = Oo(t.stateNode, e, 2)),
      (t = Sn(t, e, 2)),
      t !== null && (gi(t, 2), Ke(t)));
  }
  function Ct(t, e, n) {
    if (t.tag === 3) rm(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          rm(e, t, n);
          break;
        } else if (e.tag === 1) {
          var i = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == "function" ||
            (typeof i.componentDidCatch == "function" &&
              (jn === null || !jn.has(i)))
          ) {
            ((t = Ce(n, t)),
              (n = fh(2)),
              (i = Sn(e, n, 2)),
              i !== null && (dh(n, i, e, t), gi(i, 2), Ke(i)));
            break;
          }
        }
        e = e.return;
      }
  }
  function au(t, e, n) {
    var i = t.pingCache;
    if (i === null) {
      i = t.pingCache = new Vv();
      var r = new Set();
      i.set(e, r);
    } else ((r = i.get(e)), r === void 0 && ((r = new Set()), i.set(e, r)));
    r.has(n) ||
      ((Qo = !0), r.add(n), (t = Lv.bind(null, t, e, n)), e.then(t, t));
  }
  function Lv(t, e, n) {
    var i = t.pingCache;
    (i !== null && i.delete(e),
      (t.pingedLanes |= t.suspendedLanes & n),
      (t.warmLanes &= ~n),
      Dt === t &&
        (gt & n) === n &&
        (_t === 4 || (_t === 3 && (gt & 62914560) === gt && 300 > Ye() - Fo)
          ? (St & 2) === 0 && Pa(t, 0)
          : (Po |= n),
        Za === gt && (Za = 0)),
      Ke(t));
  }
  function om(t, e) {
    (e === 0 && (e = af()), (t = ja(t, e)), t !== null && (gi(t, e), Ke(t)));
  }
  function Hv(t) {
    var e = t.memoizedState,
      n = 0;
    (e !== null && (n = e.retryLane), om(t, n));
  }
  function Gv(t, e) {
    var n = 0;
    switch (t.tag) {
      case 13:
        var i = t.stateNode,
          r = t.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case 19:
        i = t.stateNode;
        break;
      case 22:
        i = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    (i !== null && i.delete(e), om(t, n));
  }
  function Yv(t, e) {
    return gr(t, e);
  }
  var Rl = null,
    Fa = null,
    iu = !1,
    jl = !1,
    su = !1,
    la = 0;
  function Ke(t) {
    (t !== Fa &&
      t.next === null &&
      (Fa === null ? (Rl = Fa = t) : (Fa = Fa.next = t)),
      (jl = !0),
      iu || ((iu = !0), Xv()));
  }
  function Wi(t, e) {
    if (!su && jl) {
      su = !0;
      do
        for (var n = !1, i = Rl; i !== null; ) {
          if (t !== 0) {
            var r = i.pendingLanes;
            if (r === 0) var u = 0;
            else {
              var h = i.suspendedLanes,
                v = i.pingedLanes;
              ((u = (1 << (31 - pe(42 | t) + 1)) - 1),
                (u &= r & ~(h & ~v)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
            }
            u !== 0 && ((n = !0), dm(i, u));
          } else
            ((u = gt),
              (u = Us(
                i,
                i === Dt ? u : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== -1,
              )),
              (u & 3) === 0 || mi(i, u) || ((n = !0), dm(i, u)));
          i = i.next;
        }
      while (n);
      su = !1;
    }
  }
  function qv() {
    um();
  }
  function um() {
    jl = iu = !1;
    var t = 0;
    la !== 0 && ($v() && (t = la), (la = 0));
    for (var e = Ye(), n = null, i = Rl; i !== null; ) {
      var r = i.next,
        u = cm(i, e);
      (u === 0
        ? ((i.next = null),
          n === null ? (Rl = r) : (n.next = r),
          r === null && (Fa = n))
        : ((n = i), (t !== 0 || (u & 3) !== 0) && (jl = !0)),
        (i = r));
    }
    Wi(t);
  }
  function cm(t, e) {
    for (
      var n = t.suspendedLanes,
        i = t.pingedLanes,
        r = t.expirationTimes,
        u = t.pendingLanes & -62914561;
      0 < u;
    ) {
      var h = 31 - pe(u),
        v = 1 << h,
        T = r[h];
      (T === -1
        ? ((v & n) === 0 || (v & i) !== 0) && (r[h] = m0(v, e))
        : T <= e && (t.expiredLanes |= v),
        (u &= ~v));
    }
    if (
      ((e = Dt),
      (n = gt),
      (n = Us(
        t,
        t === e ? n : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      (i = t.callbackNode),
      n === 0 ||
        (t === e && (Tt === 2 || Tt === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        i !== null && i !== null && pr(i),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      );
    if ((n & 3) === 0 || mi(t, n)) {
      if (((e = n & -n), e === t.callbackPriority)) return e;
      switch ((i !== null && pr(i), xr(n))) {
        case 2:
        case 8:
          n = tf;
          break;
        case 32:
          n = Vs;
          break;
        case 268435456:
          n = ef;
          break;
        default:
          n = Vs;
      }
      return (
        (i = fm.bind(null, t)),
        (n = gr(n, i)),
        (t.callbackPriority = e),
        (t.callbackNode = n),
        e
      );
    }
    return (
      i !== null && i !== null && pr(i),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function fm(t, e) {
    if (Wt !== 0 && Wt !== 5)
      return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var n = t.callbackNode;
    if (Dl() && t.callbackNode !== n) return null;
    var i = gt;
    return (
      (i = Us(
        t,
        t === Dt ? i : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      i === 0
        ? null
        : (Qh(t, i, e),
          cm(t, Ye()),
          t.callbackNode != null && t.callbackNode === n
            ? fm.bind(null, t)
            : null)
    );
  }
  function dm(t, e) {
    if (Dl()) return null;
    Qh(t, e, !0);
  }
  function Xv() {
    Iv(function () {
      (St & 6) !== 0 ? gr(Ic, qv) : um();
    });
  }
  function lu() {
    return (la === 0 && (la = nf()), la);
  }
  function hm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
        ? t
        : Ys("" + t);
  }
  function mm(t, e) {
    var n = e.ownerDocument.createElement("input");
    return (
      (n.name = e.name),
      (n.value = e.value),
      t.id && n.setAttribute("form", t.id),
      e.parentNode.insertBefore(n, e),
      (t = new FormData(t)),
      n.parentNode.removeChild(n),
      t
    );
  }
  function kv(t, e, n, i, r) {
    if (e === "submit" && n && n.stateNode === r) {
      var u = hm((r[oe] || null).action),
        h = i.submitter;
      h &&
        ((e = (e = h[oe] || null)
          ? hm(e.formAction)
          : h.getAttribute("formAction")),
        e !== null && ((u = e), (h = null)));
      var v = new Zs("action", "action", null, i, r);
      t.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (i.defaultPrevented) {
                if (la !== 0) {
                  var T = h ? mm(r, h) : new FormData(r);
                  Co(
                    n,
                    { pending: !0, data: T, method: r.method, action: u },
                    null,
                    T,
                  );
                }
              } else
                typeof u == "function" &&
                  (v.preventDefault(),
                  (T = h ? mm(r, h) : new FormData(r)),
                  Co(
                    n,
                    { pending: !0, data: T, method: r.method, action: u },
                    u,
                    T,
                  ));
            },
            currentTarget: r,
          },
        ],
      });
    }
  }
  for (var ru = 0; ru < kr.length; ru++) {
    var ou = kr[ru],
      Zv = ou.toLowerCase(),
      Kv = ou[0].toUpperCase() + ou.slice(1);
    Be(Zv, "on" + Kv);
  }
  (Be(Qf, "onAnimationEnd"),
    Be(Pf, "onAnimationIteration"),
    Be(Jf, "onAnimationStart"),
    Be("dblclick", "onDoubleClick"),
    Be("focusin", "onFocus"),
    Be("focusout", "onBlur"),
    Be(uv, "onTransitionRun"),
    Be(cv, "onTransitionStart"),
    Be(fv, "onTransitionCancel"),
    Be(Ff, "onTransitionEnd"),
    ba("onMouseEnter", ["mouseout", "mouseover"]),
    ba("onMouseLeave", ["mouseout", "mouseover"]),
    ba("onPointerEnter", ["pointerout", "pointerover"]),
    ba("onPointerLeave", ["pointerout", "pointerover"]),
    kn(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    kn(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    kn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    kn(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    kn(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    kn(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var Ii =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Qv = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Ii),
    );
  function gm(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var i = t[n],
        r = i.event;
      i = i.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var h = i.length - 1; 0 <= h; h--) {
            var v = i[h],
              T = v.instance,
              R = v.currentTarget;
            if (((v = v.listener), T !== u && r.isPropagationStopped()))
              break t;
            ((u = v), (r.currentTarget = R));
            try {
              u(r);
            } catch (_) {
              yl(_);
            }
            ((r.currentTarget = null), (u = T));
          }
        else
          for (h = 0; h < i.length; h++) {
            if (
              ((v = i[h]),
              (T = v.instance),
              (R = v.currentTarget),
              (v = v.listener),
              T !== u && r.isPropagationStopped())
            )
              break t;
            ((u = v), (r.currentTarget = R));
            try {
              u(r);
            } catch (_) {
              yl(_);
            }
            ((r.currentTarget = null), (u = T));
          }
      }
    }
  }
  function ht(t, e) {
    var n = e[br];
    n === void 0 && (n = e[br] = new Set());
    var i = t + "__bubble";
    n.has(i) || (pm(e, t, 2, !1), n.add(i));
  }
  function uu(t, e, n) {
    var i = 0;
    (e && (i |= 4), pm(n, t, i, e));
  }
  var Ol = "_reactListening" + Math.random().toString(36).slice(2);
  function cu(t) {
    if (!t[Ol]) {
      ((t[Ol] = !0),
        uf.forEach(function (n) {
          n !== "selectionchange" && (Qv.has(n) || uu(n, !1, t), uu(n, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Ol] || ((e[Ol] = !0), uu("selectionchange", !1, e));
    }
  }
  function pm(t, e, n, i) {
    switch (Gm(e)) {
      case 2:
        var r = bx;
        break;
      case 8:
        r = Sx;
        break;
      default:
        r = Eu;
    }
    ((n = r.bind(null, e, n, t)),
      (r = void 0),
      !Or ||
        (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
        (r = !0),
      i
        ? r !== void 0
          ? t.addEventListener(e, n, { capture: !0, passive: r })
          : t.addEventListener(e, n, !0)
        : r !== void 0
          ? t.addEventListener(e, n, { passive: r })
          : t.addEventListener(e, n, !1));
  }
  function fu(t, e, n, i, r) {
    var u = i;
    if ((e & 1) === 0 && (e & 2) === 0 && i !== null)
      t: for (;;) {
        if (i === null) return;
        var h = i.tag;
        if (h === 3 || h === 4) {
          var v = i.stateNode.containerInfo;
          if (v === r) break;
          if (h === 4)
            for (h = i.return; h !== null; ) {
              var T = h.tag;
              if ((T === 3 || T === 4) && h.stateNode.containerInfo === r)
                return;
              h = h.return;
            }
          for (; v !== null; ) {
            if (((h = ya(v)), h === null)) return;
            if (((T = h.tag), T === 5 || T === 6 || T === 26 || T === 27)) {
              i = u = h;
              continue t;
            }
            v = v.parentNode;
          }
        }
        i = i.return;
      }
    Af(function () {
      var R = u,
        _ = Rr(n),
        Y = [];
      t: {
        var j = $f.get(t);
        if (j !== void 0) {
          var O = Zs,
            at = t;
          switch (t) {
            case "keypress":
              if (Xs(n) === 0) break t;
            case "keydown":
            case "keyup":
              O = Y0;
              break;
            case "focusin":
              ((at = "focus"), (O = _r));
              break;
            case "focusout":
              ((at = "blur"), (O = _r));
              break;
            case "beforeblur":
            case "afterblur":
              O = _r;
              break;
            case "click":
              if (n.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              O = Cf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              O = R0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = k0;
              break;
            case Qf:
            case Pf:
            case Jf:
              O = w0;
              break;
            case Ff:
              O = K0;
              break;
            case "scroll":
            case "scrollend":
              O = N0;
              break;
            case "wheel":
              O = P0;
              break;
            case "copy":
            case "cut":
            case "paste":
              O = z0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              O = Df;
              break;
            case "toggle":
            case "beforetoggle":
              O = F0;
          }
          var et = (e & 4) !== 0,
            Mt = !et && (t === "scroll" || t === "scrollend"),
            N = et ? (j !== null ? j + "Capture" : null) : j;
          et = [];
          for (var E = R, D; E !== null; ) {
            var L = E;
            if (
              ((D = L.stateNode),
              (L = L.tag),
              (L !== 5 && L !== 26 && L !== 27) ||
                D === null ||
                N === null ||
                ((L = vi(E, N)), L != null && et.push(ts(E, L, D))),
              Mt)
            )
              break;
            E = E.return;
          }
          0 < et.length &&
            ((j = new O(j, at, null, n, _)),
            Y.push({ event: j, listeners: et }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((j = t === "mouseover" || t === "pointerover"),
            (O = t === "mouseout" || t === "pointerout"),
            j &&
              n !== Dr &&
              (at = n.relatedTarget || n.fromElement) &&
              (ya(at) || at[pa]))
          )
            break t;
          if (
            (O || j) &&
            ((j =
              _.window === _
                ? _
                : (j = _.ownerDocument)
                  ? j.defaultView || j.parentWindow
                  : window),
            O
              ? ((at = n.relatedTarget || n.toElement),
                (O = R),
                (at = at ? ya(at) : null),
                at !== null &&
                  ((Mt = f(at)),
                  (et = at.tag),
                  at !== Mt || (et !== 5 && et !== 27 && et !== 6)) &&
                  (at = null))
              : ((O = null), (at = R)),
            O !== at)
          ) {
            if (
              ((et = Cf),
              (L = "onMouseLeave"),
              (N = "onMouseEnter"),
              (E = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((et = Df),
                (L = "onPointerLeave"),
                (N = "onPointerEnter"),
                (E = "pointer")),
              (Mt = O == null ? j : yi(O)),
              (D = at == null ? j : yi(at)),
              (j = new et(L, E + "leave", O, n, _)),
              (j.target = Mt),
              (j.relatedTarget = D),
              (L = null),
              ya(_) === R &&
                ((et = new et(N, E + "enter", at, n, _)),
                (et.target = D),
                (et.relatedTarget = Mt),
                (L = et)),
              (Mt = L),
              O && at)
            )
              e: {
                for (et = O, N = at, E = 0, D = et; D; D = $a(D)) E++;
                for (D = 0, L = N; L; L = $a(L)) D++;
                for (; 0 < E - D; ) ((et = $a(et)), E--);
                for (; 0 < D - E; ) ((N = $a(N)), D--);
                for (; E--; ) {
                  if (et === N || (N !== null && et === N.alternate)) break e;
                  ((et = $a(et)), (N = $a(N)));
                }
                et = null;
              }
            else et = null;
            (O !== null && ym(Y, j, O, et, !1),
              at !== null && Mt !== null && ym(Y, Mt, at, et, !0));
          }
        }
        t: {
          if (
            ((j = R ? yi(R) : window),
            (O = j.nodeName && j.nodeName.toLowerCase()),
            O === "select" || (O === "input" && j.type === "file"))
          )
            var $ = Uf;
          else if (zf(j))
            if (Bf) $ = lv;
            else {
              $ = iv;
              var ct = av;
            }
          else
            ((O = j.nodeName),
              !O ||
              O.toLowerCase() !== "input" ||
              (j.type !== "checkbox" && j.type !== "radio")
                ? R && Nr(R.elementType) && ($ = Uf)
                : ($ = sv));
          if ($ && ($ = $(t, R))) {
            _f(Y, $, n, _);
            break t;
          }
          (ct && ct(t, j, R),
            t === "focusout" &&
              R &&
              j.type === "number" &&
              R.memoizedProps.value != null &&
              Cr(j, "number", j.value));
        }
        switch (((ct = R ? yi(R) : window), t)) {
          case "focusin":
            (zf(ct) || ct.contentEditable === "true") &&
              ((Na = ct), (Yr = R), (Ci = null));
            break;
          case "focusout":
            Ci = Yr = Na = null;
            break;
          case "mousedown":
            qr = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((qr = !1), Zf(Y, n, _));
            break;
          case "selectionchange":
            if (ov) break;
          case "keydown":
          case "keyup":
            Zf(Y, n, _);
        }
        var I;
        if (Br)
          t: {
            switch (t) {
              case "compositionstart":
                var nt = "onCompositionStart";
                break t;
              case "compositionend":
                nt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                nt = "onCompositionUpdate";
                break t;
            }
            nt = void 0;
          }
        else
          Ca
            ? wf(t, n) && (nt = "onCompositionEnd")
            : t === "keydown" &&
              n.keyCode === 229 &&
              (nt = "onCompositionStart");
        (nt &&
          (Rf &&
            n.locale !== "ko" &&
            (Ca || nt !== "onCompositionStart"
              ? nt === "onCompositionEnd" && Ca && (I = Ef())
              : ((yn = _),
                (wr = "value" in yn ? yn.value : yn.textContent),
                (Ca = !0))),
          (ct = wl(R, nt)),
          0 < ct.length &&
            ((nt = new Nf(nt, t, null, n, _)),
            Y.push({ event: nt, listeners: ct }),
            I ? (nt.data = I) : ((I = Vf(n)), I !== null && (nt.data = I)))),
          (I = W0 ? I0(t, n) : tv(t, n)) &&
            ((nt = wl(R, "onBeforeInput")),
            0 < nt.length &&
              ((ct = new Nf("onBeforeInput", "beforeinput", null, n, _)),
              Y.push({ event: ct, listeners: nt }),
              (ct.data = I))),
          kv(Y, t, R, n, _));
      }
      gm(Y, e);
    });
  }
  function ts(t, e, n) {
    return { instance: t, listener: e, currentTarget: n };
  }
  function wl(t, e) {
    for (var n = e + "Capture", i = []; t !== null; ) {
      var r = t,
        u = r.stateNode;
      if (
        ((r = r.tag),
        (r !== 5 && r !== 26 && r !== 27) ||
          u === null ||
          ((r = vi(t, n)),
          r != null && i.unshift(ts(t, r, u)),
          (r = vi(t, e)),
          r != null && i.push(ts(t, r, u))),
        t.tag === 3)
      )
        return i;
      t = t.return;
    }
    return [];
  }
  function $a(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function ym(t, e, n, i, r) {
    for (var u = e._reactName, h = []; n !== null && n !== i; ) {
      var v = n,
        T = v.alternate,
        R = v.stateNode;
      if (((v = v.tag), T !== null && T === i)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        R === null ||
        ((T = R),
        r
          ? ((R = vi(n, u)), R != null && h.unshift(ts(n, R, T)))
          : r || ((R = vi(n, u)), R != null && h.push(ts(n, R, T)))),
        (n = n.return));
    }
    h.length !== 0 && t.push({ event: e, listeners: h });
  }
  var Pv = /\r\n?/g,
    Jv = /\u0000|\uFFFD/g;
  function vm(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        Pv,
        `
`,
      )
      .replace(Jv, "");
  }
  function xm(t, e) {
    return ((e = vm(e)), vm(t) === e);
  }
  function Vl() {}
  function Et(t, e, n, i, r, u) {
    switch (n) {
      case "children":
        typeof i == "string"
          ? e === "body" || (e === "textarea" && i === "") || Aa(t, i)
          : (typeof i == "number" || typeof i == "bigint") &&
            e !== "body" &&
            Aa(t, "" + i);
        break;
      case "className":
        Ls(t, "class", i);
        break;
      case "tabIndex":
        Ls(t, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ls(t, n, i);
        break;
      case "style":
        Sf(t, i, u);
        break;
      case "data":
        if (e !== "object") {
          Ls(t, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (
          i == null ||
          typeof i == "function" ||
          typeof i == "symbol" ||
          typeof i == "boolean"
        ) {
          t.removeAttribute(n);
          break;
        }
        ((i = Ys("" + i)), t.setAttribute(n, i));
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof u == "function" &&
            (n === "formAction"
              ? (e !== "input" && Et(t, e, "name", r.name, r, null),
                Et(t, e, "formEncType", r.formEncType, r, null),
                Et(t, e, "formMethod", r.formMethod, r, null),
                Et(t, e, "formTarget", r.formTarget, r, null))
              : (Et(t, e, "encType", r.encType, r, null),
                Et(t, e, "method", r.method, r, null),
                Et(t, e, "target", r.target, r, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        ((i = Ys("" + i)), t.setAttribute(n, i));
        break;
      case "onClick":
        i != null && (t.onclick = Vl);
        break;
      case "onScroll":
        i != null && ht("scroll", t);
        break;
      case "onScrollEnd":
        i != null && ht("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(o(61));
          if (((n = i.__html), n != null)) {
            if (r.children != null) throw Error(o(60));
            t.innerHTML = n;
          }
        }
        break;
      case "multiple":
        t.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        t.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          i == null ||
          typeof i == "function" ||
          typeof i == "boolean" ||
          typeof i == "symbol"
        ) {
          t.removeAttribute("xlink:href");
          break;
        }
        ((n = Ys("" + i)),
          t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol"
          ? t.setAttribute(n, "" + i)
          : t.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol"
          ? t.setAttribute(n, "")
          : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        i === !0
          ? t.setAttribute(n, "")
          : i !== !1 &&
              i != null &&
              typeof i != "function" &&
              typeof i != "symbol"
            ? t.setAttribute(n, i)
            : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        !isNaN(i) &&
        1 <= i
          ? t.setAttribute(n, i)
          : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i)
          ? t.removeAttribute(n)
          : t.setAttribute(n, i);
        break;
      case "popover":
        (ht("beforetoggle", t), ht("toggle", t), Bs(t, "popover", i));
        break;
      case "xlinkActuate":
        Fe(t, "http://www.w3.org/1999/xlink", "xlink:actuate", i);
        break;
      case "xlinkArcrole":
        Fe(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", i);
        break;
      case "xlinkRole":
        Fe(t, "http://www.w3.org/1999/xlink", "xlink:role", i);
        break;
      case "xlinkShow":
        Fe(t, "http://www.w3.org/1999/xlink", "xlink:show", i);
        break;
      case "xlinkTitle":
        Fe(t, "http://www.w3.org/1999/xlink", "xlink:title", i);
        break;
      case "xlinkType":
        Fe(t, "http://www.w3.org/1999/xlink", "xlink:type", i);
        break;
      case "xmlBase":
        Fe(t, "http://www.w3.org/XML/1998/namespace", "xml:base", i);
        break;
      case "xmlLang":
        Fe(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", i);
        break;
      case "xmlSpace":
        Fe(t, "http://www.w3.org/XML/1998/namespace", "xml:space", i);
        break;
      case "is":
        Bs(t, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) ||
          (n[0] !== "o" && n[0] !== "O") ||
          (n[1] !== "n" && n[1] !== "N")) &&
          ((n = M0.get(n) || n), Bs(t, n, i));
    }
  }
  function du(t, e, n, i, r, u) {
    switch (n) {
      case "style":
        Sf(t, i, u);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(o(61));
          if (((n = i.__html), n != null)) {
            if (r.children != null) throw Error(o(60));
            t.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof i == "string"
          ? Aa(t, i)
          : (typeof i == "number" || typeof i == "bigint") && Aa(t, "" + i);
        break;
      case "onScroll":
        i != null && ht("scroll", t);
        break;
      case "onScrollEnd":
        i != null && ht("scrollend", t);
        break;
      case "onClick":
        i != null && (t.onclick = Vl);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!cf.hasOwnProperty(n))
          t: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((r = n.endsWith("Capture")),
              (e = n.slice(2, r ? n.length - 7 : void 0)),
              (u = t[oe] || null),
              (u = u != null ? u[n] : null),
              typeof u == "function" && t.removeEventListener(e, u, r),
              typeof i == "function")
            ) {
              (typeof u != "function" &&
                u !== null &&
                (n in t
                  ? (t[n] = null)
                  : t.hasAttribute(n) && t.removeAttribute(n)),
                t.addEventListener(e, i, r));
              break t;
            }
            n in t
              ? (t[n] = i)
              : i === !0
                ? t.setAttribute(n, "")
                : Bs(t, n, i);
          }
    }
  }
  function It(t, e, n) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (ht("error", t), ht("load", t));
        var i = !1,
          r = !1,
          u;
        for (u in n)
          if (n.hasOwnProperty(u)) {
            var h = n[u];
            if (h != null)
              switch (u) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  r = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, e));
                default:
                  Et(t, e, u, h, n, null);
              }
          }
        (r && Et(t, e, "srcSet", n.srcSet, n, null),
          i && Et(t, e, "src", n.src, n, null));
        return;
      case "input":
        ht("invalid", t);
        var v = (u = h = r = null),
          T = null,
          R = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var _ = n[i];
            if (_ != null)
              switch (i) {
                case "name":
                  r = _;
                  break;
                case "type":
                  h = _;
                  break;
                case "checked":
                  T = _;
                  break;
                case "defaultChecked":
                  R = _;
                  break;
                case "value":
                  u = _;
                  break;
                case "defaultValue":
                  v = _;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (_ != null) throw Error(o(137, e));
                  break;
                default:
                  Et(t, e, i, _, n, null);
              }
          }
        (yf(t, u, v, T, R, h, r, !1), Hs(t));
        return;
      case "select":
        (ht("invalid", t), (i = h = u = null));
        for (r in n)
          if (n.hasOwnProperty(r) && ((v = n[r]), v != null))
            switch (r) {
              case "value":
                u = v;
                break;
              case "defaultValue":
                h = v;
                break;
              case "multiple":
                i = v;
              default:
                Et(t, e, r, v, n, null);
            }
        ((e = u),
          (n = h),
          (t.multiple = !!i),
          e != null ? Ta(t, !!i, e, !1) : n != null && Ta(t, !!i, n, !0));
        return;
      case "textarea":
        (ht("invalid", t), (u = r = i = null));
        for (h in n)
          if (n.hasOwnProperty(h) && ((v = n[h]), v != null))
            switch (h) {
              case "value":
                i = v;
                break;
              case "defaultValue":
                r = v;
                break;
              case "children":
                u = v;
                break;
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(o(91));
                break;
              default:
                Et(t, e, h, v, n, null);
            }
        (xf(t, i, r, u), Hs(t));
        return;
      case "option":
        for (T in n)
          if (n.hasOwnProperty(T) && ((i = n[T]), i != null))
            switch (T) {
              case "selected":
                t.selected =
                  i && typeof i != "function" && typeof i != "symbol";
                break;
              default:
                Et(t, e, T, i, n, null);
            }
        return;
      case "dialog":
        (ht("beforetoggle", t),
          ht("toggle", t),
          ht("cancel", t),
          ht("close", t));
        break;
      case "iframe":
      case "object":
        ht("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Ii.length; i++) ht(Ii[i], t);
        break;
      case "image":
        (ht("error", t), ht("load", t));
        break;
      case "details":
        ht("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        (ht("error", t), ht("load", t));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (R in n)
          if (n.hasOwnProperty(R) && ((i = n[R]), i != null))
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, e));
              default:
                Et(t, e, R, i, n, null);
            }
        return;
      default:
        if (Nr(e)) {
          for (_ in n)
            n.hasOwnProperty(_) &&
              ((i = n[_]), i !== void 0 && du(t, e, _, i, n, void 0));
          return;
        }
    }
    for (v in n)
      n.hasOwnProperty(v) && ((i = n[v]), i != null && Et(t, e, v, i, n, null));
  }
  function Fv(t, e, n, i) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var r = null,
          u = null,
          h = null,
          v = null,
          T = null,
          R = null,
          _ = null;
        for (O in n) {
          var Y = n[O];
          if (n.hasOwnProperty(O) && Y != null)
            switch (O) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                T = Y;
              default:
                i.hasOwnProperty(O) || Et(t, e, O, null, i, Y);
            }
        }
        for (var j in i) {
          var O = i[j];
          if (((Y = n[j]), i.hasOwnProperty(j) && (O != null || Y != null)))
            switch (j) {
              case "type":
                u = O;
                break;
              case "name":
                r = O;
                break;
              case "checked":
                R = O;
                break;
              case "defaultChecked":
                _ = O;
                break;
              case "value":
                h = O;
                break;
              case "defaultValue":
                v = O;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null) throw Error(o(137, e));
                break;
              default:
                O !== Y && Et(t, e, j, O, i, Y);
            }
        }
        Mr(t, h, v, T, R, _, u, r);
        return;
      case "select":
        O = h = v = j = null;
        for (u in n)
          if (((T = n[u]), n.hasOwnProperty(u) && T != null))
            switch (u) {
              case "value":
                break;
              case "multiple":
                O = T;
              default:
                i.hasOwnProperty(u) || Et(t, e, u, null, i, T);
            }
        for (r in i)
          if (
            ((u = i[r]),
            (T = n[r]),
            i.hasOwnProperty(r) && (u != null || T != null))
          )
            switch (r) {
              case "value":
                j = u;
                break;
              case "defaultValue":
                v = u;
                break;
              case "multiple":
                h = u;
              default:
                u !== T && Et(t, e, r, u, i, T);
            }
        ((e = v),
          (n = h),
          (i = O),
          j != null
            ? Ta(t, !!n, j, !1)
            : !!i != !!n &&
              (e != null ? Ta(t, !!n, e, !0) : Ta(t, !!n, n ? [] : "", !1)));
        return;
      case "textarea":
        O = j = null;
        for (v in n)
          if (
            ((r = n[v]),
            n.hasOwnProperty(v) && r != null && !i.hasOwnProperty(v))
          )
            switch (v) {
              case "value":
                break;
              case "children":
                break;
              default:
                Et(t, e, v, null, i, r);
            }
        for (h in i)
          if (
            ((r = i[h]),
            (u = n[h]),
            i.hasOwnProperty(h) && (r != null || u != null))
          )
            switch (h) {
              case "value":
                j = r;
                break;
              case "defaultValue":
                O = r;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(o(91));
                break;
              default:
                r !== u && Et(t, e, h, r, i, u);
            }
        vf(t, j, O);
        return;
      case "option":
        for (var at in n)
          if (
            ((j = n[at]),
            n.hasOwnProperty(at) && j != null && !i.hasOwnProperty(at))
          )
            switch (at) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Et(t, e, at, null, i, j);
            }
        for (T in i)
          if (
            ((j = i[T]),
            (O = n[T]),
            i.hasOwnProperty(T) && j !== O && (j != null || O != null))
          )
            switch (T) {
              case "selected":
                t.selected =
                  j && typeof j != "function" && typeof j != "symbol";
                break;
              default:
                Et(t, e, T, j, i, O);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var et in n)
          ((j = n[et]),
            n.hasOwnProperty(et) &&
              j != null &&
              !i.hasOwnProperty(et) &&
              Et(t, e, et, null, i, j));
        for (R in i)
          if (
            ((j = i[R]),
            (O = n[R]),
            i.hasOwnProperty(R) && j !== O && (j != null || O != null))
          )
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(o(137, e));
                break;
              default:
                Et(t, e, R, j, i, O);
            }
        return;
      default:
        if (Nr(e)) {
          for (var Mt in n)
            ((j = n[Mt]),
              n.hasOwnProperty(Mt) &&
                j !== void 0 &&
                !i.hasOwnProperty(Mt) &&
                du(t, e, Mt, void 0, i, j));
          for (_ in i)
            ((j = i[_]),
              (O = n[_]),
              !i.hasOwnProperty(_) ||
                j === O ||
                (j === void 0 && O === void 0) ||
                du(t, e, _, j, i, O));
          return;
        }
    }
    for (var N in n)
      ((j = n[N]),
        n.hasOwnProperty(N) &&
          j != null &&
          !i.hasOwnProperty(N) &&
          Et(t, e, N, null, i, j));
    for (Y in i)
      ((j = i[Y]),
        (O = n[Y]),
        !i.hasOwnProperty(Y) ||
          j === O ||
          (j == null && O == null) ||
          Et(t, e, Y, j, i, O));
  }
  var hu = null,
    mu = null;
  function zl(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function bm(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Sm(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function gu(t, e) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof e.children == "string" ||
      typeof e.children == "number" ||
      typeof e.children == "bigint" ||
      (typeof e.dangerouslySetInnerHTML == "object" &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    );
  }
  var pu = null;
  function $v() {
    var t = window.event;
    return t && t.type === "popstate"
      ? t === pu
        ? !1
        : ((pu = t), !0)
      : ((pu = null), !1);
  }
  var Tm = typeof setTimeout == "function" ? setTimeout : void 0,
    Wv = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Am = typeof Promise == "function" ? Promise : void 0,
    Iv =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Am < "u"
          ? function (t) {
              return Am.resolve(null).then(t).catch(tx);
            }
          : Tm;
  function tx(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Vn(t) {
    return t === "head";
  }
  function Em(t, e) {
    var n = e,
      i = 0,
      r = 0;
    do {
      var u = n.nextSibling;
      if ((t.removeChild(n), u && u.nodeType === 8))
        if (((n = u.data), n === "/$")) {
          if (0 < i && 8 > i) {
            n = i;
            var h = t.ownerDocument;
            if ((n & 1 && es(h.documentElement), n & 2 && es(h.body), n & 4))
              for (n = h.head, es(n), h = n.firstChild; h; ) {
                var v = h.nextSibling,
                  T = h.nodeName;
                (h[pi] ||
                  T === "SCRIPT" ||
                  T === "STYLE" ||
                  (T === "LINK" && h.rel.toLowerCase() === "stylesheet") ||
                  n.removeChild(h),
                  (h = v));
              }
          }
          if (r === 0) {
            (t.removeChild(u), us(e));
            return;
          }
          r--;
        } else
          n === "$" || n === "$?" || n === "$!"
            ? r++
            : (i = n.charCodeAt(0) - 48);
      else i = 0;
      n = u;
    } while (n);
    us(e);
  }
  function yu(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (((e = e.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (yu(n), Sr(n));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(n);
    }
  }
  function ex(t, e, n, i) {
    for (; t.nodeType === 1; ) {
      var r = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!i && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (i) {
        if (!t[pi])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((u = t.getAttribute("rel")),
                u === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                u !== r.rel ||
                t.getAttribute("href") !==
                  (r.href == null || r.href === "" ? null : r.href) ||
                t.getAttribute("crossorigin") !==
                  (r.crossOrigin == null ? null : r.crossOrigin) ||
                t.getAttribute("title") !== (r.title == null ? null : r.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((u = t.getAttribute("src")),
                (u !== (r.src == null ? null : r.src) ||
                  t.getAttribute("type") !== (r.type == null ? null : r.type) ||
                  t.getAttribute("crossorigin") !==
                    (r.crossOrigin == null ? null : r.crossOrigin)) &&
                  u &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var u = r.name == null ? null : "" + r.name;
        if (r.type === "hidden" && t.getAttribute("name") === u) return t;
      } else return t;
      if (((t = He(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function nx(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !n) ||
        ((t = He(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function vu(t) {
    return (
      t.data === "$!" ||
      (t.data === "$?" && t.ownerDocument.readyState === "complete")
    );
  }
  function ax(t, e) {
    var n = t.ownerDocument;
    if (t.data !== "$?" || n.readyState === "complete") e();
    else {
      var i = function () {
        (e(), n.removeEventListener("DOMContentLoaded", i));
      };
      (n.addEventListener("DOMContentLoaded", i), (t._reactRetry = i));
    }
  }
  function He(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (
          ((e = t.data),
          e === "$" || e === "$!" || e === "$?" || e === "F!" || e === "F")
        )
          break;
        if (e === "/$") return null;
      }
    }
    return t;
  }
  var xu = null;
  function Mm(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (e === 0) return t;
          e--;
        } else n === "/$" && e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Cm(t, e, n) {
    switch (((e = zl(n)), t)) {
      case "html":
        if (((t = e.documentElement), !t)) throw Error(o(452));
        return t;
      case "head":
        if (((t = e.head), !t)) throw Error(o(453));
        return t;
      case "body":
        if (((t = e.body), !t)) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function es(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    Sr(t);
  }
  var we = new Map(),
    Nm = new Set();
  function _l(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var fn = B.d;
  B.d = { f: ix, r: sx, D: lx, C: rx, L: ox, m: ux, X: fx, S: cx, M: dx };
  function ix() {
    var t = fn.f(),
      e = Cl();
    return t || e;
  }
  function sx(t) {
    var e = va(t);
    e !== null && e.tag === 5 && e.type === "form" ? Qd(e) : fn.r(t);
  }
  var Wa = typeof document > "u" ? null : document;
  function Dm(t, e, n) {
    var i = Wa;
    if (i && typeof e == "string" && e) {
      var r = Me(e);
      ((r = 'link[rel="' + t + '"][href="' + r + '"]'),
        typeof n == "string" && (r += '[crossorigin="' + n + '"]'),
        Nm.has(r) ||
          (Nm.add(r),
          (t = { rel: t, crossOrigin: n, href: e }),
          i.querySelector(r) === null &&
            ((e = i.createElement("link")),
            It(e, "link", t),
            Kt(e),
            i.head.appendChild(e))));
    }
  }
  function lx(t) {
    (fn.D(t), Dm("dns-prefetch", t, null));
  }
  function rx(t, e) {
    (fn.C(t, e), Dm("preconnect", t, e));
  }
  function ox(t, e, n) {
    fn.L(t, e, n);
    var i = Wa;
    if (i && t && e) {
      var r = 'link[rel="preload"][as="' + Me(e) + '"]';
      e === "image" && n && n.imageSrcSet
        ? ((r += '[imagesrcset="' + Me(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == "string" &&
            (r += '[imagesizes="' + Me(n.imageSizes) + '"]'))
        : (r += '[href="' + Me(t) + '"]');
      var u = r;
      switch (e) {
        case "style":
          u = Ia(t);
          break;
        case "script":
          u = ti(t);
      }
      we.has(u) ||
        ((t = y(
          {
            rel: "preload",
            href: e === "image" && n && n.imageSrcSet ? void 0 : t,
            as: e,
          },
          n,
        )),
        we.set(u, t),
        i.querySelector(r) !== null ||
          (e === "style" && i.querySelector(ns(u))) ||
          (e === "script" && i.querySelector(as(u))) ||
          ((e = i.createElement("link")),
          It(e, "link", t),
          Kt(e),
          i.head.appendChild(e)));
    }
  }
  function ux(t, e) {
    fn.m(t, e);
    var n = Wa;
    if (n && t) {
      var i = e && typeof e.as == "string" ? e.as : "script",
        r =
          'link[rel="modulepreload"][as="' + Me(i) + '"][href="' + Me(t) + '"]',
        u = r;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = ti(t);
      }
      if (
        !we.has(u) &&
        ((t = y({ rel: "modulepreload", href: t }, e)),
        we.set(u, t),
        n.querySelector(r) === null)
      ) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(as(u))) return;
        }
        ((i = n.createElement("link")),
          It(i, "link", t),
          Kt(i),
          n.head.appendChild(i));
      }
    }
  }
  function cx(t, e, n) {
    fn.S(t, e, n);
    var i = Wa;
    if (i && t) {
      var r = xa(i).hoistableStyles,
        u = Ia(t);
      e = e || "default";
      var h = r.get(u);
      if (!h) {
        var v = { loading: 0, preload: null };
        if ((h = i.querySelector(ns(u)))) v.loading = 5;
        else {
          ((t = y({ rel: "stylesheet", href: t, "data-precedence": e }, n)),
            (n = we.get(u)) && bu(t, n));
          var T = (h = i.createElement("link"));
          (Kt(T),
            It(T, "link", t),
            (T._p = new Promise(function (R, _) {
              ((T.onload = R), (T.onerror = _));
            })),
            T.addEventListener("load", function () {
              v.loading |= 1;
            }),
            T.addEventListener("error", function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            Ul(h, e, i));
        }
        ((h = { type: "stylesheet", instance: h, count: 1, state: v }),
          r.set(u, h));
      }
    }
  }
  function fx(t, e) {
    fn.X(t, e);
    var n = Wa;
    if (n && t) {
      var i = xa(n).hoistableScripts,
        r = ti(t),
        u = i.get(r);
      u ||
        ((u = n.querySelector(as(r))),
        u ||
          ((t = y({ src: t, async: !0 }, e)),
          (e = we.get(r)) && Su(t, e),
          (u = n.createElement("script")),
          Kt(u),
          It(u, "link", t),
          n.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        i.set(r, u));
    }
  }
  function dx(t, e) {
    fn.M(t, e);
    var n = Wa;
    if (n && t) {
      var i = xa(n).hoistableScripts,
        r = ti(t),
        u = i.get(r);
      u ||
        ((u = n.querySelector(as(r))),
        u ||
          ((t = y({ src: t, async: !0, type: "module" }, e)),
          (e = we.get(r)) && Su(t, e),
          (u = n.createElement("script")),
          Kt(u),
          It(u, "link", t),
          n.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        i.set(r, u));
    }
  }
  function Rm(t, e, n, i) {
    var r = (r = lt.current) ? _l(r) : null;
    if (!r) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string"
          ? ((e = Ia(n.href)),
            (n = xa(r).hoistableStyles),
            (i = n.get(e)),
            i ||
              ((i = { type: "style", instance: null, count: 0, state: null }),
              n.set(e, i)),
            i)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          n.rel === "stylesheet" &&
          typeof n.href == "string" &&
          typeof n.precedence == "string"
        ) {
          t = Ia(n.href);
          var u = xa(r).hoistableStyles,
            h = u.get(t);
          if (
            (h ||
              ((r = r.ownerDocument || r),
              (h = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(t, h),
              (u = r.querySelector(ns(t))) &&
                !u._p &&
                ((h.instance = u), (h.state.loading = 5)),
              we.has(t) ||
                ((n = {
                  rel: "preload",
                  as: "style",
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy,
                }),
                we.set(t, n),
                u || hx(r, t, n, h.state))),
            e && i === null)
          )
            throw Error(o(528, ""));
          return h;
        }
        if (e && i !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return (
          (e = n.async),
          (n = n.src),
          typeof n == "string" &&
          e &&
          typeof e != "function" &&
          typeof e != "symbol"
            ? ((e = ti(n)),
              (n = xa(r).hoistableScripts),
              (i = n.get(e)),
              i ||
                ((i = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                n.set(e, i)),
              i)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, t));
    }
  }
  function Ia(t) {
    return 'href="' + Me(t) + '"';
  }
  function ns(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function jm(t) {
    return y({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function hx(t, e, n, i) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]")
      ? (i.loading = 1)
      : ((e = t.createElement("link")),
        (i.preload = e),
        e.addEventListener("load", function () {
          return (i.loading |= 1);
        }),
        e.addEventListener("error", function () {
          return (i.loading |= 2);
        }),
        It(e, "link", n),
        Kt(e),
        t.head.appendChild(e));
  }
  function ti(t) {
    return '[src="' + Me(t) + '"]';
  }
  function as(t) {
    return "script[async]" + t;
  }
  function Om(t, e, n) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case "style":
          var i = t.querySelector('style[data-href~="' + Me(n.href) + '"]');
          if (i) return ((e.instance = i), Kt(i), i);
          var r = y({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (i = (t.ownerDocument || t).createElement("style")),
            Kt(i),
            It(i, "style", r),
            Ul(i, n.precedence, t),
            (e.instance = i)
          );
        case "stylesheet":
          r = Ia(n.href);
          var u = t.querySelector(ns(r));
          if (u) return ((e.state.loading |= 4), (e.instance = u), Kt(u), u);
          ((i = jm(n)),
            (r = we.get(r)) && bu(i, r),
            (u = (t.ownerDocument || t).createElement("link")),
            Kt(u));
          var h = u;
          return (
            (h._p = new Promise(function (v, T) {
              ((h.onload = v), (h.onerror = T));
            })),
            It(u, "link", i),
            (e.state.loading |= 4),
            Ul(u, n.precedence, t),
            (e.instance = u)
          );
        case "script":
          return (
            (u = ti(n.src)),
            (r = t.querySelector(as(u)))
              ? ((e.instance = r), Kt(r), r)
              : ((i = n),
                (r = we.get(u)) && ((i = y({}, n)), Su(i, r)),
                (t = t.ownerDocument || t),
                (r = t.createElement("script")),
                Kt(r),
                It(r, "link", i),
                t.head.appendChild(r),
                (e.instance = r))
          );
        case "void":
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === "stylesheet" &&
        (e.state.loading & 4) === 0 &&
        ((i = e.instance), (e.state.loading |= 4), Ul(i, n.precedence, t));
    return e.instance;
  }
  function Ul(t, e, n) {
    for (
      var i = n.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        r = i.length ? i[i.length - 1] : null,
        u = r,
        h = 0;
      h < i.length;
      h++
    ) {
      var v = i[h];
      if (v.dataset.precedence === e) u = v;
      else if (u !== r) break;
    }
    u
      ? u.parentNode.insertBefore(t, u.nextSibling)
      : ((e = n.nodeType === 9 ? n.head : n), e.insertBefore(t, e.firstChild));
  }
  function bu(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function Su(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var Bl = null;
  function wm(t, e, n) {
    if (Bl === null) {
      var i = new Map(),
        r = (Bl = new Map());
      r.set(n, i);
    } else ((r = Bl), (i = r.get(n)), i || ((i = new Map()), r.set(n, i)));
    if (i.has(t)) return i;
    for (
      i.set(t, null), n = n.getElementsByTagName(t), r = 0;
      r < n.length;
      r++
    ) {
      var u = n[r];
      if (
        !(
          u[pi] ||
          u[ne] ||
          (t === "link" && u.getAttribute("rel") === "stylesheet")
        ) &&
        u.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var h = u.getAttribute(e) || "";
        h = t + h;
        var v = i.get(h);
        v ? v.push(u) : i.set(h, [u]);
      }
    }
    return i;
  }
  function Vm(t, e, n) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(
        n,
        e === "title" ? t.querySelector("head > title") : null,
      ));
  }
  function mx(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof e.precedence != "string" ||
          typeof e.href != "string" ||
          e.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof e.rel != "string" ||
          typeof e.href != "string" ||
          e.href === "" ||
          e.onLoad ||
          e.onError
        )
          break;
        switch (e.rel) {
          case "stylesheet":
            return (
              (t = e.disabled),
              typeof e.precedence == "string" && t == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          e.async &&
          typeof e.async != "function" &&
          typeof e.async != "symbol" &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function zm(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  var is = null;
  function gx() {}
  function px(t, e, n) {
    if (is === null) throw Error(o(475));
    var i = is;
    if (
      e.type === "stylesheet" &&
      (typeof n.media != "string" || matchMedia(n.media).matches !== !1) &&
      (e.state.loading & 4) === 0
    ) {
      if (e.instance === null) {
        var r = Ia(n.href),
          u = t.querySelector(ns(r));
        if (u) {
          ((t = u._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (i.count++, (i = Ll.bind(i)), t.then(i, i)),
            (e.state.loading |= 4),
            (e.instance = u),
            Kt(u));
          return;
        }
        ((u = t.ownerDocument || t),
          (n = jm(n)),
          (r = we.get(r)) && bu(n, r),
          (u = u.createElement("link")),
          Kt(u));
        var h = u;
        ((h._p = new Promise(function (v, T) {
          ((h.onload = v), (h.onerror = T));
        })),
          It(u, "link", n),
          (e.instance = u));
      }
      (i.stylesheets === null && (i.stylesheets = new Map()),
        i.stylesheets.set(e, t),
        (t = e.state.preload) &&
          (e.state.loading & 3) === 0 &&
          (i.count++,
          (e = Ll.bind(i)),
          t.addEventListener("load", e),
          t.addEventListener("error", e)));
    }
  }
  function yx() {
    if (is === null) throw Error(o(475));
    var t = is;
    return (
      t.stylesheets && t.count === 0 && Tu(t, t.stylesheets),
      0 < t.count
        ? function (e) {
            var n = setTimeout(function () {
              if ((t.stylesheets && Tu(t, t.stylesheets), t.unsuspend)) {
                var i = t.unsuspend;
                ((t.unsuspend = null), i());
              }
            }, 6e4);
            return (
              (t.unsuspend = e),
              function () {
                ((t.unsuspend = null), clearTimeout(n));
              }
            );
          }
        : null
    );
  }
  function Ll() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) Tu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Hl = null;
  function Tu(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        (Hl = new Map()),
        e.forEach(vx, t),
        (Hl = null),
        Ll.call(t)));
  }
  function vx(t, e) {
    if (!(e.state.loading & 4)) {
      var n = Hl.get(t);
      if (n) var i = n.get(null);
      else {
        ((n = new Map()), Hl.set(t, n));
        for (
          var r = t.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            u = 0;
          u < r.length;
          u++
        ) {
          var h = r[u];
          (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") &&
            (n.set(h.dataset.precedence, h), (i = h));
        }
        i && n.set(null, i);
      }
      ((r = e.instance),
        (h = r.getAttribute("data-precedence")),
        (u = n.get(h) || i),
        u === i && n.set(null, r),
        n.set(h, r),
        this.count++,
        (i = Ll.bind(this)),
        r.addEventListener("load", i),
        r.addEventListener("error", i),
        u
          ? u.parentNode.insertBefore(r, u.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(r, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var ss = {
    $$typeof: C,
    Provider: null,
    Consumer: null,
    _currentValue: K,
    _currentValue2: K,
    _threadCount: 0,
  };
  function xx(t, e, n, i, r, u, h, v) {
    ((this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = yr(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = yr(0)),
      (this.hiddenUpdates = yr(null)),
      (this.identifierPrefix = i),
      (this.onUncaughtError = r),
      (this.onCaughtError = u),
      (this.onRecoverableError = h),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = v),
      (this.incompleteTransitions = new Map()));
  }
  function _m(t, e, n, i, r, u, h, v, T, R, _, Y) {
    return (
      (t = new xx(t, e, n, h, v, T, R, Y)),
      (e = 1),
      u === !0 && (e |= 24),
      (u = ve(3, null, null, e)),
      (t.current = u),
      (u.stateNode = t),
      (e = no()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (u.memoizedState = { element: i, isDehydrated: n, cache: e }),
      lo(u),
      t
    );
  }
  function Um(t) {
    return t ? ((t = Oa), t) : Oa;
  }
  function Bm(t, e, n, i, r, u) {
    ((r = Um(r)),
      i.context === null ? (i.context = r) : (i.pendingContext = r),
      (i = bn(e)),
      (i.payload = { element: n }),
      (u = u === void 0 ? null : u),
      u !== null && (i.callback = u),
      (n = Sn(t, i, e)),
      n !== null && (Ae(n, t, e), _i(n, t, e)));
  }
  function Lm(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Au(t, e) {
    (Lm(t, e), (t = t.alternate) && Lm(t, e));
  }
  function Hm(t) {
    if (t.tag === 13) {
      var e = ja(t, 67108864);
      (e !== null && Ae(e, t, 67108864), Au(t, 67108864));
    }
  }
  var Gl = !0;
  function bx(t, e, n, i) {
    var r = z.T;
    z.T = null;
    var u = B.p;
    try {
      ((B.p = 2), Eu(t, e, n, i));
    } finally {
      ((B.p = u), (z.T = r));
    }
  }
  function Sx(t, e, n, i) {
    var r = z.T;
    z.T = null;
    var u = B.p;
    try {
      ((B.p = 8), Eu(t, e, n, i));
    } finally {
      ((B.p = u), (z.T = r));
    }
  }
  function Eu(t, e, n, i) {
    if (Gl) {
      var r = Mu(i);
      if (r === null) (fu(t, e, i, Yl, n), Ym(t, i));
      else if (Ax(r, t, e, n, i)) i.stopPropagation();
      else if ((Ym(t, i), e & 4 && -1 < Tx.indexOf(t))) {
        for (; r !== null; ) {
          var u = va(r);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var h = Xn(u.pendingLanes);
                  if (h !== 0) {
                    var v = u;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; h; ) {
                      var T = 1 << (31 - pe(h));
                      ((v.entanglements[1] |= T), (h &= ~T));
                    }
                    (Ke(u), (St & 6) === 0 && ((El = Ye() + 500), Wi(0)));
                  }
                }
                break;
              case 13:
                ((v = ja(u, 2)), v !== null && Ae(v, u, 2), Cl(), Au(u, 2));
            }
          if (((u = Mu(i)), u === null && fu(t, e, i, Yl, n), u === r)) break;
          r = u;
        }
        r !== null && i.stopPropagation();
      } else fu(t, e, i, null, n);
    }
  }
  function Mu(t) {
    return ((t = Rr(t)), Cu(t));
  }
  var Yl = null;
  function Cu(t) {
    if (((Yl = null), (t = ya(t)), t !== null)) {
      var e = f(t);
      if (e === null) t = null;
      else {
        var n = e.tag;
        if (n === 13) {
          if (((t = d(e)), t !== null)) return t;
          t = null;
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ((Yl = t), null);
  }
  function Gm(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (r0()) {
          case Ic:
            return 2;
          case tf:
            return 8;
          case Vs:
          case o0:
            return 32;
          case ef:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Nu = !1,
    zn = null,
    _n = null,
    Un = null,
    ls = new Map(),
    rs = new Map(),
    Bn = [],
    Tx =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Ym(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        zn = null;
        break;
      case "dragenter":
      case "dragleave":
        _n = null;
        break;
      case "mouseover":
      case "mouseout":
        Un = null;
        break;
      case "pointerover":
      case "pointerout":
        ls.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        rs.delete(e.pointerId);
    }
  }
  function os(t, e, n, i, r, u) {
    return t === null || t.nativeEvent !== u
      ? ((t = {
          blockedOn: e,
          domEventName: n,
          eventSystemFlags: i,
          nativeEvent: u,
          targetContainers: [r],
        }),
        e !== null && ((e = va(e)), e !== null && Hm(e)),
        t)
      : ((t.eventSystemFlags |= i),
        (e = t.targetContainers),
        r !== null && e.indexOf(r) === -1 && e.push(r),
        t);
  }
  function Ax(t, e, n, i, r) {
    switch (e) {
      case "focusin":
        return ((zn = os(zn, t, e, n, i, r)), !0);
      case "dragenter":
        return ((_n = os(_n, t, e, n, i, r)), !0);
      case "mouseover":
        return ((Un = os(Un, t, e, n, i, r)), !0);
      case "pointerover":
        var u = r.pointerId;
        return (ls.set(u, os(ls.get(u) || null, t, e, n, i, r)), !0);
      case "gotpointercapture":
        return (
          (u = r.pointerId),
          rs.set(u, os(rs.get(u) || null, t, e, n, i, r)),
          !0
        );
    }
    return !1;
  }
  function qm(t) {
    var e = ya(t.target);
    if (e !== null) {
      var n = f(e);
      if (n !== null) {
        if (((e = n.tag), e === 13)) {
          if (((e = d(n)), e !== null)) {
            ((t.blockedOn = e),
              p0(t.priority, function () {
                if (n.tag === 13) {
                  var i = Te();
                  i = vr(i);
                  var r = ja(n, i);
                  (r !== null && Ae(r, n, i), Au(n, i));
                }
              }));
            return;
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function ql(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = Mu(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var i = new n.constructor(n.type, n);
        ((Dr = i), n.target.dispatchEvent(i), (Dr = null));
      } else return ((e = va(n)), e !== null && Hm(e), (t.blockedOn = n), !1);
      e.shift();
    }
    return !0;
  }
  function Xm(t, e, n) {
    ql(t) && n.delete(e);
  }
  function Ex() {
    ((Nu = !1),
      zn !== null && ql(zn) && (zn = null),
      _n !== null && ql(_n) && (_n = null),
      Un !== null && ql(Un) && (Un = null),
      ls.forEach(Xm),
      rs.forEach(Xm));
  }
  function Xl(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      Nu ||
        ((Nu = !0),
        a.unstable_scheduleCallback(a.unstable_NormalPriority, Ex)));
  }
  var kl = null;
  function km(t) {
    kl !== t &&
      ((kl = t),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        kl === t && (kl = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e],
            i = t[e + 1],
            r = t[e + 2];
          if (typeof i != "function") {
            if (Cu(i || n) === null) continue;
            break;
          }
          var u = va(n);
          u !== null &&
            (t.splice(e, 3),
            (e -= 3),
            Co(u, { pending: !0, data: r, method: n.method, action: i }, i, r));
        }
      }));
  }
  function us(t) {
    function e(T) {
      return Xl(T, t);
    }
    (zn !== null && Xl(zn, t),
      _n !== null && Xl(_n, t),
      Un !== null && Xl(Un, t),
      ls.forEach(e),
      rs.forEach(e));
    for (var n = 0; n < Bn.length; n++) {
      var i = Bn[n];
      i.blockedOn === t && (i.blockedOn = null);
    }
    for (; 0 < Bn.length && ((n = Bn[0]), n.blockedOn === null); )
      (qm(n), n.blockedOn === null && Bn.shift());
    if (((n = (t.ownerDocument || t).$$reactFormReplay), n != null))
      for (i = 0; i < n.length; i += 3) {
        var r = n[i],
          u = n[i + 1],
          h = r[oe] || null;
        if (typeof u == "function") h || km(n);
        else if (h) {
          var v = null;
          if (u && u.hasAttribute("formAction")) {
            if (((r = u), (h = u[oe] || null))) v = h.formAction;
            else if (Cu(r) !== null) continue;
          } else v = h.action;
          (typeof v == "function" ? (n[i + 1] = v) : (n.splice(i, 3), (i -= 3)),
            km(n));
        }
      }
  }
  function Du(t) {
    this._internalRoot = t;
  }
  ((Zl.prototype.render = Du.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(o(409));
      var n = e.current,
        i = Te();
      Bm(n, i, t, e, null, null);
    }),
    (Zl.prototype.unmount = Du.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (Bm(t.current, 2, null, t, null, null), Cl(), (e[pa] = null));
        }
      }));
  function Zl(t) {
    this._internalRoot = t;
  }
  Zl.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = rf();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < Bn.length && e !== 0 && e < Bn[n].priority; n++);
      (Bn.splice(n, 0, t), n === 0 && qm(t));
    }
  };
  var Zm = s.version;
  if (Zm !== "19.1.0") throw Error(o(527, Zm, "19.1.0"));
  B.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function"
        ? Error(o(188))
        : ((t = Object.keys(t).join(",")), Error(o(268, t)));
    return (
      (t = p(e)),
      (t = t !== null ? g(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    );
  };
  var Mx = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.1.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Kl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Kl.isDisabled && Kl.supportsFiber)
      try {
        ((hi = Kl.inject(Mx)), (ge = Kl));
      } catch {}
  }
  return (
    (fs.createRoot = function (t, e) {
      if (!c(t)) throw Error(o(299));
      var n = !1,
        i = "",
        r = rh,
        u = oh,
        h = uh,
        v = null;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (n = !0),
          e.identifierPrefix !== void 0 && (i = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (r = e.onUncaughtError),
          e.onCaughtError !== void 0 && (u = e.onCaughtError),
          e.onRecoverableError !== void 0 && (h = e.onRecoverableError),
          e.unstable_transitionCallbacks !== void 0 &&
            (v = e.unstable_transitionCallbacks)),
        (e = _m(t, 1, !1, null, null, n, i, r, u, h, v, null)),
        (t[pa] = e.current),
        cu(t),
        new Du(e)
      );
    }),
    (fs.hydrateRoot = function (t, e, n) {
      if (!c(t)) throw Error(o(299));
      var i = !1,
        r = "",
        u = rh,
        h = oh,
        v = uh,
        T = null,
        R = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (i = !0),
          n.identifierPrefix !== void 0 && (r = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (u = n.onUncaughtError),
          n.onCaughtError !== void 0 && (h = n.onCaughtError),
          n.onRecoverableError !== void 0 && (v = n.onRecoverableError),
          n.unstable_transitionCallbacks !== void 0 &&
            (T = n.unstable_transitionCallbacks),
          n.formState !== void 0 && (R = n.formState)),
        (e = _m(t, 1, !0, e, n ?? null, i, r, u, h, v, T, R)),
        (e.context = Um(null)),
        (n = e.current),
        (i = Te()),
        (i = vr(i)),
        (r = bn(i)),
        (r.callback = null),
        Sn(n, r, i),
        (n = i),
        (e.current.lanes = n),
        gi(e, n),
        Ke(e),
        (t[pa] = e.current),
        cu(t),
        new Zl(e)
      );
    }),
    (fs.version = "19.1.0"),
    fs
  );
}
var eg;
function zx() {
  if (eg) return Ou.exports;
  eg = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (s) {
        console.error(s);
      }
  }
  return (a(), (Ou.exports = Vx()), Ou.exports);
}
var _x = zx();
const Ux = Sp(_x),
  Bx = ({
    header: a,
    leftPanel: s,
    mainContent: l,
    rightPanel: o,
    className: c = "",
  }) =>
    x.jsxs("div", {
      className: `h-screen flex flex-col overflow-hidden ${c}`,
      children: [
        x.jsx("div", { className: "flex-shrink-0", children: a }),
        x.jsxs("div", {
          className:
            "flex-1 flex flex-col lg:flex-row gap-2 lg:gap-4 p-2 lg:p-4 overflow-hidden",
          children: [
            x.jsx("div", {
              className: "w-full lg:w-80 order-2 lg:order-1 flex-shrink-0",
              children: s,
            }),
            x.jsx("div", {
              className: "flex-1 order-1 lg:order-2 min-h-0",
              children: l,
            }),
            x.jsx("div", {
              className: "w-full lg:w-80 order-3 flex-shrink-0",
              children: o,
            }),
          ],
        }),
      ],
    }),
  ng = (a) => {
    let s;
    const l = new Set(),
      o = (g, y) => {
        const b = typeof g == "function" ? g(s) : g;
        if (!Object.is(b, s)) {
          const S = s;
          ((s =
            (y ?? (typeof b != "object" || b === null))
              ? b
              : Object.assign({}, s, b)),
            l.forEach((M) => M(s, S)));
        }
      },
      c = () => s,
      m = {
        setState: o,
        getState: c,
        getInitialState: () => p,
        subscribe: (g) => (l.add(g), () => l.delete(g)),
      },
      p = (s = a(o, c, m));
    return m;
  },
  Lx = (a) => (a ? ng(a) : ng),
  Hx = (a) => a;
function Gx(a, s = Hx) {
  const l = Pu.useSyncExternalStore(
    a.subscribe,
    () => s(a.getState()),
    () => s(a.getInitialState()),
  );
  return (Pu.useDebugValue(l), l);
}
const Yx = (a) => {
    const s = Lx(a),
      l = (o) => Gx(s, o);
    return (Object.assign(l, s), l);
  },
  qx = (a) => Yx;
function Ap(a, s) {
  let l;
  try {
    l = a();
  } catch {
    return;
  }
  return {
    getItem: (c) => {
      var f;
      const d = (p) => (p === null ? null : JSON.parse(p, void 0)),
        m = (f = l.getItem(c)) != null ? f : null;
      return m instanceof Promise ? m.then(d) : d(m);
    },
    setItem: (c, f) => l.setItem(c, JSON.stringify(f, void 0)),
    removeItem: (c) => l.removeItem(c),
  };
}
const Ju = (a) => (s) => {
    try {
      const l = a(s);
      return l instanceof Promise
        ? l
        : {
            then(o) {
              return Ju(o)(l);
            },
            catch(o) {
              return this;
            },
          };
    } catch (l) {
      return {
        then(o) {
          return this;
        },
        catch(o) {
          return Ju(o)(l);
        },
      };
    }
  },
  Xx = (a, s) => (l, o, c) => {
    let f = {
        storage: Ap(() => localStorage),
        partialize: (V) => V,
        version: 0,
        merge: (V, w) => ({ ...w, ...V }),
        ...s,
      },
      d = !1;
    const m = new Set(),
      p = new Set();
    let g = f.storage;
    if (!g)
      return a(
        (...V) => {
          (console.warn(
            `[zustand persist middleware] Unable to update item '${f.name}', the given storage is currently unavailable.`,
          ),
            l(...V));
        },
        o,
        c,
      );
    const y = () => {
        const V = f.partialize({ ...o() });
        return g.setItem(f.name, { state: V, version: f.version });
      },
      b = c.setState;
    c.setState = (V, w) => {
      (b(V, w), y());
    };
    const S = a(
      (...V) => {
        (l(...V), y());
      },
      o,
      c,
    );
    c.getInitialState = () => S;
    let M;
    const U = () => {
      var V, w;
      if (!g) return;
      ((d = !1),
        m.forEach((Z) => {
          var C;
          return Z((C = o()) != null ? C : S);
        }));
      const k =
        ((w = f.onRehydrateStorage) == null
          ? void 0
          : w.call(f, (V = o()) != null ? V : S)) || void 0;
      return Ju(g.getItem.bind(g))(f.name)
        .then((Z) => {
          if (Z)
            if (typeof Z.version == "number" && Z.version !== f.version) {
              if (f.migrate) {
                const C = f.migrate(Z.state, Z.version);
                return C instanceof Promise ? C.then((q) => [!0, q]) : [!0, C];
              }
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided",
              );
            } else return [!1, Z.state];
          return [!1, void 0];
        })
        .then((Z) => {
          var C;
          const [q, G] = Z;
          if (((M = f.merge(G, (C = o()) != null ? C : S)), l(M, !0), q))
            return y();
        })
        .then(() => {
          (k == null || k(M, void 0),
            (M = o()),
            (d = !0),
            p.forEach((Z) => Z(M)));
        })
        .catch((Z) => {
          k == null || k(void 0, Z);
        });
    };
    return (
      (c.persist = {
        setOptions: (V) => {
          ((f = { ...f, ...V }), V.storage && (g = V.storage));
        },
        clearStorage: () => {
          g == null || g.removeItem(f.name);
        },
        getOptions: () => f,
        rehydrate: () => U(),
        hasHydrated: () => d,
        onHydrate: (V) => (
          m.add(V),
          () => {
            m.delete(V);
          }
        ),
        onFinishHydration: (V) => (
          p.add(V),
          () => {
            p.delete(V);
          }
        ),
      }),
      f.skipHydration || U(),
      M || S
    );
  },
  kx = Xx,
  pt = {
    nodeTypes: {
      city: {
        name: "City",
        color: "#4CAF50",
        icon: "🏰",
        goldGeneration: 100,
        suppliesGeneration: 50,
        manaGeneration: 0,
        defensiveBonus: 1,
        description: "Generates gold and supplies, enables troop recruitment",
      },
      resource: {
        name: "Resource Node",
        color: "#FF9800",
        icon: "⛏️",
        goldGeneration: 50,
        suppliesGeneration: 100,
        manaGeneration: 25,
        defensiveBonus: 0.8,
        description: "Provides valuable resources for your empire",
      },
      fortress: {
        name: "Fortress",
        color: "#9E9E9E",
        icon: "🛡️",
        goldGeneration: 25,
        suppliesGeneration: 25,
        manaGeneration: 0,
        defensiveBonus: 2,
        description: "Defensive stronghold with high garrison value",
      },
      shrine: {
        name: "Shrine",
        color: "#9C27B0",
        icon: "✨",
        goldGeneration: 0,
        suppliesGeneration: 0,
        manaGeneration: 100,
        defensiveBonus: 1.2,
        description: "Ancient site that provides magical power",
      },
      stronghold: {
        name: "Enemy Stronghold",
        color: "#F44336",
        icon: "💀",
        goldGeneration: 150,
        suppliesGeneration: 75,
        manaGeneration: 50,
        defensiveBonus: 2.5,
        description: "Heavily fortified enemy position",
      },
    },
    commanderClasses: {
      knight: {
        name: "Knight",
        icon: "⚔️",
        description: "Heavily armored tank unit with high defense",
        baseHealth: 120,
        baseAttack: 80,
        baseDefense: 100,
        specialAbility: "Shield Wall - Increases army defense by 50%",
        cost: 200,
      },
      mage: {
        name: "Mage",
        icon: "🔮",
        description: "Magical supporter with area-of-effect abilities",
        baseHealth: 80,
        baseAttack: 120,
        baseDefense: 60,
        specialAbility: "Fireball - Deals AOE damage to enemy army",
        cost: 250,
      },
      ranger: {
        name: "Ranger",
        icon: "🏹",
        description: "Scout and skirmisher with mobility bonuses",
        baseHealth: 100,
        baseAttack: 100,
        baseDefense: 80,
        specialAbility: "Stealth - Can scout enemy nodes without detection",
        cost: 180,
      },
      warlord: {
        name: "Warlord",
        icon: "👑",
        description: "Leader that provides army-wide bonuses",
        baseHealth: 110,
        baseAttack: 90,
        baseDefense: 90,
        specialAbility: "Rally - Increases entire army combat effectiveness",
        cost: 300,
      },
    },
    races: {
      human: {
        name: "Human",
        icon: "👤",
        bonus: "Versatile - 10% bonus to all resources",
        color: "#2196F3",
      },
      elf: {
        name: "Elf",
        icon: "🧝",
        bonus: "Magical Affinity - 20% bonus to mana generation",
        color: "#4CAF50",
      },
      orc: {
        name: "Orc",
        icon: "👹",
        bonus: "Brutal Strength - 15% bonus to combat damage",
        color: "#FF5722",
      },
      undead: {
        name: "Undead",
        icon: "💀",
        bonus: "Undying - Commanders revive with 50% health after defeat",
        color: "#9C27B0",
      },
    },
  },
  ag = {
    COMMANDER_CAPACITIES: {
      city: 6,
      fortress: 4,
      stronghold: 5,
      resource: 2,
      shrine: 3,
    },
  },
  ms = (a, s, l, o = "player") => {
    const c = pt.commanderClasses[s];
    return {
      id: a,
      name: `${pt.races[l].name} ${c.name}`,
      class: s,
      race: l,
      level: 1,
      experience: 0,
      health: c.baseHealth,
      maxHealth: c.baseHealth,
      attack: c.baseAttack,
      defense: c.baseDefense,
      assignedNode: null,
      owner: o,
      army: { soldiers: 20, archers: 10, cavalry: 5, mages: 2 },
    };
  },
  Zx = (a, s) => a.gold >= pt.commanderClasses[s].cost,
  Ep = (a) => {
    let s = { gold: 0, supplies: 0, mana: 0 };
    return (
      a
        .filter((l) => l.owner === "player")
        .forEach((l) => {
          const o = pt.nodeTypes[l.type];
          ((s.gold += o.goldGeneration),
            (s.supplies += o.suppliesGeneration),
            (s.mana += o.manaGeneration));
        }),
      s
    );
  },
  ig = (a, s, l) => {
    const o = a.find((f) => f.id === s),
      c = a.find((f) => f.id === l);
    return !o || !c || o.owner !== "player" || c.owner === "player"
      ? !1
      : o.connections.includes(l);
  },
  Mp = (a, s = []) => {
    const l = a.garrison,
      o = bs(s),
      c = l + o.powerLevel;
    return { baseGarrison: l, commanderBonus: o.powerLevel, totalPower: c };
  },
  bs = (a) => {
    let s = 0,
      l = 0,
      o = 0;
    return (
      a.forEach((c) => {
        const f = c.attack + c.defense + c.level * 15;
        switch (((o += f), c.class)) {
          case "knight":
            ((s += c.defense * 1.5 + c.level * 10),
              (l += c.attack * 1.2 + c.level * 8));
            break;
          case "mage":
            ((s += c.defense * 1 + c.level * 6),
              (l += c.attack * 1.8 + c.level * 12));
            break;
          case "ranger":
            ((s += c.defense * 1.1 + c.level * 7),
              (l += c.attack * 1.4 + c.level * 10));
            break;
          case "warlord":
            ((s += c.defense * 1.3 + c.level * 12),
              (l += c.attack * 1.3 + c.level * 12));
            break;
          default:
            ((s += c.defense + c.level * 5), (l += c.attack + c.level * 5));
        }
      }),
      { defenseBonus: s, attackBonus: l, powerLevel: o }
    );
  },
  sg = (a, s, l = [], o = []) => {
    let c = a.garrison + a.starLevel * 20,
      f = s.garrison + s.starLevel * 15;
    const d = bs(l),
      m = bs(o);
    ((c += d.attackBonus), (f += m.defenseBonus), (f *= 1.2));
    const p = c > f,
      g = c / Math.max(f, 1);
    return {
      victory: p,
      attackerLosses: { soldiers: 5, archers: 2, cavalry: 1, mages: 0 },
      defenderLosses: { soldiers: 8, archers: 4, cavalry: 2, mages: 1 },
      nodeConquered: p,
      experienceGained: p ? Math.floor(50 * g) : 25,
    };
  },
  Kx = (a, s) =>
    s.nodeConquered
      ? { ...a, owner: "player", garrison: Math.floor(a.garrison * 0.5) }
      : a,
  Wl = () => [
    {
      id: 1,
      type: "city",
      x: 200,
      y: 300,
      owner: "player",
      starLevel: 1,
      garrison: 100,
      connections: [2, 3],
    },
    {
      id: 2,
      type: "resource",
      x: 350,
      y: 200,
      owner: "neutral",
      starLevel: 1,
      garrison: 50,
      connections: [1, 4, 5],
    },
    {
      id: 3,
      type: "resource",
      x: 350,
      y: 400,
      owner: "neutral",
      starLevel: 1,
      garrison: 50,
      connections: [1, 6],
    },
    {
      id: 4,
      type: "fortress",
      x: 500,
      y: 150,
      owner: "neutral",
      starLevel: 2,
      garrison: 150,
      connections: [2, 7],
    },
    {
      id: 5,
      type: "shrine",
      x: 400,
      y: 300,
      owner: "neutral",
      starLevel: 1,
      garrison: 75,
      connections: [2, 6, 7, 8],
    },
    {
      id: 6,
      type: "resource",
      x: 350,
      y: 500,
      owner: "neutral",
      starLevel: 1,
      garrison: 50,
      connections: [3, 5, 9],
    },
    {
      id: 7,
      type: "city",
      x: 600,
      y: 200,
      owner: "enemy",
      starLevel: 2,
      garrison: 120,
      connections: [4, 5, 8],
    },
    {
      id: 8,
      type: "fortress",
      x: 550,
      y: 350,
      owner: "enemy",
      starLevel: 2,
      garrison: 180,
      connections: [5, 7, 9, 10],
    },
    {
      id: 9,
      type: "resource",
      x: 500,
      y: 500,
      owner: "enemy",
      starLevel: 1,
      garrison: 60,
      connections: [6, 8],
    },
    {
      id: 10,
      type: "stronghold",
      x: 700,
      y: 300,
      owner: "enemy",
      starLevel: 3,
      garrison: 250,
      connections: [8],
    },
  ],
  lg = () => {
    const a = [
      ms(1, "knight", "human", "player"),
      ms(1e3, "knight", "orc", "enemy"),
      ms(1001, "mage", "orc", "enemy"),
    ];
    return (
      (a[0].assignedNode = 1),
      (a[1].assignedNode = 7),
      (a[2].assignedNode = 8),
      {
        turn: 1,
        phase: "player",
        resources: { gold: 500, supplies: 100, mana: 50 },
        commanders: a,
        nodes: Wl(),
        selectedNode: null,
        selectedCommander: null,
        gameOver: !1,
        winner: null,
        battleLog: [
          {
            timestamp: Date.now(),
            type: "info",
            message:
              "Welcome to Ashes of Aeloria! Begin your conquest by recruiting commanders and expanding your territory.",
          },
        ],
      }
    );
  },
  ee = qx()(
    kx(
      (a, s) => ({
        ...lg(),
        selectCommander: (l) => a({ selectedCommander: l }),
        selectNode: (l) => a({ selectedNode: l }),
        addCommander: (l, o) => {
          const c = s();
          if (Zx(c.resources, l)) {
            const f = Math.max(0, ...c.commanders.map((p) => p.id)) + 1,
              d = ms(f, l, o, "player"),
              m = pt.commanderClasses[l].cost;
            return (
              a((p) => ({
                commanders: [...p.commanders, d],
                resources: { ...p.resources, gold: p.resources.gold - m },
                battleLog: [
                  ...p.battleLog,
                  {
                    timestamp: Date.now(),
                    type: "recruitment",
                    message: `Recruited ${d.name} for ${m} gold`,
                  },
                ],
              })),
              !0
            );
          }
          return !1;
        },
        assignCommanderToNode: (l, o) => {
          const c = s(),
            f = c.commanders.find((g) => g.id === l),
            d = c.nodes.find((g) => g.id === o);
          if (!f || !d || d.owner !== "player") return !1;
          const m = ag.COMMANDER_CAPACITIES[d.type];
          return c.commanders.filter((g) => g.assignedNode === o).length >= m
            ? (a((g) => ({
                battleLog: [
                  ...g.battleLog,
                  {
                    timestamp: Date.now(),
                    type: "info",
                    message: `Cannot assign ${f.name}: ${pt.nodeTypes[d.type].name} is at capacity (${m} commanders)`,
                  },
                ],
              })),
              !1)
            : (a((g) => ({
                commanders: g.commanders.map((y) =>
                  y.id === l ? { ...y, assignedNode: o } : y,
                ),
                battleLog: [
                  ...g.battleLog,
                  {
                    timestamp: Date.now(),
                    type: "info",
                    message: `${f.name} assigned to defend the ${pt.nodeTypes[d.type].name}`,
                  },
                ],
              })),
              !0);
        },
        unassignCommander: (l) => {
          const c = s().commanders.find((f) => f.id === l);
          !c ||
            !c.assignedNode ||
            a((f) => ({
              commanders: f.commanders.map((d) =>
                d.id === l ? { ...d, assignedNode: null } : d,
              ),
              battleLog: [
                ...f.battleLog,
                {
                  timestamp: Date.now(),
                  type: "info",
                  message: `${c.name} recalled from duty`,
                },
              ],
            }));
        },
        getNodeCommanderInfo: (l) => {
          const o = s(),
            c = o.nodes.find((m) => m.id === l);
          if (!c) return { current: 0, max: 0, commanders: [] };
          const f = o.commanders.filter((m) => m.assignedNode === l),
            d = ag.COMMANDER_CAPACITIES[c.type];
          return { current: f.length, max: d, commanders: f };
        },
        getUpgradeCost: (l) => {
          const c = s().nodes.find((d) => d.id === l);
          if (!c) return 0;
          const f = {
            city: 1.5,
            fortress: 2,
            stronghold: 2.5,
            resource: 1,
            shrine: 1.8,
          };
          return Math.floor(200 * c.starLevel * f[c.type]);
        },
        canUpgradeNode: (l) => {
          const o = s(),
            c = o.nodes.find((d) => d.id === l);
          if (!c || c.owner !== "player" || c.starLevel >= 5) return !1;
          const f = s().getUpgradeCost(l);
          return o.resources.gold >= f;
        },
        upgradeNode: (l) => {
          const c = s().nodes.find((d) => d.id === l);
          if (!s().canUpgradeNode(l) || !c) return !1;
          const f = s().getUpgradeCost(l);
          return (
            a((d) => ({
              nodes: d.nodes.map((m) =>
                m.id === l
                  ? {
                      ...m,
                      starLevel: m.starLevel + 1,
                      garrison: m.garrison + 25,
                    }
                  : m,
              ),
              resources: { ...d.resources, gold: d.resources.gold - f },
              battleLog: [
                ...d.battleLog,
                {
                  timestamp: Date.now(),
                  type: "info",
                  message: `${pt.nodeTypes[c.type].name} upgraded to ${c.starLevel + 1} stars for ${f} gold!`,
                },
              ],
            })),
            !0
          );
        },
        updateResources: (l) =>
          a((o) => ({ resources: { ...o.resources, ...l } })),
        nextTurn: () => a((l) => ({ turn: l.turn + 1, phase: "player" })),
        endTurn: () => {
          (a({ phase: "enemy" }),
            setTimeout(() => {
              s().processEnemyTurn();
            }, 500));
        },
        processEnemyTurn: () => {
          const l = s(),
            o = l.nodes.filter((y) => y.owner === "enemy");
          let c = { gold: 0, supplies: 0, mana: 0 };
          if (
            (o.forEach((y) => {
              const b = pt.nodeTypes[y.type];
              ((c.gold += b.goldGeneration),
                (c.supplies += b.suppliesGeneration),
                (c.mana += b.manaGeneration));
            }),
            s().addBattleLogEntry(
              "info",
              `Enemy collected ${c.gold} gold, ${c.supplies} supplies, ${c.mana} mana`,
            ),
            l.commanders.filter((y) => y.owner === "enemy").length < 3 &&
              c.gold >= 150)
          ) {
            const y = ["knight", "mage", "ranger", "warlord"],
              b = y[Math.floor(Math.random() * y.length)],
              S = Math.max(0, ...l.commanders.map((U) => U.id)) + 1,
              M = ms(S, b, "orc", "enemy");
            (a((U) => ({ commanders: [...U.commanders, M] })),
              s().addBattleLogEntry(
                "recruitment",
                `Enemy recruited ${M.name}`,
              ));
          }
          l.nodes.filter((y) => y.owner === "player");
          const d = [];
          for (const y of o)
            for (const b of y.connections) {
              const S = l.nodes.find((M) => M.id === b);
              S &&
                (S.owner === "player" || S.owner === "neutral") &&
                d.push({
                  attacker: y,
                  target: S,
                  priority: S.owner === "player" ? 2 : 1,
                });
            }
          d.sort((y, b) => {
            const S = b.priority - y.priority;
            return S !== 0 ? S : b.attacker.garrison - y.attacker.garrison;
          });
          let m = 0;
          const p = Math.min(2, d.length);
          for (let y = 0; y < p; y++) {
            const b = d[y],
              S = l.commanders.filter((V) => V.assignedNode === b.attacker.id),
              M = l.commanders.filter((V) => V.assignedNode === b.target.id);
            (sg(b.attacker, b.target, S, M).victory
              ? (a((V) => ({
                  nodes: V.nodes.map((w) =>
                    w.id === b.target.id
                      ? {
                          ...w,
                          owner: "enemy",
                          garrison: Math.floor(b.attacker.garrison * 0.7),
                        }
                      : w.id === b.attacker.id
                        ? { ...w, garrison: Math.floor(w.garrison * 0.8) }
                        : w,
                  ),
                })),
                s().addBattleLogEntry(
                  "defeat",
                  `Enemy captured ${pt.nodeTypes[b.target.type].name} from ${b.target.owner === "player" ? "player" : "neutral"} forces!`,
                ))
              : (a((V) => ({
                  nodes: V.nodes.map((w) =>
                    w.id === b.target.id
                      ? { ...w, garrison: Math.floor(w.garrison * 0.9) }
                      : w.id === b.attacker.id
                        ? { ...w, garrison: Math.floor(w.garrison * 0.7) }
                        : w,
                  ),
                })),
                s().addBattleLogEntry(
                  "victory",
                  `Player forces successfully defended ${pt.nodeTypes[b.target.type].name} from enemy attack!`,
                )),
              m++);
          }
          (m === 0 &&
            s().addBattleLogEntry(
              "info",
              "Enemy consolidated their forces this turn",
            ),
            a((y) => ({
              nodes: y.nodes.map((b) => {
                if (b.owner === "enemy") {
                  const S = {
                      city: 12,
                      fortress: 8,
                      stronghold: 16,
                      resource: 6,
                      shrine: 4,
                    }[b.type],
                    M = Math.floor(S * b.starLevel),
                    U = 180 + b.starLevel * 40;
                  return { ...b, garrison: Math.min(b.garrison + M, U) };
                }
                return b;
              }),
            })));
          const g = o.filter((y) => y.starLevel < 5);
          if (g.length > 0 && c.gold >= 400) {
            const y = g[0];
            (a((b) => ({
              nodes: b.nodes.map((S) =>
                S.id === y.id
                  ? {
                      ...S,
                      starLevel: S.starLevel + 1,
                      garrison: S.garrison + 30,
                    }
                  : S,
              ),
            })),
              s().addBattleLogEntry(
                "info",
                `Enemy upgraded their ${pt.nodeTypes[y.type].name} to ${y.starLevel + 1} stars`,
              ));
          }
          setTimeout(() => {
            (s().collectResources(), s().nextTurn());
          }, 1e3);
        },
        collectResources: () => {
          const l = s(),
            o = Ep(l.nodes);
          (a((c) => ({
            resources: {
              gold: c.resources.gold + o.gold,
              supplies: c.resources.supplies + o.supplies,
              mana: c.resources.mana + o.mana,
            },
            nodes: c.nodes.map((f) => {
              if (f.owner === "player") {
                const d = {
                    city: 15,
                    fortress: 10,
                    stronghold: 20,
                    resource: 8,
                    shrine: 5,
                  }[f.type],
                  m = Math.floor(d * f.starLevel),
                  p = 200 + f.starLevel * 50;
                return { ...f, garrison: Math.min(f.garrison + m, p) };
              }
              return f;
            }),
          })),
            s().addBattleLogEntry(
              "info",
              `Turn ${l.turn + 1}: Collected ${o.gold} gold, ${o.supplies} supplies, ${o.mana} mana. Garrisons reinforced!`,
            ));
        },
        attackNode: (l) => {
          const o = s(),
            c = o.nodes.find((b) => b.id === o.selectedNode),
            f = o.nodes.find((b) => b.id === l);
          if (!c || !f) {
            s().addBattleLogEntry(
              "defeat",
              "Invalid attack: Could not find nodes",
            );
            return;
          }
          if (!ig(o.nodes, c.id, f.id)) {
            s().addBattleLogEntry(
              "defeat",
              "Invalid attack: Cannot attack this node",
            );
            return;
          }
          const d = o.commanders.filter((b) => b.assignedNode === c.id),
            m = o.commanders.filter((b) => b.assignedNode === f.id),
            p = bs(d),
            g = bs(m),
            y = sg(c, f, d, m);
          if (y.victory) {
            const b = Kx(f, y);
            a((U) => ({
              nodes: U.nodes.map((V) =>
                V.id === l
                  ? b
                  : V.id === c.id
                    ? { ...V, garrison: Math.max(20, V.garrison - 10) }
                    : V,
              ),
            }));
            const S =
              p.attackBonus > 0
                ? ` (Commander bonus: +${Math.floor(p.attackBonus)})`
                : "";
            s().addBattleLogEntry(
              "victory",
              `Successfully captured ${pt.nodeTypes[f.type].name}!${S}`,
            );
            const M = o.commanders.filter(
              (U) => U.assignedNode === c.id && U.owner === "player",
            );
            M.length > 0 &&
              (a((U) => ({
                commanders: U.commanders.map((V) =>
                  M.some((w) => w.id === V.id)
                    ? { ...V, experience: V.experience + y.experienceGained }
                    : V,
                ),
              })),
              s().addBattleLogEntry(
                "info",
                `Commanders gained ${y.experienceGained} experience`,
              ));
          } else {
            a((S) => ({
              nodes: S.nodes.map((M) =>
                M.id === l
                  ? { ...M, garrison: Math.max(10, M.garrison - 5) }
                  : M.id === c.id
                    ? { ...M, garrison: Math.max(10, M.garrison - 15) }
                    : M,
              ),
            }));
            const b =
              g.defenseBonus > 0
                ? ` Enemy commanders provided +${Math.floor(g.defenseBonus)} defense.`
                : "";
            s().addBattleLogEntry(
              "defeat",
              `Attack on ${pt.nodeTypes[f.type].name} failed!${b}`,
            );
          }
        },
        canAttackNode: (l) => {
          const o = s();
          return o.selectedNode === null ? !1 : ig(o.nodes, o.selectedNode, l);
        },
        addBattleLogEntry: (l, o) => {
          a((c) => ({
            battleLog: [
              ...c.battleLog,
              { timestamp: Date.now(), type: l, message: o },
            ],
          }));
        },
        resetGame: () => {
          const l = lg();
          (localStorage.removeItem("ashes-of-aeloria-game-state"),
            a(() => ({
              ...l,
              battleLog: [
                {
                  timestamp: Date.now(),
                  type: "info",
                  message:
                    "Game reset! Welcome to Ashes of Aeloria! Begin your conquest by recruiting commanders and expanding your territory.",
                },
              ],
            })));
        },
        repairMapConnections: () => {
          s();
          const l = Wl();
          a((o) => ({
            nodes: o.nodes.map((c) => {
              const f = l.find((d) => d.id === c.id);
              return f ? { ...c, connections: f.connections } : c;
            }),
            battleLog: [
              ...o.battleLog,
              {
                timestamp: Date.now(),
                type: "info",
                message: "Map connections repaired!",
              },
            ],
          }));
        },
      }),
      {
        name: "ashes-of-aeloria-game-state",
        version: 1,
        storage: Ap(() => localStorage),
        partialize: (a) => ({
          turn: a.turn,
          phase: a.phase,
          resources: a.resources,
          commanders: a.commanders,
          nodes: a.nodes,
          gameOver: a.gameOver,
          winner: a.winner,
          battleLog: a.battleLog.slice(-20),
        }),
        migrate: (a, s) => {
          if (s === 0 && a.nodes && Array.isArray(a.nodes)) {
            const l = Wl();
            a.nodes = a.nodes.map((o) => {
              const c = l.find((f) => f.id === o.id);
              return c
                ? {
                    ...c,
                    owner: o.owner || c.owner,
                    garrison: o.garrison || c.garrison,
                    starLevel: o.starLevel || c.starLevel,
                  }
                : o;
            });
          }
          return a;
        },
        onRehydrateStorage: () => (a, s) => {
          if (!s && a) {
            const l = Wl();
            let o = !1;
            if (a.nodes) {
              for (const c of a.nodes) {
                const f = l.find((d) => d.id === c.id);
                if (
                  f &&
                  JSON.stringify(c.connections) !==
                    JSON.stringify(f.connections)
                ) {
                  o = !0;
                  break;
                }
              }
              o
                ? ((a.nodes = a.nodes.map((c) => {
                    const f = l.find((d) => d.id === c.id);
                    return f ? { ...c, connections: f.connections } : c;
                  })),
                  (a.battleLog = [
                    ...(a.battleLog || []),
                    {
                      timestamp: Date.now(),
                      type: "info",
                      message:
                        "Map connections automatically repaired after loading saved game.",
                    },
                  ]),
                  console.log(
                    "🔧 Auto-repaired map connections after loading from localStorage",
                  ))
                : console.log("✅ Map connections are valid");
            }
          }
        },
      },
    ),
  ),
  Cp = () => {
    const a = ee((f) => f.resources.gold),
      s = ee((f) => f.turn),
      l = ee((f) => f.selectedNode),
      o = ee((f) => f.gameOver),
      c = ee((f) => f.winner);
    return { gold: a, turn: s, selectedNode: l, gameOver: o, winner: c };
  },
  ca = ({
    variant: a = "primary",
    size: s = "md",
    fullWidth: l = !1,
    className: o = "",
    children: c,
    ...f
  }) => {
    const d =
        "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation",
      m = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary:
          "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
        outline:
          "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
        attack: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        recruit:
          "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      },
      p = {
        sm: "px-3 py-2 text-sm min-h-[44px]",
        md: "px-4 py-2.5 text-base min-h-[44px]",
        lg: "px-6 py-3 text-lg min-h-[48px]",
      },
      g = [d, m[a], p[s], l ? "w-full" : "", o].filter(Boolean).join(" ");
    return x.jsx("button", { className: g, ...f, children: c });
  },
  Qx = () => {
    const { turn: a } = Cp(),
      s = ee((g) => g.resetGame),
      l = ee((g) => g.repairMapConnections),
      [o, c] = X.useState(!1),
      f = () => {
        c(!0);
      },
      d = () => {
        l();
      },
      m = () => {
        (s(), c(!1));
      },
      p = () => {
        c(!1);
      };
    return x.jsxs(x.Fragment, {
      children: [
        x.jsxs("header", {
          className:
            "bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm gap-2 sm:gap-0",
          children: [
            x.jsx("h1", {
              className: "text-xl lg:text-2xl font-bold text-blue-600 m-0",
              children: "⚔️ Ashes of Aeloria",
            }),
            x.jsxs("div", {
              className: "flex gap-3 lg:gap-6 items-center",
              children: [
                x.jsxs("span", {
                  className:
                    "font-medium px-3 lg:px-4 py-1.5 lg:py-2 bg-blue-100 text-blue-800 rounded-md text-sm lg:text-base",
                  children: ["Turn: ", a],
                }),
                x.jsx("span", {
                  className:
                    "font-medium px-3 lg:px-4 py-1.5 lg:py-2 bg-blue-100 text-blue-800 rounded-md text-sm lg:text-base",
                  children: "Phase: Player",
                }),
                x.jsx(ca, {
                  variant: "secondary",
                  size: "sm",
                  onClick: d,
                  className: "text-xs lg:text-sm",
                  title: "Fix map connections if they appear broken",
                  children: "🔧 Repair Map",
                }),
                x.jsx(ca, {
                  variant: "secondary",
                  size: "sm",
                  onClick: f,
                  className: "text-xs lg:text-sm",
                  children: "🔄 Reset Game",
                }),
              ],
            }),
          ],
        }),
        o &&
          x.jsx("div", {
            className:
              "fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4",
            children: x.jsxs("div", {
              className:
                "bg-white p-6 lg:p-8 rounded-lg border border-gray-200 text-center w-full max-w-sm shadow-lg",
              children: [
                x.jsx("h2", {
                  className: "text-xl lg:text-2xl mb-4",
                  children: "🔄 Reset Game",
                }),
                x.jsx("p", {
                  className:
                    "mb-6 text-gray-600 leading-normal text-sm lg:text-base",
                  children:
                    "Are you sure you want to reset the game? All progress will be lost and the game will start fresh.",
                }),
                x.jsxs("div", {
                  className: "flex gap-3 justify-center",
                  children: [
                    x.jsx(ca, {
                      variant: "secondary",
                      onClick: p,
                      className: "flex-1",
                      children: "Cancel",
                    }),
                    x.jsx(ca, {
                      variant: "primary",
                      onClick: m,
                      className: "flex-1",
                      children: "Reset",
                    }),
                  ],
                }),
              ],
            }),
          }),
      ],
    });
  },
  Px = () => {
    const a = X.useRef(null),
      s = X.useRef(null),
      [l, o] = X.useState({ width: 800, height: 600 }),
      [c, f] = X.useState(1),
      d = ee((C) => C.nodes);
    ee((C) => C.commanders);
    const m = ee((C) => C.selectedNode),
      p = ee((C) => C.selectNode),
      g = ee((C) => C.getNodeCommanderInfo),
      y = X.useCallback(() => {
        if (s.current) {
          const C = s.current,
            q = C.clientWidth,
            G = C.clientHeight;
          o({ width: q, height: G });
        }
      }, []);
    X.useEffect(
      () => (
        y(),
        window.addEventListener("resize", y),
        () => window.removeEventListener("resize", y)
      ),
      [y],
    );
    const b = (C) =>
        ({ player: "#4CAF50", enemy: "#F44336", neutral: "#9E9E9E" })[C.owner],
      S = X.useCallback(
        (C) => {
          ((C.strokeStyle = "rgba(255, 255, 255, 0.2)"),
            (C.lineWidth = 1),
            d.forEach((q) => {
              q.connections.forEach((G) => {
                const Q = d.find((W) => W.id === G);
                Q &&
                  (C.beginPath(),
                  C.moveTo(q.x, q.y),
                  C.lineTo(Q.x, Q.y),
                  C.stroke());
              });
            }));
        },
        [d],
      ),
      M = X.useCallback(
        (C) => {
          d.forEach((q) => {
            const G = pt.nodeTypes[q.type],
              Q = m === q.id,
              W = g(q.id);
            if (
              ((C.fillStyle = b(q)),
              C.beginPath(),
              C.arc(q.x, q.y, 20, 0, 2 * Math.PI),
              C.fill(),
              Q &&
                ((C.strokeStyle = "#FFD700"),
                (C.lineWidth = 3),
                C.beginPath(),
                C.arc(q.x, q.y, 25, 0, 2 * Math.PI),
                C.stroke()),
              (C.font = "20px Arial"),
              (C.textAlign = "center"),
              (C.textBaseline = "middle"),
              (C.fillStyle = "#FFFFFF"),
              C.fillText(G.icon, q.x, q.y),
              W.current > 0)
            ) {
              ((C.font = "12px Arial"),
                (C.textAlign = "center"),
                (C.textBaseline = "middle"));
              const bt =
                  q.owner === "player"
                    ? "#FFD700"
                    : q.owner === "enemy"
                      ? "#FF4444"
                      : "#CCCCCC",
                Nt = (2 * Math.PI) / Math.max(W.current, 4),
                mt = 30;
              (W.commanders.slice(0, 6).forEach((Ft, Zt) => {
                const ft = Zt * Nt,
                  z = q.x + Math.cos(ft) * mt,
                  B = q.y + Math.sin(ft) * mt;
                let K = "⚔️";
                switch (Ft.class) {
                  case "knight":
                    K = "⚔️";
                    break;
                  case "mage":
                    K = "🔮";
                    break;
                  case "ranger":
                    K = "🏹";
                    break;
                  case "warlord":
                    K = "👑";
                    break;
                }
                ((C.fillStyle =
                  q.owner === "enemy"
                    ? "rgba(255, 0, 0, 0.7)"
                    : "rgba(0, 0, 0, 0.7)"),
                  C.beginPath(),
                  C.arc(z, B, 8, 0, 2 * Math.PI),
                  C.fill(),
                  (C.fillStyle = bt),
                  (C.font = "10px Arial"),
                  C.fillText(K, z, B));
              }),
                W.current > 6 &&
                  ((C.fillStyle =
                    q.owner === "enemy"
                      ? "rgba(255, 100, 100, 0.8)"
                      : "rgba(255, 0, 0, 0.8)"),
                  C.beginPath(),
                  C.arc(q.x + 25, q.y - 25, 8, 0, 2 * Math.PI),
                  C.fill(),
                  (C.fillStyle = "#FFFFFF"),
                  (C.font = "10px Arial"),
                  C.fillText(`+${W.current - 6}`, q.x + 25, q.y - 25)));
            }
            ((C.font = "12px Arial"),
              (C.fillStyle = "#FFD700"),
              (C.textAlign = "center"),
              (C.textBaseline = "middle"));
            const F = "★".repeat(q.starLevel);
            C.fillText(F, q.x, q.y - 35);
            const ot = Mp(q, W.commanders);
            ((C.font = "10px Arial"),
              (C.fillStyle = "#FFFFFF"),
              ot.commanderBonus > 0
                ? ((C.fillStyle = "#90EE90"),
                  C.fillText(`${ot.totalPower}`, q.x, q.y + 35),
                  (C.font = "8px Arial"),
                  (C.fillStyle = "#CCCCCC"),
                  C.fillText(`(${q.garrison})`, q.x, q.y + 45))
                : C.fillText(q.garrison.toString(), q.x, q.y + 35));
          });
        },
        [d, m, g],
      ),
      U = X.useCallback(() => {
        const C = a.current;
        if (!C) return;
        const q = C.getContext("2d");
        if (!q) return;
        ((C.width = l.width),
          (C.height = l.height),
          (q.fillStyle = "#1a1a1a"),
          q.fillRect(0, 0, C.width, C.height));
        const G = 50,
          Q = Math.max(...d.map((ft) => ft.x)) + G,
          W = Math.max(...d.map((ft) => ft.y)) + G,
          F = Math.min(...d.map((ft) => ft.x)) - G,
          ot = Math.min(...d.map((ft) => ft.y)) - G,
          bt = C.width / (Q - F),
          Nt = C.height / (W - ot),
          mt = Math.min(bt, Nt, 1) * c,
          Ft = (C.width - (Q - F) * mt) / 2 - F * mt,
          Zt = (C.height - (W - ot) * mt) / 2 - ot * mt;
        (q.save(),
          q.translate(Ft, Zt),
          q.scale(mt, mt),
          S(q),
          M(q),
          q.restore());
      }, [S, M, l, c, d]),
      V = X.useCallback(
        (C) => {
          const q = a.current;
          if (!q) return;
          const G = q.getBoundingClientRect(),
            Q = C.clientX - G.left,
            W = C.clientY - G.top,
            F = 50,
            ot = Math.max(...d.map((H) => H.x)) + F,
            bt = Math.max(...d.map((H) => H.y)) + F,
            Nt = Math.min(...d.map((H) => H.x)) - F,
            mt = Math.min(...d.map((H) => H.y)) - F,
            Ft = q.width / (ot - Nt),
            Zt = q.height / (bt - mt),
            ft = Math.min(Ft, Zt, 1) * c,
            z = (q.width - (ot - Nt) * ft) / 2 - Nt * ft,
            B = (q.height - (bt - mt) * ft) / 2 - mt * ft,
            K = (Q - z) / ft,
            st = (W - B) / ft,
            A = d.find(
              (H) =>
                Math.sqrt(Math.pow(K - H.x, 2) + Math.pow(st - H.y, 2)) <= 25,
            );
          p(A ? (m === A.id ? null : A.id) : null);
        },
        [d, m, p, c],
      );
    X.useEffect(() => {
      U();
    }, [U]);
    const w = () => f((C) => Math.min(C * 1.2, 3)),
      k = () => f((C) => Math.max(C / 1.2, 0.3)),
      Z = () => f(1);
    return x.jsxs("div", {
      ref: s,
      className:
        "relative w-full h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700",
      children: [
        x.jsx("canvas", {
          ref: a,
          className: "w-full h-full cursor-pointer touch-manipulation",
          onClick: V,
          style: { display: "block" },
        }),
        x.jsxs("div", {
          className:
            "absolute bottom-4 right-4 flex flex-col gap-2 lg:flex-row lg:gap-2",
          children: [
            x.jsx("button", {
              onClick: k,
              className:
                "bg-black bg-opacity-70 text-white p-2 lg:p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-lg lg:text-xl",
              "aria-label": "Zoom out",
              children: "🔍-",
            }),
            x.jsx("button", {
              onClick: Z,
              className:
                "bg-black bg-opacity-70 text-white p-2 lg:p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-sm lg:text-base",
              "aria-label": "Reset zoom",
              children: "⌂",
            }),
            x.jsx("button", {
              onClick: w,
              className:
                "bg-black bg-opacity-70 text-white p-2 lg:p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-lg lg:text-xl",
              "aria-label": "Zoom in",
              children: "🔍+",
            }),
          ],
        }),
        x.jsx("div", {
          className:
            "absolute top-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-lg shadow-lg lg:hidden",
          children: x.jsxs("div", {
            className: "text-xs space-y-1",
            children: [
              x.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  x.jsx("div", {
                    className: "w-3 h-3 bg-green-500 rounded-full",
                  }),
                  x.jsx("span", { children: "Player" }),
                ],
              }),
              x.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  x.jsx("div", {
                    className: "w-3 h-3 bg-red-500 rounded-full",
                  }),
                  x.jsx("span", { children: "Enemy" }),
                ],
              }),
              x.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  x.jsx("div", {
                    className: "w-3 h-3 bg-gray-500 rounded-full",
                  }),
                  x.jsx("span", { children: "Neutral" }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  },
  ui = ({ children: a, className: s = "", title: l }) =>
    x.jsxs("div", {
      className: `bg-white border border-gray-200 rounded-lg shadow-sm ${s}`,
      children: [
        l &&
          x.jsx("div", {
            className: "px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200",
            children: x.jsx("h3", {
              className: "text-base lg:text-lg font-semibold text-gray-800",
              children: l,
            }),
          }),
        x.jsx("div", { className: "p-4 lg:p-6", children: a }),
      ],
    }),
  Jx = ({
    icon: a,
    label: s,
    value: l,
    income: o,
    showIncome: c = !1,
    color: f,
  }) =>
    x.jsxs("div", {
      className:
        "flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg",
      children: [
        x.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            x.jsx("span", { className: "text-lg", children: a }),
            x.jsx("span", {
              className: "text-sm font-medium text-gray-700",
              children: s,
            }),
          ],
        }),
        x.jsxs("div", {
          className: "text-right",
          children: [
            x.jsx("div", {
              className: `text-lg font-bold ${f}`,
              children: l.toLocaleString(),
            }),
            c &&
              o !== void 0 &&
              o > 0 &&
              x.jsxs("div", {
                className: "text-xs text-gray-500",
                children: ["+", o, "/turn"],
              }),
          ],
        }),
      ],
    }),
  Fx = ({ resources: a, income: s, showIncome: l = !1, className: o = "" }) => {
    const c = [
      {
        key: "gold",
        icon: "💰",
        label: "Gold",
        value: a.gold,
        income: s == null ? void 0 : s.gold,
        color: "text-yellow-600",
      },
      {
        key: "supplies",
        icon: "📦",
        label: "Supplies",
        value: a.supplies,
        income: s == null ? void 0 : s.supplies,
        color: "text-green-600",
      },
      {
        key: "mana",
        icon: "✨",
        label: "Mana",
        value: a.mana,
        income: s == null ? void 0 : s.mana,
        color: "text-purple-600",
      },
    ];
    return x.jsxs(ui, {
      className: `p-4 ${o}`,
      children: [
        x.jsx("h3", {
          className: "text-lg font-bold mb-3 text-gray-800",
          children: "Resources",
        }),
        x.jsx("div", {
          className: "space-y-2",
          children: c.map((f) =>
            x.jsx(
              Jx,
              {
                icon: f.icon,
                label: f.label,
                value: f.value,
                income: f.income,
                showIncome: l,
                color: f.color,
              },
              f.key,
            ),
          ),
        }),
      ],
    });
  },
  $x = { MIN_TOUCH_TARGET: 44 },
  ra = {
    INSUFFICIENT_RESOURCES: "Insufficient resources for this action",
    NO_NODE_SELECTED: "Please select a node first",
    INVALID_ATTACK_TARGET: "Cannot attack this target",
    NODE_AT_CAPACITY: "Node is at maximum commander capacity",
  },
  Ql = {
    COMMANDER_RECRUITED: "Commander recruited successfully",
    NODE_UPGRADED: "Node upgraded successfully",
    COMMANDER_ASSIGNED: "Commander assigned to node",
    TURN_COMPLETED: "Turn completed",
  },
  Wx = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white border-transparent focus:ring-blue-500",
    secondary:
      "bg-gray-600 hover:bg-gray-700 text-white border-transparent focus:ring-gray-500",
    success:
      "bg-green-600 hover:bg-green-700 text-white border-transparent focus:ring-green-500",
    danger:
      "bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-red-500",
    warning:
      "bg-yellow-600 hover:bg-yellow-700 text-white border-transparent focus:ring-yellow-500",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 border-gray-300 focus:ring-gray-500",
  },
  Ix = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  },
  Ue = X.forwardRef(
    (
      {
        variant: a = "primary",
        size: s = "md",
        fullWidth: l = !1,
        loading: o = !1,
        leftIcon: c,
        rightIcon: f,
        disabled: d,
        className: m = "",
        children: p,
        ...g
      },
      y,
    ) => {
      const b =
          "inline-flex items-center justify-center border font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        S = Wx[a],
        M = Ix[s],
        V = [b, S, M, l ? "w-full" : "", m].filter(Boolean).join(" "),
        w = d || o;
      return x.jsxs("button", {
        ref: y,
        className: V,
        disabled: w,
        style: { minHeight: `${$x.MIN_TOUCH_TARGET}px` },
        ...g,
        children: [
          c && !o && x.jsx("span", { className: "mr-2 -ml-1", children: c }),
          o &&
            x.jsx("span", {
              className: "mr-2 -ml-1",
              children: x.jsxs("svg", {
                className: "animate-spin h-4 w-4",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                  x.jsx("circle", {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4",
                  }),
                  x.jsx("path", {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                  }),
                ],
              }),
            }),
          x.jsx("span", { children: p }),
          f && !o && x.jsx("span", { className: "ml-2 -mr-1", children: f }),
        ],
      });
    },
  );
Ue.displayName = "Button";
const tb = {
    player: {
      label: "Your Turn",
      color: "text-green-600 bg-green-50 border-green-200",
      icon: "👑",
    },
    enemy: {
      label: "Enemy Turn",
      color: "text-red-600 bg-red-50 border-red-200",
      icon: "⚔️",
    },
    upkeep: {
      label: "Upkeep Phase",
      color: "text-blue-600 bg-blue-50 border-blue-200",
      icon: "⚙️",
    },
  },
  eb = ({
    turn: a,
    phase: s,
    onEndTurn: l,
    canEndTurn: o = !0,
    className: c = "",
  }) => {
    const f = tb[s];
    return x.jsxs(ui, {
      className: `p-4 ${c}`,
      children: [
        x.jsxs("div", {
          className: "flex items-center justify-between mb-4",
          children: [
            x.jsx("h3", {
              className: "text-lg font-bold text-gray-800",
              children: "Game Status",
            }),
            x.jsxs("div", {
              className: "text-sm text-gray-600",
              children: ["Turn ", a],
            }),
          ],
        }),
        x.jsxs("div", {
          className: `
        flex items-center justify-center p-3 rounded-lg border mb-4
        ${f.color}
      `,
          children: [
            x.jsx("span", { className: "text-lg mr-2", children: f.icon }),
            x.jsx("span", { className: "font-semibold", children: f.label }),
          ],
        }),
        s === "player" &&
          x.jsx(Ue, {
            variant: "primary",
            fullWidth: !0,
            onClick: l,
            disabled: !o,
            rightIcon: "⏭️",
            children: "End Turn",
          }),
        s === "enemy" &&
          x.jsx("div", {
            className: "text-center text-sm text-gray-600",
            children: "Enemy is making their moves...",
          }),
        s === "upkeep" &&
          x.jsx("div", {
            className: "text-center text-sm text-gray-600",
            children: "Processing turn end events...",
          }),
      ],
    });
  },
  or = () => {
    const {
        selectedNode: a,
        selectedCommander: s,
        nodes: l,
        commanders: o,
        resources: c,
        phase: f,
        addCommander: d,
        assignCommanderToNode: m,
        unassignCommander: p,
        attackNode: g,
        upgradeNode: y,
        endTurn: b,
        resetGame: S,
        selectNode: M,
        selectCommander: U,
        canAttackNode: V,
        canUpgradeNode: w,
        getUpgradeCost: k,
        getNodeCommanderInfo: Z,
      } = ee(),
      C = X.useCallback(
        (B, K) => {
          const st = d(B, K);
          return {
            success: st,
            message: st ? Ql.COMMANDER_RECRUITED : ra.INSUFFICIENT_RESOURCES,
          };
        },
        [d],
      ),
      q = X.useCallback(
        (B, K) => {
          const st = m(B, K);
          return {
            success: st,
            message: st ? Ql.COMMANDER_ASSIGNED : ra.NODE_AT_CAPACITY,
          };
        },
        [m],
      ),
      G = X.useCallback(
        (B) => {
          p(B);
        },
        [p],
      ),
      Q = X.useCallback(
        (B) => {
          M(B);
        },
        [M],
      ),
      W = X.useCallback(
        (B) => {
          U(B);
        },
        [U],
      ),
      F = X.useCallback(
        (B) =>
          a === null
            ? { success: !1, message: ra.NO_NODE_SELECTED }
            : V(B)
              ? (g(B), { success: !0, message: "Attack initiated!" })
              : { success: !1, message: ra.INVALID_ATTACK_TARGET },
        [a, V, g],
      ),
      ot = X.useCallback(() => {
        if (a === null) return { success: !1, message: ra.NO_NODE_SELECTED };
        const B = k(a);
        if (!w(a))
          return { success: !1, message: ra.INSUFFICIENT_RESOURCES, cost: B };
        const st = y(a);
        return {
          success: st,
          message: st ? Ql.NODE_UPGRADED : ra.INSUFFICIENT_RESOURCES,
          cost: B,
        };
      }, [a, k, w, y]),
      bt = X.useCallback(
        () => (b(), { success: !0, message: Ql.TURN_COMPLETED }),
        [b],
      ),
      Nt = X.useCallback(() => {
        S();
      }, [S]),
      mt = X.useCallback(() => {
        if (a === null) return null;
        const B = l.find((A) => A.id === a);
        if (!B) return null;
        const K = Z(a),
          st = { canUpgrade: w(a), cost: k(a) };
        return {
          node: B,
          commanderInfo: K,
          upgradeInfo: st,
          attackableNodes: ft(B),
        };
      }, [a, l, Z, w, k]),
      Ft = X.useCallback(
        () => (s === null ? null : o.find((B) => B.id === s) || null),
        [s, o],
      ),
      Zt = X.useCallback(() => o.filter((B) => B.assignedNode === null), [o]),
      ft = X.useCallback(
        (B) =>
          !B || B.owner !== "player"
            ? []
            : B.connections
                .map((K) => l.find((st) => st.id === K))
                .filter((K) => K && K.owner !== "player"),
        [l],
      ),
      z = X.useCallback(() => f === "player", [f]);
    return {
      selectedNode: a,
      selectedCommander: s,
      resources: c,
      phase: f,
      canPerformActions: z(),
      recruitCommander: C,
      assignCommander: q,
      unassignCommanderAction: G,
      selectNodeAction: Q,
      selectCommanderAction: W,
      initiateAttack: F,
      upgradeSelectedNode: ot,
      completeTurn: bt,
      restartGame: Nt,
      getSelectedNodeInfo: mt,
      getSelectedCommanderInfo: Ft,
      getAvailableCommanders: Zt,
      canAttackNode: V,
      canUpgradeNode: w,
    };
  },
  nb = ({ onRecruitClick: a, onHelpClick: s, className: l = "" }) => {
    const {
        resources: o,
        phase: c,
        completeTurn: f,
        canPerformActions: d,
      } = or(),
      { turn: m, nodes: p } = ee(),
      g = Ep(p);
    return x.jsxs("div", {
      className: `space-y-4 ${l}`,
      children: [
        x.jsx(Fx, { resources: o, income: g, showIncome: !0 }),
        x.jsx(eb, { turn: m, phase: c, onEndTurn: f, canEndTurn: d }),
        x.jsxs("div", {
          className: "space-y-2",
          children: [
            x.jsx(Ue, {
              variant: "primary",
              fullWidth: !0,
              onClick: a,
              leftIcon: "⚔️",
              disabled: !d,
              children: "Recruit Commander",
            }),
            x.jsx(Ue, {
              variant: "secondary",
              fullWidth: !0,
              onClick: s,
              leftIcon: "❓",
              children: "Help & Guide",
            }),
          ],
        }),
      ],
    });
  },
  ei = ({ label: a, value: s, icon: l, color: o = "text-gray-900" }) =>
    x.jsxs("div", {
      className: "flex justify-between items-center py-1",
      children: [
        x.jsxs("span", {
          className: "text-sm text-gray-600 flex items-center gap-1",
          children: [l && x.jsx("span", { children: l }), a, ":"],
        }),
        x.jsx("span", { className: `text-sm font-medium ${o}`, children: s }),
      ],
    }),
  ab = ({ owner: a }) => {
    const s =
      {
        player: "bg-green-100 text-green-800",
        enemy: "bg-red-100 text-red-800",
        neutral: "bg-gray-100 text-gray-800",
      }[a] || "bg-gray-100 text-gray-800";
    return x.jsx("span", {
      className: `px-2 py-1 rounded-full text-xs font-medium ${s}`,
      children: a.charAt(0).toUpperCase() + a.slice(1),
    });
  },
  ib = ({
    node: a,
    canUpgrade: s = !1,
    upgradeCost: l,
    onUpgrade: o,
    onAttack: c,
    attackableNodes: f = [],
    commanderInfo: d,
    className: m = "",
  }) => {
    const p = pt.nodeTypes[a.type],
      g = d
        ? Mp(a, d.commanders)
        : {
            baseGarrison: a.garrison,
            commanderBonus: 0,
            totalPower: a.garrison,
          };
    return x.jsxs(ui, {
      className: `p-4 ${m}`,
      children: [
        x.jsx("h3", {
          className: "text-lg font-bold mb-4 text-gray-800",
          children: "Node Information",
        }),
        x.jsxs("div", {
          className: "flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4",
          children: [
            x.jsx("span", { className: "text-2xl", children: p.icon }),
            x.jsxs("div", {
              className: "flex-1",
              children: [
                x.jsx("div", {
                  className: "font-semibold text-gray-800",
                  children: p.name,
                }),
                x.jsx("div", {
                  className: "text-xs text-gray-600",
                  children: p.description,
                }),
              ],
            }),
            x.jsx(ab, { owner: a.owner }),
          ],
        }),
        x.jsxs("div", {
          className: "space-y-1 mb-4",
          children: [
            x.jsx(ei, { label: "Star Level", value: a.starLevel, icon: "⭐" }),
            g.commanderBonus > 0
              ? x.jsxs("div", {
                  className: "flex justify-between items-center py-1",
                  children: [
                    x.jsxs("span", {
                      className:
                        "text-sm text-gray-600 flex items-center gap-1",
                      children: [
                        x.jsx("span", { children: "🛡️" }),
                        "Garrison:",
                      ],
                    }),
                    x.jsxs("div", {
                      className: "text-sm",
                      children: [
                        x.jsx("span", {
                          className: "font-medium text-gray-900",
                          children: g.totalPower,
                        }),
                        x.jsxs("span", {
                          className: "text-xs text-gray-500 ml-1",
                          children: [
                            "(",
                            g.baseGarrison,
                            " + ",
                            g.commanderBonus,
                            ")",
                          ],
                        }),
                      ],
                    }),
                  ],
                })
              : x.jsx(ei, { label: "Garrison", value: a.garrison, icon: "🛡️" }),
            x.jsx(ei, {
              label: "Gold/Turn",
              value: p.goldGeneration,
              icon: "💰",
              color: "text-yellow-600",
            }),
            x.jsx(ei, {
              label: "Supplies/Turn",
              value: p.suppliesGeneration,
              icon: "📦",
              color: "text-green-600",
            }),
            x.jsx(ei, {
              label: "Mana/Turn",
              value: p.manaGeneration,
              icon: "✨",
              color: "text-purple-600",
            }),
          ],
        }),
        d &&
          x.jsxs("div", {
            className: "mb-4",
            children: [
              x.jsx(ei, {
                label: "Commanders",
                value: `${d.current}/${d.max}`,
                icon: "👑",
              }),
              g.commanderBonus > 0 &&
                x.jsxs("div", {
                  className: "text-xs text-blue-600 mt-1 ml-5",
                  children: ["Power Bonus: +", g.commanderBonus],
                }),
            ],
          }),
        a.owner === "player" &&
          x.jsxs("div", {
            className: "space-y-2",
            children: [
              s &&
                o &&
                x.jsxs("div", {
                  children: [
                    x.jsx(Ue, {
                      variant: "success",
                      fullWidth: !0,
                      onClick: o,
                      leftIcon: "⬆️",
                      children: "Upgrade Node",
                    }),
                    l &&
                      x.jsxs("div", {
                        className: "text-xs text-gray-600 mt-1 text-center",
                        children: ["Cost: ", l, "💰"],
                      }),
                  ],
                }),
              f.length > 0 &&
                c &&
                x.jsxs("div", {
                  children: [
                    x.jsx("div", {
                      className: "text-sm font-medium text-gray-700 mb-2",
                      children: "Attack Options:",
                    }),
                    x.jsx("div", {
                      className: "space-y-1",
                      children: f.map((y) =>
                        x.jsxs(
                          Ue,
                          {
                            variant: "danger",
                            size: "sm",
                            fullWidth: !0,
                            onClick: () => c(y.id),
                            leftIcon: "⚔️",
                            children: ["Attack ", pt.nodeTypes[y.type].name],
                          },
                          y.id,
                        ),
                      ),
                    }),
                  ],
                }),
            ],
          }),
        a.owner !== "player" &&
          x.jsx("div", {
            className: "text-center text-sm text-gray-600 italic",
            children:
              a.owner === "enemy"
                ? "Enemy controlled territory"
                : "Neutral territory",
          }),
      ],
    });
  },
  fa = ({ label: a, value: s, icon: l, color: o = "text-gray-900" }) =>
    x.jsxs("div", {
      className: "flex justify-between items-center py-1",
      children: [
        x.jsxs("span", {
          className: "text-sm text-gray-600 flex items-center gap-1",
          children: [l && x.jsx("span", { children: l }), a, ":"],
        }),
        x.jsx("span", { className: `text-sm font-medium ${o}`, children: s }),
      ],
    }),
  sb = ({ army: a }) =>
    x.jsxs("div", {
      className: "space-y-1",
      children: [
        x.jsx("div", {
          className: "text-sm font-medium text-gray-700 mb-2",
          children: "Army Composition:",
        }),
        x.jsx(fa, { label: "Soldiers", value: a.soldiers, icon: "⚔️" }),
        x.jsx(fa, { label: "Archers", value: a.archers, icon: "🏹" }),
        x.jsx(fa, { label: "Cavalry", value: a.cavalry, icon: "🐎" }),
        x.jsx(fa, { label: "Mages", value: a.mages, icon: "🔮" }),
        x.jsxs("div", {
          className: "text-xs text-gray-500 mt-2",
          children: [
            "Total: ",
            a.soldiers + a.archers + a.cavalry + a.mages,
            " units",
          ],
        }),
      ],
    }),
  lb = ({
    commander: a,
    canPerformActions: s = !0,
    onAssign: l,
    onUnassign: o,
    availableNodes: c = [],
    className: f = "",
  }) => {
    const d = pt.commanderClasses[a.class],
      m = pt.races[a.race],
      p = a.assignedNode !== null,
      g = (a.health / a.maxHealth) * 100;
    return x.jsxs(ui, {
      className: `p-4 ${f}`,
      children: [
        x.jsx("h3", {
          className: "text-lg font-bold mb-4 text-gray-800",
          children: "Commander Information",
        }),
        x.jsxs("div", {
          className: "flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4",
          children: [
            x.jsx("div", { className: "text-2xl", children: d.icon }),
            x.jsxs("div", {
              className: "flex-1",
              children: [
                x.jsx("div", {
                  className: "font-semibold text-gray-800",
                  children: a.name,
                }),
                x.jsxs("div", {
                  className: "text-xs text-gray-600",
                  children: ["Level ", a.level, " ", m.name, " ", d.name],
                }),
              ],
            }),
            x.jsx("div", {
              className: "text-right",
              children: x.jsx("div", {
                className: `text-xs px-2 py-1 rounded ${p ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`,
                children: p ? "Assigned" : "Available",
              }),
            }),
          ],
        }),
        x.jsxs("div", {
          className: "mb-4",
          children: [
            x.jsxs("div", {
              className: "flex justify-between text-sm mb-1",
              children: [
                x.jsx("span", {
                  className: "text-gray-600",
                  children: "Health",
                }),
                x.jsxs("span", {
                  className: "font-medium",
                  children: [a.health, "/", a.maxHealth],
                }),
              ],
            }),
            x.jsx("div", {
              className: "w-full bg-gray-200 rounded-full h-2",
              children: x.jsx("div", {
                className: `h-2 rounded-full transition-all duration-300 ${g > 60 ? "bg-green-500" : g > 30 ? "bg-yellow-500" : "bg-red-500"}`,
                style: { width: `${g}%` },
              }),
            }),
          ],
        }),
        x.jsxs("div", {
          className: "space-y-1 mb-4",
          children: [
            x.jsx(fa, {
              label: "Attack",
              value: a.attack,
              icon: "⚔️",
              color: "text-red-600",
            }),
            x.jsx(fa, {
              label: "Defense",
              value: a.defense,
              icon: "🛡️",
              color: "text-blue-600",
            }),
            x.jsx(fa, {
              label: "Experience",
              value: a.experience,
              icon: "⭐",
              color: "text-yellow-600",
            }),
          ],
        }),
        x.jsx("div", {
          className: "mb-4",
          children: x.jsx(sb, { army: a.army }),
        }),
        x.jsxs("div", {
          className:
            "mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200",
          children: [
            x.jsx("div", {
              className: "text-sm font-medium text-purple-800 mb-1",
              children: "Special Ability",
            }),
            x.jsx("div", {
              className: "text-xs text-purple-600",
              children: d.specialAbility,
            }),
          ],
        }),
        p
          ? x.jsxs("div", {
              className: "space-y-2",
              children: [
                x.jsxs("div", {
                  className: "text-sm text-gray-600",
                  children: ["Assigned to Node #", a.assignedNode],
                }),
                s &&
                  o &&
                  x.jsx(Ue, {
                    variant: "secondary",
                    size: "sm",
                    fullWidth: !0,
                    onClick: o,
                    leftIcon: "↩️",
                    children: "Unassign Commander",
                  }),
              ],
            })
          : x.jsxs("div", {
              className: "space-y-2",
              children: [
                x.jsx("div", {
                  className: "text-sm text-gray-600 mb-2",
                  children: "Commander is available for assignment",
                }),
                s &&
                  c.length > 0 &&
                  l &&
                  x.jsx("div", {
                    className: "space-y-1",
                    children: c.map((y) =>
                      x.jsxs(
                        Ue,
                        {
                          variant: "primary",
                          size: "sm",
                          fullWidth: !0,
                          onClick: () => l(y.id),
                          leftIcon: "📍",
                          children: ["Assign to ", y.name || `Node ${y.id}`],
                        },
                        y.id,
                      ),
                    ),
                  }),
              ],
            }),
      ],
    });
  },
  Np = () => {
    const [a, s] = X.useState([]),
      l = X.useCallback((g, y, b = 3e3) => {
        const S = Math.random().toString(36).substr(2, 9),
          M = { id: S, type: g, message: y, duration: b };
        return (
          s((U) => [...U, M]),
          b > 0 &&
            setTimeout(() => {
              o(S);
            }, b),
          S
        );
      }, []),
      o = X.useCallback((g) => {
        s((y) => y.filter((b) => b.id !== g));
      }, []),
      c = X.useCallback(() => {
        s([]);
      }, []),
      f = X.useCallback((g, y) => l("success", g, y), [l]),
      d = X.useCallback((g, y) => l("error", g, y), [l]),
      m = X.useCallback((g, y) => l("warning", g, y), [l]),
      p = X.useCallback((g, y) => l("info", g, y), [l]);
    return {
      notifications: a,
      addNotification: l,
      removeNotification: o,
      clearAllNotifications: c,
      showSuccess: f,
      showError: d,
      showWarning: m,
      showInfo: p,
    };
  },
  Dp = X.createContext(void 0),
  rb = () => {
    const a = X.useContext(Dp);
    if (!a)
      throw new Error("useGameContext must be used within a GameProvider");
    return a;
  },
  ob = ({ children: a }) => {
    const {
        notifications: s,
        showSuccess: l,
        showError: o,
        showWarning: c,
        showInfo: f,
        removeNotification: d,
        clearAllNotifications: m,
      } = Np(),
      p = {
        notifications: s,
        showSuccess: l,
        showError: o,
        showWarning: c,
        showInfo: f,
        removeNotification: d,
        clearAllNotifications: m,
      };
    return x.jsx(Dp.Provider, { value: p, children: a });
  },
  ub = () => {
    const {
        getSelectedNodeInfo: a,
        getSelectedCommanderInfo: s,
        upgradeSelectedNode: l,
        initiateAttack: o,
        canPerformActions: c,
      } = or(),
      { showSuccess: f, showError: d } = rb(),
      m = a(),
      p = s(),
      g = async () => {
        if (!c) {
          d("Cannot perform actions during enemy turn");
          return;
        }
        const b = l();
        b.success ? f(b.message) : d(b.message);
      },
      y = async (b) => {
        if (!c) {
          d("Cannot perform actions during enemy turn");
          return;
        }
        const S = o(b);
        S.success ? f(S.message) : d(S.message);
      };
    return !m && !p
      ? x.jsxs(ui, {
          className: "p-4",
          children: [
            x.jsx("h3", {
              className: "text-lg font-bold mb-4 text-gray-800",
              children: "Information",
            }),
            x.jsxs("div", {
              className: "text-center py-8",
              children: [
                x.jsx("div", { className: "text-4xl mb-4", children: "🎯" }),
                x.jsx("p", {
                  className: "text-gray-600 text-sm",
                  children:
                    "Select a node or commander to view detailed information and available actions.",
                }),
              ],
            }),
          ],
        })
      : x.jsxs("div", {
          className: "space-y-4",
          children: [
            m &&
              x.jsx(ib, {
                node: m.node,
                canUpgrade: m.upgradeInfo.canUpgrade,
                upgradeCost: m.upgradeInfo.cost,
                onUpgrade: g,
                onAttack: y,
                attackableNodes: m.attackableNodes,
                commanderInfo: m.commanderInfo,
              }),
            p && x.jsx(lb, { commander: p, canPerformActions: c }),
          ],
        });
  },
  cb = () => {
    const [a, s] = X.useState("player"),
      {
        selectCommanderAction: l,
        assignCommander: o,
        unassignCommanderAction: c,
        canPerformActions: f,
      } = or(),
      { commanders: d, selectedCommander: m, nodes: p } = ee(),
      g = d.filter((w) =>
        a === "player" ? w.owner === "player" : w.owner === "enemy",
      ),
      y = (w) => {
        l(m === w ? null : w);
      },
      b = (w, k) => {
        f && o(w, k);
      },
      S = (w) => {
        f && c(w);
      },
      M = () => p.filter((w) => w.owner === "player"),
      U = (w) =>
        w.assignedNode ? p.find((k) => k.id === w.assignedNode) : null,
      V = (w) => {
        const k = m === w.id,
          Z = U(w),
          C = pt.commanderClasses[w.class],
          q = pt.races[w.race],
          G = M();
        return x.jsxs(
          "div",
          {
            className: `p-3 border rounded-lg cursor-pointer transition-all duration-200 ${k ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`,
            onClick: () => y(w.id),
            children: [
              x.jsxs("div", {
                className: "flex items-center gap-2 mb-2",
                children: [
                  x.jsx("span", { className: "text-lg", children: C.icon }),
                  x.jsxs("div", {
                    className: "flex-1 min-w-0",
                    children: [
                      x.jsx("div", {
                        className: "text-sm font-medium text-gray-900 truncate",
                        children: w.name,
                      }),
                      x.jsxs("div", {
                        className: "text-xs text-gray-500",
                        children: [
                          "Level ",
                          w.level,
                          " • ",
                          q.name,
                          " ",
                          C.name,
                        ],
                      }),
                    ],
                  }),
                  x.jsx("div", {
                    className: `text-xs px-2 py-1 rounded ${Z ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`,
                    children: Z ? "Assigned" : "Available",
                  }),
                ],
              }),
              x.jsxs("div", {
                className: "mb-2",
                children: [
                  x.jsxs("div", {
                    className:
                      "flex justify-between text-xs text-gray-600 mb-1",
                    children: [
                      x.jsx("span", { children: "Health" }),
                      x.jsxs("span", {
                        children: [w.health, "/", w.maxHealth],
                      }),
                    ],
                  }),
                  x.jsx("div", {
                    className: "w-full bg-gray-200 rounded-full h-1.5",
                    children: x.jsx("div", {
                      className:
                        "bg-green-500 h-1.5 rounded-full transition-all duration-300",
                      style: { width: `${(w.health / w.maxHealth) * 100}%` },
                    }),
                  }),
                ],
              }),
              Z &&
                x.jsxs("div", {
                  className: "text-xs text-gray-600 mb-2",
                  children: ["Assigned to ", pt.nodeTypes[Z.type].name],
                }),
              a === "player" &&
                f &&
                x.jsx("div", {
                  className: "space-y-1",
                  children: Z
                    ? x.jsx(Ue, {
                        variant: "secondary",
                        size: "xs",
                        fullWidth: !0,
                        onClick: (Q) => {
                          (Q.stopPropagation(), S(w.id));
                        },
                        children: "Unassign",
                      })
                    : G.length > 0
                      ? x.jsxs("div", {
                          className: "space-y-1",
                          children: [
                            G.slice(0, 2).map((Q) =>
                              x.jsxs(
                                Ue,
                                {
                                  variant: "primary",
                                  size: "xs",
                                  fullWidth: !0,
                                  onClick: (W) => {
                                    (W.stopPropagation(), b(w.id, Q.id));
                                  },
                                  children: ["→ ", pt.nodeTypes[Q.type].name],
                                },
                                Q.id,
                              ),
                            ),
                            G.length > 2 &&
                              x.jsxs("div", {
                                className: "text-xs text-gray-500 text-center",
                                children: ["+", G.length - 2, " more nodes"],
                              }),
                          ],
                        })
                      : x.jsx("div", {
                          className: "text-xs text-gray-500 text-center",
                          children: "No available nodes",
                        }),
                }),
            ],
          },
          w.id,
        );
      };
    return x.jsxs(ui, {
      className: "p-4",
      children: [
        x.jsxs("div", {
          className: "flex items-center justify-between mb-4",
          children: [
            x.jsx("h3", {
              className: "text-lg font-bold text-gray-800",
              children: "Commanders",
            }),
            x.jsxs("div", {
              className: "text-sm text-gray-600",
              children: [g.length, " ", a],
            }),
          ],
        }),
        x.jsxs("div", {
          className: "flex mb-4 bg-gray-100 rounded-lg p-1",
          children: [
            x.jsx("button", {
              onClick: () => s("player"),
              className: `flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${a === "player" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`,
              children: "Your Commanders",
            }),
            x.jsx("button", {
              onClick: () => s("enemy"),
              className: `flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${a === "enemy" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`,
              children: "Enemy Forces",
            }),
          ],
        }),
        x.jsx("div", {
          className: "space-y-2 max-h-96 overflow-y-auto",
          children:
            g.length > 0
              ? g.map(V)
              : x.jsxs("div", {
                  className: "text-center py-6 text-gray-500",
                  children: [
                    x.jsx("div", {
                      className: "text-3xl mb-2",
                      children: a === "player" ? "👑" : "⚔️",
                    }),
                    x.jsx("div", {
                      className: "text-sm",
                      children:
                        a === "player"
                          ? "No commanders recruited yet. Recruit your first commander to begin your conquest!"
                          : "No enemy commanders visible. They may be planning their next move...",
                    }),
                  ],
                }),
        }),
      ],
    });
  },
  fb = ({ className: a = "" }) =>
    x.jsxs("div", {
      className: `space-y-4 h-full overflow-y-auto ${a}`,
      children: [x.jsx(ub, {}), x.jsx(cb, {})],
    }),
  yc = X.createContext({});
function vc(a) {
  const s = X.useRef(null);
  return (s.current === null && (s.current = a()), s.current);
}
const xc = typeof window < "u",
  Rp = xc ? X.useLayoutEffect : X.useEffect,
  ur = X.createContext(null);
function bc(a, s) {
  a.indexOf(s) === -1 && a.push(s);
}
function Sc(a, s) {
  const l = a.indexOf(s);
  l > -1 && a.splice(l, 1);
}
const dn = (a, s, l) => (l > s ? s : l < a ? a : l);
let Tc = () => {};
const hn = {},
  jp = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a);
function Op(a) {
  return typeof a == "object" && a !== null;
}
const wp = (a) => /^0[^.\s]+$/u.test(a);
function Ac(a) {
  let s;
  return () => (s === void 0 && (s = a()), s);
}
const _e = (a) => a,
  db = (a, s) => (l) => s(a(l)),
  Ds = (...a) => a.reduce(db),
  Ss = (a, s, l) => {
    const o = s - a;
    return o === 0 ? 1 : (l - a) / o;
  };
class Ec {
  constructor() {
    this.subscriptions = [];
  }
  add(s) {
    return (bc(this.subscriptions, s), () => Sc(this.subscriptions, s));
  }
  notify(s, l, o) {
    const c = this.subscriptions.length;
    if (c)
      if (c === 1) this.subscriptions[0](s, l, o);
      else
        for (let f = 0; f < c; f++) {
          const d = this.subscriptions[f];
          d && d(s, l, o);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Qe = (a) => a * 1e3,
  Pe = (a) => a / 1e3;
function Vp(a, s) {
  return s ? a * (1e3 / s) : 0;
}
const zp = (a, s, l) =>
    (((1 - 3 * l + 3 * s) * a + (3 * l - 6 * s)) * a + 3 * s) * a,
  hb = 1e-7,
  mb = 12;
function gb(a, s, l, o, c) {
  let f,
    d,
    m = 0;
  do ((d = s + (l - s) / 2), (f = zp(d, o, c) - a), f > 0 ? (l = d) : (s = d));
  while (Math.abs(f) > hb && ++m < mb);
  return d;
}
function Rs(a, s, l, o) {
  if (a === s && l === o) return _e;
  const c = (f) => gb(f, 0, 1, a, l);
  return (f) => (f === 0 || f === 1 ? f : zp(c(f), s, o));
}
const _p = (a) => (s) => (s <= 0.5 ? a(2 * s) / 2 : (2 - a(2 * (1 - s))) / 2),
  Up = (a) => (s) => 1 - a(1 - s),
  Bp = Rs(0.33, 1.53, 0.69, 0.99),
  Mc = Up(Bp),
  Lp = _p(Mc),
  Hp = (a) =>
    (a *= 2) < 1 ? 0.5 * Mc(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))),
  Cc = (a) => 1 - Math.sin(Math.acos(a)),
  Gp = Up(Cc),
  Yp = _p(Cc),
  pb = Rs(0.42, 0, 1, 1),
  yb = Rs(0, 0, 0.58, 1),
  qp = Rs(0.42, 0, 0.58, 1),
  vb = (a) => Array.isArray(a) && typeof a[0] != "number",
  Xp = (a) => Array.isArray(a) && typeof a[0] == "number",
  xb = {
    linear: _e,
    easeIn: pb,
    easeInOut: qp,
    easeOut: yb,
    circIn: Cc,
    circInOut: Yp,
    circOut: Gp,
    backIn: Mc,
    backInOut: Lp,
    backOut: Bp,
    anticipate: Hp,
  },
  bb = (a) => typeof a == "string",
  rg = (a) => {
    if (Xp(a)) {
      Tc(a.length === 4);
      const [s, l, o, c] = a;
      return Rs(s, l, o, c);
    } else if (bb(a)) return xb[a];
    return a;
  },
  Pl = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender",
  ],
  og = { value: null };
function Sb(a, s) {
  let l = new Set(),
    o = new Set(),
    c = !1,
    f = !1;
  const d = new WeakSet();
  let m = { delta: 0, timestamp: 0, isProcessing: !1 },
    p = 0;
  function g(b) {
    (d.has(b) && (y.schedule(b), a()), p++, b(m));
  }
  const y = {
    schedule: (b, S = !1, M = !1) => {
      const V = M && c ? l : o;
      return (S && d.add(b), V.has(b) || V.add(b), b);
    },
    cancel: (b) => {
      (o.delete(b), d.delete(b));
    },
    process: (b) => {
      if (((m = b), c)) {
        f = !0;
        return;
      }
      ((c = !0),
        ([l, o] = [o, l]),
        l.forEach(g),
        s && og.value && og.value.frameloop[s].push(p),
        (p = 0),
        l.clear(),
        (c = !1),
        f && ((f = !1), y.process(b)));
    },
  };
  return y;
}
const Tb = 40;
function kp(a, s) {
  let l = !1,
    o = !0;
  const c = { delta: 0, timestamp: 0, isProcessing: !1 },
    f = () => (l = !0),
    d = Pl.reduce((C, q) => ((C[q] = Sb(f, s ? q : void 0)), C), {}),
    {
      setup: m,
      read: p,
      resolveKeyframes: g,
      preUpdate: y,
      update: b,
      preRender: S,
      render: M,
      postRender: U,
    } = d,
    V = () => {
      const C = hn.useManualTiming ? c.timestamp : performance.now();
      ((l = !1),
        hn.useManualTiming ||
          (c.delta = o ? 1e3 / 60 : Math.max(Math.min(C - c.timestamp, Tb), 1)),
        (c.timestamp = C),
        (c.isProcessing = !0),
        m.process(c),
        p.process(c),
        g.process(c),
        y.process(c),
        b.process(c),
        S.process(c),
        M.process(c),
        U.process(c),
        (c.isProcessing = !1),
        l && s && ((o = !1), a(V)));
    },
    w = () => {
      ((l = !0), (o = !0), c.isProcessing || a(V));
    };
  return {
    schedule: Pl.reduce((C, q) => {
      const G = d[q];
      return (
        (C[q] = (Q, W = !1, F = !1) => (l || w(), G.schedule(Q, W, F))),
        C
      );
    }, {}),
    cancel: (C) => {
      for (let q = 0; q < Pl.length; q++) d[Pl[q]].cancel(C);
    },
    state: c,
    steps: d,
  };
}
const {
  schedule: Vt,
  cancel: Gn,
  state: te,
  steps: _u,
} = kp(typeof requestAnimationFrame < "u" ? requestAnimationFrame : _e, !0);
let Il;
function Ab() {
  Il = void 0;
}
const he = {
    now: () => (
      Il === void 0 &&
        he.set(
          te.isProcessing || hn.useManualTiming
            ? te.timestamp
            : performance.now(),
        ),
      Il
    ),
    set: (a) => {
      ((Il = a), queueMicrotask(Ab));
    },
  },
  Zp = (a) => (s) => typeof s == "string" && s.startsWith(a),
  Nc = Zp("--"),
  Eb = Zp("var(--"),
  Dc = (a) => (Eb(a) ? Mb.test(a.split("/*")[0].trim()) : !1),
  Mb =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  ci = {
    test: (a) => typeof a == "number",
    parse: parseFloat,
    transform: (a) => a,
  },
  Ts = { ...ci, transform: (a) => dn(0, 1, a) },
  Jl = { ...ci, default: 1 },
  gs = (a) => Math.round(a * 1e5) / 1e5,
  Rc = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Cb(a) {
  return a == null;
}
const Nb =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  jc = (a, s) => (l) =>
    !!(
      (typeof l == "string" && Nb.test(l) && l.startsWith(a)) ||
      (s && !Cb(l) && Object.prototype.hasOwnProperty.call(l, s))
    ),
  Kp = (a, s, l) => (o) => {
    if (typeof o != "string") return o;
    const [c, f, d, m] = o.match(Rc);
    return {
      [a]: parseFloat(c),
      [s]: parseFloat(f),
      [l]: parseFloat(d),
      alpha: m !== void 0 ? parseFloat(m) : 1,
    };
  },
  Db = (a) => dn(0, 255, a),
  Uu = { ...ci, transform: (a) => Math.round(Db(a)) },
  da = {
    test: jc("rgb", "red"),
    parse: Kp("red", "green", "blue"),
    transform: ({ red: a, green: s, blue: l, alpha: o = 1 }) =>
      "rgba(" +
      Uu.transform(a) +
      ", " +
      Uu.transform(s) +
      ", " +
      Uu.transform(l) +
      ", " +
      gs(Ts.transform(o)) +
      ")",
  };
function Rb(a) {
  let s = "",
    l = "",
    o = "",
    c = "";
  return (
    a.length > 5
      ? ((s = a.substring(1, 3)),
        (l = a.substring(3, 5)),
        (o = a.substring(5, 7)),
        (c = a.substring(7, 9)))
      : ((s = a.substring(1, 2)),
        (l = a.substring(2, 3)),
        (o = a.substring(3, 4)),
        (c = a.substring(4, 5)),
        (s += s),
        (l += l),
        (o += o),
        (c += c)),
    {
      red: parseInt(s, 16),
      green: parseInt(l, 16),
      blue: parseInt(o, 16),
      alpha: c ? parseInt(c, 16) / 255 : 1,
    }
  );
}
const Fu = { test: jc("#"), parse: Rb, transform: da.transform },
  js = (a) => ({
    test: (s) =>
      typeof s == "string" && s.endsWith(a) && s.split(" ").length === 1,
    parse: parseFloat,
    transform: (s) => `${s}${a}`,
  }),
  Hn = js("deg"),
  Je = js("%"),
  it = js("px"),
  jb = js("vh"),
  Ob = js("vw"),
  ug = {
    ...Je,
    parse: (a) => Je.parse(a) / 100,
    transform: (a) => Je.transform(a * 100),
  },
  ni = {
    test: jc("hsl", "hue"),
    parse: Kp("hue", "saturation", "lightness"),
    transform: ({ hue: a, saturation: s, lightness: l, alpha: o = 1 }) =>
      "hsla(" +
      Math.round(a) +
      ", " +
      Je.transform(gs(s)) +
      ", " +
      Je.transform(gs(l)) +
      ", " +
      gs(Ts.transform(o)) +
      ")",
  },
  qt = {
    test: (a) => da.test(a) || Fu.test(a) || ni.test(a),
    parse: (a) =>
      da.test(a) ? da.parse(a) : ni.test(a) ? ni.parse(a) : Fu.parse(a),
    transform: (a) =>
      typeof a == "string"
        ? a
        : a.hasOwnProperty("red")
          ? da.transform(a)
          : ni.transform(a),
    getAnimatableNone: (a) => {
      const s = qt.parse(a);
      return ((s.alpha = 0), qt.transform(s));
    },
  },
  wb =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Vb(a) {
  var s, l;
  return (
    isNaN(a) &&
    typeof a == "string" &&
    (((s = a.match(Rc)) == null ? void 0 : s.length) || 0) +
      (((l = a.match(wb)) == null ? void 0 : l.length) || 0) >
      0
  );
}
const Qp = "number",
  Pp = "color",
  zb = "var",
  _b = "var(",
  cg = "${}",
  Ub =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function As(a) {
  const s = a.toString(),
    l = [],
    o = { color: [], number: [], var: [] },
    c = [];
  let f = 0;
  const m = s
    .replace(
      Ub,
      (p) => (
        qt.test(p)
          ? (o.color.push(f), c.push(Pp), l.push(qt.parse(p)))
          : p.startsWith(_b)
            ? (o.var.push(f), c.push(zb), l.push(p))
            : (o.number.push(f), c.push(Qp), l.push(parseFloat(p))),
        ++f,
        cg
      ),
    )
    .split(cg);
  return { values: l, split: m, indexes: o, types: c };
}
function Jp(a) {
  return As(a).values;
}
function Fp(a) {
  const { split: s, types: l } = As(a),
    o = s.length;
  return (c) => {
    let f = "";
    for (let d = 0; d < o; d++)
      if (((f += s[d]), c[d] !== void 0)) {
        const m = l[d];
        m === Qp
          ? (f += gs(c[d]))
          : m === Pp
            ? (f += qt.transform(c[d]))
            : (f += c[d]);
      }
    return f;
  };
}
const Bb = (a) =>
  typeof a == "number" ? 0 : qt.test(a) ? qt.getAnimatableNone(a) : a;
function Lb(a) {
  const s = Jp(a);
  return Fp(a)(s.map(Bb));
}
const Yn = {
  test: Vb,
  parse: Jp,
  createTransformer: Fp,
  getAnimatableNone: Lb,
};
function Bu(a, s, l) {
  return (
    l < 0 && (l += 1),
    l > 1 && (l -= 1),
    l < 1 / 6
      ? a + (s - a) * 6 * l
      : l < 1 / 2
        ? s
        : l < 2 / 3
          ? a + (s - a) * (2 / 3 - l) * 6
          : a
  );
}
function Hb({ hue: a, saturation: s, lightness: l, alpha: o }) {
  ((a /= 360), (s /= 100), (l /= 100));
  let c = 0,
    f = 0,
    d = 0;
  if (!s) c = f = d = l;
  else {
    const m = l < 0.5 ? l * (1 + s) : l + s - l * s,
      p = 2 * l - m;
    ((c = Bu(p, m, a + 1 / 3)), (f = Bu(p, m, a)), (d = Bu(p, m, a - 1 / 3)));
  }
  return {
    red: Math.round(c * 255),
    green: Math.round(f * 255),
    blue: Math.round(d * 255),
    alpha: o,
  };
}
function ar(a, s) {
  return (l) => (l > 0 ? s : a);
}
const wt = (a, s, l) => a + (s - a) * l,
  Lu = (a, s, l) => {
    const o = a * a,
      c = l * (s * s - o) + o;
    return c < 0 ? 0 : Math.sqrt(c);
  },
  Gb = [Fu, da, ni],
  Yb = (a) => Gb.find((s) => s.test(a));
function fg(a) {
  const s = Yb(a);
  if (!s) return !1;
  let l = s.parse(a);
  return (s === ni && (l = Hb(l)), l);
}
const dg = (a, s) => {
    const l = fg(a),
      o = fg(s);
    if (!l || !o) return ar(a, s);
    const c = { ...l };
    return (f) => (
      (c.red = Lu(l.red, o.red, f)),
      (c.green = Lu(l.green, o.green, f)),
      (c.blue = Lu(l.blue, o.blue, f)),
      (c.alpha = wt(l.alpha, o.alpha, f)),
      da.transform(c)
    );
  },
  $u = new Set(["none", "hidden"]);
function qb(a, s) {
  return $u.has(a) ? (l) => (l <= 0 ? a : s) : (l) => (l >= 1 ? s : a);
}
function Xb(a, s) {
  return (l) => wt(a, s, l);
}
function Oc(a) {
  return typeof a == "number"
    ? Xb
    : typeof a == "string"
      ? Dc(a)
        ? ar
        : qt.test(a)
          ? dg
          : Kb
      : Array.isArray(a)
        ? $p
        : typeof a == "object"
          ? qt.test(a)
            ? dg
            : kb
          : ar;
}
function $p(a, s) {
  const l = [...a],
    o = l.length,
    c = a.map((f, d) => Oc(f)(f, s[d]));
  return (f) => {
    for (let d = 0; d < o; d++) l[d] = c[d](f);
    return l;
  };
}
function kb(a, s) {
  const l = { ...a, ...s },
    o = {};
  for (const c in l)
    a[c] !== void 0 && s[c] !== void 0 && (o[c] = Oc(a[c])(a[c], s[c]));
  return (c) => {
    for (const f in o) l[f] = o[f](c);
    return l;
  };
}
function Zb(a, s) {
  const l = [],
    o = { color: 0, var: 0, number: 0 };
  for (let c = 0; c < s.values.length; c++) {
    const f = s.types[c],
      d = a.indexes[f][o[f]],
      m = a.values[d] ?? 0;
    ((l[c] = m), o[f]++);
  }
  return l;
}
const Kb = (a, s) => {
  const l = Yn.createTransformer(s),
    o = As(a),
    c = As(s);
  return o.indexes.var.length === c.indexes.var.length &&
    o.indexes.color.length === c.indexes.color.length &&
    o.indexes.number.length >= c.indexes.number.length
    ? ($u.has(a) && !c.values.length) || ($u.has(s) && !o.values.length)
      ? qb(a, s)
      : Ds($p(Zb(o, c), c.values), l)
    : ar(a, s);
};
function Wp(a, s, l) {
  return typeof a == "number" && typeof s == "number" && typeof l == "number"
    ? wt(a, s, l)
    : Oc(a)(a, s);
}
const Qb = (a) => {
    const s = ({ timestamp: l }) => a(l);
    return {
      start: (l = !0) => Vt.update(s, l),
      stop: () => Gn(s),
      now: () => (te.isProcessing ? te.timestamp : he.now()),
    };
  },
  Ip = (a, s, l = 10) => {
    let o = "";
    const c = Math.max(Math.round(s / l), 2);
    for (let f = 0; f < c; f++)
      o += Math.round(a(f / (c - 1)) * 1e4) / 1e4 + ", ";
    return `linear(${o.substring(0, o.length - 2)})`;
  },
  ir = 2e4;
function wc(a) {
  let s = 0;
  const l = 50;
  let o = a.next(s);
  for (; !o.done && s < ir; ) ((s += l), (o = a.next(s)));
  return s >= ir ? 1 / 0 : s;
}
function Pb(a, s = 100, l) {
  const o = l({ ...a, keyframes: [0, s] }),
    c = Math.min(wc(o), ir);
  return {
    type: "keyframes",
    ease: (f) => o.next(c * f).value / s,
    duration: Pe(c),
  };
}
const Jb = 5;
function ty(a, s, l) {
  const o = Math.max(s - Jb, 0);
  return Vp(l - a(o), s - o);
}
const Ut = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  Hu = 0.001;
function Fb({
  duration: a = Ut.duration,
  bounce: s = Ut.bounce,
  velocity: l = Ut.velocity,
  mass: o = Ut.mass,
}) {
  let c,
    f,
    d = 1 - s;
  ((d = dn(Ut.minDamping, Ut.maxDamping, d)),
    (a = dn(Ut.minDuration, Ut.maxDuration, Pe(a))),
    d < 1
      ? ((c = (g) => {
          const y = g * d,
            b = y * a,
            S = y - l,
            M = Wu(g, d),
            U = Math.exp(-b);
          return Hu - (S / M) * U;
        }),
        (f = (g) => {
          const b = g * d * a,
            S = b * l + l,
            M = Math.pow(d, 2) * Math.pow(g, 2) * a,
            U = Math.exp(-b),
            V = Wu(Math.pow(g, 2), d);
          return ((-c(g) + Hu > 0 ? -1 : 1) * ((S - M) * U)) / V;
        }))
      : ((c = (g) => {
          const y = Math.exp(-g * a),
            b = (g - l) * a + 1;
          return -Hu + y * b;
        }),
        (f = (g) => {
          const y = Math.exp(-g * a),
            b = (l - g) * (a * a);
          return y * b;
        })));
  const m = 5 / a,
    p = Wb(c, f, m);
  if (((a = Qe(a)), isNaN(p)))
    return { stiffness: Ut.stiffness, damping: Ut.damping, duration: a };
  {
    const g = Math.pow(p, 2) * o;
    return { stiffness: g, damping: d * 2 * Math.sqrt(o * g), duration: a };
  }
}
const $b = 12;
function Wb(a, s, l) {
  let o = l;
  for (let c = 1; c < $b; c++) o = o - a(o) / s(o);
  return o;
}
function Wu(a, s) {
  return a * Math.sqrt(1 - s * s);
}
const Ib = ["duration", "bounce"],
  t1 = ["stiffness", "damping", "mass"];
function hg(a, s) {
  return s.some((l) => a[l] !== void 0);
}
function e1(a) {
  let s = {
    velocity: Ut.velocity,
    stiffness: Ut.stiffness,
    damping: Ut.damping,
    mass: Ut.mass,
    isResolvedFromDuration: !1,
    ...a,
  };
  if (!hg(a, t1) && hg(a, Ib))
    if (a.visualDuration) {
      const l = a.visualDuration,
        o = (2 * Math.PI) / (l * 1.2),
        c = o * o,
        f = 2 * dn(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(c);
      s = { ...s, mass: Ut.mass, stiffness: c, damping: f };
    } else {
      const l = Fb(a);
      ((s = { ...s, ...l, mass: Ut.mass }), (s.isResolvedFromDuration = !0));
    }
  return s;
}
function sr(a = Ut.visualDuration, s = Ut.bounce) {
  const l =
    typeof a != "object"
      ? { visualDuration: a, keyframes: [0, 1], bounce: s }
      : a;
  let { restSpeed: o, restDelta: c } = l;
  const f = l.keyframes[0],
    d = l.keyframes[l.keyframes.length - 1],
    m = { done: !1, value: f },
    {
      stiffness: p,
      damping: g,
      mass: y,
      duration: b,
      velocity: S,
      isResolvedFromDuration: M,
    } = e1({ ...l, velocity: -Pe(l.velocity || 0) }),
    U = S || 0,
    V = g / (2 * Math.sqrt(p * y)),
    w = d - f,
    k = Pe(Math.sqrt(p / y)),
    Z = Math.abs(w) < 5;
  (o || (o = Z ? Ut.restSpeed.granular : Ut.restSpeed.default),
    c || (c = Z ? Ut.restDelta.granular : Ut.restDelta.default));
  let C;
  if (V < 1) {
    const G = Wu(k, V);
    C = (Q) => {
      const W = Math.exp(-V * k * Q);
      return (
        d - W * (((U + V * k * w) / G) * Math.sin(G * Q) + w * Math.cos(G * Q))
      );
    };
  } else if (V === 1) C = (G) => d - Math.exp(-k * G) * (w + (U + k * w) * G);
  else {
    const G = k * Math.sqrt(V * V - 1);
    C = (Q) => {
      const W = Math.exp(-V * k * Q),
        F = Math.min(G * Q, 300);
      return (
        d - (W * ((U + V * k * w) * Math.sinh(F) + G * w * Math.cosh(F))) / G
      );
    };
  }
  const q = {
    calculatedDuration: (M && b) || null,
    next: (G) => {
      const Q = C(G);
      if (M) m.done = G >= b;
      else {
        let W = G === 0 ? U : 0;
        V < 1 && (W = G === 0 ? Qe(U) : ty(C, G, Q));
        const F = Math.abs(W) <= o,
          ot = Math.abs(d - Q) <= c;
        m.done = F && ot;
      }
      return ((m.value = m.done ? d : Q), m);
    },
    toString: () => {
      const G = Math.min(wc(q), ir),
        Q = Ip((W) => q.next(G * W).value, G, 30);
      return G + "ms " + Q;
    },
    toTransition: () => {},
  };
  return q;
}
sr.applyToOptions = (a) => {
  const s = Pb(a, 100, sr);
  return (
    (a.ease = s.ease),
    (a.duration = Qe(s.duration)),
    (a.type = "keyframes"),
    a
  );
};
function Iu({
  keyframes: a,
  velocity: s = 0,
  power: l = 0.8,
  timeConstant: o = 325,
  bounceDamping: c = 10,
  bounceStiffness: f = 500,
  modifyTarget: d,
  min: m,
  max: p,
  restDelta: g = 0.5,
  restSpeed: y,
}) {
  const b = a[0],
    S = { done: !1, value: b },
    M = (F) => (m !== void 0 && F < m) || (p !== void 0 && F > p),
    U = (F) =>
      m === void 0
        ? p
        : p === void 0 || Math.abs(m - F) < Math.abs(p - F)
          ? m
          : p;
  let V = l * s;
  const w = b + V,
    k = d === void 0 ? w : d(w);
  k !== w && (V = k - b);
  const Z = (F) => -V * Math.exp(-F / o),
    C = (F) => k + Z(F),
    q = (F) => {
      const ot = Z(F),
        bt = C(F);
      ((S.done = Math.abs(ot) <= g), (S.value = S.done ? k : bt));
    };
  let G, Q;
  const W = (F) => {
    M(S.value) &&
      ((G = F),
      (Q = sr({
        keyframes: [S.value, U(S.value)],
        velocity: ty(C, F, S.value),
        damping: c,
        stiffness: f,
        restDelta: g,
        restSpeed: y,
      })));
  };
  return (
    W(0),
    {
      calculatedDuration: null,
      next: (F) => {
        let ot = !1;
        return (
          !Q && G === void 0 && ((ot = !0), q(F), W(F)),
          G !== void 0 && F >= G ? Q.next(F - G) : (!ot && q(F), S)
        );
      },
    }
  );
}
function n1(a, s, l) {
  const o = [],
    c = l || hn.mix || Wp,
    f = a.length - 1;
  for (let d = 0; d < f; d++) {
    let m = c(a[d], a[d + 1]);
    if (s) {
      const p = Array.isArray(s) ? s[d] || _e : s;
      m = Ds(p, m);
    }
    o.push(m);
  }
  return o;
}
function a1(a, s, { clamp: l = !0, ease: o, mixer: c } = {}) {
  const f = a.length;
  if ((Tc(f === s.length), f === 1)) return () => s[0];
  if (f === 2 && s[0] === s[1]) return () => s[1];
  const d = a[0] === a[1];
  a[0] > a[f - 1] && ((a = [...a].reverse()), (s = [...s].reverse()));
  const m = n1(s, o, c),
    p = m.length,
    g = (y) => {
      if (d && y < a[0]) return s[0];
      let b = 0;
      if (p > 1) for (; b < a.length - 2 && !(y < a[b + 1]); b++);
      const S = Ss(a[b], a[b + 1], y);
      return m[b](S);
    };
  return l ? (y) => g(dn(a[0], a[f - 1], y)) : g;
}
function i1(a, s) {
  const l = a[a.length - 1];
  for (let o = 1; o <= s; o++) {
    const c = Ss(0, s, o);
    a.push(wt(l, 1, c));
  }
}
function s1(a) {
  const s = [0];
  return (i1(s, a.length - 1), s);
}
function l1(a, s) {
  return a.map((l) => l * s);
}
function r1(a, s) {
  return a.map(() => s || qp).splice(0, a.length - 1);
}
function ps({
  duration: a = 300,
  keyframes: s,
  times: l,
  ease: o = "easeInOut",
}) {
  const c = vb(o) ? o.map(rg) : rg(o),
    f = { done: !1, value: s[0] },
    d = l1(l && l.length === s.length ? l : s1(s), a),
    m = a1(d, s, { ease: Array.isArray(c) ? c : r1(s, c) });
  return {
    calculatedDuration: a,
    next: (p) => ((f.value = m(p)), (f.done = p >= a), f),
  };
}
const o1 = (a) => a !== null;
function Vc(a, { repeat: s, repeatType: l = "loop" }, o, c = 1) {
  const f = a.filter(o1),
    m = c < 0 || (s && l !== "loop" && s % 2 === 1) ? 0 : f.length - 1;
  return !m || o === void 0 ? f[m] : o;
}
const u1 = { decay: Iu, inertia: Iu, tween: ps, keyframes: ps, spring: sr };
function ey(a) {
  typeof a.type == "string" && (a.type = u1[a.type]);
}
class zc {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((s) => {
      this.resolve = s;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(s, l) {
    return this.finished.then(s, l);
  }
}
const c1 = (a) => a / 100;
class _c extends zc {
  constructor(s) {
    (super(),
      (this.state = "idle"),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.stop = () => {
        var o, c;
        const { motionValue: l } = this.options;
        (l && l.updatedAt !== he.now() && this.tick(he.now()),
          (this.isStopped = !0),
          this.state !== "idle" &&
            (this.teardown(),
            (c = (o = this.options).onStop) == null || c.call(o)));
      }),
      (this.options = s),
      this.initAnimation(),
      this.play(),
      s.autoplay === !1 && this.pause());
  }
  initAnimation() {
    const { options: s } = this;
    ey(s);
    const {
      type: l = ps,
      repeat: o = 0,
      repeatDelay: c = 0,
      repeatType: f,
      velocity: d = 0,
    } = s;
    let { keyframes: m } = s;
    const p = l || ps;
    p !== ps &&
      typeof m[0] != "number" &&
      ((this.mixKeyframes = Ds(c1, Wp(m[0], m[1]))), (m = [0, 100]));
    const g = p({ ...s, keyframes: m });
    (f === "mirror" &&
      (this.mirroredGenerator = p({
        ...s,
        keyframes: [...m].reverse(),
        velocity: -d,
      })),
      g.calculatedDuration === null && (g.calculatedDuration = wc(g)));
    const { calculatedDuration: y } = g;
    ((this.calculatedDuration = y),
      (this.resolvedDuration = y + c),
      (this.totalDuration = this.resolvedDuration * (o + 1) - c),
      (this.generator = g));
  }
  updateTime(s) {
    const l = Math.round(s - this.startTime) * this.playbackSpeed;
    this.holdTime !== null
      ? (this.currentTime = this.holdTime)
      : (this.currentTime = l);
  }
  tick(s, l = !1) {
    const {
      generator: o,
      totalDuration: c,
      mixKeyframes: f,
      mirroredGenerator: d,
      resolvedDuration: m,
      calculatedDuration: p,
    } = this;
    if (this.startTime === null) return o.next(0);
    const {
      delay: g = 0,
      keyframes: y,
      repeat: b,
      repeatType: S,
      repeatDelay: M,
      type: U,
      onUpdate: V,
      finalKeyframe: w,
    } = this.options;
    (this.speed > 0
      ? (this.startTime = Math.min(this.startTime, s))
      : this.speed < 0 &&
        (this.startTime = Math.min(s - c / this.speed, this.startTime)),
      l ? (this.currentTime = s) : this.updateTime(s));
    const k = this.currentTime - g * (this.playbackSpeed >= 0 ? 1 : -1),
      Z = this.playbackSpeed >= 0 ? k < 0 : k > c;
    ((this.currentTime = Math.max(k, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = c));
    let C = this.currentTime,
      q = o;
    if (b) {
      const F = Math.min(this.currentTime, c) / m;
      let ot = Math.floor(F),
        bt = F % 1;
      (!bt && F >= 1 && (bt = 1),
        bt === 1 && ot--,
        (ot = Math.min(ot, b + 1)),
        !!(ot % 2) &&
          (S === "reverse"
            ? ((bt = 1 - bt), M && (bt -= M / m))
            : S === "mirror" && (q = d)),
        (C = dn(0, 1, bt) * m));
    }
    const G = Z ? { done: !1, value: y[0] } : q.next(C);
    f && (G.value = f(G.value));
    let { done: Q } = G;
    !Z &&
      p !== null &&
      (Q =
        this.playbackSpeed >= 0
          ? this.currentTime >= c
          : this.currentTime <= 0);
    const W =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && Q));
    return (
      W && U !== Iu && (G.value = Vc(y, this.options, w, this.speed)),
      V && V(G.value),
      W && this.finish(),
      G
    );
  }
  then(s, l) {
    return this.finished.then(s, l);
  }
  get duration() {
    return Pe(this.calculatedDuration);
  }
  get time() {
    return Pe(this.currentTime);
  }
  set time(s) {
    var l;
    ((s = Qe(s)),
      (this.currentTime = s),
      this.startTime === null ||
      this.holdTime !== null ||
      this.playbackSpeed === 0
        ? (this.holdTime = s)
        : this.driver &&
          (this.startTime = this.driver.now() - s / this.playbackSpeed),
      (l = this.driver) == null || l.start(!1));
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(s) {
    this.updateTime(he.now());
    const l = this.playbackSpeed !== s;
    ((this.playbackSpeed = s), l && (this.time = Pe(this.currentTime)));
  }
  play() {
    var c, f;
    if (this.isStopped) return;
    const { driver: s = Qb, startTime: l } = this.options;
    (this.driver || (this.driver = s((d) => this.tick(d))),
      (f = (c = this.options).onPlay) == null || f.call(c));
    const o = this.driver.now();
    (this.state === "finished"
      ? (this.updateFinished(), (this.startTime = o))
      : this.holdTime !== null
        ? (this.startTime = o - this.holdTime)
        : this.startTime || (this.startTime = l ?? o),
      this.state === "finished" &&
        this.speed < 0 &&
        (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start());
  }
  pause() {
    ((this.state = "paused"),
      this.updateTime(he.now()),
      (this.holdTime = this.currentTime));
  }
  complete() {
    (this.state !== "running" && this.play(),
      (this.state = "finished"),
      (this.holdTime = null));
  }
  finish() {
    var s, l;
    (this.notifyFinished(),
      this.teardown(),
      (this.state = "finished"),
      (l = (s = this.options).onComplete) == null || l.call(s));
  }
  cancel() {
    var s, l;
    ((this.holdTime = null),
      (this.startTime = 0),
      this.tick(0),
      this.teardown(),
      (l = (s = this.options).onCancel) == null || l.call(s));
  }
  teardown() {
    ((this.state = "idle"),
      this.stopDriver(),
      (this.startTime = this.holdTime = null));
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(s) {
    return ((this.startTime = 0), this.tick(s, !0));
  }
  attachTimeline(s) {
    var l;
    return (
      this.options.allowFlatten &&
        ((this.options.type = "keyframes"),
        (this.options.ease = "linear"),
        this.initAnimation()),
      (l = this.driver) == null || l.stop(),
      s.observe(this)
    );
  }
}
function f1(a) {
  for (let s = 1; s < a.length; s++) a[s] ?? (a[s] = a[s - 1]);
}
const ha = (a) => (a * 180) / Math.PI,
  tc = (a) => {
    const s = ha(Math.atan2(a[1], a[0]));
    return ec(s);
  },
  d1 = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
    rotate: tc,
    rotateZ: tc,
    skewX: (a) => ha(Math.atan(a[1])),
    skewY: (a) => ha(Math.atan(a[2])),
    skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2,
  },
  ec = (a) => ((a = a % 360), a < 0 && (a += 360), a),
  mg = tc,
  gg = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]),
  pg = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]),
  h1 = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: gg,
    scaleY: pg,
    scale: (a) => (gg(a) + pg(a)) / 2,
    rotateX: (a) => ec(ha(Math.atan2(a[6], a[5]))),
    rotateY: (a) => ec(ha(Math.atan2(-a[2], a[0]))),
    rotateZ: mg,
    rotate: mg,
    skewX: (a) => ha(Math.atan(a[4])),
    skewY: (a) => ha(Math.atan(a[1])),
    skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2,
  };
function nc(a) {
  return a.includes("scale") ? 1 : 0;
}
function ac(a, s) {
  if (!a || a === "none") return nc(s);
  const l = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let o, c;
  if (l) ((o = h1), (c = l));
  else {
    const m = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    ((o = d1), (c = m));
  }
  if (!c) return nc(s);
  const f = o[s],
    d = c[1].split(",").map(g1);
  return typeof f == "function" ? f(d) : d[f];
}
const m1 = (a, s) => {
  const { transform: l = "none" } = getComputedStyle(a);
  return ac(l, s);
};
function g1(a) {
  return parseFloat(a.trim());
}
const fi = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  di = new Set(fi),
  yg = (a) => a === ci || a === it,
  p1 = new Set(["x", "y", "z"]),
  y1 = fi.filter((a) => !p1.has(a));
function v1(a) {
  const s = [];
  return (
    y1.forEach((l) => {
      const o = a.getValue(l);
      o !== void 0 &&
        (s.push([l, o.get()]), o.set(l.startsWith("scale") ? 1 : 0));
    }),
    s
  );
}
const ma = {
  width: ({ x: a }, { paddingLeft: s = "0", paddingRight: l = "0" }) =>
    a.max - a.min - parseFloat(s) - parseFloat(l),
  height: ({ y: a }, { paddingTop: s = "0", paddingBottom: l = "0" }) =>
    a.max - a.min - parseFloat(s) - parseFloat(l),
  top: (a, { top: s }) => parseFloat(s),
  left: (a, { left: s }) => parseFloat(s),
  bottom: ({ y: a }, { top: s }) => parseFloat(s) + (a.max - a.min),
  right: ({ x: a }, { left: s }) => parseFloat(s) + (a.max - a.min),
  x: (a, { transform: s }) => ac(s, "x"),
  y: (a, { transform: s }) => ac(s, "y"),
};
ma.translateX = ma.x;
ma.translateY = ma.y;
const ga = new Set();
let ic = !1,
  sc = !1,
  lc = !1;
function ny() {
  if (sc) {
    const a = Array.from(ga).filter((o) => o.needsMeasurement),
      s = new Set(a.map((o) => o.element)),
      l = new Map();
    (s.forEach((o) => {
      const c = v1(o);
      c.length && (l.set(o, c), o.render());
    }),
      a.forEach((o) => o.measureInitialState()),
      s.forEach((o) => {
        o.render();
        const c = l.get(o);
        c &&
          c.forEach(([f, d]) => {
            var m;
            (m = o.getValue(f)) == null || m.set(d);
          });
      }),
      a.forEach((o) => o.measureEndState()),
      a.forEach((o) => {
        o.suspendedScrollY !== void 0 && window.scrollTo(0, o.suspendedScrollY);
      }));
  }
  ((sc = !1), (ic = !1), ga.forEach((a) => a.complete(lc)), ga.clear());
}
function ay() {
  ga.forEach((a) => {
    (a.readKeyframes(), a.needsMeasurement && (sc = !0));
  });
}
function x1() {
  ((lc = !0), ay(), ny(), (lc = !1));
}
class Uc {
  constructor(s, l, o, c, f, d = !1) {
    ((this.state = "pending"),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...s]),
      (this.onComplete = l),
      (this.name = o),
      (this.motionValue = c),
      (this.element = f),
      (this.isAsync = d));
  }
  scheduleResolve() {
    ((this.state = "scheduled"),
      this.isAsync
        ? (ga.add(this),
          ic || ((ic = !0), Vt.read(ay), Vt.resolveKeyframes(ny)))
        : (this.readKeyframes(), this.complete()));
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: s,
      name: l,
      element: o,
      motionValue: c,
    } = this;
    if (s[0] === null) {
      const f = c == null ? void 0 : c.get(),
        d = s[s.length - 1];
      if (f !== void 0) s[0] = f;
      else if (o && l) {
        const m = o.readValue(l, d);
        m != null && (s[0] = m);
      }
      (s[0] === void 0 && (s[0] = d), c && f === void 0 && c.set(s[0]));
    }
    f1(s);
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(s = !1) {
    ((this.state = "complete"),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, s),
      ga.delete(this));
  }
  cancel() {
    this.state === "scheduled" && (ga.delete(this), (this.state = "pending"));
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const b1 = (a) => a.startsWith("--");
function S1(a, s, l) {
  b1(s) ? a.style.setProperty(s, l) : (a.style[s] = l);
}
const T1 = Ac(() => window.ScrollTimeline !== void 0),
  A1 = {};
function E1(a, s) {
  const l = Ac(a);
  return () => A1[s] ?? l();
}
const iy = E1(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  hs = ([a, s, l, o]) => `cubic-bezier(${a}, ${s}, ${l}, ${o})`,
  vg = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: hs([0, 0.65, 0.55, 1]),
    circOut: hs([0.55, 0, 1, 0.45]),
    backIn: hs([0.31, 0.01, 0.66, -0.59]),
    backOut: hs([0.33, 1.53, 0.69, 0.99]),
  };
function sy(a, s) {
  if (a)
    return typeof a == "function"
      ? iy()
        ? Ip(a, s)
        : "ease-out"
      : Xp(a)
        ? hs(a)
        : Array.isArray(a)
          ? a.map((l) => sy(l, s) || vg.easeOut)
          : vg[a];
}
function M1(
  a,
  s,
  l,
  {
    delay: o = 0,
    duration: c = 300,
    repeat: f = 0,
    repeatType: d = "loop",
    ease: m = "easeOut",
    times: p,
  } = {},
  g = void 0,
) {
  const y = { [s]: l };
  p && (y.offset = p);
  const b = sy(m, c);
  Array.isArray(b) && (y.easing = b);
  const S = {
    delay: o,
    duration: c,
    easing: Array.isArray(b) ? "linear" : b,
    fill: "both",
    iterations: f + 1,
    direction: d === "reverse" ? "alternate" : "normal",
  };
  return (g && (S.pseudoElement = g), a.animate(y, S));
}
function ly(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function C1({ type: a, ...s }) {
  return ly(a) && iy()
    ? a.applyToOptions(s)
    : (s.duration ?? (s.duration = 300), s.ease ?? (s.ease = "easeOut"), s);
}
class N1 extends zc {
  constructor(s) {
    if ((super(), (this.finishedTime = null), (this.isStopped = !1), !s))
      return;
    const {
      element: l,
      name: o,
      keyframes: c,
      pseudoElement: f,
      allowFlatten: d = !1,
      finalKeyframe: m,
      onComplete: p,
    } = s;
    ((this.isPseudoElement = !!f),
      (this.allowFlatten = d),
      (this.options = s),
      Tc(typeof s.type != "string"));
    const g = C1(s);
    ((this.animation = M1(l, o, c, g, f)),
      g.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !f)) {
          const y = Vc(c, this.options, m, this.speed);
          (this.updateMotionValue ? this.updateMotionValue(y) : S1(l, o, y),
            this.animation.cancel());
        }
        (p == null || p(), this.notifyFinished());
      }));
  }
  play() {
    this.isStopped ||
      (this.animation.play(),
      this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var s, l;
    (l = (s = this.animation).finish) == null || l.call(s);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = !0;
    const { state: s } = this;
    s === "idle" ||
      s === "finished" ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    var s, l;
    this.isPseudoElement ||
      (l = (s = this.animation).commitStyles) == null ||
      l.call(s);
  }
  get duration() {
    var l, o;
    const s =
      ((o =
        (l = this.animation.effect) == null ? void 0 : l.getComputedTiming) ==
      null
        ? void 0
        : o.call(l).duration) || 0;
    return Pe(Number(s));
  }
  get time() {
    return Pe(Number(this.animation.currentTime) || 0);
  }
  set time(s) {
    ((this.finishedTime = null), (this.animation.currentTime = Qe(s)));
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(s) {
    (s < 0 && (this.finishedTime = null), (this.animation.playbackRate = s));
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(s) {
    this.animation.startTime = s;
  }
  attachTimeline({ timeline: s, observe: l }) {
    var o;
    return (
      this.allowFlatten &&
        ((o = this.animation.effect) == null ||
          o.updateTiming({ easing: "linear" })),
      (this.animation.onfinish = null),
      s && T1() ? ((this.animation.timeline = s), _e) : l(this)
    );
  }
}
const ry = { anticipate: Hp, backInOut: Lp, circInOut: Yp };
function D1(a) {
  return a in ry;
}
function R1(a) {
  typeof a.ease == "string" && D1(a.ease) && (a.ease = ry[a.ease]);
}
const xg = 10;
class j1 extends N1 {
  constructor(s) {
    (R1(s),
      ey(s),
      super(s),
      s.startTime && (this.startTime = s.startTime),
      (this.options = s));
  }
  updateMotionValue(s) {
    const {
      motionValue: l,
      onUpdate: o,
      onComplete: c,
      element: f,
      ...d
    } = this.options;
    if (!l) return;
    if (s !== void 0) {
      l.set(s);
      return;
    }
    const m = new _c({ ...d, autoplay: !1 }),
      p = Qe(this.finishedTime ?? this.time);
    (l.setWithVelocity(m.sample(p - xg).value, m.sample(p).value, xg),
      m.stop());
  }
}
const bg = (a, s) =>
  s === "zIndex"
    ? !1
    : !!(
        typeof a == "number" ||
        Array.isArray(a) ||
        (typeof a == "string" &&
          (Yn.test(a) || a === "0") &&
          !a.startsWith("url("))
      );
function O1(a) {
  const s = a[0];
  if (a.length === 1) return !0;
  for (let l = 0; l < a.length; l++) if (a[l] !== s) return !0;
}
function w1(a, s, l, o) {
  const c = a[0];
  if (c === null) return !1;
  if (s === "display" || s === "visibility") return !0;
  const f = a[a.length - 1],
    d = bg(c, s),
    m = bg(f, s);
  return !d || !m ? !1 : O1(a) || ((l === "spring" || ly(l)) && o);
}
function Bc(a) {
  return Op(a) && "offsetHeight" in a;
}
const V1 = new Set(["opacity", "clipPath", "filter", "transform"]),
  z1 = Ac(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function _1(a) {
  var g;
  const {
    motionValue: s,
    name: l,
    repeatDelay: o,
    repeatType: c,
    damping: f,
    type: d,
  } = a;
  if (!Bc((g = s == null ? void 0 : s.owner) == null ? void 0 : g.current))
    return !1;
  const { onUpdate: m, transformTemplate: p } = s.owner.getProps();
  return (
    z1() &&
    l &&
    V1.has(l) &&
    (l !== "transform" || !p) &&
    !m &&
    !o &&
    c !== "mirror" &&
    f !== 0 &&
    d !== "inertia"
  );
}
const U1 = 40;
class B1 extends zc {
  constructor({
    autoplay: s = !0,
    delay: l = 0,
    type: o = "keyframes",
    repeat: c = 0,
    repeatDelay: f = 0,
    repeatType: d = "loop",
    keyframes: m,
    name: p,
    motionValue: g,
    element: y,
    ...b
  }) {
    var U;
    (super(),
      (this.stop = () => {
        var V, w;
        (this._animation &&
          (this._animation.stop(),
          (V = this.stopTimeline) == null || V.call(this)),
          (w = this.keyframeResolver) == null || w.cancel());
      }),
      (this.createdAt = he.now()));
    const S = {
        autoplay: s,
        delay: l,
        type: o,
        repeat: c,
        repeatDelay: f,
        repeatType: d,
        name: p,
        motionValue: g,
        element: y,
        ...b,
      },
      M = (y == null ? void 0 : y.KeyframeResolver) || Uc;
    ((this.keyframeResolver = new M(
      m,
      (V, w, k) => this.onKeyframesResolved(V, w, S, !k),
      p,
      g,
      y,
    )),
      (U = this.keyframeResolver) == null || U.scheduleResolve());
  }
  onKeyframesResolved(s, l, o, c) {
    this.keyframeResolver = void 0;
    const {
      name: f,
      type: d,
      velocity: m,
      delay: p,
      isHandoff: g,
      onUpdate: y,
    } = o;
    ((this.resolvedAt = he.now()),
      w1(s, f, d, m) ||
        ((hn.instantAnimations || !p) && (y == null || y(Vc(s, o, l))),
        (s[0] = s[s.length - 1]),
        (o.duration = 0),
        (o.repeat = 0)));
    const S = {
        startTime: c
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > U1
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: l,
        ...o,
        keyframes: s,
      },
      M =
        !g && _1(S)
          ? new j1({ ...S, element: S.motionValue.owner.current })
          : new _c(S);
    (M.finished.then(() => this.notifyFinished()).catch(_e),
      this.pendingTimeline &&
        ((this.stopTimeline = M.attachTimeline(this.pendingTimeline)),
        (this.pendingTimeline = void 0)),
      (this._animation = M));
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(s, l) {
    return this.finished.finally(s).then(() => {});
  }
  get animation() {
    var s;
    return (
      this._animation ||
        ((s = this.keyframeResolver) == null || s.resume(), x1()),
      this._animation
    );
  }
  get duration() {
    return this.animation.duration;
  }
  get time() {
    return this.animation.time;
  }
  set time(s) {
    this.animation.time = s;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(s) {
    this.animation.speed = s;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(s) {
    return (
      this._animation
        ? (this.stopTimeline = this.animation.attachTimeline(s))
        : (this.pendingTimeline = s),
      () => this.stop()
    );
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var s;
    (this._animation && this.animation.cancel(),
      (s = this.keyframeResolver) == null || s.cancel());
  }
}
const L1 = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function H1(a) {
  const s = L1.exec(a);
  if (!s) return [,];
  const [, l, o, c] = s;
  return [`--${l ?? o}`, c];
}
function oy(a, s, l = 1) {
  const [o, c] = H1(a);
  if (!o) return;
  const f = window.getComputedStyle(s).getPropertyValue(o);
  if (f) {
    const d = f.trim();
    return jp(d) ? parseFloat(d) : d;
  }
  return Dc(c) ? oy(c, s, l + 1) : c;
}
function Lc(a, s) {
  return (a == null ? void 0 : a[s]) ?? (a == null ? void 0 : a.default) ?? a;
}
const uy = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...fi,
  ]),
  G1 = { test: (a) => a === "auto", parse: (a) => a },
  cy = (a) => (s) => s.test(a),
  fy = [ci, it, Je, Hn, Ob, jb, G1],
  Sg = (a) => fy.find(cy(a));
function Y1(a) {
  return typeof a == "number"
    ? a === 0
    : a !== null
      ? a === "none" || a === "0" || wp(a)
      : !0;
}
const q1 = new Set(["brightness", "contrast", "saturate", "opacity"]);
function X1(a) {
  const [s, l] = a.slice(0, -1).split("(");
  if (s === "drop-shadow") return a;
  const [o] = l.match(Rc) || [];
  if (!o) return a;
  const c = l.replace(o, "");
  let f = q1.has(s) ? 1 : 0;
  return (o !== l && (f *= 100), s + "(" + f + c + ")");
}
const k1 = /\b([a-z-]*)\(.*?\)/gu,
  rc = {
    ...Yn,
    getAnimatableNone: (a) => {
      const s = a.match(k1);
      return s ? s.map(X1).join(" ") : a;
    },
  },
  Tg = { ...ci, transform: Math.round },
  Z1 = {
    rotate: Hn,
    rotateX: Hn,
    rotateY: Hn,
    rotateZ: Hn,
    scale: Jl,
    scaleX: Jl,
    scaleY: Jl,
    scaleZ: Jl,
    skew: Hn,
    skewX: Hn,
    skewY: Hn,
    distance: it,
    translateX: it,
    translateY: it,
    translateZ: it,
    x: it,
    y: it,
    z: it,
    perspective: it,
    transformPerspective: it,
    opacity: Ts,
    originX: ug,
    originY: ug,
    originZ: it,
  },
  Hc = {
    borderWidth: it,
    borderTopWidth: it,
    borderRightWidth: it,
    borderBottomWidth: it,
    borderLeftWidth: it,
    borderRadius: it,
    radius: it,
    borderTopLeftRadius: it,
    borderTopRightRadius: it,
    borderBottomRightRadius: it,
    borderBottomLeftRadius: it,
    width: it,
    maxWidth: it,
    height: it,
    maxHeight: it,
    top: it,
    right: it,
    bottom: it,
    left: it,
    padding: it,
    paddingTop: it,
    paddingRight: it,
    paddingBottom: it,
    paddingLeft: it,
    margin: it,
    marginTop: it,
    marginRight: it,
    marginBottom: it,
    marginLeft: it,
    backgroundPositionX: it,
    backgroundPositionY: it,
    ...Z1,
    zIndex: Tg,
    fillOpacity: Ts,
    strokeOpacity: Ts,
    numOctaves: Tg,
  },
  K1 = {
    ...Hc,
    color: qt,
    backgroundColor: qt,
    outlineColor: qt,
    fill: qt,
    stroke: qt,
    borderColor: qt,
    borderTopColor: qt,
    borderRightColor: qt,
    borderBottomColor: qt,
    borderLeftColor: qt,
    filter: rc,
    WebkitFilter: rc,
  },
  dy = (a) => K1[a];
function hy(a, s) {
  let l = dy(a);
  return (
    l !== rc && (l = Yn),
    l.getAnimatableNone ? l.getAnimatableNone(s) : void 0
  );
}
const Q1 = new Set(["auto", "none", "0"]);
function P1(a, s, l) {
  let o = 0,
    c;
  for (; o < a.length && !c; ) {
    const f = a[o];
    (typeof f == "string" && !Q1.has(f) && As(f).values.length && (c = a[o]),
      o++);
  }
  if (c && l) for (const f of s) a[f] = hy(l, c);
}
class J1 extends Uc {
  constructor(s, l, o, c, f) {
    super(s, l, o, c, f, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: s, element: l, name: o } = this;
    if (!l || !l.current) return;
    super.readKeyframes();
    for (let p = 0; p < s.length; p++) {
      let g = s[p];
      if (typeof g == "string" && ((g = g.trim()), Dc(g))) {
        const y = oy(g, l.current);
        (y !== void 0 && (s[p] = y),
          p === s.length - 1 && (this.finalKeyframe = g));
      }
    }
    if ((this.resolveNoneKeyframes(), !uy.has(o) || s.length !== 2)) return;
    const [c, f] = s,
      d = Sg(c),
      m = Sg(f);
    if (d !== m)
      if (yg(d) && yg(m))
        for (let p = 0; p < s.length; p++) {
          const g = s[p];
          typeof g == "string" && (s[p] = parseFloat(g));
        }
      else ma[o] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: s, name: l } = this,
      o = [];
    for (let c = 0; c < s.length; c++) (s[c] === null || Y1(s[c])) && o.push(c);
    o.length && P1(s, o, l);
  }
  measureInitialState() {
    const { element: s, unresolvedKeyframes: l, name: o } = this;
    if (!s || !s.current) return;
    (o === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = ma[o](
        s.measureViewportBox(),
        window.getComputedStyle(s.current),
      )),
      (l[0] = this.measuredOrigin));
    const c = l[l.length - 1];
    c !== void 0 && s.getValue(o, c).jump(c, !1);
  }
  measureEndState() {
    var m;
    const { element: s, name: l, unresolvedKeyframes: o } = this;
    if (!s || !s.current) return;
    const c = s.getValue(l);
    c && c.jump(this.measuredOrigin, !1);
    const f = o.length - 1,
      d = o[f];
    ((o[f] = ma[l](s.measureViewportBox(), window.getComputedStyle(s.current))),
      d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d),
      (m = this.removedTransforms) != null &&
        m.length &&
        this.removedTransforms.forEach(([p, g]) => {
          s.getValue(p).set(g);
        }),
      this.resolveNoneKeyframes());
  }
}
function F1(a, s, l) {
  if (a instanceof EventTarget) return [a];
  if (typeof a == "string") {
    let o = document;
    const c = (l == null ? void 0 : l[a]) ?? o.querySelectorAll(a);
    return c ? Array.from(c) : [];
  }
  return Array.from(a);
}
const my = (a, s) => (s && typeof a == "number" ? s.transform(a) : a),
  Ag = 30,
  $1 = (a) => !isNaN(parseFloat(a));
class W1 {
  constructor(s, l = {}) {
    ((this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (o, c = !0) => {
        var d, m;
        const f = he.now();
        if (
          (this.updatedAt !== f && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(o),
          this.current !== this.prev &&
            ((d = this.events.change) == null || d.notify(this.current),
            this.dependents))
        )
          for (const p of this.dependents) p.dirty();
        c &&
          ((m = this.events.renderRequest) == null || m.notify(this.current));
      }),
      (this.hasAnimated = !1),
      this.setCurrent(s),
      (this.owner = l.owner));
  }
  setCurrent(s) {
    ((this.current = s),
      (this.updatedAt = he.now()),
      this.canTrackVelocity === null &&
        s !== void 0 &&
        (this.canTrackVelocity = $1(this.current)));
  }
  setPrevFrameValue(s = this.current) {
    ((this.prevFrameValue = s), (this.prevUpdatedAt = this.updatedAt));
  }
  onChange(s) {
    return this.on("change", s);
  }
  on(s, l) {
    this.events[s] || (this.events[s] = new Ec());
    const o = this.events[s].add(l);
    return s === "change"
      ? () => {
          (o(),
            Vt.read(() => {
              this.events.change.getSize() || this.stop();
            }));
        }
      : o;
  }
  clearListeners() {
    for (const s in this.events) this.events[s].clear();
  }
  attach(s, l) {
    ((this.passiveEffect = s), (this.stopPassiveEffect = l));
  }
  set(s, l = !0) {
    !l || !this.passiveEffect
      ? this.updateAndNotify(s, l)
      : this.passiveEffect(s, this.updateAndNotify);
  }
  setWithVelocity(s, l, o) {
    (this.set(l),
      (this.prev = void 0),
      (this.prevFrameValue = s),
      (this.prevUpdatedAt = this.updatedAt - o));
  }
  jump(s, l = !0) {
    (this.updateAndNotify(s),
      (this.prev = s),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      l && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
  dirty() {
    var s;
    (s = this.events.change) == null || s.notify(this.current);
  }
  addDependent(s) {
    (this.dependents || (this.dependents = new Set()), this.dependents.add(s));
  }
  removeDependent(s) {
    this.dependents && this.dependents.delete(s);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const s = he.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      s - this.updatedAt > Ag
    )
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, Ag);
    return Vp(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
  }
  start(s) {
    return (
      this.stop(),
      new Promise((l) => {
        ((this.hasAnimated = !0),
          (this.animation = s(l)),
          this.events.animationStart && this.events.animationStart.notify());
      }).then(() => {
        (this.events.animationComplete &&
          this.events.animationComplete.notify(),
          this.clearAnimation());
      })
    );
  }
  stop() {
    (this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation());
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    var s, l;
    ((s = this.dependents) == null || s.clear(),
      (l = this.events.destroy) == null || l.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
}
function ri(a, s) {
  return new W1(a, s);
}
const { schedule: Gc } = kp(queueMicrotask, !1),
  Ge = { x: !1, y: !1 };
function gy() {
  return Ge.x || Ge.y;
}
function I1(a) {
  return a === "x" || a === "y"
    ? Ge[a]
      ? null
      : ((Ge[a] = !0),
        () => {
          Ge[a] = !1;
        })
    : Ge.x || Ge.y
      ? null
      : ((Ge.x = Ge.y = !0),
        () => {
          Ge.x = Ge.y = !1;
        });
}
function py(a, s) {
  const l = F1(a),
    o = new AbortController(),
    c = { passive: !0, ...s, signal: o.signal };
  return [l, c, () => o.abort()];
}
function Eg(a) {
  return !(a.pointerType === "touch" || gy());
}
function tS(a, s, l = {}) {
  const [o, c, f] = py(a, l),
    d = (m) => {
      if (!Eg(m)) return;
      const { target: p } = m,
        g = s(p, m);
      if (typeof g != "function" || !p) return;
      const y = (b) => {
        Eg(b) && (g(b), p.removeEventListener("pointerleave", y));
      };
      p.addEventListener("pointerleave", y, c);
    };
  return (
    o.forEach((m) => {
      m.addEventListener("pointerenter", d, c);
    }),
    f
  );
}
const yy = (a, s) => (s ? (a === s ? !0 : yy(a, s.parentElement)) : !1),
  Yc = (a) =>
    a.pointerType === "mouse"
      ? typeof a.button != "number" || a.button <= 0
      : a.isPrimary !== !1,
  eS = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function nS(a) {
  return eS.has(a.tagName) || a.tabIndex !== -1;
}
const tr = new WeakSet();
function Mg(a) {
  return (s) => {
    s.key === "Enter" && a(s);
  };
}
function Gu(a, s) {
  a.dispatchEvent(
    new PointerEvent("pointer" + s, { isPrimary: !0, bubbles: !0 }),
  );
}
const aS = (a, s) => {
  const l = a.currentTarget;
  if (!l) return;
  const o = Mg(() => {
    if (tr.has(l)) return;
    Gu(l, "down");
    const c = Mg(() => {
        Gu(l, "up");
      }),
      f = () => Gu(l, "cancel");
    (l.addEventListener("keyup", c, s), l.addEventListener("blur", f, s));
  });
  (l.addEventListener("keydown", o, s),
    l.addEventListener("blur", () => l.removeEventListener("keydown", o), s));
};
function Cg(a) {
  return Yc(a) && !gy();
}
function iS(a, s, l = {}) {
  const [o, c, f] = py(a, l),
    d = (m) => {
      const p = m.currentTarget;
      if (!Cg(m)) return;
      tr.add(p);
      const g = s(p, m),
        y = (M, U) => {
          (window.removeEventListener("pointerup", b),
            window.removeEventListener("pointercancel", S),
            tr.has(p) && tr.delete(p),
            Cg(M) && typeof g == "function" && g(M, { success: U }));
        },
        b = (M) => {
          y(
            M,
            p === window ||
              p === document ||
              l.useGlobalTarget ||
              yy(p, M.target),
          );
        },
        S = (M) => {
          y(M, !1);
        };
      (window.addEventListener("pointerup", b, c),
        window.addEventListener("pointercancel", S, c));
    };
  return (
    o.forEach((m) => {
      ((l.useGlobalTarget ? window : m).addEventListener("pointerdown", d, c),
        Bc(m) &&
          (m.addEventListener("focus", (g) => aS(g, c)),
          !nS(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0)));
    }),
    f
  );
}
function vy(a) {
  return Op(a) && "ownerSVGElement" in a;
}
function sS(a) {
  return vy(a) && a.tagName === "svg";
}
const se = (a) => !!(a && a.getVelocity),
  lS = [...fy, qt, Yn],
  rS = (a) => lS.find(cy(a)),
  qc = X.createContext({
    transformPagePoint: (a) => a,
    isStatic: !1,
    reducedMotion: "never",
  });
class oS extends X.Component {
  getSnapshotBeforeUpdate(s) {
    const l = this.props.childRef.current;
    if (l && s.isPresent && !this.props.isPresent) {
      const o = l.offsetParent,
        c = (Bc(o) && o.offsetWidth) || 0,
        f = this.props.sizeRef.current;
      ((f.height = l.offsetHeight || 0),
        (f.width = l.offsetWidth || 0),
        (f.top = l.offsetTop),
        (f.left = l.offsetLeft),
        (f.right = c - f.width - f.left));
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function uS({ children: a, isPresent: s, anchorX: l }) {
  const o = X.useId(),
    c = X.useRef(null),
    f = X.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0 }),
    { nonce: d } = X.useContext(qc);
  return (
    X.useInsertionEffect(() => {
      const { width: m, height: p, top: g, left: y, right: b } = f.current;
      if (s || !c.current || !m || !p) return;
      const S = l === "left" ? `left: ${y}` : `right: ${b}`;
      c.current.dataset.motionPopId = o;
      const M = document.createElement("style");
      return (
        d && (M.nonce = d),
        document.head.appendChild(M),
        M.sheet &&
          M.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${m}px !important;
            height: ${p}px !important;
            ${S}px !important;
            top: ${g}px !important;
          }
        `),
        () => {
          document.head.contains(M) && document.head.removeChild(M);
        }
      );
    }, [s]),
    x.jsx(oS, {
      isPresent: s,
      childRef: c,
      sizeRef: f,
      children: X.cloneElement(a, { ref: c }),
    })
  );
}
const cS = ({
  children: a,
  initial: s,
  isPresent: l,
  onExitComplete: o,
  custom: c,
  presenceAffectsLayout: f,
  mode: d,
  anchorX: m,
}) => {
  const p = vc(fS),
    g = X.useId();
  let y = !0,
    b = X.useMemo(
      () => (
        (y = !1),
        {
          id: g,
          initial: s,
          isPresent: l,
          custom: c,
          onExitComplete: (S) => {
            p.set(S, !0);
            for (const M of p.values()) if (!M) return;
            o && o();
          },
          register: (S) => (p.set(S, !1), () => p.delete(S)),
        }
      ),
      [l, p, o],
    );
  return (
    f && y && (b = { ...b }),
    X.useMemo(() => {
      p.forEach((S, M) => p.set(M, !1));
    }, [l]),
    X.useEffect(() => {
      !l && !p.size && o && o();
    }, [l]),
    d === "popLayout" &&
      (a = x.jsx(uS, { isPresent: l, anchorX: m, children: a })),
    x.jsx(ur.Provider, { value: b, children: a })
  );
};
function fS() {
  return new Map();
}
function xy(a = !0) {
  const s = X.useContext(ur);
  if (s === null) return [!0, null];
  const { isPresent: l, onExitComplete: o, register: c } = s,
    f = X.useId();
  X.useEffect(() => {
    if (a) return c(f);
  }, [a]);
  const d = X.useCallback(() => a && o && o(f), [f, o, a]);
  return !l && o ? [!1, d] : [!0];
}
const Fl = (a) => a.key || "";
function Ng(a) {
  const s = [];
  return (
    X.Children.forEach(a, (l) => {
      X.isValidElement(l) && s.push(l);
    }),
    s
  );
}
const dS = ({
    children: a,
    custom: s,
    initial: l = !0,
    onExitComplete: o,
    presenceAffectsLayout: c = !0,
    mode: f = "sync",
    propagate: d = !1,
    anchorX: m = "left",
  }) => {
    const [p, g] = xy(d),
      y = X.useMemo(() => Ng(a), [a]),
      b = d && !p ? [] : y.map(Fl),
      S = X.useRef(!0),
      M = X.useRef(y),
      U = vc(() => new Map()),
      [V, w] = X.useState(y),
      [k, Z] = X.useState(y);
    Rp(() => {
      ((S.current = !1), (M.current = y));
      for (let G = 0; G < k.length; G++) {
        const Q = Fl(k[G]);
        b.includes(Q) ? U.delete(Q) : U.get(Q) !== !0 && U.set(Q, !1);
      }
    }, [k, b.length, b.join("-")]);
    const C = [];
    if (y !== V) {
      let G = [...y];
      for (let Q = 0; Q < k.length; Q++) {
        const W = k[Q],
          F = Fl(W);
        b.includes(F) || (G.splice(Q, 0, W), C.push(W));
      }
      return (f === "wait" && C.length && (G = C), Z(Ng(G)), w(y), null);
    }
    const { forceRender: q } = X.useContext(yc);
    return x.jsx(x.Fragment, {
      children: k.map((G) => {
        const Q = Fl(G),
          W = d && !p ? !1 : y === k || b.includes(Q),
          F = () => {
            if (U.has(Q)) U.set(Q, !0);
            else return;
            let ot = !0;
            (U.forEach((bt) => {
              bt || (ot = !1);
            }),
              ot &&
                (q == null || q(),
                Z(M.current),
                d && (g == null || g()),
                o && o()));
          };
        return x.jsx(
          cS,
          {
            isPresent: W,
            initial: !S.current || l ? void 0 : !1,
            custom: s,
            presenceAffectsLayout: c,
            mode: f,
            onExitComplete: W ? void 0 : F,
            anchorX: m,
            children: G,
          },
          Q,
        );
      }),
    });
  },
  by = X.createContext({ strict: !1 }),
  Dg = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  oi = {};
for (const a in Dg) oi[a] = { isEnabled: (s) => Dg[a].some((l) => !!s[l]) };
function hS(a) {
  for (const s in a) oi[s] = { ...oi[s], ...a[s] };
}
const mS = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function lr(a) {
  return (
    a.startsWith("while") ||
    (a.startsWith("drag") && a !== "draggable") ||
    a.startsWith("layout") ||
    a.startsWith("onTap") ||
    a.startsWith("onPan") ||
    a.startsWith("onLayout") ||
    mS.has(a)
  );
}
let Sy = (a) => !lr(a);
function gS(a) {
  typeof a == "function" && (Sy = (s) => (s.startsWith("on") ? !lr(s) : a(s)));
}
try {
  gS(require("@emotion/is-prop-valid").default);
} catch {}
function pS(a, s, l) {
  const o = {};
  for (const c in a)
    (c === "values" && typeof a.values == "object") ||
      ((Sy(c) ||
        (l === !0 && lr(c)) ||
        (!s && !lr(c)) ||
        (a.draggable && c.startsWith("onDrag"))) &&
        (o[c] = a[c]));
  return o;
}
function yS(a) {
  if (typeof Proxy > "u") return a;
  const s = new Map(),
    l = (...o) => a(...o);
  return new Proxy(l, {
    get: (o, c) =>
      c === "create" ? a : (s.has(c) || s.set(c, a(c)), s.get(c)),
  });
}
const cr = X.createContext({});
function fr(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function Es(a) {
  return typeof a == "string" || Array.isArray(a);
}
const Xc = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  kc = ["initial", ...Xc];
function dr(a) {
  return fr(a.animate) || kc.some((s) => Es(a[s]));
}
function Ty(a) {
  return !!(dr(a) || a.variants);
}
function vS(a, s) {
  if (dr(a)) {
    const { initial: l, animate: o } = a;
    return {
      initial: l === !1 || Es(l) ? l : void 0,
      animate: Es(o) ? o : void 0,
    };
  }
  return a.inherit !== !1 ? s : {};
}
function xS(a) {
  const { initial: s, animate: l } = vS(a, X.useContext(cr));
  return X.useMemo(() => ({ initial: s, animate: l }), [Rg(s), Rg(l)]);
}
function Rg(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const bS = Symbol.for("motionComponentSymbol");
function ai(a) {
  return (
    a &&
    typeof a == "object" &&
    Object.prototype.hasOwnProperty.call(a, "current")
  );
}
function SS(a, s, l) {
  return X.useCallback(
    (o) => {
      (o && a.onMount && a.onMount(o),
        s && (o ? s.mount(o) : s.unmount()),
        l && (typeof l == "function" ? l(o) : ai(l) && (l.current = o)));
    },
    [s],
  );
}
const Zc = (a) => a.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  TS = "framerAppearId",
  Ay = "data-" + Zc(TS),
  Ey = X.createContext({});
function AS(a, s, l, o, c) {
  var V, w;
  const { visualElement: f } = X.useContext(cr),
    d = X.useContext(by),
    m = X.useContext(ur),
    p = X.useContext(qc).reducedMotion,
    g = X.useRef(null);
  ((o = o || d.renderer),
    !g.current &&
      o &&
      (g.current = o(a, {
        visualState: s,
        parent: f,
        props: l,
        presenceContext: m,
        blockInitialAnimation: m ? m.initial === !1 : !1,
        reducedMotionConfig: p,
      })));
  const y = g.current,
    b = X.useContext(Ey);
  y &&
    !y.projection &&
    c &&
    (y.type === "html" || y.type === "svg") &&
    ES(g.current, l, c, b);
  const S = X.useRef(!1);
  X.useInsertionEffect(() => {
    y && S.current && y.update(l, m);
  });
  const M = l[Ay],
    U = X.useRef(
      !!M &&
        !((V = window.MotionHandoffIsComplete) != null && V.call(window, M)) &&
        ((w = window.MotionHasOptimisedAnimation) == null
          ? void 0
          : w.call(window, M)),
    );
  return (
    Rp(() => {
      y &&
        ((S.current = !0),
        (window.MotionIsMounted = !0),
        y.updateFeatures(),
        Gc.render(y.render),
        U.current && y.animationState && y.animationState.animateChanges());
    }),
    X.useEffect(() => {
      y &&
        (!U.current && y.animationState && y.animationState.animateChanges(),
        U.current &&
          (queueMicrotask(() => {
            var k;
            (k = window.MotionHandoffMarkAsComplete) == null ||
              k.call(window, M);
          }),
          (U.current = !1)));
    }),
    y
  );
}
function ES(a, s, l, o) {
  const {
    layoutId: c,
    layout: f,
    drag: d,
    dragConstraints: m,
    layoutScroll: p,
    layoutRoot: g,
    layoutCrossfade: y,
  } = s;
  ((a.projection = new l(
    a.latestValues,
    s["data-framer-portal-id"] ? void 0 : My(a.parent),
  )),
    a.projection.setOptions({
      layoutId: c,
      layout: f,
      alwaysMeasureLayout: !!d || (m && ai(m)),
      visualElement: a,
      animationType: typeof f == "string" ? f : "both",
      initialPromotionConfig: o,
      crossfade: y,
      layoutScroll: p,
      layoutRoot: g,
    }));
}
function My(a) {
  if (a) return a.options.allowProjection !== !1 ? a.projection : My(a.parent);
}
function MS({
  preloadedFeatures: a,
  createVisualElement: s,
  useRender: l,
  useVisualState: o,
  Component: c,
}) {
  a && hS(a);
  function f(m, p) {
    let g;
    const y = { ...X.useContext(qc), ...m, layoutId: CS(m) },
      { isStatic: b } = y,
      S = xS(m),
      M = o(m, b);
    if (!b && xc) {
      NS();
      const U = DS(y);
      ((g = U.MeasureLayout),
        (S.visualElement = AS(c, M, y, s, U.ProjectionNode)));
    }
    return x.jsxs(cr.Provider, {
      value: S,
      children: [
        g && S.visualElement
          ? x.jsx(g, { visualElement: S.visualElement, ...y })
          : null,
        l(c, m, SS(M, S.visualElement, p), M, b, S.visualElement),
      ],
    });
  }
  f.displayName = `motion.${typeof c == "string" ? c : `create(${c.displayName ?? c.name ?? ""})`}`;
  const d = X.forwardRef(f);
  return ((d[bS] = c), d);
}
function CS({ layoutId: a }) {
  const s = X.useContext(yc).id;
  return s && a !== void 0 ? s + "-" + a : a;
}
function NS(a, s) {
  X.useContext(by).strict;
}
function DS(a) {
  const { drag: s, layout: l } = oi;
  if (!s && !l) return {};
  const o = { ...s, ...l };
  return {
    MeasureLayout:
      (s != null && s.isEnabled(a)) || (l != null && l.isEnabled(a))
        ? o.MeasureLayout
        : void 0,
    ProjectionNode: o.ProjectionNode,
  };
}
const Ms = {};
function RS(a) {
  for (const s in a) ((Ms[s] = a[s]), Nc(s) && (Ms[s].isCSSVariable = !0));
}
function Cy(a, { layout: s, layoutId: l }) {
  return (
    di.has(a) ||
    a.startsWith("origin") ||
    ((s || l !== void 0) && (!!Ms[a] || a === "opacity"))
  );
}
const jS = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  OS = fi.length;
function wS(a, s, l) {
  let o = "",
    c = !0;
  for (let f = 0; f < OS; f++) {
    const d = fi[f],
      m = a[d];
    if (m === void 0) continue;
    let p = !0;
    if (
      (typeof m == "number"
        ? (p = m === (d.startsWith("scale") ? 1 : 0))
        : (p = parseFloat(m) === 0),
      !p || l)
    ) {
      const g = my(m, Hc[d]);
      if (!p) {
        c = !1;
        const y = jS[d] || d;
        o += `${y}(${g}) `;
      }
      l && (s[d] = g);
    }
  }
  return ((o = o.trim()), l ? (o = l(s, c ? "" : o)) : c && (o = "none"), o);
}
function Kc(a, s, l) {
  const { style: o, vars: c, transformOrigin: f } = a;
  let d = !1,
    m = !1;
  for (const p in s) {
    const g = s[p];
    if (di.has(p)) {
      d = !0;
      continue;
    } else if (Nc(p)) {
      c[p] = g;
      continue;
    } else {
      const y = my(g, Hc[p]);
      p.startsWith("origin") ? ((m = !0), (f[p] = y)) : (o[p] = y);
    }
  }
  if (
    (s.transform ||
      (d || l
        ? (o.transform = wS(s, a.transform, l))
        : o.transform && (o.transform = "none")),
    m)
  ) {
    const { originX: p = "50%", originY: g = "50%", originZ: y = 0 } = f;
    o.transformOrigin = `${p} ${g} ${y}`;
  }
}
const Qc = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function Ny(a, s, l) {
  for (const o in s) !se(s[o]) && !Cy(o, l) && (a[o] = s[o]);
}
function VS({ transformTemplate: a }, s) {
  return X.useMemo(() => {
    const l = Qc();
    return (Kc(l, s, a), Object.assign({}, l.vars, l.style));
  }, [s]);
}
function zS(a, s) {
  const l = a.style || {},
    o = {};
  return (Ny(o, l, a), Object.assign(o, VS(a, s)), o);
}
function _S(a, s) {
  const l = {},
    o = zS(a, s);
  return (
    a.drag &&
      a.dragListener !== !1 &&
      ((l.draggable = !1),
      (o.userSelect = o.WebkitUserSelect = o.WebkitTouchCallout = "none"),
      (o.touchAction =
        a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`)),
    a.tabIndex === void 0 &&
      (a.onTap || a.onTapStart || a.whileTap) &&
      (l.tabIndex = 0),
    (l.style = o),
    l
  );
}
const US = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  BS = { offset: "strokeDashoffset", array: "strokeDasharray" };
function LS(a, s, l = 1, o = 0, c = !0) {
  a.pathLength = 1;
  const f = c ? US : BS;
  a[f.offset] = it.transform(-o);
  const d = it.transform(s),
    m = it.transform(l);
  a[f.array] = `${d} ${m}`;
}
function Dy(
  a,
  {
    attrX: s,
    attrY: l,
    attrScale: o,
    pathLength: c,
    pathSpacing: f = 1,
    pathOffset: d = 0,
    ...m
  },
  p,
  g,
  y,
) {
  if ((Kc(a, m, g), p)) {
    a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
    return;
  }
  ((a.attrs = a.style), (a.style = {}));
  const { attrs: b, style: S } = a;
  (b.transform && ((S.transform = b.transform), delete b.transform),
    (S.transform || b.transformOrigin) &&
      ((S.transformOrigin = b.transformOrigin ?? "50% 50%"),
      delete b.transformOrigin),
    S.transform &&
      ((S.transformBox = (y == null ? void 0 : y.transformBox) ?? "fill-box"),
      delete b.transformBox),
    s !== void 0 && (b.x = s),
    l !== void 0 && (b.y = l),
    o !== void 0 && (b.scale = o),
    c !== void 0 && LS(b, c, f, d, !1));
}
const Ry = () => ({ ...Qc(), attrs: {} }),
  jy = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function HS(a, s, l, o) {
  const c = X.useMemo(() => {
    const f = Ry();
    return (
      Dy(f, s, jy(o), a.transformTemplate, a.style),
      { ...f.attrs, style: { ...f.style } }
    );
  }, [s]);
  if (a.style) {
    const f = {};
    (Ny(f, a.style, a), (c.style = { ...f, ...c.style }));
  }
  return c;
}
const GS = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function Pc(a) {
  return typeof a != "string" || a.includes("-")
    ? !1
    : !!(GS.indexOf(a) > -1 || /[A-Z]/u.test(a));
}
function YS(a = !1) {
  return (l, o, c, { latestValues: f }, d) => {
    const p = (Pc(l) ? HS : _S)(o, f, d, l),
      g = pS(o, typeof l == "string", a),
      y = l !== X.Fragment ? { ...g, ...p, ref: c } : {},
      { children: b } = o,
      S = X.useMemo(() => (se(b) ? b.get() : b), [b]);
    return X.createElement(l, { ...y, children: S });
  };
}
function jg(a) {
  const s = [{}, {}];
  return (
    a == null ||
      a.values.forEach((l, o) => {
        ((s[0][o] = l.get()), (s[1][o] = l.getVelocity()));
      }),
    s
  );
}
function Jc(a, s, l, o) {
  if (typeof s == "function") {
    const [c, f] = jg(o);
    s = s(l !== void 0 ? l : a.custom, c, f);
  }
  if (
    (typeof s == "string" && (s = a.variants && a.variants[s]),
    typeof s == "function")
  ) {
    const [c, f] = jg(o);
    s = s(l !== void 0 ? l : a.custom, c, f);
  }
  return s;
}
function er(a) {
  return se(a) ? a.get() : a;
}
function qS({ scrapeMotionValuesFromProps: a, createRenderState: s }, l, o, c) {
  return { latestValues: XS(l, o, c, a), renderState: s() };
}
const Oy = (a) => (s, l) => {
  const o = X.useContext(cr),
    c = X.useContext(ur),
    f = () => qS(a, s, o, c);
  return l ? f() : vc(f);
};
function XS(a, s, l, o) {
  const c = {},
    f = o(a, {});
  for (const S in f) c[S] = er(f[S]);
  let { initial: d, animate: m } = a;
  const p = dr(a),
    g = Ty(a);
  s &&
    g &&
    !p &&
    a.inherit !== !1 &&
    (d === void 0 && (d = s.initial), m === void 0 && (m = s.animate));
  let y = l ? l.initial === !1 : !1;
  y = y || d === !1;
  const b = y ? m : d;
  if (b && typeof b != "boolean" && !fr(b)) {
    const S = Array.isArray(b) ? b : [b];
    for (let M = 0; M < S.length; M++) {
      const U = Jc(a, S[M]);
      if (U) {
        const { transitionEnd: V, transition: w, ...k } = U;
        for (const Z in k) {
          let C = k[Z];
          if (Array.isArray(C)) {
            const q = y ? C.length - 1 : 0;
            C = C[q];
          }
          C !== null && (c[Z] = C);
        }
        for (const Z in V) c[Z] = V[Z];
      }
    }
  }
  return c;
}
function Fc(a, s, l) {
  var f;
  const { style: o } = a,
    c = {};
  for (const d in o)
    (se(o[d]) ||
      (s.style && se(s.style[d])) ||
      Cy(d, a) ||
      ((f = l == null ? void 0 : l.getValue(d)) == null
        ? void 0
        : f.liveStyle) !== void 0) &&
      (c[d] = o[d]);
  return c;
}
const kS = {
  useVisualState: Oy({
    scrapeMotionValuesFromProps: Fc,
    createRenderState: Qc,
  }),
};
function wy(a, s, l) {
  const o = Fc(a, s, l);
  for (const c in a)
    if (se(a[c]) || se(s[c])) {
      const f =
        fi.indexOf(c) !== -1
          ? "attr" + c.charAt(0).toUpperCase() + c.substring(1)
          : c;
      o[f] = a[c];
    }
  return o;
}
const ZS = {
  useVisualState: Oy({
    scrapeMotionValuesFromProps: wy,
    createRenderState: Ry,
  }),
};
function KS(a, s) {
  return function (o, { forwardMotionProps: c } = { forwardMotionProps: !1 }) {
    const d = {
      ...(Pc(o) ? ZS : kS),
      preloadedFeatures: a,
      useRender: YS(c),
      createVisualElement: s,
      Component: o,
    };
    return MS(d);
  };
}
function Cs(a, s, l) {
  const o = a.getProps();
  return Jc(o, s, l !== void 0 ? l : o.custom, a);
}
const oc = (a) => Array.isArray(a);
function QS(a, s, l) {
  a.hasValue(s) ? a.getValue(s).set(l) : a.addValue(s, ri(l));
}
function PS(a) {
  return oc(a) ? a[a.length - 1] || 0 : a;
}
function JS(a, s) {
  const l = Cs(a, s);
  let { transitionEnd: o = {}, transition: c = {}, ...f } = l || {};
  f = { ...f, ...o };
  for (const d in f) {
    const m = PS(f[d]);
    QS(a, d, m);
  }
}
function FS(a) {
  return !!(se(a) && a.add);
}
function uc(a, s) {
  const l = a.getValue("willChange");
  if (FS(l)) return l.add(s);
  if (!l && hn.WillChange) {
    const o = new hn.WillChange("auto");
    (a.addValue("willChange", o), o.add(s));
  }
}
function Vy(a) {
  return a.props[Ay];
}
const $S = (a) => a !== null;
function WS(a, { repeat: s, repeatType: l = "loop" }, o) {
  const c = a.filter($S),
    f = s && l !== "loop" && s % 2 === 1 ? 0 : c.length - 1;
  return c[f];
}
const IS = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  tT = (a) => ({
    type: "spring",
    stiffness: 550,
    damping: a === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  eT = { type: "keyframes", duration: 0.8 },
  nT = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  aT = (a, { keyframes: s }) =>
    s.length > 2
      ? eT
      : di.has(a)
        ? a.startsWith("scale")
          ? tT(s[1])
          : IS
        : nT;
function iT({
  when: a,
  delay: s,
  delayChildren: l,
  staggerChildren: o,
  staggerDirection: c,
  repeat: f,
  repeatType: d,
  repeatDelay: m,
  from: p,
  elapsed: g,
  ...y
}) {
  return !!Object.keys(y).length;
}
const $c =
  (a, s, l, o = {}, c, f) =>
  (d) => {
    const m = Lc(o, a) || {},
      p = m.delay || o.delay || 0;
    let { elapsed: g = 0 } = o;
    g = g - Qe(p);
    const y = {
      keyframes: Array.isArray(l) ? l : [null, l],
      ease: "easeOut",
      velocity: s.getVelocity(),
      ...m,
      delay: -g,
      onUpdate: (S) => {
        (s.set(S), m.onUpdate && m.onUpdate(S));
      },
      onComplete: () => {
        (d(), m.onComplete && m.onComplete());
      },
      name: a,
      motionValue: s,
      element: f ? void 0 : c,
    };
    (iT(m) || Object.assign(y, aT(a, y)),
      y.duration && (y.duration = Qe(y.duration)),
      y.repeatDelay && (y.repeatDelay = Qe(y.repeatDelay)),
      y.from !== void 0 && (y.keyframes[0] = y.from));
    let b = !1;
    if (
      ((y.type === !1 || (y.duration === 0 && !y.repeatDelay)) &&
        ((y.duration = 0), y.delay === 0 && (b = !0)),
      (hn.instantAnimations || hn.skipAnimations) &&
        ((b = !0), (y.duration = 0), (y.delay = 0)),
      (y.allowFlatten = !m.type && !m.ease),
      b && !f && s.get() !== void 0)
    ) {
      const S = WS(y.keyframes, m);
      if (S !== void 0) {
        Vt.update(() => {
          (y.onUpdate(S), y.onComplete());
        });
        return;
      }
    }
    return m.isSync ? new _c(y) : new B1(y);
  };
function sT({ protectedKeys: a, needsAnimating: s }, l) {
  const o = a.hasOwnProperty(l) && s[l] !== !0;
  return ((s[l] = !1), o);
}
function zy(a, s, { delay: l = 0, transitionOverride: o, type: c } = {}) {
  let { transition: f = a.getDefaultTransition(), transitionEnd: d, ...m } = s;
  o && (f = o);
  const p = [],
    g = c && a.animationState && a.animationState.getState()[c];
  for (const y in m) {
    const b = a.getValue(y, a.latestValues[y] ?? null),
      S = m[y];
    if (S === void 0 || (g && sT(g, y))) continue;
    const M = { delay: l, ...Lc(f || {}, y) },
      U = b.get();
    if (
      U !== void 0 &&
      !b.isAnimating &&
      !Array.isArray(S) &&
      S === U &&
      !M.velocity
    )
      continue;
    let V = !1;
    if (window.MotionHandoffAnimation) {
      const k = Vy(a);
      if (k) {
        const Z = window.MotionHandoffAnimation(k, y, Vt);
        Z !== null && ((M.startTime = Z), (V = !0));
      }
    }
    (uc(a, y),
      b.start(
        $c(y, b, S, a.shouldReduceMotion && uy.has(y) ? { type: !1 } : M, a, V),
      ));
    const w = b.animation;
    w && p.push(w);
  }
  return (
    d &&
      Promise.all(p).then(() => {
        Vt.update(() => {
          d && JS(a, d);
        });
      }),
    p
  );
}
function cc(a, s, l = {}) {
  var p;
  const o = Cs(
    a,
    s,
    l.type === "exit"
      ? (p = a.presenceContext) == null
        ? void 0
        : p.custom
      : void 0,
  );
  let { transition: c = a.getDefaultTransition() || {} } = o || {};
  l.transitionOverride && (c = l.transitionOverride);
  const f = o ? () => Promise.all(zy(a, o, l)) : () => Promise.resolve(),
    d =
      a.variantChildren && a.variantChildren.size
        ? (g = 0) => {
            const {
              delayChildren: y = 0,
              staggerChildren: b,
              staggerDirection: S,
            } = c;
            return lT(a, s, y + g, b, S, l);
          }
        : () => Promise.resolve(),
    { when: m } = c;
  if (m) {
    const [g, y] = m === "beforeChildren" ? [f, d] : [d, f];
    return g().then(() => y());
  } else return Promise.all([f(), d(l.delay)]);
}
function lT(a, s, l = 0, o = 0, c = 1, f) {
  const d = [],
    m = (a.variantChildren.size - 1) * o,
    p = c === 1 ? (g = 0) => g * o : (g = 0) => m - g * o;
  return (
    Array.from(a.variantChildren)
      .sort(rT)
      .forEach((g, y) => {
        (g.notify("AnimationStart", s),
          d.push(
            cc(g, s, { ...f, delay: l + p(y) }).then(() =>
              g.notify("AnimationComplete", s),
            ),
          ));
      }),
    Promise.all(d)
  );
}
function rT(a, s) {
  return a.sortNodePosition(s);
}
function oT(a, s, l = {}) {
  a.notify("AnimationStart", s);
  let o;
  if (Array.isArray(s)) {
    const c = s.map((f) => cc(a, f, l));
    o = Promise.all(c);
  } else if (typeof s == "string") o = cc(a, s, l);
  else {
    const c = typeof s == "function" ? Cs(a, s, l.custom) : s;
    o = Promise.all(zy(a, c, l));
  }
  return o.then(() => {
    a.notify("AnimationComplete", s);
  });
}
function _y(a, s) {
  if (!Array.isArray(s)) return !1;
  const l = s.length;
  if (l !== a.length) return !1;
  for (let o = 0; o < l; o++) if (s[o] !== a[o]) return !1;
  return !0;
}
const uT = kc.length;
function Uy(a) {
  if (!a) return;
  if (!a.isControllingVariants) {
    const l = a.parent ? Uy(a.parent) || {} : {};
    return (a.props.initial !== void 0 && (l.initial = a.props.initial), l);
  }
  const s = {};
  for (let l = 0; l < uT; l++) {
    const o = kc[l],
      c = a.props[o];
    (Es(c) || c === !1) && (s[o] = c);
  }
  return s;
}
const cT = [...Xc].reverse(),
  fT = Xc.length;
function dT(a) {
  return (s) =>
    Promise.all(s.map(({ animation: l, options: o }) => oT(a, l, o)));
}
function hT(a) {
  let s = dT(a),
    l = Og(),
    o = !0;
  const c = (p) => (g, y) => {
    var S;
    const b = Cs(
      a,
      y,
      p === "exit"
        ? (S = a.presenceContext) == null
          ? void 0
          : S.custom
        : void 0,
    );
    if (b) {
      const { transition: M, transitionEnd: U, ...V } = b;
      g = { ...g, ...V, ...U };
    }
    return g;
  };
  function f(p) {
    s = p(a);
  }
  function d(p) {
    const { props: g } = a,
      y = Uy(a.parent) || {},
      b = [],
      S = new Set();
    let M = {},
      U = 1 / 0;
    for (let w = 0; w < fT; w++) {
      const k = cT[w],
        Z = l[k],
        C = g[k] !== void 0 ? g[k] : y[k],
        q = Es(C),
        G = k === p ? Z.isActive : null;
      G === !1 && (U = w);
      let Q = C === y[k] && C !== g[k] && q;
      if (
        (Q && o && a.manuallyAnimateOnMount && (Q = !1),
        (Z.protectedKeys = { ...M }),
        (!Z.isActive && G === null) ||
          (!C && !Z.prevProp) ||
          fr(C) ||
          typeof C == "boolean")
      )
        continue;
      const W = mT(Z.prevProp, C);
      let F = W || (k === p && Z.isActive && !Q && q) || (w > U && q),
        ot = !1;
      const bt = Array.isArray(C) ? C : [C];
      let Nt = bt.reduce(c(k), {});
      G === !1 && (Nt = {});
      const { prevResolvedValues: mt = {} } = Z,
        Ft = { ...mt, ...Nt },
        Zt = (B) => {
          ((F = !0),
            S.has(B) && ((ot = !0), S.delete(B)),
            (Z.needsAnimating[B] = !0));
          const K = a.getValue(B);
          K && (K.liveStyle = !1);
        };
      for (const B in Ft) {
        const K = Nt[B],
          st = mt[B];
        if (M.hasOwnProperty(B)) continue;
        let A = !1;
        (oc(K) && oc(st) ? (A = !_y(K, st)) : (A = K !== st),
          A
            ? K != null
              ? Zt(B)
              : S.add(B)
            : K !== void 0 && S.has(B)
              ? Zt(B)
              : (Z.protectedKeys[B] = !0));
      }
      ((Z.prevProp = C),
        (Z.prevResolvedValues = Nt),
        Z.isActive && (M = { ...M, ...Nt }),
        o && a.blockInitialAnimation && (F = !1),
        F &&
          (!(Q && W) || ot) &&
          b.push(...bt.map((B) => ({ animation: B, options: { type: k } }))));
    }
    if (S.size) {
      const w = {};
      if (typeof g.initial != "boolean") {
        const k = Cs(a, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        k && k.transition && (w.transition = k.transition);
      }
      (S.forEach((k) => {
        const Z = a.getBaseTarget(k),
          C = a.getValue(k);
        (C && (C.liveStyle = !0), (w[k] = Z ?? null));
      }),
        b.push({ animation: w }));
    }
    let V = !!b.length;
    return (
      o &&
        (g.initial === !1 || g.initial === g.animate) &&
        !a.manuallyAnimateOnMount &&
        (V = !1),
      (o = !1),
      V ? s(b) : Promise.resolve()
    );
  }
  function m(p, g) {
    var b;
    if (l[p].isActive === g) return Promise.resolve();
    ((b = a.variantChildren) == null ||
      b.forEach((S) => {
        var M;
        return (M = S.animationState) == null ? void 0 : M.setActive(p, g);
      }),
      (l[p].isActive = g));
    const y = d(p);
    for (const S in l) l[S].protectedKeys = {};
    return y;
  }
  return {
    animateChanges: d,
    setActive: m,
    setAnimateFunction: f,
    getState: () => l,
    reset: () => {
      ((l = Og()), (o = !0));
    },
  };
}
function mT(a, s) {
  return typeof s == "string" ? s !== a : Array.isArray(s) ? !_y(s, a) : !1;
}
function oa(a = !1) {
  return {
    isActive: a,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function Og() {
  return {
    animate: oa(!0),
    whileInView: oa(),
    whileHover: oa(),
    whileTap: oa(),
    whileDrag: oa(),
    whileFocus: oa(),
    exit: oa(),
  };
}
class qn {
  constructor(s) {
    ((this.isMounted = !1), (this.node = s));
  }
  update() {}
}
class gT extends qn {
  constructor(s) {
    (super(s), s.animationState || (s.animationState = hT(s)));
  }
  updateAnimationControlsSubscription() {
    const { animate: s } = this.node.getProps();
    fr(s) && (this.unmountControls = s.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: s } = this.node.getProps(),
      { animate: l } = this.node.prevProps || {};
    s !== l && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var s;
    (this.node.animationState.reset(),
      (s = this.unmountControls) == null || s.call(this));
  }
}
let pT = 0;
class yT extends qn {
  constructor() {
    (super(...arguments), (this.id = pT++));
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: s, onExitComplete: l } = this.node.presenceContext,
      { isPresent: o } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || s === o) return;
    const c = this.node.animationState.setActive("exit", !s);
    l &&
      !s &&
      c.then(() => {
        l(this.id);
      });
  }
  mount() {
    const { register: s, onExitComplete: l } = this.node.presenceContext || {};
    (l && l(this.id), s && (this.unmount = s(this.id)));
  }
  unmount() {}
}
const vT = { animation: { Feature: gT }, exit: { Feature: yT } };
function Ns(a, s, l, o = { passive: !0 }) {
  return (a.addEventListener(s, l, o), () => a.removeEventListener(s, l));
}
function Os(a) {
  return { point: { x: a.pageX, y: a.pageY } };
}
const xT = (a) => (s) => Yc(s) && a(s, Os(s));
function ys(a, s, l, o) {
  return Ns(a, s, xT(l), o);
}
function By({ top: a, left: s, right: l, bottom: o }) {
  return { x: { min: s, max: l }, y: { min: a, max: o } };
}
function bT({ x: a, y: s }) {
  return { top: s.min, right: a.max, bottom: s.max, left: a.min };
}
function ST(a, s) {
  if (!s) return a;
  const l = s({ x: a.left, y: a.top }),
    o = s({ x: a.right, y: a.bottom });
  return { top: l.y, left: l.x, bottom: o.y, right: o.x };
}
const Ly = 1e-4,
  TT = 1 - Ly,
  AT = 1 + Ly,
  Hy = 0.01,
  ET = 0 - Hy,
  MT = 0 + Hy;
function re(a) {
  return a.max - a.min;
}
function CT(a, s, l) {
  return Math.abs(a - s) <= l;
}
function wg(a, s, l, o = 0.5) {
  ((a.origin = o),
    (a.originPoint = wt(s.min, s.max, a.origin)),
    (a.scale = re(l) / re(s)),
    (a.translate = wt(l.min, l.max, a.origin) - a.originPoint),
    ((a.scale >= TT && a.scale <= AT) || isNaN(a.scale)) && (a.scale = 1),
    ((a.translate >= ET && a.translate <= MT) || isNaN(a.translate)) &&
      (a.translate = 0));
}
function vs(a, s, l, o) {
  (wg(a.x, s.x, l.x, o ? o.originX : void 0),
    wg(a.y, s.y, l.y, o ? o.originY : void 0));
}
function Vg(a, s, l) {
  ((a.min = l.min + s.min), (a.max = a.min + re(s)));
}
function NT(a, s, l) {
  (Vg(a.x, s.x, l.x), Vg(a.y, s.y, l.y));
}
function zg(a, s, l) {
  ((a.min = s.min - l.min), (a.max = a.min + re(s)));
}
function xs(a, s, l) {
  (zg(a.x, s.x, l.x), zg(a.y, s.y, l.y));
}
const _g = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  ii = () => ({ x: _g(), y: _g() }),
  Ug = () => ({ min: 0, max: 0 }),
  Ht = () => ({ x: Ug(), y: Ug() });
function ze(a) {
  return [a("x"), a("y")];
}
function Yu(a) {
  return a === void 0 || a === 1;
}
function fc({ scale: a, scaleX: s, scaleY: l }) {
  return !Yu(a) || !Yu(s) || !Yu(l);
}
function ua(a) {
  return (
    fc(a) ||
    Gy(a) ||
    a.z ||
    a.rotate ||
    a.rotateX ||
    a.rotateY ||
    a.skewX ||
    a.skewY
  );
}
function Gy(a) {
  return Bg(a.x) || Bg(a.y);
}
function Bg(a) {
  return a && a !== "0%";
}
function rr(a, s, l) {
  const o = a - l,
    c = s * o;
  return l + c;
}
function Lg(a, s, l, o, c) {
  return (c !== void 0 && (a = rr(a, c, o)), rr(a, l, o) + s);
}
function dc(a, s = 0, l = 1, o, c) {
  ((a.min = Lg(a.min, s, l, o, c)), (a.max = Lg(a.max, s, l, o, c)));
}
function Yy(a, { x: s, y: l }) {
  (dc(a.x, s.translate, s.scale, s.originPoint),
    dc(a.y, l.translate, l.scale, l.originPoint));
}
const Hg = 0.999999999999,
  Gg = 1.0000000000001;
function DT(a, s, l, o = !1) {
  const c = l.length;
  if (!c) return;
  s.x = s.y = 1;
  let f, d;
  for (let m = 0; m < c; m++) {
    ((f = l[m]), (d = f.projectionDelta));
    const { visualElement: p } = f.options;
    (p && p.props.style && p.props.style.display === "contents") ||
      (o &&
        f.options.layoutScroll &&
        f.scroll &&
        f !== f.root &&
        li(a, { x: -f.scroll.offset.x, y: -f.scroll.offset.y }),
      d && ((s.x *= d.x.scale), (s.y *= d.y.scale), Yy(a, d)),
      o && ua(f.latestValues) && li(a, f.latestValues));
  }
  (s.x < Gg && s.x > Hg && (s.x = 1), s.y < Gg && s.y > Hg && (s.y = 1));
}
function si(a, s) {
  ((a.min = a.min + s), (a.max = a.max + s));
}
function Yg(a, s, l, o, c = 0.5) {
  const f = wt(a.min, a.max, c);
  dc(a, s, l, f, o);
}
function li(a, s) {
  (Yg(a.x, s.x, s.scaleX, s.scale, s.originX),
    Yg(a.y, s.y, s.scaleY, s.scale, s.originY));
}
function qy(a, s) {
  return By(ST(a.getBoundingClientRect(), s));
}
function RT(a, s, l) {
  const o = qy(a, l),
    { scroll: c } = s;
  return (c && (si(o.x, c.offset.x), si(o.y, c.offset.y)), o);
}
const Xy = ({ current: a }) => (a ? a.ownerDocument.defaultView : null),
  qg = (a, s) => Math.abs(a - s);
function jT(a, s) {
  const l = qg(a.x, s.x),
    o = qg(a.y, s.y);
  return Math.sqrt(l ** 2 + o ** 2);
}
class ky {
  constructor(
    s,
    l,
    { transformPagePoint: o, contextWindow: c, dragSnapToOrigin: f = !1 } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const b = Xu(this.lastMoveEventInfo, this.history),
          S = this.startEvent !== null,
          M = jT(b.offset, { x: 0, y: 0 }) >= 3;
        if (!S && !M) return;
        const { point: U } = b,
          { timestamp: V } = te;
        this.history.push({ ...U, timestamp: V });
        const { onStart: w, onMove: k } = this.handlers;
        (S ||
          (w && w(this.lastMoveEvent, b),
          (this.startEvent = this.lastMoveEvent)),
          k && k(this.lastMoveEvent, b));
      }),
      (this.handlePointerMove = (b, S) => {
        ((this.lastMoveEvent = b),
          (this.lastMoveEventInfo = qu(S, this.transformPagePoint)),
          Vt.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (b, S) => {
        this.end();
        const { onEnd: M, onSessionEnd: U, resumeAnimation: V } = this.handlers;
        if (
          (this.dragSnapToOrigin && V && V(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const w = Xu(
          b.type === "pointercancel"
            ? this.lastMoveEventInfo
            : qu(S, this.transformPagePoint),
          this.history,
        );
        (this.startEvent && M && M(b, w), U && U(b, w));
      }),
      !Yc(s))
    )
      return;
    ((this.dragSnapToOrigin = f),
      (this.handlers = l),
      (this.transformPagePoint = o),
      (this.contextWindow = c || window));
    const d = Os(s),
      m = qu(d, this.transformPagePoint),
      { point: p } = m,
      { timestamp: g } = te;
    this.history = [{ ...p, timestamp: g }];
    const { onSessionStart: y } = l;
    (y && y(s, Xu(m, this.history)),
      (this.removeListeners = Ds(
        ys(this.contextWindow, "pointermove", this.handlePointerMove),
        ys(this.contextWindow, "pointerup", this.handlePointerUp),
        ys(this.contextWindow, "pointercancel", this.handlePointerUp),
      )));
  }
  updateHandlers(s) {
    this.handlers = s;
  }
  end() {
    (this.removeListeners && this.removeListeners(), Gn(this.updatePoint));
  }
}
function qu(a, s) {
  return s ? { point: s(a.point) } : a;
}
function Xg(a, s) {
  return { x: a.x - s.x, y: a.y - s.y };
}
function Xu({ point: a }, s) {
  return {
    point: a,
    delta: Xg(a, Zy(s)),
    offset: Xg(a, OT(s)),
    velocity: wT(s, 0.1),
  };
}
function OT(a) {
  return a[0];
}
function Zy(a) {
  return a[a.length - 1];
}
function wT(a, s) {
  if (a.length < 2) return { x: 0, y: 0 };
  let l = a.length - 1,
    o = null;
  const c = Zy(a);
  for (; l >= 0 && ((o = a[l]), !(c.timestamp - o.timestamp > Qe(s))); ) l--;
  if (!o) return { x: 0, y: 0 };
  const f = Pe(c.timestamp - o.timestamp);
  if (f === 0) return { x: 0, y: 0 };
  const d = { x: (c.x - o.x) / f, y: (c.y - o.y) / f };
  return (d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d);
}
function VT(a, { min: s, max: l }, o) {
  return (
    s !== void 0 && a < s
      ? (a = o ? wt(s, a, o.min) : Math.max(a, s))
      : l !== void 0 && a > l && (a = o ? wt(l, a, o.max) : Math.min(a, l)),
    a
  );
}
function kg(a, s, l) {
  return {
    min: s !== void 0 ? a.min + s : void 0,
    max: l !== void 0 ? a.max + l - (a.max - a.min) : void 0,
  };
}
function zT(a, { top: s, left: l, bottom: o, right: c }) {
  return { x: kg(a.x, l, c), y: kg(a.y, s, o) };
}
function Zg(a, s) {
  let l = s.min - a.min,
    o = s.max - a.max;
  return (
    s.max - s.min < a.max - a.min && ([l, o] = [o, l]),
    { min: l, max: o }
  );
}
function _T(a, s) {
  return { x: Zg(a.x, s.x), y: Zg(a.y, s.y) };
}
function UT(a, s) {
  let l = 0.5;
  const o = re(a),
    c = re(s);
  return (
    c > o
      ? (l = Ss(s.min, s.max - o, a.min))
      : o > c && (l = Ss(a.min, a.max - c, s.min)),
    dn(0, 1, l)
  );
}
function BT(a, s) {
  const l = {};
  return (
    s.min !== void 0 && (l.min = s.min - a.min),
    s.max !== void 0 && (l.max = s.max - a.min),
    l
  );
}
const hc = 0.35;
function LT(a = hc) {
  return (
    a === !1 ? (a = 0) : a === !0 && (a = hc),
    { x: Kg(a, "left", "right"), y: Kg(a, "top", "bottom") }
  );
}
function Kg(a, s, l) {
  return { min: Qg(a, s), max: Qg(a, l) };
}
function Qg(a, s) {
  return typeof a == "number" ? a : a[s] || 0;
}
const HT = new WeakMap();
class GT {
  constructor(s) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = Ht()),
      (this.visualElement = s));
  }
  start(s, { snapToCursor: l = !1 } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1) return;
    const c = (y) => {
        const { dragSnapToOrigin: b } = this.getProps();
        (b ? this.pauseAnimation() : this.stopAnimation(),
          l && this.snapToCursor(Os(y).point));
      },
      f = (y, b) => {
        const { drag: S, dragPropagation: M, onDragStart: U } = this.getProps();
        if (
          S &&
          !M &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = I1(S)),
          !this.openDragLock)
        )
          return;
        ((this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          ze((w) => {
            let k = this.getAxisMotionValue(w).get() || 0;
            if (Je.test(k)) {
              const { projection: Z } = this.visualElement;
              if (Z && Z.layout) {
                const C = Z.layout.layoutBox[w];
                C && (k = re(C) * (parseFloat(k) / 100));
              }
            }
            this.originPoint[w] = k;
          }),
          U && Vt.postRender(() => U(y, b)),
          uc(this.visualElement, "transform"));
        const { animationState: V } = this.visualElement;
        V && V.setActive("whileDrag", !0);
      },
      d = (y, b) => {
        const {
          dragPropagation: S,
          dragDirectionLock: M,
          onDirectionLock: U,
          onDrag: V,
        } = this.getProps();
        if (!S && !this.openDragLock) return;
        const { offset: w } = b;
        if (M && this.currentDirection === null) {
          ((this.currentDirection = YT(w)),
            this.currentDirection !== null && U && U(this.currentDirection));
          return;
        }
        (this.updateAxis("x", b.point, w),
          this.updateAxis("y", b.point, w),
          this.visualElement.render(),
          V && V(y, b));
      },
      m = (y, b) => this.stop(y, b),
      p = () =>
        ze((y) => {
          var b;
          return (
            this.getAnimationState(y) === "paused" &&
            ((b = this.getAxisMotionValue(y).animation) == null
              ? void 0
              : b.play())
          );
        }),
      { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new ky(
      s,
      {
        onSessionStart: c,
        onStart: f,
        onMove: d,
        onSessionEnd: m,
        resumeAnimation: p,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: g,
        contextWindow: Xy(this.visualElement),
      },
    );
  }
  stop(s, l) {
    const o = this.isDragging;
    if ((this.cancel(), !o)) return;
    const { velocity: c } = l;
    this.startAnimation(c);
    const { onDragEnd: f } = this.getProps();
    f && Vt.postRender(() => f(s, l));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: s, animationState: l } = this.visualElement;
    (s && (s.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0));
    const { dragPropagation: o } = this.getProps();
    (!o &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      l && l.setActive("whileDrag", !1));
  }
  updateAxis(s, l, o) {
    const { drag: c } = this.getProps();
    if (!o || !$l(s, c, this.currentDirection)) return;
    const f = this.getAxisMotionValue(s);
    let d = this.originPoint[s] + o[s];
    (this.constraints &&
      this.constraints[s] &&
      (d = VT(d, this.constraints[s], this.elastic[s])),
      f.set(d));
  }
  resolveConstraints() {
    var f;
    const { dragConstraints: s, dragElastic: l } = this.getProps(),
      o =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (f = this.visualElement.projection) == null
            ? void 0
            : f.layout,
      c = this.constraints;
    (s && ai(s)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : s && o
        ? (this.constraints = zT(o.layoutBox, s))
        : (this.constraints = !1),
      (this.elastic = LT(l)),
      c !== this.constraints &&
        o &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        ze((d) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(d) &&
            (this.constraints[d] = BT(o.layoutBox[d], this.constraints[d]));
        }));
  }
  resolveRefConstraints() {
    const { dragConstraints: s, onMeasureDragConstraints: l } = this.getProps();
    if (!s || !ai(s)) return !1;
    const o = s.current,
      { projection: c } = this.visualElement;
    if (!c || !c.layout) return !1;
    const f = RT(o, c.root, this.visualElement.getTransformPagePoint());
    let d = _T(c.layout.layoutBox, f);
    if (l) {
      const m = l(bT(d));
      ((this.hasMutatedConstraints = !!m), m && (d = By(m)));
    }
    return d;
  }
  startAnimation(s) {
    const {
        drag: l,
        dragMomentum: o,
        dragElastic: c,
        dragTransition: f,
        dragSnapToOrigin: d,
        onDragTransitionEnd: m,
      } = this.getProps(),
      p = this.constraints || {},
      g = ze((y) => {
        if (!$l(y, l, this.currentDirection)) return;
        let b = (p && p[y]) || {};
        d && (b = { min: 0, max: 0 });
        const S = c ? 200 : 1e6,
          M = c ? 40 : 1e7,
          U = {
            type: "inertia",
            velocity: o ? s[y] : 0,
            bounceStiffness: S,
            bounceDamping: M,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...f,
            ...b,
          };
        return this.startAxisValueAnimation(y, U);
      });
    return Promise.all(g).then(m);
  }
  startAxisValueAnimation(s, l) {
    const o = this.getAxisMotionValue(s);
    return (
      uc(this.visualElement, s),
      o.start($c(s, o, 0, l, this.visualElement, !1))
    );
  }
  stopAnimation() {
    ze((s) => this.getAxisMotionValue(s).stop());
  }
  pauseAnimation() {
    ze((s) => {
      var l;
      return (l = this.getAxisMotionValue(s).animation) == null
        ? void 0
        : l.pause();
    });
  }
  getAnimationState(s) {
    var l;
    return (l = this.getAxisMotionValue(s).animation) == null
      ? void 0
      : l.state;
  }
  getAxisMotionValue(s) {
    const l = `_drag${s.toUpperCase()}`,
      o = this.visualElement.getProps(),
      c = o[l];
    return (
      c ||
      this.visualElement.getValue(s, (o.initial ? o.initial[s] : void 0) || 0)
    );
  }
  snapToCursor(s) {
    ze((l) => {
      const { drag: o } = this.getProps();
      if (!$l(l, o, this.currentDirection)) return;
      const { projection: c } = this.visualElement,
        f = this.getAxisMotionValue(l);
      if (c && c.layout) {
        const { min: d, max: m } = c.layout.layoutBox[l];
        f.set(s[l] - wt(d, m, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: s, dragConstraints: l } = this.getProps(),
      { projection: o } = this.visualElement;
    if (!ai(l) || !o || !this.constraints) return;
    this.stopAnimation();
    const c = { x: 0, y: 0 };
    ze((d) => {
      const m = this.getAxisMotionValue(d);
      if (m && this.constraints !== !1) {
        const p = m.get();
        c[d] = UT({ min: p, max: p }, this.constraints[d]);
      }
    });
    const { transformTemplate: f } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = f ? f({}, "") : "none"),
      o.root && o.root.updateScroll(),
      o.updateLayout(),
      this.resolveConstraints(),
      ze((d) => {
        if (!$l(d, s, null)) return;
        const m = this.getAxisMotionValue(d),
          { min: p, max: g } = this.constraints[d];
        m.set(wt(p, g, c[d]));
      }));
  }
  addListeners() {
    if (!this.visualElement.current) return;
    HT.set(this.visualElement, this);
    const s = this.visualElement.current,
      l = ys(s, "pointerdown", (p) => {
        const { drag: g, dragListener: y = !0 } = this.getProps();
        g && y && this.start(p);
      }),
      o = () => {
        const { dragConstraints: p } = this.getProps();
        ai(p) && p.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: c } = this.visualElement,
      f = c.addEventListener("measure", o);
    (c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()),
      Vt.read(o));
    const d = Ns(window, "resize", () => this.scalePositionWithinConstraints()),
      m = c.addEventListener(
        "didUpdate",
        ({ delta: p, hasLayoutChanged: g }) => {
          this.isDragging &&
            g &&
            (ze((y) => {
              const b = this.getAxisMotionValue(y);
              b &&
                ((this.originPoint[y] += p[y].translate),
                b.set(b.get() + p[y].translate));
            }),
            this.visualElement.render());
        },
      );
    return () => {
      (d(), l(), f(), m && m());
    };
  }
  getProps() {
    const s = this.visualElement.getProps(),
      {
        drag: l = !1,
        dragDirectionLock: o = !1,
        dragPropagation: c = !1,
        dragConstraints: f = !1,
        dragElastic: d = hc,
        dragMomentum: m = !0,
      } = s;
    return {
      ...s,
      drag: l,
      dragDirectionLock: o,
      dragPropagation: c,
      dragConstraints: f,
      dragElastic: d,
      dragMomentum: m,
    };
  }
}
function $l(a, s, l) {
  return (s === !0 || s === a) && (l === null || l === a);
}
function YT(a, s = 10) {
  let l = null;
  return (Math.abs(a.y) > s ? (l = "y") : Math.abs(a.x) > s && (l = "x"), l);
}
class qT extends qn {
  constructor(s) {
    (super(s),
      (this.removeGroupControls = _e),
      (this.removeListeners = _e),
      (this.controls = new GT(s)));
  }
  mount() {
    const { dragControls: s } = this.node.getProps();
    (s && (this.removeGroupControls = s.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || _e));
  }
  unmount() {
    (this.removeGroupControls(), this.removeListeners());
  }
}
const Pg = (a) => (s, l) => {
  a && Vt.postRender(() => a(s, l));
};
class XT extends qn {
  constructor() {
    (super(...arguments), (this.removePointerDownListener = _e));
  }
  onPointerDown(s) {
    this.session = new ky(s, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Xy(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: s,
      onPanStart: l,
      onPan: o,
      onPanEnd: c,
    } = this.node.getProps();
    return {
      onSessionStart: Pg(s),
      onStart: Pg(l),
      onMove: o,
      onEnd: (f, d) => {
        (delete this.session, c && Vt.postRender(() => c(f, d)));
      },
    };
  }
  mount() {
    this.removePointerDownListener = ys(this.node.current, "pointerdown", (s) =>
      this.onPointerDown(s),
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
const nr = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function Jg(a, s) {
  return s.max === s.min ? 0 : (a / (s.max - s.min)) * 100;
}
const ds = {
    correct: (a, s) => {
      if (!s.target) return a;
      if (typeof a == "string")
        if (it.test(a)) a = parseFloat(a);
        else return a;
      const l = Jg(a, s.target.x),
        o = Jg(a, s.target.y);
      return `${l}% ${o}%`;
    },
  },
  kT = {
    correct: (a, { treeScale: s, projectionDelta: l }) => {
      const o = a,
        c = Yn.parse(a);
      if (c.length > 5) return o;
      const f = Yn.createTransformer(a),
        d = typeof c[0] != "number" ? 1 : 0,
        m = l.x.scale * s.x,
        p = l.y.scale * s.y;
      ((c[0 + d] /= m), (c[1 + d] /= p));
      const g = wt(m, p, 0.5);
      return (
        typeof c[2 + d] == "number" && (c[2 + d] /= g),
        typeof c[3 + d] == "number" && (c[3 + d] /= g),
        f(c)
      );
    },
  };
class ZT extends X.Component {
  componentDidMount() {
    const {
        visualElement: s,
        layoutGroup: l,
        switchLayoutGroup: o,
        layoutId: c,
      } = this.props,
      { projection: f } = s;
    (RS(KT),
      f &&
        (l.group && l.group.add(f),
        o && o.register && c && o.register(f),
        f.root.didUpdate(),
        f.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        f.setOptions({
          ...f.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (nr.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(s) {
    const {
        layoutDependency: l,
        visualElement: o,
        drag: c,
        isPresent: f,
      } = this.props,
      { projection: d } = o;
    return (
      d &&
        ((d.isPresent = f),
        c || s.layoutDependency !== l || l === void 0 || s.isPresent !== f
          ? d.willUpdate()
          : this.safeToRemove(),
        s.isPresent !== f &&
          (f
            ? d.promote()
            : d.relegate() ||
              Vt.postRender(() => {
                const m = d.getStack();
                (!m || !m.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: s } = this.props.visualElement;
    s &&
      (s.root.didUpdate(),
      Gc.postRender(() => {
        !s.currentAnimation && s.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: s,
        layoutGroup: l,
        switchLayoutGroup: o,
      } = this.props,
      { projection: c } = s;
    c &&
      (c.scheduleCheckAfterUnmount(),
      l && l.group && l.group.remove(c),
      o && o.deregister && o.deregister(c));
  }
  safeToRemove() {
    const { safeToRemove: s } = this.props;
    s && s();
  }
  render() {
    return null;
  }
}
function Ky(a) {
  const [s, l] = xy(),
    o = X.useContext(yc);
  return x.jsx(ZT, {
    ...a,
    layoutGroup: o,
    switchLayoutGroup: X.useContext(Ey),
    isPresent: s,
    safeToRemove: l,
  });
}
const KT = {
  borderRadius: {
    ...ds,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: ds,
  borderTopRightRadius: ds,
  borderBottomLeftRadius: ds,
  borderBottomRightRadius: ds,
  boxShadow: kT,
};
function QT(a, s, l) {
  const o = se(a) ? a : ri(a);
  return (o.start($c("", o, s, l)), o.animation);
}
const PT = (a, s) => a.depth - s.depth;
class JT {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(s) {
    (bc(this.children, s), (this.isDirty = !0));
  }
  remove(s) {
    (Sc(this.children, s), (this.isDirty = !0));
  }
  forEach(s) {
    (this.isDirty && this.children.sort(PT),
      (this.isDirty = !1),
      this.children.forEach(s));
  }
}
function FT(a, s) {
  const l = he.now(),
    o = ({ timestamp: c }) => {
      const f = c - l;
      f >= s && (Gn(o), a(f - s));
    };
  return (Vt.setup(o, !0), () => Gn(o));
}
const Qy = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  $T = Qy.length,
  Fg = (a) => (typeof a == "string" ? parseFloat(a) : a),
  $g = (a) => typeof a == "number" || it.test(a);
function WT(a, s, l, o, c, f) {
  c
    ? ((a.opacity = wt(0, l.opacity ?? 1, IT(o))),
      (a.opacityExit = wt(s.opacity ?? 1, 0, tA(o))))
    : f && (a.opacity = wt(s.opacity ?? 1, l.opacity ?? 1, o));
  for (let d = 0; d < $T; d++) {
    const m = `border${Qy[d]}Radius`;
    let p = Wg(s, m),
      g = Wg(l, m);
    if (p === void 0 && g === void 0) continue;
    (p || (p = 0),
      g || (g = 0),
      p === 0 || g === 0 || $g(p) === $g(g)
        ? ((a[m] = Math.max(wt(Fg(p), Fg(g), o), 0)),
          (Je.test(g) || Je.test(p)) && (a[m] += "%"))
        : (a[m] = g));
  }
  (s.rotate || l.rotate) && (a.rotate = wt(s.rotate || 0, l.rotate || 0, o));
}
function Wg(a, s) {
  return a[s] !== void 0 ? a[s] : a.borderRadius;
}
const IT = Py(0, 0.5, Gp),
  tA = Py(0.5, 0.95, _e);
function Py(a, s, l) {
  return (o) => (o < a ? 0 : o > s ? 1 : l(Ss(a, s, o)));
}
function Ig(a, s) {
  ((a.min = s.min), (a.max = s.max));
}
function Ve(a, s) {
  (Ig(a.x, s.x), Ig(a.y, s.y));
}
function tp(a, s) {
  ((a.translate = s.translate),
    (a.scale = s.scale),
    (a.originPoint = s.originPoint),
    (a.origin = s.origin));
}
function ep(a, s, l, o, c) {
  return (
    (a -= s),
    (a = rr(a, 1 / l, o)),
    c !== void 0 && (a = rr(a, 1 / c, o)),
    a
  );
}
function eA(a, s = 0, l = 1, o = 0.5, c, f = a, d = a) {
  if (
    (Je.test(s) &&
      ((s = parseFloat(s)), (s = wt(d.min, d.max, s / 100) - d.min)),
    typeof s != "number")
  )
    return;
  let m = wt(f.min, f.max, o);
  (a === f && (m -= s),
    (a.min = ep(a.min, s, l, m, c)),
    (a.max = ep(a.max, s, l, m, c)));
}
function np(a, s, [l, o, c], f, d) {
  eA(a, s[l], s[o], s[c], s.scale, f, d);
}
const nA = ["x", "scaleX", "originX"],
  aA = ["y", "scaleY", "originY"];
function ap(a, s, l, o) {
  (np(a.x, s, nA, l ? l.x : void 0, o ? o.x : void 0),
    np(a.y, s, aA, l ? l.y : void 0, o ? o.y : void 0));
}
function ip(a) {
  return a.translate === 0 && a.scale === 1;
}
function Jy(a) {
  return ip(a.x) && ip(a.y);
}
function sp(a, s) {
  return a.min === s.min && a.max === s.max;
}
function iA(a, s) {
  return sp(a.x, s.x) && sp(a.y, s.y);
}
function lp(a, s) {
  return (
    Math.round(a.min) === Math.round(s.min) &&
    Math.round(a.max) === Math.round(s.max)
  );
}
function Fy(a, s) {
  return lp(a.x, s.x) && lp(a.y, s.y);
}
function rp(a) {
  return re(a.x) / re(a.y);
}
function op(a, s) {
  return (
    a.translate === s.translate &&
    a.scale === s.scale &&
    a.originPoint === s.originPoint
  );
}
class sA {
  constructor() {
    this.members = [];
  }
  add(s) {
    (bc(this.members, s), s.scheduleRender());
  }
  remove(s) {
    if (
      (Sc(this.members, s),
      s === this.prevLead && (this.prevLead = void 0),
      s === this.lead)
    ) {
      const l = this.members[this.members.length - 1];
      l && this.promote(l);
    }
  }
  relegate(s) {
    const l = this.members.findIndex((c) => s === c);
    if (l === 0) return !1;
    let o;
    for (let c = l; c >= 0; c--) {
      const f = this.members[c];
      if (f.isPresent !== !1) {
        o = f;
        break;
      }
    }
    return o ? (this.promote(o), !0) : !1;
  }
  promote(s, l) {
    const o = this.lead;
    if (s !== o && ((this.prevLead = o), (this.lead = s), s.show(), o)) {
      (o.instance && o.scheduleRender(),
        s.scheduleRender(),
        (s.resumeFrom = o),
        l && (s.resumeFrom.preserveOpacity = !0),
        o.snapshot &&
          ((s.snapshot = o.snapshot),
          (s.snapshot.latestValues = o.animationValues || o.latestValues)),
        s.root && s.root.isUpdating && (s.isLayoutDirty = !0));
      const { crossfade: c } = s.options;
      c === !1 && o.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((s) => {
      const { options: l, resumingFrom: o } = s;
      (l.onExitComplete && l.onExitComplete(),
        o && o.options.onExitComplete && o.options.onExitComplete());
    });
  }
  scheduleRender() {
    this.members.forEach((s) => {
      s.instance && s.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function lA(a, s, l) {
  let o = "";
  const c = a.x.translate / s.x,
    f = a.y.translate / s.y,
    d = (l == null ? void 0 : l.z) || 0;
  if (
    ((c || f || d) && (o = `translate3d(${c}px, ${f}px, ${d}px) `),
    (s.x !== 1 || s.y !== 1) && (o += `scale(${1 / s.x}, ${1 / s.y}) `),
    l)
  ) {
    const {
      transformPerspective: g,
      rotate: y,
      rotateX: b,
      rotateY: S,
      skewX: M,
      skewY: U,
    } = l;
    (g && (o = `perspective(${g}px) ${o}`),
      y && (o += `rotate(${y}deg) `),
      b && (o += `rotateX(${b}deg) `),
      S && (o += `rotateY(${S}deg) `),
      M && (o += `skewX(${M}deg) `),
      U && (o += `skewY(${U}deg) `));
  }
  const m = a.x.scale * s.x,
    p = a.y.scale * s.y;
  return ((m !== 1 || p !== 1) && (o += `scale(${m}, ${p})`), o || "none");
}
const ku = ["", "X", "Y", "Z"],
  rA = { visibility: "hidden" },
  oA = 1e3;
let uA = 0;
function Zu(a, s, l, o) {
  const { latestValues: c } = s;
  c[a] && ((l[a] = c[a]), s.setStaticValue(a, 0), o && (o[a] = 0));
}
function $y(a) {
  if (((a.hasCheckedOptimisedAppear = !0), a.root === a)) return;
  const { visualElement: s } = a.options;
  if (!s) return;
  const l = Vy(s);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: c, layoutId: f } = a.options;
    window.MotionCancelOptimisedAnimation(l, "transform", Vt, !(c || f));
  }
  const { parent: o } = a;
  o && !o.hasCheckedOptimisedAppear && $y(o);
}
function Wy({
  attachResizeListener: a,
  defaultParent: s,
  measureScroll: l,
  checkIsScrollRoot: o,
  resetTransform: c,
}) {
  return class {
    constructor(d = {}, m = s == null ? void 0 : s()) {
      ((this.id = uA++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            this.nodes.forEach(dA),
            this.nodes.forEach(yA),
            this.nodes.forEach(vA),
            this.nodes.forEach(hA));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = d),
        (this.root = m ? m.root || m : this),
        (this.path = m ? [...m.path, m] : []),
        (this.parent = m),
        (this.depth = m ? m.depth + 1 : 0));
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new JT());
    }
    addEventListener(d, m) {
      return (
        this.eventHandlers.has(d) || this.eventHandlers.set(d, new Ec()),
        this.eventHandlers.get(d).add(m)
      );
    }
    notifyListeners(d, ...m) {
      const p = this.eventHandlers.get(d);
      p && p.notify(...m);
    }
    hasListeners(d) {
      return this.eventHandlers.has(d);
    }
    mount(d) {
      if (this.instance) return;
      ((this.isSVG = vy(d) && !sS(d)), (this.instance = d));
      const { layoutId: m, layout: p, visualElement: g } = this.options;
      if (
        (g && !g.current && g.mount(d),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (p || m) && (this.isLayoutDirty = !0),
        a)
      ) {
        let y;
        const b = () => (this.root.updateBlockedByResize = !1);
        a(d, () => {
          ((this.root.updateBlockedByResize = !0),
            y && y(),
            (y = FT(b, 250)),
            nr.hasAnimatedSinceResize &&
              ((nr.hasAnimatedSinceResize = !1), this.nodes.forEach(cp)));
        });
      }
      (m && this.root.registerSharedNode(m, this),
        this.options.animate !== !1 &&
          g &&
          (m || p) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: y,
              hasLayoutChanged: b,
              hasRelativeLayoutChanged: S,
              layout: M,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              const U =
                  this.options.transition || g.getDefaultTransition() || AA,
                { onLayoutAnimationStart: V, onLayoutAnimationComplete: w } =
                  g.getProps(),
                k = !this.targetLayout || !Fy(this.targetLayout, M),
                Z = !b && S;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                Z ||
                (b && (k || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0));
                const C = { ...Lc(U, "layout"), onPlay: V, onComplete: w };
                ((g.shouldReduceMotion || this.options.layoutRoot) &&
                  ((C.delay = 0), (C.type = !1)),
                  this.startAnimation(C),
                  this.setAnimationOrigin(y, Z));
              } else
                (b || cp(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete());
              this.targetLayout = M;
            },
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(),
        this.root.nodes.remove(this));
      const d = this.getStack();
      (d && d.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        Gn(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(xA),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: d } = this.options;
      return d && d.getProps().transformTemplate;
    }
    willUpdate(d = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          $y(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let y = 0; y < this.path.length; y++) {
        const b = this.path[y];
        ((b.shouldResetTransform = !0),
          b.updateScroll("snapshot"),
          b.options.layoutRoot && b.willUpdate(!1));
      }
      const { layoutId: m, layout: p } = this.options;
      if (m === void 0 && !p) return;
      const g = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = g
        ? g(this.latestValues, "")
        : void 0),
        this.updateSnapshot(),
        d && this.notifyListeners("willUpdate"));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(),
          this.clearAllSnapshots(),
          this.nodes.forEach(up));
        return;
      }
      (this.isUpdating || this.nodes.forEach(gA),
        (this.isUpdating = !1),
        this.nodes.forEach(pA),
        this.nodes.forEach(cA),
        this.nodes.forEach(fA),
        this.clearAllSnapshots());
      const m = he.now();
      ((te.delta = dn(0, 1e3 / 60, m - te.timestamp)),
        (te.timestamp = m),
        (te.isProcessing = !0),
        _u.update.process(te),
        _u.preRender.process(te),
        _u.render.process(te),
        (te.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), Gc.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(mA), this.sharedNodes.forEach(bA));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        Vt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Vt.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !re(this.snapshot.measuredBox.x) &&
          !re(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++) this.path[p].updateScroll();
      const d = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = Ht()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox));
      const { visualElement: m } = this.options;
      m &&
        m.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          d ? d.layoutBox : void 0,
        );
    }
    updateScroll(d = "measure") {
      let m = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === d &&
          (m = !1),
        m && this.instance)
      ) {
        const p = o(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: d,
          isRoot: p,
          offset: l(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : p,
        };
      }
    }
    resetTransform() {
      if (!c) return;
      const d =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        m = this.projectionDelta && !Jy(this.projectionDelta),
        p = this.getTransformTemplate(),
        g = p ? p(this.latestValues, "") : void 0,
        y = g !== this.prevTransformTemplateValue;
      d &&
        this.instance &&
        (m || ua(this.latestValues) || y) &&
        (c(this.instance, g),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(d = !0) {
      const m = this.measurePageBox();
      let p = this.removeElementScroll(m);
      return (
        d && (p = this.removeTransform(p)),
        EA(p),
        {
          animationId: this.root.animationId,
          measuredBox: m,
          layoutBox: p,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var g;
      const { visualElement: d } = this.options;
      if (!d) return Ht();
      const m = d.measureViewportBox();
      if (
        !(
          ((g = this.scroll) == null ? void 0 : g.wasRoot) || this.path.some(MA)
        )
      ) {
        const { scroll: y } = this.root;
        y && (si(m.x, y.offset.x), si(m.y, y.offset.y));
      }
      return m;
    }
    removeElementScroll(d) {
      var p;
      const m = Ht();
      if ((Ve(m, d), (p = this.scroll) != null && p.wasRoot)) return m;
      for (let g = 0; g < this.path.length; g++) {
        const y = this.path[g],
          { scroll: b, options: S } = y;
        y !== this.root &&
          b &&
          S.layoutScroll &&
          (b.wasRoot && Ve(m, d), si(m.x, b.offset.x), si(m.y, b.offset.y));
      }
      return m;
    }
    applyTransform(d, m = !1) {
      const p = Ht();
      Ve(p, d);
      for (let g = 0; g < this.path.length; g++) {
        const y = this.path[g];
        (!m &&
          y.options.layoutScroll &&
          y.scroll &&
          y !== y.root &&
          li(p, { x: -y.scroll.offset.x, y: -y.scroll.offset.y }),
          ua(y.latestValues) && li(p, y.latestValues));
      }
      return (ua(this.latestValues) && li(p, this.latestValues), p);
    }
    removeTransform(d) {
      const m = Ht();
      Ve(m, d);
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p];
        if (!g.instance || !ua(g.latestValues)) continue;
        fc(g.latestValues) && g.updateSnapshot();
        const y = Ht(),
          b = g.measurePageBox();
        (Ve(y, b),
          ap(m, g.latestValues, g.snapshot ? g.snapshot.layoutBox : void 0, y));
      }
      return (ua(this.latestValues) && ap(m, this.latestValues), m);
    }
    setTargetDelta(d) {
      ((this.targetDelta = d),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0));
    }
    setOptions(d) {
      this.options = {
        ...this.options,
        ...d,
        crossfade: d.crossfade !== void 0 ? d.crossfade : !0,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== te.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(d = !1) {
      var S;
      const m = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = m.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = m.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = m.isSharedProjectionDirty));
      const p = !!this.resumingFrom || this !== m;
      if (
        !(
          d ||
          (p && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          ((S = this.parent) != null && S.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: y, layoutId: b } = this.options;
      if (!(!this.layout || !(y || b))) {
        if (
          ((this.resolvedRelativeTargetAt = te.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const M = this.getClosestProjectingParent();
          M && M.layout && this.animationProgress !== 1
            ? ((this.relativeParent = M),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = Ht()),
              (this.relativeTargetOrigin = Ht()),
              xs(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                M.layout.layoutBox,
              ),
              Ve(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (
          !(!this.relativeTarget && !this.targetDelta) &&
          (this.target ||
            ((this.target = Ht()), (this.targetWithTransforms = Ht())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              NT(this.target, this.relativeTarget, this.relativeParent.target))
            : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : Ve(this.target, this.layout.layoutBox),
                Yy(this.target, this.targetDelta))
              : Ve(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget)
        ) {
          this.attemptToResolveRelativeTarget = !1;
          const M = this.getClosestProjectingParent();
          M &&
          !!M.resumingFrom == !!this.resumingFrom &&
          !M.options.layoutScroll &&
          M.target &&
          this.animationProgress !== 1
            ? ((this.relativeParent = M),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = Ht()),
              (this.relativeTargetOrigin = Ht()),
              xs(this.relativeTargetOrigin, this.target, M.target),
              Ve(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          fc(this.parent.latestValues) ||
          Gy(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var U;
      const d = this.getLead(),
        m = !!this.resumingFrom || this !== d;
      let p = !0;
      if (
        ((this.isProjectionDirty ||
          ((U = this.parent) != null && U.isProjectionDirty)) &&
          (p = !1),
        m &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (p = !1),
        this.resolvedRelativeTargetAt === te.timestamp && (p = !1),
        p)
      )
        return;
      const { layout: g, layoutId: y } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(g || y))
      )
        return;
      Ve(this.layoutCorrected, this.layout.layoutBox);
      const b = this.treeScale.x,
        S = this.treeScale.y;
      (DT(this.layoutCorrected, this.treeScale, this.path, m),
        d.layout &&
          !d.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((d.target = d.layout.layoutBox), (d.targetWithTransforms = Ht())));
      const { target: M } = d;
      if (!M) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (tp(this.prevProjectionDelta.x, this.projectionDelta.x),
          tp(this.prevProjectionDelta.y, this.projectionDelta.y)),
        vs(this.projectionDelta, this.layoutCorrected, M, this.latestValues),
        (this.treeScale.x !== b ||
          this.treeScale.y !== S ||
          !op(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !op(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", M)));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(d = !0) {
      var m;
      if (((m = this.options.visualElement) == null || m.scheduleRender(), d)) {
        const p = this.getStack();
        p && p.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = ii()),
        (this.projectionDelta = ii()),
        (this.projectionDeltaWithTransform = ii()));
    }
    setAnimationOrigin(d, m = !1) {
      const p = this.snapshot,
        g = p ? p.latestValues : {},
        y = { ...this.latestValues },
        b = ii();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !m));
      const S = Ht(),
        M = p ? p.source : void 0,
        U = this.layout ? this.layout.source : void 0,
        V = M !== U,
        w = this.getStack(),
        k = !w || w.members.length <= 1,
        Z = !!(V && !k && this.options.crossfade === !0 && !this.path.some(TA));
      this.animationProgress = 0;
      let C;
      ((this.mixTargetDelta = (q) => {
        const G = q / 1e3;
        (fp(b.x, d.x, G),
          fp(b.y, d.y, G),
          this.setTargetDelta(b),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (xs(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            SA(this.relativeTarget, this.relativeTargetOrigin, S, G),
            C && iA(this.relativeTarget, C) && (this.isProjectionDirty = !1),
            C || (C = Ht()),
            Ve(C, this.relativeTarget)),
          V &&
            ((this.animationValues = y), WT(y, g, this.latestValues, G, Z, k)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = G));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(d) {
      var m, p, g;
      (this.notifyListeners("animationStart"),
        (m = this.currentAnimation) == null || m.stop(),
        (g = (p = this.resumingFrom) == null ? void 0 : p.currentAnimation) ==
          null || g.stop(),
        this.pendingAnimation &&
          (Gn(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = Vt.update(() => {
          ((nr.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = ri(0)),
            (this.currentAnimation = QT(this.motionValue, [0, 1e3], {
              ...d,
              velocity: 0,
              isSync: !0,
              onUpdate: (y) => {
                (this.mixTargetDelta(y), d.onUpdate && d.onUpdate(y));
              },
              onStop: () => {},
              onComplete: () => {
                (d.onComplete && d.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const d = this.getStack();
      (d && d.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete"));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(oA),
        this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let {
        targetWithTransforms: m,
        target: p,
        layout: g,
        latestValues: y,
      } = d;
      if (!(!m || !p || !g)) {
        if (
          this !== d &&
          this.layout &&
          g &&
          Iy(this.options.animationType, this.layout.layoutBox, g.layoutBox)
        ) {
          p = this.target || Ht();
          const b = re(this.layout.layoutBox.x);
          ((p.x.min = d.target.x.min), (p.x.max = p.x.min + b));
          const S = re(this.layout.layoutBox.y);
          ((p.y.min = d.target.y.min), (p.y.max = p.y.min + S));
        }
        (Ve(m, p),
          li(m, y),
          vs(this.projectionDeltaWithTransform, this.layoutCorrected, m, y));
      }
    }
    registerSharedNode(d, m) {
      (this.sharedNodes.has(d) || this.sharedNodes.set(d, new sA()),
        this.sharedNodes.get(d).add(m));
      const g = m.options.initialPromotionConfig;
      m.promote({
        transition: g ? g.transition : void 0,
        preserveFollowOpacity:
          g && g.shouldPreserveFollowOpacity
            ? g.shouldPreserveFollowOpacity(m)
            : void 0,
      });
    }
    isLead() {
      const d = this.getStack();
      return d ? d.lead === this : !0;
    }
    getLead() {
      var m;
      const { layoutId: d } = this.options;
      return d
        ? ((m = this.getStack()) == null ? void 0 : m.lead) || this
        : this;
    }
    getPrevLead() {
      var m;
      const { layoutId: d } = this.options;
      return d ? ((m = this.getStack()) == null ? void 0 : m.prevLead) : void 0;
    }
    getStack() {
      const { layoutId: d } = this.options;
      if (d) return this.root.sharedNodes.get(d);
    }
    promote({ needsReset: d, transition: m, preserveFollowOpacity: p } = {}) {
      const g = this.getStack();
      (g && g.promote(this, p),
        d && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        m && this.setOptions({ transition: m }));
    }
    relegate() {
      const d = this.getStack();
      return d ? d.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: d } = this.options;
      if (!d) return;
      let m = !1;
      const { latestValues: p } = d;
      if (
        ((p.z ||
          p.rotate ||
          p.rotateX ||
          p.rotateY ||
          p.rotateZ ||
          p.skewX ||
          p.skewY) &&
          (m = !0),
        !m)
      )
        return;
      const g = {};
      p.z && Zu("z", d, g, this.animationValues);
      for (let y = 0; y < ku.length; y++)
        (Zu(`rotate${ku[y]}`, d, g, this.animationValues),
          Zu(`skew${ku[y]}`, d, g, this.animationValues));
      d.render();
      for (const y in g)
        (d.setStaticValue(y, g[y]),
          this.animationValues && (this.animationValues[y] = g[y]));
      d.scheduleRender();
    }
    getProjectionStyles(d) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return rA;
      const m = { visibility: "" },
        p = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (m.opacity = ""),
          (m.pointerEvents = er(d == null ? void 0 : d.pointerEvents) || ""),
          (m.transform = p ? p(this.latestValues, "") : "none"),
          m
        );
      const g = this.getLead();
      if (!this.projectionDelta || !this.layout || !g.target) {
        const M = {};
        return (
          this.options.layoutId &&
            ((M.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (M.pointerEvents = er(d == null ? void 0 : d.pointerEvents) || "")),
          this.hasProjected &&
            !ua(this.latestValues) &&
            ((M.transform = p ? p({}, "") : "none"), (this.hasProjected = !1)),
          M
        );
      }
      const y = g.animationValues || g.latestValues;
      (this.applyTransformsToTarget(),
        (m.transform = lA(
          this.projectionDeltaWithTransform,
          this.treeScale,
          y,
        )),
        p && (m.transform = p(y, m.transform)));
      const { x: b, y: S } = this.projectionDelta;
      ((m.transformOrigin = `${b.origin * 100}% ${S.origin * 100}% 0`),
        g.animationValues
          ? (m.opacity =
              g === this
                ? (y.opacity ?? this.latestValues.opacity ?? 1)
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : y.opacityExit)
          : (m.opacity =
              g === this
                ? y.opacity !== void 0
                  ? y.opacity
                  : ""
                : y.opacityExit !== void 0
                  ? y.opacityExit
                  : 0));
      for (const M in Ms) {
        if (y[M] === void 0) continue;
        const { correct: U, applyTo: V, isCSSVariable: w } = Ms[M],
          k = m.transform === "none" ? y[M] : U(y[M], g);
        if (V) {
          const Z = V.length;
          for (let C = 0; C < Z; C++) m[V[C]] = k;
        } else
          w ? (this.options.visualElement.renderState.vars[M] = k) : (m[M] = k);
      }
      return (
        this.options.layoutId &&
          (m.pointerEvents =
            g === this
              ? er(d == null ? void 0 : d.pointerEvents) || ""
              : "none"),
        m
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((d) => {
        var m;
        return (m = d.currentAnimation) == null ? void 0 : m.stop();
      }),
        this.root.nodes.forEach(up),
        this.root.sharedNodes.clear());
    }
  };
}
function cA(a) {
  a.updateLayout();
}
function fA(a) {
  var l;
  const s = ((l = a.resumeFrom) == null ? void 0 : l.snapshot) || a.snapshot;
  if (a.isLead() && a.layout && s && a.hasListeners("didUpdate")) {
    const { layoutBox: o, measuredBox: c } = a.layout,
      { animationType: f } = a.options,
      d = s.source !== a.layout.source;
    f === "size"
      ? ze((b) => {
          const S = d ? s.measuredBox[b] : s.layoutBox[b],
            M = re(S);
          ((S.min = o[b].min), (S.max = S.min + M));
        })
      : Iy(f, s.layoutBox, o) &&
        ze((b) => {
          const S = d ? s.measuredBox[b] : s.layoutBox[b],
            M = re(o[b]);
          ((S.max = S.min + M),
            a.relativeTarget &&
              !a.currentAnimation &&
              ((a.isProjectionDirty = !0),
              (a.relativeTarget[b].max = a.relativeTarget[b].min + M)));
        });
    const m = ii();
    vs(m, o, s.layoutBox);
    const p = ii();
    d ? vs(p, a.applyTransform(c, !0), s.measuredBox) : vs(p, o, s.layoutBox);
    const g = !Jy(m);
    let y = !1;
    if (!a.resumeFrom) {
      const b = a.getClosestProjectingParent();
      if (b && !b.resumeFrom) {
        const { snapshot: S, layout: M } = b;
        if (S && M) {
          const U = Ht();
          xs(U, s.layoutBox, S.layoutBox);
          const V = Ht();
          (xs(V, o, M.layoutBox),
            Fy(U, V) || (y = !0),
            b.options.layoutRoot &&
              ((a.relativeTarget = V),
              (a.relativeTargetOrigin = U),
              (a.relativeParent = b)));
        }
      }
    }
    a.notifyListeners("didUpdate", {
      layout: o,
      snapshot: s,
      delta: p,
      layoutDelta: m,
      hasLayoutChanged: g,
      hasRelativeLayoutChanged: y,
    });
  } else if (a.isLead()) {
    const { onExitComplete: o } = a.options;
    o && o();
  }
  a.options.transition = void 0;
}
function dA(a) {
  a.parent &&
    (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty),
    a.isSharedProjectionDirty ||
      (a.isSharedProjectionDirty = !!(
        a.isProjectionDirty ||
        a.parent.isProjectionDirty ||
        a.parent.isSharedProjectionDirty
      )),
    a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function hA(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function mA(a) {
  a.clearSnapshot();
}
function up(a) {
  a.clearMeasurements();
}
function gA(a) {
  a.isLayoutDirty = !1;
}
function pA(a) {
  const { visualElement: s } = a.options;
  (s && s.getProps().onBeforeLayoutMeasure && s.notify("BeforeLayoutMeasure"),
    a.resetTransform());
}
function cp(a) {
  (a.finishAnimation(),
    (a.targetDelta = a.relativeTarget = a.target = void 0),
    (a.isProjectionDirty = !0));
}
function yA(a) {
  a.resolveTargetDelta();
}
function vA(a) {
  a.calcProjection();
}
function xA(a) {
  a.resetSkewAndRotation();
}
function bA(a) {
  a.removeLeadSnapshot();
}
function fp(a, s, l) {
  ((a.translate = wt(s.translate, 0, l)),
    (a.scale = wt(s.scale, 1, l)),
    (a.origin = s.origin),
    (a.originPoint = s.originPoint));
}
function dp(a, s, l, o) {
  ((a.min = wt(s.min, l.min, o)), (a.max = wt(s.max, l.max, o)));
}
function SA(a, s, l, o) {
  (dp(a.x, s.x, l.x, o), dp(a.y, s.y, l.y, o));
}
function TA(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const AA = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  hp = (a) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(a),
  mp = hp("applewebkit/") && !hp("chrome/") ? Math.round : _e;
function gp(a) {
  ((a.min = mp(a.min)), (a.max = mp(a.max)));
}
function EA(a) {
  (gp(a.x), gp(a.y));
}
function Iy(a, s, l) {
  return (
    a === "position" || (a === "preserve-aspect" && !CT(rp(s), rp(l), 0.2))
  );
}
function MA(a) {
  var s;
  return a !== a.root && ((s = a.scroll) == null ? void 0 : s.wasRoot);
}
const CA = Wy({
    attachResizeListener: (a, s) => Ns(a, "resize", s),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  Ku = { current: void 0 },
  t0 = Wy({
    measureScroll: (a) => ({ x: a.scrollLeft, y: a.scrollTop }),
    defaultParent: () => {
      if (!Ku.current) {
        const a = new CA({});
        (a.mount(window), a.setOptions({ layoutScroll: !0 }), (Ku.current = a));
      }
      return Ku.current;
    },
    resetTransform: (a, s) => {
      a.style.transform = s !== void 0 ? s : "none";
    },
    checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed",
  }),
  NA = {
    pan: { Feature: XT },
    drag: { Feature: qT, ProjectionNode: t0, MeasureLayout: Ky },
  };
function pp(a, s, l) {
  const { props: o } = a;
  a.animationState &&
    o.whileHover &&
    a.animationState.setActive("whileHover", l === "Start");
  const c = "onHover" + l,
    f = o[c];
  f && Vt.postRender(() => f(s, Os(s)));
}
class DA extends qn {
  mount() {
    const { current: s } = this.node;
    s &&
      (this.unmount = tS(
        s,
        (l, o) => (pp(this.node, o, "Start"), (c) => pp(this.node, c, "End")),
      ));
  }
  unmount() {}
}
class RA extends qn {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let s = !1;
    try {
      s = this.node.current.matches(":focus-visible");
    } catch {
      s = !0;
    }
    !s ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = Ds(
      Ns(this.node.current, "focus", () => this.onFocus()),
      Ns(this.node.current, "blur", () => this.onBlur()),
    );
  }
  unmount() {}
}
function yp(a, s, l) {
  const { props: o } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled) return;
  a.animationState &&
    o.whileTap &&
    a.animationState.setActive("whileTap", l === "Start");
  const c = "onTap" + (l === "End" ? "" : l),
    f = o[c];
  f && Vt.postRender(() => f(s, Os(s)));
}
class jA extends qn {
  mount() {
    const { current: s } = this.node;
    s &&
      (this.unmount = iS(
        s,
        (l, o) => (
          yp(this.node, o, "Start"),
          (c, { success: f }) => yp(this.node, c, f ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget },
      ));
  }
  unmount() {}
}
const mc = new WeakMap(),
  Qu = new WeakMap(),
  OA = (a) => {
    const s = mc.get(a.target);
    s && s(a);
  },
  wA = (a) => {
    a.forEach(OA);
  };
function VA({ root: a, ...s }) {
  const l = a || document;
  Qu.has(l) || Qu.set(l, {});
  const o = Qu.get(l),
    c = JSON.stringify(s);
  return (
    o[c] || (o[c] = new IntersectionObserver(wA, { root: a, ...s })),
    o[c]
  );
}
function zA(a, s, l) {
  const o = VA(s);
  return (
    mc.set(a, l),
    o.observe(a),
    () => {
      (mc.delete(a), o.unobserve(a));
    }
  );
}
const _A = { some: 0, all: 1 };
class UA extends qn {
  constructor() {
    (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    this.unmount();
    const { viewport: s = {} } = this.node.getProps(),
      { root: l, margin: o, amount: c = "some", once: f } = s,
      d = {
        root: l ? l.current : void 0,
        rootMargin: o,
        threshold: typeof c == "number" ? c : _A[c],
      },
      m = (p) => {
        const { isIntersecting: g } = p;
        if (
          this.isInView === g ||
          ((this.isInView = g), f && !g && this.hasEnteredView)
        )
          return;
        (g && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", g));
        const { onViewportEnter: y, onViewportLeave: b } = this.node.getProps(),
          S = g ? y : b;
        S && S(p);
      };
    return zA(this.node.current, d, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: s, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(BA(s, l)) && this.startObserver();
  }
  unmount() {}
}
function BA({ viewport: a = {} }, { viewport: s = {} } = {}) {
  return (l) => a[l] !== s[l];
}
const LA = {
    inView: { Feature: UA },
    tap: { Feature: jA },
    focus: { Feature: RA },
    hover: { Feature: DA },
  },
  HA = { layout: { ProjectionNode: t0, MeasureLayout: Ky } },
  gc = { current: null },
  e0 = { current: !1 };
function GA() {
  if (((e0.current = !0), !!xc))
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"),
        s = () => (gc.current = a.matches);
      (a.addListener(s), s());
    } else gc.current = !1;
}
const YA = new WeakMap();
function qA(a, s, l) {
  for (const o in s) {
    const c = s[o],
      f = l[o];
    if (se(c)) a.addValue(o, c);
    else if (se(f)) a.addValue(o, ri(c, { owner: a }));
    else if (f !== c)
      if (a.hasValue(o)) {
        const d = a.getValue(o);
        d.liveStyle === !0 ? d.jump(c) : d.hasAnimated || d.set(c);
      } else {
        const d = a.getStaticValue(o);
        a.addValue(o, ri(d !== void 0 ? d : c, { owner: a }));
      }
  }
  for (const o in l) s[o] === void 0 && a.removeValue(o);
  return s;
}
const vp = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class XA {
  scrapeMotionValuesFromProps(s, l, o) {
    return {};
  }
  constructor(
    {
      parent: s,
      props: l,
      presenceContext: o,
      reducedMotionConfig: c,
      blockInitialAnimation: f,
      visualState: d,
    },
    m = {},
  ) {
    ((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = Uc),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection,
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const S = he.now();
        this.renderScheduledAt < S &&
          ((this.renderScheduledAt = S), Vt.render(this.render, !1, !0));
      }));
    const { latestValues: p, renderState: g } = d;
    ((this.latestValues = p),
      (this.baseTarget = { ...p }),
      (this.initialValues = l.initial ? { ...p } : {}),
      (this.renderState = g),
      (this.parent = s),
      (this.props = l),
      (this.presenceContext = o),
      (this.depth = s ? s.depth + 1 : 0),
      (this.reducedMotionConfig = c),
      (this.options = m),
      (this.blockInitialAnimation = !!f),
      (this.isControllingVariants = dr(l)),
      (this.isVariantNode = Ty(l)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(s && s.current)));
    const { willChange: y, ...b } = this.scrapeMotionValuesFromProps(
      l,
      {},
      this,
    );
    for (const S in b) {
      const M = b[S];
      p[S] !== void 0 && se(M) && M.set(p[S], !1);
    }
  }
  mount(s) {
    ((this.current = s),
      YA.set(s, this),
      this.projection && !this.projection.instance && this.projection.mount(s),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((l, o) => this.bindToMotionValue(o, l)),
      e0.current || GA(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
            ? !0
            : gc.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext));
  }
  unmount() {
    (this.projection && this.projection.unmount(),
      Gn(this.notifyUpdate),
      Gn(this.render),
      this.valueSubscriptions.forEach((s) => s()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this));
    for (const s in this.events) this.events[s].clear();
    for (const s in this.features) {
      const l = this.features[s];
      l && (l.unmount(), (l.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(s, l) {
    this.valueSubscriptions.has(s) && this.valueSubscriptions.get(s)();
    const o = di.has(s);
    o && this.onBindTransform && this.onBindTransform();
    const c = l.on("change", (m) => {
        ((this.latestValues[s] = m),
          this.props.onUpdate && Vt.preRender(this.notifyUpdate),
          o && this.projection && (this.projection.isTransformDirty = !0));
      }),
      f = l.on("renderRequest", this.scheduleRender);
    let d;
    (window.MotionCheckAppearSync &&
      (d = window.MotionCheckAppearSync(this, s, l)),
      this.valueSubscriptions.set(s, () => {
        (c(), f(), d && d(), l.owner && l.stop());
      }));
  }
  sortNodePosition(s) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== s.type
      ? 0
      : this.sortInstanceNodePosition(this.current, s.current);
  }
  updateFeatures() {
    let s = "animation";
    for (s in oi) {
      const l = oi[s];
      if (!l) continue;
      const { isEnabled: o, Feature: c } = l;
      if (
        (!this.features[s] &&
          c &&
          o(this.props) &&
          (this.features[s] = new c(this)),
        this.features[s])
      ) {
        const f = this.features[s];
        f.isMounted ? f.update() : (f.mount(), (f.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : Ht();
  }
  getStaticValue(s) {
    return this.latestValues[s];
  }
  setStaticValue(s, l) {
    this.latestValues[s] = l;
  }
  update(s, l) {
    ((s.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = s),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = l));
    for (let o = 0; o < vp.length; o++) {
      const c = vp[o];
      this.propEventSubscriptions[c] &&
        (this.propEventSubscriptions[c](),
        delete this.propEventSubscriptions[c]);
      const f = "on" + c,
        d = s[f];
      d && (this.propEventSubscriptions[c] = this.on(c, d));
    }
    ((this.prevMotionValues = qA(
      this,
      this.scrapeMotionValuesFromProps(s, this.prevProps, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue());
  }
  getProps() {
    return this.props;
  }
  getVariant(s) {
    return this.props.variants ? this.props.variants[s] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
        ? this.parent.getClosestVariantNode()
        : void 0;
  }
  addVariantChild(s) {
    const l = this.getClosestVariantNode();
    if (l)
      return (
        l.variantChildren && l.variantChildren.add(s),
        () => l.variantChildren.delete(s)
      );
  }
  addValue(s, l) {
    const o = this.values.get(s);
    l !== o &&
      (o && this.removeValue(s),
      this.bindToMotionValue(s, l),
      this.values.set(s, l),
      (this.latestValues[s] = l.get()));
  }
  removeValue(s) {
    this.values.delete(s);
    const l = this.valueSubscriptions.get(s);
    (l && (l(), this.valueSubscriptions.delete(s)),
      delete this.latestValues[s],
      this.removeValueFromRenderState(s, this.renderState));
  }
  hasValue(s) {
    return this.values.has(s);
  }
  getValue(s, l) {
    if (this.props.values && this.props.values[s]) return this.props.values[s];
    let o = this.values.get(s);
    return (
      o === void 0 &&
        l !== void 0 &&
        ((o = ri(l === null ? void 0 : l, { owner: this })),
        this.addValue(s, o)),
      o
    );
  }
  readValue(s, l) {
    let o =
      this.latestValues[s] !== void 0 || !this.current
        ? this.latestValues[s]
        : (this.getBaseTargetFromProps(this.props, s) ??
          this.readValueFromInstance(this.current, s, this.options));
    return (
      o != null &&
        (typeof o == "string" && (jp(o) || wp(o))
          ? (o = parseFloat(o))
          : !rS(o) && Yn.test(l) && (o = hy(s, l)),
        this.setBaseTarget(s, se(o) ? o.get() : o)),
      se(o) ? o.get() : o
    );
  }
  setBaseTarget(s, l) {
    this.baseTarget[s] = l;
  }
  getBaseTarget(s) {
    var f;
    const { initial: l } = this.props;
    let o;
    if (typeof l == "string" || typeof l == "object") {
      const d = Jc(
        this.props,
        l,
        (f = this.presenceContext) == null ? void 0 : f.custom,
      );
      d && (o = d[s]);
    }
    if (l && o !== void 0) return o;
    const c = this.getBaseTargetFromProps(this.props, s);
    return c !== void 0 && !se(c)
      ? c
      : this.initialValues[s] !== void 0 && o === void 0
        ? void 0
        : this.baseTarget[s];
  }
  on(s, l) {
    return (
      this.events[s] || (this.events[s] = new Ec()),
      this.events[s].add(l)
    );
  }
  notify(s, ...l) {
    this.events[s] && this.events[s].notify(...l);
  }
}
class n0 extends XA {
  constructor() {
    (super(...arguments), (this.KeyframeResolver = J1));
  }
  sortInstanceNodePosition(s, l) {
    return s.compareDocumentPosition(l) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(s, l) {
    return s.style ? s.style[l] : void 0;
  }
  removeValueFromRenderState(s, { vars: l, style: o }) {
    (delete l[s], delete o[s]);
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: s } = this.props;
    se(s) &&
      (this.childSubscription = s.on("change", (l) => {
        this.current && (this.current.textContent = `${l}`);
      }));
  }
}
function a0(a, { style: s, vars: l }, o, c) {
  Object.assign(a.style, s, c && c.getProjectionStyles(o));
  for (const f in l) a.style.setProperty(f, l[f]);
}
function kA(a) {
  return window.getComputedStyle(a);
}
class ZA extends n0 {
  constructor() {
    (super(...arguments), (this.type = "html"), (this.renderInstance = a0));
  }
  readValueFromInstance(s, l) {
    var o;
    if (di.has(l))
      return (o = this.projection) != null && o.isProjecting ? nc(l) : m1(s, l);
    {
      const c = kA(s),
        f = (Nc(l) ? c.getPropertyValue(l) : c[l]) || 0;
      return typeof f == "string" ? f.trim() : f;
    }
  }
  measureInstanceViewportBox(s, { transformPagePoint: l }) {
    return qy(s, l);
  }
  build(s, l, o) {
    Kc(s, l, o.transformTemplate);
  }
  scrapeMotionValuesFromProps(s, l, o) {
    return Fc(s, l, o);
  }
}
const i0 = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function KA(a, s, l, o) {
  a0(a, s, void 0, o);
  for (const c in s.attrs) a.setAttribute(i0.has(c) ? c : Zc(c), s.attrs[c]);
}
class QA extends n0 {
  constructor() {
    (super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = Ht));
  }
  getBaseTargetFromProps(s, l) {
    return s[l];
  }
  readValueFromInstance(s, l) {
    if (di.has(l)) {
      const o = dy(l);
      return (o && o.default) || 0;
    }
    return ((l = i0.has(l) ? l : Zc(l)), s.getAttribute(l));
  }
  scrapeMotionValuesFromProps(s, l, o) {
    return wy(s, l, o);
  }
  build(s, l, o) {
    Dy(s, l, this.isSVGTag, o.transformTemplate, o.style);
  }
  renderInstance(s, l, o, c) {
    KA(s, l, o, c);
  }
  mount(s) {
    ((this.isSVGTag = jy(s.tagName)), super.mount(s));
  }
}
const PA = (a, s) =>
    Pc(a) ? new QA(s) : new ZA(s, { allowProjection: a !== X.Fragment }),
  JA = KS({ ...vT, ...LA, ...NA, ...HA }, PA),
  xp = yS(JA),
  Wc = ({
    isOpen: a,
    onClose: s,
    title: l,
    children: o,
    size: c = "default",
    footer: f,
  }) => {
    const d =
      c === "large"
        ? "w-full max-w-4xl mx-4 max-h-[90vh] bg-white rounded-lg shadow-xl relative flex flex-col"
        : "w-full max-w-lg mx-4 max-h-[90vh] bg-white rounded-lg shadow-xl relative flex flex-col";
    return x.jsx(dS, {
      children:
        a &&
        x.jsx(xp.div, {
          className:
            "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: s,
          children: x.jsxs(xp.div, {
            className: d,
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.8, opacity: 0 },
            onClick: (m) => m.stopPropagation(),
            children: [
              x.jsxs("div", {
                className:
                  "flex items-center justify-between p-4 lg:p-6 border-b border-gray-200",
                children: [
                  x.jsx("h2", {
                    className:
                      "text-lg lg:text-xl font-semibold text-gray-800 pr-4",
                    children: l,
                  }),
                  x.jsx("button", {
                    className:
                      "text-gray-400 hover:text-gray-600 text-2xl leading-none font-bold focus:outline-none flex-shrink-0",
                    onClick: s,
                    children: "×",
                  }),
                ],
              }),
              x.jsx("div", {
                className: "flex-1 p-4 lg:p-6 overflow-y-auto",
                children: o,
              }),
              f &&
                x.jsx("div", {
                  className:
                    "flex flex-col sm:flex-row gap-3 p-4 lg:p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg",
                  children: f,
                }),
            ],
          }),
        }),
    });
  },
  FA = ({ isOpen: a, winner: s }) => {
    const { restartGame: l } = or(),
      o = () => {
        l();
      };
    if (!a || !s) return null;
    const c = s === "player",
      f = s === "enemy";
    return x.jsx(Wc, {
      isOpen: a,
      onClose: () => {},
      title: c ? "Victory!" : f ? "Defeat!" : "Draw!",
      children: x.jsxs("div", {
        className: "text-center p-6",
        children: [
          x.jsx("div", {
            className: "text-6xl mb-4",
            children: c ? "🎉" : f ? "💀" : "🤝",
          }),
          x.jsx("p", {
            className: "text-gray-600 mb-6 leading-relaxed",
            children: c
              ? "Congratulations! You have conquered the realm of Aeloria! Your strategic prowess has led your forces to victory."
              : f
                ? "The enemy has overwhelmed your forces. Your commanders fought valiantly, but this battle is lost. Will you rise again?"
                : "The battle has ended in a stalemate. Neither side could claim decisive victory. Regroup and try a different strategy!",
          }),
          x.jsxs("div", {
            className: "space-y-3",
            children: [
              x.jsx(Ue, {
                variant: c ? "success" : "primary",
                size: "lg",
                fullWidth: !0,
                onClick: o,
                leftIcon: c ? "🎯" : f ? "⚔️" : "🔄",
                children: c ? "Play Again" : f ? "Fight Again" : "Try Again",
              }),
              x.jsx("div", {
                className: "text-xs text-gray-500",
                children: c
                  ? "Challenge yourself with a new conquest!"
                  : f
                    ? "Learn from defeat and claim victory!"
                    : "Refine your strategy and attempt victory!",
              }),
            ],
          }),
        ],
      }),
    });
  },
  $A = ({ isOpen: a, onClose: s }) => {
    const [l, o] = X.useState(null),
      [c, f] = X.useState(null),
      d = ee((S) => S.resources),
      m = ee((S) => S.addCommander),
      p = () => {
        l && c && m(l, c) && (o(null), f(null), s());
      },
      g = () => {
        (o(null), f(null), s());
      },
      y = l ? d.gold >= pt.commanderClasses[l].cost : !1,
      b = x.jsxs(x.Fragment, {
        children: [
          x.jsx(ca, {
            variant: "secondary",
            onClick: g,
            fullWidth: !0,
            className: "sm:w-auto",
            children: "Cancel",
          }),
          x.jsxs(ca, {
            variant: "primary",
            onClick: p,
            disabled: !l || !c || !y,
            fullWidth: !0,
            className: "sm:w-auto",
            children: [
              "Recruit (",
              l ? pt.commanderClasses[l].cost : "-",
              " Gold)",
            ],
          }),
        ],
      });
    return x.jsx(Wc, {
      isOpen: a,
      onClose: s,
      title: "Recruit Commander",
      footer: b,
      children: x.jsxs("div", {
        className: "space-y-4 lg:space-y-6",
        children: [
          x.jsxs("div", {
            children: [
              x.jsx("h4", {
                className:
                  "text-sm lg:text-md font-semibold text-gray-800 mb-3",
                children: "Select Class:",
              }),
              x.jsx("div", {
                className: "grid grid-cols-1 gap-2",
                children: Object.entries(pt.commanderClasses).map(([S, M]) =>
                  x.jsxs(
                    "div",
                    {
                      className: `p-3 border rounded cursor-pointer transition-all duration-200 flex items-center gap-3 ${l === S ? "border-blue-500 bg-blue-500 text-white" : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"}`,
                      onClick: () => o(S),
                      children: [
                        x.jsx("div", {
                          className:
                            "text-lg lg:text-xl w-6 lg:w-8 text-center flex-shrink-0",
                          children: M.icon,
                        }),
                        x.jsxs("div", {
                          className: "flex-1 min-w-0",
                          children: [
                            x.jsx("div", {
                              className: "font-medium text-sm lg:text-base",
                              children: M.name,
                            }),
                            x.jsx("div", {
                              className: `text-xs lg:text-sm mt-1 ${l === S ? "opacity-80" : "text-gray-600"}`,
                              children: M.description,
                            }),
                          ],
                        }),
                        x.jsxs("div", {
                          className: "text-sm font-medium",
                          children: ["Cost: ", M.cost, " gold"],
                        }),
                      ],
                    },
                    S,
                  ),
                ),
              }),
            ],
          }),
          x.jsxs("div", {
            children: [
              x.jsx("h4", {
                className:
                  "text-sm lg:text-md font-semibold text-gray-800 mb-3",
                children: "Select Race:",
              }),
              x.jsx("div", {
                className: "grid grid-cols-1 gap-2",
                children: Object.entries(pt.races).map(([S, M]) =>
                  x.jsxs(
                    "div",
                    {
                      className: `p-3 border rounded cursor-pointer transition-all duration-200 flex items-center gap-3 ${c === S ? "border-blue-500 bg-blue-500 text-white" : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"}`,
                      onClick: () => f(S),
                      children: [
                        x.jsx("div", {
                          className:
                            "text-lg lg:text-xl w-6 lg:w-8 text-center flex-shrink-0",
                          children: M.icon,
                        }),
                        x.jsxs("div", {
                          className: "flex-1 min-w-0",
                          children: [
                            x.jsx("div", {
                              className: "font-medium text-sm lg:text-base",
                              children: M.name,
                            }),
                            x.jsx("div", {
                              className: `text-xs lg:text-sm mt-1 ${c === S ? "opacity-80" : "text-gray-600"}`,
                              children: M.bonus,
                            }),
                          ],
                        }),
                      ],
                    },
                    S,
                  ),
                ),
              }),
            ],
          }),
          x.jsx("div", {
            className: "bg-gray-50 p-3 lg:p-4 rounded border border-gray-200",
            children:
              l && c
                ? x.jsxs("div", {
                    className: "space-y-2 lg:space-y-3",
                    children: [
                      x.jsx("h4", {
                        className:
                          "text-sm lg:text-md font-semibold text-gray-800",
                        children: "Commander Summary:",
                      }),
                      x.jsxs("div", {
                        className: "space-y-2",
                        children: [
                          x.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [
                              x.jsx("span", {
                                className: "text-gray-600",
                                children: "Name:",
                              }),
                              x.jsxs("span", {
                                className: "font-medium",
                                children: [
                                  pt.races[c].name,
                                  " ",
                                  pt.commanderClasses[l].name,
                                ],
                              }),
                            ],
                          }),
                          x.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [
                              x.jsx("span", {
                                className: "text-gray-600",
                                children: "Health:",
                              }),
                              x.jsx("span", {
                                className: "font-medium",
                                children: pt.commanderClasses[l].baseHealth,
                              }),
                            ],
                          }),
                          x.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [
                              x.jsx("span", {
                                className: "text-gray-600",
                                children: "Attack:",
                              }),
                              x.jsx("span", {
                                className: "font-medium",
                                children: pt.commanderClasses[l].baseAttack,
                              }),
                            ],
                          }),
                          x.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [
                              x.jsx("span", {
                                className: "text-gray-600",
                                children: "Defense:",
                              }),
                              x.jsx("span", {
                                className: "font-medium",
                                children: pt.commanderClasses[l].baseDefense,
                              }),
                            ],
                          }),
                          x.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [
                              x.jsx("span", {
                                className: "text-gray-600",
                                children: "Special:",
                              }),
                              x.jsx("span", {
                                className: "font-medium",
                                children: pt.commanderClasses[l].specialAbility,
                              }),
                            ],
                          }),
                          x.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [
                              x.jsx("span", {
                                className: "text-gray-600",
                                children: "Racial Bonus:",
                              }),
                              x.jsx("span", {
                                className: "font-medium",
                                children: pt.races[c].bonus,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                : x.jsx("p", {
                    className: "text-gray-500 text-center",
                    children: "Select a class and race to see details",
                  }),
          }),
        ],
      }),
    });
  },
  WA = ({ isOpen: a, onClose: s }) => {
    const l = x.jsx(ca, {
      variant: "primary",
      onClick: s,
      children: "Got it!",
    });
    return x.jsx(Wc, {
      isOpen: a,
      onClose: s,
      title: "Game Rules & Help",
      size: "large",
      footer: l,
      children: x.jsxs("div", {
        className: "help-content",
        children: [
          x.jsx("h3", { children: "Objective" }),
          x.jsx("p", {
            children: "Control 70% of strategic nodes to achieve victory!",
          }),
          x.jsx("h3", { children: "Node Types" }),
          x.jsxs("ul", {
            children: [
              x.jsxs("li", {
                children: [
                  x.jsx("strong", { children: "🏰 Cities:" }),
                  " Generate gold and supplies, enable troop recruitment",
                ],
              }),
              x.jsxs("li", {
                children: [
                  x.jsx("strong", { children: "⛏️ Resource Nodes:" }),
                  " Provide valuable resources for your empire",
                ],
              }),
              x.jsxs("li", {
                children: [
                  x.jsx("strong", { children: "🛡️ Fortresses:" }),
                  " Defensive strongholds with high garrison value",
                ],
              }),
              x.jsxs("li", {
                children: [
                  x.jsx("strong", { children: "✨ Shrines:" }),
                  " Ancient sites that provide magical power",
                ],
              }),
              x.jsxs("li", {
                children: [
                  x.jsx("strong", { children: "💀 Enemy Strongholds:" }),
                  " Heavily fortified enemy positions",
                ],
              }),
            ],
          }),
          x.jsx("h3", { children: "Commander Classes" }),
          x.jsxs("ul", {
            children: [
              x.jsxs("li", {
                children: [
                  x.jsx("strong", { children: "⚔️ Knight:" }),
                  " Tank unit with high defense and Shield Wall ability",
                ],
              }),
              x.jsxs("li", {
                children: [
                  x.jsx("strong", { children: "🔮 Mage:" }),
                  " AOE damage dealer with Fireball ability",
                ],
              }),
              x.jsxs("li", {
                children: [
                  x.jsx("strong", { children: "🏹 Ranger:" }),
                  " Scout with mobility and Stealth ability",
                ],
              }),
              x.jsxs("li", {
                children: [
                  x.jsx("strong", { children: "👑 Warlord:" }),
                  " Leadership buffs with Rally ability",
                ],
              }),
            ],
          }),
          x.jsx("h3", { children: "Combat System" }),
          x.jsx("p", { children: "Rock-Paper-Scissors mechanics:" }),
          x.jsxs("ul", {
            children: [
              x.jsx("li", { children: "Cavalry beats Archers" }),
              x.jsx("li", { children: "Archers beat Soldiers" }),
              x.jsx("li", { children: "Soldiers beat Cavalry" }),
              x.jsx("li", { children: "Mages disrupt all but are fragile" }),
            ],
          }),
          x.jsx("h3", { children: "How to Play" }),
          x.jsxs("ol", {
            children: [
              x.jsx("li", { children: "Click on your nodes to select them" }),
              x.jsx("li", {
                children: "Click on adjacent enemy nodes to attack",
              }),
              x.jsx("li", {
                children: "Recruit commanders and assign them to nodes",
              }),
              x.jsx("li", {
                children: "Manage your resources and supply lines",
              }),
              x.jsx("li", { children: "End your turn to let enemies respond" }),
            ],
          }),
          x.jsx("h3", { children: "Victory Conditions" }),
          x.jsx("p", {
            children:
              "Achieve victory by controlling 70% of all nodes on the map. Each node has different strategic value and resource generation capabilities.",
          }),
        ],
      }),
    });
  };
var IA = Tp();
const t2 = { success: "✅", error: "❌", warning: "⚠️", info: "ℹ️" },
  e2 = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  },
  n2 = ({ notification: a, onClose: s }) => {
    const { id: l, type: o, message: c, duration: f } = a;
    X.useEffect(() => {
      if (f && f > 0) {
        const m = setTimeout(() => {
          s(l);
        }, f);
        return () => clearTimeout(m);
      }
    }, [l, f, s]);
    const d = () => {
      s(l);
    };
    return x.jsxs("div", {
      className: `
      flex items-center justify-between p-4 mb-3 border rounded-lg shadow-lg
      ${e2[o]}
      animate-in slide-in-from-right duration-300
    `,
      children: [
        x.jsxs("div", {
          className: "flex items-center",
          children: [
            x.jsx("span", { className: "mr-3 text-lg", children: t2[o] }),
            x.jsx("span", { className: "text-sm font-medium", children: c }),
          ],
        }),
        x.jsx(Ue, {
          variant: "ghost",
          size: "xs",
          onClick: d,
          className: "!p-1 !min-h-0 hover:bg-transparent hover:text-gray-600",
          "aria-label": "Close notification",
          children: "✕",
        }),
      ],
    });
  },
  a2 = ({ notifications: a, onClose: s }) => {
    if (a.length === 0) return null;
    const l = x.jsx("div", {
      className: "fixed top-4 right-4 z-50 w-80 max-w-sm",
      children: a.map((o) => x.jsx(n2, { notification: o, onClose: s }, o.id)),
    });
    return IA.createPortal(l, document.body);
  },
  bp = { recruitment: !1, help: !1 },
  i2 = () => {
    const [a, s] = X.useState(bp),
      l = X.useCallback((f) => {
        s((d) => ({ ...d, [f]: !0 }));
      }, []),
      o = X.useCallback((f) => {
        s((d) => ({ ...d, [f]: !1 }));
      }, []),
      c = X.useCallback(() => {
        s(bp);
      }, []);
    return {
      modals: a,
      openModal: l,
      closeModal: o,
      closeAllModals: c,
      openRecruitment: () => l("recruitment"),
      closeRecruitment: () => o("recruitment"),
      openHelp: () => l("help"),
      closeHelp: () => o("help"),
    };
  },
  s2 = () => {
    const { gameOver: a, winner: s } = Cp(),
      { notifications: l, removeNotification: o } = Np(),
      {
        modals: c,
        openRecruitment: f,
        closeRecruitment: d,
        openHelp: m,
        closeHelp: p,
      } = i2();
    return x.jsxs(x.Fragment, {
      children: [
        x.jsx(Bx, {
          header: x.jsx(Qx, {}),
          leftPanel: x.jsx(nb, { onRecruitClick: f, onHelpClick: m }),
          mainContent: x.jsx(Px, {}),
          rightPanel: x.jsx(fb, {}),
        }),
        x.jsx(FA, { isOpen: a, winner: s }),
        x.jsx($A, { isOpen: c.recruitment, onClose: d }),
        x.jsx(WA, { isOpen: c.help, onClose: p }),
        x.jsx(a2, { notifications: l, onClose: o }),
      ],
    });
  };
function l2() {
  return x.jsx(ob, {
    children: x.jsx("div", {
      className:
        "h-screen bg-gray-50 text-gray-900 flex flex-col overflow-hidden",
      children: x.jsx(s2, {}),
    }),
  });
}
const r2 = Ux.createRoot(document.getElementById("root"));
r2.render(x.jsx(Pu.StrictMode, { children: x.jsx(l2, {}) }));
