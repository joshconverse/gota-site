import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

/**
 * Helper to build image URLs from Sanity image objects.
 * Usage: urlFor(post.mainImage).width(800).url()
 */
// Narrow, intentional any: the image() helper expects Sanity's image source types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: unknown) => createImageUrlBuilder(client).image(source as any);

export default urlFor;
