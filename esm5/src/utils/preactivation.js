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
import { equalParamsAndUrlSegments } from '../router_state';
import { forEach, shallowEqual } from '../utils/collection';
import { nodeChildrenAsMap } from '../utils/tree';
var CanActivate = /** @class */ (function () {
    function CanActivate(path) {
        this.path = path;
        this.route = this.path[this.path.length - 1];
    }
    return CanActivate;
}());
export { CanActivate };
if (false) {
    /** @type {?} */
    CanActivate.prototype.route;
    /** @type {?} */
    CanActivate.prototype.path;
}
var CanDeactivate = /** @class */ (function () {
    function CanDeactivate(component, route) {
        this.component = component;
        this.route = route;
    }
    return CanDeactivate;
}());
export { CanDeactivate };
if (false) {
    /** @type {?} */
    CanDeactivate.prototype.component;
    /** @type {?} */
    CanDeactivate.prototype.route;
}
/**
 * @param {?} future
 * @param {?} curr
 * @param {?} parentContexts
 * @return {?}
 */
export function getAllRouteGuards(future, curr, parentContexts) {
    /** @type {?} */
    var futureRoot = future._root;
    /** @type {?} */
    var currRoot = curr ? curr._root : null;
    return getChildRouteGuards(futureRoot, currRoot, parentContexts, [futureRoot.value]);
}
/**
 * @param {?} p
 * @return {?}
 */
export function getCanActivateChild(p) {
    /** @type {?} */
    var canActivateChild = p.routeConfig ? p.routeConfig.canActivateChild : null;
    if (!canActivateChild || canActivateChild.length === 0)
        return null;
    return { node: p, guards: canActivateChild };
}
/**
 * @param {?} token
 * @param {?} snapshot
 * @param {?} moduleInjector
 * @return {?}
 */
export function getToken(token, snapshot, moduleInjector) {
    /** @type {?} */
    var config = getClosestLoadedConfig(snapshot);
    /** @type {?} */
    var injector = config ? config.module.injector : moduleInjector;
    return injector.get(token);
}
/**
 * @param {?} snapshot
 * @return {?}
 */
function getClosestLoadedConfig(snapshot) {
    if (!snapshot)
        return null;
    for (var s = snapshot.parent; s; s = s.parent) {
        /** @type {?} */
        var route = s.routeConfig;
        if (route && route._loadedConfig)
            return route._loadedConfig;
    }
    return null;
}
/**
 * @param {?} futureNode
 * @param {?} currNode
 * @param {?} contexts
 * @param {?} futurePath
 * @param {?=} checks
 * @return {?}
 */
function getChildRouteGuards(futureNode, currNode, contexts, futurePath, checks) {
    if (checks === void 0) { checks = {
        canDeactivateChecks: [],
        canActivateChecks: []
    }; }
    /** @type {?} */
    var prevChildren = nodeChildrenAsMap(currNode);
    // Process the children of the future route
    futureNode.children.forEach(function (c) {
        getRouteGuards(c, prevChildren[c.value.outlet], contexts, futurePath.concat([c.value]), checks);
        delete prevChildren[c.value.outlet];
    });
    // Process any children left from the current route (not active for the future route)
    forEach(prevChildren, function (v, k) {
        return deactivateRouteAndItsChildren(v, /** @type {?} */ ((contexts)).getContext(k), checks);
    });
    return checks;
}
/**
 * @param {?} futureNode
 * @param {?} currNode
 * @param {?} parentContexts
 * @param {?} futurePath
 * @param {?=} checks
 * @return {?}
 */
function getRouteGuards(futureNode, currNode, parentContexts, futurePath, checks) {
    if (checks === void 0) { checks = {
        canDeactivateChecks: [],
        canActivateChecks: []
    }; }
    /** @type {?} */
    var future = futureNode.value;
    /** @type {?} */
    var curr = currNode ? currNode.value : null;
    /** @type {?} */
    var context = parentContexts ? parentContexts.getContext(futureNode.value.outlet) : null;
    // reusing the node
    if (curr && future.routeConfig === curr.routeConfig) {
        /** @type {?} */
        var shouldRun = shouldRunGuardsAndResolvers(curr, future, /** @type {?} */ ((future.routeConfig)).runGuardsAndResolvers);
        if (shouldRun) {
            checks.canActivateChecks.push(new CanActivate(futurePath));
        }
        else {
            // we need to set the data
            future.data = curr.data;
            future._resolvedData = curr._resolvedData;
        }
        // If we have a component, we need to go through an outlet.
        if (future.component) {
            getChildRouteGuards(futureNode, currNode, context ? context.children : null, futurePath, checks);
            // if we have a componentless route, we recurse but keep the same outlet map.
        }
        else {
            getChildRouteGuards(futureNode, currNode, parentContexts, futurePath, checks);
        }
        if (shouldRun) {
            /** @type {?} */
            var outlet = /** @type {?} */ ((/** @type {?} */ ((context)).outlet));
            checks.canDeactivateChecks.push(new CanDeactivate(outlet.component, curr));
        }
    }
    else {
        if (curr) {
            deactivateRouteAndItsChildren(currNode, context, checks);
        }
        checks.canActivateChecks.push(new CanActivate(futurePath));
        // If we have a component, we need to go through an outlet.
        if (future.component) {
            getChildRouteGuards(futureNode, null, context ? context.children : null, futurePath, checks);
            // if we have a componentless route, we recurse but keep the same outlet map.
        }
        else {
            getChildRouteGuards(futureNode, null, parentContexts, futurePath, checks);
        }
    }
    return checks;
}
/**
 * @param {?} curr
 * @param {?} future
 * @param {?} mode
 * @return {?}
 */
function shouldRunGuardsAndResolvers(curr, future, mode) {
    switch (mode) {
        case 'always':
            return true;
        case 'paramsOrQueryParamsChange':
            return !equalParamsAndUrlSegments(curr, future) ||
                !shallowEqual(curr.queryParams, future.queryParams);
        case 'paramsChange':
        default:
            return !equalParamsAndUrlSegments(curr, future);
    }
}
/**
 * @param {?} route
 * @param {?} context
 * @param {?} checks
 * @return {?}
 */
function deactivateRouteAndItsChildren(route, context, checks) {
    /** @type {?} */
    var children = nodeChildrenAsMap(route);
    /** @type {?} */
    var r = route.value;
    forEach(children, function (node, childName) {
        if (!r.component) {
            deactivateRouteAndItsChildren(node, context, checks);
        }
        else if (context) {
            deactivateRouteAndItsChildren(node, context.children.getContext(childName), checks);
        }
        else {
            deactivateRouteAndItsChildren(node, null, checks);
        }
    });
    if (!r.component) {
        checks.canDeactivateChecks.push(new CanDeactivate(null, r));
    }
    else if (context && context.outlet && context.outlet.isActivated) {
        checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, r));
    }
    else {
        checks.canDeactivateChecks.push(new CanDeactivate(null, r));
    }
}
//# sourceMappingURL=preactivation.js.map