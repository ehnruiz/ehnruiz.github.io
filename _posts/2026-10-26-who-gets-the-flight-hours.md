---
title: Who Gets the Flight Hours?
subtitle: Our framework for growing junior engineers, checked against the hiring data and the learning studies
description: "Our framework for growing junior engineers alongside AI agents, read against 2026 hiring data and the first randomized trial on AI and coding skill."
seo_title: "Junior Developers and AI: Protecting Growth Against the 2026 Data"
kind: essay
image: /assets/cards/who-gets-the-flight-hours.png
---

<p class="lede">In August we moved a framework onto Compass, our engineering handbook, for growing engineers now that AI is part of the standard workflow. Its sharpest line borrows from aviation: "Autopilot time does not count as flight hours." The framework says junior growth is worth protecting. Then I spent a month building X-Ray, mostly alone, with a team of AI agents. That month is the strongest argument I know for hiring fewer juniors, and I am the one who made it. So I went back to the framework with the data from the past year: who is getting hired, who is not, and what the studies say about learning to code with an AI at your elbow. Most of the framework holds. The parts that ask the organization to pay for something are still wishes, and this essay is about turning them into commitments.</p>

<div class="numbers">
<div><b>19%</b><span>employment gap for ages 22 to 25 in AI-exposed jobs</span></div>
<div><b>65%</b><span>drop in new-grad hiring at large tech firms since 2019</span></div>
<div><b>71%</b><span>of the software postings rebound went to senior roles</span></div>
<div><b>50 vs 67</b><span>quiz scores, learning a library with AI vs without</span></div>
<div><b>0</b><span>significant rise in recent-grad unemployment, summer 2026</span></div>
</div>

## What does our framework say?

The Developer Growth page opens with a warning box: "The industry does not yet have this figured out." Our engineering leads wrote the framework, and they meant that line. The page is marked Living and says it will change as we learn.

It names two risks. We could grow engineers who cannot function without AI, and we could lose the pipeline that produces our next senior engineers. People who grow up in our company carry domain knowledge that a model does not have, and that knowledge takes years.

It describes the work as three loops. The inner loop is writing, testing and debugging code. The outer loop is CI/CD, deployment and operations. The middle loop sits between them: directing AI, evaluating what it produces, deciding how far to trust it, and keeping the architecture coherent. The framework argues that engineering judgment now lives mostly in that middle loop.

It does not restrict AI. It sets a higher bar instead: every engineer must be able to explain, defend and own everything they ship, however it was produced. Then it splits the work between the engineer (IC) and their people leader (PL):

- **Use AI as a co-pilot.** The IC forms their own approach before opening an AI tool on any meaningful task, and seeks out human mentors. The PL asks "walk me through your reasoning" in reviews and 1:1s, and addresses over-reliance early. Correcting at month two is far easier than month twelve.
- **Build real hours.** The IC resists AI as the first move and looks for the uncomfortable work: the hard bug, the unfamiliar system. The PL assigns stretch work and protects thinking time from sprint pressure.
- **Own your code.** Walk through your pull request, defend the tradeoffs, and say early when something you shipped breaks.

Its companion page on best practices adds the habits: once a week, do a non-trivial task with the AI off. Treat generated code in an unfamiliar area as a study guide. Don't auto-accept suggestions. It names the failure we are trying to avoid as the atrophy spiral: relying on AI for fundamentals until you can't do them without it.

The question for this essay is whether the evidence agrees.

## What is the market doing to junior engineers?

The strongest evidence that juniors are being squeezed comes from payroll data. Stanford's Digital Economy Lab tracks ADP records for millions of workers. In its [August 2026 revision](https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/), employment for workers aged 22 to 25 in AI-exposed occupations, software development among them, "stands 19% below" where it would be had it kept pace with less-exposed peers. The first version, a year earlier and on a different measure, headlined 13%. Experienced workers in the same occupations show no comparable gap. The authors trace the effect to fewer young people being hired. Layoffs are not the driver.

Other data sets point the same way:

- A Harvard working paper on [65 million resumes](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5425555) finds that after a firm adopts generative AI, its junior employment falls relative to firms that have not, while senior employment holds. Again the cause is slower hiring.
- A [Census Bureau working paper](https://www.census.gov/library/working-papers/2026/adrm/CES-WP-26-56.html) finds that graduates of the most AI-exposed majors saw their chance of a first job fall about 5 points and their first-job earnings fall about 13%, which the authors compare to graduating into a large recession.
- [SignalFire](https://signalfire.com/blog/signalfire-state-of-talent-report-2026) counts new-grad hiring at 12 large tech firms down about 65% from 2019. That figure covers all functions. Engineering hiring overall at the same firms is down only 11%.
- On [Indeed](https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/), software postings are about 21% below February 2020 and rising, but senior roles account for 71% of the rebound.

The [Dallas Fed](https://www.dallasfed.org/research/economics/2026/0224) adds the other side of the same coin: in AI-exposed jobs, the pay premium for experience is rising.

Then there is the evidence that cuts the other way. An [NBER paper](https://www.nber.org/papers/w35796) using summer 2026 survey data finds no statistically significant rise in recent-graduate unemployment, against prior summers or against older graduates. [Handshake](https://joinhandshake.com/research/economic-research/labor-market-retro-january-2026/) sees twice as many applications per job as for the class of 2023, and its economist puts the blame on 2021-22 overhiring and interest rates more than on AI. Even the Stanford paper says its patterns "attenuate when controlling for education" and "show some divergent trends predating generative AI." The [BLS](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm) still projects 10% growth for software developers through 2035.

Company statements split too. Salesforce [said in February 2025](https://www.theregister.com/2025/02/27/salesforce_misses_revenue_guidance/) it would hire no new engineers that year. Shopify asked teams to show why AI can't do a job before asking for headcount. On the other side, AWS CEO Matt Garman has called replacing juniors with AI "one of the dumbest things" he has heard, and [Amazon plans](https://platformer.news/matt-garman-aws-ceo-interview-ai-jobs) to bring on 11,000 interns and new graduates this year. IBM said in February it would [triple entry-level hiring](https://techcrunch.com/?p=3092703) and rewrite its junior developer roles toward customer-facing work.

My read is that economists will argue about the cause for years, and the effect is already plain. Fewer people are getting the first two years. Companies are buying experience and producing less of it. Every team that hires only seniors is counting on some other team to make them.

## Does learning with an AI build skill?

The best evidence here is one randomized trial. In January, Anthropic [published a study](https://www.anthropic.com/research/AI-assistance-coding-skills) of 52 developers learning an unfamiliar Python async library. Half had an AI assistant and half did not. On a quiz afterward, the AI group averaged 50% and the hand-coding group 67%. The largest gap was on debugging. The AI group finished about two minutes faster, which was not statistically significant.

The detail that matters most to me is inside the AI group. The researchers sorted participants by how they used the assistant:

- **Under 40% on the quiz:** delegating the task to the AI, leaning on it more as the task went on, and asking it to fix each error in turn.
- **65% or higher:** generating code and then working to understand it, asking for explanations alongside code, and asking conceptual questions.

The sample is small and the quiz came an hour after the task, so this says nothing yet about months or years. But it matches what other studies found in other settings. In a [study of 21 novice programmers](https://arxiv.org/abs/2405.17739), students who already had a plan used AI to go faster, and students who were struggling often finished with "an illusion of competence." In a [field experiment with about 1,000 high school students](https://ideas.repec.org/a/nas/journl/v122y2025pe2422633122.html), a plain chat assistant raised practice scores, and students scored 17% lower than the control group once it was taken away. A tutor version with guardrails mostly avoided the harm.

The output evidence points the other way, and it is just as solid. A [field experiment across Microsoft, Accenture and a Fortune 100 firm](https://economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf), with 4,867 developers, found that less experienced developers adopted Copilot more and gained more. The same pattern showed up in [customer support](https://www.nber.org/papers/w31161) and among [BCG consultants](https://aiinstitute.hbs.edu/back-to-the-beginnings-of-ai-at-work/). The consultant study also found that on a task just outside what the model could do well, people with AI got the answer right less often than people without it.

Those studies measure different things. AI raises a junior's output, and depending on how they use it, it can lower what they learn while doing it. A team that only measures output will see the first number and miss the second.

One more finding belongs here. In [METR's 2025 study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), experienced open-source developers took 19% longer with AI and still believed afterward that it had made them 20% faster. METR's [2026 follow-up](https://metr.org/blog/2026-02-24-uplift-update/) points toward a speedup with newer tools, with wide error bars. The tools improved. Whether people can judge their own speed with them is a separate question, and the 2025 result says they could not.

## Where does the framework hold up?

Better than I expected, on the parts about the individual.

**"Form your own approach before opening an AI tool"** is close to what separated the high scorers from the low scorers in the Anthropic trial. The high scorers stayed in charge of the understanding. The low scorers handed it over.

**"Use AI to learn, not just to produce"** is the explanation and conceptual-question pattern, and those were the top scorers.

**"Walk me through your reasoning"** is the cheapest test I know for the illusion of competence. A junior who delegated can show you working code. They can't tell you why it works, what they rejected, or where it will break.

**Month two, not month twelve,** fits the METR perception gap. If experienced developers misjudge their own speed by nearly forty points, a junior can't be expected to notice their own atrophy. Someone else has to notice it, and early.

**The once-a-week AI-off task** is the closest thing we have to a test with the assistant taken away. The high school study shows what happens when that test comes as a surprise.

## Where does it meet reality?

The framework is strongest where it asks individuals to behave well. It is weakest where it asks the organization to pay for something.

**Real hours cost money, and the framework doesn't say who pays.** "Protect thinking time from sprint pressure" is a bullet for the people leader. Meanwhile the market rewards teams that ship more with fewer people. A junior who sits with a hard bug for a day, without asking the agent first, delivers less that sprint than a junior who delegates it. Both the Anthropic trial and our own guidance say the first junior is the one worth having in two years. Nothing in the framework puts that day in a plan or a sprint. Until it does, sprint pressure wins.

**The middle loop is the job, and juniors need reps in it too.** The aviation metaphor cuts both ways. Pilots log hand-flying hours, and they also train to manage the automation, because watching an autopilot well is its own skill. Our framework treats AI time as time that doesn't count. For the inner loop, that's right. But directing an agent, writing a ticket it can't misread, and reviewing its diff against the spec are the middle-loop skills the same framework says matter most. A junior who never practices them under supervision will learn them unsupervised, on production code.

Our guidance on AI-assisted pull request review shows what supervised middle-loop work looks like. On one pull request this month, reviewing the change against its ticket and its attached spec, running the checks, and comparing a locale table with its source turned up six findings the review bots missed. One of them was a table that disagreed with its source for 109 of 248 countries. Every one of those findings came from knowing what correct looked like and then checking. That is a junior's education in an afternoon, if a senior is in the room.

**Mentoring is thinning, and the framework puts the ask on the junior.** "Seek out human mentors" is an IC bullet. In Anthropic's [own survey of its engineers](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic), one said, "More junior people don't come to me with questions as often." The question that used to go to a senior now goes to the agent, which answers faster and never sighs. Senior time is also what the agents compete for. My X-Ray month was a senior's month spent leading agents, and no one paired with me. Meanwhile the team has started using Devin, GitHub Copilot and other assistants on their own. The month I spent learning to lead agents taught no one but me.

**The pipeline is a shared resource, and no single team is responsible for it.** The data says companies are buying experience and producing less of it. Every team that makes the locally sensible choice to hire seniors and add agents is drawing down the same pool. Our framework talks about the pipeline in its first paragraph and then never mentions it again.

## What would I change?

These are proposals for the next Compass review. I'll bring them to the team before anything changes on the page.

1. **Budget the real hours.** Each early-career engineer gets one ticket per sprint planned as a real-hours ticket: AI used for explanation only, or not at all, with a short write-up of what they tried and what broke. It goes in the sprint as work, with points, so it shows up in planning and nobody has to defend it.
2. **Teach the middle loop on purpose.** Juniors run the AI-assisted PR review practice with a senior beside them: conformance table against the ticket, checks with the commit noted, one claim verified that the tests can't reach. The senior reviews the junior's review. That's the mentoring now: what did you check, what did you trust, and why.
3. **Make mentoring a senior deliverable.** Move "seek out human mentors" from an IC bullet to a PL commitment with a named senior and a standing slot. Agents will take every hour of senior time they're offered. The hours for juniors have to be reserved first.
4. **Write down the month-two check.** At month two, the people leader runs a walkthrough of one recent pull request with each early-career engineer, without the agent, and records the outcome in their growth notes. That puts a date on looking for over-reliance.
5. **Put the pipeline in the hiring plan.** When we ask for headcount, the plan says how many early-career roles it includes and who mentors them. If the answer is zero, someone has to say so out loud.

I also want to keep the framework honest about what we don't know. The skill trial is 52 people and an hour. The employment data is contested. The next revision of the page should cite what it rests on and say when we'll check it again.

## What can you reuse?

- **Measure learning separately from output.** AI raises a junior's output almost everywhere it's been tested. Whether it raises their understanding depends on how they use it, and output metrics won't show you which.
- **Ask how they use it.** Inside the AI group of the Anthropic trial, delegation and inquiry separated the low scores from the high ones. "Walk me through your reasoning" tells you which one you're looking at.
- **Put the hard hours in the plan.** A principle that depends on a manager defending it against sprint pressure every two weeks will lose most of those fights. A ticket with points doesn't need defending.
- **Supervise the middle loop.** Directing and reviewing agents is a skill juniors need. They should learn it next to someone, on a real change.
- **Count your pipeline.** If your team hires only seniors, write down which team is training them.

The Developer Growth framework lives in our internal handbook, so the quotes above are the parts this essay relies on. The research notes behind it, with every source and its limits, will follow in a separate post.
