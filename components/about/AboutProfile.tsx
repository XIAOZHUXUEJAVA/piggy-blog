'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { CoreContent } from 'pliny/utils/contentlayer';
import { Authors } from 'contentlayer/generated';

interface AboutProfileProps {
  author: CoreContent<Authors>;
}

export default function AboutProfile({ author }: AboutProfileProps) {
  return (
    <section className="grid items-center gap-8 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-10" aria-label="个人资料">
      <Image
        src={author.avatar || '/static/images/my-avatar.jpg'}
        alt="个人照片"
        width={192}
        height={192}
        className="mx-auto aspect-square w-40 rounded-lg object-cover sm:mx-0 sm:w-48"
        priority
      />

      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        <li className="flex min-h-14 items-center gap-4 py-3 text-gray-700 dark:text-gray-300">
          <Icon icon="mdi:map-marker" className="h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400" />
          <span>China</span>
        </li>
        <li className="flex min-h-14 min-w-0 items-center gap-4 py-3 text-gray-700 dark:text-gray-300">
          <Icon icon="mdi:email" className="h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400" />
          {author.email && (
            <Link href={`mailto:${author.email}`} className="min-w-0 break-all hover:underline">
              {author.email}
            </Link>
          )}
        </li>
        <li className="flex min-h-14 items-center gap-4 py-3 text-gray-700 dark:text-gray-300">
          <Icon icon="mdi:calendar" className="h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400" />
          <span>开始工作于 2023</span>
        </li>
      </ul>
    </section>
  );
}
