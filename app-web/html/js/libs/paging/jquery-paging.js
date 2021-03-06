/**
 * Created by Tami on 31/05/2016.
 */
/*
 jQuery paging plugin v1.3.0 23/06/2014
 http://www.xarg.org/2011/09/jquery-pagination-revised/

 Copyright (c) 2011, Robert Eisele (robert@xarg.org)
 Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function (n, v, r) {
    n.fn.paging = function (z, A) {
        var t = this, b = {
            setOptions: function (a) {
                b.a = n.extend(b.a || {
                        lapping: 0,
                        perpage: 10,
                        page: 1,
                        refresh: {interval: 10, url: null},
                        format: "",
                        lock: !1,
                        circular: !1,
                        onClick: null,
                        onFormat: function () {
                        },
                        onSelect: function () {
                            return !0
                        },
                        onRefresh: function () {
                        }
                    }, a || {});
                b.a.lapping |= 0;
                b.a.perpage |= 0;
                null !== b.a.page && (b.a.page |= 0);
                1 > b.a.perpage && (b.a.perpage = 10);
                b.interval && v.clearInterval(b.interval);
                b.a.refresh.url && (b.interval = v.setInterval(function () {
                    n.ajax({
                        url: b.a.refresh.url, success: function (a) {
                            if ("string" === typeof a)try {
                                a = n.parseJSON(a)
                            } catch (m) {
                                return
                            }
                            b.a.onRefresh(a)
                        }
                    })
                }, 1E3 * b.a.refresh.interval));
                b.format = function (a) {
                    for (var b = 0, f = 0, h = 1, g = {
                        g: [],
                        i: 0,
                        h: 0,
                        b: 5,
                        current: 3,
                        l: 0,
                        m: 0
                    }, c, p = /[*<>pq\[\]().-]|[nc]+!?/g, n = {
                        "[": "first",
                        "]": "last",
                        "<": "prev",
                        ">": "next",
                        q: "left",
                        p: "right",
                        "-": "fill",
                        ".": "leap"
                    }, e = {}; c = p.exec(a);)c = "" + c, r === n[c] ? "(" === c ? f = ++b : ")" === c ? f = 0 : h && ("*" === c ? (g.i = 1, g.h = 0) : (g.i = 0, g.h = "!" === c.charAt(c.length - 1), g.b = c.length - g.h, (g.current = 1 + c.indexOf("c")) || (g.current = 1 + g.b >> 1)), g.g.push({
                        f: "block",
                        j: 0, c: 0
                    }), h = 0) : (g.g.push({
                        f: n[c],
                        j: f,
                        c: r === e[c] ? e[c] = 1 : ++e[c]
                    }), "q" === c ? ++g.m : "p" === c && ++g.l);
                    return g
                }(b.a.format);
                return b
            }, setNumber: function (a) {
                b.s = r === a || 0 > a ? -1 : a;
                return b
            }, setPage: function (a) {
                function w(a, b, c) {
                    c = "" + a.onFormat.call(b, c);
                    p = b.value ? p + c.replace(/<a/i, '<a data-page="' + b.value + '"') : p + c
                }

                if (b.a.lock)return b.a.onSelect(0, t), b;
                if (r === a) {
                    if (a = b.a.page, null === a)return b
                } else if (b.a.page == a)return b;
                b.a.page = a |= 0;
                var m = b.s, f = b.a, h, g, c, p, x = 1, e = b.format, d, k, l, q, y = e.g.length, u = y;
                f.perpage <=
                f.lapping && (f.lapping = f.perpage - 1);
                q = m <= f.lapping ? 0 : f.lapping | 0;
                0 > m ? (c = m = -1, h = Math.max(1, a - e.current + 1 - q), g = h + e.b) : (c = 1 + Math.ceil((m - f.perpage) / (f.perpage - q)), a = Math.max(1, Math.min(0 > a ? 1 + c + a : a, c)), e.i ? (h = 1, g = 1 + c, e.current = a, e.b = c) : (h = Math.max(1, Math.min(a - e.current, c - e.b) + 1), g = e.h ? h + e.b : Math.min(h + e.b, 1 + c)));
                for (; u--;) {
                    k = 0;
                    l = e.g[u];
                    switch (l.f) {
                        case "left":
                            k = l.c < h;
                            break;
                        case "right":
                            k = g <= c - e.l + l.c;
                            break;
                        case "first":
                            k = e.current < a;
                            break;
                        case "last":
                            k = e.b < e.current + c - a;
                            break;
                        case "prev":
                            k = 1 < a;
                            break;
                        case "next":
                            k = a < c
                    }
                    x |= k << l.j
                }
                d = {
                    number: m,
                    lapping: q,
                    pages: c,
                    perpage: f.perpage,
                    page: a,
                    slice: [(k = a * (f.perpage - q) + q) - f.perpage, Math.min(k, m)]
                };
                for (p = ""; ++u < y;) {
                    l = e.g[u];
                    k = x >> l.j & 1;
                    switch (l.f) {
                        case "block":
                            for (; h < g; ++h)d.value = h, d.pos = 1 + e.b - g + h, d.active = h <= c || 0 > m, d.first = 1 === h, d.last = h === c && 0 < m, w(f, d, l.f);
                            continue;
                        case "left":
                            d.value = l.c;
                            d.active = l.c < h;
                            break;
                        case "right":
                            d.value = c - e.l + l.c;
                            d.active = g <= d.value;
                            break;
                        case "first":
                            d.value = 1;
                            d.active = k && 1 < a;
                            break;
                        case "prev":
                            (d.active = f.circular) ? d.value = 1 ===
                            a ? c : a - 1 : (d.value = Math.max(1, a - 1), d.active = k && 1 < a);
                            break;
                        case "last":
                            (d.active = 0 > m) ? d.value = 1 + a : (d.value = c, d.active = k && a < c);
                            break;
                        case "next":
                            (d.active = f.circular) ? d.value = 1 + a % c : (d.active = 0 > m) ? d.value = 1 + a : (d.value = Math.min(1 + a, c), d.active = k && a < c);
                            break;
                        case "leap":
                        case "fill":
                            d.pos = l.c;
                            d.active = k;
                            w(f, d, l.f);
                            continue
                    }
                    d.pos = l.c;
                    d.last = d.first = r;
                    w(f, d, l.f)
                }
                t.length && (n("a", t.html(p)).click(f.onClick || function (a) {
                        a.preventDefault();
                        a = this;
                        do if ("a" === a.nodeName.toLowerCase())break; while (a = a.parentNode);
                        b.setPage(n(a).data("page"));
                        b.o && (v.location = a.href)
                    }), b.o = f.onSelect.call({number: m, lapping: q, pages: c, slice: d.slice}, a, t));
                return b
            }
        };
        return b.setNumber(z).setOptions(A).setPage()
    }
})(jQuery, this);