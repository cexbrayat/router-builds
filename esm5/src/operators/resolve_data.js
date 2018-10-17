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
import { from, of } from 'rxjs';
import { concatMap, last, map, mergeMap, reduce } from 'rxjs/operators';
import { inheritedParamsDataResolve } from '../router_state';
import { wrapIntoObservable } from '../utils/collection';
import { getToken } from '../utils/preactivation';
/**
 * @param {?} paramsInheritanceStrategy
 * @param {?} moduleInjector
 * @return {?}
 */
export function resolveData(paramsInheritanceStrategy, moduleInjector) {
    return function (source) {
        return source.pipe(mergeMap(function (t) {
            var targetSnapshot = t.targetSnapshot, canActivateChecks = t.guards.canActivateChecks;
            if (!canActivateChecks.length) {
                return of(t);
            }
            return from(canActivateChecks)
                .pipe(concatMap(function (check) { return runResolve(check.route, /** @type {?} */ ((targetSnapshot)), paramsInheritanceStrategy, moduleInjector); }), reduce(function (_, __) { return _; }), map(function (_) { return t; }));
        }));
    };
}
/**
 * @param {?} futureARS
 * @param {?} futureRSS
 * @param {?} paramsInheritanceStrategy
 * @param {?} moduleInjector
 * @return {?}
 */
function runResolve(futureARS, futureRSS, paramsInheritanceStrategy, moduleInjector) {
    /** @type {?} */
    var resolve = futureARS._resolve;
    return resolveNode(resolve, futureARS, futureRSS, moduleInjector)
        .pipe(map(function (resolvedData) {
        futureARS._resolvedData = resolvedData;
        futureARS.data = tslib_1.__assign({}, futureARS.data, inheritedParamsDataResolve(futureARS, paramsInheritanceStrategy).resolve);
        return null;
    }));
}
/**
 * @param {?} resolve
 * @param {?} futureARS
 * @param {?} futureRSS
 * @param {?} moduleInjector
 * @return {?}
 */
function resolveNode(resolve, futureARS, futureRSS, moduleInjector) {
    /** @type {?} */
    var keys = Object.keys(resolve);
    if (keys.length === 0) {
        return of({});
    }
    if (keys.length === 1) {
        /** @type {?} */
        var key_1 = keys[0];
        return getResolver(resolve[key_1], futureARS, futureRSS, moduleInjector)
            .pipe(map(function (value) {
            var _a;
            return _a = {}, _a[key_1] = value, _a;
        }));
    }
    /** @type {?} */
    var data = {};
    /** @type {?} */
    var runningResolvers$ = from(keys).pipe(mergeMap(function (key) {
        return getResolver(resolve[key], futureARS, futureRSS, moduleInjector)
            .pipe(map(function (value) {
            data[key] = value;
            return value;
        }));
    }));
    return runningResolvers$.pipe(last(), map(function () { return data; }));
}
/**
 * @param {?} injectionToken
 * @param {?} futureARS
 * @param {?} futureRSS
 * @param {?} moduleInjector
 * @return {?}
 */
function getResolver(injectionToken, futureARS, futureRSS, moduleInjector) {
    /** @type {?} */
    var resolver = getToken(injectionToken, futureARS, moduleInjector);
    return resolver.resolve ? wrapIntoObservable(resolver.resolve(futureARS, futureRSS)) :
        wrapIntoObservable(resolver(futureARS, futureRSS));
}
//# sourceMappingURL=resolve_data.js.map