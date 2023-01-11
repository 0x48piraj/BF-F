# Decog (/nɒtˈhɪdn/)

Your best friend in fingerprinting browsers, detecting automated bots and Ad blocking extensions. _(browser fingerprinting framework... BFF! Get it?)_

In other words, a completely open-source [fingerprintjs/fingerprintjs](https://github.com/fingerprintjs/fingerprintjs) **+** [fingerprintjs/BotD](https://github.com/fingerprintjs/BotD) alternative.

Note: Unlike [UAParser.js](https://github.com/faisalman/ua-parser-js) (`fingerprinting != parser( userAgent )`)


## Why another detection library?

- Most open-source adblocking extension detection libraries are outdated and don't work reliably (eg. [FuckAdBlock](https://github.com/sitexw/FuckAdBlock) &[BlockAdBlock](https://github.com/sitexw/BlockAdBlock), [adblock-detect-javascript-only](https://github.com/NikolaiT/adblock-detect-javascript-only)], [just-detect-adblock](https://github.com/wmcmurray/just-detect-adblock) and more).
- "Incognito" or "Private" browsing mode detection doesn't have any standard open-source library as of now.
- Most open-source bot detection libraries heavily (sometimes solely) depend on User Agent (UA) strings. Decog framework performs plethora of feature detection and sanity tests in addition to UA checks.
