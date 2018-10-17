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
        return source.pipe(switchMap(function (t) { return applyRedirectsFn(moduleInjector, configLoader, urlSerializer, t.extractedUrl, config)
            .pipe(map(function (urlAfterRedirects) { return (tslib_1.__assign({}, t, { urlAfterRedirects: urlAfterRedirects })); })); }));
    };
}
//# sourceMappingURL=apply_redirects.js.map