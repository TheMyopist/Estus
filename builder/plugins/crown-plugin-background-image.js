module.exports = function(e) {
    function t(i) {
        if (n[i]) return n[i].exports;
        var o = n[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function o(e) {
        var t = f.getDataByKey("novi-plugin-background-image");
        return e.ui.editor[0].title = t.editor.title, e.ui.editor[0].tooltip = t.editor.tooltip, e
    }
    var r = n(1),
        a = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t
        }(r),
        u = n(2),
        s = i(u),
        l = n(3),
        c = i(l),
        g = novi.react.React,
        f = novi.language,
        p = {
            name: "crown-plugin-background-image",
            title: "Crown Background Image",
            description: "Crown Background Image description",
            version: "1.1.0",
            dependencies: {
                novi: "0.9.0"
            },
            defaults: {
                querySelector: '.bg-img,.bg-section',
                childQuerySelector: ''
            },
            ui: {
                editor: [s.default],
                settings: g.createElement(c.default, null)
            },
            excerpt: a.validBgImage,
            onLanguageChange: o
        };
    novi.plugins.register(p)
}, function(e, t) {
    "use strict";

    function n(e) {
        return !!e && (!e.style.backgroundImage || !i(e))
    }

    function i(e) {
        var t = void 0,
            n = void 0;
        return t = novi.element.getInlineStyle(e, "backgroundImage"), n = e.style.backgroundImage, t !== n && n.indexOf(t) > -1
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.validBgImage = n
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = e.offsetWidth / e.offsetHeight;
        novi.media.choose({
            onSubmit: i.bind(this, e),
            ratio: t,
            type: r.mediaImage
        })
    }

    function i(e, t) {
        var n = t.replace(/['|"]/g, "");
        novi.element.setInlineStyle(e, "backgroundImage", "url(" + n + ")"), e.style.backgroundImage = "url(" + n + ")"
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = (novi.react.React, novi.ui.icons),
        r = novi.types,
        a = {
            trigger: o.ICON_BG_IMAGE,
            tooltip: "Replace Image",
            closeIcon: "submit",
            title: "Replace Image",
            onTriggerClick: n
        };
    t.default = a
}, function(e, t) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
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
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        a = novi.react.React,
        u = novi.react.Component,
        s = novi.ui.input,
        l = novi.ui.button,
        c = novi.language,
        g = function(e) {
            function t(e) {
                n(this, t);
                var o = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                return o.state = {
                    settings: e.settings
                }, o.saveSettings = o.saveSettings.bind(o), o.onChange = o.onChange.bind(o), o.messages = c.getDataByKey("novi-plugin-background-image"), o
            }
            return o(t, e), r(t, [{
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
                    }, "Background Image Plugin"), a.createElement("div", {
                        style: {
                            fontSize: 13,
                            color: "#6E778A",
                            marginTop: 21
                        }
                    }, this.messages.settings.inputPlaceholder), a.createElement(s, {
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
                    }, a.createElement(l, {
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
                    this.setState({
                        settings: {
                            querySelector: e.target.value
                        }
                    })
                }
            }, {
                key: "saveSettings",
                value: function() {
                    novi.plugins.settings.update("novi-plugin-background-image", this.state.settings)
                }
            }]), t
        }(u);
    t.default = g
}]);