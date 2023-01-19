<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

{data.content[0].data.children[0].data.title}
<img src={data.content[0].data.children[0].data.preview?.images[0].source.url} />
