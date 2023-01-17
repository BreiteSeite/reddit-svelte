import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
  return event.fetch("../submissions.json");
};
