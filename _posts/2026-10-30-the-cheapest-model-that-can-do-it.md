---
title: The Cheapest Model That Can Do It
subtitle: Three weeks of routing agent work by model tier, read back from the session logs
description: "538 Claude Code subagent runs, 477 through a routing table by model tier: which tier did the work, the one escalation, and where the tokens went."
seo_title: "Claude Code Subagents and Model Selection: 538 Runs, Measured"
kind: essay
image: /assets/cards/the-cheapest-model-that-can-do-it.png
---

<p class="lede">On October 2 I gave X-Ray's repository a routing table. Six worker agents, each pinned to a model tier in its own file, and one rule for the session in charge: send each step to the cheapest model that can do it, and move a ticket up a tier after two failures. Three weeks later I read the session logs to see what the table had done. Workers ran 538 times, 477 of them as the table's six agents. The cheapest tier took 64 runs. The escalation rule fired once. And the sessions that handed out the work read five times as many tokens as all their workers together. This is the record, with the one ticket where the cheaper model failed.</p>

<div class="numbers">
<div><b>538</b><span>worker runs in 20 days</span></div>
<div><b>64</b><span>on the cheapest tier</span></div>
<div><b>1</b><span>escalation to a stronger model</span></div>
<div><b>42</b><span>review findings on that one ticket</span></div>
<div><b>84%</b><span>of tokens read by the delegating sessions themselves</span></div>
</div>

## What does the routing table say?

The session I talk to is the supervisor. It owns the plan, the judgment calls, the verification and the answer. Everything else goes out as a ticket to a worker that runs in its own context and reports back in a few hundred words.

| Work | Agent | Tier |
| --- | --- | --- |
| Where is X, which files touch Y, summarize a log | `scout` | Haiku |
| A changelog entry, a docs paragraph, a PR body from given facts | `doc-writer` | Haiku |
| One scoped ticket, test-first | `implementer` | Sonnet |
| Tests only | `tester` | Sonnet |
| Cited reading of primary sources | `researcher` | Sonnet |
| Review a diff, judge a reviewer's comment | `reviewer` | Opus |
| Severity, the gate, secrets, the data contract, the final answer | supervisor | the session's model |

The tier lives in each agent's file, so the cheap route is the default and a stronger model is a decision someone has to make on purpose. The escalation rule is one paragraph: a worker that fails its ticket twice, or says it is unsure, moves one tier up with the same ticket and the failed attempt's report attached. Haiku to Sonnet, Sonnet to Opus, Opus to the supervisor. Never the same prompt on the same model a third time.

I wrote that table from the model descriptions and a few days of watching. The logs are the first time I checked it against what happened.

## How do you count what the tiers did?

Claude Code keeps every subagent's transcript next to the session that spawned it. On my machine each one is a pair of files under `~/.claude/projects/<project>/<session>/subagents/`: a `.meta.json` with the agent type, and a `.jsonl` with every message, including the model that answered and the token usage. A few lines of Python count them.

```python
import json, glob, os, collections
runs = collections.Counter()
for meta in glob.glob(os.path.expanduser(
        "~/.claude/projects/*/*/subagents/*.meta.json")):
    agent = json.load(open(meta)).get("agentType")
    model = None
    for line in open(meta.replace(".meta.json", ".jsonl")):
        msg = json.loads(line).get("message")
        if isinstance(msg, dict) and msg.get("model"):
            model = msg["model"]
            break
    runs[(agent, model)] += 1
for (agent, model), n in runs.most_common():
    print(n, agent, model)
```

That version counts every project on the machine, for all time. Mine narrows the glob to X-Ray's folders and keeps runs whose first message is on or after October 3, the first day the table was in use. For token totals, keep the last `usage` per message id. A streamed reply is logged more than once, and only the last entry carries the final count.

The numbers below cover October 3 to 22 on one of my two laptops. The other laptop's logs are not in them. Haiku moved from version 4.5 to 5.5 partway through. "Tokens read" means input tokens, nearly all of them cache reads and cache writes. That measures volume. A cached token costs a fraction of a fresh one and each tier has its own price, so it is no bill.

## Which tier did the work?

| Agent | Tier | Runs | Median tokens read per run |
| --- | --- | --- | --- |
| `implementer` | Sonnet | 233 | 2.0M |
| `reviewer` | Opus | 159 | 1.0M |
| `scout` | Haiku | 50 | 0.46M |
| `researcher` | Sonnet | 27 | 1.2M |
| `doc-writer` | Haiku | 7 | 0.34M |
| `tester` | Sonnet | 1 | |
| general-purpose, for work outside X-Ray | mixed | 57 | |
| other built-in agents | mixed | 4 | |

The six agents' rows include 8 runs of the same agents from my public plugin copy, used on that repository in the last two days.

Three things in that table surprised me.

**Building and reviewing are the job.** Implementers and reviewers made up 392 of the 538 runs. The usual path for a code change was a Sonnet implementer, then an Opus reviewer, then the implementer again with the findings, then the reviewer again.

**The tester never ran on X-Ray.** Its one run was for another repository. The likely reason is in the implementer's own instructions: it works test-first, so the failing test is already part of its ticket, and a separate tests-only ticket rarely came up.

**The cheapest tier did the least.** Scouts and the doc-writer ran 56 times on Haiku. The other 8 Haiku runs were general-purpose and help agents. Most scout runs were lookups that return file and line pointers, which is what the table says. One was a security review of CI workflows across six repositories that I sent to a scout on Sonnet. The table sends reviews to the reviewer and allows a tier override only to escalate, so that run was a misroute. The doc-writer barely ran because prose needed the context the supervisor already held. Handing a writer the facts meant writing them out first, and by then the paragraph was half done.

The 57 general-purpose runs were work outside the table: research for a planning document, batches of message classification, pressure tests for a skill. They ran from the same folder and had nothing to do with X-Ray's code.

## What happened when the cheaper model failed?

The escalation rule fired once in 538 runs. The ticket was a matcher that compares text on a web page with a register of approved wording and sorts each block into registered, drifted or unregistered. Small edits change meaning in that kind of text, which is why it was hard. Everything below happened on one morning, times Eastern. The counts are each reviewer's own tally, leaving out the judgment calls it flagged separately.

**6:37.** A Sonnet implementer took the ticket: normalize both texts, score their similarity, apply thresholds from config, write the tests first.

**6:43.** The first Opus review started. It found 11 problems. Patterns meant to catch superlatives such as "the only" fired on ordinary sentences. A meaning-changing edit, a number swapped or "It is not true that" put in front of an approved sentence, still scored as registered. Text was matched to links by wording alone, so any "Learn more" could pair with the wrong link. I sent the implementer the findings with a decision on each.

**6:57.** The implementer reported every finding fixed, and the second review started. It found 10 more. Sentences with a negation still fired. Link blocks on real pages never paired, because the crawler shortens each element's selector and the new pairing expected the full one.

That is two failures, so the ticket went up.

**7:06.** An Opus implementer took over the same worktree. The prompt carried the second review's findings as eleven numbered items, each with my decision attached: which patterns should need a product name beside them to fire, which negatives had to become tests, where the negation check should stop. The Sonnet implementer had received decisions in the same form after round one.

**7:12.** The third review found 12. They were edge cases and gaps against the ticket now. The step that strips citation numbers also stripped the decimal from "2.5" when a capitalized word followed it, so a page saying 2.9 matched an approved 2.5 exactly, and the number guard built to catch that was defeated.

**7:29.** The fourth review found 9, and one of them came from the escalated fix itself. The new link pairing worked on the cases it was written for. On a list of cards whose links shared one class and the same "Learn more" text, it took the first match, so a block in the second card could borrow the first card's link. A link that was missing would have looked present.

**7:47.** The Opus implementer fixed the four items I sent from the fourth review, and the pull request opened. The review bot on the repository raised seven more over three rounds, and the implementer fixed each. I declined the bot's fourth round by decision. I ran the matcher against a live site's text and a real register, and it merged at 10:27.

Eleven, ten, twelve, nine. The stronger tier did not bring the count down, and its own fix added a bug. The kind of finding changed. The first two rounds were mostly patterns firing where they should not and text normalization bugs. The last two were edge cases, gaps against the ticket, and that one regression. The check that found all 42 was the same in every round: a reviewer that had not written the code, given the diff, the ticket and the standards, and asked for a file, a line and a failure scenario for each finding.

The worker's report after round one said every finding was fixed. Round two found ten more.

## Where did the tokens go?

The workers read about 1.3 billion tokens over the 20 days. The main sessions in X-Ray's folders read about 7.9 billion. That second figure includes 263 sessions that spawned no worker at all and read 1.4 billion between them. Counting only the sessions that handed out work, they read 6.6 billion against their workers' 1.3 billion, or 84% of the total.

The routing table sets the price of the workers' tokens, and the workers' tokens were the smaller line. A worker's context ends with its ticket. It reads what it needs, reports, and is gone. The supervisor's context stays. Every file it opens to plan, every report it reads back, every long tool output stays in the conversation and is read again on every turn after. A session that runs all morning carries its whole morning on each request.

The most expensive reader in the system is the supervisor. Often the best routing decision is to keep a file out of its context altogether. A scout that returns `src/config/load.ts:212` and a short quote keeps the file itself out of the session that rereads everything. A worker's report of a few hundred words does the same for the files behind it.

Most of those supervisor tokens are cache reads, which cost much less than fresh input, and the supervisor ran on the strongest models, which cost more per token. So the 84% is a share of volume and says nothing exact about cost. Volume is what I can change, and most of it sits in the session.

## What would I change?

Three things.

- **Shorter supervising sessions.** The repository has a handoff skill that writes the state of a task to a file so a fresh session can pick it up. A fresh session that reads one handoff file starts lighter than an old one that carries every turn, so a task that changes phase should get a new session.
- **Measure the supervisor per turn.** The script above counts workers. The next version counts what each supervisor turn reads, so a session that is getting heavy shows up early.
- **Drop the tester, or give it a real job.** Zero runs on X-Ray in three weeks. Either the table says tests belong to the implementer, or the tester takes on proving that each new test fails without its fix, which is tests-only work.

## What can you reuse?

- **Pin the tier in the agent's file.** When the cheap model is the default, using the expensive one is a decision you can see in a diff.
- **Escalate with the findings and your decisions written out.** The stronger model gets the same ticket plus what was found and what you decided, so it works from the latest state.
- **Count before you believe your routing table.** Your logs already hold the agent type, the model and the usage for every run. My table expected far more work on the cheapest tier than it got.
- **Review every tier, including the strong one.** The escalated model's fix added a regression, and the fourth review caught it.
- **Look at the supervisor before tuning the workers.** In my logs the delegating sessions read 84% of the tokens.

The supervisor skill and the six agent files are public in [ehnruiz/claude-skills](https://github.com/ehnruiz/claude-skills), escalation rule included.
