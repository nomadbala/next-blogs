import { Post } from "@/types/post.types";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  posts: Post[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <BlogCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default BlogGrid;
