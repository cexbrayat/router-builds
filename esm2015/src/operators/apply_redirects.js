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
import { map, switchMap } from 'rxjs/operators';
import { applyRedirects as applyRedirectsFn } from '../apply_redirects';
/**
 * @param {?} moduleInjector
 * @param {?} configLoader
 * @param {?} urlSerializer
 * @param {?} config
 * @return {?}
 */
export function applyRedirects(moduleInjector, configLoader, urlSerializer, config) {
    return function (source) {
        return source.pipe(switchMap(t => applyRedirectsFn(moduleInjector, configLoader, urlSerializer, t.extractedUrl, config)
            .pipe(map(urlAfterRedirects => (Object.assign({}, t, { urlAfterRedirects }))))));
    };
}
//# sourceMappingURL=apply_redirects.js.map