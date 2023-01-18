<script lang="ts">
	export const subreddit: string = 'all';

	import { onMount, afterUpdate } from 'svelte';

	import SubmissionPreview from '../lib/submission-preview.svelte';
	import type { Listing } from 'reddit-types/dist/base';
	import type { Submission } from 'reddit-types/dist/submission';

	import { browser } from '$app/environment';

	let submissions: Submission[] = [];
	let previousLastListItem: Element | null = null;

	onMount(async () => {
		submissions = await loadSubmissions('teslamotors');
	});

	const loadSubmissions = async (subreddit: string, after: string | null = null) => {
		const requestSearchParams = new URLSearchParams(`raw_json=1`);

		if (after) {
			requestSearchParams.append('after', after);
		}

		const response: Listing<Submission> =
			// 	await (
			// await fetch(`http://localhost:5173/proxy?${requestSearchParams}`)
			// )
			await (
				await fetch(`https://www.reddit.com/r/${subreddit}.json?${requestSearchParams}`)
			).json();
		return response.data.children;
	};

	afterUpdate(() => {
		if (browser) {
			let callback: IntersectionObserverCallback = (entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						observer.unobserve(entry.target);

						loadSubmissions(
							'teslamotors',
							entry.target.querySelector('li')?.getAttribute('data-reddit-post-id')
						).then((resp) => (submissions = submissions.concat(resp)));
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
