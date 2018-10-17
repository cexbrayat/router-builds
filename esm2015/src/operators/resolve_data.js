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
        return source.pipe(mergeMap(t => {
            const { targetSnapshot, guards: { canActivateChecks } } = t;
            if (!canActivateChecks.length) {
                return of(t);
            }
            return from(canActivateChecks)
                .pipe(concatMap(check => runResolve(check.route, /** @type {?} */ ((targetSnapshot)), paramsInheritanceStrategy, moduleInjector)), reduce((_, __) => _), map(_ => t));
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
    const resolve = futureARS._resolve;
    return resolveNode(resolve, futureARS, futureRSS, moduleInjector)
        .pipe(map((resolvedData) => {
        futureARS._resolvedData = resolvedData;
        futureARS.data = Object.assign({}, futureARS.data, inheritedParamsDataResolve(futureARS, paramsInheritanceStrategy).resolve);
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
    const keys = Object.keys(resolve);
    if (keys.length === 0) {
        return of({});
    }
    if (keys.length === 1) {
        /** @type {?} */
        const key = keys[0];
        return getResolver(resolve[key], futureARS, futureRSS, moduleInjector)
            .pipe(map((value) => { return { [key]: value }; }));
    }
    /** @type {?} */
    const data = {};
    /** @type {?} */
    const runningResolvers$ = from(keys).pipe(mergeMap((key) => {
        return getResolver(resolve[key], futureARS, futureRSS, moduleInjector)
            .pipe(map((value) => {
            data[key] = value;
            return value;
        }));
    }));
    return runningResolvers$.pipe(last(), map(() => data));
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
    const resolver = getToken(injectionToken, futureARS, moduleInjector);
    return resolver.resolve ? wrapIntoObservable(resolver.resolve(futureARS, futureRSS)) :
        wrapIntoObservable(resolver(futureARS, futureRSS));
}
//# sourceMappingURL=resolve_data.js.map