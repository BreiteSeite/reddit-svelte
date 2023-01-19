<script lang="ts">
	export let subreddit: string = 'all';

	import { onMount, afterUpdate } from 'svelte';

	import SubmissionPreview from '../lib/submission-preview.svelte';
	import type { Listing } from 'reddit-types/dist/base';
	import type { Submission } from 'reddit-types/dist/submission';

	import { browser } from '$app/environment';

	let submissions: Submission[] = [];
	let after: string | null = null;
	let previousLastListItem: Element | null = null;

	onMount(async () => {
		let response = await loadSubmissions(subreddit);
		submissions = response.data.children;
		after = response.data.after ?? null;
	});

	const loadSubmissions = async (
		subreddit: string,
		after: string | null = null,
		count: number | null = null
	) => {
		const requestSearchParams = new URLSearchParams(`raw_json=1`);
		if (after && count) {
			requestSearchParams.append('after', after);
			requestSearchParams.append('count', count.toString());
		}

		const response: Listing<Submission> =
			// 	await (
			// await fetch(`http://localhost:5173/proxy?${requestSearchParams}`)
			// )
			await (
				await fetch(`https://www.reddit.com/r/${subreddit}.json?${requestSearchParams}`)
			).json();
		return response;
	};

	afterUpdate(() => {
		if (browser) {
			let callback: IntersectionObserverCallback = (entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						observer.unobserve(entry.target);

						loadSubmissions(subreddit, after, submissions.length).then((resp) => {
							submissions = submissions.concat(resp.data.children);
							after = resp.data.after ?? null;
						});
					}
				});
			};

			const observer = new IntersectionObserver(callback, {
				threshold: 0.1,
				rootMargin: '-100% 0% 20%'
			});

			const lastListItem = document.querySelector('#submissions div:last-child');

			if (lastListItem && lastListItem !== previousLastListItem) {
				previousLastListItem = lastListItem;
				observer.observe(lastListItem);
			}
		}
	});
</script>

<ul class="rounded-lg m-5 border" id="submissions">
	{#each submissions as submission}
		<SubmissionPreview {submission} />
	{/each}
</ul>
