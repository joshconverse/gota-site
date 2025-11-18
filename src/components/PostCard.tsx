import Link from "next/link";
import Image from "next/image";
import type { SanityDocument } from "next-sanity";
import urlFor from "@/sanity/urlFor";

export default function PostCard({ post }: { post: SanityDocument }) {
  const img = post.mainImage ? urlFor(post.mainImage).width(800).height(600).auto('format').url() : null;

  return (
    <article className="flex gap-4">
      {img ? (
        <div className="w-32 h-20 relative flex-shrink-0">
          <Image src={img} alt={post.title ?? 'Post image'} fill className="object-cover rounded" sizes="(max-width: 640px) 100vw, 160px" />
        </div>
      ) : null}

      <div>
        <h3 className="text-lg font-semibold">
          <Link href={`/${post.slug?.current ?? ''}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
        <p className="text-xs text-gray-500 mt-1">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</p>
      </div>
    </article>
  );
}
