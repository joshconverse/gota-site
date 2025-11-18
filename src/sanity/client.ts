import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "nirx1ukg",
  dataset: "production1",
  apiVersion: "2024-01-01",
  useCdn: false,
});