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
import { map, mergeMap } from 'rxjs/operators';
import { recognize as recognizeFn } from '../recognize';
/**
 * @param {?} rootComponentType
 * @param {?} config
 * @param {?} serializer
 * @param {?} paramsInheritanceStrategy
 * @return {?}
 */
export function recognize(rootComponentType, config, serializer, paramsInheritanceStrategy) {
    return function (source) {
        return source.pipe(mergeMap(t => recognizeFn(rootComponentType, config, t.urlAfterRedirects, serializer(t.urlAfterRedirects), paramsInheritanceStrategy)
            .pipe(map(targetSnapshot => (Object.assign({}, t, { targetSnapshot }))))));
    };
}
//# sourceMappingURL=recognize.js.map