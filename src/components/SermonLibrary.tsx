'use client';

import { useState, useEffect } from 'react';
import { YouTubePlaylist } from '@/utils/youtube';

interface SermonLibraryProps {
  playlists: YouTubePlaylist[];
}

export default function SermonLibrary({ playlists }: SermonLibraryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!playlists || playlists.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Sermon library is currently being updated. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.slice(0, isExpanded ? playlists.length : 6).map((playlist) => (
          <a
            key={playlist.id}
            href={playlist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={playlist.thumbnailUrl}
                alt={playlist.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback to a default image if thumbnail fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = '/WorshipEdited.jpg';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {playlist.videoCount} videos
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-2 transition-colors">
                {playlist.title}
              </h3>
              {playlist.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {playlist.description}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>

      {playlists.length > 6 && (
        <div className="text-center pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-brand-2 text-slate-900 px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity"
          >
            {isExpanded ? 'Show Less' : `Show All ${playlists.length} Playlists`}
          </button>
        </div>
      )}
    </div>
  );
}