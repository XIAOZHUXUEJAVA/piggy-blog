import { Tag } from '@/components/ui';

const BlogTags = ({ tags }: { tags: string[] }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-2">
      {tags.map((tag) => (
        <Tag key={tag} text={tag} />
      ))}
    </div>
  );
};

export default BlogTags;
