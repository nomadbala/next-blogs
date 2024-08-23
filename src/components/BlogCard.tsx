import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  created_at?: Date;
  updated_at?: Date;
  tags?: string[];
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, thumbnail, tags }) => {
  return (
    <Link href={`/posts/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg rounded-xl">
        <div className="relative w-full h-48">
          <Image
            src={thumbnail as string}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <div className="flex gap-1 flex-wrap">
            {tags?.map((tag) => (
              <span key={tag} className="text-blue-700">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
