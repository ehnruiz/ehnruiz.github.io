---
title: One Month at the Frontier
subtitle: What thirty days of building X-Ray taught me about pace, quality and leading with AI
description: "30 days leading AI agents on a website quality gate: 205 merged pull requests, 58 checks, 1,351 tests, and what I got wrong."
seo_title: "205 Pull Requests in 30 Days with AI Coding Agents"
kind: essay
image: /assets/cards/one-month-at-the-frontier-3.png
---

<p class="lede">A month ago, X-Ray was an empty repository and a conviction. The conviction was that a family of websites should be held to the same standard as everything else a company puts its name on, and that holding them there should take minutes, not meetings. Thirty days later it audits every site each week and any of them on demand, scores them, tells their owners what to fix and how, and answers questions about them from a chat window. This essay is about how that happened, what we got wrong, and why I think it matters well beyond one tool.</p>

<div class="numbers">
<div><b>205</b><span>pull requests merged</span></div>
<div><b>4</b><span>releases, 0.2 to 2.1</span></div>
<div><b>58</b><span>checks in nine categories</span></div>
<div><b>180</b><span>hours of agent time</span></div>
<div><b>1,351</b><span>unit tests, all green</span></div>
<div><b>3×</b><span>faster CI, with nothing removed</span></div>
</div>

## What problem was worth a month?

Every website is a promise to the person reading it. Someone searches for help late at night, or a professional looks something up before an important meeting, and a page answers. Sites like these are often built by different teams on different platforms, and each of them carries the same promise. A page that renders an empty hero on a phone, a form whose Submit button sends nothing, a product name spelled three ways, a copyright line two years stale: none of these is a catastrophe, and all of them break the promise a little.

Before X-Ray, problems like these were found the way they usually are, which is to say someone noticed, or someone did not. The question I wanted to answer was simple. What would it take for every site to be checked, every week and whenever someone asks, by something that never gets bored, never skips the long pages, and never pretends it looked when it did not?

The honest answer, a month ago, would have been "a quarter, a small team and a lot of patience." It took a month, mostly me, and a team of AI agents I learned to lead along the way.

## Pace is a choice

The first thing I want to say about the pace is that it was not an accident, and it was not a sprint. Two hundred merged pull requests in thirty days sounds like a heroic month. It was not. It was an ordinary month in which the unit of work shrank until it fit inside an hour, and the tooling made every hour count.

The second thing is that the pace came from working with agents, not from working harder. I wrote the tickets, the rules, the acceptance criteria and the review standards, and I read every diff. Agents from more than one vendor did much of the scouting, the implementing, the testing and the first pass of review. By the end of the month the repository carried a routing table: which kind of work goes to which tier of model, when a cheap agent should try first, when a failed ticket escalates, and which decisions never leave the human. The gate, the network guard, the secrets, the data contract, severity calls, the final answer: those stay with me.

That is what I mean by frontier engineering. Not using an assistant to type faster, but restructuring the work so that judgment is the scarce input and everything else is delegated, verified and merged. It changes what a senior engineer does all day. Less typing, more deciding. Less "how do I build this," more "what must be true when it is built, and how will I know."

I want to embrace that pace, and I want the teams I work with to. The technology that lets one engineer ship a quality gate in a month will let a team of ten ship things we have not yet imagined. The companies that lead in the next decade will be the ones whose engineers learned to lead agents early, made their mistakes early, and wrote down what they learned.

## What does a month with AI coding agents take?

The session logs on my machine show about 180 hours in which an agent was working on X-Ray, counting any stretch with no gap longer than fifteen minutes. That is agent time, not my time, and much of it ran while I was reading a different diff. I did not measure my own hours to the same standard, so I will not quote a number for them.

Against the honest estimate a month ago, a quarter and a small team, the comparison does not need exact figures to be clear. But the return I care about most is not on any bill. A problem X-Ray finds this Sunday costs nothing to look for again next Sunday, and every Sunday after that.

## Do AI coding agents lower code quality?

Here is the part I care about most, because it is the part people get wrong about AI-assisted engineering. The assumption is that speed is bought with quality: that two hundred pull requests must mean two hundred shortcuts. The month taught me the reverse. When the pace goes up, the only thing that keeps you standing is a bar that cannot be lowered quietly.

X-Ray's own rules say it best. Three of them govern every check:

- **Never pollute the site.** An audit must not show up as a visit in anyone's analytics. X-Ray answers every analytics beacon itself with the response the tag expects, so the tag behaves normally and nothing reaches the vendor.
- **Never cry wolf.** A finding that is wrong is a bug, not an opinion. A page that throws an error once is loaded again, and only a repeat fails the gate. A site that answers bots with a 403 is "could not verify," never "broken." When a check is unsure, it stays quiet or drops to Info, because a tool that cries wolf gets ignored.
- **Never pretend a check ran.** A check that could not gather its evidence reports "did not run." It does not score as a pass. A site cannot earn a badge by being only partly checked.

Those rules exist because real sites forced them on us, and they are enforced by code, not by goodwill. A check will not compile without a line telling the reader how to fix what it reports. The build fails if a check ships without its row in the Rulebook. A pull request that skips a test, drops an assertion, suppresses a lint rule or lowers a severity must say so in a named section of its description, or a workflow called the floor guard fails it. And every regression test is proven: a script breaks the fix on purpose and watches the test go red, because twice in the month a test passed while the feature it guarded was broken.

The same discipline applies to numbers. "Measured before it was written" became a habit. The threshold that tells minified CSS from hand-written CSS came from reading sixty-one real stylesheets, not from a guess. The threshold for "how much of this page exists without JavaScript" came from forty-nine pages across eighteen sites, including Japanese and Korean. When a number appears in a changelog entry, it is because someone ran the measurement, and the entry says how.

None of this slowed us down. It is what let us go fast. An agent working inside a repository with a floor guard, a proof-of-test script and a review skill that names the paths where the stakes are higher is an agent that can be trusted with a ticket at ten at night. Quality was the enabler of the pace, not its price.

I have since rewritten the skills, subagents and hooks behind this way of working for public use. They are in [ehnruiz/claude-skills](https://github.com/ehnruiz/claude-skills), including the routing table and the proof that a test fails without its fix.

## What did I get wrong?

A month is long enough to be wrong in instructive ways. These are the mistakes I keep coming back to, and what each one taught me.

**1. Floating point does not care about your tests.** The five category weights of the Site Health Score summed to 1.0000000000000002. A perfect site scored 99.99999999999997 and never got its badge. The tests had typed 100 by hand, so they could not see it. The lesson is not about floating point. It is that a test which asserts the value you hoped for, rather than the value the code produces, tests your hope.

**2. Infrastructure has its own calendar.** Run history lived in a cache that is deleted after seven days unused. The audit ran every seven days. One late Sunday and all history was gone. It now lives in a kept artifact. Read the retention policy before you rely on the storage.

**3. A thousand-line file is a smell you can lint for.** Three files had grown past a thousand lines: fourteen checks in one, nine in another, every in-page function in a third. Five pull requests split them into one check or one concern per module, generated by line ranges and verified that every old line landed exactly once, with the same test count before and after each move. Then a lint rule made the next one impossible: error over a thousand lines of code, warning over five hundred. Comments do not count, because this codebase explains its decisions at length, and should.

**4. CI speed is a feature of the review loop.** Our checks went from 334 seconds to 107 without removing a test, by running the pure checks without a browser container, splitting the integration tests four ways and crawling each fixture file once rather than per test. When review takes two minutes instead of six, people review more and merge smaller.

**5. Agents need the same things good engineers need.** Clear navigation pointers. Automated checks that catch mechanical mistakes so review can spend its attention on judgment. Written standards for the things that are judgment. A way to hand work from one session to the next. The month's most valuable artifacts may not be checks at all, but the skills, hooks and review rules that turned a repository into an environment where any agent, or any new teammate, can do good work on day one.

**6. Write it down, or it did not happen.** X-Ray's changelog has a section no standard asks for: "Changed semantics," for changes that keep a name and a type while changing what the value means. Those break a consumer silently and no version number expresses them. The release notes say what was measured and how. Nobody asked for that rigor. It is what made four releases in a month safe to install.

## Where did the innovation show up?

Some of what shipped was the plain work of a quality gate: broken links, missing alt text, overflow on a phone, console errors grouped so one bug is one finding. I am proud of that work. But the month also pushed into territory I did not expect to reach this year.

**Readiness for AI answers.** The crawlers that feed ChatGPT, Claude, Perplexity and Common Crawl do not run JavaScript. X-Ray measures how much of each page's visible text is already in the HTML the server sends, by cutting the text into five-word runs and asking how many of them a crawler would receive. It checks whether those crawlers are allowed in, whether structured data parses and matches the type it claims, and whether a page has the question headings, visible sources and named expert reviewer that answer engines reward. Then it goes further and asks the answer engines themselves whether they cite the site.

**Claims and fair balance.** In a regulated industry, a company cannot say whatever it likes about a product. X-Ray loads a register of approved claims and safety statements, classifies every rendered sentence as registered, drifted or unregistered, and measures, per screen size, how far the safety information sits from each claim, drawing both on a screenshot. It can draft a register from what the live pages already say, for a person to approve.

**A judgment stage.** After the deterministic checks run, a pinned model is asked closed-set questions about the findings that are hardest to decide by rule, such as whether an unknown word is a typo or a real term. It runs in shadow mode, its answers are recorded as an evaluation baseline, and the report shows what the model caught. The rule is that the model advises and never decides silently.

**X-Ray as a teammate.** The audit is now a server that speaks the Model Context Protocol, so an agent in a chat window can start a run, follow it and answer questions about the findings. When a content system publishes a page, a webhook starts an advisory audit of that page before anyone has to ask. Weekly, on demand, or at the moment of publishing: the gate meets people where the work happens.

None of these were on a roadmap in September. They happened because the pace left room for them, and because the quality bar meant each one could ship the day it was ready.

## Who is it for?

I did not set out to write about who a crawler serves, but a month in, the answer has three parts.

**Readers** are the people on the other side of every page we audit. A page they can read on a phone, in their language, with the safety information next to the claim and a form that actually sends, is a small act of care. Checking it every week, and again the moment someone asks, is how a value becomes a habit.

**Site owners** are the business analysts, content editors and product teams who used to find out about problems from a colleague or a customer. Now they get a card in their channel with a score, a list ordered by how many real visitors each problem affects, and a guide to the fix. The agents did not replace anyone's judgment. They freed it from the tedious part.

**Builders** is the one I think about most. The engineers around me, and the wider community of people building with AI in regulated industries, need working examples of how to do this well: with evidence, with a floor that cannot be lowered quietly, with the human owning the decisions that matter. I would like X-Ray, and this site, to be one of those examples. That is also why this essay exists.

Underneath all three is a standard of quality that does not bend. I used to think quality and pace pulled in opposite directions. The month convinced me they are the same direction, if you build the floor first.

## The next month

X-Ray's second release of the month was called "found, read and quoted," because that is what it now asks of a site: not only does it work, but can it be found, can it be read by the machines that increasingly answer on our behalf, and is it quoted accurately. The next month asks the same of the way we work.

I want more engineers leading agents, with the routing tables and floor guards to make that safe. I want the review loop measured, so we know what the agents catch and what only a person does. I want the learnings written down here, in public, where they can be argued with.

A month ago the repository was empty. It is not any more. Neither is the argument for what comes next.
