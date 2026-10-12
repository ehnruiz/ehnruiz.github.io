---
title: Found, Read and Quoted
subtitle: Auditing my own site with X-Ray, and what it took to go from 84 to 100
description: "A quality gate turned on its author's site: the baseline, the fixes, the registrations, and what GitHub Pages cannot do."
kind: essay
image: /assets/cards/found-read-and-quoted.png
---

<p class="lede">The first essay on this site argued that a page should be checked by something that never gets bored and never pretends it looked. The obvious test of that argument is to point the checker at the site making it. So I did: X-Ray against mister99.dev, a baseline, a round of fixes, a second run, and then the registrations that turn a published site into a findable one. This is the record, numbers included, because a claim about measurement that arrives without measurements is just another opinion.</p>

<div class="numbers">
<div><b>84 → 100</b><span>Site Health Score</span></div>
<div><b>67 → 25</b><span>findings, all pages</span></div>
<div><b>4 → 2</b><span>pages crawled</span></div>
<div><b>100</b><span>Lighthouse, every page and device</span></div>
<div><b>0 / 0</b><span>errors and warnings on the social cards</span></div>
<div><b>200</b><span>IndexNow's answer on the second submission</span></div>
</div>

## What does "found, read and quoted" mean?

X-Ray's second release was named for the three questions it had learned to ask of a site. Can it be found: do crawlers get in, is there a sitemap, does robots.txt say what it means. Can it be read: is the text in the HTML the server sends, or does it only exist after JavaScript runs, which the crawlers behind AI answers never execute. Can it be quoted: is there structured data saying who wrote this and when, is there an llms.txt, is the page shaped so that an answer engine can lift a paragraph with its author attached.

Those three questions are what people now mean by SEO, GEO and AEO, in the order the acronyms arrived. The site you are reading is small, static and new, which makes it a clean experiment: no legacy, no CMS, nothing to blame but the author.

## What did the baseline find?

The first run scored the site 84 out of 100. Assets, security and JavaScript were near perfect. SEO scored 50 and rendering 67, and 55 of the 67 findings came from two pages I did not know I had published.

They were the HTML templates used to render the site's social cards, sitting in a `scripts` folder that the static site generator dutifully built and listed in the sitemap. No title, no language attribute, no viewport, a 1,200-pixel-wide layout that overflowed every phone, and an orphan link path from nowhere. Every one of those findings was correct, and every one was my mistake, made invisible by the fact that I never opened those URLs because I never knew they existed.

I want to sit with that for a second, because it is the whole case for the tool. I had just spent an hour making the social cards perfect. The pages that rendered them were in the sitemap being offered to Google. A human review would not have caught it, because a human reviews what they built, not what the build produced. One line in the configuration excludes the folder. The crawler found it in four minutes.

The findings on the two real pages were the familiar list: no structured data, no llms.txt, a robots.txt with no User-agent block, no H1 on the home page, a script loading synchronously, and a render-blocking font stylesheet from a third party. Also sixteen failures I could ignore, because they were the footer rules of the microsite portfolio X-Ray was built for: a privacy portal link, a legal notice, a cookie-settings control, a named medical reviewer. A personal essay site has none of those, and should not. Which is its own lesson: a quality gate carries the expectations of the estate it was built for, and the first thing to do on a new kind of site is read the failures and sort them into "true" and "not for me".

## What changed between 84 and 100?

Seven things, in one commit.

**Structured data.** Every page now carries a JSON-LD graph with a Person, a WebSite and, on an essay, a BlogPosting: headline, dates, image, word count, and an author entity that is the same object on every page. Google's validator reads it with no errors. The point is less about rich results than about identity: an answer engine quoting a paragraph can now say who wrote it and link to where they can be found.

**llms.txt and llms-full.txt.** The first is an index: what the site is, who writes it, one line per essay. The second is every essay in full, as Markdown, generated at build time from the same source files as the HTML. A reader that prefers text to pages gets text. Nothing is duplicated by hand, so nothing drifts.

**An explicit robots.txt.** The old one had a sitemap line and nothing else, which is permission by omission. The new one allows everyone, then names the crawlers behind the answer engines one by one, so a reader that checks for its own name finds it.

**A heading, a defer, a font.** The home page had no H1, which is a 1998 mistake I made in 2026. The one script loaded synchronously. The typeface came from Google's servers through a stylesheet that blocked rendering for most of a second on a phone. The font now ships with the site as four files, the script defers, and the home page has a heading.

**The templates out of the build.** One line.

Then the second run: 100 overall, 100 in every category, Lighthouse at 100 on both pages on both desktop and mobile, and findings down from 67 to 25, of which all but a handful are the portfolio rules that do not apply here.

## What did the social cards teach me?

Before the audit, I spent more time than I expected on the preview image that LinkedIn and Teams show when a link is pasted. Three lessons, all small, all the kind nobody writes down.

First, make the card the size the networks render at, 1200 by 630, with the text filling the frame. My first card was a handsome 2000 by 1000 with the name in the bottom corner, in the manner of a site I admire. LinkedIn cropped it and showed a mostly empty cream rectangle.

Second, the networks cache a card by its URL for about a week. Redesign the image under the same name and your contacts keep seeing last week's. Every redesign gets a new file name.

Third, a description of 148 characters gets a warning from one scanner for being too long and a description of 66 characters gets a warning from another for being too short. The window is roughly 100 to 125. Both pages now sit in it.

## What could I not fix?

Two things, and they are worth stating plainly because they are the price of hosting on GitHub Pages.

Security headers. There is no way to set a Content-Security-Policy, a Referrer-Policy or an X-Content-Type-Options header on GitHub Pages. A proxy in front would allow it, but a proxy in front means the proxy holds the TLS certificate instead of GitHub, and for a two-page site that trade is not worth making yet. The one header that matters most, Strict-Transport-Security, is moot: the whole `.dev` top-level domain is preloaded into browsers as HTTPS-only, so there is no plain-HTTP first visit to protect.

And a measurement caveat I owe the reader. The baseline's one bad Lighthouse number, 62 on mobile for the home page, came from a 14-second response for the root document. Two re-runs from Chrome itself measured the server at 40 and 130 milliseconds, and the machine running the audit was seeing multi-second responses from every host that evening. The honest baseline was somewhere in the high seventies, with the font stylesheet as the real cause. A number is only as good as the network it was measured on, and the report should say which network that was.

## What does it take to be found?

A perfect audit score is a site that deserves to be found. Being found is a separate job, and it is mostly registration.

Google Search Console wanted proof of ownership. It offered to connect directly to my DNS provider; I declined and added one TXT record by hand instead, because a verification record is cheaper than a standing authorisation. Verified, sitemap submitted, reports in a day.

Bing Webmaster Tools can import a verified Google property in one click, which I did, then submitted the sitemap and both pages for immediate crawl.

IndexNow is the part I like most. It is an open protocol: a key file at the site root proves you own the site, and a single POST tells Bing, Yandex, Naver and the rest which URLs changed. I wired it to the deployment itself, so every push that publishes a page also announces it, within the same minute. The first answer was a 202, the engines validating the key. The second was a 200.

One gotcha for anyone doing the same on GitHub Pages: the "pages build and deployment" workflow is not a file in your repository, so a `workflow_run` trigger never fires for it. The deployment status event does. That cost me one evening and is now one comment in the workflow file.

## What should the next person reuse?

Point the gate at yourself before you point it at anyone else. The findings you dismiss as not applicable teach you what the tool assumes; the findings you cannot dismiss teach you what you assumed.

Treat the crawler-facing files as part of the site, not as plumbing. robots.txt, sitemap.xml, llms.txt and the JSON-LD are the version of your site that machines read, and machines are now most of the readers.

Keep the audit reports. The before and the after are the evidence for the essay, and the next time a number moves, the question is always "compared to what".

And measure before you write. Every number in this essay came from a run I can re-execute. If one of them is wrong, the run will say so, and that is the only kind of wrong I can live with.
