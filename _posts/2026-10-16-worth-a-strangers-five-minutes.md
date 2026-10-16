---
title: Worth a Stranger's Five Minutes
subtitle: Rewriting the docs of my Claude Code skills repository with evidence, and the hook bug the evidence turned up
description: "A docs pass on a Claude Code skills repo: a 99-word opening, measured runtime floors, examples that are reruns, and a stdin bug that failed 5 of 12 CI runs."
seo_title: "Claude Code Skills Repo: Docs That Were Tested, and the Bug They Found"
kind: essay
image: /assets/cards/worth-a-strangers-five-minutes.png
---

<p class="lede">My skills repository for Claude Code had a README that opened like a hundred others: "skills and subagents I use every day", then a list. Accurate, and no reason for anyone to stay. I spent a day making it worth a stranger's five minutes, with one rule: every sentence a reader might act on had to come from a command I had run. That rule rewrote the opening, set two runtime floors by measurement, turned the examples into reruns of real commits, and on the way found a bug in the hooks that had been letting a protected file through. This is the record, commands and exit codes included.</p>

<div class="numbers">
<div><b>99</b><span>words in the new opening</span></div>
<div><b>13</b><span>findings from the review of the first draft</span></div>
<div><b>8,000</b><span>clean spawns that proved nothing</span></div>
<div><b>5 / 12</b><span>CI runs that failed on Node 20</span></div>
<div><b>24 / 24</b><span>runs that passed after the fix</span></div>
<div><b>1.5.1</b><span>released the same day</span></div>
</div>

## What was wrong with the first screen?

The repository is [ehnruiz/claude-skills](https://github.com/ehnruiz/claude-skills): twenty-one skills, six subagents and five hooks that I use in every session. The old README said so and listed seven jobs they do. A developer arriving from a search saw a list of jobs and nothing that set this collection apart from the one in the next tab.

What sets it apart is not the count. The skills are built around proof. A supervisor routes each step to the cheapest model that can do it and moves the step up a tier after two failures. A gate passes by its exit code. A bug fix ships with a test shown to fail without the fix. The library tests itself in CI, down to whether the README lists every skill and whether two skill descriptions compete for the same request. That had to be the first paragraph, and it had to be short. The new one is 99 words, and a test now fails if the README's install command stops matching the plugin manifests.

## What does "verified" mean for a README?

Before touching a line of prose, I ran everything the old README claimed.

| Command | Exit | Output |
| --- | --- | --- |
| `python3 -m unittest discover -s tests` | 0 | Ran 33 tests, OK |
| `node --test tests/hooks/` | 0 | 253 tests, 253 pass |
| `claude plugin validate .` | 0 | Validation passed |
| `npx skills add ehnruiz/claude-skills --list` | 0 | Found 21 skills |

Then the install path, which a README claims and almost nobody checks. I pointed `HOME` and `CLAUDE_CONFIG_DIR` at an empty directory so my own setup stayed untouched, and ran the two commands from the README:

```
$ claude plugin marketplace add ehnruiz/claude-skills
✔ Successfully added marketplace: ehnruiz (declared in user settings)
$ claude plugin install agent-workflow@ehnruiz -y
✔ Successfully installed plugin: agent-workflow@ehnruiz (scope: user)
$ claude plugin list
  ❯ agent-workflow@ehnruiz
    Version: 1.5.0
    Scope: user
    Status: ✔ enabled
```

`claude plugin details` reported 21 skills, 6 agents and 1 hook, and projected about 2,400 always-on tokens per session for the descriptions. That number is Claude Code's own estimate. It went into the docs with that attribution, and no other cost figure did. The old README had a bullet that began "Spend less on each task". It was true in my experience and unmeasured in the repository, so it is gone.

## Where do runtime floors come from?

The hooks README said Node 20 or newer. Nothing said which Python. The scripts use `str.removesuffix`, which arrived in Python 3.9, so I ran the suite on 3.8:

```
$ /usr/local/bin/python3.8 -m unittest discover -s tests
AttributeError: 'str' object has no attribute 'removesuffix'
```

Exit 1. The Mac's system Python is 3.9.6, and the suite passed there, so the floor is a measurement at both ends. For Node, the suite passed on 20.20.0 as well as 22.23.2. The CI workflow now runs a matrix of the oldest promised runtimes and the current ones, Python 3.9 and 3.12 with Node 20 and 22, so the floors stay true as the code changes.

Windows is listed as untested, because it is. The Claude Code hooks reference says `node <script>` works on every platform and says nothing about the Python interpreter name, so the one hook that starts with `python3` is called out as the line a Windows user may have to edit. A docs page that says "untested" where it is untested costs nothing and buys the reader's trust for the lines that say "measured".

## What makes an example grounded?

The temptation with examples is to write the transcript you wish you had. I wanted three, for the three skills that carry the most weight, and each had to be something a reader could rerun from a clone.

**regression-proof.** The skill's second rule is that a regression test counts only if it fails without the fix. Commit `356016b` in the repository fixed the handoff hook trimming a submodule path that ends in a space, and added one test. Following the skill's own recipe, a scratch worktree at the parent commit with only the new test copied in:

```
without_fix=1   FAIL: test_a_trailing_space_in_a_submodule_path_is_kept
with_fix=0      Ran 11 tests, OK
```

The verdict from the skill's table is "proves". That line, with both exit codes, is what the skill asks you to put in a pull request's test plan.

**skill-collision-audit.** The script scores every pair of skill descriptions by the distinctive words they share. Against the repository's own 21 skills it flagged one pair, `explain-the-number` and `regression-proof`, at 0.32, and exited 1. Reading both descriptions, each ends by naming the other and saying which question goes where, so the verdict is "resolved" and nothing changes. The example shows the judgment step, which is the part that matters. The score only makes the shortlist.

**supervisor.** The third example is the pull request itself, because its routing can be checked against the result. The writing stayed with the supervising session: the skill says to keep work you already hold in context, and a cheaper writer would have had no way to know which commands had run. Two tickets went out, a documentation lookup in the background and a review of the committed diff on the strongest model. Which brings me to the review.

## What did the review catch?

Thirteen findings, each with a file, a line and a failure scenario. The worst was in the supervisor example itself: its first draft described the review and a rerun of the gates before either had happened. I had written the example of "the supervisor verifies by exit code" from the plan rather than from the run. The others were of the same family. The changelog had left out five commits that shipped in 1.2.0 and 1.3.0. The new link test skipped any link with a `#fragment`, so a broken `docs/missing.md#section` would have passed. The install page listed the CI matrix as tested when it had not run yet. Four sentences used the contrast construction I ask my own writing to avoid.

Every finding was fixed in a second commit and the gates ran again. The reviewer also ran the suite on the system Python, which is how 3.9 went from an inference to a measurement. A review that only confirms is a review you did not need. This one earned its tokens by catching the author writing the future in the past tense.

## What broke after the merge?

The pull request merged with both CI jobs green. The run on `main` failed. One test, on the Node 20 job: the `config-protection` hook, asked to judge `echo x > eslint.config.js`, answered nothing. Exit 0, empty output, which the hook reserves for "allow". A rerun with no change passed. Classic flake, and the kind that gets a retry button and no further thought.

I had a hypothesis within a minute. The hook reads its event with `readFileSync(0)`. If stdin is a non-blocking pipe and the data has not fully arrived, that call throws `EAGAIN`, and the hook's error path treats any read failure as an empty event and allows. The symptom fit. So I wrote a probe that spawns the hook the way the test does, 400 times on each Node version locally: 800 denies, zero failures. I pushed a throwaway branch that ran the same probe on the Linux runners, 2,000 spawns per version with eight in flight, then 1,000 with two, then 1,000 through the real test helper: 8,000 clean runs. A hypothesis that survives nothing it predicts is a story, and I nearly wrote the story into the fix.

The difference between the probe and the failure was the process tree. The failing hook was spawned by a test file that was itself spawned by `node --test`, with two sibling test files hammering git in parallel. So the throwaway branch got a second commit: the hook instrumented to print its read error to stderr, the failing test made to print that stderr, and the whole suite run twelve times per Node version.

| Node | 12 full-suite runs | Failures | Error the hook reported |
| --- | --- | --- | --- |
| 20.20.2 | before the fix | 5 of 12 | `read-error EAGAIN` |
| 22.23.3 | before the fix | 0 of 12 | none |

The hypothesis was right and the first probe had been wrong about where to look. Five of twelve is not a flake. It is a hook that, under the conditions of a Linux runner on Node 20, lets a write to `eslint.config.js` through roughly four times in ten. Claude Code feeds a hook its event the same way the test does, by writing to stdin and closing it, so nothing about this was specific to tests. The same read serves the commit-secrets hook. The fix reads with `readSync` in a loop, waits five milliseconds on `EAGAIN`, and stops at end of file or after ten seconds, returning what it has so a hook still answers instead of hanging. Four unit tests cover the retry order, the deadline, the end-of-file error and everything else. The instrumented branch ran the suite twelve more times per version with the fix in place: 24 of 24 passed. Then the branch was deleted, because evidence belongs in the pull request and probes do not belong on `main`.

The fix shipped as 1.5.1 the same afternoon. That release number exists because of a rule written that morning.

## How do you write a changelog without inventing a past?

The repository had one tag, `v1.5.0`, and a version field that had been bumped five times before it. A changelog that listed 1.0.0 through 1.4.0 with release dates would imply releases that never happened. Each earlier section instead carries the hash and date of the commit that bumped the version, the file says plainly that those versions were never tagged, and the release doc says they will not be tagged after the fact.

One sentence in the Claude Code docs shaped the release rule more than anything else: for a third-party marketplace, Claude Code decides whether an installed user gets an update by comparing the plugin's `version` field. A change to a skill without a bump is invisible to everyone who installed the plugin. So the rule is that a change to a skill, agent, hook or script bumps the version, and docs, tests and CI do not. A test fails CI when the version has no changelog section. The stdin fix was a hook change with no new behavior, so it took the patch bump the rule prescribes, and the tag and the GitHub release followed the steps the rule lists.

## What can you reuse?

- **Run your own install instructions in an empty config directory.** Two minutes, and it would have caught a wrong id. Point `HOME` and `CLAUDE_CONFIG_DIR` somewhere disposable and type what the README says.
- **State a runtime floor only after a run on the version below it fails.** "3.9 or newer" means more when 3.8 is on record failing and 3.9 is on record passing.
- **Make examples reruns.** A real commit with a real test that fails on its parent beats any transcript you could write, and it costs nothing to maintain because git holds it.
- **Have the diff reviewed by something that was not in the room.** The author writes the plan as if it happened. A reviewer with the commit and the measured facts, and nothing else, catches that.
- **A hypothesis that survives nothing it predicts is a story.** Eight thousand clean spawns did not disprove `EAGAIN`; they disproved my probe. Reproduce under the conditions of the failure, instrument the failing component, and read what it says before you fix anything.
- **Decide what a version means before you need one.** The rule that docs do not bump and hooks do was a few hours old when a hook needed a release, and it answered without a meeting.

The pull requests are [#8](https://github.com/ehnruiz/claude-skills/pull/8) for the docs and [#9](https://github.com/ehnruiz/claude-skills/pull/9) for the hook fix, and the release is [v1.5.1](https://github.com/ehnruiz/claude-skills/releases/tag/v1.5.1). Every number above is in one of them.
