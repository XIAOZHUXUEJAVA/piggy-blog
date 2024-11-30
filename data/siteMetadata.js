/** @type {import("pliny/config").PlinyConfig } */

const siteMetadata = {
  title: "Piggy's Blog - Unleash My Creative Potential",
  author: 'Piggy',
  fullName: 'Piggy DP',
  headerTitle: "Piggy's Blog",
  description: 'I would be grateful for any feedback or insights you have on my writing.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://karhdo.dev',
  // analyticsURL: 'https://analytics.karhdo.dev/share/5atUzHulqItdW3PK/karhdo.dev',
  analyticsURL:
    'https://umami-88h8yr28f-xiaozhuxuejavas-projects.vercel.app/share/2yArURTfGzlVZNrQ/piggy-blog.netlify.app',
  // siteRepo: 'https://github.com/Karhdo/karhdo.dev',
  siteRepo: 'https://github.com/XIAOZHUXUEJAVA/piggy-blog',
  siteLogo: '/static/images/avatar.jpg',
  image: '/static/images/avatar.jpg',
  socialBanner: '/static/images/projects/karhdo-blog.png',
  email: 'dotrongkhanh.dev@gmail.com',
  github: 'https://github.com/XIAOZHUXUEJAVA',
  facebook: 'https://www.facebook.com/karhdo.dev',
  linkedin: 'https://www.linkedin.com/in/karhdo',
  twitter: 'https://twitter.com/karhdo',
  youtube: 'https://youtube.com',
  locale: 'en-US',
  socialAccounts: {
    github: 'Karhdo',
    linkedin: 'karhdo',
    facebook: 'karhdo.dev',
  },
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.UMAMI_WEBSITE_ID,
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'title',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
      inputPosition: 'top',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
};

module.exports = siteMetadata;
