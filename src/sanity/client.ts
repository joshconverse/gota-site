import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Serve reads from Sanity's edge CDN. Content is fetched through Next's ISR
  // cache (revalidate) anyway, so the CDN's brief propagation delay is invisible
  // to visitors while cutting cold-fetch latency.
  useCdn: true,
});