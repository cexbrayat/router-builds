/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { EmptyOutletComponent } from './components/empty_outlet';
import { PRIMARY_OUTLET } from './shared';
/** @typedef {?} */
var Routes;
export { Routes };
/** @typedef {?} */
var UrlMatchResult;
export { UrlMatchResult };
/** @typedef {?} */
var UrlMatcher;
export { UrlMatcher };
/** @typedef {?} */
var Data;
export { Data };
/** @typedef {?} */
var ResolveData;
export { ResolveData };
/** @typedef {?} */
var LoadChildrenCallback;
export { LoadChildrenCallback };
/** @typedef {?} */
var LoadChildren;
export { LoadChildren };
/** @typedef {?} */
var QueryParamsHandling;
export { QueryParamsHandling };
/** @typedef {?} */
var RunGuardsAndResolvers;
export { RunGuardsAndResolvers };
/**
 * See `Routes` for more details.
 *
 * @record
 */
export function Route() { }
/** @type {?|undefined} */
Route.prototype.path;
/** @type {?|undefined} */
Route.prototype.pathMatch;
/** @type {?|undefined} */
Route.prototype.matcher;
/** @type {?|undefined} */
Route.prototype.component;
/** @type {?|undefined} */
Route.prototype.redirectTo;
/** @type {?|undefined} */
Route.prototype.outlet;
/** @type {?|undefined} */
Route.prototype.canActivate;
/** @type {?|undefined} */
Route.prototype.canActivateChild;
/** @type {?|undefined} */
Route.prototype.canDeactivate;
/** @type {?|undefined} */
Route.prototype.canLoad;
/** @type {?|undefined} */
Route.prototype.data;
/** @type {?|undefined} */
Route.prototype.resolve;
/** @type {?|undefined} */
Route.prototype.children;
/** @type {?|undefined} */
Route.prototype.loadChildren;
/** @type {?|undefined} */
Route.prototype.runGuardsAndResolvers;
/**
 * Filled for routes with `loadChildren` once the module has been loaded
 * \@internal
 * @type {?|undefined}
 */
Route.prototype._loadedConfig;
var LoadedRouterConfig = /** @class */ (function () {
    function LoadedRouterConfig(routes, module) {
        this.routes = routes;
        this.module = module;
    }
    return LoadedRouterConfig;
}());
export { LoadedRouterConfig };
if (false) {
    /** @type {?} */
    LoadedRouterConfig.prototype.routes;
    /** @type {?} */
    LoadedRouterConfig.prototype.module;
}
/**
 * @param {?} config
 * @param {?=} parentPath
 * @return {?}
 */
export function validateConfig(config, parentPath) {
    if (parentPath === void 0) { parentPath = ''; }
    // forEach doesn't iterate undefined values
    for (var i = 0; i < config.length; i++) {
        /** @type {?} */
        var route = config[i];
        /** @type {?} */
        var fullPath = getFullPath(parentPath, route);
        validateNode(route, fullPath);
    }
}
/**
 * @param {?} route
 * @param {?} fullPath
 * @return {?}
 */
function validateNode(route, fullPath) {
    if (!route) {
        throw new Error("\n      Invalid configuration of route '" + fullPath + "': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    ");
    }
    if (Array.isArray(route)) {
        throw new Error("Invalid configuration of route '" + fullPath + "': Array cannot be specified");
    }
    if (!route.component && !route.children && !route.loadChildren &&
        (route.outlet && route.outlet !== PRIMARY_OUTLET)) {
        throw new Error("Invalid configuration of route '" + fullPath + "': a componentless route without children or loadChildren cannot have a named outlet set");
    }
    if (route.redirectTo && route.children) {
        throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and children cannot be used together");
    }
    if (route.redirectTo && route.loadChildren) {
        throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and loadChildren cannot be used together");
    }
    if (route.children && route.loadChildren) {
        throw new Error("Invalid configuration of route '" + fullPath + "': children and loadChildren cannot be used together");
    }
    if (route.redirectTo && route.component) {
        throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and component cannot be used together");
    }
    if (route.path && route.matcher) {
        throw new Error("Invalid configuration of route '" + fullPath + "': path and matcher cannot be used together");
    }
    if (route.redirectTo === void 0 && !route.component && !route.children && !route.loadChildren) {
        throw new Error("Invalid configuration of route '" + fullPath + "'. One of the following must be provided: component, redirectTo, children or loadChildren");
    }
    if (route.path === void 0 && route.matcher === void 0) {
        throw new Error("Invalid configuration of route '" + fullPath + "': routes must have either a path or a matcher specified");
    }
    if (typeof route.path === 'string' && route.path.charAt(0) === '/') {
        throw new Error("Invalid configuration of route '" + fullPath + "': path cannot start with a slash");
    }
    if (route.path === '' && route.redirectTo !== void 0 && route.pathMatch === void 0) {
        /** @type {?} */
        var exp = "The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.";
        throw new Error("Invalid configuration of route '{path: \"" + fullPath + "\", redirectTo: \"" + route.redirectTo + "\"}': please provide 'pathMatch'. " + exp);
    }
    if (route.pathMatch !== void 0 && route.pathMatch !== 'full' && route.pathMatch !== 'prefix') {
        throw new Error("Invalid configuration of route '" + fullPath + "': pathMatch can only be set to 'prefix' or 'full'");
    }
    if (route.children) {
        validateConfig(route.children, fullPath);
    }
}
/**
 * @param {?} parentPath
 * @param {?} currentRoute
 * @return {?}
 */
function getFullPath(parentPath, currentRoute) {
    if (!currentRoute) {
        return parentPath;
    }
    if (!parentPath && !currentRoute.path) {
        return '';
    }
    else if (parentPath && !currentRoute.path) {
        return parentPath + "/";
    }
    else if (!parentPath && currentRoute.path) {
        return currentRoute.path;
    }
    else {
        return parentPath + "/" + currentRoute.path;
    }
}
/**
 * Makes a copy of the config and adds any default required properties.
 * @param {?} r
 * @return {?}
 */
export function standardizeConfig(r) {
    /** @type {?} */
    var children = r.children && r.children.map(standardizeConfig);
    /** @type {?} */
    var c = children ? tslib_1.__assign({}, r, { children: children }) : tslib_1.__assign({}, r);
    if (!c.component && (children || c.loadChildren) && (c.outlet && c.outlet !== PRIMARY_OUTLET)) {
        c.component = EmptyOutletComponent;
    }
    return c;
}
//# sourceMappingURL=config.js.map