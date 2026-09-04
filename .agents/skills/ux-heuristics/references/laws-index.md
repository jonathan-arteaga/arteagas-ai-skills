# Laws index

Loaded by [`SKILL.md`](../SKILL.md) step 2. Each entry is a paraphrase in this library's words plus the page to fetch for the author's takeaways. Fetch `https://lawsofux.com/<slug>/` with `Accept: text/markdown`.

Pick the group that matches the symptom, then the most specific law inside it.

## Choices and decisions

Symptoms: long menus, many equal-weight buttons, no default, every option explained at once.

| Law | In short | Look for | Slug |
| --- | --- | --- | --- |
| Hick's Law | Decision time grows with the number and complexity of options. | Menus and toolbars with many equal choices where speed matters; wizards that show every setting at once. | `hicks-law` |
| Choice Overload | Too many options make people stall or leave rather than pick. | Pricing grids, filter panels, and template galleries with no recommendation or default. | `choice-overload` |
| Paradox of the Active User | People start using the product immediately instead of reading instructions. | Onboarding that front-loads reading; help text that must be read before the first action works. | `paradox-of-the-active-user` |
| Occam's Razor | Among designs that work equally well, prefer the one with fewer parts. | Decorative controls, redundant confirmations, settings nobody changes. | `occams-razor` |
| Tesler's Law | Every system has irreducible complexity; someone must absorb it. | Complexity pushed to the user through manual entry, formats, or ordering that the product could handle. | `teslers-law` |

## Memory and load

Symptoms: users re-read, scroll back, retype, or lose their place.

| Law | In short | Look for | Slug |
| --- | --- | --- | --- |
| Miller's Law | Working memory holds only a handful of items at once; organise, do not just count. | Long unstructured lists of options or steps; codes and numbers shown as one unbroken string. | `millers-law` |
| Working Memory | People can hold and manipulate only a little information while acting. | Data needed on one screen shown only on a previous screen; comparisons that require remembering. | `working-memory` |
| Cognitive Load | The mental effort needed to understand and act on an interface. | Dense screens mixing unrelated tasks; jargon; state the user must infer. | `cognitive-load` |
| Chunking | Breaking information into meaningful groups makes it easier to scan and recall. | Phone numbers, card numbers, long forms, and text walls without grouping. | `chunking` |
| Serial Position Effect | The first and last items in a list are remembered best. | Key actions buried in the middle of navigation or lists. | `serial-position-effect` |
| Zeigarnik Effect | Unfinished tasks stay on the mind more than finished ones. | Multi-step tasks with no visible progress, saved state, or way back in. | `zeigarnik-effect` |

## Perception and grouping

Symptoms: users tap the wrong control, miss a relationship, or read groups that do not exist.

| Law | In short | Look for | Slug |
| --- | --- | --- | --- |
| Law of Proximity | Things placed close together read as one group. | Labels far from their inputs; unrelated actions crowded together; even spacing that hides structure. | `law-of-proximity` |
| Law of Similarity | Things that look alike read as the same kind of thing. | Links styled like body text; destructive and primary actions in the same style. | `law-of-similarity` |
| Law of Common Region | Elements inside a shared boundary read as a group. | Cards and panels that mix unrelated content; borders that separate things that belong together. | `law-of-common-region` |
| Law of Uniform Connectedness | Visually connected elements read as related. | Steppers, toolbars, and related controls with no connecting line, background, or container. | `law-of-uniform-connectedness` |
| Law of Prägnanz | People read ambiguous shapes in the simplest way available. | Complex layouts or icons that can be read two ways. | `law-of-pr%C3%A4gnanz` |
| Von Restorff Effect | The one item that differs from its neighbours is remembered. | Primary actions that do not stand out; several elements competing for emphasis. | `von-restorff-effect` |
| Selective Attention | People notice what matters to their goal and filter out the rest. | Banners, promos, and notices placed where the user is trying to complete a task. | `selective-attention` |

## Targets and speed

Symptoms: mis-taps, hunting for controls, waiting without feedback.

| Law | In short | Look for | Slug |
| --- | --- | --- | --- |
| Fitts's Law | Reaching a target takes longer when it is small or far away. | Small or crowded touch targets; frequent actions far from where the hand or pointer already is. | `fittss-law` |
| Doherty Threshold | Interaction feels fluid when the system responds within about 400 ms. | Actions with no immediate feedback; loading with no progress cue; work that could be optimistic. | `doherty-threshold` |

## Motivation and emotion

Symptoms: drop-off near the end, flat completion moments, a product that feels harder than it is.

| Law | In short | Look for | Slug |
| --- | --- | --- | --- |
| Goal-Gradient Effect | Effort increases as the goal gets closer. | Progress indicators that start at zero; long flows with no sign of how much remains. | `goal-gradient-effect` |
| Peak-End Rule | An experience is judged by its most intense moment and its ending. | Flat or error-prone final steps; confirmations that end on a dead end; stressful peaks with no relief. | `peak-end-rule` |
| Aesthetic-Usability Effect | Attractive interfaces are perceived as easier to use and forgiven more. | Functional screens left unstyled; polish that hides a usability problem from testing. | `aesthetic-usability-effect` |
| Flow | Full immersion in a task when challenge and feedback are balanced. | Interruptions, modal confirmations, and context switches in the middle of focused work. | `flow` |

## Expectations

Symptoms: users try the pattern from another product and it fails.

| Law | In short | Look for | Slug |
| --- | --- | --- | --- |
| Jakob's Law | People expect your product to work like the ones they already use. | Novel navigation, gestures, or terminology where a convention exists. | `jakobs-law` |
| Mental Model | Users act on their compressed idea of how the system works. | Behaviour that contradicts what the interface implies; states the user cannot predict. | `mental-model` |
| Postel's Law | Accept input generously; produce output strictly. | Inputs that reject spaces, dashes, capitals, or pasted text; strict formats the product could normalise. | `postels-law` |

## Process

Rarely cited in a review. Use these when the finding is about scope or prioritisation rather than the interface itself.

| Law | In short | Look for | Slug |
| --- | --- | --- | --- |
| Pareto Principle | A small share of features carries most of the use. | Effort spread evenly across rarely used paths while the common path stays rough. | `pareto-principle` |
| Parkinson's Law | Work expands to fill the time allowed. | Flows that let a task drag on; timers and defaults that could shorten it. | `parkinsons-law` |
| Cognitive Bias | Systematic errors in judgment shape how people read and decide. | Framing, anchoring, and defaults that steer the user; name the specific bias. | `cognitive-bias` |
