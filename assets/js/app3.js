var $jscomp = {
  scope: {},
  getGlobal: function(a) {
   return "undefined" != typeof window && window === a ? a : "undefined" != typeof global ? global : a
  }
 };
 $jscomp.global = $jscomp.getGlobal(this);
 $jscomp.initSymbol = function() {
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
  $jscomp.initSymbol = function() {}
 };
 $jscomp.symbolCounter_ = 0;
 $jscomp.Symbol = function(a) {
  return "jscomp_symbol_" + a + $jscomp.symbolCounter_++
 };
 $jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  $jscomp.global.Symbol.iterator || ($jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  $jscomp.initSymbolIterator = function() {}
 };
 $jscomp.makeIterator = function(a) {
  $jscomp.initSymbolIterator();
  if (a[$jscomp.global.Symbol.iterator]) return a[$jscomp.global.Symbol.iterator]();
  if (!(a instanceof Array || "string" == typeof a || a instanceof String)) throw new TypeError(a + " is not iterable");
  var b = 0;
  return {
   next: function() {
    return b == a.length ? {
     done: !0
    } : {
     done: !1,
     value: a[b++]
    }
   }
  }
 };
 $jscomp.arrayFromIterator = function(a) {
  for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
  return c
 };
 $jscomp.arrayFromIterable = function(a) {
  return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a))
 };
 $jscomp.arrayFromArguments = function(a) {
  for (var b = [], c = 0; c < a.length; c++) b.push(a[c]);
  return b
 };
 $jscomp.inherits = function(a, b) {
  function c() {}
  c.prototype = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  for (var d in b)
   if ($jscomp.global.Object.defineProperties) {
    var g = $jscomp.global.Object.getOwnPropertyDescriptor(b, d);
    void 0 !== g && $jscomp.global.Object.defineProperty(a, d, g)
   } else a[d] = b[d]
 };
 var $jscomp$destructuring$var0 = $jscomp.makeIterator(["\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01", "\u767b\u5f55\u6388\u6743\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01", "\u767b\u5f55\u6210\u529f^o^"]),
  NET_ERROR_MSG = $jscomp$destructuring$var0.next().value,
  LOGIN_ERROR_MSG = $jscomp$destructuring$var0.next().value,
  LOGIN_SUCC_MSG = $jscomp$destructuring$var0.next().value;
 
 function getTextReadTime(a) {
  for (var b = 0, c = 0; c < a.length; c++) b = 4 < escape(a.charAt(c)).length ? b + 2 : b + 1;
  return parseInt(b / 900)
 }
 
 function genUidV0() {
  var a = $jscomp.makeIterator(["bDNsU3BxNXM2b1NyRFJ0dFQwa1o=", "MDA="]),
   b = a.next().value,
   a = a.next().value,
   c = uuid.v4(),
   b = md5(c + atob(b)).substring(0, 10);
  return c + atob(a) + b
 }
 
 function toast(a, b) {
  M.toast({
   html: a,
   displayLength: void 0 === b ? 1E3 : b
  })
 }
 
 function warnToast(a, b) {
  M.toast({
   html: '<span style="color: #eeff41;">' + a + "</span>",
   displayLength: void 0 === b ? 3E3 : b
  })
 }
 
 function showServerMsg() {
  if (void 0 === Cookies.get("toast")) return !1;
  var a = Cookies.get("toast").split(":")[0];
  "LOGIN_SUCC_MSG" == a ? toast(LOGIN_SUCC_MSG) : "LOGIN_ERROR_MSG" == a ? warnToast(LOGIN_ERROR_MSG) : console.warn("\u672a\u77e5\u7684\u6d88\u606f\uff1a" + a);
  Cookies.remove("toast")
 }
 
 function getOrSetUid() {
  var a = localStorage.getItem("UID");
  if (a) return a;
  localStorage.setItem("UID", genUidV0());
  return localStorage.getItem("UID")
 }
 
 function hasReadArticle(a) {
  if (getLoginId()) {
   var b = JSON.parse(localStorage.getItem("TOREADS"));
   return !(new Set(b)).has(parseInt(a))
  }
  return localStorage.getItem("READ/" + a)
 }
 
 function setReadArticle(a, b) {
  b = void 0 === b ? null : b;
  if (getLoginId()) {
   var c = JSON.parse(localStorage.getItem("TOREADS")),
    c = new Set(c);
   c.delete(parseInt(a));
   localStorage.setItem("TOREADS", JSON.stringify(Array.from(c)))
  } else localStorage.setItem("READ/" + a, "1");
  null !== b && (c = b.find("i.unread"), c.removeClass("unread").addClass("read"), c.text("check"), b.find(".omrss-title").removeClass("omrss-title-unread").addClass("omrss-title-read"))
 }
 
 function setThirdLinkify() {
  $("#omrss-third").linkify({
   target: "_blank"
  })
 }
 
 function hasLikeArticle(a) {
  return localStorage.getItem("LIKE/" + a)
 }
 
 function setLeaveMsgToday() {
  localStorage.setItem("LMSG/" + (new Date).toDateString(), "1")
 }
 
 function hasLeaveMsgToday() {
  return localStorage.getItem("LMSG/" + (new Date).toDateString())
 }
 
 function setLikeArticle(a) {
  localStorage.setItem("LIKE/" + a, "1")
 }
 
 function hasOpenSrc(a) {
  return localStorage.getItem("OPEN/" + a)
 }
 
 function setOpenSrc(a) {
  localStorage.setItem("OPEN/" + a, "1")
 }
 
 function getSubFeeds() {
  var a = localStorage.getItem("SUBS");
  return a ? JSON.parse(a) : {}
 }
 
 function getUnsubFeeds() {
  var a = localStorage.getItem("UNSUBS");
  return a ? JSON.parse(a) : {}
 }
 
 function subFeed(a) {
  var b = getSubFeeds(),
   c = getUnsubFeeds();
  delete c[a];
  b[a] = 1;
  localStorage.setItem("SUBS", JSON.stringify(b));
  localStorage.setItem("UNSUBS", JSON.stringify(c))
 }
 
 function unsubFeed(a) {
  var b = getSubFeeds(),
   c = getUnsubFeeds();
  delete b[a];
  c[a] = 1;
  localStorage.setItem("SUBS", JSON.stringify(b));
  localStorage.setItem("UNSUBS", JSON.stringify(c))
 }
 
 function isVisitorSubFeed(a) {
  return 1 === getSubFeeds()[a]
 }
 
 function isVisitorUnSubFeed(a) {
  return 1 === getUnsubFeeds()[a]
 }
 
 function enterFullscreen() {
  var a = document.documentElement;
  (a.requestFullscreen || a.webkitRequestFullScreen || a.mozRequestFullScreen || a.msRequestFullscreen).call(a)
 }
 
 function isInFullscreen() {
  return document.fullscreenElement && null !== document.fullscreenElement || document.webkitFullscreenElement && null !== document.webkitFullscreenElement || document.mozFullScreenElement && null !== document.mozFullScreenElement || document.msFullscreenElement && null !== document.msFullscreenElement
 }
 
 function exitFullscreen() {
  try {
   document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
  } catch (a) {
   console.warn("\u9000\u51fa\u5168\u5c4f\u65f6\u9047\u5230\u5f02\u5e38", a.msg)
  }
  return !0
 }
 
 function getCurPage() {
  var a = localStorage.getItem("CURPG");
  return a ? a : "1"
 }
 
 function updateReadStats() {
  var a = $("#omrss-third"),
   b = a.text().trim().length,
   c = a.find("img").length,
   d = a.find("a").length,
   a = "\u9884\u8ba1\u9605\u8bfb\u65f6\u95f4<b> " + (getTextReadTime(a.text().trim()) + parseInt(c / 20) + parseInt(d / 20)) + " </b>\u5206\u949f\uff08\u5171 " + b + " \u4e2a\u5b57\uff0c " + c + " \u5f20\u56fe\u7247\uff0c " + d + " \u4e2a\u94fe\u63a5\uff09";
  $("#omrss-read-stats").html(a)
 }
 
 function updateUnreadCount() {
  var a = JSON.parse(localStorage.getItem("TOREADS")),
   b = 0;
  if (getLoginId()) b = a.length;
  else
   for (var c = 0; c < a.length; c++) localStorage.getItem("READ/" + a[c]) || (b += 1);
  0 < b ? ($("#omrss-unread").html('<a href="#"><span class="new badge">' + b + "</span></a>"), localStorage.setItem("NEW", b.toString())) : $("#omrss-unread").html("");
  return b
 }
 
 function markReadAll(a) {
  for (var b = 0; b < a.length; b++) setReadArticle(a[b])
 }
 
 function setToreadList(a) {
  a = void 0 === a ? !1 : a;
  $.post("/api/lastweek/articles", {
   uid: getOrSetUid(),
   sub_feeds: Object.keys(getSubFeeds()).join(","),
   unsub_feeds: Object.keys(getUnsubFeeds()).join(","),
   ext: window.screen.width + "x" + window.screen.height
  }, function(b) {
   localStorage.setItem("TOREADS", JSON.stringify(b.result));
   b = updateUnreadCount();
   !0 === a && 0 < b && window.Notification && "granted" === Notification.permission && new Notification("\u4f60\u6709 " + b + " \u6761\u672a\u8bfb\u8ba2\u9605", {
    tag: "\u5df1\u601d",
    icon: "https://ohmyrss.com/assets/img/logo.png",
    body: "\u8bf7\u5237\u65b0\u9875\u9762\u540e\u67e5\u770b"
   })
  })
 }
 var lruCache = new Cache(50, !1, new Cache.LocalStorageCacheStorage("OMRSS")),
  cacheVer = "24";
 
 function setLruCache(a, b) {
  return 102400 > b.length && 512 < b.length ? (lruCache.setItem(cacheVer + a, b), !0) : !1
 }
 
 function getLruCache(a) {
  return lruCache.getItem(cacheVer + a)
 }
 var isBgWin = !1;
 
 function isQQApp() {
  var a = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && /\sQQ/i.test(navigator.userAgent),
   b = /(Android)/i.test(navigator.userAgent) && /MQQBrowser/i.test(navigator.userAgent) && /\sQQ/i.test(navigator.userAgent);
  return a || b
 }
 
 function isInWebview() {
  var a = navigator.userAgent.toLowerCase();
  return /micromessenger/i.test(a) || isQQApp() || /WeiBo/i.test(a)
 }
 
 function fixThirdStyleTag() {
  $("#omrss-third p, #omrss-third span, #omrss-third section, #omrss-third div").each(function() {
   void 0 !== $(this).attr("style") && $(this).removeAttr("style")
  });
  $("#omrss-third img, #omrss-third video").each(function() {
   $(this).removeAttr("width");
   $(this).removeAttr("height")
  })
 }
 
 function codeHighlight() {
  0 < $('#omrss-third pre[class*="language-"]').length || 0 < $('#omrss-third code[class*="language-"]').length ? Prism.highlightAll() : $("pre > code").each(function() {
   hljs.highlightBlock(this)
  })
 }
 
 function getLoginName() {
  var a = $("#omrss-my");
  return 0 === a.length ? "" : a.attr("data-oauth-name")
 }
 
 function getLoginId() {
  var a = $("#omrss-my");
  return 0 === a.length ? "" : a.attr("data-oauth-id")
 };
 
 function initLayout() {
  $(".tooltipped").tooltip();
  $(".modal").modal();
  $(".tabs").tabs();
  $(".sidenav").sidenav({
   edge: "right"
  });
  resetHeight();
  $("#omrss-main").click()
 }
 
 function getPageSize() {
  var a = $("#omrss-cnt-list ul li:first").outerHeight(!0),
   b = $(window).height() - $("#omrss-header").height() - $("#omrss-pager").height() - 20,
   c = 1;
  0 < a && (c = Math.floor(b / a));
  return c
 }
 
 function getBriefHeight() {
  var a = $(window).outerHeight(!0) - $("#omrss-header").outerHeight(!0) - $("#omrss-article-title").outerHeight(!0) - $("#omrss-article-stats").outerHeight(!0) - $("#omrss-article-bottom").outerHeight(!0);
  return parseInt(a)
 }
 
 function resetHeight() {
  $(".cnt-right").css({
   "overflow-y": "auto",
   height: $(window).height() - 64 + "px"
  });
  1600 <= $(window).width() ? $("#omrss-cnt-list").css({
   "max-height": $(window).height() - 64 - 60 + "px"
  }) : $("#omrss-cnt-list").css({
   "max-height": $(window).height() - 64 - 50 + "px"
  })
 }
 
 function setRecommendArticles(a) {
  getLoginId() && setTimeout(function() {
   $.post("/api/html/recommend/articles", {
    uid: getOrSetUid(),
    id: a
   }, function(a) {
    $("#omrss-recommend").html(a)
   })
  }, 2E3)
 }
 
 function loadPage(a) {
  $("#omrss-loader").removeClass("hide");
  var b = "",
   c = "";
  getLoginId() || (b = Object.keys(getSubFeeds()).join(","), c = Object.keys(getUnsubFeeds()).join(","));
  $.post("/api/html/articles/list", {
   uid: getOrSetUid(),
   page_size: getPageSize(),
   page: a,
   sub_feeds: b,
   unsub_feeds: c
  }, function(a) {
   a = $(a);
   a.find(".collection li[id]").each(function(a) {
    hasReadArticle(this.id) || (a = $(this).find("i.read"), a.removeClass("read").addClass("unread"), a.text("lens"), $(this).find(".omrss-title").removeClass("omrss-title-read").addClass("omrss-title-unread"));
    hasLikeArticle(this.id) && $(this).find("i.thumb-icon").addClass("omrss-color");
    hasOpenSrc(this.id) && $(this).find("i.open-icon").addClass("omrss-color")
   });
   a.find(".prettydate").prettydate();
   $("#omrss-left").html(a);
   initLayout()
  }).fail(function(a) {
   warnToast(NET_ERROR_MSG)
  }).always(function() {
   $("#omrss-loader").addClass("hide");
   localStorage.setItem("CURPG", a)
  })
 }
 $(document).ready(function() {
  initLayout();
  getOrSetUid();
  showServerMsg();
  loadPage(1);
  updateReadStats();
  setToreadList(notify = !1);
  setInterval(function() {
   !0 === isBgWin ? setToreadList(notify = !0) : setToreadList(notify = !1)
  }, 144E5);
  $(document).on("click", ".ev-cnt-list", function() {
   $(".ev-cnt-list.active").removeClass("active");
   $(this).addClass("active");
   var a = this.id,
    b = $(this),
    c = getLruCache(a);
   if (c) {
    var d = $("#omrss-main");
    d.html(c);
    fixThirdStyleTag();
    codeHighlight();
    updateReadStats();
    hasReadArticle(a) || (setReadArticle(a,
     b), updateUnreadCount());
    setThirdLinkify();
    d.scrollTop(0);
    setRecommendArticles(a)
   } else $("#omrss-loader").removeClass("hide"), $.post("/api/html/article/detail", {
    uid: getOrSetUid(),
    id: a
   }, function(c) {
    setLruCache(a, c);
    var d = $("#omrss-main");
    d.html(c);
    fixThirdStyleTag();
    codeHighlight();
    updateReadStats();
    setReadArticle(a, b);
    updateUnreadCount();
    setThirdLinkify();
    d.scrollTop(0);
    setTimeout(function() {
     $.post("/api/actionlog/add", {
      uid: getOrSetUid(),
      id: a,
      action: "VIEW"
     }, function() {})
    }, 1E3);
    setRecommendArticles(a)
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   });
   setTimeout(function() {
    "default" === Notification.permission && Notification.requestPermission()
   }, 36E5)
  });
  $(document).on("click", ".ev-my-feed", function() {
   $("#omrss-loader").removeClass("hide");
   user = getLoginId();
   $.post("/api/html/feeds/all", {
    uid: getOrSetUid()
   }, function(a) {
    user || (a = $(a), a.find(".omrss-item").each(function(a) {
     a = $(this).attr("data-name");
     var c = parseInt($(this).attr("data-star"));
     isVisitorSubFeed(a) ? ($(this).find("a.ev-toggle-feed").text("\u53d6\u6d88\u8ba2\u9605"), $(this).find("a.ev-toggle-feed").addClass("omrss-bgcolor")) :
      isVisitorUnSubFeed(a) ? ($(this).find("a.ev-toggle-feed").text("\u8ba2\u9605"), $(this).find("a.ev-toggle-feed").removeClass("omrss-bgcolor")) : 20 <= c ? ($(this).find("a.ev-toggle-feed").text("\u53d6\u6d88\u8ba2\u9605"), $(this).find("a.ev-toggle-feed").addClass("omrss-bgcolor")) : ($(this).find("a.ev-toggle-feed").text("\u8ba2\u9605"), $(this).find("a.ev-toggle-feed").removeClass("omrss-bgcolor"))
    }));
    $("#omrss-main").html(a).scrollTop(0);
    $(".tooltipped").tooltip();
    $(".tabs").tabs();
    resetHeight()
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })
  });
  $(document).on("click", "#omrss-unlike", function() {
   var a = $(this).attr("data-site");
   getLoginId() ? $.post("/api/feed/unsubscribe", {
    uid: getOrSetUid(),
    feed: a
   }, function(a) {
    toast("\u53d6\u6d88\u8ba2\u9605\u6210\u529f^o^")
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }) : (unsubFeed(a), toast("\u53d6\u6d88\u8ba2\u9605\u6210\u529f^o^"))
  });
  $(document).on("click", ".ev-submit-feed", function() {
   var a = $("#omrss-feed-input").val().trim();
   a ? ($("#omrss-loader").removeClass("hide"), $.post("/api/feed/add", {
    uid: getOrSetUid(),
    url: a
   }, function(a) {
    subFeed(a.name);
    toast("\u6dfb\u52a0\u6210\u529f\uff0c\u9884\u8ba1\u4e00\u5c0f\u65f6\u5185\u6536\u5230\u66f4\u65b0^o^", 3E3)
   }).fail(function() {
    warnToast("RSS\u5730\u5740\u89e3\u6790\u5931\u8d25\uff0c\u7ba1\u7406\u5458\u7a0d\u540e\u4f1a\u8ddf\u8fdb\u5904\u7406\uff01")
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })) : warnToast("\u6ca1\u6709\u8f93\u5165\u5185\u5bb9\uff01")
  });
  $(document).on("click", ".ev-toggle-feed", function() {
   var a = $(this).text(),
    b = $(this).attr("data-name"),
    c = getLoginId(),
    d = $(this);
   "\u8ba2\u9605" === a ? c ? ($("#omrss-loader").removeClass("hide"), $.post("/api/feed/subscribe", {
     uid: getOrSetUid(),
     feed: b
    }, function(a) {
     toast("\u8ba2\u9605\u6210\u529f^o^");
     d.text("\u53d6\u6d88\u8ba2\u9605");
     d.addClass("omrss-bgcolor")
    }).fail(function() {
     warnToast(NET_ERROR_MSG)
    }).always(function() {
     $("#omrss-loader").addClass("hide")
    })) : (subFeed(b), toast("\u8ba2\u9605\u6210\u529f^o^"), $(this).text("\u53d6\u6d88\u8ba2\u9605"), $(this).addClass("omrss-bgcolor")) : "\u53d6\u6d88\u8ba2\u9605" ===
    a && (c ? ($("#omrss-loader").removeClass("hide"), $.post("/api/feed/unsubscribe", {
     uid: getOrSetUid(),
     feed: b
    }, function(a) {
     toast("\u53d6\u6d88\u8ba2\u9605\u6210\u529f^o^");
     d.text("\u8ba2\u9605");
     d.removeClass("omrss-bgcolor")
    }).fail(function() {
     warnToast(NET_ERROR_MSG)
    }).always(function() {
     $("#omrss-loader").addClass("hide")
    })) : (unsubFeed(b), toast("\u53d6\u6d88\u8ba2\u9605\u6210\u529f^o^"), $(this).removeClass("omrss-bgcolor"), $(this).text("\u8ba2\u9605")))
  });
  $(document).on("click", ".ev-page", function() {
   var a =
    $(this).attr("data-page");
   loadPage(a)
  });
  $(document).on("click", "#omrss-like", function() {
   var a = $(this).attr("data-id");
   hasLikeArticle(a) ? warnToast("\u5df2\u7ecf\u70b9\u8fc7\u8d5e\u4e86\uff01") : $.post("/api/actionlog/add", {
    uid: getOrSetUid(),
    id: a,
    action: "THUMB"
   }, function(b) {
    setLikeArticle(a);
    toast("\u70b9\u8d5e\u6210\u529f^o^")
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   })
  });
  $(document).on("click", ".ev-open-src", function() {
   var a = $(this).attr("data-id");
   hasOpenSrc(a) || $.post("/api/actionlog/add", {
    uid: getOrSetUid(),
    id: a,
    action: "OPEN"
   }, function(b) {
    setOpenSrc(a)
   })
  });
  $(document).on("click", ".ev-mark-readall", function() {
   var a = JSON.parse(localStorage.getItem("TOREADS"));
   getLoginId() ? $.post("/api/mark/read", {
    uid: getOrSetUid(),
    ids: a.toString()
   }, function(b) {
    markReadAll(a);
    updateUnreadCount();
    toast("\u5df2\u5c06\u5168\u90e8\u8bbe\u4e3a\u5df2\u8bfb^o^")
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }) : (markReadAll(a), updateUnreadCount(), toast("\u5df2\u5c06\u5168\u90e8\u8bbe\u4e3a\u5df2\u8bfb^o^"))
  });
  $(document).on("click",
   ".ev-intro",
   function() {
    $("#omrss-loader").removeClass("hide");
    $.post("/api/html/homepage/intro", {
     uid: getOrSetUid()
    }, function(a) {
     target = $("#omrss-main");
     target.html(a);
     target.scrollTop(0);
     resetHeight();
     updateReadStats()
    }).fail(function() {
     warnToast(NET_ERROR_MSG)
    }).always(function() {
     $("#omrss-loader").addClass("hide")
    })
   });
  $(document).on("click", ".ev-faq", function() {
   $("#omrss-loader").removeClass("hide");
   $.post("/api/html/faq", {
    uid: getOrSetUid()
   }, function(a) {
    target = $("#omrss-main");
    target.html(a);
    target.scrollTop(0);
    resetHeight();
    updateReadStats()
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })
  });
  $(".ev-settings").click(function() {
   $("#omrss-loader").removeClass("hide");
   $.post("/api/html/settings", {
    uid: getOrSetUid()
   }, function(a) {
    $("#omrss-main").html(a);
    $("#omrss-main").scrollTop(0)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })
  });
  $("#omrss-logo-font").click(function() {
   $("#omrss-loader").removeClass("hide");
   $.post("/api/html/homepage/intro", {
     uid: getOrSetUid()
    },
    function(a) {
     $("#omrss-main").html(a);
     $("#omrss-main").scrollTop(0);
     resetHeight();
     updateReadStats()
    }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })
  });
  $(".ev-tips").click(function() {
   $("#omrss-loader").removeClass("hide");
   $.post("/api/html/homepage/tips", {
    uid: getOrSetUid()
   }, function(a) {
    $("#omrss-main").html(a);
    $("#omrss-main").scrollTop(0);
    resetHeight()
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })
  });
  $(document).on("click", ".ev-leave-msg", function() {
   $("#omrss-loader").removeClass("hide");
   $.post("/api/html/issues/all", {
    uid: getOrSetUid()
   }, function(a) {
    $("#omrss-main").html(a);
    $("#omrss-main").scrollTop(0);
    resetHeight()
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })
  });
  $(document).on("click", ".ev-explore", function() {
   $("#omrss-loader").removeClass("hide");
   $.post("/api/html/explore", {
    uid: getOrSetUid()
   }, function(a) {
    getLoginId() || (a = $(a), a.find("span.ev-sub-feed").each(function() {
     var a =
      $(this).attr("data-name");
     isVisitorSubFeed(a) && ($(this).text("\u5df2\u8ba2\u9605"), $(this).removeClass("waves-effect").removeClass("btn-small").removeClass("ev-sub-feed"))
    }));
    $("#omrss-main").html(a);
    resetHeight();
    $("#omrss-main").scrollTop(0);
    $(".tabs").tabs();
    $(".tooltipped").tooltip()
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })
  });
  $(document).on("click", ".ev-recent-article", function() {
   $("#omrss-loader").removeClass("hide");
   var a = $(this).attr("data-type");
   $.post("/api/html/recent/articles", {
    uid: getOrSetUid(),
    recommend: a
   }, function(a) {
    getLoginId() || (a = $(a), a.find("span.ev-sub-feed").each(function() {
     var a = $(this).attr("data-name");
     isVisitorSubFeed(a) && ($(this).text("\u5df2\u8ba2\u9605"), $(this).removeClass("waves-effect").removeClass("btn-small").removeClass("ev-sub-feed"))
    }));
    $("#omrss-explore").html(a);
    $("#omrss-explore").scrollTop(0);
    $(".tooltipped").tooltip()
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })
  });
  $(document).on("click", ".ev-new-site", function() {
   $("#omrss-loader").removeClass("hide");
   $.post("/api/html/recent/sites", {
    uid: getOrSetUid()
   }, function(a) {
    getLoginId() || (a = $(a), a.find("span.ev-sub-feed").each(function() {
     var a = $(this).attr("data-name");
     isVisitorSubFeed(a) && ($(this).text("\u5df2\u8ba2\u9605"), $(this).removeClass("waves-effect").removeClass("btn-small").removeClass("ev-sub-feed"))
    }));
    $("#omrss-explore").html(a);
    $("#omrss-explore").scrollTop(0);
    $(".tooltipped").tooltip()
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })
  });
  $(document).on("click", ".ev-feed-ranking", function() {
   $("#omrss-loader").removeClass("hide");
   $.post("/api/html/feed/ranking", {
    uid: getOrSetUid()
   }, function(a) {
    getLoginId() || (a = $(a), a.find("span.ev-sub-feed").each(function() {
     var a = $(this).attr("data-name");
     isVisitorSubFeed(a) && ($(this).text("\u5df2\u8ba2\u9605"), $(this).removeClass("waves-effect").removeClass("btn-small").removeClass("ev-sub-feed"))
    }));
    $("#omrss-explore").html(a);
    $("#omrss-explore").scrollTop(0);
    $(".tooltipped").tooltip()
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })
  });
  $(document).on("click", ".ev-sub-feed", function() {
   var a = $(this).attr("data-name"),
    b = getLoginId(),
    c = $(this);
   b ? ($("#omrss-loader").removeClass("hide"), $.post("/api/feed/subscribe", {
    uid: getOrSetUid(),
    feed: a
   }, function(a) {
    toast("\u8ba2\u9605\u6210\u529f^o^");
    c.text("\u5df2\u8ba2\u9605");
    c.removeClass("waves-effect").removeClass("btn-small").removeClass("ev-sub-feed")
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })) : (subFeed(a), toast("\u8ba2\u9605\u6210\u529f^o^"),
    c.text("\u5df2\u8ba2\u9605"), c.removeClass("waves-effect").removeClass("btn-small").removeClass("ev-sub-feed"))
  });
  $(document).on("click", ".ev-submit-msg", function() {
   if (hasLeaveMsgToday()) warnToast("\u60a8\u4eca\u5929\u5df2\u7ecf\u7559\u8fc7\u8a00\u4e86\uff0c\u660e\u5929\u518d\u6765\u5427\uff01");
   else {
    $("#omrss-loader").removeClass("hide");
    var a = $("#issue-input-detail").val(),
     b = $("#issue-input-name").val(),
     c = $("#issue-input-contact").val();
    $.post("/api/message/add", {
     uid: getOrSetUid(),
     content: a,
     nickname: b,
     contact: c
    }, function(a) {
     $("#omrss-main").html(a);
     $("#omrss-main").scrollTop(0);
     setLeaveMsgToday();
     toast("\u7559\u8a00\u6210\u529f^o^")
    }).fail(function() {
     warnToast(NET_ERROR_MSG)
    }).always(function() {
     $("#omrss-loader").addClass("hide")
    })
   }
  });
  $(".ev-toggle-fullscreen").click(function() {
   isInFullscreen() ? (exitFullscreen(), $(this).find("i").text("fullscreen")) : (enterFullscreen(), $(this).find("i").text("fullscreen_exit"));
   setTimeout(function() {
    loadPage(getCurPage())
   }, 200)
  });
  document.addEventListener("visibilitychange",
   function() {
    "visible" !== document.visibilityState ? (isBgWin = !0, console.log("\u8f6c\u5230\u540e\u53f0\uff1a" + new Date)) : (isBgWin = !1, console.log("\u8f6c\u5230\u524d\u53f0\uff1a" + new Date))
   })
 });
 (function() {
  function a() {
   if ("debug" === a.LOG_LEVEL) {
    var h = Array.prototype.slice.call(arguments),
     e = window.console,
     b = e && e.log;
    b && (b.apply ? b.apply(e, h) : e.log(h))
   }
  }
 
  function b(a, e) {
   if ("function" !== typeof a) throw new TypeError('Argument "__constructor" of "Proto" need to be an instance of a "Function"!');
   if (!(e && e instanceof Object)) return a.prototype;
   this.constructor = a;
   for (var b in e) e.hasOwnProperty(b) && (this[b] = e[b])
  }
 
  function c(a) {
   this.event = a
  }
 
  function d() {
   this.actions = {
    keydown: [],
    keypress: [],
    keyup: []
   }
  }
 
  function g(a) {
   this.actionContainer = a;
   this.keyStrokes = "";
   this.prevKeypressActions = null
  }
 
  function l(a) {
   this.router = a;
   this.bindedEvents = {};
   this.handlers = {};
   this.setHandlers()
  }
 
  function n(h, e) {
   function b(a) {
    return f.in_array(a, ["keydown", "keypress", "keyup"]) ? !0 : !1
   }
   window.shortcuts = {
    bindEvents: function(a) {
     function e(k) {
      if (b(k)) h.bindEvent(k);
      else throw new TypeError("[shortcuts::bindEvents], invalid types: " + a);
     }
     if (a instanceof Array)
      for (var c = 0, k = a.length; c < k; ++c) e(a[c]);
     else e(a)
    },
    unBindEvents: function(a) {
     for (var e =
       0, b = a.length; e < b; ++e) h.unbindEvent(a[e])
    },
    addActions: function(a) {
     function h(a) {
      var k = f.trim(a.type || "");
      if (b(k)) e.addAction(a);
      else throw new TypeError("[shortcuts::addActions], invalid type: " + a.type);
     }
     if (a instanceof Array)
      for (var c = 0, k = a.length; c < k; ++c) h(a[c]);
     else h(a)
    },
    getActions: function(a) {
     var h = [];
     return h = b(a) ? e.getActions(a) : e.getAllActions()
    },
    logger: {
     on: function() {
      a.LOG_LEVEL = "debug"
     },
     off: function() {
      a.LOG_LEVEL = "Hello World!~"
     },
     log: function() {
      a.apply(null, arguments)
     }
    }
   }
  }
  a.LOG_LEVEL = "@debug@";
  var f = {
    in_array: function(a, e) {
     if (!(e instanceof Array)) return !1;
     var b = Array.prototype.indexOf;
     if (b && e.indexOf === b) return -1 !== e.indexOf(a);
     for (var b = 0, c = e.length; b < c; ++b)
      if (a === e[b]) return !0;
     return !1
    },
    trim: function(a) {
     var e = /^\s+|\s+$/g,
      b = String.prototype.trim;
     a = String(a);
     return b && b === a.trim ? a.trim(a) : a.replace(e, "")
    }
   },
   p = {
    addListener: function() {
     return document.addEventListener ? function(a, e, b) {
      a.addEventListener(e, b, !1)
     } : document.attachEvent ? function(a, b, c) {
      a.attachEvent("on" + b, c)
     } : function(a, b, c) {
      throw 'cannot bind event"' +
       b + '"';
     }
    }(),
    removeListener: function() {
     return document.removeEventListener ? function(a, b, c) {
      a.removeEventListener(b, c, !1)
     } : document.detachEvent ? function(a, b, c) {
      a.detachEvent("on" + b, c)
     } : function(a, b) {
      throw 'cannot remove event"' + b + '"';
     }
    }(),
    EventObject: function(a) {
     a = a || window.event;
     var b = {};
     b.originalEvent = a;
     for (var c = "type altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
       f = c.length, d; f;) d = c[--f], b[d] = a[d];
     b.target || (b.target = a.srcElement || document);
     void 0 === b.which && (b.which = void 0 !== a.charCode ? a.charCode : a.keyCode);
     b.stopPropagation || (b.stopPropagation = function() {
      a.cancelBubble = !0
     });
     b.preventDefault || (b.preventDefault = function() {
      a.returnValue = !1
     });
     return b
    }
   };
  c.prototype = new b(c, {
   isEscape: function() {
    return 27 == this.getKeyCode()
   },
   isValidKeyStroke: function() {
    var a = this.event.target,
     b = a.tagName.toLowerCase();
    return f.in_array(b, ["input", "textarea"]) ? !1 : (a = a.getAttribute("contenteditable")) &&
     "inherit" !== a ? !1 : !0
   },
   isKeydown: function() {
    return "keydown" === this.getEventType()
   },
   isKeypress: function() {
    return "keypress" === this.getEventType()
   },
   isKeyup: function() {
    return "keyup" === this.getEventType()
   },
   getKeyCode: function() {
    return this.event.which
   },
   getKeyStroke: function() {
    return String.fromCharCode(this.getKeyCode())
   },
   getEventType: function() {
    return this.event.type
   },
   getEvent: function() {
    return this.event
   }
  });
  d.prototype = new b(d, {
   addAction: function(a) {
    var b = f.trim(a.type || "").toLowerCase();
    if (!this.actions[b]) throw new TypeError('Invalid "type" of "action" in [ActionContainer::addAction]');
    this.actions[b].push(a)
   },
   getActions: function(a) {
    return this.actions[a] || []
   },
   getAllActions: function() {
    return this.actions
   }
  });
  g.prototype = new b(g, {
   handle: function(a) {
    a.isKeypress() ? (this.keyStrokes += a.getKeyStroke(), this.handleKeypress(a)) : this.handleKeyHit(a)
   },
   handleKeypress: function(a) {
    var b = this.getPrevKeypressActions(),
     b = this.filterKeypresActions(b, a);
    this.setPrevKeypressActions(b);
    this.execute(b, a)
   },
   handleKeyHit: function(a) {
    var b = this.actionContainer.getActions(a.getEventType()),
     b = this.filterKeyHitActions(b,
      a);
    this.execute(b, a)
   },
   filterKeypresActions: function(a, b) {
    function c(a) {
     var h, m = a.pattern;
     m ? (h = m.value, m.isRegExp ? (h = new RegExp(h), h = h.test(k)) : h = 0 === h.indexOf(k), h && f(a) ? d.push(a) : (a = a.fns && a.fns.clear, "function" === typeof a && a(q, k, b))) : f(a)
    }
 
    function f(a) {
     a = a.fns && a.fns.filter;
     return "function" === typeof a ? a(q, k, b) ? !0 : !1 : !0
    }
    for (var d = [], q = b.getKeyStroke(), k = this.keyStrokes, r = 0, v = a.length; r < v; ++r) c(a[r]);
    return d
   },
   filterKeyHitActions: function(a, b) {
    for (var c = 0, f = a.length, d, q, k = [], r = b.getKeyStroke(), v =
      this.keyStrokes; c < f; ++c) d = a[c], q = d.fns && d.fns.filter, "function" === typeof q && q(r, v, b) && k.push(d);
    return k
   },
   execute: function(b, c) {
    var f = c.getKeyStroke(),
     d = this.keyStrokes,
     p = b.length;
    if (0 < p) {
     for (var q = 0, k, r = !0; q < p; ++q)(k = b[q].pattern) && !k.isRegExp && d !== k.value ? k = !1 : (k = b[q].fns, k = k.execute, a("[Router::execute], ", this, f, d, c), k = k(f, d, c)), r = k && r;
     r && (this.clearKeyStrokes(), this.clearPrevKeypressActions())
    } else c.isKeypress() && (this.clearKeyStrokes(), this.clearPrevKeypressActions())
   },
   getPrevKeypressActions: function() {
    return null ==
     this.prevKeypressActions ? this.actionContainer.getActions("keypress") : this.prevKeypressActions
   },
   setPrevKeypressActions: function(a) {
    0 < a.length ? this.prevKeypressActions = a : this.clearPrevKeypressActions()
   },
   clearPrevKeypressActions: function() {
    this.prevKeypressActions = null
   },
   clearKeyStrokes: function() {
    this.keyStrokes = ""
   }
  });
  l.prototype = new b(l, {
   setHandlers: function() {
    var a = this,
     b = function(b) {
      b = new c(p.EventObject(b));
      a.router.handle(b)
     };
    this.handlers.keydown = b;
    this.handlers.keypress = b;
    this.handlers.keyup =
     b
   },
   bindEvent: function(b) {
    this.bindedEvents[b] || (this.bindedEvents[b] = !0, p.addListener(document, b, this.handlers[b]), a('[Controller::bindEvent], bind Event: "' + b + '"'))
   },
   unbindEvent: function(b) {
    this.bindedEvents[b] && (this.bindedEvents[b] = !1, p.removeListener(document, b, this.handlers[b]), a('[Controller::unbindEvent], unbind Event: "' + b + '"'))
   }
  });
  (function() {
   var a = new d,
    b = new g(a),
    b = new l(b);
   n(b, a)
  })()
 })();
 (function(a) {
  var b = a.logger,
   c = function() {
    var a = document,
     b = "CSS1Compat" === a.compatMode;
    return {
     isVisible: function(a) {
      var b = a.getBoundingClientRect();
      return !d.every(["top", "right", "bottom", "left"], function(a, c) {
       if (0 === b[a]) return !0
      })
     },
     isInView: function(a) {
      if (c.isVisible(a)) {
       var b = a.getBoundingClientRect();
       a = ["top"];
       var f;
       if (f = d.every(a, function(a, c) {
         if (0 > b[a]) return !0
        })) return !1;
       var p = c.getViewHeight();
       return (f = d.every(a, function(a, c) {
        if (0 >= p - b[a]) return !0
       })) ? !1 : !0
      }
      return !1
     },
     getElementsInView: function(b) {
      b =
       "string" == typeof b ? a.getElementsByTagName(b) : b;
      var e = [];
      try {
       e = Array.prorotype.slice.call(b)
      } catch (p) {
       for (var m = b.length; m--;) e.push(b[m]);
       e.reverse()
      }
      return b = d.filter(e, function(a, b) {
       if (c.isInView(a)) return !0
      })
     },
     getElementPosition: function(a) {
      a = a.getBoundingClientRect(a);
      return {
       top: c.getDocScrollTop() + a.top,
       left: c.getDocScrollLeft() + a.left
      }
     },
     getDocScrollTop: function() {
      return a.documentElement.scrollTop || a.body.scrollTop
     },
     getDocScrollLeft: function() {
      return a.documentElement.scrollLeft || a.body.scrollLeft
     },
     getViewHeight: function() {
      var c = window.innerHeight;
      "undefined" == typeof c && (c = b ? a.documentElement.clientHeight : a.body.clientHeight);
      return c
     },
     getViewWidth: function() {
      return b ? a.documentElement.clientWidth : a.body.clientWidth
     },
     getDocHeight: function() {
      return Math.max(a.documentElement.scrollHeight, a.body.scrollHeight)
     },
     addStyleSheet: function(b, c) {
      var d = a.createElement("style");
      d.type = "text/css";
      if (d.styleSheet) d.styleSheet.cssText = b;
      else {
       var p = a.createTextNode(b);
       d.appendChild(p)
      }
      for (var g in c) c.hasOwnProperty(g) &&
       d.setAttribute(g, c[g]);
      a.body.appendChild(d)
     }
    }
   }(),
   d = function() {
    var a = Array.prototype,
     b = a.indexOf,
     c = a.forEach,
     e = a.map,
     m = a.filter,
     g = a.every,
     l = String.prototype.trim,
     q = {
      indexOf: function(a, c) {
       if (null == a) return -1;
       if (b && b === a.indexOf) return a.indexOf(c);
       for (var e = 0, f = a.length; e < f; ++e)
        if (c === a[e]) return e;
       return -1
      },
      in_array: function(a, b) {
       return -1 === q.indexOf(b, a) ? !1 : !0
      },
      forEach: function(a, b, e) {
       if (null != a)
        if (c && c === a.forEach) a.forEach(b, e);
        else if (a instanceof Array)
        for (var f = 0, d = a.length; f < d && !1 !== b.call(e,
          a[f], f, a); ++f);
       else
        for (f in a)
         if (a.hasOwnProperty(f) && !1 === b.call(e, a[f], f, a)) break
      },
      map: function(a, b, c) {
       if (null != a) {
        if (e && e === a.map) return a.map(b, c);
        var f = a instanceof Array ? [] : {};
        q.forEach(a, function(a, k, e) {
         f instanceof Array ? f.push(b.call(c, a, k, e)) : f[k] = b.call(c, a, k, e)
        });
        return f
       }
      },
      filter: function(a, b, c) {
       if (null != a) {
        if (m && m === a.filter) return a.filter(b, c);
        var f = a instanceof Array ? [] : {};
        d.forEach(a, function(a, k, e) {
         b.call(c, a, k, e) && (f instanceof Array ? f.push(a) : f[k] = a)
        });
        return f
       }
      },
      every: function(a,
       b, c) {
       if (null == a) return !0;
       if (g && g == a.every) return a.every(b, c);
       var f = !0;
       d.forEach(a, function(a, e, k) {
        if (!(f = f && b.call(c, a, e, k))) return !1
       });
       return f
      },
      isEmptyObject: function(a) {
       var b = !0,
        c;
       for (c in a)
        if (a.hasOwnProperty(c)) {
         b = !1;
         break
        } return b
      },
      trim: function(a) {
       var b = /^\s+|\s+$/g;
       a = String(a);
       return l && l === a.trim ? a.trim(a) : a.replace(b, "")
      },
      upperFirst: function(a) {
       a = String(a);
       return a.charAt(0).toUpperCase() + a.substr(1)
      }
     };
    return q
   }(),
   g = function() {
    var c = [],
     g = [],
     h = function(a, b, d) {
      b = "function" === typeof b ? b() :
       b;
      b.type = a;
      c.push(d);
      g.push(b)
     };
    return {
     addKeydown: function(a, b) {
      h("keydown", b, a)
     },
     addKeypress: function(a, b) {
      h("keypress", b, a)
     },
     addKeyup: function(a, b) {
      h("keyup", b, a)
     },
     init: function(e) {
      e = e || [];
      for (var h = 0, l = c.length; h < l; ++h) d.in_array(c[h], e) || (a.addActions(g[h]), b.log('[V::init], add action: "' + c[h] + '"'))
     }
    }
   }(),
   l = function(a, b, c) {
    return c.isValidKeyStroke()
   };
  g.addKeypress("srcollDown", {
   pattern: {
    value: "j"
   },
   fns: {
    filter: l,
    execute: function() {
     var a = $("#omrss-main").scrollTop();
     $("#omrss-main").scrollTop(a +
      200);
     return !0
    }
   }
  });
  g.addKeypress("srcollDown", {
   pattern: {
    value: " "
   },
   fns: {
    filter: l,
    execute: function() {
     var a = $("#omrss-main").scrollTop();
     $("#omrss-main").scrollTop(a + 600);
     return !0
    }
   }
  });
  g.addKeypress("scrollUp", {
   pattern: {
    value: "k"
   },
   fns: {
    filter: l,
    execute: function() {
     var a = $("#omrss-main").scrollTop();
     $("#omrss-main").scrollTop(a - 200);
     return !0
    }
   }
  });
  g.addKeypress("goTop", {
   pattern: {
    value: "gg"
   },
   fns: {
    filter: l,
    execute: function(a, c) {
     b.log("gotop");
     $("#omrss-main").scrollTop(0);
     toast("\u56de\u5230\u9876\u90e8");
     return !0
    }
   }
  });
  g.addKeypress("hackCopyLeft", {
   pattern: {
    value: "zz"
   },
   fns: {
    filter: l,
    execute: function(a, b) {
     $("#omrss-third").removeAttr("style");
     $(".cnt-right").css("overflow-y", "scroll");
     return !0
    }
   }
  });
  g.addKeypress("goBottom", {
   pattern: {
    value: "G"
   },
   fns: {
    filter: l,
    execute: function() {
     var a = $("#omrss-main")[0].scrollHeight;
     $("#omrss-main").scrollTop(a);
     toast("\u5230\u8fbe\u5e95\u90e8");
     return !0
    }
   }
  });
  g.addKeypress("nextArticle", {
   pattern: {
    value: "n"
   },
   fns: {
    filter: l,
    execute: function() {
     if (0 === $(".ev-cnt-list.active").length) $(".ev-cnt-list")[0].click(),
      toast("\u4e0b\u4e00\u7bc7");
     else {
      var a = $(".ev-cnt-list.active").next();
      1 === a.length ? (a.click(), toast("\u4e0b\u4e00\u7bc7")) : toast("\u672c\u9875\u5df2\u7ecf\u6d4f\u89c8\u5b8c\u4e86")
     }
     return !0
    }
   }
  });
  g.addKeypress("prevArticle", {
   pattern: {
    value: "N"
   },
   fns: {
    filter: l,
    execute: function() {
     var a = $(".ev-cnt-list.active").prev();
     1 === a.length ? (a.click(), toast("\u4e0a\u4e00\u7bc7")) : toast("\u5df2\u7ecf\u662f\u7b2c\u4e00\u7bc7\u4e86");
     return !0
    }
   }
  });
  g.addKeypress("toggleFullscreen", {
   pattern: {
    value: "F"
   },
   fns: {
    filter: l,
    execute: function() {
     $(".ev-toggle-fullscreen").click();
     toast("\u5207\u6362\u5168\u5c4f");
     return !0
    }
   }
  });
  g.addKeypress("refreshSite", {
   pattern: {
    value: "r"
   },
   fns: {
    filter: l,
    execute: function() {
     $("#omrss-loader").removeClass("hide");
     location.reload();
     $("#omrss-loader").addClass("hide");
     toast("\u5237\u65b0");
     return !0
    }
   }
  });
  g.addKeypress("nextPage", {
   pattern: {
    value: "p"
   },
   fns: {
    filter: l,
    execute: function() {
     var a = $(".ev-page-next");
     1 === a.length ? (a.click(), toast("\u4e0b\u4e00\u9875")) : warnToast("\u5df2\u7ecf\u662f\u6700\u540e\u4e00\u9875\u4e86");
     return !0
    }
   }
  });
  g.addKeypress("markAndNextPage", {
   pattern: {
    value: "D"
   },
   fns: {
    filter: l,
    execute: function() {
     if (getLoginId()) {
      var a = [];
      $(".collection li[id]").each(function(b) {
       a.push(this.id)
      });
      $.post("/api/mark/read", {
       uid: getOrSetUid(),
       ids: a.toString()
      }, function(a) {
       $(".collection li[id]").each(function(a) {
        setReadArticle(this.id)
       });
       updateUnreadCount();
       toast("\u6807\u8bb0\u672c\u9875\u5df2\u8bfb")
      }).then(function() {
       loadPage(parseInt(getCurPage()) + 1)
      }).fail(function() {
       warnToast(NET_ERROR_MSG)
      })
     } else $(".collection li[id]").each(function(a) {
      setReadArticle(this.id);
      a = $(this).find("i.unread");
      a.removeClass("unread").addClass("read");
      a.text("check");
      $(this).find(".omrss-title").removeClass("omrss-title-unread").addClass("omrss-title-read")
     }), updateUnreadCount(), toast("\u6807\u8bb0\u672c\u9875\u5df2\u8bfb"), loadPage(parseInt(getCurPage()) + 1);
     return !0
    }
   }
  });
  g.addKeypress("previousPage", {
   pattern: {
    value: "P"
   },
   fns: {
    filter: l,
    execute: function() {
     var a = $(".ev-page-previous");
     1 === a.length ? (a.click(), toast("\u4e0a\u4e00\u9875")) : warnToast("\u5df2\u7ecf\u662f\u7b2c\u4e00\u9875\u4e86");
     return !0
    }
   }
  });
  (function() {
   function a(b) {
    for (var c = "abcdefghijklmnopqrstuvwxyz".split(""), e = "0123456789abcdefghijklmnop".split(""), f = c.length, h = Number(b - 1).toString(f).length, g = [], l = 0, p, m, n, t; l < b; ++l) {
     p = 0;
     t = "";
     for (n = l.toString(f); m = n.charAt(p++);) m = d.indexOf(e, m), t += c[m];
     t.length < h && (t = Array(h - t.length + 1).join(c[0]) + t);
     g.push(t)
    }
    return g
   }
 
   function p(a, b, c) {
    var e = b.substr(1);
    return d.filter(a, function(a, b) {
     if (0 === a[0].indexOf(e)) return !0;
     c.removeChild(a[2]);
     a[0] = a[1] = a[2] = null
    })
   }
 
   function h(b, e) {
    var h = [],
     g = a(b.length);
    d.forEach(b, function(a, b) {
     var d = document.createElement("ins");
     d.className = "vimlike-shortcuts-found-tag";
     var f = c.getElementPosition(a);
     d.style.cssText = "left:" + f.left + "px;top:" + f.top + "px;";
     f = g[b];
     d.innerHTML = f;
     e.appendChild(d);
     h.push([f, a, d])
    });
    document.getElementById("vimlike:findStyleId") || c.addStyleSheet('.vimlike-shortcuts-found-tag{position:fixed;z-index:9999999;background-color:#eeff41;color:black;padding:0 1px;border:solid 1px #E3BE23;text-decoration:none;font:bold 12px "Helvetica Neue", "Helvetica", "Arial", "Sans";}', {
     id: "vimlike:findStyleId"
    });
    document.body.appendChild(e);
    return h
   }
 
   function e() {
    try {
     document.body.removeChild(n)
    } catch (a) {}
    u = n = null
   }
 
   function m(a, d, f) {
    if ("f" == d.toLowerCase()) {
     a = document.links;
     a = c.getElementsInView(a);
     n = document.createElement("div");
     u = a = h(a, n);
     if (0 == a.length) return !0;
     toast("\u94fe\u63a5\u5168\u89c8")
    } else if (a = u = p(u, d, n), d = a.length, !(1 < d)) {
     if (1 === d) {
      a = a[0][1];
      "_blank" === a.getAttribute("target") && a.setAttribute("target", "_blank");
      if (/Firefox/.test(navigator.userAgent)) {
       b.log("[fireClick], firefox, special click");
       f = a.getAttribute("target");
       d = !0;
       if (f) "_self" == f && (d = !0);
       else {
        f = document.getElementsByTagName("head")[0].getElementsByTagName("base");
        for (var g = 0, l = f.length; g < l;) d = "_self" == f[g].getAttribute("target") ? !0 : !1, ++g
       }
       d ? window.location.href = a.href : window.open(a.href)
      } else document.createEvent ? (d = document.createEvent("MouseEvents"), d.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), a.dispatchEvent(d) ? b.log("[fireClick], not canceled") : b.log("[fireClick], canceled")) : a.click();
      e()
     }
     return !0
    }
   }
   var n, u;
   g.addKeypress("findf", function(a) {
    return {
     type: a,
     pattern: {
      isRegExp: !0,
      value: a
     },
     fns: {
      filter: l,
      execute: m
     }
    }
   }("^f.*"));
   g.addKeyup("clearFind", {
    fns: {
     filter: function(a, b, c) {
      return c.isEscape()
     },
     execute: function() {
      e();
      window.focus();
      return !0
     }
    }
   })
  })();
  (function() {
   function a(b) {
    for (var c = 0, d = b.length; c < d; ++c) try {
     b[c].blur()
    } catch (f) {}
   }
   g.addKeyup("blur", {
    fns: {
     filter: function(a, b, c) {
      return c.isEscape()
     },
     execute: function(b, c, d) {
      if (document.activeElement) try {
       document.activeElement.blur()
      } catch (g) {}
      a(document.getElementsByTagName("input"));
      a(document.getElementsByTagName("textarea"));
      window.focus();
      return !0
     }
    }
   })
  })();
  var n = function() {
   var b = !1;
   return {
    isOn: function() {
     return b
    },
    setOn: function() {
     b = !0;
     a.bindEvents(["keypress", "keyup"])
    },
    setOff: function() {
     b = !1;
     a.unBindEvents(["keypress", "keyup"])
    },
    toggle: function() {
     b ? n.setOff() : n.setOn()
    }
   }
  }();
  g.init();
  n.setOn();
  a.toggleVimlike = n.toggle;
  a.isVimlikeOn = n.isOn
 })(this.shortcuts);