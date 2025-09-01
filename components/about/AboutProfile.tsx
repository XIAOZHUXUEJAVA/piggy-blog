'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface AboutProfileProps {
  author: {
    name: string;
    avatar: string;
    occupation: string;
    company: string;
    email: string;
    twitter: string;
    linkedin: string;
    github: string;
  };
}

export default function AboutProfile({ author }: AboutProfileProps) {
  const socialLinks = [
    { name: 'GitHub', url: `https://github.com/${author.github}`, icon: '🐙' },
    { name: 'Twitter', url: `https://twitter.com/${author.twitter}`, icon: '🐦' },
    { name: 'LinkedIn', url: `https://linkedin.com/in/${author.linkedin}`, icon: '💼' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Profile Card */}
      <div className="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
        {/* Avatar */}
        <div className="relative mx-auto mb-6 h-32 w-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
            <div className="h-full w-full rounded-full bg-white p-1 dark:bg-gray-800">
              <Image
                src={author.avatar}
                alt={author.name}
                width={120}
                height={120}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 rounded-full bg-green-500 p-2 shadow-lg">
            <div className="h-3 w-3 rounded-full bg-white"></div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{author.name}</h2>
          <p className="mt-2 text-lg font-medium text-blue-600 dark:text-blue-400">{author.occupation}</p>
          {/* <p className="text-gray-600 dark:text-gray-300">@ {author.company}</p> */}
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <Icon icon="mdi:map-marker" className="h-4 w-4 text-gray-400" />
            <span>China</span>
          </div>
          {author.email && (
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Icon icon="mdi:email" className="h-4 w-4 text-gray-400" />
              <Link
                href={`mailto:${author.email}`}
                className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                {author.email}
              </Link>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <Icon icon="mdi:calendar" className="h-4 w-4 text-gray-400" />
            <span>加入于 2023</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6 flex justify-center gap-3">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg transition-colors hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900/50"
              title={link.name}
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Card */}
      <div className="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <Icon icon="mdi:heart" className="h-5 w-5 text-red-500" />
          数据统计
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">项目经验</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">3+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">工作年限</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">100+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">博客文章</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">10k+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">代码提交</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
