<script lang="ts">
	import type { Submission } from 'reddit-types/dist/submission';
	export let submission: Submission;
</script>

<div class="border flex bg-red-50">
	<div class="w-32">
		<img src={submission.data.preview?.images[0].resolutions[0].url} />
	</div>
	<li id="submission-{submission.data.id}">
		<a href="post/{submission.data.id}">{submission.data.title}</a>
	</li>
</div>
