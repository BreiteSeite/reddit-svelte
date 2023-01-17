import type { PageLoad } from "./$types";
import type { Submission } from "reddit-types/dist/submission";

export async function load(
  { fetch, params },
): Promise<PageLoad<{ content: Submission }>> {
  let url = `https://ww.reddit.com/${params.id}.json?raw_json=1`;
  return { content: await (await fetch(url)).json() };
}
