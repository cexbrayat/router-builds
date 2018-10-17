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
import { concatMap, every, first, map, mergeMap } from 'rxjs/operators';
import { ActivationStart, ChildActivationStart } from '../events';
import { andObservables, wrapIntoObservable } from '../utils/collection';
import { getCanActivateChild, getToken } from '../utils/preactivation';
/**
 * @param {?} moduleInjector
 * @param {?=} forwardEvent
 * @return {?}
 */
export function checkGuards(moduleInjector, forwardEvent) {
    return function (source) {
        return source.pipe(mergeMap(t => {
            const { targetSnapshot, currentSnapshot, guards: { canActivateChecks, canDeactivateChecks } } = t;
            if (canDeactivateChecks.length === 0 && canActivateChecks.length === 0) {
                return of(Object.assign({}, t, { guardsResult: true }));
            }
            return runCanDeactivateChecks(canDeactivateChecks, /** @type {?} */ ((targetSnapshot)), currentSnapshot, moduleInjector)
                .pipe(mergeMap((canDeactivate) => {
                return canDeactivate ?
                    runCanActivateChecks(/** @type {?} */ ((targetSnapshot)), canActivateChecks, moduleInjector, forwardEvent) :
                    of(false);
            }), map(guardsResult => (Object.assign({}, t, { guardsResult }))));
        }));
    };
}
/**
 * @param {?} checks
 * @param {?} futureRSS
 * @param {?} currRSS
 * @param {?} moduleInjector
 * @return {?}
 */
function runCanDeactivateChecks(checks, futureRSS, currRSS, moduleInjector) {
    return from(checks).pipe(mergeMap((check) => runCanDeactivate(check.component, check.route, currRSS, futureRSS, moduleInjector)), every((result) => result === true));
}
/**
 * @param {?} futureSnapshot
 * @param {?} checks
 * @param {?} moduleInjector
 * @param {?=} forwardEvent
 * @return {?}
 */
function runCanActivateChecks(futureSnapshot, checks, moduleInjector, forwardEvent) {
    return from(checks).pipe(concatMap((check) => andObservables(from([
        fireChildActivationStart(check.route.parent, forwardEvent),
        fireActivationStart(check.route, forwardEvent),
        runCanActivateChild(futureSnapshot, check.path, moduleInjector),
        runCanActivate(futureSnapshot, check.route, moduleInjector)
    ]))), every((result) => result === true));
}
/**
 * This should fire off `ActivationStart` events for each route being activated at this
 * level.
 * In other words, if you're activating `a` and `b` below, `path` will contain the
 * `ActivatedRouteSnapshot`s for both and we will fire `ActivationStart` for both. Always
 * return
 * `true` so checks continue to run.
 * @param {?} snapshot
 * @param {?=} forwardEvent
 * @return {?}
 */
function fireActivationStart(snapshot, forwardEvent) {
    if (snapshot !== null && forwardEvent) {
        forwardEvent(new ActivationStart(snapshot));
    }
    return of(true);
}
/**
 * This should fire off `ChildActivationStart` events for each route being activated at this
 * level.
 * In other words, if you're activating `a` and `b` below, `path` will contain the
 * `ActivatedRouteSnapshot`s for both and we will fire `ChildActivationStart` for both. Always
 * return
 * `true` so checks continue to run.
 * @param {?} snapshot
 * @param {?=} forwardEvent
 * @return {?}
 */
function fireChildActivationStart(snapshot, forwardEvent) {
    if (snapshot !== null && forwardEvent) {
        forwardEvent(new ChildActivationStart(snapshot));
    }
    return of(true);
}
/**
 * @param {?} futureRSS
 * @param {?} futureARS
 * @param {?} moduleInjector
 * @return {?}
 */
function runCanActivate(futureRSS, futureARS, moduleInjector) {
    /** @type {?} */
    const canActivate = futureARS.routeConfig ? futureARS.routeConfig.canActivate : null;
    if (!canActivate || canActivate.length === 0)
        return of(true);
    /** @type {?} */
    const obs = from(canActivate).pipe(map((c) => {
        /** @type {?} */
        const guard = getToken(c, futureARS, moduleInjector);
        /** @type {?} */
        let observable;
        if (guard.canActivate) {
            observable = wrapIntoObservable(guard.canActivate(futureARS, futureRSS));
        }
        else {
            observable = wrapIntoObservable(guard(futureARS, futureRSS));
        }
        return observable.pipe(first());
    }));
    return andObservables(obs);
}
/**
 * @param {?} futureRSS
 * @param {?} path
 * @param {?} moduleInjector
 * @return {?}
 */
function runCanActivateChild(futureRSS, path, moduleInjector) {
    /** @type {?} */
    const futureARS = path[path.length - 1];
    /** @type {?} */
    const canActivateChildGuards = path.slice(0, path.length - 1)
        .reverse()
        .map(p => getCanActivateChild(p))
        .filter(_ => _ !== null);
    return andObservables(from(canActivateChildGuards).pipe(map((d) => {
        /** @type {?} */
        const obs = from(d.guards).pipe(map((c) => {
            /** @type {?} */
            const guard = getToken(c, d.node, moduleInjector);
            /** @type {?} */
            let observable;
            if (guard.canActivateChild) {
                observable = wrapIntoObservable(guard.canActivateChild(futureARS, futureRSS));
            }
            else {
                observable = wrapIntoObservable(guard(futureARS, futureRSS));
            }
            return observable.pipe(first());
        }));
        return andObservables(obs);
    })));
}
/**
 * @param {?} component
 * @param {?} currARS
 * @param {?} currRSS
 * @param {?} futureRSS
 * @param {?} moduleInjector
 * @return {?}
 */
function runCanDeactivate(component, currARS, currRSS, futureRSS, moduleInjector) {
    /** @type {?} */
    const canDeactivate = currARS && currARS.routeConfig ? currARS.routeConfig.canDeactivate : null;
    if (!canDeactivate || canDeactivate.length === 0)
        return of(true);
    /** @type {?} */
    const canDeactivate$ = from(canDeactivate).pipe(mergeMap((c) => {
        /** @type {?} */
        const guard = getToken(c, currARS, moduleInjector);
        /** @type {?} */
        let observable;
        if (guard.canDeactivate) {
            observable = wrapIntoObservable(guard.canDeactivate(component, currARS, currRSS, futureRSS));
        }
        else {
            observable = wrapIntoObservable(guard(component, currARS, currRSS, futureRSS));
        }
        return observable.pipe(first());
    }));
    return canDeactivate$.pipe(every((result) => result === true));
}
//# sourceMappingURL=check_guards.js.map