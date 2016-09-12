! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./blueimp-helper"], t) : (window.blueimp = window.blueimp || {}, window.blueimp.Gallery = t(window.blueimp.helper || window.jQuery))
}(function(t) {
    "use strict";

    function e(t, i) {
        return void 0 === document.body.style.maxHeight ? null : this && this.options === e.prototype.options ? t && t.length ? (this.list = t, this.num = t.length, this.initOptions(i), void this.initialize()) : void this.console.log("blueimp Gallery: No or empty list provided as first argument.", t) : new e(t, i)
    }
    return t.extend(e.prototype, {
        options: {
            container: "#blueimp-gallery",
            slidesContainer: "div",
            titleElement: "h3",
            displayClass: "blueimp-gallery-display",
            controlsClass: "blueimp-gallery-controls",
            singleClass: "blueimp-gallery-single",
            leftEdgeClass: "blueimp-gallery-left",
            rightEdgeClass: "blueimp-gallery-right",
            playingClass: "blueimp-gallery-playing",
            slideClass: "slide",
            slideLoadingClass: "slide-loading",
            slideErrorClass: "slide-error",
            slideContentClass: "slide-content",
            toggleClass: "toggle",
            prevClass: "prev",
            nextClass: "next",
            closeClass: "close",
            playPauseClass: "play-pause",
            typeProperty: "type",
            titleProperty: "title",
            urlProperty: "href",
            srcsetProperty: "urlset",
            displayTransition: !0,
            clearSlides: !0,
            stretchImages: !1,
            toggleControlsOnReturn: !0,
            toggleControlsOnSlideClick: !0,
            toggleSlideshowOnSpace: !0,
            enableKeyboardNavigation: !0,
            closeOnEscape: !0,
            closeOnSlideClick: !0,
            closeOnSwipeUpOrDown: !0,
            emulateTouchEvents: !0,
            stopTouchEventsPropagation: !1,
            hidePageScrollbars: !0,
            disableScroll: !0,
            carousel: !1,
            continuous: !0,
            unloadElements: !0,
            startSlideshow: !1,
            slideshowInterval: 5e3,
            index: 0,
            preloadRange: 2,
            transitionSpeed: 400,
            slideshowTransitionSpeed: void 0,
            event: void 0,
            onopen: void 0,
            onopened: void 0,
            onslide: void 0,
            onslideend: void 0,
            onslidecomplete: void 0,
            onclose: void 0,
            onclosed: void 0
        },
        carouselOptions: {
            hidePageScrollbars: !1,
            toggleControlsOnReturn: !1,
            toggleSlideshowOnSpace: !1,
            enableKeyboardNavigation: !1,
            closeOnEscape: !1,
            closeOnSlideClick: !1,
            closeOnSwipeUpOrDown: !1,
            disableScroll: !1,
            startSlideshow: !0
        },
        console: window.console && "function" == typeof window.console.log ? window.console : {
            log: function() {}
        },
        support: function(e) {
            function i() {
                var t, i, s = o.transition;
                document.body.appendChild(e), s && (t = s.name.slice(0, -9) + "ransform", void 0 !== e.style[t] && (e.style[t] = "translateZ(0)", i = window.getComputedStyle(e).getPropertyValue(s.prefix + "transform"), o.transform = {
                    prefix: s.prefix,
                    name: t,
                    translate: !0,
                    translateZ: !!i && "none" !== i
                })), void 0 !== e.style.backgroundSize && (o.backgroundSize = {}, e.style.backgroundSize = "contain", o.backgroundSize.contain = "contain" === window.getComputedStyle(e).getPropertyValue("background-size"), e.style.backgroundSize = "cover", o.backgroundSize.cover = "cover" === window.getComputedStyle(e).getPropertyValue("background-size")), document.body.removeChild(e)
            }
            var s, o = {
                    touch: void 0 !== window.ontouchstart || window.DocumentTouch && document instanceof DocumentTouch
                },
                n = {
                    webkitTransition: {
                        end: "webkitTransitionEnd",
                        prefix: "-webkit-"
                    },
                    MozTransition: {
                        end: "transitionend",
                        prefix: "-moz-"
                    },
                    OTransition: {
                        end: "otransitionend",
                        prefix: "-o-"
                    },
                    transition: {
                        end: "transitionend",
                        prefix: ""
                    }
                };
            for (s in n)
                if (n.hasOwnProperty(s) && void 0 !== e.style[s]) {
                    o.transition = n[s], o.transition.name = s;
                    break
                }
            return document.body ? i() : t(document).on("DOMContentLoaded", i), o
        }(document.createElement("div")),
        requestAnimationFrame: window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame,
        initialize: function() {
            return this.initStartIndex(), this.initWidget() === !1 ? !1 : (this.initEventListeners(), this.onslide(this.index), this.ontransitionend(), void(this.options.startSlideshow && this.play()))
        },
        slide: function(t, e) {
            window.clearTimeout(this.timeout);
            var i, s, o, n = this.index;
            if (n !== t && 1 !== this.num) {
                if (e || (e = this.options.transitionSpeed), this.support.transform) {
                    for (this.options.continuous || (t = this.circle(t)), i = Math.abs(n - t) / (n - t), this.options.continuous && (s = i, i = -this.positions[this.circle(t)] / this.slideWidth, i !== s && (t = -i * this.num + t)), o = Math.abs(n - t) - 1; o;) o -= 1, this.move(this.circle((t > n ? t : n) - o - 1), this.slideWidth * i, 0);
                    t = this.circle(t), this.move(n, this.slideWidth * i, e), this.move(t, 0, e), this.options.continuous && this.move(this.circle(t - i), -(this.slideWidth * i), 0)
                } else t = this.circle(t), this.animate(n * -this.slideWidth, t * -this.slideWidth, e);
                this.onslide(t)
            }
        },
        getIndex: function() {
            return this.index
        },
        getNumber: function() {
            return this.num
        },
        prev: function() {
            (this.options.continuous || this.index) && this.slide(this.index - 1)
        },
        next: function() {
            (this.options.continuous || this.index < this.num - 1) && this.slide(this.index + 1)
        },
        play: function(t) {
            var e = this;
            window.clearTimeout(this.timeout), this.interval = t || this.options.slideshowInterval, this.elements[this.index] > 1 && (this.timeout = this.setTimeout(!this.requestAnimationFrame && this.slide || function(t, i) {
                e.animationFrameId = e.requestAnimationFrame.call(window, function() {
                    e.slide(t, i)
                })
            }, [this.index + 1, this.options.slideshowTransitionSpeed], this.interval)), this.container.addClass(this.options.playingClass)
        },
        pause: function() {
            window.clearTimeout(this.timeout), this.interval = null, this.container.removeClass(this.options.playingClass)
        },
        add: function(t) {
            var e;
            for (t.concat || (t = Array.prototype.slice.call(t)), this.list.concat || (this.list = Array.prototype.slice.call(this.list)), this.list = this.list.concat(t), this.num = this.list.length, this.num > 2 && null === this.options.continuous && (this.options.continuous = !0, this.container.removeClass(this.options.leftEdgeClass)), this.container.removeClass(this.options.rightEdgeClass).removeClass(this.options.singleClass), e = this.num - t.length; e < this.num; e += 1) this.addSlide(e), this.positionSlide(e);
            this.positions.length = this.num, this.initSlides(!0)
        },
        resetSlides: function() {
            this.slidesContainer.empty(), this.unloadAllSlides(), this.slides = []
        },
        handleClose: function() {
            var t = this.options;
            this.destroyEventListeners(), this.pause(), this.container[0].style.display = "none", this.container.removeClass(t.displayClass).removeClass(t.singleClass).removeClass(t.leftEdgeClass).removeClass(t.rightEdgeClass), t.hidePageScrollbars && (document.body.style.overflow = this.bodyOverflowStyle), this.options.clearSlides && this.resetSlides(), this.options.onclosed && this.options.onclosed.call(this)
        },
        close: function() {
            function t(i) {
                i.target === e.container[0] && (e.container.off(e.support.transition.end, t), e.handleClose())
            }
            var e = this;
            this.options.onclose && this.options.onclose.call(this), this.support.transition && this.options.displayTransition ? (this.container.on(this.support.transition.end, t), this.container.removeClass(this.options.displayClass)) : this.handleClose()
        },
        circle: function(t) {
            return (this.num + t % this.num) % this.num
        },
        move: function(t, e, i) {
            this.translateX(t, e, i), this.positions[t] = e
        },
        translate: function(t, e, i, s) {
            var o = this.slides[t].style,
                n = this.support.transition,
                l = this.support.transform;
            o[n.name + "Duration"] = s + "ms", o[l.name] = "translate(" + e + "px, " + i + "px)" + (l.translateZ ? " translateZ(0)" : "")
        },
        translateX: function(t, e, i) {
            this.translate(t, e, 0, i)
        },
        translateY: function(t, e, i) {
            this.translate(t, 0, e, i)
        },
        animate: function(t, e, i) {
            if (!i) return void(this.slidesContainer[0].style.left = e + "px");
            var s = this,
                o = (new Date).getTime(),
                n = window.setInterval(function() {
                    var l = (new Date).getTime() - o;
                    return l > i ? (s.slidesContainer[0].style.left = e + "px", s.ontransitionend(), void window.clearInterval(n)) : void(s.slidesContainer[0].style.left = (e - t) * (Math.floor(l / i * 100) / 100) + t + "px")
                }, 4)
        },
        preventDefault: function(t) {
            t.preventDefault ? t.preventDefault() : t.returnValue = !1
        },
        stopPropagation: function(t) {
            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
        },
        onresize: function() {
            this.initSlides(!0)
        },
        onmousedown: function(t) {
            t.which && 1 === t.which && "VIDEO" !== t.target.nodeName && (t.preventDefault(), (t.originalEvent || t).touches = [{
                pageX: t.pageX,
                pageY: t.pageY
            }], this.ontouchstart(t))
        },
        onmousemove: function(t) {
            this.touchStart && ((t.originalEvent || t).touches = [{
                pageX: t.pageX,
                pageY: t.pageY
            }], this.ontouchmove(t))
        },
        onmouseup: function(t) {
            this.touchStart && (this.ontouchend(t), delete this.touchStart)
        },
        onmouseout: function(e) {
            if (this.touchStart) {
                var i = e.target,
                    s = e.relatedTarget;
                (!s || s !== i && !t.contains(i, s)) && this.onmouseup(e)
            }
        },
        ontouchstart: function(t) {
            this.options.stopTouchEventsPropagation && this.stopPropagation(t);
            var e = (t.originalEvent || t).touches[0];
            this.touchStart = {
                x: e.pageX,
                y: e.pageY,
                time: Date.now()
            }, this.isScrolling = void 0, this.touchDelta = {}
        },
        ontouchmove: function(t) {
            this.options.stopTouchEventsPropagation && this.stopPropagation(t);
            var e, i, s = (t.originalEvent || t).touches[0],
                o = (t.originalEvent || t).scale,
                n = this.index;
            if (!(s.length > 1 || o && 1 !== o))
                if (this.options.disableScroll && t.preventDefault(), this.touchDelta = {
                        x: s.pageX - this.touchStart.x,
                        y: s.pageY - this.touchStart.y
                    }, e = this.touchDelta.x, void 0 === this.isScrolling && (this.isScrolling = this.isScrolling || Math.abs(e) < Math.abs(this.touchDelta.y)), this.isScrolling) this.options.closeOnSwipeUpOrDown && this.translateY(n, this.touchDelta.y + this.positions[n], 0);
                else
                    for (t.preventDefault(), window.clearTimeout(this.timeout), this.options.continuous ? i = [this.circle(n + 1), n, this.circle(n - 1)] : (this.touchDelta.x = e /= !n && e > 0 || n === this.num - 1 && 0 > e ? Math.abs(e) / this.slideWidth + 1 : 1, i = [n], n && i.push(n - 1), n < this.num - 1 && i.unshift(n + 1)); i.length;) n = i.pop(), this.translateX(n, e + this.positions[n], 0)
        },
        ontouchend: function(t) {
            this.options.stopTouchEventsPropagation && this.stopPropagation(t);
            var e, i, s, o, n, l = this.index,
                a = this.options.transitionSpeed,
                r = this.slideWidth,
                h = Number(Date.now() - this.touchStart.time) < 250,
                d = h && Math.abs(this.touchDelta.x) > 20 || Math.abs(this.touchDelta.x) > r / 2,
                c = !l && this.touchDelta.x > 0 || l === this.num - 1 && this.touchDelta.x < 0,
                u = !d && this.options.closeOnSwipeUpOrDown && (h && Math.abs(this.touchDelta.y) > 20 || Math.abs(this.touchDelta.y) > this.slideHeight / 2);
            this.options.continuous && (c = !1), e = this.touchDelta.x < 0 ? -1 : 1, this.isScrolling ? u ? this.close() : this.translateY(l, 0, a) : d && !c ? (i = l + e, s = l - e, o = r * e, n = -r * e, this.options.continuous ? (this.move(this.circle(i), o, 0), this.move(this.circle(l - 2 * e), n, 0)) : i >= 0 && i < this.num && this.move(i, o, 0), this.move(l, this.positions[l] + o, a), this.move(this.circle(s), this.positions[this.circle(s)] + o, a), l = this.circle(s), this.onslide(l)) : this.options.continuous ? (this.move(this.circle(l - 1), -r, a), this.move(l, 0, a), this.move(this.circle(l + 1), r, a)) : (l && this.move(l - 1, -r, a), this.move(l, 0, a), l < this.num - 1 && this.move(l + 1, r, a))
        },
        ontouchcancel: function(t) {
            this.touchStart && (this.ontouchend(t), delete this.touchStart)
        },
        ontransitionend: function(t) {
            var e = this.slides[this.index];
            t && e !== t.target || (this.interval && this.play(), this.setTimeout(this.options.onslideend, [this.index, e]))
        },
        oncomplete: function(e) {
            var i, s = e.target || e.srcElement,
                o = s && s.parentNode;
            s && o && (i = this.getNodeIndex(o), t(o).removeClass(this.options.slideLoadingClass), "error" === e.type ? (t(o).addClass(this.options.slideErrorClass), this.elements[i] = 3) : this.elements[i] = 2, s.clientHeight > this.container[0].clientHeight && (s.style.maxHeight = this.container[0].clientHeight), this.interval && this.slides[this.index] === o && this.play(), this.setTimeout(this.options.onslidecomplete, [i, o]))
        },
        onload: function(t) {
            this.oncomplete(t)
        },
        onerror: function(t) {
            this.oncomplete(t)
        },
        onkeydown: function(t) {
            switch (t.which || t.keyCode) {
                case 13:
                    this.options.toggleControlsOnReturn && (this.preventDefault(t), this.toggleControls());
                    break;
                case 27:
                    this.options.closeOnEscape && (this.close(), t.stopImmediatePropagation());
                    break;
                case 32:
                    this.options.toggleSlideshowOnSpace && (this.preventDefault(t), this.toggleSlideshow());
                    break;
                case 37:
                    this.options.enableKeyboardNavigation && (this.preventDefault(t), this.prev());
                    break;
                case 39:
                    this.options.enableKeyboardNavigation && (this.preventDefault(t), this.next())
            }
        },
        handleClick: function(e) {
            function i(e) {
                return t(o).hasClass(e) || t(n).hasClass(e)
            }
            var s = this.options,
                o = e.target || e.srcElement,
                n = o.parentNode;
            i(s.toggleClass) ? (this.preventDefault(e), this.toggleControls()) : i(s.prevClass) ? (this.preventDefault(e), this.prev()) : i(s.nextClass) ? (this.preventDefault(e), this.next()) : i(s.closeClass) ? (this.preventDefault(e), this.close()) : i(s.playPauseClass) ? (this.preventDefault(e), this.toggleSlideshow()) : n === this.slidesContainer[0] ? s.closeOnSlideClick ? (this.preventDefault(e), this.close()) : s.toggleControlsOnSlideClick && (this.preventDefault(e), this.toggleControls()) : n.parentNode && n.parentNode === this.slidesContainer[0] && s.toggleControlsOnSlideClick && (this.preventDefault(e), this.toggleControls())
        },
        onclick: function(t) {
            return this.options.emulateTouchEvents && this.touchDelta && (Math.abs(this.touchDelta.x) > 20 || Math.abs(this.touchDelta.y) > 20) ? void delete this.touchDelta : this.handleClick(t)
        },
        updateEdgeClasses: function(t) {
            t ? this.container.removeClass(this.options.leftEdgeClass) : this.container.addClass(this.options.leftEdgeClass), t === this.num - 1 ? this.container.addClass(this.options.rightEdgeClass) : this.container.removeClass(this.options.rightEdgeClass)
        },
        handleSlide: function(t) {
            this.options.continuous || this.updateEdgeClasses(t), this.loadElements(t), this.options.unloadElements && this.unloadElements(t), this.setTitle(t)
        },
        onslide: function(t) {
            this.index = t, this.handleSlide(t), this.setTimeout(this.options.onslide, [t, this.slides[t]])
        },
        setTitle: function(t) {
            var e = this.slides[t].firstChild.title,
                i = this.titleElement;
            i.length && (this.titleElement.empty(), e && i[0].appendChild(document.createTextNode(e)))
        },
        setTimeout: function(t, e, i) {
            var s = this;
            return t && window.setTimeout(function() {
                t.apply(s, e || [])
            }, i || 0)
        },
        imageFactory: function(e, i) {
            function s(e) {
                if (!o) {
                    if (e = {
                            type: e.type,
                            target: n
                        }, !n.parentNode) return a.setTimeout(s, [e]);
                    o = !0, t(r).off("load error", s), d && "load" === e.type && (n.style.background = 'url("' + h + '") center no-repeat', n.style.backgroundSize = d), i(e)
                }
            }
            var o, n, l, a = this,
                r = this.imagePrototype.cloneNode(!1),
                h = e,
                d = this.options.stretchImages;
            return "string" != typeof h && (h = this.getItemProperty(e, this.options.urlProperty), l = this.getItemProperty(e, this.options.titleProperty)), d === !0 && (d = "contain"), d = this.support.backgroundSize && this.support.backgroundSize[d] && d, d ? n = this.elementPrototype.cloneNode(!1) : (n = r, r.draggable = !1), l && (n.title = l), t(r).on("load error", s), r.src = h, n
        },
        createElement: function(e, i) {
            var s = e && this.getItemProperty(e, this.options.typeProperty),
                o = s && this[s.split("/")[0] + "Factory"] || this.imageFactory,
                n = e && o.call(this, e, i),
                l = this.getItemProperty(e, this.options.srcsetProperty);
            return n || (n = this.elementPrototype.cloneNode(!1), this.setTimeout(i, [{
                type: "error",
                target: n
            }])), l && n.setAttribute("srcset", l), t(n).addClass(this.options.slideContentClass), n
        },
        loadElement: function(e) {
            this.elements[e] || (this.slides[e].firstChild ? this.elements[e] = t(this.slides[e]).hasClass(this.options.slideErrorClass) ? 3 : 2 : (this.elements[e] = 1, t(this.slides[e]).addClass(this.options.slideLoadingClass), this.slides[e].appendChild(this.createElement(this.list[e], this.proxyListener))))
        },
        loadElements: function(t) {
            var e, i = Math.min(this.num, 2 * this.options.preloadRange + 1),
                s = t;
            for (e = 0; i > e; e += 1) s += e * (e % 2 === 0 ? -1 : 1), s = this.circle(s), this.loadElement(s)
        },
        unloadElements: function(t) {
            var e, i;
            for (e in this.elements) this.elements.hasOwnProperty(e) && (i = Math.abs(t - e), i > this.options.preloadRange && i + this.options.preloadRange < this.num && (this.unloadSlide(e), delete this.elements[e]))
        },
        addSlide: function(t) {
            var e = this.slidePrototype.cloneNode(!1);
            e.setAttribute("data-index", t), this.slidesContainer[0].appendChild(e), this.slides.push(e)
        },
        positionSlide: function(t) {
            var e = this.slides[t];
            e.style.width = this.slideWidth + "px", this.support.transform && (e.style.left = t * -this.slideWidth + "px", this.move(t, this.index > t ? -this.slideWidth : this.index < t ? this.slideWidth : 0, 0))
        },
        initSlides: function(e) {
            var i, s;
            for (e || (this.positions = [], this.positions.length = this.num, this.elements = {}, this.imagePrototype = document.createElement("img"), this.elementPrototype = document.createElement("div"), this.slidePrototype = document.createElement("div"), t(this.slidePrototype).addClass(this.options.slideClass), this.slides = this.slidesContainer[0].children, i = this.options.clearSlides || this.slides.length !== this.num), this.slideWidth = this.container[0].offsetWidth, this.slideHeight = this.container[0].offsetHeight, this.slidesContainer[0].style.width = this.num * this.slideWidth + "px", i && this.resetSlides(), s = 0; s < this.num; s += 1) i && this.addSlide(s), this.positionSlide(s);
            this.options.continuous && this.support.transform && (this.move(this.circle(this.index - 1), -this.slideWidth, 0), this.move(this.circle(this.index + 1), this.slideWidth, 0)), this.support.transform || (this.slidesContainer[0].style.left = this.index * -this.slideWidth + "px")
        },
        unloadSlide: function(t) {
            var e, i;
            e = this.slides[t], i = e.firstChild, null !== i && e.removeChild(i)
        },
        unloadAllSlides: function() {
            var t, e;
            for (t = 0, e = this.slides.length; e > t; t++) this.unloadSlide(t)
        },
        toggleControls: function() {
            var t = this.options.controlsClass;
            this.container.hasClass(t) ? this.container.removeClass(t) : this.container.addClass(t)
        },
        toggleSlideshow: function() {
            this.interval ? this.pause() : this.play()
        },
        getNodeIndex: function(t) {
            return parseInt(t.getAttribute("data-index"), 10)
        },
        getNestedProperty: function(t, e) {
            return e.replace(/\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g, function(e, i, s, o, n) {
                var l = n || i || s || o && parseInt(o, 10);
                e && t && (t = t[l])
            }), t
        },
        getDataProperty: function(e, i) {
            if (e.getAttribute) {
                var s = e.getAttribute("data-" + i.replace(/([A-Z])/g, "-$1").toLowerCase());
                if ("string" == typeof s) {
                    if (/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/.test(s)) try {
                        return t.parseJSON(s)
                    } catch (o) {}
                    return s
                }
            }
        },
        getItemProperty: function(t, e) {
            var i = t[e];
            return void 0 === i && (i = this.getDataProperty(t, e), void 0 === i && (i = this.getNestedProperty(t, e))), i
        },
        initStartIndex: function() {
            var t, e = this.options.index,
                i = this.options.urlProperty;
            if (e && "number" != typeof e)
                for (t = 0; t < this.num; t += 1)
                    if (this.list[t] === e || this.getItemProperty(this.list[t], i) === this.getItemProperty(e, i)) {
                        e = t;
                        break
                    }
            this.index = this.circle(parseInt(e, 10) || 0)
        },
        initEventListeners: function() {
            function e(t) {
                var e = i.support.transition && i.support.transition.end === t.type ? "transitionend" : t.type;
                i["on" + e](t)
            }
            var i = this,
                s = this.slidesContainer;
            t(window).on("resize", e), t(document.body).on("keydown", e), this.container.on("click", e), this.support.touch ? s.on("touchstart touchmove touchend touchcancel", e) : this.options.emulateTouchEvents && this.support.transition && s.on("mousedown mousemove mouseup mouseout", e), this.support.transition && s.on(this.support.transition.end, e), this.proxyListener = e
        },
        destroyEventListeners: function() {
            var e = this.slidesContainer,
                i = this.proxyListener;
            t(window).off("resize", i), t(document.body).off("keydown", i), this.container.off("click", i), this.support.touch ? e.off("touchstart touchmove touchend touchcancel", i) : this.options.emulateTouchEvents && this.support.transition && e.off("mousedown mousemove mouseup mouseout", i), this.support.transition && e.off(this.support.transition.end, i)
        },
        handleOpen: function() {
            this.options.onopened && this.options.onopened.call(this)
        },
        initWidget: function() {
            function e(t) {
                t.target === i.container[0] && (i.container.off(i.support.transition.end, e), i.handleOpen())
            }
            var i = this;
            return this.container = t(this.options.container), this.container.length ? (this.slidesContainer = this.container.find(this.options.slidesContainer).first(), this.slidesContainer.length ? (this.titleElement = this.container.find(this.options.titleElement).first(), 1 === this.num && this.container.addClass(this.options.singleClass), this.options.onopen && this.options.onopen.call(this), this.support.transition && this.options.displayTransition ? this.container.on(this.support.transition.end, e) : this.handleOpen(), this.options.hidePageScrollbars && (this.bodyOverflowStyle = document.body.style.overflow, document.body.style.overflow = "hidden"), this.container[0].style.display = "block", this.initSlides(), void this.container.addClass(this.options.displayClass)) : (this.console.log("blueimp Gallery: Slides container not found.", this.options.slidesContainer), !1)) : (this.console.log("blueimp Gallery: Widget container not found.", this.options.container), !1)
        },
        initOptions: function(e) {
            this.options = t.extend({}, this.options), (e && e.carousel || this.options.carousel && (!e || e.carousel !== !1)) && t.extend(this.options, this.carouselOptions), t.extend(this.options, e), this.num < 3 && (this.options.continuous = this.options.continuous ? null : !1), this.support.transition || (this.options.emulateTouchEvents = !1), this.options.event && this.preventDefault(this.options.event)
        }
    }), e
}),
function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./blueimp-helper", "./blueimp-gallery"], t) : t(window.blueimp.helper || window.jQuery, window.blueimp.Gallery)
}(function(t, e) {
    "use strict";
    t.extend(e.prototype.options, {
        fullScreen: !1
    });
    var i = e.prototype.initialize,
        s = e.prototype.close;
    return t.extend(e.prototype, {
        getFullScreenElement: function() {
            return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
        },
        requestFullScreen: function(t) {
            t.requestFullscreen ? t.requestFullscreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.msRequestFullscreen && t.msRequestFullscreen()
        },
        exitFullScreen: function() {
            document.exitFullscreen ? document.exitFullscreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
        },
        initialize: function() {
            i.call(this), this.options.fullScreen && !this.getFullScreenElement() && this.requestFullScreen(this.container[0])
        },
        close: function() {
            this.getFullScreenElement() === this.container[0] && this.exitFullScreen(), s.call(this)
        }
    }), e
}),
function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./blueimp-helper", "./blueimp-gallery"], t) : t(window.blueimp.helper || window.jQuery, window.blueimp.Gallery)
}(function(t, e) {
    "use strict";
    t.extend(e.prototype.options, {
        indicatorContainer: "ol",
        activeIndicatorClass: "active",
        thumbnailProperty: "thumbnail",
        thumbnailIndicators: !0
    });
    var i = e.prototype.initSlides,
        s = e.prototype.addSlide,
        o = e.prototype.resetSlides,
        n = e.prototype.handleClick,
        l = e.prototype.handleSlide,
        a = e.prototype.handleClose;
    return t.extend(e.prototype, {
        createIndicator: function(e) {
            var i, s, o = this.indicatorPrototype.cloneNode(!1),
                n = this.getItemProperty(e, this.options.titleProperty),
                l = this.options.thumbnailProperty;
            return this.options.thumbnailIndicators && (l && (i = this.getItemProperty(e, l)), void 0 === i && (s = e.getElementsByTagName && t(e).find("img")[0], s && (i = s.src)), i && (o.style.backgroundImage = 'url("' + i + '")')), n && (o.title = n), o
        },
        addIndicator: function(t) {
            if (this.indicatorContainer.length) {
                var e = this.createIndicator(this.list[t]);
                e.setAttribute("data-index", t), this.indicatorContainer[0].appendChild(e), this.indicators.push(e)
            }
        },
        setActiveIndicator: function(e) {
            this.indicators && (this.activeIndicator && this.activeIndicator.removeClass(this.options.activeIndicatorClass), this.activeIndicator = t(this.indicators[e]), this.activeIndicator.addClass(this.options.activeIndicatorClass))
        },
        initSlides: function(t) {
            t || (this.indicatorContainer = this.container.find(this.options.indicatorContainer), this.indicatorContainer.length && (this.indicatorPrototype = document.createElement("li"), this.indicators = this.indicatorContainer[0].children)), i.call(this, t)
        },
        addSlide: function(t) {
            s.call(this, t), this.addIndicator(t)
        },
        resetSlides: function() {
            o.call(this), this.indicatorContainer.empty(), this.indicators = []
        },
        handleClick: function(t) {
            var e = t.target || t.srcElement,
                i = e.parentNode;
            if (i === this.indicatorContainer[0]) this.preventDefault(t), this.slide(this.getNodeIndex(e));
            else {
                if (i.parentNode !== this.indicatorContainer[0]) return n.call(this, t);
                this.preventDefault(t), this.slide(this.getNodeIndex(i))
            }
        },
        handleSlide: function(t) {
            l.call(this, t), this.setActiveIndicator(t)
        },
        handleClose: function() {
            this.activeIndicator && this.activeIndicator.removeClass(this.options.activeIndicatorClass), a.call(this)
        }
    }), e
}),
function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./blueimp-helper", "./blueimp-gallery"], t) : t(window.blueimp.helper || window.jQuery, window.blueimp.Gallery)
}(function(t, e) {
    "use strict";
    t.extend(e.prototype.options, {
        videoContentClass: "video-content",
        videoLoadingClass: "video-loading",
        videoPlayingClass: "video-playing",
        videoPosterProperty: "poster",
        videoSourcesProperty: "sources"
    });
    var i = e.prototype.handleSlide;
    return t.extend(e.prototype, {
        handleSlide: function(t) {
            i.call(this, t), this.playingVideo && this.playingVideo.pause()
        },
        videoFactory: function(e, i, s) {
            var o, n, l, a, r, h = this,
                d = this.options,
                c = this.elementPrototype.cloneNode(!1),
                u = t(c),
                p = [{
                    type: "error",
                    target: c
                }],
                y = s || document.createElement("video"),
                m = this.getItemProperty(e, d.urlProperty),
                f = this.getItemProperty(e, d.typeProperty),
                g = this.getItemProperty(e, d.titleProperty),
                v = this.getItemProperty(e, d.videoPosterProperty),
                C = this.getItemProperty(e, d.videoSourcesProperty);
            if (u.addClass(d.videoContentClass), g && (c.title = g), y.canPlayType)
                if (m && f && y.canPlayType(f)) y.src = m;
                else
                    for (; C && C.length;)
                        if (n = C.shift(), m = this.getItemProperty(n, d.urlProperty), f = this.getItemProperty(n, d.typeProperty), m && f && y.canPlayType(f)) {
                            y.src = m;
                            break
                        }
            return v && (y.poster = v, o = this.imagePrototype.cloneNode(!1), t(o).addClass(d.toggleClass), o.src = v, o.draggable = !1, c.appendChild(o)), l = document.createElement("a"), l.setAttribute("target", "_blank"), s || l.setAttribute("download", g), l.href = m, y.src && (y.controls = !0, (s || t(y)).on("error", function() {
                h.setTimeout(i, p)
            }).on("pause", function() {
                y.seeking || (a = !1, u.removeClass(h.options.videoLoadingClass).removeClass(h.options.videoPlayingClass), r && h.container.addClass(h.options.controlsClass), delete h.playingVideo, h.interval && h.play())
            }).on("playing", function() {
                a = !1, u.removeClass(h.options.videoLoadingClass).addClass(h.options.videoPlayingClass), h.container.hasClass(h.options.controlsClass) ? (r = !0, h.container.removeClass(h.options.controlsClass)) : r = !1
            }).on("play", function() {
                window.clearTimeout(h.timeout), a = !0, u.addClass(h.options.videoLoadingClass), h.playingVideo = y
            }), t(l).on("click", function(t) {
                h.preventDefault(t), a ? y.pause() : y.play()
            }), c.appendChild(s && s.element || y)), c.appendChild(l), this.setTimeout(i, [{
                type: "load",
                target: c
            }]), c
        }
    }), e
}),
function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./blueimp-helper", "./blueimp-gallery-video"], t) : t(window.blueimp.helper || window.jQuery, window.blueimp.Gallery)
}(function(t, e) {
    "use strict";
    if (!window.postMessage) return e;
    t.extend(e.prototype.options, {
        vimeoVideoIdProperty: "vimeo",
        vimeoPlayerUrl: "//player.vimeo.com/video/VIDEO_ID?api=1&player_id=PLAYER_ID",
        vimeoPlayerIdPrefix: "vimeo-player-",
        vimeoClickToPlay: !0
    });
    var i = e.prototype.textFactory || e.prototype.imageFactory,
        s = function(t, e, i, s) {
            this.url = t, this.videoId = e, this.playerId = i, this.clickToPlay = s, this.element = document.createElement("div"), this.listeners = {}
        },
        o = 0;
    return t.extend(s.prototype, {
        canPlayType: function() {
            return !0
        },
        on: function(t, e) {
            return this.listeners[t] = e, this
        },
        loadAPI: function() {
            function e() {
                !s && o.playOnReady && o.play(), s = !0
            }
            for (var i, s, o = this, n = "//f.vimeocdn.com/js/froogaloop2.min.js", l = document.getElementsByTagName("script"), a = l.length; a;)
                if (a -= 1, l[a].src === n) {
                    i = l[a];
                    break
                }
            i || (i = document.createElement("script"), i.src = n), t(i).on("load", e), l[0].parentNode.insertBefore(i, l[0]), /loaded|complete/.test(i.readyState) && e()
        },
        onReady: function() {
            var t = this;
            this.ready = !0, this.player.addEvent("play", function() {
                t.hasPlayed = !0, t.onPlaying()
            }), this.player.addEvent("pause", function() {
                t.onPause()
            }), this.player.addEvent("finish", function() {
                t.onPause()
            }), this.playOnReady && this.play()
        },
        onPlaying: function() {
            this.playStatus < 2 && (this.listeners.playing(), this.playStatus = 2)
        },
        onPause: function() {
            this.listeners.pause(), delete this.playStatus
        },
        insertIframe: function() {
            var t = document.createElement("iframe");
            t.src = this.url.replace("VIDEO_ID", this.videoId).replace("PLAYER_ID", this.playerId), t.id = this.playerId, this.element.parentNode.replaceChild(t, this.element), this.element = t
        },
        play: function() {
            var t = this;
            this.playStatus || (this.listeners.play(), this.playStatus = 1), this.ready ? !this.hasPlayed && (this.clickToPlay || window.navigator && /iP(hone|od|ad)/.test(window.navigator.platform)) ? this.onPlaying() : this.player.api("play") : (this.playOnReady = !0, window.$f ? this.player || (this.insertIframe(), this.player = $f(this.element), this.player.addEvent("ready", function() {
                t.onReady()
            })) : this.loadAPI())
        },
        pause: function() {
            this.ready ? this.player.api("pause") : this.playStatus && (delete this.playOnReady, this.listeners.pause(), delete this.playStatus)
        }
    }), t.extend(e.prototype, {
        VimeoPlayer: s,
        textFactory: function(t, e) {
            var n = this.options,
                l = this.getItemProperty(t, n.vimeoVideoIdProperty);
            return l ? (void 0 === this.getItemProperty(t, n.urlProperty) && (t[n.urlProperty] = "//vimeo.com/" + l), o += 1, this.videoFactory(t, e, new s(n.vimeoPlayerUrl, l, n.vimeoPlayerIdPrefix + o, n.vimeoClickToPlay))) : i.call(this, t, e)
        }
    }), e
}),
function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./blueimp-helper", "./blueimp-gallery-video"], t) : t(window.blueimp.helper || window.jQuery, window.blueimp.Gallery)
}(function(t, e) {
    "use strict";
    if (!window.postMessage) return e;
    t.extend(e.prototype.options, {
        youTubeVideoIdProperty: "youtube",
        youTubePlayerVars: {
            wmode: "transparent"
        },
        youTubeClickToPlay: !0
    });
    var i = e.prototype.textFactory || e.prototype.imageFactory,
        s = function(t, e, i) {
            this.videoId = t, this.playerVars = e, this.clickToPlay = i, this.element = document.createElement("div"), this.listeners = {}
        };
    return t.extend(s.prototype, {
        canPlayType: function() {
            return !0
        },
        on: function(t, e) {
            return this.listeners[t] = e, this
        },
        loadAPI: function() {
            var t, e = this,
                i = window.onYouTubeIframeAPIReady,
                s = "//www.youtube.com/iframe_api",
                o = document.getElementsByTagName("script"),
                n = o.length;
            for (window.onYouTubeIframeAPIReady = function() {
                    i && i.apply(this), e.playOnReady && e.play()
                }; n;)
                if (n -= 1, o[n].src === s) return;
            t = document.createElement("script"), t.src = s, o[0].parentNode.insertBefore(t, o[0])
        },
        onReady: function() {
            this.ready = !0, this.playOnReady && this.play()
        },
        onPlaying: function() {
            this.playStatus < 2 && (this.listeners.playing(), this.playStatus = 2)
        },
        onPause: function() {
            e.prototype.setTimeout.call(this, this.checkSeek, null, 2e3)
        },
        checkSeek: function() {
            (this.stateChange === YT.PlayerState.PAUSED || this.stateChange === YT.PlayerState.ENDED) && (this.listeners.pause(), delete this.playStatus)
        },
        onStateChange: function(t) {
            switch (t.data) {
                case YT.PlayerState.PLAYING:
                    this.hasPlayed = !0, this.onPlaying();
                    break;
                case YT.PlayerState.PAUSED:
                case YT.PlayerState.ENDED:
                    this.onPause()
            }
            this.stateChange = t.data
        },
        onError: function(t) {
            this.listeners.error(t)
        },
        play: function() {
            var t = this;
            this.playStatus || (this.listeners.play(), this.playStatus = 1), this.ready ? !this.hasPlayed && (this.clickToPlay || window.navigator && /iP(hone|od|ad)/.test(window.navigator.platform)) ? this.onPlaying() : this.player.playVideo() : (this.playOnReady = !0, window.YT && YT.Player ? this.player || (this.player = new YT.Player(this.element, {
                videoId: this.videoId,
                playerVars: this.playerVars,
                events: {
                    onReady: function() {
                        t.onReady()
                    },
                    onStateChange: function(e) {
                        t.onStateChange(e)
                    },
                    onError: function(e) {
                        t.onError(e)
                    }
                }
            })) : this.loadAPI())
        },
        pause: function() {
            this.ready ? this.player.pauseVideo() : this.playStatus && (delete this.playOnReady, this.listeners.pause(), delete this.playStatus)
        }
    }), t.extend(e.prototype, {
        YouTubePlayer: s,
        textFactory: function(t, e) {
            var o = this.options,
                n = this.getItemProperty(t, o.youTubeVideoIdProperty);
            return n ? (void 0 === this.getItemProperty(t, o.urlProperty) && (t[o.urlProperty] = "//www.youtube.com/watch?v=" + n), void 0 === this.getItemProperty(t, o.videoPosterProperty) && (t[o.videoPosterProperty] = "//img.youtube.com/vi/" + n + "/maxresdefault.jpg"), this.videoFactory(t, e, new s(n, o.youTubePlayerVars, o.youTubeClickToPlay))) : i.call(this, t, e)
        }
    }), e
}),
function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./blueimp-gallery"], t) : t(window.jQuery, window.blueimp.Gallery)
}(function(t, e) {
    "use strict";
    t(document).on("click", "[data-gallery]", function(i) {
        var s = t(this).data("gallery"),
            o = t(s),
            n = o.length && o || t(e.prototype.options.container),
            l = {
                onopen: function() {
                    n.data("gallery", this).trigger("open")
                },
                onopened: function() {
                    n.trigger("opened")
                },
                onslide: function() {
                    n.trigger("slide", arguments)
                },
                onslideend: function() {
                    n.trigger("slideend", arguments)
                },
                onslidecomplete: function() {
                    n.trigger("slidecomplete", arguments)
                },
                onclose: function() {
                    n.trigger("close")
                },
                onclosed: function() {
                    n.trigger("closed").removeData("gallery")
                }
            },
            a = t.extend(n.data(), {
                container: n[0],
                index: this,
                event: i
            }, l),
            r = t('[data-gallery="' + s + '"]');
        return a.filter && (r = r.filter(a.filter)), new e(r, a)
    })
});
//# sourceMappingURL=jquery.blueimp-gallery.min.js.map
