/**
 * (c) 2019 Piyush Raj
 * hello <@> piyushraj <.> org
 **/

const decogBot = (function(callback) {
  const detectMUA = (userAgent) => {
  /**
   * Literally the easiest way to detect a bot: if they just tell you they're a bot via their user agent string.
   * https://github.com/monperrus/crawler-user-agents
   **/
  const robots = new RegExp([
      /bot/,/spider/,/crawl/,                            // GENERAL TERMS
      /APIs-Google/,/AdsBot/,/Googlebot/,                // GOOGLE ROBOTS
      /mediapartners/,/Google Favicon/,
      /FeedFetcher/,/Google-Read-Aloud/,
      /DuplexWeb-Google/,/googleweblight/,
      /bing/,/yandex/,/baidu/,/duckduck/,/yahoo/,        // OTHER ENGINES
      /ecosia/,/ia_archiver/,
      /facebook/,/instagram/,/pinterest/,/reddit/,       // SOCIAL MEDIA
      /slack/,/twitter/,/whatsapp/,/youtube/,
      /semrush/,                                         // OTHER
    ].map((r) => r.source).join("|"),"i");
    return robots.test(userAgent);
  };

  /**
 * Util to detect browsers/engines based on feature detection.
 **/

BrowserDetection = {
    reduce: function (e) {return e.reduce(function(e,n){return e+(n?1:0)},0)},
    toStringLength: function (e) {return e.toString().length}, // turns a function into a string and measures the length of that string
    touchSupport: function (){var t="ontouchstart"in window;if(t)return t;try{document.createEvent("TouchEvent"),t=!0}catch(r){t=!1}return t}, // detect if the browser has touch support or not
    checkRTT: function () {
  
  var connection = navigator.connection;
  var connectionRtt = connection ? connection.rtt : -1;
  
  return connectionRtt === 0;
  
}, // Round Time Trip of the connection is obtainable in Chromium-based browsers. The RTT equals zero in many bots, but may result in a few false positives
    checkPlugins: function () {
  if (this.isIE() || this.isFirefox()) return false;
  if (!navigator.plugins) return false;
  return navigator.plugins.length === 0
}, // Unless on MSIE or Firefox, navigator.plugins will always have at least one element defined. Note: This does not support mobile browsers, in which case navigator.plugins is always an empty array.
    isIE: function () {
  var w = window,
    n = navigator;
  return this.reduce(["MSCSSMatrix" in w, "msSetImmediate" in w, "msIndexedDB" in w, "msMaxTouchPoints" in n, "msPointerEnabled" in n]) >= 4
},
    isChrome: function () {
  var w = window,
    n = navigator;
  return this.reduce(["webkitPersistentStorage" in n, "webkitTemporaryStorage" in n, 0 === n.vendor.indexOf("Google"), "webkitResolveLocalFileSystemURL" in w, "BatteryManager" in w, "webkitMediaStream" in w, "webkitSpeechGrammar" in w]) >= 5
},
    isSafari: function () {
  var w = window,
    n = navigator;
  return this.reduce(["ApplePayError" in w, "CSSPrimitiveValue" in w, "Counter" in w, "WebKitMediaKeys" in w, 0 === n.vendor.indexOf("Apple"), "getStorageUpdates" in n]) >= 4
},
    isMobileSafari: function () {
  var w = window,
    n = navigator;
  return this.reduce(["safari" in w, !("DeviceMotionEvent" in w), !("ongestureend" in w), !("standalone" in n)]) >= 3
},
    isEdgeHTML: function () {
  var w = window,
    n = navigator;
  return this.reduce(["msWriteProfilerMark" in w, "MSStream" in w, "msLaunchUri" in n, "msSaveBlob" in n]) >= 3 && !this.isIE()
},
    isFirefox: function () {
  return !this.isIE() && !this.isChrome() && !this.isSafari() && !this.isMobileSafari() && !this.isEdgeHTML();
},
    checkChrome: function () {

  /**
   * The following should be true of all Chromium-based browsers:
   * - eval.toString().length should equal 33, otherwise it's lying about its user agent.
   * - If the RTT equals zero, it's probably a bot.
   * - If it's not a mobile browser and navigator.plugins is empty, it's probably a bot.
   **/

  if (this.toStringLength(eval) != 33) return false;
  if (this.checkRTT()) return false;
  if (navigator.userAgent.match(new RegExp(['Mobile', 'Tablet', 'Android'].join('|')) == false && this.checkPlugins())) return false;

  return true;

},
    checkFirefox: function () {

  /**
   * The following should be true of all Firefox browsers:
   * - eval.toString().length should equal 37, otherwise it's lying about its user agent.
   **/

  if (this.toStringLength(eval) != 37) return false;

  return true;

},
    checkSafari: function () {

  /**
   * The following should be true of all Safari browsers, both on macOS and iOS:
   * - eval.toString().length should equal 37, otherwise it's lying about its user agent.
   **/

  if (this.toStringLength(eval) != 37) return false;

  return true;

},
    checkMSIE: function () {

  /**
   * The following should be true of all MSIE browsers:
   * - eval.toString().length should equal 39, otherwise it's lying about its user agent.
   **/

  if (this.toStringLength(eval) != 39) return false;

  return true;

},
    checkEdgeHTML: function () {

  /**
   * The following should be true of legacy Edge:
   * - eval.toString().length should equal 33, otherwise it's lying about its user agent.
   **/

  if (this.toStringLength(eval) != 33) return false;

  return true;

}
}

  const detectHarmony = (userAgent) => {
  if (userAgent.match(new RegExp('Safari'))) {
    if (userAgent.match(new RegExp('Chrome'))) {
      if (userAgent.match(new RegExp('Edge'))) {
        /**
         * Original EdgeHTML-based Microsoft Edge. Obsolete.
         **/
        return !BrowserDetection.isEdgeHTML() || !BrowserDetection.checkEdgeHTML()
      } else {
        /**
         * Chromium-based Browsers (Chrome, Edge, Opera, Brave)
         **/
        return !BrowserDetection.isChrome() || !BrowserDetection.checkChrome()
      }
    } else if (userAgent.match(new RegExp('Mobile Safari'))) {
      /**
       * iOS Devices
       **/
      return !BrowserDetection.isSafari() || !BrowserDetection.isMobileSafari() || !BrowserDetection.checkSafari()
    } else {
      /**
       * macOS Devices
       **/
      return !BrowserDetection.isSafari() || !BrowserDetection.checkSafari()
    }
  } else if (userAgent.match(new RegExp('Firefox'))) {
    /**
     * Mozilla Firefox
     **/
    return !BrowserDetection.isFirefox() || !BrowserDetection.checkFirefox()
  } else if (userAgent.match(new RegExp(['Trident', 'MSIE'].join('|')))) {
    /**
     * Internet Explorer
     **/
    return !BrowserDetection.isIE() || !BrowserDetection.checkMSIE()
  }
};

  function exec() {
    var n = navigator;
    const userAgent = n.userAgent;

    if (detectMUA(userAgent)) return callback({status: 'failed', reason: 'The User Agent string matches malicious signature database.'});

    /**
    * Modern browsers start their user agent strings with "Mozilla/5.0". Bots often do not start their user agent strings with this.
    * Note: This excludes very old browsers such as MSIE 7 and will thus be marked as malicious.
    **/
    if (userAgent.substr(0, 11) !== "Mozilla/5.0") return callback({status: 'failed', reason: 'The User Agent string is malformed or you\'re using a very old browser.'});

    /**
     * Check mobile devices to ensure they have touch support.
     * Note: I don't think that navigator.maxTouchPoints is supported on older versions of iOS Safari, and may come up as a false positive.
     **/
    if (userAgent.match(new RegExp(['Mobile', 'Tablet', 'Android', 'iPhone', 'iPad', 'iPod'].join('|')))) {
      if (n.maxTouchPoints < 1 || !this.touchSupport()) return callback({status: 'failed', reason: 'The User Agent string does not match the browser fingerprint (mobile).'});
    }

/**
 * Bots may screw up the prototype on several variables related to plugins and mime types.
 **/
  try {
    if (PluginArray.prototype === navigator.plugins.__proto__ === false) return callback({status: 'passed'});
  } catch (e) {}
  try {
    if (Plugin.prototype === navigator.plugins[0].__proto__ === false) return callback({status: 'passed'});
  } catch (e) {}
  try {
    if (MimeTypeArray.prototype === navigator.mimeTypes.__proto__ === false) return callback({status: 'passed'});
  } catch (e) {}
  try {
    if (MimeType.prototype === navigator.mimeTypes[0].__proto__ === false) return callback({status: 'passed'});
  } catch (e) {}

/**
 * Some bots will define outerWidth & outerHeight as 0. Something to do with some bots' windows being minimized or the window being very small.
 **/
if (window.outerWidth == 0 && window.outerHeight == 0) return callback({status: 'failed', reason: 'The browser attempted to reorient the window size programmatically.'});

/**
 * Looks for variables defined that indicate the browser is a bot or headless.
 **/
var w = window,
    d = document,
    n = navigator,
    e = d.documentElement,
    windowBotVars = ['webdriver', '_Selenium_IDE_Recorder', 'callSelenium', '_selenium', 'callPhantom', '_phantom', 'phantom', '__nightmare'],
    navigatorBotVars = ['__webdriver_script_fn', '__driver_evaluate', '__webdriver_evaluate', '__selenium_evaluate', '__fxdriver_evaluate', '__driver_unwrapped', '__webdriver_unwrapped', '__selenium_evaluate', '__fxdriver_evaluate', '__driver_unwrapped', '__webdriver_unwrapped', '__selenium_unwrapped', '__fxdriver_unwrapped', '__webdriver_script_func'],
    documentBotAttributes = ['webdriver', 'selenium', 'driver'];

  for (var i = 0; i < windowBotVars.length; i++)
    if (windowBotVars[i] in w) return callback({status: 'failed', reason: 'The browser was detected with malicious variables.'});

  for (var i = 0; i < navigatorBotVars.length; i++)
    if (navigatorBotVars[i] in n) return callback({status: 'failed', reason: 'The browser was detected with malicious variables.'});

  for (var i = 0; i < documentBotAttributes.length; i++)
    if (e.getAttribute(documentBotAttributes[i]) !== null) return callback({status: 'failed', reason: 'The browser was detected with malicious variables.'});

/**
 * navigator.language & navigator.languages are always defined & non-empty, unless the browser is MSIE.
 **/
  if (BrowserDetection.isIE()) return callback({status: 'passed'});

  var n = navigator;

  try {
    var language = n.language;
    var languagesLength = n.languages.length;

    if (!language || languagesLength === 0)
      return callback({status: 'failed', reason: 'The browser was detected with erroneous variables.'});
  } catch (e) {}

    return callback({status: 'passed'});
  }
  var init = function () {
    return exec();
  };
  return init();
});

const decogAdBlocker = (function(callback) {
  // https://stackoverflow.com/questions/4869154/how-to-detect-adblock-on-my-website
  function exec() {
    window.onload = function(e) { 
      if (globalThis.adBlockerEnabled) {
        return callback({status: 'failed', reason: 'You\'re blocking ads'})
      }
      return callback({status: 'passed'});
    }
  }
  var init = function () {
    return exec();
  };
  return init();
});