// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gQmSg":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50619;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "7381faf90d8ce6f6";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"9qcUd":[function(require,module,exports,__globalThis) {
/* The following plugin is a Club GSAP perk */ var _drawSVGPlugin = require("gsap/DrawSVGPlugin");
var _setLoadingStates = require("./modules/setLoadingStates");
var _staggerHeading = require("./modules/staggerHeading");
var _staggerText = require("./modules/staggerText");
var _staggerElements = require("./modules/staggerElements");
// import { initButtonStates } from "./modules/buttonStates";
// import { playVideoOnScroll, setTransparentVideo } from "./modules/playVideoOnScroll";
var _menu = require("./modules/menu");
gsap.registerPlugin((0, _drawSVGPlugin.DrawSVGPlugin));
// import { setImageMasks } from "./modules/setImageMasks";
// import { initFormSubmit } from "./modules/formSubmit";
// import { initContactForm } from "./modules/contactForm";
// import { setVideosModal } from "./modules/videoModal";
// wait until DOM is ready (html and svg markup)
document.addEventListener("DOMContentLoaded", function() {
    (0, _menu.initMenu)();
    // initButtonStates();
    // playVideoOnScroll();
    // setImageMasks();
    (0, _staggerElements.setStaggerElements)();
// initFormSubmit();
// initContactForm();
// setVideosModal();
});
document.fonts.ready.then(()=>{
    (0, _staggerText.setStaggerText)();
    (0, _staggerHeading.setRevealHeading)();
    (0, _setLoadingStates.setLoadingStates)();
});

},{"gsap/DrawSVGPlugin":"7YGDu","./modules/setLoadingStates":"10fje","./modules/staggerHeading":"kL2X7","./modules/staggerText":"h1EYx","./modules/staggerElements":"aJF8f","./modules/menu":"gw7wn"}],"7YGDu":[function(require,module,exports,__globalThis) {
module.exports = gsap;

},{}],"10fje":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setLoadingStates", ()=>setLoadingStates);
function setLoadingStates() {
    const loading = document.querySelector(".loading-wrapper");
    if (!loading) return;
    const logo = loading.querySelector(".loading_logo");
    const logoCircle = logo.querySelector("circle");
    const logoPath = logo.querySelector("path");
    gsap.set(logoCircle, {
        drawSVG: "0 100% live"
    });
    gsap.set(logoPath, {
        drawSVG: "0 100% live"
    });
    gsap.to(logoCircle, {
        drawSVG: "100% 100% live",
        duration: 1,
        ease: "expo.out"
    });
    gsap.to(logoPath, {
        drawSVG: "100% 100% live",
        duration: 1,
        ease: "expo.out"
    });
    gsap.to(loading, {
        maskPosition: "100% 100%",
        duration: 1,
        delay: 0.5,
        ease: "expo.out",
        onComplete: ()=>{
            loading.style.display = "none";
            gsap.set(logoCircle, {
                drawSVG: "0% 0% live"
            });
            gsap.set(logoPath, {
                drawSVG: "0% 0% live"
            });
            gsap.set(loading, {
                maskPosition: "0% 100%"
            });
        }
    });
    // Loading animation
    const links = document.querySelectorAll("a");
    links.forEach((l)=>{
        l.addEventListener("click", (e)=>{
            // e.preventDefault();
            const href = l.href;
            const url = new URL(href);
            if (window.location.origin === url.origin && window.location.pathname !== url.pathname && l.target !== "_blank") {
                e.preventDefault();
                loading.style.display = "block";
                gsap.to(logoCircle, {
                    drawSVG: "0% 100% live",
                    duration: 1,
                    ease: "expo.out"
                });
                gsap.to(logoPath, {
                    drawSVG: "0% 100% live",
                    duration: 1,
                    ease: "expo.out"
                });
                gsap.to(loading, {
                    maskPosition: "50% 100%",
                    duration: 1,
                    delay: 0.5,
                    ease: "expo.out",
                    onComplete: ()=>{
                        window.location.href = href;
                    }
                });
            // setTimeout(() => {
            //   window.location.href = href;
            // }, 500);
            }
        });
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"kL2X7":[function(require,module,exports,__globalThis) {
// Link timelines to scroll position
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createScrollTrigger", ()=>createScrollTrigger);
parcelHelpers.export(exports, "setRevealHeading", ()=>setRevealHeading);
function createScrollTrigger(el, triggerEl, start, end, delay, withScroll) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("reveal-heading_wrapper");
    el.parentNode.insertBefore(wrapper, el);
    const transparent = el.cloneNode(true);
    wrapper.appendChild(el);
    wrapper.appendChild(transparent);
    transparent.classList.add('transparent');
    // transparent.removeAttribute('revealHeading');
    gsap.set(el, {
        opacity: 0
    });
    gsap.set(transparent, {
        backgroundPositionX: "0%"
    });
    const trigger = {
        trigger: triggerEl,
        scrub: true,
        once: true,
        start,
        fastScrollEnd: 500,
        preventOverlaps: "scroll-headings"
    };
    if (!withScroll) {
        const tl = gsap.timeline({
            paused: true
        });
        trigger.onEnter = ()=>{
            tl.to(transparent, {
                backgroundPositionX: "50%",
                delay,
                duration: 0.5,
                overwrite: "auto",
                ease: "expo.out",
                onComplete: ()=>{
                    gsap.set(el, {
                        opacity: 1
                    });
                }
            }).to(transparent, {
                backgroundPositionX: "100%",
                duration: 0.5,
                overwrite: "auto",
                ease: "expo.out",
                onComplete: ()=>{
                    transparent.remove();
                }
            });
            tl.play();
        };
        gsap.timeline({
            scrollTrigger: trigger
        });
    } else {
        trigger.end = end;
        gsap.timeline({
            scrollTrigger: trigger
        }).to(transparent, {
            backgroundPositionX: "50%",
            delay,
            duration: 0.3,
            overwrite: "auto",
            ease: "expo.out",
            onComplete: ()=>{
                gsap.set(el, {
                    opacity: 1
                });
            }
        }).to(transparent, {
            backgroundPositionX: "100%",
            duration: 0.3,
            overwrite: "auto",
            ease: "expo.out",
            onComplete: ()=>{
                transparent.remove();
            }
        });
    }
}
function setRevealHeading() {
    const blocks = document.querySelectorAll("[reveal-heading]");
    blocks.forEach((el)=>{
        el.classList.add('init');
        const startVal = el.dataset.startPos || "center bottom", endVal = el.dataset.endPos || "bottom center", delay = el.dataset.delay || 0.2, withScrollTrigger = el.dataset.withScroll || false;
        createScrollTrigger(el, el, startVal, endVal, delay, withScrollTrigger);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h1EYx":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setStaggerText", ()=>setStaggerText);
var _setLinesWrapper = require("./setLinesWrapper");
// Link timelines to scroll position
function createScrollTrigger(triggerElement, elements, start, end, stagger, delay, withScroll) {
    const trigger = {
        trigger: triggerElement,
        scrub: true,
        start,
        fastScrollEnd: 500,
        preventOverlaps: "scroll-text"
    };
    if (!withScroll) {
        trigger.onEnter = ()=>{
            gsap.to(elements, {
                yPercent: 0,
                stagger: stagger,
                ease: "power4.out",
                delay: Number(delay)
            });
        };
        gsap.timeline({
            scrollTrigger: trigger
        });
    } else {
        trigger.end = end;
        gsap.timeline({
            scrollTrigger: trigger
        }).to(words, {
            yPercent: 0,
            stagger: stagger,
            ease: "none"
        });
    }
}
function setStaggerText() {
    // Split all words on the brand core section
    const textEls = document.querySelectorAll('[stagger-text]');
    textEls.forEach((el)=>{
        if (el.classList.contains('w-richtext')) {
            const staggerTextEls = new SplitType(el.querySelectorAll('p, li, h2, h3'), {
                types: "lines",
                tagName: "span"
            });
            (0, _setLinesWrapper.setLinesWrapper)(staggerTextEls.lines, ()=>{
                gsap.set(staggerTextEls.lines, {
                    yPercent: 100
                });
            });
        } else {
            const staggerTextEls = new SplitType(el, {
                types: "lines",
                tagName: "span"
            });
            (0, _setLinesWrapper.setLinesWrapper)(staggerTextEls.lines, ()=>{
                gsap.set(staggerTextEls.lines, {
                    yPercent: 100
                });
            });
        }
    });
    const textBlocks = document.querySelectorAll("[stagger-text]");
    textBlocks.forEach((el)=>{
        el.classList.add("init");
        const words1 = el.querySelectorAll(".line"), startVal = el.dataset.startPos || "center bottom", endVal = el.dataset.endPos || "bottom center", stagger = el.dataset.stagger || 0.05, delay = el.dataset.delay || 0, withScrollTrigger = el.dataset.withScroll || false;
        // let tl = gsap.timeline({ paused: true });
        createScrollTrigger(el, words1, startVal, endVal, stagger, delay, withScrollTrigger);
    });
}

},{"./setLinesWrapper":"hPUmk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hPUmk":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setLinesWrapper", ()=>setLinesWrapper);
function setLinesWrapper(lines, callback) {
    // Wrap each line in a .line-wrapper span
    lines.forEach((line)=>{
        const wrapper = document.createElement('span');
        wrapper.classList.add('line-wrapper');
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
    });
    if (typeof callback === 'function') callback();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aJF8f":[function(require,module,exports,__globalThis) {
// Link timelines to scroll position
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setStaggerElements", ()=>setStaggerElements);
function createScrollList(triggerElement, elements, start, stagger, delay) {
    gsap.set(elements, {
        yPercent: 100,
        opacity: 0
    });
    gsap.timeline({
        scrollTrigger: {
            trigger: triggerElement,
            scrub: true,
            start,
            onEnter: ()=>{
                gsap.to(elements, {
                    yPercent: 0,
                    opacity: 1,
                    stagger,
                    ease: "power4.out",
                    delay: Number(delay)
                });
            }
        }
    });
}
function setStaggerElements() {
    const list = document.querySelectorAll("[stagger-list]");
    console.log(list);
    if (!list) return;
    list.forEach((el)=>{
        const elements = el.querySelectorAll("[stagger-el]"), startVal = el.dataset.startPos || "top bottom", stagger = el.dataset.stagger || 0.05, delay = el.dataset.delay || 0;
        if (!elements) return;
        createScrollList(el, elements, startVal, stagger, delay);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gw7wn":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initMenu", ()=>initMenu);
function initMenu() {
    // apply a ".is-active" class to the ".navbar_component" element if the user has scrolled past the top of the page,
    // otherwise remove the ".is-active" class. Also, apply a ".is-active" class to the ".navbar_component" element if the user
    // clicks on any elements with the ".navbar_link.is-dropdown" class, otherwise remove the ".is-active" class.
    const navbar = document.querySelector(".navbar_component");
    const dropdowns = document.querySelectorAll(".navbar_link.is-dropdown");
    let isScrolling = false;
    window.addEventListener("scroll", ()=>{
        if (!isScrolling) window.requestAnimationFrame(()=>{
            isDropdownOpen();
            isScrolling = false;
        });
        isScrolling = true;
    });
    isDropdownOpen();
    let currentDropdown = null;
    // checks if there's any dropdown open, and if so, keeps the navbar active. Otherwise, removes the active class
    function isDropdownOpen() {
        const isOpen = Array.from(dropdowns).some((dropdown)=>dropdown.classList.contains("is-active"));
        if (!isOpen && window.scrollY === 0) navbar.classList.remove("is-active");
        else navbar.classList.add("is-active");
    }
    const dropdownsTimelines = [];
    dropdowns.forEach((dropdown, i)=>{
        const submenu = dropdown.nextElementSibling;
        if (!submenu) return;
        // create a timeline for each submenu. Execute the isDropdownOpen function if the submenu timeline is reversed, once it's completed.
        const submenuTl = gsap.timeline({
            paused: true,
            onStart: isDropdownOpen,
            onReverseComplete: isDropdownOpen
        });
        submenuTl.fromTo(submenu, {
            height: 0
        }, {
            height: "auto",
            duration: 0.5,
            ease: "expo.inOut"
        });
        if (submenu.querySelector(".big-links_list")) submenuTl.from(submenu.querySelectorAll(".big-links_list a"), {
            yPercent: 10,
            opacity: 0,
            duration: 0.2,
            stagger: 0.1
        }, 0);
        dropdownsTimelines.push(submenuTl);
        // closes all submenus (playing their respective timelines) and opens the submenu that was clicked
        function toggleSubmenu() {
            if (currentDropdown && currentDropdown !== dropdown) {
                dropdownsTimelines.forEach((timeline)=>timeline.reverse());
                currentDropdown.classList.remove("is-active");
            }
            if (submenuTl.progress() === 1) submenuTl.reverse();
            else submenuTl.play();
            if (currentDropdown === dropdown) {
                currentDropdown.classList.remove("is-active");
                currentDropdown = null;
            } else {
                currentDropdown = dropdown;
                currentDropdown.classList.add("is-active");
            }
        }
        dropdown.addEventListener("click", toggleSubmenu);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["gQmSg","9qcUd"], "9qcUd", "parcelRequire94c2")

//# sourceMappingURL=globals.js.map
