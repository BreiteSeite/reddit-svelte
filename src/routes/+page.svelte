<script lang="ts">
	let subreddit = 'apple';
	import SubmissionPreviewList from '$lib/submission-preview-list.svelte';
</script>

<h1 class="border ">Posts in /r/{subreddit}</h1>
<SubmissionPreviewList {subreddit} />

<svelte:head>
	<title>Posts from /r/{subreddit}</title>
</svelte:head>
