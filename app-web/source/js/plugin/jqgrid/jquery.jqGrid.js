/* 
 * jqGrid  4.5.4 - jQuery Grid 
 * Copyright (c) 2008, Tony Tomov, tony@trirand.com 
 * Dual licensed under the MIT and GPL licenses 
 * http://www.opensource.org/licenses/mit-license.php 
 * http://www.gnu.org/licenses/gpl-2.0.html 
 * Date:2013-10-06 
 * Modules: grid.base.js; jquery.fmatter.js; grid.custom.js; grid.common.js; grid.formedit.js; grid.filter.js; grid.inlinedit.js; grid.celledit.js; jqModal.js; jqDnR.js; grid.subgrid.js; grid.grouping.js; grid.treegrid.js; grid.import.js; JsonXml.js; grid.tbltogrid.js; grid.jqueryui.js; 
 */
(function (b) {
    b.jgrid = b.jgrid || {};
    b.extend(b.jgrid, {
        version: "4.5.3", htmlDecode: function (b) {
            return b && ("&nbsp;" === b || "&#160;" === b || 1 === b.length && 160 === b.charCodeAt(0)) ? "" : !b ? b : ("" + b).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
        }, htmlEncode: function (b) {
            return !b ? b : ("" + b).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }, format: function (d) {
            var g = b.makeArray(arguments).slice(1);
            null == d && (d = "");
            return d.replace(/\{(\d+)\}/g,
                function (b, e) {
                    return g[e]
                })
        }, msie: "Microsoft Internet Explorer" === navigator.appName, msiever: function () {
            var b = -1;
            null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (b = parseFloat(RegExp.$1));
            return b
        }, getCellIndex: function (d) {
            d = b(d);
            if (d.is("tr"))return -1;
            d = (!d.is("td") && !d.is("th") ? d.closest("td,th") : d)[0];
            return b.jgrid.msie ? b.inArray(d, d.parentNode.cells) : d.cellIndex
        }, stripHtml: function (b) {
            var b = "" + b, g = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
            return b ? (b = b.replace(g, "")) && "&nbsp;" !== b && "&#160;" !==
            b ? b.replace(/\"/g, "'") : "" : b
        }, stripPref: function (d, g) {
            var c = b.type(d);
            if ("string" === c || "number" === c)d = "" + d, g = "" !== d ? ("" + g).replace("" + d, "") : g;
            return g
        }, parse: function (d) {
            "while(1);" === d.substr(0, 9) && (d = d.substr(9));
            "/*" === d.substr(0, 2) && (d = d.substr(2, d.length - 4));
            d || (d = "{}");
            return !0 === b.jgrid.useJSON && "object" === typeof JSON && "function" === typeof JSON.parse ? JSON.parse(d) : eval("(" + d + ")")
        }, parseDate: function (d, g, c, e) {
            var a = /^\/Date\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\)\/$/, i = "string" === typeof g ?
                g.match(a) : null, a = function (a, b) {
                a = "" + a;
                for (b = parseInt(b, 10) || 2; a.length < b;)a = "0" + a;
                return a
            }, f = {m: 1, d: 1, y: 1970, h: 0, i: 0, s: 0, u: 0}, h = 0, j, k, h = function (a, b) {
                0 === a ? 12 === b && (b = 0) : 12 !== b && (b += 12);
                return b
            };
            void 0 === e && (e = b.jgrid.formatter.date);
            void 0 === e.parseRe && (e.parseRe = /[Tt\\\/:_;.,\t\s-]/);
            e.masks.hasOwnProperty(d) && (d = e.masks[d]);
            if (g && null != g)if (!isNaN(g - 0) && "u" === ("" + d).toLowerCase())h = new Date(1E3 * parseFloat(g)); else if (g.constructor === Date)h = g; else if (null !== i)h = new Date(parseInt(i[1], 10)), i[3] &&
            (d = 60 * Number(i[5]) + Number(i[6]), d *= "-" === i[4] ? 1 : -1, d -= h.getTimezoneOffset(), h.setTime(Number(Number(h) + 6E4 * d))); else {
                g = ("" + g).replace(/\\T/g, "T").replace(/\\t/, "t").split(e.parseRe);
                d = d.replace(/\\T/g, "T").replace(/\\t/, "t").split(e.parseRe);
                j = 0;
                for (k = d.length; j < k; j++)"M" === d[j] && (i = b.inArray(g[j], e.monthNames), -1 !== i && 12 > i && (g[j] = i + 1, f.m = g[j])), "F" === d[j] && (i = b.inArray(g[j], e.monthNames, 12), -1 !== i && 11 < i && (g[j] = i + 1 - 12, f.m = g[j])), "a" === d[j] && (i = b.inArray(g[j], e.AmPm), -1 !== i && 2 > i && g[j] === e.AmPm[i] &&
                (g[j] = i, f.h = h(g[j], f.h))), "A" === d[j] && (i = b.inArray(g[j], e.AmPm), -1 !== i && 1 < i && g[j] === e.AmPm[i] && (g[j] = i - 2, f.h = h(g[j], f.h))), "g" === d[j] && (f.h = parseInt(g[j], 10)), void 0 !== g[j] && (f[d[j].toLowerCase()] = parseInt(g[j], 10));
                f.f && (f.m = f.f);
                if (0 === f.m && 0 === f.y && 0 === f.d)return "&#160;";
                f.m = parseInt(f.m, 10) - 1;
                h = f.y;
                70 <= h && 99 >= h ? f.y = 1900 + f.y : 0 <= h && 69 >= h && (f.y = 2E3 + f.y);
                h = new Date(f.y, f.m, f.d, f.h, f.i, f.s, f.u)
            } else h = new Date(f.y, f.m, f.d, f.h, f.i, f.s, f.u);
            if (void 0 === c)return h;
            e.masks.hasOwnProperty(c) ? c = e.masks[c] :
            c || (c = "Y-m-d");
            d = h.getHours();
            g = h.getMinutes();
            f = h.getDate();
            i = h.getMonth() + 1;
            j = h.getTimezoneOffset();
            k = h.getSeconds();
            var m = h.getMilliseconds(), n = h.getDay(), l = h.getFullYear(), r = (n + 6) % 7 + 1, u = (new Date(l, i - 1, f) - new Date(l, 0, 1)) / 864E5, E = {
                d: a(f),
                D: e.dayNames[n],
                j: f,
                l: e.dayNames[n + 7],
                N: r,
                S: e.S(f),
                w: n,
                z: u,
                W: 5 > r ? Math.floor((u + r - 1) / 7) + 1 : Math.floor((u + r - 1) / 7) || (4 > ((new Date(l - 1, 0, 1)).getDay() + 6) % 7 ? 53 : 52),
                F: e.monthNames[i - 1 + 12],
                m: a(i),
                M: e.monthNames[i - 1],
                n: i,
                t: "?",
                L: "?",
                o: "?",
                Y: l,
                y: ("" + l).substring(2),
                a: 12 >
                d ? e.AmPm[0] : e.AmPm[1],
                A: 12 > d ? e.AmPm[2] : e.AmPm[3],
                B: "?",
                g: d % 12 || 12,
                G: d,
                h: a(d % 12 || 12),
                H: a(d),
                i: a(g),
                s: a(k),
                u: m,
                e: "?",
                I: "?",
                O: (0 < j ? "-" : "+") + a(100 * Math.floor(Math.abs(j) / 60) + Math.abs(j) % 60, 4),
                P: "?",
                T: (("" + h).match(/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g) || [""]).pop().replace(/[^-+\dA-Z]/g, ""),
                Z: "?",
                c: "?",
                r: "?",
                U: Math.floor(h / 1E3)
            };
            return c.replace(/\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g, function (a) {
                return E.hasOwnProperty(a) ?
                    E[a] : a.substring(1)
            })
        }, jqID: function (b) {
            return ("" + b).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g, "\\$&")
        }, guid: 1, uidPref: "jqg", randId: function (d) {
            return (d || b.jgrid.uidPref) + b.jgrid.guid++
        }, getAccessor: function (b, g) {
            var c, e, a = [], i;
            if ("function" === typeof g)return g(b);
            c = b[g];
            if (void 0 === c)try {
                if ("string" === typeof g && (a = g.split(".")), i = a.length)for (c = b; c && i--;)e = a.shift(), c = c[e]
            } catch (f) {
            }
            return c
        }, getXmlData: function (d, g, c) {
            var e = "string" === typeof g ? g.match(/^(.*)\[(\w+)\]$/) : null;
            if ("function" === typeof g)return g(d);
            if (e && e[2])return e[1] ? b(e[1], d).attr(e[2]) : b(d).attr(e[2]);
            d = b(g, d);
            return c ? d : 0 < d.length ? b(d).text() : void 0
        }, cellWidth: function () {
            var d = b("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div>"), g = d.appendTo("body").find("td").width();
            d.remove();
            return 0.1 < Math.abs(g - 5)
        }, cell_width: !0, ajaxOptions: {}, from: function (d) {
            return new function (d, c) {
                "string" === typeof d &&
                (d = b.data(d));
                var e = this, a = d, i = !0, f = !1, h = c, j = /[\$,%]/g, k = null, m = null, n = 0, l = !1, r = "", u = [], E = !0;
                if ("object" === typeof d && d.push)0 < d.length && (E = "object" !== typeof d[0] ? !1 : !0); else throw"data provides is not an array";
                this._hasData = function () {
                    return null === a ? !1 : 0 === a.length ? !1 : !0
                };
                this._getStr = function (a) {
                    var b = [];
                    f && b.push("jQuery.trim(");
                    b.push("String(" + a + ")");
                    f && b.push(")");
                    i || b.push(".toLowerCase()");
                    return b.join("")
                };
                this._strComp = function (a) {
                    return "string" === typeof a ? ".toString()" : ""
                };
                this._group =
                    function (a, b) {
                        return {field: a.toString(), unique: b, items: []}
                    };
                this._toStr = function (a) {
                    f && (a = b.trim(a));
                    a = a.toString().replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
                    return i ? a : a.toLowerCase()
                };
                this._funcLoop = function (e) {
                    var d = [];
                    b.each(a, function (a, b) {
                        d.push(e(b))
                    });
                    return d
                };
                this._append = function (a) {
                    var b;
                    h = null === h ? "" : h + ("" === r ? " && " : r);
                    for (b = 0; b < n; b++)h += "(";
                    l && (h += "!");
                    h += "(" + a + ")";
                    l = !1;
                    r = "";
                    n = 0
                };
                this._setCommand = function (a, b) {
                    k = a;
                    m = b
                };
                this._resetNegate = function () {
                    l = !1
                };
                this._repeatCommand = function (a,
                                                b) {
                    return null === k ? e : null !== a && null !== b ? k(a, b) : null === m || !E ? k(a) : k(m, a)
                };
                this._equals = function (a, b) {
                    return 0 === e._compare(a, b, 1)
                };
                this._compare = function (a, b, e) {
                    var d = Object.prototype.toString;
                    void 0 === e && (e = 1);
                    void 0 === a && (a = null);
                    void 0 === b && (b = null);
                    if (null === a && null === b)return 0;
                    if (null === a && null !== b)return 1;
                    if (null !== a && null === b)return -1;
                    if ("[object Date]" === d.call(a) && "[object Date]" === d.call(b))return a < b ? -e : a > b ? e : 0;
                    !i && "number" !== typeof a && "number" !== typeof b && (a = "" + a, b = "" + b);
                    return a < b ? -e :
                        a > b ? e : 0
                };
                this._performSort = function () {
                    0 !== u.length && (a = e._doSort(a, 0))
                };
                this._doSort = function (a, b) {
                    var d = u[b].by, i = u[b].dir, f = u[b].type, c = u[b].datefmt;
                    if (b === u.length - 1)return e._getOrder(a, d, i, f, c);
                    b++;
                    for (var d = e._getGroup(a, d, i, f, c), i = [], g, f = 0; f < d.length; f++) {
                        g = e._doSort(d[f].items, b);
                        for (c = 0; c < g.length; c++)i.push(g[c])
                    }
                    return i
                };
                this._getOrder = function (a, d, f, c, g) {
                    var h = [], k = [], m = "a" === f ? 1 : -1, n, l;
                    void 0 === c && (c = "text");
                    l = "float" === c || "number" === c || "currency" === c || "numeric" === c ? function (a) {
                        a = parseFloat(("" +
                        a).replace(j, ""));
                        return isNaN(a) ? 0 : a
                    } : "int" === c || "integer" === c ? function (a) {
                        return a ? parseFloat(("" + a).replace(j, "")) : 0
                    } : "date" === c || "datetime" === c ? function (a) {
                        return b.jgrid.parseDate(g, a).getTime()
                    } : b.isFunction(c) ? c : function (a) {
                        a = a ? b.trim("" + a) : "";
                        return i ? a : a.toLowerCase()
                    };
                    b.each(a, function (a, e) {
                        n = "" !== d ? b.jgrid.getAccessor(e, d) : e;
                        void 0 === n && (n = "");
                        n = l(n, e);
                        k.push({vSort: n, index: a})
                    });
                    k.sort(function (a, b) {
                        a = a.vSort;
                        b = b.vSort;
                        return e._compare(a, b, m)
                    });
                    for (var c = 0, u = a.length; c < u;)f = k[c].index,
                        h.push(a[f]), c++;
                    return h
                };
                this._getGroup = function (a, d, c, i, f) {
                    var g = [], h = null, j = null, k;
                    b.each(e._getOrder(a, d, c, i, f), function (a, c) {
                        k = b.jgrid.getAccessor(c, d);
                        null == k && (k = "");
                        e._equals(j, k) || (j = k, null !== h && g.push(h), h = e._group(d, k));
                        h.items.push(c)
                    });
                    null !== h && g.push(h);
                    return g
                };
                this.ignoreCase = function () {
                    i = !1;
                    return e
                };
                this.useCase = function () {
                    i = !0;
                    return e
                };
                this.trim = function () {
                    f = !0;
                    return e
                };
                this.noTrim = function () {
                    f = !1;
                    return e
                };
                this.execute = function () {
                    var d = h, c = [];
                    if (null === d)return e;
                    b.each(a,
                        function () {
                            eval(d) && c.push(this)
                        });
                    a = c;
                    return e
                };
                this.data = function () {
                    return a
                };
                this.select = function (d) {
                    e._performSort();
                    if (!e._hasData())return [];
                    e.execute();
                    if (b.isFunction(d)) {
                        var c = [];
                        b.each(a, function (a, b) {
                            c.push(d(b))
                        });
                        return c
                    }
                    return a
                };
                this.hasMatch = function () {
                    if (!e._hasData())return !1;
                    e.execute();
                    return 0 < a.length
                };
                this.andNot = function (a, b, d) {
                    l = !l;
                    return e.and(a, b, d)
                };
                this.orNot = function (a, b, d) {
                    l = !l;
                    return e.or(a, b, d)
                };
                this.not = function (a, b, d) {
                    return e.andNot(a, b, d)
                };
                this.and = function (a,
                                     b, d) {
                    r = " && ";
                    return void 0 === a ? e : e._repeatCommand(a, b, d)
                };
                this.or = function (a, b, d) {
                    r = " || ";
                    return void 0 === a ? e : e._repeatCommand(a, b, d)
                };
                this.orBegin = function () {
                    n++;
                    return e
                };
                this.orEnd = function () {
                    null !== h && (h += ")");
                    return e
                };
                this.isNot = function (a) {
                    l = !l;
                    return e.is(a)
                };
                this.is = function (a) {
                    e._append("this." + a);
                    e._resetNegate();
                    return e
                };
                this._compareValues = function (a, d, c, i, f) {
                    var g;
                    g = E ? "jQuery.jgrid.getAccessor(this,'" + d + "')" : "this";
                    void 0 === c && (c = null);
                    var h = c, k = void 0 === f.stype ? "text" : f.stype;
                    if (null !==
                        c)switch (k) {
                        case "int":
                        case "integer":
                            h = isNaN(Number(h)) || "" === h ? "0" : h;
                            g = "parseInt(" + g + ",10)";
                            h = "parseInt(" + h + ",10)";
                            break;
                        case "float":
                        case "number":
                        case "numeric":
                            h = ("" + h).replace(j, "");
                            h = isNaN(Number(h)) || "" === h ? "0" : h;
                            g = "parseFloat(" + g + ")";
                            h = "parseFloat(" + h + ")";
                            break;
                        case "date":
                        case "datetime":
                            h = "" + b.jgrid.parseDate(f.newfmt || "Y-m-d", h).getTime();
                            g = 'jQuery.jgrid.parseDate("' + f.srcfmt + '",' + g + ").getTime()";
                            break;
                        default:
                            g = e._getStr(g), h = e._getStr('"' + e._toStr(h) + '"')
                    }
                    e._append(g + " " + i + " " + h);
                    e._setCommand(a,
                        d);
                    e._resetNegate();
                    return e
                };
                this.equals = function (a, b, d) {
                    return e._compareValues(e.equals, a, b, "==", d)
                };
                this.notEquals = function (a, b, d) {
                    return e._compareValues(e.equals, a, b, "!==", d)
                };
                this.isNull = function (a, b, d) {
                    return e._compareValues(e.equals, a, null, "===", d)
                };
                this.greater = function (a, b, d) {
                    return e._compareValues(e.greater, a, b, ">", d)
                };
                this.less = function (a, b, d) {
                    return e._compareValues(e.less, a, b, "<", d)
                };
                this.greaterOrEquals = function (a, b, d) {
                    return e._compareValues(e.greaterOrEquals, a, b, ">=", d)
                };
                this.lessOrEquals =
                    function (a, b, d) {
                        return e._compareValues(e.lessOrEquals, a, b, "<=", d)
                    };
                this.startsWith = function (a, d) {
                    var c = null == d ? a : d, c = f ? b.trim(c.toString()).length : c.toString().length;
                    E ? e._append(e._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".substr(0," + c + ") == " + e._getStr('"' + e._toStr(d) + '"')) : (c = f ? b.trim(d.toString()).length : d.toString().length, e._append(e._getStr("this") + ".substr(0," + c + ") == " + e._getStr('"' + e._toStr(a) + '"')));
                    e._setCommand(e.startsWith, a);
                    e._resetNegate();
                    return e
                };
                this.endsWith = function (a,
                                          d) {
                    var c = null == d ? a : d, c = f ? b.trim(c.toString()).length : c.toString().length;
                    E ? e._append(e._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".substr(" + e._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".length-" + c + "," + c + ') == "' + e._toStr(d) + '"') : e._append(e._getStr("this") + ".substr(" + e._getStr("this") + '.length-"' + e._toStr(a) + '".length,"' + e._toStr(a) + '".length) == "' + e._toStr(a) + '"');
                    e._setCommand(e.endsWith, a);
                    e._resetNegate();
                    return e
                };
                this.contains = function (a, b) {
                    E ? e._append(e._getStr("jQuery.jgrid.getAccessor(this,'" +
                            a + "')") + '.indexOf("' + e._toStr(b) + '",0) > -1') : e._append(e._getStr("this") + '.indexOf("' + e._toStr(a) + '",0) > -1');
                    e._setCommand(e.contains, a);
                    e._resetNegate();
                    return e
                };
                this.groupBy = function (b, d, c, i) {
                    return !e._hasData() ? null : e._getGroup(a, b, d, c, i)
                };
                this.orderBy = function (a, d, c, i) {
                    d = null == d ? "a" : b.trim(d.toString().toLowerCase());
                    null == c && (c = "text");
                    null == i && (i = "Y-m-d");
                    if ("desc" === d || "descending" === d)d = "d";
                    if ("asc" === d || "ascending" === d)d = "a";
                    u.push({by: a, dir: d, type: c, datefmt: i});
                    return e
                };
                return e
            }(d,
                null)
        }, getMethod: function (d) {
            return this.getAccessor(b.fn.jqGrid, d)
        }, extend: function (d) {
            b.extend(b.fn.jqGrid, d);
            this.no_legacy_api || b.fn.extend(d)
        }
    });
    b.fn.jqGrid = function (d) {
        if ("string" === typeof d) {
            var g = b.jgrid.getMethod(d);
            if (!g)throw"jqGrid - No such method: " + d;
            var c = b.makeArray(arguments).slice(1);
            return g.apply(this, c)
        }
        return this.each(function () {
            if (!this.grid) {
                var e = b.extend(!0, {
                    url: "",
                    height: 150,
                    page: 1,
                    rowNum: 20,
                    rowTotal: null,
                    records: 0,
                    pager: "",
                    pgbuttons: !0,
                    pginput: !0,
                    colModel: [],
                    rowList: [],
                    colNames: [],
                    sortorder: "asc",
                    sortname: "",
                    datatype: "xml",
                    mtype: "GET",
                    altRows: !1,
                    selarrrow: [],
                    savedRow: [],
                    shrinkToFit: !0,
                    xmlReader: {},
                    jsonReader: {},
                    subGrid: !1,
                    subGridModel: [],
                    reccount: 0,
                    lastpage: 0,
                    lastsort: 0,
                    selrow: null,
                    beforeSelectRow: null,
                    onSelectRow: null,
                    onSortCol: null,
                    ondblClickRow: null,
                    onRightClickRow: null,
                    onPaging: null,
                    onSelectAll: null,
                    onInitGrid: null,
                    loadComplete: null,
                    gridComplete: null,
                    loadError: null,
                    loadBeforeSend: null,
                    afterInsertRow: null,
                    beforeRequest: null,
                    beforeProcessing: null,
                    onHeaderClick: null,
                    viewrecords: !1,
                    loadonce: !1,
                    multiselect: !1,
                    multikey: !1,
                    editurl: null,
                    search: !1,
                    caption: "",
                    hidegrid: !0,
                    hiddengrid: !1,
                    postData: {},
                    userData: {},
                    treeGrid: !1,
                    treeGridModel: "nested",
                    treeReader: {},
                    treeANode: -1,
                    ExpandColumn: null,
                    tree_root_level: 0,
                    prmNames: {
                        page: "page",
                        rows: "rows",
                        sort: "sidx",
                        order: "sord",
                        search: "_search",
                        nd: "nd",
                        id: "id",
                        oper: "oper",
                        editoper: "edit",
                        addoper: "add",
                        deloper: "del",
                        subgridid: "id",
                        npage: null,
                        totalrows: "totalrows"
                    },
                    forceFit: !1,
                    gridstate: "visible",
                    cellEdit: !1,
                    cellsubmit: "remote",
                    nv: 0,
                    loadui: "enable",
                    toolbar: [!1, ""],
                    scroll: !1,
                    multiboxonly: !1,
                    deselectAfterSort: !0,
                    scrollrows: !1,
                    autowidth: !1,
                    scrollOffset: 18,
                    cellLayout: 5,
                    subGridWidth: 20,
                    multiselectWidth: 20,
                    gridview: !1,
                    rownumWidth: 25,
                    rownumbers: !1,
                    pagerpos: "center",
                    recordpos: "right",
                    footerrow: !1,
                    userDataOnFooter: !1,
                    hoverrows: !0,
                    altclass: "ui-priority-secondary",
                    viewsortcols: [!1, "vertical", !0],
                    resizeclass: "",
                    autoencode: !1,
                    remapColumns: [],
                    ajaxGridOptions: {},
                    direction: "ltr",
                    toppager: !1,
                    headertitles: !1,
                    scrollTimeout: 40,
                    data: [],
                    _index: {},
                    grouping: !1,
                    groupingView: {
                        groupField: [],
                        groupOrder: [],
                        groupText: [],
                        groupColumnShow: [],
                        groupSummary: [],
                        showSummaryOnHide: !1,
                        sortitems: [],
                        sortnames: [],
                        summary: [],
                        summaryval: [],
                        plusicon: "ui-icon-circlesmall-plus",
                        minusicon: "ui-icon-circlesmall-minus",
                        displayField: []
                    },
                    ignoreCase: !1,
                    cmTemplate: {},
                    idPrefix: "",
                    multiSort: !1
                }, b.jgrid.defaults, d || {}), a = this, c = {
                    headers: [], cols: [], footers: [], dragStart: function (c, d, f) {
                        this.resizing = {idx: c, startX: d.clientX, sOL: d.clientX - 6};
                        this.hDiv.style.cursor = "col-resize";
                        this.curGbox =
                            b("#rs_m" + b.jgrid.jqID(e.id), "#gbox_" + b.jgrid.jqID(e.id));
                        this.curGbox.css({display: "block", left: d.clientX - 6, top: f[1], height: f[2]});
                        b(a).triggerHandler("jqGridResizeStart", [d, c]);
                        b.isFunction(e.resizeStart) && e.resizeStart.call(a, d, c);
                        document.onselectstart = function () {
                            return !1
                        }
                    }, dragMove: function (a) {
                        if (this.resizing) {
                            var b = a.clientX - this.resizing.startX, a = this.headers[this.resizing.idx], c = "ltr" === e.direction ? a.width + b : a.width - b, d;
                            33 < c && (this.curGbox.css({left: this.resizing.sOL + b}), !0 === e.forceFit ?
                                (d = this.headers[this.resizing.idx + e.nv], b = "ltr" === e.direction ? d.width - b : d.width + b, 33 < b && (a.newWidth = c, d.newWidth = b)) : (this.newWidth = "ltr" === e.direction ? e.tblwidth + b : e.tblwidth - b, a.newWidth = c))
                        }
                    }, dragEnd: function () {
                        this.hDiv.style.cursor = "default";
                        if (this.resizing) {
                            var c = this.resizing.idx, d = this.headers[c].newWidth || this.headers[c].width, d = parseInt(d, 10);
                            this.resizing = !1;
                            b("#rs_m" + b.jgrid.jqID(e.id)).css("display", "none");
                            e.colModel[c].width = d;
                            this.headers[c].width = d;
                            this.headers[c].el.style.width =
                                d + "px";
                            this.cols[c].style.width = d + "px";
                            0 < this.footers.length && (this.footers[c].style.width = d + "px");
                            !0 === e.forceFit ? (d = this.headers[c + e.nv].newWidth || this.headers[c + e.nv].width, this.headers[c + e.nv].width = d, this.headers[c + e.nv].el.style.width = d + "px", this.cols[c + e.nv].style.width = d + "px", 0 < this.footers.length && (this.footers[c + e.nv].style.width = d + "px"), e.colModel[c + e.nv].width = d) : (e.tblwidth = this.newWidth || e.tblwidth, b("table:first", this.bDiv).css("width", e.tblwidth + "px"), b("table:first", this.hDiv).css("width",
                                e.tblwidth + "px"), this.hDiv.scrollLeft = this.bDiv.scrollLeft, e.footerrow && (b("table:first", this.sDiv).css("width", e.tblwidth + "px"), this.sDiv.scrollLeft = this.bDiv.scrollLeft));
                            b(a).triggerHandler("jqGridResizeStop", [d, c]);
                            b.isFunction(e.resizeStop) && e.resizeStop.call(a, d, c)
                        }
                        this.curGbox = null;
                        document.onselectstart = function () {
                            return !0
                        }
                    }, populateVisible: function () {
                        c.timer && clearTimeout(c.timer);
                        c.timer = null;
                        var a = b(c.bDiv).height();
                        if (a) {
                            var d = b("table:first", c.bDiv), f, g;
                            if (d[0].rows.length)try {
                                g = (f = d[0].rows[1]) ?
                                b(f).outerHeight() || c.prevRowHeight : c.prevRowHeight
                            } catch (va) {
                                g = c.prevRowHeight
                            }
                            if (g) {
                                c.prevRowHeight = g;
                                var h = e.rowNum;
                                f = c.scrollTop = c.bDiv.scrollTop;
                                var j = Math.round(d.position().top) - f, k = j + d.height();
                                g *= h;
                                var B, F, A;
                                if (k < a && 0 >= j && (void 0 === e.lastpage || parseInt((k + f + g - 1) / g, 10) <= e.lastpage))F = parseInt((a - k + g - 1) / g, 10), 0 <= k || 2 > F || !0 === e.scroll ? (B = Math.round((k + f) / g) + 1, j = -1) : j = 1;
                                0 < j && (B = parseInt(f / g, 10) + 1, F = parseInt((f + a) / g, 10) + 2 - B, A = !0);
                                if (F && (!e.lastpage || !(B > e.lastpage || 1 === e.lastpage || B === e.page &&
                                    B === e.lastpage)))c.hDiv.loading ? c.timer = setTimeout(c.populateVisible, e.scrollTimeout) : (e.page = B, A && (c.selectionPreserver(d[0]), c.emptyRows.call(d[0], !1, !1)), c.populate(F))
                            }
                        }
                    }, scrollGrid: function (a) {
                        if (e.scroll) {
                            var b = c.bDiv.scrollTop;
                            void 0 === c.scrollTop && (c.scrollTop = 0);
                            b !== c.scrollTop && (c.scrollTop = b, c.timer && clearTimeout(c.timer), c.timer = setTimeout(c.populateVisible, e.scrollTimeout))
                        }
                        c.hDiv.scrollLeft = c.bDiv.scrollLeft;
                        e.footerrow && (c.sDiv.scrollLeft = c.bDiv.scrollLeft);
                        a && a.stopPropagation()
                    },
                    selectionPreserver: function (a) {
                        var c = a.p, d = c.selrow, e = c.selarrrow ? b.makeArray(c.selarrrow) : null, f = a.grid.bDiv.scrollLeft, g = function () {
                            var h;
                            c.selrow = null;
                            c.selarrrow = [];
                            if (c.multiselect && e && 0 < e.length)for (h = 0; h < e.length; h++)e[h] !== d && b(a).jqGrid("setSelection", e[h], !1, null);
                            d && b(a).jqGrid("setSelection", d, !1, null);
                            a.grid.bDiv.scrollLeft = f;
                            b(a).unbind(".selectionPreserver", g)
                        };
                        b(a).bind("jqGridGridComplete.selectionPreserver", g)
                    }
                };
                if ("TABLE" !== this.tagName.toUpperCase())alert("Element is not a table");
                else if (void 0 !== document.documentMode && 5 >= document.documentMode)alert("Grid can not be used in this ('quirks') mode!"); else {
                    b(this).empty().attr("tabindex", "0");
                    this.p = e;
                    this.p.useProp = !!b.fn.prop;
                    var f, g;
                    if (0 === this.p.colNames.length)for (f = 0; f < this.p.colModel.length; f++)this.p.colNames[f] = this.p.colModel[f].label || this.p.colModel[f].name;
                    if (this.p.colNames.length !== this.p.colModel.length)alert(b.jgrid.errors.model); else {
                        var j = b("<div class='ui-jqgrid-view'></div>"), k = b.jgrid.msie;
                        a.p.direction =
                            b.trim(a.p.direction.toLowerCase());
                        -1 === b.inArray(a.p.direction, ["ltr", "rtl"]) && (a.p.direction = "ltr");
                        g = a.p.direction;
                        b(j).insertBefore(this);
                        b(this).removeClass("scroll").appendTo(j);
                        var m = b("<div class='ui-jqgrid ui-widget ui-widget-content ui-corner-all'></div>");
                        b(m).attr({id: "gbox_" + this.id, dir: g}).insertBefore(j);
                        b(j).attr("id", "gview_" + this.id).appendTo(m);
                        b("<div class='ui-widget-overlay jqgrid-overlay' id='lui_" + this.id + "'></div>").insertBefore(j);
                        b("<div class='loading ui-state-default ui-state-active' id='load_" +
                            this.id + "'>" + this.p.loadtext + "</div>").insertBefore(j);
                        b(this).attr({
                            cellspacing: "0",
                            cellpadding: "0",
                            border: "0",
                            role: "grid",
                            "aria-multiselectable": !!this.p.multiselect,
                            "aria-labelledby": "gbox_" + this.id
                        });
                        var n = function (a, b) {
                            a = parseInt(a, 10);
                            return isNaN(a) ? b || 0 : a
                        }, l = function (d, e, f, g, h, j) {
                            var R = a.p.colModel[d], k = R.align, B = 'style="', F = R.classes, A = R.name, t = [];
                            k && (B = B + ("text-align:" + k + ";"));
                            R.hidden === true && (B = B + "display:none;");
                            if (e === 0)B = B + ("width: " + c.headers[d].width + "px;"); else if (R.cellattr && b.isFunction(R.cellattr))if ((d =
                                    R.cellattr.call(a, h, f, g, R, j)) && typeof d === "string") {
                                d = d.replace(/style/i, "style").replace(/title/i, "title");
                                if (d.indexOf("title") > -1)R.title = false;
                                d.indexOf("class") > -1 && (F = void 0);
                                t = d.replace("-style", "-sti").split(/style/);
                                if (t.length === 2) {
                                    t[1] = b.trim(t[1].replace("-sti", "-style").replace("=", ""));
                                    if (t[1].indexOf("'") === 0 || t[1].indexOf('"') === 0)t[1] = t[1].substring(1);
                                    B = B + t[1].replace(/'/gi, '"')
                                } else B = B + '"'
                            }
                            if (!t.length) {
                                t[0] = "";
                                B = B + '"'
                            }
                            B = B + ((F !== void 0 ? ' class="' + F + '"' : "") + (R.title && f ? ' title="' +
                                b.jgrid.stripHtml(f) + '"' : ""));
                            B = B + (' aria-describedby="' + a.p.id + "_" + A + '"');
                            return B + t[0]
                        }, r = function (c) {
                            return c == null || c === "" ? "&#160;" : a.p.autoencode ? b.jgrid.htmlEncode(c) : "" + c
                        }, u = function (c, d, e, f, g) {
                            var h = a.p.colModel[e];
                            if (h.formatter !== void 0) {
                                c = "" + a.p.idPrefix !== "" ? b.jgrid.stripPref(a.p.idPrefix, c) : c;
                                c = {rowId: c, colModel: h, gid: a.p.id, pos: e};
                                d = b.isFunction(h.formatter) ? h.formatter.call(a, d, c, f, g) : b.fmatter ? b.fn.fmatter.call(a, h.formatter, d, c, f, g) : r(d)
                            } else d = r(d);
                            return d
                        }, E = function (a, b, c, d, e,
                                         f) {
                            b = u(a, b, c, e, "add");
                            return '<td role="gridcell" ' + l(c, d, b, e, a, f) + ">" + b + "</td>"
                        }, T = function (b, c, d, e) {
                            e = '<input role="checkbox" type="checkbox" id="jqg_' + a.p.id + "_" + b + '" class="cbox" name="jqg_' + a.p.id + "_" + b + '"' + (e ? 'checked="checked"' : "") + "/>";
                            return '<td role="gridcell" ' + l(c, d, "", null, b, true) + ">" + e + "</td>"
                        }, L = function (a, b, c, d) {
                            c = (parseInt(c, 10) - 1) * parseInt(d, 10) + 1 + b;
                            return '<td role="gridcell" class="ui-state-default jqgrid-rownum" ' + l(a, b, c, null, b, true) + ">" + c + "</td>"
                        }, ba = function (b) {
                            var c, d = [], e =
                                0, f;
                            for (f = 0; f < a.p.colModel.length; f++) {
                                c = a.p.colModel[f];
                                if (c.name !== "cb" && c.name !== "subgrid" && c.name !== "rn") {
                                    d[e] = b === "local" ? c.name : b === "xml" || b === "xmlstring" ? c.xmlmap || c.name : c.jsonmap || c.name;
                                    if (a.p.keyIndex !== false && c.key === true)a.p.keyName = d[e];
                                    e++
                                }
                            }
                            return d
                        }, V = function (c) {
                            var d = a.p.remapColumns;
                            if (!d || !d.length)d = b.map(a.p.colModel, function (a, b) {
                                return b
                            });
                            c && (d = b.map(d, function (a) {
                                return a < c ? null : a - c
                            }));
                            return d
                        }, W = function (a, c) {
                            var d;
                            if (this.p.deepempty)b(this.rows).slice(1).remove(); else {
                                d =
                                    this.rows.length > 0 ? this.rows[0] : null;
                                b(this.firstChild).empty().append(d)
                            }
                            if (a && this.p.scroll) {
                                b(this.grid.bDiv.firstChild).css({height: "auto"});
                                b(this.grid.bDiv.firstChild.firstChild).css({height: 0, display: "none"});
                                if (this.grid.bDiv.scrollTop !== 0)this.grid.bDiv.scrollTop = 0
                            }
                            if (c === true && this.p.treeGrid) {
                                this.p.data = [];
                                this.p._index = {}
                            }
                        }, P = function () {
                            var c = a.p.data.length, d, e, f;
                            d = a.p.rownumbers === true ? 1 : 0;
                            e = a.p.multiselect === true ? 1 : 0;
                            f = a.p.subGrid === true ? 1 : 0;
                            d = a.p.keyIndex === false || a.p.loadonce ===
                            true ? a.p.localReader.id : a.p.colModel[a.p.keyIndex + e + f + d].name;
                            for (e = 0; e < c; e++) {
                                f = b.jgrid.getAccessor(a.p.data[e], d);
                                f === void 0 && (f = "" + (e + 1));
                                a.p._index[f] = e
                            }
                        }, Z = function (c, d, e, f, g, h) {
                            var i = "-1", j = "", k, d = d ? "display:none;" : "", e = "ui-widget-content jqgrow ui-row-" + a.p.direction + (e ? " " + e : "") + (h ? " ui-state-highlight" : ""), h = b(a).triggerHandler("jqGridRowAttr", [f, g, c]);
                            typeof h !== "object" && (h = b.isFunction(a.p.rowattr) ? a.p.rowattr.call(a, f, g, c) : {});
                            if (!b.isEmptyObject(h)) {
                                if (h.hasOwnProperty("id")) {
                                    c = h.id;
                                    delete h.id
                                }
                                if (h.hasOwnProperty("tabindex")) {
                                    i = h.tabindex;
                                    delete h.tabindex
                                }
                                if (h.hasOwnProperty("style")) {
                                    d = d + h.style;
                                    delete h.style
                                }
                                if (h.hasOwnProperty("class")) {
                                    e = e + (" " + h["class"]);
                                    delete h["class"]
                                }
                                try {
                                    delete h.role
                                } catch (F) {
                                }
                                for (k in h)h.hasOwnProperty(k) && (j = j + (" " + k + "=" + h[k]))
                            }
                            return '<tr role="row" id="' + c + '" tabindex="' + i + '" class="' + e + '"' + (d === "" ? "" : ' style="' + d + '"') + j + ">"
                        }, H = function (c, d, e, f, g) {
                            var h = new Date, i = a.p.datatype !== "local" && a.p.loadonce || a.p.datatype === "xmlstring", j = a.p.xmlReader,
                                k = a.p.datatype === "local" ? "local" : "xml";
                            if (i) {
                                a.p.data = [];
                                a.p._index = {};
                                a.p.localReader.id = "_id_"
                            }
                            a.p.reccount = 0;
                            if (b.isXMLDoc(c)) {
                                if (a.p.treeANode === -1 && !a.p.scroll) {
                                    W.call(a, false, true);
                                    e = 1
                                } else e = e > 1 ? e : 1;
                                var F = b(a), A, t, m = 0, l, q = a.p.multiselect === true ? 1 : 0, v = 0, u, O = a.p.rownumbers === true ? 1 : 0, r, o = [], $, s = {}, y, C, p = [], I = a.p.altRows === true ? a.p.altclass : "", w;
                                if (a.p.subGrid === true) {
                                    v = 1;
                                    u = b.jgrid.getMethod("addSubGridCell")
                                }
                                j.repeatitems || (o = ba(k));
                                r = a.p.keyIndex === false ? b.isFunction(j.id) ? j.id.call(a, c) : j.id :
                                    a.p.keyIndex;
                                if (o.length > 0 && !isNaN(r))r = a.p.keyName;
                                k = ("" + r).indexOf("[") === -1 ? o.length ? function (a, c) {
                                    return b(r, a).text() || c
                                } : function (a, c) {
                                    return b(j.cell, a).eq(r).text() || c
                                } : function (a, b) {
                                    return a.getAttribute(r.replace(/[\[\]]/g, "")) || b
                                };
                                a.p.userData = {};
                                a.p.page = n(b.jgrid.getXmlData(c, j.page), a.p.page);
                                a.p.lastpage = n(b.jgrid.getXmlData(c, j.total), 1);
                                a.p.records = n(b.jgrid.getXmlData(c, j.records));
                                b.isFunction(j.userdata) ? a.p.userData = j.userdata.call(a, c) || {} : b.jgrid.getXmlData(c, j.userdata, true).each(function () {
                                    a.p.userData[this.getAttribute("name")] =
                                        b(this).text()
                                });
                                c = b.jgrid.getXmlData(c, j.root, true);
                                (c = b.jgrid.getXmlData(c, j.row, true)) || (c = []);
                                var z = c.length, J = 0, x = [], D = parseInt(a.p.rowNum, 10), G = a.p.scroll ? b.jgrid.randId() : 1;
                                if (z > 0 && a.p.page <= 0)a.p.page = 1;
                                if (c && z) {
                                    g && (D = D * (g + 1));
                                    var g = b.isFunction(a.p.afterInsertRow), H = false, K;
                                    if (a.p.grouping) {
                                        H = a.p.groupingView.groupCollapse === true;
                                        K = b.jgrid.getMethod("groupingPrepare")
                                    }
                                    for (; J < z;) {
                                        y = c[J];
                                        C = k(y, G + J);
                                        C = a.p.idPrefix + C;
                                        A = e === 0 ? 0 : e + 1;
                                        w = (A + J) % 2 === 1 ? I : "";
                                        var M = p.length;
                                        p.push("");
                                        O && p.push(L(0, J,
                                            a.p.page, a.p.rowNum));
                                        q && p.push(T(C, O, J, false));
                                        v && p.push(u.call(F, q + O, J + e));
                                        if (j.repeatitems) {
                                            $ || ($ = V(q + v + O));
                                            var P = b.jgrid.getXmlData(y, j.cell, true);
                                            b.each($, function (b) {
                                                var c = P[this];
                                                if (!c)return false;
                                                l = c.textContent || c.text;
                                                s[a.p.colModel[b + q + v + O].name] = l;
                                                p.push(E(C, l, b + q + v + O, J + e, y, s))
                                            })
                                        } else for (A = 0; A < o.length; A++) {
                                            l = b.jgrid.getXmlData(y, o[A]);
                                            s[a.p.colModel[A + q + v + O].name] = l;
                                            p.push(E(C, l, A + q + v + O, J + e, y, s))
                                        }
                                        p[M] = Z(C, H, w, s, y, false);
                                        p.push("</tr>");
                                        if (a.p.grouping) {
                                            x = K.call(F, p, x, s, J);
                                            p = []
                                        }
                                        if (i ||
                                            a.p.treeGrid === true) {
                                            s._id_ = b.jgrid.stripPref(a.p.idPrefix, C);
                                            a.p.data.push(s);
                                            a.p._index[s._id_] = a.p.data.length - 1
                                        }
                                        if (a.p.gridview === false) {
                                            b("tbody:first", d).append(p.join(""));
                                            F.triggerHandler("jqGridAfterInsertRow", [C, s, y]);
                                            g && a.p.afterInsertRow.call(a, C, s, y);
                                            p = []
                                        }
                                        s = {};
                                        m++;
                                        J++;
                                        if (m === D)break
                                    }
                                }
                                if (a.p.gridview === true) {
                                    t = a.p.treeANode > -1 ? a.p.treeANode : 0;
                                    if (a.p.grouping) {
                                        F.jqGrid("groupingRender", x, a.p.colModel.length);
                                        x = null
                                    } else a.p.treeGrid === true && t > 0 ? b(a.rows[t]).after(p.join("")) : b("tbody:first",
                                        d).append(p.join(""))
                                }
                                if (a.p.subGrid === true)try {
                                    F.jqGrid("addSubGrid", q + O)
                                } catch (Q) {
                                }
                                a.p.totaltime = new Date - h;
                                if (m > 0 && a.p.records === 0)a.p.records = z;
                                p = null;
                                if (a.p.treeGrid === true)try {
                                    F.jqGrid("setTreeNode", t + 1, m + t + 1)
                                } catch (S) {
                                }
                                if (!a.p.treeGrid && !a.p.scroll)a.grid.bDiv.scrollTop = 0;
                                a.p.reccount = m;
                                a.p.treeANode = -1;
                                a.p.userDataOnFooter && F.jqGrid("footerData", "set", a.p.userData, true);
                                if (i) {
                                    a.p.records = z;
                                    a.p.lastpage = Math.ceil(z / D)
                                }
                                f || a.updatepager(false, true);
                                if (i)for (; m < z;) {
                                    y = c[m];
                                    C = k(y, m + G);
                                    C = a.p.idPrefix +
                                        C;
                                    if (j.repeatitems) {
                                        $ || ($ = V(q + v + O));
                                        var N = b.jgrid.getXmlData(y, j.cell, true);
                                        b.each($, function (b) {
                                            var c = N[this];
                                            if (!c)return false;
                                            l = c.textContent || c.text;
                                            s[a.p.colModel[b + q + v + O].name] = l
                                        })
                                    } else for (A = 0; A < o.length; A++) {
                                        l = b.jgrid.getXmlData(y, o[A]);
                                        s[a.p.colModel[A + q + v + O].name] = l
                                    }
                                    s._id_ = b.jgrid.stripPref(a.p.idPrefix, C);
                                    a.p.data.push(s);
                                    a.p._index[s._id_] = a.p.data.length - 1;
                                    s = {};
                                    m++
                                }
                            }
                        }, U = function (c, d, e, f, g) {
                            var h = new Date;
                            if (c) {
                                if (a.p.treeANode === -1 && !a.p.scroll) {
                                    W.call(a, false, true);
                                    e = 1
                                } else e = e > 1 ? e :
                                    1;
                                var i, j = a.p.datatype !== "local" && a.p.loadonce || a.p.datatype === "jsonstring";
                                if (j) {
                                    a.p.data = [];
                                    a.p._index = {};
                                    a.p.localReader.id = "_id_"
                                }
                                a.p.reccount = 0;
                                if (a.p.datatype === "local") {
                                    d = a.p.localReader;
                                    i = "local"
                                } else {
                                    d = a.p.jsonReader;
                                    i = "json"
                                }
                                var k = b(a), m = 0, A, t, l, r = [], q = a.p.multiselect ? 1 : 0, v = a.p.subGrid === true ? 1 : 0, u, o = a.p.rownumbers === true ? 1 : 0, z = V(q + v + o);
                                i = ba(i);
                                var w, x, s, y = {}, C, p, I = [], D = a.p.altRows === true ? a.p.altclass : "", G;
                                a.p.page = n(b.jgrid.getAccessor(c, d.page), a.p.page);
                                a.p.lastpage = n(b.jgrid.getAccessor(c,
                                    d.total), 1);
                                a.p.records = n(b.jgrid.getAccessor(c, d.records));
                                a.p.userData = b.jgrid.getAccessor(c, d.userdata) || {};
                                v && (u = b.jgrid.getMethod("addSubGridCell"));
                                s = a.p.keyIndex === false ? b.isFunction(d.id) ? d.id.call(a, c) : d.id : a.p.keyIndex;
                                if (!d.repeatitems) {
                                    r = i;
                                    if (r.length > 0 && !isNaN(s))s = a.p.keyName
                                }
                                x = b.jgrid.getAccessor(c, d.root);
                                x == null && b.isArray(c) && (x = c);
                                x || (x = []);
                                c = x.length;
                                t = 0;
                                if (c > 0 && a.p.page <= 0)a.p.page = 1;
                                var J = parseInt(a.p.rowNum, 10), H = a.p.scroll ? b.jgrid.randId() : 1, K = false, M;
                                g && (J = J * (g + 1));
                                a.p.datatype ===
                                "local" && !a.p.deselectAfterSort && (K = true);
                                var P = b.isFunction(a.p.afterInsertRow), N = [], Q = false, S;
                                if (a.p.grouping) {
                                    Q = a.p.groupingView.groupCollapse === true;
                                    S = b.jgrid.getMethod("groupingPrepare")
                                }
                                for (; t < c;) {
                                    g = x[t];
                                    p = b.jgrid.getAccessor(g, s);
                                    if (p === void 0) {
                                        typeof s === "number" && a.p.colModel[s + q + v + o] != null && (p = b.jgrid.getAccessor(g, a.p.colModel[s + q + v + o].name));
                                        if (p === void 0) {
                                            p = H + t;
                                            if (r.length === 0 && d.cell) {
                                                A = b.jgrid.getAccessor(g, d.cell) || g;
                                                p = A != null && A[s] !== void 0 ? A[s] : p
                                            }
                                        }
                                    }
                                    p = a.p.idPrefix + p;
                                    A = e === 1 ? 0 : e;
                                    G =
                                        (A + t) % 2 === 1 ? D : "";
                                    K && (M = a.p.multiselect ? b.inArray(p, a.p.selarrrow) !== -1 : p === a.p.selrow);
                                    var U = I.length;
                                    I.push("");
                                    o && I.push(L(0, t, a.p.page, a.p.rowNum));
                                    q && I.push(T(p, o, t, M));
                                    v && I.push(u.call(k, q + o, t + e));
                                    w = i;
                                    if (d.repeatitems) {
                                        d.cell && (g = b.jgrid.getAccessor(g, d.cell) || g);
                                        b.isArray(g) && (w = z)
                                    }
                                    for (l = 0; l < w.length; l++) {
                                        A = b.jgrid.getAccessor(g, w[l]);
                                        y[a.p.colModel[l + q + v + o].name] = A;
                                        I.push(E(p, A, l + q + v + o, t + e, g, y))
                                    }
                                    I[U] = Z(p, Q, G, y, g, M);
                                    I.push("</tr>");
                                    if (a.p.grouping) {
                                        N = S.call(k, I, N, y, t);
                                        I = []
                                    }
                                    if (j || a.p.treeGrid ===
                                        true) {
                                        y._id_ = b.jgrid.stripPref(a.p.idPrefix, p);
                                        a.p.data.push(y);
                                        a.p._index[y._id_] = a.p.data.length - 1
                                    }
                                    if (a.p.gridview === false) {
                                        b("#" + b.jgrid.jqID(a.p.id) + " tbody:first").append(I.join(""));
                                        k.triggerHandler("jqGridAfterInsertRow", [p, y, g]);
                                        P && a.p.afterInsertRow.call(a, p, y, g);
                                        I = []
                                    }
                                    y = {};
                                    m++;
                                    t++;
                                    if (m === J)break
                                }
                                if (a.p.gridview === true) {
                                    C = a.p.treeANode > -1 ? a.p.treeANode : 0;
                                    a.p.grouping ? k.jqGrid("groupingRender", N, a.p.colModel.length) : a.p.treeGrid === true && C > 0 ? b(a.rows[C]).after(I.join("")) : b("#" + b.jgrid.jqID(a.p.id) +
                                        " tbody:first").append(I.join(""))
                                }
                                if (a.p.subGrid === true)try {
                                    k.jqGrid("addSubGrid", q + o)
                                } catch (X) {
                                }
                                a.p.totaltime = new Date - h;
                                if (m > 0 && a.p.records === 0)a.p.records = c;
                                if (a.p.treeGrid === true)try {
                                    k.jqGrid("setTreeNode", C + 1, m + C + 1)
                                } catch (Y) {
                                }
                                if (!a.p.treeGrid && !a.p.scroll)a.grid.bDiv.scrollTop = 0;
                                a.p.reccount = m;
                                a.p.treeANode = -1;
                                a.p.userDataOnFooter && k.jqGrid("footerData", "set", a.p.userData, true);
                                if (j) {
                                    a.p.records = c;
                                    a.p.lastpage = Math.ceil(c / J)
                                }
                                f || a.updatepager(false, true);
                                if (j)for (; m < c && x[m];) {
                                    g = x[m];
                                    p = b.jgrid.getAccessor(g,
                                        s);
                                    if (p === void 0) {
                                        typeof s === "number" && a.p.colModel[s + q + v + o] != null && (p = b.jgrid.getAccessor(g, a.p.colModel[s + q + v + o].name));
                                        if (p === void 0) {
                                            p = H + m;
                                            if (r.length === 0 && d.cell) {
                                                e = b.jgrid.getAccessor(g, d.cell) || g;
                                                p = e != null && e[s] !== void 0 ? e[s] : p
                                            }
                                        }
                                    }
                                    if (g) {
                                        p = a.p.idPrefix + p;
                                        w = i;
                                        if (d.repeatitems) {
                                            d.cell && (g = b.jgrid.getAccessor(g, d.cell) || g);
                                            b.isArray(g) && (w = z)
                                        }
                                        for (l = 0; l < w.length; l++)y[a.p.colModel[l + q + v + o].name] = b.jgrid.getAccessor(g, w[l]);
                                        y._id_ = b.jgrid.stripPref(a.p.idPrefix, p);
                                        a.p.data.push(y);
                                        a.p._index[y._id_] =
                                            a.p.data.length - 1;
                                        y = {}
                                    }
                                    m++
                                }
                            }
                        }, ka = function () {
                            function c(a) {
                                var b = 0, d, e, g, h, i;
                                if (a.groups != null) {
                                    (e = a.groups.length && a.groupOp.toString().toUpperCase() === "OR") && q.orBegin();
                                    for (d = 0; d < a.groups.length; d++) {
                                        b > 0 && e && q.or();
                                        try {
                                            c(a.groups[d])
                                        } catch (j) {
                                            alert(j)
                                        }
                                        b++
                                    }
                                    e && q.orEnd()
                                }
                                if (a.rules != null)try {
                                    (g = a.rules.length && a.groupOp.toString().toUpperCase() === "OR") && q.orBegin();
                                    for (d = 0; d < a.rules.length; d++) {
                                        i = a.rules[d];
                                        h = a.groupOp.toString().toUpperCase();
                                        if (o[i.op] && i.field) {
                                            b > 0 && h && h === "OR" && (q = q.or());
                                            q = o[i.op](q,
                                                h)(i.field, i.data, f[i.field])
                                        }
                                        b++
                                    }
                                    g && q.orEnd()
                                } catch (ra) {
                                    alert(ra)
                                }
                            }

                            var d = a.p.multiSort ? [] : "", e = [], g = false, f = {}, h = [], i = [], j, k, m;
                            if (b.isArray(a.p.data)) {
                                var l = a.p.grouping ? a.p.groupingView : false, t, n;
                                b.each(a.p.colModel, function () {
                                    k = this.sorttype || "text";
                                    if (k === "date" || k === "datetime") {
                                        if (this.formatter && typeof this.formatter === "string" && this.formatter === "date") {
                                            j = this.formatoptions && this.formatoptions.srcformat ? this.formatoptions.srcformat : b.jgrid.formatter.date.srcformat;
                                            m = this.formatoptions && this.formatoptions.newformat ?
                                                this.formatoptions.newformat : b.jgrid.formatter.date.newformat
                                        } else j = m = this.datefmt || "Y-m-d";
                                        f[this.name] = {stype: k, srcfmt: j, newfmt: m}
                                    } else f[this.name] = {stype: k, srcfmt: "", newfmt: ""};
                                    if (a.p.grouping) {
                                        n = 0;
                                        for (t = l.groupField.length; n < t; n++)if (this.name === l.groupField[n]) {
                                            var c = this.name;
                                            if (this.index)c = this.index;
                                            h[n] = f[c];
                                            i[n] = c
                                        }
                                    }
                                    if (a.p.multiSort) {
                                        if (this.lso) {
                                            d.push(this.name);
                                            c = this.lso.split("-");
                                            e.push(c[c.length - 1])
                                        }
                                    } else if (!g && (this.index === a.p.sortname || this.name === a.p.sortname)) {
                                        d = this.name;
                                        g = true
                                    }
                                });
                                if (a.p.treeGrid)b(a).jqGrid("SortTree", d, a.p.sortorder, f[d].stype || "text", f[d].srcfmt || ""); else {
                                    var o = {
                                        eq: function (a) {
                                            return a.equals
                                        }, ne: function (a) {
                                            return a.notEquals
                                        }, lt: function (a) {
                                            return a.less
                                        }, le: function (a) {
                                            return a.lessOrEquals
                                        }, gt: function (a) {
                                            return a.greater
                                        }, ge: function (a) {
                                            return a.greaterOrEquals
                                        }, cn: function (a) {
                                            return a.contains
                                        }, nc: function (a, b) {
                                            return b === "OR" ? a.orNot().contains : a.andNot().contains
                                        }, bw: function (a) {
                                            return a.startsWith
                                        }, bn: function (a, b) {
                                            return b === "OR" ? a.orNot().startsWith :
                                                a.andNot().startsWith
                                        }, en: function (a, b) {
                                            return b === "OR" ? a.orNot().endsWith : a.andNot().endsWith
                                        }, ew: function (a) {
                                            return a.endsWith
                                        }, ni: function (a, b) {
                                            return b === "OR" ? a.orNot().equals : a.andNot().equals
                                        }, "in": function (a) {
                                            return a.equals
                                        }, nu: function (a) {
                                            return a.isNull
                                        }, nn: function (a, b) {
                                            return b === "OR" ? a.orNot().isNull : a.andNot().isNull
                                        }
                                    }, q = b.jgrid.from(a.p.data);
                                    a.p.ignoreCase && (q = q.ignoreCase());
                                    if (a.p.search === true) {
                                        var v = a.p.postData.filters;
                                        if (v) {
                                            typeof v === "string" && (v = b.jgrid.parse(v));
                                            c(v)
                                        } else try {
                                            q =
                                                o[a.p.postData.searchOper](q)(a.p.postData.searchField, a.p.postData.searchString, f[a.p.postData.searchField])
                                        } catch (r) {
                                        }
                                    }
                                    if (a.p.grouping)for (n = 0; n < t; n++)q.orderBy(i[n], l.groupOrder[n], h[n].stype, h[n].srcfmt);
                                    a.p.multiSort ? b.each(d, function (a) {
                                        q.orderBy(this, e[a], f[this].stype, f[this].srcfmt)
                                    }) : d && a.p.sortorder && g && (a.p.sortorder.toUpperCase() === "DESC" ? q.orderBy(a.p.sortname, "d", f[d].stype, f[d].srcfmt) : q.orderBy(a.p.sortname, "a", f[d].stype, f[d].srcfmt));
                                    var v = q.select(), u = parseInt(a.p.rowNum, 10), x =
                                        v.length, w = parseInt(a.p.page, 10), z = Math.ceil(x / u), s = {}, v = v.slice((w - 1) * u, w * u), f = q = null;
                                    s[a.p.localReader.total] = z;
                                    s[a.p.localReader.page] = w;
                                    s[a.p.localReader.records] = x;
                                    s[a.p.localReader.root] = v;
                                    s[a.p.localReader.userdata] = a.p.userData;
                                    v = null;
                                    return s
                                }
                            }
                        }, S = function () {
                            a.grid.hDiv.loading = true;
                            if (!a.p.hiddengrid)switch (a.p.loadui) {
                                case "enable":
                                    b("#load_" + b.jgrid.jqID(a.p.id)).show();
                                    break;
                                case "block":
                                    b("#lui_" + b.jgrid.jqID(a.p.id)).show();
                                    b("#load_" + b.jgrid.jqID(a.p.id)).show()
                            }
                        }, Q = function () {
                            a.grid.hDiv.loading =
                                false;
                            switch (a.p.loadui) {
                                case "enable":
                                    b("#load_" + b.jgrid.jqID(a.p.id)).hide();
                                    break;
                                case "block":
                                    b("#lui_" + b.jgrid.jqID(a.p.id)).hide();
                                    b("#load_" + b.jgrid.jqID(a.p.id)).hide()
                            }
                        }, M = function (c) {
                            if (!a.grid.hDiv.loading) {
                                var d = a.p.scroll && c === false, e = {}, g, f = a.p.prmNames;
                                if (a.p.page <= 0)a.p.page = Math.min(1, a.p.lastpage);
                                if (f.search !== null)e[f.search] = a.p.search;
                                f.nd !== null && (e[f.nd] = (new Date).getTime());
                                if (f.rows !== null)e[f.rows] = a.p.rowNum;
                                if (f.page !== null)e[f.page] = a.p.page;
                                if (f.sort !== null)e[f.sort] =
                                    a.p.sortname;
                                if (f.order !== null)e[f.order] = a.p.sortorder;
                                if (a.p.rowTotal !== null && f.totalrows !== null)e[f.totalrows] = a.p.rowTotal;
                                var h = b.isFunction(a.p.loadComplete), i = h ? a.p.loadComplete : null, j = 0, c = c || 1;
                                if (c > 1)if (f.npage !== null) {
                                    e[f.npage] = c;
                                    j = c - 1;
                                    c = 1
                                } else i = function (b) {
                                    a.p.page++;
                                    a.grid.hDiv.loading = false;
                                    h && a.p.loadComplete.call(a, b);
                                    M(c - 1)
                                }; else f.npage !== null && delete a.p.postData[f.npage];
                                if (a.p.grouping) {
                                    b(a).jqGrid("groupingSetup");
                                    var k = a.p.groupingView, m, n = "";
                                    for (m = 0; m < k.groupField.length; m++) {
                                        var l =
                                            k.groupField[m];
                                        b.each(a.p.colModel, function (a, b) {
                                            if (b.name === l && b.index)l = b.index
                                        });
                                        n = n + (l + " " + k.groupOrder[m] + ", ")
                                    }
                                    e[f.sort] = n + e[f.sort]
                                }
                                b.extend(a.p.postData, e);
                                var o = !a.p.scroll ? 1 : a.rows.length - 1, e = b(a).triggerHandler("jqGridBeforeRequest");
                                if (!(e === false || e === "stop"))if (b.isFunction(a.p.datatype))a.p.datatype.call(a, a.p.postData, "load_" + a.p.id, o, c, j); else {
                                    if (b.isFunction(a.p.beforeRequest)) {
                                        e = a.p.beforeRequest.call(a);
                                        e === void 0 && (e = true);
                                        if (e === false)return
                                    }
                                    g = a.p.datatype.toLowerCase();
                                    switch (g) {
                                        case "json":
                                        case "jsonp":
                                        case "xml":
                                        case "script":
                                            b.ajax(b.extend({
                                                url: a.p.url,
                                                type: a.p.mtype,
                                                dataType: g,
                                                data: b.isFunction(a.p.serializeGridData) ? a.p.serializeGridData.call(a, a.p.postData) : a.p.postData,
                                                success: function (e, f, h) {
                                                    if (b.isFunction(a.p.beforeProcessing) && a.p.beforeProcessing.call(a, e, f, h) === false)Q(); else {
                                                        g === "xml" ? H(e, a.grid.bDiv, o, c > 1, j) : U(e, a.grid.bDiv, o, c > 1, j);
                                                        b(a).triggerHandler("jqGridLoadComplete", [e]);
                                                        i && i.call(a, e);
                                                        b(a).triggerHandler("jqGridAfterLoadComplete", [e]);
                                                        d && a.grid.populateVisible();
                                                        if (a.p.loadonce || a.p.treeGrid)a.p.datatype = "local";
                                                        c === 1 && Q()
                                                    }
                                                },
                                                error: function (d, e, f) {
                                                    b.isFunction(a.p.loadError) && a.p.loadError.call(a, d, e, f);
                                                    c === 1 && Q()
                                                },
                                                beforeSend: function (c, d) {
                                                    var e = true;
                                                    b.isFunction(a.p.loadBeforeSend) && (e = a.p.loadBeforeSend.call(a, c, d));
                                                    e === void 0 && (e = true);
                                                    if (e === false)return false;
                                                    S()
                                                }
                                            }, b.jgrid.ajaxOptions, a.p.ajaxGridOptions));
                                            break;
                                        case "xmlstring":
                                            S();
                                            e = typeof a.p.datastr !== "string" ? a.p.datastr : b.parseXML(a.p.datastr);
                                            H(e, a.grid.bDiv);
                                            b(a).triggerHandler("jqGridLoadComplete", [e]);
                                            h && a.p.loadComplete.call(a, e);
                                            b(a).triggerHandler("jqGridAfterLoadComplete",
                                                [e]);
                                            a.p.datatype = "local";
                                            a.p.datastr = null;
                                            Q();
                                            break;
                                        case "jsonstring":
                                            S();
                                            e = typeof a.p.datastr === "string" ? b.jgrid.parse(a.p.datastr) : a.p.datastr;
                                            U(e, a.grid.bDiv);
                                            b(a).triggerHandler("jqGridLoadComplete", [e]);
                                            h && a.p.loadComplete.call(a, e);
                                            b(a).triggerHandler("jqGridAfterLoadComplete", [e]);
                                            a.p.datatype = "local";
                                            a.p.datastr = null;
                                            Q();
                                            break;
                                        case "local":
                                        case "clientside":
                                            S();
                                            a.p.datatype = "local";
                                            e = ka();
                                            U(e, a.grid.bDiv, o, c > 1, j);
                                            b(a).triggerHandler("jqGridLoadComplete", [e]);
                                            i && i.call(a, e);
                                            b(a).triggerHandler("jqGridAfterLoadComplete",
                                                [e]);
                                            d && a.grid.populateVisible();
                                            Q()
                                    }
                                }
                            }
                        }, ea = function (c) {
                            b("#cb_" + b.jgrid.jqID(a.p.id), a.grid.hDiv)[a.p.useProp ? "prop" : "attr"]("checked", c);
                            if (a.p.frozenColumns && a.p.id + "_frozen")b("#cb_" + b.jgrid.jqID(a.p.id), a.grid.fhDiv)[a.p.useProp ? "prop" : "attr"]("checked", c)
                        }, la = function (c, d) {
                            var e = "", f = "<table cellspacing='0' cellpadding='0' border='0' style='table-layout:auto;' class='ui-pg-table'><tbody><tr>", i = "", j, k, m, l, o = function (c) {
                                var d;
                                b.isFunction(a.p.onPaging) && (d = a.p.onPaging.call(a, c));
                                if (d === "stop")return false;
                                a.p.selrow = null;
                                if (a.p.multiselect) {
                                    a.p.selarrrow = [];
                                    ea(false)
                                }
                                a.p.savedRow = [];
                                return true
                            }, c = c.substr(1), d = d + ("_" + c);
                            j = "pg_" + c;
                            k = c + "_left";
                            m = c + "_center";
                            l = c + "_right";
                            b("#" + b.jgrid.jqID(c)).append("<div id='" + j + "' class='ui-pager-control' role='group'><table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='width:100%;table-layout:fixed;height:100%;' role='row'><tbody><tr><td id='" + k + "' align='left'></td><td id='" + m + "' align='center' style='white-space:pre;'></td><td id='" + l + "' align='right'></td></tr></tbody></table></div>").attr("dir",
                                "ltr");
                            if (a.p.rowList.length > 0) {
                                i = "<td dir='" + g + "'>";
                                i = i + "<select class='ui-pg-selbox' role='listbox'>";
                                for (k = 0; k < a.p.rowList.length; k++)i = i + ('<option role="option" value="' + a.p.rowList[k] + '"' + (a.p.rowNum === a.p.rowList[k] ? ' selected="selected"' : "") + ">" + a.p.rowList[k] + "</option>");
                                i = i + "</select></td>"
                            }
                            g === "rtl" && (f = f + i);
                            a.p.pginput === true && (e = "<td dir='" + g + "'>" + b.jgrid.format(a.p.pgtext || "", "<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" +
                                    b.jgrid.jqID(c) + "'></span>") + "</td>");
                            if (a.p.pgbuttons === true) {
                                k = ["first" + d, "prev" + d, "next" + d, "last" + d];
                                g === "rtl" && k.reverse();
                                f = f + ("<td id='" + k[0] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-first'></span></td>");
                                f = f + ("<td id='" + k[1] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-prev'></span></td>");
                                f = f + (e !== "" ? "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>" + e + "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>" :
                                        "") + ("<td id='" + k[2] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-next'></span></td>");
                                f = f + ("<td id='" + k[3] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-end'></span></td>")
                            } else e !== "" && (f = f + e);
                            g === "ltr" && (f = f + i);
                            f = f + "</tr></tbody></table>";
                            a.p.viewrecords === true && b("td#" + c + "_" + a.p.recordpos, "#" + j).append("<div dir='" + g + "' style='text-align:" + a.p.recordpos + "' class='ui-paging-info'></div>");
                            b("td#" + c + "_" + a.p.pagerpos, "#" + j).append(f);
                            i = b(".ui-jqgrid").css("font-size") ||
                                "11px";
                            b(document.body).append("<div id='testpg' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:" + i + ";visibility:hidden;' ></div>");
                            f = b(f).clone().appendTo("#testpg").width();
                            b("#testpg").remove();
                            if (f > 0) {
                                e !== "" && (f = f + 50);
                                b("td#" + c + "_" + a.p.pagerpos, "#" + j).width(f)
                            }
                            a.p._nvtd = [];
                            a.p._nvtd[0] = f ? Math.floor((a.p.width - f) / 2) : Math.floor(a.p.width / 3);
                            a.p._nvtd[1] = 0;
                            f = null;
                            b(".ui-pg-selbox", "#" + j).bind("change", function () {
                                if (!o("records"))return false;
                                a.p.page = Math.round(a.p.rowNum * (a.p.page -
                                        1) / this.value - 0.5) + 1;
                                a.p.rowNum = this.value;
                                a.p.pager && b(".ui-pg-selbox", a.p.pager).val(this.value);
                                a.p.toppager && b(".ui-pg-selbox", a.p.toppager).val(this.value);
                                M();
                                return false
                            });
                            if (a.p.pgbuttons === true) {
                                b(".ui-pg-button", "#" + j).hover(function () {
                                    if (b(this).hasClass("ui-state-disabled"))this.style.cursor = "default"; else {
                                        b(this).addClass("ui-state-hover");
                                        this.style.cursor = "pointer"
                                    }
                                }, function () {
                                    if (!b(this).hasClass("ui-state-disabled")) {
                                        b(this).removeClass("ui-state-hover");
                                        this.style.cursor = "default"
                                    }
                                });
                                b("#first" + b.jgrid.jqID(d) + ", #prev" + b.jgrid.jqID(d) + ", #next" + b.jgrid.jqID(d) + ", #last" + b.jgrid.jqID(d)).click(function () {
                                    var b = n(a.p.page, 1), c = n(a.p.lastpage, 1), e = false, f = true, g = true, h = true, i = true;
                                    if (c === 0 || c === 1)i = h = g = f = false; else if (c > 1 && b >= 1)if (b === 1)g = f = false; else {
                                        if (b === c)i = h = false
                                    } else if (c > 1 && b === 0) {
                                        i = h = false;
                                        b = c - 1
                                    }
                                    if (!o(this.id))return false;
                                    if (this.id === "first" + d && f) {
                                        a.p.page = 1;
                                        e = true
                                    }
                                    if (this.id === "prev" + d && g) {
                                        a.p.page = b - 1;
                                        e = true
                                    }
                                    if (this.id === "next" + d && h) {
                                        a.p.page = b + 1;
                                        e = true
                                    }
                                    if (this.id ===
                                        "last" + d && i) {
                                        a.p.page = c;
                                        e = true
                                    }
                                    e && M();
                                    return false
                                })
                            }
                            a.p.pginput === true && b("input.ui-pg-input", "#" + j).keypress(function (c) {
                                if ((c.charCode || c.keyCode || 0) === 13) {
                                    if (!o("user"))return false;
                                    b(this).val(n(b(this).val(), 1));
                                    a.p.page = b(this).val() > 0 ? b(this).val() : a.p.page;
                                    M();
                                    return false
                                }
                                return this
                            })
                        }, sa = function (c, d) {
                            var e, f = "", g = a.p.colModel, h = false, i;
                            i = a.p.frozenColumns ? d : a.grid.headers[c].el;
                            var j = "";
                            b("span.ui-grid-ico-sort", i).addClass("ui-state-disabled");
                            b(i).attr("aria-selected", "false");
                            if (g[c].lso)if (g[c].lso ===
                                "asc") {
                                g[c].lso = g[c].lso + "-desc";
                                j = "desc"
                            } else if (g[c].lso === "desc") {
                                g[c].lso = g[c].lso + "-asc";
                                j = "asc"
                            } else {
                                if (g[c].lso === "asc-desc" || g[c].lso === "desc-asc")g[c].lso = ""
                            } else g[c].lso = j = g[c].firstsortorder || "asc";
                            if (j) {
                                b("span.s-ico", i).show();
                                b("span.ui-icon-" + j, i).removeClass("ui-state-disabled");
                                b(i).attr("aria-selected", "true")
                            } else a.p.viewsortcols[0] || b("span.s-ico", i).hide();
                            a.p.sortorder = "";
                            b.each(g, function (b) {
                                if (this.lso) {
                                    b > 0 && h && (f = f + ", ");
                                    e = this.lso.split("-");
                                    f = f + (g[b].index || g[b].name);
                                    f = f + (" " + e[e.length - 1]);
                                    h = true;
                                    a.p.sortorder = e[e.length - 1]
                                }
                            });
                            i = f.lastIndexOf(a.p.sortorder);
                            f = f.substring(0, i);
                            a.p.sortname = f
                        }, ma = function (c, d, e, f, g) {
                            if (a.p.colModel[d].sortable && !(a.p.savedRow.length > 0)) {
                                if (!e) {
                                    if (a.p.lastsort === d)if (a.p.sortorder === "asc")a.p.sortorder = "desc"; else {
                                        if (a.p.sortorder === "desc")a.p.sortorder = "asc"
                                    } else a.p.sortorder = a.p.colModel[d].firstsortorder || "asc";
                                    a.p.page = 1
                                }
                                if (a.p.multiSort)sa(d, g); else {
                                    if (f) {
                                        if (a.p.lastsort === d && a.p.sortorder === f && !e)return;
                                        a.p.sortorder = f
                                    }
                                    e =
                                        a.grid.headers[a.p.lastsort].el;
                                    g = a.p.frozenColumns ? g : a.grid.headers[d].el;
                                    b("span.ui-grid-ico-sort", e).addClass("ui-state-disabled");
                                    b(e).attr("aria-selected", "false");
                                    if (a.p.frozenColumns) {
                                        a.grid.fhDiv.find("span.ui-grid-ico-sort").addClass("ui-state-disabled");
                                        a.grid.fhDiv.find("th").attr("aria-selected", "false")
                                    }
                                    b("span.ui-icon-" + a.p.sortorder, g).removeClass("ui-state-disabled");
                                    b(g).attr("aria-selected", "true");
                                    if (!a.p.viewsortcols[0] && a.p.lastsort !== d) {
                                        a.p.frozenColumns && a.grid.fhDiv.find("span.s-ico").hide();
                                        b("span.s-ico", e).hide();
                                        b("span.s-ico", g).show()
                                    }
                                    c = c.substring(5 + a.p.id.length + 1);
                                    a.p.sortname = a.p.colModel[d].index || c
                                }
                                if (b(a).triggerHandler("jqGridSortCol", [a.p.sortname, d, a.p.sortorder]) === "stop")a.p.lastsort = d; else if (b.isFunction(a.p.onSortCol) && a.p.onSortCol.call(a, a.p.sortname, d, a.p.sortorder) === "stop")a.p.lastsort = d; else {
                                    if (a.p.datatype === "local")a.p.deselectAfterSort && b(a).jqGrid("resetSelection"); else {
                                        a.p.selrow = null;
                                        a.p.multiselect && ea(false);
                                        a.p.selarrrow = [];
                                        a.p.savedRow = []
                                    }
                                    if (a.p.scroll) {
                                        g =
                                            a.grid.bDiv.scrollLeft;
                                        W.call(a, true, false);
                                        a.grid.hDiv.scrollLeft = g
                                    }
                                    a.p.subGrid && a.p.datatype === "local" && b("td.sgexpanded", "#" + b.jgrid.jqID(a.p.id)).each(function () {
                                        b(this).trigger("click")
                                    });
                                    M();
                                    a.p.lastsort = d;
                                    if (a.p.sortname !== c && d)a.p.lastsort = d
                                }
                            }
                        }, ta = function (c) {
                            c = b(a.grid.headers[c].el);
                            c = [c.position().left + c.outerWidth()];
                            a.p.direction === "rtl" && (c[0] = a.p.width - c[0]);
                            c[0] = c[0] - a.grid.bDiv.scrollLeft;
                            c.push(b(a.grid.hDiv).position().top);
                            c.push(b(a.grid.bDiv).offset().top - b(a.grid.hDiv).offset().top +
                                b(a.grid.bDiv).height());
                            return c
                        }, na = function (c) {
                            var d, e = a.grid.headers, f = b.jgrid.getCellIndex(c);
                            for (d = 0; d < e.length; d++)if (c === e[d].el) {
                                f = d;
                                break
                            }
                            return f
                        };
                        this.p.id = this.id;
                        -1 === b.inArray(a.p.multikey, ["shiftKey", "altKey", "ctrlKey"]) && (a.p.multikey = !1);
                        a.p.keyIndex = !1;
                        a.p.keyName = !1;
                        for (f = 0; f < a.p.colModel.length; f++)a.p.colModel[f] = b.extend(!0, {}, a.p.cmTemplate, a.p.colModel[f].template || {}, a.p.colModel[f]), !1 === a.p.keyIndex && !0 === a.p.colModel[f].key && (a.p.keyIndex = f);
                        a.p.sortorder = a.p.sortorder.toLowerCase();
                        b.jgrid.cell_width = b.jgrid.cellWidth();
                        !0 === a.p.grouping && (a.p.scroll = !1, a.p.rownumbers = !1, a.p.treeGrid = !1, a.p.gridview = !0);
                        if (!0 === this.p.treeGrid) {
                            try {
                                b(this).jqGrid("setTreeGrid")
                            } catch (wa) {
                            }
                            "local" !== a.p.datatype && (a.p.localReader = {id: "_id_"})
                        }
                        if (this.p.subGrid)try {
                            b(a).jqGrid("setSubGrid")
                        } catch (xa) {
                        }
                        this.p.multiselect && (this.p.colNames.unshift("<input role='checkbox' id='cb_" + this.p.id + "' class='cbox' type='checkbox'/>"), this.p.colModel.unshift({
                            name: "cb",
                            width: b.jgrid.cell_width ? a.p.multiselectWidth +
                            a.p.cellLayout : a.p.multiselectWidth,
                            sortable: !1,
                            resizable: !1,
                            hidedlg: !0,
                            search: !1,
                            align: "center",
                            fixed: !0
                        }));
                        this.p.rownumbers && (this.p.colNames.unshift(""), this.p.colModel.unshift({
                            name: "rn",
                            width: a.p.rownumWidth,
                            sortable: !1,
                            resizable: !1,
                            hidedlg: !0,
                            search: !1,
                            align: "center",
                            fixed: !0
                        }));
                        a.p.xmlReader = b.extend(!0, {
                                root: "rows",
                                row: "row",
                                page: "rows>page",
                                total: "rows>total",
                                records: "rows>records",
                                repeatitems: !0,
                                cell: "cell",
                                id: "[id]",
                                userdata: "userdata",
                                subgrid: {root: "rows", row: "row", repeatitems: !0, cell: "cell"}
                            },
                            a.p.xmlReader);
                        a.p.jsonReader = b.extend(!0, {
                            root: "rows",
                            page: "page",
                            total: "total",
                            records: "records",
                            repeatitems: !0,
                            cell: "cell",
                            id: "id",
                            userdata: "userdata",
                            subgrid: {root: "rows", repeatitems: !0, cell: "cell"}
                        }, a.p.jsonReader);
                        a.p.localReader = b.extend(!0, {
                            root: "rows",
                            page: "page",
                            total: "total",
                            records: "records",
                            repeatitems: !1,
                            cell: "cell",
                            id: "id",
                            userdata: "userdata",
                            subgrid: {root: "rows", repeatitems: !0, cell: "cell"}
                        }, a.p.localReader);
                        a.p.scroll && (a.p.pgbuttons = !1, a.p.pginput = !1, a.p.rowList = []);
                        a.p.data.length &&
                        P();
                        var x = "<thead><tr class='ui-jqgrid-labels' role='rowheader'>", oa, D, fa, ca, ga, w, o, X, pa = X = "", da = [], qa = [];
                        D = [];
                        if (!0 === a.p.shrinkToFit && !0 === a.p.forceFit)for (f = a.p.colModel.length - 1; 0 <= f; f--)if (!a.p.colModel[f].hidden) {
                            a.p.colModel[f].resizable = !1;
                            break
                        }
                        "horizontal" === a.p.viewsortcols[1] && (X = " ui-i-asc", pa = " ui-i-desc");
                        oa = k ? "class='ui-th-div-ie'" : "";
                        X = "<span class='s-ico' style='display:none'><span sort='asc' class='ui-grid-ico-sort ui-icon-asc" + X + " ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-" +
                            g + "'></span>" + ("<span sort='desc' class='ui-grid-ico-sort ui-icon-desc" + pa + " ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-" + g + "'></span></span>");
                        if (a.p.multiSort) {
                            da = a.p.sortname.split(",");
                            for (f = 0; f < da.length; f++)D = b.trim(da[f]).split(" "), da[f] = b.trim(D[0]), qa[f] = D[1] ? b.trim(D[1]) : a.p.sortorder || "asc"
                        }
                        for (f = 0; f < this.p.colNames.length; f++)D = a.p.headertitles ? ' title="' + b.jgrid.stripHtml(a.p.colNames[f]) + '"' : "", x += "<th id='" + a.p.id + "_" + a.p.colModel[f].name + "' role='columnheader' class='ui-state-default ui-th-column ui-th-" +
                            g + "'" + D + ">", D = a.p.colModel[f].index || a.p.colModel[f].name, x += "<div id='jqgh_" + a.p.id + "_" + a.p.colModel[f].name + "' " + oa + ">" + a.p.colNames[f], a.p.colModel[f].width = a.p.colModel[f].width ? parseInt(a.p.colModel[f].width, 10) : 150, "boolean" !== typeof a.p.colModel[f].title && (a.p.colModel[f].title = !0), a.p.colModel[f].lso = "", D === a.p.sortname && (a.p.lastsort = f), a.p.multiSort && (D = b.inArray(D, da), -1 !== D && (a.p.colModel[f].lso = qa[D])), x += X + "</div></th>";
                        X = null;
                        b(this).append(x + "</tr></thead>");
                        b("thead tr:first th",
                            this).hover(function () {
                                b(this).addClass("ui-state-hover")
                            }, function () {
                                b(this).removeClass("ui-state-hover")
                            });
                        if (this.p.multiselect) {
                            var ha = [], Y;
                            b("#cb_" + b.jgrid.jqID(a.p.id), this).bind("click", function () {
                                a.p.selarrrow = [];
                                var c = a.p.frozenColumns === true ? a.p.id + "_frozen" : "";
                                if (this.checked) {
                                    b(a.rows).each(function (d) {
                                        if (d > 0 && !b(this).hasClass("ui-subgrid") && !b(this).hasClass("jqgroup") && !b(this).hasClass("ui-state-disabled")) {
                                            b("#jqg_" + b.jgrid.jqID(a.p.id) + "_" + b.jgrid.jqID(this.id))[a.p.useProp ? "prop" :
                                                "attr"]("checked", true);
                                            b(this).addClass("ui-state-highlight").attr("aria-selected", "true");
                                            a.p.selarrrow.push(this.id);
                                            a.p.selrow = this.id;
                                            if (c) {
                                                b("#jqg_" + b.jgrid.jqID(a.p.id) + "_" + b.jgrid.jqID(this.id), a.grid.fbDiv)[a.p.useProp ? "prop" : "attr"]("checked", true);
                                                b("#" + b.jgrid.jqID(this.id), a.grid.fbDiv).addClass("ui-state-highlight")
                                            }
                                        }
                                    });
                                    Y = true;
                                    ha = []
                                } else {
                                    b(a.rows).each(function (d) {
                                        if (d > 0 && !b(this).hasClass("ui-subgrid") && !b(this).hasClass("ui-state-disabled")) {
                                            b("#jqg_" + b.jgrid.jqID(a.p.id) + "_" + b.jgrid.jqID(this.id))[a.p.useProp ?
                                                "prop" : "attr"]("checked", false);
                                            b(this).removeClass("ui-state-highlight").attr("aria-selected", "false");
                                            ha.push(this.id);
                                            if (c) {
                                                b("#jqg_" + b.jgrid.jqID(a.p.id) + "_" + b.jgrid.jqID(this.id), a.grid.fbDiv)[a.p.useProp ? "prop" : "attr"]("checked", false);
                                                b("#" + b.jgrid.jqID(this.id), a.grid.fbDiv).removeClass("ui-state-highlight")
                                            }
                                        }
                                    });
                                    a.p.selrow = null;
                                    Y = false
                                }
                                b(a).triggerHandler("jqGridSelectAll", [Y ? a.p.selarrrow : ha, Y]);
                                b.isFunction(a.p.onSelectAll) && a.p.onSelectAll.call(a, Y ? a.p.selarrrow : ha, Y)
                            })
                        }
                        !0 === a.p.autowidth &&
                        (x = b(m).innerWidth(), a.p.width = 0 < x ? x : "nw");
                        (function () {
                            var d = 0, e = b.jgrid.cell_width ? 0 : n(a.p.cellLayout, 0), f = 0, g, h = n(a.p.scrollOffset, 0), j, k = false, m, l = 0, o;
                            b.each(a.p.colModel, function () {
                                if (this.hidden === void 0)this.hidden = false;
                                if (a.p.grouping && a.p.autowidth) {
                                    var c = b.inArray(this.name, a.p.groupingView.groupField);
                                    if (c >= 0 && a.p.groupingView.groupColumnShow.length > c)this.hidden = !a.p.groupingView.groupColumnShow[c]
                                }
                                this.widthOrg = j = n(this.width, 0);
                                if (this.hidden === false) {
                                    d = d + (j + e);
                                    this.fixed ? l = l + (j + e) :
                                        f++
                                }
                            });
                            if (isNaN(a.p.width))a.p.width = d + (a.p.shrinkToFit === false && !isNaN(a.p.height) ? h : 0);
                            c.width = a.p.width;
                            a.p.tblwidth = d;
                            if (a.p.shrinkToFit === false && a.p.forceFit === true)a.p.forceFit = false;
                            if (a.p.shrinkToFit === true && f > 0) {
                                m = c.width - e * f - l;
                                if (!isNaN(a.p.height)) {
                                    m = m - h;
                                    k = true
                                }
                                d = 0;
                                b.each(a.p.colModel, function (b) {
                                    if (this.hidden === false && !this.fixed) {
                                        this.width = j = Math.round(m * this.width / (a.p.tblwidth - e * f - l));
                                        d = d + j;
                                        g = b
                                    }
                                });
                                o = 0;
                                k ? c.width - l - (d + e * f) !== h && (o = c.width - l - (d + e * f) - h) : !k && Math.abs(c.width - l - (d + e * f)) !==
                                1 && (o = c.width - l - (d + e * f));
                                a.p.colModel[g].width = a.p.colModel[g].width + o;
                                a.p.tblwidth = d + o + e * f + l;
                                if (a.p.tblwidth > a.p.width) {
                                    a.p.colModel[g].width = a.p.colModel[g].width - (a.p.tblwidth - parseInt(a.p.width, 10));
                                    a.p.tblwidth = a.p.width
                                }
                            }
                        })();
                        b(m).css("width", c.width + "px").append("<div class='ui-jqgrid-resize-mark' id='rs_m" + a.p.id + "'>&#160;</div>");
                        b(j).css("width", c.width + "px");
                        var x = b("thead:first", a).get(0), N = "";
                        a.p.footerrow && (N += "<table role='grid' style='width:" + a.p.tblwidth + "px' class='ui-jqgrid-ftable' cellspacing='0' cellpadding='0' border='0'><tbody><tr role='row' class='ui-widget-content footrow footrow-" +
                            g + "'>");
                        var j = b("tr:first", x), aa = "<tr class='jqgfirstrow' role='row' style='height:auto'>";
                        a.p.disableClick = !1;
                        b("th", j).each(function (d) {
                            fa = a.p.colModel[d].width;
                            if (a.p.colModel[d].resizable === void 0)a.p.colModel[d].resizable = true;
                            if (a.p.colModel[d].resizable) {
                                ca = document.createElement("span");
                                b(ca).html("&#160;").addClass("ui-jqgrid-resize ui-jqgrid-resize-" + g).css("cursor", "col-resize");
                                b(this).addClass(a.p.resizeclass)
                            } else ca = "";
                            b(this).css("width", fa + "px").prepend(ca);
                            ca = null;
                            var e = "";
                            if (a.p.colModel[d].hidden) {
                                b(this).css("display",
                                    "none");
                                e = "display:none;"
                            }
                            aa = aa + ("<td role='gridcell' style='height:0px;width:" + fa + "px;" + e + "'></td>");
                            c.headers[d] = {width: fa, el: this};
                            ga = a.p.colModel[d].sortable;
                            if (typeof ga !== "boolean")ga = a.p.colModel[d].sortable = true;
                            e = a.p.colModel[d].name;
                            e === "cb" || e === "subgrid" || e === "rn" || a.p.viewsortcols[2] && b(">div", this).addClass("ui-jqgrid-sortable");
                            if (ga)if (a.p.multiSort)if (a.p.viewsortcols[0]) {
                                b("div span.s-ico", this).show();
                                a.p.colModel[d].lso && b("div span.ui-icon-" + a.p.colModel[d].lso, this).removeClass("ui-state-disabled")
                            } else {
                                if (a.p.colModel[d].lso) {
                                    b("div span.s-ico",
                                        this).show();
                                    b("div span.ui-icon-" + a.p.colModel[d].lso, this).removeClass("ui-state-disabled")
                                }
                            } else if (a.p.viewsortcols[0]) {
                                b("div span.s-ico", this).show();
                                d === a.p.lastsort && b("div span.ui-icon-" + a.p.sortorder, this).removeClass("ui-state-disabled")
                            } else if (d === a.p.lastsort) {
                                b("div span.s-ico", this).show();
                                b("div span.ui-icon-" + a.p.sortorder, this).removeClass("ui-state-disabled")
                            }
                            a.p.footerrow && (N = N + ("<td role='gridcell' " + l(d, 0, "", null, "", false) + ">&#160;</td>"))
                        }).mousedown(function (d) {
                            if (b(d.target).closest("th>span.ui-jqgrid-resize").length ===
                                1) {
                                var e = na(this);
                                if (a.p.forceFit === true) {
                                    var f = a.p, g = e, h;
                                    for (h = e + 1; h < a.p.colModel.length; h++)if (a.p.colModel[h].hidden !== true) {
                                        g = h;
                                        break
                                    }
                                    f.nv = g - e
                                }
                                c.dragStart(e, d, ta(e));
                                return false
                            }
                        }).click(function (c) {
                            if (a.p.disableClick)return a.p.disableClick = false;
                            var d = "th>div.ui-jqgrid-sortable", e, f;
                            a.p.viewsortcols[2] || (d = "th>div>span>span.ui-grid-ico-sort");
                            c = b(c.target).closest(d);
                            if (c.length === 1) {
                                var g;
                                if (a.p.frozenColumns) {
                                    var h = b(this)[0].id.substring(a.p.id.length + 1);
                                    b(a.p.colModel).each(function (a) {
                                        if (this.name ===
                                            h) {
                                            g = a;
                                            return false
                                        }
                                    })
                                } else g = na(this);
                                if (!a.p.viewsortcols[2]) {
                                    e = true;
                                    f = c.attr("sort")
                                }
                                g != null && ma(b("div", this)[0].id, g, e, f, this);
                                return false
                            }
                        });
                        if (a.p.sortable && b.fn.sortable)try {
                            b(a).jqGrid("sortableColumns", j)
                        } catch (ya) {
                        }
                        a.p.footerrow && (N += "</tr></tbody></table>");
                        aa += "</tr>";
                        this.appendChild(document.createElement("tbody"));
                        b(this).addClass("ui-jqgrid-btable").append(aa);
                        var aa = null, j = b("<table class='ui-jqgrid-htable' style='width:" + a.p.tblwidth + "px' role='grid' aria-labelledby='gbox_" + this.id +
                            "' cellspacing='0' cellpadding='0' border='0'></table>").append(x), G = a.p.caption && !0 === a.p.hiddengrid ? !0 : !1;
                        f = b("<div class='ui-jqgrid-hbox" + ("rtl" === g ? "-rtl" : "") + "'></div>");
                        x = null;
                        c.hDiv = document.createElement("div");
                        b(c.hDiv).css({width: c.width + "px"}).addClass("ui-state-default ui-jqgrid-hdiv").append(f);
                        b(f).append(j);
                        j = null;
                        G && b(c.hDiv).hide();
                        a.p.pager && ("string" === typeof a.p.pager ? "#" !== a.p.pager.substr(0, 1) && (a.p.pager = "#" + a.p.pager) : a.p.pager = "#" + b(a.p.pager).attr("id"), b(a.p.pager).css({
                            width: c.width +
                            "px"
                        }).addClass("ui-state-default ui-jqgrid-pager ui-corner-bottom").appendTo(m), G && b(a.p.pager).hide(), la(a.p.pager, ""));
                        !1 === a.p.cellEdit && !0 === a.p.hoverrows && b(a).bind("mouseover", function (a) {
                            o = b(a.target).closest("tr.jqgrow");
                            b(o).attr("class") !== "ui-subgrid" && b(o).addClass("ui-state-hover")
                        }).bind("mouseout", function (a) {
                            o = b(a.target).closest("tr.jqgrow");
                            b(o).removeClass("ui-state-hover")
                        });
                        var z, K, ia;
                        b(a).before(c.hDiv).click(function (c) {
                            w = c.target;
                            o = b(w, a.rows).closest("tr.jqgrow");
                            if (b(o).length ===
                                0 || o[0].className.indexOf("ui-state-disabled") > -1 || (b(w, a).closest("table.ui-jqgrid-btable").attr("id") || "").replace("_frozen", "") !== a.id)return this;
                            var d = b(w).hasClass("cbox"), e = b(a).triggerHandler("jqGridBeforeSelectRow", [o[0].id, c]);
                            (e = e === false || e === "stop" ? false : true) && b.isFunction(a.p.beforeSelectRow) && (e = a.p.beforeSelectRow.call(a, o[0].id, c));
                            if (!(w.tagName === "A" || (w.tagName === "INPUT" || w.tagName === "TEXTAREA" || w.tagName === "OPTION" || w.tagName === "SELECT") && !d) && e === true) {
                                z = o[0].id;
                                K = b.jgrid.getCellIndex(w);
                                ia = b(w).closest("td,th").html();
                                b(a).triggerHandler("jqGridCellSelect", [z, K, ia, c]);
                                b.isFunction(a.p.onCellSelect) && a.p.onCellSelect.call(a, z, K, ia, c);
                                if (a.p.cellEdit === true)if (a.p.multiselect && d)b(a).jqGrid("setSelection", z, true, c); else {
                                    z = o[0].rowIndex;
                                    try {
                                        b(a).jqGrid("editCell", z, K, true)
                                    } catch (f) {
                                    }
                                } else if (a.p.multikey)if (c[a.p.multikey])b(a).jqGrid("setSelection", z, true, c); else {
                                    if (a.p.multiselect && d) {
                                        d = b("#jqg_" + b.jgrid.jqID(a.p.id) + "_" + z).is(":checked");
                                        b("#jqg_" + b.jgrid.jqID(a.p.id) + "_" + z)[a.p.useProp ?
                                            "prop" : "attr"]("checked", d)
                                    }
                                } else {
                                    if (a.p.multiselect && a.p.multiboxonly && !d) {
                                        var g = a.p.frozenColumns ? a.p.id + "_frozen" : "";
                                        b(a.p.selarrrow).each(function (c, d) {
                                            var e = b(a).jqGrid("getGridRowById", d);
                                            b(e).removeClass("ui-state-highlight");
                                            b("#jqg_" + b.jgrid.jqID(a.p.id) + "_" + b.jgrid.jqID(d))[a.p.useProp ? "prop" : "attr"]("checked", false);
                                            if (g) {
                                                b("#" + b.jgrid.jqID(d), "#" + b.jgrid.jqID(g)).removeClass("ui-state-highlight");
                                                b("#jqg_" + b.jgrid.jqID(a.p.id) + "_" + b.jgrid.jqID(d), "#" + b.jgrid.jqID(g))[a.p.useProp ? "prop" :
                                                    "attr"]("checked", false)
                                            }
                                        });
                                        a.p.selarrrow = []
                                    }
                                    b(a).jqGrid("setSelection", z, true, c)
                                }
                            }
                        }).bind("reloadGrid", function (c, d) {
                            if (a.p.treeGrid === true)a.p.datatype = a.p.treedatatype;
                            d && d.current && a.grid.selectionPreserver(a);
                            if (a.p.datatype === "local") {
                                b(a).jqGrid("resetSelection");
                                a.p.data.length && P()
                            } else if (!a.p.treeGrid) {
                                a.p.selrow = null;
                                if (a.p.multiselect) {
                                    a.p.selarrrow = [];
                                    ea(false)
                                }
                                a.p.savedRow = []
                            }
                            a.p.scroll && W.call(a, true, false);
                            if (d && d.page) {
                                var e = d.page;
                                if (e > a.p.lastpage)e = a.p.lastpage;
                                e < 1 && (e = 1);
                                a.p.page =
                                    e;
                                a.grid.bDiv.scrollTop = a.grid.prevRowHeight ? (e - 1) * a.grid.prevRowHeight * a.p.rowNum : 0
                            }
                            if (a.grid.prevRowHeight && a.p.scroll) {
                                delete a.p.lastpage;
                                a.grid.populateVisible()
                            } else a.grid.populate();
                            a.p._inlinenav === true && b(a).jqGrid("showAddEditButtons");
                            return false
                        }).dblclick(function (c) {
                            w = c.target;
                            o = b(w, a.rows).closest("tr.jqgrow");
                            if (b(o).length !== 0) {
                                z = o[0].rowIndex;
                                K = b.jgrid.getCellIndex(w);
                                b(a).triggerHandler("jqGridDblClickRow", [b(o).attr("id"), z, K, c]);
                                b.isFunction(a.p.ondblClickRow) && a.p.ondblClickRow.call(a,
                                    b(o).attr("id"), z, K, c)
                            }
                        }).bind("contextmenu", function (c) {
                            w = c.target;
                            o = b(w, a.rows).closest("tr.jqgrow");
                            if (b(o).length !== 0) {
                                a.p.multiselect || b(a).jqGrid("setSelection", o[0].id, true, c);
                                z = o[0].rowIndex;
                                K = b.jgrid.getCellIndex(w);
                                b(a).triggerHandler("jqGridRightClickRow", [b(o).attr("id"), z, K, c]);
                                b.isFunction(a.p.onRightClickRow) && a.p.onRightClickRow.call(a, b(o).attr("id"), z, K, c)
                            }
                        });
                        c.bDiv = document.createElement("div");
                        k && "auto" === ("" + a.p.height).toLowerCase() && (a.p.height = "100%");
                        b(c.bDiv).append(b('<div style="position:relative;' +
                            (k && 8 > b.jgrid.msiever() ? "height:0.01%;" : "") + '"></div>').append("<div></div>").append(this)).addClass("ui-jqgrid-bdiv").css({
                            height: a.p.height + (isNaN(a.p.height) ? "" : "px"),
                            width: c.width + "px"
                        }).scroll(c.scrollGrid);
                        b("table:first", c.bDiv).css({width: a.p.tblwidth + "px"});
                        b.support.tbody || 2 === b("tbody", this).length && b("tbody:gt(0)", this).remove();
                        a.p.multikey && (b.jgrid.msie ? b(c.bDiv).bind("selectstart", function () {
                            return false
                        }) : b(c.bDiv).bind("mousedown", function () {
                            return false
                        }));
                        G && b(c.bDiv).hide();
                        c.cDiv =
                            document.createElement("div");
                        var ja = !0 === a.p.hidegrid ? b("<a role='link' class='ui-jqgrid-titlebar-close HeaderButton' />").hover(function () {
                            ja.addClass("ui-state-hover")
                        }, function () {
                            ja.removeClass("ui-state-hover")
                        }).append("<span class='ui-icon ui-icon-circle-triangle-n'></span>").css("rtl" === g ? "left" : "right", "0px") : "";
                        b(c.cDiv).append(ja).append("<span class='ui-jqgrid-title" + ("rtl" === g ? "-rtl" : "") + "'>" + a.p.caption + "</span>").addClass("ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix");
                        b(c.cDiv).insertBefore(c.hDiv);
                        a.p.toolbar[0] && (c.uDiv = document.createElement("div"), "top" === a.p.toolbar[1] ? b(c.uDiv).insertBefore(c.hDiv) : "bottom" === a.p.toolbar[1] && b(c.uDiv).insertAfter(c.hDiv), "both" === a.p.toolbar[1] ? (c.ubDiv = document.createElement("div"), b(c.uDiv).addClass("ui-userdata ui-state-default").attr("id", "t_" + this.id).insertBefore(c.hDiv), b(c.ubDiv).addClass("ui-userdata ui-state-default").attr("id", "tb_" + this.id).insertAfter(c.hDiv), G && b(c.ubDiv).hide()) : b(c.uDiv).width(c.width).addClass("ui-userdata ui-state-default").attr("id",
                            "t_" + this.id), G && b(c.uDiv).hide());
                        a.p.toppager && (a.p.toppager = b.jgrid.jqID(a.p.id) + "_toppager", c.topDiv = b("<div id='" + a.p.toppager + "'></div>")[0], a.p.toppager = "#" + a.p.toppager, b(c.topDiv).addClass("ui-state-default ui-jqgrid-toppager").width(c.width).insertBefore(c.hDiv), la(a.p.toppager, "_t"));
                        a.p.footerrow && (c.sDiv = b("<div class='ui-jqgrid-sdiv'></div>")[0], f = b("<div class='ui-jqgrid-hbox" + ("rtl" === g ? "-rtl" : "") + "'></div>"), b(c.sDiv).append(f).width(c.width).insertAfter(c.hDiv), b(f).append(N), c.footers =
                            b(".ui-jqgrid-ftable", c.sDiv)[0].rows[0].cells, a.p.rownumbers && (c.footers[0].className = "ui-state-default jqgrid-rownum"), G && b(c.sDiv).hide());
                        f = null;
                        if (a.p.caption) {
                            var ua = a.p.datatype;
                            !0 === a.p.hidegrid && (b(".ui-jqgrid-titlebar-close", c.cDiv).click(function (d) {
                                var e = b.isFunction(a.p.onHeaderClick), f = ".ui-jqgrid-bdiv, .ui-jqgrid-hdiv, .ui-jqgrid-pager, .ui-jqgrid-sdiv", g, h = this;
                                if (a.p.toolbar[0] === true) {
                                    a.p.toolbar[1] === "both" && (f = f + (", #" + b(c.ubDiv).attr("id")));
                                    f = f + (", #" + b(c.uDiv).attr("id"))
                                }
                                g =
                                    b(f, "#gview_" + b.jgrid.jqID(a.p.id)).length;
                                a.p.gridstate === "visible" ? b(f, "#gbox_" + b.jgrid.jqID(a.p.id)).slideUp("fast", function () {
                                    g--;
                                    if (g === 0) {
                                        b("span", h).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s");
                                        a.p.gridstate = "hidden";
                                        b("#gbox_" + b.jgrid.jqID(a.p.id)).hasClass("ui-resizable") && b(".ui-resizable-handle", "#gbox_" + b.jgrid.jqID(a.p.id)).hide();
                                        b(a).triggerHandler("jqGridHeaderClick", [a.p.gridstate, d]);
                                        e && (G || a.p.onHeaderClick.call(a, a.p.gridstate, d))
                                    }
                                }) : a.p.gridstate ===
                                "hidden" && b(f, "#gbox_" + b.jgrid.jqID(a.p.id)).slideDown("fast", function () {
                                    g--;
                                    if (g === 0) {
                                        b("span", h).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n");
                                        if (G) {
                                            a.p.datatype = ua;
                                            M();
                                            G = false
                                        }
                                        a.p.gridstate = "visible";
                                        b("#gbox_" + b.jgrid.jqID(a.p.id)).hasClass("ui-resizable") && b(".ui-resizable-handle", "#gbox_" + b.jgrid.jqID(a.p.id)).show();
                                        b(a).triggerHandler("jqGridHeaderClick", [a.p.gridstate, d]);
                                        e && (G || a.p.onHeaderClick.call(a, a.p.gridstate, d))
                                    }
                                });
                                return false
                            }), G && (a.p.datatype =
                                "local", b(".ui-jqgrid-titlebar-close", c.cDiv).trigger("click")))
                        } else b(c.cDiv).hide();
                        b(c.hDiv).after(c.bDiv).mousemove(function (a) {
                            if (c.resizing) {
                                c.dragMove(a);
                                return false
                            }
                        });
                        b(".ui-jqgrid-labels", c.hDiv).bind("selectstart", function () {
                            return false
                        });
                        b(document).bind("mouseup.jqGrid" + a.p.id, function () {
                            if (c.resizing) {
                                c.dragEnd();
                                return false
                            }
                            return true
                        });
                        a.formatCol = l;
                        a.sortData = ma;
                        a.updatepager = function (c, d) {
                            var e, f, g, h, i, j, k, m = "", l = a.p.pager ? "_" + b.jgrid.jqID(a.p.pager.substr(1)) : "", o = a.p.toppager ?
                            "_" + a.p.toppager.substr(1) : "";
                            g = parseInt(a.p.page, 10) - 1;
                            g < 0 && (g = 0);
                            g = g * parseInt(a.p.rowNum, 10);
                            i = g + a.p.reccount;
                            if (a.p.scroll) {
                                e = b("tbody:first > tr:gt(0)", a.grid.bDiv);
                                g = i - e.length;
                                a.p.reccount = e.length;
                                if (e = e.outerHeight() || a.grid.prevRowHeight) {
                                    f = g * e;
                                    k = parseInt(a.p.records, 10) * e;
                                    b(">div:first", a.grid.bDiv).css({height: k}).children("div:first").css({
                                        height: f,
                                        display: f ? "" : "none"
                                    });
                                    if (a.grid.bDiv.scrollTop == 0 && a.p.page > 1)a.grid.bDiv.scrollTop = a.p.rowNum * (a.p.page - 1) * e
                                }
                                a.grid.bDiv.scrollLeft = a.grid.hDiv.scrollLeft
                            }
                            m =
                                a.p.pager || "";
                            if (m = m + (a.p.toppager ? m ? "," + a.p.toppager : a.p.toppager : "")) {
                                k = b.jgrid.formatter.integer || {};
                                e = n(a.p.page);
                                f = n(a.p.lastpage);
                                b(".selbox", m)[this.p.useProp ? "prop" : "attr"]("disabled", false);
                                if (a.p.pginput === true) {
                                    b(".ui-pg-input", m).val(a.p.page);
                                    h = a.p.toppager ? "#sp_1" + l + ",#sp_1" + o : "#sp_1" + l;
                                    b(h).html(b.fmatter ? b.fmatter.util.NumberFormat(a.p.lastpage, k) : a.p.lastpage)
                                }
                                if (a.p.viewrecords)if (a.p.reccount === 0)b(".ui-paging-info", m).html(a.p.emptyrecords); else {
                                    h = g + 1;
                                    j = a.p.records;
                                    if (b.fmatter) {
                                        h =
                                            b.fmatter.util.NumberFormat(h, k);
                                        i = b.fmatter.util.NumberFormat(i, k);
                                        j = b.fmatter.util.NumberFormat(j, k)
                                    }
                                    b(".ui-paging-info", m).html(b.jgrid.format(a.p.recordtext, h, i, j))
                                }
                                if (a.p.pgbuttons === true) {
                                    e <= 0 && (e = f = 0);
                                    if (e === 1 || e === 0) {
                                        b("#first" + l + ", #prev" + l).addClass("ui-state-disabled").removeClass("ui-state-hover");
                                        a.p.toppager && b("#first_t" + o + ", #prev_t" + o).addClass("ui-state-disabled").removeClass("ui-state-hover")
                                    } else {
                                        b("#first" + l + ", #prev" + l).removeClass("ui-state-disabled");
                                        a.p.toppager && b("#first_t" +
                                            o + ", #prev_t" + o).removeClass("ui-state-disabled")
                                    }
                                    if (e === f || e === 0) {
                                        b("#next" + l + ", #last" + l).addClass("ui-state-disabled").removeClass("ui-state-hover");
                                        a.p.toppager && b("#next_t" + o + ", #last_t" + o).addClass("ui-state-disabled").removeClass("ui-state-hover")
                                    } else {
                                        b("#next" + l + ", #last" + l).removeClass("ui-state-disabled");
                                        a.p.toppager && b("#next_t" + o + ", #last_t" + o).removeClass("ui-state-disabled")
                                    }
                                }
                            }
                            c === true && a.p.rownumbers === true && b(">td.jqgrid-rownum", a.rows).each(function (a) {
                                b(this).html(g + 1 + a)
                            });
                            d &&
                            a.p.jqgdnd && b(a).jqGrid("gridDnD", "updateDnD");
                            b(a).triggerHandler("jqGridGridComplete");
                            b.isFunction(a.p.gridComplete) && a.p.gridComplete.call(a);
                            b(a).triggerHandler("jqGridAfterGridComplete")
                        };
                        a.refreshIndex = P;
                        a.setHeadCheckBox = ea;
                        a.constructTr = Z;
                        a.formatter = function (a, b, c, d, e) {
                            return u(a, b, c, d, e)
                        };
                        b.extend(c, {populate: M, emptyRows: W, beginReq: S, endReq: Q});
                        this.grid = c;
                        a.addXmlData = function (b) {
                            H(b, a.grid.bDiv)
                        };
                        a.addJSONData = function (b) {
                            U(b, a.grid.bDiv)
                        };
                        this.grid.cols = this.rows[0].cells;
                        b(a).triggerHandler("jqGridInitGrid");
                        b.isFunction(a.p.onInitGrid) && a.p.onInitGrid.call(a);
                        M();
                        a.p.hiddengrid = !1
                    }
                }
            }
        })
    };
    b.jgrid.extend({
        getGridParam: function (b) {
            var g = this[0];
            return !g || !g.grid ? void 0 : !b ? g.p : void 0 !== g.p[b] ? g.p[b] : null
        }, setGridParam: function (d) {
            return this.each(function () {
                this.grid && "object" === typeof d && b.extend(!0, this.p, d)
            })
        }, getGridRowById: function (d) {
            var g;
            this.each(function () {
                try {
                    g = this.rows.namedItem(d)
                } catch (c) {
                    g = b(this.grid.bDiv).find("#" + b.jgrid.jqID(d))
                }
            });
            return g
        }, getDataIDs: function () {
            var d = [], g = 0, c, e = 0;
            this.each(function () {
                if ((c =
                        this.rows.length) && 0 < c)for (; g < c;)b(this.rows[g]).hasClass("jqgrow") && (d[e] = this.rows[g].id, e++), g++
            });
            return d
        }, setSelection: function (d, g, c) {
            return this.each(function () {
                var e, a, i, f, h, j;
                if (void 0 !== d && (g = !1 === g ? !1 : !0, (a = b(this).jqGrid("getGridRowById", d)) && a.className && !(-1 < a.className.indexOf("ui-state-disabled"))))if (!0 === this.p.scrollrows && (i = b(this).jqGrid("getGridRowById", d).rowIndex, 0 <= i && (e = b(this.grid.bDiv)[0].clientHeight, f = b(this.grid.bDiv)[0].scrollTop, h = b(this.rows[i]).position().top, i =
                        this.rows[i].clientHeight, h + i >= e + f ? b(this.grid.bDiv)[0].scrollTop = h - (e + f) + i + f : h < e + f && h < f && (b(this.grid.bDiv)[0].scrollTop = h))), !0 === this.p.frozenColumns && (j = this.p.id + "_frozen"), this.p.multiselect) {
                    if (this.setHeadCheckBox(!1), this.p.selrow = a.id, f = b.inArray(this.p.selrow, this.p.selarrrow), -1 === f ? ("ui-subgrid" !== a.className && b(a).addClass("ui-state-highlight").attr("aria-selected", "true"), e = !0, this.p.selarrrow.push(this.p.selrow)) : ("ui-subgrid" !== a.className && b(a).removeClass("ui-state-highlight").attr("aria-selected",
                            "false"), e = !1, this.p.selarrrow.splice(f, 1), h = this.p.selarrrow[0], this.p.selrow = void 0 === h ? null : h), b("#jqg_" + b.jgrid.jqID(this.p.id) + "_" + b.jgrid.jqID(a.id))[this.p.useProp ? "prop" : "attr"]("checked", e), j && (-1 === f ? b("#" + b.jgrid.jqID(d), "#" + b.jgrid.jqID(j)).addClass("ui-state-highlight") : b("#" + b.jgrid.jqID(d), "#" + b.jgrid.jqID(j)).removeClass("ui-state-highlight"), b("#jqg_" + b.jgrid.jqID(this.p.id) + "_" + b.jgrid.jqID(d), "#" + b.jgrid.jqID(j))[this.p.useProp ? "prop" : "attr"]("checked", e)), g)b(this).triggerHandler("jqGridSelectRow",
                        [a.id, e, c]), this.p.onSelectRow && this.p.onSelectRow.call(this, a.id, e, c)
                } else if ("ui-subgrid" !== a.className && (this.p.selrow !== a.id ? (b(b(this).jqGrid("getGridRowById", this.p.selrow)).removeClass("ui-state-highlight").attr({
                        "aria-selected": "false",
                        tabindex: "-1"
                    }), b(a).addClass("ui-state-highlight").attr({
                        "aria-selected": "true",
                        tabindex: "0"
                    }), j && (b("#" + b.jgrid.jqID(this.p.selrow), "#" + b.jgrid.jqID(j)).removeClass("ui-state-highlight"), b("#" + b.jgrid.jqID(d), "#" + b.jgrid.jqID(j)).addClass("ui-state-highlight")),
                        e = !0) : e = !1, this.p.selrow = a.id, g))b(this).triggerHandler("jqGridSelectRow", [a.id, e, c]), this.p.onSelectRow && this.p.onSelectRow.call(this, a.id, e, c)
            })
        }, resetSelection: function (d) {
            return this.each(function () {
                var g = this, c, e;
                !0 === g.p.frozenColumns && (e = g.p.id + "_frozen");
                if (void 0 !== d) {
                    c = d === g.p.selrow ? g.p.selrow : d;
                    b("#" + b.jgrid.jqID(g.p.id) + " tbody:first tr#" + b.jgrid.jqID(c)).removeClass("ui-state-highlight").attr("aria-selected", "false");
                    e && b("#" + b.jgrid.jqID(c), "#" + b.jgrid.jqID(e)).removeClass("ui-state-highlight");
                    if (g.p.multiselect) {
                        b("#jqg_" + b.jgrid.jqID(g.p.id) + "_" + b.jgrid.jqID(c), "#" + b.jgrid.jqID(g.p.id))[g.p.useProp ? "prop" : "attr"]("checked", !1);
                        if (e)b("#jqg_" + b.jgrid.jqID(g.p.id) + "_" + b.jgrid.jqID(c), "#" + b.jgrid.jqID(e))[g.p.useProp ? "prop" : "attr"]("checked", !1);
                        g.setHeadCheckBox(!1)
                    }
                    c = null
                } else g.p.multiselect ? (b(g.p.selarrrow).each(function (a, c) {
                    b(b(g).jqGrid("getGridRowById", c)).removeClass("ui-state-highlight").attr("aria-selected", "false");
                    b("#jqg_" + b.jgrid.jqID(g.p.id) + "_" + b.jgrid.jqID(c))[g.p.useProp ?
                        "prop" : "attr"]("checked", !1);
                    e && (b("#" + b.jgrid.jqID(c), "#" + b.jgrid.jqID(e)).removeClass("ui-state-highlight"), b("#jqg_" + b.jgrid.jqID(g.p.id) + "_" + b.jgrid.jqID(c), "#" + b.jgrid.jqID(e))[g.p.useProp ? "prop" : "attr"]("checked", !1))
                }), g.setHeadCheckBox(!1), g.p.selarrrow = []) : g.p.selrow && (b("#" + b.jgrid.jqID(g.p.id) + " tbody:first tr#" + b.jgrid.jqID(g.p.selrow)).removeClass("ui-state-highlight").attr("aria-selected", "false"), e && b("#" + b.jgrid.jqID(g.p.selrow), "#" + b.jgrid.jqID(e)).removeClass("ui-state-highlight"),
                    g.p.selrow = null);
                !0 === g.p.cellEdit && 0 <= parseInt(g.p.iCol, 10) && 0 <= parseInt(g.p.iRow, 10) && (b("td:eq(" + g.p.iCol + ")", g.rows[g.p.iRow]).removeClass("edit-cell ui-state-highlight"), b(g.rows[g.p.iRow]).removeClass("selected-row ui-state-hover"));
                g.p.savedRow = []
            })
        }, getRowData: function (d) {
            var g = {}, c, e = !1, a, i = 0;
            this.each(function () {
                var f = this, h, j;
                if (void 0 === d)e = !0, c = [], a = f.rows.length; else {
                    j = b(f).jqGrid("getGridRowById", d);
                    if (!j)return g;
                    a = 2
                }
                for (; i < a;)e && (j = f.rows[i]), b(j).hasClass("jqgrow") && (b('td[role="gridcell"]',
                    j).each(function (a) {
                        h = f.p.colModel[a].name;
                        if ("cb" !== h && "subgrid" !== h && "rn" !== h)if (!0 === f.p.treeGrid && h === f.p.ExpandColumn)g[h] = b.jgrid.htmlDecode(b("span:first", this).html()); else try {
                            g[h] = b.unformat.call(f, this, {rowId: j.id, colModel: f.p.colModel[a]}, a)
                        } catch (c) {
                            g[h] = b.jgrid.htmlDecode(b(this).html())
                        }
                    }), e && (c.push(g), g = {})), i++
            });
            return c || g
        }, delRowData: function (d) {
            var g = !1, c, e;
            this.each(function () {
                c = b(this).jqGrid("getGridRowById", d);
                if (!c)return !1;
                b(c).remove();
                this.p.records--;
                this.p.reccount--;
                this.updatepager(!0, !1);
                g = !0;
                this.p.multiselect && (e = b.inArray(d, this.p.selarrrow), -1 !== e && this.p.selarrrow.splice(e, 1));
                this.p.selrow = this.p.multiselect && 0 < this.p.selarrrow.length ? this.p.selarrrow[this.p.selarrrow.length - 1] : null;
                if ("local" === this.p.datatype) {
                    var a = this.p._index[b.jgrid.stripPref(this.p.idPrefix, d)];
                    void 0 !== a && (this.p.data.splice(a, 1), this.refreshIndex())
                }
                if (!0 === this.p.altRows && g) {
                    var i = this.p.altclass;
                    b(this.rows).each(function (a) {
                        a % 2 === 1 ? b(this).addClass(i) : b(this).removeClass(i)
                    })
                }
            });
            return g
        }, setRowData: function (d, g, c) {
            var e, a = !0, i;
            this.each(function () {
                if (!this.grid)return !1;
                var f = this, h, j, k = typeof c, m = {};
                j = b(this).jqGrid("getGridRowById", d);
                if (!j)return !1;
                if (g)try {
                    if (b(this.p.colModel).each(function (a) {
                            e = this.name;
                            var c = b.jgrid.getAccessor(g, e);
                            void 0 !== c && (m[e] = this.formatter && "string" === typeof this.formatter && "date" === this.formatter ? b.unformat.date.call(f, c, this) : c, h = f.formatter(d, c, a, g, "edit"), i = this.title ? {title: b.jgrid.stripHtml(h)} : {}, !0 === f.p.treeGrid && e === f.p.ExpandColumn ?
                                b("td[role='gridcell']:eq(" + a + ") > span:first", j).html(h).attr(i) : b("td[role='gridcell']:eq(" + a + ")", j).html(h).attr(i))
                        }), "local" === f.p.datatype) {
                        var n = b.jgrid.stripPref(f.p.idPrefix, d), l = f.p._index[n], r;
                        if (f.p.treeGrid)for (r in f.p.treeReader)f.p.treeReader.hasOwnProperty(r) && delete m[f.p.treeReader[r]];
                        void 0 !== l && (f.p.data[l] = b.extend(!0, f.p.data[l], m));
                        m = null
                    }
                } catch (u) {
                    a = !1
                }
                a && ("string" === k ? b(j).addClass(c) : "object" === k && b(j).css(c), b(f).triggerHandler("jqGridAfterGridComplete"))
            });
            return a
        },
        addRowData: function (d, g, c, e) {
            c || (c = "last");
            var a = !1, i, f, h, j, k, m, n, l, r = "", u, E, T, L, ba, V;
            g && (b.isArray(g) ? (u = !0, c = "last", E = d) : (g = [g], u = !1), this.each(function () {
                var W = g.length;
                k = this.p.rownumbers === true ? 1 : 0;
                h = this.p.multiselect === true ? 1 : 0;
                j = this.p.subGrid === true ? 1 : 0;
                if (!u)if (d !== void 0)d = "" + d; else {
                    d = b.jgrid.randId();
                    if (this.p.keyIndex !== false) {
                        E = this.p.colModel[this.p.keyIndex + h + j + k].name;
                        g[0][E] !== void 0 && (d = g[0][E])
                    }
                }
                T = this.p.altclass;
                for (var P = 0, Z = "", H = {}, U = b.isFunction(this.p.afterInsertRow) ? true :
                    false; P < W;) {
                    L = g[P];
                    f = [];
                    if (u) {
                        try {
                            d = L[E];
                            d === void 0 && (d = b.jgrid.randId())
                        } catch (ka) {
                            d = b.jgrid.randId()
                        }
                        Z = this.p.altRows === true ? (this.rows.length - 1) % 2 === 0 ? T : "" : ""
                    }
                    V = d;
                    d = this.p.idPrefix + d;
                    if (k) {
                        r = this.formatCol(0, 1, "", null, d, true);
                        f[f.length] = '<td role="gridcell" class="ui-state-default jqgrid-rownum" ' + r + ">0</td>"
                    }
                    if (h) {
                        l = '<input role="checkbox" type="checkbox" id="jqg_' + this.p.id + "_" + d + '" class="cbox"/>';
                        r = this.formatCol(k, 1, "", null, d, true);
                        f[f.length] = '<td role="gridcell" ' + r + ">" + l + "</td>"
                    }
                    j && (f[f.length] =
                        b(this).jqGrid("addSubGridCell", h + k, 1));
                    for (n = h + j + k; n < this.p.colModel.length; n++) {
                        ba = this.p.colModel[n];
                        i = ba.name;
                        H[i] = L[i];
                        l = this.formatter(d, b.jgrid.getAccessor(L, i), n, L);
                        r = this.formatCol(n, 1, l, L, d, H);
                        f[f.length] = '<td role="gridcell" ' + r + ">" + l + "</td>"
                    }
                    f.unshift(this.constructTr(d, false, Z, H, L, false));
                    f[f.length] = "</tr>";
                    if (this.rows.length === 0)b("table:first", this.grid.bDiv).append(f.join("")); else switch (c) {
                        case "last":
                            b(this.rows[this.rows.length - 1]).after(f.join(""));
                            m = this.rows.length - 1;
                            break;
                        case "first":
                            b(this.rows[0]).after(f.join(""));
                            m = 1;
                            break;
                        case "after":
                            if (m = b(this).jqGrid("getGridRowById", e)) {
                                b(this.rows[m.rowIndex + 1]).hasClass("ui-subgrid") ? b(this.rows[m.rowIndex + 1]).after(f) : b(m).after(f.join(""));
                                m = m.rowIndex + 1
                            }
                            break;
                        case "before":
                            if (m = b(this).jqGrid("getGridRowById", e)) {
                                b(m).before(f.join(""));
                                m = m.rowIndex - 1
                            }
                    }
                    this.p.subGrid === true && b(this).jqGrid("addSubGrid", h + k, m);
                    this.p.records++;
                    this.p.reccount++;
                    b(this).triggerHandler("jqGridAfterInsertRow", [d, L, L]);
                    U && this.p.afterInsertRow.call(this,
                        d, L, L);
                    P++;
                    if (this.p.datatype === "local") {
                        H[this.p.localReader.id] = V;
                        this.p._index[V] = this.p.data.length;
                        this.p.data.push(H);
                        H = {}
                    }
                }
                this.p.altRows === true && !u && (c === "last" ? (this.rows.length - 1) % 2 === 1 && b(this.rows[this.rows.length - 1]).addClass(T) : b(this.rows).each(function (a) {
                    a % 2 === 1 ? b(this).addClass(T) : b(this).removeClass(T)
                }));
                this.updatepager(true, true);
                a = true
            }));
            return a
        }, footerData: function (d, g, c) {
            function e(a) {
                for (var b in a)if (a.hasOwnProperty(b))return !1;
                return !0
            }

            var a, i = !1, f = {}, h;
            void 0 === d &&
            (d = "get");
            "boolean" !== typeof c && (c = !0);
            d = d.toLowerCase();
            this.each(function () {
                var j = this, k;
                if (!j.grid || !j.p.footerrow || "set" === d && e(g))return !1;
                i = !0;
                b(this.p.colModel).each(function (e) {
                    a = this.name;
                    "set" === d ? void 0 !== g[a] && (k = c ? j.formatter("", g[a], e, g, "edit") : g[a], h = this.title ? {title: b.jgrid.stripHtml(k)} : {}, b("tr.footrow td:eq(" + e + ")", j.grid.sDiv).html(k).attr(h), i = !0) : "get" === d && (f[a] = b("tr.footrow td:eq(" + e + ")", j.grid.sDiv).html())
                })
            });
            return "get" === d ? f : i
        }, showHideCol: function (d, g) {
            return this.each(function () {
                var c =
                    this, e = !1, a = b.jgrid.cell_width ? 0 : c.p.cellLayout, i;
                if (c.grid) {
                    "string" === typeof d && (d = [d]);
                    g = "none" !== g ? "" : "none";
                    var f = "" === g ? !0 : !1, h = c.p.groupHeader && ("object" === typeof c.p.groupHeader || b.isFunction(c.p.groupHeader));
                    h && b(c).jqGrid("destroyGroupHeader", !1);
                    b(this.p.colModel).each(function (h) {
                        if (-1 !== b.inArray(this.name, d) && this.hidden === f) {
                            if (!0 === c.p.frozenColumns && !0 === this.frozen)return !0;
                            b("tr[role=rowheader]", c.grid.hDiv).each(function () {
                                b(this.cells[h]).css("display", g)
                            });
                            b(c.rows).each(function () {
                                b(this).hasClass("jqgroup") ||
                                b(this.cells[h]).css("display", g)
                            });
                            c.p.footerrow && b("tr.footrow td:eq(" + h + ")", c.grid.sDiv).css("display", g);
                            i = parseInt(this.width, 10);
                            c.p.tblwidth = "none" === g ? c.p.tblwidth - (i + a) : c.p.tblwidth + (i + a);
                            this.hidden = !f;
                            e = !0;
                            b(c).triggerHandler("jqGridShowHideCol", [f, this.name, h])
                        }
                    });
                    !0 === e && (!0 === c.p.shrinkToFit && !isNaN(c.p.height) && (c.p.tblwidth += parseInt(c.p.scrollOffset, 10)), b(c).jqGrid("setGridWidth", !0 === c.p.shrinkToFit ? c.p.tblwidth : c.p.width));
                    h && b(c).jqGrid("setGroupHeaders", c.p.groupHeader)
                }
            })
        },
        hideCol: function (d) {
            return this.each(function () {
                b(this).jqGrid("showHideCol", d, "none")
            })
        }, showCol: function (d) {
            return this.each(function () {
                b(this).jqGrid("showHideCol", d, "")
            })
        }, remapColumns: function (d, g, c) {
            function e(a) {
                var c;
                c = a.length ? b.makeArray(a) : b.extend({}, a);
                b.each(d, function (b) {
                    a[b] = c[this]
                })
            }

            function a(a, c) {
                b(">tr" + (c || ""), a).each(function () {
                    var a = this, c = b.makeArray(a.cells);
                    b.each(d, function () {
                        var b = c[this];
                        b && a.appendChild(b)
                    })
                })
            }

            var i = this.get(0);
            e(i.p.colModel);
            e(i.p.colNames);
            e(i.grid.headers);
            a(b("thead:first", i.grid.hDiv), c && ":not(.ui-jqgrid-labels)");
            g && a(b("#" + b.jgrid.jqID(i.p.id) + " tbody:first"), ".jqgfirstrow, tr.jqgrow, tr.jqfoot");
            i.p.footerrow && a(b("tbody:first", i.grid.sDiv));
            i.p.remapColumns && (i.p.remapColumns.length ? e(i.p.remapColumns) : i.p.remapColumns = b.makeArray(d));
            i.p.lastsort = b.inArray(i.p.lastsort, d);
            i.p.treeGrid && (i.p.expColInd = b.inArray(i.p.expColInd, d));
            b(i).triggerHandler("jqGridRemapColumns", [d, g, c])
        }, setGridWidth: function (d, g) {
            return this.each(function () {
                if (this.grid) {
                    var c =
                        this, e, a = 0, i = b.jgrid.cell_width ? 0 : c.p.cellLayout, f, h = 0, j = !1, k = c.p.scrollOffset, m, n = 0, l;
                    "boolean" !== typeof g && (g = c.p.shrinkToFit);
                    if (!isNaN(d)) {
                        d = parseInt(d, 10);
                        c.grid.width = c.p.width = d;
                        b("#gbox_" + b.jgrid.jqID(c.p.id)).css("width", d + "px");
                        b("#gview_" + b.jgrid.jqID(c.p.id)).css("width", d + "px");
                        b(c.grid.bDiv).css("width", d + "px");
                        b(c.grid.hDiv).css("width", d + "px");
                        c.p.pager && b(c.p.pager).css("width", d + "px");
                        c.p.toppager && b(c.p.toppager).css("width", d + "px");
                        !0 === c.p.toolbar[0] && (b(c.grid.uDiv).css("width",
                            d + "px"), "both" === c.p.toolbar[1] && b(c.grid.ubDiv).css("width", d + "px"));
                        c.p.footerrow && b(c.grid.sDiv).css("width", d + "px");
                        !1 === g && !0 === c.p.forceFit && (c.p.forceFit = !1);
                        if (!0 === g) {
                            b.each(c.p.colModel, function () {
                                if (this.hidden === false) {
                                    e = this.widthOrg;
                                    a = a + (e + i);
                                    this.fixed ? n = n + (e + i) : h++
                                }
                            });
                            if (0 === h)return;
                            c.p.tblwidth = a;
                            m = d - i * h - n;
                            if (!isNaN(c.p.height) && (b(c.grid.bDiv)[0].clientHeight < b(c.grid.bDiv)[0].scrollHeight || 1 === c.rows.length))j = !0, m -= k;
                            var a = 0, r = 0 < c.grid.cols.length;
                            b.each(c.p.colModel, function (b) {
                                if (this.hidden ===
                                    false && !this.fixed) {
                                    e = this.widthOrg;
                                    e = Math.round(m * e / (c.p.tblwidth - i * h - n));
                                    if (!(e < 0)) {
                                        this.width = e;
                                        a = a + e;
                                        c.grid.headers[b].width = e;
                                        c.grid.headers[b].el.style.width = e + "px";
                                        if (c.p.footerrow)c.grid.footers[b].style.width = e + "px";
                                        if (r)c.grid.cols[b].style.width = e + "px";
                                        f = b
                                    }
                                }
                            });
                            if (!f)return;
                            l = 0;
                            j ? d - n - (a + i * h) !== k && (l = d - n - (a + i * h) - k) : 1 !== Math.abs(d - n - (a + i * h)) && (l = d - n - (a + i * h));
                            c.p.colModel[f].width += l;
                            c.p.tblwidth = a + l + i * h + n;
                            c.p.tblwidth > d ? (j = c.p.tblwidth - parseInt(d, 10), c.p.tblwidth = d, e = c.p.colModel[f].width -=
                                j) : e = c.p.colModel[f].width;
                            c.grid.headers[f].width = e;
                            c.grid.headers[f].el.style.width = e + "px";
                            r && (c.grid.cols[f].style.width = e + "px");
                            c.p.footerrow && (c.grid.footers[f].style.width = e + "px")
                        }
                        c.p.tblwidth && (b("table:first", c.grid.bDiv).css("width", c.p.tblwidth + "px"), b("table:first", c.grid.hDiv).css("width", c.p.tblwidth + "px"), c.grid.hDiv.scrollLeft = c.grid.bDiv.scrollLeft, c.p.footerrow && b("table:first", c.grid.sDiv).css("width", c.p.tblwidth + "px"))
                    }
                }
            })
        }, setGridHeight: function (d) {
            return this.each(function () {
                if (this.grid) {
                    var g =
                        b(this.grid.bDiv);
                    g.css({height: d + (isNaN(d) ? "" : "px")});
                    !0 === this.p.frozenColumns && b("#" + b.jgrid.jqID(this.p.id) + "_frozen").parent().height(g.height() - 16);
                    this.p.height = d;
                    this.p.scroll && this.grid.populateVisible()
                }
            })
        }, setCaption: function (d) {
            return this.each(function () {
                this.p.caption = d;
                b("span.ui-jqgrid-title, span.ui-jqgrid-title-rtl", this.grid.cDiv).html(d);
                b(this.grid.cDiv).show()
            })
        }, setLabel: function (d, g, c, e) {
            return this.each(function () {
                var a = -1;
                if (this.grid && void 0 !== d && (b(this.p.colModel).each(function (b) {
                        if (this.name ===
                            d)return a = b, !1
                    }), 0 <= a)) {
                    var i = b("tr.ui-jqgrid-labels th:eq(" + a + ")", this.grid.hDiv);
                    if (g) {
                        var f = b(".s-ico", i);
                        b("[id^=jqgh_]", i).empty().html(g).append(f);
                        this.p.colNames[a] = g
                    }
                    c && ("string" === typeof c ? b(i).addClass(c) : b(i).css(c));
                    "object" === typeof e && b(i).attr(e)
                }
            })
        }, setCell: function (d, g, c, e, a, i) {
            return this.each(function () {
                var f = -1, h, j;
                if (this.grid && (isNaN(g) ? b(this.p.colModel).each(function (a) {
                        if (this.name === g)return f = a, !1
                    }) : f = parseInt(g, 10), 0 <= f && (h = b(this).jqGrid("getGridRowById", d)))) {
                    var k =
                        b("td:eq(" + f + ")", h);
                    if ("" !== c || !0 === i)h = this.formatter(d, c, f, h, "edit"), j = this.p.colModel[f].title ? {title: b.jgrid.stripHtml(h)} : {}, this.p.treeGrid && 0 < b(".tree-wrap", b(k)).length ? b("span", b(k)).html(h).attr(j) : b(k).html(h).attr(j), "local" === this.p.datatype && (h = this.p.colModel[f], c = h.formatter && "string" === typeof h.formatter && "date" === h.formatter ? b.unformat.date.call(this, c, h) : c, j = this.p._index[b.jgrid.stripPref(this.p.idPrefix, d)], void 0 !== j && (this.p.data[j][h.name] = c));
                    "string" === typeof e ? b(k).addClass(e) :
                    e && b(k).css(e);
                    "object" === typeof a && b(k).attr(a)
                }
            })
        }, getCell: function (d, g) {
            var c = !1;
            this.each(function () {
                var e = -1;
                if (this.grid && (isNaN(g) ? b(this.p.colModel).each(function (a) {
                        if (this.name === g)return e = a, !1
                    }) : e = parseInt(g, 10), 0 <= e)) {
                    var a = b(this).jqGrid("getGridRowById", d);
                    if (a)try {
                        c = b.unformat.call(this, b("td:eq(" + e + ")", a), {
                            rowId: a.id,
                            colModel: this.p.colModel[e]
                        }, e)
                    } catch (i) {
                        c = b.jgrid.htmlDecode(b("td:eq(" + e + ")", a).html())
                    }
                }
            });
            return c
        }, getCol: function (d, g, c) {
            var e = [], a, i = 0, f, h, j, g = "boolean" !== typeof g ?
                !1 : g;
            void 0 === c && (c = !1);
            this.each(function () {
                var k = -1;
                if (this.grid && (isNaN(d) ? b(this.p.colModel).each(function (a) {
                        if (this.name === d)return k = a, !1
                    }) : k = parseInt(d, 10), 0 <= k)) {
                    var m = this.rows.length, n = 0, l = 0;
                    if (m && 0 < m) {
                        for (; n < m;) {
                            if (b(this.rows[n]).hasClass("jqgrow")) {
                                try {
                                    a = b.unformat.call(this, b(this.rows[n].cells[k]), {
                                        rowId: this.rows[n].id,
                                        colModel: this.p.colModel[k]
                                    }, k)
                                } catch (r) {
                                    a = b.jgrid.htmlDecode(this.rows[n].cells[k].innerHTML)
                                }
                                c ? (j = parseFloat(a), isNaN(j) || (i += j, void 0 === h && (h = f = j), f = Math.min(f,
                                    j), h = Math.max(h, j), l++)) : g ? e.push({
                                    id: this.rows[n].id,
                                    value: a
                                }) : e.push(a)
                            }
                            n++
                        }
                        if (c)switch (c.toLowerCase()) {
                            case "sum":
                                e = i;
                                break;
                            case "avg":
                                e = i / l;
                                break;
                            case "count":
                                e = m - 1;
                                break;
                            case "min":
                                e = f;
                                break;
                            case "max":
                                e = h
                        }
                    }
                }
            });
            return e
        }, clearGridData: function (d) {
            return this.each(function () {
                if (this.grid) {
                    "boolean" !== typeof d && (d = !1);
                    if (this.p.deepempty)b("#" + b.jgrid.jqID(this.p.id) + " tbody:first tr:gt(0)").remove(); else {
                        var g = b("#" + b.jgrid.jqID(this.p.id) + " tbody:first tr:first")[0];
                        b("#" + b.jgrid.jqID(this.p.id) +
                            " tbody:first").empty().append(g)
                    }
                    this.p.footerrow && d && b(".ui-jqgrid-ftable td", this.grid.sDiv).html("&#160;");
                    this.p.selrow = null;
                    this.p.selarrrow = [];
                    this.p.savedRow = [];
                    this.p.records = 0;
                    this.p.page = 1;
                    this.p.lastpage = 0;
                    this.p.reccount = 0;
                    this.p.data = [];
                    this.p._index = {};
                    this.updatepager(!0, !1)
                }
            })
        }, getInd: function (d, g) {
            var c = !1, e;
            this.each(function () {
                (e = b(this).jqGrid("getGridRowById", d)) && (c = !0 === g ? e : e.rowIndex)
            });
            return c
        }, bindKeys: function (d) {
            var g = b.extend({
                onEnter: null, onSpace: null, onLeftKey: null,
                onRightKey: null, scrollingRows: !0
            }, d || {});
            return this.each(function () {
                var c = this;
                b("body").is("[role]") || b("body").attr("role", "application");
                c.p.scrollrows = g.scrollingRows;
                b(c).keydown(function (d) {
                    var a = b(c).find("tr[tabindex=0]")[0], i, f, h, j = c.p.treeReader.expanded_field;
                    if (a)if (h = c.p._index[b.jgrid.stripPref(c.p.idPrefix, a.id)], 37 === d.keyCode || 38 === d.keyCode || 39 === d.keyCode || 40 === d.keyCode) {
                        if (38 === d.keyCode) {
                            f = a.previousSibling;
                            i = "";
                            if (f)if (b(f).is(":hidden"))for (; f;) {
                                if (f = f.previousSibling, !b(f).is(":hidden") &&
                                    b(f).hasClass("jqgrow")) {
                                    i = f.id;
                                    break
                                }
                            } else i = f.id;
                            b(c).jqGrid("setSelection", i, !0, d);
                            d.preventDefault()
                        }
                        if (40 === d.keyCode) {
                            f = a.nextSibling;
                            i = "";
                            if (f)if (b(f).is(":hidden"))for (; f;) {
                                if (f = f.nextSibling, !b(f).is(":hidden") && b(f).hasClass("jqgrow")) {
                                    i = f.id;
                                    break
                                }
                            } else i = f.id;
                            b(c).jqGrid("setSelection", i, !0, d);
                            d.preventDefault()
                        }
                        37 === d.keyCode && (c.p.treeGrid && c.p.data[h][j] && b(a).find("div.treeclick").trigger("click"), b(c).triggerHandler("jqGridKeyLeft", [c.p.selrow]), b.isFunction(g.onLeftKey) && g.onLeftKey.call(c,
                            c.p.selrow));
                        39 === d.keyCode && (c.p.treeGrid && !c.p.data[h][j] && b(a).find("div.treeclick").trigger("click"), b(c).triggerHandler("jqGridKeyRight", [c.p.selrow]), b.isFunction(g.onRightKey) && g.onRightKey.call(c, c.p.selrow))
                    } else 13 === d.keyCode ? (b(c).triggerHandler("jqGridKeyEnter", [c.p.selrow]), b.isFunction(g.onEnter) && g.onEnter.call(c, c.p.selrow)) : 32 === d.keyCode && (b(c).triggerHandler("jqGridKeySpace", [c.p.selrow]), b.isFunction(g.onSpace) && g.onSpace.call(c, c.p.selrow))
                })
            })
        }, unbindKeys: function () {
            return this.each(function () {
                b(this).unbind("keydown")
            })
        },
        getLocalRow: function (d) {
            var g = !1, c;
            this.each(function () {
                void 0 !== d && (c = this.p._index[b.jgrid.stripPref(this.p.idPrefix, d)], 0 <= c && (g = this.p.data[c]))
            });
            return g
        }
    })
})(jQuery);
(function (a) {
    a.fmatter = {};
    a.extend(a.fmatter, {
        isBoolean: function (a) {
            return "boolean" === typeof a
        }, isObject: function (c) {
            return c && ("object" === typeof c || a.isFunction(c)) || !1
        }, isString: function (a) {
            return "string" === typeof a
        }, isNumber: function (a) {
            return "number" === typeof a && isFinite(a)
        }, isValue: function (a) {
            return this.isObject(a) || this.isString(a) || this.isNumber(a) || this.isBoolean(a)
        }, isEmpty: function (c) {
            if (!this.isString(c) && this.isValue(c))return !1;
            if (!this.isValue(c))return !0;
            c = a.trim(c).replace(/\&nbsp\;/ig,
                "").replace(/\&#160\;/ig, "");
            return "" === c
        }
    });
    a.fn.fmatter = function (c, b, d, e, f) {
        var g = b, d = a.extend({}, a.jgrid.formatter, d);
        try {
            g = a.fn.fmatter[c].call(this, b, d, e, f)
        } catch (h) {
        }
        return g
    };
    a.fmatter.util = {
        NumberFormat: function (c, b) {
            a.fmatter.isNumber(c) || (c *= 1);
            if (a.fmatter.isNumber(c)) {
                var d = 0 > c, e = "" + c, f = b.decimalSeparator || ".", g;
                if (a.fmatter.isNumber(b.decimalPlaces)) {
                    var h = b.decimalPlaces, e = Math.pow(10, h), e = "" + Math.round(c * e) / e;
                    g = e.lastIndexOf(".");
                    if (0 < h) {
                        0 > g ? (e += f, g = e.length - 1) : "." !== f && (e = e.replace(".",
                            f));
                        for (; e.length - 1 - g < h;)e += "0"
                    }
                }
                if (b.thousandsSeparator) {
                    h = b.thousandsSeparator;
                    g = e.lastIndexOf(f);
                    g = -1 < g ? g : e.length;
                    var f = e.substring(g), j = -1, i;
                    for (i = g; 0 < i; i--) {
                        j++;
                        if (0 === j % 3 && i !== g && (!d || 1 < i))f = h + f;
                        f = e.charAt(i - 1) + f
                    }
                    e = f
                }
                e = b.prefix ? b.prefix + e : e;
                return e = b.suffix ? e + b.suffix : e
            }
            return c
        }
    };
    a.fn.fmatter.defaultFormat = function (c, b) {
        return a.fmatter.isValue(c) && "" !== c ? c : b.defaultValue || "&#160;"
    };
    a.fn.fmatter.email = function (c, b) {
        return !a.fmatter.isEmpty(c) ? '<a href="mailto:' + c + '">' + c + "</a>" : a.fn.fmatter.defaultFormat(c,
            b)
    };
    a.fn.fmatter.checkbox = function (c, b) {
        var d = a.extend({}, b.checkbox), e;
        void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (d = a.extend({}, d, b.colModel.formatoptions));
        e = !0 === d.disabled ? 'disabled="disabled"' : "";
        if (a.fmatter.isEmpty(c) || void 0 === c)c = a.fn.fmatter.defaultFormat(c, d);
        c = ("" + c + "").toLowerCase();
        return '<input type="checkbox" ' + (0 > c.search(/(false|f|0|no|n|off|undefined)/i) ? " checked='checked' " : "") + ' value="' + c + '" offval="no" ' + e + "/>"
    };
    a.fn.fmatter.link = function (c, b) {
        var d = {target: b.target},
            e = "";
        void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (d = a.extend({}, d, b.colModel.formatoptions));
        d.target && (e = "target=" + d.target);
        return !a.fmatter.isEmpty(c) ? "<a " + e + ' href="' + c + '">' + c + "</a>" : a.fn.fmatter.defaultFormat(c, b)
    };
    a.fn.fmatter.showlink = function (c, b) {
        var d = {
            baseLinkUrl: b.baseLinkUrl,
            showAction: b.showAction,
            addParam: b.addParam || "",
            target: b.target,
            idName: b.idName
        }, e = "";
        void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (d = a.extend({}, d, b.colModel.formatoptions));
        d.target && (e =
            "target=" + d.target);
        d = d.baseLinkUrl + d.showAction + "?" + d.idName + "=" + b.rowId + d.addParam;
        return a.fmatter.isString(c) || a.fmatter.isNumber(c) ? "<a " + e + ' href="' + d + '">' + c + "</a>" : a.fn.fmatter.defaultFormat(c, b)
    };
    a.fn.fmatter.integer = function (c, b) {
        var d = a.extend({}, b.integer);
        void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (d = a.extend({}, d, b.colModel.formatoptions));
        return a.fmatter.isEmpty(c) ? d.defaultValue : a.fmatter.util.NumberFormat(c, d)
    };
    a.fn.fmatter.number = function (c, b) {
        var d = a.extend({}, b.number);
        void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (d = a.extend({}, d, b.colModel.formatoptions));
        return a.fmatter.isEmpty(c) ? d.defaultValue : a.fmatter.util.NumberFormat(c, d)
    };
    a.fn.fmatter.currency = function (c, b) {
        var d = a.extend({}, b.currency);
        void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (d = a.extend({}, d, b.colModel.formatoptions));
        return a.fmatter.isEmpty(c) ? d.defaultValue : a.fmatter.util.NumberFormat(c, d)
    };
    a.fn.fmatter.date = function (c, b, d, e) {
        d = a.extend({}, b.date);
        void 0 !== b.colModel && void 0 !==
        b.colModel.formatoptions && (d = a.extend({}, d, b.colModel.formatoptions));
        return !d.reformatAfterEdit && "edit" === e ? a.fn.fmatter.defaultFormat(c, b) : !a.fmatter.isEmpty(c) ? a.jgrid.parseDate(d.srcformat, c, d.newformat, d) : a.fn.fmatter.defaultFormat(c, b)
    };
    a.fn.fmatter.select = function (c, b) {
        var c = "" + c, d = !1, e = [], f, g;
        void 0 !== b.colModel.formatoptions ? (d = b.colModel.formatoptions.value, f = void 0 === b.colModel.formatoptions.separator ? ":" : b.colModel.formatoptions.separator, g = void 0 === b.colModel.formatoptions.delimiter ?
            ";" : b.colModel.formatoptions.delimiter) : void 0 !== b.colModel.editoptions && (d = b.colModel.editoptions.value, f = void 0 === b.colModel.editoptions.separator ? ":" : b.colModel.editoptions.separator, g = void 0 === b.colModel.editoptions.delimiter ? ";" : b.colModel.editoptions.delimiter);
        if (d) {
            var h = !0 === b.colModel.editoptions.multiple ? !0 : !1, j = [];
            h && (j = c.split(","), j = a.map(j, function (b) {
                return a.trim(b)
            }));
            if (a.fmatter.isString(d)) {
                var i = d.split(g), k = 0, l;
                for (l = 0; l < i.length; l++)if (g = i[l].split(f), 2 < g.length && (g[1] = a.map(g,
                        function (a, b) {
                            if (b > 0)return a
                        }).join(f)), h)-1 < a.inArray(g[0], j) && (e[k] = g[1], k++); else if (a.trim(g[0]) === a.trim(c)) {
                    e[0] = g[1];
                    break
                }
            } else a.fmatter.isObject(d) && (h ? e = a.map(j, function (a) {
                return d[a]
            }) : e[0] = d[c] || "")
        }
        c = e.join(", ");
        return "" === c ? a.fn.fmatter.defaultFormat(c, b) : c
    };
    a.fn.fmatter.rowactions = function (c) {
        var b = a(this).closest("tr.jqgrow"), d = b.attr("id"), e = a(this).closest("table.ui-jqgrid-btable").attr("id").replace(/_frozen([^_]*)$/, "$1"), e = a("#" + e), f = e[0], g = f.p, h = g.colModel[a.jgrid.getCellIndex(this)],
            j = h.frozen ? a("tr#" + d + " td:eq(" + a.jgrid.getCellIndex(this) + ") > div", e) : a(this).parent(), i = {
                keys: !1,
                onEdit: null,
                onSuccess: null,
                afterSave: null,
                onError: null,
                afterRestore: null,
                extraparam: {},
                url: null,
                restoreAfterError: !0,
                mtype: "POST",
                delOptions: {},
                editOptions: {}
            }, k = function (b) {
                a.isFunction(i.afterRestore) && i.afterRestore.call(f, b);
                j.find("div.ui-inline-edit,div.ui-inline-del").show();
                j.find("div.ui-inline-save,div.ui-inline-cancel").hide()
            };
        void 0 !== h.formatoptions && (i = a.extend(i, h.formatoptions));
        void 0 !==
        g.editOptions && (i.editOptions = g.editOptions);
        void 0 !== g.delOptions && (i.delOptions = g.delOptions);
        b.hasClass("jqgrid-new-row") && (i.extraparam[g.prmNames.oper] = g.prmNames.addoper);
        b = {
            keys: i.keys,
            oneditfunc: i.onEdit,
            successfunc: i.onSuccess,
            url: i.url,
            extraparam: i.extraparam,
            aftersavefunc: function (b, c) {
                a.isFunction(i.afterSave) && i.afterSave.call(f, b, c);
                j.find("div.ui-inline-edit,div.ui-inline-del").show();
                j.find("div.ui-inline-save,div.ui-inline-cancel").hide()
            },
            errorfunc: i.onError,
            afterrestorefunc: k,
            restoreAfterError: i.restoreAfterError,
            mtype: i.mtype
        };
        switch (c) {
            case "edit":
                e.jqGrid("editRow", d, b);
                j.find("div.ui-inline-edit,div.ui-inline-del").hide();
                j.find("div.ui-inline-save,div.ui-inline-cancel").show();
                e.triggerHandler("jqGridAfterGridComplete");
                break;
            case "save":
                e.jqGrid("saveRow", d, b) && (j.find("div.ui-inline-edit,div.ui-inline-del").show(), j.find("div.ui-inline-save,div.ui-inline-cancel").hide(), e.triggerHandler("jqGridAfterGridComplete"));
                break;
            case "cancel":
                e.jqGrid("restoreRow", d, k);
                j.find("div.ui-inline-edit,div.ui-inline-del").show();
                j.find("div.ui-inline-save,div.ui-inline-cancel").hide();
                e.triggerHandler("jqGridAfterGridComplete");
                break;
            case "del":
                e.jqGrid("delGridRow", d, i.delOptions);
                break;
            case "formedit":
                e.jqGrid("setSelection", d), e.jqGrid("editGridRow", d, i.editOptions)
        }
    };
    a.fn.fmatter.actions = function (c, b) {
        var d = {keys: !1, editbutton: !0, delbutton: !0, editformbutton: !1}, e = b.rowId, f = "";
        void 0 !== b.colModel.formatoptions && (d = a.extend(d, b.colModel.formatoptions));
        if (void 0 === e || a.fmatter.isEmpty(e))return "";
        d.editformbutton ? f += "<div title='" +
            a.jgrid.nav.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + ("id='jEditButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'formedit'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ") + "><span class='ui-icon ui-icon-pencil'></span></div>" : d.editbutton && (f += "<div title='" + a.jgrid.nav.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + ("id='jEditButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'edit'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ") +
            "><span class='ui-icon ui-icon-pencil'></span></div>");
        d.delbutton && (f += "<div title='" + a.jgrid.nav.deltitle + "' style='float:left;margin-left:5px;' class='ui-pg-div ui-inline-del' " + ("id='jDeleteButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'del'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ") + "><span class='ui-icon ui-icon-trash'></span></div>");
        f += "<div title='" + a.jgrid.edit.bSubmit + "' style='float:left;display:none' class='ui-pg-div ui-inline-save' " +
            ("id='jSaveButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'save'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ") + "><span class='ui-icon ui-icon-disk'></span></div>";
        f += "<div title='" + a.jgrid.edit.bCancel + "' style='float:left;display:none;margin-left:5px;' class='ui-pg-div ui-inline-cancel' " + ("id='jCancelButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'cancel'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ") +
            "><span class='ui-icon ui-icon-cancel'></span></div>";
        return "<div style='margin-left:8px;'>" + f + "</div>"
    };
    a.unformat = function (c, b, d, e) {
        var f, g = b.colModel.formatter, h = b.colModel.formatoptions || {}, j = /([\.\*\_\'\(\)\{\}\+\?\\])/g, i = b.colModel.unformat || a.fn.fmatter[g] && a.fn.fmatter[g].unformat;
        if (void 0 !== i && a.isFunction(i))f = i.call(this, a(c).text(), b, c); else if (void 0 !== g && a.fmatter.isString(g))switch (f = a.jgrid.formatter || {}, g) {
            case "integer":
                h = a.extend({}, f.integer, h);
                b = h.thousandsSeparator.replace(j,
                    "\\$1");
                f = a(c).text().replace(RegExp(b, "g"), "");
                break;
            case "number":
                h = a.extend({}, f.number, h);
                b = h.thousandsSeparator.replace(j, "\\$1");
                f = a(c).text().replace(RegExp(b, "g"), "").replace(h.decimalSeparator, ".");
                break;
            case "currency":
                h = a.extend({}, f.currency, h);
                b = h.thousandsSeparator.replace(j, "\\$1");
                b = RegExp(b, "g");
                f = a(c).text();
                h.prefix && h.prefix.length && (f = f.substr(h.prefix.length));
                h.suffix && h.suffix.length && (f = f.substr(0, f.length - h.suffix.length));
                f = f.replace(b, "").replace(h.decimalSeparator, ".");
                break;
            case "checkbox":
                h = b.colModel.editoptions ? b.colModel.editoptions.value.split(":") : ["Yes", "No"];
                f = a("input", c).is(":checked") ? h[0] : h[1];
                break;
            case "select":
                f = a.unformat.select(c, b, d, e);
                break;
            case "actions":
                return "";
            default:
                f = a(c).text()
        }
        return void 0 !== f ? f : !0 === e ? a(c).text() : a.jgrid.htmlDecode(a(c).html())
    };
    a.unformat.select = function (c, b, d, e) {
        d = [];
        c = a(c).text();
        if (!0 === e)return c;
        var e = a.extend({}, void 0 !== b.colModel.formatoptions ? b.colModel.formatoptions : b.colModel.editoptions), b = void 0 === e.separator ?
            ":" : e.separator, f = void 0 === e.delimiter ? ";" : e.delimiter;
        if (e.value) {
            var g = e.value, e = !0 === e.multiple ? !0 : !1, h = [];
            e && (h = c.split(","), h = a.map(h, function (b) {
                return a.trim(b)
            }));
            if (a.fmatter.isString(g)) {
                var j = g.split(f), i = 0, k;
                for (k = 0; k < j.length; k++)if (f = j[k].split(b), 2 < f.length && (f[1] = a.map(f, function (a, b) {
                        if (b > 0)return a
                    }).join(b)), e)-1 < a.inArray(f[1], h) && (d[i] = f[0], i++); else if (a.trim(f[1]) === a.trim(c)) {
                    d[0] = f[0];
                    break
                }
            } else if (a.fmatter.isObject(g) || a.isArray(g))e || (h[0] = c), d = a.map(h, function (b) {
                var c;
                a.each(g, function (a, d) {
                    if (d === b) {
                        c = a;
                        return false
                    }
                });
                if (c !== void 0)return c
            });
            return d.join(", ")
        }
        return c || ""
    };
    a.unformat.date = function (c, b) {
        var d = a.jgrid.formatter.date || {};
        void 0 !== b.formatoptions && (d = a.extend({}, d, b.formatoptions));
        return !a.fmatter.isEmpty(c) ? a.jgrid.parseDate(d.newformat, c, d.srcformat, d) : a.fn.fmatter.defaultFormat(c, b)
    }
})(jQuery);
(function (a) {
    a.jgrid.extend({
        getColProp: function (a) {
            var c = {}, e = this[0];
            if (!e.grid)return !1;
            var e = e.p.colModel, d;
            for (d = 0; d < e.length; d++)if (e[d].name === a) {
                c = e[d];
                break
            }
            return c
        }, setColProp: function (b, c) {
            return this.each(function () {
                if (this.grid && c) {
                    var e = this.p.colModel, d;
                    for (d = 0; d < e.length; d++)if (e[d].name === b) {
                        a.extend(!0, this.p.colModel[d], c);
                        break
                    }
                }
            })
        }, sortGrid: function (a, c, e) {
            return this.each(function () {
                var d = -1, i, h = !1;
                if (this.grid) {
                    a || (a = this.p.sortname);
                    for (i = 0; i < this.p.colModel.length; i++)if (this.p.colModel[i].index ===
                        a || this.p.colModel[i].name === a) {
                        d = i;
                        !0 === this.p.frozenColumns && !0 === this.p.colModel[i].frozen && (h = this.grid.fhDiv.find("#" + this.p.id + "_" + a));
                        break
                    }
                    -1 !== d && (i = this.p.colModel[d].sortable, "boolean" !== typeof i && (i = !0), "boolean" !== typeof c && (c = !1), i && this.sortData("jqgh_" + this.p.id + "_" + a, d, c, e, h))
                }
            })
        }, clearBeforeUnload: function () {
            return this.each(function () {
                var b = this.grid;
                b.emptyRows.call(this, !0, !0);
                a(document).unbind("mouseup.jqGrid" + this.p.id);
                a(b.hDiv).unbind("mousemove");
                a(this).unbind();
                b.dragEnd =
                    null;
                b.dragMove = null;
                b.dragStart = null;
                b.emptyRows = null;
                b.populate = null;
                b.populateVisible = null;
                b.scrollGrid = null;
                b.selectionPreserver = null;
                b.bDiv = null;
                b.cDiv = null;
                b.hDiv = null;
                b.cols = null;
                var c, e = b.headers.length;
                for (c = 0; c < e; c++)b.headers[c].el = null;
                this.addJSONData = this.addXmlData = this.formatter = this.constructTr = this.setHeadCheckBox = this.refreshIndex = this.updatepager = this.sortData = this.formatCol = null
            })
        }, GridDestroy: function () {
            return this.each(function () {
                if (this.grid) {
                    this.p.pager && a(this.p.pager).remove();
                    try {
                        a(this).jqGrid("clearBeforeUnload"), a("#gbox_" + a.jgrid.jqID(this.id)).remove()
                    } catch (b) {
                    }
                }
            })
        }, GridUnload: function () {
            return this.each(function () {
                if (this.grid) {
                    var b = a(this).attr("id"), c = a(this).attr("class");
                    this.p.pager && a(this.p.pager).empty().removeClass("ui-state-default ui-jqgrid-pager corner-bottom");
                    var e = document.createElement("table");
                    a(e).attr({id: b});
                    e.className = c;
                    b = a.jgrid.jqID(this.id);
                    a(e).removeClass("ui-jqgrid-btable");
                    1 === a(this.p.pager).parents("#gbox_" + b).length ? (a(e).insertBefore("#gbox_" +
                        b).show(), a(this.p.pager).insertBefore("#gbox_" + b)) : a(e).insertBefore("#gbox_" + b).show();
                    a(this).jqGrid("clearBeforeUnload");
                    a("#gbox_" + b).remove()
                }
            })
        }, setGridState: function (b) {
            return this.each(function () {
                this.grid && ("hidden" === b ? (a(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", "#gview_" + a.jgrid.jqID(this.p.id)).slideUp("fast"), this.p.pager && a(this.p.pager).slideUp("fast"), this.p.toppager && a(this.p.toppager).slideUp("fast"), !0 === this.p.toolbar[0] && ("both" === this.p.toolbar[1] && a(this.grid.ubDiv).slideUp("fast"),
                    a(this.grid.uDiv).slideUp("fast")), this.p.footerrow && a(".ui-jqgrid-sdiv", "#gbox_" + a.jgrid.jqID(this.p.id)).slideUp("fast"), a(".ui-jqgrid-titlebar-close span", this.grid.cDiv).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s"), this.p.gridstate = "hidden") : "visible" === b && (a(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", "#gview_" + a.jgrid.jqID(this.p.id)).slideDown("fast"), this.p.pager && a(this.p.pager).slideDown("fast"), this.p.toppager && a(this.p.toppager).slideDown("fast"), !0 === this.p.toolbar[0] &&
                ("both" === this.p.toolbar[1] && a(this.grid.ubDiv).slideDown("fast"), a(this.grid.uDiv).slideDown("fast")), this.p.footerrow && a(".ui-jqgrid-sdiv", "#gbox_" + a.jgrid.jqID(this.p.id)).slideDown("fast"), a(".ui-jqgrid-titlebar-close span", this.grid.cDiv).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n"), this.p.gridstate = "visible"))
            })
        }, filterToolbar: function (b) {
            b = a.extend({
                autosearch: !0,
                searchOnEnter: !0,
                beforeSearch: null,
                afterSearch: null,
                beforeClear: null,
                afterClear: null,
                searchurl: "",
                stringResult: !1,
                groupOp: "AND",
                defaultSearch: "bw",
                searchOperators: !1,
                operandTitle: "Click to select search operation.",
                operands: {
                    eq: "==",
                    ne: "!",
                    lt: "<",
                    le: "<=",
                    gt: ">",
                    ge: ">=",
                    bw: "^",
                    bn: "!^",
                    "in": "=",
                    ni: "!=",
                    ew: "|",
                    en: "!@",
                    cn: "~",
                    nc: "!~",
                    nu: "#",
                    nn: "!#"
                }
            }, a.jgrid.search, b || {});
            return this.each(function () {
                var c = this;
                if (!this.ftoolbar) {
                    var e = function () {
                        var e = {}, g = 0, f, o, i = {}, m;
                        a.each(c.p.colModel, function () {
                            var j = a("#gs_" + a.jgrid.jqID(this.name), !0 === this.frozen && !0 === c.p.frozenColumns ? c.grid.fhDiv : c.grid.hDiv);
                            o = this.index || this.name;
                            m = b.searchOperators ? j.parent().prev().children("a").attr("soper") || b.defaultSearch : this.searchoptions && this.searchoptions.sopt ? this.searchoptions.sopt[0] : "select" === this.stype ? "eq" : b.defaultSearch;
                            if ((f = "custom" === this.stype && a.isFunction(this.searchoptions.custom_value) && 0 < j.length && "SPAN" === j[0].nodeName.toUpperCase() ? this.searchoptions.custom_value.call(c, j.children(".customelement:first"), "get") : j.val()) || "nu" === m || "nn" === m)e[o] = f, i[o] = m, g++; else try {
                                delete c.p.postData[o]
                            } catch (h) {
                            }
                        });
                        var h = 0 < g ? !0 : !1;
                        if (!0 === b.stringResult || "local" === c.p.datatype) {
                            var j = '{"groupOp":"' + b.groupOp + '","rules":[', d = 0;
                            a.each(e, function (a, b) {
                                0 < d && (j += ",");
                                j += '{"field":"' + a + '",';
                                j += '"op":"' + i[a] + '",';
                                j += '"data":"' + (b + "").replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}';
                                d++
                            });
                            j += "]}";
                            a.extend(c.p.postData, {filters: j});
                            a.each(["searchField", "searchString", "searchOper"], function (a, b) {
                                c.p.postData.hasOwnProperty(b) && delete c.p.postData[b]
                            })
                        } else a.extend(c.p.postData, e);
                        var n;
                        c.p.searchurl && (n = c.p.url, a(c).jqGrid("setGridParam",
                            {url: c.p.searchurl}));
                        var r = "stop" === a(c).triggerHandler("jqGridToolbarBeforeSearch") ? !0 : !1;
                        !r && a.isFunction(b.beforeSearch) && (r = b.beforeSearch.call(c));
                        r || a(c).jqGrid("setGridParam", {search: h}).trigger("reloadGrid", [{page: 1}]);
                        n && a(c).jqGrid("setGridParam", {url: n});
                        a(c).triggerHandler("jqGridToolbarAfterSearch");
                        a.isFunction(b.afterSearch) && b.afterSearch.call(c)
                    }, d = function (k, g, f) {
                        a("#sopt_menu").remove();
                        var g = parseInt(g, 10), f = parseInt(f, 10) + 18, g = '<ul id="sopt_menu" class="ui-search-menu" role="menu" tabindex="0" style="font-size:' +
                            (a(".ui-jqgrid-view").css("font-size") || "11px") + ";left:" + g + "px;top:" + f + 'px;">', f = a(k).attr("soper"), i, h = [], m, d = 0, j = a(k).attr("colname");
                        for (i = c.p.colModel.length; d < i && c.p.colModel[d].name !== j;)d++;
                        d = c.p.colModel[d];
                        j = a.extend({}, d.searchoptions);
                        j.sopt || (j.sopt = [], j.sopt[0] = "select" === d.stype ? "eq" : b.defaultSearch);
                        a.each(b.odata, function () {
                            h.push(this.oper)
                        });
                        for (d = 0; d < j.sopt.length; d++)m = a.inArray(j.sopt[d], h), -1 !== m && (i = f === b.odata[m].oper ? "ui-state-highlight" : "", g += '<li class="ui-menu-item ' + i +
                            '" role="presentation"><a class="ui-corner-all g-menu-item" tabindex="0" role="menuitem" value="' + b.odata[m].oper + '" oper="' + b.operands[b.odata[m].oper] + '"><table cellspacing="0" cellpadding="0" border="0"><tr><td width="25px">' + b.operands[b.odata[m].oper] + "</td><td>" + b.odata[m].text + "</td></tr></table></a></li>");
                        a("body").append(g + "</ul>");
                        a("#sopt_menu").addClass("ui-menu ui-widget ui-widget-content ui-corner-all");
                        a("#sopt_menu > li > a").hover(function () {
                            a(this).addClass("ui-state-hover")
                        }, function () {
                            a(this).removeClass("ui-state-hover")
                        }).click(function () {
                            var g =
                                a(this).attr("value"), f = a(this).attr("oper");
                            a(c).triggerHandler("jqGridToolbarSelectOper", [g, f, k]);
                            a("#sopt_menu").hide();
                            a(k).text(f).attr("soper", g);
                            if (b.autosearch === true) {
                                f = a(k).parent().next().children()[0];
                                (a(f).val() || g === "nu" || g === "nn") && e()
                            }
                        })
                    }, i = a("<tr class='ui-search-toolbar' role='rowheader'></tr>"), h;
                    a.each(c.p.colModel, function (k) {
                        var g = this, f, d;
                        d = "";
                        var t = "=", m, p = a("<th role='columnheader' class='ui-state-default ui-th-column ui-th-" + c.p.direction + "'></th>"), j = a("<div style='position:relative;height:100%;padding-right:0.3em;padding-left:0.3em;'></div>"),
                            l = a("<table class='ui-search-table' cellspacing='0'><tr><td class='ui-search-oper'></td><td class='ui-search-input'></td><td class='ui-search-clear'></td></tr></table>");
                        !0 === this.hidden && a(p).css("display", "none");
                        this.search = !1 === this.search ? !1 : !0;
                        void 0 === this.stype && (this.stype = "text");
                        f = a.extend({}, this.searchoptions || {});
                        if (this.search) {
                            if (b.searchOperators) {
                                d = f.sopt ? f.sopt[0] : "select" === g.stype ? "eq" : b.defaultSearch;
                                for (m = 0; m < b.odata.length; m++)if (b.odata[m].oper === d) {
                                    t = b.operands[d] || "";
                                    break
                                }
                                d =
                                    "<a title='" + (null != f.searchtitle ? f.searchtitle : b.operandTitle) + "' style='padding-right: 0.5em;' soper='" + d + "' class='soptclass' colname='" + this.name + "'>" + t + "</a>"
                            }
                            a("td:eq(0)", l).attr("colindex", k).append(d);
                            void 0 === f.clearSearch && (f.clearSearch = !0);
                            f.clearSearch && a("td:eq(2)", l).append("<a title='Clear Search Value' style='padding-right: 0.3em;padding-left: 0.3em;' class='clearsearchclass'>x</a>");
                            switch (this.stype) {
                                case "select":
                                    if (d = this.surl || f.dataUrl)a(j).append(l), a.ajax(a.extend({
                                        url: d,
                                        dataType: "html", success: function (d) {
                                            if (f.buildSelect !== void 0)(d = f.buildSelect(d)) && a("td:eq(1)", l).append(d); else a("td:eq(1)", l).append(d);
                                            f.defaultValue !== void 0 && a("select", j).val(f.defaultValue);
                                            a("select", j).attr({name: g.index || g.name, id: "gs_" + g.name});
                                            f.attr && a("select", j).attr(f.attr);
                                            a("select", j).css({width: "100%"});
                                            a.jgrid.bindEv.call(c, a("select", j)[0], f);
                                            b.autosearch === true && a("select", j).change(function () {
                                                e();
                                                return false
                                            });
                                            d = null
                                        }
                                    }, a.jgrid.ajaxOptions, c.p.ajaxSelectOptions || {})); else {
                                        var n,
                                            r, q;
                                        g.searchoptions ? (n = void 0 === g.searchoptions.value ? "" : g.searchoptions.value, r = void 0 === g.searchoptions.separator ? ":" : g.searchoptions.separator, q = void 0 === g.searchoptions.delimiter ? ";" : g.searchoptions.delimiter) : g.editoptions && (n = void 0 === g.editoptions.value ? "" : g.editoptions.value, r = void 0 === g.editoptions.separator ? ":" : g.editoptions.separator, q = void 0 === g.editoptions.delimiter ? ";" : g.editoptions.delimiter);
                                        if (n) {
                                            k = document.createElement("select");
                                            k.style.width = "100%";
                                            a(k).attr({
                                                name: g.index || g.name,
                                                id: "gs_" + g.name
                                            });
                                            var s;
                                            if ("string" === typeof n) {
                                                d = n.split(q);
                                                for (s = 0; s < d.length; s++)n = d[s].split(r), q = document.createElement("option"), q.value = n[0], q.innerHTML = n[1], k.appendChild(q)
                                            } else if ("object" === typeof n)for (s in n)n.hasOwnProperty(s) && (q = document.createElement("option"), q.value = s, q.innerHTML = n[s], k.appendChild(q));
                                            void 0 !== f.defaultValue && a(k).val(f.defaultValue);
                                            f.attr && a(k).attr(f.attr);
                                            a(j).append(l);
                                            a.jgrid.bindEv.call(c, k, f);
                                            a("td:eq(1)", l).append(k);
                                            !0 === b.autosearch && a(k).change(function () {
                                                e();
                                                return false
                                            })
                                        }
                                    }
                                    break;
                                case "text":
                                    r = void 0 !== f.defaultValue ? f.defaultValue : "";
                                    a("td:eq(1)", l).append("<input type='text' style='width:100%;padding:0px;' name='" + (g.index || g.name) + "' id='gs_" + g.name + "' value='" + r + "'/>");
                                    a(j).append(l);
                                    f.attr && a("input", j).attr(f.attr);
                                    a.jgrid.bindEv.call(c, a("input", j)[0], f);
                                    !0 === b.autosearch && (b.searchOnEnter ? a("input", j).keypress(function (a) {
                                        if ((a.charCode || a.keyCode || 0) === 13) {
                                            e();
                                            return false
                                        }
                                        return this
                                    }) : a("input", j).keydown(function (a) {
                                        switch (a.which) {
                                            case 13:
                                                return false;
                                            case 9:
                                            case 16:
                                            case 37:
                                            case 38:
                                            case 39:
                                            case 40:
                                            case 27:
                                                break;
                                            default:
                                                h && clearTimeout(h);
                                                h = setTimeout(function () {
                                                    e()
                                                }, 500)
                                        }
                                    }));
                                    break;
                                case "custom":
                                    a("td:eq(1)", l).append("<span style='width:95%;padding:0px;' name='" + (g.index || g.name) + "' id='gs_" + g.name + "'/>");
                                    a(j).append(l);
                                    try {
                                        if (a.isFunction(f.custom_element)) {
                                            var v = f.custom_element.call(c, void 0 !== f.defaultValue ? f.defaultValue : "", f);
                                            if (v)v = a(v).addClass("customelement"), a(j).find(">span").append(v); else throw"e2";
                                        } else throw"e1";
                                    } catch (u) {
                                        "e1" ===
                                        u && a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_element' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose), "e2" === u ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_element' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, "string" === typeof u ? u : u.message, a.jgrid.edit.bClose)
                                    }
                            }
                        }
                        a(p).append(j);
                        a(i).append(p);
                        b.searchOperators || a("td:eq(0)", l).hide()
                    });
                    a("table thead", c.grid.hDiv).append(i);
                    b.searchOperators && (a(".soptclass", i).click(function (b) {
                        var c =
                            a(this).offset();
                        d(this, c.left, c.top);
                        b.stopPropagation()
                    }), a("body").on("click", function (b) {
                        "soptclass" !== b.target.className && a("#sopt_menu").hide()
                    }));
                    a(".clearsearchclass", i).click(function () {
                        var d = a(this).parents("tr:first"), g = parseInt(a("td.ui-search-oper", d).attr("colindex"), 10), f = a.extend({}, c.p.colModel[g].searchoptions || {}), f = f.defaultValue ? f.defaultValue : "";
                        c.p.colModel[g].stype === "select" ? f ? a("td.ui-search-input select", d).val(f) : a("td.ui-search-input select", d)[0].selectedIndex = 0 : a("td.ui-search-input input",
                            d).val(f);
                        b.autosearch === true && e()
                    });
                    this.ftoolbar = !0;
                    this.triggerToolbar = e;
                    this.clearToolbar = function (d) {
                        var g = {}, f = 0, e, d = typeof d !== "boolean" ? true : d;
                        a.each(c.p.colModel, function () {
                            var b, d = a("#gs_" + a.jgrid.jqID(this.name), this.frozen === true && c.p.frozenColumns === true ? c.grid.fhDiv : c.grid.hDiv);
                            if (this.searchoptions && this.searchoptions.defaultValue !== void 0)b = this.searchoptions.defaultValue;
                            e = this.index || this.name;
                            switch (this.stype) {
                                case "select":
                                    d.find("option").each(function (c) {
                                        if (c === 0)this.selected =
                                            true;
                                        if (a(this).val() === b) {
                                            this.selected = true;
                                            return false
                                        }
                                    });
                                    if (b !== void 0) {
                                        g[e] = b;
                                        f++
                                    } else try {
                                        delete c.p.postData[e]
                                    } catch (h) {
                                    }
                                    break;
                                case "text":
                                    d.val(b);
                                    if (b !== void 0) {
                                        g[e] = b;
                                        f++
                                    } else try {
                                        delete c.p.postData[e]
                                    } catch (i) {
                                    }
                                    break;
                                case "custom":
                                    a.isFunction(this.searchoptions.custom_value) && d.length > 0 && d[0].nodeName.toUpperCase() === "SPAN" && this.searchoptions.custom_value.call(c, d.children(".customelement:first"), "set", b)
                            }
                        });
                        var i = f > 0 ? true : false;
                        if (b.stringResult === true || c.p.datatype === "local") {
                            var h =
                                '{"groupOp":"' + b.groupOp + '","rules":[', p = 0;
                            a.each(g, function (a, b) {
                                p > 0 && (h = h + ",");
                                h = h + ('{"field":"' + a + '",');
                                h = h + '"op":"eq",';
                                h = h + ('"data":"' + (b + "").replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}');
                                p++
                            });
                            h = h + "]}";
                            a.extend(c.p.postData, {filters: h});
                            a.each(["searchField", "searchString", "searchOper"], function (a, b) {
                                c.p.postData.hasOwnProperty(b) && delete c.p.postData[b]
                            })
                        } else a.extend(c.p.postData, g);
                        var j;
                        if (c.p.searchurl) {
                            j = c.p.url;
                            a(c).jqGrid("setGridParam", {url: c.p.searchurl})
                        }
                        var l = a(c).triggerHandler("jqGridToolbarBeforeClear") ===
                        "stop" ? true : false;
                        !l && a.isFunction(b.beforeClear) && (l = b.beforeClear.call(c));
                        l || d && a(c).jqGrid("setGridParam", {search: i}).trigger("reloadGrid", [{page: 1}]);
                        j && a(c).jqGrid("setGridParam", {url: j});
                        a(c).triggerHandler("jqGridToolbarAfterClear");
                        a.isFunction(b.afterClear) && b.afterClear()
                    };
                    this.toggleToolbar = function () {
                        var b = a("tr.ui-search-toolbar", c.grid.hDiv), d = c.p.frozenColumns === true ? a("tr.ui-search-toolbar", c.grid.fhDiv) : false;
                        if (b.css("display") === "none") {
                            b.show();
                            d && d.show()
                        } else {
                            b.hide();
                            d && d.hide()
                        }
                    }
                }
            })
        },
        destroyFilterToolbar: function () {
            return this.each(function () {
                this.ftoolbar && (this.toggleToolbar = this.clearToolbar = this.triggerToolbar = null, this.ftoolbar = !1, a(this.grid.hDiv).find("table thead tr.ui-search-toolbar").remove())
            })
        }, destroyGroupHeader: function (b) {
            void 0 === b && (b = !0);
            return this.each(function () {
                var c, e, d, i, h, k;
                e = this.grid;
                var g = a("table.ui-jqgrid-htable thead", e.hDiv), f = this.p.colModel;
                if (e) {
                    a(this).unbind(".setGroupHeaders");
                    c = a("<tr>", {role: "rowheader"}).addClass("ui-jqgrid-labels");
                    i =
                        e.headers;
                    e = 0;
                    for (d = i.length; e < d; e++) {
                        h = f[e].hidden ? "none" : "";
                        h = a(i[e].el).width(i[e].width).css("display", h);
                        try {
                            h.removeAttr("rowSpan")
                        } catch (o) {
                            h.attr("rowSpan", 1)
                        }
                        c.append(h);
                        k = h.children("span.ui-jqgrid-resize");
                        0 < k.length && (k[0].style.height = "");
                        h.children("div")[0].style.top = ""
                    }
                    a(g).children("tr.ui-jqgrid-labels").remove();
                    a(g).prepend(c);
                    !0 === b && a(this).jqGrid("setGridParam", {groupHeader: null})
                }
            })
        }, setGroupHeaders: function (b) {
            b = a.extend({useColSpanStyle: !1, groupHeaders: []}, b || {});
            return this.each(function () {
                this.p.groupHeader =
                    b;
                var c, e, d = 0, i, h, k, g, f, o = this.p.colModel, t = o.length, m = this.grid.headers, p = a("table.ui-jqgrid-htable", this.grid.hDiv), j = p.children("thead").children("tr.ui-jqgrid-labels:last").addClass("jqg-second-row-header");
                i = p.children("thead");
                var l = p.find(".jqg-first-row-header");
                void 0 === l[0] ? l = a("<tr>", {
                    role: "row",
                    "aria-hidden": "true"
                }).addClass("jqg-first-row-header").css("height", "auto") : l.empty();
                var n, r = function (a, b) {
                    var c = b.length, d;
                    for (d = 0; d < c; d++)if (b[d].startColumnName === a)return d;
                    return -1
                };
                a(this).prepend(i);
                i = a("<tr>", {role: "rowheader"}).addClass("ui-jqgrid-labels jqg-third-row-header");
                for (c = 0; c < t; c++)if (k = m[c].el, g = a(k), e = o[c], h = {
                        height: "0px",
                        width: m[c].width + "px",
                        display: e.hidden ? "none" : ""
                    }, a("<th>", {role: "gridcell"}).css(h).addClass("ui-first-th-" + this.p.direction).appendTo(l), k.style.width = "", h = r(e.name, b.groupHeaders), 0 <= h) {
                    h = b.groupHeaders[h];
                    d = h.numberOfColumns;
                    f = h.titleText;
                    for (h = e = 0; h < d && c + h < t; h++)o[c + h].hidden || e++;
                    h = a("<th>").attr({role: "columnheader"}).addClass("ui-state-default ui-th-column-header ui-th-" +
                        this.p.direction).css({height: "22px", "border-top": "0px none"}).html(f);
                    0 < e && h.attr("colspan", "" + e);
                    this.p.headertitles && h.attr("title", h.text());
                    0 === e && h.hide();
                    g.before(h);
                    i.append(k);
                    d -= 1
                } else 0 === d ? b.useColSpanStyle ? g.attr("rowspan", "2") : (a("<th>", {role: "columnheader"}).addClass("ui-state-default ui-th-column-header ui-th-" + this.p.direction).css({
                    display: e.hidden ? "none" : "",
                    "border-top": "0px none"
                }).insertBefore(g), i.append(k)) : (i.append(k), d--);
                o = a(this).children("thead");
                o.prepend(l);
                i.insertAfter(j);
                p.append(o);
                b.useColSpanStyle && (p.find("span.ui-jqgrid-resize").each(function () {
                    var b = a(this).parent();
                    b.is(":visible") && (this.style.cssText = "height: " + b.height() + "px !important; cursor: col-resize;")
                }), p.find("div.ui-jqgrid-sortable").each(function () {
                    var b = a(this), c = b.parent();
                    c.is(":visible") && c.is(":has(span.ui-jqgrid-resize)") && b.css("top", (c.height() - b.outerHeight()) / 2 + "px")
                }));
                n = o.find("tr.jqg-first-row-header");
                a(this).bind("jqGridResizeStop.setGroupHeaders", function (a, b, c) {
                    n.find("th").eq(c).width(b)
                })
            })
        },
        setFrozenColumns: function () {
            return this.each(function () {
                if (this.grid) {
                    var b = this, c = b.p.colModel, e = 0, d = c.length, i = -1, h = !1;
                    if (!(!0 === b.p.subGrid || !0 === b.p.treeGrid || !0 === b.p.cellEdit || b.p.sortable || b.p.scroll || b.p.grouping)) {
                        b.p.rownumbers && e++;
                        for (b.p.multiselect && e++; e < d;) {
                            if (!0 === c[e].frozen)h = !0, i = e; else break;
                            e++
                        }
                        if (0 <= i && h) {
                            c = b.p.caption ? a(b.grid.cDiv).outerHeight() : 0;
                            e = a(".ui-jqgrid-htable", "#gview_" + a.jgrid.jqID(b.p.id)).height();
                            b.p.toppager && (c += a(b.grid.topDiv).outerHeight());
                            !0 === b.p.toolbar[0] &&
                            "bottom" !== b.p.toolbar[1] && (c += a(b.grid.uDiv).outerHeight());
                            b.grid.fhDiv = a('<div style="position:absolute;left:0px;top:' + c + "px;height:" + e + 'px;" class="frozen-div ui-state-default ui-jqgrid-hdiv"></div>');
                            b.grid.fbDiv = a('<div style="position:absolute;left:0px;top:' + (parseInt(c, 10) + parseInt(e, 10) + 1) + 'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>');
                            a("#gview_" + a.jgrid.jqID(b.p.id)).append(b.grid.fhDiv);
                            c = a(".ui-jqgrid-htable", "#gview_" + a.jgrid.jqID(b.p.id)).clone(!0);
                            if (b.p.groupHeader) {
                                a("tr.jqg-first-row-header, tr.jqg-third-row-header",
                                    c).each(function () {
                                        a("th:gt(" + i + ")", this).remove()
                                    });
                                var k = -1, g = -1, f, o;
                                a("tr.jqg-second-row-header th", c).each(function () {
                                    f = parseInt(a(this).attr("colspan"), 10);
                                    if (o = parseInt(a(this).attr("rowspan"), 10))k++, g++;
                                    f && (k += f, g++);
                                    if (k === i)return !1
                                });
                                k !== i && (g = i);
                                a("tr.jqg-second-row-header", c).each(function () {
                                    a("th:gt(" + g + ")", this).remove()
                                })
                            } else a("tr", c).each(function () {
                                a("th:gt(" + i + ")", this).remove()
                            });
                            a(c).width(1);
                            a(b.grid.fhDiv).append(c).mousemove(function (a) {
                                if (b.grid.resizing)return b.grid.dragMove(a),
                                    !1
                            });
                            a(b).bind("jqGridResizeStop.setFrozenColumns", function (c, d, e) {
                                c = a(".ui-jqgrid-htable", b.grid.fhDiv);
                                a("th:eq(" + e + ")", c).width(d);
                                c = a(".ui-jqgrid-btable", b.grid.fbDiv);
                                a("tr:first td:eq(" + e + ")", c).width(d)
                            });
                            a(b).bind("jqGridSortCol.setFrozenColumns", function (c, d, e) {
                                c = a("tr.ui-jqgrid-labels:last th:eq(" + b.p.lastsort + ")", b.grid.fhDiv);
                                d = a("tr.ui-jqgrid-labels:last th:eq(" + e + ")", b.grid.fhDiv);
                                a("span.ui-grid-ico-sort", c).addClass("ui-state-disabled");
                                a(c).attr("aria-selected", "false");
                                a("span.ui-icon-" +
                                    b.p.sortorder, d).removeClass("ui-state-disabled");
                                a(d).attr("aria-selected", "true");
                                !b.p.viewsortcols[0] && b.p.lastsort !== e && (a("span.s-ico", c).hide(), a("span.s-ico", d).show())
                            });
                            a("#gview_" + a.jgrid.jqID(b.p.id)).append(b.grid.fbDiv);
                            a(b.grid.bDiv).scroll(function () {
                                a(b.grid.fbDiv).scrollTop(a(this).scrollTop())
                            });
                            !0 === b.p.hoverrows && a("#" + a.jgrid.jqID(b.p.id)).unbind("mouseover").unbind("mouseout");
                            a(b).bind("jqGridAfterGridComplete.setFrozenColumns", function () {
                                a("#" + a.jgrid.jqID(b.p.id) + "_frozen").remove();
                                a(b.grid.fbDiv).height(a(b.grid.bDiv).height() - 16);
                                var c = a("#" + a.jgrid.jqID(b.p.id)).clone(!0);
                                a("tr[role=row]", c).each(function () {
                                    a("td[role=gridcell]:gt(" + i + ")", this).remove()
                                });
                                a(c).width(1).attr("id", b.p.id + "_frozen");
                                a(b.grid.fbDiv).append(c);
                                !0 === b.p.hoverrows && (a("tr.jqgrow", c).hover(function () {
                                    a(this).addClass("ui-state-hover");
                                    a("#" + a.jgrid.jqID(this.id), "#" + a.jgrid.jqID(b.p.id)).addClass("ui-state-hover")
                                }, function () {
                                    a(this).removeClass("ui-state-hover");
                                    a("#" + a.jgrid.jqID(this.id), "#" +
                                        a.jgrid.jqID(b.p.id)).removeClass("ui-state-hover")
                                }), a("tr.jqgrow", "#" + a.jgrid.jqID(b.p.id)).hover(function () {
                                    a(this).addClass("ui-state-hover");
                                    a("#" + a.jgrid.jqID(this.id), "#" + a.jgrid.jqID(b.p.id) + "_frozen").addClass("ui-state-hover")
                                }, function () {
                                    a(this).removeClass("ui-state-hover");
                                    a("#" + a.jgrid.jqID(this.id), "#" + a.jgrid.jqID(b.p.id) + "_frozen").removeClass("ui-state-hover")
                                }));
                                c = null
                            });
                            b.grid.hDiv.loading || a(b).triggerHandler("jqGridAfterGridComplete");
                            b.p.frozenColumns = !0
                        }
                    }
                }
            })
        }, destroyFrozenColumns: function () {
            return this.each(function () {
                if (this.grid &&
                    !0 === this.p.frozenColumns) {
                    a(this.grid.fhDiv).remove();
                    a(this.grid.fbDiv).remove();
                    this.grid.fhDiv = null;
                    this.grid.fbDiv = null;
                    a(this).unbind(".setFrozenColumns");
                    if (!0 === this.p.hoverrows) {
                        var b;
                        a("#" + a.jgrid.jqID(this.p.id)).bind("mouseover", function (c) {
                            b = a(c.target).closest("tr.jqgrow");
                            "ui-subgrid" !== a(b).attr("class") && a(b).addClass("ui-state-hover")
                        }).bind("mouseout", function (c) {
                            b = a(c.target).closest("tr.jqgrow");
                            a(b).removeClass("ui-state-hover")
                        })
                    }
                    this.p.frozenColumns = !1
                }
            })
        }
    })
})(jQuery);
(function (a) {
    a.extend(a.jgrid, {
        showModal: function (a) {
            a.w.show()
        }, closeModal: function (a) {
            a.w.hide().attr("aria-hidden", "true");
            a.o && a.o.remove()
        }, hideModal: function (d, b) {
            b = a.extend({jqm: !0, gb: ""}, b || {});
            if (b.onClose) {
                var c = b.gb && "string" === typeof b.gb && "#gbox_" === b.gb.substr(0, 6) ? b.onClose.call(a("#" + b.gb.substr(6))[0], d) : b.onClose(d);
                if ("boolean" === typeof c && !c)return
            }
            if (a.fn.jqm && !0 === b.jqm)a(d).attr("aria-hidden", "true").jqmHide(); else {
                if ("" !== b.gb)try {
                    a(".jqgrid-overlay:first", b.gb).hide()
                } catch (g) {
                }
                a(d).hide().attr("aria-hidden",
                    "true")
            }
        }, findPos: function (a) {
            var b = 0, c = 0;
            if (a.offsetParent) {
                do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent)
            }
            return [b, c]
        }, createModal: function (d, b, c, g, e, h, f) {
            var c = a.extend(!0, {}, a.jgrid.jqModal || {}, c), i = document.createElement("div"), j, k = this, f = a.extend({}, f || {});
            j = "rtl" === a(c.gbox).attr("dir") ? !0 : !1;
            i.className = "ui-widget ui-widget-content ui-corner-all ui-jqdialog";
            i.id = d.themodal;
            var l = document.createElement("div");
            l.className = "ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix";
            l.id = d.modalhead;
            a(l).append("<span class='ui-jqdialog-title'>" + c.caption + "</span>");
            var n = a("<a class='ui-jqdialog-titlebar-close ui-corner-all'></a>").hover(function () {
                n.addClass("ui-state-hover")
            }, function () {
                n.removeClass("ui-state-hover")
            }).append("<span class='ui-icon ui-icon-closethick'></span>");
            a(l).append(n);
            j ? (i.dir = "rtl", a(".ui-jqdialog-title", l).css("float", "right"), a(".ui-jqdialog-titlebar-close", l).css("left", "0.3em")) : (i.dir = "ltr", a(".ui-jqdialog-title", l).css("float", "left"), a(".ui-jqdialog-titlebar-close",
                l).css("right", "0.3em"));
            var m = document.createElement("div");
            a(m).addClass("ui-jqdialog-content ui-widget-content").attr("id", d.modalcontent);
            a(m).append(b);
            i.appendChild(m);
            a(i).prepend(l);
            !0 === h ? a("body").append(i) : "string" === typeof h ? a(h).append(i) : a(i).insertBefore(g);
            a(i).css(f);
            void 0 === c.jqModal && (c.jqModal = !0);
            b = {};
            if (a.fn.jqm && !0 === c.jqModal)0 === c.left && 0 === c.top && c.overlay && (f = [], f = a.jgrid.findPos(e), c.left = f[0] + 4, c.top = f[1] + 4), b.top = c.top + "px", b.left = c.left; else if (0 !== c.left || 0 !== c.top)b.left =
                c.left, b.top = c.top + "px";
            a("a.ui-jqdialog-titlebar-close", l).click(function () {
                var b = a("#" + a.jgrid.jqID(d.themodal)).data("onClose") || c.onClose, e = a("#" + a.jgrid.jqID(d.themodal)).data("gbox") || c.gbox;
                k.hideModal("#" + a.jgrid.jqID(d.themodal), {gb: e, jqm: c.jqModal, onClose: b});
                return false
            });
            if (0 === c.width || !c.width)c.width = 300;
            if (0 === c.height || !c.height)c.height = 200;
            c.zIndex || (g = a(g).parents("*[role=dialog]").filter(":first").css("z-index"), c.zIndex = g ? parseInt(g, 10) + 2 : 950);
            g = 0;
            j && b.left && !h && (g = a(c.gbox).width() -
                (!isNaN(c.width) ? parseInt(c.width, 10) : 0) - 8, b.left = parseInt(b.left, 10) + parseInt(g, 10));
            b.left && (b.left += "px");
            a(i).css(a.extend({
                width: isNaN(c.width) ? "auto" : c.width + "px",
                height: isNaN(c.height) ? "auto" : c.height + "px",
                zIndex: c.zIndex,
                overflow: "hidden"
            }, b)).attr({tabIndex: "-1", role: "dialog", "aria-labelledby": d.modalhead, "aria-hidden": "true"});
            void 0 === c.drag && (c.drag = !0);
            void 0 === c.resize && (c.resize = !0);
            if (c.drag)if (a(l).css("cursor", "move"), a.fn.jqDrag)a(i).jqDrag(l); else try {
                a(i).draggable({
                    handle: a("#" +
                        a.jgrid.jqID(l.id))
                })
            } catch (o) {
            }
            if (c.resize)if (a.fn.jqResize)a(i).append("<div class='jqResize ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se'></div>"), a("#" + a.jgrid.jqID(d.themodal)).jqResize(".jqResize", d.scrollelm ? "#" + a.jgrid.jqID(d.scrollelm) : !1); else try {
                a(i).resizable({handles: "se, sw", alsoResize: d.scrollelm ? "#" + a.jgrid.jqID(d.scrollelm) : !1})
            } catch (p) {
            }
            !0 === c.closeOnEscape && a(i).keydown(function (b) {
                if (b.which == 27) {
                    b = a("#" + a.jgrid.jqID(d.themodal)).data("onClose") ||
                        c.onClose;
                    k.hideModal("#" + a.jgrid.jqID(d.themodal), {gb: c.gbox, jqm: c.jqModal, onClose: b})
                }
            })
        }, viewModal: function (d, b) {
            b = a.extend({
                toTop: !0,
                overlay: 10,
                modal: !1,
                overlayClass: "ui-widget-overlay",
                onShow: a.jgrid.showModal,
                onHide: a.jgrid.closeModal,
                gbox: "",
                jqm: !0,
                jqM: !0
            }, b || {});
            if (a.fn.jqm && !0 === b.jqm)b.jqM ? a(d).attr("aria-hidden", "false").jqm(b).jqmShow() : a(d).attr("aria-hidden", "false").jqmShow(); else {
                "" !== b.gbox && (a(".jqgrid-overlay:first", b.gbox).show(), a(d).data("gbox", b.gbox));
                a(d).show().attr("aria-hidden",
                    "false");
                try {
                    a(":input:visible", d)[0].focus()
                } catch (c) {
                }
            }
        }, info_dialog: function (d, b, c, g) {
            var e = {
                width: 290,
                height: "auto",
                dataheight: "auto",
                drag: !0,
                resize: !1,
                left: 250,
                top: 170,
                zIndex: 1E3,
                jqModal: !0,
                modal: !1,
                closeOnEscape: !0,
                align: "center",
                buttonalign: "center",
                buttons: []
            };
            a.extend(!0, e, a.jgrid.jqModal || {}, {caption: "<b>" + d + "</b>"}, g || {});
            var h = e.jqModal, f = this;
            a.fn.jqm && !h && (h = !1);
            d = "";
            if (0 < e.buttons.length)for (g = 0; g < e.buttons.length; g++)void 0 === e.buttons[g].id && (e.buttons[g].id = "info_button_" + g), d +=
                "<a id='" + e.buttons[g].id + "' class='fm-button ui-state-default ui-corner-all'>" + e.buttons[g].text + "</a>";
            g = isNaN(e.dataheight) ? e.dataheight : e.dataheight + "px";
            b = "<div id='info_id'>" + ("<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:" + g + ";" + ("text-align:" + e.align + ";") + "'>" + b + "</div>");
            b += c ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:" + e.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a id='closedialog' class='fm-button ui-state-default ui-corner-all'>" +
            c + "</a>" + d + "</div>" : "" !== d ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:" + e.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'>" + d + "</div>" : "";
            b += "</div>";
            try {
                "false" === a("#info_dialog").attr("aria-hidden") && a.jgrid.hideModal("#info_dialog", {jqm: h}), a("#info_dialog").remove()
            } catch (i) {
            }
            a.jgrid.createModal({
                themodal: "info_dialog",
                modalhead: "info_head",
                modalcontent: "info_content",
                scrollelm: "infocnt"
            }, b, e, "", "", !0);
            d && a.each(e.buttons,
                function (b) {
                    a("#" + a.jgrid.jqID(this.id), "#info_id").bind("click", function () {
                        e.buttons[b].onClick.call(a("#info_dialog"));
                        return !1
                    })
                });
            a("#closedialog", "#info_id").click(function () {
                f.hideModal("#info_dialog", {
                    jqm: h,
                    onClose: a("#info_dialog").data("onClose") || e.onClose,
                    gb: a("#info_dialog").data("gbox") || e.gbox
                });
                return !1
            });
            a(".fm-button", "#info_dialog").hover(function () {
                a(this).addClass("ui-state-hover")
            }, function () {
                a(this).removeClass("ui-state-hover")
            });
            a.isFunction(e.beforeOpen) && e.beforeOpen();
            a.jgrid.viewModal("#info_dialog",
                {
                    onHide: function (a) {
                        a.w.hide().remove();
                        a.o && a.o.remove()
                    }, modal: e.modal, jqm: h
                });
            a.isFunction(e.afterOpen) && e.afterOpen();
            try {
                a("#info_dialog").focus()
            } catch (j) {
            }
        }, bindEv: function (d, b) {
            a.isFunction(b.dataInit) && b.dataInit.call(this, d, b);
            b.dataEvents && a.each(b.dataEvents, function () {
                void 0 !== this.data ? a(d).bind(this.type, this.data, this.fn) : a(d).bind(this.type, this.fn)
            })
        }, createEl: function (d, b, c, g, e) {
            function h(b, d, c) {
                var e = "dataInit,dataEvents,dataUrl,buildSelect,sopt,searchhidden,defaultValue,attr,custom_element,custom_value".split(",");
                void 0 !== c && a.isArray(c) && a.merge(e, c);
                a.each(d, function (d, c) {
                    -1 === a.inArray(d, e) && a(b).attr(d, c)
                });
                d.hasOwnProperty("id") || a(b).attr("id", a.jgrid.randId())
            }

            var f = "", i = this;
            switch (d) {
                case "textarea":
                    f = document.createElement("textarea");
                    g ? b.cols || a(f).css({width: "98%"}) : b.cols || (b.cols = 20);
                    b.rows || (b.rows = 2);
                    if ("&nbsp;" === c || "&#160;" === c || 1 === c.length && 160 === c.charCodeAt(0))c = "";
                    f.value = c;
                    h(f, b);
                    a(f).attr({role: "textbox", multiline: "true"});
                    break;
                case "checkbox":
                    f = document.createElement("input");
                    f.type =
                        "checkbox";
                    b.value ? (d = b.value.split(":"), c === d[0] && (f.checked = !0, f.defaultChecked = !0), f.value = d[0], a(f).attr("offval", d[1])) : (d = (c + "").toLowerCase(), 0 > d.search(/(false|f|0|no|n|off|undefined)/i) && "" !== d ? (f.checked = !0, f.defaultChecked = !0, f.value = c) : f.value = "on", a(f).attr("offval", "off"));
                    h(f, b, ["value"]);
                    a(f).attr("role", "checkbox");
                    break;
                case "select":
                    f = document.createElement("select");
                    f.setAttribute("role", "select");
                    g = [];
                    !0 === b.multiple ? (d = !0, f.multiple = "multiple", a(f).attr("aria-multiselectable",
                        "true")) : d = !1;
                    if (void 0 !== b.dataUrl) {
                        var d = b.name ? ("" + b.id).substring(0, ("" + b.id).length - ("" + b.name).length - 1) : "" + b.id, j = b.postData || e.postData;
                        i.p && i.p.idPrefix && (d = a.jgrid.stripPref(i.p.idPrefix, d));
                        a.ajax(a.extend({
                            url: a.isFunction(b.dataUrl) ? b.dataUrl.call(i, d, c, "" + b.name) : b.dataUrl,
                            type: "GET",
                            dataType: "html",
                            data: a.isFunction(j) ? j.call(i, d, c, "" + b.name) : j,
                            context: {elem: f, options: b, vl: c},
                            success: function (b) {
                                var d = [], c = this.elem, e = this.vl, f = a.extend({}, this.options), g = f.multiple === true, b = a.isFunction(f.buildSelect) ?
                                    f.buildSelect.call(i, b) : b;
                                typeof b === "string" && (b = a(a.trim(b)).html());
                                if (b) {
                                    a(c).append(b);
                                    h(c, f, j ? ["postData"] : void 0);
                                    if (f.size === void 0)f.size = g ? 3 : 1;
                                    if (g) {
                                        d = e.split(",");
                                        d = a.map(d, function (b) {
                                            return a.trim(b)
                                        })
                                    } else d[0] = a.trim(e);
                                    setTimeout(function () {
                                        a("option", c).each(function (b) {
                                            if (b === 0 && c.multiple)this.selected = false;
                                            a(this).attr("role", "option");
                                            if (a.inArray(a.trim(a(this).text()), d) > -1 || a.inArray(a.trim(a(this).val()), d) > -1)this.selected = "selected"
                                        })
                                    }, 0)
                                }
                            }
                        }, e || {}))
                    } else if (b.value) {
                        var k;
                        void 0 === b.size && (b.size = d ? 3 : 1);
                        d && (g = c.split(","), g = a.map(g, function (b) {
                            return a.trim(b)
                        }));
                        "function" === typeof b.value && (b.value = b.value());
                        var l, n, m = void 0 === b.separator ? ":" : b.separator, e = void 0 === b.delimiter ? ";" : b.delimiter;
                        if ("string" === typeof b.value) {
                            l = b.value.split(e);
                            for (k = 0; k < l.length; k++) {
                                n = l[k].split(m);
                                2 < n.length && (n[1] = a.map(n, function (a, b) {
                                    if (b > 0)return a
                                }).join(m));
                                e = document.createElement("option");
                                e.setAttribute("role", "option");
                                e.value = n[0];
                                e.innerHTML = n[1];
                                f.appendChild(e);
                                if (!d &&
                                    (a.trim(n[0]) === a.trim(c) || a.trim(n[1]) === a.trim(c)))e.selected = "selected";
                                if (d && (-1 < a.inArray(a.trim(n[1]), g) || -1 < a.inArray(a.trim(n[0]), g)))e.selected = "selected"
                            }
                        } else if ("object" === typeof b.value)for (k in m = b.value, m)if (m.hasOwnProperty(k)) {
                            e = document.createElement("option");
                            e.setAttribute("role", "option");
                            e.value = k;
                            e.innerHTML = m[k];
                            f.appendChild(e);
                            if (!d && (a.trim(k) === a.trim(c) || a.trim(m[k]) === a.trim(c)))e.selected = "selected";
                            if (d && (-1 < a.inArray(a.trim(m[k]), g) || -1 < a.inArray(a.trim(k), g)))e.selected =
                                "selected"
                        }
                        h(f, b, ["value"])
                    }
                    break;
                case "text":
                case "password":
                case "button":
                    k = "button" === d ? "button" : "textbox";
                    f = document.createElement("input");
                    f.type = d;
                    f.value = c;
                    h(f, b);
                    "button" !== d && (g ? b.size || a(f).css({width: "98%"}) : b.size || (b.size = 20));
                    a(f).attr("role", k);
                    break;
                case "image":
                case "file":
                    f = document.createElement("input");
                    f.type = d;
                    h(f, b);
                    break;
                case "custom":
                    f = document.createElement("span");
                    try {
                        if (a.isFunction(b.custom_element))if (m = b.custom_element.call(i, c, b))m = a(m).addClass("customelement").attr({
                            id: b.id,
                            name: b.name
                        }), a(f).empty().append(m); else throw"e2"; else throw"e1";
                    } catch (o) {
                        "e1" === o && a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_element' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose), "e2" === o ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_element' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, "string" === typeof o ? o : o.message, a.jgrid.edit.bClose)
                    }
            }
            return f
        }, checkDate: function (a, b) {
            var c = {}, g, a = a.toLowerCase();
            g = -1 !== a.indexOf("/") ?
                "/" : -1 !== a.indexOf("-") ? "-" : -1 !== a.indexOf(".") ? "." : "/";
            a = a.split(g);
            b = b.split(g);
            if (3 !== b.length)return !1;
            g = -1;
            var e, h = -1, f = -1, i;
            for (i = 0; i < a.length; i++)e = isNaN(b[i]) ? 0 : parseInt(b[i], 10), c[a[i]] = e, e = a[i], -1 !== e.indexOf("y") && (g = i), -1 !== e.indexOf("m") && (f = i), -1 !== e.indexOf("d") && (h = i);
            e = "y" === a[g] || "yyyy" === a[g] ? 4 : "yy" === a[g] ? 2 : -1;
            i = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var j;
            if (-1 === g)return !1;
            j = c[a[g]].toString();
            2 === e && 1 === j.length && (e = 1);
            if (j.length !== e || 0 === c[a[g]] && "00" !== b[g] || -1 === f)return !1;
            j = c[a[f]].toString();
            if (1 > j.length || 1 > c[a[f]] || 12 < c[a[f]] || -1 === h)return !1;
            j = c[a[h]].toString();
            return 1 > j.length || 1 > c[a[h]] || 31 < c[a[h]] || 2 === c[a[f]] && c[a[h]] > (0 === c[a[g]] % 4 && (0 !== c[a[g]] % 100 || 0 === c[a[g]] % 400) ? 29 : 28) || c[a[h]] > i[c[a[f]]] ? !1 : !0
        }, isEmpty: function (a) {
            return a.match(/^\s+$/) || "" === a ? !0 : !1
        }, checkTime: function (d) {
            var b = /^(\d{1,2}):(\d{2})([apAP][Mm])?$/;
            if (!a.jgrid.isEmpty(d))if (d = d.match(b)) {
                if (d[3]) {
                    if (1 > d[1] || 12 < d[1])return !1
                } else if (23 < d[1])return !1;
                if (59 < d[2])return !1
            } else return !1;
            return !0
        }, checkValues: function (d, b, c, g) {
            var e, h, f;
            f = this.p.colModel;
            if (void 0 === c)if ("string" === typeof b) {
                c = 0;
                for (g = f.length; c < g; c++)if (f[c].name === b) {
                    e = f[c].editrules;
                    b = c;
                    null != f[c].formoptions && (h = f[c].formoptions.label);
                    break
                }
            } else 0 <= b && (e = f[b].editrules); else e = c, h = void 0 === g ? "_" : g;
            if (e) {
                h || (h = null != this.p.colNames ? this.p.colNames[b] : f[b].label);
                if (!0 === e.required && a.jgrid.isEmpty(d))return [!1, h + ": " + a.jgrid.edit.msg.required, ""];
                c = !1 === e.required ? !1 : !0;
                if (!0 === e.number && !(!1 === c && a.jgrid.isEmpty(d)) &&
                    isNaN(d))return [!1, h + ": " + a.jgrid.edit.msg.number, ""];
                if (void 0 !== e.minValue && !isNaN(e.minValue) && parseFloat(d) < parseFloat(e.minValue))return [!1, h + ": " + a.jgrid.edit.msg.minValue + " " + e.minValue, ""];
                if (void 0 !== e.maxValue && !isNaN(e.maxValue) && parseFloat(d) > parseFloat(e.maxValue))return [!1, h + ": " + a.jgrid.edit.msg.maxValue + " " + e.maxValue, ""];
                if (!0 === e.email && !(!1 === c && a.jgrid.isEmpty(d)) && (g = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                        !g.test(d)))return [!1, h + ": " + a.jgrid.edit.msg.email, ""];
                if (!0 === e.integer && !(!1 === c && a.jgrid.isEmpty(d)) && (isNaN(d) || 0 !== d % 1 || -1 !== d.indexOf(".")))return [!1, h + ": " + a.jgrid.edit.msg.integer, ""];
                if (!0 === e.date && !(!1 === c && a.jgrid.isEmpty(d)) && (f[b].formatoptions && f[b].formatoptions.newformat ? (f = f[b].formatoptions.newformat, a.jgrid.formatter.date.masks.hasOwnProperty(f) && (f = a.jgrid.formatter.date.masks[f])) : f = f[b].datefmt || "Y-m-d", !a.jgrid.checkDate(f, d)))return [!1, h + ": " + a.jgrid.edit.msg.date + " - " +
                f, ""];
                if (!0 === e.time && !(!1 === c && a.jgrid.isEmpty(d)) && !a.jgrid.checkTime(d))return [!1, h + ": " + a.jgrid.edit.msg.date + " - hh:mm (am/pm)", ""];
                if (!0 === e.url && !(!1 === c && a.jgrid.isEmpty(d)) && (g = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i, !g.test(d)))return [!1, h + ": " + a.jgrid.edit.msg.url, ""];
                if (!0 === e.custom && !(!1 === c && a.jgrid.isEmpty(d)))return a.isFunction(e.custom_func) ? (d = e.custom_func.call(this, d, h, b), a.isArray(d) ? d : [!1, a.jgrid.edit.msg.customarray,
                    ""]) : [!1, a.jgrid.edit.msg.customfcheck, ""]
            }
            return [!0, "", ""]
        }
    })
})(jQuery);
(function (a) {
    var b = {};
    a.jgrid.extend({
        searchGrid: function (b) {
            b = a.extend(!0, {
                recreateFilter: !1,
                drag: !0,
                sField: "searchField",
                sValue: "searchString",
                sOper: "searchOper",
                sFilter: "filters",
                loadDefaults: !0,
                beforeShowSearch: null,
                afterShowSearch: null,
                onInitializeSearch: null,
                afterRedraw: null,
                afterChange: null,
                closeAfterSearch: !1,
                closeAfterReset: !1,
                closeOnEscape: !1,
                searchOnEnter: !1,
                multipleSearch: !1,
                multipleGroup: !1,
                top: 0,
                left: 0,
                jqModal: !0,
                modal: !1,
                resize: !0,
                width: 450,
                height: "auto",
                dataheight: "auto",
                showQuery: !1,
                errorcheck: !0,
                sopt: null,
                stringResult: void 0,
                onClose: null,
                onSearch: null,
                onReset: null,
                toTop: !0,
                overlay: 30,
                columns: [],
                tmplNames: null,
                tmplFilters: null,
                tmplLabel: " Template: ",
                showOnLoad: !1,
                layer: null,
                operands: {
                    eq: "=",
                    ne: "<>",
                    lt: "<",
                    le: "<=",
                    gt: ">",
                    ge: ">=",
                    bw: "LIKE",
                    bn: "NOT LIKE",
                    "in": "IN",
                    ni: "NOT IN",
                    ew: "LIKE",
                    en: "NOT LIKE",
                    cn: "LIKE",
                    nc: "NOT LIKE",
                    nu: "IS NULL",
                    nn: "ISNOT NULL"
                }
            }, a.jgrid.search, b || {});
            return this.each(function () {
                function c(c) {
                    u = a(e).triggerHandler("jqGridFilterBeforeShow", [c]);
                    void 0 ===
                    u && (u = !0);
                    u && a.isFunction(b.beforeShowSearch) && (u = b.beforeShowSearch.call(e, c));
                    u && (a.jgrid.viewModal("#" + a.jgrid.jqID(q.themodal), {
                        gbox: "#gbox_" + a.jgrid.jqID(h),
                        jqm: b.jqModal,
                        modal: b.modal,
                        overlay: b.overlay,
                        toTop: b.toTop
                    }), a(e).triggerHandler("jqGridFilterAfterShow", [c]), a.isFunction(b.afterShowSearch) && b.afterShowSearch.call(e, c))
                }

                var e = this;
                if (e.grid) {
                    var h = "fbox_" + e.p.id, u = !0, r = !0, q = {
                        themodal: "searchmod" + h,
                        modalhead: "searchhd" + h,
                        modalcontent: "searchcnt" + h,
                        scrollelm: h
                    }, o = e.p.postData[b.sFilter];
                    "string" === typeof o && (o = a.jgrid.parse(o));
                    !0 === b.recreateFilter && a("#" + a.jgrid.jqID(q.themodal)).remove();
                    if (void 0 !== a("#" + a.jgrid.jqID(q.themodal))[0])c(a("#fbox_" + a.jgrid.jqID(+e.p.id))); else {
                        var f = a("<div><div id='" + h + "' class='searchFilter' style='overflow:auto'></div></div>").insertBefore("#gview_" + a.jgrid.jqID(e.p.id)), i = "left", t = "";
                        "rtl" === e.p.direction && (i = "right", t = " style='text-align:left'", f.attr("dir", "rtl"));
                        var v = a.extend([], e.p.colModel), d = "<a id='" + h + "_search' class='fm-button ui-state-default ui-corner-all fm-button-icon-right ui-reset'><span class='ui-icon ui-icon-search'></span>" +
                            b.Find + "</a>", p = "<a id='" + h + "_reset' class='fm-button ui-state-default ui-corner-all fm-button-icon-left ui-search'><span class='ui-icon ui-icon-arrowreturnthick-1-w'></span>" + b.Reset + "</a>", g = "", m = "", l, n = !1, x = -1;
                        b.showQuery && (g = "<a id='" + h + "_query' class='fm-button ui-state-default ui-corner-all fm-button-icon-left'><span class='ui-icon ui-icon-comment'></span>Query</a>");
                        b.columns.length ? (v = b.columns, x = 0, l = v[0].index || v[0].name) : a.each(v, function (a, b) {
                            if (!b.label)b.label = e.p.colNames[a];
                            if (!n) {
                                var c =
                                    b.search === void 0 ? true : b.search, d = b.hidden === true;
                                if (b.searchoptions && b.searchoptions.searchhidden === true && c || c && !d) {
                                    n = true;
                                    l = b.index || b.name;
                                    x = a
                                }
                            }
                        });
                        if (!o && l || !1 === b.multipleSearch) {
                            var A = "eq";
                            0 <= x && v[x].searchoptions && v[x].searchoptions.sopt ? A = v[x].searchoptions.sopt[0] : b.sopt && b.sopt.length && (A = b.sopt[0]);
                            o = {groupOp: "AND", rules: [{field: l, op: A, data: ""}]}
                        }
                        n = !1;
                        b.tmplNames && b.tmplNames.length && (n = !0, m = b.tmplLabel, m += "<select class='ui-template'>", m += "<option value='default'>Default</option>", a.each(b.tmplNames,
                            function (a, b) {
                                m = m + ("<option value='" + a + "'>" + b + "</option>")
                            }), m += "</select>");
                        i = "<table class='EditTable' style='border:0px none;margin-top:5px' id='" + h + "_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='EditButton' style='text-align:" + i + "'>" + p + m + "</td><td class='EditButton' " + t + ">" + g + d + "</td></tr></tbody></table>";
                        h = a.jgrid.jqID(h);
                        a("#" + h).jqFilter({
                            columns: v,
                            filter: b.loadDefaults ? o : null,
                            showQuery: b.showQuery,
                            errorcheck: b.errorcheck,
                            sopt: b.sopt,
                            groupButton: b.multipleGroup,
                            ruleButtons: b.multipleSearch,
                            afterRedraw: b.afterRedraw,
                            ops: b.odata,
                            operands: b.operands,
                            ajaxSelectOptions: e.p.ajaxSelectOptions,
                            groupOps: b.groupOps,
                            onChange: function () {
                                this.p.showQuery && a(".query", this).html(this.toUserFriendlyString());
                                a.isFunction(b.afterChange) && b.afterChange.call(e, a("#" + h), b)
                            },
                            direction: e.p.direction,
                            id: e.p.id
                        });
                        f.append(i);
                        n && b.tmplFilters && b.tmplFilters.length && a(".ui-template", f).bind("change", function () {
                            var c = a(this).val();
                            c === "default" ? a("#" + h).jqFilter("addFilter",
                                o) : a("#" + h).jqFilter("addFilter", b.tmplFilters[parseInt(c, 10)]);
                            return false
                        });
                        !0 === b.multipleGroup && (b.multipleSearch = !0);
                        a(e).triggerHandler("jqGridFilterInitialize", [a("#" + h)]);
                        a.isFunction(b.onInitializeSearch) && b.onInitializeSearch.call(e, a("#" + h));
                        b.gbox = "#gbox_" + h;
                        b.layer ? a.jgrid.createModal(q, f, b, "#gview_" + a.jgrid.jqID(e.p.id), a("#gbox_" + a.jgrid.jqID(e.p.id))[0], "#" + a.jgrid.jqID(b.layer), {position: "relative"}) : a.jgrid.createModal(q, f, b, "#gview_" + a.jgrid.jqID(e.p.id), a("#gbox_" + a.jgrid.jqID(e.p.id))[0]);
                        (b.searchOnEnter || b.closeOnEscape) && a("#" + a.jgrid.jqID(q.themodal)).keydown(function (c) {
                            var d = a(c.target);
                            if (b.searchOnEnter && c.which === 13 && !d.hasClass("add-group") && !d.hasClass("add-rule") && !d.hasClass("delete-group") && !d.hasClass("delete-rule") && (!d.hasClass("fm-button") || !d.is("[id$=_query]"))) {
                                a("#" + h + "_search").focus().click();
                                return false
                            }
                            if (b.closeOnEscape && c.which === 27) {
                                a("#" + a.jgrid.jqID(q.modalhead)).find(".ui-jqdialog-titlebar-close").focus().click();
                                return false
                            }
                        });
                        g && a("#" + h + "_query").bind("click",
                            function () {
                                a(".queryresult", f).toggle();
                                return false
                            });
                        void 0 === b.stringResult && (b.stringResult = b.multipleSearch);
                        a("#" + h + "_search").bind("click", function () {
                            var c = a("#" + h), d = {}, k, g = c.jqFilter("filterData");
                            if (b.errorcheck) {
                                c[0].hideError();
                                b.showQuery || c.jqFilter("toSQLString");
                                if (c[0].p.error) {
                                    c[0].showError();
                                    return false
                                }
                            }
                            if (b.stringResult) {
                                try {
                                    k = xmlJsonClass.toJson(g, "", "", false)
                                } catch (f) {
                                    try {
                                        k = JSON.stringify(g)
                                    } catch (i) {
                                    }
                                }
                                if (typeof k === "string") {
                                    d[b.sFilter] = k;
                                    a.each([b.sField, b.sValue, b.sOper],
                                        function () {
                                            d[this] = ""
                                        })
                                }
                            } else if (b.multipleSearch) {
                                d[b.sFilter] = g;
                                a.each([b.sField, b.sValue, b.sOper], function () {
                                    d[this] = ""
                                })
                            } else {
                                d[b.sField] = g.rules[0].field;
                                d[b.sValue] = g.rules[0].data;
                                d[b.sOper] = g.rules[0].op;
                                d[b.sFilter] = ""
                            }
                            e.p.search = true;
                            a.extend(e.p.postData, d);
                            r = a(e).triggerHandler("jqGridFilterSearch");
                            r === void 0 && (r = true);
                            r && a.isFunction(b.onSearch) && (r = b.onSearch.call(e, e.p.filters));
                            r !== false && a(e).trigger("reloadGrid", [{page: 1}]);
                            b.closeAfterSearch && a.jgrid.hideModal("#" + a.jgrid.jqID(q.themodal),
                                {gb: "#gbox_" + a.jgrid.jqID(e.p.id), jqm: b.jqModal, onClose: b.onClose});
                            return false
                        });
                        a("#" + h + "_reset").bind("click", function () {
                            var c = {}, d = a("#" + h);
                            e.p.search = false;
                            b.multipleSearch === false ? c[b.sField] = c[b.sValue] = c[b.sOper] = "" : c[b.sFilter] = "";
                            d[0].resetFilter();
                            n && a(".ui-template", f).val("default");
                            a.extend(e.p.postData, c);
                            r = a(e).triggerHandler("jqGridFilterReset");
                            r === void 0 && (r = true);
                            r && a.isFunction(b.onReset) && (r = b.onReset.call(e));
                            r !== false && a(e).trigger("reloadGrid", [{page: 1}]);
                            b.closeAfterReset &&
                            a.jgrid.hideModal("#" + a.jgrid.jqID(q.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(e.p.id),
                                jqm: b.jqModal,
                                onClose: b.onClose
                            });
                            return false
                        });
                        c(a("#" + h));
                        a(".fm-button:not(.ui-state-disabled)", f).hover(function () {
                            a(this).addClass("ui-state-hover")
                        }, function () {
                            a(this).removeClass("ui-state-hover")
                        })
                    }
                }
            })
        }, editGridRow: function (s, c) {
            c = a.extend(!0, {
                top: 0,
                left: 0,
                width: 300,
                datawidth: "auto",
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                url: null,
                mtype: "POST",
                clearAfterAdd: !0,
                closeAfterEdit: !1,
                reloadAfterSubmit: !0,
                onInitializeForm: null,
                beforeInitData: null,
                beforeShowForm: null,
                afterShowForm: null,
                beforeSubmit: null,
                afterSubmit: null,
                onclickSubmit: null,
                afterComplete: null,
                onclickPgButtons: null,
                afterclickPgButtons: null,
                editData: {},
                recreateForm: !1,
                jqModal: !0,
                closeOnEscape: !1,
                addedrow: "first",
                topinfo: "",
                bottominfo: "",
                saveicon: [],
                closeicon: [],
                savekey: [!1, 13],
                navkeys: [!1, 38, 40],
                checkOnSubmit: !1,
                checkOnUpdate: !1,
                _savedData: {},
                processing: !1,
                onClose: null,
                ajaxEditOptions: {},
                serializeEditData: null,
                viewPagerButtons: !0,
                overlayClass: "ui-widget-overlay"
            }, a.jgrid.edit, c || {});
            b[a(this)[0].p.id] = c;
            return this.each(function () {
                function e() {
                    a(l + " > tbody > tr > td > .FormElement").each(function () {
                        var c = a(".customelement", this);
                        if (c.length) {
                            var b = a(c[0]).attr("name");
                            a.each(d.p.colModel, function () {
                                if (this.name === b && this.editoptions && a.isFunction(this.editoptions.custom_value)) {
                                    try {
                                        if (j[b] = this.editoptions.custom_value.call(d, a("#" + a.jgrid.jqID(b), l), "get"), void 0 === j[b])throw"e1";
                                    } catch (c) {
                                        "e1" === c ? a.jgrid.info_dialog(a.jgrid.errors.errcap,
                                            "function 'custom_value' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, c.message, a.jgrid.edit.bClose)
                                    }
                                    return !0
                                }
                            })
                        } else {
                            switch (a(this).get(0).type) {
                                case "checkbox":
                                    a(this).is(":checked") ? j[this.name] = a(this).val() : (c = a(this).attr("offval"), j[this.name] = c);
                                    break;
                                case "select-one":
                                    j[this.name] = a("option:selected", this).val();
                                    break;
                                case "select-multiple":
                                    j[this.name] = a(this).val();
                                    j[this.name] = j[this.name] ? j[this.name].join(",") : "";
                                    a("option:selected", this).each(function (c,
                                                                              b) {
                                        a(b).text()
                                    });
                                    break;
                                case "password":
                                case "text":
                                case "textarea":
                                case "button":
                                    j[this.name] = a(this).val()
                            }
                            d.p.autoencode && (j[this.name] = a.jgrid.htmlEncode(j[this.name]))
                        }
                    });
                    return !0
                }

                function h(c, e, k, f) {
                    var i, j, l, n = 0, h, m, o, t = [], z = !1, s = "", p;
                    for (p = 1; p <= f; p++)s += "<td class='CaptionTD'>&#160;</td><td class='DataTD'>&#160;</td>";
                    "_empty" !== c && (z = a(e).jqGrid("getInd", c));
                    a(e.p.colModel).each(function (p) {
                        i = this.name;
                        m = (j = this.editrules && !0 === this.editrules.edithidden ? !1 : !0 === this.hidden ? !0 : !1) ? "style='display:none'" :
                            "";
                        if ("cb" !== i && "subgrid" !== i && !0 === this.editable && "rn" !== i) {
                            if (!1 === z)h = ""; else if (i === e.p.ExpandColumn && !0 === e.p.treeGrid)h = a("td[role='gridcell']:eq(" + p + ")", e.rows[z]).text(); else {
                                try {
                                    h = a.unformat.call(e, a("td[role='gridcell']:eq(" + p + ")", e.rows[z]), {
                                        rowId: c,
                                        colModel: this
                                    }, p)
                                } catch (u) {
                                    h = this.edittype && "textarea" === this.edittype ? a("td[role='gridcell']:eq(" + p + ")", e.rows[z]).text() : a("td[role='gridcell']:eq(" + p + ")", e.rows[z]).html()
                                }
                                if (!h || "&nbsp;" === h || "&#160;" === h || 1 === h.length && 160 === h.charCodeAt(0))h =
                                    ""
                            }
                            var r = a.extend({}, this.editoptions || {}, {
                                id: i,
                                name: i
                            }), q = a.extend({}, {
                                elmprefix: "",
                                elmsuffix: "",
                                rowabove: !1,
                                rowcontent: ""
                            }, this.formoptions || {}), x = parseInt(q.rowpos, 10) || n + 1, w = parseInt(2 * (parseInt(q.colpos, 10) || 1), 10);
                            "_empty" === c && r.defaultValue && (h = a.isFunction(r.defaultValue) ? r.defaultValue.call(d) : r.defaultValue);
                            this.edittype || (this.edittype = "text");
                            d.p.autoencode && (h = a.jgrid.htmlDecode(h));
                            o = a.jgrid.createEl.call(d, this.edittype, r, h, !1, a.extend({}, a.jgrid.ajaxOptions, e.p.ajaxSelectOptions ||
                                {}));
                            if (b[d.p.id].checkOnSubmit || b[d.p.id].checkOnUpdate)b[d.p.id]._savedData[i] = h;
                            a(o).addClass("FormElement");
                            -1 < a.inArray(this.edittype, ["text", "textarea", "password", "select"]) && a(o).addClass("ui-widget-content ui-corner-all");
                            l = a(k).find("tr[rowpos=" + x + "]");
                            if (q.rowabove) {
                                var y = a("<tr><td class='contentinfo' colspan='" + 2 * f + "'>" + q.rowcontent + "</td></tr>");
                                a(k).append(y);
                                y[0].rp = x
                            }
                            0 === l.length && (l = a("<tr " + m + " rowpos='" + x + "'></tr>").addClass("FormData").attr("id", "tr_" + i), a(l).append(s), a(k).append(l),
                                l[0].rp = x);
                            a("td:eq(" + (w - 2) + ")", l[0]).html(void 0 === q.label ? e.p.colNames[p] : q.label);
                            a("td:eq(" + (w - 1) + ")", l[0]).append(q.elmprefix).append(o).append(q.elmsuffix);
                            "custom" === this.edittype && a.isFunction(r.custom_value) && r.custom_value.call(d, a("#" + i, "#" + g), "set", h);
                            a.jgrid.bindEv.call(d, o, r);
                            t[n] = p;
                            n++
                        }
                    });
                    if (0 < n && (p = a("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * f - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='" + e.p.id + "_id' value='" +
                            c + "'/></td></tr>"), p[0].rp = n + 999, a(k).append(p), b[d.p.id].checkOnSubmit || b[d.p.id].checkOnUpdate))b[d.p.id]._savedData[e.p.id + "_id"] = c;
                    return t
                }

                function u(c, e, g) {
                    var k, i = 0, f, j, h, n, o;
                    if (b[d.p.id].checkOnSubmit || b[d.p.id].checkOnUpdate)b[d.p.id]._savedData = {}, b[d.p.id]._savedData[e.p.id + "_id"] = c;
                    var m = e.p.colModel;
                    if ("_empty" === c)a(m).each(function () {
                        k = this.name;
                        h = a.extend({}, this.editoptions || {});
                        if ((j = a("#" + a.jgrid.jqID(k), "#" + g)) && j.length && null !== j[0])if (n = "", "custom" === this.edittype && a.isFunction(h.custom_value) ?
                                h.custom_value.call(d, a("#" + k, "#" + g), "set", n) : h.defaultValue ? (n = a.isFunction(h.defaultValue) ? h.defaultValue.call(d) : h.defaultValue, "checkbox" === j[0].type ? (o = n.toLowerCase(), 0 > o.search(/(false|f|0|no|n|off|undefined)/i) && "" !== o ? (j[0].checked = !0, j[0].defaultChecked = !0, j[0].value = n) : (j[0].checked = !1, j[0].defaultChecked = !1)) : j.val(n)) : "checkbox" === j[0].type ? (j[0].checked = !1, j[0].defaultChecked = !1, n = a(j).attr("offval")) : j[0].type && "select" === j[0].type.substr(0, 6) ? j[0].selectedIndex = 0 : j.val(n), !0 === b[d.p.id].checkOnSubmit ||
                            b[d.p.id].checkOnUpdate)b[d.p.id]._savedData[k] = n
                    }), a("#id_g", "#" + g).val(c); else {
                        var p = a(e).jqGrid("getInd", c, !0);
                        p && (a('td[role="gridcell"]', p).each(function (j) {
                            k = m[j].name;
                            if ("cb" !== k && "subgrid" !== k && "rn" !== k && !0 === m[j].editable) {
                                if (k === e.p.ExpandColumn && !0 === e.p.treeGrid)f = a(this).text(); else try {
                                    f = a.unformat.call(e, a(this), {rowId: c, colModel: m[j]}, j)
                                } catch (h) {
                                    f = "textarea" === m[j].edittype ? a(this).text() : a(this).html()
                                }
                                d.p.autoencode && (f = a.jgrid.htmlDecode(f));
                                if (!0 === b[d.p.id].checkOnSubmit || b[d.p.id].checkOnUpdate)b[d.p.id]._savedData[k] =
                                    f;
                                k = a.jgrid.jqID(k);
                                switch (m[j].edittype) {
                                    case "password":
                                    case "text":
                                    case "button":
                                    case "image":
                                    case "textarea":
                                        if ("&nbsp;" === f || "&#160;" === f || 1 === f.length && 160 === f.charCodeAt(0))f = "";
                                        a("#" + k, "#" + g).val(f);
                                        break;
                                    case "select":
                                        var n = f.split(","), n = a.map(n, function (c) {
                                            return a.trim(c)
                                        });
                                        a("#" + k + " option", "#" + g).each(function () {
                                            this.selected = !m[j].editoptions.multiple && (a.trim(f) === a.trim(a(this).text()) || n[0] === a.trim(a(this).text()) || n[0] === a.trim(a(this).val())) ? !0 : m[j].editoptions.multiple ? -1 < a.inArray(a.trim(a(this).text()),
                                                n) || -1 < a.inArray(a.trim(a(this).val()), n) ? !0 : !1 : !1
                                        });
                                        break;
                                    case "checkbox":
                                        f = "" + f;
                                        if (m[j].editoptions && m[j].editoptions.value)if (m[j].editoptions.value.split(":")[0] === f)a("#" + k, "#" + g)[d.p.useProp ? "prop" : "attr"]({
                                            checked: !0,
                                            defaultChecked: !0
                                        }); else a("#" + k, "#" + g)[d.p.useProp ? "prop" : "attr"]({
                                            checked: !1,
                                            defaultChecked: !1
                                        }); else f = f.toLowerCase(), 0 > f.search(/(false|f|0|no|n|off|undefined)/i) && "" !== f ? (a("#" + k, "#" + g)[d.p.useProp ? "prop" : "attr"]("checked", !0), a("#" + k, "#" + g)[d.p.useProp ? "prop" : "attr"]("defaultChecked",
                                            !0)) : (a("#" + k, "#" + g)[d.p.useProp ? "prop" : "attr"]("checked", !1), a("#" + k, "#" + g)[d.p.useProp ? "prop" : "attr"]("defaultChecked", !1));
                                        break;
                                    case "custom":
                                        try {
                                            if (m[j].editoptions && a.isFunction(m[j].editoptions.custom_value))m[j].editoptions.custom_value.call(d, a("#" + k, "#" + g), "set", f); else throw"e1";
                                        } catch (l) {
                                            "e1" === l ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, l.message, a.jgrid.edit.bClose)
                                        }
                                }
                                i++
                            }
                        }),
                        0 < i && a("#id_g", l).val(c))
                    }
                }

                function r() {
                    a.each(d.p.colModel, function (a, c) {
                        c.editoptions && !0 === c.editoptions.NullIfEmpty && j.hasOwnProperty(c.name) && "" === j[c.name] && (j[c.name] = "null")
                    })
                }

                function q() {
                    var e, k = [!0, "", ""], f = {}, i = d.p.prmNames, h, m, o, z, s, q = a(d).triggerHandler("jqGridAddEditBeforeCheckValues", [a("#" + g), w]);
                    q && "object" === typeof q && (j = q);
                    a.isFunction(b[d.p.id].beforeCheckValues) && (q = b[d.p.id].beforeCheckValues.call(d, j, a("#" + g), w)) && "object" === typeof q && (j = q);
                    for (o in j)if (j.hasOwnProperty(o) &&
                        (k = a.jgrid.checkValues.call(d, j[o], o), !1 === k[0]))break;
                    r();
                    k[0] && (f = a(d).triggerHandler("jqGridAddEditClickSubmit", [b[d.p.id], j, w]), void 0 === f && a.isFunction(b[d.p.id].onclickSubmit) && (f = b[d.p.id].onclickSubmit.call(d, b[d.p.id], j, w) || {}), k = a(d).triggerHandler("jqGridAddEditBeforeSubmit", [j, a("#" + g), w]), void 0 === k && (k = [!0, "", ""]), k[0] && a.isFunction(b[d.p.id].beforeSubmit) && (k = b[d.p.id].beforeSubmit.call(d, j, a("#" + g), w)));
                    if (k[0] && !b[d.p.id].processing) {
                        b[d.p.id].processing = !0;
                        a("#sData", l + "_2").addClass("ui-state-active");
                        m = i.oper;
                        h = i.id;
                        j[m] = "_empty" === a.trim(j[d.p.id + "_id"]) ? i.addoper : i.editoper;
                        j[m] !== i.addoper ? j[h] = j[d.p.id + "_id"] : void 0 === j[h] && (j[h] = j[d.p.id + "_id"]);
                        delete j[d.p.id + "_id"];
                        j = a.extend(j, b[d.p.id].editData, f);
                        if (!0 === d.p.treeGrid)for (s in j[m] === i.addoper && (z = a(d).jqGrid("getGridParam", "selrow"), j["adjacency" === d.p.treeGridModel ? d.p.treeReader.parent_id_field : "parent_id"] = z), d.p.treeReader)d.p.treeReader.hasOwnProperty(s) && (f = d.p.treeReader[s], j.hasOwnProperty(f) && !(j[m] === i.addoper && "parent_id_field" ===
                        s) && delete j[f]);
                        j[h] = a.jgrid.stripPref(d.p.idPrefix, j[h]);
                        s = a.extend({
                            url: b[d.p.id].url || a(d).jqGrid("getGridParam", "editurl"),
                            type: b[d.p.id].mtype,
                            data: a.isFunction(b[d.p.id].serializeEditData) ? b[d.p.id].serializeEditData.call(d, j) : j,
                            complete: function (f, o) {
                                var s;
                                j[h] = d.p.idPrefix + j[h];
                                if (f.status >= 300 && f.status !== 304) {
                                    k[0] = false;
                                    k[1] = a(d).triggerHandler("jqGridAddEditErrorTextFormat", [f, w]);
                                    k[1] = a.isFunction(b[d.p.id].errorTextFormat) ? b[d.p.id].errorTextFormat.call(d, f, w) : o + " Status: '" + f.statusText +
                                    "'. Error code: " + f.status
                                } else {
                                    k = a(d).triggerHandler("jqGridAddEditAfterSubmit", [f, j, w]);
                                    k === void 0 && (k = [true, "", ""]);
                                    k[0] && a.isFunction(b[d.p.id].afterSubmit) && (k = b[d.p.id].afterSubmit.call(d, f, j, w))
                                }
                                if (k[0] === false) {
                                    a("#FormError>td", l).html(k[1]);
                                    a("#FormError", l).show()
                                } else {
                                    d.p.autoencode && a.each(j, function (c, b) {
                                        j[c] = a.jgrid.htmlDecode(b)
                                    });
                                    if (j[m] === i.addoper) {
                                        k[2] || (k[2] = a.jgrid.randId());
                                        j[h] = k[2];
                                        b[d.p.id].reloadAfterSubmit ? a(d).trigger("reloadGrid") : d.p.treeGrid === true ? a(d).jqGrid("addChildNode",
                                            k[2], z, j) : a(d).jqGrid("addRowData", k[2], j, c.addedrow);
                                        if (b[d.p.id].closeAfterAdd) {
                                            d.p.treeGrid !== true && a(d).jqGrid("setSelection", k[2]);
                                            a.jgrid.hideModal("#" + a.jgrid.jqID(n.themodal), {
                                                gb: "#gbox_" + a.jgrid.jqID(p),
                                                jqm: c.jqModal,
                                                onClose: b[d.p.id].onClose
                                            })
                                        } else b[d.p.id].clearAfterAdd && u("_empty", d, g)
                                    } else {
                                        if (b[d.p.id].reloadAfterSubmit) {
                                            a(d).trigger("reloadGrid");
                                            b[d.p.id].closeAfterEdit || setTimeout(function () {
                                                a(d).jqGrid("setSelection", j[h])
                                            }, 1E3)
                                        } else d.p.treeGrid === true ? a(d).jqGrid("setTreeRow",
                                            j[h], j) : a(d).jqGrid("setRowData", j[h], j);
                                        b[d.p.id].closeAfterEdit && a.jgrid.hideModal("#" + a.jgrid.jqID(n.themodal), {
                                            gb: "#gbox_" + a.jgrid.jqID(p),
                                            jqm: c.jqModal,
                                            onClose: b[d.p.id].onClose
                                        })
                                    }
                                    if (a.isFunction(b[d.p.id].afterComplete)) {
                                        e = f;
                                        setTimeout(function () {
                                            a(d).triggerHandler("jqGridAddEditAfterComplete", [e, j, a("#" + g), w]);
                                            b[d.p.id].afterComplete.call(d, e, j, a("#" + g), w);
                                            e = null
                                        }, 500)
                                    }
                                    if (b[d.p.id].checkOnSubmit || b[d.p.id].checkOnUpdate) {
                                        a("#" + g).data("disabled", false);
                                        if (b[d.p.id]._savedData[d.p.id + "_id"] !==
                                            "_empty")for (s in b[d.p.id]._savedData)b[d.p.id]._savedData.hasOwnProperty(s) && j[s] && (b[d.p.id]._savedData[s] = j[s])
                                    }
                                }
                                b[d.p.id].processing = false;
                                a("#sData", l + "_2").removeClass("ui-state-active");
                                try {
                                    a(":input:visible", "#" + g)[0].focus()
                                } catch (q) {
                                }
                            }
                        }, a.jgrid.ajaxOptions, b[d.p.id].ajaxEditOptions);
                        !s.url && !b[d.p.id].useDataProxy && (a.isFunction(d.p.dataProxy) ? b[d.p.id].useDataProxy = !0 : (k[0] = !1, k[1] += " " + a.jgrid.errors.nourl));
                        k[0] && (b[d.p.id].useDataProxy ? (f = d.p.dataProxy.call(d, s, "set_" + d.p.id), void 0 ===
                        f && (f = [!0, ""]), !1 === f[0] ? (k[0] = !1, k[1] = f[1] || "Error deleting the selected row!") : (s.data.oper === i.addoper && b[d.p.id].closeAfterAdd && a.jgrid.hideModal("#" + a.jgrid.jqID(n.themodal), {
                            gb: "#gbox_" + a.jgrid.jqID(p),
                            jqm: c.jqModal,
                            onClose: b[d.p.id].onClose
                        }), s.data.oper === i.editoper && b[d.p.id].closeAfterEdit && a.jgrid.hideModal("#" + a.jgrid.jqID(n.themodal), {
                            gb: "#gbox_" + a.jgrid.jqID(p),
                            jqm: c.jqModal,
                            onClose: b[d.p.id].onClose
                        }))) : a.ajax(s))
                    }
                    !1 === k[0] && (a("#FormError>td", l).html(k[1]), a("#FormError", l).show())
                }

                function o(a, c) {
                    var b = !1, d;
                    for (d in a)if (a.hasOwnProperty(d) && a[d] != c[d]) {
                        b = !0;
                        break
                    }
                    return b
                }

                function f() {
                    var c = !0;
                    a("#FormError", l).hide();
                    if (b[d.p.id].checkOnUpdate && (j = {}, e(), K = o(j, b[d.p.id]._savedData)))a("#" + g).data("disabled", !0), a(".confirm", "#" + n.themodal).show(), c = !1;
                    return c
                }

                function i() {
                    var c;
                    if ("_empty" !== s && void 0 !== d.p.savedRow && 0 < d.p.savedRow.length && a.isFunction(a.fn.jqGrid.restoreRow))for (c = 0; c < d.p.savedRow.length; c++)if (d.p.savedRow[c].id == s) {
                        a(d).jqGrid("restoreRow", s);
                        break
                    }
                }

                function t(c, b) {
                    var d = b[1].length - 1;
                    0 === c ? a("#pData", l + "_2").addClass("ui-state-disabled") : void 0 !== b[1][c - 1] && a("#" + a.jgrid.jqID(b[1][c - 1])).hasClass("ui-state-disabled") ? a("#pData", l + "_2").addClass("ui-state-disabled") : a("#pData", l + "_2").removeClass("ui-state-disabled");
                    c === d ? a("#nData", l + "_2").addClass("ui-state-disabled") : void 0 !== b[1][c + 1] && a("#" + a.jgrid.jqID(b[1][c + 1])).hasClass("ui-state-disabled") ? a("#nData", l + "_2").addClass("ui-state-disabled") : a("#nData", l + "_2").removeClass("ui-state-disabled")
                }

                function v() {
                    var c = a(d).jqGrid("getDataIDs"), b = a("#id_g", l).val();
                    return [a.inArray(b, c), c]
                }

                var d = this;
                if (d.grid && s) {
                    var p = d.p.id, g = "FrmGrid_" + p, m = "TblGrid_" + p, l = "#" + a.jgrid.jqID(m), n = {
                        themodal: "editmod" + p,
                        modalhead: "edithd" + p,
                        modalcontent: "editcnt" + p,
                        scrollelm: g
                    }, x = a.isFunction(b[d.p.id].beforeShowForm) ? b[d.p.id].beforeShowForm : !1, A = a.isFunction(b[d.p.id].afterShowForm) ? b[d.p.id].afterShowForm : !1, y = a.isFunction(b[d.p.id].beforeInitData) ? b[d.p.id].beforeInitData : !1, B = a.isFunction(b[d.p.id].onInitializeForm) ?
                        b[d.p.id].onInitializeForm : !1, k = !0, z = 1, F = 0, j, K, w, g = a.jgrid.jqID(g);
                    "new" === s ? (s = "_empty", w = "add", c.caption = b[d.p.id].addCaption) : (c.caption = b[d.p.id].editCaption, w = "edit");
                    !0 === c.recreateForm && void 0 !== a("#" + a.jgrid.jqID(n.themodal))[0] && a("#" + a.jgrid.jqID(n.themodal)).remove();
                    var G = !0;
                    c.checkOnUpdate && c.jqModal && !c.modal && (G = !1);
                    if (void 0 !== a("#" + a.jgrid.jqID(n.themodal))[0]) {
                        k = a(d).triggerHandler("jqGridAddEditBeforeInitData", [a("#" + a.jgrid.jqID(g)), w]);
                        void 0 === k && (k = !0);
                        k && y && (k = y.call(d, a("#" +
                            g), w));
                        if (!1 === k)return;
                        i();
                        a(".ui-jqdialog-title", "#" + a.jgrid.jqID(n.modalhead)).html(c.caption);
                        a("#FormError", l).hide();
                        b[d.p.id].topinfo ? (a(".topinfo", l).html(b[d.p.id].topinfo), a(".tinfo", l).show()) : a(".tinfo", l).hide();
                        b[d.p.id].bottominfo ? (a(".bottominfo", l + "_2").html(b[d.p.id].bottominfo), a(".binfo", l + "_2").show()) : a(".binfo", l + "_2").hide();
                        u(s, d, g);
                        "_empty" === s || !b[d.p.id].viewPagerButtons ? a("#pData, #nData", l + "_2").hide() : a("#pData, #nData", l + "_2").show();
                        !0 === b[d.p.id].processing && (b[d.p.id].processing = !1, a("#sData", l + "_2").removeClass("ui-state-active"));
                        !0 === a("#" + g).data("disabled") && (a(".confirm", "#" + a.jgrid.jqID(n.themodal)).hide(), a("#" + g).data("disabled", !1));
                        a(d).triggerHandler("jqGridAddEditBeforeShowForm", [a("#" + g), w]);
                        x && x.call(d, a("#" + g), w);
                        a("#" + a.jgrid.jqID(n.themodal)).data("onClose", b[d.p.id].onClose);
                        a.jgrid.viewModal("#" + a.jgrid.jqID(n.themodal), {
                            gbox: "#gbox_" + a.jgrid.jqID(p),
                            jqm: c.jqModal,
                            jqM: !1,
                            overlay: c.overlay,
                            modal: c.modal,
                            overlayClass: c.overlayClass
                        });
                        G || a("." + a.jgrid.jqID(c.overlayClass)).click(function () {
                            if (!f())return false;
                            a.jgrid.hideModal("#" + a.jgrid.jqID(n.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(p),
                                jqm: c.jqModal,
                                onClose: b[d.p.id].onClose
                            });
                            return false
                        });
                        a(d).triggerHandler("jqGridAddEditAfterShowForm", [a("#" + g), w]);
                        A && A.call(d, a("#" + g), w)
                    } else {
                        var E = isNaN(c.dataheight) ? c.dataheight : c.dataheight + "px", k = isNaN(c.datawidth) ? c.datawidth : c.datawidth + "px", E = a("<form name='FormPost' id='" + g + "' class='FormGrid' onSubmit='return false;' style='width:" + k + ";overflow:auto;position:relative;height:" + E + ";'></form>").data("disabled",
                            !1), C = a("<table id='" + m + "' class='EditTable' cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"), k = a(d).triggerHandler("jqGridAddEditBeforeInitData", [a("#" + g), w]);
                        void 0 === k && (k = !0);
                        k && y && (k = y.call(d, a("#" + g), w));
                        if (!1 === k)return;
                        i();
                        a(d.p.colModel).each(function () {
                            var a = this.formoptions;
                            z = Math.max(z, a ? a.colpos || 0 : 0);
                            F = Math.max(F, a ? a.rowpos || 0 : 0)
                        });
                        a(E).append(C);
                        y = a("<tr id='FormError' style='display:none'><td class='ui-state-error' colspan='" + 2 * z + "'></td></tr>");
                        y[0].rp = 0;
                        a(C).append(y);
                        y = a("<tr style='display:none' class='tinfo'><td class='topinfo' colspan='" + 2 * z + "'>" + b[d.p.id].topinfo + "</td></tr>");
                        y[0].rp = 0;
                        a(C).append(y);
                        var k = (y = "rtl" === d.p.direction ? !0 : !1) ? "nData" : "pData", D = y ? "pData" : "nData";
                        h(s, d, C, z);
                        var k = "<a id='" + k + "' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>", D = "<a id='" + D + "' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>", H = "<a id='sData' class='fm-button ui-state-default ui-corner-all'>" +
                            c.bSubmit + "</a>", I = "<a id='cData' class='fm-button ui-state-default ui-corner-all'>" + c.bCancel + "</a>", m = "<table border='0' cellspacing='0' cellpadding='0' class='EditTable' id='" + m + "_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton'>" + (y ? D + k : k + D) + "</td><td class='EditButton'>" + H + I + "</td></tr>" + ("<tr style='display:none' class='binfo'><td class='bottominfo' colspan='2'>" + b[d.p.id].bottominfo + "</td></tr>"), m = m + "</tbody></table>";
                        if (0 < F) {
                            var J = [];
                            a.each(a(C)[0].rows, function (a, c) {
                                J[a] = c
                            });
                            J.sort(function (a, c) {
                                return a.rp > c.rp ? 1 : a.rp < c.rp ? -1 : 0
                            });
                            a.each(J, function (c, b) {
                                a("tbody", C).append(b)
                            })
                        }
                        c.gbox = "#gbox_" + a.jgrid.jqID(p);
                        var L = !1;
                        !0 === c.closeOnEscape && (c.closeOnEscape = !1, L = !0);
                        m = a("<div></div>").append(E).append(m);
                        a.jgrid.createModal(n, m, c, "#gview_" + a.jgrid.jqID(d.p.id), a("#gbox_" + a.jgrid.jqID(d.p.id))[0]);
                        y && (a("#pData, #nData", l + "_2").css("float", "right"), a(".EditButton", l + "_2").css("text-align", "left"));
                        b[d.p.id].topinfo &&
                        a(".tinfo", l).show();
                        b[d.p.id].bottominfo && a(".binfo", l + "_2").show();
                        m = m = null;
                        a("#" + a.jgrid.jqID(n.themodal)).keydown(function (e) {
                            var k = e.target;
                            if (a("#" + g).data("disabled") === true)return false;
                            if (b[d.p.id].savekey[0] === true && e.which === b[d.p.id].savekey[1] && k.tagName !== "TEXTAREA") {
                                a("#sData", l + "_2").trigger("click");
                                return false
                            }
                            if (e.which === 27) {
                                if (!f())return false;
                                L && a.jgrid.hideModal("#" + a.jgrid.jqID(n.themodal), {
                                    gb: c.gbox,
                                    jqm: c.jqModal,
                                    onClose: b[d.p.id].onClose
                                });
                                return false
                            }
                            if (b[d.p.id].navkeys[0] ===
                                true) {
                                if (a("#id_g", l).val() === "_empty")return true;
                                if (e.which === b[d.p.id].navkeys[1]) {
                                    a("#pData", l + "_2").trigger("click");
                                    return false
                                }
                                if (e.which === b[d.p.id].navkeys[2]) {
                                    a("#nData", l + "_2").trigger("click");
                                    return false
                                }
                            }
                        });
                        c.checkOnUpdate && (a("a.ui-jqdialog-titlebar-close span", "#" + a.jgrid.jqID(n.themodal)).removeClass("jqmClose"), a("a.ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(n.themodal)).unbind("click").click(function () {
                            if (!f())return false;
                            a.jgrid.hideModal("#" + a.jgrid.jqID(n.themodal), {
                                gb: "#gbox_" +
                                a.jgrid.jqID(p), jqm: c.jqModal, onClose: b[d.p.id].onClose
                            });
                            return false
                        }));
                        c.saveicon = a.extend([!0, "left", "ui-icon-disk"], c.saveicon);
                        c.closeicon = a.extend([!0, "left", "ui-icon-close"], c.closeicon);
                        !0 === c.saveicon[0] && a("#sData", l + "_2").addClass("right" === c.saveicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + c.saveicon[2] + "'></span>");
                        !0 === c.closeicon[0] && a("#cData", l + "_2").addClass("right" === c.closeicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " +
                            c.closeicon[2] + "'></span>");
                        if (b[d.p.id].checkOnSubmit || b[d.p.id].checkOnUpdate)H = "<a id='sNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + c.bYes + "</a>", D = "<a id='nNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + c.bNo + "</a>", I = "<a id='cNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + c.bExit + "</a>", m = c.zIndex || 999, m++, a("<div class='" + c.overlayClass + " jqgrid-overlay confirm' style='z-index:" + m + ";display:none;'>&#160;</div><div class='confirm ui-widget-content ui-jqconfirm' style='z-index:" +
                            (m + 1) + "'>" + c.saveData + "<br/><br/>" + H + D + I + "</div>").insertAfter("#" + g), a("#sNew", "#" + a.jgrid.jqID(n.themodal)).click(function () {
                            q();
                            a("#" + g).data("disabled", false);
                            a(".confirm", "#" + a.jgrid.jqID(n.themodal)).hide();
                            return false
                        }), a("#nNew", "#" + a.jgrid.jqID(n.themodal)).click(function () {
                            a(".confirm", "#" + a.jgrid.jqID(n.themodal)).hide();
                            a("#" + g).data("disabled", false);
                            setTimeout(function () {
                                a(":input:visible", "#" + g)[0].focus()
                            }, 0);
                            return false
                        }), a("#cNew", "#" + a.jgrid.jqID(n.themodal)).click(function () {
                            a(".confirm",
                                "#" + a.jgrid.jqID(n.themodal)).hide();
                            a("#" + g).data("disabled", false);
                            a.jgrid.hideModal("#" + a.jgrid.jqID(n.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(p),
                                jqm: c.jqModal,
                                onClose: b[d.p.id].onClose
                            });
                            return false
                        });
                        a(d).triggerHandler("jqGridAddEditInitializeForm", [a("#" + g), w]);
                        B && B.call(d, a("#" + g), w);
                        "_empty" === s || !b[d.p.id].viewPagerButtons ? a("#pData,#nData", l + "_2").hide() : a("#pData,#nData", l + "_2").show();
                        a(d).triggerHandler("jqGridAddEditBeforeShowForm", [a("#" + g), w]);
                        x && x.call(d, a("#" + g), w);
                        a("#" + a.jgrid.jqID(n.themodal)).data("onClose",
                            b[d.p.id].onClose);
                        a.jgrid.viewModal("#" + a.jgrid.jqID(n.themodal), {
                            gbox: "#gbox_" + a.jgrid.jqID(p),
                            jqm: c.jqModal,
                            overlay: c.overlay,
                            modal: c.modal,
                            overlayClass: c.overlayClass
                        });
                        G || a("." + a.jgrid.jqID(c.overlayClass)).click(function () {
                            if (!f())return false;
                            a.jgrid.hideModal("#" + a.jgrid.jqID(n.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(p),
                                jqm: c.jqModal,
                                onClose: b[d.p.id].onClose
                            });
                            return false
                        });
                        a(d).triggerHandler("jqGridAddEditAfterShowForm", [a("#" + g), w]);
                        A && A.call(d, a("#" + g), w);
                        a(".fm-button", "#" + a.jgrid.jqID(n.themodal)).hover(function () {
                                a(this).addClass("ui-state-hover")
                            },
                            function () {
                                a(this).removeClass("ui-state-hover")
                            });
                        a("#sData", l + "_2").click(function () {
                            j = {};
                            a("#FormError", l).hide();
                            e();
                            if (j[d.p.id + "_id"] === "_empty")q(); else if (c.checkOnSubmit === true)if (K = o(j, b[d.p.id]._savedData)) {
                                a("#" + g).data("disabled", true);
                                a(".confirm", "#" + a.jgrid.jqID(n.themodal)).show()
                            } else q(); else q();
                            return false
                        });
                        a("#cData", l + "_2").click(function () {
                            if (!f())return false;
                            a.jgrid.hideModal("#" + a.jgrid.jqID(n.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(p),
                                jqm: c.jqModal,
                                onClose: b[d.p.id].onClose
                            });
                            return false
                        });
                        a("#nData", l + "_2").click(function () {
                            if (!f())return false;
                            a("#FormError", l).hide();
                            var b = v();
                            b[0] = parseInt(b[0], 10);
                            if (b[0] !== -1 && b[1][b[0] + 1]) {
                                a(d).triggerHandler("jqGridAddEditClickPgButtons", ["next", a("#" + g), b[1][b[0]]]);
                                var e;
                                if (a.isFunction(c.onclickPgButtons)) {
                                    e = c.onclickPgButtons.call(d, "next", a("#" + g), b[1][b[0]]);
                                    if (e !== void 0 && e === false)return false
                                }
                                if (a("#" + a.jgrid.jqID(b[1][b[0] + 1])).hasClass("ui-state-disabled"))return false;
                                u(b[1][b[0] + 1], d, g);
                                a(d).jqGrid("setSelection",
                                    b[1][b[0] + 1]);
                                a(d).triggerHandler("jqGridAddEditAfterClickPgButtons", ["next", a("#" + g), b[1][b[0]]]);
                                a.isFunction(c.afterclickPgButtons) && c.afterclickPgButtons.call(d, "next", a("#" + g), b[1][b[0] + 1]);
                                t(b[0] + 1, b)
                            }
                            return false
                        });
                        a("#pData", l + "_2").click(function () {
                            if (!f())return false;
                            a("#FormError", l).hide();
                            var b = v();
                            if (b[0] !== -1 && b[1][b[0] - 1]) {
                                a(d).triggerHandler("jqGridAddEditClickPgButtons", ["prev", a("#" + g), b[1][b[0]]]);
                                var e;
                                if (a.isFunction(c.onclickPgButtons)) {
                                    e = c.onclickPgButtons.call(d, "prev", a("#" +
                                        g), b[1][b[0]]);
                                    if (e !== void 0 && e === false)return false
                                }
                                if (a("#" + a.jgrid.jqID(b[1][b[0] - 1])).hasClass("ui-state-disabled"))return false;
                                u(b[1][b[0] - 1], d, g);
                                a(d).jqGrid("setSelection", b[1][b[0] - 1]);
                                a(d).triggerHandler("jqGridAddEditAfterClickPgButtons", ["prev", a("#" + g), b[1][b[0]]]);
                                a.isFunction(c.afterclickPgButtons) && c.afterclickPgButtons.call(d, "prev", a("#" + g), b[1][b[0] - 1]);
                                t(b[0] - 1, b)
                            }
                            return false
                        })
                    }
                    x = v();
                    t(x[0], x)
                }
            })
        }, viewGridRow: function (s, c) {
            c = a.extend(!0, {
                top: 0,
                left: 0,
                width: 0,
                datawidth: "auto",
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                jqModal: !0,
                closeOnEscape: !1,
                labelswidth: "30%",
                closeicon: [],
                navkeys: [!1, 38, 40],
                onClose: null,
                beforeShowForm: null,
                beforeInitData: null,
                viewPagerButtons: !0,
                recreateForm: !1
            }, a.jgrid.view, c || {});
            b[a(this)[0].p.id] = c;
            return this.each(function () {
                function e() {
                    (!0 === b[o.p.id].closeOnEscape || !0 === b[o.p.id].navkeys[0]) && setTimeout(function () {
                        a(".ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(p.modalhead)).focus()
                    }, 0)
                }

                function h(b, d, e, f) {
                    var g,
                        i, h, n = 0, m, l, o = [], s = !1, p, q = "<td class='CaptionTD form-view-label ui-widget-content' width='" + c.labelswidth + "'>&#160;</td><td class='DataTD form-view-data ui-helper-reset ui-widget-content'>&#160;</td>", r = "", t = ["integer", "number", "currency"], x = 0, u = 0, y, v, A;
                    for (p = 1; p <= f; p++)r += 1 === p ? q : "<td class='CaptionTD form-view-label ui-widget-content'>&#160;</td><td class='DataTD form-view-data ui-widget-content'>&#160;</td>";
                    a(d.p.colModel).each(function () {
                        i = this.editrules && !0 === this.editrules.edithidden ? !1 : !0 ===
                        this.hidden ? !0 : !1;
                        !i && "right" === this.align && (this.formatter && -1 !== a.inArray(this.formatter, t) ? x = Math.max(x, parseInt(this.width, 10)) : u = Math.max(u, parseInt(this.width, 10)))
                    });
                    y = 0 !== x ? x : 0 !== u ? u : 0;
                    s = a(d).jqGrid("getInd", b);
                    a(d.p.colModel).each(function (b) {
                        g = this.name;
                        v = !1;
                        l = (i = this.editrules && !0 === this.editrules.edithidden ? !1 : !0 === this.hidden ? !0 : !1) ? "style='display:none'" : "";
                        A = "boolean" !== typeof this.viewable ? !0 : this.viewable;
                        if ("cb" !== g && "subgrid" !== g && "rn" !== g && A) {
                            m = !1 === s ? "" : g === d.p.ExpandColumn &&
                            !0 === d.p.treeGrid ? a("td:eq(" + b + ")", d.rows[s]).text() : a("td:eq(" + b + ")", d.rows[s]).html();
                            v = "right" === this.align && 0 !== y ? !0 : !1;
                            var c = a.extend({}, {
                                rowabove: !1,
                                rowcontent: ""
                            }, this.formoptions || {}), k = parseInt(c.rowpos, 10) || n + 1, p = parseInt(2 * (parseInt(c.colpos, 10) || 1), 10);
                            if (c.rowabove) {
                                var q = a("<tr><td class='contentinfo' colspan='" + 2 * f + "'>" + c.rowcontent + "</td></tr>");
                                a(e).append(q);
                                q[0].rp = k
                            }
                            h = a(e).find("tr[rowpos=" + k + "]");
                            0 === h.length && (h = a("<tr " + l + " rowpos='" + k + "'></tr>").addClass("FormData").attr("id",
                                "trv_" + g), a(h).append(r), a(e).append(h), h[0].rp = k);
                            a("td:eq(" + (p - 2) + ")", h[0]).html("<b>" + (void 0 === c.label ? d.p.colNames[b] : c.label) + "</b>");
                            a("td:eq(" + (p - 1) + ")", h[0]).append("<span>" + m + "</span>").attr("id", "v_" + g);
                            v && a("td:eq(" + (p - 1) + ") span", h[0]).css({"text-align": "right", width: y + "px"});
                            o[n] = b;
                            n++
                        }
                    });
                    0 < n && (b = a("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * f - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='" + b + "'/></td></tr>"),
                        b[0].rp = n + 99, a(e).append(b));
                    return o
                }

                function u(b, c) {
                    var d, e, f = 0, g, i;
                    if (i = a(c).jqGrid("getInd", b, !0))a("td", i).each(function (b) {
                        d = c.p.colModel[b].name;
                        e = c.p.colModel[b].editrules && !0 === c.p.colModel[b].editrules.edithidden ? !1 : !0 === c.p.colModel[b].hidden ? !0 : !1;
                        "cb" !== d && "subgrid" !== d && "rn" !== d && (g = d === c.p.ExpandColumn && !0 === c.p.treeGrid ? a(this).text() : a(this).html(), d = a.jgrid.jqID("v_" + d), a("#" + d + " span", "#" + t).html(g), e && a("#" + d, "#" + t).parents("tr:first").hide(), f++)
                    }), 0 < f && a("#id_g", "#" + t).val(b)
                }

                function r(b, c) {
                    var d = c[1].length - 1;
                    0 === b ? a("#pData", "#" + t + "_2").addClass("ui-state-disabled") : void 0 !== c[1][b - 1] && a("#" + a.jgrid.jqID(c[1][b - 1])).hasClass("ui-state-disabled") ? a("#pData", t + "_2").addClass("ui-state-disabled") : a("#pData", "#" + t + "_2").removeClass("ui-state-disabled");
                    b === d ? a("#nData", "#" + t + "_2").addClass("ui-state-disabled") : void 0 !== c[1][b + 1] && a("#" + a.jgrid.jqID(c[1][b + 1])).hasClass("ui-state-disabled") ? a("#nData", t + "_2").addClass("ui-state-disabled") : a("#nData", "#" + t + "_2").removeClass("ui-state-disabled")
                }

                function q() {
                    var b = a(o).jqGrid("getDataIDs"), c = a("#id_g", "#" + t).val();
                    return [a.inArray(c, b), b]
                }

                var o = this;
                if (o.grid && s) {
                    var f = o.p.id, i = "ViewGrid_" + a.jgrid.jqID(f), t = "ViewTbl_" + a.jgrid.jqID(f), v = "ViewGrid_" + f, d = "ViewTbl_" + f, p = {
                        themodal: "viewmod" + f,
                        modalhead: "viewhd" + f,
                        modalcontent: "viewcnt" + f,
                        scrollelm: i
                    }, g = a.isFunction(b[o.p.id].beforeInitData) ? b[o.p.id].beforeInitData : !1, m = !0, l = 1, n = 0;
                    !0 === c.recreateForm && void 0 !== a("#" + a.jgrid.jqID(p.themodal))[0] && a("#" + a.jgrid.jqID(p.themodal)).remove();
                    if (void 0 !==
                        a("#" + a.jgrid.jqID(p.themodal))[0]) {
                        g && (m = g.call(o, a("#" + i)), void 0 === m && (m = !0));
                        if (!1 === m)return;
                        a(".ui-jqdialog-title", "#" + a.jgrid.jqID(p.modalhead)).html(c.caption);
                        a("#FormError", "#" + t).hide();
                        u(s, o);
                        a.isFunction(b[o.p.id].beforeShowForm) && b[o.p.id].beforeShowForm.call(o, a("#" + i));
                        a.jgrid.viewModal("#" + a.jgrid.jqID(p.themodal), {
                            gbox: "#gbox_" + a.jgrid.jqID(f),
                            jqm: c.jqModal,
                            jqM: !1,
                            overlay: c.overlay,
                            modal: c.modal
                        });
                        e()
                    } else {
                        var x = isNaN(c.dataheight) ? c.dataheight : c.dataheight + "px", A = isNaN(c.datawidth) ?
                            c.datawidth : c.datawidth + "px", v = a("<form name='FormPost' id='" + v + "' class='FormGrid' style='width:" + A + ";overflow:auto;position:relative;height:" + x + ";'></form>"), y = a("<table id='" + d + "' class='EditTable' cellspacing='1' cellpadding='2' border='0' style='table-layout:fixed'><tbody></tbody></table>");
                        g && (m = g.call(o, a("#" + i)), void 0 === m && (m = !0));
                        if (!1 === m)return;
                        a(o.p.colModel).each(function () {
                            var a = this.formoptions;
                            l = Math.max(l, a ? a.colpos || 0 : 0);
                            n = Math.max(n, a ? a.rowpos || 0 : 0)
                        });
                        a(v).append(y);
                        h(s, o, y, l);
                        d = "rtl" === o.p.direction ? !0 : !1;
                        g = "<a id='" + (d ? "nData" : "pData") + "' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>";
                        m = "<a id='" + (d ? "pData" : "nData") + "' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>";
                        x = "<a id='cData' class='fm-button ui-state-default ui-corner-all'>" + c.bClose + "</a>";
                        if (0 < n) {
                            var B = [];
                            a.each(a(y)[0].rows, function (a, b) {
                                B[a] = b
                            });
                            B.sort(function (a, b) {
                                return a.rp > b.rp ? 1 : a.rp <
                                b.rp ? -1 : 0
                            });
                            a.each(B, function (b, c) {
                                a("tbody", y).append(c)
                            })
                        }
                        c.gbox = "#gbox_" + a.jgrid.jqID(f);
                        v = a("<div></div>").append(v).append("<table border='0' class='EditTable' id='" + t + "_2'><tbody><tr id='Act_Buttons'><td class='navButton' width='" + c.labelswidth + "'>" + (d ? m + g : g + m) + "</td><td class='EditButton'>" + x + "</td></tr></tbody></table>");
                        a.jgrid.createModal(p, v, c, "#gview_" + a.jgrid.jqID(o.p.id), a("#gview_" + a.jgrid.jqID(o.p.id))[0]);
                        d && (a("#pData, #nData", "#" + t + "_2").css("float", "right"), a(".EditButton", "#" +
                            t + "_2").css("text-align", "left"));
                        c.viewPagerButtons || a("#pData, #nData", "#" + t + "_2").hide();
                        v = null;
                        a("#" + p.themodal).keydown(function (d) {
                            if (d.which === 27) {
                                b[o.p.id].closeOnEscape && a.jgrid.hideModal("#" + a.jgrid.jqID(p.themodal), {
                                    gb: c.gbox,
                                    jqm: c.jqModal,
                                    onClose: c.onClose
                                });
                                return false
                            }
                            if (c.navkeys[0] === true) {
                                if (d.which === c.navkeys[1]) {
                                    a("#pData", "#" + t + "_2").trigger("click");
                                    return false
                                }
                                if (d.which === c.navkeys[2]) {
                                    a("#nData", "#" + t + "_2").trigger("click");
                                    return false
                                }
                            }
                        });
                        c.closeicon = a.extend([!0, "left",
                            "ui-icon-close"], c.closeicon);
                        !0 === c.closeicon[0] && a("#cData", "#" + t + "_2").addClass("right" === c.closeicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + c.closeicon[2] + "'></span>");
                        a.isFunction(c.beforeShowForm) && c.beforeShowForm.call(o, a("#" + i));
                        a.jgrid.viewModal("#" + a.jgrid.jqID(p.themodal), {
                            gbox: "#gbox_" + a.jgrid.jqID(f),
                            jqm: c.jqModal,
                            overlay: c.overlay,
                            modal: c.modal
                        });
                        a(".fm-button:not(.ui-state-disabled)", "#" + t + "_2").hover(function () {
                                a(this).addClass("ui-state-hover")
                            },
                            function () {
                                a(this).removeClass("ui-state-hover")
                            });
                        e();
                        a("#cData", "#" + t + "_2").click(function () {
                            a.jgrid.hideModal("#" + a.jgrid.jqID(p.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(f),
                                jqm: c.jqModal,
                                onClose: c.onClose
                            });
                            return false
                        });
                        a("#nData", "#" + t + "_2").click(function () {
                            a("#FormError", "#" + t).hide();
                            var b = q();
                            b[0] = parseInt(b[0], 10);
                            if (b[0] !== -1 && b[1][b[0] + 1]) {
                                a.isFunction(c.onclickPgButtons) && c.onclickPgButtons.call(o, "next", a("#" + i), b[1][b[0]]);
                                u(b[1][b[0] + 1], o);
                                a(o).jqGrid("setSelection", b[1][b[0] + 1]);
                                a.isFunction(c.afterclickPgButtons) &&
                                c.afterclickPgButtons.call(o, "next", a("#" + i), b[1][b[0] + 1]);
                                r(b[0] + 1, b)
                            }
                            e();
                            return false
                        });
                        a("#pData", "#" + t + "_2").click(function () {
                            a("#FormError", "#" + t).hide();
                            var b = q();
                            if (b[0] !== -1 && b[1][b[0] - 1]) {
                                a.isFunction(c.onclickPgButtons) && c.onclickPgButtons.call(o, "prev", a("#" + i), b[1][b[0]]);
                                u(b[1][b[0] - 1], o);
                                a(o).jqGrid("setSelection", b[1][b[0] - 1]);
                                a.isFunction(c.afterclickPgButtons) && c.afterclickPgButtons.call(o, "prev", a("#" + i), b[1][b[0] - 1]);
                                r(b[0] - 1, b)
                            }
                            e();
                            return false
                        })
                    }
                    v = q();
                    r(v[0], v)
                }
            })
        }, delGridRow: function (s,
                                 c) {
            c = a.extend(!0, {
                top: 0,
                left: 0,
                width: 240,
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                url: "",
                mtype: "POST",
                reloadAfterSubmit: !0,
                beforeShowForm: null,
                beforeInitData: null,
                afterShowForm: null,
                beforeSubmit: null,
                onclickSubmit: null,
                afterSubmit: null,
                jqModal: !0,
                closeOnEscape: !1,
                delData: {},
                delicon: [],
                cancelicon: [],
                onClose: null,
                ajaxDelOptions: {},
                processing: !1,
                serializeDelData: null,
                useDataProxy: !1
            }, a.jgrid.del, c || {});
            b[a(this)[0].p.id] = c;
            return this.each(function () {
                var e = this;
                if (e.grid &&
                    s) {
                    var h = a.isFunction(b[e.p.id].beforeShowForm), u = a.isFunction(b[e.p.id].afterShowForm), r = a.isFunction(b[e.p.id].beforeInitData) ? b[e.p.id].beforeInitData : !1, q = e.p.id, o = {}, f = !0, i = "DelTbl_" + a.jgrid.jqID(q), t, v, d, p, g = "DelTbl_" + q, m = {
                        themodal: "delmod" + q,
                        modalhead: "delhd" + q,
                        modalcontent: "delcnt" + q,
                        scrollelm: i
                    };
                    a.isArray(s) && (s = s.join());
                    if (void 0 !== a("#" + a.jgrid.jqID(m.themodal))[0]) {
                        r && (f = r.call(e, a("#" + i)), void 0 === f && (f = !0));
                        if (!1 === f)return;
                        a("#DelData>td", "#" + i).text(s);
                        a("#DelError", "#" + i).hide();
                        !0 === b[e.p.id].processing && (b[e.p.id].processing = !1, a("#dData", "#" + i).removeClass("ui-state-active"));
                        h && b[e.p.id].beforeShowForm.call(e, a("#" + i));
                        a.jgrid.viewModal("#" + a.jgrid.jqID(m.themodal), {
                            gbox: "#gbox_" + a.jgrid.jqID(q),
                            jqm: b[e.p.id].jqModal,
                            jqM: !1,
                            overlay: b[e.p.id].overlay,
                            modal: b[e.p.id].modal
                        })
                    } else {
                        var l = isNaN(b[e.p.id].dataheight) ? b[e.p.id].dataheight : b[e.p.id].dataheight + "px", n = isNaN(c.datawidth) ? c.datawidth : c.datawidth + "px", g = "<div id='" + g + "' class='formdata' style='width:" + n + ";overflow:auto;position:relative;height:" +
                            l + ";'><table class='DelTable'><tbody><tr id='DelError' style='display:none'><td class='ui-state-error'></td></tr>" + ("<tr id='DelData' style='display:none'><td >" + s + "</td></tr>"), g = g + ('<tr><td class="delmsg" style="white-space:pre;">' + b[e.p.id].msg + "</td></tr><tr><td >&#160;</td></tr>"), g = g + "</tbody></table></div>" + ("<table cellspacing='0' cellpadding='0' border='0' class='EditTable' id='" + i + "_2'><tbody><tr><td><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='DelButton EditButton'>" +
                            ("<a id='dData' class='fm-button ui-state-default ui-corner-all'>" + c.bSubmit + "</a>") + "&#160;" + ("<a id='eData' class='fm-button ui-state-default ui-corner-all'>" + c.bCancel + "</a>") + "</td></tr></tbody></table>");
                        c.gbox = "#gbox_" + a.jgrid.jqID(q);
                        a.jgrid.createModal(m, g, c, "#gview_" + a.jgrid.jqID(e.p.id), a("#gview_" + a.jgrid.jqID(e.p.id))[0]);
                        r && (f = r.call(e, a("#" + i)), void 0 === f && (f = !0));
                        if (!1 === f)return;
                        a(".fm-button", "#" + i + "_2").hover(function () {
                            a(this).addClass("ui-state-hover")
                        }, function () {
                            a(this).removeClass("ui-state-hover")
                        });
                        c.delicon = a.extend([!0, "left", "ui-icon-scissors"], b[e.p.id].delicon);
                        c.cancelicon = a.extend([!0, "left", "ui-icon-cancel"], b[e.p.id].cancelicon);
                        !0 === c.delicon[0] && a("#dData", "#" + i + "_2").addClass("right" === c.delicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + c.delicon[2] + "'></span>");
                        !0 === c.cancelicon[0] && a("#eData", "#" + i + "_2").addClass("right" === c.cancelicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + c.cancelicon[2] + "'></span>");
                        a("#dData", "#" + i + "_2").click(function () {
                            var f = [true, ""], g, h = a("#DelData>td", "#" + i).text();
                            o = {};
                            a.isFunction(b[e.p.id].onclickSubmit) && (o = b[e.p.id].onclickSubmit.call(e, b[e.p.id], h) || {});
                            a.isFunction(b[e.p.id].beforeSubmit) && (f = b[e.p.id].beforeSubmit.call(e, h));
                            if (f[0] && !b[e.p.id].processing) {
                                b[e.p.id].processing = true;
                                d = e.p.prmNames;
                                t = a.extend({}, b[e.p.id].delData, o);
                                p = d.oper;
                                t[p] = d.deloper;
                                v = d.id;
                                h = ("" + h).split(",");
                                if (!h.length)return false;
                                for (g in h)h.hasOwnProperty(g) && (h[g] = a.jgrid.stripPref(e.p.idPrefix,
                                    h[g]));
                                t[v] = h.join();
                                a(this).addClass("ui-state-active");
                                g = a.extend({
                                    url: b[e.p.id].url || a(e).jqGrid("getGridParam", "editurl"),
                                    type: b[e.p.id].mtype,
                                    data: a.isFunction(b[e.p.id].serializeDelData) ? b[e.p.id].serializeDelData.call(e, t) : t,
                                    complete: function (d, g) {
                                        var n;
                                        if (d.status >= 300 && d.status !== 304) {
                                            f[0] = false;
                                            f[1] = a.isFunction(b[e.p.id].errorTextFormat) ? b[e.p.id].errorTextFormat.call(e, d) : g + " Status: '" + d.statusText + "'. Error code: " + d.status
                                        } else a.isFunction(b[e.p.id].afterSubmit) && (f = b[e.p.id].afterSubmit.call(e,
                                            d, t));
                                        if (f[0] === false) {
                                            a("#DelError>td", "#" + i).html(f[1]);
                                            a("#DelError", "#" + i).show()
                                        } else {
                                            if (b[e.p.id].reloadAfterSubmit && e.p.datatype !== "local")a(e).trigger("reloadGrid"); else {
                                                if (e.p.treeGrid === true)try {
                                                    a(e).jqGrid("delTreeNode", e.p.idPrefix + h[0])
                                                } catch (l) {
                                                } else for (n = 0; n < h.length; n++)a(e).jqGrid("delRowData", e.p.idPrefix + h[n]);
                                                e.p.selrow = null;
                                                e.p.selarrrow = []
                                            }
                                            a.isFunction(b[e.p.id].afterComplete) && setTimeout(function () {
                                                b[e.p.id].afterComplete.call(e, d, h)
                                            }, 500)
                                        }
                                        b[e.p.id].processing = false;
                                        a("#dData",
                                            "#" + i + "_2").removeClass("ui-state-active");
                                        f[0] && a.jgrid.hideModal("#" + a.jgrid.jqID(m.themodal), {
                                            gb: "#gbox_" + a.jgrid.jqID(q),
                                            jqm: c.jqModal,
                                            onClose: b[e.p.id].onClose
                                        })
                                    }
                                }, a.jgrid.ajaxOptions, b[e.p.id].ajaxDelOptions);
                                if (!g.url && !b[e.p.id].useDataProxy)if (a.isFunction(e.p.dataProxy))b[e.p.id].useDataProxy = true; else {
                                    f[0] = false;
                                    f[1] = f[1] + (" " + a.jgrid.errors.nourl)
                                }
                                if (f[0])if (b[e.p.id].useDataProxy) {
                                    g = e.p.dataProxy.call(e, g, "del_" + e.p.id);
                                    g === void 0 && (g = [true, ""]);
                                    if (g[0] === false) {
                                        f[0] = false;
                                        f[1] = g[1] ||
                                            "Error deleting the selected row!"
                                    } else a.jgrid.hideModal("#" + a.jgrid.jqID(m.themodal), {
                                        gb: "#gbox_" + a.jgrid.jqID(q),
                                        jqm: c.jqModal,
                                        onClose: b[e.p.id].onClose
                                    })
                                } else a.ajax(g)
                            }
                            if (f[0] === false) {
                                a("#DelError>td", "#" + i).html(f[1]);
                                a("#DelError", "#" + i).show()
                            }
                            return false
                        });
                        a("#eData", "#" + i + "_2").click(function () {
                            a.jgrid.hideModal("#" + a.jgrid.jqID(m.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(q),
                                jqm: b[e.p.id].jqModal,
                                onClose: b[e.p.id].onClose
                            });
                            return false
                        });
                        h && b[e.p.id].beforeShowForm.call(e, a("#" + i));
                        a.jgrid.viewModal("#" +
                            a.jgrid.jqID(m.themodal), {
                            gbox: "#gbox_" + a.jgrid.jqID(q),
                            jqm: b[e.p.id].jqModal,
                            overlay: b[e.p.id].overlay,
                            modal: b[e.p.id].modal
                        })
                    }
                    u && b[e.p.id].afterShowForm.call(e, a("#" + i));
                    !0 === b[e.p.id].closeOnEscape && setTimeout(function () {
                        a(".ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(m.modalhead)).focus()
                    }, 0)
                }
            })
        }, navGrid: function (b, c, e, h, u, r, q) {
            c = a.extend({
                edit: !0,
                editicon: "ui-icon-pencil",
                add: !0,
                addicon: "ui-icon-plus",
                del: !0,
                delicon: "ui-icon-trash",
                search: !0,
                searchicon: "ui-icon-search",
                refresh: !0,
                refreshicon: "ui-icon-refresh",
                refreshstate: "firstpage",
                view: !1,
                viewicon: "ui-icon-document",
                position: "left",
                closeOnEscape: !0,
                beforeRefresh: null,
                afterRefresh: null,
                cloneToTop: !1,
                alertwidth: 200,
                alertheight: "auto",
                alerttop: null,
                alertleft: null,
                alertzIndex: null
            }, a.jgrid.nav, c || {});
            return this.each(function () {
                if (!this.nav) {
                    var o = {
                        themodal: "alertmod_" + this.p.id,
                        modalhead: "alerthd_" + this.p.id,
                        modalcontent: "alertcnt_" + this.p.id
                    }, f = this, i;
                    if (f.grid && "string" === typeof b) {
                        void 0 === a("#" + o.themodal)[0] && (!c.alerttop && !c.alertleft && (void 0 !==
                        window.innerWidth ? (c.alertleft = window.innerWidth, c.alerttop = window.innerHeight) : void 0 !== document.documentElement && void 0 !== document.documentElement.clientWidth && 0 !== document.documentElement.clientWidth ? (c.alertleft = document.documentElement.clientWidth, c.alerttop = document.documentElement.clientHeight) : (c.alertleft = 1024, c.alerttop = 768), c.alertleft = c.alertleft / 2 - parseInt(c.alertwidth, 10) / 2, c.alerttop = c.alerttop / 2 - 25), a.jgrid.createModal(o, "<div>" + c.alerttext + "</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'></span></span>",
                            {
                                gbox: "#gbox_" + a.jgrid.jqID(f.p.id),
                                jqModal: !0,
                                drag: !0,
                                resize: !0,
                                caption: c.alertcap,
                                top: c.alerttop,
                                left: c.alertleft,
                                width: c.alertwidth,
                                height: c.alertheight,
                                closeOnEscape: c.closeOnEscape,
                                zIndex: c.alertzIndex
                            }, "#gview_" + a.jgrid.jqID(f.p.id), a("#gbox_" + a.jgrid.jqID(f.p.id))[0], !0));
                        var t = 1, v, d = function () {
                            a(this).hasClass("ui-state-disabled") || a(this).addClass("ui-state-hover")
                        }, p = function () {
                            a(this).removeClass("ui-state-hover")
                        };
                        c.cloneToTop && f.p.toppager && (t = 2);
                        for (v = 0; v < t; v++) {
                            var g = a("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table navtable' style='float:left;table-layout:auto;'><tbody><tr></tr></tbody></table>"),
                                m, l;
                            0 === v ? (m = b, l = f.p.id, m === f.p.toppager && (l += "_top", t = 1)) : (m = f.p.toppager, l = f.p.id + "_top");
                            "rtl" === f.p.direction && a(g).attr("dir", "rtl").css("float", "right");
                            c.add && (h = h || {}, i = a("<td class='ui-pg-button ui-corner-all'></td>"), a(i).append("<div class='ui-pg-div'><span class='ui-icon " + c.addicon + "'></span>" + c.addtext + "</div>"), a("tr", g).append(i), a(i, g).attr({
                                title: c.addtitle || "",
                                id: h.id || "add_" + l
                            }).click(function () {
                                a(this).hasClass("ui-state-disabled") || (a.isFunction(c.addfunc) ? c.addfunc.call(f) :
                                    a(f).jqGrid("editGridRow", "new", h));
                                return false
                            }).hover(d, p), i = null);
                            c.edit && (i = a("<td class='ui-pg-button ui-corner-all'></td>"), e = e || {}, a(i).append("<div class='ui-pg-div'><span class='ui-icon " + c.editicon + "'></span>" + c.edittext + "</div>"), a("tr", g).append(i), a(i, g).attr({
                                title: c.edittitle || "",
                                id: e.id || "edit_" + l
                            }).click(function () {
                                if (!a(this).hasClass("ui-state-disabled")) {
                                    var b = f.p.selrow;
                                    if (b)a.isFunction(c.editfunc) ? c.editfunc.call(f, b) : a(f).jqGrid("editGridRow", b, e); else {
                                        a.jgrid.viewModal("#" +
                                            o.themodal, {gbox: "#gbox_" + a.jgrid.jqID(f.p.id), jqm: true});
                                        a("#jqg_alrt").focus()
                                    }
                                }
                                return false
                            }).hover(d, p), i = null);
                            c.view && (i = a("<td class='ui-pg-button ui-corner-all'></td>"), q = q || {}, a(i).append("<div class='ui-pg-div'><span class='ui-icon " + c.viewicon + "'></span>" + c.viewtext + "</div>"), a("tr", g).append(i), a(i, g).attr({
                                title: c.viewtitle || "",
                                id: q.id || "view_" + l
                            }).click(function () {
                                if (!a(this).hasClass("ui-state-disabled")) {
                                    var b = f.p.selrow;
                                    if (b)a.isFunction(c.viewfunc) ? c.viewfunc.call(f, b) : a(f).jqGrid("viewGridRow",
                                        b, q); else {
                                        a.jgrid.viewModal("#" + o.themodal, {
                                            gbox: "#gbox_" + a.jgrid.jqID(f.p.id),
                                            jqm: true
                                        });
                                        a("#jqg_alrt").focus()
                                    }
                                }
                                return false
                            }).hover(d, p), i = null);
                            c.del && (i = a("<td class='ui-pg-button ui-corner-all'></td>"), u = u || {}, a(i).append("<div class='ui-pg-div'><span class='ui-icon " + c.delicon + "'></span>" + c.deltext + "</div>"), a("tr", g).append(i), a(i, g).attr({
                                title: c.deltitle || "",
                                id: u.id || "del_" + l
                            }).click(function () {
                                if (!a(this).hasClass("ui-state-disabled")) {
                                    var b;
                                    if (f.p.multiselect) {
                                        b = f.p.selarrrow;
                                        b.length ===
                                        0 && (b = null)
                                    } else b = f.p.selrow;
                                    if (b)a.isFunction(c.delfunc) ? c.delfunc.call(f, b) : a(f).jqGrid("delGridRow", b, u); else {
                                        a.jgrid.viewModal("#" + o.themodal, {
                                            gbox: "#gbox_" + a.jgrid.jqID(f.p.id),
                                            jqm: true
                                        });
                                        a("#jqg_alrt").focus()
                                    }
                                }
                                return false
                            }).hover(d, p), i = null);
                            (c.add || c.edit || c.del || c.view) && a("tr", g).append("<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>");
                            c.search && (i = a("<td class='ui-pg-button ui-corner-all'></td>"), r = r || {}, a(i).append("<div class='ui-pg-div'><span class='ui-icon " +
                                c.searchicon + "'></span>" + c.searchtext + "</div>"), a("tr", g).append(i), a(i, g).attr({
                                title: c.searchtitle || "",
                                id: r.id || "search_" + l
                            }).click(function () {
                                a(this).hasClass("ui-state-disabled") || (a.isFunction(c.searchfunc) ? c.searchfunc.call(f, r) : a(f).jqGrid("searchGrid", r));
                                return false
                            }).hover(d, p), r.showOnLoad && !0 === r.showOnLoad && a(i, g).click(), i = null);
                            c.refresh && (i = a("<td class='ui-pg-button ui-corner-all'></td>"), a(i).append("<div class='ui-pg-div'><span class='ui-icon " + c.refreshicon + "'></span>" + c.refreshtext +
                                "</div>"), a("tr", g).append(i), a(i, g).attr({
                                title: c.refreshtitle || "",
                                id: "refresh_" + l
                            }).click(function () {
                                if (!a(this).hasClass("ui-state-disabled")) {
                                    a.isFunction(c.beforeRefresh) && c.beforeRefresh.call(f);
                                    f.p.search = false;
                                    try {
                                        var b = f.p.id;
                                        f.p.postData.filters = "";
                                        try {
                                            a("#fbox_" + a.jgrid.jqID(b)).jqFilter("resetFilter")
                                        } catch (d) {
                                        }
                                        a.isFunction(f.clearToolbar) && f.clearToolbar.call(f, false)
                                    } catch (e) {
                                    }
                                    switch (c.refreshstate) {
                                        case "firstpage":
                                            a(f).trigger("reloadGrid", [{page: 1}]);
                                            break;
                                        case "current":
                                            a(f).trigger("reloadGrid",
                                                [{current: true}])
                                    }
                                    a.isFunction(c.afterRefresh) && c.afterRefresh.call(f)
                                }
                                return false
                            }).hover(d, p), i = null);
                            i = a(".ui-jqgrid").css("font-size") || "11px";
                            a("body").append("<div id='testpg2' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:" + i + ";visibility:hidden;' ></div>");
                            i = a(g).clone().appendTo("#testpg2").width();
                            a("#testpg2").remove();
                            a(m + "_" + c.position, m).append(g);
                            f.p._nvtd && (i > f.p._nvtd[0] && (a(m + "_" + c.position, m).width(i), f.p._nvtd[0] = i), f.p._nvtd[1] = i);
                            g = i = i = null;
                            this.nav = !0
                        }
                    }
                }
            })
        },
        navButtonAdd: function (b, c) {
            c = a.extend({
                caption: "newButton",
                title: "",
                buttonicon: "ui-icon-newwin",
                onClickButton: null,
                position: "last",
                cursor: "pointer"
            }, c || {});
            return this.each(function () {
                if (this.grid) {
                    "string" === typeof b && 0 !== b.indexOf("#") && (b = "#" + a.jgrid.jqID(b));
                    var e = a(".navtable", b)[0], h = this;
                    if (e && !(c.id && void 0 !== a("#" + a.jgrid.jqID(c.id), e)[0])) {
                        var u = a("<td></td>");
                        "NONE" === c.buttonicon.toString().toUpperCase() ? a(u).addClass("ui-pg-button ui-corner-all").append("<div class='ui-pg-div'>" + c.caption +
                            "</div>") : a(u).addClass("ui-pg-button ui-corner-all").append("<div class='ui-pg-div'><span class='ui-icon " + c.buttonicon + "'></span>" + c.caption + "</div>");
                        c.id && a(u).attr("id", c.id);
                        "first" === c.position ? 0 === e.rows[0].cells.length ? a("tr", e).append(u) : a("tr td:eq(0)", e).before(u) : a("tr", e).append(u);
                        a(u, e).attr("title", c.title || "").click(function (b) {
                            a(this).hasClass("ui-state-disabled") || a.isFunction(c.onClickButton) && c.onClickButton.call(h, b);
                            return !1
                        }).hover(function () {
                            a(this).hasClass("ui-state-disabled") ||
                            a(this).addClass("ui-state-hover")
                        }, function () {
                            a(this).removeClass("ui-state-hover")
                        })
                    }
                }
            })
        }, navSeparatorAdd: function (b, c) {
            c = a.extend({sepclass: "ui-separator", sepcontent: "", position: "last"}, c || {});
            return this.each(function () {
                if (this.grid) {
                    "string" === typeof b && 0 !== b.indexOf("#") && (b = "#" + a.jgrid.jqID(b));
                    var e = a(".navtable", b)[0];
                    if (e) {
                        var h = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='" + c.sepclass + "'></span>" + c.sepcontent + "</td>";
                        "first" === c.position ? 0 === e.rows[0].cells.length ?
                            a("tr", e).append(h) : a("tr td:eq(0)", e).before(h) : a("tr", e).append(h)
                    }
                }
            })
        }, GridToForm: function (b, c) {
            return this.each(function () {
                var e = this, h;
                if (e.grid) {
                    var u = a(e).jqGrid("getRowData", b);
                    if (u)for (h in u)u.hasOwnProperty(h) && (a("[name=" + a.jgrid.jqID(h) + "]", c).is("input:radio") || a("[name=" + a.jgrid.jqID(h) + "]", c).is("input:checkbox") ? a("[name=" + a.jgrid.jqID(h) + "]", c).each(function () {
                        if (a(this).val() == u[h])a(this)[e.p.useProp ? "prop" : "attr"]("checked", !0); else a(this)[e.p.useProp ? "prop" : "attr"]("checked",
                            !1)
                    }) : a("[name=" + a.jgrid.jqID(h) + "]", c).val(u[h]))
                }
            })
        }, FormToGrid: function (b, c, e, h) {
            return this.each(function () {
                if (this.grid) {
                    e || (e = "set");
                    h || (h = "first");
                    var u = a(c).serializeArray(), r = {};
                    a.each(u, function (a, b) {
                        r[b.name] = b.value
                    });
                    "add" === e ? a(this).jqGrid("addRowData", b, r, h) : "set" === e && a(this).jqGrid("setRowData", b, r)
                }
            })
        }
    })
})(jQuery);
(function (a) {
    a.fn.jqFilter = function (d) {
        if ("string" === typeof d) {
            var l = a.fn.jqFilter[d];
            if (!l)throw"jqFilter - No such method: " + d;
            var v = a.makeArray(arguments).slice(1);
            return l.apply(this, v)
        }
        var n = a.extend(!0, {
            filter: null,
            columns: [],
            onChange: null,
            afterRedraw: null,
            checkValues: null,
            error: !1,
            errmsg: "",
            errorcheck: !0,
            showQuery: !0,
            sopt: null,
            ops: [],
            operands: null,
            numopts: "eq,ne,lt,le,gt,ge,nu,nn,in,ni".split(","),
            stropts: "eq,ne,bw,bn,ew,en,cn,nc,nu,nn,in,ni".split(","),
            strarr: ["text", "string", "blob"],
            groupOps: [{
                op: "AND",
                text: "AND"
            }, {op: "OR", text: "OR"}],
            groupButton: !0,
            ruleButtons: !0,
            direction: "ltr"
        }, a.jgrid.filter, d || {});
        return this.each(function () {
            if (!this.filter) {
                this.p = n;
                if (null === this.p.filter || void 0 === this.p.filter)this.p.filter = {
                    groupOp: this.p.groupOps[0].op,
                    rules: [],
                    groups: []
                };
                var d, l = this.p.columns.length, f, t = /msie/i.test(navigator.userAgent) && !window.opera;
                this.p.initFilter = a.extend(!0, {}, this.p.filter);
                if (l) {
                    for (d = 0; d < l; d++)if (f = this.p.columns[d], f.stype ? f.inputtype = f.stype : f.inputtype || (f.inputtype = "text"),
                            f.sorttype ? f.searchtype = f.sorttype : f.searchtype || (f.searchtype = "string"), void 0 === f.hidden && (f.hidden = !1), f.label || (f.label = f.name), f.index && (f.name = f.index), f.hasOwnProperty("searchoptions") || (f.searchoptions = {}), !f.hasOwnProperty("searchrules"))f.searchrules = {};
                    this.p.showQuery && a(this).append("<table class='queryresult ui-widget ui-widget-content' style='display:block;max-width:440px;border:0px none;' dir='" + this.p.direction + "'><tbody><tr><td class='query'></td></tr></tbody></table>");
                    var u = function () {
                        return a("#" +
                                a.jgrid.jqID(n.id))[0] || null
                    }, r = function (g, j) {
                        var b = [!0, ""], c = u();
                        if (a.isFunction(j.searchrules))b = j.searchrules.call(c, g, j); else if (a.jgrid && a.jgrid.checkValues)try {
                            b = a.jgrid.checkValues.call(c, g, -1, j.searchrules, j.label)
                        } catch (k) {
                        }
                        b && b.length && !1 === b[0] && (n.error = !b[0], n.errmsg = b[1])
                    };
                    this.onchange = function () {
                        this.p.error = !1;
                        this.p.errmsg = "";
                        return a.isFunction(this.p.onChange) ? this.p.onChange.call(this, this.p) : !1
                    };
                    this.reDraw = function () {
                        a("table.group:first", this).remove();
                        var g = this.createTableForGroup(n.filter,
                            null);
                        a(this).append(g);
                        a.isFunction(this.p.afterRedraw) && this.p.afterRedraw.call(this, this.p)
                    };
                    this.createTableForGroup = function (g, j) {
                        var b = this, c, k = a("<table class='group ui-widget ui-widget-content' style='border:0px none;'><tbody></tbody></table>"), e = "left";
                        "rtl" === this.p.direction && (e = "right", k.attr("dir", "rtl"));
                        null === j && k.append("<tr class='error' style='display:none;'><th colspan='5' class='ui-state-error' align='" + e + "'></th></tr>");
                        var h = a("<tr></tr>");
                        k.append(h);
                        e = a("<th colspan='5' align='" +
                            e + "'></th>");
                        h.append(e);
                        if (!0 === this.p.ruleButtons) {
                            var d = a("<select class='opsel'></select>");
                            e.append(d);
                            var h = "", i;
                            for (c = 0; c < n.groupOps.length; c++)i = g.groupOp === b.p.groupOps[c].op ? " selected='selected'" : "", h += "<option value='" + b.p.groupOps[c].op + "'" + i + ">" + b.p.groupOps[c].text + "</option>";
                            d.append(h).bind("change", function () {
                                g.groupOp = a(d).val();
                                b.onchange()
                            })
                        }
                        h = "<span></span>";
                        this.p.groupButton && (h = a("<input type='button' value='+ {}' title='Add subgroup' class='add-group'/>"), h.bind("click",
                            function () {
                                if (g.groups === void 0)g.groups = [];
                                g.groups.push({groupOp: n.groupOps[0].op, rules: [], groups: []});
                                b.reDraw();
                                b.onchange();
                                return false
                            }));
                        e.append(h);
                        if (!0 === this.p.ruleButtons) {
                            var h = a("<input type='button' value='+' title='Add rule' class='add-rule ui-add'/>"), f;
                            h.bind("click", function () {
                                if (g.rules === void 0)g.rules = [];
                                for (c = 0; c < b.p.columns.length; c++) {
                                    var e = b.p.columns[c].search === void 0 ? true : b.p.columns[c].search, j = b.p.columns[c].hidden === true;
                                    if (b.p.columns[c].searchoptions.searchhidden ===
                                        true && e || e && !j) {
                                        f = b.p.columns[c];
                                        break
                                    }
                                }
                                e = f.searchoptions.sopt ? f.searchoptions.sopt : b.p.sopt ? b.p.sopt : a.inArray(f.searchtype, b.p.strarr) !== -1 ? b.p.stropts : b.p.numopts;
                                g.rules.push({field: f.name, op: e[0], data: ""});
                                b.reDraw();
                                return false
                            });
                            e.append(h)
                        }
                        null !== j && (h = a("<input type='button' value='-' title='Delete group' class='delete-group'/>"), e.append(h), h.bind("click", function () {
                            for (c = 0; c < j.groups.length; c++)if (j.groups[c] === g) {
                                j.groups.splice(c, 1);
                                break
                            }
                            b.reDraw();
                            b.onchange();
                            return false
                        }));
                        if (void 0 !==
                            g.groups)for (c = 0; c < g.groups.length; c++)e = a("<tr></tr>"), k.append(e), h = a("<td class='first'></td>"), e.append(h), h = a("<td colspan='4'></td>"), h.append(this.createTableForGroup(g.groups[c], g)), e.append(h);
                        void 0 === g.groupOp && (g.groupOp = b.p.groupOps[0].op);
                        if (void 0 !== g.rules)for (c = 0; c < g.rules.length; c++)k.append(this.createTableRowForRule(g.rules[c], g));
                        return k
                    };
                    this.createTableRowForRule = function (g, j) {
                        var b = this, c = u(), k = a("<tr></tr>"), e, h, f, i, d = "", p;
                        k.append("<td class='first'></td>");
                        var m = a("<td class='columns'></td>");
                        k.append(m);
                        var l = a("<select></select>"), o, q = [];
                        m.append(l);
                        l.bind("change", function () {
                            g.field = a(l).val();
                            f = a(this).parents("tr:first");
                            for (e = 0; e < b.p.columns.length; e++)if (b.p.columns[e].name === g.field) {
                                i = b.p.columns[e];
                                break
                            }
                            if (i) {
                                i.searchoptions.id = a.jgrid.randId();
                                t && "text" === i.inputtype && !i.searchoptions.size && (i.searchoptions.size = 10);
                                var d = a.jgrid.createEl.call(c, i.inputtype, i.searchoptions, "", !0, b.p.ajaxSelectOptions || {}, !0);
                                a(d).addClass("input-elm");
                                h = i.searchoptions.sopt ? i.searchoptions.sopt :
                                    b.p.sopt ? b.p.sopt : -1 !== a.inArray(i.searchtype, b.p.strarr) ? b.p.stropts : b.p.numopts;
                                var j = "", k = 0;
                                q = [];
                                a.each(b.p.ops, function () {
                                    q.push(this.oper)
                                });
                                for (e = 0; e < h.length; e++)o = a.inArray(h[e], q), -1 !== o && (0 === k && (g.op = b.p.ops[o].oper), j += "<option value='" + b.p.ops[o].oper + "'>" + b.p.ops[o].text + "</option>", k++);
                                a(".selectopts", f).empty().append(j);
                                a(".selectopts", f)[0].selectedIndex = 0;
                                a.jgrid.msie && 9 > a.jgrid.msiever() && (j = parseInt(a("select.selectopts", f)[0].offsetWidth, 10) + 1, a(".selectopts", f).width(j), a(".selectopts",
                                    f).css("width", "auto"));
                                a(".data", f).empty().append(d);
                                a.jgrid.bindEv.call(c, d, i.searchoptions);
                                a(".input-elm", f).bind("change", function (e) {
                                    var d = a(this).hasClass("ui-autocomplete-input") ? 200 : 0;
                                    setTimeout(function () {
                                        var d = e.target;
                                        g.data = d.nodeName.toUpperCase() === "SPAN" && i.searchoptions && a.isFunction(i.searchoptions.custom_value) ? i.searchoptions.custom_value.call(c, a(d).children(".customelement:first"), "get") : d.value;
                                        b.onchange()
                                    }, d)
                                });
                                setTimeout(function () {
                                    g.data = a(d).val();
                                    b.onchange()
                                }, 0)
                            }
                        });
                        for (e = m = 0; e < b.p.columns.length; e++) {
                            p = void 0 === b.p.columns[e].search ? !0 : b.p.columns[e].search;
                            var r = !0 === b.p.columns[e].hidden;
                            if (!0 === b.p.columns[e].searchoptions.searchhidden && p || p && !r)p = "", g.field === b.p.columns[e].name && (p = " selected='selected'", m = e), d += "<option value='" + b.p.columns[e].name + "'" + p + ">" + b.p.columns[e].label + "</option>"
                        }
                        l.append(d);
                        d = a("<td class='operators'></td>");
                        k.append(d);
                        i = n.columns[m];
                        i.searchoptions.id = a.jgrid.randId();
                        t && "text" === i.inputtype && !i.searchoptions.size && (i.searchoptions.size =
                            10);
                        m = a.jgrid.createEl.call(c, i.inputtype, i.searchoptions, g.data, !0, b.p.ajaxSelectOptions || {}, !0);
                        if ("nu" === g.op || "nn" === g.op)a(m).attr("readonly", "true"), a(m).attr("disabled", "true");
                        var s = a("<select class='selectopts'></select>");
                        d.append(s);
                        s.bind("change", function () {
                            g.op = a(s).val();
                            f = a(this).parents("tr:first");
                            var c = a(".input-elm", f)[0];
                            if (g.op === "nu" || g.op === "nn") {
                                g.data = "";
                                if (c.tagName.toUpperCase() !== "SELECT")c.value = "";
                                c.setAttribute("readonly", "true");
                                c.setAttribute("disabled", "true")
                            } else {
                                if (c.tagName.toUpperCase() ===
                                    "SELECT")g.data = c.value;
                                c.removeAttribute("readonly");
                                c.removeAttribute("disabled")
                            }
                            b.onchange()
                        });
                        h = i.searchoptions.sopt ? i.searchoptions.sopt : b.p.sopt ? b.p.sopt : -1 !== a.inArray(i.searchtype, b.p.strarr) ? b.p.stropts : b.p.numopts;
                        d = "";
                        a.each(b.p.ops, function () {
                            q.push(this.oper)
                        });
                        for (e = 0; e < h.length; e++)o = a.inArray(h[e], q), -1 !== o && (p = g.op === b.p.ops[o].oper ? " selected='selected'" : "", d += "<option value='" + b.p.ops[o].oper + "'" + p + ">" + b.p.ops[o].text + "</option>");
                        s.append(d);
                        d = a("<td class='data'></td>");
                        k.append(d);
                        d.append(m);
                        a.jgrid.bindEv.call(c, m, i.searchoptions);
                        a(m).addClass("input-elm").bind("change", function () {
                            g.data = i.inputtype === "custom" ? i.searchoptions.custom_value.call(c, a(this).children(".customelement:first"), "get") : a(this).val();
                            b.onchange()
                        });
                        d = a("<td></td>");
                        k.append(d);
                        !0 === this.p.ruleButtons && (m = a("<input type='button' value='-' title='Delete rule' class='delete-rule ui-del'/>"), d.append(m), m.bind("click", function () {
                            for (e = 0; e < j.rules.length; e++)if (j.rules[e] === g) {
                                j.rules.splice(e, 1);
                                break
                            }
                            b.reDraw();
                            b.onchange();
                            return false
                        }));
                        return k
                    };
                    this.getStringForGroup = function (a) {
                        var d = "(", b;
                        if (void 0 !== a.groups)for (b = 0; b < a.groups.length; b++) {
                            1 < d.length && (d += " " + a.groupOp + " ");
                            try {
                                d += this.getStringForGroup(a.groups[b])
                            } catch (c) {
                                alert(c)
                            }
                        }
                        if (void 0 !== a.rules)try {
                            for (b = 0; b < a.rules.length; b++)1 < d.length && (d += " " + a.groupOp + " "), d += this.getStringForRule(a.rules[b])
                        } catch (f) {
                            alert(f)
                        }
                        d += ")";
                        return "()" === d ? "" : d
                    };
                    this.getStringForRule = function (d) {
                        var f = "", b = "", c, k;
                        for (c = 0; c < this.p.ops.length; c++)if (this.p.ops[c].oper ===
                            d.op) {
                            f = this.p.operands.hasOwnProperty(d.op) ? this.p.operands[d.op] : "";
                            b = this.p.ops[c].oper;
                            break
                        }
                        for (c = 0; c < this.p.columns.length; c++)if (this.p.columns[c].name === d.field) {
                            k = this.p.columns[c];
                            break
                        }
                        if (void 0 === k)return "";
                        c = d.data;
                        if ("bw" === b || "bn" === b)c += "%";
                        if ("ew" === b || "en" === b)c = "%" + c;
                        if ("cn" === b || "nc" === b)c = "%" + c + "%";
                        if ("in" === b || "ni" === b)c = " (" + c + ")";
                        n.errorcheck && r(d.data, k);
                        return -1 !== a.inArray(k.searchtype, ["int", "integer", "float", "number", "currency"]) || "nn" === b || "nu" === b ? d.field + " " + f + " " +
                        c : d.field + " " + f + ' "' + c + '"'
                    };
                    this.resetFilter = function () {
                        this.p.filter = a.extend(!0, {}, this.p.initFilter);
                        this.reDraw();
                        this.onchange()
                    };
                    this.hideError = function () {
                        a("th.ui-state-error", this).html("");
                        a("tr.error", this).hide()
                    };
                    this.showError = function () {
                        a("th.ui-state-error", this).html(this.p.errmsg);
                        a("tr.error", this).show()
                    };
                    this.toUserFriendlyString = function () {
                        return this.getStringForGroup(n.filter)
                    };
                    this.toString = function () {
                        function a(b) {
                            var c = "(", f;
                            if (void 0 !== b.groups)for (f = 0; f < b.groups.length; f++)1 <
                            c.length && (c = "OR" === b.groupOp ? c + " || " : c + " && "), c += a(b.groups[f]);
                            if (void 0 !== b.rules)for (f = 0; f < b.rules.length; f++) {
                                1 < c.length && (c = "OR" === b.groupOp ? c + " || " : c + " && ");
                                var e = b.rules[f];
                                if (d.p.errorcheck) {
                                    for (var h = void 0, l = void 0, h = 0; h < d.p.columns.length; h++)if (d.p.columns[h].name === e.field) {
                                        l = d.p.columns[h];
                                        break
                                    }
                                    l && r(e.data, l)
                                }
                                c += e.op + "(item." + e.field + ",'" + e.data + "')"
                            }
                            c += ")";
                            return "()" === c ? "" : c
                        }

                        var d = this;
                        return a(this.p.filter)
                    };
                    this.reDraw();
                    if (this.p.showQuery)this.onchange();
                    this.filter = !0
                }
            }
        })
    };
    a.extend(a.fn.jqFilter, {
        toSQLString: function () {
            var a = "";
            this.each(function () {
                a = this.toUserFriendlyString()
            });
            return a
        }, filterData: function () {
            var a;
            this.each(function () {
                a = this.p.filter
            });
            return a
        }, getParameter: function (a) {
            return void 0 !== a && this.p.hasOwnProperty(a) ? this.p[a] : this.p
        }, resetFilter: function () {
            return this.each(function () {
                this.resetFilter()
            })
        }, addFilter: function (d) {
            "string" === typeof d && (d = a.jgrid.parse(d));
            this.each(function () {
                this.p.filter = d;
                this.reDraw();
                this.onchange()
            })
        }
    })
})(jQuery);
(function (a) {
    a.jgrid.inlineEdit = a.jgrid.inlineEdit || {};
    a.jgrid.extend({
        editRow: function (c, b, e, n, h, j, p, g, f) {
            var k = {}, d = a.makeArray(arguments).slice(1);
            if ("object" === a.type(d[0]))k = d[0]; else if (void 0 !== b && (k.keys = b), a.isFunction(e) && (k.oneditfunc = e), a.isFunction(n) && (k.successfunc = n), void 0 !== h && (k.url = h), void 0 !== j && (k.extraparam = j), a.isFunction(p) && (k.aftersavefunc = p), a.isFunction(g) && (k.errorfunc = g), a.isFunction(f))k.afterrestorefunc = f;
            k = a.extend(!0, {
                keys: !1,
                oneditfunc: null,
                successfunc: null,
                url: null,
                extraparam: {},
                aftersavefunc: null,
                errorfunc: null,
                afterrestorefunc: null,
                restoreAfterError: !0,
                mtype: "POST"
            }, a.jgrid.inlineEdit, k);
            return this.each(function () {
                var d = this, f, b, e = 0, g = null, h = {}, j, m, n;
                if (d.grid && (j = a(d).jqGrid("getInd", c, !0), !1 !== j && (n = a.isFunction(k.beforeEditRow) ? k.beforeEditRow.call(d, k, c) : void 0, void 0 === n && (n = !0), n && "0" === (a(j).attr("editable") || "0") && !a(j).hasClass("not-editable-row"))))m = d.p.colModel, a('td[role="gridcell"]', j).each(function (l) {
                    f = m[l].name;
                    var j = !0 === d.p.treeGrid && f ===
                        d.p.ExpandColumn;
                    if (j)b = a("span:first", this).html(); else try {
                        b = a.unformat.call(d, this, {rowId: c, colModel: m[l]}, l)
                    } catch (k) {
                        b = m[l].edittype && "textarea" === m[l].edittype ? a(this).text() : a(this).html()
                    }
                    if ("cb" !== f && "subgrid" !== f && "rn" !== f && (d.p.autoencode && (b = a.jgrid.htmlDecode(b)), h[f] = b, !0 === m[l].editable)) {
                        null === g && (g = l);
                        j ? a("span:first", this).html("") : a(this).html("");
                        var n = a.extend({}, m[l].editoptions || {}, {id: c + "_" + f, name: f});
                        m[l].edittype || (m[l].edittype = "text");
                        if ("&nbsp;" === b || "&#160;" === b || 1 ===
                            b.length && 160 === b.charCodeAt(0))b = "";
                        var u = a.jgrid.createEl.call(d, m[l].edittype, n, b, !0, a.extend({}, a.jgrid.ajaxOptions, d.p.ajaxSelectOptions || {}));
                        a(u).addClass("editable");
                        j ? a("span:first", this).append(u) : a(this).append(u);
                        a.jgrid.bindEv.call(d, u, n);
                        "select" === m[l].edittype && void 0 !== m[l].editoptions && !0 === m[l].editoptions.multiple && void 0 === m[l].editoptions.dataUrl && a.jgrid.msie && a(u).width(a(u).width());
                        e++
                    }
                }), 0 < e && (h.id = c, d.p.savedRow.push(h), a(j).attr("editable", "1"), a("td:eq(" + g + ") input",
                    j).focus(), !0 === k.keys && a(j).bind("keydown", function (f) {
                    if (27 === f.keyCode) {
                        a(d).jqGrid("restoreRow", c, k.afterrestorefunc);
                        if (d.p._inlinenav)try {
                            a(d).jqGrid("showAddEditButtons")
                        } catch (b) {
                        }
                        return !1
                    }
                    if (13 === f.keyCode) {
                        if ("TEXTAREA" === f.target.tagName)return !0;
                        if (a(d).jqGrid("saveRow", c, k) && d.p._inlinenav)try {
                            a(d).jqGrid("showAddEditButtons")
                        } catch (e) {
                        }
                        return !1
                    }
                }), a(d).triggerHandler("jqGridInlineEditRow", [c, k]), a.isFunction(k.oneditfunc) && k.oneditfunc.call(d, c))
            })
        }, saveRow: function (c, b, e, n, h, j, p) {
            var g =
                a.makeArray(arguments).slice(1), f = {};
            if ("object" === a.type(g[0]))f = g[0]; else if (a.isFunction(b) && (f.successfunc = b), void 0 !== e && (f.url = e), void 0 !== n && (f.extraparam = n), a.isFunction(h) && (f.aftersavefunc = h), a.isFunction(j) && (f.errorfunc = j), a.isFunction(p))f.afterrestorefunc = p;
            var f = a.extend(!0, {
                successfunc: null,
                url: null,
                extraparam: {},
                aftersavefunc: null,
                errorfunc: null,
                afterrestorefunc: null,
                restoreAfterError: !0,
                mtype: "POST"
            }, a.jgrid.inlineEdit, f), k = !1, d = this[0], o, i = {}, v = {}, r = {}, s, w, q;
            if (!d.grid)return k;
            q = a(d).jqGrid("getInd", c, !0);
            if (!1 === q)return k;
            g = a.isFunction(f.beforeSaveRow) ? f.beforeSaveRow.call(d, f, c) : void 0;
            void 0 === g && (g = !0);
            if (g) {
                g = a(q).attr("editable");
                f.url = f.url || d.p.editurl;
                if ("1" === g) {
                    var m;
                    a('td[role="gridcell"]', q).each(function (c) {
                        m = d.p.colModel[c];
                        o = m.name;
                        if ("cb" !== o && "subgrid" !== o && !0 === m.editable && "rn" !== o && !a(this).hasClass("not-editable-cell")) {
                            switch (m.edittype) {
                                case "checkbox":
                                    var b = ["Yes", "No"];
                                    m.editoptions && (b = m.editoptions.value.split(":"));
                                    i[o] = a("input", this).is(":checked") ?
                                        b[0] : b[1];
                                    break;
                                case "text":
                                case "password":
                                case "textarea":
                                case "button":
                                    i[o] = a("input, textarea", this).val();
                                    break;
                                case "select":
                                    if (m.editoptions.multiple) {
                                        var b = a("select", this), e = [];
                                        i[o] = a(b).val();
                                        i[o] = i[o] ? i[o].join(",") : "";
                                        a("select option:selected", this).each(function (d, c) {
                                            e[d] = a(c).text()
                                        });
                                        v[o] = e.join(",")
                                    } else i[o] = a("select option:selected", this).val(), v[o] = a("select option:selected", this).text();
                                    m.formatter && "select" === m.formatter && (v = {});
                                    break;
                                case "custom":
                                    try {
                                        if (m.editoptions && a.isFunction(m.editoptions.custom_value)) {
                                            if (i[o] =
                                                    m.editoptions.custom_value.call(d, a(".customelement", this), "get"), void 0 === i[o])throw"e2";
                                        } else throw"e1";
                                    } catch (g) {
                                        "e1" === g && a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose), "e2" === g ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, g.message, a.jgrid.edit.bClose)
                                    }
                            }
                            w = a.jgrid.checkValues.call(d, i[o], c);
                            if (!1 === w[0])return !1;
                            d.p.autoencode &&
                            (i[o] = a.jgrid.htmlEncode(i[o]));
                            "clientArray" !== f.url && m.editoptions && !0 === m.editoptions.NullIfEmpty && "" === i[o] && (r[o] = "null")
                        }
                    });
                    if (!1 === w[0]) {
                        try {
                            var t = a(d).jqGrid("getGridRowById", c), l = a.jgrid.findPos(t);
                            a.jgrid.info_dialog(a.jgrid.errors.errcap, w[1], a.jgrid.edit.bClose, {
                                left: l[0],
                                top: l[1] + a(t).outerHeight()
                            })
                        } catch (x) {
                            alert(w[1])
                        }
                        return k
                    }
                    g = d.p.prmNames;
                    t = c;
                    l = !1 === d.p.keyIndex ? g.id : d.p.colModel[d.p.keyIndex + (!0 === d.p.rownumbers ? 1 : 0) + (!0 === d.p.multiselect ? 1 : 0) + (!0 === d.p.subGrid ? 1 : 0)].name;
                    if (i) {
                        i[g.oper] =
                            g.editoper;
                        if (void 0 === i[l] || "" === i[l])i[l] = c; else if (q.id !== d.p.idPrefix + i[l] && (g = a.jgrid.stripPref(d.p.idPrefix, c), void 0 !== d.p._index[g] && (d.p._index[i[l]] = d.p._index[g], delete d.p._index[g]), c = d.p.idPrefix + i[l], a(q).attr("id", c), d.p.selrow === t && (d.p.selrow = c), a.isArray(d.p.selarrrow) && (g = a.inArray(t, d.p.selarrrow), 0 <= g && (d.p.selarrrow[g] = c)), d.p.multiselect))g = "jqg_" + d.p.id + "_" + c, a("input.cbox", q).attr("id", g).attr("name", g);
                        void 0 === d.p.inlineData && (d.p.inlineData = {});
                        i = a.extend({}, i, d.p.inlineData,
                            f.extraparam)
                    }
                    if ("clientArray" === f.url) {
                        i = a.extend({}, i, v);
                        d.p.autoencode && a.each(i, function (d, c) {
                            i[d] = a.jgrid.htmlDecode(c)
                        });
                        g = a(d).jqGrid("setRowData", c, i);
                        a(q).attr("editable", "0");
                        for (l = 0; l < d.p.savedRow.length; l++)if ("" + d.p.savedRow[l].id === "" + t) {
                            s = l;
                            break
                        }
                        0 <= s && d.p.savedRow.splice(s, 1);
                        a(d).triggerHandler("jqGridInlineAfterSaveRow", [c, g, i, f]);
                        a.isFunction(f.aftersavefunc) && f.aftersavefunc.call(d, c, g, f);
                        k = !0;
                        a(q).removeClass("jqgrid-new-row").unbind("keydown")
                    } else a("#lui_" + a.jgrid.jqID(d.p.id)).show(),
                        r = a.extend({}, i, r), r[l] = a.jgrid.stripPref(d.p.idPrefix, r[l]), a.ajax(a.extend({
                        url: f.url,
                        data: a.isFunction(d.p.serializeRowData) ? d.p.serializeRowData.call(d, r) : r,
                        type: f.mtype,
                        async: !1,
                        complete: function (b, e) {
                            a("#lui_" + a.jgrid.jqID(d.p.id)).hide();
                            if ("success" === e) {
                                var g = !0, h;
                                h = a(d).triggerHandler("jqGridInlineSuccessSaveRow", [b, c, f]);
                                a.isArray(h) || (h = [!0, i]);
                                h[0] && a.isFunction(f.successfunc) && (h = f.successfunc.call(d, b));
                                a.isArray(h) ? (g = h[0], i = h[1] || i) : g = h;
                                if (!0 === g) {
                                    d.p.autoencode && a.each(i, function (d,
                                                                          c) {
                                        i[d] = a.jgrid.htmlDecode(c)
                                    });
                                    i = a.extend({}, i, v);
                                    a(d).jqGrid("setRowData", c, i);
                                    a(q).attr("editable", "0");
                                    for (g = 0; g < d.p.savedRow.length; g++)if ("" + d.p.savedRow[g].id === "" + c) {
                                        s = g;
                                        break
                                    }
                                    0 <= s && d.p.savedRow.splice(s, 1);
                                    a(d).triggerHandler("jqGridInlineAfterSaveRow", [c, b, i, f]);
                                    a.isFunction(f.aftersavefunc) && f.aftersavefunc.call(d, c, b);
                                    k = !0;
                                    a(q).removeClass("jqgrid-new-row").unbind("keydown")
                                } else a(d).triggerHandler("jqGridInlineErrorSaveRow", [c, b, e, null, f]), a.isFunction(f.errorfunc) && f.errorfunc.call(d,
                                    c, b, e, null), !0 === f.restoreAfterError && a(d).jqGrid("restoreRow", c, f.afterrestorefunc)
                            }
                        },
                        error: function (b, e, g) {
                            a("#lui_" + a.jgrid.jqID(d.p.id)).hide();
                            a(d).triggerHandler("jqGridInlineErrorSaveRow", [c, b, e, g, f]);
                            if (a.isFunction(f.errorfunc))f.errorfunc.call(d, c, b, e, g); else {
                                b = b.responseText || b.statusText;
                                try {
                                    a.jgrid.info_dialog(a.jgrid.errors.errcap, '<div class="ui-state-error">' + b + "</div>", a.jgrid.edit.bClose, {buttonalign: "right"})
                                } catch (h) {
                                    alert(b)
                                }
                            }
                            !0 === f.restoreAfterError && a(d).jqGrid("restoreRow",
                                c, f.afterrestorefunc)
                        }
                    }, a.jgrid.ajaxOptions, d.p.ajaxRowOptions || {}))
                }
                return k
            }
        }, restoreRow: function (c, b) {
            var e = a.makeArray(arguments).slice(1), n = {};
            "object" === a.type(e[0]) ? n = e[0] : a.isFunction(b) && (n.afterrestorefunc = b);
            n = a.extend(!0, {}, a.jgrid.inlineEdit, n);
            return this.each(function () {
                var b = this, e, p, g = {}, f;
                if (b.grid) {
                    p = a(b).jqGrid("getInd", c, true);
                    if (p !== false) {
                        f = a.isFunction(n.beforeCancelRow) ? n.beforeCancelRow.call(b, cancelPrm, sr) : void 0;
                        f === void 0 && (f = true);
                        if (f) {
                            for (f = 0; f < b.p.savedRow.length; f++)if ("" +
                                b.p.savedRow[f].id === "" + c) {
                                e = f;
                                break
                            }
                            if (e >= 0) {
                                if (a.isFunction(a.fn.datepicker))try {
                                    a("input.hasDatepicker", "#" + a.jgrid.jqID(p.id)).datepicker("hide")
                                } catch (k) {
                                }
                                a.each(b.p.colModel, function () {
                                    this.editable === true && b.p.savedRow[e].hasOwnProperty(this.name) && (g[this.name] = b.p.savedRow[e][this.name])
                                });
                                a(b).jqGrid("setRowData", c, g);
                                a(p).attr("editable", "0").unbind("keydown");
                                b.p.savedRow.splice(e, 1);
                                a("#" + a.jgrid.jqID(c), "#" + a.jgrid.jqID(b.p.id)).hasClass("jqgrid-new-row") && setTimeout(function () {
                                    a(b).jqGrid("delRowData",
                                        c);
                                    a(b).jqGrid("showAddEditButtons")
                                }, 0)
                            }
                            a(b).triggerHandler("jqGridInlineAfterRestoreRow", [c]);
                            a.isFunction(n.afterrestorefunc) && n.afterrestorefunc.call(b, c)
                        }
                    }
                }
            })
        }, addRow: function (c) {
            c = a.extend(!0, {
                rowID: null,
                initdata: {},
                position: "first",
                useDefValues: !0,
                useFormatter: !1,
                addRowParams: {extraparam: {}}
            }, c || {});
            return this.each(function () {
                if (this.grid) {
                    var b = this, e = a.isFunction(c.beforeAddRow) ? c.beforeAddRow.call(b, c.addRowParams) : void 0;
                    void 0 === e && (e = !0);
                    e && (c.rowID = a.isFunction(c.rowID) ? c.rowID.call(b,
                        c) : null != c.rowID ? c.rowID : a.jgrid.randId(), !0 === c.useDefValues && a(b.p.colModel).each(function () {
                        if (this.editoptions && this.editoptions.defaultValue) {
                            var e = this.editoptions.defaultValue, e = a.isFunction(e) ? e.call(b) : e;
                            c.initdata[this.name] = e
                        }
                    }), a(b).jqGrid("addRowData", c.rowID, c.initdata, c.position), c.rowID = b.p.idPrefix + c.rowID, a("#" + a.jgrid.jqID(c.rowID), "#" + a.jgrid.jqID(b.p.id)).addClass("jqgrid-new-row"), c.useFormatter ? a("#" + a.jgrid.jqID(c.rowID) + " .ui-inline-edit", "#" + a.jgrid.jqID(b.p.id)).click() :
                        (e = b.p.prmNames, c.addRowParams.extraparam[e.oper] = e.addoper, a(b).jqGrid("editRow", c.rowID, c.addRowParams), a(b).jqGrid("setSelection", c.rowID)))
                }
            })
        }, inlineNav: function (c, b) {
            b = a.extend(!0, {
                edit: !0,
                editicon: "ui-icon-pencil",
                add: !0,
                addicon: "ui-icon-plus",
                save: !0,
                saveicon: "ui-icon-disk",
                cancel: !0,
                cancelicon: "ui-icon-cancel",
                addParams: {addRowParams: {extraparam: {}}},
                editParams: {},
                restoreAfterSelect: !0
            }, a.jgrid.nav, b || {});
            return this.each(function () {
                if (this.grid) {
                    var e = this, n, h = a.jgrid.jqID(e.p.id);
                    e.p._inlinenav = !0;
                    if (!0 === b.addParams.useFormatter) {
                        var j = e.p.colModel, p;
                        for (p = 0; p < j.length; p++)if (j[p].formatter && "actions" === j[p].formatter) {
                            j[p].formatoptions && (j = a.extend({
                                keys: !1,
                                onEdit: null,
                                onSuccess: null,
                                afterSave: null,
                                onError: null,
                                afterRestore: null,
                                extraparam: {},
                                url: null
                            }, j[p].formatoptions), b.addParams.addRowParams = {
                                keys: j.keys,
                                oneditfunc: j.onEdit,
                                successfunc: j.onSuccess,
                                url: j.url,
                                extraparam: j.extraparam,
                                aftersavefunc: j.afterSave,
                                errorfunc: j.onError,
                                afterrestorefunc: j.afterRestore
                            });
                            break
                        }
                    }
                    b.add && a(e).jqGrid("navButtonAdd",
                        c, {
                            caption: b.addtext,
                            title: b.addtitle,
                            buttonicon: b.addicon,
                            id: e.p.id + "_iladd",
                            onClickButton: function () {
                                a(e).jqGrid("addRow", b.addParams);
                                b.addParams.useFormatter || (a("#" + h + "_ilsave").removeClass("ui-state-disabled"), a("#" + h + "_ilcancel").removeClass("ui-state-disabled"), a("#" + h + "_iladd").addClass("ui-state-disabled"), a("#" + h + "_iledit").addClass("ui-state-disabled"))
                            }
                        });
                    b.edit && a(e).jqGrid("navButtonAdd", c, {
                        caption: b.edittext,
                        title: b.edittitle,
                        buttonicon: b.editicon,
                        id: e.p.id + "_iledit",
                        onClickButton: function () {
                            var c =
                                a(e).jqGrid("getGridParam", "selrow");
                            c ? (a(e).jqGrid("editRow", c, b.editParams), a("#" + h + "_ilsave").removeClass("ui-state-disabled"), a("#" + h + "_ilcancel").removeClass("ui-state-disabled"), a("#" + h + "_iladd").addClass("ui-state-disabled"), a("#" + h + "_iledit").addClass("ui-state-disabled")) : (a.jgrid.viewModal("#alertmod", {
                                gbox: "#gbox_" + h,
                                jqm: !0
                            }), a("#jqg_alrt").focus())
                        }
                    });
                    b.save && (a(e).jqGrid("navButtonAdd", c, {
                        caption: b.savetext || "",
                        title: b.savetitle || "Save row",
                        buttonicon: b.saveicon,
                        id: e.p.id + "_ilsave",
                        onClickButton: function () {
                            var c =
                                e.p.savedRow[0].id;
                            if (c) {
                                var f = e.p.prmNames, k = f.oper, d = {};
                                a("#" + a.jgrid.jqID(c), "#" + h).hasClass("jqgrid-new-row") ? (b.addParams.addRowParams.extraparam[k] = f.addoper, d = b.addParams.addRowParams) : (b.editParams.extraparam || (b.editParams.extraparam = {}), b.editParams.extraparam[k] = f.editoper, d = b.editParams);
                                a(e).jqGrid("saveRow", c, d) && a(e).jqGrid("showAddEditButtons")
                            } else a.jgrid.viewModal("#alertmod", {gbox: "#gbox_" + h, jqm: !0}), a("#jqg_alrt").focus()
                        }
                    }), a("#" + h + "_ilsave").addClass("ui-state-disabled"));
                    b.cancel &&
                    (a(e).jqGrid("navButtonAdd", c, {
                        caption: b.canceltext || "",
                        title: b.canceltitle || "Cancel row editing",
                        buttonicon: b.cancelicon,
                        id: e.p.id + "_ilcancel",
                        onClickButton: function () {
                            var c = e.p.savedRow[0].id, f = {};
                            if (c) {
                                f = a("#" + a.jgrid.jqID(c), "#" + h).hasClass("jqgrid-new-row") ? b.addParams.addRowParams : b.editParams;
                                a(e).jqGrid("restoreRow", c, f);
                                a(e).jqGrid("showAddEditButtons")
                            } else {
                                a.jgrid.viewModal("#alertmod", {gbox: "#gbox_" + h, jqm: true});
                                a("#jqg_alrt").focus()
                            }
                        }
                    }), a("#" + h + "_ilcancel").addClass("ui-state-disabled"));
                    !0 === b.restoreAfterSelect && (n = a.isFunction(e.p.beforeSelectRow) ? e.p.beforeSelectRow : !1, e.p.beforeSelectRow = function (c, f) {
                        var h = true;
                        if (e.p.savedRow.length > 0 && e.p._inlinenav === true && c !== e.p.selrow && e.p.selrow !== null) {
                            e.p.selrow === b.addParams.rowID ? a(e).jqGrid("delRowData", e.p.selrow) : a(e).jqGrid("restoreRow", e.p.selrow, b.editParams);
                            a(e).jqGrid("showAddEditButtons")
                        }
                        n && (h = n.call(e, c, f));
                        return h
                    })
                }
            })
        }, showAddEditButtons: function () {
            return this.each(function () {
                if (this.grid) {
                    var c = a.jgrid.jqID(this.p.id);
                    a("#" + c + "_ilsave").addClass("ui-state-disabled");
                    a("#" + c + "_ilcancel").addClass("ui-state-disabled");
                    a("#" + c + "_iladd").removeClass("ui-state-disabled");
                    a("#" + c + "_iledit").removeClass("ui-state-disabled")
                }
            })
        }
    })
})(jQuery);
(function (b) {
    b.jgrid.extend({
        editCell: function (d, f, a) {
            return this.each(function () {
                var c = this, g, e, h, i;
                if (c.grid && !0 === c.p.cellEdit) {
                    f = parseInt(f, 10);
                    c.p.selrow = c.rows[d].id;
                    c.p.knv || b(c).jqGrid("GridNav");
                    if (0 < c.p.savedRow.length) {
                        if (!0 === a && d == c.p.iRow && f == c.p.iCol)return;
                        b(c).jqGrid("saveCell", c.p.savedRow[0].id, c.p.savedRow[0].ic)
                    } else window.setTimeout(function () {
                        b("#" + b.jgrid.jqID(c.p.knv)).attr("tabindex", "-1").focus()
                    }, 0);
                    i = c.p.colModel[f];
                    g = i.name;
                    if (!("subgrid" === g || "cb" === g || "rn" === g)) {
                        h =
                            b("td:eq(" + f + ")", c.rows[d]);
                        if (!0 === i.editable && !0 === a && !h.hasClass("not-editable-cell")) {
                            0 <= parseInt(c.p.iCol, 10) && 0 <= parseInt(c.p.iRow, 10) && (b("td:eq(" + c.p.iCol + ")", c.rows[c.p.iRow]).removeClass("edit-cell ui-state-highlight"), b(c.rows[c.p.iRow]).removeClass("selected-row ui-state-hover"));
                            b(h).addClass("edit-cell ui-state-highlight");
                            b(c.rows[d]).addClass("selected-row ui-state-hover");
                            try {
                                e = b.unformat.call(c, h, {rowId: c.rows[d].id, colModel: i}, f)
                            } catch (k) {
                                e = i.edittype && "textarea" === i.edittype ? b(h).text() :
                                    b(h).html()
                            }
                            c.p.autoencode && (e = b.jgrid.htmlDecode(e));
                            i.edittype || (i.edittype = "text");
                            c.p.savedRow.push({id: d, ic: f, name: g, v: e});
                            if ("&nbsp;" === e || "&#160;" === e || 1 === e.length && 160 === e.charCodeAt(0))e = "";
                            if (b.isFunction(c.p.formatCell)) {
                                var j = c.p.formatCell.call(c, c.rows[d].id, g, e, d, f);
                                void 0 !== j && (e = j)
                            }
                            b(c).triggerHandler("jqGridBeforeEditCell", [c.rows[d].id, g, e, d, f]);
                            b.isFunction(c.p.beforeEditCell) && c.p.beforeEditCell.call(c, c.rows[d].id, g, e, d, f);
                            var j = b.extend({}, i.editoptions || {}, {id: d + "_" + g, name: g}),
                                n = b.jgrid.createEl.call(c, i.edittype, j, e, !0, b.extend({}, b.jgrid.ajaxOptions, c.p.ajaxSelectOptions || {}));
                            b(h).html("").append(n).attr("tabindex", "0");
                            b.jgrid.bindEv.call(c, n, j);
                            window.setTimeout(function () {
                                b(n).focus()
                            }, 0);
                            b("input, select, textarea", h).bind("keydown", function (a) {
                                a.keyCode === 27 && (b("input.hasDatepicker", h).length > 0 ? b(".ui-datepicker").is(":hidden") ? b(c).jqGrid("restoreCell", d, f) : b("input.hasDatepicker", h).datepicker("hide") : b(c).jqGrid("restoreCell", d, f));
                                if (a.keyCode === 13) {
                                    b(c).jqGrid("saveCell",
                                        d, f);
                                    return false
                                }
                                if (a.keyCode === 9) {
                                    if (c.grid.hDiv.loading)return false;
                                    a.shiftKey ? b(c).jqGrid("prevCell", d, f) : b(c).jqGrid("nextCell", d, f)
                                }
                                a.stopPropagation()
                            });
                            b(c).triggerHandler("jqGridAfterEditCell", [c.rows[d].id, g, e, d, f]);
                            b.isFunction(c.p.afterEditCell) && c.p.afterEditCell.call(c, c.rows[d].id, g, e, d, f)
                        } else 0 <= parseInt(c.p.iCol, 10) && 0 <= parseInt(c.p.iRow, 10) && (b("td:eq(" + c.p.iCol + ")", c.rows[c.p.iRow]).removeClass("edit-cell ui-state-highlight"), b(c.rows[c.p.iRow]).removeClass("selected-row ui-state-hover")),
                            h.addClass("edit-cell ui-state-highlight"), b(c.rows[d]).addClass("selected-row ui-state-hover"), e = h.html().replace(/\&#160\;/ig, ""), b(c).triggerHandler("jqGridSelectCell", [c.rows[d].id, g, e, d, f]), b.isFunction(c.p.onSelectCell) && c.p.onSelectCell.call(c, c.rows[d].id, g, e, d, f);
                        c.p.iCol = f;
                        c.p.iRow = d
                    }
                }
            })
        }, saveCell: function (d, f) {
            return this.each(function () {
                var a = this, c;
                if (a.grid && !0 === a.p.cellEdit) {
                    c = 1 <= a.p.savedRow.length ? 0 : null;
                    if (null !== c) {
                        var g = b("td:eq(" + f + ")", a.rows[d]), e, h, i = a.p.colModel[f], k = i.name,
                            j = b.jgrid.jqID(k);
                        switch (i.edittype) {
                            case "select":
                                if (i.editoptions.multiple) {
                                    var j = b("#" + d + "_" + j, a.rows[d]), n = [];
                                    (e = b(j).val()) ? e.join(",") : e = "";
                                    b("option:selected", j).each(function (a, c) {
                                        n[a] = b(c).text()
                                    });
                                    h = n.join(",")
                                } else e = b("#" + d + "_" + j + " option:selected", a.rows[d]).val(), h = b("#" + d + "_" + j + " option:selected", a.rows[d]).text();
                                i.formatter && (h = e);
                                break;
                            case "checkbox":
                                var l = ["Yes", "No"];
                                i.editoptions && (l = i.editoptions.value.split(":"));
                                h = e = b("#" + d + "_" + j, a.rows[d]).is(":checked") ? l[0] : l[1];
                                break;
                            case "password":
                            case "text":
                            case "textarea":
                            case "button":
                                h = e = b("#" + d + "_" + j, a.rows[d]).val();
                                break;
                            case "custom":
                                try {
                                    if (i.editoptions && b.isFunction(i.editoptions.custom_value)) {
                                        e = i.editoptions.custom_value.call(a, b(".customelement", g), "get");
                                        if (void 0 === e)throw"e2";
                                        h = e
                                    } else throw"e1";
                                } catch (o) {
                                    "e1" === o && b.jgrid.info_dialog(b.jgrid.errors.errcap, "function 'custom_value' " + b.jgrid.edit.msg.nodefined, b.jgrid.edit.bClose), "e2" === o ? b.jgrid.info_dialog(b.jgrid.errors.errcap, "function 'custom_value' " + b.jgrid.edit.msg.novalue,
                                        b.jgrid.edit.bClose) : b.jgrid.info_dialog(b.jgrid.errors.errcap, o.message, b.jgrid.edit.bClose)
                                }
                        }
                        if (h !== a.p.savedRow[c].v) {
                            if (c = b(a).triggerHandler("jqGridBeforeSaveCell", [a.rows[d].id, k, e, d, f]))h = e = c;
                            if (b.isFunction(a.p.beforeSaveCell) && (c = a.p.beforeSaveCell.call(a, a.rows[d].id, k, e, d, f)))h = e = c;
                            var p = b.jgrid.checkValues.call(a, e, f);
                            if (!0 === p[0]) {
                                c = b(a).triggerHandler("jqGridBeforeSubmitCell", [a.rows[d].id, k, e, d, f]) || {};
                                b.isFunction(a.p.beforeSubmitCell) && ((c = a.p.beforeSubmitCell.call(a, a.rows[d].id,
                                    k, e, d, f)) || (c = {}));
                                0 < b("input.hasDatepicker", g).length && b("input.hasDatepicker", g).datepicker("hide");
                                if ("remote" === a.p.cellsubmit)if (a.p.cellurl) {
                                    var m = {};
                                    a.p.autoencode && (e = b.jgrid.htmlEncode(e));
                                    m[k] = e;
                                    l = a.p.prmNames;
                                    i = l.id;
                                    j = l.oper;
                                    m[i] = b.jgrid.stripPref(a.p.idPrefix, a.rows[d].id);
                                    m[j] = l.editoper;
                                    m = b.extend(c, m);
                                    b("#lui_" + b.jgrid.jqID(a.p.id)).show();
                                    a.grid.hDiv.loading = !0;
                                    b.ajax(b.extend({
                                        url: a.p.cellurl,
                                        data: b.isFunction(a.p.serializeCellData) ? a.p.serializeCellData.call(a, m) : m,
                                        type: "POST",
                                        complete: function (c,
                                                            i) {
                                            b("#lui_" + a.p.id).hide();
                                            a.grid.hDiv.loading = false;
                                            if (i === "success") {
                                                var j = b(a).triggerHandler("jqGridAfterSubmitCell", [a, c, m.id, k, e, d, f]) || [true, ""];
                                                j[0] === true && b.isFunction(a.p.afterSubmitCell) && (j = a.p.afterSubmitCell.call(a, c, m.id, k, e, d, f));
                                                if (j[0] === true) {
                                                    b(g).empty();
                                                    b(a).jqGrid("setCell", a.rows[d].id, f, h, false, false, true);
                                                    b(g).addClass("dirty-cell");
                                                    b(a.rows[d]).addClass("edited");
                                                    b(a).triggerHandler("jqGridAfterSaveCell", [a.rows[d].id, k, e, d, f]);
                                                    b.isFunction(a.p.afterSaveCell) && a.p.afterSaveCell.call(a,
                                                        a.rows[d].id, k, e, d, f);
                                                    a.p.savedRow.splice(0, 1)
                                                } else {
                                                    b.jgrid.info_dialog(b.jgrid.errors.errcap, j[1], b.jgrid.edit.bClose);
                                                    b(a).jqGrid("restoreCell", d, f)
                                                }
                                            }
                                        },
                                        error: function (c, e, h) {
                                            b("#lui_" + b.jgrid.jqID(a.p.id)).hide();
                                            a.grid.hDiv.loading = false;
                                            b(a).triggerHandler("jqGridErrorCell", [c, e, h]);
                                            b.isFunction(a.p.errorCell) ? a.p.errorCell.call(a, c, e, h) : b.jgrid.info_dialog(b.jgrid.errors.errcap, c.status + " : " + c.statusText + "<br/>" + e, b.jgrid.edit.bClose);
                                            b(a).jqGrid("restoreCell", d, f)
                                        }
                                    }, b.jgrid.ajaxOptions, a.p.ajaxCellOptions ||
                                        {}))
                                } else try {
                                    b.jgrid.info_dialog(b.jgrid.errors.errcap, b.jgrid.errors.nourl, b.jgrid.edit.bClose), b(a).jqGrid("restoreCell", d, f)
                                } catch (q) {
                                }
                                "clientArray" === a.p.cellsubmit && (b(g).empty(), b(a).jqGrid("setCell", a.rows[d].id, f, h, !1, !1, !0), b(g).addClass("dirty-cell"), b(a.rows[d]).addClass("edited"), b(a).triggerHandler("jqGridAfterSaveCell", [a.rows[d].id, k, e, d, f]), b.isFunction(a.p.afterSaveCell) && a.p.afterSaveCell.call(a, a.rows[d].id, k, e, d, f), a.p.savedRow.splice(0, 1))
                            } else try {
                                window.setTimeout(function () {
                                    b.jgrid.info_dialog(b.jgrid.errors.errcap,
                                        e + " " + p[1], b.jgrid.edit.bClose)
                                }, 100), b(a).jqGrid("restoreCell", d, f)
                            } catch (r) {
                            }
                        } else b(a).jqGrid("restoreCell", d, f)
                    }
                    window.setTimeout(function () {
                        b("#" + b.jgrid.jqID(a.p.knv)).attr("tabindex", "-1").focus()
                    }, 0)
                }
            })
        }, restoreCell: function (d, f) {
            return this.each(function () {
                var a = this, c;
                if (a.grid && !0 === a.p.cellEdit) {
                    c = 1 <= a.p.savedRow.length ? 0 : null;
                    if (null !== c) {
                        var g = b("td:eq(" + f + ")", a.rows[d]);
                        if (b.isFunction(b.fn.datepicker))try {
                            b("input.hasDatepicker", g).datepicker("hide")
                        } catch (e) {
                        }
                        b(g).empty().attr("tabindex",
                            "-1");
                        b(a).jqGrid("setCell", a.rows[d].id, f, a.p.savedRow[c].v, !1, !1, !0);
                        b(a).triggerHandler("jqGridAfterRestoreCell", [a.rows[d].id, a.p.savedRow[c].v, d, f]);
                        b.isFunction(a.p.afterRestoreCell) && a.p.afterRestoreCell.call(a, a.rows[d].id, a.p.savedRow[c].v, d, f);
                        a.p.savedRow.splice(0, 1)
                    }
                    window.setTimeout(function () {
                        b("#" + a.p.knv).attr("tabindex", "-1").focus()
                    }, 0)
                }
            })
        }, nextCell: function (d, f) {
            return this.each(function () {
                var a = !1, c;
                if (this.grid && !0 === this.p.cellEdit) {
                    for (c = f + 1; c < this.p.colModel.length; c++)if (!0 ===
                        this.p.colModel[c].editable) {
                        a = c;
                        break
                    }
                    !1 !== a ? b(this).jqGrid("editCell", d, a, !0) : 0 < this.p.savedRow.length && b(this).jqGrid("saveCell", d, f)
                }
            })
        }, prevCell: function (d, f) {
            return this.each(function () {
                var a = !1, c;
                if (this.grid && !0 === this.p.cellEdit) {
                    for (c = f - 1; 0 <= c; c--)if (!0 === this.p.colModel[c].editable) {
                        a = c;
                        break
                    }
                    !1 !== a ? b(this).jqGrid("editCell", d, a, !0) : 0 < this.p.savedRow.length && b(this).jqGrid("saveCell", d, f)
                }
            })
        }, GridNav: function () {
            return this.each(function () {
                function d(c, d, e) {
                    if ("v" === e.substr(0, 1)) {
                        var f =
                            b(a.grid.bDiv)[0].clientHeight, g = b(a.grid.bDiv)[0].scrollTop, l = a.rows[c].offsetTop + a.rows[c].clientHeight, o = a.rows[c].offsetTop;
                        "vd" === e && l >= f && (b(a.grid.bDiv)[0].scrollTop = b(a.grid.bDiv)[0].scrollTop + a.rows[c].clientHeight);
                        "vu" === e && o < g && (b(a.grid.bDiv)[0].scrollTop = b(a.grid.bDiv)[0].scrollTop - a.rows[c].clientHeight)
                    }
                    "h" === e && (e = b(a.grid.bDiv)[0].clientWidth, f = b(a.grid.bDiv)[0].scrollLeft, g = a.rows[c].cells[d].offsetLeft, a.rows[c].cells[d].offsetLeft + a.rows[c].cells[d].clientWidth >= e + parseInt(f,
                        10) ? b(a.grid.bDiv)[0].scrollLeft = b(a.grid.bDiv)[0].scrollLeft + a.rows[c].cells[d].clientWidth : g < f && (b(a.grid.bDiv)[0].scrollLeft = b(a.grid.bDiv)[0].scrollLeft - a.rows[c].cells[d].clientWidth))
                }

                function f(b, c) {
                    var d, e;
                    if ("lft" === c) {
                        d = b + 1;
                        for (e = b; 0 <= e; e--)if (!0 !== a.p.colModel[e].hidden) {
                            d = e;
                            break
                        }
                    }
                    if ("rgt" === c) {
                        d = b - 1;
                        for (e = b; e < a.p.colModel.length; e++)if (!0 !== a.p.colModel[e].hidden) {
                            d = e;
                            break
                        }
                    }
                    return d
                }

                var a = this;
                if (a.grid && !0 === a.p.cellEdit) {
                    a.p.knv = a.p.id + "_kn";
                    var c = b("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='" +
                        a.p.knv + "'></div></div>"), g, e;
                    b(c).insertBefore(a.grid.cDiv);
                    b("#" + a.p.knv).focus().keydown(function (c) {
                        e = c.keyCode;
                        "rtl" === a.p.direction && (37 === e ? e = 39 : 39 === e && (e = 37));
                        switch (e) {
                            case 38:
                                0 < a.p.iRow - 1 && (d(a.p.iRow - 1, a.p.iCol, "vu"), b(a).jqGrid("editCell", a.p.iRow - 1, a.p.iCol, !1));
                                break;
                            case 40:
                                a.p.iRow + 1 <= a.rows.length - 1 && (d(a.p.iRow + 1, a.p.iCol, "vd"), b(a).jqGrid("editCell", a.p.iRow + 1, a.p.iCol, !1));
                                break;
                            case 37:
                                0 <= a.p.iCol - 1 && (g = f(a.p.iCol - 1, "lft"), d(a.p.iRow, g, "h"), b(a).jqGrid("editCell", a.p.iRow, g,
                                    !1));
                                break;
                            case 39:
                                a.p.iCol + 1 <= a.p.colModel.length - 1 && (g = f(a.p.iCol + 1, "rgt"), d(a.p.iRow, g, "h"), b(a).jqGrid("editCell", a.p.iRow, g, !1));
                                break;
                            case 13:
                                0 <= parseInt(a.p.iCol, 10) && 0 <= parseInt(a.p.iRow, 10) && b(a).jqGrid("editCell", a.p.iRow, a.p.iCol, !0);
                                break;
                            default:
                                return !0
                        }
                        return !1
                    })
                }
            })
        }, getChangedCells: function (d) {
            var f = [];
            d || (d = "all");
            this.each(function () {
                var a = this, c;
                a.grid && !0 === a.p.cellEdit && b(a.rows).each(function (g) {
                    var e = {};
                    b(this).hasClass("edited") && (b("td", this).each(function (f) {
                        c = a.p.colModel[f].name;
                        if ("cb" !== c && "subgrid" !== c)if ("dirty" === d) {
                            if (b(this).hasClass("dirty-cell"))try {
                                e[c] = b.unformat.call(a, this, {rowId: a.rows[g].id, colModel: a.p.colModel[f]}, f)
                            } catch (i) {
                                e[c] = b.jgrid.htmlDecode(b(this).html())
                            }
                        } else try {
                            e[c] = b.unformat.call(a, this, {rowId: a.rows[g].id, colModel: a.p.colModel[f]}, f)
                        } catch (k) {
                            e[c] = b.jgrid.htmlDecode(b(this).html())
                        }
                    }), e.id = this.id, f.push(e))
                })
            });
            return f
        }
    })
})(jQuery);
(function (c) {
    c.fn.jqm = function (a) {
        var i = {
            overlay: 50,
            closeoverlay: !0,
            overlayClass: "jqmOverlay",
            closeClass: "jqmClose",
            trigger: ".jqModal",
            ajax: d,
            ajaxText: "",
            target: d,
            modal: d,
            toTop: d,
            onShow: d,
            onHide: d,
            onLoad: d
        };
        return this.each(function () {
            if (this._jqm)return j[this._jqm].c = c.extend({}, j[this._jqm].c, a);
            l++;
            this._jqm = l;
            j[l] = {c: c.extend(i, c.jqm.params, a), a: d, w: c(this).addClass("jqmID" + l), s: l};
            i.trigger && c(this).jqmAddTrigger(i.trigger)
        })
    };
    c.fn.jqmAddClose = function (a) {
        return o(this, a, "jqmHide")
    };
    c.fn.jqmAddTrigger =
        function (a) {
            return o(this, a, "jqmShow")
        };
    c.fn.jqmShow = function (a) {
        return this.each(function () {
            c.jqm.open(this._jqm, a)
        })
    };
    c.fn.jqmHide = function (a) {
        return this.each(function () {
            c.jqm.close(this._jqm, a)
        })
    };
    c.jqm = {
        hash: {}, open: function (a, i) {
            var b = j[a], e = b.c, h = "." + e.closeClass, f = parseInt(b.w.css("z-index")), f = 0 < f ? f : 3E3, g = c("<div></div>").css({
                height: "100%",
                width: "100%",
                position: "fixed",
                left: 0,
                top: 0,
                "z-index": f - 1,
                opacity: e.overlay / 100
            });
            if (b.a)return d;
            b.t = i;
            b.a = !0;
            b.w.css("z-index", f);
            e.modal ? (k[0] || setTimeout(function () {
                    p("bind")
                },
                1), k.push(a)) : 0 < e.overlay ? e.closeoverlay && b.w.jqmAddClose(g) : g = d;
            b.o = g ? g.addClass(e.overlayClass).prependTo("body") : d;
            e.ajax ? (f = e.target || b.w, g = e.ajax, f = "string" == typeof f ? c(f, b.w) : c(f), g = "@" == g.substr(0, 1) ? c(i).attr(g.substring(1)) : g, f.html(e.ajaxText).load(g, function () {
                e.onLoad && e.onLoad.call(this, b);
                h && b.w.jqmAddClose(c(h, b.w));
                m(b)
            })) : h && b.w.jqmAddClose(c(h, b.w));
            e.toTop && b.o && b.w.before('<span id="jqmP' + b.w[0]._jqm + '"></span>').insertAfter(b.o);
            e.onShow ? e.onShow(b) : b.w.show();
            m(b);
            return d
        },
        close: function (a) {
            a = j[a];
            if (!a.a)return d;
            a.a = d;
            k[0] && (k.pop(), k[0] || p("unbind"));
            a.c.toTop && a.o && c("#jqmP" + a.w[0]._jqm).after(a.w).remove();
            if (a.c.onHide)a.c.onHide(a); else a.w.hide(), a.o && a.o.remove();
            return d
        }, params: {}
    };
    var l = 0, j = c.jqm.hash, k = [], d = !1, m = function (a) {
        try {
            c(":input:visible", a.w)[0].focus()
        } catch (d) {
        }
    }, p = function (a) {
        c(document)[a]("keypress", n)[a]("keydown", n)[a]("mousedown", n)
    }, n = function (a) {
        var d = j[k[k.length - 1]], b = !c(a.target).parents(".jqmID" + d.s)[0];
        b && (c(".jqmID" + d.s).each(function () {
            var d =
                c(this), h = d.offset();
            if (h.top <= a.pageY && a.pageY <= h.top + d.height() && h.left <= a.pageX && a.pageX <= h.left + d.width())return b = !1
        }), m(d));
        return !b
    }, o = function (a, i, b) {
        return a.each(function () {
            var a = this._jqm;
            c(i).each(function () {
                this[b] || (this[b] = [], c(this).click(function () {
                    for (var a in{
                        jqmShow: 1,
                        jqmHide: 1
                    })for (var b in this[a])if (j[this[a][b]])j[this[a][b]].w[a](this);
                    return d
                }));
                this[b].push(a)
            })
        })
    }
})(jQuery);
(function (b) {
    b.fn.jqDrag = function (a) {
        return h(this, a, "d")
    };
    b.fn.jqResize = function (a, b) {
        return h(this, a, "r", b)
    };
    b.jqDnR = {
        dnr: {}, e: 0, drag: function (a) {
            "d" == d.k ? e.css({
                left: d.X + a.pageX - d.pX,
                top: d.Y + a.pageY - d.pY
            }) : (e.css({
                width: Math.max(a.pageX - d.pX + d.W, 0),
                height: Math.max(a.pageY - d.pY + d.H, 0)
            }), f && g.css({width: Math.max(a.pageX - f.pX + f.W, 0), height: Math.max(a.pageY - f.pY + f.H, 0)}));
            return !1
        }, stop: function () {
            b(document).unbind("mousemove", c.drag).unbind("mouseup", c.stop)
        }
    };
    var c = b.jqDnR, d = c.dnr, e = c.e, g, f, h = function (a,
                                                             c, h, l) {
        return a.each(function () {
            c = c ? b(c, a) : a;
            c.bind("mousedown", {e: a, k: h}, function (a) {
                var c = a.data, i = {};
                e = c.e;
                g = l ? b(l) : !1;
                if ("relative" != e.css("position"))try {
                    e.position(i)
                } catch (h) {
                }
                d = {
                    X: i.left || j("left") || 0,
                    Y: i.top || j("top") || 0,
                    W: j("width") || e[0].scrollWidth || 0,
                    H: j("height") || e[0].scrollHeight || 0,
                    pX: a.pageX,
                    pY: a.pageY,
                    k: c.k
                };
                f = g && "d" != c.k ? {
                    X: i.left || k("left") || 0,
                    Y: i.top || k("top") || 0,
                    W: g[0].offsetWidth || k("width") || 0,
                    H: g[0].offsetHeight || k("height") || 0,
                    pX: a.pageX,
                    pY: a.pageY,
                    k: c.k
                } : !1;
                if (b("input.hasDatepicker",
                        e[0])[0])try {
                    b("input.hasDatepicker", e[0]).datepicker("hide")
                } catch (m) {
                }
                b(document).mousemove(b.jqDnR.drag).mouseup(b.jqDnR.stop);
                return !1
            })
        })
    }, j = function (a) {
        return parseInt(e.css(a), 10) || !1
    }, k = function (a) {
        return parseInt(g.css(a), 10) || !1
    }
})(jQuery);
(function (b) {
    b.jgrid.extend({
        setSubGrid: function () {
            return this.each(function () {
                var d, c;
                this.p.subGridOptions = b.extend({
                    plusicon: "ui-icon-plus",
                    minusicon: "ui-icon-minus",
                    openicon: "ui-icon-carat-1-sw",
                    expandOnLoad: !1,
                    delayOnLoad: 50,
                    selectOnExpand: !1,
                    selectOnCollapse: !1,
                    reloadOnExpand: !0
                }, this.p.subGridOptions || {});
                this.p.colNames.unshift("");
                this.p.colModel.unshift({
                    name: "subgrid",
                    width: b.jgrid.cell_width ? this.p.subGridWidth + this.p.cellLayout : this.p.subGridWidth,
                    sortable: !1,
                    resizable: !1,
                    hidedlg: !0,
                    search: !1,
                    fixed: !0
                });
                d = this.p.subGridModel;
                if (d[0]) {
                    d[0].align = b.extend([], d[0].align || []);
                    for (c = 0; c < d[0].name.length; c++)d[0].align[c] = d[0].align[c] || "left"
                }
            })
        }, addSubGridCell: function (b, c) {
            var a = "", m, l;
            this.each(function () {
                a = this.formatCol(b, c);
                l = this.p.id;
                m = this.p.subGridOptions.plusicon
            });
            return '<td role="gridcell" aria-describedby="' + l + '_subgrid" class="ui-sgcollapsed sgcollapsed" ' + a + "><a style='cursor:pointer;'><span class='ui-icon " + m + "'></span></a></td>"
        }, addSubGrid: function (d, c) {
            return this.each(function () {
                var a =
                    this;
                if (a.grid) {
                    var m = function (c, d, h) {
                        d = b("<td align='" + a.p.subGridModel[0].align[h] + "'></td>").html(d);
                        b(c).append(d)
                    }, l = function (c, d) {
                        var h, f, e, g = b("<table cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"), i = b("<tr></tr>");
                        for (f = 0; f < a.p.subGridModel[0].name.length; f++)h = b("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-" + a.p.direction + "'></th>"), b(h).html(a.p.subGridModel[0].name[f]), b(h).width(a.p.subGridModel[0].width[f]), b(i).append(h);
                        b(g).append(i);
                        c && (e = a.p.xmlReader.subgrid,
                            b(e.root + " " + e.row, c).each(function () {
                                i = b("<tr class='ui-widget-content ui-subtblcell'></tr>");
                                if (!0 === e.repeatitems)b(e.cell, this).each(function (a) {
                                    m(i, b(this).text() || "&#160;", a)
                                }); else {
                                    var c = a.p.subGridModel[0].mapping || a.p.subGridModel[0].name;
                                    if (c)for (f = 0; f < c.length; f++)m(i, b(c[f], this).text() || "&#160;", f)
                                }
                                b(g).append(i)
                            }));
                        h = b("table:first", a.grid.bDiv).attr("id") + "_";
                        b("#" + b.jgrid.jqID(h + d)).append(g);
                        a.grid.hDiv.loading = !1;
                        b("#load_" + b.jgrid.jqID(a.p.id)).hide();
                        return !1
                    }, o = function (c, d) {
                        var h,
                            f, e, g, i, k = b("<table cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"), j = b("<tr></tr>");
                        for (f = 0; f < a.p.subGridModel[0].name.length; f++)h = b("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-" + a.p.direction + "'></th>"), b(h).html(a.p.subGridModel[0].name[f]), b(h).width(a.p.subGridModel[0].width[f]), b(j).append(h);
                        b(k).append(j);
                        if (c && (g = a.p.jsonReader.subgrid, h = b.jgrid.getAccessor(c, g.root), void 0 !== h))for (f = 0; f < h.length; f++) {
                            e = h[f];
                            j = b("<tr class='ui-widget-content ui-subtblcell'></tr>");
                            if (!0 === g.repeatitems) {
                                g.cell && (e = e[g.cell]);
                                for (i = 0; i < e.length; i++)m(j, e[i] || "&#160;", i)
                            } else {
                                var l = a.p.subGridModel[0].mapping || a.p.subGridModel[0].name;
                                if (l.length)for (i = 0; i < l.length; i++)m(j, e[l[i]] || "&#160;", i)
                            }
                            b(k).append(j)
                        }
                        f = b("table:first", a.grid.bDiv).attr("id") + "_";
                        b("#" + b.jgrid.jqID(f + d)).append(k);
                        a.grid.hDiv.loading = !1;
                        b("#load_" + b.jgrid.jqID(a.p.id)).hide();
                        return !1
                    }, s = function (c) {
                        var e, d, f, g;
                        e = b(c).attr("id");
                        d = {nd_: (new Date).getTime()};
                        d[a.p.prmNames.subgridid] = e;
                        if (!a.p.subGridModel[0])return !1;
                        if (a.p.subGridModel[0].params)for (g = 0; g < a.p.subGridModel[0].params.length; g++)for (f = 0; f < a.p.colModel.length; f++)a.p.colModel[f].name === a.p.subGridModel[0].params[g] && (d[a.p.colModel[f].name] = b("td:eq(" + f + ")", c).text().replace(/\&#160\;/ig, ""));
                        if (!a.grid.hDiv.loading)switch (a.grid.hDiv.loading = !0, b("#load_" + b.jgrid.jqID(a.p.id)).show(), a.p.subgridtype || (a.p.subgridtype = a.p.datatype), b.isFunction(a.p.subgridtype) ? a.p.subgridtype.call(a, d) : a.p.subgridtype = a.p.subgridtype.toLowerCase(), a.p.subgridtype) {
                            case "xml":
                            case "json":
                                b.ajax(b.extend({
                                    type: a.p.mtype,
                                    url: a.p.subGridUrl,
                                    dataType: a.p.subgridtype,
                                    data: b.isFunction(a.p.serializeSubGridData) ? a.p.serializeSubGridData.call(a, d) : d,
                                    complete: function (c) {
                                        a.p.subgridtype === "xml" ? l(c.responseXML, e) : o(b.jgrid.parse(c.responseText), e)
                                    }
                                }, b.jgrid.ajaxOptions, a.p.ajaxSubgridOptions || {}))
                        }
                        return !1
                    }, e, k, p, q = 0, g, j;
                    b.each(a.p.colModel, function () {
                        (!0 === this.hidden || "rn" === this.name || "cb" === this.name) && q++
                    });
                    var r = a.rows.length, n = 1;
                    void 0 !== c && 0 < c && (n = c, r = c + 1);
                    for (; n < r;)b(a.rows[n]).hasClass("jqgrow") && b(a.rows[n].cells[d]).bind("click",
                        function () {
                            var c = b(this).parent("tr")[0];
                            j = c.nextSibling;
                            if (b(this).hasClass("sgcollapsed")) {
                                k = a.p.id;
                                e = c.id;
                                if (a.p.subGridOptions.reloadOnExpand === true || a.p.subGridOptions.reloadOnExpand === false && !b(j).hasClass("ui-subgrid")) {
                                    p = d >= 1 ? "<td colspan='" + d + "'>&#160;</td>" : "";
                                    g = b(a).triggerHandler("jqGridSubGridBeforeExpand", [k + "_" + e, e]);
                                    (g = g === false || g === "stop" ? false : true) && b.isFunction(a.p.subGridBeforeExpand) && (g = a.p.subGridBeforeExpand.call(a, k + "_" + e, e));
                                    if (g === false)return false;
                                    b(c).after("<tr role='row' class='ui-subgrid'>" +
                                        p + "<td class='ui-widget-content subgrid-cell'><span class='ui-icon " + a.p.subGridOptions.openicon + "'></span></td><td colspan='" + parseInt(a.p.colNames.length - 1 - q, 10) + "' class='ui-widget-content subgrid-data'><div id=" + k + "_" + e + " class='tablediv'></div></td></tr>");
                                    b(a).triggerHandler("jqGridSubGridRowExpanded", [k + "_" + e, e]);
                                    b.isFunction(a.p.subGridRowExpanded) ? a.p.subGridRowExpanded.call(a, k + "_" + e, e) : s(c)
                                } else b(j).show();
                                b(this).html("<a style='cursor:pointer;'><span class='ui-icon " + a.p.subGridOptions.minusicon +
                                    "'></span></a>").removeClass("sgcollapsed").addClass("sgexpanded");
                                a.p.subGridOptions.selectOnExpand && b(a).jqGrid("setSelection", e)
                            } else if (b(this).hasClass("sgexpanded")) {
                                g = b(a).triggerHandler("jqGridSubGridRowColapsed", [k + "_" + e, e]);
                                g = g === false || g === "stop" ? false : true;
                                e = c.id;
                                g && b.isFunction(a.p.subGridRowColapsed) && (g = a.p.subGridRowColapsed.call(a, k + "_" + e, e));
                                if (g === false)return false;
                                a.p.subGridOptions.reloadOnExpand === true ? b(j).remove(".ui-subgrid") : b(j).hasClass("ui-subgrid") && b(j).hide();
                                b(this).html("<a style='cursor:pointer;'><span class='ui-icon " +
                                    a.p.subGridOptions.plusicon + "'></span></a>").removeClass("sgexpanded").addClass("sgcollapsed");
                                a.p.subGridOptions.selectOnCollapse && b(a).jqGrid("setSelection", e)
                            }
                            return false
                        }), n++;
                    !0 === a.p.subGridOptions.expandOnLoad && b(a.rows).filter(".jqgrow").each(function (a, c) {
                        b(c.cells[0]).click()
                    });
                    a.subGridXml = function (a, b) {
                        l(a, b)
                    };
                    a.subGridJson = function (a, b) {
                        o(a, b)
                    }
                }
            })
        }, expandSubGridRow: function (d) {
            return this.each(function () {
                if ((this.grid || d) && !0 === this.p.subGrid) {
                    var c = b(this).jqGrid("getInd", d, !0);
                    c &&
                    (c = b("td.sgcollapsed", c)[0]) && b(c).trigger("click")
                }
            })
        }, collapseSubGridRow: function (d) {
            return this.each(function () {
                if ((this.grid || d) && !0 === this.p.subGrid) {
                    var c = b(this).jqGrid("getInd", d, !0);
                    c && (c = b("td.sgexpanded", c)[0]) && b(c).trigger("click")
                }
            })
        }, toggleSubGridRow: function (d) {
            return this.each(function () {
                if ((this.grid || d) && !0 === this.p.subGrid) {
                    var c = b(this).jqGrid("getInd", d, !0);
                    if (c) {
                        var a = b("td.sgcollapsed", c)[0];
                        a ? b(a).trigger("click") : (a = b("td.sgexpanded", c)[0]) && b(a).trigger("click")
                    }
                }
            })
        }
    })
})(jQuery);
(function (e) {
    e.extend(e.jgrid, {
        template: function (b) {
            var g = e.makeArray(arguments).slice(1), f, a = g.length;
            null == b && (b = "");
            return b.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function (b, h) {
                if (!isNaN(parseInt(h, 10)))return g[parseInt(h, 10)];
                for (f = 0; f < a; f++)if (e.isArray(g[f]))for (var c = g[f], l = c.length; l--;)if (h === c[l].nm)return c[l].v
            })
        }
    });
    e.jgrid.extend({
        groupingSetup: function () {
            return this.each(function () {
                var b, g, f = this.p.colModel, a = this.p.groupingView;
                if (null !== a && ("object" === typeof a ||
                    e.isFunction(a)))if (a.groupField.length) {
                    void 0 === a.visibiltyOnNextGrouping && (a.visibiltyOnNextGrouping = []);
                    a.lastvalues = [];
                    a.groups = [];
                    a.counters = [];
                    for (b = 0; b < a.groupField.length; b++)a.groupOrder[b] || (a.groupOrder[b] = "asc"), a.groupText[b] || (a.groupText[b] = "{0}"), "boolean" !== typeof a.groupColumnShow[b] && (a.groupColumnShow[b] = !0), "boolean" !== typeof a.groupSummary[b] && (a.groupSummary[b] = !1), !0 === a.groupColumnShow[b] ? (a.visibiltyOnNextGrouping[b] = !0, e(this).jqGrid("showCol", a.groupField[b])) : (a.visibiltyOnNextGrouping[b] =
                        e("#" + e.jgrid.jqID(this.p.id + "_" + a.groupField[b])).is(":visible"), e(this).jqGrid("hideCol", a.groupField[b]));
                    a.summary = [];
                    b = 0;
                    for (g = f.length; b < g; b++)f[b].summaryType && (f[b].summaryDivider ? a.summary.push({
                        nm: f[b].name,
                        st: f[b].summaryType,
                        v: "",
                        sd: f[b].summaryDivider,
                        vd: "",
                        sr: f[b].summaryRound,
                        srt: f[b].summaryRoundType || "round"
                    }) : a.summary.push({
                        nm: f[b].name,
                        st: f[b].summaryType,
                        v: "",
                        sr: f[b].summaryRound,
                        srt: f[b].summaryRoundType || "round"
                    }))
                } else this.p.grouping = !1; else this.p.grouping = !1
            })
        }, groupingPrepare: function (b,
                                      g, f, a) {
            this.each(function () {
                var d = this.p.groupingView, h = this, c, l = d.groupField.length, m, i, k, q = 0;
                for (c = 0; c < l; c++)m = d.groupField[c], k = d.displayField[c], i = f[m], k = null == k ? null : f[k], null == k && (k = i), void 0 !== i && (0 === a ? (d.groups.push({
                    idx: c,
                    dataIndex: m,
                    value: i,
                    displayValue: k,
                    startRow: a,
                    cnt: 1,
                    summary: []
                }), d.lastvalues[c] = i, d.counters[c] = {
                    cnt: 1,
                    pos: d.groups.length - 1,
                    summary: e.extend(!0, [], d.summary)
                }) : "object" !== typeof i && (e.isArray(d.isInTheSameGroup) && e.isFunction(d.isInTheSameGroup[c]) ? !d.isInTheSameGroup[c].call(h,
                    d.lastvalues[c], i, c, d) : d.lastvalues[c] !== i) ? (d.groups.push({
                    idx: c,
                    dataIndex: m,
                    value: i,
                    displayValue: k,
                    startRow: a,
                    cnt: 1,
                    summary: []
                }), d.lastvalues[c] = i, q = 1, d.counters[c] = {
                    cnt: 1,
                    pos: d.groups.length - 1,
                    summary: e.extend(!0, [], d.summary)
                }) : 1 === q ? (d.groups.push({
                    idx: c,
                    dataIndex: m,
                    value: i,
                    displayValue: k,
                    startRow: a,
                    cnt: 1,
                    summary: []
                }), d.lastvalues[c] = i, d.counters[c] = {
                    cnt: 1,
                    pos: d.groups.length - 1,
                    summary: e.extend(!0, [], d.summary)
                }) : (d.counters[c].cnt += 1, d.groups[d.counters[c].pos].cnt = d.counters[c].cnt), e.each(d.counters[c].summary,
                    function () {
                        if (e.isFunction(this.st))this.v = this.st.call(h, this.v, this.nm, f); else {
                            this.v = e(h).jqGrid("groupingCalculations.handler", this.st, this.v, this.nm, this.sr, this.srt, f);
                            if (this.st.toLowerCase() === "avg" && this.sd)this.vd = e(h).jqGrid("groupingCalculations.handler", this.st, this.vd, this.sd, this.sr, this.srt, f)
                        }
                    }), d.groups[d.counters[c].pos].summary = d.counters[c].summary);
                g.push(b)
            });
            return g
        }, groupingToggle: function (b) {
            this.each(function () {
                var g = this.p.groupingView, f = b.split("_"), a = parseInt(f[f.length -
                2], 10);
                f.splice(f.length - 2, 2);
                var d = f.join("_"), f = g.minusicon, h = g.plusicon, c = e("#" + e.jgrid.jqID(b)), c = c.length ? c[0].nextSibling : null, l = e("#" + e.jgrid.jqID(b) + " span.tree-wrap-" + this.p.direction), m = function (a) {
                    a = e.map(a.split(" "), function (a) {
                        if (a.substring(0, d.length + 1) === d + "_")return parseInt(a.substring(d.length + 1), 10)
                    });
                    return 0 < a.length ? a[0] : void 0
                }, i, k = !1;
                if (l.hasClass(f)) {
                    if (g.showSummaryOnHide) {
                        if (c)for (; c && !(e(c).hasClass("jqfoot") && parseInt(e(c).attr("jqfootlevel"), 10) <= a);)e(c).hide(), c =
                            c.nextSibling
                    } else if (c)for (; c;) {
                        g = m(c.className);
                        if (void 0 !== g && g <= a)break;
                        e(c).hide();
                        c = c.nextSibling
                    }
                    l.removeClass(f).addClass(h);
                    k = !0
                } else {
                    if (c)for (i = void 0; c;) {
                        g = m(c.className);
                        void 0 === i && (i = void 0 === g);
                        if (void 0 !== g) {
                            if (g <= a)break;
                            g === a + 1 && e(c).show().find(">td>span.tree-wrap-" + this.p.direction).removeClass(f).addClass(h)
                        } else i && e(c).show();
                        c = c.nextSibling
                    }
                    l.removeClass(h).addClass(f)
                }
                e(this).triggerHandler("jqGridGroupingClickGroup", [b, k]);
                e.isFunction(this.p.onClickGroup) && this.p.onClickGroup.call(this,
                    b, k)
            });
            return !1
        }, groupingRender: function (b, g) {
            return this.each(function () {
                function f(a, b, d) {
                    var c = !1;
                    if (0 === b)c = d[a]; else {
                        var f = d[a].idx;
                        if (0 === f)c = d[a]; else for (; 0 <= a; a--)if (d[a].idx === f - b) {
                            c = d[a];
                            break
                        }
                    }
                    return c
                }

                var a = this, d = a.p.groupingView, h = "", c = "", l, m, i = d.groupCollapse ? d.plusicon : d.minusicon, k, q = [], w = d.groupField.length, i = i + (" tree-wrap-" + a.p.direction);
                e.each(a.p.colModel, function (a, b) {
                    var c;
                    for (c = 0; c < w; c++)if (d.groupField[c] === b.name) {
                        q[c] = a;
                        break
                    }
                });
                var t = 0, x = e.makeArray(d.groupSummary);
                x.reverse();
                e.each(d.groups, function (s, j) {
                    t++;
                    m = a.p.id + "ghead_" + j.idx;
                    l = m + "_" + s;
                    c = "<span style='cursor:pointer;' class='ui-icon " + i + "' onclick=\"jQuery('#" + e.jgrid.jqID(a.p.id) + "').jqGrid('groupingToggle','" + l + "');return false;\"></span>";
                    try {
                        e.isArray(d.formatDisplayField) && e.isFunction(d.formatDisplayField[j.idx]) ? (j.displayValue = d.formatDisplayField[j.idx].call(a, j.displayValue, j.value, a.p.colModel[q[j.idx]], j.idx, d), k = j.displayValue) : k = a.formatter(l, j.displayValue, q[j.idx], j.value)
                    } catch (C) {
                        k =
                            j.displayValue
                    }
                    h += '<tr id="' + l + '"' + (d.groupCollapse && 0 < j.idx ? ' style="display:none;" ' : " ") + 'role="row" class= "ui-widget-content jqgroup ui-row-' + a.p.direction + " " + m + '"><td style="padding-left:' + 12 * j.idx + 'px;" colspan="' + g + '">' + c + e.jgrid.template(d.groupText[j.idx], k, j.cnt, j.summary) + "</td></tr>";
                    if (w - 1 === j.idx) {
                        var o = d.groups[s + 1], p, n, B = void 0 !== o ? d.groups[s + 1].startRow : b.length;
                        for (n = j.startRow; n < B; n++)h += b[n].join("");
                        var r;
                        if (void 0 !== o) {
                            for (r = 0; r < d.groupField.length && o.dataIndex !== d.groupField[r]; r++);
                            t = d.groupField.length - r
                        }
                        for (o = 0; o < t; o++)if (x[o]) {
                            n = "";
                            d.groupCollapse && !d.showSummaryOnHide && (n = ' style="display:none;"');
                            h += "<tr" + n + ' jqfootlevel="' + (j.idx - o) + '" role="row" class="ui-widget-content jqfoot ui-row-' + a.p.direction + '">';
                            n = f(s, o, d.groups);
                            var u = a.p.colModel, v, y = n.cnt;
                            for (p = 0; p < g; p++) {
                                var z = "<td " + a.formatCol(p, 1, "") + ">&#160;</td>", A = "{0}";
                                e.each(n.summary, function () {
                                    if (this.nm === u[p].name) {
                                        u[p].summaryTpl && (A = u[p].summaryTpl);
                                        "string" === typeof this.st && "avg" === this.st.toLowerCase() &&
                                        (this.sd && this.vd ? this.v /= this.vd : this.v && 0 < y && (this.v /= y));
                                        try {
                                            v = a.formatter("", this.v, p, this)
                                        } catch (b) {
                                            v = this.v
                                        }
                                        z = "<td " + a.formatCol(p, 1, "") + ">" + e.jgrid.format(A, v) + "</td>";
                                        return !1
                                    }
                                });
                                h += z
                            }
                            h += "</tr>"
                        }
                        t = r
                    }
                });
                e("#" + e.jgrid.jqID(a.p.id) + " tbody:first").append(h);
                h = null
            })
        }, groupingGroupBy: function (b, g) {
            return this.each(function () {
                "string" === typeof b && (b = [b]);
                var f = this.p.groupingView;
                this.p.grouping = !0;
                void 0 === f.visibiltyOnNextGrouping && (f.visibiltyOnNextGrouping = []);
                var a;
                for (a = 0; a < f.groupField.length; a++)!f.groupColumnShow[a] &&
                f.visibiltyOnNextGrouping[a] && e(this).jqGrid("showCol", f.groupField[a]);
                for (a = 0; a < b.length; a++)f.visibiltyOnNextGrouping[a] = e("#" + e.jgrid.jqID(this.p.id) + "_" + e.jgrid.jqID(b[a])).is(":visible");
                this.p.groupingView = e.extend(this.p.groupingView, g || {});
                f.groupField = b;
                e(this).trigger("reloadGrid")
            })
        }, groupingRemove: function (b) {
            return this.each(function () {
                void 0 === b && (b = !0);
                this.p.grouping = !1;
                if (!0 === b) {
                    var g = this.p.groupingView, f;
                    for (f = 0; f < g.groupField.length; f++)!g.groupColumnShow[f] && g.visibiltyOnNextGrouping[f] &&
                    e(this).jqGrid("showCol", g.groupField);
                    e("tr.jqgroup, tr.jqfoot", "#" + e.jgrid.jqID(this.p.id) + " tbody:first").remove();
                    e("tr.jqgrow:hidden", "#" + e.jgrid.jqID(this.p.id) + " tbody:first").show()
                } else e(this).trigger("reloadGrid")
            })
        }, groupingCalculations: {
            handler: function (b, e, f, a, d, h) {
                var c = {
                    sum: function () {
                        return parseFloat(e || 0) + parseFloat(h[f] || 0)
                    }, min: function () {
                        return "" === e ? parseFloat(h[f] || 0) : Math.min(parseFloat(e), parseFloat(h[f] || 0))
                    }, max: function () {
                        return "" === e ? parseFloat(h[f] || 0) : Math.max(parseFloat(e),
                            parseFloat(h[f] || 0))
                    }, count: function () {
                        "" === e && (e = 0);
                        return h.hasOwnProperty(f) ? e + 1 : 0
                    }, avg: function () {
                        return c.sum()
                    }
                };
                if (!c[b])throw"jqGrid Grouping No such method: " + b;
                b = c[b]();
                null != a && ("fixed" === d ? b = b.toFixed(a) : (a = Math.pow(10, a), b = Math.round(b * a) / a));
                return b
            }
        }
    })
})(jQuery);
(function (d) {
    d.jgrid.extend({
        setTreeNode: function (b, c) {
            return this.each(function () {
                var a = this;
                if (a.grid && a.p.treeGrid)for (var h = a.p.expColInd, e = a.p.treeReader.expanded_field, i = a.p.treeReader.leaf_field, g = a.p.treeReader.level_field, f = a.p.treeReader.icon_field, l = a.p.treeReader.loaded, k, m, n, j; b < c;)j = d.jgrid.stripPref(a.p.idPrefix, a.rows[b].id), j = a.p.data[a.p._index[j]], "nested" === a.p.treeGridModel && !j[i] && (k = parseInt(j[a.p.treeReader.left_field], 10), m = parseInt(j[a.p.treeReader.right_field], 10), j[i] =
                    m === k + 1 ? "true" : "false", a.rows[b].cells[a.p._treeleafpos].innerHTML = j[i]), k = parseInt(j[g], 10), 0 === a.p.tree_root_level ? (n = k + 1, m = k) : (n = k, m = k - 1), n = "<div class='tree-wrap tree-wrap-" + a.p.direction + "' style='width:" + 18 * n + "px;'>", n += "<div style='" + ("rtl" === a.p.direction ? "right:" : "left:") + 18 * m + "px;' class='ui-icon ", void 0 !== j[l] && (j[l] = "true" === j[l] || !0 === j[l] ? !0 : !1), "true" === j[i] || !0 === j[i] ? (n += (void 0 !== j[f] && "" !== j[f] ? j[f] : a.p.treeIcons.leaf) + " tree-leaf treeclick", j[i] = !0, m = "leaf") : (j[i] = !1, m = ""), j[e] =
                    ("true" === j[e] || !0 === j[e] ? !0 : !1) && (j[l] || void 0 === j[l]), n = !1 === j[e] ? n + (!0 === j[i] ? "'" : a.p.treeIcons.plus + " tree-plus treeclick'") : n + (!0 === j[i] ? "'" : a.p.treeIcons.minus + " tree-minus treeclick'"), n += "></div></div>", d(a.rows[b].cells[h]).wrapInner("<span class='cell-wrapper" + m + "'></span>").prepend(n), k !== parseInt(a.p.tree_root_level, 10) && ((j = (j = d(a).jqGrid("getNodeParent", j)) && j.hasOwnProperty(e) ? j[e] : !0) || d(a.rows[b]).css("display", "none")), d(a.rows[b].cells[h]).find("div.treeclick").bind("click", function (b) {
                    b =
                        d.jgrid.stripPref(a.p.idPrefix, d(b.target || b.srcElement, a.rows).closest("tr.jqgrow")[0].id);
                    b = a.p._index[b];
                    if (!a.p.data[b][i])if (a.p.data[b][e]) {
                        d(a).jqGrid("collapseRow", a.p.data[b]);
                        d(a).jqGrid("collapseNode", a.p.data[b])
                    } else {
                        d(a).jqGrid("expandRow", a.p.data[b]);
                        d(a).jqGrid("expandNode", a.p.data[b])
                    }
                    return false
                }), !0 === a.p.ExpandColClick && d(a.rows[b].cells[h]).find("span.cell-wrapper").css("cursor", "pointer").bind("click", function (b) {
                    var b = d.jgrid.stripPref(a.p.idPrefix, d(b.target || b.srcElement,
                        a.rows).closest("tr.jqgrow")[0].id), c = a.p._index[b];
                    if (!a.p.data[c][i])if (a.p.data[c][e]) {
                        d(a).jqGrid("collapseRow", a.p.data[c]);
                        d(a).jqGrid("collapseNode", a.p.data[c])
                    } else {
                        d(a).jqGrid("expandRow", a.p.data[c]);
                        d(a).jqGrid("expandNode", a.p.data[c])
                    }
                    d(a).jqGrid("setSelection", b);
                    return false
                }), b++
            })
        }, setTreeGrid: function () {
            return this.each(function () {
                var b = this, c = 0, a = !1, h, e, i, g = [];
                if (b.p.treeGrid) {
                    b.p.treedatatype || d.extend(b.p, {treedatatype: b.p.datatype});
                    b.p.subGrid = !1;
                    b.p.altRows = !1;
                    b.p.pgbuttons = !1;
                    b.p.pginput = !1;
                    b.p.gridview = !0;
                    null === b.p.rowTotal && (b.p.rowNum = 1E4);
                    b.p.multiselect = !1;
                    b.p.rowList = [];
                    b.p.expColInd = 0;
                    b.p.treeIcons = d.extend({
                        plus: "ui-icon-triangle-1-" + ("rtl" === b.p.direction ? "w" : "e"),
                        minus: "ui-icon-triangle-1-s",
                        leaf: "ui-icon-radio-off"
                    }, b.p.treeIcons || {});
                    "nested" === b.p.treeGridModel ? b.p.treeReader = d.extend({
                        level_field: "level",
                        left_field: "lft",
                        right_field: "rgt",
                        leaf_field: "isLeaf",
                        expanded_field: "expanded",
                        loaded: "loaded",
                        icon_field: "icon"
                    }, b.p.treeReader) : "adjacency" === b.p.treeGridModel &&
                    (b.p.treeReader = d.extend({
                        level_field: "level",
                        parent_id_field: "parent",
                        leaf_field: "isLeaf",
                        expanded_field: "expanded",
                        loaded: "loaded",
                        icon_field: "icon"
                    }, b.p.treeReader));
                    for (e in b.p.colModel)if (b.p.colModel.hasOwnProperty(e))for (i in h = b.p.colModel[e].name, h === b.p.ExpandColumn && !a && (a = !0, b.p.expColInd = c), c++, b.p.treeReader)b.p.treeReader.hasOwnProperty(i) && b.p.treeReader[i] === h && g.push(h);
                    d.each(b.p.treeReader, function (a, e) {
                        if (e && d.inArray(e, g) === -1) {
                            if (a === "leaf_field")b.p._treeleafpos = c;
                            c++;
                            b.p.colNames.push(e);
                            b.p.colModel.push({
                                name: e,
                                width: 1,
                                hidden: true,
                                sortable: false,
                                resizable: false,
                                hidedlg: true,
                                editable: true,
                                search: false
                            })
                        }
                    })
                }
            })
        }, expandRow: function (b) {
            this.each(function () {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var a = d(c).jqGrid("getNodeChildren", b), h = c.p.treeReader.expanded_field;
                    d(a).each(function () {
                        var a = c.p.idPrefix + d.jgrid.getAccessor(this, c.p.localReader.id);
                        d(d(c).jqGrid("getGridRowById", a)).css("display", "");
                        this[h] && d(c).jqGrid("expandRow", this)
                    })
                }
            })
        }, collapseRow: function (b) {
            this.each(function () {
                var c =
                    this;
                if (c.grid && c.p.treeGrid) {
                    var a = d(c).jqGrid("getNodeChildren", b), h = c.p.treeReader.expanded_field;
                    d(a).each(function () {
                        var a = c.p.idPrefix + d.jgrid.getAccessor(this, c.p.localReader.id);
                        d(d(c).jqGrid("getGridRowById", a)).css("display", "none");
                        this[h] && d(c).jqGrid("collapseRow", this)
                    })
                }
            })
        }, getRootNodes: function () {
            var b = [];
            this.each(function () {
                var c = this;
                if (c.grid && c.p.treeGrid)switch (c.p.treeGridModel) {
                    case "nested":
                        var a = c.p.treeReader.level_field;
                        d(c.p.data).each(function () {
                            parseInt(this[a], 10) ===
                            parseInt(c.p.tree_root_level, 10) && b.push(this)
                        });
                        break;
                    case "adjacency":
                        var h = c.p.treeReader.parent_id_field;
                        d(c.p.data).each(function () {
                            (null === this[h] || "null" === ("" + this[h]).toLowerCase()) && b.push(this)
                        })
                }
            });
            return b
        }, getNodeDepth: function (b) {
            var c = null;
            this.each(function () {
                if (this.grid && this.p.treeGrid)switch (this.p.treeGridModel) {
                    case "nested":
                        c = parseInt(b[this.p.treeReader.level_field], 10) - parseInt(this.p.tree_root_level, 10);
                        break;
                    case "adjacency":
                        c = d(this).jqGrid("getNodeAncestors", b).length
                }
            });
            return c
        }, getNodeParent: function (b) {
            var c = null;
            this.each(function () {
                var a = this;
                if (a.grid && a.p.treeGrid)switch (a.p.treeGridModel) {
                    case "nested":
                        var h = a.p.treeReader.left_field, e = a.p.treeReader.right_field, i = a.p.treeReader.level_field, g = parseInt(b[h], 10), f = parseInt(b[e], 10), l = parseInt(b[i], 10);
                        d(this.p.data).each(function () {
                            if (parseInt(this[i], 10) === l - 1 && parseInt(this[h], 10) < g && parseInt(this[e], 10) > f)return c = this, !1
                        });
                        break;
                    case "adjacency":
                        var k = a.p.treeReader.parent_id_field, m = a.p.localReader.id;
                        d(this.p.data).each(function () {
                            if (this[m] === d.jgrid.stripPref(a.p.idPrefix, b[k]))return c = this, !1
                        })
                }
            });
            return c
        }, getNodeChildren: function (b) {
            var c = [];
            this.each(function () {
                var a = this;
                if (a.grid && a.p.treeGrid)switch (a.p.treeGridModel) {
                    case "nested":
                        var h = a.p.treeReader.left_field, e = a.p.treeReader.right_field, i = a.p.treeReader.level_field, g = parseInt(b[h], 10), f = parseInt(b[e], 10), l = parseInt(b[i], 10);
                        d(this.p.data).each(function () {
                            parseInt(this[i], 10) === l + 1 && parseInt(this[h], 10) > g && parseInt(this[e], 10) < f &&
                            c.push(this)
                        });
                        break;
                    case "adjacency":
                        var k = a.p.treeReader.parent_id_field, m = a.p.localReader.id;
                        d(this.p.data).each(function () {
                            this[k] == d.jgrid.stripPref(a.p.idPrefix, b[m]) && c.push(this)
                        })
                }
            });
            return c
        }, getFullTreeNode: function (b) {
            var c = [];
            this.each(function () {
                var a = this, h;
                if (a.grid && a.p.treeGrid)switch (a.p.treeGridModel) {
                    case "nested":
                        var e = a.p.treeReader.left_field, i = a.p.treeReader.right_field, g = a.p.treeReader.level_field, f = parseInt(b[e], 10), l = parseInt(b[i], 10), k = parseInt(b[g], 10);
                        d(this.p.data).each(function () {
                            parseInt(this[g],
                                10) >= k && parseInt(this[e], 10) >= f && parseInt(this[e], 10) <= l && c.push(this)
                        });
                        break;
                    case "adjacency":
                        if (b) {
                            c.push(b);
                            var m = a.p.treeReader.parent_id_field, n = a.p.localReader.id;
                            d(this.p.data).each(function (b) {
                                h = c.length;
                                for (b = 0; b < h; b++)if (d.jgrid.stripPref(a.p.idPrefix, c[b][n]) === this[m]) {
                                    c.push(this);
                                    break
                                }
                            })
                        }
                }
            });
            return c
        }, getNodeAncestors: function (b) {
            var c = [];
            this.each(function () {
                if (this.grid && this.p.treeGrid)for (var a = d(this).jqGrid("getNodeParent", b); a;)c.push(a), a = d(this).jqGrid("getNodeParent", a)
            });
            return c
        }, isVisibleNode: function (b) {
            var c = !0;
            this.each(function () {
                if (this.grid && this.p.treeGrid) {
                    var a = d(this).jqGrid("getNodeAncestors", b), h = this.p.treeReader.expanded_field;
                    d(a).each(function () {
                        c = c && this[h];
                        if (!c)return !1
                    })
                }
            });
            return c
        }, isNodeLoaded: function (b) {
            var c;
            this.each(function () {
                if (this.grid && this.p.treeGrid) {
                    var a = this.p.treeReader.leaf_field, h = this.p.treeReader.loaded;
                    c = void 0 !== b ? void 0 !== b[h] ? b[h] : b[a] || 0 < d(this).jqGrid("getNodeChildren", b).length ? !0 : !1 : !1
                }
            });
            return c
        }, expandNode: function (b) {
            return this.each(function () {
                if (this.grid &&
                    this.p.treeGrid) {
                    var c = this.p.treeReader.expanded_field, a = this.p.treeReader.parent_id_field, h = this.p.treeReader.loaded, e = this.p.treeReader.level_field, i = this.p.treeReader.left_field, g = this.p.treeReader.right_field;
                    if (!b[c]) {
                        var f = d.jgrid.getAccessor(b, this.p.localReader.id), l = d("#" + this.p.idPrefix + d.jgrid.jqID(f), this.grid.bDiv)[0], k = this.p._index[f];
                        d(this).jqGrid("isNodeLoaded", this.p.data[k]) ? (b[c] = !0, d("div.treeclick", l).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus +
                            " tree-minus")) : this.grid.hDiv.loading || (b[c] = !0, d("div.treeclick", l).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus"), this.p.treeANode = l.rowIndex, this.p.datatype = this.p.treedatatype, "nested" === this.p.treeGridModel ? d(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: f,
                                n_left: b[i],
                                n_right: b[g],
                                n_level: b[e]
                            }
                        }) : d(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: f,
                                parentid: b[a],
                                n_level: b[e]
                            }
                        }), d(this).trigger("reloadGrid"), b[h] = !0, "nested" === this.p.treeGridModel ?
                            d(this).jqGrid("setGridParam", {
                                postData: {
                                    nodeid: "",
                                    n_left: "",
                                    n_right: "",
                                    n_level: ""
                                }
                            }) : d(this).jqGrid("setGridParam", {postData: {nodeid: "", parentid: "", n_level: ""}}))
                    }
                }
            })
        }, collapseNode: function (b) {
            return this.each(function () {
                if (this.grid && this.p.treeGrid) {
                    var c = this.p.treeReader.expanded_field;
                    b[c] && (b[c] = !1, c = d.jgrid.getAccessor(b, this.p.localReader.id), c = d("#" + this.p.idPrefix + d.jgrid.jqID(c), this.grid.bDiv)[0], d("div.treeclick", c).removeClass(this.p.treeIcons.minus + " tree-minus").addClass(this.p.treeIcons.plus +
                        " tree-plus"))
                }
            })
        }, SortTree: function (b, c, a, h) {
            return this.each(function () {
                if (this.grid && this.p.treeGrid) {
                    var e, i, g, f = [], l = this, k;
                    e = d(this).jqGrid("getRootNodes");
                    e = d.jgrid.from(e);
                    e.orderBy(b, c, a, h);
                    k = e.select();
                    e = 0;
                    for (i = k.length; e < i; e++)g = k[e], f.push(g), d(this).jqGrid("collectChildrenSortTree", f, g, b, c, a, h);
                    d.each(f, function (a) {
                        var b = d.jgrid.getAccessor(this, l.p.localReader.id);
                        d("#" + d.jgrid.jqID(l.p.id) + " tbody tr:eq(" + a + ")").after(d("tr#" + d.jgrid.jqID(b), l.grid.bDiv))
                    });
                    f = k = e = null
                }
            })
        }, collectChildrenSortTree: function (b,
                                              c, a, h, e, i) {
            return this.each(function () {
                if (this.grid && this.p.treeGrid) {
                    var g, f, l, k;
                    g = d(this).jqGrid("getNodeChildren", c);
                    g = d.jgrid.from(g);
                    g.orderBy(a, h, e, i);
                    k = g.select();
                    g = 0;
                    for (f = k.length; g < f; g++)l = k[g], b.push(l), d(this).jqGrid("collectChildrenSortTree", b, l, a, h, e, i)
                }
            })
        }, setTreeRow: function (b, c) {
            var a = !1;
            this.each(function () {
                this.grid && this.p.treeGrid && (a = d(this).jqGrid("setRowData", b, c))
            });
            return a
        }, delTreeNode: function (b) {
            return this.each(function () {
                var c = this.p.localReader.id, a, h = this.p.treeReader.left_field,
                    e = this.p.treeReader.right_field, i, g, f;
                if (this.grid && this.p.treeGrid && (a = this.p._index[b], void 0 !== a)) {
                    i = parseInt(this.p.data[a][e], 10);
                    g = i - parseInt(this.p.data[a][h], 10) + 1;
                    var l = d(this).jqGrid("getFullTreeNode", this.p.data[a]);
                    if (0 < l.length)for (a = 0; a < l.length; a++)d(this).jqGrid("delRowData", l[a][c]);
                    if ("nested" === this.p.treeGridModel) {
                        c = d.jgrid.from(this.p.data).greater(h, i, {stype: "integer"}).select();
                        if (c.length)for (f in c)c.hasOwnProperty(f) && (c[f][h] = parseInt(c[f][h], 10) - g);
                        c = d.jgrid.from(this.p.data).greater(e,
                            i, {stype: "integer"}).select();
                        if (c.length)for (f in c)c.hasOwnProperty(f) && (c[f][e] = parseInt(c[f][e], 10) - g)
                    }
                }
            })
        }, addChildNode: function (b, c, a, h) {
            var e = this[0];
            if (a) {
                var i = e.p.treeReader.expanded_field, g = e.p.treeReader.leaf_field, f = e.p.treeReader.level_field, l = e.p.treeReader.parent_id_field, k = e.p.treeReader.left_field, m = e.p.treeReader.right_field, n = e.p.treeReader.loaded, j, r, q, t, p;
                j = 0;
                var s = c, u;
                void 0 === h && (h = !1);
                if (void 0 === b || null === b) {
                    p = e.p.data.length - 1;
                    if (0 <= p)for (; 0 <= p;)j = Math.max(j, parseInt(e.p.data[p][e.p.localReader.id],
                        10)), p--;
                    b = j + 1
                }
                var v = d(e).jqGrid("getInd", c);
                u = !1;
                if (void 0 === c || null === c || "" === c)s = c = null, j = "last", t = e.p.tree_root_level, p = e.p.data.length + 1; else if (j = "after", r = e.p._index[c], q = e.p.data[r], c = q[e.p.localReader.id], t = parseInt(q[f], 10) + 1, p = d(e).jqGrid("getFullTreeNode", q), p.length ? (s = p = p[p.length - 1][e.p.localReader.id], p = d(e).jqGrid("getInd", s) + 1) : p = d(e).jqGrid("getInd", c) + 1, q[g])u = !0, q[i] = !0, d(e.rows[v]).find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper").end().find("div.tree-leaf").removeClass(e.p.treeIcons.leaf +
                    " tree-leaf").addClass(e.p.treeIcons.minus + " tree-minus"), e.p.data[r][g] = !1, q[n] = !0;
                r = p + 1;
                void 0 === a[i] && (a[i] = !1);
                void 0 === a[n] && (a[n] = !1);
                a[f] = t;
                void 0 === a[g] && (a[g] = !0);
                "adjacency" === e.p.treeGridModel && (a[l] = c);
                if ("nested" === e.p.treeGridModel) {
                    var o;
                    if (null !== c) {
                        g = parseInt(q[m], 10);
                        f = d.jgrid.from(e.p.data);
                        f = f.greaterOrEquals(m, g, {stype: "integer"});
                        f = f.select();
                        if (f.length)for (o in f)f.hasOwnProperty(o) && (f[o][k] = f[o][k] > g ? parseInt(f[o][k], 10) + 2 : f[o][k], f[o][m] = f[o][m] >= g ? parseInt(f[o][m], 10) +
                        2 : f[o][m]);
                        a[k] = g;
                        a[m] = g + 1
                    } else {
                        g = parseInt(d(e).jqGrid("getCol", m, !1, "max"), 10);
                        f = d.jgrid.from(e.p.data).greater(k, g, {stype: "integer"}).select();
                        if (f.length)for (o in f)f.hasOwnProperty(o) && (f[o][k] = parseInt(f[o][k], 10) + 2);
                        f = d.jgrid.from(e.p.data).greater(m, g, {stype: "integer"}).select();
                        if (f.length)for (o in f)f.hasOwnProperty(o) && (f[o][m] = parseInt(f[o][m], 10) + 2);
                        a[k] = g + 1;
                        a[m] = g + 2
                    }
                }
                if (null === c || d(e).jqGrid("isNodeLoaded", q) || u)d(e).jqGrid("addRowData", b, a, j, s), d(e).jqGrid("setTreeNode", p, r);
                q && !q[i] &&
                h && d(e.rows[v]).find("div.treeclick").click()
            }
        }
    })
})(jQuery);
(function (c) {
    c.jgrid.extend({
        jqGridImport: function (a) {
            a = c.extend({
                imptype: "xml",
                impstring: "",
                impurl: "",
                mtype: "GET",
                impData: {},
                xmlGrid: {config: "roots>grid", data: "roots>rows"},
                jsonGrid: {config: "grid", data: "data"},
                ajaxOptions: {}
            }, a || {});
            return this.each(function () {
                var d = this, f = function (a, b) {
                    var e = c(b.xmlGrid.config, a)[0], h = c(b.xmlGrid.data, a)[0], f, g;
                    if (xmlJsonClass.xml2json && c.jgrid.parse) {
                        e = xmlJsonClass.xml2json(e, " ");
                        e = c.jgrid.parse(e);
                        for (g in e)e.hasOwnProperty(g) && (f = e[g]);
                        h ? (h = e.grid.datatype,
                            e.grid.datatype = "xmlstring", e.grid.datastr = a, c(d).jqGrid(f).jqGrid("setGridParam", {datatype: h})) : c(d).jqGrid(f)
                    } else alert("xml2json or parse are not present")
                }, b = function (a, b) {
                    if (a && "string" === typeof a) {
                        var e = !1;
                        c.jgrid.useJSON && (c.jgrid.useJSON = !1, e = !0);
                        var f = c.jgrid.parse(a);
                        e && (c.jgrid.useJSON = !0);
                        e = f[b.jsonGrid.config];
                        if (f = f[b.jsonGrid.data]) {
                            var g = e.datatype;
                            e.datatype = "jsonstring";
                            e.datastr = f;
                            c(d).jqGrid(e).jqGrid("setGridParam", {datatype: g})
                        } else c(d).jqGrid(e)
                    }
                };
                switch (a.imptype) {
                    case "xml":
                        c.ajax(c.extend({
                            url: a.impurl,
                            type: a.mtype, data: a.impData, dataType: "xml", complete: function (b, g) {
                                "success" === g && (f(b.responseXML, a), c(d).triggerHandler("jqGridImportComplete", [b, a]), c.isFunction(a.importComplete) && a.importComplete(b))
                            }
                        }, a.ajaxOptions));
                        break;
                    case "xmlstring":
                        if (a.impstring && "string" === typeof a.impstring) {
                            var g = c.parseXML(a.impstring);
                            g && (f(g, a), c(d).triggerHandler("jqGridImportComplete", [g, a]), c.isFunction(a.importComplete) && a.importComplete(g), a.impstring = null);
                            g = null
                        }
                        break;
                    case "json":
                        c.ajax(c.extend({
                            url: a.impurl,
                            type: a.mtype, data: a.impData, dataType: "json", complete: function (f) {
                                try {
                                    b(f.responseText, a), c(d).triggerHandler("jqGridImportComplete", [f, a]), c.isFunction(a.importComplete) && a.importComplete(f)
                                } catch (g) {
                                }
                            }
                        }, a.ajaxOptions));
                        break;
                    case "jsonstring":
                        a.impstring && "string" === typeof a.impstring && (b(a.impstring, a), c(d).triggerHandler("jqGridImportComplete", [a.impstring, a]), c.isFunction(a.importComplete) && a.importComplete(a.impstring), a.impstring = null)
                }
            })
        }, jqGridExport: function (a) {
            var a = c.extend({
                exptype: "xmlstring",
                root: "grid", ident: "\t"
            }, a || {}), d = null;
            this.each(function () {
                if (this.grid) {
                    var f, b = c.extend(!0, {}, c(this).jqGrid("getGridParam"));
                    b.rownumbers && (b.colNames.splice(0, 1), b.colModel.splice(0, 1));
                    b.multiselect && (b.colNames.splice(0, 1), b.colModel.splice(0, 1));
                    b.subGrid && (b.colNames.splice(0, 1), b.colModel.splice(0, 1));
                    b.knv = null;
                    if (b.treeGrid)for (f in b.treeReader)b.treeReader.hasOwnProperty(f) && (b.colNames.splice(b.colNames.length - 1), b.colModel.splice(b.colModel.length - 1));
                    switch (a.exptype) {
                        case "xmlstring":
                            d =
                                "<" + a.root + ">" + xmlJsonClass.json2xml(b, a.ident) + "</" + a.root + ">";
                            break;
                        case "jsonstring":
                            d = "{" + xmlJsonClass.toJson(b, a.root, a.ident, !1) + "}", void 0 !== b.postData.filters && (d = d.replace(/filters":"/, 'filters":'), d = d.replace(/}]}"/, "}]}"))
                    }
                }
            });
            return d
        }, excelExport: function (a) {
            a = c.extend({exptype: "remote", url: null, oper: "oper", tag: "excel", exportOptions: {}}, a || {});
            return this.each(function () {
                if (this.grid) {
                    var d;
                    "remote" === a.exptype && (d = c.extend({}, this.p.postData), d[a.oper] = a.tag, d = jQuery.param(d), d = -1 !==
                    a.url.indexOf("?") ? a.url + "&" + d : a.url + "?" + d, window.location = d)
                }
            })
        }
    })
})(jQuery);
var xmlJsonClass = {
    xml2json: function (a, b) {
        9 === a.nodeType && (a = a.documentElement);
        var g = this.toJson(this.toObj(this.removeWhite(a)), a.nodeName, "\t");
        return "{\n" + b + (b ? g.replace(/\t/g, b) : g.replace(/\t|\n/g, "")) + "\n}"
    }, json2xml: function (a, b) {
        var g = function (a, b, e) {
            var d = "", f, i;
            if (a instanceof Array)if (0 === a.length)d += e + "<" + b + ">__EMPTY_ARRAY_</" + b + ">\n"; else {
                f = 0;
                for (i = a.length; f < i; f += 1)var l = e + g(a[f], b, e + "\t") + "\n", d = d + l
            } else if ("object" === typeof a) {
                f = !1;
                d += e + "<" + b;
                for (i in a)a.hasOwnProperty(i) && ("@" ===
                i.charAt(0) ? d += " " + i.substr(1) + '="' + a[i].toString() + '"' : f = !0);
                d += f ? ">" : "/>";
                if (f) {
                    for (i in a)a.hasOwnProperty(i) && ("#text" === i ? d += a[i] : "#cdata" === i ? d += "<![CDATA[" + a[i] + "]]\>" : "@" !== i.charAt(0) && (d += g(a[i], i, e + "\t")));
                    d += ("\n" === d.charAt(d.length - 1) ? e : "") + "</" + b + ">"
                }
            } else"function" === typeof a ? d += e + "<" + b + "><![CDATA[" + a + "]]\></" + b + ">" : (void 0 === a && (a = ""), d = '""' === a.toString() || 0 === a.toString().length ? d + (e + "<" + b + ">__EMPTY_STRING_</" + b + ">") : d + (e + "<" + b + ">" + a.toString() + "</" + b + ">"));
            return d
        }, f = "", e;
        for (e in a)a.hasOwnProperty(e) &&
        (f += g(a[e], e, ""));
        return b ? f.replace(/\t/g, b) : f.replace(/\t|\n/g, "")
    }, toObj: function (a) {
        var b = {}, g = /function/i;
        if (1 === a.nodeType) {
            if (a.attributes.length) {
                var f;
                for (f = 0; f < a.attributes.length; f += 1)b["@" + a.attributes[f].nodeName] = (a.attributes[f].nodeValue || "").toString()
            }
            if (a.firstChild) {
                var e = f = 0, h = !1, c;
                for (c = a.firstChild; c; c = c.nextSibling)1 === c.nodeType ? h = !0 : 3 === c.nodeType && c.nodeValue.match(/[^ \f\n\r\t\v]/) ? f += 1 : 4 === c.nodeType && (e += 1);
                if (h)if (2 > f && 2 > e) {
                    this.removeWhite(a);
                    for (c = a.firstChild; c; c =
                        c.nextSibling)3 === c.nodeType ? b["#text"] = this.escape(c.nodeValue) : 4 === c.nodeType ? g.test(c.nodeValue) ? b[c.nodeName] = [b[c.nodeName], c.nodeValue] : b["#cdata"] = this.escape(c.nodeValue) : b[c.nodeName] ? b[c.nodeName]instanceof Array ? b[c.nodeName][b[c.nodeName].length] = this.toObj(c) : b[c.nodeName] = [b[c.nodeName], this.toObj(c)] : b[c.nodeName] = this.toObj(c)
                } else a.attributes.length ? b["#text"] = this.escape(this.innerXml(a)) : b = this.escape(this.innerXml(a)); else if (f)a.attributes.length ? b["#text"] = this.escape(this.innerXml(a)) :
                    (b = this.escape(this.innerXml(a)), "__EMPTY_ARRAY_" === b ? b = "[]" : "__EMPTY_STRING_" === b && (b = "")); else if (e)if (1 < e)b = this.escape(this.innerXml(a)); else for (c = a.firstChild; c; c = c.nextSibling)if (g.test(a.firstChild.nodeValue)) {
                    b = a.firstChild.nodeValue;
                    break
                } else b["#cdata"] = this.escape(c.nodeValue)
            }
            !a.attributes.length && !a.firstChild && (b = null)
        } else 9 === a.nodeType ? b = this.toObj(a.documentElement) : alert("unhandled node type: " + a.nodeType);
        return b
    }, toJson: function (a, b, g, f) {
        void 0 === f && (f = !0);
        var e = b ? '"' + b + '"' :
            "", h = "\t", c = "\n";
        f || (c = h = "");
        if ("[]" === a)e += b ? ":[]" : "[]"; else if (a instanceof Array) {
            var j, d, k = [];
            d = 0;
            for (j = a.length; d < j; d += 1)k[d] = this.toJson(a[d], "", g + h, f);
            e += (b ? ":[" : "[") + (1 < k.length ? c + g + h + k.join("," + c + g + h) + c + g : k.join("")) + "]"
        } else if (null === a)e += (b && ":") + "null"; else if ("object" === typeof a) {
            j = [];
            for (d in a)a.hasOwnProperty(d) && (j[j.length] = this.toJson(a[d], d, g + h, f));
            e += (b ? ":{" : "{") + (1 < j.length ? c + g + h + j.join("," + c + g + h) + c + g : j.join("")) + "}"
        } else e = "string" === typeof a ? e + ((b && ":") + '"' + a.replace(/\\/g,
            "\\\\").replace(/\"/g, '\\"') + '"') : e + ((b && ":") + a.toString());
        return e
    }, innerXml: function (a) {
        var b = "";
        if ("innerHTML"in a)b = a.innerHTML; else for (var g = function (a) {
            var b = "", h;
            if (1 === a.nodeType) {
                b += "<" + a.nodeName;
                for (h = 0; h < a.attributes.length; h += 1)b += " " + a.attributes[h].nodeName + '="' + (a.attributes[h].nodeValue || "").toString() + '"';
                if (a.firstChild) {
                    b += ">";
                    for (h = a.firstChild; h; h = h.nextSibling)b += g(h);
                    b += "</" + a.nodeName + ">"
                } else b += "/>"
            } else 3 === a.nodeType ? b += a.nodeValue : 4 === a.nodeType && (b += "<![CDATA[" + a.nodeValue +
                "]]\>");
            return b
        }, a = a.firstChild; a; a = a.nextSibling)b += g(a);
        return b
    }, escape: function (a) {
        return a.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, "\\n").replace(/[\r]/g, "\\r")
    }, removeWhite: function (a) {
        a.normalize();
        var b;
        for (b = a.firstChild; b;)if (3 === b.nodeType)if (b.nodeValue.match(/[^ \f\n\r\t\v]/))b = b.nextSibling; else {
            var g = b.nextSibling;
            a.removeChild(b);
            b = g
        } else 1 === b.nodeType && this.removeWhite(b), b = b.nextSibling;
        return a
    }
};
function tableToGrid(j, k) {
    jQuery(j).each(function () {
        if (!this.grid) {
            jQuery(this).width("99%");
            var b = jQuery(this).width(), c = jQuery("tr td:first-child input[type=checkbox]:first", jQuery(this)), a = jQuery("tr td:first-child input[type=radio]:first", jQuery(this)), c = 0 < c.length, a = !c && 0 < a.length, i = c || a, d = [], e = [];
            jQuery("th", jQuery(this)).each(function () {
                0 === d.length && i ? (d.push({
                    name: "__selection__",
                    index: "__selection__",
                    width: 0,
                    hidden: !0
                }), e.push("__selection__")) : (d.push({
                    name: jQuery(this).attr("id") || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(" ").join("_"),
                    index: jQuery(this).attr("id") || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(" ").join("_"),
                    width: jQuery(this).width() || 150
                }), e.push(jQuery(this).html()))
            });
            var f = [], g = [], h = [];
            jQuery("tbody > tr", jQuery(this)).each(function () {
                var b = {}, a = 0;
                jQuery("td", jQuery(this)).each(function () {
                    if (0 === a && i) {
                        var c = jQuery("input", jQuery(this)), e = c.attr("value");
                        g.push(e || f.length);
                        c.is(":checked") && h.push(e);
                        b[d[a].name] = c.attr("value")
                    } else b[d[a].name] = jQuery(this).html();
                    a++
                });
                0 < a && f.push(b)
            });
            jQuery(this).empty();
            jQuery(this).addClass("scroll");
            jQuery(this).jqGrid(jQuery.extend({
                datatype: "local",
                width: b,
                colNames: e,
                colModel: d,
                multiselect: c
            }, k || {}));
            for (b = 0; b < f.length; b++)a = null, 0 < g.length && (a = g[b]) && a.replace && (a = encodeURIComponent(a).replace(/[.\-%]/g, "_")), null === a && (a = b + 1), jQuery(this).jqGrid("addRowData", a, f[b]);
            for (b = 0; b < h.length; b++)jQuery(this).jqGrid("setSelection", h[b])
        }
    })
};
(function (b) {
    b.jgrid.msie && 8 === b.jgrid.msiever() && (b.expr[":"].hidden = function (b) {
        return 0 === b.offsetWidth || 0 === b.offsetHeight || "none" === b.style.display
    });
    b.jgrid._multiselect = !1;
    if (b.ui && b.ui.multiselect) {
        if (b.ui.multiselect.prototype._setSelected) {
            var o = b.ui.multiselect.prototype._setSelected;
            b.ui.multiselect.prototype._setSelected = function (a, d) {
                var c = o.call(this, a, d);
                if (d && this.selectedList) {
                    var e = this.element;
                    this.selectedList.find("li").each(function () {
                        b(this).data("optionLink") && b(this).data("optionLink").remove().appendTo(e)
                    })
                }
                return c
            }
        }
        b.ui.multiselect.prototype.destroy &&
        (b.ui.multiselect.prototype.destroy = function () {
            this.element.show();
            this.container.remove();
            b.Widget === void 0 ? b.widget.prototype.destroy.apply(this, arguments) : b.Widget.prototype.destroy.apply(this, arguments)
        });
        b.jgrid._multiselect = !0
    }
    b.jgrid.extend({
        sortableColumns: function (a) {
            return this.each(function () {
                function d() {
                    c.p.disableClick = true
                }

                var c = this, e = b.jgrid.jqID(c.p.id), e = {
                    tolerance: "pointer",
                    axis: "x",
                    scrollSensitivity: "1",
                    items: ">th:not(:has(#jqgh_" + e + "_cb,#jqgh_" + e + "_rn,#jqgh_" + e + "_subgrid),:hidden)",
                    placeholder: {
                        element: function (a) {
                            return b(document.createElement(a[0].nodeName)).addClass(a[0].className + " ui-sortable-placeholder ui-state-highlight").removeClass("ui-sortable-helper")[0]
                        }, update: function (b, a) {
                            a.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10));
                            a.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10))
                        }
                    },
                    update: function (a,
                                      e) {
                        var d = b(e.item).parent(), d = b(">th", d), f = {}, g = c.p.id + "_";
                        b.each(c.p.colModel, function (b) {
                            f[this.name] = b
                        });
                        var j = [];
                        d.each(function () {
                            var a = b(">div", this).get(0).id.replace(/^jqgh_/, "").replace(g, "");
                            f.hasOwnProperty(a) && j.push(f[a])
                        });
                        b(c).jqGrid("remapColumns", j, true, true);
                        b.isFunction(c.p.sortable.update) && c.p.sortable.update(j);
                        setTimeout(function () {
                            c.p.disableClick = false
                        }, 50)
                    }
                };
                if (c.p.sortable.options)b.extend(e, c.p.sortable.options); else if (b.isFunction(c.p.sortable))c.p.sortable = {update: c.p.sortable};
                if (e.start) {
                    var g = e.start;
                    e.start = function (b, a) {
                        d();
                        g.call(this, b, a)
                    }
                } else e.start = d;
                if (c.p.sortable.exclude)e.items = e.items + (":not(" + c.p.sortable.exclude + ")");
                a.sortable(e).data("sortable").floating = true
            })
        }, columnChooser: function (a) {
            function d(a, c) {
                a && (typeof a === "string" ? b.fn[a] && b.fn[a].apply(c, b.makeArray(arguments).slice(2)) : b.isFunction(a) && a.apply(c, b.makeArray(arguments).slice(2)))
            }

            var c = this;
            if (!b("#colchooser_" + b.jgrid.jqID(c[0].p.id)).length) {
                var e = b('<div id="colchooser_' + c[0].p.id + '" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>'),
                    g = b("select", e), a = b.extend({
                        width: 420, height: 240, classname: null, done: function (b) {
                            b && c.jqGrid("remapColumns", b, true)
                        }, msel: "multiselect", dlog: "dialog", dialog_opts: {minWidth: 470}, dlog_opts: function (a) {
                            var c = {};
                            c[a.bSubmit] = function () {
                                a.apply_perm();
                                a.cleanup(false)
                            };
                            c[a.bCancel] = function () {
                                a.cleanup(true)
                            };
                            return b.extend(true, {
                                buttons: c, close: function () {
                                    a.cleanup(true)
                                }, modal: a.modal || false, resizable: a.resizable || true, width: a.width + 20
                            }, a.dialog_opts || {})
                        }, apply_perm: function () {
                            b("option", g).each(function () {
                                this.selected ?
                                    c.jqGrid("showCol", i[this.value].name) : c.jqGrid("hideCol", i[this.value].name)
                            });
                            var e = [];
                            b("option:selected", g).each(function () {
                                e.push(parseInt(this.value, 10))
                            });
                            b.each(e, function () {
                                delete m[i[parseInt(this, 10)].name]
                            });
                            b.each(m, function () {
                                var b = parseInt(this, 10);
                                var a = e, c = b;
                                if (c >= 0) {
                                    var d = a.slice(), i = d.splice(c, Math.max(a.length - c, c));
                                    if (c > a.length)c = a.length;
                                    d[c] = b;
                                    e = d.concat(i)
                                } else e = void 0
                            });
                            a.done && a.done.call(c, e)
                        }, cleanup: function (b) {
                            d(a.dlog, e, "destroy");
                            d(a.msel, g, "destroy");
                            e.remove();
                            b && a.done && a.done.call(c)
                        }, msel_opts: {}
                    }, b.jgrid.col, a || {});
                if (b.ui && b.ui.multiselect && a.msel === "multiselect") {
                    if (!b.jgrid._multiselect) {
                        alert("Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!");
                        return
                    }
                    a.msel_opts = b.extend(b.ui.multiselect.defaults, a.msel_opts)
                }
                a.caption && e.attr("title", a.caption);
                if (a.classname) {
                    e.addClass(a.classname);
                    g.addClass(a.classname)
                }
                if (a.width) {
                    b(">div", e).css({width: a.width, margin: "0 auto"});
                    g.css("width", a.width)
                }
                if (a.height) {
                    b(">div",
                        e).css("height", a.height);
                    g.css("height", a.height - 10)
                }
                var i = c.jqGrid("getGridParam", "colModel"), q = c.jqGrid("getGridParam", "colNames"), m = {}, f = [];
                g.empty();
                b.each(i, function (a) {
                    m[this.name] = a;
                    this.hidedlg ? this.hidden || f.push(a) : g.append("<option value='" + a + "' " + (this.hidden ? "" : "selected='selected'") + ">" + b.jgrid.stripHtml(q[a]) + "</option>")
                });
                var n = b.isFunction(a.dlog_opts) ? a.dlog_opts.call(c, a) : a.dlog_opts;
                d(a.dlog, e, n);
                n = b.isFunction(a.msel_opts) ? a.msel_opts.call(c, a) : a.msel_opts;
                d(a.msel, g, n)
            }
        }, sortableRows: function (a) {
            return this.each(function () {
                var d =
                    this;
                if (d.grid && !d.p.treeGrid && b.fn.sortable) {
                    a = b.extend({cursor: "move", axis: "y", items: ".jqgrow"}, a || {});
                    if (a.start && b.isFunction(a.start)) {
                        a._start_ = a.start;
                        delete a.start
                    } else a._start_ = false;
                    if (a.update && b.isFunction(a.update)) {
                        a._update_ = a.update;
                        delete a.update
                    } else a._update_ = false;
                    a.start = function (c, e) {
                        b(e.item).css("border-width", "0px");
                        b("td", e.item).each(function (b) {
                            this.style.width = d.grid.cols[b].style.width
                        });
                        if (d.p.subGrid) {
                            var g = b(e.item).attr("id");
                            try {
                                b(d).jqGrid("collapseSubGridRow",
                                    g)
                            } catch (i) {
                            }
                        }
                        a._start_ && a._start_.apply(this, [c, e])
                    };
                    a.update = function (c, e) {
                        b(e.item).css("border-width", "");
                        d.p.rownumbers === true && b("td.jqgrid-rownum", d.rows).each(function (a) {
                            b(this).html(a + 1 + (parseInt(d.p.page, 10) - 1) * parseInt(d.p.rowNum, 10))
                        });
                        a._update_ && a._update_.apply(this, [c, e])
                    };
                    b("tbody:first", d).sortable(a);
                    b("tbody:first", d).disableSelection()
                }
            })
        }, gridDnD: function (a) {
            return this.each(function () {
                function d() {
                    var a = b.data(c, "dnd");
                    b("tr.jqgrow:not(.ui-draggable)", c).draggable(b.isFunction(a.drag) ?
                        a.drag.call(b(c), a) : a.drag)
                }

                var c = this, e, g;
                if (c.grid && !c.p.treeGrid && b.fn.draggable && b.fn.droppable) {
                    b("#jqgrid_dnd")[0] === void 0 && b("body").append("<table id='jqgrid_dnd' class='ui-jqgrid-dnd'></table>");
                    if (typeof a === "string" && a === "updateDnD" && c.p.jqgdnd === true)d(); else {
                        a = b.extend({
                            drag: function (a) {
                                return b.extend({
                                    start: function (e, d) {
                                        var f;
                                        if (c.p.subGrid) {
                                            f = b(d.helper).attr("id");
                                            try {
                                                b(c).jqGrid("collapseSubGridRow", f)
                                            } catch (g) {
                                            }
                                        }
                                        for (f = 0; f < b.data(c, "dnd").connectWith.length; f++)b(b.data(c, "dnd").connectWith[f]).jqGrid("getGridParam",
                                            "reccount") === 0 && b(b.data(c, "dnd").connectWith[f]).jqGrid("addRowData", "jqg_empty_row", {});
                                        d.helper.addClass("ui-state-highlight");
                                        b("td", d.helper).each(function (b) {
                                            this.style.width = c.grid.headers[b].width + "px"
                                        });
                                        a.onstart && b.isFunction(a.onstart) && a.onstart.call(b(c), e, d)
                                    }, stop: function (e, d) {
                                        var f;
                                        if (d.helper.dropped && !a.dragcopy) {
                                            f = b(d.helper).attr("id");
                                            f === void 0 && (f = b(this).attr("id"));
                                            b(c).jqGrid("delRowData", f)
                                        }
                                        for (f = 0; f < b.data(c, "dnd").connectWith.length; f++)b(b.data(c, "dnd").connectWith[f]).jqGrid("delRowData",
                                            "jqg_empty_row");
                                        a.onstop && b.isFunction(a.onstop) && a.onstop.call(b(c), e, d)
                                    }
                                }, a.drag_opts || {})
                            },
                            drop: function (a) {
                                return b.extend({
                                    accept: function (a) {
                                        if (!b(a).hasClass("jqgrow"))return a;
                                        a = b(a).closest("table.ui-jqgrid-btable");
                                        if (a.length > 0 && b.data(a[0], "dnd") !== void 0) {
                                            a = b.data(a[0], "dnd").connectWith;
                                            return b.inArray("#" + b.jgrid.jqID(this.id), a) !== -1 ? true : false
                                        }
                                        return false
                                    }, drop: function (e, d) {
                                        if (b(d.draggable).hasClass("jqgrow")) {
                                            var f = b(d.draggable).attr("id"), f = d.draggable.parent().parent().jqGrid("getRowData",
                                                f);
                                            if (!a.dropbyname) {
                                                var g = 0, j = {}, h, l, p = b("#" + b.jgrid.jqID(this.id)).jqGrid("getGridParam", "colModel");
                                                try {
                                                    for (l in f)if (f.hasOwnProperty(l)) {
                                                        h = p[g].name;
                                                        h === "cb" || h === "rn" || h === "subgrid" || f.hasOwnProperty(l) && p[g] && (j[h] = f[l]);
                                                        g++
                                                    }
                                                    f = j
                                                } catch (o) {
                                                }
                                            }
                                            d.helper.dropped = true;
                                            if (a.beforedrop && b.isFunction(a.beforedrop)) {
                                                h = a.beforedrop.call(this, e, d, f, b("#" + b.jgrid.jqID(c.p.id)), b(this));
                                                h !== void 0 && h !== null && typeof h === "object" && (f = h)
                                            }
                                            if (d.helper.dropped) {
                                                var k;
                                                if (a.autoid)if (b.isFunction(a.autoid))k = a.autoid.call(this,
                                                    f); else {
                                                    k = Math.ceil(Math.random() * 1E3);
                                                    k = a.autoidprefix + k
                                                }
                                                b("#" + b.jgrid.jqID(this.id)).jqGrid("addRowData", k, f, a.droppos)
                                            }
                                            a.ondrop && b.isFunction(a.ondrop) && a.ondrop.call(this, e, d, f)
                                        }
                                    }
                                }, a.drop_opts || {})
                            },
                            onstart: null,
                            onstop: null,
                            beforedrop: null,
                            ondrop: null,
                            drop_opts: {activeClass: "ui-state-active", hoverClass: "ui-state-hover"},
                            drag_opts: {
                                revert: "invalid",
                                helper: "clone",
                                cursor: "move",
                                appendTo: "#jqgrid_dnd",
                                zIndex: 5E3
                            },
                            dragcopy: false,
                            dropbyname: false,
                            droppos: "first",
                            autoid: true,
                            autoidprefix: "dnd_"
                        }, a ||
                            {});
                        if (a.connectWith) {
                            a.connectWith = a.connectWith.split(",");
                            a.connectWith = b.map(a.connectWith, function (a) {
                                return b.trim(a)
                            });
                            b.data(c, "dnd", a);
                            c.p.reccount !== 0 && !c.p.jqgdnd && d();
                            c.p.jqgdnd = true;
                            for (e = 0; e < a.connectWith.length; e++) {
                                g = a.connectWith[e];
                                b(g).droppable(b.isFunction(a.drop) ? a.drop.call(b(c), a) : a.drop)
                            }
                        }
                    }
                }
            })
        }, gridResize: function (a) {
            return this.each(function () {
                var d = this, c = b.jgrid.jqID(d.p.id);
                if (d.grid && b.fn.resizable) {
                    a = b.extend({}, a || {});
                    if (a.alsoResize) {
                        a._alsoResize_ = a.alsoResize;
                        delete a.alsoResize
                    } else a._alsoResize_ =
                        false;
                    if (a.stop && b.isFunction(a.stop)) {
                        a._stop_ = a.stop;
                        delete a.stop
                    } else a._stop_ = false;
                    a.stop = function (e, g) {
                        b(d).jqGrid("setGridParam", {height: b("#gview_" + c + " .ui-jqgrid-bdiv").height()});
                        b(d).jqGrid("setGridWidth", g.size.width, a.shrinkToFit);
                        a._stop_ && a._stop_.call(d, e, g)
                    };
                    a.alsoResize = a._alsoResize_ ? eval("(" + ("{'#gview_" + c + " .ui-jqgrid-bdiv':true,'" + a._alsoResize_ + "':true}") + ")") : b(".ui-jqgrid-bdiv", "#gview_" + c);
                    delete a._alsoResize_;
                    b("#gbox_" + c).resizable(a)
                }
            })
        }
    })
})(jQuery);
