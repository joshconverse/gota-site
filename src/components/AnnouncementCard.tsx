import Image from "next/image";
import type { SanityDocument } from "next-sanity";
import { urlFor } from "@/sanity/urlFor";

export default function AnnouncementCard({ announcement }: { announcement: SanityDocument }) {
  const publishedDate = announcement.publishedAt ? new Date(announcement.publishedAt) : null;
  const isPriority = announcement.priority || false;
  
  // Try different possible field names for the content
  const contentField = announcement.content || announcement.body || announcement.description || announcement.message;
  
  // Extract both text and images from rich text content
  type SanityBlock = { _type?: string; children?: Array<{ text?: string }>; asset?: unknown; alt?: string };
  const getRichContent = (content: unknown) => {
    if (!content) return { text: '', images: [] };
    if (typeof content === 'string') return { text: content, images: [] };
    
    const text: string[] = [];
    const images: SanityBlock[] = [];

    if (Array.isArray(content)) {
      (content as SanityBlock[]).forEach(block => {
        if (block._type === 'block' && block.children) {
          // Extract text
          const blockText = (block.children || []).map((child) => child.text || '').join('');
          if (blockText.trim()) text.push(blockText);
        } else if (block._type === 'image' && block.asset) {
          // Extract images
          images.push(block);
        }
      });
    }

    return { text: text.join(' '), images };
  };

  const { text: content, images } = getRichContent(contentField);

  // Console log for debugging - remove after fixing
  console.log('Announcement data:', {
    title: announcement.title,
    rawContent: contentField,
    processedContent: content,
    images: images,
    allFields: Object.keys(announcement)
  });

  return (
    <article className={`p-3 rounded ${isPriority ? 'border-red-400 bg-red-50' : ''}`}>
      <h4 className={`font-semibold text-lg ${isPriority ? 'text-red-800' : ''}`}>
        {announcement.title}
      </h4>
      {publishedDate && (
        <div className="text-sm text-gray-600 mb-2">
          {publishedDate.toLocaleDateString()}
        </div>
      )}
      {content ? (
        <div className="text-sm mb-3">
          {content}
        </div>
      ) : images.length === 0 ? (
        <div className="text-xs text-gray-400 italic mb-3">
          No content found (checked: content, body, description, message)
        </div>
      ) : null}
      {images.length > 0 && (
        <div className="space-y-2">
          {images.map((image, index) => (
            // use an aspect-ratio container and object-contain so the full image is visible without cropping
            <div key={index} className="w-full aspect-video relative">
              <Image
                src={urlFor(image).width(1200).height(675).auto('format').url()}
                alt={image.alt || `Announcement image ${index + 1}`}
                fill
                className="object-contain rounded"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}