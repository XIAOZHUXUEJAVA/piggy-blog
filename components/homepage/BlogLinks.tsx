import Link from '@/components/ui/Link';
import Twemoji from '@/components/ui/Twemoji';

const BlogLinks = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* 博客链接 */}
      <Link
        href="/blog"
        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:from-blue-900/20 dark:to-indigo-900/20"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-200 dark:bg-blue-900/50 dark:group-hover:bg-blue-800/50">
            <Twemoji emoji="memo" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">My Blogs</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Read my latest thoughts</p>
          </div>
          <div className="text-blue-500 transition-transform group-hover:translate-x-1">→</div>
        </div>
        {/* 悬停效果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-blue-100/5 to-blue-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-400/0 dark:via-blue-400/5 dark:to-blue-400/0" />
      </Link>

      {/* 关于我链接 */}
      <Link
        href="/about"
        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:from-purple-900/20 dark:to-pink-900/20"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 transition-colors group-hover:bg-purple-200 dark:bg-purple-900/50 dark:group-hover:bg-purple-800/50">
            <Twemoji emoji="face-with-monocle" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">About Me</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get to know me better</p>
          </div>
          <div className="text-purple-500 transition-transform group-hover:translate-x-1">→</div>
        </div>
        {/* 悬停效果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-purple-100/5 to-purple-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-purple-400/0 dark:via-purple-400/5 dark:to-purple-400/0" />
      </Link>
    </div>
  );
};

export default BlogLinks;
