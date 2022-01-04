var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { h, defineComponent, shallowReactive, } from 'vue';
function normalizeLayout(layout) {
    if (typeof layout === 'string') {
        return {
            name: layout,
            props: {},
        };
    }
    if (layout && typeof layout === 'object' && 'name' in layout) {
        return {
            name: layout.name,
            props: (layout === null || layout === void 0 ? void 0 : layout.props) || {},
        };
    }
    throw new Error("[vue-router-layout] Incorrect value for the 'layout' property.");
}
/**
 * Find which layout the component should render.
 * If the component is not specified layout name, `default` is used.
 * Otherwise return undefined.
 */
function resolveLayout(matched) {
    var last = matched[matched.length - 1];
    if (!last) {
        return;
    }
    var Component = last.components.default;
    if (!Component) {
        return;
    }
    var isAsync = typeof Component === 'function' && !Component.options;
    if (isAsync) {
        return;
    }
    var defaultLayout = { name: 'default', props: {} };
    return getLayout(Component) || defaultLayout;
}
function getLayout(Component /* ComponentOptions | VueConstructor */) {
    var isCtor = typeof Component === 'function' && Component.options;
    var options = isCtor ? Component.options : Component;
    if (options.layout) {
        return normalizeLayout(options.layout);
    }
    // Retrieve super component and mixins
    var mixins = (options.mixins || []).slice().reverse();
    var extend = options.extends || [];
    for (var _i = 0, _a = mixins.concat(extend); _i < _a.length; _i++) {
        var c = _a[_i];
        var layout = getLayout(c);
        if (layout) {
            return layout;
        }
    }
}
function loadAsyncComponents(route) {
    var promises = [];
    route.matched.forEach(function (record) {
        Object.keys(record.components).forEach(function (key) {
            var component = record.components[key];
            var isAsync = typeof component === 'function' && !component.options;
            if (isAsync) {
                promises.push(component().then(function (loaded) {
                    record.components[key] = normalizeEsModuleComponent(loaded);
                }));
            }
        });
    });
    return Promise.all(promises);
}
function normalizeEsModuleComponent(comp) {
    var c = comp;
    var isEsModule = c.__esModule ||
        (typeof Symbol !== 'undefined' && c[Symbol.toStringTag] === 'Module');
    return isEsModule ? c.default : c;
}
function install() {
    console.info('[vue-router-layout] app.use(VueRouterLayout) is no longer needed. You can safely remove it.');
}
export function createRouterLayout(resolve) {
    return defineComponent({
        name: 'RouterLayout',
        data: function () {
            return {
                layout: undefined,
                layouts: shallowReactive(Object.create(null)),
            };
        },
        beforeRouteEnter: function (to, _from, next) {
            return __awaiter(this, void 0, void 0, function () {
                var layout, layoutComp, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, loadAsyncComponents(to)];
                        case 1:
                            _c.sent();
                            layout = resolveLayout(to.matched);
                            if (!layout) return [3 /*break*/, 3];
                            _b = normalizeEsModuleComponent;
                            return [4 /*yield*/, resolve(layout.name)];
                        case 2:
                            _a = _b.apply(void 0, [_c.sent()]);
                            return [3 /*break*/, 4];
                        case 3:
                            _a = undefined;
                            _c.label = 4;
                        case 4:
                            layoutComp = _a;
                            next(function (vm) {
                                vm.layout = layout;
                                if (layout && layoutComp) {
                                    vm.layouts[layout.name] = layoutComp;
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        beforeRouteUpdate: function (to, _from, next) {
            return __awaiter(this, void 0, void 0, function () {
                var layout, _a, _b, _c, error_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, loadAsyncComponents(to)];
                        case 1:
                            _d.sent();
                            layout = resolveLayout(to.matched) || this.layout;
                            if (!(layout && !this.layouts[layout.name])) return [3 /*break*/, 3];
                            _a = this.layouts;
                            _b = layout.name;
                            _c = normalizeEsModuleComponent;
                            return [4 /*yield*/, resolve(layout.name)];
                        case 2:
                            _a[_b] = _c.apply(void 0, [_d.sent()]);
                            _d.label = 3;
                        case 3:
                            this.layout = layout;
                            next();
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _d.sent();
                            next(error_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        render: function () {
            var _a;
            var layoutComponent = this.layout && this.layouts[this.layout.name];
            var currentLayout = resolveLayout(this.$route.matched);
            if (!layoutComponent ||
                (currentLayout && ((_a = this.layout) === null || _a === void 0 ? void 0 : _a.name) !== currentLayout.name)) {
                return null;
            }
            return h(layoutComponent, __assign({ key: this.layout.name }, this.layout.props));
        },
    });
}
export default {
    install: install,
};
