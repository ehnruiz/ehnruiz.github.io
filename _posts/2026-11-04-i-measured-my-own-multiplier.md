---
title: I Measured My Own Multiplier
subtitle: Fifty-two days of agentic engineering, counted against every baseline I could find, and the two numbers that did not move
description: "784 merged pull requests in 52 days: 9x, 19x or 261x depending on the baseline. The team moved 1.35x and the sites 2.4 points. Why 10x is measured on yourself and 100x on everyone else."
seo_title: "10x vs 100x Engineer with AI Agents: What 52 Days of Data Show"
kind: essay
image: /assets/cards/i-measured-my-own-multiplier.png
---

<p class="lede">On September 11 I started working with AI agents the way I now think everyone will: tickets instead of keystrokes, a routing table instead of a chat window, every diff read before it merges. Fifty-two days later I pulled my own GitHub history and asked the question people keep asking about agentic engineering. Is this 10x, or 100x? The answer depends on what you compare it to, and the honest version of it is two numbers I did not expect: the multiplier on me, which is whatever you want it to be, and the multiplier on everyone and everything around me, which is close to one. This essay is the measurement, the baselines, and what I am going to do about the second number.</p>

<div class="numbers">
<div><b>784</b><span>pull requests merged in 52 days, across 29 repositories</span></div>
<div><b>52 of 52</b><span>days with a contribution; 208 on the busiest</span></div>
<div><b>9x to 261x</b><span>my multiplier, depending on the baseline</span></div>
<div><b>1.35x</b><span>the 29 engineers around me, same measure, same window</span></div>
<div><b>2.4</b><span>points of Site Health Score gained across the sites, in a tool whose checks changed weekly</span></div>
</div>

## What did fifty-two days look like?

GitHub counts contributions as commits, pull requests, issues and reviews. From November 2025 to September 10, 2026, my account shows 615 of them over 313 days, with 89 of those days active, about seven contributions on a day I did anything at all. The busiest day in that stretch was 29.

From September 11 to November 1 it shows 3,155 contributions over 52 days, every one of them active, about 61 a day. The busiest was October 16, with 208. October alone was 2,516, more than any full year of my career. My two best years as an individual contributor, 2018 and 2019, were 2,127 and 2,266.

Merged pull requests are the number I trust more, because a pull request is a unit of work someone else could inspect. There were 784, across 29 repositories. Most went to X-Ray, the quality gate for a family of websites that I have written about here before, and to its portal. The rest went to the company's main website, to our engineering handbook, to an analytics repository, and to projects that are not mine at all: the Astro documentation, the Starlight theme, an open-source static site generator, an open-source tool for running teams of agents, and my own public skills repository. In the same 52 days before September 11, I merged three.

The days were long. Twelve to sixteen hours most days, weekends included, for the whole stretch. I want to say that plainly, because the numbers could look like a trick, and there was no trick. There was a routing table, a floor guard, a review loop, and a person who could not put it down. I have done this once before: for a year I ran a travel poster studio, Julian Travel Posters, and committed to making a new poster every day for 365 days. I kept it. A streak like that runs on appetite more than discipline. Agentic engineering is the first thing since the posters that I wanted to do every day, and I think that is worth saying out loud, because a lot of what gets written about this work describes it as a chore to be automated. For me it was the opposite. The agents took the part of the work that was not interesting and left me more of the part that was.

## Which multiplier is the right one?

The same 52 days, against every baseline I could find:

| Baseline | Measure | Multiplier |
| --- | --- | --- |
| My own active days, Nov 2025 to Sep 2026 | contributions per active day, 6.9 to 60.7 | 9x |
| My best year as an individual contributor, 2019 | contributions per month, 189 to 2,516 | 13x |
| 2019 | merged pull requests per day, 0.78 to 15.1 | 19x |
| 2024, as a manager | merged pull requests per day, 0.65 to 15.1 | 23x |
| The 12 months before Sep 11 | 56 merged in a year, 784 in 52 days | 98x |
| The 52 days before Sep 11 | 3 merged, then 784 | 261x |

Every row is true. None of them is the answer.

The rows at the top compare me to myself at my most productive, and they say 9x to 19x. The rows at the bottom compare me to myself as a manager who had mostly stopped committing, and they say 100x or more. Both comparisons are honest. Both are also flattering in a way that has nothing to do with agents: a manager who starts writing code again will show an enormous multiplier on code, because the denominator is close to zero.

There are smaller problems too. Agents commit in smaller pieces than I used to, so a ticket that would once have been one pull request is now three. Most of those 784 were reviewed by agents and bots and merged by me, so the count never passed through anyone else's calendar, which a team's count always does. And contributions before 2026 are a private total with no breakdown, so the 2019 comparison mixes commits with pull requests and issues.

When I started this exercise I expected to land on a number. What I landed on is that a multiplier measured on yourself is a number you choose. You choose it with the baseline, and you choose it with the measure. If I wanted to write "100x" in a headline I could cite the fifth row and nobody could call it false. The honest band, against the best version of me, is somewhere between 9x and 19x. I'll call it 10x, and I think that is a fair description of what one engineer with a routing table and a floor guard can do today.

The more useful question turned out to be the one I had not asked.

## What moved for everyone else?

The teams I work with and alongside have the same tools. The same agents, the same skills, the same handbook, several of the same repositories. If the multiplier is in the tools, it should show up in their numbers too.

So I ran the same measure on them. Twenty-nine engineers across the four engineering teams closest to mine, merged pull requests, the 52 days before September 11 against the 52 days after. The sum went from 311 to 420. That is 1.35x. The median engineer went 1.29x. The strongest mover went 4x, from a small base. Two people fell by half. Nine had nothing merged in either window, which usually means their work lands somewhere GitHub does not count.

I want to be careful with this. 1.35x is not nothing. A third more merged work across 29 people is real. And the comparison is unfair in the ways the first table was unfair: nobody else spent 52 days at 14 hours, and nobody else was building the tooling that made their own work faster. But it answers the question I was avoiding. The agents are available to all 30 of us. One of us moved 261x on the measure and 29 moved 1.35x. The multiplier was not in the tools. It was in the way one person had restructured his work around them, and that restructuring had not transferred.

Then there is the second number, which is worse.

X-Ray exists to make a family of websites better. It audits every site each week, scores it, and tells the owner what to fix and how. It ran every week through this period. For the 24 sites that were in every run from the first full one on September 24, the mean Site Health Score went from 63.8 to 66.2: thirteen sites up, five down, six unchanged. Across all 47 sites in the mid-October runs, the mean sat between 66 and 69.

Two and a half points. And I cannot credit even those to fixes, because X-Ray's checks changed every single week in that period. New checks were added, and thresholds were re-measured and moved. A score that moves 2.4 points inside a tool whose rules moved more than that is not a trend. It is noise with a hopeful sign.

The tool's own issue tracker says it best. The ticket for a remediation workflow opens with the line that X-Ray finds problems faster than anyone can fix them, and lists what is missing: who triages, who fixes, with what capacity, tracked where, with what target time. All of those boxes are still open. There is one rule in place, approved in October, for one platform's releases: anything a visitor would notice gets reworked before launch, and the rest goes to a backlog. Nothing covers the weekly run.

So the honest profile after 52 days is this. On throughput, 10x. On the team, 1.35x. On the thing the throughput was for, about 1x. I built a machine that reports at ten times the speed and connected it to a world that fixes at the old speed.

<img src="/assets/comics/multiplier.svg" alt="Four-panel stick-figure comic. 1: Me in 2019 at a desk, typing. I say &quot;One ticket. One day.&quot; A small contribution grid is mostly pale. Below: 0.8 PRs a day. 2: Me in 2026 pointing at four small agents labeled scout, builder, tester and reviewer, with arrows from me to each. I say &quot;Tickets out.&quot; A grid fills dark green. Below: 15 a day. 3: Me in 2019 asks &quot;Which number is true?&quot; Me in 2026 points at a board: vs 2019, 19x; vs 2024, 23x; vs last year, 98x; vs summer, 261x. &quot;All of them. Pick a baseline.&quot; 4: Me in 2026 reading a diff. I say &quot;Diffs in. Every day.&quot; A box labeled FLOOR GUARD is stamped PASS, and a calendar of 52 squares fills in. Below: 52 of 52 days. Caption: Same engineer. The work changed shape." width="1200" height="1032" loading="lazy" decoding="async">

## Why isn't it 100x yet?

I have a working definition of each level now, and it is not about tools.

**1x** is an assistant that helps you type. The shape of your work is unchanged; you do the same things a bit faster.

**10x** is one person restructuring their own work around agents: tickets small enough for a worker to finish alone, a routing table that sends each step to the cheapest model that can do it, a floor that cannot be lowered quietly, and a person who reads every diff. I have written about each of those pieces. Together they get you the first table.

**100x** is when the restructuring is no longer yours. Other people's throughput moves. Work runs without your attention being the bottleneck. And the outcome the work was for moves too, measurably, in a way you did not have to argue for.

By that definition, three things are missing, and I can put a number or a date on each.

**The team has not moved.** 1.35x, measured. I spent 52 days learning to lead agents and nobody learned it beside me. Every skill and rule I wrote is in a repository the team can read, and reading is not how anyone learned this. I learned it by doing it fourteen hours a day with the floor guard failing my pull requests. The transfer has to be the same: a person, a ticket, a review loop, next to someone who has done it.

**The autonomous loops are mostly still mine.** One is running without me. Every thirty minutes, a job on a laptop at home takes the oldest open bug in X-Ray's own tracker that nobody has claimed and hands it to a build seat in an open-source rig tool; a second seat reviews the result, and I ship it. That loop has taken its first tickets. Everything else that would make X-Ray act on its own, from audits triggered when a page is published to runs hosted where a team can start them, is a ticket, a draft, or a pull request waiting on infrastructure that is not mine to merge.

**Nothing measures the outcome.** The score is the only outcome number I have, and I just explained why it does not count. Days from a finding to its fix, read from the run history, is the number that would. X-Ray already records, run by run, which findings are new and which stopped appearing. Nobody has yet asked it to add up the days in between.

I also want to say something about the hours, because they bear on the definition. A 100x that depends on one person working sixteen hours a day is a 10x with no sleep. Part of what separates the two levels is that the second one has to survive the person going home.

## What would resolving look like?

The gap between finding and fixing is where the next level is, so the next thing X-Ray learns to do is resolve.

The plan is three lanes, sorted by how much a wrong fix would cost.

**Low risk, resolved without supervision.** A finding whose fix is mechanical and reversible: a missing alt text drawn from the image's own file name and the caption beside it, a stale copyright year, a redirect chain collapsed to its target, a sitemap entry that points at a page that moved. X-Ray makes the change, commits it or saves it in the content system, and reports it as done in the next run. The rule for this lane is that the fix has to be one the tool can verify itself on the next crawl, and one a person could revert in a minute.

**Medium risk, ready for review.** A fix a person should see before it goes live: a rewritten page title, a claim that drifted from its approved wording, a form that posts to the wrong endpoint, a heading structure that needs reordering. X-Ray opens the change as a pull request or a draft in the content system, with the finding, the evidence and the fix side by side, and the owner approves or declines. Nothing lands until a person says so.

**Hard, a written approach.** A finding whose fix needs a decision: a layout that overflows on phones because the design assumes a width, an accessibility failure baked into a component, a page that has no server-rendered text for the crawlers that feed AI answers. X-Ray writes the approach: what is wrong, what the options are, what each would cost, and which it recommends. The owner decides. The work is still a person's, but the thinking that used to start from zero now starts from a page.

The check decides the lane, in its own definition, and no model gets a vote. Each check already carries a line that tells a reader how to fix what it reports; the next field is which lane the fix belongs in, and the floor guard will refuse a check that does not say. A fix that fails verification on the next crawl moves its check up a lane. A lane assignment is a severity call, and severity calls never leave the human.

The metric is days from finding to fix, per site, read from the run history. The first lane runs on the sites I own by the end of the year, and the number goes on the dashboard beside the score, because a score that improves on its own is the only one I will believe.

## What can you reuse?

- **Measure yourself against your best self, and say which self.** Any multiplier on your own history is a choice of baseline. Publish the table, not the row.
- **Then measure everyone else.** The number that tells you whether you have changed anything is the one on the people and systems around you. Mine was 1.35x, and I would not have known without running it.
- **Count the outcome before you count the output.** If the thing your output was for has not moved, your multiplier is a claim about effort. Find the outcome number, and if the tool's own rules moved during the period, say so before you read the trend.
- **Transfer is a job, not a side effect.** Skills in a repository are documentation. Someone becomes 10x by doing the work next to someone who already is, with the review loop on. Budget for that, or the 10x stays at one desk.
- **Close the loop you opened.** A tool that reports faster than the world can fix has made the world worse in one way: it is now behind on more things. Sort the fixes by risk, resolve the cheap ones, draft the middle ones, plan the hard ones, and measure the days in between.

Fifty-two days gave me a number I can defend, 10x, and a question I cannot yet answer. The next 10x is other people's, and I think that is the more interesting problem.
