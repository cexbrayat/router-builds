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
import { PRIMARY_OUTLET, convertToParamMap } from './shared';
import { forEach, shallowEqual } from './utils/collection';
/**
 * @return {?}
 */
export function createEmptyUrlTree() {
    return new UrlTree(new UrlSegmentGroup([], {}), {}, null);
}
/**
 * @param {?} container
 * @param {?} containee
 * @param {?} exact
 * @return {?}
 */
export function containsTree(container, containee, exact) {
    if (exact) {
        return equalQueryParams(container.queryParams, containee.queryParams) &&
            equalSegmentGroups(container.root, containee.root);
    }
    return containsQueryParams(container.queryParams, containee.queryParams) &&
        containsSegmentGroup(container.root, containee.root);
}
/**
 * @param {?} container
 * @param {?} containee
 * @return {?}
 */
function equalQueryParams(container, containee) {
    // TODO: This does not handle array params correctly.
    return shallowEqual(container, containee);
}
/**
 * @param {?} container
 * @param {?} containee
 * @return {?}
 */
function equalSegmentGroups(container, containee) {
    if (!equalPath(container.segments, containee.segments))
        return false;
    if (container.numberOfChildren !== containee.numberOfChildren)
        return false;
    for (const c in containee.children) {
        if (!container.children[c])
            return false;
        if (!equalSegmentGroups(container.children[c], containee.children[c]))
            return false;
    }
    return true;
}
/**
 * @param {?} container
 * @param {?} containee
 * @return {?}
 */
function containsQueryParams(container, containee) {
    // TODO: This does not handle array params correctly.
    return Object.keys(containee).length <= Object.keys(container).length &&
        Object.keys(containee).every(key => containee[key] === container[key]);
}
/**
 * @param {?} container
 * @param {?} containee
 * @return {?}
 */
function containsSegmentGroup(container, containee) {
    return containsSegmentGroupHelper(container, containee, containee.segments);
}
/**
 * @param {?} container
 * @param {?} containee
 * @param {?} containeePaths
 * @return {?}
 */
function containsSegmentGroupHelper(container, containee, containeePaths) {
    if (container.segments.length > containeePaths.length) {
        /** @type {?} */
        const current = container.segments.slice(0, containeePaths.length);
        if (!equalPath(current, containeePaths))
            return false;
        if (containee.hasChildren())
            return false;
        return true;
    }
    else if (container.segments.length === containeePaths.length) {
        if (!equalPath(container.segments, containeePaths))
            return false;
        for (const c in containee.children) {
            if (!container.children[c])
                return false;
            if (!containsSegmentGroup(container.children[c], containee.children[c]))
                return false;
        }
        return true;
    }
    else {
        /** @type {?} */
        const current = containeePaths.slice(0, container.segments.length);
        /** @type {?} */
        const next = containeePaths.slice(container.segments.length);
        if (!equalPath(container.segments, current))
            return false;
        if (!container.children[PRIMARY_OUTLET])
            return false;
        return containsSegmentGroupHelper(container.children[PRIMARY_OUTLET], containee, next);
    }
}
/**
 * \@description
 *
 * Represents the parsed URL.
 *
 * Since a router state is a tree, and the URL is nothing but a serialized state, the URL is a
 * serialized tree.
 * UrlTree is a data structure that provides a lot of affordances in dealing with URLs
 *
 * \@usageNotes
 * ### Example
 *
 * ```
 * \@Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const tree: UrlTree =
 *       router.parseUrl('/team/33/(user/victor//support:help)?debug=true#fragment');
 *     const f = tree.fragment; // return 'fragment'
 *     const q = tree.queryParams; // returns {debug: 'true'}
 *     const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
 *     const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
 *     g.children[PRIMARY_OUTLET].segments; // returns 2 segments 'user' and 'victor'
 *     g.children['support'].segments; // return 1 segment 'help'
 *   }
 * }
 * ```
 *
 *
 */
export class UrlTree {
    /**
     * \@internal
     * @param {?} root
     * @param {?} queryParams
     * @param {?} fragment
     */
    constructor(root, queryParams, fragment) {
        this.root = root;
        this.queryParams = queryParams;
        this.fragment = fragment;
    }
    /**
     * @return {?}
     */
    get queryParamMap() {
        if (!this._queryParamMap) {
            this._queryParamMap = convertToParamMap(this.queryParams);
        }
        return this._queryParamMap;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    toString() { return DEFAULT_SERIALIZER.serialize(this); }
}
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    UrlTree.prototype._queryParamMap;
    /**
     * The root segment group of the URL tree
     * @type {?}
     */
    UrlTree.prototype.root;
    /**
     * The query params of the URL
     * @type {?}
     */
    UrlTree.prototype.queryParams;
    /**
     * The fragment of the URL
     * @type {?}
     */
    UrlTree.prototype.fragment;
}
/**
 * \@description
 *
 * Represents the parsed URL segment group.
 *
 * See `UrlTree` for more information.
 *
 *
 */
export class UrlSegmentGroup {
    /**
     * @param {?} segments
     * @param {?} children
     */
    constructor(segments, children) {
        this.segments = segments;
        this.children = children;
        /**
         * The parent node in the url tree
         */
        this.parent = null;
        forEach(children, (v, k) => v.parent = this);
    }
    /**
     * Whether the segment has child segments
     * @return {?}
     */
    hasChildren() { return this.numberOfChildren > 0; }
    /**
     * Number of child segments
     * @return {?}
     */
    get numberOfChildren() { return Object.keys(this.children).length; }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    toString() { return serializePaths(this); }
}
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    UrlSegmentGroup.prototype._sourceSegment;
    /**
     * \@internal
     * @type {?}
     */
    UrlSegmentGroup.prototype._segmentIndexShift;
    /**
     * The parent node in the url tree
     * @type {?}
     */
    UrlSegmentGroup.prototype.parent;
    /**
     * The URL segments of this group. See `UrlSegment` for more information
     * @type {?}
     */
    UrlSegmentGroup.prototype.segments;
    /**
     * The list of children of this group
     * @type {?}
     */
    UrlSegmentGroup.prototype.children;
}
/**
 * \@description
 *
 * Represents a single URL segment.
 *
 * A UrlSegment is a part of a URL between the two slashes. It contains a path and the matrix
 * parameters associated with the segment.
 *
 * \@usageNotes
 *  ### Example
 *
 * ```
 * \@Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const tree: UrlTree = router.parseUrl('/team;id=33');
 *     const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
 *     const s: UrlSegment[] = g.segments;
 *     s[0].path; // returns 'team'
 *     s[0].parameters; // returns {id: 33}
 *   }
 * }
 * ```
 *
 *
 */
export class UrlSegment {
    /**
     * @param {?} path
     * @param {?} parameters
     */
    constructor(path, parameters) {
        this.path = path;
        this.parameters = parameters;
    }
    /**
     * @return {?}
     */
    get parameterMap() {
        if (!this._parameterMap) {
            this._parameterMap = convertToParamMap(this.parameters);
        }
        return this._parameterMap;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    toString() { return serializePath(this); }
}
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    UrlSegment.prototype._parameterMap;
    /**
     * The path part of a URL segment
     * @type {?}
     */
    UrlSegment.prototype.path;
    /**
     * The matrix parameters associated with a segment
     * @type {?}
     */
    UrlSegment.prototype.parameters;
}
/**
 * @param {?} as
 * @param {?} bs
 * @return {?}
 */
export function equalSegments(as, bs) {
    return equalPath(as, bs) && as.every((a, i) => shallowEqual(a.parameters, bs[i].parameters));
}
/**
 * @param {?} as
 * @param {?} bs
 * @return {?}
 */
export function equalPath(as, bs) {
    if (as.length !== bs.length)
        return false;
    return as.every((a, i) => a.path === bs[i].path);
}
/**
 * @template T
 * @param {?} segment
 * @param {?} fn
 * @return {?}
 */
export function mapChildrenIntoArray(segment, fn) {
    /** @type {?} */
    let res = [];
    forEach(segment.children, (child, childOutlet) => {
        if (childOutlet === PRIMARY_OUTLET) {
            res = res.concat(fn(child, childOutlet));
        }
    });
    forEach(segment.children, (child, childOutlet) => {
        if (childOutlet !== PRIMARY_OUTLET) {
            res = res.concat(fn(child, childOutlet));
        }
    });
    return res;
}
/**
 * \@description
 *
 * Serializes and deserializes a URL string into a URL tree.
 *
 * The url serialization strategy is customizable. You can
 * make all URLs case insensitive by providing a custom UrlSerializer.
 *
 * See `DefaultUrlSerializer` for an example of a URL serializer.
 *
 *
 * @abstract
 */
export class UrlSerializer {
}
if (false) {
    /**
     * Parse a url into a `UrlTree`
     * @abstract
     * @param {?} url
     * @return {?}
     */
    UrlSerializer.prototype.parse = function (url) { };
    /**
     * Converts a `UrlTree` into a url
     * @abstract
     * @param {?} tree
     * @return {?}
     */
    UrlSerializer.prototype.serialize = function (tree) { };
}
/**
 * \@description
 *
 * A default implementation of the `UrlSerializer`.
 *
 * Example URLs:
 *
 * ```
 * /inbox/33(popup:compose)
 * /inbox/33;open=true/messages/44
 * ```
 *
 * DefaultUrlSerializer uses parentheses to serialize secondary segments (e.g., popup:compose), the
 * colon syntax to specify the outlet, and the ';parameter=value' syntax (e.g., open=true) to
 * specify route specific parameters.
 *
 *
 */
export class DefaultUrlSerializer {
    /**
     * Parses a url into a `UrlTree`
     * @param {?} url
     * @return {?}
     */
    parse(url) {
        /** @type {?} */
        const p = new UrlParser(url);
        return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
    }
    /**
     * Converts a `UrlTree` into a url
     * @param {?} tree
     * @return {?}
     */
    serialize(tree) {
        /** @type {?} */
        const segment = `/${serializeSegment(tree.root, true)}`;
        /** @type {?} */
        const query = serializeQueryParams(tree.queryParams);
        /** @type {?} */
        const fragment = typeof tree.fragment === `string` ? `#${encodeUriFragment((/** @type {?} */ ((tree.fragment))))}` : '';
        return `${segment}${query}${fragment}`;
    }
}
/** @type {?} */
const DEFAULT_SERIALIZER = new DefaultUrlSerializer();
/**
 * @param {?} segment
 * @return {?}
 */
export function serializePaths(segment) {
    return segment.segments.map(p => serializePath(p)).join('/');
}
/**
 * @param {?} segment
 * @param {?} root
 * @return {?}
 */
function serializeSegment(segment, root) {
    if (!segment.hasChildren()) {
        return serializePaths(segment);
    }
    if (root) {
        /** @type {?} */
        const primary = segment.children[PRIMARY_OUTLET] ?
            serializeSegment(segment.children[PRIMARY_OUTLET], false) :
            '';
        /** @type {?} */
        const children = [];
        forEach(segment.children, (v, k) => {
            if (k !== PRIMARY_OUTLET) {
                children.push(`${k}:${serializeSegment(v, false)}`);
            }
        });
        return children.length > 0 ? `${primary}(${children.join('//')})` : primary;
    }
    else {
        /** @type {?} */
        const children = mapChildrenIntoArray(segment, (v, k) => {
            if (k === PRIMARY_OUTLET) {
                return [serializeSegment(segment.children[PRIMARY_OUTLET], false)];
            }
            return [`${k}:${serializeSegment(v, false)}`];
        });
        return `${serializePaths(segment)}/(${children.join('//')})`;
    }
}
/**
 * Encodes a URI string with the default encoding. This function will only ever be called from
 * `encodeUriQuery` or `encodeUriSegment` as it's the base set of encodings to be used. We need
 * a custom encoding because encodeURIComponent is too aggressive and encodes stuff that doesn't
 * have to be encoded per https://url.spec.whatwg.org.
 * @param {?} s
 * @return {?}
 */
function encodeUriString(s) {
    return encodeURIComponent(s)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',');
}
/**
 * This function should be used to encode both keys and values in a query string key/value. In
 * the following URL, you need to call encodeUriQuery on "k" and "v":
 *
 * http://www.site.org/html;mk=mv?k=v#f
 * @param {?} s
 * @return {?}
 */
export function encodeUriQuery(s) {
    return encodeUriString(s).replace(/%3B/gi, ';');
}
/**
 * This function should be used to encode a URL fragment. In the following URL, you need to call
 * encodeUriFragment on "f":
 *
 * http://www.site.org/html;mk=mv?k=v#f
 * @param {?} s
 * @return {?}
 */
export function encodeUriFragment(s) {
    return encodeURI(s);
}
/**
 * This function should be run on any URI segment as well as the key and value in a key/value
 * pair for matrix params. In the following URL, you need to call encodeUriSegment on "html",
 * "mk", and "mv":
 *
 * http://www.site.org/html;mk=mv?k=v#f
 * @param {?} s
 * @return {?}
 */
export function encodeUriSegment(s) {
    return encodeUriString(s).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
}
/**
 * @param {?} s
 * @return {?}
 */
export function decode(s) {
    return decodeURIComponent(s);
}
/**
 * @param {?} s
 * @return {?}
 */
export function decodeQuery(s) {
    return decode(s.replace(/\+/g, '%20'));
}
/**
 * @param {?} path
 * @return {?}
 */
export function serializePath(path) {
    return `${encodeUriSegment(path.path)}${serializeMatrixParams(path.parameters)}`;
}
/**
 * @param {?} params
 * @return {?}
 */
function serializeMatrixParams(params) {
    return Object.keys(params)
        .map(key => `;${encodeUriSegment(key)}=${encodeUriSegment(params[key])}`)
        .join('');
}
/**
 * @param {?} params
 * @return {?}
 */
function serializeQueryParams(params) {
    /** @type {?} */
    const strParams = Object.keys(params).map((name) => {
        /** @type {?} */
        const value = params[name];
        return Array.isArray(value) ?
            value.map(v => `${encodeUriQuery(name)}=${encodeUriQuery(v)}`).join('&') :
            `${encodeUriQuery(name)}=${encodeUriQuery(value)}`;
    });
    return strParams.length ? `?${strParams.join("&")}` : '';
}
/** @type {?} */
const SEGMENT_RE = /^[^\/()?;=#]+/;
/**
 * @param {?} str
 * @return {?}
 */
function matchSegments(str) {
    /** @type {?} */
    const match = str.match(SEGMENT_RE);
    return match ? match[0] : '';
}
/** @type {?} */
const QUERY_PARAM_RE = /^[^=?&#]+/;
/**
 * @param {?} str
 * @return {?}
 */
function matchQueryParams(str) {
    /** @type {?} */
    const match = str.match(QUERY_PARAM_RE);
    return match ? match[0] : '';
}
/** @type {?} */
const QUERY_PARAM_VALUE_RE = /^[^?&#]+/;
/**
 * @param {?} str
 * @return {?}
 */
function matchUrlQueryParamValue(str) {
    /** @type {?} */
    const match = str.match(QUERY_PARAM_VALUE_RE);
    return match ? match[0] : '';
}
class UrlParser {
    /**
     * @param {?} url
     */
    constructor(url) {
        this.url = url;
        this.remaining = url;
    }
    /**
     * @return {?}
     */
    parseRootSegment() {
        this.consumeOptional('/');
        if (this.remaining === '' || this.peekStartsWith('?') || this.peekStartsWith('#')) {
            return new UrlSegmentGroup([], {});
        }
        // The root segment group never has segments
        return new UrlSegmentGroup([], this.parseChildren());
    }
    /**
     * @return {?}
     */
    parseQueryParams() {
        /** @type {?} */
        const params = {};
        if (this.consumeOptional('?')) {
            do {
                this.parseQueryParam(params);
            } while (this.consumeOptional('&'));
        }
        return params;
    }
    /**
     * @return {?}
     */
    parseFragment() {
        return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
    }
    /**
     * @return {?}
     */
    parseChildren() {
        if (this.remaining === '') {
            return {};
        }
        this.consumeOptional('/');
        /** @type {?} */
        const segments = [];
        if (!this.peekStartsWith('(')) {
            segments.push(this.parseSegment());
        }
        while (this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(')) {
            this.capture('/');
            segments.push(this.parseSegment());
        }
        /** @type {?} */
        let children = {};
        if (this.peekStartsWith('/(')) {
            this.capture('/');
            children = this.parseParens(true);
        }
        /** @type {?} */
        let res = {};
        if (this.peekStartsWith('(')) {
            res = this.parseParens(false);
        }
        if (segments.length > 0 || Object.keys(children).length > 0) {
            res[PRIMARY_OUTLET] = new UrlSegmentGroup(segments, children);
        }
        return res;
    }
    /**
     * @return {?}
     */
    parseSegment() {
        /** @type {?} */
        const path = matchSegments(this.remaining);
        if (path === '' && this.peekStartsWith(';')) {
            throw new Error(`Empty path url segment cannot have parameters: '${this.remaining}'.`);
        }
        this.capture(path);
        return new UrlSegment(decode(path), this.parseMatrixParams());
    }
    /**
     * @return {?}
     */
    parseMatrixParams() {
        /** @type {?} */
        const params = {};
        while (this.consumeOptional(';')) {
            this.parseParam(params);
        }
        return params;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    parseParam(params) {
        /** @type {?} */
        const key = matchSegments(this.remaining);
        if (!key) {
            return;
        }
        this.capture(key);
        /** @type {?} */
        let value = '';
        if (this.consumeOptional('=')) {
            /** @type {?} */
            const valueMatch = matchSegments(this.remaining);
            if (valueMatch) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[decode(key)] = decode(value);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    parseQueryParam(params) {
        /** @type {?} */
        const key = matchQueryParams(this.remaining);
        if (!key) {
            return;
        }
        this.capture(key);
        /** @type {?} */
        let value = '';
        if (this.consumeOptional('=')) {
            /** @type {?} */
            const valueMatch = matchUrlQueryParamValue(this.remaining);
            if (valueMatch) {
                value = valueMatch;
                this.capture(value);
            }
        }
        /** @type {?} */
        const decodedKey = decodeQuery(key);
        /** @type {?} */
        const decodedVal = decodeQuery(value);
        if (params.hasOwnProperty(decodedKey)) {
            /** @type {?} */
            let currentVal = params[decodedKey];
            if (!Array.isArray(currentVal)) {
                currentVal = [currentVal];
                params[decodedKey] = currentVal;
            }
            currentVal.push(decodedVal);
        }
        else {
            // Create a new value
            params[decodedKey] = decodedVal;
        }
    }
    /**
     * @param {?} allowPrimary
     * @return {?}
     */
    parseParens(allowPrimary) {
        /** @type {?} */
        const segments = {};
        this.capture('(');
        while (!this.consumeOptional(')') && this.remaining.length > 0) {
            /** @type {?} */
            const path = matchSegments(this.remaining);
            /** @type {?} */
            const next = this.remaining[path.length];
            // if is is not one of these characters, then the segment was unescaped
            // or the group was not closed
            if (next !== '/' && next !== ')' && next !== ';') {
                throw new Error(`Cannot parse url '${this.url}'`);
            }
            /** @type {?} */
            let outletName = /** @type {?} */ ((undefined));
            if (path.indexOf(':') > -1) {
                outletName = path.substr(0, path.indexOf(':'));
                this.capture(outletName);
                this.capture(':');
            }
            else if (allowPrimary) {
                outletName = PRIMARY_OUTLET;
            }
            /** @type {?} */
            const children = this.parseChildren();
            segments[outletName] = Object.keys(children).length === 1 ? children[PRIMARY_OUTLET] :
                new UrlSegmentGroup([], children);
            this.consumeOptional('//');
        }
        return segments;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    peekStartsWith(str) { return this.remaining.startsWith(str); }
    /**
     * @param {?} str
     * @return {?}
     */
    consumeOptional(str) {
        if (this.peekStartsWith(str)) {
            this.remaining = this.remaining.substring(str.length);
            return true;
        }
        return false;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    capture(str) {
        if (!this.consumeOptional(str)) {
            throw new Error(`Expected "${str}".`);
        }
    }
}
if (false) {
    /** @type {?} */
    UrlParser.prototype.remaining;
    /** @type {?} */
    UrlParser.prototype.url;
}
//# sourceMappingURL=url_tree.js.map