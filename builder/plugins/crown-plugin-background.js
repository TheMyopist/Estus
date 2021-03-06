module.exports = function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var r = n[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function r(e) {
        var t = c.getDataByKey("crown-plugin-background");
        return e.ui.editor[0].title = t.editor.title, e.ui.editor[0].tooltip = t.editor.tooltip, e
    }
    var i = n(1),
        a = o(i),
        l = n(8),
        u = o(l),
        s = novi.react.React,
        c = novi.language,
        d = {
            name: "crown-plugin-background",
            title: "Crown Background",
            description: "Crown Background description",
            version: "1.0.2",
            dependencies: {
                novi: "0.8.6"
            },
            defaults: {
                querySelector: ".bg-section"
            },
            ui: {
                editor: [a.default],
                settings: s.createElement(u.default, null)
            },
            onLanguageChange: r
        };
    novi.plugins.register(d)
}, function(e, t, n) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function r(e, t) {
        var n = t[0],
            o = !0;
        switch (n.type !== n.initData.type && (o = !1), n.type) {
            case f.default.COLOR:
                o && n.color !== n.initData.color && (o = !1), o || (novi.element.setInlineStyle(n.element, "background-color", n.color), n.element.style.backgroundColor = n.color, "none" !== window.getComputedStyle(n.element).backgroundImage && (novi.element.setInlineStyle(n.element, "background-image", "none"), n.element.style.backgroundImage = "none"));
                break;
            case f.default.GRADIENT:
                o && !h.isEqual(n.gradient, n.initData.gradient) && (o = !1), o || (novi.element.setInlineStyle(n.element, "background-image", n.gradient.original), n.element.style.backgroundImage = n.gradient.original)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(2),
        a = o(i),
        l = n(6),
        u = o(l),
        s = n(7),
        c = o(s),
        d = n(3),
        f = o(d),
        p = n(4),
        g = (o(p), novi.language),
        y = g.getDataByKey("crown-plugin-background"),
        v = novi.react.React,
        h = novi.utils.lodash,
        b = {
            trigger: v.createElement(a.default, null),
            header: [v.createElement(u.default, null)],
            body: [v.createElement(c.default, null)],
            tooltip: y.editor.tooltip,
            closeIcon: "submit",
            title: y.editor.title,
            width: 324,
            height: 169,
            onSubmit: r,
            submitOnBlur: !1
        };
    t.default = b
}, function(e, t, n) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(),
        u = n(3),
        s = o(u),
        c = n(4),
        d = o(c),
        f = n(5),
        p = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t
        }(f),
        g = novi.react.React,
        y = novi.react.Component,
        v = novi.ui.colorSwatch,
        h = function(e) {
            function t(e) {
                r(this, t);
                var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)),
                    o = e.element,
                    a = window.getComputedStyle(o, null),
                    l = void 0,
                    u = void 0,
                    c = null;
                if (l = s.default.COLOR, u = a.backgroundColor, "none" !== a.backgroundImage)
                    if (c = p.parseGradient(a.backgroundImage)) {
                        l = s.default.GRADIENT;
                        for (var f = 0; f < c.colorStopList.length; f++) c.colorStopList[f].position && c.colorStopList[f].position.indexOf("px") > -1 && (c.colorStopList[f].position = Math.round(parseInt(c.colorStopList[f].position.replace("px", "")) / o.offsetWidth * 100) + "%");
                        u = a.backgroundImage, d.default.setGradient(c), d.default.setGradientString(a.backgroundImage), d.default.setColor(null)
                    } else d.default.setGradient(null), d.default.setGradientString(null);
                else if ("rgba(0, 0, 0, 0)" === u)
                    for (var g = o, y = void 0; g && novi.utils.dom.isElementNode(g);) {
                        if (novi.element.hasStaticReference(g) && (y = window.getComputedStyle(g, null), "rgba(0, 0, 0, 0)" !== y.backgroundColor)) {
                            u = y.backgroundColor;
                            break
                        }
                        g = g.parentNode
                    }
                return d.default.setType(l), l === s.default.COLOR && (d.default.setColor(u), d.default.setGradient(null), d.default.setGradientString(null)), n.state = {
                    color: u
                }, n
            }
            return a(t, e), l(t, [{
                key: "render",
                value: function() {
                    return g.createElement("div", null, g.createElement(v, {
                        color: this.state.color
                    }))
                }
            }]), t
        }(y);
    t.default = h
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = {
        COLOR: "color",
        GRADIENT: "gradient"
    }
}, function(e, t, n) {
    "use strict";

    function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(),
        i = n(3),
        a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i),
        l = function() {
            function e() {
                o(this, e), this.type = a.default.COLOR, this.color = null, this.gradient = null, this.gradientString = null
            }
            return r(e, [{
                key: "getColor",
                value: function() {
                    return this.color
                }
            }, {
                key: "setColor",
                value: function(e) {
                    this.color = e
                }
            }, {
                key: "getType",
                value: function() {
                    return this.type
                }
            }, {
                key: "setType",
                value: function(e) {
                    this.type = e
                }
            }, {
                key: "getGradientString",
                value: function() {
                    return this.gradientString
                }
            }, {
                key: "setGradientString",
                value: function(e) {
                    this.gradientString = e
                }
            }, {
                key: "setGradient",
                value: function(e) {
                    this.gradient = e
                }
            }, {
                key: "getGradient",
                value: function() {
                    return this.gradient
                }
            }]), e
        }(),
        u = new l;
    t.default = u
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = r(),
            n = /.*gradient\s*\(((?:\([^\)]*\)|[^\)\(]*)*)\)/,
            o = n.exec(e);
        return null !== o && i(t, o[1])
    }

    function o(e, t) {
        var n = void 0,
            o = "";
        for (n = 0; n < e.length; n++) "string" == typeof e[n] ? o += e[n] : o += e[n].source;
        return new RegExp(o, t)
    }

    function r() {
        var e = /(?:[+-]?\d*\.?\d+)(?:deg|grad|rad|turn)/,
            t = /to\s+((?:(?:left|right)(?:\s+(?:top|bottom))?)|(?:top|bottom))/,
            n = /\s*,\s*/,
            r = /\#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
            i = /\(\s*(?:[0-9]{1,3}\s*,\s*){2}[0-9]{1,3}\s*\)/,
            a = /\(\s*(?:[0-9]{1,3}\s*,\s*){3}(?:0|0?.[0-9]+)\s*\)/,
            l = /(?:[+-]?\d*\.?\d+)(?:%|[a-z]+)?/,
            u = /[_A-Za-z-][_A-Za-z0-9-]*/,
            s = o(["(?:", r, "|", "(?:rgb|hsl)", i, "|", "(?:rgba|hsla)", a, "|", u, ")"], ""),
            c = o([s, "(?:\\s+", l, ")?"], ""),
            d = o(["(?:", c, n, ")*", c], "");
        return {
            gradientSearch: o(["(", o(["(?:(", e, ")|", t, ")?"], ""), ")", n, "(", d, ")"], "gi"),
            colorStopSearch: o(["\\s*(", s, ")", "(?:\\s+", "(", l, "))?", "(?:", n, "\\s*)?"], "gi")
        }
    }

    function i(e, t) {
        var n = void 0,
            o = void 0,
            r = void 0,
            i = void 0,
            a = void 0;
        if (null !== (o = e.gradientSearch.exec(t)))
            for (n = {
                    original: o[0],
                    colorStopList: []
                }, o[2] && (n.angle = o[2]), o[3] && (n.sideCorner = o[3]), n.sideCorner || n.angle ? (o[1] && (n.line = o[1]), a = o[4]) : (a = t, n.original = t), r = e.colorStopSearch.exec(a); null !== r;) i = {
                color: r[1]
            }, r[2] && (i.position = r[2]), n.colorStopList.push(i), r = e.colorStopSearch.exec(a);
        return n
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.parseGradient = n
}, function(e, t, n) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(),
        u = n(4),
        s = o(u),
        c = n(3),
        d = o(c),
        f = novi.react.React,
        p = novi.react.Component,
        g = novi.ui.colorSwatch,
        y = novi.language,
        v = function(e) {
            function t(e) {
                r(this, t);
                var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)),
                    o = s.default.getType();
                return n.state = {
                    value: o === d.default.COLOR ? s.default.getColor() : s.default.getGradientString()
                }, n.messages = y.getDataByKey("crown-plugin-background"), n
            }
            return a(t, e), l(t, [{
                key: "render",
                value: function() {
                    return f.createElement("div", {
                        style: {
                            display: "flex"
                        }
                    }, f.createElement(g, {
                        color: this.state.value
                    }), f.createElement("span", null, this.messages.editor.header))
                }
            }]), t
        }(p);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(),
        u = n(4),
        s = o(u),
        c = n(3),
        d = o(c),
        f = novi.react.React,
        p = novi.react.Component,
        g = novi.ui.toolColor,
        y = novi.ui.radioGroup,
        v = novi.ui.toolGradient,
        h = novi.language,
        b = function(e) {
            function t(e) {
                r(this, t);
                var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)),
                    o = s.default.getGradient() || {
                        angle: 45,
                        colorStopList: [{
                            color: "#0fa4f7"
                        }, {
                            color: "#01edf7"
                        }],
                        original: "linear-gradient(45deg, #0fa4f7, #01edf7)"
                    },
                    a = s.default.getColor() || "#109DF7",
                    l = s.default.getType();
                return l === d.default.GRADIENT && novi.editor.setBodyHeight(274), n.state = {
                    type: l,
                    gradient: o,
                    color: a,
                    initData: {
                        type: l,
                        gradient: o,
                        color: a
                    },
                    element: e.element
                }, n.messages = h.getDataByKey("crown-plugin-background"), n.renderColorFields = n.renderColorFields.bind(n), n.renderGradientFields = n.renderGradientFields.bind(n), n.onTypeChange = n.onTypeChange.bind(n), n.onGradientChange = n.onGradientChange.bind(n), n.onColorChange = n.onColorChange.bind(n), n.options = [{
                    label: n.messages.editor.body.colorOption,
                    value: "color"
                }, {
                    label: n.messages.editor.body.gradientOption,
                    value: "gradient"
                }], n.style = "\n            .novi-background-wrap{\n                padding: 16px 12px 0;\n                display: flex;\n                flex-direction: column;\n                color: #6E778A;\n                box-sizing: border-box;\n            }\n            .novi-gradient-tool-wrap{\n                -webkit-animation: fadeIn 0.3s forwards;\n                animation: fadeIn 0.3s forwards;\n            }\n            \n            @-webkit-keyframes fadeIn {\n                from {opacity: 0;}\n                to {opacity: 1;}\n            } \n            \n            @keyframes fadeIn {\n            from {opacity: 0;}\n                to {opacity: 1;}\n            }\n            \n            \n        ", n.updateType = !1, n
            }
            return a(t, e), l(t, [{
                key: "componentDidUpdate",
                value: function() {
                    this.updateType && (novi.editor.setBodyHeight(this.state.type === d.default.GRADIENT ? 274 : 169), this.updateType = !1)
                }
            }, {
                key: "renderColorFields",
                value: function() {
                    return this.state.type === d.default.GRADIENT ? null : f.createElement("div", null, f.createElement("p", {
                        className: "novi-label",
                        style: {
                            margin: "20px 0 0 5px"
                        }
                    }, this.messages.editor.body.colorPlaceholder), f.createElement(g, {
                        onChange: this.onColorChange,
                        value: this.state.color
                    }))
                }
            }, {
                key: "renderGradientFields",
                value: function() {
                    return this.state.type !== d.default.GRADIENT ? null : f.createElement("div", {
                        style: {
                            marginTop: 20
                        },
                        className: "novi-gradient-tool-wrap"
                    }, f.createElement(v, {
                        value: this.state.gradient,
                        onChange: this.onGradientChange,
                        width: 290,
                        height: 110
                    }))
                }
            }, {
                key: "onGradientChange",
                value: function(e) {
                    s.default.setColor(e.original), s.default.setGradient(e), s.default.setGradientString(e.original), this.setState({
                        gradient: e
                    })
                }
            }, {
                key: "render",
                value: function() {
                    return f.createElement("div", {
                        className: "novi-background-wrap"
                    }, f.createElement("style", null, this.style), f.createElement("p", {
                        className: "novi-label",
                        style: {
                            marginTop: 0,
                            marginLeft: 5
                        }
                    }, this.messages.editor.body.bgFillType), f.createElement(y, {
                        options: this.options,
                        value: this.state.type,
                        onChange: this.onTypeChange
                    }), this.renderColorFields(), this.renderGradientFields())
                }
            }, {
                key: "onColorChange",
                value: function(e) {
                    s.default.setColor(e), this.setState({
                        color: e
                    })
                }
            }, {
                key: "onTypeChange",
                value: function(e) {
                    this.updateType = !0, this.setState({
                        type: e
                    })
                }
            }]), t
        }(p);
    t.default = b
}, function(e, t) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function r(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(),
        a = novi.react.React,
        l = novi.react.Component,
        u = novi.ui.input,
        s = novi.ui.button,
        c = novi.language,
        d = function(e) {
            function t(e) {
                n(this, t);
                var r = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                return r.state = {
                    settings: e.settings
                }, r.saveSettings = r.saveSettings.bind(r), r.onChange = r.onChange.bind(r), r.messages = c.getDataByKey("crown-plugin-background"), r
            }
            return r(t, e), i(t, [{
                key: "componentWillReceiveProps",
                value: function(e) {
                    this.setState({
                        settings: e.settings
                    })
                }
            }, {
                key: "render",
                value: function() {
                    return a.createElement("div", null, a.createElement("span", {
                        style: {
                            letterSpacing: "0,0462em"
                        }
                    }, "Background Plugin"), a.createElement("div", {
                        style: {
                            fontSize: 13,
                            color: "#6E778A",
                            marginTop: 21
                        }
                    }, this.messages.settings.inputPlaceholder), a.createElement(u, {
                        style: {
                            marginTop: 10,
                            width: 340
                        },
                        value: this.state.settings.querySelector,
                        onChange: this.onChange
                    }), a.createElement("div", {
                        style: {
                            marginTop: 30
                        }
                    }, a.createElement(s, {
                        type: "primary",
                        messages: {
                            textContent: this.messages.settings.submitButton
                        },
                        onClick: this.saveSettings
                    })))
                }
            }, {
                key: "onChange",
                value: function(e) {
                    var t = e.target.value;
                    this.setState({
                        settings: {
                            querySelector: t
                        }
                    })
                }
            }, {
                key: "saveSettings",
                value: function() {
                    novi.plugins.settings.update("crown-plugin-background", this.state.settings)
                }
            }]), t
        }(l);
    t.default = d
}]);