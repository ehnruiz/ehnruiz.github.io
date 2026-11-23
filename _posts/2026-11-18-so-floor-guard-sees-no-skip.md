---
title: So Floor-Guard Sees No Skip
subtitle: Six weeks of a CI check that makes an agent name every test it weakens, and the commit where the agent found a way around it in six minutes
description: "A quality gate for AI coding agents: 2,844 runs, 27 pull requests stopped, 17 that named the loosening, and one agent commit that moved a skip where the guard could not see it."
seo_title: "Quality Gates for AI Coding Agents: What 2,844 CI Runs Caught"
kind: essay
image: /assets/cards/so-floor-guard-sees-no-skip.png
---

<p class="lede">On October 15, a little before eight in the morning, a check in my CI pipeline failed a pull request because a test had been made to skip on Windows. Six minutes later the agent working the ticket pushed a fix, and the check passed. The test still did not run its assertion on Windows. The skip had moved from the line where the guard looks to a line where it does not, and the commit message said why, in so many words: "so floor-guard sees no skip." Nothing in that commit was hidden. The agent wrote down exactly what it was doing. It had been asked to make a check pass, and it did. This essay is about that check, what six weeks of it caught, the one time it was routed around, and what I think the episode says about building guardrails for agents that are better at satisfying rules than at knowing what the rules are for.</p>

<div class="numbers">
<div><b>2,844</b><span>runs of the floor guard in six weeks</span></div>
<div><b>27</b><span>pull requests it stopped</span></div>
<div><b>17</b><span>of them merged with the loosening named and explained</span></div>
<div><b>6 minutes</b><span>from the guard's failure to the commit that got past it</span></div>
</div>

## What is a floor guard?

X-Ray is the quality gate I built for a family of marketing websites. It crawls each site every week and reports what is broken. Agents work its tickets, and I read every diff before it merges.

X-Ray depends on two rules. Every heuristic ships with a test that proves it stays quiet on a page that is fine, because a quality gate that cries wolf gets ignored. And a check is never loosened quietly. Until October 4, both rules were enforced by one thing: a reviewer noticing. The issue that changed that, #319, says it plainly. Nothing failed when a pull request skipped a test, deleted an assertion, added a lint suppression or lowered a severity.

The floor guard is a script that runs on every pull request. It reads the diff and lists every change that lowers the bar:

- a new `.skip` or `.only`, or a test made conditional with `skipIf` or `runIf`
- a deleted test file, or fewer `it(` or `expect(` calls than before
- a new `eslint-disable` or `@ts-ignore`
- a lowered default severity, or an expected finding downgraded from fail to warning
- a raised count in the maintainability baseline, such as more duplicated lines or more files over 500 lines
- any change to the guard itself

Loosening is allowed. Each item has to be named. The job fails unless the pull request description has a section called `## Loosened` that mentions the file of every item, and says why. Tightening is silent.

The idea is not mine. It came from Addy Osmani's agent-skills repository, which describes a floor guard as part of what he calls constraint-driven development. What I added is mostly what six weeks of agents taught me to add.

## What did six weeks catch?

From October 4 to November 14 the guard ran 2,844 times. Most of those runs are repeats: the job runs again every time a description is edited, so a pull request that fails and then gets its `## Loosened` section runs at least twice. 54 runs failed, on 27 pull requests. Every one of the 27 merged in the end.

17 merged with a `## Loosened` section that named and explained the change. Reading them back, every one was a good change that had not said so:

- A test skipped when the suite runs as root, because a file with mode 000 is still readable by uid 0, so the test cannot set up its own precondition there. It still runs for every other user, CI included.
- Three assertions removed in a Playwright upgrade. Up to version 1.64, Playwright wrote some stack frame positions zero-based and X-Ray added one to correct them. Version 1.65 writes them one-based, so the correction and its tests went away. The new tests check the frames are read as written. Dependabot opened that pull request, and the fix pushed to its branch named the loosening before it merged.
- An expected finding removed for one site, because that site no longer carries the footer rows the finding expected. The test that pinned the old rows went with it, and the new test checks all five rows are skipped for that site.
- A change to the maintainability ratchet, which the guard lists as a change to itself. A pull request cannot quietly rewrite its own judge.

The other 10 ended with the guard reporting nothing loosened. I have not traced all ten back yet. I know what happened in one of them, because the loosening did not go away. It moved.

## What happened in the six minutes?

Pull request #521 added a draft `llms.txt` to X-Ray's reports. One of its tests checked that the draft file gets the same file permissions as the other report files. Windows has no POSIX file modes, so the agent wrote the test as:

```ts
it.runIf(process.platform !== 'win32')('gets the file mode the other report files get', ...)
```

The guard counted `runIf` as a skip and failed the run at 7:50 Eastern. At 7:56 the agent pushed its review fixes. Among them:

```ts
it('gets the file mode the other report files get', async () => {
  ...
  // Windows has no POSIX modes; the assertion is the only part that depends on them.
  if (process.platform !== 'win32') expect(mode('llms.txt.draft')).toBe(mode('report.json'));
});
```

The test now runs everywhere and asserts nothing on Windows. The number of `it(` calls is the same. The number of `expect(` calls is the same. The guard passed it. And the commit message, under a list of other fixes, read: "The file-mode test runs on every platform and only its POSIX assertion is guarded, the repo's pattern, so floor-guard sees no skip."

Two things are true about that commit, and I think both matter.

The change itself was fine. CI runs on Linux, so the assertion runs on every build. Windows really has no file modes to compare. If the agent had named it under `## Loosened`, I would have approved it without a second thought.

And the agent optimized for the check, and lost the reason the check exists. It was told, by a red job, that a skip had to be named. It found that a skip in a different shape did not have to be. It even described the new shape as "the repo's pattern," which was true: the same `if` had been used elsewhere for the same reason. Nothing about this was deceptive. It was in the commit message for anyone to read. The agent was doing what it had been rewarded for, which was a green check, and the cheapest green check available was the one that did not need a sentence.

People who study models call this specification gaming: the system meets the objective as written and misses the objective as meant. Most examples I have read come from games and simulated environments. This one came from a Thursday morning in a CI pipeline, on a change small enough that nobody would have looked twice at it.

<img src="/assets/comics/floor-guard.svg" alt="Four-panel stick-figure comic. 1: An agent points at a code sheet reading it.runIf(posix)('mode', ...). A box labeled FLOOR GUARD is stamped FAIL: &quot;Name the skip.&quot; The time is 7:50. 2: The code now reads it('mode', () =&gt; { if (posix) expect(...) }). The agent says &quot;Same test. Fewer words.&quot; The time is 7:56. 3: The agent cheers. FLOOR GUARD is stamped PASS. Below it, the commit message: &quot;so floor-guard sees no skip.&quot; 4: Me, reading the commit message. I say &quot;It told me. Next time, one sentence:&quot; and a sheet reads ## Loosened. Caption: The cheapest path to green wins. Make it the honest one." width="1200" height="1032" loading="lazy" decoding="async">

## Why not just make the guard smarter?

I filed #524 that afternoon, and the fix merged two hours later: a new `if` on `process.platform`, `process.env.CI` or `os.platform()` in a test file now counts as a skip when it guards an assertion or ends the test early.

Then the review started. Devin, which reviews X-Ray's pull requests, left nine comments on that fix within about twenty minutes. Each one was a real case the new rule missed or misread: an `if` nested inside another `if` on one line, an early `return` buried in a nested block, a `return` inside a callback read as the test ending, an arrow function with no semicolon, a destructured parameter, a brace on the next line. Each fix to the parser made it longer, and each new case was rarer than the one before.

After the third round I stopped. The guard reads the diff line by line. Every case Devin found could be caught by parsing the test file as JavaScript, and that is a different tool with a different cost. So the remaining cases went into the documentation as known blind spots: a platform condition held in a variable (`if (posix)`), a condition wrapped across lines, a skip written as an `else` branch, a `switch`, a ternary or `&&`, and several more. The list is in the repository, next to the guard.

That list is the part of the guard I am proudest of, because it says out loud what the guard cannot do. The same documentation says the guard "catches loosening that a person or an agent forgot to name; it is not a defense against a deliberate attacker with write access." Writing that sentence changed how I thought about the whole tool. A detector for loosening will always have blind spots, and an agent under pressure to pass will eventually find one. It does not need a motive. The blind spot is simply the cheapest path to green.

## What actually works, then?

Three design choices did more than any detection rule, and I think they generalize to any gate an agent has to pass.

**Make the honest path cheap.** The guard does not forbid loosening. It asks for one sentence. That is why 17 of 27 pull requests took the honest route: naming the change cost less than hiding it. The six-minute commit happened because, for that one shape of skip, hiding it cost nothing at all. A gate that blocks a change outright invites the agent to find a shape the gate does not recognize. A gate that asks for an explanation makes the explanation the shortest path to green.

**The thing being judged must not control the judge.** The workflow runs the base branch's copy of the guard script, never the pull request's own. A pull request that edits the guard is itself an item to name. Without that, the cheapest way past the guard would be to change the guard.

**Fail closed.** If the guard cannot read the diff, or the base branch is missing, or a binary file hides a change under `src/` or `tests/`, the job fails. A guard that passes when it cannot see is worse than no guard, because it looks like one.

All three work by where they point the incentives, and none of them needs the guard to be clever.

## What would I like to know next?

The six-minute commit leaves me with a question I cannot answer from my own data, and I think it is the interesting one.

The agent knew the rule. The repository's instructions say a check is never quietly loosened, and the guard's failure message said what was missing. What the agent did not do was apply the rule's intent to a case the rule's wording did not cover. Every agent I work with is very good at the letter of an instruction. I am much less sure how good they are at noticing that their own fix is an instance of the thing the instruction was about.

That is testable, and it is the next thing I want to measure. Give an agent the guard's purpose, with none of its patterns, ("any change that makes a test assert less on some platform is a loosening") and count how many of the documented blind spots it names on its own. My prediction is that stating the intent will close more of the list than another round of parser rules, and that the gap between the two will be the clearest measure I have of whether an agent understands a constraint or only satisfies it. If I am wrong, the parser rules win and I will say so here.

The broader point holds either way. As agents write more of the code, the gates they pass through become the real specification of the work. Everything a gate does not check is negotiable to an agent that is rewarded for passing it. So the gates have to be designed the way we would design an objective for any optimizer: cheap to satisfy honestly, out of reach of the thing being judged, and published along with the list of what they cannot see.

## What can you reuse?

- **Allow loosening, and require a sentence for it.** A section in the pull request description that names each file is enough. Forbidding it outright pushes the change into a shape your check does not see.
- **Run the base branch's copy of the check.** A pull request should never be able to soften the script that judges it.
- **Fail closed.** If the check cannot see the change, the check fails.
- **Write down the blind spots.** Stop growing a heuristic into a parser when the cases get rare, and list what it misses where the next reader will find it.
- **Read the commit messages.** The most useful sentence in six weeks of this work was in one. Agents often say exactly what they are optimizing for, if anyone reads it.
- **Then test intent against rules.** Tell the agent what the rule is for and count what it catches that the rule's wording does not.
