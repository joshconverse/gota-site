'use client';

import { useState, useEffect } from 'react';
import { YouTubePlaylist } from '@/utils/youtube';

interface SermonLibraryProps {
  playlists: YouTubePlaylist[];
}

export default function SermonLibrary({ playlists }: SermonLibraryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock data for development when API fails
  const mockPlaylists = [
    {
      id: 'mock-1',
      title: 'Sunday Morning Sermons',
      description: 'Weekly messages from our Sunday morning services',
      thumbnailUrl: '/pexels-enrique-12172754.jpg',
      videoCount: 12,
      url: 'https://youtube.com',
      publishedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'mock-2',
      title: 'Bible Study Series',
      description: 'In-depth study through books of the Bible',
      thumbnailUrl: '/pexels-enrique-12172754.jpg',
      videoCount: 8,
      url: 'https://youtube.com',
      publishedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'mock-3',
      title: 'Special Messages',
      description: 'Holiday and special occasion messages',
      thumbnailUrl: '/pexels-enrique-12172754.jpg',
      videoCount: 6,
      url: 'https://youtube.com',
      publishedAt: '2024-01-01T00:00:00Z'
    }
  ];

  const displayPlaylists = playlists && playlists.length > 0 ? playlists : mockPlaylists;

  if (!displayPlaylists || displayPlaylists.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Sermon library is currently being updated. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPlaylists.slice(0, isExpanded ? displayPlaylists.length : 6).map((playlist) => (
          <a
            key={playlist.id}
            href={playlist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-brand-4/10 p-6 rounded-lg border border-white hover:bg-brand-4/20 transition-colors duration-300"
          >
            <div className="aspect-video relative overflow-hidden rounded-md mb-4 bg-gray-200">
              <img
                src={playlist.thumbnailUrl || '/pexels-enrique-12172754.jpg'}
                alt={playlist.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback to a default image if thumbnail fails to load
                  const target = e.target as HTMLImageElement;
                  if (target.src !== '/pexels-enrique-12172754.jpg') {
                    target.src = '/pexels-enrique-12172754.jpg';
                  }
                }}
                onLoad={(e) => {
                  // Ensure the image loaded successfully
                  const target = e.target as HTMLImageElement;
                  if (target.naturalWidth === 0) {
                    target.src = '/pexels-enrique-12172754.jpg';
                  }
                }}
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {playlist.videoCount} videos
              </div>
            </div>
            <h3 className="font-light text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {playlist.title}
            </h3>
            {playlist.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {playlist.description}
              </p>
            )}
            <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
              Watch Series
            </button>
          </a>
        ))}
      </div>

      {displayPlaylists.length > 6 && (
        <div className="text-center pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-brand-2 text-slate-900 px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity"
          >
            {isExpanded ? 'Show Less' : `Show All ${displayPlaylists.length} Playlists`}
          </button>
        </div>
      )}
    </div>
  );
}