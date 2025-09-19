'use client';

import { useState, useEffect } from 'react';
import Spotify from 'public/static/icons/spotify.svg';
import MusicBar from '@/components/homepage/MusicBar';
import { useNowPlaying } from 'hooks';

interface RecentTrack {
  name: string;
  artist: string;
  album: string;
  external_urls: {
    spotify: string;
  };
  played_at: string;
}

interface MusicRecommendation {
  title: string;
  artist: string;
  reason: string;
  url?: string;
}

const SmartMusicWidget = () => {
  const nowPlayingData = useNowPlaying();
  const { songUrl, title, artist, isPlaying } = nowPlayingData || {};
  const [recentTracks, setRecentTracks] = useState<RecentTrack[]>([]);
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 音乐推荐数据（可以后续从 API 获取）
  const musicRecommendations: MusicRecommendation[] = [
    {
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      reason: 'Classic rock masterpiece',
    },
    {
      title: 'Hotel California',
      artist: 'Eagles',
      reason: 'Timeless guitar solo',
    },
    {
      title: 'Imagine',
      artist: 'John Lennon',
      reason: 'Peaceful and inspiring',
    },
    {
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      reason: 'Epic rock ballad',
    },
    {
      title: 'Yesterday',
      artist: 'The Beatles',
      reason: 'Beautiful melody',
    },
  ];

  // 获取最近播放的音乐
  const fetchRecentTracks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/spotify/recent');
      if (response.ok) {
        const data = await response.json();
        setRecentTracks(data.items || []);
      } else {
        console.log('Recent tracks API returned non-OK status:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch recent tracks:', error);
      // 网络错误时不显示错误，只是不加载最近播放
    } finally {
      setIsLoading(false);
    }
  };

  // 轮换显示内容
  useEffect(() => {
    if (!isPlaying && !isLoading) {
      const interval = setInterval(() => {
        setCurrentDisplayIndex((prev) => {
          const totalItems = recentTracks.length + musicRecommendations.length;
          return totalItems > 0 ? (prev + 1) % totalItems : 0;
        });
      }, 4000); // 每4秒切换一次

      return () => clearInterval(interval);
    }
  }, [isPlaying, recentTracks.length, musicRecommendations.length, isLoading]);

  // 组件挂载时获取最近播放
  useEffect(() => {
    if (!isPlaying) {
      fetchRecentTracks();
    }
  }, [isPlaying]);

  // 渲染当前播放的音乐
  const renderCurrentlyPlaying = () => (
    <div className="flex items-center gap-2">
      <MusicBar />
      <div className="flex items-center gap-2">
        <a
          className="font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
          href={songUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`${title} - ${artist}`}
        >
          {title}
        </a>
        <span className="text-gray-400 dark:text-gray-500">–</span>
        <span className="truncate text-gray-600 dark:text-gray-400">{artist}</span>
      </div>
    </div>
  );

  // 渲染最近播放的音乐
  const renderRecentTrack = (track: RecentTrack) => (
    <div className="flex items-center gap-2">
      <div className="flex h-3 w-6 items-center justify-center">
        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 dark:bg-gray-500" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">Recently:</span>
        <a
          className="font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          title={`${track.name} - ${track.artist}`}
        >
          {track.name}
        </a>
        <span className="text-gray-400 dark:text-gray-500">–</span>
        <span className="truncate text-gray-600 dark:text-gray-400">{track.artist}</span>
      </div>
    </div>
  );

  // 渲染音乐推荐
  const renderRecommendation = (recommendation: MusicRecommendation) => (
    <div className="flex items-center gap-2">
      <div className="flex h-3 w-6 items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-yellow-400 dark:bg-yellow-500" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-yellow-600 dark:text-yellow-400">Recommend:</span>
        <span className="font-medium text-gray-700 dark:text-gray-300">{recommendation.title}</span>
        <span className="text-gray-400 dark:text-gray-500">–</span>
        <span className="truncate text-gray-600 dark:text-gray-400">{recommendation.artist}</span>
        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({recommendation.reason})</span>
      </div>
    </div>
  );

  // 获取当前要显示的内容
  const getCurrentContent = () => {
    if (isPlaying && songUrl) {
      return renderCurrentlyPlaying();
    }

    if (isLoading) {
      return (
        <div className="flex items-center gap-2">
          <div className="flex h-3 w-6 items-center justify-center">
            <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
          </div>
          <span className="text-gray-500 dark:text-gray-400">Loading music...</span>
        </div>
      );
    }

    const totalItems = recentTracks.length + musicRecommendations.length;
    if (totalItems === 0) {
      return (
        <div className="flex items-center gap-2">
          <div className="flex h-3 w-6 items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-gray-400" />
          </div>
          <span className="text-gray-500 dark:text-gray-400">No music data</span>
        </div>
      );
    }

    if (currentDisplayIndex < recentTracks.length) {
      return renderRecentTrack(recentTracks[currentDisplayIndex]);
    } else {
      const recommendationIndex = currentDisplayIndex - recentTracks.length;
      return renderRecommendation(musicRecommendations[recommendationIndex]);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-50 via-teal-50 to-blue-50 p-4 transition-all duration-300 hover:shadow-lg dark:from-green-900/20 dark:via-teal-900/20 dark:to-blue-900/20">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100/0 via-green-100/10 to-teal-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-green-400/0 dark:via-green-400/5 dark:to-teal-400/0" />

      {/* 主要内容 */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Spotify 图标容器 */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200 dark:bg-green-900/50 dark:group-hover:bg-green-800/50">
          <Spotify className="h-5 w-5 text-spotify" />
        </div>

        {/* 音乐信息 */}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">{getCurrentContent()}</div>
        </div>

        {/* 状态指示器 */}
        <div className="flex-shrink-0">
          {isPlaying ? (
            <div className="flex items-center gap-1">
              <div className="h-1 w-1 animate-bounce rounded-full bg-green-500 [animation-delay:-0.3s]" />
              <div className="h-1 w-1 animate-bounce rounded-full bg-green-500 [animation-delay:-0.15s]" />
              <div className="h-1 w-1 animate-bounce rounded-full bg-green-500" />
            </div>
          ) : (
            <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500" />
          )}
        </div>
      </div>

      {/* 装饰性波浪线 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-teal-200 to-blue-200 opacity-30 dark:from-green-800 dark:via-teal-800 dark:to-blue-800" />
    </div>
  );
};

export default SmartMusicWidget;
