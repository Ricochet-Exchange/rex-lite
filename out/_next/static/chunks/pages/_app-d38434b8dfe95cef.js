 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n="function"==typeof Symbol&&Symbol.for,a=n?Symbol.for("react.element"):60103,r=n?Symbol.for("react.portal"):60106,i=n?Symbol.for("react.fragment"):60107,o=n?Symbol.for("react.strict_mode"):60108,s=n?Symbol.for("react.profiler"):60114,d=n?Symbol.for("react.provider"):60109,c=n?Symbol.for("react.context"):60110,u=n?Symbol.for("react.async_mode"):60111,b=n?Symbol.for("react.concurrent_mode"):60111,f=n?Symbol.for("react.forward_ref"):60112,l=n?Symbol.for("react.suspense"):60113,p=n?Symbol.for("react.suspense_list"):60120,y=n?Symbol.for("react.memo"):60115,m=n?Symbol.for("react.lazy"):60116,h=n?Symbol.for("react.block"):60121,g=n?Symbol.for("react.fundamental"):60117,v=n?Symbol.for("react.responder"):60118,k=n?Symbol.for("react.scope"):60119;function T(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case a:switch(e=e.type){case u:case b:case i:case s:case o:case l:return e;default:switch(e=e&&e.$$typeof){case c:case f:case m:case y:case d:return e;default:return t}}case r:return t}}}function w(e){return T(e)===b}t.AsyncMode=u,t.ConcurrentMode=b,t.ContextConsumer=c,t.ContextProvider=d,t.Element=a,t.ForwardRef=f,t.Fragment=i,t.Lazy=m,t.Memo=y,t.Portal=r,t.Profiler=s,t.StrictMode=o,t.Suspense=l,t.isAsyncMode=function(e){return w(e)||T(e)===u},t.isConcurrentMode=w,t.isContextConsumer=function(e){return T(e)===c},t.isContextProvider=function(e){return T(e)===d},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===a},t.isForwardRef=function(e){return T(e)===f},t.isFragment=function(e){return T(e)===i},t.isLazy=function(e){return T(e)===m},t.isMemo=function(e){return T(e)===y},t.isPortal=function(e){return T(e)===r},t.isProfiler=function(e){return T(e)===s},t.isStrictMode=function(e){return T(e)===o},t.isSuspense=function(e){return T(e)===l},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===i||e===b||e===s||e===o||e===l||e===p||"object"==typeof e&&null!==e&&(e.$$typeof===m||e.$$typeof===y||e.$$typeof===d||e.$$typeof===c||e.$$typeof===f||e.$$typeof===g||e.$$typeof===v||e.$$typeof===k||e.$$typeof===h)},t.typeOf=T},59864:function(e,t,n){"use strict";e.exports=n(69921)},2664:function(e,t,n){"use strict";n.r(t),n.d(t,{Provider:function(){return L},ReactReduxContext:function(){return c},batch:function(){return i.unstable_batchedUpdates},connect:function(){return j},createDispatchHook:function(){return V},createSelectorHook:function(){return p},createStoreHook:function(){return B},shallowEqual:function(){return F},useDispatch:function(){return H},useSelector:function(){return y},useStore:function(){return U}});var a=n(61688),r=n(52798),i=n(73935);let o=function(e){e()},s=()=>o;var d=n(67294);let c=(0,d.createContext)(null);function u(){let e=(0,d.useContext)(c);return e}let b=()=>{throw Error("uSES not initialized!")},f=b,l=(e,t)=>e===t;function p(e=c){let t=e===c?u:()=>(0,d.useContext)(e);return function(e,n=l){let{store:a,subscription:r,getServerState:i}=t(),o=f(r.addNestedSub,a.getState,i||a.getState,e,n);return(0,d.useDebugValue)(o),o}}let y=p();var m=n(87462),h=n(63366),g=n(8679),v=n.n(g),k=n(72973);let T=["initMapStateToProps","initMapDispatchToProps","initMergeProps"];function w(e){return function(t){let n=e(t);function a(){return n}return a.dependsOnOwnProps=!1,a}}function x(e){return e.dependsOnOwnProps?Boolean(e.dependsOnOwnProps):1!==e.length}function _(e,t){return function(t,{displayName:n}){let a=function(e,t){return a.dependsOnOwnProps?a.mapToProps(e,t):a.mapToProps(e,void 0)};return a.dependsOnOwnProps=!0,a.mapToProps=function(t,n){a.mapToProps=e,a.dependsOnOwnProps=x(e);let r=a(t,n);return"function"==typeof r&&(a.mapToProps=r,a.dependsOnOwnProps=x(r),r=a(t,n)),r},a}}function S(e,t){return(n,a)=>{throw Error(`Invalid value of type ${typeof e} for ${t} argument when connecting component ${a.wrappedComponentName}.`)}}function A(e,t,n){return(0,m.Z)({},n,e,t)}let C={notify(){},get:()=>[]};function E(e,t){let n;let a=C;function r(){o.onStateChange&&o.onStateChange()}function i(){n||(n=t?t.addNestedSub(r):e.subscribe(r),a=function(){let e=s(),t=null,n=null;return{clear(){t=null,n=null},notify(){e(()=>{let e=t;for(;e;)e.callback(),e=e.next})},get(){let e=[],n=t;for(;n;)e.push(n),n=n.next;return e},subscribe(e){let a=!0,r=n={callback:e,next:null,prev:n};return r.prev?r.prev.next=r:t=r,function(){a&&null!==t&&(a=!1,r.next?r.next.prev=r.prev:n=r.prev,r.prev?r.prev.next=r.next:t=r.next)}}}}())}let o={addNestedSub:function(e){return i(),a.subscribe(e)},notifyNestedSubs:function(){a.notify()},handleChangeWrapper:r,isSubscribed:function(){return Boolean(n)},trySubscribe:i,tryUnsubscribe:function(){n&&(n(),n=void 0,a.clear(),a=C)},getListeners:()=>a};return o}let I=!!("undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement),N=I?d.useLayoutEffect:d.useEffect;function O(e,t){return e===t?0!==e||0!==t||1/e==1/t:e!=e&&t!=t}function F(e,t){if(O(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;let n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(let r=0;r<n.length;r++)if(!Object.prototype.hasOwnProperty.call(t,n[r])||!O(e[n[r]],t[n[r]]))return!1;return!0}let M=["reactReduxForwardedRef"],R=b,P=[null,null];function D(e,t){return e===t}var j=function(e,t,n,{pure:a,areStatesEqual:r=D,areOwnPropsEqual:i=F,areStatePropsEqual:o=F,areMergedPropsEqual:s=F,forwardRef:u=!1,context:b=c}={}){let f=e?"function"==typeof e?_(e,"mapStateToProps"):S(e,"mapStateToProps"):w(()=>({})),l=t&&"object"==typeof t?w(e=>(function(e,t){let n={};for(let a in e){let r=e[a];"function"==typeof r&&(n[a]=(...e)=>t(r(...e)))}return n})(t,e)):t?"function"==typeof t?_(t,"mapDispatchToProps"):S(t,"mapDispatchToProps"):w(e=>({dispatch:e})),p=n?"function"==typeof n?function(e,{displayName:t,areMergedPropsEqual:a}){let r,i=!1;return function(e,t,o){let s=n(e,t,o);return i?a(s,r)||(r=s):(i=!0,r=s),r}}:S(n,"mergeProps"):()=>A,y=Boolean(e),g=e=>{let t=e.displayName||e.name||"Component",n=`Connect(${t})`,a={shouldHandleStateChanges:y,displayName:n,wrappedComponentName:t,WrappedComponent:e,initMapStateToProps:f,initMapDispatchToProps:l,initMergeProps:p,areStatesEqual:r,areStatePropsEqual:o,areOwnPropsEqual:i,areMergedPropsEqual:s};function c(t){var n;let r;let[i,o,s]=(0,d.useMemo)(()=>{let{reactReduxForwardedRef:e}=t,n=(0,h.Z)(t,M);return[t.context,e,n]},[t]),c=(0,d.useMemo)(()=>i&&i.Consumer&&(0,k.isContextConsumer)(d.createElement(i.Consumer,null))?i:b,[i,b]),u=(0,d.useContext)(c),f=Boolean(t.store)&&Boolean(t.store.getState)&&Boolean(t.store.dispatch),l=Boolean(u)&&Boolean(u.store),p=f?t.store:u.store,g=l?u.getServerState:p.getState,v=(0,d.useMemo)(()=>(function(e,t){let{initMapStateToProps:n,initMapDispatchToProps:a,initMergeProps:r}=t,i=(0,h.Z)(t,T),o=n(e,i),s=a(e,i),d=r(e,i);return function(e,t,n,a,{areStatesEqual:r,areOwnPropsEqual:i,areStatePropsEqual:o}){let s,d,c,u,b,f=!1;return function(l,p){return f?function(f,l){let p=!i(l,d),y=!r(f,s,l,d);return(s=f,d=l,p&&y)?(c=e(s,d),t.dependsOnOwnProps&&(u=t(a,d)),b=n(c,u,d)):p?(e.dependsOnOwnProps&&(c=e(s,d)),t.dependsOnOwnProps&&(u=t(a,d)),b=n(c,u,d)):y?function(){let t=e(s,d),a=!o(t,c);return c=t,a&&(b=n(c,u,d)),b}():b}(l,p):(b=n(c=e(s=l,d=p),u=t(a,d),d),f=!0,b)}}(o,s,d,e,i)})(p.dispatch,a),[p]),[w,x]=(0,d.useMemo)(()=>{if(!y)return P;let e=E(p,f?void 0:u.subscription),t=e.notifyNestedSubs.bind(e);return[e,t]},[p,f,u]),_=(0,d.useMemo)(()=>f?u:(0,m.Z)({},u,{subscription:w}),[f,u,w]),S=(0,d.useRef)(),A=(0,d.useRef)(s),C=(0,d.useRef)(),I=(0,d.useRef)(!1);(0,d.useRef)(!1);let O=(0,d.useRef)(!1),F=(0,d.useRef)();N(()=>(O.current=!0,()=>{O.current=!1}),[]);let D=(0,d.useMemo)(()=>{let e=()=>C.current&&s===A.current?C.current:v(p.getState(),s);return e},[p,s]),j=(0,d.useMemo)(()=>{let e=e=>w?function(e,t,n,a,r,i,o,s,d,c,u){if(!e)return()=>{};let b=!1,f=null,l=()=>{let e,n;if(b||!s.current)return;let l=t.getState();try{e=a(l,r.current)}catch(p){n=p,f=p}n||(f=null),e===i.current?o.current||c():(i.current=e,d.current=e,o.current=!0,u())};n.onStateChange=l,n.trySubscribe(),l();let p=()=>{if(b=!0,n.tryUnsubscribe(),n.onStateChange=null,f)throw f};return p}(y,p,w,v,A,S,I,O,C,x,e):()=>{};return e},[w]);n=[A,S,I,s,C,x],N(()=>(function(e,t,n,a,r,i){e.current=a,n.current=!1,r.current&&(r.current=null,i())})(...n),void 0);try{r=R(j,D,g?()=>v(g(),s):D)}catch(L){throw F.current&&(L.message+=`
The error may be correlated with this previous error:
${F.current.stack}

`),L}N(()=>{F.current=void 0,C.current=void 0,S.current=r});let B=(0,d.useMemo)(()=>d.createElement(e,(0,m.Z)({},r,{ref:o})),[o,e,r]),U=(0,d.useMemo)(()=>y?d.createElement(c.Provider,{value:_},B):B,[c,B,_]);return U}let g=d.memo(c),w=g;if(w.WrappedComponent=e,w.displayName=c.displayName=n,u){let x=d.forwardRef(function(e,t){return d.createElement(w,(0,m.Z)({},e,{reactReduxForwardedRef:t}))}),_=x;return _.displayName=n,_.WrappedComponent=e,v()(_,e)}return v()(w,e)};return g},L=function({store:e,context:t,children:n,serverState:a}){let r=(0,d.useMemo)(()=>{let t=E(e);return{store:e,subscription:t,getServerState:a?()=>a:void 0}},[e,a]),i=(0,d.useMemo)(()=>e.getState(),[e]);return N(()=>{let{subscription:t}=r;return t.onStateChange=t.notifyNestedSubs,t.trySubscribe(),i!==e.getState()&&t.notifyNestedSubs(),()=>{t.tryUnsubscribe(),t.onStateChange=void 0}},[r,i]),d.createElement((t||c).Provider,{value:r},n)};function B(e=c){let t=e===c?u:()=>(0,d.useContext)(e);return function(){let{store:e}=t();return e}}let U=B();function V(e=c){let t=e===c?U:B(e);return function(){let e=t();return e.dispatch}}let H=V();f=r.useSyncExternalStoreWithSelector,R=a.useSyncExternalStore,o=i.unstable_batchedUpdates},88359:function(e,t){"use strict";/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=Symbol.for("react.element"),a=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),d=Symbol.for("react.context"),c=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),b=Symbol.for("react.suspense"),f=Symbol.for("react.suspense_list"),l=Symbol.for("react.memo"),p=Symbol.for("react.lazy");Symbol.for("react.offscreen"),Symbol.for("react.module.reference"),t.isContextConsumer=function(e){return function(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case n:switch(e=e.type){case r:case o:case i:case b:case f:return e;default:switch(e=e&&e.$$typeof){case c:case d:case u:case p:case l:case s:return e;default:return t}}case a:return t}}}(e)===d}},72973:function(e,t,n){"use strict";e.exports=n(88359)},45217:function(e,t,n){"use strict";n.d(t,{Kf:function(){return c},md:function(){return m},DE:function(){return p},UY:function(){return f},qC:function(){return y},MT:function(){return u},jB:function(){return b}});var a=n(4942);function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach(function(t){(0,a.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function o(e){return"Minified Redux error #"+e+"; visit https://redux.js.org/Errors?code="+e+" for the full message or use the non-minified dev environment for full errors. "}var s="function"==typeof Symbol&&Symbol.observable||"@@observable",d=function(){return Math.random().toString(36).substring(7).split("").join(".")},c={INIT:"@@redux/INIT"+d(),REPLACE:"@@redux/REPLACE"+d(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+d()}};function u(e,t,n){if("function"==typeof t&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw Error(o(0));if("function"==typeof t&&void 0===n&&(n=t,t=void 0),void 0!==n){if("function"!=typeof n)throw Error(o(1));return n(u)(e,t)}if("function"!=typeof e)throw Error(o(2));var a,r=e,i=t,d=[],b=d,f=!1;function l(){b===d&&(b=d.slice())}function p(){if(f)throw Error(o(3));return i}function y(e){if("function"!=typeof e)throw Error(o(4));if(f)throw Error(o(5));var t=!0;return l(),b.push(e),function(){if(t){if(f)throw Error(o(6));t=!1,l();var n=b.indexOf(e);b.splice(n,1),d=null}}}function m(e){if(!function(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}(e))throw Error(o(7));if(void 0===e.type)throw Error(o(8));if(f)throw Error(o(9));try{f=!0,i=r(i,e)}finally{f=!1}for(var t=d=b,n=0;n<t.length;n++)(0,t[n])();return e}return m({type:c.INIT}),(a={dispatch:m,subscribe:y,getState:p,replaceReducer:function(e){if("function"!=typeof e)throw Error(o(10));r=e,m({type:c.REPLACE})}})[s]=function(){var e;return(e={subscribe:function(e){if("object"!=typeof e||null===e)throw Error(o(11));function t(){e.next&&e.next(p())}return t(),{unsubscribe:y(t)}}})[s]=function(){return this},e},a}var b=u;function f(e){for(var t,n=Object.keys(e),a={},r=0;r<n.length;r++){var i=n[r];"function"==typeof e[i]&&(a[i]=e[i])}var s=Object.keys(a);try{!function(e){Object.keys(e).forEach(function(t){var n=e[t];if(void 0===n(void 0,{type:c.INIT}))throw Error(o(12));if(void 0===n(void 0,{type:c.PROBE_UNKNOWN_ACTION()}))throw Error(o(13))})}(a)}catch(d){t=d}return function(e,n){if(void 0===e&&(e={}),t)throw t;for(var r=!1,i={},d=0;d<s.length;d++){var c=s[d],u=a[c],b=e[c],f=u(b,n);if(void 0===f)throw n&&n.type,Error(o(14));i[c]=f,r=r||f!==b}return(r=r||s.length!==Object.keys(e).length)?i:e}}function l(e,t){return function(){return t(e.apply(this,arguments))}}function p(e,t){if("function"==typeof e)return l(e,t);if("object"!=typeof e||null===e)throw Error(o(16));var n={};for(var a in e){var r=e[a];"function"==typeof r&&(n[a]=l(r,t))}return n}function y(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})}function m(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return function(){var n=e.apply(void 0,arguments),a=function(){throw Error(o(15))},r={getState:n.getState,dispatch:function(){return a.apply(void 0,arguments)}},s=t.map(function(e){return e(r)});return a=y.apply(void 0,s)(n.dispatch),i(i({},n),{},{dispatch:a})}}}},44815:function(e,t,n){"use strict";n.d(t,{PW:function(){return i}});var a="NOT_FOUND",r=function(e,t){return e===t};function i(e,t){var n,i,o="object"==typeof t?t:{equalityCheck:t},s=o.equalityCheck,d=o.maxSize,c=void 0===d?1:d,u=o.resultEqualityCheck,b=(n=void 0===s?r:s,function(e,t){if(null===e||null===t||e.length!==t.length)return!1;for(var a=e.length,r=0;r<a;r++)if(!n(e[r],t[r]))return!1;return!0}),f=1===c?{get:function(e){return i&&b(i.key,e)?i.value:a},put:function(e,t){i={key:e,value:t}},getEntries:function(){return i?[i]:[]},clear:function(){i=void 0}}:function(e,t){var n=[];function r(e){var r=n.findIndex(function(n){return t(e,n.key)});if(r>-1){var i=n[r];return r>0&&(n.splice(r,1),n.unshift(i)),i.value}return a}return{get:r,put:function(t,i){r(t)===a&&(n.unshift({key:t,value:i}),n.length>e&&n.pop())},getEntries:function(){return n},clear:function(){n=[]}}}(c,b);function l(){var t=f.get(arguments);if(t===a){if(t=e.apply(null,arguments),u){var n=f.getEntries().find(function(e){return u(e.value,t)});n&&(t=n.value)}f.put(arguments,t)}return t}return l.clearCache=function(){return f.clear()},l}},22222:function(e,t,n){"use strict";n.d(t,{P1:function(){return a}});var a=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return function(){for(var t,a=arguments.length,r=Array(a),i=0;i<a;i++)r[i]=arguments[i];var o=0,s={memoizeOptions:void 0},d=r.pop();if("object"==typeof d&&(s=d,d=r.pop()),"function"!=typeof d)throw Error("createSelector expects an output function after the inputs, but received: ["+typeof d+"]");var c=s.memoizeOptions,u=void 0===c?n:c,b=Array.isArray(u)?u:[u],f=function(e){var t=Array.isArray(e[0])?e[0]:e;if(!t.every(function(e){return"function"==typeof e}))throw Error("createSelector expects all input-selectors to be functions, but received the following types: ["+t.map(function(e){return"function"==typeof e?"function "+(e.name||"unnamed")+"()":typeof e}).join(", ")+"]");return t}(r),l=e.apply(void 0,[function(){return o++,d.apply(null,arguments)}].concat(b)),p=e(function(){for(var e=[],n=f.length,a=0;a<n;a++)e.push(f[a].apply(null,arguments));return t=l.apply(null,e)});return Object.assign(p,{resultFunc:d,memoizedResultFunc:l,dependencies:f,lastResult:function(){return t},recomputations:function(){return o},resetRecomputations:function(){return o=0}}),p}}(n(44815).PW)},17635:function(e){"use strict";!function(t){function n(e){let t=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),n=1779033703,a=3144134277,r=1013904242,i=2773480762,o=1359893119,s=2600822924,d=528734635,c=1541459225,u=new Uint32Array(64);function b(e){let b=0,f=e.length;for(;f>=64;){let l=n,p=a,y=r,m=i,h=o,g=s,v=d,k=c,T,w,x,_,S;for(w=0;w<16;w++)x=b+4*w,u[w]=(255&e[x])<<24|(255&e[x+1])<<16|(255&e[x+2])<<8|255&e[x+3];for(w=16;w<64;w++)_=((T=u[w-2])>>>17|T<<15)^(T>>>19|T<<13)^T>>>10,S=((T=u[w-15])>>>7|T<<25)^(T>>>18|T<<14)^T>>>3,u[w]=(_+u[w-7]|0)+(S+u[w-16]|0)|0;for(w=0;w<64;w++)_=(((h>>>6|h<<26)^(h>>>11|h<<21)^(h>>>25|h<<7))+(h&g^~h&v)|0)+(k+(t[w]+u[w]|0)|0)|0,S=((l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10))+(l&p^l&y^p&y)|0,k=v,v=g,g=h,h=m+_|0,m=y,y=p,p=l,l=_+S|0;n=n+l|0,a=a+p|0,r=r+y|0,i=i+m|0,o=o+h|0,s=s+g|0,d=d+v|0,c=c+k|0,b+=64,f-=64}}b(e);let f,l=e.length%64,p=e.length/536870912|0,y=e.length<<3,m=l<56?56:120,h=e.slice(e.length-l,e.length);for(h.push(128),f=l+1;f<m;f++)h.push(0);return h.push(p>>>24&255),h.push(p>>>16&255),h.push(p>>>8&255),h.push(p>>>0&255),h.push(y>>>24&255),h.push(y>>>16&255),h.push(y>>>8&255),h.push(y>>>0&255),b(h),[n>>>24&255,n>>>16&255,n>>>8&255,n>>>0&255,a>>>24&255,a>>>16&255,a>>>8&255,a>>>0&255,r>>>24&255,r>>>16&255,r>>>8&255,r>>>0&255,i>>>24&255,i>>>16&255,i>>>8&255,i>>>0&255,o>>>24&255,o>>>16&255,o>>>8&255,o>>>0&255,s>>>24&255,s>>>16&255,s>>>8&255,s>>>0&255,d>>>24&255,d>>>16&255,d>>>8&255,d>>>0&255,c>>>24&255,c>>>16&255,c>>>8&255,c>>>0&255]}function a(e,t,a){let r;e=e.length<=64?e:n(e);let i=64+t.length+4,o=Array(i),s=Array(64),d=[];for(r=0;r<64;r++)o[r]=54;for(r=0;r<e.length;r++)o[r]^=e[r];for(r=0;r<t.length;r++)o[64+r]=t[r];for(r=i-4;r<i;r++)o[r]=0;for(r=0;r<64;r++)s[r]=92;for(r=0;r<e.length;r++)s[r]^=e[r];function c(){for(let e=i-1;e>=i-4;e--){if(o[e]++,o[e]<=255)return;o[e]=0}}for(;a>=32;)c(),d=d.concat(n(s.concat(n(o)))),a-=32;return a>0&&(c(),d=d.concat(n(s.concat(n(o))).slice(0,a))),d}function r(e,t,n,a,r){let d;for(s(e,(2*n-1)*16,r,0,16),d=0;d<2*n;d++)o(e,16*d,r,16),function(e,t){s(e,0,t,0,16);for(let n=8;n>0;n-=2)t[4]^=i(t[0]+t[12],7),t[8]^=i(t[4]+t[0],9),t[12]^=i(t[8]+t[4],13),t[0]^=i(t[12]+t[8],18),t[9]^=i(t[5]+t[1],7),t[13]^=i(t[9]+t[5],9),t[1]^=i(t[13]+t[9],13),t[5]^=i(t[1]+t[13],18),t[14]^=i(t[10]+t[6],7),t[2]^=i(t[14]+t[10],9),t[6]^=i(t[2]+t[14],13),t[10]^=i(t[6]+t[2],18),t[3]^=i(t[15]+t[11],7),t[7]^=i(t[3]+t[15],9),t[11]^=i(t[7]+t[3],13),t[15]^=i(t[11]+t[7],18),t[1]^=i(t[0]+t[3],7),t[2]^=i(t[1]+t[0],9),t[3]^=i(t[2]+t[1],13),t[0]^=i(t[3]+t[2],18),t[6]^=i(t[5]+t[4],7),t[7]^=i(t[6]+t[5],9),t[4]^=i(t[7]+t[6],13),t[5]^=i(t[4]+t[7],18),t[11]^=i(t[10]+t[9],7),t[8]^=i(t[11]+t[10],9),t[9]^=i(t[8]+t[11],13),t[10]^=i(t[9]+t[8],18),t[12]^=i(t[15]+t[14],7),t[13]^=i(t[12]+t[15],9),t[14]^=i(t[13]+t[12],13),t[15]^=i(t[14]+t[13],18);for(let a=0;a<16;++a)e[a]+=t[a]}(r,a),s(r,0,e,t+16*d,16);for(d=0;d<n;d++)s(e,t+32*d,e,16*d,16);for(d=0;d<n;d++)s(e,t+(2*d+1)*16,e,(d+n)*16,16)}function i(e,t){return e<<t|e>>>32-t}function o(e,t,n,a){for(let r=0;r<a;r++)n[r]^=e[t+r]}function s(e,t,n,a,r){for(;r--;)n[a++]=e[t++]}function d(e){if(!e||"number"!=typeof e.length)return!1;for(let t=0;t<e.length;t++){let n=e[t];if("number"!=typeof n||n%1||n<0||n>=256)return!1}return!0}function c(e,t){if("number"!=typeof e||e%1)throw Error("invalid "+t);return e}function u(e,t,n,i,u,b,f){let l;if(n=c(n,"N"),i=c(i,"r"),u=c(u,"p"),b=c(b,"dkLen"),0===n||(n&n-1)!=0)throw Error("N must be power of 2");if(n>2147483647/128/i)throw Error("N too large");if(i>2147483647/128/u)throw Error("r too large");if(!d(e))throw Error("password must be an array or buffer");if(e=Array.prototype.slice.call(e),!d(t))throw Error("salt must be an array or buffer");let p=a(e,t=Array.prototype.slice.call(t),128*u*i),y=new Uint32Array(32*u*i);for(let m=0;m<y.length;m++){let h=4*m;y[m]=(255&p[h+3])<<24|(255&p[h+2])<<16|(255&p[h+1])<<8|(255&p[h+0])<<0}let g=new Uint32Array(64*i),v=new Uint32Array(32*i*n),k=32*i,T=new Uint32Array(16),w=new Uint32Array(16),x=u*n*2,_=0,S=null,A=!1,C=0,E=0,I,N=f?parseInt(1e3/i):4294967295,O="undefined"!=typeof setImmediate?setImmediate:setTimeout,F=function(){let t;if(A)return f(Error("cancelled"),_/x);switch(C){case 0:s(y,l=32*E*i,g,0,k),C=1,I=0;case 1:(t=n-I)>N&&(t=N);for(let d=0;d<t;d++)s(g,0,v,(I+d)*k,k),r(g,k,i,T,w);if(I+=t,_+=t,f){let c=parseInt(1e3*_/x);if(c!==S){if(A=f(null,_/x))break;S=c}}if(I<n)break;I=0,C=2;case 2:(t=n-I)>N&&(t=N);for(let m=0;m<t;m++){let h=(2*i-1)*16,M=g[h]&n-1;o(v,M*k,g,k),r(g,k,i,T,w)}if(I+=t,_+=t,f){let R=parseInt(1e3*_/x);if(R!==S){if(A=f(null,_/x))break;S=R}}if(I<n)break;if(s(g,0,y,l,k),++E<u){C=0;break}p=[];for(let P=0;P<y.length;P++)p.push(y[P]>>0&255),p.push(y[P]>>8&255),p.push(y[P]>>16&255),p.push(y[P]>>24&255);let D=a(e,p,b);return f&&f(null,1,D),D}f&&O(F)};if(!f)for(;;){let M=F();if(void 0!=M)return M}F()}e.exports={scrypt:function(e,t,n,a,r,i,o){return new Promise(function(s,d){let c=0;o&&o(0),u(e,t,n,a,r,i,function(e,t,n){if(e)d(e);else if(n)o&&1!==c&&o(1),s(new Uint8Array(n));else if(o&&t!==c)return c=t,o(t)})})},syncScrypt:function(e,t,n,a,r,i){return new Uint8Array(u(e,t,n,a,r,i))}}}(0)},96774:function(e){e.exports=function(e,t,n,a){var r=n?n.call(a,e,t):void 0;if(void 0!==r)return!!r;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var i=Object.keys(e),o=Object.keys(t);if(i.length!==o.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),d=0;d<i.length;d++){var c=i[d];if(!s(c))return!1;var u=e[c],b=t[c];if(!1===(r=n?n.call(a,u,b,c):void 0)||void 0===r&&u!==b)return!1}return!0}},53250:function(e,t,n){"use strict";/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a=n(67294),r="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},i=a.useState,o=a.useEffect,s=a.useLayoutEffect,d=a.useDebugValue;function c(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!r(e,n)}catch(a){return!0}}var u="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),a=i({inst:{value:n,getSnapshot:t}}),r=a[0].inst,u=a[1];return s(function(){r.value=n,r.getSnapshot=t,c(r)&&u({inst:r})},[e,n,t]),o(function(){return c(r)&&u({inst:r}),e(function(){c(r)&&u({inst:r})})},[e]),d(n),n};t.useSyncExternalStore=void 0!==a.useSyncExternalStore?a.useSyncExternalStore:u},50139:function(e,t,n){"use strict";/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a=n(67294),r=n(61688),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},o=r.useSyncExternalStore,s=a.useRef,d=a.useEffect,c=a.useMemo,u=a.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,a,r){var b=s(null);if(null===b.current){var f={hasValue:!1,value:null};b.current=f}else f=b.current;b=c(function(){function e(e){if(!d){if(d=!0,o=e,e=a(e),void 0!==r&&f.hasValue){var t=f.value;if(r(t,e))return s=t}return s=e}if(t=s,i(o,e))return t;var n=a(e);return void 0!==r&&r(t,n)?t:(o=e,s=n)}var o,s,d=!1,c=void 0===n?null:n;return[function(){return e(t())},null===c?void 0:function(){return e(c())}]},[t,n,a,r]);var l=o(e,b[0],b[1]);return d(function(){f.hasValue=!0,f.value=l},[l]),u(l),l}},61688:function(e,t,n){"use strict";e.exports=n(53250)},52798:function(e,t,n){"use strict";e.exports=n(50139)},71739:function(e){e.exports={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}},46601:function(){},30907:function(e,t,n){"use strict";function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=Array(t);n<t;n++)a[n]=e[n];return a}n.d(t,{Z:function(){return a}})},83878:function(e,t,n){"use strict";function a(e){if(Array.isArray(e))return e}n.d(t,{Z:function(){return a}})},15671:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}n.d(t,{Z:function(){return a}})},43144:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var a=n(83997);function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(0,a.Z)(r.key),r)}}function i(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}},4942:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var a=n(83997);function r(e,t,n){return(t=(0,a.Z)(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},87462:function(e,t,n){"use strict";function a(){return(a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}n.d(t,{Z:function(){return a}})},25267:function(e,t,n){"use strict";function a(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,{Z:function(){return a}})},63366:function(e,t,n){"use strict";function a(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}n.d(t,{Z:function(){return a}})},97685:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var a=n(83878),r=n(40181),i=n(25267);function o(e,t){return(0,a.Z)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,i,o,s=[],d=!0,c=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;d=!1}else for(;!(d=(a=i.call(n)).done)&&(s.push(a.value),s.length!==t);d=!0);}catch(u){c=!0,r=u}finally{try{if(!d&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(c)throw r}}return s}}(e,t)||(0,r.Z)(e,t)||(0,i.Z)()}},83997:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var a=n(71002);function r(e){var t=function(e,t){if("object"!==(0,a.Z)(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==(0,a.Z)(r))return r;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===(0,a.Z)(t)?t:String(t)}},71002:function(e,t,n){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n.d(t,{Z:function(){return a}})},40181:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var a=n(30907);function r(e,t){if(e){if("string"==typeof e)return(0,a.Z)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return(0,a.Z)(e,t)}}},24484:function(e,t,n){"use strict";n.d(t,{RJ:function(){return i},v4:function(){return o},ws:function(){return r},yX:function(){return a},yu:function(){return s}});var a={id:42161,name:"Arbitrum One",network:"arbitrum",nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:{alchemy:{http:["https://arb-mainnet.g.alchemy.com/v2"],webSocket:["wss://arb-mainnet.g.alchemy.com/v2"]},infura:{http:["https://arbitrum-mainnet.infura.io/v3"],webSocket:["wss://arbitrum-mainnet.infura.io/ws/v3"]},default:{http:["https://arb1.arbitrum.io/rpc"]}},blockExplorers:{etherscan:{name:"Arbiscan",url:"https://arbiscan.io"},default:{name:"Arbiscan",url:"https://arbiscan.io"}},contracts:{multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:7654707}}},r={id:5,network:"goerli",name:"Goerli",nativeCurrency:{name:"Goerli Ether",symbol:"ETH",decimals:18},rpcUrls:{alchemy:{http:["https://eth-goerli.g.alchemy.com/v2"],webSocket:["wss://eth-goerli.g.alchemy.com/v2"]},infura:{http:["https://goerli.infura.io/v3"],webSocket:["wss://goerli.infura.io/ws/v3"]},default:{http:["https://rpc.ankr.com/eth_goerli"]}},blockExplorers:{etherscan:{name:"Etherscan",url:"https://goerli.etherscan.io"},default:{name:"Etherscan",url:"https://goerli.etherscan.io"}},contracts:{ensRegistry:{address:"0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"},multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:6507670}},testnet:!0},i={id:1,network:"homestead",name:"Ethereum",nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:{alchemy:{http:["https://eth-mainnet.g.alchemy.com/v2"],webSocket:["wss://eth-mainnet.g.alchemy.com/v2"]},infura:{http:["https://mainnet.infura.io/v3"],webSocket:["wss://mainnet.infura.io/ws/v3"]},default:{http:["https://cloudflare-eth.com"]}},blockExplorers:{etherscan:{name:"Etherscan",url:"https://etherscan.io"},default:{name:"Etherscan",url:"https://etherscan.io"}},contracts:{ensRegistry:{address:"0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"},multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:14353601}}},o={id:10,name:"Optimism",network:"optimism",nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:{alchemy:{http:["https://opt-mainnet.g.alchemy.com/v2"],webSocket:["wss://opt-mainnet.g.alchemy.com/v2"]},infura:{http:["https://optimism-mainnet.infura.io/v3"],webSocket:["wss://optimism-mainnet.infura.io/ws/v3"]},default:{http:["https://mainnet.optimism.io"]}},blockExplorers:{etherscan:{name:"Etherscan",url:"https://optimistic.etherscan.io"},default:{name:"Etherscan",url:"https://optimistic.etherscan.io"}},contracts:{multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:4286263}}},s={id:137,name:"Polygon",network:"matic",nativeCurrency:{name:"MATIC",symbol:"MATIC",decimals:18},rpcUrls:{alchemy:{http:["https://polygon-mainnet.g.alchemy.com/v2"],webSocket:["wss://polygon-mainnet.g.alchemy.com/v2"]},infura:{http:["https://polygon-mainnet.infura.io/v3"],webSocket:["wss://polygon-mainnet.infura.io/ws/v3"]},default:{http:["https://polygon-rpc.com"]}},blockExplorers:{etherscan:{name:"PolygonScan",url:"https://polygonscan.com"},default:{name:"PolygonScan",url:"https://polygonscan.com"}},contracts:{multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:25770160}}}},80647:function(e,t,n){"use strict";n.d(t,{Ko:function(){return u},U9:function(){return f},ac:function(){return c},ov:function(){return s},qx:function(){return b},wR:function(){return l}});var a=n(24484),r=n(5710),i=Object.defineProperty,o=(e,t,n)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,s=(e,t,n)=>(o(e,"symbol"!=typeof t?t+"":t,n),n),d=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)},c=(e,t,n)=>(d(e,t,"read from private field"),n?n.call(e):t.get(e)),u=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},b=(e,t,n,a)=>(d(e,t,"write to private field"),a?a.call(e,n):t.set(e,n),n),f=(e,t,n)=>(d(e,t,"access private method"),n),l=class extends r{constructor({chains:e=[a.RJ,a.ws],options:t}){super(),s(this,"chains"),s(this,"options"),this.chains=e,this.options=t}getBlockExplorerUrls(e){let{default:t,...n}=e.blockExplorers??{};if(t)return[t.url,...Object.values(n).map(e=>e.url)]}isChainUnsupported(e){return!this.chains.some(t=>t.id===e)}}},23326:function(e,t,n){"use strict";n.d(t,{_:function(){return c}});var a,r,i=n(80647),o=n(78),s=n(241),d=n(56371),c=class extends i.wR{constructor({chains:e,options:t}={}){let n={shimDisconnect:!0,shimChainChangedDisconnect:!0,getProvider:()=>"undefined"!=typeof window?window.ethereum:void 0,...t};super({chains:e,options:n}),(0,i.ov)(this,"id"),(0,i.ov)(this,"name"),(0,i.ov)(this,"ready"),(0,i.Ko)(this,a,void 0),(0,i.Ko)(this,r,void 0),(0,i.ov)(this,"shimDisconnectKey","injected.shimDisconnect"),(0,i.ov)(this,"onAccountsChanged",e=>{0===e.length?this.emit("disconnect"):this.emit("change",{account:(0,d.getAddress)(e[0])})}),(0,i.ov)(this,"onChainChanged",e=>{let t=(0,o.Jk)(e),n=this.isChainUnsupported(t);this.emit("change",{chain:{id:t,unsupported:n}})}),(0,i.ov)(this,"onDisconnect",()=>{if(this.options.shimChainChangedDisconnect&&(0,i.ac)(this,r)){(0,i.qx)(this,r,!1);return}this.emit("disconnect"),this.options.shimDisconnect&&o.s3().storage?.removeItem(this.shimDisconnectKey)});let s=n.getProvider();if("string"==typeof n.name)this.name=n.name;else if(s){let c=function(e){if(!e)return"Injected";let t=e=>e.isAvalanche?"Core Wallet":e.isBitKeep?"BitKeep":e.isBraveWallet?"Brave Wallet":e.isCoinbaseWallet?"Coinbase Wallet":e.isExodus?"Exodus":e.isFrame?"Frame":e.isKuCoinWallet?"KuCoin Wallet":e.isMathWallet?"MathWallet":e.isOneInchIOSWallet||e.isOneInchAndroidWallet?"1inch Wallet":e.isOpera?"Opera":e.isPortal?"Ripio Portal":e.isTally?"Tally":e.isTokenPocket?"TokenPocket":e.isTokenary?"Tokenary":e.isTrust||e.isTrustWallet?"Trust Wallet":e.isMetaMask?"MetaMask":void 0;if(e.providers?.length){let n=new Set,a=1;for(let r of e.providers){let i=t(r);i||(i=`Unknown Wallet #${a}`,a+=1),n.add(i)}let o=[...n];return o.length?o:o[0]??"Injected"}return t(e)??"Injected"}(s);n.name?this.name=n.name(c):"string"==typeof c?this.name=c:this.name=c[0]}else this.name="Injected";this.id="injected",this.ready=!!s}async connect({chainId:e}={}){try{let t=await this.getProvider();if(!t)throw new o.Nu;t.on&&(t.on("accountsChanged",this.onAccountsChanged),t.on("chainChanged",this.onChainChanged),t.on("disconnect",this.onDisconnect)),this.emit("message",{type:"connecting"});let n=await t.request({method:"eth_requestAccounts"}),a=(0,d.getAddress)(n[0]),r=await this.getChainId(),i=this.isChainUnsupported(r);if(e&&r!==e){let s=await this.switchChain(e);r=s.id,i=this.isChainUnsupported(r)}return this.options.shimDisconnect&&o.s3().storage?.setItem(this.shimDisconnectKey,!0),{account:a,chain:{id:r,unsupported:i},provider:t}}catch(c){if(this.isUserRejectedRequestError(c))throw new o.ab(c);if(-32002===c.code)throw new o.TA(c);throw c}}async disconnect(){let e=await this.getProvider();e?.removeListener&&(e.removeListener("accountsChanged",this.onAccountsChanged),e.removeListener("chainChanged",this.onChainChanged),e.removeListener("disconnect",this.onDisconnect),this.options.shimDisconnect&&o.s3().storage?.removeItem(this.shimDisconnectKey))}async getAccount(){let e=await this.getProvider();if(!e)throw new o.Nu;let t=await e.request({method:"eth_accounts"});return(0,d.getAddress)(t[0])}async getChainId(){let e=await this.getProvider();if(!e)throw new o.Nu;return e.request({method:"eth_chainId"}).then(o.Jk)}async getProvider(){let e=this.options.getProvider();return e&&(0,i.qx)(this,a,e),(0,i.ac)(this,a)}async getSigner({chainId:e}={}){let[t,n]=await Promise.all([this.getProvider(),this.getAccount()]);return new s.Q(t,e).getSigner(n)}async isAuthorized(){try{if(this.options.shimDisconnect&&!o.s3().storage?.getItem(this.shimDisconnectKey))return!1;let e=await this.getProvider();if(!e)throw new o.Nu;let t=await this.getAccount();return!!t}catch{return!1}}async switchChain(e){this.options.shimChainChangedDisconnect&&(0,i.qx)(this,r,!0);let t=await this.getProvider();if(!t)throw new o.Nu;let n=(0,d.hexValue)(e);try{return await t.request({method:"wallet_switchEthereumChain",params:[{chainId:n}]}),this.chains.find(t=>t.id===e)??{id:e,name:`Chain ${n}`,network:`${n}`,nativeCurrency:{name:"Ether",decimals:18,symbol:"ETH"},rpcUrls:{default:{http:[""]}}}}catch(c){let a=this.chains.find(t=>t.id===e);if(!a)throw new o.X4({chainId:e,connectorId:this.id});if(4902===c.code||c?.data?.originalError?.code===4902)try{return await t.request({method:"wallet_addEthereumChain",params:[{chainId:n,chainName:a.name,nativeCurrency:a.nativeCurrency,rpcUrls:[a.rpcUrls.public?.http[0]??a.rpcUrls.default.http[0]??""],blockExplorerUrls:this.getBlockExplorerUrls(a)}]}),a}catch(s){if(this.isUserRejectedRequestError(s))throw new o.ab(c);throw new o.iA}if(this.isUserRejectedRequestError(c))throw new o.ab(c);throw new o.x3(c)}}async watchAsset({address:e,decimals:t=18,image:n,symbol:a}){let r=await this.getProvider();if(!r)throw new o.Nu;return r.request({method:"wallet_watchAsset",params:{type:"ERC20",options:{address:e,decimals:t,image:n,symbol:a}}})}isUserRejectedRequestError(e){return 4001===e.code}};a=new WeakMap,r=new WeakMap},90935:function(e,t,n){"use strict";n.d(t,{D:function(){return b}});var a,r,i,o,s=n(80647),d=n(78),c=n(241),u=n(56371),b=class extends s.wR{constructor({chains:e,options:t}){super({chains:e,options:{reloadOnDisconnect:!1,...t}}),(0,s.Ko)(this,i),(0,s.ov)(this,"id","coinbaseWallet"),(0,s.ov)(this,"name","Coinbase Wallet"),(0,s.ov)(this,"ready",!0),(0,s.Ko)(this,a,void 0),(0,s.Ko)(this,r,void 0),(0,s.ov)(this,"onAccountsChanged",e=>{0===e.length?this.emit("disconnect"):this.emit("change",{account:(0,u.getAddress)(e[0])})}),(0,s.ov)(this,"onChainChanged",e=>{let t=(0,d.Jk)(e),n=this.isChainUnsupported(t);this.emit("change",{chain:{id:t,unsupported:n}})}),(0,s.ov)(this,"onDisconnect",()=>{this.emit("disconnect")})}async connect({chainId:e}={}){try{let t=await this.getProvider();t.on("accountsChanged",this.onAccountsChanged),t.on("chainChanged",this.onChainChanged),t.on("disconnect",this.onDisconnect),this.emit("message",{type:"connecting"});let n=await t.enable(),a=(0,u.getAddress)(n[0]),r=await this.getChainId(),i=this.isChainUnsupported(r);if(e&&r!==e){let o=await this.switchChain(e);r=o.id,i=this.isChainUnsupported(r)}return{account:a,chain:{id:r,unsupported:i},provider:new c.Q(t)}}catch(s){if(/(user closed modal|accounts received is empty)/i.test(s.message))throw new d.ab(s);throw s}}async disconnect(){if(!(0,s.ac)(this,r))return;let e=await this.getProvider();e.removeListener("accountsChanged",this.onAccountsChanged),e.removeListener("chainChanged",this.onChainChanged),e.removeListener("disconnect",this.onDisconnect),e.disconnect(),e.close()}async getAccount(){let e=await this.getProvider(),t=await e.request({method:"eth_accounts"});return(0,u.getAddress)(t[0])}async getChainId(){let e=await this.getProvider(),t=(0,d.Jk)(e.chainId);return t}async getProvider(){if(!(0,s.ac)(this,r)){let e=(await Promise.all([n.e(764),n.e(690),n.e(811),n.e(990)]).then(n.t.bind(n,45811,19))).default;"function"!=typeof e&&"function"==typeof e.default&&(e=e.default),(0,s.qx)(this,a,new e(this.options));let t=s.ac(this,a).walletExtension?.getChainId(),i=this.chains.find(e=>this.options.chainId?e.id===this.options.chainId:e.id===t)||this.chains[0],o=this.options.chainId||i?.id,d=this.options.jsonRpcUrl||i?.rpcUrls.default.http[0];(0,s.qx)(this,r,(0,s.ac)(this,a).makeWeb3Provider(d,o))}return(0,s.ac)(this,r)}async getSigner({chainId:e}={}){let[t,n]=await Promise.all([this.getProvider(),this.getAccount()]);return new c.Q(t,e).getSigner(n)}async isAuthorized(){try{let e=await this.getAccount();return!!e}catch{return!1}}async switchChain(e){let t=await this.getProvider(),n=(0,u.hexValue)(e);try{return await t.request({method:"wallet_switchEthereumChain",params:[{chainId:n}]}),this.chains.find(t=>t.id===e)??{id:e,name:`Chain ${n}`,network:`${n}`,nativeCurrency:{name:"Ether",decimals:18,symbol:"ETH"},rpcUrls:{default:{http:[""]}}}}catch(c){let a=this.chains.find(t=>t.id===e);if(!a)throw new d.X4({chainId:e,connectorId:this.id});if(4902===c.code)try{return await t.request({method:"wallet_addEthereumChain",params:[{chainId:n,chainName:a.name,nativeCurrency:a.nativeCurrency,rpcUrls:[a.rpcUrls.public?.http[0]??a.rpcUrls.default.http[0]],blockExplorerUrls:this.getBlockExplorerUrls(a)}]}),a}catch(r){if((0,s.U9)(this,i,o).call(this,r))throw new d.ab(r);throw new d.iA}if((0,s.U9)(this,i,o).call(this,c))throw new d.ab(c);throw new d.x3(c)}}async watchAsset({address:e,decimals:t=18,image:n,symbol:a}){let r=await this.getProvider();return r.request({method:"wallet_watchAsset",params:{type:"ERC20",options:{address:e,decimals:t,image:n,symbol:a}}})}};a=new WeakMap,r=new WeakMap,i=new WeakSet,o=function(e){return/(user rejected)/i.test(e.message)}},25078:function(e,t,n){"use strict";n.d(t,{i:function(){return d}});var a,r=n(23326),i=n(80647),o=n(78),s=n(56371),d=class extends r._{constructor({chains:e,options:t}={}){let n={name:"MetaMask",shimDisconnect:!0,shimChainChangedDisconnect:!0,getProvider(){function e(e){let t=!!e?.isMetaMask;if(t&&(!e.isBraveWallet||e._events||e._state)&&!e.isAvalanche&&!e.isKuCoinWallet&&!e.isPortal&&!e.isTokenPocket&&!e.isTokenary)return e}if("undefined"!=typeof window)return window.ethereum?.providers?window.ethereum.providers.find(e):e(window.ethereum)},...t};super({chains:e,options:n}),(0,i.ov)(this,"id","metaMask"),(0,i.Ko)(this,a,void 0),(0,i.qx)(this,a,n.UNSTABLE_shimOnConnectSelectAccount)}async connect({chainId:e}={}){try{let t=await this.getProvider();if(!t)throw new o.Nu;t.on&&(t.on("accountsChanged",this.onAccountsChanged),t.on("chainChanged",this.onChainChanged),t.on("disconnect",this.onDisconnect)),this.emit("message",{type:"connecting"});let n=null;if((0,i.ac)(this,a)&&this.options?.shimDisconnect&&!o.s3().storage?.getItem(this.shimDisconnectKey)){n=await this.getAccount().catch(()=>null);let r=!!n;if(r)try{await t.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]}),n=await this.getAccount()}catch(d){if(this.isUserRejectedRequestError(d))throw new o.ab(d)}}if(!n){let c=await t.request({method:"eth_requestAccounts"});n=(0,s.getAddress)(c[0])}let u=await this.getChainId(),b=this.isChainUnsupported(u);if(e&&u!==e){let f=await this.switchChain(e);u=f.id,b=this.isChainUnsupported(u)}return this.options?.shimDisconnect&&o.s3().storage?.setItem(this.shimDisconnectKey,!0),{account:n,chain:{id:u,unsupported:b},provider:t}}catch(l){if(this.isUserRejectedRequestError(l))throw new o.ab(l);if(-32002===l.code)throw new o.TA(l);throw l}}};a=new WeakMap},85900:function(e,t,n){"use strict";n.d(t,{z:function(){return l}});var a,r,i,o,s,d=n(80647),c=n(78),u=n(241),b=n(56371),f={namespace:"eip155",methods:["eth_sendTransaction","eth_sign","eth_signTransaction","eth_signTypedData","personal_sign"],events:["accountsChanged","chainChanged"]},l=class extends d.wR{constructor(e){super(e),(0,d.Ko)(this,r),(0,d.Ko)(this,o),(0,d.ov)(this,"id","walletConnect"),(0,d.ov)(this,"name","WalletConnect"),(0,d.ov)(this,"ready",!0),(0,d.Ko)(this,a,void 0),(0,d.ov)(this,"onAccountsChanged",e=>{0===e.length?this.emit("disconnect"):this.emit("change",{account:(0,b.getAddress)(e[0])})}),(0,d.ov)(this,"onChainChanged",e=>{let t=(0,c.Jk)(e),n=this.isChainUnsupported(t);this.emit("change",{chain:{id:t,unsupported:n}})}),(0,d.ov)(this,"onDisconnect",()=>{this.emit("disconnect")}),(0,d.ov)(this,"onDisplayUri",e=>{this.emit("message",{type:"display_uri",data:e})})}get version(){return"version"in this.options?this.options.version:"1"}async connect({chainId:e}={}){try{let t=e;if(!t){let a=(0,c.s3)().lastUsedChainId;a&&!this.isChainUnsupported(a)&&(t=a)}let l=await this.getProvider({chainId:t,create:!0});if(l.on("accountsChanged",this.onAccountsChanged),l.on("chainChanged",this.onChainChanged),l.on("disconnect",this.onDisconnect),"2"===this.version){l.on("session_delete",this.onDisconnect),l.on("display_uri",this.onDisplayUri);let p=await (0,d.U9)(this,r,i).call(this);l.session&&!p&&await l.disconnect(),(!l.session||l.session&&!p)&&(await Promise.race([l.connect({namespaces:{[f.namespace]:{methods:f.methods,events:f.events,chains:this.chains.map(e=>`${f.namespace}:${e.id}`),rpcMap:this.chains.reduce((e,t)=>({...e,[t.id]:t.rpcUrls.default.http[0]}),{})}}}),...this.options.qrcode?[new Promise((e,t)=>l.on("display_uri",async e=>(await Promise.all([n.e(764),n.e(337)]).then(n.t.bind(n,4337,19))).default.open(e,()=>t(Error("user rejected")))))]:[]]),this.options.qrcode&&(await Promise.all([n.e(764),n.e(337)]).then(n.t.bind(n,4337,19))).default.close())}setTimeout(()=>this.emit("message",{type:"connecting"}),0);let y=await Promise.race([l.enable(),..."1"===this.version&&this.options.qrcode?[new Promise((e,t)=>l.connector.on("disconnect",()=>t(Error("user rejected"))))]:[]]),m=(0,b.getAddress)(y[0]),h=await this.getChainId(),g=this.isChainUnsupported(h);if("1"===this.version){let v=l.connector?.peerMeta?.name??"";/(imtoken|metamask|omni|rainbow|trust wallet)/i.test(v)&&(this.switchChain=(0,d.U9)(this,o,s))}else this.switchChain=(0,d.U9)(this,o,s);return{account:m,chain:{id:h,unsupported:g},provider:new u.Q(l)}}catch(k){if("2"===this.version&&this.options.qrcode&&(await Promise.all([n.e(764),n.e(337)]).then(n.t.bind(n,4337,19))).default.close(),/user closed modal|user rejected/i.test(k?.message))throw new c.ab(k);throw k}}async disconnect(){let e=await this.getProvider();try{await e.disconnect()}catch(t){if(!/No matching key/i.test(t.message))throw t}e.removeListener("accountsChanged",this.onAccountsChanged),e.removeListener("chainChanged",this.onChainChanged),e.removeListener("disconnect",this.onDisconnect),"1"===this.version&&"undefined"!=typeof localStorage?localStorage.removeItem("walletconnect"):(e.removeListener("session_delete",this.onDisconnect),e.removeListener("display_uri",this.onDisplayUri))}async getAccount(){let e;let t=await this.getProvider();return e="1"===this.version?t.accounts:await t.request({method:"eth_accounts"}),(0,b.getAddress)(e[0])}async getChainId(){let e=await this.getProvider();return"1"===this.version?(0,c.Jk)(e.chainId):c.s3().data?.chain?.id??(0,c.Jk)(await e.request({method:"eth_chainId"}))}async getProvider({chainId:e,create:t}={}){if(!(0,d.ac)(this,a)||e||t){if("2"===this.options.version){let r=(await Promise.all([n.e(690),n.e(277),n.e(759),n.e(883)]).then(n.bind(n,52759))).default;(0,d.qx)(this,a,await r.init(this.options)),e&&(0,d.ac)(this,a).setDefaultChain(`${f.namespace}:${e}`)}else{let i=this.options?.infuraId?{}:this.chains.reduce((e,t)=>({...e,[t.id]:t.rpcUrls.default.http[0]}),{}),o=(await Promise.all([n.e(764),n.e(690),n.e(337),n.e(277),n.e(419),n.e(563)]).then(n.bind(n,73419))).default;(0,d.qx)(this,a,new o({...this.options,chainId:e,rpc:{...i,...this.options?.rpc}}))}}return(0,d.ac)(this,a)}async getSigner({chainId:e}={}){let[t,n]=await Promise.all([this.getProvider({chainId:e}),this.getAccount()]),a=t;if("2"===this.version){let r=await this.getChainId();a={...t,request:async n=>await t.request(n,`${f.namespace}:${e??r}`)}}return new u.Q(a,e).getSigner(n)}async isAuthorized(){try{let[e,t]=await Promise.all([this.getAccount(),(0,d.U9)(this,r,i).call(this)]);return!!e&&t}catch{return!1}}};a=new WeakMap,r=new WeakSet,i=async function(){let e=await this.getProvider();if("1"===this.version)return!0;let t=e.namespaces?.[f.namespace]?.chains||[],n=t.map(e=>parseInt(e.split(":")[1]||""));return!this.chains.some(({id:e})=>!n.includes(e))},o=new WeakSet,s=async function(e){let t=await this.getProvider(),n=(0,b.hexValue)(e);try{return await Promise.race([t.request({method:"wallet_switchEthereumChain",params:[{chainId:n}]}),new Promise(t=>this.on("change",({chain:n})=>{n?.id===e&&t(e)}))]),"2"===this.version&&(t.setDefaultChain(`${f.namespace}:${e}`),this.onChainChanged(e)),this.chains.find(t=>t.id===e)??{id:e,name:`Chain ${n}`,network:`${n}`,nativeCurrency:{decimals:18,name:"Ether",symbol:"ETH"},rpcUrls:{default:{http:[""]}}}}catch(r){let a="string"==typeof r?r:r?.message;if(/user rejected request/i.test(a))throw new c.ab(r);throw new c.x3(r)}}},78:function(e,t,n){"use strict";n.d(t,{iA:function(){return ev},X4:function(){return ew},Nu:function(){return e_},TA:function(){return eN},x3:function(){return eO},ab:function(){return eM},QB:function(){return A},$j:function(){return z},eI:function(){return V},o6:function(){return L},Ds:function(){return E},vZ:function(){return function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){let a,r;if(t.constructor!==n.constructor)return!1;if(Array.isArray(t)&&Array.isArray(n)){if((a=t.length)!=n.length)return!1;for(r=a;0!=r--;)if(!e(t[r],n[r]))return!1;return!0}if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();let i=Object.keys(t);if((a=i.length)!==Object.keys(n).length)return!1;for(r=a;0!=r--;)if(!Object.prototype.hasOwnProperty.call(n,i[r]))return!1;for(r=a;0!=r--;){let o=i[r];if(o&&!e(t[o],n[o]))return!1}return!0}return t!=t&&n!=n}},zP:function(){return W},em:function(){return q},EG:function(){return ec},RQ:function(){return ea},bh:function(){return er},w6:function(){return ei},Lk:function(){return eo},DG:function(){return eu},D0:function(){return eb},s3:function(){return H},uN:function(){return Z},Hy:function(){return ef},VH:function(){return Q},lG:function(){return Y},wp:function(){return j},Jk:function(){return M},$q:function(){return $},a4:function(){return et},l:function(){return el},If:function(){return ep},uH:function(){return ey},QC:function(){return em},b0:function(){return J},Fx:function(){return X},n9:function(){return ed}});var a,r,i,o,s,d=n(23326),c=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)},u=(e,t,n)=>(c(e,t,"read from private field"),n?n.call(e):t.get(e)),b=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},f=(e,t,n,a)=>(c(e,t,"write to private field"),a?a.call(e,n):t.set(e,n),n),l=(e,t,n)=>(c(e,t,"access private method"),n),p=n(51619);let y=e=>(t,n,a)=>{let r=a.subscribe;a.subscribe=(e,t,n)=>{let i=e;if(t){let o=(null==n?void 0:n.equalityFn)||Object.is,s=e(a.getState());i=n=>{let a=e(n);if(!o(s,a)){let r=s;t(s=a,r)}},(null==n?void 0:n.fireImmediately)&&t(s,s)}return r(i)};let i=e(t,n,a);return i},m=e=>t=>{try{let n=e(t);if(n instanceof Promise)return n;return{then:e=>m(e)(n),catch(e){return this}}}catch(a){return{then(e){return this},catch:e=>m(e)(a)}}},h=(e,t)=>(n,a,r)=>{let i,o,s={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},d=!1,c=new Set,u=new Set;try{i=s.getStorage()}catch(b){}if(!i)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`),n(...e)},a,r);let f=m(s.serialize),l=()=>{let e;let t=s.partialize({...a()}),n=f({state:t,version:s.version}).then(e=>i.setItem(s.name,e)).catch(t=>{e=t});if(e)throw e;return n},p=r.setState;r.setState=(e,t)=>{p(e,t),l()};let y=e((...e)=>{n(...e),l()},a,r),h=()=>{var e;if(!i)return;d=!1,c.forEach(e=>e(a()));let t=(null==(e=s.onRehydrateStorage)?void 0:e.call(s,a()))||void 0;return m(i.getItem.bind(i))(s.name).then(e=>{if(e)return s.deserialize(e)}).then(e=>{if(e){if("number"!=typeof e.version||e.version===s.version)return e.state;if(s.migrate)return s.migrate(e.state,e.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}}).then(e=>{var t;return n(o=s.merge(e,null!=(t=a())?t:y),!0),l()}).then(()=>{null==t||t(o,void 0),d=!0,u.forEach(e=>e(o))}).catch(e=>{null==t||t(void 0,e)})};return r.persist={setOptions:e=>{s={...s,...e},e.getStorage&&(i=e.getStorage())},clearStorage:()=>{null==i||i.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>h(),hasHydrated:()=>d,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(u.add(e),()=>{u.delete(e)})},h(),o||y},g=(e,t)=>(n,a,r)=>{let i,o={storage:function(e){let t;try{t=e()}catch(n){return}return{getItem:e=>{var n;let a=e=>null===e?null:JSON.parse(e),r=null!=(n=t.getItem(e))?n:null;return r instanceof Promise?r.then(a):a(r)},setItem:(e,n)=>t.setItem(e,JSON.stringify(n)),removeItem:e=>t.removeItem(e)}}(()=>localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},s=!1,d=new Set,c=new Set,u=o.storage;if(!u)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`),n(...e)},a,r);let b=()=>{let e=o.partialize({...a()});return u.setItem(o.name,{state:e,version:o.version})},f=r.setState;r.setState=(e,t)=>{f(e,t),b()};let l=e((...e)=>{n(...e),b()},a,r),p=()=>{var e;if(!u)return;s=!1,d.forEach(e=>e(a()));let t=(null==(e=o.onRehydrateStorage)?void 0:e.call(o,a()))||void 0;return Promise.resolve(u.getItem.bind(u)(o.name)).then(e=>{if(e){if("number"!=typeof e.version||e.version===o.version)return e.state;if(o.migrate)return o.migrate(e.state,e.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}}).then(e=>{var t;return n(i=o.merge(e,null!=(t=a())?t:l),!0),b()}).then(()=>{null==t||t(i,void 0),s=!0,c.forEach(e=>e(i))}).catch(e=>{null==t||t(void 0,e)})};return r.persist={setOptions:e=>{o={...o,...e},e.storage&&(u=e.storage)},clearStorage:()=>{null==u||u.removeItem(o.name)},getOptions:()=>o,rehydrate:()=>p(),hasHydrated:()=>s,onHydrate:e=>(d.add(e),()=>{d.delete(e)}),onFinishHydration:e=>(c.add(e),()=>{c.delete(e)})},p(),i||l},v=(e,t)=>"getStorage"in t||"serialize"in t||"deserialize"in t?(console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Please use `storage` option instead."),h(e,t)):g(e,t),k=e=>{let t;let n=new Set,a=(e,a)=>{let r="function"==typeof e?e(t):e;if(!Object.is(r,t)){let i=t;t=(null!=a?a:"object"!=typeof r)?r:Object.assign({},t,r),n.forEach(e=>e(t,i))}},r=()=>t,i=e=>(n.add(e),()=>n.delete(e)),o=()=>n.clear(),s={setState:a,getState:r,subscribe:i,destroy:o};return t=e(a,r,s),s},T=e=>e?k(e):k;var w=n(2593),x=n(56371),_=n(64146);function S(e,t){if(Object.is(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(let[n,a]of e)if(!Object.is(a,t.get(n)))return!1;return!0}if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(let r of e)if(!t.has(r))return!1;return!0}let i=Object.keys(e);if(i.length!==Object.keys(t).length)return!1;for(let o=0;o<i.length;o++)if(!Object.prototype.hasOwnProperty.call(t,i[o])||!Object.is(e[i[o]],t[i[o]]))return!1;return!0}function A(e,t,{minQuorum:n=1,pollingInterval:a=4e3,targetQuorum:r=1,stallTimeout:i}={}){if(!e.length)throw Error("must have at least one chain");if(r<n)throw Error("quorum cannot be lower than minQuorum");let o=[],s={},d={};for(let c of e){let u=!1;for(let b of t){let f=b(c);f&&(u=!0,o.some(({id:e})=>e===c.id)||(o=[...o,f.chain]),s[c.id]=[...s[c.id]||[],f.provider],f.webSocketProvider&&(d[c.id]=[...d[c.id]||[],f.webSocketProvider]))}if(!u)throw Error(`Could not find valid provider configuration for chain "${c.name}".

You may need to add \`jsonRpcProvider\` to \`configureChains\` with the chain's RPC URLs.
    ${Object.keys(e).map(t=>{let n=e[t];return n&&`${t}:${n};`})}
  `,sx=(e,t)=>{let n=t?" !important":"";return oP`
    ${Object.keys(e).map(t=>{let a=e[t];return a&&`${t}:${a}${n};`})}
    @supports (color: color(display-p3 1 1 1)) {
      ${Object.keys(e).map(t=>`${t}:${(e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return null==t?e:`color(display-p3 ${parseInt(t[1],16)/255} ${parseInt(t[2],16)/255} ${parseInt(t[3],16)/255})`})(e[t])}${n};`)}
    }
  `},s_={default:sw(sk.default),light:sx(sT.light),dark:sx(sT.dark),web95:sx(sT.web95),retro:sx(sT.retro),soft:sx(sT.soft),midnight:sx(sT.midnight),minimal:sx(sT.minimal),rounded:sx(sT.rounded),nouns:sx(sT.nouns)},sS=sw(sk.brand),sA=sw(sk.ens.light),sC=sw(sk.ens.dark),sE=sw(sk.graphics.light),sI=sw(sk.graphics.dark),sN=oP`
  ${sS}
  ${sA}
  ${sE}
`,sO=oP`
  ${sS}
  ${sC}
  ${sI}
`,sF="auto",sM=sg(iA.div)`
  ${s_.default}

  ${e=>{switch(e.$useTheme){case"web95":return sF="light",s_.web95;case"retro":return sF="light",s_.retro;case"soft":return sF="light",s_.soft;case"midnight":return sF="dark",s_.midnight;case"minimal":return sF="light",s_.minimal;case"rounded":return sF="light",s_.rounded;case"nouns":return sF="light",s_.nouns;default:return"light"===e.$useMode?(sF="light",s_.light):"dark"===e.$useMode?(sF="dark",s_.dark):oP`
            @media (prefers-color-scheme: light) {
              ${s_.light}
            }
            @media (prefers-color-scheme: dark) {
              ${s_.dark}
            }
          `}}}

  ${e=>{switch(sF){case"light":return sN;case"dark":return sO;default:return oP`
          ${sN}
          @media (prefers-color-scheme: dark) {
            ${sO}
          }
        `}}}


  ${e=>{var t;if(e.$customTheme&&e.$customTheme["--ck-accent-color"]&&["light","dark","auto","",void 0].includes(e.$useTheme)){let n=e.$customTheme["--ck-accent-color"],a=null!==(t=e.$customTheme["--ck-accent-text-color"])&&void 0!==t?t:"#ffffff";return{"--ck-accent-color":n,"--ck-accent-text-color":a,"--ck-secondary-button-background":n,"--ck-secondary-button-hover-background":n,"--ck-secondary-button-color":a,"--ck-button-primary-color":a,"--ck-focus-color":n}}if(e.$customTheme)return sx(e.$customTheme,!0)}}

  all: initial;
  text-align: left;
  text-direction: ltr;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-stroke: 0.001px transparent;
  text-size-adjust: none;
  font-size: 16px;

  button {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-text-stroke: 0.001px transparent;
  }

  &,
  * {
    font-family: var(--ck-font-family);
    box-sizing: border-box;
    outline: none;
    border: none;
  }
  /*
  @media (prefers-reduced-motion) {
    * {
      animation-duration: 60ms !important;
      transition-duration: 60ms !important;
    }
  }
  */
  img,
  svg {
    max-width: 100%;
  }
  strong {
    font-weight: 600;
  }
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--ck-focus-color);
  }
  z-index: -1;
  pointer-events: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: var(--width);
  top: 64px;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  background: var(--ck-body-color-danger);
  border-radius: 20px;
  padding: 24px 46px 82px 24px;
  transition: width var(--duration) var(--ease);
  a {
    font-weight: 700;
    text-decoration: underline;
  }
  code {
    font-size: 0.9em;
    display: inline-block;
    font-family: monospace;
    margin: 1px;
    padding: 0 4px;
    border-radius: 8px;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.1);
  }
`,dr=oG`
from { opacity: 0; }
  to { opacity: 1; }
`,di=oG`
from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`,ds=oG`
from { opacity: 0; transform: scale(1.1); }
  to { opacity: 1; transform: scale(1); }
`,dd=oG`
from { opacity: 1; }
  to { opacity: 0; }
`,dc=oG`
from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(1.1); }
`,du=oG`
from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.85); }
`,db=sg(iA.div)`
  max-width: 100%;
  width: 295px;
  padding-top: 48px;
`,df=sg(iA.div)`
  user-select: none;
  position: relative;
  display: block;
  text-align: center;
  color: var(--ck-body-color-muted);
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  span {
    z-index: 2;
    position: relative;
    display: inline-block;
    user-select: none;
    pointer-events: none;
    padding: 0 14px;
    background: var(--ck-body-background);
    transition: background-color 200ms ease;
  }
  &:before {
    z-index: 2;
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    transform: translateY(-1px);
    background: var(--ck-body-divider);
    box-shadow: var(--ck-body-divider-box-shadow);
  }
`,dl=sg(iA.div)`
  z-index: 3;
  pointer-events: none;
  user-select: none;
  position: absolute;
  top: 25px;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  transform: translateX(-50%);
  width: var(--width);
  text-align: center;
  font-size: 17px;
  line-height: 20px;
  font-weight: var(--ck-modal-heading-font-weight, 600);
  color: var(--ck-body-color);
  span {
    display: inline-block;
  }
`,dp=sg(iA.div)`
  position: relative;
  padding: 0;
`,dy=sg(iA.div)`
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 0 16px;

  @media only screen and (max-width: ${560}px) {
    display: block;
  }
`,dm=sg(iA.h1)`
  margin: 0;
  padding: 0;
  line-height: ${e=>e.$small?20:22}px;
  font-size: ${e=>e.$small?17:19}px;
  font-weight: var(--ck-modal-h1-font-weight, 600);
  color: ${e=>e.$error?"var(--ck-body-color-danger)":e.$valid?"var(--ck-body-color-valid)":"var(--ck-body-color)"};
  > svg {
    position: relative;
    top: -2px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
  }
  @media only screen and (max-width: ${560}px) {
    margin-bottom: 6px;
    font-size: 17px;
  }
`,dh=sg.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  color: var(--ck-body-color-muted);
  strong {
    font-weight: 500;
    color: var(--ck-body-color);
  }
`;sg.div`
  padding: 0 12px;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: var(--ck-body-color-muted);
  strong {
    font-weight: 500;
    color: var(--ck-body-color);
  }
`;let dg=sg(iA.div)`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--ck-overlay-background, rgba(71, 88, 107, 0.24));
  backdrop-filter: var(--ck-overlay-backdrop-filter, none);
  opacity: 0;
  animation: ${e=>e.$active?dr:dd} 150ms ease-out
    both;
`,dv=oG`
  from{ opacity: 0; transform: scale(0.97); }
  to{ opacity: 1; transform: scale(1); }
`,dk=oG`
  from{ opacity: 1; transform: scale(1); }
  to{ opacity: 0; transform: scale(0.97); }
`,dT=oG`
  from { transform: translate3d(0, 100%, 0); }
  to { transform: translate3d(0, 0%, 0); }
`,dw=oG`
  from { opacity: 1; }
  to { opacity: 0; }
`,dx=sg(iA.div)`
  z-index: 2;
  position: relative;
  color: var(--ck-body-color);

  animation: 150ms ease both;
  animation-name: ${dk};
  &.active {
    animation-name: ${dv};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: var(--width);
    height: var(--height);
    transform: translateX(-50%);
    backface-visibility: hidden;
    transition: all 200ms ease;
    border-radius: var(--ck-border-radius, 20px);
    background: var(--ck-body-background);
    box-shadow: var(--ck-modal-box-shadow);
  }

  @media only screen and (max-width: ${560}px) {
    animation-name: ${dw};
    animation-duration: 130ms;
    animation-timing-function: ease;

    &.active {
      animation-name: ${dT};
      animation-duration: 300ms;
      animation-delay: 32ms;
      animation-timing-function: cubic-bezier(0.15, 1.15, 0.6, 1);
    }

    &:before {
      width: 100%;
      transition: 0ms height cubic-bezier(0.15, 1.15, 0.6, 1);
      will-change: height;
    }
  }
`,d_=sg(iA.div)`
  z-index: 3;
  position: absolute;
  top: 0;
  left: 50%;
  height: 64px;
  transform: translateX(-50%);
  backface-visibility: hidden;
  width: var(--width);
  transition: 0.2s ease width;
  pointer-events: auto;
  //border-bottom: 1px solid var(--ck-body-divider);
`,dS=sg(iA.div)`
  position: relative;
  overflow: hidden;
  height: var(--height);
  transition: 0.2s ease height;
  @media only screen and (max-width: ${560}px) {
    transition: 0ms height cubic-bezier(0.15, 1.15, 0.6, 1);
    /* animation-delay: 34ms; */
  }
`,dA=sg(iA.div)`
  z-index: 2;
  position: relative;
  top: 0;
  left: 50%;
  margin-left: calc(var(--width) / -2);
  width: var(--width);
  /* left: 0; */
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center center;
  animation: 200ms ease both;

  &.active {
    animation-name: ${ds};
  }
  &.active-scale-up {
    animation-name: ${di};
  }
  &.exit-scale-down {
    z-index: 1;
    pointer-events: none;
    position: absolute;
    /* top: 0; */
    /* left: 0; */
    animation-name: ${du};
  }
  &.exit {
    z-index: 1;
    pointer-events: none;
    position: absolute;
    /* top: 0; */
    /* left: 0; */
    /* left: 50%; */
    /* transform: translateX(-50%); */
    animation-name: ${dc};
    animation-delay: 16.6667ms;
  }
  @media only screen and (max-width: ${560}px) {
    /* animation: 0ms ease both; */
    /* animation-delay: 35ms; */
    animation: 0ms cubic-bezier(0.15, 1.15, 0.6, 1) both;

    &.active {
      animation-name: ${dr};
    }
    &.active-scale-up {
      animation-name: ${dr};
    }
    &.exit-scale-down {
      z-index: 3;
      animation-name: ${dd};
    }
    &.exit {
      z-index: 3;
      animation-name: ${dd};
      animation-delay: 0ms;
    }
  }
`,dC=sg(iA.div)`
  margin: 0 auto;
  width: fit-content;
  padding: 29px 24px 24px;
  backface-visibility: hidden;
`,dE=sg.div`
  z-index: 2147483646; // z-index set one below max (2147483647) for if we wish to layer things ontop of the modal in a seperate Portal
  position: fixed;
  inset: 0;
`,dI=sg(iA.button)`
  z-index: 3;
  cursor: pointer;
  position: absolute;
  top: 22px;
  right: 17px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  color: var(--ck-body-action-color);
  background: var(--ck-body-background);
  transition: background-color 200ms ease, transform 100ms ease;
  /* will-change: transform; */
  svg {
    display: block;
  }

  &:hover {
    background: var(--ck-body-background-secondary);
  }
  &:active {
    transform: scale(0.9);
  }
`,dN=sg(iA.button)`
  z-index: 3;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  color: var(--ck-body-action-color);
  background: var(--ck-body-background);
  transition: background-color 200ms ease, transform 100ms ease;
  /* will-change: transform; */
  svg {
    display: block;
    position: relative;
  }

  &:enabled {
    cursor: pointer;
    &:hover {
      background: var(--ck-body-background-secondary);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`,dO=sg(iA.button)`
  z-index: 3;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  color: var(--ck-body-action-color);
  background: var(--ck-body-background);
  transition: background-color 200ms ease, transform 100ms ease;
  /* will-change: transform; */
  svg {
    display: block;
    position: relative;
    left: -1px;
  }

  &:enabled {
    cursor: pointer;
    &:hover {
      background: var(--ck-body-background-secondary);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`,dF=sg(iA.button)`
  z-index: 3;
  position: absolute;
  inset: 0;
  transform: translateX(-1px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  color: var(--ck-body-action-color);
  background: var(--ck-body-background);
  transition: background-color 200ms ease, transform 100ms ease;
  /* will-change: transform; */
  svg {
    display: block;
    position: relative;
  }
  &:enabled {
    cursor: pointer;
    &:hover {
      background: var(--ck-body-background-secondary);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`,dM=sg(iA.div)`
  --ease: cubic-bezier(0.25, 0.1, 0.25, 1);
  --duration: 200ms;
  --transition: height var(--duration) var(--ease),
    width var(--duration) var(--ease);
  z-index: 3;
  display: block;
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
  @media only screen and (max-width: ${560}px) {
    pointer-events: auto;
    left: 0;
    top: auto;
    bottom: -5px;
    transform: none;
    ${dx} {
      max-width: 448px;
      margin: 0 auto;
      &:before {
        width: 100%;
        border-radius: var(--ck-border-radius, 30px)
          var(--ck-border-radius, 30px) 0 0;
      }
    }
    ${dA} {
      left: 0;
      right: 0;
      margin: 0 auto;
      width: auto;
    }
    ${db} {
      margin: 0 auto;
      width: 100% !important;
    }
    ${dl} {
      top: 29px;
    }
    ${dy} {
      gap: 12px;
    }
    ${dh} {
      margin: 0 auto;
      max-width: 295px;
    }
    ${dC} {
  }