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
import { LocationStrategy } from '@angular/common';
import { Attribute, Directive, ElementRef, HostBinding, HostListener, Input, Renderer2, isDevMode } from '@angular/core';
import { NavigationEnd } from '../events';
import { Router } from '../router';
import { ActivatedRoute } from '../router_state';
/**
 * \@description
 *
 * Lets you link to specific routes in your app.
 *
 * Consider the following route configuration:
 * `[{ path: 'user/:name', component: UserCmp }]`.
 * When linking to this `user/:name` route, you use the `RouterLink` directive.
 *
 * If the link is static, you can use the directive as follows:
 * `<a routerLink="/user/bob">link to user component</a>`
 *
 * If you use dynamic values to generate the link, you can pass an array of path
 * segments, followed by the params for each segment.
 *
 * For instance `['/team', teamId, 'user', userName, {details: true}]`
 * means that we want to generate a link to `/team/11/user/bob;details=true`.
 *
 * Multiple static segments can be merged into one
 * (e.g., `['/team/11/user', userName, {details: true}]`).
 *
 * The first segment name can be prepended with `/`, `./`, or `../`:
 * * If the first segment begins with `/`, the router will look up the route from the root of the
 *   app.
 * * If the first segment begins with `./`, or doesn't begin with a slash, the router will
 *   instead look in the children of the current activated route.
 * * And if the first segment begins with `../`, the router will go up one level.
 *
 * You can set query params and fragment as follows:
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">
 *   link to user component
 * </a>
 * ```
 * RouterLink will use these to generate this link: `/user/bob#education?debug=true`.
 *
 * (Deprecated in v4.0.0 use `queryParamsHandling` instead) You can also tell the
 * directive to preserve the current query params and fragment:
 *
 * ```
 * <a [routerLink]="['/user/bob']" preserveQueryParams preserveFragment>
 *   link to user component
 * </a>
 * ```
 *
 * You can tell the directive to how to handle queryParams, available options are:
 *  - `'merge'`: merge the queryParams into the current queryParams
 *  - `'preserve'`: preserve the current queryParams
 *  - default/`''`: use the queryParams only
 *
 * Same options for {\@link NavigationExtras#queryParamsHandling
 * NavigationExtras#queryParamsHandling}.
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" queryParamsHandling="merge">
 *   link to user component
 * </a>
 * ```
 *
 * The router link directive always treats the provided input as a delta to the current url.
 *
 * For instance, if the current url is `/user/(box//aux:team)`.
 *
 * Then the following link `<a [routerLink]="['/user/jim']">Jim</a>` will generate the link
 * `/user/(jim//aux:team)`.
 *
 * See {\@link Router#createUrlTree createUrlTree} for more information.
 *
 * \@ngModule RouterModule
 *
 *
 */
var RouterLink = /** @class */ (function () {
    function RouterLink(router, route, tabIndex, renderer, el) {
        this.router = router;
        this.route = route;
        this.commands = [];
        if (tabIndex == null) {
            renderer.setAttribute(el.nativeElement, 'tabindex', '0');
        }
    }
    Object.defineProperty(RouterLink.prototype, "routerLink", {
        set: /**
         * @param {?} commands
         * @return {?}
         */
        function (commands) {
            if (commands != null) {
                this.commands = Array.isArray(commands) ? commands : [commands];
            }
            else {
                this.commands = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterLink.prototype, "preserveQueryParams", {
        /**
         * @deprecated 4.0.0 use `queryParamsHandling` instead.
         */
        set: /**
         * @deprecated 4.0.0 use `queryParamsHandling` instead.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isDevMode() && /** @type {?} */ (console) && /** @type {?} */ (console.warn)) {
                console.warn('preserveQueryParams is deprecated!, use queryParamsHandling instead.');
            }
            this.preserve = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RouterLink.prototype.onClick = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return true;
    };
    Object.defineProperty(RouterLink.prototype, "urlTree", {
        get: /**
         * @return {?}
         */
        function () {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: attrBoolValue(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: attrBoolValue(this.preserveFragment),
            });
        },
        enumerable: true,
        configurable: true
    });
    RouterLink.decorators = [
        { type: Directive, args: [{ selector: ':not(a)[routerLink]' },] },
    ];
    /** @nocollapse */
    RouterLink.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    RouterLink.propDecorators = {
        queryParams: [{ type: Input }],
        fragment: [{ type: Input }],
        queryParamsHandling: [{ type: Input }],
        preserveFragment: [{ type: Input }],
        skipLocationChange: [{ type: Input }],
        replaceUrl: [{ type: Input }],
        routerLink: [{ type: Input }],
        preserveQueryParams: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return RouterLink;
}());
export { RouterLink };
if (false) {
    /** @type {?} */
    RouterLink.prototype.queryParams;
    /** @type {?} */
    RouterLink.prototype.fragment;
    /** @type {?} */
    RouterLink.prototype.queryParamsHandling;
    /** @type {?} */
    RouterLink.prototype.preserveFragment;
    /** @type {?} */
    RouterLink.prototype.skipLocationChange;
    /** @type {?} */
    RouterLink.prototype.replaceUrl;
    /** @type {?} */
    RouterLink.prototype.commands;
    /** @type {?} */
    RouterLink.prototype.preserve;
    /** @type {?} */
    RouterLink.prototype.router;
    /** @type {?} */
    RouterLink.prototype.route;
}
/**
 * \@description
 *
 * Lets you link to specific routes in your app.
 *
 * See `RouterLink` for more information.
 *
 * \@ngModule RouterModule
 *
 *
 */
var RouterLinkWithHref = /** @class */ (function () {
    function RouterLinkWithHref(router, route, locationStrategy) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.locationStrategy = locationStrategy;
        this.commands = [];
        this.subscription = router.events.subscribe(function (s) {
            if (s instanceof NavigationEnd) {
                _this.updateTargetUrlAndHref();
            }
        });
    }
    Object.defineProperty(RouterLinkWithHref.prototype, "routerLink", {
        set: /**
         * @param {?} commands
         * @return {?}
         */
        function (commands) {
            if (commands != null) {
                this.commands = Array.isArray(commands) ? commands : [commands];
            }
            else {
                this.commands = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterLinkWithHref.prototype, "preserveQueryParams", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isDevMode() && /** @type {?} */ (console) && /** @type {?} */ (console.warn)) {
                console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
            }
            this.preserve = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    RouterLinkWithHref.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) { this.updateTargetUrlAndHref(); };
    /**
     * @return {?}
     */
    RouterLinkWithHref.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this.subscription.unsubscribe(); };
    /**
     * @param {?} button
     * @param {?} ctrlKey
     * @param {?} metaKey
     * @param {?} shiftKey
     * @return {?}
     */
    RouterLinkWithHref.prototype.onClick = /**
     * @param {?} button
     * @param {?} ctrlKey
     * @param {?} metaKey
     * @param {?} shiftKey
     * @return {?}
     */
    function (button, ctrlKey, metaKey, shiftKey) {
        if (button !== 0 || ctrlKey || metaKey || shiftKey) {
            return true;
        }
        if (typeof this.target === 'string' && this.target != '_self') {
            return true;
        }
        /** @type {?} */
        var extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return false;
    };
    /**
     * @return {?}
     */
    RouterLinkWithHref.prototype.updateTargetUrlAndHref = /**
     * @return {?}
     */
    function () {
        this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
    };
    Object.defineProperty(RouterLinkWithHref.prototype, "urlTree", {
        get: /**
         * @return {?}
         */
        function () {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: attrBoolValue(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: attrBoolValue(this.preserveFragment),
            });
        },
        enumerable: true,
        configurable: true
    });
    RouterLinkWithHref.decorators = [
        { type: Directive, args: [{ selector: 'a[routerLink]' },] },
    ];
    /** @nocollapse */
    RouterLinkWithHref.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: LocationStrategy }
    ]; };
    RouterLinkWithHref.propDecorators = {
        target: [{ type: HostBinding, args: ['attr.target',] }, { type: Input }],
        queryParams: [{ type: Input }],
        fragment: [{ type: Input }],
        queryParamsHandling: [{ type: Input }],
        preserveFragment: [{ type: Input }],
        skipLocationChange: [{ type: Input }],
        replaceUrl: [{ type: Input }],
        href: [{ type: HostBinding }],
        routerLink: [{ type: Input }],
        preserveQueryParams: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'],] }]
    };
    return RouterLinkWithHref;
}());
export { RouterLinkWithHref };
if (false) {
    /** @type {?} */
    RouterLinkWithHref.prototype.target;
    /** @type {?} */
    RouterLinkWithHref.prototype.queryParams;
    /** @type {?} */
    RouterLinkWithHref.prototype.fragment;
    /** @type {?} */
    RouterLinkWithHref.prototype.queryParamsHandling;
    /** @type {?} */
    RouterLinkWithHref.prototype.preserveFragment;
    /** @type {?} */
    RouterLinkWithHref.prototype.skipLocationChange;
    /** @type {?} */
    RouterLinkWithHref.prototype.replaceUrl;
    /** @type {?} */
    RouterLinkWithHref.prototype.commands;
    /** @type {?} */
    RouterLinkWithHref.prototype.subscription;
    /** @type {?} */
    RouterLinkWithHref.prototype.preserve;
    /** @type {?} */
    RouterLinkWithHref.prototype.href;
    /** @type {?} */
    RouterLinkWithHref.prototype.router;
    /** @type {?} */
    RouterLinkWithHref.prototype.route;
    /** @type {?} */
    RouterLinkWithHref.prototype.locationStrategy;
}
/**
 * @param {?} s
 * @return {?}
 */
function attrBoolValue(s) {
    return s === '' || !!s;
}
//# sourceMappingURL=router_link.js.map