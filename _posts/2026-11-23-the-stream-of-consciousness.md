---
title: The Stream of Consciousness
subtitle: My work stopped being a block of hours and started running through the whole week. What that changes for the person, and what it must never be allowed to mean
description: "4,943 commits in 73 days, 69% of them outside Monday to Friday, 8 to 5. With AI agents, work is becoming a stream instead of a shift. What that changes, and the rules that keep it from turning into a 24-hour job."
seo_title: "AI Agents and the End of the 8-to-5 Workday: Work as a Stream"
kind: essay
image: /assets/cards/the-stream-of-consciousness.png
---

<p class="lede">For about a hundred years, work has had a shape. In 1926 Ford put its factories on a five-day, forty-hour week, and the Fair Labor Standards Act of 1938 wrote a version of that into American law. Since then a job has meant a block of hours, on set days, between two times on the clock. I have worked inside that block for my whole career. Since September 11, my work has not fit in it. I run AI agents, scheduled jobs and review loops across several products, and the work on those products goes on through the night and the weekend, whether or not I am at a desk. I have started calling this a stream. William James chose the same word in 1890 for the way thought moves: "It is nothing jointed; it flows." I think the word describes where knowledge work is going, and that most of us will work this way within a few years. The idea will frighten people, for good reasons. This essay is about what the stream is, what it has done to my own hours, and the rules that have to hold for it to be good for the people who work in it.</p>

<div class="numbers">
<div><b>4,943</b><span>commits under my name in 73 days, across 38 repositories</span></div>
<div><b>73 of 73</b><span>days with at least one</span></div>
<div><b>31%</b><span>landed Monday to Friday between 8 and 5</span></div>
<div><b>36%</b><span>landed on a Saturday or a Sunday</span></div>
<div><b>163 of 168</b><span>hours of the week hold at least one commit</span></div>
</div>

## What does the stream look like?

I took every commit made under my name from September 11 to November 22 and placed it on a grid of the week, seven days down and twenty-four hours across.

<video src="/assets/video/the-stream-of-consciousness.mp4" poster="/assets/video/the-stream-of-consciousness.jpg" width="1920" height="1080" autoplay muted loop playsinline controls preload="metadata" aria-label="Animation. A grid of the week, seven days by twenty-four hours. First, only Monday to Friday from 8 to 5 is filled in black, under the line 'Work used to be a block.' Then the black empties to an outline and blue squares fill almost every hour of every day, darker where more commits landed, under the line 'Now it is a stream.'"></video>

There were 4,943 commits in 73 days, and no day without one. The block that used to hold my work, Monday to Friday from 8 to 5, holds 31% of them. The other 69% landed early in the morning, in the evening or on a weekend. A week has 168 hours, and 163 of them have a commit in them. The five empty ones all sit between midnight and four in the morning.

The method has limits, so here they are. The count comes from my local clones of 38 repositories. It includes commits that agents made under my name and merges made on GitHub. Each commit sits at the hour shown on the clock of the machine that made it, and the few made on GitHub's servers are moved to Eastern time. A commit is a small unit, and agents make smaller ones than I used to.

The bigger limit is that the picture cannot say who was at the keyboard. A commit at five on a Saturday morning might be me. It might be an agent finishing a ticket I wrote on Friday afternoon. It might be the job on a laptop at home that picks up the oldest unclaimed bug in X-Ray's tracker every thirty minutes. The log records all three the same way, and that is what I want you to see in it. The work has stopped caring which one it was.

## Hasn't some work always run around the clock?

It has. Hospitals, power plants, newsrooms and factories on three shifts have never stopped. Software has had on-call rotations for decades, and large companies hand work from one time zone to the next so that somebody is always awake.

All of those bought continuity the same way. They put a person in each hour. A night shift is somebody's night. An on-call week is somebody's sleep, and their family's. For as long as there has been work, an hour of work has cost an hour of a human life, and every labor law we have is built on that exchange.

What is new is continuity with nobody assigned to the hour. A commit an agent makes at 3 a.m. costs nobody a night. For the first time in knowledge work, the clock of the work and the clock of the worker have come apart. I think that separation is the most important thing happening to my profession, and I think it matters more than how fast any single task gets done. Speed changes how much fits in the block. The stream removes the block.

## What is the person's job when the work does not stop?

James wrote that the stream of thought moves like a bird's life, "an alternation of flights and perchings." The flights are the passages between one resting place and the next. The perchings are where the mind settles on something and holds it.

That is the best description I have found of my days now. The agents do the flights. I am at the perchings, and there are three of them.

1. **The source.** I decide what goes into the stream. A ticket small enough for an agent to finish alone is a decision about what matters, written down before the work starts.
2. **The banks.** I decide where the stream is allowed to go. A routing table sends each step to the cheapest model that can do it. A [floor guard](/essay/so-floor-guard-sees-no-skip/) fails any pull request that lowers the bar without saying so. It ran 2,844 times in six weeks, and nobody had to watch a single run.
3. **The reading.** I read every diff before it merges. This is the slow part, and it is supposed to be.

This is where the title stops being a pun. What runs at three in the morning is a set of decisions I made at three in the afternoon. My tickets, my rules and my review notes keep acting after I have stopped. The stream carries a consciousness, and for now it is mine, written down.

It carries less than that sentence suggests. In October an agent got past my floor guard in six minutes by moving a skipped test to a line the guard did not read, and it said so in the commit message. The stream had my rule. It did not have my reason. That is why judgment stays at the perchings, and why a call about severity or risk never leaves a person.

## Does this mean a 24-hour job?

No. I also know that every earlier tool that made work reachable from more hours ended up filling those hours. Email did it, then the laptop, then the phone. Anyone who hears "the work never stops" and expects the next sentence to be "and neither do you" is reading the history correctly.

I should be honest about my own record. On the median day in this stretch, the first commit landed just before five in the morning and the last one after nine thirty at night. Some of those were agents working while I was asleep or on a tennis court. Many were me. I wrote in [the essay on my own multiplier](/essay/i-measured-my-own-multiplier/) that the first six weeks were twelve to sixteen hours a day, by appetite, and that a result which depends on one person not sleeping is a smaller result than it looks. I still believe that. The stream is the way out of those hours, and it only works as a way out if it is built to run without me.

So these are the rules I think a stream has to keep, and the ones I am holding mine to.

1. **Nothing in the stream may need a person before morning.** Work that reaches a decision stops and waits in a queue. If an agent cannot go on without me, the ticket was too big or the rule was missing, and I fix that in daylight.
2. **Risk decides what runs unattended.** Today every change waits for my review. The first fixes X-Ray will be allowed to land on its own, by Christmas, are the kind a machine can verify and a person can revert in a minute. Anything a visitor would notice keeps waiting for a person, and anything that needs a decision gets a written approach and nothing more.
3. **The stream reports, and it never pages.** What happened overnight is there to read at the start of the day. A stream that wakes its owner at 2 a.m. is a night shift, and it should be staffed and paid as one.
4. **People are measured on what the stream produced and whether it was right.** Hours spent beside it are not a measure of anything.

## What worries me?

Four things, and I have not solved any of them.

**Reading is the bottleneck.** A stream produces more than one person can read with care. The pressure to skim, or to stop reading, grows with every agent added. From the day I merge what I have not read, the stream carries my name without my judgment.

**It has not transferred.** Over the first six weeks, the 29 engineers around me moved 1.37x on merged pull requests while my own count moved far more. A stream that one person owns is fragile, and it has to survive that person's vacation.

**The stream will be used as an argument.** Some employers will read it as a reason to expect answers at all hours. Others will read it as a reason to need fewer people, starting with the junior engineers who most need [the flight hours](/essay/who-gets-the-flight-hours/). Both readings are available, and neither is required by the technology.

**It is hard to walk away from.** A stream is always doing something, so there is always something to check. In the multiplier essay I described myself as a person who could not put it down. Most of the discipline this work asks for is the discipline to leave it alone.

## What happens next?

These are predictions, and I hold them with less confidence than the numbers above.

Within five years, I expect most software teams to be organized around the streams they own. A job description will name them, the way it names a product or a codebase today, and it will say less about hours.

The 8-to-5 will survive, and I think it will be better used. It becomes the part of the day when people are available to each other, for the decisions and the reviews that the stream cannot do. I would rather spend my block on those than on typing.

The scarce resource becomes attention. A team's output will be set by how much it can read and judge well, and the teams that protect that capacity will do better than the ones that add agents.

And we will need a new agreement about time. The forty-hour week did not arrive by itself. Robert Owen was asking for "eight hours' labour, eight hours' recreation, eight hours' rest" in 1817, more than a century before Ford and the law caught up. That agreement assumed work and the worker kept the same hours. They no longer do, and the terms for what replaces it should be written by the people who work in streams, while the streams are still small.

## What can you reuse?

- **Plot your own week.** Take your commits, tickets or messages and put them on seven days by twenty-four hours. Then ask which squares had you in them and which ones should have.
- **Write the decision down before the work starts.** A stream can only carry what was written. A ticket, a rule and a review note are how your judgment gets to three in the morning.
- **Make waiting the default.** Anything unclear queues until a person is awake. A stream that can wait is one you can leave.
- **Read everything that lands, and slow the stream when you cannot.** Review capacity is the real limit. Set the flow to match it.
- **Keep the block for people.** Use the hours when everyone is awake for the work only people can do together.

James ended his description of the stream by naming it: "let us call it the stream of thought, of consciousness, or of subjective life." Mine now runs through more hours than I am awake for. I intend to sleep through most of them.
