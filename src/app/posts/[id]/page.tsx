"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { Post } from "@/types/post.types";

export default function PostPage() {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        console.log(`Fetched post data: ${JSON.stringify(data)}`);
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

  if (!post) return <div className="text-white">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="absolute top-4 left-4 text-gray-600 hover:text-white transition-all w-10 h-10 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12H3m0 0l6 6m-6-6l6-6"
          />
        </svg>
      </Link>

      <div className="mt-20">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden rounded-xl">
          <div className="relative h-96">
            <Image
              src={post.thumbnail as string}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center mb-6">
              <button
                onClick={handleLike}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-4 shadow-md rounded-xl"
              >
                Like ({post.likes})
              </button>
              <Link
                href={`/posts/edit/${id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-4 shadow-md rounded-xl"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md rounded-xl"
              >
                Delete
              </button>
            </div>
            <div className="prose prose-lg">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
