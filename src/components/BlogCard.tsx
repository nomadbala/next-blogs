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

const BlogCard: React.FC<BlogCardProps> = ({ id, title, thumbnail }) => {
  return (
    <Link href={`/${id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <Image
          src={thumbnail as string}
          alt={title}
          width={300}
          height={200}
          className="rounded-lg"
        />
        <h2 className="mt-2 text-xl font-semibold">{title}</h2>
      </div>
    </Link>
  );
};

export default BlogCard;
