import { MetadataRoute } from 'next';
import { allBlogs } from 'contentlayer/generated';
import siteMetadata from '@/data/siteMetadata';
import projectsData from '@/data/projectsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }));

  const routes = ['', 'archive', 'en/archive', 'about', 'career', 'en/career'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const projectRoutes = ['', 'en/'].flatMap((prefix) =>
    ['projects', ...projectsData.map(({ slug }) => `projects/${slug}`)].map((route) => ({
      url: `${siteUrl.replace(/\/$/, '')}/${prefix}${route}`,
    }))
  );

  return [...routes, ...projectRoutes, ...blogRoutes];
}
