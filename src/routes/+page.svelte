<script lang="ts">
	import SubmissionPreviewList from '$lib/submission-preview-list.svelte';
	const subreddit = 'teslamotors';
</script>

<h1 class="border ">Posts in /r/{subreddit}</h1>
<SubmissionPreviewList {subreddit} />
