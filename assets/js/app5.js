var NET_ERROR_MSG = "\u30cd\u30c3\u30c8\u56de\u7dda\u554f\u984c\u306e\u305f\u3081\u66ab\u304f\u5f8c\u8a66\u3057\u3066\u304f\u3060\u3055\u3044";

function getTextReadTime(a) {
 console.log((new Date).valueOf());
 for (var c = 0, e = 0; e < a.length; e++) c = 4 < escape(a.charAt(e)).length ? c + 2 : c + 1;
 console.log((new Date).valueOf());
 return parseInt(c / 900)
}

function genUidV0() {
 var a = uuid.v4(),
  c = md5(a + atob("bDNsU3BxNXM2b1NyRFJ0dFQwa1o=")).substring(0, 10);
 return a + atob("MDA=") + c
}

function toast(a, c) {
 M.toast({
  html: a,
  displayLength: void 0 === c ? 1E3 : c
 })
}

function warnToast(a) {
 M.toast({
  html: '<span style="color: #eeff41;">' + a + "</span>",
  displayLength: 3E3
 })
}

function getOrSetUid() {
 var a = localStorage.getItem("UID");
 if (a) return a;
 localStorage.setItem("UID", genUidV0());
 return localStorage.getItem("UID")
}

function getLoginId() {
  // 获取登录用户名，用于判断是否登录
  const loginEl = $('#omrss-my');
  if (loginEl.length === 0) {
      return '';
  } else {
      return loginEl.attr('data-oauth-id');
  }
}

function isVisitorSubFeed(name) {
  return getSubFeeds()[name] === 1;
}

function isVisitorUnSubFeed(name) {
  return getUnsubFeeds()[name] === 1;
}

function hasReadArticle(a) {
 return localStorage.getItem("READ/" + a)
}

function setReadArticle(a) {
 localStorage.setItem("READ/" + a, "1")
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
 var c = getSubFeeds(),
  e = getUnsubFeeds();
 delete e[a];
 c[a] = 1;
 localStorage.setItem("SUBS", JSON.stringify(c));
 localStorage.setItem("UNSUBS", JSON.stringify(e))
}

function unsubFeed(a) {
 var c = getSubFeeds(),
  e = getUnsubFeeds();
 delete c[a];
 e[a] = 1;
 localStorage.setItem("SUBS", JSON.stringify(c));
 localStorage.setItem("UNSUBS", JSON.stringify(e))
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
  console.warn("\u7570\u5e38\u767a\u751f", a.msg)
 }
 return !0
}



function resetHeight() {
  // 右侧滚动条
  $('.cnt-right').css({
      'overflow-y': 'auto',
      'height': ($(window).height() - 64) + 'px'
  });
  // 左侧内容栏
  if ($(window).width() >= 1600 ) {
      $('#omrss-cnt-list').css({
          'max-height': ($(window).height() - 64 - 60) + 'px'
      });
  } else {
      $('#omrss-cnt-list').css({
          'max-height': ($(window).height() - 64 - 50) + 'px'
      });
  }
}

function getCurPage() {
 var a = localStorage.getItem("CURPG");
 return a ? a : "1"
}

function updateReadStats() {
 var a = $("#omrss-third"),
  c = a.text().trim().length,
  e = a.find("img").length,
  k = a.find("a").length;
 a = "\u95b2\u89a7\u63a8\u5b9a\u65f6\u95f4<b> " + (getTextReadTime(a.text().trim()) + parseInt(e / 20) + parseInt(k / 20)) + " </b>\u5206\uff08\u8a08 " + c + " \u6587\u5b57\uff0c " + e + " \u679a\u753b\u50cf\uff0c " + k + " \u30ea\u30f3\u30af\uff09";
 $("#omrss-read-stats").html(a)
}

function updateUnreadCount() {
 var a = JSON.parse(localStorage.getItem("TOREADS")),
  c = 0;
 if (a) {
  for (var e = 0; e < a.length; e++) hasReadArticle(a[e]) || (c += 1);
  0 < c ? ($("#omrss-unread").html('<a href="#!"><span class="new badge">' + c + "</span></a>"), localStorage.setItem("NEW", c.toString())) : $("#omrss-unread").html("")
 }
 return c
}

function markReadAll() {
 var a = JSON.parse(localStorage.getItem("TOREADS"));
 if (a)
  for (var c = 0; c < a.length; c++) setReadArticle(a[c])
}

function setToreadList(a) {
 a = void 0 === a ? !1 : a;
 $.post("/api/lastweek/articles", {
  uid: getOrSetUid(),
  sub_feeds: Object.keys(getSubFeeds()).join(","),
  unsub_feeds: Object.keys(getUnsubFeeds()).join(","),
  ext: window.screen.width + "x" + window.screen.height
 }, function(c) {
  localStorage.setItem("TOREADS", JSON.stringify(c.result));
  c = updateUnreadCount();
  !0 === a && 0 < c && window.Notification && "granted" === Notification.permission && new Notification("\u60a8\u6709" + c + "\u6761\u672a\u8bfb\u53d6\u5f97", {
   tag: "OMRSS",
   icon: "https://www.reiwarss.com/assets/img/logo.png",
   body: "\u8bf7\u5237\u65b0\u9875\u9762\u540e\u67e5\u770b"
  })
 })
}
var lruCache = new Cache(50, !1, new Cache.LocalStorageCacheStorage("OMRSS")),
 cacheVer = "19`";

function setLruCache(a, c) {
 return 102400 > c.length && 512 < c.length ? (lruCache.setItem(cacheVer + a, c), !0) : !1
}

function getLruCache(a) {
 return lruCache.getItem(cacheVer + a)
}
var isBgWin = !1;

function isQQApp() {
 var a = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && /\sQQ/i.test(navigator.userAgent),
  c = /(Android)/i.test(navigator.userAgent) && /MQQBrowser/i.test(navigator.userAgent) && /\sQQ/i.test(navigator.userAgent);
 return a || c
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


};



function initLayout() {
 $(".tooltipped").tooltip();
 $(".sidenav").sidenav({
  edge: "right"
 });
 resetRightFlow();
 $("#omrss-main").click()
}

function getPageSize() {
    var a = $("#omrss-cnt-list ul li:first").outerHeight(!0),
    c = $(window).height() - $("#omrss-header").height() - $("#omrss-pager").height() - 20,
    e = 1;
   0 < a && (e = Math.floor(c / a));
   return e
}

function getBriefHeight() {
    var a = $(window).outerHeight(!0) - $("#omrss-header").outerHeight(!0) - $("#omrss-article-title").outerHeight(!0) - $("#omrss-article-stats").outerHeight(!0) - $("#omrss-article-bottom").outerHeight(!0);
    return parseInt(a)
}

function resetRightFlow() {
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


function loadPage(a) {
 $("#omrss-loader").removeClass("hide");
 $.post("/api/html/articles/list", {
  uid: getOrSetUid(),
  page_size: getPageSize(),
  page: a,
  sub_feeds: Object.keys(getSubFeeds()).join(","),
  unsub_feeds: Object.keys(getUnsubFeeds()).join(",")
 }, function(a) {
  a = $(a);
  a.find(".collection li[id]").each(function(a) {
   hasReadArticle(this.id) && (a = $(this).find("i.unread"), a.removeClass("unread").addClass("read"), a.text("check"), $(this).find(".omrss-title").removeClass("omrss-title-unread"));
   hasLikeArticle(this.id) &&
    $(this).find("i.thumb-icon").addClass("omrss-color");
   hasOpenSrc(this.id) && $(this).find("i.open-icon").addClass("omrss-color")
  });
  a.find(".prettydate").prettydate();
  $("#omrss-left").html(a);
  initLayout()
 }).fail(function(a) {
  warnToast(a.responseText)
 }).always(function() {
  $("#omrss-loader").addClass("hide");
  localStorage.setItem("CURPG", a)
 })
}
$(document).ready(function() {
 initLayout();
 getOrSetUid();
 loadPage(1);
// 首页文章统计数据
 updateReadStats();
// 先更新未读数
 setToreadList(notify = !1);
// 计算未读数，定时执行，?个小时算一次
 setInterval(function() {
  !0 === isBgWin && setToreadList(notify = !0)
 }, 72E5);
 $(document).on("click", ".ev-cnt-list", function() {
  $(".ev-cnt-list.active").removeClass("active");
  $(this).addClass("active");
  var a = this.id,
   c = $(this),
   e = getLruCache(a);
  if (e) {
   var k = $("#omrss-main");
   k.html(e);
   // trim third content style tag
   fixThirdStyleTag();
   0 < $('#omrss-third pre[class*="language-"]').length || 0 < $('#omrss-third code[class*="language-"]').length ? (Prism.highlightAll(),
    console.log("Prism init")) : ($("pre > code").each(function() {
    hljs.highlightBlock(this)
   }), console.log("Hljs init"));
   // 更新统计
   updateReadStats();
   k.scrollTop(0)
   

  } else $("#omrss-loader").removeClass("hide"), $.post("/api/html/article/detail", {
   uid: getOrSetUid(),
   id: a
  }, function(e) {
   setLruCache(a, e);
   var k = $("#omrss-main");
   k.html(e);
   fixThirdStyleTag();
   0 < $('#omrss-third pre[class*="language-"]').length || 0 < $('#omrss-third code[class*="language-"]').length ? (Prism.highlightAll(), console.log("Prism init")) : ($("pre > code").each(function() {
     hljs.highlightBlock(this)
    }),
    console.log("Hljs init"));
   k.scrollTop(0);
   updateReadStats();
   hasReadArticle(a) || (setReadArticle(a), e = c.find("i.unread"), e.removeClass("unread").addClass("read"), e.text("check"), c.find(".omrss-title").removeClass("omrss-title-unread"), updateUnreadCount(), setTimeout(function() {
    $.post("/api/actionlog/add", {
     uid: getOrSetUid(),
     id: a,
     action: "VIEW"
    }, function() {})
   }, 1E3))
  // 推荐文章
  }).fail(function() {
   warnToast(NET_ERROR_MSG)
  }).always(function() {
   $("#omrss-loader").addClass("hide")
  });
  $("#omrss-third").linkify({
   target: "_blank"
  });
  setTimeout(function() {
   "default" === Notification.permission && Notification.requestPermission()
  }, 3E5)
 });
 $(document).on("click", ".ev-my-feed", function() {

  $("#omrss-loader").removeClass("hide");
  $.post("/api/html/feeds/all", {
   uid: getOrSetUid()
  }, function(a) {
   a = $(a);
   var c = getSubFeeds(),
    e = getUnsubFeeds();
   a.find(".omrss-item").each(function(a) {
    a = $(this).attr("data-name");
    var k = parseInt($(this).attr("data-star"));
    a in c ? ($(this).find("a.ev-toggle-feed").text("取り消し"), $(this).find("a.ev-toggle-feed").addClass("omrss-bgcolor")) :
     a in e ? $(this).find("a.ev-toggle-feed").text("取得") : 20 <= k ? ($(this).find("a.ev-toggle-feed").text("\u53d6\u308a\u6d88\u3057"), $(this).find("a.ev-toggle-feed").addClass("omrss-bgcolor")) : $(this).find("a.ev-toggle-feed").text("\u53d6\u5f97")
   });
   $("#omrss-main").html(a).scrollTop(0)
   resetRightFlow()
  }).fail(function() {
   warnToast(NET_ERROR_MSG)
  }).always(function() {
   $("#omrss-loader").addClass("hide")
  })
 });



 $(document).on("click", "#omrss-unlike", function() {
  var a = $(this).attr("data-site");
  unsubFeed(a);
  toast("\u53d6\u308a\u6d88\u3057\u6210\u529f☺️")
 });
 $(document).on("click", ".ev-submit-feed", function() {
  var a = $("#omrss-feed-input").val().trim();
  a ? ($("#omrss-loader").removeClass("hide"), $.post("/api/feed/add", {
    uid: getOrSetUid(),
    url: a
   }, function(a) {
    $("#omrss-loader").addClass("hide");
    subFeed(a.name);
    toast("\u53d6\u5f97\u6210\u529f\u3067\u304d\u307e\u3057\u305f\u66ab\u304f\u6ff4\u65b0\u66f4\u65b0\u3055\u308c\u307e\u3059", 3E3)
   }).fail(function() {
    $("#omrss-loader").addClass("hide");
    warnToast("RSS\u5730\u5740\u89e3\u6790\u5931\u8d25\uff0c\u7ba1\u7406\u5458\u7a0d\u540e\u4f1a\u8ddf\u8fdb\u5904\u7406\uff01")
   })) :
   warnToast("\u6ca1\u6709\u8f93\u5165\u5185\u5bb9\uff01")
 });
 $(document).on("click", ".ev-toggle-feed", function() {
  var a = $(this).text(),
   c = $(this).attr("data-name");
  "\u53d6\u5f97" === a ? (subFeed(c), toast("\u53d6\u5f97\u6210\u529f☺️"),
  $(this).text("\u53d6\u308a\u6d88\u3057"), 
  $(this).addClass("omrss-bgcolor")) : "\u53d6\u308a\u6d88\u3057" === a && (unsubFeed(c), toast("\u53d6\u308a\u6d88\u3057\u6210\u529f^o^"),
  $(this).removeClass("omrss-bgcolor"),
  $(this).text("\u53d6\u5f97"))
 });
 $(document).on("click", ".ev-page",
  function() {
   var a = $(this).attr("data-page");
   loadPage(a)
  });
 $(document).on("click", "#omrss-like", function() {
  var a = $(this).attr("data-id");
  hasLikeArticle(a) ? warnToast("\u3044\u3044\u306d\u3057\u307e\u3057\u305f") : $.post("/api/actionlog/add", {
   uid: getOrSetUid(),
   id: a,
   action: "THUMB"
  }, function(c) {
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
  }, function(c) {
   setOpenSrc(a)
  })
 });
 $(document).on("click", ".ev-mark-readall", function() {
  markReadAll();
  updateUnreadCount();
  toast("\u65e2\u8aad\u306b\u3057\u307e\u3057\u305f")
 });
 $(document).on("click", ".ev-intro", function() {
  $("#omrss-loader").removeClass("hide");
  $.post("/api/html/homepage/intro", {
   uid: getOrSetUid()
  }, function(a) {
   target = $("#omrss-main");
   target.html(a);
   target.scrollTop(0);
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
   resetRightFlow();
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
  }, function(a) {
   $("#omrss-main").html(a);
   $("#omrss-main").scrollTop(0);
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
   $("#omrss-main").scrollTop(0)
  }).fail(function() {
   warnToast(NET_ERROR_MSG)
  }).always(function() {
   $("#omrss-loader").addClass("hide")
  })
 });
 $(document).on("click", ".ev-display-btn", function() {
  $(this).addClass("hide");
  $("#omrss-rss-hide").removeClass("hide")
 });
 $(document).on("click", ".ev-leave-msg", function() {
  $("#omrss-loader").removeClass("hide");
  $.post("/api/html/issues/all", {
   uid: getOrSetUid()
  }, function(a) {
   $("#omrss-main").html(a);
   $("#omrss-main").scrollTop(0)
  }).fail(function() {
   warnToast(NET_ERROR_MSG)
  }).always(function() {
   $("#omrss-loader").addClass("hide")
  })
 });


      // 发现页面
      
$(document).on('click', '.ev-explore', function() {

        $('#omrss-loader').removeClass('hide');
        $.post("/api/html/explore", {uid: getOrSetUid()}, function (data) {
          
            if (!getLoginId()) {
                // 游客用户

                let destDom = $(data);

                destDom.find('span.ev-sub-feed').each(function () {
                    const siteName = $(this).attr('data-name');
                    if (isVisitorSubFeed(siteName)) {
                      $(this).text("\u53d6\u308a\u6d88\u3057");
                      $(this).addClass("omrss-bgcolor");
                    }
                });

                $('#omrss-main').html(destDom);
            } else {
                $('#omrss-main').html(data);
            }
            resetHeight();
            $('#omrss-main').scrollTop(0);
            $('.tabs').tabs();
            $('.tooltipped').tooltip();
        }).fail(function () {
            warnToast(NET_ERROR_MSG);
        }).always(function () {
            $('#omrss-loader').addClass('hide');
        })
    });

 // 发现界面切换到 英語圏
 $(document).on('click', '.ev-eigoken-article', function () {
  $('#omrss-loader').removeClass('hide');
  const eigoken = $(this).attr('data-type');
  $.post("/api/html/recent/articles", {uid: getOrSetUid(), eigoken: eigoken}, function (data) {
      if (!getLoginId()) {

        // 游客用户
          let destDom = $(data);

          destDom.find('span.ev-sub-feed').each(function () {
              const siteName = $(this).attr('data-name');

              if (isVisitorSubFeed(siteName)) {
                  $(this).text('已订阅');
                  $(this).removeClass('waves-effect').removeClass('btn-small').removeClass('ev-sub-feed');
              }
          });

          $('#omrss-explore').html(destDom);
      } else {
          $('#omrss-explore').html(data);
      }
      $('#omrss-explore').scrollTop(0);
      $('.tooltipped').tooltip();
  }).fail(function () {
      warnToast(NET_ERROR_MSG);
  }).always(function () {
      $('#omrss-loader').addClass('hide');
  });
});

 // 发现界面切换到 中国圏
 $(document).on('click', '.ev-cyugokuken-article', function () {
  $('#omrss-loader').removeClass('hide');
  
  const cyugokuken = $(this).attr('data-type');

  $.post("/api/html/recent/articles", {uid: getOrSetUid(), cyugokuken: cyugokuken}, function (data) {
      if (!getLoginId()) {

        // 游客用户
          let destDom = $(data);

          destDom.find('span.ev-sub-feed').each(function () {
              const siteName = $(this).attr('data-name');

              if (isVisitorSubFeed(siteName)) {
                  $(this).text('已订阅');
                  $(this).removeClass('waves-effect').removeClass('btn-small').removeClass('ev-sub-feed');
              }
          });

          $('#omrss-explore').html(destDom);
      } else {
          $('#omrss-explore').html(data);
      }
      $('#omrss-explore').scrollTop(0);
      $('.tooltipped').tooltip();
  }).fail(function () {
      warnToast(NET_ERROR_MSG);
  }).always(function () {
      $('#omrss-loader').addClass('hide');
  });
});

 // 发现界面切换到 日本語
 $(document).on('click', '.ev-nihongoken-article', function () {
  $('#omrss-loader').removeClass('hide');
  
  const nihongoken = $(this).attr('data-type');

  $.post("/api/html/recent/articles", {uid: getOrSetUid(), nihongoken: nihongoken}, function (data) {
      if (!getLoginId()) {

        // 游客用户
          let destDom = $(data);

          destDom.find('span.ev-sub-feed').each(function () {
              const siteName = $(this).attr('data-name');

              if (isVisitorSubFeed(siteName)) {
                  $(this).text('已订阅');
                  $(this).removeClass('waves-effect').removeClass('btn-small').removeClass('ev-sub-feed');
              }
          });

          $('#omrss-explore').html(destDom);
      } else {
          $('#omrss-explore').html(data);
      }
      $('#omrss-explore').scrollTop(0);
      $('.tooltipped').tooltip();
  }).fail(function () {
      warnToast(NET_ERROR_MSG);
  }).always(function () {
      $('#omrss-loader').addClass('hide');
  });
});

  // 发现界面切换到 英語圏
  $(document).on('click', '.ev-eigoken-sites', function () {

    $('#omrss-loader').removeClass('hide');

    const eigoken = $(this).attr('data-type');

    $.post("/api/html/recent/sites", {uid: getOrSetUid(), eigoken: eigoken}, function (data) {
        if (!getLoginId()) {
            // 游客用户
            let destDom = $(data);

            destDom.find('span.ev-sub-feed').each(function () {
                const siteName = $(this).attr('data-name');

                if (isVisitorSubFeed(siteName)) {
                    $(this).text("\u53d6\u308a\u6d88\u3057");
                    $(this).addClass("omrss-bgcolor");
                }
            });

            $('#omrss-explore').html(destDom);
        } else {
            $('#omrss-explore').html(data);
        }

        $('#omrss-explore').scrollTop(0);
        $('.tooltipped').tooltip();
    }).fail(function () {
        warnToast(NET_ERROR_MSG);
    }).always(function () {
        $('#omrss-loader').addClass('hide');
    });
});


  // 发现界面切换到 中国圏
  $(document).on('click', '.ev-cyugokuken-sites', function () {

    $('#omrss-loader').removeClass('hide');

    const cyugokuken = $(this).attr('data-type');

    $.post("/api/html/recent/sites", {uid: getOrSetUid(), cyugokuken: cyugokuken}, function (data) {
        if (!getLoginId()) {
            // 游客用户
            let destDom = $(data);

            destDom.find('span.ev-sub-feed').each(function () {
                const siteName = $(this).attr('data-name');

                if (isVisitorSubFeed(siteName)) {
                  $(this).text("\u53d6\u308a\u6d88\u3057");
                  $(this).addClass("omrss-bgcolor");
                }
            });

            $('#omrss-explore').html(destDom);
        } else {
            $('#omrss-explore').html(data);
        }

        $('#omrss-explore').scrollTop(0);
        $('.tooltipped').tooltip();
    }).fail(function () {
        warnToast(NET_ERROR_MSG);
    }).always(function () {
        $('#omrss-loader').addClass('hide');
    });
});


  // 发现界面切换到 日本語圏
  $(document).on('click', '.ev-nihongoken-sites', function () {

    $('#omrss-loader').removeClass('hide');

    const nihongoken = $(this).attr('data-type');

    $.post("/api/html/recent/sites", {uid: getOrSetUid(), nihongoken: nihongoken}, function (data) {
        if (!getLoginId()) {
            // 游客用户
            let destDom = $(data);

            destDom.find('span.ev-sub-feed').each(function () {
                const siteName = $(this).attr('data-name');

                if (isVisitorSubFeed(siteName)) {
                  $(this).text("\u53d6\u308a\u6d88\u3057");
                  $(this).addClass("omrss-bgcolor");
                }
            });

            $('#omrss-explore').html(destDom);
        } else {
            $('#omrss-explore').html(data);
        }

        $('#omrss-explore').scrollTop(0);
        $('.tooltipped').tooltip();
    }).fail(function () {
        warnToast(NET_ERROR_MSG);
    }).always(function () {
        $('#omrss-loader').addClass('hide');
    });
});


  // 发现界面订阅
  $(document).on('click', '.ev-sub-feed', function () {
  
    const feedName = $(this).attr('data-name');
    var a = $(this).text();
    "\u53d6\u5f97" == a ? (subFeed(feedName), toast("\u53d6\u5f97\u6210\u529f☺️"),
      $(this).text("\u53d6\u308a\u6d88\u3057"), 
      $(this).addClass("omrss-bgcolor"),
      location.reload()
      ) 

      : "\u53d6\u308a\u6d88\u3057" == a && (unsubFeed(feedName), toast("\u53d6\u308a\u6d88\u3057\u6210\u529f^o^"), 
      $(this).removeClass("omrss-bgcolor"), 
      $(this).text("\u53d6\u5f97"),
      location.reload())

});

 $(document).on("click", ".ev-submit-msg", function() {
  if (hasLeaveMsgToday()) warnToast("\u4eca\u65E5\u306F\u30E1\u30C3\u30FC\u30BB\u6709\u96E3\u3046\u660E\u65E5\u6765\u3066\u304F\u3060\u3055\u3044");
  else {
   $("#omrss-loader").removeClass("hide");
   var a = $("#issue-input-detail").val(),
    c = $("#issue-input-name").val(),
    e = $("#issue-input-contact").val();
   $.post("/api/message/add", {
    uid: getOrSetUid(),
    content: a,
    nickname: c,
    contact: e
   }, function(a) {
    $("#omrss-main").html(a);
    $("#omrss-main").scrollTop(0);
    setLeaveMsgToday();
    toast("\u3054\u610f\u898b\6709\u96e3\u3046!")
   }).fail(function() {
    warnToast(NET_ERROR_MSG)
   }).always(function() {
    $("#omrss-loader").addClass("hide")
   })
  }
 });
 $(".ev-toggle-fullscreen").click(function() {
  isInFullscreen() ?
   (exitFullscreen(), $(this).find("i").text("fullscreen")) : (enterFullscreen(), $(this).find("i").text("fullscreen_exit"));
  setTimeout(function() {
   loadPage(getCurPage())
  }, 200)
 });
 $(window).bind("focus", function() {
  isBgWin = !1;
  console.log("\u8f6c\u5230\u524d\u53f0")
 });
 $(window).bind("blur", function() {
  isBgWin = !0;
  console.log("\u8f6c\u5230\u540e\u53f0")
 })
});
(function() {
 function a() {
  if ("debug" === a.LOG_LEVEL) {
   var d = Array.prototype.slice.call(arguments),
    b = window.console,
    g = b && b.log;
   g && (g.apply ? g.apply(b, d) : b.log(d))
  }
 }

 function c(a, b) {
  if ("function" !== typeof a) throw new TypeError('Argument "__constructor" of "Proto" need to be an instance of a "Function"!');
  if (!(b && b instanceof Object)) return a.prototype;
  this.constructor = a;
  for (var d in b) b.hasOwnProperty(d) && (this[d] = b[d])
 }

 function e(a) {
  this.event = a
 }

 function k() {
  this.actions = {
   keydown: [],
   keypress: [],
   keyup: []
  }
 }

 function l(a) {
  this.actionContainer = a;
  this.keyStrokes = "";
  this.prevKeypressActions = null
 }

 function m(a) {
  this.router = a;
  this.bindedEvents = {};
  this.handlers = {};
  this.setHandlers()
 }

 function p(d, b) {
  function g(a) {
   return f.in_array(a, ["keydown", "keypress", "keyup"]) ? !0 : !1
  }
  window.shortcuts = {
   bindEvents: function(a) {
    function b(b) {
     if (g(b)) d.bindEvent(b);
     else throw new TypeError("[shortcuts::bindEvents], invalid types: " + a);
    }
    if (a instanceof Array)
     for (var f = 0, h = a.length; f < h; ++f) b(a[f]);
    else b(a)
   },
   unBindEvents: function(a) {
    for (var b =
      0, g = a.length; b < g; ++b) d.unbindEvent(a[b])
   },
   addActions: function(a) {
    function d(a) {
     var d = f.trim(a.type || "");
     if (g(d)) b.addAction(a);
     else throw new TypeError("[shortcuts::addActions], invalid type: " + a.type);
    }
    if (a instanceof Array)
     for (var c = 0, h = a.length; c < h; ++c) d(a[c]);
    else d(a)
   },
   getActions: function(a) {
    return g(a) ? b.getActions(a) : b.getAllActions()
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
   in_array: function(a, b) {
    if (!(b instanceof Array)) return !1;
    var d = Array.prototype.indexOf;
    if (d && b.indexOf === d) return -1 !== b.indexOf(a);
    d = 0;
    for (var f = b.length; d < f; ++d)
     if (a === b[d]) return !0;
    return !1
   },
   trim: function(a) {
    var d = /^\s+|\s+$/g,
     g = String.prototype.trim;
    a = String(a);
    return g && g === a.trim ? a.trim(a) : a.replace(d, "")
   }
  },
  r = {
   addListener: function() {
    return document.addEventListener ? function(a, b, g) {
     a.addEventListener(b, g, !1)
    } : document.attachEvent ? function(a, b, g) {
     a.attachEvent("on" + b, g)
    } : function(a, b, g) {
     throw 'cannot bind event"' +
      b + '"';
    }
   }(),
   removeListener: function() {
    return document.removeEventListener ? function(a, b, g) {
     a.removeEventListener(b, g, !1)
    } : document.detachEvent ? function(a, b, g) {
     a.detachEvent("on" + b, g)
    } : function(a, b) {
     throw 'cannot remove event"' + b + '"';
    }
   }(),
   EventObject: function(a) {
    a = a || window.event;
    var b = {};
    b.originalEvent = a;
    for (var d = "type altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
      f = d.length, c; f;) c = d[--f], b[c] = a[c];
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
 e.prototype = new c(e, {
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
 k.prototype = new c(k, {
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
 l.prototype = new c(l, {
  handle: function(a) {
   a.isKeypress() ? (this.keyStrokes += a.getKeyStroke(), this.handleKeypress(a)) : this.handleKeyHit(a)
  },
  handleKeypress: function(a) {
   var b = this.getPrevKeypressActions();
   b = this.filterKeypresActions(b, a);
   this.setPrevKeypressActions(b);
   this.execute(b, a)
  },
  handleKeyHit: function(a) {
   var b = this.actionContainer.getActions(a.getEventType());
   b = this.filterKeyHitActions(b,
    a);
   this.execute(b, a)
  },
  filterKeypresActions: function(a, b) {
   function d(a) {
    var d = a.pattern;
    if (d) {
     var g = d.value;
     d.isRegExp ? (g = new RegExp(g), g = g.test(h)) : g = 0 === g.indexOf(h);
     g && f(a) ? c.push(a) : (a = a.fns && a.fns.clear, "function" === typeof a && a(e, h, b))
    } else f(a)
   }

   function f(a) {
    a = a.fns && a.fns.filter;
    return "function" === typeof a ? a(e, h, b) ? !0 : !1 : !0
   }
   for (var c = [], e = b.getKeyStroke(), h = this.keyStrokes, n = 0, t = a.length; n < t; ++n) d(a[n]);
   return c
  },
  filterKeyHitActions: function(a, b) {
   for (var d = 0, f = a.length, c, e, h = [], n = b.getKeyStroke(),
     t = this.keyStrokes; d < f; ++d) c = a[d], e = c.fns && c.fns.filter, "function" === typeof e && e(n, t, b) && h.push(c);
   return h
  },
  execute: function(d, b) {
   var f = b.getKeyStroke(),
    c = this.keyStrokes,
    e = d.length;
   if (0 < e) {
    for (var k = 0, h, n = !0; k < e; ++k)(h = d[k].pattern) && !h.isRegExp && c !== h.value ? h = !1 : (h = d[k].fns, h = h.execute, a("[Router::execute], ", this, f, c, b), h = h(f, c, b)), n = h && n;
    n && (this.clearKeyStrokes(), this.clearPrevKeypressActions())
   } else b.isKeypress() && (this.clearKeyStrokes(), this.clearPrevKeypressActions())
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
 m.prototype = new c(m, {
  setHandlers: function() {
   var a = this,
    b = function(b) {
     b = new e(r.EventObject(b));
     a.router.handle(b)
    };
   this.handlers.keydown = b;
   this.handlers.keypress = b;
   this.handlers.keyup =
    b
  },
  bindEvent: function(d) {
   this.bindedEvents[d] || (this.bindedEvents[d] = !0, r.addListener(document, d, this.handlers[d]), a('[Controller::bindEvent], bind Event: "' + d + '"'))
  },
  unbindEvent: function(d) {
   this.bindedEvents[d] && (this.bindedEvents[d] = !1, r.removeListener(document, d, this.handlers[d]), a('[Controller::unbindEvent], unbind Event: "' + d + '"'))
  }
 });
 (function() {
  var a = new k,
   b = new l(a);
  b = new m(b);
  p(b, a)
 })()
})();
(function(a) {
 var c = a.logger,
  e = function() {
   var a = document,
    c = "CSS1Compat" === a.compatMode;
   return {
    isVisible: function(a) {
     var b = a.getBoundingClientRect();
     return !k.every(["top", "right", "bottom", "left"], function(a, d) {
      if (0 === b[a]) return !0
     })
    },
    isInView: function(a) {
     if (e.isVisible(a)) {
      var b = a.getBoundingClientRect();
      a = ["top"];
      var d;
      if (d = k.every(a, function(a, d) {
        if (0 > b[a]) return !0
       })) return !1;
      var c = e.getViewHeight();
      return (d = k.every(a, function(a, d) {
       if (0 >= c - b[a]) return !0
      })) ? !1 : !0
     }
     return !1
    },
    getElementsInView: function(d) {
     d =
      "string" == typeof d ? a.getElementsByTagName(d) : d;
     var b = [];
     try {
      b = Array.prorotype.slice.call(d)
     } catch (v) {
      for (var c = d.length; c--;) b.push(d[c]);
      b.reverse()
     }
     return d = k.filter(b, function(a, b) {
      if (e.isInView(a)) return !0
     })
    },
    getElementPosition: function(a) {
     a = a.getBoundingClientRect(a);
     return {
      top: e.getDocScrollTop() + a.top,
      left: e.getDocScrollLeft() + a.left
     }
    },
    getDocScrollTop: function() {
     return a.documentElement.scrollTop || a.body.scrollTop
    },
    getDocScrollLeft: function() {
     return a.documentElement.scrollLeft || a.body.scrollLeft
    },
    getViewHeight: function() {
     var d = window.innerHeight;
     "undefined" == typeof d && (d = c ? a.documentElement.clientHeight : a.body.clientHeight);
     return d
    },
    getViewWidth: function() {
     return c ? a.documentElement.clientWidth : a.body.clientWidth
    },
    getDocHeight: function() {
     return Math.max(a.documentElement.scrollHeight, a.body.scrollHeight)
    },
    addStyleSheet: function(d, b) {
     var c = a.createElement("style");
     c.type = "text/css";
     if (c.styleSheet) c.styleSheet.cssText = d;
     else {
      var f = a.createTextNode(d);
      c.appendChild(f)
     }
     for (var e in b) b.hasOwnProperty(e) &&
      c.setAttribute(e, b[e]);
     a.body.appendChild(c)
    }
   }
  }(),
  k = function() {
   var a = Array.prototype,
    c = a.indexOf,
    d = a.forEach,
    b = a.map,
    e = a.filter,
    l = a.every,
    m = String.prototype.trim,
    q = {
     indexOf: function(a, b) {
      if (null == a) return -1;
      if (c && c === a.indexOf) return a.indexOf(b);
      for (var d = 0, h = a.length; d < h; ++d)
       if (b === a[d]) return d;
      return -1
     },
     in_array: function(a, b) {
      return -1 === q.indexOf(b, a) ? !1 : !0
     },
     forEach: function(a, b, c) {
      if (null != a)
       if (d && d === a.forEach) a.forEach(b, c);
       else if (a instanceof Array)
       for (var f = 0, h = a.length; f < h && !1 !== b.call(c,
         a[f], f, a); ++f);
      else
       for (f in a)
        if (a.hasOwnProperty(f) && !1 === b.call(c, a[f], f, a)) break
     },
     map: function(a, c, d) {
      if (null != a) {
       if (b && b === a.map) return a.map(c, d);
       var f = a instanceof Array ? [] : {};
       q.forEach(a, function(a, b, e) {
        f instanceof Array ? f.push(c.call(d, a, b, e)) : f[b] = c.call(d, a, b, e)
       });
       return f
      }
     },
     filter: function(a, b, c) {
      if (null != a) {
       if (e && e === a.filter) return a.filter(b, c);
       var d = a instanceof Array ? [] : {};
       k.forEach(a, function(a, f, e) {
        b.call(c, a, f, e) && (d instanceof Array ? d.push(a) : d[f] = a)
       });
       return d
      }
     },
     every: function(a,
      b, c) {
      if (null == a) return !0;
      if (l && l == a.every) return a.every(b, c);
      var d = !0;
      k.forEach(a, function(a, f, e) {
       if (!(d = d && b.call(c, a, f, e))) return !1
      });
      return d
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
      return m && m === a.trim ? a.trim(a) : a.replace(b, "")
     },
     upperFirst: function(a) {
      a = String(a);
      return a.charAt(0).toUpperCase() + a.substr(1)
     }
    };
   return q
  }(),
  l = function() {
   var f = [],
    e = [],
    d = function(a, c, d) {
     c = "function" === typeof c ? c() :
      c;
     c.type = a;
     f.push(d);
     e.push(c)
    };
   return {
    addKeydown: function(a, c) {
     d("keydown", c, a)
    },
    addKeypress: function(a, c) {
     d("keypress", c, a)
    },
    addKeyup: function(a, c) {
     d("keyup", c, a)
    },
    init: function(b) {
     b = b || [];
     for (var d = 0, l = f.length; d < l; ++d)
      if (!k.in_array(f[d]), b) a.addActions(e[d]), c.log('[V::init], add action: "' + f[d] + '"')
    }
   }
  }(),
  m = function(a, c, d) {
   return d.isValidKeyStroke()
  };
 l.addKeypress("srcollDown", {
  pattern: {
   value: "j"
  },
  fns: {
   filter: m,
   execute: function() {
    var a = $("#omrss-main").scrollTop();
    $("#omrss-main").scrollTop(a +
     200);
    return !0
   }
  }
 });
 l.addKeypress("srcollDown", {
  pattern: {
   value: " "
  },
  fns: {
   filter: m,
   execute: function() {
    var a = $("#omrss-main").scrollTop();
    $("#omrss-main").scrollTop(a + 600);
    return !0
   }
  }
 });
 l.addKeypress("scrollUp", {
  pattern: {
   value: "k"
  },
  fns: {
   filter: m,
   execute: function() {
    var a = $("#omrss-main").scrollTop();
    $("#omrss-main").scrollTop(a - 200);
    return !0
   }
  }
 });
 l.addKeypress("goTop", {
  pattern: {
   value: "gg"
  },
  fns: {
   filter: m,
   execute: function(a, e) {
    c.log("gotop");
    $("#omrss-main").scrollTop(0);
    toast("\u4e0a\u306b\u623b\u308b");
    return !0
   }
  }
 });
 l.addKeypress("hackCopyLeft", {
  pattern: {
   value: "zz"
  },
  fns: {
   filter: m,
   execute: function(a, c) {
    $("#omrss-third").removeAttr("style");
    $(".cnt-right").css("overflow-y", "scroll");
    return !0
   }
  }
 });
 l.addKeypress("goBottom", {
  pattern: {
   value: "G"
  },
  fns: {
   filter: m,
   execute: function() {
    var a = $("#omrss-main")[0].scrollHeight;
    $("#omrss-main").scrollTop(a);
    toast("\u5230\u8fbe\u5e95\u90e8");
    return !0
   }
  }
 });
 l.addKeypress("nextArticle", {
  pattern: {
   value: "n"
  },
  fns: {
   filter: m,
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
 l.addKeypress("prevArticle", {
  pattern: {
   value: "N"
  },
  fns: {
   filter: m,
   execute: function() {
    var a = $(".ev-cnt-list.active").prev();
    1 === a.length ? (a.click(), toast("\u4e0a\u4e00\u7bc7")) : toast("\u5df2\u7ecf\u662f\u7b2c\u4e00\u7bc7\u4e86");
    return !0
   }
  }
 });
 l.addKeypress("toggleFullscreen", {
  pattern: {
   value: "F"
  },
  fns: {
   filter: m,
   execute: function() {
    $(".ev-toggle-fullscreen").click();
    toast("\u5207\u6362\u5168\u5c4f");
    return !0
   }
  }
 });
 l.addKeypress("refreshSite", {
  pattern: {
   value: "r"
  },
  fns: {
   filter: m,
   execute: function() {
    $("#omrss-loader").removeClass("hide");
    location.reload();
    $("#omrss-loader").addClass("hide");
    toast("\u5237\u65b0");
    return !0
   }
  }
 });
 l.addKeypress("nextPage", {
  pattern: {
   value: "p"
  },
  fns: {
   filter: m,
   execute: function() {
    var a = $(".ev-page-next");
    1 === a.length ? (a.click(), toast("\u4e0b\u4e00\u9875")) : warnToast("\u5df2\u7ecf\u662f\u6700\u540e\u4e00\u9875\u4e86");
    return !0
   }
  }
 });
 l.addKeypress("markAndNextPage", {
  pattern: {
   value: "D"
  },
  fns: {
   filter: m,
   execute: function() {
    $(".collection li[id]").each(function(a) {
     setReadArticle(this.id);
     a = $(this).find("i.unread");
     a.removeClass("unread").addClass("read");
     a.text("check");
     $(this).find(".omrss-title").removeClass("omrss-title-unread")
    });
    updateUnreadCount();
    loadPage(parseInt(getCurPage()) + 1);
    toast("\u6807\u8bb0\u672c\u9875\u5df2\u8bfb");
    return !0
   }
  }
 });
 l.addKeypress("previousPage", {
  pattern: {
   value: "P"
  },
  fns: {
   filter: m,
   execute: function() {
    var a =
     $(".ev-page-previous");
    1 === a.length ? (a.click(), toast("\u4e0a\u4e00\u9875")) : warnToast("\u5df2\u7ecf\u662f\u7b2c\u4e00\u9875\u4e86");
    return !0
   }
  }
 });
 (function() {
  function a(a) {
   for (var b = "abcdefghijklmnopqrstuvwxyz".split(""), c = "0123456789abcdefghijklmnop".split(""), d = b.length, e = Number(a - 1).toString(d).length, f = [], n = 0, g, h, l, m; n < a; ++n) {
    g = 0;
    m = "";
    for (l = n.toString(d); h = l.charAt(g++);) h = k.indexOf(c, h), m += b[h];
    m.length < e && (m = Array(e - m.length + 1).join(b[0]) + m);
    f.push(m)
   }
   return f
  }

  function r(a, b, c) {
   var d = b.substr(1);
   return k.filter(a, function(a, b) {
    if (0 === a[0].indexOf(d)) return !0;
    c.removeChild(a[2]);
    a[0] = a[1] = a[2] = null
   })
  }

  function d(b, c) {
   var d = [],
    f = a(b.length);
   k.forEach(b, function(a, b) {
    var n = document.createElement("ins");
    n.className = "vimlike-shortcuts-found-tag";
    var g = e.getElementPosition(a);
    n.style.cssText = "left:" + g.left + "px;top:" + g.top + "px;";
    g = f[b];
    n.innerHTML = g;
    c.appendChild(n);
    d.push([g, a, n])
   });
   document.getElementById("vimlike:findStyleId") || e.addStyleSheet('.vimlike-shortcuts-found-tag{position:absolute;z-index:99999;background-color:yellow;color:black;padding:0 1px;border:solid 1px #E3BE23;text-decoration:none;font:bold 12px "Helvetica Neue", "Helvetica", "Arial", "Sans";}', {
    id: "vimlike:findStyleId"
   });
   document.body.appendChild(c);
   return d
  }

  function b(a, b) {
   var c = a.getAttribute("target");
   b && a.setAttribute("target", "_blank");
   g(a);
   b && setTimeout(function() {
    a.setAttribute("target", c);
    a = null
   }, 10)
  }

  function g(a) {
   if (/Firefox/.test(navigator.userAgent)) {
    c.log("[fireClick], firefox, special click");
    var b = a.getAttribute("target"),
     d = !0;
    if (b) "_self" == b && (d = !0);
    else {
     b = document.getElementsByTagName("head")[0].getElementsByTagName("base");
     for (var e = 0, f = b.length; e < f;) d = "_self" == b[e].getAttribute("target") ?
      !0 : !1, ++e
    }
    d ? window.location.href = a.href : window.open(a.href)
   } else document.createEvent ? (d = document.createEvent("MouseEvents"), d.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), a.dispatchEvent(d) ? c.log("[fireClick], not canceled") : c.log("[fireClick], canceled")) : a.click()
  }

  function p() {
   try {
    document.body.removeChild(q)
   } catch (n) {}
   h = q = null
  }

  function u(a, c, f) {
   if ("f" == c.toLowerCase()) {
    a = document.links;
    a = e.getElementsInView(a);
    q = document.createElement("div");
    h = a = d(a, q);
    if (0 == a.length) return !0;
    toast("\u94fe\u63a5\u5168\u89c8")
   } else if (a = h = r(h, c, q), c = a.length, !(1 < c)) return 1 === c && (b(a[0][1], !0), p()), !0
  }
  var q, h;
  l.addKeypress("findf", function(a) {
   return {
    type: a,
    pattern: {
     isRegExp: !0,
     value: a
    },
    fns: {
     filter: m,
     execute: u
    }
   }
  }("^f.*"));
  l.addKeyup("clearFind", {
   fns: {
    filter: function(a, b, c) {
     return c.isEscape()
    },
    execute: function() {
     p();
     window.focus();
     return !0
    }
   }
  })
 })();
 (function() {
  function a(a) {
   for (var c = 0, b = a.length; c < b; ++c) try {
    a[c].blur()
   } catch (g) {}
  }
  l.addKeyup("blur", {
   fns: {
    filter: function(a, c, b) {
     return b.isEscape()
    },
    execute: function(c, d, b) {
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
 var p = function() {
  var c = !1;
  return {
   isOn: function() {
    return c
   },
   setOn: function() {
    c = !0;
    a.bindEvents(["keypress", "keyup"])
   },
   setOff: function() {
    c = !1;
    a.unBindEvents(["keypress", "keyup"])
   },
   toggle: function() {
    c ? p.setOff() : p.setOn()
   }
  }
 }();
 l.init();
 p.setOn();
 a.toggleVimlike = p.toggle;
 a.isVimlikeOn = p.isOn
})(this.shortcuts);

$('.youtube-popup > div').click(function(){
  window.open($(this).parent().children('iframe').attr("src"));
});


//Facebookのシェア数を取得
function get_social_count_facebook(url, selcter) {
  jQuery.ajax({
    url:'https://graph.facebook.com/',
    dataType:'jsonp',
    data:{
      id:url
    },
    success:function(res){
      jQuery( selcter ).text( res.share.share_count || 0 );
    },
    error:function(){
      jQuery( selcter ).text('0');
    }
  });
}
//はてなブックマークではてブ数を取得
function get_social_count_hatebu(url, selcter) {
  jQuery.ajax({
    url:'http://api.b.st-hatena.com/entry.count?callback=?',
    dataType:'jsonp',
    data:{
      url:url
    },
    success:function(res){
      jQuery( selcter ).text( res || 0 );
    },
    error:function(){
      jQuery( selcter ).text('0');
    }
  });
}
jQuery(function(){
  get_social_count_facebook('{Permalink}', '.facebook-count');
  get_social_count_hatebu('{Permalink}', '.hatebu-count');
});
