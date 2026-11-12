/** @type {import("pliny/config").PlinyConfig } */

const siteMetadata = {
  title: "Piggy's Blog - Unleash My Creative Potential",
  author: 'Piggy',
  fullName: 'ZDP',
  headerTitle: "Piggy's Blog",
  description: 'I would be grateful for any feedback or insights you have on my writing.',
  language: 'en-us',
  siteUrl: 'https://piggy-blog.netlify.app/',
  siteRepo: 'https://github.com/XIAOZHUXUEJAVA/piggy-blog',
  siteLogo: '/static/images/avatar.jpg',
  image: '/static/images/avatar.jpg',
  socialBanner: '',
  email: 'dotrongkhanh.dev@gmail.com',
  github: 'https://github.com/XIAOZHUXUEJAVA',
  facebook: 'https://www.facebook.com/',
  linkedin: 'https://www.linkedin.com/in/',
  twitter: 'https://twitter.com/',
  youtube: 'https://youtube.com',
  locale: 'en-US',
  socialAccounts: {
    github: '',
    linkedin: '',
    facebook: '',
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
