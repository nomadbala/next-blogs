import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  likes: number;
}

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        setPost(data.data);
      };
      fetchPost();
    }
  }, [id]);

  const handleLike = async () => {
    const response = await fetch(`/api/posts/${id}/like`, { method: "POST" });
    if (response.ok) {
      setPost((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (response.ok) {
      router.push("/");
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Image
        src={post.thumbnail}
        alt={post.title}
        width={800}
        height={400}
        className="rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
      <div className="flex items-center mt-2">
        <button
          onClick={handleLike}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
        >
          Like ({post.likes})
        </button>
        <Link
          href={`/edit/${id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-4"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
      <div className="mt-8 prose">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}
